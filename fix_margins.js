const fs = require('fs');
const files = [
  'app/page.tsx',
  'app/products/page.tsx',
  'app/ourstory/page.tsx',
  'app/all-purposegravy/page.tsx'
];

files.forEach(file => {
  if (fs.existsSync(file)) {
    let content = fs.readFileSync(file, 'utf8');
    
    // Replace text block containers to add negative left margin
    // Hero text in page.tsx
    // The previous replace_file_content already changed the hero text, let's revert it and do it properly, or just leave it.
    // Let's actually replace max-w-[1440px] with max-w-[1600px] to make the container wider. It's much cleaner than adding negative margins randomly.
    content = content.replace(/max-w-\[1440px\]/g, 'max-w-[1600px]');

    fs.writeFileSync(file, content);
  }
});
console.log('Done replacing max-w-[1440px] with max-w-[1600px]');
