import Phaser from 'phaser'
import StoryEvent from './story_event'

export default class WaitEvent extends StoryEvent {
    constructor(game, time) {
	super(game)
	this.time = time
    }

    start() {
	super.start()
	console.log("WaitEvent - start")

	this.game.time.events.add(
	    Phaser.Timer.SECOND * this.time,
	    this.end,
	    this);

    }
}
