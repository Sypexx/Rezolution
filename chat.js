import React, { useState, useEffect } from "react";
import firebase from "firebase/app";
import "firebase/firestore";

const Chat = ({ currentUser }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    const chatCollection = firebase.firestore().collection("chat");
    chatCollection.orderBy("timestamp").onSnapshot((querySnapshot) => {
      const chatMessages = [];
      querySnapshot.forEach((doc) => {
        chatMessages.push(doc.data());
      });
      setMessages(chatMessages);
    });
  }, []);

  const handleNewMessage = (event) => {
    setNewMessage(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const messageItem = {
      text: newMessage,
      user: currentUser.email,
      timestamp: firebase.firestore.Timestamp.now()
    };
    const chatCollection = firebase.firestore().collection("chat");
    chatCollection.add(messageItem)
      .then(() => {
        // Обработка успешной отправки сообщения
        console.log("Сообщение успешно отправлено");
        setNewMessage("");
      })
      .catch((error) => {
        // Обработка ошибки при отправке сообщения
        console.log(error.message);
      });
  };

  return (
    <div>
      {messages.map((item) => (
        <div key={item.timestamp.toMillis()}>
          <p>{item.user}: {item.text}</p>
        </div>
      ))}
      <form onSubmit={handleSubmit}>
        <input type="text" value={newMessage} onChange={handleNewMessage} />
        <button type="submit">Отправить</button>
      </form>
    </div>
  );
};
