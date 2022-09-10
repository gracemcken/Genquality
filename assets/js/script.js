// **Quiz randomized questions with yes no answer choices**

let questions = [{
    question: "Women Negotiate for Raises and Promotions as Often as Men Do?",
    explanation: "In the last few years while 29% of men had negotiated for a raise, 31% of women had done the same. And 36% of men negotiated for a promotion compared to 37% of women.",
    answer: true
}, {
    question: "Gender inequality is not an issue in developed countries?",
    explanation: "Although many countries have made progress on some aspects of gender equality, inequality remains high. In the US, there are just 66 women for every 100 men in leadership and managerial positions, and women do almost double the unpaid care work that men do.",
    answer: false
}, {
    question: "On average, women around the world spend more than twice as many hours as men doing unpaid work.?",
    explanation: "Across their lifetimes, on average a woman will spend seven years more performing unpaid work than a man",
    answer: true
}, {
    question: "Parents are more likely to teach their sons core breadwinning skills like how to build credit and invest their money?",
    explanation: "Girls, meanwhile, are more likely to be taught how to track their spending and budget.",
    answer: true
}, {
    question: "Women don’t ask for more money?",
    explanation: "Women who asked obtained a raise 15% of the time, while men obtained a pay increase 20% of the time.",
    answer: false
}, {
    question: "The wage gap exists because woman choose lower-paying careers ?",
    explanation: "Women are more limited than men in terms of livelihood options due to gender discrimination (especially in STEM fields such as science, technology, engineering, and mathematics — subjects that women perform well in at school but tend not to follow as careers).",
    answer: false
}, {
    question: "Gender imbalance issues have improved over time?",
    explanation: "Women are more limited than men in terms of livelihood options due to gender discrimination (especially in STEM fields such as science, technology, engineering, and mathematics — subjects that women perform well in at school but tend not to follow as careers).",
    answer: false
}, {
    question: "Women are twice as likely to be mistaken for junior employees?",
    explanation: "Women are also nearly twice as likely to report needing to provide more evidence of their competence, and are more likely to have their judgement questioned in their area of expertise and to be the targets of demeaning remarks.",
    answer: true
}];


let question;
let answer;
let explanation;
let timer = 0;

let rightAnswer = 0;
let wrongAnswer = 0;

// Added canClick variable to prevent multiple clicks
let canClick = true;


// Function to generate random number between 1 and Length of a data-set
function getRandomQuestion() {
    let qLength = questions.length;
    let indexOfQuestion = Math.floor(Math.random() * qLength);

    // Select question from data-set
    if (questions.length > 0) {
        let randomQuestion = questions[indexOfQuestion];
        questions.splice(indexOfQuestion, 1);
        answer = randomQuestion.answer;
        explanation = randomQuestion.explanation;
        return randomQuestion;
    } else {
        return null;
    }
}

function charCount(str) {
    return str.length;
}

// Calculate percentage of right answers
function calcAnswerPercentage(rightAnswer, wrongAnswer) {
    let totalAnswer = rightAnswer + wrongAnswer;
    let percentage = (rightAnswer / totalAnswer) * 100;
    return percentage;
}

// Answer 8 quiz questions to test your knowledge, 
// by the end of the quiz you will know how much you know about equality
// Function to render question card element on the screen
function renderCard() {
    let questionEl = document.querySelector('#quiz-El');
    let buttonContainer = document.querySelector('.button-container');
    let container = document.querySelector('.answer-popup');

    let percentage = calcAnswerPercentage(rightAnswer, wrongAnswer);
    let percentageInt = Math.floor(percentage);

    container.innerHTML = '';
    questionEl.innerHTML = '';

    // Call Get random question function
    question = getRandomQuestion();

    if (question != null) {
        // Render question
        questionEl.innerHTML = `
        <div class="question">
        <h1> Q <span class="">${questions.length + 1}</span> of <span>8</span></h1>
        </h1><p> ${question.question}</p>
        </div> 
        `;
    } else {
        // If there are no more questions, render the result card
        buttonContainer.innerHTML = '';
        questionEl.innerHTML = `
        <div class="question">
            <h1> <span>${percentageInt}%</span> of <span>100%</span></h1>
            <p>You got ${rightAnswer} out of ${rightAnswer + wrongAnswer} questions right</p>
            <div class="button-container">
                <a href="quiz.html" type="button" class="border-right true" aria-label="Restart quiz"><i class="fa-solid fa-rotate-right"></i></a>
                <a href="resources.html" type="button" class="false" aria-label="Leave"><i class="fa-solid fa-right-to-bracket"></i></a>
            </div>
        </div> 
        `;
        container.innerHTML = '';
    }
}

