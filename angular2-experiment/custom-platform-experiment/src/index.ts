import 'core-js/es7/reflect';

import {
    ANALYZE_FOR_ENTRY_COMPONENTS,
    ChangeDetectionStrategy, ChangeDetectorRef,
    Compiler,
    COMPILER_OPTIONS, CompilerFactory, CompilerOptions, Component, ComponentFactory, ComponentFactoryResolver,
    ComponentRef,
    createPlatformFactory, ElementRef, Injector,
    LOCALE_ID,
    ModuleWithComponentFactories,
    NgModule,
    NgModuleFactory, NgModuleRef, platformCore,
    PlatformRef, QueryList, Renderer, SchemaMetadata, SecurityContext, TemplateRef, TRANSLATIONS_FORMAT, Type,
    ViewContainerRef,
    ViewEncapsulation,
    ɵReflectionCapabilities as ReflectionCapabilities,
    ɵCodegenComponentFactoryResolver,
    ɵcmf, ɵmod, ɵmpd, ɵregisterModuleFactory, ɵinlineInterpolate, ɵinterpolate, ɵEMPTY_ARRAY, ɵEMPTY_MAP,
    ɵvid, ɵeld, ɵand, ɵted, ɵdid, ɵprd, ɵqud, ɵpad, ɵpod, ɵppd, ɵpid, ɵnov, ɵncd, ɵunv, ɵcrt, ɵccf,
    ɵstringify as stringify, RendererFactory2, ErrorHandler, Injectable, Renderer2,
    RendererType2, RendererStyleFlags2, ApplicationModule, Sanitizer
} from "@angular/core";
import {
    CompileMetadataResolver, CompileProviderMetadata,
    CompilerConfig, CompileReflector,
    DirectiveNormalizer,
    DirectiveResolver, ElementSchemaRegistry, ExternalReference, getUrlScheme, HtmlParser, I18NHtmlParser, Identifiers,
    JitCompiler,
    JitSummaryResolver, Lexer, NgModuleCompiler,
    NgModuleResolver, Parser,
    PipeResolver, ResourceLoader, StaticSymbolCache, StyleCompiler, syntaxError, TemplateAstVisitor, TemplateParser,
    UrlResolver, ViewCompiler
} from "@angular/compiler";

class DummyElement {
    children: any[] = [];
    attributes: any = {};
}

class DummyTextElement {
    constructor(public text: string) {}
}

class DummyRenderer extends Renderer2 {
    data: { [p: string]: any };

    constructor(private rootElement: DummyElement) {
        super();
    }

    destroy(): void {
        console.log('DummyRenderer::destroy()');
        throw new Error('Not implemented!');
    }

    createElement(name: string, namespace?: string | null): any {
        console.log('DummyRenderer::createElement()', name, namespace);
        throw new Error('Not implemented!');
    }

    createComment(value: string): any {
        console.log('DummyRenderer::createComment()', value);
        throw new Error('Not implemented!');
    }

    createText(value: string): any {
        console.log('DummyRenderer::createText()', value);
        return new DummyTextElement(value);
    }

    appendChild(parent: any, newChild: any): void {
        console.log('DummyRenderer::appendChild()', parent, newChild);
        parent.children.push(newChild);
    }

    insertBefore(parent: any, newChild: any, refChild: any): void {
        console.log('DummyRenderer::insertBefore()', parent, newChild, refChild);
        throw new Error('Not implemented!');
    }

    removeChild(parent: any, oldChild: any): void {
        console.log('DummyRenderer::removeChild()', parent, oldChild);
        throw new Error('Not implemented!');
    }

    selectRootElement(selectorOrNode: string | any): any {
        console.log('DummyRenderer::selectRootElement()', selectorOrNode);
        return this.rootElement;
    }

    parentNode(node: any): any {
        console.log('DummyRenderer::parentNode()', node);
        throw new Error('Not implemented!');
    }

    nextSibling(node: any): any {
        console.log('DummyRenderer::nextSibling()', node);
        throw new Error('Not implemented!');
    }

    setAttribute(el: any, name: string, value: string, namespace?: string | null): void {
        console.log('DummyRenderer::setAttribute()', el, name, value, namespace);
        el.attributes[name] = value;
    }

    removeAttribute(el: any, name: string, namespace?: string | null): void {
        console.log('DummyRenderer::removeAttribute()', el, name, namespace);
        throw new Error('Not implemented!');
    }

    addClass(el: any, name: string): void {
        console.log('DummyRenderer::addClass()', el, name);
        throw new Error('Not implemented!');
    }

    removeClass(el: any, name: string): void {
        console.log('DummyRenderer::removeClass()', el, name);
        throw new Error('Not implemented!');
    }

    setStyle(el: any, style: string, value: any, flags?: RendererStyleFlags2): void {
        console.log('DummyRenderer::setStyle()', el, style, value, flags);
        throw new Error('Not implemented!');
    }

