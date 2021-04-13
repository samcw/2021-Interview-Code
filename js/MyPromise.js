//定义状态
const PENDING = 'pending';
const FULFILLED = 'fulfilled';
const REJECTED = 'rejected';

class MyPromise {
  constructor(executor) {
    //当前Promise的状态
    this.status = PENDING;
    //fulfilled状态的值
    this.value = null;
    //  rejected状态的原因
    this.reason = null;

    //缓存成功回调
    this.onFulfilledCallback = [];
    //缓存失败回调
    this.onRejectedCallback = [];

    this.resolve = (value) => {
      if (this.status === PENDING) {
        this.status = FULFILLED;
        this.value = value;

        while (this.onFulfilledCallback.length) {
          this.onFulfilledCallback.shift()(value);
        }
      }
    };
    this.reject = (reason) => {
      if (this.status === PENDING) {
        this.status = REJECTED;
        this.reason = reason;

        while (this.onRejectedCallback.length) {
          this.onRejectedCallback.shift()(reason);
        }
      }
    };
    //错误捕获
    try {
      executor(this.resolve, this.reject);
    } catch (error) {
      this.reject(error);
    }
  }

  then(onFulfilled, onRejected) {
    //then方法可以默认不传参数，这里做处理
    onFulfilled =
      typeof onFulfilled === 'function' ? onFulfilled : (value) => value;
    onRejected =
      typeof onRejected === 'function' ? onRejected : (reason) => reason;

    const promise = new MyPromise((resolve, reject) => {
      //立即执行
      const fulfilledMicrotask = () => {
        // 创建一个微任务等待 promise 完成初始化
        queueMicrotask(() => {
          try {
            // 获取成功回调函数的执行结果
            const x = onFulfilled(this.value);
            // 传入 resolvePromise 集中处理
            resolvePromise(promise, x, resolve, reject);
          } catch (error) {
            reject(error);
          }
        });
      };
      const rejectedMicrotask = () => {
        // 创建一个微任务等待 promise 完成初始化
        queueMicrotask(() => {
          try {
            // 调用失败回调，并且把原因返回
            const x = onRejected(this.reason);
            // 传入 resolvePromise 集中处理
            resolvePromise(promise, x, resolve, reject);
          } catch (error) {
            reject(error);
          }
        });
      };
      if (this.status === FULFILLED) {
        //这里需要将promise传入，但是promise需要初始化完成之后才能够使用
        fulfilledMicrotask();
      } else if (this.status === REJECTED) {
        //这里也需要类似FULFILLED的处理，否则异步之后无法触发promise的后续方法
        rejectedMicrotask();
      } else if (this.status === PENDING) {
        //同理
        this.onFulfilledCallback.push(fulfilledMicrotask);
        this.onRejectedCallback.push(rejectedMicrotask);
      }
    });
    return promise;
  }

  static resolve(parameter) {
    //传入promise，直接返回
    if (parameter instanceof MyPromise) {
      return parameter;
    }

    return new MyPromise((resolve) => {
      resolve(parameter);
    });
  }

  static reject(reason) {
    return new MyPromise((_, reject) => {
      reject(reason);
    });
  }
}

function resolvePromise(prePromise, res, resolve, reject) {
  //如果返回自身，存在循环调用的问题，应该判断
  if (prePromise === res) {
    return reject(new Error('Chaining cycle detected for promise #<Promise>'));
  }
  if (typeof res === 'object' || typeof res === 'function') {
    //如果是null直接返回
    if (res === null) {
      return resolve(res);
    }

    let then;
    try {
      then = res.then;
    } catch (error) {
      return reject(error)
    }

    //如果是函数
    if (typeof then === 'function') {
      let called = false;
      try {
        then.call(
          res, 
          y => {
            if (called) return;
            called = true;
            resolvePromise(promise, y, resolve, reject);
          },
          r => {
            if (called) return;
            called = true;
            reject(r);
          }
        )
      } catch (error) {
        //执行then方法出错，则将promise置为rejected
        if (called) return;
        reject(error);
      }
    }
    else {
      //如果then不是函数
      resolve(res);
    }
  }
  else {
    //如果不是对象或者函数，则直接执行
    resolve(res);
  }
  // //判断res是不是MyPromise的实例对象
  // if (res instanceof MyPromise) {
  //   //执行它
  //   res.then(
  //     (value) => resolve(value),
  //     (reason) => reject(reason)
  //   );
  // }
  // //普通值
  // else {
  //   resolve(res);
  // }
}

//test
MyPromise.deferred = function () {
  let result = {};
  result.promise = new MyPromise(function (resolve, reject) {
    result.resolve = resolve;
    result.reject = reject;
  });

  return result;
}

//暴露MyPromise类
module.exports = MyPromise;
