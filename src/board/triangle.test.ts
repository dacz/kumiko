import { TriangleCoords, calcCorners, generateTriangles } from './triangle'
import { describe, it, expect } from 'vitest'
import { PaperVirtualSize } from './types'

describe('calcCorners', () => {

  it('0,0', () => {
    const coords: TriangleCoords = { col: 0, vert: 0 }
    const corners = calcCorners(coords)
    expect(corners.length).toBe(3)
    // console.log('corners', corners);
    expect(corners).toMatchObject([
      { x: 0, y: 0 },
      { x: 1, y: 0.5 },
      { x: 0, y: 1 },
    ])
  })

  it('1,0', () => {
    const coords: TriangleCoords = { col: 1, vert: 0 }
    const corners = calcCorners(coords)
    expect(corners.length).toBe(3)
    // console.log('corners', corners);
    expect(corners).toMatchObject([
      { x: 1, y: 0.5 },
      { x: 2, y: 0 },
      { x: 2, y: 1 }
    ])
  })

  it('0,1', () => {
    const coords: TriangleCoords = { col: 0, vert: 1 }
    const corners = calcCorners(coords)
    expect(corners.length).toBe(3)
    // console.log('corners', corners);
    expect(corners).toMatchObject([
      { x: 0, y: 1 },
      { x: 1, y: 0.5 },
      { x: 1, y: 1.5 }
    ])
  })

  it('1,1', () => {
    const coords: TriangleCoords = { col: 1, vert: 1 }
    const corners = calcCorners(coords)
    expect(corners.length).toBe(3)
    // console.log('corners', corners);
    expect(corners).toMatchObject([
      { x: 1, y: 0.5 },
      { x: 2, y: 1 },
      { x: 1, y: 1.5 }
    ])
  })

  it('3,4', () => {
    const coords: TriangleCoords = { col: 3, vert: 4 }
    const corners = calcCorners(coords)
    expect(corners.length).toBe(3)
    // console.log('corners', corners);
    expect(corners).toMatchObject([
      { x: 3, y: 2.5 },
      { x: 4, y: 2 },
      { x: 4, y: 3 }
    ])
  })

  it('2,4', () => {
    const coords: TriangleCoords = { col: 2, vert: 4 }
    const corners = calcCorners(coords)
    expect(corners.length).toBe(3)
    // console.log('corners', corners);
    expect(corners).toMatchObject([
      { x: 2, y: 2 },
      { x: 3, y: 2.5 },
      { x: 2, y: 3 }
    ])
  })

  it('2,3', () => {
    const coords: TriangleCoords = { col: 2, vert: 3 }
    const corners = calcCorners(coords)
    expect(corners.length).toBe(3)
    // console.log('corners', corners);
    expect(corners).toMatchObject([
      { x: 2, y: 2 },
      { x: 3, y: 1.5 },
      { x: 3, y: 2.5 }
    ])
  })

  it('3,3', () => {
    const coords: TriangleCoords = { col: 3, vert: 3 }
    const corners = calcCorners(coords)
    expect(corners.length).toBe(3)
    // console.log('corners', corners);
    expect(corners).toMatchObject([
      { x: 3, y: 1.5 },
      { x: 4, y: 2 },
      { x: 3, y: 2.5 }
    ])
  })
})

describe('generate triangles', () => {

  it('ok', () => {
    const pvs: PaperVirtualSize = { maxX: 10, maxY: 10 }
    const trigs = generateTriangles(pvs)
    expect(trigs.length).toBe(100)
  })
})