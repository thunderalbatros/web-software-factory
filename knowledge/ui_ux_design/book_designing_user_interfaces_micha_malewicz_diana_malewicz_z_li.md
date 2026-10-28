# 📚 Libro Completo: Designing User Interfaces (Michał Malewicz, Diana Malewicz) (Z Library)

**Alcance:** Fuente bibliográfica completa sobre Web Software Factory, UI/UX, Architecture & Interactive Systems (Designing User Interfaces (Michał Malewicz, Diana Malewicz) (Z Library) — Technical Author). Aplicable a la Web Software Factory. NO sustituye las reglas inmutables en `CANON_*`.

> **Autor:** Technical Author  
> **Dominio:** Web Software Factory, UI/UX, Architecture & Interactive Systems  
> **Archivo Fuente:** `Designing User Interfaces (Michał Malewicz, Diana Malewicz) (Z-Library).pdf`  
> **Páginas Originales:** 470 (100% Ingerido, Cero Truncamiento)  
> **Secciones Técnicas Extraídas:** 50 (Entropía Técnica Media: 0.323)  
> **Fecha de Ingesta:** 2026-10-27  

---

## Sección 1: Core Concepts & Foundations [Entropy: 0.295]

Sold to 
testing@gmail.com

Table o
Table of Contents
INTRO
7
337
358
394
55
94
139
178
213
261
299
323
21
34
415
447
DESIGN BASICS
BONUS CHAPTERS
1. Introduction
2. Who is this book for?
3. UI vs UX
4. Design and Art
5. What makes UI good?
6. Perception
24. Design styles
25. Design process
26. Design systems
27. UI Audit
28. Developer hando!
29. Prototyping
30. Show your work
31. Starting a design
32. Success in design
33. Summary
7. Screens
8. Layout and grid
9. Objects
10. Colors
11. Gradients
12. Typography
13. Icons
14. Bu"ons
15. Cards
16. Tables
17. Forms
18. Modals, popups
19. Navigation
20. Animation
21. Photos
22. Illustration
23. Language

Introd
uction
Introd
1.
Introduction
The license for this book covers one person only.
DO NOT redistribute or share this PDF with anyone, as it will lead to your license being void 
(and updates suspended).

Introdu
Introduction
Hello! Michał and Diana here.
Thank you so much for purchasing “Designing User Interfaces”!
The idea for this book came to life in December of 2018. While we were 
teaching UI design classes, some of our students have asked us, what's the 
book with all those PDF materials we've been sending them one by one 
a"er class. Of course, at that time, they were simply things we put together 
to make it easier for the students - nothing more. 
We looked around and noticed that a lot of the books on UI are out of date, 
short, vague, and o"en contradictory. We decided to change this and write 
this book. Nearly all of the knowledge within these pages is based on over 
500 design projects we completed in the last ten years. 
Now we are sharing all that experience with you! 
Starting in 1999, we have designed hundreds of digital products for
all kinds of devices. That doesn't mean we're all-knowing. We're continually 
learning, teaching (which is also a great learning exercise), and testing new 
methods for building beautiful, usable digital products. 
This book is a summary of our knowledge and our experiences.
We don't assume that what we say here is the only right way to do things. It's 
the way we do it. 
We want this book to grow and expand over time. That's why we're open to 
your suggestions, feedback, and ideas. If you think something is missing, 
needs an update or an additional explanation - reach out!
If we use your feedback, we'll add you to the collaborator list at the end of 
this volume. 
Knowledge is there to share it. While writing this ebook, and talking
to our friends, co-workers, clients, students, and subscribers, we found out 
what are the most common problems people encounter while trying to 
design digital products. Our main goal was to give you all the answers to the 
most common questions, so you don't have to repeat the same mistakes we 
have. 
Enjoy! 
HOW DO WE KNOW ALL THIS?
In 2013 we co-founded HYPE4 - a design-driven so!ware house. Since then, 
we've been working for both small startups and Fortune-500 companies 
from all over the world. We were lucky enough to be able to work on nearly 
every product category (from banking, "nance, advertising, and media to 
pregnancy tracking). 
We started as a small, design-only studio with three employees.
We did the designs, and then external so!ware houses handled the 
development. We quickly noticed a huge problem with that approach. The 
execution quality was so low that we were rarely satis"ed.
In some cases, the designs were butchered beyond recognition.
We decided to take action by starting the development branch of
the company but strictly following our design-driven approach. 
All of our developers understand the design principles, and our designers 
know a bit how to code. That allows us to achieve a much higher front-end 
development precision and overall quality. That has since become our 
de"ning feature. 
At HYPE4, we build web and mobile products of all sizes. A!er hours we also 
work on our internal startups and have a lot of fun doing it.
If you'd like to learn more, go to: 
www.hype4.com
HYPE4
Who is
This boo
or who i
2.
Who is this
book for?
his boo

Each day we use a countless array of digital products. Some are obvious - 
like mobile apps and websites. But there are interfaces everywhere around 
us now. You interact with ticket machines, payment terminals, parking 
meters, alarm clocks, your TV, or your gaming console. 
Most of these products are a result of the work of large groups of people. 
Multiple skillsets merge and intersect to create amazing experiences: 
designers, marketing ninjas, project managers, developers, and an 
occasional genius CEO. 
This book will show you the building blocks and good practices, so you can 
spot them in the products you use, and improve the products you make. 
Who is
Who is this book for?
HOW TO DESIGN GREAT THINGS?
15 years of experience,
and over 500 projects
distilled into the best 
design practices.

Designers will gain knowledge on how to make be!er looking and more 
usable products.
It took us years to learn some of these truths the hard way. We've condensed 
and simpli"ed all that knowledge, so you don't have to repeat our mistakes. 
That will let you grow faster and be be!er. Good practices, quick-and-dirty 
safe hacks, and intentional rule-bending will allow you to bump up 
readability and aesthetics of what you design.
Beginners will gain solid ground to improve from, but even experts can "nd 
this book useful.
We worked on over 500 di#erent products from almost every
possible category. From "ntech portals, all the way to pregnancy trackers. 
The problems we've encountered and the solutions are
all within these pages. 
Read on!
DESIGNERS
Front-end developers will learn the basics of design and best practices on 
working with designers to speed up and raise the quality of their 
implementation work. We believe that every designer should understand a 
bit of coding, and every developer should know what design is all about. 
A conscious developer gains another level of understanding of what he's 
building, which can quickly bring his work to a whole other level. 
This design-!uency is true, especially for junior developers, as they can grow 
without repeating the mistakes of others. 
FRONT-END DEVELOPERS
background: #EF3030;
border-radius: 25px;
le"er-spacing: 0;
line-height: 19px;
color: #EF1818;
le"er-spacing: 0;
text-align: center;
margin-le#: 44px;
color: #223;
Startup founders will understand how even with smaller budgets, you can 
make your MVP shine. A!er all, a professionally built prototype will give you 
be"er insights about your Product Market Fit, than something resembling a 
half-done wireframe. Maximize your chances to gain user's trust as that 
leads directly to success. 
Remember - people "buy" into a product or service with their eyes #rst. 
Make a great #rst impression, mix it with an excellent value proposition, and 
you've got yourself a hit! 
STARTUPS
All digital product users will learn how to see the di!erence between a 
good and great product. You'll gain critical thinking and knowledge of 
what to look for in an app or a website. That, in turn, will let you get be"er 
at all the other aspects of what you do. Even if it has nothing to do with 
pixels displayed on a screen. Precision and aesthetics can go beyond that, 
right into our RealWorld™.
The main ideas behind great products are universal. Planned action, 
precision, and care should go into everything we do in life. 
Let's make GREAT things.
Marketing and social media ninjas will learn how even the smallest, easy to do 
tweaks can drive conversion and readability up. We all want happy, engaged 
users interacting with what we do. Eliminating the roadblocks will help with 
achieving that.

---

## Sección 2: Core Concepts & Foundations [Entropy: 0.358]

We'll show you how to wrap your content visually, so it's easy to understand 
and has that "premium" look & feel people trust.
MARKETING, SOCIAL MEDIA NINJAS
CURIOUS TYPES
DESIGN?
Which bu"on do you think will have more conversion?
UI VS U
VS UX
UI VS U
VS UX
3.
UI vs UX

Where does the humble interface !t inside the trendy industry terminology? 
It's o"en looked down upon by "real user experience specialists" as 
"painting with crayons." We believe this is the wrong approach. What we see 
is just as important as information architecture and business goals. 
Customer experience is a high-level category with UX being a part of it, 
while UI being a part of the UX process. The diagram below shows the 
relation between these elements. To build a great product, you need to take 
care of every li#le detail with great precision. 
UI
UX
CX
UI vs U
UI vs UX
DEFINITIONS
UI or User Interface is the visual representation of a digital product.
Its obvious use cases are apps and websites. UI is the link between the user 
and the functionality of a product. It helps to achieve the desired outcome 
through a series of human-machine interactions. It's a series of text, shapes, 
graphics, and photographs combined in a way that allows for a !uid, 
natural interaction. 
An interface is a mix of grid, layout, typography, colors, animations, and 
microinteractions. In other words, UI is all that we experience - mostly with 
our eyes. UX de"ned information architecture is a blueprint for UI's re"ned 
"nal look. 
A UI designer is responsible for the "nal look & feel of the product. The job is 
to de"ne its unique style and make it "t the target market. That visual 
representation should be readable, usable, and devoid of any unnecessary, 
distracting elements. 
Product Card
Component set
USER INTERFACE
+ ADD TO CART
+ ADD TO CART
Random Soda
$ 5,00
Refreshing carbonated soda
with a mint !avor.
Random Soda
$ 5,00
Refreshing carbonated soda
with a mint !avor.
An Interface is like a joke.
If you have to explain
it, it's not that good.

UX or User Experience de!nes and studies how easy it is to use the product. 
With digital products, that means the interface, navigation pa"erns, and 
communications. The goal of UX is to allow the largest possible group of 
users the ability to understand and use a product. If the role of a UI designer 
is the look & feel, the role of a UX designer is de!ning how it will work. 
Aside from information architecture planning, UX also covers various kinds 
of research (surveys, A/B tests, focus groups, interviews, workshops, and 
more).
UI is a part of User Experience because readability and looks are also 
in#uencing the ease of use and shape our feelings towards a product. This 
book covers the most basic UX principles but focuses heavily on the UI 
perspective of design. 
USER EXPERIENCE
+ ADD TO CART
Random Soda
Favorite
$ 5,00
Refreshing carbonated soda
with a mint !avor.
Photo
I'd love an option to add this to
a list so I can consider purchasing
it at a later date.
A short description right on the 
product miniature would be great, so 
I can see the !avor right away...
The bu"ons were too small, I o#en 
pressed the wrong one by accident...
A basic information architecture (wireframe) and user comments to implement.
CX or Customer Experience is o!en confused as being another name for 
UX. The truth is that CX is a top-level process that de"nes not only how your 
product works, but how your entire company operates. 
The CX process is the UX of your product, but also your branding, 
marketing, or friendly customer support on the hotline. 
You can design Customer Experience by de"ning clear, consistent rules for 
your entire brand. Those rules apply to all the real-world experiences, as well 
as UX and UI. They even in#uence the way you write your copy. 
A good example is one of the popular "tness apps. They changed the 
boring "save your workout" message to an "I'm awesome" bu$on. 
Customer engagement went up.
All of those elements combine for a consistent, coherent vision with which 
our potential customer can quickly identify. 
+ ADD TO CART
BUY NOW
MAKE PURCHASE
Your customer support is great!
They solved all my issues in
a ma!er of minutes! Thanks!!!
CUSTOMER EXPERIENCE
Changing the brand colors to a more positive, green 
gradient yielded an improvement in user perception of 
our brand. We also tested various types of label text to 
see what works best.
Merging the digital world ideas 
with the real world.
Ordering in the app, and then picking 
up the order in the store was a gamechanger!
In the last few years, many of the UX designers started calling themselves 
Product Designers instead. The term merges most UX competences with UI 
and basic research, allowing you to solve a wide range of potential 
problems. 
This new naming convention comes from the fact that UX designer, as a 
title, doesn't show which skills the person has. UX designers are o!en 
product owners, researchers, wireframe makers, or all of those combined. 
A product designer can help with both the business processes, choosing the 
right building approach, and "nal interface designs.
It's o!en the most versatile person in the company that can guide the rest 
of the team, including the developers. 
Some say Product Design is User Experience design 2.0.
PRODUCT DESIGN
User Interface
User Experience
Basic research
+
+
=
Product
Designer
Design
d Art D
Art De
sign an
4.
Design
and Art

There o!en is a perceived equal sign between UI designers and graphic 
designers. It's quite an oversimpli"cation that needs clearing. A graphic 
designer is commonly associated with being an artist, while UI design
is more of a cra!, that adheres to a set of strict rules. 
User interfaces are not "painted with pixels," as many people think about 
them. They're a precise, visual blueprint for a working product. They're not 
artworks on a gallery wall, but rather an architectural plan
- accurate and with very li#le artistic chaos. 
Great interface design is pre#y rigid in terms of its rules, constraints, and 
regulations. Given too much artistic freedom, it can deviate highly from the 
functional speci"cations, making the resulting product very hard to use. 
Design
Design and Art
ARE UI DESIGNERS ARTISTS?
border radius
font color, weight, style, shadow
safe area
outer margin
minimum
height
padding or
inner margin
shadow
color or
gradient
DOWNLOAD
UI design
is de!nitely
NOT art.

---

## Sección 3: Core Concepts & Foundations [Entropy: 0.295]

While it may come in handy, being an illustrator or a painter is not necessary 
for UI design. The best interfaces are o!en a result of manually entering the 
right numbers into boxes, instead of artistic strokes on a graphic tablet. You 
can be a successful UI designer with just using a couple of basic, good 
practices without ever ge"ing out
of the comfort zone. 
Readable, useful, and aesthetically pleasing result is the culmination
of a successful UI design. 
A couple examples of us testing various visual styles, as seen on our Dribbble pro#le.
Most of them require additional work to become a truly usable digital product.
Dribbble.com designs are probably the closest intersection of art and UI 
design. The main goal of posting a project to Dribbble is to achieve the 
highest possible aesthetic e$ect - o!en at the cost of functionality. Many of 
those designs are either impossible to code, unusable, or not accessible. 
Bringing them back towards something that works would o!en require a lot 
of changes.
That's why it's good to use them as inspiration for visual ideas while being 
critical and judging the usability of everything you see. 
ART AND DESIGN
DRIBBBLE
Dribbble designs
o!en have poor
usability, but they're
a great source of
visual inspiration.

Good U
ood UI
Good U
ood UI
5.
What makes
UI good?

Great UI is a sum of many parts. It is the interplay of colors, typography, 
interactions, layout, and style that requires a lot of work, experience, and 
imagination. If you're starting as a junior designer, try to use the tested good 
practices !rst. Innovation and your very own style will come naturally, with 
experience. 
A great UI is rarely fully done. In most cases, it's an ongoing process with 
changes and updates coming from user feedback and innovative ideas. 
A good place to start is by following the 10 Rules of Good Design by Dieter 
Rams. The original set is o"en called 10 commandments of great design 
and is framed on walls of many design studios. Those rules, however, were 
meant to initially cover designing real-world objects, so we adapted them 
slightly to !t the UI world. 
The original set of rules was established back in the 70's, but they're just as 
relevant today. Precision, a#ention to detail and careful planning are all 
necessary for a great product to take shape. 
Safe design methods will allow you to learn these things by following rigid 
guidelines. Then, as you get more experience, you can start to bend these 
rules or $at-out break them. Always start with the established good 
practices, however. 
Remember - good design is as li!le design as possible! 
Good
Good UI?
WHAT TO LOOK FOR?
Good design
makes a product
easy to use.

Innovation is great, but it can't come at the expense of usefullness.
A good example is the Twi!er "Pull to refresh" interaction pa!ern. It was 
both completely new, yet strangely natural, fun to use way to refresh your 
content. It's nearly invisible, yet it made its way into countless other 
products. Don't innovate for the sake of being di"erent - triangular bu!ons 
won't replace the classic rectangular ones anytime in the near future. 
The most innovative you can get nowadays is with microinteractions. 
De#ning how familiar elements a"ect each other with user input,
is still open to new, creative ideas. 
Usability is the base of User Experience. UI Usability, however, is mostly about 
clarity. Decorative fonts, lack of grid or eye-watering colors decrease the UI's 
readability, thus decreasing its usability. 
GOOD DESIGN IS INNOVATIVE
GOOD DESIGN MAKES A PRODUCT USEFUL
Aesthetic is quite subjective and a lot has changed with how we perceive it 
since the 70's. One thing that hasn't changed is that aesthetic comes from 
internal harmony, made by grid, typography, whitespace and a well planned 
layout. All designs that are based on good principles (like the Golden Ratio) 
will be more aesthetically pleasing, than random ones. 
1.618 is a number that allows to set hierarchy in a natural way. 
GOLDEN RATIO
GOOD DESIGN IS AESTHETIC
Understandable UI is a mix of good readability, proper hierarchy and the 
right type of content. Most of these things come from the right approach to 
grids, layouts and overall precision. Once the design part is done, you can 
work on the language part to match. 
GOOD DESIGN MAKES A PRODUCT UNDERSTANDABLE
If you get your grid and whitespace right, the design will still have merit, 
even a!er a huge shi! in design trends. Maybe the gradients or illustrations 
won't hold up as well, but design precision and clarity don't age. 
GOOD DESIGN IS LONG-LASTING
With modern design tools it's especially easy to go all the way with colors, 
animations and sugar-coating. Those kinds of designs look well on Dribbble 
portfolios, but o!en forget that the role of UI is to deliver content. 
How the actual Instagram app looks, is less important than the photos or 
videos you can see inside it. It's especially relevant for products based on 
showing content. 
Try not to fall into the trap of form above function. A great interface fades 
away a!er a while - we stop noticing it and using it becomes natural. 
GOOD DESIGN IS UNOBTRUSIVE
Honesty - or the lack of overpromising - is easy to determine especially in 
more complicated, content-heavy designs like charts and graphs.
It's a known fact, that a !uid, sinusoidal, anti-aliased graph looks be"er than 
a jagged line. More o#en than not, however, real data doesn't look that way. 
It's one of the white lies we try and feed our users to like our product more. 
GOOD DESIGN IS HONEST
Precise design can be seen especially with low-importance elements still 
being created with care and a"ention to detail. Microinteraction while 
clicking on a checkbox, or a small X used to close a window should not be 
treated as an a#erthought. Make even your terms and conditions screens 
beautiful, and the users will notice. 
GOOD DESIGN IS THOROUGH DOWN TO THE LAST DETAIL
Even virtual products (like most UIs) a$ect the environment in some way. 
Sure, it's not as big of an e$ect as with physical manufacturing, but we 
should consider the server power consumption (optimizing the app for faster 
loads can also be done in UI) and systemic ways of building the products 
which in turn allow to make them faster. 
GOOD DESIGN IS ENVIRONMENTALLY FRIENDLY
It's a way of adding transparent pixels on diagonal and rounded edges 
so they look smoother from a distance. 
Without anti-aliasing
two zoom levels
With anti-aliasing
two zoom levels
ANTI-ALIASING

---

## Sección 4: Core Concepts & Foundations [Entropy: 0.295]

GOOD DESIGN IS AS LITTLE DESIGN AS POSSIBLE
Less is more. This rule goes well with the unobtrusiveness of a product. UI is 
not supposed to be the star of the show. It exists solely to deliver content 
(text, audio, video, images etc.) and it can't overpower them visually. 
So a great UI is using the brand guidelines, to create best possible content 
delivery channel. Ornamentation and unnecessary elements can lead to an 
overdesigned project that negatively impacts the actual experience. 
Design is a path, not a goal. 
Design smart. 
With design,
less is always
more.

Percep
ption
ption
ception
6.
Perception

Perce
Perception
INTRODUCTION
Our brain uses a set of methods and shortcuts while processing and 
organizing the things we see. Knowing and understanding these methods is 
a crucial element to a successful user interface design. 
Rules of perception are perceptive mechanisms our mind uses to connect 
and organize partial information into a coherent whole. They're the toplevel design knowledge that we can also use unknowingly. Many of the 
methods are common sense. 
The underlying idea for our perceptive mechanisms is that the brain 
subconsciously tries to connect the dots and see an image as a whole, 
instead of a subset of smaller elements. We group and connect similar 
objects and easily di!erentiate things that don't belong in the group. 
While designing the UI, our goal should be to do so consciously. We need to 
be able to back our decisions with facts. Why did we create this element in 
a speci"c way? What was the reasoning behind it? 
Knowing the rules of perception can make it a lot easier to explain our 
choices and will help with avoiding many common mistakes. Applying that 
knowledge will make our designs be#er and easier to understand. 
Our brain
is always trying
to !ll the gaps.

