Recorder Model
==============

    Recorder = require "./lib/recorder"
    saveAs = require "./lib/file_saver"

    module.exports = ({input}) ->
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

          if name = prompt "Filename", "untitled.wav"
            recorder.exportWAV (blob) ->
              saveAs blob, name

      self.recording.observe (newValue) ->
        if newValue
          recorder.record()
        else
          recorder.stop()

      return self
