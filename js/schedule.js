$(document).ready(function(){

	var retrievedObject = localStorage.getItem('exerciseData');
	var exerciseArray = JSON.parse(retrievedObject);

	/* Handlers bar */
	var optionSource = $("#option-template").html();
	var optionTemplate = Handlebars.compile(optionSource);
	var optionHtml = optionTemplate(exerciseArray);
	$("#exercise").append(optionHtml);

	var form = $("form#needs-validation");
	
	$(form).submit(
		sendTrackerData,
		scheduleExercise
	);

	var checkbox = $("#startNow");
	var exerciseNameInput = $("#exercise");

	$(exerciseNameInput).change(function() {
		var $input = $(this);
		var exerciseId = $input.val();

		if(exerciseId != null){
			var index = findIndexOf(exerciseArray.exercises, exerciseId);
			var time = exerciseArray.exercises[index].duration.time;
			var unit = exerciseArray.exercises[index].duration.unit;
			$("#exerciseInterval").val(time);
			$("#exerciseTimeUnit").val(unit);
		}
	}).change();

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

function sendTrackerData() {
	console.log("Schedule Button Clicked");
	tracker = ga.getAll()[0];
	if(tracker){
		tracker.send('event', 'schedule', 'click');
	}
	else{
		console.log("Tracker is not found. Check your GA.")
	}
}

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

	var repeatMinute = convertToMinutes(exercise.repeatDuration.time, exercise.repeatDuration.unit);
	var exerciseMinute = convertToMinutes(exercise.exerciseDuration.time, exercise.exerciseDuration.unit);

	if(parseInt(repeatMinute) < parseInt(exerciseMinute)){
		bootbox.alert({
			size: "large",
			message: "The repeat interval must be longer than the exercise interval!",
			backdrop: true,
		});
	}
	else{
		var index = findIndexOf(scheduleArray.schedules, exercise.exerciseId);
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
}

function findIndexOf(array, originalId){
	var index = -1;
	$.each(array, function() {
		$this = $(this)[0];
		var exerciseId = $this.exerciseId;
		if(originalId === exerciseId){
			index = array.indexOf($this);
		}
	});
	return index;
}


function convertToMinutes(time, unit){
	var repeatMinute = time;

	if(unit == "hours"){
		repeatMinute = time * 60;
	}
	else if(unit == "days"){
		repeatMinute = time * 60 * 24;
	}
	return repeatMinute;
}