    removeStyle(el: any, style: string, flags?: RendererStyleFlags2): void {
        console.log('DummyRenderer::removeStyle()', el, style, flags);
        throw new Error('Not implemented!');
    }

    setProperty(el: any, name: string, value: any): void {
        console.log('DummyRenderer::setProperty()', el, name, value);
        throw new Error('Not implemented!');
    }

    setValue(node: any, value: string): void {
        console.log('DummyRenderer::setValue()', node, value);
        throw new Error('Not implemented!');
    }

    listen(target, eventName: string, callback: (event: any) => (boolean | void)): () => void {
        console.log('DummyRenderer::listen()', target, eventName, callback);
        throw new Error('Not implemented!');
    }
}

@Injectable()
class DummyRendererFactory implements RendererFactory2 {
    constructor(private dummyElement: DummyElement) {
    }

    createRenderer(hostElement: any, type: RendererType2 | null): Renderer2 {
        console.log('DummyRendererFactory::createRenderer()', hostElement, type);
        return new DummyRenderer(this.dummyElement);
    }
}

class NoopSanitizer extends Sanitizer {
    sanitize(context: SecurityContext, value: {} | string | null): string | null {
        return value as string;
    }
}

@NgModule({
    providers: [
        { provide: DummyElement, useValue: new DummyElement() },
        { provide: ErrorHandler, useFactory: () => new ErrorHandler() },
        { provide: RendererFactory2, useClass: DummyRendererFactory },
        { provide: Sanitizer, useClass: NoopSanitizer }
    ],
    imports: [ ApplicationModule ]
})
class DummyModule {
}

class DummyElementSchemaRegistry extends ElementSchemaRegistry {
    hasProperty(tagName: string, propName: string, schemaMetas: SchemaMetadata[]): boolean {
        console.log('DummyElementSchemaRegistry::hasProperty()', tagName, propName, schemaMetas);
        return true;
    }

    hasElement(tagName: string, schemaMetas: SchemaMetadata[]): boolean {
        console.log('DummyElementSchemaRegistry::hasElement()', tagName, schemaMetas);
        return true;
    }

    securityContext(elementName: string, propName: string, isAttribute: boolean): SecurityContext {
        console.log('DummyElementSchemaRegistry::securityContext()', elementName, propName, isAttribute);
        return SecurityContext.NONE;
    }

    allKnownElementNames(): string[] {
        console.log('DummyElementSchemaRegistry::allKnownElementNames()');
        return [];
    }

    getMappedPropName(propName: string): string {
        console.log('DummyElementSchemaRegistry::getMappedPropName()', propName);
        return propName;
    }

    getDefaultComponentElementName(): string {
        console.log('DummyElementSchemaRegistry::getDefaultComponentElementName()');
        return "ng-component";
    }

    validateProperty(name: string): { error: boolean; msg?: string } {
        console.log('DummyElementSchemaRegistry::validateProperty()', name);
        return { error: false };
    }

    validateAttribute(name: string): { error: boolean; msg?: string } {
        console.log('DummyElementSchemaRegistry::validateAttribute()', name);
        return { error: false };
    }

    normalizeAnimationStyleProperty(propName: string): string {
        console.log('DummyElementSchemaRegistry::normalizeAnimationStyleProperty()', propName);
        return propName;
    }

    normalizeAnimationStyleValue(camelCaseProp: string, userProvidedProp: string, val: string | number): { error: string; value: string } {
        console.log('DummyElementSchemaRegistry::normalizeAnimationStyleValue()', camelCaseProp, userProvidedProp, val);
        return { error: null, value: `${val}` };
    }
}

class DummyUrlResolver implements UrlResolver {
    resolve(baseUrl: string, url: string): string {
        console.log('DummyUrlResolver::resolve()', baseUrl, url);
        throw new Error('Not implemented!');
    }
}

class DummyCompileReflector implements CompileReflector {
    private reflectionCapabilities = new ReflectionCapabilities();

    parameters(typeOrFunc: any): any[][] {
        console.log('DummyCompileReflector::parameters()', typeOrFunc);
        return this.reflectionCapabilities.parameters(typeOrFunc);
    }

    annotations(typeOrFunc: any): any[] {
        console.log('DummyCompileReflector::annotations()', typeOrFunc);
        return this.reflectionCapabilities.annotations(typeOrFunc);
    }

    propMetadata(typeOrFunc: any): { [p: string]: any[] } {
        console.log('DummyCompileReflector::propMetadata()', typeOrFunc);
        return this.reflectionCapabilities.propMetadata(typeOrFunc);
    }

    hasLifecycleHook(type: any, lcProperty: string): boolean {
        console.log('DummyCompileReflector::hasLifecycleHook()', type, lcProperty);
        return this.reflectionCapabilities.hasLifecycleHook(type, lcProperty);
    }

