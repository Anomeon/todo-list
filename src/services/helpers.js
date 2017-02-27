export function getState() {
  return window.location.hash.split('#')[1];
};

export function handleDisabled(listener, elListen, elDisable) {
  elListen.addEventListener(listener, (e) => {
    if (e.target.value !== '') {
      elDisable.removeAttribute('disabled');
    } else {
      elDisable.setAttribute('disabled', '');
    }
  });
}

export function slice(list) {
  return Array.prototype.slice.call(list);
}
