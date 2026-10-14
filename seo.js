const SITE_URL='https://www.tcg.ind.in';
const seoPages={
 '':['TCG','Business consulting for startups and established companies across India. Bengaluru-based TCG connects strategy, marketing, brand, operations and technology.'],
 services:['TCG | Consulting Services','Explore business consulting services from TCG: strategy, digital marketing, branding, operations, software, finance, compliance and legal coordination.'],
 industries:['TCG | Industries','Consulting for hospitality, logistics, real estate and sports businesses. Connect your sector’s needs with strategy, marketing, operations and technology.'],
 work:['TCG | Client Projects','Explore TCG projects for CashMyRent, SP Freight Systems, Gully Bowls and the switch. See the software, branding, financial models and operating tools delivered.'],
 about:['TCG | The Firm','Meet The Consulting Group and founder Umesh Pareek. A Bengaluru consulting firm connecting strategy, marketing, operations, technology and business finance.'],
 wealth:['TCG Wealth | Business Funding','Explore business funding for expansion and daily operations with TCG Wealth. Discuss your funding needs with our Bengaluru team, serving businesses across India.'],
 contact:['TCG | Contact','Discuss your business challenge with TCG. Request an introduction or an NDA, then email Umesh Pareek about strategy, marketing, operations, software or funding.'],
 design:['TCG | Design','Internal design reference.'],
 '404':['TCG | Page not found','Explore TCG’s business consulting services or contact our Bengaluru team.']
};
const serviceSEO={
 strategy:['Business Strategy','Business strategy consulting for startups and established companies. TCG helps with market research, business plans, pricing and go-to-market strategy.'],
 marketing:['Digital Marketing','Digital marketing services from TCG: marketing strategy, SEO content, social media and lead generation planning built around your audience and business goals.'],
 brand:['Brand Positioning & Design','Make your value clear with TCG’s brand positioning, naming, messaging, visual identity and website design services for new and established businesses.'],
 operations:['Operations Consulting','Improve how your business runs with TCG’s operations consulting: process improvement, SOPs, cost control, management reporting and connected software.'],
 technology:['Custom Software Development','Custom software development for business operations. TCG builds web platforms, dashboards and workflow automation around the way your team works.'],
 finance:['Financial Models & Pitch Decks','Financial modelling and pitch deck services from TCG. Connect your business story with pricing, unit economics, projections and management reporting.'],
 compliance:['Business Compliance','Company incorporation, GST support and ROC / MCA filing coordination from TCG. Organise business compliance around your company’s stage and requirements.'],
 legal:['Contracts & Legal Coordination','Business contract support and legal coordination from TCG, including NDAs and commercial agreements. Clarify responsibilities before your next business step.']
};
const sectorSEO={
 hospitality:['Restaurant & Hospitality Consulting','Restaurant and hospitality consulting from TCG: brand launches, marketing, recipe costing, SOPs and operations. Explore our hospitality project experience.'],
 logistics:['Logistics Consulting','Logistics consulting and custom software from TCG. Connect broker workflows, operational reporting and finance exports, with work for SP Freight Systems.'],
 'real-estate':['Real Estate & PropTech Consulting','Brand positioning, websites and property management software for real estate and co-living businesses. Explore TCG’s work for CashMyRent and the switch.'],
 performance:['Sports Business Consulting','Business consulting for sports and human-performance ventures. TCG supports pricing, commercial planning, partnerships and go-to-market preparation.']
};
const caseSEO={
 'gully-bowls':'See TCG’s work for Gully Bowls: financial modelling, an investor pitch deck, recipe costing, SOPs and sales tracking for a hospitality business.',
 'sp-freight':'Explore the Placement OS TCG built for SP Freight Systems, connecting logistics broker workflows, operational reporting, GST summaries and Tally exports.',
 'the-switch':'See how TCG connected brand naming, visual identity, website design, investor materials and business structure for managed co-living venture the switch.',
 cashmyrent:'Explore CashMyRent, the property management platform TCG developed for Rent N Stay, with rent reporting, check-in and check-out, and staff tools.'
};
function pageSEO(route){
 const [type,id]=route.split('/');
 if(type==='services'&&serviceSEO[id]){const [name,description]=serviceSEO[id];return {title:'TCG | '+name,description};}
 if(type==='industries'&&sectorSEO[id]){const [name,description]=sectorSEO[id];return {title:'TCG | '+name,description};}
 if(type==='work'&&id){const c=cases.find(x=>x.id===id);if(c)return {title:'TCG | '+c.name,description:caseSEO[id]};}
 const [title,description]=seoPages[route]||seoPages['404'];return {title,description};
}
