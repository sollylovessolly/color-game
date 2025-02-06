import  { useState, useEffect } from "react";
import './styles/ColorGame.css'

const generateRandomColor = () => {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

const ColorGame = () => {
    
  const [targetColor, setTargetColor] = useState("");
  const [colorOptions, setColorOptions] = useState([]);
  const [score, setScore] = useState(null );
  const [message, setMessage] = useState("Guess the correct color.");



  useEffect(() => {
    startNewGame();
  }, []);
  
  const startNewGame = () => {
    setScore(0)
    const correctColor = generateRandomColor();
    let options = new Set([correctColor]);

    while (options.size < 6) {
      options.add(generateRandomColor());
    }

    setTargetColor(correctColor);
    setColorOptions(shuffleArray([...options]));
    setMessage("Guess the correct color.");
    
   
  };

  const shuffleArray = (array) => {
    return array.sort(() => Math.random() - 0.5);
  };

  const handleGuess = (color) => {
    if (color === targetColor) {
      setMessage("Correct! 🎉");
      setScore(score+1 );
      startNewGame();
    } else {
      setMessage("Wrong! Try again.");
    }
  };
  const targetStyle = {
    width: "160px",
    height: "160px",
    backgroundColor: targetColor,
    margin: "2px auto",
    border: "5px solid white",
    borderRadius:"10%",
    boxShadow: "0 0 20px 5px rgb(255, 255, 255)",
  };
  
  return (
    <div className="container">
      <h2 className="instruction" data-testid="gameInstructions">{message}</h2>
      <div
        data-testid="colorBox"
        style={targetStyle}
      ></div>
      <div className="inner-container">
        {colorOptions.map((color, index) => (
          <button
            key={index}
            data-testid="colorOption"
            onClick={() => handleGuess(color)}
            className="target-button"
            style={{
              backgroundColor: color,
              width: 'clamp(50px, 30vw, 100px)', 
              height: 'clamp(50px, 30vw, 100px)', 
              marginLeft: "5%",
              marginRight: "2%",
              marginBottom:"1.5%",
              marginTop:"1.5%",
              cursor: "pointer",
              border: "5px solid grey",
              borderRadius:"10%",
            }}
          ></button>
        ))}
      </div>
      <h3 data-testid="score" className="score">Score: {score}</h3>
      <button
        data-testid="newGameButton"
        onClick={startNewGame}
        className="new-game"
      >
        New Game
      </button>
    </div>
  );
};

export default ColorGame;

