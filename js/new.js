//new
function myNew() {
  //第一步，创建空对象
  let o = {};
  const _self = [...arguments].slice(0, 1)[0];
  const _args = [...arguments].slice(1);
  //第二部，将对象的原型链接至构造函数的原型对象
  o.__proto__ = _self.prototype;
  //第三步，将对象作为构造函数的this，执行构造函数
  o.fn = _self;
  const result = o.fn(..._args);
  //第四步，返回构造函数结果，或者返回对象
  delete o.fn;
  return result ? result : o;
}

/*********test*********/
function Person(age, gender) {
  this.age = age;
  this.gender = gender;
}

const person = myNew(Person, 17, 'male');

console.log(person);