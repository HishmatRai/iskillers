let errow_show = document.getElementById("errow_show");
firebase.auth().onAuthStateChanged((user) => {
    let email = document.getElementById("email")
    if (user) {
        email.innerHTML = user.email
        if (user.emailVerified === true) {
            errow_show.innerHTML = "Your email has been verified";
            errow_show.style.display = "block";
            errow_show.setAttribute("class", "sucess_message");
            setTimeout(() => {
                errow_show.style.display = "none";
                window.location.href = "./../pages/home.html"
            }, 3000)
        }

    } else {
        errow_show.innerHTML = "please login first";
            errow_show.style.display = "block";
            errow_show.setAttribute("class", "error_message");
            setTimeout(() => {
                errow_show.style.display = "none";
                window.location.href = "./../pages/login.html"
            }, 3000)
 
    }
})



function reSendEmail() {
    var activeUser = firebase.auth().currentUser;
    activeUser.sendEmailVerification();
}


function goToHome() {
    location.reload();
}