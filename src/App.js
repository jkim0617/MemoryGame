import Card from "./Card";
import { useState, useEffect } from 'react';
import './App.css'

const uniqueCards = [
  {
    face: 1
  },
  {
    face: 2
  },
  {
    face: 3
  },
  {
    face: 4
  },
  {
    face: 6
  },
  {
    face: 7
  },
  {
    face: 8
  },
  {
    face: 9
  },
  {
    face: 10
  },
  {
    face: 11
  }
]

const shuffleCards = (deck) => {
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = deck[i]
    deck[i] = deck[j];
    deck[j] = temp;
  }
  return deck;
}
let deck = shuffleCards([...uniqueCards, ...uniqueCards])


function App() {
  const [flippedCards, setFlippedCards] = useState([])
  const [completeCards, setCompleteCards] = useState([])
  const [openCards, setOpenCards] = useState([])
  const [score, setScore] = useState(0)
  const [highScore, setHighScore] = useState()

  const cardLayout = deck.map((cardInfo, index) => {
    return <Card
      cardData={cardInfo}
      key={index}
      id={index}
      flippedCards={flippedCards}
      setFlippedCards={setFlippedCards}
      score={score}
      setScore={setScore}
      openCards={openCards}
    />;
  })

  const handleReset = () => {
    setFlippedCards([])
    setCompleteCards([])
    if (!highScore) {
      setHighScore(score)
    } else {
      setHighScore(Math.min(score, highScore))
    }
    setScore(0)
    shuffleCards(deck)
  }

  const checker = () => {
    if (flippedCards.length === 2) {
      let index1 = flippedCards[0];
      let index2 = flippedCards[1];
      if (
        deck[index1].face === deck[index2].face &&
        index1 !== index2 &&
        !completeCards.includes(index1)) {
        console.log('match')
        setCompleteCards([...completeCards, ...flippedCards])
      }
      setTimeout(() => { setFlippedCards([]) }, 500)
    }
  }

  const checkWin = () => {
    if (completeCards.length === deck.length) {
      alert("goodjob")
      handleReset()
    }
    console.log('completed', completeCards)
  }

  const updateOpen = () => {
    setOpenCards([...completeCards, ...flippedCards])
  }

  useEffect(checkWin, [completeCards])
  useEffect(checker, [flippedCards])
  useEffect(updateOpen, [flippedCards])


  return (
    <div className="App">
      {/* <button onClick={handleReset}>reset</button> */}
      <div className="scoreContainer">
        <p className="score">Turns: {score}</p>
        <p className="highScore">Record: {highScore}</p>
      </div>
      <div className="deckContainer">
        {cardLayout}
      </div>
    </div>
  );
}

export default App;
