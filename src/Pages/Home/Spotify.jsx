import { useEffect, useState } from "react";
import axios from "axios";

const API = "https://priyavrat-portfolio-backend.onrender.com/api/v1";

const CLIENT_ID = "8b669a9b6b9d4887bbc90c39938b6730";
const REDIRECT_URI = encodeURIComponent(`${API}/callback`);
const SCOPE = encodeURIComponent(
  "user-read-playback-state user-read-currently-playing user-top-read user-modify-playback-state streaming user-read-private"
);

const AUTH_URL = `https://accounts.spotify.com/authorize?response_type=code&client_id=${CLIENT_ID}&scope=${SCOPE}&redirect_uri=${REDIRECT_URI}`;

export default function SpotifyPage() {
  const [tracks, setTracks] = useState([]);
  const [nowPlaying, setNowPlaying] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchTopTracks = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API}/top-tracks`);
      setTracks(res.data.items);
    } catch (err) {
      console.error("Top Tracks Error:", err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchNowPlaying = async () => {
    try {
      const res = await axios.get(`${API}/now-playing`);
      setNowPlaying(res.data?.item || null);
    } catch (err) {
      console.error("Now Playing Error:", err.message);
    }
  };

  const playTrack = async (id) => {
    try {
      await axios.put(`${API}/play/${id}`);
      fetchNowPlaying();
    } catch (err) {
      console.error("Play Error:", err.message);
    }
  };

  const stopPlayback = async () => {
    try {
      await axios.put(`${API}/stop`);
      fetchNowPlaying();
    } catch (err) {
      console.error("Stop Error:", err.message);
    }
  };

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    const code = query.get("code");

    if (code) {
      axios
        .get(`${API}/callback?code=${code}`)
        .then(() => {
          fetchTopTracks();
          fetchNowPlaying();
        })
        .catch((err) => console.error("Callback Error:", err));
    }
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h1>🎧 Spotify Dashboard</h1>

      <a href={AUTH_URL}>
        <button style={{ marginBottom: 20 }}>Login with Spotify</button>
      </a>

      <div>
        <h2>Now Playing</h2>
        {nowPlaying ? (
          <div>
            <p>
              <strong>{nowPlaying.name}</strong> by{" "}
              {nowPlaying.artists.map((a) => a.name).join(", ")}
            </p>
            <img
              src={nowPlaying.album.images[0].url}
              alt="album cover"
              width={100}
            />
          </div>
        ) : (
          <p>Nothing is playing.</p>
        )}
        <button onClick={stopPlayback} style={{ marginTop: 10 }}>
          ⏹️ Stop
        </button>
      </div>

      <div style={{ marginTop: 40 }}>
        <h2>Top Tracks</h2>
        {loading ? (
          <p>Loading tracks...</p>
        ) : (
          tracks.map((track) => (
            <div key={track.id} style={{ marginBottom: 10 }}>
              <p>
                {track.name} by {track.artists.map((a) => a.name).join(", ")}
              </p>
              <button onClick={() => playTrack(track.id)}>▶️ Play</button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
