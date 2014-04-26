Sound Recorder
==============

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

Create an audio stream an capture it for recording and display.

    createAudio = (stream) ->
      context = new AudioContext
      microphone = context.createMediaStreamSource(stream)

      model = Model
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

Create a canvas that covers the entire window so we can draw our wave forms.

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

      postmaster = require("postmaster")()

      # TODO: Broadcast saved file to parent
