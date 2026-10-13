const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict');
process.chdir(path.resolve(__dirname,'..'));
const sitemap=fs.readFileSync('sitemap.xml','utf8');const urls=[...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map(m=>new URL(m[1]));
assert.equal(urls.length,23);
const titles=new Set();
for(const url of urls){
 const file=url.pathname==='/'?'index.html':url.pathname.slice(1)+'.html';const html=fs.readFileSync(file,'utf8');
 const title=html.match(/<title>(.*?)<\/title>/)?.[1];assert(title&&!titles.has(title),`Unique title: ${file}`);titles.add(title);
 assert(html.includes(`<link rel="canonical" href="${url.href}">`),`Canonical: ${file}`);
 assert.equal((html.match(/<h1[ >]/g)||[]).length,1,`One main heading: ${file}`);
 assert(html.includes('<meta name="description" content="')&&!html.includes('content=""'),`Description: ${file}`);
 assert(!html.includes('href="#/'),`Crawlable links: ${file}`);
 assert(!html.includes('undefined'),`Complete content: ${file}`);
 assert(!html.includes('noindex'),`Indexable: ${file}`);
 JSON.parse(html.match(/<script type="application\/ld\+json">(.*?)<\/script>/s)[1]);
 for(const [,href] of html.matchAll(/(?:href|src)="(\/[^"?#]*)(?:[?#][^"]*)?"/g)){
  const p=href==='/'?'index.html':href.slice(1);assert(fs.existsSync(p)||fs.existsSync(p+'.html'),`Valid local destination ${href} in ${file}`);
 }
}
const home=fs.readFileSync('index.html','utf8');assert(home.indexOf('business-outcomes')<home.indexOf('editorial-work'));assert(home.indexOf('editorial-work')<home.indexOf('editorial-expertise'));assert(home.includes('data-focus="growth"'));assert(!home.includes('data-focus="funding"'));assert(home.includes('Business strategy, marketing, branding and custom technology.'));
const marketing=fs.readFileSync('services/marketing.html','utf8');assert(marketing.includes('SEO &amp; Lead Generation'));assert(marketing.includes('SEO & content strategy'));assert(marketing.includes('/contact?interest=marketing'));
assert(fs.readFileSync('404.html','utf8').includes('name="robots" content="noindex"'));
console.log(`Verified ${urls.length} static pages: headings, metadata, structured data, assets, internal links and homepage service balance.`);
