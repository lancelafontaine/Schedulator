function modifySequence() {
    for (var i = 0; i < studentRecord.length; i++) {
        for (var j = 0; j < finalSequence.length; j++) {
            if (studentRecord[i] == finalSequence[j].course_name) {
                finalSequence[j].taken = true;
            }
        }
    }
}

var finalSchedule = [];

function generateSchedule() {
    var available = [];
    for (var i = 0; i < finalSequence.length; i++) {
        if (finalSequence[i].taken == "false") {
            var check = courseValidation(finalSequence[i].course_name); //check if 1) prereqs are meet 2) offer in this semester
            if (check) {
                var sectionSets = generateSectionSets(finalSequence[i].course_name);
                available.push(sectionSets);
            }
        }
    }
    var scheduleSets = [];
    for (var x = 0; x < available[0].length; x++) {
        if (finalSchedule.length == 0 && available.length != 0) {
            finalSchedule.push(available[0][x].lecture);
            if (available[0][x].tutorial) {
                finalSchedule.push(available[0][x].tutorial);
            }
            if (available[0][x].lab) {
                finalSchedule.push(available[0][x].lab);
            }
        }
        var courseLimit = 1;
        for (var j = 1; j < available.length; j++) {
            if (courseLimit < pref.courseLoad) {
                for (var k = 0; k < available[j].length; k++) {
                    var timeConflict = true;
                    var dayConflict = dayValidation(available[j][k].lecture);
                    if (available[j][k].tutorial) dayConflict = (dayValidation(available[j][k].lecture) && dayValidation(available[j][k].tutorial))
                    if (available[j][k].lab) dayConflict = (dayValidation(available[j][k].lecture) && dayValidation(available[j][k].tutorial) && dayValidation(available[j][k].lab));
                    if (!dayConflict) {
                        var timeConflict1 = timeValidation(available[j][k].lecture);
                        var timeConflict2 = true;
                        var timeConflict3 = true;
                        if (available[j][k].tutorial) {
                            timeConflict2 = timeValidation(available[j][k].tutorial);
                        }
                        if (available[j][k].lab) {
                            timeConflict3 = timeValidation(available[j][k].lab);
                        }
                        timeConflict = timeConflict1 && timeConflict2 && timeConflict3;
                    }
                    if (timeConflict) {
                        finalSchedule.push(available[j][k].lecture);
                        if (available[j][k].tutorial) {
                            finalSchedule.push(available[j][k].tutorial);
                        }
                        if (available[j][k].lab) {
                            finalSchedule.push(available[j][k].lab);
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
    for (var g = 0; g < scheduleSets.length; g++) {
        if ((g != index) && (scheduleSets[g].length > scheduleSets[index])) index = g;
    }
    finalSchedule = scheduleSets[index];
}

function courseValidation(course) {
    var preCheck = prerequisitesValidation(course);
    var semCheck = semesterValidation(course);
    return preCheck && semCheck;
}

function semesterValidation(course) {
    var semVal = false;
    var sem = pref.semester;
    var array = scheduleInfo;
    for (var i = 0; i < array.length; i++) {
        if (array[i].course_name == course && array[i].semester == sem) {
            semVal = true;
            break;
        }
    }
    return semVal;
}

function prerequisitesValidation(course) {
    var preVal = false;
    var arr = [];
    for (var i = 0; i < prereqInfo.length; i++) {
        if (prereqInfo[i].course_name == course) {
            if (prereqInfo[i].prequisites) {
                arr = prereqInfo[i].prequisites.split(", ");
            }
        }
    }
    if (arr.length != 0) {
        for (var j = 0; j < arr.length; j++) {
            for (var k = 0; k < studentRecord.length; k++) {
                if (arr[j] == studentRecord[k]) {
                    preVal = true;
                    break;
                }
            }
        }
    } else {
        preVal = true;
    }
    return preVal;
}

function generateSectionSets(course) {
    var lecture = [];
    var tutorial = [];
    var lab = [];
    var array = scheduleInfo;
    for (var i = 0; i < array.length; i++) {
        if (array[i].course_name == course && array[i].type == "Lec" && array[i].semester == pref.semester) {
            lecture.push(array[i]);
        }
        if (array[i].course_name == course && array[i].type == "Tut" && array[i].semester == pref.semester) {
            tutorial.push(array[i]);
        }
        if (array[i].course_name == course && array[i].type == "Lab" && array[i].semester == pref.semester) {
            lab.push(array[i])
        }
    }
    var powerSet = [];
    for (var l = 0; l < lecture.length; l++) {
        var sectionSet = {};
        sectionSet.lecture = lecture[l];
        sectionSet.tutorial = "";
        sectionSet.lab = "";
        for (var m = 0; m < tutorial.length; m++) {
            sectionSet.tutorial = tutorial[m];
            for (var n = 0; n < lab.length; n++) {
                sectionSet.lab = lab[n];
            }
        }
        powerSet.push(sectionSet);
    }
    return powerSet;
}

function dayValidation(section) {
    var mon = false;
    var tue = false;
    var wed = false;
    var thu = false;
    var fri = false;
    var dayVal = true;
    for (var i = 0; i < finalSchedule.length; i++) {
        mon = (finalSchedule[i].days.indexOf("M") > -1) && (section.days.indexOf("M") > -1);
        tue = (finalSchedule[i].days.indexOf("T") > -1) && (section.days.indexOf("T") > -1);
        wed = (finalSchedule[i].days.indexOf("W") > -1) && (section.days.indexOf("W") > -1);
        thu = (finalSchedule[i].days.indexOf("J") > -1) && (section.days.indexOf("J") > -1);
        fri = (finalSchedule[i].days.indexOf("F") > -1) && (section.days.indexOf("F") > -1);
        if (mon || tue || wed || thu || fri) {
            dayVal = false;
            break;
        }
    }
    return dayVal;
}

function timeValidation(section) {
    var timVal = true;
    for (var i = 0; i < finalSchedule.length; i++) {
        var start1 = timeParser(section.start);
        var end1 = timeParser(section.end);
        var start2 = timeParser(finalSchedule[i].start);
        var end2 = timeParser(finalSchedule[i].end);
        if (!((end1 < start2) || (end2 < start1))) {
            return false;
        }
    }
    return true;
}

function timeParser(time) {
    var parser = time.split(":");
    var final = parseInt((parser[0] + parser[1]));
    return final;
}
generateSchedule();