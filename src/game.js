/* globals __DEV__ */
import Phaser from 'phaser'
import Scene from './scene'

export default class extends Phaser.State {
    init () {
    }

    preload () {}

    create () {
	console.log("Game")
	var scene1 = new Scene(this.game, 'test-scene')

	scene1.start()
    }

    update () {
    }
}
