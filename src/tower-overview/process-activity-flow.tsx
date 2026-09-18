'use client';
import { useEffect, useRef, type RefObject } from 'react';
import { titleCase } from './content-format';
import type { TowerProcess } from './process-content-types';
import './process-activity-flow.css';
const clean = (text: string) => text.replace(/[—–]/g, '-').replace(/\*/g, '');
export default function ActivityInfusion({
  process,
  scrollHost,
  organ = 'brain',
  organName = 'Brain',
}: {
  process: TowerProcess;
  scrollHost: RefObject<HTMLDialogElement | null>;
  organ?: string;
  organName?: string;
}) {
  const root = useRef<HTMLDivElement>(null),
    bag = useRef<HTMLDivElement>(null),
    brain = useRef<HTMLDivElement>(null);
  const track = useRef<SVGPathElement>(null),
    fluid = useRef<SVGPathElement>(null),
    svg = useRef<SVGSVGElement>(null);
  const rows = useRef<(HTMLLIElement | null)[]>([]),
    end = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const parent = scrollHost.current,
      el = root.current;
    if (!parent || !el) return;
    let disposed = false,
      frame = 0,
      lastProgress = -1,
      lastHeight = 0,
      keyboard = false;
    const connections: {
      start?: { x: number; y: number };
      end?: { x: number; y: number };
    } = {};
    let expanding=false;
    const opened = new Set<number>(),
      models: { setProgress: (p: number) => void; destroy: () => void }[] = [];
    const reduced = matchMedia('(prefers-reduced-motion: reduce)');
    import('./process-endpoint-models')
      .then(({ createInfusionModel }) => {
        if (disposed || !bag.current || !brain.current) return;
        try {
          el.dataset.modelError = 'false';
          models.push(
            createInfusionModel(bag.current, 'bag', (x, y) =>
              connection('start', bag.current!, x, y),
            ),
            createInfusionModel(brain.current, organ, (x, y) =>
              connection('end', brain.current!, x, y),
            ),
          );
          queue();
        } catch (error) {
          console.error('Infusion model could not render', error);
          el.dataset.modelError = 'true';
        }
      })
      .catch((error) => {
        console.error('Infusion model could not load', error);
        if (!disposed) el.dataset.modelError = 'true';
      });
    function connection(
      key: 'start' | 'end',
      host: HTMLElement,
      x: number,
      y: number,
    ) {
      if (!el) return;
      const r = host.getBoundingClientRect(),
        base = el.getBoundingClientRect();
      const next = { x: r.left - base.left + x, y: r.top - base.top + y - (key==='end'?(end.current?.offsetTop??0):0) };
      const old = connections[key];
      if (
        !old ||
        Math.abs(old.x - next.x) > 0.1 ||
        Math.abs(old.y - next.y) > 0.1
      ) {
        connections[key] = next;
        lastHeight = 0;
        queue();
      }
    }
    function layout() {
      if (
        !el ||
        !svg.current ||
        !track.current ||
        !fluid.current ||
        !end.current
      )
        return;
      const height = el.clientHeight;
      if (height === lastHeight) return;
      lastHeight = height;
      const x = innerWidth < 768 ? 36 : 68;
      const start = connections.start ?? { x, y: 174 };
      end.current.style.top = `${rows.current.at(-1)?.offsetTop ?? 0}px`;
      const brainPoint = {x:connections.end?.x??x,y:end.current.offsetTop+(connections.end?.y??52)};
      const points = [
        start,
        ...rows.current.slice(1, -1).map((r) => ({ x, y: r ? r.offsetTop + 16 : start.y })),
        brainPoint,
      ];
      let path = `M ${start.x} ${start.y}`;
      for (let i = 1; i < points.length; i++) {
        const a = points[i - 1],
          b = points[i],
          bend = i % 2 === 0 ? -16 : 16;
        path += ` C ${a.x + bend} ${a.y + (b.y - a.y) * 0.32}, ${b.x + bend} ${a.y + (b.y - a.y) * 0.72}, ${b.x} ${b.y}`;
      }
      svg.current.setAttribute('viewBox', `0 0 ${el.clientWidth} ${height}`);
      svg.current.style.height = `${height}px`;
      track.current.setAttribute('d', path);
      fluid.current.setAttribute('d', path);
      rows.current.forEach((r) => {
        if (r) r.style.setProperty('--checkpoint-x', `${x}px`);
      });
    }
    function draw() {
      frame = 0;
      if (
        disposed ||
        !el ||
        !parent?.open ||
        !fluid.current ||
        !track.current ||
        !end.current
      )
        return;
      layout();
      const rr = el.getBoundingClientRect(),
        pr = parent.getBoundingClientRect();
      const start = connections.start?.y ?? 174,
        finish = end.current.offsetTop + (connections.end?.y ?? 52);
      const atBottom =
        parent.scrollTop > 0 &&
        parent.scrollTop + parent.clientHeight >= parent.scrollHeight - 3;
      const leading =
        parent.scrollTop < 1
          ? start
          : atBottom
            ? finish
            : Math.max(
                start,
                Math.min(finish, pr.top + parent.clientHeight * 0.56 - rr.top),
              );
      const length = track.current.getTotalLength();
      // Match the blood front to the vertical reading position on the curved tube.
      let lo = 0,
        hi = length;
      for (let i = 0; i < 15; i++) {
        const mid = (lo + hi) / 2;
        if (track.current.getPointAtLength(mid).y < leading) lo = mid;
        else hi = mid;
      }
      const distance = atBottom ? length : (lo + hi) / 2;
      fluid.current.style.strokeDasharray = `${distance} ${length}`;
      rows.current.forEach((row, i) => {
        if (!row) return;
        const reached = i === 0 || leading >= row.offsetTop + 15;
        row.dataset.reached = String(reached);
        if (reached && !opened.has(i) && !expanding) {
          opened.add(i);
          const detail = row.querySelector('details');
          if (detail && !detail.open) {
            const before=detail.getBoundingClientRect().height;
            detail.open = true;
            if(!reduced.matches&&!keyboard){
              const after=detail.getBoundingClientRect().height;
              expanding=true;
              detail.style.overflow='hidden';
              const expansion=detail.animate([{height:`${before}px`},{height:`${after}px`}],{duration:720,easing:'cubic-bezier(.23,1,.32,1)'});
              expansion.onfinish=()=>{detail.style.overflow='';expanding=false;queue();};
              expansion.oncancel=()=>{detail.style.overflow='';expanding=false;queue();};
            }
            // The copy unfolds slowly, one block after another: description, systems, challenges.
            const copy = detail.querySelector('.infusion-copy');
            if (copy) {
              const blocks = Array.from(copy.children) as HTMLElement[];
              blocks.forEach((block, n) => {
                if (reduced.matches || keyboard) {
                  block.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 240, delay: n * 60, easing: 'ease', fill: 'backwards' });
                  return;
                }
                block.animate(
                  [
                    { opacity: 0, transform: 'translateY(12px) scale(0.985)', filter: 'blur(2px)' },
                    { opacity: 1, transform: 'translateY(0) scale(1)', filter: 'blur(0)' },
                  ],
                  { duration: 780, delay: 120 + n * 140, easing: 'cubic-bezier(.23,1,.32,1)', fill: 'backwards' },
                );
              });
            }
          }
        }
      });
      const progress = distance / length;
      if (Math.abs(progress - lastProgress) > 0.01) {
        models.forEach((m) => m.setProgress(progress));
        lastProgress = progress;
      }
      el.dataset.complete = String(progress > 0.98);
    }
    function queue() {
      if (!frame) frame = requestAnimationFrame(draw);
    }
    const key = () => {
        keyboard = true;
        queue();
      },
      pointer = () => {
        keyboard = false;
      };
    const resize = new ResizeObserver(() => {
      lastHeight = 0;
      queue();
    });
    resize.observe(el);
    resize.observe(parent);
    parent.addEventListener('scroll', queue, { passive: true });
    parent.addEventListener('keydown', key);
    parent.addEventListener('pointerdown', pointer);
    parent.addEventListener('wheel', pointer, { passive: true });
    queue();
    return () => {
      disposed = true;
      cancelAnimationFrame(frame);
      resize.disconnect();
      parent.removeEventListener('scroll', queue);
      parent.removeEventListener('keydown', key);
      parent.removeEventListener('pointerdown', pointer);
      parent.removeEventListener('wheel', pointer);
      models.forEach((m) => m.destroy());
    };
  }, [process, scrollHost, organ]);
  return (
    <div className="activity-infusion" ref={root}>
      <svg className="infusion-tube" ref={svg} aria-hidden="true">
        <path ref={track} className="infusion-tube-shell" />
        <path ref={fluid} className="infusion-tube-blood" />
      </svg>
      <div className="infusion-start">
        <div
          className="infusion-model infusion-bag"
          ref={bag}
          aria-label="Stylized 3D blood bag feeding the activity flow"
        />
        <span className="infusion-fallback">Blood bag</span>
      </div>
      <ol className="testing-flow infusion-flow">
        {process.stages.map((s, i) => (
          <li
            key={i}
            ref={(node) => {
              rows.current[i] = node;
            }}
          >
            <details>
              <summary><span className="infusion-step">{String(i + 1).padStart(2, '0')}</span>{titleCase(s.displayTitle)}</summary>
              <div className="infusion-copy">
                <p>{clean(s.description)}</p>
                {s.systems.length > 0 && (
                  <div className="infusion-systems" aria-label="Systems">
                    {s.systems.map(system => <span key={system} className="infusion-system" data-system={system}>{system}</span>)}
                  </div>
                )}
                {s.challenges.length > 0 && (
                  <div className="testing-challenges">
                    <strong>Challenges</strong>
                    {s.challenges.map((c, n) => (
                      <p key={n}>{clean(c)}</p>
                    ))}
                  </div>
                )}
              </div>
            </details>
            {process.loopFrom === i && (
              <p className="testing-loop">
                {clean(process.loopLabel)}: return to{' '}
                {process.stages[process.loopTo ?? 0]?.displayTitle}.
              </p>
            )}
          </li>
        ))}
      </ol>
      <div className="infusion-end" ref={end}>
        <div
          className="infusion-model infusion-brain"
          ref={brain}
          aria-label={`Stylized 3D ${organName.toLowerCase()} illuminated as the process completes`}
        />
        <span className="infusion-fallback">{organName}</span>
      </div>
    </div>
  );
}
