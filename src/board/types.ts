export interface ElementCoords {
  col: number,
  vert: number,
}

export enum Filling {
  Empty = "empty", // bordered, but not filled
  Star = "star",
}

export interface Element {
  coords: ElementCoords,
  filling: Filling | null, // null is empty one - space
}



export interface GridDotInterface {
  x: number, // it is the index of the column (not real value, shorter than 1 - sqrt(0.5))
  y: number, // the real values
  withinPaper: (ps: PaperVirtualSize) => boolean,
  downLeft: () => GridDotInterface,
  downRight: () => GridDotInterface,
  upLeft: () => GridDotInterface,
  upRight: () => GridDotInterface,
  clone: () => GridDotInterface,
}

export class GridDot implements GridDotInterface {
  x: number; // it is the index of the column (not real value, shorter than 1 - sqrt(0.5))
  y: number; // the real values

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  withinPaper(ps: PaperVirtualSize): boolean {
    return this.x >= 0 && this.x <= ps.maxX && this.y >= 0 && this.y <= ps.maxY;
  }

  downLeft(): GridDot { return new GridDot(this.x - 1, this.y - 0.5) }
  downRight(): GridDot { return new GridDot(this.x + 1, this.y - 0.5) }
  upLeft(): GridDot { return new GridDot(this.x - 1, this.y + 0.5) }
  upRight(): GridDot { return new GridDot(this.x + 1, this.y + 0.5) }
  up(): GridDot { return new GridDot(this.x, this.y + 1) }
  down(): GridDot { return new GridDot(this.x, this.y - 1) }
  clone(): GridDot { return new GridDot(this.x, this.y) }
}

export interface Line {
  start: GridDot,
  end: GridDot,
}

// x is 0 and goes right
// y is 0 and goes up
export interface PaperVirtualSize {
  maxX: number,
  maxY: number,
}

// export class Paper {
//   static readonly xSkew: number = Math.sqrt(0.5);

//   size: PaperVirtualSize;
//   sideLength: number;
//   xLength: number;
//   svgElement: SVGElement | null = null;

//   constructor(size: PaperVirtualSize, sideLength: number = 100) {
//     this.size = size;
//     this.sideLength = sideLength;
//     this.xLength = this.sideLength * Paper.xSkew;
//   }

//   initSVGElement() { } // creates the svg element
//   drawGrid() { }
// }

// ElementCoords can calculate the coords (GridDots) of it's 3 corners
// ElementCoords can calculate the up/down direction
// Routine can start with one element and "grows" the lines.

// draw the grid with lines
// draw coords there?
// enable event on grid element (the element is probably invisible overlay?)


// --

// ---

// interface BarInterface
// {
//     num: number;
//     str: string;
//     fun: () => void;
// }

// class Bar implements BarInterface {
//     num: number;
//     str: string;

//     constructor(num: number, str: string) {
//         this.num = num;
//         this.str = str;
//     }
//     fun() {
//         console.log(this.num, this.str);
//     }
// }

// let foo = new Bar(2, "B");

// foo.fun();