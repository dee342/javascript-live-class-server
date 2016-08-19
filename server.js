var express = require( 'express' );

var app = express();

var data = {
  persons: [
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

app.get( '/persons', ( req, res ) => {
  res.json( data );
});

app.get( '/persons/:name', function ( req, res ) {
  var name = req.params.name;
  var record = data.persons.find( person => person.name === name );

  if ( ! record ) {
    res.status( 404 ).json({ error: 404, message: "name not found" })
  } else {
    res.json( record );
  }
})

app.delete( '/persons/:name', function ( req, res ) {
  data.persons = data.persons.filter( person => person.name !== req.params.name );

  res.json({ message: 'deleted!' });
})

// RESTful API
// TODO: add a new name to the list when POST /names and return the new name object
// TODO: change an existing name when PUT /names/:name and return the changed name object

app.listen( 3000, function () {
  console.log( "Server started on http://localhost:3000" );
});

