// This file compile svgs from assets/sources to common/body_tag.html
//
const path = require('path')
const fs = require('fs')

const {optimize} = require('svgo')

const DIR = './assets/sources';
const files = fs.readdirSync(DIR)

let container = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" style="display: none;">
`

for (const fn of files) {
  if (/\.svg$/.test(fn)) {
    const p = path.join(DIR, fn)
    const content = fs.readFileSync(p, {encoding: 'utf-8'})
    const {data} = optimize(content, {
      path: p,
      multipass: false,
      plugins: [
        {
          name: 'preset-default',
          params: {
            overrides: {
              cleanupIds: {
                minify: false,
              },
              convertColors: {

              }
            }
          }
        }
      ]
    })
    container += `<symbol id="asktug-${fn.replace(/\.svg$/, '')}">${data}</symbol>\n`
  }
}
container += '</svg>'
fs.writeFileSync('./common/body_tag.html', container)
