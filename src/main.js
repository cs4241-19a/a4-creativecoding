import Game from './game';
import Words from './words';

// Create a new game
var game = new Game(0, 0, 0, false, 0, 3, '#000000');

// Create a word generator
var words = new Words(game.word_difficulty);

// I copied this function from a stack overflow post, it allows me to basically do setInterval, but adjust the time interval dynamically.
function timer() {
    var timer = {
        running: false,
        iv: 5000,
        timeout: false,
        cb: function () { },
        start: function (cb, iv, sd) {
            var elm = this;
            clearInterval(this.timeout);
            this.running = true;
            if (cb) this.cb = cb;
            if (iv) this.iv = iv;
            if (sd) elm.execute(elm);
            this.timeout = setTimeout(function () { elm.execute(elm) }, this.iv);
        },
        execute: function (e) {
            if (!e.running) return false;
            e.cb();
            e.start();
        },
        stop: function () {
            this.running = false;
        },
        set_interval: function (iv) {
            clearInterval(this.timeout);
            this.start(false, iv);
        }
    };
    return timer;
}

// Default interval of 2000;
let interval = 2000;

// Make a new timer
var timeDifficulty = new timer();
timeDifficulty.start(function () {
    // Round off the difficulty if it's not a whole number
    let difficulty = Math.round(game.time_difficulty);

    // Update the time difficulty based off of the difficulty level. Higher the level, the shorter the time between words appearing.
    if (difficulty === 0) {
        timeDifficulty.set_interval(2000);
    } else if (difficulty === 1) {
        timeDifficulty.set_interval(1750);
    } else if (difficulty === 2) {
        timeDifficulty.set_interval(1500);
    } else if (difficulty === 3) {
        timeDifficulty.set_interval(1250);
    } else if (difficulty === 4) {
        timeDifficulty.set_interval(1000);
    } else if (difficulty === 5) {
        timeDifficulty.set_interval(700);
    }

    // If no lives left, stop the game and show "Game Over" on the top where paused would otherwise be.
    if (game.lives <= 0) {
        // eslint-disable-next-line no-undef
        $("#title").text("GAME OVER");
        // eslint-disable-next-line no-undef
        $("#paused").show();
        // Stop the game
        game.stop = true;
    }

    game.newWord(words.getWord());
}, interval, false);

window.onload = function () {
    // eslint-disable-next-line no-undef
    $("#paused").hide();
    // eslint-disable-next-line no-undef
    var gui = new dat.GUI({ autoPlace: true, width: 300 });

    // Add the options to dat.gui
    var word_difficulty = gui.add(game, 'word_difficulty', 0, 5).step(1);
    word_difficulty.onChange(function (value) {
        // Update the word difficulty in words as well.
        words.updateDifficulty(value);
    });
    gui.add(game, 'time_difficulty', 0, 5).step(1);
    gui.add(game, 'speed_difficulty', 0, 5).step(1);
    gui.add(game, 'rotation_enabled');
    gui.add(game, 'rotation_difficulty', 0, 5).step(1);
    gui.add(game, 'color');
    gui.add(game, 'font', [ 'proxima-nova, sans-serif', 'Helvetica, sans-serif', 'Times, serif' ] );
    gui.add(game, 'font_size', 12, 72).step(1);

    // Make sure the score is in sync with game.score
    var score = gui.add(game, 'score').listen();
    score.domElement.style.pointerEvents = "none";

    // Make sure the lives are in sync with game.lives
    var lives = gui.add(game, 'lives').listen();
    lives.domElement.style.pointerEvents = "none";

    // Check to see if enter is pressed when in the input
    // eslint-disable-next-line no-undef
    $("#input").on("keydown", function search(e) {
        if (e.keyCode == 13) {
            // eslint-disable-next-line no-undef
            if (game.submitWord($("#input").val())) {
                // If the value in the input is the same as one of the words on the screen, reset the input to be empty.
                // eslint-disable-next-line no-undef
                $("#input").val('');
            }
        } else if (e.keyCode == 32 || e.keyCode == 191) { // Disregard ' ' and '? /' in the input field
            return false;
        }
    });
    var modal = document.querySelector('.modal');
    var modalClose = document.querySelector('.modal-close');

    document.body.onkeydown = function (e) {
        // If space bar is pressed, toggle the game being paused
        if (e.keyCode == 32) {
            if (!game.stop) {
                // If not stopped, stop
                game.stop = true;
                // eslint-disable-next-line no-undef
                $("#paused").show();
            } else {
                // If stopped, resume
                game.stop = false;
                // eslint-disable-next-line no-undef
                $("#paused").hide();
            }
        } else if(e.keyCode == 191) {
            // Show help dialog if ? / is pressed
            modal.classList.add('is-active');
            game.stop = true;
        }
    }
    
    // Close the modal if clicked outside of the modal
    modal.querySelector('.modal-background').addEventListener('click', function(e) {
        e.preventDefault();
        modal.classList.remove('is-active');
        game.stop = false;
    });
    
    // Close the modal if the 'X' is clicked
    modalClose.addEventListener('click', function(e) {
        e.preventDefault();
        modal.classList.remove('is-active');
        game.stop = false;
    });
};