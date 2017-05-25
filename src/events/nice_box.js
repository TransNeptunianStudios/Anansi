import Phaser from 'phaser'

export default class NiceBox extends Phaser.Group{

    addSprites(width, height){
	var upper_left = this.create(0, 0, 'corner');
	upper_left.anchor.setTo(1);

	var upper = this.create(0, 0, 'straight');
	upper.anchor.setTo(0, 1);
	upper.width = width;

	var upper_right = this.create(width, 0, 'corner');
	upper_right.angle = 90
	upper_right.anchor.setTo(1, 1);

	var right = this.create(width, 0, 'straight');
	right.anchor.setTo(0, 1);
	right.angle = 90
	right.width = height;

	var low_left = this.create(0, height, 'corner');
	low_left.angle = -90
	low_left.anchor.setTo(1);

	var left = this.create(0, 0, 'straight');
	left.anchor.setTo(1, 1);
	left.angle = -90
	left.width = height;

	var lower = this.create(0, height, 'straight');
	lower.anchor.setTo(0, 1);
	lower.angle = 180
	lower.width = -width;

	var low_right = this.create(width, height, 'corner');
	low_right.angle = 180
	low_right.anchor.setTo(1, 1);
    }

    addGraphics(width, height){
	var graphics = this.game.add.graphics(0, 0);
	graphics.beginFill(0xFFFFFF);
	graphics.drawRect(0, 0, width, height);
	graphics.endFill();
	this.add(graphics)
    }

    constructor(game,width, height) {
	super(game)

	this.addGraphics(width, height)
	this.addSprites(width, height)
    }
}
