const fs = require('fs');
const filePath = '/Users/deeksha_ramakrishna/Desktop/portfolio-deeksha/frontend/app/page.tsx';
let content = fs.readFileSync(filePath, 'utf8');

const regex = /{item\.companyUrl \? \(/;
const replacement = `{(item as any).companyUrl ? (`

content = content.replace(regex, replacement);
fs.writeFileSync(filePath, content);
