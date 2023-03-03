import { PaperVirtualSize } from './types';
import { SVG, Svg } from '@svgdotjs/svg.js'
import { generateTriangles, Triangle, ParsedTriangleData } from './triangle';

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

  triangles: Triangle[] = [];
  notifyFn: ((inp?: any) => void) | null = null;

  constructor(size: PaperVirtualSize, notifyFn?: (inp?: any) => void) {
    this.size = size;
    this.colSVGWidth = this.svgWidth / (this.size.maxX + 1);
    this.rowSVGHeight = this.colSVGWidth / Paper.xSkew;
    this.svgHeight = this.rowSVGHeight * (this.size.maxY + 1);
    this.notifyFn = notifyFn || null;
  }

  // creates the svg element and attaches it to the DOM
  initSVGElement(el: HTMLElement): this {
    this.htmlElement = el;
    this.svgElement = SVG().viewbox(0, 0, this.svgWidth, this.svgHeight).css({ width: '100%', display: 'block' }).addTo(el)
    return this;
  }

  notifyTriangleChange(tri: Triangle): void {
    console.log('TRIANGLE CHANGED:', tri);
    this.notifyFn?.("just changed")
  }

  drawTriangles(trigs?: ParsedTriangleData[]): this {
    if (this.svgElement == null) {
      throw new Error('svgElement is null');
    }

    this.triangles = generateTriangles(this.size, this.notifyTriangleChange).map(triag => triag.draw(this.svgElement, this.rowSVGHeight));

    if (trigs) this.applyTriangleData(trigs);

    return this;
  }

  applyTriangleData(trigs: ParsedTriangleData[]): this {
    this.triangles.forEach(tri => {
      const found = trigs.find(trig => tri.hasCoords(trig.coords));
      if (found) tri.applyFilling(found.filling);
    });
    return this;
  }

  serialize(): string {
    const ps = {
      size: this.size,
      trigs: this.triangles.map(tri => tri.serialize()),
    } as PaperSerialized;
    return JSON.stringify(ps);
  }
}

export interface PaperSerialized {
  size: PaperVirtualSize;
  trigs: string[];
}
