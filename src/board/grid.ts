import { Line, GridDot, PaperSize } from './types'

export function genUpLine(ps: PaperSize, leftYAxis: number): Line | null {
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

  return { start, end } as Line
}

export function genDownLine(ps: PaperSize, leftYAxis: number): Line | null {
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

  return { start, end } as Line
}

export function genUpLines(ps: PaperSize): Line[] {
  let lines: Line[] = []

  for (let leftYAxis = ps.maxY - 1; ; leftYAxis--) {
    const line = genUpLine(ps, leftYAxis)
    if (line == null) break
    lines.push(line)
  }

  return lines
}

export function genDownLines(ps: PaperSize): Line[] {
  let lines: Line[] = []

  for (let leftYAxis = 1; ; leftYAxis++) {
    const line = genDownLine(ps, leftYAxis)
    if (line == null) break
    lines.push(line)
  }

  return lines
}



