export function getState() {
  return window.location.hash.split('#')[1];
};
