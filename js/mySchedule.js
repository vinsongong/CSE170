  $(document).ready(function(){
    /* Get iframe src attribute value i.e. YouTube video url
    and store it in a variable */

    var retrievedObject = localStorage.getItem('scheduleData');
    var scheduleArray = JSON.parse(retrievedObject);

    console.log(scheduleArray);
    /* Handlers bar */
    var listSource = $("#list-item-template").html();
    var listTemplate = Handlebars.compile(listSource);
    var listHtml = listTemplate(scheduleArray);
    $("#scheduleList").append(listHtml);

    var modalSource = $("#modal-template").html();
    var modalTemplate = Handlebars.compile(modalSource);
    var modalHtml = modalTemplate(scheduleArray);
    $("body").append(modalHtml);
}); 


function convertToStandard(time){

  time = time.split(':');
  var hours = Number(time[0]);
  var minutes = Number(time[1]);
  var timeValue;

  if (hours > 0 && hours <= 12){ 
    timeValue= "" + hours;
    } else if (hours > 12){
    timeValue= "" + (hours - 12);
    } else {
    timeValue= "12";
    }

  timeValue += (minutes < 10) ? ":0" + minutes : ":" + minutes;  // get minutes
  timeValue += (hours >= 12) ? " P.M." : " A.M.";  // get AM/PM
}