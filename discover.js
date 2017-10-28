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

    /* Assign the initially stored url back to the iframe src
    attribute when modal is displayed again */
    $("#shoulderRaisesModal").on('show.bs.modal', function(){
        $("#shoulderRaisesVideo").attr('src', shoulderRaisesURL);
    });
    $("#jumpingJacksModal").on('show.bs.modal', function(){
        $("#jumpingJacksVideo").attr('src', jumpingJacksURL);
    });
});
