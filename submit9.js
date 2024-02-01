$(document).ready(function () {
    var courseId, courseName, courseSlug, lessonId, lessonName, lessonSlug, chapterName, chapterId, userId, userName, userEmail, userFirstName;
    var incorrectAttempts = 0;
    var banEndTime = 0;
    var completedTasks = 0;
    var totalTasks = $('.guidem-button').length;
    var cooldownEndTime = 0; // Added cooldown timer

    function isBanned() {
        const currentTime = Date.now();
        return banEndTime > currentTime;
    }

    function resetIncorrectAttempts() {
        incorrectAttempts = 0;
        banEndTime = 0;
    }

    function updateProgressBar() {
        const progressPercentage = (completedTasks / totalTasks) * 100;
        $('#progressBar').css('width', progressPercentage + '%');
        $('#progress-text').text(`Progress: ${completedTasks} out of ${totalTasks}`);
    }

    function showHintModal(questionId, hint) {
        $('#hintModal').remove();
        const modal = `
            <div class="modal fade custom-modal" id="hintModal" tabindex="-1" aria-labelledby="hintModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="hintModalLabel">Hint</h5>
                        </div>
                        <div class="modal-body">
                            ${hint}
                        </div>
                    </div>
                </div>
            </div>
        `;
        $('body').append(modal);
        $('#hintModal').modal('show');
    }

    function updateNextAllowedTryTime(minutes) {
        var currentTime = Date.now();
        var additionalTime = minutes * 60 * 1000; // Convert minutes to milliseconds
        banEndTime = currentTime + additionalTime;
    }

    if (typeof (CoursePlayerV2) !== 'undefined') {
        CoursePlayerV2.on('hooks:contentDidChange', function (data) {
            courseId = data.course.id;
            courseName = data.course.name;
            courseSlug = data.course.slug;
            lessonId = data.lesson.id;
            lessonName = data.lesson.name;
            lessonSlug = data.lesson.slug;
            chapterName = data.chapter.name;
            chapterId = data.chapter.id;
            userId = data.user.id;
            userName = data.user.full_name;
            userEmail = data.user.email;
            userFirstName = data.user.first_name;
        });
    }

    toastr.options = {
        closeButton: true,
        progressBar: true,
        positionClass: "toast-top-right",
    };

    $(document).on('click', '.guidem-button', function () {
        var clickedButton = $(this);
        if (clickedButton.text() === 'Completed' || clickedButton.prop('disabled')) {
            return;
        }

        if (isBanned()) {
            toastr.error(`Hi ${userFirstName}, you are temporarily banned from submitting answers.`);
            clickedButton.prop('disabled', true); // Disable the button when banned
            return;
        }

        const form = clickedButton.closest('.guidem-form');
        const inputValue = String(form.find('input[type="text"]').val());
        const questionId = form.data('question-id');

        if (inputValue.trim() === '') {
            toastr.error(`Hi ${userFirstName}, please enter an answer.`);
            return;
        }

        if (incorrectAttempts > 5 && Date.now() - cooldownEndTime < 10000) {
            toastr.info(`Whoa not so fast we are hackers too! 5 Second Cooldown!`, null, { "backgroundColor": "#3498db" });
            clickedButton.prop('disabled', true); // Disable the button during cooldown
            setTimeout(function () {
                clickedButton.prop('disabled', false); // Re-enable the button after 5 seconds
            }, 5000);
            return;
        }

        // AJAX request logic
        $.ajax({
            url: 'https://sb1.guidem.ph/submitdata',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({
                courseId: courseId,
                courseName: courseName,
                courseSlug: courseSlug,
                lessonId: lessonId,
                lessonName: lessonName,
                lessonSlug: lessonSlug,
                chapterId: chapterId,
                chapterName: chapterName,
                userId: userId,
                userEmail: userEmail,
                questionId: questionId,
                answer: inputValue
            }),
            success: function (response) {
                if (response.isCorrect === true) {
                    completedTasks++;
                    updateProgressBar();
                    form.find('input[type="text"]').prop('disabled', true);
                    clickedButton.text('Completed').css('background-color', 'green').prop('disabled', true);
                    toastr.success(`Hi ${userFirstName}, correct answer`);
                    resetIncorrectAttempts();
                } else {
                    toastr.error(`Hi ${userFirstName}, incorrect answer`);
                    incorrectAttempts++;
                    if (incorrectAttempts >= 5) {
                        updateNextAllowedTryTime(5); // Disable for 5 minutes
                        toastr.warning('You have reached the maximum number of attempts. Please wait 5 minutes.');
                    } else if (incorrectAttempts > 5) {
                        cooldownEndTime = Date.now(); // Set cooldown end time
                        clickedButton.prop('disabled', true); // Disable the button during cooldown
                        setTimeout(function () {
                            clickedButton.prop('disabled', false); // Re-enable the button after 5 seconds
                        }, 5000);
                    }
                }
            },
            error: function (xhr, status, error) {
                toastr.error(`Hi ${userFirstName}, error sending data`);
                clickedButton.prop('disabled', false); // Re-enable the button on error
            }
        });
    });

    $(document).on('click', '.guidem-hint-button', function () {
        const form = $(this).closest('.guidem-form');
        const questionId = form.data('question-id');
        let hint = "No hint available for this question.";
        if (questionId === 1) {
            hint = "Hint 1: This is a hint for question ID 1.";
        } else if (questionId === 2) {
            hint = "Hint 2: This is a hint for question ID 2.";
        }
        showHintModal(questionId, hint);
    });
});
