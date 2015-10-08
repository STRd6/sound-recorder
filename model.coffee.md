Recorder Model
==============

    Recorder = require "./lib/recorder"
    saveAs = require "./lib/file_saver"

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

          self.asBlob()
          .then (blob) ->
            if name = prompt "Filename", "untitled.wav"
              saveAs blob, name

        asBlob: ->
          new Promise (resolve, reject) ->
            recorder.exportWAV resolve

      self.recording.observe (newValue) ->
        if newValue
          recorder.record()
        else
          recorder.stop()

      return self
