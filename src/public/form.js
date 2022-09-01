document.getElementById('submitBtn').addEventListener('click', submitForm);
let inputName = document.getElementById('name');
let inputEmail = document.getElementById('email');
let notification = document.getElementById('notification');
hideNotification();

function submitForm(e) {
    e.preventDefault();
    resetState();
    if (validationData()) {
        axios
            .post('/register', {
                name: inputName.value,
                email: inputEmail.value,
            })
            .then(function (response) {
                // handle success
                const msg = response.data.message;
                showNotification('success', msg);
            })
            .catch(function (error) {
                // handle error
                const errorMsg = error.response.data.message;
                showNotification('error', errorMsg);
            });
    }
}

function validationData() {
    let returnValue = true;
    if (inputName.value.trim() == '') {
        createErrorDiv(inputName, 'Please enter a name');
        returnValue = false;
    }
    if (inputEmail.value.trim() == '') {
        createErrorDiv(inputEmail, 'Please enter email');
        returnValue = false;
    }
    return returnValue;
}

function hideNotification(msg) {
    notification.style.display = 'none';
    notification.innerText = msg;
}

function showNotification(type, msg) {
    notification.style.display = 'block';
    notification.classList.add(type);
    notification.innerText = msg;
}

function createErrorDiv(ele, msg) {
    let errElem = document.createElement('div');
    errElem.setAttribute('class', 'error-text');
    errElem.textContent = msg;
    ele.after(errElem);
}

function clearAllErrors() {
    const errors = document.querySelectorAll('.error-text');
    errors.forEach((error) => {
        error.remove();
    });
}

function resetState() {
    clearAllErrors();
    hideNotification();
}
