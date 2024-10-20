import { PaperVirtualSize, serializePVS, deserializePVS } from './types';
import { SVG, Svg } from '@svgdotjs/svg.js'
import { Triangle, ParsedTriangleData, parseSerializedTriangle } from './triangle';

// in general the paper reflects how it is represented in the DOM
// that means x coord is the horizontal axis and 
// y coord is the vertical axis but positive values go down
export class Paper {
  static readonly xSkew: number = Math.sqrt(0.75);

  size: PaperVirtualSize;
  svgWidth: number = 1000;
  svgHeight: number;

  colSVGWidth: number;
  rowSVGHeight: number;

  svgElement: Svg | null = null;
  htmlElement: HTMLElement | null = null;

  triangles: Triangle[][] = [];
  notifyFn: ((pap: Paper) => void) | null = null;

  constructor(size: PaperVirtualSize) {
    this.size = size;
    this.colSVGWidth = this.svgWidth / (this.size.maxX + 1);
    this.rowSVGHeight = this.colSVGWidth / Paper.xSkew;
    this.svgHeight = this.rowSVGHeight * (this.size.maxY / 2 + 1);
  }

  // creates the svg element and attaches it to the DOM
  initSVGElement(el: HTMLElement): this {
    this.htmlElement = el;
    this.svgElement = SVG().viewbox(110, 0, 810, 810).css({ width: '100%', display: 'block' }).addTo(el).size('100%', '100%')
    // this.svgElement = SVG().viewbox(0, 0, this.svgWidth, this.svgHeight).css({ width: '100%', display: 'block' }).addTo(el).size('100%', '100%')
    return this;
  }

  registerNotifier(notifyFn: (pap: Paper) => void): this {
    this.notifyFn = notifyFn;
    return this;
  }

  notifyTriangleChange(_tri: Triangle): void {
    // console.log('TRIANGLE CHANGED:', tri);
    this.notifyFn?.bind(this, this)()
  }

  drawTriangles(trigs?: ParsedTriangleData[]): this {
    if (this.svgElement == null) {
      throw new Error('svgElement is null');
    }

    // generate triangles
    const triangles: Triangle[][] = [];
    for (let col = 0; col < this.size.maxX; col++) {
      const colTriangles: Triangle[] = [];
      for (let row = 0; row < this.size.maxY - 1; row++) {
        const triag = new Triangle({ col, row }, this.notifyTriangleChange.bind(this));
        triag.draw(this.svgElement, this.rowSVGHeight)
        colTriangles.push(triag);
      }
      triangles.push(colTriangles);
    }

    this.triangles = triangles;

    if (trigs) this.applyTriangleData(trigs);

    return this;
  }

  applyTriangleData(trigs: ParsedTriangleData[]): this {
    trigs.forEach(trigIn => {
      if ((trigIn.coords.col >= this.size.maxX) || (trigIn.coords.row >= this.size.maxY - 1)) {
        console.log('invalid triangle coords', trigIn);
        return;
      }
      this.triangles[trigIn.coords.col][trigIn.coords.row].applyFilling(trigIn.filling);
    })
    return this;
  }

  resetTriangles(): this {
    this.triangles.flat().forEach(tri => tri.reset());
    return this;
  }

  serialize(): string {
    const pvs = serializePVS(this.size);
    const trigs = this.triangles.flat().map(tri => tri.serialize()).filter(tri => tri != null)
    return `${pvs}|TR:${trigs.join(';')}`
  }
}

export interface PaperSerialized {
  size: PaperVirtualSize;
  trigs: ParsedTriangleData[];
}

export function deserializePaper(str: string): PaperSerialized {
  const [pvs, trigsAll] = str.split('|');
  if (pvs == null || trigsAll == null) throw new Error(`invalid serialized paper: ${str}`);

  const size = deserializePVS(pvs);

  const [_, trigsFullStr] = trigsAll.split(/^TR:(.*)$/);
  if (trigsFullStr == null) throw new Error(`invalid serialized paper: ${str}`);

  const trigs = trigsFullStr.split(';').map(parseSerializedTriangle).filter(tri => !(tri instanceof Error)) as ParsedTriangleData[];

  return { size, trigs };
}
