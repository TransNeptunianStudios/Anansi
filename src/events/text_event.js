import Phaser from 'phaser'
import StoryEvent from './story_event'
import TextBox from './text_box.js'
export default class TextEvent extends StoryEvent {
    constructor(game, text, origin) {
	super(game)
	this.text_box = new TextBox(game, 100, 100, text, 'none')
    }

    start() {
	super.start()
	console.log("TextEvent - start")

	this.game.input.onDown.addOnce(this.finish_printout, this)
    }

    finish_printout(){
	this.game.input.onDown.addOnce(this.end, this)
    }
}
