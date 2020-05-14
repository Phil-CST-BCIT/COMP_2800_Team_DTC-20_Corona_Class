// quiz testing + score and nav logic
let qPool = [
    { // question 1
        question: 'Which is not a transmission method of the Coronavirus?',
        answer: 'Cellular network signals',
        options: ['Direct contact with infected persons', 'Contact with contaminated surfaces', 'Cellular network signals', 'Contact with infected respiratory droplets, as exhaled by an infected person']
    },
    { // question 2
        question: 'When are non-medical masks most effective at slowing the spread of COVID-19?',
        answer: 'When used by infected persons around uninfected',
        options: ['When used by uninfected persons in public places', 'When used by uninfected persons around infected', 'Masks are ineffective at slowing the spread', 'When used by infected persons around uninfected']
    },
    { // question 3
        question: 'Which is NOT a symptom of the Coronavirus?',
        answer: 'Numbness in limbs',
        options: ['Fever', 'Fatigue', 'Headaches', 'Numbness in limbs']
    }
];

// from 2537 week 3 starter code package
$(document).ready(function(){

    $('.option-item').on('click', function() {
        
        $.ajax('/nextQuestion')
            .done(function(data) {
                let options = data.options;
                console.log(data);
                $('#question-number').text(data.id);
                $('#question').text(data.question);
                $('#option-a').text(options[0]);
                $('#option-a').text(options[1]);
                $('#option-b').text(options[2]);
                $('#option-c').text(options[3])
                
            })
            .fail(function(error){
                console.log(error);
            })

    })
})

