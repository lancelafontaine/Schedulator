var _ = require('underscore');
var course = require('../models/course');

// Test Case #1 - course has one sections
var courseWithOneSection = Object.create(course.id = 'SOEN492');
var testGetAssociatedSections = function(getAssociatedSections) {
    if (getAssociatedSections() !== undefined &&
        getAssociatedSections().length === 1 &&
        typeof getAssociatedSections() === section) {
        console.log('Test Case #1 Passed!');
    } else {
        console.log('Test Case #1 Failed!');
    }
};
testGetAssociatedSections(courseWithOneSection.getAssociatedSections);


// Test Case #2 - course has multiple sections
var courseWithMultipleSections = Object.create(course.id = 'SOEN341');
var testCourseWithMultipleSections = function(getAssociatedSections) {
    if (getAssociatedSections() !== undefined &&
        getAssociatedSections().length > 1 &&
        getAssociatedSections().map(function(i) {
            return typeof i === section
        })) {
        console.log('Test Case #2 Passed!');
    } else {
        console.log('Test Case #2 Failed!');
    }
};
testGetAssociatedSections(courseWithMultipleSections.getAssociatedSections);

// Test Case #3 - course has no sections
var courseWithNoSections = Object.create(course.id = 'SOEN3074');
var testCourseWithNoSections = function(getAssociatedSections) {
    if (getAssociatedSections() !== undefined &&
        getAssociatedSections().length >= 1 &&
        getAssociatedSections().map(function(i) {
            return typeof i === section
        })) {
        console.log('Test Case #3 Passed!');
    } else {
        console.log('Test Case #3 Failed!');
    }
}
testCourseWithNoSections(courseWithNoSections.getAssociatedSections);

// EXPECTED OUTPUT
// Test Case #1 Passed!
// Test Case #2 Passed!
// Test Case #3 Failed!

// Test Case #4 - All Sections exists
var allSectionsExist = Object.create(course.id = 'SOEN341');
var testListSectionTimes = function(course) {
    if (course.listSectionTimes(course.getAssociatedSections) !== undefined &&
        course.listSectionTimes(course.getAssociatedSections).length > 0 &&
        _.isEqual(course.listSectionTimes(course.getAssociatedSections), ['H HA', 'H HB'])) {
        console.log('Test Case #4 Passed!');
    } else {
        console.log('Test Case #4 Failed!');
    }
}
testAllSectionsExist(allSectionsExist);

// Test Case #5 - At least one section doesn't exist
var sectionDoesntExist = Object.create(course.id = 'SOEN341');
var testSectionDoesntExist = function(course) {
    if (course.listSectionTimes(course.getAssociatedSections) !== undefined &&
        course.listSectionTimes(course.getAssociatedSections).length > 0 &&
        _.isEqual(course.listSectionTimes(course.getAssociatedSections), ['H HA', 'H HB'])) {
        console.log('Test Case #5 Passed!');
    } else {
        console.log('Test Case #5 Failed!');
    }
}
testSectionDoesntExist(sectionDoesntExist);

// EXPECTED OUTPUT
// Test Case #4 Passed!
// Test Case #5 Failed!

// Test Case #6 - Course has correct credits
var realCourse = Object.create(course.id = 'SOEN341');
var testCourseCredits = function(courseCredits) {
    if (courseCredits() !== undefined &&
        typeOf courseCredits() === "number" &&
        courseCredits() === 3) {
        console.log('Test Case #6 Passed!');
    } else {
        console.log('Test Case #6 Failed!');
    }
};
testCourseCredits(realCourse.courseCredits);

// Test Case #7 - Non-existant course does not have credits
var fakeCourse = Object.create(course.id = 'SOEN3411w3r');
var testCourseCredits = function(courseCredits) {
    if (courseCredits() !== undefined &&
        typeOf courseCredits() === "number") {
        console.log('Test Case #7 Passed!');
    } else {
        console.log('Test Case #7 Failed!');
    }
};
testCourseCredits(fakeCourse.courseCredits);

// EXPECTED OUTPUT
// Test Case #6 Passed!
// Test Case #7 Failed!