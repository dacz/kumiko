import './style.css'
import { setupSVG } from './svg'

const sel = document.querySelector('#svgbox')
if (sel) {
  setupSVG(sel as HTMLElement)
}
