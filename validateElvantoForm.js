function validateElvantoForm() {
      /* Version: 2019-02-06
       * This function checks if all required fields contain a value
       */

      // init return value
      var formIsValid = true;

      // get all inputGroups (label + input)
      $('.elvanto-form-group').each(function(){
         var inputGroup = $(this);

         // check if a required flag can be found in label.span
         if(inputGroup.find('.elvanto-form-required').length > 0){

            // get the input element
            var input = inputGroup.find('input, textarea, select')[0];

            // init value for input
            var inputIsValid = true;
            
            // do validation
            switch(input.type){
               // check if input type=radio
               case 'radio': 
                  if($('[name="' + input.name + '"]:checked').length == 0){
                     // -> input not valid

                        // invalidate form
                        formIsValid = false;

                        // check if radio input is elvanto multi-radio
                        if($(input).parent().parent().hasClass('item')){
                           // -> multi-radio

                           // add invalid class (multi-radio)
                           $(input).parent().parent().parent().parent().addClass('invalid');

                        } else {
                           // -> single-radio

                           // add invalid class (single-radio)                        
                           $(input).parent().parent().addClass('invalid');
                        }

                  } else {
                     // -> input valid
                     
                     // check if radio input is elvanto multi-radio
                     if($(input).parent().parent().hasClass('item')){
                        // -> multi-radio

                        // remove invalid class (multi-radio)
                        $(input).parent().parent().parent().parent().removeClass('invalid');

                     } else {
                        // -> single-radio

                        // remove invalid class (single-radio)
                        $(input).parent().parent().removeClass('invalid');
                     }
                     
                  }
                  break;

               // for all ther inputs [text, email]
               default:
                  if(input.value == null || input.value == '') {
                     // -> input not valid

                     // invalidate form
                     formIsValid = false;

                     // add invalid class
                     $(input).addClass('invalid');
                  } else {
                     // -> input valid

                     // remove invalid class
                     $(input).removeClass('invalid');
                  }
            }
            
         }      
      });
      return formIsValid;
   }


   // prevent form submission
   $("form").submit(function(e){
      e.preventDefault(e);
   });

   // get the submit button
   var btnSumit = $('.elvanto-submit')[0];

   // add an event listener to submit button listening on 'click' to trigger form validation functino
   btnSumit.addEventListener('click', function (event) {
      if(validateElvantoForm()) {
         // -> form is valid

         // hide error Message
         $('#errorMessage').hide();      

         // submit form
         $(".elvanto-form")[0].submit();

      } else {
         // -> at least one required field is not set

         // append error message 
         if($('#errorMessage').length == 0) {
            $(btnSumit).parent('div').before('<div id="errorMessage" class="errorMessage">Bitte überprüfe Deine Eingaben</div>');
         }
      }

      
   });