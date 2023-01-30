import { PaperSize } from './types'
import { genUpLine, genUpLines, genDownLine, genDownLines } from './grid'
import { describe, it, expect } from 'vitest'

describe('genUpLine papersize', () => {
  const paperSize: PaperSize = {
    maxX: 3,
    maxY: 3,
  }

  it('topleft - null line', () => {
    const line = genUpLine(paperSize, paperSize.maxY)
    expect(line).toBe(null)
  })

  it('line from 2', () => {
    const line = genUpLine(paperSize, 2)
    // console.log('line>', line);
    expect(line).not.toBe(null)
    expect(line?.start.x).toBe(0)
    expect(line?.start.y).toBe(2)
    expect(line?.end.x).toBe(2)
    expect(line?.end.y).toBe(3)
  })

  it('line from 1', () => {
    const line = genUpLine(paperSize, 1)
    // console.log('line>>', line);
    expect(line).not.toBe(null)
    expect(line?.start.x).toBe(0)
    expect(line?.start.y).toBe(1)
    expect(line?.end.x).toBe(3)
    expect(line?.end.y).toBe(2.5)
  })

  it('line from -1', () => {
    const line = genUpLine(paperSize, -1)
    // console.log('line>>>>>>', line);
    expect(line).not.toBe(null)
    expect(line?.start.x).toBe(2)
    expect(line?.start.y).toBe(0)
    expect(line?.end.x).toBe(3)
    expect(line?.end.y).toBe(0.5)
  })

  it('off', () => {
    const line = genUpLine(paperSize, -10)
    expect(line).toBe(null)
  })
})

describe('genUpLine papersize2', () => {
  const paperSize: PaperSize = {
    maxX: 3,
    maxY: 4,
  }

  it('line from 2', () => {
    const line = genUpLine(paperSize, 2)
    console.log('line>', line);
    expect(line).not.toBe(null)
    expect(line?.start.x).toBe(0)
    expect(line?.start.y).toBe(2)
    expect(line?.end.x).toBe(3)
    expect(line?.end.y).toBe(3.5)
  })

  it('line from -1', (ctx) => {
    const line = genUpLine(paperSize, -1)
    console.log(ctx.meta.name, ': line', line);
    expect(line).not.toBe(null)
    expect(line?.start.x).toBe(2)
    expect(line?.start.y).toBe(0)
    expect(line?.end.x).toBe(3)
    expect(line?.end.y).toBe(0.5)
  })

  it('off', () => {
    const line = genUpLine(paperSize, -10)
    expect(line).toBe(null)
  })
})

describe('genUpLines', () => {
  it('all', () => {
    const ps: PaperSize = {
      maxX: 3,
      maxY: 3,
    }
    const lines = genUpLines(ps)
    console.log('lines>>', lines);
    expect(lines.length).toBe(4)
  })
})

describe('genDownLine papersize', () => {
  const paperSize: PaperSize = {
    maxX: 3,
    maxY: 3,
  }

  it('bottomleft - null line', () => {
    const line = genDownLine(paperSize, 0)
    expect(line).toBe(null)
  })

  it('line from 1', () => {
    const line = genDownLine(paperSize, 1)
    // console.log('line>', line);
    expect(line).not.toBe(null)
    expect(line?.start.x).toBe(0)
    expect(line?.start.y).toBe(1)
    expect(line?.end.x).toBe(2)
    expect(line?.end.y).toBe(0)
  })

  it('line from 2', () => {
    const line = genDownLine(paperSize, 2)
    // console.log('line>>', line);
    expect(line).not.toBe(null)
    expect(line?.start.x).toBe(0)
    expect(line?.start.y).toBe(2)
    expect(line?.end.x).toBe(3)
    expect(line?.end.y).toBe(0.5)
  })

  it('line from 4', () => {
    const line = genDownLine(paperSize, 4)
    // console.log('line>>>>>>', line);
    expect(line).not.toBe(null)
    expect(line?.start.x).toBe(2)
    expect(line?.start.y).toBe(3)
    expect(line?.end.x).toBe(3)
    expect(line?.end.y).toBe(2.5)
  })

  it('off', () => {
    const line = genDownLine(paperSize, 10)
    expect(line).toBe(null)
  })
})

describe('genDownLines', () => {
  it('all', () => {
    const ps: PaperSize = {
      maxX: 3,
      maxY: 3,
    }
    const lines = genDownLines(ps)
    console.log('downlines>>', lines);
    expect(lines.length).toBe(4)
  })
})
