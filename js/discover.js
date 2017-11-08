$(document).ready(function(){
    /* Get iframe src attribute value i.e. YouTube video url
    and store it in a variable */

    var retrievedObject = localStorage.getItem('exerciseData');
    var exerciseArray = JSON.parse(retrievedObject);

    /* Handlers bar */
    var listSource = $("#list-item-template").html();
    var listTemplate = Handlebars.compile(listSource);
    var listHtml = listTemplate(exerciseArray);
    $("#discoverList").append(listHtml);

    var modalSource = $("#modal-template").html();
    var modalTemplate = Handlebars.compile(modalSource);
    var modalHtml = modalTemplate(exerciseArray);
    $("body").append(modalHtml);

    var shoulderRaisesURL = $("#shoulderRaisesVideo").attr('src');
    var jumpingJacksURL = $("#jumpingJacksVideo").attr('src');
    var standingURL = $("#standingVideo").attr('src');

    /* Assign empty url value to the iframe src attribute when
    modal hide, which stop the video playing */

    $(".modal").on('hide.bs.modal', function(){
        var videoIFrame = $(this).find("iframe");
        var videoSrc = videoIFrame.attr('src');
        videoIFrame.attr('src', '');
        videoIFrame.attr('src', videoSrc);
    });

    $(".discover").on('show.bs.modal', function(){
        if($("iframe", this).attr("src").trim() == "") {
            $(".youtube-vid", this).hide();
        }
    });

    $("button.modify").click(modifyDetails);
    $("button.cancel").click(cancelDetails);
    $("button.save").click(saveDetails);
    $("button.delete").click(deleteExercise);
});

function modifyDetails(e) {
    e.preventDefault();
    $(this).hide();
    $(this).parent().find(".delete").show();
    $(this).parent().find(".save").show();
    $(this).parent().find(".cancel").show();
    var modalUL = $(this).parents().eq(1).find(".modal-ul").children('li');
    var modalDetailsDiv = $(this).parents().eq(1).find(".modal-details");
    modalDetailsDiv.hide();
    $(this).parents().eq(1).find(".youtube-vid").hide();

    var modalBody = $(this).parents().eq(1).find(".modal-body");

    //Exercise Name
    var exerciseName = $(this).parents().eq(1).find(".modal-title").text();
    var exerciseCode = "<div class='exerciseNameDiv'>Exercise Name&#42;<br /><input" +
    " type='text' class='exerciseNameInput form-control' value='" +
    exerciseName + "' autofocus required/></div>";
    modalBody.append(exerciseCode);

    //Interval
    var timeText = $(this).parents().eq(1).find(".modal-interval").text();
    var timeBox = "<div class='timeDiv'>Interval&#42;<br /><input type='number' class='timeDeets form-control' " +
    "placeholder='' min='1' max='60' value='" +
    parseInt(timeText.replace(/[^0-9\.]/g, ''), 10) + "' />";
    var timeDropdown = "<select class='timeDrop form-control'>" +
    "<option value='seconds'>seconds</option>" +
    "<option value='minutes'>minutes</option>" +
    "<option value='hours'>hours</option>" +
    "<option value='days'>days</option>" +
    "</select></div>";
    modalBody.append(timeBox + timeDropdown);
    var timeTextSplit = timeText.split(" ");
    var timeUnits = timeTextSplit[timeTextSplit.length-1];
    $(".timeDrop option[value=" + timeUnits+ "]").attr("selected", true);

    //Distraction Level
    var distractionLevel = $(this).parents().eq(1).find(".modal-distraction").text();
    var distrationCode = "<div class='distractionDiv'>Distraction Level&#42;" +
    "<select class='distractionDrop form-control'>" +
    "<option value='Low'>Low</option>" +
    "<option value='Medium'>Medium</option>" +
    "<option value='High'>High</option>" +
    "</select></div>";
    modalBody.append(distrationCode);
    $(".distractionDrop option[value=" + distractionLevel+ "]").attr("selected", true);

    //Equipment
    var equipment = modalUL.eq(0).text().split(" ")[1];
    var equipmentCode = "<div class='equipmentDiv'>Equipment&#42;<br />" +
    "<input type='text' class='equipmentInput form-control' placeholder='Enter equipment needed'" +
    "value='" + equipment + "' />";
    modalBody.append(equipmentCode);

    //Textbox
    var textBox = "<div class='textBoxDiv'>Description&#42;<textarea class='textBoxDeets form-control'rows='"+ (modalUL.length + 4) +"' cols='40'" +
    " placeholder='Details about the exercise...' required>";
    for(i = 1; i < modalUL.length; i++) {
        textBox += modalUL.eq(i).text() + "\n";
    }
    modalBody.append(textBox + "</textarea></div>");

    //Youtube Link
    var youtubeLink = $(this).parents().eq(1).find("iframe").attr("src");
    $(this).parents().eq(1).find("iframe").attr('src', "#" + youtubeLink); //To stop video from playing
    var youtubeLinkCode = "<div class='youtubeLinkDiv'><i class='fa fa-youtube-play'></i>&nbsp;Youtube Link (Optional)" +
    "<input type='text' class='youtubeLinkInput form-control' value='" +
    youtubeLink + "' /></div>";
    modalBody.append(youtubeLinkCode);
}

