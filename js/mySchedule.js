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
        
        $(startTime).countdown({until: start, format: 'dHMS'});
    });

}); 
