// Inline SVG icons. They inherit the text colour (currentColor) and are hidden from screen
// readers; the text next to them carries the meaning.

const svg = (body) =>
  `<svg class="icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">${body}</svg>`;

export const icons = {
  play: svg('<path d="M7 4.5v15l12.5-7.5z" fill="currentColor" stroke="none"/>'),
  globe: svg('<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c2.5 2.6 3.8 5.6 3.8 9s-1.3 6.4-3.8 9c-2.5-2.6-3.8-5.6-3.8-9S9.5 5.6 12 3z"/>'),
  arrow: svg('<path d="M5 12h14M13 6l6 6-6 6"/>'),
  back: svg('<path d="M19 12H5M11 6l-6 6 6 6"/>'),
  mail: svg('<rect x="3" y="5" width="18" height="14" rx="3"/><path d="m4 7 8 6 8-6"/>'),
  shield: svg('<path d="M12 3 4.5 6v5.5c0 4.6 3.2 8.4 7.5 9.5 4.3-1.1 7.5-4.9 7.5-9.5V6z"/><path d="m9 12 2 2 4-4"/>'),
  help: svg('<circle cx="12" cy="12" r="9"/><path d="M9.5 9.2a2.6 2.6 0 0 1 5 .9c0 1.7-2.5 2.3-2.5 3.9M12 17h.01"/>'),
  translate: svg('<path d="M4 5h9M8.5 3v2M11 5c-.8 4-3.3 7-6.5 8.5M6.5 8.5c1 2 2.8 3.6 5 4.5"/><path d="m12.5 21 4-9 4 9M14 17.5h5"/>'),
};
