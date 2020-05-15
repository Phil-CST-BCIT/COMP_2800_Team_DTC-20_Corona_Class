// slide navigation

$(document).ready(function(){

    $('#nextbtn').on('click', function() {
        
        $.ajax('/nextSlide')
            .done(function(data) {
                
                console.log(data);

                $('#page_number').text(data.page_number);
                $('#title').text(data.title);
                $('#content').text(data.content);
                $('#slideImg').attr('src', data.img_url);

                
            })
            .fail(function(error){
                console.log(error);
            })

    })

    $('#backbtn').on('click', function() {
        
        $.ajax('/prevSlide')
            .done(function(data) {
                
                console.log(data);

                $('#page_number').text(data.page_number);
                $('#title').text(data.title);
                $('#content').text(data.content);
                $('#slideImg').attr('src', data.img_url);

                
            })
            .fail(function(error){
                console.log(error);
            })

    })
})