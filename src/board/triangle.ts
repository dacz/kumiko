import { GridDot, RealDot, PaperVirtualSize } from "./types";
import { Svg, Polygon, StrokeData, G } from '@svgdotjs/svg.js'

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
  static readonly shortToTheStarCenter: number = Math.tan(30 * Math.PI / 180) * 0.5;

  coords: TriangleCoords;
  filling: Filling;
  corners: GridDot[];
  center: GridDot;
  // real: RealTriangle | null;
  realDom: Polygon | null = null;
  fillingDomGroup: G | null = null; // TODO - for filling

  // svgElement: Svg | null = null;

  constructor(coords: TriangleCoords, filling?: Filling) {
    this.coords = coords;
    this.filling = filling || Filling.None;
    const { corners, center } = calcCorners(coords);
    this.corners = corners;
    this.center = center;
  }

  // TODO - so far it ignores the filling
  toRealTriangle(side: number): RealTriangle {
    return {
      corners: this.corners.map(c => c.toRealDot(side)),
      center: this.center.toRealDot(side),
    }
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
      : 'transparent'
    // this.filling == Filling.Empty
    //   ? '#eee'
    //   : 'transparent'
  }

  stroke(): StrokeData {
    return this.filling == Filling.Star || this.filling == Filling.Empty
      ? { width: 5, color: '#666' }
      : { width: 1, color: '#ddd' }
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

export function calcCorners(coords: TriangleCoords): { corners: GridDot[], center: GridDot } {
  const { col, vert } = coords;
  const isEvenCol = col % 2 === 0;
  const isEvenVert = vert % 2 === 0;
  if (isEvenCol && isEvenVert) {
    const corners = [
      new GridDot(col, Math.floor(vert / 2)), // bottom left
      new GridDot(col + 1, Math.floor(vert / 2) + 0.5), // right
      new GridDot(col, Math.floor(vert / 2) + 1), // top left
    ]
    const center = corners[0].clone();
    center.x += Triangle.shortToTheStarCenter;
    center.y += 0.5;
    return { corners, center }
  } else if (!isEvenCol && isEvenVert) {
    const corners = [
      new GridDot(col, Math.floor(vert / 2) + 0.5), // left middle
      new GridDot(col + 1, Math.floor(vert / 2)), // bottom right
      new GridDot(col + 1, Math.floor(vert / 2) + 1), // top right
    ]
    const center = corners[1].clone();
    center.x -= Triangle.shortToTheStarCenter;
    center.y += 0.5;
    return { corners, center }
  } else if (isEvenCol && !isEvenVert) {
    const corners = [
      new GridDot(col, Math.floor(vert / 2) + 1), // left middle
      new GridDot(col + 1, Math.floor(vert / 2) + 0.5), // bottom right
      new GridDot(col + 1, Math.floor(vert / 2) + 1.5), // top right
    ]
    const center = corners[1].clone();
    center.x -= Triangle.shortToTheStarCenter;
    center.y += 0.5;
    return { corners, center }
  }
  //  else if (!isEvenCol && !isEvenVert) { // < not needed, last possible variant
  const corners = [
    new GridDot(col, Math.floor(vert / 2) + 0.5), // left bottom
    new GridDot(col + 1, Math.floor(vert / 2) + 1), // right
    new GridDot(col, Math.floor(vert / 2) + 1.5), // top left
  ]
  const center = corners[0].clone();
  center.x += Triangle.shortToTheStarCenter;
  center.y += 0.5;
  return { corners, center }
}

export interface RealTriangle {
  corners: RealDot[];
  center?: RealDot;
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

// TODO: pokud je jedno pole uplne "obkrouzeny", tak se v podstate musi take oznacit jako plny
// (nebo mozna nemusi, protoze ty tycky, co budu generovat, to vyresi)

