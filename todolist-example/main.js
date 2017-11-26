(function(){

var todos;
var inputTodo = document.getElementById('input-todo');
var todoList = document.getElementById('todo-list');

//
var toggleTodoComplete = function(id){
  todos = todos.map(function(todo){
    return todo.id === parseInt(id) ? Object.assign({}, todo, {completed: !todo.completed}) : todo
  });
  render();
  console.log('[TOGGLE]\n', todos);
};

//
var removeTodo = function(id){
  todos = todos.filter(function(todo){
    return todo.id !== id;
  });
  render();
  console.log('[REMOVE]\n', todos)
}

// id값 추가
// Math.max(3,2,1);
// Math.max.apply(null, [3,2,1])
// Math.max.call(null, 3,2,1)
var lastTodoId = function(){
  return todos ? Math.max.apply(null, todos.map( function(todo){
    return todo.id;
  })) + 1 : 1;
}

// 최신 data todos의 첫번째 요소로 추가
var addTodo = function(){
  var content = inputTodo.value;
  if (!todos){
    todos = [{id:1, content: content, completed: false}];
  } else {
    // push는 성능이슈가 있음
    todos = [{ id: lastTodoId(), content: content, completed: false}].concat(todos);
  }
  content = ''
  render();
}

// 초기값 설정 함수
var getTodos = function(){
  todos = [
    { id: 1, content: "Angular", completed: true },
    { id: 2, content: "STARBUCKS", completed: false },
    { id: 3, content: "People Air", completed: false }
  ];
  render();
  console.log('[GET]\n' + todos);
}

// 출력 함수
var render = function() {
  var html = ''
  todos.forEach(function(todo, id){
    html += `
      <li class="list-group-item" >
        <div class="hover-anchor">
          <a class="hover-action text-muted">
            <span class="glyphicon glyphicon-remove-circle pull-right" data-id="${id}"></span>
          </a>
          <label class="i-checks" for="${id}">
            <input type="checkbox" id="${id}" ${todo.completed ? 'checked' : ''}><i></i>
              <span>${todo.content}</span>
          </label>
        </div>
      </li>
    `;
  }) 
  todoList.innerHTML = html;
}

// input에서 enter를 눌렀을 경우
// 작성 기능
inputTodo.addEventListener('keyup', function(e){
  if (e.keyCode === 13) {
    addTodo();
  }
})

//
window.addEventListener('load', function (){
  getTodos();
})

todoList.addEventListener('change', function(e){
  toggleTodoComplete();
})

}())