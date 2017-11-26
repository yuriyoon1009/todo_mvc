import axios from 'axios';

(function () {
  let todos;

  const todoList = document.getElementById('todo-list');
  const inputTodo = document.getElementById('input-todo');
  const activeButton = document.getElementById('active');
  const completedButton = document.getElementById('completed');
  const AllCheckButton = document.getElementById('chk-allComplete');
  const clearComplete = document.getElementById('btn-removeCompletedTodos');

  //todos 를 정의하는 함수
  // selectTodo = function () {
  //   switch(EventTarget){
  //     default: return axios.get('/todos');

  //   }

  // }


  // todos의 내용을 불러오는 함수
  const render = function () {
    let html = '';

    todos.forEach(todo => {
      const checked = todo.completed ? 'checked' : '';

      html += `<li class="list-group-item"> \
        <div class="hover-anchor"> \
          <a class="hover-action text-muted"> \
            <span class="glyphicon glyphicon-remove-circle pull-right" data-id="${todo.id}"></span> \
          </a> \
          <label class="i-checks" for="${todo.id}"> \
            <input type="checkbox" id="${todo.id}" ${checked}><i></i> \
            <span>${todo.content}</span> \
          </label> \
        </div> \
      </li>`;
    });

    todoList.innerHTML = html;
    document.getElementById('completedTodos').textContent = (todos.filter(item => item.completed == true)).length;
    document.getElementById('leftTodos').textContent = (todos.filter(item => item.completed == false)).length;
  };

  // const lastTodoId = function () {
  //   return todos ? Math.max.apply(...todos.map(todo => todo.id) + 1 : 1;};
  const lastTodoId = function () {
    return todos ? Math.max.apply(null, todos.map(function (todo) {
      return todo.id;
    })) + 1 : 1;
  };

  const getTodos = function () {
    axios.get('/todos')
      .then(res => {
        todos = res.data;
        render();
        console.log('[GET]\n', todos);
      })
      .catch(err => console.log(err.response));
  };
  window.addEventListener('load', () => getTodos());

  // 내용추가하기
  const addTodo = function () {
    const content = inputTodo.value;
    inputTodo.value = '';

    let todo;

    if (!todos || !todos.length) {
      todo = { id: 1, content, completed: false };
    } else {
      todo = { id: lastTodoId(), content, completed: false };
    }

    axios.post('/todos', todo)
      .then(res => {
        console.log('[ADD]\n', res.data);
        getTodos();
      })
      .catch(err => console.log(err.response));
  };
  inputTodo.addEventListener('keyup', e => {
    if (e.keyCode !== 13 || inputTodo.value.trim() === '') return;
    addTodo();
  });

  // 내용 삭제하기
  const removeTodo = function (id) {
    axios.delete(`/todos/${id}`)
      .then(res => {
        console.log('[REMOVE]\n', res.data);
        getTodos();
      })
      .catch(err => console.log(err.response));
  };
  todoList.addEventListener('click', e => {
    let target = e.target;
    if (!target || target.nodeName !== 'SPAN' || target.parentNode.nodeName === 'LABEL') return;
    removeTodo(target.dataset.id);
  });

  // 체크박스
  const toggleTodoComplete = function (id) {
    const { completed } = todos.find(item => item.id == id);

    axios.patch(`/todos/${id}`, { completed: !completed })
      .then(() => {
        console.log('[TOGGLE-COMP]\n', id);
        getTodos();
      })
      .catch(err => console.log(err.response));
  };
  todoList.addEventListener('change', e => toggleTodoComplete(e.target.id));

  // check all
  const allChange = function (e) {
    axios.patch(`/todos`, { completed : completed })
      .then(() => {
        console.log('[TOGGLE-ALL]\n');
        getTodos();
      })
      .catch(err => console.log(err.response));
  };
  AllCheckButton.addEventListener('change', e => allChange(e));

  // clear 내역 삭제하기 (실패)
  const clearComp = function (e) {
    let todo = todos.filter(todo => todo.completed != true);
    axios.post('/todos', todo)
      .then(res => {
        console.log('[clearComp]\n', res.data);
        getTodos();
      })
      .catch(err => console.log(err.response));
  };
  clearComplete.addEventListener('click', e => clearComp(e));

  // active 필터링 todo에 상태를 반환하는 함수를 결과로 하여 view를 바꿔준다. 어려움....
  const activeFilter = function () {
    activeTodo = todos.filter(item => item.completed == false);
    axios.get('/todos')
      .then(res => console.log('res'))
      .catch(err => console.log('err'));
  };
  // activeButton.addEventListener('click', );
  // completedButton.addEventListener('click', );

}());