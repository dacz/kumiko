import { PaperVirtualSize } from './types'
import { genDiagonallyUpLine, genDiagonallyUpLines, genDiagonallyDownLine, genDiagonallyDownLines, genVerticalLines } from './grid'
import { describe, it, expect } from 'vitest'

describe('genDiagonallyUpLine papersize', () => {
  const paperSize: PaperVirtualSize = {
    maxX: 3,
    maxY: 3,
  }

  it('topleft - null line', () => {
    const line = genDiagonallyUpLine(paperSize, paperSize.maxY)
    expect(line).toBe(null)
  })

  it('line from 2', () => {
    const line = genDiagonallyUpLine(paperSize, 2)
    // console.log('line>', line);
    expect(line).not.toBe(null)
    expect(line?.start.x).toBe(0)
    expect(line?.start.y).toBe(2)
    expect(line?.end.x).toBe(2)
    expect(line?.end.y).toBe(3)
  })

  it('line from 1', () => {
    const line = genDiagonallyUpLine(paperSize, 1)
    // console.log('line>>', line);
    expect(line).not.toBe(null)
    expect(line?.start.x).toBe(0)
    expect(line?.start.y).toBe(1)
    expect(line?.end.x).toBe(3)
    expect(line?.end.y).toBe(2.5)
  })

  it('line from -1', () => {
    const line = genDiagonallyUpLine(paperSize, -1)
    // console.log('line>>>>>>', line);
    expect(line).not.toBe(null)
    expect(line?.start.x).toBe(2)
    expect(line?.start.y).toBe(0)
    expect(line?.end.x).toBe(3)
    expect(line?.end.y).toBe(0.5)
  })

  it('off', () => {
    const line = genDiagonallyUpLine(paperSize, -10)
    expect(line).toBe(null)
  })
})

describe('genDiagonallyUpLine papersize2', () => {
  const paperSize: PaperVirtualSize = {
    maxX: 3,
    maxY: 4,
  }

  it('line from 2', () => {
    const line = genDiagonallyUpLine(paperSize, 2)
    // console.log('line>', line);
    expect(line).not.toBe(null)
    expect(line?.start.x).toBe(0)
    expect(line?.start.y).toBe(2)
    expect(line?.end.x).toBe(3)
    expect(line?.end.y).toBe(3.5)
  })

  it('line from -1', () => {
    const line = genDiagonallyUpLine(paperSize, -1)
    // console.log('line', line);
    expect(line).not.toBe(null)
    expect(line?.start.x).toBe(2)
    expect(line?.start.y).toBe(0)
    expect(line?.end.x).toBe(3)
    expect(line?.end.y).toBe(0.5)
  })

  it('off', () => {
    const line = genDiagonallyUpLine(paperSize, -10)
    expect(line).toBe(null)
  })
})

describe('genDiagonallyUpLines', () => {
  it('all', () => {
    const ps: PaperVirtualSize = {
      maxX: 3,
      maxY: 3,
    }
    const lines = genDiagonallyUpLines(ps)
    // console.log('lines>>', lines);
    expect(lines.length).toBe(4)
  })
})

describe('genDiagonallyDownLine papersize', () => {
  const paperSize: PaperVirtualSize = {
    maxX: 3,
    maxY: 3,
  }

  it('bottomleft - null line', () => {
    const line = genDiagonallyDownLine(paperSize, 0)
    expect(line).toBe(null)
  })

  it('line from 1', () => {
    const line = genDiagonallyDownLine(paperSize, 1)
    // console.log('line>', line);
    expect(line).not.toBe(null)
    expect(line?.start.x).toBe(0)
    expect(line?.start.y).toBe(1)
    expect(line?.end.x).toBe(2)
    expect(line?.end.y).toBe(0)
  })

  it('line from 2', () => {
    const line = genDiagonallyDownLine(paperSize, 2)
    // console.log('line>>', line);
    expect(line).not.toBe(null)
    expect(line?.start.x).toBe(0)
    expect(line?.start.y).toBe(2)
    expect(line?.end.x).toBe(3)
    expect(line?.end.y).toBe(0.5)
  })

  it('line from 4', () => {
    const line = genDiagonallyDownLine(paperSize, 4)
    // console.log('line>>>>>>', line);
    expect(line).not.toBe(null)
    expect(line?.start.x).toBe(2)
    expect(line?.start.y).toBe(3)
    expect(line?.end.x).toBe(3)
    expect(line?.end.y).toBe(2.5)
  })

  it('off', () => {
    const line = genDiagonallyDownLine(paperSize, 10)
    expect(line).toBe(null)
  })
})

describe('genDiagonallyDownLines', () => {
  it('all', () => {
    const ps: PaperVirtualSize = {
      maxX: 3,
      maxY: 3,
    }
    const lines = genDiagonallyDownLines(ps)
    // console.log('downlines>>', lines);
    expect(lines.length).toBe(4)
  })
})

describe('genVerticalLines', () => {
  it('all', () => {
    const ps: PaperVirtualSize = {
      maxX: 3,
      maxY: 3,
    }
    const lines = genVerticalLines(ps)
    // console.log('verticallines>>', lines);
    expect(lines.length).toBe(4)
  })
})
