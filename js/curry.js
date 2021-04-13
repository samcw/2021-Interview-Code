function createCurry(func, args) {
  let argity = func.length;
  let arg = args || [];

  return function() {
    let _args = [].slice.apply(arguments);
    arg.push(..._args);

    if (arg.length < argity) {
      return createCurry(this, func, arg);
    }

    return func.apply(this, arg);
  }
}

function add(num1, num2) {
  return num1 + num2;
}

let curryAdd = createCurry(add);
console.log(curryAdd(1)(2));