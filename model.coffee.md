Recorder Model
==============

    Recorder = require "./lib/recorder"
    saveAs = require "./lib/file_saver"

    module.exports = ({input}) ->
      recorder = new Recorder(input)

      self =
        recordingClass: ->
          if self.recording()
            "recording"

        recording: Observable false
        play: ->
          console.log "Play"
          # TODO: Play back recorded sound
        record: ->
          self.recording !self.recording()
        stop: ->
          self.recording false
        save: ->
          self.recording false

          if name = prompt "Filename", "untitled.wav"
            recorder.exportWAV (blob) ->
              saveAs blob, name

      self.recording.observe (newValue) ->
        if newValue
          recorder.record()
        else
          recorder.stop()

      return self
