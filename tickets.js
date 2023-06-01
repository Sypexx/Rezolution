import React, { useState } from "react";
import firebase from "firebase/app";
import "firebase/firestore";

const BuyTicketForm = ({ tournamentId, currentUser }) => {
  const [ticketCount, setTicketCount] = useState(1);

  const handleSubmit = (event) => {
    event.preventDefault();
    const ticketItem = {
      user: currentUser.uid,
      tournament: tournamentId,
      quantity: ticketCount,
      timestamp: firebase.firestore.Timestamp.now()
    };
    const ticketCollection = firebase.firestore().collection("tickets");
    ticketCollection
    .add(ticketItem)
.then(() => {
// Обработка успешной покупки билета
console.log("Билет успешно куплен");
})
.catch((error) => {
// Обработка ошибки при покупке билета
console.log(error.message);
});
};

const handleTicketCount = (event) => {
setTicketCount(parseInt(event.target.value));
};

return (
<form onSubmit={handleSubmit}>
<label>
Количество билетов:
<input type="number" value={ticketCount} onChange={handleTicketCount} />
</label>
<button type="submit">Купить билет</button>
</form>
);
};
