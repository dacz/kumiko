export enum Direction { // or Left, Right < > ??
  Up = "up",
  Down = "down",
}

export enum Filling {
  Empty = "empty", // bordered, but not filled
  Star = "star",
}

export interface Field {
  direction: Direction, // mozna je to u ElementCoords (nebo spocitatelny)
  filling: Filling | null, // null is empty one - space
}

export interface ColumnInput {
  jump?: number, // if not continued, +x is up, -x is down
  fields: Field[]
}

export interface Column {
  leftTopYCoord: number,
  leftBottomYCoord: number,
  rightTopYCoord: number,
  rightBottomYCoord: number,

  // topleft: GridDot, ??
  fields: Field[]
}

export type Columns = Column[]

export interface Board {
  columns: Columns,
  // topMax: () => number,
  // bottomMin: () => number,
  // width: () => number,
  // how the vertical lines are described?
  // how the down lines are calculated and described
  // how the up lines are calculated and described
}

export interface GridDot {
  x: number, // it is the index of the column (not real value, shorter than 1 - sqrt(0.5))
  y: number, // the real values
}

export interface Line {
  start: GridDot,
  end: GridDot,
}

// element grid is the grid of the triangle elements.
// the 0,0 is an up triangle
export interface ElementCoords {
  x: number,
  y: number,
}

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