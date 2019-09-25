// Add some Javascript code here, to run on the front end.

console.log("Welcome to assignment 3!")

const addToCart = function(chz){
  console.log('attempting addToCart')
  let body=JSON.stringify({ cheese: chz})

  fetch( '/addToCart', {
    method:'POST',
    body,
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' }
  })
  .then( res => res.json() )
  .then( console.log )
}

const loadAcct = function(chz){
  fetch( '/loadAcct', {
    method:'GET',
    credentials: 'include',
  })
  .then( res => res.json() )
  .then( console.log )
}
