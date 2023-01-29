import { Direction, Filling, Field, ColumnInput, Column, Board } from './types'
import { newBoard } from './funcs'
import { describe, it, expect } from 'vitest'

const colsInput: ColumnInput[] = [
  {
    fields: [
      { direction: Direction.Up, filling: Filling.Empty },
      { direction: Direction.Down, filling: Filling.Empty },
      { direction: Direction.Up, filling: Filling.Empty },
    ]
  },
  {
    // jump: -1,
    fields: [
      { direction: Direction.Down, filling: Filling.Empty },
      { direction: Direction.Up, filling: Filling.Empty },
      { direction: Direction.Down, filling: Filling.Empty },
    ]
  },
]

describe('newBoard', () => {
  it('ok', () => {
    const b = newBoard(colsInput)
    expect(b).not.toBeInstanceOf(Error)
    expect(b).toMatchSnapshot()
  })

  it('ok 2', () => {
    const colsInputCopy = structuredClone(colsInput)
    colsInputCopy[1] = structuredClone(colsInputCopy[0])
    const b = newBoard(colsInputCopy)
    console.log('b', b);
    expect(b).not.toBeInstanceOf(Error)
    expect(b).toMatchSnapshot()
  })

  it('ok, with jump', () => {
    const colsInputCopy = structuredClone(colsInput)
    colsInputCopy[1].jump = 1
    const b = newBoard(colsInputCopy)
    expect(b).not.toBeInstanceOf(Error)
    expect(b).toMatchSnapshot()
  })

  it('fail alternating fields', () => {
    const colsInputCopy = structuredClone(colsInput)
    colsInputCopy[1].fields[0].direction = Direction.Up
    const b = newBoard(colsInputCopy)
    expect(b).toBeInstanceOf(Error)
  })

  it('ok alternating columns if jump', () => {
    const colsInputCopy = structuredClone(colsInput)
    const secColumn = structuredClone(colsInputCopy[0])
    secColumn.jump = 1
    colsInputCopy[1] = secColumn
    const b = newBoard(colsInputCopy)
    expect(b).not.toBeInstanceOf(Error)
    expect(b).toMatchSnapshot()
  })

  it('ok 2 with jump, touching by corner (is ok)', () => {
    const colsInputCopy = structuredClone(colsInput)
    colsInputCopy[1] = structuredClone(colsInputCopy[0])
    colsInputCopy[1].jump = 1
    const b = newBoard(colsInputCopy)
    expect(b).not.toBeInstanceOf(Error)
    expect(b).toMatchSnapshot()
  })

  it('fail with 2 jumps, not touching', () => {
    const colsInputCopy = structuredClone(colsInput)
    colsInputCopy[1] = structuredClone(colsInputCopy[0])
    colsInputCopy[1].jump = 2
    const b = newBoard(colsInputCopy)
    expect(b).toMatchSnapshot()
    expect(b).toBeInstanceOf(Error)
  })
})
