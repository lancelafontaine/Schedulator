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

//schedule logic

var fallBoxes = [];
//{
//     "course_name": "COMP 346",
//     "type": "Lab",
//     "sections": "WI-X",
//     "days": "-T-----",
//     "start": "21:30",
//     "end": "23:20",
//     "room": "H929 *",
//     "semester": "winter"
// },

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
    course.viewStart = [startArr[0] + startOffset[0], startOffset[1]].join('');;
    course.viewEnd = [endArr[0] + endOffset[0], endOffset[1]].join('');
    return course;
}

var roundTime = function(minInt) {
    // First elem represents additional hour, second elem represents actual minute
    if (minInt >= 45 + 8) return [1, 00];
    if (minInt >= 45) return [0, 45];
    if (minInt >= 30 + 8) return [0, 45];
    if (minInt >= 30) return [0, 30];
    if (minInt >= 15 + 8) return [0, 30];
    if (minInt >= 15) return [0, 15];
    if (minInt >= 0 + 8) return [0, 15];
    if (minInt >= 0) return [0, 00];
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
        $('#course-info-list').append('<div class="course"><button class="btn btn-danger btn-sm course-remove"><i class="fa fa-times"></i></button><h3>' + c.course_name + '</h3>' + c.days + ' from ' + c.start + ' to ' + c.end + '<br/>' + c.type + ' - ' + c.sections + ' - ' + c.room + '</div>');
    }
};
renderSchedule(fallBoxes);

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
  // render courses in completed list that are already in student record
  // remove them from available courses list
  array.map(function(i){
    var id = '#student-record-'+i.replace(' ','');
    $(id).hide();
  });

  //add them to taken courses list
  var htmlString = '';
  array.map(function(i){
    var htmlLine = '<li class="student-record-taken-course">'+i.replace(' ','')+'</li>'
    htmlString += htmlLine;
  });
  $('#student-record-taken-courses').html(htmlString);
}
console.log(studentRecord)
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
});





