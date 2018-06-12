var cn = false;
var fs = 16;
$(document).ready(function(){
    $('#text').keydown(function(e){
        if(e.key == 'Control'){
            cn = true;
        }else if(cn){
            if(e.key == ']' || e.key == 'چ'){
                fs++;
                $('#text').css({'font-size': fs+'px'});
            }else if(e.key == '[' || e.key == 'ج'){
                fs--;
                $('#text').css({'font-size': fs+'px'});
                return false;
            }
        }
    });
    $('#text').keyup(function(e){
        if(e.key == 'Control'){
            cn = false;
        }
    });

    $('#submit').click(function(){
        $('.popbox').fadeIn();
        $.ajax({
            type: "POST",
            url: "proccess.prc",
            data: $('#text').val().toString(),
            success: function(d){
                $('.popbox').fadeOut();
                $('#text').val(d);
            }
        });
    });
});