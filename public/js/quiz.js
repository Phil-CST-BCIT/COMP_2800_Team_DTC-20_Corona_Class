// quiz testing + score and nav logic

const correctImgURL = '/css/images/correct.png';
const wrongImgURL = '/css/images/wrong.png';
let userAnswers = [];
// let questionsArray = makeQuestionArray(questions);
// let answerArray = makeAnswerArray(questions);
let quizIndex = 0;
const timer = 2000;
let allowClick = true;
let userPoints = 0;
let userCorrectCount = 0;
const qPointValue = 10;
let questions;

// unused
// function makeQuestionArray(questions) {
//     let questionArray = [];
//     for (let i=0; i < questions.length; i++) {
//         questionArray.push(questions[i].question);
//     }
//     return questionArray;
// }

// function makeAnswerArray(questions) {
//     let answerArray = [];
//     for (let i=0; i < questions.length; i++) {
//         answerArray.push(questions[i].question);
//     }
//     return answerArray;
// }

function showScore() {
    let questionPage = document.getElementById('questionPage');
    let scorePage = document.getElementById('scorePage');
    let startPage = document.getElementById('startPage');
    startPage.style.display = 'none';
    questionPage.style.display = 'none';
    scorePage.style.display = 'block';
}

// changes view to quiz questions page, selecting 'quit' refreshes the page (and starting again will create new questions)
function startQuiz() {
    let questionPage = document.getElementById('questionPage');
    let startPage = document.getElementById('startPage');
    startPage.style.display = 'none';
    questionPage.style.display = 'grid';
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

// temporarily change border color of an answer
function highlightAnswer(options, answer, color) {
    let optionIdAffix = ['A', 'B', 'C', 'D'];
    for (let i = 0; i < options.length; i++) {
        let targetId = document.getElementById('opt' + optionIdAffix[i]);
        if (options[i] === answer) {
            targetId.style.borderColor = color;
            setTimeout(function () {
                // reset to default border color
                targetId.style.borderColor = '#6E1B09';
            }, timer);
            break;
        }
    }
}

function compareAnswer(options, input, answer) {
    let isCorrect = checkAnswer(input, answer);
    // green shade for correct answer
    highlightAnswer(options, answer, 'rgb(53, 250, 18)');
    if (!isCorrect) {
        // incorrect answer
        highlightAnswer(options, input, 'grey');
        answerPopup(wrongImgURL);
    }
    else {
        // correct answer, increments user points
        userPoints += qPointValue;
        userCorrectCount++;
        answerPopup(correctImgURL);
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
// Q for question
$(document).ready(function () {

    $('.option-item').on('click', function() {

        if (allowClick) {
            quizIndex++;
            console.log('question ' + quizIndex + ' done');
            disableButtons();
        }
        // condition for score page
        if (quizIndex >= 5) {
            setTimeout(function () {
                showScore();
                $('#score').text(userCorrectCount);
            }, timer);
        }
    })

    $("#start").on("click", function (e) {
        e.preventDefault();
        console.log('quiz start');
        startQuiz();
        // showScore();
        
    
        $.ajax({ method: "GET", url: "/questions/start", dataType: "json" })
          .done((data) => {
            console.log(data);
            questions = data; // alias
            console.log(questions[0]);
            
            let firstQ = data[quizIndex];
            let options = [firstQ.answer_a, firstQ.answer_b, firstQ.answer_c, firstQ.answer_d];
    
            $('#question-number').text(quizIndex + 1);
            $('#question').text(nextQ.question);
            $('#option-a').text(options[0]);
            $('#option-b').text(options[1]);
            $('#option-c').text(options[2]);
            $('#option-d').text(options[3]);
    
            $('.option-item').on('click', function() {
                let userAns = this.innerText;
                // check result with database
                let currentQ = data[quizIndex];
                let options = [currentQ.answer_a, currentQ.answer_b, currentQ.answer_c, currentQ.answer_d];
                let correctAns = currentQ.correct_answer;
        
                if (quizIndex <= questions.length && userAnswers[quizIndex] != userAns) {
                    // immediate results of selecting an answer
                    buttonEvent(options, userAns, correctAns);
                }
        
                if (quizIndex < questions.length) {
                    setTimeout(function () {
                        let nextQ = data[quizIndex];
                        options = [nextQ.answer_a, nextQ.answer_b, nextQ.answer_c, nextQ.answer_d];
        
                        // remove answer check image
                        $('img').remove();
                        $('#question-number').text(quizIndex + 1);
                        $('#question').text(nextQ.question);
                        $('#option-a').text(options[0]);
                        $('#option-b').text(options[1]);
                        $('#option-c').text(options[2]);
                        $('#option-d').text(options[3]);
                    }, timer);

                // condition for score page
                if (quizIndex >= questions.length) {
                    setTimeout(function () {
                        showScore();
                        $('#score').text(userCorrectCount);
                    }, timer);
                }
                }
            })
          })
          .fail((error) => {
            console.log(error);
          });
      });
    // e.preventDefault();

    // $.ajax({ method: "GET", url: "/questions/start", dataType: "json" })
    //   .done((data) => {

    //     console.log(data);
        // let firstQ = data[quizIndex];
        // let options = [firstQ.answer_a, firstQ.answer_b, firstQ.answer_c, firstQ.answer_d];

        // $('#question-number').text(quizIndex + 1);
        // $('#question').text(nextQ.question);
        // $('#option-a').text(options[0]);
        // $('#option-b').text(options[1]);
        // $('#option-c').text(options[2]);
        // $('#option-d').text(options[3]);

        // $('.option-item').on('click', function() {
        //     let userAns = this.innerText;
        //     let currentQ = data[quizIndex];
        //     let options = [currentQ.answer_a, currentQ.answer_b, currentQ.answer_c, currentQ.answer_d];
        //     let correctAns = currentQ.correct_answer;
    
        //     if (quizIndex <= questions.length && userAnswers[quizIndex] != userAns) {
        //         // immediate results of selecting an answer
        //         buttonEvent(options, userAns, correctAns);
        //     }
    
        //     if (quizIndex < questions.length) {
        //         setTimeout(function () {
        //             let nextQ = data[quizIndex];
        //             options = [nextQ.answer_a, nextQ.answer_b, nextQ.answer_c, nextQ.answer_d];
    
        //             $('img').remove();
        //             $('#question-number').text(quizIndex + 1);
        //             $('#question').text(nextQ.question);
        //             $('#option-a').text(options[0]);
        //             $('#option-b').text(options[1]);
        //             $('#option-c').text(options[2]);
        //             $('#option-d').text(options[3]);
        //         }, timer);
        //     }
        // })
    //   })
    //   .fail((error) => {
    //     console.log(error);
    //   });

    // $('.option-item').on('click', function() {

    //     let userAns = this.innerText;
    //     let currentQuestion = questions[quizIndex];
    //     let options = currentQuestion.options;
    //     let correctAns = currentQuestion.answer;
    //     // compareAnswer(options, userAns, correctAns);

    //     // console.log('Selected answer: ' + userAns);
    //     if (quizIndex <= questions.length && userAnswers[quizIndex] != userAns) {
    //         // immediate results of selecting an answer
    //         buttonEvent(options, userAns, correctAns);
    //     }

    //     if (quizIndex < questions.length) {
    //         setTimeout(function () {
    //             let nextQuestion = questions[quizIndex];
    //             options = nextQuestion.options;

    //             $('img').remove();
    //             $('#question-number').text(quizIndex + 1);
    //             $('#question').text(nextQuestion.question);
    //             $('#option-a').text(options[0]);
    //             $('#option-b').text(options[1]);
    //             $('#option-c').text(options[2]);
    //             $('#option-d').text(options[3]);
    //         }, timer);
    //     }
    // })
})

