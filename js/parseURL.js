/**
 * 
 * @param {string} url 
 */
function parseURL(url) {
  const rest = /.+\?(.+)$/.exec(url)[1];
  const query = rest.split('&');
  const res = {};
  query.forEach(item => {
    let [key, value] = item.split('=');
    value = decodeURI(value);
    if (/^\d+$/.test(value)) value = parseInt(value, 10);
    res[key] = value;
  })
  return res;
}

console.log(parseURL('http://localhost/user/query?username=samcw&age=18'));