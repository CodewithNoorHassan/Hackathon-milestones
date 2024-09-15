"use strict";
document.addEventListener('DOMContentLoaded', () => {
    const nameElement = document.getElementById('name');
    const contactDetailsElement = document.getElementById('contactDetails');
    const educationElement = document.getElementById('education');
    const skillsElement = document.getElementById('skills');
    const workExperienceElement = document.getElementById('workExperience');
    const profilePictureFileInput = document.getElementById('profilePicture');
    const profilePictureURLElement = document.getElementById('profilePictureURL');
    const formElement = document.getElementById('resumeForm');
    function handleInputChange() {
        var _a;
        const name = nameElement.value;
        const contactDetails = contactDetailsElement.value;
        const education = educationElement.value;
        const skills = skillsElement.value;
        const workExperience = workExperienceElement.value;
        const profilePictureURL = profilePictureURLElement.value;
        const profilePictureFile = (_a = profilePictureFileInput.files) === null || _a === void 0 ? void 0 : _a[0];
        let profilePictureSrc = '';
        if (profilePictureFile) {
            const reader = new FileReader();
            reader.onload = (e) => {
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
        const previewContent = document.getElementById('previewContent');
        const downloadButton = document.getElementById('downloadResume');
        if (previewContent && downloadButton) {
            previewContent.innerHTML = `
                <h3 contenteditable="true">${name}</h3>
                ${profilePictureSrc ? `<img src="${profilePictureSrc}" alt="Profile Picture" style="max-width: 150px; border-radius: 50%; margin-bottom: 10px;">` : ''}
                <p><strong>Contact Details:</strong> <span contenteditable="true">${contactDetails}</span></p>
                <p><strong>Education:</strong> <span contenteditable="true">${education}</span></p>
                <p><strong>Skills:</strong> <span contenteditable="true">${skills}</span></p>
                <p><strong>Work Experience:</strong> <span contenteditable="true">${workExperience}</span></p>
            `;
            // Show resume preview and download button
            const resumePreview = document.getElementById('resumePreview');
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
        const previewContent = document.getElementById('previewContent');
        if (previewContent) {
            const resumeContent = previewContent.innerHTML;
            const blob = new Blob([resumeContent], { type: 'text/html' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'resume.html';
            document.body.appendChild(a); // Append anchor to the body to trigger click
            a.click();
            document.body.removeChild(a); // Remove anchor from the body
            URL.revokeObjectURL(url);
        }
    }
    // Prevent form submission and handle button click
    formElement.addEventListener('submit', (event) => {
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
