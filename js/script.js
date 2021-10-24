const name = document.getElementById('name').focus();

//The "Job Role" section 
const otherJob = document.getElementById('other-job-role');
otherJob.hidden = true;

const selectJob = document.getElementById('title');

const selectColorDiv = document.getElementById('shirt-colors');
selectColorDiv.hidden = true;

const selectColor = document.getElementById('color');
const selectColorOption = document.querySelectorAll('#color option');

const selectDesign = document.getElementById('design');

//"Register for Activities" section
const activitiesFieldset = document.getElementById('activities');
const totalCost = document.getElementById('activities-cost');
const checkboxes = document.querySelectorAll('input[type="checkbox"]');

//Activities listener will detect any change
activitiesFieldset.addEventListener('change', (e)=>{
    
//selectActivities section. Any clicked checkbox will add its "data-cost" to <p>Total</>
    let startTotal = 0;
    totalCost.textContent = `Total: $${startTotal}`;
    
    for(i=0; i<checkboxes.length; i++){
        
        if(checkboxes[i].checked) {
            const activityCost = checkboxes[i].getAttribute("data-cost");
            let convertedAC = parseInt(activityCost);
            totalCost.textContent = `Total: $${startTotal += convertedAC}`;
        }
    }  

//If the checked box has the same "data and time" but different "name" than other options, other options will be unclickable.
    for(i=1; i<checkboxes.length; i++){
        const activityTime = checkboxes[i].getAttribute("data-day-and-time");
        const checkedBox = e.target.getAttribute('data-day-and-time');

        if(checkedBox === activityTime){
            const activityName = checkboxes[i].name;
            const checkedName = e.target.name;

            if(checkedName !== activityName && e.target.checked) {
                const disabledCheckbox = document.querySelector(`input[name="${activityName}"]`);
                disabledCheckbox.disabled = true;
               
            } else if (checkedName !== activityName && e.target.checked === false) {
                const disabledCheckbox = document.querySelector(`input[name="${activityName}"]`);
                disabledCheckbox.disabled = false;
            }
        }
    } 
})

//Design Listener
selectDesign.addEventListener('change', (e)=>{
    selectColorDiv.hidden = false;

    for (let i=0; i<selectColor.length; i++){
        const dataTheme = selectColor[i].getAttribute('data-theme');
        const dropdownOption = e.target.value;

        if (dataTheme === dropdownOption) {
            selectColor[0].selected = true;
            selectColor[i].hidden = false;
        } else {
            selectColor[0].selected = true;
            selectColor[i].hidden = true;
        }
    }
});

//Job Role Listener
selectJob.addEventListener('change',(e)=>{
    if (e.target.value === "other") {
        otherJob.hidden = false;
    } else {
        otherJob.hidden = true; 
    }
});

//Payment Section
const payment = document.getElementById('payment');
const defaultPayment = document.getElementsByName('user-payment')[0];
defaultPayment[1].selected = true;

const creditCard = document.getElementById('credit-card');
creditCard.hidden = false;

const paypal = document.getElementById('paypal');
paypal.hidden = true;

const bitcoin = document.getElementById('bitcoin');
bitcoin.hidden = true;

//Payment Listener. Helps showing only one payment option at a time.
payment.addEventListener('change', (e)=>{
    
    if (e.target.value === paypal.className) {
        
        creditCard.hidden = true;
        paypal.hidden = false;
        bitcoin.hidden = true;

    } else if (e.target.value === bitcoin.className) {
        
        creditCard.hidden = true;
        paypal.hidden = true;
        bitcoin.hidden = false;

    } else if (e.target.value === creditCard.className) {
        
        creditCard.hidden = false;
        paypal.hidden = true;
        bitcoin.hidden = true;
    }
})

//Form Validation
const form = document.querySelector('form');

//name
const userName = document.getElementById('name');
const userNameHint = document.getElementById('name-hint');
//Extra hint. Added an extra line in Index.html. For exceeds//
const nameHintNumber = document.getElementById('name-hint-numbers');

//Helps to validate in real time
userName.addEventListener('input', (e)=>{
    const inputText = e.target.value;
    validUserName(inputText)
});

//email
const userEmail = document.getElementById('email');
const emailHint = document.getElementById('email-hint');

//Helps to validate in real time
userEmail.addEventListener('input', (e)=>{
    const inputText = e.target.value;
    validEmail(inputText);
});

//Credit Card
    //Credit card number
    const creditCardNum = document.getElementById('cc-num');
    const creditCardNumHint = document.getElementById('cc-hint');

    //Helps to validate in real time
    creditCardNum.addEventListener('input', (e)=>{
        const inputText = e.target.value;
        validCCNum(inputText);
    });

    //User's zip code
    const userZipCode = document.getElementById('zip');
    const zipCodeHint = document.getElementById('zip-hint');

    //Helps to validate in real time
    userZipCode.addEventListener('input', (e)=>{
        const inputText = e.target.value;
        validZipCode(inputText);
    });

    //Credit card CCV
    const cvv = document.getElementById('cvv');
    const cvvHint = document.getElementById('cvv-hint');
    
    //Helps to validate in real time
    cvv.addEventListener('input', (e)=>{
        const inputText = e.target.value;
        validCVV(inputText);
    });

