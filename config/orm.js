// Import MySQL connection.  Activity 16

var connection = require("./connection.js");

// Helper function for SQL syntax.  Activity 16
function printQuestionMarks(num) {
  var arr = [];

  for (var i = 0; i < num; i++) {
    arr.push("?");
  }

  return arr.toString();
}

// Helper function to convert object key/value pairs to SQL syntax.  Activity 16
function objToSql(ob) {
  var arr = [];

  // loop through the keys and push the key/value as a string int arr.  Activity 16
  for (var key in ob) {
    var value = ob[key];

    if (Object.hasOwnProperty.call(ob, key)) {
      if (typeof value === "string" && value.indexOf(" ") >= 0) {
        value = "'" + value + "'";
      }
      arr.push(key + "=" + value);
    }
  }

  // translate array of strings to a single comma-separated string. Activity 16
  return arr.toString();
}

// Object for all our SQL statement functions. Activity 16
var orm = {
  selectAll: function(table, cb) {
    var queryString = "SELECT * FROM " + table + ";";
    connection.query(queryString, function(err, result) {
      if (err) {
        throw err;
      }
      cb(result);
    });
  },
  insertOne: function(table, cols, vals, cb) {
    var queryString = "INSERT INTO " + table;

    queryString += " (";
    queryString += cols.toString();
    queryString += ") ";
    queryString += "VALUES (";
    queryString += printQuestionMarks(vals.length);
    queryString += ") ";

    console.log(queryString);

    connection.query(queryString, vals, function(err, result) {
      if (err) {
        throw err;
      }

      cb(result);
    });
  },
  // An example of objColVals would be {name: panther, sleepy: true}.  Activity 16
  updateOne: function(table, objColVals, condition, cb) {
    var queryString = "UPDATE " + table;

    queryString += " SET ";
    queryString += objToSql(objColVals);
    queryString += " WHERE ";
    queryString += condition;

    console.log(queryString);
    connection.query(queryString, function(err, result) {
      if (err) {
        throw err;
      }

      cb(result);
    });
  },
 delete: function(table, condition, cb) {
  var queryString = "DELETE FROM " + table;
  queryString += " WHERE ";
  queryString += condition;

  connection.query(queryString, function(err, result) {
    if (err) {
      throw err;
    }
    cb(result);
  });
}
};
  
// Export the orm object for the model (burger.js).  Activity 16
module.exports = orm;
