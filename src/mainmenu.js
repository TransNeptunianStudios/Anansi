import Phaser from 'phaser'

export default class extends Phaser.State {
    init () {
	this.stage.backgroundColor = '#FFFFFF'
    }

    create () {
	this.game.camera.flash('#FFFFFF')

	game.add.sprite(0,0, 'window');

	var title_style = { font: "bold 32px Arial", fill: "#000"};
	var note_style = { font: "bold 15px Arial", fill: "#000"};

	var title = game.add.text(game.world.centerX,
				  100,
				  "Anansi - A game engine for storytelling",
				  title_style);
	title.anchor.setTo(0.5)


	var note = game.add.text(game.world.centerX, game.world.height-50, "(Click to start)", note_style);
	note.anchor.setTo(0.5)

	this.game.input.onDown.add(()=>{
	    this.state.start('Game');
	}, this)
	console.log("MainMenu")
    }

    update() {
    }
}
