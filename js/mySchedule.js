  $(document).ready(function(){
    /* Get iframe src attribute value i.e. YouTube video url
    and store it in a variable */

    var retrievedObject = localStorage.getItem('scheduleData');
    var scheduleArray = JSON.parse(retrievedObject);

    /* Handlers bar */
    var listSource = $("#list-item-template").html();
    var listTemplate = Handlebars.compile(listSource);
    var listHtml = listTemplate(scheduleArray);
    $("#scheduleList").append(listHtml);

    var modalSource = $("#modal-template").html();
    var modalTemplate = Handlebars.compile(modalSource);
    var modalHtml = modalTemplate(scheduleArray);
    $("body").append(modalHtml);


    /* counter */
    $("#scheduleList a").each(function() {
        var schedule = $(this);
        var startTime = schedule.find("span.startTime");
        var startArray = startTime.text().split(":");

        var repeatTime = schedule.find("span.repeatTime").text();
        var repeatUnit = schedule.find("span.repeatUnit").text();

        var timePeriodMillis;
        if(repeatUnit === "Minutes"){
            timePeriodMillis = (parseInt(repeatTime, 10) * 60 * 1000);
        }
        else if(repeatUnit === "Hours"){
            timePeriodMillis = (parseInt(repeatTime, 10) * 60 * 60 * 1000);
        }
        else {
            timePeriodMillis = (parseInt(repeatTime, 10) * 24 * 60 * 60 * 1000);
        }

        //Converts repeat Time to milliseconds
        var repeatTimeMills = new Date().setTime(timePeriodMillis);

        /* Sets up */
        var start = new Date();
        var currMillis = start.getTime();

        start.setHours(startArray[0]);
        start.setMinutes(startArray[1]);
        start.setSeconds(0);

        while ((start.getTime() - currMillis) <= 0){
             start.setTime(start.getTime() + timePeriodMillis);
        }

        //If the timer has pass
        console.log(start);

        $(startTime).countdown({until: start, format: 'dHMS'});
    });

    $("button.modify").click(modifyScheduleItem);
    $("button.cancel").click();
    $("button.save").click();
    $("button.delete").click();
});

function modifyScheduleItem(e) {
    e.preventDefault();
    $(this).hide();
    $(this).parent().find(".delete").show();
    $(this).parent().find(".save").show();
    $(this).parent().find(".cancel").show();
    var modalDetailsDiv = $(this).parents().eq(1).find(".modal-details");
    modalDetailsDiv.hide();

    var modalBody = $(this).parents().eq(1).find(".modal-body");

    //Excercise Name
    var exerciseName = $(this).parents().eq(1).find(".modal-title").text();
    var exerciseCode = "<div class='scheduleExerciseNameDiv'>Exercise Name:<br /><input" +
    " type='text' class='scheduleExerciseNameInput form-control' value='" +
    exerciseName + "' autofocus required/></div>";
    modalBody.append(exerciseCode);

    //Repeats Every
    var repeatTimeAndUnits = modalDetailsDiv.find(".modal-repeat").text().split(" ");
    var repeatTime = repeatTimeAndUnits[2];
    var repeatUnits = repeatTimeAndUnits[3];
    var repeatTimeCode = "<div class='repeatDiv'>Repeat Every:<br /><input type='number' class='repeatVal form-control' " +
    "placeholder='' min='1' max='60' value='" + repeatTime + "' />";
    var repeatUnitsCode = "<select class='repeatUnitsDrop form-control'>" +
    "<option value='seconds'>seconds</option>" +
    "<option value='minutes'>minutes</option>" +
    "<option value='hours'>hours</option>" +
    "<option value='days'>days</option>" +
    "</select></div>";
    modalBody.append(repeatTimeCode + repeatUnitsCode);
    $(".repeatUnitsDrop option[value=" + repeatUnits+ "]").attr("selected", true);

}