//Validation Functions
function validUserName(username) {
    const input = /^[A-Za-z]{1,10}?\s?[a-z]*$/.test(username);
    const noLetters = /^\d?\W*\d*/.test(username);
    const spaces = /^\s*$/.test(username);
    
        if(input) {
            nameHintNumber.style.display = 'none';
            removeError(userName.parentNode);
            return true;
            
        } else if(spaces) {
            nameHintNumber.style.display = 'none';
            addError(userName.parentNode);
            return false;

        } else if(noLetters) {
            nameHintNumber.style.display = 'inherit';
            userNameHint.style.display = 'none';
            userName.parentNode.classList.add('not-valid');
            return false;
        } 
};

function validEmail(email) {
    const correctEmail =/^["']?\w*[-.+()]?\w*[."]?[@][.-]?\w+[.]\w*[a-z]$/gmi.test(email);
        
        if(correctEmail) {
            removeError(userEmail.parentNode);
            return true;

        } else {
            addError(userEmail.parentNode);
            return false;  
        }
};

function oneCheckbox(){
    //I tried with a loop and it didn't work :(
        const cb = checkboxes[0].checked;
        const cb1 = checkboxes[1].checked;
        const cb2 = checkboxes[2].checked;
        const cb3 = checkboxes[3].checked;
        const cb4 = checkboxes[4].checked;
        const cb5 = checkboxes[5].checked;
        const cb6 = checkboxes[6].checked;

        if (cb||cb1||cb2||cb3||cb4||cb5||cb6){
            return true;
        } else {
            return false;
        }
}

function validCCNum(number) {
    const correctCC = /^\d{13,16}$/g.test(number);
        
        if(correctCC) {
            removeError(creditCardNum.parentNode);
            return true;
           
        } else {
            addError(creditCardNum.parentNode);
            return false; 
        }
};

function validZipCode(number) {
    const correctNumber = /^\d{5}$/.test(number);
        
        if(correctNumber) { 
            removeError(userZipCode.parentNode);
            return true;

        } else {   
            addError(userZipCode.parentNode);
            return false;  
        }
};

function validCVV(number) {
    const correctNumber = /^\d{3}$/.test(number);
        
        if(correctNumber) {
            removeError(cvv.parentNode);
            return true;

        } else {
            addError(cvv.parentNode);
            return false;  
        }
};

//Focus and Blur Listeners
for(let i = 0; i<checkboxes.length; i++){
    checkboxes[i].addEventListener('focus', (e)=>{
        
        const label = checkboxes[i].parentNode;
        label.className = 'focus';
    })

    checkboxes[i].addEventListener('blur', (e)=>{
        
        const label = checkboxes[i].parentNode;
        label.className = '';
    })
}

//Helper functions to add or remove valid state and display error messages
function addError(element) {
    element.classList.add('not-valid');
    element.lastElementChild.style.display = 'inherit';
}

function removeError(element){
    element.classList.remove('not-valid');
    element.classList.add('valid');
    element.lastElementChild.style.display = 'none';
}

//Form Listener - To check if the form is valid I use the helper validation functions
form.addEventListener('submit', (e)=>{

    const valName = userName.value;
    const testName = validUserName(valName);

    const valEmail = userEmail.value;
    const testEmail = validEmail(valEmail);

    const valCheckBox = oneCheckbox();

    const valCCNumber = creditCardNum.value;
    const testCCNum = validCCNum(valCCNumber);

    const valZipCode= userZipCode.value;
    const testZipCode = validZipCode(valZipCode);

    const valCVV = cvv.value;
    const testCVV = validCVV(valCVV);

    const label1 = userName.parentNode;
    const label2 = userEmail.parentNode;
    const label3 = checkboxes[0].parentNode.parentNode.parentNode;
    const label4 = creditCardNum.parentNode;
    const label5 = userZipCode.parentNode;
    const label6 = cvv.parentNode;

//If the credit card is selected we check more fields
    if(defaultPayment[1].selected) {
        if(testName === false){
            e.preventDefault();
            addError(label1);
        } else {
            removeError(label1);
        }
        
        if(testEmail === false) {
            e.preventDefault();
            addError(label2);
        } else {
            removeError(label2);
        }

        if(valCheckBox === false) {
            e.preventDefault();
            addError(label3);
        } else {
            removeError(label3);
        }

        if(testCCNum === false){
            e.preventDefault();
            addError(label4);
        } else {
            removeError(label4);
        }

        if(testZipCode === false){
            e.preventDefault();
            addError(label5);
        } else {
            removeError(label5);
        }
        if(testCVV === false){
            e.preventDefault();
            addError(label6);
        } else {
            removeError(label6);
        }

//If credit card is not selected we don't validate credit card fields
    } else {
        if(testName === false){
            e.preventDefault();
            addError(label1);
        } else {
            removeError(label1);
        }
        
        if(testEmail === false) {
            e.preventDefault();
            addError(label2);
        } else {
            removeError(label2);
        }

        if(valCheckBox === false) {
            e.preventDefault();
            addError(label3);
        } else {
            removeError(label3);
        }
    }
})