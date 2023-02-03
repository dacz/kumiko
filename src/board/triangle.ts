import { GridDot, RealDot, PaperVirtualSize } from "./types";
import { SVG, Svg, Polygon, StrokeData } from '@svgdotjs/svg.js'

// see the trianglegrid.png in the root of the project
export interface TriangleCoords {
  col: number,
  vert: number,
}

export enum Filling {
  None = "none", // empty
  Empty = "empty", // bordered, but not filled
  Star = "star",
}

export class Triangle {
  coords: TriangleCoords;
  filling: Filling;
  corners: GridDot[];
  // real: RealTriangle | null;
  realDom: Polygon | null = null;

  // svgElement: Svg | null = null;

  constructor(coords: TriangleCoords, filling?: Filling) {
    this.coords = coords;
    this.filling = filling || Filling.None;
    this.corners = calcCorners(coords);
  }

  // TODO - so far it ignores the filling
  toRealTriangle(side: number): RealTriangle {
    return { corners: this.corners.map(c => c.toRealDot(side)) }
  }

  // will add to dom of this element
  draw(svg: Svg | null, side: number): this {
    if (!svg) return this;
    const rt = this.toRealTriangle(side);
    let tri = this;
    this.realDom = svg.polygon(
      rt.corners.reduce((acc: number[], c): number[] => acc.concat([c.x, c.y]), [])
    )
      .click(() => tri.click())
      .fill(tri.fill())
      .stroke(tri.stroke())
    // this.animate() // .... nice!
    return this
  }

  fill(): string {
    return this.filling == Filling.Star
      ? 'orange'
      : this.filling == Filling.Empty
        ? '#999'
        : 'transparent'
  }

  stroke(): StrokeData {
    return this.filling == Filling.Star || this.filling == Filling.Empty
      ? { width: 3, color: 'green' }
      : { width: 1, color: 'black' }
  }

  // click(cb: (e: MouseEvent) => void): this {
  click(): this {
    switch (this.filling) {
      case Filling.None:
        this.filling = Filling.Empty;
        break;
      case Filling.Empty:
        this.filling = Filling.Star;
        break;
      case Filling.Star:
        this.filling = Filling.None;
        break;
    }
    // console.log('filling', this);
    this.realDom?.fill(this.fill()).stroke(this.stroke())
    return this
  }

  animate() {
    if (!this.realDom) return;
    setInterval(() => this.realDom?.fill(randomColor()), 1000)
  }
}

function randomColor() {
  return '#' + Math.floor(Math.random() * 16777215).toString(16);
}

export function calcCorners(coords: TriangleCoords): GridDot[] {
  const { col, vert } = coords;
  const isEvenCol = col % 2 === 0;
  const isEvenVert = vert % 2 === 0;
  if (isEvenCol && isEvenVert) {
    return [
      new GridDot(col, Math.floor(vert / 2)), // bottom left
      new GridDot(col + 1, Math.floor(vert / 2) + 0.5), // right
      new GridDot(col, Math.floor(vert / 2) + 1), // top left
    ]
  } else if (!isEvenCol && isEvenVert) {
    return [
      new GridDot(col, Math.floor(vert / 2) + 0.5), // left middle
      new GridDot(col + 1, Math.floor(vert / 2)), // bottom right
      new GridDot(col + 1, Math.floor(vert / 2) + 1), // top right
    ]
  } else if (isEvenCol && !isEvenVert) {
    return [
      new GridDot(col, Math.floor(vert / 2) + 1), // left middle
      new GridDot(col + 1, Math.floor(vert / 2) + 0.5), // bottom right
      new GridDot(col + 1, Math.floor(vert / 2) + 1.5), // top right
    ]
  }
  //  else if (!isEvenCol && !isEvenVert) { // < not needed, last possible variant
  return [
    new GridDot(col, Math.floor(vert / 2) + 0.5), // left bottom
    new GridDot(col + 1, Math.floor(vert / 2) + 1), // right
    new GridDot(col, Math.floor(vert / 2) + 1.5), // top left
  ]
}

export interface RealTriangle {
  corners: RealDot[];
}

export function generateTriangles(pvs: PaperVirtualSize): Triangle[] {
  const triangles: Triangle[] = [];
  for (let col = 0; col < pvs.maxX; col++) {
    for (let vert = 0; vert < pvs.maxY * 2 - 1; vert++) {
      triangles.push(new Triangle({ col, vert }));
    }
  }
  return triangles;
}