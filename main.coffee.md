Sound Recorder
==============

    getUserMedia = require "./lib/get_user_media"

    if PACKAGE.name is "ROOT"
      video = document.createElement("video")
      video.autoplay = true
      document.body.appendChild video

      success = (localMediaStream) ->
        video.src = window.URL.createObjectURL(localMediaStream)
      error = ->
        console.log arguments
      getUserMedia({audio: true, video: true}, success, error)
