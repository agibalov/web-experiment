import { Metadata, beforeMethod, afterMethod } from "aspect.js";
import {Injectable, Injector} from "@angular/core";

@Injectable()
export class LoggingAspect {
    constructor(injector: Injector) {
        console.log('LoggingAspect instantiated! Injector=', injector);
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
        console.log(`${message} ${meta.className}::${meta.method.name}, args=${meta.method.args}, targetObj=`, meta.method.context, meta);
    }
}
