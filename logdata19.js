$(document).ready(function() {
    var courseData = {};
    var completedQuestionsCache = []; // Cache array to store completed questions

    function addClipboardButton() {
        // Existing clipboard button code...
    }

    function checkAndUpdateUI() {
        // Loop through all elements with class 'guidem-form'
        $('.guidem-form').each(function() {
            var $form = $(this);
            var questionNumber = $form.data('question-id').toString();
            if (completedQuestionsCache.includes(questionNumber)) {
                // Apply the changes to the UI
                $form.find('input[type="text"]').prop('disabled', true)
                     .attr('placeholder', 'You already completed this. Grit & Grind!')
                     .attr('style', 'color: silver !important; border: 1px solid rgba(40, 167, 69, 0.5) !important;');
                $form.find('.guidem-button').text('Completed')
                    .css({'background-color': '#218838 !important', 'color': 'white !important'})
                    .prop('disabled', true);
                $form.find('.guidem-hint-button')
                    .css('background-color', '#3e4242 !important')
                    .prop('disabled', true);
            }
        });
    }

    function fetchUserProgressAndUpdateCache() {
        var requestData = {
            userId: courseData.userId,
            courseId: courseData.courseId,
            chapterId: courseData.chapterId,
            lessonId: courseData.lessonId
        };

        $.ajax({
            url: 'https://sb1.guidem.ph/checkuserprogress',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(requestData),
            success: function(response) {
                if (response && response.completedQuestions) {
                    completedQuestionsCache = response.completedQuestions.map(String);
                    checkAndUpdateUI();
                }
            },
            error: function(xhr, status, error) {
                console.error('Error:', error);
            }
        });
    }

    function onContentChange(data) {
        // Existing code to set courseData...
        fetchUserProgressAndUpdateCache();
    }

    if (typeof(CoursePlayerV2) !== 'undefined') {
        CoursePlayerV2.on('hooks:contentDidChange', onContentChange);
    }

    addClipboardButton();

    // Event listener for submit button click
    $(document).on('click', '.guidem-button', function() {
        fetchUserProgressAndUpdateCache(); // Update cache on submit
    });
});
