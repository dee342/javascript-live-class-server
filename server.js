var express = require( 'express' );

var app = express();

var names = {
  names: [
    "Josh",
    "Steve",
    "Sally",
    "Rebecca",
    "Paul",
  ].map( name => ({ name })),
};

// HTTP Verbs
//   - GET
//   - PUT
//   - PATCH
//   - POST
//   - DELETE
app.get( '/', function ( req, res ) {
  res.send( "Hello, world!" );
});

app.get( '/names', ( req, res ) => {
  res.json( names );
});

app.get( '/names/:name', function ( req, res ) {
  var name = req.params.name;
  var record = names.names.find( o => o.name === name );

  if ( ! record ) {
    res.status( 404 ).json({ error: 404, message: "name not found" })
  } else {
    res.json( record );
  }
})

app.delete( '/names/:name', function ( req, res ) {
  names.names = names.names.filter( o => o.name !== req.params.name );

  res.json({ message: 'deleted!' });
})

// RESTful API
// TODO: add a new name to the list when POST /names and return the new name object
// TODO: change an existing name when PUT /names/:name and return the changed name object

app.listen( 3000, function () {
  console.log( "Server started on http://localhost:3000" );
});

