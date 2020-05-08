$(document).ready(function () {
  $("#submit").on("click", signUp);
  $("#signIn").on("click", moveToSignIn);
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

function signUp() {
  let email = $("#email").val();
  let password = $("#password").val();
  if (password.length < 6) {
    alert("At least 6 characters for you password");
    return;
  }

  const promise = auth.createUserWithEmailAndPassword(email, password);
  promise.catch((e) => alert(e.message));

  alert("Successfully Signed Up");

  window.location.href = "mock_login.html";
}

function moveToSignIn() {
  window.location.href = "mock_login.html";
}
