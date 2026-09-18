// Derives the intro-panel counts for every tower file from its own content and writes them back.
//   metrics.solutions  = documented improvements, TPI items and proposals across all processes
//   metrics.automated  = processes whose documented activities or improvements describe automation
//   metrics.ai         = processes with an AI capability that is deployed or underway (proposals excluded)
//   collaborators      = other towers named in this tower's process text
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = fileURLToPath(new URL('../', import.meta.url));
const towers = ['brain', 'lungs', 'liver', 'stomach', 'kidneys', 'pancreas', 'spleen', 'intestines'];
const aliases = {
  brain: /FP&A Commercial|GFS FP&A|\bFP&A\b(?!\s*(?:Ops|Operations))|\bFBP\b|Finance Business Partner/i,
  lungs: /\bR2R\b|Record to Report/i,
  liver: /\bCAPEX\b|Capex team|fixed asset|\bFA close\b/i,
  stomach: /\bP2P\b|Procure to Pay|Spend to Payment|Accounts Payable/i,
  kidneys: /\bControlling\b|\bController\b/i,
  pancreas: /FP&A Ops|FP&A Operations|GFS Ops/i,
  spleen: /\bTDT\b|Tax Delivery|Group Tax|\bGTTP\b|Tax team|\bTax\b/i,
  intestines: /\bO2C\b|Order to Cash|Collection team|Credit Risk|Cash & Banking|Cash and Banking/i,
};
const automation = /automat|\bmacro\b|\bpython\b|\bAJD\b|\bbot\b|\bscript\b|auto-|scheduled (?:run|job)|interface[sd]? (?:automatically|to SAP)|High Radius|\bEDI\b/i;
const ai = /\bAI\b|agentic|\bagent\b/i;
const proposal = /proposal|proposed|opportunity|future[- ]state|explor/i;

for (const organ of towers) {
  const file = path.join(root, 'content', 'towers', `${organ}.json`);
  const content = JSON.parse(readFileSync(file, 'utf8'));
  let solutions = 0, automated = 0, aiCount = 0;
  const corpus = [];
  for (const p of content.processes) {
    solutions += p.improvements.length;
    const activity = p.stages.map((s) => s.description).join('\n');
    const improvements = p.improvements.join('\n');
    if (automation.test(activity + '\n' + improvements)) automated++;
    if (p.improvements.some((i) => ai.test(i) && !proposal.test(i))) aiCount++;
    corpus.push(p.purpose, activity, p.challenges.join('\n'), improvements);
  }
  const text = corpus.join('\n');
  const collaborators = towers.filter((other) => other !== organ && aliases[other].test(text));
  const next = { ...content };
  delete next.processes;
  next.metrics = { solutions, automated, ai: aiCount };
  next.collaborators = collaborators;
  next.processes = content.processes;
  writeFileSync(file, JSON.stringify(next, null, 2) + '\n');
  console.log(`${organ.padEnd(10)} solutions ${String(solutions).padStart(3)}  automated ${String(automated).padStart(2)}  ai ${aiCount}  collaborators ${collaborators.join(', ') || '-'}`);
}
