const Board = require('./Board');
const BattleShip = require('./BattleShip');
const config = require('../config');

const AXIS = {
	horizontal: 0,
	vertical: 1
};

class BattleField {
	constructor(positions) {
		this.board1 = new Board(10, 10);
		this.board2 = new Board(10, 10);
		this.ships = config.ships.map(ship => new BattleShip(ship));

		this.setPositions(positions);
	}

	setPositions(positions) {
		for (const key in positions) {
			const [pos, axis] = positions[key].split(',');
			const [row, col] = Board.getpos(pos);
			const { code, length } = BattleField.getShipByCode(this.ships, key);

			if (+axis === AXIS.vertical) {
				this.board1.updateRowForCol(row, col, row + length, code)
			}
			else {
				this.board1.updateColForRow(row, col, col + length, code);
			}
		}
	}

	printField() {
		this.board1.print();
		this.board2.print();
	}

	static getShipByCode(ships, code) {
		return ships.find(ship => ship.code === code);
	}

	static areAllShipsSinked(ships) {
		return ships.every(ship => ship.length <= 0);
	}
}

module.exports = BattleField;