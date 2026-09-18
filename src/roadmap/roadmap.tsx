import {useEffect,useRef,useState,type CSSProperties} from 'react';
import {ArrowLeft,ArrowRight,Building2,CalendarDays,X} from 'lucide-react';
import {Dialog,DialogClose,DialogContent,DialogDescription,DialogTitle} from './dialog';
import type {RoadCycle} from './roadmap-data';
import cycles from './roadmap-cycles.json';
import './roadmap.css';
import {ProcessCopy,EmphasizedText} from './process-copy';

const straight=780,turn=Math.PI*130;
const points=[{x:180,y:230},{x:410,y:230},{x:640,y:230},{x:870,y:230},{x:870,y:490},{x:640,y:490},{x:410,y:490},{x:180,y:490},{x:240,y:750},{x:540,y:750},{x:840,y:750}];
const distances=points.map((p,i)=>i<4?p.x-150:i<8?straight+turn+930-p.x:straight*2+turn*2+p.x-150);
const route='M150 230 H930 A130 130 0 0 1 930 490 H150 A130 130 0 0 0 150 750 H930';
const roadsideTrees=[{x:295,y:178,s:.85},{x:525,y:168,s:1},{x:755,y:177,s:.8},{x:340,y:316,s:.7},{x:690,y:313,s:.8},{x:949,y:370,s:.9},{x:295,y:439,s:.8},{x:525,y:431,s:.95},{x:755,y:438,s:.75},{x:340,y:576,s:.75},{x:690,y:573,s:.8},{x:131,y:622,s:.8},{x:390,y:696,s:.9},{x:690,y:698,s:.85},{x:360,y:834,s:.65},{x:730,y:830,s:.7}];
const streetLamps=[{x:325,y:195},{x:555,y:195},{x:785,y:195},{x:485,y:299},{x:805,y:299},{x:985,y:417},{x:325,y:455},{x:555,y:455},{x:785,y:455},{x:485,y:559},{x:805,y:559},{x:95,y:658},{x:350,y:715},{x:650,y:715},{x:930,y:715}];


export default function Roadmap(){
  const [index,setIndex]=useState(0),[data,setData]=useState<RoadCycle|null>(null),[error,setError]=useState(false),[retry,setRetry]=useState(0);
  const cache=useRef(new Map<string,RoadCycle>());
  const [leaving,setLeaving]=useState(false);
  const transitionTimer=useRef<ReturnType<typeof setTimeout>|null>(null);
  useEffect(()=>()=>{if(transitionTimer.current)clearTimeout(transitionTimer.current);},[]);
  const cycle=cycles[index];
  useEffect(()=>{
    const abort=new AbortController();setError(false);
    const cached=cache.current.get(cycle.id);
    if(cached){setData(cached);return;}
    setData(null);
    fetch(`/data/roadmaps/${cycle.id}.json`,{signal:abort.signal}).then(r=>{if(!r.ok)throw new Error('Unable to load');return r.json();}).then(value=>{const result=value as RoadCycle;cache.current.set(cycle.id,result);setData(result);}).catch(e=>{if(e.name!=='AbortError')setError(true);});
    return()=>abort.abort();
  },[cycle.id,retry]);
  function switchCycle(next:number,instant=false){
    const target=(next+cycles.length)%cycles.length;
    if(transitionTimer.current){clearTimeout(transitionTimer.current);transitionTimer.current=null;}
    if(target===index){setLeaving(false);return;}
    if(instant||matchMedia('(prefers-reduced-motion: reduce)').matches){setIndex(target);setLeaving(false);return;}
    setLeaving(true);
    transitionTimer.current=setTimeout(()=>{setIndex(target);setLeaving(false);transitionTimer.current=null;},120);
  }
  return <main className="roadmap-page">
    <header className="cycle-header"><h1>{cycle.title}</h1><p>{cycle.description}</p></header>
    <div className="cycle-navigation"><div className="cycle-tabs" role="tablist" aria-label="Finance roadmaps">{cycles.map((c,i)=><button key={c.id} id={`tab-${c.id}`} role="tab" aria-selected={index===i} aria-controls="cycle-panel" tabIndex={index===i?0:-1} onClick={e=>switchCycle(i,e.detail===0)} onKeyDown={e=>{const next=e.key==='ArrowRight'?i+1:e.key==='ArrowLeft'?i-1:e.key==='Home'?0:e.key==='End'?3:null;if(next!==null){e.preventDefault();switchCycle(next,true);document.getElementById(`tab-${cycles[(next+4)%4].id}`)?.focus();}}}>{c.short}</button>)}</div>
    </div>
    <div id="cycle-panel" className={leaving?'cycle-leaving':undefined} role="tabpanel" aria-labelledby={`tab-${cycle.id}`} aria-busy={!error&&data?.id!==cycle.id}>
    {error?<div className="cycle-loading"><p>This roadmap could not be loaded.</p><button onClick={()=>setRetry(retry+1)}>Try again</button></div>:data?.id===cycle.id?<div key={cycle.id} className="cycle-transition"><RoadmapScene cycle={data}/></div>:<div className="cycle-loading" role="status">Loading {cycle.short.toLowerCase()}…</div>}
    </div></main>;
}

