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



//schedule logic
var fallBoxes = [{
    "course_name": "SOEN 344",
    "type": "Tut",
    "sections": "S SB",
    "days": "---J---",
    "start": "14:45",
    "end": "15:35",
    "room": "H 544",
    "semester": "winter"
}, {
    "course_name": "SOEN 344",
    "type": "Lec",
    "sections": "S",
    "days": "-T-J---",
    "start": "13:15",
    "end": "14:30",
    "room": "H 407",
    "semester": "winter"
}, {
    "course_name": "SOEN 345",
    "type": "Tut",
    "sections": "S SB",
    "days": "--W----",
    "start": "17:45",
    "end": "18:35",
    "room": "H905 *",
    "semester": "winter"
}, {
    "course_name": "SOEN 345",
    "type": "Lec",
    "sections": "S",
    "days": "M-W----",
    "start": "14:45",
    "end": "16:00",
    "room": "H 620",
    "semester": "winter"
}, {
    "course_name": "SOEN 331",
    "type": "Tut",
    "sections": "W WB",
    "days": "----F--",
    "start": "14:15",
    "end": "16:05",
    "room": "H 611",
    "semester": "winter"
}, {
    "course_name": "SOEN 331",
    "type": "Lec",
    "sections": "U",
    "days": "-T-J---",
    "start": "16:15",
    "end": "17:30",
    "room": "FG C080",
    "semester": "winter"
}, {
    "course_name": "COMP 346",
    "type": "Lec",
    "sections": "WW",
    "days": "-T-----",
    "start": "17:45",
    "end": "20:15",
    "room": "H 407",
    "semester": "winter"
}, {
    "course_name": "COMP 346",
    "type": "Tut",
    "sections": "WWWB",
    "days": "----F--",
    "start": "13:15",
    "end": "14:05",
    "room": "H967 *",
    "semester": "winter"
}, {
    "course_name": "COMP 346",
    "type": "Lab",
    "sections": "WI-X",
    "days": "-T-----",
    "start": "21:30",
    "end": "23:20",
    "room": "H929 *",
    "semester": "winter"
}, ];

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

/*
js for preference page
*/
//hide the message block
$('#feedbackWindow').hide();
//Change color and add css class when clicked
$('td').click(function(){
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
//Submit JSON object
$("#subRef").click(function(){
    var JSON_obj = {};
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
    JSON_obj.semester = term;
    JSON_obj.courseLoad = cl;
    JSON_obj.monday = (days.match(/MONDAY/) ? true : false);
    JSON_obj.tuesday = (days.match(/TUESDAY/) ? true : false);
    JSON_obj.wednesday = (days.match(/WEDNESDAY/) ? true : false);
    JSON_obj.thursday = (days.match(/THURSDAY/) ? true : false);
    JSON_obj.friday = (days.match(/FRIDAY/) ? true : false);
    JSON_obj.morning = (time.match(/MORNING/) ? true : false);
    JSON_obj.afternoon = (time.match(/AFTERNOON/) ? true : false);
    JSON_obj.night = (time.match(/NIGHT/) ? true : false);
    JSON_obj.swg = (location.match(/SWG/) ? true : false);
    JSON_obj.loyola = (location.match(/LOYOLA/) ? true : false);
    JSON_obj.online = (location.match(/ONLINE/) ? true : false);
    pref = JSON_obj;
    //Show message
    $('#subRef').fadeOut(500);
    $('#feedbackWindow').addClass('centeredText');
    $('#feedbackWindow').text("You have successfully changed the preference! Refreshing in 5 seconds.");
    $('#feedbackWindow').show(1500, "swing");
    srValidation();
    setInterval('window.location.reload()', 5000); 
});
