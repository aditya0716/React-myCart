import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";

import firebase from "firebase/app";

import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC0_WReijMmZOwA7jY8O64uZjqG_MSZErg",
  authDomain: "cart-cb123.firebaseapp.com",
  projectId: "cart-cb123",
  storageBucket: "cart-cb123.appspot.com",
  messagingSenderId: "57220283950",
  appId: "1:57220283950:web:8af7fced2861254249e9bf",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
