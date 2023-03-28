import React, { useState } from "react";
import { Configuration, OpenAIApi } from "openai";
const configuration = new Configuration({
  apiKey: import.meta.env.VITE_MY_API_KEY,
});
const openai = new OpenAIApi(configuration);

function imgGenerator() {
  const [prompt, setPrompt] = useState("");
  const [generatedImg, setGeneratedImg] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function generateImg() {
    setIsLoading(true);
    try {
      const response = await openai.createImage({
        prompt: prompt,
        n: 1,
        size: "512x512",
      });
      setGeneratedImg(response.data.data[0].url);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  }

  function handleDownload() {
    const link = document.createElement("a");
    link.ref = generatedImg;
    link.download = "generated-imge,jpg";
    link.click();
  }

  return (
    <div>
      <h1 className="header--text">Image Generator</h1>

      <article>
        <div className="input-field">
          <input
            type="text"
            placeholder="Enter Text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />
          <button onClick={generateImg}>Generate Image</button>
        </div>

        <div className="img-field">
          {isLoading ? (
            <>
              <p>Loading...</p>
              <p>Please wait for your image to get raedy</p>
            </>
          ) : (
            ""
          )}
          <img src={generatedImg} alt="" />
        </div>
        {/* <a href={generatedImg} download onClick={handleDownload}>
          Save Image
        </a> */}
      </article>
    </div>
  );
}

export default imgGenerator;
