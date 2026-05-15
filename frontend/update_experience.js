const fs = require('fs');
const filePath = '/Users/deeksha_ramakrishna/Desktop/portfolio-deeksha/frontend/app/page.tsx';
let content = fs.readFileSync(filePath, 'utf8');

const updatedExp = `const experience = [
  {
    role: "AI and Cloud Infrastructure Engineer",
    company: "Eleftheria Capital",
    duration: "2023 - Present",
    description: "",
    bullets: [
      "Designed a low-latency options trading infrastructure using Terraform, Docker, and Kubernetes for zero-downtime execution in AWS.",
      "Engineered an end-to-end ML-driven trading strategy and sentiment analysis pipeline, deployed to AWS.",
      "Developed Python and Bash automation scripts for data ingestion and service releases to run strategy logic.",
      "Maintained optimal infrastructure health via Linux administration, performance tuning, and Prometheus/Grafana observability pipelines.",
      "Maintained reliable CI/CD pipelines using GitHub Actions for seamless IaC updates and service rollouts."
    ]
  },
  {
    role: "Backend Intern",
    company: "[Previous Company]",
    duration: "2022 - 2023",
    description: "Engineered APIs and improved database performance. (Please update with details).",
  },
];`;

content = content.replace(/const experience = \[[\s\S]*?\];/m, updatedExp);

const renderExpPattern = /<p className="relative z-10 mt-6 leading-relaxed text-white\/70 font-light text-base">\s*\{item\.description\}\s*<\/p>/;

const renderExpBullets = `<p className="relative z-10 mt-6 leading-relaxed text-white/70 font-light text-base">
                    {item.description}
                  </p>
                  {item.bullets && item.bullets.length > 0 && (
                    <ul className="relative z-10 mt-4 space-y-2 text-white/70 font-light text-base list-disc list-outside ml-4">
                      {item.bullets.map((bullet, bIdx) => (
                        <li key={bIdx} className="pl-2 marker:text-cyan-400">{bullet}</li>
                      ))}
                    </ul>
                  )}`;

content = content.replace(renderExpPattern, renderExpBullets);

fs.writeFileSync(filePath, content);
console.log('Update complete');
