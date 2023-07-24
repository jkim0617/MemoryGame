import { useEffect } from 'react'
// import "./Card.css"



const Card = ({ cardData, id, flippedCards, setFlippedCards, completeCards }) => {

  const flip = (id) => {
    if (flippedCards.includes(id) || completeCards.includes(id)) {
      return 'flipped'
    } else {
      return 'unflipped'
    }
  }

  const handleClick = () => {
    if (!completeCards.includes(id)) {
      if (flippedCards.length === 0) {
        setFlippedCards([id])
      } else if (flippedCards.length === 1) {
        setFlippedCards([...flippedCards, id])
      }
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