// Add your javascript here
$(function() {
    $.ajax({
        method: "GET",
        url: "http://localhost:3000/api/genres", 
        dataType: "json",
        success: function(res) {   
        console.log(res);
        if(res) {
            res.result.map(item => { 
            $("#list").append("<li class='js-clear'>"+item.name +"</li>")
            })
        }
        },
        error: function(err) {
        console.log(err); 
        },
    });

    $(".submit").on("click", () => {
        const name = $(".input-field").val();
        if(name) {
        $.ajax({
        method: "POST",
        url: "http://localhost:3000/api/genres", 
        data: {name}, 
        dataType: "json",
        success: function(res) { 
            $("#list").append("<li class='js-clear'>"+res.name +"</li>");
            $(".input-field").val("");
            if(res) return $(".error-holder").hide();
        },
        error: function(err) { 
            if(err) return $(".error-holder").show().html(err.responseText);
        },
        });
        }
    });
}); 