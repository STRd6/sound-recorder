Sound Recorder
==============

    getUserMedia = require "./lib/get_user_media"
    AudioContext = window.AudioContext or window.webkitAudioContext
    Recorder = require "./lib/recorder"
    saveAs = require "./lib/file_saver"

    createAudio = (stream) ->
      context = new AudioContext
      microphone = context.createMediaStreamSource(stream)

      recorder = new Recorder(microphone)
      recorder.record()

      setTimeout ->
        recorder.stop()
        recorder.exportWAV (blob) ->
          saveAs blob, "duder.wav"
      , 2000

      microphone.connect(context.destination)

    createVideo = (stream) ->
      video = document.createElement("video")
      video.autoplay = true
      document.body.appendChild video
      video.src = window.URL.createObjectURL(stream)

    if PACKAGE.name is "ROOT"
      error = ->
        console.log arguments
      getUserMedia({audio: true, video: true}, createAudio, error)
