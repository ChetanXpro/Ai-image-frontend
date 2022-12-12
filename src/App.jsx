import { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [text, setText] = useState("Bear");
  const [size, setSize] = useState("medium");
  const [imgUrl, setImgurl] = useState("");
  const [error, seterror] = useState(false);
  const instance = axios.create({
    baseURL: "https://ai-image-emhz.onrender.com",
    timeout: 9000,
    headers: {
      "Content-Type": "application/json",
    },
  });

  const getImage = async (e) => {
    e.preventDefault();
    try {
      const data = JSON.stringify({
        text,
        size,
      });
      seterror(false);
      setImgurl("");
      setIsLoading(true);
      const res = await instance.post("/generateimage", data);
      setIsLoading(false);
      setImgurl(res.data.data);
    } catch (error) {
      setIsLoading(false);
      seterror(true);
      console.log(error);
    }
  };

  return (
    <>
      {/* <div className="showcase"> */}
      <div className="navbar">
        <div className="logo">
          <h2>AI Image Generator</h2>
        </div>
        <div>
          <h3>ChetaN</h3>
        </div>
      </div>
      <main>
        <section className="showcase">
          <form id="image-form" onSubmit={getImage}>
            <h1>Describe An Image</h1>
            <div className="form-control">
              <input
                type="text"
                onChange={(e) => {
                  setText(e.target.value);
                }}
                id="prompt"
                placeholder="Enter Text"
              />
            </div>

            <div className="form-control">
              <select
                name="size"
                onChange={(e, v) => {
                  setSize(e.target.value);
                }}
                defaultValue="small"
                id="size"
              >
                <option value="small">Small</option>
                <option value="medium">Medium</option>
                <option value="large">Large</option>
              </select>
            </div>
            <button type="submit" className="btn">
              Generate
            </button>
            <h3 className="error">
              {error ? "Please try with another text" : ""}
            </h3>
          </form>
        </section>

        <section className="image">
          <h2>{isLoading ? "Loading.." : ""}</h2>
          <div className="image-container">
            <h2 className="msg"></h2>
            <img src={imgUrl} alt="" id="image" />
          </div>
        </section>
      </main>
    </>
  );
}

export default App;
