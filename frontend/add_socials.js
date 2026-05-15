const fs = require('fs');
const filePath = '/Users/deeksha_ramakrishna/Desktop/portfolio-deeksha/frontend/app/page.tsx';
let content = fs.readFileSync(filePath, 'utf8');

// 1. Add icons to lucide-react imports
content = content.replace(
  /import { (.*?) } from "lucide-react";/,
  'import { $1, Github, Linkedin, Mail, Phone } from "lucide-react";'
);

// 2. Replace the old button section with the new flex container including icons
const regex = /<div className="mt-4 flex gap-4">[\s\S]*?View My Background\s*<\/button>\s*<\/div>/;

const newButtonBlock = `<div className="mt-4 flex flex-wrap items-center gap-6">
                 <button 
                   onClick={() => scrollToSection("experience")}
                   className="rounded-full bg-white text-black px-8 py-4 text-sm font-semibold tracking-wide hover:scale-105 transition-transform duration-300 shadow-[0_0_30px_rgba(255,255,255,0.3)]"
                 >
                   View My Background
                 </button>
                 <div className="flex items-center gap-4">
                   <a 
                     href="https://github.com/[your-github]" 
                     target="_blank" 
                     rel="noreferrer" 
                     className="p-3 rounded-full border border-white/20 bg-white/5 hover:bg-white/10 hover:text-cyan-300 hover:border-cyan-500/30 transition-all text-white/70 hover:scale-110 hover:shadow-[0_0_15px_rgba(34,211,238,0.2)]"
                     title="GitHub"
                   >
                     <Github className="w-5 h-5" />
                   </a>
                   <a 
                     href="https://linkedin.com/in/[your-linkedin]" 
                     target="_blank" 
                     rel="noreferrer" 
                     className="p-3 rounded-full border border-white/20 bg-white/5 hover:bg-white/10 hover:text-cyan-300 hover:border-cyan-500/30 transition-all text-white/70 hover:scale-110 hover:shadow-[0_0_15px_rgba(34,211,238,0.2)]"
                     title="LinkedIn"
                   >
                     <Linkedin className="w-5 h-5" />
                   </a>
                   <a 
                     href="https://mail.google.com/mail/?view=cm&fs=1&to=[your-email]@gmail.com" 
                     target="_blank"
                     rel="noreferrer"
                     className="p-3 rounded-full border border-white/20 bg-white/5 hover:bg-white/10 hover:text-fuchsia-300 hover:border-fuchsia-500/30 transition-all text-white/70 hover:scale-110 hover:shadow-[0_0_15px_rgba(217,70,239,0.2)]"
                     title="Compose in Gmail"
                   >
                     <Mail className="w-5 h-5" />
                   </a>
                   <a 
                     href="tel:+1234567890" 
                     className="p-3 rounded-full border border-white/20 bg-white/5 hover:bg-white/10 hover:text-green-300 hover:border-green-500/30 transition-all text-white/70 hover:scale-110 hover:shadow-[0_0_15px_rgba(74,222,128,0.2)]"
                     title="Phone"
                   >
                     <Phone className="w-5 h-5" />
                   </a>
                 </div>
              </div>`;

content = content.replace(regex, newButtonBlock);
fs.writeFileSync(filePath, content);
console.log("Social icons added successfully.");
