import { Line, GridDot, PaperVirtualSize } from './types'

export function genDiagonallyUpLine(ps: PaperVirtualSize, leftYAxis: number): Line | null {
  if (leftYAxis >= ps.maxY) return null

  let start = new GridDot(0, leftYAxis)
  for (; start.x <= ps.maxX && !start.withinPaper(ps); start = start.upRight()) { }

  if (!start.withinPaper(ps)) return null

  // zkusi jit doprava nahoru a skonci, kdyz uz je to mimo papir
  let end: GridDot | null = null
  for (let endt = start.clone().upRight(); endt.withinPaper(ps); endt = endt.upRight()) {
    end = endt
  }

  if (end === null) return null

  return new Line(start, end)
  // return { start, end } as Line
}

export function genDiagonallyDownLine(ps: PaperVirtualSize, leftYAxis: number): Line | null {
  if (leftYAxis <= 0) return null

  let start = new GridDot(0, leftYAxis)
  for (; start.x <= ps.maxX && !start.withinPaper(ps); start = start.downRight()) { }

  if (!start.withinPaper(ps)) return null

  // zkusi jit doprava dolu a skonci, kdyz uz je to mimo papir
  let end: GridDot | null = null
  for (let endt = start.clone().downRight(); endt.withinPaper(ps); endt = endt.downRight()) {
    end = endt
  }

  if (end === null) return null

  return new Line(start, end)
  // return { start, end } as Line
}

export function genDiagonallyUpLines(ps: PaperVirtualSize): Line[] {
  let lines: Line[] = []

  for (let leftYAxis = ps.maxY - 1; ; leftYAxis--) {
    const line = genDiagonallyUpLine(ps, leftYAxis)
    if (line == null) break
    lines.push(line)
  }

  return lines
}

export function genDiagonallyDownLines(ps: PaperVirtualSize): Line[] {
  let lines: Line[] = []

  for (let leftYAxis = 1; ; leftYAxis++) {
    const line = genDiagonallyDownLine(ps, leftYAxis)
    if (line == null) break
    lines.push(line)
  }

  return lines
}

export function genVerticalLines(ps: PaperVirtualSize): Line[] {
  let lines: Line[] = []

  // every second vertical line is shorted on top and bottom

  for (let x = 0; x <= ps.maxX; x++) {
    let offset = 0
    if (x % 2 != 0) {
      offset = 0.5
    }
    lines.push(new Line(new GridDot(x, offset), new GridDot(x, ps.maxY - offset)))
  }

  return lines
}

export function genAllLines(ps: PaperVirtualSize): Line[] {
  return [
    ...genDiagonallyUpLines(ps),
    ...genDiagonallyDownLines(ps),
    ...genVerticalLines(ps),
  ]
}
