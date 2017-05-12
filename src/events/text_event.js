import Phaser from 'phaser'
import StoryEvent from './story_event'
import TextBox from './text_box.js'
export default class TextEvent extends StoryEvent {
    constructor(game, text, origin) {
	super(game)
	this.text = text;
	this.finished = new Phaser.Signal()
    }

    start() {
	super.start()
	console.log("TextEvent - start")
	this.text_box = new TextBox(game, 100, 100, this.text)
	this.game.input.onDown.addOnce(this.finish_printout, this)
    }



    finish_printout(){
	if (this.text_box.finished())
	    this.end();
	else{
	    this.text_box.finish();
	    this.game.input.onDown.addOnce(this.end, this)
	}
    }

    end(){
	super.end()
	this.text_box.text.destroy()
    }
}
