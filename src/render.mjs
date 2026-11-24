// Renderiza las láminas del README a 2× en ../assets (claro y oscuro).
// Uso: node src/render.mjs   (Chrome del sistema; usa el cliente CDP del arnés de diseño)
import { homedir } from 'node:os'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'
const { abrirChrome } = await import(join(homedir(), '.claude/skills/arnes-de-diseno/scripts/cdp.mjs'))

const pagina = new URL('./laminas.html', import.meta.url).href
const salida = fileURLToPath(new URL('../assets/', import.meta.url))
const nombres = { portada: 'header', pie: 'footer', trabajos: 'work', stack: 'stack', 'p-linkedin': 'btn-linkedin', 'p-portfolio': 'btn-portfolio' }
const c = await abrirChrome({ webgl: false })
for (const tema of ['oscuro', 'claro']) {
  const p = await c.pagina({ ancho: 1000, alto: 2600, escala: 2 })
  await p.enviar('Emulation.setDefaultBackgroundColorOverride', { color: { r: 0, g: 0, b: 0, a: 0 } })
  await p.ir(`${pagina}?tema=${tema}`)
  for (let i = 0; i < 50 && !(await p.evaluar('document.body.dataset.listo || ""')); i++) await new Promise((r) => setTimeout(r, 100))
  // Portada, pie y botones no cambian con el tema: se sacan una vez.
  const ids = tema === 'oscuro' ? Object.keys(nombres) : ['trabajos', 'stack']
  for (const id of ids) {
    const sel = id.startsWith('p-') ? `#${id} .pil` : `#${id}`
    const r = await p.evaluar(`(() => { const b = document.querySelector('${sel}').getBoundingClientRect(); return { x: b.x, y: b.y, width: b.width, height: b.height } })()`)
    const temado = id === 'trabajos' || id === 'stack'
    const archivo = `${nombres[id]}${temado ? (tema === 'oscuro' ? '-dark' : '-light') : ''}.png`
    await p.capturar(r, join(salida, archivo), 1)
    console.log(archivo, Math.round(r.width), '×', Math.round(r.height))
  }
  await p.cerrar()
}
setTimeout(() => process.exit(0), 2000)
await c.cerrar()
process.exit(0)
