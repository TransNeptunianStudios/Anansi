import Phaser from 'phaser'
import StoryEvent from './story_event'

export default class NameEvent extends StoryEvent {
    constructor(game) {
	super(game)
    }

    start() {
	super.start()
	console.log("NameEvent - start")

	//input name logic...
	this.game.player.name = "Anders"

	this.game.input.onDown.addOnce(this.end, this)
    }
}
