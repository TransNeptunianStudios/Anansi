import Scene from '../scene'

import { TextEvent} from '../events';

export default class ExampleScene2 extends Scene {
    constructor(game) {
	super(game, 'duck_pond')
    }

    story() {
	super.story()

	console.log("ExampleScene2 - story")

	this.push_event(new TextEvent(this.game, "De va en dag för länge sen..."))

	//this.successor = new ExampleScene2(this.game);

	this.run_events();

    }
}
