// Checks every content/towers/<organ>.json against the shape the app renders.
import { readFileSync, statSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = fileURLToPath(new URL('../', import.meta.url));
const towers = ['brain', 'lungs', 'liver', 'stomach', 'kidneys', 'pancreas', 'spleen', 'intestines'];
const LABELS = ['Solutions', 'Automation', 'AI', 'Cross-Functional Collaboration'];
let failed = false;
const problem = (organ, message) => {
  failed = true;
  console.error(`  ${organ}: ${message}`);
};
for (const organ of towers) {
  const file = path.join(root, 'content', 'towers', `${organ}.json`);
  let content;
  try {
    content = JSON.parse(readFileSync(file, 'utf8'));
  } catch (error) {
    problem(organ, `cannot read or parse (${error.message})`);
    continue;
  }
  const size = Math.round(statSync(file).size / 1024);
  if (content.organ !== organ) problem(organ, `organ field is "${content.organ}"`);
  if (!content.name) problem(organ, 'missing name');
  for (const key of ['tagline', 'pickerTitle', 'pickerIntro']) if (!content[key]) problem(organ, `missing ${key}`);
  const labels = (content.context ?? []).map((c) => c.label);
  if (labels.join('|') !== LABELS.join('|')) problem(organ, `context labels are [${labels.join(', ')}]`);
  const ids = new Set();
  let stages = 0, challenges = 0;
  for (const p of content.processes ?? []) {
    if (ids.has(p.id)) problem(organ, `duplicate id ${p.id} (${p.title})`);
    ids.add(p.id);
    for (const key of ['title', 'group', 'purpose', 'purposeSummary', 'cadenceSummary', 'source', 'sourceFile'])
      if (!p[key]) problem(organ, `"${p.title}" is missing ${key}`);
    if (!Array.isArray(p.stages) || (!p.stages.length && !p.coverageNote)) problem(organ, `"${p.title}" has no stages`);
    if (p.loopFrom != null && (p.loopFrom >= p.stages.length || p.loopTo == null || p.loopTo >= p.stages.length || p.loopTo >= p.loopFrom))
      problem(organ, `"${p.title}" has an invalid loop ${p.loopFrom} -> ${p.loopTo}`);
    const assigned = new Set();
    for (const s of p.stages ?? []) {
      stages++;
      if (!s.displayTitle || !s.description) problem(organ, `"${p.title}" has an empty stage`);
      if (s.displayTitle && s.displayTitle.length > 70) problem(organ, `"${p.title}" stage title too long: ${s.displayTitle}`);
      for (const c of s.challenges ?? []) assigned.add(c);
      if (/\*\*/.test(s.description)) problem(organ, `"${p.title}" stage description contains markdown`);
    }
    challenges += p.challenges.length;
    for (const c of p.challenges) if (!assigned.has(c)) problem(organ, `"${p.title}" challenge not assigned to a stage: ${c.slice(0, 60)}`);
    if (p.source.length > 20000) problem(organ, `"${p.title}" source excerpt is ${p.source.length} characters`);
  }
  console.log(`${organ.padEnd(10)} ${String(content.name).padEnd(16)} ${String(content.processes?.length ?? 0).padStart(2)} processes ${String(stages).padStart(3)} activities ${String(challenges).padStart(3)} challenges ${String(size).padStart(4)} KB`);
}
if (failed) {
  console.error('Tower content check failed.');
  process.exit(1);
}
console.log('All tower files are valid.');
