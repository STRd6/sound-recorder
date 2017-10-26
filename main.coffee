saveAs = require "./lib/file_saver"

SystemClient = require "sys"
SystemClient.applyExtensions()
{system, application, postmaster, util, UI, Observable} = client = SystemClient()
{Modal} = UI

# Add our style after system client UI styles so we can override
style = document.createElement "style"
style.innerHTML = require "./style"
document.head.appendChild style

AudioContext = window.AudioContext or window.webkitAudioContext
Model = require("./model")
Viz = require "./lib/viz"

createAudio = (stream) ->
  context = new AudioContext
  microphone = context.createMediaStreamSource(stream)

  global.model = Model
    input: microphone
    Observable: Observable
    save: ->
      handlers.save()

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

navigator.mediaDevices.getUserMedia
  audio: true
.then createAudio
.catch (e) ->
  if e.name is "DevicesNotFoundError"
    alert "No devices found, is your microphone plugged in?"

handlers = util.FileIO(client)

Object.assign handlers,
  loadFile: (blob, path) -> Promise.reject "Recorder can't load files"
  newFile: ->
  saveData: ->
    model.asBlob()

document.addEventListener "keydown", (e) ->
  {ctrlKey:ctrl, key, shiftKey:shift} = e
  if ctrl
    switch key
      when "s"
        e.preventDefault()
        if shift
          handlers.saveAs()
        else
          handlers.save()

system.ready()
.catch (e) ->
  handlers.saveAs = handlers.save = ->
    Modal.prompt "File name", "sound.wav"
    .then (name) ->
      model.asBlob()
      .then (blob) ->
        url = window.URL.createObjectURL(blob)
        a = document.createElement("a")
        a.href = url
        a.download = name
        a.click()
        window.URL.revokeObjectURL(url)

  console.warn e
