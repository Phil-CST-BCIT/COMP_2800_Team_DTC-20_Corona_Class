$(document).ready(function () {
  $("#submit").on("click", login);
  $("#signUp").on("click", moveToSignUp);
});

var firebaseConfig = {
  apiKey: "AIzaSyCZ1RCsNhsc2MSQHN5zxcXuwz_8dnHp9Ck",
  authDomain: "starter-528fb.firebaseapp.com",
  databaseURL: "https://starter-528fb.firebaseio.com",
  projectId: "starter-528fb",
  storageBucket: "starter-528fb.appspot.com",
  messagingSenderId: "949166401026",
  appId: "1:949166401026:web:a8ddcd13b2f41c5b81e91b",
  measurementId: "G-9W4YDBN4K6",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();

function login() {
  let email = $("#email").val();
  let password = $("#password").val();

  const promise = auth.signInWithEmailAndPassword(email, password);
  promise.catch((e) => alert(e.message));
}

auth.onAuthStateChanged(function (user) {
  if (user) {
    let email = user.email;
    alert("active user" + user.email);

    // Homepage url goes here
    window.location.href = "";
  }
});

function moveToSignUp() {
  window.location.href = "mock_signUp.html";
}
