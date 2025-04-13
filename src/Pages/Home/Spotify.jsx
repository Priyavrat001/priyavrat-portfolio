import { useEffect, useState } from "react";
import axios from "axios";

const API = "https://priyavrat-portfolio-backend.onrender.com/api/v1";

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
      console.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchNowPlaying = async () => {
    try {
      const res = await axios.get(`${API}/now-playing`);
      setNowPlaying(res.data?.item || null);
    } catch (err) {
      console.error(err.message);
    }
  };

  const playTrack = async (id) => {
    try {
      await axios.put(`${API}/play/${id}`);
      fetchNowPlaying();
    } catch (err) {
      console.error(err.message);
    }
  };

  const stopPlayback = async () => {
    try {
      await axios.put(`${API}/stop`);
      fetchNowPlaying();
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    const code = query.get("code");

    if (code) {
      // We've been redirected from Spotify login
      axios
        .get(`${API}/callback?code=${code}`)
        .then(() => {
          fetchTopTracks();
          fetchNowPlaying();
        })
        .catch((err) => console.error(err));
    }
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h1>🎧 Spotify Dashboard</h1>

      <a href={`${API}/login`}>
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
