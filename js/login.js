document.addEventListener("DOMContentLoaded", () => {

    /*==================================
            ELEMENTS
    ==================================*/

    const loginForm = document.getElementById("loginForm");
    const email = document.getElementById("lemail");
    const password = document.getElementById("lpass");
    const togglePassword = document.getElementById("togglePass");

    const rememberMe = document.querySelector(
        '.check-row input[type="checkbox"]'
    );

    const loginError = document.getElementById("loginError");

    const submitBtn = loginForm.querySelector(".submit-btn");
    const btnLabel = submitBtn.querySelector(".btn-label");
    const spinner = submitBtn.querySelector(".spinner");



    /*==================================
        PASSWORD SHOW / HIDE
    ==================================*/

    togglePassword.addEventListener("click", () => {

    const icon = togglePassword.querySelector("i");

    if (password.type === "password") {

        password.type = "text";
        icon.classList.remove("fa-eye");
        icon.classList.add("fa-eye-slash");

    } else {

        password.type = "password";
        icon.classList.remove("fa-eye-slash");
        icon.classList.add("fa-eye");

    }

});


    /*==================================
            EMAIL VALIDATION
    ==================================*/

    function validateEmail(value) {

        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

    }



    /*==================================
            REMOVE ERROR
    ==================================*/

    [email, password].forEach(input => {

        input.addEventListener("input", () => {

            input.parentElement.classList.remove("invalid");
            loginError.hidden = true;

        });

    });

    function validatePassword(password) {

    // Minimum 8 characters
    // At least 1 uppercase
    // At least 1 lowercase
    // At least 1 number
    // At least 1 special character

    const passwordRegex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&^#()_\-+=])[A-Za-z\d@$!%*?&^#()_\-+=]{8,}$/;

    return passwordRegex.test(password);

}



    /*==================================
                LOGIN
    ==================================*/

    loginForm.addEventListener("submit", function (e) {

        e.preventDefault();

        loginError.hidden = true;

        let valid = true;

        const emailValue = email.value.trim();
        const passwordValue = password.value;

        if (!validateEmail(emailValue)) {

            email.parentElement.classList.add("invalid");
            valid = false;

        }

        if (passwordValue === "") {

    password.parentElement.parentElement.classList.add("invalid");
    loginError.hidden = false;
    loginError.textContent = "Please enter your password.";
    return;

}

if (!validatePassword(passwordValue)) {

    password.parentElement.parentElement.classList.add("invalid");
    loginError.hidden = false;
    loginError.textContent =
        "Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number, and one special character.";

    return;

}

        if (!valid) return;



        /*==============================
            BUTTON LOADING
        ==============================*/

        submitBtn.classList.add("loading");
        spinner.hidden = false;
        btnLabel.textContent = "Signing in...";



        setTimeout(() => {

            submitBtn.classList.remove("loading");
            spinner.hidden = true;
            btnLabel.textContent = "Log in";



            /*
            =====================================
                DEMO LOGIN

                Admin
                -----
                admin@stackly.com
                Admin@123

                User
                ----
                user@stackly.com
                User@123
            =====================================
            */

            let role = null;
            let name = "";

         


            /*==============================
                REMEMBER EMAIL
            ==============================*/

            if (rememberMe.checked) {

                localStorage.setItem(
                    "rememberEmail",
                    emailValue
                );

            } else {

                localStorage.removeItem(
                    "rememberEmail"
                );

            }



            /*==============================
                SAVE CURRENT USER
            ==============================*/

            // Accept any valid email and any non-empty password

const selectedRole = document.querySelector(
    'input[name="role"]:checked'
).value;

const currentUser = {
    name: emailValue.split("@")[0],
    email: emailValue,
    role: selectedRole
};

sessionStorage.setItem(
    "currentUser",
    JSON.stringify(currentUser)
);

/*==============================
    CLEAR LOGIN FORM
==============================*/

loginForm.reset();
email.value = "";
password.value = "";

// Redirect
if (selectedRole === "admin") {
    window.location.href = "admin-dashboard.html";
} else {
    window.location.href = "user-dashboard.html";
}


          

        }, 1200);

    });



    /*==================================
        LOAD REMEMBERED EMAIL
    ==================================*/

    const savedEmail = localStorage.getItem("rememberEmail");

    if (savedEmail) {

        email.value = savedEmail;
        rememberMe.checked = true;

    }

});