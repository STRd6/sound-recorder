Sound Recorder
==============

    getUserMedia = require "./lib/get_user_media"
    AudioContext = window.AudioContext or window.webkitAudioContext
    Recorder = require "./lib/recorder"
    saveAs = require "./lib/file_saver"
    Viz = require "./lib/viz"

    {applyStylesheet} = require "./lib/util"
    applyStylesheet require "./style"

    createAudio = (stream) ->
      context = new AudioContext
      microphone = context.createMediaStreamSource(stream)

      canvas = createCanvas()

      recorder = new Recorder(microphone)
      recorder.record()

      setTimeout ->
        recorder.stop()
        recorder.exportWAV (blob) ->
          saveAs blob, "duder.wav"
      , 10000

      microphone.connect(context.destination)

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

    if PACKAGE.name is "ROOT"
      error = ->
        console.log arguments
      getUserMedia({audio: true, video: true}, createAudio, error)
