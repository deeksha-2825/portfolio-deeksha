const fs = require('fs');
const filePath = '/Users/deeksha_ramakrishna/Desktop/portfolio-deeksha/frontend/app/page.tsx';
let content = fs.readFileSync(filePath, 'utf8');

// Replace Github and Linkedin imports with their correct lucide-react names
content = content.replace("Github, Linkedin", "Github as GithubIcon, Linkedin as LinkedinIcon");
content = content.replace(/<Github/g, "<GithubIcon");
content = content.replace(/<Linkedin/g, "<LinkedinIcon");

fs.writeFileSync(filePath, content);
