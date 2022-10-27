function checkArray(array) {
	if (!Array.isArray(array)) {
		console.error('Marks must be an array!');
		return false;
	} else {
		return true;
	}
}


function Student(name = '', faculty = '', marks = []) {
	this.name = name,
		this.faculty = faculty,
		this.marks = marks,
		// средняя оценка студента
		this.getAvgMark = function () {
			if (checkArray(this.marks)) {
				let sumMarks = this.getTotal();
				return sumMarks / marks.length;
			}
		},
		// медианная оценка студента
		this.getMedianMark = function () {
			if (checkArray(this.marks)) {
				marks.sort((a, b) => a - b);
				if (marks.length % 2 === 0) {
					let res = (marks.length / 2);
					return result = ((marks[res - 1] + marks[res]) / 2);
				} else {
					let res = Math.floor(marks.length / 2);
					return result = marks[res];
				}
			}
		},
		// максимальная оценка
		this.getMaxMark = function () {
			if (checkArray(this.marks)) {
				return marks.sort((a, b) => b - a)[0];
			}
		},
		// минимальная оценка
		this.getMinMark = function () {
			if (checkArray(this.marks)) {
				return marks.sort((a, b) => a - b)[0];
			}
		},
		// сумма оценок
		this.getTotal = function () {
			if (checkArray(this.marks)) {
				return marks.reduce((prev, curr) => prev + curr);
			}

		},
		// информация о студенте в виде name + faculty + total
		this.getInfo = function () {
			if (this.getTotal()) {
				return `${name} ${faculty} ${this.getTotal()}`;
			} else {
				return `${name} ${faculty} (no total score yet)`;
			}
		}
}

const student = new Student('John', 'engineer', [5, 2, 4, 3, 5, 4]);
console.log(student);

console.log(`Average: ${student.getAvgMark()}`);
console.log(`Mediana: ${student.getMedianMark()}`);
console.log(`Max score: ${student.getMaxMark()}`);
console.log(`Min score: ${student.getMinMark()}`);
console.log(`Total score: ${student.getTotal()}`);
console.log(`Get info: ${student.getInfo()}`);
