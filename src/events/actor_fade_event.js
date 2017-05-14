import Phaser from 'phaser'
import StoryEvent from './story_event'

export default class ActorFadeEvent extends StoryEvent {
    constructor(game, key, position, direction) {
	super(game)
	this.key = key;
	this.position = position;
	this.direction = direction;
    }

    setup_actor(key, position){
	if ( position == "left"){
	    if(this.game.left_actor)
		this.game.left_actor.destroy()
	    this.game.left_actor = this.game.add.sprite(0, this.game.height, key)
	    this.actor = this.game.left_actor;
	}
	else if ( position == "right"){
	    if(this.game.right_actor)
		this.game.right_actor.destroy()
	    this.game.right_actor = this.game.add.sprite(this.game.width, this.game.height, key)
	    this.game.right_actor.scale.x *= -1;
	    this.actor = this.game.right_actor;
	}
	this.actor.anchor.setTo(0, 1)
    }

    create_tween(actor, direction){
	var fade_time = 1000;

	if (direction == "in"){
	    actor.alpha = 0;
	    this.tween = this.game.add.tween(actor).to( { alpha: 1 }, fade_time);
	}
	else if (direction == "out"){
	    actor.alpha = 1;
	    this.tween = this.game.add.tween(actor).to( { alpha: 0 }, fade_time);
	}
	this.tween.onComplete.addOnce(this.end, this);
    }

    start() {
	super.start()
	console.log("EnterEvent - start")

	this.setup_actor(this.key, this.position)
	this.create_tween(this.actor, this.direction)

	this.tween.start()
    }
}
