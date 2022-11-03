function Pizza(size, topping = []) {
	this.size = size;
	this.dough = Pizza.DOUGHT.THIN;
	this.topping = [...topping];
}

Pizza.SIZE = {
	SIZE_SMALL: {
		name: 'small',
		price: 50,
		ccal: 20,
	},
	SIZE_MEDIUM: {
		name: 'medium',
		price: 75,
		ccal: 30,
	},
	SIZE_LARGE: {
		name: 'large',
		price: 100,
		ccal: 40,
	}
}

Pizza.DOUGHT = {
	THIN: {
		name: 'thin (default)',
		price: 0,
		ccal: 0,
	},
	THICK: {
		name: 'thick',
		price: 0,
		ccal: 10,
	}
}

Pizza.TOPPING = {
	TOPPING_CHEESE: {
		name: 'cheese',
		price: 10,
		ccal: 20,
	},
	TOPPING_SAUSAGE: {
		name: 'sausage',
		price: 20,
		ccal: 5,
	},
	TOPPING_ANANAS: {
		name: 'ananas',
		price: 15,
		ccal: 5,
	},
	TOPPING_PEPPER: {
		name: 'pepper',
		price: 15,
		ccal: 0,
	},
	TOPPING_SAUCE: {
		name: 'sause',
		price: 20,
		ccal: 5,
	}
}

Pizza.prototype.addTopping = function (name) {
	return this.topping.push(name);
}

Pizza.prototype.changeDough = function (name) {
	if (name == 'THICK') {
		return this.dough = Pizza.DOUGHT.THICK;
	} else if (name == 'THIN') {
		return this.dough = Pizza.DOUGHT.THIN;
	}
}

Pizza.prototype.getPrice = function () {
	if (Array.isArray([...this.topping]) && [...this.topping].length != 0) {
		let toppingPriceArr = [];
		[...this.topping].map((el) => {
			toppingPriceArr.push(el.price);
		});
		let toppingPrice = toppingPriceArr.reduce((prev, curr) => prev + curr);
		let finalPrice = this.size.price + this.dough.price + toppingPrice + ` y.e.`;
		return finalPrice;
	} else {
		let finalPrice = this.size.price + this.dough.price + ` y.e. (no topping)`;
		return finalPrice;
	}
}

Pizza.prototype.getCallories = function () {
	if (Array.isArray([...this.topping]) && [...this.topping].length != 0) {
		let pizzaCaloriesArr = [];
		[...this.topping].map((el) => {
			pizzaCaloriesArr.push(el.ccal);
		});
		let caloriesSum = pizzaCaloriesArr.reduce((prev, curr) => prev + curr);
		let finalCaloriesSum = this.size.ccal + this.dough.ccal + caloriesSum + ` ccal`;
		return finalCaloriesSum;
	} else {
		let finalCaloriesSum = this.size.ccal + this.dough.ccal + ` ccal (no topping)`;
		return finalCaloriesSum;
	}
}

const pizza = new Pizza(Pizza.SIZE.SIZE_SMALL, [Pizza.TOPPING.TOPPING_SAUSAGE, Pizza.TOPPING.TOPPING_CHEESE]);
console.log(pizza);
//pizza.changeDough('THICK');
//pizza.addTopping(Pizza.TOPPING.TOPPING_ANANAS);
//pizza.addTopping(Pizza.TOPPING.TOPPING_SAUCE);
console.log('Total price: ' + pizza.getPrice());
console.log('Total callories: ' + pizza.getCallories());