"use client";

import { useState, useRef, useEffect } from "react";
import { Mic, Square, MessageSquare, X, Send } from "lucide-react";

// Animated equalizer bars (Vapi-style) ----------------------------------------
function VoiceBars({ status }: { status: "idle" | "listening" | "thinking" | "speaking" }) {
  const peaks   = [0.45, 0.75, 1.0, 0.6, 0.85, 0.5, 0.7];
  const active  = status !== "idle";
  const barColor =
    status === "listening" ? "#ef4444"
    : status === "speaking" ? "#22d3ee"
    : "#fbbf24"; // thinking → yellow

  return (
    <div className="flex items-center gap-[3px] h-7">
      {peaks.map((peak, i) => (
        <div
          key={i}
          style={{
            width:           "3px",
            borderRadius:    "99px",
            backgroundColor: active ? barColor : "rgba(255,255,255,0.18)",
            height:          active ? `${Math.round(peak * 26)}px` : "5px",
            animation:       active
              ? `voiceBar ${0.5 + peak * 0.45}s ease-in-out ${i * 0.07}s infinite alternate`
              : "none",
            transition: "height 0.25s, background-color 0.3s",
          }}
        />
      ))}
    </div>
  );
}

// Main component ---------------------------------------------------------------
export default function ChatBot() {
  const [messages,    setMessages]    = useState<{ role: "user" | "ai"; text: string }[]>([]);
  const [input,       setInput]       = useState("");
  const [chatOpen,    setChatOpen]    = useState(false);
  const [voiceMode,   setVoiceMode]   = useState(false);
  const [voiceStatus, setVoiceStatus] = useState<"idle" | "listening" | "thinking" | "speaking">("idle");

  const wsRef            = useRef<WebSocket | null>(null);
  const currentAudioRef  = useRef<HTMLAudioElement | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const streamRef        = useRef<MediaStream | null>(null);
  const audioCtxRef      = useRef<AudioContext | null>(null);
  const voiceModeRef     = useRef(false);
  const recordingRef     = useRef(false);
  const isSpeakingRef    = useRef(false);
  const silenceStartRef  = useRef(Date.now());
  const messagesEndRef   = useRef<HTMLDivElement>(null);

  useEffect(() => { voiceModeRef.current  = voiceMode; },   [voiceMode]);
  useEffect(() => { isSpeakingRef.current = voiceStatus === "speaking"; }, [voiceStatus]);
  useEffect(() => { messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);

  const BACKEND_HTTP = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8000";
  const BACKEND_WS   = BACKEND_HTTP.replace(/^http/, "ws");

  // Attach message handler to a WebSocket instance
  const attachWsHandlers = (ws: WebSocket) => {
    ws.onmessage = (event) => {
      const raw = event.data as string;
      if (raw === "IGNORE") { setVoiceStatus(s => s === "thinking" ? "idle" : s); return; }
      try {
        const payload = JSON.parse(raw);

        const playAudio = (b64: string, onDone?: () => void) => {
          if (!b64) { onDone?.(); return; }
          stopCurrentAudio();
          const audio = new Audio("data:audio/mp3;base64," + b64);
          currentAudioRef.current = audio;
          setVoiceStatus("speaking");
          audio.onended = () => { setVoiceStatus("idle"); onDone?.(); };
          audio.onerror = () => { setVoiceStatus("idle"); onDone?.(); };
          audio.play().catch(console.error);
        };

        if (payload.type === "limit" || payload.type === "close") {
          // Always play the closing audio; stop voice mode when done
          playAudio(payload.audio, () => stopVoiceMode());
          return;
        }

        if (payload.type === "reply") {
          if (voiceModeRef.current) {
            // ── Voice mode active: audio only, never touch the chatbox ──
            if (payload.audio) playAudio(payload.audio);
            else {
              const u = new SpeechSynthesisUtterance(payload.text);
              setVoiceStatus("speaking");
              u.onend = u.onerror = () => setVoiceStatus("idle");
              window.speechSynthesis.speak(u);
            }
          }
          // ── Voice was stopped before reply arrived: discard silently ──
          // (no audio, no chat entry)
        }
      } catch { /* ignore malformed frame */ }
    };
  };

  // Connect (or reconnect) WebSocket — called on mount and before each voice session
  const connectWs = () => new Promise<WebSocket>((resolve, reject) => {
    // Reuse if already open
    if (wsRef.current?.readyState === WebSocket.OPEN) { resolve(wsRef.current); return; }
    wsRef.current?.close();
    const ws = new WebSocket(`${BACKEND_WS}/ws/voice`);
    const timeout = setTimeout(() => reject(new Error("WebSocket connection timed out")), 5000);
    ws.onopen = () => { clearTimeout(timeout); attachWsHandlers(ws); wsRef.current = ws; resolve(ws); };
    ws.onerror = () => { clearTimeout(timeout); reject(new Error("Could not connect to AI backend")); };
  });

  // Initial connection on mount
  useEffect(() => {
    connectWs().catch(() => {}); // silent on load — will retry in startVoiceMode
    return () => wsRef.current?.close();
  }, []);

  const stopCurrentAudio = () => {
    window.speechSynthesis.cancel();
    if (currentAudioRef.current) {
      currentAudioRef.current.pause();
      currentAudioRef.current.currentTime = 0;
      currentAudioRef.current = null;
    }
  };

  const stopVoiceMode = () => {
    voiceModeRef.current = false;
    recordingRef.current = false;
    setVoiceMode(false);
    setVoiceStatus("idle");
    stopCurrentAudio();
    if (mediaRecorderRef.current?.state !== "inactive") mediaRecorderRef.current?.stop();
    streamRef.current?.getTracks().forEach(t => t.stop());
    streamRef.current = null;
    audioCtxRef.current?.close();
    audioCtxRef.current = null;
  };

  // Fetch greeting from backend then start recording loop
  const startVoiceMode = async () => {
    if (!navigator.mediaDevices) { alert("Browser doesn't support audio recording."); return; }

    // Ensure WebSocket is connected before starting
    try {
      await connectWs();
    } catch (err: any) {
      alert("Cannot reach AI backend. Make sure the server is running.");
      return;
    }

    voiceModeRef.current = true;
    setVoiceMode(true);
    stopCurrentAudio();

    // Play greeting immediately
    try {
      const res  = await fetch(`${BACKEND_HTTP}/greet`);
      const data = await res.json();
      if (data.audio) {
        const audio = new Audio("data:audio/mp3;base64," + data.audio);
        currentAudioRef.current = audio;
        setVoiceStatus("speaking");
        await new Promise<void>(resolve => {
          audio.onended = audio.onerror = () => { setVoiceStatus("idle"); resolve(); };
          audio.play().catch(() => resolve());
        });
      }
    } catch { /* greeting failed — continue to listening anyway */ }

    if (!voiceModeRef.current) return;

    // Start audio capture
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: { echoCancellation: true, noiseSuppression: true, autoGainControl: true },
    });
    streamRef.current = stream;

    const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
    const ctx = new AudioCtx();
    audioCtxRef.current = ctx;
    const analyser = ctx.createAnalyser();
    analyser.fftSize = 512;
    ctx.createMediaStreamSource(stream).connect(analyser);
    silenceStartRef.current = Date.now();

    const loop = () => {
      if (!voiceModeRef.current) return;
      requestAnimationFrame(loop);

      const buf = new Uint8Array(analyser.frequencyBinCount);
      analyser.getByteFrequencyData(buf);
      const vol = buf.reduce((a, b) => a + b, 0) / buf.length;
      const threshold = isSpeakingRef.current ? 35 : 5;

      if (vol > threshold) {
        if (isSpeakingRef.current) { stopCurrentAudio(); setVoiceStatus("idle"); }
        silenceStartRef.current = Date.now();
        if (!recordingRef.current) {
          recordingRef.current = true;
          setVoiceStatus("listening");
          const rec = new MediaRecorder(stream);
          mediaRecorderRef.current = rec;
          rec.ondataavailable = (e) => {
            if (e.data.size > 0 && wsRef.current?.readyState === WebSocket.OPEN && voiceModeRef.current)
              wsRef.current.send(e.data);
          };
          rec.start();
        }
      } else if (recordingRef.current && Date.now() - silenceStartRef.current > 750) {
        recordingRef.current = false;
        setVoiceStatus("thinking");
        if (mediaRecorderRef.current?.state !== "inactive") mediaRecorderRef.current?.stop();
      }
    };
    loop();
  };

  const toggleVoice = () => (voiceMode ? stopVoiceMode() : startVoiceMode());

  // Text chat
  const handleTextSubmit = async (text: string) => {
    if (!text.trim()) return;
    setMessages(prev => [...prev, { role: "user", text }]);
    try {
      const res  = await fetch(`${BACKEND_HTTP}/chat`, {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text }),
      });
      const data = await res.json();
      setMessages(prev => [...prev, { role: "ai", text: data.reply }]);
    } catch {
      setMessages(prev => [...prev, { role: "ai", text: "Connection error with AI backend." }]);
    }
  };

  const handleSend = () => { handleTextSubmit(input); setInput(""); };

  const statusLabel =
    voiceStatus === "listening" ? "Listening..."
    : voiceStatus === "thinking" ? "Forming an answer..."
    : voiceStatus === "speaking" ? "Speaking..."
    : "Ready — say something!";

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">

      {/* Chat popup */}
      {chatOpen && (
        <div className="flex flex-col w-80 sm:w-96 h-[440px] rounded-2xl border border-white/10 bg-[#040d1c]/97 shadow-[0_0_50px_rgba(14,165,233,0.12)] backdrop-blur-xl overflow-hidden animate-in slide-in-from-bottom-4 fade-in duration-300">

          <div className="flex items-center justify-between px-4 py-3 border-b border-white/5 bg-black/30 shrink-0">
            <span className="text-[11px] font-bold text-white/80 uppercase tracking-widest">
              Deeksha&apos;s AI — Chat
            </span>
            <button onClick={() => setChatOpen(false)} className="text-white/30 hover:text-white/70 p-1 transition-colors">
              <X size={14} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-3 chat-scrollbar min-h-0">
            {messages.length === 0 && (
              <p className="text-white/30 text-xs text-center pt-2 select-none">Ask Deeksha&apos;s agent anything!</p>
            )}
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[88%] rounded-xl px-3 py-2 text-sm leading-relaxed ${
                  msg.role === "user"
                    ? "bg-cyan-500/15 text-cyan-100 border border-cyan-500/20"
                    : "bg-white/5 text-white/90 border border-white/8"
                }`}>
                  {msg.role === "ai" && (
                    <span className="block text-[9px] text-cyan-400 font-bold mb-1 uppercase tracking-widest">AI Agent</span>
                  )}
                  {msg.text}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {messages.length === 0 && (
            <div className="flex flex-wrap gap-1.5 justify-center px-3 pb-2 shrink-0">
              {["Who is Deeksha?", "Her skills?", "Contact her?"].map(q => (
                <button key={q} onClick={() => handleTextSubmit(q)}
                  className="text-[10px] bg-cyan-900/30 hover:bg-cyan-800/50 text-cyan-200 py-1 px-2.5 rounded-full border border-cyan-500/25 transition-colors">
                  {q}
                </button>
              ))}
            </div>
          )}

          <div className="flex gap-2 p-3 border-t border-white/5 shrink-0">
            <input
              className="flex-1 rounded-full bg-white/5 border border-white/10 px-4 py-2 text-sm text-white placeholder-white/25 focus:outline-none focus:border-cyan-500/40 min-w-0"
              placeholder="Type a question..."
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === "Enter" && handleSend()}
            />
            <button onClick={handleSend}
              className="p-2.5 rounded-full bg-cyan-500 text-black hover:bg-cyan-400 transition-colors shrink-0">
              <Send size={15} />
            </button>
          </div>
        </div>
      )}

      {/* Voice status card — visible while voice mode is active */}
      {voiceMode && (
        <div className="flex flex-col items-center gap-3 px-6 py-4 rounded-2xl border border-white/10 bg-[#040d1c]/97 shadow-[0_0_40px_rgba(14,165,233,0.15)] backdrop-blur-xl animate-in fade-in duration-300 min-w-[200px]">
          <p className="text-[10px] uppercase tracking-widest text-white/40 font-semibold">Deeksha&apos;s AI</p>
          <VoiceBars status={voiceStatus} />
          <p className="text-xs text-white/60">{statusLabel}</p>
        </div>
      )}

      {/* Action buttons */}
      <div className="flex gap-2.5">

        {/* Voice button */}
        <button
          onClick={toggleVoice}
          className={`flex items-center gap-2 rounded-full px-4 py-3 text-sm font-semibold transition-all shadow-lg hover:scale-105 active:scale-95 ${
            voiceMode
              ? "bg-red-500 hover:bg-red-600 text-white shadow-[0_0_20px_rgba(239,68,68,0.4)]"
              : "bg-gradient-to-r from-cyan-500 to-blue-600 text-white hover:opacity-90 shadow-[0_0_20px_rgba(14,165,233,0.3)]"
          }`}
        >
          {voiceMode
            ? <><Square size={14} className="shrink-0" /> Stop</>
            : <><Mic    size={14} className="shrink-0" /> Proto - Talk To Me</>}
        </button>

        {/* Chat button */}
        <button
          onClick={() => setChatOpen(o => !o)}
          className={`flex items-center gap-2 rounded-full px-4 py-3 text-sm font-semibold transition-all shadow-lg hover:scale-105 active:scale-95 ${
            chatOpen
              ? "bg-white/15 text-white border border-white/20"
              : "bg-white/8 text-white/70 border border-white/10 hover:bg-white/15 hover:text-white"
          }`}
        >
          <MessageSquare size={14} className="shrink-0" />
          Chat
          {!chatOpen && messages.length > 0 && (
            <span className="ml-0.5 h-4 w-4 rounded-full bg-cyan-500 text-[9px] font-bold text-black flex items-center justify-center">
              {messages.filter(m => m.role === "ai").length}
            </span>
          )}
        </button>

      </div>
    </div>
  );
}
