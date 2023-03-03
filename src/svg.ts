// import { SVG } from '@svgdotjs/svg.js'
import { Paper } from './board/paper'
import { PaperVirtualSize } from './board/types';

export function setupSVG(elname: HTMLElement) {

  const pvs: PaperVirtualSize = { maxX: 8, maxY: 8 }
  const p = new Paper(pvs).initSVGElement(elname)
  p.drawTriangles()
}
