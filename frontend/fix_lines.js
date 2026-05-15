const fs = require('fs');
const filePath = '/Users/deeksha_ramakrishna/Desktop/portfolio-deeksha/frontend/app/page.tsx';
let lines = fs.readFileSync(filePath, 'utf8').split('\n');
const start = lines.findIndex(l => l.includes('{item.description}'));
const end = lines.findIndex((l, idx) => idx > start && l.includes('</article>'));
const replacement = `                    {item.description}
                  </p>
                  {item.bullets && item.bullets.length > 0 && (
                    <ul className="relative z-10 mt-4 space-y-2 text-white/70 font-light text-base list-disc list-outside ml-4">
                      {item.bullets.map((bullet, bIdx) => (
                        <li key={bIdx} className="pl-2 marker:text-cyan-400">{bullet}</li>
                      ))}
                    </ul>
                  )}
                </article>`;
lines.splice(start, end - start + 1, replacement);
fs.writeFileSync(filePath, lines.join('\n'));
