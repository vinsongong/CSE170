$(document).ready(function(){

	var retrievedObject = localStorage.getItem('exerciseData');
	var exerciseArray = JSON.parse(retrievedObject);

	/* Handlers bar */
	var optionSource = $("#option-template").html();
	var optionTemplate = Handlebars.compile(optionSource);
	var optionHtml = optionTemplate(exerciseArray);
	$("#exercise").append(optionHtml);

	var form = $("form#needs-validation");
	$(form).submit(addExercise);
});

function addExercise(e) {
	e.preventDefault();

	var exercise = {
		exerciseId:this.exercise.value,
		exerciseName: $(this.exercise).find(":selected").text(),
		repeatDuration:{
			time:this.repeatInterval.value,
			unit:this.repeatTimeUnit.value
		},
		exerciseDuration:{
			time:this.exerciseInterval.value,
			unit:this.exerciseTimeUnit.value
		},
		startTime:startTime
	}

	/* Append the item to scheduleData (localStorage) */
	var retrievedObject = localStorage.getItem('scheduleData');
	var scheduleArray = JSON.parse(retrievedObject);
	scheduleArray.schedules.push(exercise);
	localStorage.setItem("scheduleData", JSON.stringify(scheduleArray));

	bootbox.alert({
		size: "large",
		message: "Your new exercise has been scheduled!",
		backdrop: true
	});
}
