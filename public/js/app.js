import { stats, gui, xhr, fr, clock } from '../modules/setup.js'
import { scene, render, camera, orbitControls, METERNUM } from '../modules/scene.js'
import { controls } from '../modules/gui.js'
let appName = '3D Audio Visualizer'
let file
let fileName
let audioContext
let source
let animationId
let status = 0 //flag to indicate the audio is playing or stoed
let processing = false //detect if there's a file is under processing, if so refuse to handle new files
let forceStop = false //the audio is stoped by a new file or normally end
let url = 'materials/test.mp3'
let url2 = 'materials/test2.mp3'
let url3 = 'materials/test3.mp3'
let infoContainer = document.getElementById('logger')
let statsContainer = document.getElementById('stats')

window.onload = function () {
    instruction()
    init()
    document.getElementById('play1').onclick = function () {
        loadDefaultAndPlay(url)
    }
    document.getElementById('play2').onclick = function () {
        loadDefaultAndPlay(url2)
    }
    document.getElementById('play3').onclick = function () {
        loadDefaultAndPlay(url3)
    }
}

const instruction = function () {
    swal({
        title: 'Hello Stranger!',
        text: 'What to visualize your audio on a marble table? Right on!\n\n' +
            'You can:\n-- play default audio (Green Buttons)\n' +
            '-- Upload your soundstrack (Choose Files)\n' +
            '-- Configure the display in the GUI (Up Right Corner)\n' +
            '-- Check webpage states (Down Left Corner)\n' +
            '-- More info / check out my GitHub (Nav Bar Icons)..',
        button: true
    })
},
    init = function () { //prepare the audio and the scene
        //fix the browser vendor
        window.requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame
        window.cancelAnimationFrame = window.cancelAnimationFrame || window.webkitCancelAnimationFrame || window.mozCancelAnimationFrame
        window.AudioContext = window.AudioContext || window.webkitAudioContext || window.mozAudioContext
        //audioContext exception handle
        try {
            audioContext = new AudioContext()
        } catch (e) {
            infoContainer.textContent = 'ERROR: audio context cannot be setup.'
        }
        _handleDragDrop()
        _initStats(statsContainer)
        _prepareScene()
        _initGui()
        _pause()
    },
    _initStats = function (statsContainer) {
        statsContainer.appendChild(stats.domElement)
    },
    _initGui = function () {
        // ========== GUI ==========
        var folder = gui.addFolder('COLORS')
        //GUI: Camera postions
        gui.add(controls, 'positionX', 0, 110).onChange(function (e) { camera.position.x = e })
        gui.add(controls, 'positionY', 0, 110).onChange(function (e) { camera.position.y = e })
        gui.add(controls, 'positionZ', 0, 110).onChange(function (e) { camera.position.z = e })
        //GUI: cap drop lag
        gui.add(controls, 'dropLag', 0.0, 0.5)
        //GUI: rotation
        gui.add(controls, 'autoRotate').onChange(function (e) { orbitControls.autoRotate = e })
        //GUI folder: bar color
        folder.addColor(controls, 'barColor').onChange(function (e) {
            scene.children.forEach(function (child) {
                if (child.name.indexOf('cube') > -1) {
                    child.material.color.setStyle(e)
                    child.material.ambient = new THREE.Color(e)
                    //   child.material.emissive = new THREE.Color(0x7a7a7a)
                    child.material.needsUpdate = true
                }
            })
        })
        //GUI folder: barEmissive color
        folder.addColor(controls, 'barEmissive').onChange(function (e) {
            scene.children.forEach(function (child) {
                if (child.name.indexOf('cube') > -1) {
                    // child.material.ambient = new THREE.Color(e)
                    child.material.emissive = new THREE.Color(e) //new THREE.Color(e)
                    child.material.needsUpdate = true
                }
            })
        })
        //GUI folder: cap color
        folder.addColor(controls, 'capColor').onChange(function (e) {
            scene.children.forEach(function (child) {
                if (child.name.indexOf('cap') > -1) {
                    child.material.color.setStyle(e)
                    child.material.ambient = new THREE.Color(e)
                    // child.material.emissive = new THREE.Color(0x848484)
                    child.material.needsUpdate = true
                }
            })
        })
        //GUI folder: capEmissive color
        folder.addColor(controls, 'capEmissive').onChange(function (e) {
            scene.children.forEach(function (child) {
                if (child.name.indexOf('cap') > -1) {
                    // child.material.ambient = new THREE.Color(e)
                    child.material.emissive = new THREE.Color(e) //new THREE.Color(e)
                    child.material.needsUpdate = true
                }
            })
        })
        folder.open()
    },
    _handleDragDrop = function () {
        /* Credit to @wayou */
        // ========== OPTIONAL: ADD FILES ==========
        var dropContainer = document.body,
            uploadBtn = document.getElementById('upload')
        //listen the file upload
        uploadBtn.onchange = function () {
            if (!audioContext || processing) {
                return
            }
            if (uploadBtn.files.length !== 0) {
                processing = true
                infoContainer.textContent = 'uploading...'
                file = uploadBtn.files[0]
                fileName = file.name
                _readFile(file)
                uploadBtn.value = ''//fix for chrome: when uploading the same file this onchange event wont trigger
            }
        }
        //handle drag and drop
        dropContainer.addEventListener("dragenter", function () {
            if (processing) {
                return
            }
            infoContainer.textContent = 'drop it to the page...'
        }, false)
        dropContainer.addEventListener("dragover", function (e) {
            e.stopPropagation()
            e.preventDefault()
            e.dataTransfer.dropEffect = 'copy'
        }, false)
        dropContainer.addEventListener("dragleave", function () {
            if (status) {
                infoContainer.textContent = 'playing ' + fileName
            } else {
                infoContainer.textContent = appName
            }
        }, false)
        dropContainer.addEventListener("drop", function (e) {
            e.stopPropagation()
            e.preventDefault()
            if (!audioContext || processing) {
                console.log('there is a file under processing, please wait')
                return
            }
            processing = true
            infoContainer.textContent = 'uploading...'
            //get the dropped file
            file = e.dataTransfer.files[0]
            fileName = file.name
            _readFile(e.dataTransfer.files[0])
        }, false)
    },
    loadDefaultAndPlay = function (url) {
        if (!audioContext) {
            processing = false
            infoContainer.textContent = 'audio context is not supported :('
            return
        }
        if (processing) {
            processing = false
            console.log('there is a file under processing, please wait')
            return
        }
        fileName = url
        /* Credit to @wayou */
        xhr.open('GET', url, true)
        xhr.responseType = "arraybuffer"
        xhr.onload = function () {
            infoContainer.textContent = 'load success, start next process...'
            var result = xhr.response
            play(result)
        }
        xhr.onerror = xhr.onabord = function () {
            processing = false
            infoContainer.textContent = 'fail to load the audio :('
        }
        infoContainer.textContent = 'loading the audio...'
        processing = true
        xhr.send()
    },
    _readFile = function (file) {
        fr.onload = function (e) {
            var fileResult = e.target.result
            if (!audioContext) {
                return
            }
            play(fileResult)
        }
        fr.onerror = function (e) {
            processing = false
            infoContainer.textContent = '!Fail to read'
        }
        infoContainer.textContent = 'Starting read the file'
        fr.readAsArrayBuffer(file)
    },
    _pause = function () {
        var susresBtn = document.getElementById('pause'),
            stopBtn = document.getElementById('stop')
        if (!audioContext) {
            return
        }
        stopBtn.onclick = function () {
            audioContext.close().then(function () {
                infoContainer.textContent = "music stopped."
                try {
                    audioContext = new AudioContext()
                } catch (e) {
                    infoContainer.textContent = 'audio context is not supported :('
                }
            })
        }
        susresBtn.onclick = function () {
            if (audioContext.state === 'running') {
                audioContext.suspend().then(function () {
                    infoContainer.textContent = "music paused."
                    susresBtn.textContent = 'Resume'
                })
            } else if (audioContext.state === 'suspended') {
                audioContext.resume().then(function () {
                    infoContainer.textContent = "music resumed."
                    susresBtn.textContent = 'Pause'
                })
            }
        }
    },    
    play = function (audio) {
        // ========== LOAD MUSIC ==========
        infoContainer.textContent = 'Decoding the audio...'
        audioContext.decodeAudioData(audio, function (buffer) {
            infoContainer.textContent = 'Decode succussfully,start the visualizer'
            _visualize(buffer)
        }, function (e) {
            processing = false
            infoContainer.textContent = '!Fail to decode'
        })
    },
    _visualize = function (buffer) {
        var audioBufferSouceNode = audioContext.createBufferSource(),
            analyser = audioContext.createAnalyser()
        audioBufferSouceNode.connect(analyser)
        analyser.connect(audioContext.destination)
        audioBufferSouceNode.buffer = buffer
        if (source) {
            if (status != 0) {
                forceStop = true
                source.stop(0)
            }
        }
        source = audioBufferSouceNode
        audioBufferSouceNode.start(0)
        status = 1
        processing = false
        source.onended = function () {
            _audioEnd()
        }
        infoContainer.textContent = 'playing ' + fileName
        if (animationId) {
            cancelAnimationFrame(animationId)
        }
        _drawVisualizer(scene, render, camera, analyser)
    },
    _audioEnd = function () {
        if (forceStop) {
            forceStop = false
            return
        } else {
            forceStop = false
            status = 0
            infoContainer.textContent = appName
        }
    },
    _prepareScene = function () {
        // ========== OUTPUT ==========
        document.getElementById('visualizer_container').appendChild(render.domElement)
        render.render(scene, camera)
        _drawVisualizer(scene, render, camera)
    },
    _drawVisualizer = function (scene, render, camera, analyser) {
        var renderAnimation = function () {
            stats.update()
            var delta = clock.getDelta()
            orbitControls.update(delta)
            if (analyser) {
                var array = new Uint8Array(analyser.frequencyBinCount)
                analyser.getByteFrequencyData(array)
                var step = Math.round(array.length / METERNUM)
                // update height of bar and cap
                for (var i = 0; i < METERNUM; i++) {
                    var value = array[i * step] / 4
                    value = value < 1 ? 1 : value
                    var bar = scene.getObjectByName('cube' + i, true),
                        cap = scene.getObjectByName('cap' + i, true)
                    bar.scale.y = value
                    bar.geometry.computeBoundingBox()
                    let height = ((bar.geometry.boundingBox.max.y - bar.geometry.boundingBox.min.y) * value) / 2
                    if (height > cap.position.y) {
                        cap.position.y = (height - 0.5) > 0 ? (height - 0.5) : 0.5
                    } else {
                        cap.position.y -= 0.51 - controls.dropLag
                    }
                }
            }
            render.render(scene, camera)
            animationId = requestAnimationFrame(renderAnimation)
        }
        animationId = requestAnimationFrame(renderAnimation)
    }
