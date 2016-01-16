/**
 * The cerebral controller that is registered with the decorator
 */
let controller;

/**
 * The callbacks that will listen to change events
 * @type {Array}
 */
let callbacks: Function[] = [];

/**
 * Defines if the event listener is registered
 * @type {boolean}
 */
let listener: boolean = false;

/**
 * Registers the controller with the decorator
 * @param cerebral
 */
export function register(cerebral) {
  controller = cerebral;
}

/**
 * A Cerebral decorator for angular2 that is responsible for:
 *
 * 1. Injecting the state at the paths passed as arguments to the decorator.
 * 2. Registering itself as a listener to change events. When the controller triggers a
 * "change" event, the decorator grabs the same state again from the controller and compares
 * it with the existing state. If the state has changed, the state is updated.
 * 3. Removes itself as a listener when the component is about to be destroyed.
 *
 * @param paths the paths for the component state
 * @returns {function(TFunction): TFunction} a constructor for the component
 */
export function Decorator(paths?) {
  return function<TFunction extends Function>(target: TFunction): TFunction {
    let component = target.prototype;

    component._update = () => {
      let paths = component._paths ? component._paths : {};
      Object.keys(paths).forEach((key) => {
        let val: any = controller.get(paths[key]);
        if (component.state[key] !== val) {
          component.state[key] = val;
        }
      });
    };

    component._setup = () => {
      component.state = {};
      component.signals = controller.getSignals();
      component._paths = paths ? paths : {};
      if (Object.keys(component._paths).length) {
        callbacks.push(component._update);
      }
      if (!listener) {
        listener = true;
        controller.on('change', () => {
          callbacks.forEach(cb => {
            cb();
          });
        });
      }
      component._update.apply(component);
    };

    component._detach = () => {
      if (Object.keys(component._paths).length) {
        callbacks.splice(callbacks.indexOf(component._update), 1);
      }
    };
    if ('ngOnInit' in component) {
      let originalOnInit = component.ngOnInit;
      let newOnInit = (old => {
        function extendsInit() {
          component._setup();
          old.apply(component);
        }

        return extendsInit;
      })(originalOnInit);
      component.ngOnInit = newOnInit;
    } else {
      component.ngOnInit = component._setup;
    }

    if ('ngOnDestroy' in component) {
      let originalOnDestroy = component.ngOnDestroy;
      let newOnDestroy = (old => {
        function extendsDestroy() {
          component._detach();
          old.apply(component);
        }

        return extendsDestroy;
      })(originalOnDestroy);
      component.ngOnDestroy = newOnDestroy;
    } else {
      component.ngOnDestroy = component._detach;
    }
    return target;
  };
}
