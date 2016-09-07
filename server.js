var express = require('express') // server
app = express() // server object

app.get('*',function(request,response){

  response.write('something')
  response.end()

})