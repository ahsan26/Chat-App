let position = "left";
let backgroundColors = ["#2C3E50", "#5FBAFF", "#FF4F42", "#E89F1A", "#A351E8", "#31A3A7", "#7f8c8d"];
let firstTimeLoad = true;
$("#leave").on("click", leave);
$("#message_form").on("click", sendMessage)

function go() {
    let usrname = getVal("username");
    let gnder = getRadio("gender");
    if (usrname != "" && gnder != undefined) {
        saveToLocalStorage("user", JSON.stringify({
            username: usrname,
            gender: gnder
        }))
        personImg("person", gnder);
        $("#one").fadeOut(400);
        $("#two").show('medium');
    }
}
class Message {
    constructor(message) {
        this.username = JSON.parse(localStorage.getItem("user")).username;
        this.gender = JSON.parse(localStorage.getItem("user")).gender;
        this.message = message;
    }
}

function sendMessage() {
    if (getVal("message_input")) {
        saveToDatabase(new Message(getVal("message_input")));
        document.querySelector(`#message_form`).reset();
        //displayMessages(messagesData);
    }
}

function checkingSimilarity() {
    if (messagesData[messagesData.length - 1].username != JSON.parse(localStorage.getItem("user")).username) {
        document.querySelector(`#new_message`).play();
    }
}

function displayMessages(data, loadStatus) {
    if (!loadStatus) {
        checkingSimilarity();
    }
    data.forEach((item, index) => {
        makeMessageStructure(casing(item.username, capitialize), item.message, item.gender, backgroundColors[Math.round(Math.random() * (backgroundColors.length - 1))]);
    })
    let objDiv = document.getElementById("messages");
    objDiv.scrollTop = objDiv.scrollHeight;
}

function casing(val, text_case) {
    return text_case(val);
}

function capitialize(val) {
    let firstChar = val.charAt(0);
    let otherChars = val.slice(1);
    firstChar = firstChar.toUpperCase();
    otherChars = otherChars.toLowerCase();
    return firstChar + otherChars;
}

function checkUser() {
    if (localStorage.getItem("user")) {
        console.log(true + "1");
        $("#one").hide();
        $("#two").show();
        personImg("person", JSON.parse(localStorage.getItem("user")).gender);
        document.querySelector(`#header_username`).innerHTML = casing(JSON.parse(localStorage.getItem("user")).username, capitialize);
    } else {
        console.log(true + "2");
        $("#two").hide();
        $("#one").show();
    }
}

function makeMessageStructure(username, message, gender, background) {
    if (position == "right") {
        document.querySelector(`#messages`).innerHTML += `<div class="media">
                    <div class="media-body text-right media-right-style"    style="background-color: #00B863;">
                        <h2 class="media-heading">${username}</h2>
                        <p>${message}</p>
                    </div>
                    <div class= "media-right">
                        <img src="Images/${gender}.png" alt="${gender}" class="img-circle" width="60px" />
                    </div>
                </div>
            </div>`;
        position = "left";
    } else if (position == "left") {
        document.querySelector(`#messages`).innerHTML += `<div class="media">
                    <div class= "media-left">
                        <img src="Images/${gender}.png" alt="${gender}" class="img-circle" width="60px" />
                    </div>
                    <div class="media-body media-left-style"  style="background-color: #00B863;">
                        <h2 class="media-heading">${username}</h2>
                        <p>${message}</p>
                    </div>
                </div>
            </div>`;
        position = "right";
    }
}

function leave() {
    localStorage.removeItem("user");
    $("#two").hide();
    $("#one").show();
}

function personImg(eid, gender) {
    if (gender == 'male') {
        document.querySelector(`#${eid}`).src = "Images/male.png";
    } else {
        document.querySelector(`#${eid}`).src = "Images/female.png";
    }
}

function getVal(eid) {
    return (document.querySelector(`#${eid}`).value).trim();
}

function getRadio(name) {
    var radios = document.getElementsByName(`${name}`);
    for (let i = 0; i < radios.length; i++) {
        if (radios[i].checked) {
            return radios[i].value;
        }
    }
}

function saveToLocalStorage(key, value) {
    localStorage.setItem(key, value);
}