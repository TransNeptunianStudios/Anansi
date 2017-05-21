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
	var text_box = new TextBox(game,
				    this.text,
				    null,
				    this.choices)

	text_box.finished.addOnce(this.end, this);
	this.game.add.existing(text_box)
    }

    end(){
	super.end();
    }
}
