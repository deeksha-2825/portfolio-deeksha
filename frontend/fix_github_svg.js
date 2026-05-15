const fs = require('fs');
const filePath = '/Users/deeksha_ramakrishna/Desktop/portfolio-deeksha/frontend/app/page.tsx';
let content = fs.readFileSync(filePath, 'utf8');

// Fix the typo in the SVG path data "6.5-7.a5.2" -> "6.5-7a5.2"
content = content.replace('6.5-7.a5.2', '6.5-7a5.2');

fs.writeFileSync(filePath, content);
