var express = require('express');
var app = express();
var handlebars  = require('express-handlebars'), hbs;

var path = require('path');

app.set('port', process.env.PORT || 3000);
var options = { dotfiles: 'ignore', etag: false,
	extensions: ['htm', 'html'],
	index: false
};
app.use(express.static(path.join(__dirname, '/public') , options  ));
app.set('views', path.join(__dirname, '/views'));  
hbs = handlebars.create({
    defaultLayout: 'main',

    // Uses multiple partials dirs, templates in "shared/templates/" are shared
    // with the client-side of the app (see below).
	  layoutsDir: path.join(__dirname, '/views/layouts'), 
	  partialsDir: path.join(__dirname, '/views/partials')
});
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
/*app.set('views', path.join(__dirname, '/public/views'));  
var hbs = exphbs.create({  
  defaultLayout: 'main',  
  layoutsDir: path.join(__dirname, '/public/views/layouts'), 
  partialsDir: path.join(__dirname, '/public/views/partials')
});  
app.engine('handlebars', hbs.engine); 
app.set('view engine', 'handlebars');*/


app.get('/', function(req, res)
{
	res.render('hello');   // this is the important part
});

app.get('/bodie', function(req, res)
{
	res.render('bodie');
});

app.get('/june', function(req, res)
{
	res.render('june');
});

app.get('/lee', function(req, res)
{
	res.render('town', { town: "Lee Vining"});
});

var californiapeople = {
   people: [
{"name":"Adams","first":"Ansel","profession":"photographer",
   "born"       :"SanFrancisco"},
{"name":"Muir","first":"John","profession":"naturalist",
   "born":"Scotland"},
{"name":"Schwarzenegger","first":"Arnold",
   "profession":"governator","born":"Germany"},
{"name":"Wellens","first":"Paul","profession":"author",
   "born":"Belgium"}
]   };

app.get('/californiapeople', function(req, res)
{
	res.render('californiapeople', californiapeople);
});

app.get('/people', function(req, res)
{
	res.render('people', californiapeople);
});

app.listen(app.get('port'),  function () {
	console.log('Hello express started on http://localhost:' +
	app.get('port') + '; press Ctrl-C to terminate.' );
});