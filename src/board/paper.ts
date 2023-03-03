import { PaperVirtualSize } from './types';
import { SVG, Svg } from '@svgdotjs/svg.js'
// import { genDiagonallyDownLines, genDiagonallyUpLines, genVerticalLines } from './grid';
import { generateTriangles, Triangle } from './triangle';

// in general the paper reflects how it is represented in the DOM
// that means x coord is the horizontal axis and 
// y coord is the vertical axis but positive values go down
export class Paper {
  static readonly xSkew: number = Math.sqrt(0.75);

  size: PaperVirtualSize;
  // rows: number = 0;
  // cols: number = 0;
  svgWidth: number = 1000;
  svgHeight: number;

  colSVGWidth: number;
  rowSVGHeight: number;

  svgElement: Svg | null = null;
  htmlElement: HTMLElement | null = null;

  triangles: Triangle[] = [];

  constructor(size: PaperVirtualSize) {
    this.size = size;
    this.colSVGWidth = this.svgWidth / (this.size.maxX + 1);
    this.rowSVGHeight = this.colSVGWidth / Paper.xSkew;
    this.svgHeight = this.rowSVGHeight * (this.size.maxY + 1);
  }

  // creates the svg element and attaches it to the DOM
  initSVGElement(el: HTMLElement): this {
    this.htmlElement = el;
    this.svgElement = SVG().viewbox(0, 0, this.svgWidth, this.svgHeight).css({ width: '100%', display: 'block' }).addTo(el)
    return this;
  }

  drawTriangles(): this {
    if (this.svgElement == null) {
      throw new Error('svgElement is null');
    }

    // const pvs: PaperVirtualSize = { maxX: 5, maxY: 7 };
    this.triangles = generateTriangles(this.size).map(triag => triag.draw(this.svgElement, this.rowSVGHeight));

    return this;
  }
}

