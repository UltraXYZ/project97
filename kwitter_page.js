var firebaseConfig = {
    apiKey: "AIzaSyAtdocw14jTgUM2iVCgPxM6CGf-FM7X1-M",
    authDomain: "kwitter-3212b.firebaseapp.com",
    databaseURL: "https://kwitter-3212b-default-rtdb.firebaseio.com",
    projectId: "kwitter-3212b",
    storageBucket: "kwitter-3212b.appspot.com",
    messagingSenderId: "142367193547",
    appId: "1:142367193547:web:59507f226b7853af2f1e4e",
    measurementId: "G-Y10R5428GL"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

userName = localStorage.getItem("username");
room_name = localStorage.getItem("roomName");

function send() {
    console.log("Inside the send function");
    msg = document.getElementById("msg").value;
    firebase.database().ref(room_name).push({
          name: userName,
          msg: msg,
          like: 0
    });
    document.getElementById("msg").value = "";
}

function getData() {
    firebase.database().ref("/" + room_name).on('value', function (snapshot) {
          document.getElementById("output").innerHTML = "";
          snapshot.forEach(function (childSnapshot) {
                childKey = childSnapshot.key;
                childData = childSnapshot.val();
                if (childKey != "purpose") {
                      firebase_message_id = childKey;
                      message_data = childData;
                      //Start code
                      name = message_data["name"];
                      msg = message_data["msg"];
                      like = message_data["like"];
                      name_with_tag = "<h4> " + name + "<img class='user_tick' src='tick.png'>";
                      message_with_tag = "<h4 class='message_h4'>" + msg + "</h4>";
                      like_button = "<button class='btn btn-warning' id=" + firebase_message_id + " value=" + like + " onclick='updateLike(this.id)'>";
                      span_with_tag = "<span class='glyphicon glyphicon-thumbs-up'>Like: " + like + "</span></button><hr>";
                      row=name_with_tag+message_with_tag+like_button+span_with_tag;
                      document.getElementById("output").innerHTML+=row;
                      //End code
                
                }
          });
    });
}
getData();

function updateLike(firebase_message_id){
    buttonId=firebase_message_id;
    likes=document.getElementById(buttonId).value;
    updateLikes=Number(likes)+1;
    firebase.database().ref(room_name).child(firebase_message_id).update({
          like:updateLikes
    });
}

function logOut(){
    localStorage.removeItem("username");
    localStorage.removeItem("roomName");
    window.location="index.html";
}