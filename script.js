const marksArray = [];
const newArray = [];
const medianaArray = [];
const topBestStudentsList = [];
let i, sumMarks, result;
const studentsList = test.slice();

// function getMarksArray(array) {
// 	for (i = 0; i < array.length; i++) {
// 		marksArray.push(array[i].marks);
// 	}
// 	return marksArray;
// }

// Новый студент - функция добавляет нового рандомного студента с полями (name, specialty, marks).

function addNewStudent(name, specialty, marks) {
	studentsList.push({ name: name, specialty: specialty, marks: marks });
	return studentsList;
}
addNewStudent('New student', 'New specialty', [5, 6, 7, 8]);
//console.log(studentsList);


const sortedBestStudentsArray = studentsList.slice();

// Средняя оценка студента  - функция принимает массив студентов и каждому студенту добавляет среднюю оценку и возвращает обновленный список
function calcAverageMark(arrayOfStudents) {
	for (i = 0; i < arrayOfStudents.length; i++) {
		marksArray.push(arrayOfStudents[i].marks);
	}
	marksArray.forEach(function (el) {
		sumMarks = el.reduce((prev, curr) => {
			return prev + curr;
		});
		newArray.push(sumMarks / el.length);
		arrayOfStudents.map(function (el, i) {
			return el.average = (newArray[i]);
		});
	});
	return arrayOfStudents;
}
//console.log(calcAverageMark(studentsList));


// Список студентов на отчисление - функция, которая возвращает студентов, средний балл которых ниже 60.
function checkBadGrades(arrayOfStudents) {
	const badGradeArray = arrayOfStudents.filter(function (item) {
		return item.average < 60;
	});
	return badGradeArray;
}
//console.log(checkBadGrades(studentsList));


// Медианная оценка студента - функция принимает массив студентов и каждому студенту добавляет поле, в котором должна быть записана оценку, которая является медианой или тут.

function calcMediana(arrayOfStudents) {
	for (i = 0; i < arrayOfStudents.length; i++) {
		marksArray.push(arrayOfStudents[i].marks);
	}
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
		arrayOfStudents.map(function (el, i) {
			return el.mediana = (medianaArray[i]);
		});
	});
	return arrayOfStudents;
}
//console.log(calcMediana(studentsList));


// Распечатать список студентов - вывод отсортированного списка студентов по успеваемости (от самых успешных до двоечников) в виде <name> - <average grade>.

function printBestStudentsList() {
	let averageListObject;
	const sortedArray = calcAverageMark(studentsList);
	let sortedStudentsList = [];
	let averageList = sortedArray.map(function (el) {
		averageListObject = { name: el.name, average: el.average, }
		return averageListObject
	})
	let resultArray = averageList.sort((a, b) => b.average - a.average);
	for (i = 0; i < resultArray.length; i++) {
		sortedStudentsList.push(`${resultArray[i].name} - ${resultArray[i].average}`);
	};
	return sortedStudentsList
}
console.log(printBestStudentsList());



// Список самых успешных студентов - функция принимает массив студентов, возвращает топ 5 студентов по успеваемости.
function getTopStudents(studentsArray) {
	const topFiveStudents = [];
	studentsArray = printBestStudentsList();
	studentsArray.filter(function (el, index) {
		if (index < 5) {
			topFiveStudents.push(el);
		}
	});
	return topFiveStudents;
}
console.log(getTopStudents(studentsList));


