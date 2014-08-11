Recorder Model
==============

    Recorder = require "./lib/recorder"
    saveAs = require "./lib/file_saver"
    S3Trinket = require "s3-trinket"

    if localStorage.TRINKET_POLICY
      trinket = S3Trinket(JSON.parse(localStorage.TRINKET_POLICY))

    module.exports = ({input, notifications}) ->
      recorder = new Recorder(input)

      player = document.createElement "audio"

      self =
        recordingClass: ->
          if self.recording()
            "recording"

        recording: Observable false
        play: ->
          self.recording false
          recorder.exportWAV (blob) ->
            player.src = URL.createObjectURL(blob)
            player.play()

        record: ->
          self.recording !self.recording()
          recorder.clear() if self.recording()
        stop: ->
          self.recording false
        save: ->
          self.recording false

          notifications.push "Saving..."

          recorder.exportWAV (blob) ->
            if trinket
              trinket.post(blob).then (key) ->
                notifications.notify "Saved as #{key}"
            else if name = prompt "Filename", "untitled.wav"
              saveAs blob, name

      self.recording.observe (newValue) ->
        if newValue
          recorder.record()
        else
          recorder.stop()

      return self
