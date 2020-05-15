// quiz testing + score and nav logic

// from 2537 week 3 starter code package
$(document).ready(function(){

    $('.option-item').on('click', function() {
        
        $.ajax('/nextQuestion')
            .done(function(data) {
                let options = data.options;
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

