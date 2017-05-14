import Scene from '../scene'
import ExampleScene1 from './example_scene1'

import { ClickEvent } from '../events'
import { TextEvent} from '../events';
import { ActorFadeEvent} from '../events';
import { SoundEvent} from '../events';

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

	this.push_event(new SoundEvent(this.game, 'quack'))
	this.push_event(new ActorFadeEvent(this.game, 'duck1', 'left', 'in'))

	this.push_event(new TextEvent(this.game, "*badom-tish*"))
	this.push_event(new ActorFadeEvent(this.game, 'duck1', 'left', 'out'))

	this.push_event(new ActorFadeEvent(this.game, 'duck1', 'right', 'in'))
	this.push_event(new TextEvent(this.game, "Lorem ipsum dolor sit amet, soleat voluptua ne sed, electram"));
	this.push_event(new TextEvent(this.game," quo ne utroque suavitate urbanitas. Mea ubique patrioque at."));
	this.push_event(new ActorFadeEvent(this.game, 'duck1', 'right', 'out'))

	this.reverse_events()
	this.successor = new ExampleScene1(this.game);

	this.run_events();

    }
}
