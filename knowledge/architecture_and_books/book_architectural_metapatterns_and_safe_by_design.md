# 📚 Libro Completo: Architectural Metapatterns & Safe by Design (Pattern Language of Software Architecture)

> **Autor:** Denys Poltorak & Mykola Haliullin  
> **Fuente Verificada:** `EbookFoundation/free-programming-books-subjects.md` (https://github.com/denyspoltorak/publications.git, https://github.com/SanQri/safe-by-design.git)  
> **Dominio:** `architecture_and_books`  
> **Fecha de Ingesta:** 2026-10-27  

---

## Fuente: `publications/ArchitecturalMetapatterns/README.md`

This is the source directory for *Architectural Metapatterns: The Pattern Language of Software Architecture*.

Here you can download the latest version of the book as PDF, EPUB or ODT. Or you can read it online at the [dedicated website](https://metapatterns.io/) or [GitHub wiki](https://github.com/denyspoltorak/metapatterns/wiki).

[Introductory presentations](Slides/README.md) are also available.

The subfolders contain diagrams used throughout the book in SVG, PNG and VSDX formats. Sadly, color gradients were lost on saving LucidChart drawings to VSDX. Please contact me if you need access to the original diagrams.

Everything is licensed under [Creative Commons Attribution 4.0 International](LICENSE).

---

## Fuente: `publications/ArchitecturalMetapatterns/Slides/README.md`

# Presentations for Architectural Metapatterns

There are introductory presentations that summarize the main content of my book _Architectural Metapatterns_ (which is, surprisingly, an overview of architectural patterns):

## [Patterns of Patterns, and why we need them](https://speakerdeck.com/denyspoltorak/patterns-of-patterns-c322149c-fcdd-4df6-8c6c-f273c7ab17dd):
* The misery of having thousands of patterns.
* Local and distributed architectures are not dissimilar.
* Structure determines function.
* There are only so many elementary geometries.
* Which means that hundreds of patterns condense into several metapatterns.

## [Basic Architectures, the building blocks for complex systems](https://speakerdeck.com/denyspoltorak/basic-architectures):
* ___Monolith___ – a cohesive codebase.
* ___Shards___ – multiple instances of a (sub)system.
* ___Layers___ – subdivision by the level of abstractness.
* ___Services___ – components, dedicated to subdomains.
* ___Pipeline___ – a chain of data processing steps.

## [Architectural Extensions. Making use of specialized components](https://speakerdeck.com/denyspoltorak/architectural-extensions-c3e506c0-6472-4e2c-8113-b3d8ffa20d63):
* ___Middleware___ – communication and deployment.
* ___Shared Repository___ – persistence and synchronization.
* ___Proxy – protocols___, routing, and security.
* ___Orchestrator___ – integration and use cases.
* ___Combined Component___ – multiple aspects.

## [Fragmented Architectures. Patterns with smaller components](https://speakerdeck.com/denyspoltorak/fragmented-architectures-bf4d129f-4cd1-46bf-9fb0-248879872b25):
* ___Layered Services___ – divide into services, then into layers.
* ___Polyglot Persistence___ – employ multiple databases.
* ___Backends for Frontends___ (___BFF___) – dedicate a service to each kind of client.
* ___Service-Oriented Architecture___ (___SOA___) – divide into layers, then into services.
* ___Hierarchy___ – recursive subdivision.

## [Implementation Patterns. The high-level design of system components](https://speakerdeck.com/denyspoltorak/implementation-patterns):
* ___Plugins___ customize the component’s behavior.
* ___Hexagonal Architecture___ isolates the business logic from external dependencies.
* ___Microkernel___ mediates between resource providers and resource consumers.
* ___Mesh___ maintains a decentralized system.

I hope that the presentations will help you quickly find out if you are interested in the book. They are available for [reading online](https://speakerdeck.com/denyspoltorak) and for download from this folder.

Everything is licensed under [Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International](LICENSE).

---

## Fuente: `publications/IntroductionToSoftwareArchitectureWithActors/Part1/README.md`

_[Part](../README.md)_ **1** [2][Part 2] [3][Part 3] [4][Part 4] [5][Part 5]

---

# Introduction to Software Architecture with Actors: Part 1 – On Complexity

_Actors_ have been known for quite a while ([1973](https://en.wikipedia.org/wiki/Actor_model)) and have seen wide use in real-time (embedded, telecom, and gamedev) systems. Moreover, modern event-driven architectures fit the definition of actor systems, indicating that actors appear to have been (recently) reinvented. It even seems that OOP was [originally defined](https://youtu.be/bo5WL5IQAd0?t=2472) through [objects interacting via events](https://en.wikipedia.org/wiki/Simula#Simulation), which made these early objects behave like actors. With the wider industrial adaptation of objects, people found that it was far easier to write business logic as a series of synchronous method calls rather than use message passing, redefining the concept of an object and forgetting about actors until distributed systems became mainstream.

The modern literature on distributed architectures deals with testing pyramids, fault tolerance, and the selection of middleware and databases, as well as other important nuances of practicality. However, the very basic idea that the structure of a system defines its properties and applicability was mostly lost amidst the details of implementation. In the quest to regain it, actors may serve as an intuitive model with a single type of interaction. All the extraneous details are thereby discarded; the properties of an actor system don’t depend to any great degree on whether the actors belong to a single process or are spread over multiple servers.

- [What is an Actor](#what-is-an-actor)
  - [Actors vs Objects](#actors-vs-objects)
- [Types of Systems](#types-of-systems)
- [Complexity](#complexity)
  - [Dev / Ops](#dev--ops)
  - [Order / Chaos](#order--chaos)
  - [Inherent / Accidental](#inherent--accidental)
  - [Coupling / Cohesion](#coupling--cohesion)
- [Distributability](#distributability)
  - [When to Distribute](#when-to-distribute)
- [Variations of Actors](#variations-of-actors)
  - [Threading](#threading)
  - [State](#state)
  - [Miscellaneous](#miscellaneous)
- [Summary](#summary)
- [References](#references)

## What is an Actor?
An _actor_ is an entity consisting of _behavior_ (code) and _state_ (data) that may interact with similar entities _exclusively_ via asynchronous message passing. At any given moment, an actor is either waiting for an incoming message (being _idle_) or processing an incoming message. Incoming messages are usually posted to a queue (_mailbox_) by senders, while a handler thread pops and processes the messages from the queue one by one. Sound familiar?

One (heretical) generalization one could make is that _every (web) service is, in essence, an actor_, for its memory cannot be directly accessed from outside the process and its only means of communication is via asynchronous IP packets.

Points of interest:
1. The state (memory) of an actor can be accessed by none but the owner actor (meaning that all the data is private).
2. An actor is a finite-state machine that reacts to incoming messages.
3. If an actor is single-threaded and does not call nondeterministic functions (provided by the OS or libraries), its behavior is deterministic (an actor in a defined initial state will always produce identical sequences of outgoing messages when provided with identical sequences of incoming messages), allowing _event sourcing_ [[MP](#MP), [DDIA](#DDIA)] and [the replay of bugs and crashes](http://ithare.com/chapter-vc-modular-architecture-client-side-on-debugging-distributed-systems-deterministic-logic-and-finite-state-machines/) under a debugger once events in the system have been logged.
4. As a classic actor never processes more than a single message at a time (ordinary actors are single-threaded), keeps its data private, and cannot access the data of other actors, the code of actors does not need to deal with thread synchronization, except for the single mutex + condition variable pair that protects the message queue. However, the code of the message queue is either provided by a framework or implemented once and never needs to be changed, and thus does not complicate the business logic with mutexes.
5. As the code in actors never needs to synchronize (except for the very short duration required to pop incoming or post outgoing messages and the synchronization that takes place inside the system memory manager), actors are able to efficiently use 100% of the CPUs available.
6. Actors are very similar to objects. They differ primarily in access mode, in that objects have synchronous interfaces while those of actors are asynchronous. The consequence of this asynchronicity is that any logic relying on the states of several actors tends to be extremely ugly. Because inter-actor messages are of a fire-and-forget kind, there is no way for an actor to send a request to another actor, block, and receive a response in the same method. If a response ever comes, it may appear after some other random messages coming from unrelated use cases that have meanwhile gotten into the actor’s message queue. This makes logic that is spread over several actors very complex to write and hard to debug, and thus generally undesirable.
7. On the other hand, a single actor may contain any amount of code, even to the extent of wrapping the whole business logic of the application in a single actor. There is one common requirement, though: any request should be quick to process so that the actor never blocks and is always ready for more incoming events. This also means it is possible to wrap objects with actors (and, conversely, to provide synchronous object interfaces for actors: _Active Object_ [[POSA2](#POSA2)]).

Some programming languages (such as Go) provide out-of-the-box support for message channels, while others allow sending messages to actors by name or by reference. These approaches [are mostly similar](https://homepages.inf.ed.ac.uk/slindley/papers/acca.pdf), with message channels granting finer control akin to prioritized message queues. Moreover, actors can be easily implemented in generic programming languages, e.g. C, Python or Java, as a thin layer on top of a basic threading library (_e.g._ pthread). Message passing may use _Publish-Subscribe_ [[EIP](#EIP)] (though with some reservations as pub/sub implements [agents](https://wiki.c2.com/?ActorVsAgent)), employ _Message Bus / Event Bus_ [[EIP](#EIP)], or post messages directly to the recipient’s message queue. Another possible approach (a special case of pub/sub bus) is for each actor to subscribe to a range of message ids; in such systems, when an actor sends a message, it does not specify the destination or channel; instead, the runtime dispatches the message to an actor responsible for handling this type of message. 

Actors may share address space (running in the same process), hardware (running on the same computer) or be distributed over a network. A shared address space allows for tree-like structures to be sent in messages without any extra effort and guarantees that the whole system is stopped if one of the components crashes. A system of actors may use Request-Confirm message pairs, rely on Notifications, or involve a mixture of the message types.

### Actors vs Objects

<table>
  <tr>
   <td>
   </td>
   <td><strong>Objects</strong>
   </td>
   <td><strong>Actors</strong>
   </td>
  </tr>
  <tr>
   <td><em>Interface</em>
   </td>
   <td>Synchronous (method call)
   </td>
   <td>Asynchronous (message passing)
   </td>
  </tr>
  <tr>
   <td><em>Execution in the system</em>
   </td>
   <td>Sequential
   </td>
   <td>Concurrent
   </td>
  </tr>
  <tr>
   <td><em>The system is deterministic</em>
   </td>
   <td>Yes, if single-threaded
   </td>
   <td>No
   </td>
  </tr>
  <tr>
   <td><em>Encapsulation</em>
   </td>
   <td>Partial (public data) or complete (private data)
   </td>
   <td>Complete (with only the message queue exposed)
   </td>
  </tr>
  <tr>
   <td><em>Polymorphism</em>
   </td>
   <td>Yes, via inheritance or interface implementation (static typing) or equal method names (duck typing)
   </td>
   <td>Yes, if they handle the same types of messages (for none is ever aware what’s inside an actor)
   </td>
  </tr>
  <tr>
   <td><em>Inheritance of implementation</em>
   </td>
   <td>Often used
   </td>
   <td>Rarely used, but possible
   </td>
  </tr>
  <tr>
   <td><em>Cloning (copying)</em>
   </td>
   <td>Sometimes
   </td>
   <td>Sometimes
   </td>
  </tr>
</table>

![Direct call, message, RPC](./Calls.png "Interactions between objects and actors")

When interacting, objects _call_ objects synchronously (like a phone call or face-to-face talk in real life) – they reside in the same thread of execution. Actors, on the other hand, live in independent threads and _send_ each other asynchronous notifications (akin to SMSes or emails). As per usual, there is a middle ground: a _Remote Procedure Call_ is where an object sends a request message to an actor and waits for the actor’s response message (analogous to the operation performed in instant messengers). The benefit of an RPC is that the programming _inside the calling object_ is as simple as it would be with ordinary synchronous calls. However, this type of messaging also makes the system slower, and waiting for a message causes everything to hang in cases where the target actor crashes. Thus, the mixed case is a compromise, one of many that will appear in the following parts of this cycle.

The diagram shows that:
1. Direct calls (objects) belong to a single thread, and the entire use case looks simpler than it does when implemented in other paradigms.
2. With message passing (actors), the client thread becomes ready for new use cases faster than it does with other approaches, as the code never blocks on external modules.
3. With message passing (actors), the services do their tasks simultaneously.
4. RPCs do not have any of the benefits listed above; instead, it is the longest and most complex use case.

Both objects and actors are _modules_ (or what used to be called _services_). Thus, a natural question to ask is: Which type of module is preferable for system decomposition: objects or actors? Or is it better to mix together synchronous and asynchronous interfaces, as is often found with modern microservices?

Objects have long been (and now are, for simple systems) the default solution; they are easy to debug, as the system is synchronous and, if single-threaded, deterministic (replayable). Nevertheless, there are some cases where asynchronous actors are preferable:
1. When several tasks should run in parallel to make sure that the system is able to respond to simultaneous external events, or that it is able to benefit from multiple CPU cores. The use of multithreading with objects negates the simplicity of development with the object model, while synchronization tends to inhibit efficient CPU utilization.
2. When the system is shaped by opposing _forces_ [[MP](#MP)] (non-functional requirements). For example, it needs to both process huge files / run long calculations and handle interrupts / play animations. It is possible to poll for interrupts (or check the system time to render the animation frames) at some points of a long calculation’s loop, but such a single-threaded approach will interleave and make the code implementing both tasks (long calculation and real-time animation) ugly. It is much more convenient to split the tasks that are formed by conflicting forces (e.g., a long task vs a periodic real-time task) into subsystems that work independently – actors. In that case, the calculation will run in a background thread while the animation uses a higher priority foreground thread that wakes up (possibly interrupting the background calculation on a single-core CPU) when yet another frame needs to be rendered.
3. When there is a need for very fast reactions to external events, which is an unlikely achievement with large synchronized code bases (monoliths) or
4. When the ease of development and deployment is desirable for a _relatively independent_ piece of code (subdomain, module, name your own) that belongs to a large project (monolith).
5. When we want to make sure that no other team will ever be able to hack into our data by bypassing our interface. As an actor cannot reach another actor’s data, everything goes through interfaces, even when a nervous PM is late for his deadline.
6. When the system does not fit on a single server (CPU, RAM or HDD limitations).
7. When the codebase is so huge that nobody understands it. It calls for a [piecemeal rewrite](http://www.hillside.net/plop/2020/papers/yoder.pdf), this time with a kind of protection from high coupling (see clause 5 above).

All the listed cases call for the division of the system by asynchronous interfaces and possibly also the distribution of the resulting actors (asynchronous modules) over multiple servers if the system’s resource consumption ever goes over the single server’s limit. As soon as there are asynchronous interfaces and no modules intend on using them in a synchronous way (RPC), the system is already halfway to achieving distribution over multiple servers.

## Types of Systems
Let’s outline an ideal project. It features ideal code which is ideally composed and even more ideally optimized during compilation. All the data fits in a perfectly flat structure, and everything works in a perfectly correct way. This describes the **world of ideas**, also known as _spaghetti_, functional or procedural programming.

When such a world clashes with real business requirements, the project becomes less ideal and _much_ larger. The architects start having difficulties with comprehending all the interactions in the domain and thus with inducing the single true architecture for the project. It reminds me of a story from ancient times, when the grass was greener, and the future author of _The Timeless Way of Building_ had just started learning Taoism. There was a team of architects assigned to design an enterprise-scale system. For a while, they were trying all the known approaches, but every attempt failed to produce anything reasonable to meet such an insanely complex challenge. Therefore, the architects came to the conclusion that there was no other way to proceed but to expand their consciousness. They booked a room overnight with a blackboard, chalk, and some acid. Thus enlightened, they managed to cover the entire blackboard with every detail of the truly ideal enterprise architecture they’d envisioned. However, as soon as the morning light dispelled the unutterable spirit that had temporarily possessed them, they found the board so saturated with information that none of them could comprehend the entirety of the design inscribed.

These very moments of enlightenment make people consider the concept of modularity. Both code and data are clusterized into minimally-interacting subdomains, which are easier to comprehend in isolation. This is called **modularity**, also referred to as _OOP_. 

But cruel reality strikes again with _non-functional requirements_, making modularity meet the same fate as the earlier attempts to comprehend the domain as a whole. It just appears that sundry modules are expected to exhibit diverse properties, and any attempts to tie such different things with synchronous calls make absolutely zero sense. Yielding to the unbearable force of the application’s non-functional requirements, the modules turn asynchronous and independent. Enter **actors** or (micro-)services.

In the unlucky case that an architect becomes overly enthusiastic and transgresses the Tao, there is a further step into the brave new world of **ravioli** (aka atoms or nanoservices) that lacks synchronous interactions. It resembles physical reality; all interactions are notifications.

![Types of systems](./Dichotomy.png "Types of systems")

> _As a side note, a well written monolith has better throughput (computing efficiency per CPU core), while actors allow for better responsiveness (easy coding for real-time actions)._

## Complexity

**Complexity** can be described as the measure of how hard it is to change a system in a desired way (such as adding a new feature or bugfix) without introducing unexpected behavioral changes (i.e. bugs). Generally, as a domain model grows, its complexity increases superlinearly, which means that for any limited cognitive abilities, there is some humble project size that comprises the comfort zone in terms of providing development or support. Any attempts to force one’s way out of that zone have a very high risk of introducing random effects (bugs), causing burnout, and are [sure to take a crazy amount of time](https://goomics.net/374/) (See _monolithic hell_ in [[MP](#MP)]). There are several views on the nature of complexity:

### Dev / Ops

1. **Code (_Dev_) complexity** (_[spaghetti](https://wiki.c2.com/?SpaghettiCode)_ – the mess inside a module): the behavior of some code that defines a given functionality depends on other snippets of code which define other, sometimes related, functionalities and may recursively depend on even more code elsewhere. As a matter of fact, understanding an instance of local logic requires comprehending much of the project’s code. _It’s like an epic novel with hundreds of well-developed characters, where one must read vast portions of the book to find out why the characters behave as they do._
2. **Integration (_Ops_) complexity** (_[ravioli](https://wiki.c2.com/?RavioliCode)_ – the mess of many modules): the correctness of a given module’s behavior (which implements a part of a project’s functionality) requires a definite environment consisting of other properly configured modules and interconnections in the system. Those other modules may recursively have more environmental dependencies to work correctly; thus, making the right changes in a module’s interface and behavior depends on one’s understanding of interactions throughout the entire system. _To continue the literary parallel, integration complexity is reminiscent of scientific articles that are impossible to understand without reading all the papers referenced, which in turn make one look through whatever sources those papers drew on._

**Total complexity** is the sum of the two (_Dev_ + _Ops_) complexities.

It is often possible to redistribute complexity between its various types. If a project starts as a monoblock, the introduction of modularity prevents overwhelming interdependency: the code and data are split among modules separated by (hopefully narrow) interfaces, weakening the dependency of the code inside a module on the code inside other components. In ideal cases, it should be enough to see any component’s code, interface and contract to understand how it works. However, splitting an initially monotonic application into modules creates a new kind of complexity, namely the integration of those modules (Can we understand the behavior of the system by looking at its structure? Is the structure not clear enough?). The more evenly the project’s complexity is distributed between the code inside its modules and the integration of those modules, the easier development is going to be, and the larger, in terms of total domain complexity, the project we can efficiently maintain.

Uncle Bob recommended having no more than 10 actions per method in the code. This addressed code complexity (spaghetti) by moving most of the complexity to the integration levels (ravioli). This way, a project with millions of lines of code will have hundreds of thousands of methods, paralyzing any programmer, whether these methods are bunched into 10 classes with 10 000 methods each (_God Objects_) or evenly distributed among 10 000 classes with 10 methods per class (ravioli code). The application of Uncle Bob’s rule did not improve programming experience – instead, it made it impossible to maintain a project. The best case would have been to have 100 classes, with 100 methods per class and 100 actions per method to keep the complexity at every level of the code in control. Thus, as a project grows, it usually makes sense to simultaneously and evenly increase the length of the methods, the number of methods per class, the number of classes per module, the number of modules per service, and the number of services in the system. Such an approach balances complexity among all the levels of the system.

### Order / Chaos

Systems from the _World of Ideas_ (**_order_**) are perfectly optimized but extremely fragile; it is impossible for an average mind to comprehend one or make local changes without shattering the whole thing.

Systems from the _World of Atoms_ (**_chaos_**) are unruly and uncontrollable – they will do anything except what they are expected to do. And yes, they are _very_ flexible – even to the extent that every single run produces different results.

The _comfort zone_ for human activities belongs to the middle ground, where there are both some rules to control the system (make it predictable) and some flexibility to evolve it over time.

### Inherent / Accidental

Imagine a graph. It can be plotted from different perspectives. If we run a clusterization algorithm on it, we are likely to recognize its structure. Otherwise, it appears as a random mess of intersecting lines.

The clusterized picture is **_inherent_** complexity – the graph cannot be drawn any more simply than that.

The original, seemingly random representation also bears **_accidental_** complexity – the graph is not drawn as its most understandable representation.

When applied to software, there is always _inherent_ complexity in the target domain (requirements), but poorly structured software also bears too much accidental complexity. It seems that humans consider both monoblock (without borders) and fine-grained (with too many borders) systems poorly structured, thus having high _accidental_ complexity. It is also noteworthy that achieving a system with exclusively _inherent_ complexity (and zero _accidental_ complexity) is extremely unlikely. One can only try to minimize it during development and keep it in control via refactorings. It has also been stated that perfect architectures appear after two consecutive re-implementations of a system from scratch.

### Coupling / Cohesion

**_Cohesion_** is the measure of how closely code and data for the related functionality interact: how easy it is to reach from a code describing some concept to the code that works with related concepts; how compact and self-consistent the description of a module is.

**_Coupling_** describes the measure of interdependencies between modules. In tightly coupled systems, modules cannot be implemented or deployed independently – they rely on each other’s implementations.

The common wisdom is to aim for _low coupling, high cohesion_. Low coupling is achievable by introducing asynchronous interfaces, whereas high cohesion is achieved by sticking to large-grained modularity. And _“low”_ does not mean _“zero”_, which fits only single-component (highly cohesive, single file spaghetti) systems. Thus, it seems that the coupling / cohesion approach is derived from distributing complexity over different levels of code, as was described above. Coupling stands for the number of classes, while cohesion stands for the product of the number of methods per class and the number of lines of code per method. As cohesion is a second order function, it will be higher than coupling, which is a first order function, for the even distribution of the project’s complexity over actions in methods, methods in classes, and classes in the system.

Let’s compare the measures of complexity for the different kinds of systems:

![Complexity](./Complexity.png "Complexity")

It appears that large projects, where complexity hits hard, should ideally stick to the middle ground between modular OOP and asynchronous actors. This common wisdom is called **Microservices**, where synchronous OOP (modularity) controls complexity inside each service while asynchronous interfaces keep the services separate and autonomous.

## Distributability
Yet another factor adding to the success of microservice architectures in case of a thoughtful use (as _[‘Think’ is not a four-letter word](http://www.dietmar-kuehl.de/mirror/c++-faq/big-picture.html#faq-6.16)_ thinking may help elude rules (ideally – any rules; in reality – the rules that are not applicable in one’s case)) is the relative ease of distributing microservice systems as opposed to distributing modular applications over _physically_ _independent_ servers.

A **distributed system** is a system where the components involved rarely if ever have means for efficiently accessing the memory (state) of other components. Technically, there is no difference between the artificial access restriction for actors living in the same process and the intrinsic restriction for service processes residing on separate servers connected by a network. In reality, the network adds the possibility of connectivity failures, crashes and system time variation [[DDIA](#DDIA)]. Nevertheless, the properties of a distributed system do not really depend on the way its distribution is implemented, as:
1. There are multiple logically (and usually also physically) simultaneous actions in a system – every component is doing its own task.
2. The interaction of components is (often very) expensive compared to actions inside a component.
3. The synchronization of several components’ states is prohibitively expensive, meaning that under normal conditions, no component may know the _current_ state of any other component.

If the components are connected synchronously (via RPC between objects / modules), one inaccessible or hanged component is likely to make many other components halt in a domino effect, as any call to the hanged component blocks the caller and all the caller’s callers. It is likely that the call will throw a timeout exception in several seconds, but the whole system’s performance is going to degrade in any case, with a timeout propagation over the chain of dependent components likely.

In asynchronous systems (based on messaging between actors or services), dependencies between actor states are avoided (just because such dependencies are extremely hard to implement and debug). This usually results in interactions via notifications, which means that if one of the services in the system hangs or crashes, the other services are unlikely to notice the fact: the notifications sent to the inaccessible service will wait in its incoming queue till the service is rebooted and able to process the incoming notifications again. Even in cases when a healthy service has requested some data from a failed one, the healthy service should continue serving unrelated use cases while the request waiting for the data consumes only a couple KB of RAM and nearly zero CPU.

This difference in system reliability also drove the transition from synchronous modular systems to asynchronous services.

### When to Distribute
It is a must to understand what is easy and what is hard to achieve in order to get around difficulties and be able to solve problems in simple ways ([KISS](https://en.wikipedia.org/wiki/KISS_principle), [80/20 rule](https://en.wikipedia.org/wiki/Pareto_principle)).

Let’s sort interactions in a system of actors (distributed asynchronous system) by increasing implementation complexity and runtime overhead:

1. **A local handling of an incoming event / notification.** This is very fast, has no effects outside of the target actor, loads a single CPU core and does not interfere with other actors. The event may either come as a local hardware interrupt / OS callback, be taken from the actor’s event queue, or come from a signaled subscription to an external agent. This is simply the best use case for an actor. However, it does not allow actors to communicate; thus, a _system of actors_ must contain less favorable use cases.
2. **Request processing that returns a confirmation message.** This is also very fast and simple; the overhead compared to the notification case lies with building and sending the confirmation.
3. **An incoming event causes multicast notifications.** Something important has happened, thus everybody (several other actors) should hear about it. The actor that receives the important event does its part of the job (likely transforming the external event’s logic and data into an internal representation; the actor thus holds the role of _Gateway_ in microservices [[MP](#MP)], _Adapter_ in [Hexagonal Architecture](https://alistair.cockburn.us/hexagonal-architecture/), or _AntiCorruption Layer_ [[DDD](#DDD)] – See [Part 4] of the series), then forwards the processed event to the interested parties (subscribers for the corresponding event type, all instances of a specific service or a hard-coded list of services involved). This use case for actors is more expensive, as the wave of notifications modifying the state of the system (by making individual actors change their states) takes more time than an individual request / confirm exchange. It should be noted that spreading a state update notification over a system of actors is identical to the process of updating _views_ in _event sourcing_ systems with eventual consistency [[DDIA](#DDIA)].
4. **Event processing chain / distributed use case** (_Saga_ [[MP](#MP)]). Enter _Choreography_ [[MP](#MP)]. An actor (_gateway_) receives a request but is not competent to decide on the right response. The request is transformed into an internal data format (_AntiCorruption Layer_ [[DDD](#DDD)], _Normalizer_ [[EIP](#EIP)], _etc_.), sometimes skipping the data the system is not interested in (_Content Filter_ [[EIP](#EIP)]) and adding useful data from the actor’s internal (RAM) or external (database) state (_Content Enricher_ [[EIP](#EIP)]). Then, the resulting high-level message is forwarded to a service responsible for the next processing step. The sequence may repeat till one of the actors / services involved takes final responsibility for the use case and sends a response back over the chain. The use of many asynchronous steps, while the actors involved may be under load from other tasks, results in slower response times. However, this approach is still practical, as a single agent encapsulates the business logic for the final decision. \
_Variant_: The actor that makes the decision multicasts a notification about the resulting change in the system’s state. The gateway may be subscribed to such notifications and use them to build responses to external parties (the system’s clients). Such a flow features a cycle in the request processing graph.
5. **A business logic decision in an actor/service requires information from (read access to) the states of other actors/services.** There is no entity more competent with the use case decision than the current actor, but it still lacks some information. To collect the data needed to make the decision, it has to store the original customer’s request, send read requests to the other actors involved, store the asynchronous responses and merge the collected information. This bears a great resemblance to a _distributed join_ or the creation of _views_ [[DDIA](#DDIA)]. The case is complicated by the fact that our _join_ (collected data) may involve _views_ (subsets of a single actor’s state) belonging to incompatible system state _snapshots_ [[DDIA](#DDIA)], as various use cases that change the system state may be running in parallel and the state changes for actors are not synchronized (It takes time for the all the actors in the system to integrate a given change in the system’s state – the system state is _eventually consistent_). Another downside is that the speed and stability of the use case will be worse than those of the slowest and the most unstable participants, respectively. It also involves copying extra data over the system and requires some code and RAM for managing the intermediate results. \
_Conclusion_: This case looks much like a **red flag**. At the very least, some of the new requirements violate the original understanding of the domain that the system architecture was based on, as there are obviously wrong subdomain borders the decision making needs to traverse (The system is _tightly coupled_). This causes a very complex asynchronous code to get the data that would have been available via a couple of ordinary method calls had the system been written as a monolith. At most, the architect(s) wanted to [try microservices](https://martinfowler.com/bliki/MonolithFirst.html) and reached the point of no return (as the subdomains/services became too granular to be practical). \
_The ways out_: (1) Merge the troublesome subdomains into a synchronous monolith-like service / a larger actor. (2) Follow event sourcing [[DDIA](#DDIA)] to have the views of all the involved actors’ data inside the actor that makes the decision, thus removing the need for the asynchronous read calls between the actors. (3) _Choreography_ or _Orchestration_ [[MP](#MP)] may be of some help if used for appending to the request all the required data from multiple services, as the request is made to traverse all the services involved before it gets to the destination service that features the business logic and sends a response. However, this only somewhat alleviates the complexity of the use case’s implementation, not its slowness or instability.
6. **Handling a request must synchronize the states of several services**. Any delay (temporal inconsistency) between changes in several actors’ states may occasionally break a system invariant, causing the system to make incorrect decisions / produce incorrect results. \
_Or_: There is a need to simultaneously edit (read-modify-write) the data of several components, and any external changes to the data being edited are not allowed because of possible conflicts. \
_[Congratulations](https://www.youtube.com/watch?v=oyFQVZ2h0V8)_ (**[R.I.P.](https://www.youtube.com/watch?v=GiNZyIBkiCQ)**): This is a distributed transaction [[DDIA](#DDIA)] (_Good luck achieving a group decision via SMSes_). It contradicts the loose coupling prerequisite for asynchronous architectures (including actors). The system is very likely a distributed monolith [[MP](#MP)] (See [Part 5] of this series). In theory, every single case of a distributed transaction may be resolved by adding yet another orchestrator [[MP](#MP)] and a couple of technical support employees to manually resolve the resulting conflicts / clean stale lock flags, but it is extremely likely that the asynchronous parts the domain has been split into are too small [[SAP](#SAP)], and that now it’s high time to either [rewrite everything from scratch](http://blogs.newardassociates.com/blog/2023/you-want-modules-not-microservices.html) or look for a new job. \
_Except_: Enterprise services developed by hundreds of programmers. In that case, any way of splitting the domain, even by dividing tightly coupled modules, is much better than letting everyone deal with the whole thing (_monolithic hell_ [[MP](#MP)]). Nevertheless, this does not mean it’s not the time to start looking for a new job.

## Variations of Actors
The notion of actors is simple and stupid enough to produce many variations, the most common of which are listed below:

### Threading

1. **Vanilla actors** (implementable in any language that supports multithreading or even with Unix pipes). Every actor resides in a dedicated thread or process scheduled by the OS. The scheduling is tunable by setting real-time thread priorities. \
_Benefit_: The simplicity of implementation.
2. **Shared thread pool, aka [fibers](https://en.wikipedia.org/wiki/Cooperative_multitasking)** (Erlang/Elixir out of the box; implementable in C/C++). A thread for every CPU core is created and pinned (with processor affinity) to be used by a custom scheduler which iterates over all the system actors and runs any actor with a non-empty message queue in one of the pooled threads. Prioritizing actors is achievable by sorting the list of ready-to-run actors by some priority parameter. \
_Benefits_: (1) The lack of kernel mode rescheduling per message, as the user mode threads are able to process multiple messages for multiple actors without ever entering kernel mode. (2) The actors are extremely lightweight (having state variables + a (usually empty) message queue), as they don’t own threads. Millions of them can be spawned, though one is unlikely to really need that.
3. **Shared thread pool with time quotes** (Erlang/Elixir). The scheduler does not always wait for actors to finish processing messages; instead, it may store the slow actor’s stack, decrease its priority, and yield the execution thread to other actors. Thus, the user mode scheduler takes on the full functionality of the OS scheduler. \
_Benefit_: Slow or hanged actors cannot deplete the system’s CPU resources. \
_Drawback_: Rescheduled actors do use RAM for call stacks (and therefore are not that lightweight).
4. **Multithreaded actors** (usually, (micro-)services). If an actor is stateful, the simplicity and efficiency of its code has been sacrificed (by introducing mutexes) to allow the actor to simultaneously process multiple requests. This is commonly found with _Reactor_ [[POSA2](#POSA2)] ([Part 2] of this series) services that access databases or other services in synchronous ways. \
_Benefits_: (1) One service instance can process several requests in parallel. (2) One service instance can use multiple CPU cores. (3) As a result, blocking calls during the request processing don’t degrade the overall performance too much. (4) Synchronous (blocking) code is usually much simpler than its asynchronous counterpart. \
_Drawbacks_: (1) Performance degradation caused by synchronization on accessing the actor’s state. (2) High RAM consumption from thread stacks. (3) Indeterminism, thus [sacrificing event replay](http://ithare.com/multi-threading-at-business-logic-level-is-considered-harmful/). \
_The way out_: Rewriting the service in [coroutines](http://ithare.com/multi-coring-and-non-blocking-instead-of-multi-threading-with-a-script/) (see below) is possible if the service is not CPU-limited and the team has time for coding the async coroutines infrastructure.
5. **Actors with [coroutines](http://ithare.com/multi-coring-and-non-blocking-instead-of-multi-threading-with-a-script/2/)**. The actor consists of two halves: high-level synchronous use cases serve multiple requests with the help of an asynchronous event handling engine (_Half-Sync/Half-Async_ [[POSA2](#POSA2)], [Part 2] of this series). This is a lightweight option compared to resource-intensive multithreaded _Reactors_ [[POSA2](#POSA2)] (also detailed in [Part 2]). The coroutines engine here is roughly equivalent to an RPC engine (both translate synchronous calls into asynchronous requests). \
_Benefit_: Synchronous processing of multiple simultaneous requests without sacrificing determinism (or event replay). \
_Drawbacks_: (1) Complex infrastructure. (2) Limited to a single CPU core, or needs to sacrifice determinism and introduce mutexes. (3) Somewhat higher RAM consumption (for coroutine stacks) when compared to the implementation with fibers.

### State

1. **Every actor stores its state in RAM** (the default implementation).
2. **Serializable actors** (Akka, implementable in C/C++). The states of actors are dumped to a drive or network; thus, actors become restorable after crashes and can be [unloaded from memory](http://ithare.com/multi-coring-and-non-blocking-instead-of-multi-threading-with-a-script/3/). Yet another name for _event sourcing_ [[DDIA](#DDIA)].
3. **Distributed actors** (Erlang/Elixir, Akka). Runtime transparently optimizes actor placement over a server pool, moves actors away from overloaded machines and restores crashed actors. \
_Drawbacks_: (1) There are magic config files. (2) System responsiveness may suffer while the runtime moves actors around.
4. **Stateless actors** (CGI/fCGI/FaaS). Just a piece of code with an interface that receives everything needed for request processing from the request itself or by calling other services. Such actors may be spawned in large quantities without any concern for synchronization.

### Miscellaneous

1. **Blocking actors** (_Reactor_ [[POSA2](#POSA2)], [Part 2]). The actor’s thread gets a request, does some blocking operations, sends a response, and only then is able to process a new request. Though often used in multithreaded mode as a naive service implementation, the single-threaded variation has its own place: a blocking _Reactor_ is the natural synchronizing wrapper/proxy/adapter for a singleton / hardware device (HDD, SPI, even a [database writer connection with lower isolation level](http://ithare.com/multi-coring-and-non-blocking-instead-of-multi-threading-with-a-script/3/)). It is possible to emulate blocking calls in bare metal by setting a “Don’t schedule me” flag for the actor and returning from the current message handler. The flag will be cleared from inside a hardware interrupt handler as soon as the actor is done accessing the hardware.
2. **Actors with priorities** (network traffic). Incoming messages are put on one of the actor’s multiple queues (or a single prioritized queue) based on the message type, some field values, prioritizer function, whatever. The actor either starts processing a higher priority message as soon as it appears in the high priority queue (thus allowing the system to abort any slow normal priority messages) or takes the highest priority message as soon as it finishes processing its current message. Such an approach is used for prioritizing control traffic over data traffic in networking and for enforcing internet provider traffic quotes.
3. **Hierarchies of actors** (Erlang, Akka). An actor may spawn other actors at run time. The child actors will receive message channels from the parent and the system will notify the parent of the child’s crash/exception, [transfering the DevOps complexity to the main application code](https://www.erlang.org/doc/design_principles/sup_princ.html). This makes sense for [highly robust systems](https://youtu.be/cNICGEwmXLU?t=3066) containing large numbers of small actors (_Nanoservices_, see [Part 3]) under the [defensive programming](https://wiki.c2.com/?DefensiveProgramming) paradigm.

These variations may be combined to fit one’s needs and budget. Beware of adding too much wicked sugar to the KISS actors.

## Summary

* The cohesion-granularity dichotomy was investigated to show that systems featuring few asynchronous aggregates of synchronous modules are preferable.
* Objects and actors were compared.
* Guidelines for interactions between actors were formulated.
* Several variations of actors were described.

Next, let’s look inside an actor. [To be continued…][Part 2]

## References

<a name="DDD"/>

[DDD] Domain-Driven Design: Tackling Complexity in the Heart of Software. _Eric Evans. Addison-Wesley (2003)._

<a name="DDIA"/>

[DDIA] Designing Data-Intensive Applications: The Big Ideas Behind Reliable, Scalable, and Maintainable Systems. _Martin Kleppmann. O’Reilly Media, Inc. (2017)._

<a name="EIP"/>

[EIP] Enterprise Integration Patterns. _Gregor Hohpe and Bobby Woolf. Addison-Wesley (2003)._

<a name="MP"/>

[MP] Microservices Patterns: With Examples in Java. _Chris Richardson. Manning Publications (2018)_.

<a name="POSA2"/>

[POSA2] Pattern-Oriented Software Architecture Volume 2: Patterns for Concurrent and Networked Objects. _Douglas C. Schmidt, Michael Stal, Hans Rohnert, Frank Buschmann. John Wiley & Sons, Inc. (2000)._

<a name="SAP"/>

[SAP] Software Architecture Patterns. _Mark Richards. O’Reilly Media, Inc. (2015)._

---

_Editor:_ [Josh Kaplan](mailto:joshkaplan66@gmail.com)

_[Part](../README.md)_ **1** [2][Part 2] [3][Part 3] [4][Part 4] [5][Part 5]

---

<a rel="license" href="http://creativecommons.org/licenses/by-nc-sa/4.0/"><img alt="Creative Commons License" style="border-width:0" src="https://i.creativecommons.org/l/by-nc-sa/4.0/88x31.png" /></a><br />This work is licensed under a <a rel="license" href="http://creativecommons.org/licenses/by-nc-sa/4.0/">Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License</a>.

[Part 2]: ../Part2/README.md
[Part 3]: ../Part3/README.md
[Part 4]: ../Part4/README.md
[Part 5]: ../Part5/README.md

---

## Fuente: `publications/IntroductionToSoftwareArchitectureWithActors/Part2/README.md`

_[Part](../README.md)_ [1][Part 1] **2** [3][Part 3] [4][Part 4] [5][Part 5]

---

# Introduction to Software Architecture with Actors: Part 2 – On Handling Messages

After [defining actors][Part 1] and traversing the _design space_ [[POSA1](#POSA1), [POSA5](#POSA5)] for systems built of actors, it is time to look inside an actor to find out how it may work. However, first we’ll need to make a distinction between _control_ _flow_ and _data flow_.

- [Control Flow vs Data Flow](#control-flow-vs-data-flow)
- [Monolith](#monolith)
  - [Reactor (synchronous calls)](#reactor-posa2-synchronous-calls)
  - [Proactor (asynchronous messages)](#proactor-posa2-asynchronous-messages)
  - [Half-Sync/Half-Async (coroutine-based reactor)](#half-synchalf-async-posa2-coroutine-based-reactor)
  - [A mixed case](#a-mixed-case)
- [Request State](#request-state)
- [Summary](#summary)
- [References](#references)

## Control Flow vs Data Flow

All software processes incoming information to produce outgoing information.

![Message processing](./Monolith.png "Message processing")

If a piece of software does not produce anything, it serves no purpose. The information a piece of software works on can be either **_data_** (a sequence of signals in a hardware bus) or **_events_** (signals in a hardware bus coming at specific moments). The systems that process these two kinds of information have distinct properties.

Let’s compare a camera and a cell phone.

![A camera and a phone](./Camera_and_Phone.png "A camera and a phone")

A camera exists to stream data from its matrix to either its display or a flash card. The process may be something like:

[Read from the matrix to the RAM] => [RGGB to RGB] => [Calculate statistics for the image] => [Apply brightness correction] => [Apply color correction] => [Apply noise reduction] => [Decrease the color depth] => (1: [Write to the LCD]) _or_ (2: [Write to the viewfinder]) _or_ (3: [Compress to JPEG] => [Write to the flash]).

Every frame the matrix captures takes this path, and the steps taken never depend on the frame itself. Some of the steps (_filters_) in the frame processing pipeline are optional (their application depending on the camera’s settings), but the pipeline is very stable – as the settings are seldomly changed – to the extent that hundreds if not thousands of frames pass through the same pipeline.

This was a description of **data flow**. The data passes through a static sequence of processing steps, as through a [meat grinder](https://youtu.be/HrxX9TBj2zY?t=49). 

Now, let’s consider a cell phone. A user pressing the “2” key results in one of the following actions:
* If an audio connection is established, a message with the dialed digit (“2”) will be sent to the radio frequency interface, and the DTMF feedback generator will be activated.
* If the cell phone’s display shows a text input screen, the last pressed key was “2”, and the last key event’s timestamp is more recent than the specified timeout, the last dialed symbol on the screen will change.
* Otherwise, if the cell phone’s display shows a text input screen, “A”, “a”, or “2” (depending on the software state), will be appended to the text on the screen.
* If the screen shows a menu, the second option on the menu will be activated.
* If the _Snake_ game is on the screen, the snake will turn upwards, unless it is already crawling upwards.
* If an alarm is active, its ringing will be delayed by 5 minutes.
* If the keypad is locked and there have been no recent key presses, animated instructions for unlocking the keypad will be shown.
* Otherwise, if the keypad is locked, nothing will happen.
* If the phone is powered off (or, rather, its CPU is running at a lower frequency, for phones never ever shut down entirely; they just wait for the power button to be pressed again), nothing will happen.

In addition to any of the events listed above, the tone generator will be activated if the “keypad tones” configuration option is enabled.

Here, a single event (pressing the “2” key) may cause various use cases or be completely ignored, based on the system’s current state. Some of the resulting actions may change the current state in such a way that the subsequent “2” key event will cause a totally different action. Even the activation of hardware modules depends on the current state of the software.

This is referred to as **control flow**. An event has no inherent meaning outside the current state of the system, which is decisive for choosing any (including void) reaction to the incoming message.

Of course, a camera has menus written in the _control flow_ style. It’s also true that every phone contains an audio path engineered for _data flow_. In fact, many real-life systems involve both paradigms, but just as the requirements for _control-_ and _data_-flow modules differ, so too do their architectures. While a camera may not respond to key presses while it is writing a picture to its memory card, a cell phone, as a real-time device, must allow its user to immediately stop a call in any situation (Yes, stopping a call is a complex, multi-step scenario that starts with pressing a key).

<table>
  <tr>
   <td>
   </td>
   <td><strong>Data Flow</strong>
   </td>
   <td><strong>Control Flow</strong>
   </td>
  </tr>
  <tr>
   <td><em>Aim</em>
   </td>
   <td>Processing a stream of data
   </td>
   <td>Reacting to events
   </td>
  </tr>
  <tr>
   <td><em>Efficiency as</em>
   </td>
   <td>Throughput
   </td>
   <td>Responsiveness
   </td>
  </tr>
  <tr>
   <td><em>Message propagation through the system</em>
   </td>
   <td>Similar for every message of a given type
   </td>
   <td>Usually differs between instances of an event
   </td>
  </tr>
  <tr>
   <td><em>Messages change the system’s state</em>
   </td>
   <td>Usually, no
   </td>
   <td>Usually, yes
   </td>
  </tr>
  <tr>
   <td><em>Interface length (number of types of incoming messages)</em>
   </td>
   <td>Narrow (a few to dozens)
   </td>
   <td>Wide (hundreds to thousands)
   </td>
  </tr>
  <tr>
   <td><em>Length of data payload per message</em>
   </td>
   <td>Usually long (data packet)
   </td>
   <td>Usually short (event notification)
   </td>
  </tr>
</table>

We are now ready to start reviewing the architectures themselves.

## Monolith

> _“Use case”, “scenario”, “request processing” and “task” will be used as synonyms for chains of steps that implement business logic rules._

> _These days, people refer to a set of components that need to be deployed together as a “monolith”, though the term, which was coined in the 1980s, had a distinctly different meaning prior to the proliferation of internet servers, and with them, the notion of "deployment". In spite of the fact that [[POSA1](#POSA1)] does not contain the term “monolith” itself, it uses “monolithic system”, “monolithic application” or “monolithic structure” as opposed to a loosely coupled (i.e. layered or distributed) system. Let’s reuse this old notion and call entities with no discernible structure **monoliths**. As the present cycle of articles centers on asynchronous systems, wherein components interact by sending messages, most synchronous services should be treated as monoliths for the duration of the discussion._

Monolith is the simplest structure, and is [recommended](https://martinfowler.com/bliki/MonolithFirst.html) [[MP](#MP)] for the following cases:
1. When working in a new domain that none in the team is experienced with (i.e, there is no sure way to split the project into loosely coupled parts), or
2. The project is unlikely to grow huge in any dimension (load, complexity, longevity) and
3. There are no special (real-time response, high availability) or conflicting non-functional requirements.

_Benefits:_
* The project gets a quick start (no heavy infrastructure; just go code the logic).
* It employs the simplest possible code structure (unless the project grows large). 
* It’s easy to debug.
* If anything crashes, everything crashes (so there’s no need to check for incomplete tasks, half-written data or unowned locks).
* Architectural decisions are delayed till the domain is better understood – this follows the saying that _the most important decisions somehow need to be done when one has the least information available_.
* The monolithic structure allows for the best optimizations on resource (CPU, RAM, drives, network) use.

_Drawbacks:_
* The entire application’s code is coupled; thus, it is impossible to vary properties (non-functional requirements [[MP](#MP)]) of parts of the system (subdomains or drivers).
* The code quality quickly deteriorates as time passes and requirements change (poor evolvability).
* If anything crashes, everything crashes (Users only have so much patience).

_Evolution_:
* If the business logic becomes unmanageable because of the project’s size, the monolith should be split into asynchronous _(Micro-)Services_, described in [Part 3]. This may also help with scalability.
* The business logic can be isolated from the underlying platform, transports and 3rd party libraries by applying _Layers_ (from [Part 3] of this series), followed by _Hexagonal Architecture_ (described in [Part 4]). This also has a limited positive effect on the project complexity and improves testability. Another good option is going for _Pipeline_ ([Part 3]), but that architecture only fits a specific subset of applications. 
* Scalability and fault tolerance are achieved firstly by _sharding_ ([Part 3]), with finer control being possible through the use of such granular architectures as _Pipeline_ ([Part 3]), _SOA_ ([Part 5]) or even _Nanoservices_ ([Part 3]).
* Contradictory non-functional requirements will lead to the fragmentation of the monolith into _Layers_ ([Part 3]), _Hexagonal Architecture_ ([Part 4]) and _Hexagonal Hierarchy_ ([Part 5]) or _(Micro-)Services_ ([Part 3]), probably over a _Shared Repository_ ([Part 4]), that may grow into a _Cell-Based Architecture_ ([Part 5]). Less common options include _Nanoservices_ ([Part 3]) and _SOA_ ([Part 5]).
* Customizability is achieved with _Plug-Ins_ or _Domain-Specific Language_ (both from [Part 4]). _Pipeline_ ([Part 3]) is also a good option if it fits the project’s domain.

It is noteworthy that the fact that “If anything crashes, everything crashes” is both a benefit and a drawback. Software architecture is all about making decisions with important benefits and ignorable drawbacks, while what exactly counts as important or ignorable depends on the project. That also holds true for the simplicity of software design – monoliths are easy to start coding, but as the project grows, they become hard to maintain and evolve. One should choose one’s method based on what is important now and what is expected to be important in the future. Everything has a cost.

_Common names_: **[Big Ball of Mud](https://martinfowler.com/bliki/MonolithFirst.html)**, Hello World, KISS + YAGNI.

_Software architecture_: **Reactor** [[POSA2](#POSA2)], Proactor [[POSA2](#POSA2)], Half-Sync/Half-Async [[POSA2](#POSA2)].

_System architecture_: **Monolith**.

Basically, any unstructured (for the current discussion, meaning “not divided by asynchronous interfaces”) code belongs here. This is usually good (simple and stupid) for a small amount of code without any special requirements.

Handling an incoming request/event triggers a chain of data processing operations (_data flow_) or a choice of reactions (_control flow_) that can be implemented as either _Reactor_ or _Proactor_, which can also be mixed in a couple of ways (as is common with software architecture).

### Reactor [[POSA2](#POSA2)] (synchronous calls)

![Reactor](./Reactor_merged.png "Reactor")

> _(Parallel use cases are shown in colors)_

**_A thread per task – imperative programming._** Every incoming request is served by a dedicated (for the duration of processing the request) thread, every call out of the _reactor_ (to the OS, over the network or into libraries) is blocking. Typically, multiple request handling threads are used (e.g. _Leader/Followers_ [[POSA2](#POSA2)] or _Thread Pool_ (_Master-Slave_ [[POSA1](#POSA1)]), both discussed in [Part 3]). Multithreaded reactors have to protect their state with mutexes, are indeterministic and may be considered the default approach for_ data-flow_-dominated systems (naive backend implementation). The basic request processing code is simple, but it is [hard](https://hillside.net/plop/2020/papers/poltorak.pdf) for one of the request processors to influence others (i.e., to cancel or edit a running request). Thus, a multithreaded reactor is a kind of simplistic _sharding_ (to be discussed in [Part 3] of the publication).

_Benefits:_
* The code for use cases is simple.
* Debugging is easy.

_Drawbacks (common):_
* There is no multicast support (It’s impossible to send several outgoing requests in parallel, unless one goes through the trouble of implementing promises).

_Drawbacks (single-threaded variation):_
* The throughput is low – only one request is being processed at any given moment.

_Drawbacks (multi-threaded variation):_
* The system is indeterministic, making it impossible to reproduce bugs or restore the reactor’s state by replaying the incoming requests.
* Threads use much resources and are quite slow to switch.
* If the reactor has a mutable state, it should be protected with mutexes, sometimes resulting in performance degradation or even deadlocks.
* Tasks cannot easily interact.

Though multithreaded reactors are common for backends, [hardware](http://ithare.com/chapter-vd-modular-architecture-client-side-client-architecture-diagram-threads-and-game-loop/) and [database](http://ithare.com/multi-coring-and-non-blocking-instead-of-multi-threading-with-a-script/3/) adapters often need to be single-threaded in order to both protect the managed device from conflicting requests and optimize its performance. In that case, the reactor blocks for the duration of the hardware’s processing of the request, and as soon as it gets a response from the hardware, the reactor proceeds with accepting and running the next request for the wrapped device.

### Proactor [[POSA2](#POSA2)] (asynchronous messages)

![Proactor](./Proactor_merged.png "Proactor")

**_Multitasking without multithreading – reactive programming._** A single thread handles all the events: the incoming requests and the responses from the underlying hardware or libraries. All the outgoing communication is asynchronous (even reading/writing to HDDs); thus, the thread never blocks, every event is processed extremely quickly, the single thread is enormously productive and responsive, and resource usage stays low. It is even possible to keep the proactor thread warm (busy waiting on the event queue) to improve the response time. The proactor’s state does not need to be protected by mutexes (as there is only one thread inside the proactor).

As incoming events are serialized by the actor’s event queue, any request at any processing stage may change the proactor’s state, thereby [influencing the behavior](https://hillside.net/plop/2020/papers/poltorak.pdf) of all the subsequent events, including the events involved in parallel tasks. The execution is [deterministic](http://ithare.com/multi-threading-at-business-logic-level-is-considered-harmful/) – if incoming messages are recorded, it is possible to replay them later to reproduce bugs or restore the state of the proactor in case of hardware failures (_event sourcing_ [[MP](#MP), [DDIA](#DDIA)]).

All the benefits come at a price: the code for every use case is [dispersed](https://hillside.net/plop/2020/papers/poltorak.pdf) over multiple asynchronous event handlers, making use cases very hard to understand and/or debug – it’s the dark side of reactive programming.

The approach is good for _control flow_, when it is important to govern system state and make changes in real time to scenarios that are already running. The drawback of being limited to a single CPU core is usually unimportant for control flow logic, as no big data processing is involved. It is also quite natural for control-flow-dominated systems not to have explicitly coded use cases (as there are so many possible interrupts or branches that any imperative programming attempts turn into a nightmare), in which case there is not much to lose in code structure.

_Proactor_ is opposed to _Reactor_: Reactor has simple business logic code, but it is unresponsive and RAM-heavy if multithreaded. Proactor, on the other hand, sacrifices the readability of business logic for flexibility, real-time responsiveness and low resource consumption.

_Benefits:_
* Tasks may easily influence each other during execution via the actor’s state.
* There are no thread context switches, leading to maximal responsiveness.
* The resource (CPU, RAM) consumption for each running task is minimal, which maximizes the number of requests that can be processed in parallel.
* The system is deterministic, which means that [bugs are reproducible](http://ithare.com/deterministic-components-for-interactive-distributed-systems-with-transcript/).
* Multicasting is natural – any step of request processing may send out several requests in parallel, with response handlers collecting the data and continuing the task as soon as all the data is available.

_Drawbacks:_
* Use cases gain extremely ugly code and are hard to debug. The source code is grouped by messages (including responses from the periphery) it handles, not by scenarios of business logic.
* A single CPU core is used. It is possible to run a proactor multithreaded, but doing so will devoid the actor of most of the proactor’s benefits.

### Half-Sync/Half-Async [[POSA2](#POSA2)] ([coroutine-based reactor](http://ithare.com/multi-coring-and-non-blocking-instead-of-multi-threading-with-a-script/2/))

![Half-Sync/Half-Async](./HalfSync_merged.png "Half-Sync/Half-Async")

> _(The periods of time when the CPU serves another stack are grayed out)_

The upper half contains multiple _reactors_ (implemented by threads or coroutines) which block on calls to the underlying _proactor_. The proactor’s thread serves events from the system (OS, libs) and may also serve the calls from the reactors, acting as an RPC implementation layer. The system as a whole represents a middle ground between Reactor and Proactor; hence its description being placed alongside them.

> _Half-Sync/Half-Async is, in actuality, Layers plus Sharding (both of which are approached in [Part 3] of the publication) or, rather, a kind of Microkernel (from [Part 4]). However, as it is used for message handling, it is discussed here._

**_Multithreading without multithreading – imperative tasks over a reactive engine._** When implemented with coroutines (a _coroutine_ is a call stack that does not own an execution thread), _Half-Sync/Half-Async_ keeps the benefits of single-threaded actors, namely: determinism and low resource consumption. In this case, a single execution thread switches between its original stack in the lower (proactor) half and multiple coroutine (reactor) stacks of tasks running in the upper half. Every incoming request is turned into an upper-half coroutine and run as a synchronous (blocking) chain of calls in the actor’s single thread. However, any blocking call from the synchronous scenario yields the thread to the lower non-blocking half instead of going into the OS kernel. And when the lower half gets a response from the OS to a request running on behalf of one of the upper half’s coroutines, it yields the execution thread to the coroutine in what looks like a return from a blocking call. Thus, _Half-Sync/Half-Async_ kind of reimplements OS threads, a runtime and a scheduler in user space.

_Benefits (for a single-threaded coroutine-based implementation):_
* The code in use cases is simple.
* Debugging is easy.
* Context switching is relatively cheap.
* There is relatively low RAM consumption per running request.
* The system is deterministic, which means [bugs are reproducible](http://ithare.com/deterministic-components-for-interactive-distributed-systems-with-transcript/) with event replay.
* A task may cancel other tasks by throwing exceptions into their (blocked) call stacks.

_Drawbacks:_
* A complex infrastructure code is needed to support the coroutines engine.
* A task can usually only cancel other running tasks, not change their behavior, as the tasks are written in the active (imperative) paradigm.
* A single CPU core is normally used. It is possible to utilize multiple threads; however, doing so will lead to indeterminism, the need to protect shared resources, and possible troubles with inter-task interactions.
* Multicasting is not easy (as it requires some dedicated code in the async layer).
* Coroutines may not be supported with older compilers or exotic hardware.

> _Here we have yet another notion that haunts us throughout this cycle of publications: if there are two options, there’ll usually be a third one holding the middle ground, featuring some of the benefits of both but often being quite complex to implement. This is on top of the trouble that stems from many architectural patterns potentially being considered special cases of other patterns, generalizations of third ones, or combinations of several fourths and fifths, which is further complicated by the fact that most of them are known by quite a few unrelated names._

_Half-Sync/Half-Async_ is more complex than both _Reactor_ and _Proactor_, but it may still be a good choice for larger projects if the costs of implementing and supporting the async infrastructural layer are offset by lowering the resource consumption of _Reactor_ without losing the simplicity of the synchronous business logic. This is similar to RPC’s status as an adapter between procedural synchronous calls and reactive asynchronous messaging.

### A mixed case

![A mixed case](./Mix_picture.png "A mixed case")

Some outgoing requests (like writing to an SSD or communicating over Thunderbolt) are quick and blocking, while others are asynchronous. Combining blocking and non-blocking calls has been [described](http://ithare.com/multi-coring-and-non-blocking-instead-of-multi-threading-with-a-script/2/) as an optimization that minimizes the amount of context switching and simplifies the high-level code. The same approach often seems to be used in microservice systems, where communication between a microservice and its database may be synchronous while the microservices send asynchronous messages to each other.

## Request State

Every request processing method uses RAM to store the task’s _state_ (progress and data):
* With a (multi-threaded) _Reactor_, the request’s state resides on the stack of the thread that processes the request. This makes it impossible for requests to influence each other, as the stack structure is opaque (OS-dependent). In many cases, the detriment that arises as a result of high resource consumption by multiple threads is balanced out by the fact that the code for business logic (tasks) is easy to read and debug, being written in the imperative style.
* With a (single-threaded) _Proactor_, everything is stored as explicit data structures in the actor’s state, together with the actor’s own static variables. This makes it easy for one task to access the states of other tasks. Moreover, as every step of a task starts as a callback from an event handler, a task must explicitly read and check its own state at every step; thus, there is no way it will miss the changes to its state made by some other task. It’s paid for with the fragmented business logic code characteristic of reactive programming. 
* There is an intermediate case for a (single-threaded) coroutine-based _Half-Sync/Half-Async_: the states of tasks reside on call stacks (like with _Reactor_), but the programming language-dependent coroutine runtime provides ways to interact with blocked coroutines. The business logic code is simple, though it comes at the cost of the complex extra infrastructure layer that reimplements the functions (thread scheduling, blocking calls over async I/O), which are normally provided by the OS.

## Summary

* The difference between _data flow_ and _control flow_ was identified.
* The most common approaches to request processing were analyzed in detail.
* The interplay between the ways request states are stored, the possibility of running requests to interact and the complexity of business logic code were hinted at.

In the [subsequent installments][Part 3], we’ll investigate the ways to split a monolith by asynchronous interfaces (or to assemble a system from several monoliths).

## References

<a name="DDIA"/>

[DDIA] Designing Data-Intensive Applications: The Big Ideas Behind Reliable, Scalable, and Maintainable Systems. _Martin Kleppmann. O’Reilly Media, Inc. (2017)._

<a name="MP"/>

[MP] Microservices Patterns: With Examples in Java. _Chris Richardson._ _Manning Publications (2018)_.

<a name="POSA1"/>

[POSA1] Pattern-Oriented Software Architecture Volume 1: A System of Patterns. _Frank Buschmann, Regine Meunier, Hans Rohnert, Peter Sommerlad and Michael Stal. John Wiley & Sons, Inc. (1996)._

<a name="POSA2"/>

[POSA2] Pattern-Oriented Software Architecture Volume 2: Patterns for Concurrent and Networked Objects. _Douglas C. Schmidt, Michael Stal, Hans Rohnert, Frank Buschmann. John Wiley & Sons, Inc. (2000)._

<a name="POSA5"/>

[POSA5] Pattern Oriented Software Architecture Volume 5: On Patterns and Pattern Languages. _Frank Buschmann, Kevlin Henney, Douglas C. Schmidt_. _John Wiley & Sons, Ltd. (2007)._

---

_Editor:_ [Josh Kaplan](mailto:joshkaplan66@gmail.com)

_[Part](../README.md)_ [1][Part 1] **2** [3][Part 3] [4][Part 4] [5][Part 5]

---

<a rel="license" href="http://creativecommons.org/licenses/by-nc-sa/4.0/"><img alt="Creative Commons License" style="border-width:0" src="https://i.creativecommons.org/l/by-nc-sa/4.0/88x31.png" /></a><br />This work is licensed under a <a rel="license" href="http://creativecommons.org/licenses/by-nc-sa/4.0/">Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License</a>.

[Part 1]: ../Part1/README.md
[Part 3]: ../Part3/README.md
[Part 4]: ../Part4/README.md
[Part 5]: ../Part5/README.md

---

## Fuente: `publications/IntroductionToSoftwareArchitectureWithActors/Part3/README.md`

_[Part](../README.md)_ [1][Part 1] [2][Part 2] **3** [4][Part 4] [5][Part 5]

---

# Introduction to Software Architecture with Actors: Part 3 – On Simple Systems

After [having looked][Part 2] into the ways events are processed inside individual actors, it is time to try combining several actors (or splitting an actor by messaging interfaces).

- [The Coordinate System](#the-coordinate-system)
- [Shards / Instances](#shards--instances)
  - [Create on Demand (elastic instances)](#create-on-demand-elastic-instances)
  - [Leader/Followers (self-managing instances)](#leaderfollowers-posa2-self-managing-instances)
  - [Load Balancer, aka Dispatcher (external dispatch)](#load-balancer-aka-dispatcher-posa1-external-dispatch)
  - [Mixtures](#mixtures)
- [Layers](#layers-posa1)
  - [Multi-tier System](#multi-tier-system)
  - [Thread Pool](#thread-pool)
  - [Application Pool](#application-pool)
- [Services](#services)
  - [Microservices (Domain Actors)](#microservices-domain-actors)
  - [Pipeline (Pipes and Filters)](#pipeline-pipes-and-filters-posa1)
  - [Nanoservices (Event-Driven Architecture)](#nanoservices-event-driven-architecture-sap)
- [ASS Compared to Scale Cube](#ass-compared-to-scale-cube)
- [Summary](#summary)
- [References](#references)

## The Coordinate System

![A sample structural diagram for a game](./Game.png "A sample structural diagram for a game")

The remaining parts of the publication examine the relation between structural diagrams (drawings of components and their interactions) for common types of systems of actors/services and the properties of those systems. The following coordinates, abbreviated as **_ASS_,** will be used consistently:
* The vertical axis maps **_abstraction_** – upper parts are more abstract (high-level business logic in Python or DSL), whereas lower parts are implementation-specific (device drivers in C or highly optimized library data structures). Users pay for the higher levels of the software and don’t care about the low-level implementation unless something there goes wrong. The upper modules rely on the lower ones.
* The horizontal axis resolves **_subdomains_** in an arbitrary order. Moreover, the subdomains along the axis may vary (belong to different domains) at different heights (abstraction levels); for example, at the lower (OS) level, there is network, HDD, video, sound, mouse and keyboard drivers/interfaces, while the upper application level may be concerned with players, monsters and spells, and on top of it resides yet another layer with metadata: game scores, achievements, player rooms, etc. These different dimensions of subdomains should have been shown along dedicated orthogonal axes, but the drawing has only two available dimensions, making it necessary to map all the subdomains to a single axis of the diagram. Nevertheless, this does not make the diagrams overly messy, as the different domains are usually found at diverse heights (abstraction levels mapped to layers of the system).
* The Z-axis (which is hard to show in 2D and is thus directed diagonally) corresponds to **_sharding_** and shows multiple instances of modules. It is important for a few of the structures discussed and is omitted in other cases. 

I believe such coordinates are [common](https://en.wikipedia.org/wiki/Glibc#/media/File:Linux_API.svg) in [OS](https://en.wikipedia.org/wiki/Rump_kernel#/media/File:OS_rumparch.png) and embedded systems diagrams, but I have never seen the axes being explicitly named.

Sample diagrams of various basic shapes in an _ASS_ coordinate system will be analyzed by deducing the system properties from the structural diagrams and matched to well-known architectural patterns, with some coverage of common variants.

In some cases, it will be convenient to weaken the actors model by also covering synchronous interactions (RPC or direct method calls) between loosely coupled modules so as to include more examples.

## Shards / Instances

![A structural diagram for Shards](./Shards.png "A structural diagram for Shards")

**_Multiple instances_**. A monolith is cut into functionally identical pieces that usually don’t interact. Alternatively, several identical instances (_shards_) of a monolith are combined into a system to serve user requests together.

> _Why is inter-instance communication avoided? Because of possible race conditions (shown in the figure in red): if there were a task in shard[0] that needed shard[1] to change its data and another task in shard[1] that needed shard[0] to make changes, the system would struggle to stay consistent, in accordance with the CAP theorem [[DDIA](#DDIA)]. This is similar to deadlocks in synchronous systems; the preconditions for both handicaps are loops in control- or data-flow, caused by flows of opposing directions. As the creation of stable and evolvable systems involves avoiding handicaps, direct instance communication should be avoided._

> _If everything flows in the same direction (Pipeline [[POSA1](#POSA1)], discussed below), there are no opportunities for concurrent updates that could bring in inconsistency. If all the related data is kept together (Layers [[POSA1](#POSA1)], the next section), loops are also avoided, and the system state is consistent._

> _The best case is always the one that does not need processing. The green scenario in the figure above is very close to that: the shard gets a request, does some internal magic, and returns the response without having to deal with any outside modules, other shards included. This is possible if the shard owns all the information required for processing the events it gets assigned._

_Benefits_ (on top of those for _Monolith_ from [Part 2]):
* Sharding allows for nearly unlimited (being wary of the size of the dataset and traffic bottlenecks) scalability under load (by spawning more instances).
* Running multiple instances of an (ordinarily stateless) actor allows for synchronous calls (_Reactor_ [[POSA2](#POSA2)] from [Part 2]), simplifying the implementation of the business logic. The fact that the actors block for the duration of running tasks is compensated for by the number of actor instances.
* Fault tolerance – even if one instance crashes, the system still survives, and the unserved request may be forwarded to other instances, _except_ when the crash is reproducible – in that case, the request will crash all the actors it is forwarded to.
* Support for _[Canary Release](https://martinfowler.com/bliki/CanaryRelease.html)_ – it is possible to deploy a few instances of a new version of an actor for testing in parallel to the main workforce of a previous stable version.

_Drawbacks_ (on top of those for _Monolith_ from [Part 2]):
* Sharing data between shards is slower and gives rise to problems. Usually, the shards don’t know about each other, but see _Leader/Followers_ below and _Mesh_ in [Part 5] for cases that rely on inter-shard communication. This drawback does not affect _stateless_ actors.
* There must be an entity that dispatches requests to shards; thus, this entity is a single point of failure.
* Deploying and managing multiple instances requires an extra administrative effort.

_Evolution_:
* If there appear new use cases that require a shard to access data that belong to other shards, a _shared repository_ ([Part 4]) is the most obvious solution. The structural changes needed may involve unsharding the entire application back to _Monolith_ ([Part 2]), splitting the database into a shared layer (the proper _Shared Repository_ pattern from [Part 4]), or running the shards on top of a _Space-Based Architecture_ framework ([Part 5]). Yet another option is _Nanoservices_ (see below).
* If in need of fine-grained scalability, splitting into _Nanoservices_ may be the best option for projects with small codebases, while for larger projects _(Micro-)Services_ (see below) or _Service-Oriented Architecture_ (described in [Part 5]) are more suitable.
* Fault tolerance may be achieved by [replacing parts of the monolith](https://hillside.net/plop/2020/papers/yoder.pdf) with _Nanoservices_ under _Microkernel_ ([Part 4]).
* Getting out of _monolithic hell_ [[MP](#MP)] can likely be achieved through sharded _(Micro-)Services_, in a way similar to that for unsharded monoliths.

_Summary_: sharding is a mostly free opportunity to scale a monolith to support higher load for isolated users or datasets of moderate size (before the database management or traffic control becomes non-trivial), though for larger systems, _Mesh_ (from [Part 5]) may be more appropriate. However, sharding is applicable only in cases where incoming requests may be binned to independent groups (i.e., no requests from one group touch the state that any other group writes to). \
_Example_: a network file storage where every user gets their own folder. A given folder’s URL maps to a single shard responsible for serving the user.

The code for shards is as simple to start writing as that for a monolith, and it faces similar threats, namely _monolithic hell_ [[MP](#MP)], as the project grows.

_Common names_: **Instances**.

_Software architecture_: **Pooling** [[POSA3](#POSA3)].

_System architecture_: **Sharding**, CGI/fCGI, FaaS.

Sharding is applicable to both monolithic applications and individual services or actors in more complex asynchronous systems. The latter case helps to remove bottlenecks in the system by creating more instances of the most heavily loaded modules than of modules under lower load, which results in an optimal use of resources.

Actor (or service) instances in a sharded architecture resemble execution threads in a multithreaded reactor. The difference between threads and processes is the source of most of the _Shards’_ benefits and drawbacks compared to those of a multithreaded _Reactor_ ([Part 2]).

I remember the next three approaches to dispatching the work among threads/instances:

### Create on Demand (elastic instances)

![An example of elastic instances](./Elastic_sharding.png "An example of elastic instances")

The load (e.g. the number of simultaneous users for instance-per-user model) is unpredictable, or service instances may run on the client side. Create an instance as soon as a new client connects and delete it upon disconnect. This may be quite slow because of the instance creation overhead, and peak load may consume all the system resources, so new users will not be served. \
_Examples_: frontend, call objects in a telephony server, user proxies in multiplayer games and coroutines in _Half-Sync/Half-Async_ from [Part 2]. A stateless multithreaded _Reactor_ ([Part 2]) also fits the definition of _Shards_, as threads cannot change each other’s state – this is yet another case of a system that matches the descriptions of several patterns.

### Leader/Followers [[POSA2](#POSA2)] (self-managing instances)

![An example of Leader/Followers](./Leader_Followers.png "An example of Leader/Followers")

The instances are pre-initialized (_pooling_) and linked into a list. One instance (the _leader_) is waiting on a socket, while other instances (_followers_) are idle. As soon as the leader receives a request, it yields the socket to its first follower and starts processing the popped message. The follower that receives the socket becomes the new leader and starts waiting on the socket for an incoming request. As soon as one of the old leaders that were processing messages finishes its work, it joins the end of the followers queue.

This makes some sense but does not scale between servers. Thus, a hardware failure will kill the entire system.

### Load Balancer, aka Dispatcher [[POSA1](#POSA1)] (external dispatch)

![An example of Dispatcher](./Dispatcher.png "An example of Dispatcher")

Some external service (Nginx or a hardware device) dispatches queries over an instance pool. This approach is scalable over multiple servers, but the balancer is the single point of failure.

Actually, this is a _layered_ system (see below), as the dispatcher and the shards belong to different abstraction levels; the dispatcher is concerned with connectivity (low abstraction: bytes, protocols, hardware) while the shards perform the business logic (high abstraction: users, goods, ads).

### Mixtures

Again, a couple of mixed cases are possible, e.g. when:
1. A _Load Balancer_ dispatches requests among servers that run _Leader/Followers_ queues.
2. All the instances on a server are waiting on an OS or framework object (e.g. a socket). An incoming request is assigned to one of the waiting instances. In this case, the _Load Balancer_ is implemented by the OS or the framework.

## Layers [[POSA1](#POSA1)]

![A strctural diagram for Layers](./Layers.png "A strctural diagram for Layers")

**_Separate the business logic from the implementation details._** The monolith is cut by messaging interfaces into pieces that model different abstraction levels. The uppermost level makes strategic decisions, whereas the lowest layer deals with the hardware.

_Benefits_:
* All the subdomains in any given layer are cohesive (accessible via synchronous calls). For example, in a game, the code for a unit may easily get information about its environment and interact with other units. This also makes debugging markedly easier unless the control-/data-flow under investigation leaves the current layer.
* The high-level logic is decoupled from the low-level code, e.g. a unit’s AI planner does not care about the unit’s rendering, as it is encapsulated with a messaging interface. This should (in theory) provide for more compact and readable code.
* The high-level logic and the low-level code may have different properties (_quality attributes_ or _“-ilities”_ [[MP](#MP)]) to satisfy conflicting _non-functional requirements_. A unit’s AI may be busy planning (which is a single long calculation) its future actions for a couple of seconds, while a renderer should draw (a periodic real-time task) the unit every 15 ms.
* All the layers may be executed in parallel (a layer per CPU core). However, the load distribution is usually quite unbalanced, making whatever benefit that is gained insubstantial.
* Layers that don’t possess a system-wide state may be independently sharded under load. For example, it is hard to shard a map (which is a unique shared resource), but it is practicable to shard the units’ AI planners (as they don’t interact directly).
* The layers may be deployed independently (take OS updates as an example), though not without some [effort](https://kb.netgear.com/21853/What-is-the-dual-image-feature-and-how-does-it-work-with-my-managed-switch) in terms of architecture and implementation.
* Layers support fast and easy processing of events that don’t involve multiple layers (e.g. the renderer may render the last cached state of the world without any need for direct access to the full units or map data).

_Drawbacks_:
* It is quite inconvenient to code and debug use cases with logic that is spread over multiple layers. In practice, the entire business logic often resides in the topmost layer or is divided between a UI/metadata layer that governs the system’s behavior and the domain model layer that implements most of the interactions (see _Application Service_, _Plug-ins_, _DSL_ and _Orchestrators_ in [Part 4] of this series).
* Responsiveness and efficiency deteriorate if an incoming event has to traverse several layers to be handled. In practice, lower layers tend to combine several low-level system events into larger and more meaningful app-level events, decreasing the communication overhead towards the business logic layer(s).
* As the project evolves, one of the layers (usually the uppermost one) tends to grow out of control. The application of the _Layers_ pattern does not efficiently reduce the project’s complexity, though it may help with implementing the business logic in relatively high-level terms.

_Evolution_:
* The most common issue with layered structures is _monolithic hell_, when one of the layers grows too large for the developers to understand. Getting out of it requires splitting the overgrown layer(s) into services. The resulting system will usually consist of _(Micro-)Services_ (see below), often featuring _Application Service_ or _Shared Database_ (both described in [Part 4]). Other options include _Pipeline_ (described below), which is applicable to data processing systems, _Service-Oriented Architecture_ and _Hexagonal Hierarchy_ (both from [Part 5]). 
* Often, the business logic must be protected from external dependencies. This is achievable with _Hexagonal Architecture_ ([Part 4]) or _Pipeline_.
* Customization and metadata are available by applying _Plug-Ins_ or _Domain-Specific Language_ (both from [Part 4]).
* Satisfying contradictory non-functional requirements requires splitting the business logic into multiple services. _Shared Repository_ ([Part 4]) is likely to be the first step of the process.
* Scalability and fault tolerance will likely require sharding, with a subsequent transition to _Service-Oriented Architecture_ ([Part 5]) or _Nanoservices_ being possible if needed.

_Summary_: a cheap division of labor for cases with cohesive code at each abstraction level, while the levels themselves are loosely coupled (like game logic and renderer). _Layers_ are ubiquitous as a convenient approach which is hard to misuse.

_Common names_: **Layers** [[POSA1](#POSA1)].

_System architecture_: **n-Tier**.

Splitting into layers, like sharding, can be applied to monoliths, to individual actors or services, and even to whole systems containing multiple asynchronous components (e.g. _SOA_, _Mesh_ and _hierarchical_ architectures from [Part 5]). In other cases, prominent throughout [Part 4], a monolithic layer is added to an existing system, usually to improve communication between its components. On rare occasions, subdomains may vary in the number of layers employed, the most common example of such a case being [CQRS](https://herbertograca.com/2017/10/19/from-cqs-to-cqrs/), where the command path uses a domain model layer (often with DAO) that is totally absent from the query path (which may sometimes consist of a barebone SQL editor).

As it usually happens, there are variants or corner cases:

![Examples of layered systems](./Layers_examples.png "Examples of layered systems")

### Multi-tier System

A system is usually divided into layers/tiers according to the level of abstraction. With _3-tier_ web services, users face the highest abstraction _frontend_ layer, where domain concepts are represented with text, input fields, buttons and animations without heavy mathematical calculations. The next layer, _backend_, contains inheritance trees, if…elseif...else decisions, algorithms and containers embedded in _domain objects_ [[DDD](#DDD)] and _use cases_. Below that is a _data layer_ that contains tables and indices optimized for efficiency at the cost of resemblance to the domain entities. Every layer is very likely to be implemented in a dedicated programming language which better fits the layer’s needs (or which the available programmers are familiar with). The separation of implementations, including the choices of languages, is achieved via language-independent interfaces (e.g. HTTP and SQL for most of 3-tier systems, libc API and syscalls for Linux OS).

Externally-defined interfaces allow for layered architectures to apply equally well to objects, actors and mixed systems; a frontend may communicate with a backend asynchronously (in an actor-like way), while the backend makes synchronous RPCs to the data layer.

A typical 3-tier system may use several sharding options at once: the instances of the frontend layer are dynamically created on end-user devices, while the backend relies on a load balancer and an instance pool, albeit with the data layer left unsharded (a single-box DB instance).

The backend load balancer has been excluded from the figure, as it is a minor part of the system (it does not implement any business logic) and there was no convenient place for it in the drawing. However, it could have been shown between the frontend and the backend instances intercepting their communication channels, or at the very bottom as an entity with no business logic. Some details will be skipped from now on, as _too much information is no information._

Layered actors may be used in embedded programming to split the behavior of a control system into a long-term strategy and real-time reflexes, which are commonly programmed into separate chips. In telecom client devices, there are MMI (user interaction and high-level use cases), SDK (low-level use case support and common services) and FW (hardware-specific code) components.

### Thread Pool

A common pattern for offloading long calculations from a main business logic module to service threads that:
* May load all the available CPU cores with the calculations.
* May run in lower priority to avoid starving the main business logic thread(s).
* Run the assigned task to completion, then notify the task creator asynchronously.
* Accept any tasks, as the service threads don’t have any state or business logic of their own.

_Thread Pool_ looks like _Layers_ + _Sharding_. The management layer that runs the business logic creates and dispatches tasks while the service threads act as mere wrappers for the hardware’s CPU cores.

### Application Pool

This structure is a mirror reflection of _Thread Pool_. Instead of dumb threads ready to help with any tasks, _Application Pool_ manages instances that contain the entire application’s business logic, each serving user requests.

The _coroutines_ of _Half-Sync/Half-Async_ (from [Part 2]) may be considered application instances over a shared service layer; even the “Half-/Half-” in the pattern’s name evokes the notion of layers. In fact, the pattern itself originally described the kernel and user space layers of OSes. 

A backend with a _load balancer,_ described in the _Shards_ section above, is also an example of the _Application Pool_ architecture; there is a minor low-level component nearly devoid of business logic that governs high-level application components (CGI).

Yet another example may probably be found in _orchestrator_ [[MP](#MP)] (see [Part 4]) frameworks.

## Services

![A structural diagram for Services](./Services.png "A structural diagram for Services")

**_Divide by functionality_**. An initial monolith is cut into actors that cover individual subdomains, with the expectation that most use cases don’t cross subdomain borders.

_Benefits_:
* Decoupling subdomains is the only scalable way to reduce the code complexity, as the division results in pieces of more or less equal sizes. 
* Coding and debugging for an individual subdomain is easy, even when the high-level logic is strongly coupled to low-level details.
* The subdomains’ logic is kept loosely coupled for the duration of the project (i.e. modularity is not violated), as it is extremely hard to hack around a messaging interface even under pressure from management.
* The subdomains are decoupled by properties: one actor may be implementing real-time cases, while for another one, long-running tasks are common.
* All the subdomain implementations run in parallel.
* The subdomains can be sharded independently if the load varies and the subdomain does not have a global state.
* The subdomain actors may be deployed independently.
* Use cases that don’t cross subdomain borders (i.e., are limited to one subdomain) are very fast.

_Drawbacks_:
* Use cases that involve logic or data from several subdomains are very hard to code and debug.
* If several services depend on a shared dataset, the data often needs to be replicated for each service, and the replicas (_views_ [[DDIA](#DDIA)]) should be kept synchronized.
* The system’s responsiveness and throughput deteriorate for system-wide use cases (that involve several subdomains).
* Services are left interdependent by contract (_choreography_ [[MP](#MP)]) unless there is a shared layer for coordinating inter-service communication and system-wide use cases (see [Part 4] for multiple examples).
* Integration / operations / system administration complexity emerges.

_Evolution_:
* Should individual services grow too large and complex, causing _monolithic hell_ [[MP](#MP)], they should be split into smaller services, likely transferring the system to _Cell-Based Architecture_ ([Part 5]). There are also the more dubious options of _Application Service_ ([Part 4]) and _Service-Oriented Architecture_ ([Part 5]).
* Having too many connections between services can be alleviated by introducing _Middleware_ ([Part 4]) or refactoring to _Cell-Based Architecture_ ([Part 5]).
* Protecting the business logic from the environment is achievable in the following ways: the whole system of services can be encapsulated with _Gateway_ ([Part 4]), while _Hexagonal Architecture_ (also from [Part 4]) can be applied to isolate the business logic of the individual services from third-party components.
* The project can often be developed faster when _Shared Repository_ or _Middleware_ (both from [Part 4]) is used.
* If the domain is found to be strongly coupled, the services either need to be integrated with a monolithic layer, i.e. _Application Service_ with _Orchestrators_ or _Shared Repository_ (all described in [Part 4]), or the entire business logic should be merged into _Hexagonal Architecture_ ([Part 4]) or even _Monolith_ ([Part 2]).
* The mutual dependency of services, caused by their reliance on each other’s interfaces and contracts, is reduced by the application of patterns that manage the communication and global use cases. _Middleware_ ([Part 4]) abstracts the transport, _Shared Repository_ ([Part 4]) provides communication via changes in the global state, while _Gateway_ (with _Mediators_ or _Orchestrators_) or _Application Service_ (all described in [Part 4]) takes control of global use cases, thus often removing the need for direct interservice communication. _Mesh_ and _Hierarchy_ patterns from [Part 5] may completely remove the need for some of the communication aspects in project domains to which they are applicable.
* Extra flexibility and testability can be found with _Pipeline_ (see below), but it only fits simpler kinds of data processing.
* High scalability and fine-tuned fault tolerance are achievable with _Nanoservices_ (see below) and distributed _Microkernel_ ([Part 4]).

_Summary_: this kind of division is good for systems that feature mostly independent modules; otherwise, the implementation complexity and request processing time increases. \
_Exception_: for huge projects, the division by subdomain is the only way to keep the total project complexity manageable. Even though many use cases become intrinsically more complex to implement and operational complexity may become untrivial, the splitting of a huge monolith into several asynchronous modules still removes much of the accidental complexity in the code and allows the resulting modules to be developed and deployed relatively independently, leading one out of _monolithic hell_ [[MP](#MP)].

> _Other ways to split a huge monolith don’t reduce the code complexity well enough: sharding does not change the code at all (as every instance includes the entire project’s codebase), while layered systems usually contain 3 to 5 uneven layers, with one of the upper layers still growing too large to be manageable and too cohesive to be split again. At the same time, dividing a project by subdomain boundaries may easily result in a dozen loosely coupled services of nearly uniform size, and it may be possible to recursively split those services into subsubdomains if the need arises. The system as a whole becomes slower and more complicated, but the individual components remain manageable. There is another similar, yet better, option, namely hierarchical decomposition (described in [Part 5]), but it is not applicable in most domains._

_Common names_: **Actors** (embedded).

_System architecture_: **Microservices** [[MP](#MP)].

Like the other two basic patterns described in this article, splitting into services applies to both monoliths and individual modules. Three kinds of architectures that result from splitting a monolithic application into services are described in the subsequent sections. [Part 4] is dedicated to architectures that retain a monolithic layer together with layers of services, whereas [Part 5] deals with fragmented systems where every layer has been divided into subdomain services.

Traditionally, there are variants:

### Microservices (Domain Actors)

**_Make subdomains independent._** If a target domain can be divided into several subdomains, it is likely that the business logic inside each of the subdomains is more cohesive than it is between the subdomains, meaning that any given subdomain deals with its own state and functions much more often than it requires help from other subdomains. Tasks limited to a single subdomain are easy, those chaining (_fire and forget_) or multicasting notifications over several subdomains – acceptable, but once a task requires the coordination of and feedback from several subdomains – everything turns into a mess (see [Part 1]), as the subdomain actors are too independent. Not only do _views_ [[DDIA](#DDIA)] or _sagas_ [[MP](#MP)] emerge, but the task’s logic is likely to consist of multiple distributed pieces, possibly belonging to several code repositories, which makes troubleshooting the task as a whole very inconvenient, and its execution often inefficient. A system that mostly relies on such coordinated tasks is sometimes called a _distributed monolith_ [[MP](#MP)] ([Part 5]) and is usually considered to be the result of an architectural failure, namely incorrect subdomain boundaries or overly fine-grained services [[SAP](#SAP)]. It is recommended to [first build a monolith](https://martinfowler.com/bliki/MonolithFirst.html), then locate loosely coupled modules [[DDD](#DDD)] (possibly refactoring out redundant dependencies and moving pieces of code between modules), and only after the already running system has converged into a loosely coupled state can it be split into a set of microservices. Another option to reduce a monolith is by [separating the most loosely coupled services](https://hillside.net/plop/2020/papers/yoder.pdf) on an individual basis. This is a lengthy process, but it does not destabilize the whole project.

_Domain Actors_ / _Microservices_ may be used for loosely coupled _data processing_ (enterprise) and _control_ (telecom) systems; see [Part 2] for the distinction. 

![A rollback of a failed saga](./Rollback_of_Saga.png "A rollback of a failed saga")

When things go wrong (as they tend to do in real life), systems start to rely on distributed transactions, causing _sagas_ [[MP](#MP)] (rules for running system-wide transactions and rolling back failed ones) to be implemented. They may be _choreographed_ [[MP](#MP)] by hardwiring the task processing steps into services or _orchestrated_ [[MP](#MP)] by adding an extra business logic layer on top of the services. A choreographed logic is hard to understand, as a single use case is split over multiple code repositories, while an orchestrated logic adds a system-wide layer on top of the services; it is slower because more messaging is involved and may create a single point of failure.

For this and other practical reasons, real-world _microservice_ systems are usually augmented with extra layers such as _Gateway_ [[MP](#MP)], _Orchestrators_ [[MP](#MP)], _Shared Database_, or _Message_ _Broker_ [[MP](#MP)] – all of which are described in [Part 4] of the series, or are _Hierarchical_, with _Hexagonal_ or _Cell_ subsystems for services ([Part 5]).

### Pipeline (Pipes and Filters [[POSA1](#POSA1)])

![Structural diagrams for Pipelines](./Pipes_and_filters.png "Structural diagrams for Pipelines")

**_Separate data processing steps_**. A special case of _Domain Actors_ (_Broker Topology_ [[SAP](#SAP)]), it is very specialized but widely used; while in most other patterns, participants may communicate in any direction, _Pipeline_ is limited to unidirectional data flow – every actor (called a _filter_ in this pattern) receives its input data from its input event pipe(s), processes the data and sends results to its output message pipe(s). A filter is usually responsible for a single step of the data processing and is kept small and simple.

The filters can be developed, debugged, deployed and improved independently of each other [[DDIA](#DDIA)] thanks to their identical interfaces (though input data type tends to vary) – in fact, the filters are completely ignorant of each other’s existence, a nearly unachievable goal for microservices. Event replay (with a data sample from a pipeline) is used for profiling and for the comparison of outputs between versions of a filter [[DDIA](#DDIA)]. Pipelines sometimes branch and in rare cases may change topology at run time. Pipelines are usually created by a factory during system initialization, often based on a configuration loaded from a file.

This pattern is only useful in _dataflow_-dominated systems (as _control_ systems both tend to change behavior at run time and usually need real-time responsiveness – see [Part 2]). Nevertheless, if _Pipeline_ fits the project’s domain requirements, it may be used without much further investigation, as the pattern is very flexible and simple. However, there are some domains dominated by data processing delay (instead of the more common throughput objective), namely night vision, augmented reality and robotics, where pipelines are inappropriate solely because the pattern is not optimal for fast response time. 

_Benefits_:
* It is exceedingly easy to develop and support.
* The filters run in parallel, allowing the OS to distribute the load over the available CPU cores.

_Drawbacks_: 
* If some of the filters are slower than others, there is a chance of the data overrunning the pipe’s capacity and starving the OS of RAM when under heavy load. This can be alleviated by implementing a feedback engine, which, however, complicates the simple idea of pipelines.
* _Pipes and Filters_ are likely to suffer from copying the data more often than strictly necessary, and the pattern is not well suited for the parallelization of data processing inside individual filters. This means that a decently written _Monolithic_ application (probably using a _Thread Pool_) will process each data packet faster, and is very likely to have better throughput.

_Evolution_:
* Fine-grained scalability and fault tolerance may require a transition to _Nanoservices_ in a _Microkernel_ environment ([Part 4]).

_Common names_: **Pipes and Filters** [[POSA1](#POSA1)].

_System architecture_: **Pipelines** [[DDIA](#DDIA)].

Implementing feedback (_[congestion control](https://en.wikipedia.org/wiki/TCP_congestion_control)_) for highly loaded pipelines may require the filters to send back a confirmation for every processed packet, the number of packets in a pipe, or the number of packets that have already been processed. This effectively creates a system where _data_ and _control_ (feedback) packets flow in opposite directions. Another feedback option is to add a supervisor _middleware_ ([Part 4]) that collects throughput statistics and manages the quality/bitrate settings of the filters to avoid overloading the pipeline A third feedback option is to make writing to a pipe block if the pipe is full [[POSA1](#POSA1)]. 

### Nanoservices (Event-Driven Architecture [[SAP](#SAP)])

![A structural diagram for a CRUD implemented with Nanoservices](./Nanoservices.png "A structural diagram for a CRUD implemented with Nanoservices")

**_Fine-grained actors for supreme fault tolerance, flexibility and scalability_**. _Event-Driven Architecture_ is an umbrella term for approaches that use some of the following features:
* An actor (_event processor_) for each data processing step (stateless) or domain entity (stateful): the proper _Nanoservices_
* _Publish-Subscribe_ communication
* Pipelined (unidirectional) and often forked flow that tends to involve persistence (database access, event sourcing or a built-in framework capability)

Strictly speaking, _Microservices_ and _Pipelines_ are also _Event-Driven Architectures_, but the name is often used for _pipelined pub/sub nanoservice systems_.

Like in _Pipeline_, an external event passes through multiple steps that transform it, usually by adding more data. In contrast to _Pipeline_’s _filters_, _event processors_ may mark the event as disallowed to break the normal processing chain, and they tend to read from or write to **shared** databases. Unlike with _Pipelines_, multicasts, either via pub/sub subscriptions or by _Mediator_ [[SAP](#SAP)] ([Part 4]), are common.

_Choreography_ [[MP](#MP)] (_Broker Topology_ [[SAP](#SAP)]) and _orchestration_ [[MP](#MP)] (_Mediator Topology_ [[SAP](#SAP)]) apply, just like for _microservices_. Unlike _microservices_, _event processors_ are very fine-grained, usually containing code for a single action or domain entity, and are spawned in large numbers.

While most of the system architectures feature four levels to distribute the domain complexity over, namely: lines of code in methods, methods in classes, classes in services, and services in the system (see [Part 1] for the relevant discussion), _nanoservices_ feature only the first and the last means, as a nanoservice implements a single method. Therefore, this pattern is not applicable for complex domains.

_Benefits_:
* Very good fault tolerance is achieved, as every part of the business logic and every user request is isolated.
* _Nanoservices_ run in parallel, allowing the OS to distribute the load over CPU cores or a load dispatcher to spread requests to multiple servers.
* _Nanoservices_ are nearly perfectly scalable unless they access a shared database (which they do) or saturate the network bandwidth / run out of money in cloud deployments.
* Individual _nanoservices_ are easy to develop and support.
* Individual _nanoservice_ implementations may be reused.
* The system is evolvable by inserting new _nanoservices_ or rewiring the existing ones unless it grows too complex to grasp all the interactions and contracts.

_Drawbacks_: 
* Integration complexity may quickly overwhelm the project.
* Debugging and testing will not be easy.
* Any coordinated database writes will either limit the system to a single shared database or require distributed transactions or _sagas_ [[MP](#MP)], increasing complexity and limiting scalability.
* Component reuse is not always going to work because contracts may vary.
* Too much communication wastes system resources, often increases response times and limits scalability.

_Evolution_:
* _Microkernel_ frameworks (from [Part 4]) allow for a fast start on the project and the handling of failure recovery in the application code.
* _Space-Based Architecture_ (from [Part 5]) may help to distribute the shared repository.

_Common names_: Actors (telecom), Flowchart.

_System architecture_: **Nanoservices**, Event-Driven Architecture [[SAP](#SAP)].

_Nanoservices_ provide good flexibility and scalability for simple systems with few use cases but tend to turn into an integration nightmare as the functionality grows. Moreover, the almost inevitable use of [shared databases](https://peterdaugaardrasmussen.com/2019/08/14/what-is-a-nano-service/) (as one nanoservice is dedicated to creating users, another to editing them, and the third and fourth to deleting and authorizing them, respectively) limits most of the benefits. The system diagram looks very similar to a _flowchart_; ultimately, that’s likely what stateless nanoservices are, except that flowcharts for all the implemented use cases coexist in the production system. This assumption is confirmed by the visual programming tools (like jBPM) being advocated [[SAP](#SAP)] for nanoservices.

Distributed actors frameworks, e.g. Akka or Erlang, are often used for stateful _Nanoservices_, providing a fault-tolerant _Microkernel_ environment (described in [Part 4]).

## ASS Compared to Scale Cube

[[MP](#MP)] defines _scale cube_ as a means of scaling an application in the following ways:
1. Cloning instances (which corresponds to sharding a backend in ASS)
2. Functional decomposition (splitting a monolith into microservices)
3. Data partitioning (which corresponds to sharding a data layer in ASS)

The ASS diagrams used throughout the current series of articles represent _evolvability_ (how easy it is to change the system) through decoupling:
1. Decoupling by **A**bstraction level
2. Decoupling by **S**ubdomain
3. **S**harding

Two dimensions of ASS (abstraction and subdomain) correspond to the functional decomposition of scale cube, while both the cloning and the data partitioning of scale cube match to ASS’s sharding at different abstraction levels.

[[DDIA](#DDIA)] mentions _scaling up_ (upgrading CPU, RAM and disk space) vs _scaling out_ (going distributed).

Any conclusions? It seems that the coordinate system used in this cycle is unrelated to the scaling coordinates, except for the fact that every diagram is limited to 2 or 3 dimensions. Nevertheless, some kind of sharding is present in all the coordinate systems reviewed.

## Summary

All the possible ways of splitting a monolith along one of the ASS dimensions were described, creating:
* _Shards_ from spawning monolithic instances. 
* _Layers_ from slicing by code abstractness.
* _Services_ when divided by subdomain.
* _Pipeline_ and _Nanoservices_ as common specializations of _Services_.

The [next parts][Part 4] will cover divisions along both abstraction and subdomain dimensions.

## References

<a name="DDD"/>

[DDD] Domain-Driven Design: Tackling Complexity in the Heart of Software. _Eric Evans. Addison-Wesley (2003)._

<a name="DDIA"/>

[DDIA] Designing Data-Intensive Applications: The Big Ideas Behind Reliable, Scalable, and Maintainable Systems. _Martin Kleppmann. O’Reilly Media, Inc. (2017)._

<a name="EIP"/>

[EIP] Enterprise Integration Patterns. _Gregor Hohpe and Bobby Woolf. Addison-Wesley (2003)._

<a name="MP"/>

[MP] Microservices Patterns: With Examples in Java. _Chris Richardson. Manning Publications (2018)_.

<a name="POSA1"/>

[POSA1] Pattern-Oriented Software Architecture Volume 1: A System of Patterns. _Frank Buschmann, Regine Meunier, Hans Rohnert, Peter Sommerlad and Michael Stal. John Wiley & Sons, Inc. (1996)._

<a name="POSA2"/>

[POSA2] Pattern-Oriented Software Architecture Volume 2: Patterns for Concurrent and Networked Objects. _Douglas C. Schmidt, Michael Stal, Hans Rohnert, Frank Buschmann. John Wiley & Sons, Inc. (2000)._

<a name="POSA3"/>

[POSA3] Pattern-Oriented Software Architecture Volume 3: Patterns for Resource Management. _Michael Kircher, Prashant Jain. John Wiley & Sons, Inc. (2004)._

<a name="SAP"/>

[SAP] Software Architecture Patterns. _Mark Richards. O’Reilly Media, Inc. (2015)._

---

_Editor:_ [Josh Kaplan](mailto:joshkaplan66@gmail.com)

 
_[Part](../README.md)_ [1][Part 1] [2][Part 2] **3** [4][Part 4] [5][Part 5]

---

<a rel="license" href="http://creativecommons.org/licenses/by-nc-sa/4.0/"><img alt="Creative Commons License" style="border-width:0" src="https://i.creativecommons.org/l/by-nc-sa/4.0/88x31.png" /></a><br />This work is licensed under a <a rel="license" href="http://creativecommons.org/licenses/by-nc-sa/4.0/">Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License</a>.

[Part 1]: ../Part1/README.md
[Part 2]: ../Part2/README.md
[Part 4]: ../Part4/README.md
[Part 5]: ../Part5/README.md

---

## Fuente: `publications/IntroductionToSoftwareArchitectureWithActors/Part4/README.md`

_[Part](../README.md)_ [1][Part 1] [2][Part 2] [3][Part 3] **4** [5][Part 5]

---

# Introduction to Software Architecture with Actors: Part 4 – On Systems with Models

The [previous part][Part 3] of the cycle was dedicated to the basic ways of splitting a monolith by messaging interfaces:

1. Creating identical instances (**shards**) to scale the system under load, survive hardware failures, and enable synchronous outgoing calls (i.e. imperative programming  instead of reactive programming, which is the default paradigm for asynchronous systems).
  * _Precondition 1_: The data involved can be split into multiple subsets; most use cases operate on a single subset of the data.
  * _Precondition 2_: There is no shared (mutable) system state that affects the use cases.

2. Dividing into **layers** to decouple a high-level business logic from low-level platform details and allow each of the layers to run independently under a distinct set of forces.
  * _Precondition 1_: The amount of interaction between the layers (coupling) is much smaller than the amount of interaction inside each layer (cohesion).
  * _Precondition 2_: There is no shared state that directly affects several layers.

3. Dividing into **services** to isolate subdomains, mainly for getting out of _monolithic hell_ [[MP](#MP)].
  * _Precondition 1_: Most of the use cases don’t involve synchronized changes in several subdomains (though some use cases may chain through subdomains).
  * _Precondition 2_: The subdomains don’t share state.

The preconditions [may be violated](http://www.dietmar-kuehl.de/mirror/c++-faq/big-picture.html#faq-6.16) (hinted by the word “most”) at the cost of incurring slow, complicated, and unstable hackarounds (i.e. 3-phase commit, orchestration, choreography, materialized views) that are in all aspects inferior to the direct method calls used in monoliths.

It has always been **the goal of architecture** to find a combination of applicable approaches (_patterns_) that provides strong benefits and none of whose associated drawbacks (there are no benefits without drawbacks, as everything has a price) are consequential to the project’s success. It should be noted that the importance of any given set of benefits and drawbacks depends on the nature and domain of the project in question, otherwise everyone would have long since been using the same architecture and programming language.

This article investigates multiple ways of combining **layers** and **services** to see how they work together, amplifying various benefits and mitigating some of the drawbacks.

- [The Model](#the-model)
- [Π-shaped systems](#Π-shaped-systems)
  - [Hexagonal Architecture (domain model over resource services)](#hexagonal-architecture-domain-model-over-resource-services)
    - [Model-View-Controller](#model-view-controller-posa1)
  - [Gateway (system model over domain services)](#gateway-mp-system-model-over-domain-services)
  - [Application Service (domain model over domain services)](#application-service-domain-model-over-domain-services)
- [U-shaped systems](#U-shaped-systems)
  - [Middleware (domain services over a system model)](#middleware-domain-services-over-a-system-model)
  - [Shared Repository (domain services over a domain data model)](#shared-repository-posa4-domain-services-over-a-domain-data-model)
  - [Plug-ins (domain services over a domain model)](#plug-ins-sap-domain-services-over-a-domain-model)
- [H-shaped systems](#H-shaped-systems)
  - [Microkernel](#microkernel-posa1)
  - [Domain-Specific Language (DSL)](#domain-specific-language-dsl)
  - [Orchestrators](#orchestrators-mp)
- [Miscellaneous architectures](#miscellaneous-architectures)
  - [(Re)Actor-with-Extractors (Day and Night)](#reactor-with-extractors-day-and-night)
- [Summary](#summary)
- [References](#references)


## The Model
Systems with monolithic (synchronous) layers covering the whole domain are ubiquitous. Let’s call any given example of such a layer a “**_model_**”. The layer may be present at various levels of abstraction and may vary in thickness (the amount of logic): from the largest component that encapsulates all of the project’s business logic (e.g. in _Hexagonal Architecture_) to a thin layer providing connectivity (like in _Middleware_). A thick domain-wide layer may be called a “**_domain model_**”, as it contains knowledge of domain entities and, possibly, their relations. A thin layer will usually focus on a system’s components and may thus be called a “**_system model_**”. In a similar way, there are **_domain services_** (microservices, domain actors) that implement subdomain business logic and **_resource services_** that provide abstractions for (virtualize) system resources.

A model integrates information (control/data – see [Part 2]) flows over a system and sometimes links the data belonging to the subdomains involved; it unifies the components into a system and creates rules and means for the components to communicate.

## Π-shaped systems

Systems may feature a monolithic model with a high-level logic that relies on the help of a lower layer of services to fulfill user requests. In such cases, the domain logic (business rules) may reside in the upper layer (the model), lower layer (the set of services) or both, creating the three following patterns, respectively:

### Hexagonal Architecture (domain model over resource services)

![A structural diagram for Hexagonal Architecture](./Hexagonal.png "A structural diagram for Hexagonal Architecture")

> _(Business logic is shown in blue.)_

**_Isolating the business logic from the environment._** A monolithic layer containing the entire system’s business logic (_domain model_) runs over small services (_adapters_) that encapsulate 3rd party libraries and OS interfaces. Each adapter translates the 3rd party interface of the underlying hardware, library or remote service to the _port_ (the model’s interface defined in domain terms) it serves. This structure makes the business logic module self-sufficient, as it only uses its own interfaces (_ports_) constructed in ways that are the most natural for articulating the relevant domain.

_Benefits_:
* Developing and debugging the business logic (usually about 95% of the code) is easy thanks to its monolithic structure (inherited from _Layers_), unless the project grows huge and reaches _monolithic hell_ [[MP](#MP)].
* The architecture can support use cases of any complexity unless they overuse periphery access (also inherited from _Layers_). Caching the most useful peripheral data in the _model_ helps to further improve performance.
* The _model_ (business logic) may be sharded if all the data required for calculations or decisions is included in requests (i.e. if the _model_ is _stateless_) (inherited from _Layers_).
* The _model_ (main logic) and each of the periphery adapters (or connectors) to external services have independent properties (e.g. real time responsiveness vs long calculations; implementation language; deployment frequency) (inherited from both _Layers_ and _Services_).
* The deployment of the business logic and each of the periphery adapters is highly independent (from both _Layers_ and _Services_).
* The periphery adapters run in parallel (from _Services_).
* Periphery-to-periphery communication that does not involve the main business logic layer is fast (going through direct adapter-to-adapter channels, which are optional in this architecture).
* Each of the periphery adapters, along with its underlying device or 3rd party service, is easy to replace or provide multiple implementations for, as the adapters transform the interfaces of the 3rd party components into ones suited for use with the system’s business logic (its _model_), providing protection from _vendor lock-in_ and delaying vendor selection decisions till the pre-release stage of the project’s life cycle.
* The development and testing of the main business logic may start before the components it relies on are available by using _stub_ adapter implementations.
* The resource-friendly autotesting of business logic using _stub_ adapters is supported.
* If the model is single-threaded, bugs are reproducible by recording and replaying events from the model’s message queue.

_Drawbacks_:
* _Hexagonal Architecture_ does not alleviate the project’s domain complexity (from _Layers_). The business logic is still monolithic. The use of adapter interfaces (_ports_) defined in terms that are convenient for the business logic’s domain may deal in part with the accidental complexity but cannot remedy the inherent one.
* Use cases that involve multiple peripheral devices (3rd party services) are likely to be slower and more complex with Hexagonal Architecture than with _Monolith_ (though caching may often help) (from _Services_).
* The project’s start is slowed down slightly, as all the external dependencies must either be isolated by wrapping them with adapters or be mocked with stubs.

_Evolution_:
* As the project grows, _Hexagonal Architecture_ is likely to fall into _monolithic hell_ – a state of overwhelming code complexity that is caused by having too many people working on too large a module. The only way out is to split the _domain model_ into a set of smaller _domain services_. If the domain is hierarchical (i.e. there is a single subdomain that manages or uses other subdomains), the transition to _Application Service_ (see below) or more generic _Hexagonal Hierarchy_ (described in [Part 5]) will be available. In rare cases of mostly linear data processing, the _domain model_ may be turned into _Pipeline_ (see [Part 3]). Otherwise, it should be split into _(Micro-)Services_ (from [Part 3]). Hierarchical decomposition is usually preferable, as it decouples the business logic along both the _abstraction_ and the _subdomain_ dimensions, resulting in a more flexible and manageable architecture.
* A need for fine-tuned customization may be solved by building _Plug-Ins_ or _Domain-Specific Language_ (both described below) on top of the _domain model_ of _Hexagonal Architecture_.
* When contradictory non-functional requirements arise, the business logic should be split just as it would be for dealing with the _monolithic hell_ described above. However, if the project is not very complex and the domain is not strongly coupled, there is the option of going for _Nanoservices_ ([Part 3]) and _Microkernel_ (described below).
* Scalability may be achieved by either sharding the _domain model_ or dispersing it into _Nanoservices_ over _Microkernel_, with fault tolerance as an additional benefit.

_Summary_: _Hexagonal Architecture_ brings with it many significant benefits when used for projects of a medium size and lifespan. However, small projects will be delayed by the extra effort required to code the interfaces and adapters, while huge projects will still suffer from _monolithic hell_ [[MP](#MP)] in the _domain model_ layer.

Hexagonal architecture is derived from a monolith through the following steps:
1. _Layers_ (from [Part 3]) are applied to split the high-level business logic from the low-level implementation details. The lower layer is called the _AntiCorruption Layer_ [[DDD](#DDD)] because it isolates the business logic from the details and changes in the integrated 3rd party components.
2. _Services_ (also from [Part 3]) are applied to the lower layer so that every external dependency is wrapped with a dedicated _adapter_ module, making it easy to replace or update individual 3rd party components.

The resulting architecture is both more convenient than pure _Services_ (_domain actors_) and more flexible than _Layers_, combining the benefits of both patterns. The costs are:
* There is no significant reduction in domain complexity (unlike that provided by vanilla _Services_)
* Use cases that are limited to a single business logic subdomain are somewhat slower than those within the original _Services_ pattern.

Here, a skillful combination of two basic patterns has become ubiquitous because it collected benefits that were important to many projects without possessing any critical drawbacks. In addition, it is a prominent example of outsider architecture, something which has never been featured in famous books on patterns but has nevertheless conquered the programming world.

_Software architecture_: [Ports and Adapters](https://alistair.cockburn.us/hexagonal-architecture/), [(Re)Actor-fest](http://ithare.com/multi-coring-and-non-blocking-instead-of-multi-threading-with-a-script/3/), Half-Async/Half-Async [[POSA2](#POSA2)] (_Proactor_ model), **Model-View-Controller** [[POSA1](#POSA1)] (unidirectional flow).

_System architecture_: **[Hexagonal Architecture](https://alistair.cockburn.us/hexagonal-architecture/)**, [Onion Architecture](https://herbertograca.com/2017/09/21/onion-architecture/), [Clean Architecture](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html).

_The diagram does not look like Hexagonal Architecture!_ All the structural diagrams in this series are drawn in Cartesian _ASS_ coordinates (described in [Part 3]), whereas typical drawings for _Hexagonal Architecture_ use polar coordinates with reverse abstraction for distance and subdomain for angle:

![Polar to Cartesian coordinates transformation for Hexagonal Architecture](./Hex_Coordinates_Vertical.png "Polar to Cartesian coordinates transformation for Hexagonal Architecture")

In _control_ systems, the domain model tends to contain information about the last observed state of the system and the environment to base its decisions on. For example, in robotics, a control module should be able to synchronously access (read the cached data for) both the coordinates and velocities of all the manipulators and a 3D map of its environment to allow for the real time (in-RAM, without reading from the hardware) calculations of future actions.

In _data processing_ systems, the amount of data (the full state of the system) is usually larger than the available RAM; thus, it needs to be stored in a database wrapped with one of the adapters and be read into the model only when the data is needed to process a request. The model usually only contains the data loaded for the ongoing requests, though sometimes, it may cache frequently used objects to speed up request processing and unload the database.

Requests from the model to the adapters may be synchronous (blocking RPC), asynchronous (request/confirm or notifications), or a mixture of the two (e.g. synchronous to the database and asynchronous to the network adapters) – whichever is most convenient for the system under development based on the domain and non-functional requirements. 

If both _control flow_ and _data flow_ are used (as in telecom), the model (called the _control plane_) is responsible for _setting up_ the dataflow, while the heavy data traffic (_data plane_) is handled by the adapters (or even the underlying hardware) according to the installed rules, often in a zero-copy or DMA manner. This is where direct adapter-to-adapter channels [appear](https://hillside.net/plop/2020/papers/poltorak.pdf).

A variant: 

#### Model-View-Controller [[POSA1](#POSA1)]

![A structural diagram for Model-View-Controller](./MVC.png "A structural diagram for Model-View-Controller")

**_Isolating the business logic from the UI._** Based on its original description wherein _view_ and _controller_ were adapters for a graphical interface, _MVC_ may be considered a special case of _Hexagonal Architecture_ with a unidirectional (_pipelined_) _control_ flow.

According to [[POSA1](#POSA1)], _MVC_ separates a _model_ (logic) from a user interface in order to satisfy the following forces: 
* Support for multiple _views_ of the same _model_, while _Hexagonal Architecture_ allows for running the same business logic (_model_) in different setups (sets of _adapters_).
* The implementation of real-time change propagation to _views_, while _Hexagonal Architecture_ makes the properties (including the responsiveness) of the _model_ and the _adapters_ independent; thus, a slow _adapter_ or _model_ will not block other components.
* The option of allowing the UI to be changed without touching the main business logic, the same freedom that holds for the _adapters_ in _Hexagonal Architecture_.
* The ease of porting the UI to new platforms, which is similar to the protection from _vendor lock-in_ in _Hexagonal Architecture_.

Noticeably, the two old famous architectural patterns that feature nearly identical _ASS_ (structural – see [Part 3]) diagrams _serve similar goals _and_ provide similar benefits_.

The structural diagram for _MVC_ also bears a resemblance to the one for _Pipeline_ ([Part 3]); both feature unidirectional control flows and pairs of low-level components (_source_ and _sink_), though in _Pipeline_ architecture, the upper (business logic) layer contains multiple modules (_filters_). Thus, _Pipeline and Hexagonal Architecture are related_. If a project that was designed as a pipeline gets new requirements that make its _filters_ interdependent, or if there is a need for the ultimate optimization of performance and response time, the logic-containing _filters_ may be merged into a synchronous _model_, thus violating the original _Pipeline_ architecture and transforming it into a _Hexagonal Architecture_. Such an experience would mean that the original understanding of the project’s domain or forces (non-functional requirements) was incorrect, but, luckily, _Pipeline_ architecture is flexible enough to be reshaped at late stages of the project.

![A transformation of Pipeline to Hexagonal Architecture](./Pipeline_to_Hexagonal.png "A transformation of Pipeline to Hexagonal Architecture")

A [little more work](https://hillside.net/plop/2020/papers/poltorak.pdf) is needed to turn _domain actors_ (_Services_ – also from [Part 3]) into _Hexagonal Architecture_. First, each _service_ is divided into a high-level logic and low-level implementation details layers in a way similar to the one described above for turning a monolith into _Hexagonal Architecture_. Then, the upper actors that contain the business logic belonging to the individual _services_ are merged into a unified synchronous _domain model_.

![A transformation of Services to Hexagonal Architecture](./Services_to_Hexagon.png "A transformation of Services to Hexagonal Architecture")

With _Hexagonal Architecture_, the business logic resides in the upper layer. It is possible to reverse this setup:

### Gateway [[MP](#MP)] (system model over domain services)

![A strctural diagram for Gateway](./Gateway.png "A strctural diagram for Gateway")

**_Isolating the system from its users_**. A thin system model layer is added over a set of services. The model encapsulates the services by providing a firewall and authentication functionality to the system, translating incoming requests to an internal data format, routing those requests to services of interest, and possibly aggregating responses from several services (_Mediator_ [[SAP](#SAP)] – see the _Orchestrators_ pattern below). This makes the system of services appear as a single service to the external world and reduces its attack surface.

_Benefits_ (in addition to those of _Services_, described in [Part 3]):
* The system is encapsulated by a _gateway_ that reduces the attack surface (from _Layers_).
* It is easy to support multiple client protocols, as the clients interact with a dedicated external communication module (_gateway_) that encapsulates the protocol translation and always queries the _domain_ _services_ using an internal protocol (from _Layers_).

_Drawbacks_ (in addition to those of _Services_ from [Part 3]):
* The _gateway_ causes some performance degradation (from _Layers_).
* The _gateway_ may be a single point of failure (from _Layers_).

_Evolution_:
* If the business logic becomes coupled, the _gateway_ may incorporate support for _orchestrators_ (see below).
* When having too many services independently developed and deployed resembles a nightmare, the services should be gathered into groups (_Cell-Based Architecture_, mentioned in [Part 5]), with each group encapsulated by a dedicated _gateway_.

_Summary_: A _gateway_ isolates the system from external clients in a role similar to that of an _adapter_ from _Hexagonal Architecture_, making it easy to support new client technologies and new types of clients without modifying the main business logic.

_Common names_: **Gateway**, Firewall.

_Software architecture_: Facade [[GoF](#GoF)], Proxy [[GoF](#GoF), [POSA1](#POSA1)], Dispatcher [[POSA1](#POSA1)].

_System architecture_: API Gateway [[MP](#MP)].

Both _Hexagonal Architecture_ and _Gateway_ provide an isolation of the application’s business logic from the environment. Both achieve this by adding an extra layer of indirection at the system’s boundary. They differ in the definition of the application being protected: for _Hexagonal Architecture_, the application consists of the monolithic business logic, while with _Gateway_, the whole system of services, including their databases and 3rd party components, is protected. One of the adapters in _Hexagonal Architecture_ may function as a _gateway_ to clients.

The only case remaining with the same structural diagram appears when the business logic is spread over all the modules:

### Application Service (domain model over domain services)

![A structural diagram for Application Service](./Application_Service.png "A structural diagram for Application Service")

> _(The domain services may or may not communicate directly)_

**_All services are equal, but some services are more equal than others._** There is a service (_application service_) that faces most of the customer requests and coordinates other services (_domain services_) for running system-wide tasks.

_Benefits_:
* The thorough decomposition of business logic by both subdomain and level of abstraction makes the system evolvable (from both _Layers_ and _Services_).
* Coupled use cases are supported (from _Layers_).
* It is possible to scale the high-level task logic service and the subdomain services independently (from both _Layers_ and _Services_).
* In many cases, domain services are not coupled (don’t rely on each other’s interfaces), unlike those in systems without the coordinator layer.

_Drawbacks_:
* Use cases are hard to code and debug (from _Services_).
* Data may need to be synchronized among the components (from _Services_).
* The system’s responsiveness and throughput deteriorate (from _Services_).

_Evolution_:
* If the business logic becomes coupled, the _application service_ may incorporate support for _orchestrators_ (see below).
* If the _application service_ itself grows into a monolithic hell, it should either be split into _Hexagonal Hierarchy_ (implementable for hierarchical domains) or become a kind of _Cell-Based Architecture_, both mentioned in [Part 5].
* If a new set of use cases appear that are representable under the current domain abstraction being used by the existing _application service,_ then a new implementation of _application service_ may be added to cover the new use cases. This efficiently turns the _Application Service_ architecture into _Service-Oriented Architecture_ (see [Part 5]).

_Summary_: _Application Service_ is a natural domain decomposition in cases where one subdomain supervises the other subdomains. It may greatly decouple business logic for huge projects at the cost of increasing operational and debugging complexity.

_Common names_: [Application Layer](https://herbertograca.com/2017/09/07/domain-driven-design/) [[DDD](#DDD)].

_Software architecture_: Human-Machine Interface.

_System architecture_: [Task Service Layer](https://patterns.arcitura.com/soa-patterns/basics/soamethodology/service_layers).

This structure is a basic _Hierarchy_ (that may be built up by adding more layers of services) or an underdeveloped _SOA_ (which emerges when several different _application services_ are formed). Both systems are described in [Part 5] and are known to be able to mitigate domain complexity, showing the possible ways of evolving a project as it grows.

If the diagram is inverted along the _abstraction_ axis, it turns into:

## U-shaped systems

Here, the domain services have more abstract (i.e. high-level) logic than that of the model they use, which may just consist of a service transport layer, hold shared data, or be a full domain model exposing an interface for the higher layer to build upon. Again, three patterns emerge:

### Middleware (domain services over a system model)

![A structural diagram for Middleware](./Middleware.png "A structural diagram for Middleware")

**_Sharing a transport to simplify operations. Services_** communicate via a dedicated transport layer that knows about all the system components (_Broker_ [[POSA1](#POSA1), [EIP](#EIP)]) and lets them address each other (_Message Bus_ [[EIP](#EIP)]). A _middleware_ may guarantee message delivery, simplifying recovery in case of failures. It may also provide message logging, which is useful for debugging and regression testing, and may sometimes manage the _services_ by implementing recovery and scaling aspects.

_Benefits_ (in addition to those of _Services_, [Part 3]):
* It allows a faster start to the project, as the transport layer (possibly with such _ops_ functions as scaling and recovery) is usually available out of the box.
* The connectivity is less complex thanks to the presence of a uniform protocol and the system model (_Broker_).
* It simplifies failure recovery, as a _middleware_ usually provides message delivery guarantees and may restart failed services.

_Drawbacks_ (in addition to those of _Services_, [Part 3]):
* A generic _middleware_ may not provide the optimal means of communication for every connection in the system.
* _Broker_ topology may slow down messaging to some extent.
* The _broker_ may become a single point of failure.

_Evolution_:
* _Microkernel_ implementations, such as Akka or Erlang/Elixir, can be used as a _middleware_ for projects that require good scalability and fine-tuned fault tolerance.
* _Service Mesh_ ([Part 5]) can be used as a _middleware_ with the ability to translate between various message formats and transports.

_Summary_: _Middleware_ is very common when a relatively high number of services need to communicate – in that case, supporting communication channels between each pair of services becomes impractical. It does not add any significant architectural benefits or drawbacks to the system it serves.

_Publish-subscribe_ engines may be considered a kind of _middleware_, and they may be present even in embedded devices. A similar _middleware_ option for systems of local actors is sending messages without explicitly setting destination actors; in this case, every type of message is delivered to a dedicated global subscriber (this was also briefly mentioned in [Part 1]).

_Software architecture_: Middleware.

_System architecture_: (Message) **Broker** [[POSA1](#POSA1), [EIP](#EIP), [MP](#MP)], Message Bus [[EIP](#EIP)], Enterprise Service Bus (also manages services and translates payload formats).

The _message bus_ is usually excluded from architectural diagrams, as it: is very common, does not influence business logic, and does not change the system’s properties. Aside from specialized _Middleware _frameworks_,_ similar functionality is provided by decentralized _meshes_ ([Part 5]) and resource-sharing _microkernels_ (see below).

### Shared Repository [[POSA4](#POSA4)] (domain services over a domain _data_ model)

![A structural diagram for Shared Repository](./Blackboard.png "A structural diagram for Shared Repository")

> _(The services may or may not communicate directly)_

**_Sharing the data to simplify the development._** Services are created with a shared _data layer_ (_repository_).

_Benefits_:
* The services share data, allowing for domain-wide commits without _event sourcing_ [[MP](#MP)], _views_ [[DDIA](#DDIA)] or _sagas_ [[MP](#MP)] (from _Layers_).
* The services are decoupled in deployment and some properties (from _Services_).
* The code of the services is more independent than that in vanilla _Domain Services_ systems because the _data layer_ mediates much of the communication.
* It allows a quicker start on the project than what would be possible with vanilla _Services_ (from _Layers_).
* The _data layer_ is usually available out of the box.

_Drawbacks_:
* The service implementations are still coupled via the shared _data layer_ (from _Layers_).
* The _data layer_ is likely to be hard to scale or shard (from _Layers_).
* The _data layer_ may become a single point of failure (from _Layers_).
* The shared _data layer_ implementation may not fit all the services equally well.

_Evolution_:
* As the workload and amount of stored data grows, the shared database will likely become a bottleneck. Two solutions are possible: going for vanilla _Services_ (from [Part 3]) that don’t share any data, or relying on a distributed _data plane_ of _Space-Based Architecture_ (mentioned in [Part 5]).
* The _shared repository_ may strongly couple the implementation and properties of the services that use it. Decoupling the services requires that they stop sharing data.

_Summary_: _Shared Repository_ sacrifices many of the benefits of _Services_ for a quick start on the project and the simplicity of its development. It holds its ground against _Monolith_ ([Part 2]) when diverse use cases require the system to manifest contradictory properties, e.g. in basic combined OLTP + OLAP applications.

Synchronous access to a _shared repository_ makes the actor system violate the actor model by sharing the state between actors. In this case, the _data layer_ should take care to resolve probable deadlocks.

_Software architecture_: **Blackboard** [[POSA1](#POSA1)], Global Data.

_System architecture_: **Shared Database**, Smart UI [[DDD](#DDD)], Shared Repository [[POSA4](#POSA4)].

Both _Shared Repository_ and _Middleware_ provide means of communication to a system of services, have similar structural diagrams, and share many benefits and drawbacks – here, once again, the correlation between a structure and its properties becomes prominent.

_Mesh_ ([Part 5]) provides a decentralized _middleware_ and sometimes also implements a _shared repository_ (called _Space-Based Architecture_) with physically distributed hardware.

### Plug-ins [[SAP](#SAP)] (domain services over a domain model)

![A structural diagram for Plug-ins](./Plug_Ins.png "A structural diagram for Plug-ins")

**_Supervising or fine-tuning the behavior_**. A monolithic domain model is extended with higher-level services (_plug-ins_) that collect metadata and tune or customize the model’s behavior. The _plug-ins_ may be called synchronously (i.e. looped into the model’s business logic), be notified asynchronously (e.g. collecting statistics), or query the model at will (being a controller like an AI planner, etc.).

_Benefits_:
* A very high-level logic may be written in dedicated languages or [DSL](https://en.wikipedia.org/wiki/Domain-specific_language)s (from _Layers_).
* Parts of the high-level logic are independent (in terms of development, properties, scheduling, deployment, etc.) of each other (inherited from _Services_) and of the model (inherited from _Layers_).
* The high-level logic is customizable, and different implementations may be switched in runtime or be plugged in in parallel (sharding is possible, as the _plug-ins_ don’t communicate directly).
* Event replay may be applied for debugging and testing the high-level modules in isolation.
* The main business logic supports coupled use cases (from _Layers_).
* The system tends to be fast (from _Monolith_) unless _plug-ins_ are abused.
* The complexity of the business logic is somewhat reduced by splitting high-level aspects into separate modules (from _Layers_ and _Services_).

_Drawbacks_:
* The amount of planning and development needed to support _Plug-ins_ is likely to be nontrivial. 
* _Plug-ins_ can only extend aspects of the model that were explicitly designed to be customizable.
* The _plug-ins_ tend to be independent and may have trouble intercommunicating (from _Services_).
* Use cases that involve _plug-ins_ will be slowed down (from _Layers_).
* Testability suffers greatly, as there may be many possible combinations of _plug-ins_.

_Evolution_:
* If there is a need to tune the system behavior in whole or let users write and apply custom logic, providing a _Domain-Specific Language_ (see below) should be considered.

_Summary_: _Plug-ins_ may benefit large projects that need extra flexibility or that have a nontrivial amount of very high-level business logic. However, the pattern often needs extensive support in the main code, which makes it quite hard to construct the system correctly on the first attempt. The approach is likely to be overkill for medium- and small-sized projects, while in huge projects, the domain model may well reach _monolithic hell_ [[MP](#MP)].

This is yet another case, like that of _Hexagonal Architecture_, which applies a combination of simple patterns (_Layers,_ _Services_ and _Sharding_) to yield benefits without inviting any critical flaws. While _Hexagonal Architecture_ decouples the application’s business logic from the periphery, _Plug-ins_ decouple the basic business-logic in the domain model from its high-level aspects and allow for variations in multiple aspects of the system’s behavior.

_Common names_: Metadata, Plug-ins [[SAP](#SAP)], Aspects, Hooks.

It is common to see _Plug-ins_ applied on top of _Hexagonal Architecture_’s domain model, which results in a kind of a model-in-the-middle system and combines the properties of both architectures, but the resulting architecture does not boast any special features and thus will not be reviewed separately.

## H-shaped systems

It is sometimes convenient to build a set of (often transient) _domain services_ on top of a model that provides a unified or virtualized interface to the underlying system and manages the high-level services:

### Microkernel [[POSA1](#POSA1)]

![A structural diagram for Microkernel](./Microkernel.png "A structural diagram for Microkernel")

**_Sharing the system resources among hordes of services_**. A system model (_microkernel_) provides means for custom _applications_ (_external services_) to communicate and access system resources owned by _drivers_ (_internal services_). Usually, the _microkernel_ also manages the _drivers_ and _applications_, making sure that the system survives the failures of its individual components.

> _By the way, here is an example of a diagram with two domains: the business domain of the applications and the resources domain of the drivers. Both are shown along the same axis, as only two dimensions are available for diagrams._

_Benefits_:
* The system can often recover from the failures of its individual components (inherited from _Middleware_). This is enhanced by Erlang’s and Akka’s [supervisor hierarchies](https://ferd.ca/the-hitchhiker-s-guide-to-the-unexpected.html) if these frameworks are used.
* The system is foolproof in regard to the application’s (mis-)behavior.
* Applications can seamlessly migrate between environments (inherited from _Hexagonal Architecture_).
* Scalability is very good when distributed _Microkernel_ frameworks are in use.
* It is easy to replace application dependencies, in terms of both hardware and 3rd party software (from _Hexagonal Architecture_).
* The applications that run on the same system and share its resources may be independent (from _Services_).
* The deployment cycles of _applications_ and _drivers_ are completely independent  (from _Layers_).
* A faster start to application development is possible if the lower layers (_microkernel_ and _drivers_) are initially available (from _Middleware_).

_Drawbacks_:
* The infrastructure is very complex in regard to both coding and architectural decisions that must satisfy every kind of application.
* Accessing remote resources tends to be (very) slow and complex, thus making the pattern barely viable for distributed systems unless the _microkernel_ is able to move a running _application_ between servers (which is supported by Akka and Erlang).
* The _microkernel_ may be the single point of failure.
* _Microkernel_ is often implemented as a virtual machine, slowing down the running of applications.

_Evolution_:
* A distributed microkernel can be implemented with _Service Mesh_ ([Part 5]). However, as the implementation is very nontrivial, a 3rd party product is used in most cases.

_Summary_: _Microkernel_ architecture manages the use of limited resources by untrusted applications and provides them with connectivity, often supporting large numbers of independent or interacting actors and providing the means to build supervision hierarchies for error recovery. It originates with operating systems and is mostly limited to system software (OS, virtualization, distributed FS) because of the high infrastructure development cost and performance penalty imposed on accessing distributed goods. On the other hand, yet another custom _Microkernel_ implementation may become a framework for _SOA_ ([Part 5]), which is even more heavy-weight and sluggish.

_Microkernel_ may be regarded as multiple _Hexagonal Architectures_ sharing a set of _adapters_ via a common _middleware_ or as a _Middleware-Gateway_ system where the _microkernel_ serves as both a _gateway_ to _drivers_ and a _middleware_ to _applications_. A distributed _Microkernel_ is related to _Mesh_ ([Part 5]), which also provides virtualization for system resources.

_Common names_: Runtime, User Space, Applications, Coroutines.

_Software architecture_: **Microkernel** [[POSA1](#POSA1)], Half-Sync/Half-Async [[POSA2](#POSA2)].

_System architecture_: **Containers**, Actors Framework.

Containerization software and Akka and Erlang runtimes are examples of distributed _Microkernel_ frameworks and are used out of the box for cloud applications, some of which run [millions](https://youtu.be/bo5WL5IQAd0?t=2694) of _Nanoservices_ ([Part 3]) with a dedicated actor instance for each user in a banking, telephony, transportation, instant messaging or online gaming network. An OS is a kind of _Microkernel_. In most cases, the _microkernel_ and everything below it is skipped in drawing architectural diagrams.

_Half-Sync/Half-Async_ [[POSA2](#POSA2)], which was first discussed in [Part 2] as an implementation of _monolithic_ applications then revisited in [Part 3] as a _layered_ pattern, appears, on closer inspection, to be _Microkernel_. Indeed, both patterns describe an OS with applications and drivers, the main difference being that _Half-Sync/Half-Async_ does not discern individual drivers in the OS layer. With the coroutine implementation of _Half-Sync/Half-Async_, the coroutine engine stands for the _microkernel_, async event handlers are _internal services_, and the coroutines match _external service_ components.

### Domain-Specific Language (DSL)

![A structural diagram for DSL](./DSL.png "A structural diagram for DSL")

> _(Scripts are usually transient)_

**_Scripting and configuring the system_**. _Plug-ins_ architecture is modified by adding an intermediary layer that provides a runtime support (_interpreter_) and a kind of system model (_framework_) to the upper layer’s plugins (_scripts_), which are usually written in a high-level language. The _interpreter_ will usually manage multiple instances of different _scripts_, making the whole system quite similar to _Microkernel_ except for the nature of the services the lower layer provides; in _Microkernel_, the _applications_ use system resources, while in _DSL_, the _scripts_ manage domain objects that implement the business logic and reside in the _domain model layer_.
_Benefits_ (in addition to those of _Plug-ins_):
* _Scripts_ are usually very high-level and decoupled from the main codebase, thus requiring much less effort to write compared to similar functionalities in the _domain layer_ (from _Plug-ins_).
* _Scripts_ can seamlessly migrate between setups (from _Microkernel_).
* The system may be fool-proof against errors in _scripts_ (from _Microkernel_).

_Drawbacks_ (in addition to those of _Plug-ins_):
* It may be hard to design a good interface between the _scripts_ and the _domain model_ (from _Microkernel_).
* _Scripts_ tend to be slow unless compiled, but compiling a DSL is a nontrivial task (from _Microkernel_).

_Summary_: This is a mixture of _Plug-ins_ and _Microkernel_ that combines most of their properties. The added _interpreter_ _layer_ provides a holistic way to govern the system’s behavior as a whole, as opposed to a discrete set of aspects covered by individual _plug-ins_. While _plug-ins_ tend to be static (don’t change between the system’s deployments), _scripts_ are often short-running tasks that set up domain rules.

_Common names_: Domain-Specific Language (DSL), Scripts, Config File, Command Line Interface (CLI).

_Software architecture_: Interpreter [[GoF](#GoF)].

Prominent examples include game scripts, Blender scripts and even SQL. A very special case of a script is a config file, which is executed once on system startup. A CLI is yet another common example.

There is a variant where the lower layer consists of domain services, with an _ASS_ diagram ([Part 3]) similar to that of _Microkernel_. In that case, the _interpreter_ is also a _gateway_ for the _internal services_, while the _scripts_ manage the distributed system. An example would be CLI and configuration tools for distributed systems or containerization software. Such an architecture is somewhat related to:

### Orchestrators [[MP](#MP)]

![A structural diagram for Orchestrators](./Orchestrators.png "A structural diagram for Orchestrators")

> _(Orchestrators and Mediators are transient)_

**_Distributed transactions and multi-service queries._** Multiple instances of thin domain services (_orchestrators_) are spawned by a _model layer_ (a _gateway_ with an orchestration engine or an _application layer_) over a set of _domain services_. Each _orchestrator_ drives a multi-service use case by iterating through a sequence of steps (requests to individual services). The business logic is split between the _orchestrators_ that belong to the _application layer_ of [[DDD](#DDD)] (and contain very high-level descriptions of the steps to be taken for each user scenario) and the underlying _services_ that correspond to the _domain layer_ of [[DDD](#DDD)], where all of the business rules and knowledge [reside](https://herbertograca.com/2017/09/07/domain-driven-design/). Each _orchestrator_ supervises a single use case running in the system, and thus, multiple instances of many types of _orchestrators_ are often present simultaneously.

_Benefits_:
* The highest-level logic of use cases is easy to implement and read (from _Layers_).
* Subdomain services may be very independent, as the high-level coordination logic has been moved to a separate level.
* Domain complexity is addressed, as most of the business logic is distributed between multiple services of comparable size (from _Services_).
* The system is encapsulated with a _gateway_ that reduces the attack surface (from _Gateway_).
* Multiple client types and protocols are easy to support (from _Gateway_). 
* The _subdomain services_ may be developed and deployed relatively independently (from _Services_).
* The _subdomain services_ run in parallel and are sharded mostly independently (from _Services_).
* Use cases that don’t cross subdomain borders (i.e. are limited to a single subdomain) are very fast (from _Services_).

_Drawbacks_:
* When several _orchestrators_ access the same data, it may lead to many kinds of inconsistencies or data corruption (_anomalies_ caused by the _CAP theorem_ [[MP](#MP)])  (from _Services_, but not as severe as the corresponding drawback present there).
* Use cases that involve several subdomains are relatively slow and are hard to debug (from _Services _and_ Gateway_).
* The _services_ become somewhat bound in properties to allow for efficient orchestration.
* There is moderate administration complexity for _service_ instances, as they must be registered with the _orchestrator engine_ (from _Gateway_).
* The _orchestrator engine_ (usually implemented in a _gateway_ [[MP](#MP)]) can often be a single point of failure (from _Gateway_).

_Evolution_:
* As the complexity of distributed use cases grows, a transition to _Application Service_ or _Hexagonal Architecture_ (see above) may be considered.

_Summary_: _Orchestrators_ counter the main drawback of _(Micro-)Services_ (described in [Part 3]), namely the trouble with use cases that involve several subdomains. They even allow for distributed transactions (_sagas_ [[MP](#MP)]). As splitting to services is the only way to counter domain complexity, _Orchestrators_ are likely to emerge in huge projects. However, they are both much more irksome than synchronous method calls in a monolith (or in the model in a _Hexagonal Architecture_) and tend to somewhat limit the independence of the _services’_ non-functional properties.

_Services with Orchestrators_ is derived from a monolith in the following steps:
1. The monolith is split into _subdomain_ _services_, escaping _monolithic hell_ [[MP](#MP)].
2. An extra layer (_gateway_) governing multi-service use cases and transactions is created to integrate the _services_.

This results in more control over whole-system scenarios compared to pure _Services_ (_Domain Actors_) without losing the benefit of addressing domain complexity. The costs are:
* Interdomain use cases are complicated and slow (compared to _Layers_), but are at least mostly manageable.
* The system is slower and more complex than it would be with the original _(Micro-)Services_ pattern.

This case contrasts with _Hexagonal Architecture_; there, the goal was to combine the benefits of the two basic patterns, whereas _Services with Orchestrators_ addresses the main penalty incurred by utilizing the only basic system structure (_Services_) that is plausible for huge projects.

_Software architecture_: Coordinator [[POSA3](#POSA3)].

_System architecture_: **Orchestrator** [[MP](#MP)], Event Mediator [[SAP](#SAP)].

Somewhat distinct types of orchestrators exist: a _saga_ _orchestrator_ [[MP](#MP)] usually drives a distributed transaction and allows for rollbacks if one of the steps fails, while an _event mediator_ [[SAP](#SAP)] tends to provide a unidirectional flow, with the added benefit of being able to run some or all of the involved steps in parallel. The multiple instances of orchestrators may be considered separate actors (for _sagas_) or may be embedded in a layer (_mediator_ / _gateway_).

## Miscellaneous architectures

There are many ways to apply several of the patterns listed together, but they only seem to combine the properties of the constituents instead of creating something new:
* _Gateway_ on top of _Hexagonal Architecture_ (actually, the _Gateway_ is yet another _adapter_)
* _Plug-ins_ or _DSL_ on top of _Hexagonal Architecture_
* _(Micro-)Services_ with _Gateway_ or _Orchestrators_ and _Middleware_, _Shared Repository_ or _Microkernel_
* _Hexagonal Services_, where _Hexagonal Architecture_ is applied to every _service_ in a system

However, there is one very special architecture unlike any other:

### [(Re)Actor-with-Extractors](http://ithare.com/multi-coring-and-non-blocking-instead-of-multi-threading-with-a-script/3/) (Day and Night)

![A structural diagram for Day and Night](./Day_and_Night.png "A structural diagram for Day and Night")

**_A lock-free shared memory interaction_**. This case comes from game development and allows for the efficient use of all the available CPU cores in systems that contain large numbers of closely interacting (accessing the data of each other), self-governed (with localized decision-making) entities. There is a _scheduler_ that uses a _thread pool_ (a thread per CPU core) to give each entity a chance to run once per _phase_. Once all the objects are served, the _phase_ is toggled. There are two kinds of _phases_:
* Read phase (_Day_ or _Extract_): All the objects are read-only, thus allowing all their data and methods to be accessed without locking. The objects that are running call methods or read data from other objects they are interested in so as to read and store the data they need as input for their planning of future actions.
* Write phase (_Night_ or _Process_): Every object calculates and writes its next state based on the input it has collected during the _day_ phase. The objects do not interact; thus, they behave like actors, each processing a single message it posted to itself during the _day_ phase.

This approach unites the shared memory (objects) and actors paradigms by leading the entire system through repeated _extract_ (shared memory) and _process_ (message passing) phases.

I see the next possible variants:
* The planning may be done during the _day_ phase, with the planning result stored in the object’s message queue and the _night_ phase amounting to the act of applying the previously calculated state updates.
* In the _day_ phase, objects may post messages to each other. During the _night_ phase, they will process all those messages till their queues are empty.

## Summary

This part discussed the following kinds of systems that feature monolithic layers:
* Π-shaped systems, where the common layer unites and uses the underlying services.
* U-shaped systems, where the shared layer connects and supplies a shared workspace for the high-level services.
* H-shaped systems, where the layer virtualizes the underlying system for the topmost services.

Many names for mostly identical structures were mentioned. [The Rule of Three](https://wiki.c2.com/?ThingsInThrees) was observed thrice.

The [next (and final) part][Part 5] is dedicated to fragmented architectures that contain no single module that spreads over the entire system.

## References

<a name="DDD"/>

[DDD] Domain-Driven Design: Tackling Complexity in the Heart of Software. _Eric Evans. Addison-Wesley (2003)._

<a name="DDIA"/>

[DDIA] Designing Data-Intensive Applications: The Big Ideas Behind Reliable, Scalable, and Maintainable Systems. _Martin Kleppmann. O’Reilly Media, Inc. (2017)._

<a name="EIP"/>

[EIP] Enterprise Integration Patterns. _Gregor Hohpe and Bobby Woolf. Addison-Wesley (2003)._

<a name="GoF"/>

[GoF] Design Patterns: Elements of Reusable Object-Oriented Software. _Erich Gamma, Richard Helm, Ralph Johnson, and John Vlissides. Addison-Wesley (1994)._

<a name="MP"/>

[MP] Microservices Patterns: With Examples in Java. _Chris Richardson. Manning Publications (2018)_.

<a name="POSA1"/>

[POSA1] Pattern-Oriented Software Architecture Volume 1: A System of Patterns. _Frank Buschmann, Regine Meunier, Hans Rohnert, Peter Sommerlad and Michael Stal. John Wiley & Sons, Inc. (1996)._

<a name="POSA2"/>

[POSA2] Pattern-Oriented Software Architecture Volume 2: Patterns for Concurrent and Networked Objects. _Douglas C. Schmidt, Michael Stal, Hans Rohnert, Frank Buschmann. John Wiley & Sons, Inc. (2000)._

<a name="POSA3"/>

[POSA3] Pattern-Oriented Software Architecture Volume 3: Patterns for Resource Management. _Michael Kircher, Prashant Jain. John Wiley & Sons, Inc. (2004)._

<a name="POSA4"/>

[POSA4] Pattern-Oriented Software Architecture Volume 4: A Pattern Language for Distributed Computing. _Frank Buschmann, Kevlin Henney, Douglas C. Schmidt. John Wiley & Sons, Ltd. (2007)._

<a name="SAP"/>

[SAP] Software Architecture Patterns. _Mark Richards. O’Reilly Media, Inc. (2015)._

---

_Editor:_ [Josh Kaplan](mailto:joshkaplan66@gmail.com)

_[Part](../README.md)_ [1][Part 1] [2][Part 2] [3][Part 3] **4** [5][Part 5]

---

<a rel="license" href="http://creativecommons.org/licenses/by-nc-sa/4.0/"><img alt="Creative Commons License" style="border-width:0" src="https://i.creativecommons.org/l/by-nc-sa/4.0/88x31.png" /></a><br />This work is licensed under a <a rel="license" href="http://creativecommons.org/licenses/by-nc-sa/4.0/">Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License</a>.

[Part 1]: ../Part1/README.md
[Part 2]: ../Part2/README.md
[Part 3]: ../Part3/README.md
[Part 5]: ../Part5/README.md

---

## Fuente: `publications/IntroductionToSoftwareArchitectureWithActors/Part5/README.md`

_[Part](../README.md)_ [1][Part 1] [2][Part 2] [3][Part 3] [4][Part 4] **5**

---

# Introduction to Software Architecture with Actors: Part 5 – On Fragmented Systems

The [previous part][Part 4] of this cycle was dedicated to systems with _models_, i.e. horizontal layers that spread through an entire domain. If a structural diagram for a system is drawn with abstraction increasing upwards, the model may be found above services (resulting in a Π-shaped system), below them (U-shaped) or in the middle (H-shaped). For each type of system structure, a set of three distinct patterns emerges through variations in the distribution of the business logic over the components.

The [preceding article][Part 3] described the three basic ways to divide a monolith, namely: sharding (spawning identical instances), layers (splitting by abstraction) and services (splitting by subdomain).

Now, according to the _[Rule-of-Three](https://en.wikipedia.org/wiki/Planescape#Rule-of-Three)_, there should be three kinds of fragmented architectures with neither monolithic layers (models) nor non-layered subdomains.

- [Mesh](#mesh)
  - [Service Mesh](#service-mesh)
  - [Leaf-Spine Architecture](#leaf-spine-architecture)
  - [Peer-to-Peer Network](#peer-to-peer-network)
  - [Space-Based Architecture [SAP]](#space-based-architecture-sap)
- [Distributed Modules (SOA)](#distributed-modules-soa)
- [Hierarchy](#hierarchy)
  - [Hexagon of Hexagons (Hexagonal Hierarchy)](#hexagon-of-hexagons-hexagonal-hierarchy)
  - [Bus of Buses (Hierarchy of Networks)](#bus-of-buses-hierarchy-of-networks)
  - [Services of Services (Cell-Based Architecture)](#services-of-services-cell-based-architecture)
- [Design Space](#design-space)
- [Summary](#summary)
- [The Pattern Language](#the-pattern-language)
- [References](#references)

## Mesh

Cutting a monolith along all the axes under discussion (_abstraction_, _subdomain_, _sharding_ – see [Part 3]) simultaneously does not make much sense, as the resulting structure is too hard to manage, that is, unless it relies on communication between shards to form a _mesh_.

![Meshes](./Mesh_Variants.png "Meshes")

**_A customizable distributed middleware for unreliable networks_**. The lower layer of services implements network connectivity, while the upper services contain the business logic. Two domains, namely, _application_ and _network_, are present.

The _network_ domain may supply _proxies_ that virtualize network resources for the _applications_, but is generally built around _mesh_ shards that sustain network topology and are usually managed via a global _configurator_. _Proxies_ and _mesh_ _actors_ have different properties; the _proxies_ provide a convenient connectivity and cached resource abstraction to the _applications_, which usually includes (some of) the: blocking calls, retries, virtual connection objects and _data grid_, while _mesh_ is occupied with a great deal of the low-level, and often hardware-dependent, real-time communication. 

The other domain is the _application_ level, where different kinds of business _applications_ run on top of and communicate through identical or similar (as application protocols may vary in _Service Mesh_) _proxy_ interfaces. The entire _network_ layer serves as a distributed _middleware_ (described in [Part 4]), with some implementations also providing a _shared repository_ (also from [Part 4]).

In this type of system, all the components have specific roles and are usually developed and deployed independently. This explains the granularity observed in the structure. However, from the viewpoint of business logic, it is mostly similar to a system of _services_ or _shards_ (both described in [Part 3]) that make up the application level; thus, the entire network layer tends to be excluded from architectural discussions once implemented or purchased.

_Benefits_ (in addition to those of _Services_, [Part 3]):
* The system tolerates the loss of any component thanks to its decentralization and redundancy; this way, it can run on commodity hardware or even use the leftovers of CPU time at volunteers’ desktops worldwide.
* The extra layer of _proxies_ allows for abstracting distributed resources, e.g. providing a virtual view of physically distributed data in _Space-Based Architecture_ and torrents.
* Perfect scalability is achieved.
* The unified transport interface simplifies development.

_Drawbacks_ (in addition to those of _Services_, [Part 3]):
* Scenarios that involve multiple _applications_ may be tremendously hard to debug due to unstable failures at the network level.
* Scenarios that involve multiple _applications_ may be unstable if _Mesh_ is run over an unreliable network or low-end hardware; therefore, shards of a single _application_ type must be interchangeable (either stateless or with replicated data) to provide redundant service capacity.
* There is a high communication overhead that causes delays in messaging and slows down access to distributed resources for systems not limited to a single data center.
* Use cases may need to retry on failures at any step and tolerate lost or duplicated messages, cases of multiple diverging responses to a single request included.
* The transport layer is complex; thus, an out-of-the-box product should be used wherever possible.
* The unified transport interface may be non-optimal for some use cases.

_Summary_: _Mesh_ provides a shared virtual space over unreliable networks, often at the expense of communication speed and stable participants’ identities.

_Common names_: Peer-to-peer / Ad-hoc Networks.

_System architecture_: **[Service Mesh](https://buoyant.io/service-mesh-manifesto)**, Space-Based Architecture [[SAP](#SAP)].

Real-world applications of _Mesh_ architectures include data center infrastructure, torrents and even [finances](https://jimmysongio.medium.com/introducing-sofamesh-a-solution-for-large-scale-service-mesh-based-on-istio-by-ant-financial-84ff51fd66f6). Like _Middleware_ and _Microkernel_ (both described in [Part 4]), _Mesh_ is also usually dropped from architectural diagrams, as it is transparent for business logic.

There are many variants of meshes designed for different uses. I will provide short descriptions for some of the ones that I find interesting:

### [Service Mesh](https://buoyant.io/service-mesh-manifesto)

Proxies may contain application-specific code that handles protocol format conversions (e.g. JSON &lt;-> XML &lt;-> Protobuf) and implements aspects (security, observability). This provides an extra layer of indirection, with independent development and deployment, between the business logic and the network implementation.

_Service Mesh_ frameworks are usually purchased to kickstart projects that implement _Microservices_ ([Part 3]) or to merge systems that have been developed independently.

### [Leaf-Spine Architecture](https://www.geeksforgeeks.org/spine-leaf-architecture/)

This is a two-layer _full mesh_ (where every device in one layer is directly connected to _all_ of the devices in the other layer) for use inside data centers. The full connectivity approach both guarantees that the failure of any one device will not impair the network speed for other components and provides a high data transfer rate with commodity hardware. However, the size of the mesh is limited by the number of physical ports in the network switches used, and wiring the thing involves hundreds or thousands of network cables.

_Leaf-Spine Architecture_ provides fast, cheap and stable connectivity between servers within data centers of moderate size.

### Peer-to-Peer Network

Here, all the _nodes_ are equal and able to find each other. Moreover, _proxy_ and _mesh_ components are merged together to optimize the single task the _P2P Network_ is specialized in.

_P2P Networks_ are used for fault tolerant communication and data exchange (torrent, onion, bitcoin).

### Space-Based Architecture [[SAP](#SAP)]

This pattern seems to be a _P2P Network_ featuring a _data grid_ – a virtualized _shared repository_ (from [Part 4]) that provides every node’s _application_ with access to the entire project’s data, which is distributed and replicated over multiple shards. It works like the OS’s swap files; if the _application_ (called the _processing unit_) needs to access a piece of data that is not available in the node’s RAM, the proxy (_data grid_) blocks the _application_ and sends a request to its peers to get a copy (and possibly ownership) of the data. As soon as the data has been delivered and unpacked to the node’s RAM, the waiting _processing unit_ thread is notified and proceeds as if the data originally belonged to the node. The _data grid_ tracks ownership for data segments (to avoid write conflicts) and takes care of replication and persistence (to provide parallel read access and avoid data loss). It is also likely to contain some logic that assigns user requests to nodes which already have the required data in RAM (improving temporary data access locality).

_Space-Based Architecture_ can be used for projects that work with huge datasets and are deployed over multiple data centers if the actions that run on the dataset are local (i.e. do not require reading through or transforming much of the dataset).

Here, once again, a family of related distributed implementations (_Meshes_) targets two architectural patterns (namely, _Middleware_ and _Shared Repository_, both described in [Part 4]) that have similar structural diagrams, proving that a pattern’s structure defines its properties and thus its relations to other architectures.

## Distributed Modules (SOA)

The preceding structure (_Mesh_) had deep sharding, explicit layers (application, proxy, connectivity) and subdomains (application support and network topology), and few component types. If those restrictions are lifted, the [chaos](http://www.soa-manifesto.org/default.html) emerges:

![SOA](./Distributed_Modules.png "SOA")

**_Sacrificing everything for modularity_**. If the modules of a _monolith_ ([Part 2]) are distributed over a network, the result is, surprisingly, a _distributed monolith_ [[MP](#MP)] for synchronous RPC calls or a _service-oriented architecture_ (_SOA_) for asynchronous communication.

The diagrams omit a unified _middleware_ (_Enterprise Service Bus_) that connects and manages the _services_. 

_Benefits_:
* The strongest possible reduction in _dev_ (module code) complexity (see [Part 1]) is obtained through the division of the business logic along both the _abstraction_ and _subdomain_ axes (refer to [Part 3] for the system of coordinates analyzed).
* Each module may run on a dedicated hardware that is suitable to its needs.
* _Asynchronous_ systems are able to survive the failures of individual modules.
* The modules are sharded and deployed independently.

_Drawbacks_:
* _Ops_ (module integration) complexity is high, as the modules depend on each other’s interfaces and contracts.
* The interdependencies of the modules cause interdependencies among the teams that develop those modules.
* With _synchronous_ communication, a single failed low-level module may halt the entire system.
* All the use cases are slow because too much messaging is involved.
* All the use cases are nearly impossible to debug because of the number of distributed components involved.

_Evolution_:
* If the integration complexity hits hard or the performance suffers from having too much distributed communication, merging the services into coarse-grained components should be considered. The options include _Monolith_ ([Part 2]) or _Layers_ ([Part 3]) for smaller projects (a tremendously rare case with _SOA_) and _(Micro-)Services_ ([Part 3]), probably involving _Orchestrators_ ([Part 4]), for large systems.
* If there is a need to integrate modules that use non-standard transports, a _service mesh_ (described above) may be considered for use as a _middleware_ (traditionally called an _Enterprise Service Bus_ in SOA).

_Summary_: _SOA_ decreases the individual modules’ code complexity without introducing any code or data duplication among the modules at the cost of incurring overwhelming integration complexity and interdependency.

_System architecture_: **[Service Oriented Architecture](https://patterns.arcitura.com/soa-patterns/basics/soamethodology/service_layers)**,Distributed Monolith (synchronous RPC calls) [[MP](#MP)].

This approach should have worked in an ideal world with perfect interteam communication and zero-cost distributability. Nevertheless, the method survived, mostly in automotive, avionics and legacy enterprises (that had put lots of resources into implementing _SOA_ while it was considered a brave new fashion).

Why is _SOA_ still thriving in vehicle engineering? Probably because it allows the services to be dispersed over cheap, spatially distributed chips. If there are already physical black boxes being used for logging – why not use them as system-wide logger components? A brake chip placed near a wheel does not log anything to its own flash – it sends all the logs to a remote black box. And even if the black box fails, the brake will still be functional. The reliability of the CAN bus compared to that of the Internet could also have influenced the choices made in the industry, and the same could be said of the inherent modularity of car internals, which resembles the OOP principles _SOA_ was based on. Moreover, design committees in automotive, avionics and enterprise industries could well be banning any innovation for ages. Huge codebases in these domains should have been yet another driving force towards favoring _SOA_ architectures.

Why did _SOA_ go extinct in other kinds of backends? Because _Microservices_ (detailed in [Part 3]) are way more independent in their development, deployment and production. This means less struggling with _ops_ (i.e. deployment and integration), less inter-team synchronization, minimal downtime and better performance. It is true that with _Microservices_, the code is less granular and sometimes duplicated, but the idea of reaching high granularity was the mistake discussed in [Part 1]; any attempts to distribute a coupled logic or cut it with asynchronous interfaces result in slow, unstable, and unsupportable systems that are hard to understand and nearly impossible to debug.

## Hierarchy

The last pattern to be discussed is more of an approach than a well-defined composition of modules.

![Hierarchies](./Hierarchies.png "Hierarchies")

**_Using recursive modularity and polymorphism to curb complexity_**. A pattern is applied recursively, often resulting in a tree-like structure with a relatively small amount of very high-level logic managing multiple, in many cases polymorphic, modules of an intermediate abstraction level, each of which supervises a set of concrete services or devices.

_Benefits_:
* The domain logic is divided into multiple, relatively small parts.
* The development, deployment, scaling and properties of the involved modules are mostly independent.
* The system is fault tolerant for any but the topmost component.
* The subsystems may serve many use cases without escalating them to the highest level.
* Local use cases tend to be fast and run in parallel.
* Both bottom-level components and entire subsystems are easily replaceable or stubbable thanks to the abundance of layers and the common use of polymorphism.

_Drawbacks_:
* The pattern is not applicable to domains that are not inherently hierarchical.
* The topmost layer may become a bottleneck for performance, stability or evolvability.
* The failure of the topmost component will halt global use cases. However, it will not influence local tasks handled by the subsystems.
* Global use cases, which spread over multiple layers, are rather slow and hard to debug.
* The start of the project may be on the slow side because many interfaces need to be settled.

_Summary_: _Hierarchy_ brings many significant benefits wherever it can be used.

_Common names_: Hierarchy, Tree, Recursive Structure.

_Software architecture_: Presentation-Abstraction-Control [[POSA1](#POSA1)].

_System architecture_: **[Cell-Based Architecture](https://trmidboe.medium.com/cell-based-architecture-and-federated-microservices-4fc0cf3df5a6)**.

Hierarchy handles domain complexity by efficiently distributing it over multiple layers of services. If the main drawback of _Hexagonal Architecture_ ([Part 4]) lies in its monolithic business logic layer, hierarchical _Hexagon of Hexagons_ divides the business logic along both the _abstraction_ and _subdomain_ design dimensions. If the _Message Bus_ ([Part 4] – _Middleware_) logic becomes too complex, _Bus of Buses_ can come to the rescue. When there are too many _(Micro-)Services_ ([Part 3]) to integrate and deploy efficiently, _Services of Services_ is the answer.

If a system looks like it can be partitioned into groups or into a coordinating component and several (preferably polymorphic) coordinated components of comparable size, it calls for the application of the _hierarchy_ approach. If there is no coordinator, the system resembles _Services_ (from [Part 3] of this cycle). And if the coordinator seems to incorporate the largest share of the business logic, the system shifts towards Π-shaped _Hexagonal Architecture_ or _Application Service_ structures (both from [Part 4]).

The variants I am aware of include:

### Hexagon of Hexagons (Hexagonal Hierarchy)

The business logic of each layer operates a set of lower-level entities, each containing its own business logic. This way, the _adapters_ of the topmost _hexagonal architecture_ ([Part 4]) become _models_ of the lower layer. In its simplest composition, the structure is similar to _Application Service_ ([Part 4]) with hexagonal components.

Such structures emerge in industrial IoT (e.g. fire alarm) systems; the upper layer is a control desk with a UI, while below it reside distributed floor and elevator controllers that integrate data from individual sensors in their respective zones of control. Such multi-layer, multi-component systems are flexible enough to be easily re-configured for various kinds of buildings or updated with new sensor models.

### Bus of Buses (Hierarchy of Networks)

When there is a need to interconnect multiple types of networks (or _Message Buses_ – [Part 4]), it is usually done via a single master network. Each of the lower-level networks implements a gateway, adapter or router that translates between the higher-level and lower-level networks’ protocols.

The most well-known example is the Internet or telephony networks. In the desktop world, there was the _Presentation-Abstraction-Control_ [[POSA1](#POSA1)] pattern, which is [likely dead by now](https://herbertograca.com/2017/08/17/mvc-and-its-variants/). It used a tree of agents (i.e. actors subscribed for external events) to present hierarchical structures with component-specific UI widgets.

### Services of Services ([Cell-Based Architecture](https://trmidboe.medium.com/cell-based-architecture-and-federated-microservices-4fc0cf3df5a6))

Having too many same-level _microservices_ ([Part 3]) complicates integration (including tracking service dependencies) and deployment. The proposed solution clusterizes the system into comparatively strongly coupled groups. Each group gets a _gateway_ ([Part 4]), is deployed as a whole and is treated by the other groups as a single _microservice_, notwithstanding its fragmented internal structure. This results in the deployment and integration complexity being based on the number of groups, not the number of individual _microservices_.

This structure may incorporate elements of _Hexagonal Architecture_ and _Orchestrators_ (both from [Part 4]). _Application Services_ ([Part 4]) that feature high-level business logic may be used instead of _Gateways_ if the domain allows for a partially hierarchical decomposition.

## Design Space

The _design space_ [[POSA1](#POSA1), [POSA5](#POSA5)] is an [imaginary](https://youtu.be/AnaQXJmpwM4?t=22) multidimensional set that contains all the possible architectures for all kinds of systems. It is multidimensional because every architecture has multiple parameters that may be changed, each parameter serving as a dimension of the solution space.

However, humans have a hard time dealing with more than three dimensions. Therefore, we need a projection in order to confine our efforts to a couple of design aspects. This is exactly what has been done over the last 3 parts of this cycle with the **_ASS_** (_Abstraction, Subdomain, Sharding_) structural diagrams.

I hope that all (or at least 95% of) the possible elementary system structures in _ASS_ coordinates have been described and analyzed. This means that _any_ reasonable software or system architecture should map to one of the patterns reviewed or a combination thereof when projected from the _design space_ onto the _ASS_ coordinate system. Yes, most of the synchronous monoliths will look similar, since _ASS_ turns monoliths into dumb rectangles. Nevertheless, projecting a distributed system should reveal the structure that defines many of the system’s architectural properties.

## Summary

Most of the architectural patterns described in Parts 3 through 5 mix layers and services to balance and reconcile various aspects of _dev_ (module code) and _ops_ (integration of modules) complexities (see [Part 1] for the definitions).

* _Layers_ have low _integration_ complexity (lacking separate distributed parts) but often feature a coupled and possibly complex domain logic. They are easy to start developing and to debug, but tend to become complicated and fragile as the project grows.
* _Services_ have lower _code_ complexity, as each single service covers a part of the application domain, but suffer in system-wide use cases due to the fact that they are hard to coordinate. It’s a kind of flexible and evolvable solution that’s very easy to get wrong for complex or coupled domains.

It is important to find and apply a set of structures that fits the project’s needs. There are some simple rules:

_It is good_ to keep a coupled logic in a single component. \
_It is bad_ to spread a coupled logic over multiple components, especially if the components are asynchronous or distributed.

_It is good_ to keep parts that vary in non-functional requirements (“-ilities” [[MP](#MP)]) apart in separate, asynchronous entities (actors or services). \
_It is bad_ to try to satisfy incompatible non-functional requirements with a single component.

_It is not always possible_ to follow such simple pieces of advice. Nevertheless, it is usually better to know them beforehand. \
_It is possible_ to change the architecture during a project’s lifetime. However, it is easier said than done.

There is a paradox that the most important decisions must be made at the early stages of projects, precisely when the amount of information available is at its minimum. Software architecture tries to alleviate this trouble by providing means to delay the decisions involved; some patterns, e.g. _Hexagonal Architecture_ ([Part 4]), keep the business logic protected from the implementation details, delaying the selection of third-party tools till their suitability to the project’s needs has been well tested. In other cases, it is possible to [start with a monolithic application](https://martinfowler.com/bliki/MonolithFirst.html) and delay its division into services till the project has outgrown its initial architecture. Thus, it makes sense to know in advance which architectural transitions are available.

## The Pattern Language

The patterns revisited in this series form a pattern system [[POSA1](#POSA1)] – a classification of architectural patterns, in our case – according to their structure in _ASS_ coordinates ([Part 3]). However, people love pattern languages [[POSA2](#POSA2)]; thus, there is a need to show how the architectural patterns are connected and how the architectures may be transformed under various forces. It should be noted that most of the transformations are reversible should forces change, e.g. eagerly escaping a monolithic hell may lead straight into a distributed transactions nightmare or an [interactions inferno](https://www.doit.com/untangling-microservices-or-balancing-complexity-in-distributed-systems/).

![The pattern language](./Pattern_Language_Evolution.png "The pattern language")

The diagram only plots the main transitions between architectural patterns and is too complex to show the forces behind the pattern evolutions. Thus, the reader is advised to check the “Evolution” sections in the pattern descriptions in this series to get the full explanation.

## References

<a name="DDIA"/>

[DDIA] Designing Data-Intensive Applications: The Big Ideas Behind Reliable, Scalable, and Maintainable Systems. _Martin Kleppmann. O’Reilly Media, Inc. (2017)._

<a name="MP"/>

[MP] Microservices Patterns: With Examples in Java. _Chris Richardson. Manning Publications (2018)_.

<a name="POSA1"/>

[POSA1] Pattern-Oriented Software Architecture Volume 1: A System of Patterns. _Frank Buschmann, Regine Meunier, Hans Rohnert, Peter Sommerlad and Michael Stal. John Wiley & Sons, Inc. (1996)._

<a name="POSA2"/>

[POSA2] Pattern-Oriented Software Architecture Volume 2: Patterns for Concurrent and Networked Objects. _Douglas C. Schmidt, Michael Stal, Hans Rohnert, Frank Buschmann. John Wiley & Sons, Inc. (2000)._

<a name="POSA5"/>

[POSA5] Pattern Oriented Software Architecture Volume 5: On Patterns and Pattern Languages. _Frank Buschmann, Kevlin Henney, Douglas C. Schmidt. John Wiley & Sons, Ltd. (2007)._

<a name="SAP"/>

[SAP] Software Architecture Patterns. _Mark Richards. O’Reilly Media, Inc. (2015)._

---

_Editor:_ [Josh Kaplan](mailto:joshkaplan66@gmail.com)

_[Part](../README.md)_ [1][Part 1] [2][Part 2] [3][Part 3] [4][Part 4] **5**

---

<a rel="license" href="http://creativecommons.org/licenses/by-nc-sa/4.0/"><img alt="Creative Commons License" style="border-width:0" src="https://i.creativecommons.org/l/by-nc-sa/4.0/88x31.png" /></a><br />This work is licensed under a <a rel="license" href="http://creativecommons.org/licenses/by-nc-sa/4.0/">Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License</a>.

[Part 1]: ../Part1/README.md
[Part 2]: ../Part2/README.md
[Part 3]: ../Part3/README.md
[Part 4]: ../Part4/README.md

---

## Fuente: `publications/IntroductionToSoftwareArchitectureWithActors/README.md`

# Introduction to Software Architecture with Actors

##### Table of Contents

- **[Part 1](./Part1/README.md) – On Complexity**: Actors and Objects; Complexity and Distributability; Variants of Actors.

- **[Part 2](./Part2/README.md) – On Handling Messages**: Control and Data Flow; Reactor, Proactor, Half-Sync/Half-Async; Request State.

- **[Part 3](./Part3/README.md) – On Simple Systems**: The Coordinate System; Sharding; Layers; Microservices, Pipeline, Nanoservices.

- **[Part 4](./Part4/README.md) – On Systems with Models**: Hexagonal Architecture, Gateway, Application Service; Middleware, Shared Repository, Plug-Ins; Microkernel, DSL, Orchestrators.

- **[Part 5](./Part5/README.md) – On Fragmented Systems**: Mesh, SOA, Hierarchy; Design Space; The Pattern Language. 

---

<a rel="license" href="http://creativecommons.org/licenses/by-nc-sa/4.0/"><img alt="Creative Commons License" style="border-width:0" src="https://i.creativecommons.org/l/by-nc-sa/4.0/88x31.png" /></a><br />This work is licensed under a <a rel="license" href="http://creativecommons.org/licenses/by-nc-sa/4.0/">Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License</a>.

---

## Fuente: `publications/README.md`

# Architectural Metapatterns

The main content of this repository is my book ***Architectural Metapatterns: The Pattern Language of Software Architecture*** (2024-2026). It provides:

* A compendium of architectural patterns and styles
* An ontology of patterns based on their structure and function
* A brief overview of basic principles of software design
* A comparison of ways in which various patterns approach the same problems
* A map of evolutions of software architectures

The book can be downloaded in PDF or EPUB format from the [latest release](https://github.com/denyspoltorak/metapatterns/releases/tag/v1.2.1), or read online as a [website](https://metapatterns.io/) or [wiki](https://github.com/denyspoltorak/metapatterns/wiki). The book's diagrams and ODT file are also [available](ArchitecturalMetapatterns) under the [CC BY license](ArchitecturalMetapatterns/LICENSE).

There is also a [Leanpub page](https://leanpub.com/metapatterns) with testimonials and detailed table of contents, and the original (outdated) [Medium series](https://medium.com/itnext/the-list-of-architectural-metapatterns-ed64d8ba125d).

Introductory slides are available for [download](<ArchitecturalMetapatterns/Slides>) or [reading online](https://speakerdeck.com/denyspoltorak).

## Other Publications

[Introduction to Software Architecture with Actors](./IntroductionToSoftwareArchitectureWithActors/README.md). _[ITNEXT](https://medium.com/itnext/introduction-to-software-architecture-with-actors-part-1-89de6000e0d3)_, 2023.

[Half-Proactor/Half-Async Architecture for Real Time Device Management](./Half-Proactor-Half-Async.pdf). _[Pattern Languages of Programs](https://hillside.net/plop/2020/papers/poltorak.pdf)_, 2020.

## Tools

[Table of contents converter (txt -> HTML) for Leanpub](./tools/toc_to_html.py)

[Guide on converting a Google Docs document into an eBook](./tools/Publishing_from_GoogleDoc.md)

[ODT to GitHub wiki converter](https://github.com/denyspoltorak/odt2wiki)

---

## Fuente: `publications/tools/Publishing_from_GoogleDoc.md`

# Guide on converting a Google Docs document into an eBook (well-structured PDF and EPUB files)

While it is convenient to write a book in Google Docs, transforming it into a high-quality eBook is complicated. Please find below the steps which one should take to make a pair of PDB and EPUB files from a Google Docs document using free software.

## Why Google Docs

I used Google Docs for writing a compendium which contained hundreds of pages, hundreds of diagrams, and thousands of cross-links.

### Benefits

- Online collaboration
- Decent UX
- Decent stability (few bugs, no data corruption)
- Performance (Google Docs seems to be faster than LibreOffice Writer)
- Instant backup
- You probably don't need to learn it

### Drawbacks

- Supports only basic editing
- Exporting is basic as well
- No integration with version control systems
- Unavailable offline

### The troubles you may encounter

- Google Docs has a hard time saving the table of contents into a PDF (as an outline) or EPUB file. Older versions did not generate it at all, whilst the newer ones may be buggy and provide next to no control over the structure of the table of contents.
- The resulting EPUB is not optimized. It may take too long to open and section breaks may be at the wrong granularity level.

### Use specialized software

It makes sense to rely on specialized tools:

- Google Docs for editing and collaboration
- Calibre for conversion to EPUB
- LibreOffice for conversion to PDF

> UPDATE: It is possible to edit the outline of a PDF file generated by Google Docs, see [below](#exporting-to-a-pdf). This saves you from much editing in LibreOffice.

## Exporting from Google Docs to LibreOffice Writer

Even though Google Docs and LibreOffice Writer are about the same thing, they differ in many details. I suppose that you have perfected your book in Google Docs and now want it to look the same in the output PDF file.

So you just go to `File -> Download -> OpenDocument Format (.odt)` in your Google Docs, wait for the download to complete, open the downloaded document with LibreOffice and compare it to the original. I looked at the lengths of the documents - they should match. If they don't, you should probably check the length of every chapter to find the differences. A few hints are below:

> UPDATE: Google Docs became too slow to generate an .ODT from my book. It fails silently (the file is never downloaded). I have to download it as a .DOCX, open the DOSX with LibreOffice and save it as an .ODT file.

### Fonts

The Google Docs set of fonts differs from that in OpenOffice Writer. I used Oswald in the explanation sections of my book only to find out that LibreOffice Writer silently replaces it with a default font.

Therefore, please check all kinds of text styles which you use throughout your book. If anything looks wrong, you may have to download a corresponding font from Google and install it on your computer.

### Document structure

Google Docs uses header text style for chapters and sections. With LibreOffice Writer styles and structure are separate.

You will need to:

- open the "Styles and Formatting" right-side panel and right-click and `Modify...` the header styles there or
- right-click on each kind of header in your document and choose `Paragraph -> Edit Style...` to set up the outline levels.
The outline levels are set up in the `Outline & List` paragraph style tab.

For example, in my book there are:

1. Title style for book parts - it gets outline level 1
2. Heading 1 style for chapters - outline level 2
3. Heading 2 style for groups of sections - outline level 3
4. Heading 2 style for individual sections - outline level 4

Please be aware that now your book's title or blank lines from the title page may appear as stray chapters in the table of contents, unless you change their styles to default and set up their font sizes manually.

### Orphaned lines

> NOTE: You don't need this and the following sections if you generate the PDF with Google Docs because EPUB does not preserve the formatting of the ODT.

Google Docs prevents single lines of text from appearing at the top or bottom of the page. LibreOffice Writer has two controls for that: `Orphan control` and `Widow control`. Both are in the `Text Flow` tab of the paragraph style dialog.

You have to enable both of them for the `default paragraph style`. Please note that they are already enabled for headings.

There is also a subtle difference in the logic of the feature: while Google Docs keeps a header, diagram, and the following caption line together, LibreOffice Writer does not consider them to be a single paragraph, thus you may see a caption separated from its diagrams or a section header together with a diagram separated from the section's text. Fixing that will likely require manual changes which may be as simple as inserting a blank line before every diagram with a caption.

### Tables

Google Docs seems to generate tables with no padding. While the tables look good in Google Docs, in LibreOffice Writer the spacing between cells is smaller than the spacing between lines of text inside a cell.

Thus you may need to increase padding in the `Table Properties -> Borders` dialog for each table in your document. There seems to be no easy way to select all the tables - you'll have to edit each of them manually.

### Transparency

I used transparency to reduce the contrast of the background image on the title page of my book. LibreOffice Writer does not support transparency for images, only for page areas. I had to delete the cover image and re-insert it through `Page Style -> Area -> Image` to make it semi-transparent via `Page Style -> Transparency`.

### Bullets and fonts

If you use multiple fonts in a list, the list's bullets will differ in size. You'll need to left-click a bullet (this selects all the bullets in the list) and choose a font which will apply to all the bullets.

### Known bugs

There are several LibreOffice Writer bugs (as of 7.3.7.2) that cause inconveniences:

- Recovery of a document after a crash may corrupt suggestions - additions become deletions. This is a point against offline collaboration via ODT files.
- Autosave (recovery backup) cannot be disabled via `Options -> Load/Save -> General -> Save AutoRecovery information`. This is really annoying for large documents as the saving takes half a minute and happens every 10 minutes.
- `Paragraph Style -> Text Flow -> Keep with next paragraph` setting is not applied when a document is loaded. Opening the style dialog for a header and just pressing OK will reformat the document and may change its number of pages and the PDF output.
- A saved document includes international fonts by default, which adds tens of megabytes to the document's size. This can be disabled in the `File->Properties->Font` tab.

## Exporting to a PDF

There are two options now:

- Save the Google Docs document as a PDF and edit its outline (table of contents)
- Generate the PDF file from the ODT edited in LibreOffice.

### Save the PDF in Google Docs and edit its outline

`File -> Download -> PDF Document (.pdf)` in Google Docs creates the PDF. It looks exactly as the original Google Doc, yet you may still want to edit its outline (table of contents):

- Run `pdftk <your_file>.pdf dump_data > outline.txt`
- Edit `outline.txt` with a text editor, possibly using its find/replace functionality to group-change  outline levels. Please note that skipping outline levels (placing a level 3 item directly under a level 1 header) does not work.
- Reintegrate the changes by running `pdftk <your_file>.pdf update_info outline.txt output <new_file>.pdf`

### Generate with LibreOffice

This is straightforward:

- Run `File -> Export As -> Export as PDF...` in LibreOffice Writer.
- Be sure that the `Archive (PDF/A, ISO 19005)` box is checked.
- The `Export outlines` checkbox is responsible for creation of the table of contents.

Now you have your PDF with a nice table of contents!

## Making a EPUB

This part is complicated.

You will probably want to make a copy of your document as the steps below involve destructive modifications.

### Get rid of the title page

The EPUB includes the cover as a stand-alone image. Therefore you should delete the cover page from your document to avoid its being duplicated. Which is not that easy because the title page's properties differ from those of other pages, therefore merely deleting the cover page's text and image does not work - the second page becomes the new title page.

I found the following workaround:

- Delete the contents of your title page. Your second page will become your title page.
- Select `Format -> Title Page... -> Make Title Pages -> Insert new title pages`. Press OK - that should insert a blank default-style title page in front of the document
- Now delete the newly inserted blank lines to pull the text from your second page into the first page.
- Save the updated document.

### Generate the cover image

Now you need to create the cover (printout of your title page) for your EPUB. There are two ways:

- KISS: Make a screenshot of your title page in Google Docs or LibreOffice Writer.
- The knightly path: Extract it from the PDF file generated in the previous section. Assuming you are on Linux, run `pdftoppm -singlefile -png YourBook.pdf > Cover.png`

> NOTE: The cover may contain white pixels on the right side if the cover image's dimensions did not perfectly match the page dimensions. In that case you will have to crop the resulting PNG file, for example `convert Cover.png -crop 1240x1755+0+0 CroppedCover.png` where 1240 and 1755 are the width and height of the resulting image, and 0s are the coordinates of the top left corner of the area to crop.

### Create the EPUB

You will need Calibre. Install it.

- Open your ODT file without the title page with Calibre (that should be possible through right-clicking the file and choosing `Open with other application`).
- Right-click on the newly created book in Calibre's library (its main page) and select `Edit metadata -> Edit metadata individually`.
    - Set the book's cover from the image generated in the previous step.
    - Fill in the title and author(s).
    - You can add tags, but I don't know if they appear in the published book, or are internal to Calibre.
    - Apply the changes.
- Right-click on your book. `Convert books -> Convert individually`.
    - Choose ODT as input and EPUB as output format.
    - Fonts tab of the `Look and Feel` dialog:
        - Check `Embed all fonts`
        - Check `Subset all embedded fonts`
    - There is some magic under the `Structure detection` dialog:
        - `Detect chapters` works with `//*[name()='h1' or name()='h2' or name()='h3' or name()='h4']` - This probably is related to the table of contents. Calibre's table of contents is limited to 3 levels, however.
        - `Insert page breaks before` should detect every kind of section if we want every section to appear on a new page: `//*[name()='h1' or name()='h2' or name()='h3' or name()='h4']`.
    - The `Table of Contents` dialog also needs your attention:
        - Change the `Number of links to add` to a big number like 500.
        - The levels are required for a multi-level (hierarchical) table of contents:
        - Set `Level 1 TOC` to `//*[name()='h1']`
        - Set `Level 2 TOC` to `//*[name()='h2']`
        - Set `Level 3 TOC` to `//*[name()='h3']`
        - Check `Manually fine-tune the ToC after conversion`.
    - Click OK and wait for a couple of minutes.
    - Enjoy the preview of your table of contents. You can edit it manually or delete and regenerate it with the buttons on the right side of the dialog.
        - Alternatively, you can delete the generated table of contents by pressing `Ctrl+A` and `del` and create a new full-depth table of contents by using the `Create table of contents from all headers` button (and choosing `Include duplicates` if a pop-up appears). This allows for making a 4-level table of contents and also adds introductory sections.
    - If you work on the table of contents for a couple of minutes, there will appear a pop-up warning about a ToC creation timeout. It is safe to ignore.
- Right-Click on your book. Choose `Open containing folder`. Enjoy the EPUB you've created!

### Issues with Calibre's EPUB

There are a couple of troubles with the Calibre's output:

- It uses `<class="calibre">` in a non-standard place which results in errors from EPUB validation tools. If your publisher insists on fixing the errors (PublishDrive does), you should:
    - Install Sigil.
    - Open the EPUB with Sigil.
    - Find ` class="calibre">` and replace it with `>` throughout the EPUB contents (`All HTML Files`).
- Lists are not well-aligned. Fixing that requires knowledge of CSS:
    - Edit the EPUB (right-click on the EPUB in the main Calibre window and choose `Edit EPUB format` or call the Calibre's EPUB editor from the file explorer.
    - Find a page with a list (or a nested list if you use them).
    - Click on the text of a list item in the preview panel. Its HTML code will become highlighted in the XHTML editor.
    - Check which class its `<p>` (paragraph with text) element uses. In my case the top-level list is  `class="p-p1"` while the nested list items are of `class="p-p10"`. You will have to fix both of them.
    - Open `stylesheet.css` in the file browser panel.
    - Edit the definitions of the classes used with the list items. I had `text-indent: -0.25in; margin: 0 0 0 0.5in;` and `text-indent: -0.25in; margin: 0 0 0 0.75in;`. Set everything to zero: `text-indent: 0; margin: 0 0 0 0;`
    - The preview should look much better now.
    - Repeat for any misaligned page elements.
    - Save the EPUB document.
- Fonts don't fit in their lines, resulting in cropped letters. This is reproducible only in the Ebook viewer, not in Calibre Editor:
    - Edit the EPUB.
    - Find the paragraph which does not look good in the viewer.
    - Edit its `<span>` class, in my case `s-t5`. I had to change `line-height` from 1.2 to 1.4 for Oswald font to be displayed correctly.
- You may also need to edit the table of contents in the editor. It's the top item of the `Tools` menu.
- Colors of the cover image may be strongly distorted due to the JPEG compression:
    - Edit the EPUB.
    - In the file browser panel scroll down to the Images section. There should be the cover file at the end of it. Right-click it and `Replace ... with file ...`. Choose the original cover image.
    - Save the EPUB.
    - > Please note that replacing the cover image should be the last action to take because opening an EPUB file with Calibre editor recompresses its cover.

## Publish the book

I tried Leanpub (PDF and EPUB) and PublishDrive (EPUB only).

PublishDrive is stringent on errors. You will need to fix the EPUB created by Calibre (see above).

Leanpub accepts everything, but it has a couple of peculiarities:

### Generating the table of contents for Leanpub

Leanpub expects you to generate the table of contents of your book as a HTML list. You will need to do the following:

- Open your EPUB (3 ToC levels) or PDF (4 ToC levels but it may take forever to open) file with Calibre's E-book viewer.
- Right-click on the table of contents in the viewer and select `Copy Table of Contents to clipboard`.
- Paste the table of contents into your favorite plain text editor and save it as a TXT file. You may also edit the contents if needed.
- Download [my converter](https://github.com/denyspoltorak/publications/blob/main/tools/toc_to_html.py) (a tiny Python script) and run it: `./toc_to_html.py toc.txt toc.html`
- Open the generated HTML file with a plain text editor and copy-paste its contents into your book's Leanpub page.

### Generating a sample chapter

You will probably want Leanpub to offer prospective readers to download a sample chapter from your book. However, that requires you to prepare the corresponding PDF and EPUB files:

- Clone the book in Google Docs
- Edit the cover
- Delete everything except the table of contents, the chapter you will use for promotion and, probably, a few appendixes.
- Unlink any cross-references to the deleted chapters throughout the remaining text, including the table of contents.
- Download the sample as ODT.
- Repeat all the steps which you did for your book:
    - Fix the ODT with LibreOffice Writer.
    - Convert it to PDF.
    - Convert it to EPUB with Calibre.

That's it. Enjoy your book.

Please feel free to [contact me](https://www.linkedin.com/in/denyspoltorak/) if you have any improvements for this instruction.

A version of this guide with screenshots is [available on Medium](https://denyspoltorak.medium.com/guide-on-converting-a-google-docs-text-into-an-ebook-5b1abc65f69d).

---

## Fuente: `publications/tools/README.md`

I've spent some time looking for a way to generate the HTML table of contents for the book I've uploaded to Leanpub to show it on the book's page. Finally solved through the following steps:

0. Your epub book was created with Calibre and has a table of contents
1. Open the epub file with Calibre's ebook viewer
2. Right-click in the viewer window and choose table of contents from the menu
3. Right-click on the table of contents and copy it to clipboard
4. Save the ToC as toc.txt
5. Run `toc_to_html.py toc.txt toc.html` to get the HTML ToC

---

## Fuente: `safe-by-design/README.md`

# 🛡️ Safe by Design
## Explorations in Software Architecture and Expressiveness
<img src="cover.png" alt="Обложка книги" width="300"/>

**A free technical book about using type systems, compile-time validation, and architectural design to write software that stays correct as it grows.**

This book is a distillation of my thoughts on the software creation process — how code evolves over time, and how we can keep it scalable, maintainable, and safe by pushing invariants to compile time instead of runtime.

---

## 📘 Read the Book

- [📄 PDF version](book.pdf)
- [📱 EPUB version](book.epub)

---

## 📚 What’s Inside

The book explores principles and techniques including:

- Building flexible systems that adapt without breaking  
- Using compile-time contracts to enforce structure
- Rethinking data validation as part of type safety
- Access modifiers as implicit interface declarations
- Separating generics in infrastructure from core architecture
- Designing systems that break loudly and early — not silently and when it’s too late

See [toc.md](toc.md) for a detailed table of contents.

---

## 🎯 Who It’s For

This book is for engineers, architects, and curious developers who:

- Think beyond runtime testing and want stronger correctness guarantees
- Care about long-term architectural integrity
- Prefer structure over duct tape

You don’t need a math degree — just an interest in reasoning clearly about software.

---

## 🧠 Why I Wrote It

I wrote this as a reflection on how modern codebases degrade, how runtime errors sneak past testing, and how the compiler can — if used properly — prevent entire categories of bugs before they even exist.

This is not a textbook. It’s a conversation between two frustrated engineers who don’t want to debug the same bug twice.

---

## 📜 License

This work is licensed under a [Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License](https://creativecommons.org/licenses/by-nc-sa/4.0/).

---

## 👤 Author

**Mykola Haliullin**  
Augmented Reality Engineer, Snap Inc.  
[LinkedIn](https://www.linkedin.com/in/nikolai-nikolai/) • [GitHub](https://github.com/SanQri) • [Medium](https://medium.com/@galiullinnikolai)

---

> _“Architecture is not about where you put the controller. It’s about what the compiler refuses to let you do wrong.”_

The opinions in this post are my own and not attributable to or on behalf of my employer

---

## Fuente: `safe-by-design/toc.md`

# Table of Contents

1. Applying Big O Notation To Software Design
2. What’s Wrong with data validation
3. Encapsulation Without `private`
4. Why Generics Belong in Infrastructure, Not in Architecture
5. Designing a Flexible Ability System for Games
6. Type-safe polymorphic constructors via compile-time guarantees
7. Using Closures to Extend Class Behavior Without Violating Interface Boundaries
8. Reflection Is Not the Enemy of Type Safety
9. The Compiler Is My Co-Author
10. Building Scalable Unit Behavior in RTS Games
11. From Runtime Risk to Compile-Time Contract

---
**Conexiones del Grafo (Obsidian):** [[INDEX]] · [[CANON_SOTA_RAG_ARCHITECTURES_AND_TOOLS_2026]] · [[CURATED_MASTER_BOOKS_AND_COURSES_2026]] · [[CANON_SOFTWARE_ENGINEERING_AT_GOOGLE]] · [[CANON_HARNESS_ENGINEERING_INTEGRAL_2026]] · #architecture_and_books
