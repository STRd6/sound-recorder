Audio Viz
=========

    module.exports = (analyser) ->
      frequencyDomain = new Uint8Array(analyser.frequencyBinCount)
      timeDomain = new Uint8Array(analyser.frequencyBinCount)

      draw: (canvas) ->
        canvas.fill "black"

        analyser.getByteFrequencyData(frequencyDomain)
        analyser.getByteTimeDomainData(timeDomain)

        # Draw waveforms or frequency spectrum
        ratio = canvas.height() / 255
        Array::forEach.call frequencyDomain, (value, index) ->
          canvas.drawRect
            x: index
            y: ratio * (255 - value)
            width: 1
            height: ratio * value
            color: "blue"

        Array::forEach.call timeDomain, (value, index) ->
          canvas.drawCircle
            x: index
            y: ratio * (255 - value)
            radius: 1
            color: "red"
