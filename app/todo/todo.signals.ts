import {
  addTodo,
  setNewTodoTitle,
  resetNewTodoTitle,
  countTodos,
  toggleAllCompleted,
  toggleCompleted,
  removeTodo,
  enableEditMode,
} from './todo.actions';

export default function (controller) {
  controller.signals({
    'editTodoEnabled': [enableEditMode],
    'newTodoSubmitted': [addTodo, resetNewTodoTitle, countTodos],
    'completeAllToggled': [toggleAllCompleted, countTodos],
    'newTodoTitleChanged': [setNewTodoTitle],
    'completedToggled': [toggleCompleted],
    'todoRemoved': [removeTodo, countTodos]
  });
}
