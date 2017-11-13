import "core-js/es6";
import "core-js/es7/reflect";
import "zone.js/dist/zone";

import { platformBrowser } from "@angular/platform-browser";
import { enableProdMode } from "@angular/core";
import { MainModuleNgFactory } from "./main.module.ngfactory";

enableProdMode();

platformBrowser().bootstrapModuleFactory(MainModuleNgFactory);
