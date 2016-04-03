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
  var lowestTime = 2500;
  var highestTime = 0;

  courseArray.map(function(i){
    if (parseInt(i.viewStart) < lowestTime) {
      lowestTime = i.viewStart;
    }
    if (parseInt(i.viewEnd) > highestTime) {
      highestTime = i.viewEnd;
    }

    $('#calendar-container table')

  });

};

var parseDays = function (course) {
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

var renderSchedule = function (courseArray) {
  var newCourseArray = [];
  // Add view times
  for(var i = 0; i < courseArray.length; i++) {
    newCourseArray = addViewTimes(courseArray[i]);
  }
  console.log(newCourseArray);
  reduceCalendarSize(newCourseArray);
  for(var i = 0; i < newCourseArray.length; i++) {
    var arrayOfDays = parseDays(newcourse);
    var ids = arrayOfDays.map(function(j){return courseArray[i].viewStart + j})
    console.log('#' + ids);

  }
};
renderSchedule(fallBoxes);


