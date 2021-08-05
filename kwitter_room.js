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

document.getElementById("userName").innerHTML = "Welcome " + userName + "!";

function addRoom() {
      console.log("Inside addRoom()");
      roomName = document.getElementById("roomName").value;
      firebase.database().ref("/").child(roomName).update({
            purpose: "adding room name"
      });
      localStorage.setItem("roomName", roomName);
      window.location = "kwitter_page.html";
}

function getData() {
      firebase.database().ref("/").on('value', function (snapshot) {
            document.getElementById("output").innerHTML = "";
            snapshot.forEach(function (childSnapshot) {
                  childKey = childSnapshot.key;
                  Room_names = childKey;
                  //Start code
                  row = "<div class='room_name' id=" + Room_names + " onclick='redirectToRoomName(this.id)' >#" + Room_names + "</div><hr>";
                  document.getElementById("output").innerHTML += row;
                  //End code
            });
      });
}
getData();

function redirectToRoomName(name){
      localStorage.setItem("roomName", name);
      window.location = "kwitter_page.html";
}

function logOut(){
      localStorage.removeItem("username");
      localStorage.removeItem("roomName");
      window.location="index.html";
}