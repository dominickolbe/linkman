var express = require('express'),
    app     = express();
var port    = process.env.PORT || 3000;


app
    .use(express.static('./public'))

    .get('*', function(req, res) {
        res.sendFile('public/index.html', { root: __dirname });
    })
    
    .listen(port);