// quiz testing + score and nav logic

let userAnswers = [];
let questionsArray = makeQuestionArray(questions);
let answerArray = makeAnswerArray(questions);
let quizIndex = 0;
const timer = 2000;
let allowClick = true;
let userPoints = 0;
let userCorrectCount = 0;
const qPointValue = 10;


function makeQuestionArray(questions) {
    let questionArray = [];
    for (let i=0; i < questions.length; i++) {
        questionArray.push(questions[i].question);
    }
    return questionArray;
}

function makeAnswerArray(questions) {
    let answerArray = [];
    for (let i=0; i < questions.length; i++) {
        answerArray.push(questions[i].question);
    }
    return answerArray;
}

function userSelect(answer) {
    if (userAnswers[quizIndex] != answer) {
        userAnswers.push(answer);
    }
    console.log(userAnswers);
}

function checkAnswer(input, answer) {
    if (input === answer) {
        return true;
    }
    else {
        return false;
    }
}

function answerPopup (img_url) {
    let popupDiv = document.getElementById('questionInfo');
    let img = document.createElement('img');
    img.src = img_url;
    img.style.width = '180px';
    img.style.position = 'relative';
    img.style.bottom = '180px';
    popupDiv.appendChild(img);
}

function highlightAnswer(options, answer, color) {
    let optionIdAffix = ['A', 'B', 'C', 'D'];
    for (let i = 0; i < options.length; i++) {
        let targetId = document.getElementById('opt' + optionIdAffix[i]);
        if (options[i] === answer) {
            targetId.style.borderColor = color;
            setTimeout(function () {
                targetId.style.borderColor = '#6E1B09';
            }, timer);
            break;
        }
    }
}

function compareAnswer(options, input, answer) {
    let isCorrect = checkAnswer(input, answer);
    highlightAnswer(options, answer, 'rgb(53, 250, 18)');
    if (!isCorrect) {
        // incorrect answer
        highlightAnswer(options, input, 'grey');
        answerPopup('/css/images/wrong.png');
    }
    else {
        // correct answer, increments user points
        userPoints += qPointValue;
        userCorrectCount++;
        answerPopup('/css/images/correct.png');
    }
}

function disableButtons() {
    allowClick = false;
    setTimeout(function () {
        allowClick = true;
    }, timer);
}

function reenableButton(btnId) {
    let btn = document.getElementById(btnId);
    btn.onclick = buttonEvent;
}

function buttonEvent(options, userAns, correctAns) {
    // button actions plus disables buttons and reenables after 2 seconds
    // let btnIdAffixs = ['A', 'B', 'C', 'D'];
    // console.log(allowClick);
    if (allowClick) {
        ++quizIndex;
        userSelect(userAns);
        compareAnswer(options, userAns, correctAns);
        disableButtons();
    }
}


// from 2537 week 3 starter code package
$(document).ready(function(){

    $('.option-item').on('click', function() {

        let userAns = this.innerText;
        let currentQuestion = questions[quizIndex];
        let options = currentQuestion.options;
        let correctAns = currentQuestion.answer;
        // compareAnswer(options, userAns, correctAns);

        // console.log('Selected answer: ' + userAns);
        if (quizIndex <= questions.length && userAnswers[quizIndex] != userAns) {
            // immediate results of selecting an answer
            buttonEvent(options, userAns, correctAns);
        }

        if (quizIndex < questions.length) {
            setTimeout(function () {
                let nextQuestion = questions[quizIndex];
                options = nextQuestion.options;

                $('img').remove();
                $('#question-number').text(quizIndex + 1);
                $('#question').text(nextQuestion.question);
                $('#option-a').text(options[0]);
                $('#option-b').text(options[1]);
                $('#option-c').text(options[2]);
                $('#option-d').text(options[3]);
            }, timer);
        }
    })
})

