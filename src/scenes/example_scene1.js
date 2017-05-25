import Scene from '../scene'

import ExampleScene2 from './example_scene2'
import { ClickEvent,
	 WaitEvent,
	 TextEvent,
	 ActorFadeEvent,
	 SoundEvent,
	 QuestionEvent,
	 NameEvent} from '../events'

export default class ExampleScene1 extends Scene {
    constructor(game) {
	super(game, 'window')
    }

    getUp(){
	this.push_event(new TextEvent(this.game, "Du tar dig ur sängen och klär på dig."))
    }

    sleepIn(){
	this.push_event(new TextEvent(this.game, "Zzzz Zzzzz Zzz"))
	this.push_event(new TextEvent(this.game, "Frammåt lunch släpar du dig ur sänge."))
    }
    story() {
	super.story()

	console.log("ExampleScene1 - story")

	//this.push_event(new NameEvent(this.game))
	this.push_event(new TextEvent(this.game, "Zzzz Zzzzz Zzz"))
	this.push_event(new TextEvent(this.game, "Zzzz"))
	this.push_event(new SoundEvent(this.game, 'quack'))
	this.push_event(new TextEvent(this.game, "@name vaknar till av att något låter utanför."))

	var yes = new Phaser.Signal();
	var no = new Phaser.Signal();
	var choices = [{text: "Ja!", handle: yes}, {text: "Nä!", handle: no}];
	yes.addOnce(this.getUp, this);
	no.addOnce(this.sleepIn, this);
	this.push_event(new QuestionEvent(this.game, "Du är ganska trött, gå upp?", choices));


	this.successor = new ExampleScene2(this.game);

	this.run_events();
    }
}
