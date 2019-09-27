const displayScores = function( data ) {
  const template = '<tr><td>{name}</td><td>{score}</td></tr>'
  const row = template.replace("{name}", data.name).replace("{score}", data.score)
  const tbody = document.querySelector("#all-scores")
  tbody.innerHTML += row
}

//displayData for the scoring table
const displayData = function ( data ) {
  document.querySelector("#all-scores").innerHTML = ""
  for (let i = 0; i < data.length; i++) {
  const data1 = data[i]
  displayScores(data1)
  }
}

// Fetch the appdata and then call the display functions
const loadData = function( e ) {
  fetch( '/scoreData', {
    method:'GET',
  })
  .then( function( response ) {
    response.json().then(displayData)
    console.log(response)
  })
}

//add Score
const addScore = function(e) {
     
    const newScore = {
      name: document.getElementById( 'name' ).value,
      score: document.getElementById( 'score' ).value
    };

    const body = JSON.stringify( newScore );
    fetch( '/addScore', {
      method:'POST',
      body
    }).then( function( response ) {
      console.log(response)
      loadData();
      })
    loadData();
    document.getElementById( 'name' ).value = ''
    document.getElementById( 'score' ).value = ''
    return false;
  }

//play again cause it was so fun
const again = function(e){
      fetch( '/', {
        method:'GET',
      }).then( function( response ) {
        window.location.href = response.url
      })
      return false;
    }
    
    //window.onload function
  window.onload = function() {
    
    const addButton = document.getElementById( 'sbt-score' )
    addButton.onclick = addScore
    
    const playAgain = document.getElementById( 'again' )
    playAgain.onclick = again
    
    loadData()
  }
