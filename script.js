class Pizza {
	constructor(size, topping = []) {
		this.size = size;
		this.dough = Pizza.DOUGHT.THIN;
		this.topping = [...topping];
	}
	static SIZE = {
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
	static DOUGHT = {
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
	static TOPPING = {
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

	addTopping(name) {
		return this.topping.push(name);
	}

	changeDough(name) {
		if (name == 'THICK') {
			return this.dough = Pizza.DOUGHT.THICK;
		} else if (name == 'THIN') {
			return this.dough = Pizza.DOUGHT.THIN;
		}
	}

	getPrice() {
		let toppingPriceArr = [];
		[...this.topping].map((el) => {
			toppingPriceArr.push(el.price);
		});
		let toppingPrice = toppingPriceArr.reduce((prev, curr) => prev + curr);
		let finalPrice = this.size.price + this.dough.price + toppingPrice + ` y.e.`;
		return finalPrice;
	}

	getCallories() {
		let pizzaCaloriesArr = [];
		[...this.topping].map((el) => {
			pizzaCaloriesArr.push(el.ccal);
		});
		let caloriesSum = pizzaCaloriesArr.reduce((prev, curr) => prev + curr);
		let finalCaloriesSum = this.size.ccal + this.dough.ccal + caloriesSum + ` ccal`;
		return finalCaloriesSum;
	}
}

const pizza = new Pizza(Pizza.SIZE.SIZE_SMALL, [Pizza.TOPPING.TOPPING_PEPPER, Pizza.TOPPING.TOPPING_CHEESE]);
console.log(pizza);
pizza.changeDough('THICK');
//pizza.addTopping(Pizza.TOPPING.TOPPING_ANANAS);
//pizza.addTopping(Pizza.TOPPING.TOPPING_SAUCE);
console.log('Total price: ' + pizza.getPrice());
console.log('Total callories: ' + pizza.getCallories());