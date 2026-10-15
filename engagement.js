/* Basic, local service guidance. No model key, external chat API or automated submission. */
const whatsappDraft=text=>'https://wa.me/918217716904?text='+encodeURIComponent(text);
const emailDraft=(body,subject='A business conversation with TCG')=>'mailto:umesh@tcg.ind.in?subject='+encodeURIComponent(subject)+'&body='+encodeURIComponent(body);
function conversationForm(interest){return `<form id="conversation-form"><fieldset class="conversation-choice"><legend>How would you like to begin?</legend><label><input type="radio" name="journey" value="nda" checked><span>NDA first<small>Protect the idea before we discuss it.</small></span></label><label><input type="radio" name="journey" value="meeting"><span>Introductory meeting<small>Start with a general conversation.</small></span></label></fieldset><div class="form-grid"><div class="field"><label for="visitor-name">Your name *</label><input id="visitor-name" name="name" autocomplete="name" required maxlength="100" placeholder="Full name"></div><div class="field"><label for="visitor-company">Company / venture *</label><input id="visitor-company" name="company" autocomplete="organization" required maxlength="150" placeholder="Your business name"></div><div class="field full"><label for="visitor-email">Email *</label><input id="visitor-email" name="email" type="email" autocomplete="email" required maxlength="180" placeholder="you@company.com"></div><div class="field full"><label for="visitor-interest">What would you like to explore?</label><select id="visitor-interest" name="interest"><option value="">Help me find the right starting point</option>${services.map(s=>`<option value="${s.id}" ${interest===s.id?'selected':''}>${s.name}</option>`).join('')}<option value="wealth" ${interest==='wealth'?'selected':''}>TCG Wealth / business funding</option></select></div><div class="field full"><label for="visitor-time">Preferred meeting time (optional)</label><input id="visitor-time" name="time" maxlength="180" placeholder="e.g. Thursday afternoon, India time"><span class="field-help">A preference only. Umesh will confirm availability with you.</span></div></div><p class="form-notice" id="request-notice">This requests an NDA for review. It does not sign an agreement or confirm a meeting. Keep confidential details out of this introduction.</p><button class="btn" type="submit">Review your request <span aria-hidden="true">↗</span></button><div id="conversation-result" tabindex="-1" hidden aria-live="polite"></div></form>`;}
function bindConversation(){
 const form=document.getElementById('conversation-form'), result=document.getElementById('conversation-result');
 if(new URLSearchParams(location.search).get('journey')==='meeting'){form.elements.journey.value='meeting';document.getElementById('request-notice').textContent='This requests an introductory meeting. Umesh will confirm a suitable time with you. No calendar slot is reserved by this form.';}
 form.addEventListener('change',()=>{result.hidden=true;document.getElementById('request-notice').textContent=form.elements.journey.value==='nda'?'This requests an NDA for review. It does not sign an agreement or confirm a meeting. Keep confidential details out of this introduction.':'This requests an introductory meeting. Umesh will confirm a suitable time with you. No calendar slot is reserved by this form.';});
 form.addEventListener('input',()=>{result.hidden=true;});
 form.addEventListener('submit',e=>{
  e.preventDefault();const d=new FormData(form);const nda=d.get('journey')==='nda';
  const chosen=form.elements.interest.selectedOptions[0].textContent;
  const problem=problems.find(p=>p.id===new URLSearchParams(location.search).get('problem'));
  const body=`Hi Umesh, I’d like to ${nda?'request an NDA before discussing my business idea and arrange a meeting after the agreement is in place':'arrange an introductory meeting with TCG'}.\n\nName: ${d.get('name').trim()}\nCompany: ${d.get('company').trim()}\nEmail: ${d.get('email').trim()}\nInterested in: ${chosen}${problem?'\nStarting point: '+problem.label:''}${d.get('time').trim()?'\nPreferred time (subject to confirmation): '+d.get('time').trim():''}\n\nPlease let me know the next steps.`;
  result.className='conversation-result';result.hidden=false;
  result.innerHTML=`<span class="eyebrow">Ready for your review</span><h3>${nda?'Your NDA request.':'Your meeting request.'}</h3><p class="request-preview">${esc(body)}</p><a class="btn" href="${esc(emailDraft(body,nda?'TCG NDA and meeting request':'TCG meeting request'))}">Open email draft <span aria-hidden="true">↗</span></a><a class="text-link" href="${esc(whatsappDraft(body))}" target="_blank" rel="noopener noreferrer">Send through WhatsApp <span aria-hidden="true">↗</span></a><button type="button" class="text-link" id="copy-request">Copy message</button><p class="field-help">Nothing has been sent yet. Open the draft in your email app or WhatsApp, review it and send when ready. ${nda?'The NDA will be arranged separately before you share confidential details.':'Your meeting is confirmed only after a time is agreed.'}</p><p class="field-help" id="copy-status" role="status">No email app connected? Copy this message into your usual email service.</p>`;
  result.querySelector('#copy-request').onclick=async()=>{const status=result.querySelector('#copy-status');try{await navigator.clipboard.writeText(body);status.textContent='Message copied. Paste it into an email to umesh@tcg.ind.in.';}catch{status.textContent='Please select and copy the message above, then email it to umesh@tcg.ind.in.';}};
  result.focus();
 });
}
function assistantAnswer(query){
 const q=query.toLowerCase();
 if(/\b(nda|confidential|secret|privacy|agreement|signing)\b/.test(q))return {text:'Prefer an NDA before we talk? Introduce yourself with your name and company on our contact page. You can send an NDA request to Umesh by email. The agreement is arranged separately before confidential details are shared.',href:'/contact',label:'Request an NDA'};
 if(/\b(book|meeting|calendar|slot|schedule|appointment|available)\b/.test(q))return {text:'You can request a conversation with Umesh Pareek, TCG’s founder. Share a preferred time through the contact page. Umesh will confirm availability with you by email. This assistant cannot reserve a slot or access a calendar.',href:'/contact',label:'Request a meeting'};
 if(/\b(price|pricing|cost|fee|fees|quote|budget|charge|rate|rates)\b/.test(q))return {text:'Engagements are scoped around your challenge, deliverables and requirements. TCG does not publish fixed prices here. Share a brief with Umesh to discuss the right scope and a quote.',href:'/contact',label:'Discuss your brief'};
 if(/\b(hi|hello|hey)\b/.test(q)&&q.split(/\s+/).length<5)return {text:'Hello. What would you like to move forward? I can explain TCG’s services, point you to our work, or help you reach Umesh.',href:'/services',label:'Explore our expertise'};
 if(/\b(where|location|located|bengaluru|bangalore|india)\b/.test(q))return {text:'TCG is based in Bengaluru, Karnataka, and works with startups and established businesses across India. Tell us your location and challenge so we can discuss how to work together.',href:'/about',label:'Meet the firm'};
 if(/\b(umesh|founder|team|who are|about tcg)\b/.test(q))return {text:'TCG is The Consulting Group, led by founder Umesh Pareek. Our work brings together strategy, marketing, brand, operations, technology and finance.',href:'/about',label:'Meet Umesh and TCG'};
 if(/\b(whatsapp|contact|email|phone|human|person|speak|call)\b/.test(q))return {text:'Email Umesh at umesh@tcg.ind.in or message him on WhatsApp at +91 82177 16904. If confidentiality matters, start with an NDA request on our contact page.',href:'/contact',label:'Start a conversation'};
 if(/\b(work|projects|portfolio|clients|experience|examples)\b/.test(q))return {text:'Explore TCG’s work with CashMyRent, SP Freight, Gully Bowls and the switch. Each project describes the actual scope and deliverables, from software and operations to brand and finance.',href:'/work',label:'See selected work'};
 const topics=[
  ['wealth',/\b(funding|financing|loan|loans|debt|capital|wealth|fund|funds)\b/,'TCG Wealth is our specialist business funding segment, including debt-based financing discussions. Availability, eligibility, terms and approval need to be confirmed separately with the team.',],
  ['marketing',/\b(marketing|seo|leads|lead generation|social|customers|advertising|sales)\b/,'TCG helps with marketing strategy, SEO content, social media and lead generation. We start with your audience, offer and commercial goals, then define the work.'],
  ['brand',/\b(brand|branding|positioning|identity|logo|website|design)\b/,'Brand work can cover positioning, messaging, visual identity and website design. The aim is a clear proposition that helps the right customers understand and choose your business.'],
  ['technology',/\b(software|platform|automation|app|technology|dashboard|crm|system|systems)\b/,'TCG builds web-based operations platforms, internal tools and business automation around your workflows. We define what your team needs before deciding what to build.'],
  ['operations',/\b(operations|process|sop|efficiency|margins|operating)\b/,'Operations consulting helps make the business easier to run through process improvement, SOPs, cost control and management visibility. We connect the operating plan with the systems your team uses.'],
  ['finance',/\b(pitch|deck|financial|finance|model|modelling|investor)\b/,'We help with financial models, business finance and pitch decks. The work connects your business story with the numbers and the decision your audience needs to make.'],
  ['compliance',/\b(compliance|gst|incorporation|registration|tax)\b/,'TCG supports business incorporation and compliance coordination. Share your business stage and requirements so the team can define the appropriate scope.'],
  ['legal',/\b(legal|contract|contracts)\b/,'TCG coordinates business contract and legal advisory requirements. Specific legal questions should be discussed with the team and the appropriate professional.'],
  ['strategy',/\b(strategy|growth|grow|launch|research|business plan|expand|expansion)\b/,'Strategy work can include market research, business plans, pricing and go-to-market planning for startups and established businesses. We help turn your next decision into a practical plan.']
 ];
 const match=topics.find(([,pattern])=>pattern.test(q));
 if(match){const [id,,text]=match;return {text,href:id==='wealth'?'/wealth':'/services/'+id,label:id==='wealth'?'Explore TCG Wealth':'Explore this practice'};}
 if(/\b(services|help|offer|do you do|solve|business)\b/.test(q))return {text:'TCG connects eight practices: business strategy, marketing, brand, operations, technology, finance, compliance and legal coordination. TCG Wealth adds specialist business funding. Start with the challenge and we’ll help find the right expertise.',href:'/services',label:'See all services'};
 return {text:'I can help with basic questions about TCG’s services, projects and getting in touch. For advice specific to your business, Umesh is the right person to speak with.',href:'/contact',label:'Ask the team'};
}
function initAssistant(){
 if(document.getElementById('tcg-assistant'))return;
 const mark=`<span class="assistant-avatar" aria-hidden="true"><img src="/assets/assistant-avatar.webp" alt="" width="256" height="256"></span>`;
 const el=document.createElement('aside');el.id='tcg-assistant';el.setAttribute('aria-label','TCG service assistant');
 el.innerHTML=`<div class="assistant-teaser"><button class="teaser-open" aria-label="Open TCG assistant">${mark}</button><form id="teaser-form"><label class="sr-only" for="teaser-input">Ask TCG a question</label><input id="teaser-input" maxlength="500" placeholder="What’s your next move?" autocomplete="off"><button type="submit" aria-label="Ask TCG">↗</button></form><button class="teaser-close" aria-label="Collapse assistant">×</button></div><button class="assistant-launch" aria-label="Open TCG assistant" aria-expanded="false" aria-controls="assistant-panel" hidden>${mark}<span>Ask TCG</span><span class="launch-arrow" aria-hidden="true">↗</span></button><section id="assistant-panel" aria-labelledby="assistant-title" hidden><div class="assistant-heading">${mark}<div><span class="assistant-kicker">THE CONSULTING GROUP</span><h2 id="assistant-title">Ask TCG</h2></div><button class="assistant-close" aria-label="Close assistant">×</button></div><div class="assistant-messages" role="log" aria-label="Conversation" aria-live="polite"></div><div class="assistant-human-line"><span>A real conversation?</span><a href="/contact?journey=meeting">Meet Umesh <span aria-hidden="true">↗</span></a></div><form id="assistant-form"><label class="sr-only" for="assistant-input">Your question</label><input id="assistant-input" maxlength="500" autocomplete="off" placeholder="Ask us about your next move…" required><button aria-label="Send question" type="submit" disabled>↗</button></form><div class="assistant-bottom"><span>TCG’s automated service guide</span><button class="assistant-reset">Clear chat</button></div><p class="assistant-privacy">Saved in this tab only. Keep confidential details for after your NDA.</p></section>`;

 document.body.append(el);
 const teaser=el.querySelector('.assistant-teaser'), launcher=el.querySelector('.assistant-launch'),panel=el.querySelector('#assistant-panel'),input=el.querySelector('#assistant-input'),log=el.querySelector('.assistant-messages');
 const read=key=>{try{return sessionStorage.getItem(key);}catch{return null;}};
 const save=(key,value)=>{try{sessionStorage.setItem(key,value);}catch{}};
 let messages=[];try{messages=JSON.parse(read('tcg-chat-v1')||'[]').filter(m=>m&&typeof m.query==='string').slice(-6);}catch{}
 const addReply=query=>{
  const answer=assistantAnswer(query);
  const row=document.createElement('div');row.className='assistant-exchange';
  row.innerHTML=`<p class="visitor-message">${esc(query)}</p><div class="assistant-reply"><p>${esc(answer.text)}</p><a href="${answer.href}">${answer.label} ↗</a><a class="assistant-human" href="${esc(whatsappDraft('Hi Umesh, I visited the TCG website and would like to discuss: '+query))}" target="_blank" rel="noopener noreferrer">Continue with Umesh on WhatsApp ↗</a></div>`;
  log.append(row);
 };
 const draw=()=>{log.innerHTML=messages.length?'<div class="assistant-conversation-label">YOUR CONVERSATION</div>':`<div class="assistant-welcome"><span class="assistant-kicker">A GOOD PLACE TO START</span><h3>What’s on<br><em>your mind?</em></h3><p>A business challenge. A new ambition.<br>Let’s find your next step.</p><div class="assistant-paths"><button data-question="What services do you offer?"><span class="path-index">01</span><span>Find the right expertise</span><span aria-hidden="true">↗</span></button><button data-question="Can I request an NDA?"><span class="path-index">02</span><span>Start with an NDA</span><span aria-hidden="true">↗</span></button><button data-question="How do I book a meeting?"><span class="path-index">03</span><span>Talk to Umesh</span><span aria-hidden="true">↗</span></button></div></div>`;messages.forEach(m=>addReply(m.query));};draw();

 const collapse=()=>{if(!panel.hidden||teaser.contains(document.activeElement)||el.querySelector('#teaser-input').value.trim())return;teaser.hidden=true;launcher.hidden=false;save('tcg-assistant-seen','1');};
 const open=()=>{teaser.hidden=true;launcher.hidden=true;panel.hidden=false;launcher.setAttribute('aria-expanded','true');save('tcg-assistant-seen','1');input.focus({preventScroll:true});log.scrollTop=messages.length?log.scrollHeight:0;};
 const close=()=>{panel.hidden=true;teaser.hidden=true;launcher.hidden=false;launcher.setAttribute('aria-expanded','false');launcher.focus({preventScroll:true});};
 const send=query=>{query=query.trim().slice(0,500);if(!query)return;open();messages.push({query});messages=messages.slice(-6);save('tcg-chat-v1',JSON.stringify(messages));draw();input.value='';el.querySelector('#assistant-form button').disabled=true;log.scrollTop=log.scrollHeight;};
 launcher.onclick=open;el.querySelector('.teaser-open').onclick=open;el.querySelector('.assistant-close').onclick=close;
 el.querySelector('.teaser-close').onclick=()=>{teaser.hidden=true;launcher.hidden=false;save('tcg-assistant-seen','1');launcher.focus({preventScroll:true});};
 el.querySelector('#teaser-form').onsubmit=e=>{e.preventDefault();const first=el.querySelector('#teaser-input');if(first.value.trim())send(first.value);else open();first.value='';};
 el.querySelector('#assistant-form').onsubmit=e=>{e.preventDefault();send(input.value);};
 el.addEventListener('click',e=>{const choice=e.target.closest('[data-question]');if(choice)send(choice.dataset.question);});
 input.addEventListener('input',()=>{el.querySelector('#assistant-form button').disabled=!input.value.trim();});
 el.querySelector('.assistant-reset').onclick=()=>{messages=[];save('tcg-chat-v1','[]');draw();input.value='';el.querySelector('#assistant-form button').disabled=true;input.focus({preventScroll:true});};
 el.addEventListener('keydown',e=>{if(e.key==='Escape'&&!panel.hidden){e.preventDefault();close();}});
 if(read('tcg-assistant-seen'))collapse();else setTimeout(collapse,12000);
 teaser.addEventListener('focusout',()=>{if(!el.querySelector('#teaser-input').value)setTimeout(collapse,12000);});
}

