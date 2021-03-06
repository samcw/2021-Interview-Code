//简单实现
function deepClone(target) {
  const types = new Set(['boolean', 'string', 'number', 'undefined']);
  const targetType = typeof target;
  //如果传入对象为原始值类型，则直接返回
  if (types.has(targetType) || target === null) {
    return target;
  }
  //处理包含数组的情况
  let targetClone = Array.isArray(target) ? [] : {};
  for (let key in target) {
    if (target.hasOwnProperty(key)) {
      targetClone[key] = deepClone(target[key]);
    }
  }

  return targetClone;
}

/**********测试*********/
let obj = {
  arr: [1, 2, '3'],
  obj1: {
    a: 'a',
    b: 'b'
  }
}

let cloneObj = deepClone(obj);
console.log(cloneObj);