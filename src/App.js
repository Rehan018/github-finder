import React, { useState, createContext, useEffect } from "react";
import "./App.css";

export const ThemeContext = createContext(null);

function App() {
  const [ball, setBall] = useState("ball");
  const [theme, setTheme] = useState("dark");

  const toggleTheme = () => {
    setTheme((curr) => (curr === "dark" ? "light" : "dark"));
    setBall((currBall) => (currBall === "ball" ? "ball move" : "ball"));
  };

  useEffect(() => {
    let input = document.querySelector(".search input");

    input.addEventListener("keypress", (e) => {
      let key = e.which || e.keyCode;
      if (key === 13) {
        const btn = document.querySelector(".search button");
        btn.click();
      }
    });
  }, []);

  const [username, setUsername] = useState("");
  const [body, setBody] = useState({});

  const submitUsername = () => {
    fetch(`https://api.github.com/users/${username}`)
      .then((response) => response.json())
      .then((data) => {
        setBody(data);
        let d = new Date(data.created_at);
        data.date = d.toLocaleDateString("en-US", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className="App" id={theme}>
        <header>
          <span>gitHub-Finder</span>
          <div className="button" onClick={toggleTheme} checked={theme === "dark"}>
            <div className="icons-button">
              <i className="bi bi-moon-fill"></i>
              <i className="bi bi-brightness-high-fill"></i>
            </div>
            <div className={ball}></div>
          </div>
        </header>
        <main>
          <div className="search">
            <div className="search-input">
              <label htmlFor="username">
                <i className="bi bi-search"></i>
              </label>
              <input
                type="text"
                id="username"
                placeholder="Enter your username"
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <button onClick={submitUsername}>Search</button>
          </div>
          {body.name === undefined ? (
            <div className="content-finder">
              <p>Search for your GitHub user</p>
            </div>
          ) : (
            <div className="content-finder">
              <img src={body.avatar_url} alt={body.login} />
              <div className="container-flex">
                <div className="name">
                  <div>
                    <h1>{body.name}</h1>
                    <a href={body.html_url} target="_blank" rel="noopener noreferrer">
                      <h2>{body.login}</h2>
                    </a>
                  </div>
                  <span>Joined {body.date}</span>
                </div>
                <div className="description">
                  <p>{body.bio}</p>
                </div>
                <div className="followers">
                  <div className="container-followers">
                    <p>Repos</p>
                    <p>{body.public_repos}</p>
                  </div>
                  <div className="container-followers">
                    <p>Followers</p>
                    <p>{body.followers}</p>
                  </div>
                  <div className="container-followers">
                    <p>Following</p>
                    <p>{body.following}</p>
                  </div>
                </div>
                <div className="additional-fields">
                  <div className="content-link">
                    <i className="bi bi-person"></i>
                    <p>{body.name}</p>
                  </div>
                  <div className="content-link">
                    <i className="bi bi-envelope"></i>
                    <p>{body.email || "Not available"}</p>
                  </div>
                  <div className="content-link">
                    <i className="bi bi-geo-alt-fill"></i>
                    <p>{body.location === null ? "Not defined" : body.location}</p>
                  </div>
                  <div className="content-link">
                    <i className="bi bi-link-45deg"></i>
                    <a href={body.blog} target="_blank" rel="noopener noreferrer">
                      <p>{body.blog === "" ? "Not defined" : body.blog}</p>
                    </a>
                  </div>
                  <div className="content-link">
                    <i className="bi bi-twitter"></i>
                    <a href={body.twitter_username} target="_blank" rel="noopener noreferrer">
                      <p>
                        {body.twitter_username === null ? "Not defined" : body.twitter_username}
                      </p>
                    </a>
                  </div>
                  <div className="content-link">
                    <i className="bi bi-building"></i>
                    <p>{body.company === null ? "Not defined" : body.company}</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </ThemeContext.Provider>
  );
}

export default App;