function initConversationMenu(){
 if(document.getElementById('conversation-menu'))return;
 const dialog=document.createElement('dialog');dialog.id='conversation-menu';dialog.setAttribute('aria-labelledby','conversation-menu-title');
 dialog.innerHTML=`<div class="conversation-menu-top"><span class="logo-crop"><img src="/assets/TCG-LOGO.png" alt="TCG"></span><button class="conversation-menu-close" aria-label="Close conversation options" autofocus>×</button></div><span class="assistant-kicker">YOUR NEXT CHAPTER</span><h2 id="conversation-menu-title">A good place<br>to <em>begin.</em></h2><p>Bring the ambition. Or the thing in the way.<br>We’ll take it from there.</p><div class="conversation-menu-paths"><a data-journey="meeting" href="/contact?journey=meeting"><span class="path-index">01</span><span><strong>Let’s solve your challenge</strong><small>A direct introduction to Umesh.</small></span><span aria-hidden="true">↗</span></a><a data-journey="nda" href="/contact?journey=nda"><span class="path-index">02</span><span><strong>NDA first. Then the idea.</strong><small>Request confidentiality before the details.</small></span><span aria-hidden="true">↗</span></a><a href="${esc(whatsappDraft('Hi Umesh, I’d like to discuss a business challenge with TCG.'))}" target="_blank" rel="noopener noreferrer"><span class="path-index">03</span><span><strong>Message Umesh</strong><small>Start a conversation on WhatsApp.</small></span><span aria-hidden="true">↗</span></a></div><div class="conversation-menu-foot">THE CONSULTING GROUP<span>BENGALURU, INDIA</span></div>`;
 document.body.append(dialog);let opener;
 const close=()=>dialog.close();
 dialog.querySelector('.conversation-menu-close').onclick=close;
 dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)close();}});
 dialog.addEventListener('close',()=>{document.body.classList.remove('conversation-open');opener?.focus({preventScroll:true});});
 document.querySelectorAll('[data-conversation-open]').forEach(a=>a.addEventListener('click',e=>{
  if(e.metaKey||e.ctrlKey||e.shiftKey||e.altKey)return;
  if(typeof dialog.showModal!=='function')return;
  e.preventDefault();opener=a;
  if(document.body.classList.contains('menu-open')){const toggle=document.querySelector('.mobile-toggle');toggle.click();opener=toggle;}
  const target=new URL(a.href,location.origin);
  dialog.querySelectorAll('[data-journey]').forEach(choice=>{const next=new URL(target);next.searchParams.set('journey',choice.dataset.journey);choice.href=next.pathname+next.search;});
  document.body.classList.add('conversation-open');dialog.showModal();
 }));
}

