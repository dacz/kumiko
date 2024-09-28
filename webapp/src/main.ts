import './style.css'
import { setupSVG } from './svg'
import { Paper } from './board/paper'

const svgel = document.querySelector('#svgbox')
const serel = document.querySelector('#serialized')
const notifier = (pap?: Paper) => {
  const serializedPaper = pap?.serialize()
  console.log('NOTIFIER got message', serializedPaper)
  if (serel) serel.innerHTML = serializedPaper || ''
  window.location.hash = encodeURI(serializedPaper || '')
}

let initValue = 'PS:8,16|TR:2,6,1;2,7,1;2,8,1;2,9,1;2,10,1;3,5,2;3,6,2;3,7,2;3,8,1;3,9,1;3,10,1;4,5,2;4,6,2;4,7,2;4,8,1;4,10,1;5,6,1;5,7,1;5,8,1;5,9,1;5,10,1'

export let differentInitValue = 'PS:8,8|TR:3,1,2;3,2,2;3,3,2;4,1,2;4,2,2;4,3,2'

let currentBoard = initValue

export function setit() {
  if (currentBoard === initValue) {
    currentBoard = differentInitValue
  } else {
    currentBoard = initValue
  }
  if (svgel && serel) {
    svgel.innerHTML = ''
    setupSVG(svgel as HTMLElement, currentBoard, notifier)
  }
}

// if (svgel && serel) {
//   setupSVG(svgel as HTMLElement, initValue, notifier)
// }

// let hashval = encodeURI(initValue)

// window.location.hash = hashval
// let sh = window.location.hash

// if (sh.length > 0) sh = sh.replace(/^#/, '')

// console.log('sh AFTER', decodeURI(sh));

