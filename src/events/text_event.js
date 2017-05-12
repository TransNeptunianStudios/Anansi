import Phaser from 'phaser'
import StoryEvent from './story_event'
import TextBox from './text_box.js'
export default class TextEvent extends StoryEvent {
    constructor(game, text, origin) {
	super(game)
	this.text = text;
	this.speed = 300
    }

    start() {
	super.start()
	console.log("TextEvent - start")
	this.text_box = new TextBox(game, game.width*0.03, game.height*0.75, this.text)
	var fadeInTween = this.game.add.tween(this.text_box.graphics).to({alpha: 1}, this.speed, Phaser.Easing.Linear.None, true)
	fadeInTween.onComplete.addOnce(() => { 	this.game.input.onDown.addOnce(this.finish_printout, this) }, this);
	fadeInTween.onComplete.addOnce(() => { this.text_box.runText();  }, this);
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
	var fadeOutTween = this.game.add.tween(this.text_box.graphics).to({alpha: 0}, this.speed, Phaser.Easing.Linear.None, true)
	var fadeOutTween = this.game.add.tween(this.text_box.text).to({alpha: 0}, this.speed, Phaser.Easing.Linear.None, true)
	fadeOutTween.onComplete.addOnce(() => { this.text_box.text.destroy();	super.end(); }, this);
    }
}
