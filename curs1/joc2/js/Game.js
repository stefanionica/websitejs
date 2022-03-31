class Game {

    /**
     * Represents the current game status.
     * @constructor
     */
    constructor() {
        this.missed = 0;
        this.phrases = this.createPhrases();
        this.activePhrase = null;
    };

    /**
     * Stores the phrases available in the game.
     * @returns {array} Array of phrase objects.
     */
    createPhrases() {
        return [
            { phrase: 'Have a Nice Day' },
            { phrase: 'Keep Coding' },
            { phrase: 'You can do it' },
            { phrase: 'We Love Brazil' },
            { phrase: 'Keep learning' },
            { phrase: 'Be as you wish to seem' },
            { phrase: 'You give before you get' },
            { phrase: 'Do more than dream work' },
            { phrase: 'Everything in life is luck' },
            { phrase: 'What we think we become' }
        ]

        //https://github.com/JamesFT/Database-Quotes-JSON/blob/master/quotes.json
        // fetch("https://type.fit/api/quotes")
        //     .then(function (response) {
            
        //         return response.json();
        //     })
        //     .then(function (data) {
        //         console.log(data);
        //     });
    };

        /**
         * Takes a random phrase from phrases array.
         * @method Generates a random number to be used as an index argument.
         * @returns {object} A random phrase object from phrases array.
         */
        getRandomPhrase() {
            const randomIndex = Math.floor(Math.random() * 10);
            return this.phrases[randomIndex];
        };

        /**
         * Transition from starter display to game display.
         * @property {string} activePhrase gets a random phrase assigned as its new value.
         * @this game
         */
        startGame() {
            const overlay = document.getElementById('overlay');
            overlay.style.display = 'none';

            const randomPhrase = this.getRandomPhrase();
            this.activePhrase = randomPhrase.phrase;

            const phrase = new Phrase(randomPhrase.phrase);
            phrase.addPhraseToDisplay();
        };

        /**
         * Checks if the letter selected by the user is in the activePhrase property.
         * @param {HTMLElement} button pressed or typed by the user.
         * Add CSS classes to the DOM element based on the conditional result.
         * @this game
         */
        handleInteraction(button) {
            button.disabled = true;
            const phrase = new Phrase(this.activePhrase);
            if (phrase.checkLetter(button.textContent)) {
                button.classList.add('chosen');
                phrase.showMatchedLetter(button.textContent);
                this.checkForWin();
                if (this.checkForWin()) {
                    this.gameOver(this.checkForWin());
                }
            } else {
                button.classList.add('wrong');
                this.removeLife();
            }
        };

        /**
         * Checks for a winning move by searching a class in all letters.
         * @return {boolean} True if the class is not found it and false if the class in found it.
         * The CSS class 'hide' indicates the player has not guessed all letters in the phrase.
         */
        checkForWin() {
            const letter = document.getElementsByClassName('letter');
            for (let i = 0; i < letter.length; i++) {
                if (letter[i].classList.contains('hide')) {
                    return false
                }
            }
            return true
        };

        /**
         * Replace the red heart to a grey heard.
         * @this game
         * Add 1 to the missing player's count.
         * If player reaches 5 missed tries gameOver method is called.
         */
        removeLife() {
            const tries = document.getElementsByClassName('tries')[this.missed];
            tries.firstChild.src = "images/lostHeart.png";
            this.missed += 1;
            if (this.missed === 5) {
                this.gameOver(false)
            }
        };

        /**
         * Displays game over messages based on the game result.
         * @param {boolean} gameWon - Whether or not the user won the game.
         * Reset all buttons and lifes to a new game.
         * @this game
         */
        gameOver(gameWon) {
            const overlay = document.getElementById('overlay');
            overlay.style.display = '';
            this.missed = 0;

            const ul = document.getElementsByTagName('ul')[0];
            while (ul.hasChildNodes()) {
                ul.removeChild(ul.firstChild);
            }

            const buttons = document.getElementsByClassName('key');
            for (let i = 0; i < buttons.length; i++) {
                buttons[i].classList.remove('chosen');
                buttons[i].classList.remove('wrong');
                buttons[i].disabled = false;
            }

            for (let i = 0; i < 5; i++) {
                const hearts = document.getElementsByClassName('tries')[i];
                hearts.firstChild.src = "images/liveHeart.png";
            }

            const message = document.getElementById('game-over-message');
            if (gameWon) {
                message.textContent = "Felicitari, ai câștigat!";
                overlay.classList.remove('start');
                overlay.classList.remove('lose');
                overlay.classList.add('win');
            } else {
                message.textContent = "Azi nu ai avut noroc la vânătoare!";
                overlay.classList.remove('start');
                overlay.classList.remove('win');
                overlay.classList.add('lose');
            }
        };
    };