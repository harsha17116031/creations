var express=require('express');
var play=require('./control/play');

var app=express();

app.set('view engine','ejs');
app.use(express.static('./public'));

play(app);

app.listen(3000);
