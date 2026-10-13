// Structured data describes only content and business facts present on the site.
module.exports=function structuredData(api,route,page){
 const base=api.SITE_URL,url=base+'/'+route,orgId=base+'/#organization',siteId=base+'/#website';
 const organization={'@type':'Organization','@id':orgId,name:'The Consulting Group',alternateName:'TCG',url:base+'/',logo:base+'/assets/TCG-LOGO.png',email:'umesh@tcg.ind.in',telephone:'+918217716904',address:{'@type':'PostalAddress',addressLocality:'Bengaluru',addressRegion:'Karnataka',addressCountry:'IN'}};
 const graph=[organization,{'@type':'WebSite','@id':siteId,url:base+'/',name:'The Consulting Group',publisher:{'@id':orgId},inLanguage:'en-IN'}];
 const webPage={'@type':route==='about'?'AboutPage':route==='contact'?'ContactPage':'WebPage','@id':url+'#webpage',url,name:page.title,description:page.description,isPartOf:{'@id':siteId},about:{'@id':orgId},inLanguage:'en-IN'};
 const [family,id]=route.split('/');const service=family==='services'?api.services.find(s=>s.id===id):null;
 const sector=family==='industries'?api.sectors.find(s=>s.id===id):null;
 const project=family==='work'?api.cases.find(s=>s.id===id):null;
 if(service||route==='wealth'){
  const serviceId=url+'#service';webPage.mainEntity={'@id':serviceId};
  graph.push({'@type':'Service','@id':serviceId,name:service?service.name:'TCG Wealth business funding',serviceType:service?service.name:'Business funding and debt financing',description:page.description,url,provider:{'@id':orgId},areaServed:{'@type':'Country',name:'India'}});
 }
 // These pages show a matching breadcrumb trail in their HTML.
 if(['services','industries','work','about'].includes(family)){
  const roots={services:'Expertise',industries:'Industries',work:'Our work',about:'The firm'};
  const crumbs=[['Home',base+'/'],[roots[family],base+'/'+family]];
  if(id)crumbs.push([service?.short||sector?.short||project?.name,url]);
  const breadcrumbId=url+'#breadcrumb';webPage.breadcrumb={'@id':breadcrumbId};
  graph.push({'@type':'BreadcrumbList','@id':breadcrumbId,itemListElement:crumbs.map(([name,item],i)=>({'@type':'ListItem',position:i+1,name,item}))});
 }
 graph.push(webPage);return {'@context':'https://schema.org','@graph':graph};
};
