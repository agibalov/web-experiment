import { Metadata, beforeMethod, afterMethod } from "aspect.js";
import {Injectable, Injector} from "@angular/core";

@Injectable()
export class LoggingAspect {
    private injector: Injector;

    constructor(injector: Injector) {
        // injector is not null when LoggingAspect gets injected into AppModule
        console.log('LoggingAspect instantiated! Injector=', injector);
        this.injector = injector;
    }

    @beforeMethod({
        classNamePattern: /.+/,
        methodNamePattern: /.+/
    })
    logBefore(meta: Metadata) {
        this.dump('BEFORE', meta);
    }

    @afterMethod({
        classNamePattern: /.+/,
        methodNamePattern: /.+/
    })
    logAfter(meta: Metadata) {
        this.dump('AFTER', meta);
    }

    private dump(message: string, meta: Metadata) {
        // this.injector is always null!
        console.log(`${message} ${meta.className}::${meta.method.name}, args=${meta.method.args}, targetObj=`,
            meta.method.context,
            meta,
            this.injector);
    }
}
