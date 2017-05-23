import Phaser from 'phaser'
import StoryEvent from './story_event'
import PhaserInputPackage  from 'phaser-input'

const {PhaserInput} = PhaserInputPackage;

export default class NameEvent extends StoryEvent {
    constructor(game) {
	super(game)
    }

    accept(){
	this.inputBox.endFocus();
	this.game.player.name = this.inputBox.value;
	this.inputBox.destroy()
	this.end();
    }

    start() {
	super.start()
	console.log("NameEvent - start")
	this.inputBox = game.add.inputField(this.game.world.centerX, game.world.centerY, {
	    font: '30px Arial',
	    fill: '#212121',
	    fontWeight: 'bold',
	    width: 200,
	    padding: 8,
	    borderWidth: 1,
	    borderColor: '#000',
	    borderRadius: 6,
	    placeHolder: "KissOchBajs",
	    type: PhaserInput.InputType.text
	});
	this.inputBox.x -= this.inputBox.width/2;
        this.inputBox.blockInput = false;
        this.inputBox.startFocus();

        this.game.input.keyboard.addKey(Phaser.Keyboard.ENTER)
	    .onDown.addOnce(this.accept, this);

    }
}
