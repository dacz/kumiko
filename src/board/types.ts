export enum Direction {
  Up,
  Down,
}

export enum Filling {
  Empty,
  Star,
}

export interface Field {
  direction: Direction,
  filling: Filling,
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

