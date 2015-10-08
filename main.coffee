
global.Observable = require "observable"

getUserMedia = require "./lib/get_user_media"
AudioContext = window.AudioContext or window.webkitAudioContext
Model = require("./model")
Notifications = require "notifications"
Viz = require "./lib/viz"

notifications = Notifications()
document.body.appendChild notifications.view

notifications.push "Enable microphone access!"

{applyStylesheet} = require "./lib/util"
applyStylesheet require "./style"

createAudio = (stream) ->
  context = new AudioContext
  microphone = context.createMediaStreamSource(stream)

  global.model = Model
    input: microphone
    notifications: notifications

  document.body.appendChild require("./template")(model)

  canvas = createCanvas()

  analyser = context.createAnalyser()
  analyser.smoothingTimeConstant = 0

  viz = Viz(analyser)

  draw = ->
    viz.draw(canvas)
    requestAnimationFrame draw

  requestAnimationFrame draw

  microphone.connect(analyser)

  notifications.notify "Ready!"

createCanvas = ->
  Canvas = require "pixie-canvas"

  canvas = Canvas()

  handleResize =  ->
    canvas.width(window.innerWidth)
    canvas.height(window.innerHeight)

  handleResize()
  window.addEventListener "resize", handleResize, false

  document.body.appendChild canvas.element()

  return canvas

error = ->
  console.log arguments

if PACKAGE.name is "ROOT"
  getUserMedia({audio: true}, createAudio, error)

# -------------------------------------------------
# From here on down is our Whimsy.space integration


Postmaster = require("postmaster")
postmaster = Postmaster {},
  save: ->
    model.asBlob()
    .then (blob)->
      filePath = prompt "File name:", "sound.wav"

      postmaster.invokeRemote "saveFile", blob, filePath

# Apps must call childLoaded if they want to receive state/file data from OS
postmaster.invokeRemote "childLoaded"

document.addEventListener "keydown", (e) ->
  if e.ctrlKey
    if e.keyCode is 83 # s
      e.preventDefault()

      if e.shiftKey
        newPath = prompt "Path", filePath
        setPath(newPath) if newPath

      postmaster.save()
