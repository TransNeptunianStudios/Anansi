import Scene from '../scene'
import ExampleScene1 from './example_scene1'

import { ClickEvent } from '../events'
import { TextEvent} from '../events';
import { EnterEvent} from '../events';

export default class ExampleScene2 extends Scene {
    constructor(game) {
	super(game, 'duck_pond')
    }

    story() {
	super.story()

	console.log("ExampleScene2 - story")

	this.push_event(new ClickEvent(this.game))
	this.push_event(new TextEvent(this.game, "De va en gång..."))
	this.push_event(new TextEvent(this.game, "...och den va sandad. "))

	this.push_event(new EnterEvent(this.game, 'duck1', 'left', 'slide'))

	this.push_event(new TextEvent(this.game, "*badom-tish*"))
	this.push_event(new TextEvent(this.game, "Lorem ipsum dolor sit amet, soleat voluptua ne sed, electram"));
	this.push_event(new TextEvent(this.game,"convenire suavitate ius ad, tacimates percipitur ex vis. At porro inani numquam eam, nam eu quem illud ancillae"));
	this.push_event(new TextEvent(this.game," quo ne utroque suavitate urbanitas. Mea ubique patrioque at."));

	this.reverse_events()
	this.successor = new ExampleScene1(this.game);

	this.run_events();

    }
}
