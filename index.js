document.addEventListener('DOMContentLoaded', () => {
    let msg = new SpeechSynthesisUtterance();
    
    // Wait for user interaction before starting the speech
    document.addEventListener('click', () => {
        msg.text = "You are on the Registration Form page.";
        speechSynthesis.speak(msg);
    }, { once: true }); // This ensures the event listener is triggered only once.

    const form = document.getElementById('registration-form');
    const fields = form.querySelectorAll('input, button');

    fields.forEach((field) => {
        field.addEventListener('focus', (e) => {
            // Cancel any previously speaking utterance
            speechSynthesis.cancel();

            // Speak the label or button text
            if (e.target.tagName === 'BUTTON') {
                msg.text = "You are now on the " + e.target.innerText + " button.";
            } else if (e.target.tagName === 'INPUT') {
                msg.text = "You are now on the " + (e.target.labels[0]?.innerText || e.target.name) + " field.";
            }
            speechSynthesis.speak(msg);
        });

        field.addEventListener('input', (e) => {
            // Cancel any previously speaking utterance
            speechSynthesis.cancel();

            // Speak what the user is typing
            msg.text = `You have entered ${e.target.value}`;
            speechSynthesis.speak(msg);
        });
    });

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        speechSynthesis.cancel(); // Cancel any ongoing speech
        msg.text = "Form submitted. Redirecting to login page.";
        speechSynthesis.speak(msg);
        
        setTimeout(() => {
            window.location.href = 'D:/Projects/BlindPeopleRegistrationPage/login.html';
        }, 2000);
    });
});