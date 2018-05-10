
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
app.use(bodyParser.urlencoded({ extended: false }));app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

//all environments
app.set('port', process.env.PORT || 3000);

app.use(express.static(__dirname+ '/public'));

app.get('/todolist', function (req, res) {
	debugger;
	console.log("--------------I received Post request!!!!!!!!!!-----------------!");
	console.log("-----!"+req.body);

	var user_type = req.param('type');
	console.log("-----!"+user_type);
	
	
	if (user_type=='edit'){
		var id = req.param('id');
		var name = req.param('name');
		var address = req.param('address');
		var phone = req.param('phone');
		var todolist =[];
		var todolist1 =[];
		pool.getConnection(function(err, connection) {
		    // Use the connection
		  var sql = "Select name, address,phone,id from customers where id =" + req.param('id');
		  console.log("-----!"+sql);
		    connection.query(sql, function (err, result) {
		        // And done with the connection.
		    	
		    	
		        connection.release();
		        if (err) throw err;
		        console.log("I received Get request!!"+result);
		        var todolist = result;
		        
		        
		        var objectKeysArray = Object.keys(todolist)
				todolist.forEach(function(objKey) {
				    var objValue = todolist[objKey];
				    
				    console.log("id"+id+"text"+name+"objKey.id"+objKey.id+"objKey.text"+objKey.name);
				    if (objKey.id==id && objKey.name==name  ){
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
	
	if (user_type =='update'){
		var jsonObj = req.body.todo;
		var id = req.param('id');
		var name = req.param('name');
		var address = req.param('address');
		var phone = req.param('phone');
		
		pool.getConnection(function(err, connection) {
			    // Use the connection
			  
			    var sql = "UPDATE customers SET " +
			    		"name='"+req.param('name')+"'," +
			    		"address='"+req.param('address')+"'," +
			    		"phone='"+req.param('phone')+"' where id =" + req.param('id');
			    console.log("-----!"+sql);
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
	if (user_type =='del'){
		var id = req.param('id');
		var todolist =[];
		
		  pool.getConnection(function(err, connection) {
			    // Use the connection
			  
			    var sql = "DELETE FROM customers where id =" + 	req.param('id');
			    
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
	if (user_type =='ins'){
		var jsonObj = req.body.todo;
		 
		// stringify JSON Object
		var jsonContent = JSON.stringify(jsonObj);
		console.log(jsonContent);
		
		var todolist =jsonObj;

		var jsonObj = todolist;
		console.log(jsonObj);
		
		  pool.getConnection(function(err, connection) {
			    // Use the connection
			  
			  var user_type = req.param('type');
				console.log("-----!"+req.param('id'));
			  
			    var sql = "INSERT INTO customers (id,name, address,phone) VALUES (" + 
			    			req.param('id')+"," +
			    		"'"+req.param('name')+"'," +
			    		"'"+req.param('address')+"'," +
			    		"'"+req.param('phone')+"')";
			    console.log("-----!"+sql);
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
	
	if (user_type =='sel'){
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
	}
	
	

});

//app.get('/todolist', function (req, res) {
//	console.log("I received Get request!!");
//	
//	var todolist =[];
//	 pool.getConnection(function(err, connection) {
//		    // Use the connection
//		  var sql = "Select name, address,phone,id from customers";
//		    connection.query(sql, function (err, result) {
//		        // And done with the connection.
//		    	
//		    	
//		        connection.release();
//		        if (err) throw err;
//		        console.log("I received Get request!!"+result);
//		    	todolist = result;
//		    	var jsonContent = JSON.stringify(result);
//		    	console.log(jsonContent);
//		    	
//		    	res.json(todolist) ;
//		        
//		    });
//		   
//		});
//	
//	
//});

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
