var prereqInfo = JSON.parse(getJSON("prereq/")); //get the course list with prereq
var scheduleInfo = JSON.parse(getJSON("courses/")); //get the course list with detail info
var finalSequence = JSON.parse(getJSON("sequence/")); //get the sequence with boolean "taken"
var studentID = $('#student_id').text().trim();
var allUserInfo = JSON.parse(getJSON("student_record/"));
var userInfo = allUserInfo.filter(function(i) {
    return i.id === studentID ? true : false
})[0];
var tempStudentRecord = JSON.parse(getJSON("courses_completed/" + userInfo.id + "/")); //get the student record
var studentRecord = tempStudentRecord.map(function(i) {
    return i.course_id
});
// var tempPref = JSON.parse(JSON.parse(getJSON('pref/'+userInfo.id+'/'))[0].pref_json)[0];
var defaultPref = {
    "semester": "winter",
    "courseLoad": 5,
    "monday": false,
    "tuesday": false,
    "wednesday": false,
    "thursday": false,
    "friday": false,
    "morning": false,
    "afternoon": false,
    "night": false,
    "swg": false,
    "loyola": false,
    "online": false
};
pref = defaultPref;