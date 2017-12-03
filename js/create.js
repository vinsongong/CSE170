$(document).ready(function(){
    var form = $("form#needs-validation");
    $(form).submit(creatExercise);
});

function creatExercise(e) {
    e.preventDefault();

    var id = lowercaseFirstLetter(this.exercise.value).replace(/\s/g, '');
    
    //Insert Youtube link
    var youtubeVideoID = getYoutubeId(this.youtubeLink.value);
    var embedYoutubeLink = youtubeVideoID;

    if(youtubeVideoID != "") {
        embedYoutubeLink = embedYoutubeLink.replace(/^/,"https://www.youtube.com/embed/");
    }

    var canMultiTask = this.canMultiTask.value === "yes" ? true : false;
    var exercise = {
        exerciseId:id,
        exerciseName: this.exercise.value,
        canMultiTask: canMultiTask,
        duration:{
            time:this.exerciseInterval.value,
            unit:this.exerciseTimeUnit.value
        },
        type:"Custom",
        isCustom:true,
        description: (this.description.value).match(/[^\n]+/g),
        equipment: this.equipment.value,
        youtubeLink: embedYoutubeLink
    }

    /* Append the item to exerciseData (localStorage) */
    var retrievedObject = localStorage.getItem('exerciseData');
    var exerciseArray = JSON.parse(retrievedObject);
    exerciseArray.exercises.push(exercise);
    localStorage.setItem("exerciseData", JSON.stringify(exerciseArray));

    bootbox.alert({
        size: "large",
        message: "Successfully created a new exercise!",
        backdrop: true,
        callback: function(){
            window.location.replace("discover.html");
        }
    });

}

function getYoutubeId(url) {
    var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    var match = url.match(regExp);

    if (match && match[2].length == 11) {
        return match[2];
    } else {
        return "";
    }
}

function lowercaseFirstLetter(str) {
    return str.charAt(0).toLowerCase() + str.slice(1);
}
