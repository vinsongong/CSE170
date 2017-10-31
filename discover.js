$(document).ready(function(){
  /* Get iframe src attribute value i.e. YouTube video url
  and store it in a variable */
  var shoulderRaisesURL = $("#shoulderRaisesVideo").attr('src');
  var jumpingJacksURL = $("#jumpingJacksVideo").attr('src');

  /* Assign empty url value to the iframe src attribute when
  modal hide, which stop the video playing */
  $("#shoulderRaisesModal").on('hide.bs.modal', function(){
    $("#shoulderRaisesVideo").attr('src', '');
  });
  $("#jumpingJacksModal").on('hide.bs.modal', function(){
    $("#jumpingJacksVideo").attr('src', '');
  });
  $("#standingModal").on('hide.bs.modal', function(){
    var timeStrArr = $(this).find(".modal-ul li:last").text().split(" ");
    var timeVal = parseInt(timeStrArr[1], 10);
    var timeUnit = timeStrArr[2];
    $("a[href='#standingModal']").find(".badge")
      .html("Distraction: Low <br /> Duration: " + timeVal + " " + timeUnit);
  });

  /* Assign the initially stored url back to the iframe src
  attribute when modal is displayed again */
  $("#shoulderRaisesModal").on('show.bs.modal', function(){
    $("#shoulderRaisesVideo").attr('src', shoulderRaisesURL);
  });
  $("#jumpingJacksModal").on('show.bs.modal', function(){
    $("#jumpingJacksVideo").attr('src', jumpingJacksURL);
  });

  $(".discover").on('show.bs.modal', function(){
    if($("iframe", this).hasClass("noVideo")) {
      $(".youtube-vid", this).remove();
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
  modalUL.hide();

  //Textbox
  var modalBody = $(this).parents().eq(1).find(".modal-body");
  var textBox = "<div class='textBoxDiv'>Details:<textarea class='textBoxDeets form-control'rows='"+ (modalUL.length + 4) +"' cols='40'" +
    " placeholder='Details about the exercise...' autofocus required>";
  for(i = 0; i < modalUL.length - 1; i++) {
    textBox += modalUL.eq(i).text() + "\n";
  }
  modalBody.append(textBox+"</textarea></div>");

  //Time
  var timeText = modalUL.eq(modalUL.length - 1).text();
  var timeBox = "<div class='timeDiv'>Takes:<br /><input type='number' class='timeDeets form-control' " +
    "placeholder='' min='1' value='" +
    parseInt(timeText.replace(/[^0-9\.]/g, ''), 10) + "'></input>";
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
}

function cancelDetails(e) {
  e.preventDefault();
  $(this).hide();
  $(this).parent().find(".delete").hide();
  $(this).parent().find(".save").hide();
  $(this).parent().find(".modify").show();
  $(this).parents().eq(1).find(".textBoxDiv").remove();
  $(this).parents().eq(1).find(".timeDiv").remove();
  $(this).parents().eq(1).find(".modal-ul").children('li').show();
}

function saveDetails(e) {
  e.preventDefault();
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

  //Parse out new time
  var timeVal = $(this).parents().eq(1).find(".timeDeets").val();
  var timeUnits = $(this).parents().eq(1).find(".timeDrop option:selected").val();

  //Error Check
  if(!texts.length) {
    alert("Details must be filled in!");
    return;
  }
  if(!timeVal.length || timeVal < 1) {
    alert("Enter positive integer value for how long this exercise takes!");
    return;
  }

  //Show only relevent buttons
  $(this).hide();
  $(this).parent().find(".delete").hide();
  $(this).parent().find(".cancel").hide();
  $(this).parent().find(".modify").show();

  //Remove old textarea and ul
  $(this).parents().eq(1).find(".textBoxDiv").remove();
  var modalUL = $(this).parents().eq(1).find(".modal-ul").children('li');
  modalUL.remove();

  //Remove old timeDiv
  $(this).parents().eq(1).find(".timeDiv").remove();

  //Insert new ul
  var modalBody = $(this).parents().eq(1).find(".modal-body")
  var newUL = document.createElement('ul');
  newUL.className = "modal-ul";
  for(var i = 0; i < texts.length; i++) {
    var item = document.createElement('li');
    item.appendChild(document.createTextNode(texts[i]));
    newUL.appendChild(item);
  }
  var item = document.createElement('li');
  item.appendChild(document.createTextNode("Time: " + timeVal + " " + timeUnits));
  newUL.appendChild(item);
  modalBody.append(newUL);
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
  return false;
}
