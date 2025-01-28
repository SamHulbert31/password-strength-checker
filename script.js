const passwordInput = document.getElementById('passwordInput');
const togglePassword = document.getElementById('togglePassword');
const strengthBar = document.querySelector('.strength-bar');
const feedback = document.getElementById('feedback');
const passwordTips = document.querySelectorAll('#passwordTips li');

// Toggle password visibility
togglePassword.addEventListener('click', () => {
    const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordInput.setAttribute('type', type);
    togglePassword.classList.toggle('fa-eye-slash');
});

// Check password strength
passwordInput.addEventListener('input', () => {
    const password = passwordInput.value;
    const strength = checkPasswordStrength(password);
    updateStrengthMeter(strength);
    updatePasswordTips(password);
});

function checkPasswordStrength(password) {
    let strength = 0;

    // Check length
    if (password.length >= 8) strength += 1;
    if (password.length >= 12) strength += 1;

    // Check for uppercase, lowercase, numbers, and special characters
    if (/[A-Z]/.test(password)) strength += 1;
    if (/[a-z]/.test(password)) strength += 1;
    if (/[0-9]/.test(password)) strength += 1;
    if (/[^A-Za-z0-9]/.test(password)) strength += 1;

    return strength;
}

function updateStrengthMeter(strength) {
    let color = 'red';
    let message = 'Weak';

    if (strength >= 4) {
        color = 'orange';
        message = 'Medium';
    }
    if (strength >= 6) {
        color = 'green';
        message = 'Strong';
    }

    strengthBar.style.width = `${(strength / 6) * 100}%`;
    strengthBar.style.backgroundColor = color;
    feedback.textContent = message;
    feedback.style.color = color;
}

function updatePasswordTips(password) {
    const tips = [
        password.length >= 8,
        /[A-Z]/.test(password),
        /[a-z]/.test(password),
        /[0-9]/.test(password),
        /[^A-Za-z0-9]/.test(password),
    ];

    passwordTips.forEach((tip, index) => {
        if (tips[index]) {
            tip.classList.add('valid');
        } else {
            tip.classList.remove('valid');
        }
    });
}