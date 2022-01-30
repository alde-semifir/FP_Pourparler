// Default imports :

import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect, Component } from "react";
import {
  Button,
  Form,
  FormGroup,
  FormLabel,
  FormSelect,
} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Text, View } from "react-native";


// Components import

import Bio from './Components/Bio/Bio.jsx';

// App

export default function App() {

  let [playerSelection, setPlayerSelection] = useState(1);

  const [playerList, setPlayerList] = useState([
    {
      id: "",
      bio: "",
    },
  ]);

  const [player, setPlayer] = useState({
    id: "",
    bio: "",
    carac: "",
    comp: "",
    compSpe: "",
    money: "",
    inventory: {
      loot: "",
      cloth: "",
    },
    weapons: {
      slot1: "",
      slot2: "",
      slot3: "",
      slot4: "",
      slot5: "",
    },
  });

  const getPlayer = async (id) => {
    try {
      const response = await fetch("http://localhost:8080/players/" + id);
      const json = await response.json();
      console.log(json);
      setPlayer(json);
    } catch (error) {
      console.log(error);
    }
  };

  const getPlayerList = async () => {
    try {
      const response = await fetch("http://localhost:8080/players/");
      const json = await response.json();
      console.log(json);
      setPlayerList(json);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPlayerList();
    getPlayer(playerSelection);
  }, []);

  
  const handlePlayerSelection = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setPlayerSelection(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();
    getPlayer(playerSelection)
  }

  return (
    <View>
      <Form onSubmit={handleSubmit}>
        <FormGroup className="mb-3">
          <FormSelect aria-label="Personnage" size="lg" onChange={handlePlayerSelection}>
            <option>Sélectionnez votre joueur :</option>
            {playerList.map((player) => {
              return (
                <option key={player.id} value={player.id} >
                  {player.bio.firstName} 
                </option>
              );
            })}
          </FormSelect>
          <FormGroup className="d-grid gap-2">
          <Button variant="dark" size="lg" type="submit">Pick</Button>
          </FormGroup>
        </FormGroup>
      </Form>
      <Bio bio={player.bio}/>
      <Text>Player ID : {player.id}</Text>
      <Text>Player Name : {player.bio.firstName}</Text>
      <StatusBar style="auto" />
    </View>
  );
}
