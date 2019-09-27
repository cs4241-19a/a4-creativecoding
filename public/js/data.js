
// global data to hold earthquake data
var earthquakeData = []

// get earthquake data from server
const getQuakeData = function () {
  fetch('/earthquakes', {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
  })
    .then(response => response.json())
    .then(data => {
      console.log('Data from server: ')
      console.log(data)
      // clear out earthquake data
      earthquakeData = []

      parseQuakeData(data)
      console.log(earthquakeData)   
    })
    .catch(err => {
      console.log(err)
    })
}

const parseQuakeData = function (data) {
  for (var i = 0; i < data.length; i++) {
    var currObj = data[i]
    var obj = { mag: currObj.mag,
      state: currObj.state, 
      place: currObj.place, 
      time: currObj.time,
      updated: currObj.updated,
      url: currObj.url,
      detail: currObj.detail, 
      type: currObj.type,
      title: currObj.title, 
      coordinates: currObj.coordinates,
      id: currObj.id
    }

    // add to global array
    earthquakeData.push(obj)
  }
}
export {getQuakeData, earthquakeData }