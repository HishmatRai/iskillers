let errow_show = document.getElementById("errow_show");
var eventsDataShow = []
firebase.auth().onAuthStateChanged(async (user) => {
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
            await firebase.firestore().collection("events")
                .get()
                .then((eventsData) => {
                    eventsData.forEach((eData) => {
                        var allEventsData = eData.data();
                        console.log(allEventsData)
                        if (user.uid === allEventsData.uid) {
                            eventsDataShow.push(allEventsData);
                            console.log(eventsDataShow)
                        }
                    });

                })
            var nodata = document.getElementById("nodata")
            if (eventsDataShow.length === 0) {
                nodata.innerHTML = "no any event availeble";
            } else {
                eventsDataShow.map((v, i) => {
                    const _show_my_events = document.getElementById("_show_my_events");
                    const table = document.createElement("table");
                    table.setAttribute("class", "my_event_table")
                    _show_my_events.appendChild(table);

                    const tr1 = document.createElement("tr");
                    tr1.setAttribute("class", "_table_row");
                    const tr1td1 = document.createElement("td");
                    tr1td1.setAttribute("class", "_table_title font_F_Roboto_B")
                    const tr1td1Text = document.createTextNode("Full Name :");
                    const tr1td2 = document.createElement("td");
                    tr1td2.setAttribute("class", "_table_details font_F_Roboto_R")
                    const tr1td2Text = document.createTextNode(v.fullName);

                    table.appendChild(tr1);
                    tr1.appendChild(tr1td1);
                    tr1td1.appendChild(tr1td1Text);
                    tr1.appendChild(tr1td2);
                    tr1td2.appendChild(tr1td2Text);


                    const tr2 = document.createElement("tr");
                    tr2.setAttribute("class", "_table_row");
                    const tr2td1 = document.createElement("td");
                    tr2td1.setAttribute("class", "_table_title font_F_Roboto_B")
                    const tr2td1Text = document.createTextNode("Mobile Number :");
                    const tr2td2 = document.createElement("td");
                    tr2td2.setAttribute("class", "_table_details font_F_Roboto_R")
                    const tr2td2Text = document.createTextNode(v.mobNumber);

                    table.appendChild(tr2);
                    tr2.appendChild(tr2td1);
                    tr2td1.appendChild(tr2td1Text);
                    tr2.appendChild(tr2td2);
                    tr2td2.appendChild(tr2td2Text);

                    const tr3 = document.createElement("tr");
                    tr3.setAttribute("class", "_table_row");
                    const tr3td1 = document.createElement("td");
                    tr3td1.setAttribute("class", "_table_title font_F_Roboto_B")
                    const tr3td1Text = document.createTextNode("Email Address : ");
                    const tr3td2 = document.createElement("td");
                    tr3td2.setAttribute("class", "_table_details font_F_Roboto_R")
                    const tr3td2Text = document.createTextNode(v.email);

                    table.appendChild(tr3);
                    tr3.appendChild(tr3td1);
                    tr3td1.appendChild(tr3td1Text);
                    tr3.appendChild(tr3td2);
                    tr3td2.appendChild(tr3td2Text);


                    const tr4 = document.createElement("tr");
                    tr4.setAttribute("class", "_table_row");
                    const tr4td1 = document.createElement("td");
                    tr4td1.setAttribute("class", "_table_title font_F_Roboto_B")
                    const tr4td1Text = document.createTextNode("Event Name : ");
                    const tr4td2 = document.createElement("td");
                    tr4td2.setAttribute("class", "_table_details font_F_Roboto_R")
                    const tr4td2Text = document.createTextNode(v.eventName);

                    table.appendChild(tr4);
                    tr4.appendChild(tr4td1);
                    tr4td1.appendChild(tr4td1Text);
                    tr4.appendChild(tr4td2);
                    tr4td2.appendChild(tr4td2Text);

                    const tr5 = document.createElement("tr");
                    tr5.setAttribute("class", "_table_row");
                    const tr5td1 = document.createElement("td");
                    tr5td1.setAttribute("class", "_table_title font_F_Roboto_B")
                    const tr5td1Text = document.createTextNode("Event Time : ");
                    const tr5td2 = document.createElement("td");
                    tr5td2.setAttribute("class", "_table_details font_F_Roboto_R")
                    const tr5td2Text = document.createTextNode(v.eventTime);

                    table.appendChild(tr5);
                    tr5.appendChild(tr5td1);
                    tr5td1.appendChild(tr5td1Text);
                    tr5.appendChild(tr5td2);
                    tr5td2.appendChild(tr5td2Text);


                    const tr6 = document.createElement("tr");
                    tr6.setAttribute("class", "_table_row");
                    const tr6td1 = document.createElement("td");
                    tr6td1.setAttribute("class", "_table_title font_F_Roboto_B")
                    const tr6td1Text = document.createTextNode("Event Date : ");
                    const tr6td2 = document.createElement("td");
                    tr6td2.setAttribute("class", "_table_details font_F_Roboto_R")
                    const tr6td2Text = document.createTextNode(v.eventDate);

                    table.appendChild(tr6);
                    tr6.appendChild(tr6td1);
                    tr6td1.appendChild(tr6td1Text);
                    tr6.appendChild(tr6td2);
                    tr6td2.appendChild(tr6td2Text);


                    const tr7 = document.createElement("tr");
                    tr7.setAttribute("class", "_table_row");
                    const tr7td1 = document.createElement("td");
                    tr7td1.setAttribute("class", "_table_title font_F_Roboto_B")
                    const tr7td1Text = document.createTextNode("Event Price : ");
                    const tr7td2 = document.createElement("td");
                    tr7td2.setAttribute("class", "_table_details font_F_Roboto_R")
                    const tr7td2Text = document.createTextNode(v.eventPrice);

                    table.appendChild(tr7);
                    tr7.appendChild(tr7td1);
                    tr7td1.appendChild(tr7td1Text);
                    tr7.appendChild(tr7td2);
                    tr7td2.appendChild(tr7td2Text);


                    const tr8 = document.createElement("tr");
                    tr8.setAttribute("class", "_table_row");
                    const tr8td1 = document.createElement("td");
                    tr8td1.setAttribute("class", "_table_title font_F_Roboto_B")
                    const tr8td1Text = document.createTextNode("Event Image");
                    const tr8td2 = document.createElement("td");
                    tr8td2.setAttribute("class", "_table_details font_F_Roboto_R")
                    const eventImage = document.createElement("img");
                    eventImage.setAttribute("src", v.imagePath);
                    eventImage.setAttribute("class", "_event_Image")
                    table.appendChild(tr8);
                    tr8.appendChild(tr8td1);
                    tr8td1.appendChild(tr8td1Text);
                    tr8.appendChild(tr8td2);
                    tr8td2.appendChild(eventImage)

                    const tr9 = document.createElement("tr");
                    tr9.setAttribute("class", "_table_row");
                    const tr9td1 = document.createElement("td");
                    tr9td1.setAttribute("class", "_table_title font_F_Roboto_B")
                    const tr9td1Text = document.createTextNode("Event Des : ");
                    const tr9td2 = document.createElement("td");
                    tr9td2.setAttribute("class", "_table_details font_F_Roboto_R")
                    const tr9td2Text = document.createTextNode(v.eventDes);

                    table.appendChild(tr9);
                    tr9.appendChild(tr9td1);
                    tr9td1.appendChild(tr9td1Text);
                    tr9.appendChild(tr9td2);
                    tr9td2.appendChild(tr9td2Text);

                    const tr10 = document.createElement("tr");
                    tr10.setAttribute("class", "_table_row2");
                    const td10td1 = document.createElement("td");
                    td10td1.setAttribute("class", "_table_btn")
                    const deleteBtn = document.createElement("button");
                    deleteBtn.setAttribute("class", "btn btn-primary font_F_Roboto_B");
                    const deleteBtnText = document.createTextNode("Delete Event");
                    deleteBtn.appendChild(deleteBtnText)
                    table.appendChild(tr10);
                    tr10.appendChild(td10td1);
                    td10td1.appendChild(deleteBtn)
                })
            }

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