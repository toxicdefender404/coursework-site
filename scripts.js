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

// Array to store quiz questions and answers
quizQuestions = [
    { question: "", correctAnswer: "" },
    { question: "", correctAnswer: "" },
    { question: "", correctAnswer: "" },
    { question: "", correctAnswer: "" },
    { question: "", correctAnswer: "" }
];

let currentQuestion = 0; // Index of the current question
let score = 0; // User's score

// Function to generate a random integer between min and max
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (Math.floor(max) - Math.ceil(min) + 1)) + Math.ceil(min);
}

// Function to convert a number to binary
function toBinary(num) {
    return num.toString(2);
}

// Function to generate quiz questions
function generateQuestion() {
    for (var i = 0; i < quizQuestions.length; i++) {
        let rand = getRandomInt(0, 255);
        quizQuestions[i].question = toBinary(rand);
        quizQuestions[i].correctAnswer = rand;
    }
}

// Function to display the current question
function displayQuestion() {
    const questionElement = document.getElementById('question');
    questionElement.textContent = "Convert " + quizQuestions[currentQuestion].question + " to Denary";
}
var completed = false;
// Function to check the user's answer
function checkAnswer() {
    if (completed){
        document.getElementById('arithmetic-options-container').style.display = 'flex';
        document.getElementById('quiz-container').style.display = 'none';
        generateQuestion();
        displayQuestion();
        completed = false;
        return;
    }
    const answerInput = document.getElementById('answer-input').value.trim();

    if (Number(answerInput) == Number(quizQuestions[currentQuestion].correctAnswer)) {
        score++;
        alert('Correct!');
    } else {
        alert(`Sorry, that's incorrect. The answer was ${quizQuestions[currentQuestion].correctAnswer}.`);
    }

    currentQuestion++;
    if (currentQuestion < quizQuestions.length) {
        displayQuestion();
    } else {
        showResult();
    }
}

// Function to show the quiz result
function showResult() {
    const questionElement = document.getElementById('question');
    questionElement.textContent = `Quiz completed! Your score: ${score}/${quizQuestions.length}`;
    completed = true;
    currentQuestion = 0;
}

prev = "0"
// Function to change the active menu item and display the appropriate content
function changeMenu(id) {
    if(document.getElementById(id).className == 'nav-item'){
        const navItems = document.querySelectorAll('.nav-item'); // Get all nav items
        navItems.forEach(item => item.classList.remove('active')); // Remove active class from all nav items
        document.getElementById(id).classList.add('active'); // Add active class to clicked nav item
    }
    if (prev == "0"){
        document.getElementById('welcome-text').style.display = "none";
    }
    if (id == "3") { //arithmetic
        document.getElementById('arithmetic-options-container').style.display = "flex";
        displayQuestion();
        prev = id;
    } else {//otherwise go to home page
        document.getElementById('arithmetic-options-container').style.display = "none";
        document.getElementById('welcome-text').style.display = "block";
    }
}

generateQuestion();


