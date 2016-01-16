import * as Controller from 'cerebral';
import * as Model from 'cerebral-model-baobab';
import * as Baobab from 'baobab';

const hasTodos = Baobab.monkey({
  cursors: {
    todos: ['todos']
  },
  get: function (data) {
    return !!Object.keys(data.todos).length;
  }
});

const visibleTodos = Baobab.monkey({
  cursors: {
    todos: ['todos']
  },
  get: function (data) {
    return Object.keys(data.todos).map(key => data.todos[key]);
  }
});

const isAllCompleted = Baobab.monkey({
  cursors: {
    visibleTodos: ['visibleTodos']
  },
  get: function (data) {
    return data.visibleTodos.reduce(function (isAllCompleted, todo) {
      if (!todo.completed) {
        return false;
      }
      return isAllCompleted;
    }, true);
  }
});

/**
 * Application state for the TodoApp
 */
const model = Model({
  nextRef: 0,
  isSaving: false,
  newTodoTitle: '',
  remainingCount: 0,
  completedCount: 0,
  todos: {},
  hasTodos: hasTodos,
  visibleTodos: visibleTodos,
  filter: 'all',
  isAllCompleted: isAllCompleted
});

/**
 * Creates the cerebral controller
 */
let controller = Controller(model);

/**
 * Enables the debugger
 */
controller.getDevtools().start();

export default controller;
