setTimeout(() => {
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            if (user.emailVerified === false) {
                window.location.href = "./pages/emailverification.html"
            } else {
                window.location.href = "./pages/home.html"
            }
        } else {
            window.location.href = "./pages/login.html"
        }
    })
}, 3000)