// //The function to fetch JSON from db
// function getJSON(yourUrl){
//     var Httpreq = new XMLHttpRequest(); // a new request
//     Httpreq.open("GET",yourUrl,false);
//     Httpreq.send(null);
//     return Httpreq.responseText;
// }
// /*************************************************************************************************************
// **************************************************Variables***************************************************
// *************************************************************************************************************/
// var finalSchedule = []; //should store the final schedule
// var pref = {};          //should store the preference
// var prereqInfo = JSON.parse(getJSON("http://localhost:3000/prereq")); //get the course list with prereq
// var scheduleInfo = JSON.parse(getJSON("http://localhost:3000/courses")); //get the course list with detail info
// var finalSequence = JSON.parse(getJSON("http://localhost:3000/sequence")); //get the sequence with boolean "taken"
// var studentRecord = JSON.parse(getJSON("http://localhost:3000/courses_completed/1111")); //get the student record 
// 
// /*************************************************************************************************************
// ****************************************************Methods***************************************************
// *************************************************************************************************************/
// //Main algorithm to 
// //1) get the student record from database, modify it by adding the missing prereqs, and then save back to database 
// //2) change the boolean "taken" based on the student record
// //3) generate the schedule based on all information
// function main(){
//   for (var i = 0; i < studentRecord.length; i++){
//     findPreAdd(studentRecord[i].course_name);                   // 1) modify student record
//   }
//   //do something here to save the new student record            // 1) save to database
//   modifySequence();                                             // 2) change the sequence's booleans
//   generateSchedule();                                           // 3) generate the schedule
// }
// 
// //1) find the missing prereqs and add them to student record
// function findPreAdd(course){
//   for (var i = 0; i < prereqInfo.length; i++){
//     if (prereqInfo[i].course_name == course){
//       if (prereqInfo[i].prequisites){
//         var preArray = prereqInfo[i].prequisites.split(', ');
//         for (var j = 0; j < preArray.length; j++){
//           findPreAdd(preArray[j]);
//           if (checkRep(preArray[j])==false){
//             studentRecord.push(preArray[j]);
//           }
//         }
//       }
//       else{
//         if (checkRep(course)==false){
//           studentRecord.push(course);
//         }
//       }
//     }
//   }
// }
// 
// // 1-a) Check if there is any replication
// function checkRep(course){
//   var rep = false;
//   for (var i = 0; i < studentRecord.length; i++){
//     if (studentRecord[i] == course){
//       rep = true;
//       break;
//     }
//   }
//   return rep;
// }
// 
// // 2) Change the boolean of the sequence based on the new student record
// function modifySequence(){
//   for (var i = 0; i < studentRecord.length; i++){
//     for (var j = 0; j < finalSequence.length; j++){
//       if (studentRecord[i] == finalSequence[j].course_name){
//         finalSequence[j].taken = true;
//       }
//     }
//   }
// }
// 
// 
// // 3) Generate the schedule
// function generateSchedule(){
//   // 3-1) Generate an array of valid courses for this semester
//   var available = [];
//   for (var i = 0; i < finalSequence.length; i++){
//     if (finalSequence[i].taken == false){ 
//       var check = courseValidation(finalSequence[i].course_name); //check if 1) prereqs are meet 2) offer in this semester
//       if (check == true){
//         var sectionSets = generateSectionSets(finalSequence[i].course_name);
//         available.push(sectionSets);
//       }
//     }
//   }
//   // 3-2) UNFINISHED: generate the schedule based on the valid course list
//   // This requires timeValidation();
//   finalSchedule = available;
// }
// 
// // 3-1-a) Check prereqs and semester availability
// function courseValidation(course){
//   var valid = true;
//   if (prerequisitesValidation(course)==false){
//     valid = false;
//   }
//   if (semesterValidation(course)==false){
//     valid = false;
//   }
//   return valid;
// }
// 
// // 3-1-b) check prereqs
// function semesterValidation(course){
//   //var web = "http://localhost:3000/courses/" + course; //make this generic after
//   var semVal = false;
//   var sem = pref.semester;
//   var array = scheduleInfo;
//   for (var i = 0; i < array.length; i++){
//     if (array[i].course_name == course && array[i].semester == sem){
//       semVal = true;
//       break;
//     }
//   }
//   return semVal;
// }
// 
// // 3-1-c) check semester
// function prerequisitesValidation(course){
//   var preVal = false;
//   var arr = [];
//   //get prerequisites of the course (maximum one level down)
//   for (var i = 0; i < prereqInfo; i++){
//     if (prereqInfo[i].course_name == course){
//       if (prereqInfo[i].prequisites){
//         arr = prereqInfo[i].prequisites.split(', ');
//       }
//     }
//   }
//   //check prereq based on student record
//   if (arr.length!=0){
//     for (var j = 0; j < arr.length; j++){
//       for (var k = 0; k < studentRecord.length; k++){
//         if (arr[j]==studentRecord[k]){
//           preVal = true;
//           break;
//         }
//       }
//     }
//   }
//   else{
//   	preVal = true;
//   }
//   return preVal;
// }
// 
// // 3-1-d) Generate an array of valid courses
// // This array is generated AFTER semester/prereqs validation
// // Hirachy: 
// // powerSet = [sectionSet1, sectionSet2, sectionSet3 ...]
// // sectionSet = {"lecture":section1, "tutorial":section2, "lab":section3}
// // section = {"location":"..", "course_name": "..." ....}
// function generateSectionSets(course){
//   var lecture = [];
//   var tutorial = [];
//   var lab = [];
//   var array = scheduleInfo;
//   for (var i = 0; i < array.length; i++){
//     if (array[i].course_name == course && array[i].type == "Lec"){
//       lecture.push(array[i]);
//     }
//     if (array[i].course_name == course && array[i].type == "Tut"){
//       tutorial.push(array[i]);
//     }
//     if (array[i].course_name == course && array[i].type == "Lab"){
//       lab.push(array[i])
//     }
//   }
//   var powerSet = [];
//   for (var l = 0; l < lecture.length; l++){
//     var sectionSet = {};
//     sectionSet.lecture = lecture[l];
//     sectionSet.tutorial = "";
//     sectionSet.lab = "";
//     if (tutorial.length!=0){
//       for (var m = 0; m < tutorial.length; m++){
//         sectionSet.tutorial = tutorial[m];
//           if (lab.length!=0){
//             for (var n = 0; n < lab.length; n++){
//               sectionSet.lab = lab[n];
//               powerSet.push(sectionSet);
//           }
//           }
//           else{
//             powerSet.push(sectionSet);
//           }
//       }
//     }
//     else{
//       powerSet.push(sectionSet);
//     }
//   }
//   return powerSet;
// }
// 
// // 3-2) Check time validation within the valid course list
// function timeValidation(){
//   //UNFINISHED
// }
// 
// 
// 
// 
// /* This is a format to get the property of sections!
// *****************************************************
// for (var x = 0; x < finalSchedule.length; x++){
// 	for (var y = 0; y < finalSchedule[x].length; y++){
// 		console.log(finalSchedule[x][y].lecture.course_name + " " + 
// 		finalSchedule[x][y].lecture.start + " " + 
// 		finalSchedule[x][y].lecture.end + "\nTutorial " + 
// 		finalSchedule[x][y].tutorial.start + " " + 
// 		finalSchedule[x][y].tutorial.end + "\nLab " + 
// 		finalSchedule[x][y].lab.start + " " + 
// 		finalSchedule[x][y].lab.end)
// 	}
// }
// *****************************************************/
