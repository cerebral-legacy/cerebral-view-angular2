import {Component} from 'angular2/core';
import {CORE_DIRECTIVES} from 'angular2/common';
import {ObjToArr} from '../pipes/obj-array.pipe';
import {Decorator as Cerebral} from '../../index';

@Component({
  selector: 'todos',
  template: require('./todos.html'),
  styles: [
    require('../../node_modules/todomvc-app-css/index.css'),
    require('../../node_modules/todomvc-common/base.css'),
    require('./todos.css')
  ],
  pipes: [ObjToArr],
  directives: [CORE_DIRECTIVES]
})
@Cerebral({
  isSaving: ['isSaving'],
  newTodoTitle: ['newTodoTitle'],
  remainingCount: ['remainingCount'],
  completedCount: ['completedCount'],
  todos: ['todos'],
  hasTodos: ['hasTodos'],
  visibleTodos: ['visibleTodos'],
  filter: 'all',
  isAllCompleted: ['isAllCompleted']
})
export class TodoComponent {

  public signals;
  public state;

  newTodoTitleChanged() {
    this.signals.newTodoSubmitted({title: this.state.newTodoTitle});
  }

  completedTodo(ref) {
    this.signals.completedToggled({ref: ref});
  }

  todoRemoved(ref) {
    this.signals.todoRemoved({ref: ref});
  }

  enableEdit(ref) {
    this.signals.editTodoEnabled({ref: ref});
  }

  completeAllToggled() {
    this.signals.completeAllToggled();
  }
}
