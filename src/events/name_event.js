import Phaser from 'phaser'
import StoryEvent from './story_event'
import PhaserInputPackage  from 'phaser-input'
const {PhaserInput} = PhaserInputPackage;  
export default class NameEvent extends StoryEvent {
	constructor(game) {
		super(game)
	}

	start() {
		super.start()
		console.log("NameEvent - start")
		var password = game.add.inputField(10, 90, {
			font: '18px Arial',
			fill: '#212121', 
			fontWeight: 'bold',
			width: 150,
			padding: 8,
			borderWidth: 1,
			borderColor: '#000',
			borderRadius: 6,
			placeHolder: "BULTEN",
			type: PhaserInput.InputType.password
		});
	
		this.game.player.name = "Anders"

		this.game.input.onDown.addOnce(this.end, this)
	}
}
