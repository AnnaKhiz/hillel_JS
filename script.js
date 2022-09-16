const marksArray = [];
const newArray = [];
const medianaArray = [];
const topBestStudentsList = [];
let i, sumMarks, result;
const studentsList = test.slice();

function getMarksArray() {
	for (i = 0; i < studentsList.length; i++) {
		marksArray.push(studentsList[i].marks);
	}
	return marksArray;
}

// Новый студент - функция добавляет нового рандомного студента с полями (name, specialty, marks).

function addNewStudent(name, specialty, marks) {
	studentsList.push({ name: name, specialty: specialty, marks: marks });
	return studentsList;
}
addNewStudent('New student', 'New specialty', [5, 6, 7, 8]);
//console.log(studentsList);

const sortedArray = studentsList.slice();
const sortedBestStudentsArray = studentsList.slice();

// Средняя оценка студента  - функция принимает массив студентов и каждому студенту добавляет среднюю оценку и возвращает обновленный список
getMarksArray();
marksArray.forEach(function (el) {
	sumMarks = el.reduce((prev, curr) => {
		return prev + curr;
	});
	newArray.push(sumMarks / el.length);
	studentsList.map(function (el, i) {
		return el.average = (newArray[i]);
	});
});

//console.log(studentsList);


// Список студентов на отчисление - функция, которая возвращает студентов, средний балл которых ниже 60.
const badGradeArray = studentsList.filter(function (item) {
	return item.average < 60;
})
//console.log(badGradeArray);


// Медианная оценка студента - функция принимает массив студентов и каждому студенту добавляет поле, в котором должна быть записана оценку, которая является медианой или тут.
getMarksArray();
marksArray.forEach(function (el) {
	el.sort((a, b) => a - b);
	if (el.length % 2 === 0) {
		let res = (el.length / 2);
		result = ((el[res - 1] + el[res]) / 2);
	} else {
		let res = Math.floor(el.length / 2);
		result = el[res + 1];
	}
	medianaArray.push(result);
	studentsList.map(function (el, i) {
		return el.mediana = (medianaArray[i]);
	});
});

//console.log(studentsList);


// Распечатать список студентов - вывод отсортированного списка студентов по успеваемости (от самых успешных до двоечников) в виде <name> - <average grade>.
let averageListObject;
let averageList = sortedArray.map(function (el) {
	averageListObject = { name: el.name, average: el.average, }
	return averageListObject
})
let resultArray = averageList.sort((a, b) => a.average - b.average).reverse();
//раскомментируйте вызов функции для вывода списка студентов
function printBestStudentsList() {
	console.log(`Список успеваемости студентов:\n\n`);
	for (i = 0; i < resultArray.length; i++) {
		console.log(`${resultArray[i].name} - ${resultArray[i].average}`);
	};
}
//printBestStudentsList();



// Список самых успешных студентов - функция принимает массив студентов, возвращает топ 5 студентов по успеваемости.

let topBestStudents = sortedBestStudentsArray.sort((a, b) => a.average - b.average).reverse();
for (i = 0; i < 5; i++) {
	topBestStudentsList.push(topBestStudents[i]);
}

//console.log(topBestStudentsList);
