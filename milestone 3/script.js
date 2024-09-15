document.addEventListener('DOMContentLoaded', function () {
    var nameElement = document.getElementById('name');
    var contactDetailsElement = document.getElementById('contactDetails');
    var educationElement = document.getElementById('education');
    var skillsElement = document.getElementById('skills');
    var workExperienceElement = document.getElementById('workExperience');
    var profilePictureFileInput = document.getElementById('profilePicture');
    var profilePictureURLElement = document.getElementById('profilePictureURL');
    var formElement = document.getElementById('resumeForm');
    function handleInputChange() {
        var _a;
        var name = nameElement.value;
        var contactDetails = contactDetailsElement.value;
        var education = educationElement.value;
        var skills = skillsElement.value;
        var workExperience = workExperienceElement.value;
        var profilePictureURL = profilePictureURLElement.value;
        var profilePictureFile = (_a = profilePictureFileInput.files) === null || _a === void 0 ? void 0 : _a[0];
        var profilePictureSrc = '';
        if (profilePictureFile) {
            var reader = new FileReader();
            reader.onload = function (e) {
                if (e.target && e.target.result) {
                    profilePictureSrc = e.target.result;
                    updateResumePreview(name, contactDetails, profilePictureSrc, education, skills, workExperience);
                }
            };
            reader.readAsDataURL(profilePictureFile);
        }
        else if (profilePictureURL) {
            profilePictureSrc = profilePictureURL;
            updateResumePreview(name, contactDetails, profilePictureSrc, education, skills, workExperience);
        }
        else {
            updateResumePreview(name, contactDetails, profilePictureSrc, education, skills, workExperience);
        }
    }
    function updateResumePreview(name, contactDetails, profilePictureSrc, education, skills, workExperience) {
        var previewContent = document.getElementById('previewContent');
        var downloadButton = document.getElementById('downloadResume');
        if (previewContent && downloadButton) {
            previewContent.innerHTML = "\n                <h3>".concat(name, "</h3>\n                ").concat(profilePictureSrc ? "<img src=\"".concat(profilePictureSrc, "\" alt=\"Profile Picture\" style=\"max-width: 150px; border-radius: 50%; margin-bottom: 10px;\">") : '', "\n                <p><strong>Contact Details:</strong> ").concat(contactDetails, "</p>\n                <p><strong>Education:</strong> ").concat(education, "</p>\n                <p><strong>Skills:</strong> ").concat(skills, "</p>\n                <p><strong>Work Experience:</strong> ").concat(workExperience, "</p>\n            ");
            // Show resume preview and download button
            var resumePreview = document.getElementById('resumePreview');
            if (resumePreview) {
                resumePreview.style.display = 'block';
            }
            if (downloadButton) {
                downloadButton.style.display = 'block';
                downloadButton.removeEventListener('click', downloadResume);
                downloadButton.addEventListener('click', downloadResume);
            }
        }
    }
    function downloadResume() {
        var previewContent = document.getElementById('previewContent');
        if (previewContent) {
            var resumeContent = previewContent.innerHTML;
            var blob = new Blob([resumeContent], { type: 'text/html' });
            var url = URL.createObjectURL(blob);
            var a = document.createElement('a');
            a.href = url;
            a.download = 'resume.html';
            document.body.appendChild(a); // Append anchor to the body to trigger click
            a.click();
            document.body.removeChild(a); // Remove anchor from the body
            URL.revokeObjectURL(url);
        }
    }
    // Prevent form submission and handle button click
    formElement.addEventListener('submit', function (event) {
        event.preventDefault(); // Prevent form submission
        handleInputChange(); // Update preview
    });
    // Attach event listeners to form elements
    nameElement.addEventListener('input', handleInputChange);
    contactDetailsElement.addEventListener('input', handleInputChange);
    educationElement.addEventListener('input', handleInputChange);
    skillsElement.addEventListener('input', handleInputChange);
    workExperienceElement.addEventListener('input', handleInputChange);
    profilePictureFileInput.addEventListener('change', handleInputChange);
    profilePictureURLElement.addEventListener('input', handleInputChange);
});
