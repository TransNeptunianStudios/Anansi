import Scene from './scene'

import WaitEvent from './wait_event'

export default class ExampleScene2 extends Scene {
    constructor(game) {
	super(game, 'duck_pond')
    }

    story() {
	super.story()

	console.log("ExampleScene2 - story")

	this.push_event(new WaitEvent(this.game, 5))

	//this.successor = new ExampleScene2(this.game);

	this.run_events();

    }
}
