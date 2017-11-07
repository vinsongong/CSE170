$(document).ready(function(){

  var retrievedObject = localStorage.getItem('exerciseData');
  var exerciseArray = JSON.parse(retrievedObject);

  /* Handlers bar */
  var optionSource = $("#option-template").html();
  var optionTemplate = Handlebars.compile(optionSource);
  var optionHtml = optionTemplate(exerciseArray);
  $("#select-exercise").append(optionHtml);

  var form = $("form#needs-validation");
  $(form).submit(addExercise);
});

function addExercise(e) {
  e.preventDefault();
  bootbox.alert({
      size: "large",
      message: "Your new exercise has been scheduled!",
      backdrop: true
  });
}
