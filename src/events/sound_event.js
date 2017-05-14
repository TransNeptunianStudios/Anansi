import Phaser from 'phaser'
import StoryEvent from './story_event'

export default class SoundEvent extends StoryEvent {
    constructor(game, key) {
	super(game)

	this.sound = game.add.audio(key);
    }

    start() {
	super.start()
	console.log("ClickEvent - start")
	this.sound.play()
	this.sound.onStop.addOnce(this.end, this);
    }
}
