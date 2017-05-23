/* globals __DEV__ */
import Phaser from 'phaser'

import Scene from './scene'
import Player from './player'

import ExampleScene1 from './scenes/example_scene1'
import ExampleScene2 from './scenes/example_scene2'

export default class extends Phaser.State {
    init () {
    }

    preload () {}

    the_end(){
	console.log("THE END")
    }

    next_scene(){
	var next_scene = this.curr_scene.successor;
	delete this.curr_scene

	if(!next_scene){
	    this.the_end()
	    return
	}

	this.curr_scene = next_scene
	this.curr_scene.onComplete.addOnce(this.next_scene, this)
	this.curr_scene.start()
    }

    create () {
	console.log("Game")
	this.game.player = new Player("[player name]")

	this.curr_scene = new ExampleScene1(this.game)
	this.curr_scene.onComplete.addOnce(this.next_scene, this)
	this.curr_scene.start()
    }

    update () {
    }
}
