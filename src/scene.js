import Phaser from 'phaser'

export default class Scene {
    constructor(game, background) {
	this.game = game
	this.background = background
	this.onComplete = new Phaser.Signal()
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

    update() {
    }
}