function RoadmapScene({cycle}:{cycle:RoadCycle}){
  const ACTIVITIES=cycle.activities,WORKDAYS=cycle.stops.map(s=>s.day),titles=cycle.stops.map(s=>s.title);
  const dayLabel=(day:number)=>cycle.stops[day]?.label||'Across cycle';
  const [untimed,setUntimed]=useState(false);
  const [selected,setSelected]=useState(0),[hovered,setHovered]=useState<number|null>(null),[open,setOpen]=useState(false),[tower,setTower]=useState('All towers');
  const path=useRef<SVGPathElement>(null),car=useRef<SVGGElement>(null);
  const position=useRef(distances[0]),destination=useRef(distances[0]),animation=useRef(0);
  const trigger=useRef<HTMLButtonElement|null>(null);
  const buildings=useRef<(HTMLButtonElement|null)[]>([]);
  const mapScroll=useRef<HTMLDivElement>(null);
  const selectedDay=WORKDAYS[selected];
  const activities=ACTIVITIES.filter(a=>untimed?a.days.length===0:a.days.includes(selectedDay));
  const towers=[...new Set(activities.flatMap(a=>a.towers))];
  useEffect(()=>{
    const preference=matchMedia('(prefers-reduced-motion: reduce)');
    // The car drives between stops: a time-based tween with a strong ease-in-out, whose
    // duration grows with the distance so a long lap takes longer than a short hop.
    // Retargeting mid-drive restarts the tween from the car's current position.
    let direction=1,painted=false,tweenFrom=position.current,tweenTo=position.current,tweenStart=0,tweenDuration=0;
    const easeInOut=(t:number)=>t<.5?4*t*t*t:1-Math.pow(-2*t+2,3)/2;
    const draw=(now:number)=>{
      // Keyboard users get instant placement; reduced motion keeps the drive but shortens it.
      const instant=document.documentElement.dataset.input==='keyboard';
      if(destination.current!==tweenTo){
        tweenFrom=position.current;tweenTo=destination.current;tweenStart=now;
        const span=Math.abs(tweenTo-tweenFrom);
        tweenDuration=Math.min(1100,Math.max(350,span*1.1))*(preference.matches?.55:1);
        if(span>.15)direction=tweenTo<tweenFrom?-1:1;
      }
      const t=instant||tweenDuration===0?1:Math.min(1,(now-tweenStart)/tweenDuration);
      const next=tweenFrom+(tweenTo-tweenFrom)*easeInOut(t);
      if(painted&&t>=1&&next===position.current){animation.current=requestAnimationFrame(draw);return;}
      position.current=next;
      if(path.current&&car.current){
        const p=path.current.getPointAtLength(position.current);
        const ahead=path.current.getPointAtLength(Math.min(path.current.getTotalLength(),position.current+1));
        const behind=path.current.getPointAtLength(Math.max(0,position.current-1));
        const angle=Math.atan2(ahead.y-behind.y,ahead.x-behind.x)*180/Math.PI+(direction<0?180:0);
        car.current.setAttribute('transform',`translate(${p.x} ${p.y}) rotate(${angle})`);
        painted=true;
      }
      animation.current=requestAnimationFrame(draw);
    };
    animation.current=requestAnimationFrame(draw);
    return()=>cancelAnimationFrame(animation.current);
  },[]);
  function travel(index:number,pan=false){destination.current=distances[index];setSelected(index);if(pan&&mapScroll.current){mapScroll.current.scrollTo({left:points[index].x-mapScroll.current.clientWidth/2,behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});}}
  function inspect(index:number,filter='All towers'){setUntimed(false);trigger.current=buildings.current[index];travel(index);setTower(filter);setOpen(true);setHovered(null);}
  return <>
    <div className="cycle-context"><p>{cycle.note}</p>{ACTIVITIES.some(a=>a.days.length===0)&&<button onClick={e=>{trigger.current=e.currentTarget;setUntimed(true);setTower('All towers');setOpen(true);}}>Across this cycle <span>{ACTIVITIES.filter(a=>!a.days.length).length}</span><ArrowRight size={15}/></button>}</div>
    <div className="roadmap-controls"><div><CalendarDays size={17}/>{dayLabel(selectedDay)}<span className="roadmap-current-title">{titles[selected]}</span></div></div>
    <div className="roadmap-scroll" ref={mapScroll}>
      <section className="roadmap-canvas" aria-label={`${cycle.title} roadmap`}>
        <svg viewBox="0 0 1100 850" className="roadmap-road" aria-hidden="true">
          <path d={route} className="road-verge"/><path d={route} className="road-edge"/><path d={route} className="road-surface" ref={path}/><path d={route} className="road-markings"/>
          {points.map((p,i)=><g key={i}><path d={`M${p.x} ${p.y-31} v-20`} className="road-driveway"/><circle cx={p.x} cy={p.y} r={selected===i?7:4} className={selected===i?'road-stop active':'road-stop'}/></g>)}
          <g className="roadside-scenery" pointerEvents="none">
            {roadsideTrees.map((tree,index)=><g key={`tree-${index}`} transform={`translate(${tree.x} ${tree.y}) scale(${tree.s*[1,.88,1.1,.95][index%4]})`} className="roadside-tree">
              <ellipse cx="5" cy="2" rx="21" ry="5" className="tree-shadow"/>
              <path d="M0 0 V-35 M0 -16 L-10 -27 M0 -23 L10 -34" className="tree-trunk"/>
              <g className={`tree-crown tree-tone-${index%3}`}>
                {index%4===0&&<><ellipse cx="-10" cy="-35" rx="16" ry="17"/><ellipse cx="11" cy="-36" rx="17" ry="18"/><ellipse cx="0" cy="-47" rx="19" ry="19"/></>}
                {index%4===1&&<path d="M0 -82 L-14 -57 H-9 L-22 -35 H-15 L-29 -14 H29 L15 -35 H22 L9 -57 H14 Z"/>}
                {index%4===2&&<><ellipse cx="0" cy="-44" rx="15" ry="33"/><path d="M0 -67 V-24" className="tree-highlight"/></>}
                {index%4===3&&<><path d="M0 -45 Q-27 -72 -37 -44 Q-17 -51 0 -45 Q-26 -45 -29 -24 Q-14 -38 0 -45 Q24 -68 35 -45 Q15 -52 0 -45 Q27 -46 29 -25 Q13 -38 0 -45 Q-5 -75 7 -74 Q8 -55 0 -45 Z"/><path d="M0 -45 Q-6 -20 0 0" className="tree-trunk palm-trunk"/></>}
              </g>
            </g>)}
            {streetLamps.map((lamp,index)=><g key={`lamp-${index}`} transform={`translate(${lamp.x} ${lamp.y})`} className="street-lamp" style={{'--lamp-delay':`${-index*.37}s`} as CSSProperties}>
              <ellipse cx="17" cy="-44" rx="17" ry="12" className="lamp-halo"/>
              <ellipse cx="3" cy="1" rx="9" ry="3" className="lamp-shadow"/>
              <path d="M0 0 V-44 Q0 -51 7 -51 H16" className="lamp-post"/>
              <rect x="-4" y="-5" width="8" height="6" rx="2" className="lamp-foot"/>
              <path d="M10 -53 H23 L26 -48 H8 Z" className="lamp-shade"/>
              <path d="M11 -47 H23" className="lamp-light"/>
              <ellipse cx="17" cy="-46" rx="6" ry="2" className="lamp-bulb"/>
            </g>)}
          </g>
          <g ref={car} transform="translate(180 230)" className="road-car"><rect x="-22" y="-13" width="44" height="26" rx="9" fill="#830051"/><rect x="-5" y="-10" width="16" height="20" rx="5" fill="#eadce4"/><path d="M8 -8 L12 -6 L12 6 L8 8 Z" fill="#564d56"/><path d="M-6 -8 L-10 -6 L-10 6 L-6 8 Z" fill="#564d56"/><rect x="15" y="-10" width="4" height="5" rx="2" fill="#f2efd5"/><rect x="15" y="5" width="4" height="5" rx="2" fill="#f2efd5"/><rect x="-15" y="-16" width="10" height="4" rx="2" fill="#393a38"/><rect x="8" y="-16" width="10" height="4" rx="2" fill="#393a38"/><rect x="-15" y="12" width="10" height="4" rx="2" fill="#393a38"/><rect x="8" y="12" width="10" height="4" rx="2" fill="#393a38"/></g>
        </svg>
        {WORKDAYS.map((day,index)=>{
          const p=points[index];const items=ACTIVITIES.filter(a=>a.days.includes(day));const active=hovered===index;
          return <div key={day} className={`roadmap-stop ${selected===index?'selected':''} ${active?'previewing':''}`} style={{left:p.x,top:p.y-159,'--building-height':`${62+(index%3)*14}px`} as CSSProperties} onPointerEnter={e=>{if(e.pointerType!=='touch'){setHovered(index);travel(index);}}} onPointerLeave={()=>setHovered(null)} onFocus={()=>{setHovered(index);travel(index);}} onBlur={e=>{if(!e.currentTarget.contains(e.relatedTarget))setHovered(null);}}>
            <button ref={node=>{buildings.current[index]=node;}} className="building-button" onClick={e=>{trigger.current=e.currentTarget;inspect(index);}} aria-label={`${dayLabel(day)}: ${titles[index]}. Open day details.`} aria-haspopup="dialog" aria-describedby={active?`day-preview-${index}`:undefined}>
              <span className="building-day">{dayLabel(day)}</span>
              <span className={`day-building building-${index%3}`} aria-hidden="true"><span className="building-annex"/><span className="building-main"><span className="building-roof"/><span className="building-windows">{Array.from({length:9},(_,n)=><i key={n}/>)}</span><span className="building-door"/></span></span>
            </button>
            {active&&<div className={`calendar-preview ${p.x>750?'opens-left':''}`} id={`day-preview-${index}`}><div className="calendar-binding"><span/><span/></div><div className="calendar-heading"><CalendarDays size={17}/><span>{titles[index]}</span></div><div className="calendar-day"><small>{cycle.id==='planning'?'MONTH':cycle.id==='continuous'?'TRIGGER':'WORKDAY'}</small><strong>{dayLabel(day)}</strong></div><p>{items.length?items.slice(0,2).map(a=>a.title).join('; ')+'.':'No separate milestone is documented for this day.'}</p><div className="calendar-towers">{[...new Set(items.flatMap(a=>a.towers))].map(t=><button key={t} onClick={()=>inspect(index,t)}>{t}<ArrowRight size={13}/></button>)}</div><div className="calendar-systems"><span>Systems</span><strong>{[...new Set(items.flatMap(a=>a.systems))].join(', ')||'No day-specific systems listed'}</strong></div></div>}
          </div>;
        })}
        <div className="roadmap-phase phase-preparation road-sign"><span className="road-sign-face">{cycle.phases[0]} <ArrowRight size={17} aria-hidden="true"/></span><span className="road-sign-posts" aria-hidden="true"/></div>
        <div className="roadmap-phase phase-close road-sign"><span className="road-sign-face"><ArrowLeft size={17} aria-hidden="true"/> {cycle.phases[1]}</span><span className="road-sign-posts" aria-hidden="true"/></div>
        <div className="roadmap-phase phase-reporting road-sign"><span className="road-sign-face">{cycle.phases[2]} <ArrowRight size={17} aria-hidden="true"/></span><span className="road-sign-posts" aria-hidden="true"/></div>
      </section>
    </div>

    <Dialog open={open} onOpenChange={setOpen}><DialogContent className="roadmap-dialog" showCloseButton={false} finalFocus={trigger}>
      <header className="roadmap-dialog-header"><div className="dialog-calendar"><small>{untimed?'SCOPE':cycle.id==='planning'?'MONTH':cycle.id==='continuous'?'TRIGGER':'WORKDAY'}</small><strong>{untimed?'Cycle':dayLabel(selectedDay)}</strong></div><div><DialogTitle>{untimed?'Across this cycle':titles[selected]}</DialogTitle><DialogDescription>{untimed?'No fixed building date is assigned in the source.':dayLabel(selectedDay)} · {cycle.title}</DialogDescription></div><DialogClose className="roadmap-modal-close" aria-label="Close day details"><X size={21}/></DialogClose></header>
      <div className="roadmap-dialog-body"><div className="day-tower-filters" aria-label="Filter activities by tower">{['All towers',...towers].map(t=><button key={t} aria-pressed={tower===t} onClick={()=>setTower(t)}>{t}</button>)}</div>
        {activities.length===0?<div className="roadmap-no-milestone"><Building2 size={32}/><h2>No separate milestone documented.</h2><p>The source does not assign a separate activity to this stop. Check the surrounding milestones or the activities listed across this cycle.</p></div>:activities.filter(a=>tower==='All towers'||a.towers.includes(tower)).map(a=><article className="day-activity" key={a.id}><h2>{a.title}</h2><p className="activity-timing"><EmphasizedText text={a.timing}/></p><ProcessCopy text={a.detail}/><dl><div><dt>Towers involved</dt><dd>{a.towers.join(' / ')}</dd></div><div><dt>Systems</dt><dd>{a.systems.join(' / ')||'Not specified in this source'}</dd></div></dl>{a.flowNote&&<p className="activity-flow-note">{a.flowNote}</p>}<details className="roadmap-process-steps"><summary>Process overview ({a.steps.length} activities)</summary><p>Full process context. Only the timing above determines this building’s placement.</p>{a.steps.map((step,i)=><details key={i}><summary>{step.title}</summary><ProcessCopy text={step.detail}/></details>)}</details>{a.challenges.length>0&&<details className="roadmap-challenges"><summary>Challenges ({a.challenges.length})</summary><ul className="source-bullets">{a.challenges.map((c,i)=><li key={i}><EmphasizedText text={c}/></li>)}</ul></details>}<details><summary>Source reference</summary><p>{a.source} / {a.sourceTitle}</p><pre>{a.sourceExcerpt}</pre></details></article>)}
      </div>
    </DialogContent></Dialog>
  </>;
}
