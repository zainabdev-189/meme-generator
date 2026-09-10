import "./App.css"
import { useState, useEffect } from "react"

export default function Content() {

  const [meme, setMeme] = useState({
    topText: "One does not simply",
    bottomText: "Walk into a Mordor",
    imageUrl: "http://i.imgflip.com/1bij.jpg"
  })

  const [allMemes, setAllMemes] = useState([])

  useEffect(() => {
    fetch("https://api.imgflip.com/get_memes")
      .then(res => res.json())
      .then(data => setAllMemes(data.data.memes));
  }, [])

  function getMemeImage() {
    const randomNumber = Math.floor(Math.random() * allMemes.length)
    const newMemeUrl = allMemes[randomNumber].url 
    setMeme(prev => ({
      ...prev,
      imageUrl: newMemeUrl
    }))
  }

  function handleChanges(event) {
    const { value, name } = event.currentTarget
    setMeme(prevMeme => ({
      ...prevMeme,
      [name]: value
    }))
  }

  return (
    <main className="container">
      <div className="form">
        <label className="form-label">Top Text
          <input type="text"
                 className="form-input"
                 placeholder="One does not simply"
                 name="topText"
                 onChange={handleChanges}
                 value={meme.topText}
          />
        </label>

        <label className="form-label">Bottom Text
          <input type="text"
                 className="form-input"
                 placeholder="walk into mordor"
                 name="bottomText"
                 onChange={handleChanges}
                 value={meme.bottomText}
          />
        </label>
      </div>

      <button className="btn" onClick={getMemeImage}>Get a new meme image</button>

      <div className="meme">
        <img className="meme-img" src={meme.imageUrl} alt="meme"/>
        <span className="top">{meme.topText}</span>
        <span className="bottom">{meme.bottomText}</span>
      </div>
    </main>
  )
}