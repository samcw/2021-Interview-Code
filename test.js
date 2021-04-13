const MyPromise = require('./js/MyPromise');
const promise = new MyPromise((resolve, reject) => {
  // setTimeout(() => { resolve('success') }, 1000);
  resolve('success');
}).then(data => {
  console.log(data);
  return new MyPromise((resolve, reject) => { resolve('hello'); })
}).then(data => {
  console.log(data);
})