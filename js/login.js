document.getElementById("btn").addEventListener("click", () => {
  let comprar = {
    user: document.getElementById("floatingInput").value,
    articles: [],
  };
  localStorage.setItem("comprar", JSON.stringify(comprar));
  if (
    document.getElementById("floatingPassword").value.length > 0 &&
    document.getElementById("floatingInput").value.length > 0
  ) {
    localStorage.setItem("user", document.getElementById("floatingInput").value);

    window.location.replace("principal.html");
  } else {
    alert("Debe ingresar los datos correctamente.");
  }
});

// Inicio con google
var firebaseConfig = {
  apiKey: "AIzaSyB19FmYzjf4sVrpONNuObQTRT_86g7-cY8",
  authDomain: "fir-d6a19.firebaseapp.com",
  projectId: "fir-d6a19",
  storageBucket: "fir-d6a19.appspot.com",
  messagingSenderId: "296209291197",
  appId: "1:296209291197:web:b3a12c0943a1dd5f2f24d4",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

var loginWithGoogle = function () {
  var provider = new firebase.auth.GoogleAuthProvider();
  firebase
    .auth()
    .signInWithPopup(provider)
    .then(function (result) {
      // This gives you a Google Access Token. You can use it to access the Google API.
      var token = result.credential.accessToken;
      // The signed-in user info.
      var user = result.user;
      let comprar = {
        user: user.email,
        articles: [],
      };
      localStorage.setItem("comprar", JSON.stringify(comprar));
      localStorage.setItem("user", user.email);
      localStorage.setItem("userIMG", user.photoURL);
      window.location.replace("principal.html");
      // ...
    })
    .catch(function (error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      // ...

      console.log(errorMessage);
    });
};
