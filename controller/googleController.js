const con = require('../config/connection');


const googleController = {};

googleController.get = (req,res) =>{
    res.sendFile("views/signin.html",{root:'./'});
};
googleController.post = (req,res)=>{
   
};




module.exports = googleController;

function onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();
    console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    console.log('Name: ' + profile.getName());
    console.log('Image URL: ' + profile.getImageUrl());
    console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
    var fullName = document.getElementById("fullName");
    fullName = profile.getName();
    var submit = document.getElementsByClassName("btn waves-effect waves-light");

}

function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    console.log(auth2);
    auth2.signOut().then(function () {
    console.log('User signed out.');
    });
  }


 
