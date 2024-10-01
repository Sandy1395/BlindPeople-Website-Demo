document.addEventListener('DOMContentLoaded', () => {
    let msg = new SpeechSynthesisUtterance();

    // Function to announce page name
    function announcePageName() {
        msg.text = "You are on the Login Form page.";
        speechSynthesis.speak(msg);
    }

    // Check if speech can be triggered automatically based on user interaction
    function ensureSpeechAfterInteraction() {
        // Add a click event listener to detect user interaction
        document.addEventListener('click', () => {
            announcePageName();  // Announce page name after first click
        }, { once: true });
    }

    // Try to speak when the page loads
    try {
        // Trigger the announcement immediately if allowed
        announcePageName();
    } catch (error) {
        // Fallback to waiting for a user interaction if the browser blocks it
        ensureSpeechAfterInteraction();
    }

    const form = document.getElementById('login-form');
    const fields = form.querySelectorAll('input, button');

    fields.forEach((field) => {
        field.addEventListener('focus', (e) => {
            // Cancel any ongoing speech
            speechSynthesis.cancel();

            // Speak the field label or button text
            if (e.target.tagName === 'BUTTON') {
                msg.text = "You are now on the " + e.target.innerText + " button.";
            } else if (e.target.tagName === 'INPUT') {
                msg.text = "You are now on the " + (e.target.labels[0]?.innerText || e.target.name) + " field.";
            }
            speechSynthesis.speak(msg);
        });

        field.addEventListener('input', (e) => {
            // Cancel any ongoing speech
            speechSynthesis.cancel();

            // Speak what the user has typed
            msg.text = `You have entered ${e.target.value}`;
            speechSynthesis.speak(msg);
        });
    });

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        speechSynthesis.cancel();  // Cancel any ongoing speech
        msg.text = "Login form submitted. Redirecting to Home page.";
        speechSynthesis.speak(msg);

        setTimeout(() => {
            window.location.href = 'D:/Projects/BlindPeopleRegistrationPage/home.html';
        }, 2000);
    });
});
