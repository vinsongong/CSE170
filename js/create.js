$(document).ready(function(){
  var form = $("form#needs-validation");
  $(form).submit(creatExercise);
});

function creatExercise(e) {
  e.preventDefault();

  var id = lowercaseFirstLetter(this.exercise.value).replace(/\s/g, '');

  var exercise = {
  	exerciseId:id,
    exerciseName: this.exercise.value,
    distraction: this.distractionLevel.value,
    duration:{
     time:this.exerciseInterval.value,
     unit:this.exerciseTimeUnit.value
   },
   type:"Custom",
   isCustom:true,
   description: (this.description.value).match(/[^\s]+/g),
   equipment: this.equipment.value,
   youtubeLink: this.youtubeLink.value
 }
 
 /* Append the item to exerciseData (localStorage) */
 var retrievedObject = localStorage.getItem('exerciseData');
 var exerciseArray = JSON.parse(retrievedObject);
 exerciseArray.exercises.push(exercise);
 localStorage.setItem("exerciseData", JSON.stringify(exerciseArray));

 bootbox.alert({
  size: "large",
  message: "Successfully created a new exercise!",
  backdrop: true
});

 window.location.replace("discover.html");
}

function lowercaseFirstLetter(str) {
  return str.charAt(0).toLowerCase() + str.slice(1);
}