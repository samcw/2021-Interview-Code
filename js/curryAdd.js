export function add() {
  let _outer = [...arguments];

  let sum = function () {
    let _inner = [...arguments];
    _outer = _outer.concat(_inner);
    return sum;
  };

  sum.toString = function () {
    return _outer.reduce((prev, cur) => {
      prev = prev + cur;
      return prev;
    }, 0);
  };

  return sum;
}