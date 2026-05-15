const fs = require('fs');
const filePath = '/Users/deeksha_ramakrishna/Desktop/portfolio-deeksha/frontend/app/page.tsx';
let content = fs.readFileSync(filePath, 'utf8');

// 1. Add ExternalLink to lucide-react imports
if (!content.includes('ExternalLink')) {
  content = content.replace('FolderGit2 } from "lucide-react";', 'FolderGit2, ExternalLink } from "lucide-react";');
}

// 2. Add companyUrl to Eleftheria Capital object
content = content.replace(
  'company: "Eleftheria Capital",',
  'company: "Eleftheria Capital",\n    companyUrl: "https://eleftheriacapital.com", // You can edit this link'
);

// 3. Update the rendering block to render an anchor tag if companyUrl exists
const oldRender = '<p className="mt-2 text-sm font-medium uppercase tracking-widest text-cyan-300/80">{item.company}</p>';
const newRender = `{/* @ts-ignore */}
                      {item.companyUrl ? (
                        <a href={item.companyUrl} target="_blank" rel="noopener noreferrer" className="mt-2 text-sm font-medium uppercase tracking-widest text-cyan-300/80 hover:text-cyan-100 hover:underline transition-all inline-flex items-center gap-1 group/link w-fit">
                          {item.company}
                          <ExternalLink className="h-3 w-3 opacity-50 group-hover/link:opacity-100 transition-opacity" />
                        </a>
                      ) : (
                        <p className="mt-2 text-sm font-medium uppercase tracking-widest text-cyan-300/80">{item.company}</p>
                      )}`;

content = content.replace(oldRender, newRender);

fs.writeFileSync(filePath, content);
console.log("Link logic added successfully.");
