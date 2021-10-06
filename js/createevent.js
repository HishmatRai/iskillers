let errow_show = document.getElementById("errow_show");
var fullName;
var mobNumber;
var email;
var uid;
firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        if (user.emailVerified === false) {
            errow_show.innerHTML = "Please verify email ";
            errow_show.style.display = "block";
            errow_show.setAttribute("class", "error_message");
            setTimeout(() => {
                errow_show.style.display = "none";
                window.location.href = "./../pages/emailverification.html"
            }, 3000)
        } else {
            firebase.firestore().collection("users")
                .doc(user.uid)
                .get()
                .then((currUserData) => {
                    var currentUserData = currUserData.data();
                    fullName = `${currentUserData.fName} ${currentUserData.lName}`
                    mobNumber = currentUserData.mobNumber
                    email = currentUserData.email
                    uid = currentUserData.uid
                })
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


var imagePath;
function eventImage(e) {
    var uploaded_progress = document.getElementById("uploaded_progress");
    var selectedEventImage = e.target.files[0];
    var storageRef = firebase.storage().ref().child(`/eventsImages/${selectedEventImage.name}/`)
    var uploadTask = storageRef.put(selectedEventImage);
    uploadTask.on('state_changed',
        (snapshot) => {
            var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
            uploaded_progress.innerHTML = 'Upload is ' + progress + '% done'
        },
        (error) => {
        },
        () => {
            uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
                console.log('File available at', downloadURL);
                imagePath = downloadURL
            });
        }
    );

}



var createEventData = () => {
    let eventName = document.getElementById("eventName");
    let eventTime = document.getElementById("eventTime");
    let eventDate = document.getElementById("eventDate");
    let eventPrice = document.getElementById("eventPrice");
    let eventImage = document.getElementById("eventImage");
    let eventDes = document.getElementById("eventDes");

    if (eventName.value === "") {
        errow_show.innerHTML = "Please enter event name ";
        errow_show.style.display = "block";
        errow_show.setAttribute("class", "error_message");
        eventName.focus();
        setTimeout(() => {
            errow_show.style.display = "none";
        }, 3000)
    } else if (eventTime.value === "") {
        errow_show.innerHTML = "Please select event time ";
        errow_show.style.display = "block";
        errow_show.setAttribute("class", "error_message");
        eventTime.focus();
        setTimeout(() => {
            errow_show.style.display = "none";
        }, 3000)
    } else if (eventDate.value === "") {
        errow_show.innerHTML = "Please select event date ";
        errow_show.style.display = "block";
        errow_show.setAttribute("class", "error_message");
        eventDate.focus();
        setTimeout(() => {
            errow_show.style.display = "none";
        }, 3000)
    } else if (eventPrice.value === "") {
        errow_show.innerHTML = "Please enter event price in PKR ";
        errow_show.style.display = "block";
        errow_show.setAttribute("class", "error_message");
        eventPrice.focus();
        setTimeout(() => {
            errow_show.style.display = "none";
        }, 3000)
    } else if (eventImage.value === "") {
        errow_show.innerHTML = "Please select event image ";
        errow_show.style.display = "block";
        errow_show.setAttribute("class", "error_message");
        eventImage.focus();
        setTimeout(() => {
            errow_show.style.display = "none";
        }, 3000)
    } else if (eventDes.value === "") {
        errow_show.innerHTML = "Please add event des...";
        errow_show.style.display = "block";
        errow_show.setAttribute("class", "error_message");
        eventDes.focus();
        setTimeout(() => {
            errow_show.style.display = "none";
        }, 3000)
    } else {
        var eventObj = {
            eventName: eventName.value,
            eventTime: eventTime.value,
            eventDate: eventDate.value,
            eventPrice: eventPrice.value,
            imagePath: imagePath,
            eventDes: eventDes.value,
            fullName: fullName,
            mobNumber: mobNumber,
            email: email,
            uid: uid
        }



        firebase.firestore().collection(`events`)
            .add(eventObj)
            .then(() => {
                errow_show.innerHTML = "Successfylly added event ";
                errow_show.style.display = "block";
                errow_show.setAttribute("class", "sucess_message");
                setTimeout(() => {
                    errow_show.style.display = "none";
                    location.reload();
                }, 3000)
            })
        console.log(eventObj)
    }

}