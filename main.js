import React, { useState, useEffect } from "react";
import firebase from "firebase/app";
import "firebase/firestore";

const NewsList = () => {
  const [newsList, setNewsList] = useState([]);

  useEffect(() => {
    const newsCollection = firebase.firestore().collection("news");
    newsCollection.get()
      .then((querySnapshot) => {
        const newsItems = [];
        querySnapshot.forEach((doc) => {
          newsItems.push(doc.data());
        });
        setNewsList(newsItems);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, []);

  return (
    <div>
      {newsList.map((item) => (
        <div key={item.id}>
          <h3>{item.title}</h3>
          <p>{item.content}</p>
        </div>
      ))}
    </div>
  );
};
