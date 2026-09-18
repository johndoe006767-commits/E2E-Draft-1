// These organ-to-tower associations are illustrative, not documented process claims.
// Each stable id routes to /data/towers/<id>.json, the tower's processes, activities and challenges.
// One vessel per organ is the requested preview setting, NOT a documented subprocess total.
// Set subprocessCount to the confirmed integer; exactly that many heart-to-organ paths will render.
export const TOWERS = [
  { id: 'brain', organ: 'Brain', name: 'FP&A Commercial', side: 'left', row: 0, color: '#b67291', subprocessCount: null, previewVesselCount: 1 },
  { id: 'lungs', organ: 'Lungs', name: 'R2R', side: 'right', row: 0, color: '#b46b45', subprocessCount: null, previewVesselCount: 1 },
  { id: 'liver', organ: 'Liver', name: 'CAPEX', side: 'left', row: 1, color: '#874b3d', subprocessCount: null, previewVesselCount: 1 },
  { id: 'stomach', organ: 'Stomach', name: 'P2P', side: 'right', row: 1, color: '#c99a3f', subprocessCount: null, previewVesselCount: 1 },
  { id: 'kidneys', organ: 'Kidneys', name: 'Controlling', side: 'left', row: 2, color: '#a54556', subprocessCount: null, previewVesselCount: 1 },
  { id: 'pancreas', organ: 'Pancreas', name: 'FP&A Operations', side: 'right', row: 2, color: '#a7a14d', subprocessCount: null, previewVesselCount: 1 },
  { id: 'spleen', organ: 'Spleen', name: 'Tax', side: 'left', row: 3, color: '#70518b', subprocessCount: null, previewVesselCount: 1 },
  { id: 'intestines', organ: 'Intestines', name: 'O2C', side: 'right', row: 3, color: '#648f88', subprocessCount: null, previewVesselCount: 1 },
] as const;
export type TowerId = (typeof TOWERS)[number]['id'];
export const towerById = (id: string) => TOWERS.find((t) => t.id === id) ?? TOWERS[0];
export interface AnatomyController {
  setProgress: (value: number) => void;
  focusOrgan: (organId: string, anchor: HTMLElement | null) => void;
  setPaused: (paused: boolean) => void;
  destroy: () => void;
}
