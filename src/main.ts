import './style.css'
import { setupSVG } from './svg'
import { Paper } from './board/paper'

const svgel = document.querySelector('#svgbox')
const serel = document.querySelector('#serialized')
const notifier = (pap?: Paper) => {
  console.log('NOTIFIER got message', pap?.serialize())
  if (serel) serel.innerHTML = pap?.serialize() || ''
}

if (svgel && serel) {
  setupSVG(svgel as HTMLElement, notifier)
}
