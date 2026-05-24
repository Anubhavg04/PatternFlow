const fs = require('fs');
let content = fs.readFileSync('app/page.tsx', 'utf8');

// Fix 1: Add Image import if it doesn't exist
if (!content.includes('import Image from "next/image";') && !content.includes('import Image from \'next/image\';')) {
  content = content.replace('import { useState } from "react";', 'import { useState } from "react";\nimport Image from "next/image";');
}

// Fix 2: Escape double quotes in the founder quote
content = content.replaceAll(
  '"I built PatternFlow because I was exhausted by the standard LeetCode grind."',
  '&quot;I built PatternFlow because I was exhausted by the standard LeetCode grind.&quot;'
);

fs.writeFileSync('app/page.tsx', content);
console.log('Successfully fixed page.tsx for Image import and unescaped quotes!');