function cancelDetails(e) {
    e.preventDefault();
    $(this).hide();
    $(this).parent().find(".delete").hide();
    $(this).parent().find(".save").hide();
    $(this).parent().find(".modify").show();
    $(this).parents().eq(1).find(".exerciseNameDiv").remove();
    $(this).parents().eq(1).find(".textBoxDiv").remove();
    $(this).parents().eq(1).find(".equipmentDiv").remove();
    $(this).parents().eq(1).find(".timeDiv").remove();
    $(this).parents().eq(1).find(".distractionDiv").remove();
    $(this).parents().eq(1).find(".youtubeLinkDiv").remove();
    //Show Youtube video
    var stoppedYoutubeLink = $(this).parents().eq(1).find("iframe").attr("src").trim();
    $(this).parents().eq(1).find("iframe").attr('src', stoppedYoutubeLink.substr(1)); //To add video back in
    if($(this).parents().eq(1).find("iframe").attr("src").trim() != "") {
        $(this).parents().eq(1).find(".youtube-vid").show();
    }
    //Show modal description
    $(this).parents().eq(1).find(".modal-details").show();
}

function saveDetails(e) {
    e.preventDefault();

    $(this).parents().eq(1).find(".equipmentDiv").remove();

    //Parse out new details line by line
    var newTextBox = $(this).parents().eq(1).find(".textBoxDeets");
    var lines = newTextBox.val().split(/\n/);
    var texts = [];
    for (var i=0; i < lines.length; i++) {
        // only push this line if it contains a non whitespace character.
        if (/\S/.test(lines[i])) {
            texts.push($.trim(lines[i]));
        }
    }

    var originalId = ($(this).parents().parents().parents().eq(1).attr('id'));

    //Parse out new time
    var timeVal = $(this).parents().eq(1).find(".timeDeets").val();
    var timeUnits = $(this).parents().eq(1).find(".timeDrop option:selected").val();

    //Parse out new exercise name
    var newExerciseName = $(this).parents().eq(1).find(".exerciseNameInput").val();
    //Using the new name, genereate new ID
    var newId = lowercaseFirstLetter(newExerciseName).replace(/\s/g, '');

    //Error Check
    if(!newExerciseName.length) {
        alert("Exercise name must be filled in!");
        return;
    }
    if(!timeVal.length || timeVal < 1) {
        alert("Enter positive integer value for how long this exercise takes!");
        return;
    }
    if(!texts.length) {
        alert("Description must be filled in!");
        return;
    }

    //Show only relevent buttons
    $(this).hide();
    $(this).parent().find(".delete").hide();
    $(this).parent().find(".cancel").hide();
    $(this).parent().find(".modify").show();

    //Remove old exercise name div
    var modalExerciseNameDiv = $(this).parents().eq(1).find(".exerciseNameDiv");
    modalExerciseNameDiv.remove();

    //Remove old interval
    var modalInteval = $(this).parents().eq(1).find(".modal-interval");
    modalInteval.remove();

    //Remove old textarea and ul
    $(this).parents().eq(1).find(".textBoxDiv").remove();
    var modalUL = $(this).parents().eq(1).find(".modal-ul").children('li');
    modalUL.remove();

    //Remove timeDiv
    var newTimeVal = $(this).parents().eq(1).find(".timeDeets").val();
    var newTimeUnits = $(this).parents().eq(1).find(".timeDrop option:selected").val();
    $(this).parents().eq(1).find(".timeDiv").remove();

    //Remove distractionDiv
    var newDistractionLevel = $(this).parents().eq(1).find(".distractionDrop option:selected").val();
    $(this).parents().eq(1).find(".distractionDiv").remove();

    //Remove youtubeLinkDiv
    var newYoutubeLink = $(this).parents().eq(1).find(".youtubeLinkInput").val();
    $(this).parents().eq(1).find(".youtubeLinkDiv").remove();

    var modalBody = $(this).parents().eq(1).find(".modal-details");
    modalBody.show();

    //Insert new exercise name
    var modalTitle = $(this).parents().eq(1).find(".modal-title");
    modalTitle.html(newExerciseName);

    //Insert new interval
    var newInterval = document.createElement('h5');
    newInterval.className = "modal-interval";
    newInterval.appendChild(document.createTextNode("Interval: " + newTimeVal + " " + newTimeUnits));
    modalBody.append(newInterval);

    //Modify distraction level in badge of list
    $(this).parents().eq(1).find(".modal-distraction").html(newDistractionLevel);

    //Insert new ul
    var newUL = document.createElement('ul');
    newUL.className = "modal-ul";
    for(var i = 0; i < texts.length; i++) {
        var item = document.createElement('li');
        item.appendChild(document.createTextNode(texts[i]));
        newUL.appendChild(item);
    }
    modalBody.append(newUL);

    //Insert Youtube link
    var youtubeVideoID = getYoutubeId(newYoutubeLink);
    var embedYoutubeLink = youtubeVideoID;
    if(youtubeVideoID != "") {
        embedYoutubeLink = embedYoutubeLink.replace(/^/,"https://www.youtube.com/embed/");
    }
    $(this).parents().eq(1).find("iframe").attr("src", embedYoutubeLink);

    //Show new Youtube video
    if($(this).parents().eq(1).find("iframe").attr("src").trim() != "") {
        $(this).parents().eq(1).find(".youtube-vid").show();
    }

    //Retrieve local storage items
    var retrievedObject = localStorage.getItem('exerciseData');
    var exerciseArray = JSON.parse(retrievedObject);

    //Find the index of the array
    var index = findIndexOf(exerciseArray, originalId);

    var newExercise = {
        exerciseId: newId,
        exerciseName: newExerciseName,
        distraction: newDistractionLevel,
        duration:{
            time:timeVal,
            unit:timeUnits
        },
        type:"Custom",
        isCustom:true,
        description: texts,
        //TODO: new Equipment Field
        equipment: null,
        youtubeLink: embedYoutubeLink
    }

    exerciseArray.exercises[index] = newExercise;
    localStorage.setItem("exerciseData", JSON.stringify(exerciseArray));

    $(".modal .close").click();

    bootbox.alert({
        size: "large",
        message: "Updated Successfully.",
        backdrop: true,
        callback: function(){
            window.location.replace("discover.html");
        }
    });

}

function findIndexOf(exerciseArray, originalId){

    var index = -1;
    $.each(exerciseArray.exercises, function() {
        $this = $(this)[0];
        var exerciseId = $this.exerciseId;
        if(originalId === exerciseId){
            index = exerciseArray.exercises.indexOf($this);
        }
    });
    return index;
}

function deleteExercise(e) {
    e.preventDefault();
    if (confirm("Are you sure you want to delete this exercise?")) {
        var modal = $(this).parents().eq(3);
        var modalID = modal.attr('id');
        modal.modal('hide').on('hidden.bs.modal', function() {
            $(this).remove();
        });
        $("a[href='#" + modalID + "']").remove();
    }

    //Retrieve local storage items
    var retrievedObject = localStorage.getItem('exerciseData');
    var exerciseArray = JSON.parse(retrievedObject);
    var index = findIndexOf(exerciseArray, modalID);

    //Delete an item from the local storage array
    if (index > -1) {
        exerciseArray.exercises.splice(index, 1);
    }

    //Save the changes (Deletion)
    localStorage.setItem("exerciseData", JSON.stringify(exerciseArray));

    return false;
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
