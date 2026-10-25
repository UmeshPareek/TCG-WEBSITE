import {totals,money,SIGNATORY,PHONE} from './core.mjs';
export function createInvoicePDF(invoice,settings,{jsPDF,font,logo}){
 const doc=new jsPDF({unit:'pt',format:'a4',compress:true});
 doc.addFileToVFS('NotoSans.ttf',font);doc.addFont('NotoSans.ttf','Noto','normal');doc.setFont('Noto');
 const source=invoice.issuer||settings,t=totals(invoice),W=595.28,H=841.89,M=46,R=W-M;
 const content=[source.name,source.address,source.payment,invoice.client.name,invoice.client.company,invoice.client.address,invoice.project,invoice.terms,invoice.notes,...invoice.items.map(x=>x.description)].join('');
 const meta=doc.getFont().metadata;if(meta.characterToGlyph&&[...content].some(c=>c.codePointAt(0)>32&&!meta.characterToGlyph(c.codePointAt(0))))throw new Error('Some characters need the browser’s fonts. Use Print / Save PDF to preserve this text.');
 let y=48;
 const color=(c='#24221f')=>doc.setTextColor(c);
 function text(value,x,yy,size=10,options={}){color(options.color);doc.setFontSize(size);doc.text(Array.isArray(value)?value:String(value),x,yy,{...options});}
 function rule(yy){doc.setDrawColor('#ded9d1');doc.setLineWidth(.5);doc.line(M,yy,R,yy)}
 function newPage(){doc.addPage();text('TCG / '+(invoice.number||'DRAFT'),M,43,9,{color:'#a32a20'});rule(55);y=80;}
 function room(height){if(y+height>H-66)newPage();}
 function lines(value,width,size=10){doc.setFontSize(size);return doc.splitTextToSize(String(value||''),width);}
 function paragraph(value,{size=9,width=R-M,gap=14,color:ink='#55514b'}={}){for(const line of lines(value,width,size)){room(gap);text(line,M,y,size,{color:ink});y+=gap;}}
 if(logo)doc.addImage(logo,'PNG',M,38,53,40);
 text('THE CONSULTING GROUP',M+67,55,10);text('Business consulting & services',M+67,73,8,{color:'#716a62'});
 text(invoice.voidedAt?'VOID':invoice.number?'INVOICE':'DRAFT',R,54,22,{align:'right',color:'#a32a20'});
 text(invoice.number||'Not issued',R,75,10,{align:'right'});rule(97);
 const left=[source.name||'Billing name not set',source.address||'Billing address not set',source.email,source.phone].filter(Boolean).join('\n');
 const right=[invoice.client.company,invoice.client.name,invoice.client.address,invoice.client.email].filter(Boolean).join('\n')||'Client details not set';
 text('FROM',M,120,8,{color:'#8b8175'});text('BILL TO',325,120,8,{color:'#8b8175'});
 const la=lines(left,230),ra=lines(right,224);text(la,M,139,10);text(ra,325,139,10);
 y=139+Math.max(la.length,ra.length)*12+2;
 room(90);rule(y);y+=22;text('Invoice date',M,y,9,{color:'#716a62'});text(invoice.date,M+90,y,10);text('Payment due',325,y,9,{color:'#716a62'});text(invoice.due,420,y,10);y+=22;
 for(const line of lines(invoice.project||'Professional services',R-M,16)){room(21);text(line,M,y,16);y+=22;}y+=12;
 function tableHead(){room(30);doc.setFillColor('#f0ede7');doc.rect(M,y-12,R-M,28,'F');text('SERVICE / DESCRIPTION',M+9,y+5,8);text('QTY',355,y+5,8,{align:'right'});text('RATE (INR)',445,y+5,8,{align:'right'});text('AMOUNT (INR)',R-8,y+5,8,{align:'right'});y+=31;}
 tableHead();
 invoice.items.forEach((r,index)=>{const desc=lines(`${String(index+1).padStart(2,'0')}  ${r.description||'Service description'}`,270,10);const height=Math.max(32,desc.length*14+13);if(y+height>H-66){newPage();tableHead();}text(desc,M+9,y+3,10);text(String(r.qty/100),355,y+3,10,{align:'right'});text((r.rate/100).toLocaleString('en-IN',{minimumFractionDigits:2}),445,y+3,9,{align:'right'});text((Math.round(r.qty*r.rate/100)/100).toLocaleString('en-IN',{minimumFractionDigits:2}),R-8,y+3,9,{align:'right'});y+=height;rule(y-12);});
 y+=8;room(110);const labelX=318;
 text('Invoice total',labelX,y,10);text(money(t.total),R,y,11,{align:'right'});y+=25;
 text('Payments received (net)',labelX,y,9,{color:'#716a62'});text(money(t.received),R,y,10,{align:'right'});y+=16;rule(y);y+=28;
 text(t.credit?'Credit balance':'Balance due',labelX,y,12,{color:'#a32a20'});text(money(t.credit||t.balance),R,y,17,{align:'right',color:'#a32a20'});y+=22;
 paragraph('GST not charged. Supplier not registered under GST.',{size:9});y+=10;
 const payments=invoice.payments.filter(p=>!p.reversedAt);
 if(payments.length){room(45);text('PAYMENT RECORD',M,y,9,{color:'#a32a20'});y+=21;for(const p of payments){paragraph(`${p.date}  |  ${p.kind}  |  ${money(p.amount)}  |  ${p.mode}${p.reference?'  |  Ref: '+p.reference:''}`,{size:9});}y+=12;}
 if(invoice.voidedAt){room(50);paragraph('VOID: '+invoice.voidReason,{color:'#a32a20'});y+=12;}
 const paymentLines=source.payment?lines(source.payment,290,9):[];const signatureName=source.signatory??SIGNATORY;const signLines=lines(signatureName,155,12);const blockHeight=Math.max(56+signLines.length*14,paymentLines.length*13+25);room(blockHeight);
 if(source.payment){text('PAYMENT DETAILS',M,y,9,{color:'#a32a20'});text(paymentLines,M,y+19,9,{lineHeightFactor:1.45});}
 text('For '+(source.name||'TCG'),R-155,y,9,{color:'#716a62'});text(signLines,R-155,y+22,12);text('Authorised signatory',R-155,y+27+signLines.length*14,9,{color:'#716a62'});text(PHONE,R-155,y+41+signLines.length*14,9,{color:'#716a62'});y+=blockHeight+4;
 if(invoice.notes){room(40);text('NOTE',M,y,9,{color:'#a32a20'});y+=20;paragraph(invoice.notes);y+=18;}
 room(40);text('TERMS & CONDITIONS',M,y,9,{color:'#a32a20'});y+=20;
 for(const line of invoice.terms.split('\n').filter(Boolean)){room(lines(line,R-M,9).length*13+4);paragraph(line,{size:9,gap:13});y+=2;}
 const pages=doc.getNumberOfPages();for(let n=1;n<=pages;n++){doc.setPage(n);rule(H-48);text('TCG  /  '+(invoice.number||'Draft - not issued'),M,H-29,8,{color:'#716a62'});text(`${n} / ${pages}`,R,H-29,8,{align:'right',color:'#716a62'});}
 doc.setProperties({title:invoice.number||'TCG draft invoice',author:source.name||'TCG',subject:invoice.project||'Professional services'});return doc;
}
let assetsPromise;
export function pdfAssets(){if(!assetsPromise)assetsPromise=(async()=>{const response=await fetch('/billing/vendor/NotoSans-Regular.ttf');if(!response.ok)throw new Error('The PDF font could not load. Please retry or use Print / Save PDF.');const bytes=new Uint8Array(await response.arrayBuffer());let binary='';for(let offset=0;offset<bytes.length;offset+=8192)binary+=String.fromCharCode(...bytes.subarray(offset,offset+8192));const img=new Image();img.src='/assets/TCG-LOGO.png';await img.decode();const canvas=document.createElement('canvas');canvas.width=512;canvas.height=388;canvas.getContext('2d').drawImage(img,img.width*.455/1.95,img.height*.617*(50/66)/1.95,img.width/1.95,img.height*(50/66)/1.95,0,0,512,388);return {jsPDF:window.jspdf.jsPDF,font:btoa(binary),logo:canvas.toDataURL('image/png')};})().catch(e=>{assetsPromise=null;throw e});return assetsPromise;}
