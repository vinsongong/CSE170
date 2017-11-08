$(document).ready(function(){

	var retrievedObject = localStorage.getItem('exerciseData');
	var exerciseArray = JSON.parse(retrievedObject);

	/* Handlers bar */
	var optionSource = $("#option-template").html();
	var optionTemplate = Handlebars.compile(optionSource);
	var optionHtml = optionTemplate(exerciseArray);
	$("#exercise").append(optionHtml);

	var form = $("form#needs-validation");
	$(form).submit(scheduleExercise);
});

function scheduleExercise(e) {
	e.preventDefault();

	/* Append the item to scheduleData (localStorage) */
	var retrievedObject = localStorage.getItem('scheduleData');
	var scheduleArray = JSON.parse(retrievedObject);

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
		/*Military Time Format*/
		//startTime:this.startTime.value
		startTime:this.startTime.value
	}

	var index = findIndexOf(scheduleArray, exercise.exerciseId);
	console.log(index);
	//The same exercise exist 
	if (index => 0) {
		bootbox.confirm({
			title: "Confirm Message",
			message: "You already have a scheduled exercise for " + exercise.exerciseName + "." +
			" Do you want to overwrite the existing reminder for " + exercise.exerciseName + "?",
			buttons: {
				cancel: {
					label: '<i class="fa fa-times"></i> Cancel'
				},
				confirm: {
					label: '<i class="fa fa-check"></i> Confirm'
				}
			},
			callback: function (result) {
				if(result === true){
					scheduleArray.schedules[index] = exercise;
					localStorage.setItem("scheduleData", JSON.stringify(scheduleArray));
					bootbox.alert({
						size: "large",
						message: "Your new exercise has been scheduled!",
						backdrop: true,
						callback: function(){
							window.location.replace("mySchedule.html");
						}
					});
				}
				else{
					window.location.replace("schedule.html");
				}
			}
		});
	}
	else{
		scheduleArray.schedules.push(exercise);
		localStorage.setItem("scheduleData", JSON.stringify(scheduleArray));

		bootbox.alert({
			size: "large",
			message: "Your new exercise has been scheduled!",
			backdrop: true,
			callback: function(){
				window.location.replace("mySchedule.html");
			}
		});
	}	
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