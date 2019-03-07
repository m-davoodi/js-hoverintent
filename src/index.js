/**
 * @param {HTMLElement} element
 * @param {Function} func
 * @param {number} [wait=0]
 */
function enter(element, func, wait) {
  return intent("enter", ...arguments);
}

function out(element, func, wait) {
  return intent("out", ...arguments);
}

function intent(type, element, func, wait) {
  if (typeof func !== "function") {
    throw new TypeError("Expected a function");
  }
  wait = +wait || 0;
  let timer;
  const setTimer = function (event) {
    timer = setTimeout(func.bind(this, event), wait);
  };
  const pending = () => {
    return timer !== undefined;
  };
  const cancel = () => {
    element.removeEventListener(type === "enter" ? "mouseenter" : "mouseout", setTimer);
  };
  element.addEventListener(type === "enter" ? "mouseenter" : "mouseout", setTimer);
  element.addEventListener(type === "enter" ? "mouseout" : "mouseenter", function() {
    if (timer) {
      clearTimeout(timer);
    }
  });

  return {
    pending,
    cancel
  };
}

export { enter, out };
