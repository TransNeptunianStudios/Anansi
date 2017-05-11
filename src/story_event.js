import Phaser from 'phaser'

export default class StoryEvent {
    constructor(game) {
	this.game = game
	this.onComplete = new Phaser.Signal()
    }

    start() {
	console.log("Event - start")
    }

    end(){
	console.log("Event - end")
	this.onComplete.dispatch()
    }

    update() {
    }
}