    guards(typeOrFunc: any): { [p: string]: any } {
        console.log('DummyCompileReflector::guards()', typeOrFunc);
        return this.reflectionCapabilities.guards(typeOrFunc);
    }

    componentModuleUrl(type: any, cmpMetadata: Component): string {
        console.log('DummyCompileReflector::componentModuleUrl()', type, cmpMetadata);
        const moduleId = cmpMetadata.moduleId;

        if (typeof moduleId === 'string') {
            const scheme = getUrlScheme(moduleId);
            return scheme ? moduleId : `package:${moduleId}${''}`;
        } else if (moduleId !== null && moduleId !== void 0) {
            throw syntaxError(
                `moduleId should be a string in "${stringify(type)}". See https://goo.gl/wIDDiL for more information.\n` +
                `If you're using Webpack you should inline the template and the styles, see https://goo.gl/X2J8zc.`);
        }

        return `./${stringify(type)}`;
    }

    resolveExternalReference(ref: ExternalReference): any {
        console.log('DummyCompileReflector::resolveExternalReference()', ref);
        if (ref == Identifiers.ANALYZE_FOR_ENTRY_COMPONENTS) {
            return ANALYZE_FOR_ENTRY_COMPONENTS;
        } else if (ref == Identifiers.ElementRef) {
            return ElementRef;
        } else if (ref == Identifiers.NgModuleRef) {
            return NgModuleRef;
        } else if (ref == Identifiers.ViewContainerRef) {
            return ViewContainerRef;
        } else if (ref == Identifiers.ChangeDetectorRef) {
            return ChangeDetectorRef;
        } else if (ref == Identifiers.QueryList) {
            return QueryList;
        } else if (ref == Identifiers.TemplateRef) {
            return TemplateRef;
        } else if (ref == Identifiers.CodegenComponentFactoryResolver) {
            return ɵCodegenComponentFactoryResolver;
        } else if (ref == Identifiers.ComponentFactoryResolver) {
            return ComponentFactoryResolver;
        } else if (ref == Identifiers.ComponentFactory) {
            return ComponentFactory;
        } else if (ref == Identifiers.ComponentRef) {
            return ComponentRef;
        } else if (ref == Identifiers.NgModuleFactory) {
            return NgModuleFactory;
        } else if (ref == Identifiers.createModuleFactory) {
            return ɵcmf;
        } else if (ref == Identifiers.moduleDef) {
            return ɵmod;
        } else if (ref == Identifiers.moduleProviderDef) {
            return ɵmpd;
        } else if (ref == Identifiers.RegisterModuleFactoryFn) {
            return ɵregisterModuleFactory;
        } else if (ref == Identifiers.Injector) {
            return Injector;
        } else if (ref == Identifiers.ViewEncapsulation) {
            return ViewEncapsulation;
        } else if (ref == Identifiers.ChangeDetectionStrategy) {
            return ChangeDetectionStrategy;
        } else if (ref == Identifiers.SecurityContext) {
            return SecurityContext;
        } else if (ref == Identifiers.LOCALE_ID) {
            return LOCALE_ID;
        } else if (ref == Identifiers.TRANSLATIONS_FORMAT) {
            return TRANSLATIONS_FORMAT;
        } else if (ref == Identifiers.inlineInterpolate) {
            return ɵinlineInterpolate;
        } else if (ref == Identifiers.interpolate) {
            return ɵinterpolate;
        } else if (ref == Identifiers.EMPTY_ARRAY) {
            return ɵEMPTY_ARRAY;
        } else if (ref == Identifiers.EMPTY_MAP) {
            return ɵEMPTY_MAP;
        } else if (ref == Identifiers.Renderer) {
            return Renderer;
        } else if (ref == Identifiers.viewDef) {
            return ɵvid;
        } else if (ref == Identifiers.elementDef) {
            return ɵeld;
        } else if (ref == Identifiers.anchorDef) {
            return ɵand;
        } else if (ref == Identifiers.textDef) {
            return ɵted;
        } else if (ref == Identifiers.directiveDef) {
            return ɵdid;
        } else if (ref == Identifiers.providerDef) {
            return ɵprd;
        } else if (ref == Identifiers.queryDef) {
            return ɵqud;
        } else if (ref == Identifiers.pureArrayDef) {
            return ɵpad;
        } else if (ref == Identifiers.pureObjectDef) {
            return ɵpod;
        } else if (ref == Identifiers.purePipeDef) {
            return ɵppd;
        } else if (ref == Identifiers.pipeDef) {
            return ɵpid;
        } else if (ref == Identifiers.nodeValue) {
            return ɵnov;
        } else if (ref == Identifiers.ngContentDef) {
            return ɵncd;
        } else if (ref == Identifiers.unwrapValue) {
            return ɵunv;
        } else if (ref == Identifiers.createRendererType2) {
            return ɵcrt;
        } else if (ref == Identifiers.createComponentFactory) {
            return ɵccf;
        }

        return ref.runtime;
    }
}

