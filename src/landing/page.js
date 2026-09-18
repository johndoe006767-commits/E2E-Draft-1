// Set ready only after all rendered assets and continuity QA have passed.
const film = { ready: true };
if (film.ready) {
  const content = document.querySelector('main');
  content.replaceChildren();
  mountScrollWorld(content, {
    chrome: false, atmosphere: false,
    nav: false, crossfade: .08, connectors: [],
    sections: [
      {id:'close',label:'Monthly close',eyebrow:'Monthly close',title:'Confidence in every close.',body:'We reconcile, review and report each month’s results, building a financial position the business can trust.',still:'/assets/landing/01-close.webp',clip:'/assets/landing/01-close.mp4',scroll:1.8,linger:.35},
      {id:'performance',label:'Performance & forecast',eyebrow:'Performance & forecast',title:'Turn insight into direction.',body:'We explain performance, identify risks and opportunities, and sharpen the outlook for decisions ahead.',still:'/assets/landing/02-performance.webp',clip:'/assets/landing/02-performance.mp4',scroll:1.8,linger:.35},
      {id:'planning',label:'Annual planning',eyebrow:'Annual planning',title:'Shape the year ahead.',body:'We turn strategy into financial plans, aligning business priorities, resources and ambition for the year ahead.',still:'/assets/landing/03-planning.webp',clip:'/assets/landing/03-planning.mp4',scroll:1.8,linger:.35},
      {id:'operations',label:'Continuous operations',eyebrow:'Continuous operations',title:'Keep business moving.',body:'We keep transactions, payments and controls running reliably, supporting the business every day.',still:'/assets/landing/04-operations.webp',clip:'/assets/landing/04-operations.mp4',scroll:1.8,linger:.3},
      {id:'gfs',label:'GFS KL',eyebrow:'GFS KL',tagline:'Clarity in every close. Confidence in every decision.',title:'Global Financial Services',body:'Based in Kuala Lumpur, we connect financial operations, insight and control to help the business move forward with confidence.',still:'/assets/landing/05-finale.webp',scroll:1,cta:{primary:{label:'Back to the beginning',href:'#top'}}}
    ].map(s=>({...s,accent:'#8A0051'}))
  });
}
