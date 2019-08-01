import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as firebase from "firebase/app";

var firebaseConfig = {
  apiKey: "AIzaSyCDR1tF9_vagKCo0VndDh7JX9eapHHKakU",
  authDomain: "tien-len-a1f31.firebaseapp.com",
  databaseURL: "https://tien-len-a1f31.firebaseio.com",
  projectId: "tien-len-a1f31",
  storageBucket: "tien-len-a1f31.appspot.com",
  messagingSenderId: "386493843836",
  appId: "1:386493843836:web:d66fb2b578bee471"
};

firebase.initializeApp(firebaseConfig);

ReactDOM.render(<App />, document.getElementById("root"));
