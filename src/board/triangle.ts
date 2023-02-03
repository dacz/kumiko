import { GridDot, RealDot, PaperVirtualSize } from "./types";
import { SVG, Svg, Polygon } from '@svgdotjs/svg.js'

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
  draw(svg: Svg | null, side: number) {
    if (!svg) return;
    const rt = this.toRealTriangle(side);
    this.realDom = svg.polygon(
      rt.corners.reduce((acc: number[], c): number[] => acc.concat([c.x, c.y]), [])
    ).fill('none').stroke({ width: 3, color: 'green' })
    this.animate() // .... nice!
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
  // kind of 0,0 .. both are even numbers
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
    for (let vert = 0; vert < pvs.maxY; vert++) {
      triangles.push(new Triangle({ col, vert }));
    }
  }
  return triangles;
}