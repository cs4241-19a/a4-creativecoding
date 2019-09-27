import { mouseChange, mouseChangeBack } from './fileOne.js'
import { mouseChangeCross, mouseChangeMove } from './fileTwo.js'

function random () {
  var num = Math.floor(Math.random() * 10)
  return (num)
}

export function songMix () {
  var num = Math.floor(Math.random() * 10)
  if (num < 4) {
    return ('sampleAudio')
  } else if (num < 7 && num >= 4) {
    return ('sampleAudioTwo')
  } else {
    return ('sampleAudioThree')
  }
}

export default function mix () {
  var num = random()
  if (num < 2) {
    mouseChange()
  } else if (num >= 2 && num < 5) {
    mouseChangeBack()
  } else if (num >= 5 && num < 8) {
    mouseChangeCross()
  } else {
    mouseChangeMove()
  }
}
