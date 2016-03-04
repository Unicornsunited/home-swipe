const express = require('express'), 
request = require('request'),
app = express(),
PORT = process.env.PORT || 9001;

app.use('/', express.static(__dirname + '/'));
// app.use('/components', express.static(__dirname + '/components'));
// app.use('/shared', express.static(__dirname + '/shared'));
// app.use('/dist', express.static(__dirname + '/dist'));
app.use('/api', function(req, res) {  
  var url = 'http://api.zoopla.co.uk/api/v1/' + req.url;
  req.pipe(request(url)).pipe(res);
});

app.listen(PORT);
console.log('Express server listening on port ' + PORT);