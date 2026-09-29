// Inline SVG icons. They inherit the text colour (currentColor) and are hidden from screen
// readers; the text next to them carries the meaning.

const svg = (body, { size = 20, fill = 'none' } = {}) =>
  `<svg class="icon" width="${size}" height="${size}" viewBox="0 0 24 24" fill="${fill}" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">${body}</svg>`;

let logoCount = 0;

export const logo = (size = 32) => {
  const id = `tq-g${++logoCount}`;
  return `<svg class="logo" width="${size}" height="${size}" viewBox="0 0 64 64" aria-hidden="true" focusable="false">
    <defs><linearGradient id="${id}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#43e3cf"/><stop offset="1" stop-color="#0b8a82"/></linearGradient></defs>
    <rect width="64" height="64" rx="18" fill="url(#${id})"/>
    <path d="M27 14v22c0 8 5 13 13 13h4" fill="none" stroke="#fff" stroke-width="8.5" stroke-linecap="round"/>
    <path d="M17 25h24" fill="none" stroke="#fff" stroke-width="8.5" stroke-linecap="round"/>
    <circle cx="46" cy="16.5" r="5.5" fill="#fff"/>
  </svg>`;
};

export const icons = {
  play: svg('<path d="M7 4.5v15l12.5-7.5z" fill="currentColor" stroke="none"/>'),
  globe: svg('<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c2.5 2.6 3.8 5.6 3.8 9s-1.3 6.4-3.8 9c-2.5-2.6-3.8-5.6-3.8-9S9.5 5.6 12 3z"/>'),
  arrow: svg('<path d="M5 12h14M13 6l6 6-6 6"/>'),
  back: svg('<path d="M19 12H5M11 6l-6 6 6 6"/>'),
  mail: svg('<rect x="3" y="5" width="18" height="14" rx="2.5"/><path d="m4 7 8 6 8-6"/>'),
  github: svg('<path d="M9 19c-4.3 1.4-4.3-2.5-6-3m12 5v-3.5c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12.3 12.3 0 0 0-6.2 0C6.5 2.8 5.4 3.1 5.4 3.1a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 9.5c0 4.6 2.7 5.7 5.5 6-.6.6-.6 1.2-.5 2V21"/>'),
  shield: svg('<path d="M12 3 4.5 6v5.5c0 4.6 3.2 8.4 7.5 9.5 4.3-1.1 7.5-4.9 7.5-9.5V6z"/><path d="m9 12 2 2 4-4"/>'),
  help: svg('<circle cx="12" cy="12" r="9"/><path d="M9.5 9.2a2.6 2.6 0 0 1 5 .9c0 1.7-2.5 2.3-2.5 3.9M12 17h.01"/>'),
  menu: svg('<path d="M4 7h16M4 12h16M4 17h16"/>'),
  translate: svg('<path d="M4 5h9M8.5 3v2M11 5c-.8 4-3.3 7-6.5 8.5M6.5 8.5c1 2 2.8 3.6 5 4.5"/><path d="m12.5 21 4-9 4 9M14 17.5h5"/>'),
  userOff: svg('<circle cx="12" cy="8" r="3.5"/><path d="M5 20c.8-3.4 3.6-5.5 7-5.5s6.2 2.1 7 5.5"/><path d="M3 3l18 18"/>'),
  offline: svg('<path d="M2 8.8a15 15 0 0 1 4.2-2.6M9.5 5.2A15 15 0 0 1 22 8.8M5 12.5a10 10 0 0 1 4.3-2.3M14.5 10.4a10 10 0 0 1 4.5 2.1M8.5 16a5 5 0 0 1 7 0M12 19.5h.01M3 3l18 18"/>'),
  lock: svg('<rect x="4.5" y="10.5" width="15" height="10" rx="2.5"/><path d="M8 10.5V7.5a4 4 0 0 1 8 0v3"/>'),
  languages: svg('<circle cx="12" cy="12" r="9"/><path d="M3.5 9h17M3.5 15h17M12 3c2.3 2.5 3.5 5.5 3.5 9s-1.2 6.5-3.5 9M12 3c-2.3 2.5-3.5 5.5-3.5 9s1.2 6.5 3.5 9"/>'),
  android: svg('<path d="M5 16V11a7 7 0 0 1 14 0v5z"/><path d="M8 4.5 9.3 6.6M16 4.5l-1.3 2.1"/><path d="M9 11h.01M15 11h.01"/>'),
};