// Hide element function
function hideElem(elem) {
    elem.classList.add('hide');
    elem.classList.remove('show');
    canClick = true;
}

// Show element function
function showElem(elem) {
    elem.classList.add('show');
    elem.classList.remove('hide');
}

// Initialize timeout variable
let hideElemTomeOut = null;
let clearContainerTimeOut = null;

// Render explanation in the card if answer was wrong
function renderExplanation() {
    const container = document.querySelector('.answer-popup');
    const btnNext = document.querySelector('.btn-next');

    // Set timer to char count of explanation * 60ms
    if (question != null) {
        timer = charCount(explanation) * 60;
    }

    // Show container and hide next button
    container.classList.remove('hidden');
    showElem(container);
    showElem(btnNext);

    // Set timer to hide explanation
    hideElemTomeOut = setTimeout(function () {
        hideElem(btnNext);
        hideElem(container);
    }, timer);

    // Hidden but visible by screen readers
    setTimeout(function () {
        container.classList.add('hidden');
    }, timer + 300);

    // Render explanation
    container.innerHTML = `
            <div class="quiz-card">
                <h4 class="wrong text-center"><i class="fa-solid fa-exclamation"></i> Incorrect answer because...</h4>
                <p>${explanation}</p>
            </div>
            `;

    // clear element after specified time
    clearContainerTimeOut = setTimeout(function () {
        container.innerHTML = '';
    }, timer + 300);

}

// Wrong answer effect function
// Get card element and add wrong class to it
function buzzEffect(answer) {
    let cardWrapper = document.querySelector('.card-wrapper');
    let quizCard = document.querySelector('.quiz-card');
    if (answer == false) {
        quizCard.classList.add('buzz-wrong');
        cardWrapper.classList.add('buzz-wrong');
    } else {
        quizCard.classList.add('buzz-right');
        cardWrapper.classList.add('buzz-right');
    }
    setTimeout(function () {
        quizCard.classList.remove('buzz-wrong');
        cardWrapper.classList.remove('buzz-wrong');
        cardWrapper.classList.remove('buzz-right');
        quizCard.classList.remove('buzz-right');
    }, 500);
    changeColor();
}

// Render next question after specified time
let timeOut = null;

function renderNextQuestion(timer) {
    timeOut = setTimeout(function () {
        renderCard();
        canClick = true;
    }, timer);
}

// Add event listeners to the answer 'Yes' and 'No' buttons
let init = 0;

function addListeners() {
    const btnTrue = document.querySelector('#btn-true');
    const btnFalse = document.querySelector('#btn-false');
    const btnNext = document.querySelector('.btn-next');

    btnTrue.addEventListener('click', function () {
        if (canClick) {
            if (init == 0) {
                renderCard();
                init = 1;
            } else {
                checkAnswer(true);
                canClick = false;
            }
        }
    });

    btnFalse.addEventListener('click', function () {
        if (canClick) {
            if (init == 0) {
                document.location.href = 'https://raivis80.github.io/Genquality/index.html';
                init = 1;
            } else {
                checkAnswer(false);
                canClick = false;
            }
        }
    });

    btnNext.addEventListener('click', function () {
        renderCard();
        canClick = true;
        // Cancel timeout function to hide explanation
        clearTimeout(timeOut);
        hideElem(btnNext);
    });
}

addListeners();

// Create function to check if the answer is correct
// Keep right and wrong answer count to display percentage at the end of the quiz
function checkAnswer(inputAnswer) {
    if (inputAnswer == answer) {
        buzzEffect(true);
        rightAnswer++;
        renderNextQuestion(100);
    } else {
        buzzEffect(false);
        wrongAnswer++;
        renderExplanation();
        // Clear next question timer
        renderNextQuestion(timer);
    }
}

// **Question randomized background color render**
// Function to generate random color based on color list
function getRandomColor() {
    const colors = ['#EDDCD2', '#FFF1E6', '#FDE2E4', '#FAD2E1', '#C5DEDD', '#DBE7E4', '#F0EFEB', '#D6E2E9', '#BCD4E6', '#99C1DE'];
    let randomColor = colors[Math.floor(Math.random() * colors.length)];
    return randomColor;
}

// Based on click event o a button add class to the 'main-container' to change color
function changeColor() {
    let randomColor = getRandomColor();
    let mainContainer = document.querySelector('.main-container');
    let cardWrapper = document.querySelector('.card-wrapper');
    let answerPopup = document.querySelector('.answer-popup');

    mainContainer.style.backgroundColor = randomColor;
    cardWrapper.style.backgroundColor = randomColor;
    answerPopup.style.backgroundColor = randomColor;
}