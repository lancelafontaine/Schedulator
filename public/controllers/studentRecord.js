var findPreAdd = function(course) {
    for (var i = 0; i < prereqInfo.length; i++) {
        if (prereqInfo[i].course_name == course) {
            if (prereqInfo[i].prequisites) {
                var preArray = prereqInfo[i].prequisites.split(', ');
                for (var j = 0; j < preArray.length; j++) {
                    findPreAdd(preArray[j]);
                    if (checkRep(preArray[j]) == false) {
                        studentRecord.push(preArray[j]);
                    }
                }
            } else {
                if (checkRep(course) == false) {
                    studentRecord.push(course);
                }
            }
        }
    }
}

var checkRep = function(course) {
    var rep = false;
    for (var i = 0; i < studentRecord.length; i++) {
        if (studentRecord[i] == course) {
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
prereqInfo.map(function(i) {
    courseSet[i.course_name] = i.course_description;
});
for (key in courseSet) {
    $('#student-record-available-course-list').append('<li id="student-record-' + key.replace(' ', '') + '" class="student-record-course"><a class="student-record-available-course">' + key + '</a></li>');
}


var renderUI = function(array) {
        // remove them from available courses list
        array.map(function(i) {
            var id = '#student-record-' + i.replace(' ', '');
            $(id).hide();
        });

        //add them to taken courses list
        var htmlString = '';
        array.map(function(i) {
            var htmlLine = '<li class="student-record-taken-course">' + i.trim() + '</li>'
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
        if (studentRecord[i] === courseID) {
            isClickedCourseInArray = true;
        }
    }
    if (!isClickedCourseInArray) {
        studentRecord.push(courseID);
    }
    console.log(studentRecord);

    renderUI(studentRecord);

    // Diff new student record against old one
    var tempOldStudentRecord = JSON.parse(getJSON("courses_completed/" + userInfo.id + "/"));
    var oldStudentRecord = tempOldStudentRecord.map(function(i) {
        return i.course_id
    });

    var diff = studentRecord.diffArrays(oldStudentRecord);
    console.log(diff);

    //Save all new student record courses to db
    var saveStudentRecordURL = "courses_completed/"
    diff.map(function(i) {
        try {
            var course_id = i
            var course_name = ''
            var credits = '';
            prereqInfo.map(function(j) {
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
                success: function() {
                    console.log('successfully saved to db');
                },
                async: false
            });
        } catch (e) {
            console.log('there was an error finding the course...')
        }
    });
    updateSequence();
    generateSchedule();
    renderSchedule(finalSchedule);
});