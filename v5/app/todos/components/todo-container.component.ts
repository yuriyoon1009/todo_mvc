import { Component, OnInit } from '@angular/core';
import { Todo } from '../../models/todo';

@Component({
  selector: 'todo-container',
  template: `
    <div class="container">
      <div class="row">
        <div class="col-md-8 col-md-offset-2">
          <h1 class="title">Todos</h1>

          <todo-form (addTodo)="addTodo($event)"></todo-form>

          <todo-nav
            [navItems]="navItems"
            [statusNav]="selectedNavItem"
            (changeStatusNav)="setCurrentNavItem($event)"></todo-nav>

          <todo-list
            [todos]="todos"
            [statusNav]="selectedNavItem"
            (removeTodo)="removeTodo($event)"
            (toggleComplete)="toggleComplete($event)"></todo-list>

          <todo-footer
            [cntCompletedTodos]="getCntCompletedTodos()"
            [cntActiveTodos]="getCntActiveTodos()"
            (changeStatusToggleAllTodo)="toggleAllTodoAsComplete($event)"
            (removeCompletedTodos)="removeCompletedTodos()"></todo-footer>

          <div class="col-md-12" style="margin-top: 30px">
            <pre>{{todos | json}}</pre>
          </div>
        </div>
      </div>
    </div>
  `
})
export class TodoContainerComponent implements OnInit {
  todos: Todo[];
  // navigation items
  navItems = ['All', 'Active', 'Completed'];
  // 선택된 navigation item
  selectedNavItem: string;

  ngOnInit() {
    this.getTodos();
    this.selectedNavItem = this.navItems[0];
  }

  getTodos() {
    this.todos = [
      { id: 3, content: 'HTML', completed: false },
      { id: 2, content: 'CSS', completed: true },
      { id: 1, content: 'Javascript', completed: false }
    ];
  }

  addTodo(content: string) {
    const newTodo = { id: this.lastTodoId(), content, completed: false };
    this.todos = [newTodo, ...this.todos];
  }

  removeTodo(id: number) {
    this.todos = this.todos.filter(todo => todo.id !== id);
  }

  removeCompletedTodos() {
    this.todos = this.todos.filter(todo => todo.completed !== true);
  }

  toggleComplete(id: number) {
    // this.todos.forEach(todo => {
    //   todo = todo.id === id ? Object.assign(todo, { completed: !todo.completed }) : todo;
    // });
    this.todos = this.todos.map(todo => {
      return todo.id === id ? Object.assign(todo, { completed: !todo.completed }) : todo;
    });
  }

  toggleAllTodoAsComplete(completed: boolean) {
    // this.todos.forEach(todo => todo = Object.assign({}, todo, { completed }));
    this.todos = this.todos.map(todo => Object.assign(todo, { completed }));
  }

  setCurrentNavItem(selectedNavItem: string) {
    this.selectedNavItem = selectedNavItem;
  }

  getCntCompletedTodos(): number {
    return this.todos.filter(todo => todo.completed).length;
  }

  getCntActiveTodos(): number {
    return this.todos.filter(todo => !todo.completed).length;
  }

  lastTodoId(): number {
    return this.todos.length ? Math.max(...this.todos.map(({ id }) => id)) + 1 : 1;
  }
}
