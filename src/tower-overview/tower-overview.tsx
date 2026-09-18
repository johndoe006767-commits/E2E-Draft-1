'use client';

import { useEffect, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, X, Plus } from 'lucide-react';
import { titleCase } from './content-format';
import ActivityInfusion from './process-activity-flow';
import { TOWERS, towerById } from './tower-organ-mapping';
import type { TowerContent, TowerProcess } from './process-content-types';
import type { TowerOverviewController } from './anatomy-brain-scene';
import './tower-overview.css';

const clean = (text: string) => text.replace(/[—–]/g, '-').replace(/\*/g, '');
export default function TowerOverview() {
  const host = useRef<HTMLDivElement>(null),
    labels = useRef<HTMLDivElement>(null),
    stage = useRef<HTMLElement>(null),
    anchor = useRef<HTMLButtonElement>(null);
  const controller = useRef<TowerOverviewController | null>(null),
    nodeButtons = useRef<(HTMLButtonElement | null)[]>([]),
    intro = useRef<HTMLDivElement>(null);
  const view = useRef({ yaw: 0, pitch: 0, zoom: 1, journey: 0, separation: 0 });
  const journeyInput = useRef<HTMLInputElement>(null),
    separationInput = useRef<HTMLInputElement>(null);
  // Tower content is fetched per organ and kept for the session.
  const library = useRef(new Map<string, Promise<TowerContent>>());
  const [tower, setTower] = useState<string>('brain'),
    [data, setData] = useState<TowerContent | null>(null),
    [loadingTower, setLoadingTower] = useState<string | null>(null),
    [notice, setNotice] = useState('');
  const [ready, setReady] = useState(false),
    [error, setError] = useState(''),
    [attempt, setAttempt] = useState(0);
  const [open, setOpen] = useState(false),
    [selected, setSelected] = useState<TowerProcess | null>(null),
    [current, setCurrent] = useState(0);
  const modal = useRef<HTMLDialogElement>(null),
    lastTrigger = useRef<HTMLElement | null>(null);
  const openRef = useRef(false),
    selectedRef = useRef(false),
    readyRef = useRef(false),
    loadingRef = useRef(false);
  const count = useRef(0);
  const meta = towerById(tower);
  function sync() {
    const v = view.current;
    if (stage.current)
      stage.current.dataset.exploring = v.journey > 0.001 ? 'true' : 'false';
    controller.current?.setView(v.yaw, v.pitch, v.zoom, v.journey);
    if (journeyInput.current) {
      journeyInput.current.value = String(v.journey * 100);
      journeyInput.current.style.setProperty('--p', `${v.journey * 100}%`);
    }
    setCurrent(Math.round(v.journey * Math.max(0, count.current - 1)));
  }
  function loadTower(id: string) {
    let pending = library.current.get(id);
    if (!pending) {
      pending = fetch(`/data/towers/${id}.json`).then((r) => {
        if (!r.ok) throw new Error(`${towerById(id).name} content could not load.`);
        return r.json() as Promise<TowerContent>;
      });
      pending.catch(() => library.current.delete(id));
      library.current.set(id, pending);
    }
    return pending;
  }
  async function enter(id: string) {
    if (!readyRef.current || openRef.current || loadingRef.current) return;
    loadingRef.current = true;
    setNotice('');
    setLoadingTower(id);
    try {
      const content = await loadTower(id);
      if (!readyRef.current) return;
      nodeButtons.current = [];
      count.current = content.processes.length;
      controller.current?.setProcessCount(id, content.processes.length);
      setTower(id);
      setData(content);
      view.current = { ...view.current, yaw: 0, pitch: 0, zoom: 1, journey: 0 };
      openRef.current = true;
      setOpen(true);
      sync();
    } catch (e) {
      setNotice(e instanceof Error ? e.message : 'The tower content could not load.');
    } finally {
      loadingRef.current = false;
      setLoadingTower(null);
    }
  }
  function exit() {
    controller.current?.focusOrgan(tower, null);
    openRef.current = false;
    setOpen(false);
  }
  function choose(index: number) {
    view.current.journey = Math.max(
      0.002,
      index / Math.max(1, count.current - 1),
    );
    view.current.yaw = 0;
    view.current.pitch = 0;
    sync();
  }
  function showProcess(p: TowerProcess) {
    lastTrigger.current = document.activeElement as HTMLElement;
    setSelected(p);
    selectedRef.current = true;
  }
  useEffect(() => {
    let cancelled = false;
    import('./anatomy-brain-scene')
      .then(({ createAnatomyScene }) => {
        if (cancelled || !host.current || !labels.current) return;
        controller.current = createAnatomyScene(host.current, labels.current, {
          onReady: () => {
            if (cancelled) return;
            readyRef.current = true;
            setReady(true);
            // Warm the tower files so entering an organ is immediate.
            const warm = () => TOWERS.forEach((t) => loadTower(t.id).catch(() => {}));
            if ('requestIdleCallback' in window) requestIdleCallback(warm);
            else setTimeout(warm, 400);
          },
          onProgress: () => {},
          onError: setError,
          onOrganSelect: (id) => {
            void enter(id);
          },
          onNodePosition: (i, x, y, opacity) => {
            const button = nodeButtons.current[i];
            if (!button) return;
            // `translate`, not `transform`: reduced-motion resets button transforms on :active.
            button.style.translate = `${x}px ${y}px`;
            button.style.opacity = String(opacity);
            button.dataset.side = x > innerWidth * 0.56 ? 'left' : 'right';
            button.style.visibility = opacity > 0.005 ? 'visible' : 'hidden';
            button.tabIndex = opacity > 0.15 ? 0 : -1;
            button.setAttribute('aria-hidden', String(opacity <= 0.15));
          },
        });
      })
      .catch((e) => {
        if (!cancelled)
          setError(e.message || 'The 3D experience could not load.');
      });
    return () => {
      cancelled = true;
      readyRef.current = false;
      controller.current?.destroy();
      controller.current = null;
    };
  }, [attempt]);
  useEffect(() => {
    if (open && anchor.current) {
      controller.current?.focusOrgan(tower, anchor.current);
      sync();
    }
  }, [open, tower]);
  useEffect(() => {
    if (selected) {
      modal.current?.showModal();
    } else if (modal.current?.open) modal.current.close();
  }, [selected]);
  useEffect(() => {
    const element = stage.current;
    if (!element) return;
    const wheel = (e: WheelEvent) => {
      if (selectedRef.current || !controller.current) return;
      if ((e.target as Element).closest('.testing-intro')) return;
      if ((e.target as Element).closest('.testing-towers')) return;
      if (e.ctrlKey && openRef.current) {
        e.preventDefault();
        view.current.zoom = Math.max(
          0.65,
          Math.min(2.2, view.current.zoom - e.deltaY * 0.008),
        );
        sync();
        return;
      }
      if (e.ctrlKey) return;
      e.preventDefault();
      const v = view.current;
      const delta = Math.max(
        -120,
        Math.min(120, e.deltaY * (e.deltaMode === 1 ? 16 : 1)),
      );
      if (openRef.current) {
        v.journey = Math.max(0, Math.min(1, v.journey + delta / 2400));
        sync();
      } else {
        v.separation = Math.max(0, Math.min(1, v.separation + delta / 1800));
        controller.current.setProgress(v.separation);
        if (separationInput.current) {
          separationInput.current.value = String(v.separation * 100);
          separationInput.current.style.setProperty('--p', `${v.separation * 100}%`);
        }
      }
    };
    element.addEventListener('wheel', wheel, { passive: false });
    return () => element.removeEventListener('wheel', wheel);
  }, []);
  function closeModal() {
    selectedRef.current = false;
    setSelected(null);
    lastTrigger.current?.focus();
  }
  const name = data?.name ?? meta.name;
  const nameLines = name.split(' ');
  return (
    <main className="testing" data-theme="light" data-tower={tower} ref={stage}>
      {open && (
        <button className="testing-back" onClick={exit}>
          <ArrowLeft size={16} /> Back to anatomy
        </button>
      )}
      <div
        className={`testing-body ${open ? 'is-away' : ''}`}
        aria-hidden={open}
        inert={open}
      >
        <div className="scene-host" ref={host} />
        <div className="organ-labels" ref={labels}>
          {TOWERS.map((t) => (
            <button
              key={`trigger-${t.id}`}
              className="brain-trigger organ-trigger"
              data-organ-trigger={t.id}
              aria-label={`Explore ${t.name} ${t.organ.toLowerCase()}`}
              disabled={!ready}
              onClick={() => void enter(t.id)}
            />
          ))}
          {TOWERS.map((t) => (
            <div
              key={t.id}
              data-organ={t.id}
              className={`organ-label ${t.side}`}
            >
              <button
                type="button"
                className="organ-label-button"
                disabled={!ready}
                onClick={() => void enter(t.id)}
              >
                <span className="organ-name">{t.organ}</span>
                <span className="tower-name">{t.name}</span>
                <span className="testing-available">Explore the tower ↗</span>
              </button>
            </div>
          ))}
        </div>
        <div className="testing-tower-dock">
          {notice && (
            <p className="testing-notice" role="alert">
              {notice}
            </p>
          )}
          <input
            id="separation"
            className="testing-assembly"
            ref={separationInput}
            type="range"
            min="0"
            max="100"
            defaultValue="0"
            aria-label="Separate the organs"
            onChange={(e) => {
              view.current.separation = +e.target.value / 100;
              e.target.style.setProperty('--p', `${e.target.value}%`);
              controller.current?.setProgress(view.current.separation);
            }}
          />
        </div>
      </div>
      {!ready && (
        <div className="testing-loading" role={error ? 'alert' : 'status'}>
          <div className="testing-load-shape" />
          <h2>
            {error ? 'Unable to load the anatomy' : 'Assembling the anatomy'}
          </h2>
          <p>
            {error || 'Preparing the skeleton, brain and connected organs.'}
          </p>
          {error && (
            <button
              onClick={() => {
                setError('');
                setReady(false);
                setAttempt((a) => a + 1);
              }}
            >
              Try again
            </button>
          )}
        </div>
      )}
      {open && (
        <section
          key={tower}
          className="testing-commercial"
          aria-label={`${name} 3D explorer`}
        >
          <div className="testing-intro" ref={intro}>
            <h1>
              {nameLines.map((word, i) => (
                <span key={i}>
                  {i > 0 && <br />}
                  {word}
                </span>
              ))}
            </h1>
            <p>
              {clean(
                data?.tagline ??
                  `${name} processes, activities and documented challenges.`,
              )}
            </p>
            <dl className="testing-tower-metrics">
              <div><dt>Processes</dt><dd>{data?.processes.length ?? 0}</dd></div>
              <div><dt>Activities</dt><dd>{data?.processes.reduce((n,p)=>n+p.stages.length,0) ?? 0}</dd></div>
              <div><dt>Documented Challenges</dt><dd>{data?.processes.reduce((n,p)=>n+p.challenges.length,0) ?? 0}</dd></div>
              <div><dt>Solutions</dt><dd>{data?.metrics?.solutions ?? 0}</dd></div>
              <div><dt>Automated Processes</dt><dd>{data?.metrics?.automated ?? 0}</dd></div>
              <div><dt>AI Implemented</dt><dd>{data?.metrics?.ai ?? 0}</dd></div>
              <div className="testing-tower-collab">
                <dt>Cross-Functional Collaboration</dt>
                <dd>
                  {(data?.collaborators ?? []).length === 0 && <span className="testing-collab-none">None documented</span>}
                  {(data?.collaborators ?? []).map((id) => {
                    const t = towerById(id);
                    return (
                      <button
                        key={id}
                        type="button"
                        className="testing-collab-chip"
                        style={{ '--tower-color': t.color } as React.CSSProperties}
                        onClick={() => {
                          exit();
                          setTimeout(() => void enter(id), 480);
                        }}
                      >
                        {t.name}
                      </button>
                    );
                  })}
                </dd>
              </div>
            </dl>
          </div>
          <button
            type="button"
            className="testing-brain-anchor"
            ref={anchor}
            aria-label={`Rotate the 3D ${meta.organ.toLowerCase()}`}
            tabIndex={0}
            onKeyDown={(e) => {
              const v = view.current;
              if (e.key === '+' || e.key === '=')
                v.zoom = Math.min(2.2, v.zoom + 0.15);
              else if (e.key === '-') v.zoom = Math.max(0.65, v.zoom - 0.15);
              else if (e.key === 'ArrowLeft') v.yaw -= 0.2;
              else if (e.key === 'ArrowRight') v.yaw += 0.2;
              else if (e.key === 'ArrowUp') v.pitch -= 0.2;
              else if (e.key === 'ArrowDown') v.pitch += 0.2;
              else return;
              e.preventDefault();
              sync();
            }}
            onPointerDown={(e) => {
              if (e.button !== 0) return;
              e.currentTarget.setPointerCapture(e.pointerId);
              e.currentTarget.dataset.x = String(e.clientX);
              e.currentTarget.dataset.y = String(e.clientY);
            }}
            onPointerMove={(e) => {
              if (!e.currentTarget.hasPointerCapture(e.pointerId)) return;
              view.current.yaw +=
                (e.clientX - Number(e.currentTarget.dataset.x)) * 0.008;
              view.current.pitch +=
                (e.clientY - Number(e.currentTarget.dataset.y)) * 0.008;
              e.currentTarget.dataset.x = String(e.clientX);
              e.currentTarget.dataset.y = String(e.clientY);
              sync();
            }}
            onPointerUp={(e) => {
              if (e.currentTarget.hasPointerCapture(e.pointerId))
                e.currentTarget.releasePointerCapture(e.pointerId);
            }}
          />
          <div className="testing-neurons" aria-label={`${meta.organ} process neurons`}>
            {data?.processes.map((p, i) => (
              <button
                key={p.id}
                className="testing-neuron"
                aria-label={p.title}
                ref={(el) => {
                  nodeButtons.current[i] = el;
                }}
                onClick={() => showProcess(p)}
              >
                <span className="testing-node-plus"><Plus size={22} /></span><span className="testing-node-title">{titleCase(p.title)}</span>
              </button>
            ))}
          </div>
          <aside className="testing-process-caption" aria-live="polite">
            <div key={current} className="testing-caption-content">
            <span>{data?.processes[current]?.group}</span>
            <h2>{titleCase(data?.processes[current]?.title ?? '')}</h2>
            <p>{clean(data?.processes[current]?.purposeSummary ?? '')}</p>
            <button
              onClick={() => data && showProcess(data.processes[current])}
            >
              View {data?.processes[current]?.stages.length} activities <ArrowRight size={15} />
            </button>
            </div>
          </aside>
          <nav className="testing-journey" aria-label="Process navigation">
            <input
              ref={journeyInput}
              type="range"
              min="0"
              max="100"
              defaultValue="0"
              aria-label="Move through process neurons"
              onChange={(e) => {
                view.current.journey = +e.target.value / 100;
                sync();
              }}
            />
            <button
              className="testing-process-list"
              onClick={() => {
                const el = document.getElementById(
                  'testing-process-picker',
                ) as HTMLDialogElement;
                lastTrigger.current = document.activeElement as HTMLElement;
                selectedRef.current = true;
                el.showModal();
              }}
            >
              All processes
            </button>
          </nav>
        </section>
      )}
      <dialog
        aria-label={`${name} processes`}
        id="testing-process-picker"
        className="testing-dialog testing-picker"
        onClose={() => {
          selectedRef.current = false;
          lastTrigger.current?.focus();
        }}
      >
        <button
          className="testing-close"
          aria-label="Close process list"
          onClick={() => {
            (
              document.getElementById(
                'testing-process-picker',
              ) as HTMLDialogElement
            ).close();
          }}
        >
          <X />
        </button>
        <h2>{data?.pickerTitle ?? `${name} Processes`}</h2>
        <p className="testing-picker-intro">
          {clean(
            data?.pickerIntro ??
              `Explore the documented processes, activities and challenges of the ${name} tower.`,
          )}
        </p>
        <div>
          {data?.processes.map((p, i) => (
            <button
              key={p.id}
              onClick={() => {
                (
                  document.getElementById(
                    'testing-process-picker',
                  ) as HTMLDialogElement
                ).close();
                choose(i);
                showProcess(p);
              }}
            >
              <span className="testing-picker-copy"><strong>{titleCase(p.title)}</strong><small>{titleCase(p.group)}<span>{p.stages.length} Activities</span></small></span>
              <ArrowRight size={17} />
            </button>
          ))}
        </div>
      </dialog>
      <dialog
        aria-label={selected?.title ?? 'Process activities'}
        ref={modal}
        className="testing-dialog"
        onClose={closeModal}
      >
        {selected && (
          <>
            <button
              className="testing-close"
              aria-label="Close process activities"
              onClick={() => modal.current?.close()}
            >
              <X size={22} />
            </button>
            <span className="testing-dialog-category">{selected.group}</span>
            <h2>{titleCase(selected.title)}</h2>
            <p className="testing-process-subtitle">{clean(selected.purposeSummary)}</p>
            <details>
              <summary>Timing and Frequency</summary>
              <p>{clean(selected.cadenceSummary)}</p>
            </details>
            {selected.coverageNote && (
              <p className="testing-coverage">{clean(selected.coverageNote)}</p>
            )}
            {selected.flowNote && <p>{clean(selected.flowNote)}</p>}
            <ActivityInfusion
              key={`${tower}-${selected.id}`}
              process={selected}
              scrollHost={modal}
              organ={tower}
              organName={meta.organ}
            />
            <details>
              <summary>Source Documentation</summary>
              <p>{selected.sourceFile}</p>
              <pre>{clean(selected.source)}</pre>
            </details>
          </>
        )}
      </dialog>
    </main>
  );
}