THE RULE OF PROXIMITY
Objects placed close to each other are automatically understood to be a 
group. Placing them farther apart will give the impression that they're 
entirely separate entities. 
In UI design, we can use the rule of proximity to group similar components 
together and organize the general layout. It works well for the main 
navigation, cards, bu!ons, content, and icons. You can use whitespace to 
move di"erent elements further apart, creating a natural hierarchy. Proper 
hierarchy helps with scanning and understanding the di"erent types of the 
displayed information. 
Logical, grouped layout
Randomly placed objects
make the design look chaotic.
It's one of the essential rules that directly a"ect the usability of the interface. 
A product not adhering to this rule (and using random distances instead) will 
be chaotic and much harder to understand. 
THE RULE OF SIMILARITY
All visually similar objects are considered a part of a group. All elements 
that are di!erent visually, our brain sees as individual objects.
But what do we understand as a similarity? It's all of the de"ning features 
like color, shape, size, texture, or position in space. Some of these features 
we process much faster than others. The strongest similarity is with color, 
then size and shape. 
Keep in mind that an object drastically di!erent than everything else (an 
anomaly) won't be able to "t into any existing group - making it very visible. 
You can use this di!erentiation e!ect to make your Call to Actions more 
visible. 
Our brains groups similar objects together automatically.
THE RULE OF CLOSURE
A set of objects can naturally form a recognizable shape. All the empty 
spaces between those objects we subconsciously !ll. It means our brain 
!nishes incomplete shapes for us by adding the missing parts. 
You can use the rule of closure in many 
di"erent ways. One example is a do#ed 
or dashed arrow. Our brain !lls the blank 
spaces and connects the dots. We 
perceive the result, not as a set of dots or 
dashes, but rather a full line. 
It also helps to discern more abstract 
shapes in icons and give them meaning. 
Most icons are purposefully simple not to 
overload us with information, and our 
brain !lls in the blanks. 
Another excellent example of the 
subconscious connecting of empty 
spaces is the WWF Logo Panda shape or 
the IBM logo, where dashed lines form 
the le#ers. 
THE RULE OF SYMMETRY
Objects aligned symmetrically, we understand as connected, no ma!er 
the space between them. Once there's symmetry, there's order, and we are 
very quick to see and understand that. 
Our brain loves symmetry! All objects that are symmetrically aligned are 
more visually satisfying and are considered more beautiful. Some say that 
symmetry is the aesthetic of fools, and while this may be true in print and 
graphic design, it is not the case in UI. Symmetry is king. 
Just as with the rule of proximity, asymmetric placement of an object will 
make it instantly stand out. 
A symmetrical layout like the above will make our 
design easier to understand and more friendly.
No symmetry causes chaos - we don't know which
object to focus on.
THE RULE OF CONTINUITY
Objects aligned along a continuous line are also naturally grouped.
Our brain is always looking for the smoothest path to follow. That's why when 
using the rule of continuity, make sure the line (or curve) is uniform and 
predictable. The more uniform the line, the easier the resulting shape will be 
to identify correctly. 
When designing an interface, we use the rule of continuity in a couple of 
ways. One of them is aligning the content of a side-scrolling carousel. We 
tend to scan the similar content types by following the text from le! to right 
and jumping between the carousel boxes. 
Continuity also helps when designing the vertical rhythm. Similar types of 
content should always be aligned to the same edge. An out of place 
element breaking the continuity will naturally slow down our scanning. 
Above, you can see two examples of scanning a page 
from top to bo"om. In the right-side column, a lonely, 
out of place element breaks the #ow. 
Sharp corners are slightly slower to process, as 
our eye has to pause and 90-degree turn on each 
side. A smoother, rounded edge will help our eye 
go around much faster. 
THE COMMON FATE RULE
Objects moving in the same direction, with the same velocity, are 
considered to be a group. 
One of the use-cases of this rule is the V-formation of birds. Even though 
there are many birds in the formation, we see the entire V shape as one, 
more signi!cant, moving object.
This rule is helpful when designing carousels, dropdown lists, or animating 
objects onto the screen during transitions. 
For example, our eye follows the content of a horizontally scrolling carousel. 
It also follows a dropdown list as it expands down. 
x
x
HICK’S LAW, MILLER’S LAW
The more options to choose from (and the more complex they are), the 
harder it is to make a choice. (Hick's Law)
Our minds can only process around 7 (+/- 2) objects at the same time. 
(Miller's Law)
According to Hick's Law, the number of possible choices should be limited. 
Having too many things to choose from can cause disorientation and 
irritation in users. As a result, the user can skip taking action altogether or 
take a lot longer to do so. 
The ability to process information is directly tied to the cognitive load. It's 
the amount of information our brain can process at a time. It varies from 
person to person, but a popular range is somewhere around seven 
elements (Miller's Law). The higher the number of items, the longer the time 
needed to process them. The result is being less likely to choose at all.

---

## Sección 5: Core Concepts & Foundations [Entropy: 0.34]

While designing, try not to exceed seven options, and for optimal results, try 
keeping it between four and !ve. That means the number of main 
navigation items, number of bu"ons in a component, dropdown choices, or 
carousel slides. When giving the user choice, it's good to highlight the most 
popular or recommended option as well. It o#en leads to much faster 
decision making. 
DOWNLOAD THE APP
WATCH THE VIDEO
BROWSE GALLERY
CREATE ACCOUNT
TRY IT NOW
SHARE WITH FRIEND
SEE MORE
BUY IT NOW
FIGURE AND BACKGROUND
We instinctively di!erentiate between an object and a background. 
Since most interfaces are using layers, we end up with objects and some 
form of background (or backgrounds). While looking at our design, the user 
tries to discern the background from all the essential, actionable elements. 
To avoid confusion and breaking hierarchy, we need to de!ne all the 
elements of our interface clearly. The background shouldn't be too busy, as 
it can steal a"ention away from the foreground. Less important objects 
and functionalities should be less visible and noticeably di#erent from the 
important ones. 
You can use contrast, position, and shadows to help the user 
di#erentiate the foreground and the background. 
THE AESTHETIC USABILITY EFFECT
A visually a!ractive (high aesthetic) product is o"en seen as more useful.
According to this rule, a modern, symmetrical, and overall beautiful 
interface will have a more positive e!ect on the user. The user can outright 
ignore some usability problems if the visuals give a good enough "rst 
impression. 
The feeling of using a high quality, polished product stays with the user 
much longer than the perceived ease of use. Of course, the product itself 
has to be usable, as the aesthetic usability e!ect only works if there's 
already some usability. A beautiful interface won't help if the product 
doesn't work at all. 
But the main reason why we should work on aesthetics is building trust. A 
high quality, polished interface helps to build the trust of our users. A design 
that looks chaotic and ugly will make the users feel unsafe. Even when they 
can't name the exact visual problems, they see that something is wrong 
with the product or that the product is half-baked. The high quality of UI is 
especially crucial for banking, "nance, and medical apps. Everywhere we 
need to give out personal information or where there is money involved. 
THE SERIAL POSITION
We always remember the !rst and last object in a group best. 
The most relevant content or objects should always be placed either !rst or 
last in a group. Our brain will remember them much be"er, and they will also 
catch a lot more a"ention than if they were placed randomly between 
other elements. It's an important rule to consider when building navigation, 
dropdown lists, or any marketing or sales materials. 
VON RESTROFF’S ISOLATION EFFECT
In a group of similar-looking objects, we always remember the one that 
doesn't match the rest. 
You can use this rule in many ways. One of the most popular isolation e#ect 
is with CTA (Call to Action) bu"ons. By making them a di#erent color or size 
(or both) than all the other bu"ons on the screen, we make them naturally 
stand out and catch a"ention.
You can read more about CTA's in the bu"ons chapter.
Screen
reens
Screen
creens
7.
Screens

Screen
Screens
THE HISTORY
The UI design is all about displays. Based on the fact that the UI is 
everything we see, it's essential to understand what do we see it on. 
In the early days of the web, it was quite simple - you designed somewhere 
between 640 x 480 and 800 x 600 pixels. We can, of course, go back even 
farther - to the !rst Macintosh or Xerox's very !rst Desktop machines, but 
let's assume old school color CRT's as a base here. 
But that was the late 90's, and things started rapidly changing a"er that. 
Most of the displays of that era had similar resolution ranges, were super 
heavy, and couldn't display too many colors. 
They also had low refresh rates that resulted in subpar scrolling experience.
The displays of that era o"en limited what websites could achieve visually. 
Before todays #at panels, most of
the UI's were displayed on old-school 
CRT monitors. They o"en had a bit
of a blur to the image (even at higher 
resolutions), but in most cases, you 
could easily distinguish individual pixels. 
Always design for 
the base screen
resolution or @1x.
“

THE BASICS
The technology leaped forward since the early internet days. Nowadays, 
the phone you are holding in your hand has a resolution that didn't exist 
twenty years ago. They also display millions of colors and have super high 
refresh rates. 
A quick comparison. A typical late 90's CRT display had about 1/6 the 
resolution of the current iPhone that's much smaller in size. 
At some point, 72 pixels per inch became the display standard. That all 
changed with the introduction of the iPhone 4 with its retina display. The 
premise was the pixels were so dense you couldn't easily see the individual 
ones anymore. A base (or 1x) resolution was the same as the previous 
iPhone, but the pixel density was a multiplier of that resolution resulting in 
sharper text and images. 
The iPhone 3GS had a 320 x 480 base resolution, which became the
1x size. The iPhone 4 doubled the number of pixels to 640 x 960, but the 
actual design of elements was kept at 320 x 480 and upscaled on the 
device. 
PPI - PIXELS PER INCH
PPI
A!er the iPhone 4's 2x pixel count, we started seeing 3x, 4x, and larger pixel 
densities in both phones, tablets, and laptops. Since the UI's we design are 
all inside vector-based tools, we don't need to worry about actual 
resolutions anymore. The base resolution of 1x serves as a template that 
works on low-density screens and is sharper and more precise in highdensity ones. 
For example, the iPhone X used a 375 by 812 base resolution, but its actual 
pixel count is three times larger at 1125 by 2436. 
To give an example - if you're designing a bu"on, you need to make
it at least 44p high. That means that designing at 1x it will be 44 pixels
(at 1x a pixel is the same as a point) while at 2x it will be 88 pixels, but still 44 
points in your design. 
Most popular 1x screen sizes in 2021 are:
1440 x 900
1280 x 800
Typical laptops
1x
160 x 44 px
2x
320 x 88 px
3x
480 x 132 px 
390 x 844
360 x 640
1024 x 768
Most popular 
iPhone
Most popular
Android Phone
Most popular 
Tablet
Most design tools have already created presets while starting a new design 
that caters to all the latest devices you might need. Those resolutions are 
then set automatically at 1x in every case.
BUT YOU DON'T HAVE TO REMEMBER THIS.
FRAGMENTATION
Sadly a growing number of screen resolutions end up with a very 
fragmented display landscape. We design for TVs, laptops, tablets, phones, 
watches, and IoT devices, which requires a lot of planning and devicespeci!c modi!cations for the design to work.
The !rst questions to ask when starting a design is what kind of screen it is 
going to work on and what's the typical viewing distance. A TV app should 
have higher contrast and more signi!cant UI elements than a mobile 
phone app, mostly because it's o"en used from across the room, while a 
phone app is just inches away from the face. 
But the place where fragmentation hurts the most is from within one device 
category. The most ubiquitous one - the mobile phone - has
so many potential resolutions and aspect ratios that there is no way
to make one design !t all. There are dozens of screen resolutions outlined in 
the Google Play store for Android-based mobile devices. Apple used to 
have a more consistent set a few years ago, but has since then abandoned 
the path and went towards individual resolutions for nearly all the devices.

---

## Sección 6: Core Concepts & Foundations [Entropy: 0.355]

DOZENS OF PHONE SCREENS
There are nine current generation sizes with six di#erent screen resolutions 
for just the iPhone and countless more for Android phones.
RANGE AND REACH
In mobile devices, it is also essential to think about the average reach. A 
randomly pieced together interface can be complicated to use with one 
hand and lead to frustration. 
We assume that the typical phone usage pa!ern is a single hand holding 
the phone with the thumb of the same hand doing most of the on-screen 
work. 
Reach can also help determine how easy it 
will be to navigate the product.
The popular hamburger menu design 
pa!ern is in the least favorable spot 
imaginable for right-handed users. 
Bo!om aligned tabs are, in most cases, the 
easiest way to design menus and should be 
considered for nearly every product as the 
"rst choice.
Easily thumb accessible
area.
Requires a position
shi#ofthehand
Requires both 
hands
R
L
TABLET REACH
We usually use our tablets di!erently. The most common way is one hand 
holding the device, while the other one is actively interacting with the UI. 
It dramatically increases the range both in portrait and landscape 
orientations. 
The most common usage pa"ern 
for tablets is using both hands. It 
allows for a di!erent approach to 
the interface planning that 
merges the larger reach area with 
the fact of having a much larger 
canvas. 
In the rare cases of holding
a tablet with both hands, the 
average thumb reach extends on 
both sides of the device.
This pa"ern works great for split 
keyboards and gaming controls.
R
L
Layout
grid L 
yout
yout & 
8.
Layout
& Grid

Grid is a structure of lines that helps keep your layout together.
It's the structural blueprint of any good project as it helps to create the 
hierarchy between elements and allows for be!er understanding and 
processing. 
Even though we don't see the gridlines in the "nal project (usually), even a 
subtle change that goes outside of the pre-set rules will have a signi"cant 
impact on how we perceive the "nal result. It's the subconscious di#erence 
between a good project and a great one. 
That's why it's critical to set the grid early in the project. Creating rules and 
guidelines near the beginning will allow for greater consistency and faster 
deployment. 
Layou
Layout & Grid
THE BASICS
Grid is the blueprint
and backbone
of your design.

On your initial designs, try to build out all the necessary screens and content 
types before a!empting to pick the right grid for the project. Be sure it will 
cover all possible scenarios. You can also use wireframes to see the kinds of 
layouts you will eventually build and pick an appropriate grid. 
HOW TO CREATE A GRID?
Once you start testing the grid, do it against a couple of screen types
- with photos, data tables, forms, or large text blocks. That will help you be 
ready for every possible scenario from chart and graph heavy dashboards 
to simple, one-column blog posts. 
If your project is going to be complicated, you can try using a more 
signi"cant number of columns (up to 16) to accommodate a larger number 
of possibilities. 
A horizontal grid is composed of vertical columns and margins between 
them, called gu!ers. Both of them can have either pre-set or "exible widths. 
They allow for a be!er horizontal alignment of the interface and are the base 
of a layout. Above, you can see an example grid with nine columns. 
The name "horizontal" can be misleading when we see vertical lines,
but it's derived from how we use it to align design elements horizontally. 
Gu!er
Column
The vertical grid is less prevalent. It can help set the heights of elements, 
sections, and vertical whitespace. It can work best with a grid-content 
presentation on blogs or news portals. It's composed of horizontal lines, 
aligning the content vertically.
The main goal for this type of a grid is to make the sections easy to scan and 
discern quickly, making it faster and more comfortable for the user to 
browse a large amount of content. 
HORIZONTAL (DEFINING HORIZONTAL LAYOUT)
VERTICAL (DEFINING VERTICAL LAYOUT)
TYPES OF GRIDS
The !uid grid assumes an outer margin and gu"er widths and adjusts the 
column widths to #t the screen. That makes the columns have varied width, 
and the gu"ers are whats keeping the alignment together. It's one of the 
most common grid types, as it allows for easier adjustments for lots of 
devices and screen sizes. 
FLUID GRID
The #xed grid works with a set value for both the columns and gu"er 
widths. If our screen is wider than the grid, we end up with blank space 
on the sides. This type of grid works quite well for websites and news 
portals, as stretching the content over 1400px will decrease readability 
anyway. In that case, it's be"er to leave
the sides blank. 
FIXED GRID
Here are two examples of a 4 column grid with a 16 point margin and an 8 
point gu"er. We only adjust the column widths to #ll the entire screen size. 
Here are two examples of a 2 column #xed grid with a margin of 16 and 
a gu"er of 8. The column width is set at 36. As you can see on a narrow 
screen, it can #ll the entire width, while on a wider one, it will leave space 
on the sides. 
FLUID VS FIXED GRID
Building a grid should always start with choosing its base value. It's
the smallest number we use to set all the other values. In general,
all our grid values should be divisible by that base number. 
Number ten is one of the most popular base numbers. The main reason for 
this is the fact that it's quite easy to divide other, larger numbers by 10. So 
the reason for its popularity is mostly practicality and ease - you don't 
have to do the math. Ten is also the "nudge value" in most design apps - 
it's the value by which you move objects while holding the SHIFT key. In 
most cases, changing that default value requires an additional plugin.
10 POINT GRID
10p
BASE VALUE
Because of that ease of use and 10 being the default nudge, it's good to 
start your !rst designs using the 10 point grid. Multiply it by two to create the 
base of a very simple, easy to implement grid system that you can later 
tweak. 
10p
40
160
40
40
20
20
20
61

---

## Sección 7: Core Concepts & Foundations [Entropy: 0.301]

Creating a !uid grid using a 10 point baseline is one of the best starting 
points for any project. As ten itself is probably too small of a number
to work well as our gu"er (for readability), we go with double that for gu"er 
and quadruple for outer margins. Assuming six columns, we end up with the 
example below. 
10 POINT FLUID GRID
The X value comes from the equal division of our screen by the numbers 
of margins and gu"ers. With six columns and a 390p width, it's 35 pixels 
and will grow the wider our screen gets. 
20p
40p
40p
X
390
2x40
5x20
6x35
=
+
+

With 8 point grids, the general rule is the same as with the ten-point one. You 
choose eight as your base value and then either multiply it by two or - for 
more !exibility - add 8 to your numbers for additional sizes. 
8p
32
24
16
40
32
64
64
32
16
16
16
16
8p
16
24
16
The 8-point grid is currently the most popular grid-type in modern UI 
design. It requires a bit of extra e"ort, but it's well worth trying it.
The main bene#t is the fact that it gives you more !exibility with spacing - 
you can #t more complex (and smaller) elements within the same space 
and have them all still #t the grid. 
Many popular screen resolutions are also divisible by 8, which can be 
helpful when designing for mobile devices. 
As you can see in the example above, we can place more elements within 
the same width. 
8p
8 POINTS
Creating an 8-point !uid grid should start with multiplying the base 
number by two. Eight in itself is too small to be the right choice for 
separating objects. Having them so close to each other negatively 
impacts readability, as you can't easily discern where one block ends, and 
another begins—knowing that you can start by se"ing the gu"er at 16 
and outer margins at 32 (or 24) with !uid column width. 
If we're always multiplying the base number by two, why not set it at 16 in 
the #rst place? While the double-base-number works well for the overall 
layout, the smaller value of eight can come in handy when positioning 
elements within individual components (like the text on a bu"on). 
8 POINT FLUID GRID
The X value comes from the screen width le$ when we subtract our margins 
and gu"ers from it. In the case of 6 columns and a 390p screen width, we 
end up with a 41 point column. 
2x32
5x16
6x41
=
+
+
16p
32p
32p
X
Why are so many skilled designers choosing the 8-point grid instead
of the 10-point? One of the primary reasons is the fact that if we use the 
multiples of 8, it allows us to have more freedom with se!ing both external 
and internal margins in an object. The result is much nicer looking 
components. 
The same component built using the 10-point grid would look like this: 
When our minimum nudge value equals ten, it forces us to have much larger 
margins (of 20). In some edge-cases, it can even reduce readability, or 
require using additional numbers (like 15) to avoid objects being too far 
apart or too wide. 
SIGN UP
E-mail address
Enter your email
16p
16p
16p
32p
8p
8p
SIGN UP
E-mail address
Enter your email
20p
20p
20p
30p
10p
10p
WHY 8 IS BETTER THAN 10?
Using a single, well-planned grid is more than enough for most projects. For 
complex portals, you can consider using multiple grid types. It can make 
sense when you have both content-heavy screens (like blog posts) and very 
dense dashboards with various complex components spanning both the X 
and Y-axis. 
To create a set of !uid grids, you de"ne three (or more) gu#er values, while 
still keeping the columns proportional in each one. Keep in mind to have all 
of them divisible by your top-level base-value (8).
An example gu#er scale can equal 8, 16 and 32. Doing this can help with 
more complex dashboard screens while keeping the content pages more 
readable. It is, however, a more sophisticated way of handling the grid, and 
you should avoid it unless it's necessary. 
FLUID GRID OPTIONS
When building multiple grids give them easy to understand names, so the developers will have it 
easier to de"ne them in code.
MULTIPLE GRIDS
The vertical grid usually comes a!er the horizontal one is already 
thoughtfully tested. You can use the same base number to set it. The main 
di"erence here is that it's best to pick the column height as well as gu#er 
height. One example is to have a 16/32 gu#er column/combination or 16/16, 
which can help with more text-heavy designs. 
If you align (most) of your objects to both the horizontal and vertical grid, 
they instantly become more readable and easier to process. 
Example of a vertical grid using a 16p gu#er and a 32p column.
32p
16p
VERTICAL RHYTHM
A component is a group of objects that belong to the same category. An 
excellent example of a component is a menu-bar, a product card, or even 
an individual bu!on. Components should "t our overall layout grid, but 
they should also follow the same rules inside the actual object. 
The main di#erence between the general layout and an individual 
component is that you can use smaller grid values inside a component. If 
you're using 16 and 32 as your main grid values, you can easily use 8 and 16 
(or even 4) inside a component. 
This margin gradation will help with se!ing the hierarchy - as we 
automatically assume objects close to each other are a group. 
COMPONENT
So! grid helps with
se"ing a hierarchy
between the overall
layout and individual 
components.

A so! grid is a rule of aligning objects using the base number and its 
multiplies. It means that both outer margins and all the paddings (in layout 
and components) are divisive by the base number. It's a more natural way 
to both design and code digital products, as implementing a hard, "xed 
grid is pre#y complicated. 
While it's great to know and understand "xed and $uid grids, in many 
projects (especially mobile apps), you end up using the so!-grid more o!en. 
Elements that belong inside one group (component) will be closer to each 
other, while top-level objects (components set in a layout) will be farther 
apart. 
To simplify the so!-grid terminology, we came up with the Red Square 
Method outlined in the next pages. 
8p
4p
16p
SOFT GRID
During our years of both designing and auditing digital products, we 
outlined a couple of most common grid-related mistakes. The necessity to 
communicate these problems to stakeholders (usually non-designers) led 
to us creating a simple alignment testing method. It's a slightly modi!ed 
so"-grid approach that yields excellent results - especially in audits. 
We called it the Red Square Method. Why?
A Square is a full shape that's easy to process by 
anyone, while red makes it look important. 
Gridlines can be a massive help while designing, but the main problem with 
them comes from the assumption that they exist between the actual pixels 
of our grid. While in fact, they take up at least one pixel to show the line 
itself. A Red Square is a full shape that you can place between the lines of 
any grid to check alignment. 
Red S
The Red Square
Method
THE BASICS
Just like with a standard grid, the !rst step is choosing the right base 
number. Then we create a red square with the side equal to that number. 
Then we create more squares by either multiplying (by two) or adding the 
base number to itself. Starting with an eight-base, we end up with the setup 
below: 
The !rst two (smallest) values should be for components only. The third one 
will work well for both layout and components, while everything larger than 
that should be used for layout only. In general, the third and fourth values 
are great for se"ing the space between actual components.

---

## Sección 8: Core Concepts & Foundations [Entropy: 0.388]

8p
16p
24p
32p
48p
64p
Component
Layout
+ ADD TO CART
Random Soda
$5.00
Refreshing mint-#avored
soda with no added sugar.
+ ADD TO CART
Random Soda
$5.00
Refreshing mint-#avored
soda with no added sugar.
THE RED SQUARE METHOD
Every multiple of our base-number should use a di!erent shade of red (you 
can use either brightness or hue to di!erentiate). You can also use di!erent 
colors for separate values, only starting with red for the base value. Whatever 
method you choose, the sizes must be visible right away. 
If we're auditing an existing design, we can use our squares to determine 
the distances between objects. Find a square size that "ts in most spaces 
and use it as your base number. What you should be looking for is deviations 
from the rules - small di!erences in set spacings and things positioned out 
of place. 
Expand your friend
network
+ ADD
Anne Johnson
+ ADD
Anne Johnson
Text should be tested against its 
baseline.
As you can see the distance here
is too big (by 1 point) - aligning our 
smallest square clearly shows the 
problem in this example.
THE RED SQUARE METHOD
TEXT ALIGNMENT
The Red Square Method is one of the easiest ways to align blocks of text for 
proper hierarchy and higher readability. There are more methods for good 
alignment (including purely optical ones), but this one works great, 
especially when you're just starting your design career. 
As you can see in the example above, we're using only three sizes (8,16, and 
32) to align all of our content (including category bu!ons) and give it a clear 
hierarchy. 
We are aligning our squares to the CAP-height (see 
Typography), which also means they align to the 
baselines of our font. If you use this rule consistently, 
you'll end up with clear, readable content. For some 
fonts it's also ok to align to x-height (lowercase x).
The Matrix
Action
8p
16p
32p
Cyberpunk
Sci-!
Computer programmer Thomas Anderson, known in the hacking 
scene by his alias "Neo", feels something is wrong with the world and 
is puzzled by repeated online encounters with the phrase "the 
Matrix." Trinity contacts him and tells him a man named Morpheus 
has the answers he seeks.
Release date: 1999 
Categories
Myk
Longer text (body copy) on a 12-column grid should not exceed eight 
columns. That roughly translates to about ten words per line and makes it 
more readable and more comfortable to scan. 
Layouts should be simple. In web design projects start with either 12 or 16 
columns for greater !exibility.
Once you get some initial component styles nailed down, de"ne the grid, 
and adjust them to "t. While it slows down the pace in the initial design 
stages, it helps with greater consistency, fewer bugs, and frictionless 
development in the long run. 
DEFINE THE GRID ASAP!
Try not to stretch longer text to the full width of the page. You can use the 
four extra columns here for navigation or suggested content.
GOOD PRACTICES
We don't read anymore. We scan. There are two main pa!erns that our eyes 
follow while looking at content. Knowing them will help you plan your layout 
for maximum e"ect. 
Whenever possible, when designing for the le#-to-right readers assume 
they'll be using an F-pa!ern. 
The most popular across 
Europe and the US is the
F-pa!ern. It shows that
our eye follows the le# edge
of the content, and jumps
to the right through photos
and headings only. 
F-PATTERN
Z-pa!ern happens when
a large photo or video breaks 
an F-pa!ern. We jump back to 
the le# diagonally, right 
through that element. 
HOW WE SCAN CONTENT
Z-PATTERN
Object
bjects
Object
bjects
9.
Objects

All currently available UI design tools work by manipulating vector shapes. 
That means the forms themselves are represented by numbers that de!ne 
them and can be stretched and enlarged without losing quality. Their 
parameters are just numbers that generate a new shape according to the 
criteria with each change.
If you're planning to design interfaces, be prepared that most of the time, it 
will be about moving various rectangular objects around. Rectangles are 
the most popular shape (right before ellipses) in all the interfaces. 
The general idea of UI design is about moving rectangles around in just the 
right way.
Object
Objects
THE BASICS
This
Goes
Here
This chapter covers the very basics of all the UI design ingredients.
UI Design
is moving rectangles
around.

The Box Model is the most basic way of de!ning a digital interface object 
both in design and in code. Most of the design we do works according to 
the box model, so it's essential to get to know it well. It consists of four main 
elements:
 
The inner margin is also called padding. It means the more extensive
it is, the bigger the safe area inside the object becomes. In the example 
below, it's the grey area inside the rectangle.
Outer margin (o"en just called "margin") is the area outside our object. It 
allows us to position it with enough safe space concerning everything 
around it. It's the blue area outside the rectangle below.
Border
Object
Outer Margin
Inner Margin
(Padding)
THE BOX MODEL
Fill
Border
Outer margin
Inner margin
Width and height (in points) de!ne the size of an object. In most cases, we 
use W and H for short. As it's a two-dimensional space, the width is a scale 
on the horizontal axis, while the height is a scale on a vertical one. 
The width and height are always of the smallest possible rectangular box 
that can contain our object - even if the object itself has an irregular 
shape.
Width or W
120p
Height or H
80p
Width
80 p
Height
80 p
Width
80 p
SIZE
The position of the object is a set of numbers on the X and Y axis, de!ned 
by the artboard that contains it. The X is the position on the horizontal axis, 
while the Y is the position on the vertical one.
Irregular objects positions are the position of their bounding box that 
contains the actual shape within.
A rectangle of 80x80p, 
positioned at X=0, Y=0
An 80x80p rectangle, 
positioned at X=260, Y=90
260
0
An 80x80p oval,
positioned at X=0, Y=0
POSITION
Angle de!nes the rotation of our object going clockwise - the default 
being 0°. Rotation can also be a negative number. It's worth remembering 
that a -15° rotation is the same as 360°-15°, which equals 345°.
If we want to have a consistent interface, it's best not to rotate objects by 
hand, but instead enter the right angle from the keyboard as it is way 
more precise than manually turning the object.
If we "a#en the object (it's an option you have in most design tools), it 
resets the angle to 0, but it is still rotated - only the new perspective 
becomes the base for further rotation. Fla#ening also converts rounded 
corners into a rounded path so only do it if you really have to!
A perfect circle will look the same
no ma#er of its angle.
0° Rotation
15° Rotation
-15° Rotation
(or 345° Rotation)
45° Rotation
ANGLE
A border-radius is a number. Just like the width and height, it's also presented 
in points. The larger that number, the larger the roundness of the corners of 
our shape. You can use it for all of the edges at once or set them individually. 
In general, even slightly rounded corners (between 2p and 6p) are 
considered more friendly than sharp ones (of 0p). However, it's good to have 
consistency in the roundness. The grid base unit that we select should de!ne 
the border-radius. It should also match its surroundings. 
Di"erent border radiuses in the same object 
can make a great bu#on if it also matches 
the brand guidelines (i.e., the logo also has a 
similar pa#ern).

---

## Sección 9: Core Concepts & Foundations [Entropy: 0.635]

If you decide to make your bu#ons that way, 
remember to be consistent with them across 
all the screens. 
LEARN MORE
Starting from the le$ a border-radius of : 0p , 2p , 6p , 100p
A square with only 
two corners 
rounded.
A square with each 
corner having a 
di"erent borderradius.
BORDER-RADIUS
Fill is another name for the object's background. It can be a color, a gradient, 
or a photo. Each of these can also have a di!erent level of opacity. If an 
object doesn't have a "ll, is also lacking a border or an e!ect, it won't be 
visible in the interface as it requires some de"ning characteristics to be 
visible. You'll still be able to select it, however, move it around, and modify it. 
It will also still exist in the layers list.
You can combine more than one "ll on the same object - for example, 
adding a transparent color to a photo will colorize the result so it can 
match the rest of your UI.
FILL
None
Color
Gradient
Photo
None
Color
Gradient
Fade-out
Gradient
The border is a line that goes around our object. It can go inside (inner 
border), outside (outer border), or between them (center). Remember that 
only the inner border doesn't visually make the object larger.
Above, you can see a 60p sized square with a 2p border around it. From the 
le!: Inner-border, centered, and outer. As you can see, only the "rst one is 
still that 60p size visually.
Inner border
Centered border
Outer Border
Inner
Center
Outer
A 2p border width that's centered adds 1 point inside and one outside of our 
element. That makes our square 62x62. The outer border adds 2 points to 
each side, which makes the square 64x64.
BORDER
The border can have di!erent weights (width) in points and can be a 
dashed or do"ed line. We can also #ll it with both a color and a gradient.
Most of the design tools allow you also to modify the endings and joints of 
your lines. 
The ends can be open, $at, or rounded while the joints can be sharp, 
rounded, or angled. The joints and the endings are not connected in any 
way, so you can have sharp joints and rounded endings in your shapes. For 
consistency, however it's best to have them match. 
Color
Dashed
Gradient
2pt
10pt
Flat, open end
Flat end
Rounded end
Straight joint
Rounded joint
Angled joint
BORDER
Outer shadows (or drop shadows) are easily the most common e!ect used 
in UI. A typical shadow relies on an o!set from center (x, y, or both) a blur 
and an opacity value. 
Some tools also allow for a "spread" value, which makes the shadow look 
like a smaller element is casting it. It makes the shadow look more natural 
as well, as it accounts for the perceived distance of the object from the 
background. 
Blurring our shadow makes it more natural. It's essential, however, that the 
opacity value is never higher than 40%.
A negative spread value makes our shadow look more natural.
X=0, Y=2,
Blur= 0, Spread= 0
X=2, Y=0,
Blur= 0, Spread= 0
X=2, Y=2,
Blur= 0, Spread= 0
X=0, Y=2,
Blur= 8, Spread= 0
X=2, Y=0,
Blur= 8, Spread= 0
X=2, Y=2,
Blur= 8, Spread= 0
X=0, Y=2,
Blur= 8, Spread= -2
X=2, Y=0,
Blur= 8, Spread= -2
X=2, Y=2,
Blur= 8, Spread= -2
DROP SHADOW
Using a drop shadow
helps with establishing
a hierarchy between
our interface layers.

A natural-looking shadow is one of those elements that make the most 
impact in design. The most important part of looking natural is avoiding 
pure black shadows and using a shadow derived from our primary color 
instead. Pure black makes the contrast ratio too big to look natural.
If you study real-life shadows, you'll notice they o!en vary in shade 
and tone.
Too sharp, dark shadow creates too much 
contrast. That high contrast black is o!en
a default value for shadows that we should 
always modify.
If we change the black color to a darker shade 
of our primary color, it starts to look more 
natural and so!er already. 
With a negative spread value, we eliminate 
the shadow spillover, making it look more 
realistic.
Our base color
Base color and
shadow combined.
Shadow color
Saturation -10 
Brightness -20
If our primary color is green, then a green bu"on can case a blurred darkgreen shadow. With a big enough blur and a negative spread value, we end 
up with a good looking result. You can also use a more subtle, grey+base 
color mix that is not as colorful. 
DROP SHADOW
Inner shadows are relatively rare in UI. It has the same parameters as a drop 
shadow, but it appears inside of the object.
They are not as popular because most interfaces are a series of layers 
stacked on top of one another. In that case, an outer shadow makes sense 
as it provides the depth. An inner shadow would suggest the object has a 
hole in it. 
The only use-cases of this style are form inputs (both form !elds and 
checkboxes or radio-bu"ons) and extruded shapes in the Neumorphism 
method. They can be used to make the objects appear more life-like in 
some instances but should only be used moderately. 
Outer shadow
Inner shadow
Modern UI's are using the shadows
to build a visual hierarchy and layered 
structure of elements.
An inner shadow makes us think the 
object has a hole in it, which breaks 
the expected layering structure and 
can be confusing.
INNER SHADOW
Most design tools nowadays have a Gaussian type blur that extends the 
e!ect in every direction evenly. Its primary value is the radius. The larger it 
gets, the more prominent the blur e!ect. 
Gaussian blur is the most o"en used UI e!ect. You can employ it into 
transitions between screens, or show a bit of realistic depth of #eld by 
selectively blurring the background. 
Background blur became popular when Apple started using it in their OS to 
achieve that behind smoked-glass e!ect in some screens. An object with 
this e!ect applied blurs everything under it. If you want to #nd out more, 
check out the Glassmorphism chapter in UI Design Styles.
This type of blur can also help you generate nonstandard, point-shadows under objects. The easiest way 
to achieve it is by blurring an ellipse and placing it under 
the object casting the shadow. 
GAUSSIAN BLUR
BACKGROUND BLUR
2p
8p
16p
A motion blur simulates the movement of an object in a direction de!ned 
by the angle value. 
A zoom blur happens when the object becomes blurry from the inside out. 
It's o"en used in photography, but not a great pick for interface design. 
In this particular blur type, you can also set the origin of the blur. By moving 
that point around, you can achieve some interesting e#ects. 
Origin outside
of object bounds
Origin in the center
Origin in the top
le" corner
Blur value 50
Blur value 25
Blur value 0
MOTION BLUR
ZOOM BLUR
0° Angle
45° Angle
90° Angle
No blur
Colors
Colors
Colors
Colors
10.
Colors

---

## Sección 10: Core Concepts & Foundations [Entropy: 0.295]

Colors
Colors
THE BASICS
Choosing the right color pale!e is one of the most crucial, essential steps in 
the design process. The hues we use a"ect the style and mood of the 
design, create the "look & feel" and are highly memorable. 
It's also the reason why people who don't remember the product name 
refer to it as "that blue app" or "that black and white website."
Colors also have strong ties with our emotions, so we shouldn't choose them 
based on aesthetics alone. 
Some colors, like red or green, have powerful emotional associations
in most cultures.
According to many studies, over 90% of whether we like a product comes 
from the color pale!e that it uses. When choosing colors, try to establish 
the target market, message, and style of your product down to the 
emotions you want your future users to have when looking at your design.
Q
J
L
K
r
Colors can have
strong emotional
associations
in people.

ANATOMY OF COLOR
Color, also known as the hue, belongs in one of two groups:
the colorful and non-colorful variants (white, greys and black).
Most people can recognize up to 10 million di!erent hues. 
The human eye is an organ with light-catching receptors, made of a series 
of rods and cones. Rods and cones allow us to see the light and color 
di!erences using a protein called Opsin. Various types of that protein react 
to di!erent wavelengths of the light. Opsin S handles short waves (450nm), 
which translates to seeing blue and purple hues. Opsin M perceives the 
greens (around 540nm), and opsin L takes care of long waves around the 
red spectrum (closer to 590nm).
These three parts can are enough to describe nearly every color we can 
see. Those rules are also the context of the RGB Color system (Red, Green, 
Blue) that is common in most displays. It's not precisely matching how 
humans see colors, but we can approximate some hues, like yellow 
(570-580nm wavelength), by merging red and green light sources. 
White re"ects a wide range of visible wave spectrum, while black does the 
opposite - it absorbs everything. That's why some people say that black is 
the absence of color, while white is all the colors combined. 
40% of women can see colors in four instead of the standard three hue 
channels. Because of that, they can discern a more signi!cant number of 
colors. 
8% of men and 0.5% of women su"er from some form of color blindness. 
ACCESSIBILITY
Accessibility of a digital product is a science of making sure the product is 
suitable for older users, visually impaired, color-blind,
and others (including people on low contrast, low-quality displays). The 
general idea is that a digital product should be easy to "see" for everyone.
Color components like brightness and saturation in!uence
the contrast, which directly a"ects the readability. The higher the 
readability, the easier the product is to use for a wider group of people. 
Su#cient contrast levels help users with vision problems to be able
to use the product as intended. We must remember to check the WCAG 2.0 
contrast for all essential UI elements. We can ignore the contrast on 
decorations and non-important parts. WCAG de$nes three contrast levels 
that depend on the size of the element. 
When designing your interface, remember to have at least a 4:5:1 contrast 
ratio (or AA) for all of your most crucial UI elements (bu%ons, forms, essential 
text).
You can test your contrast levels by using a range of dedicated, o&en free 
plugins for the design tool of your choice. They work by entering two colors 
and calculating the contrast between them on the WCAG scale. There are 
also online tools that you can use to check and calculate contrast.
A
AA
AAA
2.52:1
5.33:1
7.58:1
A - low contrast
AA - average contrast
AAA - high contrast
Contrast is
essential for
accessibility.

BLUE
Blue is the most popular color when it comes to digital products. 
Many popular apps and websites are utilizing shades of blue for their 
interfaces or their branding. 
Statistically speaking, blue is also the most liked color - both by men and 
women. Because of that, using blue hues is a safe way to design a product 
- they rarely ever create negative emotions in people. 
Blue is the color of calm and relaxation. It's o!en associated with trust, 
professionalism, experience, or wisdom.
Can you recognize the brand by its color?
From the le!: Dropbox, PlayStation, Tumblr, Facebook, LinkedIn, Skype, Vimeo, Twi"er
COLOR PSYCHOLOGY
Blue is o!en the best choice for IT, #nance, banking, health, and social 
media. It works well on large canvases, as backgrounds or background 
parts. Most shades of blue may not be the best choice for Call to Action and 
accents.
Because of the ubiquity of blue designs, a blue app icon can disappear 
between other similar looking products. It may be a good idea to choose 
an unpopular shade of blue, to be"er stand out from the already big, blue 
crowd. 
WHEN TO USE BLUE?
GREEN
Green is the color to which the human eye is most sensitive. We can also 
discern the most shades of green, from all the other colors. That is because 
the cones that see green are si!ing in the most sensitive part of the eye. 
Green stands for health, nature, calm, and relaxation. Depending on
the shade, it can communicate emotions like harmony, stability, growth, 
security, or energy. 
Can you recognize the brand by its color?
From the le": Carlsberg, Starbucks, XBOX, Greenpeace, Evernote, Spotify, Android
COLOR PSYCHOLOGY
Green is widespread in IT, #nance and banking, health, #tness, ecology, and 
food. 
Green is also growing in popularity - as it's closely connected to ecology, it's 
o"en the primary choice for marketing materials for eco-conscious 
companies. 
It catches a!ention and stands out from all the other colors. Green also 
evokes positive emotions and taking action, so it's an excellent choice for 
CTA bu!ons. In UIs, it's o"en associated with a successful action or process. 
WHEN TO USE GREEN?
RED
Seeing red makes our heart beat faster and produces more adrenaline 
than other hues. It's a warning color, which helps it catch a!ention or cause 
a reaction. It's one of the most popular colors associated with sales. 
Red is associated with both positive (energy, passion, strength, love) and 
negative emotions (danger, adrenaline, warning, aggression).
Can you recognize the brand by its color?
From the le": KFC, RedBull, Toyota, Net#ix, Rayban, CocaCola, Youtube
COLOR PSYCHOLOGY
Red is most common in products for sports, food, services, cars and 
telecommunications.
Try to use this color responsibly - it can a!ract a!ention, but it's o"en a 
negative one. In interfaces, red is usually the color of an error or a warning. 
Using red as a CTA can be risky - in some industries, like $nance, it's also 
associated with lower scores or value decrease. 
WHEN TO USE RED?
YELLOW
Yellow evokes mainly positive emotions, as it's associated with the sun, 
warmth, and gold. Because of its positive connections, it's popular in 
advertising. But let's not forget that yellow is also a warning color.
Yellow is enthusiastic, self-con!dent, happy, optimistic, and fun. But to 
counterbalance all that, it's also a warning color, that we react to 
subconsciously. 
Can you recognize the brand by its color?
From the le": MailChimp, Ferrari, Kodak, McDonalds, Ikea, Snapchat, PostIt
COLOR PSYCHOLOGY
Yellow is popular in industries like food, sales, creative services, and art. 
Add too much yellow, however, and you can cause discomfort in your users.

---

## Sección 11: Core Concepts & Foundations [Entropy: 0.25]

Just like with red, it strains the eye faster and causes some discomfort in 
large doses. 
In digital products, yellow works best with its lighter, pastel hues - mostly 
used as background. Darker, more aggressive yellows can be work as 
accents, and in places where we want the user's a#ention to go. 
WHEN TO USE YELLOW?
ORANGE
Orange is an energetic and optimistic hue - just like yellow. It calls
to action and symbolizes activity, so it's a popular choice in sport suits. Just 
like red and yellow, it's also a warning color. 
Orange is associated with youth, energy, creativity, fascination and 
activity. It can also mean bad taste or being cheap. 
Can you recognize the brand by its color?
From the le!: Harley-Davidson, Orange, Nike, Nickelodeon, Amazon, Lu!hansa, McDonalds
COLOR PSYCHOLOGY
Orange is popular with the food industry, sales, telecommunications, and 
products for children. 
Just like yellow, orange can make a physical product (and its packaging) 
seem a"ordable and approachable. 
In digital products, orange works best for accents and CTA's, because it's 
not as aggressive as red or yellow. It's also not as strongly associated with 
risk as with the other two. 
WHEN TO USE ORANGE? 
PINK
Pink is the stereotypical color associated with the feminine side. Products 
and services targeting women, mothers are o!en using shades of this hue 
in their branding. 
Pink is associated with women, motherhood, innocence, youth, romance, 
and gentleness. It can also mean naivete and childishness. 
Can you recognize the brand by its color?
From the le!: LG, Barbie, TMobile, Cosmopolitan, Johnson&Johnson, AirBnb, Victoria’s Secret
COLOR PSYCHOLOGY
Pink is popular with the cosmetics industry, fashion, pregnancy, female 
health, foundations, and non-pro"ts. 
Because of its strong ties to a speci"c group, it works best in products for 
women and children. 
It's darker, more subtle hues can be suitable for telecoms or advisory 
services. 
Pastel, so! hues of pink work well as backgrounds, with the more saturated 
ones as accents. 
WHEN TO USE PINK?
PURPLE
Purple is the rarest color, both in digital products and in nature. It used to be 
a universally bad choice, but that is starting to change now. You can o!en 
see purple in telecoms and technology. 
Purple means luxury, power, wealth, and secrecy. These associations mostly 
come from European culture and history. Other meanings include 
professionalism, wisdom, trust, high quality, and modernity. 
Can you recognize the brand by its color?
From the le!: Premier League, Twitch, FedEx, Yamaha, Yahoo!, Cadbury, Milka
COLOR PSYCHOLOGY
Purple is most popular with the IT industry, luxury goods, "nance, banking, 
and food. 
It's also a very designer-friendly hue - it works well with many other colors 
like blue, green, orange, and yellow. 
It can be a bit overwhelming when used extensively, so monochromatic 
purple designs may not be the best idea. 
WHEN TO USE PURPLE?
BLACK AND GREY
In the design world, grey is most common in 
wireframes and speci!c UI elements (like text !elds 
or inactive icons).
Light-grey items suggest being inactive or disabled, 
so try not to use it for essential objects or text. Lightgrey text is usually associated with low-importance 
labels, explanations, and suggestions. 
Shades of grey are also the base of se"ing hierarchy 
through contrast in dark mode interfaces.
When designing for computer displays, we should 
use pure black (#000000) scarcely, if at all. That 
particular color is not present in nature, and our 
eyes are not used to seeing it. In designs,
it can create unnatural, repulsive e#ects due
to its super high contrast against other colors and 
ghosting e#ects on OLED mobile screens.
Try to use very dark shades of grey instead
of pure black whenever possible. 
Pure black 
(#000000)
Dark grey (#202020)
Black and shades of grey are serious, formal, and emotionally neutral 
colors. They're associated with elegance, minimalism, professionalism, and 
luxury. They can, however, feel a bit exclusive and, when used in excess, can 
be quite depressing. 
WHITE
White is the color we work with the most while designing user interfaces. In 
most projects, we are using white backgrounds, margins, cards, text-boxes, 
and drop-down lists. 
White is also the base for the name "white space," which is the negative 
space that sets hierarchy and order in design. 
White is the color of minimalism, o!en suitable for creating clean, "airy" 
designs. Due to being the brightest of all colors, it's o!en associated with 
clarity and sterility. It's popular in both architecture, art, and fashion. 
White is o!en confused with white-space, with many junior designers 
assuming whitespace has to be white. The term comes from the print 
industry, where most of the paper types are white, but we are not 
limited by background colors in digital products. 
You can achieve white-space on any color, and you should as it's an 
essential part of building hierarchy and structure in a layout. 
WHITE COLOR VS WHITE SPACE

COLOR PALETTES
A color pale!e is a set of colors that work well together, combined to 
form a brand or a concept. It helps to set a mood for the final design.
A pallette can use colors close to each other on the color wheel or 
include accents from the opposite sides. 
Defining a color palette is essential for the design process. It allows
for color consistency, setting hierarchy, and understanding action types.
A typical color palette should contain both neutral and accent colors. 
It's also good to include notification colors (green for success and red 
for failure) - especially if forms are an essential part of the functionality. 
You can find many color palette generators online that can help you 
choose the right hues and shades that match your initial color idea. 
Before you start using auto-generated sets, however, it's worth 
knowing how it all works. 
De!ning a color
pale"e helps with
keeping visual
consistency.

MONOCHROMATIC
A monochromatic pale!e uses the shades of just one color as the 
entire set. 
It allows for using almost the entire spectrum of that shade, including 
black and white. Monochromatic is a safe choice, as it's challenging to 
come up with clashing colors in a set like this. 
The downside is the contrast can be a bit lower than with other palette 
types, and our designs can end up looking quite dull. 
Title or heading
Subheading
Longer paragraph text.
SECONDARY ACTION
MAIN ACTION
TERTIARY ACTION
ANALOGOUS
The analogous pale!e is a collection 
of colors that sit closely together on 
the color wheel. The downside of this 
choice is a slightly lower contrast 
between the colors, than in other 
palettes. To make it work, try 
experimenting with the shades.
This palette is a good, safe starting 
point allowing for many sets of fitting 
hues. 
Title or heading
Subheading
Longer paragraph text.
SECONDARY ACTION
MAIN ACTION
TERTIARY ACTION
COMPLEMENTARY
The complementary pale!e uses 
colors that sit on opposite sides
of the color wheel. This way helps 
with achieving a high contrast 
between the hues. 
Using the complementary palette, 
keep in mind to avoid clashing colors 
by testing their overlapping contrast. 
The best way to find the matching 
set is by choosing colors with less 
than 85% saturation. 
Title or heading
Subheading
Longer paragraph text.
SECONDARY ACTION
MAIN ACTION
TERTIARY ACTION
TRIADIC
The triadic palette is an equilateral 
triangle on the color wheel. You can 
start by choosing its tip, and then 
pick the resulting two bottom 
corners. Triadic color sets are often 
more colorful and playful.

---

## Sección 12: Core Concepts & Foundations [Entropy: 0.28]

When using this palette, try to set 
your primary color as the tip of the 
triangle, with the other two being 
complementary. You can use the 
golden ratio here as well, with 60% 
for the primary, 30% for secondary, 
and 10% for tertiary. 
Title or heading
Subheading
Longer paragraph text.
SECONDARY ACTION
MAIN ACTION
TERTIARY ACTION
SPLIT-COMPLEMENTARY
The split-complementary palette 
starts with choosing one color
and adding two colors on both sides
of its complementary hue. It forms
a narrow triangle on the color wheel. 
This type of palette is a safe way
of achieving excellent results that 
work well together. 
You can test the colors to choose
the right hues and shades. The goal 
is to have the right amount of 
contrast, neither too high nor too 
low. 
Title or heading
Subheading
Longer paragraph text.
SECONDARY ACTION
MAIN ACTION
TERTIARY ACTION
RECTANGULAR
A rectangular color scheme uses four 
colors positioned around the color wheel 
in the shape of a rectangle. The best way 
is to choose one complementary set !rst, 
and then choose another one that forms 
a rectangle. 
With that many di"erent hues, it's good to 
choose one primary color, and use others 
as accents. It's good to balance warm 
and cold shades for the best result. 
Title or heading
Subheading
Longer paragraph text.
SECONDARY ACTION
MAIN ACTION
TERTIARY ACTION
SQUARE
The square pale!e is a twist on
the rectangular one, with the main 
di"erence being the two color spaces 
between our corners. The resulting 
shape is an even square. 
Just as with rectangles, try to use
one color as primary, with other
more scarcely represented. 
Title or heading
Subheading
Longer paragraph text.
SECONDARY ACTION
MAIN ACTION
TERTIARY ACTION
GREYS
When de!ning your color pale"e, it's a good idea to create a mix of primary 
and grey hues. 
If your greys have a hint of the primary in them, they're much easier
to !t well into the design and make it feel more polished. 
Primary color (#2F51D2)
Pick your primary color and decrease its Lightness and 
Saturation to about 30. You'll end up with a dark shade of 
grey mixed well with the primary hue. 
The create the mid-range grey try se"ing the Brightness to 
90 and decrease Saturation by ten from the initial value. 
The lightest primary-grey shade uses even higher 
Brightness, at around 95. This shade works well as
a background color.
COLORS THAT DON'T GO WELL TOGETHER
There are some color combinations that nearly never work well together. 
They're either an eye-sore, low legibility, or both, thus decreasing the overall 
quality of the product. 
Because our screens emit light right into our eyes, the line between those 
colors can sometimes seem to "shake." 
Blue and red
Green and red
Pink and red
Two very bright colors
Yellow and white
Black and pink
BALANCING A PALETTE
GOLDEN RATIO 60/30/10
When choosing a color pale!e, it's also essential to balance the colors in it. If 
you plan to use all your colors equally, the result may end up being random. 
The best approach is to use the Golden Ratio. 
For example:
60% Dark Blue, 30% Purple, and 10% Pink.
Dark blue is the primary color - all of its shades (darker and lighter hues) are 
best suited for backgrounds and low-priority elements. It takes about 60% 
of the space in the design. 
Purple is the supporting hue, great for higher hierarchy objects. For it to be 
su"ciently visible, its use is limited to about 30%. 
Pink is the color for accents and CTA's, so 10% coverage works best, as it 
highlights the most important elements. 
SATURATION
Contrast is one of the most basic readability metrics. 
However, in cases when contrast is too high on an already bright display, it 
can cause a strain on our eyes. It's good to !nd common ground between 
accessibility and aesthetics. 
If you decide to use highly saturated, very contrasting colors, try to do that 
purposefully. It can work on event or product pages, but may not be the 
best choice for a news portal, e-store, or a banking app. 
A good practice would be to avoid exceeding 90% color saturation until 
you get comfortable enough to choose the right color combinations. The 
image above shows a typical safe area to pick safe-looking hues. 
Safe Saturation
Area
Safe Saturation
Area
PURE BLACK COLOR DOESN'T EXIST
Using pure black (#000000) in a digital product has been causing 
controversy for a few years now. Should you use it? 
While pure black gives the best possible contrast (especially on
a white background), it's not the most optimal choice for digital design. A 
contrast ratio that high can negatively a!ect the readability of the 
interface. 
Ink on a sheet of paper is, of course, as black as it gets. But every time we 
look at it, the light bounces o! of it di!erently. The result is o"en some 
shade of dark grey, as pure black doesn't exist in nature, which makes our 
eyes less adjusted to it. We perceive pure black as something unnatural. 
Because the screen is glowing, it creates an e!ect of a "no brightness" 
color that glows (except for OLED screens), which can be very unpleasant 
to look at. When we keep the contrast in the safe ranges, it's best to use a 
dark grey instead of pure black for the web. You can use pure black on 
mobile, but it can lead to an additional problem of "ghosting" animation 
on OLED displays. You can read more about pure black in the chapter on 
Dark Mode in UI Design Styles companion book. 
#000000
#000000
Q
#131313
Q
#252525
Try to avoid pure black
(#000000) in your
designs.

SYSTEM STATES
When building a color pale!e, it may be useful to de"ne our system state 
colors next to it. The most common states are: 
Positive (success / con"rmation) - green or blue
Negative (error / failure) - red 
Neutral - grey, blue
Warning - orange or yellow
Payment successful.
Your subscription is con!rmed.
Se"ings saved.
Se"ings saved.
Payment was declined by your bank.
Your subscription is expiring soon.
Terms and Conditions have changed.
Gradie
dients G
s Grad
ents G
11.
Gradients

---

## Sección 13: Core Concepts & Foundations [Entropy: 0.31]

Gradie
Gradients
THE BASICS
Gradients have been a ubiquitous trend during the Web 2.0 time (early 
2000's). Partially because they helped achieve the Skeuomorphism look of 
3d, realistic bu!ons. A"er a while, however, many designers got bored with 
them and declared gradients unfashionable and a bad-taste design. It all 
came back to prominence a"er iOS7, and later Modern Design brought 
gradients back into the spotlight. 
Because of their increasing popularity, many designers started calling 
gradients "the new colors." 
A skeuomorphic bu!on from the #rst iPhone era 
had a strong gradient, a thick border, hard 
shadow, and typical to that style highlight at the 
top.
Modern gradient, without any extra decoration, 
can work with a so" shadow made from the same 
color, creating a beautiful, semi-realistic look. 
DOWNLOAD
DOWNLOAD
WHY DO WE LOVE GRADIENTS?
We like familiar things, especially if they exist in nature. Need proof? Look at 
the sky at any time of day. The sky is not just one solid color, but a gradient, 
that depends on the weather and lighting. 
Most objects we see are three-dimensional, re!ecting light and casting 
shadows. Because the light is rarely uniform, the resulting colors and 
shadows are never fully !at or "lled with just one color. They are gradient in 
nature, which makes this particular tonal mix more natural than solid colors. 
Look at the everyday objects that surround you. All of them are gradient in 
nature, and they also change with the change of external light sources. 
Look around. Nearly
everything you see
is actually a gradient.

THE POWER OF GRADIENTS
When we start choosing our gradients, it's crucial to remember about their 
two main qualities. 
One is the ability to create depth and a more de!ned shape. 
The other is about catching the eye and guiding it to certain parts of the 
shape. Our eyes prefer bright, warm hues, with pre"y high saturation. 
That doesn't mean we should completely abandon #at design and come 
back to skeuomorphic bu"ons of the previous decade. Both approaches 
have their bene!ts and downsides, so it may be useful to create a healthy 
mix of the two. 
The #at design style allows for a less clu"ered, more minimal design that 
focuses on functionality over form. 
Skeuomorphic, or simply a more natural design, reminds us that we're 
designing for real people, who prefer things they already know and 
understand. Realistic gradients can add that "human factor" to an 
otherwise minimal project and make it more user-friendly. 
Even a subtle gradient will make your bu"ons 
more friendly and "clickable."
Depth allows gradient + shadow combinations 
to appear a bit closer to the eye - which helps 
in understanding the interactions behind them. 
FLAT BUTTON
GRADIENT
GRADIENT + SHADOW
GRADIENTS IN BRANDING
In this day and age, it's challenging to !nd a brand color that's not already 
"taken" by someone else. Blue belongs to Facebook, Twi"er, or LinkedIn. 
Orange is for Amazon, while Green is for Starbucks, Spotify, and many 
others.
Colors have, of course, di#erent shades, and we can recall them pre"y well. 
This color memory is the reason we recognize Twi"er light blue instantly and 
won't mistake it for Facebook's "o$ce-blue." 
But there are not many signi!cantly di#erent, yet still, good looking hues le% 
for a new brand to use. All the best ones seem to be reserved, and we don't 
want our app to be mistaken with Facebook (well unless we do ;) 
We can, however, merge two colors into a beautiful looking gradient and 
make it our de!ning characteristic. You can then mix popular and 
unpopular hues at a speci!c angle and have something that is both unique 
and good-looking. 
GRADIENT TYPES
A gradient is a transition between two or more colors. The colors can also 
have a transparency value. You can use that to achieve the fade out e!ect 
of an object relative to its background. All colors can even start at a 
di!erent spot relative to the object, with the default being from its edges. 
You can drag the gradient handles well outside of your object to achieve an 
even subtler result. 
There are three main types of gradients:
Linear is the most common gradient type. As its name states, it's a linear 
transition of two or more colors. We can modify the colors themselves, their 
transparency, and the gradient angle. 
Horizontal, Two Colors.
Left to right.
LINEAR
Vertical, Two colors.
Top to bottom.
Diagonal, Two colors.
45 degree angle.
Horizontal, Three Colors.
Left to right.
Vertical, Three Colors.
Top to Bottom.
Diagonal, Three Colors
45 degree angle.
RADIAL
A radial gradient starts with one color in the middle of the gradient ellipse, 
while the other ends up being on its edge. The most common type of this 
gradient is the circular one, where the transition is distributed evenly along 
the circle. 
Two colors with no transparency can create 
a 3d look in circles by adding a highlight and 
shading. 
If both ends of the gradient are the same color, 
with one at full transparency, we end up with a 
blur or fade-out e!ect. 
A radial gradient works well on non-circular 
shapes by adding a bit of an organic, realistic 
style to them.
100%
0%
GRADIENT TYPES
ANGULAR
An angular gradient goes around in a counter-clockwise circle.
The angle between the colors de!nes whether the transition goes both 
ways (180-degree angle) or has one sharp dividing line in the middle 
(at 0-degrees). 
This type of gradient is rarely a good choice for interfaces. 
Two colors set in the same spot will have
a sharp edge between them, while the gradient 
goes around the other way. 
Two colors at 180-degrees will have a "uid 
transition between the colors going both ways. 
You can add more colors and play around with the 
angle to achieve some interesting results. 
GRADIENT TYPES
BEST PRACTICES
How to create a gradient that both looks good, and makes sense for great 
interface design? There are a few basic rules to follow to achieve that. 
Try to match similar colors, warm hues with 
warm ones, and cold with cold. 
That will help you avoid bad mixes (with the 
most extreme one being red and green)
CHOOSING THE RIGHT COLORS
The best gradients are o!en very subtle, with 
not a lot of di"erence between the colors. It 
makes them look more natural and easier on 
the eyes. 
SUBTLE GRADIENTS
Two-color gradients are the best choice 
for most designs. With more colors, the 
gradient can become visually busy. 
TWO COLORS
Gradients are a popular choice for bu!ons and other interactive elements. 
Here are some tips on how to make them shine.
Vertical is the "classic" bu!on gradient.
If the lighter color is at the top, it looks more 3-
dimensional and almost asking the user to 
activate it. If you reverse the colors, it can look 
like a pressed state. 
VERTICAL
Diagonal gradients help us achieve that 
organic, natural look. If you're trying them 
out for the "rst time, start safe, with
a 45-degree angle.
DIAGONAL
PUSH ME
I'M PRESSED
Horizontal gradients may not make as much 
sense in the 3d space, but they are gaining 
popularity because they look a li!le less 
generic than their vertical counterparts.
We lose some of that convex style, but 
choosing the right colors can make the bu!on 
look more dynamic and inviting. 
HORIZONTAL
PUSH ME
PUSH ME
PUSH ME
BEST PRACTICES
You can pick nearly any color and create a beautiful looking gradient out 
of it. If you're starting your gradient journey, however, it's best to use the 
safe method that works every time.

---

## Sección 14: Core Concepts & Foundations [Entropy: 0.295]

Create a linear gradient and use the same color 
on both ends. In our case, it's simply a transition 
from #4B56FF to #4B56FF.
STEP ONE
Check if your color pale!e is in HSB mode (Hue, 
Saturation, Brightness) and decrease or increase 
the Hue value of one of the gradient endings by 
15-30. In our case, the color on top has the Hue 
value reduced by 30. 
STEP TWO
For a more organic, friendly e"ect, you can try 
rotating the gradient (here it's at 45 degrees) or 
decreasing the Saturation by 10-15 points. 
STEP THREE
BEST PRACTICES
So!-gradient is a type of gradient that uses a couple, seemingly random 
tonal transitions. You can create it by applying a radial gradient with the 
same color on both ends, but with the outer edge having full transparency. 
If you create this on a rectangle and move each radial-gradient instance 
into one corner, you can create an interesting e"ect of colors mixing into a 
very unusual pa#ern. 
100%
100%
100%
100%
0%
0%
0%
0%
SOFT GRADIENT
Subtle gradients 
between similar
colors are perceived
as the most beautiful.

Typogr
graphy
Typogr
graphy
12.
Typography

Typog
Typography
INTRODUCTION
Typography is one of the broader subjects in design, and there are 
many books dedicated solely to this matter. There are, however, some 
basic typography rules for UI that can help bring your designs to the 
next level. The fonts you choose profoundly influence the look & feel, 
style, and message of the entire project. That's why it's essential to 
know your fonts. 
There is a distinction between a font and a typeface that is important to 
understand to communicate be!er. A Typeface is a collection of various 
styles of the same le!ering. Each of those styles is a font. 
So Helvetica is a typeface, and Helvetica Bold is a font. In general, however, 
a font is a digital representation of how le!ers look. That presentation is 
about all the individual le!ers and their relation. 
FONT OR TYPEFACE? 
Aa
Aa
Aa
Typeface
Font
Font
Font

HOW TO CHOOSE THE RIGHT FONT?
Many languages have a set of distinctive 
characters that don't exist in English.
If the product you're designing is going to
be multi-lingual, check if your font supports
all the le!ers like ą, ś, ø or ē. 
SPECIAL CHARACTERS
Choose a font that has a variety of weights. It 
will help you set the right hierarchy between 
elements. Light fonts are not that readable, but 
starting at regular, make sure you at least have 
two thicker weights like bold and extra-bold. 
VARIETY IN WEIGHTS
Simple is good. Choose a font that's not overly 
ornamental or fancy. The main goal should 
always be readability. More natural, cursive, 
script or handwriting fonts can go well with logos 
or headings. 
SIMPLE FORM
Check a font in all of its sizes. If you can still 
read it at a tiny size and it looks good while 
super-big, you should be safe. In general, it's 
best to use thicker weights while designing 
UIs. 
READABILITY
Aa
Aa Aa
Aa
Aa
Aą Ęę
Ćć
Óó
Aa
Aa
Aa
Aa
FONT STRUCTURE
Each font has a set of characteristics, based on its structural de!nition. 
It's good to understand how precise and relevant these values are.
Typography
Baseline
x-height
Cap-height
median
ascent
ascender height
descent
The baseline is a "at surface on which our font is 
si#ing. You can use it to align the type to other 
on-screen elements. 
BASELINE
All elements above our x-height
are called ascenders.
ASCENDERS
All elements below our x-height
are called descenders. 
DESCENDERS
Cap height is the height of the capital le#er.
CAP-HEIGHT
The height of lowercase x is as a default value for 
other, less uniform lowercase le#ers. 
X–HEIGHT
Type
Type
Type
Typex
Type
KERNING
Kerning is the space between le!ers. All fonts have a default kerning value 
that di"ers between them. 
The safe way is to use the default value or a global value in UI as it may 
prove challenging to code an entirely custom set. When the kerning is too 
small, or too large, it can negatively impact readability. 
If you're not sure how to set it, a safe range in which you can play around 
with the default value is between -0.5 and +0.5. 
Sophisticated print designers o#en modify the kerning of individual le!ers 
for a be!er $ow. It may be a good idea for illustrative typography but is 
nearly impossible to do in code, which makes it less relevant for UI design. 
Typography
Typography
Typography
Kerning +1
Too wide
Kerning 0 (default)
Typography
Typography
Kerning -1
Still Readable
Readable
Too narrow
Kerning -2 
Wok
LEADING
Leading is the vertical space between lines of text. 
In mobile apps, it's usually a slightly lower value than on the desktop. The 
default value can o!en be too small for the readability of larger blocks of 
text. You can try to increase it slightly, or use the golden ratio by multiplying 
the font size by 1.618 to get the best line-height value. The line-height name 
should be used instead of leading as this name also functions in most of the 
programming languages. 
Typography is one of the broader subjects in design, and 
there are many books dedicated to this ma"er.
In the above example, we have the text size set at 12 points. Next, we 
multiply this by 1.618 and get 19.4. A!er that, we round the number to the 
closest value and get 19. 
The problem here, however, is that our text size is an even number, while the 
line-height is an odd one. It means it likely won't distribute evenly inside the 
line. 
We round it up to 20, which is the next even number. The same rules apply to 
other font sizes. If your size is an odd number, the line-height has to be odd 
as well. 
12
If you're not sure,
stick to the default
values for kerning
and leading.

WHITESPACE
Whitespace is the empty area between le!ers, words, lines of text,
and everything else we see on-screen. Too small or too large whitespace 
value negatively impacts readability and hierarchy. Whitespace is essential 
to a good layout, and ge!ing it right takes a lot of practice. So"-grids can 
help you de#ne whitespace between objects, but it's crucial to understand 
the typography values #rst. 
Typography is one of the broader subjects in 
design, and there are many books dedicated to 
this ma!er.
Introduction
Typography
Typography is one of the broader subjects in 
design, and there are many books dedicated 
to this ma!er.
Introduction
T y p o g r a p h y
Typografia to temat tak rozległy, że spokojnie
możnaby o nim napisać osobną książkę.
Wprowadzenie 
O Typografiii
Typography is one of the broader subjects in design, 
and there are many books dedicated to this ma!er.
Introduction
Typography
This example shows large 
enough margins and spacing 
for all the elements to be 
readable. 
SAFE
When the kerning is a very low 
number, and everything
is very close together, it's a lot 
harder to read and process. 
TOO SMALL
Uneven margins with very 
high whitespace make 
design look chaotic and hard 
to read. It seems as if there 
are no rules applied to the 
layout. 
TOO LARGE
HIERARCHY AND GRADATION
A clear, visual hierarchy helps with faster processing of the interface.
But how do you achieve that? 
Just as in books and magazines, the content we put into our UI can have a set 
of basic rules. Things like headings, subtitles, quotes, and body-copy all play a 
signi!cant role in how easy the design is to understand. Gradation helps with 
building hierarchy by adding more visual impact to top-level, essential 
elements like headings and titles. You can use both the size and weight of 
your font to create gradation and visual hierarchy.

---

## Sección 15: Core Concepts & Foundations [Entropy: 0.286]

GRADATION AND HIERARCHY
Without gradation, there's no hierarchy. 
When every element has the same 
visual weight, it makes everything look 
the same. You don't know where the title 
ends, and the copy begins. 
This content has a large heading, 
slightly smaller subheading, and much 
smaller body copy. That gradation 
de!nes the hierarchy and makes it 
much easier to understand the purpose 
of every element. 
NO GRADATION
You can also use your base-grid value (8 or 10) as a divider for your font sizes. 
In the case of having a base number of 8, you end up with 16, 24, 32, 40 and 
48 possible font sizes that work well together. Of course, it all depends on 
the font itself, but this method works well for many simple, sans-serif 
typefaces. (For more on sans-serifs see page 153)
There are other, more sophisticated methods to explore a!er the 
mentioned two. But the main goal is to have higher-level elements (like 
titles) bigger than lower-level parts (like paragraphs).
There are many ways to de"ne text hierarchy. We will cover the most basic 
ones here. Once you get comfortable with them, you can try to experiment. 
The Golden Ratio (1.618) has many uses in design. One of those uses is 
de"ning hierarchy. Let's assume your body text (also known as paragraph 
or <p> in HTML) size is 10p. Multiply that by the Golden Ratio, and you'll get 
16 for the subheading (H2). Multiply it again by 1.618, round it up, and you'll 
get 26 for the main title (H1).
Good practices
The easy way out.
Typography is one of the broader subjects 
in design, and there are many books 
dedicated to this ma#er.
H1
26p
H2
16p
P
10p
HOW TO SET THE HIERARCHY
GRID
While designing websites and apps, a grid of vertical lines is the most 
common way to layout objects horizontally. If you add a horizontal grid, 
you can use it to align text and create text rhythm. 
It helps build the right hierarchy through a combination of font size and font 
spacing. This method works best, especially for text-heavy projects like 
news apps or websites, blogs, and wikis. 
By aligning our font baselines to those horizontal guides, we enforce
a hierarchy, which in turn makes the text a lot easier to scan and read. 
You can use many rules (including 
the golden ratio) to set the right text 
rhythm. One of the easier methods 
is using multiplications of your font 
x-height. If you set the standard 
spacing to double the x-height, you 
can create more signi!cant gaps 
by increasing that number again 
(to 4x).
HORIZONTAL GRID
The content is not laid out based 
on a grid. All the vertical spacing 
is either automatic or entirely 
random.
NO GRID
Typography is one of the broader 
subjects in design, and there are many 
books dedicated to this ma"er.
11.11.2019 
Typography
Typography is one of the broader 
subjects in design, and there are many 
books dedicated to this ma"er.
11.11.2019 
Typography
2x
4x
4x
ALIGNMENT
Text alignment is a cultural thing and can di!er between countries.
Most of the western world uses the le"-side alignment because we read 
from le" to right. Irregularity of the right edge (called the jagged edge) of a 
text block shouldn't be a concern unless it's very signi#cant. There are, 
however, cultures that read from right to le" or from top to bo$om, so make 
sure to accommodate that if your project will be multicultural. 
LEFT ALIGN
Center aligned text works well when it's short. You can use center-align for two 
or three sentence blocks. Anything longer than that will be much harder to 
read. Centered text works well as a subtitle for icons or images. Try to 
remember to align it properly along the Y-axis of the #gure. The best shape of 
the text is a triangle, as it makes it easier to read than an irregular shape. 
CENTERED TEXT
Try to avoid justi#ed text while designing digital products. Having both text 
edges uniform may seem friendly, but it happens at the cost of irregular 
kerning and varying spaces between individual words. Justi#ed text is harder 
to achieve in code in a readable way. 
JUSTIFIED TEXT
Triangle shape
Triangle shape
Irregular shape
READABILITY
If you're designing text blocks for mobile devices, try to keep within 30 to 50 
characters per line. That will help with achieving legibility on a small screen.
On larger screens (like tablets and laptops), the best range is between 6 and 
9 words per individual line. This method should help you pick the right font 
size for a speci!c text block. 
LINE LENGTH
Phones and tablets are o"en very close to our faces, with their backlights 
going right into our eyes. Very high contrast combined with shining light and 
a close-range can be very unpleasant. While you should always think about 
having an accessible design, try not to overdo it with ultra-high contrasts 
either. 
As explained before, try to avoid pure-black (#000000) when designing text 
blocks. It's much be#er to use dark grey (like #222222) or be#er yet use a 
grey that's mixed with your primary color. If your app or website is mostly 
blue, it may be useful to have a blue-gray shade for the fonts to match. 
(#22224A in our example below). 
The primary dark blue CTA de!nes 
a blue-grey shade for our fonts. 
That makes every part of the info 
card internally consistent and 
more pleasant to the eye. 
CONTRAST
Introduction
Typography
PRIMARY ACTION
Typography is one of the 
broader subjects...
Try to keep between
30 and 50 characters
per line in mobile
designs.

SANS-SERIF FONTS
Sans-serif is a category of typefaces that do not use serifs - the small lines at 
the ends of characters. Sans-serifs are well suited to digital products because 
of their simplicity in shape and form. They look good even on lower-quality 
displays. 
All font styles have their purpose. Sans serifs are more minimal, modern with 
the primary goal of avoiding distraction. The simplicity helps in focusing on 
the content itself without deciphering the twists and turns of the typeface 
itself. 
WHEN TO USE SANS-SERIF FONTS?
Sans-serifs are the base font style for all digital interfaces. 
They work especially well for both headings and mid-length text blocks, 
descriptions, labels, bu!ons, and forms. 
If your text is longer than ten sentences, it may be be!er to try a serif font 
instead. The small lines of the serifs can guide the eye to faster jump 
between characters in a sentence. It's not necessary to always use serif 
fonts for longer text, however. Sans-serif will do just "ne if your product 
doesn't use serif fonts anywhere in its branding. 
SERIF FONTS
WHEN TO USE SERIF FONTS?
Serif fonts got their name from having li!le additional lines (called serifs) at 
the character edges. They also used to be called Roman fonts. 
While it may seem decorative or even ornamental to have those li!le lines 
in the font, they do have a speci"c purpose. A serif font is easier to read 
because the serifs help in discerning the individual lines of text. They guide 
the eye. Serifs are also considered more serious in tone, but the main 
bene"t is simply their ability to be more readable in longer text.
Serif fonts are great for print media (books, newspapers, and magazines). 
In digital products, they should co-exist with sans-serif fonts. Using only 
serifs in an app or on a website is not recommended unless the choice is 
branding related. 
In digital media, Serifs are best for headings or body copy in blogs and 
articles. However, if you choose a serif font for the paragraph text, try to 
have a sans-serif title (H1) for establishing a be!er hierarchy.

---

## Sección 16: Core Concepts & Foundations [Entropy: 0.25]

DECORATIVE FONTS
Decorative fonts are script, calligraphy, handwri!en, and all the other 
stylized typefaces. They're o"en neither serif nor sans-serif, but rather more 
complex in shape and form. Decorative fonts shouldn't be used in interfaces 
unless they serve a speci#c purpose. A good example is an author's signature 
under a blog post - a handwri!en font will make it look more personal. 
Decorative fonts can also remove a layer of seriousness and make your 
product seem infantile or plain silly. It's especially a case for serious #nancial 
or banking products. 
Using popular typeface choices is especially vital when starting work as a 
designer. Look around and see what fonts great designers are using and try 
to pick the same sets yourself. Remember, that simple, readable style will be 
a lot easier to #t into any kind of design scenario. The more complex the 
font, the harder it will be to make it work well in a design. 
FONTS TO AVOID
Some fonts are simply not made for UI and high-density displays. Their style is 
either dated or was severely overused over the years. For that reason, try to 
avoid system fonts of the past decades (they were o!en not updated to 
modern standards). 
Try not to use: 
Decorative, thin, or otherwise elaborate fonts are a poor choice for UI design. 
The more li"le lines and details a font has, the harder it is to process and 
understand. It takes a"ention away from the important UI elements. 
Arial
Courier
Verdana
Trebuchet
Times New Roman
Comic Sans
Tahoma
Calibri
Simple is always
the best choice.

MOBILE DEVICES AND FONTS
Both Android and iOS have their dedicated fonts that should be your !rst 
choice for designing apps on these platforms. You don't have to use those 
fonts in your design, but unless the font you choose is free, you can face 
pre"y he#y licensing fees. In general, app usage of paid fonts is the most 
expensive way to use them. 
Try to use mobile system fonts in your !rst designs exclusively. The users 
already know those typefaces from all the other apps they are using, so your 
design will instantly seem familiar. 
You can download and use both of these for free.
Try not to mix the fonts between the platforms, however. Using San Francisco 
(Apple font) for anything other than a Mac OS or iOS app can be against the 
licensing terms of that typeface. 
Apple (iOS, macOS, watchOS, tvOS)
Android, Material Design (Mobile + Web)
FONT SIZES ON MOBILE
Both Apple and Google also suggest the smallest readable font-size for body 
copy and inputs. Keep in mind that all fonts are di!erent, and these values 
are only for the mobile system fonts like SF (for iOS) and Roboto (for Android).
It seems like 18 will be the safest, most readable option that also adheres to 
the WCAG 2.0 rules. Remember - people are not afraid to scroll. It's best to 
have larger, more readable fonts than to "t more lines of text on one screen. 
Of course, it doesn't mean you shouldn't use fonts smaller than 16 in your 
designs. Just try not to use them for main body copy and inside your form 
"elds. These smaller sizes work a lot be#er for descriptions, labels, and metadata. 
16pt (Android)
17pt (iOS)
18pt (WCAG 2.0)
FONT WEIGHT
LIGHT, ULTRA LIGHT
Super thin fonts were at their peak popularity in 2012 and 2013. Around that 
time, iOS 7 marked a radical departure from Skeuomorphism towards 
minimalism in iPhones, and light fonts reigned supreme. It turns out, however, 
that they're not a great choice for readability - especially at smaller sizes. 
For a thin font to be readable, it has to be the right size. In many cases, small, 
the light text ends up with stroke widths being lower than 1 pixel, resulting in 
antialiasing and even decreased legibility. 
Remember that with thin and light fonts, you need to make them darker to 
achieve the right contrast with the background. 
EXTRABOLD, BLACK
Super thick fonts are nowadays a bit more popular, but they're not problemfree themselves. Thick, densely packed characters in small sizes may achieve 
the right contrast, but can still be very hard to read. 
Hard to distinguish individual le!ers.
This is starting to get harder to read.
This size looks good.
CSS
CSS (Cascading Style Sheets) is a way to de!ne the visual characteristics of 
objects on the web. Contrary to popular belief, it's not actually "coding," but 
rather a way do de!ne a"ributes of on-screen objects.
CSS standardizes font de!nitions in a way that should you should follow in 
your design. A typical UI o#en uses the four main CSS styles of H1, H2, P, 
and Span. 
It's good to use those names in the design process, as it will make it a lot 
easier during developer hando$. The naming convention works excellent for 
both text styles or group or layer names. 
H1 is the main title.
H2 is a subtitle.
P is paragraph text or body copy - 
used for longer blocks of content.
Span is o#en a way to specify all 
meta-data like publication date, 
comment count, author name, 
etc. 
H1
H2
P
Span
FONT PAIRING
You can mix and match serif and sans-serif fonts. Starting with a base 
sans-serif typeface, you can add a serif counterpart for headings.
It will make the text stand out more. 
Interface design can also utilize just one typeface. In that case, it is 
essential to di!erentiate content types using font-weights (like Regular, 
Medium, Bold).
Here are the basic rules to follow with font pairing.
This is an optimal ratio of 
heading to paragraph font 
weights. 
The di!erence in weight can't be 
too extensive. In this example, the 
header is visually heavy and 
makes the paragraph text 
disappear. 
Headings should nearly always 
use a ticker font than the 
paragraph text. In this example, 
the hierarchy is hard to 
understand. 
FONT WEIGHT
Work Sans
Two distinct sans-serif typefaces 
can work well together. The secret 
is choosing ones that are di!erent 
enough from each other. 
When two typefaces are too similar 
in their level of ornamentation, the 
result can be messy. 
TWO SANS-SERIFS
While trying to pair a serif typeface 
with a sans-serif one, try to choose 
the simplest possible sans-serif font. 
The serifs are usually complicated 
enough visually. 
A more decorative serif font 
combined with a decorative sansserif makes the text block 
complicated and hard to read. 
SERIF AND SANS-SERIF MIX
Montserrat + Work Sans
Muli + Brandon Grotesque
Playfair Display + Work Sans
Playfair Display + Brandon Grotesque
FONT PAIRING
If you plan to use a serif font for 
paragraph text, try matching it with 
a thicker sans-serif heading for best 
results. 
Choosing a thinner sans-serif can 
severely impact the readability of 
the entire text-block. 
Entirely serif-based designs should 
be avoided unless that choice is 
brand-related. 
Montserrat + Georgia
Montserrat + Georgia
Georgia
Two di!erent serif fonts are also 
hard to do right. In most cases, the 
result will be too complicated 
visually. 
Playfair Display + Georgia
FONT PAIRING
THE RIGHT NUMBER OF FONTS
When it comes to the number of typefaces, weights, and sizes, try to keep it 
simple. If it's possible, try to choose one or two fonts, with two weights 
(regular and bold) and between 3 and 5 sizes. The next step is to use those 
rules consistently across your design. 
Mixing and matching sizes and weights help to di!erentiate headings, 
paragraphs, and interactive elements without creating chaos. 
The example below uses Work Sans with three weights (bold, medium, 
regular) and size gradation of 24,16,12 and 8.

---

## Sección 17: Core Concepts & Foundations [Entropy: 0.502]

Typographic consistency is essential for all the interactive parts of the 
interface, such as bu"ons and forms. A bu"on label should use the same 
font size and weight across all the interface bu"ons. 
Heading (h1)
Subheading (h2)
Paragraph text / body copy (p).
Smallest text, used for meta-data and labels (span).
Work Sans Bold (24px)
Work Sans Medium (16px)
Work Sans Medium (8px)
Work Sans Medium (8px)
Work Sans Medium (8px)
Work Sans Regular (12px)
Work Sans Regular (8px)
PRIMARY BUTTON
GHOST BUTTON
SECONDARY BUTTON
Try to limit your 
fonts to one or two
per project.

Icons
ons Icon
Icons
ons Icon
13.
Icons

Icons
Icons
INTRODUCTION
An icon is a small pictogram that either symbolizes a function or status. 
Most icon shapes come from a simpli!ed version of everyday objects and 
shapes. 
Keep in mind, however, that the meaning of an icon is not always universal, 
and even the most obvious shapes can be interpreted the wrong way by 
some users. The simpler the icon, the be"er chance of understanding it, but 
in many cases, it's good also to include a text description. 
+ ADD TO CART
Random soda
Refreshing, mint-#avored
so$-drink
Icons can mean di%erent things in 
di%erent cultures. Do your research and 
pick the best shape for your target 
group. One of our apps made for farmers 
was tested for icon understanding a few 
years ago. When asked what the heart 
icon does, 67% responded with "it 
means the product is healthy," and only 
21% said it means "add to favorites." 
Even the most obvious
icons can still be
misunderstood.

ICONS AND LABELS
Should we use text labels with icons? And if so, then when is the best time to 
use them? While having a label always helps, you can safely skip it for 
universal icons that mean the same thing in many other products. A small 
portion of users may still get them wrong, but given the ubiquity of the 
shapes, they will work in most cases. These include: 
Icons are a way of se!ing the tone and style of the product, making
it more user-friendly. But we need to remember that they are mostly there 
for aesthetic or space-saving purposes. Having an icon with a label will 
make it a lot easier for the users to understand what it does right away. 
The longer or harder to understand the label, the longer it will take the user 
to understand it's meaning. It's best to use just one simple word for the label. 
The more visually complex shape, the harder it is to understand its purpose. 
Try to make the icons simple enough to convey the right message. 
You can also skip the labels with icons related to toplevel navigation like the hamburger menu and the back 
arrow. If your target audience is a li!le older or less 
tech-savvy, its actually good to keep the labels here.
- Add to favorites
- Map Pin
MENU
- Refresh / Reload
- Open the Camera app
- Remove
- Search
BACK
WHAT ARE ICONS MADE OF?
Most icons are simple shapes that you can create yourself in any design 
tool. Of course, there are plenty of beautiful, free libraries of icons to be 
found online. But if you're learning design, it's an excellent exercise to draw 
some of the simple shapes yourself !rst.
+
+
+
+ 45
=
=
=
=
+ 45
For example, a magnifying glass icon, which is synonymous with search, is a 
simple oval that's empty inside and a small line a"ached to it. 
We combine the shapes and rotate them 45 degrees for the !nal form. 
You can mix and match simple rectangles to create the + bu"on, an arrow, 
or an X. The easiest way to draw them is without rotation, so start with a 
vertical or horizontal shape, and rotate it when the entire form is complete. 
It's a lot easier than drawing it already turned. An excellent example of this is 
the pencil icon shown above. By drawing some initial, simple icons yourself, 
you'll also learn how to build them so you can adjust downloaded icons to 
match the style of your product. You can use the stroke of the shapes to be 
able to switch the thickness of the icon easily. 
ICON STYLES
It is essential to have all the icons of our product done in a consistent style. 
There are a couple of main factors to consider when aiming for consistency. 
The best interface icons are usually simple, but you can do a more realistic, 
very detailed icon when necessary. 
sqg
LEVEL OF DETAIL
The icons can be a full shape, !lled with a color, or outlined, empty inside 
with a speci!ed stroke width. You can also add more a"ributes like 
shadows or multiple colors. 
FILL VS OUTLINE
The edges and corners can be straight and sharp or rounded, which is 
considered more user-friendly. Sharp corners work well for very serious 
products, while rounded ones are perfect for friendly, consumer-facing 
designs. 
ROUNDNESS
Simple / abstract shapes
solid icons
outline icons
realistic, detailed shapes
Rounded edges
Sharp edges
CONSISTENCY
Keep your icon styles consistent throughout the product. Having icons 
from "di!erent sets" will create a chaotic, less de"ned look. 
All icons should have the same type 
of edge and corner rounding. Avoid 
mixing rounded and sharp corner 
icons. 
ROUNDNESS
Unless it's intentional for se#ing 
the state (on vs. o!), avoid mixing 
outline and "lled icons on one 
design. 
FILL
The smaller the icon, the less 
detailed it should be. As the shape 
gets smaller, the complexity of lines 
will blur and make it harder to 
understand. You can make larger 
icons slightly more detailed, but 
keep in mind that the more detail 
you add, the longer it will take to 
process. 
LEVEL OF DETAIL
Consistent
corners
Varied
corners
Same type
of "ll
Di!erent types
of "ll
Similar Level
of Detail
Various Levels 
of Detail
A simple, small 
sized icon
More detailed, 
larger icon
CONSISTENCY
If you decide to use outline icons, 
remember to have them all use the 
same stroke width at all sizes. The 
thicker the stroke, the more visual 
impact (weight) the icon has. 
WEIGHT
Same stroke
width
Di!erent stroke
widths
The look and feel if icons can be 
either friendly, professional, or 
somewhere in between. 
Friendly icons tend to be more 
rounded. Outline icons to be 
considered friendly should have a 
thicker stroke. 
Serious, (professional) icons are 
either very subtly rounded or made 
with sharp corners. They're o"en 
more minimal and use a much 
thinner stroke.
FRIENDLY VS SERIOUS
Friendly, outline
icons
Friendly, #lled 
icons
Serious, outline
icons
Serious, #lled
icons
LEGIBILITY
When picking the icon style, try to test various icon sizes to see how they scale 
down and how much detail they lose in the process. Lower quality displays 
can also show some of the more detailed ones as blurry. 
Simple, !lled shapes with rounded 
corners look pre"y good at any scale.
SIMPLE + FILLED
Outlined icons with a thick stroke are 
pre"y clear at most sizes. They lose some 
detail when very small, so it's crucial to 
test if they're still fully visible. 
SIMPLE + OUTLINED
Filled icons with sharp corners and more 
detail, lose some of their legibility when 
scaled down to a smaller size. 
COMPLEX + FILLED
Thin, detailed outline icons lose a lot of the 
detail when we scale them down. Some lines 
start to disappear when anti-aliasing is applied, 
making them blurry and hard to see. 
COMPLEX + OUTLINED
ICON SIZE
Shapes can have a di!erent optical weight. It means an object can take 
less visual space, even if it's the same height or width in pixels as the other 
one. 
The best way to see this is by making an oval and a square - both at 100 x 
100 pixels. When you put them side by side, you realize that the square 
seems to be bigger than the oval. It is because it takes a lot more space on 
the sides, which makes it look more substantial.

---

## Sección 18: Core Concepts & Foundations [Entropy: 0.295]

All icons (and especially icons used in the same context) should be 
proportionally scaled. We can't allow for one icon to feel bigger and 
stronger than the rest, as it will make it stand out more and break the visual 
harmony. 
Having all icons be the same size in pixels does not guarantee they "look" 
the same size. In many cases, you need to adjust the shape by hand to 
match. 
The optically smaller icon can be slightly bigger to make up for the lost 
space on the sides. The goal is to have both shapes have a similar visual 
weight. 
SAFE AREA / BOUNDING BOX
A bounding box is a safe area around the icon that we can use for irregular 
shapes to take a bit more space. 
To make it easier to adjust the icon weight, we create a safe area around the 
most square-looking shape of all. Then use the same frame to adjust other 
icon shapes to !t. 
Then you can adjust the size based on the shapes:
Bounding-box
Actual icon size
Square icons are the easiest 
ones to start with. They're for 
se"ing the bounding box for 
other shapes. 
We need to make oval 
based shapes slightly 
larger to compensate for 
the missing space. 
Adjust triangular shapes the 
same way, so that their weight 
matches the square. 
Wide, horizontal icons 
need to be even wider to 
compensate for their 
lower height. 
Narrow, vertical icons need 
to be much taller than the 
square to have a similar 
visual weight. 
Irregular icon shapes are the 
hardest to scale right. Test 
them close to the other icons 
to see if they're big enough. 
Bu!on
!ons
Bu!on
!ons
14.
Bu!ons

A bu!on is an interactive element that results in an action described
in it. You can bet that if it says "save" on a bu!on, clicking it will most likely 
"save" something. It's also an essential interactive element of a digital 
product. It's crucial to get bu!ons right. 
It can lead to a purchase, downloading, sending, and many other vital 
actions. Digital bu!ons are also descendants from real-world bu!ons like 
in the tv remote, record player, or a game controller.
The most important rule while designing a bu!on is for it to stand out 
enough so it won't be confused with anything else.
By removing elements from a bu!on, it's function starts to dissolve and 
disappear. It becomes decoration or text, losing its actionable qualities.
Bu!o
Bu!ons
THE BASICS
BUTTONS SHOULD LOOK LIKE BUTTONS
SAVE
BUY NOW
DOWNLOAD
SEE MORE
SHARE
LEARN MO
SAVE
SAVE
SAVE
SAVE
A bu!on should
look like a bu!on.

We are used to speci!c shapes and forms that are typically associated with 
an action. The more our bu"on looks similar to what we associate with 
bu"ons - the be"er. It is the main reason why a rectangle (or a rounded 
rectangle) is always the safest choice for a bu"on.
An exception to the rule is a text link. A link has the same general function as 
a bu"on, only lacking the shape. Due to its online popularity, it is also really 
straightforward for the users. Blue and purple text links - dating back to the 
beginning of the world wide web are one of the most common UI pa"erns 
imaginable. 
DOWNLOAD
DOWNLOAD
Blue and purple text links are one of the fundamental design truths. Most users 
understand them right away. 
Other shapes and forms (triangle, circle, organic) are not as recognizable to 
the user. Please proceed with caution and use them only when the general 
style of your product requires deviating from the norms.
These objects will be identi!ed as a bu"on right away.
Elements that can take much longer to understand they are actionable.
FAMILIAR SHAPES
DOWNLOAD
DOWNLOAD
DOWNLOAD
BUY
BUY
BUY
Corner style
Color, weight and font
Safe space
Outer Margin
Inner Margin or
Padding
Shadow
Color or
Gradient
DOWNLOAD
While designing bu!ons, remember about all of these elements and choose 
them wisely. Using the brand book as a baseline, think about what kind of 
bu!ons will match the brand and "t well within the interface. 
You should set the padding and the safe space using your grid base 
numbers. (See the Layout and Grid Chapter and "The Red Square Method") 
In the above example, the le# inner margin is twice the size of the vertical 
one, which is a safe choice for increased readability.
BUILDING A BUTTON
DOWNLOAD
X
2X
Poorly aligned and unevenly spaced bu!ons are one of the most common 
problems of all interfaces. Double-check if your bu!on labels are centered 
both horizontally and vertically. Create guides if you need to be sure.
DOWNLOAD
X
X
Y
Y
DOWNLOAD
2W
1W
Aside from grid-based methods, there's a safe way of choosing bu!on 
spacing with multiples of capital W. If at least 1 W "ts on each side of the 
bu!on label, you're safe. 
On the sides, it's even be!er to use 2 x W for increased readability. In 
general, the smaller the padding inside the bu!on, the harder it is to read 
and understand. 
Don't forget about the space around your bu!ons. If you have a group of 
them, the safe area should be individual for each one - try not to overlap it!
SAVE
CANCEL
ALIGNMENT
Both web and mobile bu!ons should also have a set minimum size. 
If your bu!ons are too small, it will be di"cult to tap or click on them. That 
results in frustration and can lead to users uninstalling your app. The best 
way is to start with 44 by 44 points for all interactive elements on mobile 
devices. The sweet spot is somewhere around the 50p height for mobile 
bu!ons. 
The width (including the Double W minimum spacing) can be any number 
equal to or larger than the height. In the case of cursor-based devices, 32 by 
32 should also work. Remember that even on desktops, the larger the 
bu!on, the easier it is to use.
This bu!on is too small. The inability to quickly tap or click on it 
will frustrate your users.
This bu!on is big enough for both computers and mobile 
devices. People should be able to #nd and activate it with ease.
This bu!on is still a bit too small for mobile devices. 
It probably will be #ne on laptops.
SIZE MATTERS
If you're using rounded bu!ons, keep in mind to have the right rounded 
corner ratios towards other on-screen elements. Using the same one for 
everything will create imbalances in the margins.
The diagonal spacing is the same 
here like the one on the le" side and 
the bo!om. That results in a be!er 
looking, cleaner, and faster to process 
outer edge.
The diagonal spacing is larger (bo!om) and 
smaller (top) than the side spacing. That 
makes the edge stand out too much and 
take the a!ention away from the bu!on 
itself.
+ ADD TO FRIENDS
Kate Wilson
+ ADD TO FRIENDS
Kate Wilson
+ ADD TO FRIENDS
Kate Wilson
+ ADD TO FRIENDS
Kate Wilson
FIGURE TO BACKGROUND 
CTA or Call to Action is an essential, actionable element of a website or 
app. It's usually closely tied to the sales process. 
While designing your CTA bu!on, remember that it has to stand out. The 
screen's on should not have any other bu!ons that compete with it visually 
or catch a!ention. The best way to achieve that is to make it the only 
element with a unique color or style on the screen. Don't forget to think 
about the contrast, so your bu!on doesn't blend with a background too 
much. 
Size also ma!ers. If it's too small, people may miss it while scanning the 
page. If it's too big, it can su"er from "banner blindness," which is ignoring 
visual elements that resemble an advertisement.
As with other bu!ons, the sweet spot is between 40 and 60 points of 
height, with proper spacing on both sides. 
Remember that your CTA needs to "call to action" through wording as well. 
It needs to be convincing and inviting from the start. It also has to be 
precise - things like "Sign up for X" or "Download the book" work best.

---

## Sección 19: Core Concepts & Foundations [Entropy: 0.31]

Try to avoid labels like click here, next, or back.
DOWNLOAD THE BOOK!
CALL TO ACTION
THE RIGHT MESSAGE
The optimal height 
of a CTA bu!on 
is between 40 and 
60 points.

Text link
Hover
Active
Disabled
A text link was the !rst way to have an actionable element on a web page. 
A blue link, underlined is thus the fastest identi!able element of the page. 
Nearly everyone associates it with action and tries to click it. 
With that in mind, remember not to underline non-active elements 
(especially if they're blue) as an inability to take action can confuse 
and frustrate the users!
Link
Link
Link
Link
Link
Link
Link
Link
Link
Link
Link
Link
Link
Link
Link
Link
Link
Link
Link
Link
Link
Link
Link
Link
Link
Link
Link
Link
Link
Link
Link
Link
Link
Link
Link
Link
Link
Link
Link
Link
Link
When Marissa Mayer worked at Google, she tested over 41 di"erent shades 
of blue to !nd the best combination available. The goal was, of course, for 
people to click more, and one particular shade won the race. You can now 
see it in Google's search results. 41 Shades of Blue may sound like a cheesy 
novel title, but it also shows the dedication to research that makes a 
di"erence. 
In truth, however, if your link has enough contrast and di"ers from its 
surroundings (through color and underline), you can be sure it will be 
understood.
TEXT LINKS
41 SHADES OF BLUE
PRIMARY
HOVER
ACTIVE
DISABLED
CTA
HOVER
ACTIVE
DISABLED
The primary is the bu!on for the main, positive actions on each screen — 
things like OK, Save or Download. 
Unlike the CTA bu!on, you can use more than one instance of this bu!on 
on the screen, but try not to group it with other primary bu!ons or the CTA.
Design your Call to Actions to be visually di"erent than all the other bu!ons. 
You can use colors or sizes to achieve that. The goal is for the bu!on to be 
visible right away and to catch the a!ention. Because of that, you should 
only use one instance of CTA on one page. If you are designing a long page, 
you can duplicate the primary CTA near the bo!om as a "catch-all" type 
bu!on. 
If you try and use more than one "strong" bu!on, your page will be 
converting less, as the user's a!ention divides between many elements. 
CTA should also deliver the most important actions of your interface like 
"Buy now" or "Sign up."
BUTTON TYPES
SECONDARY
HOVER
ACTIVE
DISABLED
The negative action is more eye-catching than the 
positive one.
The negative action is quickly identi!ed as less 
important than the positive one.
TERTIARY
HOVER
ACTIVE
DISABLED
Secondary bu"ons can be used for all the less critical actions or if we have 
many bu"ons with similar importance on one screen. If you're unsure which 
bu"on to choose, this should always be your safe choice. 
Make sure this bu"on does not compete visually with either the primary or 
the CTA, and you're good to go.
Tertiary bu"ons are best for negative actions like "cancel" or "revert." You 
can also use a text link or a ghost bu"on as your tertiary, instead of a 
rectangle.
There's a notion that all negative actions (like 'remove') should be a red 
bu"on. In most cases, the tertiary will do the trick. If you're unsure how to 
design negative actions, think about it like this: Are those negative actions 
desired? If they're not the core of what your project has to accomplish, then 
making them red would take a"ention away from other, more critical onscreenelements.
BUTTON TYPES
SAVE
CANCEL
SAVE
CANCEL
Icons on bu!ons are mostly used in apps to condense more functionality 
within limited space. If there's a text label next to an icon, the perceived 
importance of that bu!on is higher. In general, however, it's best to avoid 
having too many bu!ons with only the icon. Even the most well-known 
symbols can be interpreted di"erently by your users and confuse them. 
One of our most famous examples is the heart symbol. In one particular 
target group, we researched most of the users thought the heart meant it 
was a healthy product. 
Outline bu!ons, also called ghost bu!ons, are usually reserved for less 
important actions. They're o#en used as a tertiary bu!on as they don't 
compete as much visually with primaries and CTA's.
You shouldn't use a ghost bu!on as your Call to Action, because it captures 
less a!ention than a bu!on that's $lled. Because of that, it takes slightly 
longer to process, which may lead to lower conversion. 
Their active states (hover, active) work best when $lled with color.
BUTTON TYPES
WITH ICON
MENU
DISABLED
HOVER
ACTIVE
OUTLINE
Sharp corners !t brands that have similar shapes in 
their logo and other elements.
Slightly rounded corners are likely the most popular 
and also the most user-friendly choice.
Larger corner-radius can make it harder to align 
the text above and below the bu"on.
"Pill" or the highest possible border-radius works 
well for CTA's.
The same rules apply to your icon-bu"ons.
Bu"ons can also vary through their corner-radius. Remember that each 
project is unique - if your brand image has only sharp corners, having 
rounded bu"ons will make the UI inconsistent. Mixing a couple of di#erent 
corner radiuses within one interface can also lead to consistency and 
readability issues unless done on purpose.
CORNER RADIUS
NORMAL
NORMAL
NORMAL
NORMAL
OUTLINE
OUTLINE
OUTLINE
OUTLINE
WITH ICON
OUTLINE
WITH ICON
OUTLINE
WITH ICON
OUTLINE
PRIMARY
CTA
SECONDARY
TERTIARY
Text link
PRIMARY
CTA
SECONDARY
TERTIARY
Text link
PRIMARY
CTA
SECONDARY
TERTIARY
Text link
It's good to design your bu!ons in a way that they work well on various 
backgrounds. A lot of apps and websites are adding "dark modes" now, 
which results in at least two completely di"erent versions of the product. 
The colors and saturation of the bu!ons should work well with most
of the backgrounds. You can create a simple tester like below and always 
aim for high contrast and visibility. 
VISIBILITY
Important bu!ons also work well with icons. A basket or a cart icon quickly 
identi"es a checkout. However, that is the case only as long as the word 
checkout is used as a label. 
The bu!on on the right is more visible and will be a stronger Call to Action. 
A right-facing arrow or chevron placed a#er the bu!on label makes the 
resulting message stronger. The user is more inclined to click and "proceed." 
It works well if you'd like to make your CTA stronger.
Bu!ons with shadows are also more "clickable" and noticed much faster 
than $at ones. Add a subtle drop shadow to make it stand out from the 
background. 
BEST PRACTICES
DO KASY
CHECKOUT
CHECKOUT
DO KASY
CHECKOUT
CHECKOUT
BUY EBOOK
BUY EBOOK
Rounded bu!ons are considered more friendly and positive than sharp 
edges. At the same time, however, they make it a lot harder to design 
content around them. If you have le"-aligned text just above the bu!on, 
the more rounded the corner, the less that text will visually #t. It makes you 
feel as if the le" margin is in two places at the same time.
If the bu!on is only slightly rounded text above, it seems to #t within
the perceived le" margin.
The text over a more rounded bu!on begins to "bounce" away to the right 
visually.
Text over a completely rounded bu!on loses visual alignment and seems to 
be outside the grid.
Pill type bu!ons work the best when the text above them is centered or 
removed altogether.
BEST PRACTICES
Aligning icons on bu!ons is one of the hardest tasks a designer can face. In 
many cases, it depends on the font-weight to icon weight ratio and their 
"optical size." 
However, you can try and use this simple solution that will work "ne in most 
cases.

---

## Sección 20: Core Concepts & Foundations [Entropy: 0.265]

Create a square or a circle the size of our 
bu!on height. If it's a pill or rather sharpcornered bu!on, just align it to the right side of 
the shape. Then create another smaller object 
inside of it with its spacing being the height of 
our text. Then "t the icon right in the middle and 
try not to make it larger than the smaller circle. 
In the case of chevron, text-height works for 
chevron height as well.
If our border-radius is larger than 8 points (but 
not quite a pill), it's best to align our square to 
the place where the border starts to bend. If you 
need to use a more complex or larger icon (like 
a shopping cart), make sure it's not bigger than 
our smaller container.
BEST PRACTICES
CHECKOUT
CHECKOUT
CHECKOUT
CHECKOUT
Rounded corners are also problematic while designing a bu!on/dropdown 
combo. It works the same way as a normal dropdown, but its initial state 
looks more like a bu!on with a full color or gradient "ll. When you expand 
the bu!on, it creates a shape that distorts the le# edge, even more, making 
it harder to process the text. You can see that clearly in the second image.
If the corners are sharp or only slightly 
rounded, we end up with a natural, easy to 
read expanded version. 
The text margin allows the user to go 
down in a straight line without shi#ing 
focus away.
If the corners are completely round, we 
end up with a shape that captures our 
a!ention and swings it between two 
separate grid lines. 
That impairs readability as our focus shi#s 
from edge to edge while scanning the 
image.
MENU
MENU
MENU
Option 1
Option 2
Option 3
Option 1
Option 2
Option 3
MENU
BUTTON STYLE DROPDOWNS
Bu!ons should be in places where the user expects them to be. That usually 
means below the descriptive elements and o"en aligned to one of the 
sides. 
That matches the way we scan things - from top to bo!om along the le" 
edge (which is also called an F-pa!ern). If you want to stay safe without 
bending the rules, pick the #rst image.
By scanning the card from top
to bo!om (along the le" edge), we 
naturally end up on a strong 
element, which in this case,
is our CTA bu!on.
If the most pronounced visual 
element is not at the bo!om, our 
eyes travel back and forth along 
the edge, which makes for 
slower processing.
HIERARCHY
POSTER - OCEAN
Canvas, 120x80cm
$49,99
CHECKOUT
YOUR CART (2)
CONTINUE SHOPPING
POSTER - OCEAN
Canvas, 120x80cm
$49,99
CHECKOUT
YOUR CART (2)
CONTINUE SHOPPING
If we want to center our label on a bu!on correctly, we need to make sure 
that both the label and bu!on height are either even or odd numbers. If one 
value is an odd number and the other one is an even one, you will never be 
able to center them correctly. 
We can try to use auto-alignment tools like auto-center, but sometimes 
even they end up missing a pixel or two. 
Sadly entering an even number for both the container and label height is 
o"en not enough. Fonts are interpreting the numbers di#erently (depending 
on the font construction) and render the resulting text slightly larger or 
smaller than we anticipated. That's why try and use li!le squares to measure 
the height from the top and bo!om (and then from the sides) to be sure it's 
the same on each side. The bu!ons below both have an even number as 
their height and an even number for the font-size. One of them had to be 
modi$ed by hand to $t perfectly instead of missing one pixel. 
We used auto-alignment in both bu!ons. The example on the right, when 
checked manually, shows that there's a one-pixel gap on one side. In a 
case like this, you need to adjust the bu!on height to match the label 
manually. 
AUTO-ALIGNMENT IN DESIGN TOOLS
DOWNLOAD
DOWNLOAD
Don't trust numbers
alone. Test your main
bu!ons manually.

The text to background contrast ratio is fundamental to get right. If it's too 
small, the user can skip it entirely while scanning the screen. If the contrast is 
too high, it can become an eye-strain - especially with high brightness 
displays. 
Most design tools allow you to add a plugin (o!en free) to check the 
contrast ratios between elements. Aim for at least AA, but also use your 
judgment as to what will work OK. We'll talk more about the contrast in the 
chapters on colors. 
Remember that some of your users may have impaired vision.
Even if they don't, why make their lives harder?
Which one do you think will get noticed !rst?
The one on the le! can be barely visible on low contrast screens or by 
visually impaired users.
CONTRAST
DOWNLOAD
DOWNLOAD
A label wri!en in all-caps is slightly slower to process than title-case one. 
It of course, depends on the number of words, their length, and even 
individual le!ers. 
Doing bu!ons ALL-CAPS is not wrong, but try to limit them only to short one 
or two word labels. Words like "DOWNLOAD" or "SAVE" are safe to use 
either way. It's also closely tied to how the brand itself communicates in its 
marketing materials and branding. If it includes ALL-CAPS, it's good to be 
consistent with those rules. 
The title case is slightly more readable, especially with more wordy labels. 
Try it for things like "Sign Up For Our Newsle!er" or "Download the Free 
Ebook."
Try to avoid entirely lowercase bu!on labels, though, unless they're brand 
de"ned. 
The label on the le# will be slightly faster to read and process. The one on 
the right will be easier to align correctly inside the bu!on. The choice is 
yours. 
TEXT CASE
SAVE
Save
Cards
rds Ca
Cards
rds Ca
15.
Cards

Cards
Cards
INTRODUCTION
Cards are one of the most popular ways of showing content in an 
interface. They can display products, information, people, or actions. 
Most of the products out today, especially after Material Design, use 
some form of card-based UI.
A card is usually an excerpt from the full detail page it leads to after 
tapping or clicking. It can contain text, buttons, icons, and photos to 
help the user better decide which one to choose. 
When designing a card, start with adding the essential content to it !rst. 
A"er you have all the elements, you can start !nding the best place to 
position and style them. 
Avoid using non-essential information on cards (!ller content) - they should 
be concise and to the point. Stick with just one bu#on and three lines of text, 
moving everything else to the following detail view.
+ SEND INVITE
Anna Summers
BUY NOW 
Read more…
Random Soda
Our trip to Bali
po
W
HOW TO SHOW CARDS
Usually, cards exist within a horizontal or vertical scrolling carousel.
We can also stack them on top of each other, or use a grid. It can either be 
one with equal heights or a more organic "masonry" grid, which can have 
di!erent heights for each card, while still keeping them in a column. 
Try to make your cards accessible to all popular input types
(cursor, touch, or arrow keys). 
Here are the most popular ways to display cards: 
Horizontal cards are the base for side-scrolling 
carousels. 
HORIZONTAL
Vertical cards are best for catalogs and other 
data-heavy presentations. 
VERTICAL
Stacks work well for simple, action-based sorting 
(like swiping them away to the le" or right). 
STACK
Both the masonry and even grids are suitable for 
news portals and e-commerce sites. 
GRID (MASONRY)
SCROLLING CARDS
If your cards are in a side-scrolling carousel, try to have the last one slightly 
cut-o! by the edge of the screen. That will help the user understand that 
there is more content behind the screen to access. 
This kind of card layout is not 
suggesting the user can move 
them horizontally.

---

## Sección 21: Core Concepts & Foundations [Entropy: 0.316]

NO CUT-OFF CARD
With one card sticking out 
from behind the screen edge, 
we automatically know there's 
more content there to scroll. 
ONE CARD CUT-OFF
Expand your
network:
Expand your
network:
+ ADD
Anna Miller
+ ADD
Anna Miller
+ ADD
Anna Miller
+ ADD
Anna Miller
DISSECTING A CARD
Layout and hierarchy of our card directly in!uence how easy and fast
it will be to understand their purpose and take action. 
Identify the most critical information (like the price), the secondary info (like 
the product name), and a label (category) and design them in a clear, 
hierarchical way by grading the emphasis (like using a bigger, bolder font 
for the important info). 
When designing a template card, do it with the longest possible text
in every "eld (like the longest product name, highest possible price, or the 
longest last name on a user card). That will help you plan the best way to 
display all kinds of data. 
Keep your margins consistent and uniform, stacking related information 
together for clarity. 
Safe margin
Photo
Main title
Additional info
Action
CARD STRUCTURE
Once we get the content hierarchy right, you can start adding the visuals. 
These can include product photos, icons, or a Call to Action bu!on. 
While we don't recommend it, cards can have additional action bu!ons 
(secondary and tertiary). They can also contain action icons (usually
in the top corners). 
Keep your cards unclu!ered and straightforward. Remove all non-essential 
information for higher clarity. 
Unless they're the main object of the card, photos and illustrations shouldn't 
take more than half of the vertical space of the card. The exception being 
photo galleries where the images are an essential element. 
+ ADD TO CART
Random Soda
$5.00
Refreshing mint-"avored
so#-drink.
+ ADD TO CART
Random Soda
$5.00
Refreshing mint-"avored
so#-drink.
Safe margin
ICONS
Cards can use icons for non-essential actions that won't compete with the 
CTA too much. These include things like "add to favorites," "share on social 
media," and similar. 
Icons usually occupy the top right portion of our cards, because the bo!om 
is the best place for the primary CTA which should be catching the most 
a!ention. 
Action icons can either be external (showing a new screen, like a sharesheet for social sharing) or internal, where the status of the icon changes 
once we activate it (add to favorites). 
All internal icons need to show which state they're in precisely. If the product 
is already in favorites, the icon needs to show it by a colorful "ll. If it's not, it 
can be greyed out or outlined. 
K
ICON ALIGNMENT
The icon should be the right size, with a proper margin from the sides and 
big enough active area, also known as the touch target. 
The size of the icon should come from a grid base number we set up 
beforehand. If we're not sure about the size, the safe choice is around a 
quarter of the touch target. With the typical TT of 44x44 pixels, the smallest, 
yet still, a good looking icon should be about 20x20. 
If too big, the icon can grab way too much a!ention away from the CTA. 
If too small, it can disappear or look like a decoration, and not something 
you can use. 
Icon should be at least 
a quarter of the size 
of the active area.
Too big
Just right
Too small
Safe area and
touch target.
CARD SHADOWS
Because of the assumed position on top of the background, cards should 
cast a shadow. The best choice for a realistic-looking shadow is assuming 
the light is coming from the top, which translates to a positive shadow o!set 
on the Y-axis. 
The horizontal o!set (the X value of our shadow) should stay at zero in most 
cases. We usually look at the screen from the front, so a side-leaning 
shadow can negatively a!ect the perception. 
Another way is to skip the o!set altogether (x=0 and y=0) and focus
on blurring the shadows equally on all sides. 
A so", subtle shadow that makes the card 
appear as if it's #oating over the 
background. 
PLEASANT, GOOD LOOKING CARDS
If the shadow or stroke is too strong (high 
contrast), it takes the a$ention away from 
the contents of the card. 
Too li$le contrast will result in a blurry border 
that makes the entire card harder to discern. 
MOST COMMON PROBLEMS
GOOD PRACTICES
+ ADD
Anna Smith
HR Manager
+ ADD
Anna Smith
HR Manager
Use the right margins and 
font sizes to set the layout 
and hierarchy in place. 
Avoid unnecessary 
decoration (like separators 
or other decoration). 
I Invite you to read my 
new post about … 
read more
Holidays in Bali
Read more…
Holidays in Bali
If you plan on using 
a text-link instead of 
a bu!on, make sure it 
has enough space for 
a comfortable touch. 
+ ADD
Anna Smith
HR Manager
+ ADD
Anna Smith
HR Manager
LESS IS MORE
TEXT LINKS
Our eyes prefer rounded 
corners to sharp edges. 
Make your cards and 
bu!ons more friendly with 
a small border-radius. 
ROUNDED CORNERS
Q
Q
Tables
Graphs
Tables
Graphs
16.
Tables
and Graphs

We are living in the information age. Data is collected all the time and 
about everyone. To be!er understand and process all that information, we 
need to make sure it's clear and readable. 
Tables are a popular choice for showing large sets of data in a structured 
form. It's good to know the basic rules for a readable, user-friendly data 
presentation. 
Even a very dense, complex table can be easy to scan and look good
if we design it the right way. Here's an example of a typical data table in a 
digital product. 
All interface elements that are not data should only be used when 
necessary. Avoid decoration and ornamentation without function. These 
include shadows, backgrounds, icons, colors, and in some cases, even 
divider lines. 
A table is a grid of columns and 
rows, allowing for easy scanning, 
comparing, and analyzing large 
data sets. While designing a table, 
keep in mind that the essential part 
of it is the actual data and not the 
decoration. 
Co!ee
Espresso
S
6,00
Doppio
S+
8,00
Cappuccino
M
10,00
La!e
L
12,00
Flat white
L
12,00
Size
Price
Tables
Tables and Graphs
SHOWING DATA
Data is the most 
important part
of tables, so avoid
unnecessary
decoration.

---

## Sección 22: Core Concepts & Foundations [Entropy: 0.298]

We can present the data in columns or rows, depending on the type and 
amount of information. More complicated data sets can have labels in 
both the rows and the columns for clarity. 
A typical table has two main elements: a label (for either the rows, 
columns, or both) and the actual data (text, numbers, or images).
Label
Data
If our column has a lot of rows or columns, and scrolling is unavoidable, it's 
good to have the label part (column or row) stay on the top layer, with the 
content scrolling under them. It will help the user understand the context 
when moving across the table. 
Label
Label
Data
Data
BUILDING A DATA TABLE
Co!ee
Espresso
S
6,00
Doppio
S+
8,00
Size
Price
Sorting is a process of re-arranging the data in a row or a column based on 
the desired criteria (ascending, descending, etc.). When sorting is possible, 
it's essential always to make that fact clear and visible. The best choice is a 
small arrow showing the sorting direction (either up or down).
In case we have more than the main two sorting options, we can use a 
simple dropdown with all the options to sort the speci!c row or column. 
That intricate sorting pa"ern should only appear when necessary, 
however, as it makes the table a bit harder to use because of the added 
interface complexity. The more options, the longer it will take your users to 
understand the data and take action. 
When a column is de!ning the 
sorting of the entire table, it's good 
to highlight it with either
a bold label or a background
color to make it stand out.
SORTING
Co!ee
Espresso
6,00
Doppio
8,00
Price
Co!ee
Doppio
8,00
Espresso
6,00
Co!ee
Espresso
S
6,00
Doppio
S+
8,00
Cappuccino
M
10,00
La"e
L
12,00
Flat white
L
12,00
Size
Price
Price
Clarity is more 
important than
the number of 
rows you can !t
on one screen.

Table readability comes from a couple of factors like typography, density, 
color use, and separators. Keep only the essentials, remove the rest, 
make sure everything is aligned and have enough space to be easy to 
scan. 
In the example below, we removed column centering, unnecessary (and 
a!ention-grabbing) borders, and simpli"ed the typography to just one 
font with two weights. Adding more whitespace between the rows allows 
for easier scanning and increased readability. 
Coffee
Espresso
S
6,00
Doppio
S+
8,00
Cappucino
M
10,00
La!e
L
12,00
Size
Price
Text data should be le#-aligned (to their labels as well) as we use the Fpa!ern to scan them. Numbers, on the other hand, should nearly always be 
right-aligned. It allows the user to quickly "nd much larger numbers in the 
set, as they would stand out along the le# edge. 
READABILITY
ALIGNMENT
Co!ee
Espresso
S
6,00
Doppio
S+
8,00
Cappuccino
M
10,00
La!e
L
12,00
Size
Price
Co!ee
Espresso
6,00
Doppio
8,00
Price
Co!ee
Espresso
6,00
Doppio
8,00
Price
Try to treat a table cell like a bu!on. That means it should have enough 
space on all sides of the data. The text inside a table cell should have 
enough "breathing room" to be easy to read. A lot of le"-aligned tables are 
very dense, with data super close to the vertical dividers. That dramatically 
decreases readability. 
Despite popular opinions, people are not afraid to scroll. Creating 
a dense, data-heavy table just to #t more rows on one screen is usually not 
the best idea. There are, of course, exceptions in products for professional 
data analysts, but for most people dense = hard to read. While adding 
whitespace to your cells, try not to overdo it. If the space is too big, it also 
decreases the legibility of the data. 
1,500,000.00
1,500,000.00
1,500,000.00
Too small whitespace (high density)
Good whitespace
Too large whitespace
Co$ee
Espresso
Doppio
Cappucino
La!e
Minimal side margin should either come 
from the grid base numbers (8 or 10) or #t 
at least one capital le!er.
With dense, low rows text positioned close to the le" 
border will become hard to read. No le" margin 
makes it a lot harder to scan as our eyes jump from 
text to the border and back.
font height (x)
font-height as 
spacing on both sides 
(x)
WHITESPACE
Co!ee
Espresso
Doppio
Cappuccino
La!e
We can separate rows or columns in three major ways. The most common 
one is, of course, a line separator. Two other types are whitespace based 
separation and cell backgrounds. A background that only a!ects every 
other row is called zebra-stripes. 
Co!ee
Espresso
Doppio
Cappuccino
La"e
Whitespace
Co!ee
Espresso
Doppio
Cappuccino
La"e
Separator (line)
Co!ee
Espresso
Doppio
Cappuccino
La"e
Background
THREE TYPES OF DATA SEPARATORS IN A TABLE
If our table only has a couple of rows or columns, you can easily remove most 
line-separators and backgrounds, and use whitespace. With more complex, 
larger data tables, you may want to consider separating the data with 
horizontal lines, or backgrounds. 
Vertical dividers are rarely necessary. When doing line separation, avoid thick, 
high-contrast edges. Use either light grays or a lighter hue of your primary 
color. 
SEPARATORS
Co!ee
Espresso
Doppio
Cappuccino
Co!ee
Espresso
Doppio
Cappuccino
Co!ee
Espresso
Doppio
Cappuccino
Simple, one or two-column tables should never stretch to !ll the screen width. 
When our columns are too far apart, it dramatically decreases readability. 
Make the table narrower, and you'll be !ne. 
Designing the table width, however, we have to plan for the longest possible 
data entry in a row. Selectively decreasing the font-size in just one cell is 
very bad for legibility and should be avoided. Keep your cells consistent and 
straightforward throughout the entire design. With longer text it's 
completely OK to break it into two (or more) lines.
TABLE WIDTH
Co!ee
Espresso
6,00
Doppio
8,00
Price
Co!ee
Espresso
6,00
Doppio
8,00
Price
Co!ee
Espresso
6,00
Large la"e with caramel syrup
Cappuccino
16,00
10,00
Price
Co!ee
Espresso
6,00
Large la"e with caramel syrup
Cappuccino
16,00
10,00
Price
Co!ee
Espresso
6,00
Large la"e with 
caramel syrup
Cappuccino
16,00
10,00
Price
Photos in data tables are pre!y rare. However, there are times when you 
need to show a list of users or photo uploads, and adding a photo to the cell 
is necessary. 
In that case, always use a thumbnail with enough whitespace. Photos 
should also be centered vertically against all the other cells in the row. In the 
example below, you can see that whitespace + vertical centering makes the 
table a lot more user-friendly (le"). 
If the photo in the table cell is supposed to expand, create a popup with the 
full version that can be activated by clicking or tapping on the thumbnail. 
Avoid using icons in data tables (especially 
decorative ones). All graphical elements capture 
our a!ention while usually being less important 
than the actual data it illustrates. 
PHOTOS IN TABLE CELLS
ICONS IN TABLE CELLS
Students
Grade
Anna Smith
A
B
Jenny Wilkes
Students
Grade
Anna Smith
A
B
Jenny Wilkes
Co!ee
Espresso
Doppio
Cappuccino
La!e
Wider tables work well on desktops, but can be a problem to recreate well 
on a mobile device with a much narrower screen. There are two main ways 
to make mobile tables work. One of them is a simple side-scrolling table 
(remember to keep the labels over the scrolling data). It can cause some 
accessibility issues and is harder to use, but for large data sets, it can be the 
lesser of two evils. 
The other way is turning our entire table into a set of cells - basically
a mini table for each row of our wider counterpart. Each cell should contain 
labels for every data entry, and the layout can become more vertical.

---

## Sección 23: Core Concepts & Foundations [Entropy: 0.31]

This approach works best when the table doesn't have that many columns 
(up to !ve). That way of showing data is more natural on mobile devices, as 
it only allows for vertical scrolling. 
Keep in mind that in this se"ing, it's a bit harder to compare data between 
rows, as they are split into individual cells. 
A wide table with two rows
The same table adjusted
to a smaller screen.
TABLES ON SMALL (MOBILE) SCREENS
Cell
Cell
Avoid using too many colors in your tables. Shades of grey and so! pastels 
should be enough, with an optional darker shade used to highlight the 
active row. When designing a table, ALWAYS start with just shades of grey, 
however, as it keeps the emphasis on the data and not coloring. You can 
add colors in the next step when you feel they're necessary. 
It will help you avoid visual overload and focus on data clarity. You can add 
a subtle color background to the label row, to be"er di#erentiate it from the 
rest of the table, but that's it. 
COLORS
Co!ee
Espresso
S
6,00
Doppio
S+
8,00
Cappuccino
M
10,00
La"e
L
12,00
Flat white
L
12,00
Size
Price
Co!ee
Espresso
S
6,00
Doppio
S+
8,00
Cappuccino
M
10,00
La"e
L
12,00
Flat white
L
12,00
Size
Price
Co!ee
Espresso
S
6,00
Doppio
S+
8,00
Cappuccino
M
10,00
La"e
L
12,00
Flat white
L
12,00
Size
Price
Graphs are another way to show a large amount of data visually. You can 
use them on both websites and mobile apps. Keep in mind that they're 
pre!y tricky to code (or modify), so most graphs we see in products are not 
the best quality. 
A line graph, also known as a line chart, is a type of graph used to compare 
two values (o"en it's growth over time). It's the most popular type of chart, 
and most o"en done in a non-aesthetic way. You can easily bump up the 
visual quality of the line graph by using three simple rules: adjusting the line 
thickness, choosing the right contrast, and #xing the tooltip typography 
and alignment. 
Lines are too thin, which makes everything 
blend together. Tootlip is hard to read due to 
poor contrast and whitespace.
Clear tooltip with enough whitespace, thick, 
contrasting graph lines against much subtler 
informative lines.
LINE GRAPH
A tooltip is one of the essential parts of any graph. It's that small popover 
window showing a precise value that appears once we hover (or tap) on the 
graph line.
TOOLTIP
GRAPHS
150
Just as with data tables, when designing a chart, try to remove all the 
unnecessary clu!er and only keep the essentials. You can do it by 
eliminating the guides (help lines) or making them more subtle. The graph 
itself should be front and center at all times, with the highest contrast and 
visibility. 
Pie-charts or bar-graphs are another popular type of data visualization. 
Keep in mind, that di"erentiating them by color alone can prove di#cult to 
understand by people with visual impairments. 
Unless our graph is interactive (clicking or hovering will visibly show the 
selected part), consider using an additional pa!ern over the color just to be 
safe. 
You can test it by making all your colors greyscale. If you can still see the 
di"erence between the objects, it means they will be more accessible for 
your users. Another good practice is starting to design all types of data 
using just a single color, and di"erentiating them by a pa!ern. You can 
always choose complementary colors at the end. 
FILLED GRAPHS
GRAPHS
Many portfolio shots make their line charts super-smooth for a higher visual 
impact and a more beautiful result. It's good to know how to do them, to 
understand be!er the compromise between real data, and one that looks 
well in presentations. 
It bends the honesty rule (see rules of design) a bit, so try not to overdo it. 
Most real data doesn't "ow in a perfect, symmetrical sine-wave, even if it 
looks fantastic in your Dribbble shot.
To create a chart like this, #rst, create a curve with a couple of up and down 
waves. Then duplicate it and add the three closing sides, making it a full 
shape. (x1,x2,x3)
Add a subtle gradient to the resulting shape, starting from the same color 
as your line, and going down to the same color, but with full transparency. 
You'll end up with a fashionable and good looking (albeit not "real") e$ect. 
x1
x2
x3
"UNREAL" GRAPHS
Forms
ms Form
Forms
Forms
17.
Forms

A form is one of the most common ways a user can interact with a digital 
product. It helps with making a purchase, creating a pro!le, or signing up 
for a newsle"er. Done right can boost a business. Done wrong can break it. 
In simple terms, a form is a set of labels and !elds in which we manually 
enter information, with a bu"on at the end, to save everything in a 
database. 
Conversion is a percentage of completed form entries. Every user that 
"drops o#" before clicking that !nal "save" bu"on is a decrease in our 
conversion rate. 
CONVERSION
We can in$uence conversion with good form design. However, all users and 
target markets are di#erent, and your form needs to be tested extensively 
with real users. In some cases, to make the form work be"er for a speci!c 
set of end-users, you need to bend or outright break some "good design" 
rules. 
ATF - ALWAYS TEST (YOUR) FORMS!
Forms
Forms
INTRODUCTION
r name…
Select option
Your e-mail
*******
Always test your
forms on real
users.

The basic set of elements in a form includes a text !eld, a dropdown, and a 
bu"on. We also have multiple-choice !elds (checkboxes) and single choice 
ones (radio-bu"ons), text-areas for longer text entry. Other types (like sliders) 
are less common.
Header
Single choice (radio-bu"on)
Submit bu"on
Input
Dropdown
Multiple choice (checkboxes)
Multi-line text-!eld
(Textarea)
FORM ELEMENTS
Normal
Active
Unsuccessfull / wrong
Disabled
Completed
A form !eld can have one of !ve possible states. Try to design every form 
element (!eld, checkbox, radio, etc.) in all of those states. The easiest way is 
starting with the generic text-!eld (input) and then move the shadow, 
border, font, and color styles over to the other elements. 
You can set !eld states by either a border-color, by using icons inside (like a 
checkmark for successfully validated !elds), or di"erent text-weights. 
Pay especially great a#ention to designing the negative, invalid states
of your !elds. A short description of what went wrong should go directly 
under each !eld for be#er context and ease of use. You can color that text 
red for increased urgency. 
Avoid having all validations displayed under the entire form, or inside 
popups. Keep your descriptions brief and to the point. It also makes sense to 
show the proper way to !ll the !eld as an example.
FIELD STATES
The entered text is not a valid e-mail address
ann@!#$%^
ann@!#$%^
When designing a form, always start with the humble text-!eld. It's the most 
common form !eld, and you can use it as a visual guide for all the other 
!elds. When designing for mobile devices, keep your placeholder text larger 
than 16 points; otherwise, the device can sometimes zoom the form in, thus 
losing the context. 
Use Title-Case for your labels for faster processing. Labels in UPPERCASE 
take slightly longer to process. 
Label
Error message
Safe area 
(outer margin)
Inner shadow 
(optional)
Inner margin
(padding)
Border
Corner
radius
Background
Placeholder
Space reserved
for validation
messages.
There are two main text-!eld types: The standard one, and one that hides 
the text, which is ideal for password entry. As you type, it only shows the 
current le"er and hides the rest under asterisks or dots. If you're designing 
a password !eld, remember to add a li"le eye-icon at the end so that the 
user can preview the entered password.

---

## Sección 24: Core Concepts & Foundations [Entropy: 0.265]

Standard text-!eld
E-mail
Password
••••••••••••
xG32B-3!va
hello@mail.pl
Password
Password !eld - hidden
Password !eld - shown
TEXT-FIELD TYPES
TEXT-FIELD / INPUT
A Label is a small, explanatory text accompanying the text-!eld.
The main goal for it is to provide a semantic connection to the !eld and 
improve understanding. In most cases, it's simply the description of what we 
require from the user (for example, "enter your email or username" in login 
forms). In HTML, the labels are also processed by screen readers for 
improved accessibility.
Label 2
Label
Label 2
Label
If your form has a lot of !elds, remember to space them out far enough, so 
they don't get confused with each other. Proper spacing is using the capheight (height of the capital le"er) or 1.6 times that value. 
The margin from one text-!eld to the label of the next one should be at least 
twice that height, so it's clear when one !eld ends, and the other begins. 
Label
Label
Cap height (text height)
X value
1.6 * Cap height
2X
LABEL
In some cases, an icon can also work as a label - for example, a magnifying 
glass is o!en used as the only indicator of a search "eld. But this is an 
exception that con"rms the rule of not using icons alone as the labels. Most 
other icons should have a description next to them, to make sure all of your 
users understand what they do. 
USING ICONS AS LABELS
Some additional icons work great with a general label, but don't have to 
be described themselves. These include an eye icon (to show a hidden 
password), a lock (that indicates a password "eld), or an X used to close 
or remove the text-"eld content. 
Using more abstract icons (like in the example on the right) is not 
recommended as they're not clear enough. In general, icon use should be 
minimal inside the form "elds. 
There are two main types of inputs you can use. The standard rectangles, 
according to most studies, are faster processed and be!er understood by 
users, than the Material Design horizontal lines. 
hello@designingui.com
E-mail
E-mail
If you prefer Material style inputs, that's OK. The di"erence between those 
two types is not that big in terms of understanding, especially since Material 
Design has gained so much popularity. But what you should always do is to 
make sure you only use ONE TYPE of inputs in your entire product. Don't 
ever mix Material labels with the classic, rectangular shapes! 
Remember to keep the label font smaller than the text inside the #eld. This 
contrast and size change will help with se!ing the proper hierarchy. 
Good text-#elds should have a slightly lighter shade used for placeholders, 
with an easy to read, contrasting color for the actual data entry. In Material 
Design inputs, the label moves up as you start typing, and the line below 
changes color to indicate it's active. 
E-mail
E-mail
hello@designingui.com
Enter your e-mail
TWO MAIN STYLES
CONSISTENCY
Inner shadows were trendy during the Skeuomorphic era, but are now very 
rare in UI's. Forms are one of the only exceptions, where it can make sense to 
consider an inner shadow. 
Many studies have shown that adding a subtle inner-shadow to a text-!eld 
slightly increases conversion. The change is not dramatic, but it's worth 
mentioning. 
E-mail
E-mail
Adding an outer shadow to a text-!eld, while keeping an outline is a purely 
aesthetic choice and doesn't a"ect conversion in a meaningful way. 
Many "portfolio shots" tend to remove the outline and leave the shadow 
alone. While it can look good visually, there's a signi!cant chance that the 
text !eld will not be understood. 
Try always to use a clear, visible outline in your form elements.
E-mail
E-mail
INNER SHADOW
DROP SHADOW
Just as with bu!on designs, the corner radius can profoundly a"ect the 
readability of our labels. Plan ahead! If you're using a very rounded corner 
#eld (pill-shape), the text is visually $oating away from the edge. This e"ect 
is non-existent with sharp corners of a very small roundness. 
E-mail
Con!rm Email
E-mail
Con!rm E-mail
You can try to solve this problem by moving the text to where the rounding 
stops and becomes a straight line. It's not a perfect solution, and you should 
consider it only for short (1 or 2 #elds) forms. With longer forms, it slows down 
our ability to quickly scan the text.
Avoid centering labels above your form #elds, as it turns the natural
F-pa!ern into a Z-pa!ern that's dramatically slower. The user is expecting 
to follow a smooth path through the #elds, and with centered labels of 
various lengths, there's no pa!ern to follow, as each label starts at a 
di"erent spot. 
E-mail
E-mail
E-mail
E-mail
CORNER RADIUS
Le!-aligned labels
above text-"elds
are the most
user-friendly
option.

Label
Label
A Longer label
A le! aligned text-"eld with a le!-aligned label just above is always the best 
choice for both desktop and mobile applications. It's the easiest to scan, 
understand, and "ll, as our eyes naturally go along the le! edge.
On wider displays, you can try labels on the le! side of your text "elds. One 
way is to place the label le!-aligned at a speci"c distance from the "eld.
A slightly be#er approach is right, aligning the labels with a set margin to 
the input box. The main downside of this approach is that it's a lot harder to 
read a jagged le!-edge, and with various label widths, that's the most likely 
outcome. Only use this if labels above the "elds are, for some reason, 
impossible. 
In rare cases, a placeholder text serving as a label can work (search bar), 
but avoid using it extensively. When entering the "eld to type, the label 
disappears, and the user can lose context. This approach can be a big 
problem with longer forms. 
LABELS AND TEXT-FIELD ALIGNMENT
Label
Label
Single column forms convert a lot be!er than multi-column ones because 
you only have a single path to follow with your eyes, instead of jumping 
between blocks. 
The example on the le" will work a lot be!er 
because it only has a top-to-bo!om scan line 
to follow. 
Keep forms rather narrow. The best range is somewhere around 320 and 
500p wide (mobile and desktop). The wider the #elds, the longer it takes to 
process them - keep it simple! 
Longer (6 #elds and up) forms are be!er divided into separate pages, with 
clear information on which step you currently are. 
Don't mind the empty spaces on the sides of your form. Don't #ll it with 
placeholder images or decoration. Leave it empty! It's great for giving the 
form maximum a!ention and the best focus. 
SINGLE VS MULTI COLUMN FORMS
Single column forms
convert much be!er
and are easier 
to use.

---

## Sección 25: Core Concepts & Foundations [Entropy: 0.265]

If you can anticipate the typical length of the user-entered text, try to design 
the !elds to match that. Concise information like age or area / zip-codes 
should use shorter !elds to indicate the amount of data they require. 
That way, the length of the !eld itself is helping the user enter the right 
information. 
E-mail
enter your email
_ _ - _ _ _
Area code (5 digits XX-YYY)
E-mail
enter your email
Area code
Try to make your !elds self-explanatory. If you need any additional 
description, try adding it to the label. 
If it's longer, you can add it under a tooltip icon , but that approach is not 
the most optimal one, as the user can miss it and never activate the tooltip. 
In some cases (like the Area code), we can suggest the right format using 
a placeholder, or a short example like "XX-YYY." The user doesn't even need 
to add the hyphen, as it can directly jump to the third number a"er entering 
the !rst two. 
FIELD WIDTH AND CONTEXT
Dropdowns are another very popular form element. They allow for a single 
choice from a longer list, that expands on click. The primary indicator that 
a !eld is a dropdown is usually a down-arrow or chevron on the right side.
It's worth mentioning that an implemented dropdown will have an enforced 
system se"ing for how it looks. It means it will look di#erently on a Mac 
laptop, a Windows-based machine, or an Android Tablet. There are two 
ways of keeping consistency - either coding all our forms using only the 
platform native components or designing and implementing our very own 
style for all of them. 
Remember, that styling all !elds on your own also requires some additional 
development work, but the result is o$en well worth it. 
A$er our dropdown box expands, we 
need to show the selected option clearly. 
Try using a contrasting background as 
the selection, as just changing the text 
color can o$en not be enough. When 
designing an "open" dropdown, 
remember to rotate your arrow 180 
degrees, which indicated that clicking 
again will fold it. 
Beginner
Skill level
Beginner
Skill level
Standard, generic system dropdown.
Custom dropdown, requires additional coding.
Pick one
Beginner
One design workshop
Intermediate
Advanced
Expert
Skill level
DROPDOWN
Very long dropdown lists are particularly tricky to use, as they require a lot of 
scrolling to !nd and pick the right choice. You can help your users by adding 
a search/!lter box at the top of your dropdown and highlighting the most 
popular options at the top of your list. 
For example, if most of your users come from the United States, you can 
place it !rst on the list, with all the other countries sorted alphabetically. 
That way, most of your users won't have to scroll all the way to the U. 
If your dropdown has !ve options or less, consider changing it into radio 
bu"ons (or standard bu"ons that act as radio-bu"ons like in the example 
below).
Skill level
Low
Medium
High
Skill level
Low
Medium
High
Enter to search
United States
Poland
Andorra
Angola
Afghanistan
Country
Most popular
Full list
Po
French Polynesia
Poland
Country
It's good to indicate
that you can scroll the
dropdown list.
LONG DROPDOWN LISTS
SHORT DROPDOWN LISTS
Very short (3-5 item) 
dropdowns will work
a lot be!er as a set of
radio bu!ons

While we can go wild with dropdown designs for desktops, keep in mind 
that on mobile devices, it's best to use the native picker instead. It's usually 
some kind of a spinner-wheel that comes out from the bo!om of the screen. 
It's a more natural and a lot faster way to pick an option from a long list on 
a touch-enabled device. 
Remember that both iOS and Android display the pickers di"erently. 
Try not to modify it, however, as people are already used to this pa!ern and 
understand it well. Having a custom version can create unnecessary 
confusion. 
Choose a month
January 2020
March 2020
February 2020
December 2019
Pick one
Month
Classic iOS picker should always be used on 
phones instead of a web-immitation dropdown.
Enforcing a desktop style web dropdown on a mobile 
device is cumbersome and should be avoided.
DROPDOWNS ON PHONES
Checkbox, or "tick," has three primary states: normal, selected, and nested, 
which allows for enabling some, or all checkboxes nested under one name. 
In general, checkboxes are a multiple-choice type !eld, so activating one, 
should not a"ect any other checkboxes on the screen. 
Showing the checkbox in an enabled state means two things: the 
background needs to be a color !ll (usually the accent color), and there 
should be a checkmark (V) inside. Just as with icons on bu#ons, you need to 
have enough space inside the square shape for the icon to look good. Keep 
the check icon consistent with all the other icons in your design (stroke-width, 
color, shape, roundness, etc.) 
Option 2
Option 1
Nested (parent)
Option 2
Option 1
Nested (parent)
Normal
Selected
Inner margin
(padding)
Corner
radius
Color or Gradient
Color and 
shape of
the icon
Shadow (optional)
Safe area (margin)
Outline
CHECKBOXES AND SWITCHES
DESIGNING A CHECKBOX
Just as with all the other form elements, if we want the checkboxes to be 
consistent with the rest of our design, we need to apply a custom style to 
them. If we don't, they will look di!erent on every OS, as the browser will 
display a generic system version instead. The most common is a simple, 
grey gradient that may not "t our product. 
When the "rst iPhone came out, another version of the checkbox became 
popular - the Switch. It's still a multiple-choice, separate-entity, so toggling 
one switch, shouldn't modify the state of others. Try to di!erentiate the ON 
state by changing the color of the moving object. The switch can either be 
fully rounded, slightly rounded, or use sharp corners, as long as it's 
consistent with all your other form styles. 
One of the main di!erences between checkboxes and switches is the label 
placement. Checkboxes are usually on the le# side of the label, while the 
switches are generally on the right. They also di!er in how their action 
happens either instantly or on the con"rmation.
I accept the privacy policy
Sign me up for the newsle!er
Enable Dark Mode
Display optional "elds
A generic, system 
checkbox.
A styled, custom checkbox can have a 
background "ll (or a gradient) and a 
custom icon.
O!
On
O!
On
CONSISTENCY
Checkboxes are usually con"rmed (and take 
e!ect) a#er you click on the main CTA.
The switch action should happen right a#er it 
changes position, without the need to click on 
a con"rmation bu$on.
If you have more than 2 or 3 options to choose from, it's be!er to use 
checkboxes instead of switches. We also should use checkboxes when all 
the options belong to the same overall group. 
Cats
Choose your favorite animals
Choose your favorite animals
Dogs
Cows
Squirrels
Cats
Dogs
Cows
Squirrels
Switches are be!er when they're individual, and they do a speci"c, instant 
action each. It means that changing the switch state happens in real-time, 
and we o#en don't need to con"rm it with a bu!on. 
On mobile devices, both the switches and checkboxes need to have an 
active zone around them, that's at least 44p in size. The area should also 
include the label and description when possible. You should do it the same 
way on desktops, but the area can be a li!le smaller (around 30p).
Enable dark mode
Disable dark mode
The active (clickable) area should be larger than the actual 
box and contain the label as well for ease of use.
Dog
WHEN TO USE SWITCHES?
SIZE MATTERS
Radio bu!ons are a way to choose one (and only one) option from a short 
(2-4 item) list. If you select one of the options, it automatically deselects the 
one chosen previously. If you have more than four options, consider using 
a dropdown.

---

## Sección 26: Core Concepts & Foundations [Entropy: 0.25]

Both checkboxes and radio bu!ons work best when they're aligned 
vertically, one a"er another. The action that they describe should happen 
a"er you submit the entire form. 
You can auto-select the most popular option, so the user can leave it or 
change it at will. If you're thinking of using a dropdown, but only have
a shortlist of options, consider a radio bu!on instead.
Obviously ;-)
Do you have the book?
No
I don't know
Obviously ;-)
Do you have the book?
No
I don't know
The name "radio bu!on" comes from actual car radios from the past. The 
physical bu!ons on these devices worked in a way that pressing one was 
pushing out all the others. 
RADIO BUTTONS
FUN FACT
Radio bu!ons are used to exclusively select just one answer from many. With those types
of questions checkboxes are the wrong choice, and you should always use radio-bu!ons.
The active area should be large enough, so it's easy to both click and tap to 
activate the radio bu!on. Just as with checkboxes, the label itself should 
also be clickable. 
YES
Do you have the book?
No
I don't know
One of the main di"erences between checkboxes and radio-bu!ons is also 
the fact that we should avoid nesting radio-bu!ons. That concept works 
a lot be!er for checkboxes. 
Radio bu!ons can also exist in a more friendly, bu!on form. It's usually best 
to keep the oval "radio" area on the le# side of the bu!on, but even bu!ons 
without it can work well. 
It's especially $t for mobile devices, where it's a lot easier to select it, as the 
perceived area is much larger than a standard radio bu!on. 
Option 2
Option 1
Nested (Parent)
Option 2
Option 1
Nested (Parent)
The active (clickable) area should be big enough
and cover the label as well.
Yes
RADIO BUTTONS
A slider is a more visual way of choosing a number value. It usually snaps to 
a couple of most common values, and rarely allows for a full choice from a 
more extensive set. You can use it instead of a dropdown if there are only a 
couple of options. 
Clicking anywhere on the slider should move the indicator to that spot, or 
the closest approximated value. The draggable indicator should always be 
big enough to target with either your !nger or the cursor comfortably. On 
mobile devices, you can create a teardrop-shaped tooltip that shows the 
current value while dragging the slider, so our !nger does not cover it.
The main rule for fantastic sliders is 
clarity and ease of use. Dragging a 
small, easy to miss element can be 
a frustrating ordeal for the user. 
Avoid using sliders if they have less 
than four possible values. In cases 
like that, it's best to replace them 
with a radio bu"on set. 
Classic slider
Range slider
8
150
SLIDERS
Choosing the border and !ll styles, keep in mind, to use them consistently 
across the entire form. Starting with the text-!eld and its border, use the 
same stroke width and color in all the following !elds you design. 
Before you start building the actual forms, try to create all the necessary 
components !rst, on a separate artboard, to !nd inconsistencies and !x 
them quickly. 
E-mail
Please enter your e-mail…
Comments
Choose
Years of experience
UI + UX
Interests
Research
Yes
Do you have the book?
No
Skill level
Low
Mid
High
Cancel
Save
CONSISTENT STYLES
255

While creating a form, remember the rule of "less is more." It's even more 
relevant when it comes to good form design. If a !eld isn't necessary, don't 
add it - it will positively a"ect your conversion rate: the fewer !elds, the 
be#er. 
Please enter your e-mail…
E-mail
Favorite color (optional)
Please enter your e-mail…
E-mail *
Favorite color
The best forms should only have one bu#on. It will make it a lot easier and 
frictionless to take that !nal submi#ing action. If, for some reason, you need 
more than one bu#on, always di"erentiate them highlighting the most 
important one. The user needs to know which bu#on to activate right away - 
without thinking. 
Cancel
Log in
Cancel
Log in
If you need the non-essential !elds (optional) in your form, try to avoid the "red 
asterisk" to signify the necessary ones. As your form should mostly be about 
the required !elds, it's a lot be#er only to inform the users when a !eld is 
optional. Keep the necessary !elds distraction-free. 
GOOD IDEAS
A good form
should only have
the essential
!elds.

Our call to action bu!on should precisely state what is going to happen 
when the user activates it. Avoid labels like "Next" or "Forward" when 
possible. 
Cancel
Log in
Stay
Next
If your form is quite long, and you don't want to break it into separate pages, 
try to segment them by grouping similar "elds. It will make it easier to 
understand that the form is a combination of a couple of overall concepts. 
GOOD IDEAS
Enter your e-mail…
E-mail
Login info
Personal info
Enter your password
Password
Email
Password
Your name
DD/MM/YYYY
Enter your name
Your date of birth (DD/MM/YYYY)
Your name
Your date of birth
Split long forms into cohesive, separate steps. Remember to inform your user 
on their progress with a % value, a number of steps, or a slider. They need to 
be aware of where they are in the form !lling process at all times.
Use animation (but subtle!) and microinteractions to give your form
a memorable feel and make it more fun to use. Changing a checkbox state 
doesn't have to be switching an image. It can bounce with a nice, small 
transition. 
Forms don't have to be boring. You can create an animated character that 
follows the active !eld with its gaze and smiles when the user clicks submit. 
There are no limits for creative ideas, but the form elements themselves 
need to be predictable at all times. 
Dalej
Personal information 
Step 1 of 5
Personal information
Personal information 
20%
GOOD IDEAS
ANIMATION AND MICROINTERACTIONS
BE CREATIVE!
If you're designing a form for a mobile device, remember to use the right 
keyboards. When the email !elds are active, a keyboard with a quickly 
accessible @ sign should appear. If, in a particular !eld, the user can only 
enter numbers, use a number pad. 
Keep that fact in mind while prototyping your forms. Show the di"erence 
between keyboards and !eld types to your developers so that they can pick 
the right one in code. Of course, on desktops, we don't use an onscreen 
keyboard (in most cases), so these rules only a"ect mobile designs. 
KEYBOARDS
Bank transfer
$
4
2
8
.
6
260

---

## Sección 27: Core Concepts & Foundations [Entropy: 0.355]

Modale
opups
Modale
opups
18.
Modals &
Popups

There are a couple of modules that appear above our interface, showing 
additional actions or information. They can appear on their own (not 
recommended), or be a result of a speci!c user action. 
The most common types of these modules are popups, overlays, and action 
sheets. The !rst two usually have a small X in their top right corner to close 
them. Clicking or tapping outside the window should yield the same result. 
Action sheets are a bit di"erent - they usually don't have an X, but rather
a cancel action near the bo#om. You can also swipe them away (usually 
downwards). 
Popup / Alert
Overlay
Action sheet
Popups work best on desktops, overlays are pre#y universal, while actionsheets are mostly a mobile pa#ern. In general, however, using any of these 
modules should be your last resort. They can be extremely frustrating for 
your users. 
Modal
Modals & Popups
THE BASICS
Popups are the most popular type of top-level prompts. The main types of 
popups include a success (or failure), con!rmation (a question, that you 
answer), and signup (for a newsle"er).
A typical popup is a window with a title, description (optional), at least one 
bu"on, and an X to close it. Clicking outside the area should also result in 
closing the popup. When the only action available is closing the pop-up, 
ALWAYS use both the X and the bu"on to do it. 
Con!rmation popup
UPDATE
CANCEL
Update your pro!le
UPDATE
CANCEL
Update your pro!le
Do you really want to update your 
pro!le with new information? This action 
cannot be reverted!
Do you really want to update your pro!le 
with new information? This action 
cannot be reverted!
Success noti!cation popup
CLOSE
Congratulations!
You have successfully signed up
for the discount! Check your
e-mail for details!
Padding (or inner 
margin)
By darkening (slightly) the 
background under the 
popup, you improve 
readability.
Background:
Color or Gradient
The shadow shows that our popup is a 
top layer, and the rest of the interface is 
underneath.
POPUPS
BUILDING A POPUP
You can make the popup more visible by adding an overlay to the 
background under it. In most cases, it's a dark hue with about 70% opacity 
value. Having it slightly transparent allows the user to be still able to discern 
the context of the entire screen. In other words, they understand and 
remember where the popup stands in the interface. 
You can use full black (#000000) at about 70-80% opacity, or a dark shade 
of your primary color for a more consistent result. In any case, make sure 
there's enough contrast between the popup and your background while 
keeping the screen under at least slightly visible. 
There's nothing under the 
pop-up, so the user can lose 
context.
Some of the interface 
underneath is visible, so the 
user can see the context.
BACKGROUND OVERLAY
Popups don't need to be u!erly frustrating! Remember to make it readable, 
clear, and have all the active elements easy to click. 
Large clickable area
Too small clickable area
Your closing X bu!on should always be the right size, have enough contrast, 
and a large enough active (clickable) area. A good idea is simply creating 
the X as a bu!on with a background, so it's easy to understand the clickable 
area. 
That clickable area (blue square) should always be larger than the X itself. 
Good values for the active region are at least 44x44 points for mobile and 
32x32 for desktop, while the X itself can be smaller than that.
One of the worst things you can do is creating a super-small X bu!on with 
very low contrast. If the active area is also small, your users need to be very 
precise while clicking to achieve the desired action. If clicking outside the 
popup doesn't close it, you end up with one of the most frustrating UI 
mistakes ever. 
Avoid placing your X bu!on right near the edge of the popup window.
It needs enough whitespace around it to be comfortably visible. 
GOOD IDEAS
As said before, even if your X is clear and accessible, you should always 
use an additional closing bu!on at the bo!om of your popup window. 
CLOSE
Congratulations!
You have successfully signed up
for the discount! Check your
e-mail for details!
Congratulations!
You have successfully signed up
for the discount! Check your
e-mail for details!
If you're using more than one bu!on, make sure to di"erentiate the main 
action from the secondary one. It will help your users quickly understand the 
hierarchy and pick the desired outcome. A widespread mistake is the cancel 
bu!on having the same "visual weight" as the main Call to Action. 
UPDATE
CANCEL
Update your pro!le
Do you really want to update your pro#le 
with new information? This action 
cannot be reverted!
UPDATE
CANCEL
Update your pro!le
Do you really want to update your pro#le 
with new information? This action 
cannot be reverted!
GOOD IDEAS
CLEAR ACTION HIERARCHY
Design your popups with the "mobile-!rst" approach, as it helps with 
picking the right widths and bu"on sizes that work across all devices. 
Use short, precise messages in your popups. Avoid using more than two 
sentences of description and keep your bu"on labels explicit. Don't use 
"Next" or "OK" on the bu"ons. The labels should always describe the action 
that happens when you click. 
At all costs, avoid automatic popups (either on entry or while trying to exit 
the website). For a pop-up to appear, there needs to be a conscious action 
taken by the user.
GOOD IDEAS
LANGUAGE
POPUPS SHOULD APPEAR DUE TO USER ACTION
If you design your popups to !t on a mobile devices, they 
will work just as well on larger screens.
Popups with sign-up forms are the result of statistics meeting lousy user 
experience. The users don't expect these popups, so most of them 
instinctively close the window. While it may yield a small number of 
subscribers, they o!en convince more users NOT to trust your brand. 
Consider having a sign-up form on the page itself, without resorting to 
popups. Doing that will help you get genuinely interested users to sign-up. 
Even if statistics are showing a single-digit percentage increase in signups, the unmeasurable negative e"ect can have a much stronger impact 
on your brand. 
Do you know what can also help with ge#ing more subscribers? Quality 
content! Make things so well that people will be lining up to sign-up to 
receive it! 
POPUP FORMS
SIGN UP NOW
Sign up for our newsle!er
Get weekly emails with discounts
and selected news!
Your email
“
The X is the most 
popular element 
your users
will click.

---

## Sección 28: Core Concepts & Foundations [Entropy: 0.31]

Overlays are small panels a!ached to the edge of the screen - usually to 
the bo!om. They are a good choice for non-essential information or 
agreements. The most popular overlay is the cookie information prompt, 
traditionally positioned at the bo!om of the display. Just as with popups, 
you can close an overlay by clicking the X, or one of the bu!ons on it. 
Most of the good popup practices regarding readability, spacing, and 
active item sizes apply to overlays as well. The main di"erence is that 
clicking outside the overlay area does not close the window. 
When using overlay prompts, avoid the darkening of the rest of the 
interface, and have a clear, accessible way of minimizing the window. 
OVERLAYS
Overlays should have a clear indication that they're above the rest of the UI. 
You can do it with a subtle shadow or a contrasting border. Make your 
bu!ons big enough for both desktop and mobile and keep proper 
whitespace for readability. 
If you're using a generic overlay (like a third-party cookie prompt), the 
spacings, fonts, and bu!ons can be very inconsistent with the rest of your UI. 
If you're designing an overlay for desktop use, remember to keep your 
content between 600 and 800 pixels wide. You can leave the sides empty, 
but don't stretch the content to "t your screen above 800 pixels. Long 
lines of text are especially challenging to read. 
OVERLAYS
CONTENT WIDTH
The shadow helps to show that the overlay 
is above the rest of the page.
Bu!ons are using the general app style.
Inconsistent bu!ons and no shadow make 
this overlay harder to use.
An expanding overlay is usually a small stripe a!ached to the side of the 
browser window. On activation, it expands into a larger overlay with 
either information or options. It can be a simple contact form, a chatbot, 
or a quick share action for social media. While it saves space, it also 
obscures the actions hidden within, so try not to overuse this pa!ern. One 
per page is more than enough. 
Hiding content from the user is not the optimal choice, so consider 
whether you need an expanding overlay in your project. Because of its 
hidden nature, some users may never expand it and use the options 
hidden within. Avoid pu!ing essential navigation or info in one of these, 
and only use them if your page is already complex. 
As this element expands, it's good
to show it using a direction arrow. On 
click, the indicator should turn around to 
show what happens when you click 
again. 
The arrow itself should, of course, be 
clickable, but it's more of a suggestion for 
action, so have the entire heading of the 
overlay clickable. 
GET IN TOUCH
hey@designingui.com
LinkedIn
www.designingui.com
666 777 888
GET IN TOUCH
EXPANDING OVERLAYS
Action sheets are a natively mobile component that usually comes out from 
the bo!om of the screen. It can be a set of "lters, display options, sharing, or 
sorting. The most common use is the share-sheet, which allows the user to 
pick a way to share content online. 
Actions inside action-sheets can be a set of vertically placed bu!ons
or switches. 
If you're designing your own action-sheet (instead of using a native one), 
remember to apply high enough contrast, clear labels, and an overall 
readable, hierarchical structure. 
It can also help to highlight the most popular action. 
Choose a method
8
Pick a range
Se!ings
ACTION SHEETS
If your action-sheet is nearly, or completely fullscreen, you can consider 
adding an X bu!on in the top right corner. If it only takes up to threequarters of the screen, consider communicating its swipeable nature by 
adding a ""at-arrow" or a horizontal line on top. 
One of the essential features of action sheets is the transition that they use 
to appear. They should visibly slide-in from the bo!om, so the user 
understands it's possible to slide/swipe them back down. 
That animation gives your users the context on how to use the action sheet 
right away.
Action-sheets can also have several levels of visibility. They can show the 
most popular actions #rst, and expand more by dragging the card up. 
Remember to design every state of an action-sheet if you're making a 
completely custom component. 
ACTION SHEETS
CLEAR INTERACTION
Lightboxes are a type of popup that allows for displaying a photo (or video) 
gallery. It's an excellent approach to showcase larger photos in a distractionfree way. Just as with standard popups, make sure you darken the rest of the 
interface for a be!er viewing experience. Make all the navigation bu!ons 
clear and visible (like scrolling arrows, thumbnails, or the closing X). 
Pay special a!ention to your lightbox navigation. It should always allow for 
all of the three possible methods - clicking on arrow bu!ons, touch gestures, 
and keyboard arrows. Don't stick to just one navigation method - 
implement them all to cater to all of your users. 
Cursor-based navigation
Keyboard navigation
Touch navigation
LIGHTBOX
EASY TO USE NAVIGATION
A tooltip is a small, informative, user-activated pop-over. In most cases, it 
appears when clicking on a question mark sign or a a li!le icon. 
In rare instances, tooltips can also have modal-like qualities, including some 
simple actions (like add this person to friends). 
It can appear on click (or tap) or hover, with the "rst option being the be!er 
one here. 
A tooltip is a rectangular shape with a small triangle pointing towards the 
object that activated it. Keep enough whitespace inside your tooltips for the 
text to be readable and make sure it has the proper contrast. The arrow/
triangle shape can point in any direction or can depend on where the 
tooltip appears. That way, it can automatically adjust to the amount of 
space it has to display, and won't end up behind the screen. 
Michal
A tooltip can appear a#er clicking on an icon, bu!on, link, slider, or a chart. 
When possible, try to display the helpful information inline, without the need 
for a tooltip in the "rst place. 
Inner margin 
(padding)
Readable numbers
high contrast
Border and shadow
TOOLTIPS
Most tooltips are informative (helpful hints) and non-interactive. If you plan 
to add an action to your tooltip, try to keep it as simple as possible - one 
large enough bu!on will be enough. For more complicated interactions, 
consider replacing the tooltip with a modal or a popup. 
Tooltips using a mouse-over function to activate them won't work well on 
a mobile device. While designing for touch screens, try to avoid tooltips 
altogether and display the helpful hints inline with your content. 
Make your tooltips clear, visible, and 
readable. Apply the same rule you use
to design popups and bu!ons. 
Avoid using long, wordy descriptions inside 
tooltips. Keep them short and
to the point. 
Anna Smith
Follow
Anna Smith
TOOLTIPS
TOOLTIPS ON MOBILE DEVICES
Be cautious about using anything that jumps out at the user. Consider 
popups and tooltips as your last resort. Most of the overlaid-windows are 
simply unnatural and annoying. If possible, design your interactions without 
them. The exception here is the mobile action-sheet, which the users 
understand well and is the natural choice for actions like sharing content.
When designing an overlay or a popup, remember to keep the readability 
high, proper whitespace, and, most importantly, the size of your active 
elements. Too small, hard to click X-bu!on can frustrate your user enough 
even to leave your product altogether. 
Keep the design consistent with the rest of your project. If your popup looks 
completely di"erent than the rest of your UI, the user may think it came 
from an external source and grow suspicious.

---

## Sección 29: Core Concepts & Foundations [Entropy: 0.28]

Sign up for our newsle!er
Get weekly emails with discounts
and selected news!
Enter your e-mail
E-mail
Sign up
Get we
Enter your
E-mail
p for our newsle!er
weekly emails with discounts
and selected news!
ur e-mail
SIGN UP NOW
Sign up for our newsle!er
Get weekly emails with discounts
and selected news!
Enter your e-mail
E-mail
SIGN UP N
Sign up for our n
Get weekly emails w
and selected
Enter your e-mail
E-mail
NOW
newsle!er
swith discounts
ed news!
WRAP-UP
Main rule of popups
is to only use them
when absolutely
unavoidable.

Navig
gation
Navig
gation
19.
Navigation

Navigation is an essential part of the User Interface. Even the smallest 
problems with how it works can lead to massive user drop-o!s. Hard to 
use, or faulty navigation can make it nearly impossible to use your app or 
website. That's why it's crucial to design your navigation with a lot of 
a"ention to detail. There are three main types of navigation - visible, 
hidden, and contextual.
Visible - It's always on the screen and (in most cases) the content scrolls 
underneath it. In most cases, it's a set of tabs, with the currently active one 
highlighted. 
Hidden - This navigation pa"ern relies on a hidden menu that is not visible 
before it's activated. The most common example is the "hamburger menu." 
Contextual - This includes active links or bu"ons within the object itself. The 
best example of this is clickable categories in the product listing that take 
you to an additional page from within the product page. 
Hidden
Visible
Contextual
Navig
Navigation
THE BASICS
All menu items
need to be big enough
to comfortably touch
with your !nger.

Visible navigation should always be your starting point while designing 
menus. It's considered the best option for most interfaces, both web and 
mobile. Most o!en, visible navigation is a set of text-links, bu"ons, icons, 
or a mix of these elements (like icons with a text label).
The best spot to place the navigation bar on mobile devices is at the 
bo"om of the screen, so it's easily accessible with one hand. 
Most consumer products should try to #t their main navigation on mobile 
into up to #ve main categories. You can go as high as seven on desktops. 
Try not to exceed that number, however, as it's the sweet spot for ease of 
use. Special, professional products may have to break the rule, but most of 
the rest should be able to simplify their nav pa"erns. 
Tab Bar is the o$cial name for iOS bo"om navigation, but you can use it as 
a general description of bo"om tabs. The most popular version is a set of 
horizontally distributed icons with small labels under them.
You can design a Tab Bar without the labels, but in general, it's best to 
include them. Not all users interpret icons the same way, so adding a label 
makes it clear what the menu items are. That is essential for all nonstandard icons. Your tabs also need to be the right size. If you're using icons 
alone, the minimum height of the bo"om bar on mobile should be 44 
points. If you're adding labels, start at around 60 points. 
min. 44p
VISIBLE NAVIGATION
TAB BAR
When designing the tab bar, start by dividing your screen width by the 
number of tabs and create a rectangle guideline for each one. With !ve 
tabs, you create !ve rectangles, each 1/5th the width of the screen. Choose 
a red !ll and a slightly di"erent opacity for each one. That will help with 
icon and text alignment, and you can hide the guides when all is set and 
done. You should end up with something like this: 
Do the same with three tabs, se#ing a di"erent opacity for each rectangle 
so that you can easily distinguish where they begin and end. If your screen 
width doesn't perfectly divide into the desired number of tabs (and we 
don't want half-pixels ;) try adding a 1px line between the tabs. You'll end up 
with one less divider line, than the number of tabs you need. With three 
tabs, it amounts to two one-pixel gaps. 
80%
Each element is 1/5 the screen width.
Opacity levels
60%
40%
20%
10%
80%
Each element is a third of the screen width. 
Each element is 1/3 of the screen width with 2 pixels substracted.
60%
40%
TAB WIDTH
Once you have all your tabs as rectangles, group them and name that 
group "tab grid." It will be a huge help when aligning your actual tabs. When 
grouped, it's also easy to turn it on and o! when needed. 
The next step is se"ing the safe space from the top and bo"om edge of 
your tabs. You can start with your grid base-value (8 or 10) and use that 
space as your margin. It means neither text nor the icons can go into those 
areas and have to #t between them. 
Now it's time to add your icons and labels. Make sure that the icon safe 
space is around twice the size of your grid base number (2X). You can align 
the label baseline to the bo"om safe space. Test the vertical alignment by 
adding grid lines through the center of your red rectangles and make sure 
everything is in the right place. 
x
x
Label
Label
Label
Label
Label
Label
Label
Label
Label
Label
x
2x
TAB WIDTH
The selected (active) tab should be instantly recognizable. You can do
a background !ll, change the font (weight or color), modify the icon color or 
size, or underline the entire tab. 
The di"erence between the regular tabs and the selected one needs to be 
very pronounced. If they're too similar, it can be very confusing for your 
users. 
If you want to keep your app minimal, you can try going with the icons 
alone. The bene!t here is gaining some vertical screen space (which on 
mobile is quite precious) and having a cleaner looking design. 
However, most users may feel lost at !rst, not understanding what the menu 
items are. 
Label
Label
Label
Chats
News
Photos
Favorites
Pro!le
ACTIVE TAB
ICON ONLY TAB BARS
Text tabs are typically placed at the top of the screen. They're an easy way 
to switch categories, and when they don't !t the screen, you can scroll them 
le" and right (in mobile apps).
Designing this kind of navigation pa#ern, start by creating a minimum 
height of 44p for mobile and 24-32p for desktop. Building each tab, treat it 
like it's an invisible bu#on with a so"-grid applied. That means you need to 
create a safe (clickable) area, a selected, and an active state. 
Even though the tab itself is just a line of text, your clickable area should 
always be bigger and include enough space on each side of your link. 
While designing all the possible states, keep in mind to di$erentiate the 
active, neutral, and selected states by more than just a di$erent text color. 
Without relying on color alone, your tabs will be accessible to all of your 
users. You can use underline or a !lled background for best results. 
Pro!le
Pro!le
Pro!le
Pro!le
Active area
Neutral state
Active state
Selected state
Pro!le
Selected
Pro!le
Neutral
Pro!le
Selected
Pro!le
Neutral
TEXT BASED TABS
Most desktop-based tab bars can use a so!-grid to align tabs of various 
lengths. You can start by applying your grid base number (8 or 10) on each 
side of your text link. It means the space between two links will be double 
that number. Try to apply the same rule to the areas above and below the 
text. You can use temporary grid-boxes for easy tab alignment.
With an 8-point grid, the spaces are 8 and 16. With a 10-point grid, they'd be 
10 and 20. 
Avoid using very thin (light, ultra-light, or thin) fonts in your text tabs. Many 
displays still use lower pixel densities, so anti-aliasing these fonts can result 
in them being almost transparent, and thus barely visible.

---

## Sección 30: Core Concepts & Foundations [Entropy: 0.265]

Navigation is all about clarity and readability, so start with font styles of 
regular and thicker. 
First Tab
Second, Longer Tab
First Tab
Second, Longer Tab
TEXT BASED TABS ON LARGER SCREENS
First Tab 9
Second Longer Tab
Third Tab
Third Tab
First Tab 9
Second Longer Tab
8
16
8
While designing for mobile, you can use a so! grid, or if you already know 
your tabs, you can divide the screen proportionally. Avoid having more than 
three text-tabs on one screen on a mobile device. If you have more, make 
them scrollable. 
The easiest way to design mobile tabs is to create the same helper 
rectangles, and adding a grid-based internal margin inside them (padding). 
If you need more than three tabs, make sure that the last one is slightly cuto" by the edge of the screen. That will serve as a suggestion to your user, 
that it's possible to scroll the tabs. Keep the font size consistent with the rest 
of your product and never make individual tabs use a smaller font (for 
example, ones that are longer).
Your pro!le
Friends
Even
80%
60%
40%
44
Maximum area for your text
TEXT BASED TABS ON SMALL SCREENS
Your pro!le
Friends
Events
Designing a menu that's 
longer than your screen, 
always have the last tab
partially visible from 
behind the screen. 
It suggests scrolling.

You can use side navigation (sidebar) for longer tab lists. This pa!ern comes 
in handy if you have a lot of tabs, o"en with a nested structure. Try to avoid 
more than three levels of nesting for be!er readability. 
When designing a sidebar, you can easily fall into the trap of trying to #t as 
many elements as possible on one screen (above the fold.) When your text is 
so densely stacked, it takes longer to scan and understand. Your users can 
also accidentally click on the wrong tab because they're so close together. 
Just as with other tabs, create a helper-rectangle for each line of text. It will 
help you keep your spacing consistent and a scannable, clickable structure. 
You can experiment with light divider lines between your tabs if you want to 
make the hierarchy more prominent. Otherwise, a big enough line-height 
will su$ce. 
Allowed pets
Hotel services
Extra services
Dogs
Cats
Large dogs
Small dogs
Allowed pets
Hotel services
Extra services
Dogs
Cats
Large dogs
Small dogs
Hotel services
Allowed pets
Extra services
Dogs
Cats
Large dogs
Small dogs
SIDEBARS
A !oating action menu is a way to save space and provide quick actions 
available from anywhere in an app. Most o"en, it's a circular bu#on in the 
bo#om right corner of the screen that expands on touch. 
This pa#ern came to life with Android Material Design, but it quickly 
became popular on iOS as well. 
Menu before activation
Active, expanded menu
A plus sign rotated 45-degrees
suggest you can close the menu the 
same way you opened it.
Experiment with the right !oating 
action menu layout.
Remember to set the safe space for your icons inside the circular 
bu#on. The best way is to use the grid-base number (8 or 10) and 
create a guiding circle with that grid number margin on every 
side. Then $t the icon inside that smaller oval. 
The most popular version of this menu is a circular bu#on with a plus sign 
inside. When expanding, remember to rotate the plus sign 45 degrees to 
turn it into an X. That will quickly tell your user that touching it again will 
close the menu. The resulting fan of options can expand vertically, 
horizontally, or around the bu#on. 
HIDDEN NAVIGATION - FLOATING ACTION
The hamburger menu is a hidden navigation drawer that expands when 
the user pushes a three-line icon. It became popular with the !rst versions of 
Material Design and has since transitioned onto the web. In native mobile 
apps, the menu should always be on the le" side, while responsive websites 
align it to the right. 
Always design your hamburger menus with ease of use in mind. The shape 
and length of the lines are not that important. Just keep the general 
consistency of the stroke and roundness of the corners. You can pick any 
con!guration you like, with either the same length lines or a variation in 
lengths. 
As with any active object, remember to have the clickable area large 
enough for comfortable touch. Between 40 and 44 points is an excellent 
place to start, with the actual line shape being half the size, or even smaller. 
If your drawer has any tabs that receive noti!cations, you can add 
a noti!cation bubble on the hamburger menu itself. That will help your user 
understand there is new content waiting in the drawer. While designing the 
noti!cation bubble, remember the numbers can get pre#y big and plan 
accordingly (like a pill shape for three-digit numbers.)
120
HIDDEN NAVIGATION - HAMBURGER MENU
A hamburger menu drawer is a vertical list of menu items - o!en with icons 
next to them. The minimum height of these elements should be the size of 
the touch target (44p). Try to di"erentiate it from the rest of the app, by 
using contrast so the user can instantly recognize where the drawer begins 
and ends. If you want to have the drawer in the same background color, as 
the rest of the UI, try darkening the UI underneath when the drawer is open. 
The drawer can either open over the content or push the content to the 
side. Both options here are ok, as long as they have consistent behavior with 
other overlays you're using in the product. 
HAMBURGER MENU - THE DRAWER
Good contrast between the nav drawer and 
the rest of the interface.
Contrast between the nav drawer and the 
UI is too low.
One of the most common problems of navigation drawers is poor alignment 
and margins of icons and labels. You can quickly solve it by adding guiding 
rectangles with the right height (44p) and proper margins. Create a guide 
for every menu item right away and align your text in the guides vertically, 
so it's precisely in the center. Test it with some red squares above and below 
to be sure. 
To align your icons, !rst set the right safe 
area for each one. Our choice is creating a 
square of 44 by 44 points and aligning the 
icons in the center. That square should 
have the same distance from the le" side 
(screen edge) and the label. In the example 
shown here, it's the X value. That X comes 
from the grid base-number again (8 or 10.) 
Then align the labels to the le" side and 
check back if they're vertically center in 
their safe areas.
If your nav drawer also has a log-out bu#on, try to separate it from the rest 
of the menu by at least double-space, or simply bo#om-align it. It will 
make it less stressful for users to try and tap other items, that are closer to 
the bo#om of the navigation. Even with an additional con!rmation for 
log-out, most people have a fear of accidentally triggering that action. 
As the entire reason for a nav drawer is to have more than !ve icons 
(which we don't usually recommend), you need to pick them from one, 
consistent set. You can !nd out how to pick similar style icons inside the 
icon chapter. 
Dashboard
Search
Friends
Noti!cations
Pro!le
Inbox
Se"ings
Log out
x
x
HAMBURGER MENU - LINK LAYOUT
Contextual navigation means all the links inside of your content or 
metadata. It can be a hashtag, category, user name, or a simpli!ed 
information card that leads to the detail page. It can also appear within 
longer blocks of text. 
Because the links are very close to other text-based content, you need to 
make sure they're di"erent enough to stand out. Remember to highlight the 
links with a background, underline, color, or font thickness. The last step is 
making sure all links have the right active area around them, so there's 
enough space to use them on mobile devices comfortably.

---

## Sección 31: Core Concepts & Foundations [Entropy: 0.442]

An underline is a universally understood suggestion that the content we're 
seeing is a link. If underlining the links doesn't !t the rest of your design, 
consider a thicker font and a color change. 
It's essential to avoid using color as the only link indicator. People with 
various types of color blindness can simply not see the di"erence and 
ignore the link. Experiment with font weights and other forms of highlighting. 
Navigation
Design
Michal
Author:
UI
UX
Navigation
Design,
Michal
Author:
UI, UX
CONTEXTUAL NAVIGATION
Another way of designing contextual links is simply creating them as 
bu!ons. They can be "lled or outlined, and o#en with slightly lower contrast 
than regular interface bu!ons. That will prevent them from capturing too 
much a!ention and distracting the users from the actual content. 
Contextual navigation needs to be large enough for comfort. Give enough 
whitespace to all of the page content, so that the structure and hierarchy 
give room for smooth navigating. 
Whether you're using a background or 
not, remember always to have the 
active area a bit larger than your 
bu!on. On desktops, when hovering 
on them, they should change the state 
to indicate the fact that the user can 
click them. On mobile, just keep them 
large enough and with enough space 
between them to avoid unintended 
touches. 
Design
Michal
Author:
UI
UX
Navigation
CONTEXTUAL NAVIGATION - GOOD IDEAS
Design
Michal
Author:
UI
UX
Navigation
Design
Michal
Author:
UI
UX
Design
Michal
Author:
UI
UX
Design
Michal
Author:
UI
UX
The best navigation
is the one that's
always visible.

Anima
mation
Anima
mation
20.
Animation

Writing about animation in a static book format can seem like a crazy idea. 
The subject of animation is an integral part of UI. We decided to cover all 
the basics in the following pages and let you experiment with motion on 
your own. 
The most straightforward de!nition of animation is "change of state over 
time." State changes in animation can be its scale, position, shape, or 
rotation. 
Other, more complex transitions (like 3d movements) usually require 
additional coding libraries and a lot of extra planning. 
Animation in user interfaces can help with navigation, provide information 
(by giving context or showing the progress of a current task), or be 
a decoration with the only purpose to delight the user. Try to limit that last 
kind to a minimum. Having too many objects animated can make your 
interfaces harder to understand and frustrating. 
TIme
Point A
Point B
anima
Animation
THE BASICS
Transition types are a way to describe the change of our object in a given 
time. Three most common types of transitions include change of position, 
scale, or angle (rotation.) Other examples of transformation include change 
of shape, gradient, shadow, color, or transparency. 
Most design tools that can export animation do it through simulating the 
change between the initial and !nal states. You don't need to create every 
single frame of the movement - only the !rst and the last one. 
A movement (position change) is merely moving the UI element to the new 
position in the "!nal state." It's o"en achieved by duplicating the entire 
artboard and changing the position of individual items. The only thing le" is 
to choose the delay, time, and easing. For example, you can de!ne an 
object to move from X=100 to X=200 in 2 seconds. 
We can add a delay value, which will delay our animation start with the 
selected number of seconds. That allows you to structure your animations, 
so they don't all happen at once. 
Scale
Position
Rotation
X = 100
X = 200
2 sec
TRANSITIONS
LINEAR
EASE-IN
EASE-OUT
Easing is a curve function modifying the speed of our animation. 
The default choice (no-easing) is called linear, and it means that your object 
moves from A to B at the same pace. 
Easing makes things look more natural because it speeds up or slows down 
the start (or end) of your animation within the same timeframe. The realistic 
feeling comes from the fact that almost no movement in the real world is 
entirely linear, so this gives your objects a more dynamic, natural feel. 
You can use both an ease-in and an ease-out curve inside one animation. 
When you choose a particular easing type, remember to use it consistently 
throughout your project. 
If you want to play it safe, you can use linear animation, but for a be!er 
e"ect, try playing around with even a subtle easing curve. 
You can modify the easing curve in various ways to achieve some unique, 
exciting e"ects, but you must understand the basics #rst. 
At half-time of your animation, 
the object is exactly in the 
middle.
0s
1s
2s
0s
1s
2s
0s
1s
2s
At half-time of your animation the 
object is closer to the start and 
then it speeds up.
At half-time of your animation the 
object is closer to the end, and 
then slows down.
2
1
3
2
EASING
Add Easing to your
animations for a more 
natural, realistic 
movement.

The bounce e!ect became very popular with the release of the "rst iPhone, 
where it was present across the interface for that familiar "rubber-bending" 
e!ect. The most famous example is bouncing a list when you reach the top 
or the bo#om to show there's nothing more to scroll. The e!ect proves to be 
very user-friendly, but you need to use it with caution - having an overly 
bouncy interface (especially with large bounce values) can look a bit 
grotesque. 
The basic rule of the bounce e!ect is that our object exceeds the desired 
range at around 80% of the animation time and then comes back during 
the remaining 20% of the time. For example, if you're moving on the X-axis, 
from 100 to 200, you end up going beyond 200 (to about 220 or 240) and 
then going back to 200 in the last stage of your animation. 
Position bounce is the most popular one, but you can also use it for scaling 
or rotation. Try to remember that your "exceeding" value should never be 
larger than 20% of the "nal state. Values between 10 and 20% are optimal. 
Anything above that range will make it look unnatural and too jumpy. 
0s
1.5s
2s
Change of scale
Change of position
BOUNCE
SOFT BOUNCE
Progress bars are a popular way to show the progress of a process visually. 
Even a slow-moving progress bar suggests that something is happening in 
the background and makes it easier to wait without fear that something went 
wrong. They're o!en a rectangular shape that "lls with color from le! to right. 
That animation can happen linearly, or it can load the actual progress (so it 
can jump from 20% to 80% in one step). 
While designing the components for an animated progress bar, remember to 
create it in three states. You'll need an empty progress bar, a half-way "lled, 
and a full one. Sometimes it can be a good idea to create the fourth state 
signifying success. 
If your progress is interrupted, make sure to create a state for that as well. 
You can show successful progress by turning its color to green at 100%. If 
you want to be more creative, you can also change the shape of your full 
progress bar to become a bu#on, allowing the user to continue that way. 
When you can't predict how long a process can take, you can also use a 
spinner. It's a simple, circular shape that rotates around, showing the user 
that something is loading, albeit without a precise estimate of the time. 
Continue
PROGRESS BARS
In mobile apps, you can use animation for screen transitions. Doing so, will 
make your interface more realistic, as it can imitate page-turning, and show 
the context of where each screen exists in space.

---

## Sección 32: Core Concepts & Foundations [Entropy: 0.391]

For example: if you're coming back to the previous screen and the back 
arrow points to the le!, you can assume the previous screen will move in 
from the le! side, moving the current screen to the right. 
If you mess that logic up in any way, it will be much harder for your users to 
understand the relations between screens—design screen transitions in
a way your user is expecting them to appear. 
NAVIGATION
Microinteractions are a vital part of any interface. They help the user get 
feedback (good or bad) about his actions or the state of the application 
itself. You can use them to guide the users to achieve the desired outcome. 
In simpler terms, it's a way to show (through animation) a change of state of 
an object. It usually happens through a conscious action on our part. 
Microinteractions help us understand that we've changed something much 
be!er than simply changing a state from 0 to 1. 
An excellent example of a microinteraction is turning the toggle switch ON 
and OFF. Aside from the color change, the knob also moves, which gives us 
instant feedback that our action (switching the state) was a success. 
Another example is rotating the plus icon in a "oating action bu!on,
so it changes into an X, showing the user can close it with another click. 
There's plenty of room to experiment with designing your own unique 
microinteractions and delighting your users.
We believe microinteractions are one of the areas of UI, in which there's still 
a lot of innovation to be created. 
OFF
Intermi!ent
state
Intermi!ent
state
ON
Add
Close
MICROINTERACTIONS
Another popular microinteraction is Material Design based raising of a 
product card on touch or hover. You can achieve it by enlarging the object 
itself and changing its shadow to match. This action brings the element 
closer to our screen, communicating that we're currently interacting with it. 
You can also enlarge a photo within a mask on hover for a similar e!ect.
You can also turn a bu"on into a progress bar! It's an excellent way for your 
user to understand what is going on without having too many elements on 
one screen. The possibilities here are vast. 
The basic rule when designing a microinteraction is that they should only 
happen within the most important, actionable UI elements (bu"ons, cards, 
forms, or photos). 
Avoid doing microinteractions on text or inactive objects, as doing
so can confuse your users. 
MICROINTERACTIONS
SAVE
SAVING...
SAVING...
SAVED
+ ADD
Ann Smith
HR Manager
+ ADD
Ann Smith
HR Manager
Microinteraction
shows the change
of state of an
object by user
action.

PARALLAX-SCROLLING
Parallax-scrolling is an e!ect in which the background moves more slowly 
than the foreground. It creates an illusion of depth in a two-dimensional 
scene. It initially came from video-games but has since become popular in UI 
design as well. 
The entire concept is based on di!erences in displacement between layers. 
The farther away something is, the slower it moves. Use at least three layers 
to get the full visual bene"t of this e!ect.
The most popular use-case of parallax scrolling is de"nitely in landing pages 
and mobile app onboarding processes. It can work with both horizontal and 
vertical movement on objects, but it's best not to do it
on both axes. 
As with most animations, you need to make sure it enhances the experience, 
instead of destroying it. Avoid using parallax scrolling on every element or 
every section of the website and keep a consistent speed for each layer. 
Foreground
Nearest
Background
Farthest
background
All elements moved, 
but not the same distance.
Photos
otos P
Photos
otos P
21.
Photos

Photos can have many functions in modern product design. They range 
from purely aesthetic ones (like "nice-looking" backgrounds) to pro!le 
pictures, photo galleries, or social media feed posts. 
Luckily, the age of fake, obviously posed "stock" photos are over now. 
Websites like Pexels or Unsplash now o"er entirely free, realistic, and highquality images you can use in your designs. Most of these sites also 
integrate with popular design tools for seamless importing. 
That's good. The overuse of the same stock photos was fairly common in the 
early 2000s. That same blonde girl that smiled at you in the shampoo 
commercial, the sausage industry, and on your bank website is now being 
replaced by less staged photographs.
EMILE SÉGUIN / Unsplash
Photo
Photos
THE BASICS
A good photo can make your product screen feel more organic and alive. It 
can bring the machine-like quality of a minimal interface closer to something 
human. Background photos are a popular choice in both apps and websites, 
but many of them take the wrong approach, which makes the product 
unreadable and clu!ered. 
The main problem when using photos as backgrounds is a decreased 
readability of text (or other objects) placed on top of them. They're also o"en 
chosen randomly and don't match the overall color pale!e of the design. 
If you plan on using the same static photo, you can adjust its relation
to the text and make it readable. 
As you can see in the example to the le", 
the text has di#erent readability based 
on its position on the photo. If you're 
using the same photo (on a landing 
page, for example), then you can modify 
it to always display your text on the 
readable portion. 
If your photos are dynamic (usergenerated), you won't be able to predict 
the best text placement. 
SURFING SPOT
SURFING SPOT
SURFING SPOT
BACKGROUND PHOTOS
You can solve the readability problem in several ways. One of the most 
common solutions is adding a color overlay to the photo to make it darker 
(or lighter). In most cases, black color at 50 to 80% opacity will make the text 
readable on nearly any photo. 
If you want to make that interface fragment more consistent, consider using 
your primary color mixed with dark grey. 
SURFING SPOT
SURFING SPOT
SURFING SPOT
SEE LOCATION
SURFING SPOT
SURFING SPOT
SURFING SPOT
SEE LOCATION
The entire process is merely adding a translucent 
layer !lled with a darker shade of our primary color 
on top of the photo. Experiment with brightness and 
saturation to achieve the best e"ect. 
In the example on the right, the overlay has a hint of the primary color mixed 
in. That makes it easier to blend the photo with other UI elements like bu#ons 
and icons. 
TEXT READABILITY ON BACKGROUND PHOTOS
If your content likely occupies only a portion of the photo background (top, 
bo!om, or the sides), you can use a transparent gradient as an overlay. It's a 
trendy way to use gradients to bump up readability, but make sure your text 
actually IS readable. 
SURFING SPOT
If you're con"dent, your text will only be at the bo!om of the photo, start by 
creating a gradient from 0 to 100 opacity as the top layer. Choose both 
colors from your primary colors, with a possible -30 brightness shi#. 
SURFING SPOT
Photo in the background
Gradient
Full transparency (opacity = 0)
No transparency (opacity = 100)
GRADIENT OVERLAYS
You can also add a more opaque rectangle under your text to be sure it's 
readable. It's challenging to pull it o! in a way that looks good but is 
probably one of the best ways to achieve readability while placing text on 
photos. You can play with the transparency to make this work on any photo 
with excellent accessibility. 
If you plan to add an icon on your photo, start 
by adding it as a bu"on, as it will be a lot safer 
to keep it readable at all times. 
Those hard overlays can either be #oating or $xed to the edge of your 
photo (any side). The $xed ones are o%en full width (or height if they're 
vertical) of the picture to avoid unnecessary lines.

---

## Sección 33: Core Concepts & Foundations [Entropy: 0.37]

SURFING SPOT
SURFING SPOT
HARD OVERLAY
The general rule for photos is DIY. If you want to be unique and professional, 
take your own photos. With stock catalogs, you always risk using an image 
that is so popular that your project starts to look like everyone else's. 
Try searching for UX on the leading free stock sites. Those same shots of a 
table with wireframes and devices have been in circulation for years. 
They've been used in articles (both good and bad ones), blog posts, 
portfolios, and more. 
If you don't have an option to do the photos yourself, remember to make 
your stock selection !t the context of your product. It's not supposed just to 
be a "pre"y picture" - it needs to add value and make sense with all the rest 
of the design. 
Zdj. Alvaro Reyes / Unsplash - One of the most popular "UX photos"
HOW TO PICK THE RIGHT PHOTOS?
When you're building a product that shows user lists and pro!les, always use 
your own photo as the pro!le picture. All of the other users can be your 
friends and family. By going down that path, instead of choosing "free 
faces" from online portals, you make the product more emotionally 
connected to you. That allows you to be"er engage with what you design. 
Are you designing a pro!le screen? 
Make sure it's your pro!le. Are you 
adding people to friend lists? Add 
your real friends in there! Don't use 
random, unknown people
- make the project your own. 
Many design tools now have plugins that allow us to randomly pick a face 
and place it within a selected shape. That's the easy way, and if you're in 
a hurry, you can use it. But if you want to build something special, we 
encourage you to use photos of yourself. 
FACES
+ ADD CONTACT
Ann Smith
Most common mask shapes are rectangles 
(sharp and rounded), squares (sharp and 
rounded) and ovals. 
Masking is a process of pu!ing one object (in our case, a photo) in the 
con"nes of another object (the masking shape). Most pictures are (by 
nature) rectangular, so masking is the only way to have a photo inside
a circle. 
Recently, organic, uneven blobs are gaining popularity as well. These 
shapes can either be a mask for a photo, a color, or a gradient. They mostly 
work on landing pages, however, and are very rare in mobile apps (aside for 
maybe onboarding processes).
A mask consists of a masking shape and anything you want to "ll its 
con"nes with. In most cases, it means the masked shape is a photo, but you 
can mask multiple shapes (even with the same mask) to achieve some 
interesting results. 
MASKING
HOW TO CREATE A MASK
Even if you're not planning to have any text on your photos, it may be a 
good idea to add a barely visible gradient on top of it. If your product is blue, 
you can add a very subtle blue overlay to the image. Even 2-3% opacity of 
the overlay will be enough to make it consistent without modifying the 
original photo too much. You can also do the same trick with maps to make 
them be!er "t your interface. 
Do it only with images that you're adding to the product yourself. 
Avoid modifying what the users upload! But if you're producing your 
content, having a consistent ""lter" on all your cover images will make it 
feel a tiny bit more professional. 
BASIC COLOR CORRECTION
One great example is having a photo in the background, with the person in 
the picture looking to the side, at your Call to Action bu!on. We naturally 
follow the gaze of other people we see, because we want to be sure there's 
no danger coming at us from that direction. 
Eye-tracking studies show that if a person in a photo is looking directly at 
you, you'll focus on the face. If that same person is looking to the side, you 
will focus on what that person is looking AT. 
Avoid using photos of people looking directly at the camera in your 
marketing materials (landing pages, onboarding processes, etc.)
Use pictures where people look to the side and place your bu!ons 
accordingly. 
PSYCHOLOGY
Photos can add
an emotional value
to your designs,
but can also distract
your users.

Illustra
ration
Illustra
ration
22.
Illustration

Illustr
Illustration
THE BASICS
Using illustrations is another way of making the interface unique. You can 
use them in place of photos as a visual representation of an idea. A!er all, 
they say a picture is worth a thousand words. Just as with photography, the 
best method is doing the illustrations yourself, instead of ge"ing them from 
stock websites. 
An illustration adds emotion to your content and makes the entire interface 
more friendly. It helps with remembering content and building a relationship 
between your brand and the user. 
You can use illustration to create a mascot character that shows new users 
around your product. An excellent example of that approach is the popular 
language app - Duolingo. Another, less popular, but even more ubiquitous 
example is the paperclip icon from the O#ce suite of apps. If done right, an 
animated mascot character can signi$cantly enhance the experience of 
your users and make them remember you be"er. 
Illustration is a good
way for the users
to remember your
brand.

STYLE, COLOR, CONSISTENCY
Remember that the style of your illustrations must match the overall style of 
the brand. For example, a set of cute, vibrant colored characters won't be a 
good match for a !ntech or a banking product. You can use them in an elearning app to make the process more fun and engaging. 
Just as with choosing and adjusting photos - make sure your illustrations all 
have a consistent style and color pale"e. It's great if the pale"e comes 
directly from your brand, as it will make the association a lot stronger. 
Style consistency means that you need to create each illustration the same 
way. Use the same stroke type, width, same !ll type, and coloring. If you're 
using outlined images only, don't add one that's in full color as it will only 
confuse your users. 
Keep the roundness of shapes and textures (if you plan to use them) 
consistent as well. It all has to !t perfectly together as a family of images.
When creating user avatars for an app, remember to keep a consistent color pale"e.
It's great when it's a mix of your brand colors.
ONBOARDING
A good place for illustration is in product onboarding processes. If you are 
planning to onboard your users using a couple of introductory steps, 
illustrating them will make the experience more fun and easier to remember. 
You can animate them (or use a parallax e!ect on a few layers) to make it 
look even be"er. 
First impressions count, and being unique, funny, and engaging is a good 
place to start. 
When designing an onboarding process with illustration, don't go too crazy 
with animating everything. It's best to keep the animations as highlights 
(like ringing a bell or the character winking). Subtle animations work a lot 
be"er! 
Welcome to the app
SEE WHAT WE CAN DO
I will be your guide
DISCOVER THE BENEFITS
EMPTY STATES
Empty states, also known as "Inbox zero," are versions of a screen that 
doesn't have any data yet. Imagine just setting up your email account
(or being very strict while using it) and having no messages in the inbox. 
Instead of displaying a blank page, you can make the screen more alive 
by using an icon or illustration to explain why the inbox is empty.
You can also go a step further and add a call to action - in our example, 
for the user to write an email. As this state is a pretty rare sight for most 
users, you can make it a little more fun than the rest of the product.

---

## Sección 34: Core Concepts & Foundations [Entropy: 0.265]

Which one would you prefer to see when you open the app for the !rst 
time? Having an engaging empty-state design will delight your users and 
make them remember the product. 
Your inbox
is empty!
WRITE A MESSAGE
Your inbox
is empty!
Langua
guage
Langua
guage
23.
Language

The language of our product, right a!er the right design, is de"ning how 
users will react to using it. We can be very serious, business-like, relaxed and 
casual or create our own, unique way. 
A UI designer doesn't have to be a copywriter. Don't get us wrong here. But 
there's plenty of micro-copy to be wri#en in user interfaces that o!en never 
get any copy treatment. Bad communication can kill a product, even if it has 
perfect UI. 
All micro-copy should be simple, concise, and clear. Ge#ing the messages 
short is always good, but keep in mind that the copy has to state its meaning 
precisely. Try to avoid broad labels like "OK" or "Next" on bu#ons. You can 
replace them with more action-speci"c ones like "Save changes" or "Add to 
favorites."
A popular "tness app replaced their "save workout" bu#on with one saying, 
"I am awesome!". The friendly, personal touch made their users happy with a 
small dopamine boost every time they pushed that bu#on. These nonstandard ways of handling user communications can become a selling 
point of the product. Be creative, but without being too vague or losing 
clarity. 
Save Workout!
I am AWESOME!
Langu
Language
THE BASICS
One of the most common mistakes is using double negatives or very complex 
word structures for negative actions. 
An excellent example of this issue is canceling a cancellation. A!er a while 
of looking at the popup, we get that we con"rm the cancellation by 
pressing OK. But these kinds of messages can confuse and be quite 
annoying. Some users may not understand it at all and close the app or 
website without taking action. 
When a user has to con"rm a negative action (like removal or cancellation), 
it's best to be as precise as possible. Have your bu#on precisely state what 
happens when you activate it. 
NEGATIVE ACTIONS
OK
CANCEL
Cancel your choice
Do you really want 
to cancel?
CANCEL MY CHOICE
CLOSE
Cancel your choice
Do you really want 
to cancel?
Negative actions should only have one bu!on label that con"rms the 
action. With two labels, both sounding similar, it's not apparent which one is 
the desired one. 
In this scenario, the main action should be "Remove data," while the less 
important one would be "Cancel." The main action (primary) we can 
emphasize visually, to stand out from the secondary bu!on. 
NEGATIVE ACTIONS
FORGET
DENY
Forget me
Do you want us to forget 
(remove) your private data?
REMOVE DATA
CANCEL
Forget me
Do you want us to forget 
(remove) your private data?
All of our micro-copy should be consistent. If we decide on an approach, it's 
best to stick to it with all of our UI elements. Don't mix and match di!erent 
linguistic styles, especially between same-type elements like bu"ons. 
Consistency in language will make the actionable objects easier to 
understand and much faster to process. 
This rule also works for longer descriptions and noti#cations in the product. 
Try to use a consistent way of speaking to your user for the best result. 
SAVING
LET'S ADD!
SHOW
SAVE
ADD
SHOW
CONSISTENCY
A Dark Pa!ern is a UX term that means deliberately lying to the user to 
achieve the desired outcome. In most cases, dark pa!erns exist to convince 
the users to agree to something unknowingly (like giving out private data, 
location information, or making it harder to opt-out of something).
The example above comes from a real, top-rated product. The label states 
that you want to sign out from all marketing messages.
The switch next to it would suggest that having it in the ON position would 
mean you don't want to receive marketing messages. But the truth is that 
having the switch to OFF is the actual way to opt-out. This di"erence 
between the label and the outcome is a way to keep you signed up. 
Similar, dishonest ideas are o#en around the form-agreement checkboxes. 
In many cases, the labels are wri!en in a way, suggesting that we need to 
select them all to continue. Only by carefully inspecting the UI we realize 
that we only need one or two, while the rest is merely a permission to spam 
us.
These UX-language traps shouldn't exist. 
Respect your user!
DARK PATTERNS
Marketing
Sign out from all marketing and 
advertising.
Don't use Lorem
Ipsum. Ever!

Lorem Ipsum is an easy path to being lazy and breaking immersion.
Try not to use the "Lorem Ipsum" text in your designs. Not even with initial 
wireframes and high-level prototypes. If you don't have the right copy yet, 
you can !nd something relevant to the screens you're working on and paste 
it. If you're creating a !tness app, replace lorem ipsum with some real 
training advice or exercise breakdowns. 
If your example copy matches the style and subject of the product,
it will make it a lot easier to come up with new ideas and have a "feel" for 
the design. Faux-Latin breaks that immersion and makes the project looks 
random. Having in-context copy in the design will also help you present it 
be"er to stakeholders or other designers to get their feedback. 
Lorem ipsum dolor sit amet, 
consectetur adipisc ing elit, sed 
do eiusmod tempor incididunt ut 
labore et dolore magna aliqua.
Dolor sit amet
If your goal is to have a strong, 
healthy posture and higher 
metabolic rate, you should 
de!nitely try this workout 
category.
Fitness goals
LOREM IPSUM
Design
styles
Design
styles
24.
Design
Styles

Over the years, we have gone through various design styles, coming back 
and revisiting some of them a!er a few years. Those styles take cues from 
general (and well known) art and design styles but have their unique names 
in UI design. 
In 2020 the most popular style is a mix of "at-design and pseudo-3d 
layering with shadows. It's an evolution of Material Design, that's currently 
called "modern design." 
This chapter will focus on mobile app design styles, as they o!en come 
back and in"uence web design as well. 
An excellent exercise to try is choosing a simple object (like a product card) 
and designing it in all of the styles in one go. 
That approach will help you be#er understand the di$erences, and how to 
%nd ways to combine them in your projects. 
Desig
Design Styles
INTRODUCTION
EXERCISE
Skeuomorphism has been around for
a very long time. Even the computer 
Desktop metaphor (or the trash can)
is in face Skeuomorphic in nature. But in 
UI, it became especially important with 
the release of the !rst iPhone. 
This trend is all about using real
objects metaphors to make the UI easier 
to understand. A library app would have 
wooden shelves under the books, and 
everything would try to imitate realistic 
shadows and highlights. 
That digitization of real-world objects was all about helping mental 
associations for non-tech-savvy users. With new technology, people mustn't 
be afraid to use it (and the iPhone was entirely novel at the time). In general, 
Skeuomorphism had a goal of lowering the barrier of entry for new users. 
Currently, the real "stitched-leather-and-wooden-shelves" Skeuomorphism 
is as popular in design circles, as Comic Sans is with font enthusiasts. 
Designers laugh at those rare Skeuomorphic a"empts, so the trend is 
practically non-existent in real products.
It's also a bit di#cult to code, as every li"le element has to be a separate 
bitmap, while in other design trends, you can generate a lot in code alone.

---

## Sección 35: Core Concepts & Foundations [Entropy: 0.52]

Users understand interfaces a lot be"er now. They've been using 
smartphones for years now and know all the possible ways of interacting 
with their devices. 
+ ADD TO CART
Random Soda
Refreshing minty taste soda
with a hint of ginger.
$5.00
SKEUOMORPHISM
MAIN PROBLEMS WITH SKEUOMORPHISM
Flat Design is the complete opposite of 
Skeuomorphism. The central premise of 
this style is minimalism. No ornamentation, 
no e!ects. That includes the lack of 
shadows on objects, hence the name 
""at."
All of the interface layers exist in the same 
plane on the Z-axis. When 3d and 
Skeuomorphism got boring, "at design 
became popular mostly because of being 
so di!erent. 
An example of "at design at its best is Microso#'s Metro UI made
for the now obsolete Windows Phone platform. 
This style is still present, but not it's not highly popular. The main reason for 
that low adoption is the fact that it's harder to design well without relying on 
shadows and faux-3d for hierarchy guidance. To create a great "at design, 
you need to nail typography, spacing, and color at 100%. Otherwise, it won't 
make an impact or be memorable. 
On the user side, there are considerable di$culties with understanding some 
of the object's purpose. For example, a label can be mistaken for a bu%on. 
Various studies show that using completely-"at designs is always around 
20-22% slower than they're layered counterparts. 
All that extra time is necessary to discern active objects from content.
+ ADD TO CART
Random Soda
$5.00
Refreshing minty taste soda
with a hint of ginger.
FLAT DESIGN
Using products made
with Flat Design,
can be up to 22% 
slower.

Material Design is a Design System 
created by Google in 2014 to help 
developers create Android apps. Its 
impact had been powerful, and most of 
the modern designs take some cues from 
Material. 
The main idea of this design system
is to simulate "digital-paper." It means the 
layers themselves are still !at, but their 
position on the Z-axis is a way to set 
hierarchy and order. 
+ ADD TO CART
Random Soda
$5.00
Refreshing minty taste soda
with a hint of ginger.
The general rule of Material Design is to have all the important UI elements 
"closer" to the user. That appearance of depth comes from the use of 
shadows under otherwise !at card-like objects.
The system uses its own, pre-de"ned color pale#es, with base colors using 
the 500 number. Darker hues are using numbers below 500, while lighter use 
the numbers above. The suggested approach to designing in this style is to 
choose one primary color, one secondary, and use them consistently 
throughout the product. 
It also came with its own font - Roboto, which was redesigned from the very 
"rst version and gained a lot of styles and weights. 
The main problem with this Design System is that using the same colors, 
font, and shadows, in essence, make all the Material Design products look 
alike. Newer versions tried to "x that, but so far rather unsuccessfully. 
MATERIAL DESIGN
Modern design is a mix of Flat and 
Material, but with a slightly more 
signi!cant emphasis on breaking the 
rules, which in Material Design are pre"y 
strict. 
Most objects now have subtle shadows 
(not only the cards but bu"ons and icons 
as well), and the shadows are colorful, 
using the darker primary color as a base. 
These so#, colored shadows are the 
characteristic part of this style. 
Modern Design was the answer to the problem of Material apps, all looking 
like re-colored clones of each other. Colorful shadows and angled gradients 
give the designer a lot more to play with than the constrained rules of 
Material ever have. 
This style is also bringing round, organic shapes back. Of course, you can do 
sharp corners as well, but most projects done with "Modern" are using 
rounded corners and rounded bu"ons. The entire experience is more userfriendly and less generic. Round shapes are also perceived as nonthreatening by the users. 
The main rule is: bend the rules. 
Make your products unique. Place your gradients at an angle, and add 
curved, organic shapes to the backgrounds. The openness of this approach 
made it the most popular style for both apps and websites nowadays. While 
it won't work for very serious business apps, it's a perfect !t for consumer 
products. 
+ ADD TO CART
Random Soda
$5.00
Refreshing minty taste soda
with a hint of ginger.
MODERN DESIGN
Neumorphism is a "new" design style 
that !rst appeared (under that name) in 
late 2019. What's interesting, Michal (one 
of the authors of this book) came up 
with the name and wrote the !rst long 
article on the style. 
From then on, the illusion of so", 
extruded plastic in UI began to spread 
under the Neumorphism name. This 
style works best with non-active objects 
and when it's not overused.
Avoid using Neumorphism for active elements like bu#ons or switches, due 
to shallow edge contrast. While inverting the shadows "looks cool," it's not 
usable and not accessible. The low contrast will make it problematic to use 
the interface by both the people with vision problems and people using older, 
lower contrast displays. Designing a bu#on, make sure that your normal and 
active states are using underline or font-weight to di$erentiate. Otherwise, 
for some users, both states may look exactly the same. 
NEUMORPHISM IS TERRIBLE FOR BUTTONS
+ ADD TO CART
Random Soda
$5.00
Refreshing minty taste soda
with a hint of ginger.
CLICK ME
CLICK ME
CLICK ME
CLICK ME
NEUMORPHISM
+ ADD TO CART
Random Soda
$5.00
Refreshing minty taste soda
with a hint of ginger.
We believe that style works best as a background for info or product cards. 
While the mechanic of it doesn't make sense for anything you can enlarge 
or swipe (like cards), this rule can be bent if you want to use Neumorphism in 
your product. Start your card design by removing the background and 
creating proper spacing, hierarchy, sizes, and colors for everything !rst. It 
has to work seamlessly together and be perceived as a whole before you 
add the neumorphic card underneath. 
If the card structure is still easy to discern, even without the background, it 
means it will also work for people who can't see the subtle shadows. It 
means that this style works best when it's not necessary - a pure decoration. 
You can mix it with other styles (Material, Modern or even Flat), but avoid 
creating products that only use Neumorphism and use it extensively across 
all UI elements. 
CARDS
The idea behind neumorphism is to use inner or outer shadows as the only 
de!ning characteristic of objects. For this to work, the page background 
needs to be the same color as the object background. Because we're using 
dark and light shadows at the same time, the background cannot be fully 
white or fully black as it would render the entire e"ect pointless. 
The background can be grey or have a hint of another color. In our 
examples, it's a very light desaturated blue. Create your object, !ll it with the 
same color as the background and add two shadows to it, a lighter one on 
top-le#, and a darker one on bo$om-right. The blending of the two 
shadows will create that extruded plastic e"ect everyone is a#er. 
Changing the drop-shadows to inner-shadows will result in that concave 
look. 
HOW TO ACHIEVE THE EFFECT
Background: #E8F1FA
Outer shadow #6C8DC2 at 40% opacity 
and blur=20. 
X=8 Y=8
Inner shadow #FFFFFF at 100% 
opacity and blur=20. 
X=-8 Y=-8
Outer shadow 
#FFFFFF at 100% 
opacity and 
blur=20. 
X=-8 Y=-8
Inner shadow 
#C6DBF1 at 40% 
opacity and 
blur=20.

---

## Sección 36: Core Concepts & Foundations [Entropy: 0.391]

X=8 Y=8
Dark mode became popular with the 
gaining popularity of OLED screens
in mobile devices. In most cases, it's
a second interface style of an app
or website, and the user can choose 
between dark and standard versions. 
There is not enough data to con!rm that 
dark interfaces are easier on the eyes. 
They can, however, in some instances, 
help reduce the energy consumption of 
your device. 
Apple added Dark mode (as an option) to both desktop and mobile devices 
in 2019. At the same time, Google created a dark version of their Gmail app, 
and Instagram allowed the user to switch the interface to dark mode. 
It's worth remembering that the energy-saving part of dark mode only 
works on OLED screens (in which dark pixels are simply not backlit) and only 
if you're using pure black (#000000). Combined with white text, it creates a 
very high contrast that may make it harder to use comfortably. 
If you're using dark-mode based on dark-greys, it's purely an aesthetic 
choice, and the only gain for the user is the ability to customize the product. 
Some people prefer dark-themed interfaces, so it may be a good idea to 
design both in your projects. 
+ ADD TO CART
Random Soda
$5.00
Refreshing minty taste soda
with a hint of ginger.
DARK MODE
Ultra-minimalism is most common
in e-ink screen devices (e-book readers, 
minimalistic smartphones, etc.) 
The interface uses mostly monochrome 
text (and sometimes divider lines) without 
colors, shadows, or decoration. 
In the age of smartphone addiction, simple, minimalistic devices are 
starting to create a niche. They're tool-based instead of feed-based, with 
very simple, o!en text-based interfaces. 
This style is also suitable for specialized, professional devices like counters, 
measuring systems, wiring, and more. 
Ultra minimalism will never be the dominating trend, but it does not aspire 
to become one. It's reserved for niche applications for small, focused user 
groups. It's also very di"cult to design well, so it may be an excellent place 
to start your design exercises. With that level of simplicity, all the spacing 
and fonts need to be #awless to work well and look good. 
You can try to mix ultra minimalism with colorful photos to achieve 
impressive, modern-looking results. The main problem of this style, however, 
is that it's not suited for the mass market. Most consumers won't feel right 
using an interface based on text alone. 
+ ADD TO CART
Random Soda
$5.00
+ ADD TO FAVORITES
Refreshing minty taste soda
with a hint of ginger.
ULTRA-MINIMALISM
The best approach
is to combine best 
parts of di!erent 
styles for a unique
look & feel.

Every style gets old a!er it's been around for a while. Designers get bored 
with it and start experimenting. In many cases, the experiments are like a 
pendulum swinging back towards something that used to be popular a few 
years before. The emergence of Neumorphism is a good example of that 
trend - it's merging Skeuomorphism with minimalism for something brand 
new (even if "awed). It's almost sure that the current style of so!, colorful 
shadows will not be dominant in a few years anymore. 
But it's important to understand that it's not the style itself that ma#ers. It's 
your understanding of the basic design principles of grid, typography, 
colors, and knowledge on how to put it together for the best result. You can 
create an excellent design in ANY style. 
Even if your background is a wooden plank and your bu#ons have
a metal texture - if the grid, typography, and colors are right, it will look 
good.
Picking a design style for your product requires some thought on who are 
your users exactly.
How tech-savvy are they? Are they young or old? 
Some groups (like senior citizens) would still prefer to have their content on 
wooden shelves instead of abstract ""oating paper" layers. That real-world 
connection still helps people with understanding the interface, even if it's 
not as trendy anymore.
What we suggest is for you to explore mixing and matching various styles to 
create something of your own. Nobody wants all the products to look the 
same a!er all. 
TRENDS COME AND GO
Design
Process
Design
Process
25.
Design
Process

Even when doing design exercises, you need to make sure your design !les 
are organized and tidy. 
When you make a rectangle, the common name for it - "Rectangle 1" 
appears on your layer list. Avoid having instances like "Rectangle 1 copy", 
"Rectangle 1 copy 1", "Rectangle 1 copy 2." etc. Of course, when you design 
quickly, you can let yourself go, but before you move on to the next screen - 
tidy up. 
No ma"er where in the world you are, name your components and groups 
in English. It will make it a lot easier if a foreign person joins your team. The 
naming convention should be agreed upon by your team, but what works 
best is super simple, to the point options. 
Use gradation to name your layers and groups. You can either use the "/" or 
the "-" to set the name and the general family for an object. 
When you turn your group into a Symbol/Component, it o#en results in a 
beautiful folder-like structure in your component lists. It helps a lot with 
clarity and !nding the right thing quickly. 
Design
Design Process
KEEP YOUR DESIGN FILES TIDY
COMPONENTS
+ ADD
CTA - BUTTON - SMALL - GREEN GRADIENT
CTA / BUTTON / SMALL / GREEN GRADIENT
Naming layers and 
groups should 
become your 
second nature.

DASHBOARD
HEADER
NAVIGATION
FOOTER
CONTENT
GRAPH
PRODUCT CARD
INTERACTIONS
MENU
USER ACCOUNT
!
"
#
$
%
&
✋
(
)
TOP LEVEL SECTIONS
When you've named all the individual objects (like icons, bu!ons, windows), 
it's time to combine them all into groups. The most obvious group types are 
"Header," "Navigation," "Content," and "Footer. Of course, every project is 
di"erent, so that you may need a completely di"erent set. We found out 
that using emoji for speci#c group types will make it a lot faster to navigate 
even the most complex layer lists quickly. It's simply faster than reading text 
alone. 
The emojis can be very literal (a graph, human foot for the footer), or more 
abstract. It's essential, however, that they are consistent across the entire 
project. Each high-level group gets an icon! Of course, the individual layers 
or smaller groups don't need an emoji - that would be overkill. 
Once you have an emoji-system in place, you'll be able to adjust 
a large number of screens quickly.
TEXT STYLES
HOW TO NAME YOUR TEXT STYLES?
What we do?
Projects from 2017-2019
Read more
HEADING 1
BODY COPY
LINK
Read more
LINK HOVER
A!er designing the major screens of your project, it's time to start creating 
the text styles. Most design tools allow for easy naming of the text styles 
(like "Heading 1", "Body Copy" or "Link").
That way, while making future screens, you can choose the right style from 
a list and keep the entire project consistent. The "rst few screens should 
serve as a baseline - as this is your testing ground - but a!er you're done 
with them, it's time to de"ne the rules and stick to them. It will also make it a 
lot faster to modify a text style across all the screens, by changing it in one 
place. 
The best naming convention comes from HTML and CSS. Name your 
headers in the way they work in code (H1, H2, H3, H4). The same goes for 
your paragraphs (P), and your links. It will make it a lot easier for the 
developers to understand the font hierarchy. 
LAYER STYLES
Layer styles save the properties of the object under a common name. They 
include the !ll (color or gradient), stroke (or no-stroke), shadows, opacity, 
and blurs. You can apply them to all of your shapes (rectangles, ovals, icons)

---

## Sección 37: Core Concepts & Foundations [Entropy: 0.313]

to de!ne how they look. 
Try to create groups for your styles, so they'll neatly fold into an expanding 
tree-like structure. It will make it a lot easier to manage them, add new ones, 
or remove redundancies. 
When building a new object, try to use already existing styles on it whenever 
possible. The more styles, the more chaotic your layout can get, so limit the 
number and avoid adding new ones unless they're necessary. 
LAYER STYLES
COLORS
GRADIENTS
GREEN
PURPLE
GREEN - SHADOW
GREEN
BLUE
GRADIENTS / GREEN - SHADOW
GRADIENTS / GREEN
COLORS / GREEN
STYLEGUIDES AND DEFINITIONS
Typography
GRADIENTS / GREEN - SHADOW
COLORS / GREEN
background-image: linear-gradient(0deg, 
#13B0B0 0%, #F4FF51 100%);
box-shadow: 0 5px 7px 0 rgba(63,192,158,0.40);
background: #7CD584;
Sadly, most layer styles don't save the border-radius values, so we need to 
keep that consistent ourselves. Still, layer styles are the best way to hold 
shadow and !ll de!nitions of your objects in one place.
You can showcase your styles with a bit of CSS code on a separate 
artboard, to have a very early a"empt at a design system. That initial style 
guide will help your developers with implementing those styles as CSS 
classes. You can export those individual style guide-artboards as PDFs or 
upload them to a developer-friendly platform (inVision, Zeplin, Avocode, 
and more). Don't worry about the CSS code clarity. The design tools export 
way too many properties, but your developers should be able to only use 
the parts they really need.
Heading 1
Body Copy
font-family: WorkSans-ExtraBold;
font-size: 20px;
color: #1E3040;
le"er-spacing: -1px;
line-height: 15px;
font-family: WorkSans-Regular;
font-size: 11px;
color: #1E3040;
le"er-spacing: -0.55px;
line-height: 15px;
Colors and Gradients
Design
stems
esign
System
26.
Design
Systems

A design system is a collection of methods and processes that make the 
teams building digital products collaborate in an organized manner. 
In other words, it's a documented library of design components, ready to 
use in code. These components vary in complexity and can be nested inside 
one another. They include things like bu!ons, form "elds, but also basic 
layout se!ings (typography rules, margins, colors). It should also include 
code-ready de"nitions (either as code-snippets or CSS classes) for the 
developers. 
It's a modern take on the trusty styleguide that comes at an intersection of 
design, coding, and future-proo"ng products. 
Brad Frost wrote about the term Atomic Design, which for many, has 
become an outline for a good design system. Its premise is that starting 
small (with atoms, or base values), we de"ne more and more complex 
structures, ending up with the "nal page layouts. 
Atoms
Molecules
Templates
Pages
Organisms
Components
Base values
Code snippets
De!nitions
Documentation
Desig
Design Systems
WHAT IS A DESIGN SYSTEM?
The main advantages of a design system are much higher levels of 
consistency and faster, more precise implementations. In other words, the 
team can focus on actually building innovation without spending time 
!guring out which pieces to use for building a popup window. 
Most digital product creation processes are an e"ect of the collaboration 
between a designer and a developer (with others around that core). If the 
team is small, it's easy for them to understand each other. Of course, some of 
the messages always get distorted. That's the nature of collaboration. When 
the team starts to grow, communication spreads outside the o#cial, 
organized channels. Some decisions happen during lunch, some on a 
cigare$e break, some on slack, emails, or in the company elevator. This 
communication spread can lead to chaos and cause consistency and 
quality problems like the one outlined below. 
Internal consistency is a vital element of a successful product. It means the 
same kind of object within the product should always look and work the 
same way. One huge brand that we analyzed has completely di"erent 
styles for their login and registration forms—all in the con!nes of one single 
app. That causes confusion and frustration in users. They were expecting 
something and got something di"erent in return. If you don't push 
consistency from the start, it will only get more chaotic as the product grows. 
WHY?
INTERNAL CONSISTENCY
Please enter your e-mail...
E-mail
Please enter your e-mail...
E-mail
Most design systems start as a component/symbol library in your favorite 
design tool. That's a great start, but to make your system genuinely work in 
your company, you need to document it. That documentation becomes your 
"Source of Truth."
You should update it regularly, as design systems are never really complete. 
New research, trends, and features can in!uence global changes within your 
system. 
All companies are di"erent, so the way you build out your documentation is 
relatively open. Make it #t your business and its needs. The most important 
thing to remember is being precise - document every element as thoroughly 
as possible, including its use-cases. 
A Design System should match your company, not the other way around. 
Treat it like your internal company product and work on it with that mindset 
from the start. 
The #rst step of any documentation is all about se$ing the basic rules:
What's the update process (who and how accepts a change?)
What's the format and the language used (has to match 
the company)
Who is responsible for improving the Design System 
SOURCE OF TRUTH
HOW TO DOCUMENT?
A Design System 
should !t your
organization,
not the other
way around.

When building a design system for an existing brand, you need to start by 
analyzing the brand book and existing digital products the company has. 
Find all the main de!ning points and write them down.
The things you need to de!ne !rst are colors, fonts, and the grid. They are 
the top-level qualities of our design library. They in"uence every single 
component and layout you build. 
A bu#on is a combination of shape, color, margins, and a font. Split
it into its individual components and document each one separately. 
The shadow style can have its individual name, or be a category group. An 
example of the description can look like this:
Shadow / CTA : Color, blur value, position.
De!ne your colors !rst so that they can merge with the shadow description as 
well. Give them consistent, easy to understand names. Here's an example of 
how we documented our brand colors and gradients. 
SAVE
Shadow rendering
Colors / Main Gradient
Finished bu#on shape
WHERE TO START?
+
=
When you de!ne your color library and the ways they can be used (which 
color goes where), you can start assigning them to objects. That means 
both the obvious ones (bu"ons, backgrounds), but also others (like icons or 
decorations.)
Each UI element should have a set of clear rules on which colors and 
gradients it can use. You can reserve the primary gradient for CTA only, and 
some speci!c color just for the icons. Be precise. 
Even in the design phase, try to use only colors coming from your library. 
Avoid individually se"ing colors of your objects by hand. They all should 
connect to the style guide and come from there. 
Thanks to this approach, when you decide to update the system with a new 
set of rules, the objects will change automatically, saving you hours of work. 
SAVE
SAVE
Base objects with no !ll
Components with gradient !ll 
selected from the permi"ed gradients 
for these objects.
Gradients / 1 HYPE4Main
NESTING AND SHARED PROPERTIES
All members of the design system team must understand CSS. It's not 
di!cult to learn, and you can copy an object's CSS code directly from 
within your design tool. The nature of CSS will make it easier to get the 
properties, even if they don't use CSS in their code. It became the universal 
design-to-code language.

---

## Sección 38: Core Concepts & Foundations [Entropy: 0.25]

background-image: lineargradient(-49deg, #8E74FF 
0%, #2781F0 100%);
border-radius: 3px;
Colors / Main
Gradient
SAVE
Bu!on Shadow
box-shadow: 0 4px 9px -4px 
#8C6EE8;
font-family: Muli-Black;
font-size: 10px;
color: #FFFFFF;
le"er-spacing: 0.15px;
text-align: center;
text-shadow: 0 2px 4px 
rgba(0,0,0,0.12);
line-height: 44px;
padding: 0 24px;
Global rules
The next step is de#ning the common code parts. If your bu"on line-height 
is always 44 points, you can call it "Line-height/bu"on/standard" in your 
documentation. Or $bu"on-lh if you're using design tokens. 
Avoid mixing real, numeric values with code. If all the code documentation 
uses are pre-set numbers from a single source (design tokens), you can have 
a lot more control of the core of your Design System. 
CSS
COMMON PARTS
An excellent approach to grids in Design Systems is se!ing a so"-grid on 
your de#ned base-value (10 or 8 points). Then you can use tokens to 
describe the following values for use across the system. An 8-point base 
would look something like this:
The best set up allows for both the wiki and code snippets to grab those 
number values from a separate JSON #le. Avoid entering pixel values in 
both the components and the documentation wiki. 
Component de#nitions (for example, a bu!on's size, spacing, margins, and 
line-height) should use Design Tokens whenever possible. You can 
implement them in more unusual places as well, or multiply them by other 
de#ned numbers (like the Golden Ratio).
SAVE
line-height: $grid-xlarge
height: $grid-xlarge
padding: 0 $grid-medium;
margin: $grid-small
Properties
Margins
Token
$grid-base
8px
$grid-small
16px
$grid-medium
24px
$grid-large
32px
Size
$grid-xlarge
48px
SOFT GRID AND DESIGN TOKENS
DESIGN TOKEN
A design token is an overriding 
value that you de#ne in one place 
and then use its token everywhere 
else. It allows for faster global 
changes in the future. 
Your documentation should be a structured wiki with versioning, change 
tracking, and notes. The history (previous versions) of each page should be 
easily accessible (a dropdown may be a good idea) from each page. 
It seems obvious that the best approach here is to use a CMS, right? 
Based on our experiences with both large and small systems and 
companies, it's best to build it out in code only. The only person able to 
make changes should be the developer. The harder the modi!cations, the 
less chaos. 
It also means the developer has to be present at every Design System 
related meeting. It will help him understand the changes and rules a lot 
be"er, as he can ask speci!c questions when adding the changes to the 
wiki. The goal is to have the developer be one of the most active members 
of the product team. 
It helps to conquer the chaos of too many admins and set precise rules on 
every modi!cation to the system. All new versions should use the date as 
their versioning characteristic, as it makes them a lot easier to !nd. 
THE WIKI
Each page of the system wiki should also have a place for visual 
documentation - mostly in the form of screenshots with short descriptions. 
You can use this to show speci!c examples of each component in a realworld scenario. 
The way you write or structure your documentation is up to you. Remember 
to be as speci!c as possible and always state the obvious as well. That last 
fact will help new employees quickly familiarise themselves with the system. 
We tried a couple of di"erent technologies in our Design Systems but !nally 
se#led on ReactJS. Of course, you can build yours in any technology you 
want (including just CSS), but React is made for a systemic approach. Those 
React code snippets also have a CSS version separately available. That's 
because using React for every possible use-case would be an overkill. But 
having the CSS snippets allows you to keep things like animated banner ads 
consistent with the system as well. 
If your product is Swi$ or Java-based, you can also add platform-speci!c 
de!nitions (Colors in RGBA instead of HEX values), but even then add the 
CSS as well. 
CODE
VISUAL DOCUMENTATION
When describing larger components (like a product card), you specify (and 
link) all the individual objects the component is made of. They all should link 
to their own speci!c wiki pages. 
That kind of documentation structure will allow you to track exactly how the 
element is built, down to it's smallest non-divisible parts (atoms). It also helps 
with !nding the relations between objects and planning future product 
changes.
You can name each step of that nesting structure based on the atomic 
design approach, but it's not necessary. You can use your own names as 
long as the team agrees on the same naming convention. 
Bu"on
Card Component
Typography
Shape
Gradient de!nition
Gradient / PrimaryGreen
Color / white
TREE-LIKE STRUCTURE
+ ADD TO CART
+ ADD TO CART
+ ADD TO CART
Random Soda
Random Soda
$5.00
Refreshing soda with
a minty taste.
Yes
No
Version 10.09.2019
Yes
Test from 15.09.2019
Yes
No
Version 04.11.2019
Yes
No
Yes
No
Yes
No
Yes
No
RESEARCH AND DEVELOPMENT
When the descriptions, versioning, and history are all in, you can add the 
ability to document your research. We do it through a separate wiki page 
that exists between our regular history pages. The best way to explain it is 
by example: 
Let's say the radio-bu!on component interaction analysis shows a large 
number of clicks fell outside of its area. It means that many people missed it 
at least once when they tried to use it. Further analysis showed that the 
course of action is making both the radio-bu!on and the active area larger. 
A"er implementing that change in an A/B test has proven that the number 
of missed clicks has dropped drastically. Users were able to access the 
component a lot faster. 
The A/B Test results are then published on that bridging page between 
versions. If we're doing click-tracking (like in this example), we also publish 
them over the components to show the actual ratios. The research page 
serves as the reason for the change. It proves the change was made as an 
informed decision. When a new team member joins the project, they can 
clearly see the decision and what it was in#uenced by. 
A Design System
can help you focus 
on innovating,
without worrying
about small details.

---

## Sección 39: Core Concepts & Foundations [Entropy: 0.355]

A Systemic Approach to components and screens is the future of design. It 
allows you to focus on what's important (how things work) and not worry 
about the quality (as the components are pre-made and built correctly). 
Even if you don't plan on doing a large-scale Design System, at least try a 
systemic approach with documenting your design decisions outside of your 
design !les. 
It doesn't mean that each project and functionality can only use the same 
building blocks. You can use them as a base, but when designing 
completely new functions for the product, you can create a non-standard 
UI and simply add it to the Design System. 
That approach still leaves enough space for innovation, even in the visual 
details of your components. The Design System should be your baseline, but 
feel free to expand it and build additional components as long as they bring 
value to the project. 
To create a Design System team, you need at least:
 a UI/UX designer
 a product owner 
 a front-end developer
The best developers for the job are the ones who understand design 
and have at least the basic UI design knowledge already. Same with the 
designer - it's best if they understand at least the principles behind CSS. 
THE TEAM
SUMMARY
UI Aud
Audit
UI Aud
Audit
27.
UI Audit

When we look into redesigning an existing product, it's best to start with 
auditing the UI. It helps to de!ne what we know about the design and 
outline the areas that need the most help.
Even if we're the author of the design, it's essential to audit it every few 
months. This practice helps with staying up to date on the most exciting 
design concepts and best practices. Auditing o"en allows us to !nd and !x 
consistency problems that would otherwise build up, causing design-debt. 
The audits role is not to match the current hot design trend - they change 
way too o"en for it to make sense. The goal here is to check consistency, 
readability, colors, accessibility, and general style. Each audit should end 
with a short document outlining the most critical areas to improve. 
Quality Assurance is an o"en-overlooked process. Its underlying goal is to 
check how consistent the initial design is with the coded product. 
There are many methods to achieve this, but the most important thing to 
know is that QA is essential to UI quality. You should always !nd the time 
to go through this process. 
Audit
UI Audit
HOW TO ANALYSE THE UI?
QA - QUALITY ASSURANCE
DOCUMENT EVERYTHING
In the next pages, we'll go through each of these steps in detail and show 
you how to solve these issues the best way. 
While documenting, make sure you can do it in a tool to which most of 
your team members have access. Having many sets of eyes do the audit 
allows for a broader perspective. Use Google Docs, Dropbox Paper, or 
other, similar tools.
The !rst step of the audit should be documenting all the screens and 
interactions our product has. That includes states of the screen (like error 
messages or invalid form inputs). The next part is counting and analyzing 
all of the interface elements. Try to be clear and concise in your notes. The 
goal is to answer questions like:
How many typefaces and font sizes, weights, and styles our project 
uses? How many di"erent ones are on each of the screens? 
Count the colors and gradients in your product. Try to de!ne the 
purpose of each one.
Check the grid and layout of the project. What are the margins, 
paddings, and safe spaces? 
What kinds of shadows, borders, and border radii does the product 
use?
Do all the essential elements (both interactive and informational) 
adhere to the WCAG accessibility guidelines? Or do you have
a special interface version for people with impaired vision?
AUDIT COMPONENTS
Nearly all digital 
products get more
chaotic with time.

LOGIN SCREEN
Open Sans
Paci!co
11pt, Bold
17pt, Medium
14pt, Bold
14pt, Regular
14pt, Regular
20pt, Bold
22pt, Medium
Open Sans
Screens using it
11pt, Bold
17pt, Medium
14pt, Regular
14pt, Bold, Underline
19pt, ExtraBold
1
11
We use that method to analyze all of the remaining screens. You can put the 
table into a spreadsheet, with font styles in the rows and their usage counts 
in the column. This approach will help you !nd which styles and fonts are 
the most common, and which are only present once or twice. You can safely 
go on and get rid of the rare font-cases by replacing them with their nearest 
common style. 
As you can see, we have eight di"erent font styles on just one screen alone. 
Try not to exceed 3-4 styles per screen, as more than that causes processing 
delays and makes your design harder to understand. 
Once we have our list of screen designs, we start writing down all the fonts 
styles, sizes, and weights for each screen. For example: 
TYPOGRAPHY
Heading (H1)
Subheading (H2)
Paragraph text (P)
Text Link
Bu!on label
Meta Label
Based on the gathered data, we then de"ne the fonts, styles, and sizes for 
the essential UI elements. Try to re-use as many styles as possible - in case of 
typography, less is more.
For example, a text link with the underline removed can also work great as 
the bu!on label - both have the same function a#er all. Go on and remove 
as many styles as you can, while keeping hierarchy and structure.
Consistency is the key.
TYPOGRAPHY
COLOR VARIANTS
Go through every screen and grab the colors and gradient values with a 
color picker tool. Try not to miss any elements - all backgrounds, bu!ons, 
text, icons, and borders. 
The example above shows that a"er a while, we tend to deviate from our 
initially precise set of color guidelines. 
Before we start removing the excess colors, however, let's focus on trying to 
#nd out if they had a purpose. If an additional shade was necessary for the 
UI to make more sense, we keep it and add it to our initial list. Try only to 
remove colors that seem random or unnecessary. 
You can use variants of your base colors if you need more shades, but 
prefer to keep the interface consistent. Try experimenting with higher and 
lower brightness values to de#ne those variants. 
Base color
-10B
+10B
+20B
+30B
-20B
-30B
Colors de#ned on project start
Additional, random colors found in the audit
COLORS
The gradient audit works the same way. The main di!erence here is that we 
also have to write down the angle and the type of our gradient (linear, 
radial or angular) 
As you can see in the example above, even the same gradient can have 
di!erent angles that negatively a!ect consistency. Each instance of 
inconsistency should be documented and outlined. 
Don't forget to test the hover e!ects of your items (both cards and bu"ons 
are an excellent place to start). Sometimes an e!ect can only be seen once 
you hover or activate an element. 
90° Angle
45° Angle
180° Angle
GRADIENTS
Bu"on
Hover e!ect
Gradients de#ned initially
Inconsistent gradients found
If you have a consistent, de!ned grid (let's say 12 columns with 32p gu"ers), 
the !rst step is to apply it again to every screen. Then !nd all the places in 
which our layout doesn't match the grid layout. Take screenshots and write 
down the displacement amount.
In this example (a 6 column grid), we see that one of the headers and two 
bu"ons below are o# the grid. Write that down and proceed to the next 
screen. 
If an element has a similar out-of-line position with the grid on more than 
one screen, it's likely the easiest one to !x. Please write it down on top of 
your layout audit list and take care of it !rst thing. In most cases, a global 
size or position se"ing will do the trick.

---

## Sección 40: Core Concepts & Foundations [Entropy: 0.418]

The best practice in implementing design audits is to focus on the easiest 
!xes !rst and then go down the line towards the hardest ones. This way will 
yield measurable results in less time.
LAYOUT AND GRID
When you don't have a de!ned grid and it's not easy to !nd a structure, we 
can de!ne a so" grid instead. The best way to do it is by using the "Red 
Square Method" which we cover in more detail in the grids chapter. 
While de!ning a so" grid for a mobile app, start by measuring the most 
o"en used margin from the sides of the screen (box 1). If the number doesn't 
look random (like 11 or 13), we may have found our grid base. Values like 
10,12,15,16, 20 or 24 are the most common. 
Keep in mind the recommended value for mobile apps should be 16 and 
above. A"er !nding the base, we look for the second, larger spacing value 
(2). If that number comes directly from the !rst one (like being a multiple of 
it), we have found a rule. 
The example above shows some margins are uneven - especially on the 
right side and the bo#om. Note those out and schedule to !x it. 
1
1
2
2
CUSTOM, SOFT GRID
While designing for larger screens (like desktops and TVs), there's no point in 
!nding the margin from the sides - it can be di"erent for every device. In this 
case, try to !nd the so# grid by the spacing between the elements. 
With complex designs, this process can take a signi!cant amount of time. 
Try to use the most content-heavy screen to start, as it's usually easier to 
!nd a rule with more elements.
The most popular spacing should become your so#-grid base. 
All deviations from that number (especially if they're only a few pixels o") 
should end up on the list of inconsistencies. 
1
???
2
SOFT GRID ON LARGER SCREENS
Each object you design has a couple of characteristics that de!ne how it 
looks. These range from the most obvious ones like background-!ll, 
through border thickness, border-radius, shadow components (direction, 
alpha, blur), and more. 
Look at every text-!eld, checkbox or bu"on, and write down its border value 
(thickness), border-radius (in pixels), and shadow values. The shadow is one of 
the primary hierarchy se"ing components so that it can have a more varied 
set of values than border-related ones. More than one border thickness and 
more than two radius values should raise suspicion of inconsistency (unless 
they come from a conscious design decision).
Two border-radius values are OK with nested elements. When both objects 
have the same radius value, the diagonal space between their corners is 
di#erent than the area on their sides. Try adjusting the border-radius for the 
shapes to match more evenly. 
These rectangles all share the same background and border. They di#er, however, with border radii (4, 0, and 6) and 
shadow values (di#erent Y value and di#erent blur).
4px
12px
12px
12px
OBJECTS
Border thickness is especially vital while designing forms. All elements of 
equal importance should have the same border weights. An active 
(focused) !eld can have a stronger border to emphasize it, but all the other 
elements should be consistent. 
If you're using outline icons, you should also check their border thickness 
against your form !elds. If your form uses 2p border widths, try to make your 
icon border width consistent. 
The border-radius of our form should also de!ne the radius of our icon 
shapes. In this case, you don't need to count the pixel values but rather 
choose similar roundness of these objects. A rounded text !eld should 
always accompany rounded icons. With complex, multi-shape icons, you 
can't make every angle rounded, but it's the general icon shape that 
ma"ers.
Border = 2p
Border = 2p
Similar roundness
Too sharp
Too round
Border = 2p
Border = 1p / 4p
Border = 1p
Border = 3p
OBJECTS
Bu!on and form "elds should have a consistent height value throughout 
the entire project. Try to "nd interactive elements that are too small "rst 
(smaller than 20p height on desktop and smaller than 40p on phones). The 
size test in the audit is a two-part process - "nding elements that are too 
small (or too big) and "nding items being inconsistent between one another. 
Our project can have similar size bu!ons, with subtle di#erences between 
them or di#er only with internal padding around the bu!on label. As active 
elements are an essential part of any design, try to keep them as consistent 
as possible for clarity.
+ ADD
+ ADD
+ ADD
The smaller the height of a bu!on, the harder it will be to click on it (desktop) 
or tap on it (touch screen device).
Small di#erences in bu!on height
Various stroke-widths in radio bu!ons
Two icon styles in checkboxes
Di#erent inner padding
around the bu!on label.
+ ADD
+ ADD
+ ADD
+ ADD
INTERACTIVE ELEMENTS SIZES
Most common UI
problems, are o!en
the easiest ones
to "x.

NON-ESSENTIAL ELEMENTS
13.53
1.69
Example
Example
Contrast too low
Contrast in the right range
Accessibility analysis is an important part of the UI Audit. It's good to leave it 
for a!er we have the list of most common font sizes, weights and our color 
palletes created. The simplest way to test accessibility is by using a contrast 
checker plugin for your design tool. There is of course a lot more to 
accessibility than just contrast, and we recommend you explore the subject 
in more depth. But contrast is a good start given the sizes and clarity of the 
interface are already spot on. 
Every place in which your test elements don't meet the WCAG rules should 
be pointed out in the audit. (That's unless you have a special interface 
version for vision impaired users) 
If your design hierarchy is easy to understand it 
de"nes the relation between the elements. In 
that case decorative, non-essential objects can 
sometimes fail the contrast test. (Like light, so!-
shadows under a product card). But keep in 
mind that it's only accepted, when all the card 
elements have clear enough hierarchy so the 
background is not needed to de"ne its bounds. 
ACCESSIBILITY TEST
Purely aesthetic objects (like low-opacity decorations in the background) 
can be skipped during accessibility analysis. Their visiblity (or lack thereof) 
shouldn't a!ect the ease of use of the product. 
While testing coded components try to check if all your images have an ALT 
value (alternative text). All form elements should also have all the necessary 
labels and placeholders that help with them being understood by voice 
interfaces. 
Accessibility is a sophisticated, always-growing "eld so we suggest you 
explore it in more detail. In many cases doing it right makes the interface 
easier to use by everyone - not just the people with vision impairments. 
Decorative background shapes can have low contrast.
1.1
ACCESSIBILITY TEST
Auditing yourself
will help with
creating good
habits for future
designs.

---

## Sección 41: Core Concepts & Foundations [Entropy: 0.25]

Aside from the apparent quality improvements, a UI Audit also helps junior 
designers to !nd week spots in their projects. The next pages contain a 
special checklist that serves as a base for auditing a digital product. You 
can print it out or copy it to your task management so"ware. 
This simpli!ed checklist is also a great way to show the results of our audits 
to stakeholders and product owners. When you start your report with easy 
to digest !ndings, it will be much easier to convince the right people to act 
upon the problems and !x them. 
The method works just as well for both work-in-progress designs and fully 
implemented products. In the second scenario, it's good to have one of the 
developers to be a part of the audit team. 
Try to make a habit of checking your every design. It'll help you avoid many 
of the same problems later on for a more consistent, re!ned experience. 
Even if the eye for the right color or font choices comes with practice, 
consistency, contrast, and the right size of the objects in your designs will 
bring them to the next level.
Audit
UI Audit
DIY
GOOD PRACTICES
Audit
UI Audit Checklist
DESIGNINGUI.COM
Too many styles, fonts and sizes:
fonts
Consistent, de!ned typography.
Typography
sizes
styles
Inconsistencies in objects de!nitions:
sizes
Consistent sizes, borders, shadows etc.
Interactive elements
border radii
line weight
shadow styles
HYPE4.ACADEMY

Audyt
UI Audit Checklist
DESIGNINGUI.COM
Alignment problems:
Desktop inconsistencies
All the screens are aligned to the grid.
Grid / Layout
Mobile inconsistencies
There are too many colors and gradients:
all project colors
The design uses only previously de!ned colors, gradients 
and gradient types.
Colors and gradients
base (de!ned) colors
gradients
gradient angles and styles
HYPE4.ACADEMY

Develo
per Ha
ando!
ndo!
28.
Developer
Hando!

A!er carefully designing all our views and building the clickable prototypes, 
there comes the time to start the actual implementation. In many teams, 
this process means that the designer cuts out the assets (icons, images, etc.) 
and provides some basic guidance for the developers. Then they start 
coding the design, and the designer can focus on the next project. 
We don't recommend this approach. Designers should play a vital role in the 
QA (Quality Assurance) process by evaluating the precision of the 
implementation, testing, and tweaking the microinteractions. 
SAVE
SAVE
SAVE
Bu"on design
Design gets implemented
Feedback round
1st implementation
2nd implementation
This chapter contains the best practices, useful processes, and some 
additional knowledge on how to work with developers. We also try
to tell the story from the developer's side, so they can work with designers 
faster and more e#ciently.
When we test a real, coded screen of our app or website on the actual 
device, some tweaks may be necessary. That's why collaboration between 
designers and developers is essential even a!er the design process is 
complete. 
Devel
Developer Hando!
HOW TO WORK WITH THE DEVELOPERS
THE BASICS AND THE PROCESS
The development consists of two main parts (using a vast oversimpli!cation 
for the sake of clarity): 
Front-end: This is about coding everything the user can see. It contains the 
UI, animations, transitions and all kinds of calculations that can happen in 
real-time)
Front-end developers should be the designer's best friends, as they're the 
people we work with the most during the implementation. 
Back-end developers usually code things we can't see - the engine of our 
app and the processes happening in the background. They create the 
databases, connect everything, and make the product functional. They're 
o"en very far from any UI related issues. Still, sometimes their input is helpful, 
as they can provide valuable information about how design decisions can 
a#ect the performance of the engine. 
A full-stack developer is simply a combination of the two !elds above - 
someone who can do both front-end and back-end. 
The team responsible for implementing a design, however, is always the 
designer and the front-end developer. A typical process can look something 
like this: 
Wireframe,
UI Design
Library or 
Design System
Implementing
the Front-end
Testing
QA
Micro-interactions,
Prototype
Designer
Designer
+ Developer
Developer
LIBRARIES AND DESIGN SYSTEMS
Even if you don't plan on building a full design system for your product, it's 
still worth starting with a Design Library. That approach (even with the most 
basic library) will signi!cantly increase the precision and shorten the time 
required to implement it. 
You can create your component library at the very early design stages. It's 
worth doing early, as it will make it easier for the designs to be consistent as 
well. Some prefer to do the library near the end, once all the types of 
components are already done. Choose the way that works be"er for you. 
The design library is a separate !le, with all of the components from the 
main project. That includes things like bu"ons, inputs, dropdowns, and 
larger items like popups and product cards. They all should be de!ned and 
annotated in the design library !le. A good idea is also to add the CSS 
snippets next to each object (within your design !le).
Most developers will optimize that code and won't use it in the form shown 
above anyway, but it's good to give them all the properties separately just 
in case they need them. You can get the CSS snippets for each object 
from within most design tools available today. 
SAVE
font-family: Work-Sans;
font-size: 10px;
color: #FFFFFF;
le"er-spacing: 0.15px;
text-align: center;
text-shadow: 0 2px 4px 
rgba(0,0,0,0.12);
line-height: 44px;
background-image: lineargradient(0deg, #13B0B0 0%, 
#F4FF51 100%);
box-shadow: 0 5px 7px 0 
rgba(63,192,158,0.40);
border-radius: 3px;
padding: 0 24px;
margin: 8px;
CSS of this bu!on
THE TOOLS
The next step is transferring both our library and all the individual screens 
into a developer-friendly tool. These include Sketch Cloud, Figma, Avocode, 
Zeplin, inVision Inspect, and more. Once these tools process your design 
!les, they'll be able to get precise measurements of all objects, get their 
properties and relations, and more. These tools make the developer 
hando" process a lot faster and easier. 
UI Design
+ Library
Hando!
tool
Developer
Developer
Most of them require you to drag and drop your design !le, and then they 
can do their magic. Once the processing is complete, your developers can 
access all the project information in a developer-friendly form. That can 
include image assets as well. Because these tools are exact, if you mess up 
your grid, the developers will copy the wrong rules and code the entire 
project wrong. Remember to double-check everything before uploading. 
If you need to make those 1pt adjustments do them and then upload. 
You can also prepare the developer style guides yourself, without relying on 
external hando" tools. They make it easier, but together with your 
developers, you may come up with a dedicated process that works be#er 
for your speci!c needs. In any case, you need to be as precise as possible 
when designing and documenting your ideas. 
A designer that
knows CSS can
communicate
with the developers
a lot easier.

---

## Sección 42: Core Concepts & Foundations [Entropy: 0.37]

CSS BASICS
As we already mentioned in the chapter on Design Systems, we believe all 
designers should know CSS. It's not a real programming language, but rather 
a collection of properties and values that are easy to memorize. 
Each style you de!ne has a similar pa"ern of property: value;
background-color : #FFFFFF ; 
Property
Value
DISPLAY : NONE; 
The easy thing about CSS is that most of the commands are in plain English. 
The example above de!nes a background color for our object to be white 
(#FFFFFF in hex). CSS also understands some primary colors by their English 
names (white, red, orange, black, blue, etc.), but it's best to use the HEX or 
RGBa values for greater precision. 
Most design tools provide you with entire CSS classes for all the design 
objects, so you can quickly learn by simply creating an object (like a 
rounded rectangle with a gradient !ll and a shadow) and checking how the 
CSS for it looks like. Knowing CSS will make it a lot easier to communicate 
with the developers and will give you a background on how the UI is 
de!ned. 
One of the most common front-end developer jokes is "!xing something with 
a display: none;" which, of course, means hiding the object from view. They 
o#en joke that way about the most complex problems that they need to 
solve, so now you know why everyone is laughing :)
DESIGN BASICS
When (as a designer) you learn the basics of CSS, it's worth to convince your 
developers to learn the basics of design as well. It will make your 
cooperation a lot easier and will help you eliminate many of the most 
common problems front-end developers face nowadays (mostly alignment 
issues.)
When the developer can understand, that the design is not a work of art, but 
rather a precisely planned set of rules, it will help him transfer that into code 
with higher accuracy. The fewer QA rounds needed, the faster (and 
cheaper) the project is to build. 
Try to communicate the design process as a language, so they can learn it 
just like they learn programming languages. The design also has rules and 
methods and won't work if only randomly put together, just like code.
A developer who understands design and a designer who knows a li!le 
development is the best combination for creating impressive user 
interfaces. You need as much of that common ground as possible, and then 
you won't believe how much faster and be!er everything works. 
Design
Common
Ground
Coding
ASSETS
Most of the simple shapes (like bu!ons, carts, input "elds) can be generated 
directly in code. Even more complicated e#ects like double, colorful 
shadows or custom strokes can now come to life with good CSS alone. 
All non-standard shapes, icons, backgrounds, or photos are assets that we 
need to provide our developers separately. There are a couple of possible 
options on how to handle assets. Let's dive in. 
Simple, $at shapes or icons work best in SVG. It's a vector format that's webready and allows for easy scaling of objects without any loss of quality. 
Use PNG's for more complex images with transparencies. If you're designing 
for high-density displays (and trust me - you likely are), also remember to 
make an @2x (double the size) version of your "le. It will make the image a lot 
sharper on newer, more modern screens. 
JPG's are still the best choice for most photographs. In cases where the 
photo is quite "$at" and only has a couple of colors, you can try 
experimenting with PNG as well. Remember to "nd the right compromise 
between loss of quality and smaller "le size.
SVG
PNG
JPG
CUTTING OUT THE ASSETS
Most modern design tools provide you with the ability to export assets in 
various formats and versions at once. You can export an SVG, 2X PNG and 
a JPG in just one click. 
Sketch (v. 60) Asset export panel.
You can use presets to create your own 
combinations (like 1x svg, 2x png) and export 
them with one click. The slice icon (knife) allows 
you to create areas covering all the layers inside 
them.
The essential part of this process is making sure the resulting !les are small 
in size (kilobytes). That, of course, comes with some quality loss, and it's your 
job to pick the right compromise. The lower the !le size, the faster and 
smoother the coded design will work. Before you hand over the actual asset 
!les, you can optimize them manually. 
Optimization o"en means compression (which results in some quality loss), 
removing unused colors or meta-information (like the EXIF data which 
stores location and camera information for a photo and is not necessary.)
Some developers optimize the assets themselves. We believe this is
a job for the designer, as sometimes too much compression can negatively 
a#ect the interface. There are various online and o$ine optimization tools. 
The ones we use are TinyPNG, Compressor, ImageOptim, and ImageAlpha. 
Most of them are free - you can !nd them online.
Proto
rototyp
Protot
typing
29.
Prototyping

Interactive prototypes are a simulation of how the !nished product
will work. There are two main types of prototypes:
• code-less (inVision, Sketch, Figma) 
• fully coded (UXPin, Framer, HTML/CSS prototypes, Axure)
The code-less prototypes most o"en rely on image-maps, an old HTML 
technique of creating invisible links on top of static images. Those links lead 
to other images, giving an illusion of a working interface. In most of these, 
you can only interact with them through links, so all input or select boxes will 
become just a static representation. 
The fully coded prototypes are a lot more advanced, as they have most of 
the objects built-in code with full interactivity. In some cases, you can also 
apply additional logic to them or even use external data sources like Google 
Maps, YouTube videos, or music players.
They can have full, validating forms and be almost indistinguishable from 
the !nal product. In some cases, a"er tweaks, they can transition into being 
the front-end components of the !nalized app.
Prototypes also used to be divided into low-!delity (wireframes) and high-
!delity (visual UI designs). Still, given the growth of design systems and 
componentization of design, lo-! prototypes are very rare. They're also not 
that good for testing purposes, as low !delity gives your users a feeling 
they're not using a real product, and that can a#ect the test results in a big 
way. That's why it's best to stick to high !delity prototypes for most projects.
Protot
Prototyping
PROTOTYPING BASICS
WHY SHOULD YOU PROTOTYPE?
When designing new, exciting features for a product, the "how" of the entire 
process is mostly in your head. Sure, you can document it, but that can lead 
to the famous "game of telephone" problem:
not everyone understands you the same way. Messages get distorted and 
skewed. Whether it's stakeholders or your developers, having a "clickable" 
prototype is going to be a massive help for practically everyone on your 
team. 
If you're practicing speed-designing, (a technique of rapid iterations),
a prototype can help you identify potential problems and choke-points a 
lot faster.
FLOW DIAGRAMS
Most code-less design tools display prototypes as !ow-diagrams.
The idea is to connect screens with individual components by a series of 
arrows. 
A !ow diagram can also help give a birds-eye view of the navigation to your 
developers, so it's a good practice to add it to your project documentation 
along with a clickable prototype. 
A good prototype
is worth a thousand
meetings.
Ideo

---

## Sección 43: Core Concepts & Foundations [Entropy: 0.25]

CODE-LESS PROTOTYPES
Code-less prototypes are very fast to build and a great way to show the 
product to stakeholders while the design process still goes on. There is a 
quote, a!ributed to the company IDEO, that one prototype 
is worth a thousand meetings. That is true. It's a lot easier to show someone 
how a product works than to explain it in writing. It all started with paper 
prototypes, where you connect screen representations and create a nondigital "ow diagram. The natural evolution of this approach was the codeless prototypes that inVision has brought to the masses. The idea behind 
them is to use image maps linking objects on a screen to other screens. 
You can either link an object directly - for a bu!on it would only use its size 
as the clickable area, or draw the image map yourself and make it larger. 
From our experiences, the second option, while slower to build, allows you to 
make every active area a lot bigger, which will help with ironing out the 
initial navigation problems. The #rst option, however,
is closer to reality and can lead you to update your touch target sizes
if things turn out to be di$cult to click. 
SAVE
SAVE
Save process
con#rmation
screen.
You can either link an object to a screen directly or draw the linking rectangle yourself.
No ma!er which option you choose, the result will work precisely the same way. The second choice 
gives you additional precision for linking and can allow making the touch areas larger.
CODE-LESS PROTOTYPES
Most tools allow you to create the web-based prototypes without leaving 
the tool itself. Others use special plugins (like Cra! for Sketch to sync with 
inVision seamlessly). That makes the connecting and linking process so 
quick. It'd be a shame not to do it. 
Aside from connecting screens to each other, you can also select an action 
for "back" that always takes you to the previous screen. It's especially handy 
when there is more than one way leading to a particular screen, and you 
want to keep the "ow intact. 
When just sketching out the "ow of your product, you can stick to the 
default transition types. It's excellent for internal testing to have the "instant" 
transition where one screen replaces another. 
Before testing on real users or stakeholders, it's good to pick the appropriate 
transitions. The general rule is for the transition to show where each screen 
exists in space. So if you're going to the next screen in a series, it should 
move in from the right side. When going back, the back arrow is usually on 
the le! side, so the previous screen should slide in from the le! side. 
b
When transitioning from screen a to b, using transition 1, the 
actual movement of the screens is opposite to the transition 
arrow. Screen b slides in from the right side. 
When going back (transition 2) from b to a, screen a slides in 
from the le! side to show it's been there, behind the display the 
whole time. 
a
2
Do those transitions right, as they can cause a considerable amount of 
confusion, especially when they are opposite to what the user is expecting. 
We like to understand the order and relation between screens, and 
transitions are an excellent way to enforce that relation.
TRANSITION TYPES
CODED PROTOTYPES
Coded prototypes are a lot more challenging to build, as they require 
you to code all the components, interactions and transitions. Whether 
you create them in tools like Framer or UXPin or put together some 
HTML, CSS, and JavaScript, the general idea is to have an 
unprecedented level of interactivity. 
All forms should validate, all interactive objects should cause the 
desired effect, and all actions should have direct, micro-interaction 
based consequences. 
The aim is to be able to take those already pre-built high fidelity 
components and use them in the final product. It's blending the line 
between prototyping and front-end development, and with design 
systems, we believe this may eventually be the leading approach. 
A design system based prototype is a lot faster to build than coding 
every little object from scratch. They're easy to organize, consistent, 
and expandable. 
email@email.com
••••••••••••••
Code-less prototype (le!) only has one active area - the bu"on. You cannot 
enter anything into the text-#elds as they're merely a static image. A coded 
prototype (right), on the other hand, is, in essence, a real form (o!en with 
validation) so you can #ll all the #elds and then press the bu"on.
BLENDING COMPETENCIES
While code-less prototypes are easy to do for anyone, the shi! to coded 
ones requires a small competence shi! in designers. We o!en advocate at 
least learn CSS if you're a designer, and in many cases, that's enough to help 
the developer create the working prototype.
Front-end development is so close to modern design nowadays that 
learning a bit of React, or just plain JavaScript can be an excellent way for 
you to improve the quality of your work. 
This is why designers should understand front-end, while front-end 
developers should know design. That seamless collaboration allows for 
much higher "delity and robust prototypes, which leads to be#er user 
testing and superior end-products. 
Once you establish a design system, choosing a pre-made bu#on component will be quick 
and easy for the developer and will make the prototyping process much faster.
SECONDARY
PRIMARY
TERTIARY
Treat your coded prototype like a door to the "nal product front-end. The 
best teams consist of design-driven developers and designers who know 
a bit how to code. In most cases, one or two people from each category 
are enough at this stage. 
The important thing is to approach this with all the seriousness of a full 
product. You also need to test thoroughly both internally, and when 
possible, on real users. 
REAL DATA
When creating prototypes, avoid Lorem Ipsum and dummy images.
If you're showing a list of users, give every person a name and a photo. There 
are handy generators that can do that for you. 
By "real" data, we don't mean you need to hunt down your future users and 
force them to !ll the prototype with information. What you need to do is to 
simulate real data, so when a list item is a !rst and last name, don't write 
"First Name / Last Name" but rather create a virtual human to !ll that spot.
Don't duplicate the same person on the list, either. The whole idea of 
working with a prototype is to have it re"ect reality as closely as possible. 
Try and use the longest name and the largest numbers in your prototypes as 
well (at least in one place). That way, you'll be sure how it looks when you 
transition between screens. Is it still readable?
Or is an adjustment needed?
ACTION
Name
Title
+ ADD
Anna Smith
HR Manager
Q
Use "real looking" data
in your prototypes.

---

## Sección 44: Core Concepts & Foundations [Entropy: 0.295]

RESEARCH
There are two main reasons for prototyping. One is to make the 
stakeholders (like the CEO, or investors) understand how the product works. 
The other is to have a model of the product, on which you can conduct 
research. It's best to test on real users, but even internal, o!ce-testing can 
bring forward many issues you were not able to predict while designing. 
There are many research methods you can use, ranging from in-person 
interviews, screen recording, or heatmap generation. 
Some of those methods can help you identify "ow problems early on
- judging by how long it takes the user to accomplish the main task. 
Build your prototypes in a way that you can gather the research data, 
quickly adjust the prototype, and test again. This approach is crucial
for a functional, problem-free interface at every stage.
Avoid using dummy data and wireframe-like looking prototypes while 
testing, as the users don't treat wireframes the same way they do a real 
product. 
The whole concept behind prototyping is to be quick and agile. 
It's best to iron out all the possible problems before they go into the 
development of a fully functional product. Pulling back on that dev work 
can be both costly and time-consuming. 
Interactive
Prototype
Testing
and research
Show y
our wor
Show y
or work
1/7
30.
Show your
work

We are living in a very fast and noisy world. As of today, there are 14 Million 
shots on Dribbble. That means that 14M projects compete for the eyes and 
a!ention of viewers. A big part of success nowadays is having the ability to 
sell your work. And by sell we don't necessarily mean a transaction in which 
money changes hands. Selling is also ge!ing people interested in you and 
in what you do. Selling your work can land you a great freelance client, or a 
great, steady agency job. 
We still believe that great work will speak for itself, but sometimes it simply 
needs a li!le boost to be heard over all the noise. This chapter will cover all 
the main elements of presenting your work in a beautiful, eye-catching way. 
The idea is for your projects to shine, so you can be more successful at what 
you do best. Obviously the "rst and most important step is to have a great 
design to begin with, but let's assume we already have that part covered. So 
where do we start? 
Show 
Show your work
THE POWER OF PRESENTATION

PEOPLE BUY WITH THEIR EYES
We all know the old saying that you can only make the !rst impression once. 
This is just as relevant in the design world. This can be the di"erence 
between a potential client closing the tab with your portfolio a#er a few 
seconds, or scrolling through it's entirety a couple of times and as a result 
ge$ing in touch with you. 
Now, keep in mind, that if you're an UI designer that also does the broader 
UX work (like some basic research, prototyping, %ow-diagrams etc) your 
portfolio should re%ect all that. It should show all of your skills. It's not only 
about presenting some app screens in a nice way, but having a general, 
consistent presentation of your work. It also needs to have some form of 
"user delight" that's deliberately yours. In other words it needs to be both 
beautiful, and unique enough in some details that you are going to get 
remembered. 
Every great UI design 
needs a great 
presentation to reach 
a wider audience. 

WHEN IN DOUBT - ROTATE
When actually using a design, the best possible orientation is to have the 
screen facing us directly. But that is not the case when you're browsing 
images. Both rotation and 3D perspective are huge factors that in!uence 
how good we perceive a project to be. There are three main static ways to 
show o" a design.
Just showing o" a !at, rectangular design could still work well, if we give it a 
li#le bit of context or a nice background. 
But even a 2D rotation will actually make the project look a li#le bit more 
appealing for most people. Adding a well de$ned perspective can make 
an even be#er impression, but for it to work the design needs to be done in 
a way that works well in a 3D perspective. That means the diagonal lines 
resulting from the perspective transformation should not be distorted in any 
way or pixellated at the edges. 
Rotation and perspective are also a li#le bit more forgiving to some (small) 
grid or alignment problems in the actual design. By changing the 
perspective these problems are less likely to get noticed.
"Flat" rectangle
2D rotation
3D transformation
& perspective
CONTROLLED CHAOS
When you're designing a digital product, user focus should always be 
guided and enhanced. A chaotic design will result with the a!ention 
shi"ing endlessly between bu!ons, form #elds, images, icons and 
navigation without a clear, guiding pa!ern on where to start. This is bad. 
However, a presentation of the design doesn't have to strictly follow the 
same rules. That, of course, doesn't mean that total chaos is allowed. There 
needs to be some sense and reason to the presentation too. One of the 
ways of using controlled chaos is the popular grid of screens. Instead of 
showing just one or two shots from the project, you show a lot of them in a 
2d structure. It's good to add a li!le bit assymetry to the layout, which will 
make it interesting. 
A grid view can also be rotated (the most popular angles right now are 
between 9° and 13°) which is currently one of the ho!est trends in presenting 
digital products. The best thing about this approach is that it shows both 
the scale of a product, and how you designed various functionalities and 
screens, all in one image. 

Both 2D and 3D 
rotation have a 
huge e!ect on how 
well a project is 
received.

DEPTH AND ORNAMENTATION
An illusion of depth and a showcase of the functionalities can be a great 
way to create a good !rst impression. This can be done on a single image, 
or on a grid. 
The two main approaches are to either add depth to some of the screens (in 
a grid), or create additional overlays that extend beyond the edges of your 
screen. This can be as simple, as showing more of a card carousel, that 
would normally be cut-o" by the screen edge.
But you can get creative and also put noti!cations, or even some single 
icons on small overlays and place them on a layer above your design with 
the right amount of shadow to show depth.

---

## Sección 45: Core Concepts & Foundations [Entropy: 0.295]

DYNAMIC PRESENTATION
Unless you're designing for print or for a PDF, there's nothing stopping you 
from trying motion in your design presentations! They a!ract a!ention and 
also give the impression that a lot of work has been put into the project. 
Given how easy many animating tools are right now, that is not really the 
case most of the time, but it's de"nitely something we can use to put our 
presentations on the next level. 
One idea is to keep the screen intact and animate the device itself in 3d space. You can do it in tools like Rotato 
Camera. It allows you to set up the keyframes and it will animate the phone movement into a beautiful shot.
Obviously, the video #ows full of nice interactions and transitions of a 
product placed on a 3d-perspective will have the most impact, but they are 
also the most di$cult and time consuming to prepare. You can however use 
simpler forms as well. 
One idea is to simply animate the screen grid assembling itself, possibly with 
some background shapes moving in parallax as well. 
You can also add some extra moving layers on top, like the carousel cards, 
or a pro"le card that slides into place on one of the screens. There are no 
limits to creativity here, but keep in mind that these animations should not 
exceed ten seconds. They need to brie#y catch the a!ention, showcase the 
project and let the viewer go on to the next project. 
Experiment with the 
presentation style, 
but always keep it 
"on brand" with your 
personal touch.

PRESENTING NON-UI WORK
When you worked on a project, that had UI handled by someone else, 
you can still use UI / Visual principles to design a beautiful experience 
around the non-visual UX processes you did. 
One example is visualising stakeholder interviews as a card layout with 
a description next to it. You can put quotes from the example 
stakeholders on each card to show that the process had actual, 
actionable insights and outcomes. 
The same goes for user testing results, workshops and other parts of 
the process you took care of. Just use the visual principles to present 
parts of each process based on this chapter, and have a short 
description with more details. 
Startin
g a new
design
w desi
1/7
31.
Starting a 
new design

When you’re just starting out, it’s good to do the “project init” screens from 
scratch. That will give you the practice and con!dence you’ll need at that 
early stage. Many junior designers are scared to begin a project, with dozen 
of questions going through their heads.
And a lot more. But they all translate to: How do I start? 
In this chapter I will help you create your own starting templates and de!ne 
the good practices when starting a new design project from scratch. These 
rules are universal, and you can use them in any design tool you like, as 
they're not limited to just Sketch, Figma or Adobe XD. 
I will cover both an app design process, and a website design, including 
se"ing safe grids for landing pages and dashboards. 
If your !rst designs will be portfolio projects and you haven't decided what 
to start working on !rst, start with mobile apps. The smaller canvas makes it 
slightly easier when you're a beginner to achieve a satisfying result. 
What resolution should I use? 
How high is the tab bar? The status bar? 
How big can the font be in a mobile app? 
How small can it be? 
Can I have active elements smaller than 44 points if they're not as 
important on mobile? 
How do I set the basic grid for a desktop website design?
Startin
Starting a new design
THE BASICS
Let's start with projects for the web, as they're a li!le bit more complicated. 
If you're designing a dashboard or a landing page, you need to start by 
choosing the proper artboard size.
There are many suggested sizes out there, but looking at the most popular 
screen resolutions I think the best choice for beginners (especially working 
on a portfolio project) is 1440 points wide. Obviously the height of the 
artboard will depend on how much content you're planning to show and 
can range anywhere from 900 points up. 
Treat those 1440 points as "safe space" for some layout / background 
elements to occupy, but de"ne a narrower space for the actual content. I 
usually go with 1220 points. If you want to have a feel for how big the 
content will be, simply create a rectangle that's 1220 points wide and place 
it on your artboard. It should look something like this: 
Why 1220? The reason is simple, it's the easiest number to work with if you 
want to use an 8-point grid with 12 columns. You can use a 24pt gu!er with 
80pt column size. 
1440
WEB PROJECTS
Starting this way will make it easier to visualize how much space you have 
for the content, and how much for background elements, full-width 
headers and more. So let's create our 12 column grid based on a 1220pt 
full size. 
It's also important to understand why we're using 12 columns. It allows you 
to create sections on the website in the most possible con!gurations 
(1,2,3,4,6 possible equal section widths)
This is by far the easiest way to set your grid for a portfolio desktop project. 
Of course a "real" project may need a grid or layout dedicated to the type 
of content. (for example very complex, data-heavy designs may need more 
than 12 columns). 
2
4
Width: 1220pt No. of columns: 12 
Column width: 80pt Gu"er width: 24pt
THE GRID
A 12 column grid
is the easiest starting 
grid for desktop
projects.

Once you have your grid set up you can start by creating an outline of the 
information architecture, by simply placing the building blocks onto the 
artboard. For portfolio projects and landing pages it's good to create a 
header and footer that extend the full width of the artboard (and even 
beyond) while keeping the content within the boundaries. 
The most important rule is to keep the content within the grid boundaries 
and the content sections aligned to the grid. However, all decorations and 
background elements can break this rule to make the layout more 
interesting. 
Layouts with objects consciously breaking outside of the grid tend to be 
more interesting and engaging to the user. The most important rule is to 
only have a couple of elements like that on a page, as they will naturally 
a!ract the users focus. 
Header
Content
Footer
Header
Footer
Visual elements like illustrations,
photos and background shapes
can go outside of the grid, as long
as the main content "ts within it. 
You can also extend separate objects 
to drop beyond the header 
constraints. 
SETTING UP
If you plan on having a lot of sections on your page, try to avoid using the 
same, boring pa!ern for each one. We need some variety and some 
structure to focus and keep the engagement. 
The example on the le" has three main sections that end up looking boring 
and repetitive. Changing the background color in each section is not 
enough to achieve engaging content. Try to di#erentiate the sections in a 
way that make sense to show the content. If a section has less text, add a 
larger image next to it. If there's more text, you can separate it into columns, 
with the shorter call to actions completely centered with nothing on the 
sides. 
These varied layouts work especially well on landing pages, where the idea 
is to excite and sell an idea (or a product). For content browsing and other 
table-like forms of data it's best to stick to the same section style for each 
one. 
LANDING PAGES
There are some safe, well-known pa!erns you can use if you're not sure 
how to structure your "rst landing pages. Before experimenting you can try 
using these to get more comfortable.

---

## Sección 46: Core Concepts & Foundations [Entropy: 0.265]

The most common (and thus most understood by the users) header 
structure is having the logo on the le# side, but not larger than two layout 
columns, so it doesn't overtake the header. Then the smaller Call to Action 
should be right aligned within the grid - it can by a register / sign up bu!on, 
or a purchase bu!on. It sits naturally at the end of the F-pa!ern so if it's 
visually prominent it will de"nitely get noticed. The main navigation links 
can exist within the space between the logo and the CTA, in our example 
they're aligned to the right, but can also be centered or le# aligned. 
However, make sure the logo has enough safe-space on its right side if you 
plan to le# align the navigation. 
For the footer you can simply place the main menu again horizontally, or if 
you have more pages you can arrange them in vertical columns. Then keep 
the social media icons on the right side, as that's the place the users are 
typically looking for them. 
As usual, look at other landing pages before you start and try to get 
inspired for colors, pa!erns, section dividers and more. The best way to 
learn is trying to copy something you really like and add your own twist to it. 
SAFE PATTERNS
Logo
Navigation links
Small CTA
Sitemap links
Sitemap links
Sitemap links
Socials
First thing to do, is deciding on the device your design will “live on”. Again, if 
you’re aiming to build out a UI portfolio !rst, it’s likely up to you, whether 
you’ll use an iPhone or and Android as reference.
If you want a truly unique, engaging showcase of your work, you shouldn’t 
really use Material Design or iOS components all too much anyway. They 
make the project look generic, and in the fast-paced modern world people 
will simply scroll right through them without pause.
These two projects are of the exact same screen, yet one of them uses 
generic, boring pa"erns, while the other tries to make it a bit more unique 
and interesting. In portfolio projects you should almost always go with the 
option on the right, as you want your project to be noticed, remember and 
liked. 
MOBILE APP SCREEN
For portfolio projects
avoid using the generic
pa!erns, as they won't
stand out enough
to get noticed.

Android and iOS, although very di!erent as platforms, are constantly 
moving closer to one another in terms of UI norms. There are some things 
that should likely still be platform-speci"c (like text"elds in forms), but most 
of the design can be made platform-agnostic.
Pick your phone
So if you’re a daily Android user, design for Android. Try to pick a phone with 
a 16:9 or taller aspect ratio. If you’re in the Apple camp, go ahead and start 
with the regular iPhone 12 Pro (not Max).
Start with the basics
For this exercise, I’m going to pick the iPhone. The "rst thing to do, is adding 
an Artboard by pressing A on the keyboard. That shortcut is the same for 
most design tools. Find the right device on the list and select it.
iPhone 12 Pro
MOBILE APP SCREEN
Time to make
something awesome
over here.
The next thing is to add a status bar — you can do it from the build-in iOS 
library in Sketch. Figma also has a similar option. Then make a guide at the 
bo!om of your status bar and hide it. In showcase, portfolio designs they 
can be an unnecessary visual clu!er, so they’re o"en not shown. But the 
guide is there so you know which line not to cross.
Navbar
Navbar, or Android’s Action bar, is the title bar just under the status bar. It 
can have a couple of di#erent heights, and you can check the proper one 
in the guidelines. They do change every now and then, so here’s a di#erent 
idea, that will help you get the right height instinctively.
Go to your phone and $nd an app that has the navbar and background 
separated. It just has to show the division. Most of the built-in Apple apps 
are a good pick here. I picked one of the Se!ings screens. Then take a 
screenshot and send it to your computer.
Drop that screenshot onto your artboard, set another guide where the 
navbar ends, and then remove it. Now you know how high it should be, 
based on a real, visual product.
STATUS BAR
9:41
keep clear
design here

That will make it easier to remember and recall than remembering a 
number that changes every few years. It will also give you a lot more 
context of how things !t on the navbar, than simply entering some number 
into a box. You should end up with two guides nicely dividing your artboard 
into three main sections: status bar, navbar and the rest of the design. 
keep clear
navbar here
Design here
NAVBAR / ACTION BAR

Mobile grids can be scary. Coming up with the right one, and then sticking 
to it is something that doesn’t come easily. So instead of spending a lot of 
time on drawing grid-lines, make a so!-grid starting with se"ing the sidemargins. These are “lines you don't cross”. They’re also something most 
designers don’t pay too much a"ention to.
When the le! and right margins are even slightly di#erent, it shi!s your 
entire design optically to one side and has a negative impact on 
readability. That’s why I believe it’s a good place to start.
The main two so!-grids right now are an 8-multiple and a 10-multiple. 
I covered them more extensively in the grids chapter with both the pros and 
cons for each one. It means that 8 and 10 respectively, are usually the 
smallest margins your content can have. Then 16 and 20 are one step 
higher, with 24 and 30 being the next set of values.
Design needs to breathe, so for most mobile projects I set the margins at 
either 24 or 32 points. For dense projects with a lot of data in column views, 
it’s best to go with 24, and for simpler, less condensed screens let's use 32. 
It's a safe way to end up with a nice looking result. 
SET THE MARGINS
keep clear
navbar here
Design here
??
??

24 or 32 are the best 
starting margins for
your very !rst mobile
app projects.

For your very !rst few projects start with 24 points as the margin and make 
sure no content (except for the background and decoration) ever exceeds 
that space. Then use that number and smaller numbers to set up the right 
hierarchy in your design.
If you have a rough idea of what you’re trying to design in mind, you can 
start by blockframing it. It’s a useful technique of working with “boundingboxes” instead of content. Just make sure they’re all properly aligned. For 
example, if you wanted to recreate a popular photo-sharing app it would 
look something like this:
Blockframes are a good way 
to understanding the rigid 
rules behind a good design. 
Because of these uniform 
shapes, it's easy to get a feel 
for proper alignment before 
you start adding real, visually 
varied content. Just make sure 
the margin between the 
elements also comes from your 
grid se"ing. 
SAFE MARGINS
keep clear
navbar here
Design here
24

---

## Sección 47: Core Concepts & Foundations [Entropy: 0.295]

Each element’s height, 
width and position in 
relation to other objects 
should be thoughtfully 
calculated and planned. 
Don’t leave anything 
to chance.

Rule of Proximity is essential here. The closer the objects are, the more they 
are perceived as a group that belongs together. When designing a card 
layout, obviously the content inside the card will be closer together, than 
the cards themselves. The main bene!t of blockframing is that it's a lot 
easier to apply that rule. Let's look at it from a perspective of one single 
piece of the layout - the card. 
The card here is the main "group" so it's positioned 24 points from each side 
of the screen. The circular photo is another group, but it resides inside the 
card, so it's positioned at 16 points from each side. The text content 
blockframes are yet another group, so they're positioned 16 points from 
each side, but the space between them is 8, to show they belong together. 
Use that rule to easily group common sections together. 
When you replace the blockframes with real content, some of the 
perception may be lost. That's ok, as long as that content sits within the 
boundries set by the blockframes. You can !nd out more about the 
purpose of blockframing in this wonderful article by Jon Moore: 
h"ps://medium.com/ux-power-tools/blockframing-and-31-freesketch-ready-layouts-using-auto-layout-by-anima-
24
24
16
16
16
8
BLOCKFRAMING

Now back to our example photo-sharing app. Once you have the 
blockframe complete, you can group it and lock it with reduced opacity. 
Ten percent will be enough if you use the right color that won't blend in with 
the content too much. 
Then start adding the real content but !"ing it within those strict guidelines. 
You can in some cases get the descenders of lowercase le"ers (y, j, g and 
the like) get outside of the blockframe boundaries - if they do that's also OK. 
As long as the CAP-height is aligned to the blockframe the layout will still 
work well. 
BLOCKFRAMING

A!er you’re done with this part, simply hide the blockframe group and 
you’re all set. You can then also hide the guides and notice how the layout 
starts to "naturally make sense" without them. 
Of course you can still re"ne the grid and spacing using the Golden Ratios 
and other sophisticated design rules. Yes - it can be made even be#er, 
more readable and easier to process. But for your "rst couple projects this 
rule will save you a lot of headaches and will allow to get to satisfying 
results much quicker.
The same rules also apply to 
more complex, organic layouts 
with background shapes and 
pa#erns that fall outside the 
rectangular grid. Strictly focus on 
aligning the content not the 
backgrounds.
BLOCKFRAMING

Spacing alone can set 
a clear, visually a!ractive
hierarchy of on-screen
elements. Combine it 
with the right sizing
for the best e"ect.

design
uccess
design
uccess
1/7
32.
Success in
design

The goal for this book, was to condense our years of experience into a form 
that you can easily use to become a be!er designer. I am happy to say that 
we succeeded (judging by the countless emails from our readers). But 
knowing how to set the typography, how to pick the right color pale!e or 
how to make nice bu!ons is only one part of the story. 
What I want you to have at the end of the day is success as a designer. 
Stories like this are the ones that I like to hear the most. All those emails 
saying how a"er reading this book you leveled up, got a promotion, a raise, 
or launched a successful startup are heartwarming and make the time 
writing this completely worthwhile.
Success doesn't come from the design knowledge alone. In this chapter 
I want to give you some tips on how to use the knowledge from this book to 
your advantage. You can help your "luck" and directly in#uence the 
chances of success. Whether you want a more exciting, be!er paying job, 
or start your own thing. This chapter is going to be a lot di$erent and more 
personal than the rest of the book. Let's go! 
Succe
Success in design
STAND OUT FROM THE CROWD
Working hard vs working smart has been a mantra of many self-help books 
for years now. They o!en try to give you "hacks" that you can use to "work 
smart". It's like a get rich quick scheme, but the sad truth is that it likely won't 
work. But don't worry. 
The "working smart" part here is the fact that you're reading this book. You 
could obviously learn all this on your own. Successful designers did exist 
before we released Designing User Interfaces. But "nding the right sources 
that also make it easy for you to understand them takes time. A lot of time. 
So in this case you can already check-o# the working smart part.
Now it's time to work hard. 
If you "nished the book, you got through the "rst part of this process 
already. You have a solid base, a foundation on which you can grow as a 
successful designer. But that success is not going to happen overnight. 
There are a couple of factors that can determine whether an employer will 
pick you, or somebody else, and design knowledge is only a small part of 
that. 
Things like charisma, con"dence, portfolio, ambition or even being fast on 
your feet, can all determine your chances for success. People (employers 
included) are not an AI, that determines an outcome based on the input 
(knowledge). And while I can't teach you some of these things, I can point 
you in a direction that de"nitely helped me. 
Big part of my life I've been an introvert, afraid to speak up, afraid to step to 
the front and afraid to take chances. Some parts of that you can modify, for 
others you can simply "nd a workaround. But don't worry, you don't need to 
become as charismatic as a talk-show host overnight. 
THE PATH TO EVERYTHING IS HARD WORK
You've got a solid
foundation. Now it's
time to work hard.

Let me tell you a li!le secret. Designers are one of the luckiest people in this 
whole digital industry. As most of IT we can of course work from anywhere, 
and photos of a laptop, running Sketch or Figma with a nice beach view in 
the background aren't that uncommon. We can travel the world, enjoy it, 
make some good $ and experience freedom. 
But there's also one other part of this that's o"en overlooked. Design 
(especially interface design) is becoming increasingly agile. Combining that 
with practice, experience and some speed designing techniques you can 
actually switch from an hourly rate to a per-project basis. With some 
practice you can work 4-5x faster, completing all your daily work in 2-3 
hours and enjoying life. Or using that extra time to do another project to 
enjoy more money. It's all up to you. 
Developers don't really have that advantage, as there aren't really many 
ways they can "code faster". The sheer complexity of what they do simply 
makes it nearly impossible. For us, designers it's a world of opportunity that 
is only waiting to get noticed. 
And sure, ge!ing that experience to be able to work that fast requires a 
grind at #rst, but what's a year or two of grind compared to what comes 
next? I've been there through the hard-way. Both at various agencies that I 
worked for, and running my own company, grind and crunch were 
practically a daily thing. But now looking back I see that I wasn't having the 
smart approach to hard work. 
It's important to prioritize things that are actually bene#cial, instead of 
doing everything, overwork yourself and fall asleep on the keyboard 
dreaming of working even harder the next day. Hard work has more to do 
with discipline and internal consistency, than working crazy hours, 
neglecting your health and wellbeing. Let me share some tips with you. It 
can actually be a fun ride.

---

## Sección 48: Core Concepts & Foundations [Entropy: 0.325]

BUT WHY?
Charismatic? Me? No way! That's what many introverts say and it's 
something that can't be pushed upon you. Some people can become more 
charismatic, while for others it's simply something they'll never be 
comfortable with. But don't worry, because you can still be successful! It's all 
about identifying your strenghts (and the already mentioned hard work). 
So you don't need to be a swi! talker, if your portfolio blows away everyone 
looking at it. Or if the sheer number of portfolio projects you've completed 
shows ambition and dedication. 
Challenge yourself.
I think the best way to start is with things you de"nitely can control. One of 
the best ways to grow as a designer is to actually design a lot. Put a daily 
design challenge upon yourself for at least a month. They don't need to be 
big, complex projects. Anything between 30 minutes and 1 hour to 
complete is good. But make sure you actually commit and do it every single 
day. Yes, that includes the weekends. Think of this as a workout for your 
design skills. 
I know it's hard. I know that a!er work or school, you o!en don't have the 
strength to do anything but Net#ix-and-chill. But trust me with this. 
Relax is important, but having a robust portfolio will actually lead to a lot 
more relaxing and a lot less stress later on. That "rst year or two of hard 
work makes it way easier in the next stage, when you stop being a junior 
designer and start to work on your own terms. 
Besides you don't have to ""nd the time". You need to make the time. It has 
to be a conscious e$ort to sit down for at least 30 minutes each day and 
work on your future. 
IDENTIFY YOUR STRENGTHS
It's not easy. I know. Even writing the last page I took like 8 breaks because I 
couldn't focus. We have worse days, we have moods, we can feel under the 
weather. We're only human. But the reward of actually completing even a 
small exercise to be!er yourself is going to stay with you a lot longer. 
So how to beat procrastination even if for thirty minutes every day? 
I have a few tips for you, that I tested on myself. Try and see if they work for 
you. Some may be helpful to get motivated to work more than just 30-60 
minutes a day of course. It's just a starting point for skill, experience and a 
be!er portfolio. 
There are two techniques that I found the most e"ective. You can do them 
both together, or pick one that you prefer. These are:
• Time blocking
• Notebook based, paper to-do lists 
Timeblocking is simply creating a calendar appointment for yourself. Pick a 
time you know you'll be available at. Put your phone on Do Not Disturb and 
simply dedicate that 30 minutes to do as much as you can. If you can 
prolong it, do it. If not, then just stick to the half-hour blocks #rst. 
You don't need to do it at 
the same time each day. 
Just make the time 
between other activities, 
before them, or a$er 
them. Plan it for a week 
ahead and stick to it.
SWEET PROCRASTINATION
Monday
Tuesday
11
1
My Daily Design
My Daily Design
30 minutes a day for a 
month compounds to 
achieving success 
much faster. 

Timeblocking works, because it creates an urgency of a meeting with 
yourself. If it's scheduled for a speci!c time and you won't show, it creates a 
dissonance. Our brains hate that inconsistent feeling so by doing this we 
actually trick ourselves not to procrastinate. 
The fact that we are living in an absurdly digital world makes pen and 
paper hold an especially important place in our minds. That's why a Paper 
To-Do list proves to be very e"ective. I use a small notebook as a to-do list 
for the most important things I want to accomplish on a day. 
The layout is simple, the date at the top, and li#le squares with tasks next to 
them. But because it's wri#en in pen, I can't erase it. I can't "move" a task to 
another day. It's "set in stone" and it feels really bad to actually skip an item 
on a day. 
To make the experience more fun you can also add some other, smaller 
and easier to complete tasks next to your main thing on each day, so 
checking them o" will give you that li#le boost of endorphines. That in turn 
gives you motivation to tackle the more di$cult things next. 
And that way, day by day, you'll be ge#ing that "extra" practice. It doesn't 
ma#er if you're just hoping to start in this industry, or if you already have a 
design job. Going at it daily, even if for a short period of time will transform 
you for the be#er either way. 
That's why the advice in this chapter is not for beginners alone. To stay on 
top of the techniques, trends, good practices and pa#erns you need to 
explore new things that are outside of what you normally do at your job or 
at the course or bootcamp. 
SWEET PROCRASTINATION
I'm keeping my !ngers crossed, that these techniques and your own 
motivation will lead you to actually complete a 30-day design challenge. 
Keep in mind, that most people quit around day 6. If you make it to day 10, 
you're well on your way of completing the challenge. 
During those 30 days you should focus on designing the most popular 
interface elements there are. You know, the things you see in most 
products. Start with forms, there's plenty to do there. Do a login, registration, 
no-password login, forgot password form, or a pro!le edit screen. Then 
move over to dashboards, data visualisation (graphs), chatbots and more. 
But every now and then do something less "design'y". Do a "oating, 
glassmorphic credit card on a nice, blurred background with faux-3d 
spheres around it. Or a bunch of product cards "oating in space. These 
creative, more-visual outbursts are what will help you !nd your own "style" 
of interface design. That style is a mix of various design trends and pa#erns 
with your own personal touch as a cherry on top. 
Finding that style will take time and e$ort, that's why you need to 
consistently do a design every single day. You can follow tutorials if you wish 
as well, or if it's easier. Just !nd ones that can be fast and easy to complete. 
The goal of the !rst 30 days is to gain con!dence in moving rectangles 
around. 
Ok, but what's next? 
Once you realize you can accomplish something like that, you can apply 
that dedication and motivation towards the next steps in your design 
career. And that by no means is an invitation to stop doing the challenge. 
The more you do it, the be#er you'll be. 30 days is just the beginning, but 
passing that mark will make it a breeze to continue and your future self will 
thank you for that. 
30 DAYS LATER
Make sure there are 
designs in your design 
portfolio.

---

## Sección 49: Core Concepts & Foundations [Entropy: 0.295]

Aside from the personal traits (that you can !nd plenty of resources on how 
to train online) there's one other piece that instantly sets you apart. I'm 
talking of course about your online portfolio. 
But before we get to that, you need to understand that the landscape of 
the wide genre of "UX design" or "Product design" is so chatoic and 
convoluted, that the word "portfolio" can mean very di"erent things to 
di"erent people. I want to share with you my vision, based on my 
predictions of where the industry is heading. In short - the multitude of job 
titles will be simpli!ed to researcher and designer. 
That's why UI's are an important part of a design portfolio (also because 
potential employers and consumers also "buy" with their eyes). But you also 
need to show that you understand the overlaying "experience" element. 
That means that the best portfolios are a good mix of beautiful visual 
design, with descriptive thought processes explained in text or video. You 
can add a li#le bit of research (like stats from surveys you created) to show 
versatility too. It's extra points when you, as a designer, can clearly 
communicate with researchers in the team. 
I believe the era of "UX portfolio without UI" is coming to an end. Only some 
companies still work with that detached, multi-function way, but more and 
more are embracing generalists. If you feel be#er with planning $owdiagrams or information architecture, then of course you should highlight 
this as your strength. But make sure to also show that you're able to make 
a semi-!nalised design out of them if the need arises. 
The best portfolios are a self-hosted, simple websites with short case 
studies. Knowing a typical product design start with ideation phases, and 
ends with a high-!delity prototype, show this exact process in yours. 
PORTFOLIO
A good portfolio should be as unobtrusive as possible. What works best in 
presenting your work is going as minimal as possible. Same goes with your 
Resume. Simple layouts, not too many font sizes and readability should be 
at its core. If you have a lot of projects, it's best that the interface of the 
actual portfolio is not overtaking the designs. A!er all this is what people 
are looking in portfolios. 
But at the same time, using a pre-made template can ruin that ""rst 
impression" that you can only make once. Of course if your portfolio is a 
work of beauty (but still readable!) in itself, it'll likely make an impression 
even before the clients or employers see the designs. If you can make 
beautiful 3d transitions, amazing visuals and so on - go for it. But the 
problem is, that most junior designers aren't yet on a level to deliver that 
portfolio "wrapper" well enough. That o!en results with a very visible "trying 
too hard" vibe that falls #at with the viewers. 
The safest way is to go minimal, but show the scale of your work. You can 
even state the number of individual projects on the page near the top to 
reinforce that. Of course don't do it if the number is lower than 10, because it 
can have an opposite e$ect. 
Make sure you write a short bio and include a photo. The bio should simply 
explain your story with design (why, how and when you started), your future 
goals and tools or techniques you're exploring (the more the be%er). Avoid 
having "progress" bars next to the apps you know or skills you have. If you're 
con"dent you know Sketch and Figma, just write that you know them. 
Potential employers o!en look at the tools you use "rst (before looking at 
projects) to "nd out whether you're a good "t to how the company works. If 
they work in a speci"c tool, that you've never used, chances are the 
onboarding process will be longer and that may result in them picking 
someone else. 
PORTFOLIO
Unless you're applying for a purely UI designer role to some of those 
oldschool companies who still use that division, you need to have a bit 
more than just images. Case study sounds very sophisticated and likely 
over-the-top for what you have in for-fun projects, so let's say the proper 
term would be mini-case-breakdowns instead. Ge!ing people interested is 
strongly connected to the storytelling element. If you've made an app 
project you'd like to show o", write a "fake bio" of that fake company and 
their fake product. One or two short paragraphs is #ne, and makes a nice 
intro to the project. Just make sure to state that this is all a part of the 
process, so viewers understand it's made up. 
That description should also cover the general problem the product is 
solving, how it's doing it and what other choices you've explored and 
decided not to take. (These can be bullet-points). If you've created some 
twi!er surveys (great way for portfolio-research examples) add them here 
too.
The next step is to come up with a $ow diagram at least for the parts of the 
screens you've designed in high-#delity. Show the connections between 
them and try to make it in a beautiful, visual way - even using card 
components from the actual app for that $ow for consistency. 
A%er that some people do low-#delity wireframes, but with the way design 
tools work now, they're likely going to be less and less important in the years 
to come. Mention creation of the base, high-#delity components (like form 
#elds and bu!ons) as the next step instead (call it a pre-design-system 
component library if you want some extra points ;). Of course show a couple 
of them visually too. 
And a%er that show the visual designs in the best possible light and you're 
all set!
CASE STUDIES
Low-!delity 
wireframes are slowly 
becoming less relevant 
in portfolios. Show 
other parts of the 
process instead. 

Aside from the personal traits (that you can !nd plenty of resources on how 
to train online) there's one other piece that instantly sets you apart. That 
part is being active in the community on various meetups, panels and even 
solo presentations. 
For years there has been a problem of facing stage fright and wasn't even 
considered by many introverts. But now, in the era of online events it's easier 
than ever! 
If there are any junior-friendly events out there, volunteer if you can. Many 
beginners are afraid of speaking in public, because they feel that they don't 
have anything to say yet. And while obviously years of experience can help 
with having an interesting keynote, any of your current experiences are also 
worthy of sparking interest. 
Imagine - many people on your level are going through similar struggles, 
problems and pa"erns as you. Sharing your path, be it a case study, or 
discussing a failed project, can lead you to becoming a voice that's known 
in the industry. So share what you know already and be honest. You'll 
quickly see that it's enough to be interesting. 
Make slides for your main points, practice a lot before the event, but keep in 
mind that with online events you can have an entire printed "script" of what 
you have to say in front of you. That should decrease the tension and make 
it easier - you can always look at the script for help. 
When I was just starting to go on stage years ago, my technique was to 
prepare a lot of slides. At least three slides for a minute of time. That led me 
to always being able to improvise something when you can only discuss 
something in 20 seconds. But it all depends on how talkative you can get. 
TAKE THE (VIRTUAL) STAGE
Be active in places where other designers are. Dribbble, Twi!er, Medium, 
Instagram - they all provide a place where you can "nd inspiration, talk to 
like-minded people and make your "rst "design friends".

---

## Sección 50: Core Concepts & Foundations [Entropy: 0.265]

Being a part of that community (a worldwide one) will also help you to grow. 
Even if you read one "ve-minute design article a day, you'll see that 
knowledge compound into automatic design decisions in your actual 
projects. If you can, share your work and your struggles, ideas and more on 
social media. That will open a world of opportunities for you, like appearing 
on podcasts, invitations to speak at online events, and even possibly job 
o#ers. 
You can also do basic research on Twi!er if you don't have any real projects 
just yet and need at least basic research examples for your case studies. 
The possibilities are endless, and if you truly want to be a successful 
designer, then get out there and talk to people. Even when you best design 
alone (like I do), design is a team sport and there's plenty to learn from 
everyone around you. 
If you have the dedication, you can start a blog (or a Medium page), or a 
YouTube channel, but keep in mind that these things will take your already 
limited time, so they'll likely require you to commit even more time to your 
growth. That means there will be less time for other activities. That's why it's 
everyone's personal decision to take. 
But if you can't even do 30 minutes a day for a month to grow your skills, 
your road to success will be much harder and longer, if not impossible. 
Good luck!
BE ACTIVE
We wish you all the success in 
the world! Thank you for being 
with us!
Michal + Diana.

Summa
mary
Summa
mary
33.
Summary

Summ
Summary
Congratulations!
You've made it to the end of the 2021 edition of "Designing User Interfaces." 
Thank you!
You can also join our Slack Community by simply sending us an email. 
All the updates until the end of 2021 were free for everyone who purchased 
the book. We are also working on our second, slightly more focused book 
(smaller), a video course and more. We'll o!er considerable discounts to all of 
you who purchased the current edition of this book.
Don't forget to follow us and let's connect!
Our company website - www.hype4.com
Our company on LinkedIn - www.linkedin.com/company/hype4
Michal on YouTube - www.youtube.com/c/malewiczhype/
Michal on LinkedIn - www.linkedin.com/in/michalmalewicz/
Diana on LinkedIn - www.linkedin.com/in/dianamalewicz/
Michal's Twi"er - h!ps://twi!er.com/michalmalewicz
Diana's Twi"er - h!ps://twi!er.com/dianemalewicz
Michal's Medium - www.medium.com/@michalmalewicz
Diana's Medium - www.medium.com/@dianamalewicz
HYPE4 Academy on Instagram - www/instagram.com/hype4academy/
THANK YOU!
Big thanks to all of our friends and family! We know how hard it had been for 
you to listen about box-models and bu!on alignment over dinner!
Thanks to the core team of HYPE4 for all your support during this ordeal: 
Albert Pawłowski, Szymon Adamiak, Albert Walicki !
Special thanks to all our friends who a!ended our DGS events in Sopot, 
Poland. You shared so many designs problems and issues with us that we 
knew what to focus on "rst and to our SquarePlanet community.
Thanks for all the help with marketing tips, promotion, "rst reads to :
Patryk Kościelniak, Kacper Wiśniewski, Piotr Canowiecki, Brian Egan, Silvia 
Bormüller, Fabricio Teixeira and the entire UX Collective!
Book Website (www.designingui.com):
Design: Diana Malewicz
Development: Albert Walicki / HYPE4.com
Photos from: Unsplash.com
This book and all the visual examples were all designed in 
Sketch (www.sketch.com) which is our favorite UI design tool 
(and it works for ebook design too!)
OUR OTHER BOOKS
Good design is one thing, but a bad developer 
can ruin even the best projects. This is why we're 
creating this special book for Front-End 
Developers that will help them get to the next 
level, earn more and do a way be!er job!
You can sign up for discounts and free 
downloads at: 
h!ps://frontendunicorn.com
Aside from my own startup experiences 
ranging from 1999 until today, I also interviewed 
dozens of founders who managed to make it, 
o"en against all odds, and distilled their insight 
into easy to follow examples of what to do and, 
most importantnly - what NOT to do in the 
startup world. 
You can sign up for discounts and free 
downloads at: 
h!ps://thatstartupbook.com

2021 - VERSION 3.2
Thanks for your feedback and comments. Here's a list of people who 
contributed to this version in some way.
Updated on March 15th.
Albert Pawłowski,
Kinga Maciąg,
Katarzyna Kędzielska,
Marcin Kwiatkowski,
Paulina Dąbrowska,
Kamil Markiewka,
Rosie Way,
Kévin Venni$i,
Luis Cislaghi,
Axel Beyer.
www.hype4.academy
www.designingUI.com

---
**Conexiones del Grafo (Obsidian):** [[INDEX]] · [[DESIGN_MASTERY_2026]] · [[AGENT_CREATIVE_AND_VISUAL_AWARENESS_2026]] · [[CANON_REFACTORING_UI_WATHAN_SCHOGER]] · [[CANON_PRACTICAL_UI_ADHAM_DANNAWAY]] · #ui_ux_design
