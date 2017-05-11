import Scene from './scene'

export default class ExampleScene2 extends Scene {
    constructor(game) {
	super(game, 'duck_pond')
    }

    story() {
	super.story()

	console.log("ExampleScene2 - story")

	//this.successor = new ExampleScene2(this.game);

	this.end()
    }
}
