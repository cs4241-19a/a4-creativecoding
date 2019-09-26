export default class Game {

    // Build a new game
    constructor(word_difficulty, speed_difficulty, time_difficulty, rotation_enabled, rotation_difficulty, lives, color) {
        // Get the word difficulty,  the higher the difficulty, the longer the word
        this.word_difficulty = word_difficulty;
        // Get the speed difficulty, the higher the difficulty, the faster the word moves across the screen
        this.speed_difficulty = speed_difficulty;
        // Get the time difficulty, the higher the difficulty, the faster words are spawned at the top of the screen
        this.time_difficulty = time_difficulty;
        // Get whether rotation is enabled or not
        this.rotation_enabled = rotation_enabled;
        // Get the rotation difficulty, the higher the difficulty, the faster the word rotates (if enabled)
        this.rotation_difficulty = rotation_difficulty;
        // Get the default number of lives
        this.lives = lives;
        // The color that the text should be
        this.color = color;
        // Whether or not the game should be paused/stopped
        this.stop = true;
        // Initialize the score to zero
        this.score = 0;

        // Initialize the default font
        this.font = "proxima-nova, sans-serif";

        // Initialize the font size
        this.font_size = 30;

        // Initialize the array of words
        this.words = [];

        // Initialize the array of text objects
        this.texts = [];

        // Initialize two.js
        // eslint-disable-next-line no-undef
        this.two = new Two({
            fullscreen: true,
            autostart: true
        }).appendTo(document.getElementById('app'));

        // Call render function
        this.render();
    }

    // Just updates the two.js scene
    render() {
        this.two.update();
    }

    // Update the difficulty
    updateDifficulty(difficulty) {
        this.difficulty = Math.round(difficulty);
    }

    // Remove a life
    removeLife(){
        this.lives--;
    }

    // Spawn a new word
    newWord(word) {
        // If stopped, don't continue and just return
        if(this.stop) {
            return;
        }

        // Define styles for the words
        var styles = {
            family: this.font,
            size: this.font_size,
            leading: 50,
            weight: 900,
            fill: this.color
        };

        // Create the text object
        var text = this.two.makeText(word, Math.random() * this.two.width / 2 + this.two.width / 4, 0, styles);
        
        // Add the word to the array
        this.words.push(word);
        // Add the text object to the array
        this.texts.push(text);

        // Create new velocity for the text
        // eslint-disable-next-line no-undef
        text.velocity = new Two.Vector();

        // Change the y velocity depending on the speed difficulty
        if (this.speed_difficulty === 0) {
            text.velocity.y = 3;
        } else if (this.speed_difficulty === 1) {
            text.velocity.y = 5;
        } else if(this.speed_difficulty === 2) {
            text.velocity.y = 6;
        } else if(this.speed_difficulty === 3) {
            text.velocity.y = 7;
        } else if(this.speed_difficulty === 4) {
            text.velocity.y = 8;
        } else if(this.speed_difficulty === 5) {
            text.velocity.y = 18;
        }

        // Change the rotation velocity depending on the rotation difficulty
        if (this.rotation_difficulty === 0) {
            text.velocity.r = .01;
        } else if (this.rotation_difficulty === 1) {
            text.velocity.r = .02;
        } else if(this.rotation_difficulty === 2) {
            text.velocity.r = .03;
        } else if(this.rotation_difficulty === 3) {
            text.velocity.r = .04;
        } else if(this.rotation_difficulty === 4) {
            text.velocity.r = .05;
        } else if(this.rotation_difficulty === 5) {
            text.velocity.r = .08;
        }

        // Define a variable for 'this' to be accessed in the update loop
        // I know this probably isn't great, but it works 
        let vm = this;

        this.two
            .bind("update", function () {
                // This runs every frame update

                // Add the velocity to the y translation
                text.translation.addSelf(text.velocity);
                if(vm.rotation_enabled) {
                    // Add the rotation if enabled
                    text.rotation += text.velocity.r;
                }

                // if the text is outside screen boundaries, remove it and take a life away
                if (text.translation.y > vm.two.height)  {
                    console.log('Removed off screen word: ' + word);
                    text.remove();
                    let index = vm.words.indexOf(word);
                    // Remove the word and text from their respective arrays
                    vm.words.splice(index, 1);
                    vm.texts.splice(index, 1);
                    // For some reason, removing it just makes it dissapear, but it bugs out, this fixes it so that it won't keep taking lives away
                    text.translation.y = 0;
                    text.velocity.y = 0;
                    text.translation.addSelf(text.velocity);

                    if(index !== -1) { // Take a life away if the text is in the array
                        vm.lives--;
                    }
                  } 
            })
            .play();


        this.render();
    }

    // See if the word typed by the user exists
    submitWord(word) {
        let index = this.words.indexOf(word);
        // If index is not -1, then the word is in the array
        if(index !== -1) {
            let text = this.texts[index];
            // Same as above, I have to do this so it doesn't continue to the bottom and take a life away
            text.translation.y = 0;
            text.velocity.y = 0;
            text.translation.addSelf(text.velocity);
            text.remove();
            // Increase the score
            this.score++;
            // Return true as the user typed the word correctly
            return true;
        } else {
            // The user typed the word wrong
            return false;
        }
    }

}