// TypeScript code to toggle skills section visibility
document.addEventListener('DOMContentLoaded', function () {
    var toggleButton = document.getElementById('toggle-skills');
    var skillsSection = document.getElementById('skills');
    if (toggleButton && skillsSection) {
        toggleButton.addEventListener('click', function () {
            if (skillsSection.style.display === 'none' || skillsSection.style.display === '') {
                skillsSection.style.display = 'block';
                toggleButton.textContent = 'Hide Skills';
            }
            else {
                skillsSection.style.display = 'none';
                toggleButton.textContent = 'Show Skills';
            }
        });
    }
});
