//节流
export function debounce(handler, delay) {
  //time获得了计时器指针
  let time;
  delay = delay || 1000;

  return function() {
    let args = arguments;
    let self = this;

    time && clearTimeout(time);
    time = setTimeout(() => {
      handler.call(self, args);
    }, delay);
  }
}

//节流
export function throttle(handler, delay) {
  let lastTime = Date.now();
  return function() {
    const args = arguments;
    const self = this;

    let currTime = Date.now();
    if (currTime - lastTime >= delay) {
      handler.call(self, args);
      lastTime = Date.now();
    }
  }
}