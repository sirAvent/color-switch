import {
    PROMPT,
    RED, 
    YELLOW,
    BLUE,
    WHITE,
    SCORE_TXT,
    SCORE,
    GAME_OVER,
    DEVICE_WIDTH,
    DEVICE_HEIGHT,
} from './index.style'

import { gettext } from 'i18n'


// import LocalStorage from './storage'
// const localStorage = new LocalStorage('local_storage.txt')

const logger = DeviceRuntimeCore.HmLogger.getLogger('hello-world-page')

// Game Variables

score = 0
const colorArr = [gettext('red'), gettext('yellow'), gettext('white'), gettext('blue')]
const hexadArr = [0xFC6C51, 0xFCEA45, 0xF9F9F9, 0x00ACFF]


playing = true
colorInt = Math.floor(Math.random() * 4);
logger.log(colorInt)

hexInt = Math.floor(Math.random() * 4);

// Return none and get new prompt
function getNewPrompt() {
    newColorInt = Math.floor(Math.random() * 4)
    newHexInt = Math.floor(Math.random() * 4)

    // Ensures that it is always a different prompt
    while (newColorInt == colorInt && newHexInt == hexInt) {
        newColorInt = Math.floor(Math.random() * 4)
        newHexInt = Math.floor(Math.random() * 4)
    }

    colorInt = newColorInt
    hexInt = newHexInt

    prompt.setProperty(hmUI.prop.MORE, {
    text: colorArr[colorInt],
    color: hexadArr[hexInt]
    })
}

// Vibration Loss
const vibrate = hmSensor.createSensor(hmSensor.id.VIBRATE)
try {
  function click() {
    vibrate.motorenable = 1
    vibrate.crowneffecton = 1
    vibrate.scene = 3
    vibrate.stop()
    vibrate.start()
  }
}
catch(err){
  logger.log(err)
}

function buttonEvent(num) {
  if (num != colorInt) {
    // Lost Game
    if (num == -1) {game_over.setProperty(hmUI.prop.TEXT, (gettext('timeout') + score.toString() + gettext('playagain')))}
    else {game_over.setProperty(hmUI.prop.TEXT, (gettext('gameover') + score.toString() + gettext('playagain')))}
    
    click()
    score = 0
    score_display.setProperty(hmUI.prop.MORE, {
      text: score.toString(),
    })
    playing = false
    game_over.setProperty(hmUI.prop.VISIBLE, true)
  }
  else {
    // Continue playing
    score++
    score_display.setProperty(hmUI.prop.MORE, {
      text: score.toString(),
    })
  }
  timer_w = 250
  getNewPrompt()
}





Page({
  build() {
    logger.log('page build invoked')
    logger.log("AVENT WAS HERE")
    // Button Calls
    
    

    prompt = hmUI.createWidget(hmUI.widget.TEXT, PROMPT)
    prompt.setProperty(hmUI.prop.MORE, {
        text: colorArr[colorInt],
        color: hexadArr[hexInt]
    })

    red = hmUI.createWidget(hmUI.widget.BUTTON, {
        ...RED,
        click_func: () => {buttonEvent(0)}
    })

    yellow = hmUI.createWidget(hmUI.widget.BUTTON, {
        ...YELLOW,
        click_func: () => {buttonEvent(1)}
    })
    
    white = hmUI.createWidget(hmUI.widget.BUTTON, {
        ...WHITE,
        click_func: () => {buttonEvent(2)}
    })

    blue = hmUI.createWidget(hmUI.widget.BUTTON, {
        ...BLUE,
        click_func: () => {buttonEvent(3)}
    })

    
    

    score_txt = hmUI.createWidget(hmUI.widget.TEXT, SCORE_TXT)
    score_txt.setProperty(hmUI.prop.TEXT, gettext('score'))

    score_display = hmUI.createWidget(hmUI.widget.TEXT, SCORE)
    score_display.setProperty(hmUI.prop.MORE, {
        text: score.toString(),
    })

    const time_bar = hmUI.createWidget(hmUI.widget.FILL_RECT, {
      x: (DEVICE_WIDTH - 250)/2,
      y: DEVICE_HEIGHT - 45,
      w: 250,
      h: 15,
      color: 0xFFFFFF,
      radius: 5,
    })
    

    // TIMER
    timer_w = 250
    speed_playback = score + 1
    if (speed_playback >= 80) {speed_playback = 80} // Caps at 80
    const playInterval = timer.createTimer(
      500,
      125,
      function (option) {
      //callback
        speed_playback = score
        if (speed_playback >= 80) {speed_playback = 80} // Caps at 80
        if (playing) {timer_w = timer_w - (6.25 * (0.05 * speed_playback + 1)) }
        if (timer_w <= 0) {
          timer_w = 250
          buttonEvent(-1)
        }
        
        time_bar.setProperty(hmUI.prop.MORE, {
          x: (DEVICE_WIDTH - timer_w)/2,
          y: DEVICE_HEIGHT - 45,
          w: timer_w,
          h: 15,
          color: 0xFFFFFF,
          radius: 5,
        })
        
      },
      { hour: 0, minute: 15, second: 30 }
    )


    game_over = hmUI.createWidget(hmUI.widget.BUTTON, {
        ...GAME_OVER,
        click_func: () => {
            game_over.setProperty(hmUI.prop.VISIBLE, false)
            playing = true
        }
    })

    game_over.setProperty(hmUI.prop.VISIBLE, false)


  },
  onInit() {
    logger.log('page onInit invoked')
  },

  onDestroy() {
    logger.log('page onDestroy invoked')
    // localStorage.set(this.state.data)
    timer.stopTimer(playInterval)
    vibrate && vibrate.stop()

  },
})
