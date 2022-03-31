
class Phrase {

    /**
     * @param {object} phrase object.
     * @constructor phrase
     */
    constructor(phrase) {
        this.phrase = phrase.toLowerCase();
    };

    /**
     * Generates a DOM Element to each letter in the phrase and append it to the ul node.
     * @this phrase
     */
    addPhraseToDisplay() {
        const phrase = this.phrase;
        const ul = document.getElementsByTagName('ul')[0];

        for (let i = 0; i < phrase.length; i++) {
            let li = document.createElement('li');
            if (phrase[i] !== ' ') {
                li.classList.add('letter');
                li.classList.add(phrase[i]);
                li.classList.add('hide');
            } else {
                li.classList.add('space');
            }
            li.textContent = phrase[i];
            ul.appendChild(li);
        }
    };

    /**
     * Checks if passed letter is in phrase.
     * @param {string} letter - Letter to check.
     * @return True if includes the letter and false if it does not.
     */
    checkLetter(letter) {
        if (this.phrase.includes(letter)) {
            return true
        } else {
            return false
        }
    };

    /**
     * Displays passed letter on screen after a match is found.
     * @param {string} letter - Letter to display.
     */
    showMatchedLetter(letter) {
        const matchedLetter = document.getElementsByClassName(letter);
        for (let i = 0; i < matchedLetter.length; i++) {
            matchedLetter[i].classList.remove('hide');
            matchedLetter[i].classList.add('show');
        }
    };
};