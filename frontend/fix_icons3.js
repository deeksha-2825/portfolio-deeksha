const fs = require('fs');
const filePath = '/Users/deeksha_ramakrishna/Desktop/portfolio-deeksha/frontend/app/page.tsx';
let content = fs.readFileSync(filePath, 'utf8');

// The standard lucide-react brand icons were removed from standard lucide. 
// We will simply use an SVG path for GitHub and LinkedIn or fallback to different icons.

const githubSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-github w-5 h-5"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.03c3.15-.38 6.5-1.4 6.5-7.a5.2 5.2 0 0 0-1.38-3.6 5.5 5.5 0 0 0-.13-3.5s-1.1-.35-3.5 1.25a11.7 11.7 0 0 0-6.2 0C6.1 2.35 5 2.7 5 2.7a5.5 5.5 0 0 0-.13 3.5 5.2 5.2 0 0 0-1.38 3.6c0 5.6 3.35 6.6 6.5 7a4.8 4.8 0 0 0-1 3.03V22"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>`;
const linkedinSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-linkedin w-5 h-5"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>`;

content = content.replace('import { Home as HomeIcon, Briefcase, GraduationCap, FolderGit2, ExternalLink, GithubIcon, Linkedin, Mail, Phone } from "lucide-react";', 'import { Home as HomeIcon, Briefcase, GraduationCap, FolderGit2, ExternalLink, Mail, Phone } from "lucide-react";');
content = content.replace(/<GithubIcon className="w-5 h-5" \/>/g, githubSvg);
content = content.replace(/<Linkedin className="w-5 h-5" \/>/g, linkedinSvg);

fs.writeFileSync(filePath, content);
