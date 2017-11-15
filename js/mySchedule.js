$(document).ready(function(){
    /* Get iframe src attribute value i.e. YouTube video url
    and store it in a variable */

    var retrievedObject = localStorage.getItem('scheduleData');
    var scheduleArray = JSON.parse(retrievedObject);

    if(scheduleArray.schedules.length > 0){
        $("#noExercise").hide();
    }

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
        if(repeatUnit === "minutes"){
            timePeriodMillis = (parseInt(repeatTime, 10) * 60 * 1000);
        }
        else if(repeatUnit === "hours"){
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

        while ((start.getTime() - currMillis) <= 0){
            start.setTime(start.getTime() + timePeriodMillis);
        }

        $(startTime).countdown({until: start, format: 'dHMS'});
    });

    $("button.modify").click(modifyScheduleItem);
    $("button.cancel").click(cancelScheduleItem);
    $("button.save").click(saveScheduleItem);
    $("button.delete").click(deleteScheduleItem);
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

    //Repeats Every
    var repeatTimeAndUnits = modalDetailsDiv.find(".modal-repeat").text().split(" ");
    var repeatTime = repeatTimeAndUnits[2];
    var repeatUnits = repeatTimeAndUnits[3];
    var repeatTimeCode = "<div class='repeatDiv'>Repeat Every&#42;<br /><input type='number' class='repeatVal form-control' " +
    "placeholder='' min='1' max='60' value='" + repeatTime + "' />";
    var repeatUnitsCode = "<select class='repeatUnitsDrop form-control'>" +
    "<option value='Minutes'>minutes</option>" +
    "<option value='Hours'>hours</option>" +
    "<option value='Days'>days</option>" +
    "</select></div>";
    modalBody.append(repeatTimeCode + repeatUnitsCode);
    $(".repeatUnitsDrop option[value=" + repeatUnits+ "]").attr("selected", true);

    //Interval
    var intervalTimeAndUnit = modalDetailsDiv.find(".modal-interval").text().split(" ");
    var intervalTime = intervalTimeAndUnit[1];
    var intervalUnit = intervalTimeAndUnit[2];
    var intervalTimeCode = "<div class='intervalDiv'>Interval&#42;<br /><input type='number' class='intervalVal form-control' " +
    "placeholder='' min='1' max='60' value='" + intervalTime + "' />";
    var intervalUnitCode = "<select class='intervalUnitsDrop form-control'>" +
    "<option value='Minutes'>minutes</option>" +
    "<option value='Hours'>hours</option>" +
    "<option value='Days'>days</option>" +
    "</select></div>";
    modalBody.append(intervalTimeCode + intervalUnitCode);
    $(".intervalUnitsDrop option[value=" + intervalUnit+ "]").attr("selected", true);
}

function cancelScheduleItem(e) {
    e.preventDefault();
    $(this).hide();
    $(this).parent().find(".delete").hide();
    $(this).parent().find(".save").hide();
    $(this).parent().find(".modify").show();
    $(this).parents().eq(1).find(".repeatDiv").remove();
    $(this).parents().eq(1).find(".intervalDiv").remove();
    $(this).parents().eq(1).find(".modal-details").show();
}

function saveScheduleItem(e) {

    var originalId = ($(this).parents().parents().parents().eq(1).attr('id'));
    console.log(originalId);
    e.preventDefault();

    /* Retrieve schedule data from local storage */
    var retrievedObject = localStorage.getItem('scheduleData');
    var scheduleArray = JSON.parse(retrievedObject);

    //Find the index of the array
    var index = findIndexOf(scheduleArray, originalId);

    //Parse out new repeat every
    var repeatVal = $(this).parents().eq(1).find(".repeatVal").val();
    var repeatUnits = $(this).parents().eq(1).find(".repeatUnitsDrop option:selected").val();

    //Parse out new interval
    var intervalVal = $(this).parents().eq(1).find(".intervalVal").val();
    var intervalUnits = $(this).parents().eq(1).find(".intervalUnitsDrop option:selected").val();

    var oldExercise = scheduleArray.schedules[index];

    if(oldExercise != null){
        oldExercise.repeatDuration.time = repeatVal;
        oldExercise.repeatDuration.unit = repeatUnits;
        oldExercise.exerciseDuration.time = intervalVal;
        oldExercise.exerciseDuration.unit = intervalUnits;
    }

    scheduleArray.schedules[index] = oldExercise;
    /* Update the local storage */
    localStorage.setItem("scheduleData", JSON.stringify(scheduleArray));
    $(".modal .close").click();

    bootbox.alert({
        size: "large",
        message: "Updated Successfully.",
        backdrop: true,
        callback: function(){
            window.location.replace("mySchedule.html");
        }
    });

}

function deleteScheduleItem(e) {
    e.preventDefault();
    if (confirm("Are you sure you want to delete this exercise?")) {
        var modal = $(this).parents().eq(3);
        var modalID = modal.attr('id');
        modal.modal('hide').on('hidden.bs.modal', function() {
            $(this).remove();
        });
        $("a[href='#" + modalID + "']").remove();
    }


    //Retrieve local storage items
    var retrievedObject = localStorage.getItem('scheduleData');
    var scheduleArray = JSON.parse(retrievedObject);
    var index = findIndexOf(scheduleArray, modalID);

    //Delete an item from the local storage array
    if (index > -1) {
        scheduleArray.schedules.splice(index, 1);
    }

    //Save the changes (Deletion)
    localStorage.setItem("scheduleData", JSON.stringify(scheduleArray));

    if(scheduleArray.schedules.length == 0){
         $("#noExercise").show();
    }

    return false;
}

function findIndexOf(array, originalId){
    var index = -1;
    $.each(array.schedules, function() {
        $this = $(this)[0];
        var exerciseId = $this.exerciseId;
        if(originalId === exerciseId){
            index = array.schedules.indexOf($this);
        }
    });
    return index;
}

function lowercaseFirstLetter(str) {
    return str.charAt(0).toLowerCase() + str.slice(1);
}
