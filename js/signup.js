let errow_show = document.getElementById("errow_show")

function signUpForm() {
    const fName = document.getElementById("fName")
    const lName = document.getElementById("lName")
    const mobNumber = document.getElementById("mobNumber")
    const email = document.getElementById("email")
    const password = document.getElementById("password")
    const gender = document.getElementsByName("gender");

    var genderSelected = false;
    var genderSelectedValue;
    for (var i = 0; i < gender.length; i++) {
        if (gender[i].checked) {
            genderSelected = true
            genderSelectedValue = gender[i].value;
        }
    }


    if (fName.value === "") {
        errow_show.innerHTML = "please enter first name";
        errow_show.style.display = "block";
        errow_show.setAttribute("class", "error_message");
        fName.focus();
        setTimeout(() => {
            errow_show.style.display = "none";
        }, 3000)
    }
    else if (lName.value === "") {
        errow_show.innerHTML = "please enter last name";
        errow_show.style.display = "block";
        errow_show.setAttribute("class", "error_message");
        lName.focus();
        setTimeout(() => {
            errow_show.style.display = "none";
        }, 3000)
    } else if (mobNumber.value === "" || mobNumber.value.length < 11) {
        errow_show.innerHTML = "please enter 11 digit mobile number";
        errow_show.style.display = "block";
        errow_show.setAttribute("class", "error_message");
        mobNumber.focus();
        setTimeout(() => {
            errow_show.style.display = "none";
        }, 3000)
    } else if (email.value === "") {
        errow_show.innerHTML = "pease enter valid email address";
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
    } else if (!genderSelected) {
        errow_show.innerHTML = "please select gender";
        errow_show.style.display = "block";
        errow_show.setAttribute("class", "error_message");
        password.focus();
        setTimeout(() => {
            errow_show.style.display = "none";
        }, 3000)
    } else {
        let userObj = {
            fName: fName.value,
            lName: lName.value,
            mobNumber: mobNumber.value,
            email: email.value,
            password: password.value,
            genderSelectedValue: genderSelectedValue,
            prfileImage: "",
            details:""
        }

        firebase.auth().createUserWithEmailAndPassword(userObj.email, userObj.password)
            .then((signupUser) => {
                errow_show.innerHTML = "You are successfully sign up";
                errow_show.style.display = "block";
                errow_show.setAttribute("class", "sucess_message");
                setTimeout(() => {
                    errow_show.style.display = "none";
                }, 3000)
                signupUser.user.sendEmailVerification();
                userObj.uid = signupUser.user.uid;
                firebase.firestore().collection(`users`)
                    .doc(signupUser.user.uid)
                    .set(userObj).then((d) => {
                        console.log(d)
                    })

                if (signupUser.user.emailVerified === false) {
                    setTimeout(() => {
                        window.location.href = "./../pages/emailverification.html"
                    }, 3000)
                }
            })

            .catch((error) => {

                errow_show.innerHTML = error.message;
                errow_show.style.display = "block";
                errow_show.setAttribute("class", "error_message");
                mobNumber.focus();
                setTimeout(() => {
                    errow_show.style.display = "none";
                }, 3000)
            })
    }


}