import Phaser from 'phaser'
import StoryEvent from './story_event'
import TextBox from './text_box.js'

export default class TextEvent extends StoryEvent {
    constructor(game, text, origin) {
	super(game)
	this.text = text;
	this.origin = origin
    }

    start() {
	super.start()
	console.log("TextEvent - start")
	this.text_box = new TextBox(game, game.width*0.03, game.height*0.75, this.text, this.origin)
	this.text_box.finished.addOnce(this.end, this);
    }

    end(){
	super.end();
    }
}
