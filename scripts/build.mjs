import {readFile, writeFile} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
import path from 'node:path';
import {layout} from './lib/layout.mjs';
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const data = {};
for (const name of ['site','group','publications','teaching','news','instruments']) {
  data[name] = JSON.parse(await readFile(path.join(root, 'content', `${name}.json`), 'utf8'));
}
const pages = [...data.site.navigation, {id:'sources',label:'Sources & credits',file:'sources.html'}];
const seen = new Set();
for (const page of pages) {
  if (page.file === 'index.html') continue;
  if (!/^[a-z][a-z0-9-]*$/.test(page.id) || !/^[a-z][a-z0-9-]*\.html$/.test(page.file)) throw new Error('Page ids and filenames must use simple lowercase names.');
  if(seen.has(page.file)) throw new Error(`Duplicate output: ${page.file}`);
  seen.add(page.file);
  const {default: render} = await import(`./pages/${page.id}.mjs`);
  const body = render(data);
  await writeFile(path.join(root, page.file), layout({site:data.site, page, body}));
  console.log(`Built ${page.file}`);
}
console.log('Ready for GitHub Pages. No runtime dependencies.');
