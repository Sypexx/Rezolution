import React, { useState, useEffect } from "react";
import firebase from "firebase/app";
import "firebase/firestore";

const TournamentList = () => {
  const [tournamentList, setTournamentList] = useState([]);

  useEffect(() => {
    const tournamentCollection = firebase.firestore().collection("tournaments");
    tournamentCollection.get()
      .then((querySnapshot) => {
        const tournamentItems = [];
        querySnapshot.forEach((doc) => {
          tournamentItems.push(doc.data());
        });
        setTournamentList(tournamentItems);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, []);

  return (
    <div>
      {tournamentList.map((item) => (
        <div key={item.id}>
          <h3>{item.title}</h3>
          <p>{item.description}</p>
          <button>Купить билет</button>
        </div>
      ))}
    </div>
  );
};

const AddTournamentForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const newTournamentItem = {
      title: title,
      description: description
    };
    const tournamentCollection = firebase.firestore().collection("tournaments");
    tournamentCollection.add(newTournamentItem)
      .then(() => {
        // Обработка успешного создания турнира
        console.log("Турнир успешно добавлен");
      })
      .catch((error) => {
        // Обработка ошибки при создании турнира
        console.log(error.message);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Название:
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
      </label>
      <label>
        Описание:
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
      </label>
      <button type="submit">Добавить турнир</button>
    </form>
  );
};
