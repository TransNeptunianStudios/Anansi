import Scene from '../scene'

import ExampleScene2 from './example_scene2'
import { ClickEvent } from '../events'
import { SoundEvent } from '../events'
import { TextEvent } from '../events'
import { QuestionEvent } from '../events'

export default class ExampleScene1 extends Scene {
    constructor(game) {
	super(game, 'window')
    }

    story() {
	super.story()

	console.log("ExampleScene1 - story")

	var yes = new Phaser.Signal();
	var no = new Phaser.Signal();

	var choices = [{text: "Ja!", handle: yes}, {text: "Nä!", handle: no}];
	this.push_event(new QuestionEvent(this.game, "Gå upp ur sängen?", choices));

	this.push_event(new TextEvent(this.game, "HÖRRE DU DU!", "Duckzen"))

	this.push_event(new TextEvent(this.game, "Det va en tidig morgon i maj, solen lyste varmt in i köket."))
	this.push_event(new TextEvent(this.game, "Friden stördes av ett ljud utifrån..."))
	this.push_event(new SoundEvent(this.game, 'quack'))
	this.push_event(new TextEvent(this.game, "Du sticker ut huvudet och tittar varifrån det märkliga ljudet kom ifrån"))

	this.successor = new ExampleScene2(this.game);

	this.run_events();
    }
}
