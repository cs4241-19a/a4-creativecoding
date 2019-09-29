let typingSpeed =50;
function typeEffect(typingSpeed) {
    new TypeIt('#mainHeader', {
        speed: typingSpeed,
        waitUntilVisible: true
    })
        .type('Most <strong>Popular</strong> Movie Genres in the 21st Century')
        .go();
}
export {typingSpeed,typeEffect};