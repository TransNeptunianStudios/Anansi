import Phaser from 'phaser'

export default class Scene {
    constructor(game, background) {
	this.game = game
	this.background = background
	this.onLevelComplete = new Phaser.Signal()
    }

    add_sprite(key, x, y) {
	var sprite = game.add.sprite(x, y, key);
	sprite.anchor.setTo(0)
	return sprite
    }

    start() {
	this.add_sprite(this.background, 0, 0)

	this.game.camera.onFlashComplete.addOnce(()=>{
	    	this.onLevelComplete.dispatch()
	}, this)

	this.game.camera.flash('#000000')
    }

    update() {
    }
}
