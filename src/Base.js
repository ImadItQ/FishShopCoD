import Rebase from "re-base";
import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyBmMer-Vk8uls2mY7oDZ-2DiXmk1vcGirc",
    authDomain: "catch-of-the-day-itquan.firebaseapp.com",
    databaseURL: "https://catch-of-the-day-itquan.firebaseio.com"
});

const base = Rebase.createClass(firebaseApp.database());

export {firebaseApp};

export default base;