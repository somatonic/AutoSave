

;(function($,config){

    $(function(){

        var $message = $("<div class='autosave_dialog autosave_message'>Page autosaved successful</div>").hide();
        var $error = $("<div class='autosave_dialog autosave_error'>Page could not be saved</div>").hide();

        $("body").append($message);
        $("body").append($error);

        window.setInterval(function(){
            tinyMCE.triggerSave();
            for ( instance in CKEDITOR.instances ) CKEDITOR.instances[instance].updateElement();

            // serialize form and append page id
            var $data = $('form#ProcessPageEdit').serialize() + "&id=" + $('#PageIDIndicator').text();

            //console.log($data);

            $.ajax({
                url: config.urls.admin + 'page/autosave-page-edit/ajaxsave/',
                type: 'post',
                data: $data,
                dataType: "json",
                success: function(data){
                    if(data == 1){
                        $message.slideToggle().delay(4000).fadeOut();
                    } else {
                        if(data.error == true){
                            $error.text("Autosave Error: " + data.message).slideToggle().delay(4000).fadeOut();
                        }
                    }
                    //console.log(data);
                }
            });

        }, config.autosave_interval*1000);

        //var $link = $('<a href="#">AJAX SAVE</a>');
        // $link.on('click',function(e){
        //     e.preventDefault();
        //     // trigger Wywiwyg's so we get the actual edits for posting
        //     tinyMCE.triggerSave();
        //     for ( instance in CKEDITOR.instances ) CKEDITOR.instances[instance].updateElement();

        //     // serialize form and append page id
        //     var $data = $('form#ProcessPageEdit').serialize() + "&id=" + $('#PageIDIndicator').text();

        //     //console.log($data);

        //     $.ajax({
        //         url: config.urls.admin + 'page/autosave-page-edit/ajaxsave/',
        //         type: 'post',
        //         data: $data,
        //         success: function(data){
        //             console.log(data);
        //         }
        //     });
        // });
        // $("body").prepend($link);
    });


})(jQuery,config);
