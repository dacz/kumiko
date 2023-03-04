// import { SVG } from '@svgdotjs/svg.js'
import { Paper, PaperSerialized } from './board/paper'
import { parseSerializedTriangle, ParsedTriangleData } from './board/triangle'
import { PaperVirtualSize } from './board/types';

export function setupSVG(elname: HTMLElement, initValue: string, notifier?: () => void): void {
  let pvs: PaperVirtualSize = { maxX: 8, maxY: 16 };
  let trigsUnparsed: string[] = [];

  if (initValue) {
    try {
      const ps: PaperSerialized = JSON.parse(initValue)
      pvs = ps.size
      trigsUnparsed = ps.trigs
    } catch (e) {
      console.error('Invalid initValue', e)
    }
  }

  const p = new Paper(pvs).initSVGElement(elname)
  if (notifier) p.registerNotifier(notifier)
  p.drawTriangles()



  if (trigsUnparsed.length > 0) {
    const trigs = trigsUnparsed.map(parseSerializedTriangle).filter(tri => !(tri instanceof Error)) as ParsedTriangleData[]
    p.applyTriangleData(trigs)
  }
}
