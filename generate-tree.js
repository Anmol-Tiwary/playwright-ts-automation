const fs = require('fs');
const path = require('path');

const IGNORE = ['node_modules', '.git', 'test-results', 'playwright-report', 'allure-results', '.playwright-mcp'];

function buildTree(dir, prefix = '') {
  let output = '';
  const items = fs.readdirSync(dir).filter(item => !IGNORE.includes(item));
  items.forEach((item, index) => {
    const fullPath = path.join(dir, item);
    const isLast = index === items.length - 1;
    const connector = isLast ? '└── ' : '├── ';
    output += `${prefix}${connector}${item}\n`;
    if (fs.statSync(fullPath).isDirectory()) {
      const newPrefix = prefix + (isLast ? '    ' : '│   ');
      output += buildTree(fullPath, newPrefix);
    }
  });
  return output;
}

const tree = buildTree('.');
fs.writeFileSync('detailed-tree.txt', tree);
console.log('Tree generated successfully.');