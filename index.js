var controller;
var callbacks = [];
var listener = false;
function register(cerebral) {
    controller = cerebral;
}
exports.register = register;
function Decorator(paths) {
    return function (target) {
        var component = target.prototype;
        component._update = function () {
            var paths = component._paths ? component._paths : {};
            Object.keys(paths).forEach(function (key) {
                var val = controller.get(paths[key]);
                if (component.state[key] !== val) {
                    component.state[key] = val;
                }
            });
        };
        component._setup = function () {
            component.state = {};
            component.signals = controller.getSignals();
            component._paths = paths ? paths : {};
            if (Object.keys(component._paths).length) {
                callbacks.push(component._update);
            }
            if (!listener) {
                listener = true;
                controller.on('change', function () {
                    callbacks.forEach(function (cb) {
                        cb();
                    });
                });
            }
            component._update.apply(component);
        };
        component._detach = function () {
            if (Object.keys(component._paths).length) {
                callbacks.splice(callbacks.indexOf(component._update), 1);
            }
        };
        if ('ngOnInit' in component) {
            var originalOnInit = component.ngOnInit;
            var newOnInit = (function (old) {
                function extendsInit() {
                    component._setup();
                    old.apply(component);
                }
                return extendsInit;
            })(originalOnInit);
            component.ngOnInit = newOnInit;
        }
        else {
            component.ngOnInit = component._setup;
        }
        if ('ngOnDestroy' in component) {
            var originalOnDestroy = component.ngOnDestroy;
            var newOnDestroy = (function (old) {
                function extendsDestroy() {
                    component._detach();
                    old.apply(component);
                }
                return extendsDestroy;
            })(originalOnDestroy);
            component.ngOnDestroy = newOnDestroy;
        }
        else {
            component.ngOnDestroy = component._detach;
        }
        return target;
    };
}
exports.Decorator = Decorator;
//# sourceMappingURL=index.js.map