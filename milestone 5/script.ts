document.addEventListener('DOMContentLoaded', () => {
    // Get references to the form and display area
    const form = document.getElementById('resume-Form') as HTMLFormElement;
    const resumeDisplayElement = document.getElementById('resume-display') as HTMLDivElement;
    const shareableLinkContainer = document.getElementById('shareable-link-container') as HTMLDivElement;
    const shareableLinkElement = document.getElementById('shareable-link') as HTMLAnchorElement;
    const downloadPdfButton = document.getElementById('downloadResume') as HTMLButtonElement;

    // Handle form submission
    form.addEventListener('submit', (event: Event) => {
        event.preventDefault(); // prevent page reload
        console.log("Form submitted");

        // Correcting the field references
        const username = (document.getElementById('Username') as HTMLInputElement)?.value;
        const name = (document.getElementById('name') as HTMLInputElement)?.value;
        const email = (document.getElementById('email') as HTMLInputElement)?.value;
        const phone = (document.getElementById('phone') as HTMLInputElement)?.value;
        const education = (document.getElementById('education') as HTMLTextAreaElement)?.value;
        const experience = (document.getElementById('workExperience') as HTMLTextAreaElement)?.value;
        const skills = (document.getElementById('skills') as HTMLTextAreaElement)?.value;

        if (!username || !name || !email || !phone || !education || !experience || !skills) {
            console.error("Some form fields are missing or invalid!");
            return;
        }

        console.log("Collected Values: ", {username, name, email, phone, education, experience, skills});

        // Handle profile picture
        const profilePictureInput = document.getElementById('profilePicture') as HTMLInputElement;
        const profilePictureURL = (document.getElementById('profilePictureURL') as HTMLInputElement)?.value;

        let profilePictureSrc = '';
        if (profilePictureInput.files && profilePictureInput.files.length > 0) {
            const file = profilePictureInput.files[0];
            profilePictureSrc = URL.createObjectURL(file); // Use the local file as image source
        } else if (profilePictureURL) {
            profilePictureSrc = profilePictureURL; // Use the URL provided
        }

        console.log("Profile Picture Source: ", profilePictureSrc);

        // Save form data in localStorage with the username as the key
        const resumeData = {
            name,
            email,
            phone,
            education,
            experience,
            skills,
            profilePictureSrc
        };
        localStorage.setItem(username, JSON.stringify(resumeData));  // Saving the data locally
        console.log("Resume data saved to localStorage");

        // Generate the resume content dynamically, including the profile picture if available
        const resumeHTML = `
            <h2>Editable Resume</h2>
            ${profilePictureSrc ? `<img src="${profilePictureSrc}" alt="Profile Picture" width="100">` : ''}
            <h3>Personal Information</h3>
            <p><b>Name:</b> <span contenteditable="true">${name}</span></p>
            <p><b>Email:</b> <span contenteditable="true">${email}</span></p>
            <p><b>Phone:</b> <span contenteditable="true">${phone}</span></p>

            <h3>Education</h3>
            <p contenteditable="true">${education}</p>

             <h3>Skills</h3>
             <p contenteditable="true">${skills}</p>
            
             <h3>Work Experience</h3>
            <p contenteditable="true">${experience}</p>
        `;

        console.log("Generated HTML for Resume: ", resumeHTML);

        // Display the generated resume
        if (resumeDisplayElement) {
            resumeDisplayElement.innerHTML = resumeHTML;
            console.log("Resume displayed successfully");
        } else {
            console.error("resumeDisplayElement not found!");
        }

        // Generate a shareable URL with the username only
        const shareableURL = `${window.location.origin}?username=${encodeURIComponent(username)}`;
        console.log("Shareable URL generated: ", shareableURL);

        // Display the shareable link
        if (shareableLinkContainer && shareableLinkElement) {
            shareableLinkContainer.style.display = 'block';
            shareableLinkElement.href = shareableURL;
            shareableLinkElement.textContent = shareableURL;
            console.log("Shareable link displayed successfully");
        } else {
            console.error("shareableLinkContainer or shareableLinkElement not found!");
        }
    });

    // Handle PDF download
    downloadPdfButton.addEventListener('click', () => {
        window.print(); // This will open the print dialog and allow the user to save as PDF
        console.log("PDF download triggered");
    });

    // Prefill the form based on the username in the URL
    const urlParams = new URLSearchParams(window.location.search);
    const username = urlParams.get('username'); // Note: case-sensitive based on form field 'Username'

    if (username) {
        console.log("Autofilling form for username: ", username);
        // Autofill form if data is found in localStorage
        const savedResumeData = localStorage.getItem(username);

        if (savedResumeData) {
            const resumeData = JSON.parse(savedResumeData);
            (document.getElementById('Username') as HTMLInputElement).value = username; // Corrected here
            (document.getElementById('name') as HTMLInputElement).value = resumeData.name;
            (document.getElementById('email') as HTMLInputElement).value = resumeData.email;
            (document.getElementById('phone') as HTMLInputElement).value = resumeData.phone;
            (document.getElementById('education') as HTMLTextAreaElement).value = resumeData.education;
            (document.getElementById('workExperience') as HTMLTextAreaElement).value = resumeData.experience;
            (document.getElementById('skills') as HTMLTextAreaElement).value = resumeData.skills;

            // If the profile picture exists, prefill that as well
            if (resumeData.profilePictureSrc) {
                if (resumeData.profilePictureSrc.startsWith('blob:')) {
                    // This is for locally uploaded images
                    const profilePictureInput = document.getElementById('profilePicture') as HTMLInputElement;
                    profilePictureInput.setAttribute('data-image-src', resumeData.profilePictureSrc);
                } else {
                    (document.getElementById('profilePictureURL') as HTMLInputElement).value = resumeData.profilePictureSrc;
                }
            }
            console.log("Form autofilled with saved data");
        }
    }
});
