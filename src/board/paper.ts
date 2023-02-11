import { PaperVirtualSize } from './types';
import { SVG, Svg, Line } from '@svgdotjs/svg.js'
import { genDiagonallyDownLines, genDiagonallyUpLines, genVerticalLines } from './grid';
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

  // draws the grid
  drawGrid(): this {
    if (this.svgElement == null) {
      throw new Error('svgElement is null');
    }

    // these lines are in virtual coords
    const virtualLines = genDiagonallyDownLines(this.size).concat(genDiagonallyUpLines(this.size), genVerticalLines(this.size));

    // calculate the lines real coords
    const realLines = virtualLines.map(line => line.toRealLine(this.rowSVGHeight))

    // draw the lines
    realLines.forEach(line => {
      this.svgElement?.line(line.start.x, line.start.y, line.end.x, line.end.y).mouseover(boldLine).mouseout(normalLine).stroke({ width: 1, color: '#ccc' })
    })

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

function boldLine(this: Line) {
  this.stroke({ width: 2, color: 'red' })
}

function normalLine(this: Line) {
  this.stroke({ width: 1, color: '#999' })
}
