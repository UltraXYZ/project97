function addUser(){
    userName=document.getElementById("username").value;
    localStorage.setItem("username",userName);
    window.location="kwitter_room.html";
}
