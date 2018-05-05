
/**
 * Module dependencies.
 */

var express = require('express')
  , http = require('http')
  , path = require('path'),
  
  fs = require('fs');;
  var bodyParser = require('body-parser');

  

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//all environments
app.set('port', process.env.PORT || 3000);

app.use(express.static(__dirname+ '/public'));

app.post('/todolist', function (req, res) {
	debugger;
	console.log("--------------I received Post request-----------------!");
	console.log("-----!"+req.body);
	console.log("-----!"+req.body.type);
	
	
	if (req.body.type =='edit'){
		var id = req.body.id;
		var text = req.body.text;
		var todolist =[];
		var todolist1 =[];
		todolist = JSON.parse(fs.readFileSync('notelists.json', 'utf8'));
//		var k =todolist.slice(1,2);
		
		var objectKeysArray = Object.keys(todolist)
		todolist.forEach(function(objKey) {
		    var objValue = todolist[objKey];
		    
		    
		    if (objKey.id==id && objKey.text==text  ){
		    	console.log("objKey.id is here!"+objKey.id);
		    	res.json(objKey) ;
		    }
		    else{
		    	
		    }
		})
			
	}
	
	if (req.body.type =='update'){
		var jsonObj = req.body.todo;
		console.log("-----!"+req.body.todo.id);
		console.log("-----!"+req.body.todo.text);
		 
		// stringify JSON Object
		var jsonContent = JSON.stringify(jsonObj);
		var id = req.body.todo.id;
		var text = req.body.todo.text;
		var todolist =[];
		var todolist1 =[];
		todolist = JSON.parse(fs.readFileSync('notelists.json', 'utf8'));
		var objectKeysArray = Object.keys(todolist)
		todolist.forEach(function(objKey) {
		    var objValue = todolist[objKey];
		    
		    
		    if (objKey.id==id  ){
		    	console.log("objKey.id is here!"+objKey.id);
		    	objKey.text = text;
		    	todolist1.push(objKey);
		    }
		    else{
		    	todolist1.push(objKey);
		    }
		})
		fs.writeFile("notelists.json", JSON.stringify(todolist1), 'utf8', function (err) {
		    if (err) {
		        console.log("An error occured while writing JSON Object to File.");
		        return console.log(err);
		    }
		 
		    console.log("JSON file has been saved.");
		});
		res.json(todolist1) ;
			
	}
	if (req.body.type =='del'){
		var id = req.body.id;
		var todolist =[];
		var todolist1 =[];
		todolist = JSON.parse(fs.readFileSync('notelists.json', 'utf8'));
//		var k =todolist.slice(1,2);
		
		var objectKeysArray = Object.keys(todolist)
		todolist.forEach(function(objKey) {
		    var objValue = todolist[objKey];
		    
		    
		    if (objKey.id==id){
		    	console.log("objKey.id is here!"+objKey.id);
		    
		    }
		    else{
		    	todolist1.push(objKey);
		    }
		})
		fs.writeFile("notelists.json", JSON.stringify(todolist1), 'utf8', function (err) {
		    if (err) {
		        console.log("An error occured while writing JSON Object to File.");
		        return console.log(err);
		    }
		 
		    console.log("JSON file has been saved.");
		});
		res.json(todolist1) ;
		
		
	}
	if (req.body.type =='ins'){
		var jsonObj = req.body.todo;
		 
		// stringify JSON Object
		var jsonContent = JSON.stringify(jsonObj);
		console.log(jsonContent);
		
		var todolist =jsonObj;

		var jsonObj = todolist;
		console.log(jsonObj);
		
		todolist = JSON.parse(fs.readFileSync('notelists.json', 'utf8'));
		todolist.push(jsonObj)
		res.json(todolist) ;
		 
		// stringify JSON Object
		var jsonContent = JSON.stringify(todolist);
		console.log(jsonContent);
		 
		fs.writeFile("notelists.json", JSON.stringify(todolist), 'utf8', function (err) {
		    if (err) {
		        console.log("An error occured while writing JSON Object to File.");
		        return console.log(err);
		    }
		 
		    console.log("JSON file has been saved.");
		});
	}
	
	

});

app.get('/todolist', function (req, res) {
	console.log("I reseived Get request!!");
	
	var todolist =[];
	
	todolist = JSON.parse(fs.readFileSync('notelists.json', 'utf8'));
	var jsonContent = JSON.stringify(todolist);
	console.log(jsonContent);
	res.json(todolist) ;
	
});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
