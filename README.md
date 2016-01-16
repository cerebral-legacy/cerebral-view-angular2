# cerebral-view-angular2
Angular2 View layer package for Cerebral

## The Cerebral Webpage is now launched
You can access the webpage at [http://cerebraljs.com/](http://cerebraljs.com/)

## Debugger
You can download the Chrome debugger [here](https://chrome.google.com/webstore/detail/cerebral-debugger/ddefoknoniaeoikpgneklcbjlipfedbb?hl=no).

## Install
`npm install cerebral-view-angular2`

## API
All examples are shown with Typescript syntax.

### Render the app
```ts
// Your cerebral controller instance
import controller from './controller';
import {register} from 'cerebral-view-angular2';

// Your main application component
import AppComponent from './components/app.component';

// Register the controller with the decorator
register(controller);

// Bootstrap the angular2 app
document.addEventListener('DOMContentLoaded', () => {
  bootstrap(AppComponent)
    .catch(err => console.error(err));
});
```

### Get state in components

#### Decorator
Use the decorator to pass state and signals to the component  
```js
import {Component} from 'angular2/core';
import {Decorator as Cerebral} from 'cerebral-view-angular2';

@Cerebral({
  isLoading: ['isLoading'],
  user: ['user'],
  error: ['error']  
})
class AppComponent {
  public signals;
  public state;
}
```
You can access your signals with:
```ts
this.signals.firstSignal();
this.signals.otherSignal();
```
You can access the state with:
```ts
this.state.isLoading;
this.state.user;
this.state.error;
``` 