class DummyCompiler implements Compiler {
    private jitCompiler: JitCompiler;

    constructor() {
        const compilerConfig = new CompilerConfig();
        const htmlParser = new HtmlParser();
        const compileReflector = new DummyCompileReflector();
        const ngModuleResolver = new NgModuleResolver(compileReflector);
        const directiveResolver = new DirectiveResolver(compileReflector);
        const pipeResolver = new PipeResolver(compileReflector);
        const summaryResolver = new JitSummaryResolver();
        const schemaRegistry = new DummyElementSchemaRegistry();
        const resourceLoader = new ResourceLoader();
        const urlResolver = new DummyUrlResolver();
        const directiveNormalizer = new DirectiveNormalizer(resourceLoader, urlResolver, htmlParser, compilerConfig);
        const staticSymbolCache = new StaticSymbolCache();
        const errorCollector = (error: any, type?: any) => {
            console.log(error, type);
        };
        const metadataResolver = new CompileMetadataResolver(
            compilerConfig, htmlParser, ngModuleResolver, directiveResolver, pipeResolver,
            summaryResolver, schemaRegistry, directiveNormalizer, console, staticSymbolCache, compileReflector, errorCollector);

        const lexer = new Lexer();
        const exprParser = new Parser(lexer);
        const i18NHtmlParser: I18NHtmlParser = new I18NHtmlParser(htmlParser);
        const transforms: TemplateAstVisitor[] = [];
        const templateParser = new TemplateParser(compilerConfig, compileReflector, exprParser, schemaRegistry, i18NHtmlParser, console, transforms);

        const styleCompiler = new StyleCompiler(urlResolver);

        const viewCompiler = new ViewCompiler(compileReflector);

        const ngModuleCompiler = new NgModuleCompiler(compileReflector);

        const getExtraNgModuleProviders: (ngModule: any) => CompileProviderMetadata[] = _ => [];

        this.jitCompiler = new JitCompiler(
            metadataResolver, templateParser, styleCompiler, viewCompiler, ngModuleCompiler, summaryResolver,
            compileReflector, compilerConfig, console, getExtraNgModuleProviders);
    }

    compileModuleSync<T>(moduleType: Type<T>): NgModuleFactory<T> {
        return this.jitCompiler.compileModuleSync(moduleType) as NgModuleFactory<T>;
    }

    compileModuleAsync<T>(moduleType: Type<T>): Promise<NgModuleFactory<T>> {
        return this.jitCompiler.compileModuleAsync(moduleType) as Promise<NgModuleFactory<T>>;
    }

    compileModuleAndAllComponentsSync<T>(moduleType: Type<T>): ModuleWithComponentFactories<T> {
        const result = this.jitCompiler.compileModuleAndAllComponentsSync(moduleType);
        return new ModuleWithComponentFactories<T>(<T>result.ngModuleFactory, <any[]>result.componentFactories);
    }

    async compileModuleAndAllComponentsAsync<T>(moduleType: Type<T>): Promise<ModuleWithComponentFactories<T>> {
        const result = await this.jitCompiler.compileModuleAndAllComponentsSync(moduleType);
        return new ModuleWithComponentFactories<T>(<T>result.ngModuleFactory, <any[]>result.componentFactories);
    }

    clearCache(): void {
        this.jitCompiler.clearCache();
    }

    clearCacheFor(type: Type<any>): void {
        this.jitCompiler.clearCacheFor(type);
    }
}

class DummyCompilerFactory implements CompilerFactory {
    createCompiler(options?: CompilerOptions[]): Compiler {
        return new DummyCompiler();
    }
}

function platformDummy(): PlatformRef {
    const platformFactory = createPlatformFactory(platformCore, "dummy", [
        { provide: COMPILER_OPTIONS, useValue: {}, multi: true },
        { provide: CompilerFactory, useClass: DummyCompilerFactory, deps: [ COMPILER_OPTIONS ] }
    ]);
    return platformFactory();
}

// **********************************************************************************************

@Component({
    selector: 'app',
    template: `Hello World!`
})
class AppComponent {
    constructor() {
        console.log('AppComponent constructor');
    }
}

@NgModule({
    declarations: [ AppComponent ],
    imports: [ DummyModule ],
    bootstrap: [ AppComponent ]
})
class AppModule {
    constructor() {
        console.log('AppModule constructor');
    }
}

(async () => {
    const appModule = await platformDummy().bootstrapModule(AppModule, { ngZone: 'noop' });
    const injector = appModule.injector;
    const rootElement = injector.get(DummyElement);
    console.log(rootElement);
})();
