//добавление класса для всех инпутов, чтобы задать событие blur
document.querySelectorAll('input').forEach(input => {
	input.addEventListener('blur', () => {
		input.classList.add('focused')
	})
})

let tbody = document.getElementsByTagName("tbody")[0];

answer = {
	1: ['111/1', '', '111/1', '101/0', '', '011/1', '', '011/1',
		'111/1', '', '111/1', '101/0', '', '011/1', '', '011/1',
		'010/1', '', '010/1', '010/1', '', '010/1', '', '010/1',
		'011/1', '', '011/1', '011/1', '', '011/1', '', '011/1'],

	2: ['2', '5', '7']

}; //Из начального состояния недостижимы состояния: 001, 100, 110

$('.valueOfTable').mask('999/9', {placeholder: "_"});

//событие нажата кнопка "отправить ответ"
let tableForm = document.getElementById("form");
function retrieveInputValue(event) 
{
	event.preventDefault(); //отправлять на сервер не нужно

	//сравниваю два массива
	if (isEqual(answer[1], getUserAnswer()) && checkDelCol()) alert("Correct answer");
	else alert("Incorrect answer! Try it again.");
}
tableForm.addEventListener('submit', retrieveInputValue);

//проверка удалены ли ненужные столбцы
function checkDelCol()
{
	let delRow = document.getElementById("delRow");
	let flag = 1;

	for(let i=0; i<answer[2].length; i++){
		if(delRow.children[answer[2][i]].style.visibility != "hidden") flag=0;
	}
	return flag;
}
//функция скрытия из вида ненужных столбцов
function delCol()
{
	let delRow = document.getElementById("delRow");

	for(let i=0; i<delRow.children.length-1; i++)
	{
		delRow.children[i+1].addEventListener('click', () => {
			//???? visibility / display
			for(let j=0; j<tbody.children.length-2; j++){
				tbody.children[j+2].children[i+1].style.visibility = "hidden";
			}
			tbody.children[1].children[i].style.visibility = "hidden";
		})
	}
}
delCol();

//сравнение двух массивов
function isEqual(a, b) {
	if (a.length != b.length) return false;

	for (let i = 0; i < a.length; i++) {
		if (a[i] != b[i]) return false;
	}

	return true;
}

function getUserAnswer() {
	let userAnswer = [];
	let k = 0;
	for (let i = 0; i < tbody.children.length - 3; i++) {
		for (let j = 0; j < tbody.children[i + 2].children.length - 1; j++) {
			userAnswer.push(tableForm.elements.input_value[k].value);
			k++;
		}
	}
	return userAnswer;
}
