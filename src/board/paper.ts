import { PaperVirtualSize } from './types';
import { SVG, Svg } from '@svgdotjs/svg.js'

// in general the paper reflects how it is represented in the DOM
// that means x coord is the horizontal axis and 
// y coord is the vertical axis but positive values go down
export class Paper {
  static readonly xSkew: number = Math.sqrt(0.5);

  size: PaperVirtualSize;
  svgSize: number = 1000;
  sideLength: number = 100;
  xLength: number = this.sideLength * Paper.xSkew;
  rows: number = this.svgSize / this.sideLength;
  cols: number = this.svgSize / this.xLength;
  svgElement: Svg | null = null;
  htmlElement: HTMLElement | null = null;

  constructor(size: PaperVirtualSize) {
    this.size = size;
  }

  // creates the svg element and attaches it to the DOM
  initSVGElement(el: HTMLElement) {
    this.htmlElement = el;
    this.svgElement = SVG().viewbox(0, 0, this.svgSize, this.svgSize).css({ width: '100%', height: '100%' }).addTo(el)
  }

  // draws the grid
  drawGrid() { }
}