// Match the snap boundary to the actual header, including the overlay homepage.
function sectionHeaderOffset(){
 const header=document.getElementById('header');
 const position=getComputedStyle(header).position;
 return position==='sticky'||position==='fixed'?Math.ceil(header.getBoundingClientRect().height):0;
}
function initViewportSections(){
 const root=document.documentElement;
 const update=()=>root.style.setProperty('--section-offset',sectionHeaderOffset()+'px');
 update();root.classList.add('viewport-flow');
 if('ResizeObserver' in window)new ResizeObserver(update).observe(document.getElementById('header'));
 window.addEventListener('resize',update,{passive:true});
}

// The same down-arrow behavior serves the hero and the persistent page control.
function nextSectionStop(stops,current,max){
 if(current>=max-8)return {top:0,isTop:true};
 const next=stops.find(stop=>stop.top>current+45);
 return next?{...next,isTop:false}:{top:max,isTop:false,label:'page footer'};
}
function initSectionNavigation(){
 if(document.getElementById('section-navigator'))return;
 const control=document.createElement('button');control.id='section-navigator';control.type='button';
 control.innerHTML='<span class="section-nav-label">Next section</span><span class="section-nav-ring"><svg viewBox="0 0 48 48" aria-hidden="true"><circle cx="24" cy="24" r="22"/></svg><span class="section-nav-arrow" aria-hidden="true">↓</span></span>';
 document.body.append(control);
 const hero=document.getElementById('find-problem');
 const state=()=>{
  const offset=sectionHeaderOffset();
  const max=Math.max(0,document.documentElement.scrollHeight-innerHeight);
  const sections=[...document.querySelectorAll('main > section,main > figure,#footer')].filter(s=>s.getClientRects().length);
  const stops=sections.map(s=>({top:Math.max(0,Math.min(max,s.getBoundingClientRect().top+scrollY-offset)),label:s.querySelector('h2,h1')?.innerText.replace(/\s+/g,' ').trim()||(s.id==='footer'?'page footer':'next section')}));
  return {max,next:nextSectionStop(stops,scrollY,max)};
 };
 const refresh=()=>{
  const {max,next}=state();
  control.hidden=max<50||Boolean(hero&&hero.getBoundingClientRect().bottom>105);
  control.setAttribute('aria-label',next.isTop?'Back to top':'Scroll to '+next.label);
  control.querySelector('.section-nav-label').textContent=next.isTop?'Back to top':'Next section';
  control.querySelector('.section-nav-arrow').textContent=next.isTop?'↑':'↓';
  control.style.setProperty('--page-progress',max?Math.min(1,scrollY/max):0);
 };
 let moving=false,finishTimer;
 const finish=()=>{moving=false;control.disabled=false;if(hero)hero.disabled=false;clearTimeout(finishTimer);refresh();};
 const advance=()=>{
  if(moving)return;
  const {next}=state();moving=true;control.disabled=true;if(hero)hero.disabled=true;
  window.scrollTo({top:next.top,behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});
  const settled=()=>{if(!moving)return;if(Math.abs(scrollY-next.top)<3){finish();return;}requestAnimationFrame(settled);};
  requestAnimationFrame(settled);finishTimer=setTimeout(finish,1400);
 };
 window.addEventListener('wheel',()=>{if(moving)finish();},{passive:true});window.addEventListener('touchstart',()=>{if(moving)finish();},{passive:true});
 control.onclick=advance;if(hero){hero.onclick=advance;hero.setAttribute('aria-label','Scroll to what TCG does');}
 let queued=false;const schedule=()=>{if(queued)return;queued=true;requestAnimationFrame(()=>{queued=false;refresh();});};
 window.addEventListener('scroll',schedule,{passive:true});window.addEventListener('resize',schedule);window.addEventListener('load',schedule,{once:true});
 if('ResizeObserver' in window)new ResizeObserver(schedule).observe(document.getElementById('main'));
 refresh();
}

// Give the opening content priority. Utilities appear after a deliberate scroll.
function initFloatingVisibility(){
 const assistant=document.getElementById('tcg-assistant'), navigator=document.getElementById('section-navigator');
 const update=()=>{
  const visible=scrollY>=160;
  const engaged=assistant.contains(document.activeElement)||!assistant.querySelector('#assistant-panel').hidden;
  document.body.classList.toggle('utilities-ready',visible);
  document.body.classList.toggle('assistant-engaged',engaged);
  assistant.inert=!visible&&!engaged;
  if(!visible&&document.activeElement===navigator)document.getElementById('main').focus({preventScroll:true});
  navigator.inert=!visible;
 };
 let pending=false;
 const schedule=()=>{if(pending)return;pending=true;requestAnimationFrame(()=>{pending=false;update();});};
 window.addEventListener('scroll',schedule,{passive:true});
 assistant.addEventListener('focusin',schedule);assistant.addEventListener('focusout',schedule);assistant.addEventListener('click',schedule);
 update();
}
