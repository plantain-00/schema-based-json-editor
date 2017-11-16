import "core-js/es6";
import "core-js/es7/reflect";
import "zone.js/dist/zone";

import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";
import { enableProdMode } from "@angular/core";
import { MainModule } from "./main.module";
import { setLocale } from "./main";

enableProdMode();

function start() {
    platformBrowserDynamic().bootstrapModule(MainModule);
}

if (navigator.language === "zh-CN") {
    import("../../dist/locales/" + navigator.language + ".js").then(module => {
        setLocale(module.locale);
        start();
    }, error => {
        start();
    });
} else {
    start();
}
