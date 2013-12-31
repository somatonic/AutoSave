

;(function($,config){

    $(function(){

        var $message = $("<div class='autosave_dialog autosave_message'></div>").hide();
        var $error = $("<div class='autosave_dialog autosave_error'></div>").hide();

        $("body").append($message);
        $("body").append($error);

        window.setInterval(function(){
            if(window.tinyMCE !== undefined){
                tinyMCE.triggerSave();
            }
            if(window.CKEDITOR !== undefined) {
                for ( instance in CKEDITOR.instances ) CKEDITOR.instances[instance].updateElement();
            }

            // serialize form and append page id
            var $data = $('form#ProcessPageEdit').serialize() + "&id=" + $('#PageIDIndicator').text();

            //console.log($data);

            $.ajax({
                url: config.urls.admin + 'page/autosave-page-edit/ajaxsave/',
                type: 'post',
                data: $data,
                dataType: "json",
                success: function(data){
                    if(!data.error){
                        $message.html(data.message).slideToggle().delay(3000).fadeOut();
                    } else if(data.error){
                        var messages = '';
                        messages += data.message + "<br/>";
                        for(var i in data.errors){
                            messages += data.errors[i] + "<br/>";
                        }
                        $error.html(messages).slideToggle().delay(5000).fadeOut();
                    }
                    //console.log(data);
                }
            });

        }, config.autosave_interval * 1000);

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
