// Function to open the side navigation
function openNav() {
    document.getElementsByClassName("side-nav")[0].style.width = "250px";
    document.addEventListener('click', outsideClickListener);
}

// Function to close the side navigation
function closeNav() {
    document.getElementsByClassName("side-nav")[0].style.width = "0";
    document.removeEventListener('click', outsideClickListener);
}

// Function to close the side navigation if clicking outside of it
function outsideClickListener(event) {
    const sideNav = document.getElementsByClassName("side-nav")[0];
    if (!sideNav.contains(event.target) && !event.target.closest('.hamburger')) {
        closeNav();
    }
}

let currentQuestion = 0; // Index of the current question
let score = 0; // User's score

// Function to generate a random integer between min and max
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (Math.floor(max) - Math.ceil(min) + 1)) + Math.ceil(min);
}

// Function to convert a number between bases
function toBase(num,from,to) {
    return parseInt(num,Number(to)).toString(Number(from));
}

prev = "0"
// Function to change the active menu item and display the appropriate content
function changeMenu(id) {
    if(document.getElementById(id).className == 'nav-item'){
        const navItems = document.querySelectorAll('.nav-item'); // Get all nav items
        navItems.forEach(item => item.classList.remove('active')); // Remove active class from all nav items
        document.getElementById(id).classList.add('active'); // Add active class to clicked nav item
    }
    switch (prev)
    {
        case "0": //welcome page
            document.getElementById('welcome-text').style.display = "none";
            break;
        case "1": //arithmetic
            document.getElementById('arithmetic-options-container').style.display = "none";
            document.getElementById('quiz-container').style.display = "none";
        case "3": //conversion
            document.getElementById('conversion-options-container').style.display = "none";
            document.getElementById('quiz-container').style.display = "none";
            break;
        default: //other (unimplemented) options
            document.getElementById('welcome-text').style.display = "none";
            break;
    }
    prev = id;
    switch (id)
    {
        case "0": //welcome page
            document.getElementById('welcome-text').style.display = "block";
            break;
        case "1":
            document.getElementById('arithmetic-options-container').style.display = "flex";
            break;
        case "3": //conversion
            document.getElementById('conversion-options-container').style.display = "flex";
            break;
        default: //other (unimplemented) options
            document.getElementById('welcome-text').style.display = "block";
            break;
    }
}

class Quiz {
    constructor() {
        this.currentQuestion = 0; 
        this.score = 0;
        this.numQuestions = 0;
        this.questions = [];
    }
    displayNext() { 
        if (this.currentQuestion < this.numQuestions) {
            const question = this.questions[this.currentQuestion].question;
            this.displayQuestionText(question);
        } else {
            this.displayResults();
        }
    }
    displayResults() {
        //implement on derived class
    }
    displayQuestionText(question) {
        //implement on derived class
    }
    generateQuestions(){
        //implement on derived class
    }
    isCorrect(userAnswer, currentQuestion) {
        return userAnswer == questions[i].correctAnswer;
    }
    checkAnswer(userAnswer) {
        if (this.isCorrect(userAnswer, this.currentQuestion)) {
            this.score++;
        } else {

        }
        this.currentQuestion++;
        this.displayNext();
    }

}
class ConversionQuiz extends Quiz {
    constructor() {
        super(); // calls the constructor from the base class
    }

    displayResults(){
        const questionElement = document.getElementById('question');
        questionElement.textContent = `Quiz completed! Your score: ${this.score}/${this.questions.length}`;
    }

    displayQuestionText(){
        const questionElement = document.getElementById('question');
        let to = "";
        switch (this.baseTo){
            case "10":
                to = "denary"
                break;
            case "2":
                to = "binary"
                break;
            case "16":
                to = "hexadecimal"
                break;
            default:
                to = "base " + this.baseTo;
                break;
        }
        let from = "";
        switch (this.baseFrom){
            case "10":
                from = "denary"
                break;
            case "2":
                from = "binary"
                break;
            case "16":
                from = "hexadecimal"
                break;
            default:
                from = "base " + this.baseFrom;
                break;
        }
        questionElement.textContent = "Convert " + this.questions[this.currentQuestion].question + " from " + from + " to " + to;
    }

    generateQuestions(numQuestions, from, to){
        this.currentQuestion = 0;
        this.numQuestions = numQuestions;
        this.baseTo = to;
        this.baseFrom = from;
        for (var i = 0; i < this.numQuestions; i++) { //generates a random number between 24 and 255 and convert to binary
            let rand = getRandomInt(24, 255);
            this.questions.push({question : toBase(rand, from, to), correctAnswer: rand});
        }
    }

    isCorrect(){
        const element = document.getElementById('answer-input');
        const value = element.value.trim(); // removes whitespace
        return Number(value) == this.questions[this.currentQuestion].correctAnswer; //converts from string to float and compares
    }

    checkAnswer() {
        if (this.isCorrect(this.currentQuestion)) {
            this.score++;
            alert(`Correct!`);
        } else {
            alert(`Sorry, that's incorrect. The answer was ${this.questions[this.currentQuestion].correctAnswer}.`);
        }
        this.currentQuestion++;
        this.displayNext();
    }

}

class ArithmeticQuiz extends Quiz {
    constructor(){
        super();
    }
    displayResults() {
        //implement on derived class
    }
    displayQuestionText(question) {
        //implement on derived class
    }
    generateQuestions(){
        //implement on derived class
    }
}

var conversionQuiz = new ConversionQuiz();
function submitConversion(){
    document.getElementById('conversion-options-container').style.display = 'none';
    document.getElementById('quiz-container').style.display = 'flex';
    conversionQuiz.generateQuestions(document.getElementById('num-conversion-questions').value
                                    ,document.getElementById('base-from').value
                                    ,document.getElementById('base-to').value);
    conversionQuiz.displayQuestionText();
}

var arithmeticQuiz = new ArithmeticQuiz();
function submitArithmetic(){
    document.getElementById('arithmetic-options-container').style.display = 'none';
    document.getElementById('quiz-container').style.display = 'flex';
    arithmeticQuiz.generateQuestions();
    arithmeticQuiz.displayQuestionText();
}

function checkAnswer(){

    //get all nav items, and find the id of the active one
    const navItems = document.querySelectorAll('.nav-item');
    id = "";
    navItems.forEach(item => {
        if (item.classList.contains('active')){
            id = item.id;
        }
    });

    switch (id){
        case "1":
        case "3":
            conversionQuiz.checkAnswer();
            break;
        default:
            break;
    }
}

