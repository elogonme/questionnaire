function startChecks() {
    var formData = {
        name: '',
        lastname: '',
        dateOfBirth: '',
        phoneNumber: '',
        gender: '',
        education: '',
        isSmoking: '',    
        isAgreed: '',
        correct: false   
    };

    // Reset all errors
    $(".msg").css("display", "none");
    $(".box").css("borderColor", "initial");
    $('#checkMsg').css('visibility', 'hidden');
    formData.correct = true;
    
    // get all Form data - all fields
    formData.name = $("#firstname").val();
    formData.lastname = $("#lastname").val();
    formData.dateOfBirth  = $("#dob").val();
    formData.phoneNumber  = $("#phone").val();
    formData.education = $("#education>option:selected").text()
    formData.isAgreed  = $('#agreement:checked').val() == 'on';
    // Get gender
    formData.gender = $("input[name='gender']:checked").val() || ''
    // Get Smoking or not
    formData.isSmoking = $("input[name='smoking']:checked").val() || '';

    // Check all form data if all feilds entered
    checkElement(formData.name,'.name');
    checkElement(formData.lastname,'.lastname');
    checkElement(formData.dateOfBirth,'.dob');
    checkElement(formData.phoneNumber,'.phone');
    checkElement(formData.gender,'.gender');
    checkElement(formData.education,'.education');
    checkElement(formData.isSmoking,'.smoking');
    if (formData.isAgreed) {
        $('.icon-question').css('color', 'black');
    } else {
        checkElement('','.agree');
        $('.icon-question').css('color', 'red');  
    }
    if (formData.correct) {
        $('.msg-ok').css('visibility', 'visible');
    }  

    // Check element for error, make red box and display error message
    function checkElement(el, cls) {
        if (el === '') {
            $(cls + '-err').css('display', 'flex')
            $(cls).css('borderColor', 'red')
            formData.correct = false;
        }
    };
}
