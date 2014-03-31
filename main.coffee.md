Sound Recorder
==============

    global.Observable = require "observable"

    getUserMedia = require "./lib/get_user_media"
    AudioContext = window.AudioContext or window.webkitAudioContext
    Model = require("./model")
    Viz = require "./lib/viz"

    {applyStylesheet} = require "./lib/util"
    applyStylesheet require "./style"

    createAudio = (stream) ->
      context = new AudioContext
      microphone = context.createMediaStreamSource(stream)

      # Output the audio, remember to use headphones or studio monitors!
      microphone.connect(context.destination)

      model = Model
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

    createVideo = (stream) ->
      video = document.createElement("video")
      video.autoplay = true
      document.body.appendChild video
      video.src = window.URL.createObjectURL(stream)

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
