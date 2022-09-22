let obj = {
	a: 'f',
	b: 78,
	c: 'R',
	d: {
		a: {
			a: null,
			b: 'E',
			c: {
				a: true,
				b: 'C',
				c: 'test'
			},
			d: 'U'
		},
		b: {
			a: 'R',
			b: ['S', 4, 6, 'I'],
			c: 0,
		},
		c: ['O'],
		d: null,
		e: 'N'
	}
}

const finalString = [];

function getString(object) {
	if (object == null) {
		object = '0';
	} else {
		for (let item of Object.values(object)) {
			if (typeof item == 'string' && item.length == 1 && item.toUpperCase() == item) {
				finalString.push(item);
			} else
				if (typeof item == 'object') {
					getString(item);
				}
		}
	}
	return finalString.join('');
}

console.log(getString(obj));




