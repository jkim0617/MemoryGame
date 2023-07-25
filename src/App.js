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

  const [flippedCards, setFlippedCards] = useState([])
  const [completeCards, setCompleteCards] = useState([])
  const [score, setScore] = useState(0)
  const [bombCount, setBombCount] = useState(0)
  const [highScore, setHighScore] = useState(0)
  const [numOfPairs, setNumOfPairs] = useState(2)
  const [deck, setDeck] = useState(createDeck())
  const [level, setLevel] = useState(1)


  function deckGenerator() {
    let deck = []
    for (let i = 0; i < bombCount; i++) {
      let map = {};
      map['face'] = 'BOMB';
      deck.push(map)
    }
    for (let i = 0; i < numOfPairs; i++) {
      let map = {};
      map['face'] = i;
      deck.push(map)
    }
    return deck
  }

  function shuffleCards(stack) {
    stack = [...stack, ...stack]
    for (let i = stack.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = stack[i]
      stack[i] = stack[j];
      stack[j] = temp;
    }
    return stack;
  }

  function createDeck() {
    return shuffleCards(deckGenerator())
  }

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

  const difficultySetter = () => {
    if (level < 4) {
      setNumOfPairs(numOfPairs + 2)
      setBombCount(1)
    } else if (level < 8) {
      setNumOfPairs(numOfPairs + 1)
      setBombCount(3)
    }

  }

  const handleReset = () => {
    setFlippedCards([])
    setCompleteCards([])
    if (highScore === 0) {
      setHighScore(score)
    } else {
      setHighScore(Math.min(score, highScore))
    }
    setScore(0)
    difficultySetter()
  }

  useEffect(() => {
    return createDeck
  }, [numOfPairs])


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

  const isGameover = () => (completeCards.length === (deck.length - bombCount * 2))

  const checkWin = () => {
    if (isGameover()) {
      alert("goodjob")
      setLevel(level + 1)
      handleReset()
    }
    console.log('completed', completeCards)
  }

  useEffect(checkWin, [completeCards])
  useEffect(checker, [flippedCards])


  return (
    <div className="App">
      <div className="scoreContainer">
        <p className="level">Level: {level}</p>
        <p className="score">Turns: {score}</p>
        {/* <p className="highScore">Record: {highScore}</p> */}
      </div>
      <div className="deckContainer">
        {cardLayout}
      </div>
    </div>
  );
}

export default App;
