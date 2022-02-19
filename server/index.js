import express from "express";
import request from "request";
import dotenv from "dotenv";
import cors from "cors";

import { generateRandomString } from "./utils.js";

const port = 5000;

dotenv.config();

const spotify_client_id = process.env.SPOTIFY_CLIENT_ID;
const spotify_client_secret = process.env.SPOTIFY_CLIENT_SECRET;
let access_token = null;

const app = express();

app.use(cors());

app.get("/login", function (req, res) {
  console.log("LGOIN");
  const state = generateRandomString(16);
  const scope =
    "user-read-private user-read-email user-read-playback-state user-modify-playback-state";

  const auth_query_parameters = new URLSearchParams({
    response_type: "code",
    client_id: spotify_client_id,
    scope: scope,
    redirect_uri: "http://192.168.1.30:5000/auth/callback",
    state: state,
  });

  const spotifyAuth = `https://accounts.spotify.com/authorize/?${auth_query_parameters.toString()}`;
  res.send({
    spotify: spotifyAuth,
  });
});

let count = 0;
app.get("/auth/callback", function (req, res) {
  count = count + 1;
  if (count >= 1) {
    const code = req.query.code;
    console.log("CALLBACK");

    const authOptions = {
      url: "https://accounts.spotify.com/api/token",
      form: {
        code: code,
        redirect_uri: "http://192.168.1.30:5000/auth/callback",
        grant_type: "authorization_code",
      },
      headers: {
        Authorization:
          "Basic " +
          Buffer.from(spotify_client_id + ":" + spotify_client_secret).toString(
            "base64"
          ),
        "Content-Type": "application/x-www-form-urlencoded",
      },
      json: true,
    };
    request.post(authOptions, function (error, response, body) {
      if (!error && response.statusCode === 200) {
        access_token = body.access_token;
        console.log({ access_token });
        // res.redirect("http://localhost:3000/");
      }
    });
  }
});

app.get("/authToken", function (req, res) {
  console.log("TOKEN");
  res.send({ token: access_token });
});

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
