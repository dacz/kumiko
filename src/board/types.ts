export class GridDot {
  static readonly xSkew: number = Math.sqrt(0.5);

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

  toRealDot(side: number): RealDot {
    return {
      x: this.x * side * GridDot.xSkew,
      y: this.y * side,
    }
  }
}

export interface RealDot {
  x: number,
  y: number,
}

export class Line {
  start: GridDot;
  end: GridDot;

  constructor(start: GridDot, end: GridDot) {
    this.start = start;
    this.end = end;
  }

  toRealLine(side: number): RealLine {
    return {
      start: this.start.toRealDot(side),
      end: this.end.toRealDot(side),
    }
  }
}

export interface RealLine {
  start: RealDot,
  end: RealDot,
}

// x is 0 and goes right
// y is 0 and goes up
export interface PaperVirtualSize {
  maxX: number,
  maxY: number,
}

