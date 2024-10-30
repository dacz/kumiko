// import './style.css'
import { setupSVG } from './svg'
import { Paper } from './board/paper'

const svgel = document.querySelector('#svgbox')
const serel = document.querySelector('#serialized')
var rotated = 0
const notifier = (pap?: Paper) => {
  let serializedPaper = pap?.serialize()
  if (rotated != 0) {
    serializedPaper += `|${rotated}`
  }
  // console.log('NOTIFIER got message', serializedPaper)
  // if (serel) serel.innerHTML = serializedPaper || ''
  window.location.hash = encodeURI(serializedPaper || '')
}

let initValue = 'PS:6,8|TR:1,1,1;1,2,1;1,3,1;1,4,1;1,5,1;2,0,1;2,1,1;2,2,1;2,3,1;2,4,1;2,5,1;2,6,1;3,0,1;3,1,1;3,2,1;3,3,1;3,4,1;3,5,1;3,6,1;4,1,1;4,2,1;4,3,1;4,4,1;4,5,1'

export let differentInitValue = 'PS:8,8|TR:3,1,2;3,2,2;3,3,2;4,1,2;4,2,2;4,3,2'

export function setit(force: boolean = false) {
  let currentBoard = initValue
  if (!force) {
    const currentHash = decodeURI(window.location.hash)
    const currentBoard = currentHash || initValue
    const cbs = currentBoard.split('|')
    if (cbs[2]) {
      rotated = parseInt(cbs[2]) - 90
      rotate()
    }
  } else {
    rotated = -90
    rotate()
  }
  if (svgel && serel) {
    svgel.innerHTML = ''
    setupSVG(svgel as HTMLElement, currentBoard, notifier)
  }
}

export function rotate() {
  rotated += 90
  if (rotated >= 360) rotated = 0
  const hash = decodeURI(window.location.hash)
  const parts = hash.split('|')
  parts[2] = rotated.toString()
  window.location.hash = encodeURI(parts.join('|'))

  if (svgel) {
    const svgelhtml = svgel as HTMLElement
    svgelhtml.style.transform = `rotate(${rotated}deg)`
  }
}
