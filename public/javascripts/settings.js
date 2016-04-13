//Preload the page
$(window).load(function() {
        $('#page-loader').fadeOut(1400);
    })
    // Sidebar collapse/open
$('#sidebar-collapse-div').click(function() {
    if ($('#sidebar-collapse').attr('class').search('right') === -1) {
        // To collapse
        $('#sidebar-collapse').removeClass('fa-angle-double-left').addClass('fa-angle-double-right');
        $('#sidebar').animate({
            width: '80px'
        }, 300, function() {
            computeContentWidth()
        });
        $('#settings-content-wrapper').animate({
            left: '80px'
        }, 299, function() {});
        $('.sidebar-separator').css('display', 'none');
        $('#sidebar-links').find('span').css('display', 'none');
        $('#sidebar-links').find('.fa').animate({
            padding: '0 15px 0 30px'
        }, 300, function() {});
    } else {
        //To open
        $('#sidebar-collapse').removeClass('fa-angle-double-right').addClass('fa-angle-double-left');
        $('#sidebar').animate({
            width: '300px'
        }, 300, function() {
            computeContentWidth();
        });
        300
        $('#settings-content-wrapper').animate({
            left: '300px'
        }, 299, function() {});
        $('.sidebar-separator').css('display', 'block');
        $('#sidebar-links').find('span').css('display', 'inline');
        $('#sidebar-links').find('.fa').animate({
            padding: '0 15px 0 10px'
        }, 300, function() {});
    }
});

// UI fixes
$('#sidebar-collapse-div').hover(function() {
    $('#sidebar-collapse').addClass('sidebar-collapse-bigger')
}, function() {
    $('#sidebar-collapse').removeClass('sidebar-collapse-bigger')
});

$('.sidebar-link').hover(function() {
    $(this).find('.fa').css('font-size', '23px');
    $(this).find('span').css('font-size', '17px');
}, function() {
    $(this).find('.fa').css('font-size', '20px');
    $(this).find('span').css('font-size', '15px');
});

// Computing heights
var computePageHeight = function() {
    var windowHeight = $(window).height();
    var headerHeight = $('#setting-header').height();
    $('#settings-content-wrapper').height(windowHeight - headerHeight);
    $('#sidebar').height(windowHeight - headerHeight);
};
var computeContentWidth = function() {
    var windowWidth = $(window).width();
    var sidebarWidth = $('#sidebar').width();
    $('#settings-content-wrapper').width(windowWidth - sidebarWidth)
};
computePageHeight()
computeContentWidth()

// showing containers by clicking on link
$('.containerq').css('display', 'none');
$('#schedule-container').css('display', 'block');

var showContainer = function(string) {
    var containerId = '#' + string + '-container';
    $('.containerq').css('display', 'none');
    $(containerId).fadeIn(500);
    $(containerId).css('display', 'block');
}


//Login
$("#modal_trigger").leanModal({
    top: 200,
    overlay: 0.6,
    closeButton: ".modal_close"
});

$(function() {
    // Calling Login Form
    $("#login_form").click(function() {
        $(".user_login").show(10000);
        return false;
    });



})
jQuery(function($) {
    $.fn.extend({
        leanModal: function(options) {
            var defaults = {
                top: 100,
                overlay: 0.5,
                closeButton: null
            };
            var overlay = $("<div id='lean_overlay'></div>");
            $("body").append(overlay);
            options = $.extend(defaults, options);
            return this.each(function() {
                var o = options;
                var modal_id = $(this).attr("href");

                function showModal() {
                    $("#lean_overlay").click(function() {
                        close_modal(modal_id)
                    });
                    $(o.closeButton).click(function() {
                        close_modal(modal_id)
                    });

                    var modal_height = $(modal_id).outerHeight();
                    var modal_width = $(modal_id).outerWidth();

                    $("#lean_overlay").css({
                        "display": "block",
                        opacity: 0
                    });

                    $("#lean_overlay").fadeTo(200, o.overlay);

                    $(modal_id).css({
                        "display": "block",
                        "position": "fixed",
                        "opacity": 0,
                        "z-index": 11000,
                        "left": 50 + "%",
                        "margin-left": -(modal_width / 2) + "px",
                        "top": o.top + "px"
                    });

                    $(modal_id).fadeTo(200, 1);
                };

                $(document).ready(function() {
                    showModal();
                });

                $(this).click(function(e) {
                    showModal();
                    e.preventDefault()
                })
            });

            function close_modal(modal_id) {
                $("#lean_overlay").fadeOut(200);
                $(modal_id).css({
                    "display": "none"
                })
            }
        }
    })
});
(jQuery);
















