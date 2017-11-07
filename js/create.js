$(document).ready(function(){
  var form = $("form#needs-validation");
  $(form).submit(creatExercise);
});

function creatExercise(e) {
  e.preventDefault();

  localStorage.setItem('exerciseName', this.exercise.value);
  bootbox.alert({
      size: "large",
      message: "Successfully created a new exercise!",
      backdrop: true
  });
}
