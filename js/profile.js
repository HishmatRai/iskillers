let errow_show = document.getElementById("errow_show");
var Fname = document.getElementById("Fname")
var lName = document.getElementById("lName")
var mobNumber = document.getElementById("mobNumber")
var email = document.getElementById("email");
var maleOption = document.getElementById("maleOption")
var femaleOption = document.getElementById("femaleOption");
var des = document.getElementById("des")
var uid;
var imagePreview = document.getElementById("imagePreview");
var gender = document.getElementsByName("gender");
var genderSelectedValue;

function selectedGender() {

    for (var i = 0; i < gender.length; i++) {
        if (gender[i].checked) {
            genderSelectedValue = gender[i].value;
            console.log(genderSelectedValue)
        }
    }
}


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
            uid = user.uid
            firebase.firestore().collection("users")
                .doc(user.uid)
                .get()
                .then((currentUserData) => {
                    var currentUser = currentUserData.data();
                    console.log(currentUser);
                    if (currentUser.prfileImage === "") {
                        imagePreview.setAttribute("style", "background-image: url(https://www.pngall.com/wp-content/uploads/5/User-Profile-PNG-High-Quality-Image.png)")
                    } else {
                        imagePreview.setAttribute("style", `background-image: url(${currentUser.prfileImage})`)
                    }
                    Fname.setAttribute("value", currentUser.fName)
                    lName.setAttribute("value", currentUser.lName)
                    mobNumber.setAttribute("value", currentUser.mobNumber)
                    email.setAttribute("value", currentUser.email);
                    var detaailShow = document.createTextNode(currentUser.details);
                    des.appendChild(detaailShow)
                    if (currentUser.genderSelectedValue === "Male") {
                        genderSelectedValue = "Male"
                        maleOption.setAttribute("checked", "checked")
                    } else {
                        genderSelectedValue = "Female"
                        femaleOption.setAttribute("checked", "checked")
                    }
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



function profileImage(e) {
    var uploaded_progress = document.getElementById("uploaded_progress");
    var selectedEventImage = e.target.files[0];
    var storageRef = firebase.storage().ref().child(`/profileImages/${uid}/`)
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
                firebase.firestore().collection("users")
                    .doc(uid)
                    .update({
                        prfileImage: downloadURL
                    })

                setTimeout(() => {
                    location.reload();
                }, 3000)
            });
        }
    );
}





function updateProfile() {
    var updateData = {
        fName: Fname.value,
        lName: lName.value,
        mobNumber: mobNumber.value,
        details: des.value,
        genderSelectedValue: genderSelectedValue,
    }
    console.log(updateData)
    firebase.firestore().collection("users")
        .doc(uid)
        .update(updateData)
        setTimeout(() => {
            location.reload();
        }, 3000)
}