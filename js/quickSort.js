function quickSort(arr, left, right) {
  if (left > right) return;
  let i = left;
  let j = right;

  let flag = arr[left];
  while (i < j) {
    while (arr[j] >= flag && i < j) {
      j--;
    }
    while (arr[i] <= flag && i < j) {
      i++;
    }
    if (i < j) {
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  }
  [arr[left], arr[i]] = [arr[i], arr[left]];
  quickSort(arr, left, j - 1);
  quickSort(arr, i + 1, right);
  return arr;
}

let arr = [12,13,54,43,65,16,56,1,4];
console.log(quickSort(arr, 0, arr.length - 1));
