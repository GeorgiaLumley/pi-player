import React, { useState, useEffect } from "react";

import {
  login,
  getDeviceId,
  playPause,
  playAlbum,
  addNewCard,
} from "./utils.js";
import albumCards from "./Albums.json";
import { Button } from "./App.styles";
function App(cardId) {
  const [authUrl, setAuthUrl] = useState(null);
  const [deviceId, setDeviceId] = useState(null);
  const [formOpen, openForm] = useState(false);
  console.log({ deviceId });
  return (
    <div className="App">
      <h1 style={{ color: "red" }}>hello!</h1>
      <Button
        onClick={async function () {
          const url = await login();
          setAuthUrl(url);
        }}
        styles={{ cursor: "pointer" }}
      >
        login
      </Button>
      {authUrl && <a href={authUrl}>Authenticate</a>}
      <Button onClick={() => getDeviceId(setDeviceId)}>Get Device</Button>
      <Button onClick={() => playPause(deviceId)}>Play / pause</Button>
      <Button onClick={() => playAlbum(deviceId, albumCards.id2)}>Scan</Button>
      <Button onClick={() => openForm(true)}>Add New Card</Button>
      {console.log(formOpen)}
      {formOpen && (
        <form onSubmit={(e) => addNewCard(e, cardId)}>
          <div>
            <label form="uri">Spotify URI:</label>
            <input type="text" id="uri" name="uri" />
          </div>
          <div>
            <label form="album">Album:</label>
            <input type="text" id="album" name="album" />
          </div>
          <div>
            <label form="artist">Artist:</label>
            <input type="text" id="artist" name="artist" />
          </div>
          <Button type="submit">Submit new card</Button>
        </form>
      )}
    </div>
  );
}

export default App;