// UTILITY METHODS + GLOBALS

function getJSON(yourUrl){
    var Httpreq = new XMLHttpRequest(); // a new request
    Httpreq.open("GET",yourUrl,false);
    Httpreq.send(null);
    return Httpreq.responseText;
}
Array.prototype.diffArrays = function(a) {
  return this.filter(function(i) {return a.indexOf(i) < 0;});
};

var prereqInfo = JSON.parse(getJSON("prereq/")); //get the course list with prereq
var scheduleInfo = JSON.parse(getJSON("courses/")); //get the course list with detail info
var finalSequence = JSON.parse(getJSON("sequence/")); //get the sequence with boolean "taken"
var studentID = $('#student_id').text().trim();
var allUserInfo = JSON.parse(getJSON("student_record/"));
var userInfo = allUserInfo.filter(function(i){return i.id === studentID ? true : false})[0];
var tempStudentRecord = JSON.parse(getJSON("courses_completed/"+userInfo.id+"/")); //get the student record
var studentRecord = tempStudentRecord.map(function(i){return i.course_id});
// var tempPref = JSON.parse(JSON.parse(getJSON('pref/'+userInfo.id+'/'))[0].pref_json)[0];
// console.log(tempPref)
var defaultPref = {
  "semester":"winter",
  "courseLoad":5,
  "monday":false,
  "tuesday":false,
  "wednesday":false,
  "thursday":false,
  "friday":false,
  "morning":false,
  "afternoon":false,
  "night":false,
  "swg":false,
  "loyola":false,
  "online":false
};
pref = defaultPref;
//pref = tempPref.length === 0 ? defaultPref : tempPref;
console.log(pref);

// STUDENT RECORD LOGIC:

var findPreAdd = function(course){
  for (var i = 0; i < prereqInfo.length; i++){
    if (prereqInfo[i].course_name == course){
      if (prereqInfo[i].prequisites){
        var preArray = prereqInfo[i].prequisites.split(', ');
        for (var j = 0; j < preArray.length; j++){
          findPreAdd(preArray[j]);
          if (checkRep(preArray[j])==false){
            studentRecord.push(preArray[j]);
          }
        }
      }
      else{
        if (checkRep(course)==false){
          studentRecord.push(course);
        }
      }
    }
  }
}

var checkRep = function(course){
  var rep = false;
  for (var i = 0; i < studentRecord.length; i++){
    if (studentRecord[i] == course){
      rep = true;
      break;
    }
  }
  return rep;
}

// automatic filter through courses as typing
$("#student-record-input").on("keyup", function() {
    var searchTerm = $(this).val();
    var rows = $("#student-record-available-course-list").children("li");
    if (searchTerm.length > 0) {
        rows.stop().hide();
        $("#student-record-available-course-list").find("li:contains('" + searchTerm + "')").stop().show();
    } else {
        rows.stop().show();
    }
});

//populate the available courses in student record
var courseSet = {};
prereqInfo.map(function(i){
  courseSet[i.course_name] = i.course_description;
});
for (key in courseSet) {
  $('#student-record-available-course-list').append('<li id="student-record-'+key.replace(' ','')+'" class="student-record-course"><a class="student-record-available-course">'+key+'</a></li>');
}


var renderUI = function (array){
  // remove them from available courses list
  array.map(function(i){
    var id = '#student-record-'+i.replace(' ','');
    $(id).hide();
  });

  //add them to taken courses list
  var htmlString = '';
  array.map(function(i){
    var htmlLine = '<li class="student-record-taken-course">'+i.trim()+'</li>'
    htmlString += htmlLine;
  });
  $('#student-record-taken-courses').html(htmlString);
}
// render courses in completed list that are already in student record
renderUI(studentRecord);

