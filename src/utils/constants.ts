export const FOCUSABLE_ELEMENT_SELECTORS = [
  'a',
  'a[href]',
  'area[href]',
  'input:not([disabled])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  'button:not([disabled])',
  'iframe',
  'object',
  '[tabindex="0"]',
  '[contenteditable]',
].join(', ');
