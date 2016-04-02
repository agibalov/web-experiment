/// <reference path="../node_modules/angular2/typings/browser.d.ts"/>

import 'reflect-metadata'
import 'zone.js/dist/zone'

import { bootstrap } from 'angular2/platform/browser'
import { App } from './App'
import { CalculatorService } from "./CalculatorService";
import { provide } from "angular2/core";

bootstrap(App, [ provide(CalculatorService, { useClass: CalculatorService }) ])