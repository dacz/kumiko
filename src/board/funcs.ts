import { Direction, Field, ColumnInput, Column, Board, Line, GridDot } from './types'

function verifyAlternatingFields(fields: Field[]): null | Error {
  if (fields.length == 0) {
    return new Error('no fields')
  }

  let prevDir: Direction | undefined
  let i = 0
  for (const field of fields) {
    i++
    if (prevDir === undefined) {
      prevDir = field.direction
      continue
    }

    if (prevDir === field.direction) {
      return new Error(`${i}`)
    }

    prevDir = field.direction
  }

  return null
}

// the first field of each column must be alternating if there is not a jump
function verifySufficientOverlapVerticalLines(cols: Column[]): null | Error {
  for (let i = 0; i < cols.length - 1; i++) {
    if (cols[i].rightTopYCoord < cols[i + 1].leftBottomYCoord) return new Error(`${i + 1}`)
    if (cols[i].rightBottomYCoord > cols[i + 1].leftTopYCoord) return new Error(`${i + 1}`)
  }

  return null
}

// function ident2LinesUp(cols: Column[]) { }
// function ident2LinesDown(cols: Column[]) { }

// function makeGrid(cols: Column[]) { }

// TODO - zavest prazdny typ trojuhelniku - pro mezery

function leftLinesFromColumn(col: Column): Line[] { }
function rightLinesFromColumn(col: Column): Line[] { }
function deOverlapLinesOfSameDirection(lines: Line[]): Line[] { }
function upLinesFromColumn(col: Column): Line[] { }
function downLinesFromColumn(col: Column): Line[] { }
function linesOfPlane(plane: any, lines: Line[]): Line[] { } // plane is a function?, value?

// rewrite it to:
// 1. calculate the top left of the column (add to the column)
// 2. calculate vertical lines on both sides (for each column)
// 3. calculate the up/down lines of the fields (for each column)
// 4. calculate the biggest rectangle (for the whole board) (smallest and biggest x and y)



function makeLines(cols: Column[]): Line[] {
  const lines: Line[] = []
  for (let x = 0; x < cols.length; x++) {
    const col = cols[x]

    // -- vertical lines
    if (x == 0) {
      // left vertical line - is only one (which is generally not true)
      lines.push({
        start: { x, y: col.leftTopYCoord },
        end: { x, y: col.leftBottomYCoord },
      })
    }
    // right vertical line
    lines.push({
      start: { x, y: col.rightTopYCoord },
      end: { x, y: col.rightBottomYCoord },
    })

    for (let y = 0; y < col.fields.length; y++) {
      const field = col.fields[y]
      if (field.direction === Direction.Up) {
        // draw line from x, y to x + 0.5, y + 0.5
      } else {
        // draw line from x, y to x + 0.5, y - 0.5
      }
    }
  }

}

export function newBoard(input: ColumnInput[]): Board | Error {
  // verify fields alternating
  let i = 0
  for (const col of input) {
    i++
    const maybeErr = verifyAlternatingFields(col.fields)
    if (maybeErr instanceof Error) {
      return new Error(`fields must alternate - column ${i}: position: ${maybeErr.message}`)
    }
  }

  // calculate columns
  const [columns, _n] = input.reduce((acc: [Column[], number], col) => {
    const nc = newColumn(acc[1], col)
    return [[...acc[0], nc], nc.rightTopYCoord]
  }, [[], 0] as [Column[], number])

  // check sufficient overlap of the vertial lines
  const maybeErr = verifySufficientOverlapVerticalLines(columns)
  if (maybeErr instanceof Error) {
    return new Error(`insufficient overlap between ${maybeErr.message}. and the next column`)
  }

  // check/identify points where only 2 lines are crossed (error, too - will be ugly)

  return {
    columns: columns,
  }
}

// then calculate other things on the board 
//    * bounding box
//    * vertical coords []
//    * ups coords []
//    * downs coords []

function newColumn(initPos: number, input: ColumnInput): Column {
  const leftTopYCoord = initPos + (input.jump || 0)
  const rightTopYCoord = leftTopYCoord + (
    input.fields[0].direction === Direction.Up ? 0.5 : -0.5
  )

  return {
    fields: input.fields,

    leftTopYCoord,
    leftBottomYCoord: leftTopYCoord - (
      input.fields[0].direction === Direction.Up
        ? Math.floor((input.fields.length) / 2)
        : Math.floor((input.fields.length + 1) / 2)
    ),
    rightTopYCoord,
    rightBottomYCoord: rightTopYCoord - (
      input.fields[0].direction === Direction.Up
        ? Math.floor((input.fields.length + 1) / 2)
        : Math.floor((input.fields.length) / 2)
    ),
  }
}

