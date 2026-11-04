import {readFile, readdir, access} from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import assert from 'node:assert/strict';
import {getBookingLink} from './lib/components.mjs';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const files=(await readdir(root)).filter(f=>f.endsWith('.html'));
let checked=0;
for(const file of files){
  const html=await readFile(path.join(root,file),'utf8');
  assert.equal((html.match(/<h1[ >]/g)||[]).length,1,`${file}: one main heading`);
  assert(html.includes('<html lang="en">'),`${file}: English language`);
  const ids=[...html.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]);
  assert.equal(ids.length,new Set(ids).size,`${file}: unique ids`);
  for(const m of html.matchAll(/\b(?:src|href)="([^"]+)"/g)){
    const url=m[1];
    if(/^(?:https?:|mailto:|tel:|data:)/.test(url)) continue;
    const [local,fragment]=url.split('#');
    const target=local?path.resolve(root,local):path.join(root,file);
    assert(target.startsWith(root+path.sep),`${file}: site-relative path`);
    await access(target);
    if(fragment && target.endsWith('.html')){
      const source=await readFile(target,'utf8');
      assert(source.includes(`id="${fragment}"`),`${file}: fragment ${url}`);
    }
    checked++;
  }
}
const site=JSON.parse(await readFile(path.join(root,'content/site.json'),'utf8'));
assert.equal(getBookingLink(site), '');
assert.equal(getBookingLink({...site,booking:{mode:'external',url:'https://forms.gle/example'}}), 'https://forms.gle/example');
assert.equal(getBookingLink(site,{bookingUrl:'https://example.org/assets/123'}), 'https://example.org/assets/123');
assert.throws(()=>getBookingLink(site,{bookingUrl:'javascript:alert(1)'}));
console.log(`PASS: ${files.length} pages, ${checked} local references, unique ids, headings, fragments and booking link validation.`);
