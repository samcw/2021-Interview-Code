/**
 * 
 * @param {string} template 
 * @param {object} config 
 */
function render(template, config) {
  let reg = /\{\{(\w+)\}\}/;
  if (reg.test(template)) {
    const key = reg.exec(template)[1];
    template = template.replace(reg, config[key]);
    return render(template, config);
  }
  return template;
}

let template = 'My name is {{name}}, I\'m {{age}} years old.';
const config = {
  name: 'sam',
  age: 18
}

console.log(render(template, config));