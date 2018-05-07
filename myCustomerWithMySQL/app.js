
/**
 * Module dependencies.
 */

var express = require('express')
  , http = require('http')
  , path = require('path'),
  
  fs = require('fs');;
  var bodyParser = require('body-parser');

  var mysql = require('mysql');

  
  var pool  = mysql.createPool({
	  	host: "localhost",
	    user: "root",
	    password: "password",
	    database: "mydb"
	});

  
  pool.on('connection', function (connection) {
	    console.log("Connected");
	    // Set a session variable
	    //connection.query('SET SESSION auto_increment_increment=1')
	});
  

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
		var text = req.body.name;
		var address = req.body.address;
		var phone = req.body.phone;
		var todolist =[];
		var todolist1 =[];
		pool.getConnection(function(err, connection) {
		    // Use the connection
		  var sql = "Select name, address,phone,id from customers where id =" + req.body.id;
		    connection.query(sql, function (err, result) {
		        // And done with the connection.
		    	
		    	
		        connection.release();
		        if (err) throw err;
		        console.log("I received Get request!!"+result);
		        var todolist = result;
		        
		        
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
		        
		    	
		        
		        // Don't use the connection here, it has been returned to the pool.
		    });
		   
		});
		
			
	}
	
	if (req.body.type =='update'){
		var jsonObj = req.body.todo;
		console.log("-----!"+req.body.todo.id);
		console.log("-----!"+req.body.todo.name);
		console.log("-----!"+req.body.todo.address);
		console.log("-----!"+req.body.todo.phone);
		
		pool.getConnection(function(err, connection) {
			    // Use the connection
			  
			    var sql = "INSERT customers SET " +
			    		"name='"+req.body.todo.name+"'," +
			    		"address='"+req.body.todo.address+"'," +
			    		"phone='"+req.body.todo.phone+"'";
			    
			    connection.query(sql, function (err, result) {
			    	 
			    	if (err){
			    		connection.release();
			    		throw err;
			    	}
			      console.log("1 record inserted");
			        // And done with the connection.
			       
			        
			    });
			    var sql = "Select name, address,phone,id from customers";
			    connection.query(sql, function (err, result) {
			        // And done with the connection.
			    	
			    	
			        connection.release();
			    	if (err) throw err;
			    	
			    	console.log("I received Get request!!"+result);
			    	todolist = result;
			    	var jsonContent = JSON.stringify(result);
			    	console.log(jsonContent);
			    	
			    	res.json(todolist) ;
			        
			    });
			});		
	}
	if (req.body.type =='del'){
		var id = req.body.id;
		var todolist =[];
		
		  pool.getConnection(function(err, connection) {
			    // Use the connection
			  
			    var sql = "DELETE FROM customers where id =" + 	req.body.id;
			    
			    connection.query(sql, function (err, result) {
			    	 
			    	if (err){ throw err;
			    		connection.release();
			    	}
			      console.log("1 record Delete");
			        // And done with the connection.
			       
			    });
			    
			    var sql = "Select name, address,phone,id from customers";
			    connection.query(sql, function (err, result) {
			        // And done with the connection.
			    	
			    	
			        connection.release();
			    	if (err) throw err;
			    	
			    	console.log("I received Get request!!"+result);
			    	todolist = result;
			    	var jsonContent = JSON.stringify(result);
			    	console.log(jsonContent);
			    	
			    	res.json(todolist) ;
			        
			    });
			});
		
		  pool.getConnection(function(err, connection) {
		    // Use the connection
		  var sql = "Select name, address,phone,id from customers";
		    connection.query(sql, function (err, result) {
		        // And done with the connection.
		    	
		    	
		        connection.release();
		    	if (err) throw err;
		    	
		    	console.log("I received Get request!!"+result);
		    	todolist = result;
		    	var jsonContent = JSON.stringify(result);
		    	console.log(jsonContent);
		    	
		    	res.json(todolist) ;
		        
		    });
		   
		});;
		
		
	}
	if (req.body.type =='ins'){
		var jsonObj = req.body.todo;
		 
		// stringify JSON Object
		var jsonContent = JSON.stringify(jsonObj);
		console.log(jsonContent);
		
		var todolist =jsonObj;

		var jsonObj = todolist;
		console.log(jsonObj);
		
		  pool.getConnection(function(err, connection) {
			    // Use the connection
			  
			    var sql = "INSERT INTO customers (id,name, address,phone) VALUES (" + 
			    			req.body.todo.id+"," +
			    		"'"+req.body.todo.name+"'," +
			    		"'"+req.body.todo.address+"'," +
			    		"'"+req.body.todo.phone+"')";
			    
			    connection.query(sql, function (err, result) {
			    	 
			    	if (err){
			    		connection.release();
			    		throw err;
			    	}
			      console.log("1 record inserted");
			        // And done with the connection.
			       
			    });
			    var sql = "Select name, address,phone,id from customers";
			    connection.query(sql, function (err, result) {
			        // And done with the connection.
			    	
			    	
			        connection.release();
			    	if (err) throw err;
			    	
			    	console.log("I received Get request!!"+result);
			    	todolist = result;
			    	var jsonContent = JSON.stringify(result);
			    	console.log(jsonContent);
			    	
			    	res.json(todolist) ;
			        
			    });
			});
		
		  pool.getConnection(function(err, connection) {
		    // Use the connection
		 
		   
		});
	}
	
	

});

app.get('/todolist', function (req, res) {
	console.log("I received Get request!!");
	
	var todolist =[];
	 pool.getConnection(function(err, connection) {
		    // Use the connection
		  var sql = "Select name, address,phone,id from customers";
		    connection.query(sql, function (err, result) {
		        // And done with the connection.
		    	
		    	
		        connection.release();
		        if (err) throw err;
		        console.log("I received Get request!!"+result);
		    	todolist = result;
		    	var jsonContent = JSON.stringify(result);
		    	console.log(jsonContent);
		    	
		    	res.json(todolist) ;
		        
		    });
		   
		});
	
	
});

function end() {
    server.close(function (err) {
        if (err) throw err;
        console.log('Server endded!');

        pool.end(function (err) {
            if (err) throw err;

            process.exit();
        });
    });
}
http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
