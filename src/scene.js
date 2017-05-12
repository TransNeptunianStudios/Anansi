import Phaser from 'phaser'

export default class Scene {
    constructor(game, background) {
	this.game = game
	this.background = background
	this.onComplete = new Phaser.Signal()

	this.events = []
	this.curr_event = null;
    }

    push_event(event){
	this.events.push(event)
    }

    pop_event(){
	return this.events.pop()
    }

    reverse_events(){
	this.events.reverse()
    }

    run_events(){
	if (this.events.length == 0)
	    this.end()
	else{
	    this.curr_event = this.pop_event()
	    this.curr_event.onComplete.addOnce(this.run_events,
					       this)
	    this.curr_event.start();
	}
    }

    start() {
	console.log("Scene - start")

	this.game.add.sprite(0, 0, this.background)
	this.game.camera.onFlashComplete.addOnce(this.story, this)
	this.game.camera.flash('#000000')
    }

    story() {
	console.log("Scene - story")
	// implemented in derived class
    }

    end()
    {
	console.log("Scene - end")
	this.game.camera.onFadeComplete.addOnce(()=>{
	    this.onComplete.dispatch()
	}, this)

	this.game.camera.fade(0x000000);
    }
}
