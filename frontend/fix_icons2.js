const fs = require('fs');
const filePath = '/Users/deeksha_ramakrishna/Desktop/portfolio-deeksha/frontend/app/page.tsx';
let content = fs.readFileSync(filePath, 'utf8');

// Replace Github and Linkedin imports with their correct lucide-react names (PascalCase)
content = content.replace("Github as GithubIcon, Linkedin as LinkedinIcon", "GithubIcon, Linkedin");
content = content.replace(/<GithubIcon/g, "<GithubIcon");
content = content.replace(/<LinkedinIcon/g, "<Linkedin");

fs.writeFileSync(filePath, content);
