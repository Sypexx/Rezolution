import React, { useState, useEffect } from "react";
import firebase from "firebase/app";
import "firebase/firestore";

const UserProfile = ({ userId }) => {
const [userProfile, setUserProfile] = useState(null);

useEffect(() => {
const userCollection = firebase.firestore().collection("users");
userCollection.doc(userId).get()
.then((doc) => {
if (doc.exists) {
setUserProfile(doc.data());
} else {
console.log("Данные о пользователе не найдены");
}
})
.catch((error) => {
console.log(error.message);
});
}, [userId]);

if (!userProfile) {
return (
<div>Загрузка...</div>
);
}

return (
<div>
<h3>{userProfile.displayName}</h3>
<p>Email: {userProfile.email}</p>
<p>Дата регистрации: {userProfile.createdAt.toDate().toLocaleDateString()}</p>
<p>Номер телефона: {userProfile.phoneNumber || "Не указан"}</p>
</div>
);
};
