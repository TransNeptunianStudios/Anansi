import Scene from '../scene'
import ExampleScene1 from './example_scene1'

import { ClickEvent,
	 WaitEvent,
	 TextEvent,
	 ActorFadeEvent,
	 SoundEvent,
	 QuestionEvent } from '../events'

export default class ExampleScene2 extends Scene {
    constructor(game) {
	super(game, 'duck_pond')
    }

    story() {
	super.story()

	console.log("ExampleScene2 - story")

	this.push_event(new TextEvent(this.game, "Två änder har ett fasligt bråk..."))

	this.push_event(new SoundEvent(this.game, 'quack'))
	this.push_event(new ActorFadeEvent(this.game, 'duck1', 'left', 'in'))
	this.push_event(new TextEvent(this.game, "HÖRRE DU DU!", "Duckzen"))

	this.push_event(new SoundEvent(this.game, 'quack'))
	this.push_event(new ActorFadeEvent(this.game, 'duck1', 'right', 'in'))
	this.push_event(new TextEvent(this.game, "EH! DU SNACKAR!!", "Duckzens bror"))

	this.push_event(new TextEvent(this.game, "Vad dom bråkar om är oklart, men det är tydligt att de snart blir slagsmål!"))
	this.push_event(new QuestionEvent(this.game, "Bryta isär dem innan nån skadar sig?"));

	this.successor = new ExampleScene1(this.game);

	this.run_events();

    }
}
