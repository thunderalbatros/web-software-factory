# 📚 Libro Completo: TypeScript Deep Dive (Edición en Español) & Asombroso Domain-Driven Design

> **Autor:** Basarat Ali Syed (Tr. Melissa Rofman) & Comunidad DDD Español  
> **Fuente Verificada:** `EbookFoundation/free-programming-books-subjects.md` (https://github.com/melissarofman/typescript-book.git, https://github.com/ddd-espanol/asombroso-ddd.git)  
> **Dominio:** `architecture_and_books`  
> **Fecha de Ingesta:** 2026-10-27  

---

## Fuente: `typescript-book/CONTRIBUTING.md`

# Contributing

This book is developed using [GitBook](https://github.com/GitbookIO/gitbook). Authored in Markdown files (I use [atom](http://atom.io)).

Here's how to setup a Dev Environment:

```
npm install gitbook-cli -g
gitbook serve .
```
> Note: serve needs port `35729` (for live reload) and `4000` for serving http://localhost:4000.

Also you can mostly just edit the `.md` files in [`/docs`](https://github.com/basarat/typescript-book/docs) using github and create a Pull Request (PR).

# Code
All the code for the book is in the `/code` folder. Tested with `atom-typescript`.

### More Gitbook Tips
* Links best work if they are relative (e.g. `./foo.md`) to the *current* file.
* For links in the same file (`#foo-bar` style links) best to click the heading on github to get what gitbook expects.

### TypeScript Compiler Docs
Thanks to the TypeScript team for providing much of the docs: https://github.com/Microsoft/TypeScript/wiki/Architectural-Overview that are used to write the compiler story.

---

## Fuente: `typescript-book/GLOSSARY.md`

# Duck Typing
If it walks like a duck and quacks like a duck, it is a duck. For TypeScript if it has all the members structurally then it is okay for other things (irrespecitive of name) that accept that structure.

# OE
Operating Environment. I'd like to use the term Operating System, but that is not necessarily what I mean here. Think Browser,Node.js,WScriptHost etc.

# Incremental Parsing
Re-Parsing as the user edits the code.

---

## Fuente: `typescript-book/README.md`

TypeScript Deep Dive (Traducción en progreso)
=======

He estado mirando las dificultades que suelen emerger cuando la gente comienza a utilizar TypeScript. Me baso en las enseñanzas de [Stack Overflow](http://stackoverflow.com/tags/typescript/topusers) / [DefinitelyTyped](https://github.com/DefinitelyTyped/) y en estar involucrado con la [comunidad TypeScript](https://github.com/TypeStrong/). Puedes [seguir mis updates](https://twitter.com/basarat) y [no te olvides de ★ en GitHub](https://github.com/basarat/typescript-book) 🌹

## Comentarios

* Gracias por el excelente libro. Aprendí mucho de él ([link](https://www.gitbook.com/book/basarat/typescript/discussions/21#comment-1468279131934))
* Este es probablemente el mejor libro sobre typescript que existe. Bien hecho ([link](https://twitter.com/thelondonjs/status/756419561570852864))
* Amo la precision y claridad de los ejemplos! ([link](https://twitter.com/joe_mighty/status/758290957280346112))
* Por el bajo bajo precio de "gratis" recibes paginas de pura genialidad. Lleno de ejemplos en código y explicaciones claras y concisas, TypeScript Deep Dive te ayudara a aprender a desarrollar con TypeScript. ([link](https://www.nativescript.org/blog/details/free-book-typescript-deep-dive))
* Simplemente gracias! **La mejor explicacion detallada de TypeScript 2!** ([link](https://www.gitbook.com/book/basarat/typescript/discussions/38))
* Este gitboot puso mi proyecto en marcha rapidamente. Lectura facil y fluida. 5 estrellas ([link](https://twitter.com/thebabellion/status/779888195559235584))
* Recomiendo el libro de #typescript online de @basarat. Lo vas a amar.([link](https://twitter.com/markpieszak/status/788099306590969860))
* Siempre encontre este libro por @basarat muy util. ([link](https://twitter.com/Brocco/status/789887640656945152))
* Debemos destacar  TypeScript Deep Dive, un libro open source.([link](https://www.siliconrepublic.com/enterprise/typescript-programming-javascript))
* Gran recurso online para aprender. ([link](https://twitter.com/rdfuhr/status/790193307708076035))
* Gracias por compilar este libro y por todo tu arduo trabajo dentro de la comunidad TypeScript. ([link](https://github.com/basarat/typescript-book/pull/183#issuecomment-257799713))
* TypeScript Deep Dive es uno de los mejores textos tecnicos que he leido en un tiempo. ([link](https://twitter.com/borekb/status/794287092272599040))
* Gracias @basarat por el libro TypeScript Deep Dive. Me ayudó mucho con mi primer proyecto. ([link](https://twitter.com/betolinck/status/797901548562960384))
* Gracias a @basarat por esta excelente fuente para aprender #typescript. ([link](https://twitter.com/markuse1501/status/799116176815230976))
* Gente, excelente libro sobre TypeScript(@typescriptlang) por @basarat ([link](https://twitter.com/deeinlove/status/813245965507260417))
* Apoyandome en el legendario libro "TypeScript Deep Dive" de @basarat en este momento. ([link](https://twitter.com/sitapati/status/814379404956532737))
* numDeVecesQueRecomendeElLibroDeTypeScriptDeBasarat++; ([link](https://twitter.com/brocco/status/814227741696462848))
* Un libro no solo para typescript, sino también para un profundo entendimiento de Javascript. [link](https://www.gitbook.com/book/basarat/typescript/discussions/59)
* En mi nuevo trabajo, estamos usando @typescriptlang, lo que me resulta nuevo. Este libro está siendo increíblemente util, muchísimas gracias, @basarat! [link](https://twitter.com/netchkin/status/855339390566096896)
* Gracias por escribir TypeScript Deep Dive. He aprendido muchísimo. [link](https://twitter.com/buctwbzs/status/857198618704355328?refsrc=email&s=11)
* Estoy amando el libro online sobre @typescriptlang de @basarat basarat.gitbooks.io/typescript/#, está lleno de grandes recetas! [link](https://twitter.com/ericliprandi/status/857608837309677568)
* El doc de Microsoft es genial, pero si queres "ir más profundo" en TypeScript, este libro tiene mucho valor. [link](https://twitter.com/caludio/status/876729910550831104)
* Gracias, este es un gran libro 🤓🤓 [link](https://twitter.com/jjwonmin/status/885666375548547073)
* Deep Dive TypeScript es excelente en tantos niveles. Lo encuentro muy perpicaz. Gracias. [link](https://twitter.com/orenmizr/status/891083492787970053)
* la intro de @basarat a @typescriptlang sigue siendo uno de los mejores (sino EL mejor) [link](https://twitter.com/stevealee/status/953953255968698368)
* Esta buenisimo! Tantos extras en #typescript! [link](https://twitter.com/pauliescanlon/status/989898852474998784)

## Empezá
Si estás aqui para leer el libro online, [empezá](./SUMMARY.md).

## Traducciones
El libro es completamente gratis asi que puedes copiar y pegar lo que quieras sin pedir permiso. Si tienes una traduccion y quieres que agregue el link aqui, [mandame una PR](https://github.com/basarat/typescript-book/edit/master/README.md).
* [Filipino](https://github.com/themarshann/typescript-book-fil)
* [Italiano](https://github.com/TizioFittizio/typescript-book)
* [Chino](https://github.com/jkchao/typescript-book-chinese)
* [Ruso](https://github.com/etroynov/typescript-book)
* [Portugués](https://github.com/overlineink/typescript-book)
* [Japonés](https://github.com/yohamta/typescript-book)
* [Inglés](https://github.com/basarat/typescript-book)

## Otras opciones
También puedes descargar uno de los siguientes
* [EPUB para iPad, iPhone, Mac](https://www.gitbook.com/download/epub/book/basarat/typescript)
* [PDF para Windows y otros](https://www.gitbook.com/download/pdf/book/basarat/typescript)
* [MOBI para Kindle](https://www.gitbook.com/download/mobi/book/basarat/typescript)

## Gracias
Todos los increibles [contribuidores](https://github.com/basarat/typescript-book/graphs/contributors) 🌹

## Compartir
Compartí el URL: http://basarat.gitbooks.io/typescript/

---

## Fuente: `typescript-book/SUMMARY.md`

# Índice

* [Empezando](docs/getting-started.md)
  * [Por qué TypeScript](docs/why-typescript.md)
* [JavaScript](docs/javascript/recap.md)
  * [Igualdad](docs/javascript/equality.md)
  * [Referencias](docs/javascript/references.md)
  * [Null vs. Undefined](docs/javascript/null-undefined.md)
  * [this](docs/javascript/this.md)
  * [Cierres](docs/javascript/closure.md)
  * [Número](docs/javascript/number.md)
  * [Truthy](docs/javascript/truthy.md)
* [Futuro JavaScript Ahora](docs/future-javascript.md)
  * [Clases](docs/classes.md)
    * [Classes Emit](docs/classes-emit.md)
  * [Funciones flecha](docs/arrow-functions.md)
  * [Parámetros Rest](docs/rest-parameters.md)
  * [let](docs/let.md)
  * [const](docs/const.md)
  * [Desestructurando](docs/destructuring.md)
  * [Operador de propagación](docs/spread-operator.md)
  * [for...of](docs/for...of.md)
  * [Iteradores](docs/iterators.md)
  * [Strings de Plantillas](docs/template-strings.md)
  * [Promesas](docs/promise.md)
  * [Generadores](docs/generators.md)
  * [Async Await](docs/async-await.md)
* [Proyecto](docs/project/project.md)
  * [Contexto de Compilación](docs/project/compilation-context.md)
    * [tsconfig.json](docs/project/tsconfig.md)
    * [Cuáles archivos?](docs/project/files.md)
  * [Espacios de Declaración](docs/project/declarationspaces.md)
  * [Módulos](docs/project/modules.md)
    * [Detalles de los módulos en archivos](docs/project/external-modules.md)
    * [globals.d.ts](docs/project/globals.md)
  * [Namespaces](docs/project/namespaces.md)
  * [Expresiones de Importación Dinámica](docs/project/dynamic-import-expressions.md)
* [Node.js QuickStart](docs/quick/nodejs.md)
* [Navegador QuickStart](docs/quick/browser.md)
* [Sistema de tipos de TypeScript](docs/types/type-system.md)
  * [Guia para migrar JS](docs/types/migrating.md)
  * [@types](docs/types/@types.md)
  * [Declaraciones Ambiente](docs/types/ambient/intro.md)
    * [Archivos de declaración](docs/types/ambient/d.ts.md)
    * [Variables](docs/types/ambient/variables.md)
  * [Interfaces](docs/types/interfaces.md)
  * [Enums](docs/enums.md)
  * [`lib.d.ts`](docs/types/lib.d.ts.md)
  * [Funciones](docs/types/functions.md)
  * [Llamables](docs/types/callable.md)
  * [Aserción de tipo](docs/types/type-assertion.md)
  * [Frescura](docs/types/freshness.md)
  * [Guardia de tipos](docs/types/typeGuard.md)
  * [Tipos literales](docs/types/literal-types.md)
  * [Readonly](docs/types/readonly.md)
  * [Genéricos](docs/types/generics.md)
  * [Inferencia de tipos](docs/types/type-inference.md)
  * [Compatibilidad de tipos](docs/types/type-compatibility.md)
  * [Tipo Never](docs/types/never.md)
  * [Uniones discriminadas](docs/types/discriminated-unions.md)
  * [Firmas de índices](docs/types/index-signatures.md)
  * [Tipos movibles](docs/types/moving-types.md)  
  * [Manejo de excepciones](docs/types/exceptions.md)
  * [Mixins](docs/types/mixins.md)
* [JSX](docs/jsx/tsx.md)
  * [React](docs/jsx/react.md)
  * [JSX sin React](docs/jsx/others.md)
* [Opciones](docs/options/intro.md)
  * [noImplicitAny](docs/options/noImplicitAny.md)
  * [strictNullChecks](docs/options/strictNullChecks.md)
* [Errores en TypeScript](docs/errors/main.md)
  * [Interpretando Errores](docs/errors/interpreting-errors.md)
  * [Common Errors](docs/errors/common-errors.md)
* [NPM](docs/npm/index.md)
* [Testing](docs/testing/intro.md)
  * [Jest](docs/testing/jest.md)
  * [Cypress](docs/testing/cypress.md)
* [Tools](docs/tools/intro.md)
  * [Prettier](docs/tools/prettier.md)
  * [Husky](docs/tools/husky.md)
  * [ESLint](docs/tools/eslint.md)
  * [Changelog](docs/tools/changelog.md)
* [TIPs](docs/tips/main.md)
  * [String Based Enums](docs/tips/stringEnums.md)
  * [Nominal Typing](docs/tips/nominalTyping.md)
  * [Stateful Functions](docs/tips/statefulFunctions.md)
  * [Currying](docs/tips/currying.md)
  * [Type Instantiation](docs/tips/typeInstantiation.md)
  * [Lazy Object Literal Initialization](docs/tips/lazyObjectLiteralInitialization.md)  
  * [Classes are Useful](docs/tips/classesAreUseful.md)
  * [Avoid Export Default](docs/tips/defaultIsBad.md)
  * [Limit Property Setters](docs/tips/propertySetters.md) --> **Traducido hasta aquí**
  * [`outFile` caution](docs/tips/outFile.md)
  * [JQuery tips](docs/tips/jquery.md)
  * [static constructors](docs/tips/staticConstructor.md)
  * [singleton pattern](docs/tips/singleton.md)
  * [Function parameters](docs/tips/functionParameters.md)
  * [Build Toggles](docs/tips/build-toggles.md)
  * [Barrel](docs/tips/barrel.md)
  * [Create Arrays](docs/tips/create-arrays.md)
  * [Typesafe Event Emitter](docs/tips/typed-event.md)
* [StyleGuide](docs/styleguide/styleguide.md)
* [TypeScript Compiler Internals](docs/compiler/overview.md)
  * [Program](docs/compiler/program.md)
  * [AST](docs/compiler/ast.md)
    * [TIP: Visit Children](docs/compiler/ast-tip-children.md)
    * [TIP: SyntaxKind enum](docs/compiler/ast-tip-syntaxkind.md)
    * [Trivia](docs/compiler/ast-trivia.md)
  * [Scanner](docs/compiler/scanner.md)
  * [Parser](docs/compiler/parser.md)
    * [Parser Functions](docs/compiler/parser-functions.md)
  * [Binder](docs/compiler/binder.md)
    * [Binder Functions](docs/compiler/binder-functions.md)
    * [Binder Declarations](docs/compiler/binder-declarations.md)
    * [Binder Container](docs/compiler/binder-container.md)
    * [Binder SymbolTable](docs/compiler/binder-symboltable.md)
    * [Binder Error Reporting](docs/compiler/binder-diagnostics.md)
  * [Checker](docs/compiler/checker.md)
    * [Checker Diagnostics](docs/compiler/checker-global.md)
    * [Checker Error Reporting](docs/compiler/checker-diagnostics.md)
  * [Emitter](docs/compiler/emitter.md)
    * [Emitter Functions](docs/compiler/emitter-functions.md)
    * [Emitter SourceMaps](docs/compiler/emitter-sourcemaps.md)
  * [Contributing](docs/compiler/contributing.md)

---

## Fuente: `typescript-book/docs/arrow-functions.md`

* [Funciones flecha](#arrow-functions)
* [Tip: Necesidad de función flecha](#tip-arrow-function-need)
* [Tip: Peligro en la función flecha](#tip-arrow-function-danger)
* [Tip: Librerías que usan `this`](#tip-arrow-functions-with-libraries-that-use-this)
* [Tip: Herencia en funciones flecha](#tip-arrow-functions-and-inheritance)
* [Tip: Devolución veloz de objeto](#tip-quick-object-return)

### Función flecha

Amorosamente llamadas *fat arrow* (flecha gorda), porque `->` es una flecha flaca y `=>` es una flecha gorda). También se la llama una *función lambda* (debido a otros lenguages). Otra característica comúnmente utilizada es la función de flecha gorda `()=>algo`. La motivación para una *flecha gorda* es:
1. No necesitas tipear `function` todo el tiempo
2. Captura el significado de `this` léxicamente
3. Caputra el significado de `arguments` léxicamente

Para un lenguage que dice ser funcional, en Javascript se suele tipear `function` bastante. La flecha gorda simplifica la creación de funciones

```ts
var inc = (x)=>x+1;
```
`this` ha sido, tradicionalmente, un punto doloroso en JavaScript. Como un hombre sabio una vez dijo: "Odio JavaScript ya que tiende a perder el significado de `this` fácilmente". Flechas gordas arreglan eso al capturar el significado de `this` del contexto que lo rodea. Considera la siguiente clase en puro JavaScript:

```ts
function Person(age) {
    this.age = age;
    this.growOld = function() {
        this.age++;
    }
}
var person = new Person(1);
setTimeout(person.growOld,1000);

setTimeout(function() { console.log(person.age); },2000); // 1, debería haber sido 2
```
Si corres este código en el navegador, `this` dentro de la función apuntará a `window` porque `window` va a ser lo que ejecute la función `growOld`. Una solución es utilizar una función flecha:
```ts
function Person(age) {
    this.age = age;
    this.growOld = () => {
        this.age++;
    }
}
var person = new Person(1);
setTimeout(person.growOld,1000);

setTimeout(function() { console.log(person.age); },2000); // 2
```
La razón por la que esto funciona es que la referencia a `this` es atrapada por la función flecha desde fuera del cuerpo de la función. Esto es equivalente al siguiente código JavaScript (que es lo que escribirías si no tuvieses TypeScript):
```ts
function Person(age) {
    this.age = age;
    var _this = this;  // captura this
    this.growOld = function() {
        _this.age++;   // usa el this capturado
    }
}
var person = new Person(1);
setTimeout(person.growOld,1000);

setTimeout(function() { console.log(person.age); },2000); // 2
```
Notemos que dado que estas utilizando TypeScript puedes combinar funciones flecha con clases:
```ts
class Person {
    constructor(public age:number) {}
    growOld = () => {
        this.age++;
    }
}
var person = new Person(1);
setTimeout(person.growOld,1000);

setTimeout(function() { console.log(person.age); },2000); // 2
```

> [Un gran video sobre este patrón 🌹](https://egghead.io/lessons/typescript-make-usages-of-this-safe-in-class-methods)

#### Tip: Necesidad de función flecha
Más alla de la brevedad de la sintaxis, solo *necesitas* utilizar la flecha gorda si vas a darle la función a alguien más para ser llamada. Es decir:
```ts
var growOld = person.growOld;
// Luego, alguien más lo llama:
growOld();
```
Si la vas a llamar vos mismo, es decir
```ts
person.growOld();
```
entonces `this` tendra el contexto de llamada correcto (en este ejemplo, `person`).

#### Tip: Peligro de la función flecha

De hecho, si quieres que `this` *sea el contexto de llamada, no deberías utilizar la función flecha* Este es el caso con callbacks usados por librerias como jquery, underscore, mocha y otras. Si la documentación menciona funciones en `this`, entonces probablemente deberías utiliar una `function` en lugar de una flecha gorda. Similarmente, si planeas utilizar `arguments`, no uses una función flecha.

#### Tip: Funciones flecha con librerías que utilizan `this`
Muchas librerias hacen esto. Por ejemplo, los iterables de `jQuery`(por ejemplo, https://api.jquery.com/jquery.each/) utilizarán `this`para pasar el objeto sobre el cual se está iterando. En este caos, so quieres acceder al `this` pasado por la libreria y, a la vez, al contexto externo, simplemente utiliza una variable temporal como `_self`, como harías en los casos sin funciones flecha.

```ts
let _self = this;
something.each(function() {
    console.log(_self); // El valor del ámbito léxico
    console.log(this); // el valor de la librería
});
```

#### Tip: Funciones flecha y herencia
Funciones flecha como propiedades en una clase funcionan bien con herencia:

```ts
class Adder {
    constructor(public a: number) {}
    add = (b: number): number => {
        return this.a + b;
    }
}
class Child extends Adder {
    callAdd(b: number) {
        return this.add(b);
    }
}
// Demo para mostrar como funciona
const child = new Child(123);
console.log(child.callAdd(123)); // 246
```

Sin embargo, no funcionan con la palabra clave `super` cuando tratas de reemplazar la función en una clase hija. Las propiedades van en `this`. Dado que hay un solo `this`, funciones de este tipo no pueden participar en una llamada a `super` (`super` solo funciona en prototipos) Puedes solucionar esta situación mediante la creación de una copia del método antes de reemplazarlo en la clase hija.

```ts
class Adder {
    constructor(public a: number) {}
    // Esta función es segura de pasar
    add = (b: number): number => {
        return this.a + b;
    }
}

class ExtendedAdder extends Adder {
    // Crear una copia del padre antes de reemplazar
    private superAdd = this.add;
    // Ahora reemplazar
    add = (b: number): number => {
        return this.superAdd(b);
    }
}
```

### Tip: Devolución veloz de objeto

A veces necesitas una función que simplemente devuelva un objeto literal simple. Sin embargo, algo como

```ts
// MANERA EQUIVOCADA DE HACERLO
var foo = () => {
    bar: 123
};
```
es procesado como un *bloque* que contiene una *etiqueta Javasviscript* en tiempo de ejecución de JavaScript (debido a la especificiación JavaScript)

>  Si eso no tiene sentido, no te preocupes, ya que recibirás un error de compilación de Typescript diiendo que hay una "etiqueta no utilizada". Las etiquetas son una característica vieja, y poco utilizada, de Javasript que puedes ignorar, ya que es considerada mala práctica por desarrolladores con experiencia 🌹.

Puedes solucionar esta situación al rodear al objeto literal con `()`:

```ts
// Correcto 🌹
var foo = () => ({
    bar: 123
});
```

---

## Fuente: `typescript-book/docs/async-await.md`

## Async Await

> [Un curso audiovisual PRO de egghead que cubre el mismo contentido](https://egghead.io/courses/async-await-using-typescript)

A modo de experimento mental, imaginate lo siguiente: una manera de decirle a de JavaScript que pause la ejecución del código al encontrarse con la palabra clave `await` utilizada en una promesa, y que resuma *únicamente* si la promesa devuelta de la función ha sido completada:

```ts
// No es código. Es un experimento mental.
async function foo() {
    try {
        var val = await getMeAPromise();
        console.log(val);
    }
    catch(err) {
        console.log('Error: ', err.message);
    }
}
```

Cuando la promesa se completa, la ejecución continua.
* Si la promesa fue resulta, entonces await devolverá el valor de la resolución
* Si la promesa fue rechazada, un error sincrónico que podremos manejar será tirado 

Esto convierte a la programación asincrónica tan fácil como la programación sincrónica. Se necesitan tres cosas para este experimento mental:
* La habilidad de *pausar* la ejecución de una función.
* La habilidad de *insertar un valor* en la función.
* La habilidad de *tirar una excepción dentro* de la función.

Esto es lo que los generadores permiten. El experimento mental *es real* y también lo es la implementación `async`/`await` en JavaSript y TypeScript. Detrás de escenas, usan generators.

### JS Generado

No tenes que entender esto, pero bastante simple si has [estudiado los generadores][generators]. La función `foo` puede ser envuelta de la siguiente manera:

```ts
const foo = wrapToReturnPromise(function* () {
    try {
        var val = yield getMeAPromise();
        console.log(val);
    }
    catch(err) {
        console.log('Error: ', err.message);
    }
});
```

En este caso `wrapToReturnPromise` simplemente ejecuta la función generadora para obtener el `generator` y luego usa `generator.next()`. Si el valor es una `promise`, entonces procederá a `then`+`catch` esa promesa, y dependiendo del resultado, llamaría `generator.next(result)` o `generator.throw(error)`. Eso es todo!


### Soporte para Async Await en TypeScript
**Async - Await** ha sido soportado por [TypeScript desde la versión 1.7](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-1-7.html).las funciones asincrónicas se prefijan con la palabra clave *async*; la palabra clave *await* suspende la ejecución hasta que una promesa es devuelta como completa de la función asincrónica. El valor de la *Promesa* es desenvuelto luego. En esta versión el soporte solo cubría **targets ES6** que transpilaran directamente a **generadores ES6**.

**TypeScript 2.1** [agregó la capacidad de soportar los tiempos de ejecución de ES3 y ES5](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-1.html). Es decir, podrás utilizar esta característica sin importar que ambiente estés utilizando. Es importante remarcar que podemos usar async / await con TypeScript 2.1 y que muchos navegadores están soportados mediante la implementación de un **polyfill para Promesas** global.

Veamos este **ejemplo** y consideremos este código para entender como la **notación** async / await de TypeScript funciona:

```ts
function delay(milliseconds: number, count: number): Promise<number> {
    return new Promise<number>(resolve => {
            setTimeout(() => {
                resolve(count);
            }, milliseconds);
        });
}

// Una función async siempre devuelve una Promesa
async function dramaticWelcome(): Promise<void> {
    console.log("Hello");

    for (let i = 0; i < 5; i++) {
        // await convierte la Promise<number> a un número
        const count:number = await delay(500, i);
        console.log(count);
    }

    console.log("World!");
}

dramaticWelcome();
```

**Transpiling to ES6 (--target es6)**
```js
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
function delay(milliseconds, count) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(count);
        }, milliseconds);
    });
}
// Una función async siempre devuelve una Promesa
function dramaticWelcome() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("Hello");
        for (let i = 0; i < 5; i++) {
            // await is converting Promise<number> into number
            const count = yield delay(500, i);
            console.log(count);
        }
        console.log("World!");
    });
}
dramaticWelcome();
```
Puedes ver el ejemplo completo [aquí][asyncawaites6code].


**Transpiling to ES5 (--target es5)**
```js
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(functionUna función async siempre devuelve una Promesa (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
function delay(milliseconds, count) {
    return new Promise(function (resolve) {
        setTimeout(function () {
            resolve(count);
        }, milliseconds);
    });
}
// Una función async siempre devuelve una Promesa
function dramaticWelcome() {
    return __awaiter(this, void 0, void 0, function () {
        var i, count;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log("Hello");
                    i = 0;
                    _a.label = 1;
                case 1:
                    if (!(i < 5)) return [3 /*break*/, 4];
                    return [4 /*yield*/, delay(500, i)];
                case 2:
                    count = _a.sent();
                    console.log(count);
                    _a.label = 3;
                case 3:
                    i++;
                    return [3 /*break*/, 1];
                case 4:
                    console.log("World!");
                    return [2 /*return*/];
            }
        });
    });
}
dramaticWelcome();
```
Puedes ver el ejempl completo [aquí][asyncawaites5code].


**Nota**: para ambos escenarios target, tenemso que asegurarons que nuestro tiempo de ejecución tenga disponible una Promesa que cumpla con los estándares ECMA-Script. Esto puede implicar tomar un polyfill de Promesas. También tenemos que asegurarons que TypeScript sepa que las Promesas existen configurando una bandera en la librería a algo como "dom", "es2015", o "dom", "es2015.promise, "es5". 
**Podemos mirar que navegadores soportan Promesas (nativas y pollyfilled)) [aquí](https://kangax.github.io/compat-table/es6/#test-Promise).**

[generators]:./generators.md
[asyncawaites5code]:https://cdn.rawgit.com/basarat/typescript-book/705e4496/code/async-await/es5/asyncAwaitES5.js
[asyncawaites6code]:https://cdn.rawgit.com/basarat/typescript-book/705e4496/code/async-await/es6/asyncAwaitES6.js

---

## Fuente: `typescript-book/docs/classes-emit.md`

#### Que pasa con la IIFE
El JS generado para la clase podría haber sido:
```ts
function Point(x, y) {
    this.x = x;
    this.y = y;
}
Point.prototype.add = function (point) {
    return new Point(this.x + point.x, this.y + point.y);
};
```
La razón por la cual está envuelto en una Función Invocada Inmediatamente (IIFE), como la siguiente

```ts
(function () {

    // BODY

    return Point;
})();
```

tiene que ver con el concepto de herencia. Le permite a JavaScript capturar la clase base como una variable `_super`. Por ejemplo

```ts
var Point3D = (function (_super) {
    __extends(Point3D, _super);
    function Point3D(x, y, z) {
        _super.call(this, x, y);
        this.z = z;
    }
    Point3D.prototype.add = function (point) {
        var point2D = _super.prototype.add.call(this, point);
        return new Point3D(point2D.x, point2D.y, this.z + point.z);
    };
    return Point3D;
})(Point);
```
Nota como la IIFE le permite a TypeScript capturar fácilmente la clase base `Point` en una variable `_super` y 
Notice that the IIFE allows TypeScript to easily capture the base class `Point` in a `_super` variable and that is used consistently in the class body.

### `__extends`
Notarás que apenas heredás una clase TypeScript también genera la siguiente función:

```ts
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
```
Aquí `d` hace referencia a la clase derivada y `b` hace referencia a la clase base. Esta función hace dos cosas:
1. Copia los miembros estáticos de la clase base a la clase hija, por ejemplo: `for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];`
2. prepara al prototipo de la clase hija  para buscar, opcionalmente, a los miembros del `proto` del padre. Es decir, `d.prototype.__proto__ = b.prototype`

La gente raramente tiene problemas entendiendo 1, pero mucha gente tiene dificultades con 2. Así que corresponde brindar una explicación.

#### `d.prototype.__proto__ = b.prototype`

Luego de haber enseñado este tema a mucha gente, encuentro que esta explicación es la más simple. Primero explicaremos como el código de `__extends` es equivalente a `d.prototype.__proto__ = b.prototype`, y luego por qué esta línea en si misma es importante. Para entender todo esto debes saber lo siguiente: 

1. `__proto__`
1. `prototype`
1. el efecto de `new` sobre `this` en la función llamda
1. el efecto de `new` en `prototype` y `__proto__`

Todos los objetos en JavaScript contienen un miembro `__proto__`. Este miembro suele no ser accesible en navegadores viejos (a veces la documentación se refiere a esta propiedad mágica como `[[prototype]]`). Tiene un objetivo: si la propiedad no se encuentra en un objeto durante la búsqueda (ejemplo, `obj.property`) entonce es buscada en `obj.__proto__.property`. Si tampoco es encontrada entonces es buscada en `obj.__proto__.__proto__.property` hasta que o *es encontrada* o *el últmo `__proto__` es nulo*. Esto explica por qué se dice que JavaScript soporta *herencia prototípica*. Esto se puede observar ne el siguiente ejemplo, que puedes correr en la consola de Chrome o en Node.js:

```ts
var foo = {}

// setup en foo y en foo.__proto__
foo.bar = 123;
foo.__proto__.bar = 456;

console.log(foo.bar); // 123
delete foo.bar; // eliminar del objeto
console.log(foo.bar); // 456
delete foo.__proto__.bar; // eliminar de foo.__proto__
console.log(foo.bar); // undefined
```

Así que ahora entendés `__proto__`. Otro dato útil es que todas las `funciones` en JavaScript tienen una propiedad llamada `prototype` y que esta tiene un miembro `constructor` que apunta de vuelta a la función. Eso se muestra a continuación:

```ts
function Foo() { }
console.log(Foo.prototype); // {}, es decir, existe y no es undefined
console.log(Foo.prototype.constructor === Foo); // Tiene un miembro `constructor`que apunta de vuelta a la función
```

Ahora consideremos el *efecto de `new` sobre `this` dentro de la función llamada*. Basicamente, `this` en la función llamda apuntará al nuevo objeto que será devuelto de la función. Es simple de observar si mutas una propiedad en `this` dentro de la función:

```ts
function Foo() {
    this.bar = 123;
}

// llamar con el nuevo operador
var newFoo = new Foo();
console.log(newFoo.bar); // 123
```

La únicao tra cosa que debes saber ahora es que llamar `new` en una función asigna al `prototype` de la función a el `__proto__` del nuevo objeto que es devuelto de la llamada de la función. Aquí está el código que tienes que correr para  entenderlo completamente:

```ts
function Foo() { }

var foo = new Foo();

console.log(foo.__proto__ === Foo.prototype); // Verdadero!
```

Eso es todo. Ahora mirá lo siguiente, sacado de `__extends~. Me tomé la libertad de numerar estas líneas:

```ts
1  function __() { this.constructor = d; }
2   __.prototype = b.prototype;
3   d.prototype = new __();
```

Leyendo esta función en el orden inverso, el `d.prototype = new __()` en la tercera línea significa `d.prototype = {__proto__: __.prototype}` (debido al efecto de `new` en `prototype` y `__proto__`), y al combinarlo con la línea anterior (línea 2 `__.prototype = b.prototype`) queda `d.prototype = {__proto__ : b.prototype}`.

Pero esperen, queríamos `d.prototype.__proto__`, es decir que solo el proto cambió y mantener el `d.prototype.constructor` anterior. En este punto cobra importancia la primera línea (`funcion __() { this.constructor = d; }).` En este punto tendremos `d.prototype = {__proto__ : __.prototype, constructor : d}` (debido al efecto de `new` sobre `this` dentro de la función llamada). Entonces, dado que restablecemos `d.prototype.constructor`, lo único que hemos mutado realmente es el `__proto__`, y por lo tanto, `d.prototype.__proto__ = b.prototype`.

#### significado de `d.prototype.__proto__ = b.prototype`

El significado es que te permite agregar funciones miembros a una clase hija y heredar otros de la clase base. Esto está demostrado en el siguiente ejemplo:

```ts
function Animal() { }
Animal.prototype.walk = function () { console.log('walk') };

function Bird() { }
Bird.prototype.__proto__ = Animal.prototype;
Bird.prototype.fly = function () { console.log('fly') };

var bird = new Bird();
bird.walk();
bird.fly();
```
Basicamente `bird.fly` será buscada de `bird.__proto__.fly` (acuerdate que `new` hace que `bird.__proto__` apunte a `Bird.prototype`) y `bird.wald` (un miembro heredado) será buscado de `bird.__proto__.__proto__.walk` (como `bird.__proto__ == Bird.prototype` y `bird.__proto__.__proto__` == `Animal.prototype`).

---

## Fuente: `typescript-book/docs/classes.md`

### Clases
Es importante tener clases en JavaScript como un ítem de primera clase ya que: 
1. [Ofrecen un nivel de abstracción estructural útil](./tips/classesAreUseful.md)
2. Proveen una forma consistente para que desarrolladores utilicen clases en lugar de que cada framework (emberjs, reactjs, etc) inventen su propia versión
3. Desarolladores orientados a objetos ya entienden como utilizarlas

Finalmente, desarrolladores JavaScript pueden *tener `class`*. Aquí tenemos una clase básica lladada Point:

```ts
class Point {
    x: number;
    y: number;
    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }
    add(point: Point) {
        return new Point(this.x + point.x, this.y + point.y);
    }
}

var p1 = new Point(0, 10);
var p2 = new Point(10, 20);
var p3 = p1.add(p2); // {x:10,y:30}
```
Esta clase genera el siguiente JavaScript al ser emitida a ES5:
```ts
var Point = (function () {
    function Point(x, y) {
        this.x = x;
        this.y = y;
    }
    Point.prototype.add = function (point) {
        return new Point(this.x + point.x, this.y + point.y);
    };
    return Point;
})();
```
Un patrón de clase tradicional y bastante idiomático de JavaScript ahora existe como un constructor de primera clase.

### Herencia
Las clases en TypeScript (como en otros lenguajes) soportan herencia *singular* utilizando la palabra clave `extends` como se ve a continuación:  

```ts
class Point3D extends Point {
    z: number;
    constructor(x: number, y: number, z: number) {
        super(x, y);
        this.z = z;
    }
    add(point: Point3D) {
        var point2D = super.add(point);
        return new Point3D(point2D.x, point2D.y, this.z + point.z);
    }
}
```
Si tienes un constructor en tu clase entonces *debes* llamar al contructor del constructor del padre (TypeScript te lo señalará). Esto asegur que las cosas que tienen que ser montadas en `this` son montadas. A continuación de la llamada a `super` puedes agregar cosas adicionales que quieras hacer en tu constructor (aquí agregamos un miembro `z`).

Nota que puedes anular las funciones del padre fácilmente (aquí anulamos `add`) y todavía utilizamos la funcionalidad de de la clase super en tus miembros (utilizando la sintaxis `super`)

### Estadísticas
las clases de TypeScript soportan propiedades `static` (estáticas) que son comppartidas por todas las instancias de la clase. Un lugar natural para ponerlas (y acceder a ellas) en es la clase misma, y eso es lo que TypeScript hace:

```ts
class Something {
    static instances = 0;
    constructor() {
        Something.instances++;
    }
}

var s1 = new Something();
var s2 = new Something();
console.log(Something.instances); // 2
```
Puedes tener tanto miembros como funciones estáticas

### Modificadores de acceso
TypeScript soporta los modificadores de acceso `public` (público), `private` (privado) y `protected` (protegido) los que determiann la accesibilidad de un miembro de una `class`:

| accessible on   | `public` | `protected` | `private` |
|-----------------|----------|-------------|-----------|
| clase           | si       | si          | si        |
| clase hija      | si       | si          | no        |
| clase instancia | si       | no          | no        |


Si un modificador de acceso no se encuentra especificado, es `public` implícitamente, ya que eso coincide con la naturaleza *conveniente* de Javascript 🌹.

Notemos que durante el tiempo de ejecución (en el JS generado) estos no tendrán significado, pero te darán errores de compilación si los utilizas incorrectamente. Mostramos un ejemplo de cada uno a continuación:

```ts
class FooBase {
    public x: number;
    private y: number;
    protected z: number;
}

// EFFECT ON INSTANCES
var foo = new FooBase();
foo.x; // okay
foo.y; // ERROR : private
foo.z; // ERROR : protected

// EFFECT ON CHILD CLASSES
class FooChild extends FooBase {
    constructor() {
      super();
        this.x; // okay
        this.y; // ERROR: private
        this.z; // okay
    }
}
```

Como siempre, estos modificadores funcionan para tanto propiedades como funciones de la clase.

### Abstract
Se puede considerar a `abstract` como un modificador de acceso. Lo presentamos en forma separada porque a diferencia de los modificadores mencionados previamente, puede encontrarse tanto en una clase como en cualquier miembro de la clase. Tener un modificador `abstract` significa que la funcionalidad *no puede ser invocada directamente* y una clase hija debe proveer la funcionalidad.

* **clases** `abstract` no pueden ser instanciadas directamente. En su lugar, el usuario debe crear una clase que hereda de la `abstract class`.
* **miembros** `abstract` no pueden ser accedidos directamente y una clase hija debe proveer la funcionalidad.

### El constructor es opcional

La clase no necesita tener un constructor. El siguiente ejemplo esta perfectamente bien:

```ts
class Foo {}
var foo = new Foo();
```

### Definir utilizando un constructor

Tener un miembro en una clase e inicializandolo de la siguiente manera: 

```ts
class Foo {
    x: number;
    constructor(x:number) {
        this.x = x;
    }
}
```
es un patrón tan común que TypeScript provee un atajo con el que podés prefijar el miembro con un *modificador de acceso* y es declarado automáticamente en la clase y copiado desde el constructor. Asi que el ejemplo anterior puede ser reescrito de la siguiente manera: (notá `public x:number`):

```ts
class Foo {
    constructor(public x:number) {
    }
}
```

### Inicializador de propiedades
Esta es una caracterísitica elegante soportada por TypeScript (pertenece a ES7, en realidad). Puedes inicializar cualquier mimebro de una clase por fuera del constructor, lo cual es útil para proveer valores default (nota `members = []`)

```ts
class Foo {
    members = [];  // Initialize directly
    add(x) {
        this.members.push(x);
    }
}
```

---

## Fuente: `typescript-book/docs/compiler/ast-tip-children.md`

### AST Tip: Visit Children

There is a utility function `ts.forEachChild` that allows you to visit all the child nodes of any Node in the AST.

Here is simplified snippet of the source code to demonstrate how it functions:

```ts

export function forEachChild<T>(node: Node, cbNode: (node: Node) => T, cbNodeArray?: (nodes: Node[]) => T): T {
        if (!node) {
            return;
        }
        switch (node.kind) {
            case SyntaxKind.BinaryExpression:
                return visitNode(cbNode, (<BinaryExpression>node).left) ||
                    visitNode(cbNode, (<BinaryExpression>node).operatorToken) ||
                    visitNode(cbNode, (<BinaryExpression>node).right);
            case SyntaxKind.IfStatement:
                return visitNode(cbNode, (<IfStatement>node).expression) ||
                    visitNode(cbNode, (<IfStatement>node).thenStatement) ||
                    visitNode(cbNode, (<IfStatement>node).elseStatement);

            // .... lots more
```

Basically, it checks `node.kind` and based on that assumes an interface offered by the `node` and calls the `cbNode` on the children. However, note that this function doesn't call `visitNode` for *all* children (e.g. SyntaxKind.SemicolonToken). If you want *all* the children of a node in the AST just call `.getChildren` member function of the `Node`.

E.g. here is a function that prints the verbose `AST` of a node:

```ts
function printAllChildren(node: ts.Node, depth = 0) {
    console.log(new Array(depth+1).join('----'), ts.syntaxKindToName(node.kind), node.pos, node.end);
    depth++;
    node.getChildren().forEach(c=> printAllChildren(c, depth));
}
```

We will see a sample usage of this function when we discuss the parser further.

---

## Fuente: `typescript-book/docs/compiler/ast-tip-syntaxkind.md`

### AST Tip: SyntaxKind

`SyntaxKind` is defined as a `const enum`, here is a sample:

```ts
export const enum SyntaxKind {
    Unknown,
    EndOfFileToken,
    SingleLineCommentTrivia,
    // ... LOTS more
```

It's a `const enum` (a concept [we covered previously](../enums.md)) so that it gets *inlined* (e.g. `ts.SyntaxKind.EndOfFileToken` becomes `1`) and we don't get a dereferencing cost when working with the AST. However, the compiler is compiled with `--preserveConstEnums` compiler flag so that the enum *is still available at runtime*. So in JavaScript you can use `ts.SyntaxKind.EndOfFileToken` if you want. Additionally you can convert these enum members to display strings using the following function:

```ts
export function syntaxKindToName(kind: ts.SyntaxKind) {
    return (<any>ts).SyntaxKind[kind];
}
```

---

## Fuente: `typescript-book/docs/compiler/ast-trivia.md`

### Trivia
Trivia (called that because it's `trivial`) represent the parts of the source text that are largely insignificant for normal understanding of the code. For example; whitespace, comments, and even conflict markers. Trivia is *not stored* in the AST (to keep it lightweight). However, it can be fetched *on demand* using a few `ts.*` APIs. 

Before we show them you need to understand the following:

#### Trivia Ownership
In General:
* A token owns any trivia after it on the *same* line *upto* the next token.
* Any comment *after that line* is associated with the following token.

For leading and ending comments in a file:
* The first token in the source file gets all the initial trivia.
* The last sequence of trivia in the file is tacked onto the end-of-file token, which otherwise has zero width.

#### Trivia APIs
For most basic uses, comments are the "interesting" trivia. The comments that belong to a Node can be fetched through the following functions:

Function | Description
---------|------------
`ts.getLeadingCommentRanges` | Given the source text and position within that text, returns ranges of comments between the first line break following the given position and the token itself (probably most useful with `ts.Node.getFullStart`).
`ts.getTrailingCommentRanges` | Given the source text and position within that text, returns ranges of comments until the first line break following the given position (probably most useful with `ts.Node.getEnd`).

As an example, imagine this portion of a source file:

```ts
debugger;/*hello*/
    //bye
  /*hi*/    function
```

`getLeadingCommentRanges` for the `function` will only return the last 2 comments `//bye` and `/*hi*/`.

Appropriately, calling `getTrailingCommentRanges` on the end of the debugger statement will extract the `/*hello*/` comment.

#### Token Start/Full Start
Nodes have what is called a "token start" and a "full start".

* Token Start: the more natural version, which is the position in file where the text of a token begins
* Full Start: the point at which the scanner began scanning since the last significant token

AST nodes have an API for `getStart` and `getFullStart`. In the following example:

```ts
debugger;/*hello*/
    //bye
  /*hi*/    function
```
for `function` the token start is at `function` whereas *full* start is at `/*hello*/`. Note that full start even includes the trivia that would otherwise be owned by the previous node.

---

## Fuente: `typescript-book/docs/compiler/ast.md`

## Node
The basic building block of the Abstract Syntax Tree (AST). In general a `Node` represents non-terminals in the language grammar; however, some terminals are kept in the tree such as identifiers and literals.

Two key things make up an AST node's documentation. The node's `SyntaxKind` which identifies its type within the AST, and its `interface`, the API the node provides when instantiated into the AST.

Here are a few key `interface Node` members:
* `TextRange` members that identify the node's `start` and `end` in the source file.
* `parent?: Node` the parent of the node in the AST.

There are other additional members for `Node` flags and modifiers etc. that you can lookup by searching `interface Node` in the source code but the ones we mentioned are vital for node traversal.

## SourceFile

* `SyntaxKind.SourceFile`
* `interface SourceFile`.

Each `SourceFile` is a top-level AST node that is contained in the `Program`.

---

## Fuente: `typescript-book/docs/compiler/binder-container.md`

### Container

An AST node can be a container. This determines the kinds of `SymbolTables` the Node and associated Symbol will have. Container is an abstract concept (i.e. has no associated data structure). The concept is driven by a few things, one being the `ContainerFlags` enum. The function `getContainerFlags` (in `binder.ts`) drives this flag and is presented below:

```ts
function getContainerFlags(node: Node): ContainerFlags {
    switch (node.kind) {
        case SyntaxKind.ClassExpression:
        case SyntaxKind.ClassDeclaration:
        case SyntaxKind.InterfaceDeclaration:
        case SyntaxKind.EnumDeclaration:
        case SyntaxKind.TypeLiteral:
        case SyntaxKind.ObjectLiteralExpression:
            return ContainerFlags.IsContainer;

        case SyntaxKind.CallSignature:
        case SyntaxKind.ConstructSignature:
        case SyntaxKind.IndexSignature:
        case SyntaxKind.MethodDeclaration:
        case SyntaxKind.MethodSignature:
        case SyntaxKind.FunctionDeclaration:
        case SyntaxKind.Constructor:
        case SyntaxKind.GetAccessor:
        case SyntaxKind.SetAccessor:
        case SyntaxKind.FunctionType:
        case SyntaxKind.ConstructorType:
        case SyntaxKind.FunctionExpression:
        case SyntaxKind.ArrowFunction:
        case SyntaxKind.ModuleDeclaration:
        case SyntaxKind.SourceFile:
        case SyntaxKind.TypeAliasDeclaration:
            return ContainerFlags.IsContainerWithLocals;

        case SyntaxKind.CatchClause:
        case SyntaxKind.ForStatement:
        case SyntaxKind.ForInStatement:
        case SyntaxKind.ForOfStatement:
        case SyntaxKind.CaseBlock:
            return ContainerFlags.IsBlockScopedContainer;

        case SyntaxKind.Block:
            // do not treat blocks directly inside a function as a block-scoped-container.
            // Locals that reside in this block should go to the function locals. Otherwise 'x'
            // would not appear to be a redeclaration of a block scoped local in the following
            // example:
            //
            //      function foo() {
            //          var x;
            //          let x;
            //      }
            //
            // If we placed 'var x' into the function locals and 'let x' into the locals of
            // the block, then there would be no collision.
            //
            // By not creating a new block-scoped-container here, we ensure that both 'var x'
            // and 'let x' go into the Function-container's locals, and we do get a collision
            // conflict.
            return isFunctionLike(node.parent) ? ContainerFlags.None : ContainerFlags.IsBlockScopedContainer;
    }

    return ContainerFlags.None;
}
```

It is *only* invoked from the binder's `bindChildren` function which sets up a node as a `container` and/or a `blockScopedContainer` depending upon the evaluation of the `getContainerFlags` function. The function `bindChildren` is presented below:

```ts
// All container nodes are kept on a linked list in declaration order. This list is used by
// the getLocalNameOfContainer function in the type checker to validate that the local name
// used for a container is unique.
function bindChildren(node: Node) {
    // Before we recurse into a node's children, we first save the existing parent, container
    // and block-container.  Then after we pop out of processing the children, we restore
    // these saved values.
    let saveParent = parent;
    let saveContainer = container;
    let savedBlockScopeContainer = blockScopeContainer;

    // This node will now be set as the parent of all of its children as we recurse into them.
    parent = node;

    // Depending on what kind of node this is, we may have to adjust the current container
    // and block-container.   If the current node is a container, then it is automatically
    // considered the current block-container as well.  Also, for containers that we know
    // may contain locals, we proactively initialize the .locals field. We do this because
    // it's highly likely that the .locals will be needed to place some child in (for example,
    // a parameter, or variable declaration).
    //
    // However, we do not proactively create the .locals for block-containers because it's
    // totally normal and common for block-containers to never actually have a block-scoped
    // variable in them.  We don't want to end up allocating an object for every 'block' we
    // run into when most of them won't be necessary.
    //
    // Finally, if this is a block-container, then we clear out any existing .locals object
    // it may contain within it.  This happens in incremental scenarios.  Because we can be
    // reusing a node from a previous compilation, that node may have had 'locals' created
    // for it.  We must clear this so we don't accidentally move any stale data forward from
    // a previous compilation.
    let containerFlags = getContainerFlags(node);
    if (containerFlags & ContainerFlags.IsContainer) {
        container = blockScopeContainer = node;

        if (containerFlags & ContainerFlags.HasLocals) {
            container.locals = {};
        }

        addToContainerChain(container);
    }

    else if (containerFlags & ContainerFlags.IsBlockScopedContainer) {
        blockScopeContainer = node;
        blockScopeContainer.locals = undefined;
    }

    forEachChild(node, bind);

    container = saveContainer;
    parent = saveParent;
    blockScopeContainer = savedBlockScopeContainer;
}
```

As you might recall from the section on binder functions : `bindChildren` is called from the `bind` function. So we have the recursive binding setup : `bind` calls `bindChildren` calls `bind` for each child.

---

## Fuente: `typescript-book/docs/compiler/binder-declarations.md`

### Symbols and Declarations
Linking between a `node` and a `symbol` is performed by a few functions. One function that is used to bind the `SourceFile` node to the source file Symbol (in case of an external module) is the `addDeclarationToSymbol` function

Note : the `Symbol` for an external module source file is setup as `flags : SymbolFlags.ValueModule` and `name: '"' + removeFileExtension(file.fileName) + '"'`).

```ts
function addDeclarationToSymbol(symbol: Symbol, node: Declaration, symbolFlags: SymbolFlags) {
    symbol.flags |= symbolFlags;

    node.symbol = symbol;

    if (!symbol.declarations) {
        symbol.declarations = [];
    }
    symbol.declarations.push(node);

    if (symbolFlags & SymbolFlags.HasExports && !symbol.exports) {
        symbol.exports = {};
    }

    if (symbolFlags & SymbolFlags.HasMembers && !symbol.members) {
        symbol.members = {};
    }

    if (symbolFlags & SymbolFlags.Value && !symbol.valueDeclaration) {
        symbol.valueDeclaration = node;
    }
}
```

The important linking portions:
* Creates a link to the Symbol from the AST node (`node.symbol`).
* Adds the node as *one of* the declarations of the Symbol (`symbol.declarations`).

#### Declaration
Declaration is just a `node` with an optional name. In `types.ts`

```ts
interface Declaration extends Node {
    _declarationBrand: any;
    name?: DeclarationName;
}
```

---

## Fuente: `typescript-book/docs/compiler/binder-diagnostics.md`

### Binder Error Reporting

Binding errors are added to the sourceFile's list of `bindDiagnostics`.

An example error detected during binding is the use of `eval` or `arguments` as a variable name in `use strict` scenario. The relevant code is presented in its entirety below (`checkStrictModeEvalOrArguments` is called from multiple places, call stacks originating from `bindWorker` which calls different functions for different node `SyntaxKind`):

```ts
function checkStrictModeEvalOrArguments(contextNode: Node, name: Node) {
    if (name && name.kind === SyntaxKind.Identifier) {
        let identifier = <Identifier>name;
        if (isEvalOrArgumentsIdentifier(identifier)) {
            // We check first if the name is inside class declaration or class expression; if so give explicit message
            // otherwise report generic error message.
            let span = getErrorSpanForNode(file, name);
            file.bindDiagnostics.push(createFileDiagnostic(file, span.start, span.length,
                getStrictModeEvalOrArgumentsMessage(contextNode), identifier.text));
        }
    }
}

function isEvalOrArgumentsIdentifier(node: Node): boolean {
    return node.kind === SyntaxKind.Identifier &&
        ((<Identifier>node).text === "eval" || (<Identifier>node).text === "arguments");
}

function getStrictModeEvalOrArgumentsMessage(node: Node) {
    // Provide specialized messages to help the user understand why we think they're in
    // strict mode.
    if (getContainingClass(node)) {
        return Diagnostics.Invalid_use_of_0_Class_definitions_are_automatically_in_strict_mode;
    }

    if (file.externalModuleIndicator) {
        return Diagnostics.Invalid_use_of_0_Modules_are_automatically_in_strict_mode;
    }

    return Diagnostics.Invalid_use_of_0_in_strict_mode;
}
```

---

## Fuente: `typescript-book/docs/compiler/binder-functions.md`

### Binder function
Two critical binder functions are `bindSourceFile` and `mergeSymbolTable`. We will take a look at these next.

#### `bindSourceFile`
Basically checks if `file.locals` is defined, if not it hands over to (a local function) `bind`.

Note: `locals` is defined on `Node` and is of type `SymbolTable`. Note that `SourceFile` is also a `Node` (in fact a root node in the AST).

TIP: local functions are used heavily within the TypeScript compiler. A local function very likely uses variables from the parent function (captured by closure). In the case of `bind` (a local function within `bindSourceFile`) it (or a function it calls) will setup the `symbolCount` and `classifiableNames` among others, that are then stored on the returned `SourceFile`.

#### `bind`
Bind takes any `Node` (not just `SourceFile`). First thing it does is assign the `node.parent` (if `parent` variable has been setup ... which again is something the binder does during its processing within the `bindChildren` function), then hands off to `bindWorker` which does the *heavy* lifting. Finally it calls `bindChildren` (a function that simply stores the binder state e.g. current `parent` within its function local vars, then calls `bind` on each child, and then restores the binder state). Now let's look at `bindWorker` which is the more interesting function.

#### `bindWorker`
This function switches on `node.kind` (of type `SyntaxKind`) and delegates work to the appropriate `bindFoo` function (also defined within `binder.ts`). For example if the `node` is a `SourceFile` it calls (eventually and only if its an external file module) `bindAnonymousDeclaration`

#### `bindFoo` functions
There are a few patterns common to `bindFoo` functions as well as some utility functions that these use. One function that is almost always used is the `createSymbol` function. It is presented in its entirety below:

```ts
function createSymbol(flags: SymbolFlags, name: string): Symbol {
    symbolCount++;
    return new Symbol(flags, name);
}
```
As you can see it is simply keeping the `symbolCount` (a local to `bindSourceFile`) up to date and creating the symbol with the specified parameters.

---

## Fuente: `typescript-book/docs/compiler/binder-symbolflags.md`

### SymbolFlags
Symbols have `SymbolFlags`. Below we have them in their verbatim, as of TypeScript 2.2

```ts
    export const enum SymbolFlags {
        None                    = 0,
        FunctionScopedVariable  = 1 << 0,   // Variable (var) or parameter
        BlockScopedVariable     = 1 << 1,   // A block-scoped variable (let or const)
        Property                = 1 << 2,   // Property or enum member
        EnumMember              = 1 << 3,   // Enum member
        Function                = 1 << 4,   // Function
        Class                   = 1 << 5,   // Class
        Interface               = 1 << 6,   // Interface
        ConstEnum               = 1 << 7,   // Const enum
        RegularEnum             = 1 << 8,   // Enum
        ValueModule             = 1 << 9,   // Instantiated module
        NamespaceModule         = 1 << 10,  // Uninstantiated module
        TypeLiteral             = 1 << 11,  // Type Literal or mapped type
        ObjectLiteral           = 1 << 12,  // Object Literal
        Method                  = 1 << 13,  // Method
        Constructor             = 1 << 14,  // Constructor
        GetAccessor             = 1 << 15,  // Get accessor
        SetAccessor             = 1 << 16,  // Set accessor
        Signature               = 1 << 17,  // Call, construct, or index signature
        TypeParameter           = 1 << 18,  // Type parameter
        TypeAlias               = 1 << 19,  // Type alias
        ExportValue             = 1 << 20,  // Exported value marker (see comment in declareModuleMember in binder)
        ExportType              = 1 << 21,  // Exported type marker (see comment in declareModuleMember in binder)
        ExportNamespace         = 1 << 22,  // Exported namespace marker (see comment in declareModuleMember in binder)
        Alias                   = 1 << 23,  // An alias for another symbol (see comment in isAliasSymbolDeclaration in checker)
        Prototype               = 1 << 24,  // Prototype property (no source representation)
        ExportStar              = 1 << 25,  // Export * declaration
        Optional                = 1 << 26,  // Optional property
        Transient               = 1 << 27,  // Transient symbol (created during type check)

        Enum = RegularEnum | ConstEnum,
        Variable = FunctionScopedVariable | BlockScopedVariable,
        Value = Variable | Property | EnumMember | Function | Class | Enum | ValueModule | Method | GetAccessor | SetAccessor,
        Type = Class | Interface | Enum | EnumMember | TypeLiteral | ObjectLiteral | TypeParameter | TypeAlias,
        Namespace = ValueModule | NamespaceModule | Enum,
        Module = ValueModule | NamespaceModule,
        Accessor = GetAccessor | SetAccessor,

        // Variables can be redeclared, but can not redeclare a block-scoped declaration with the
        // same name, or any other value that is not a variable, e.g. ValueModule or Class
        FunctionScopedVariableExcludes = Value & ~FunctionScopedVariable,

        // Block-scoped declarations are not allowed to be re-declared
        // they can not merge with anything in the value space
        BlockScopedVariableExcludes = Value,

        ParameterExcludes = Value,
        PropertyExcludes = None,
        EnumMemberExcludes = Value | Type,
        FunctionExcludes = Value & ~(Function | ValueModule),
        ClassExcludes = (Value | Type) & ~(ValueModule | Interface), // class-interface mergability done in checker.ts
        InterfaceExcludes = Type & ~(Interface | Class),
        RegularEnumExcludes = (Value | Type) & ~(RegularEnum | ValueModule), // regular enums merge only with regular enums and modules
        ConstEnumExcludes = (Value | Type) & ~ConstEnum, // const enums merge only with const enums
        ValueModuleExcludes = Value & ~(Function | Class | RegularEnum | ValueModule),
        NamespaceModuleExcludes = 0,
        MethodExcludes = Value & ~Method,
        GetAccessorExcludes = Value & ~SetAccessor,
        SetAccessorExcludes = Value & ~GetAccessor,
        TypeParameterExcludes = Type & ~TypeParameter,
        TypeAliasExcludes = Type,
        AliasExcludes = Alias,

        ModuleMember = Variable | Function | Class | Interface | Enum | Module | TypeAlias | Alias,

        ExportHasLocal = Function | Class | Enum | ValueModule,

        HasExports = Class | Enum | Module,
        HasMembers = Class | Interface | TypeLiteral | ObjectLiteral,

        BlockScoped = BlockScopedVariable | Class | Enum,

        PropertyOrAccessor = Property | Accessor,
        Export = ExportNamespace | ExportType | ExportValue,

        ClassMember = Method | Accessor | Property,

        /* @internal */
        // The set of things we consider semantically classifiable.  Used to speed up the LS during
        // classification.
        Classifiable = Class | Enum | TypeAlias | Interface | TypeParameter | Module,
    }
```

#### ValueModule
`ValueModule // Instantiated module` is the SymbolFlag used for `SourceFile` if it an external module.

---

## Fuente: `typescript-book/docs/compiler/binder-symboltable.md`

### SymbolTable

SymbolTable is implemented as a simple HashMap. Here is the interface (`types.ts`):

```ts
interface SymbolTable {
    [index: string]: Symbol;
}
```

SymbolTables are initialized by binding. There are a few SymbolTables used by the compiler:

On `Node`:
```ts
locals?: SymbolTable;                   // Locals associated with node
```

On `Symbol`:

```ts
members?: SymbolTable;                  // Class, interface or literal instance members
exports?: SymbolTable;                  // Module exports
```

Note: We saw `locals` getting initialized (to `{}`) by `bindChildren` based on `ContainerFlags`.

#### SymbolTable population
SymbolTables are populated with `Symbols` primarily by a call to `declareSymbol`. This function is presented below in entirety:

```ts
/**
 * Declares a Symbol for the node and adds it to symbols. Reports errors for conflicting identifier names.
 * @param symbolTable - The symbol table which node will be added to.
 * @param parent - node's parent declaration.
 * @param node - The declaration to be added to the symbol table
 * @param includes - The SymbolFlags that node has in addition to its declaration type (eg: export, ambient, etc.)
 * @param excludes - The flags which node cannot be declared alongside in a symbol table. Used to report forbidden declarations.
 */
function declareSymbol(symbolTable: SymbolTable, parent: Symbol, node: Declaration, includes: SymbolFlags, excludes: SymbolFlags): Symbol {
    Debug.assert(!hasDynamicName(node));

    // The exported symbol for an export default function/class node is always named "default"
    let name = node.flags & NodeFlags.Default && parent ? "default" : getDeclarationName(node);

    let symbol: Symbol;
    if (name !== undefined) {

        // Check and see if the symbol table already has a symbol with this name.  If not,
        // create a new symbol with this name and add it to the table.  Note that we don't
        // give the new symbol any flags *yet*.  This ensures that it will not conflict
        // with the 'excludes' flags we pass in.
        //
        // If we do get an existing symbol, see if it conflicts with the new symbol we're
        // creating.  For example, a 'var' symbol and a 'class' symbol will conflict within
        // the same symbol table.  If we have a conflict, report the issue on each
        // declaration we have for this symbol, and then create a new symbol for this
        // declaration.
        //
        // If we created a new symbol, either because we didn't have a symbol with this name
        // in the symbol table, or we conflicted with an existing symbol, then just add this
        // node as the sole declaration of the new symbol.
        //
        // Otherwise, we'll be merging into a compatible existing symbol (for example when
        // you have multiple 'vars' with the same name in the same container).  In this case
        // just add this node into the declarations list of the symbol.
        symbol = hasProperty(symbolTable, name)
            ? symbolTable[name]
            : (symbolTable[name] = createSymbol(SymbolFlags.None, name));

        if (name && (includes & SymbolFlags.Classifiable)) {
            classifiableNames[name] = name;
        }

        if (symbol.flags & excludes) {
            if (node.name) {
                node.name.parent = node;
            }

            // Report errors every position with duplicate declaration
            // Report errors on previous encountered declarations
            let message = symbol.flags & SymbolFlags.BlockScopedVariable
                ? Diagnostics.Cannot_redeclare_block_scoped_variable_0
                : Diagnostics.Duplicate_identifier_0;
            forEach(symbol.declarations, declaration => {
                file.bindDiagnostics.push(createDiagnosticForNode(declaration.name || declaration, message, getDisplayName(declaration)));
            });
            file.bindDiagnostics.push(createDiagnosticForNode(node.name || node, message, getDisplayName(node)));

            symbol = createSymbol(SymbolFlags.None, name);
        }
    }
    else {
        symbol = createSymbol(SymbolFlags.None, "__missing");
    }

    addDeclarationToSymbol(symbol, node, includes);
    symbol.parent = parent;

    return symbol;
}
```

Which SymbolTable is populated is driven by the first argument to this function. e.g. when adding a declaration to a *container* of kind `SyntaxKind.ClassDeclaration` or `SyntaxKind.ClassExpression` the function `declareClassMember` will get called which has the following code:

```ts
function declareClassMember(node: Declaration, symbolFlags: SymbolFlags, symbolExcludes: SymbolFlags) {
    return node.flags & NodeFlags.Static
        ? declareSymbol(container.symbol.exports, container.symbol, node, symbolFlags, symbolExcludes)
        : declareSymbol(container.symbol.members, container.symbol, node, symbolFlags, symbolExcludes);
}
```

---

## Fuente: `typescript-book/docs/compiler/binder.md`

## Binder
Most JavaScript transpilers out there are simpler than TypeScript because they provide little in the way of code analysis. The typical JavaScript transpilers only have the following flow:

```ts
SourceCode ~~Scanner~~> Tokens ~~Parser~~> AST ~~Emitter~~> JavaScript
```

While the above architecture is true as a simplified understanding of TypeScript js generation, a key feature of TypeScript is its *Semantic* system. In order to assist type checking (performed by the `checker`), the `binder` (in `binder.ts`) is used to connect the various parts of the source code into a coherent type system that can then be used by the `checker`. The main responsibility of the binder is to create _Symbols_.

### Symbol
Symbols connect declaration nodes in the AST to other declarations contributing to the same entity. Symbols are the basic building blocks of the Semantic system. The symbol constructor is defined in `core.ts` (and `binder` actually uses the `objectAllocator.getSymbolConstructor` to get its hands on it). Here is the symbol constructor:

```ts
function Symbol(flags: SymbolFlags, name: string) {
    this.flags = flags;
    this.name = name;
    this.declarations = undefined;
}
```

`SymbolFlags` is a flag enum and is really used to identify additional classifications of the symbol (e.g. variable scope flags `FunctionScopedVariable` or `BlockScopedVariable` among others)

### Usage by Checker
The `binder` is actually used internally by the type `checker` which in turn is used by the `program`. The simplified call stack looks like:
```
program.getTypeChecker ->
    ts.createTypeChecker (in checker)->
        initializeTypeChecker (in checker) ->
            for each SourceFile `ts.bindSourceFile` (in binder)
            // followed by
            for each SourceFile `ts.mergeSymbolTable` (in checker)
```
The unit of work for the binder is a SourceFile. The `binder.ts` is driven by `checker.ts`.

---

## Fuente: `typescript-book/docs/compiler/checker-diagnostics.md`

### Checker error reporting
The checker uses the local `error` function to report errors. Here is the function:

```ts
function error(location: Node, message: DiagnosticMessage, arg0?: any, arg1?: any, arg2?: any): void {
    let diagnostic = location
        ? createDiagnosticForNode(location, message, arg0, arg1, arg2)
        : createCompilerDiagnostic(message, arg0, arg1, arg2);
    diagnostics.add(diagnostic);
}
```

---

## Fuente: `typescript-book/docs/compiler/checker-global.md`

### Global Namespace Merging
Within `initializeTypeChecker` the following code exists:

```ts
// Initialize global symbol table
forEach(host.getSourceFiles(), file => {
    if (!isExternalModule(file)) {
        mergeSymbolTable(globals, file.locals);
    }
});
```

Which basically merges all the `global` symbols into the `let globals: SymbolTable = {};` (in `createTypeChecker`) SymbolTable. `mergeSymbolTable` primarily calls `mergeSymbol`.

---

## Fuente: `typescript-book/docs/compiler/checker.md`

## Checker
Like we mentioned before *checker* is the thing that makes TypeScript uniquely more powerful than *just another JavaScript transpiler*. The checker is located in `checker.ts` and at this moment it is 23k+ lines of TypeScript (largest part of the compiler).

### Usage by Program
The `checker` is initialized by `program`. The following is a sampling of the call stack (we showed the same one when looking at `binder`):

```
program.getTypeChecker ->
    ts.createTypeChecker (in checker)->
        initializeTypeChecker (in checker) ->
            for each SourceFile `ts.bindSourceFile` (in binder)
            // followed by
            for each SourceFile `ts.mergeSymbolTable` (in checker)
```

### Association with Emitter
True type checking happens once a call is made to `getDiagnostics`. This function is called e.g. once a request is made to `Program.emit`, in which case the checker returns an `EmitResolver` (program calls the checkers `getEmitResolver` function) which is just a set of functions local to `createTypeChecker`. We will mention this again when we look at the emitter.

Here is the call stack right down to `checkSourceFile` (a function local to `createTypeChecker`).

```
program.emit ->
    emitWorker (program local) ->
        createTypeChecker.getEmitResolver ->
            // First call the following functions local to createTypeChecker
            call getDiagnostics ->
                getDiagnosticsWorker ->
                    checkSourceFile

            // then
            return resolver
            (already initialized in createTypeChecker using a call to local createResolver())
```

---

## Fuente: `typescript-book/docs/compiler/contributing.md`

## Contributing

TypeScript is [OSS and on GitHub](https://github.com/Microsoft/TypeScript) and the team welcomes community input.

### Setup
Super easy:

```bash
git clone https://github.com/Microsoft/TypeScript.git
cd TypeScript
npm install -g jake
npm install
```

### Setup Fork
You would obviously need to setup Microsoft/TypeScript as an `upstream` remote and your own *fork* (use the GitHub *fork* button) as `origin`:

```bash
git remote rm origin
git remote rm upstream
git remote add upstream https://github.com/Microsoft/TypeScript.git
git remote add origin https://github.com/basarat/TypeScript.git
```
Additionally I like to work off branches like `bas/` to have it show up cleaner in the branch listings.

### Running Tests
There are lots of `test` and `build` options in their JakeFile. You can run *all* tests with `jake runtests`

### Baselines
Baselines are used to manage if there are any changes in the *expected* output of the TypeScript compiler. Baselines are located in `tests/baselines`.

* Reference (*expected*) baselines: `tests/baselines/reference`
* Generated (*in this test run*) baselines : `tests/baselines/local` (this folder is in **.gitignore**)

> If there are any differences between these folders tests will fail. You can diff the two folders with tools like BeyondCompare or KDiff3.

If you think these changes in generated files are valid then accept baselines using `jake baseline-accept`. The changes to `reference` baselines will now show as a git diff you can commit.

> Note that if you don't run *all* tests then use `jake baseline-accept[soft]` which will only copy over the new files and not delete the whole `reference` directory.

### Test Categories

There are different categories for different scenarios and even different test infrastructures. Here are a few of these explained.

#### Compiler Tests

These ensure that compiling a file :

* generates errors as expected
* generated JS as expected
* types are identified as expected
* symbols are identified as expected

These expectations are validated using the baselines infrastructure.

##### Creating a Compiler Test
Test can be created by adding a new file `yourtest.ts` to `tests/cases/compiler`. As soon as you do so and run the tests you should get baseline failure. Accept these baselines (to get them to show up in git), and tweak them to be what you *expect* them to be ... now get the tests to pass.

Run all of these in isolation using `jake runtests tests=compiler`, or just your new file using `jake runtests tests=compiler/yourtest`

I will even often do `jake runtests tests=compiler/yourtest || jake baseline-accept[soft]` and get the diff in `git`.

### Debugging Tests

`jake runtests-browser tests=theNameOfYourTest` and debugging in-browser usually works pretty well.

### More 
* An article by Remo : https://dev.to/remojansen/learn-how-to-contribute-to-the-typescript-compiler-on-github-through-a-real-world-example-4df0 🌹

---

## Fuente: `typescript-book/docs/compiler/emitter-functions.md`

### `emitFiles`
Defined in `emitter.ts` here is the function signature:
```ts
// targetSourceFile is when users only want one file in entire project to be emitted. This is used in compileOnSave feature
export function emitFiles(resolver: EmitResolver, host: EmitHost, targetSourceFile?: SourceFile): EmitResult {
```

`EmitHost` is just a simplified (as in narrowed down) version of `CompilerHost` (and is at runtime actually a `CompilerHost` for many use cases).

The most interesting call stack from `emitFiles` is the following:

```
emitFiles ->
    emitFile(jsFilePath, targetSourceFile) ->
        emitJavaScript(jsFilePath, targetSourceFile);
```

### `emitJavaScript`
There is a lot of good comments in this function so we present it below :

```ts
function emitJavaScript(jsFilePath: string, root?: SourceFile) {
    let writer = createTextWriter(newLine);
    let write = writer.write;
    let writeTextOfNode = writer.writeTextOfNode;
    let writeLine = writer.writeLine;
    let increaseIndent = writer.increaseIndent;
    let decreaseIndent = writer.decreaseIndent;

    let currentSourceFile: SourceFile;
    // name of an exporter function if file is a System external module
    // System.register([...], function (<exporter>) {...})
    // exporting in System modules looks like:
    // export var x; ... x = 1
    // =>
    // var x;... exporter("x", x = 1)
    let exportFunctionForFile: string;

    let generatedNameSet: Map<string> = {};
    let nodeToGeneratedName: string[] = [];
    let computedPropertyNamesToGeneratedNames: string[];

    let extendsEmitted = false;
    let decorateEmitted = false;
    let paramEmitted = false;
    let awaiterEmitted = false;
    let tempFlags = 0;
    let tempVariables: Identifier[];
    let tempParameters: Identifier[];
    let externalImports: (ImportDeclaration | ImportEqualsDeclaration | ExportDeclaration)[];
    let exportSpecifiers: Map<ExportSpecifier[]>;
    let exportEquals: ExportAssignment;
    let hasExportStars: boolean;

    /** Write emitted output to disk */
    let writeEmittedFiles = writeJavaScriptFile;

    let detachedCommentsInfo: { nodePos: number; detachedCommentEndPos: number }[];

    let writeComment = writeCommentRange;

    /** Emit a node */
    let emit = emitNodeWithoutSourceMap;

    /** Called just before starting emit of a node */
    let emitStart = function (node: Node) { };

    /** Called once the emit of the node is done */
    let emitEnd = function (node: Node) { };

    /** Emit the text for the given token that comes after startPos
      * This by default writes the text provided with the given tokenKind
      * but if optional emitFn callback is provided the text is emitted using the callback instead of default text
      * @param tokenKind the kind of the token to search and emit
      * @param startPos the position in the source to start searching for the token
      * @param emitFn if given will be invoked to emit the text instead of actual token emit */
    let emitToken = emitTokenText;

    /** Called to before starting the lexical scopes as in function/class in the emitted code because of node
      * @param scopeDeclaration node that starts the lexical scope
      * @param scopeName Optional name of this scope instead of deducing one from the declaration node */
    let scopeEmitStart = function(scopeDeclaration: Node, scopeName?: string) { };

    /** Called after coming out of the scope */
    let scopeEmitEnd = function() { };

    /** Sourcemap data that will get encoded */
    let sourceMapData: SourceMapData;

    if (compilerOptions.sourceMap || compilerOptions.inlineSourceMap) {
        initializeEmitterWithSourceMaps();
    }

    if (root) {
        // Do not call emit directly. It does not set the currentSourceFile.
        emitSourceFile(root);
    }
    else {
        forEach(host.getSourceFiles(), sourceFile => {
            if (!isExternalModuleOrDeclarationFile(sourceFile)) {
                emitSourceFile(sourceFile);
            }
        });
    }

    writeLine();
    writeEmittedFiles(writer.getText(), /*writeByteOrderMark*/ compilerOptions.emitBOM);
    return;

    /// BUNCH OF LOCAL FUNCTIONS
}
```

Basically it sets up a bunch of locals (these functions form the *bulk* of `emitter.ts`) and then hands off to a local function `emitSourceFile` which kicks off the emit. The `emitSourceFile` function just sets up the `currentSourceFile` and in turn hands off to a local `emit` function.

```ts
function emitSourceFile(sourceFile: SourceFile): void {
    currentSourceFile = sourceFile;
    exportFunctionForFile = undefined;
    emit(sourceFile);
}
```

The `emit` function handles *comment* emit + *actual JavaScript* emit. The *actual JavaScript* emit is the job of `emitJavaScriptWorker` function.

### `emitJavaScriptWorker`

The complete function:
```ts
function emitJavaScriptWorker(node: Node) {
    // Check if the node can be emitted regardless of the ScriptTarget
    switch (node.kind) {
        case SyntaxKind.Identifier:
            return emitIdentifier(<Identifier>node);
        case SyntaxKind.Parameter:
            return emitParameter(<ParameterDeclaration>node);
        case SyntaxKind.MethodDeclaration:
        case SyntaxKind.MethodSignature:
            return emitMethod(<MethodDeclaration>node);
        case SyntaxKind.GetAccessor:
        case SyntaxKind.SetAccessor:
            return emitAccessor(<AccessorDeclaration>node);
        case SyntaxKind.ThisKeyword:
            return emitThis(node);
        case SyntaxKind.SuperKeyword:
            return emitSuper(node);
        case SyntaxKind.NullKeyword:
            return write("null");
        case SyntaxKind.TrueKeyword:
            return write("true");
        case SyntaxKind.FalseKeyword:
            return write("false");
        case SyntaxKind.NumericLiteral:
        case SyntaxKind.StringLiteral:
        case SyntaxKind.RegularExpressionLiteral:
        case SyntaxKind.NoSubstitutionTemplateLiteral:
        case SyntaxKind.TemplateHead:
        case SyntaxKind.TemplateMiddle:
        case SyntaxKind.TemplateTail:
            return emitLiteral(<LiteralExpression>node);
        case SyntaxKind.TemplateExpression:
            return emitTemplateExpression(<TemplateExpression>node);
        case SyntaxKind.TemplateSpan:
            return emitTemplateSpan(<TemplateSpan>node);
        case SyntaxKind.JsxElement:
        case SyntaxKind.JsxSelfClosingElement:
            return emitJsxElement(<JsxElement|JsxSelfClosingElement>node);
        case SyntaxKind.JsxText:
            return emitJsxText(<JsxText>node);
        case SyntaxKind.JsxExpression:
            return emitJsxExpression(<JsxExpression>node);
        case SyntaxKind.QualifiedName:
            return emitQualifiedName(<QualifiedName>node);
        case SyntaxKind.ObjectBindingPattern:
            return emitObjectBindingPattern(<BindingPattern>node);
        case SyntaxKind.ArrayBindingPattern:
            return emitArrayBindingPattern(<BindingPattern>node);
        case SyntaxKind.BindingElement:
            return emitBindingElement(<BindingElement>node);
        case SyntaxKind.ArrayLiteralExpression:
            return emitArrayLiteral(<ArrayLiteralExpression>node);
        case SyntaxKind.ObjectLiteralExpression:
            return emitObjectLiteral(<ObjectLiteralExpression>node);
        case SyntaxKind.PropertyAssignment:
            return emitPropertyAssignment(<PropertyDeclaration>node);
        case SyntaxKind.ShorthandPropertyAssignment:
            return emitShorthandPropertyAssignment(<ShorthandPropertyAssignment>node);
        case SyntaxKind.ComputedPropertyName:
            return emitComputedPropertyName(<ComputedPropertyName>node);
        case SyntaxKind.PropertyAccessExpression:
            return emitPropertyAccess(<PropertyAccessExpression>node);
        case SyntaxKind.ElementAccessExpression:
            return emitIndexedAccess(<ElementAccessExpression>node);
        case SyntaxKind.CallExpression:
            return emitCallExpression(<CallExpression>node);
        case SyntaxKind.NewExpression:
            return emitNewExpression(<NewExpression>node);
        case SyntaxKind.TaggedTemplateExpression:
            return emitTaggedTemplateExpression(<TaggedTemplateExpression>node);
        case SyntaxKind.TypeAssertionExpression:
            return emit((<TypeAssertion>node).expression);
        case SyntaxKind.AsExpression:
            return emit((<AsExpression>node).expression);
        case SyntaxKind.ParenthesizedExpression:
            return emitParenExpression(<ParenthesizedExpression>node);
        case SyntaxKind.FunctionDeclaration:
        case SyntaxKind.FunctionExpression:
        case SyntaxKind.ArrowFunction:
            return emitFunctionDeclaration(<FunctionLikeDeclaration>node);
        case SyntaxKind.DeleteExpression:
            return emitDeleteExpression(<DeleteExpression>node);
        case SyntaxKind.TypeOfExpression:
            return emitTypeOfExpression(<TypeOfExpression>node);
        case SyntaxKind.VoidExpression:
            return emitVoidExpression(<VoidExpression>node);
        case SyntaxKind.AwaitExpression:
            return emitAwaitExpression(<AwaitExpression>node);
        case SyntaxKind.PrefixUnaryExpression:
            return emitPrefixUnaryExpression(<PrefixUnaryExpression>node);
        case SyntaxKind.PostfixUnaryExpression:
            return emitPostfixUnaryExpression(<PostfixUnaryExpression>node);
        case SyntaxKind.BinaryExpression:
            return emitBinaryExpression(<BinaryExpression>node);
        case SyntaxKind.ConditionalExpression:
            return emitConditionalExpression(<ConditionalExpression>node);
        case SyntaxKind.SpreadElementExpression:
            return emitSpreadElementExpression(<SpreadElementExpression>node);
        case SyntaxKind.YieldExpression:
            return emitYieldExpression(<YieldExpression>node);
        case SyntaxKind.OmittedExpression:
            return;
        case SyntaxKind.Block:
        case SyntaxKind.ModuleBlock:
            return emitBlock(<Block>node);
        case SyntaxKind.VariableStatement:
            return emitVariableStatement(<VariableStatement>node);
        case SyntaxKind.EmptyStatement:
            return write(";");
        case SyntaxKind.ExpressionStatement:
            return emitExpressionStatement(<ExpressionStatement>node);
        case SyntaxKind.IfStatement:
            return emitIfStatement(<IfStatement>node);
        case SyntaxKind.DoStatement:
            return emitDoStatement(<DoStatement>node);
        case SyntaxKind.WhileStatement:
            return emitWhileStatement(<WhileStatement>node);
        case SyntaxKind.ForStatement:
            return emitForStatement(<ForStatement>node);
        case SyntaxKind.ForOfStatement:
        case SyntaxKind.ForInStatement:
            return emitForInOrForOfStatement(<ForInStatement>node);
        case SyntaxKind.ContinueStatement:
        case SyntaxKind.BreakStatement:
            return emitBreakOrContinueStatement(<BreakOrContinueStatement>node);
        case SyntaxKind.ReturnStatement:
            return emitReturnStatement(<ReturnStatement>node);
        case SyntaxKind.WithStatement:
            return emitWithStatement(<WithStatement>node);
        case SyntaxKind.SwitchStatement:
            return emitSwitchStatement(<SwitchStatement>node);
        case SyntaxKind.CaseClause:
        case SyntaxKind.DefaultClause:
            return emitCaseOrDefaultClause(<CaseOrDefaultClause>node);
        case SyntaxKind.LabeledStatement:
            return emitLabelledStatement(<LabeledStatement>node);
        case SyntaxKind.ThrowStatement:
            return emitThrowStatement(<ThrowStatement>node);
        case SyntaxKind.TryStatement:
            return emitTryStatement(<TryStatement>node);
        case SyntaxKind.CatchClause:
            return emitCatchClause(<CatchClause>node);
        case SyntaxKind.DebuggerStatement:
            return emitDebuggerStatement(node);
        case SyntaxKind.VariableDeclaration:
            return emitVariableDeclaration(<VariableDeclaration>node);
        case SyntaxKind.ClassExpression:
            return emitClassExpression(<ClassExpression>node);
        case SyntaxKind.ClassDeclaration:
            return emitClassDeclaration(<ClassDeclaration>node);
        case SyntaxKind.InterfaceDeclaration:
            return emitInterfaceDeclaration(<InterfaceDeclaration>node);
        case SyntaxKind.EnumDeclaration:
            return emitEnumDeclaration(<EnumDeclaration>node);
        case SyntaxKind.EnumMember:
            return emitEnumMember(<EnumMember>node);
        case SyntaxKind.ModuleDeclaration:
            return emitModuleDeclaration(<ModuleDeclaration>node);
        case SyntaxKind.ImportDeclaration:
            return emitImportDeclaration(<ImportDeclaration>node);
        case SyntaxKind.ImportEqualsDeclaration:
            return emitImportEqualsDeclaration(<ImportEqualsDeclaration>node);
        case SyntaxKind.ExportDeclaration:
            return emitExportDeclaration(<ExportDeclaration>node);
        case SyntaxKind.ExportAssignment:
            return emitExportAssignment(<ExportAssignment>node);
        case SyntaxKind.SourceFile:
            return emitSourceFileNode(<SourceFile>node);
    }
}
```

Recursion is done by simply calling other `emitFoo` function from these functions as needed e.g. from `emitFunctionDeclaration` :
```ts
function emitFunctionDeclaration(node: FunctionLikeDeclaration) {
    if (nodeIsMissing(node.body)) {
        return emitOnlyPinnedOrTripleSlashComments(node);
    }

    if (node.kind !== SyntaxKind.MethodDeclaration && node.kind !== SyntaxKind.MethodSignature) {
        // Methods will emit the comments as part of emitting method declaration
        emitLeadingComments(node);
    }

    // For targeting below es6, emit functions-like declaration including arrow function using function keyword.
    // When targeting ES6, emit arrow function natively in ES6 by omitting function keyword and using fat arrow instead
    if (!shouldEmitAsArrowFunction(node)) {
        if (isES6ExportedDeclaration(node)) {
            write("export ");
            if (node.flags & NodeFlags.Default) {
                write("default ");
            }
        }

        write("function");
        if (languageVersion >= ScriptTarget.ES6 && node.asteriskToken) {
            write("*");
        }
        write(" ");
    }

    if (shouldEmitFunctionName(node)) {
        emitDeclarationName(node);
    }

    emitSignatureAndBody(node);
    if (languageVersion < ScriptTarget.ES6 && node.kind === SyntaxKind.FunctionDeclaration && node.parent === currentSourceFile && node.name) {
        emitExportMemberAssignments((<FunctionDeclaration>node).name);
    }
    if (node.kind !== SyntaxKind.MethodDeclaration && node.kind !== SyntaxKind.MethodSignature) {
        emitTrailingComments(node);
    }
}
```

---

## Fuente: `typescript-book/docs/compiler/emitter-sourcemaps.md`

### Emitter SourceMaps

We said that the bulk of the `emitter.ts` is the local function `emitJavaScript` (we showed the initialization routine of this function before). It basically sets up a bunch of locals and hits off to `emitSourceFile`. The following is a revisiting of the function, this time focusing on `SourceMap` stuff:

```ts
function emitJavaScript(jsFilePath: string, root?: SourceFile) {

    // STUFF ........... removed

    let writeComment = writeCommentRange;

    /** Write emitted output to disk */
    let writeEmittedFiles = writeJavaScriptFile;

    /** Emit a node */
    let emit = emitNodeWithoutSourceMap;

    /** Called just before starting emit of a node */
    let emitStart = function (node: Node) { };

    /** Called once the emit of the node is done */
    let emitEnd = function (node: Node) { };

    /** Emit the text for the given token that comes after startPos
      * This by default writes the text provided with the given tokenKind
      * but if optional emitFn callback is provided the text is emitted using the callback instead of default text
      * @param tokenKind the kind of the token to search and emit
      * @param startPos the position in the source to start searching for the token
      * @param emitFn if given will be invoked to emit the text instead of actual token emit */
    let emitToken = emitTokenText;

    /** Called to before starting the lexical scopes as in function/class in the emitted code because of node
      * @param scopeDeclaration node that starts the lexical scope
      * @param scopeName Optional name of this scope instead of deducing one from the declaration node */
    let scopeEmitStart = function(scopeDeclaration: Node, scopeName?: string) { };

    /** Called after coming out of the scope */
    let scopeEmitEnd = function() { };

    /** Sourcemap data that will get encoded */
    let sourceMapData: SourceMapData;

    if (compilerOptions.sourceMap || compilerOptions.inlineSourceMap) {
        initializeEmitterWithSourceMaps();
    }

    if (root) {
        // Do not call emit directly. It does not set the currentSourceFile.
        emitSourceFile(root);
    }
    else {
        forEach(host.getSourceFiles(), sourceFile => {
            if (!isExternalModuleOrDeclarationFile(sourceFile)) {
                emitSourceFile(sourceFile);
            }
        });
    }

    writeLine();
    writeEmittedFiles(writer.getText(), /*writeByteOrderMark*/ compilerOptions.emitBOM);
    return;

    /// BUNCH OF LOCAL FUNCTIONS
```

The important function call here : `initializeEmitterWithSourceMaps` which is a function local to `emitJavaScript` that overrides some locals that were already defined here. At the bottom of `initializeEmitterWithSourceMaps` you will notice the overriding:

```ts
    // end of `initializeEmitterWithSourceMaps`

    writeEmittedFiles = writeJavaScriptAndSourceMapFile;
    emit = emitNodeWithSourceMap;
    emitStart = recordEmitNodeStartSpan;
    emitEnd = recordEmitNodeEndSpan;
    emitToken = writeTextWithSpanRecord;
    scopeEmitStart = recordScopeNameOfNode;
    scopeEmitEnd = recordScopeNameEnd;
    writeComment = writeCommentRangeWithMap;
```

This means that the bulk of emitter code can not care about `SourceMap` and just use these local functions the same way with or without SourceMaps.

---

## Fuente: `typescript-book/docs/compiler/emitter.md`

## Emitter
There are two `emitters` provided with the TypeScript compiler:

* `emitter.ts`: this is the emitter you are most likely to be interested in. Its the TS -> JavaScript emitter.
* `declarationEmitter.ts`: this is the emitter used to create a *declaration file* (a `.d.ts`) for a *TypeScript source file* (a `.ts` file).

We will look at `emitter.ts` in this section.

### Usage by `program`
Program provides an `emit` function. This function primarily delegates to `emitFiles` function in `emitter.ts`. Here is the call stack:

```
Program.emit ->
    `emitWorker` (local in program.ts createProgram) ->
        `emitFiles` (function in emitter.ts)
```
One thing that the `emitWorker` provides to the emitter (via an argument to `emitFiles`) is an `EmitResolver`. `EmitResolver` is provided by the program's TypeChecker, basically it is a subset of *local* functions from `createChecker`.

---

## Fuente: `typescript-book/docs/compiler/make-global.md`

## Make TypeScript Global

TypeScript is written using a `namespace ts`. And then the whole compiler is compiled into a single `typescript.js` file. If you want to copy over parts of the source code for exploration a great way to do that is to copy over the portions that you are exploring and then expose them to the global variable `ts`.

A great way to play around with the TypeScript compiler is just to copy the TypeScript compiler source into a folder and then reference it as a `global` variable.

---

## Fuente: `typescript-book/docs/compiler/overview.md`

# Compiler
The TypeScript compiler source is located under the [`src/compiler`](https://github.com/Microsoft/TypeScript/tree/master/src/compiler) folder.

It is split into the follow key parts:
* Scanner (`scanner.ts`)
* Parser (`parser.ts`)
* Binder (`binder.ts`)
* Checker (`checker.ts`)
* Emitter (`emitter.ts`)

Each of these get their own unique files in the source. These parts will be explained later on in this chapter.

## BYOTS
We have a project called [Bring Your Own TypeScript (BYOTS)](https://github.com/basarat/byots) which makes it easier to play around with the compiler API e.g. by exposing internal APIs. You can use it to expose your local app's version of TypeScript globally.

## Syntax vs. Semantics
Just because something is *syntactically* correct doesn't mean it is *semantically* correct. Consider the following piece of TypeScript code which although *syntactically* valid is *semantically* wrong

```ts
var foo: number = "not a number";
```

`Semantic` means "meaning" in English. This concept is useful to have in your head.

## Processing Overview
The following is a quick review of how these key parts of the TypeScript compiler compose:

```code
SourceCode ~~ scanner ~~> Token Stream
```

```code
Token Stream ~~ parser ~~> AST
```

```code
AST ~~ binder ~~> Symbols
```
`Symbol` is the primary building block of the TypeScript *semantic* system. As shown the symbols are created as a result of binding. Symbols connect declaration nodes in the AST to other declarations contributing to the same entity.

Symbols + AST are what is used by the checker to *semantically* validate the source code
```code
AST + Symbols ~~ checker ~~> Type Validation
```

Finally When a JS output is requested:
```code
AST + Checker ~~ emitter ~~> JS
```

There are a few additional files in the TypeScript compiler that provide utilities to many of these key portions which we cover next.

## File: Utilities
`core.ts` : core utilities used by the TypeScript compiler. A few important ones:

* `let objectAllocator: ObjectAllocator` : is a variable defined as a singleton global. It provides the definitions for `getNodeConstructor` (Nodes are covered when we look at `parser` / `AST`), `getSymbolConstructor` (Symbols are covered in `binder`), `getTypeConstructor` (Types are covered in `checker`), `getSignatureConstructor` (Signatures are the index, call and construct signatures).

## File: Key Data Structures
`types.ts` contains key data structures and interfaces uses throughout the compiler. Here is a sampling of a few key ones:
* `SyntaxKind`
The AST node type is identified by the `SyntaxKind` enum.
* `TypeChecker`
This is the interface provided by the TypeChecker.
* `CompilerHost`
This is used by the `Program` to interact with the `System`.
* `Node`
An AST node.

## File: System
`system.ts`. All interaction of the TypeScript compiler with the operating system goes through a `System` interface. Both the interface and its implementations (`WScript` and `Node`) are defined in `system.ts`. You can think of it as the *Operating Environment* (OE).

Now that you have an overview of the major files, we can look at the concept of `Program`

---

## Fuente: `typescript-book/docs/compiler/parser-functions.md`

### Parser Functions

As mentioned `parseSourceFile` sets up the initial state and passes the work onto `parseSourceFileWorker` function.

#### `parseSourceFileWorker`

Starts by creating a `SourceFile` AST node. Then it goes into parsing source code starting from the `parseStatements` function. Once that returns, it then completes the `SourceFile` node with additional information such as its `nodeCount`, `identifierCount` and such.

#### `parseStatements`
One of the most significant `parseFoo` style functions (a concept we cover next). It switches by the the current `token` returned from the scanner. E.g. if the current token is a `SemicolonToken` it will call out to `parseEmptyStatement` to create an AST node for an empty statement.

### Node creation

The parser has a bunch of `parserFoo` functions with bodies that create `Foo` nodes. These are generally called (from other parser functions) at a time where a `Foo` node is expected. A typical sample of this process is the `parseEmptyStatement()` function which is used to parse out empty statements like `;;;;;;`. Here is the function in its entirety

```ts
function parseEmptyStatement(): Statement {
    let node = <Statement>createNode(SyntaxKind.EmptyStatement);
    parseExpected(SyntaxKind.SemicolonToken);
    return finishNode(node);
}
```

It shows three critical functions `createNode`, `parseExpected` and `finishNode`.

#### `createNode`
The parser's `createNode` function `function createNode(kind: SyntaxKind, pos?: number): Node` is responsible for creating a Node, setting up its `SyntaxKind` as passed in, and set the initial position if passed in (or use the position from the current scanner state).

#### `parseExpected`
The parser's `parseExpected` function `function parseExpected(kind: SyntaxKind, diagnosticMessage?: DiagnosticMessage): boolean` will check that the current token in the parser state matches the desired `SyntaxKind`. If not it will either report the `diagnosticMessage` sent in or create a generic one of the form `foo expected`. It internally uses the `parseErrorAtPosition` function (which uses the scanning positions) to give good error reporting.

### `finishNode`
The parser's `finishNode` function `function finishNode<T extends Node>(node: T, end?: number): T` sets up the `end` position for the node and additional useful stuff like the `parserContextFlags` it was parsed under as well as if there were any errors before parsing this node (if there were then we cannot reuse this AST node in incremental parsing).

---

## Fuente: `typescript-book/docs/compiler/parser.md`

## Parser
The sourcecode for the TypeScript parser is located entirely in `parser.ts`. Scanner is *controlled* internally by the `Parser` to convert the source code to an AST. Here is a review of what the desired outcome is.

```
SourceCode ~~ scanner ~~> Token Stream ~~ parser ~~> AST
```

The parser is implemented as a singleton (similar reasons to `scanner`, don't want to recreate it if we can reinit it). It is actually implemented as `namespace Parser` which contains *state* variables for the Parser as well as a singleton `scanner`. As mentioned before it contains a `const scanner`. The parser functions manage this scanner.

### Usage by program
Parser is driven indirectly by Program (indirectly as its actually by `CompilerHost` which we mentioned previously). Basically this is the simplified call stack:

```
Program ->
    CompilerHost.getSourceFile ->
        (global function parser.ts).createSourceFile ->
            Parser.parseSourceFile
```

The `parseSourceFile` not only primes the state for the Parser but also primes the state for the `scanner` by calling `initializeState`. It then goes on to parse the source file using `parseSourceFileWorker`.

### Sample Usage
Before we dig too deep into the parser internals, here is a sample code that uses the TypeScript's parser to get the AST of a source file (using `ts.createSourceFile`), and then print it.

`code/compiler/parser/runParser.ts`
```ts
import * as ts from "ntypescript";

function printAllChildren(node: ts.Node, depth = 0) {
    console.log(new Array(depth + 1).join('----'), ts.formatSyntaxKind(node.kind), node.pos, node.end);
    depth++;
    node.getChildren().forEach(c=> printAllChildren(c, depth));
}

var sourceCode = `
var foo = 123;
`.trim();

var sourceFile = ts.createSourceFile('foo.ts', sourceCode, ts.ScriptTarget.ES5, true);
printAllChildren(sourceFile);
```

This will print out the following:

```ts
SourceFile 0 14
---- SyntaxList 0 14
-------- VariableStatement 0 14
------------ VariableDeclarationList 0 13
---------------- VarKeyword 0 3
---------------- SyntaxList 3 13
-------------------- VariableDeclaration 3 13
------------------------ Identifier 3 7
------------------------ FirstAssignment 7 9
------------------------ FirstLiteralToken 9 13
------------ SemicolonToken 13 14
---- EndOfFileToken 14 14
```
This looks like a (very right sided) tree if you tilt your head to the left.

---

## Fuente: `typescript-book/docs/compiler/program.md`

## Program

Defined in `program.ts`. The compilation context ([a concept we covered previously](../project/compilation-context.md)) is represented within the TypeScript compiler as a `Program`. It consists of `SourceFile`s and compiler options.


### Usage of `CompilerHost`
Its interaction mechanism with the OE:

`Program` *-uses->* `CompilerHost` *-uses->* `System`

The reason for having a `CompilerHost` as a point of indirection is that it allows its interface to be more finely tuned for `Program` needs and not bother with OE needs (e.g. the `Program` doesn't care about `fileExists` a function provided by `System`).

There are other users of `System` as well (e.g. tests).

### SourceFile

The program provides an API to get the Source Files `getSourceFiles(): SourceFile[];`. Each is represented as a root-level node for an AST (called `SourceFile`).

---

## Fuente: `typescript-book/docs/compiler/scanner.md`

## Scanner
The source code for the TypeScript scanner is located entirely in `scanner.ts`. Scanner is *controlled* internally by the `Parser` to convert the source code to an AST. Here is what the desired outcome is.

```
SourceCode ~~ scanner ~~> Token Stream ~~ parser ~~> AST
```

### Usage by Parser
There is a *singleton* `scanner` created in `parser.ts` to avoid the cost of creating scanners over and over again. This scanner is then *primed* by the parser on demand using the `initializeState` function.

Here is a *simplied* version of the actual code in the parser that you can run demonstrating this concept:

`code/compiler/scanner/runScanner.ts`
```ts
import * as ts from "ntypescript";

// TypeScript has a singelton scanner
const scanner = ts.createScanner(ts.ScriptTarget.Latest, /*skipTrivia*/ true);

// That is initialized using a function `initializeState` similar to
function initializeState(text: string) {
    scanner.setText(text);
    scanner.setOnError((message: ts.DiagnosticMessage, length: number) => {
        console.error(message);
    });
    scanner.setScriptTarget(ts.ScriptTarget.ES5);
    scanner.setLanguageVariant(ts.LanguageVariant.Standard);
}

// Sample usage
initializeState(`
var foo = 123;
`.trim());

// Start the scanning
var token = scanner.scan();
while (token != ts.SyntaxKind.EndOfFileToken) {
    console.log(ts.formatSyntaxKind(token));
    token = scanner.scan();
}
```

This will print out the following :

```
VarKeyword
Identifier
FirstAssignment
FirstLiteralToken
SemicolonToken
```

### Scanner State
After you call `scan` the scanner updates its local state (position in the scan, current token details etc). The scanner provides a bunch of utility functions to get the current scanner state. In the below sample we create a scanner and then use it to identify the tokens as well as their positions in the code.

`code/compiler/scanner/runScannerWithPosition.ts`
```ts
// Sample usage
initializeState(`
var foo = 123;
`.trim());

// Start the scanning
var token = scanner.scan();
while (token != ts.SyntaxKind.EndOfFileToken) {
    let currentToken = ts.formatSyntaxKind(token);
    let tokenStart = scanner.getStartPos();
    token = scanner.scan();
    let tokenEnd = scanner.getStartPos();
    console.log(currentToken, tokenStart, tokenEnd);
}
```

This will print out the following:
```
VarKeyword 0 3
Identifier 3 7
FirstAssignment 7 9
FirstLiteralToken 9 13
SemicolonToken 13 14
```

### Standalone scanner
Even though the TypeScript parser has a singleton scanner you can create a standalone scanner using `createScanner` and use its `setText`/`setTextPos` to scan at different points in a file for your amusement.

---

## Fuente: `typescript-book/docs/const.md`

### const

`const` es una adición ofrecida por ES6 / TypeSCript muy bienvenida. Permite la inmutabilidad con variables. Esto es bueno tanto desde una perspectiva de documentación como de tiempo de ejecución. Para usar const, simplemente reemplazá `var` con `const`:

```ts
const foo = 123;
```

> En mi opinión, la sintaxis es mucho mejor que otros lenguages que obligan al usuario a tipear algo como `let constant foo`. Es decir, una variable + un especificador de comportamiento. 

`const`es una buena práctica tanto en términos de legibilidad como de mantenibilidad y evita usar *literales mágicos*. Ejemplo: 

```ts
// Poca legibilidad
if (x > 10) {
}

// Mejor!
const maxRows = 10;
if (x > maxRows) {
}
```

#### las declaraciones const deben ser inicializadas
Lo siguiente resultará en un error de compilación:

```ts
const foo; // ERROR: const declarations must be initialized
```

#### El lado izquierdo de la asignación no puede ser una constante
Las constantes son inmutables luego de su creación, asi que si intentas asignarles un nuevo valor obtendrás un error de compilación: 

```ts
const foo = 123;
foo = 456; // ERROR: Left-hand side of an assignment expression cannot be a constant
```

#### Ámbito de bloque
Una `const` tiene ámbito de bloque, como vimos con [`let`](./let.md):

```ts
const foo = 123;
if (true) {
    const foo = 456; // Permitido, ya que es una nueva variable limitada a este bloque `if`
}
```

#### Inmutabilidad profunda
Una `const` funciona objetos literales también, en lo que respecta a proteger la *referencia* de la variable:

```ts
const foo = { bar: 123 };
foo = { bar: 456 }; // ERROR : Left hand side of an assignment expression cannot be a constant
```

Sin embargo, aún permite que sub-propiedades de los objetos sean mutados, como mostramos a continuación:

```ts
const foo = { bar: 123 };
foo.bar = 456; // Permitido!
console.log(foo); // { bar: 456 }
```

#### Preferí const

Siempre usá `const`, excepto que planees inicializar una variable *lazily*, o reasignarla (usa `let` para esos casos).

---

## Fuente: `typescript-book/docs/destructuring.md`

### Desestructurando

TypeScript soporta las siguientes formas de Desestructuración (literalmente tomado de de-estructurando, es decir, rompiendo la estructura):
 
 1. Desestructuración de objetos
 2. Desestructuración de arrays

 Es fácil pensar en desestructurar como lo inverso de *estructurar*. El método de *estructurar* en JavaScript es el objeto literal:

```ts
var foo = {
    bar: {
        bas: 123
    }
};
```
Sin el increible soporte para *estructurar* que se encuentra incluido en JavaScript, crear nuevos objetos sobre la marcha sería muy molesto. La desestructuración trae el mismo nivel de conveniencia a extraer información de una estructura.

#### Desestructuración de objetos
La desestructuración es útil porque te permite hacer en una sola línea algo que sino llevaría muchas. Considerá el siguiente caso:

```ts
var rect = { x: 0, y: 10, width: 15, height: 20 };

// Asignación desestructurante
var {x, y, width, height} = rect;
console.log(x, y, width, height); // 0,10,15,20

rect.x = 10;
({x, y, width, height} = rect); // Asigna a variables existentes utilizando paréntesis externos
console.log(x, y, width, height); // 10,10,15,20
```
Si la desestructuración no existiera, deberías seleccionar `x,y,width,height` uno a uno de `rect`.

Para asignar una variable extraida a una variable con un nuevo nombre, puedes hacer lo siguiente:

```ts
// structure
const obj = {"una propiedad": "un valor"};

// destructure
const {"una propiedad": unaPropiedad} = obj;
console.log(unaPropiedad === "un valor"); // verdadero
```

Adicionalmente, puedes obtener datos *profundos* de una estructura a través de la desestructuración: 

```ts
var foo = { bar: { bas: 123 } };
var {bar: {bas}} = foo; // `var bas = foo.bar.bas;`
```

#### Desestructurando objetso con rest
Puedes levantar cualquier número de elementos de un objeto y obtener *un objeto* compuesto por los elementos restantes a través de desestructurar con rest.

```ts
var {w, x, ...resto} = {w: 1, x: 2, y: 3, z: 4};
console.log(w, x, resto); // 1, 2, {y:3,z:4}
```
Un caso común de uso es ignorar ciertas propiedades:
```ts
// Example function
function goto(point2D: {x: number, y: number}) {
  // Imagine some code that might break
  // if you pass in an object
  // with more items than desired
}
// Some point you get from somewhere
const point3D = {x: 1, y: 2, z: 3};
/** A nifty use of rest to remove extra properties */
const { z, ...point2D } = point3D;
goto(point2D);
```

#### Desestructuración de arrays
Una pregunta de programación común es: "Cómo intercambio dos variables sin utilizar una tercera?" La solución de Typescript:

```ts
var x = 1, y = 2;
[x, y] = [y, x];
console.log(x, y); // 2,1
```
Nota que la desestructuración de arrays es equivalente al decir que el compilador está haciendo `[0], [1], ...` por vos. No hay garantía de que estos valores existirán.

#### Desestructuración de arrays con rest
Puedes levanta cualquier número de elementos de un array y obtener *un array* compuesto por los elementos restantes a través de desestructurar con rest.

```ts
var [x, y, ...resto] = [1, 2, 3, 4];
console.log(x, y, resto); // 1, 2, [3,4]
```

#### Desestructuración de arrays ignorando
Puedes ignorar cualquier índice dejando su ubicación vacía, es decir `, ,` en el lado izquierdo de la asignación. Por ejemplo:
```ts
var [x, , ...resto] = [1, 2, 3, 4];
console.log(x, resto); // 1, [3,4]
```

#### Generación JS
La generación de Javascript para targets que no sean ES6 implica crear variables temporales, como tendrías que hacer vos mismo sin el soporte a desestructurar nativo del lenguage. Ejemplo:

```ts
var x = 1, y = 2;
[x, y] = [y, x];
console.log(x, y); // 2,1

// se convierte en //

var x = 1, y = 2;
_a = [y,x], x = _a[0], y = _a[1];
console.log(x, y);
var _a;
```

#### Resumen
Desestructurar puede mejorar la legibilidad de tu código y su mantenibilidad al reducr la cantidad de líneas y mostrar claramente la intención. La desestructuración de arrays te permite utilizarlos como si fueran tuples.

---

## Fuente: `typescript-book/docs/enums.md`

* [Enums](#enums)
* [Number Enums y números](#number-enums-and-numbers)
* [Number Enums y strings](#number-enums-and-strings)
* [Cambiar el número asociado con un number enum](#changing-the-number-associated-with-a-number-enum)
* [Enums están abiertos](#enums-are-open-ended)
* [Number Enums como banderas](#number-enums-as-flags)
* [String Enums](#string-enums)
* [Const enums](#const-enums)
* [Enum con funciones estáticas](#enum-with-static-functions)

### Enums
Un enum es una forma de organizar una collección de valores relacionados. Muchos otros lenguajes de programación (C/C#/Java) tienen un tipo de datos `enum` pero JavaScript no. Sin embargo, TypeScript sí. Aquí mostramos un ejemplo de una definición de un enum de TypeScript:

```ts
enum CardSuit {
	Clubs,
	Diamonds,
	Hearts,
	Spades
}

// Ejemplo de uso
var card = CardSuit.Clubs;

// Seguridad
card = "no soy un mimebro de CardSuit"; // Error : string no es asignable al tipo `CardSuit`
```

Estos valores enums son de tipo número (`number`) por los que los llamaremos Number Enum de ahora en adelante.

#### Number Enums y números
Los enums de TypeScript están basados en números. Esto significa que números pueden ser asignados a una instancia del enum, así como cualquier otra cosa que sea compatible con `number`.

```ts
enum Color {
    Red,
    Green,
    Blue
}
var col = Color.Red;
col = 0; // En práctica es lo mismo que Color.Red
```

#### Number Enums y Strings
Antes de que profundicemos más sobre los enums, miremos al JavaScript que generan. Aquí hay un ejemplo en TypeScript:

```ts
enum Tristate {
    False,
    True,
    Unknown
}
```
genera el siguiente JavaScript:

```js
var Tristate;
(function (Tristate) {
    Tristate[Tristate["False"] = 0] = "False";
    Tristate[Tristate["True"] = 1] = "True";
    Tristate[Tristate["Unknown"] = 2] = "Unknown";
})(Tristate || (Tristate = {}));
```

Focalicemos nuestra atención en la línea `Tristate[Tristate["False"] = 0] = "False"`. En ella, `Tristate["False"] = 0` no debería requerir mayores explicaciones: declara que el miembro `"False"` de la variable `Tristate` tiene valor `0`. Notemos que en JavaScript el operador de asignación devuelve el valor asignado, (en este caso, `0`). Por lo tanto, el siguiente paso ejecutado por JavaScript es `Tristate[0] = "False"`. Esto significa que pueden usar la variable `Tristate` para convertir una versión string del enum a un número, o una version númerica del enum a una string. Lo demostramos a continuación:

```ts
enum Tristate {
    False,
    True,
    Unknown
}
console.log(Tristate[0]); // "False"
console.log(Tristate["False"]); // 0
console.log(Tristate[Tristate.False]); // "False" because `Tristate.False == 0`
```

#### Cambiar el número asociado con un Number Enum
Por default, los enums se basan en `0` y aumentan cada valor subsecuente por 1, automáticamente. A modo de ejemplo, consideremos lo siguiente:

```ts
enum Color {
    Red,     // 0
    Green,   // 1
    Blue     // 2
}
```

Sin embargo, pueden cambiar el número asociado con cualquier miembro de un enum realizando una asignación específica. Esto es demostrado a continuación, donde comenzamos con el 3 y incrementamos desde ese punto:

```ts
enum Color {
    DarkRed = 3,  // 3
    DarkGreen,    // 4
    DarkBlue      // 5
}
```

> TIP: Comúnmente iniciamos el primer enum con `= 1` ya que nos permite hacer un chequeo truthy seguro con un valor enum.

#### Number Enums como banderas
Un excelente uso de los enums es utilizarlos como `Banderas`. Las banderas te permiten chequear si una cierta condición de un grupo de condiciones es verdadera. Consideremos el siguiente ejemplo, donde tenemos una lista de propiedades sobre animales:

```ts
enum AnimalFlags {
    None           = 0,
    HasClaws       = 1 << 0,
    CanFly         = 1 << 1,
    EatsFish       = 1 << 2,
    Endangered     = 1 << 3
}
```

Aquí estamos utilizando el operador de desplazamiento a la izquierda para mover `1` alrededor de un cierto nivel de bits para obtener números desunidos a nivel de bits `0001`, `0010`, `0100` y `1000` (estos son los decimales `1`, `2`, `4`, y `8`, en caso de que quisieran saberlo). Los operadores de bits `|` (o) / `&` (y) / `~` (no) son nuestros mejores amigos a la hora de trabajar con banderas, como demostramos a continuación: 

```ts
enum AnimalFlags {
    None           = 0,
    HasClaws       = 1 << 0,
    CanFly         = 1 << 1,
}
type Animal = {
    flags: AnimalFlags
}

function printAnimalAbilities(animal: Animal) {
    var animalFlags = animal.flags;
    if (animalFlags & AnimalFlags.HasClaws) {
        console.log('animal has claws');
    }
    if (animalFlags & AnimalFlags.CanFly) {
        console.log('animal can fly');
    }
    if (animalFlags == AnimalFlags.None) {
        console.log('nothing');
    }
}

let animal: Animal = { flags: AnimalFlags.None };
printAnimalAbilities(animal); // nada
animal.flags |= AnimalFlags.HasClaws;
printAnimalAbilities(animal); // el animal tiene garras
animal.flags &= ~AnimalFlags.HasClaws;
printAnimalAbilities(animal); // nada
animal.flags |= AnimalFlags.HasClaws | AnimalFlags.CanFly;
printAnimalAbilities(animal); // animal tiene garras y puede volar
```

Aquí:
* usamos `|=` para agregar banderas
* una combinación de `&=` y `~` para eliminar una bandera
* `|` para combinar banderas

> Nota: pueden combinar banderas para crear atajos convenientes dentro de la definción del enum. Por ejemplo `EndangeredFlyingClawedFishEating`:

```ts
enum AnimalFlags {
	None           = 0,
    HasClaws       = 1 << 0,
    CanFly         = 1 << 1,
    EatsFish       = 1 << 2,
    Endangered     = 1 << 3,

	EndangeredFlyingClawedFishEating = HasClaws | CanFly | EatsFish | Endangered,
}
```

#### String Enums
Por ahora solo hemos considerado enums donde los valores de los miembros son de tipo `number`. Actualmente, está permitido tener miembros de enums con valores string. Por ejemplo:

```ts
export enum EvidenceTypeEnum {
  UNKNOWN = '',
  PASSPORT_VISA = 'passport_visa',
  PASSPORT = 'passport',
  SIGHTED_STUDENT_CARD = 'sighted_tertiary_edu_id',
  SIGHTED_KEYPASS_CARD = 'sighted_keypass_card',
  SIGHTED_PROOF_OF_AGE_CARD = 'sighted_proof_of_age_card',
}
```

Estos pueden ser más fáciles de tratar y de depurar ya que proveen valores string con significado / depurables. 

Puedes usar estos valores para hacer comparaciones de strings simples. Por ejemplo:

```ts
// Donde `someStringFromBackend` será '' | 'passport_visa' | 'passport' ... etc.
const value = someStringFromBackend as EvidenceTypeEnum; 

// Ejemplo de uso en código
if (value === EvidenceTypeEnum.PASSPORT){
    console.log('You provided a passport');
    console.log(value); // `passport`
}
```

#### Const Enums

Si tienen una definición de enum como la siguiente:

```ts
enum Tristate {
    False,
    True,
    Unknown
}

var lie = Tristate.False;
```

La lína `var lie = Tristate.False` es compilada a JavaScript como `var lie = Tristate.False` (sí, el output es idéntico al input). Esto singifica que en tiempo de ejecución será necesario buscar `Tristate` y luego `Tristate.False`. Para obtener una mejoría en términos de rendimiento pueden marcar el `enum` como `const enum`. Lo demostraremos a continuación:

```ts
const enum Tristate {
    False,
    True,
    Unknown
}

var lie = Tristate.False;
```

genera el siguiente JavaScript: 

```js
var lie = 0;
```

Es decir, el compilador: 
1. coloca cualquier uso del enum *en línea* (`0` en lugar de `Tristate.False`).
2. No genera JavaScript para la definición del enum (no hay una variable `Tristate` en tiempo de ejecución) ya que sus usos están en línea.

##### Const enum preserveConstEnums
Colocar los usos en línea tiene sus beneficios de rendimiento obvios. El hecho de que no exista una variable `Tristate` en tiempo de ejecución es simplemente el compilador ayudándolos al no generar JavaScript que no será utilizado en tiempo de ejecución. Sin embargo, tal vez quieran que el compilador genere la versión JavaScript del enum de todas formas, para cosas como las búsquedas *número a string* o *string a número* que vimos anteriormente. En estos casos, pueden usar `Tristate["False"]` o `Tristate[0]` manualmente en tiempo de ejecución si así lo desean. Esto no impacta la capacidad de colocar *en línea* de ninguna manera.

### Enum con funciones estáticas
Pueden usar la unificación de declaraciones `enum` +  `namespace` para agregar métodos estáticos a un enum. El siguiente ejemplo demuestra un caso en el que agregamos un miembro estático `isBusinessDay` a un enum `Weekday`:

```ts
enum Weekday {
	Monday,
	Tuesday,
	Wednesday,
	Thursday,
	Friday,
	Saturday,
	Sunday
}
namespace Weekday {
	export function isBusinessDay(day: Weekday) {
		switch (day) {
			case Weekday.Saturday:
			case Weekday.Sunday:
				return false;
			default:
				return true;
		}
	}
}

const mon = Weekday.Monday;
const sun = Weekday.Sunday;
console.log(Weekday.isBusinessDay(mon)); // true
console.log(Weekday.isBusinessDay(sun)); // false
```

#### Enums son abiertos

> Nota: los enums abiertos son relevantes únicamente si no están usando módulos. Deberían usar módulos. De ahí que esta sección sea la última.

Nuevamente, aquí está el JavaSript generado para un enum:

```js
var Tristate;
(function (Tristate) {
    Tristate[Tristate["False"] = 0] = "False";
    Tristate[Tristate["True"] = 1] = "True";
    Tristate[Tristate["Unknown"] = 2] = "Unknown";
})(Tristate || (Tristate = {}));
```

Ya explicamos la porción `Tristate[Tristate["False"] = 0] = "False";`. Ahora noten el código que lo rodea `(function (Tristate) { /*code here */ })(Tristate || (Tristate = {}));` específicamente la parte `(Tristate || (Tristate = {}));`. Básicamente, esto captura una variable local `Tristate` que apuntará a un valor `Tristate` ya definido o lo inicializará con un objeto vacío nuevo `{}`.

Esto significa que pueden dividir y extender una definición enum a lo largo de múltiples archivos. Por ejemplo, debajo tenemos la definición de `Color` dividida en dos bloques:

```ts
enum Color {
    Red,
    Green,
    Blue
}

enum Color {
    DarkRed = 3,
    DarkGreen,
    DarkBlue
}
```

Notemos que *deberían* reiniciar el primer miembro (en este caso `DarkRed = 3`) en la continuación de un enum para evitar que el código generado no se superponga con una definición previa (por ejemplo, los valores `0`, `1`, etc). TypeScript tirará una advertencia si no lo hacen (mensaje error: `En una enum con muchas declaraciones, solo una declaración puede omitir un inicializador para el primer elemento del enum`).

---

## Fuente: `typescript-book/docs/errors/common-errors.md`

# Errores comunes
En esta sección explicaremos varios errores comunes que los usuarios experimentan en el mundo real.

## TS2304
Muestras:
> `Cannot find name ga`
> `Cannot find name $`
> `Cannot find module jquery`

Probablemente esten usando una librería hecha por terceros (por ejemplo, google analytics) y no la han `declare`ado. TypeScript intenta salvarlos de cometer *errores de tipeo* y de *usar variables sin declararlas* por lo que deben ser explícitos sobre cualquier cosa que sea *una variable en tiempo de ejecución* debido a la inclusión de una librería de terceros ([más sobre cómo solucionarlo][ambient]).

## TS2307
Muestras:
> `Cannot find module 'underscore'`

Probablemente esten usando una librería creada por terceros (por ejemplo, underscore) como un *módulo* ([más acerca de módulos][modules]) y no tienen un archivo de declaraciones ambientes para ella ([más sobre declaraciones ambiente][ambient]).

## TS1148
Muestras:
> `Cannot compile modules unless the '--module' flag is provided`

Miren la [sección sobre módulos][modules].

## Catch clause variable cannot have a type annotation
Sample:
```js
try { something(); }
catch (e: Error) { // Catch clause variable cannot have a type annotation
}
```
TypeScript los está protegiendo de código JavaScript que puede ser erróneo. Usen una guardia de tipos:
```js
try { something(); }
catch (e) {
  if (e instanceof Error){
    // Here you go.
  }
}
```

## Interface `ElementClass` cannot simultaneously extend types `Component` and `Component`
Esto sucede cuando tienen dos `react.d.ts` (`@types/react/index.d.ts`) en el contexto de compilacion.

**Solución**:
* Eliminen `node_modules` y cualquier `package-lock` (o yarn lock) y corran `npm install` de nuevo
* Si no funciona, encuentren el módulo inválido (todos los módulos usados por su proyecto deberían tener un archivo `react.d.ts` como `peerDependency` y no como una `dependency` dura) y reportenlo en su proyecto.


[ambient]: ../types/ambient/d.ts.md
[modules]: ../project/modules.md

---

## Fuente: `typescript-book/docs/errors/interpreting-errors.md`

# Interpretar Errores
Dado que TypeScript es un lenguaje de programación fuertemente orientado y enfocado en *ayudar a los desarrolladores*, sus mensajes de error suelen ser súper útiles cuando algo falla. Esto puede desembocar en una ligera sobrecarga de información para los usuarios de compiladores que no suelen ser tán serviciales.

Miremos un ejemplo en un IDE para desarmar el proceso de leer un mensaje de error.

```ts
type SomethingComplex = {
  foo: number,
  bar: string
}
function takeSomethingComplex(arg: SomethingComplex) {
}
function getBar(): string {
  return 'some bar';
}

//////////////////////////////////
// Ejemplo de error
//////////////////////////////////
const fail = {
  foo: 123,
  bar: getBar
};

takeSomethingComplex(fail); // EL ERROR DE TS OCURRE AQUÍ
```

Este ejemplo demuestra un error de programación común, en el que el programador *falla* al llamar una función (`bar: getBar` debería ser `bar: getBar()`). Afortunadamente, este error es atrapado por TypeScript en cuanto los requerimientos no son cumplidos.

## Categorías de errores
Hay dos categorías de mensajes de error en TypeScript (sucintos y detallados).

### Sucintos
El objetivo de los mensajes de error sucintos es proveer una descripción *convencional de compilador* del número y mensaje del error. Para este ejemplo, el mensaje sucito sería el siguiente:
```
TS2345: Argument of type '{ foo: number; bar: () => string; }' is not assignable to parameter of type 'SomethingComplex'.
```
Se explica bastante a sí mismo. Sin embargo, no provee un análisis más profundo sobre *por qué* el error sucede. El mensaje de error detallado existe justamente para este propósito.

### Detallado
Para este ejemplo, la versión detallada del mensaje de error sería la siguiente:

```
[ts]
Argument of type '{ foo: number; bar: () => string; }' is not assignable to parameter of type 'SomethingComplex'.
  Types of property 'bar' are incompatible.
    Type '() => string' is not assignable to type 'string'.
```
El objetivo del mensaje de error detallado es *guiar* al usuario hacia el motivo por el que algún error (en este caos, incompatibilidad de tipos) está sucediendo. La primera línea es la misma que en el error sucinto, seguida de una cadena. Deberían poder leer esta cadena como una serie de respuestas a un `POR QUÉ?` entre líneas de un desarrollador hipotético. Por ejemplo:

```
ERROR: Argument of type '{ foo: number; bar: () => string; }' is not assignable to parameter of type 'SomethingComplex'.

POR QUÉ? 
CAUSE ERROR: Types of property 'bar' are incompatible.

POR QUÉ? 
CAUSE ERROR: Type '() => string' is not assignable to type 'string'.
```

Por lo tanto, la causa principal es
* para la propiedad `bar`
* hay una función `() => string` mientras que se esperaba que fuera una `string`.

Esto debería ayudar a que el desarrollador arregle el problema en la propiedad `bar` (se olvidaron de invocar la función con `()`)

## Cómo se muestra en una información sobre herramientas IDE

el IDE suele mostrar la versión `detallada` seguida de la `sucinta` en una herramienta, como mostramos a continuación:

![ejemplo de mensaje de error en IDE](https://raw.githubusercontent.com/basarat/typescript-book/master/images/errors/interpreting-errors/ide.png)

* Normalmente, lean la versión `detallada` formulando la cadena `POR QUÉ?` en sus cabezas.
* Pueden usar la versión sucinta si quieren buscar errores similares (usando el código de error `TSXXXX` o porciones del mensaje de error)

---

## Fuente: `typescript-book/docs/errors/main.md`

# Errores 
En esta sección discutiremos cómo leer y entender errores en TypeScript. Seguiremos este tema con ejemplos de errores comunes y sus soluciones.

---

## Fuente: `typescript-book/docs/for...of.md`

### for...of
Un error común para desarrolladores JavaScript principantes, es que `for...in` no itera sobre los ítems de un array. En realidad, itera sobre las *keys* del objeto seleccionado. Esto se demuestra en el ejemplo siguiente, en el que esperarías `9,2,5` pero en realidad obtienes los índices ``0,1,2`:

```ts
var someArray = [9, 2, 5];
for (var item in someArray) {
    console.log(item); // 0,1,2
}
```

Esta es una de las razones por las cuales `for...of` existe en TypeScript (y ES6). Como se puede ver a continuación, este mecanismo de iteración produce el resultado esperado:

```ts
var someArray = [9, 2, 5];
for (var item of someArray) {
    console.log(item); // 9,2,5
}
```

Similarmente, Typescript no tiene problema en iterar sobre los caracteres de una string usando `for...of`:

```ts
var hello = "is it me you're looking for?";
for (var char of hello) {
    console.log(char); // is it me you're looking for?
}
```

#### Generación JS
Para contextos pre ES6, TypeScript generará el bucle estándar `for (var i = 0; i < list.length; i++)`:
```ts
var someArray = [9, 2, 5];
for (var item of someArray) {
    console.log(item);
}

// se convierte en //

for (var _i = 0; _i < someArray.length; _i++) {
    var item = someArray[_i];
    console.log(item);
}
```
Puedes ver que al utilizar `for...of` la *intención* se vuelve más clara, y decrece la cantidad de código que tienes que escribir (así como la cantidad de nombres de variables que debes inventar).

#### Limitaciones
Si no te encuentras en contextos ES6+, el código generado asume que la propiedad `length` existe y que el objeto puede ser indexado a través de números (ejemplo, `obj[2]`). Por lo tanto, en estos casos, solamente es soportado para `string` y `array`.

Si TypeScript puede ver que no estas usando un array o una string, te dará un claro error *"no es de tipo array o string"*:
```ts
let articleParagraphs = document.querySelectorAll("article > p");
// Error: Nodelist is not an array type or a string type
for (let paragraph of articleParagraphs) {
    paragraph.classList.add("read");
}
```

Usá `for...of` solamente para cosas que *sabés* con seguridad que son arrays o strings. Notá que esta limitación tal vez sea removida en versiones futuras de TypeScript.

#### Resumen
Estarías sorprendido respecto de cauntas veces iterarás sobre elementos de arrays. La próxima vez que te encuentres haciéndolo, probá `for...of`. Puede que hagas feliz a la siguiente persona que deba revisar tu código.

---

## Fuente: `typescript-book/docs/future-javascript.md`

# Futuro JavaScript: Ahora
Uno de los mayores beneficios de TypeScript es que te permite utilizar un número de características de ES6 y más en motores actuales (ES3 y ES5) de Javascript (como los navegadores actualres y Node.js). Aquí ahondaremos en por qué estas características son útiles y seguiremos con cómo se encuentran implementadas en TypeScript.

Nota: No todas estas características están listadas para ser inmediatamente añadidas a JavaScript, pero proveen una gran utilidad en términos de organización y manutención de tu código. Además, es importante notar que sos libre de ignorar cualquier constructo que no tenga sentido en tu proyecto, aunque lo más probable es que eventualmente termines usando la mayoría ;)

---

## Fuente: `typescript-book/docs/generators.md`

## Generadores

`function*` es la sintaxis que utilizamos para crear una *función generadora*. Llamar a una función generadora devuelve un *objeto generador*. El objeto generador sigue la interface [iterator][iterator], es decir, las funciones, `next`, `return` y  `throw`. 

Hay dos incetivos detrás de las funciones generadoras:

### Iteradores perezosos

Las funciones generadores se pueden utilizar para crear iteradores perezosos. Por ejemplo, la siguiente función devuleve una lista **infinita** de numeros integrales:

```ts
function* infiniteSequence() {
    var i = 0;
    while(true) {
        yield i++;
    }
}

var iterator = infiniteSequence();
while (true) {
    console.log(iterator.next()); // { value: xxxx, done: false } por siempre
}
```

Claro que si el iterador termina, recibirás el resultado de `{ done: true }` como mostramos a continuación:

```ts
function* idMaker(){
  let index = 0;
  while(index < 3)
    yield index++;
}

let gen = idMaker();

console.log(gen.next()); // { value: 0, done: false }
console.log(gen.next()); // { value: 1, done: false }
console.log(gen.next()); // { value: 2, done: false }
console.log(gen.next()); // { done: true }
```

### Ejecución controlada externamente
Esta es la parte de los generadores que es realmente emocionante. Esencialmente, le permite a una función pausar en su ejecución y ceder el control (destino) de lo que resta de su ejecución a su "llamador".

Una función generadora no ejecuta cuando la llamas. Simplemente crea un objeto generador. Considera el sigueinte ejemplo junto con una ejecución simple:

```ts
function* generator(){
    console.log('La Ejecución comenzó');
    yield 0;
    console.log('La Ejecución continuó');
    yield 1;
    console.log('La Ejecución continuó');
}

var iterator = generator();
console.log('Comenzando la iteración'); // ESto ejecutará antes que cualquier cosa ejecute en el cuerpo de la función generadora
console.log(iterator.next()); // { value: 0, done: false }
console.log(iterator.next()); // { value: 1, done: false }
console.log(iterator.next()); // { value: undefined, done: true }
```

Si corres esto obtendrás el siguiente resultado:

```
$ node outside.js
Comenzando la iteration
La Ejecución comenzó
{ value: 0, done: false }
La Ejecución continuó
{ value: 1, done: false }
La Ejecución continuó
{ value: undefined, done: true }
```
* La función solo comienza a ejecutar una vez que `next` es llamado en el objeto generador.
* La función *pausa* en cuanto encuentra una declaración `yield`.
* La función *continúa* cuando `next` es llamado nuevamente.


> Esencialmente, la ejecución de la función generadora es controlada por el objeto generador.

Nuestra comunicación usando el generador ha sido, principalmente, en una única dirección: el generador devuelve valores pal iterador. Una característica extremadamente poderosa de los generadores en JavaScript es que permiten la comunicación bidireccional (con algunas excepciones).

* Puedes controlar el valor que resulta de la expresión `yield` a través de `iterator.next(valorAInsertar)`
* Puedes tirar una excepción al momento de `yield` usando `iterator.throw(error)`

El siguiente ejemplo demuestra `iterator.next(valorAInsertar)`:

```ts
function* generator() {
    const bar = yield 'foo'; // bar puede tener *any* tipo
    console.log(bar); // bar!
}

const iterator = generator();
// Comienza la ejecución hasta que obtenemos el primer valor yield
const foo = iterator.next();
console.log(foo.value); // foo
// Resume la ejecución insertando bar
const nextThing = iterator.next('bar');
```

Dado que `yield` devuelve el parámetro pasado al `next` de la función iteradora, y todas las funciones iteradoras `next` acpetan un parámetro de cualquier typo, TypeScript siempre asignará el tipo `any` al resultado del operador `yield` (`bar` en el caso anterior).

> Puedes forzar el resultado al tipo que esperas, y asi asegurarte que solo valores de ese tipo sean pasados a next (por ejemplo, utilizando una capa adicional que fuerce los tipos y llame a next por ti). Si el tipeado fuerte es importante para vos, tal vez quieras evitar la comunicación bidireccional por completo, así como aquellos paquetes que dependan en gran medida de esta funcion (por ejemplo, redux-saga).

El siguiente ejemplo pone en práctica `iterator.throw(error)`:

```ts
function* generator() {
    try {
        yield 'foo';
    }
    catch(err) {
        console.log(err.message); // bar!
    }
}

var iterator = generator();
// Comienza la ejecución hasta que obtenemos el primer valor de yield
var foo = iterator.next();
console.log(foo.value); // foo
// Continua la ejecución tirando una excepción 'bar'
var nextThing = iterator.throw(new Error('bar'));
```

Aquí está el resumen:
* `yield` permite a una función generadora pausar su comunicación y ceder el control a un sistema externo.
* el sistema externo puede insertar un valor en el cuerpo de la función generadora.
* el sistema externo puede tirar una excepción en el cuerpo de la función generadora.

Por qué es útil todo esto? Saltá a la próxima sección [**async/await**][async-await] y descubrilo.

[iterator]:./iterators.md
[async-await]:./async-await.md

---

## Fuente: `typescript-book/docs/getting-started.md`

* [Empezando con TypeScript](#empezando-con-typescript)
* [Version de TypeScript](#version-de-typescript)

# Empezando con TypeScript

TypeScript compila a Javascript. Javascript es lo que vas a ejecutar realmente (sea en el navegador o en el servidor). Por lo tanto vas a necesitar lo siguiente:

* Compliador para TypeScript (OSS disponible [como fuente](https://github.com/Microsoft/TypeScript/) y en [NPM](https://www.npmjs.com/package/typescript))
* Un editor de TypeScript (puedes usar un bloc de notas si quieres, pero yo use [vscode 🌹](https://code.visualstudio.com/) con una [extensión que escribí](https://marketplace.visualstudio.com/items?itemName=basarat.god). Ademas [muchos otros IDES también lo soportan]( https://github.com/Microsoft/TypeScript/wiki/TypeScript-Editor-Support))


## Version de TypeScript

En lugar de usar la version *estable* del compilador de TypeScript, vamos a estar presentando mucha información nueva en este libro que puede no estar asociada con una version numerada todavía. Generalmente, recomiendo que se utilize la version nightly, porque **el suite de tests del compilador solo atrapa mas bugs a lo largo del tiempo**.

Lo puedes instalar en la línea de comando

```
npm install -g typescript@next
```

Y ahora el comando `tsc` será el ultimo y el mejor. Varios IDEs tambien lo soportan, etc.

* Puedes pedirle a vscode que utilice esta versión creando `.vscode/settings.json` con el siguiente contenido:

```json
{
  "typescript.tsdk": "./node_modules/typescript/lib"
}
```

## Obtener el Código Fuente
El código para este libro se encuentra disponible en el repositorio de github https://github.com/basarat/typescript-book/tree/master/code. La mayoría de los ejemplos pueden ser copiados a vscode y puedes jugar con ellos como están. Para ejemplos que necesitan preparacion adicional (por ejemplo, módulos npm), presentaremos un link a la fuente antes de presentar el código. Por ejemplo, 

`este/sera/el/link/a/la/fuente.ts`
```ts
// Este será el código del que hablamos
```

Con la preparación ya resulta, comenzemos con la sintaxis de TypeScript.

---

## Fuente: `typescript-book/docs/iterators.md`

### Iteradores

Los iteradores no son una característica particual de TypeScript o ES6. Son un Patrón de Diseño de comportamiento para lenguages de programación orientada a Objetos. Es, en general, un objeto que implementa la siguiente interface:

```ts
interface Iterator<T> {
    next(value?: any): IteratorResult<T>;
    return?(value?: any): IteratorResult<T>;
    throw?(e?: any): IteratorResult<T>;
}
```
([Más acerca de la notación `<T> luego](./types/generics.html))
Esta interface permite recuperar un valor de una colección o secuencia perteneciente al objeto.

El `IteratorResult` es simplemente un par `value`+`done`:
```ts
interface IteratorResult<T> {
    done: boolean;
    value: T;
}
```

Imagina que hay un objeto que pertenece a algun encuadre (`Frame`), el cual incluye la lista de componentes que componen (valga la redundancia) a este encuadre. Con la interface del Iterador es posible recuperar los componentes de este encuadre, como a continuación: 
Imagine that there's an object of some frame, which includes the list of
components of which this frame consists. With Iterator interface it is possible
to retrieve components from this frame object like below:

```ts
class Component {
  constructor (public name: string) {}
}

class Frame implements Iterator<Component> {

  private pointer = 0;

  constructor(public name: string, public components: Component[]) {}

  public next(): IteratorResult<Component> {
    if (this.pointer < this.components.length) {
      return {
        done: false,
        value: this.components[this.pointer++]
      }
    } else {
      return {
        done: true,
        value: null
      }
    }
  }

}

let frame = new Frame("Door", [new Component("top"), new Component("bottom"), new Component("left"), new Component("right")]);
let iteratorResult1 = frame.next(); //{ done: false, value: Component { name: 'top' } }
let iteratorResult2 = frame.next(); //{ done: false, value: Component { name: 'bottom' } }
let iteratorResult3 = frame.next(); //{ done: false, value: Component { name: 'left' } }
let iteratorResult4 = frame.next(); //{ done: false, value: Component { name: 'right' } }
let iteratorResult5 = frame.next(); //{ done: true, value: null }

//Es posible acceder al valor del resultado del iterador a través de la propiedad value:
let component = iteratorResult1.value; //Component { name: 'top' }
```
De nuevo. El iterador no es una característica exclusiva de TypeScript. Este código funcionaría sin implementar interfaces explícitas para Iterator e IteratorResult. Sin embargo, es muy útil utilizar estas [interfaces](./types/interfaces.md) comunes a ES6 para mantener consistencia en tu código.

Ok, pero podría ser más util. ES6 define el *protocolo de iterabilidad* que incluye el símbolo(`symbol`) [Symbol.iterator] si la interface Iterable es implementada:

```ts
//...
class Frame implements Iterable<Component> {

  constructor(public name: string, public components: Component[]) {}

  [Symbol.iterator]() {
    let pointer = 0;
    let components = this.components;

    return {
      next(): IteratorResult<Component> {
        if (pointer < components.length) {
          return {
            done: false,
            value: components[pointer++]
          }
        } else {
          return {
            done: true,
            value: null
          }
        }
      }
    }
  }
}

let frame = new Frame("Door", [new Component("top"), new Component("bottom"), new Component("left"), new Component("right")]);
for (let cmp of frame) {
  console.log(cmp);
}
```

Desafortunadamente, `frame.next()` no funcionará con este patrón y también se lo ve un poco desorganizado. IterableIterator al rescate!
```ts
//...
class Frame implements IterableIterator<Component> {

  private pointer = 0;

  constructor(public name: string, public components: Component[]) {}

  public next(): IteratorResult<Component> {
    if (this.pointer < this.components.length) {
      return {
        done: false,
        value: this.components[this.pointer++]
      }
    } else {
      return {
        done: true,
        value: null
      }
    }
  }

  [Symbol.iterator](): IterableIterator<Component> {
    return this;
  }

}
//...
```
Ahora tanto `frame.next()` y `for` cycle funcionan bien con la interface IterableIterator.

El iterador no tiene que estar limitado a iterar a un valor finito. El típico ejemplo es la serie de Fibonacci:

```ts
class Fib implements IterableIterator<number> {

  protected fn1 = 0;
  protected fn2 = 1;

  constructor(protected maxValue?: number) {}

  public next(): IteratorResult<number> {
    var current = this.fn1;
    this.fn1 = this.fn2;
    this.fn2 = current + this.fn1;
    if (this.maxValue != null && current >= this.maxValue) {
      return {
        done: true,
        value: null
      } 
    } 
    return {
      done: false,
      value: current
    }
  }

  [Symbol.iterator](): IterableIterator<number> {
    return this;
  }

}

let fib = new Fib();

fib.next() //{ done: false, value: 0 }
fib.next() //{ done: false, value: 1 }
fib.next() //{ done: false, value: 1 }
fib.next() //{ done: false, value: 2 }
fib.next() //{ done: false, value: 3 }
fib.next() //{ done: false, value: 5 }

let fibMax50 = new Fib(50);
console.log(Array.from(fibMax50)); // [ 0, 1, 1, 2, 3, 5, 8, 13, 21, 34 ]

let fibMax21 = new Fib(21);
for(let num of fibMax21) {
  console.log(num); //Imprime la secuencia de fibonacci de 0 a 21
}
```

#### Crear código con iteradores para ES5
Los ejemplos anterior requiren ES6. Sin embargo, pueden funcionar con ES5 si el motor JS soporta `Symbol.iterator`. Esto se puede lograr usando una una lib ES6 con un objetivo ES5 (agregá es6.d.ts a tu proyecto para que compile). Código compliado debería funcionar en node 4+, Google Chrome y otros navegadores.

---

## Fuente: `typescript-book/docs/javascript/closure.md`

## Cierre

Lo mejor que JavaScript son los cierres. Una función en JavaScript tiene acceso a cualquier variable que haya sido definida en su ámbito externo (outer scope). Los cierres se explican mejor con ejemplos:

```ts
function outerFunction(arg) {
    var variableInOuterFunction = arg;

    function bar() {
        console.log(variableInOuterFunction); // Acceso a una variable del ámbito externo
    }

    // Llama a la función local para demostrar que tiene acceso a arg
    bar();
}

outerFunction("hello closure"); // imprime "hello closure!"
```

Puedes ver que la función interna tinene acceso a una variable (`variableInOuterFunction`) del ámbito externo. Las variables en el ámbito externo han sido cerradas (o rodeadas) por la función interior. De ahí el término **cierres** (o closures). El concepto en si mismo es simple y bastante intuitivo.

Ahora la parte increíble: La función interna puede acceder las variables de su ámbito externo *incluso luego de que la función externa ya haya devuelto (o returned).* Esto se debe a que las variables siguen conectadas en la función interna y no dependen de la función externa. De nuevo, miremos un ejemplo: 

```ts
function outerFunction(arg) {
    var variableInOuterFunction = arg;
    return function() {
        console.log(variableInOuterFunction);
    }
}

var innerFunction = outerFunction("hello closure!");

// Noten que la función externa ha devuelto
innerFunction(); // imprime "hello closure!"
```

### Razón por la cual es genial
Te permite construir objetos fácilmente, por ejemplo, revelando el patrón modelo:

```ts
function createCounter() {
    let val = 0;
    return {
        increment() { val++ },
        getVal() { return val }
    }
}

let counter = createCounter();
counter.increment();
console.log(counter.getVal()); // 1
counter.increment();
console.log(counter.getVal()); // 2
```
A un nivel más alto, también es lo que permite que algo como Node.js exista (no te preocupes si no hace click en tu cerebro en este momento, lo hará eventualmente 🌹):

```ts
// Pseudo código para explicar el concepto
server.on(function handler(req, res) {
    loadData(req.id).then(function(data) {
        // la `res` ha sido cerrado y está disponible
        res.send(data);
    })
});
```

---

## Fuente: `typescript-book/docs/javascript/equality.md`

## Igualdad

One cosa con la que hay que tener cuidado en Javascript es la diferencia entre `==` y `===`. Como JavaScript trata de ser resiliente contra errores de programación, `==` trata de coercer los tipos de dos variables. Por ejemplo, convierte una string a un número para que los puedas comparar: 

```js
console.log(5 == "5"); // verdadero   , TS Error
console.log(5 === "5"); // falso , TS Error
```

Sin embargo, las elecciones de Javascript no siempre son ideales. Por ejemplo, en el ejemplo que sigue la primera declaración es falsa porque `""` y `"0"` son los dos strings y claramente no iguales. Sin embargo, en el segundo caso, ambos `0` y la string vacía (`""`) son falsy (en otras palabras, se comportan como `falso`) y son, por lo tanto, iguales en lo que respecta a `==`. Ambas declaraciones son falsas cuando se utiliza `===`.

```js
console.log("" == "0"); // falso
console.log(0 == ""); // verdadero

console.log("" === "0"); // falso
console.log(0 === ""); // falso
```

> Notemos que tanto `string == numbero` como `string === numbero`  son errores de compilación en TypeScript, asi que normalmente no tienes que preocuparte por esto.

De forma similar a `==` vs. `===`, hay un `!=` vs. `!==`

Así que un consejo Pro: siempre usá `===` y `!==` excepto para checkear nulls (cubriremos por qué luego).
Similar to `==` vs. `===`, there is `!=` vs. `!==`

## Igualdad estructural
Si quieres comparar dos objectos para igualdad estructural, `==`/`===` ***no*** son suficientes. Por ejemplo,  

```js
console.log({a:123} == {a:123}); // Falso
console.log({a:123} === {a:123}); // Falso
```
Para hacer este tipo de chequeos debes usar el paquete de npm [deep-equal](https://www.npmjs.com/package/deep-equal). Por ejemplo: 

```js
import * as deepEqual from "deep-equal";

console.log(deepEqual({a:123},{a:123})); // Verdadero
```

Sin embargo, generalmente no es necesario realizar chequeos profundos y todo lo que realmente es necesario es chequear por medio de un `id`. Por ejemplo: 

```ts
type IdDisplay = {
  id: string,
  display: string
}
const list: IdDisplay[] = [
  {
    id: 'foo',
    display: 'Foo Select'
  },
  {
    id: 'bar',
    display: 'Bar Select'
  },
]

const fooIndex = list.map(i => i.id).indexOf('foo');
console.log(fooIndex); // 0
```

---

## Fuente: `typescript-book/docs/javascript/null-undefined.md`

## Null y Undefined

> [Video gratis en YouTube sobre este tema](https://www.youtube.com/watch?v=kaUfBNzuUAI)

JavaScript (y por extensión TypeScript) tiene dos *bottom types*: `null` y `undefined`. Estos tienen diferentes significados *intencionalmente*:

* Algo no ha sido inicializado: `undefined`.
* Algo no se ecuentra disponible: `null`.

### Chequeando por alguno de los dos

La realidad es que vas a tener que lidiar con ambos. Interesantemente, en Javascript, utilizando `==`, `null` y `undefined` son solamente iguales entre sí.

```ts
// Tanto null como undefined son solamente `==` entre si y con el otro:
console.log(null == null); // true (of course)
console.log(undefined == undefined); // true (of course)
console.log(null == undefined); // true


// No tienes que preocuparte por que valores falsy pasen esta comparación
console.log(0 == undefined); // false
console.log('' == undefined); // false
console.log(false == undefined); // false
```
Se recomienda utilizar `== null` para chequear tanto por `undefined` como por `null`. Generalmente no querrás hacer distinción entre uno y otro.

```ts
function foo(arg: string | null | undefined) {
  if (arg != null) {
    // arg debe ser una string ya que `!=` descarta tanto null como undefined
  }
}
```

> También podrías usar `== undefined`, pero `== null` es más corto y sigue la convención.

Hay una excepción: valores `undefined` a nivel raíz (root level). Discutiremos este caso a continuación.


### Chequeando undefined a nivel raíz

Recuerden que dije que deberían utilizar `== null`. Claramente sí (ya que acabo de decirlo ^). No lo utilicen para cosas a nivel raíz (o root level). En modo estricto, si usas `foo` y `foo` es undefined, recives una **excepción**  `ReferenceError` (o error de referencia) y todo el stack de llamadas se desarma.

> Deberías usar modo estricto... incluso, el compilador de TS lo insertará por tí si utilizas módulos... Más sobre esto más adelante en el libro, así que no de necesitas ser explícito al respecto.

Así que para chequear si una variable es definida o no a nivel *global* normalmente utilizas `typeof`:

```ts
if (typeof someglobal !== 'undefined') {
  // ahora es seguro utilizar someglobal
  console.log(someglobal);
}
```

### Limitá el uso explícito de `undefined`
Debido a que TypeScript te da la oportunidad de *documentar* tus estructuras de forma separada de los valores, en lugar de hacer algo como: 

```ts
function foo(){
  // if Algo
  return {a:1,b:2};
  // else
  return {a:1,b:undefined};
}
```
deberías utilizar anotación de tipos:
```ts
function foo():{a:number,b?:number}{
  // if Algo
  return {a:1,b:2};
  // else
  return {a:1};
}
```

### Devoluciones de llamada (o callbacks) estilo Node
Funciones de devolución de llamada (o callback) estilo Node (por ejemplo, `(err,somethingElse)=>{ /* something */ }`) generalmente son llamadas con `err` como null si no hay un error. Generalmente se utiliza un chequeo truthy para verificar esto:

```ts
fs.readFile('someFile', 'utf8', (err,data) => {
  if (err) {
    // haz algo
  } else {
    // no hay error
  }
});
```
Al crear tus propias APIs está *okay* utilizar `null`, en este caso para preservar la consistencia. Con toda sinceridad, para tus propias APIs deberías considerar promesas, ya que en ese caso no tendrás que preocuparte con valores de error ausentes (los manejas con `.then` vs. `.catch`)

### No utilices `undefined` como medio de denotar *validez*

Por ejemplo, en una horrible función como la siguiente:

```ts
function toInt(str:string) {
  return str ? parseInt(str) : undefined;
}
```
que puede ser re-escrita y mejorada asi: 
```ts
function toInt(str: string): { valid: boolean, int?: number } {
  const int = parseInt(str);
  if (isNaN(int)) {
    return { valid: false };
  }
  else {
    return { valid: true, int };
  }
}
```

### JSON y serialización

El estándar JSON soporta la codificación de `null` pero no de `undefined`. Al codificar a JSON un objecto que contiene un atributo `null`, el atributo será incluido con su valor `null`, mientras que un atributo con valor `undefined` será excluido en su totalidad.

```ts
JSON.stringify({quedara: null, seIra: undefined}); // {"willStay":null}
```

Como resultado, las bases de datos JSON pueden soportar valores `null` pero no `undefined`. Dado que los atributos con valor `null` son codificados, puedes transmitir la intención de vaciar un atributo al setear su valor a `null` antes de codificarlo, y transmitiendo el objeto a un almacenamiento remoto. 

Setear los valores de un atributo a `undefined` puede conservar espacio de almacenamiento y costos de transmisión, ya que los nombres de atributos no serán codificados. Sin embargo, eso puede complicar la semántica de vaciar valores vs. crear valores ausentes.

### Conclusiones
El equipo de TypeScript no utiliza `null`: [Guía de programación TypeScript](https://github.com/Microsoft/TypeScript/wiki/Coding-guidelines#null-and-undefined) y eso no a causado ningún problema. Douglas Crockford piensa que [`null` es una mala idea](https://www.youtube.com/watch?v=PSGEjv3Tqo0&feature=youtu.be&t=9m21s) y que todos deberíamos utilizar `undefined`.

Sin embargo, codigos de base con estilo NodeJS utilizan `null` como estándar de argumentos para Errores ya que denoa que `algo esta actualmente no disponible`. Personalmente, no me importa distinguir entre ambos ya que la mayoría de los proyectos utilizan librerias con diferentes opiniones y ambos pueden ser descartados con `== null`.

---

## Fuente: `typescript-book/docs/javascript/number.md`

## Número
Cuando estés manipulando números en cualquier lenguage de programación debés estar al tanto de las idiosincracias sobre como el lenguage manipula los números. Aquí hay algunas piezas crítica de información que deberías tener en cuenta sobre números en JavaScript.

### Tipo núcleo
JavaScript sólamente tiene un tipo de número. Es un `Number` de doble precisión y 64-bits. A continuación desarrollamos sus limitación junto con una solución recomendada.

### Decimal
Para aquellos que conozcan los números dobles y los números flotantes, sabrán que los números flotantes *no se asignan* correctamente a números Decimales. Un ejemplo trivial (y famoso) con los números incluídos en JavaScript es el siguiente:

```js
console.log(.1 + .2); // 0.30000000000000004
```

> Para matemática decimal verdadera usen `big.js`, mencionada más adelante

### Integral
Los limites integrales representados por el tipo de número incluido son `Number.MAX_SAFE_INTEGER` y `Number.MIN_SAFE_INTEGER`.

```js
console.log({max: Number.MAX_SAFE_INTEGER, min: Number.MIN_SAFE_INTEGER});
// {max: 9007199254740991, min: -9007199254740991}
```

**Safe**, en este contexto, hace referencia a el hecho de que el valor *no puede ser el resultado de un error de redondeo*.

Los valores *unsafe*, o inseguros, son los números seguros `+1 / -1` y cualquier cantidad de adición o sustracción *redondeará* el resultado.

```js
console.log(Number.MAX_SAFE_INTEGER + 1 === Number.MAX_SAFE_INTEGER + 2); // verdadero!
console.log(Number.MIN_SAFE_INTEGER - 1 === Number.MIN_SAFE_INTEGER - 2); // verdadero!

console.log(Number.MAX_SAFE_INTEGER);      // 9007199254740991
console.log(Number.MAX_SAFE_INTEGER + 1);  // 9007199254740992 - Correcto
console.log(Number.MAX_SAFE_INTEGER + 2);  // 9007199254740992 - redondeado!
console.log(Number.MAX_SAFE_INTEGER + 3);  // 9007199254740994 - redondeado - correcto por suerte
console.log(Number.MAX_SAFE_INTEGER + 4);  // 9007199254740996 - redondeado!
```

Para chequear si es seguro, puedes utilizar `Number.isSafeInteger` de ES6:

```js
// valor seguro
console.log(Number.isSafeInteger(Number.MAX_SAFE_INTEGER)); // verdadero

// valor inseguro
console.log(Number.isSafeInteger(Number.MAX_SAFE_INTEGER + 1)); // falso

// Dado que puede haber sido redondeado debido a exceso
console.log(Number.isSafeInteger(Number.MAX_SAFE_INTEGER + 10)); // falso
```
> Eventualmente, JavaScript recibirá soporte para [BigIng](https://developers.google.com/web/updates/2018/05/bigint). Por ahora, si quieres matemática integral con precisión arbitraria, utilizá `big.js`.

### big.js
Cada vez que utilices la matemática para cálculos financieros (por ejemplo, cálculos GST, dinero con centavos, sumas, etc) utilizá una libreria como [big.js](https://github.com/MikeMcl/big.js/) la cual está diseñada para realizar
* matemática decimal perfecta
* Valores integrales seguros fuera de los límites

El método de instalación es sencillo:
```bash
npm install big.js @types/big.js
```

Ejemplo corto de utilización:

```js
import { Big } from 'big.js';

export const foo = new Big('111.11111111111111111111');
export const bar = foo.plus(new Big('0.00000000000000000001'));

// To get a number:
const x: number = Number(bar.toString()); // Loses the precision
```

> No utilices esta librería para matemáticas para Interfaces de Usuario o propósitos de performance intensivos, como gráficos, dibujo en canvas, etc.

### NaN
Cuando un cálculo numérico no es representable por un número válido, JavaScript devuelve un valor especial `NaN`. Un ejemplo clásico son los números imaginarios:

```js
console.log(Math.sqrt(-1)); // NaN
```

Note: Chequeos de igualdad **no** funcionan con `NaN`. Utilizá `Number.isNaN` en su lugar:

```js
// No hagas esto
console.log(NaN === NaN); // falso!!

// Hacé esto
console.log(Number.isNaN(NaN)); // verdadero
```

### Infinito
Los valores límites representables en Numero están disponibles en los valores estáticos `Number.MAX_VALUE` y `-Number.MAX_VALUE`

```js
console.log(Number.MAX_VALUE);  // 1.7976931348623157e+308
console.log(-Number.MAX_VALUE); // -1.7976931348623157e+308
```

Valores fuera del rango donde la precision no cambia están atados a estos límites. Por ejemplo:

```js
console.log(Number.MAX_VALUE + 1 == Number.MAX_VALUE);   // true!
console.log(-Number.MAX_VALUE - 1 == -Number.MAX_VALUE); // true!
```

Valores afuera del rango donde la precisión cambia resulven a los valores especiales `Infinity`/`-Infinity`. Por ejemplo:

```js
console.log(Number.MAX_VALUE + 10**1000);  // Infinity
console.log(-Number.MAX_VALUE - 10**1000); // -Infinity
```

Por supuesto, estos valores infinitos especiales también aparecen con aritmética que los requiere. Por ejemplo: 

```js
console.log( 1 / 0); // Infinity
console.log(-1 / 0); // -Infinity
```

Puedes usar estos valores `Infinity` manualmente o a través de miembros estáticos de la clase `Number`: 

```js
console.log(Number.POSITIVE_INFINITY === Infinity);  // verdadero
console.log(Number.NEGATIVE_INFINITY === -Infinity); // verdadero
```

Por suerte, los valores infinitos funcionan confiablemente con los operadores de comparación (`<` / `>`):

```js
console.log( Infinity >  1); // verdadero
console.log(-Infinity < -1); // verdadero
```

### Infinitesimal

El número más pequeño representable en Number que no es cero esta disponible como el valor estático `Number.MIN_VALUE`

```js
console.log(Number.MIN_VALUE);  // 5e-324
```

Valores más pequeños que el `MIN_VALUE` son convertidos a 0.

```js
console.log(Number.MIN_VALUE / 10);  // 0
```

> Más intuición: De la misma manera que los valores más grandes que `Number.MAX_VALUE` quedan atados a INFINITY, los valores más pequeños que `Number.MIN_VALUE` quedan atados a 0.

---

## Fuente: `typescript-book/docs/javascript/recap.md`

# Tu JavaScript es TypeScript

Hubieron (y van a seguir habiendo) muchos competidores en compiladores de *alguna sintaxis* a *JavaScript*. TypeScript es diferente en el sentido de que *Tu Javascript es Typescript*. Aquí hay un diagrama:

![JavaScript es TypeScript](https://raw.githubusercontent.com/basarat/typescript-book/master/images/venn.png)

Sin embargo, eso significa que *tenés que aprender JavaScript* (las buenas noticias son que *vos **solo** tenes que aprender JavaScript*). TypeScript simplemente está estandarizando todas las maneras en las que poder proveer *buena documentación* en JavaScript.

* Darte una nueva sintaxis no ayuda a resolver las bugs (mirandote a vos CoffeScript)
* Crear un nuevo lenguaje te abstrae demasiado de tus tiempos de ejecucion, comunidades (mirandote a vos Dart)

Typescript es Javascript con documentación.

## Mejorando JavaScript

TypeScript tratará de protegerte de partes de JavaScript que nunca funcionaron (así que no tenés que recordar estas cosas):

```ts
[] + []; // JavaScript te dará "" (lo que no tiene sentido), TypeScript tirará un error

//
// otras cosas que no tienen sentido en Javascript
// - no hay errores en tiempo de ejecución (hace que depurar sea dificil)
// - pero TypeScript te dará errores al compilar (haciendo la depuración innecesaria)
//
{} + []; // JS : 0, TS Error
[] + {}; // JS : "[object Object]", TS Error
{} + {}; // JS : NaN or [object Object][object Object] dependiendo del navegador, TS Error
"hello" - 1; // JS : NaN, TS Error

function add(a,b) {
  return
    a + b; // JS : undefined, TS Error 'unreachable code detected' (código inacalcanzable detectado)
}
```
Esencialmente TypeScript está *linteando* Javascript. Pero haciendo un mejor trabajo que otros linters que no tienen *información sobre tipos*

## Igual tenés que aprender JavaScript

Habiendo dicho eso, TypeScript es muy pragmatico sobre le hecho de que *estás escribiendo JavaScript*, por lo que hay ciertas cosas sobre JavaSCript que igual debes saber en order para no caer desprevenido. Discutamolas a continuación.

> Nota: TypeScript es un superconjunto de Javascript. Pero con documentación que puede ser utilizada por compiladores / IDEs ;)

---

## Fuente: `typescript-book/docs/javascript/references.md`

## Referencias

Más allá de los literales, cualquier Objeto en JavaScript (incluyendo funciones, arrays, regexp, etc) son referencias. Esto significa lo siguiente:

### Las mutaciones ocurren en todas las referencias

```js
var foo = {};
var bar = foo; // bar es una referencia al mismo objeto

foo.baz = 123;
console.log(bar.baz); // 123
```

### La igualdad corresponde a las referencias

```js
var foo = {};
var bar = foo; // bar es una referencia
var baz = {}; // baz es un *nuevo objecto* diferente a `foo`

console.log(foo === bar); // verdadero
console.log(foo === baz); // falso
```

---

## Fuente: `typescript-book/docs/javascript/this.md`

## this

Cualquier acceso a la palabra clave `this` dentro de una función está en realidad controlado por como la función es llamada, a lo que habitualmente se le llama "contexto de llamada" '(o *calling context*)

Aquí hay un ejemplo:

```ts
function foo() {
  console.log(this);
}

foo(); // anota lo global, por ejemplo `window` en los navegadores
let bar = {
  foo
}
bar.foo(); // anota `bar` ya que `foo` Logs out `bar` as `foo` was called on `bar`
```
Así que ten cuidado con tu utilización de `this`. Si quieres desconectar `this` en una clase del contexto de llamada, utiliza una función de flecha. [más sobre eso luego][arrow]

[arrow]:../arrow-functions.md

---

## Fuente: `typescript-book/docs/javascript/truthy.md`

## Truthy

JavaScript tiene un concepto `truthy`, es decir, cosas que son evaluadas como `verdaderas` en ciertas situaciones (por ejemplo, en condiciones `if` y los operadores booleanos `&&` y `||`). Las siguientes cosas son truthy en JavaScript. Por ejemplo, cualquier número excepto `0` es evaluado como truthy: 

```ts
if (123) { // será tratado como `true`
  console.log('Cualquier número que no sea 0 es truthy');
}
```

Algo que no es truthy es `falsy`.

Aquí hay una tabla de referencia.


| Tipo de variable   | Cuándo es *falsy*        | Cuándo es *truthy*       |
|--------------------|--------------------------|--------------------------|
| `boolean`          | `false`                  | `true`                   |
| `string`           | `''` (string vacía)      | cualquier otra string    |
| `number`           | `0`  `NaN`               | cualquier otro número    |
| `null`             | siempre                  | nunca                    |
| `undefined`        | siempre                  | nunca                    |
| Cualquier Objeto incluyendo los vacíos (`{}`, `[]`) | nunca | siempre |


### Siendo explícito

> El patrón `!!`

Comúnmente ayuda ser explícito en la intención de tratar un valor como `boolean` y convertirlo en un *verdadero booleano* (`true`|`false`). Puedes convertir valores a verdaderos booleanos al prefixarlos con `!!`, por ejemplo, `!!foo`. Es sólo `!` utilizado dos veces. El primer `!` convierte la variable (en este caso `foo`) a un booleano, pero invierte la lógica <*truthy* - `!` > `false`, *falsy* - `!` > `true`. El segundo vuelve a invertirlo para igualar la naturaleza del objeto original: *truthy* -`!`> `false` -`!`> `true`.

Es común utilizar este patrón en muchos lugares. Por ejemplo, 

```js
// variables directas
const hasName = !!name;

// Como miembros de objetos
const someObj = {
  hasName: !!name
}

// e.g. en ReactJS JSX
{!!someName && <div>{someName}</div>}
```

---

## Fuente: `typescript-book/docs/jsx/others.md`

# JSX por fuera de React

TypeScript les permitirá utilizar algo más que React con JSX preservando la seguridad de tipos. La sigueinte lista muestra los items customizables, pero noten que esto es para autores de frameworks UI avanzados:

* Pueden inhabilitar la emisión de estilo `react` usando la opción `"jsx": "preserve"`. Esto significa que JSX es emitido *como está* y que luego podrán usar su propio transpilador para las porciones con JSX.
* Usando el módulo global `JSX`:
    * Podrán controlar que etiquetas HTML se encuentran disponibles y cómo son controlados los tipos mediante la customización de los miembros de la interfaz `JSX.IntrisicElements`.
    * Al usar componentes:
        * Pueden controlar cuál `clase` puede ser heredada por componentes mediante la customización de la declaración default `interface ElementClass extends React.Component<any, any> { }`.
        * Pueden controlar qué propiedad es usanda para controlar los tipos de los atributos (el default es `props`) customizando la declaración `declare module JSX { interface ElementAttributesProperty { props: {}; } }`.

## `jsxFactory`

Pasar `--jsxFactory <JSX factory Name>` junto con `--jsx react` permite que se use una fábrica JSX diferente `React`.

El nuevo nombre de la fábrica será usado para llamar las funciones `createElement`.

### Ejemplo

```ts
import {jsxFactory} from "jsxFactory";

var div = <div>Hello JSX!</div>
```

Compilado con:

```shell
tsc --jsx react --reactNamespace jsxFactory --m commonJS
```

Resulta:

```js
"use strict";
var jsxFactory_1 = require("jsxFactory");
var div = jsxFactory_1.jsxFactory.createElement("div", null, "Hello JSX!");
```

## `jsx` pragma

Hasta pueden especificar una `jsxFactory` diferente por archivo, usando `jsxPragma`:


```js
/** @jsx jsxFactory */
import {jsxFactory} from "jsxFactory";

var div = <div>Hola JSX!</div>
```

Con `--jsx react` este archivo emitirá para usar la fábrica declarada en el jsx pragma:
```js
"use strict";
var jsxFactory_1 = require("jsxFactory");
var div = jsxFactory_1.jsxFactory.createElement("div", null, "Hello JSX!");
```

---

## Fuente: `typescript-book/docs/jsx/react.md`

# React JSX

> [Curso PRO de Egghead sobre TypeScript y React](https://egghead.io/courses/use-typescript-to-develop-react-applications)

## Preparación

Nuestro [Quickstart para el navegador ya los prepara para trabajar con applicaciones React](../quick/browser.md). Aquí están los puntos más importantes:

* Usen archivos con la extensión `.tsx` (en lugar de `.ts`).
* Usen `"jsx": "react"` en `compilerOptions` de su `tsconfig.json`.
* Instalen las definiciones de tipo para JSX y React: (`npm i -D @types/react @types/react-dom`).
* Importen React a sus archivos `.tsx` (`import * as React from "react"`).

## Etiquetas HTML vs. Componentes

React puede renderizar etiquetas HTML (strings) o componentes React (classes). La emisión de JavaScript para estos elementos es diferente (`React.createElement('div')` vs. `React.createElement(MyComponent)`). La forma en la que esto se determina es por la *primera letra*: si es mayúscula o minúscula. `foo` será tratado como una etiqueta HTML y `Foo` será tratado como un componente.

## Control de tipos

### Etiquetas HTML

Una etiqueta HTML `foo` es de tipo `JSX.IntrinsicElements.foo`. Estos tipos se encuentran definidos por las etiquetas en el archivo `react-jsx.d.ts`, el cual les hicimos instalar como parte de la preparación. A continuación hay un ejemplo del contenido del archivo:

```ts
declare module JSX {
    interface IntrinsicElements {
        a: React.HTMLAttributes;
        abbr: React.HTMLAttributes;
        div: React.HTMLAttributes;
        span: React.HTMLAttributes;

        /// so on ...
    }
}
```

### Componentes Funcionales

Pueden definir los componentes funcionales con la interfaz `React.FunctionComponent`:

```ts
type Props = {
  foo: string;
}
const MyComponent: React.FunctionComponent<Props> = (props) => {
    return <span>{props.foo}</span>
}

<MyComponent foo="bar" />
```

### Componentes Clase

Los componentes tienen control de tipos basado en su propiedad `props`. Esto se encuentra modelado a partir de como JSX es transformado, es decir, los atributos se convierten en las `props` del componente.

El archivo `react.d.ts` define la clase `React.Component<Props,State>` la cual deberán extender proveyendo sus propias interfaces `Props` y `State`. Mostramos un ejemplo a continuación:

```ts
type Props = {
  foo: string;
}
class MyComponent extends React.Component<Props, {}> {
    render() {
        return <span>{this.props.foo}</span>
    }
}

<MyComponent foo="bar" />
```

### Pista para React JSX: Interface para rendibles

React puede rendir un algunas cosas como `JSX` o `string`. Estas cosas se encuentran consolidadas en el tipo `React.ReactNode`. Usenlo cuando quieran aceptar rendibles:

```ts
type Props = {
  header: React.ReactNode;
  body: React.ReactNode;
}
class MyComponent extends React.Component<Props, {}> {
    render() {
        return <div>
            {this.props.header}
            {this.props.body}
        </div>;
    }
}

<MyComponent header={<h1>Header</h1>} body={<i>body</i>} />
```

### Pista para React JSX: Aceptar una instancia de un Componente

Las definiciones de tipo de React proveen un `React.ReactElement<T>` que les permitirá anotar el resultado de la instanciación de un componente de clase `<T/>`. Por ejemplo:

```js
class MyAwesomeComponent extends React.Component {
  render() {
    return <div>Hello</div>;
  }
}

const foo: React.ReactElement<MyAwesomeComponent> = <MyAwesomeComponent />; // OK
const bar: React.ReactElement<MyAwesomeComponent> = <NotMyAwesomeComponent />; // Error!
```

> Por supuesto que pueden usar esto como una anotación para argumentos de funciones, e incluso como miembros prop de los componentes React.

### Pista para React JSX: Aceptar un *componente* que pueda actuar sobre props y ser rendido usando JSX

El tipo `React.Component<Props>` consolida `React.ComponentClass<P> | React.StatelessComponent<P>` por lo que pueden aceptar *algo* que tome el tipo `Props` y lo rinda usando JSX. Por ejemplo:

```ts
const X: React.Component<Props> = foo; // de algún lado

// Rendir X con algunas props:
<X {...props}/>;
```

### Pista para React JSX: Componentes Genéricos

Funcionan exactamente como es de esperar. Por ejemplo:

```ts
/** Componente genérico */
type SelectProps<T> = { items: T[] }
class Select<T> extends React.Component<SelectProps<T>, any> { }

/** Uso */
const Form = () => <Select<string> items={['a','b']} />;
```

### Funciones genéricas

Algo como lo siguiente funciona perfectamente bien:

```ts
function foo<T>(x: T): T { return x; }
```

Sin embargo, una función genérica de flecha gorda no funcionará:

```ts
const foo = <T>(x: T) => x; // ERROR : unclosed `T` tag
```

**Solución**: Usen `extends` en el parámetro genérico para darle una pista al compilador de que es un genérico:

```ts
const foo = <T extends {}>(x: T) => x;
```

### Pista React: Refs con tipos fuertes
Básicamente, deberán inicializar una variable como una unión de la ref y `null`, y luego inicializarlo como una devolución de llamada:

```ts
class Example extends React.Component {
  example() {
    // ... algo
  }
  
  render() { return <div>Foo</div> }
}


class Use {
  exampleRef: Example | null = null; 
  
  render() {
    return <Example ref={exampleRef => this.exampleRef = exampleRef } />
  }
}
```

Deberán hacer lo mismo con refs de elementos nativos:

```ts
class FocusingInput extends React.Component<{ value: string, onChange: (value: string) => any }, {}>{
  input: HTMLInputElement | null = null;
    
  render() {
    return (
      <input
        ref={(input) => this.input = input}
        value={this.props.value}
        onChange={(e) => { this.props.onChange(e.target.value) } }
        />
      );
    }
    focus() {
      if (this.input != null) { this.input.focus() }
    }
}
```

### Aserción de tipos

Usen la sintaxis `as Foo` para aserciones de tipo como [mencionamos anteriormente](./type-assertion.md#as-foo-vs-foo).

## Props default

* Componentes con estado con props default: Pueden decirle a TypeScript que una propiedad que va a ser proveída externamente (por React) utiliando un operador de *aserción null* (esto no es ideal pero es la manera más simple y que requiere la menor candidad de *código extra* que se me ocurrió).

```tsx
class Hello extends React.Component<{
  /**
   * @default 'TypeScript'
   */
  compiler?: string,
  framework: string
}> {
  static defaultProps = {
    compiler: 'TypeScript'
  }
  render() {
    const compiler = this.props.compiler!;
    return (
      <div>
        <div>{compiler}</div>
        <div>{this.props.framework}</div>
      </div>
    );
  }
}

ReactDOM.render(
  <Hello framework="React" />, // TypeScript React
  document.getElementById("root")
);
```

* SFC con props default: Recomendamos aprovechar patrones JavaScript simples ya que funcionan bien con el sistema de tipos de TypeScript.

```tsx
const Hello: React.SFC<{
  /**
   * @default 'TypeScript'
   */
  compiler?: string,
  framework: string
}> = ({
  compiler = 'TypeScript', // Default prop
  framework
}) => {
    return (
      <div>
        <div>{compiler}</div>
        <div>{framework}</div>
      </div>
    );
  };


ReactDOM.render(
  <Hello framework="React" />, // TypeScript React
  document.getElementById("root")
);
```

---

## Fuente: `typescript-book/docs/jsx/tsx.md`

# Soport JSX

TypeScript soporta la transpilación y el análisis de código JSX. Si JSX no les es familiar, aquí hay un extracto de la [web oficial](https://facebook.github.io/jsx/):

> JSX es una extensión de sintaxis similar a XML para ECMAScript sin ninguna semántica definida. NO es la intención que sea utilizada por motores o navegadores. NO es una propuesta de incorporar JSX a las especificaciones de ECMAScript en sí mismas. La intención es que sea usado por varios preprocesadores (transpiladores) para tranformar estos tokens en ECMAScript estándar.

Los motivos detrás de la creación de JSX es permitir que los usuarios escriban vistas similares a HTML *en JavaScript*, lo que les permitirá:

* Tener la vista con control de Tipos por el mismo código que controlará su JavaScript
* Que la vista esté al tanto del contexto en el que va a operar (para, por ejemplo, fortalecer la conexión *controler-vista* en MVC tradicional)
* Reusar patrones de JavaScript para mantener HTML, como `Array.prototype.map`, `?:`, `switch`, etc, en lugar de crear alternativas nuevas (y probablemente mal tipadas)

Esto disminuye las chances de errores e incrementa la mantenibilidad de tus interfaces de usuarios. El consumidor principal de JSX en este momento ens [ReactJS de Facebook(http://facebook.github.io/react/). Este será el uso de JSX que discutiremos en este libro.

---

## Fuente: `typescript-book/docs/let.md`

### let

Variables `var` en JavaScript están en el *ámbito de función*. Esto es diferente de muchos otros lenguages (C# / Java, etc) donde las variables están en el *ámbito de bloque*. Si vienes a JavaScript con una mentalidad de *ámbito de bloque*, puedes esperar que lo siguiente imprima `123`, cuando en realidad imprimirá `456`:

```ts
var foo = 123;
if (true) {
    var foo = 456;
}
console.log(foo); // 456
```
Esto se debe a que `{` no crea un nuevo *ámbito de variable*. La variable `foo` es la misma dentro del *bloque* if como fuera del bloque. Esta es una fuente común de errores de programación en JavaScript. Es por esto que TypeScript (y ES6) intoducieron la palabra clave `let`, que permite definir variables con verdadero *ámbito de bloque*. Es decir que si usan `let` en lugar de `var` tendrán un único elemento, desconectado de lo que haya fuera del ámbito. El mismo ejemplo con `let`:

```ts
let foo = 123;
if (true) {
    let foo = 456;
}
console.log(foo); // 123
```

Otro lugar donde `let` puede salvarte de errores es en bucles (loops).
```ts
var index = 0;
var array = [1, 2, 3];
for (let index = 0; index < array.length; index++) {
    console.log(array[index]);
}
console.log(index); // 0
```
Con toda sinceridad, creemos que es mejor usar `let` donde sea posible ya que lleva a menos sorpresas para nuevos desarrolladores y desarrolladores con experiencia en múltiples lenguages.

#### Las funciones crean un ámbito
Ya que lo mencionamos, nos gustaría demostrar que las funciones crean un nuevo ámbito de variables en JavaSCript. Considerá los siguiente:

```ts
var foo = 123;
function test() {
    var foo = 456;
}
test();
console.log(foo); // 123
```
Eso se comporta como esperarías. Sin esto, sería muy dificil escribir código en JavaScript.

#### JS generado
El JS generado por TypeScript simplemente renombra la variable `let` si ya existe una variable con un nombre similar existe en el ámbito que la rodea. Por ejemplo, el siguiente caso es generado tal cual con un simple reemplado de `let` por `var`: 

```ts
if (true) {
    let foo = 123;
}

// becomes //

if (true) {
    var foo = 123;
}
```
Sin embargo, si el nombre de la variable ya se encuentra tomada por el ambiente que la rodea, un nuevo nombre es generado, como se muestra a continuación (nota `foo_1`):

```ts
var foo = '123';
if (true) {
    let foo = 123;
}

// becomes //

var foo = '123';
if (true) {
    var foo_1 = 123; // Renamed
}
```

#### Switch
Puedes envolver los cuerpos de tus casos `case` en `{}` para reutilizar nombres de variables con confianza:

```ts
switch (name) {
    case 'x': {
        let x = 5;
        // ...
        break;
    }
    case 'y': {
        let x = 10;
        // ...
        break;
    }
}
```

#### let en cierres
Una pregunta de entrevista para desarrollador JavaScript que surge comúnmente es que imprime el siguiente archivo:

```ts
var funcs = [];
// Crea muchas funciones
for (var i = 0; i < 3; i++) {
    funcs.push(function() {
        console.log(i);
    })
}
// las llama
for (var j = 0; j < 3; j++) {
    funcs[j]();
}
```
Uno hubiese esperado que sea `0,1,2`. Sorprendemente, va a ser `3` para las 3 funciones. La razón es que las tress funciones están utilizando la variable `ì` desde el ámbito externo y al momento de ejecutarlas (en el segundo bucle) el valor de `i` va a ser `3` (la condición de terminación del primer bucle).

Una solución sería crear una nueva variable en cada bucle, específica para esa iteración. Como hemos aprendido antes, podemos crear una nueva variable por ámbito creando una nueva función y ejecutándola inmediatamente. Es decir, el patrón IIFE que vimos con las clases (`(function() { /* body */ })();`) como mostramos a continuación:

```ts
var funcs = [];
// crea muchas funciones
for (var i = 0; i < 3; i++) {
    (function() {
        var local = i;
        funcs.push(function() {
            console.log(local);
        })
    })();
}
// las llama
for (var j = 0; j < 3; j++) {
    funcs[j]();
}
```
Aquí las funciones cierran sobre la variable *local* (de ahí el nombre `cierres`) y usan esa variable en lugar de la variable `i` del bucle.

> Notá que los cierres vienen con un impacto en rendimiento (tienen que guardar el estado que las rodea).

La palabra clave `let` en un bucle tendría el mismo comportamiento que el ejemplo anterior:

```ts
var funcs = [];
// crea muchas funciones
for (let i = 0; i < 3; i++) { // Notemos el uso de let
    funcs.push(function() {
        console.log(i);
    })
}
// las llama
for (var j = 0; j < 3; j++) {
    funcs[j]();
}
```

Usar `let` en lugar de `var` crea una variable `i` única para cada iteración del bucle.

#### Resumen
`let` es extremadamente útil para la gran mayoría del código. Puede mejorar la legibilidad de tu código y disminuir las chances de un error de programación.

[](https://github.com/olov/defs/blob/master/loop-closures.md)

---

## Fuente: `typescript-book/docs/npm/index.md`

# NPM 

> Un dato curioso es que `npm` [no es una sigla](https://twitter.com/npmjs/status/347057301401763840), pero generalmente es llamado `node package manager`.

`npm` es un binario que viene incluido por default con la instalación de `node`, y es usado para administrar paquetes JavaScript / TypeScript compartidos en la comunidad.

* Los paquetes NPM son hosted (e instalados desde) https://www.npmjs.com/ (the ☁️).

## Preparación sencilla y rápida

* Los paquetes npm están configurados usando un archivo `package.json`. Pueden generar un archivo rápidamente usando `npm init -y`.
* Los paquetes son instalados en una carpeta `./node_modules`. Normalmente esta carpeta se encuentra incluida en su `.gitignore`.

> A pesar de que probablemente estén construyendo una aplicación, tener un `package.json` esencialmente convierte su proyecto en un paquete en sí mismo. Por lo tanto, los términos `proyecto | paquete` pueden ser usados intercambiablemente.

Cuando utilicen el paquete de alguien (por ejemplo, su equipo), este tendra un `package.json` que enumerará todas las dependencias que necesitan para correr el proyecto. Simplemente deben correr `npm install` y npm las bajará de la nube ☁️.
 
## Instalar un paquete
Pueden correr `npm install <algo>`. La mayoría de la gnete usará el atajo `npm i <algo>`. Por ejemplo:

```ts
// Instalar React
npm i react
```

> Esto agregará a `react` a las `dependencias` de su `package.json`.

## Instalar una devDependency
Las `devDependencies` son dependencias que son necesarias únicamente durante el proceso de desarrollo de su proyecto y no luego de que éste haya sido publicado.

`typescript` es una `devDependencies` común, ya que únicamente se la necesita para construir `.ts -> .js`. Normalmente publicarán los archivos `.js` construidos:

* en producción
* para consumisión por otros paquetes npm

## Seguridad
Los paquetes `npm` públicos son escaneados por equipos de securidad en todo el mundo, y los problemas que surgen son reportados al equipo de npm. Luego, ellos liberan recomendaciones de seguridad detallando el problema y las potenciales soluciones. Generalmente, la solución es actualizar el paquete.

Pueden correr una auditoría de su proyecto node con `npm audit`. Esto encontrará cualquier vulnerabilidad que peuda existir en el paquete o en cualquiera de sus dependencias. Por ejemplo:

```
┌───────────────┬──────────────────────────────────────────────────────────────┐
│ Low           │ Regular Expression Denial of Service                         │
├───────────────┼──────────────────────────────────────────────────────────────┤
│ Package       │ debug                                                        │
├───────────────┼──────────────────────────────────────────────────────────────┤
│ Dependency of │ jest [dev]                                                   │
├───────────────┼──────────────────────────────────────────────────────────────┤
│ Path          │ jest > jest-cli > istanbul-lib-source-maps > debug           │
├───────────────┼──────────────────────────────────────────────────────────────┤
│ More info     │ https://nodesecurity.io/advisories/534                       │
└───────────────┴──────────────────────────────────────────────────────────────┘
```

Noten que, generalmente, los problemas se encuentran en dependencias de *desarrollo* (en este ejemplo `jest`). Ya que estas dependencias no son parte del código que publicarán a producción, lo más probable es que su aplicación no sea vulnerable. Más allá de esto, se considera buena práctica mantener las vulnerabilidades en `0`.

Simplemente agreguen `npm audit` (el comando tiene un un código de error `1` si hay algún error) como parte de su proceso de publicación, para asegurarse de que los proyectos estén siempre al día.


## Secuencias de comandos NPM

### Qué es ese `--` en las secuencias de comandos
Pueden construir una secuencia de comandos base con un conjunto limitado de argumentos de comandos de línea. Por ejemplo, a continuación mostramos un target de una secuencia de comandos que corre `tsc` por el compilador de TypeScript:

```json
{
  "scripts": {
    "build": "tsc -p ."
  }
}
```

Pueden crear un target `build:watch` para correr `tsc -p . -w` o, alternativamente, pedirle a npm que corra `build` con la bandera adicional `-w`, como mostramos a continuación:

```json
{
  "scripts": {
    "build": "tsc -p .",
    "build:watch": "npm run build -- -w"
  }
}
```
Pueden pasar cuantas banderas quieran luego de `--`. Por ejemplo, en el siguiente caso `build:more` tiene el mismo efecto que `something -foo -f -d --bar`

```json
{
  "scripts": {
    "build": "something --foo",
    "build:more": "npm run build -- -f -d --bar"
  }
}
```

## Paquetes públicos vs privados
No necesitan esto cuando *usen* los paquetes públicos de npm. Solo sepan que existe para los clientes empresariales / comerciales.

### Paquetes públicos
* Los paquetes son públicos por default.
* Cualquiera puede publicar un paquete en npm.
* Solo necesitan tener una cuenta (que podrán obtener gratis).

Nadie necesita una cuenta para descargar un paquete público.

Esta posiblidad de compartir paquetes de manera gratis es una de las principales razones del éxito de npm 🌹.

### Paquetes privados

Si quieren un paquete privado para su empresa / equipo / etc deberán anotarse en un plan pago. Los detalles se encuentran aquí: https://www.npmjs.com/pricing

Por supuesto necesitarán una cuenta con los permisos correctos para descargar un paquete privado.

---

## Fuente: `typescript-book/docs/options/intro.md`

# Conveniencia vs solidez

Hay alguans cosas que TypeScript previene que hagan, como usar una variable que *no fue declarada nunca* (por supuesto que pueden usar un *archivo de declaraciones* para sistemas externos).

Habiendo dicho eso, tradicionalmente los lenguajes de programación tienen un límite duro entre lo que es y no es permitido en el sistema de tipos. TypeScript es diferente ya que les da el control de dónde dibujar esa línea. Esto ocurre para permitirles usar el JavaScript que conocen y aman con el nivel de seguridad que **ustedes** quieran. Hay muchas opciones de compilador para controlar este límite, así que miremoslo en más detalle:

## Opciones booleanas

Las `compilerOptions` que son `boolean` pueden ser especificadas como `compilerOptions` en `tsconfig.json`:

```json
{
    "compilerOptions": {
        "someBooleanOption": true
    }
}
```

o en la línea de comandos

```sh
tsc --someBooleanOption
```

> Todas estas son `false` por default.

Hagan click [aquí](https://www.typescriptlang.org/docs/handbook/compiler-options.html) para ver una lista de todas las opcioens del compilador.

---

## Fuente: `typescript-book/docs/options/noImplicitAny.md`

# noImplicitAny

Hay algunas cosas que no pueden ser inferidas o para las que inferirlas podría resultar en errores inesperados. Un buen ejemplo son los argumentos de una función. Si no los anotan, es poco claro qué deberían hacer y qué debería ser inválido. Por ejemplo:

```ts
function log(someArg) {
  sendDataToServer(someArg);
}

// Cuál argumento es válido y cuál no?
log(123);
log('hello world');
```

Por este motivo, si ustedes no anotan los tipos de los argumentos de una función, TypeScript asume `any` y continúa. En la práctica, esto es lo mismo que apagar el sistema de control de tipos para estos casos, que es lo que querría un desarrollador JavaScript. Pero puede agarrar desprevenidas a las personas que quieren una alta seguridad de tipos. Por eso existe la opción `noImplicitAny`, que al ser encendida alertará sobre los casos en los que los tipos no pueden ser inferidos:

```ts
function log(someArg) { // Error : someArg has an implicit `any` type
  sendDataToServer(someArg);
}
```

Claro que igual pueden proceder a anotarlo:

```ts
function log(someArg: number) {
  sendDataToServer(someArg);
}
```

Y si realmente quieren *cero seguridad* pueden marcarlo *explícitamente* como `any`:

```ts
function log(someArg: any) {
  sendDataToServer(someArg);
}
```

---

## Fuente: `typescript-book/docs/options/strictNullChecks.md`

# `strictNullChecks`

Por default `null` y `undefined` son asignables a todos los tipos en TypeScript. Por ejemplo:

```ts
let foo: number = 123;
foo = null; // OK
foo = undefined; // OK
```

Esto se encuentra modelado en base a como muchas personas escriben JavaScript. Sin embargo, como con todo, TypeScript les permite ser *explícito* acerca de lo que *puede y no puede* recibir un `null` o `undefined` como valor.

En modo de control estricto de nulls, `null` y `undefined` son diferentes:

```ts
let foo = undefined;
foo = null; // NOT OK
```

Supongamos que tenemos una interface `Member`:

```ts
interface Member {
  name: string,
  age?: number
}
```

No todo `Member` proveerá su edad, por lo que `age` es una propiedad opcional. Es decir, el valor de `age` puede o no ser `undefined`.

`undefined` es la fuente de todo el mal. Suele desembocar en errores en tiempo de ejecución. Es fácil escribir código que va a tirar un `Error` en tiempo de ejecución:

```ts
getMember()
  .then(member: Member => {
    const stringifyAge = member.age.toString() // Cannot read property 'toString' of undefined
  })
```

Pero en modo de control estricto de nulls, este error será atrapado en tiempo de compilación:

```ts
getMember()
  .then(member: Member => {
    const stringifyAge = member.age.toString() // Object is possibly 'undefined'
  })
```

## Operador de Aserción No-Null

Un nuevo operador sufijo de expresión  `!` puede ser usado para declarar que su operando es un no-null y no-undefined en contextos en el que el control de tipos es incapad de concluir ese hecho. Por ejemplo:

```ts
// compilado con --strictNullChecks
function validateEntity(e?: Entity) {
    // Tira una excepción si e es null o una entidad inválida
}

function processEntity(e?: Entity) {
    validateEntity(e);
    let a = e.name;  // TS ERROR: e may be null.
    let b = e!.name;  // OK. Estamos declarando que e es no-null
}
```

> Noten que es simplemente una declaración, y de la misma forma que las declaraciones de tipo, *ustedes son responsables* de asegurarse que el valor no es null. Una declaración no-null es, esencialmente, lo mismo que decirle al compilador "Yo se que esto no es null así que dejame usarlo como si no fuera null".

### Operador de aserción de asignación definitiva

TypeScript también se quejará si propiedades en clases no son inicializadas. Por ejemplo:

```ts
class C {
  foo: number; // OK ya que es asignado en el constructor
  bar: string = "hello"; // OK ya que tiene una propiedad inicializada
  baz: boolean; // TS ERROR: Property 'baz' has no initializer and is not assigned directly in the constructor.
  constructor() {
    this.foo = 42;
  }
}
```

Pueden usar el operador de aserción de asignación definitiva al nombre de la propiedad para decirle a TypeScript que la estan inicializando en otro lado que no es el constructor. Por ejemplo:

```ts
class C {
  foo!: number;
  // ^
  // Noten el signo de exclamación!
  // Este es el modificador "aserción de asignación definitiva"
  
  constructor() {
    this.initialize();
  }
  initialize() {
    this.foo = 0;
  }
}
```

También pueden usar esta aserción con una simple declaración de variable:

```ts
let a: number[]; // No hay aserción
let b!: number[]; // Aserción

initialize();

a.push(4); // TS ERROR: variable used before assignment
b.push(4); // OK: Gracias a la aserción

function initialize() {
  a = [0, 1, 2, 3];
  b = [0, 1, 2, 3];
}
```

> Como con todas las aserciones, le estan diciendo al compilador que confíe en ustedes. El compilador no se quejará aún si el código no siempre asigna un valor a la propiedad.

---

## Fuente: `typescript-book/docs/project/compilation-context.md`

## Contexto de compilación

El contexto de compilación es, básicamente, un término elaborado para agrupar los archivos que TypeScript va a analizar para determinar qué es válido y qué no. Junto con la información sobre qué archivos leer, el contexto de compilación contiene información acerca de *qué opciones de compilación* se encuentran utilizadas. Una gran manera de definir esta agrupación lógica (también nos gusta usar el término *proyecto*) es mediante la creación del archivo `tsconfig.js`.

---

## Fuente: `typescript-book/docs/project/declarationspaces.md`

## Espacios de declaración

Hay dos tipos de espacios de declaración en TypeScript: el espacio de declaración de *variables* y el espacio de declaración de *tipo*. Estos conceptos son explorados en detalle a continuación.

### Espacio de declaración de Tipo
El espacio de declaración de tipos contiene cosas que pueden ser usadas como anotación de tipos. Por ejemplo, las siguientes son algunas declaraciones de tipos:

```ts
class Foo {};
interface Bar {};
type Bas = {};
```
Esto significa que peudes usar `Foo`, `Bar`, `Bas`, etc como anotaciones de tipo: 

```ts
var foo: Foo;
var bar: Bar;
var bas: Bas;
```

Notemos que aunque tienes la `interface Bar`, *no la puedes usar como una variable* porque no contribuye al *espacio de declaración de variables*. Mostramos esto a continuación: 

```ts
interface Bar {};
var bar = Bar; // ERROR: "cannot find name 'Bar'"
```

La razón por la que dice `cannot find name` ("no es posible enconrar el nombre") es porque el nombre `Bar` *no está definido* en el espacio de declaración de *variables*. Esto nos trae al siguiente tema: "Espacio de declaración de variables"

### Espacio de declaración de variables
El espacio de declaración de variables contiene cosas que puedes usar como variables. Vimos que tener `class Foo` contribuye un tipo `Foo` al espacio de declaración de *tipos*. Adivina qué? También contribuye una *variable* `Foo` al espacio de declaración de *variables*, como mostramos a continuación: 

```ts
class Foo {};
var someVar = Foo;
var someOtherVar = 123;
```
Esto es bárbaro, ya que a veces quieres pasar clases como si fuesen variables. Recuerda que:

* No pudimos usar algo como una `interface` que se encuentra *únicamente* en el espacio de declaración de *tipos* como una variable.

Similarmente, algo que declares con `var`, se encuentra *únicamente* en el espacio de declaración de *variables* y no puede ser usado como anotación de tipo:

```ts
var foo = 123;
var bar: foo; // ERROR: "cannot find name 'foo'"
```
a razón por la que dice `cannot find name` ("no es posible enconrar el nombre") es porque el nombre `foo` *no está definido* en el espacio de declaración de *tipos*.

---

## Fuente: `typescript-book/docs/project/dynamic-import-expressions.md`

## Importación dinámica de expresiones

La **Importación dinámica de expresiones** es una nueva característica y parte de **ECMAScript** que permite a los usuarios solicitar un módulo de forma asincrónica en un punto arbitrario de tu programa.
El comité de JavaScirpt **TC39** tiene su propia propuesta, la cual está en etapa 3, y se llama [propuesta import() para JavaScript](https://github.com/tc39/proposal-dynamic-import).

Alternativamente, el agrupador de **webpack** tiene una característica llamada [**Separación de Código**](https://webpack.js.org/guides/code-splitting/) la cual permite dividir tu código en pedazos que pueden ser descargados asincrónicamente en otro momento. Por ejemplo, esto permite servir un paquete mínimo primero y luego agregar características adicionales asincrónicamente.

Es natural pensar (si usamos webpack en nuestro proceso de desarrollo) que [las expresiones dinámicas de importación de TypeScript 2.4](https://github.com/Microsoft/TypeScript/wiki/What%27s-new-in-TypeScript#dynamic-import-expressions) **producirán automáticamente** pedazos del paquete y que dividirán tu JS final automáticamente. PERO, esto no es tan fácil como parece, ya que depende de la **configuración de tsconfig.json** con la que estemos trabajando.

La cuestión yace en que el proceso de división de código de webpack soporta dos técnicas similares para lograr este objetivo: usar **import()** (técnica preferida y propuesta de ECMAScript) y **require.ensure()** (técnica histórica, y específica a webpack). Esto significa que el output esperado de TypeScript suele **dejar la declaración import() tal cual** en lugar de transpilarla a algo diferente.

Vemaos un eejmplo para entender como configurar webpack + TypeScript 2.4.

En el siguiente código, queremos **lazy load la libreria _moment_** a la vez que dividimos el código. Es decir, queremos contener la libreria moment en una pedazo de JS (archivo JavaScript) separado, que solo será cargado cuando sea necesario. 

```ts
import(/* webpackChunkName: "momentjs" */ "moment")
  .then((moment) => {
      // lazyModule tiene todos los tipos correctos, la autocompletar funciona,
      // el chequeo de tipos funciona y las referencias de código también \o/
      const time = moment().format();
      console.log("TypeScript >= 2.4.0 Dynamic Import Expression:");
      console.log(time);
  })
  .catch((err) => {
      console.log("Failed to load moment", err);
  });
```

Aquí esta el archivo tsconfig.json:

```json
{
    "compilerOptions": {
        "target": "es5",                          
        "module": "esnext",                     
        "lib": [
            "dom",
            "es5",
            "scripthost",
            "es2015.promise"
        ],                                        
        "jsx": "react",                           
        "declaration": false,                     
        "sourceMap": true,                        
        "outDir": "./dist/js",                    
        "strict": true,                           
        "moduleResolution": "node",               
        "typeRoots": [
            "./node_modules/@types"
        ],                                        
        "types": [
            "node",
            "react",
            "react-dom"
        ]                                       
    }
}
```


**Notas Importantes**:

- Usar TypeScript **"module": "esnext"** produce la imitación de la declaración import() que será incluida en Webpack para realizar la división de código.
- Para más información, leer el siguiente artículo: [Dynamic Import Expressions and webpack 2 Code Splitting integration with TypeScript 2.4](https://blog.josequinto.com/2017/06/29/dynamic-import-expressions-and-webpack-code-splitting-integration-with-typescript-2-4/).


Puedes ver el ejemplo completo [aquí][dynamicimportcode].

[dynamicimportcode]:https://cdn.rawgit.com/basarat/typescript-book/705e4496/code/dynamic-import-expressions/dynamicImportExpression.js

---

## Fuente: `typescript-book/docs/project/external-modules.md`

## Módulos externos
Hay mucho poder y usabilidad en el patrón de módulos externos de TypeScript. Aquí discutiremos su poder y algunos patrones necesarios para reflejar su uso en el mundo real.

### Clarificación: commonjs, amd, es modules, y otros

Primero tenemos que clarificar la (horrible) inconsitencia de los sitemas de módulos que existen. Les daremos nuestra recomendación *actual* para disminuir el ruido, es decir, no mostraremos las *otras* maneras en las que las cosas pueden funcionar. 

Desde el *mismo TypeScript* puedes generar diferente *JavaScript*, dependiendo de la opción `module`. Aquí estan las cosas que puedes ignorar (No nos interesa adentrarnos en technologia muerta):

* AMD: No lo uses. Era solo para navegadores.
* SystemJS: Fue un buen experimento. Fue superado por ES modules.
* ES Modules: Aún no están listos.

Estas son solamente las opciones para *generar JavaScript*. En su lugar, usen `module:commonj`

Como *escribimos* módulos en TypeScript también es compliado. De nuevo, aquí mostramos como *no* hacerlo *hoy*:

* `import foo = require('foo')`. Es decir, `import/require`. En su lugar, usen ES modules.

Buenísimo, una vez que hemos corrido ese tema del medio, consideremos la sintaxis de ES module.


> Resumen: Usen `module:commonjs` y usen la sintaxis de ES modules para importar / exportar / crear módulos.

### Sintaxis ES Module

* Exportar una variable (o un tipo) es tan simple como prefijarla con la palabra clave `export` e.g.

```js
// archivo `foo.ts`
export let someVar = 123;
export type SomeType = {
  foo: string;
};
```

* Exportar una variable o tipo en una declaración `export` especialmente dedicada e.g.

```js
// archivo `foo.ts`
let someVar = 123;
type SomeType = {
  foo: string;
};
export {
  someVar,
  SomeType
};
```
* Exportar una vairable o tipo en una declaración `export` especialmente dedicada y *renombrarla* e.g.

```js
// archivo `foo.ts`
let someVar = 123;
export { someVar as aDifferentName };
```

* Importar una variable usando `import` e.g.

```js
// archivo `bar.ts`
import { someVar, SomeType } from './foo';
```

* Importar una variable usando `import` *renombrándola* e.g.

```js
// archivo `bar.ts`
import { someVar as aDifferentName } from './foo';
```

* Importar todo lo que se encuentre en un módulo a un nombre con `import * as` e.g.
```js
// archivo `bar.ts`
import * as foo from './foo';
// Puedes usar `foo.someVar` y `foo.someType` y cualquier otra cosa que foo exporte.
```

* Importar un archivo *únicamente* por sus efectos secundarios con una única declaración de importación:

```js
import 'core-js'; // una librería de polyfill popular
```

* Re-exportar todos los ítems desde otro módulo

```js
export * from './foo';
```

* Re-exportar solo algunos ítemos desde otro módulo

```js
export { someVar } from './foo';
```

* Re-exportar solo algunos ítems desde otro módulo *renombrándolos*

```js
export { someVar as aDifferentName } from './foo';
```

### exportaciones/importaciones default
Como aprenderán luego, no somos muy fanáticos de las exportaciones default. Sin embargo, la sintaxis para exportar y usar exportaciones default es la siguiente.

* exportar usando `export default`
  * antes de una variable (no se necesita `let / const / var` )
  * antes de una función
  * antes de una clase

```js
// una variable
export default someVar = 123;
// O una función
export default function someFunction() { }
// O una clase
export default class SomeClass { }
```

* Importar usando la sintaxis `import someName from "someModule"` (puedes darle cualquier nombre a lo que importas) e.g.

```js
import someLocalNameForThisFile from "../foo";
```

### Rutas de módulos

> Vamos a asumir que `moduleResolution: commonjs`. Esta es la opción que deberías tener en tu configuración de TypeScript.
Esta configuración está implícita automáticamente con `module: commonjs`.

Hay tipos distintos de módulos. La distinción se encuentra en la parte de la ruta de la declaración de importación (ejemplo, `import foo from 'ESTA ES LA PARTE DE LA RUTA'`).

* Módulos con rutas relativas (en los que la ruta empieza con `.`, por ejemplo, `./algunArchivo` o `../../algunaCarpeta/algunArchivo`, etc.)
* Otras formas de búsqueda dinámicas (por ejemplo, `'core-js'`, `'typestyle'`, `'react'`, `'react/core'`, etc)

La principal diferencia se encuentra en *cómo el módulo se resuelve en el sistema de archivos*.

> Usaré el término conceptual *lugar* que explicaré luego de mentionar el patrón de búsqueda.

#### Módulos con rutas relativas
Fácil, solo sigan la ruta relativa :), por ejemplo:

* si el archivo `bar.ts` tiene `import * as foo from './foo';` entonces el lugar `foo` debe existir en la misma carpeta.
* si el archivo `bar.ts` tiene `import * as foo from '../foo';` entonces el lugar `foo` debe existir en una carpeta superior.
* si el archivo `bar.ts` tiene `import * as foo from '../someFolder/foo';` entonces una carpeta más arriba, debe haber una carpeta `someFolder` con un lugar `foo`.

O cualquier otra ruta relativa que se les ocurra :)

#### Búsqueda dinámica

Cuando la ruta de importaciones *no* es relativa, la búsqueda es manejada por [*resolucion de estilo node*](https://nodejs.org/api/modules.html#modules_all_together). Aquí solo daremos un ejemplo sencillo:

* Tienes `import * as foo from 'foo'`, los siguientes son los lugares que son chequeados *en orden*
  * `./node_modules/foo`
  * `../node_modules/foo`
  * `../../node_modules/foo`
  * Hasta la raíz del sistema de archivos

* Tienes `import * as foo from 'something/foo'`, los siguientes son los lugares que son chequeados *en orden*
  * `./node_modules/something/foo`
  * `../node_modules/something/foo`
  * `../../node_modules/something/foo`
  * Hasta la raíz del sistema de archivos


### Qué son *lugares*?
Cuando decimos *lugares que son chequeados* nos referimos a las siguientes cosas que son chequeadas en ese lugar. Por ejemplo, para un lugar `foo`:

* si el lugar es un archivo, por ejemplo `foo.ts`, yay!
* o si el lugar es una carpeat y hay un archivo `foo/index.ts`, yay!
* o si el lugar es una carpeta y hay un `foo/package.json` y un archivo especificado en la clave `types` en el package.json que existe, entonces yay!
* o si el lugar es una carpeta y hay un `package.json` y un archivo expecificado en el la clave `main` en el package.json que existe, yay!

Y por archivo nos referimos a `.ts` / `.d.ts` y `.js`.

Eso es todo. Ahora son expertos en búsqueda de módulos (lo que no es poca cosa!.)

### Anulación de la búsqueda dinámica *solo para tipos*
Puedes declarar un módulo para tu proyecto *globalmente* usando `declare module 'unaRuta'` Y todos las importaciones resolveran *mágicamente* a esa ruta

e.g.
```ts
// globals.d.ts
declare module 'foo' {
  // una declaración de variable
  export var bar: number; /*ejemplo*/
}
```

and then:
```ts
// CualquierOtroArchivoTSEnTuProyecto.ts
import * as foo from 'foo';
// TypeScript asume (sin realizar ninguna búsqueda) que
// foo es {bar:number}

```

### `import/require` para importar tipos únicamente
La siguiente declaración:

```ts
import foo = require('foo');
```

en realidad hace *dos* cosas:

*Importa la información sobre tipos del módulo foo
* Especifica una dependiencia de tiempo de ejecución del módulo foo

Pueden elegir para que solo *la información de tipo* sea cargada y no ocurra ninguna especificación de dependencia de tiempo de ejecución. Antes de continuar, tal vez quieran revisar la sección sobre [*espacios de declaración*](../project/declarationspaces.md) de este libro.

Si no usan el nombre importado en la declaración de la variable, entonces la importación es completamente eliminada del JavaScript generado. Esto se explica mejor con ejemplos. Una vez que los entiendan, presentaremos ciertos casos de uso..

#### Ejemplo 1
```ts
import foo = require('foo');
```
generará el JavaScript:

```js

```
Es correcto. Un archivo *vacío* ya que foo nunca es usada.

#### Ejemplo 2
```ts
import foo = require('foo');
var bar: foo;
```
generará el JavaScript:
```js
var bar;
```
Esto es porque `foo` (o cualquiera de sus propiedades, por ejemplo, `foo.bas`) nunca son usadas como una variable.

#### Ejemplo 3
```ts
import foo = require('foo');
var bar = foo;
```
generará el JavaScript (asumiendo commonjs):
```js
var foo = require('foo');
var bar = foo;
```
Esto es porque `foo` es usada como una variable.


### Caso de uso: lazy loading
La inferencia de tipo debe ser hecha *al comienzo*. Esto significa que si quieren usar un tipo de un archivo `foo` en un arhivo `bar`, van a tener que:

```ts
import foo = require('foo');
var bar: foo.SomeType;
```
Sin embargo, tal vez sólamente quieran cargar el archivo `foo` durante tiempo de ejecución bajo ciertas condiciones. Para estos casos, deberán usar el nombre `import`ado solamente como *anotación de tipo* y **no** como una *variable*. Esto elimina cualquier dependencia de tu codigo en tiempo de ejecución que pueda ser insertada por TypeScript. Luego, deberan *importar manualmente* el módulo usando código que sea específico a tu módulo de cargas. 

Por ejemplo, considera el siguiente código basado en `commonjs` donde sólamente cargamos un módulo `'foo'` en una determinada llamada a una función: 

```ts
import foo = require('foo');

export function loadFoo() {
    // Esto carga `foo` de forma lazy y usa el módulo original *únicamente* como anotación de tipo
    var _foo: typeof foo = require('foo');
    // Ahora usemos `_foo` como una variable en lugar de `foo`.
}
```

Un ejemplo similar en `amd` (usando requirejs) sería:
```ts
import foo = require('foo');

export function loadFoo() {
    // Esto carga `foo` de forma lazy y usa el módulo original *únicamente* como anotación de tipo
    require(['foo'], (_foo: typeof foo) => {
        // Ahora usemos `_foo` como una variable en lugar de `foo`.
    });
}
```

Este patrón se usa comúnmente:
* en páginas web donde debes cargar determinadas partes de tu JavaScript en determinadas rutas, 
* en aplicacioens node donde solo cargas m[odulos si son necesarios, para acelerar la iniciación de la aplicación.

### Caso de uso: Rompiendo dependencias circulares

De forma similar al caso de lazy loading, ciertos cargadores de moódulos (commonjs/node y amd/requirejs) no funcionan bien con dependencias ciruclares. En estos casos, es útil tener código con *lazy loading* en una dirección y cargar los módulos desde el comienzo en la otra. 

### Caso de uso: Asegurar la Importación

A veces quieres cargar un archivo únicamente por los efectos secundarios (por ejemplo, el módulo se registra a si mismo con una librería, como [CodeMirror addons](https://codemirror.net/doc/manual.html#addons) etc.). Sin embargo, si solamente haces `import/require`, el JavaScript traspilado no contendrá una dependencia en el módulo y tu cargador de módulos tal vez ignorará la importación. En estos casos, puedes usar una variable `ensureImport` para asegurarte que el javascript compilado toma una dependencia del módulo. Por ejemplo:

```ts
import foo = require('./foo');
import bar = require('./bar');
import bas = require('./bas');
const ensureImport: any =
    foo
    || bar
    || bas;
```

---

## Fuente: `typescript-book/docs/project/files.md`

## Cuáles archivos?

Usamos `include` y `exclude` para especificar archivos / carpetas / globs. Por ejemplo: 


```json
{
    "include":[
        "./folder"
    ],
    "exclude":[
        "./folder/**/*.spec.ts",
        "./folder/someSubFolder"
    ]
}
```

### Globs

* Para globs: `/**/*` (por ejemplo, `unacarpeta/**/*`) significa todas las carpetas y archivos (las extensiones `.ts`/`.tsx` serán incluidas automáticamente, y si `allowJs:true`, también lo serán las extensiones `.js`/`.jsx`).

### Opción `files`
Puedes usar `files` para ser explícito:

```json
{
    "files":[
        "./some/file.ts"
    ]
}
```

Pero no se recomienda ya que vas a tener que mantenerlo al día. En su lugar, usa `include` para incluir la carpeta contenedora.

---

## Fuente: `typescript-book/docs/project/globals.md`

# globals.d.ts

Discutimos módulos *globales* y en *archivos* cuadno cubrimos [proyectos](./modules.md) y recomendamos usando los módulos basados en archivo para evitar contaminar el namespace global.

Sin embargo, si tienen desarrolladores TypeScript que recién estan comenzando, pueden darles un archivo `globals.d.ts` donde poner interfaces y tipos en el namespeace global, y así facilitarles el acceso a algunos *tipos* al tenerlos *mágicamente* disponibles en *toda* la base de código de TypeScript.

> Para cualquier código que vaya a generar *JavaScript*, es altamente recomendable usar los *módulos en archivos*.

* `globals.d.ts` es útil para agregar extensiones a `lib.d.ts` en caso de que lo necesiten
* También sirve para `declare module "some-library-you-dont-care-to-get-defs-for";` rápidamente cuando estén migrando JS a TS.

---

## Fuente: `typescript-book/docs/project/module-resolution.md`

# TypeScript Module Resolution

TypeScript's module resolution tries to model and support the real world modules systems / loaders there (commonjs/nodejs, amd/requirejs, ES6/systemjs etc.). The most simplest lookup is relative file path lookup. After that things become a bit complex *because of the nature of magical module loading done by various module loaders*.

## File Extensions

You import modules like `foo` or `./foo`. For any file path lookup TypeScript automatically checks for a `.ts` or `.d.ts` or `.tsx` or `.js` (optionally) or `.jsx` (optionally) file in the right order depending upon context. You should **not** provide a file extension with the module name (no `foo.ts`, just `foo`).

## Relative File Module

An import with a relative path e.g.:

```ts
import foo = require('./foo');
```

Tells the TypeScript compiler to look for a TypeScript file at the relative location e.g. `./foo.ts` with respect to the current file. There is no further magic to this kind of import. Of course it can be a longer path e.g. `./foo/bar/bas` or `../../../foo/bar/bas` just like any other *relative paths* you are used to on disk.

## Named Module

The following statement:

```ts
import foo = require('foo');
```

Tells the TypeScript compiler to look for an external module in the following order:

* A named [module declaration](#module-declaration) from a file already in the compilation context.
* If still not resolved and you are compiling with `--module commonjs`  or have set `--moduleResolution node` then its looked up using the [*node modules*](#node-modules) resolution algorithm.
* If still not resolved and you provided `baseUrl` (and optionally `paths`) then the [*path substitutions*](#path-substitutions) resolution algorithm kicks in.

Note that `"foo"` can be a longer path string e.g. `"foo/bar/bas"`. The key here is that *it does not start with `./` or `../`*.

## Module Declaration

A module declaration looks like:

```ts
declare module "foo" {

    /// Some variable declarations

    export var bar:number; /*sample*/
}
```

This makes the module `"foo"`, *importable*.

## Node Modules
The node module resolution is actually pretty much the same one used by Node.js / NPM ([official nodejs docs](https://nodejs.org/api/modules.html#modules_all_together)). Here is a simple mental model I have:

* module `foo/bar` will resolve to some file : `node_modules/foo` (the module) + `foo/bar`

## Path Substitutions

TODO.

[//Comment1]:https://github.com/Microsoft/TypeScript/issues/2338
[//Comment2]:https://github.com/Microsoft/TypeScript/issues/5039
[//Comment3ExampleRedirectOfPackageJson]:https://github.com/Microsoft/TypeScript/issues/8528#issuecomment-219172026
[//Coment4ModuleResolutionInHandbook]:https://github.com/Microsoft/TypeScript-Handbook/blob/release-2.0/pages/Module%20Resolution.md#base-url

---

## Fuente: `typescript-book/docs/project/modules.md`

## Módulos

### Módulo Global

Por default, cuando comenzas a tipear código en un archivo de TypeScript, tu código se encuentra en un espacio de nombre (*namespace*) global. A modo de demostración, consideremos el archivo `foo.ts`:

```ts
var foo = 123;
```

Si ahora creases un *nuevo* archivo `bar.ts` en el mismo proyecto, el sistema de tipos de TypeScript te *permitiría* usar la variable `foo` como si estuviese disponible globalmente:

```ts
var bar = foo; // permitido
```
No es necesario decir que tener un namespace global es peligroso, ya que abre la posibilidad de conflictos de nombramiento en tu código. Recomendamos utilizar módulos en su lugar, los cuales presentaremos a continuación.

### Módulo como archivo
También llamados *módulos externos*. Si tienes un `import` o un `export` en el nivel raíz de un archivo TypeScript, entonces este crea un ámbito *local* dentro de ese archivo. Por lo tanto, si fueramos a cambiar el archivo `foo.ts` de la siguiente manera (prestá atención a la utilización de `export`):

```ts
export var foo = 123;
```

ya no tendriamos a `foo` en el namespace global. Esto puede ser demostrado creado un nuevo archivo `bar.ts` de la siguiente manera:

```ts
var bar = foo; // ERROR: "cannot find name 'foo'"
```

Si quieres usar cosas de `foo.ts` en `bar.ts` *neceistas importarlas explícitamente*. A continuación mostramos un `bar.ts` actualizado:

```ts
import { foo } from "./foo";
var bar = foo; // Permitido
```
Usar `import` en `bar.ts` no solo te permite traer cosas de otros archivos, sino que también marca el archivo `bar.ts` como un *módulo* y, por lo tanto, cualquier declaración hecha en `bar.ts` tampoco contamina el namespace global.

El tipo de código JavaScript que es generado a partir de un archivo TypeScript que utiliza módulos externos es "decidido" por la flag de compilación `module`.

---

## Fuente: `typescript-book/docs/project/namespaces.md`

## Namespaces
Namespaces (espacios de nombre) nos proveen con una sintaxis conveniente respecto de un patrón comúnmente usado en JavaScript:

```ts
(function(something) {

    something.foo = 123;

})(something || (something = {}))
```

Básicamente `something || (something = {})` permite a la función anónima `function(something) {}` *agregar cosas a un objeto existente* (la porción `something ||`) o *crear un nuevo objeto y luego agregar cosas a ese objeto* (la porción `|| (something = {})`). Esto significa que peudes tener dos bloques 
Basically `something || (something = {})` allows an anonymous function `function(something) {}` to *add stuff to an existing object* (the `something ||` portion) or *start a new object then add stuff to that object* (the `|| (something = {})` portion). Esto significa que puede tener dos bloques de este tipo divididos por algún límite de ejecución:

```ts
(function(something) {

    something.foo = 123;

})(something || (something = {}))

console.log(something); // {foo:123}

(function(something) {

    something.bar = 456;

})(something || (something = {}))

console.log(something); // {foo:123, bar:456}

```

Esto se usa comúnmente en el mundo JavaScript para asegurarnos de que nada se derrame hacia el namespace global. Con módulos basados en archivos, no hace falta preocuparse por esto, pero el patrón sigue siendo útil para *agrupaciones locales* de una serie de funciones. Por esto, TypeScrip provee la palabra clave `namespace` para agruparlos. Por ejemplo:

```ts
namespace Utility {
    export function log(msg) {
        console.log(msg);
    }
    export function error(msg) {
        console.error(msg);
    }
}

// usage
Utility.log('Call me');
Utility.error('maybe!');
```

La palabra clave `namespace` genera el mismo JavaScript que vimos previamente:

```ts
(function (Utility) {

// Add stuff to Utility

})(Utility || (Utility = {}));
```
Algo importante de remarcar es que los namespaces pueden estar anidades por lo que peudes hacer cosas como `namespace Utility.Messaging` para anidar un namespace `Messaging` bajo `Utility`.

Para la mayoría de los proyectos recomendamos usar módulos externos y usar `namespace` para demos rápidas y para portar código Javascript viejo.

---

## Fuente: `typescript-book/docs/project/project.md`

# Proyecto

Para crear un proyecto existoso usando TypeScript, debes entender las variadas formas de lenguage disponibles para organización de proyectos. En esta sección, cubriremos el "contexto de compilación", los espacios de declaración y los módulos.

---

## Fuente: `typescript-book/docs/project/tsconfig.md`

### Conceptos básicos
Es extremadamente fácil crear `tsconfig.json`, ya que el archivo base que necesitas es:
```json
{}
```
Es decir, un archivo JSON vacío, ubicado en la *raíz* de tu proyecto. De esta forma TypeScript incluirá *todos* los archivos `.ts` en esa carpeta (y sus subcarpetas) como parte del contexto de compilación. También elegirá algunas opciones por defecto para el compilador.

### compilerOptions

Puedes customizar las opciones del compilador usando `compilerOptions`:

```json
{
  "compilerOptions": {

    /* Opciones Básicas */                       
    "target": "es5",                       /* Especificar la versión target de ECMAScript: 'ES3' (default), 'ES5', 'ES2015', 'ES2016', 'ES2017', o 'ESNEXT'. */
    "module": "commonjs",                  /* Especificar la generación de módulos de código: 'commonjs', 'amd', 'system', 'umd' or 'es2015'. */
    "lib": [],                             /* Especificar los archivos de librería que serán incluidos en la compilación. */
    "allowJs": true,                       /* Permitir que los archivos JavaSCript sean compilados. */
    "checkJs": true,                       /* Reportar errores en los archivos .js */
    "jsx": "preserve",                     /* Especificar la generación de código JSX: 'preserve', 'react-native', o 'react'. */
    "declaration": true,                   /* Genera el archivo '.d.ts' correspondiente. */
    "sourceMap": true,                     /* Genera el archivo '.map' correspondiente. */
    "outFile": "./",                       /* Concatenar y emitir el output en un único archivo. */
    "outDir": "./",                        /* Redirigir la estructura del output a un directorio. */
    "rootDir": "./",                       /* Especificar el directorio raíz de los archivos de input. Controlar el directorio de output con --outDir. */
    "removeComments": true,                /* No emitir los comentarios al output. */
    "noEmit": true,                        /* No emitir outputs. */
    "importHelpers": true,                 /* Importar ayudantes (helpers) de emisión de 'tslib'. */
    "downlevelIteration": true,            /* Proveer soporte completo para iterables en 'for-of', propagación y desestructuración al tener 'ES5' o 'ES6' como targets. */
    "isolatedModules": true,               /* Transpilar cada archivo como un módulo separado (similar a 'ts.transpileModule'). */
                                              
    /* Opciones de chequeo de tipado estrictas */        
    "strict": true,                        /* Habilitar todas las opciones de chequeado de tipado estrictas. */
    "noImplicitAny": true,                 /* Tirar errores en expresiones o declaraciones que tengan un tipo 'any'implícito. */
    "strictNullChecks": true,              /* Habilitar chequeos de null estrictos. */
    "noImplicitThis": true,                /* Tirar errores en expresiones 'this' que tengan un tipo 'any' implícito. */
    "alwaysStrict": true,                  /* Analizar en modo estricto y emitir "use strict" para cada archivo fuente. */
                                              
    /* Controles adicionales */                   
    "noUnusedLocals": true,                /* Tirar errores en locales no usadas. */
    "noUnusedParameters": true,            /* Tirar errores en parámetros no usados. */
    "noImplicitReturns": true,             /* Tirar errores cuando no todos los "caminos" de una función devuelven un valor. */
    "noFallthroughCasesInSwitch": true,    /* Tirar errores para casos de fallthrough en declaraciones switch. */
                                              
    /* Opciones de resolución de modulos */           
    "moduleResolution": "node",            /* Especificar la estrategia de resolución de módulos: 'node' (Node.js) o 'classic' (TypeScript pre-1.6). */
    "baseUrl": "./",                       /* Directorio base para resolver nombres de módulos no absolutos. */
    "paths": {},                           /* Una serie de entradas que re-map importa a ubicaciones de busqueda, relativas al 'baseUrl'. */
    "rootDirs": [],                        /* Lista de carpetas raíz cuyo contenido combinado representa la estructura del proyecto en tiempo de ejecución. */
    "typeRoots": [],                       /* Lista de carpetas desde las cuales incluir definiciones de tipo. */
    "types": [],                           /* Archivos de declaraciones de tipos a ser incluídos en la compilación. */
    "allowSyntheticDefaultImports": true,  /* Permitir importar defaults desde módulos sin export default. Esto no afecta la emisión de código, sino el control de tipos. */
                                              
    /* Opciones del mapa fuente */                  
    "sourceRoot": "./",                    /* Especificar la ubicación donde el debugger debe ubicar los archivos TypeScript, en vez de las ubicaciones fuente. */
    "mapRoot": "./",                       /* Especificar la ubicación donde el debugger debe ubicar los archivos mapa en vez de las ubicaciones generadas. */
    "inlineSourceMap": true,               /* Emitir un único arcihvo con mapas fuente en vez de tener un archivo separado. */
    "inlineSources": true,                 /* Emitir la fuente junto con los mapas fuente dentr ode un mismo archivo. Requiere '--inlineSourceMap' o '--sourceMap'. */
                                              
    /* Opciones experimentales */                
    "experimentalDecorators": true,        /* Permite el soporte experimental de decoradores ES7. */
    "emitDecoratorMetadata": true          /* Permite el soporte experimental para emitir metadata sobre tipos para decoradores. */
  }
}
```

Estas (y otras) opciones de compilación serán discutidas más adelante.

### Compilador TypeScript
Las buenas IDEs incluyen soporte para compilación instantánea de `ts` a `js`. Sin embargo, si quieres correr el compilador de TypeScript manualmente desde la línea de comandos cuando usas `tsconfig.json`, lo puedes hacer de dos maneras:
* Corriendo `tsc`, que buscará a `tsconfig.json` en el actual directorio (así como sus directorios padres) hasta encontrarlo.
* Corriendo `tsc -p ./path-to-project-directory`. El path puede ser absoluto o relativo al directorio actual.

También puedes inciar el compilador TypeScript en modo *observacion* usando `tsc -w`, y controlará si hay cambios en los archivos TypeScript de tu proyecto.

---

## Fuente: `typescript-book/docs/promise.md`

## Promesa

La clase `Promise` es algo que existe en muchos motoros modernos de JavaSCript y que puede ser fácilmente  *[polyfilled]*[polyfill]. La razón principal por la que existen las promesas es permitir el manejo sincrónico de errores en código asincrónico o en devoluciones de llamada. 

### Devoluciones de llamada

Para entender y realmente apreciar el poder de las promesas, vamos a presentar un ejemplo simple que muestra cuán dificil es crear código asincrónico confiable usando callbacks únicamente. Consideremos el siguiente caso: cargar JSON de un archivo de forma asincrónica.  Una versión sincrónica puede ser bastante simple:

```ts
import fs = require('fs');

function loadJSONSync(filename: string) {
    return JSON.parse(fs.readFileSync(filename));
}

// buen archivo json
console.log(loadJSONSync('good.json'));

// archivo no-existente, por lo que fs. readFileSync falla
try {
    console.log(loadJSONSync('absent.json'));
}
catch (err) {
    console.log('absent.json error', err.message);
}

// archivo json inválido. El archivo existe pero contiene json que es inválido por lo que JSON.parse falla
try {
    console.log(loadJSONSync('invalid.json'));
}
catch (err) {
    console.log('invalid.json error', err.message);
}
```

Estos son tres casos de la función `loadJSONSync`: una devolución válida, un error en el sistema de archivo, o un error en JSON.parse. Hemos manejado esos errores con un esquema try/catchsimple, de la misma forma que otros lenguages manejan código sincrónico. Ahora, creemos una buena versión asincrónica de la misma función. Un intento inicial razonable, con una lógica trivial para chequear errores podría ser así: 

```ts
import fs = require('fs');

// Un intento inicial... pero no es correcto. Explicaremos por qué a continuación
function loadJSON(filename: string, cb: (error: Error, data: any) => void) {
    fs.readFile(filename, function (err, data) {
        if (err) cb(err);
        else cb(null, JSON.parse(data));
    });
}
```

Simple. Acepta una devolución de llamada, pasa cualquier error del sistema de archivos a la devolución de llamada. Si no hay errores en el sistema de archivos, devuelve el resultado de `JSON.parse`. Pero hay un par de puntos a tener en cuenta al trabajar con funciones asincrónicas basadas en devoluciones de llamada:

1. Nunca llames a la devolución de llamada dos veces.
1. Nunca tires un error.

Esta función simple que hemos escrito no cumple la segunda condición. De hecho, `JSON.parse` tira un error si recibe JSON inválido, y la devolución de llamada nunca es llamada y la aplicación deja de correr (*crashes*). Demostramos esto a continuación:

```ts
import fs = require('fs');

// Un intento inicial... pero no es correcto.
function loadJSON(filename: string, cb: (error: Error, data: any) => void) {
    fs.readFile(filename, function (err, data) {
        if (err) cb(err);
        else cb(null, JSON.parse(data));
    });
}

// cargá JSON inválido
loadJSON('invalid.json', function (err, data) {
    // este código nunca corre
    if (err) console.log('bad.json error', err.message);
    else console.log(data);
});
```

Un intento inocente de arreglar esto sería envolver la función `JSON.parse` en un bloque try/catch, como mostramos a continuación:

```ts
import fs = require('fs');

// Un intento mejor... pero sigue sin ser correcto
function loadJSON(filename: string, cb: (error: Error) => void) {
    fs.readFile(filename, function (err, data) {
        if (err) {
            cb(err);
        }
        else {
            try {
                cb(null, JSON.parse(data));
            }
            catch (err) {
                cb(err);
            }
        }
    });
}

// carga json inválido
loadJSON('invalid.json', function (err, data) {
    if (err) console.log('bad.json error', err.message);
    else console.log(data);
});
```

Sin embargo, hay una bug sutil en este código. Si la devolución de llamada (`cb`), y no `JSON.parse`, tira un error, como la hemos envuelto en un bloque `try`/`catch`, el `catch` ejecuta y volvemos a llamar a la devolución de llamada. Es decir, la devolución de llamada es llamada dos veces! Miremos el ejemplo que sigue:

```ts
import fs = require('fs');

function loadJSON(filename: string, cb: (error: Error) => void) {
    fs.readFile(filename, function (err, data) {
        if (err) {
            cb(err);
        }
        else {
            try {
                cb(null, JSON.parse(data));
            }
            catch (err) {
                cb(err);
            }
        }
    });
}

// un archivo válido pero una devolución de llamada incorrecta... es llamada de nuevo!
loadJSON('good.json', function (err, data) {
    console.log('devolución de llamada, llamada (sic)');

    if (err) console.log('Error:', err.message);
    else {
        // simulemos un error tratando de acceder a una propiedad de una variable undefined
        var foo;
        // El siguente código tira `Error: Cannot read property 'bar' of undefined`
        console.log(foo.bar);
    }
});
```

```bash
$ node asyncbadcatchdemo.js
devolución de llamada, llamada (sic)
devolución de llamada, llamada (sic)
Error: Cannot read property 'bar' of undefined
```

Est ose debe a que nuestra función `loadJSON` envolvió erróneamente a la devolución de llamada en un bloque `try`. Hay una simple enseñanza para recordar aquí:

> Enseñanza: Envolvé todo tu código sincrónico en un try catch, excepto cuando llamas a la devolución de llamada

Si seguimos esta regla, tendremos una versión completamente funcional de nuestra `loadJSON` asincrónica:


```ts
import fs = require('fs');

function loadJSON(filename: string, cb: (error: Error) => void) {
    fs.readFile(filename, function (err, data) {
        if (err) return cb(err);
        // Contené todo tu código sincrónico en un try catch
        try {
            var parsed = JSON.parse(data);
        }
        catch (err) {
            return cb(err);
        }
        // excepto cuando devolvés la devolución de llamada
        return cb(null, parsed);
    });
}
```
Con honestidad, esot no es difícil una vez que lo has hecho un par de veces, pero sigue siendo mucho código repetitivo simplemente para manejar errores de la forma correcta. Por lo tanto, procedamos a considerar una mejor manera de hacerle frente al código asincrónico en JavaScript mediante las promesas.

## Crear una Promesa

Una promesa puede estar pendiente, cumplida, o rechazada (`pending`, `fulfilled` o `rejected`).

![promise states and fates](https://raw.githubusercontent.com/basarat/typescript-book/master/images/promise%20states%20and%20fates.png)

Concentremonos en cómo crear una promesa. Se trata simplemente de llamar a `new` antes de `Promise` (el constructor de promesas). El constructor recibe las funciones  `resolve` y `reject` que le permiten resolver el estado de la Promesa:

```ts
const promise = new Promise((resolve, reject) => {
    // las funciones resolve y reject controlan el destino de la promesa
});
```

### Suscribirse al destino de la promesa.

Es posible subscribirse al destino de la promsea utilizando `.then` (para resoluciones) o `.catch` (para rechazos)

```ts
const promise = new Promise((resolve, reject) => {
    resolve(123);
});
promise.then((res) => {
    console.log('Soy llamada:', res === 123); // Soy llamada: true
});
promise.catch((err) => {
    // Esto nunca es llamado
});
```

```ts
const promise = new Promise((resolve, reject) => {
    reject(new Error("Algo terrible ha sucedido"));
});
promise.then((res) => {
    // Esto nunca es llamado
});
promise.catch((err) => {
    console.log('Soy llamada:', err.message); // Soy llamada: Soy llamada: 'Algo terrible ha sucedido'
});
```

> TIP: Atajos en promesas
* Crear una promesa ya resulta rápidamente: `Promise.resolve(result)`
* Crear una promesa ya rechazada rápidamente: `Promise.reject(error)`

### La posibilidad de encadenar Promesas
La posibilidad de encadenar promesas **es el beneficio que las mismas ofrecen**. Una vez que tienes una promesa puedes, a partir de ese punto, usar la función `then` para encadenar más promesas.

* Si devuelves una promesa en alguna función de la cadena, `.then` sólo será llamado una vez que el valor haya sido resuelto:

```ts
Promise.resolve(123)
    .then((res) => {
        console.log(res); // 123
        return 456;
    })
    .then((res) => {
        console.log(res); // 456
        return Promise.resolve(123); // Notá que estamos devolviendo una promesa
    })
    .then((res) => {
        console.log(res); // 123 : Notá que este `.then` esta siendo llamado con el valor resulto
        return 123;
    })
```

* Puedes combinar el manejo de errores de cualquier porción anterior de la cadena con un único `catch`:

```ts
// Crea una promesa rechazada
Promise.reject(new Error('Algo malo ha ocurrido'))
    .then((res) => {
        console.log(res); // No es llamada
        return 456;
    })
    .then((res) => {
        console.log(res); // No es llamada
        return 123;
    })
    .then((res) => {
        console.log(res); // No es llamada
        return 123;
    })
    .catch((err) => {
        console.log(err.message); // Algo malo ha ocurrido
    });
```

* En realidad, `catch` también devuleve una promesa, creando una nueva cadena:

```ts
// Create a rejected promise
Promise.reject(new Error('Algo malo ha ocurrido'))
    .then((res) => {
        console.log(res); // No es llamada
        return 456;
    })
    .catch((err) => {
        console.log(err.message); // Algo malo ha ocurrido
        return 123;
    })
    .then((res) => {
        console.log(res); // 123
    })
```

* Cualquier error sincrónico que sea tirado en un bloque `.then` (o `catch`) resultará en un fallo en la promesa devuelta:

```ts
Promise.resolve(123)
    .then((res) => {
        throw new Error('Algo malo ha ocurrido'); // tira un error sincrónico
        return 456;
    })
    .then((res) => {
        console.log(res); // No es llamada
        return Promise.resolve(789);
    })
    .catch((err) => {
        console.log(err.message); // Algo malo ha ocurrido
    })
```

* Solo el `catch` relevante (el más cercao) es llamado para un determinado un error (ya que el mismo desencadena una nueva cadena de promesas).

```ts
Promise.resolve(123)
    .then((res) => {
        throw new Error('Algo malo ha ocurrido'); // tira un error sincrónico
        return 456;
    })
    .catch((err) => {
        console.log('primer catch: ' + err.message); // Algo malo ha ocurrido
        return 123;
    })
    .then((res) => {
        console.log(res); // 123
        return Promise.resolve(789);
    })
    .catch((err) => {
        console.log('segundo catch: ' + err.message); // No es llamado
    })
```

* Un `catch`solo es llamado si hay un error en la cadena que lo precede. 

```ts
Promise.resolve(123)
    .then((res) => {
        return 456;
    })
    .catch((err) => {
        console.log("HERE"); // No es llamado
    })
```

El hecho de que:

* los errores saltan al primer `catch`, saltéandose cualquier `then` que pudiese haber en el medio, y
* que los errores sincrónicos también son atrapados por algun `catch` que los suceda, 

nos proveen un paradigma de programación asincrónica que permite un manejo de errores superior al llamado de devoluciones de llamadas. Profundizaremos a continuación.


### TypeScript y las promesas
La gran ventaja de TypeScript es que entiende como fluyen los valores a través de una cadena de promesas:

```ts
Promise.resolve(123)
    .then((res) => {
         // se infiere que res es de tipo `number`
         return true;
    })
    .then((res) => {
        // se infiere que res es de tipo `boolean`

    });
```

Claro que también entiende cómo desenvolver cualquier función que pueda devolver una promesa
Of course it also understands unwrapping any function calls that might return a promise:

```ts
function iReturnPromiseAfter1Second(): Promise<string> {
    return new Promise((resolve) => {
        setTimeout(() => resolve("Hello world!"), 1000);
    });
}

Promise.resolve(123)
    .then((res) => {
        // se infiere que res es de tipo `number`
        return iReturnPromiseAfter1Second(); // Estamos devolviendo `Promise<string>`
    })
    .then((res) => {
        // se infiere que res de tipo `string`
        console.log(res); // Hello world!
    });
```


### Convertir una función con estilo de devolución de llamada para que devuelva una promesa

Simplemente envolvé la llamada a la función en una promesa y 
- `reject` si ocurre un error,
- `resolve` si está todo ok.

Por ejemplo, hagamoslo con `fs.readFile`:

```ts
import fs = require('fs');
function readFileAsync(filename: string): Promise<any> {
    return new Promise((resolve,reject) => {
        fs.readFile(filename,(err,result) => {
            if (err) reject(err);
            else resolve(result);
        });
    });
}
```

La manera más confiable de hacer esto es escribirlo a mano, y no tiene que ser tan detallado como el ejemplo anterior. Por ejemplo, podemos convertir `setTimeout` a una versión *prometida* llamada `delay` fácilmente:

```ts
const delay = (ms: number) => new Promise(res => setTimeout(res, ms));
```

Notá que existe una función útil en NodeJS que hace esta especie de magia (`función estilo node => función que devuelve una promesa`) por vos:

```ts
/** Ejemplo de uso */
import fs from 'fs';
import util from 'util';
const readFile = util.promisify(fs.readFile);
```

> Webpack soporta el módulo `util` tal cual. También puedes usarlo en navegadores.

### Revisando el ejemplo JSON

Ahora revisemos nuestro ejemplo `loadJSON` y reescribamoslo a una versión asincrónica que utilice promesas. Todo lo que necesitaremos hacer es leer los contenidos del archivo como una promesa, y luego procesarlos como JSON y habremos terminado.

```ts
function loadJSONAsync(filename: string): Promise<any> {
    return readFileAsync(filename) // Use the function we just wrote
                .then(function (res) {
                    return JSON.parse(res);
                });
}
```

Uso (notá lo similar que es a la versión sincrónica original que escribimos al principio de esta sección 🌹):
```ts
// Archivo JSON válido
loadJSONAsync('good.json')
    .then(function (val) { console.log(val); })
    .catch(function (err) {
        console.log('good.json error', err.message); // No es llamado
    })

// Archivo no existente
    .then(function () {
        return loadJSONAsync('absent.json');
    })
    .then(function (val) { console.log(val); }) // No es llamado
    .catch(function (err) {
        console.log('absent.json error', err.message);
    })

// Archivo JSON inválido
    .then(function () {
        return loadJSONAsync('invalid.json');
    })
    .then(function (val) { console.log(val); }) // No es llamado
    .catch(function (err) {
        console.log('bad.json error', err.message);
    });
```

La razón por la que esta función es más sencilla es porque la consolidación de "`loadFile`(async) + `JSON.parse` (sync) => `catch`" fue hecha por la cadena de promesas. Además la devolución de llamada no fue llamada por *nosotros* sino por la cadena de promesas, por lo que no tuvimos la posiblidad de cometer el error de envolverla en un bloque `try/catch`.

### Flujo de control paralelo

Hemos visto cuan sencillo es crear una secuencia serial de tareas asincrónicas con promesas. Se trata, simplemente, de encadenar llamadas `then`.

Sin embargo, podrías querer correr series de tareas asincrónicas y luego hacer algo con los resultados de esas tareas. La Promes aprovee una función `Promise.all` estática que puedes usar para esperar que un número `n` de promesas terminen. Puedes pasarle un array de `n` promesas y te devolverá un array de `n` valores resueltos. A continuación mostramos encadenamiento y paralelismo:

```ts
// una función asincrónica para simular la carga de un ítem desde un servidor
function loadItem(id: number): Promise<{ id: number }> {
    return new Promise((resolve) => {
        console.log('loading item', id);
        setTimeout(() => { // simulá una demora desde el servidor
            resolve({ id: id });
        }, 1000);
    });
}

// Encadenamiento
let item1, item2;
loadItem(1)
    .then((res) => {
        item1 = res;
        return loadItem(2);
    })
    .then((res) => {
        item2 = res;
        console.log('done');
    }); // El tiempo total será 2s aproximadamente

// Paralelismo
Promise.all([loadItem(1), loadItem(2)])
    .then((res) => {
        [item1, item2] = res;
        console.log('done');
    }); // El tiempo total será 1s aproximadamente
```

A veces quieres correr una serie de tareas asincrónicas, pero todo lo que necesitas es que una de estas tareas termine. Las promesas proveen una función estática `Promise.race` para este escenario:

```ts
var task1 = new Promise(function(resolve, reject) {
    setTimeout(resolve, 1000, 'one');
});
var task2 = new Promise(function(resolve, reject) {
    setTimeout(resolve, 2000, 'two');
});

Promise.race([task1, task2]).then(function(value) {
  console.log(value); // "one"
  // Ambas resulven, pero task1 resuelve más rápido.
});
```

[polyfill]:https://github.com/stefanpenner/es6-promise

---

## Fuente: `typescript-book/docs/quick/browser.md`

# TypeScript en el navegador

Si están usando TypeScript para crear una aplicación web, aquí están nuestras recomendaciones para crear un proyecto TypeScript + React (nuestro framework preferido) rápidamente.

## Preparacion general de la máquina

* Instalen [Node.js](https://nodejs.org/en/download/)
* Instalen [Git](https://git-scm.com/downloads)

## Preparación del proyecto
Usen [https://github.com/basarat/react-typescript](https://github.com/basarat/react-typescript) a modo de base. 

```
git clone https://github.com/basarat/react-typescript.git
cd react-typescript
npm install
```

Ahora saltemos a [desarrollar su increíble aplicación](#develop-your-amazing-application)

## Detalles de la preparación del proyecto
A continuación documentamos como fue creado este proyecto:

* Creen un directorio para el proyecto:

```
mkdir your-project
cd your-project
```

* Creen `tsconfig.json`:

```json
{
  "compilerOptions": {
    "sourceMap": true,
    "module": "commonjs",
    "esModuleInterop": true,
    "resolveJsonModule": true,
    "experimentalDecorators": true,
    "target": "es5",
    "jsx": "react",
    "lib": [
      "dom",
      "es6"
    ]
  },
  "include": [
    "src"
  ],
  "compileOnSave": false
}
```

* Creen `package.json`.

```json
{
  "name": "react-typescript",
  "version": "0.0.0",
  "license": "MIT",
  "repository": {
    "type": "git",
    "url": "https://github.com/basarat/react-typescript.git"
  },
  "scripts": {
    "build": "webpack -p",
    "start": "webpack-dev-server -d --content-base ./public"
  },
  "dependencies": {
    "@types/react": "16.4.10",
    "@types/react-dom": "16.0.7",
    "clean-webpack-plugin": "0.1.19",
    "html-webpack-plugin": "3.2.0",
    "react": "16.4.2",
    "react-dom": "16.4.2",
    "ts-loader": "4.4.2",
    "typescript": "3.0.1",
    "webpack": "4.16.5",
    "webpack-cli": "3.1.0",
    "webpack-dev-server": "3.1.5"
  }
}
```

* Creen un `webpack.config.js` para agrupar sus módulos en un único archivo `app.js` que contenga todos tus recursos:

```js
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/app/app.tsx',
  plugins: [
    new CleanWebpackPlugin(['public/build']),
    new HtmlWebpackPlugin({
      template: 'src/templates/index.html'
    }),
  ],
  output: {
    path: __dirname + '/public',
    filename: 'build/[name].[contenthash].js'
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js']
  },
  module: {
    rules: [
      { test: /\.tsx?$/, loader: 'ts-loader' }
    ]
  }
}
```

* El archivo `src/templates/index.html`. Lo usaremos a modo de plantilla para el `index.html` generado por webpack. El arcihvo generado se encontrará en la carpeta `public` y será servido desde su servidor web: 

```html
<html>
  <body>
      <div id="root"></div>
  </body>
</html>

```

* `src/app/app.tsx` es el punto de entrada de tu aplicación frontend: 

```js
import * as React from 'react';
import * as ReactDOM from 'react-dom';

const Hello: React.FunctionComponent<{ compiler: string, framework: string }> = (props) => {
  return (
    <div>
      <div>{props.compiler}</div>
      <div>{props.framework}</div>
    </div>
  );
}

ReactDOM.render(
  <Hello compiler="TypeScript" framework="React" />,
  document.getElementById("root")
);
```

# Desarollen su increible aplicación

> Puedes obtener los últimos paquetes usando `npm install typescript@latest react@latest react-dom@latest @types/react@latest @types/react-dom@latest webpack@latest webpack-dev-server@latest webpack-cli@latest ts-loader@latest clean-webpack-plugin@latest html-webpack-plugin@latest --save-exact`

* Desarrollen en vivo corriendo `npm start`. 
    * Vayan a [http://localhost:8080](http://localhost:8080)
    * Editen el archivo `src/app/app.tsx` (o cualquier archivo ts/tsx que sea usado de alguna forma u otra por `src/app/app.tsx`) y la aplicación recargará instantáneamente. 
    * Editen el archivo `src/templates/index.html` y el servidor recargara instantáneamente.
* Construyan su proyecto para producción corriendo `npm run build`. 
    * Sirvan la carpeta `public` (contiene los elementos construidos) desde el servidor.

---

## Fuente: `typescript-book/docs/quick/nodejs.md`

# TypeScript con Node.js

TypeScript ha tenido soporte de *primera clase* para Node.js desde su concepción. Aquí explicamos como preparar un proyecto Node.js rápidamente:

> Nota: muchos de estos pasos en realidad son prácticas comunes al preparar cualquier proyecto con Node.js: 

1. Preparar un `package.json` para tu proyecto Node.js. Rápidamente: `npm init -y`
2. Agregar TypeScript (`npm install typescript --save-dev`)
3. Agregar `node.d.ts` (`npm install @types/node --save-dev`)
4. Inciar una `tsconfig.json` para las opciones TypeScript con agunas opciones claves ya elegidas (`npx tsc --init --rotDir src --outDir lib --esModuleInterop --resolveJsonModule --lib es6,dom --module commonjs`)

Eso es todo! Ahora abran su IDE (eg. `code .`) y empiecen a jugar. Ahora puedes usar todas las características de node modules (por ejemplo, `import * as fs from 'fs'`) con toda la seguridad y ergonomía de desarrolladores TypeScript!

Todo el código TypeScript irá en la carpeta `src` y el JavaScript generado estará en `lib`.

## Bonus: compilar + correr en vivo
* Agreguen `ts-node`, al que usaremos para compilar y correr node en vivo (`npm install ts-node --save-dev`)
* Agreguen `nodemon`, al que usaremos para invocar `ts-node` cada vez que cambie algo en un archivo (`npm install nodemon --save-dev`)

Ahora simplemente agreguen un `script` a su `package.json` basado en el punto de entrada de tu aplicación. Por ejemplo, si asumimos que es `index.ts`:

```json
  "scripts": {
    "start": "npm run build:live",
    "build": "tsc -p .",
    "build:live": "nodemon --watch 'src/**/*.ts' --exec 'ts-node' src/index.ts"
  },
```

Ahora pueden correr `npm start` y a medida que editen `index.ts`:

* nodemon repite su comando (ts-node)
* ts-node transpila automáticamente, levantando tsconfig.json y la versión instalada de TypeScript
* ts-node corre el JavaScript generado a través de Node.js.

Y cuando esten listos para publicar su aplicación JavaScript, corran `npm run build`.

## Crear node modules en TypeScript

* [Una clase sobre crear node modules en TypeScript](https://egghead.io/lessons/typescript-create-high-quality-npm-packages-using-typescript)

Usando modulos escritos en TypeScript es super divertido ya que obtienen seguridad a la hora de compilar y autocompletar (esencialmente, es documentación ejecutable).

Crear un módulo de alta calidad en TypeScript es simple. Asumamos la proxima estructura de archivos para tu paquete:

```text
package
├─ package.json
├─ tsconfig.json
├─ src
│  ├─ All your source files
│  ├─ index.ts
│  ├─ foo.ts
│  └─ ...
└─ lib
  ├─ All your compiled files
  ├─ index.d.ts
  ├─ index.js
  ├─ foo.d.ts
  ├─ foo.js
  └─ ...
```


* En su `tsconfig.json`
  * tengan `compilerOptions`: `"outDir": "lib"` y `"declaration": true` < Esto genera declaraciones y archivos js en la carpeta lib
  * tengan `include: ["./src/**/*"]` < Esto incluye todos los archivos del directorio `src`.

* En su `package.json` tengan
  * `"main": "lib/index"` < Esto le dice a node que debe cargar `lib/index.js`
  * `"types": "lib/index"` < Esto le dice a TypeScript que debe cargar `lib/index.d.ts`


Paquete ejemplo:
* `npm install typestyle` [for TypeStyle](https://www.npmjs.com/package/typestyle)
* Usos: `import { style } from 'typestyle';` será completamente seguro respecto de tipos.

MÁS:

* Si sus paquete depende de otros paquetes TypeScript creados por otros autores, incluyanlos en `dependencies`/`devDependencies`/`peerDependencies` al igual que harían con paquetes de JS en bruto.
* Si sus paquete depende de otros paquetes TypeScript creados por otros autores y los quieren usar con seguridad de tipos en su proyecto, incluayn sus tipos (ejemplo, `@types/foo`) en `devDependencies`. Los tipos de JavaScript deberías ser manejados *fuera del alcance* de las corrientes principales de NPM. El ecosistema JavaScript suele romper tipos sin versiones semáticas, por lo que si sus usuarios necesitan tipos para estos paquetes, deberían instalar la versión de `@types/foo` que funciona para ellos.

## Puntos extra

Módulos NPM como estos funcionan perfectamente con browserify (usando tsify) o webpack (usando ts-loader).

---

## Fuente: `typescript-book/docs/rest-parameters.md`

### Parámetros Rest
Los parámetros rest (denotados por `...NombreDelUltimoArgumento` ) permiten aceptar múltiples argumentos en una función y obtenerlos como un array. Esto se demuestra en el ejemplo a continuación.

```ts
function iTakeItAll(first, second, ...allOthers) {
    console.log(allOthers);
}
iTakeItAll('foo', 'bar'); // []
iTakeItAll('foo', 'bar', 'bas', 'qux'); // ['bas','qux']
```

Los parámetros rest pueden ser utilizados en cualquier función ya sea `function`/`()=>`/`class member`.

---

## Fuente: `typescript-book/docs/spread-operator.md`

### Operador de propagación

El principal objetivo del operador de propagación es *propagar* los elementos de un array u objeto. Esto se explica mejor con ejemplos.

#### Apply
Un caso de uso común es propagar un array en los argumentos de una función. Previamente, necesitabas usar `Function.prototype.apply`:

```ts
function foo(x, y, z) { }
var args = [0, 1, 2];
foo.apply(null, args);
```

Ahora puedes hacerlo solamente prefijando los argumentso con `...` como mostramos a continuación: 

```ts
function foo(x, y, z) { }
var args = [0, 1, 2];
foo(...args);
```

Aquí estamos *propagando* el array `args` en un `arguments` posicional.

#### Desestructurando
Ya hemos visto un uso de esto en *Desestructurando*:

```ts
var [x, y, ...remaining] = [1, 2, 3, 4];
console.log(x, y, remaining); // 1,2,[3,4]
```
La motivación aquí es simplicar el proceso de capturación de los elementos restantes de un array cuando desestructuramos.

#### Asignación de array
El operador de propagación te permite colocar una *versión extendida* de un array dentro de otro array. Lo demostramos en el ejemplo que sigue:

```ts
var list = [1, 2];
list = [...list, 3, 4];
console.log(list); // [1,2,3,4]
```

Puedes poner el array expandido en cualquier posición y obtener el efecto que esperas:

```ts
var list = [1, 2];
list = [0, ...list, 4];
console.log(list); // [0,1,2,4]
```

#### Propagación de objeto
También puedes propagar un objeto dentro de otro objeto. Un caso de uso común es simplemente agregar una propiedad a un objeto sin mutar el objeto original:

```ts
const point2D = {x: 1, y: 2};
/** Crea un nuevo objeto utilizando todas las props de point2D y z */
const point3D = {...point2D, z: 3};
```

Para objetos, el orden en el que pones el propagador importa. Funciona de forma similar a `Object.assign` y hace lo que esperarías: lo que viene primero se encuentra anulado por lo que sigue:

```ts
const point2D = {x: 1, y: 2};
const anotherPoint3D = {x: 5, z: 4, ...point2D};
console.log(anotherPoint3D); // {x: 1, y: 2, z: 4}
const yetAnotherPoint3D = {...point2D, x: 5, z: 4}
console.log(yetAnotherPoint3D); // {x: 5, y: 2, z: 4}
```

Otro caso de uso es una extención superficial:

```ts
const foo = {a: 1, b: 2, c: 0};
const bar = {c: 1, d: 2};
/** Combinar foo y bar */
const fooBar = {...foo, ...bar};
// fooBar ahora es {a: 1, b: 2, c: 1, d: 2}
```

#### Resumen
`apply` es algo que utilizas habitualmente en JavaScript, por lo que es bueno tener una mejor sintaxis donde no tenes ese feo `null` para el argumento `this`. Además, tener una sintaxis dedicada a mover arrays fuera de (desestructurando) o hacia dentro de (asignar) otros arrays provee una forma limpia de procesar arrays parciales.


[](https://github.com/Microsoft/TypeScript/pull/1931)

---

## Fuente: `typescript-book/docs/staging/generators.md`

### Generators
Also called `function *`, generators allow you to create functions whose execution can be paused and then later resumed maintaining the state between pause-resume transitions. The value returned from a generator is called an `iterator` and can be used to control this `pause-resume` transition.

Here is a simple example of a generator function that generates an *infinite* list of whole numbers.

```ts
function* wholeNumbers() {
    var current = 0;
    while(true) {
        yield current++;
    }
}
```

The `yield` contextual keyword is used to return control from a generator (effectively pausing function execution) along with an optional value (here `current`). You can get access to this value using the `iterator`'s `.next()` member function, this is shown below:

```ts
function* wholeNumbers() {
    var current = 0;
    while(true) {
        yield current++;
    }
}
var iterator = wholeNumbers();
console.log(iterator.next()); // 0
console.log(iterator.next()); // 1
console.log(iterator.next()); // 2
// so on till infinity....
```

Now that you have seen `function*`, `yield` and `.next()` we can dig deeper.

#### Catching Errors
Any errors thrown (intentially using `throw` or unintentionally due to error) from the generator can be caught using `try/catch` just like normal function executions. This is demonstrated below:

```ts
function* wholeNumbers() {
    var current = 0;
    while(true) {
      if (current === 3)
        throw new Error('3 is the magic number');
      else
        yield current++;
    }
}
var iterator = wholeNumbers();
console.log(iterator.next()); // 0
console.log(iterator.next()); // 1
console.log(iterator.next()); // 2
try {
    console.log(iterator.next()); // Will throw an error
}
catch(ex) {
    console.log(ex.message); // 3 is the magic number
}
```

#### Controlling function execution externally
The iterator returned from the generator function can be used to control the state *inside* the generator function as well.

// TODO: example

---

## Fuente: `typescript-book/docs/styleguide/styleguide.md`

# TypeScript StyleGuide and Coding Conventions

> An unofficial TypeScript StyleGuide

People have asked me for my opinions on this. Personally I don't enforce these a lot on my teams and projects but it does help to have these mentioned as a tie breaker when someone feels the need to have such strong consistency. There are other things that I feel much more strongly about and those are covered in the [tips chapter](../tips/main.md) (e.g. type assertion is bad, property setters are bad) 🌹.

Key Sections:

* [Variable](#variable-and-function)
* [Class](#class)
* [Interface](#interface)
* [Type](#type)
* [Namespace](#namespace)
* [Enum](#enum)
* [`null` vs. `undefined`](#null-vs-undefined)
* [Formatting](#formatting)
* [Single vs. Double Quotes](#quotes)
* [Tabs vs. Spaces](#spaces)
* [Use semicolons](#semicolons)
* [Annotate Arrays as `Type[]`](#array)
* [File Names](#filename)
* [`type` vs `interface`](#type-vs-interface)

## Variable and Function
* Use `camelCase` for variable and function names

> Reason: Conventional JavaScript

**Bad**
```ts
var FooVar;
function BarFunc() { }
```
**Good**
```ts
var fooVar;
function barFunc() { }
```

## Class
* Use `PascalCase` for class names.

> Reason: This is actually fairly conventional in standard JavaScript.

**Bad**
```ts
class foo { }
```
**Good**
```ts
class Foo { }
```
* Use `camelCase` of class members and methods

> Reason: Naturally follows from variable and function naming convention.

**Bad**
```ts
class Foo {
    Bar: number;
    Baz() { }
}
```
**Good**
```ts
class Foo {
    bar: number;
    baz() { }
}
```
## Interface

* Use `PascalCase` for name.

> Reason: Similar to class

* Use `camelCase` for members.

> Reason: Similar to class

* **Don't** prefix with `I`

> Reason: Unconventional. `lib.d.ts` defines important interfaces without an `I` (e.g. Window, Document etc).

**Bad**
```ts
interface IFoo {
}
```
**Good**
```ts
interface Foo {
}
```

## Type

* Use `PascalCase` for name.

> Reason: Similar to class

* Use `camelCase` for members.

> Reason: Similar to class


## Namespace

* Use `PascalCase` for names

> Reason: Convention followed by the TypeScript team. Namespaces are effectively just a class with static members. Class names are `PascalCase` => Namespace names are `PascalCase`

**Bad**
```ts
namespace foo {
}
```
**Good**
```ts
namespace Foo {
}
```

## Enum

* Use `PascalCase` for enum names

> Reason: Similar to Class. Is a Type.

**Bad**
```ts
enum color {
}
```
**Good**
```ts
enum Color {
}
```

* Use `PascalCase` for enum member

> Reason: Convention followed by TypeScript team i.e. the language creators e.g `SyntaxKind.StringLiteral`. Also helps with translation (code generation) of other languages into TypeScript.

**Bad**
```ts
enum Color {
    red
}
```
**Good**
```ts
enum Color {
    Red
}
```

## Null vs. Undefined

* Prefer not to use either for explicit unavailability

> Reason: these values are commonly used to keep a consistent structure between values. In TypeScript you use *types* to denote the structure

**Bad**
```ts
let foo = {x:123,y:undefined};
```
**Good**
```ts
let foo:{x:number,y?:number} = {x:123};
```

* Use `undefined` in general (do consider returning an object like `{valid:boolean,value?:Foo}` instead)

***Bad***
```ts
return null;
```
***Good***
```ts
return undefined;
```

* Use `null` where its a part of the API or conventional

> Reason: It is conventional in Node.js e.g. `error` is `null` for NodeBack style callbacks.

**Bad**
```ts
cb(undefined)
```
**Good**
```ts
cb(null)
```

* Use *truthy* check for **objects** being `null` or `undefined`

**Bad**
```ts
if (error === null)
```
**Good**
```ts
if (error)
```

* Use `== undefined` / `!= undefined` (not `===` / `!==`) to check for `null` / `undefined` on primitives as it works for both `null`/`undefined` but not other falsy values (like `''`,`0`,`false`) e.g.

**Bad**
```ts
if (error !== null)
```
**Good**
```ts
if (error != undefined)
```

## Formatting
The TypeScript compiler ships with a very nice formatting language service. Whatever output it gives by default is good enough to reduce the cognitive overload on the team.

Use [`tsfmt`](https://github.com/vvakame/typescript-formatter) to automatically format your code on the command line. Also your IDE (atom/vscode/vs/sublime) already has formatting support built-in.

Examples:
```ts
// Space before type i.e. foo:<space>string
const foo: string = "hello";
```

## Quotes

* Prefer single quotes (`'`) unless escaping.

> Reason: More JavaScript teams do this (e.g. [airbnb](https://github.com/airbnb/javascript), [standard](https://github.com/feross/standard), [npm](https://github.com/npm/npm), [node](https://github.com/nodejs/node), [google/angular](https://github.com/angular/angular/), [facebook/react](https://github.com/facebook/react)). Its easier to type (no shift needed on most keyboards). [Prettier team recommends single quotes as well](https://github.com/prettier/prettier/issues/1105)

> Double quotes are not without merit: Allows easier copy paste of objects into JSON. Allows people to use other languages to work without changing their quote character. Allows you to use apostrophes e.g. `He's not going.`. But I'd rather not deviate from where the JS Community is fairly decided.

* When you can't use double quotes, try using back ticks (\`).

> Reason: These generally represent the intent of complex enough strings.

## Spaces

* Use `2` spaces. Not tabs.

> Reason: More JavaScript teams do this (e.g. [airbnb](https://github.com/airbnb/javascript), [idiomatic](https://github.com/rwaldron/idiomatic.js), [standard](https://github.com/feross/standard), [npm](https://github.com/npm/npm), [node](https://github.com/nodejs/node), [google/angular](https://github.com/angular/angular/), [facebook/react](https://github.com/facebook/react)). The TypeScript/VSCode teams use 4 spaces but are definitely the exception in the ecosystem.

## Semicolons

* Use semicolons.

> Reasons: Explicit semicolons helps language formatting tools give consistent results. Missing ASI (automatic semicolon insertion) can trip new devs e.g. `foo() \n (function(){})` will be a single statement (not two). Recommended by TC39 as well.

## Array

* Annotate arrays as `foos:Foo[]` instead of `foos:Array<Foo>`.

> Reasons: Its easier to read. Its used by the TypeScript team. Makes easier to know something is an array as the mind is trained to detect `[]`.

## Filename
Name files with `camelCase`. E.g. `accordian.tsx`, `myControl.tsx`, `utils.ts`, `map.ts` etc.

> Reason: Conventional across many JS teams.

## type vs. interface

* Use `type` when you *might* need a union or intersection:

```
type Foo = number | { someProperty: number }
```
* Use `interface` when you want `extends` or `implements` e.g

```
interface Foo {
  foo: string;
}
interface FooBar extends Foo {
  bar: string;
}
class X implements FooBar {
  foo: string;
  bar: string;
}
```
* Otherwise use whatever makes you happy that day.

---

## Fuente: `typescript-book/docs/template-strings.md`

### Strings de Plantillas
De ahora en más llamaremos a las plantillas *templates*. Sintácticamente éstas son strings que usan acentos graves (es decir, \`) en lugar de comillas simples(') o dobles ("). Los strings de templates existen por tres motivos:
* la interpolación de strings
* strings que abarquen múltiples líneas, y
* la etiquetación de templates

#### Interpolación de strings
Un caso de uso común es la intención de generar una string a partir de otras strings estáticas y variables. Para esto, tendrías que utilizar *lógica de template* y de ahi es que las *strings de templates* sacaron su nombre. Anteriormente, hubiesemos generado una string de HTML de la siguiente manera:

```ts
var lyrics = 'Never gonna give you up';
var html = '<div>' + lyrics + '</div>';
```
Ahora, con las strings de templates puedes hacer lo mismo de forma más legible:

```ts
var lyrics = 'Never gonna give you up';
var html = `<div>${lyrics}</div>`;
```

Notá que cualquier elemento dentro de la interpolación (`${` y `}`) es tratado como una expresión de Javascript y evaluado como tal. Es decir, puedes colocar variables (como en el caso anterior), o realizar operaciones. Por ejemplo, puedes hacer matemática:

```ts
console.log(`1 más 1 dan ${1 + 1}`);
```

#### Párrafos
Quisite poner una nueva línea en una string JavaScript alguna vez? Tal vez quisiste incluir la letra de una canción. Habrás tenido que *escapar el literal de la nueva lína* utilizando el caracter de escape `\`, y luego escribir manualmente `/n` en la nueva línea. Este proceso es el que mostramos a continuación: 

```ts
var lyrics = "Never gonna give you up \
\nNever gonna let you down";
```

Con TypeScript, puedes hacer lo mismo solo con strings de template:

```ts
var lyrics = `Never gonna give you up
Never gonna let you down`;
```

#### Templates etiquetados

Puedes colocar una función (llamada `tag`) antes de la string de template. Esta puede pre-procesar tu string de template y los valores de todos los elementos que coloques en interpolaciones, para luego devolver un resultado. Un par de notas:
* Todas las strings literales son pasadas en forma de array en el primer argumento de la función `tag`
* Todos los valores de los elementos colocados en interpolaciones son pasados en los argumentos que restan. Comúnmente utilizamos un parámetro rest para convertirlos en un array.

Aquí hay un ejemplo de una función tag (llamada `htmlEscape`) que escapa el HTML de todos los elementos interpolados:

```ts
var dicho = "pajaro en mano > mil volando";
var html = htmlEscape `<div> Solo quisiera decir : ${dicho}</div>`;

// ejemplo de función tag
function htmlEscape(literals: TemplateStringsArray, ...placeholders: string[]) {
    let result = "";

    // intercalá los literales con los elementos interpolados
    for (let i = 0; i < placeholders.length; i++) {
        result += literals[i];
        result += placeholders[i]
            .replace(/&/g, '&amp;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;');
    }

    // agregá el último literal
    result += literals[literals.length - 1];
    return result;
}
```
> Nota: puedes anotar `placeholders` de forma que sea cualquier `[]`. Como sea que lo anotes, TypeScript va a chequear el tipo de los valores interpolados para asegurarse que coincidan con tu anotación. Por ejemplo, si esperas lidiar con strings o números, puedes anotar `...placeholders:(string | number)[]`.

#### JS Generado
Para targets de compilación previas a ES6 el código es bastante simple. Los párrafos de strings se convierten en strings escapadas. La interpolación se convierte en *concatenación*. Y los templates etiquetados se convierten en llamadas a funciones.

#### Resumen
Los párrafos de strings y la interpolación de string son geniales de tener en cualquier lenguage. Es bueno que ahora puedes utilizarlos en tu JavaScript (gracias TypeScript!). Los templates etiquetados te permiten crear servicios poderosos.

---

## Fuente: `typescript-book/docs/testing/cypress.md`

# Por qué Cypress
Cypress es una herramienta de pruebas E2E muy buena. Aquí listamos algunas razones para considerarla:

* Es posible instalarla de forma aislada
* Incluye definiciones de TypeScript por default
* Provee una buena experiencia de depuración interactiva con Google Chrome. Esto es similar a como los desarrolladores de UI trabajan manualmente.
* Tiene separación de comando - ejecución, lo que permite un proceso de depuración y de pruebas de estabilidad más poderoso (más detalle sobre esto a continuación)
* Tiene aserciones implicitas para proveer una experiencia de depuración más significativa, con menos pruebas frágiles (más sobre esto en las tips que siguen).

## Instalación

> Los pasos detallados en este proceso de instalación les darán una linda carpeta `e2e` que pueden usar como plantilla para su empresa. Pueden copiar esta carpeta `e2e` en cualquier proyecto ya existente que quieran evaluar con cypress.

Creen un directorio `e2e` e instalen cypress y sus dependencias para transpilación de TypeScript:

```sh
mkdir e2e
cd e2e
npm init -y
npm install cypress webpack @cypress/webpack-preprocessor typescript ts-loader
```

> A continuación listamos algunas razones para crear una carpeta `e2e` separada, especialmente para cypress:
* Facilita el aislamiento de las dependencias de su `package.json` del resto de su proyecto. Esto resulta en menos conflictos de dependencias.
* Los frameworks de evaluación tienen un mal hábito de contaminar el namespace global con variables como `describe`, `it`, `expect`. Es mejor contener los `node_modules` y el `tsconfig.json` del e2e en esta carpeta especial `e2e` para prevenir que haya conflictos de definiciones de tipo globales. 

Configuren el `tsconfig.json` de TypeScript. Por ejemplo:


```json
{
  "compilerOptions": {
    "strict": true,
    "sourceMap": true,
    "module": "commonjs",
    "target": "es5",
    "lib": [
      "dom",
      "es6"
    ],
    "jsx": "react",
    "experimentalDecorators": true
  },
  "compileOnSave": false
}
```

Hana un simulacro de cypress para preparar la estructura de carpetas. El IDE de Cypress se abrirá. Pueden cerrarlo luego de ver el mensaje de bienvenida.

```sh
npx cypress open
```

Configuren cypress para transpilar typescript editando `e2e/cypress/plugins/index.js` para que contenga lo siguiente:

```js
const wp = require('@cypress/webpack-preprocessor')
module.exports = (on) => {
  const options = {
    webpackOptions: {
      resolve: {
        extensions: [".ts", ".tsx", ".js"]
      },
      module: {
        rules: [
          {
            test: /\.tsx?$/,
            loader: "ts-loader",
            options: { transpileOnly: true }
          }
        ]
      }
    },
  }
  on('file:preprocessor', wp(options))
}
```

Opcionalmente, agreguen algunos comandos al archivo `e2e/package.json`:

```json
  "scripts": {
    "cypress:open": "cypress open",
    "cypress:run": "cypress run"
  },
```

## Más detalles de los archivos clave:
En la carpeta `e2e` deberían tener estos archivos:

* `/cypress.json`: Configura cypress. El archivo dfault está vacío y eso es todo lo que necesitan.
* `/cypress` Subcarpetas: 
    * `/fixtures`: Accesorios de pruebas
        * Viene con un `example.json`. Sientanse libres de eliminarlo.
        * Pueden crear archivos `.json` que peuden ser usados para proveer muestras de datos (es decir, accesorios) que serán utilizadas en las pruebas. 
    * `/integration`: Todas las pruebas. 
        * Viene con una carpeta `examples`. Sientanse libres de eliminarla.
        * Nombren a los archivos de pruebas con `.spec.ts`. Por ejemplo `algo.spec.ts`.
        * Sientanse libres de crear pruebas en subcarpetas para mantenrlas mejor organizadas. e.g. `/someFeatureFolder/something.spec.ts`.

## Primera prueba
* creen un archivo `/cypress/integration/first.spec.ts` con el siguiente contenido: 

```ts
/// <reference types="cypress"/>

describe('google search', () => {
  it('should work', () => {
    cy.visit('http://www.google.com');
    cy.get('#lst-ib').type('Hello world{enter}')
  });
});
```

## Correrlo en desarrollo
Abran el IDE de Cypress usando el siguiente comando:

```sh
npm run cypress:open
```

Y seleccionen una prueba para correr.

## Correrlo en un servidor build

Pueden correr pruebas de cypress en modo CI usando el siguiente comando:

```sh
npm run cypress:run
```

## Tip: Compartan código entre UI y prueba
Las pruebas de Cypress se compilan / empacan y corren en el navegador. Así que siéntanse libres de importar cualquier parte de código de su pryecto a la prueba. 

Por ejemplo, pueden compartir valores de ID entre UI y pruebas, para asegurarse que los selectores de CSS no se vayan a romper:

```js
import { Ids } from '../../../src/app/constants'; 

// Later 
cy.get(`#${Ids.username}`)
  .type('john')
```

## Tip: Creen objetos de página
Crear objetos que provean una manera conveniente de usarlos para todas las interaciones que varias pruebas necesitan realizar con una página es una convención común de evaluación. Pueden crear objetos de páginas usando clases de TypeScript con getters y métodos. Por ejemplo:

```js
import { Ids } from '../../../src/app/constants'; 

class LoginPage {
  visit() {
    cy.visit('/login');
  }
  
  get username() {
    return cy.get(`#${Ids.username}`);
  }
}
const page = new LoginPage();

// Later
page.visit();

page.username.type('john');

```

## Tip: Aserciones implícitas
Cuando un comando de cypress falla, obtendrán un lindo error (en lugar de algo como `null`, como sucede con muchos otros frameworks) por lo que podrán fallar rápido y saber exactamente por qué una prueba falla:

```
cy.get('#foo') 
// If there is no element with id #foo cypress will wait for 4 seconds automatically 
// If still not found you get an error here ^ 


// This \/ will not trigger until an element #foo is found
  .should('have.text', 'something') 
```

## Tip: Aserciones explícitas
Cypress incluye varias ayudas para aserciones para la web. Por ejemplo chai-jquery https://docs.cypress.io/guides/references/assertions.html#Chai-jQuery. Pueden usarlas con el comando `.should`, incluyendo el encadenador como una string. Por ejemplo:

```
cy.get('#foo') 
  .should('have.text', 'something') 
```

## Tip: Comandos y encadenamiento
Cada llamada de función en una cadena de cypress es un `comando`. El comando `should` es una aserción. Es convencional empezar por separado distintas *categorías* de cadenas y acciones. Por ejemplo:

```ts
// No hagan esto
cy.get(/**algo*/) 
  .should(/**algo*/)
  .click()
  .should(/**algo*/)
  .get(/**algo mas*/) 
  .should(/**algo*/)

// Es mejor separar los dos `get` 
cy.get(/**algo*/) 
  .should(/**algo*/)
  .click()
  .should(/**algo*/)

cy.get(/**algo mas*/) 
  .should(/**algo*/)
```

Otras librerías *evalúan y corren* el código al mismo tiempo. Esas librerías los fuerza a tener que elegir una única cadena, lo que puede resultar en una pesadilla de depurar, al tener aserciones y selectores entremezclados.

Los comandos de Cypress son, esencialmente, *declaraciones* que le indican al tiempo de ejecución de cypress que deberá ejecutar los comandos más adelante. En fin: Cypress es más sencillo.

## Tip: Usen `contains` para facilitar el querying

El siguiente código muestra un ejemplo:

```
cy.get('#foo') 
  // una vez que #foo es encontrado, ocurre lo siguiente:
  .contains('Submit') 
  .click()
  // ^ continuará buscando algo que tenga el texto `Submit` y fallará si se acaba el tiempo.
  // ^ Luego de que es encontrado, desencadena un click en el Nodo HTML que contiene el texto `Submit`.
```
## Tip: Aserciones implícitas
Cypress tiene un concepto de aserciones implícitas. Estas solo corren si un comando futuro tiene errores debido a un comando previo. Por ejemplo, el siguiente código no tendrá errores si no hay texto con `Submit`:

```ts
cy.get('#foo') 
// una vez que #foo es encontrado, ocurre lo siguiente:
  .contains('Submit') 
```
Sin embargo, el siguiente ejemplo tendrá un error en `contains` (luego de reintentar automáticamente, por supuesto) ya que no se puede encontarr nada que pueda ser `click`eado:

```ts
cy.get('#foo') 
// una vez que #foo es encontrado, ocurre lo siguiente:
  .contains('Submit') 
  .click()
  // ^ Error: #foo does not have anything that `contains` `'Submit'`
```

Si quieren pueden usar una *aserción explícita* y no dependen de aserciones implícitas. Por ejemplo, en lugar de `contain` deberían usar `cy.should('contain','Submit')`: 

```ts
// Mal. No hay error.
cy.get('#foo') 
  .contains('Submit') 

// Bien. Error: `#foo` does not contain `Submit`
cy.get('#foo') 
  .should('contain', 'Submit')
```

## Tip: Esperar un pedido HTTP
Muchas de las pruebas han sido tradicionalmente frágiles debido a todos los timeouts que son necesarios para los XHRs que hace una aplicación. `cy.server` facilita
* crear un alias para llamadas al backend
* esperar a que ocurran

Por ejemplo:

```ts
cy.server()
  .route('POST', 'https://example.com/api/application/load')
  .as('load') // creen un alias

// Empiecen la prueba
cy.visit('/')

// esperen la llamada
cy.wait('@load') 

// Ahora la data ha sido cargada
```

## Tip: Imitar una respuesta de un pedido HTTP
También pueden imitar la respuesta del pedido fácilmente usando `route`:
```ts
cy.server()
  .route('POST', 'https://example.com/api/application/load', /* Example payload response */{success:true})
```

## Tip: Tiempo de imitación
Pueden usar `wait` para pausar una prueba por un determinado período de tiempo, por ejemplo, para evaluar una pantalla automática de notificación de "están a punto de ser cerrada su sesión":

```ts
cy.visit('/');
cy.wait(waitMilliseconds);
cy.get('#logoutNotification').should('be.visible');
```

Sin embargo, se recomenda imitar tiempo usando `cy.clock` y reenviar tiempo usando `cy.tick`. Por ejemplo:

```ts
cy.clock();

cy.visit('/');
cy.tick(waitMilliseconds);
cy.get('#logoutNotification').should('be.visible');
```

## Tip: Retrasos inteligentes y reintentos
Cypress esperará (y reintentará) automáticamente muchas cosas asincrónicas:
```
// Si no hay un pedido hacia el alias `foo`, cypress esperará 4 segundos automáticamente
cy.wait('@foo') 
// Si no hay un elemento con id #foo, cypress esperará 4 segundos automáticamente y continuará reintentando
cy.get('#foo')
```
Esto previene que tengan que agregar lógica arbitraria de timeout (y reintentar) constantemente en su código de pruebas.


## Tip: Realizar pruebas unitarias para el código de la aplicación
También pueden usar Cypress para pruebas unitarias. Por ejemplo:

```js
import { once } from '../../../src/app/utils'; 

// Later 
it('should only call function once', () => {
  let called = 0;
  const callMe = once(()=>called++);
  callMe();
  callMe();
  expect(called).to.equal(1);
});
```

## Tip: Imitación en pruebas unitarias
Si estan realizando pruebas unitarias en su aplicación, pueden proveer imitaciones usando `cy.stub`. Por ejemplo, si quieren asegurarse que `navigate` es llamada en una función `foo`:

* `foo.ts`
```ts
import { navigate } from 'takeme';

export function foo() {
  navigate('/foo');
}
```

* Pueden hacerlo como en `some.spec.ts`: 
```ts
/// <reference types="cypress"/>

import { foo } from '../../../src/app/foo';
import * as takeme from 'takeme';

describe('should work', () => {
  it('should stub it', () => {
    cy.stub(takeme, 'navigate');
    foo();
    expect(takeme.navigate).to.have.been.calledWith('/foo');
  })
});
```

## Tip: Puntos de quiebre
El registro automático de instantáneas y comandos que las pruebas de Cypress generan es buenísimo para depurar. Habiendo dicho esto, también es posible pausar la ejecución de las pruebas si así lo desean.

Primero deben asegurarse que tienen las herramienta de desarrolladores de chrome ("dev tools") abiertas en el "corredor" de las pruebas (`CMD + ALT + i` en mac / `F12` en windows). Una vez que las dev tools estan abiertas, pueden reiniciar las pruebas y las dev tools permanecerán abiertas. Si están abiertas, podrán pausar las pruebas de dos maneras:

* Puntos de quiebre en el código de la aplicación: usen una declaración `debugger` en el código y el "corredor" parará en él, de la misma forma que en desarrollo web estándar.
* Puntos de quiebre de código de pruebas: Pueden usar el comando `.debug()` y la ejecución de pruebas de Cypress parará en él. Alternativamente, pueden usar una declaración `debugger` en una devolución de llamada `.then` de un comando para provocar una pausa. Por ejemplo, `.then(() => {debugger})`.  También lo pueden usar para agarrar un elemento `cy.get('#foo').then(($ /* referencia al elemento dom */) => { debugger; })` o una llamada de red como `cy.request('https://someurl').then((res /* respuesta */) => { debugger });`. Sin embargo, la forma idiomática es `cy.get('#foo').debug()` y una vez que el "corredor" de pruebas ha pausado en `debug` pueden hacer click en `get` en el registro de comandos para `console.log` cualquier información que necesiten sobre el comando `.get('#foo')` automáticamente (al igual que para cualquier otro comando que quieran depurar).

## Tip: Empezar el servidor y el test
Si necesitan empezar el servidor local antes que sus pruebas puedan correr, pueden agregar `start-server-and-test` https://github.com/bahmutov/start-server-and-test como una dependencia. Acepta los siguientes argumentos:
* un script npm que *corre* el servidor (server)
* un endpoint para controlar si el servidor ha empezador (start)
* un script npm para iniciar las pruebas (test)

Ejemplo package.json: 
```json
{
    "scripts": {
        "start-server": "npm start",
        "run-tests": "mocha e2e-spec.js",
        "ci": "start-server-and-test start-server http://localhost:8080 run-tests"
    }
}
```

## Recursos 
* Website: https://www.cypress.io/
* Escriban su primera prueba cypress (da un buen tour de la IDE de cypress) : https://docs.cypress.io/guides/getting-started/writing-your-first-test.html
* Configuren un ambiente CI (por jeemplo, la imagen docker que funciona por default con `cypress run`): https://docs.cypress.io/guides/guides/continuous-integration.html
* Recetas (Listas de recetas con descripciones. Hagan click en los títulos para navegar al código fuente de cada receta): https://docs.cypress.io/examples/examples/recipes.html

---

## Fuente: `typescript-book/docs/testing/intro.md`

# Pruebas
TypeScript puede ser usado con cualquier framework de pruebas (testeo) que quieran. En el peor de los casos, siempre pueden hacer una simple transformación `TypeScript -> JavaScript` y seguir felices su camino.

Habiendo dicho eso, en esta sección consideraremos ciertas opciones que hemos disfrutado ampliamente 🌹

---

## Fuente: `typescript-book/docs/testing/jest.md`

# Usando Jest con TypeScript

> [Curso Pro de egghead sobre Jest / TypeScript](https://egghead.io/lessons/typescript-getting-started-with-jest-using-typescript)

No existe una solución de testeo perfecta. Habiendo hecho esa aclaración, Jest es una opción de pruebas unitarias que provee un gran soporte para TypeScript.

> Nota: asumimos que empiezan con una preparación simple con un package.json de node. Adicionalmente, todos los archivos de TypeScript deben estar en una carpeta `src`, ya que esto se encuentra recomendado para tener un proyecto limpio y ordenado (más allá de si usen Jest o no).

## Paso 1: Instalar

Corran el siguiente comando para instalar usando npm:

```shell
npm i jest @types/jest ts-jest -D
```

Explicación:

* Instalen el framework `jest` (`jest`)
* Instalen los tipos para `jest` (`@types/jest`)
* Instalen el preprocesador de TypeScript para jest (`ts-jest`) el cual les permitirá transpilar TypeScript a medida que avanzar y tener soporte para mapas de fuente incluido.
* Guarden todos estos a sus dependencias dev (las pruebas son casi siempre una dev-dependency de npm)


## Paso 2: Configuren Jest

Agreguen el siguiente archivo `jest.config.js` a la raíz de su proyecto:

```js
module.exports = {
  "roots": [
    "<rootDir>/src"
  ],
  "transform": {
    "^.+\\.tsx?$": "ts-jest"
  },
  "testRegex": "(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$",
  "moduleFileExtensions": [
    "ts",
    "tsx",
    "js",
    "jsx",
    "json",
    "node"
  ],
}
```

Explicación:

* Siempre recomendamos tener *todos* los archivos TypeScript en una carpeta `src` en su proyecto. Asumimos que esto es así y lo especificamos usando la opción `roots`.
* La configuración `transform` le dice a `jest` que use `ts-jest` para archivos ts / tsx.
* La opción `testRegex` le dice a jest que busque pruebas en cualquier carpeta `__tests__` Y cualquier archivo que use la extensión `(.test|.spec).(ts|tsx)`. Por ejemplo: `asdf.test.tsx`, etc.
* La opción `moduleFileExtension` le dice a jest que reconozca nuestras extensiones de archivos. Esto es necesario ya que agregamos `ts`/`tsx` a las opciones default (`js|jsx|json|node`).

## Step 3: Correr las pruebas

Corran `npx jest` desde la raíz de su proyecto y jest ejecutará cualquier prueba que tengan.

### Opcional: Agregar un comando target para comandos npm

Agregar en `package.json`:

```json
{
  "test": "jest"
}
```

* Esto les permitirá correr los test con un simple comando `npm t`.
* E incluso usando el modo de observación con `npm t -- --watch`.

### Opcional: Correr jest en modo observación

* `npx jest --watch`

### Ejemplo

* Para un archivo `foo.ts`:

```js
export const sum
  = (...a: number[]) =>
    a.reduce((acc, val) => acc + val, 0);
```

* Un simple `foo.test.ts`:

```js
import { sum } from '../';

test('basic', () => {
  expect(sum()).toBe(0);
});

test('basic again', () => {
  expect(sum(1, 2)).toBe(3);
});
```

Notas:

* Jest provee la función global `test`.
* Jest viene con aserciones incluidas bajo la forma del `expect` global.

### Ejemplo async

Jest tiene soporte para async/await incluido:

```js
test('basic',async () => {
  expect(sum()).toBe(0);
});

test('basic again', async () => {
  expect(sum(1, 2)).toBe(3);
}, 1000 /* optional timeout */);
```

### Ejemplo enzyme



> [Curso Pro de egghead sobre Enzyme / Jest / TypeScript](https://egghead.io/lessons/react-test-react-components-and-dom-using-enzyme)

Enzyme les permitirá probar componentes de React con soporte de DOM. Hay tres pasos para configurar enzyme:

1. Instalar enzyme, los tipos para enzyme, un serializador de snapshots mejor para enzyme, y enzyme-adapter-react para la versión de react que estén usando:
`npm i enzyme @types/enzyme enzyme-to-json enzyme-adapter-react-16 -D`
2. Agreguen `"snapshotSerializers"` y `"setupTestFrameworkScriptFile"` a su `jest.config.js`:  

```js
module.exports = {
  // OTRAS SECCIONES COMO MENCIONAMOS ANTERIORMENTE

  // Setup Enzyme
  "snapshotSerializers": ["enzyme-to-json/serializer"],
  "setupTestFrameworkScriptFile": "<rootDir>/src/setupEnzyme.ts",
}
```

3. Creen un archivo `src/setupEnzyme.ts`.

```js
import { configure } from 'enzyme';
import * as EnzymeAdapter from 'enzyme-adapter-react-16';
configure({ adapter: new EnzymeAdapter() });
```

Ahora aquí hay un ejemplo de un componente de React y su prueba:

* `checkboxWithLabel.tsx`:

```ts
import * as React from 'react';

export class CheckboxWithLabel extends React.Component<{
  labelOn: string,
  labelOff: string
}, {
    isChecked: boolean
  }> {
  constructor(props) {
    super(props);
    this.state = { isChecked: false };
  }

  onChange = () => {
    this.setState({ isChecked: !this.state.isChecked });
  }

  render() {
    return (
      <label>
        <input
          type="checkbox"
          checked={this.state.isChecked}
          onChange={this.onChange}
        />
        {this.state.isChecked ? this.props.labelOn : this.props.labelOff}
      </label>
    );
  }
}

```

* `checkboxWithLabel.test.tsx`:

```ts
import * as React from 'react';
import { shallow } from 'enzyme';
import { CheckboxWithLabel } from './checkboxWithLabel';

test('CheckboxWithLabel changes the text after click', () => {
  const checkbox = shallow(<CheckboxWithLabel labelOn="On" labelOff="Off" />);
  
  // Interaction demo
  expect(checkbox.text()).toEqual('Off');
  checkbox.find('input').simulate('change');
  expect(checkbox.text()).toEqual('On');
  
  // Snapshot demo
  expect(checkbox).toMatchSnapshot();
});
```

## Motivos por los que nos gusta jest

> [Para obtener más detalles sobre estas características miren el website de jest](http://facebook.github.io/jest/)

* Una librería de aserciones incluída.
* Gran soporte para TypeScript.
* Un observador de pruebas muy confiable.
* Pruebas snapshot.
* Reportes de convertura incluídos.
* Soporte para async/await incluído.

---

## Fuente: `typescript-book/docs/tips/barrel.md`

## Barrel

A barrel is a way to rollup exports from several modules into a single convenient module. The barrel itself is a module file that re-exports selected exports of other modules.

Imagine the following class structure in a library: 

```ts
// demo/foo.ts
export class Foo {}

// demo/bar.ts
export class Bar {}

// demo/baz.ts
export class Baz {}
```

Without a barrel, a consumer would need three import statements:

```ts
import { Foo } from '../demo/foo';
import { Bar } from '../demo/bar';
import { Baz } from '../demo/baz';
```

You can instead add a barrel `demo/index.ts` containing the following: 

```ts
// demo/index.ts
export * from './foo'; // re-export all of its exports
export * from './bar'; // re-export all of its exports
export * from './baz'; // re-export all of its exports
```

Now the consumer can import what it needs from the barrel:

```ts
import { Foo, Bar, Baz } from '../demo'; // demo/index.ts is implied
```

### Named exports
Instead of exporting `*`, you can choose to export the module in a name. E.g., assume that `baz.ts` has functions:

```ts
// demo/foo.ts
export class Foo {}

// demo/bar.ts
export class Bar {}

// demo/baz.ts
export function getBaz() {}
export function setBaz() {}
```

If you would rather not export `getBaz` / `setBaz` from demo you can instead put them in a variable by importing them in a name and exporting that name as shown below: 

```ts
// demo/index.ts
export * from './foo'; // re-export all of its exports
export * from './bar'; // re-export all of its exports

import * as baz from './baz'; // import as a name
export { baz }; // export the name
```

And now the consumer would look like: 

```ts
import { Foo, Bar, baz } from '../demo'; // demo/index.ts is implied

// usage
baz.getBaz();
baz.setBaz();
// etc. ...
```

---

## Fuente: `typescript-book/docs/tips/build-toggles.md`

## Build Toggles

It is common to switch in JavaScript projects based on where they are being run. You can do this quite easily with webpack as it supports *dead code elimination* based on environment variables.

Add different targets in your `package.json` `scripts`:

```json
"build:test": "webpack -p --config ./src/webpack.config.js",
"build:prod": "webpack -p --define process.env.NODE_ENV='\"production\"' --config ./src/webpack.config.js",
```

Of course I am assuming you have `npm install webpack --save-dev`. Now you can run `npm run build:test` etc.

Using this variable is super easy as well:

```ts
/**
 * This interface makes sure we don't miss adding a property to both `prod` and `test`
 */
interface Config {
  someItem: string;
}

/**
 * We only export a single thing. The config.
 */
export let config: Config;

/**
 * `process.env.NODE_ENV` definition is driven from webpack
 *
 * The whole `else` block will be removed in the emitted JavaScript
 *  for a production build
 */
if (process.env.NODE_ENV === 'production') {
  config = {
    someItem: 'prod'
  }
  console.log('Running in prod');
} else {
  config = {
    someItem: 'test'
  }
  console.log('Running in test');
}
```

> We use `process.env.NODE_ENV` just because it is conventional in a lot of JavaScript libraries themselves e.g. `React`.

---

## Fuente: `typescript-book/docs/tips/classesAreUseful.md`

## Las clases son útiles

Es muy común tener la siguiente estructura:

```ts
function foo() {
    let someProperty;

    // Más código de inicialización

    function someMethod() {
        // hace algo con `someProperty`
        // Y potencialmente otras cosas
    }
    // Tal vez otros métodos

    return {
        someMethod,
        // Tal vez otros métodos
    };
}
```
Este patrón se llama *patrón de revelación de módulos* y es bastante común en JavaScript (aprovecha los cierres de JavaScript).

Si usan [*módulos en archivos* (lo que deberían hacer ya que el ámbito global es malo)](../project/modules.md) entonces *su archivo es el mismo*. Sin embargo, hay muchos casos en los que programadores escribirán código de la siguiente manera:

```ts
let someProperty;

function foo() {
   // Código de inicialización
}
foo(); // Código de inicialización

someProperty = 123; // Algo más de inicialización

// Una función de utilidad no exportada

// luego
export function someMethod() {

}
```

A pesar de que no somos grandes fans de la herencia *encuentramos que dejar que la gente use clases los ayuda a organizar su código mejor*. El mismo desarrollador hubiese escrito lo siguiente intuitivamente:

```ts
class Foo {
    public someProperty;

    constructor() {
        // Código de inicialización
    }

    public someMethod() {
        // algo de código
    }

    private someUtility() {
                // algo de código
    }
}

export = new Foo();
```

Y no son solo desarrolladores, las herramientas de desarrollo que proveen buenas visualizaciones de clases son mucho mas comunes, y hay un patrón menos que su equipo deberá entender y mantener.

> P.D.: No hay anda de malo, en nuestra opinión, con jerarquías *superficiales* de clases si posibilitan su reutilización y reducen la repetición.

---

## Fuente: `typescript-book/docs/tips/create-arrays.md`

## Creating arrays

Creating an empty array is super easy: 

```ts
const foo:string[] = [];
```

If you want to create an array pre-filled with some content use the ES6 `Array.prototype.fill`: 

```ts
const foo:string[] = new Array(3).fill('');
console.log(foo); // ['','',''];
```

---

## Fuente: `typescript-book/docs/tips/currying.md`

## Currificiar

Usen una cadena de funciones de flecha gorda:

```ts
// Una función currificada
let add = (x: number) => (y: number) => x + y;

// Caso de uso simple
add(123)(456);

// Aplicado parcialmente
let add123 = add(123);

// Aplicar la función en su totalidad
add123(456);
```

---

## Fuente: `typescript-book/docs/tips/defaultIsBad.md`

## `export default` es considerado dañino

Imaginen que tienen un archivo `foo.ts` con el siguiente contenido:

```ts
class Foo {
}
export default Foo;
```

Lo importarían (en `bar.ts`) usando la sintaxis de ES6 de la siguiente manera:

```ts
import Foo from "./foo";
```

Hay algunas consideraciones sobre la mantenibilidad en este caso:
* Si fueran a refactorizar `Foo` en `foo.ts`, este cambio no cambiaría el nombre en `bar.ts`
* Si terminas necesitando exportar más cosas desde `foo.ts` (algo que sucederá en muchos de sus archivos), enconces tendran que combinar múltiples sintáxis.

Por esta razón, recomendamos usar exports simples + impors desestructurados. Por ejemplo, en `foo.ts`:

```ts
export class Foo {
}
```
Seguido por:

```ts
import { Foo } from "./foo";
```

A continuación detallamos algunas más razones:

### Mala capacidad de descubrimiento
La capacidad de descubrir default exports es muy mala. No pueden explorar un módulo con intellisense para ver si tiene un default export o no.

Con export default no obtendrán nada (tal vez hace un export default / tal vez no `¯\_(ツ)_/¯`):
```
import /* acá */ from 'something';
```

Sin export default, obtendrán todo el poder de intellisense:

```
import { /* acá */ } from 'something';
```

### Autocompletar
Más alla de si saben que han exportado, el autocompletador les ofrecerá las opciones disponibles en `import {/*here*/} from "./foo";`

### CommonJS ineroperabilidad
Exportando con `default` la experiencia para usuarios de commonJS quienes tendrán que escribir `const {default} = require('module/foo');` en lugar de `const {Foo} = require('module/foo')`. Probablemente querrán cambiar el nombre del export `default` a otra cosa cuando lo importen.

### Protección contra errores de tipeo
No tendrán errores de tipeo como un desarrollador escribiendo `import Foo from "./foo"` y otro escribiendo `import foo from "./foo"`

### Auto-importación de TypeScript
Las soluciones rápidas de auto-importación funcionan mejor. Cuando escriban `Foo`, el auto importador escribirá `import { Foo } from "./foo"` ya que sabe que es un nombre definido y exportado de un módulo. Algunas herramientas intentarán de usar magia para *inferir* un nombre para un default export, pero su funcionamiento no es muy estable.

### Re-exportar
Re-exportar es una práctica común para el archivo raíz `index` en paquetes npm y los obliga a nombrar el default export manualmente. Por ejemplo, `export { default as Foo } from "./foo";` (con default) vs. `export * from "./foo"` (con exports con nombre).

### Importaciones dinámicas
Las exportaciones `default` se exponen a ser nombradas incorrectamente en `import`s dinámicos:

```
const HighChart = await import('https://code.highcharts.com/js/es-modules/masters/highcharts.src.js');
Highcharts.default.chart('container', { ... }); // Notice `.default`
```

### Necesita dos líneas para una exportacion no-clase / no-función

Puede ser una línea para funciones y clases:

```ts
export default function foo() {
}
```

Puede ser una línea para objetos *sin nombre / sin anotaciones de tipo*:

```ts
export default {
  notAFunction: 'Yeah, I am not a function or a class',
  soWhat: 'The export is now *removed* from the declaration'
};
```

Pero necesitará dos líneas en cualquier otro caso:
```ts
// Si tienes que darle un nombre (en este caso `foo`) para uso local O necesitan anotar el tipo (en este caso `Foo`)
const foo: Foo = {
  notAFunction: 'Yeah, I am not a function or a class',
  soWhat: 'The export is now *removed* from the declaration'
};
export default foo;
```

---

## Fuente: `typescript-book/docs/tips/functionParameters.md`

# Function Parameters

If you have a function that takes too many parameters, or parameters of the same type, then you might want to consider changing the function to take an object instead. 

Consider the following function:

```ts
function foo(flagA: boolean, flagB: boolean) {
  // your awesome function body 
}
```

With such a function definition it's quite easy to invoke it incorrectly e.g. `foo(flagB, flagA)` and you would get no help from the compiler. 

Instead, convert the function to take an object: 

```ts
function foo(config: {flagA: boolean, flagB: boolean}) {
  const {flagA, flagB} = config;
  // your awesome function body 
}
```
Now the function calls will look like `foo({flagA, flagB})` which makes it much easier to spot mistakes and code review.

> Note : If your function is simple enough, and you don't expect much churn, then feel free to ignore this advice 🌹.

---

## Fuente: `typescript-book/docs/tips/jquery.md`

## Pistas JQuery

Nota: necesitarán instalar el archivo `jquery.d.ts` para estas pistas

### definan un plugin de forma rápida

Creen un archivo `jquery-foo.d.ts` con:

```ts
interface JQuery {
  foo: any;
}
```

Y podrán usar `$('something').foo({whateverYouWant:'hello jquery plugin'})`

---

## Fuente: `typescript-book/docs/tips/lazyObjectLiteralInitialization.md`

## Inicialización perezosa de objetos literales

En bases de código JavaScript comúnmente se inicializan los objetos literales de la siguiente manera:

```ts
let foo = {};
foo.bar = 123;
foo.bas = "Hello World";
```

Apenas muevan su códito a TypeScript empezarán a tener errores como los siguientes:

```ts
let foo = {};
foo.bar = 123; // Error: Property 'bar' does not exist on type '{}'
foo.bas = "Hello World"; // Error: Property 'bas' does not exist on type '{}'
```

Esto se debe a que a partir del estado `let foo = {}`, TypeScript *infiere* que el tipo de `foo` (lado izquierdo de la asignación inicializante) es el tipo del lado derecho `{}` (es decir, un objeto sin propiedades). Por lo tanto, tira un error si intentan asignarle a una propiedad que TypeScript no reconoce.

### Solución ideal

La manera *apropiada* de inicializar un objeto en TypeScript es hacerlo en el momento de la asignación:

```ts
let foo = {
    bar: 123,
    bas: "Hello World",
};
```

Esto también es bueno para la revisión de código y para la mantenibilidad de la base.

> Las soluciones rápida y a medio camino mostradas en los patrones de inicialización *perezosos* que describimos a continuación sufren de *un olvido al inicializar una propiedad*.

### Solución rápida

Si tienen una base de código JavaScript grande y estan migrando a TypeScript, la solución ideal puede que no sea viable para su caso. En su lugar, pueden usar (con cuidado) una *aserción de tipo* que haga callar al compilador:

```ts
let foo = {} as any;
foo.bar = 123;
foo.bas = "Hello World";
```

### Punto medio

Claro que usar la aserción `any` puede ser una muy mala decisión ya que elimina el beneficio de la seguridad de tipos que obtienen con TypeScript. La solución de medio camino es crear una interface para asegurar:

* Buena documentación
* Asignaciones seguras

Lo mostramos a continuación:

```ts
interface Foo {
    bar: number
    bas: string
}

let foo = {} as Foo;
foo.bar = 123;
foo.bas = "Hello World";
```

Aquí hay un ejemplo corto que muestra como el hecho de usar esa interface puede llegar a salvarlos:

```ts
interface Foo {
    bar: number
    bas: string
}

let foo = {} as Foo;
foo.bar = 123;
foo.bas = "Hello World";

// más adelante en el código:
foo.bar = 'Hello Stranger'; // Error: You probably misspelled `bas` as `bar`, cannot assign string to number
```

---

## Fuente: `typescript-book/docs/tips/nominalTyping.md`

## Tipado nominal
El sistema de tipos de TypeScript es estructural [y este es uno de los principales beneficios de usarlo](../why-typescript.md). Sin embargo, hay casos de uso reales para un sistema en el que es deseable que dos variables sean diferenciadas porque tienen un *nombre de tipo* distinto, aunque sea la misma estructura. Un caso común son las estructuras de *identidad* (las cuales suelen ser strings con semánticas asociadas a sus *nombres* en lenguages como C#/Java).

Existen algunos patrones que han emergido de la comunidad. Los cubriremos en orden de preferencia personal descendiente:

## Usar tipos literales

Este patrón usa genéricos y tipos literales:

```ts
/** Generic Id type */
type Id<T extends string> = {
  type: T,
  value: string,
}

/** Tipos de Id específicos */
type FooId = Id<'foo'>;
type BarId = Id<'bar'>;

/** Opcional: funciones contructoras */
const createFoo = (value: string): FooId => ({ type: 'foo', value });
const createBar = (value: string): BarId => ({ type: 'bar', value });

let foo = createFoo('sample')
let bar = createBar('sample');

foo = bar; // Error
foo = foo; // OK
```

* Ventajas
  - No se necesitan aserciones de tipo
* Desventajas
  - La estructura `{type,value}` puede no ser deseable y necesita soporte de serialización en el servidor

## Usar Enums
[Los enums en TypeScript](../enums.md) ofrecen un cierto nivel de tipado nominal. Dos tipos enum no son iguales si difieren en el nombre. Podemos usar esta característica para proveer tipado nominal para tipos que de otra manera son estructuralmente compatibles.

Esta solución implica:
* crear un enum *marca*
* crear el tipo como la *intersección* (`&`) del enum marca + la estructura real.

Lo mostramos a continuación con un ejemplo en el que la estructura de los tipos es una string:

```ts
// FOO
enum FooIdBrand {}
type FooId = FooIdBrand & string;

// BAR
enum BarIdBrand {}
type BarId = BarIdBrand & string;

/**
 * Demo de uso
 */
var fooId: FooId;
var barId: BarId;

// Seguridad!
fooId = barId; // error
barId = fooId; // error

// Renovando
fooId = 'foo' as FooId;
barId = 'bar' as BarId;

// Ambos tipos son compatibles con la base
var str: string;
str = fooId;
str = barId;
```

## Usar Interfaces

Debido a que los `números` son compatibles con los `enum`s, la técnica anterior no puede ser usada para ellos. En su lugar, podemos usar interfaces para romper la compatibilidad estructural. Este método es usado por el equipo que trabaja sobre el compilador de TypeScript, por lo que vale la pena mencionarlo. Usar el prefijo `_` y un sufijo `Brand` es una convención que recomendamos seguir (y [la que sigue el equipo de TypeScript](https://github.com/Microsoft/TypeScript/blob/7b48a182c05ea4dea81bab73ecbbe9e013a79e99/src/compiler/types.ts#L693-L698)).

La solución implica:
* agregar una propiedad no utilizada en un tipo para romper la compatibilidad estructural
* usar una aserción de tipo cuando se necesita renovar o abatir

Lo mostramos a continuaci'on:

```ts
// FOO
interface FooId extends String {
    _fooIdBrand: string; // Para prevenir errores de tipo
}

// BAR
interface BarId extends String {
    _barIdBrand: string; // Para prevenir errores de tipo
}

/**
 * Demo de uso
 */
var fooId: FooId;
var barId: BarId;

// Seguridad!
fooId = barId; // error
barId = fooId; // error
fooId = <FooId>barId; // error
barId = <BarId>fooId; // error

// Renovar
fooId = 'foo' as any;
barId = 'bar' as any;

// Si necesitan la string base
var str: string;
str = fooId as any;
str = barId as any;
```

---

## Fuente: `typescript-book/docs/tips/outFile.md`

# `--outFile` is BAD {#outFile}

Its a bad idea for you to use because of the following reasons:

* Runtime Errors
* Fast compile
* Global scope
* Hard to analyze
* Hard to scale
* `_references`
* Code reuse
* Multiple Targets
* Isolated Compile

## Runtime Errors

If your code depends on any form of js ordering you will get random errors at runtime.

* **class inheritance can break at runtime.**

Consider `foo.ts`: 
```ts
class Foo {
    
}
```

and a `bar.ts`:
```ts
class Bar extends Foo {
    
}
```

If you fail to compile it in correct order e.g. perhaps alphabetically `tsc bar.ts foo.ts` the code will compile fine but error at runtime with `ReferenceError`. 

* **module splitting can fail at runtime.**

Consider `foo.ts`: 
```ts
module App {
    export var foo = 123;
}
```
And `bar.ts`: 
```ts
module App {
    export var bar = foo + 456;
}
```

If you fail to compile it in correct order e.g. perhaps alphabetically `tsc bar.ts foo.ts` the code will compile fine but  *silently* fail at runtime with `bar` set to `NaN`. 

## Fast compile
If you use `--out` then single `.ts` files cannot be codegened into single `.js` files in isolation without unnecessary hacks. `--out` essentially forces a slower incremental build.

Also source maps are positionally sensitive and run-length encoded so most of the map has to be rebuilt on a recompile if you use source maps (which you should!). At high-10s to 100s kloc combined it’s going to get slow.

## Global Scope
Sure you can use name spaces but its still on `window` if you run it in the browser. Namespaces are just an unnecessary workaround. Also `/// <reference` comments introduce a global context in *your code* that can get hard to maintain.

Also if your company has several teams working independently and then someone decides to try integrating two independently written apps there is a high likelihood of a name conflict.

## Hard to analyze
We wish to provide more code analysis tools. These will be easier if you provide us with the dependency chain (implicitly there on a silver platter using external modules). 

Also its not just the *dev tools* that have a hard time making sense of the code. The next human needs to understand a lot of the code base before they start to understand where stuff is actually imported from. Using internal modules also makes code difficult to review in isolation e.g. on github.

## Hard to scale
Really just a result of random runtime errors + slower and slower compile times + difficulty in understanding someone else's code.

## `_references.ts`
Isn't supported by `tsconfig.json` : https://github.com/Microsoft/TypeScript/issues/2472#issuecomment-85330803 You'll have to manually sort the  `files` array. 

## Code reuse
If you want to reuse a portion of your code in another project, with all that *implicit* dependency management, it will be difficult to port it over without potential runtime errors. 

## Multiple Targets
Also if you decide to reuse your browser code in something like nodejs (e.g. for *testing* APIs) you are going to need to port it over to a module system or come up with ugly hacks to make the nodejs `global` your new global scope (i.e. `window`).

## Isolated Compile
Files cannot be compiled in isolation. E.g. consider `a.ts`: 
```ts
module M {
  var s = t;
}
```
Will have different output depending upon whether there is a `b.ts` of the form: 
```ts
module M {
  export var t = 5;
}
```
or 
```ts
var t = 5;
```
So `a.ts` [cannot be compiled in isolation](https://github.com/Microsoft/TypeScript/issues/2715).

## Summary
`--out` is really the job of some build tool. And even such a build tool can benefit from the dependency mentions provided by external modules. So we recommend you use external modules and then let the build tool create a single `.js` for you if you so desire.

https://twitter.com/nycdotnet/status/613705850574778368 

![The Bas Signal](https://pbs.twimg.com/media/CIRSOBmWsAQdzvP.jpg)

---

## Fuente: `typescript-book/docs/tips/propertySetters.md`

## Limiten el uso de setters de propiedades

Prefieran usar funciones set/get explícitas (e.g. `setBar` y `getBar`) por sobre setters/getters.

Consideren el siguiente código:

```ts
foo.bar = {
    a: 123,
    b: 456
};
```

En la presencia de setters/getters:

```ts
class Foo {
    a: number;
    b: number;
    set bar(value:{a:number,b:number}) {
        this.a = value.a;
        this.b = value.b;
    }
}
let foo = new Foo();
```

Este no es un *buen* uso de setters de propiedades. La persona que lea la primera muestra de código no tiene nada de contexto sobre todas las cosas que cambiarán. Por otro lado, alquien que llama a `foo.setBar(value)` puede tener una idea que algo cambiará en `foo`.

> Puntos bonus: Encontramos que las referencias funcionan mejor si tienen funciones diferentes. En las herramientas de TypeScript, si encuentran referencias para un getter o un setter, obtendrán *ambas* mientras que con llamadas explícitas a funciones solo obtendrán la referencias a la función relevante.

---

## Fuente: `typescript-book/docs/tips/singleton.md`

# Singleton Pattern

The conventional singleton pattern is really something that is used to overcome the fact that all code must be in a `class`.

```ts
class Singleton {
    private static instance: Singleton;
    private constructor() {
        // do something construct...
    }
    static getInstance() {
        if (!Singleton.instance) {
            Singleton.instance = new Singleton();
            // ... any one time initialization goes here ...
        }
        return Singleton.instance;
    }
    someMethod() { }
}

let something = new Singleton() // Error: constructor of 'Singleton' is private.

let instance = Singleton.getInstance() // do something with the instance...
```

However, if you don't want lazy initialization you can instead just use a `namespace`: 

```ts
namespace Singleton {
    // ... any one time initialization goes here ...
    export function someMethod() { }
}
// Usage
Singleton.someMethod();
```

> Warning : Singleton is just a fancy name for [global](http://stackoverflow.com/a/142450/390330)

For most projects `namespace` can additionally be replaced by a *module*.

```ts
// someFile.ts
// ... any one time initialization goes here ...
export function someMethod() { }

// Usage
import {someMethod} from "./someFile";
```

---

## Fuente: `typescript-book/docs/tips/statefulFunctions.md`

## Funciones con estado
Una característica común de otros lenguajes de programación es el uso de la palabra clave `static` para incrementar el *tiempo de vida* (no el *ámbito*) de una variable de función para que viva por fuera de invocaciones de la función. Aquí mostramos un ejemplo `C` que hace uso de esta característica:

```c
void called() {
    static count = 0;
    count++;
    printf("Called : %d", count);
}

int main () {
    called(); // Called : 1
    called(); // Called : 2
    return 0;
}
```

Debido a que JavaScript (o TypeScript) no tienen funciones estáticas, esto puede ser logrado usando varias abstracciones que envuelven una variable local. Por ejemplo, usando una `clase`:

```ts
const {called} = new class {
    count = 0;
    called = () => {
        this.count++;
        console.log(`Called : ${this.count}`);
    }
};

called(); // Called : 1
called(); // Called : 2
```

> Los desarrolladores C++ también intentan lograr esto usando un patrón llamado `functor` (una clase que anula el operador `()`).

---

## Fuente: `typescript-book/docs/tips/staticConstructor.md`

# Constructores Estáticos en TypeScript

Las `clases` de TypeScript (como las `clases` de JavaScript) no pueden tener un constructor estático. Sin embargo, pueden obtener el mismo efecto fácilmente al llamarlo ustedes mismos:

```ts
class MyClass {
    static initialize() {
        // Inicialización
    }
}
MyClass.initialize();
```

---

## Fuente: `typescript-book/docs/tips/stringEnums.md`

## String enums

A veces necesitarán un conjunto de strings agrupadas bajo una clave en común. Antes de TypeScript 2.4, TypeScript solo soportaba enums basadas en números. Si estan usando una versión anterior a 2.4, una forma de resolver este problema es [usar tipos string literales para crear enums basadas en strings combinándolas con tipos unión](../types/literal-types.md).

---

## Fuente: `typescript-book/docs/tips/typeInstantiation.md`

## Instanciación de Tipos para Genéricos

Hagan de cuenta que tienen algo que tiene un parámetro genérico. Por ejemplo, una clase `Foo`:

```ts
class Foo<T>{
	foo: T;
}
```

Quieren crearle una versión especializada para un tipo en particular. El patrón consiste en copiar el item a una variable nueva y darle la anotación de tipo reemplazando los genéricos por tipos concretos. Por ejemplo, si quieren una clase `Foo<number>`:

```ts
class Foo<T>{
	foo: T;
}
let FooNumber = Foo as { new ():Foo<number> }; // ref 1
```
En `ref1` están indicando que `FooNumber` es lo mismo que `Foo`, pero que debe ser tratada como algo que cuando es llamada con el operador `new` dará una instancia de `Foo<number>`.

### Herencia
El patrón de aserción de tipos es inseguro ya que confía en que ustedes harán lo correcto. Un patrón común en otros lenguajes (*en lo que respecta a clases*) es usar la herencia:

```ts
class FooNumber extends Foo<number>{}
```

Una advertencia: si usan decoradores en la clase base, entonces la clase heredada puede no comportarse de la misma manera que la clase base (ya que no se encontrará envuelta por el decorador). 

Si no están especializando las clases, igual tendrán que pensar un patrón de coerción / aserción que funcione. De ahí que hemos mostrado el patrón de aserción general primero. Por ejemplo:

```ts
function id<T>(x: T) { return x; }
const idNum = id as {(x:number):number};
```

> Inspirirado por esta [pregunta de stackoverflow](http://stackoverflow.com/a/34864705/390330)

---

## Fuente: `typescript-book/docs/tips/typed-event.md`

## Typesafe Event Emitter

Conventionally in Node.js and traditional JavaScript you have a single event emitter. This event emitter internally tracks listener for different event types e.g. 

```ts
const emitter = new EventEmitter();
// Emit: 
emitter.emit('foo', foo);
emitter.emit('bar', bar);
// Listen: 
emitter.on('foo', (foo)=>console.log(foo));
emitter.on('bar', (bar)=>console.log(bar));
```
Essentially `EventEmitter` internally stores data in the form of mapped arrays: 
```ts
{foo: [fooListeners], bar: [barListeners]}
```
Instead, for the sake of *event* type safety, you can create an emitter *per* event type:
```ts
const onFoo = new TypedEvent<Foo>();
const onBar = new TypedEvent<Bar>();

// Emit: 
onFoo.emit(foo);
onBar.emit(bar);
// Listen: 
onFoo.on((foo)=>console.log(foo));
onBar.on((bar)=>console.log(bar));
```

This has the following advantages: 
* The types of events are easily discoverable as variables.
* The event emitter variables are easily refactored independently.
* Type safety for event data structures.

### Reference TypedEvent
```ts
export interface Listener<T> {
  (event: T): any;
}

export interface Disposable {
  dispose();
}

/** passes through events as they happen. You will not get events from before you start listening */
export class TypedEvent<T> {
  private listeners: Listener<T>[] = [];
  private listenersOncer: Listener<T>[] = [];

  on = (listener: Listener<T>): Disposable => {
    this.listeners.push(listener);
    return {
      dispose: () => this.off(listener)
    };
  }

  once = (listener: Listener<T>): void => {
    this.listenersOncer.push(listener);
  }

  off = (listener: Listener<T>) => {
    var callbackIndex = this.listeners.indexOf(listener);
    if (callbackIndex > -1) this.listeners.splice(callbackIndex, 1);
  }

  emit = (event: T) => {
    /** Update any general listeners */
    this.listeners.forEach((listener) => listener(event));

    /** Clear the `once` queue */
    this.listenersOncer.forEach((listener) => listener(event));
    this.listenersOncer = [];
  }

  pipe = (te: TypedEvent<T>): Disposable => {
    return this.on((e) => te.emit(e));
  }
}
```

---

## Fuente: `typescript-book/docs/tools/changelog.md`

## Changelog 
> Leer un archivo markdown con el progreso en el proyecto es más fácil que leer un registro de commits.

La generación automática de regitros de cambios a partir de mensaje sde commits es un patrón bastante común actualmente. Hay un proyecto llamado [conventional-changelog](https://github.com/conventional-changelog/conventional-changelog) que genera un registro de cambios a partir de mensajes de commits siguiendo una *convención*. 

### Convención de mensajes de commits
La convención más popular es la de *angular*, que se encuentra [detallada aquí (https://github.com/angular/angular.js/blob/master/DEVELOPERS.md#-git-commit-guidelines).

### Configuración
* Instalar: 

```bash
npm install standard-version -D
```

* Agreguen una `serie de comandos` target a su `package.json`: 

```js
{
  "scripts": {
    "release": "standard-version"
  }
}
```

* Opcional: Para empujar el nuevo *git commit y tag* automáticamente y publicarlo a npm agreguen una serie de comandos `postrelease`:

```js
{
  "scripts": {
    "release": "standard-version",
    "postrelease": "git push --follow-tags origin master && npm publish"
  }
}
```

### Publicación 

Corran: 

```bash
npm run release
```

El tipo de publicación `major` | `minor` | `patch` se determina automáticamente. Para especificar una versión *explícitamente* deben usar la bandera `--release-as`. Por ejemplo:

```bash
npm run release -- --release-as minor
```

---

## Fuente: `typescript-book/docs/tools/eslint.md`

# ESLint

ESLint existed to lint JavaScript, but now it is also becoming the defacto linter for [TypeScript](https://github.com/Microsoft/TypeScript/issues/29288), thanks to the [collaboration](https://eslint.org/blog/2019/01/future-typescript-eslint) between the two teams.

## Install

To setup ESLint for TypeScript you need the following packages:

```sh
npm i eslint eslint-plugin-react @typescript-eslint/parser @typescript-eslint/eslint-plugin
```

> TIP: eslint calls packages that contain lint rules as "plugin"

* eslint : Core eslint 
* eslint-plugin-react : For react rules provided by eslint. [Supported rules list](https://github.com/yannickcr/eslint-plugin-react#list-of-supported-rules)
* @typescript-eslint/parse : To allow eslint to understand ts / tsx files 
* @typescript-eslint/eslint-plugin : For TypeScript rules. [Supported rules list](https://github.com/typescript-eslint/typescript-eslint/tree/master/packages/eslint-plugin#supported-rules)

> As you can see there are two eslint packages (for use with js or ts) and two @typescript-eslint packages (for use with ts). So the overhead for TypeScript is not *that much*.

## Configure 
Create `.eslintrc.js`: 

```js
module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
  },
  plugins: ['@typescript-eslint'],
  extends: [
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  rules:  {
    // Overwrite rules specified from the extended configs e.g. 
    // "@typescript-eslint/explicit-function-return-type": "off",
  }
}
```

## Run

In your `package.json` add to `scripts`: 

```json
{
  "scripts": {
    "lint": "eslint src/**"
  }
}
```

Now you can `npm run lint` to validate.

## Configure VSCode 

* Install extension https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint
* Add to `settings.json`:
```js
"eslint.validate":  [
  "javascript",
  "javascriptreact",
  {"language":  "typescript",  "autoFix":  true  },
  {"language":  "typescriptreact",  "autoFix":  true  }
],
```

---

## Fuente: `typescript-book/docs/tools/husky.md`

# Husky 

> Husky puede prevenir commits malos, pushes y más 🐶!

Si quieren correr código JavaScript / TypeSCript antes de que un commit ocurra, husky es la herramienta indicada.

Por ejemplo, pueden usar husky para asegurarse que los archivos sean formateados automáticamente por prettier para que no tengan que preocuparse de hacerlo manualmente nunca más, y así concentrarse únicamente en el código. Aquí esta la configuración:

* `npm install husky -D`
* Agregar las `series de comandos` a `package.json`: 

```
    "precommit": "npm run prettier:write",
```

Ahora cada vez que commitan código y hayan correcciones de formato para hacer, las recibirán como un archivo *modificado* en el registro de git. Esto les permitirá

* si ya han empujado su código a remote, pueden hacer un commit nuevo con un comentario `pretty`.
* si todavia no han empujado su código, corrijan su último commit y parezcan un superhéroe.

---

## Fuente: `typescript-book/docs/tools/prettier.md`

# Prettier 

Prettier es una gran herramienta desarrollada por Facebook que facilita tanto el proceso de formateo de código que amerita mencionarla. Incluirla en un proyecto TypeScript usando nuestra preparación de proyectos recomendada (es decir, todo en la carpeta `src`) es súper fácil:

## Preparación 

* `npm install prettier -D` 
* Agregar `series de comandos` a `package.json`: 

```
    "prettier:base": "prettier --parser typescript --single-quote",
    "prettier:check": "npm run prettier:base -- --list-different \"src/**/*.{ts,tsx}\"",
    "prettier:write": "npm run prettier:base -- --write \"src/**/*.{ts,tsx}\""
```

## Uso
En el servidor de construcción:
* `npm run prettier:check` 

Durante desarrollo (o como enganche de pre commit):
* `npm run prettier:write`

---

## Fuente: `typescript-book/docs/types/@types.md`

# `@types`

[Definitely Typed](https://github.com/DefinitelyTyped/DefinitelyTyped) es una de las fortalezas más grandes de TypeScript. La comunidad ha procedido a **documentar** la naturaleza de casi 90% de los proyectos JavaScript más populares.

Esto significa que pueden usar estos proyectos de manera interactiva y exploratoria, sin necesidad de tener la documentación abierta en una ventana separada y asegurandose que no cometen un error de tipeo.

## Usando `@types`

La instalación es sencilla ya que funciona sobre `npm`. A modo de ejemplo, pueden instalar definciones de tipo para `jquery` simplemente con:

```
npm install @types/jquery --save-dev
```

`@types` soporta definiciones de tipo tanto *globales* como *modulares*.


### `@types` globales

Por default, caulquier definición que soporte consumisión global se encuentra incluída automáticamente. Por ejemplo, para `jquery` deberían poder comenzar a usar `$` *globalmente* en su proyecto sin problema.

Sin embargo, para *librerías* (como `jquery`) en general recomendamos usar *módulos*: 

### `@types` modulares

Luego de la instalación, no es necesario realizar ninguna configuración especial. Simplemente utilizarlo como un módulo. Por ejemplo:

```ts
import * as $ from "jquery";

// Usen $ como deseen en este módulo :)
```

## Controlando globales

Como pueden observar, tener una definicón que permite acceso gloabl automáticamente puede ser un problema para algunos equipos. Por eso, pueden elegir 

As can be seen, having a definition that allows global leak-in automatically can be a problem for some teams. Por lo tanto, puede elegir * explícitamente * solo incorporar los tipos que tienen sentido usando las `compilerOption.types` de  `tsconfig.json`. Por ejemplo:

```json
{
    "compilerOptions": {
        "types" : [
            "jquery"
        ]
    }
}
```

Este es un ejemplo en el que solo `jquery` tendrá permitido su uso. Incluso si una persona instala otra definición con `npm install @types/node` sus globales (e.g. [`process`](https://nodejs.org/api/process.html)) no aparecerán en tu código hasta que las agreguen a la opción de tipos de `tsconfig.json`.

---

## Fuente: `typescript-book/docs/types/advanced.md`

# Functions

## Optional
The `?` annotation can be used before a function argument or member of an interface to denote that a member is optional. That is to say that you can provide it if you want (and it will be type checked), but if it is ommited its *okay*. This is shown in the following example:

## Specialized Parameters

## Function Overloads
The JavaScript runtime does not have runtime support for function overloading. There can be only a single function body for any given name in scope. However, people do support function overloading by utilizing the highly dynamic nature of JavaScript e.g. a getter and a setter:

```ts
var _value;
function getOrSet(value) {
    if (value === undefined) {
        return _value;
    } else {
        _value = value;
    }
}

getOrSet(1); // set : 1
console.log(getOrSet()); // get : 1
```

Such implementation can be captured by the TypeScript's type system by providing function signatures before the function implementation:

```ts
var _value;
function getOrSet(): number;
function getOrSet(value: number);
function getOrSet(value?: number) {
    if (value === undefined) {
        return _value;
    } else {
        _value = value;
    }
}

getOrSet(1); // set : 1
console.log(getOrSet()); // get : 1
```

Note that when you define function overloads this way, *the last signature is actually not callable*. You have to provide it however, to help the implementer of the function be aware of the consequences of his overload signatures. For example, in the following example the function with the signature `function callMe(v1?: any, v2?: any): any` is not open to public use:

```ts
function callMe(): number;
function callMe(v1: number);
function callMe(v1: string, v2: number);
function callMe(v1?: any, v2?: any): any {
    // Implementation body goes here
}

// Allowed calls
callMe();
callMe(1);
callMe('jenny', 5309);

// COMPILER ERROR: invalid calls
callMe('jenny');
callMe('jenny', '5309');
```

TIP: Note that there is a slight overlap between union types and function overloading. If two function signatures only differ by a single parameter having different types just use a union type for that parameter instead of creating an overload signature.


# Interfaces

Interfaces have a lot of power in TypeScript. This is because they are designed to capture all the complexity of




# Ambient Declarations

We previously had a brief look at ambient declarations in the section *why typescript?*. One of the core design goals of TypeScript is to allow easy consumption of existing JavaScript libraries. You can declare the type information for existing JavaScript using *ambient declarations*. You declare ambient stuff using the `declare` keyword. In fact this is how a bunch of stuff available by default in a browser environment (e.g `window`, `document` etc) is declared in a file called `lib.d.ts`


Note: You can find type definitions for nearly 90% of the most popular JavaScript libraries at [DefinitelyTyped](https://github.com/borisyankov/DefinitelyTyped) with contributions from [lots of  developers](https://github.com/borisyankov/DefinitelyTyped/graphs/contributors).



### lib.d.ts

# Interfaces



### Interfaces for primitive types

### Interface for array

## Type Alias

## Union Types
needed for configuration objects

## Type Inference
It tries to *infer* as much as it can *so that you don't need to explicitly type* your code.

## Function Signatures

Specialized

## Type Assertion

If A is a subtype of B or B is a subtype of A.








[more on interfaces]
Structural so more information is okay, but less information is an error. Duck typing is baked deep into the language design.
Open Ended
Type Compatibility

---

## Fuente: `typescript-book/docs/types/ambient/d.ts.md`

### Archivo de declaración
Pueden decirle a TypeScript que estan tratando de describir código que existe en otro lado (por ejemplo, escrito JavaScript/CoffeeScript/en un ambiente de ejecución como el navegador o Node.js) usando la palabra clave `declare`. A modo de ejemplo rápido:

```ts
foo = 123; // Error: `foo` no está definido
```
vs.
```ts
declare var foo: any;
foo = 123; // permitido
```

Tienen la opción de poner estas declaraciones en un archivo `.ts` o en un archivo `.d.ts`. Nosotros recomendamos que en sus proyectos reales usen un `d.ts` separado. Comiencen con un archivo llamado `globals.d.ts` o `vendor.d.ts`, o algo similar.

Si un archivo tiene la extensión `.d.ts`, etnonces cada definición a nivel raíz debe tener la palabra clave `declare` precediéndola. Esto ayuda a clarificarle al autor que *no habrá código emitido por TypeScript*. El autor debe asegurarse que el ítem declarado existirá al momento de ejecución.

> * Las declaraciones ambiente son una promesa que estan haciendo con el compilador. Si estas no existen en el momento de ejecución y ustedes intentan utilizarlas, las cosas se romperan sin advertencia previa.
* Las declaraciones ambiente son como documentación. Si la fuente cambia, la documentación debe ser actualizada. Por lo que tal vez tengan nuevos comportamientos que funcionan en tiempo de ejecución pero nadie actualizó las declaraciones de ambiente y, por ende, recibirián errores de compilación.

---

## Fuente: `typescript-book/docs/types/ambient/intro.md`

## Declaraciones Ambiente

Como mencioneamos en [Por qué TypeScript](../../why-typescript.md):

> Uno de los objetivos de diseño principales de TypeScript era posibilitar que usen librerias JavaScript existentes de forma segura y fácilmente en TypeScript. TypeScript hace esto mediante las *declaraciones*.

Las declaraciones de Ambiente les permite *usar librerías JavaScript populares de forma segura* y *migrar sus proyectos escritos con código JavaScript/CoffeeScript/Otro-Lenguage-Que-Compila-A-Js a TypeScript*.

Estudiar los patrones en declaraciones ambientes para *código JavaScript escrito por terceros* es una buena práctica para anotar *su propio código* también. Por esto lo presentamos al comienzo.

---

## Fuente: `typescript-book/docs/types/ambient/variables.md`

### Variables
Para contarle a TypeScript sobre la [variable `process`](https://nodejs.org/api/process.html), por ejemplo, *pueden*:

```ts
declare var process: any;
```

> No *necesitan* hacer esto para `process` ya que ya existe un [`node.d.ts` mantenido por la comunidad(https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/node/index.d.ts).

Esto les permitirá usar la variable `process` sin que TypeScript se queje:

```ts
process.exit();
```

Recomendamos usar una interface en donde sea posible. Por ejemplo:

```ts
interface Process {
    exit(code?: number): void;
}
declare var process: Process;
```

Esto le permite a otras personas *extender* la naturaleza de estas variables globales y mantener a TypeScript informado sobre los cambios. Por ejemplo, consideremos el siguiente caso donde agregamos una función `exitWithLogging` a `process` para nuestro entretenimiento:

```ts
interface Process {
    exitWithLogging(code?: number): void;
}
process.exitWithLogging = function() {
    console.log("exiting");
    process.exit.apply(process, arguments);
};
```

Procedamos a mirar las interfaces con mayor nivel de detalle.

---

## Fuente: `typescript-book/docs/types/callable.md`

## Llamables
Pueden anotar llamables como parte de un tipo o de una interface de la siguiente manera:

```ts
interface ReturnString {
  (): string
}
```
Una instnacia de esta interface sería una función que devuelve una string, por ejemplo:

```ts
declare const foo: ReturnString;
const bar = foo(); // bar se infirere como string
```

### Ejemplos obvios
Por supuesto que una anotación a una *llamable* también puede especificar cualquier argumento / argumento opcional / resto de argumentos como sea necesario. Por ejemplo, aquí hay un caso más complejo:

```ts
interface Complex {
  (foo: string, bar?: number, ...others: boolean[]): number;
}
```

Una interface puede proveer muchas anotaciones a llamables para especificar la sobrecarga de funciones. Por ejemplo: 

```ts
interface Overloaded {
    (foo: string): string
    (foo: number): number
}

// implementación del ejemplo
function stringOrNumber(foo: number): number;
function stringOrNumber(foo: string): string;
function stringOrNumber(foo: any): any {
    if (typeof foo === 'number') {
        return foo * foo;
    } else if (typeof foo === 'string') {
        return `hello ${foo}`;
    }
}

const overloaded: Overloaded = stringOrNumber;

// uso del ejemplo
const str = overloaded(''); // el tipo de `str` se infiere como `string`.
const num = overloaded(123); // el tipo de `num` se infiere como `num`
```

Claro, como el cuerpo de *cualquier* interface, pueden usar el cuerpo de una interface llamable como un tipo de anotación para una variable. Por ejemplo:

```ts
const overloaded: {
  (foo: string): string
  (foo: number): number
} = (foo: any) => foo;
```

### Sintaxis de flecha
Para simplificar la declaración de firmas de llamables, TypeScript también permite la anotación de flecha. Por ejemplo, una función que acepta un `number` y devuelve una `string` puede ser anotada como:

```ts
const simple: (foo: number) => string
    = (foo) => foo.toString();
```

> La única limitación de la sintaxis de flecha: no pueden especificar sobrecargas. Para sobrecargas deben utiliar la sintaxis de cuerpo completo `{ (someArgs): someReturn }`.

### Newable

*Newable* es un tipo especial de anotación de tipo de *llamables* con el prefijo `new`. Simplemente significa que deberan *invocarla* con `new`:

```ts
interface CallMeWithNewToGetString {
  new(): string
}
// Uso
declare const Foo: CallMeWithNewToGetString;
const bar = new Foo(); // bar es inferida del tipo string
```

---

## Fuente: `typescript-book/docs/types/discriminated-unions.md`

### Uniones discriminadas

Si tuvieras una clase con un [*miembro literal*](./literal-types.md) entonces pueden usar esa propiedad para discriminar entre miembros de uniones.

A modo de ejemplo, consideren la union de un `Square` y un `Rectangle`. Aquí tenemos un miembro `kind` que existe en ambos miembros de la unión y es de un *tipo literal* particular:

```ts
interface Square {
    kind: "square";
    size: number;
}

interface Rectangle {
    kind: "rectangle";
    width: number;
    height: number;
}
type Shape = Square | Rectangle;
```

Si usas un control de estilo de guardias de tipo (`==`, `===`, `!=`, `!==`) o `switch` en la *propiedad discriminante* (aquí `kind`) TypeScript se dará cuenta que el objeto debe ser del tipo que tien ese literal específico y hará una reducción de tipos por ustedes :)

```ts
function area(s: Shape) {
    if (s.kind === "square") {
        // Ahora TypeScript *sabe* que `s` debe ser un Square ;)
        // Por lo que pueden usar sus miembros de manera segura :)
        return s.size * s.size;
    }
    else {
        // No era un Square? Entonces TypeScript se dará cuenta que debe ser un Rectanble ;)
        // Por lo que pueden usar sus miembros de manera segura :)
        return s.width * s.height;
    }
}
```

### Controles exhaustivos
Comúnmente querrán asegurarse que todos los miembros de una unión tienen algún código (acción) en su contra.

```ts
interface Square {
    kind: "square";
    size: number;
}

interface Rectangle {
    kind: "rectangle";
    width: number;
    height: number;
}

// Alguien recién agregó este nuevo tipo `Circle`
// Queremos que TypeScript de un error en cualquier lugar que *necesite* atender a esto
interface Circle {
    kind: "circle";
    radius: number;
}

type Shape = Square | Rectangle | Circle;
```

A modo de ejemplo sobre dónde las cosas salen mal:

```ts
function area(s: Shape) {
    if (s.kind === "square") {
        return s.size * s.size;
    }
    else if (s.kind === "rectangle") {
        return s.width * s.height;
    }
    // No sería genial si pudieramos lograr que TypeScript nos de un error?
}
```

Puedes hacerlo simplemente agregando una caída y asegurándose que el tipo inferido en ese bloque sea compatible con el tipo `never`. Por ejemplo, sia gregan el chequeo exhaustivo recibirán un lindo error:

```ts
function area(s: Shape) {
    if (s.kind === "square") {
        return s.size * s.size;
    }
    else if (s.kind === "rectangle") {
        return s.width * s.height;
    }
    else {
        // ERROR : `Circle` is not assignable to `never`
        const _exhaustiveCheck: never = s;
    }
}
```

Esto los obligará a cubrir el nuevo caso: 

```ts
function area(s: Shape) {
    if (s.kind === "square") {
        return s.size * s.size;
    }
    else if (s.kind === "rectangle") {
        return s.width * s.height;
    }
    else if (s.kind === "circle") {
        return Math.PI * (s.radius **2);
    }
    else {
        // OK de nuevo
        const _exhaustiveCheck: never = s;
    }
}
```


### Switch
PISTA: por supuesto, también pueden hacerlo en una declaración `switch`:

```ts
function area(s: Shape) {
    switch (s.kind) {
        case "square": return s.size * s.size;
        case "rectangle": return s.width * s.height;
        case "circle": return Math.PI * s.radius * s.radius;
        default: const _exhaustiveCheck: never = s;
    }
}
```

### strictNullChecks

Si están usando strictNullChecks y haciendo controles exhaustivos, TypeScript tal vez se quejará que "no todos los caminos del código devuelven un valor". Pueden silenciar esto devolviendo la variable `_exhaustiveCheck` (de tipo `never`). Entonces:

```ts
function area(s: Shape) {
    switch (s.kind) {
        case "square": return s.size * s.size;
        case "rectangle": return s.width * s.height;
        case "circle": return Math.PI * s.radius * s.radius;
        default:
          const _exhaustiveCheck: never = s;
          return _exhaustiveCheck;
    }
}
```

### Redux

Una librería popular que hace uso de esto es redux.

Aquí está [*la esencia de redux*(https://github.com/reactjs/redux#the-gist) con anotación de tipo de TypeScript:

```ts
import { createStore } from 'redux'

type Action
  = {
    type: 'INCREMENT'
  }
  | {
    type: 'DECREMENT'
  }

/**
 * Este es un *reducer*, una función pura con firma (state, action) => state.
 * Describe como una acción transforma el *state* actual al siguiente *state*.
 * 
 *
 * La forma del estado depende de ustedes: puede ser un primitivo, un array, un objeto 
 * o incluso una estructura de datos de Immutable.js. La única parte importante es que
 * no deben mutar el objeto state, sino devolver un nuevo objeto si el state cambia.
 * 
 * En este ejemplo, usamos una declaración `switch` y strings, pero pueden usar un ayudante
 * que siga una definción diferente (como funciones mapa) si tiene más sentido para sus
 * proyectos.
 */
function counter(state = 0, action: Action) {
  switch (action.type) {
  case 'INCREMENT':
    return state + 1
  case 'DECREMENT':
    return state - 1
  default:
    return state
  }
}

// Creen un *store* de Redux que guarde el estado de su aplicación.
// La API es { subscribe, dispatch, getState }.
let store = createStore(counter)

// Pueden usar subscripe() para actualizar la UI en respuesta a los cambios de estado.
// Normalmente usarían una librería de conexión (ejemplo, React-redux) en lugar de subscribirse directamente.
// Sin embargo, también es conveniente persistir el estado actual en el localStorage.

store.subscribe(() =>
  console.log(store.getState())
)

// La única manera de mutar el estado interno es despachar una acción.
// Las acciones pueden ser serializadas, registradas o guardadas y luego repetidas.
store.dispatch({ type: 'INCREMENT' })
// 1
store.dispatch({ type: 'INCREMENT' })
// 2
store.dispatch({ type: 'DECREMENT' })
// 1
```

Usarla con TypeScript les dará seguridad contra errores de tipeo, una mayor habilidad de refactorizar y código que auto-documentado.

---

## Fuente: `typescript-book/docs/types/exceptions.md`

# Manejo de excepciones

JavaScript tiene una clase `Error` que pueden usar para excepciones. Pueden tirar un error con la palabra clave `throw`. Pueden atraparlo con un bloque `try` / `catch`. Por ejemplo:

```js
try {
  throw new Error('Algo malo pasó!');
}
catch(e) {
  console.log(e);
}
```

## Sub tipos de Error

Más allá de la clase incluída `Error`hay algunas clases de error incluídas que heredan del `Error` que el tiempo de ejecución de JavaScript puede tirar:

### RangeError

Crea una instancia representado un error que ocurre cuando una variable o parámetro numérico se encuentra fuera de su rango válido.

```js
// Llamen a console con demasiados argumentos
console.log.apply(console, new Array(1000000000)); // RangeError: Invalid array length
```

### ReferenceError

Crea una instancia representand oun error que ocurre cuando desreferimos una referencia inválida:

```js
'use strict';
console.log(notValidVar); // ReferenceError: notValidVar is not defined
```

### SyntaxError

Crea una instancia representando un error sintáctico que ocurre al analizar código que no es JavaScript válido.

```js
1***3; // SyntaxError: Unexpected token *
```

### TypeError

Crea una instancia representando un error que ocurre cuando una variable o parámetro no es de tipo válido.

```js
('1.2').toPrecision(1); // TypeError: '1.2'.toPrecision is not a function
```

### URIError

Crea una instancia representando un error que ocurre cuando `encodeURI()` o `decodeURI()` reciben parámetros inválidos.

```js
decodeURI('%'); // URIError: URI malformed
```

## Siempre usen `Error`

Muchos desarrolladores JavaScript principantes a veces tiran strings puras:

```js
try {
  throw 'Algo malo pasó!';
}
catch(e) {
  console.log(e);
}
```

*No hagan eso*. El beneficio fundamental del objeto `Error` es que mantienen un registro de donde fueron construidos y originados con la propiedad `stack`.

Las strings puras resultan en una experiencia de depuración dolorosa y complican el proceso de análisis de errores a partir de registros.

## No es necesario que tiren un error

Está bien pasar un objeto `Error`. Esto es convención en código escrito siguiente el estilo de Nodejs, de aceptar devoluciones de llamada con el primer arguemtno como un objeto error.

```js
function myFunction (callback: (e?: Error)) {
  doSomethingAsync(function () {
    if (somethingWrong) {
      callback(new Error('This is my error'))
    } else {
      callback();
    }
  });
}
```

## Casos excepcionales

`Las excepciones deberían ser excepcionales` es un dicho común en ciencias de la computación. Hay algunas razones por las que esto también es verdadero para JavaScript (y TypeScript).

### Poca claridad sobre el origen del `throw`

Consideren el siguiente segmento de código:

```js
try {
  const foo = runTask1();
  const bar = runTask2();
}
catch(e) {
  console.log('Error:', e);
}
```
El próximo desarrollador que lo mire no podrá saber cuál función es la que puede tirar el error. La persona que revisa el código tampoco podrá saberlo sin leer el detalle de la implementación de task1 / task2.

### Dificulta el manejo elegante de errores

Pueden intentar mejorar la claridad escribiendo un bloque `catch` alrededor de cada cosa que pueda tirar un error:

```js
try {
  const foo = runTask1();
}
catch(e) {
  console.log('Error:', e);
}
try {
  const bar = runTask2();
}
catch(e) {
  console.log('Error:', e);
}
```

Pero si ahora necesitan pasar cosas de la primera tarea a la segunda, el código se desordena bastante (noten que la mutación de `foo` requiere una declaración `let` + la necesidad de la anotación explícita porque no puede ser inferido de la devolución de `runTask1`):

```ts
let foo: number; // Noten la utilización de `let` y de anotaciones de tipo explícitas
try {
  foo = runTask1();
}
catch(e) {
  console.log('Error:', e);
}
try {
  const bar = runTask2(foo);
}
catch(e) {
  console.log('Error:', e);
}
```

### No se encuentra bien representado en el sistema de tipos

Consideren la función:

```ts
function validate(value: number) {
  if (value < 0 || value > 100) throw new Error('Invalid value');
}
```

Usar `Error` para casos de este tipo es una mala idea ya que no se encuentra representado en la definición de tipos de la función `validate` (que es `(value:number) => void`). En su lugar, una mejor manera de crear un método de validación sería:

```ts
function validate(value: number): {error?: string} {
  if (value < 0 || value > 100) return {error:'Invalid value'};
}
```

Y ahora se encuentra representado en el sistema de tipos:

> A no ser que quieran manejar el error de manera genérica (simple / catch-all, etc), no *tiren* un error.

---

## Fuente: `typescript-book/docs/types/freshness.md`

* [Frescura](#freshness)
* [Pemitir propiedades extra](#allowing-extra-properties)
* [Caso de uso: React](#use-case-react-state)

## Frescura

TypeScript provee un concepto de **Frescura** ( también llamado *control de objetos literales estricto*) para facilitar el control de tipos en objetos literales que, de lo contrario, serían compatibles estructrualmente.

El tipado estructural es *extremadamente conveniente* Consideremos la siguiente porción de código. El tipado estructural les permitirá actualizar su JavaScript a TypeScript *de manera muy conveniente* y preservando cierto nivel de seguridad de tipos:

```ts
function logName(something: { name: string }) {
    console.log(something.name);
}

var person = { name: 'matt', job: 'being awesome' };
var animal = { name: 'cow', diet: 'vegan, but has milk of own species' };
var random = { note: `I don't have a name property` };

logName(person); // okay
logName(animal); // okay
logName(random); // Error: property `name` is missing
```

Sin embargo, el tipado *estructural* tiene una debilidad ya que les permite pensar que algo acepta más datos de los que realmente acepta. Demostramos esto en el código que sigue en el que TypeScript tirará un error:

```ts
function logName(something: { name: string }) {
    console.log(something.name);
}

logName({ name: 'matt' }); // okay
logName({ name: 'matt', job: 'being awesome' }); // Error: object literals must only specify known properties. `job` is excessive here.
```

Notemos que este error ocurre *únicamente con objetos literales•. Sin este error, uno podría mirar la llamada `logName({ name: 'matt', job: 'being awesome'})` y pensar que *logName* podría hacer algo útil con `job` cuando, en realidad, lo ignorará completamente.

Otro caso de uso importante refiere a las interfaces que tienen miembros opcionales, y por ende no están sujetos al mismo chequeo de tipos que los objetos literales. En este caso, un error de tipeo pasaría el control de tipos. Lo demostramos a continuación:

```ts
function logIfHasName(something: { name?: string }) {
    if (something.name) {
        console.log(something.name);
    }
}
var person = { name: 'matt', job: 'being awesome' };
var animal = { name: 'cow', diet: 'vegan, but has milk of own species' };

logIfHasName(person); // okay
logIfHasName(animal); // okay
logIfHasName({neme: 'I just misspelled name to neme'}); // Error: object literals must only specify known properties. `neme` is excessive here.
```

La razón por la que únicamente los objetos literales son controlados de esta manera es porque se considera que en estos casos las propiedades adicionales *que no son usadas* son casi siempre un error de tipeo o un error de comprensión de la API.

### Permitir propiedades extra

Un tipo puede incluír una firma del índice para indicar explícitamente que las propiedades extra están permitidas:

```ts
var x: { foo: number, [x: string]: any };
x = { foo: 1, baz: 2 };  // Ok, `baz` matched by index signature
```

### Caso de uso: Estado (State) en React

[ReactJS de Facebook](https://facebook.github.io/react/) ofrece un caso interesante en lo que respecta la frescura de los objetos. Comúnmente, en un componente, llamamos a `setState` con solo algunas de propiedades y no con todas:

```ts
// Assuming
interface State {
  foo: string;
  bar: string;
}

// Quieren hacer esto: 
this.setState({foo: "Hello"}); // Error: missing property bar

// Pero como el state contiene tanto a `foo` como `bar`, TypeScript los obligaría a hacer:
this.setState({foo: "Hello", bar: this.state.bar}};
```

Usando la idea de frescura, podrían marcar todos los miembros como opcionales, e *igual atraparían errores de tipeo*!:

```ts
// Asumiendo
interface State {
  foo?: string;
  bar?: string;
}

// Quieren hacer esto: 
this.setState({foo: "Hello"}); // Yay works fine!

// Debido a la frescura están protegido contra errores de tipeo!
this.setState({foos: "Hello"}}; // Error: Objects may only specify known properties

// Y continuan recibiendo controles de tipos
this.setState({foo: 123}}; // Error: Cannot assign number to a string
```

---

## Fuente: `typescript-book/docs/types/functions.md`

* [Anotación de parámetros](#parameter-annotations)
* [Anotación de tipos de devolución](#return-type-annotation)
* [Parámetros opcionales](#optional-parameters)
* [Sobrecarga](#overloading)

## Functions
El sistema de tipos de TypeScript le da mucho amor a las funciones. Después de todo, son los bloques fundacionales de un sistema componible.

### Anotación de parámetros
Pueden anotar parámetros de la misma forma que pueden anotar otras variables:

```ts
// anotación de variable
var sampleVariable: { bar: number }

// anotación de parámetro de función
function foo(sampleParameter: { bar: number }) { }
```

Aquí utilizamos anotaciones en línea. También pueden usar interfaces, etc.

### Anotación de tipos de devolución

Pueden anotar el tipo de devolución luego de la lista de parámetros de la función con el mismo estilo que usan para las varaibles: `: Foo`, por ejemplo. Miremos el siguiente ejemplo:

```ts
interface Foo {
    foo: string;
}

// Anotación de devolución de tipo Foo
function foo(sample: Foo): Foo {
    return sample;
}
```

En este caso utilizamos una `interface`, pero son libres de usar otros tipos de anotaciones, como las anotaciones en línea.

Comúnmente, no *necesitan* anotar el tipo de devolución de una función ya que, generalemente, puede ser inferido por el compilador.

```ts
interface Foo {
    foo: string;
}

function foo(sample: Foo) {
    return sample; // Tipo de devolución inferido Foo
}
```

Sin embargo, generalmente es una buena idea agregar estas anotaciones para ayudar con errores:

```ts
function foo() {
    return { fou: 'John Doe' }; // Tal vez no encontrarán este error de tipeo de `foo` hasta que sea demasiado tarde
}

sendAsJSON(foo());
```

Si no planean devolver nada de una función, pueden anotarla como `:void`. Generalmente, pueden dejar `:void` de lado y dejar que el motor lo infiera.

### Parámetros opcionales
Pueden marcar un parámetro como opcional:

```ts
function foo(bar: number, bas?: string): void {
    // ..
}

foo(123);
foo(123, 'hello');
```

Alternativamente, pueden proveer un valor default (usando `= someValue`) despues de la declaracón el parámetro, y este será inyectado por ustedes si la llamada a la función no provee ese argumento:

```ts
function foo(bar: number, bas: string = 'hello') {
    console.log(bar, bas);
}

foo(123);           // 123, hello
foo(123, 'world');  // 123, world
```

### Sobrecarga
TypeScript permite que *declaren* sobrecargas de funciones. Esto es útil para documentación y seguridad de tipos. Consideren el sigueinte código:

```ts
function padding(a: number, b?: number, c?: number, d?: any) {
    if (b === undefined && c === undefined && d === undefined) {
        b = c = d = a;
    }
    else if (c === undefined && d === undefined) {
        c = a;
        d = b;
    }
    return {
        top: a,
        right: b,
        bottom: c,
        left: d
    };
}
```

Si miran de cerca al código, notarán que el significado de `a`,`b`,`c`,`d` cambia dependiendo de cuántos argumentos son pasados a la función. A su vez, la función sólo espera `1`, `2`, o `4` arguemtnos. Estas limitaciones pueden ser *impuestas* y *documentadas* usando la sobrecarga de funciones. Simplemente deben declarar la cabeza de la función múltiples veces. La última declaración será la que se encuentra realmente activa *dentro* del cuerpo de la función pero no se encontrará disponible para el mundo exterior.

Mostramos esto a continuación:

```ts
// Sobrecargas
function padding(all: number);
function padding(topAndBottom: number, leftAndRight: number);
function padding(top: number, right: number, bottom: number, left: number);
// Implementación real que contiene todos los casos que el cuerpo de la función necesita para correr correctamente
function padding(a: number, b?: number, c?: number, d?: number) {
    if (b === undefined && c === undefined && d === undefined) {
        b = c = d = a;
    }
    else if (c === undefined && d === undefined) {
        c = a;
        d = b;
    }
    return {
        top: a,
        right: b,
        bottom: c,
        left: d
    };
}
```

Aquí las primeras tres cabezas de funciones están disponibles como llamadas válidas a `padding`:

```ts
padding(1); // Ok: all
padding(1,1); // Okay: topAndBottom, leftAndRight
padding(1,1,1,1); // Okay: top, right, bottom, left

padding(1,1,1); // Error: No es parte de las sobrecargas disponibles
```

Por supuesto que es importante para la declaracion final (la verdader declaración pensandola desde la perspectiva interna de la función) que sea compatible con todas las sobrecargas. Esto se debe a que el cuerpo de la función debe cubrir la verdadera naturaleza de las llamadas a la función.

> La sobrecarga de funciones en TypeScript no conlleva un aumento de carga sobre el tiempo de ejecución. Simplemente les permitirá documentar la manera en la que esperan que la función sea llamdaa y el compilador mantendrá el resto de su código.

[](### Declaring Functions)
[](With lambda, with interfaces which allow overloading declarations)

[](### Type Compatibility)

---

## Fuente: `typescript-book/docs/types/generics.md`

## Genéricos

La motivación principal para los genéricos es proveer restricciones de tipo singificativas entre miembros. Los miembros pueden ser:

* miembros de instancias de clases
* métodos de clase
* argumentos de funciones
* valores de devolución de funciones

## Motivación y ejemplos

Consideren la implementación de estructura de datos simple `Queue` (fila, el primero que entra es el primero que sale). Una implementación simple en TypeScript / JavaScript se ve así:

```ts
class Queue {
  private data = [];
  push(item) { this.data.push(item); }
  pop() { return this.data.shift(); }
}
```

Un problema con esta implementación es que permite agregar *cualquier cosa* a la fila y cuando quitamos el último elemento (pop) este también puede ser *cualquier cosa*. A continación mostramos como es posible agregar una `string` a la fila, aunque la utilización asume que solo `números` fueron agregados:

```ts
class Queue {
  private data = [];
  push(item) { this.data.push(item); }
  pop() { return this.data.shift(); }
}

const queue = new Queue();
queue.push(0);
queue.push("1"); // Ups! un error

// Un desarrollador entra a un bar...
console.log(queue.pop().toPrecision(1));
console.log(queue.pop().toPrecision(1)); // ERROR de tiempo de ejecución
```

Una solución (y la única en lenguages que no soportan genéricos) es proceder creando clases *especiales* para estas restricciones. Por ejemplo, para una fila de números:

```ts
class QueueNumber extends Queue {
  push(item: number) { super.push(item); }
  pop(): number { return this.data.shift(); }
}

const queue = new QueueNumber();
queue.push(0);
queue.push("1"); // ERROR : cannot push a string. Only numbers allowed

// ^ Si ese error se soluciona el resto funcionará correctamente
```

Por supuesto, esto puede resultar doloroso rápidamente. Por ejemplo, si quieren crear una fila de strings, tendrán que realizar el mismo esfuerzo otra vez. Lo que realmente quieren es una manera de decir que sea cual sea el tipo que *agregamos*, este debería ser el mismo tipo que *sale*. Esto es fácil con un parámetro *genérico* (en este caso, a nivel de la clase):

```ts
/** Definición de clase con un parámetro genérico */
class Queue<T> {
  private data = [];
  push(item: T) { this.data.push(item); }
  pop(): T | undefined { return this.data.shift(); }
}

/** Utilización simple */
const queue = new Queue<number>();
queue.push(0);
queue.push("1"); // ERROR : cannot push a string. Only numbers allowed

// ^ Si ese error se soluciona el resto funcionará correctamente
```

Otro ejemplo que ya hemos visto es la implementación de la función *reverse*. Aquí la restricción se encuentra entre lo que es pasado a la función y lo que la función devuelve:

```ts
function reverse<T>(items: T[]): T[] {
    var toreturn = [];
    for (let i = items.length - 1; i >= 0; i--) {
        toreturn.push(items[i]);
    }
    return toreturn;
}

var sample = [1, 2, 3];
var reversed = reverse(sample);
console.log(reversed); // 3,2,1

// Safety!
reversed[0] = '1';     // Error!
reversed = ['1', '2']; // Error!

reversed[0] = 1;       // Ok
reversed = [1, 2];     // Ok
```

En esta sección han visto ejemplos de genéricos siendo definidos a *nivel de clases* y a *nivel de funciones*. Un detalle que vale la pena mencionar es que pueden crear genéricos para funciones miembros también. A modo de un pequeño ejemplo, considreen el siguiente caso, en el que movemos la funcion `reverse` a una clase `Utility`:

```ts
class Utility {
  reverse<T>(items: T[]): T[] {
      var toreturn = [];
      for (let i = items.length - 1; i >= 0; i--) {
          toreturn.push(items[i]);
      }
      return toreturn;
  }
}
```

> TIP: Pueden darle el nombre que quieran al parametro genérico. Convencionalmente, se usa `T`, `U`, `V` cuando tienen genéricos simples. Si tienen más de un argumento genérico intenten usar nombres con mayor significación, como `TKey` y `TValue` (es convención prefijar los parámetros con `T` ya que los genéricos también son llamados *templates* - plantillas - en otros lenguajes, como C++).


### Patrones de diseño: comodidad genérica

Consideren la función: 

```ts
declare function parse<T>(name: string): T;
```

En este caso pueden ver que el tipo `T` solo es usado en un lugar. Por lo tanto, no hay restricción *entre* miembros. Esto es equivalente a una aserción de tipo en términos de seguridad de tipos:

```ts
declare function parse(name: string): any;

const something = parse('something') as TypeOfSomething;
```

Genéricos que son usados *únicamente una vez* no son mejores que una aserción en términos de seguridad de tipos. Habiendo dicho eso, si le proveen cierta *comodidad* a sus APIs.

Un ejemplo más obvio es una función que carga una respuesta JSON. Esta devuelve una promesa del *tipo que sea lo que le pasen*:
```ts
const getJSON = <T>(config: {
    url: string,
    headers?: { [key: string]: string },
  }): Promise<T> => {
    const fetchConfig = ({
      method: 'GET',
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      ...(config.headers || {})
    });
    return fetch(config.url, fetchConfig)
      .then<T>(response => response.json());
  }
```

Noten que de todos modos tendrán que anotar lo que quieren, pero la firma `getJson<T>` `config() => Promise<T>` les ahorrará algunas pulsaciones de teclas (no necesitarán anotar el tipo de devolución de `loadUsers` ya que puede ser inferido):

```ts
type LoadUsersResponse = {
  users: {
    name: string;
    email: string;
  }[];  // array de objetos sobre usuarios
}
function loadUsers() {
  return getJSON<LoadUsersResponse>({ url: 'https://example.com/users' });
}
```

Asimismo, `Promise<T>` como valor de devolución es definitivamente mejor que alternativas como `Promise<any>`.

Otro ejemplo es cuando un genéro se usa únicamente como argumento:

```ts
declare function send<T>(arg: T): void;
```

Aquí el genérico `T` puede ser usado para anotar el tipo al que quieren que el argumento corresponda. Por ejemplo:

```ts
send<Something>({
  x:123,
  // También obtendrán autocompleción  
}); // Tirará TSError si `x:123` no coincide con la estructura esperada por `Something`

```

---

## Fuente: `typescript-book/docs/types/index-signatures.md`

# Firmas de índices

Se puede acceder a un `Objecto` en JavaScript (y por lo tanto en TypeScript) con una **string** para guardar la referencia a cualquier otro **objeto** de JavaScript. 

Aquí hay un ejemplo pequeño:

```ts
let foo:any = {};
foo['Hello'] = 'World';
console.log(foo['Hello']); // World
```

Guardamos una string `"World"` bajo la clave `"Hello"`. Recuerden que dijimos que puede guardar cualquier **objeto** de JavaScript, así que guardemos una instancia de una clase únicamente para demostrar este concepto:

```ts
class Foo {
  constructor(public message: string){};
  log(){
    console.log(this.message)
  }
}

let foo:any = {};
foo['Hello'] = new Foo('World');
foo['Hello'].log(); // World
```

También deben recordar que dijimos que se puede acceder a un objeto con una **string**. Si le pasan cualquier otro objeto a la firma de índice, el tiempo de ejecución de JavaScript llamará `.toString` sobre él antes de obtener el resultado. Lo mostramos a continuación:

```ts
let obj = {
  toString(){
    console.log('toString called')
    return 'Hello'
  }
}

let foo:any = {};
foo[obj] = 'World'; // toString llamado
console.log(foo[obj]); // toString llamado, World
console.log(foo['Hello']); // World
```

Notemos que `toString` será llamado cada vez que `obj` sea usado en posición de index.

Los arrays son ligeramente diferentes. En lo que respecta a indexación por `número`, las VMs de JavaScript tratarán de optimizar (dependiendo de cosas como si es realmente un array y si coinciden las estructuras de los ítems guardados en él, etc). Por lo tanto, los **números** pueden ser considerados como un método de acceso a un objeto válido y por derecho propio (diferente de `string`). Aquí hay un ejemplo simple de array:

```ts
let foo = ['World'];
console.log(foo[0]); // World
```

Así que eso es JavaScript. Ahora miremos como TypeScript maneja este concepto.

## Firma de índices de TypeScript

En primer lugar, debido a que JavaScript llama `.toString` implícitamente para cualquier firma de índice de un objeto, TypeScript tirará un error para evitar que principiantes metan la pata (Vemos a usuarios meter la pata cuando usan JavaScript todo el tiempo en stackoverflow):

```ts
let obj = {
  toString(){
    return 'Hello'
  }
}

let foo:any = {};

// ERROR: the index signature must be string, number ...
foo[obj] = 'World';

// SOLUCION: TypeScript te obliga a ser explícito
foo[obj.toString()] = 'World';
```

La razón detrás de forzar al usuario a ser explícito se encuentra en que la implementación default de `toString` en un objeto es bastante fea. Por ejemplo, en V8 siempre devuelve `[object Object]`:

```ts
let obj = {message:'Hello'}
let foo:any = {};

// ERROR: the index signature must be string, number ...
foo[obj] = 'World';

// Aquí es donde realmente lo guardaron!
console.log(foo["[object Object]"]); // World
```

Por supuesto que `número` es soportado, ya que:

1. es necesario para tener soporte de excelente calidad para Array / Tuple
2. aunque lo uses para un `obj` la implementación default de `toString` es buena (no `[object Object]`
Of course `number` is supported because

Demostramos 2. a continuación:

```ts
console.log((1).toString()); // 1
console.log((2).toString()); // 2
```

Lección número 1:

> Las firmas de índices de TypeScript deben ser de tipo `string` o `number`

Una pequeña nota: los `symbols` también son válidos y soportados por TypeScript. Pero no entremos en esto aún. Paso a paso.

### Declarar una firma de índices

Hemos estado usando `any` para decirle a TypeScript que nos deje hacer lo que querramos. En realidad, podemos especificar una firma de *índice* explícitamente. Por ejemplo, digamos que quieren asegurarse que cualquier cosa que sea guardada en un objeto usando una string se ajuste a la estructura `{message: string}`. Podemos hacer esto con la declaración `{ [index:string] : {message: string} }` que mostramos a continuación:

```ts
let foo:{ [index:string] : {message: string} } = {};

/**
 * Debemos guardar cosas que adhieran a la estructura
 */
/** Ok */
foo['a'] = { message: 'some message' };
/** Error: must contain a `message` or type string. You have a typo in `message` */
foo['a'] = { messages: 'some message' };

/**
 * Cosas que son leidas también estan sujetas a chequeos de tipo
 */
/** Ok */
foo['a'].message;
/** Error: messages does not exist. You have a typo in `message` */
foo['a'].messages;
```

> TIP: el nombre de la firma del índice (`index` en `{ [index: string]: {message: string} }` no tiene importancia para TypeScript y solamente se usa para aumentar la legibilidad. Por ejemplo, si son nombres de usuarios pueden usar `{ [username: string] : {message: string} }` para ayudar a que el próximo desarrollador que mire esta parte del código (quien bien podría ser alguno de ustedes).

Por supuesto que los índices numéricos también están soportados: `{ [count: number] : SomeOtherTypeYouWantToStoreEgRebate }`

### Todos los miembros deben adherir a la firma de índice `string`

A penas tengan una firma de índice `string`, todos los miembros explícitos deberán adherir a esa firma. Lo mostramos a continuación:

```ts
/** OK */
interface Foo {
  [key:string]: number
  x: number;
  y: number;
}
/** Error */
interface Bar {
  [key:string]: number
  x: number;
  y: string; // ERROR: Property `y` must be of type number
}
```

Esto es así para proveer seguridad para que cualquier acceso mediante strings dé el mismo resultado:

```ts
interface Foo {
  [key:string]: number
  x: number;
}
let foo: Foo = {x:1,y:2};

// Directly
foo['x']; // number

// Indirectly
let x = 'x'
foo[x]; // number
```

### Usar un conjunto limitado de literales de string

Una firma de índice puede requerir que las strings de los índices sean miembros de una unión de literales de string mediante el uso de *Tipos Mapeados*. Por ejemplo:

```ts
type Index = 'a' | 'b' | 'c'
type FromIndex = { [k in Index]?: number }

const good: FromIndex = {b:1, c:2}

// Error:
// Type '{ b: number; c: number; d: number; }' is not assignable to type 'FromIndex'.
// Los objetos literales solo pueden especificar propiedades conocidas, y 'd' no existe en el tipo 'FromIndex'.
const bad: FromIndex = {b:1, c:2, d:3};
```

Generalmente, esto se usa en conjunto con `keyof typeof` para capturar tipos de vocabulario, descriptos en la siguiente página.

La especificación del vocabulario se puede diferir genéricamente:

```ts
type FromSomeIndex<K extends string> = { [key in K]: number }
```

### Tener `string`s y `number`s como índices

Este no es un caso de uso común, pero el compilador de TypeSCript lo soporta de todas maneras.

Sin embargo, tiene la restricción de que el indexador `string` es más estricto que el indexador `number`. Esto es intencional, ya que permite tipear cosas como:


```ts
interface ArrStr {
  [key: string]: string | number; // Debe aceptar todos los miembros

  [index: number]: string; // Puede ser un subconjunto del indexador string

  // Ejemplo de un miembro
  length: number;
}
```

### Patrón de diseño: Firma de índices anidada

> Consideración de API al agregar firmas de índices

Comúnmente en la comunidad JS, verán APIs que abusan de los indexadores string. Por ejemplo, un patrón común en librerías de CSS en JS:

```ts
interface NestedCSS {
  color?: string;
  [selector: string]: string | NestedCSS | undefined;
}

const example: NestedCSS = {
  color: 'red',
  '.subclass': {
    color: 'blue'
  }
}
```

Intenten no mezclar indexadores string con valores *válidos* como en el ejemplo anterior. Si lo hacen errores de tipeo en propiedades como `padding` no serán descurbiertos:
Try not to mix string indexers with *valid* values this way. E.g. a typo in the padding will remain uncaught:

```ts
const failsSilently: NestedCSS = {
  colour: 'red', // No error as `colour` is a valid string selector
}
```

En lugar separen la anidación en su propia propiedad, usando un nombre como `nest` (o `children` o `subnodes`, etc)::

```ts
interface NestedCSS {
  color?: string;
  nest?: {
    [selector: string]: NestedCSS;
  }
}

const example: NestedCSS = {
  color: 'red',
  nest: {
    '.subclass': {
      color: 'blue'
    }
  }
}

const failsSilently: NestedCSS = {
  colour: 'red', // TS Error: unknown property `colour`
}
```

### Excluir ciertas propiedades de la firma de índices

A veces necesitarán combinar propiedades combinar propiedades en la firma de índice. Esto no es aconsejable, y deberían usar la firma de índices anidada que mencionamos anteriormente.

Sin embargo, si están modelando *JavaScript existente* pueden esquivarlo con un tipo de intersección. El siguiente ejemplo muestra un error con el que se encontrarán si no usan intersecciones:

```ts
type FieldState = {
  value: string
}

type FormState = {
  isValid: boolean  // Error: Does not conform to the index signature
  [fieldName: string]: FieldState
}
```

Aquí está la solución con una intersección:

```ts
type FieldState = {
  value: string
}

type FormState =
  { isValid: boolean }
  & { [fieldName: string]: FieldState }
```

Notemos que aunque pueden declararlo para que modele JavaScript existente, no podrán crear un objeto semejante usando TypeScript:

```ts
type FieldState = {
  value: string
}

type FormState =
  { isValid: boolean }
  & { [fieldName: string]: FieldState }


// Usenlo para un objeto JavaScript que están recibiendo de algun lado
declare const foo:FormState; 

const isValidBool = foo.isValid;
const somethingFieldState = foo['something'];

// Usarlo para crear un objeto en TypeScript no funcionará
const bar: FormState = { // Error `isValid` not assignable to `FieldState
  isValid: false
}
```

---

## Fuente: `typescript-book/docs/types/interfaces.md`

## Interfaces

Las interfaces tienen *cero* impacto en el tiempo de ejecución de JavaScript. Hay mucho poder para declarar la estructura de variables en las interfaces de TypeScript.

Los siguientes dos ejemplos son declaraciones equivalentes. La primera utiliza *anotaciones en línea* y la segunda *interfaces*:

```ts
// Ejemplo A
declare var myPoint: { x: number; y: number; };

// Ejemplo B
interface Point {
    x: number; y: number;
}
declare var myPoint: Point;
```

Sin embargo, la belleza del *Ejemplo B* es que si alguien escribe una librería que se basa en `myPoint` para agregar nuevos miembros, pueden agregar a la declaración de `myPoint` existente fácilmente:

```ts
// Lib a.d.ts
interface Point {
    x: number; y: number;
}
declare var myPoint: Point;

// Lib b.d.ts
interface Point {
    z: number;
}

// Nuestro código
var myPoint.z; // Permitido!
```

Esto se debe a que las **interfaces en TypeScript son abiertas**. Este es un principio vital de TypeScript que le permite imitar la extensibilidad de JavaScript utilizando *interfaces*.


## Las clases pueden implementar interfaces

Si quieren usar *clases* que deban seguir una estructura de objeto que alguien haya declarado para ustedes en una interface, pueden hacerlo usando la palabra clave `implements` para asegurar compatibilidad:

```ts
interface Point {
    x: number; y: number;
}

class MyPoint implements Point {
    x: number; y: number; // Igual a Point
}
```

Básicamente, en presencia de ese ìmplements  cualquier cambio en la interface externa `Point` resultará en un error de compilación en tu cóidgo base, lo que permitirá mantenerlo sincronizado. 

```ts
interface Point {
    x: number; y: number;
    z: number; // Miembro nuevo
}

class MyPoint implements Point { // ERROR : Falta el miembro `z`
    x: number; y: number;
}
```

Notemos que `implement` restringe la estructura de las *instancias* de clase. Ejemplo:

```ts
var foo: Point = new MyPoint();
```

Y cosas como `foo: Point = MyPoint` no son lo mismo.


## TIPs

### No todas las interfaces se implemnetan fácilmente

Las interfaces son diseñadas para declarar cualquier estructura *arbitrariamente loca* que pueda encontrarse presente en JavaScript. 

Consideremos la siguiente interface donde algo es llamable con `new`:

```ts
interface Crazy {
    new (): {
        hello: number
    };
}
```

Esencialmente, tendrían algo similar a:

```ts
class CrazyClass implements Crazy {
    constructor() {
        return { hello: 123 };
    }
}
// Ya que
const crazy = new CrazyClass(); // crazy sería {hello:123}
```

Pueden *declarar* todas las locuras de JS que exiten con interfaces y utilizarlas con seguridad desde TypeScript. Esto no significa que puedan usar clases de TypeScript para implementarlas.

---

## Fuente: `typescript-book/docs/types/lib.d.ts.md`

* [lib.d.ts](#libdts)
* [Ejemplo de uso](#example-usage)
* [Mirar dentro](#libdts-inside-look)
* [Modificando los tipos nativos](#modifying-native-types)
* [Usando un lib.d.ts customizado](#using-your-own-custom-libdts)
* [Efecto del `target` del compilador sobre lib.d.ts](#compiler-target-effect-on-libdts)
* [Opciones `lib`](#lib-option)
* [Polyfill para motores JavaScript viejos](#polyfill-for-old-javascript-engines)

## `lib.d.ts`

Un archivo de declaración especial `lib.d.ts` es incluido con cada instalación de TypeScript. Este archivo contiene las declaracioens de ambiente para varios constructos comunes de JavaScript que se encuentran presente en los tiempos de ejecución de JavaScript y del DOM.

* Este archivo se incluye automáticametne en el contexto de compilación de un proyecto TypeScript.
* El objetivo de este archivo es simplificarles el proceso de comenzar a escrbir código JavaScript *con control de tipos*

Pueden excluir este archivo del contexto de compilación especificando el la bandera de línea de comandos `--noLib` (o `"noLib": true` en `tsconfig.json`).

### Ejemplo de uso

Como siempre, consideremos ejemplos de este archivo en uso:

```ts
var foo = 123;
var bar = foo.toString();
```
Este código realiza el chequeo de tipos correctamente *debido a que* la función `toString` se encuetnra definida en `lib.d.ts` para todos los objetos JavaScript. 

Si usan el mismo ejemplo de código con la opción `noLib`, obtendrán un error de control de tipo:

```ts
var foo = 123;
var bar = foo.toString(); // ERROR: La propiedad 'toString'no existe en el tipo 'number'
```
Ahora que entienden la importanca de `lib.d.ts`, en que consiste su contenido? Examinaremos eso a continuación.

### Mirando dentro de `lib.d.ts`

El contendio de `lib.d.ts` consiste principalmente de un montón de declaraciones de *variables*. Por ejemplo, `window`, `document`, `math` y un montón de declaraciones de *interfaces* similares, como `Window` , `Document`, `Math`.

La forma más simple de leer la documentación y las anotaciones de cosas globales es tipear código que *saben que funciona*. Por ejemplo, `Math.floor`, seguido de F12 (ir a la definición) usando su IDE (VSCode tiene gran soporte para este tipo de acciones).

Miremos la un ejemplo de declaración de *variable*. `window`, por ejemplo, se define como:

```ts
declare var window: Window;
```
Es decir, consiste de una simple `declare var` seguido del nombre de la variable (en este caso `window`) y una interface para la anotación de tipo (en este caso `Window`). Estas variables generalmente apuntan a alguna *interface* global. Por ejemplo, aquí hay una pequeña muestra de la (en realidad gigante) interface `Window`:

```ts
interface Window extends EventTarget, WindowTimers, WindowSessionStorage, WindowLocalStorage, WindowConsole, GlobalEventHandlers, IDBEnvironment, WindowBase64 {
    animationStartTime: number;
    applicationCache: ApplicationCache;
    clientInformation: Navigator;
    closed: boolean;
    crypto: Crypto;
    // etcétera, etcétera...
}
```
Como pueden observar, hay *mucha* informacion sobre los tipos en estas interfaces. A falta de TypeScript *ustedes* deberían mantener esta información en *su* cabeza. Ahora pueden delegar ese conocimiento en el compilador y conservar el acceso fácil a él usando cosas como `intellisense`.

Hay una buena razon para usar *interfaces* para estas globales. Les permitirá *agregar propiedades adicionales* a estas globales *sin* necesitar cambar `lib.d.ts`. Cubriremos este concepto a continuación:

### Modificando los tipos nativos

El hecho que una `interface` en TypeScript es abierta significa que pueden agregarle miembros a las interfaces declaradas en `lib.d.ts` y TypeScript reconocerá las adiciones. Notemos que necesitarán hacer estos cambios en un [*módulo global*](../project/modules.md) para que las interfaces sean asociadas con `lib.d.ts`. También recomendamos crear un archivo [`globals.d.ts](../project/globals.md) especial para este propósito.

Aquí hay algunos ejemplos en los que agregamos cosas a `window`, `Math`, `Date`:

#### Ejemplo `window`

Simplemente agreguen cosas a la interface `Window`:

```ts
interface Window {
    helloWorld(): void;
}
```

Esto les permitirá usarla de forma *segura respecto de los tipos*:

```ts
// Agreguenlá en tiempo de ejecución
window.helloWorld = () => console.log('hello world');
// Llamenlá
window.helloWorld();
// Usenlá incorrectamente para obtener un error:
window.helloWorld('gracius'); // Error: Supplied parameters do not match the signature of the call target
```

#### Ejemplo `Math`
La variable global `Math` se encuentra definida en `lib.d.ts` como (de nuevo, usen sus herramientas de desarrollo para navegar a la definición):

```ts
/** Un objeto instrínseco que provee las funcionalidades y constantes matemáticas básicas. **/
declare var Math: Math;
```

Por ejemplo, la variable `Math` es una instancia de la interface `Math`. La interface `Math` se define como:

```ts
interface Math {
    E: number;
    LN10: number;
    // etcétera ...
}
```

Esto significa que si quieren agregar cosas a la variable global `Math` tendrán que agregarlo a la interface global `Math`. Por ejemplo, si consideramos el [proyecto `seedrandom`](https://www.npmjs.com/package/seedrandom) el cual agrega una función `seedrandom` al objeto global `Math`, esto puede declararse de forma relativamente sencilla:

```ts
interface Math {
    seedrandom(seed?: string);
}
```

Y luego podrán usarlo:

```ts
Math.seedrandom();
// or
Math.seedrandom("Cualquier string que quieran!");
```

#### Ejemplo `Date`

Si miran la definción de la *variable* `Date` en `lib.d.ts`, encontrarán:

```ts
declare var Date: DateConstructor;
```
La interface `DateConstructor` es similar a lo que hemos visto previamente con `Math` y `Window`, ya que contiene miembros que pueden usar desde la variable global `Date`, por ejemplo, `Date.now()`. Adicionalmente a estos miembros, contiene firmas de *constructores* los que les permiten crear isntancias de `Date` (e.g. `new Date()`). Un fragment de la interface del `DateConstructor` es mostrada a continuación:

```ts
interface DateConstructor {
    new (): Date;
    // ... otras firmas de constructores

    now(): number;
    // ... otras funciones miembro
}
```

Consideren el proyecto [`datejs`](https://github.com/abritinthebay/datejs). DateJS agrega miembors tanto a la variable global `Date` como a las instancias de `Date`. Por lo tanto, una definición de TypeScript para estar librería se vería similar a ([la comunidad ya ha escrito esto para ustedes])(https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/datejs/index.d.ts)):

```ts
/** Métodos Públicos y Estáticos de DateJS */
interface DateConstructor {
    /** Obtiene una fecha que se encuentra fijada a la fecha actual. El horario se encuentra fijado al comienzo del dia (00:00 o 12:00 AM) */
    today(): Date;
    // ... etcétera, etcétera
}

/** Métodos de instancias públicas de DateJS */
interface Date {
    /** Agrega el número especificado de milisegundos a esta instancia. */
    addMilliseconds(milliseconds: number): Date;
    // ... etcétera etcétera
}
```
Esto les permitirá hacer cosas como la siguiente, de forma segura:

```ts
var today = Date.today();
var todayAfter1second = today.addMilliseconds(1000);
```

#### Ejemplo `string`

Si miran dentro de `lib.d.ts` para strings, encontrarán cosas similares a lo que hemos visto para `Date` (`String` como variable global, la interface `StringConstructor`, la interface `String`). Una cosa a notar es que la interface `String también impacta las strings *literales*, como mostramos en el siguiente ejemplo:

```ts

interface String {
    endsWith(suffix: string): boolean;
}

String.prototype.endsWith = function(suffix: string): boolean {
    var str: string = this;
    return str && str.indexOf(suffix, str.length - suffix.length) !== -1;
}

console.log('foo bar'.endsWith('bas')); // falso
console.log('foo bas'.endsWith('bas')); // verdadero
```

Variables e interfaces similares existen para otras cosas que tienen miembros estáticos e instancias, como `Number`, `Boolean`, RegExp`, etc'. y estas interfaces también afectan las instancias literales de estos tipos.

### Ejemplo `string` redux

Recomendamos crear un archivo `global.d.ts` por razones de mantenibilidad. Sin embargo, pueden entrar en el *namespace global* desde un *archivo de módulo* si así lo desean. Esto se hace usando `declare global { /*global namespace here*/ }`. E.g. el siguiente caso se puede escribir de la siguiente manera:

```ts
// Asegurarse que esto es tratado como un módulo
export {};

declare global {
    interface String {
        endsWith(suffix: string): boolean;
    }
}

String.prototype.endsWith = function(suffix: string): boolean {
    var str: string = this;
    return str && str.indexOf(suffix, str.length - suffix.length) !== -1;
}

console.log('foo bar'.endsWith('bas')); // false
console.log('foo bas'.endsWith('bas')); // true
```

### Usando un lib.d.ts customizado
Como mencionamos previamente, la utilización de la bandera de compilación booleana `--noLib`  causa que TypeSCript excluda automáticamente a `lib.d.ts`. Hay varias razones por las cuales esta puede ser una característica útil. Aquí mencionamos algunas de las más comunes:

* Estan corriendo en un ambiente JavaScript que difiere significativamente del ambiente estándar de ejecución de navegadores.
* Les gusta tener un control *estricto* respecto de las *globales* disponibles en su código. Por ejemplo, `lib.d.ts` define `item` como uan variable global y ustedes no quieren que esto entre en su código.

Una vez que hayan excluído el `lib.d.ts` default, pueden incluir un archivo con nombres imilar en su context ode compilación y TypeScript lo utilizará para controlar los tipos.

> Nota: tengan cuidado con `--noLib`. Una vez que han entrado al mundo noLib, si eligen compartir su proyecto con otros, ellos serán *forzados* a seguirlos a ese mundo. Aún peor, si incluyen *el código de ellos* en su proyecto, ustedes tendrán que portarlo a *su base lib*.

### Efecto del `target` del compilador sobre lib.d.ts

Establecer el target del compilador a `ES6` causa que `lib.d.ts` inlcuya declaraciones ambiente *adicionales* para cosas más modernas (ES6) como `Promise`. Este efecto mágico por el que el target del compilador cambia el *ambiente* del código es deseable para algunas personas y para otros es problemático, ya que confunde *generación de código* con *ambiente de código*.

Sin embargo, si quieren un contorl más fino sobre su ambiente, pueden usar la opción `--lib` que discutiremos a continuación.

### Opciones lib 

A veces (muchas veces) querrán separar la rela'ción entre el target de compilación (la versión de JavaScript generada) y el soporte de ambientes de librería. Un ejemplo común es las Promesas: hoy (junio 2016), lo más probable es que deseen `--target es5` pero utilizando las característica sde última generación como `Promise`. Para soportar esto, pueden tomar control explícito de `lib` usando las opciones `lib` del compilador.

> Nota: usar `--lib` seapara cualquier magia de lib de `--target` dándoles mejor control.

Pueden proveer esta opción desde la línea de comandos o en `tsconfig.json` (recomendado):

**Línea de comandos**:
```
tsc --target es5 --lib dom,es6
```
**tsconfig.json**:
```json
"compilerOptions": {
    "lib": ["dom", "es6"]
}
```

Las libs pueden ser clasificadas de la siguiente manera:

* Generación de características JavaScript:
    * es5
    * es6
    * es2015
    * es7
    * es2016
    * es2017
    * esnext
* Ambiente de tiempo de ejecución
    * dom
    * dom.iterable
    * webworker
    * scripthost
* Opciones ESNext Por-Característica(aún más pequeño que por generación)
    * es2015.core
    * es2015.collection
    * es2015.generator
    * es2015.iterable
    * es2015.promise
    * es2015.proxy
    * es2015.reflect
    * es2015.symbol
    * es2015.symbol.wellknown
    * es2016.array.include
    * es2017.object
    * es2017.sharedmemory
    * esnext.asynciterable

> NOTA: la opción `lib` provee un control extremadamente fino. Lo más probable es que quieran un ítem de la categoría generacional y uno de la categoría ambiental.
> Si --lib no se encuentra explicitado, una librería defaul es inyectada:
  - Para --target es5 => es5, dom, scripthost
  - Para --target es6 => es6, dom, dom.iterable, scripthost

Nuestras recomendaciones personales:

```json
"compilerOptions": {
    "target": "es5",
    "lib": ["es6", "dom"]
}
```

Ejemplo inlcuyendo Symbol con ES5:

La API de Symbol no se encuentra incluida cuando el target es ES5. De hecho, obtenemos un error similar a: [ts] No es posible encontrar el nombre 'Symbol'. Podemos usar "target": "es5" junto con "lib" para proveer la API de Symbol en TypeScript:

```json
"compilerOptions": {
    "target": "es5",
    "lib": ["es5", "dom", "scripthost", "es2015.symbol"]
}
```

## Polyfill para motores JavaScript viejos

> [Video PRO de Egghead sobre este tema](https://egghead.io/lessons/typescript-using-es6-and-esnext-with-typescript)

Hay varias características de tiempo de ejecución similares a `Map`/`Set` y hasta `Promise` (esta lista cambiará a lo largo del tiempo) que pueden usar con opciones modernas de `lib`. Para usarlas, todo lo que necesitan es usar `core-js`. Simplemente instalen::

```
npm install core-js --save-dev
```
Agreguen una importación al punto de entrada de su aplicación:

```js
import "core-js";
```

Debería polyfill estas características de tiempo de ejecución por ustedes 🌹.

---

## Fuente: `typescript-book/docs/types/literal-types.md`

## Literales
Los literales son valores *exactos* que son primitivos de JavaScript.

### Literales String

Pueden usar un literal string como un tipo. Por ejemplo:

```ts
let foo: 'Hola';
```

Aquí hemos creado una variable llamada `foo` que *aceptará que se le asigne únicamente el valor literal `'Hola'`*. Lo demostramos a continuación:

```ts
let foo: 'Hola';
foo = 'Bar'; // Error: "Bar" is not assignable to type "Hola"
```

No son muy útiles por su cuenta, pero pueden ser usados en uniones de tipo para crear abstracciones poderosas (y útiles). Por ejemplo:

```ts
type CardinalDirection =
    | "North"
    | "East"
    | "South"
    | "West";

function move(distance: number, direction: CardinalDirection) {
    // ...
}

move(1,"North"); // Ok
move(1,"Nurth"); // Error!
```

### Otros tipos literales
TypeScript también soporta los tipos literales `boolean` y `number`, por ejemplo:

```ts
type OneToFive = 1 | 2 | 3 | 4 | 5;
type Bools = true | false;
```

### Inferencia
Es común obtener un error del tipo `Type string is not assignable to type "foo"`. El siguiente ejemplo demuestra esto:

```js
function iTakeFoo(foo: 'foo') { }
const test = {
  someProp: 'foo'
};
iTakeFoo(test.someProp); // Error: Argument of type string is not assignable to parameter of type 'foo'
```

Esto se debe a que TypeScript infiere que `test` es de tipo `{ someProp: string }`. La solución en este caso sería usar una simple aserción de tipo para señalarle a TypeScript el literal que quieren que infiera, como mostramos a continuación:

```js
function iTakeFoo(foo: 'foo') { }
const test = {
  someProp: 'foo' as 'foo'
};
iTakeFoo(test.someProp); // Ok!
```

o usar una anotación en el punto de declaracion de tipo que ayude a TypeScript a inferir qué es lo correcto:

```
function iTakeFoo(foo: 'foo') { }
type Test = {
  someProp: 'foo',
}
const test: Test = { // Anotación - someProp inferida es siempre === 'foo'
  someProp: 'foo' 
}; 
iTakeFoo(test.someProp); // Okay!
```

### Casos de uso
Los casos de uso válido para los tipos de string literales son:

#### Enums basadas en strings

[Los enums de TypeScript tienen base numérica](../enums.md). Pueden usar string literales con unión de tipos para fingir un enum basado en strings, como hicimos en el ejemplo anterior para `CardinalDirection`. También pueden generar una estructura `Clave:Valor` usando la siguiente función:

```ts
/** Función de utilidad para crear una K:V a partir de una lista de strings */
function strEnum<T extends string>(o: Array<T>): {[K in T]: K} {
  return o.reduce((res, key) => {
    res[key] = key;
    return res;
  }, Object.create(null));
}
```

Y luego generen la union de tipo literal usando `keyof typeof`. Aquí está el ejemplo completo:

```ts
/** Función de utilidad para crear una K:V a partir de una lista de strings */
function strEnum<T extends string>(o: Array<T>): {[K in T]: K} {
  return o.reduce((res, key) => {
    res[key] = key;
    return res;
  }, Object.create(null));
}

/**
  * Muestra crear una enum de strings
  */

/** Crear una K:V */
const Direction = strEnum([
  'North',
  'South',
  'East',
  'West'
])
/** Crear un tipo */
type Direction = keyof typeof Direction;

/** 
  *  Muestra crear una enum de strings
  */
let sample: Direction;

sample = Direction.North; // Okay
sample = 'North'; // Okay
sample = 'AnythingElse'; // ERROR!
```

#### Modelando APIs de JavaScript ya existentes

Por ejemplo, [el editor CodeMirror tiene una opción `readOnly`](https://codemirror.net/doc/manual.html#option_readOnly) que puede ser o un `boolean` o la string literal `"nocursor"` (valores válidos: `true,false,"nocursor"`). Puede ser declarado como:

```ts
readOnly: boolean | 'nocursor';
```

#### Uniones discriminadas

Cubriremos este tema [más adelante en el libro](./discriminated-unions.md).

---

## Fuente: `typescript-book/docs/types/migrating.md`

## Migrar desde JavaScript

Asumimos que:
* saben JavaScript, y
* que conocen los patrones y las herramientas de construcción (e.g. webpack) you know patterns and build tools (e.g. webpack) usados en el project. 

Con esos supuestos fuera del camino, en general el proceso consiste de los siguientes pasos:

* Agregar un `tsconfig.json`.
* Cambiar las extensiones de tus archivos de código fuente de `.js` a `.ts`. Comenzar a *contener* errores usando `any`.
* Escribir código nuevo en TypeScript, usando `any` tan poco como sea posible.
* Volver al código viejo y comenzar a agregar anotaciones de tipo y solucionar bugs identificadas.
* Usar definiciones de ambiente para el código JavaScript de terceros.

Discutamos algunos de estos puntos con mayor detalle.

Notemos que todo JavaScript es *válido* en TypeScript. Eso significa que si le sirven JavaScript al compilador TypeScript -> El JavaScript emitido por el compilador de TypeScript se comportará de la misma forma que el JavaScript original. Esto significa que cambiar las extensiones `.js` a `.ts` no afectarán a nuestro código adversamente.

### Conteniendo errores
TypeScript comenzará a chequear los tipos del código inmediatamente y su JavaScript original *puede no ser tan limpio como pensaron que era*, causando errores de diagnóstico. Muchos de estos errores podrán ser contenidos usando `any`. Por ejemplo:

```ts
var foo = 123;
var bar = 'hey';

bar = foo; // ERROR: No es posible asignar un número a una string
```

A pesar de que el **el error es válido** (y en muchos casos la información inferida será mejor que lo que los autores originales de diferentes porciones del código imaginaron), su enfoque problemente se encontrará en escribir código nuevo en TypeScript mientras que actualizando progresivamente el viejo. Aquí podran contener el error con una afirmación de tipo, como mostramos a continuación: 

```ts
var foo = 123;
var bar = 'hey';

bar = foo as any; // Ok!
```

En otros lugares, tal vez quieran anotar algo como `any`. Por ejemplo: 

```ts
function foo() {
    return 1;
}
var bar = 'hey';
bar = foo(); // ERROR: No es posible asignar un número a una string
```

Contenido:

```ts
function foo(): any { // Agregamos `any`
    return 1;
}
var bar = 'hey';
bar = foo(); // Ok!
```

> Nota: Contener errores es peligroso, pero les permitirá identificar errores en su código TypeScript *nuevo*. Tal vez quieran dejar comentarios `// TODO:` a medida que avanzan.

### JavaScript de terceros
Pueden cambiar su JavaScript a TypeScript, pero no pueden cambiar al mundo entero para que usen TypeScript. Aquí es dónde el soporte de TypeScript a las definciones de ambiente juega su rol. Al comienzo, recomendamos que creen un `vendor.d.ts` (la extensión `.d.ts` especifíca el hecho de que este es un *archivo de declaraciones*) y que comiencen a agregar las cosas sucias. Alternativamente pueden crear un archivo específico para la libreria, por ejemplo `jquery.d.ts` para jquery.

> NotaL Definiciones de tipo bien definidas y mantenidas para casi el 90% de las librerias mas utilizadas de JavaScript existe en un Repositorio OSS llamado [DefintelyTyped](https://github.com/borisyankov/DefinitelyTyped). Recomendamos mirar ahí antes de crear tus propias definiciones siguiendo las indicaciones que presentamos aquí. Sin embargo, esta forma rápida y sucia que mostraremos es conocimiento esencial para disminuir sus fricciones iniciales con TypesCript.

Consideremos el caso de `jquery`, para el que podemos crear una definición trivial fácilmente:

```ts
declare var $: any;
```

A veces querrán agregar una anotación explícita para algo (por ejemplo `JQuery`) y necesitarán algo en el *espacio de declaración de tipos*. Pueden hacer esto fácilmente usando la palabra clave `type`.

```ts
declare type JQuery = any;
declare var $: JQuery;
```

Esto provee un camino de actualizaciones más sencillo.

De nuevo, un `jquery.d.ts` de alta calidad existe en [DefinitelyTyped](https://github.com/borisyankov/DefinitelyTyped).  Pero ahora saben como sobreponerse a cualquier fricción JavaScript -> TypeScript *rápidamente* cuando estén usando JavaScript creado por terceros. Miraremos a las declaraciones ambientes con más detalle a continuación.


# Módulos NPM de terceros

De manera similar a las declaraciones de variables globales, pueden declarar un módulo global con facilidad. Por ejemplo, si quieren usar `jquery` como un módulo (https://www.npmjs.com/package/jquery) pueden escribir lo siguiente ustedes mismos:

```ts
declare module "jquery";
```

Y luego podrán importarlo en sus archivos cuando sea necesario:

```ts
import * as $ from "jquery";
```

> De nuevo, un `jquery.d.ts` de alta calidad existe en [DefinitelyTyped](https://github.com/borisyankov/DefinitelyTyped), el cual provee declaraciones de módulo de jquery de calidad muchísimo más alta. Pero tal vez no exista para la librería que ustedes estén considerando, por lo que ahora tienen una manera de baja fricción y veloz para continuar migrando su JavaScript 🌹

# Recursos externos no js

También pueden permitir la importación de cualquier tipo de archivo, por ejemplo, archivos `.css` (si están usando algo como los cargadores de estilo de webpack o módulos css) con una declaración de estilo `*` simple (idealmente en un [archivo `globals.d.ts`](../project/globals.md)):

```ts
declare module "*.css";
```

Ahora es posible `import * as foo from "./some/file.css";`

Similarmente, si están usando plantillas html (por ejemplo, con angular) pueden:

```ts
declare module "*.html";
```

---

## Fuente: `typescript-book/docs/types/mixins.md`

# Mixins

Las clases de TypeScript (y JavaScript) soportan herencia singular estricta. Por lo tanto *no* podrán:

```ts
class User extends Tagged, Timestamped { // ERROR : no multiple inheritance
}
```

Otra manera de construir clases de componentes reusables, es hacerlo al combinar clases parciales más simples, llamadas mixins.

La idea es simple. En lugar de *class A extends class B* para obtener su funcionalidad, *function B recibe a class A* y devuelve una nueva clase con esta funcionalidad incorporada. Function `B` es un mixin.

> [Un mixin es] una función que
  1. toma un constructor,
  2. crea una clase que extiende ese constructor con nuevas funcionalidades
  3. devuelve una clase nueva
  
  Un ejemplo completo:

```ts
// Necesario para todos los mixins
type Constructor<T = {}> = new (...args: any[]) => T;

////////////////////
// Ejemplo de mixins
////////////////////

// Un mixin que agrega una propiedad
function Timestamped<TBase extends Constructor>(Base: TBase) {
  return class extends Base {
    timestamp = Date.now();
  };
}

// Un mixin que agrega una propiedad y métodos
function Activatable<TBase extends Constructor>(Base: TBase) {
  return class extends Base {
    isActivated = false;

    activate() {
      this.isActivated = true;
    }

    deactivate() {
      this.isActivated = false;
    }
  };
}

////////////////////
// Uso para componer clases
////////////////////

// Clase simple
class User {
  name = '';
}

// Usuario que tiene una Timestamp
const TimestampedUser = Timestamped(User);

// Usuario que tiene una Timestamp y es activable
const TimestampedActivatableUser = Timestamped(Activatable(User));

////////////////////
// Usando las clases compuestas
////////////////////

const timestampedUserExample = new TimestampedUser();
console.log(timestampedUserExample.timestamp);

const timestampedActivatableUserExample = new TimestampedActivatableUser();
console.log(timestampedActivatableUserExample.timestamp);
console.log(timestampedActivatableUserExample.isActivated);

```

Deconstruyamos nuestro ejemplo.

## Aceptar un constructor

Los mixins toman una clase y la extienden con nueva funcionalidad. Por lo tanto, necesitamos definir qué es un *constructor*. Tan fácil como:

```ts
// Necesario para todos los mixins
type Constructor<T = {}> = new (...args: any[]) => T;
```

## Extiende la clase y la devuelve

Pretty easy:

```ts
// Un mixin que agrega una propiedad
function Timestamped<TBase extends Constructor>(Base: TBase) {
  return class extends Base {
    timestamp = Date.now();
  };
}
```

Eso es todo 🌹

---

## Fuente: `typescript-book/docs/types/moving-types.md`

# Tipos móviles

El sistema de tipos de TypeScript es extremadamente poderoso y permite mover y dividir tipos en maneras que no son posibles en ningún otro lenguaje existente.

Esto se debe a que TypeScript fue diseñado para permitirles trabajar sin fricciones con un lenguaje *altamente dinámico* como JavaScript. Aquí cubriremos algunos trucos para mover tipos en TypeScript. 

La fundamentación principal es que: si cambian una sola cosa, todo lo demás se actualizará automáticamente y recibirán errors útiles si algo se rompe a partir de los cambios, como un sistema de restricciones bien diseñado.

## Copiando tanto el Tipo como el Valor

Si quieren mover una clase, tal vez estén tentados de hacer lo siguiente:

```ts
class Foo { }
var Bar = Foo;
var bar: Bar; // ERROR: cannot find name 'Bar'
```

Este es un error porque `var` únicamente copio `Foo` en el espacio de declaración de *variables* y, por lo tanto, no podrán usar `Bar` como una anotación de tipos. La estrategia correcta es usar la palabra clave `import`. Noten que solo podrán usarla de esta manera si estan usando *namespaces* o *módulos* (más detalles sobre esto luego):

```ts
namespace importing {
    export class Foo { }
}

import Bar = importing.Foo;
var bar: Bar; // Okay
```

Este truco de `import` solo funciona para cosas que son *tanto tipos como variables*.

## Capturar el tipo de una variable

Pueden usar una variable en una anotación de tipos usando el operador `typeof`. Esto les permitirá decirle al compilador que una variable es del mismo tipo que otra. Aquí mostramos un ejemplo:

```ts
var foo = 123;
var bar: typeof foo; // `bar` tiene el mismo tipo que `foo` (acá, `number`)
bar = 456; // OK
bar = '789'; // ERROR: Type `string` is not `assignable` to type `number`
```

## Capturar el tipo de un miembro de una clase

De manera similar a como capturamos el tipo de una variable, pueden declarar una variable únicamente para capturar tipos:

```ts
class Foo {
  foo: number; // algun miembro cuyo tipo queremos capturar
}

// Únicamente para capturar el tipo
declare let _foo: Foo;

// Lo mismo que antes
let bar: typeof _foo.foo; // `bar` tiene el tipo `number`
```

## Capturando el tipo de strings mágicas

Muchas librerías de JavaScript y frameworks usan strings de JavaScript puras. Pueden usar variables `const` para capturar sus tipos:

```ts
// Captura tanto el *tipo* como el *valor* de la string mágica:
const foo = "Hello World";

// Usa el tipo capturado:
let bar: typeof foo;

// bar solo puede recibir `Hello World`
bar = "Hello World"; // Okay!
bar = "anything else "; // Error!
```

En este ejemplo, `bar` tiene el tipo literal `"Hello World"`. Cubrimos esto en mayor profundidad en la [sección de tipos literales](https://basarat.gitbooks.io/typescript/content/docs/types/literal-types.html "Tipos Literales").

## Capturando nombres clave

El operador `keyof` les permitirá capturar los nombres clave de un tipo. Por ejemplo, pueden usarlo para capturar los nombres clave de una variable al agarrar primero su tipo con `typeof`:

```ts
const colors = {
  red: 'reddish',
  blue: 'bluish'
}
type Colors = keyof typeof colors;

let color: Colors; // idéntico a let color: "red" | "blue"
color = 'red'; // OK
color = 'blue'; // OK
color = 'anythingElse'; // Error: Type '"anythingElse"' is not assignable to type '"red" | "blue"'
```

Esto les permitirá tener cosas como string enums + constantes de forma sencilla, como han visto en el ejemplo anterior.

---

## Fuente: `typescript-book/docs/types/never.md`

# Never

> [Un video con una clase sobre el tipo *never*](https://egghead.io/lessons/typescript-use-the-never-type-to-avoid-code-with-dead-ends-using-typescript)

El diseño de lenguages de programación tiene un concepto de un tipo *de fondo* que es un resultado **natural** cuando realizan *análisis de flujo de código*. TypeScript hace *análisis de flujo de código* (😎) por lo que tiene que representar de forma fidedigna cosas que tal vez nunca sucedan.

El tipo `never` es usando en TypeScirpt para denotar este tipo *de fondo*. Los casos en los que ocurre naturalmente son:

* una función que nunca devuelve (ejemplo, si el cuerpo de la función tiene un `while(true){}`)
* una función que siempre tira un error (ejempplo, en `function foo(){throw new Error('Not Implemented')}` el tipo de devolución de `foo` es `never`)

Por supeusto pueden usar esta anotación ustedes también de la siguiente manera: 

```ts
let foo: never; // Okay
```

Sin embargo *`never` solo puede ser asignado a otro never*, por ejemplo:

```ts
let foo: never = 123; // Error: Type number is not assignable to never

// Ok ya que el tipo de devolución de la función es `never`
let bar: never = (() => { throw new Error('Throw my hands in the air like I just dont care') })();
```

Genial. Ahora entremos en su caso de uso principal :)

# Caso de uso: chequeos exhaustivos

Pueden llamar funciones never en un contexto never.

```ts
function foo(x: string | number): boolean {
  if (typeof x === "string") {
    return true;
  } else if (typeof x === "number") {
    return false;
  }

  // Sin un tipo never tendríamos un error:
  // - No todos los caminos del código devuelven un valor (chequeos null estrictos)
  // - O se detecta código inalcanzable
  // Pero como TypeScript entiende que la función `fail` devuelve `never`
  // les permite llamarla como si fueran a usarla para seguridad de tiempo de ejecución o 
  // chequeos de tipo exhaustivos
  // Without a never type we would error :
 
  return fail("Unexhaustive!");
}

function fail(message: string): never { throw new Error(message); }
```

Y porque `never` únicamente puede ser asignado a otro `never`, también pueden usarlo para controles exhaustivos en tiempo de compilación. Esto es cubierto en la [sección *uniones discriminadas*](./discriminated-unions.md).

# Confusión con `void`

En cuanto alguien les diga que `never` es devuelto cuando una función nunca sale con gracia, intuitivamente ustedes querrán pensar que es lo mismo que `void`. Sin embargo, `void` es una Unidad. `never` es un falsum. 

Un faunción que *devuelve* nada, devuelve una unidad `void`. Sin embargo, una función *que nunca devuelve* (o siempre tira un error) devuelve `never`. `void` es algo que peude ser asignado (sin `strictNullChecking`), pero `never` no puede ser *nunca* asignado a nada que no sea `never`.

---

## Fuente: `typescript-book/docs/types/readonly.md`

## readonly
El sistema de tipos de TypeScript les permite marcar propiedades individuales de una interface como `readonly`. Esto les permitirá trabajar funcionalmente (mutaciones inesperadas son malas):

```ts
function foo(config: {
    readonly bar: number,
    readonly bas: number
}) {
    // ..
}

let config = { bar: 123, bas: 123 };
foo(config);
// Pueden estar seguros que `config` no es cambiada 🌹
```

Por supuesto que pueden usar `readonly` tanto en interfaces como en definiciones de tipo. Por ejemplo:

```ts
type Foo = {
    readonly bar: number;
    readonly bas: number;
}

// La inicialización está bien
let foo: Foo = { bar: 123, bas: 456 };

// La mutación no
foo.bar = 456; // Error: Left-hand side of assignment expression cannot be a constant or a read-only property
```

También pueden declarar propiedades de clases como `readonly`. Pueden inicializarlas en la declaración on en el constructor, como mostramos a continuación:

```ts
class Foo {
    readonly bar = 1; // OK
    readonly baz: string;
    constructor() {
        this.baz = "hello"; // OK
    }
}
```

## Readonly
Existe un tipo `Readonly` que acepta un tipo `T` y marca todas sus propiedades como `readonly` usando tipos mapeados. A continuación lo ponemos en práctica:

```ts
type Foo = {
  bar: number;
  bas: number;
}

type FooReadonly = Readonly<Foo>; 

let foo:Foo = {bar: 123, bas: 456};
let fooReadonly:FooReadonly = {bar: 123, bas: 456};

foo.bar = 456; // Okay
fooReadonly.bar = 456; // ERROR: bar is readonly
```

### Varios casos de uso

#### ReactJS
Una librería que ama la inmutabilidad es ReactJs. Una posibilidad es marcar sus `Props` y `State` para que sean inmutables. Por ejemplo:

```ts
interface Props {
    readonly foo: number;
}
interface State {
    readonly bar: number;
}
export class Something extends React.Component<Props,State> {
  someMethod() {
    // Pueden quedarse tranquilos que nadie hará
    this.props.foo = 123; // ERROR: (las props son inmutables)
    this.state.baz = 456; // ERROR: (debemos usar this.setState)  
  }
}
```

No ncesitan hacerlo, sin embargo, ya que las definiciones de tipo de React ya las marcan como `readonly` (envolviendo internamente el tipo genérico con el tipo `Readonly` que mencionamos previamente).

```ts
export class Something extends React.Component<{ foo: number }, { baz: number }> {
  // Pueden quedarse tranquilos que nadie hará
  someMethod() {
    this.props.foo = 123; // ERROR: (las props son inmutables)
    this.state.baz = 456; // ERROR: (debemos usar this.setState)  
  }
}
```

#### Inmutabilidad sin fisuras

También pueden marcar las firmas de índices como readonly:

```ts
/**
 * Declaración
 */
interface Foo {
    readonly[x: number]: number;
}

/**
 * Uso
 */
let foo: Foo = { 0: 123, 2: 345 };
console.log(foo[0]);   // Ok (leyendo)
foo[0] = 456;          // Error (mutando): Readonly
```

Esto es genial si quieren hacer uso de los arrays nativos de JavaScript de forma *inmutable*. De hecho, TypeScript incluye una interface `ReadonlyArray<T>` que les permitirá hacer exactamente eso:

```ts
let foo: ReadonlyArray<number> = [1, 2, 3];
console.log(foo[0]);   // Ok
foo.push(4);           // Error: `push` does not exist on ReadonlyArray as it mutates the array
foo = foo.concat([4]); // Ok: crea una copia
```

#### Inferencia automática
En algunos casos, el compiador puede inferir que un ítem en particular es readonly. Por ejemplo, si dentro de una clase declaran una propiedad que tiene un getter pero no un setter, TypeScript asume que es readonly:

```ts
class Person {
    firstName: string = "John";
    lastName: string = "Doe";
    get fullName() {
        return this.firstName + this.lastName;
    }
}

const person = new Person();
console.log(person.fullName); // John Doe
person.fullName = "Dear Reader"; // Error! fullName is readonly
```

### Diferencia con `const`
`const`
1. es para referenciar variables
2. la variable no puede ser reasignada a nada más

`readonly` es
1. para una propiedad
2. la propiedad puede ser modificada debido a los alias

Ejemplo que explica 1:

```ts
const foo = 123; // referencia a variable
var bar: {
    readonly bar: number; // propiedad
}
```

Ejemplo que explica 2:

```ts
let foo: {
    readonly bar: number;
} = {
        bar: 123
    };

function iMutateFoo(foo: { bar: number }) {
    foo.bar = 456;
}

iMutateFoo(foo); // El argumento foo tiene un alias en el parámetro foo
console.log(foo.bar); // 456!
```

Básicamente, `readonly` se asegura de que una propiedad *no pueda ser modificada por nosotros*, pero si se la pasan a algo que no tiene esa garantía (permitido por razones de compatibilidad de tipos), eso podrá modificarla. Por supuesto que si `iMutateFoo` hubiese declarado que no muta a `foo.bar`, el compilador lo hubiese señalado como un error:

```ts
interface Foo {
    readonly bar: number;
}
let foo: Foo = {
    bar: 123
};

function iTakeFoo(foo: Foo) {
    foo.bar = 456; // Error! bar is readonly
}

iTakeFoo(foo); // El argumento foo tiene un alias en el parámetro foo
```

---

## Fuente: `typescript-book/docs/types/type-assertion.md`

## Aserción de tipo
Typescript permite anular su visión de tipos inferidos y analizados como ustedes deseen. Esto se logra mediante un mecanismo llamado "aserción de tipos". La aserción de tipos de TypeScript consiste puramente en ustedes diciendole al compialdor que saben mejor que él qué tipos son, y que no debería cuestionarlos.

Un caso de uso común para la aserción de tipos es cuando estan migrando código de JavaScript a TypeScript. Por ejemplo, consideren el siguiente patrón:

```ts
var foo = {};
foo.bar = 123; // Error: la propiedad 'bar' no existe en `{}`
foo.bas = 'hello'; // Error: la propiedad 'bas' no existe en `{}`
```

Aquí hay erroes de código porque el tipo *inferido* de `foo` es `{}`, es decir, un objeto con cero propiedades. Por lo tanto, no está permitido agregarle `bar` o `bas`. Pueden arreglar esto simplemente usando la aserción de tipo `as Foo`:

```ts
interface Foo {
    bar: number;
    bas: string;
}
var foo = {} as Foo;
foo.bar = 123;
foo.bas = 'hello';
```

### `as foo` vs. `<foo>`
Originalmente, la sintaxis que se agregaba era `<foo>`. Esto es demostrado a continuación:

```ts
var foo: any;
var bar = <string> foo; // bar ahora tiene tipo "string"
```

Sin embargo hay una ambiguedad en la gramática del lenguaje cuando se usa aserciones de estilo `<foo>` en JSX:

```ts
var foo = <string>bar;
</string>
```

Por lo tanto, se recomienda que usen `as foo` por cuestiones de consistencia.

### Aserción de tipo vs casting
La razón por la cual no es llamado "casting de tipos" es que *casting* generalmente implica algun tipo de soporte en tiempo de ejecución. Sin embargo, las *aserciones de tipo* son una construcción pura de tiempo de compilación y una manera para que ustedes le den pistas al compilador sobre como quieren que analice su código.

### La aserción como algo dañino
En mucho casos, las aserciones les permitirán migrar código heredado fácilmente (e incluso copiar y pegar otras muestras de códigos a su base). Sin embargo, deben tener cuidad con el uso de aserciones. Tomen nuestro código orignal como un ejemplo, el compilador no los protegerá de olvidarse de *realmente agregar las propiedades que prometieron*:

```ts
interface Foo {
    bar: number;
    bas: string;
}
var foo = {} as Foo;
// ahhhh .... olvidaron algo?
```

Otra idea común es usar una aserción como una maner ade proveer *autocompleción*:

```ts
interface Foo {
    bar: number;
    bas: string;
}
var foo = <Foo>{
    // el compilador proveera autocompleción para las propiedades de Foo
    // Pero es fácil que el desarrollador se olvide de agregar todas las propiedades
    // Además, es probable que este código se rompa si Foo es refactorizado (e.g. si agregamos una nueva propiedad)
};
```

pero el peligro aquí es el mismo, ya que si olvidan una propiedad el compilador no se quejará. Es mejor si hacen lo siguiente:

```ts
interface Foo {
    bar: number;
    bas: string;
}
var foo:Foo = {
    // El compialdor ofrecerá opciones de autocompleción para Foo
};
```

En algunos casos tal vez necesiten crear una variable temporal, pero al mnos no estarán haciendo promesas (posiblemente falsas) y recayendo en la inferencia de tipos para que haga el control de tipos por ustedes.

### Aserción doble
La aserción de tipos, a pesar de ser ligerametne insegura como hemos mostrado, no es completamente mala. Por ejemplo, el siguiente es un caso de uso muy válido (el usuario piensa que el evento que será pasado será un caso más específico de un evento) y la aserción de tipo funciona como esperamos:

```ts
function handler (event: Event) {
    let mouseEvent = event as MouseEvent;
}
```

Sin embargo, lo sigueitne probablemente sea un error y TypeScript se quejará, a pesar de la aserción de tipo del usuario:

```ts
function handler(event: Event) {
    let element = event as HTMLElement; // Error: 'Event' y 'HTMLElement' no son asignables mutuamente.
}
```

Si *aún quieren ese tipo, pueden usar una doble aserción*, primer afirmando a `any`, lo que es compatible con todos los tipos y, por lo tanto, el compilador ya no se quejará:

```ts
function handler(event: Event) {
    let element = event as any as HTMLElement; // Ok!
}
```

#### Cómo determina TypeScript si una aserción simple no es suficiente
Básicamente, la aserción de tipo `S` a `T` triunfa si `S` es un subtipo de `T` o si `T` es un subtipo de `S`. Esto es para proveer extra seguridad al hacer aserciones de tipo... aserciones completamente aleatorias pueden ser realmente inseguras y necesitarán usar `any` para que sea aceptado.

---

## Fuente: `typescript-book/docs/types/type-compatibility.md`

* [Compatibilidad de Tipos](#type-compatibility)
* [Firmeza](#soundness)
* [Estructural](#structural)
* [Genéricos](#generics)
* [Varianza](#variance)
* [Funciones](#functions)
  * [Tipo de devolución](#return-type)
  * [Número de argumentos](#number-of-arguments)
  * [Parámetros rest y opcionales](#optional-and-rest-parameters)
  * [Tipos de argumentos](#types-of-arguments)
* [Enums](#enums)
* [Clases](#classes)
* [Genéricos](#generics)
* [Nota al pie: invariancia](#footnote-invariance)

## Compatibilidad de Tipos

La Compatibilidad de Tipos (como la discutiremos aquí) determina si una cosa puede ser asignada a otra. Por ejemplo, `string` y `number` no son compatibles:

```ts
let str: string = "Hello";
let num: number = 123;

str = num; // ERROR: `number` is not assignable to `string`
num = str; // ERROR: `string` is not assignable to `number`
```

## Firmeza

El sistema de tipos de TypeScript fue diseñado para ser conveniente y permite comportamientos *poco seguros*. Por ejemplo, cualquier cosa puede ser asignada a `any`, lo que implica decirle al compilador que les deje hacer lo que quieran:

```ts
let foo: any = 123;
foo = "Hello";

// Later
foo.toPrecision(3); // Permitido, ya que el tipo es `any`
```

## Estructural

Los objetos de TypeScript tienen tipos estructurales. Esto significa que los *nombres* no importan siempre y cuanto las estructuras coincidan:

```ts
interface Point {
    x: number,
    y: number
}

class Point2D {
    constructor(public x:number, public y:number){}
}

let p: Point;
// OK, gracias a los tipos estructurales
p = new Point2D(1,2);
```

Esto les permitirá crear objetos sobre la marcha (como lo hacen en JS vainilla) y conservar la seguridad de tipos donde los mismos pueden ser inferidos.

Además, *más* datos se consideran aceptables:

```ts
interface Point2D {
    x: number;
    y: number;
}
interface Point3D {
    x: number;
    y: number;
    z: number;
}
var point2D: Point2D = { x: 0, y: 10 }
var point3D: Point3D = { x: 0, y: 10, z: 20 }
function iTakePoint2D(point: Point2D) { /* hace algo */ }

iTakePoint2D(point2D); // coincidencia exacta ok
iTakePoint2D(point3D); // información extra ok
iTakePoint2D({ x: 0 }); // Error: falta información `y`
```

## Varianza

La varianza es un concepto importante y fácil de entender para el análisis de compatiblidad.

Para los tipos simples `Base` y `Child`, si `Child` es un hijo de `Base`, entonces instancias de `Child` pueden ser asignadas a variables de tipo `Base`.

> Esto es polimorfismo 101

En cuanto a casos de tipos complejos, la compatibilidad depende de la *varianza*:

* Covariante: (co === conjunta) solo en la *misma dirección*.
* Contravariante: (contra === negativa) solo en la *dirección opuesta*.
* Bivariante: (bi === ambas) ambas son co y contra.
* Invariante: si los tipos no son exactamente iguales entonces son incompatibles.

> Nota: Para un sistema de tipos completamente seguro en la presencia de datos mutables como en JavaScript, la única opción válida es `invariante`. Pero como mencionamos, la *comodidad* nos fuerza a realizar elecciones menos seguras.

## Funciones

Hay algunas sutilezas a considerar al comparar dos funciones.

### Tipo de devolución

`covariant`: El tipo de devolución debe contener por lo menos sufientes datos

```ts
/** Jerarquía de Tipos */
interface Point2D { x: number; y: number; }
interface Point3D { x: number; y: number; z: number; }

/** Dos funciones muestra */
let iMakePoint2D = (): Point2D => ({ x: 0, y: 0 });
let iMakePoint3D = (): Point3D => ({ x: 0, y: 0, z: 0 });

/** Asignación */
iMakePoint2D = iMakePoint3D; // Okay
iMakePoint3D = iMakePoint2D; // ERROR: Point2D is not assignable to Point3D
```

### Número de argumentos

Menos argumentos está bien (es decir, las funciones pueden elegir ignorar parámetros adicionales). Despues de todo, tienen la garantía de que serán llamados con, por lo menos, los parámetros necesarios.

```ts
let iTakeSomethingAndPassItAnErr
    = (x: (err: Error, data: any) => void) => { /* hace algo */ };

iTakeSomethingAndPassItAnErr(() => null) // Okay
iTakeSomethingAndPassItAnErr((err) => null) // Okay
iTakeSomethingAndPassItAnErr((err, data) => null) // Okay

// ERROR: Argument of type '(err: any, data: any, more: any) => null' is not assignable to parameter of type '(err: Error, data: any) => void'.
iTakeSomethingAndPassItAnErr((err, data, more) => null);
```

### Parámetros rest y opcionales

Parámetros opcionales (cantidad predeterminada) y Rest (cualquier cantidad de argumentos) son compatibles, de nuevo, por comodidad.

```ts
let foo = (x:number, y: number) => { /* hace algo */ }
let bar = (x?:number, y?: number) => { /* hace algo */ }
let bas = (...args: number[]) => { /* hace algo */ }

foo = bar = bas;
bas = bar = foo;
```

> Nota los parámetros opcionales (en nuestro ejemplo, `bar`) y no opcionales (en nuestro ejemplo `foo`) únicamente son compatibles si `strictNullChecks` es falso.

### Tipos de argumentos

`bivariant` : Esto está diseñado para soportar escenarios comunes de manejo de eventos

```ts
/** Jerarquía de eventos */
interface Event { timestamp: number; }
interface MouseEvent extends Event { x: number; y: number }
interface KeyEvent extends Event { keyCode: number }

/** Ejemplo de detector de eventos */
enum EventType { Mouse, Keyboard }
function addEventListener(eventType: EventType, handler: (n: Event) => void) {
    /* ... */
}

// Poro seguro pero útil y común. Funciona como un argumento de función. La comparación es bivariante.
addEventListener(EventType.Mouse, (e: MouseEvent) => console.log(e.x + "," + e.y));

// Alternativa no deseada en presencia de firmeza
addEventListener(EventType.Mouse, (e: Event) => console.log((<MouseEvent>e).x + "," + (<MouseEvent>e).y));
addEventListener(EventType.Mouse, <(e: Event) => void>((e: MouseEvent) => console.log(e.x + "," + e.y)));

// No está permitido (error claro). La seguridad de tipos está impuesta por la total incompatibilidad de tipos
addEventListener(EventType.Mouse, (e: number) => console.log(e));
```

Esto también hace que `Array<Child>` sea asignable a `Array<Base>` (covarianza) ya que las funciones son compatibles. La covarianza de arrays requiere que todas las funciones `Array<Child>` sean asignables a `Array<Base>`. Por ejemplo, `push(t: Child)` es asignable a `push(t: Base)`. Esto es permitido por la bivarianza de los argumentos de la función.

**Esto puede ser confuso para desarrolladores que vienen de otros lenguages** quienes esperarían que lo siguente tire un error, aunque no lo hará en TypeScript:

```ts
/** Jerarquía de tipos */
interface Point2D { x: number; y: number; }
interface Point3D { x: number; y: number; z: number; }

/** Dos funciones de muestra */
let iTakePoint2D = (point: Point2D) => { /* hace algo */ }
let iTakePoint3D = (point: Point3D) => { /* hace algo */ }

iTakePoint3D = iTakePoint2D; // OK : Razonable
iTakePoint2D = iTakePoint3D; // OK : QUÉ
```

## Enums

* Los Enums son compatibles con números y los números son compatibles con enums.

```ts
enum Status { Ready, Waiting };

let status = Status.Ready;
let num = 0;

status = num; // OK
num = status; // OK
```

* Los valores Enum de diferentes tipos Enum son considerados incompatibles. Esto hace que los enums sean usables *nominalmente* (en vez de estructuralmente).

```ts
enum Status { Ready, Waiting };
enum Color { Red, Blue, Green };

let status = Status.Ready;
let color = Color.Red;

status = color; // ERROR
```

## Clases

* Solo miembros y métodos de instancias son comparados. Los *constructures* y *estáticos* no influyen.

```ts
class Animal {
    feet: number;
    constructor(name: string, numFeet: number) { /** hace algo */ }
}

class Size {
    feet: number;
    constructor(meters: number) { /** hace algo */ }
}

let a: Animal;
let s: Size;

a = s;  // OK
s = a;  // OK
```

* Los miembros `private` y `protected` *deben surgir de la misma clase*. Estos miembros esencialmente convierten a la clase en *nominal*.

```ts
/** Jerarquía de clase */
class Animal { protected feet: number; }
class Cat extends Animal { }

let animal: Animal;
let cat: Cat;

animal = cat; // OKAY
cat = animal; // OKAY

/** Se ve igual que Animal */
class Size { protected feet: number; }

let size: Size;

animal = size; // ERROR
size = animal; // ERROR
```

## Genéricos

Dado que TypeScript tiene un sistema de tipos estructural, los tipos de parámetros solo afectan la compatibilidad cuando son usados por un miembro. Por ejemplo, en el siguente caso `T` no tiene impacto sobre la compatibilidad:

```ts
interface Empty<T> {
}
let x: Empty<number>;
let y: Empty<string>;

x = y;  // ok, y tiene la misma estructura que x
```

Sin embargo, si `T` es usada, jugará un rol en la compatibilidad en base a su *instanciación*, como mostramos a continuación:

```ts
interface NotEmpty<T> {
    data: T;
}
let x: NotEmpty<number>;
let y: NotEmpty<string>;

x = y;  // error, x e y no son compatibles
```

En casos donde los argumentos genéricos aún no han sido *instanciados*, son substituidos por `any` antes de controlar la compatibilidad:

```ts
let identity = function<T>(x: T): T {
    // ...
}

let reverse = function<U>(y: U): U {
    // ...
}

identity = reverse;  // Okay porque (x: any)=>any coincide con (y: any)=>any
```

Los genéricos que involucran a clases son equiparados por compatibilidad a nivel de la clase, como mencionamos previamente. Por ejemplo:

```ts
class List<T> {
  add(val: T) { }
}

class Animal { name: string; }
class Cat extends Animal { meow() { } }

const animals = new List<Animal>();
animals.add(new Animal()); // OK 
animals.add(new Cat()); // OK 

const cats = new List<Cat>();
cats.add(new Animal()); // Error 
cats.add(new Cat()); // OK
```

## Nota al pie: invariancia

Dijimos que la invariancia es la única opción segura. Aquí hay un ejemplo donde mostramos como tanto la varianza `co` y `contra` son inseguras para arrays:

```ts
/** Jerarquía */
class Animal { constructor(public name: string){} }
class Cat extends Animal { meow() { } }

/** una instancia de cada uno */
var animal = new Animal("animal");
var cat = new Cat("cat");

/**
 * Demo : polimorfismo 101
 * Animal <= Cat
 */
animal = cat; // OK
cat = animal; // ERROR: cat extends animal

/** Array de cada uno para demostrar varianza */
let animalArr: Animal[] = [animal];
let catArr: Cat[] = [cat];

/**
 * Obviamente malo : Contravarianza
 * Animal <= Cat
 * Animal[] >= Cat[]
 */
catArr = animalArr; // OK si contravarianca
catArr[0].meow(); // Permitido pero BANG 🔫 en tiempo de ejecución


/**
 * También malo : covarianza
 * Animal <= Cat
 * Animal[] <= Cat[]
 */
animalArr = catArr; // OK si covarianza
animalArr.push(new Animal('another animal')); // Pusimos un animal en catArr!
catArr.forEach(c => c.meow()); // Permitido pero BANG 🔫 en tiempo de ejecución
```

---

## Fuente: `typescript-book/docs/types/type-inference.md`

# Inferencia de tipos en TypeScript

TypeScript puede inferir (y luego controlar) el tipo de una variable basándose en un conjunto de reglas simples. Gracias a que estas reglas son simples, podrán entrenar a su cerebro para reconocer código seguro / inseguro ( para nosotros ocurrió relativamente rápido).

> 
TypeScript can infer (and then check) the type of a variable based on a few simple rules. Because these rules
are simple you can train your brain to recognize safe / unsafe code (it happened for me and my teammates quite quickly).

> Los tipos que fluyen es exactamente como me imagino en mi cerebro el flujo de información de tipo.

## Definición de variables

Los tipos de las variables son inferidos por definición.

```ts
let foo = 123; // foo es `number`
let bar = "Hello"; // bar es `string`
foo = bar; // Error: cannot assign `string` to a `number`
```

Este es un ejempo de tipos fluyenod de derecha a izquierda.

## Tipos de devoluciones de funciones

El tipo de devolución es inferido por la declaración de devolución. Por ejemplo, la siguiente función infiere que debe devolver un `number`.

```ts
function add(a: number, b: number) {
    return a + b;
}
```

Este es un ejemplo de tipos fluyendo de abajo hacia afuera.

## Asignación

El tipo de los parámetros / valores de devolución de una función también pueden ser inferidos por asignación. Por ejemplo, digamos que `foo` es un `Adder`, que convierte a los tipos de `a` y `b` en `number`.

```ts
type Adder = (a: number, b: number) => number;
let foo: Adder = (a, b) => a + b;
```

Esto puede ser demostrado por el código que sigue, que tira un error tal como esperamos:

```ts
type Adder = (a: number, b: number) => number;
let foo: Adder = (a, b) => {
    a = "hello"; // Error: cannot assign `string` to a `number`
    return a + b;
}
```

Este es un ejemplo de tipos fluyendo de izquierda a derecha.

La misma inferencia de tipos de estilo de *asignación* funciona si crean una función para un argumento de devolución de llamada. Después de todo, un `argumento -> parametro` es nada menos que otra forma de asignación de variables.

```ts
type Adder = (a: number, b: number) => number;
function iTakeAnAdder(adder: Adder) {
    return adder(1, 2);
}
iTakeAnAdder((a, b) => {
    // a = "hello"; // Would Error: cannot assign `string` to a `number`
    return a + b;
})
```

## Estructuración

Estas reglas simples también funcionan en la presencia de **estructuración** (creación de objetos literales). Por ejemplo, en el siguiente caso se infiere que el tipo de `foo` es `{a: number, b: number}`

```ts
let foo = {
    a: 123,
    b: 456
};
// foo.a = "hello"; // Would Error: cannot assign `string` to a `number`
```

Los arrays funcionan de forma similar:

```ts
const bar = [1,2,3];
// bar[0] = "hello"; // Would error: cannot assign `string` to a `number`
```

Y por supuesto cualquier anidación: 

```ts
let foo = {
    bar: [1, 3, 4]
};
// foo.bar[0] = 'hello'; // Would error: cannot assign `string` to a `number`
```

## Desestructuración

Y por supuesto, también funcionan con desestructuración de objetos:

```ts
let foo = {
    a: 123,
    b: 456
};
let {a} = foo;
// a = "hello"; // Would Error: cannot assign `string` to a `number`
```

y arrays:

```ts
const bar = [1, 2];
let [a, b] = bar;
// a = "hello"; // Would Error: cannot assign `string` to a `number`
```

Y si el parámetro de la función puede ser inferido, también lo pueden ser sus propiedades desestructuradas. Por ejemplo, en el siguiente caso desestructuramos el argumento a sus miembros `a`/`b`.

```ts
type Adder = (numbers: { a: number, b: number }) => number;
function iTakeAnAdder(adder: Adder) {
    return adder({ a: 1, b: 2 });
}
iTakeAnAdder(({a, b}) => { // Los tipos de `a` y `b` son inferidos
    // a = "hello"; // Would Error: cannot assign `string` to a `number`
    return a + b;
})
```

## Guardias de tipos

Ya hemos visto como las [Guardias de tipos](./typeGuard.md) ayudan a cambiar y restringir los tipos (especialmente en casos de uniones). Las guardias de tipo son simplemente otra forma de inferencia de tipo para una variable dentro de un bloque.

## Advertencias

### Tengan cuidado con los parámetros

Los tipos no fluyen hacia los parámetros de funciones si no pueden ser inferidos a partir de una asignación. Por ejemplo, en el sigueinte caso el compilador no sabe el tipo de `foo`, por lo que no puede inferir los tipos de `a` o `b`.

```ts
const foo = (a,b) => { /* hace algo */ };
```

Sin embargo, si `foo` tuviese tipo, los parámetros de la función podrían ser inferidos (Se infiere que tanto `a` como `b` son números en el ejemplo que sigue).

```ts
type TwoNumberFunction = (a: number, b: number) => void;
const foo: TwoNumberFunction = (a, b) => { /* hace algo */ };
```

### Tengan cuidado con las devoluciones

A pesar de que TypeScript en general puede inferir el tipo de la devolución de una función, este puede no ser el que esperan. Por ejemplo, aquí `foo` tiene una devolución de tipo `any`.

```ts
function foo(a: number, b: number) {
    return a + addOne(b);
}
// Una función de una librería externa que alguien escribió en JavaScript
function addOne(a) {
    return a + 1;
}
```

Esto se debe a que el tipo de la devolución es impactado por la baja calidad de definiciones de tipo de `addOne` (`a` es de tipo `any`, por lo que la devolución de `addOne` es `any`, por lo que la devolución de `foo` es `any`).

> Nos parece más simple ser siempre explícito sobre los retornos de función. Después de todo, estas anotaciones son un teorema y el cuerpo de la función es la prueba.

Hay otros casos que uno puede imaginar, pero las buenas noticias es que existe una bandera del compilador que permite atrapar estas bugs.

## `noImplicitAny`

La bandera `noImplicitAny` le indica al compilador que levante un error si no puede inferir el tipo de una variable (y por lo tanto sólo puede definirla implícitamente como de tipo `any`). De esta manera pueden

* decir que *sí quieren que sea de tipo `any`* agregando la anotación `: any` *explícitamente*;
* ayudar al compilador agregando algunas anotaciones más *correctas*.

---

## Fuente: `typescript-book/docs/types/type-system.md`

# Sistema de tipos de TypeScript
Cubrimos las características del sistema de tipado de TypeScript cuando discutimos [por qué TypeScript?](../why-typescript.md). Las siguientes son algunas de las de las conclusiones de esa discusión que no requieren mayores explicaciones:
* El sistema de tipos de TypeScript está diseñado para ser *opcional* de manera que tu *JavaScript es TypeScript*.
* TypeScript no bloquea la *emisión de JavaScript* si hay Errores de Tipo presentes, lo que permite *migrar de JS a TS progresivamente*.

Ahora empecemos a mirar la *sintaxis* del sistema de tipos de TypeScript. De esta manera, pueden empezar a usar anotaciones en su código inmediatamente y obtener los beneficios. Esto los preparará para profundizar luego.

## Anotaciones básicas
Como mencionamos previamente, los Tipos son anotados usando la sintaxis `:AnotacionDeTipo`. Cualquier cosa que se encuentre disponible en el espacio de declaración de tipos puede ser usada como Anotación de Tipo.

El siguiente ejemplo demuestra la anotación de tipo para variables, parámetros de funciones y valores de devolución de funciones:

```ts
var num: number = 123;
function identity(num: number): number {
    return num;
}
```

### Tipos primitivos
Los tipos primitivos de JavaScript se encuentran bien representados en el sistema de tipos de TypeScript. Es decir, `string`, `number`, `boolean`, como demostramos a continuación:

```ts
var num: number;
var str: string;
var bool: boolean;

num = 123;
num = 123.456;
num = '123'; // Error

str = '123';
str = 123; // Error

bool = true;
bool = false;
bool = 'false'; // Error
```

### Arrays
TypeScript provee una sintaxis de tipo dedicada a arrays para facilitarles la anotación y documentación de su código. La sintaxis consiste, básicamente, en añadir `[]` luego de cualquier anotación de tipo válida (por ejemplo, `:boolean[]`). Esto les permite manipular arrays normalmente de forma segura y los protege de errores como asignar miembros del tipo incorrecto. Ejemplo a continuación:

```ts
var boolArray: boolean[];

boolArray = [true, false];
console.log(boolArray[0]); // true
console.log(boolArray.length); // 2
boolArray[1] = true;
boolArray = [false, false];

boolArray[0] = 'false'; // Error!
boolArray = 'false'; // Error!
boolArray = [true, 'false']; // Error!
```

### Interfaces
Las interfaces son la forma central de TypeScript para combinar anotaciones de tipo múltiples en una única anotación nombrada. Consideren el siguiente ejemplo:

```ts
interface Name {
    first: string;
    second: string;
}

var name: Name;
name = {
    first: 'John',
    second: 'Doe'
};

name = {           // Error : `second` is missing
    first: 'John'
};
name = {           // Error : `second` is the wrong type
    first: 'John',
    second: 1337
};
```

Aquí hemos combinado las anotaciones `first: string` + `second: string` en una nueva anotación `Name`, que hace cumplir los tipos de sus miembros individuales. Las interfaces tienen mucho poder en TypeScript, por lo que dedicaremos una sección completa a mostrate como usarlas a tu favor.

### Anotaciones de tipo en línea
En lugar de crear una nueva `interface`, también puedes anotar cualquiera cosa que quieras *en línea* usando: `{/* Structure */}`. Presentamos de nuevo el ejemplo anterior con anotaciones de tipo en línea:

```ts
var name: {
    first: string;
    second: string;
};
name = {
    first: 'John',
    second: 'Doe'
};

name = {           // Error : `second` is missing
    first: 'John'
};
name = {           // Error : `second` is the wrong type
    first: 'John',
    second: 1337
};
```

Los tipos en línea son una gran manera de proveer anotaciones de tipo únicas rápidamente. Les ahorarrá el esfuerzo de tener que inventar un (potencialmente malo) nombre para un tipo. Sin embargo, si se encuentran usando la misma anotación en línea múltiples veces, es una buena idea considerar refactorizarla a una interface (o a un `type alias`, como cubriremos más adelante en esta sección).

## Tipos especiales
Más allá de los tipos primitivos que hemos cubierto, existen algunos tipos que tienen significado especial en TypeScript. Estos son `any`, `null`, `undefined`, `void`.

### any
El tipo `any` tiene un lugar especial en el sistema de tipos de TypeScript. Nos da una puerta de salida del sistema de tipos con la que decirle al compilador que deje de molestar. `any` es compatible con *cualquier y todos* los tipos del sistema de tipos. Esto significa que *cualquier cosa puede ser asignada a él* y que *él puede ser asignado a cualquier cosa*. Lo demostramos a continuación:

```ts
var power: any;

// Acepta cualquier y todos los tipos
power = '123';
power = 123;

// Es compatible con todos los tipos
var num: number;
power = num;
num = power;
```

Si están migrando código JavaScript a TypeScript, van a ser grandes amigos con `any` al comienzo. Sin embargo, no tomen a esta amistad muy seriamente ya que significa que *depende de ustedes garantizar la seguridad de tipo*. Básicamente, están diciéndole al compilador que *no haga ningún análisis estático significativo*.

### `null` y `undefined`

Los literals de JavaScript `null` y `undefined` son tratados en el sistema de tipos de la misma manera que algo de tipo `any`. Estos literales pueden ser asignados a cualquier otro tipo. Esto es demostrado a continuación:

```ts
var num: number;
var str: string;

// Estos literales pueden ser asignados a cualquier cosa
num = null;
str = undefined;
```

### `:void`
Usen `:void` para señalar que una función no tiene un tipo de devolución:

```ts
function log(message): void {
    console.log(message);
}
```

## Genéricos
Muchos algoritmos y estructuras de datos en ciencias de la computación no dependen del *tipo real* del objeto. Sin embargo, querrán imponer una restricción entre varias variables. Un simple ejemplo es una función que acepta un lista de ítems y devuelve una lista de ítems invertida. La restricción aquí se encuentra entre lo que es pasado a la función y lo que es devuleto por ella:

```ts
function reverse<T>(items: T[]): T[] {
    var toreturn = [];
    for (let i = items.length - 1; i >= 0; i--) {
        toreturn.push(items[i]);
    }
    return toreturn;
}

var sample = [1, 2, 3];
var reversed = reverse(sample);
console.log(reversed); // 3,2,1

// Seguridad!
reversed[0] = '1';     // Error!
reversed = ['1', '2']; // Error!

reversed[0] = 1;       // Ok
reversed = [1, 2];     // Ok
```

Aquí estás básicamente diciendo que la función `reverse` toma un array (`items: T[]`) de *algún* tipo `T` (notemos el parámetro de tipo en `reverse<T>`) y devuelve un array de tipo `T` (notemos `:T[]`). Dado que la función `reverse` devuelve ítems del mismo tipo que los reque recibe, TypeScript sabe que la variable `reversed` también es de tipo `number[]` y les dará seguridad de tipos. Similarmente, si pasan un array de tipo `string[]` a la función `reverse`, el resultado devuelto también será un array de tipo `string[]` y te dará la misma seguridad de tipo. Lo demostramos a continuación:

```ts
var strArr = ['1', '2'];
var reversedStrs = reverse(strArr);

reversedStrs = [1, 2]; // Error!
```

De hecho, los arrays de JavaScript ya tienen una función `.reverse` y TypeScript usa genéricos para definir su estructura:
```ts
interface Array<T> {
 reverse(): T[];
 // ...
}
```

Esto significa que obtienen seguridad de tipo al llamar `.reverse` en cualquier array, como mostramos a continuación:

```ts
var numArr = [1, 2];
var reversedNums = numArr.reverse();

reversedNums = ['1', '2']; // Error!
```

Discutiremos más sobre la interface `Array<T>` luego, cuandro presentemos `lib.d.ts` en la sección **Declaraciones ambientales**.

## Tipo unión
Comúnmente en JavaScript querran permitir que una propiedad sea de múltiples tipos. Por ejemplo, *una `string` o un `number`*. Aquí es donde el *tipo unión* (denotado por `|` en una anotación de tipos: `string|number`) es útil. Un caso de uso común es una función que puede aceptar un único objeto o un array del objeto:
```ts
function formatCommandline(command: string[]|string) {
    var line = '';
    if (typeof command === 'string') {
        line = command.trim();
    } else {
        line = command.join(' ').trim();
    }

    // Haz algo con line: string
}
```

## Tipo Intersección
`extend` es un patrón muy común en JavaScript, en el que tomamos dos objetos y creamos uno nuevo que tiene las características de ambos objetos. Un **Tipo Intersección** nos permite usar este patrón de forma segura, como mostramos a continuación:

```ts
function extend<T, U>(first: T, second: U): T & U {
    let result = <T & U> {};
    for (let id in first) {
        result[id] = first[id];
    }
    for (let id in second) {
        if (!result.hasOwnProperty(id)) {
            result[id] = second[id];
        }
    }
    return result;
}

var x = extend({ a: "hello" }, { b: 42 });

// x ahora tiene tanto `a` como `b`
var a = x.a;
var b = x.b;
```

## Tipo Tuple
JavaScript no tiene soporte de primer clase para tuples. La gente generalmente usa un array como un tuple. Esto es exactamente lo que el sistema de tipos de TypeScript soporta. Los tuples pueden ser anotados usando `: [tipodemiembro1, tipodemiembro2]`, etc. Un tuple puede tener cualquier cantidad de miembros. Los tuples son demostrados en el ejemplo que sigue:

```ts
var nameNumber: [string, number];

// Ok
nameNumber = ['Jenny', 8675309];

// Error!
nameNumber = ['Jenny', '867-5309'];
```

Al combinar esto con el soporte a desestructuración de TypeScript, los tuples se sienten de primera clase a pesar de ser, por debajo, arrays:

```ts
var nameNumber: [string, number];
nameNumber = ['Jenny', 8675309];

var [name, num] = nameNumber;
```

## Tipo Alias
TypeScript provee una sintaxis conveniente para proveer nombres para anotaciones de tipo que podríamos querer utilizar en más de un lugar. Los alias son creados usando la sintaxis `type SomeName = someValidTypeAnnotation` syntax. A continuación mostramos un ejemplo:

```ts
type StrOrNum = string|number;

// Uso: igual que cualquier otra anotación
var sample: StrOrNum;
sample = 123;
sample = '123';

// Solo chequeando
sample = true; // Error!
```

A diferencia de una `interface` pueden dar un tipo alias a literalmetne cualquier anotación de tipo (útil para cosas como tipos unión e intersección). Aquí hay algunos ejemplso extra que los ayudarán a familiarizarse con la sintaxis:

```ts
type Text = string | { text: string };
type Coordinates = [number, number];
type Callback = (data: string) => void;
```

> TIP: Si necesitan tener jerarquías de anotaciones de tipo, usen una `interface` ya que pueden ser usada con `implements` y `extends`.

> TIP: Usen un tipo alias para estructuras de objetos más simples (como `Coordinates`) para darles un nombre semántico. Adicionalmente, cuando quieran darle un nombre semántico a tipos unión o intersección, un tipo Alias es la mejor opción.

## Resumen
Ahora que puede empezar a anotar la mayor parte de tu cóidog JavaScript, podemos saltar a los detalles que le dan su poder al sistema de tipado de TypeScript.

---

## Fuente: `typescript-book/docs/types/typeGuard.md`

* [Guardia de tipos](#type-guard)
* [Guardias de tipo definidas por el usuario](#user-defined-type-guards)

## Guardia de tipos
Las guardias de tipos les permitirán reducir los posibles tipos de un objeto dentro de un bloque condicional.

### typeof

TypeScript está al tanto del uso de los operadores `instanceof` y `typeof` de JavaScript. Si los usan en un bloque condicional, TypeScript entenderá que el tipo de la variable es diferente al interior de ese bloque condicional. Aquí mostramos un ejemplo corto en el que TypeScript se da cuenta que una función en particular no existe en `string` y señala que esto probablemente haya sido causado por un error de tipeo del usuario:

```ts
function doSomething(x: number | string) {
    if (typeof x === 'string') { // Dentro del bloque TypeScript sabe que `x` debe ser una string
        console.log(x.subtr(1)); // Error, 'subtr' no existe en `string`
        console.log(x.substr(1)); // OK
    }
    x.substr(1); // Error: No hay garantía de que `x` sea una `string`
}
```

### instanceof

Aquí hay un ejemplo con una clase e `instanceof`:

```ts
class Foo {
    foo = 123;
    common = '123';
}

class Bar {
    bar = 123;
    common = '123';
}

function doStuff(arg: Foo | Bar) {
    if (arg instanceof Foo) {
        console.log(arg.foo); // OK
        console.log(arg.bar); // Error!
    }
    if (arg instanceof Bar) {
        console.log(arg.foo); // Error!
        console.log(arg.bar); // OK
    }

    console.log(arg.common); // OK
    console.log(arg.foo); // Error!
    console.log(arg.bar); // Error!
}

doStuff(new Foo());
doStuff(new Bar());
```

TypeScript incluso entiende `else`, así que cuando un `if` descarta un tipo, sabe que dentro del bloque `else` *defintiivamente no será ese tipo*. Aquí hay un ejemplo:

```ts
class Foo {
    foo = 123;
}

class Bar {
    bar = 123;
}

function doStuff(arg: Foo | Bar) {
    if (arg instanceof Foo) {
        console.log(arg.foo); // OK
        console.log(arg.bar); // Error!
    }
    else {  // DEBE SER Bar!
        console.log(arg.foo); // Error!
        console.log(arg.bar); // OK
    }
}

doStuff(new Foo());
doStuff(new Bar());
```

### in 

El operador `in` hace un chequeo de seguridad respecto de la existencia de una propiedad en un objeto y puede ser usado como una guardia de tipo:

```ts
interface A {
  x: number;
}
interface B {
  y: string;
}

function doStuff(q: A | B) {
  if ('x' in q) {
    // q: A
  }
  else {
    // q: B
  }
}
```

### Guardias de tipos literales

Cuando tengan tipos literales en una unión pueden controlarlos para diferenciar, por ejemplo:

```ts
type Foo = {
  kind: 'foo', // Tipo literal 
  foo: number
}
type Bar = {
  kind: 'bar', // Tipo literal 
  bar: number
}

function doStuff(arg: Foo | Bar) {
    if (arg.kind === 'foo') {
        console.log(arg.foo); // OK
        console.log(arg.bar); // Error!
    }
    else {  // DEBE SER Bar!
        console.log(arg.foo); // Error!
        console.log(arg.bar); // OK
    }
}
```

### Guardias de tipo definidas por el usuario
JavaScript no tiene soporte para un sistema de introspección durante tiempo de ejecución incluído. Cuando estén usando objetos de JavaScript simples (usando el tipeo estructural para su conveniencia), ni siquiera tendrán que tener acceso a `instanceof` o `typeof`. Para estos casos podrán crear *Guardias de tipo definidas por el usuario*. Estas son funciones que deuelven `unArgumento is UnTipo`. Aquí hay un ejemplo:

```ts
/**
 * Algunas interfaces
 */
interface Foo {
    foo: number;
    common: string;
}

interface Bar {
    bar: number;
    common: string;
}

/**
 * Guardia de tipo definida por el usuario!
 */
function isFoo(arg: any): arg is Foo {
    return arg.foo !== undefined;
}

/**
 * Ejemplo de uso de las Guardias de tipo definidas por el usuario
 */
function doStuff(arg: Foo | Bar) {
    if (isFoo(arg)) {
        console.log(arg.foo); // OK
        console.log(arg.bar); // Error!
    }
    else {
        console.log(arg.foo); // Error!
        console.log(arg.bar); // OK
    }
}

doStuff({ foo: 123, common: '123' });
doStuff({ bar: 123, common: '123' });
```

### Guardias de tipo y devoluciones de llamada

TypeScript no asume que las guardias de tipo continuan activas en las devoluciones de llamada, ya que esta suposición es peligrosa. Por ejemplo:

```js
// Ejemplo
declare var foo:{bar?: {baz: string}};
function immediate(callback: () => void) {
  callback();
}


// Guardia de tipo
if (foo.bar) {
  console.log(foo.bar.baz); // Okay
  functionDoingSomeStuff(() => {
    console.log(foo.bar.baz); // TS error: Object is possibly 'undefined'"
  });
}
```

La solución es tan sencilla como guardar el valor seguro inferido en una variable local, asegurandonos automáticamente que no es cambiado externamente, y TypeScript puede entender eso fácilmente:

```js
// Gardia de tipo
if (foo.bar) {
  console.log(foo.bar.baz); // Okay
  const bar = foo.bar;
  functionDoingSomeStuff(() => {
    console.log(bar.baz); // Okay
  });
}
```

---

## Fuente: `typescript-book/docs/why-typescript.md`

# Por qué TypeScript
Hay dos objetivos principales de TypeScript: 
* Proveer un *systema tipado opcional* para Javascript
* Proveer características de futuras ediciones de Javascript a motores actuales de Javascript


El por qué de estos objetivos se explica a continuación

## El sistema tipado de typescript

Puedes estar preguntandote "**Por qué agregar tipos a Javascript?**"

Los tipos han provado su habilidad para mejorar la calidad y comprensibilidad del código. Equipos grandes (Google, Microsoft, Facebook) han alcanzado esta conclusion multiples veces. Específicamente:

* Los tipos mejoran la velocidad cuando hay que refactorizar. *Es mejor que el compilador atrape los errores a que fallen cosas en tiempo de ejecución*
* Los tipos son una de las mejores formas de documentación que se puede tener. *La firma de una función es un teorema y el cuerpo de la función es la prueba*

Sin embargo, los tipos tienen una característica de ser innecesariamente ceremoniales. TypeScript es muy particular en cuanto a mantener la barrera de entrada lo más baja posible. Así es como lo hace:

### Javascript es Typescript
TypeScript provee seguridad al momento de compilar para tu codigo JavaScript. Esto no es gran sorpresa dado su nombre. La ventaja es que los tipos son completamente opcionales. Tu código JavaScript en archivos `.js` pueden ser renombrados a `.ts` y Typescript igual devolverá un archivo `.js` válido e equivalente al archivo `.js` original. Typescript es *intencionalmente* y estrictamente un superconjunto de Javascript con chequeo de tipado opcional. 

### Los tipos pueden ser implicitos
TypeScript intentará inferir la máxima información posible sobre el tipo, para brindar seguirdad de tipo con un costo mínimo de productividad durante el desarrollo de código. Por ejemplo, en el siguiente ejemplo TypeScript sabrá que `foo` es de tipo `numero` y devolverá un error en la segunda línea (error en inglés: traducido al español): 

```ts
var foo = 123;
foo = '456'; // Error: cannot assign `string` to `number` (Error: no es posible asignar `string``a `numero`)

// Is foo a number or a string? (Es foo un número o una string?)
```

Esta inferencia del tipo esta bien motivada. Si haces cosas como las que se ven en este ejemplo, en tonces en el resto de tu código es imposible estar seguro sobre que `foo` es un `numero` o una `string`. Problemas de este tipo ocurren habitualmente en bases de código grandes y con múltiples archivos. Ahondaremos en las reglas sobre la inferencia de tipos más adelante.

### Los tipos pueden ser explícitos
Como hemos mencionado previamente, TypeScript inferirá lo máximo que pueda en forma segura. Sin embargo, puedes usar anotaciones para: 
1. Ayudar al compilador, y más importante, documentar cosas para el siguente desarrollador que deba leer tu código (podría ser el futuro vos!)
2. Imponer que lo que el compilador ve es lo que vos pensaste que debería ver. Es decir, tu entendimiento del código coincide con un análisis algorítmico del código (hecho por el compilador)

Typescript utiliza anotaciones de tipo postfix populares en otros lenguajes *opcionalmente* anotados (ejemplo, ActionScript y F#)

```ts
var foo: number = 123;
```
Si haces algo erróneo el compliador tirará un error:

```ts
var foo: number = '123'; // Error: cannot assign a `string` to a `number` (Error: no puedes asignar una `string` a un `numero`)
```

Discutiremos los detalles sobre qué anotaciones son soportadas por TypeScript en otro capítulo.

## Los tipos son estructurales
En algunos lenguages (específicamente de tipado nominal) el tipado estático resulta en complejidad innecesaria porque, que *vos sabés* que el código funcionará bien, la semántica del lenguaje te fuerza a copiar y duplicar cosas. Por eso, cosas como el [automapper de C#](http://automapper.org/) son *esenciales* para C#. En TypeScript, como queremos que sea sencillo de adoptar para desarrolladores Javascript, los tipos son *estructurales*. Esto significa que *duck typing* es una construcción del lenguage de primera clase. Considera el siguiente ejemplo. la funcion `yoAceptoPuntos2D` aceptará cualquier cosa que contenga todas las cosas (`x` e `y`) que espera: 

```ts
interface Punto2D {
    x: number;
    y: number;
}
interface Punto3D {
    x: number;
    y: number;
    z: number;
}
var punto2D: Punto2D = { x: 0, y: 10 }
var punto3D: Punto3D = { x: 0, y: 10, z: 20 }
function yoAceptoPuntos2D(punto: Punto2D) { /* hacé algo */ }

yoAceptoPuntos2D(punto2D); // coincidencia exacta okay
yoAceptoPuntos2D(punto3D); // información extra okay
yoAceptoPuntos2D({ x: 0 }); // Error: falta la información `y`
```

### Errores de typo no previenen que JavaScript emita
Para facilitar la migración de Javascript a Typescript, aunque hayan errores de compilación, por default Typescript emitirá *Javascript válido* de la mejor manera posible. Por ejemplo: 

```ts
var foo = 123;
foo = '456'; // Error: cannot assign a `string` to a `number` (Error: no es posible asignar `string` a `numero`)
```

emitirá el siguiente js:

```ts
var foo = 123;
foo = '456';
```

Así que podrás migrar tu Javascript a Typescript de manera incremental. Esto es muy diferente de como muchos otros copiladores de lenguajes funcionan y otra razón para cambiar a TypeScript.

### Los tipos pueden ser ambientes
Uno de los principales objetivos en el diseño de TypeScript fue permitirte utilizar librerias existentes de JavaScript en TypeScript. TypeScript permite esto a través de la *declaración*. TypeScript te provee con una escala móvil respecto de cuánto esfuerzo quieres poner en tus declaraciones. A mayor esfuerzo, más seguridad + inteligencia en el código que obtenés. Notá que las definiciones para las librerias más populares ya han sido escritas para ti por la [comunidad DefinitelyTyped](https://github.com/borisyankov/DefinitelyTyped). Por lo tanto, para la mayoría de los casos: 

1. El archivo con definiciones ya existe, o
2. por lo menos, hay una larga lista de modelos de declaraciones de TypeScript ya revisadas

A modo de ejemplo sobre como podrías escribir tu propio archivo de declaraciones, considerá un ejemplo trivial de [jquery](https://jquery.com/). Por default (como es de esperar en buen código JS) TypeScript espera que declares (es decir, utilices `var` en algún lugar), antes de utilizar una variable.

```ts
$('.genial').show(); // Error: cannot find name `$` (Error: no es posible encontrar el nombre `$`)
```
A modod de solución, *le puedes indicar a TypeScript* que existe algo llamado `$`: 
```ts
declare var $: any;
$('.genial').show(); // Ok!
```
Si quieres puedes construir sobre esta definición básica y proveer más información para ayudar a protegerte de errores: 
```ts
declare var $: {
    (selector:string): any;
};
$('.genial').show(); // Ok!
$(123).show(); // Error: selector needs to be a string (Error: el selector tiene que ser una string)
```

Discutiremos los detalles sobre create definiciones de Typescript para JavaScript ya existente en mayor detalle una vez que sepas mas sobre TypeScript. (por ejemplo, sobre cosas como `interfaces` y el tipo `any`).

## Javascript Futuro => Ahora
TypeScript provee un número de caracterísiticas ya están planeadas en ES6 para motores actuales de Javascript (que solo soportan ES5, etc). El equipo de TypeScript agrega estas características contantemente y esta lista solo va a crecer a lo largo del tiempo. Cubriremos esta temática en su propia sección. Pero, a modo de vistazo, aquí hay un ejemplo de una clase: 

```ts
class Point {
    constructor(public x: number, public y: number) {
    }
    add(point: Point) {
        return new Point(this.x + point.x, this.y + point.y);
    }
}

var p1 = new Point(0, 10);
var p2 = new Point(10, 20);
var p3 = p1.add(p2); // { x: 10, y: 30 }
```

y la adorable función de flecha gorda:

```ts
var inc = x => x+1;
```

### Resumen
En esta sección hemos cubierto el por qué de TypeScript y los objetivos de su diseño. Ahora podremos adentrarnos en los detalles esenciales de Typescript.

[](Interfaces are open ended)
[](Type Inferernce rules)
[](Cover all the annotations)
[](Cover all ambients : also that there are no runtime enforcement)
[](.ts vs. .d.ts)

---

## Fuente: `asombroso-ddd/README.md`

# Asombroso DDD
> Una lista cuidadosamente curada de recursos sobre Domain Driven Design, Eventos, Event Sourcing, Command Query Responsibility Segregation (CQRS).

**Curado por [DDD Español](https://ddd-espanol.github.io/). También puedes [seguirnos en Twitter](https://twitter.com/dddespanol).**

Aprender los conceptos básicos de Domain Driven Design puede ser una tarea dantesca. Si bien existen dos libros que son considerados clásicos ([Domain Driven Design: Tackling Complexity in the Heart of Software](http://amzn.to/2eT39TV) e [Implementing Domain Driven Design](http://amzn.to/2wOBb1H)), encontrar material en castellano puede tornarse complicado.

Por eso es que consideramos que tiene que existir una lista curada de recursos que faciliten este aprendizaje, ofreciendo además distintas opciones para que cada uno pueda elegir el camino que más le convenga a la hora de aprender cualquiera de estos conceptos.

## Tabla de Contenidos
- [Libros](#libros)
- [Artículos](#articulos)
- [Cursos](#cursos)
- [Videos](#videos)
- [Comunidades](#comunidades)
- [Blogs](#blogs)
- [Projectos Ejemplo](#projectos-ejemplo)
- [Librerías y Frameworks](#librerias-y-frameworks)
- [Entrevistas y Podcasts](#entrevistas-y-podcasts)
- [Conferencias](#conferencias)
- [Grupos de Usuarios](#grupos-de-usuarios)

## Libros

- [Domain Driven Design: Tackling Complexity in the Heart of Software](http://amzn.to/2eT39TV) [EN]
- [Implementing Domain Driven Design](http://amzn.to/2wOBb1H) [EN]
- [DDD Destilado by Vaughn Vernon y traducido por Carlos Buenosvinos](https://kalele.io/books/ddd-destilado/)

## Artículos

- [Resumen de Domain Driven Design de Eric Evans](http://tratandodeentenderlo.blogspot.nl/2013/08/domain-driven-design.html) - Artículo resumiendo brevemente el libro que comenzó con la revolución de [Domain Driven Design: Tackling Complexity in the Heart of Software](http://amzn.to/2eT39TV).
- [Una introducción a Domain Driven Design por Fran Iglesias](https://franiglesias.github.io/ddd-intro/) - Vamos a comenzar un pequeño proyecto para aprender y profundizar en Domain Driven Design.

## Cursos
- [Curso en Pluralsight](https://app.pluralsight.com/course-player?clipId=eadf1495-0a4f-4d80-89e1-96b8aeb07e7e) [EN] - Domain-Driven Design in Practice
- [Transparencias sobre Diseño Dirigido por el Dominio](https://github.com/UNIZAR-30249-LabIS/ddd-slides) - Curso de la asignatura "Laboratorio de Ingeniería del Software" del grado en ingeniería informática de la Universidad de Zaragoza, en la especialidad de ingeniería del software.

## Videos

- [Domain-Driven Design Tactical Patterns por Carlos Buenosvinos](https://www.youtube.com/watch?v=uvKS6UCUZes&list=PLfgj7DYkKH3DjmXTOxIMs-5fcOgDg_Dd2) - Excelente colección de videos sobre Domain Driven Design por [Carlos Buenosvinos](https://twitter.com/buenosvinos).
- [De código acoplado al framework a microservicios pasando por DDD](https://codely.tv/screencasts/codigo-acoplado-framework-microservicios-ddd/) - Una reseña completa con ejemplos de código en PHP, pasando por testing a desacoplar el código de la implementación.
- [Arquitectura Hexagonal](https://www.youtube.com/watch?v=GZ9ic9QSO5U&list=PLZVwXPbHD1KMsiA7ahRSbIwS3QMsQ0SbL&index=4) - Introducción a la Arquitectura Hexagonal o de Puertos y Adaptadores.
- [DDD Europa 2016](https://2016.dddeurope.com/#videos) [EN] - Videos con las ponencias durante DDD Europa 2016
- [DDD Europa 2017](https://2017.dddeurope.com/#videos) [EN] - Videos con las ponencias durante DDD Europa 2017
- [DDD Europa 2018](https://2018.dddeurope.com/#videos) [EN] - Videos con las ponencias durante DDD Europa 2018

- [Domain Driven Design (DDD) - Diseño guiado por el dominio - Evento de Endava](https://www.youtube.com/watch?v=Mn4TFBXa_2g&list=PLJAV8TRWMyvoOnqfERFwvLJaTnLV35SqW&index=31) - Video con pequeña explicación de DDD
## Comunidades

- [Grupo de Discusión DDD-es](https://groups.google.com/forum/#!forum/ddd-es) - Está un poco desactualizado y no se ve mucha actividad últimamente, pero el contenido que hay se mantiene actual.

- [Grupo de Linkedin Domain Driven Design En Español](https://www.linkedin.com/groups/8462099/profile) - No existen muchos miembros, pero podemos cambiar eso.

## Blogs

- [PHP, DevOps, Extreme Programming, Scrum and Domain-Driven Design](https://carlosbuenosvinos.com/) - No se dejen engañar por el título del blog en inglés, este es quizás uno de los mejores blogs en castellano sobre Domain Driven Design.

## Projectos Ejemplo

- [Proophesor-Do](https://github.com/prooph/proophessor-do) - Un ejemplo completo utilizando los componentes creados por [Prooph](http://getprooph.org/).

## Librerías y Frameworks

- [Broadway](https://github.com/broadway/broadway) - Una de las librerías más ampliamente usada en PHP para la creación sencilla de aplicaciones basadas en CQRS y Event Sourcing.
- [Prooph](http://getprooph.org/) - Serie de componentes creados en PHP para creación de Aplicaciones Enterprise. Muy modulares y muy bien preparados para trabajar con los framworks más utilizados actualmente.
- [Tactician](http://tactician.thephpleague.com/) - Muy simple y bien implementado CommandBus en PHP.

## Entrevistas y Podcasts

- Agrega el primer link

## Conferencias

- [DDD Europa](https://dddeurope.com/2018/) - Esta conferencia anual de DDD se lleva a cabo anualmente en Amsterdam y Bruselas, y reúne a los mejores autores del mundo.

## Grupos de Usuarios

- [Meetup Software Craftsmanship Alicante](https://www.meetup.com/Software-Craftsmanship-Alicante/)
- [Meetup Mallorca Software Craftsmanship](https://www.meetup.com/Mallorca-Software-Craftsmanship/)
- [DDD Madrid](https://www.meetup.com/dddmadrid/)
- [Barcelona Engineering Slack](https://bcneng.org/)

---
**Conexiones del Grafo (Obsidian):** [[INDEX]] · [[CANON_SOTA_RAG_ARCHITECTURES_AND_TOOLS_2026]] · [[CURATED_MASTER_BOOKS_AND_COURSES_2026]] · [[CANON_SOFTWARE_ENGINEERING_AT_GOOGLE]] · [[CANON_HARNESS_ENGINEERING_INTEGRAL_2026]] · #architecture_and_books
