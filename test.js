const fs = require('fs')
const buffer = fs.readFileSync('./code.js')

let text = String(buffer)
text = text.replace('module.exports =', '')
text = JSON.parse(text)
text.push({
  name: '3123123',
  content: '1234'
})
text = JSON.stringify(text)
text = 'module.exports = ' + text

fs.writeFile('./code.js', text, {flag:'w'}, () => {

})
console.log(text)