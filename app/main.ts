import {enableProdMode} from 'angular2/core';
import {bootstrap} from 'angular2/platform/browser';
import {TodoComponent} from './todo/todo.component';

/**
 * Imports the cerebral controller
 */
import controller from './controller';

/**
 * Registers the signals for the controller
 */
import signals from './todo/todo.signals';
signals(controller);

/**
 * Registers the controller with the view package
 *
 */
import {register} from '../index';
register(controller);

/**
 * Bootstraps the angular2 app
 */
enableProdMode();
document.addEventListener('DOMContentLoaded', () => {
  bootstrap(TodoComponent)
    .catch(err => console.error(err));
});
