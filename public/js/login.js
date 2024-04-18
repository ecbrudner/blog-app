document.addEventListener('DOMContentLoaded', () => {
//login
const loginFormHandler = async (event) => {
    event.preventDefault();

    const username = document.querySelector('#username-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();

    console.log('submitting login form...');

    if (username && password) {
        const response = await fetch('/api/user/login', {
            method: 'POST',
            body: JSON.stringify({ username, password }),
            headers: { 'Content-Type': 'application/json' },
        });

        console.log('Response:',response);

        if (response.ok) {
            document.location.replace('/dash');
        } else {
            alert(response.statusText);
        }
    }
};
//signup
const signupFormHandler = async (event) => {
    event.preventDefault();

    const username = document.querySelector('#username-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();

    if (username && password) {
        const response = await fetch('/api/user/signup', {
            method: 'POST',
            body: JSON.stringify({ username, password }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            document.location.replace('/dash');
        } else {
            alert(response.statusText);
        }
    }
};

const loginForm = document.querySelector('.login-form');
const signupForm = document.querySelector('.signup-form');

if (loginForm) {
    loginForm.addEventListener('submit', loginFormHandler);
}

if (signupForm) {
    signupForm.addEventListener('submit', signupFormHandler);
}

});