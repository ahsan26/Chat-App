var config = {
    apiKey: "AIzaSyDVjjcASBjYyDhWP7Pio2lCi5NtYdg5sNI",
    authDomain: "chat-application-389c9.firebaseapp.com",
    databaseURL: "https://chat-application-389c9.firebaseio.com",
    projectId: "chat-application-389c9",
    storageBucket: "chat-application-389c9.appspot.com",
    messagingSenderId: "932973365631"
};
firebase.initializeApp(config);
var dbref = firebase.database().ref();

function saveToDatabase(obj) {
    dbref.child("messages").push(obj);
}
let messagesData = [];
dbref.child("messages").on("value", (snapshot) => {
    messagesData = [];
    for (let prop in snapshot.val()) {
        messagesData.push(snapshot.val()[prop]);
    }
    if (firstTimeLoad) {
        displayMessages(messagesData, firstTimeLoad);
        firstTimeLoad = false;
    } else {
 displayMessages([messagesData[messagesData.length - 1]], firstTimeLoad);

  }
})