$(document).ready(function(){
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
