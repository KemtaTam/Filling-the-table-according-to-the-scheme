//добавление класса для всех инпутов, чтобы задать событие blur
document.querySelectorAll('input').forEach(input => {
	input.addEventListener('blur', () => {
		input.classList.add('focused')
	})
})

let tbody = document.getElementsByTagName("tbody")[0];

answer = {
	1: ['111/1', '111/1', '101/0', '011/1', '011/1',
		'111/1', '111/1', '101/0', '011/1', '011/1',
		'010/1', '010/1', '010/1', '010/1', '010/1',
		'011/1', '011/1', '011/1', '011/1', '011/1'
	]
}; //Из начального состояния недостижимы состояния: 001, 100, 110

//событие нажата кнопка "отправить ответ"
let tableForm = document.getElementById("form");
function retrieveInputValue(event) 
{
	event.preventDefault(); //отправлять на сервер не нужно

	//сравниваю два массива
	if (isEqual(answer[1], getUserAnswer())) alert("Correct answer");
	else if (checkForm(form)) alert("Incorrect answer! Try it again.");
}
tableForm.addEventListener('submit', retrieveInputValue);

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
	for (let i = 0; i < tbody.children.length - 1; i++) {
		for (let j = 0; j < tbody.children[i + 1].children.length - 1; j++) {
			userAnswer.push(tableForm.elements.input_value[k].value);
			k++;
		}
	}
	return userAnswer;
}

  //проверка полей формы на заполненность
  function checkForm(form)
  {
	  let e = 0;
	  
	  for (var i = 0; i < form.length - 1; i++) 
	  {
		  form[i].style.border = "none";
		  if (!form[i].value.replace(/^\s+|\s+$/g, "")) 
		  {
			  form[i].style.border = "1px solid red";
			  e = 1;
		  }
	  }
	  
	  if (e) 
	  {
		  alert("Заполните все поля");
		  return false;
	  } else return true;
  }