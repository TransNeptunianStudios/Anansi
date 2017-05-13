import Phaser from 'phaser'
import StoryEvent from './story_event'

export default class EnterEvent extends StoryEvent {
    constructor(game, key, side, enter_type) {
	super(game)
	this.side = side;
	if(side == 'left'){
	    this.sprite = game.add.sprite(0, game.height, key)
	    this.sprite.anchor.setTo(0, 1)
	    this.tween = game.add.tween(this.sprite).from( { x: -this.sprite.width }, 1000);
	}
	else if (side == 'right'){
	    this.sprite = game.add.this.sprite(game.width, game.height, key)
	    this.sprite.anchor.setTo(1, 1)
	}
	this.sprite.alpha = 0;
    }

    start() {
	super.start()
	console.log("EnterEvent - start")
	this.sprite.alpha = 1
	this.tween.start()
	this.tween.onComplete.addOnce(this.end, this);
    }
}