// on click, selected a course to add to student record
$('.student-record-available-course').click(function() {
  var courseID = $(this).text().trim();

  findPreAdd(courseID);

  // sometimes it doesn't add the course that was selected, iterate  over array to make sure it's there.
  var isClickedCourseInArray = false;
  for (var i = 0; i < studentRecord.length; i++) {
    if (studentRecord[i] === courseID){
      isClickedCourseInArray = true;
    }
  }
  if (!isClickedCourseInArray) {
    studentRecord.push(courseID);
  }
  console.log(studentRecord);

  renderUI(studentRecord);

  // Diff new student record against old one
  var tempOldStudentRecord = JSON.parse(getJSON("courses_completed/"+userInfo.id+"/"));
  var oldStudentRecord = tempOldStudentRecord.map(function(i){return i.course_id});

  var diff = studentRecord.diffArrays(oldStudentRecord);
  console.log(diff);

  //Save all new student record courses to db
  var saveStudentRecordURL = "courses_completed/"
  diff.map(function(i){
    try {
    var course_id = i
    var course_name = ''
    var credits = '';
    prereqInfo.map(function(j){
      if (j.course_name === i) {
        course_name = j.course_description;
        credits = j.credits;
      }
    })

    $.ajax({
      type: 'POST',
      url: saveStudentRecordURL,
      data: {
        'course_id': course_id,
        'course_name': course_name,
        'credits': credits,
        'student_id': userInfo.id
      },
      success: function () {
        console.log('successfully saved to db');
      },
      async: false
    });
  } catch(e) {
    console.log('there was an error finding the course...')
  }
  });
  updateSequence();
  generateSchedule();
  renderSchedule(finalSchedule);
});







// SEQUENCE LOGIC



var updateSequence = function(){
  // Adds ID's to the font-awesome tags so they can be changed later
    $('.sequence-row').each(function(i){
      var sequenceCourseName = $(this).find('.sequence-course-name').text().replace(/\s/g,'');
      $(this).find('.sequence-changeable').attr('id', 'sequence-'+sequenceCourseName);
    });

  // Make sure that all of the tags are red first
  $('.sequence-changeable').attr('style', 'color: red;')

  // Change the boolean of the final sequence based on the new student record
  for (var i = 0; i < studentRecord.length; i++){
    for (var j = 0; j < finalSequence.length; j++){
      if (studentRecord[i] == finalSequence[j].course_name){
        finalSequence[j].taken = true;
      }
    }
  }

  // All taken courses should be make green instead and should have a check instead.
  finalSequence.map(function(i){
    if(i.taken === true) {
      var sequenceId = '#sequence-'+i.course_name.replace(/\s/g,'');
      $(sequenceId).attr('style','color:green;').removeClass('fa-times-circle').addClass('fa-check-circle')
    }
  });

}
updateSequence();




// // PREFERENCES LOGIC

