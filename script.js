document.addEventListener('DOMContentLoaded', () => {
    let msg = new SpeechSynthesisUtterance();
    msg.text = "You are on the Registration Form page.";
    speechSynthesis.speak(msg);

    const form = document.getElementById('registration-form');
    const fields = form.querySelectorAll('input, button');

    fields.forEach((field) => {
        field.addEventListener('focus', (e) => {
            msg.text = e.target.labels ? e.target.labels[0].innerText : e.target.innerText;
            speechSynthesis.speak(msg);
        });

        field.addEventListener('input', (e) => {
            msg.text = `You have entered ${e.target.value}`;
            speechSynthesis.speak(msg);
        });
    });

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        msg.text = "Form submitted. Redirecting to home page.";
        speechSynthesis.speak(msg);
        setTimeout(() => {
            window.location.href = 'D:/Projects/BlindPeopleRegistrationPage/login.html';
        }, 2000);
    });
});
