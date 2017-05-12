import Scene from '../scene'

import { TextEvent} from '../events';

export default class ExampleScene2 extends Scene {
    constructor(game) {
	super(game, 'duck_pond')
    }

    story() {
	super.story()

	console.log("ExampleScene2 - story")

	this.push_event(new TextEvent(this.game, "De va en gång..."))
	this.push_event(new TextEvent(this.game, "...och den va sandad. "))
	this.push_event(new TextEvent(this.game, "*badom-tish*"))
	this.push_event(new TextEvent(this.game, "Lorem ipsum dolor sit amet, soleat voluptua ne sed, electram convenire suavitate ius ad, tacimates percipitur ex vis. At porro inani numquam eam, nam eu quem illud ancillae, quo ne utroque suavitate urbanitas. Mea ubique patrioque at."))

	this.reverse_events()
	//this.successor = new ExampleScene2(this.game);

	this.run_events();

    }
}
