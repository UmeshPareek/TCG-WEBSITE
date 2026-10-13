const SITE_URL='https://tcg-website-iota.vercel.app';
const seoPages={
 '':['Business Consulting in Bengaluru | Growth & Strategy | TCG','TCG helps startups and established businesses with strategy, digital marketing, brand positioning, operations, custom software and finance. Based in Bengaluru.'],
 services:['Business Consulting Services | Marketing & Operations | TCG','Explore TCG’s eight consulting practices: business strategy, marketing, branding, operations, technology, finance, compliance and legal coordination.'],
 industries:['Industry Consulting | Hospitality, Logistics & More | TCG','Practical consulting for hospitality, logistics, real estate and sports businesses. Connect sector needs with strategy, marketing, operations and technology.'],
 work:['Client Projects | Software, Branding & Consulting | TCG','Explore TCG client projects, including CashMyRent, SP Freight Systems, Gully Bowls and the switch. See the scope, deliverables and work behind each engagement.'],
 about:['About TCG | Business Consulting Firm in Bengaluru','Meet The Consulting Group, led by Umesh Pareek. Business strategy, marketing, brand, operations and technology expertise for founders and established businesses.'],
 wealth:['Business Funding & Debt Financing | TCG Wealth','Discuss business funding for expansion, working capital and your next opportunity. TCG Wealth is The Consulting Group’s specialist business financing segment.'],
 contact:['Contact TCG | Discuss Your Business Challenge','Talk to TCG about marketing, branding, strategy, operations, custom software or business funding. Contact our Bengaluru team at umesh@tcg.ind.in.'],
 design:['TCG Design Reference','Internal design reference.'],
 '404':['Page Not Found | TCG','Explore TCG’s business consulting services or contact our Bengaluru team.']
};
const serviceTitles={strategy:'Business Strategy & Growth Consulting',marketing:'Digital Marketing, SEO & Lead Generation',brand:'Brand Positioning, Identity & Website Design',operations:'Operations Consulting & Business Process Improvement',technology:'Custom Software Development & Business Automation',finance:'Financial Modelling & Pitch Deck Services',compliance:'Company Incorporation, GST & Compliance Support',legal:'Business Contracts & Legal Advisory Coordination'};
function pageSEO(route){
 const [type,id]=route.split('/');
 if(type==='services'&&id){const s=services.find(x=>x.id===id);if(s)return {title:serviceTitles[id]+' | TCG',description:s.intro};}
 if(type==='industries'&&id){const s=sectors.find(x=>x.id===id);if(s)return {title:s.short+' Business Consulting | TCG',description:s.intro};}
 if(type==='work'&&id){const c=cases.find(x=>x.id===id);if(c)return {title:c.name+' | '+c.scope.replaceAll(' · ',', ')+' | TCG',description:c.summary};}
 const [title,description]=seoPages[route]||seoPages['404'];return {title,description};
}
