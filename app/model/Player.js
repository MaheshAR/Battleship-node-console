const BattleField = require('./BattleField');
const Board = require('./Board');

class Player extends BattleField {
	constructor({ name, positions }) {
		super(positions);

		this.name = name;
		this.status = '';
	}

	fire(enemy, pos) {
		const [row, col] = Board.getpos(pos);
		const cellCode = enemy.board1.getCell(row, col);
		const ship = BattleField.getShipByCode(enemy.ships, cellCode)

		if (ship) {
			console.log('You hit!');

			this.board2.updateCell(row, col, 'XX');
			enemy.board1.updateCell(row, col, 'XX');
			ship.sinkShip();

			if (ship.isSinked()) {
				console.log(`You destroyed ${ship.name}`);
			}
		}
		else {
			console.log('You missed!');

			this.board2.updateCell(row, col, '00');
			enemy.board1.updateCell(row, col, '00');
		}
	}

	isGame(enemy) {
		if (BattleField.areAllShipsSinked(enemy.ships)) {
			this.status = 'Won';
			enemy.status = 'Lose';

			return true;
		}

		return false;
	}
}

module.exports = Player;