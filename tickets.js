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
