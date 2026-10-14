const fs=require('node:fs'),vm=require('node:vm'),path=require('node:path'),assert=require('node:assert/strict');
process.chdir(path.resolve(__dirname,'..'));
const context=vm.createContext({URLSearchParams});
vm.runInContext(fs.readFileSync('content.js','utf8')+fs.readFileSync('engagement.js','utf8'),context);
const answer=query=>vm.runInContext(`assistantAnswer(${JSON.stringify(query)})`,context);
const expected=[['I need SEO and leads','/services/marketing'],['Help with my brand positioning','/services/brand'],['We need an operations platform','/services/technology'],['Improve operating processes and SOPs','/services/operations'],['Can you prepare a pitch deck?','/services/finance'],['I need working capital','/wealth'],['GST support','/services/compliance'],['Business contracts','/services/legal'],['Help with our business plan','/services/strategy'],['Can we sign an NDA for the software project?','/contact'],['How much does marketing cost?','/contact'],['Can I book a meeting?','/contact'],['Tell me about quantum gravity','/contact']];
for(const [query,href] of expected)assert.equal(answer(query).href,href,query);
assert.match(answer('book a slot').text,/cannot reserve/);
assert.match(answer('NDA').text,/arranged separately/);
assert.match(answer('loan').text,/confirmed separately/);
const draft=vm.runInContext(`whatsappDraft(${JSON.stringify('Name: A & B\nPlease call me')})`,context);
assert.equal(new URL(draft).hostname,'wa.me');assert.equal(new URL(draft).pathname,'/918217716904');assert.equal(new URL(draft).searchParams.get('text'),'Name: A & B\nPlease call me');
const html=fs.readFileSync('contact.html','utf8');assert(html.includes('name="name"'));assert(html.includes('name="company"'));assert(html.includes('name="email"'));assert(html.includes('It does not sign an agreement or confirm a meeting.'));assert(html.includes('form#conversation-form{display:none}'));
assert(!fs.readFileSync('experience.js','utf8').includes("getElementById('brief')"),'Old contact handler must not break deep links');
console.log('Verified service guidance, NDA/booking boundaries, WhatsApp encoding and static contact fallback.');

// Section navigation must advance, handle a clamped footer, and return to the top.
const next=(stops,current,max)=>JSON.parse(JSON.stringify(vm.runInContext(`nextSectionStop(${JSON.stringify(stops)},${current},${max})`,context)));
const stops=[{top:0,label:'Hero'},{top:600,label:'Expertise'},{top:1100,label:'Work'},{top:1600,label:'Footer'}];
assert.equal(next(stops,0,1600).top,600);assert.equal(next(stops,600,1600).top,1100);
assert.equal(next(stops,1120,1600).top,1600);assert.equal(next(stops,1600,1600).isTop,true);assert.equal(next(stops,1600,1600).top,0);
assert.equal(next([{top:0}],300,500).top,500);
console.log('Verified section advancement, footer destination and return to top.');
