import { useState } from "react";
import { MdDownload } from "react-icons/md";
import "./App.css";

function App() {
  const [image, setImage] = useState(null);
  const [bgRemove, setBgremove] = useState(null);

  const handleChange = () => {
    const apiKey = "37DSKVhizbZtrMp8BBhv9y5j";
    const url = "https://api.remove.bg/v1.0/removebg";

    const formData = new FormData();
    formData.append("image_file", image, image.name);
    formData.append("size", "auto");

    fetch(url, {
      method: "POST",
      headers: {
        "X-Api-Key": apiKey,
      },
      body: formData,
    })
      .then((res) => res.blob())
      .then((blob) => {
        const reader = new FileReader();
        reader.onloadend = () => setBgremove(reader.result);
        reader.readAsDataURL(blob);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="container">
      <div className="heading">
        <h2>Background Remover</h2>
      </div>
      <div className="image-button">
        <div className="image-input">
          <input type="file" onChange={(e) => setImage(e.target.files[0])} />
        </div>
        <div className="btn-download">
          <button onClick={handleChange}> Remove </button>
          {bgRemove && (
            <a href={bgRemove} download="Edited">
              <MdDownload color="#3F2305" size="30"/>
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
