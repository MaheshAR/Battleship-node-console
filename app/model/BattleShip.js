class BattleShip {
	constructor({ name, code, length }) {
		this.name = name;
		this.code = code;
		this.length = length;
	}

	sinkShip(size = 1) {
		this.length -= size;
	}

	isSinked() {
		return this.length <= 0;
	}
}

module.exports = BattleShip;