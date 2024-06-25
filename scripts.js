document.addEventListener('DOMContentLoaded', () => {
    const loginBtn = document.getElementById('loginBtn');
    const registerBtn = document.getElementById('registerBtn');
    const loginPopup = document.getElementById('loginPopup');
    const registerPopup = document.getElementById('registerPopup');
    const closeLogin = document.getElementById('closeLogin');
    const closeRegister = document.getElementById('closeRegister');
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const mobileNumber = document.getElementById('mobileNumber');
    const mobileError = document.getElementById('mobileError');
    const openRegisterPopupBtn = document.getElementById('openRegisterPopup');

    loginBtn.addEventListener('click', () => {
        loginPopup.style.display = 'block';
    });

    registerBtn.addEventListener('click', () => {
        registerPopup.style.display = 'block';
    });

    closeLogin.addEventListener('click', () => {
        loginPopup.style.display = 'none';
    });

    closeRegister.addEventListener('click', () => {
        registerPopup.style.display = 'none';
    });

    openRegisterPopupBtn.addEventListener('click', () => {
        loginPopup.style.display = 'none';
        registerPopup.style.display = 'block';
    });

    window.addEventListener('click', (event) => {
        if (event.target == loginPopup) {
            loginPopup.style.display = 'none';
        }
        if (event.target == registerPopup) {
            registerPopup.style.display = 'none';
        }
    });

    loginForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const username = loginUsername.value.trim();
        const password = loginPassword.value.trim();

        // Check if username and password match stored credentials
        if (validateUser(username, password)) {
            const loggedInUser = {
                username: username
            };
            displayWelcomeMessage(loggedInUser.username);
            loginPopup.style.display = 'none';
        } else {
            alert('Invalid username or password. Please try again.');
            // Clear password field
            loginPassword.value = '';
            loginPassword.focus();
        }
    });

    registerForm.addEventListener('submit', (event) => {
        event.preventDefault();
        // Validate mobile number
        if (!/^\d{10}$/.test(mobileNumber.value)) {
            mobileError.textContent = 'Please enter a valid 10-digit mobile number.';
            return;
        } else {
            mobileError.textContent = '';
        }
    
        const firstNameValue = firstName.value.trim(); // Renamed to resolve conflict
        const lastNameValue = lastName.value.trim();
        const emailValue = registerEmail.value.trim();
        const passwordValue = registerPassword.value.trim();
    
        // Store username and password in localStorage
        const newUser = {
            username: emailValue,
            password: passwordValue
        };
        localStorage.setItem('userData', JSON.stringify(newUser));
    
        alert('Registered successfully! You can now log in.');
        registerPopup.style.display = 'none';
    
        // Automatically open login popup after registration
        loginPopup.style.display = 'block';
    });
    
    function validateUser(username, password) {
        // Retrieve stored user data from localStorage
        const userData = JSON.parse(localStorage.getItem('userData'));
        if (userData && username === userData.username && password === userData.password) {
            return true;
        }
        return false;
    }

    function displayWelcomeMessage(username) {
        localStorage.setItem('username', username); // Store username in localStorage
        window.location.href = 'homepage.html'; // Redirect to homepage
    }
});
