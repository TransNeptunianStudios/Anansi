import Phaser from 'phaser'
import StoryEvent from './story_event'

export default class ClickEvent extends StoryEvent {
    constructor(game) {
	super(game)
    }

    start() {
	super.start()
	console.log("ClickEvent - start")

	this.game.input.onDown.addOnce(this.end, this)
    }
}
