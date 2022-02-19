import albumCards from "./Albums.json";
const localHost = "http://localhost:5000";

export const login = async () => {
  console.log("client");
  const auth = await fetch(`${localHost}/login`).then((res) => res.json());
  //   const json = auth.json();
  return auth.spotify;
};

export const getAuthToken = async () => {
  console.log("AUthTokcne");
  const authToken = await fetch(`${localHost}/authToken`).then((res) =>
    res.json()
  );
  return authToken.token;
};

const spotifyBaseUrl = "https://api.spotify.com/v1";
const spotifyFetch = async (url, method, token, body) => {
  return await fetch(spotifyBaseUrl + url, {
    method: method.toUpperCase(),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body:
      body &&
      JSON.stringify({
        context_uri: body.albumId,
        position_ms: 0,
      }),
  });
};

export const getDeviceId = async (setDeviceId) => {
  const token = await getAuthToken();
  await spotifyFetch("/me/player/devices", "GET", token).then((response) => {
    response.json().then(async (data) => {
      const devices = data.devices;

      const littlePad = devices.find(
        (device) => device.id === "6ff249b94e4dab22923827661d16fe6556184bee"
      );
      console.log({ littlePad });
      setDeviceId(littlePad.id);
    });
  });
};

export const playPause = async (deviceId) => {
  const token = await getAuthToken();
  const player = await spotifyFetch("/me/player", "GET", token).then(
    async (response) => {
      const json = await response.json();
      return json;
    }
  );
  console.log({ player });
  if (player.is_playing) {
    await spotifyFetch(`/me/player/pause?deviceId=${deviceId}`, "PUT", token);
  } else {
    await spotifyFetch(`/me/player/play?deviceId=${deviceId}`, "PUT", token, {
      albumId: player.item.album.uri,
    });
  }
};

export const playAlbum = async (deviceId, albumId) => {
  const token = await getAuthToken();
  console.log({ token }, { deviceId }, { albumId });
  await spotifyFetch(`/me/player/play?deviceId=${deviceId}`, "PUT", token, {
    albumId: albumId.spotify_uid,
  });
};

export const addNewCard = (event) => {
  event.preventDefault();
  console.log({ event });
  // albumCards[cardId] = {
  //   spotify_uid: "spotify:album:621cXqrTSSJi1WqDMSLmbL",
  //   album: "Trench",
  //   artist: "Twenty One Pilots",
  // };
};
