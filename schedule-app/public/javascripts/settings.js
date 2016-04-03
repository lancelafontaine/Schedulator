// Sidebar collapse/open
$('#sidebar-collapse-div').click(function () {
  if ($('#sidebar-collapse').attr('class').search('right') === -1) {
    // To collapse
    $('#sidebar-collapse').removeClass('fa-angle-double-left').addClass('fa-angle-double-right');
    $('#sidebar').animate({width: '80px'}, 300, function(){
      computeContentWidth()
    });
    $('#settings-content-wrapper').animate({left: '80px'}, 299, function(){});
    $('.sidebar-separator').css('display', 'none');
    $('#sidebar-links').find('span').css('display', 'none');
    $('#sidebar-links').find('.fa').animate({padding: '0 15px 0 30px'}, 300, function () {});
  } else {
    //To open
    $('#sidebar-collapse').removeClass('fa-angle-double-right').addClass('fa-angle-double-left');
    $('#sidebar').animate({width: '300px'}, 300, function(){
      computeContentWidth();
    });300
    $('#settings-content-wrapper').animate({left: '300px'}, 299, function(){});
    $('.sidebar-separator').css('display', 'block');
    $('#sidebar-links').find('span').css('display', 'inline');
    $('#sidebar-links').find('.fa').animate({padding: '0 15px 0 10px'}, 300, function () {});  }
});

// UI fixes
$('#sidebar-collapse-div').hover(function () {
  $('#sidebar-collapse').addClass('sidebar-collapse-bigger')
}, function () {
  $('#sidebar-collapse').removeClass('sidebar-collapse-bigger')
});

$('.sidebar-link').hover(function () {
  $(this).find('.fa').css('font-size', '23px');
  $(this).find('span').css('font-size', '17px');
}, function () {
  $(this).find('.fa').css('font-size', '20px');
  $(this).find('span').css('font-size', '15px');});

// Computing heights and widths of page
var computePageHeight = function () {
  var windowHeight = $(window).height();
  var headerHeight = $('#setting-header').height();
  $('#settings-wrapper').height(windowHeight - headerHeight);
  $('#sidebar').height(windowHeight - headerHeight);
};
var computeContentWidth = function () {
  var windowWidth = $(window).width();
  var sidebarWidth = $('#sidebar').width();
  $('#settings-content-wrapper').width(windowWidth - sidebarWidth)
};
computePageHeight()
computeContentWidth()

// showing containers by clicking on link
$('.container').css('display', 'none');
$('#schedule-container').css('display', 'block');

var showContainer = function (string) {
  var containerId = '#' + string + '-container';
  $('.container').css('display', 'none');
  $(containerId).css('display', 'block');
}

//schedule logic
var fallBoxes = [{
  "course_name": "COMP 232",
  "type":"Tut",
  "sections":"DDDA",
  "days":"--W----",
  "start":"20:30",
  "end":"22:10",
  "room":"H 431",
  "semester":"fall"
}];

var reduceCalendarSize = function (courseArray) {
  // Default is higher/lower that highest/lowest-possible course times
  var lowestTime = 2500;
  var highestTime = 0;
  // Determine earliest start time and latest end time for all courses
  for(var i = 0; i < courseArray.length; i++) {
    if (parseInt(courseArray[i].viewStart) < lowestTime) {
      lowestTime = courseArray[i].viewStart;
    }
    if (parseInt(courseArray[i].viewEnd) > highestTime) {
      highestTime = courseArray[i].viewEnd;
    }
  }
  // Hide all areas of calendar that are before earliest start time or later than latest end time
  $('#calendar-container tbody').children().each(function () {
    if(parseInt($(this).attr('id')) < lowestTime || parseInt($(this).attr('id')) >= highestTime ) {
      $(this).hide();
    };
  });
};

var parseDays = function (course) {
  // Function that parses day formats. Eg. '--WT---' into ['We', 'Th']
  var rawDayArray = course.days.split('');
  var stringDayArray = [];
  for(var i = 0; i < rawDayArray.length; i++) {
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

var addViewTimes = function (course) {
  // Adds new object properties for "view times" in 15-blocks to course objects
  var startArr = course.start.split(':').map(function(i){return parseInt(i);});
  var endArr = course.end.split(':').map(function(i){return parseInt(i);});
  var startOffset = roundTime(startArr[1]);
  var endOffset = roundTime(endArr[1]);
  course.viewStart = [startArr[0] + startOffset[0], startOffset[1]].join('');;
  course.viewEnd = [endArr[0] + endOffset[0], endOffset[1]].join('');
  return course;
}

var roundTime = function (minInt) {
  // First elem represents additional hour, second elem represents actual minute
  if (minInt >= 45+8) return [1, 00];
  if (minInt >= 45) return [0, 45];
  if (minInt >= 30+8) return [0, 45];
  if (minInt >= 30) return [0, 30];
  if (minInt >= 15+8) return [0,30];
  if (minInt >= 15) return [0, 15];
  if (minInt >= 0+8) return [0,15];
  if (minInt >= 0) return [0,00];
}

var calculateBoxHeight = function (course) {
  var viewEndArray = [parseInt(course.viewEnd.slice(0,2)),parseInt(course.viewEnd.slice(2,4))];
  var viewStartArray = [parseInt(course.viewStart.slice(0,2)),parseInt(course.viewStart.slice(2,4))];
  var endMinusStart = [viewEndArray[0] - viewStartArray[0], viewEndArray[1] - viewStartArray[1]];
  if (endMinusStart[1] < 0) {
    endMinusStart[0] = endMinusStart[0] - 1;
    endMinusStart[1] = 60 + endMinusStart[1];
  }
  var numOfBlock = endMinusStart[0] * 4 + endMinusStart[1] / 15;
  return numOfBlock * 15; // Height of each block is 15px
};

var renderSchedule = function (courseArray) {
  // Adds "view times" to course objects in 15-min blocks as opposed to real course times
  var newCourseArray = [];
  for(var i = 0; i < courseArray.length; i++) {
    newCourseArray.push(addViewTimes(courseArray[i]));
  }
  reduceCalendarSize(newCourseArray);
  for(var i = 0; i < newCourseArray.length; i++) {
    // Draw each box for lecture/tutorial/lab over the schedule
    var arrayOfDays = parseDays(newCourseArray[i]);
    var ids = arrayOfDays.map(function(j){return courseArray[i].viewStart + j})
    ids.map(function(j){
      var position = $('#'+j).offset();
      $('#'+j).html('<div id="'+j+'-box" class="course-box"></div>');
      $('#'+j+'-box').offset(position);
      // Calculate each box's height in pixels based on length of course
      var boxHeight = calculateBoxHeight(newCourseArray[i]);
      $('#'+j+'-box').height(boxHeight);
      // Write course information to boxA
      var c = newCourseArray[i];
      console.log(c);
      $('#'+j+'-box').html(c.course_name+'<br/>'+c.days+'<br/>'+c.start+' - '+c.end+'<br/>'+c.type+' - '+c.sections+'<br/>'+c.room)

    });
  }
};
renderSchedule(fallBoxes);


