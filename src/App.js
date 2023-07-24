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



// make deck into a state


function App() {
  const shuffleCards = (stack) => {
    stack = [...stack, ...stack]
    for (let i = stack.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = stack[i]
      stack[i] = stack[j];
      stack[j] = temp;
    }
    return stack;
  }
  const [flippedCards, setFlippedCards] = useState([])
  const [completeCards, setCompleteCards] = useState([])
  const [score, setScore] = useState(0)
  const [highScore, setHighScore] = useState(0)
  const [deck, setDeck] = useState(shuffleCards(uniqueCards))



  const cardLayout = deck.map((cardInfo, index) => {
    return <Card
      cardData={cardInfo}
      key={'card' + index}
      id={index}
      flippedCards={flippedCards}
      setFlippedCards={setFlippedCards}
      completeCards={completeCards}
    />;
  })

  const handleReset = () => {
    setFlippedCards([])
    setCompleteCards([])
    if (highScore === 0) {
      setHighScore(score)
    } else {
      setHighScore(Math.min(score, highScore))
    }
    setScore(0)
    setDeck(shuffleCards(uniqueCards))
  }

  const checker = () => {
    if (flippedCards.length === 2) {
      let index1 = flippedCards[0];
      let index2 = flippedCards[1];
      setScore(score + 1)
      if (
        deck[index1].face === deck[index2].face &&
        index1 !== index2) {
        console.log('match')
        setCompleteCards([...completeCards, ...flippedCards])
      }
      setTimeout(() => { setFlippedCards([]) }, 500)
    }
  }

  const isGameover = () => (completeCards.length === deck.length)

  const checkWin = () => {
    if (isGameover()) {
      alert("goodjob")
      handleReset()
    }
    console.log('completed', completeCards)
  }

  useEffect(checkWin, [completeCards])
  useEffect(checker, [flippedCards])


  return (
    <div className="App">
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
