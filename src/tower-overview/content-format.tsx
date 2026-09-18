import { Fragment } from 'react';

export function titleCase(text: string) {
  const small = new Set('a an the and but or nor for so yet at by in of on per to up via with from into over as'.split(' '));
  return text.split(/(\s+)/).map((word, i) => {
    if (/^\s+$/.test(word)) return word;
    if (i > 0 && small.has(word.toLowerCase())) return word.toLowerCase();
    return word.replace(/(^|[-/])([a-z])/g, (_, before, letter) => before + letter.toUpperCase());
  }).join('');
}

// Preserve source wording; emphasize the actions and controls readers need to scan.
export function richText(text: string) {
  const normalized = text.replace(/[—–]/g, '-');
  const action = /\*\*[^*]+\*\*|\*[^*\n]+\*|completeness check, reviews key assumptions, and analyses variances against the comparator|\b(?:prepar(?:e|es|ing)|extract|download(?:s)?|refresh(?:es|ing)?|collect(?:s)?|shar(?:e|es)|input(?:s)?|updat(?:e|es)|copy|save|split|run|trigger|reconcil(?:e|es|iation)|verif(?:y|ies)|validat(?:e|es|ion)|completeness(?: and error)? checks?|reviews?|analys(?:e|es|is)|investigate|resolve|consolidat(?:e|es|ed|ing)|submit|sign.off|approv(?:e|es|al)|confirm|check|generat(?:e|es)|allocation|variance analysis)\b[^.\n,;:()]{0,85}\b/gi;
  const pieces = []; let cursor = 0;
  for (const match of normalized.matchAll(action)) {
    const start = match.index!;
    pieces.push(<Fragment key={`t${start}`}>{normalized.slice(cursor, start)}</Fragment>);
    pieces.push(<strong key={`b${start}`}>{match[0].replace(/\*/g, '')}</strong>);
    cursor = start + match[0].length;
  }
  pieces.push(<Fragment key="tail">{normalized.slice(cursor)}</Fragment>);
  return pieces;
}
