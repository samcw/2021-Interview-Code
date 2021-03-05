//call
Function.prototype.myCall = function(targetContext) {
  const context = targetContext || globalThis;
  //此时this即指目标函数
  context.fn = this;

  const args = [...arguments].slice(1);
  const result = context.fn(...args);
  
  delete context.fn;
  return result;
}
//apply
Function.prototype.myApply = function(targetContext) {
  const context = targetContext || globalThis;

  context.fn = this;

  const _args = [...arguments].slice(1).flat();
  const result = context.fn(..._args);

  delete context.fn;
  return result;
}
//bind
Function.prototype.myBind = function(targetContext) {
  const context = targetContext || globalThis;
  context.fn = this;

  const args = [...arguments].slice(1);
  return function() {
    const result = context.fn(...args);

    delete context.fn;
    return result;
  }
}

/************test************/
const obj = {
  name: 'Sam'
}

function sayName(age, school) {
  console.log(this.name, age, school);
}

sayName.myBind(obj, 17, 'HBUT')();