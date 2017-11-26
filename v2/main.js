// 전역변수
// 초기 데이터 값을 넣기 위한 배열
var todos;
// ul의 자식요소를 잡기 위한 부모 ul
var ul = document.getElementById('todo-list');


// 초기 데이터 설정
var getTodos = function () {
  todos = [
    { id: 3, content: 'HTML', completed: false },
    { id: 2, content: 'CSS', completed: true },
    { id: 1, content: 'JavaScript', completed: false }
  ];
  render(todos);
}

// 시작과 동시에 출력
window.addEventListener('load', function (e) {
  getTodos();
});

// 입력 기능
document.addEventListener('keyup', function (e) {
  var key = e.keyCode;
  var inputbox = document.getElementById('input-todo');
  if (key === 13 && inputbox.value) {

    var a = todos.unshift({ id: todos.length + 1, content: inputbox.value, completed: false })
    var added = todos[todos.length - 1]

    // input 비우기
    inputbox.value = "";
    render(todos)
  }
})

// 체크박스 입력 기능
ul.addEventListener('click', function(e){
  if ((!e.target || (e.target.nodeName !== 'INPUT')) && (!e.target.attributes[2])) return;
  if (e.target.attributes[2]){
    // checked인 경우
    todos[e.target.id].completed = false
  } else {
    // checked가 아닌 경우
    todos[e.target.id].completed = true
  }
  render(todos)
});


// 삭제 기능
ul.addEventListener('click', function (e) {
  if ((!e.target || (e.target.nodeName !== 'SPAN')) && (!e.target || ul.nodeName !== 'LABEL')) return;
  delete todos[e.target.dataset.id];
  render(todos);
});

// 화면 출력 기능
var render = function (array) {
  var list = document.getElementsByTagName('ul')[0]
  var html = ''
  array.forEach(function(todo, id, array){
    var check_tf = '';
    todo.completed ? check_tf = 'checked' : '';
    html += '<li class="list-group-item"> \ <div class="hover-anchor"> \ <a class="hover-action text-muted"> \ <span class="glyphicon glyphicon-remove-circle pull-right" data-id="'
    + id + '"></span> \ </a> \ <label class="i-checks" for="'
    + id + '"> \ <input type="checkbox" id="'
    + id + '"'
    + check_tf + '><i></i> \ <span> '
    + todo.content + '</span> \ </label> \ </div> \ </li>';
  })
  list.innerHTML = html
}


// 질문
// 삭제 기능에서는 e.target.dataset.id로 db에 접근하는데
// 왜 체크박크에서는 e.target.id로 db에 접근하는가? 그 둘의 차이가 뭐지?