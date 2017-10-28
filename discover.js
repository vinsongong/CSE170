$(document).ready(function(){
    /* Get iframe src attribute value i.e. YouTube video url
    and store it in a variable */
    var url = $("#cartoonVideo").attr('src');

    /* Assign empty url value to the iframe src attribute when
    modal hide, which stop the video playing */
    $("#shoulderRaisesModal").on('hide.bs.modal', function(){
        $("#cartoonVideo").attr('src', '');
    });

    /* Assign the initially stored url back to the iframe src
    attribute when modal is displayed again */
    $("#shoulderRaisesModal").on('show.bs.modal', function(){
        $("#cartoonVideo").attr('src', url);
    });
});
