"use strict";
document.addEventListener('DOMContentLoaded', () => {
    // Get references to the form and display area
    const form = document.getElementById('resume-Form');
    const resumeDisplayElement = document.getElementById('resume-display');
    // Handle form submission
    form.addEventListener('submit', (event) => {
        var _a, _b, _c, _d, _e, _f, _g;
        event.preventDefault(); // prevent page reload
        console.log("Form submitted");
        // Correcting the field references
        const name = (_a = document.getElementById('name')) === null || _a === void 0 ? void 0 : _a.value;
        const email = (_b = document.getElementById('email')) === null || _b === void 0 ? void 0 : _b.value;
        const phone = (_c = document.getElementById('phone')) === null || _c === void 0 ? void 0 : _c.value;
        const education = (_d = document.getElementById('education')) === null || _d === void 0 ? void 0 : _d.value;
        const experience = (_e = document.getElementById('workExperience')) === null || _e === void 0 ? void 0 : _e.value;
        const skills = (_f = document.getElementById('skills')) === null || _f === void 0 ? void 0 : _f.value;
        if (!name || !email || !phone || !education || !experience || !skills) {
            console.error("Some form fields are missing or invalid!");
            return;
        }
        console.log("Collected Values: ", { name, email, phone, education, experience, skills });
        // Handle profile picture
        const profilePictureInput = document.getElementById('profilePicture');
        const profilePictureURL = (_g = document.getElementById('profilePictureURL')) === null || _g === void 0 ? void 0 : _g.value;
        let profilePictureSrc = '';
        if (profilePictureInput.files && profilePictureInput.files.length > 0) {
            const file = profilePictureInput.files[0];
            profilePictureSrc = URL.createObjectURL(file); // Use the local file as image source
        }
        else if (profilePictureURL) {
            profilePictureSrc = profilePictureURL; // Use the URL provided
        }
        console.log("Profile Picture Source: ", profilePictureSrc);
        // Generate the resume content dynamically, including the profile picture if available
        const resumeHTML = `
            <h2>Resume</h2>
            ${profilePictureSrc ? `<img src="${profilePictureSrc}" alt="Profile Picture" width="100">` : ''}
            <h3>Personal Information</h3>
            <p><b>Name:</b> ${name}</p>
            <p><b>Email:</b> ${email}</p>
            <p><b>Phone:</b> ${phone}</p>

            <h3>Education</h3>
            <p>${education}</p>

            <h3>Skills</h3>
            <p>${skills}</p>

            <h3>Work Experience</h3>
            <p>${experience}</p>
        `;
        console.log("Generated HTML for Resume: ", resumeHTML);
        // Display the generated resume
        if (resumeDisplayElement) {
            resumeDisplayElement.innerHTML = resumeHTML;
            console.log("Resume displayed successfully");
        }
        else {
            console.error("resumeDisplayElement not found!");
        }
    });
    // Prefill the form based on the username in the URL (username-related code removed)
    const urlParams = new URLSearchParams(window.location.search);
    const username = urlParams.get('username'); // Note: case-sensitive based on form field 'Username'
    if (username) {
        console.log("Autofilling form for username: ", username);
        // Autofill form if data is found in localStorage (username-related code removed)
        const savedResumeData = localStorage.getItem(username);
        if (savedResumeData) {
            const resumeData = JSON.parse(savedResumeData);
            document.getElementById('name').value = resumeData.name;
            document.getElementById('email').value = resumeData.email;
            document.getElementById('phone').value = resumeData.phone;
            document.getElementById('education').value = resumeData.education;
            document.getElementById('workExperience').value = resumeData.experience;
            document.getElementById('skills').value = resumeData.skills;
            // If the profile picture exists, prefill that as well
            if (resumeData.profilePictureSrc) {
                if (resumeData.profilePictureSrc.startsWith('blob:')) {
                    // This is for locally uploaded images
                    const profilePictureInput = document.getElementById('profilePicture');
                    profilePictureInput.setAttribute('data-image-src', resumeData.profilePictureSrc);
                }
                else {
                    document.getElementById('profilePictureURL').value = resumeData.profilePictureSrc;
                }
            }
            console.log("Form autofilled with saved data");
        }
    }
});