//hide the message block
$('#feedbackWindow').hide();
//Change color and add css class when clicked
$('.prefContent').click(function(){
    //summer only
    if($(this).attr('id')=='term1'){
        if($('#term2').hasClass('stayclicked')){
            $('#term2').removeClass('stayclicked');
            $('#term2').addClass('prefContent');
        }
        if($('#term3').hasClass('stayclicked')){
            $('#term3').removeClass('stayclicked');
            $('#term3').addClass('prefContent');
        }
    }
    //fall only
    if($(this).attr('id')=='term2'){
        if($('#term1').hasClass('stayclicked')){
            $('#term1').removeClass('stayclicked');
            $('#term1').addClass('prefContent');
        }
        if($('#term3').hasClass('stayclicked')){
            $('#term3').removeClass('stayclicked');
            $('#term3').addClass('prefContent');
        }
    }
    //winter only
    if($(this).attr('id')=='term3'){
        if($('#term2').hasClass('stayclicked')){
            $('#term2').removeClass('stayclicked');
            $('#term2').addClass('prefContent');
        }
        if($('#term1').hasClass('stayclicked')){
            $('#term1').removeClass('stayclicked');
            $('#term1').addClass('prefContent');
        }
    }
    //3 courses only
    if($(this).attr('id')=='load1'){
        if($('#load2').hasClass('stayclicked')){
            $('#load2').removeClass('stayclicked');
            $('#load2').addClass('prefContent');
        }
        if($('#load3').hasClass('stayclicked')){
            $('#load3').removeClass('stayclicked');
            $('#load3').addClass('prefContent');
        }
        if($('#load4').hasClass('stayclicked')){
            $('#load4').removeClass('stayclicked');
            $('#load4').addClass('prefContent');
        }
    }
    //4 courses only
    if($(this).attr('id')=='load2'){
        if($('#load1').hasClass('stayclicked')){
            $('#load1').removeClass('stayclicked');
            $('#load1').addClass('prefContent');
        }
        if($('#load3').hasClass('stayclicked')){
            $('#load3').removeClass('stayclicked');
            $('#load3').addClass('prefContent');
        }
        if($('#load4').hasClass('stayclicked')){
            $('#load4').removeClass('stayclicked');
            $('#load4').addClass('prefContent');
        }
    }
    //5 courses only
    if($(this).attr('id')=='load3'){
        if($('#load2').hasClass('stayclicked')){
            $('#load2').removeClass('stayclicked');
            $('#load2').addClass('prefContent');
        }
        if($('#load1').hasClass('stayclicked')){
            $('#load1').removeClass('stayclicked');
            $('#load1').addClass('prefContent');
        }
        if($('#load4').hasClass('stayclicked')){
            $('#load4').removeClass('stayclicked');
            $('#load4').addClass('prefContent');
        }
    }
    //6 courses only
    if($(this).attr('id')=='load4'){
        if($('#load2').hasClass('stayclicked')){
            $('#load2').removeClass('stayclicked');
            $('#load2').addClass('prefContent');
        }
        if($('#load3').hasClass('stayclicked')){
            $('#load3').removeClass('stayclicked');
            $('#load3').addClass('prefContent');
        }
        if($('#load1').hasClass('stayclicked')){
            $('#load1').removeClass('stayclicked');
            $('#load1').addClass('prefContent');
        }
    }
    //now good to go
    if ($(this).hasClass('prefContent')){
		$(this).removeClass('prefContent');
		$(this).addClass('stayclicked');
	}
	else{
		$(this).removeClass('stayclicked');
		$(this).addClass('prefContent');
	}
});
//Submit JSON object to backend
$("#subRef").click(function(){
    //set semester
    var term = "";
    $('#showTerm td').each(function(){
        if($(this).hasClass('stayclicked')){
            term = $(this).text();
        }
    })
    //set course load
    var cl = "";
    $('#courseLoad td').each(function(){
        if($(this).hasClass('stayclicked')){
            cl = $(this).text().substring(0,1); //get number only
        }
    })
    //set days
    var days = "";
    $('#prefDays td').each(function(){
        if($(this).hasClass('stayclicked')){
            days += ($(this).text() + " ");
        }
    });
    //set time
    var time = "";
    $('#prefTime td').each(function(){
        if($(this).hasClass('stayclicked')){
            time += ($(this).text() + " ");
        }
    });
    //set location
    var location = "";
    $('#prefLocation td').each(function(){
        if($(this).hasClass('stayclicked')){
            location += ($(this).text() + " ");
        }
    });
    //check if semester is not seleted
    if (term == ""){
        $('#feedbackWindow p').text("Please select a semester");
        $('#feedbackWindow').show(200);
        exit();
    }
        
    //JSON final set
    pref.semester = term;
    pref.courseLoad = cl;
    pref.monday = (days.match(/MONDAY/) ? true : false);
    pref.tuesday = (days.match(/TUESDAY/) ? true : false);
    pref.wednesday = (days.match(/WEDNESDAY/) ? true : false);
    pref.thursday = (days.match(/THURSDAY/) ? true : false);
    pref.friday = (days.match(/FRIDAY/) ? true : false);
    pref.morning = (time.match(/MORNING/) ? true : false);
    pref.afternoon = (time.match(/AFTERNOON/) ? true : false);
    pref.night = (time.match(/NIGHT/) ? true : false);
    pref.swg = (location.match(/SWG/) ? true : false);
    pref.loyola = (location.match(/LOYOLA/) ? true : false);
    pref.online = (location.match(/ONLINE/) ? true : false);


    var prefString = '['+[JSON.stringify({
  "semester":"winter",
  "courseLoad":5,
  "monday":false,
  "tuesday":false,
  "wednesday":false,
  "thursday":false,
  "friday":false,
  "morning":true,
  "afternoon":true,
  "night":false,
  "swg":false,
  "loyola":false,
  "online":false
})].toString() + ']';

    $.ajax({
      type: 'POST',
      url: 'savepref/',
      contentType:"application/x-www-form-urlencoded; charset=utf-8",
      data: {
        'student_id': userInfo.id,
        'pref_json': prefString
      },
      success: function () {
        console.log('successfully saved pref to db');
      },
      async: false
    });

     //Show message
     $('#subRef').fadeOut(500);
     $('#feedbackWindow').addClass('centeredText');
     $('#feedbackWindow').text("You have successfully changed the preference! Refreshing in 5 seconds.");
     $('#feedbackWindow').show(1500, "swing");
     setInterval('window.location.reload()', 5000);
});














