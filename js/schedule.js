$(document).ready(function(){
  $("button.save").click(addExercise);
});

function addExercise(e) {
  e.preventDefault();
  bootbox.alert({
      size: "large",
      message: "Your new exercise has been scheduled!",
      backdrop: true
  });
}
