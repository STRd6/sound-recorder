window["distri/sound-recorder:master"]({
  "source": {
    "LICENSE": {
      "path": "LICENSE",
      "mode": "100644",
      "content": "The MIT License (MIT)\n\nCopyright (c) 2014 \n\nPermission is hereby granted, free of charge, to any person obtaining a copy\nof this software and associated documentation files (the \"Software\"), to deal\nin the Software without restriction, including without limitation the rights\nto use, copy, modify, merge, publish, distribute, sublicense, and/or sell\ncopies of the Software, and to permit persons to whom the Software is\nfurnished to do so, subject to the following conditions:\n\nThe above copyright notice and this permission notice shall be included in all\ncopies or substantial portions of the Software.\n\nTHE SOFTWARE IS PROVIDED \"AS IS\", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR\nIMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,\nFITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE\nAUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER\nLIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,\nOUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE\nSOFTWARE.",
      "type": "blob"
    },
    "README.md": {
      "path": "README.md",
      "mode": "100644",
      "content": "sound-recorder\n==============\n\nRecord sounds\n",
      "type": "blob"
    },
    "main.coffee.md": {
      "path": "main.coffee.md",
      "mode": "100644",
      "content": "Sound Recorder\n==============\n\n    getUserMedia = require \"./lib/get_user_media\"\n\n    if PACKAGE.name is \"ROOT\"\n      video = document.createElement(\"video\")\n      video.autoplay = true\n      document.body.appendChild video\n\n      success = (localMediaStream) ->\n        video.src = window.URL.createObjectURL(localMediaStream)\n      error = ->\n        console.log arguments\n      getUserMedia({audio: true, video: true}, success, error)\n",
      "type": "blob"
    },
    "template.haml": {
      "path": "template.haml",
      "mode": "100644",
      "content": "%input(type=\"file\" accept=\"image/*;capture=camera\")\n",
      "type": "blob"
    },
    "lib/get_user_media.coffee.md": {
      "path": "lib/get_user_media.coffee.md",
      "mode": "100644",
      "content": "Get User Media Polyfill\n=======================\n\n    getUserMedia = navigator.getUserMedia or navigator.mozGetUserMedia or navigator.webkitGetUserMedia\n\n    if getUserMedia\n      getUserMedia = getUserMedia.bind(navigator)\n\n    module.exports = getUserMedia\n",
      "type": "blob"
    }
  },
  "distribution": {
    "main": {
      "path": "main",
      "content": "(function() {\n  var error, getUserMedia, success, video;\n\n  getUserMedia = require(\"./lib/get_user_media\");\n\n  if (PACKAGE.name === \"ROOT\") {\n    video = document.createElement(\"video\");\n    video.autoplay = true;\n    document.body.appendChild(video);\n    success = function(localMediaStream) {\n      return video.src = window.URL.createObjectURL(localMediaStream);\n    };\n    error = function() {\n      return console.log(arguments);\n    };\n    getUserMedia({\n      audio: true,\n      video: true\n    }, success, error);\n  }\n\n}).call(this);\n",
      "type": "blob"
    },
    "template": {
      "path": "template",
      "content": "Runtime = require(\"/_lib/hamljr_runtime\");\n\nmodule.exports = (function(data) {\n  return (function() {\n    var __runtime;\n    __runtime = Runtime(this);\n    __runtime.push(document.createDocumentFragment());\n    __runtime.push(document.createElement(\"input\"));\n    __runtime.attribute(\"type\", \"file\");\n    __runtime.attribute(\"accept\", \"image/*;capture=camera\");\n    __runtime.pop();\n    return __runtime.pop();\n  }).call(data);\n});\n",
      "type": "blob"
    },
    "lib/get_user_media": {
      "path": "lib/get_user_media",
      "content": "(function() {\n  var getUserMedia;\n\n  getUserMedia = navigator.getUserMedia || navigator.mozGetUserMedia || navigator.webkitGetUserMedia;\n\n  if (getUserMedia) {\n    getUserMedia = getUserMedia.bind(navigator);\n  }\n\n  module.exports = getUserMedia;\n\n}).call(this);\n",
      "type": "blob"
    },
    "_lib/hamljr_runtime": {
      "path": "_lib/hamljr_runtime",
      "content": "(function() {\n  var Runtime, dataName, document,\n    __slice = [].slice;\n\n  dataName = \"__hamlJR_data\";\n\n  if (typeof window !== \"undefined\" && window !== null) {\n    document = window.document;\n  } else {\n    document = global.document;\n  }\n\n  Runtime = function(context) {\n    var append, bindObservable, classes, id, lastParent, observeAttribute, observeText, pop, push, render, stack, top;\n    stack = [];\n    lastParent = function() {\n      var element, i;\n      i = stack.length - 1;\n      while ((element = stack[i]) && element.nodeType === 11) {\n        i -= 1;\n      }\n      return element;\n    };\n    top = function() {\n      return stack[stack.length - 1];\n    };\n    append = function(child) {\n      var _ref;\n      if ((_ref = top()) != null) {\n        _ref.appendChild(child);\n      }\n      return child;\n    };\n    push = function(child) {\n      return stack.push(child);\n    };\n    pop = function() {\n      return append(stack.pop());\n    };\n    render = function(child) {\n      push(child);\n      return pop();\n    };\n    bindObservable = function(element, value, update) {\n      var observable, unobserve;\n      if (typeof Observable === \"undefined\" || Observable === null) {\n        update(value);\n        return;\n      }\n      observable = Observable(value);\n      observable.observe(update);\n      update(observable());\n      unobserve = function() {\n        return observable.stopObserving(update);\n      };\n      element.addEventListener(\"DOMNodeRemoved\", unobserve, true);\n      return element;\n    };\n    id = function() {\n      var element, sources, update, value;\n      sources = 1 <= arguments.length ? __slice.call(arguments, 0) : [];\n      element = top();\n      update = function(newValue) {\n        if (typeof newValue === \"function\") {\n          newValue = newValue();\n        }\n        return element.id = newValue;\n      };\n      value = function() {\n        var possibleValues;\n        possibleValues = sources.map(function(source) {\n          if (typeof source === \"function\") {\n            return source();\n          } else {\n            return source;\n          }\n        }).filter(function(idValue) {\n          return idValue != null;\n        });\n        return possibleValues[possibleValues.length - 1];\n      };\n      return bindObservable(element, value, update);\n    };\n    classes = function() {\n      var element, sources, update, value;\n      sources = 1 <= arguments.length ? __slice.call(arguments, 0) : [];\n      element = top();\n      update = function(newValue) {\n        if (typeof newValue === \"function\") {\n          newValue = newValue();\n        }\n        return element.className = newValue;\n      };\n      value = function() {\n        var possibleValues;\n        possibleValues = sources.map(function(source) {\n          if (typeof source === \"function\") {\n            return source();\n          } else {\n            return source;\n          }\n        }).filter(function(sourceValue) {\n          return sourceValue != null;\n        });\n        return possibleValues.join(\" \");\n      };\n      return bindObservable(element, value, update);\n    };\n    observeAttribute = function(name, value) {\n      var element, update;\n      element = top();\n      update = function(newValue) {\n        return element.setAttribute(name, newValue);\n      };\n      return bindObservable(element, value, update);\n    };\n    observeText = function(value) {\n      var element, update;\n      switch (value != null ? value.nodeType : void 0) {\n        case 1:\n        case 3:\n        case 11:\n          render(value);\n          return;\n      }\n      element = document.createTextNode('');\n      update = function(newValue) {\n        return element.nodeValue = newValue;\n      };\n      bindObservable(element, value, update);\n      return render(element);\n    };\n    return {\n      push: push,\n      pop: pop,\n      id: id,\n      classes: classes,\n      attribute: observeAttribute,\n      text: observeText,\n      filter: function(name, content) {},\n      each: function(items, fn) {\n        var elements, parent, replace;\n        items = Observable(items);\n        elements = [];\n        parent = lastParent();\n        items.observe(function(newItems) {\n          return replace(elements, newItems);\n        });\n        replace = function(oldElements, items) {\n          var firstElement;\n          if (oldElements) {\n            firstElement = oldElements[0];\n            parent = (firstElement != null ? firstElement.parentElement : void 0) || parent;\n            elements = items.map(function(item, index, array) {\n              var element;\n              element = fn.call(item, item, index, array);\n              element[dataName] = item;\n              parent.insertBefore(element, firstElement);\n              return element;\n            });\n            return oldElements.each(function(element) {\n              return element.remove();\n            });\n          } else {\n            return elements = items.map(function(item, index, array) {\n              var element;\n              element = fn.call(item, item, index, array);\n              element[dataName] = item;\n              return element;\n            });\n          }\n        };\n        return replace(null, items);\n      },\n      \"with\": function(item, fn) {\n        var element, replace, value;\n        element = null;\n        item = Observable(item);\n        item.observe(function(newValue) {\n          return replace(element, newValue);\n        });\n        value = item();\n        replace = function(oldElement, value) {\n          var parent;\n          element = fn.call(value);\n          element[dataName] = item;\n          if (oldElement) {\n            parent = oldElement.parentElement;\n            parent.insertBefore(element, oldElement);\n            return oldElement.remove();\n          } else {\n\n          }\n        };\n        return replace(element, value);\n      },\n      on: function(eventName, fn) {\n        var element;\n        element = lastParent();\n        if (eventName === \"change\") {\n          switch (element.nodeName) {\n            case \"SELECT\":\n              element[\"on\" + eventName] = function() {\n                var selectedOption;\n                selectedOption = this.options[this.selectedIndex];\n                return fn(selectedOption[dataName]);\n              };\n              if (fn.observe) {\n                return fn.observe(function(newValue) {\n                  return Array.prototype.forEach.call(element.options, function(option, index) {\n                    if (option[dataName] === newValue) {\n                      return element.selectedIndex = index;\n                    }\n                  });\n                });\n              }\n              break;\n            default:\n              element[\"on\" + eventName] = function() {\n                return fn(element.value);\n              };\n              if (fn.observe) {\n                return fn.observe(function(newValue) {\n                  return element.value = newValue;\n                });\n              }\n          }\n        } else {\n          return element[\"on\" + eventName] = function(event) {\n            return fn.call(context, event);\n          };\n        }\n      }\n    };\n  };\n\n  module.exports = Runtime;\n\n}).call(this);\n\n//# sourceURL=runtime.coffee",
      "type": "blob"
    }
  },
  "progenitor": {
    "url": "http://strd6.github.io/editor/"
  },
  "entryPoint": "main",
  "repository": {
    "id": 18270459,
    "name": "sound-recorder",
    "full_name": "distri/sound-recorder",
    "owner": {
      "login": "distri",
      "id": 6005125,
      "avatar_url": "https://avatars.githubusercontent.com/u/6005125?",
      "gravatar_id": "192f3f168409e79c42107f081139d9f3",
      "url": "https://api.github.com/users/distri",
      "html_url": "https://github.com/distri",
      "followers_url": "https://api.github.com/users/distri/followers",
      "following_url": "https://api.github.com/users/distri/following{/other_user}",
      "gists_url": "https://api.github.com/users/distri/gists{/gist_id}",
      "starred_url": "https://api.github.com/users/distri/starred{/owner}{/repo}",
      "subscriptions_url": "https://api.github.com/users/distri/subscriptions",
      "organizations_url": "https://api.github.com/users/distri/orgs",
      "repos_url": "https://api.github.com/users/distri/repos",
      "events_url": "https://api.github.com/users/distri/events{/privacy}",
      "received_events_url": "https://api.github.com/users/distri/received_events",
      "type": "Organization",
      "site_admin": false
    },
    "private": false,
    "html_url": "https://github.com/distri/sound-recorder",
    "description": "Record sounds",
    "fork": false,
    "url": "https://api.github.com/repos/distri/sound-recorder",
    "forks_url": "https://api.github.com/repos/distri/sound-recorder/forks",
    "keys_url": "https://api.github.com/repos/distri/sound-recorder/keys{/key_id}",
    "collaborators_url": "https://api.github.com/repos/distri/sound-recorder/collaborators{/collaborator}",
    "teams_url": "https://api.github.com/repos/distri/sound-recorder/teams",
    "hooks_url": "https://api.github.com/repos/distri/sound-recorder/hooks",
    "issue_events_url": "https://api.github.com/repos/distri/sound-recorder/issues/events{/number}",
    "events_url": "https://api.github.com/repos/distri/sound-recorder/events",
    "assignees_url": "https://api.github.com/repos/distri/sound-recorder/assignees{/user}",
    "branches_url": "https://api.github.com/repos/distri/sound-recorder/branches{/branch}",
    "tags_url": "https://api.github.com/repos/distri/sound-recorder/tags",
    "blobs_url": "https://api.github.com/repos/distri/sound-recorder/git/blobs{/sha}",
    "git_tags_url": "https://api.github.com/repos/distri/sound-recorder/git/tags{/sha}",
    "git_refs_url": "https://api.github.com/repos/distri/sound-recorder/git/refs{/sha}",
    "trees_url": "https://api.github.com/repos/distri/sound-recorder/git/trees{/sha}",
    "statuses_url": "https://api.github.com/repos/distri/sound-recorder/statuses/{sha}",
    "languages_url": "https://api.github.com/repos/distri/sound-recorder/languages",
    "stargazers_url": "https://api.github.com/repos/distri/sound-recorder/stargazers",
    "contributors_url": "https://api.github.com/repos/distri/sound-recorder/contributors",
    "subscribers_url": "https://api.github.com/repos/distri/sound-recorder/subscribers",
    "subscription_url": "https://api.github.com/repos/distri/sound-recorder/subscription",
    "commits_url": "https://api.github.com/repos/distri/sound-recorder/commits{/sha}",
    "git_commits_url": "https://api.github.com/repos/distri/sound-recorder/git/commits{/sha}",
    "comments_url": "https://api.github.com/repos/distri/sound-recorder/comments{/number}",
    "issue_comment_url": "https://api.github.com/repos/distri/sound-recorder/issues/comments/{number}",
    "contents_url": "https://api.github.com/repos/distri/sound-recorder/contents/{+path}",
    "compare_url": "https://api.github.com/repos/distri/sound-recorder/compare/{base}...{head}",
    "merges_url": "https://api.github.com/repos/distri/sound-recorder/merges",
    "archive_url": "https://api.github.com/repos/distri/sound-recorder/{archive_format}{/ref}",
    "downloads_url": "https://api.github.com/repos/distri/sound-recorder/downloads",
    "issues_url": "https://api.github.com/repos/distri/sound-recorder/issues{/number}",
    "pulls_url": "https://api.github.com/repos/distri/sound-recorder/pulls{/number}",
    "milestones_url": "https://api.github.com/repos/distri/sound-recorder/milestones{/number}",
    "notifications_url": "https://api.github.com/repos/distri/sound-recorder/notifications{?since,all,participating}",
    "labels_url": "https://api.github.com/repos/distri/sound-recorder/labels{/name}",
    "releases_url": "https://api.github.com/repos/distri/sound-recorder/releases{/id}",
    "created_at": "2014-03-30T18:27:04Z",
    "updated_at": "2014-03-30T18:27:04Z",
    "pushed_at": "2014-03-30T18:27:04Z",
    "git_url": "git://github.com/distri/sound-recorder.git",
    "ssh_url": "git@github.com:distri/sound-recorder.git",
    "clone_url": "https://github.com/distri/sound-recorder.git",
    "svn_url": "https://github.com/distri/sound-recorder",
    "homepage": null,
    "size": 0,
    "stargazers_count": 0,
    "watchers_count": 0,
    "language": null,
    "has_issues": true,
    "has_downloads": true,
    "has_wiki": true,
    "forks_count": 0,
    "mirror_url": null,
    "open_issues_count": 0,
    "forks": 0,
    "open_issues": 0,
    "watchers": 0,
    "default_branch": "master",
    "master_branch": "master",
    "permissions": {
      "admin": true,
      "push": true,
      "pull": true
    },
    "organization": {
      "login": "distri",
      "id": 6005125,
      "avatar_url": "https://avatars.githubusercontent.com/u/6005125?",
      "gravatar_id": "192f3f168409e79c42107f081139d9f3",
      "url": "https://api.github.com/users/distri",
      "html_url": "https://github.com/distri",
      "followers_url": "https://api.github.com/users/distri/followers",
      "following_url": "https://api.github.com/users/distri/following{/other_user}",
      "gists_url": "https://api.github.com/users/distri/gists{/gist_id}",
      "starred_url": "https://api.github.com/users/distri/starred{/owner}{/repo}",
      "subscriptions_url": "https://api.github.com/users/distri/subscriptions",
      "organizations_url": "https://api.github.com/users/distri/orgs",
      "repos_url": "https://api.github.com/users/distri/repos",
      "events_url": "https://api.github.com/users/distri/events{/privacy}",
      "received_events_url": "https://api.github.com/users/distri/received_events",
      "type": "Organization",
      "site_admin": false
    },
    "network_count": 0,
    "subscribers_count": 2,
    "branch": "master",
    "publishBranch": "gh-pages"
  },
  "dependencies": {}
});