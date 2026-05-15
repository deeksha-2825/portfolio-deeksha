const fs = require('fs');
const filePath = '/Users/deeksha_ramakrishna/Desktop/portfolio-deeksha/frontend/app/page.tsx';
let content = fs.readFileSync(filePath, 'utf8');

const targetToReplace = `<p className="relative z-10 mt-6 leading-relaxed text-white/70 font-light text-base">
                    {item.description}
                  </p>
                </article>`;

const actualReplacement = `<p className="relative z-10 mt-6 leading-relaxed text-white/70 font-light text-base">
                    {item.description}
                  </p>
                  {/* @ts-ignore */}
                  {item.bullets && item.bullets.length > 0 && (
                    <ul className="relative z-10 mt-4 space-y-2 text-white/70 font-light text-base list-disc list-outside ml-4">
                      {/* @ts-ignore */}
                      {item.bullets.map((bullet, bIdx) => (
                        <li key={bIdx} className="pl-2 marker:text-cyan-400">{bullet}</li>
                      ))}
                    </ul>
                  )}
                </article>`;

content = content.replace(targetToReplace, actualReplacement);
fs.writeFileSync(filePath, content);
