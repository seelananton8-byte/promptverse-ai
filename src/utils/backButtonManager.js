let activeHandler = null;

export function setBackHandler(fn) {
  activeHandler = fn;
}

export function clearBackHandler() {
  activeHandler = null;
}

export function consumeBackHandler() {
  if (activeHandler) {
    activeHandler();
    return true;
  }
  return false;
}