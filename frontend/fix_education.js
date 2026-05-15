const fs = require('fs');
const filePath = '/Users/deeksha_ramakrishna/Desktop/portfolio-deeksha/frontend/app/page.tsx';
let content = fs.readFileSync(filePath, 'utf8');

const updatedEdu = `const education = [
  {
    degree: "Master of Engineering in Cloud Engineering",
    school: "University of Maryland, College Park",
    year: "2024 - 2025",
  },
  {
    degree: "Master of Science in Data and Knowledge Engineering(Applied ML)",
    school: "Otto Von Guericke University, Magdeburg, Germany",
    year: "2019 - 2023",
  },
  {
    degree: "Bachelor of Engineering in Computer Science and Engineering",
    school: "Dr. Ambedkar Institute of Technology, India",
    year: "2013 - 2017",
  },
];`;

content = content.replace(/const education = \[[\s\S]*?\];/m, updatedEdu);
fs.writeFileSync(filePath, content);