// Schedule Logic

// 2) Change the boolean of the sequence based on the new student record
function modifySequence(){
  for (var i = 0; i < studentRecord.length; i++){
    for (var j = 0; j < finalSequence.length; j++){
      if (studentRecord[i] == finalSequence[j].course_name){
        finalSequence[j].taken = true;
      }
    }
  }
  //save this finalSequence to /sequence
}

var finalSchedule = [];

// 3) Generate the schedule
function generateSchedule(){
  // 3-1) Generate an array of valid courses for this semester
  var available = [];
  for (var i = 0; i < finalSequence.length; i++){
    if (finalSequence[i].taken == "false"){ 
      var check = courseValidation(finalSequence[i].course_name); //check if 1) prereqs are meet 2) offer in this semester
      if (check){
        var sectionSets = generateSectionSets(finalSequence[i].course_name);
        available.push(sectionSets);
      }
    }
  }
  // 3-2-a) To make things simple, I put the first combination of the first course of the list to schedule
  var scheduleSets = [];
  for (var x = 0; x < available[0].length; x++){
    if (finalSchedule.length==0 && available.length!=0){
      finalSchedule.push(available[0][x].lecture);
      if (available[0][x].tutorial){
        finalSchedule.push(available[0][x].tutorial);
      }
      if (available[0][x].lab){
      finalSchedule.push(available[0][x].lab);
      }
    }
    // 3-2-b) From the second course on the list, check conflicts with the schedule; if there is none, put into schedule
    var courseLimit = 1; //increment after every addition in schedule
    for (var j = 1; j < available.length; j++){
      if (courseLimit < pref.courseLoad){
        for (var k = 0; k < available[j].length; k++){
          var timeConflict = true; //true means no conflict
          var dayConflict = dayValidation(available[j][k].lecture);
          if (available[j][k].tutorial) dayConflict = (dayValidation(available[j][k].lecture)&&dayValidation(available[j][k].tutorial))
          if (available[j][k].lab) dayConflict = (dayValidation(available[j][k].lecture)&&dayValidation(available[j][k].tutorial)&&dayValidation(available[j][k].lab));
          //if there is day conflict, check time conflict
          if (!dayConflict){
            var timeConflict1 = timeValidation(available[j][k].lecture);
            var timeConflict2 = true;
            var timeConflict3 = true;
            if (available[j][k].tutorial){
              timeConflict2 = timeValidation(available[j][k].tutorial);
            }
            if (available[j][k].lab){
              timeConflict3 = timeValidation(available[j][k].lab);
            }
            timeConflict = timeConflict1 && timeConflict2 && timeConflict3;
            //console.log("Final check: " + j + "->" + available[j].length + "-" + k + " "+ timeConflict)
          }
          //if there is no time conflict, add to schedule
          if (timeConflict){ 
            finalSchedule.push(available[j][k].lecture);
            //console.log(available[j][k].lecture.course_name + " " +  available[j][k].lecture.type  + " is added, classes: " + finalSchedule.length);
            if (available[j][k].tutorial){
              finalSchedule.push(available[j][k].tutorial);
              //console.log(available[j][k].tutorial.course_name + " " +  available[j][k].tutorial.type  + " is added, classes: " + finalSchedule.length);
            }
            if (available[j][k].lab){
              finalSchedule.push(available[j][k].lab);
              //console.log(available[j][k].lab.course_name + " " +  available[j][k].lab.type  + " is added, classes: " + finalSchedule.length);
            }
            courseLimit++;
            break;
          }
        }
      }
    }
    scheduleSets.push(finalSchedule);
  }
  var index = 0;
  for (var g = 0 ; g < scheduleSets.length; g++){
    if ((g!=index)&&(scheduleSets[g].length>scheduleSets[index])) index = g;
  }
  finalSchedule = scheduleSets[index];
  //console.log(scheduleSets.length + "  " + index)
  //save this finalSchedule to /schedule 
  //and then populate /schedule to schedule view
}

