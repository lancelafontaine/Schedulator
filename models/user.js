var user = {
  // properties
  userId: "hi",
  password: "hello",
  type: "",

  // methods
  login: function () {
    //
  },
  logout: function () {
    //
  }
}

var private_thing = {
  property: "wazzap"
}

// To allow access from other files:
// module.exports = user

//////////////////////////////////////////
// In a different file
// var user = require('user')

console.log('Original user id: ' + user.userId); // hi
console.log('Original user password: ' + user.password); // hello
console.log('creating new user and reassigning user id....')
var newUser = Object.create(user);
newUser.userId = "hey"
console.log('New user id: ' + newUser.userId); // hey
console.log('New user password: ' + newUser.password); // hello
console.log('Original user id: ' + user.userId); // hi
console.log('Original user password: ' + user.password); // hello

