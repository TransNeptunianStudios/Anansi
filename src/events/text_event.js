import Phaser from 'phaser'
import StoryEvent from './story_event'
import TextBox from './text_box2.js'

export default class TextEvent extends StoryEvent {
    constructor(game, text, origin) {
	super(game)
	this.text = text;
	this.origin = origin
    }

    start() {
	super.start()
	console.log("TextEvent - start")
	var text_box = new TextBox(game, game.width*0.03, game.height*0.75, this.text, this.origin)
	text_box.finished.addOnce(this.end, this);
	this.game.add.existing(text_box)
    }

    end(){
	super.end();
    }
}
