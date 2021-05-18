//добавление класса для всех инпутов, чтобы задать событие blur
document.querySelectorAll('input').forEach(input => {
	input.addEventListener('blur', () => {
		input.classList.add('focused')
	})
})

let tbody = document.getElementsByTagName("tbody")[0];
let header = document.getElementsByTagName("header")[0];
let body = document.getElementsByTagName("body")[0];

let num = getRandomIntInclusive(2, 3);
let image = document.createElement("img");
image.setAttribute("src", "images/" + num + "schema.svg");
if(num==3){
	image.style.width = "700px";
}
header.after(image);

tables = {
	1: {
		inputVar: ['x0 ', 'x1'],
		inputChar: ['00', '01', '10', '11'],
		triggers: ['DD1', 'DD2', 'DD3'],
		states: ['000', '001', '010', '011', '100', '101', '110', '111']
	},
	2: {
		inputVar: ['x0 ', 'x1'],
		inputChar: ['00', '01', '10', '11'],
		triggers: ['DD1', 'DD2'],
		states: ['00', '01', '10', '11',]
	},
	3: {
		inputVar: ['x0 ', 'x1'],
		inputChar: ['00', '01', '10', '11'],
		triggers: ['DD1', 'DD2'],
		states: ['00', '01', '10', '11',]
	}
}; 
answer = {
	2: {
		ans: ['10/0', '', '10/0', '10/0',
			  '11/0', '', '11/0', '10/0',
			  '10/0', '', '00/1', '00/0',
			  '11/0', '', '11/0', '10/0'
			],
		delState: ['2'],
		nondelState: ['1', '3', '4']		
	},
	3: {
		ans: ['00/1', '10/0', '10/0', '',
			  '01/1', '10/0', '10/0', '',
			  '10/0', '10/0', '10/0', '',
			  '10/0', '10/0', '10/0', ''
			],
		delState: ['4'],
		nondelState: ['1', '2', '3']
	}

}; 

function buildTable()
{
		//первая строка
		let tr1 = document.createElement("tr");
		tr1.setAttribute("class", "first_row");
		tbody.appendChild(tr1);

		//первая ячейка первой строки
		let th1 = document.createElement("th");
		th1.setAttribute("class", "first_col t_1-1");
		for(let i=0; i<tables[num].inputVar.length; i++){
			//переменная
			let x = document.createElement('class');
			x.textContent = tables[num].inputVar[i][0];
			x.style.backgroundColor = "inherit";
			x.style.fontSize = '18px';
			th1.appendChild(x);
			//индекс
			let ind = document.createElement('class');
			ind.textContent = tables[num].inputVar[i][1];
			ind.style.backgroundColor = "inherit"
			ind.style.fontSize = '11px';
			th1.appendChild(ind);
		}
		th1.setAttribute("rowspan", 2);
		tr1.appendChild(th1);

		//вторая ячейка первой строки
		let th2 = document.createElement("th");
		for(let i=0; i<tables[num].triggers.length; i++){
			let dd = document.createElement("class");
			dd.style.marginLeft = "3%";
			dd.style.marginRight = "3%";
			dd.style.backgroundColor = "inherit";
			dd.textContent = tables[num].triggers[i];
			th2.appendChild(dd);
		}	
		th2.setAttribute("colspan", tables[num].states.length);
		tr1.appendChild(th2);

		//состояния
		let tr = document.createElement("tr");
		tr.setAttribute("class", "states");
		tbody.appendChild(tr);
		//ячейки состояний
		for(let i=0; i<tables[num].states.length; i++){
			let th = document.createElement("th");
			th.textContent = tables[num].states[i];
			tr.appendChild(th);
		}
		
		//строки входных символов и инпутов
		for(let i=0; i<tables[num].inputChar.length; i++)
		{
			let tr = document.createElement("tr");
			tr.setAttribute("class", "second_row");
			tbody.appendChild(tr);
			//создаю ячейки входных символов
			let th1 = document.createElement("th");
			th1.setAttribute("class", "first_col input_char");
			th1.textContent = tables[num].inputChar[i];
			tr.appendChild(th1);

			//создаю остальные ячейки
			for(let j=0; j<tables[num].states.length; j++)
			{
				let th = document.createElement("th");
				let input_value = document.createElement("input");

				input_value.setAttribute('class', 'valueOfTable');
				input_value.type = "text";
				if(num == 1){
					input_value.placeholder = '000/0';;
				} else if(num == 2 || num == 3){
					input_value.placeholder = '00/0';;
				}
				input_value.name = "input_value";
				input_value.autocomplete="off";

				th.appendChild(input_value);
				tr.appendChild(th);
			}
		}

		//кнопки удаления
		let trdel = document.createElement("tr");
		trdel.setAttribute("id", "delRow");
		tbody.appendChild(trdel);
		//невидимая кнопка
		let nonth = document.createElement("th");
		nonth.setAttribute("id", "b1");
		trdel.appendChild(nonth);
		//видимые кнопки
		for(let i=0; i<tables[num].states.length; i++)
		{
			let th = document.createElement("th");
			th.setAttribute("class", "delRow");
			let butDel = document.createElement("button");
			butDel.setAttribute("class", "bDelCol");
			butDel.setAttribute("type", "button");
			butDel.textContent = 'X';

			th.appendChild(butDel);
			trdel.appendChild(th);
		}
}
buildTable();

//маска
if(num == 1){
	$('.valueOfTable').mask('999/9', {placeholder: "_"});
} else if(num == 2 || num == 3){
	$('.valueOfTable').mask('99/9', {placeholder: "_"});
}

let popup1 = document.getElementsByClassName("pop-up1")[0];
let popup2 = document.getElementsByClassName("pop-up2")[0];
let end_button = document.getElementsByClassName("end_button")[0];
let bOk1 = document.getElementById("bOk1");
let bOk2 = document.getElementById("bOk2");

//событие нажата кнопка "отправить ответ"
let tableForm = document.getElementById("form");
function retrieveInputValue(event) 
{
	event.preventDefault(); //отправлять на сервер не нужно

	//сравниваю два массива
	if (isEqual(answer[num].ans, getUserAnswer()) && checkDelCol()) popup1.style.display = "block";
	else popup2.style.display = "block";;
}
tableForm.addEventListener('submit', retrieveInputValue);
bOk1.onclick = function () { popup1.style.display = "none"; }
bOk2.onclick = function () { popup2.style.display = "none"; }

//проверка удалены ли ненужные столбцы
function checkDelCol()
{
	let delRow = document.getElementById("delRow");
	let flag = 1;
	for(let i=0; i<answer[num].delState.length; i++){
		if(delRow.children[answer[num].delState[i]].style.visibility != "hidden") flag=0;
	}
	for(let i=0; i<answer[num].nondelState.length; i++){
		if(delRow.children[answer[num].nondelState[i]].style.visibility == "hidden") flag=0;
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
			for(let j=0; j<tbody.children.length-2; j++){
				tbody.children[j+2].children[i+1].firstElementChild.value = "";
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

function getRandomIntInclusive(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min + 1)) + min; //Максимум и минимум включаются
  }
