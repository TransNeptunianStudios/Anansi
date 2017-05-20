import Phaser from 'phaser'
import StoryEvent from './story_event'
import TextBox from './text_box.js'

export default class QuestionEvent extends StoryEvent {
    constructor(game, text, choices) {
	super(game)
	this.text = text;
	this.choices = choices
    }

    start() {
	super.start()
	console.log("TextEvent - start")
	this.text_box = new TextBox(game, game.width*0.1,
				    game.height*0.75, this.text);
	// this.text_box.addChoices(this.choices)

	this.text_box.finished.addOnce(this.end, this);
    }

    end(){
	super.end();
    }
}