// 3-1-a) Check prereqs and semester availability
function courseValidation(course){
  var preCheck = prerequisitesValidation(course);
  var semCheck = semesterValidation(course);
  return preCheck&&semCheck;
}

// 3-1-b) check prereqs
function semesterValidation(course){
  //var web = "http://localhost:3000/courses/" + course; //make this generic after
  var semVal = false;
  var sem = pref.semester;
  var array = scheduleInfo;
  for (var i = 0; i < array.length; i++){
    if (array[i].course_name == course && array[i].semester == sem){
      semVal = true;
      break;
    }
  }
  return semVal;
}

// 3-1-c) check semester
function prerequisitesValidation(course){
  var preVal = false;
  var arr = [];
  //get prerequisites of the course (maximum one level down)
  for (var i = 0; i < prereqInfo.length; i++){
    if (prereqInfo[i].course_name == course){
      if (prereqInfo[i].prequisites){
        arr = prereqInfo[i].prequisites.split(", ");
      }
    }
  }
  //check prereq based on student record
  if (arr.length!=0){
    for (var j = 0; j < arr.length; j++){
      for (var k = 0; k < studentRecord.length; k++){
        if (arr[j]==studentRecord[k]){
          preVal = true;
          break;
        }
      }
    }
  }
  else{
  	preVal = true;
  }
  //console.log(course + "checking: ");
  //console.log(arr);
  //console.log(preVal);
  return preVal;
}

// 3-1-d) Generate an array of valid courses
// This array is generated AFTER semester/prereqs validation
// Hirachy: 
// powerSet = [sectionSet1, sectionSet2, sectionSet3 ...]
// sectionSet = {"lecture":section1, "tutorial":section2, "lab":section3}
// section = {"location":"..", "course_name": "..." ....}
function generateSectionSets(course){
  var lecture = [];
  var tutorial = [];
  var lab = [];
  var array = scheduleInfo;
  for (var i = 0; i < array.length; i++){
    if (array[i].course_name == course && array[i].type == "Lec" && array[i].semester == pref.semester){
      lecture.push(array[i]);
    }
    if (array[i].course_name == course && array[i].type == "Tut" && array[i].semester == pref.semester){
      tutorial.push(array[i]);
    }
    if (array[i].course_name == course && array[i].type == "Lab" && array[i].semester == pref.semester){
      lab.push(array[i])
    }
  }
  //console.log(course + " has " + lecture.length + " lecture " + tutorial.length + " tutorial " + lab.length + "lab")
  var powerSet = [];
  //for every lecture
  for (var l = 0; l < lecture.length; l++){
    var sectionSet = {};
    sectionSet.lecture = lecture[l];
    sectionSet.tutorial = "";
    sectionSet.lab = "";
    for (var m = 0; m < tutorial.length; m++){
      sectionSet.tutorial = tutorial[m];
      for (var n = 0; n < lab.length; n++){
        sectionSet.lab = lab[n];
      }
    }
    powerSet.push(sectionSet);
  }
  return powerSet;
}
// 3-2-a) Giving two section objects, check the day conflicts
function dayValidation(section){
  //case: both sections have classes on one same day
  var mon = false;
  var tue = false;
  var wed = false;
  var thu = false;
  var fri = false;
  var dayVal = true;
  for (var i = 0; i < finalSchedule.length; i++){
    mon = (finalSchedule[i].days.indexOf("M")>-1)&&(section.days.indexOf("M")>-1);
    tue = (finalSchedule[i].days.indexOf("T")>-1)&&(section.days.indexOf("T")>-1);
    wed = (finalSchedule[i].days.indexOf("W")>-1)&&(section.days.indexOf("W")>-1);
    thu = (finalSchedule[i].days.indexOf("J")>-1)&&(section.days.indexOf("J")>-1);
    fri = (finalSchedule[i].days.indexOf("F")>-1)&&(section.days.indexOf("F")>-1);
    if (mon || tue || wed || thu || fri){
      dayVal = false;
      break;
    }
  }
  return dayVal;
}
// 3-2-b) Giving two section objects, check the time conflicts
function timeValidation(section){
  var timVal = true;
  for (var i = 0; i < finalSchedule.length; i++){
    var start1 = timeParser(section.start);
    var end1 = timeParser(section.end);
    var start2 = timeParser(finalSchedule[i].start);
    var end2 = timeParser(finalSchedule[i].end);
    //console.log("Comparing " + section.course_name + " " + section.type + " " + section.sections + " and " + finalSchedule[i].course_name + " " + finalSchedule[i].type+ finalSchedule[i].sections + " : " + start1 + " - " + end1 + " and " + start2 + " - " + end2 + "\n" + 
    //          "end1<start2: " + (end1<start2) + "   end2<start1: " + (end2<start1))
    if (!((end1 < start2)||(end2 < start1))) {
      //console.log("Done checking. There is a time conflict.\n")
      return false;
    }
  }
  //console.log("Done checking. There is NO time conflict.\n")
  return true;
}

