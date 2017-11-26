import "core-js/es6";
import "core-js/es7/reflect";
import "zone.js/dist/zone";

import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";
import { enableProdMode } from "@angular/core";
import { MainModule } from "../main.module";

enableProdMode();

platformBrowserDynamic().bootstrapModule(MainModule);
