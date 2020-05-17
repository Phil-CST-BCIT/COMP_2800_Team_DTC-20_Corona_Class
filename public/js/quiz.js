// quiz testing + score and nav logic
// the following currently do not work
// const datasets = require('./datasets');
// const questions = datasets.fiveQuestions;
const questions = [
    {
        id: 1,
        question: 'Which is not a transmission method of the Coronavirus?',
        answer: 'Cellular network signals',
        options: ['Direct contact with infected persons', 'Contact with contaminated surfaces', 'Cellular network signals', 'Contact with infected respiratory droplets, as exhaled by an infected person']
    },
    {
        id: 2,
        question: 'When are non-medical masks most effective at slowing the spread of COVID-19?',
        answer: 'When used by infected persons around uninfected',
        options: ['When used by uninfected persons in public places', 'When used by uninfected persons around infected', 'Masks are ineffective at slowing the spread', 'When used by infected persons around uninfected']
    },
    {
        id: 3,
        question: 'Which is NOT a symptom of the Coronavirus?',
        answer: 'Numbness in limbs',
        options: ['Fever', 'Fatigue', 'Headaches', 'Numbness in limbs']
    },
    {
        id: 4,
        question: 'What is the incubation period for the Coronavirus?',
        answer: '',
        options: ['Within 6 hours of infection', 'Within 3-4 weeks of infection', 'The onset of symptoms is entirely random', 'Within two weeks of infection']
    },
    {
        id: 5,
        question: 'Where was the first cases of the Coronavirus discovered?',
        answer: 'Wuhan, China', 
        options: ['Lombardy, Italy', 'Taipei, Taiwain', 'New York, USA', 'Wuhan, China']
    }
];
let userAnswers = [];
let questionsArray = makeQuestionArray(questions);
let answerArray = makeAnswerArray(questions);
let quizIndex = 0;

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
    if (userAnswers[-1] != answer) {
        userAnswers.push(answer);
    }
    console.log(userAnswers);
}

// from 2537 week 3 starter code package
$(document).ready(function(){

    $('.option-item').on('click', function() {

        console.log('Selected answer: ' + this.innerText);
        ++quizIndex;

        if (quizIndex <= questions.length) {
            userSelect(this.innerText);
        }

        if (quizIndex < questions.length) {
            let currentQuestion = questions[quizIndex];
            let options = currentQuestion.options;

            $('#question-number').text(currentQuestion.id);
            $('#question').text(currentQuestion.question);
            $('#option-a').text(options[0]);
            $('#option-b').text(options[1]);
            $('#option-c').text(options[2]);
            $('#option-d').text(options[3])              
        }
    })
})

