const SITE_URL='https://www.tcg.ind.in';
const seoPages={
 '':['TCG','Business consulting for startups and established companies across India. Bengaluru-based TCG connects strategy, marketing, brand, operations and technology.'],
 services:['TCG | Expertise','Explore TCG’s eight consulting practices: business strategy, marketing, branding, operations, technology, finance, compliance and legal coordination.'],
 industries:['TCG | Industries','Practical consulting for hospitality, logistics, real estate and sports businesses. Connect sector needs with strategy, marketing, operations and technology.'],
 work:['TCG | Our work','Explore TCG client projects, including CashMyRent, SP Freight Systems, Gully Bowls and the switch. See the scope, deliverables and work behind each engagement.'],
 about:['TCG | The firm','Meet The Consulting Group, led by Umesh Pareek. Business strategy, marketing, brand, operations and technology expertise for founders and established businesses.'],
 wealth:['TCG Wealth','Discuss business funding for expansion, working capital and your next opportunity. TCG Wealth is The Consulting Group’s specialist business financing segment.'],
 contact:['TCG | Let’s talk','Talk to TCG about marketing, branding, strategy, operations, custom software or business funding. Contact our Bengaluru team at umesh@tcg.ind.in.'],
 design:['TCG | Design','Internal design reference.'],
 '404':['TCG | Page not found','Explore TCG’s business consulting services or contact our Bengaluru team.']
};
const serviceTitles={strategy:'Business Strategy & Growth Consulting',marketing:'Digital Marketing, SEO & Lead Generation',brand:'Brand Positioning, Identity & Website Design',operations:'Operations Consulting & Business Process Improvement',technology:'Custom Software Development & Business Automation',finance:'Financial Modelling & Pitch Deck Services',compliance:'Company Incorporation, GST & Compliance Support',legal:'Business Contracts & Legal Advisory Coordination'};
function pageSEO(route){
 const [type,id]=route.split('/');
 if(type==='services'&&id){const s=services.find(x=>x.id===id);if(s)return {title:'TCG | '+({strategy:'Strategy',marketing:'Marketing',brand:'Brand',operations:'Operations',technology:'Technology',finance:'Finance & pitch decks',compliance:'Compliance',legal:'Legal coordination'}[id]),description:s.intro};}
 if(type==='industries'&&id){const s=sectors.find(x=>x.id===id);if(s)return {title:'TCG | '+s.short,description:s.intro};}
 if(type==='work'&&id){const c=cases.find(x=>x.id===id);if(c)return {title:'TCG | '+c.name,description:c.summary};}
 const [title,description]=seoPages[route]||seoPages['404'];return {title,description};
}
