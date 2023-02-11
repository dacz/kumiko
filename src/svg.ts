// import { SVG } from '@svgdotjs/svg.js'
import { Paper } from './board/paper'
import { PaperVirtualSize } from './board/types';

export function setupSVG(elname: HTMLElement) {

  const pvs: PaperVirtualSize = { maxX: 8, maxY: 8 }
  const p = new Paper(pvs).initSVGElement(elname)
  // p.drawGrid()
  p.drawTriangles()

  // const draw = SVG().viewbox(0, 0, 1000, 1000).css({ width: '100%', height: '100%' }).addTo(elname)
  // draw.rect(10, 100).move(100, 100).attr({ fill: '#f06' })
  // draw.rect(10, 100).move(200, 100).attr({ fill: '#f06' })
  // draw.line(0, 0, 100, 150).addClass('grid').stroke({ width: 1, color: '#ddd' })
  // const rect = draw.rect(100, 100).attr({ fill: '#f06' })
}
