// server.js
// where your node app starts
// init project
const express = require('express')
const app = express()
const fs = require('fs')
const path = require('path')
// we've started you off with Express,
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'))

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', function (request, response) {
  response.sendFile(path.join(__dirname, '/views/instructions.html'))
})
app.get('/draw.js', function (request, response) {
  response.sendFile(path.join(__dirname, '/draw.js'))
})
app.get('/nextValue.js', function (request, response) {
  response.sendFile(path.join(__dirname, '/nextValue.js'))
})
app.get('/main', function (request, response) {
  response.sendFile(path.join(__dirname, '/views/index.html'))
})
app.get('/getDropdown', function (request, response) {
  console.log('yo whats up')
  saves(request, response)
})
app.get('/load', function (request, response) {
  handleLoad(request, response)
})
app.post('/save', function (request, response) {
  handleSave(request, response)
})

// listen for requests :)
const listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port)
})

const handleSave = function (request, response) {
  let dataString = ''
  request.on('data', function (data) {
    dataString += data
  })
  request.on('end', function () {
    fs.readFile('public/data.json', function (err, content) {
      if (err === null) {
        const newData = JSON.parse(dataString)
        console.log(content)
        const data = JSON.parse(content)
        data[newData.name] = newData
        const fs = require('fs')
        fs.writeFile('public/data.json', JSON.stringify(data), (err) => {
          if (err) throw err
        })
        response.writeHead(200, 'OK', { 'Content-Type': 'text/plain' })
        response.end()
      } else {
        response.writeHeader(404)
        response.end('404 Error: File Not Found')
      }
    })
  })
}
const handleLoad = function (request, response) {
  request.on('data', function (data) {
  })
  request.on('end', function () {
    fs.readFile('public/data.json', function (err, content) {
      if (err === null) {
        const data = JSON.parse(content)
        const res = data[request.query.name]
        response.writeHead(200, { 'Content-Type': 'application/html' })
        response.end(JSON.stringify(res))
      } else {
        response.writeHeader(404)
        response.end('404 Error: File Not Found')
      }
    })
  })
}
const saves = function (request, response) {
  fs.readFile('public/data.json', function (err, content) {
    if (err === null) {
      const data = JSON.parse(content)
      console.log(data)
      let res = ''
      for (var prop in data) {
        const name = data[prop].name
        res += "<option value='" + name + "'>" + name + '</option>'
      }
      response.writeHead(200, { 'Content-Type': 'text/html' })
      response.end(res)
    } else {
      // file not found, error code 404
      response.writeHeader(404)
      response.end('404 Error: File Not Found')
    }
  })
}