// 3-2-c) Giving time xx:xx (i.e 10:45) parse it to xxxx (i.e 1045) 
function timeParser(time){
  var parser = time.split(":");
  var final = parseInt((parser[0] + parser[1]));
  return final;
}
generateSchedule();



// RENDER SCHEDULE

var reduceCalendarSize = function(courseArray) {
    // Default is higher/lower that highest/lowest-possible course times
    var lowestTime = 2500;
    var highestTime = 0;
    // Determine earliest start time and latest end time for all courses
    for (var i = 0; i < courseArray.length; i++) {
        if (parseInt(courseArray[i].viewStart) < lowestTime) {
            lowestTime = courseArray[i].viewStart;
        }
        if (parseInt(courseArray[i].viewEnd) > highestTime) {
            highestTime = courseArray[i].viewEnd;
        }
    }
    // Hide all areas of calendar that are before earliest start time or later than latest end time
    $('#calendar-container tbody').children().each(function() {
        if (parseInt($(this).attr('id')) < lowestTime || parseInt($(this).attr('id')) >= highestTime) {
            $(this).hide();
        };
    });
};

var parseDays = function(course) {
    // Function that parses day formats. Eg. '--WT---' into ['We', 'Th']
    var rawDayArray = course.days.split('');
    var stringDayArray = [];
    for (var i = 0; i < rawDayArray.length; i++) {
        if (rawDayArray[i] !== '-') {
            if (i === 0) stringDayArray.push('Mo');
            if (i === 1) stringDayArray.push('Tu');
            if (i === 2) stringDayArray.push('We');
            if (i === 3) stringDayArray.push('Th');
            if (i === 4) stringDayArray.push('Fr');
        }
    }
    return stringDayArray;
};

var addViewTimes = function(course) {
    // Adds new object properties for "view times" in 15-blocks to course objects
    var startArr = course.start.split(':').map(function(i) {
        return parseInt(i);
    });
    var endArr = course.end.split(':').map(function(i) {
        return parseInt(i);
    });
    var startOffset = roundTime(startArr[1]);
    var endOffset = roundTime(endArr[1]);

    var startHour = (startArr[0] + startOffset[0]).toString();
    var endHour = (endArr[0] + endOffset[0]).toString();
    if (startHour.length === 1) {
      startHour = '0' + startHour;
    }
    if (endHour.length === 1) {
      endHour = '0' + endHour;
    }
    course.viewStart = [startHour, startOffset[1]].join('');;
    course.viewEnd = [endHour, endOffset[1]].join('');
    return course;
}

var roundTime = function(minInt) {
    // First elem represents additional hour, second elem represents actual minute
    if (minInt >= 45 + 8) return [1, '00'];
    if (minInt >= 45) return [0, '45'];
    if (minInt >= 30 + 8) return [0, '45'];
    if (minInt >= 30) return [0, '30'];
    if (minInt >= 15 + 8) return [0, '30'];
    if (minInt >= 15) return [0, '15'];
    if (minInt >= 0 + 8) return [0, '15'];
    if (minInt >= 0) return [0, '00'];
}

var calculateBoxHeight = function(course) {
    var viewEndArray = [parseInt(course.viewEnd.slice(0, 2)), parseInt(course.viewEnd.slice(2, 4))];
    var viewStartArray = [parseInt(course.viewStart.slice(0, 2)), parseInt(course.viewStart.slice(2, 4))];
    var endMinusStart = [viewEndArray[0] - viewStartArray[0], viewEndArray[1] - viewStartArray[1]];
    if (endMinusStart[1] < 0) {
        endMinusStart[0] = endMinusStart[0] - 1;
        endMinusStart[1] = 60 + endMinusStart[1];
    }
    var numOfBlock = endMinusStart[0] * 4 + endMinusStart[1] / 15;
    return numOfBlock * 15; // Height of each block is 15px
};

