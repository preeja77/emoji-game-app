// Write your code here.
import './index.css'

const WinOrLoseCard = props => {
  const {isWon, score, onClickPlayAgain} = props
  const isScoreLabel = isWon ? 'You Won' : 'You Lose'
  const scoreGame = isWon ? 'Best Score' : 'Score'
  const imageToPlace = isWon
    ? 'https://assets.ccbp.in/frontend/react-js/won-game-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/lose-game-img.png'

  return (
    <div className="win-or-lose-card">
      <div className="details-section">
        <h1 className="game-status">{isScoreLabel}</h1>
        <p className="current-score-label">{scoreGame}</p>
        <p className="current-score-value">{score} /12</p>
        <button
          type="button"
          onClick={onClickPlayAgain}
          className="play-again-button"
        >
          Play Again
        </button>
      </div>
      <img src={imageToPlace} alt="gameEnd" />
    </div>
  )
}

export default WinOrLoseCard
