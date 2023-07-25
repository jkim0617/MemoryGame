import Card from "./Card";
import { useState, useEffect } from 'react';
import './App.css'

// make deck into a state


function App() {

  const [level, setLevel] = useState(1)
  const [bombCount, setBombCount] = useState(0)
  const [numOfPairs, setNumOfPairs] = useState(1)
  const [deck, setDeck] = useState(shuffleCards(deckGenerator()))
  const [flippedCards, setFlippedCards] = useState([])
  const [completeCards, setCompleteCards] = useState([])
  const [moves, setMoves] = useState(0)

  // determine level
  // useeffect => level

  // set num of bombs
  // set num of pairs
  const difficultySetter = () => {
    if (level === 1) {
      setNumOfPairs(2)
      setBombCount(0)
      setMoves(999)
    } else if (level < 4) {
      setNumOfPairs(numOfPairs + 1)
      setBombCount(0)
      setMoves(((level * 2) + 2) * 2)
    } else if (level < 8) {
      setNumOfPairs(numOfPairs + 1)
      setBombCount(1)
      setMoves(((level * 2) * 2))
    }
  }

  useEffect(difficultySetter, [level])

  // make deck
  // shuffle deck
  // generate cards
  function deckGenerator() {
    let newDeck = []
    for (let i = 0; i < bombCount; i++) {
      let map = {};
      map['face'] = 'BOMB';
      newDeck.push(map)
    }
    for (let i = 0; i < numOfPairs; i++) {
      let map = {};
      map['face'] = i;
      newDeck.push(map)
    }
    return newDeck
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
    return setDeck(shuffleCards(deckGenerator()))
  }

  useEffect(createDeck, [numOfPairs])

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

  // game logic
  // add level
  const isMatchingCards = () => {
    if (flippedCards.length === 2) {
      let index1 = flippedCards[0];
      let index2 = flippedCards[1];
      setMoves(moves - 1)
      if (moves === 0) {
        handleLevelLose()
      }
      if (
        deck[index1].face === deck[index2].face && index1 !== index2) {
        if (deck[index1].face === 'BOMB') {
          handleLevelLose()
        } else {
          setCompleteCards([...completeCards, ...flippedCards])
        }
      }
      setTimeout(() => { setFlippedCards([]) }, 500)
    }
  }

  useEffect(isMatchingCards, [flippedCards])

  const isLevelWin = () => (completeCards.length === (deck.length - bombCount * 2))

  const checkWin = () => {
    if (isLevelWin()) {
      alert("goodjob")
      handleLevelWin()
    }
  }

  useEffect(checkWin, [completeCards])

  const handleLevelLose = () => {
    alert('you lose')
    setLevel(1)
    setFlippedCards([])
    setCompleteCards([])
    setMoves(0)
  }

  const handleLevelWin = () => {
    setLevel(level + 1)
    setFlippedCards([])
    setCompleteCards([])
    setMoves(0)
  }
  // game over











  return (
    <div className="App">
      <div className="movesContainer">
        <p className="level">Level: {level}</p>
        <p className="moves">Moves: {moves}</p>
      </div>
      <div className="deckContainer">
        {cardLayout}
      </div>
    </div>
  );
}

export default App;
