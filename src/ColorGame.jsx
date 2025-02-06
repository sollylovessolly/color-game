import { useState, useEffect } from "react";
import './styles/ColorGame.css';

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
  const [score, setScore] = useState(0);
  const [message, setMessage] = useState("Guess the correct color.");
  const [timer, setTimer] = useState(10); 

  useEffect(() => {
    startNewGame();
  }, []);

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prevTime) => prevTime - 1);
      }, 1000);

      return () => clearInterval(interval); 
    } else {
      setMessage("Time's up! Start over.");
      setScore(0);
      setTimeout(() => {
        startNewGame(); 
      }, 500);
    }
  }, [timer]);

  const startNewGame = () => {
    const correctColor = generateRandomColor();
    let options = new Set([correctColor]);

    while (options.size < 6) {
      options.add(generateRandomColor());
    }

    setTargetColor(correctColor);
    setColorOptions(shuffleArray([...options]));
    setMessage("Guess the correct color.");
    setTimer(10);
  };

  const shuffleArray = (array) => {
    return array.sort(() => Math.random() - 0.5);
  };

  const handleGuess = (color) => {
    if (color === targetColor) {
      setMessage("Correct!");
      setScore((prevScore) => prevScore + 1);
      setTimeout(() => {
        startNewGame();
      }, 500);
    } else {
      setMessage("Wrong! Start over.");
      setScore(0);
      setTimeout(() => {
        startNewGame();
      }, 500);
    }
  };

  const targetStyle = {
    width: "160px",
    height: "160px",
    backgroundColor: targetColor,
    margin: "2px auto",
    border: "5px solid white",
    borderRadius: "10%",
    boxShadow: "0 0 20px 5px rgb(255, 255, 255)",
  };

  return (
    <div className="container">
      <h2 className="instruction" data-testid="gameInstructions">{message}</h2>
      <h3 data-testid="timer" className="timer">Time Left: {timer}s</h3>
      <div
        data-testid="colorBox"
        style={targetStyle}
      ></div>
      <div className="hr-container">
        <div className="hr"></div>
      </div>

      <h3 data-testid="score" className="score">Score: {score}</h3>
       

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
              marginBottom: "1.5%",
              marginTop: "1.5%",
              cursor: "pointer",
              border: "5px solid grey",
              borderRadius: "10%",
            }}
          ></button>
        ))}
      </div>

      <button
        data-testid="newGameButton"
        onClick={() => {
          setScore(0);
          startNewGame();
        }}
        className="new-game"
      >
        New Game
      </button>
    </div>
  );
};

export default ColorGame;
