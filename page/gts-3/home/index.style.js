// Square Screens

import { gettext } from 'i18n'

export const {
  width: DEVICE_WIDTH,
  height: DEVICE_HEIGHT
} = hmSetting.getDeviceInfo()


// Main Game Widgets

export const PROMPT = {
  x: 0,
  y: px(80),
  w: DEVICE_WIDTH,
  h: px(80),
  text: 'GREEN',
  text_size: px(50),
  color: 0x34e073,
  align_h: hmUI.align.CENTER_H,
  text_style: hmUI.text_style.ELLIPSIS,
}

export const SCORE_TXT = {
  x: px(50),
  y: DEVICE_HEIGHT - px(75),
  w: DEVICE_WIDTH,
  h: px(35),
  text: 'Score:',
  text_size: px(25),
  color: 0xFFFFFF,
  align_h: hmUI.align.LEFT,
  text_style: hmUI.text_style.ELLIPSIS,
}

export const SCORE = {
  x: px(-50),
  y: DEVICE_HEIGHT - px(75),
  w: DEVICE_WIDTH,
  h: px(35),
  text: '00',
  text_size: px(25),
  color: 0xFFFFFF,
  align_h: hmUI.align.RIGHT,
  text_style: hmUI.text_style.ELLIPSIS,
}

// Game-Over Pop Up

export const GAME_OVER = {
  x: px(0),
  y: px(0),
  w: DEVICE_WIDTH,
  h: DEVICE_HEIGHT,
  text_size: px(30),
  press_color: 0x000000,
  normal_color: 0x000000,
  text: 'Game Over',
}


// COLOR BUTTONS

export const RED = {
  x: px(80),
  y: px(145),
  w: DEVICE_WIDTH/2 - px(80),
  h: DEVICE_WIDTH/2 - px(80),
  press_color: 0xFFA493,
  normal_color: 0xFC6C51,
  text: '',
  radius: px(10),
}

export const YELLOW = {
  x: 80,
  y: DEVICE_WIDTH/2 + px(70),
  w: DEVICE_WIDTH/2 - px(80),
  h: DEVICE_WIDTH/2 - px(80),
  press_color: 0xFFF489,
  normal_color: 0xFCEA45,
  text: '',
  radius: px(10),
}

export const WHITE = {
  x: DEVICE_WIDTH/2 + px(5),
  y: px(145),
  w: DEVICE_WIDTH/2 - px(80),
  h: DEVICE_WIDTH/2 - px(80),
  press_color: 0xDAD8D8,
  normal_color: 0xF9F9F9,
  text: '',
  radius: px(10),
}

export const BLUE = {
  x: DEVICE_WIDTH/2 + px(5),
  y: DEVICE_WIDTH/2 + px(70),
  w: DEVICE_WIDTH/2 - px(80),
  h: DEVICE_WIDTH/2 - px(80),
  press_color: 0x75D2FF,
  normal_color: 0x00ACFF,
  text: '',
  radius: px(10),
}