$('#edit-first-name-input').attr('value', userInfo.first_name);
$('#edit-last-name-input').attr('value', userInfo.last_name);
$('#student-id-input').attr('value', userInfo.id);

$('#edit-first-name').click(function(i) {
    if ($('#edit-first-name').hasClass('btn-default')) {
        $('#edit-first-name').removeClass('btn-default').addClass('btn-success').css('color: white;');
        $('#edit-first-name i').removeClass('fa-pencil').addClass('fa-check');
        $('#edit-first-name-input').prop('disabled', false);
    } else {
        $('#edit-first-name').removeClass('btn-success').addClass('btn-default').css('color: black;');
        $('#edit-first-name i').removeClass('fa-check').addClass('fa-pencil');
        $('#edit-first-name-input').prop('disabled', true);
        var url = 'student_record/first_name/' + userInfo.id;
        var newFirstName = $('#edit-first-name-input').val();
        $.ajax({
            type: 'PUT',
            url: url,
            contentType: "application/x-www-form-urlencoded; charset=utf-8",
            data: {
                'first_name': newFirstName
            },
            success: function() {
                console.log('successfully saved first_name to db');
            },
            async: false
        });
    }
});

$('#edit-last-name').click(function(i) {
    if ($('#edit-last-name').hasClass('btn-default')) {
        $('#edit-last-name').removeClass('btn-default').addClass('btn-success').css('color: white;');
        $('#edit-last-name i').removeClass('fa-pencil').addClass('fa-check');
        $('#edit-last-name-input').prop('disabled', false);
    } else {
        $('#edit-last-name').removeClass('btn-success').addClass('btn-default').css('color: black;');
        $('#edit-last-name i').removeClass('fa-check').addClass('fa-pencil');
        $('#edit-last-name-input').prop('disabled', true);
        var url = 'student_record/last_name/' + userInfo.id;
        var newLastName = $('#edit-last-name-input').val();
        $.ajax({
            type: 'PUT',
            url: url,
            contentType: "application/x-www-form-urlencoded; charset=utf-8",
            data: {
                'first_name': newLastName
            },
            success: function() {
                console.log('successfully saved last_name to db');
            },
            async: false
        });
    }
});