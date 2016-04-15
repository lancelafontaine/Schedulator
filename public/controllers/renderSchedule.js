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