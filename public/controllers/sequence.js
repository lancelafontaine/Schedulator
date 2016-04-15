var updateSequence = function() {
    // Adds ID's to the font-awesome tags so they can be changed later
    $('.sequence-row').each(function(i) {
        var sequenceCourseName = $(this).find('.sequence-course-name').text().replace(/\s/g, '');
        $(this).find('.sequence-changeable').attr('id', 'sequence-' + sequenceCourseName);
    });

    // Make sure that all of the tags are red first
    $('.sequence-changeable').attr('style', 'color: red;')

    // Change the boolean of the final sequence based on the new student record
    for (var i = 0; i < studentRecord.length; i++) {
        for (var j = 0; j < finalSequence.length; j++) {
            if (studentRecord[i] == finalSequence[j].course_name) {
                finalSequence[j].taken = true;
            }
        }
    }

    // All taken courses should be make green instead and should have a check instead.
    finalSequence.map(function(i) {
        if (i.taken === true) {
            var sequenceId = '#sequence-' + i.course_name.replace(/\s/g, '');
            $(sequenceId).attr('style', 'color:green;').removeClass('fa-times-circle').addClass('fa-check-circle')
        }
    });

}
updateSequence();