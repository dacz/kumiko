// import { SVG } from '@svgdotjs/svg.js'
import { Paper, deserializePaper } from './board/paper'
import { ParsedTriangleData } from './board/triangle'
import { PaperVirtualSize } from './board/types';

export function setupSVG(elname: HTMLElement, initValue: string, notifier?: () => void): void {
  let pvs: PaperVirtualSize = { maxX: 8, maxY: 16 };
  let trigs: ParsedTriangleData[] = [];

  if (initValue) {
    try {
      const ps = deserializePaper(initValue)
      pvs = ps.size
      trigs = ps.trigs
    } catch (e) {
      console.error('Invalid initValue', e)
    }
  }

  const p = new Paper(pvs).initSVGElement(elname)
  if (notifier) p.registerNotifier(notifier)
  p.drawTriangles()
  p.applyTriangleData(trigs)
}
