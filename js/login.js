let errow_show = document.getElementById("errow_show");

function loginForm() {

    const email = document.getElementById("email");
    const password = document.getElementById("password");

    if (email.value === "") {
        errow_show.innerHTML = "please enter valid email address";
        errow_show.style.display = "block";
        errow_show.setAttribute("class", "error_message");
        email.focus();
        setTimeout(() => {
            errow_show.style.display = "none";
        }, 3000)
    } else if (password.value === "" || password.value.length < 6) {
        errow_show.innerHTML = "The password must not be identical to one of the last 6 passwords that were used for that account.";
        errow_show.style.display = "block";
        errow_show.setAttribute("class", "error_message");
        password.focus();
        setTimeout(() => {
            errow_show.style.display = "none";
        }, 3000)
    } else {
        let userObj = {
            email: email.value,
            password: password.value
        }


        firebase.auth().signInWithEmailAndPassword(userObj.email, userObj.password)
            .then((loginUser) => {
                console.log(loginUser);
                errow_show.innerHTML = "You are successfully logged in";
                errow_show.style.display = "block";
                errow_show.setAttribute("class", "sucess_message");
                setTimeout(() => {
                    errow_show.style.display = "none";
                }, 3000)
                console.log(loginUser.user.emailVerified);
                if (loginUser.user.emailVerified === false) {
                    setTimeout(() => {
                        window.location.href = './../pages/emailverification.html'
                    }, 3000)
                } else {
                    setTimeout(() => {
                        window.location.href = './../pages/home.html'
                    }, 3000)
                }
            })
            .catch((error) => {
                console.log(error);
                errow_show.innerHTML = error.message;
                errow_show.style.display = "block";
                errow_show.setAttribute("class", "error_message");
                email.focus();
                setTimeout(() => {
                    errow_show.style.display = "none";
                }, 3000)
            })
    }
}