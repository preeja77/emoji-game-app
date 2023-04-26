/* 
Quick Tip 

- Use the below function in the EmojiGame Component to shuffle the emojisList every time when an emoji is clicked.

const shuffledEmojisList = () => {
  const {emojisList} = this.props
  return emojisList.sort(() => Math.random() - 0.5)
}

*/

// Write your code here.
import {Component} from 'react'

import './index.css'

import NavBar from '../NavBar'
import EmojiCard from '../EmojiCard'
import WinOrLoseCard from '../WinOrLoseCard'

class EmojiGame extends Component {
  state = {
    topScore: 0,
    isGameInProgress: true,
    clickedEmojisList: [],
  }

  resetGame = () => {
    this.setState({
      clickedEmojisList: [],
      isGameInProgress: true,
    })
  }

  renderWinOrLoseCard = () => {
    const {emojisList} = this.props
    const {clickedEmojisList} = this.state
    const isWon = emojisList.length === clickedEmojisList.length

    return (
      <WinOrLoseCard
        score={clickedEmojisList.length}
        isWon={isWon}
        onClickPlayAgain={this.resetGame}
      />
    )
  }

  getFinishAndScore = emojisListLength => {
    const {topScore} = this.state

    let newScore = topScore

    if (emojisListLength > topScore) {
      newScore = emojisListLength
    }
    this.setState({
      topScore: newScore,
      isGameInProgress: false,
    })
  }

  clickEmoji = id => {
    const {emojisList} = this.props
    const {clickedEmojisList} = this.state
    const clickedEmojisListId = clickedEmojisList.includes(id)
    const emojisListLength = clickedEmojisList.length

    if (clickedEmojisListId) {
      this.getFinishAndScore(emojisListLength)
    } else {
      if (emojisList.length - 1 === emojisListLength) {
        this.getFinishAndScore(emojisListLength)
      }
      this.setState(prevState => ({
        clickedEmojisList: [...prevState.clickedEmojisList, id],
      }))
    }
  }

  getShuffledEmojisList = () => {
    const {emojisList} = this.props
    return emojisList.sort(() => Math.random() - 0.5)
  }

  renderEmojiGame = () => {
    const shuffledEmojisList = this.getShuffledEmojisList()

    return (
      <ul className="emojis-list-container">
        {shuffledEmojisList.map(eachEmoji => (
          <EmojiCard
            emojiDetails={eachEmoji}
            key={eachEmoji.id}
            clickEmoji={this.clickEmoji}
          />
        ))}
      </ul>
    )
  }

  render() {
    const {clickedEmojisList, topScore, isGameInProgress} = this.state
    return (
      <div className="app-container">
        <NavBar
          score={clickedEmojisList.length}
          topScore={topScore}
          isGameInProgress={isGameInProgress}
        />
        <div className="emoji-game-body">
          {isGameInProgress
            ? this.renderEmojiGame()
            : this.renderWinOrLoseCard()}
        </div>
      </div>
    )
  }
}
export default EmojiGame
