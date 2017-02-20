saveAs = require "./lib/file_saver"

AudioContext = window.AudioContext or window.webkitAudioContext
Model = require("./model")
Viz = require "./lib/viz"

{applyStylesheet} = require "./lib/util"
applyStylesheet require "./style"

createAudio = (stream) ->
  context = new AudioContext
  microphone = context.createMediaStreamSource(stream)

  global.model = Model
    input: microphone

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

if PACKAGE.name is "ROOT"
  navigator.mediaDevices.getUserMedia
    audio: true
  .then createAudio
  .catch (e) ->
    if e.name is "DevicesNotFoundError"
      alert "No devices found, is your microphone plugged in?"

# -------------------------------------------------
# From here on down is our Whimsy.space integration

isTop = (window.parent is window) and !opener

Postmaster = require("postmaster")
postmaster = Postmaster
  save: ->
    model.asBlob()
    .then (blob)->
      filePath = prompt "File name:", "sound.wav"

      if isTop
        saveAs blob, filePath
      else
        postmaster.invokeRemote "saveFile", blob, filePath

# Apps must call childLoaded if they want to receive state/file data from OS
unless isTop
  postmaster.invokeRemote "childLoaded"
  .catch (e) ->
    console.error e

document.addEventListener "keydown", (e) ->
  if e.ctrlKey
    if e.keyCode is 83 # s
      e.preventDefault()

      if e.shiftKey
        newPath = prompt "Path", filePath
        setPath(newPath) if newPath

      postmaster.save()
