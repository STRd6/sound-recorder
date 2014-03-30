Get User Media Polyfill
=======================

    getUserMedia = navigator.getUserMedia or navigator.mozGetUserMedia or navigator.webkitGetUserMedia

    if getUserMedia
      getUserMedia = getUserMedia.bind(navigator)

    module.exports = getUserMedia
