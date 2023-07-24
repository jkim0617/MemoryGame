import { useEffect } from 'react'
// import "./Card.css"



const Card = ({ cardData, id, flippedCards, setFlippedCards, score, setScore, openCards }) => {

  const flip = (id) => {
    if (openCards.includes(id)) {
      return 'flipped'
    } else {
      return 'unflipped'
    }
  }

  const handleClick = () => {
    if (flippedCards.length === 0) {
      setFlippedCards([id])
      setScore(score + 1)
    } else if (flippedCards.length === 1) {
      setFlippedCards([...flippedCards, id])
    }
  }

  return (
    <div
      className="cardContainer"
      onClick={handleClick}
    >
      <div className={flip(id)}>
        <p>{cardData.face}</p>
      </div>
    </div>
  )
}

export default Card