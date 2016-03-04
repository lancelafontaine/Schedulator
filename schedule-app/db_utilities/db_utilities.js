//Requires MySQL Extension
var mysql = require('mysql');

// Database Configuration Information
//------------------------------
// host => 'localhost'
// port => '3306'
// usersame => 'root'
// password => '1234'
//------------------------------

var connection = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : '1234'
});

//Instantiating the connection
connection.connect();

//Change accordingly 
//There is only one Database
connection.query('USE schedulator');

var authenticate = function (username, password){
		
	var queryString = "SELECT id, pass FROM login_info" + 
					  " WHERE id=" + "'" + username + "'" + 
					  " AND pass=" + "'" + password + "'" + ";";

					  console.log(queryString);

	connection.query(queryString, function(err, rows, fields) {
		//Error will be displayed on terminal
		if (err) throw err;
		  		
		//Change it into a string first
		var result = JSON.stringify(rows);

		//String is in JSON format, parse this baby 
		var jsonData = JSON.parse(result);

		if(jsonData.length == 0){
			console.log("There is no user with ID: " + username + " and Pass: " + password);
		} else {
			console.log(jsonData);
		}
	});
}

var getCourse = function(courseID){

	var queryString = "SELECT * FROM courses" +
					  " WHERE course_id=" + "'" + courseID + "'" + ";";
					  console.log(queryString);

	connection.query(queryString, function(err, rows, fields) {
		//Error will be displayed on terminal
		if (err) throw err;
		  		
		//Change it into a string first
		var result = JSON.stringify(rows);

		//String is in JSON format, parse this baby 
		var jsonData = JSON.parse(result);

		if(jsonData.length == 0){
			console.log("There is no course with ID: " + courseID + ".");
		} else {
			console.log(jsonData);
		}
	});
}

module.exports = {
	authenticate: authenticate,
	getCourse: getCourse
}
