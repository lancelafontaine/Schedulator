//hide the message block
$('#feedbackWindow').hide();
//Change color and add css class when clicked
$('.prefContent').click(function() {
    //summer only
    if ($(this).attr('id') == 'term1') {
        if ($('#term2').hasClass('stayclicked')) {
            $('#term2').removeClass('stayclicked');
            $('#term2').addClass('prefContent');
        }
        if ($('#term3').hasClass('stayclicked')) {
            $('#term3').removeClass('stayclicked');
            $('#term3').addClass('prefContent');
        }
    }
    //fall only
    if ($(this).attr('id') == 'term2') {
        if ($('#term1').hasClass('stayclicked')) {
            $('#term1').removeClass('stayclicked');
            $('#term1').addClass('prefContent');
        }
        if ($('#term3').hasClass('stayclicked')) {
            $('#term3').removeClass('stayclicked');
            $('#term3').addClass('prefContent');
        }
    }
    //winter only
    if ($(this).attr('id') == 'term3') {
        if ($('#term2').hasClass('stayclicked')) {
            $('#term2').removeClass('stayclicked');
            $('#term2').addClass('prefContent');
        }
        if ($('#term1').hasClass('stayclicked')) {
            $('#term1').removeClass('stayclicked');
            $('#term1').addClass('prefContent');
        }
    }
    //3 courses only
    if ($(this).attr('id') == 'load1') {
        if ($('#load2').hasClass('stayclicked')) {
            $('#load2').removeClass('stayclicked');
            $('#load2').addClass('prefContent');
        }
        if ($('#load3').hasClass('stayclicked')) {
            $('#load3').removeClass('stayclicked');
            $('#load3').addClass('prefContent');
        }
        if ($('#load4').hasClass('stayclicked')) {
            $('#load4').removeClass('stayclicked');
            $('#load4').addClass('prefContent');
        }
    }
    //4 courses only
    if ($(this).attr('id') == 'load2') {
        if ($('#load1').hasClass('stayclicked')) {
            $('#load1').removeClass('stayclicked');
            $('#load1').addClass('prefContent');
        }
        if ($('#load3').hasClass('stayclicked')) {
            $('#load3').removeClass('stayclicked');
            $('#load3').addClass('prefContent');
        }
        if ($('#load4').hasClass('stayclicked')) {
            $('#load4').removeClass('stayclicked');
            $('#load4').addClass('prefContent');
        }
    }
    //5 courses only
    if ($(this).attr('id') == 'load3') {
        if ($('#load2').hasClass('stayclicked')) {
            $('#load2').removeClass('stayclicked');
            $('#load2').addClass('prefContent');
        }
        if ($('#load1').hasClass('stayclicked')) {
            $('#load1').removeClass('stayclicked');
            $('#load1').addClass('prefContent');
        }
        if ($('#load4').hasClass('stayclicked')) {
            $('#load4').removeClass('stayclicked');
            $('#load4').addClass('prefContent');
        }
    }
    //6 courses only
    if ($(this).attr('id') == 'load4') {
        if ($('#load2').hasClass('stayclicked')) {
            $('#load2').removeClass('stayclicked');
            $('#load2').addClass('prefContent');
        }
        if ($('#load3').hasClass('stayclicked')) {
            $('#load3').removeClass('stayclicked');
            $('#load3').addClass('prefContent');
        }
        if ($('#load1').hasClass('stayclicked')) {
            $('#load1').removeClass('stayclicked');
            $('#load1').addClass('prefContent');
        }
    }
    //now good to go
    if ($(this).hasClass('prefContent')) {
        $(this).removeClass('prefContent');
        $(this).addClass('stayclicked');
    } else {
        $(this).removeClass('stayclicked');
        $(this).addClass('prefContent');
    }
});
//Submit JSON object to backend
$("#subRef").click(function() {
    //set semester
    var term = "";
    $('#showTerm td').each(function() {
            if ($(this).hasClass('stayclicked')) {
                term = $(this).text();
            }
        })
        //set course load
    var cl = "";
    $('#courseLoad td').each(function() {
            if ($(this).hasClass('stayclicked')) {
                cl = $(this).text().substring(0, 1); //get number only
            }
        })
        //set days
    var days = "";
    $('#prefDays td').each(function() {
        if ($(this).hasClass('stayclicked')) {
            days += ($(this).text() + " ");
        }
    });
    //set time
    var time = "";
    $('#prefTime td').each(function() {
        if ($(this).hasClass('stayclicked')) {
            time += ($(this).text() + " ");
        }
    });
    //set location
    var location = "";
    $('#prefLocation td').each(function() {
        if ($(this).hasClass('stayclicked')) {
            location += ($(this).text() + " ");
        }
    });
    //check if semester is not seleted
    if (term == "") {
        $('#feedbackWindow p').text("Please select a semester");
        $('#feedbackWindow').show(200);
        exit();
    }

    //JSON final set
    pref.semester = term;
    pref.courseLoad = cl;
    pref.monday = (days.match(/MONDAY/) ? true : false);
    pref.tuesday = (days.match(/TUESDAY/) ? true : false);
    pref.wednesday = (days.match(/WEDNESDAY/) ? true : false);
    pref.thursday = (days.match(/THURSDAY/) ? true : false);
    pref.friday = (days.match(/FRIDAY/) ? true : false);
    pref.morning = (time.match(/MORNING/) ? true : false);
    pref.afternoon = (time.match(/AFTERNOON/) ? true : false);
    pref.night = (time.match(/NIGHT/) ? true : false);
    pref.swg = (location.match(/SWG/) ? true : false);
    pref.loyola = (location.match(/LOYOLA/) ? true : false);
    pref.online = (location.match(/ONLINE/) ? true : false);


    var prefString = '[' + [JSON.stringify({
        "semester": "winter",
        "courseLoad": 5,
        "monday": false,
        "tuesday": false,
        "wednesday": false,
        "thursday": false,
        "friday": false,
        "morning": true,
        "afternoon": true,
        "night": false,
        "swg": false,
        "loyola": false,
        "online": false
    })].toString() + ']';

    $.ajax({
        type: 'POST',
        url: 'savepref/',
        contentType: "application/x-www-form-urlencoded; charset=utf-8",
        data: {
            'student_id': userInfo.id,
            'pref_json': prefString
        },
        success: function() {
            console.log('successfully saved pref to db');
        },
        async: false
    });

    //Show message
    $('#subRef').fadeOut(500);
    $('#feedbackWindow').addClass('centeredText');
    $('#feedbackWindow').text("You have successfully changed the preference! Refreshing in 5 seconds.");
    $('#feedbackWindow').show(1500, "swing");
    setInterval('window.location.reload()', 5000);
});