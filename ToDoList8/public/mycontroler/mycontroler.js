/**
 * http://usejsdoc.org/
 */



            var app = angular.module('myApp', []);
            
            app.controller("ToDoController", function todoCtrl($scope, $http){
            	$scope.todo = {};
            	var refresh= function(){
            		$http({
          		      method: 'GET',
          		      url: '/todolist'
          		   }).then(function (success){
          			 console.log(success, 'res');
          		    data = success.data;
          		  $scope.todolist = data;
          		$scope.todo = {};
          		   },function (error){
          			 console.log(error, 'can not get data.');
          		   });
	              	$scope.test = "Angular test, Здравейте";
	              	console.log("To Do List!!!");
	              	
            	}
            	
            	refresh();
            	$scope.addNotice= function(){
	            		console.log("Put Button Add Notice"+JSON.stringify($scope.todo));
	            		console.log("Put Button Add Notice"+$scope.todo);
	            		debugger;
	            		var data = {

	            				type: 'ins',

	            				todo: $scope.todo
	            				};
	            		$http({
	          		      method: 'POST',
	          		    dataType: "json",
	          		      url: '/todolist',
	          		    headers: {
	          		      'Content-Type': 'application/json' 
	          		    },
	          		      data : data
	          		   }).then(function (success){
	          			 console.log(success, 'res+++');
	          		    data = success.data;
	          		  console.log("Put Button Add Notice"+data);
	          		  debugger;
	          		  $scope.todolist = data;
	          		$scope.todo = [];
          		   },function (error){
          			 console.log(error, 'can not get data.');
          		   });
				}
            	
            	$scope.remove= function(id){
            		debugger;
            		console.log("Put Button Remove Notice"+id);
            		debugger;
            		
            		var data = {

            				type: 'del',

            				id: id
            				};
            		$http({
	          		      method: 'POST',
	          		    dataType: "json",
	          		      url: '/todolist',
	          		    headers: {
	          		      'Content-Type': 'application/json' 
	          		    },
	          		      data : data
	          		   }).then(function (success){
	          			 console.log(success, 'res+++');
	          		    data = success.data;
	          		  console.log("Del Button Add Notice"+data);
	          		  debugger;
	          		  $scope.todolist = data;
	          		$scope.todo = [];
        		   },function (error){
        			 console.log(error, 'can not get data.');
        		   });
            		refresh();
				}
            	
            	$scope.updateNotice= function(){
            		console.log("Put Button Update Notice"+JSON.stringify($scope.todo));
            		console.log("Put Button Update Notice"+$scope.todo);
            		debugger;
            		var data = {

            				type: 'update',

            				todo: $scope.todo
            				};
            		$http({
          		      method: 'POST',
          		    dataType: "json",
          		      url: '/todolist',
          		    headers: {
          		      'Content-Type': 'application/json' 
          		    },
          		      data : data
	          		   }).then(function (success){
	          			 console.log(success, 'res+++');
	          		    data = success.data;
	          		  console.log("Update Button Add Notice"+data);
	          		  debugger;
	          		  $scope.todolist = data;
	          		$scope.todo = [];
        		   },function (error){
        			 console.log(error, 'can not get data.');
        		   });
            		refresh();
				}
            	
            	$scope.edit= function(id,text){
            		debugger;
            		console.log("Put Button Edit Notice"+id+"Teext:"+text);
            		debugger;
            	
            		var data = {

            				type: 'edit',
            				id: id,
            				text: text
            				
            				};
            		var data1 = data;
            		$http({
	          		      method: 'POST',
	          		    dataType: "json",
	          		      url: '/todolist',
	          		    headers: {
	          		      'Content-Type': 'application/json' 
	          		    },
	          		      data : data
	          		   }).then(function (success){
	          			 console.log(success, 'res+++');
	          		    data = success.data;
	          		  data1 = success.data;
	          		  console.log("Del Button Add Notice"+data1);
	          		  debugger;
	          		$scope.todo = data1;
        		   },function (error){
        			 console.log(error, 'can not get data.');
        		   });
//            		refresh();
//            		$scope.todo = data1;
				}
            	
            });
           
 
   