var renderSchedule = function(courseArray) {
    // Adds "view times" to course objects in 15-min blocks as opposed to real course times
    var newCourseArray = [];
    for (var i = 0; i < courseArray.length; i++) {
        newCourseArray.push(addViewTimes(courseArray[i]));
    }
    reduceCalendarSize(newCourseArray);
    for (var i = 0; i < newCourseArray.length; i++) {
        // Draw each box for lecture/tutorial/lab over the schedule
        var arrayOfDays = parseDays(newCourseArray[i]);
        var ids = arrayOfDays.map(function(j) {
            return courseArray[i].viewStart + j
        })
        var c = newCourseArray[i];
        ids.map(function(j) {
            var position = $('#' + j).offset();
            $('#' + j).html('<div id="' + j + '-box" class="course-box"></div>');
            $('#' + j + '-box').offset(position);
            // Calculate each box's height in pixels based on length of course
            var boxHeight = calculateBoxHeight(c);
            $('#' + j + '-box').height(boxHeight);
            // Write course information to boxes
            $('#' + j + '-box').html(c.course_name + '<br/>' + c.days + '<br/>' + c.start + ' - ' + c.end + '<br/>' + c.type + ' - ' + c.sections + '<br/>' + c.room);
        });
        // Add courses to information box
        $('#course-info-list').append('<div class="course"><h3>' + c.course_name + '</h3>' + c.days + ' from ' + c.start + ' to ' + c.end + '<br/>' + c.type + ' - ' + c.sections + ' - ' + c.room + '</div>');
    }
};

renderSchedule(finalSchedule)
console.log(finalSchedule)

$('.modal-coming-soon').click(function(i){
  alert('Feature coming soon!')
});




// on page load, need to fetch student record, preferences
// when student record is clicked, need to updateSequence(); generateSchedule(); renderSchedule();, and store student record
// when preferences is clicked, need to updatePreferences(); generateSchedule(); renderSchedule(); and store preferences



// PROFILE

$('#edit-first-name-input').attr('value', userInfo.first_name);
$('#edit-last-name-input').attr('value', userInfo.last_name);
$('#student-id-input').attr('value', userInfo.id);

$('#edit-first-name').click(function(i){
  if ($('#edit-first-name').hasClass('btn-default')) {
    $('#edit-first-name').removeClass('btn-default').addClass('btn-success').css('color: white;');
    $('#edit-first-name i').removeClass('fa-pencil').addClass('fa-check');
    $('#edit-first-name-input').prop('disabled', false);
  } else {
    $('#edit-first-name').removeClass('btn-success').addClass('btn-default').css('color: black;');
    $('#edit-first-name i').removeClass('fa-check').addClass('fa-pencil');
    $('#edit-first-name-input').prop('disabled', true);
    var url = 'student_record/first_name/'+userInfo.id;
    var newFirstName = $('#edit-first-name-input').val();
    $.ajax({
      type: 'PUT',
      url: url,
      contentType:"application/x-www-form-urlencoded; charset=utf-8",
      data: {
        'first_name': newFirstName
      },
      success: function () {
        console.log('successfully saved first_name to db');
      },
      async: false
    });
  }
});

$('#edit-last-name').click(function(i){
  if ($('#edit-last-name').hasClass('btn-default')) {
    $('#edit-last-name').removeClass('btn-default').addClass('btn-success').css('color: white;');
    $('#edit-last-name i').removeClass('fa-pencil').addClass('fa-check');
    $('#edit-last-name-input').prop('disabled', false);
  } else {
    $('#edit-last-name').removeClass('btn-success').addClass('btn-default').css('color: black;');
    $('#edit-last-name i').removeClass('fa-check').addClass('fa-pencil');
    $('#edit-last-name-input').prop('disabled', true);
    var url = 'student_record/last_name/'+userInfo.id;
    var newLastName = $('#edit-last-name-input').val();
    $.ajax({
      type: 'PUT',
      url: url,
      contentType:"application/x-www-form-urlencoded; charset=utf-8",
      data: {
        'first_name': newLastName
      },
      success: function () {
        console.log('successfully saved last_name to db');
      },
      async: false
    });
  }
});