import React, { useState } from "react";
import firebase from "firebase/app";
import "firebase/firestore";

const AddNewsForm = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const newNewsItem = {
      title: title,
      content: content
    };
    const newsCollection = firebase.firestore().collection("news");
    newsCollection.add(newNewsItem)
      .then(() => {
        // Обработка успешного создания новости
        console.log("Новость успешно добавлена");
      })
      .catch((error) => {
        // Обработка ошибки при создании новости
        console.log(error.message);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Заголовок:
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
      </label>
      <label>
        Содержание:
        <textarea value={content} onChange={(e) => setContent(e.target.value)} />
      </label>
      <button type="submit">Добавить новость</button>
    </form>
  );
};
