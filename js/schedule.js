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

	var checkbox = $("#startNow");

	$(checkbox).change(function() {
		var $input = $(this);

		if (checkbox.prop('checked')) {
			$("#startTime").val(null);
			$("#startTime").prop("disabled", true);
	    } 
		else {
		    $("#startTime").prop("disabled", false);
		}

	}).change();

});


function scheduleExercise(e) {
	e.preventDefault();

	/* Append the item to scheduleData (localStorage) */
	var retrievedObject = localStorage.getItem('scheduleData');
	var scheduleArray = JSON.parse(retrievedObject);

	var time = this.startTime.value;

	if($("#startNow").prop('checked')){
		var curr = new Date();
		time = curr.getHours() + ":" + curr.getMinutes();
	}

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
		startTime:time
	}

	var index = findIndexOf(scheduleArray, exercise.exerciseId);
	//The same exercise exist
	if (index != -1) {
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
						message: "Your " + exercise.exerciseName + " schedule has been updated!",
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
