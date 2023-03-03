import { GridDot, RealDot, PaperVirtualSize } from "./types";
import { Svg, Polygon, StrokeData, G } from '@svgdotjs/svg.js'

// see the trianglegrid.png in the root of the project
export interface TriangleCoords {
  col: number,
  row: number,
}

export enum Filling {
  None, // empty
  Empty, // bordered, but not filled
  Star, //
}

const stroked = { width: 5, color: '#999' } as StrokeData
const strokedLines = { width: 5, color: '#999', linecap: 'butt', linejoin: 'bevel' } as StrokeData
const unstroked = { width: 1, color: '#ddd' } as StrokeData

export class Triangle {
  // static readonly shortToTheStarCenter: number = Math.tan(30 * Math.PI / 180) / 2;
  static readonly shortToTheStarCenter: number = 0.32867513459481287 // ???

  coords: TriangleCoords;
  filling: Filling;
  corners: GridDot[];
  center: GridDot;
  // real: RealTriangle | null;
  realDom: Polygon | null = null;
  starDomGroup: G | null = null; // TODO - for filling
  notifyFn: ((tri: Triangle) => void) | null = null;

  // svgElement: Svg | null = null;

  constructor(coords: TriangleCoords, notifyFn?: (tri: Triangle) => void) {
    this.coords = coords;
    this.filling = Filling.None;
    this.notifyFn = notifyFn || null;
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

  // adds this element to DOM
  draw(svg: Svg | null, side: number): this {
    if (!svg) return this;
    const rt = this.toRealTriangle(side);
    let tri = this;
    this.starDomGroup = this.createStarFillingGroup(svg, rt);
    this.realDom = svg.polygon(
      rt.corners.reduce((acc: number[], c): number[] => acc.concat([c.x, c.y]), [])
    )
      .click(() => tri.click())
      .fill(tri.fill())
      .stroke(tri.stroke())


    if (this.filling == Filling.Star) {
      this.starDomGroup.css('visibility', 'visible')
    }
    // this.animate() // .... nice!
    return this
  }

  createStarFillingGroup(svg: Svg, rt: RealTriangle): G {
    const fillingDomGroup = svg.group();
    rt.corners.forEach(rd => {
      fillingDomGroup.line(rd.x, rd.y, rt.center.x, rt.center.y).stroke(strokedLines)
    })
    fillingDomGroup?.css('visibility', 'hidden')
    return fillingDomGroup;
  }

  fill(): string { return 'transparent' }

  stroke(): StrokeData {
    return this.filling == Filling.Star || this.filling == Filling.Empty ? stroked : unstroked
  }

  // click(cb: (e: MouseEvent) => void): this {
  click(): this {
    switch (this.filling) {
      case Filling.None:
        return this.applyFilling(Filling.Empty);
      case Filling.Empty:
        return this.applyFilling(Filling.Star);
      case Filling.Star:
        return this.applyFilling(Filling.None);
    }
  }

  applyFilling(f: Filling): this {
    this.filling = f;
    switch (f) {
      case Filling.None:
        this.starDomGroup?.css('visibility', 'hidden')
        break;
      case Filling.Empty:
        this.starDomGroup?.css('visibility', 'hidden')
        break;
      case Filling.Star:
        this.starDomGroup?.css('visibility', 'visible')
        break;
    }
    this.realDom?.fill(this.fill()).stroke(this.stroke())
    this.notifyFn?.(this)
    return this
  }

  // serializes either only none "None" triangles, or all
  serialize(all?: boolean): string {
    if (!all && this.filling == Filling.None) return '';
    return `${this.coords.col},${this.coords.row},${this.filling}`
  }

  hasCoords(coords: TriangleCoords): boolean {
    return this.coords.col == coords.col && this.coords.row == coords.row
  }

  // animate() {
  //   if (!this.realDom) return;
  //   setInterval(() => this.realDom?.fill(randomColor()), 1000)
  // }
}

// function randomColor() {
//   return '#' + Math.floor(Math.random() * 16777215).toString(16);
// }

// od y (vert) se odecte 1
export function calcCorners(coords: TriangleCoords): { corners: GridDot[], center: GridDot } {
  const { col, row: vert } = coords;
  const isEvenCol = col % 2 === 0;
  const isEvenVert = vert % 2 === 0;
  if (isEvenCol && !isEvenVert) {
    const corners = [
      new GridDot(col, Math.floor(vert / 2) + 0.5), // bottom left
      new GridDot(col + 1, Math.floor(vert / 2) + 1), // right
      new GridDot(col, Math.floor(vert / 2) + 1.5), // top left
    ]
    const center = corners[0].clone();
    center.x += Triangle.shortToTheStarCenter;
    center.y += 0.5;
    return { corners, center }
  } else if (!isEvenCol && !isEvenVert) {
    const corners = [
      new GridDot(col, Math.floor(vert / 2) + 1), // left middle
      new GridDot(col + 1, Math.floor(vert / 2) + 0.5), // bottom right
      new GridDot(col + 1, Math.floor(vert / 2) + 1.5), // top right
    ]
    const center = corners[1].clone();
    center.x -= Triangle.shortToTheStarCenter;
    center.y += 0.5;
    return { corners, center }
  } else if (isEvenCol && isEvenVert) {
    const corners = [
      new GridDot(col, Math.floor(vert / 2) + 0.5), // left middle
      new GridDot(col + 1, Math.floor(vert / 2)), // bottom right
      new GridDot(col + 1, Math.floor(vert / 2) + 1), // top right
    ]
    const center = corners[1].clone();
    center.x -= Triangle.shortToTheStarCenter;
    center.y += 0.5;
    return { corners, center }
  }
  //  else if (!isEvenCol && isEvenVert) { // < not needed, last possible variant
  const corners = [
    new GridDot(col, Math.floor(vert / 2)), // left bottom
    new GridDot(col + 1, Math.floor(vert / 2) + 0.5), // right
    new GridDot(col, Math.floor(vert / 2) + 1), // top left
  ]
  const center = corners[0].clone();
  center.x += Triangle.shortToTheStarCenter;
  center.y += 0.5;
  return { corners, center }
}

export interface RealTriangle {
  corners: RealDot[];
  center: RealDot;
}

export function generateTriangles(pvs: PaperVirtualSize, notifyFn?: (tri: Triangle) => void): Triangle[] {
  const triangles: Triangle[] = [];
  for (let col = 0; col < pvs.maxX; col++) {
    for (let vert = 0; vert < pvs.maxY * 2 - 1; vert++) {
      triangles.push(new Triangle({ col, row: vert }, notifyFn));
    }
  }
  return triangles;
}

// TODO: pokud je jedno pole uplne "obkrouzeny", tak se v podstate musi take oznacit jako plny
// (nebo mozna nemusi, protoze ty tycky, co budu generovat, to vyresi)

export interface ParsedTriangleData {
  coords: TriangleCoords;
  filling: Filling;
}

export function parseSerializedTriangle(sstr: string): ParsedTriangleData | Error {
  const parts = sstr.split(',');
  if (parts.length != 3) return new Error(`Invalid serialized triangle: ${sstr}`)
  const col = parseInt(parts[0]);
  const row = parseInt(parts[1]);
  const filling = parseInt(parts[2]);
  if (isNaN(col) || isNaN(row) || isNaN(filling)) return new Error(`Invalid serialized triangle: ${sstr}`)
  return {
    coords: { col, row } as TriangleCoords,
    filling: filling as Filling
  };
};
