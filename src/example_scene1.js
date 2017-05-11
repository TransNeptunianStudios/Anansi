import Scene from './scene'

import ExampleScene2 from './example_scene2'
import ClickEvent from './click_event.js'

export default class ExampleScene1 extends Scene {
    constructor(game) {
	super(game, 'window')
    }

    story() {
	super.story()

	console.log("ExampleScene1 - story")

	this.push_event(new ClickEvent(this.game))

	this.successor = new ExampleScene2(this.game);

	this.run_events();
    }
}
