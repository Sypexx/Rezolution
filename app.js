import firebase from "firebase/app";
import "firebase/auth";

const registerUser = (email, password) => {
  firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Добавление нового пользователя в базу данных
      const newUser = userCredential.user;
      firebase.firestore().collection("users").doc(newUser.uid).set({
        email: newUser.email,
        username: "",
        avatarUrl: "",
        description: "",
        favoriteGames: [],
        tournaments: []
      });
    })
    .catch((error) => {
      // Обработка ошибки при регистрации
      console.log(error.message);
    });
};
