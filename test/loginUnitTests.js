var log = require('../models/login');

// Test Case #1 - Valid Username and Valid Password
var username1 = "super_veko@yahoo.com";
var password1 = "soen341";
var testLogin = function(login, username, password) {
    if (login(username, password) != undefined) {
        console.log('Test Case #1 Passed!');
    } else {
        console.log('Test Case #1 Failed!');
    }
}
testLogin(log.login, username1, password1);
log.logout(); //Making sure it's logged out before next test

// Test Case #2 - Invalid Username and Valid Password
var username2 = "super_beko@yahoo.com";
var password2 = "soen341";
var testLogin = function(login, username, password) {
    if (login(username, password) != undefined) {
        console.log('Test Case #2 Passed!');
    } else {
        console.log('Test Case #2 Failed!');
    }
}
testLogin(log.login, username2, password2);
log.logout(); //Making sure it's logged out before next test




// Test Case #3 - Valid Username and Invalid Password
var username3 = "super_veko@yahoo.com";
var password3 = "inconnectpassword";
var testLogin = function(login, username, password) {
    if (login(username, password) != undefined) {
        console.log('Test Case #2 Passed!');
    } else {
        console.log('Test Case #2 Failed!');
    }
}
testLogin(log.login, username3, password3);
log.logout(); //Making sure it's logged out before next test

// EXPECTED OUTPUT
// Test Case #1 Passed!
// Test Case #2 Failed!
// Test Case #3 Failed!

// Test Case #4 - User is logged in, tries logout
var username4 = "super_veko@yahoo.com";
var password4 = "soen341";
log.login(username4, password4); //Login correctly first
var testLogout = function(logout) {
    if (logout() != undefined) {
        console.log('Test Case #4 Passed!');
    } else {
        console.log('Test Case #4 Failed!')
    }
}
testLogout(log.logout);

// Test Case #5 - User that is NOT logged in, tries to logout
var testLogout = function(logout) {
    if (logout() != undefined) {
        console.log('Test Case #5 Passed!');
    } else {
        console.log('Test Case #5 Failed!')
    }
}
testLogout(log.logout);

// Test Case #6 - User is logged in, test to check whether he is logged in or not
var username6 = "super_veko@yahoo.com";
var password6 = "soen341";
log.login(username6, password6);
var testIsLoggedIn = function(isLoggedIn) {
    if (isLoggedIn() != undefined) {
        console.log('Test Case #6 Passed!');
    } else {
        console.log('Test Case #6 Failed!')
    }
}
testIsLoggedIn(log.isLoggedIn);
log.logout(); //Making sure it's logged out before next test