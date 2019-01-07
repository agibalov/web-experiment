import {Metadata, beforeMethod, afterMethod, aroundMethod} from "aspect.js";
import {Injector} from "@angular/core";

export class LoggingAspect {
    @beforeMethod({
        classNamePattern: /.+/,
        methodNamePattern: /.+/
    })
    logBefore(meta: Metadata) {
        this.dump('BEFORE', meta);

        const injector: Injector = meta.woveMetadata.injector;
        console.log('Injector:', injector);
    }

    @afterMethod({
        classNamePattern: /.+/,
        methodNamePattern: /.+/
    })
    async logAfter(meta: Metadata) {
        let methodResult = meta.method.result;
        if(methodResult instanceof Promise) {
            await methodResult;
        }

        this.dump('AFTER', meta);
    }

    private dump(message: string, meta: Metadata) {
        console.log(`${message} ${meta.className}::${meta.method.name}, args=${meta.method.args}, targetObj=`,
            meta.method.context,
            meta,
            `injector=`, meta.woveMetadata.injector);
    }
}
