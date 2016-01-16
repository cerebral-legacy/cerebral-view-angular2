/**
 * Imports all the modules and polyfills needed for angular2 to work
 */
import 'es6-shim';
import 'es6-promise';
import 'zone.js/lib/browser/zone-microtask';
import 'rxjs';

require('es7-reflect-metadata/dist/browser');
Error['stackTraceLimit'] = Infinity;
Zone['longStackTraceZone'] = require('zone.js/lib/zones/long-stack-trace.js');
