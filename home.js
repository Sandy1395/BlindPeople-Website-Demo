document.addEventListener('DOMContentLoaded', () => {
    let msg = new SpeechSynthesisUtterance();

    // Function to announce page name
    function announcePageName() {
        msg.text = "You are on the Home Page of SP Systems India Private Limited.";
        speechSynthesis.speak(msg);
    }

    // Function to announce page content
    function announcePageContent() {
        msg.text = "SP Systems India Private Limited is a software company, founded in 2017 by Sandip Purohit";
        speechSynthesis.speak(msg);
    }

    // Announce the content of the <p> tag when clicked
    const paragraph = document.querySelector('p');
    paragraph.addEventListener('click', () => {
        speechSynthesis.cancel();  // Cancel any ongoing speech
        msg.text = paragraph.innerText;
        speechSynthesis.speak(msg);
    });

    // Ensure speech happens after user interaction
    function ensureSpeechAfterInteraction() {
        document.addEventListener('click', () => {
            announcePageName();
            announcePageContent();
        }, { once: true });
    }

    // Try to speak when the page loads
    try {
        announcePageName();
        announcePageContent();
    } catch (error) {
        ensureSpeechAfterInteraction();
    }
});
