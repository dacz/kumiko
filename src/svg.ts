import { SVG } from '@svgdotjs/svg.js'

export function setupSVG(elname: HTMLElement) {
  const draw = SVG().addTo(elname).size(800, 800)
  draw.rect(10, 100).move(100, 100).attr({ fill: '#f06' })
  draw.rect(10, 100).move(200, 100).attr({ fill: '#f06' })
  // const rect = draw.rect(100, 100).attr({ fill: '#f06' })
}
