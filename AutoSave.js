

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

            // for all those inline ckeditor users
            $("form.InputfieldForm").find('.InputfieldCKEditorInline').each(function() {
                var $input = $(this).next('input');
                var value = $(this).html();
                $input.attr('value', value);
            });

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

    });


})(jQuery,config);
