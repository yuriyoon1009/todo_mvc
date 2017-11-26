import axios from 'axios';

(function () {
  let todos;
  let status = 'all';

  const inputTodo = document.getElementById('input-todo');
  const todoList = document.getElementById('todo-list');

  // V2
  // filtering
  const filterByStatus = function () {
    return todos.filter(({ completed }) => {
      switch (status) {
        case 'active':
          return !completed; // completed === false
        case 'completed':
          return completed; // completed === true
        default:
          return true; // all
      }
    });
  };

  const countCompletedTodos = function () {
    return todos.filter(todo => todo.completed).length;
  };

  const countLeftTodos = function () {
    return todos.filter(todo => !todo.completed).length;
  };

  const render = function () {
    let html = '';

    const _todos = filterByStatus();

    _todos.forEach(({ id, content, completed }) => {
      const checked = completed ? 'checked' : '';
      html += `<li class="list-group-item">
        <div class="hover-anchor">
          <a class="hover-action text-muted">
            <span class="glyphicon glyphicon-remove-circle pull-right" data-id="${id}"></span>
          </a>
          <label class="i-checks" for="${id}">
            <input type="checkbox" id="${id}" ${checked}><i></i>
            <span>${content}</span>
          </label>
        </div>
      </li>`;
    });

    todoList.innerHTML = html;

    document.getElementById('completedTodos').innerHTML = countCompletedTodos();
    document.getElementById('leftTodos').innerHTML = countLeftTodos();

    inputTodo.focus();
  };

  const lastTodoId = function () {
    return todos ? Math.max(...todos.map(({ id }) => id)) + 1 : 1;
  };

  // // Create dummy data
  // const initDB = function () {
  //   const todos = [
  //     { id: 3, content: 'HTML', completed: false },
  //     { id: 2, content: 'CSS', completed: true },
  //     { id: 1, content: 'Javascript', completed: false }
  //   ];

  //   axios.post('/todos', todos[0])
  //     .then(res => {
  //       console.log(res);
  //       return axios.post('/todos', todos[1]);
  //     })
  //     .then(res => {
  //       console.log(res);
  //       return axios.post('/todos', todos[2]);
  //     })
  //     .then(res => {
  //       console.log(res);
  //       return axios.get('/todos');
  //     })
  //     .then(res => console.log(res))
  //     .catch(err => console.log(err.response));
  // };

  const getTodos = function () {
    axios.get('/todos')
      .then(res => {
        todos = res.data;
        render();
        console.log('[GET]\n', todos);
      })
      .catch(err => console.log(err.response));
  };

  const addTodo = function () {
    const content = inputTodo.value;
    inputTodo.value = '';

    const id = todos.length ? lastTodoId() : 1;
    const newTodo = { id, content, completed: false };

    axios.post('/todos', newTodo)
      .then(res => {
        console.log('[ADD]\n', res.data);
        getTodos();
      })
      .catch(err => console.log(err.response));
  };

  const removeTodo = function (id) {
    axios.delete(`/todos/id/${id}`)
      .then(() => {
        console.log('[REMOVE] ', id);
        getTodos();
      })
      .catch(err => console.log(err.response));
  };

  const toggleTodoComplete = function (id) {
    const { completed } = todos.find(todo => todo.id == id);

    axios.patch(`/todos/${id}`, { completed: !completed })
      .then(() => {
        console.log('[TOGGLE-COMP] ', id);
        getTodos();
      })
      .catch(err => console.log(err.response));
  };

  const toggleTodoAllComplete = function (chkStatus) {
    axios.patch('/todos', { completed: chkStatus })
      .then(() => {
        console.log('[ALL-COMP] ', chkStatus);
        getTodos();
      })
      .catch(err => console.log(err.response));
  };

  const removeCompletedTodo = function () {
    axios.delete('/todos/completed')
      .then(() => {
        console.log('[REMOVE-COMPLETED]');
        getTodos();
      })
      .catch(err => console.log(err.response));
  };

  // load 이벤트는 모든 리소스(image, script, css 등)의 로드가 완료하면 발생한다.
  window.addEventListener('load', getTodos);

  inputTodo.addEventListener('keyup', e => {
    if (e.keyCode !== 13) return;

    addTodo(inputTodo.value);
    inputTodo.value = '';
  });

  todoList.addEventListener('change', e => toggleTodoComplete(e.target.id));

  todoList.addEventListener('click', e => {
    if (!e.target || e.target.nodeName !== 'SPAN' || e.target.parentNode.nodeName === 'LABEL') return;
    removeTodo(e.target.dataset.id);
  });

  // V2
  // this를 사용하므로 arrow function을 사용 불가
  document.querySelector('.nav').addEventListener('click', function (e) {
    if (!e.target || e.target.nodeName !== 'A') return;

    // 모든 .nav > li 요소에서 active 클래스 제거
    [...this.childNodes].forEach(tab => {
      // Skip text node
      if (tab.nodeName === 'LI') {
        tab.classList.remove('active');
      }
    });

    // 클릭된 a 요소의 부모 요소(.nav > li)에 active 클래스 추가
    const navItem = e.target.parentNode;
    navItem.classList.add('active');

    status = navItem.id;
    render();
  });

  document.getElementById('chk-allComplete').addEventListener('change', e => {
    toggleTodoAllComplete(e.target.checked);
  });

  // 완료된 todo를 일괄 제거
  document.getElementById('btn-removeCompletedTodos').addEventListener('click', removeCompletedTodo);
}(axios));
