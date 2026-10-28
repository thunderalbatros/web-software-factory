# 📚 Libro Completo: dokumen.pub secure apis design build and implement 1

**Alcance:** Fuente bibliográfica completa sobre Web Software Factory, UI/UX, Architecture & Interactive Systems (dokumen.pub secure apis design build and implement 1 — Technical Author). Aplicable a la Web Software Factory. NO sustituye las reglas inmutables en `CANON_*`.

> **Autor:** Technical Author  
> **Dominio:** Web Software Factory, UI/UX, Architecture & Interactive Systems  
> **Archivo Fuente:** `dokumen.pub_secure-apis-design-build-and-implement-1.pdf`  
> **Páginas Originales:** 376 (100% Ingerido, Cero Truncamiento)  
> **Secciones Técnicas Extraídas:** 202 (Entropía Técnica Media: 0.346)  
> **Fecha de Ingesta:** 2026-10-27  

---

## Sección 1: appendix C [Entropy: 0.265]

API security checklist
Setting up Auth0 for authentication and authorization
API security RFCs and learning resources
vii
contents
foreword
xii
preface
xiv
acknowledgments
xvi
about this book
xviii
about the author
xxiii
about the cover illustration
xxiv
1 What is API security?
1.1
What is API security?
1.2
What is API security by design?
Design 8
■Implementation 10
■Infrastructure 10
1.3
Why is API security important?
1.4
Unexpected vectors of attack
1.5
How API security fits into the API development cycle
1.6
The rapidly changing landscape of API security
1.7
Who this book is for and what you will learn
2 Aligning API security with your organization
2.1
Evaluating your API security posture
2.2
Threat modeling is a team sport
Application decomposition 28
■Threat identification and 
ranking 29
■Response and mitigations 32
■Review and 
validation 33

CONTENTS
viii
2.3
Act now!
Document your APIs 34
■Strengthen authentication and 
authorization 34
■Use proper API libraries 36
■Use cloud 
protection tools 37
2.4
Creating an API security program
2.5
Aligning API security with your organization
2.6
Navigating API security audits
3 API security principles
3.1
Shift-left API security
3.2
Zero-trust APIs
3.3
Validate everything
3.4
No such thing as an internal API
3.5
You can’t protect what you don’t know
3.6
DevSecOps for APIs
4 Top API authentication and authorization vulnerabilities
4.1
Running the code examples
4.2
Broken object-level authorization
4.3
A practical example of BOLA
4.4
Broken authentication
4.5
A practical example of broken authentication
4.6
Broken object property level authorization
Mass assignment 88
■Excessive data exposure 92
Practical example of excessive data exposure 95
4.7
Broken function-level authorization
4.8
A practical example of preventing BFLA
4.9
Unrestricted access to sensitive business flows
4.10
A practical example of mitigating abuse of vulnerable 
business flows
5 Top API configuration and management vulnerabilities
5.1
Unrestricted resource consumption
Fending off a DoS attack 109
■Addressing unrestricted 
resource consumption with code 112
5.2
Server-side request forgery
CONTENTS
ix
5.3
A practical example of mitigating SSRF
5.4
Security misconfiguration
5.5
A practical example of mitigating security 
misconfiguration
5.6
Improper inventory management
5.7
Unsafe consumption of APIs
5.8
Addressing unsafe consumption of APIs 
in practice
6 API security by design
6.1
What is vulnerable API design?
6.2
Predictable identifiers
6.3
Unconstrained user input
6.4
Flexible schemas
Optional properties 142
■Additional properties 145
6.5
Exposing server-side properties in user input
6.6
Designing safe user flows
7 API authorization and authentication
7.1
Authentication vs. authorization
7.2
Understanding JSON Web Tokens
JWTs defined 163
■Structure and representation of JWTs 163
7.3
Understanding Open Authorization
7.4
Understanding OAuth flows
Authorization code flow 172
■Protecting authorization requests 
with proof of key exchange 174
■Client credentials flow 176
Device authorization flow 177
■Refresh token flow 178
7.5
Sender-constrained tokens
Using mTLS for certificate-bound tokens 179
■Demonstrating 
proof of possession 181
7.6
Understanding OpenID Connect
7.7
Understanding role-based access controls
8 Implementing API authentication and authorization
8.1
Documenting authenticated endpoints with OpenAPI
8.2
Issuing JWTs
CONTENTS
x
8.3
Validating JWTs
8.4
Integrating with an OpenID Connect provider
Logging in users and issuing access tokens with an OIDC 
provider 207
■Validating access tokens issued by an OIDC 
provider 213
8.5
Adding authorization middleware
8.6
Implementing role-based access controls
9 Secure API infrastructure
9.1
API gateways
9.2
Secure network topologies
9.3
Protecting against layers 3–6 attacks
9.4
Fending off malicious traffic with WAFs
10 Financial-grade APIs
10.1
What is open banking?
10.2
What is FAPI?
10.3
Understanding FAPI’s attacker model
10.4
Securing APIs with FAPI 2.0’s security profile
10.5
Securing authorization requests
10.6
Message signing
11 Observability for API security
11.1
What is API observability?
11.2
Logs, traces, and metrics
11.3
Instrumenting APIs
11.4
Logging custom events
11.5
Detecting input-based attacks
11.6
Detecting endpoint abuse attacks
11.7
Summary
12 Testing API security
12.1
Designing an API security testing strategy
12.2
Discovering design security flaws in our APIs
12.3
Using fuzzing and contract testing
12.4
Automating access control tests
xi
12.5
Testing business flow vulnerabilities

---

## Sección 2: appendix C [Entropy: 0.28]

API security checklist
Setting up Auth0 for authentication and authorization
API security RFCs and learning resources
references
index
xii
foreword
A few years ago, a cyber researcher decided to examine the Coinbase app. They
watched all the traffic between their browser and the server, mapping out the API calls
behind everyday functions such as checking prices and executing trades. Like a good
hacker, they ditched the web interface and started communicating directly with the
API, where they could be a lot more creative with requests. (The UI is far too controlled and restrictive.)
 This particular researcher had already purchased some Ethereum, so they crafted
a request to sell their Ethereum via the API but told the server to sell it as Bitcoin
instead. They pressed Enter and waited for the error message to return—but it never
came. What they received instead was a trade confirmation. Their $1,060 in Ethereum
successfully sold as more than $43,000 in Bitcoin. To Coinbase’s credit, the issue was
fixed within hours, and the researcher was rewarded with the company’s largest-ever
bug bounty: $250,000.
 José has written the book we need for a world in which these kinds of API flaws are
discovered daily. The Coinbase story is only one vivid example of what attackers love
about APIs: over-permissioned functions, exposed data, and logic flaws invisible in the
UI. José doesn’t waste time with platitudes or silver bullets. He goes straight at these
hard problems, showing how to build APIs with security woven into their DNA. He
explains why authentication and authorization are so critical; what the most common
mistakes are; and how to design, test, and operate APIs that can withstand the kind of
abuse attackers attempt every day.
 APIs, after all, make the internet work. Every time you log in to your bank account,
check the weather, or turn on your car’s air conditioning from your phone, you’re
using an API. APIs have made it vastly easier to build, integrate, and operate

FOREWORD
xiii
applications. Today, it’s estimated that more than 90% of all internet traffic flows
through APIs.
 Attackers have caught on. The age of simple SQL injections and cross-site scripting
attacks is fading—or at least those attackers are a lot less effective. The new battleground is the API layer, where attackers exploit flaws that legacy security tools can’t
defend. This unrelenting tide of incidents inspired me to create APIsec University,
helping educate developers and security engineers to build and defend APIs securely.
More than 100,000 students have enrolled, which is proof of both the urgency of the
problem and the hunger for solutions.
 But the breaches keep coming, not in thousands of records but hundreds of
millions—37 million at T-Mobile, 200 million at Venmo, and 700 million at LinkedIn.
The conclusion is inescapable: traditional defenses such as firewalls, detection systems, code scanners, and app testing are failing at the API layer.
 There are good reasons why. API attacks aren’t obvious. SQL injection is easy to
detect and block; logic flaws are not. Attackers take advantage of subtle gaps in business logic that are almost impossible to detect in real time. They unfold slowly and
deliberately, over weeks or months, whereas defenses have milliseconds to decide
whether a request is legitimate. Too often, APIs live in a blind spot between development and security.
 That is exactly why this book matters. José doesn’t just explain the problem but
also shows you how to fix it. If your team builds, uses, or integrates APIs, his book is
mandatory reading. You won’t find a more complete, digestible, and practical guide.
APIs are the engines of modern innovation. Let’s make sure that they aren’t an open
invitation to attackers as well.
 —DAN BARAHONA
 COFOUNDER, APISEC UNIVERSITY

xiv
preface
APIs are now the main attack vector on the internet and the principal source of
breaches. Technical and business leaders rightly consider API security to be a top concern. The sheer number of standards and protocols we need to know to implement
API security is daunting, but that doesn’t mean we should shy away from APIs. In
today’s ecosystem, that’s probably impossible. Our mission as developers, architects,
and cybersecurity professionals is to learn the right standards and protocols to protect
our APIs, and this book will help you in that journey.
 APIs have become the industry standard for exposing data and functionality over
the internet. We use APIs to power web and mobile applications; connect Internet of
Things (IoT) devices; drive integrations between microservices; deliver products and
services; and, more recently, expose the capabilities of generative AI models. APIs
account for 83% of all internet traffic; unfortunately, they are often improperly
secured, making them ideal targets for hackers and cybercriminals.
 In 2024, Akamai registered 311 billion attacks against web applications and APIs,
with 230 billion attacks against e-commerce applications alone. What do attacks
against APIs look like? Many of them are traditional types of attacks, such as SQL and
command injection, server-side request forgery (SSRF), and denial-of-service attacks
(DoS). But we are also seeing a growing trend toward more sophisticated attacks, such
as fuzzing and abuse of vulnerable business logic and flows.
 According to research by Imperva, business logic exploits now account for the largest percentage of API attacks (27%). Examples include business logic–based DoS
attacks (exploiting anti-patterns such as improper pagination), data scraping, and
scalping. Threat actors exploit business flow vulnerabilities by taking advantage of
design flaws in our APIs. In the real world, these types of attacks cause most breaches.

PREFACE
xv
In January 2024, a threat actor scraped and leaked the personal details of more than
15 million users of Trello, the popular project management platform, without breaking a single security protocol or gaining unauthorized access. Also, for many years, the
United Kingdom’s Driver and Vehicle Standards Agency (DVSA) has been fighting
scalpers who buy all available driving-test slots and resell them at much higher prices.
These are but some examples of a growing trend in the current cybersecurity
landscape.
 Why are API attacks such a big problem? They are difficult to detect and mitigate.
Research by Salt Security shows that 95% of API attacks come from authenticated
users. For all intents and purposes, modern threat actors look and feel like legitimate
users when they launch an attack against your API. If you have a rate-limiting policy,
they’ll comply with it; if you use CAPTCHA challenges, they’ll solve them; if you
require the use of a standard user agent, they’ll mock it.
 Modern threat actors’ modus operandi means they often go undetected by traditional threat detection and protection tools such as web application firewalls (WAFs).
The critical question for us is, can we do anything to protect our APIs against such
threats? Yes we can! The solution to modern sophisticated threats is to shift left on
security and embrace security by design with a robust zero-trust model, all of which
this book teaches you.

---

## Sección 3: appendix C [Entropy: 0.25]

xvi
acknowledgments
Writing this book was an incredibly satisfying and fulfilling effort but also full of challenges and unexpected difficulties. I’m thrilled to be writing these pages, and I’m not
overstating the facts when I say that this wouldn’t be the case if not for the invaluable
support I’ve received from family members, colleagues, my publisher, and the
community.
 I benefited enormously from people who contributed ideas for the book and provided feedback on various chapters and drafts. Special thanks go to Corey J. Ball, Dana
Epp, Katie Paxton Fear, Teresa Pereira, Frank Kilcommins, Erik Wilde, David Roldán,
Alberto Cabrero, Bandana Kaur, Al-Amir Badmus, Mayur Pandya, Tushal Padsala,
Colin Domoney, Radu Popa, Alex Martelli, Jason McDonald, Naomi Ceder, Alex Akimov, Emmanuel Paraskakis, Mark de Rijk, Carlos Villanúa Fernández, Jason Harmon,
Jacob Ideskog, Travis Spencer, Michał Trojanowski, Karo Moilanen, Ikenna Nwaiwu,
Jędrzej Kardach, Tristan Kalos, Dmitry Dygalo, Mehdi Medjaoui, and Kelvin Meeks.
I’m also indebted to my colleagues at APIsec, especially Raj Ramanatham, Mohsin
Niyazi, Feroz Iqbal, Dan Barahona, Dave Piskai, Jesse Freeman, Alex Rifman, Faizel
Lakhani, and the whole community at APIsec University.
 Since 2023, I’ve presented drafts and ideas from the book at various conferences,
including PyCon US, EuroPython, OWASP Global AppSec, apidays, API Conference,
the Platform Summit, and various podcasts and meetups. I want to thank everyone who
attended my presentations and gave me valuable feedback. I also want to thank the
attendees of my workshops at microapis.io for their thoughtful comments on the book.
 I want to express my gratitude to my acquisitions editor, Andy Waldron. He did a
brilliant job of helping me get my book proposal in good shape and keeping the book
focused on relevant topics. He also supported me tirelessly to promote the book and
helped me reach a wider audience.

ACKNOWLEDGMENTS
xvii
 The book you now have in your hands is readable and understandable thanks to
the invaluable work of my development editor, Marina Michaels, who went far beyond
and then some more to help me write a better book. She did an outstanding job of
helping me improve my writing style and keeping me on track and motivated.
 I also want to thank the rest of the Manning team who were involved in the production of this book, including Melissa Ice, Radmila Ercegovac, Robin Campbell, Aira
Dučić, Ian Hough, Ana Romac, Sam Wood, Rebecca Rinehart, Keri Hales, Aleksandar
Dragosavljević, Mihaela Batinic, Azra Dedić, Stjepan Jureković, and Matko Hrvatin, as
well as the production team who helped shape this book into its final format. I also
thank Marjan Bace for betting on this book and giving it a chance.
 While working on this book, I had the opportunity to receive detailed, outstanding
feedback from the most amazing group of reviewers, including Aamiruddin Syed,
Adalbert Jurkiewicz, Advait Patel, Akhilesh Keshap, Aleksei Sharypov, Amitabh Cheekoth, Anil Kumar Moka, Anirudhan Sudarsan, Anthony Staunton, Anupam Mehta,
Anurag Malik, Anusha Nerella, Aparna Achanta, Arun Kumar R, Asaad Saad, Astha
Puri, Bhanu Sekhar Guttikonda, Colin Domoney, Datta Snehith Dupakuntla Naga,
David Roldán Martínez, Denis Saripov, Divya Parashar, Durga Krishnamoorthy, Evgeny
Borovikov, Ganesh Swaminathan, Gilberto Taccari, Harsh Gupta, Hilde Van Gysel,
Jereme Allen, Karan Kumar Ratra, Karol Skorek, Karthikeyan Magarajan, Krutik Poojara, Kushal Thakkar, Manas Kulkarni, Manjunath Ravi, Manuel Vidaurre, Maria
Teresa Pereira, Mehmet Yilmaz, Mozhar Alhosni, Naman Jain, Narayanan Jayaratchagan, Payam Pourashraf, Prachit Kurani, Pradyumna Kodgi, Pragya Keshap, Prasanna
Jatla, Praveen Chinnusamy, Radu Popa, Raja Chattopadhyay, Raj, Rajiv Moghe, Rakesh
Kumar Pal, Ravi Teja, Sai Chiligireddy, Saketh Patibandla, Samarth Shah, Samer H,
Sankalp Kumar, Satish Prahalad Gururujan, Senthil Bala, Shivaprasad Sankesha
Narayana, Shyam Balagurumurthy Viswanathan, Sibasis Padhi, Simone Sguazza, Siri
Varma Vegiraju, Sriram Macharla, Sudhanva Hebbale, Surya Prakash, Tannu Jiwnani,
Udy Dhansingh, Ujjwal Verma, and Venkata Thummala. Their feedback was thorough
and of exceptional quality, and without a glimmer of doubt, it allowed me to write the
best possible version of this book.
 Since the book went into MEAP, I’ve been blessed by the words of encouragement
and feedback that many of my readers sent me through LinkedIn and by email. I also
want to thank the brilliant community of readers who actively participated in Manning’s liveBook platform and left invaluable feedback for improving the content.
 Finally, thank you, dear reader, for acquiring a copy of my book. I hope that you
find this book useful and informative and that you enjoy reading it as much as I
enjoyed writing it. I love to hear from my readers, and I’d be delighted if you shared
your thoughts about the book with me.

xviii
about this book
The goal of this book is to teach you how to secure your APIs. You’ll learn about the
most common exploits hackers use to breach APIs and how to prevent them through
secure API design, implementation, and operations. You’ll learn to threat-model risks
for your APIs; create a zero-trust security strategy; automate your security-testing process; keep your attack surface under control; use observability for threat detection;
and apply the highest, most advanced industry standards for authentication, authorization, and data validation.
Who should read this book
This book is helpful for software developers, architects, technical leaders, QA engineers, and product owners who work with APIs. The book covers advanced topics at
the intersection between APIs and cybersecurity, but all concepts are explained in
detail and in accessible language, with plenty of examples and illustrations and
emphasis on the business impact of every API vulnerability. Therefore, the book
should be accessible to both technical and nontechnical readers. As I emphasize
throughout the book, API security is everybody’s job, and tackling it properly requires
a strong alignment among business, product, and technical teams. I hope that this
book helps create such alignment by being accessible to all stakeholders.
 The coding examples in the book are in Python, but you don’t need to know the
language to follow along with them because every listing is explained thoroughly. The
GitHub repository for this book contains detailed instructions on setting up the environment for every example and running the code.

---

## Sección 4: appendix C [Entropy: 0.265]

ABOUT THIS BOOK
xix
How this book is organized: A road map
The book is divided into 12 chapters. Chapters 1–3 introduce the main concepts in
API security and lay out the principles for building and delivering secure APIs. The
following chapters analyze the main types of security vulnerabilities (chapters 4–5),
how to prevent them (chapters 6–10), how to detect threats (chapter 11), and how to
automate API security testing (chapter 12). Here’s a detailed breakdown:
Chapter 1 explains what API security is, why APIs are the main attack vector and
most common source of breaches on the internet, and how the principles of
API security by design help you mitigate those risks.
Chapter 2 explains how you lay out an API security strategy that aligns with your
organization’s business goals. It also illustrates step by step how to threat-model
your APIs and what best practices to follow when designing an API security
program.
Chapter 3 takes a deep dive into the foundational principles of API security. It
explains what it truly means to shift left your security strategy and how to implement a zero-trust model for APIs, as well as the importance of documenting
your APIs before building them.
Chapter 4 explains the most common authentication and authorization vulnerabilities from the Open Worldwide Application Security Project (OWASP) top
10 API Security Risks, including broken object-level authorization (BOLA), broken authentication, broken object property-level authorization (BOPLA), broken function-level authorization (BFLA), and unrestricted access to sensitive
business flows. Every vulnerability is explained in simple language, exemplified
with real-world cases, and illustrated with code listings.
Chapter 5 explains the most common API configuration and management vulnerabilities from the OWASP top 10 API security risks, including unrestricted
resource consumption, SSRF, security misconfiguration, improper inventory
management, and unsafe consumption of APIs. As in chapter 4, every vulnerability is explained in accessible language, including real-world examples and
detailed code listings.
Chapter 6 explains how to tackle API security by design. It illustrates common
design flaws (such as the use of predictable identifiers, unconstrained user input,
optional properties, and unsafe user flows) that threat actors can exploit to abuse
and breach our APIs, and it provides patterns that prevent such exploits.
Chapter 7 is a deep dive into the foundations of API authentication and authorization protocols and standards, including Open Authorization (OAuth),
OpenID Connect (OIDC), JSON Web Tokens (JWTs), and sender-constrained

ABOUT THIS BOOK
xx
tokens. This chapter teaches you everything you need to know to build a robust
authentication and authorization system.
Chapter 8 illustrates how to implement the authentication and authorization
standards described in chapter 7 with detailed code listings, showcasing best
practices and common mistakes to avoid. After reading this chapter, you’ll be
ready to ship APIs with robust authentication and authorization.
Chapter 9 explains why infrastructure is critical to API security. The chapter discusses common network misconfiguration mistakes and patterns that prevent
them, the OSI model and the effect of layer 3–6 attacks on your security posture, and the use of technologies such as API gateways and WAFs for run time
security protection.
Chapter 10 teaches you how to deliver APIs with the highest security standards
using FAPI. You’ll learn about FAPI’s attacker model, securing the authorization request process to prevent account hijacking, and using robust messagesigning techniques to tackle nonrepudiation. This chapter is especially beneficial for those who work in financial services, healthcare, government, and other
sectors in which security is critical.
Chapter 11 explains how to use observability for security and threat detection.
It shows you how to instrument your APIs to produce and collect logs, traces,
and metrics, as well as how to analyze telemetry data to detect and react to various types of attacks.
Chapter 12 teaches you how to discover design and implementation security
flaws in your APIs using tools for design testing, contract testing, and fuzzing. It
also shows you how to use threat models to create unit tests that check for specific business logic vulnerabilities in your APIs.
Chapters are laid out in a sequence that makes the learning journey suitable for those
who are new to API security. Every chapter introduces new concepts and foundational
blocks that make it easier to understand succeeding chapters. There is no strict dependency among chapters, however, and you should be able to follow a different order if
you want to, especially if you are familiar with basic API and cybersecurity concepts.
 If you’re new to API security and ache to understand how hackers exploit vulnerabilities and breach APIs, I recommend starting with chapters 1, 4, and 5. If you’re
urgently looking to implement a robust authentication and authorization layer and
are confused about OAuth, which flows to use, how to work with JWTs, and so on, I
recommend going straight to chapters 7 and 8. After you’ve read chapters 7 and 8,
you can proceed to chapter 10 if you work in finance, healthcare, or some other
security-critical sector and want to know whether you’re doing enough to protect your
APIs. If you have a bunch of APIs and want to know how strong your security posture
is, you may want to start with chapter 12. A word of warning: chapter 12 builds on top
of every concept introduced throughout the book, so it may be a difficult read if you
go for it first.

ABOUT THIS BOOK
xxi
About the code
Except for chapters 1–3 and 9-10, all chapters are full of coding examples that illustrate every new concept, vulnerability, and pattern introduced to the reader. Most of
the listings show code snippets in Python. In a few cases, especially in chapter 6, which
focuses on API security by design, the listings show snippets of API specifications using
the OpenAPI specification standard. All the code is thoroughly explained and should
be accessible to all readers, including those who don’t know Python. All the code is
available in the GitHub repository dedicated to this book: https://github.com/
abunuwas/secure-apis. Every chapter has a corresponding folder in the GitHub repo,
such as ch04/ for chapter 4.
 Some coding examples, such as those for chapters 4 and 5, illustrate a vulnerability
and how to fix it. In such cases, you’ll find both versions of the code—the vulnerable
application and the secure one—in the book’s GitHub repository. The GitHub repository also contains additional code snippets that demonstrate alternative solutions to a
problem. ch08/, for example, shows how to issue and validate JWTs using the three
most popular JWT libraries in Python.
 The Python code examples in the book were tested in Python 3.11, although any
version of Python after 3.7 should work as well. The GitHub repository’s README file
contains instructions for installing Python and managing its runtime versions. Many of
the commands that I use throughout the book were tested on a Mac machine, but
they should work without problems on Windows and Linux machines. If you work in
Windows, I recommend using a POSIX-compatible terminal such as Cygwin.
 I’ve used uv to manage dependencies in every chapter. In the book’s GitHub
repository, you’ll find pyproject.yaml and uv.lock files in every chapter’s folder. Those
files describe the dependencies I used to run the code examples. To avoid dependency problems when running the code, I recommend that you download those files
at the start of every chapter and install the dependencies from them. The README
file in every chapter’s folder contains detailed instructions on setting up the virtual
environment for each project and installing the dependencies.

---

## Sección 5: appendix C [Entropy: 0.25]

This book contains many examples of source code in numbered listings and inline
with normal text. In both cases, source code is formatted in a fixed-width font like
this to separate it from ordinary text. Sometimes code is in bold to highlight code that
has changed from previous steps in the chapter, such as when a new feature is added
to an existing line of code or when I want to bring something to your attention.
 In many cases, the original source code was reformatted; we’ve added line breaks
and reworked indentation to accommodate the available page space in the book. In
rare cases, even this was not enough, and some listings include line-continuation
markers (➥). Code annotations accompany many of the listings, highlighting important concepts.
 You can get executable snippets of code from the liveBook (online) version of this
book at https://livebook.manning.com/book/secure-apis. The complete code for the
examples in the book is available for download from the Manning website at

xxii
https://www.manning.com/books/secure-apis and from GitHub at https://github
.com/abunuwas/secure-apis.
liveBook discussion forum
Purchase of Secure APIs includes free access to liveBook, Manning’s online reading
platform. Using liveBook’s exclusive discussion features, you can attach comments to
the book globally or to specific sections or paragraphs. It’s a snap to make notes for
yourself, ask and answer technical questions, and receive help from the author and
other users. To access the forum, go to https://livebook.manning.com/book/secure
-apis/discussion. You can learn more about Manning’s forums at https://livebook
.manning.com/discussion.
 Manning’s commitment to our readers is to provide a venue where meaningful
dialogue between individual readers and between readers and the author can take
place. It is not a commitment to any specific amount of participation on the part of
the author, whose contribution to the forum remains voluntary (and unpaid). We suggest that you try asking the author some challenging questions lest their interest stray!
The forum and the archives of previous discussions will be accessible on the publisher’s website as long as the book is in print.
Other online resources
If you want to learn more about API security, you can check out my blog (https://
microapis.io/blog), newsletter (https://microapis.substack.com), and YouTube channel (https://www.youtube.com/@microapis), which contain additional resources that
complement the teachings of this book. To stay up to date with the latest news in API
security, follow the APIsecurity.io (https://apisecurity.io) newsletter. I also highly recommend APIsec University’s online courses (https://www.apisecuniversity.com),
which are free and some of the best material available on this topic. If you want to join
an online community of like-minded developers interested in API security, I recommend joining APIsec University’s Discord server (https://discor.com/servers/apisec
-university-1009112852759593100).

xxiii
about the author
JOSÉ HARO PERALTA is head of cybersecurity strategy at APIsec (https://www
.apisec.ai). Before that, he worked as an independent software and architecture consultant, helping organizations all over the world build and deliver complex, scalable,
and secure applications. He is also a regular speaker at major international conferences, including PyCon US, EuroPython, OWASP Global AppSec, apidays, and the
Platform Summit.
 
 
 
 
 
 
 
 
 
 
 
 

xxiv
about the cover illustration
The figure on the cover of Secure APIs is “Montanaro d’Imoschi” or “Mountaineer of
Imotski,” taken from the book La Dalmazia Descritta by Francesco Carrara, published
in 1846. Each illustration is finely drawn and colored by hand.
 In those days, it was easy to identify where people lived and what their trade or station in life was by their dress alone. Manning celebrates the inventiveness and initiative of the computer business with book covers based on the rich diversity of regional
culture centuries ago, brought back to life by pictures from collections such as this
one.
What is API security?
Application programming interfaces (APIs) are everywhere. Accounting for 57%
to 83% of all internet traffic (57% according to Cloudflare [1] and 83% according
to Akamai [2]), APIs are the engines that power the internet. They allow organizations to offer services through well-defined interfaces. They power web- and
mobile-based applications, Internet of Things (IoT) integrations, and more. They
enable service-to-service communication. They accelerate automation and bring
uniform interfaces to core platforms. More organizations are discovering the
This chapter covers
An introduction to API security
Security by design for APIs
Why API security matters
Attack vectors in an API
How API security fits into the API development 
cycle
How to keep pace with the field of API security

---

## Sección 6: CHAPTER 1 [Entropy: 0.25]

What is API security?
benefits of APIs to optimize their services, automate their processes, and tap new
lines of business.
 But here’s the kicker: APIs are gateways into our systems. Every time we create an
API, we open a door that allows users to access data and functionality from our system.
The goal of an API, of course, is to expose data and functionality, and when properly
implemented and secured, APIs are great. The danger comes when they aren’t properly secured.
 Hackers take advantage of improperly secured APIs to break into our systems,
exposing our organizations to security breaches, violations of user privacy legislation
such as Europe’s General Data Protection Regulation (GDPR), and hefty fines in sectors such as finance and healthcare. APIs are necessary to keep our systems up and
running, but they can also put our businesses and reputations at stake.
 Salt Security’s 2023 Q1 API Security Trends report found that API attacks grew by
400% in the first quarter of 2023 [3]. According to Akamai, organizations suffered
more than 9 billion attack attempts in 2022, with some organizations facing more
than 10 million attacks per day [4]. These breaches aren’t cheap; the cost of an API
breach averages $6.1 million, according to research by Kong [5].
 The obvious questions are how to deal with API security and what we need to do to
ensure that our APIs are secure. If these questions are bugging you, you’ve come to
the right place.
 In this chapter, you’ll learn what API security is and why it’s important. You’ll learn
about the attack vectors in an API. As you’ll discover, API security isn’t just about
authentication and authorization; it’s a much bigger world, with many things to consider. You’ll learn what security by design is and how we apply it to APIs. Finally, you’ll
learn how API security fits into the API development cycle and how to keep up to date
with the rapidly changing landscape of API security.
1.1
What is API security?
API security is the field that studies API vulnerabilities and explores how to detect and
prevent them. It includes every part of our applications and systems that affect API
security, such as authentication, authorization, user input manipulation, data validation, network configuration, and observability. Figure 1.1 provides an overview of API
security. Take a moment to study the figure carefully because it represents a mental
model for the topic of this book.
DEFINITION
API security is the practice of designing, building, and operating
APIs securely to detect and prevent vulnerabilities such as unauthorized
access, data leaks, and other exploits and misuses. Good API security takes a
holistic approach and encompasses every element in the system that can compromise API security, including API design, user input manipulation, use of
third-party APIs, libraries and dependencies, observability, network configuration, and database protection.
1.1
What is API security?
 
Figure 1.1
API security includes everything that can compromise the security of our APIs, including design, 
implementation, architecture, and infrastructure. Every element plays a role in keeping our APIs safe and secure.
Good API security requires a holistic view of our APIs. As you see in figure 1.2, every
attack vector in an API is relevant for API security, including elements such as API
implementation, configuration management, and the infrastructure that operationalizes the API. A crucial component of our infrastructure is network configuration. A
common strategy used to isolate components with different risk profiles in our system
is network segmentation. You’ll learn more about networking and security in chapter
9, but long story short, segmentation is the practice of dividing a network into isolated
subnets. How is this approach helpful? Take a look at figure 1.2, which represents a
website with two services: a user service and an admin service. The user service manages user data, and the admin service gives admin users full access to sensitive data
and operations.
 The user service’s API exposes an endpoint POST /user/avatar that takes a URL as
input and downloads the user’s avatar from the provided URL. As illustrated in figure
1.2, the user service is vulnerable to server-side request forgery (SSRF) attacks, meaning that a threat actor can exploit the service to trigger external calls to malicious websites and send internal requests to other services, such as the admin service. In this
case, the SSRF vulnerability provides an opportunity for privilege escalation. The
Firewalls
Public network
Private network
The API design must expose safe
user flows and fend off threats
like SQL injection attacks.
An API gateway can do a great job of
preventing certain types of API attacks
and providing usage analytics.
Firewalls ensure that
only allowed traffic
makes its way to our
servers.
Load balancers distribute the
load among instances to avoid
overwhelming them.
Network topology is crucial.
By placing sensitive resources
in private networks, we keep
them safe.
Robust implementation
patterns based on zero-trust
security ensure that our data
is handled securely.
API gateway

---

## Sección 7: CHAPTER 1 [Entropy: 0.25]

What is API security?
threat actor uses the POST /user/avatar endpoint to send an internal request to the
admin service, thereby gaining access to sensitive user data.
Figure 1.2
To secure our APIs, first, we identify attack vectors, such as the API input parameters. Then, we model 
the possible threats. Finally, we harden our API by applying measures that prevent or mitigate those attacks.
A few vulnerabilities led to this breach, including a lack of input sanitization in the
user service and a lack of proper access controls between services. The one I want to
emphasize is the lack of network segmentation, which allows the user service to talk to
the admin service, thereby highlighting the importance of network configuration for
our API security posture.
1) Identify attack vectors.
Hackers can attack
our application
through the API’s
input parameters.
User service
Admin service
2) Model threats.
SSRF to internal
services
User service
Admin service
POST /user/avatar
{"url": "http://10.0.10.0:8000/admin/users"}
Same network
Same network
3) Secure APIs.
We divide the
network into
two segments to
prevent services
from talking to
one another.
User service
Admin service
User service network segment
POST /user/avatar
{"url": "http://10.0.10.0:8000/admin/users"}
Admin service network segment
1.1
What is API security?
 As illustrated in figure 1.3, our job is to identify every part of the stack that can
compromise API security, model potential threats, and implement the right security
measures. Here’s how the process goes:
Identify attack vectors. We look at every component of our system that can compromise our API security posture. We take a holistic view of the API. We look at
the implementation, the infrastructure that operationalizes the API, the design,
the authentication system, configuration management, and so on. Every component directly exposed to the user represents an attack vector.
Model API threats. Our job in this step is to identify what kinds of attacks can be
performed. A good threat-modeling exercise is explicit about the types of
attacks, how they occur, and how they would affect the application and the business. This analysis is crucial because it informs our security measures.
Secure APIs. In this step, we put the results of our previous analysis to work and
address the vulnerabilities. If we found vulnerabilities in our API design, for
example, we harden the design. We ensure that we’re handling user input
carefully in every data entry point in the API. If we determine that the database
is vulnerable, we place it in a private network and rotate its access credentials
frequently. In the coming chapters, you’ll learn how to protect every layer of
your stack.
Figure 1.3
To analyze attack vectors, we look at the three axes of API security: design, implementation, 
and infrastructure. We ask what vulnerabilities we expose in each axis, what they look like, and what 
their consequences are.
1) Lack of input sanitization
2) Lack of denylists and allowlists
3) Lack of authentication in
 communication between
 internal services
Lack of network segmentation
between services that don’t
need to talk to one another
Design
Implementation
POST /user/avatar
{"url": "http://10.0.10.0:8000/admin/users"}
Infrastructure

---

## Sección 8: CHAPTER 1 [Entropy: 0.25]

What is API security?
I’ll talk more about threat modeling in chapter 2, but to give you a teaser, I’ll show you
how to threat-model the scenario in figure 1.2. The analysis is illustrated in figure 1.3.
Here’s how it works:
We identify input parameters that can be exploited for SSRF attacks. The task is
to make sure that the implementation sanitizes such input.
We notice that internal calls between services are not authenticated, so services
can talk to one another without restrictions. The task is to review whether all
this communication is necessary and whether we can restrict which services can
talk to which others.
We notice that all services run within the same network without segmentation,
so all services can send internal calls to others. The task is to assess whether we
can isolate highly sensitive services by placing them in a separate isolated
network.
As you see in figure 1.3, it helps to break the analysis of attack vectors into three layers.
We’ll call these layers the three axes of API security:
Design—Our API design can expose vulnerabilities, often in unexpected ways.
Unbound strings, for example, open the door to large payload attacks; exposing integer IDs makes it easier to discover unknown resources by manipulating
the identifier; and a lack of proper pagination makes the system vulnerable to
denial-of-service attacks. You’ll learn more about these kinds of vulnerabilities
in chapter 6 and see how to address them.
Implementation—Our implementation is the greatest source of vulnerabilities, so
we must pay close attention to the code and test it comprehensively. It helps to
apply best practices and use robust patterns such as data transfer objects
(DTOs), perform data validation for incoming and outgoing payloads, and
parameterize all database queries. You’ll learn how to tackle the implementation securely in chapters 4 and 5.
Infrastructure—Our infrastructure has a big effect on our security posture. Infrastructure includes network topology, firewalls, data storage, computing
resources, load balancers, and gateways. Our architectural solutions determine
how our APIs will scale, whether sensitive data is accessible through public or
private networks, and so on. You’ll learn more about architecting secure infrastructure for APIs in chapter 9.
NOTE
The three axes of API security are a framework for analyzing vulnerabilities in our APIs. Each axis exposes unique vulnerabilities, and we must
analyze how malicious users can exploit them to break into our system.
We must also consider a few other elements, especially in the area of operations, such
as configuration and secrets management, rate limiting, API versioning, logging and
monitoring, and threat detection. This approach is called shield right (as opposed to
1.2
What is API security by design?
shift left) because it focuses on protecting our APIs after they’ve been released. In

---

## Sección 9: chapter 11, you’ll learn to apply observability for security monitoring and threat [Entropy: 0.25]

detection.
1.2
What is API security by design?
Security by design is a paradigm in cybersecurity that means our software is foundationally secure. As illustrated in figure 1.4, security by design shifts our security concerns
to the left, to the beginning of the process: the design stage. The goal is to shorten the
feedback loop between the test and the implementation. As the figure shows, the traditional development process has a long feedback loop between the test and the
implementation, which means we won’t know whether we’re on the right track until
it’s too late, and by that time, we may have made some design or architectural decisions that are not easily reversible. By shifting left on our tests, we shorten the feedback loop, which enables us to proceed with more confidence in every step of the
software development process.
Figure 1.4
In the traditional approach to API security, we wait until deployment to run our tests and discover 
vulnerabilities. We typically discover hundreds of vulnerabilities, and we have to go back to the beginning of the 
process multiple times to address them. With security by design, we address security in every step of the 
development cycle and, therefore, have fewer surprises when we run the tests after deployment.
Design
Implementation
Deployment
Design
Implementation
Deployment
Hundreds
of security
issues
Handful of
security
issues
VS.
In the traditional approach to API
security, we wait until deployment
to find vulnerabilities and repeat
the cycle many times.
With security by design, we
address security in every step
of the development cycle, so we
find fewer issues at the end and
need fewer iterations.
Tests
Tests
Feedback loop
Feedback loop
Feedback loop
Feedback loop
Feedback loop
Security testing
Security testing

---

## Sección 10: CHAPTER 1 [Entropy: 0.25]

What is API security?
DEFINITION
API security by design is an approach that incorporates security
concerns from the design stage and throughout the entire API development
cycle to ensure that our implementation and delivery processes are safe and
secure. This is also known as shifting left on security.
The same approach applies to APIs. Before we build an API, we must design it, and at
this stage, we have a great opportunity to start addressing vulnerabilities. Security by
design does not apply only to API design, however. We want to ensure that our
approach to API design, implementation, and architectural solution is secure by
design. What does this mean in practice? Let’s break down security by design across
the three axes of API security.
1.2.1
Design
It’s best practice to begin our API development cycle with the design stage. This is
what we call API first (more specifically, API design first). This approach helps development teams and business stakeholders agree on how the API should behave before
work begins on the producer or consumer side.
 According to Postman’s 2023 State of the API Report [6], 75% of respondents
agree that API first allows developers to deliver better APIs faster. API design first,
which helps create alignment between software and business, should involve collaboration with the product, engineering, and security functions to ensure that the API
delivers the desired business outcomes with an acceptable risk profile. Design first also
improves the development process because it gives client and server developers a clear
idea of how the API is expected to work; therefore, both teams can work independently and in parallel.
TIP
For more information on the benefits of API design first, see chapter 1
of José Haro Peralta’s Microservice APIs: Using Python, Flask, FastAPI, OpenAPI,
and More [7].
NOTE
There has been a lot of debate about what API first means and which
methods of putting it into practice are best. A commonly accepted definition
of API first is the notion of APIs as products and the application of product
development methods to API development. API-first teams involve all the
stakeholders in the design process, apply strict quality checks and standards,
and produce detailed documentation. A closely related idea is API design
first, which emphasizes designing our APIs before we embark on their development. For more insight into this debate, check out David Biesack’s “API
Design First Is Not API Design First” [8] and Daniel Kocot’s talk “API First . . .
No” [9].
Beginning our API development cycle with design is also better from a security point
of view. Starting with design gives us a chance to ensure that our API is robust and
secure before we begin implementing it.
1.2
What is API security by design?
Why is this important? Many organizations wait until the API is deployed to a development/test environment to conduct an security test. In other words, most organizations treat security as a run-time issue—that is, as a software characteristic that can be
tested only against a running application. This is a shortsighted view of security. As you
will learn in this book, we can do a lot from a design point of view to ensure that our
APIs are secure and reliable. Tackling security from the design stage allows us to shiftleft our security approach and deliver secure-by-design APIs. As you’ll see in chapter 2,
this approach allows us to deliver more secure APIs faster and with more confidence,
thereby reducing the cost of developing new features.
TIP
Many API vulnerabilities can be addressed in the design. When we
design secure APIs, we find fewer vulnerabilities at run-time testing, so we’re
less likely to have to repeat the whole API development cycle to address them.
Don’t wait until deployment to test security!
From a design point of view, we want to ensure that our endpoints expose clearly
defined operations. We want to apply good API design patterns, such as pagination.
We want to avoid exposing predictable resource IDs, such as incremental integers. We
Help! My APIs do not begin with a design; am I screwed?
Starting with a design is the best way to apply security by design to your API development process, but it is not the only way. Many organizations have legacy APIs that
did not start with a design, and a significant number of those APIs are not documented. Even today, in my experience, most organizations build APIs without going
through a design process.
In such cases, the specification is often generated from code using a generator. API
development frameworks like Python’s FastAPI generate API documentation automatically from the code. Some organizations employ full-time API writers who look at the
code and produce the corresponding API specification.
How do we apply security by design in these cases? If you don’t have an API specification, the first step is getting one. I can’t emphasize this enough: you can’t do
proper API security without a specification. Trying to protect your APIs without having
specifications is like trying to protect a house without knowing where it is or what it
looks like. Even a bad or inaccurate specification is better than nothing. The testing
techniques discussed in chapter 12, such as fuzzing, will help you fill the gaps.
There are several methods for producing API specifications, such as using tools to
generate specifications from code or hiring an API writer. If your API is consumed by
a web application, you can use tools like Burp to intercept traffic and produce the
specification from traffic data. If you have large, complex APIs for which these
approaches aren’t feasible, engage a specialist service to get you sorted. When you
have a specification, you’ll be able to take control of your security and apply all the
methods and techniques discussed throughout this book to improve your security
posture.

---

## Sección 11: CHAPTER 1 [Entropy: 0.25]

What is API security?
want to avoid flexible data schemas that make data validation difficult. We want to
constrain user input as much as possible to reduce the chance of malicious code injection. You’ll learn more about this topic in chapter 6.
1.2.2
Implementation
After we design the API, it’s time to implement it. At this stage, it’s important to
choose robust, stable libraries that make it easier to implement APIs. Most languages
have API-specific frameworks, including FastAPI for Python (https://github.com/
fastapi/fastapi), FeathersJS for Node (https://github.com/feathersjs/feathers), and
Spring for Java (https://github.com/spring-projects/spring-framework). Good API
frameworks support full JSON schema semantics for granular data validation; generate valid OpenAPI specifications; allow us to validate request and response data,
including URL query and path parameters and headers; and make it easy to add standard authentication and authorization layers.
 From an implementation point of view, we want to ensure that our code complies
with the API specification accurately. To enforce compliance, we test the implementation against the specification. We call this approach contract testing. A popular
approach to contract testing is to use fuzz testers like Schemathesis (https://github
.com/schemathesis/schemathesis) and restler-fuzzer (https://github.com/microsoft/
restler-fuzzer). As you will learn in chapter 12, fuzz testers are tools that generate valid
and invalid payloads and check how the API handles them.
TIP
Don’t reinvent the wheel! Use API frameworks for API development. API
frameworks come with built-in functionality to streamline data validation and
serialization, so you have less work to do. Apply a zero-trust approach; validate
and sanitize all the data, and validate the implementation using fuzz testers.
Use well-established patterns to transfer and sanitize data across application layers.
DTOs, for example, ensure that we transfer only the data we need from the API layer
to the business and database layers and from the database layer to other layers. It’s
also important to parameterize all database queries to mitigate the risk of SQL injection. Finally, we want to apply a zero-trust approach and thoroughly validate all data
regardless of its origin. As you’ll learn in chapter 3, zero trust means validating every
input in our API regardless of its origin.
1.2.3
Infrastructure
Our APIs run on infrastructure, and the configuration and architectural choices of
that infrastructure have a strong effect on our API security posture. Infrastructure
includes everything from network topology and server configuration to load balancers, reverse proxies, API gateways, and web application firewalls (WAFs).
 We also have an opportunity to ensure that our setup is secure by design. We can
configure our network to disable traffic between certain services when they don’t
need to talk to one another and isolate certain components with high-risk profiles. We
want to configure restrictive firewalls that allow access only from trusted origins. We
1.3
Why is API security important?
must choose a deployment model that scales to meet the needs of our API consumers.
We also need front-facing components, such as API gateways and WAFs, that provide
an additional layer of security, including protection against denial-of-service (DoS)
attacks. You will learn more about all this in chapter 9.
TIP
Secure infrastructure goes a long way toward protecting our APIs. You
can use secure network topologies to restrict access to sensitive resources, for
example, and use technologies like load balancers, API gateways, and WAFs
to handle incoming traffic securely.
It is crucial to replicate your infrastructure accurately across all environments, and
Infrastructure as Code (IaC) is your ally. You can use tools like CloudFormation if you
deploy to Amazon Web Services (AWS), Azure Resource Manager if you deploy to Microsoft Azure, and Cloud Builder if you use Google Cloud Platform (GCP), or you can
use generic tools like Terraform if you deploy to multiple clouds and want to keep
your IaC generic and decoupled from the implementation details of each provider.
IaC allows you to automate your infrastructure using code, and you can audit and test
such code using static analysis tools like tfsec (https://github.com/aquasecurity/
tfsec) to ensure that your infrastructure is secure and properly configured.
1.3
Why is API security important?
We have established what API security is, but why is it important? APIs are gateways
into our systems. They allow users to access data and functionality from our services. If
our APIs are not properly protected, they can allow malicious users to access data and
operations they shouldn’t have access to, bring our servers down, cause unwanted
behaviors, and harm our business. In highly regulated sectors such as finance, payments, and healthcare, APIs fall within the scope of compliance frameworks such as
Payment Card Industry Data Security Standard (PCI DSS) and Health Insurance Portability and Accountability Act (HIPAA), and failing to comply adequately will result
in sanctions and potential restrictions for your business.
 According to SmartBear’s State of Software Quality API 2023 report, API security is
the number-two concern in organizations, with businesses in finance, banking, insurance, defense, and other data-sensitive industries ranking API security as their top
concern [10]. SmartBear’s findings don’t come as a surprise because API attacks are
on the rise. Salt Security’s State of API Security Q1 2023 report found that API attacks
grew by 400% during the first quarter of 2023 [3], and according to Gartner, APIs are
set to become the most common attack vector on websites [11]. If you run APIs in production or plan to use APIs, security must be one of your top priorities.
 APIs often expose sensitive data and user flows, which makes them likely candidates for a security breach. On January 19, 2023, T-Mobile disclosed that the personally identifiable information (PII) of 37 million customers was stolen due to improper
access controls and weak authorization checks on their APIs [12]. Security breaches
like this one can cost your organization dearly.

---

## Sección 12: CHAPTER 1 [Entropy: 0.367]

What is API security?
 API security incidents can also cause damage in less obvious ways. Lack of rate limiting or API metering allows hackers to scrape valuable content from your website,
and the inability to detect malicious activity allows hackers to sabotage your business
model. Sensitive business flows are often easier to abuse through APIs. A common
threat for e-commerce websites, for example, is scalping—the practice of buying out
the whole stock of a high-demand product to resell it at a higher price. We have seen
variations of this threat everywhere. The United Kingdom’s Driver and Vehicle Standards Agency (DVSA) recently had to deal with malicious users who were buying all
the available slots for driving tests and reselling them at a much higher price [13].
 The problem is compounded by a lack of proper visibility. Most organizations lack
metrics on API usage, let alone real-time monitoring of user activity that can be used
to flag malicious behavior. According to IBM’s Cost of a Data Breach Report 2024, it
takes organizations on average 258 days to identify and contain a security breach [14].
With APIs under constant attack, this isn’t acceptable anymore. We can and must do
better, and this book will teach you how.
 API security incidents not only cause financial harm to the business; more important, they damage the reputation of our organization. If our customers cannot trust us
to handle their data securely, they will eventually stop using our platform.
 Despite the damage to our business, customers ultimately pay the price. When customer data gets leaked or malicious users get access to their accounts, our customers
suffer financial and personal repercussions. We have a duty to protect your customers’
data, and securing our APIs properly is part of this deal.
 APIs are both a necessity and a liability. We need APIs to offer our technology services to the world, but APIs can compromise our business model. To ensure that our
APIs deliver value for the business without causing damage, we must secure them
properly.
1.4
Unexpected vectors of attack
Why are API attacks so common and so difficult to tackle? We’ve been building APIs
for decades, but API security is still poorly understood. Compared with traditional
websites, APIs offer new and often unexpected attack vectors. APIs use structured
schemas to represent request and response bodies, for example, and depending on
the configuration and implementation of these schemas, threat actors may be able to
abuse them for data corruption and mass-assignment attacks. Every input parameter
used in an API—whether it goes in the URL, headers, or the request body—can be
exploited for SQL injection, SSRF, and other attacks.
 As you see in figure 1.5, every input parameter in our API is a potential attack vector, and as you’ll learn in chapter 6, the lack of constraints in those parameters only
makes things worse. To understand why, let’s look at an example of pagination. Pagination means slicing a collection of items into smaller chunks so we can process them
more conveniently and efficiently. We need pagination in endpoints that represent a
collection of items, such as a product catalog on an e-commerce website.
1.4
Unexpected vectors of attack
 
Figure 1.5
Every input parameter in an API represents an attack vector, including URLs, query and path 
parameters, request headers, and payloads. Unconstrained user input allows hackers to send malicious requests 
to our API to harm our system or cause unexpected behaviors.
A good pagination pattern allows the user to choose how many items they want to see
per page, which page they want to look at, how they want to sort the items, and how
they want to filter them. All these input parameters represent attack vectors. When filtering items from the list, a threat actor might set the value of the filter to a SQL injection payload, such as GET /products?filter=' OR 1=1;--. If the filter parameter’s
value goes straight into the database query, it may nullify all other query conditions,
potentially leading to data disclosure, broken object-level authorization (BOLA), and
other problems.
 Threat actors can exploit input parameters for other types of attacks, such as biginteger attacks. When a user selects the number of items per page, a sensible choice is
10 or 20, but a malicious user might request 100 million items per page. Requesting a
large number of items from our API puts enormous pressure on our database, which
may cause our site to go down.
 The purpose of API attacks isn’t always to wreak havoc on our databases or take
our sites down. Attackers can also exploit vulnerabilities to introduce unwanted
behaviors into the system or cause errors. While paginating the product catalog, for
example, a user might request page –20. In this scenario, the server may crash or
return a random collection of items to the user, opening the door to a data leak.
 Another major attack vector is request payloads. We use request payloads to send
data to the server over a POST, PUT, or PATCH request, typically to create or update a
resource. A common vulnerability in request payloads allows the presence of additional properties. A financial technology (fintech) API might have an endpoint to
make and update payments. Typically, the payment request undergoes a few checks,
such as ensuring that your account has the necessary funds for the payment. If the
GET /products?perPage=1000000
/products
/orders
/users
/admin/users
X-User-Type
Request payloads
URL paths
Request headers
/products:
page
perPage
filter
sort_param
sort_order
Query and path parameters
GET /users -H 'X-User-Type: admin'
GET /products?filter='; DROP TABLE users;--
POST /orders
{
 "products": [
 {
 "id": "01aae34b-74f9-4b65-9f60-73d0ea458743",
 "amount": 1
 },
 {
 "id": "051303ce-3272-4cdd-8c92-fe66e46da8b9",
 amount: 2
 }
 "status": "paid"
}
GET /admin/users

---

## Sección 13: CHAPTER 1 [Entropy: 0.295]

What is API security?
request payload allows the presence of additional properties, however, a malicious
user may be able to manipulate the state of the payment and bypass the checks. Surprisingly, this vulnerability is common in fintech APIs.
NOTE
I discuss an example of this vulnerability in my talk “API Security by
Design” [15].
But user input isn’t the only attack vector. Access authorization is also more challenging with APIs. We typically implement API authorization with stateless tokens—tokens
that contain all the information we need to validate that the user has access to the
API. How do we tell legitimate tokens from bad tokens? As you’ll learn in chapter 7,
access tokens contain a special component called the signature, which tells us whether
the token is valid. It’s crucial to use strong signing algorithms and ensure that the
token signature is always correctly validated. Although this sounds obvious, many
organizations fail to validate their token signatures correctly, including the likes of
Auth0 [16] and Microsoft [17].
 Role-based access control (RBAC) checks can be more challenging, too. Most
applications have a concept of user roles, such as admin and non-admin users. Some
APIs use specific endpoints or parameters for role-based access. An API might have
admin endpoints under a URL path, such as example.com/admin, or an admin subdomain such as admin.example.com, whereas other APIs flag admin users by using special
headers such as X-User: admin. None of these strategies is inherently wrong as long as
we apply robust access authorization controls in those endpoints. Many APIs, however,
are built under the assumption that admin endpoints will be accessed only by legit
users, which, of course, opens the door for admin access breaches.
 Another type of vulnerability that has emerged in recent years is unrestricted
access to sensitive business flows. This vulnerability occurs when malicious users abuse
our API to take advantage of our business model. Many applications offer promotional codes and discounts when users sign up or invite a friend to join, and threat
actors sometimes exploit such features by creating fake accounts. This attack, known
as promo fraud, affects many organizations, including PayPal, which was forced to close
4.5 million fake accounts in Q4 2021, causing its stock value to slump by 25% [18].
APIs that are vulnerable to business flow exploits can incur significant costs. In chapters 4 and 6, you’ll learn how to address this type of vulnerability to protect your business model.
1.5
How API security fits into the API development cycle
The typical API development process involves four main stages: design, implementation, testing, and operations. Let’s see what happens at each stage:
Design—During the design stage, we gather requirements, decide which API style
to use, and consolidate our design into a formal specification. Working through
the design is an excellent opportunity to threat-model our API and identify
potential threats. (You’ll learn more about threat modeling in chapter 2.) This is
1.5
How API security fits into the API development cycle
also a good time to write down some unit tests to validate our implementation
later. It’s good practice to ensure that technical, product, and business teams collaborate during this stage so that all stakeholders are aligned with our design
choices and the risks we’re willing to take.
Implementation—When we have an API design, it’s time to build. In this stage, we
write the code that implements the API. This stage is also the time to decide
what type of infrastructure we need for the API and set up and configure it.
Testing—When we’ve built the API, it’s testing time. Ideally, we’ll have written
unit tests before and during the implementation stage. After implementing the
API, we want to run fuzz testers to ensure that the implementation is accurate
and behaves as expected. We want to run end-to-end tests to ensure that the
whole system works reliably, and we also want to test the integration with the
API client.
Operations—When we are satisfied that the API works as expected, it’s time to
deploy to production and monitor the API’s behavior and performance. As part
of our operations, we want to ensure that we have detailed logs, monitor user
activity, and have detailed visibility of all user flows and errors. As you’ll learn in

---

## Sección 14: chapter 11, good observability is critical for detecting threats early and reacting [Entropy: 0.5]

to them on time.
How does security fit into this development cycle? The goal of API security by design is
to shift left our security concerns. We start thinking about security from the first step
of our API journey, and we approach every step of the API development process following best practices for security. Figure 1.6 shows how security by design fits within
API development. Let’s see how that works out in practice.
Figure 1.6
Security by design fits into every step of the API development cycle. It encourages us to approach 
design, implementation, testing, and operations from a security point of view.
During the design stage, we want to ensure that our API design is secure. The idea is
not to get lost in security details while we are designing the API, but to consider how
Design
Implementation
Testing
Deployment
• Expose safe user flows.
• Constrain user input.
• Proper pagination
• Clear service boundaries
• Strict schemas
• Test the design for
 security flaws.
• Parameterize database 
 queries
• Validate incoming and
 outgoing data (zero-trust).
• Data transfer objects (DTOs)
• Use robust and up-to-date
 libraries and frameworks.
• Unit tests
• Fuzz testers
• Contract testing
• End-to-end tests
• Test and validate
 before deployment.
• Graceful rollouts
• Observability

---

## Sección 15: CHAPTER 1 [Entropy: 0.295]

What is API security?
our design affects security. This stage is the time to consider what kinds of parameters
we’ll expose to our users, for example, and how we’ll prevent threat actors from abusing input parameters for SQL injection, SSRF, and other attacks.
 When designing operations and user flows, we also want to consider how they
affect security. If we design an e-commerce API, how do we prevent scalping? In a ridesharing API that gives out discount coupons for every referral signup, how do we prevent threat actors from signing up fake users? In fintech APIs, how do we ensure that
malicious users can’t bypass all the necessary checks before a transaction is executed?
Our solutions to these problems have a direct effect on user experience, so it’s important to approach them in collaboration with our business stakeholders. Throughout
the book, you’ll learn strategies to model these security threats and deal with them. As
mentioned earlier, the design stage is an excellent time to write down some unit tests
to validate the implementation later.
 When we are done with design, it’s time to move on to implementation. From a
security-by-design perspective, we want to ensure that we are using robust, secure
frameworks and libraries and keep them up to date. Our implementation will deal
with real data in a live environment, and it’s crucial to validate data thoroughly at
every level of the stack. Applying the principle of zero-trust security, we validate and
sanitize both incoming and outgoing data. It’s also good practice to parameterize all
our queries against the database and to use well-known patterns for secure data handling, such as DTOs. You’ll learn more about secure implementation strategies
throughout the rest of the book.
 As you work through the implementation, keep writing unit tests to ensure that
every layer of your code is working as intended. It’s also a good idea to run your code
through static application security testing (SAST) and software composition analysis
(SCA) tools. SAST checks for common flaws, vulnerabilities, and misconfiguration
errors in your code, and SCA detects known vulnerabilities (common vulnerabilities
and exposures [CVEs]) in your third-party dependencies [19, 20]. Some of the most
popular tools in this space include Snyk (https://snyk.io), Semgrep (https://
semgrep.dev), 
Aikido 
(https://www.aikido.dev), 
Checkmarx 
(https://checkmarx.com), Renovate (https://github.com/renovatebot/renovate), and GitHub’s
Dependabot (https://github.com/dependabot).
 After implementing the API, it’s time to test the hell out of it! We have several goals
at this stage: we want to ensure that our server implementation is fully compliant with
the API design, that it exposes the right behavior, and that it’s secure and robust. We
use tools like fuzz testers to validate the server implementation against the API specification and API security testing tools to ensure that the implementation is secure. It’s
also a good idea to implement a suite of integration tests that validate the expected
API behavior and simulate user flows.
 Finally, it’s time to deploy the API and operate it in the wild. We want to ensure
that our continuous integration and delivery (CI/CD) pipeline tests our APIs thoroughly and prevents us from releasing insecure APIs. We want to have world-class API
1.6
The rapidly changing landscape of API security
monitoring, observability, and alerting in place. We want to be able to tell how our
APIs are being used and to detect and block malicious behavior as soon as it shows up.
1.6
The rapidly changing landscape of API security
Now that we understand what security by design is and how to apply it at every stage of
the API development cycle, let’s consider the current and future state of API security.
API security is a rapidly evolving field. We hear about security incidents nearly every
other week, and the rate of growth of API breaches is only accelerating. APIs are
becoming the most likely vector of attack in our systems, and things are going to
become worse. Why?
 Four factors contribute to this trend: the rapid growth of APIs; the growing complexities of APIs; the growing number of connected devices; and, more recently, the
addition of generative AI. Let’s examine the role of each factor.
 The number of APIs available on the internet is growing rapidly. Nearly every organization with an in-house technical system uses APIs. We use APIs to automate internal processes, drive integrations between microservices, enable integrations with web
and mobile applications, and deliver products and services. According to Akamai’s
2022 API Security Trends Report [21], large organizations use more than 25,000 APIs
on average, and that number is likely to continue growing. The rapid growth of APIs
makes it increasingly challenging to manage them, roll out security improvements,
and have adequate visibility of all the API activity. This, in turn, makes API security
more difficult.
 But the problem is not just the growth in the number of APIs. APIs are also becoming more complex. Modern web applications represent complex user flows, such as
booking a holiday, applying for a mortgage, filing a tax return, or performing realtime collaboration in a shared document. When we design APIs, we must break complex user flows into a series of independent, stateless steps. Flaws in the design open
the door for abuse and manipulation of our business model.
 When a person applies for a mortgage, for example, the lender runs a risk assessment against the applicant, checking things like income, employment, civil status,
number of dependents, property valuation, and credit rating. Some of these checks
may need to happen in sequential order and may depend on one another. If we fail to
model user flows and input accurately and securely, malicious users will be able to skip
checks and get their applications approved when they shouldn’t.
 Although user-facing APIs face a growing number of security challenges, the IoT
presents even more fertile ground for security incidents. When we connect something
to the internet, we increase its attack surface and often make it easier to hack. IoT
offers unique opportunities to hijack and steal smart cars, break into homes, and steal
from stores [22]. Even a traditional laundry business becomes hackable when the
washing machines connect to the internet, as revealed by Alexander Sherbrooke and
Iakov Taranenko, former students at the University of California-Santa Cruz, who
found a vulnerability in the university’s laundry-service API that allowed them to use
the service for free [23].

---

## Sección 16: CHAPTER 1 [Entropy: 0.25]

What is API security?
 The number of smart devices connected to APIs is growing rapidly with the rise of
smart homes, smart stores, smart cities, and so on. Protecting IoT devices is challenging. Some devices ship with hardcoded API keys, so anyone who gets their hands on
the device can steal the key and get unfettered access to the API. Threat actors may
also be able to spoof the connection between devices and APIs, gaining access to sensitive information. Connected devices are vulnerable to hijacking attacks: malicious
users can take control of them and gain access to private networks or repurpose their
functionality to launch distributed denial-of-service (DDoS) attacks and more [24].
 Finally, the rise of generative AI is poised to make API security even more challenging. Many applications use face or voice recognition to perform access security checks,
and the widespread availability of deepfakes makes those checks increasingly vulnerable [25]. With the rise of generative AI, it’s never been easier to hack websites. As we’ll
see throughout the book, threat actors can use large language models (LLMs) like
ChatGPT to generate hacking strategies, such as SQL injection attacks, and put
together the code necessary to execute the attacks. We can expect models specialized
in cybersecurity to become available soon, making it even easier to launch attacks
against websites [26]. In June 2025, the autonomous penetration tester tool XBOW
claimed the top spot in HackerOne’s rankings (https://xbow.com/blog/top-1-howxbow-did-it), a trend that is likely to accelerate in the future.
 More and more developers are using generative AI as a coding assistant in their
daily development jobs to help them understand errors, get coding examples, or generate full code snippets. The use of generative AI in software development can boost
developer productivity, but it can also make web applications vulnerable if the output
from AI models isn’t thoroughly checked, tested, and corrected. Throughout the
book, we’ll learn to tackle these challenges.
1.7
Who this book is for and what you will learn
APIs are ubiquitous on the internet. Nearly every system consumes external services
such as payment processing, geolocation, and emailing over APIs. A growing number
of applications expose APIs for various purposes, such as integration between microservices or consumption by mobile and web applications. All these scenarios pose security threats to both consumers and producers. This book is for everyone who sits on
either side of an API.
 If you’re consuming APIs, this book is for you. If you’re exposing APIs, even if they
are so-called “internal” APIs, this book is for you. If you architect distributed systems
that rely on APIs, this book is for you. If your organization delivers products and services through APIs, this book is definitely for you.
 As part of my job, I get to talk to organizations about API security, and I have the
opportunity to interview people at all levels, from junior developers to chief technology officers. My experience is that API security is a poorly understood topic. This isn’t
surprising because, as saw earlier, APIs expose attack vectors in unexpected ways, and
the traditional recipes for application security are insufficient for APIs. My hope is
Summary
that this book will address this skills gap, raise awareness of the risks associated with
APIs, and foster better security practices in API development.
 This book teaches you what the main types of security API vulnerabilities are and,
crucially, how to protect your APIs against them. You’ll learn to do the following:
Apply the principles and best practices of API security.
Tackle the main types of API security vulnerabilities.
Apply security by design to your APIs.
Identify and address vulnerable API design.
Automate the process of identifying and tackling vulnerabilities in your APIs.
Implement APIs following best security practices.
Design secure infrastructure for APIs.
Apply robust access authorization controls to your APIs.
Implement financial-grade API security.
Operate APIs securely.
Use API observability to detect and react to malicious user activity.
By the end of this book, you’ll be aware of all the main types of vulnerabilities that APIs
face and you’ll know how to tackle them. You’ll know how to build APIs that are secure
by design. You’ll know how to take into account security considerations when you
design APIs and when you model user interactions. You’ll know how to implement and
architect APIs securely. You’ll know how to automate the process of identifying and
tackling security vulnerabilities in your APIs. As we saw at the beginning of the chapter,
an estimated 57% to 83% of all internet traffic goes through APIs. My hope is that this
book will help software developers across the world build a more secure internet.
Summary
API security incidents are costly to organizations. Security breaches can result in
big penalties, and exposing vulnerable user flows allows hackers to abuse our
business model, resulting in potential loss of income and reputation.
Every input parameter in an API represents an attack vector, including URL
query and path parameters, request payloads, and headers.
Security by design encourages us to shift left our API security strategy. With
security by design, we apply security considerations from the design stage of our
API development process.
We can tackle many security vulnerabilities in the design, such as by exposing
safe user flows, constraining user input, and not exposing server-side properties
in user input.
Security by design encourages us to use secure implementation strategies, such
as parameterizing all database queries and avoiding mass assignment.
We must test our APIs continuously to detect vulnerabilities and automate as
much of the testing process as possible.

---

## Sección 17: CHAPTER 1 [Entropy: 0.25]

What is API security?
Secure architectural solutions such as network segmentation, robust API gateways, and strict firewall policies play major roles in API security.
We must monitor our APIs constantly and run real-time analysis of user activity
to detect and react to malicious behavior.
The growing number of APIs and connected IoT devices, the increasing complexity of APIs, and the emergence of generative AI present unique new challenges in API security.
Aligning API security
with your organization
As we saw in chapter 1, APIs are becoming the main vector of attack on the internet. If you work or plan to work with APIs, it’s crucial to start thinking about security as early as possible. The questions are
How do you factor security into your API development?
How do you align security with your product goals and requirements?
This chapter covers
Evaluating your API security posture
Modeling threats for your APIs
Kicking off your API security journey with lowhanging fruit
Creating an API security program for your 
organization
Getting buy-in from your organization to tackle
 API security
Navigating API security audits

---

## Sección 18: CHAPTER 2 [Entropy: 0.265]

Aligning API security with your organization
How do you implement continuous security checks as part of your API development process?
Software development is a social activity. We build software as part of a team, which is
part of a bigger organization. Building software involves talking with stakeholders,
understanding product requirements, prioritizing features and concerns, and working together toward a common solution. We must factor in deadlines, which means
not all features get the same attention or are developed at the same time.
 The style and performance of a user interface (UI), for example, have a direct
effect on the user experience (UX), so organizations prioritize those elements. But
what about something like API security? API security also has a direct effect on the
user, but it’s not as obvious—at least not until you get a data breach.
 We can talk about the technical aspects of API security all we want, but if we don’t
address its social aspects, we may fail to align security with our product goals. How do
we make the case for API security? How do we ensure that our stakeholders understand its importance and allocate time to work on it? How do we align our organization with a sensible API security strategy?
 In this chapter, you’ll learn strategies for aligning API security with your organization’s goals to ensure that it’s adequately prioritized. The first step is to evaluate the
organization’s API security posture to understand where it stands and what you must
tackle first. You’ll learn to model threats for your APIs to understand your risks and
implement an API security program that aligns with your organization’s goals.
2.1
Evaluating your API security posture
Your security posture is your ability to prevent, identify, respond to, and recover from
security threats. To determine how good your security posture is, you must evaluate it.
In my experience, many organizations don’t evaluate their security posture until they
go through a major event, such as a round of investment (with related due diligence)
or a regulatory audit. I recommend that you don’t wait for such events. Instead, start
now. As we saw in chapter 1, a data breach has damaging consequences for your organization. It’s in your best interest to know how well prepared you are to deal with security incidents, and it starts with a security-posture evaluation.
 Various frameworks can help you evaluate your security posture, including NIST
SP 800-53 (https://csrc.nist.gov/pubs/sp/800/53/r5/upd1/final), CIS (https://
www.cisecurity.org/controls), and ISO/IEC 27001 (https://www.iso.org/standard/
27001). Those frameworks provide comprehensive, detailed guidance to help you
secure your organization, and part of it is relevant to API security. Figure 2.1 maps the
most common requirements in cybersecurity frameworks to API security.
NOTE
For a summary of the main cybersecurity frameworks, see Kim Crawley’s 8 Steps to Better Security [1].
2.1
Evaluating your API security posture
Figure 2.1
Mapping the most common requirements in cybersecurity frameworks for API security
Let’s break down the categories in figure 2.1 with questions you need to answer for
each category:
Data inventory
– What kind of data do you collect?
– How do you collect it?
– Where do you store it? For how long?
– Do you have an inventory, and is it updated regularly?
– How does this data get exposed through the API? What are the most sensitive
data endpoints?
Attack surface
– How many endpoints do you expose?
GET /payments
GET /customers
GET /patient-data
GET /customer/1/card-details
{
 "id": 1,
 "first_name": "John",
 "last_name": "Connor",
 "date_of_birth": "1985-02-28"
}
GET /products
GET /restaurants
POST /posts
DELETE /comments/1
Identify sensitive data endpoints
and payloads.
Attack surface
Authentication and authorization
JWT
Secure implementation
Malicious
payload
Secure testing
Detect suspicious user behavior
and security incidents.
Know what to do when an
incident happens.
Training
Incident detection
Incident response plan
Data inventory
Identify all your
endpoints.
Implement best practices
and standards.
Access controls
Users can’t get their hands
on the wrong data.
Risk analysis
1. BOPLA on PUT /posts/1
2. BOLA on GET /rides
3. SSRF on POST /webhooks
Prioritize vulnerabilities.
Raise awareness about API security.
Robust data validation,
parameterized queries,
and so on
Design security testing, fuzz
testers, and runtime security testers.
Developer
Hacker

---

## Sección 19: CHAPTER 2 [Entropy: 0.25]

Aligning API security with your organization
– How many versions of the API do you have?
– Do you have processes in place to prevent exposure of an unknown attack
surface?
Authentication and authorization
– Do you use best practices and standards for authentication and
authorization?
– Are your login endpoints adequately protected from brute-force and other
attacks?
– Do you issue access tokens with robust signatures?
– Do your access tokens contain sensitive information?
– Do you rotate your signing keys often?
Access controls
– Are all your entry points protected?
– Do you have strict access controls for sensitive endpoints?
– Are access policies adequately enforced?
– Who in your organization has access to sensitive assets and how?
– Are access controls implemented correctly?
Secure implementation
– Do you use secure implementation patterns?
– Do you use proper API libraries to handle data validation?
– Are your dependencies secure?
– Is your API design and architecture secure?
– Do you review and test your code before release?
Security testing
– Do you run automated security tests against your APIs regularly?
– Have you ever run a specialized penetration test against your APIs?
Risk analysis
– What are the main security risks for your organization?
– When given a list of vulnerabilities, do you know how to prioritize them?
Incident detection
– Do you have API observability?
– Do you continually analyze API traffic to detect malicious activity?
– Do you receive alerts when a threat is detected?
Incident response plan
– Do you have a detailed response plan for security incidents? Are some of
your incident responses automated?
– Does your response plan comply with your regulatory requirements?
Training and awareness
– Are all company employees aware of the risks associated with your APIs?
2.1
Evaluating your API security posture
– Do you provide ongoing training to keep them up to date with the latest
threats?
Your answers to these questions determine your level of API security readiness and
maturity. If there are some questions you can’t answer, your API security readiness is
low in that area. If you don’t have a data inventory or haven’t mapped your attack surface, for example, you have low readiness in those areas. To evaluate your API security posture, you must tackle your API security readiness first. When you can answer
the questions, you can evaluate your maturity. Having logs and software telemetry is a
good start, but if you’re not actively monitoring those logs to detect malicious activity,
your maturity in this space is low. Table 2.1 outlines a simple, actionable way to assess
your API security posture.
1 Answer yes only when you’re 100% into a category. If you’ve mapped 95% of your attack surface, for example, that’s still 
no, and if your data inventory is updated regularly but not continuously on every change, that’s still no.
Table 2.1
API security posture evaluation questionnaire1
Mature
Not mature
Data inventory
Is your data inventory up to date and continuously updated?
Yes
No
Attack surface
Is your attack surface completely mapped and always up to date?
Yes
No
Authentication and authorization
Do you follow best practices and standards for authentication and 
authorization?
Yes
No
Access controls
Do you have secure and strict access controls, and are they continuously updated?
Yes
No
Secure implementation
Do you use secure design and implementation patterns?
Yes
No
Security testing
Do you continuously test your APIs for security?
Yes
No
Risk analysis
Have you mapped out your API business risks, and are they continuously updated?
Yes
No
Incident detection
Do you have proper API observability and automated detection of 
malicious activity?
Yes
No
Incident response plan
Do you have a detailed response plan for security breaches, and is it 
continuously updated?
Yes
No
Training and awareness
Do you continuously train your staff on API security?
Yes
No

---

## Sección 20: CHAPTER 2 [Entropy: 0.304]

Aligning API security with your organization
Table 2.1 provides a simple framework for API security posture assessment. The
answers to these questions are binary, so, following that framework, you’ll be mature
or not mature. If you want a more nuanced approach, choose a score from 0 to 5 in
each category. You may currently have up-to-date data inventory, for example, but
instead of being updated when your data profile changes, maybe it gets updated once
a year, monthly, or weekly. You can assign a more meaningful score for your specific
situation and prioritize your security improvements based on your business needs.
This exercise is introspective. The only way to make it useful is to be honest with your
answers and scores. Use this framework to shape your road map toward a robust API
security posture, and feel free to adapt it to your needs.
 One word of caution regarding API security posture: many vendors claim to be
able to automate API security-posture management. Although some automation in
this space is certainly possible, not everything can be automated. Security-posture
management involves training, defining business risks, writing incident response
plans, and so on. You can’t automate your way out of those tasks. Even when it comes
to purely technical security testing, not everything can be automated. Corey Ball,
author of Hacking APIs, notes that most automated API security testing tools can’t
detect all problems even in deliberately vulnerable APIs, and in many cases, detecting
vulnerabilities requires knowledge of the business domain, which many automation
tools can’t capture [2]. Be wary of vendors who claim to be able to identify all security
vulnerabilities in your APIs.
 A fundamental component of assessing your API security posture is threat modeling. Threat modeling helps you understand your security risks, map your attack surface, and prepare your incident response plan. In section 2.2, you’ll learn to model
API threats.
2.2
Threat modeling is a team sport
Threat modeling is an analysis of the security characteristics of your system. The goal
of threat modeling is to identify vulnerabilities and see how threat actors can exploit
them. The idea is to think of how a malicious user can achieve their goals, such as
breaking into a database, gaining unauthorized access to resources and operations,
elevating their privileges, or injecting malicious content.
 Threat modeling is a useful exercise for raising awareness about system vulnerabilities. Even a simple threat model, as represented in figure 2.2, provides a lot of insight
into how threat actors can break into your system and what you need to do to secure it
and detect the attacks. Figure 2.2 models a SQL injection attack that bypasses user
access controls on a collection endpoint. As the model shows, the attack happens
because query parameters are unconstrained and database queries aren’t parameterized. The actionable feedback from the model is that you must constrain user input
and parameterize the database queries.
2.2
Threat modeling is a team sport
Figure 2.2
A malicious user bypasses all access controls on the GET /products endpoint by exploiting 
a SQL injection vulnerability on the API.
Good threat models show how an attack goes through the system and which components are affected. The model in figure 2.2 represents an attack involving an API and
a database. More complex systems may include API gateways, load balancers, multiple
services and databases, queues and streams, and more components. Normally, each
part of the system is owned by a different team, so good threat models have input
from all teams. Effective threat modeling is a collaborative effort that brings together
teams including engineers, product owners, quality assurance (QA) testers, business
stakeholders, and others to gain a holistic view of the system.
 How do we go about modeling threats? To push for best practices in threat modeling, a group of industry leaders created the Threat Modeling Manifesto (https://
www.threatmodelingmanifesto.org). The manifesto defines the core values and principles of threat modeling and the main questions that every threat model must answer:
What are we working on?
What can go wrong?
What are we going to do about it?
Did we do a good enough job?
As you see in figure 2.3, each question represents a step in the threat modeling process. To help us implement this process, the Open Worldwide Application Security
Project (OWASP) put together a useful guide to threat modeling [3]. The guide
breaks threat modeling into four steps, each of which maps to a question in the
manifesto:
Application decomposition (What are we working on?)
Threat identification and ranking (What can go wrong?)
Response and mitigations (What are we going to do about it?)
Review and validation (Did we do a good enough job?)
Let’s go through the steps in detail.
 
/products?category=' OR 1=1--
API server
session.execute(
 text(
 f"select * from product where category = '{params.category}';"
 )
 )

---

## Sección 21: CHAPTER 2 [Entropy: 0.451]

Aligning API security with your organization
Figure 2.3
Each question in the Threat Modeling Manifesto maps to a step in the threat modeling process. In this 
example, we show how to model a SQL injection vulnerability in a listing endpoint and how to go about fixing it.
2.2.1
Application decomposition
The first step is application decomposition, which maps to the question “What are we
working on?” The idea is to understand how data flows through the system and what
components are involved in processing data. Because we’re focusing on malicious
user interactions, a helpful approach is to use data flow diagrams (DFDs). Good DFDs
help us visualize how data flows through the system and the components involved.
What happens when a user updates a resource through the API, for example? Each
component involved in processing data represents a potential attack vector. Figure 2.4
shows a DFD of a user updating their profile picture (avatar) with an external URL,
highlighting the potential attack vectors (shaded).
 A common mistake in modeling data flows is overlooking API calls to internal and
external services. In figure 2.4, a critical element of our system is the flow from the
public API server to the internal API. If the public API is vulnerable to server-side
request forgery (SSRF), our threat model must account for the fact that threat actors
may be able to leak data from our internal API. We may fail to model the threat, however, if the data flow between the public and the internal API is missing from our diagrams. To obtain an accurate representation of your data flows, ensure that all
Text
1. What are we working on?
The ability to retrieve a list of products
from the API
2. What can go wrong?
SQL injection through the category parameter
3. What are we going to do about it?
1. Constrain user input on the query
 parameter.
2. Parameterize database queries.
4. Did we do a good enough job?
Yes. The SQL injection attack won’t
work anymore on this parameter.
/products
API server
/products?category=' OR 1=1--
session.execute(
 text(
 f"select * from product where category = '{params.category}';"
Text
 )
 )
session.scalars(select(Product).where(category == params.category))
/products?category=' OR 1=1--
paths:
 /products:
 get:
 parameters:
 - name: category
 in: query
 required: false
 schema:
 type: string
 enum:
 - books
 - movies
 - electronics
2.2
Threat modeling is a team sport
relevant engineers and product stakeholders collaborate in the modeling and diagramming exercise.
Figure 2.4
DFD of a user updating their avatar using an external URL. In this case, the URL can be used 
to run a port scan within our private network, access internal services and databases, leak access 
tokens, and more.
2.2.2
Threat identification and ranking
The next step is threat identification and ranking, which maps to the question “What
can go wrong?” In this step, we try to get into a hacker’s mind and think of ways to
break into or abuse the system. To model attack strategies, we’ll use a threat-modeling
framework; the most popular framework is STRIDE. Let’s see how threat modeling
with STRIDE works and how it helps us identify threats.
NOTE
Loren Kohnfelder and Garg Praerit developed the STRIDE framework
at Microsoft in a 1999 paper titled “The Threats to Our Products.” The paper
is no longer available on Microsoft’s website, but you can download it from
Adam 
Shostack’s 
website 
at 
https://shostack.org/files/microsoft/The
-Threats-To-Our-Products.docx. Alternative frameworks include LINDDUN,
OCTAVE, PASTA, Trike, and VAST. You can read more about them in
OWASP’s Threat Modeling Cheat Sheet (section 2.2).
Figure 2.5 shows how STRIDE’s threat categories attack the system from every angle.
Let’s break it down:
Spoofing—Risk of stealing user credentials and taking over other user accounts
Tampering—Risk of corrupting or performing unintended updates on our data
Repudiation or repudiability—Risk of not being able to prove whether a user
undertook a certain action
POST /me/avatar
{"avatar_url": "https://example.com/me/avatar"}
Internal API
example.com
API server

---

## Sección 22: CHAPTER 2 [Entropy: 0.304]

Aligning API security with your organization
Information disclosure—Risk of leaking system details, configuration, or sensitive
data (data breach)
Denial of service—Risk of making the system unavailable
Elevation of privileges—Risk that an attacker will assume privileges they don’t
have
Figure 2.5
Each threat category in STRIDE represents a strategy for breaking into our system or 
stealing data from our APIs.
Our job is to identify what can go wrong in each category. How can threat actors steal
access tokens? How can they bypass access controls? How can they access data from
other users? How can they steal our system’s configuration details? Run brainstorming
sessions with your team to come up with potential threats or play games such as Elevation of Privilege to generate ideas if you are just getting started with threat modeling.
NOTE
Elevation of Privilege is a threat-modeling card game created by Adam
Shostack in 2010 (https://shostack.org/games/elevation-of-privilege).
API server
Auth server
PATCH /orders/123
{"status": "paid"}
GET /payments?filter=' OR 1=1;--
POST /login
{
 "email": "sarah@example.com",
 "password": "' OR 1=1;--"
}
GET /customers
Authorization: Bearer eyJhbG...
{
 "sub": "1234567890",
 "name": "John Doe",
 "iat": 1770161649,
 "permissions": ["admin"]
}
{
 "alg": "HS256",
 "typ": "JWT"
}
Spoofing
Tampering
Information disclosure
Elevation of privileges
Denial of service
Repudiation
2.2
Threat modeling is a team sport
The best way to answer the preceding questions is to represent the user and data flows
involved in each threat and analyze system vulnerabilities. Let’s consider an example.
Many organizations implement user management systems with custom authorization
flows. As you’ll learn in chapter 7, authentication and authorization are complex, and
custom implementations are often vulnerable. Figure 2.6 represents a privilege escalation threat achieved due to a common vulnerability in such systems that allows malicious users to obtain access tokens from other users by cracking weak signatures and
forging their own tokens.
NOTE
Various open source tools enable you to test the strength of (or break)
JWT signatures. You can read about them on OWASP’s website (https://
mng.bz/Mw6D).
Getting help with threat modeling
If you’ve never done threat modeling, you may find it difficult to run your first threatmodeling exercise within your organization. Like every other skill, threat modeling
gets better with practice, and the more you do it, the better and more effective threat
models you’ll produce. If your organization is just starting threat modeling, start
small, and run threat-modeling sessions frequently, such as every month or once a
fortnight.
To get started, you may find it valuable to use a popular tool such as Microsoft Threat
Modeling Tool (https://mng.bz/X7n9) or OWASP Threat Dragon (https://owasp.org/
www-project-threat-dragon). In these tools, you represent your application’s data flows;
then the tools generate threat models based on those diagrams. Also, with the rise
of generative AI tools in software development, a host of cybersecurity applications
are emerging, such as Matt Adam’s STRIDE GPT (https://github.com/mrwadams/
stride-gpt), which you may find useful for generating threat models. When you use tools
like the Threat Modeling Tool, Threat Dragon, and STRIDE GPT, you should review the
threat models that the tools produce and add any changes you deem necessary.
When you gain confidence with threat modeling, consider using tools like pytm
(https://github.com/OWASP/pytm), which allows you to represent your data flows as
code and generate threat models from them. Diagrams as code are great because
they are more specific, accurate, and unambiguous, and they are easy to review
through pull requests.
Two great resources for learning about threat modeling are Adam Shostack’s classic
Threat Modeling: Designing for Security (Wiley, 2014) and Derek Fisher’s “Threat Modeling with OWASP Threat Dragon” (https://youtu.be/mL5G8HeI8zI). For an overview
of how STRIDE GPT works and what you can do with it, check out Matt Adams’s presentation “AI-Driven Threat Modelling with STRIDE GPT” from the Open Security Summit on January 15, 2024 (https://mng.bz/yNGp).
Check out MITRE’s adversarial tactics, techniques, and common knowledge (MITRE
ATT&CK; https://attack.mitre.org) framework for a comprehensive repository of
threat scenarios that you may find relevant to your applications.

---

## Sección 23: CHAPTER 2 [Entropy: 0.268]

Aligning API security with your organization
Figure 2.6
A common vulnerability in custom authorization servers is issuing tokens with weak signatures. In this 
example, a malicious actor manages to break the token’s signature and produce a token with admin privileges.
With the threats to our system identified, it’s time to rank them by priority. We rank
threats by likelihood and effect on the business. The ranking criteria are highly contextual to our organization and its business. SQL injection attacks, for example, might
be used to steal or corrupt data from our system. If our API design is vulnerable to
SQL injection attacks, that’s a red flag. But if we parameterize all our database queries
and use a web application firewall (WAF; see chapter 9), SQL injection becomes a lowlikelihood threat. The prioritization work should be done in close collaboration with
our stakeholders, especially legal and compliance teams, and is a great opportunity to
raise awareness about API security risks with them.
2.2.3
Response and mitigations
When we’ve identified and ranked our API threats, it’s time to answer the question
“What are we going to do about it?” We must define a response to each threat. Adam
Shostack distinguishes the following types of responses:
Mitigate—Harden the system to reduce the likelihood of the threat. You might
implement rate limiting in the API to prevent brute-force attacks, for example.
Eliminate—If it’s not crucial to the business, remove the feature that causes the
threat. If our API allows users to supply URLs from which our system can pull
data, such as images or company details, malicious actors could exploit this feature to run SSRF, port scanning, and other types of attacks. If this feature isn’t
crucial for our application, we may want to remove it.
Transfer—If the cost of addressing the threat is too high, we may want to shift
responsibility to another agent, such as the customer. If our API allows creating
shareable links for resources containing highly sensitive data, we may decide
that it’s the user’s responsibility to ensure that the link lands in the right hands
and disable it when suspicious access is detected or is no longer needed.
{
 "sub": "1234567890",
 "name": "John Doe",
 "iat": 1770161649,
 "permissions": ["admin"]
}
{
 "alg": "HS256",
 "typ": "JWT"
}
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.
eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZS
I6IkpvaG4gRG9lIiwiaWF0IjoxNzcwMTYxN
jQ5LCJwZXJtaXNzaW9ucyI6WyJhZG1pbi
JdfQ.ylvufUAC1EVIVdEuimqf3LYV74a6EpfeJEYBC3vIRY
asdf
password
secret
...
API server
HMAC
GET /customers
Authorization: Bearer eyJhb...
2.3
Act now!
Accept—If the threat poses an acceptable level of risk for the business, don’t
address it. If our API gives discounts to customers who enroll other users on our
platform, malicious actors can exploit this feature by registering fake users. If
our website is in an early stage of growth, however, we may decide that this risk
is a small price to pay to grow our user base.
Our threat responses have a direct effect on the business. Mitigate means putting in
additional work to harden the system, eliminate means removing features from our
application, and transfer means changing the liability model in our business. For this
reason, it’s important to bring the relevant stakeholders to the table to decide the
most desirable response to each threat.
2.2.4
Review and validation
When we’ve defined how we respond to our threats, it’s time to answer the final question: “Did we do a good enough job?” This stage is a good time to review our previous
work and come together as a team. Do our DFDs represent our system accurately? Did
we identify all the threats? Did we bring the relevant teams and stakeholders into our
threat modeling and resolution exercises? Can we verify that our threat response is
working? Run a retrospective with your team to reflect on your threat modeling processes and identify improvements for the future; if possible, engage other teams to
review your threat models and offer feedback from different perspectives.
DEFINITION
In agile software development, a retrospective is a team meeting
held at the end of an iteration or project to discuss opportunities for improvement for future iterations and identify things that worked well, and the team
should keep doing. To learn more about retrospectives, check out Aino
Vonge Corry’s Retrospectives Antipatterns [4].
An important question at this point is when to do threat modeling. The answer is all
the time! Threat modeling should be a continuous exercise to assess your system vulnerabilities and bring all stakeholders together on the importance of API security.
Our systems are bound to evolve and change, so it’s good to run threat-modeling exercises every few months (such as every quarter or twice a year) to reassess our system
threats.
 If you’re going to make major changes to your applications, it’s also a good idea to
kick off those changes with a threat-modeling exercise. Ideally, you start doing threat
modeling early in the API design process, which allows security to be built into your
APIs rather than bolted onto them.
2.3
Act now!
When and how do you start tackling API security? As you learn more about API security and how it affects your organization, you may want to tackle all of it at the same
time. But here’s the reality: you don’t go from zero to hero overnight. The journey to
becoming a mature organization in API security can take months or years. If you start
your API security journey by taking over the most complex problems, progress may

---

## Sección 24: CHAPTER 2 [Entropy: 0.265]

Aligning API security with your organization
feel slow and demoralizing for you and your team. My recommendation is to start by
picking low-hanging fruit that has the biggest effect on your organization. This will
help you build momentum and confidence in your ability to tackle API security.
 What is that low-hanging fruit? The answer depends on where you are in your API
security maturity journey. Refer to table 2.1 to determine your level of maturity. If your
level of API security readiness is low, start there (i.e., get ready to answer all the questions). Many organizations struggle to keep their API documentation up to date, for
example, and some don’t have proper documentation, which means that they don’t
know what their attack surface looks like. If that’s your case, start there. (See chapter 3
for more details on documenting your APIs.)
 What if your attack surface is already under control? Keep reading. In this section,
I describe actionable steps any organization can take to improve its API security posture, including strengthening the authentication and authorization system, using
proper and up-to-date API libraries, and using cloud protection tools.
2.3.1
Document your APIs
According to Salt Security’s State of API Security Report for Q1 2025, only 15% of organizations feel confident that their API documentation is accurate [5]. If you fall into the
other 85%, that’s bad news for your organization and great news for your hackers. As
you’ll learn in chapter 3, documentation is API Security 101, and there are different
forms of documentation. In this case, we’re looking for a formal API specification.
Without a formal specification, you can’t validate that your API is correctly implemented, and you can’t run security tests against its design. From my experience working
with organizations that sell products and services through their APIs, outdated and/or
inaccurate API documentation also means unhappy clients and loss of business.
 If you lack a formal API specification or don’t have a specification, I recommend
that you work on that task first. As I explained in chapter 1, you can take various
approaches to produce an API specification, including using tools that generate specifications from code and employing an API writer to produce the specification by
looking at your code. If your API is consumed by a web application, you can use a traffic interceptor like Burp to capture API traffic and infer the schemas from the payloads. If your APIs are too complex for these approaches, engage a specialized service
to help you. API specifications document the design of APIs, and as we’ll learn in
chapters 4, 5, and 6, we can tackle many API vulnerabilities by hardening the design.
 When you have a formal specification in place, the next best step is to use it to run
security tests against the specification and validate that your API implementation is
correct. In chapter 12, you’ll learn to run such tests.
2.3.2
Strengthen authentication and authorization
Another piece of low-hanging fruit with great effect on your business is authorization
and authentication. If you look at OWASP Top 10 API Security Risks [6] (also see
chapters 4 and 5), you’ll see that four of them relate to weak authentication and
authorization (API1:2023, API2:2023, API3:2023, and API5:2023), and according to
2.3
Act now!
API expert Eric Newcomer, authorization remains the biggest challenge to API security [7]. Indeed, many APIs are built with the assumption that all authenticated
requests are legitimate, which means that proper access controls are often missing on
sensitive endpoints. (According to Salt Security, 95% of API attacks are performed by
authenticated users [5]). During my consulting work, I’ve found plenty of APIs that
fail to enforce user-based access controls on operations like DELETE and PUT, which
means that any authenticated user can update or delete resources owned by other
users—the fast lane for a data breach.
DEFINITION
Authentication refers to the process of verifying the identity of a
user through a challenge, such as a combination of username and password,
and in many cases, an additional one-time code if the application uses multifactor authentication (MFA). Authorization refers to the process of verifying
that a user has access to the request data and operations in your API.
If you’ve never done it before, I recommend that you review access controls across all
your endpoints. Even better, write automated tests to run these checks repeatedly.
You’ll learn more about this type of testing in chapter 12, but as you can see in figure
2.7, getting started is simple. Create two users, A and B, and a bunch of resources
Text
API server
User A
POST /payments
{...}
{
 "id": 123,
 "status": "processed",
 ...
}
User A
API server
GET /payments/123
User B
API server
GET /payments/123
1. Create resources bound to user A.
2. Ensure that user A has access to their
resources.
3. If user B also has access to user A’s
resources, that's BOLA.
Figure 2.7
Start testing your access controls with simple scenarios. Create 
two users, A and B. Make a payment with user A, and check whether user B has 
access to the details of user A’s payment.

---

## Sección 25: CHAPTER 2 [Entropy: 0.25]

Aligning API security with your organization
linked to each of them. Can user A access resources that only user B should have
access to? If that’s the case, you’ve got a broken object-level authorization (BOLA) vulnerability. Make sure that it’s fixed, and run the same test on all future changes to the
code. This work is tedious, and the bigger and more complex the application is, the
longer it’ll take to complete the test suite. Don’t despair, though. Proceed in small
steps. Fixing one endpoint at a time is already a huge win for your organization.
 Another common vulnerability relates to weak authentication. Authentication and
authorization are complex processes. When it comes to APIs, we must master a ton of
standards to implement authentication and authorization securely. (Chapters 7 and 8
review these standards.) Sadly, many organizations fall into the trap of believing that
they can bypass all these standards and build their own, simpler authentication and
authorization systems. The result is often a weak authentication system with vulnerabilities that threat actors can exploit to take over other user accounts or obtain admin
credentials. 
NOTE
According to Salt Security, 29% of API security incidents in Q1 2025
were related to authentication, and account takeover is the second-mostconcerning vulnerability for organizations [5].
If you’ve gone down the route of building your own authentication and authorization
system, I recommend that you audit the system as a matter of urgency. You’ll likely
find a surprise or two.
 What about your access tokens? The gold standard for APIs is the JSON Web
Token (JWT) specification, which we’ll study in detail in chapters 7 and 8, along with
its alternatives. JWTs are JSON documents that include information about the right of
a user to access our API, and they contain a signature that proves they are legitimate.
JWTs can be powerful and secure, but it’s easy to misconfigure them and lose all their
benefits. Do your JWTs contain personal or sensitive information? They shouldn’t.
What signing algorithm do you use? Does your JWT validation library allow random
algorithms to be specified? If that’s the case, your JWTs are highly vulnerable. Last but
not least, are you sure you are using access tokens, not ID tokens?
2.3.3
Use proper API libraries
One recommendation I make to all organizations I work with is to use proper API
libraries. APIs are deceptively simple. After all, how difficult can it be to handle URL
query parameters and request payloads? As it happens, it’s really complicated, which is
the reason why entire libraries and ecosystems are dedicated to this task.
 Your best chance of delivering a solid API is to use one of those libraries. If you’re
building in Python, have a Flask web server, and want to add an API, use a proper
Flask API library such as APIFlask (https://github.com/apiflask/apiflask) or Flasksmorest (https://github.com/marshmallow-code/flask-smorest). If you’re building
with Django, use the Django Rest Framework (https://github.com/encode/django
-rest-framework) or Django Ninja (https://github.com/vitalik/django-ninja). Good
2.3
Act now!
API libraries have built-in support for input and output data validation, serialization,
and error handling, as well as excellent support for the semantics of the API style you
want to build, such as JSON Schema and OpenAPI for REST APIs and the Schema
Definition Language (SDL) for GraphQL.
 If you already have an API implemented without using proper API libraries, you’ll
have to migrate. To facilitate migrations from one library or framework to another, I
recommend using hexagonal architecture (HA). HA, or architecture of ports and
adapters, decouples your business layer from external dependencies (ports) and uses
adapters to connect to them. The API layer of your application is where you declare
the routes and process the requests, and in HA, that’s a port. Because the API layer is
decoupled, moving to another framework simply requires updating your API layer. As
always, take one step at a time. Start with a small portion of your API and migrate your
endpoints one at a time. You’ll feel the benefits immediately.
NOTE
HA is a widely used pattern for decoupling an application’s business
layer from its external dependencies, such as databases, third-party integrations, and interfaces. To learn more about HA, check out chapter 7 of José
Haro Peralta’s Microservice APIs [8].
2.3.4
Use cloud protection tools
Finally, if you don’t currently use an API gateway or a WAF, using those technologies
will immediately improve your API security posture. API gateways can handle secure
access token validation, add distributed denial of service (DDoS) protection, rate limiting, data validation, and more. API gateways also allow you to take control of your
surface attack area when you configure them as the single entry point to your platform, helping you deal with shadow APIs and similar problems.
NOTE

---

## Sección 26: Chapter 3 discusses shadow APIs at length, but for a quick overview, [Entropy: 0.25]

check out Nick Rago, “Are You Haunted by Zombie, Shadow and Ghost
APIs?” [9].
API gateways allow you to declare which endpoints can be exposed, minimizing the
risk of exposing shadow endpoints. Similarly, WAFs are application-level firewalls that
inspect HTTP traffic and protect applications from well-known web threats, such as
SQL injection and SSRF attacks. Modern WAFs can be fed an API specification to tailor their protection to the specific needs of our APIs.
 You can combine an API gateway with a WAF for further protection. WAFs provide
an additional layer of protection against suspicious requests, SQL injection attacks,
bots, and more.
WARNING
Research shows that technologies like API gateways and WAFs give
organizations overconfidence in their API security posture. Don’t fall into
that trap. API gateways and WAFs are useful but insufficient to fully protect
your APIs. Neither will protect you against attacks like OWASP’s API1:2023
BOLA, which happens when users can access data that doesn’t belong to

---

## Sección 27: CHAPTER 2 [Entropy: 0.25]

Aligning API security with your organization
them. According to Radware’s The 2022 State of API Security [10], “there is a
false belief in the adequacy of API gateways and traditional WAFs providing
adequate protection of APIs against both vulnerability and automated bot
exploits,” with 28.6% of organizations using API gateways and 21.2% of organizations using WAFs as their primary method of identifying API attacks.
As you see, you can do plenty of things right now to start tackling API security at your
organization. The low-hanging fruit will deliver the most value. As you mature in your
API security journey, the obvious question is how to formalize your approach to security
and ensure that everybody is aligned with it. That’s the topic of the following sections.
2.4
Creating an API security program
As your organization grows and your APIs get bigger and more complex, the obvious
question is how to ensure that your APIs remain secure. Many API security initiatives
begin with a single advocate. This advocate could be you, brave reader. As you grow
aware of the importance of API security, you may want to champion it within your
organization. What you will realize is that API security is not the job of one person or
even one team. API security is everybody’s job. Security must be part of the API development process. How do you do that? With an API security program.
 An API security program is an outline of your API security strategy. It describes
your vision and goals and how you plan to achieve them. If you’ve never tackled API
security at the organizational level within your company, don’t be too ambitious at the
beginning. You need a realistic view of what you can accomplish, and you must get
buy-in from your organization (see section 2.5). Crucially, you need Governance (with
a capital G) to ensure that everything comes together and your API security strategy
gets executed. API expert Lorna Mitchell lays out the ingredients of successful API
Governance, or “Governance without tears,” as she puts it [11]:
Write down your standards and keep them lightweight. This documentation is crucial
to keep everybody on the same page with regard to API security, so it should be
succinct, to the point, and easily accessible (such as in a GitHub repository as
opposed to a random page on Confluence). You can make it even more helpful
if you include code examples and references to external sources.
Get lots of input from other stakeholders in your organization. Stakeholders include
architects, developers, and product managers. People are more likely to contribute when they feel listened to, so this is a fantastic way to get buy-in.
Automate. If you’ve been in the software industry for a while, you know that it’s
very difficult to enforce rules unless enforcement is automated. Use securityaware linters like Spectral to test your API designs and fuzz testers like Schemathesis to validate your API implementation.
TIP
Bounty programs are excellent ways to outsource the discovery of your
application’s vulnerabilities, allowing you to tap the expertise of talented
researchers all over the world. Bug hunters disclose their findings responsibly
2.5
Aligning API security with your organization
in exchange for compensation. You can run your own bounty programs or
use platforms like HackerOne (https://www.hackerone.com). Before starting
a bounty program, make sure that you have resolved all known vulnerabilities
and that you have the resources and capacity to act on bug-hunter feedback.
Also, make sure that your program is transparent and compensates bug hunters adequately for their findings.
As your organization grows more mature and confident in API security, you may want
to take things to the next level. If you get sufficient support from your organization,
this is the time to go beyond the low-hanging fruit and address more complex issues.
You might include API security training as part of your program, draft your incident
response plans, or work on advanced threat detection techniques (see chapter 11).
DEFINITION
Many organizations create so-called red, blue, and purple teams
to improve their cybersecurity posture. But what do those teams do? Red teams
simulate threat actor behavior, attempting to run attacks and exploit vulnerabilities in your application. Blue teams focus on threat detection, prevention,
and response; their job is to identify and mitigate the attacks by the red team.
Purple teams analyze the performance of the red and blue teams to discover
opportunities for improvement.
You can run internal threat-hunting sessions within your organization, setting up red,
blue, and purple teams, and if you feel strong about your security posture, start a
bounty program. To do all this, you’ll need buy-in from the rest of your organization,
which is the topic of the next section.
2.5
Aligning API security with your organization
Most organizations want to deliver software as fast as possible, often at the cost of security. But you can push this approach only so far before you get a data breach. As Corey
Ball puts it, “If you don’t test it [your API], then a cybercriminal somewhere is going
to do it for you” [12]. In my experience, most organizations take API security seriously, but they often lack knowledge or guidance on securing their APIs effectively. A
common solution is to delegate API security to cybersecurity teams. You do need
someone at your organization to champion security—someone to hold accountable
for the success of your cybersecurity program, ideally a chief information security officer (CISO) or a role with similar responsibilities. One person or one team alone, however, won’t get you far. API security is not a one-person or one-team job; you need
everybody’s involvement.
 The reason why API security is everybody’s job is that everything in our API, from
the design of user flows to the choice of query parameters and their implementation
details, has a direct effect on our API security posture. Furthermore, as we saw in

---

## Sección 28: chapter 1, traditional application security isn’t sufficient to protect our APIs. We need [Entropy: 0.05]

a more comprehensive approach that covers design, implementation, architecture,
and operations.

---

## Sección 29: CHAPTER 2 [Entropy: 0.25]

Aligning API security with your organization
 Addressing API security properly may appear to add more work to your organization and, hence, slow software delivery. Suddenly, your product managers must take
security into account when designing user flows; developers must get familiar with
proper API implementation libraries, learn to work with JWTs correctly, and study
standard protocols such as Open Authorization (OAuth) and OpenID Connect
(OIDC). They must run robust, comprehensive tests against the API design and
implementation. How can you justify this to your organization?
 Consider the cost of not doing it. If you fail to tackle API security properly, you risk
having a data breach. Data breaches often come with hefty penalties and result in loss
of trust in your business. According to IBM, the global average cost of a data breach in
2023 was $4.45 million [13]. For small organizations, a data breach could mean the
end. Unfortunately, API data breaches are on the rise, often due to basic mistakes. In
September 2022, Optus, Australia’s second-largest telecommunications company, suffered an API data breach that affected up to 10 million customers. The breach
included personal details such as names, home addresses, phone numbers, and even
passport and driver’s license numbers [14, 15]. The cost was a whopping $140 million
to audit the breach and compensate the affected customers [16].
 It should be clear that you can’t afford not to take API security seriously. Can you
really afford API security? Will your software delivery pace slow, and will your organization lose a competitive edge consequently? Not really, not if you do it well. Figure 2.8
shows the typical API development cycle in many organizations. As you see, it goes
through the following stages:
API design
Implementation
Deployment of changes
Running a battery of security tests, typically manually
If we find a security vulnerability, we must go back to the beginning of the process,
redesign the API, reimplement, redeploy, and security-test again. Rinse and repeat
until no issues are found. Not all organizations begin their API development process
with the design stage, which is why it is marked “not always” in figure 2.8. This process
is slow, so in the interest of speed, organizations end up cutting corners in their security testing strategy.
Figure 2.8
The typical API development cycle goes through a design stage, implementation, and then deployment. 
After deployment, we run functional and security tests. If we find any issues during the test stage, we go back to 
the beginning of the process, redesign, reimplement, redeploy, and test again.
API design
(not always)
API
implementation
API deployment
API testing
API security
testing
2.5
Aligning API security with your organization
API security by design takes a different approach. As illustrated in figure 2.9, security
by design addresses security from the beginning of the API development process: the
design stage. It begins with the design of safe user flows and input parameters. We test
our API design for vulnerabilities and proceed to implementation only when the
design is secure or the risk profile of our design is deemed acceptable by our threat
models. Then we build the API, following secure implementation patterns, and validate that the implementation is correct. By the time we deploy and run our security
tests, we’ll find a lot fewer problems to fix and will need fewer repetitions of the cycle
shown in figure 2.8. This means we can release our APIs faster and with more confidence in our security posture.
Figure 2.9
With API security by design, we address security from the API design stage and through every stage 
of development.
Make sure that you can prove to the business that your new approach to API security is
working. How? Use metrics. Measurable outcomes are among the most effective communication tools, and they help you gain buy-in from your organization [17, 18]. How
many times do you go through the cycle in figure 2.8? How long does it take you to
move an API from design to deployment in production? Do you have an API specification, and how many security errors does it have when you test it with Spectral’s
OWASP plugin (chapter 12)? How many errors does a fuzz tester like Schemathesis
(chapter 12) show now when you run it against your API? Keeping track of these and
similar metrics will help you make the case for a robust approach to API security, and
your organization will thank you later.
API design
API implementation
API deployment
API testing
API security testing
Test
Test
Test
Few vulnerabilities
found
API security by design

---

## Sección 30: CHAPTER 2 [Entropy: 0.25]

Aligning API security with your organization
2.6
Navigating API security audits
In an ideal world, organizations start improving their API security posture on their
own initiative. In many cases, though, it takes an audit to make the wake-up call.
Audits can happen for many reasons. Generally, investors audit your system before
they put money into your business. If your business is going to be acquired, the buyer
generally wants to know they are buying a well-architected platform. If you enter a
partnership with a new business, the other business will want to know that your APIs
are safe and secure. Often, instead of running a custom security audit on your platform, investors, acquirers, and business partners require you to have a security certification, such as ISO/27001, HIPAA, SOC, or PCI DSS, particularly in sensitive sectors
such as healthcare, finance, and defense.
 How do you handle these audits from an API security perspective? The first step is
performing a gap assessment, which you can do with the help of the guide in section
2.1. My recommendation is that you be ready to answer detailed questions about your
security posture. Make sure that you get a handle on most of the questions in table
2.1. There’s a world of difference between not knowing what your API attack surface
looks like and having a provisional map; it’s even better if you can provide a percentage of the mapped surface. You must show commitment to continuously improving
your security posture, and sometimes stakeholders like investors demand regular
updates.
 The goal of a gap assessment is to understand how far you are from passing an
audit. The nature of your data is critical. If you work with highly sensitive data, such as
healthcare and financial data, you’ll face more scrutiny from the auditors; therefore,
you’ll want to be able to answer most of the questions in table 2.1 successfully before
you engage the auditor. When you understand the areas where the gap is wider, you
can set up steps to fill those gaps and ensure that you pass the assessment with flying
colors.
 You will never get as much support from your organization to improve your API
security posture as in the face of an audit. You won’t be able to tackle everything at the
same time, but this is a good opportunity to map out your API security strategy if you
don’t have one yet. It’s also an excellent opportunity to start working on some of the
low-hanging fruit we discussed in section 2.3. If this is your first audit, nobody expects
you to be perfect. What is more important is showing awareness of your security technical debt, a road map for addressing it, and a commitment to doing it. Don’t forget
to define some measurable outcomes, as we discussed in section 2.5. Over time, you’ll
be expected to show progress and more maturity, and metrics are among the best ways
to do it.
 Finally, remember there’s always professional help around if you need it. API security audits represent one of the most successful business models in recent years, and
many companies offer services in this space, including APISec, 42Crunch,
Escape.tech, Akto, and SWO2. Just bear in mind that using external service providers
is not an excuse for not creating your own API security strategy. If you have APIs, you
Summary
must own your API security-posture management and work toward an API security-bydesign methodology.
Summary
Your API security journey begins with an evaluation of your API security posture. Organizations with mature API security operations have the following:
– Data inventory (they know what sensitive data they expose and where)
– Attack surface map (they know all the endpoints available on their APIs)
– Authentication and authorization following best practices and standards
such as OAuth, OIDC, and JWTs
– Robust access controls to ensure that users can’t get their hands on the
wrong data
– Secure implementation to ensure strict compliance with the API specification
– Automated security testing using design-testing tools, fuzz testers, and custom test suites
– Risk analysis to prioritize known vulnerabilities quickly
– Incident detection to provide real-time visibility of suspicious user behavior
and security incidents
– Incident response plans (they know what to do when an incident happens)
– Continuous training to raise awareness of API security vulnerabilities
Threat modeling is a great exercise to get a holistic view of your API vulnerabilities and foster team collaboration.
Good threat models answer the following questions from the Threat Modeling
Manifesto:
– What are we working on?
– What can go wrong?
– What are we going to do about it?
– Did we do a good enough job?
To address the Threat Modeling Manifesto’s questions, we break threat modeling into the following steps:
– Application decomposition
– Threat identification and ranking
– Response and mitigations
– Review and validation
We use methodologies such as STRIDE to model threats. STRIDE identifies the
following threat categories:
– Spoofing (risk of stealing user credentials)
– Tampering (risk of performing unintended updates on our data)
– Repudiation (risk of not being able to detect malicious activity)

---

## Sección 31: CHAPTER 2 [Entropy: 0.25]

Aligning API security with your organization
– Information disclosure (risk of leaking sensitive data)
– Denial of service (risk of system unavailability)
– Elevation of privileges (risk of an attacker assuming admin privileges)
The best way to start tackling API security is to pick low-hanging fruit such as
mapping your attack surface, fixing your API documentation, or adopting
authentication and authorization standards.
An API security program is an outline of your API security strategy and how you
implement it.
You need buy-in from your organization to push your API security program
forward:
– Get feedback from your stakeholders to encourage their involvement.
– Create realistic metrics that show how your organization benefits from it.
To prepare for an API security audit, ensure that you can answer detailed questions about your security posture. You must show awareness of current technical
debt and commitment to address it.
API security principles
You’re building an API, and halfway through the implementation, you start wondering whether the API will be secure. As you approach the release date, your manager also wants to confirm with you that security is being taken care of. Scrambling
for an answer, you put together an API security checklist by looking for online
resources such as Shieldfy’s popular API-Security-Checklist (https://github.com/
shieldfy/API-Security-Checklist). You go through the whole checklist and tick all
This chapter covers
What shift left means for API security and its 
effect on the development cycle
The zero-trust security model and how it applies 
to APIs
Why we must secure our internal APIs
The importance of API documentation for security 
by design
Where, how, and why to validate data in our APIs
The role of security in continuous delivery

---

## Sección 32: CHAPTER 3 [Entropy: 0.265]

API security principles
the boxes. You’re confident that you’ve addressed security in your API. As you
approach the release date, your quality assurance (QA) and cybersecurity teams run a
battery of tests against the API. The results are positive. All seems to be good. You
move forward with the release. Two weeks later, you have an API breach. How could
that happen? The problem with this approach is it leaves security for the last minute,
treating it like a second-class concern.
 How do we make our APIs secure? As you’ll learn in this chapter, security begins
with our API design. Are our user flows safe? Do we have clearly differentiated readonly versus write properties and data models? Are we exposing server-side data in user
input? Is user input sufficiently constrained? More important, is our design accurately
documented? A fundamental principle in API security is you can’t protect what you
don’t know, and in this chapter, you’ll learn to use API documentation for security.
 Security also plays a role in technology and implementation strategies. Are we
using proper API and data validation libraries and frameworks? A common mistake is
to start creating APIs without those frameworks, which often results in poorly built
APIs with big security holes. As you’ll see in this chapter, we usually have libraries for
generic tasks like building APIs, handling data validation, and validating access
tokens, and we stand our best chance of delivering secure APIs by tapping into those
libraries.
 Over the course of this book, you’ll learn about the most common API threats and
design vulnerabilities and see how to prevent them by using design, implementation,
and architectural patterns. The basis of those patterns is a collection of security principles, including shift-left security and the zero-trust security model. In this chapter,
you’ll learn about these security principles and how they help you improve your API
security posture.
3.1
Shift-left API security
We can take two fundamental approaches to software security: retrofit security onto our
applications or build security into them. As shown in figure 3.1, the problem with retrofitted or bolt-on security is that it treats software as a black box and checks for generic
API design
API
implementation
API deployment
API testing
API security
testing
Many vulnerabilities
found
Redesign, reimplement, redeploy, test again, security-test again many times over
Bolt-on API security
Figure 3.1
Traditionally, we run API security tests at the end of the software development life cycle (SDLC). This 
approach is also known as retrofitting security onto our applications.
3.1
Shift-left API security
vulnerabilities: lack of SSL, weak encryption, cross-site scripting (XSS), configuration
leaks, unprotected endpoints, and so on. Dan Barahona, founder of APIsec, notes that
this is not sufficient for API security because most API breaches are due to flaws in business and access-control logic [1].
 In 2019, PingSafe found a vulnerability in Uber’s API that allowed an attacker to
take over other user accounts through a series of vulnerable user flows. By supplying a
valid phone number on an endpoint, PingSafe was able to obtain the corresponding
user ID if a match was found. This information could be supplied to the
getConsentScreenDetails() operation, which leaked the user’s access token [2]. Uber
fixed this vulnerability by hardening the API access controls and redesigning the
responses to expose less-sensitive data.
 Fortunately for Uber, this vulnerability was discovered as part of their bug bounty
program. Many attackers, however, won’t be gracious when they discover vulnerabilities in your APIs and would rather exploit them to their benefit. To prevent those vulnerabilities, we must build security into our APIs, which means addressing security
early in the development cycle. This is what we call API security by design, as illustrated
in figure 3.2.
DEFINITION
A bug bounty program is a program through which organizations
offer compensation to individuals who report bugs, security exploits, and
other vulnerabilities on their websites. When run properly, these programs
are effective in uncovering critical vulnerabilities on websites. A popular platform for running bug bounty programs is HackerOne (https://www
.hackerone.com).
Figure 3.2
To build secure-by-design APIs, we must address security early in the SDLC and shorten the feedback 
loop by assessing our vulnerabilities frequently.
API design
API implementation
API deployment
API testing
API security testing
Test
Test
ntation
API deployment
Test
Test
Test
Test
Test
Few vulnerabilities
found
Built-in API security

---

## Sección 33: CHAPTER 3 [Entropy: 0.373]

API security principles
As figure 3.2 shows, everything starts in the design stage. Are our user flows vulnerable? Are we exposing too much sensitive data in certain operations? Do we have
robust access controls? How do we ensure that users don’t override server-side properties? Which endpoints and parameters must be flexible by design and hence require
extra security checks? Addressing these types of questions at the beginning of our API
journey is the best way to build security into our APIs.
 Tackling security during the design stage is a golden opportunity to create a solid
base for our APIs. But API security by design doesn’t stop there; the goal is to
approach every step in the API development process with a security-by-design perspective. Do we use secure implementation patterns? Does the implementation follow the
API specification accurately? Do we have automated tests to validate access controls?
By injecting security into every step of the development process, we’re less likely to
find vulnerabilities at the end. As we saw in chapter 2, this allows us to release more
quickly and with more confidence.
DEFINITION
An API specification is a formal description of an API using a standard interface description language (IDL) such as OpenAPI for REST APIs
and the Schema Definition Language (SDL) for GraphQL APIs. For more on
the benefits of using IDLs, see chapter 1 of José Haro Peralta’s Microservice
APIs [3].
API security by design is an example of what we call shift-left security. Shift left is a paradigm in software development that encourages us to tackle issues early by building
quality into our systems. The benefits of shifting left on security have been well established for many years, as evidenced by the research conducted by the team behind
DevOps Research and Assessment (DORA).
DEFINITION
Shift left is a paradigm in software development that builds quality
into the software by encouraging frequent testing and delivering features in
small batches. This philosophy borrows from W. Edwards Deming’s concept of
total quality management. In his 14 Points for the Transformation of Management, Deming encourages managers to “cease dependence on inspection to
achieve quality . . . by building quality into the product in the first place” [4].
NOTE
DORA was founded by Nicole Forsgren, Jez Humble, and Gene Kim to
study the methodologies that allow organizations to deliver high-quality software fast. DORA publishes a yearly report titled State of DevOps. To learn
more about DORA, see Jez Humble’s article “DORA’s Journey: An Exploration” [5].
In its 2015 State of DevOps Report [6], DORA found that organizations that tackle
quality issues early are more likely to release more often and with more confidence.
The same applies to security. The 2016 State of DevOps Report [7] found that organizations that build “security into their daily work, as opposed to retrofitting security at
the end . . . spent significantly less time addressing security issues.” Later DORA
3.1
Shift-left API security
reports confirm the same findings. The full list of reports is available at https://
dora.dev/research.
 APIs are no exception. According to S&P Global’s 2022 API Security Report [8],
35% of respondents reported projects being delayed due to API security concerns. Of
those, 87% believed that the delays could have been prevented by incorporating security into the daily workflow. It’s not just the speed; shifting left on API security ensures
that we are less likely to run into security incidents in production.
 To illustrate the benefits of shifting left on API security, suppose that we have an
e-commerce application with an API whose GET /products endpoint allows customers
to browse the product catalog. We want to add a sort_by parameter to the GET
/products endpoint so customers can sort products by factors such as price and average review. Two common types of vulnerabilities in this type of parameter are SQL
injection and property enumeration. Property enumeration is an exploit that allows
threat actors to discover fields of our models that are not supposed to be exposed to
external users. On an e-commerce site, one such field could be stock, which indicates
the number of items per product left in stock. As illustrated in figure 3.3, a threat
actor could use the sort_by parameter to sort items by stock available. Such information would be useful in scalping, which is the practice of buying out the whole stock of
a product to resell it at a higher price (chapter 1).
Figure 3.3
A threat actor discovers a server-side property called stock, which allows them to sort 
products by their available stock. Later, they use this information to run a scalping attack on scarce 
products.
With the bolt-on security approach, we won’t detect any vulnerabilities around the
sort_by parameter until we deploy the API to a test environment and run the security
test suite. When we run the security test suite, we may find out that the parameter is vulnerable to SQL injection, but we are unlikely to discover that it is vulnerable to property
enumeration too. A likely fix is applying a regular expression to the parameter to prevent SQL injection, such as by restricting the value to a single word without spaces. As
indicated in figure 3.4, however, this approach still leaves a hole in the API. Because we
are allowing users to sort items by any word, they can still run property enumeration
attacks and gain knowledge about the hidden properties of the product model.
paths:
 /products:
 get:
 parameters:
 - name: sort_by
 - in: query
 - required: false
 - schema:
 type: string
 pattern: ^[\w_]{5,15}$
GET /products?sort_by=discount
PATCH /products/1
{"discount": 100}

---

## Sección 34: CHAPTER 3 [Entropy: 0.668]

API security principles
 
Figure 3.4
Bolt-on security is more likely to lead to a patched approach to security. If our tests uncover a SQL 
injection vulnerability, we patch the API with a regex pattern, leaving the API vulnerable to property enumeration.
Security by design addresses this problem from the start. As highlighted in figure 3.5,
we constrain sort_by to an enumeration with values price and review. Thanks to this
constraint, we remove the SQL injection and property enumeration vulnerabilities by
design.
 Now that we have a robust, secure design, the next task is ensuring that the implementation applies the constraints we included in the specification to the sort_by
parameter. A great way to validate the implementation against the specification is to
use an API fuzzer, as you’ll learn in chapter 12.
Figure 3.5
Built-in security addresses the problem by design, constraining values using an enumeration. The API 
becomes resilient to SQL injection and property enumeration attacks.
For shift-left security to deliver value, you must meet the following criteria:
Determine sensitive user flows at design time and ensure that they are adequately protected. Work with security experts in your organization to design secure
payloads, minimize data exposure, constrain user input, and so on. Write test
cases to ensure that the implementation meets these requirements.
GET /products?sort_by=' OR 1=1--
paths:
 /products:
 get:
 parameters:
 - name: sort_by
 - in: query
 - required: false
 - schema:
 type: string
Bolt-on security
paths:
 /products:
 get:
 parameters:
 - name: sort_by
 - in: query
 - required: false
 - schema:
 type: string
 pattern: ^[\w_]{5,15}$
Vulnerable
Still vulnerable to
property enumeration
GET /products?sort_by=stock
paths:
 /products:
 get:
 parameters:
 - name: sort_by
 - in: query
 - required: false
 - schema:
 type: string
paths:
 /products:
 get:
 parameters:
 - name: sort_by
 - in: query
 - required: false
 - schema:
 type: string
 enum:
 - price
 - reviews
GET /products?sort_by=' OR 1=1--
Not vulnerable
Built-in security
GET /products?sort_by=stock
3.2
Zero-trust APIs
Document the API accurately. As you’ll see in section 3.4, API documentation plays
a crucial role in security because it allows you to catch vulnerabilities and more
at design time. In chapter 12, you’ll learn to assess the strength of your design
using the API specification.
Use the right tooling to test your APIs at design and run times. The API security ecosystem is full of tools that run generic checks against your APIs. Audit your tools
before you use them to ensure that they meet your testing requirements (see

---

## Sección 35: chapter 12). [Entropy: 0.25]

WARNING
Shifting left on security has many benefits, but it’s not a silver bullet and should not be your only security strategy. Shift-left security is not a substitute for a robust battery of QA and cybersecurity tests at the end of your
SDLC, as those tests often capture new vulnerabilities. Remember that security incidents are not a matter of if but when. Shift-left security works best in
combination with robust observability, automatic threat detection and
response, and runbooks that describe what to do when a breach happens.
The rest of this chapter discusses the principles you need to apply for a
proper shift-left security strategy.
3.2
Zero-trust APIs
Modern web applications consist of complex data flows. As shown in figure 3.6, a single operation may require processing data from a user, pulling additional data from a
third-party API, running checks with internal services, and publishing events to a
messaging queue for further processing. The question every security architect must
tackle is, what can be trusted in these flows? Can we trust user input? Can we trust
third-party APIs? Can we trust internal services? What about our own databases?
API server
Third-party API
User service API
Request flow
Response flow
Third-party API flow
Database flow
Service-to-service flow
Figure 3.6
Modern applications consist of complex data flows, such as the request flow when a client 
sends a request to our API server, the response flow when we reply to the request, and the third-party 
API flow when we connect with external services.

---

## Sección 36: CHAPTER 3 [Entropy: 0.25]

API security principles
The best answer to these questions is the zero-trust security model. The concept was
introduced by John Kindervag at Forrester Research, a leading cybersecurity research
organization [9, 10]. Kindervag’s model identifies trust as a core vulnerability in software systems, and it recommends denying access by default to all traffic regardless of
origin. This is often summarized as “Don’t trust anything; always validate.” Kindervag
also recommends actively monitoring, inspecting, and analyzing all traffic to identify
sources of suspicious activity.
 In recent years, the concept of zero-trust security has matured. In 2020, the
National Institute of Standards and Technology (NIST) published a framework of best
practices for implementing zero-trust architecture known as NIST 800-207 [11]. As
shown in figure 3.7, NIST 800-207 defines the following principles:
We treat all data sources as resources.
We validate all traffic regardless of origin.
We enforce user-based access controls following a least-privileged model,
namely, users can access only resources they own or are otherwise authorized to
inspect and/or manipulate.
We use dynamic policies to determine user access, namely, we can change user
access permissions dynamically anytime.
Figure 3.7
NIST 800-207’s zero-trust architecture model requires robust access controls and active monitoring of 
our traffic to detect malicious behavior.
API server
1. We treat all data as a resource
and protect it accordingly.
5. We restrict access to a
resource if it’s compromised.
2. We secure and thoroughly
check all traffic regardless
of origin.
External user
Trusted
employees
Logs
Threat actor
7. We actively monitor
our logs to detect
malicious behavior.
GET /payments/1
-H ‘Authorization: Bearer eyJhbGci...’
GET /payments/1
-H ‘Authorization: Bearer bad_token’
3. Users can’t access resources that don’t
belong to them.
4. We change or block users’ access rights
if we detect malicious behavior.
6. We block traffic that doesn’t have the right
authentication and authorization credentials.
3.2
Zero-trust APIs
We monitor the integrity of all our resources. If a resource is compromised, we
restrict its access to protect our users and our system.
We check that all traffic has the expected authentication and authorization
credentials.
We actively monitor all traffic to detect suspicious activity and evaluate the security posture of our system.
What does this mean for APIs? It means removing trust from every corner of our system. Don’t trust any user, whether they are authenticated or not; regardless of their
role, even if they claim to have administrator privileges; and regardless of the API
they’re requesting access to, including internal APIs (see section 3.4). What do we
mean when we say we can’t trust any user? As shown in figure 3.8, the zero-trust security model has wide-ranging implications for API security. 
Figure 3.8
Zero-trust APIs apply NIST 800-207’s principles to protect all assets and endpoints, apply robust 
access controls, and validate data across all flows while actively monitoring malicious activity.
Zero-trust APIs protect all their endpoints, apply robust validation across all data flows
(including requests, responses, and third-party integrations) and actively monitor all
activity to detect suspicious behavior. The following list enumerates the characteristics
of zero-trust APIs:
Protect all your endpoints.
Don’t expose unnecessary endpoints or operations.
Validate that every API call has the right attributes to access your system (e.g., it
has the right headers, tokens, credentials, and so on).
Payments API
GET /payments
POST /payments
GET /payments/{id}
P TCH /payments/{id}
A
DELETE payments/{id}
GET /payments
GET /payments/1
-H 'Authorization: Bearer bad_token'
PATCH /payments/1
-H 'X-User-Role: Admin'
{"status": "processed"}
{
 "id": 1,
 "status": "pending",
 "merchant": "0cd53477",
 ...
}
Third-party API
{...}
User service
{...}
1. Protect all your endpoints.
GET /payments/1
-H 'Authorization: Bearer eyJhbGci...'
2. Don't expose
unnecessary operations.
3. Check if requests are correctly
authenticated and authorized.
4. Enforce user-based access controls.
5. Validate all data in each request.
6. Validate data in
responses.
7. Validate data from
third-party APIs.
8. Validate data from
internal services.
9. Actively monitor user activity to
detect suspicious behavior.

---

## Sección 37: CHAPTER 3 [Entropy: 0.25]

API security principles
Enforce user-based and role-based access controls to all resources following a
least-privilege access model.
Validate data in all API requests, including payloads and URL query and path
parameters.
Validate all data before sending it back to the users.
Validate all data from third-party APIs before processing it.
Validate all data from internal services and databases.
Actively monitor user activity to detect suspicious behavior and react to it.
The first four characteristics relate to access controls. Zero-trust APIs protect all their
endpoints. Most APIs have a concept of private and public resources. Public resources
are accessible to everybody, whereas private resources are accessible only to their legitimate owners or users who were granted access to them. Even when an endpoint is
publicly available to all users, we want to ensure that it isn’t abused. A product catalog
might be accessible to all users on an e-commerce store, but we don’t want malicious
actors to scrape all the content.
 What about private or user-restricted resources? Most APIs authorize access with
JSON Web Tokens (JWTs). A JWT contains (among other data) claims about the right
of a user to access our API, their role and privileges, and an opaque ID that identifies
the user. As represented in figure 3.9, our job is to check each claim to evaluate the
right of a user to access the requested resource.
Figure 3.9
To authorize a request, we validate all components and properties 
of the JWT, including the signature, the headers, and all the claims in the 
payload against their expected values.
{
 "typ": "JWT",
 "alg": "RS256"
}
{
 "iss": "https://auth.microapis.io/",
 "sub": "ec7bbccf",
 "aud": "https://microapis.io/api/learning",
 "iat": 1638228486.159881,
 "exp": 1638314886.159881,
 "permissions": [...]
}
Header
Payload (claims)
Signature
Validate that the signature
is correct.
Validate all the claims. Is
the audience correct?
What about the issuer,
the permissions, and the
expiry date?
Validate the headers. Does
"alg" have the right value?
3.3
Validate everything
Authorization is one of the biggest sources of vulnerabilities in APIs, especially when it
comes to access controls [12]. A common API security flaw is assuming that all authenticated users are legitimate and, hence, relaxing access controls on authenticated
operations. In fact, according to Salt Security, 95% of API attacks come from authenticated users [13]. This is critical in endpoints that expose sensitive data and operations, such as updating or deleting resources. In February 2022, a security researcher
who goes by the name of Tree of Alpha discovered a flaw in Coinbase’s API that
allowed authenticated users to sell assets they didn’t own by exploiting a flaw in the
data validation layer. [14].
 To prevent authorization breaches, apply the zero-trust security model from the
beginning of your API journey. A good time to decide which endpoints or operations
need extra care from a security perspective is while you’re designing your API. As indicated in figure 3.10, in an e-commerce application, everybody may be able to browse
the online catalog, but only authenticated users can upload new products, and only
the owners of those product listings can update or delete them.
Drawing a security profile of our API like the one in figure 3.10 gives us a good idea of
where we must double down on access controls. We can use this information to write
access control tests and verify that the API implementation complies with our security
model. This is an excellent way to shift left our API security strategy. In addition to
providing robust access controls, zero-trust APIs must apply strict validation across all
data flows; section 3.3 explains how.
3.3
Validate everything
A popular saying in software is “Never trust the client.” The idea is that we can’t control how users engage with our applications, so we must apply robust validation and
sanitization to all data sent to our servers. Input validation checks whether the data
sent to our API conforms to a given schema, and sanitization removes malicious elements from the data. An e-commerce website that allows users to write product
reviews, for example, might constrain the text to 1,000 characters. Input validation
checks whether the text contains 1,000 or fewer characters, and input sanitization
ensures that the input doesn’t contain malicious code or unexpected characters that
can raise errors, harm our system, or cause unexpected behavior when processed.
Let’s see some examples.
E-commerce API
GET /products
POST /products
GET /products/{id}
P TCH /products/{id}
A
DELETE /products/{id}
Unauthenticated user
Figure 3.10
On an 
e-commerce platform, 
an unauthenticated 
user can browse the 
catalog but can’t 
upload new products or 
change their details.

---

## Sección 38: CHAPTER 3 [Entropy: 0.28]

API security principles
 Figure 3.11 represents a common pattern for building modern web applications
with a single-page application (SPA) framework in the frontend (aka the client) and
an API in the backend. Can we trust the client to send legitimate data to our servers?
Figure 3.11
A popular pattern for building web applications uses SPA frameworks like React in the 
frontend and connects them to an API in the backend.
As illustrated in figure 3.12, client applications help constrain input and ensure that
users send only legitimate data, but nothing prevents them from going directly to our
servers. In fact, modern applications often expose APIs in the backend, which users
can legitimately call with any type of client, such as command-line terminals. What
does this mean for our threat model? We can’t expect all users to send valid data, and
threat actors will send malicious requests at the first chance.
Figure 3.12
Client applications ship with data validation functionality to help ensure that users send only valid 
data to our servers.
Payments API
GET /payments
POST /payments
GET /payments/{id}
PATCH /payments/{id}
Page 1
https://microapis.io
SPA frameworks talking to a backend API
Payments API
GET /payments
POST /payments
GET /payments/{id}
PATCH /payments/{id}
Page 1
https://microapis.io
{...}
Payload
validation
SPA frameworks talking to a backend API
Validated payload
3.3
Validate everything
Can we trust our users to send legitimate data to our servers? Absolutely not. When
receiving data in our system, we must handle two types of risk:
Malformed or invalid data
Malicious data
Malicious data speaks for itself. It includes things like malicious SQL statements and
execution commands that can wreak havoc if they make their way into the system.
What about malformed or invalid data? Malformed or invalid data doesn’t conform to
the requirements of our data models. When malformed data makes its way into the
system, it causes confusing errors and integration problems. As shown in figure 3.13,
the system may assume certain value constraints for some data models, and if we fail to
enforce those constraints, our application will fail when the data is handled in other
contexts.
Figure 3.13
The underlying data model in a book catalog API assumes that book formats can be only 
printed or ebook. A user lists a new book, setting the format to digital. When the data is loaded in 
a different context, it causes an error because the application can’t handle the invalid value.
To prevent the risk of malformed or malicious data, we must validate all data coming
to our servers regardless of origin. How about other data flows? As we saw in figure 3.6
(reproduced as figure 3.14 for convenience), modern applications consist of complex
data flows, such as the request flow, the response flow, and the database-to-application
flow. Can we trust that the data flowing through those channels is safe and valid? No,
we can’t. To understand why, let’s dive into some of these flows.
Book
+ title: str
+ author: str
+ format: enum(printed, ebook)
Book catalog API
POST /books
{
 "title": "Microservice APIs",
 "author": "Jose Haro Peralta",
 "format": "digital"
}
GET /books
Failure to serialize the
response due to invalid
values

---

## Sección 39: CHAPTER 3 [Entropy: 0.25]

API security principles
 
Figure 3.14
Modern applications consist of complex data flows, such as the request flow, the response 
flow, and the third-party API flow.
As shown in figure 3.15, the third-party API flow involves pulling data from a thirdparty API. In modern applications, this data flow is typical. We use third-party applications to outsource common yet complex tasks, such as sending emails, mapping coordinates, managing calendars, making payments, signing documents, and pulling user
profile data from third-party applications.
Figure 3.15
Modern applications use third-party APIs to outsource common yet 
complex tasks such as processing payments, sending emails, or resolving a 
location’s coordinates.
API server
Third-party API
User service API
Database flow
Service-to-service flow
Third-party API flow
Response flow
Request flow
Third-party payments
processor (Stripe,
GoCardless, and so on)
Third-party delivery
service API
Third-party geolocation
API
Third-party
email service
Process payment.
Find coordinates of
current location.
Arrange delivery.
Send confirmation email.
Orders API
GET /orders
POST /orders
POST /orders/{id}/pay
GET /orders/{id}/tracking
3.3
Validate everything
What could go wrong? By pulling data from third-party applications, performing operations with them, and storing data in their servers, we are directly exposed to their
threat models. As indicated in figure 3.16, if a third-party application has a vulnerability, threat actors may be able to inject malicious code or bad data into that system.
When our APIs consume data from the compromised provider, the malicious data/
code can make its way into our system, with damaging consequences. This vulnerability, known as unsafe consumption of APIs, is one of the top vulnerabilities in modern
APIs.
NOTE
“Unsafe Consumption of APIs” was included in the OWASP top 10 list
of API threats in 2023. Check out the official website for a brief description of
this vulnerability [15].
We’ll dive deeper into this topic in chapter 5, but for now, suffice it to say that you
must apply strong validation and sanitization controls on data coming from thirdparty APIs.
Figure 3.16
A threat actor updates their details with malicious code on an external 
identity provider. Later, they register with our website, bringing in their details from the 
external service provider, and their malicious code runs against our database, dropping 
the table users.
What about data coming from our own internal services? Surely everything that comes
from our system must be safe and valid. Not so fast. First, service-to-service integrations are complicated. As illustrated in figure 3.17, even a small mistake in the implementation of a payload model can lead to cascading errors. Suppose that service A
checks the status of a payment with service B. If service A expects an enumeration with
values pending or paid and service B returns processing, service A may break, and the
User service
External identity
provider
PATCH /profile
{
 "address": "drop table users--;"
}
Threat actor updates their
profile with malicious code.
POST /register
Threat actor registers
with our service, bringing
their details from the
external identity provider.

---

## Sección 40: CHAPTER 3 [Entropy: 0.25]

API security principles
end user will get a confusing error. To prevent this situation, ensure that you always
validate data coming from other services and raise an appropriate error when you
receive bad data. Ideally, trigger an alert to notify the relevant team too.
Figure 3.17
When we don’t validate the responses from other services, we risk triggering cascading 
errors that result in confusing experiences for our users.
All these problems come together in the response data flow. Every request to our API
needs a response, and often, that response contains data (except 204 responses, which
are empty). 
TIP
For an overview of the most common types of responses in APIs, see

---

## Sección 41: chapter 4 of my book Microservice APIs [3]. [Entropy: 0.25]

As shown in figure 3.18, composing a response usually involves pulling data from our
database, collating data from other services and third-party APIs, and putting everything together into a single payload. This exposes the response flow to the third party
and the service-to-service flow, but there’s more. What about data coming from our
own database? Can it be trusted? No, not really.
 As shown in figure 3.19, data in our database can be altered in many ways, including manual changes, accidental scripts, or the wrong migration. Remember that
cybersecurity incidents are not a matter of if but when, and we must be prepared to
handle them. Make sure to validate the data you pull from the database using schema
validation libraries or object-relational mappers (ORMs). ORMs create a one-to-one
mapping between our models and the database tables, and good ORMs help us validate constraints such as enumerations.
Orders API
GET /orders
POST /orders
GET /orders/{id}
POST /orders/{id}/pay
Payments service
{
 "id": "193b4ed7",
 "status": "processing"
}
User checks the
status of their order.
Payments service returns a
unexpected value.
Status code: 500
{"message": "Internal server error"}
Orders API fails to process the
payments service’s response and
returns a confusing 500 response.
Orders API checks
order’s status with
payments service.
3.3
Validate everything
 
Figure 3.18
Composing a response’s payload often involves collating data from different sources, as in this 
example of a user requesting the status of their order. In this case, the orders service aggregates data from thirdparty APIs, other internal services, and its own database.
 
Figure 3.19
Our database can be corrupted in multiple ways, including accidental scripts, the wrong migration, 
or manual changes. If we fail to validate data from our database, we risk cascading and confusing errors in our 
applications.
What’s left in the response flow? As you can see in figure 3.20, the final step involves putting together the data we’ve collected from various sources and assembling it into a single payload. Before sending the payload to the user, make sure to validate that it
conforms to the right API schema. Validating the payload at this stage ensures that you
Third-party payments
processor
Third-party delivery
service API
Third-party
geolocation API
Product service
Third-party integrations
Internal services
Order service’s
database
GET /orders/1
Status of the payment
Status of the delivery
Current location’s
coordinates
Product details
Order’s details
Orders API
GET /orders
POST /orders
GET /orders/{id}
POST /orders/{id}/pay
Payments API
User
Developer
GET /payments/1
ALTER TABLE status RENAME TO payment_status;
API queries payment data.
The API breaks while processing
payment data due to an unexpected
column name.

---

## Sección 42: CHAPTER 3 [Entropy: 0.265]

API security principles
don’t send malformed data to the client and helps you raise meaningful errors when
bad data leaks into the payload, giving you visibility and traceability of the problem.
Figure 3.20
Zero-trust APIs ensure that consumers receive good data by validating all data sources regardless 
of origin.
It’s clear that we must validate all data flows to safeguard the security and integrity of
our systems. What about internal APIs? Let’s tackle that topic in section 3.4.
3.4
No such thing as an internal API
Organizations build APIs for various purposes, such as offering products and services
over APIs or to drive integrations between internal components. Another popular use
for APIs is to automate internal processes, also known as back-office APIs because
they’re not related to direct sales. Back-office APIs help us manage staff and payroll,
prepare sales forecasts, manage projects, and other internal processes. Due to their
inherent nature, back-office APIs expose highly sensitive data about employees, customers, and other business and trade secrets. The bigger the organization is, the more
of this type of API it has.
 Because they’re meant for internal use, back-office APIs are often assumed to be
internal APIs, meaning that they’re not publicly exposed. The implementation details
vary from organization to organization, but often, internal APIs run in a private network (figure 3.21). The practice of breaking a network into small subnets with varying
degrees of access is called network segmentation, which is a powerful security practice
but shouldn’t be our only security strategy.
Third-party payments
processor
Product service
Order’s details
Third-party integrations
Internal services
Order service’s database
GET /orders/1
{
 "id": "0dcf7100",
 "created": "2027-02-01",
 "status": "paid",
 "product": {"name": "Microservice APIs"}
}
Validation layer
Status code: 200
Status of
the payment
Product
details
Orders API
GET /orders
POST /orders
GET /orders/{id}
POST /orders/{id}/pay
3.4
No such thing as an internal API
 
Figure 3.21
Organizations usually have public and internal APIs. Public APIs are available to all 
external users, and internal APIs are available only to employees. Internal APIs help automate 
internal jobs such as customer and inventory management, and due to the sensitive data they 
contain, they run in private networks.
Traditionally, cybersecurity teams have deemed internal APIs to be less risky because
they run in private networks. Sadly, this means that back-office APIs often get little
love in the way of design and security efforts, which makes them ticking security
bombs. Internal APIs often suffer from a lack of authorization and access controls,
excessive data exposure, a lack of documentation, and more. Consequently, if the API
accidentally becomes publicly available due to a configuration or deployment mistake,
our security posture is immediately compromised. How likely is this to happen?
According to Salt Security, 2% of all attacks against APIs in 2023 were directed against
internal APIs [13], and we have reason to believe that the trend will grow in the coming years.
 This is what happened in September 2022 to Optus, Australia’s second-largest telecommunications provider. According to an insider source, Optus created a customeridentity API as part of a bigger project to enable two-factor authentication. The API
was for internal use and was supposed to run in a private network, so it had no access
controls—no authentication or authorization required to access it. Accidentally, however, the API got deployed to a test network with internet access, and millions of customer records were exposed [16]. What can we learn from the Optus breach?
Payments API
Inventory API
Customer
management API
Sales forecasting
API
Orders API
Catalog API
Public network
Private network
External user
Company’s employee

---

## Sección 43: CHAPTER 3 [Entropy: 0.268]

API security principles
All APIs must be adequately protected with robust authentication and authorization, and the more sensitive the data that the API exposes is, the stricter the
access controls must be.
There is no such thing as an internal API. Whether an API gets deployed to a
private network or not is an artificial distinction. There’s a risk of human mistakes when deploying APIs or configuring our networks, and we stand our best
chance of preventing a data breach if we apply the zero-trust security model to
all our APIs.
Internal APIs without proper access controls are also vulnerable to insider threats,
whether intentional or accidental. An example of an intentional insider threat is an
insider malicious actor who steals or leaks sensitive data from your organization. An
example of an insider accidental threat is an overprivileged user who accidentally
modifies or deletes sensitive data or leaks sensitive secrets by mistake. By applying the
zero-trust model to the design and implementation of internal APIs, we stand a better
chance of mitigating these risks.
 This is not to say that deploying internal APIs to a private network isn’t useful. Network segmentation is a powerful security method, and APIs that are not supposed to
be public shouldn’t be exposed on the internet, but it shouldn’t be our main or only
strategy. As Kindervag notes, “network segmentation is a tactic and a tool, not a strategy for building secure networks” [17]. To secure our APIs properly, we need a more
fundamental approach: we need to shift left on our security and apply the principles
described in this chapter. How do we know that we are protecting all our assets adequately? We’ll tackle this question in section 3.5.
3.5
You can’t protect what you don’t know
We know we must protect all our APIs, including public and private APIs. But where are
our APIs? One of the biggest risks organizations face in the API space is a lack of documentation and inventory, which is part of a bigger problem: API sprawl, the proliferation of APIs within organizations and their failure to track, document, and properly
assess the security posture of those APIs. The API security industry has created catchy
names for the types of APIs that emerge under API sprawl, such as shadow, zombie, and
ghost APIs. Figure 3.22 illustrates the differences among these types of APIs.
TIP For an excellent overview of this problem, check Nick Rago’s article “Are
You Haunted by Zombie, Shadow and Ghost APIs?” [18]
As organizations embark on digital transformation programs, cloud migrations, application modernization, and similar projects, they often need to publish APIs to expose
new functionality and services. Unfortunately, many of these APIs are created ad hoc,
without proper planning, design, testing, and security assessments. These APIs created under the radar are known as shadow APIs. Often, these APIs are undocumented;
they are not part of a central catalog of APIs; and few members of the organization
know about them.
3.5
You can’t protect what you don’t know
Figure 3.22
API sprawl raises the risk of shadow, zombie, and ghost APIs. These APIs tend to be less 
protected, and when hackers discover them, data breaches can result.
Eventually, many shadow APIs are forgotten. They remain published, but nobody
maintains them or looks after them. Forgotten APIs are known as zombie APIs. What
about ghost APIs? Ghost APIs are APIs we haven’t created ourselves; they are developed
by someone else, hence ghostwritten. Open source libraries may expose endpoints
that are not well documented or contain malicious dependencies that expose backdoors. As an example, in November 2020, the npm security team removed from the
repository a library called twilio-npm, which exposed a TCP backdoor [19].
Types of API sprawl
API sprawl is the proliferation of APIs without control, often duplicating existing functionality and without documentation. There are different types of API sprawl, including
shadow APIs, zombie APIs, and ghost APIs. Let’s discuss their differences.
Shadow APIs are APIs built and released under the radar, without following a proper
testing and evaluation process. These APIs tend to be undocumented, less secure,
and quickly forgotten, leaving a hole in the system. For a detailed overview of the
security risks that shadow APIs pose for your organization, check out Teresa Pereira’s
excellent talk “Do not live in the Shadow (APIs),” delivered at apidays Paris, December 5, 2024 (recording at https://youtu.be/D2Gjf310QAs?si=ZZRFk_1u-sfEsSXy).
Zombie APIs are deprecated APIs or versions of an API that we forgot to retire. Zombie
APIs aren’t maintained anymore but are still exposed on the internet.
Ghost APIs are exposed by our libraries or infrastructure. Ghost APIs aren’t a problem
unless we don’t know about them and take appropriate measures to protect them.
Shadow APIs
Deprecated versions
/api/orders/v1
/api/orders/v2
/api/orders/v3
/api/special-payments
/api/all-customers
/api/sensitive-data
GET /api/orders/v1/orders
GET /api/all-customers
GET /admin
Orders API
GET /orders
POST /orders
POST /orders/{id}/pay
GET /orders/{id}/tracking
GET /admin

---

## Sección 44: CHAPTER 3 [Entropy: 0.25]

API security principles
 Equally, cloud services sometimes expose configuration and management endpoints. Amazon Web Services (AWS) EC2 instances expose an Instance Metadata Service (IMDS) endpoint (http://169.254.169.254/latest/meta-data), which allows the
retrieval of AWS access keys and other details. The IMDS is available only locally
(within the EC2 instance) but can be exploited via an attack strategy called server-side
request forgery (SSRF), which allows threat actors to trigger API calls to random endpoints from our system [20].
 How big is the scale of this problem? According to S&P’s The 2022 API Security
Trends Report [8], organizations use 15,564 APIs on average, with large enterprises
(more than 10,000 employees) having 25,592 APIs on average. The number of APIs
organizations use is also growing at an unprecedented speed, with an average growth
rate of 201% in the 12 months leading up to the survey. Many of those APIs are undocumented, and unsurprisingly, they are among the top security concerns for organizations [13].
 Why is this a big problem? First, shadow and zombie APIs often have a weaker security profile and compromise your security posture. Second, without knowing how
many APIs you are exposing, you don’t know what your attack surface looks like. As we
saw in chapter 2, mapping out your attack surface is a prerequisite for API security
readiness and necessary for evaluating your API security posture.
 How do you map out your attack surface and keep track of all your APIs? You need
documentation. Bruno Pedro, author of Building an API Product (Packt, 2024), notes
that there are different types of API documentation, such as specifications, tutorials,
how-to guides, code samples, and changelogs [21]. If you offer products and services
directly over APIs, it’s best practice to document your APIs using all these strategies to
deliver a good developer experience (DevEx) and reduce the time to first call [22].
 The best tool for documenting your attack surface is an API specification, a formal
description of your API using a documentation standard such as OpenAPI for REST
APIs or SDL for GraphQL. API specifications are unambiguous and machine
readable, which means we can use them for automated testing, evaluation, and cataloging purposes. If you don’t have standard specifications for your APIs, that’s the first
problem you must tackle to improve your security posture.
 API specifications are useful for understanding how a single API works, but how do
you manage an inventory of hundreds or even thousands of APIs? You need an API
catalog—a tool that helps you track all your APIs in one place. With catalogs, you can
browse and discover existing functionality within your organization. Why is that helpful? When you have 15,000 APIs in place and are thinking about the next one, maybe
you don’t need to; maybe it already exists in the catalog. For large organizations, API
catalogs are essential tools for fighting API sprawl.
DEFINITION
An API catalog is a centralized, up-to-date list of all your APIs.
Good API catalogs provide descriptions of the APIs and allow us to look for
existing functionality to avoid building duplicate APIs.
3.5
You can’t protect what you don’t know
How do you build an API catalog? It can be as simple as creating a list of your existing
APIs with their versions and descriptions. Traditionally, APIs.json (https://
apisjson.org) has been the reference in this space. APIs.json is an open specification
for indexing APIs, similar to sitemap.xml for websites, and it supports human-readable elements such as pricing and terms of service. More recently, Kevin Smith, senior
technology strategist at Vodafone, wrote an Internet-Draft proposing a standard location for API catalogs under a well-known URI: /.well-known/api-catalog [23].
API catalogs make perfect sense when you have visibility of what APIs your organization is building and why. But what about those shadow APIs that your development
team already deployed under the radar? For those APIs, you may want to explore commercial solutions that inspect your API traffic to discover all your APIs and build an
“I’m not worried about what I know. I’m worried about what I don’t know.”
API discovery is the process through which we discover attack surface exposed by our
APIs that we didn’t know about. Discovery is one of the hottest topics in API security.
Whenever I give a talk about API security, much of the conversation after the talk
focuses on API discovery. Most of my consulting engagements include conversations
about API discovery. As one executive put it, “I’m not worried about what I know. I’m
worried about what I don’t know.”
Commercial solutions implement API discovery with various approaches. Vendors,
including Traceable (https://www.traceable.ai, now part of Harness) and Noname
Security (acquired by Akamai; https://www.akamai.com/products/api-security),
implement discovery through observability, whereas StackHawk (https://www.stack
hawk.com) implements discovery through code analysis. None of these solutions is
perfect. Discovery through observability discovers only what comes through in
request logs. There may well be additional hidden endpoints that are not discovered
because nobody uses them—until a hacker comes around, that is. Discovery through
code analysis is incredibly challenging due to the many ways endpoints can be implemented and exposed in a codebase and is likely to offer mixed results unless it goes
through every version of your software to determine when and how it was deployed.
The takeaway is that API discovery is challenging, and even the most sophisticated
solutions are likely to yield partial results. As with most software problems, you can’t
simply tool your way out of unknown APIs. The good news is that your operations and
infrastructure teams probably know more than you think about what has been
deployed when, where, and how. I suggest having conversations with your team
before exploring commercial solutions. If nothing else, those conversations will get
you in a better position to make the best use of vendor tools.
To learn what’s possible in this space, check out Dan Gordon’s talk “API Catalog: The
First Step in Protecting your APIs.”a 
a Gordon, Dan (2022, July 27–28). “API Catalog: The First Step in Protecting Your APIs” [video]. 
 Presentation at apidays, New York. https://youtu.be/ZMBN5muGtD4

---

## Sección 45: CHAPTER 3 [Entropy: 0.265]

API security principles
inventory from that. As illustrated in figure 3.23, this approach can be effective for
discovering shadow and zombie APIs when combined with an inventory of your
known assets. The API catalog space is under active development as we speak, so make
sure that you research your options before making a choice.
Figure 3.23
API observability tools look at your traffic and discover undocumented attack 
surfaces by inspecting which requests your API servers accept.
When you’ve discovered your shadow APIs, the best move is to shift your API security to
the left by planning and cataloging your APIs before deploying them. You’ll need to
align with your organization to ensure that everybody understands why this is necessary
(check chapter 2 for tips), and you’ll need a way to prevent unauthorized deployments.
In chapter 9, you’ll learn about network segmentation and other techniques that allow
you to disable unauthorized access to all your APIs by default and ensure that inbound
traffic happens only through well-documented and protected endpoints.
3.6
DevSecOps for APIs
We’ve learned a lot about shifting our API security to the left, zero-trust security, the
importance of validating all data flows and mapping our attack surface, and more.
How does it all come together in the SDLC? What does the actual process of building
an API following shift-left security principles look like? In this section, we explore the
role of security in the API development process. Figure 3.24 represents a model of the
ideal SDLC for APIs. In the rest of this section, we dive into the details of each stage in
the figure.
 As shown in figure 3.25, everything begins with a design. At this stage, we focus on
the capabilities we want to offer through the API, the type of data we’re willing to
expose, and the user flows that will allow our customers to achieve their goals. This is
a golden opportunity to identify sensitive operations that need extra security
GET /api/orders/v1/orders
GET /api/all-customers
GET /admin
/api/orders/v1
API catalog
GET /admin
/api/all-customers
API discoverability tool
3.6
DevSecOps for APIs
considerations. The result of this exercise is an API specification that describes our
requirements in detail.
Figure 3.24
Shifting left on security means assessing vulnerabilities at every stage of the development cycle and 
not moving on until we address them.
 
Figure 3.25
API design is a great opportunity to assess how vulnerable our user flows are and determine 
where we need to take extra care from a security perspective. We write functional and security tests to 
reflect our expectations.
Later, we’ll use the API specification as an artifact to validate our implementation and
assess our security posture, so it’s important that all relevant stakeholders have visibility of it and that we can track changes. Using a Git repository is a great way to accomplish both goals. If we later have to make changes to the API, the first step is to amend
the specification and review the proposed updates, and Git makes it as simple as raising a pull request (PR). All relevant stakeholders can come together in the PR to discuss and validate the change. As shown in figure 3.26, you can manage your API
specifications in a common repository or place the specification within the repository
that implements the API. I find the latter approach convenient, but a common repository may provide better visibility of all API specifications and help enforce the same
standards across the board.
API design
API implementation
API deployment
API vulnerability
assessment in live
environment
Design vulnerability
assessment
Implementation
vulnerability assessment
CI/CD tests
API release
Bidirectional feedback loop
between vulnerability
assessments and development
API design
Design vulnerability
assessment.
Commit to Git
repository.
API specification
Write functional and
security tests.

---

## Sección 46: CHAPTER 3 [Entropy: 0.265]

API security principles
 
Figure 3.26
Some organizations prefer a centralized repository with all API specs, which provides better visibility 
of all APIs and facilitates enforcing common guidelines. Others prefer to include the API spec in the application’s 
repo, which facilitates testing against the spec.
Before we move on to the implementation, we test the design to identify vulnerabilities and address them. You’ll learn more about this type of API testing in chapter 12.
As APIOps expert Ikenna Nwaiwu notes, this is also a great opportunity to write functional and security tests and to define essential key performance indicators (KPIs) for
the API. This part of the process is essential for creating a strong alignment with our
stakeholders.
 At this point, the API specification is simply a hypothesis about what we want to
build. When we start building the API and testing it, we’ll discover shortcomings in
our original design, and our specification will inevitably change and evolve. My recommendation is to give the design your best shot but not spend too much time on it
because it’s going to change anyway. Also, don’t forget to version your APIs. At some
point, you may need to introduce non-backward-compatible changes, and versioning
helps create a smooth transition between versions. To learn about API versioning strategies, check out appendix B of José Haro Peralta’s Microservice APIs [3].
 With the API specification ready, it’s time to build. If the API will be consumed by a
component within our platform, such as a web or mobile application or a microservice, we can work on the API server and the consumer in parallel with the help of
mock servers, as illustrated in figure 3.27. It’s also good practice to generate SDKs that
make it easier to consume the API.
API design
Design vulnerability
assessment.
Application
repository
API specification
Central API
specs repository
+ API guidelines
Assess compliance
with API guidelines.
App repository
App repository
App repository
Application
repository
Assess compliance
with API guidelines.
Central API
guidelines
3.6
DevSecOps for APIs
TIP
To learn about automatic SDK generation, check out Sidney Maestre’s
excellent talk “You Don’t Need SDKs, Wait Maybe You Do?” [24].
DEFINITION
A mock server replicates the behavior of your APIs based on the
specification. Popular tools for running mock servers are Prism (https://
github.com/stoplightio/prism), WireMock (https://github.com/wiremock/
wiremock), and Microcks (https://github.com/microcks/microcks). For
more details about how mock servers work and how to use them, see chapter
7 of my book Microservice APIs [3].
Figure 3.27
When we produce an API specification, we can work on the API client and the server in 
parallel. We simulate the backend using mock servers while we work on the client, and we validate the 
server implementation against the specification to ensure that the integration works.
Remember that this is our opportunity to validate that our API design fits our needs
and constraints. If we must make changes, we want to know as soon as possible, so we
shorten the feedback loop by deploying small changes frequently. As shown in figure
3.28, our continuous integration pipeline plays a crucial role by testing our implementation before it gets deployed.
Figure 3.28
Our continuous integration/continuous delivery (CI/CD) pipeline plays a crucial role in ensuring that 
only reliable, secure code is deployed. If any tests fail, we go back to the design stage to reassess our API 
vulnerabilities.
API design
API specification
Mock servers
API client
development
API server
development
Validation against
the API
specification
API design
Design vulnerability
assessment.
Commit to Git
repository.
API specification
Write functional
and security tests.
API
implementation
Design vulnerability
assessment.
CI/CD pipeline
Tests pass.
Tests fail.
Deployment
Manual vulnerability
assessment

---

## Sección 47: CHAPTER 3 [Entropy: 0.25]

API security principles
We want to run manual QA and security tests too. Ideally, these fine checks are difficult to automate; they address vulnerabilities that are difficult to capture with automated tools. If we have an e-commerce site, is our API vulnerable to scalping attacks
(buying out the whole stock of a product to resell it at a higher price)? Are threat
actors able to scrape our whole catalog of products? Are we adequately protected
against brute-force authentication attacks? As always, if our API is vulnerable, and we
must change the design, we should know as soon as possible. Run these tests frequently and automate them when possible. Finally, as shown in figure 3.29, when the
API is good to go, we release it to production and publish it to our catalog.
Figure 3.29
If the final round of manual vulnerability assessment goes well, we move to the final stage of the API 
development life cycle: publish to our API catalog and release.
This concludes our overview of the principles of API security. You’ve learned what API
security by design is and how it helps us shift our security strategy to the left. You’ve
learned to apply the zero-trust security model to APIs, where and how to validate in
your data flows, and how to use documentation for vulnerability assessment. Finally,
you’ve learned to bring everything together in the SDLC by making vulnerability
assessments at every stage. In the rest of the book, we’ll get into the nitty-gritty of vulnerability assessment and the types of API risks and exploits, and we’ll see how to protect our applications against them.
Summary
Shift-left security is a paradigm that encourages us to address vulnerabilities at
every stage of the SDLC.
Tackling security early allows us to build security into our APIs. Tackling security at the end results in inefficient security solutions and more vulnerable
applications.
Security by design encourages us to shift left on security by tackling vulnerabilities from our software’s design stage.
When we apply security by design to our APIs, we are less likely to find major
vulnerabilities at the end of the SDLC, allowing us to release faster and with
more confidence.
CI/CD pipeline
Tests pass.
Tests fail.
Deployment
Manual vulnerability
assessment
API design
API implementation
Publish to API
catalog.
Release API.
Summary
The zero-trust security model encourages us to remove trust from our systems
and validate all traffic regardless of origin.
Zero-trust APIs validate data across all flows, including third-party APIs, our own
databases, internal services, and the request and response flows.
There is no such thing as an internal API. Zero-trust security means applying
the same level of security to all our APIs.
Bad API documentation or lack thereof means we don’t know how many APIs
we have or how they work.
API sprawl is the proliferation of duplicated and undocumented APIs. It
includes
– Shadow APIs—Undocumented APIs released under the radar with few or no
checks
– Zombie APIs—Deprecated API versions that we forgot to retire
– Ghost APIs—APIs exposed by our third-party libraries or systems
API catalogs help us fight API sprawl by facilitating API discovery.
To shift left on API security, begin by assessing vulnerabilities during the design
stage. Tackle security at every stage of the SDLC, and address vulnerabilities
when tests fail before moving on.
Top API authentication
and authorization
vulnerabilities
APIs expose access to sensitive data and operations in our systems, and it’s clear
that we must protect them. But what are we protecting them from? What do API
vulnerabilities look like and how are they exploited? How do we defend our APIs
against those vulnerabilities? How and when do we know we’ve done enough to
mitigate risks to our APIs? If these questions are bugging you, you’ve come to the
right place. In this chapter, we examine Open Worldwide Application Security Project’s (OWASP’s) list of API security threats and learn to mitigate them.
 OWASP is a not-for-profit organization created by Mark Curphey in 2001 to support a host of community-driven projects in cybersecurity. In 2003, OWASP
This chapter covers
Mitigating API authentication and authorization 
vulnerabilities
Finding common flaws in role-based access 
controls
Preventing unintended updates to our data
Mitigating sensitive data leaks
Preventing abuse of our business logic
4.1
Running the code examples
launched its signature top 10 list of web-application security risks, which has since
been updated regularly. OWASP is your first stop for understanding what kinds of
threats your applications face and how to deal with them.
 APIs didn’t catch OWASP’s attention until recently. That’s understandable; we’ve
been building APIs for decades, but only recently did they come into the spotlight as
security liabilities. OWASP published its first list of top 10 API security risks in 2019
[1], and ever since, the list has been a reference for API security practitioners.
OWASP continues to monitor the API security landscape to keep the list of top threats
up to date and made a major update in 2023 [2].
 The publication of OWASP’s API Security Top 10 list was a turning point in the API
space. It acknowledged that API security is different from traditional web security and
creates new challenges. More important, it gave us all an overview of the main types of
threats that APIs face. In this chapter and chapter 5, we analyze OWASP’s list of API
vulnerabilities, viewing specific examples to see how threat actors exploit them and
how we mitigate them. In this chapter, we look at vulnerabilities related to authentication and authorization access controls; in chapter 5, we look at API configuration and
management-related vulnerabilities.
 Whenever possible, I illustrate every vulnerability with a coding example and show
practical strategies to address and mitigate the vulnerabilities. The coding examples
aim to demonstrate how vulnerabilities become exploitable, and to that extent, I
made a conscious effort to keep the listings simple. My goal is to help you understand
the basic patterns that lead to vulnerabilities and exploits in your APIs, and if you
study the examples carefully, you’ll be able to spot these patterns in your own APIs.
 The examples in this chapter are written in Python but are generic enough to
apply to all development stacks. The coding examples focus on code that demonstrates a vulnerability. If you want to run the vulnerable servers and play around with
them, you need additional bootstrapping code to set up the servers. You can find that
code in the GitHub repository for this chapter (https://github.com/abunuwas/
secure-apis/tree/main/ch04).
4.1
Running the code examples
This chapter and chapter 5 contain plenty of practical coding examples that illustrate
the types of vulnerabilities discussed throughout the chapters. I’ve also included coding examples of solutions that address and mitigate the vulnerabilities. If you want to
try the code examples from the book’s GitHub repository as you read the chapters,
please read this section before you proceed to understand how they are set up and
how to work with them.
 When you look at the code listings in these two chapters, note that the listings show
only the code fragments that are relevant to illustrate the vulnerabilities and their remediations. The full implementations are available in the book’s GitHub repository
(https://github.com/abunuwas/secure-apis), including additional bootstrapping

---

## Sección 48: CHAPTER 4 [Entropy: 0.265]

Top API authentication and authorization vulnerabilities
code needed to set up the API server, the database, seed data, and so on. I excluded the
bootstrapping code from the code listings because it doesn’t add value to the explanations, but it’s available in the book’s repository if you want to understand how it works.
 To run the code examples, make sure that you have Python 3.11 or later. If you
don’t have Python on your machine, follow the instructions on the Python Foundation’s website (https://www.python.org/downloads) to install it. The code examples
use the uv dependency manger, one of Python’s most popular dependency management tools, to install third-party libraries. When you have a Python runtime, install the
uv dependency manager with the following command:
pip install uv
Depending on your Python installation configuration, the pip command may take different forms, such as pip3, pip3.11, or pip-3.11, with the suffix reflecting the version
of your Python runtime.
 When you have uv, you can use it to install and manage additional Python versions.
See the official documentation for additional information on that feature (https://
docs.astral.sh/uv/concepts/python-versions).
 All the code listings in this chapter and chapter 5 use the same dependencies. The
full list of dependencies is in the ch04/pyproject.toml file, which contains additional
configuration information about the project, such as name, version, and author. I
selected FastAPI (https://github.com/fastapi/fastapi), which is Python’s most popular
framework for building REST API applications, to build the APIs, and SQLAlchemy
(https://github.com/sqlalchemy/sqlalchemy), which is Python’s most popular objectrelational mapper (ORM), to interface with the database. If you want to learn more
about FastAPI and SQLAlchemy, check out chapters 2, 6, and 7 of José Haro Peralta’s
Microservice APIs (Manning, 2022). To install the dependencies needed to run the
code, use the following command:
uv sync
This creates a local virtual environment in a folder named .venv/ with all the dependencies. After installing the dependencies, activate the virtual environment with the
following command:
source .venv/bin/activate
You are ready to run all the code examples. Every example features an API server that
illustrates the vulnerabilities discussed in the following sections. To run the server with
the broken object-level authorization (BOLA) vulnerability, for example, use the following command:
uvicorn bola:server --reload
The command uses uvicorn (https://github.com/encode/uvicorn), which is a web
server commonly used to run FastAPI applications. The server runs in the localhost on
port 8000, and you can access the autogenerated API’s Swagger UI at http://localhost:8000/docs. You’ll find it easier to interact with the APIs when you use that URL.
4.2
Broken object-level authorization
 Some endpoints in the examples are authenticated, and to interact with them, you
need a valid access token. The ch04/auth.py module implements authentication
access controls for all the servers, including token validation. To obtain a valid access
token, use the following URL: https://apithreats.com/login.
 The practical code examples in chapters 4 and 5 involve two steps: encountering
the vulnerable version of the API and then changing the code to fix the vulnerability.
In the book’s GitHub repository, you find the two versions of the code, with the vulnerable version of the API under the /vulnerable URL path. For the BOLA illustration, you’ll find the vulnerable implementation under GET /vulnerable/orders/
{order_id} and the safe version under GET /orders/{order_id}. The same pattern is
replicated across all other examples. The ch04/README.md and ch05/README.md
files contain full details on each server implementation and tell you where to find the
vulnerable and the safe endpoints.
4.2
Broken object-level authorization
BOLA happens when an API fails to apply user-based access controls to resources,
such as when user A can access resources or operations that should be accessible only
to user B. Let’s see an example that illustrates this concept. Figure 4.1 shows a simple
blogging platform where users can publish and edit their content. Users publish with
the POST /posts endpoint, and edit with the PUT /posts/{post_id} endpoint. Editing a
post on the PUT /posts/{post_id} endpoint must be available only to the post’s
author. If user B publishes a post and the post’s ID is 1, the PUT /posts/1 resource
should be available only to user B. As the figure shows, however, when user B publishes a post on the blogging website, user A can edit it, which means that the website
is failing to enforce user-based access controls and therefore is vulnerable to BOLA.
Figure 4.1
BOLA happens when user A can access resources or operations that should 
be accessible only to user B, such as updating user B’s posts.
Blogging API
User B
PUT /posts/1
User A makes unauthorized
edits of user B’s post.
User A
/posts/1
/posts/2
/posts/3
User B’s posts
201 response
200 response
POST /posts
{...}
User B creates a post.

---

## Sección 49: CHAPTER 4 [Entropy: 0.25]

Top API authentication and authorization vulnerabilities
NOTE
BOLA is also referred to as insecure direct-object reference (IDOR). The
idea is the same: threat actors can access resources that don’t belong to them.
BOLA is a more recent nomenclature. Generally, IDOR is used more often in
older publications.
BOLA is a leading cause of security incidents in APIs. In November 2018, the US Postal
Service (USPS) fixed a vulnerability that allowed any authenticated user to access personal details of other users through its Informed Visibility API. Informed Visibility was
a real-time tracking service for USPS business partners. The API also provided access to
users’ personal details, such as email addresses, phone numbers, and physical
addresses. Unfortunately, any authenticated user (any user with an account) could
access the Informed Visibility API and query the system to obtain personal details on
other users, which allowed threat actors to gain unauthorized access to their data.
TIP
For more information on this breach, see Brian Krebs’s article “USPS
Site Exposed Data on 60 Million Users” [3]. 
In sensitive sectors such as health care, finance, and defense, BOLA is a leading factor
in data breaches. When I make payments via my bank, for example, I should be the
only user who can access information about those payments. If the bank’s API is vulnerable to BOLA, other users will be able to access information about my payments,
resulting in a data breach.
 Sadly, businesses that operate in sensitive data sectors are not immune to BOLA
either. In February 2024, fertility tracker Glow addressed a vulnerability in its API that
allowed any authenticated user to access the personal data of other users of the platform, including age, address, and uploaded images. 
TIP For more details on this breach, see Lorenzo Franceschi-Bicchierai’s
article “Fertility Tracker Glow Fixes Bug That Exposed Users’ Personal
Data” [4]. 
How does BOLA happen, and what can we do to prevent it? BOLA occurs at the
resource level. As illustrated in figure 4.2, most APIs use the concept of resources. In
an e-commerce application, for example, we may have multiple resources that represent payments, products, and orders. When we place an order, we create an order
resource.
 Every resource has ownership and permissions models that determine the access
controls on the resource. The more sensitive the resource is, the stricter the access
controls. Orders and payment data are very sensitive, so when I place an order, I’m
the owner of that resource and the only user who is allowed to view, edit, or cancel it.
Meanwhile, user reviews and product descriptions are less sensitive, so everybody can
see them, but only the owner can edit or delete them. In this case, BOLA happens if a
threat actor manages to edit or delete my reviews.
4.3
A practical example of BOLA
Figure 4.2
Most APIs have a concept of resources. A REST e-commerce API might have product resources served 
under a /products endpoint, order resources under /orders, and so on. To prevent unauthorized access, we must 
protect every resource with the right access controls.
How can threat actors get their hands on my orders? Every resource has an identifier.
In a REST API, for example, an order might be represented through a URL such as
/orders/1 if the order’s identifier is numerical, whereas a GraphQL API might expose
a query operator like getOrder(id: ID!) that allows us to retrieve the details on an
order. In either case, threat actors play with different order ID values to try to access
resources that don’t belong to them. The key to preventing BOLA is ensuring that we
have an accurate implementation of our access controls to every resource. Let’s see
how we do that with a specific example.
4.3
A practical example of BOLA
From an implementation point of view, BOLA occurs when we fail to check whether
the user has access to the requested resource. On an e-commerce website, we may
have an API to place orders and retrieve order details. Because orders contain sensitive information, including user address and payment details, we want to restrict
access to their legitimate owners. In this case, BOLA happens when user B can access
user A’s order details, as shown in the following listing.
# file: ch04/bola.py
@server.get("/orders/{order_id}") 
def get_order_details(
 order_id: int, 
Listing 4.1
Implementation of an orders resource endpoint vulnerable to BOLA
E-commerce platform
Orders API
/orders
Orders service
/orders/1
/orders/2
/orders/3
Orders resources
Payments API
/payments
Payments service
/payments/1
/payments/2
/payments/3
Payments
resources
Products API
/products
Products service
/products/1
/products/2
/products/3
Products
resources
POST /orders
{...}
We define a GET /orders/{order_id} 
endpoint on our server.
We capture the endpoint’s 
order_id parameter.

---

## Sección 50: CHAPTER 4 [Entropy: 0.665]

Top API authentication and authorization vulnerabilities
 user_claims: UserClaims = Depends(validate_access) 
):
 with session_maker() as session: 
 order = session.scalar( 
 select(OrderModel).where(OrderModel.id == order_id)
 )
 if order is None: 
 raise HTTPException(
 status_code=404,
 detail=f"Order with ID {order_id} not found."
 )
 return { 
 "id": order.id,
 "product": order.product,
 "quantity": order.quantity,
 }
This listing implements a GET /orders/{order_id} endpoint that allows us to fetch the
details on an order. The endpoint is authenticated and therefore accessible only with
a valid token. The validate_access() function validates the token, and if it’s valid, it
returns an instance of the UserClaims object, which is assigned to the user_claims
parameter. Token validation happens automatically through the Depends() function,
which is FastAPI’s implementation of dependency injection.
 In line 7, we open a database session to run a query and search for the requested
order. We execute the query using Python’s popular ORM SQLAlchemy, and the only
condition we add to the query is that the record’s ID must match the ID requested by
the user. The query in line 9 translates to the following SQL statement: SELECT * FROM
TABLE order WHERE order_id = @order_id;. If we don’t find any records matching the
ID, we return a 404 response; otherwise, we return the full order details. The 404 (Not
Found) status code means that the resource requested could not be found on the
server, so it’s an appropriate status code for this situation.
 Why is the code in listing 4.1 vulnerable to BOLA? The code doesn’t check who’s
requesting the order details, so anyone with a list of valid order IDs can access other
users’ orders. You can confirm this by running a manual test. Follow the instructions
in section 4.1 to create a virtual environment and install the dependencies, and run
the following command to start the server:
uvicorn bola:server --reload
Log in at https://apithreats.com/login to obtain an access token (following the
instructions in ch04/README.md), and send the following request to the server:
curl 'http://localhost:8000/orders/1' \
 -H 'Authorization: Bearer <access_token>'
If you’re running the code directly from the book’s GitHub repository, you can find
the vulnerability under the GET /vulnerable/orders/{order_id} endpoint. To prevent
We authenticate 
the endpoint 
using FastAPI’s 
Depends() 
function.
We open a 
SQLAlchemy 
session to query 
the database.
We retrieve an
order record
using the
requested ID.
If no order is found, we 
return a 404 status code.
We return the 
order details.
4.3
A practical example of BOLA
this vulnerability, we need to check whether the user has access to the requested
resource. The next listing adds a second condition to our database query to check
whether the requested record also matches the user’s ID. With this change, the query
statement becomes SELECT * FROM TABLE order WHERE order_id = @order_id and user =
@user_id. Thanks to this change, threat actors won’t be able to access other users’
orders simply by supplying valid order IDs. In chapter 7, you’ll learn more about validating tokens and extracting user details from them to make the tokens’ claims available to our routing functions.
# file: ch04/bola.py
@server.get("/orders/{order_id}")
def get_order_details(
 order_id: int,
 user_claims: UserClaims = Depends(validate_access)
):
 with session_maker() as session:
 order = session.scalar(
 select(OrderModel).where(
 OrderModel.id == order_id,
 OrderModel.user == user_claims.sub, 
 )
 )
 if order is None:
 raise HTTPException(
 status_code=404,
 detail=f"Order with ID {order_id} not found."
 )
 return {
 "id": order.id,
 "product": order.product,
 "quantity": order.quantity,
 }
In the preceding listing, when a threat actor requests orders from other users, we
respond with a 404 (Not Found) status code, meaning that the resource was not found.
This response is fitting in this situation because we don’t want to reveal whether those
resources exist. If the resource is known to the user, who just happens to lack access to
it, we can respond with a 403 (Forbidden) status code. This status code signals that the
user has valid credentials but doesn’t have the right permissions to access the
requested resource. Therefore, 403 responses implicitly acknowledge that the
resource exists. This status code is perfectly fine in some situations. In a project management application, for example, it’s OK to reveal to a user that a ticket exists within
their organization, but they don’t have access to it. This feedback is useful and actionable; the user can reach out to the relevant person on their team to get access to the
ticket. 
Listing 4.2
Fixing BOLA vulnerabilities by checking a user’s right to access a resource
We add the user’s sub claim 
to the database query.

---

## Sección 51: CHAPTER 4 [Entropy: 0.28]

Top API authentication and authorization vulnerabilities
TIP
For an excellent analysis of the security implications of using different
status codes, check out Tereas Pereira’s article “How Can HTTP Status Codes
Tip Off a Hacker?” [5].
Another subtle consideration is response times. If your API consistently responds with
different latencies to requests for existing and nonexistent resources, a sophisticated
threat actor can use that information to enumerate resources. This is known as a sidechannel attack because the threat actor gains information about our system inadvertently by analyzing the system’s responses to different inputs. Check whether your API
follows such a pattern, and if so, consider putting measures in place to deliver consistent response times across all requests.
DEFINITION
A side-channel attack is a type of attack in which the threat actor
uses information inadvertently leaked by the system to gain knowledge about
internal configuration, discover data, and so on. One example is a timing
attack. In the case of APIs, timing attacks exploit request-response latencies to
gain knowledge about our application via resource enumeration and other
strategies.
BOLA is a widespread vulnerability in the API space, and it takes only a vulnerable
endpoint to end up in a data breach. To mitigate this risk, review and test all your API
endpoints to see whether any of them is vulnerable to BOLA. You can begin by making the type of manual test illustrated in this section, and in chapter 12, you’ll learn to
automate BOLA tests. If you discover that an endpoint is vulnerable to BOLA, you
must prioritize this issue and fix it as soon as possible, following the recommendations
in this section.
 A strong authorization model builds on robust authentication, and sadly, this is
one area that many APIs fail to get right. In section 4.4, we’ll look at the most common flaws in API authentication and how to address them.
4.4
Broken authentication
Most APIs need an authentication system. As illustrated in figure 4.3, authentication
systems allow us to manage user accounts, verify the identity of a user when they log in
to our website, and issue access tokens. Authentication is the most critical component
of our API security strategy and underpins our ability to protect our APIs. Many of the
security measures we discuss in this chapter rely on the information contained in
access tokens. If threat actors can easily take over other user accounts and steal their
tokens, the rest of our security strategy will crumble.
 How does broken authentication happen? We’re looking at vulnerabilities that
allow threat actors to hijack our authentication and authorization flows, break into
other user accounts, and tamper with access tokens. What makes authentication and
authorization flows vulnerable? As illustrated in figure 4.4, a common cause is poor
credentials management. Many websites have weak password policies that allow users
to employ easy-to-guess passwords, for example. Equally prevalent is the lack of
4.4
Broken authentication
prevention against brute-force attacks, allowing threat actors to attempt multiple combinations of username and password until they find one that matches. Another common attack strategy is credential stuffing. Users often tend to use the same credentials
across multiple websites, which means that if their credentials are leaked from one
site, threat actors can insert (stuff) them into other websites to try to take over other
user accounts.
Figure 4.4
Credential stuffing is a common exploit in which threat actors use leaked user credentials from other 
websites and insert (stuff) them into our API to try to take over other user accounts.
Authentication system
Access token
/login
/token
User A
User B
User C
Threat actor
User A
Figure 4.3
An authentication system manages users’ identities, credentials, and access 
permissions. When a user logs in, they get back an API access token with specific permissions.
Authentication
system
POST /login
{
 "username": "sarah.connor@apithreats.com", 
 "password": "asdf"
}
Threat actor
User A
emails
sarah.connor@apithreats.com
harry.potter@apithreats.com
bruce.wayne@apithreats.com
frodo.baggins@apithreats.com
susan.calvin@apithreats.com
lara.croft@apithreats.com
Credential
stuffing
Weak passwords
Brute-force attacks

---

## Sección 52: CHAPTER 4 [Entropy: 0.295]

Top API authentication and authorization vulnerabilities
A recent trend in login flows involves introducing the username or email in the first
step; then, if the username or email isn’t registered, the user is prompted to create an
account and otherwise proceed with their password. Gmail uses this approach, and
many other websites follow suit. The problem with this flow is that without excellent
threat detection support, it represents an excellent opportunity for threat actors to
figure out which user accounts are registered. In other words, multistep login flows
may offer a chance to enumerate users registered on our website.
 Other common vulnerabilities include exposing sensitive credentials (such as passwords or access tokens) in the URL and allowing users to change sensitive details
(such as username, email, or password) without password confirmation, which allows
threat actors to modify them after hijacking a user session or their access token.
What about access tokens? In figure 4.5, we are looking at vulnerabilities in the process of issuing and validating access tokens, which can lead to token-tampering
attacks. Another type of vulnerability is credentials replay, in which a threat actor
intercepts another user’s credentials, such as their access token, and uses those credentials to impersonate the user. Credentials replay is particularly troubling in highly
sensitive applications such as those in banking, finance, and healthcare. In chapter 10,
you’ll learn strategies for adding proof of token ownership so you can prevent
credentials replay attacks.
 Let’s illustrate how threat actors may exploit vulnerabilities in the credential validation process. The most common type of credential used in APIs is the JSON Web
Token (JWT) specification. JWTs are JSON objects that contain information about the
The risk of exposing sensitive credentials through the URL
Why is it risky to expose sensitive credentials through the URL? There are two reasons:
URLs are recorded in the browser history, so if the API is accessed from a
web application, a threat actor who gets access to another user’s browser
history can get hold of the user’s credentials.
URLs end up in access log files (i.e., your server’s access logs) and hence
are accessible to anyone who can get their hands on those files, including
threat actors. 
How realistic is the probability that threat actors will break into our logs? More realistic than you think. In October 2023, Okta suffered a breach that allowed threat
actors to access HAR files from Okta customers, leaking all sorts of sensitive data
and credentials. HAR stands for HTTP Archive format, a standard for logging browser
activity to a file in JSON format. Most browsers allow you to record traffic while you
interact with a website and download the logs as a HAR file.
See Kenny Johnson’s overview of the breach in “Introducing HAR Sanitizer: Secure
HAR Sharing.”a 
a Johnson, Kenny (2023, October 26). Introducing HAR Sanitizer: Secure HAR Sharing. The
 Cloudflare Blog. https://mng.bz/64Re.
4.4
Broken authentication
user and are signed to prove their integrity (see chapter 7). As illustrated in figure 4.5,
two common vulnerabilities are failure to validate the token’s signature correctly and
failure to reject expired tokens. Failing to validate the token’s signature allows threat
actors to tamper with tokens, which means they can hijack other user accounts and
potentially escalate their privileges.
Figure 4.5
A common broken authentication vulnerability is accepting unsigned or expired tokens.
Despite the crucial role that authentication plays in our systems, broken authentication vulnerabilities are widespread. Authentication is hard, and even the best among
us get it wrong from time to time. In 2014, Egor Homakov found vulnerabilities in the
implementation of Open Authorization (OAuth) flows on GitHub that allowed him to
gain access to other users’ Gists, repositories, and account details. OAuth is the industry standard for granting access to an API, and we’ll learn more about it in chapter 7.
GitHub’s vulnerabilities included lack of validation of redirect URIs and the ability to
request arbitrary access scopes. Check out Egor’s blog post “How I Hacked GitHub
Again” [6] for a detailed breakdown of GitHub’s vulnerabilities.
 Implementing OAuth flows is difficult, but we find the bulk of security incidents in
access token validation. In December 2020, cybersecurity researcher Ron Chan discovered that Microsoft Outlook was accepting requests with unsigned tokens, essentially
allowing a threat actor to access the emails from any other account by forging tokens.
Chan documented the vulnerability in detail in a video titled “I Hacked Outlook and
Could’ve Read All Your EMAILS!” [7].
 As mentioned earlier, the most common type of authentication credential in APIs
is JWTs, and a common source of vulnerabilities in JWTs involves manipulating the
token’s alg field. This field tells us what signature was used to sign the token, and
according to the JWT specification, it’s perfectly fine to set the alg field to none, which
essentially produces an unsigned token [8]. OAuth best practices recommend always
API
{...}
Header
Claims
{
 "typ": "JWT",
 "alg": none
}
JWT
{
 "iss": "https://auth.apithreats.com/",
 "sub": "ec7bbccf-ca89",
 "aud": "https://apithreats.com/api",
 "iat": 447670993,
 "exp": 447757393
}
Expired token
Unsigned token
Header
Claims
JWT
Signature

---

## Sección 53: CHAPTER 4 [Entropy: 0.59]

Top API authentication and authorization vulnerabilities
using signed tokens [9], and many implementations explicitly prohibit tokens with
the alg field set to none. The devil is in the details, however. In April 2020, Ben Knight
of CyberCX discovered that Auth0 rejected tokens with alg set to none, but it was a
case-sensitive check. Knight was able to forge tokens and bypass Auth0’s access controls by capitalizing one of the characters in none, such as setting the token’s alg field
to nonE (with a capital E at the end) [10].
 There are many more examples, and if you browse HackerOne, a popular bughunting website, you’ll find plenty of reports of broken authentication. You get the
idea: broken authentication is prevalent and dangerous. What can we do to prevent it?
The first thing I always recommend is that you don’t do it yourself. Authentication is a
minefield, and as we saw with the GitHub’s example, even simple mistakes in the
implementation of OAuth flaws can result in a major breach.
 Instead of rolling out your own system, consider using an Identity as a Service
(IDaaS) provider such as Okta, Auth0, Authlete, Curity, and Microsoft Entra ID (formerly Azure’s Active Directory). Those organizations employ hundreds of developers
and researchers dedicated to monitoring and preventing authentication threats. That
still leaves you a few tasks, such as integrating correctly with those services, using the
right tokens for access control, selecting strong signing algorithms, and validating the
tokens correctly. You’ll learn best practices for all these tasks in chapters 7 and 8, but
to give you a taste of things, we’ll look at an example of broken authentication next.
4.5
A practical example of broken authentication
Let’s see what broken authentication looks like in practice with an example of vulnerable access token validation. We’ll use JWCrypto (https://github.com/latchset/
jwcrypto), a popular Python library for issuing and validating JWTs. There are other
popular JWT libraries in Python, such as PyJWT (https://github.com/jpadilla/pyjwt)
and python-jose (https://github.com/mpdavis/python-jose), but JWCrypto gives us a
degree of flexibility when validating tokens that can become a vulnerability if not
properly understood, allowing us to illustrate common broken authentication flaws.
 Listing 4.3 shows a vulnerable implementation that fails to validate the token’s audience (aud) claim. The audience (aud) represents the API for which the token was issued.
To validate the token, we create an instance of JWCrypto’s JWT class, passing in the public
key needed to validate the token’s signature, the token itself, and the algorithm used to
sign it. If the token is valid, we return its claims. If the token is invalid, JWCrypto raises
a JWTInvalidClaimValue error, which we capture to return an error response.
# file: broken_authentication.py
def validate_token(token: str):
 try: 
 unverified_header = json.loads(
 base64.urlsafe_b64decode(credentials.credentials.split(".")[0])
 ) 
Listing 4.3
Vulnerable JWT validation with JWCrypto
We open a try/except block to 
handle token validation errors.
We load the
JWT header.
4.6
Broken object property level authorization
 key = jwk.JWK(**find_public_key(unverified_header["kid"])) 
 valid_token = jwt.JWT( 
 key=key, jwt=credentials.credentials, algs=["RS256"],
 )
 return valid_token.claims 
 except (
 JWTInvalidClaimValue,
 ) as error:
 raise HTTPException(status_code=401, detail=str(error)) 
Check out ch04/README.md in this book’s GitHub repository for instructions on
running the vulnerable server for this listing and obtaining an access token to test the
vulnerability. The code in this listing is vulnerable because it doesn’t tell JWCrypto that
it must validate the token’s audience. Checking the audience is important if we have
different APIs. A ride-sharing application might expose an API for drivers, another one
for customers, and yet another one for administrators. Failure to check the audience
means that a normal customer could access admin functions. To prevent these vulnerabilities, we must configure JWCrypto to validate those claims. The following listing
tells JWCrypto that the expected audience is https://apithreats.com/admin.
# file: broken_authentication.py
def validate_token(token: str):
 try:
 unverified_header = json.loads(
 base64.urlsafe_b64decode(credentials.credentials.split(".")[0])
 )
 key = jwk.JWK(**find_public_key(unverified_header["kid"]))
 valid_token = jwt.JWT(
 key=key,
 jwt=credentials.credentials,
 algs=["RS256"],
 check_claims={
 "aud": "https://apithreats.com/admin", 
 }
 )
 return valid_token.claims
 except (
 JWTInvalidClaimValue,
 ) as error:
 raise HTTPException(status_code=401, detail=str(error))
When we’ve got authentication under control, we can lay out the rest of our API security strategy. Our next stop is another common vulnerability related to data manipulation and exposure.
4.6
Broken object property level authorization
Broken object property-level authorization (BOPLA) is a new threat category introduced in the 2023 OWASP top 10 API risks list that brings together two categories
Listing 4.4
Vulnerable JWT validation with JWCrypto
We build a JWK
object using
the token’s
signing key.
We validate 
the token.
If the token is valid, 
we return its claims.
If the token is 
invalid, we raise 
an HTTP error 
with a 401 
status code.
We ensure that 
JWCrypto validates 
the aud claim.

---

## Sección 54: CHAPTER 4 [Entropy: 0.511]

Top API authentication and authorization vulnerabilities
from the 2019 list: mass assignment (API6:2019) and excessive data exposure
(API3:2019). Mass assignment happens when users manage to override the value of
data they shouldn’t be able to change, and excessive data exposure occurs when our
APIs expose unnecessary amounts of sensitive data. Because the mechanics of both
threats are different and the attack strategies also differ, we’ll treat them separately.
4.6.1
Mass assignment
Most applications have a concept of server-side data. Server-side data is data that should
be changed only by our system or by authorized individuals such as administrators.
When we make a payment, for example, our payments provider must audit the transaction to ensure that it doesn’t involve fraud or crime and that we have the required
funds. Our payment goes through several stages, including initiation, auditing, processing, and settlement. The payment can be rejected or blocked for many reasons,
including insufficient funds.
 Figure 4.6 shows an API where these stages are reflected in the payments data
model through a status attribute. A payments API allows us to make payments and
check their status, but it shouldn’t allow us to change the status of a payment. A user
shouldn’t be able to make a payment and set its status to approved or settled right
away, for example. If that happens, our API is vulnerable to mass assignment.
Figure 4.6
A payment goes through a life cycle with stages such as pending, accepted, settled, and rejected. 
Those stages can be documented as an enumeration in an OpenAPI schema.
As shown in figure 4.7, mass assignment happens when we blindly trust the data a user
sends in a request and bind it directly to our database models. This allows threat
actors to override sensitive and business-critical data in our systems, including the status of an order or payment, loyalty points and discounts, and even access privileges. In
other words, mass assignment vulnerabilities can compromise the integrity of our system and our business.
pending
accepted
settled
rejected
payment:
 type: object
 properties:
 id:
 type: string
 format: uuid
 amount:
 type: float
 destination:
 type: string
 status:
 type: string
 enum:
 - pending
 - accepted
 - settled
 - rejected
Life cycle of a payment
POST /payments
{...}
4.6
Broken object property level authorization
 
Figure 4.7
Mass assignment happens when a threat actor manages to override a field they shouldn’t 
be able to access, such as the status of a payment.
How bad does this get in real life? Let’s review some examples. In March 2012, Egor
Homakov alerted the Ruby on Rails development team that the framework made
applications built with it vulnerable to mass assignment attacks [11]. Egor’s warning
didn’t get much attention, so he decided to prove his claim. Knowing that GitHub was
built with Ruby on Rails, he performed the most famous mass-assignment attack in
history, committing some changes to the master branch of Ruby on Rails’ official
repository on GitHub. The commit is still visible in Ruby on Rails’s history [12].
 Homakov didn’t have the right to commit directly to the master branch, so how
did he manage to do it? He exploited a mass assignment vulnerability on GitHub’s API
to bind his own Secure Shell (SSH) key to the profile of another user with commit
rights to the Ruby on Rails repository [13]. When he was in possession of an SSH key
with commit rights, he pushed his changes directly to the master branch. Fortunately,
the commit was harmless and intended only to bring attention to mass-assignment vulnerabilities on websites built with Ruby on Rails.
 Mass assignment was originally designed as a feature of the Ruby on Rails framework to save developers work when hydrating instances of active record objects. When
creating a new user, for example, a developer could use the strategy in the next listing
to populate user attributes in one go, without setting each value individually. :user
represents the payload sent to the server to register a new user.
def signup
 params[:user] # => {:name => "John", :email => "john@example.com"}
 @user = User.new(params[:user])
end
Listing 4.5
Example of mass assignment in Ruby on Rails
Payments service
POST /payments
{
 "amount": 1000
 "destination": "GB24BKEN10000031510604",
 "status": "settled"
}
Status code: 201
{
 "id": "7be44a87-6b62-4028-bad5",
 "amount": 1000
 "destination": "GB24BKEN10000031510604",
 "status": "settled"
}
Threat actor

---

## Sección 55: CHAPTER 4 [Entropy: 0.595]

Top API authentication and authorization vulnerabilities
The problem is that when exposed directly through the controller, as in this listing, a
threat actor can set arbitrary attributes in the payload and bind them to their user profile. An attacker could send the following request to create an admin profile: http://
www.example.com/user/signup?user[name]=John&user[email]=john@example.com&user
[admin]=1. This is also a great example of an elevation-of-privilege attack, in which threat
actors attempt to elevate their access privileges. To counter mass-assignment vulnerabilities, Ruby on Rails introduced protected attributes, which allow us to declare properties that shouldn’t be bound directly to an active record object via mass assignment.
 Despite growing awareness of the risks of mass assignment, many codebases are
still vulnerable to it. You can find multiple examples of mass-assignment reports on
HackerOne. In May 2017, a HackerOne user reported a vulnerability on Radancy, a
Dutch company specializing in employer branding, recruitment, and training [14].
The vulnerability allowed the user to take over training courses belonging to other
users by editing the course details. Mass assignment wasn’t the only problem: the API
wasn’t even checking whether the request was sent by the resource’s legitimate owner,
so the API was also vulnerable to BOLA.
 Mass assignment isn’t limited to Ruby on Rails. Any stack is vulnerable to mass
assignment whenever you bind user data to your database models without validating
and sanitizing it. The next listing shows a Python code snippet that is vulnerable to
mass assignment. Listing 4.6 implements an endpoint that allows us to make payments. As you see in lines 9 and 10, we load the data sent by the user and bind it
directly to our database model without validating and sanitizing it, which allows threat
actors to manipulate the status of their payments. The following request makes a payment and sets its status to accepted:
curl -X 'POST' 'http://localhost:8000/payments' \
-H 'Content-Type: application/json' \
 -d '{"amount": 1000000, "currency": "USD", "status": "accepted"}'
Check out ch04/README.md in this book’s GitHub repository for instructions on
running the vulnerable server for this listing and run the preceding command to test
the vulnerability.
# file: ch04/mass_assignment.py
class PaymentSchema(BaseModel):
 id: uuid.UUID
 status: str
 amount: float
 currency: str
@server.post(
 "/payments-vulnerable",
 response_model=PaymentSchema, 
 status_code=status.HTTP_201_CREATED, 
)
async def make_payment(request: Request): 
Listing 4.6
Python code vulnerable to mass assignment
We specify the endpoint’s 
response serialization 
and validation model.
The endpoint’s successful 
response status code is 201.
We capture the full request details 
in the endpoint’s function signature.
4.6
Broken object property level authorization
 with session_maker() as session:
 payload = await request.body() 
 payment = PaymentModel(**json.loads(payload)) 
 session.add(payment) 
 session.commit() 
 return { 
 "id": payment.id,
 "amount": payment.amount,
 "currency": payment.currency,
 "status": payment.status,
 }
To prevent mass assignment, use data validation models to sanitize user input. Create
separate models for API input and for output. The next listing creates a Make-
PaymentSchema model to validate user input. MakePaymentSchema allows users to specify
only the amount and currency of the payment; the server will reject any additional
attributes. PaymentSchema represents our full payment model, including its ID and status, and we use it only to validate and serialize outgoing data.
class MakePaymentSchema(BaseModel): 
 amount: float
 currency: str
class PaymentSchema(BaseModel):
 id: uuid.UUID
 status: str
 amount: float
 currency: str
@server.post(
 "/payments-safe",
 response_model=PaymentSchema,
 status_code=status.HTTP_201_CREATED,
)
async def make_payment(payment_details: MakePaymentSchema): 
 with session_maker() as session:
 payment = PaymentModel(**payment_details.dict()) 
 session.add(payment)
 session.commit()
 return {
 "id": payment.id,
 "amount": payment.amount,
 "currency": payment.currency,
 "status": payment.status,
 }
Mass assignment is a widespread vulnerability, and as you can see in the preceding
examples, it poses great threats to our business model and the data privacy of our
users. Make sure that all your API endpoints and operations have clearly defined data
validation models for user input and ensure that those models allow only legitimate
attributes, such as currency and amount in our payments example.
Listing 4.7
Constraining user input to prevent mass assignment
We load the
request
body’s JSON.
We mass-assign the full 
JSON to our database model.
We add the record to 
our database session.
We commit the query 
to persist the data.
We return the details of 
the newly created payment.
We define a model 
for the request body.
We include the 
model in the 
controller’s 
function 
signature to 
validate requests 
against it.
We assign validated 
request data to our 
database model.

---

## Sección 56: CHAPTER 4 [Entropy: 0.319]

Top API authentication and authorization vulnerabilities
 Mass assignment is one side of BOPLA. In section 4.6.2, you’ll learn what the other
side looks like and how to prevent it.
4.6.2
Excessive data exposure
Excessive data exposure happens when our API exposes more data than it should. It
comes in different flavors that pave the way for different types of attacks against our
APIs. As figure 4.8 shows, some APIs expose identifying user information—including
email address, date of birth, and ID—through publicly available endpoints. This
makes our API vulnerable to a personally identifiable information (PII) data breach if
threat actors find a predictable way to retrieve user profiles.
Figure 4.8
Excessive data exposure happens when we expose sensitive data to users who shouldn’t 
have access to it, such as when we expose personal user details in a public user search API.
Other applications expose their internal data models directly through the API. As
shown in figure 4.9, tight-coupling our data models to our APIs is an antipattern, and
it’s bad from a design and security perspective. As Mike Amundsen, author of RESTful
Web API Patterns and Practices Cookbook (O’Reilly, 2022), notes in Amundsen’s Maxim,
“Your data model is not your object model is not your resource model is not your message model” [15]. From a design perspective, tight-coupling your data models to your
APIs is bad because it makes our APIs prone to changes whenever our internal data
models change. From a security perspective, it’s bad because it makes our API leak a
lot of information about our internal models that threat actors can use to abuse and
manipulate our system.
 How are our internal data models useful to threat actors? Suppose that we sell
insurance through a website. Like any good insurance business, we ask our customers
a series of questions to calculate their risk profiles and premiums, and we record that
information in our internal data models. As illustrated in figure 4.10, if we leak our
internal data models through the API, any user who looks directly at the data
exchanges between our API and our client (e.g., web application) will learn how we
GET /users?email=harry.potter@apithreats.com
User search API
Status code: 200
{
 "id": "7be44a87-6b62-4028-bad5",
 "name": "Harry Potter",
 "email": "harry.potter@apithreats.com",
 "address": "4 Privet Drive, Little Whinging, Surrey",
 "birth_date": "1980-07-31"
}
Threat actor
4.6
Broken object property level authorization
model risk and premiums. This information may help threat actors figure out how to
abuse our risk model or plan a mass-assignment attack that changes their risk profile.
Figure 4.10
Excessive data exposure can reveal sensitive information from our system, such as the weights used 
to calculate insurance premiums. Threat actors can use this information to abuse our business model.
@app.get("/users")
def find_user_by_email(email: str):
 user = db.find_by_email(email=email)
 return user.dict()
User search API
Status code: 200
{
"id": "7be44a87-6b62-4028-bad5",
"name": "Harry Potter",
"email": "harry.potter@apithreats.com",
"address": "4 Privet Drive, Little Whinging, Surrey",
"birth_date": "1980-07-31"
}
users.py
User table
+ id: UUID
+ name: str
+ email: str
+ address: str
+ birth_date: date
Figure 4.9
A common cause of excessive data exposure is tight coupling between our database models and our 
API data models, which leads to sensitive data leaks if data isn’t thoroughly filtered.
POST /calculate-premium
{
 "vehicle": {
 "make": "Toyota",
 "year": 2018,
 "mileage": 50000
 },
 "driving_history": {
 "accidents": 2,
 "tickets": 1
 }
}
Car insurance
API
Status code: 201
{
 "id": "57edc2ee-9e86-462b-b4b6",
 "premium": 1200,
 "calculation_details": {
 "base_premium": 1000,
 "mileage_factor": {"factor": 0.003, "amount": 50000},
 "accidents_factor": {"factor": 25, "amount": 2}
 }
}
PUT /update-premium/57edc2ee-9e86-462b-b4b6
{
 "vehicle": {
 "mileage": 500
 }
}
Threat actor

---

## Sección 57: CHAPTER 4 [Entropy: 0.283]

Top API authentication and authorization vulnerabilities
Another flavor of excessive data exposure consists of exposing unnecessary objects
and identifiers. This typically happens in APIs designed to be consumed by our own
clients (i.e., a web or mobile application built by our organization). As shown in figure
4.11, an e-commerce application might have special deals for customers with certain
loyalty points. Excessive data exposure would happen if our API included all special
deals in the response, expecting our client application to filter them out and hide
them from unqualified customers.
Figure 4.11
Another flavor of excessive data exposure consists of leaking full objects, such as when an 
e-commerce API exposes special deals that a customer shouldn’t be able to access.
Excessive identifiers are also a problem, as shown in figure 4.12. Suppose that we run
a ride-sharing business. Customers can book rides and get the details of their rides
through our API. When requesting the details of their ride, they need to know only
the model and registration plate of the car that’s going to pick them up and maybe
the first name of the driver. Customers don’t need to know the database identifiers of
the driver and their vehicle, and including such information in our API responses
would be excessive data exposure. Threat actors could use such information to try to
access and hijack the driver’s account.
 That’s enough theory. I’m sure you’re wondering whether any of this happens in
the real world. It does, and it’s a major source of security incidents. In January 2022,
Twitter (now X) fixed a vulnerability that allowed users to submit an email address or
phone number through the login flow and discover which accounts they were bound
to. In this case, the information about the account to which the email address and
phone number were bound was unnecessary. This vulnerability was created by a code
update in June 2021, and sadly, between that date and the fix in January 2022, threat
actors managed to harvest a large list of user accounts, along with email addresses and
phone numbers, and put it up for sale [16].
E-commerce API
Customer
Browser client
Status code: 200
{
 "products": [
 {"id": 1, "discount": 50, "min_loyalty_points": 100},
 {"id": 3, "discount": 20, "min_loyalty_points": 40}
 ]
}
 {"id": 2, "discount": 70, "min_loyalty_points": 300},
Status code: 200
{
 "products": [
 {"id": 1, "discount": 50, "min_loyalty_points": 100},
 {"id": 3, "discount": 20, "min_loyalty_points": 40}
 ]
}
The web application filters the results 
for the deals the user has access to.
The API returns all the deals available.
GET /catalog
4.6
Broken object property level authorization
 
Figure 4.12
Another form of excessive data exposure is exposing unnecessary object identifiers. In 
this example, a ride-sharing application leaks the ID of the driver and their vehicle to the customer.
More recently, in January 2024, Trello suffered a data breach affecting 15 million
users [17]. In this case, a threat actor exploited an unauthenticated endpoint that
allowed users to query the profile of any user on the platform simply by submitting
their email address. The data leak included emails, usernames, full names, and other
details.
 Many problems led to the Trello breach, of course, including lack of access controls, monitoring, and rate limiting. Also, we must question whether this business flow
was necessary. Should anyone have been allowed to query user profiles by email? You
could argue that this functionality was useful for finding other team members on the
platform. If you want to find out what projects or tickets your colleague is working on,
for example, it’s useful to be able to look up their profile by email. It’s one thing to
search for teammates, however, and another to search for any user. That’s where
excessive data exposure comes in: when you query the API, you should get a user profile only if you’re connected with that account.
4.6.3
Practical example of excessive data exposure
What does excessive data exposure look like in practice? Let’s look at a simplified
example that replicates the Trello vulnerability. The following code implements a GET
/query-user endpoint that allows us to query users by email by sending a request like
GET /query-user?email=susan@example.com. If the email matches the profile of a user
who works on the same project as ours, we return the user profile; otherwise, we
Ride-sharing API
GET /rides/1
Status code: 200
{
 "id": 1,
 "vehicle": {
 "id": 1234,
 "model": "Toyota Prius",
 "plate": "DE51 RED"
 },
 "driver": {
 "id": 5443,
 "name": "Michael Schumacher"
 },
 "arrival": "2027-01-01T16:33:00"
}
GET /drivers/5443
GET /vehicles/1234
Threat actor

---

## Sección 58: CHAPTER 4 [Entropy: 0.695]

Top API authentication and authorization vulnerabilities
return a 404 (Not Found) response. The implementation in the following listing is vulnerable to excessive data exposure because any matching email returns the corresponding user profile without additional checks, as highlighted in lines 15–17. Check
out ch04/README.md in this book’s GitHub repository for instructions on running
the vulnerable server in this listing and testing the vulnerability.
# file: ch04/excessive_data_exposure.py
class UserClaims(BaseModel): 
 sub: str
 project: str
def validate_access(): 
 return UserClaims(sub=str(uuid.uuid4()), project="The Matrix")
@server.get("/query-user", response_model=UserProfileSchema)
async def query_user(
 email: str, user_claims: UserClaims = Depends(validate_access)
):
 with session_maker() as session:
 requested_user = session.scalar( 
 select(UserModel).where(UserModel.email == email)
 )
 if requested_user is None:
 raise HTTPException(
 status_code=404,
 detail=f"User with email {email} not found."
 )
 return {
 "id": requested_user.id,
 "email": requested_user.email,
 "project": requested_user.project,
 "full_name": requested_user.full_name,
 }
To fix excessive data exposure in this listing, we include an additional condition in
our database query to check whether the user we’re querying for works on the same
project as we do. To do this, first we query the database to pull the details of the user
sending the request. We keep that information in a variable named requesting_user,
as shown in lines 9–11 of the next listing. Then we include an additional condition in
the query for the requested user, checking whether they work on the same project as
the requesting user, as shown in line 14. If both users work on the same project, we
return the requested user details; otherwise, we respond with a 404. With the fix in listing 4.9, threat actors won’t be able to scrape our API for random users.
# file: ch04/excessive_data_exposure.py
@server.get("/query-user", response_model=UserProfileSchema)
Listing 4.8
Querying users with excessive data exposure
Listing 4.9
Querying users without excessive data exposure
We define a model to 
represent token claims.
We create a function that returns 
a hardcoded UserClaims object.
We query user 
data for the 
requested email.
4.7
Broken function-level authorization
async def query_user(
 email: str, user_claims: UserClaims = Depends(validate_access)
):
 with session_maker() as session:
 requesting_user = session.scalar( 
 UserModel.id == user_claims.sub,
 )
 requested_user = session.scalar(select(UserModel).where(
 UserModel.email == email,
 UserModel.project == requesting_user.project, 
 ))
 if requested_user is None:
 raise HTTPException(
 status_code=404,
 detail=f"User with email {email} not found."
 )
 return {
 "id": requested_user.id,
 "email": requested_user.email,
 "project": requested_user.project,
 "full_name": requested_user.full_name,
 }
This concludes our journey to understanding and tackling broken property-level
authorization. Now let’s take a look at user group- and role-based access controls and
see how threat actors attempt to bypass such restrictions.
4.7
Broken function-level authorization
Most applications have a concept of user groups or roles with different permissions and
access levels. Many APIs distinguish between admin and non-admin users or between
developers and nondevelopers. Some APIs distinguish more granular types of groups.
A healthcare API might distinguish between nurses, receptionists, and doctors to determine the level of access a user has. We call this role-based access controls (RBAC).
DEFINITION
Most applications have a concept of user groups or roles, such as
admin users and normal users. RBAC are authorization checks based on such
user roles and groups.
Broken function-level authorization (BFLA) happens when a user manages to bypass
the access constraints of their role. When a non-admin user gets access to admin-only
operations, for example, we call this elevation of privilege, privilege escalation, or vertical
privilege escalation, which is different from horizontal privilege escalation, in which a user
can access data from another user with the same role (i.e., BOLA).
DEFINITION
Privilege escalation is an attack strategy in which threat actors
attempt to gain access to operations or resources their role doesn’t have
access to. When a normal user tries to get access to an admin endpoint, for
example, they’re performing a privilege-escalation attack.
We query the database for the details 
of the user sending the request.
We add the 
requesting user’s 
project to the 
database query.

---

## Sección 59: CHAPTER 4 [Entropy: 0.265]

Top API authentication and authorization vulnerabilities
The main driver of BFLA is weak RBAC enforcement or lack thereof. As illustrated in
figure 4.13, many applications expose admin and/or developer APIs. Typically, those
APIs provide access to functionality that average users don’t have access to. An admin
API might allow viewing and changing data from all users, for example, the idea being
that only admin users should have access to the admin API.
Admin, developer, and similar types of APIs are often deployed on specific subdomains or URL paths, such as admin.example.com or example.com/api/admin. These
APIs are sometimes hidden from public API documentation and catalogs to prevent
unauthorized users from discovering them. The assumption is that by keeping our
admin APIs secret, we won’t attract unwanted visitors.
 As illustrated in figure 4.14, the trouble is these APIs are sometimes built under the
assumption that only legitimate users will access them, so the necessary access controls
aren’t applied to every request. If that happens, any user who discovers our admin endpoints will instantly elevate their privileges and gain admin access to our API.
Figure 4.14
A common cause of BFLA is failure to check whether users' roles have access to the 
requested API. In this example, a normal user gets access to an admin API.
API server
User API
Admin API
Developer API
User
Admin
Developer
Figure 4.13
Most APIs 
have a concept of user 
groups or roles with 
different permissions. In 
this example, an API has 
roles for normal users, 
admins, and developers.
API server
User API
Admin API
Privilege escalation
GET /api/admin/users
Status code: 200
{"users": [...]}
User
4.7
Broken function-level authorization
Do we have real-world examples of BLFA breaches? Sure thing! On Shopify, merchants can give restricted access to their stores to collaborators. Because collaborators
have access to such sensitive information, Shopify has robust checks to ensure that
only qualified users become collaborators. In September 2017, however, a cybersecurity researcher discovered a vulnerability in the collaborator-onboarding process.
After creating two partner accounts with the same business email, the researcher
found that they could obtain collaborator status with full store access on any account
without merchant approval. Fortunately, Shopify fixed the vulnerability within one
hour of the report [18].
 Sometimes, BFLA happens without the attacker’s having to assume another role.
Early in 2020, cybersecurity researcher Sanjana Sarda found that Bumble, a popular
dating website, didn’t enforce restricted access to admin, developer, and premium
functionality in its APIs. Due to this vulnerability, Sanjana was able to obtain admin
access to the platform, premium features, and the personal information of Bumble’s
entire user base [19].
 To protect our APIs against BFLA, we must check that every user is allowed to
access the data or functionality they’re requesting according to their user role or
group. We do this by implementing RBAC. How does RBAC work in practice? Different APIs implement RBAC differently, so the answer depends on your implementation. As shown in figure 4.15, the most common strategy is having a list of user roles,
with each role having different access models. An application might have a customer,
an admin, and a developer role, and each role may have access to different APIs, endpoints, or datasets. Some implementations include the user’s role in their access
token. Tokens issued by Auth0, for example, can include a custom permissions claim
with a list of the user roles and permissions. In this case, our API must validate that the
permissions claim contains the right list of values. If a user is accessing our admin API,
we must check that the permissions claim contains an admin role.
Figure 4.15
A good strategy to prevent BFLA is to declare user roles explicitly in access tokens and 
check those roles on every request across all operations.
API server
Customer API
Admin API
User
Admin
{
 ...
 "permissions": ["customer"]
 ...
}
{
 ...
 "permissions": ["admin"]
 ...
}

---

## Sección 60: CHAPTER 4 [Entropy: 0.379]

Top API authentication and authorization vulnerabilities
How do we mitigate BFLA vulnerabilities in practice? Section 4.8 provides a practical
example, checking the user’s role by inspecting their access token’s payload and
authorizing their access against it.
4.8
A practical example of preventing BFLA
Suppose that we have an admin endpoint like the one in the following listing. For simplicity, the endpoint returns a "success!" message if we have access to it. The implementation doesn’t check the user role, so everyone can get access; hence, it’s
vulnerable to BFLA. Check out ch04/README.md in this book’s GitHub repository
for instructions on running the vulnerable server for this listing and testing the vulnerability.
# file: ch04/bfla.py
@server.get("/admin")
def get_admin():
 return "success!" 
To prevent BFLA, we must check whether the user has an admin role attached to them.
In this implementation, user role information is present in the access token, so first we
must capture the claims in the token’s payload. The following code validates the access
token and captures its claims using a validate_token() function, following the same
pattern we used earlier in listing 4.4. In this case, the user role information is available
in the permissions claim, which represents an array of user roles and permissions. To
validate whether the user is allowed to access this endpoint, we check if the admin role
is present in the permissions array. If it’s not there, we respond with a 403 (Forbidden)
status code, which acknowledges that the user has valid credentials but insufficient permissions. If this were a sensitive endpoint and we wanted to ensure that unauthorized
users won’t know it exists, we could respond with a 404 (Not Found) status code instead.
# file: ch04/bfla.py
@server.get("/admin")
def get_admin(user_claims: UserClaims = Depends(validate_token)):
 if "admin" in user_claims.permissions: 
 return "success!" 
 raise HTTPException( 
 status_code=403, detail=f"Forbidden"
 )
We’ll dive deeper into RBAC in chapters 7 and 8, but this example gives you the gist:
to mitigate BFLA vulnerabilities, validate the user’s access token and capture its
claims; then check whether the user has the right permissions and roles to access the
requested functionality.
Listing 4.10
BFLA-vulnerable admin endpoint
Listing 4.11
Mitigating BFLA vulnerabilities
The endpoint returns 
successfully without 
enforcing access controls.
We check whether the token
has admin permissions.
If it’s an admin token, we 
return a successful response.
If it’s not an admin token, we 
respond with a 403 status code.
4.9
Unrestricted access to sensitive business flows
 The API vulnerabilities we’ve seen so far relate to the ability of a user to access our
system or resources within our system. These vulnerabilities are incredibly important,
and failing to address them properly exposes our APIs to all sorts of abuses. But they
are also relatively easy to address if you understand how the protocols work and how
to implement mitigation strategies correctly. Section 4.9 introduces a new type of vulnerability that brings more complex yet fascinating challenges to the table: the ability
to abuse our business models.
4.9
Unrestricted access to sensitive business flows
Did you try to buy a PlayStation 5 online when it launched and found that it was always
sold out? Have you tried buying a ticket for a Taylor Swift concert and found that all
the tickets were gone? Did you try to book an appointment for your driving test and
found that all the slots were booked? All these scenarios are examples of a new threat
category in the OWASP Top 10 API Security Risks: unrestricted access to sensitive business flows.
 A sensitive business flow is any flow a threat actor can exploit to their benefit and to
the detriment of our business. Figure 4.16 shows a typical user flow for a referral program. User A sends an invitation to user B to join a ride-sharing platform. When user
B joins the platform, user A earns a discount on future rides. If our website doesn’t
check the authenticity of user B’s account, user A will be able to invite an unlimited
number of fake accounts and earn endless rewards, making us vulnerable to unrestricted access to sensitive business flows.
Figure 4.16
A typical referral program encourages existing users to invite other users to the platform 
and offers rewards for every successful signup.
Unrestricted access to sensitive business flows exposes our APIs to various threat models, such as scalping, review manipulation, and scraping. The stories about the soldout PlayStations and Taylor Swift concert tickets are examples of scalping—the practice
of buying out the whole stock of a high-demand product to resell it later at a higher
price. Scalping affects e-commerce stores, booking websites, ticket sellers, and other
organizations with similar business models.
 As shown in figure 4.17, scalper bots work by polling your website to check the
availability of certain products, tickets, and booking slots. A scalper bot looking to buy
and resell a popular brand of shoes might poll your website every few minutes using
User A
Referral
invite
userB@example.com
Join
platform
Ride-sharing
application
Rewards

---

## Sección 61: CHAPTER 4 [Entropy: 0.268]

Top API authentication and authorization vulnerabilities
different IPs. The moment the shoes become available for sale, the bot buys out the
whole stock.
Figure 4.17
Scalper bots poll APIs every few seconds until a product becomes available and then buy 
the whole stock.
On the surface, scalping may not look like a threat to your business. After all, you’re
still selling your products, right? Yes, but that outcome comes at a cost. Scalper bots
result in poor customer experience because your products are rarely in stock, and
they compromise the performance of your website by polling the API constantly.
Besides, scalper bots become the effective seller of your products, which means you
don’t own the relationship with your customers anymore. Research by Netacea, a bot
detection and prevention technology company, shows that customers are likely to stop
buying from your website, post negative reviews, and complain to regulatory bodies
when they encounter these issues [20].
 Other examples of unrestricted access to sensitive business flows include manipulation of review and scoring systems, abuse of referral programs, scraping content, and
manipulation of bidding contests. For a few years now, websites such as Amazon and
Google have been in a constant fight to address the problem of fake reviews. Amazon
sellers, for example, buy positive reviews from fake customers and negative reviews for
their competitors in an attempt to influence customer behavior [21]. Businesses listed
on Google Maps also exploit its review system, and Google decided to take legal action
to tackle fake reviewers [22].
 At this point, you may wondering what all this has to do with technology and APIs.
Managing inventories, selling products, and handling customer reviews are inherently
E-commerce API
Scalper bot
GET /catalog?filter=PS5
Status code: 200
{"results": []}
Status code: 200
{"results": [
 {
 "id": 1, "stock: 100, "price": 500
 }
]}
POST /checkout
{"basket": [{"id": 1, amount: 100}]}
Poll the server
every few
seconds.
No items
available
Item becomes
available.
Buy the whole
stock.
4.9
Unrestricted access to sensitive business flows
business functions, aren’t they? Yes, but remember: our job as software developers is to
provide business solutions, not just write code. We can and should do a lot from a
technical perspective to address vulnerable business flows.
 How do we secure vulnerable business flows using technology? The first step is mitigating the threat from automated requests. How? The answer depends on our user
engagement model. As illustrated in figure 4.18, if our customers are meant to access
our website through a web application client, we may want to try disabling access from
headless browsers or command-line tools. There’s no foolproof method for disabling
headless access to your API, but you can try a few things. Start by checking the
request’s user agent. The user agent represents the software used to send the request,
and it’s indicated in the User-Agent request header. Nothing prevents a threat actor
from setting the value of their User-Agent to a browser manually, of course, so this
strategy goes only so far. A more effective strategy is serving CAPTCHA challenges to
verify that a human is on the other side of the network.
Figure 4.18
If our API is designed for consumption by a web application, a good strategy to mitigate 
automated attacks is serving CAPTCHA challenges.
Effective mitigation of unrestricted access to sensitive business flows also requires realtime threat detection and response solutions. Look for nonhuman interaction patterns against your APIs. As shown in figure 4.19, if we have an e-commerce website, we
may expect users to go through a specific journey to buy our products, such as browsing the catalog, checking product descriptions and reviews, adding items to the cart,
and checking out. The process may well take anywhere from a few minutes to a few
hours. Flag deviations from this engagement model, throttle requests when you suspect malicious activity, and block users when they’re clearly abusing your API.
API server
Threat actor
Browser
User
GET /api/users HTTP/1.1
Host: example.com
User-Agent: Mozilla/5.0
GET /api/users HTTP/1.1
Host: example.com
fG2yQ23
GET /api/users HTTP/1.1
Host: example.com
User-Agent: Mozilla/5.0
CAPTCHA
challenge

---

## Sección 62: CHAPTER 4 [Entropy: 0.511]

Top API authentication and authorization vulnerabilities
 
Figure 4.19
In a multistep user flow, we can detect bots by measuring the time intervals between each step. 
Whereas a legit user might take a few seconds between steps, a script will run through all the steps in milliseconds.
What if we also want to allow users to engage directly with the API? If you want to allow
automated access to your sensitive business flows through the API, consider doing it
through a partner program, and track every API interaction to the last detail. If you
run a marketplace for flight tickets and want to open your API to business partners,
you want to have very detailed tracking of what each partner is doing with the API and
be able to hold them accountable for any manipulation of prices or ticket availability.
In chapter 11, you’ll learn to implement such observability solutions for security.
 You may wonder how to we implement these measures. The next section provides
a practical example of blocking scalper bots for our next sale of Taylor Swift concert
tickets.
4.10
A practical example of mitigating abuse of vulnerable 
business flows
Suppose that we run a platform where customers can buy tickets to attend their favorite singers’ concerts. Our API allows users to list the available tickets through a GET
/tickets endpoint and buy them through a POST /checkout endpoint. The following
listing shows the implementation of those endpoints. To keep the implementation
simple, the listing uses an in-memory database represented by two arrays. The
tickets_db array represents the list of available tickets, and the recent_transactions
array represents a list of recent transactions. For a more realistic example using a SQL
database, please refer to the book’s GitHub repository. Check out ch04/README.md
in this book’s GitHub repository for instructions on running the vulnerable server for
this listing and testing the vulnerability.
# file: ch04/vulnerable_business_flows.py
# Check the GitHub repo for the array contents
tickets_db = [...] 
transactions = [] 
Listing 4.12
Ticketing system vulnerable to abuse
GET /catalog
GET /catalog/1
POST /checkout
User
Bot
GET /catalog
GET /catalog/1
1 ms
1 ms
3 seconds
5 seconds
API server
POST /checkout
We define our in-memory 
database of tickets.
We initialize an empty array as our 
in-memory database of transactions.
4.10
A practical example of mitigating abuse of vulnerable business flows
@server.get("/tickets", response_model=ListTickets) 
def list_tickets():
 return {"tickets": tickets_db}
@server.post(
 "/checkout", 
 response_model=TicketsPurchase,
 status_code=status.HTTP_201_CREATED,
)
def checkout(
 ticket_details: BuyTickets,
 user_claims: UserClaims = Depends(validate_access),
):
 for ticket in tickets_db: 
 if ticket["id"] == ticket_details.ticket:
 recent_transactions.append( 
 Transaction(
 sub=user_claims.sub, date=datetime.now(timezone.utc)
 )
 )
 return {
 "id": uuid.uuid4(), "ticket": ticket,
 "amount": ticket_details.amount,
 }
 raise HTTPException( 
 status_code=404,
 detail=f"Ticket with ID {ticket_details.ticket} not found."
 )
As it stands, our implementation is vulnerable to scalping. Nothing prevents a user
from running a script to buy all the available tickets as soon as they become available.
To mitigate this risk, we’re going to implement two measures:
Prevent access from non-browser-based user agents
Allow users to complete only one transaction every 24 hours
The decision to restrict transactions to a 24-hour window may sound unreasonable
and hurt real users who want to acquire more tickets within less than 24 hours for
legitimate reasons. A more effective solution would use a threat detection system that
can flag suspicious users, and we’ll discuss how to do that in chapters 6 and 11. For
this illustration, the simple 24-hour restriction serves well.
 Regarding the user-agent check, as we discussed earlier, it won’t protect us fully
from automated scripts, but it does turn away simple automated scripts that leave the
user agent unmodified. We begin by declaring the list of allowed user agents, as shown
in the following listing. A full user-agent header looks like this: Mozilla/5.0 (X11;
Ubuntu; Linux x86_64; rv:35.0) Gecko/20100101 Firefox/35.0. As you can see, the
user agent contains information about the browser, operating system, computer architecture, and so on. To keep our implementation simple, we’ll simply check that the
user agent header contains a browser. The listing also implements a Transaction
We define a GET /tickets 
endpoint that returns 
the list of tickets.
We define a POST /checkout 
endpoint that allows users 
to buy tickets.
We iterate the tickets in 
our in-memory database 
to find the one the user 
wants to purchase.
When we find a match, we
add a transaction record to
our in-memory database.
If we don’t find a matching ticket, we 
return a 404 status code response.

---

## Sección 63: CHAPTER 4 [Entropy: 0.695]

Top API authentication and authorization vulnerabilities
model to represent every transaction. Transaction contains a within_24() property
method that tells us whether the transaction happened within the past 24 hours.
# file: ch04/vulnerable_business_flows.py
allowed_agents = ["Mozilla", "Google Chrome", "Safari", "Microsoft Edge"]
class Transaction(BaseModel): 
 sub: str
 date: datetime
 @property 
 def within_24h(self):
 time_diff = ( 
 datetime.now(timezone.utc).timestamp()
 - self.date.timestamp()
 )
 return (time_diff / 3600) <= 24 
The next step is using this functionality to prevent scalper bots. The next listing implements a prevent_scalping() middleware that brings everything together. First, we
check whether the user-agent request header contains a valid browser. If it doesn’t,
we respond with a 401 (Unauthorized) status code. Next, we check whether the user is
trying to buy a new ticket and whether they should be allowed to do so. We capture
the user identifier from the access token’s payload and check it against our array of
recent transactions. If the user made a purchase in the past 24 hours, we respond with
a 409 (Conflict) status code because the request cannot be processed.
# file: ch04/vulnerable_business_flows.py
class UserClaims(BaseModel):
 sub: str
def validate_access(): 
 return UserClaims(
 sub="deb6f47e-fd9d-4b4c-ae4f-c85726ed502c"
 )
@server.middleware("http.request") 
async def prevent_scalping(request: Request, call_next):
 if not any( 
 agent in request.headers["user-agent"] for agent in allowed_agents
 ):
 return JSONResponse( 
 status_code=401, content={"error": "Unauthorized"}
 )
 user_claims = validate_access() 
Listing 4.13
Allowed browsers and Transaction model
Listing 4.14
Custom middleware to prevent scalping
We define a model to 
represent transactions.
We define a dynamic property using 
Python’s @property decorator.
We calculate the 
difference between 
the transaction’s date 
and the current time.
We return a Boolean telling us 
whether the time difference is 
less than or equal to 24 hours.
We define a function that 
returns a hardcoded 
UserClaims object.
We define a server 
middleware using 
FastAPI’s 
@server.middleware() 
decorator.
We check whether the 
request contains any of 
the allowed user agents.
If the request does not
contain an allowed
user agent, we respond
with a 401 status code.
We validate the 
access token and 
retrieve its claims.
Summary
 if request.url.path == "/checkout": 
 for transaction in recent_transactions:
 if ( 
 transaction.sub == user_claims.sub
 and transaction.within_24h
 ):
 return JSONResponse( 
 status_code=409, content={"error": "Conflict"}
 )
 return await call_next(request) 
This example only scratches the surface of what is possible to prevent threat actors
from abusing our user flows, but it gives you an idea. The best way to protect our APIs
against such threats is to understand the business requirements of our applications
and tailor our mitigation strategies to them.
 This concludes our journey through the most common types of API authentication
and authorization vulnerabilities. In chapter 5, we look at a different set of vulnerabilities that have to do with API configuration and management.
Summary
OWASP Top 10 API Security Risks is a list of the most common API threats.
BOLA occurs when user A accesses private data from user B. To prevent it,
enforce robust object-level access controls across all your endpoints, ensuring
that each request is validated against the user’s permissions.
Broken authentication happens when a threat actor breaks through our
authentication system. To prevent it, use IDaaS providers and standard protocols and specifications such as OAuth and JWT.
BOPLA happens when a threat actor overrides (mass assignment) or accesses
(excessive data exposure) a property that should be hidden from them. To prevent it, constrain user input, use strict data models, and make sure to check user
permissions thoroughly before determining what data users can access.
BFLA occurs when users gain access to the privileges of a user group they don’t
belong to, such as when a non-admin user gets access to an admin operation.
To prevent it, declare user permissions or roles explicitly in their access tokens,
and evaluate their right to access against all operations in your API.
Unrestricted access to sensitive business flows refers to a threat actor’s ability to
abuse our business model through our API. A well-known example is scalper
bots that buy the whole stock of a product and resell it at a higher price. To prevent it, constrain by design how users engage with your API and use automated
threat detection and response solutions.
We check whether the request is 
for the POST /checkout endpoint.
If it is, we check
whether the latest
user transaction
happened within
the past 24 hours.
If it did, we respond 
with a 409 status code.
If the last transaction happened 
more than 24 hours ago, we 
continue processing the request.
Top API configuration
and management
vulnerabilities
We continue our exploration of the most common API security risks by looking at
API configuration- and management-related categories from the Open Worldwide
Application Security Project (OWASP) API top 10 security risks. Whereas the vulnerabilities in chapter 4 relate to weak access controls to our system, resources, and
business logic flows, the vulnerabilities in this chapter involve abuse of misconfiguration that allows threat actors to trigger random requests from our system, obtain
sensitive system information, and more. You’ll learn about the importance of managing your API attack surface and see how threat actors look for old API versions or
internal endpoints that are less protected.
 As in chapter 4, I illustrate every vulnerability with a coding example and
demonstrate practical strategies to mitigate the risks. I also highlight when a
This chapter covers
Restricting resource consumption
Mitigating server-side request forgery
Configuring APIs safely
Managing the API attack surface 
Consuming APIs safely
5.1
Unrestricted resource consumption
vulnerability is better solved by a different approach, such as using dedicated infrastructure components. If you want to run the code in the GitHub repository for this
book (https://github.com/abunuwas/secure-apis), as you read this chapter, check
out chapter 4 for instructions on setting up the environment, installing the dependencies, and running the vulnerable servers that illustrate the vulnerabilities discussed in
this chapter. For more details on this chapter’s code examples, check out the ch05/
README.md file in this book’s GitHub repository.
5.1
Unrestricted resource consumption
Unrestricted resource consumption is a threat actor’s
ability to get unfettered access to a system. The
most common type of unrestricted resource
consumption attack is denial of service (DoS),
often executed as a distributed denial of service
(DDoS) attack. As shown in figure 5.1, a DDoS
attack consists of launching multiple concurrent requests against our servers to exhaust our
resources and bring our services down. If our
resources scale without limit, as is the case with
many serverless providers, such as Amazon Web
Service (AWS) Lambda, the attack will likely
push our cloud bill beyond our limits, potentially bankrupting our business.
5.1.1
Fending off a DoS attack
The most common way to fend off a DDoS attack is to deploy services that analyze web
traffic to detect anomalies, serve CAPTCHA and other challenges to incoming
requests, and rate-limit or temporarily ban access when suspicious activity is detected.

---

## Sección 64: CHAPTER 4 [Entropy: 0.265]

As you’ll learn in chapter 9, a popular solution that protects against DDoS attacks is a
web application firewall (WAF). Other effective solutions include DoS mitigation technologies such as Cloudflare, Akamai, Radware, and Imperva. A defense-in-depth
approach, with multiple levels of protection at different levels of the stack, is likely to
work best against this type of attack.
 A DoS attack doesn’t always require millions of concurrent requests. If our API
exposes a CPU and/or data-intensive operation, perhaps to crunch millions of data
points to produce an analytics report or a sales forecast, it may take only a handful of
requests to exhaust our server resources. This has an important consequence: you
shouldn’t apply the same rate-limiting policies to all your endpoints. Although rate
limiting protects our APIs from abuse, blanket-applying the same policy across all endpoints is likely to undermine user experience. If it takes 10 API calls to purchase an
item through your e-commerce website, and you block users after 8 calls, they’ll eventually stop using your website.
API server
Figure 5.1
Unrestricted resource 
consumption happens when threat actors 
get unfettered access to our servers. In 
this example, a threat actor launches a 
DDoS attack from three servers.

---

## Sección 65: CHAPTER 5 [Entropy: 0.298]

Top API configuration and management vulnerabilities
 Apply strict rate-limiting rules to your computationally intensive and data-sensitive
endpoints to prevent threat actors from abusing them, and maintain a more relaxed
policy on your less sensitive endpoints. Align with your stakeholders to understand
your API usage patterns and determine what is a reasonable threshold to suspect a
DoS attack or abuse of any given endpoint or user flow.
 Unrestricted resource consumption isn’t just about exhausting your server
resources. Consider the case of serverless computing. Serverless offerings such as AWS
Lambda, Google Cloud Platform’s (GCP’s) cloud-run functions, and Microsoft Azure
functions allow you to run applications without worrying about provisioning or scaling
infrastructure; AWS, GCP, and Azure do the work for you. Serverless infrastructure
scales as much as necessary to meet user demand. In normal situations, this is desirable, but in the middle of a DDoS attack, it can make your cloud costs spiral out of
control. This type of attack is also known as a cost attack or denial-of-wallet attack.
DEFINITION
A denial-of-wallet attack is an attack in which threat actors exploit
your cloud infrastructure’s capability to scale without control to cause financial
harm to your organization. Threat actors execute this attack by sending millions of requests from distributed nodes or by triggering operations that are
expensive to compute.
TIP
For more on these types of attacks, see Kelly et al.’s “Denial of Wallet: Defining a Looming Threat to Serverless Computing” [1] and Dorsett et al.’s “A Comprehensive Review of Denial of Wallet Attacks in Serverless Architectures” [2].
Unrestricted resource consumption vulnerabilities can also be exploited for bruteforce attacks. As shown in figure 5.2, a common exploit is to engage in brute-force
attacks to take over other user accounts or gain unauthorized access to resources by
sending multiple combinations of usernames and passwords to the login endpoint or
attempting to forge access tokens.
Figure 5.2
A common exploit of unrestricted resource consumption is conducting brute-force attacks 
to guess other users’ credentials and hijack their accounts.
API server
POST /login
{
 "email": "user@example.com",
 "password": "asdf"
}
POST /login
{
 "email": "user@example.com",
 "password": "password"
}
POST /login
{
 "email": "user@example.com",
 "password": "secret"
}
5.1
Unrestricted resource consumption
Is this a problem in the real world? You bet it is. DDoS attacks occur daily. If you have
a public API, a DDoS attack is not a matter of if, but when. According to Akamai’s
2024 report, DDoS: Here to Stay [3], DDoS attacks against the financial-services industry grew by 154% in 2023, and the trend is likely to continue. Also, according to a
recent study [4], APIs are more likely to be targets of DDoS attacks, with a 3,000%
increase registered in Q3 2024.
 Sometimes, the very protocols that make the internet work expose features that
threat actors can exploit for DDoS attacks. During August and September 2023,
Cloudflare, Google, Microsoft, and Amazon dealt with and mitigated one of the largest DDoS attacks registered to date. The attack was possible due to a vulnerability in
the HTTP/2 protocol called HTTP/2 Rapid Reset [5].
 Rapid Reset allows attackers to open multiple Transmission Control Protocol
(TCP) connections with the server by sending a request and canceling it immediately.
The vulnerability happens when the server fails to close the cancelled connections. By
canceling the request, the client can bypass the limit of concurrent requests it’s
allowed to send to the server. At its peak, Google handled 398 million requests per second [6]. We’re still waiting for a fix for HTTP/2 Rapid Reset. Meanwhile, your best
chance to prevent it is to use a cloud service with built-in DoS mitigation features like
Cloudflare, AWS, or GCP. (See chapter 9 for more details on Rapid Reset.)
 What about brute-force attacks? In February 2016, Appsecure discovered that Facebook’s beta subdomain (https://beta.facebook.com) didn’t implement rate-limiting
policies, allowing them to brute-force Facebook’s password reset flow. When resetting
their password, a user had to enter their phone number or email address, and Facebook sent a six-digit confirmation code to the number or address indicated. Because
Facebook’s beta subdomain didn’t implement rate limiting, Appsecure was able to
crack the six-digit code and reset someone else’s password [7].
 In October 2023, DNA-testing company 23andMe reported that nearly 7 million
user accounts were compromised due to a brute-force attack against its website [8].
Early in 2025, a threat actor launched a large-scale brute-force attack using 2.8 million
IP addresses to try to access networking devices manufactured by Palo Alto Networks,
Ivanti, and SonicWall [9]. If you browse HackerOne, you’ll find similar examples for
the dating application Bumble [10], X [11], and South African Telecommunications
provider MTN Group [12], among others. You’ll find that hackers use different strategies, such as changing their IP during the attack, waiting an hour between batches of
requests, and so on.
 To protect yourself from unrestricted resource consumption threats, implement
rate-limiting policies, and remember to do it on a per-operation and user-flow basis.
It’s worth tracking both the source IP of the attacks and the accounts being targeted,
as well as session IDs and device fingerprints. After 10 or 15 attempts to log into a specific account, for example, lock access to the account, and tell the account owner how
to reset their password safely.
 Encourage your users to enable multifactor authentication and serve CAPTCHA
challenges on sensitive endpoints. Monitor all traffic all the time to detect suspicious

---

## Sección 66: CHAPTER 5 [Entropy: 0.695]

Top API configuration and management vulnerabilities
activity and react accordingly. Configure spending limits and create alerts to be sent
when your costs cross a certain threshold. Whenever possible, use cloud services with
built-in DoS and brute-force mitigation features such as Cloudflare, AWS, GCP, and
Azure. The next section illustrates a code solution to tracking user access to sensitive
endpoints.
5.1.2
Addressing unrestricted resource consumption with code
Suppose that we have a login endpoint like the one shown in the following listing.
Without additional checks and measures, this code is vulnerable to brute-force
attacks. Threat actors can take over any user account by attempting multiple combinations of usernames and passwords. Check out ch05/README.md in this book’s
GitHub repository for instructions on running the vulnerable server for this listing
and testing the vulnerability.
# file: ch05/unrestricted_resource_consumption.py
@server.post("/login", response_model=LoginSuccessSchema)
def login(login_details: LoginSchema):
 for user in users_db:
 if ( 
 user["email"] == login_details.email
 and user["password"] == login_details.password
 ):
 return {"message": "success!"} 
 raise HTTPException( 
 status_code=401, detail={"error": "Wrong email or password"}
 )
How do we prevent brute-force attacks against the login endpoint in this listing? We
want to limit the number of login attempts to any user account. For the purpose of
this example, let’s say that if an account has been the target of 10 login attempts
within 24 hours, we’ll lock the account and prevent any further logins. Equally, we
want to track who’s trying to break into our system, so we’ll monitor the origin IP of
the login requests. If an IP sends 10 login requests to our system within 24 hours, we’ll
block it.
NOTE
Bear in mind that IPs are considered personally identifiable information (PII) under certain legislations such as Europe’s General Data Protection Regulation (GDPR), so you’ll have to let your users know and consent to
tracking it.
Listing 5.2 implements a prevent_brute_force_login() middleware function that
enforces these measures. (In a production application, we’d use a cache store like
Listing 5.1
Login endpoint vulnerable to brute-force attacks
We search our in-memory database for a 
matching email address and password.
If we find a match, 
we return a 
successful response.
If we don’t, we return
a 401 status code.
5.1
Unrestricted resource consumption
Redis or a database instead of in-memory objects.) To keep things simple, the code
keeps track of login activity with a few in-memory objects:

login_attempts_ips is a dictionary that keeps track of the number of login
attempts per IP.

login_attempts_accounts is a dictionary that keeps track of the number of login
attempts per account.

blocked_ips is a list that contains the blocked IPs.

locked_accounts is a list that contains the locked accounts.
The first thing we check in the middleware (line 10) is whether the originating
request’s IP is blocked. If so, in line 11, we send a 401 response and an error message
indicating that the IP is temporarily blocked. Next, in line 13, we check whether the
request is targeting the /login endpoint. If not, in line 14, we move on with a call to
the next middleware to finish processing the request. In line 16, we retrieve the JSON
payload from the request; in line 18, we check whether the email account is locked, in
which case we return a 401 response with a helpful error message (line 19). If the IP is
not blocked and the account is not locked, we increase the activity counters and continue processing the request.
# file: ch05/unrestricted_resource_consumption.py
login_attempts_ips = defaultdict(int) 
login_attempts_accounts = defaultdict(int)
blocked_ips = [] 
locked_accounts = []
@server.middleware("http.request") 
async def prevent_brute_force_login(request: Request, call_next):
 if request.client.host in blocked_ips: 
 return JSONResponse(status_code=401, content={"error": "Blocked"})
 if request.url.path != "/login": 
 return await call_next(request)
 payload = await request.json() 
 if payload["email"] in locked_accounts: 
 return JSONResponse(status_code=401, content={"error": "Locked"})
 login_attempts_ips[request.client.host] += 1 
 login_attempts_accounts[payload["email"]] += 1
 if login_attempts_ips[request.client.host] == 10: 
 blocked_ips.append(request.client.host)
Listing 5.2
Preventing brute-force attacks
We initialize an in-memory 
database of IPs and accounts 
as a list of dictionaries.
We initialize an in-memory database of 
blocked IPs and accounts as empty lists.
We use FastAPI’s 
@server.middleware() 
decorator to implement 
the middleware.
We check 
whether the 
client’s IP is 
blocked.
If the request is not for the login endpoint, 
we continue processing the request.
We load the request body’s JSON.
If the request body’s
email is in the list of
locked accounts, we
respond with a 401.
We increase the count of 
login attempts for the 
provided email’s account.
We increase the count of login 
attempts for the client’s IP.

---

## Sección 67: CHAPTER 5 [Entropy: 0.379]

Top API configuration and management vulnerabilities
 if login_attempts_accounts[payload["email"]] == 10: 
 locked_accounts.append(payload["email"])
 login_attempts_accounts[payload["email"]] = 0
 return await call_next(request) 
This listing implements simple but effective checks. You can apply these checks in
your web middleware or move them to your proxy, API gateway, or other front-facing
technology so long as it supports this type of custom functionality. Is 10 the right number of attempts? The answer depends on your use cases. If your application encourages users to log in often, use a higher counter.
 You can also associate IPs with accounts. If sarah.connor@example.com typically logs
in from a certain IP, you can allow more login attempts to that account from its associated IP, and when she logs in from a new IP, send an email to confirm that the new IP
is legitimate. If someone tries to log in from an IP that’s not bound to any account,
you want to pay extra attention to that IP and maybe allow fewer attempts. You can
also track device fingerprints and apply velocity checks for factors such as geolocation.
DEFINITION
A velocity check analyzes the speed and frequency of operations,
accounting for relevant factors such as IP, geolocation, device fingerprint,
user account, and resources involved. This type of analysis is common in sectors that are vulnerable to fraud, such as banking and payments. When a
credit card is stolen, for example, criminals try to use its funds quickly before
the card is blocked. To counteract these actions, a bank or payment processor
applies velocity checks to analyze the number of times a payment was
attempted with the same credit card in a given time frame, and it analyzes the
data by IP, geolocation, device fingerprint, and other factors to determine
whether the operations should be deemed fraudulent.
TIP
To learn more about velocity checks, check out Stripe’s excellent post
“What Is a Velocity Check in Payments?” [13].
You can apply similar checks to other endpoints, such as data-sensitive or CPU-intensive endpoints, to prevent resource exhaustion and data leaks. Remember that your
constraints should reflect your user engagement model. If a user must make 15 API
requests to accomplish a goal, you shouldn’t block them after 15 calls or fewer. Now
that we know how to tackle unrestricted resource consumption attacks, let’s turn our
attention to an even more complex problem in section 5.2: protecting our APIs
against server-side request forgery.
5.2
Server-side request forgery
Server-side request forgery (SSRF) is a threat actor’s ability to trigger malicious requests
to internal and external services from our servers. The typical attack vector for SSRF is
user input in the form of URLs that our server must call. Why would we want to allow
users to trigger external HTTP calls from our servers? There are a few good use cases,
such as allowing users to specify their avatar URL and configuring webhooks.
If the number of login 
attempts for the given 
email is 10, we lock 
the account.
We continue 
processing the request.
5.2
Server-side request forgery
 How do SSRF attacks occur? Suppose that we run a payment API like Stripe. Our
API allows customers to configure webhooks so that they receive notifications when
certain events happen, such as when a payment succeeds, a subscription is created, or
a payment fails. As illustrated in figure 5.3, this process allows us to create automated
responses to such events to trigger follow-up actions or handle errors.
Figure 5.3
Webhooks represent actions—typically, API calls—that users can configure upon certain 
events. In this example, a payment API triggers webhooks when a payment is successfully processed.
Because webhooks allow users to include custom URLs, threat actors may be able to
configure them to trigger malicious requests from our system. As shown in figure 5.4,
threat actors can configure webhooks to scan our local network for specific databases
and other services. The responses to those requests may reveal important information
about our internal system configuration and architecture. A response might reveal
that we run a PostgreSQL database or a Jenkins server, for example.
Figure 5.4
Webhooks are among the most common vectors of SSRF attacks. In this example, a threat 
actor configures a webhook to scan the local network for a service running at http://localhost:8080/jobs.
Payments API
E-store
Webhook:
onPaymentSuccess:
POST https://example.com/api/payment-success
3. If payment is successful,
we execute the webhook.
4. Store sends payment
confirmation to customer.
POST /checkout
POST /pay
1. Customer checks
out an order.
2. Customer pays
using our API.
Payments API
E-store
Webhook:
onPaymentSuccess:
POST http://localhost:8080/jobs
3. If payment is successful,
we execute the webhook.
POST /checkout
POST /pay
1. Customer checks
out an order.
2. Customer pays
using our API.
Error message:
404 (Not Found)

---

## Sección 68: CHAPTER 5 [Entropy: 0.349]

Top API configuration and management vulnerabilities
How is information about our internal services useful to threat actors? It allows them
to refine and prepare their attack strategies. Knowing that we run a PostgreSQL database, for example, allows them to focus their efforts on SQL injection attacks that target PostgreSQL-specific features and vulnerabilities. If they discover a Jenkins server,
they may be able to hijack it to launch their own processes, such as a DoS attack on
other websites.
 Are attacks like this realistic? Yes, they are. In September 2022, Cider Security discovered a vulnerability in GitLab webhooks that allowed it to hijack Jenkins servers
from other organizations, download malicious programs, and execute them. If you
run a Jenkins or other custom continuous integration (CI) server in your own infrastructure, and it’s connected to GitLab via webhooks, make sure that you allow incoming traffic only from trusted IPs [14].
 Another common exploit in SSRF vulnerabilities is triggering calls to endpoints
that are known to reveal sensitive information and credentials. EC2 instances on AWS,
for example, are known to expose credentials through their metadata service, which is
available locally at http://169.254.169.254/latest/meta-data/. A threat actor with
access to this endpoint via SSRF can easily query the identity and access management
(IAM) roles associated with the EC2 instance and pull their credentials. Those credentials can be used later to make API calls directly to AWS [15].
 In 2019, Capital One suffered one of the largest data breaches in recent years due
to an SSRF vulnerability involving EC2’s metadata service. As shown in figure 5.5, Capital One’s SSRF vulnerability was due to a misconfigured WAF that could be tricked
into relaying requests to internal services, such as EC2’s metadata service. The exploit
allowed Paige A. Thompson, a former AWS employee, to access Capital One’s AWS
account and steal records from more than 100 million credit applications, including
personal details such as names, postal addresses, phone numbers, birthdates, and
income [16–18].
Figure 5.5
Capital One’s SSRF attack happened due to a misconfiguration in its WAF, which allowed the threat 
actor to relay a request to Capital One’s EC2 instance metadata endpoint and retrieve its AWS access keys.
Web application
firewall
Capital One API
AWS EC2 Instance
GET https://example.com/?proxy=http://169.254.169.254/latest/meta-data/security-credentials
http://169.254.169.254/latest/meta-data/security-credentials
{"SecretAccessKey": "...", "AccessKeyId": "..."}
5.3
A practical example of mitigating SSRF
In response to Capital One’s breach, AWS released a new version of EC2’s metadata
service (IMDSv2) in November 2019. IMDSv2 requires calls to EC2’s metadata service
to include a temporary token to authorize the requests. This prevents services from
accessing the metadata service with a single GET request. Since March 2023, IMDSv2
has shipped by default with all Amazon Linux instances. If you have any EC2 instances
running in your AWS account, make sure that you upgrade them to IMDSv2.
 How do we protect our APIs from SSRF? I have some good news and some bad news.
The good news is that we can take many steps to mitigate the risks associated with SSRF.
The bad news is that we can’t fully prevent SSRF. What measures we can take depends
on our use cases. If you want to allow users to provide their avatar URL, for example, use
an allowlist of acceptable domains from which the avatar can be retrieved.
 What if you need to allow users to submit random URLs, such as for webhooks? At
the very least, prevent them from making calls to your localhost and other sensitive endpoints, such as AWS EC2’s metadata service and your local network. Call user-provided
URLs from a sandboxed environment without access to resources within your internal
network. If possible, use an outbound request proxy to inspect the API call and evaluate
its risk profile. Lunar.dev (https://www.lunar.dev) offers one of the best products in this
space, and GCP has a similar offering (https://mng.bz/QwrQ). In the next section, we
walk through a practical example of implementing some of these measures.
5.3
A practical example of mitigating SSRF
A common SSRF exploit involves scanning our local network to discover which services and applications are accessible. The following listing simulates a platform with a
public API and an internal API. The listing implements two endpoints: an internal GET
/secret endpoint that returns sensitive internal data and a GET /ssrf endpoint that
allows us to submit a URL, call the URL, and returns its output. Because the GET
/secret endpoint is internal, we hide it from the API documentation by setting the
include_in_schema parameter to False. Check out ch05/README.md in this book’s
GitHub repository for instructions on running the vulnerable server for this listing
and testing the vulnerability.
# file: ch05/ssrf.py
@server.get("/secret", include_in_schema=False) 
def secret():
 return "secret"
@server.get("/ssrf ")
def ssrf (url: str):
 response = requests.get(url) 
 return response.content
The GET /ssrf endpoint doesn’t constrain what URLs we can call and hence is vulnerable to SSRF. If we ask the endpoint to call http://localhost:8000/secret, it calls our
internal secrets endpoint and leaks the sensitive information.
Listing 5.3
API vulnerable to SSRF
We create a GET /secret 
endpoint that returns a 
"secret" message.
We send a request to the provided 
URL and return its content.

---

## Sección 69: CHAPTER 5 [Entropy: 0.352]

Top API configuration and management vulnerabilities
DEFINITION
A denylist (also called blacklist or blocklist) is a list of URLs, IPs, and
domain names to which access is denied. We can use denylists to define origins that are forbidden to access our services or targets that our services and/
or users are forbidden to access. The opposite of a denylist is an allowlist (also
called whitelist), which defines URLs, IPs, and domain names to which access
is allowed. Denylists and allowlists are fundamental access control strategies
in networking and are extensively used in firewalls and other security components of a system.
To prevent threat actors from calling our internal secrets service via SSRF attacks, we
constrain what URLs users are allowed to submit by creating a denylist, which is a list
of forbidden domains. The next listing defines a denylist that contains the domains
and IPs we want to prevent threat actors from calling, which, in this case, are localhost and 127.0.0.1. If a user submits a URL that contains one of those values, the
request will be rejected with a 422 response. Depending on your network topology,
you may want to include additional IPs, IP ranges, and domains in your denylist.
# file: ch05/ssrf.py
denylist = ["localhost", "127.0.0.1"] 
@server.get("/ssrf")
def ssrf (url: str):
 if any(domain in url for domain in denylist): 
 raise HTTPException(
 status_code=422,
 detail=f"Forbidden domain in {url}"
 )
 response = requests.get(url) 
 return response.content
As I explained earlier, in many cases, it’s difficult to implement full protection against
SSRF vulnerabilities, but the measures I’ve shown you in this section go a long way
toward mitigating those risks. The next section tackles another common source of vulnerabilities: security misconfiguration.
5.4
Security misconfiguration
Security misconfiguration is the incorrect configuration of our services, leaving open
holes in the system that can expose internal and sensitive information. It includes anything from unauthenticated Jenkins servers to publicly accessible S3 buckets, leaking
stack traces through error messages, deploying an internal API to a public network,
exposing sensitive data and credentials in client code, or forgetting to enable authorization checks on each API call.
 Security misconfigurations make our applications vulnerable to multiple types of
attacks and exploits. Let’s see some examples. As illustrated in figure 5.6, running our
Listing 5.4
Mitigating the risk of SSRF attacks on the localhost
We define a denylist with domains we 
want to prevent users from calling.
If the provided URL is in the 
denylist, we reject the request 
with a 422 status code.
If the provided URL is not in 
the denylist, we request its 
content and return it.
5.4
Security misconfiguration
server in debug mode often makes our application leak stack traces and other internal
details in error messages, revealing sensitive information about the implementation
details of our system. Threat actors can use this information to design and plan their
attack strategies.
Figure 5.6
A common consequence of security misconfiguration is leaking stack traces in error 
responses. Stack traces often reveal sensitive information about our internal system configuration, 
and threat actors can exploit this information to design better strategies to break into our system.
Internal APIs typically expose highly sensitive data and operations. As we saw in chapter
3, we should treat internal APIs as though they were public. In practice, however, internal APIs are often less protected than public APIs and sometimes have no authorization
access controls at all. Therefore, a simple configuration mistake that exposes our internal APIs to a public network makes our organization highly vulnerable to a data breach.
Finally, leaking API keys and other secrets in public source code, such as web applications, gives threat actors unfettered access to sensitive APIs in our system.
 Security misconfigurations are widespread, and they represent a leading cause of
API breaches. In November 2022, cybersecurity researcher Eaton Zvere discovered a
vulnerability in Toyota’s Global Supplier Preparation Information Management System (GSPIMS) that allowed him to gain access to confidential trading data related to
Toyota and its suppliers.
 Zvere discovered an endpoint in Toyota’s backend API that allowed him to generate an access token for any email, provided that it was a valid corporate email from a
Toyota employee, without any further checks. Zvere also discovered an endpoint that
returned employee information given their email, which he used to find users with
admin access. Putting both findings together, he was able to gain admin access to the
whole platform [19].
 Toyota’s GSPIMS application brought together most of OWASP’s top 10 vulnerabilities, but how does it qualify as a security misconfiguration? GSPIMS was meant to provide internal access to Toyota employees and its suppliers. The fact that the application
was accessible to anyone on the internet meant that it was deployed with the wrong network configuration, so it qualifies as a security misconfiguration breach.
 How do you prevent security misconfiguration exploits? The task begins with secure
coding and deployment practices. You could use Infrastructure as Code (IaC) to
apply secure configuration consistently across all your infrastructure and implement
API server
GET /catalog/bad-id
Status code: 500
{"error": "(psycopg2.errors.SyntaxError) syntax error at or near "AND"\nLINE 16..."}

---

## Sección 70: CHAPTER 5 [Entropy: 0.424]

Top API configuration and management vulnerabilities
an automated, repeatable deployment pipeline that prevents random manual changes.
Create a smoke test suite that runs against every deployment and checks for common
misconfigurations—for example, that there are no stack traces in error messages and
that cross-origin resource sharing (CORS) headers are correctly configured. The following section analyzes a practical example of an API vulnerable to security misconfiguration exploits.
5.5
A practical example of mitigating security 
misconfiguration
Suppose that we have an API endpoint to list users like the one in listing 5.5. The endpoint GET /users has an optional query parameter, order_by, that allows us to sort
users by a given attribute, and by default it sorts them by email. To run this example,
refer to the GitHub repository for this book, which contains the database models and
fixtures required to make it work.
 As you can see in the second line of the listing, we are running the server in debug
mode, which makes our API vulnerable to security misconfiguration exploits. If you
run a simple curl request against the endpoint, such as curl http://localhost :8000/
users, you get a list of users. Now if you try to order the results by a nonexistent attribute of the user database model, such as asdf, the API raises an error, and because
you’re running in debug mode, you’ll get a full stack trace of the error. To reproduce
this error, run the following request:
curl http://localhost:8000/users?order_by=asdf
Check out ch05/README.md in this book’s GitHub repository for instructions on
running the vulnerable server for this listing and testing the vulnerability.
# file: ch05/security_misconfiguration.py
server = FastAPI(debug=True) 
@server.get("/users", response_model=ListUsersSchema)
def list_users(order_by: Optional[str] = "email"): 
 with session_maker() as session:
 users = list( 
 session.scalars(select(UserModel).order_by(text(order_by)))
 )
 return {"users": users}
The stack traces contain information about our file paths, runtime, libraries, database
system, and code context of the error. It also leaks the full database query used to
query the records. Threat actors can use this information to tailor their attack strategy
against our system. Knowing that we use a specific type of SQL database, for example,
Listing 5.5
API vulnerable to security misconfiguration exploits
We create an instance of FastAPI’s 
server object in debug mode.
We allow sorting users using 
the order_by query parameter, 
whose value defaults to email.
We fetch a list of users from the
database sorted by the keyword
indicated in order_by.
5.6
Improper inventory management
they can narrow their injection strategy to statements that are specific to our database
system. They can also exploit this vulnerability to discover hidden properties of our
database models by assigning different values to the order_by parameter.
 We can do many things to improve the example in listing 5.5, such as restricting
the values of order_by with an enumeration and checking whether the fields exist in
our models before running the query. From a security misconfiguration perspective,
all we need to do is set the debug flag to False: server = FastAPI(debug=False). Fortunately, FastAPI sets debug to False by default, but some frameworks don’t, so make
sure that those flags are set to their correct values across all your environments.
 Now that we know about the perils of security misconfigurations, it’s time to venture into the land of API inventory management.
5.6
Improper inventory management
Improper inventory management refers to insufficient or absent management of API versions, endpoints, environments, and documentation. Insufficient management of
those assets leaves open holes in our system, contributes to API sprawl, and makes it
difficult to understand our attack surface.
 Most APIs change over time, which often means that we need to release new versions and deprecate the old ones. If our API has external consumers, we typically follow a structured process. Suppose that we currently run version 1 (v1) of our API and
are going to release version 2 (v2). As shown in figure 5.7, the first steps are releasing
v2, deprecating v1 and announcing when it’ll be retired, and finally, retiring v1.
Figure 5.7
To upgrade our API version, we release the new version and set the sunset 
deprecation header in the old version. When the date is due, we retire the old version.
The standard way to deprecate an API is to use the Deprecation and Sunset headers.
Deprecation is a timestamp indicating when the API is or will become deprecated, and
Sunset is the date when the API will be unavailable. Optionally, we also include a Link
header to point our consumers to our deprecation policy [20]. The following headers
Stage 2
API v1
Deprecation: @1806129442
Sunset: Wed, 30 Jun 2027 23:59:59 GMT
API v2
Release v2.
Set deprecation
and sunset
headers in v1.
Retire v1.
Stage 1
API v2

---

## Sección 71: CHAPTER 5 [Entropy: 0.442]

Top API configuration and management vulnerabilities
indicate that our API will be deprecated on March 27, 2027, and retired on June 30,
2027:
Deprecation: @1806129442
Link: <https://example.com/deprecation>; rel="deprecation"; type="text/html">
Sunset: Wed, 30 Jun 2027 23:59:59 GMT
On June 30, 2027, we retire the API—that is, we deprovision it and ensure that it’s not
available anymore. The process of releasing new API versions and retiring old ones is
well understood, so what’s the problem? Often, we simply forget to deprovision and
retire the old versions. In particular, when shutting down a previous version is a manual process, the task can easily slip through the cracks. Without proper API version
management tools such as API gateways, the old version may be accidentally redeployed and re-exposed. This is how we end up with zombie APIs, which are major concerns in API security (chapter 3).
 Improper inventory management also opens the door to shadow APIs. As we
learned in chapter 3, shadow APIs are APIs released without oversight, often with fewer
quality checks and with improper monitoring and visibility. The trouble is that shadow
and zombie APIs are often less secure; they may include insufficiently protected endpoints, expose sensitive data and operations, and be improperly monitored. If a threat
actor discovers them, they may be able to break into our system and steal our data without our noticing.
 Shopify offers an example of the risk of leaving old APIs around. Shopify’s infrastructure runs on GCP, and like AWS EC2’s metadata service, GCP virtual machines
run a metadata service that allows us to access sensitive information and credentials.
In April 2018, André Baptista, cofounder of cybersecurity company Ethiack, discovered that Shopify’s virtual machines were still using a deprecated version of GCP’s
metadata service and were vulnerable to SSRF attacks. By exploiting this vulnerability,
Baptista managed to download Shopify’s Secure Shell (SSH) keys and connect to its
Kubernetes control plane [21].
 What about API sprawl? As explained in chapter 3 and illustrated in figure 5.8, API
sprawl is the out-of-control proliferation of APIs, often duplicating functionality,
bypassing security checks, and going without documentation. The problem with API
sprawl is that we lose control of our attack surface. If we don’t know what APIs we’re
exposing, we won’t be able to protect and monitor them adequately. This is great news
for hackers and bad news for your organization. Unsurprisingly, according to Traceable’s 2023 State of API Security report, 48% of organizations list API sprawl as their
top security challenge [22].
 To protect your APIs from improper inventory management vulnerabilities, you
must take control of your attack surface. Automate as many processes as you can.
When you decide to deprecate an API version, automate its retirement so that no one
has to do it manually. Use API gateways and WAFs to restrict what API versions and
operations can be exposed. Use dynamic surface attack discovery solutions to monitor
traffic to your network and discover undocumented endpoints. We’ll see practical
examples of how to implement those solutions in chapters 9 and 11.
5.7
Unsafe consumption of APIs
Figure 5.8
Poorly maintained API documentation is a common source of improper asset management 
exploits. In this example, a threat actor discovers undocumented and unprotected sensitive endpoints.
So far, we’ve focused on vulnerabilities related to APIs that we build and expose. What
about the APIs we consume? Should we blindly trust the APIs we consume from third
parties? In section 5.7, we’ll analyze these questions.
5.7
Unsafe consumption of APIs
We all consume APIs, whether they’re internal or third-party APIs. We use internal
APIs to integrate with other services on our platform, typically in the context of microservices or distributed architectures. We use third-party APIs to incorporate functionality that would be difficult or costly to build from scratch, such as sending emails,
managing calendars, geolocation, mapping, and processing payments.
 For years, we’ve consumed external APIs and didn’t question the risks involved.
But hackers are catching up, as they always do. It’s perfectly possible to put our services at risk through integrations with third-party APIs. Suppose that we use an external service to pull user details such as postal addresses. As shown in figure 5.9, a threat
actor could include a SQL injection statement as their address, and when our application fetches their details, we’ll be exposed to a SQL injection attack.
 Similarly, if our application queries data from other APIs to display directly on our
user interface, we could be exposed to cross-site scripting (XSS) and similar attacks.
Suppose that we run an application that allows business analysts to search for companies in specific sectors. To aggregate data, our application pulls company information
from various business directories. If a company owner names their company with a
malicious XSS tag, such as ><script src=https://example.com/malicious-script
.js>Ltd, and that name is dynamically inserted into our HTML without filtering and
sanitization, we have the perfect recipe for a data breach. A threat actor could use this
attack vector to insert a script that sends user credentials to their own server.
paths:
 /orders:
 get:
 ...
 post
 ...
 /orders/{id}:
 get:
 ...
 put:
 ...
API server
POST /orders/1/cancel
POST /orders/1/update
API specification
Undocumented endpoints
GET /orders
POST /orders
GET /orders/1
PUT /orders/1

---

## Sección 72: CHAPTER 5 [Entropy: 0.352]

Top API configuration and management vulnerabilities
Figure 5.9
Lack of validation and sanitization on the data coming from third-party APIs exposes our 
applications to unsafe consumption of APIs exploits. In this example, a threat actor inserts a SQL 
injection statement into a third-party API. When our API consumes that data, the SQL injection runs 
against our database with devastating consequences.
Does this scenario seem unrealistic? You’d be surprised. In October 2020, a British
software developer registered a company under the name ><SCRIPT SRC=HTTPS://
MJT.XSS.HT> LTD. Within days of the registration, Companies House, the company registrar in the United Kingdom, determined that the new company’s name could pose a
threat to a small number of its customers and forced the company to change its name.
The company is still active under the name That Company Whose Name Used to Contain HTML Script Tags Ltd. [23].
TIP
A useful strategy to mitigate the risk of XSS and other exploits, such as
clickjacking, is to use a robust content security policy (CSP). You define your
website’s CSP in the Content-Security-Policy header, and it allows you to
restrict the execution of malicious scripts from other websites. You must
include the CSP header in your website’s HTML page to tell the browser how
to load scripts. For an in-depth analysis of CSP and how it helps prevent XSS,
check out Philippe de Ryck’s excellent article “Defending Against XSS with
CSP” [24].
SQL injection and XSS are among the most serious vulnerabilities we may be exposed
to when we consume external APIs, but they’re not the only ones. When our applications depend on third-party APIs, errors in those APIs can cascade into our servers
and cause unexpected behaviors. If the APIs we consume become unavailable or start
returning invalid or malformed payloads, our services may throw unexpected errors
or persist corrupted data in our databases. To prevent situations like that, make sure
that you validate and sanitize output from external APIs. Ensure that you can handle
malfunctioning internal and external APIs when they fail to respond to a request or
return a server error by implementing the circuit breaker pattern and graceful degradation, which allows your applications to continue operating in the face of
Identity provider
API server
POST /register
PUT /user
{"address": "'; DROP TABLE users;--"}
{"address": "'; DROP TABLE users;--"}
5.8
Addressing unsafe consumption of APIs in practice
unexpected system failures. You can also use outbound proxies such as Lunar.dev
(https://lunar.dev), which help you handle external API failures.
DEFINITION
Circuit breaker is a commonly used pattern in distributed architectures that prevents cascading failures when a dependency in our system fails
to behave as expected. Such dependencies can exist within our system (e.g.,
an internal service) or outside our system (a third-party API integration). The
idea is to use an outbound proxy to monitor the health of the external dependency and automatically return a useful error if the dependency doesn’t
respond on time or at all or behaves in unexpected ways.
To mitigate the risk of unsafe consumption of APIs, always validate and sanitize data
coming from other APIs. If the API is documented with an OpenAPI specification, for
example, create your own validation models based on the response schemas, and validate the API responses against those schemas at run time using robust libraries for
data validation. If the responses are invalid, reject them, and contact the API provider.
Make sure that you carefully parameterize all database queries involving data coming
from outside your system to mitigate the risk of SQL injection attacks via poisoned
payloads. Finally, ensure that you can handle malfunctioning external APIs when they
fail to behave as expected so that such events don’t cause cascading failures in your
system.
5.8
Addressing unsafe consumption of APIs 
in practice
To illustrate unsafe consumption of APIs, listing 5.6 implements two endpoints that
represent two APIs (server-a and server-b):

GET /server-a/unsafe-api represents an unsafe third-party API.

GET /server-b/unsafe-consumption represents an API vulnerable to injection
from third-party APIs.
I’m adding both endpoints to the same API to keep the example simple, but imagine
that they run on different servers. GET /server-b/unsafe-consumption represents a
characters API. If you check the GitHub repository for the book, you’ll see database
fixtures for various characters from the Harry Potter universe. Each character has a
status: muggle, wizard, or witch. To find the status of each character, we call an external API, here represented by GET /server-a/unsafe-api. In the following listing, the
example is hardcoded to update Harry Potter’s status. Sadly, GET /server-a/unsafeapi contains unsafe data and returns a SQL injection statement. If you call GET
/server-b/unsafe-consumption, you’ll see that the status of all characters is set to an
empty string. This is an example of unsafe consumption of APIs: we’re not validating
the external API’s output, and we’re not handling it safely. Check out ch05/
README.md in this book’s GitHub repository for instructions on running the vulnerable server for this listing and testing the vulnerability.

---

## Sección 73: CHAPTER 5 [Entropy: 0.556]

Top API configuration and management vulnerabilities
 
# file: ch05/unsafe_consumption_apis.py
server = FastAPI()
@server.get("/server-a/unsafe-api")
def unsafe_api():
 return {
 "status": "';--" 
 }
@server.get("/server-b/unsafe-consumption")
def unsafe_consumption():
 status = requests.get(
 "http://localhost:8000/unsafe-api" 
 ).json()["status"]
 with session_maker() as session:
 session.execute(text( 
 f"update character set status = '{status}' "
 f"where name = 'Harry Potter'"
 ))
 session.commit()
How do we protect our API from unsafe consumption of data from third-party APIs in
the previous listing? A good strategy is to parameterize all database queries, such as by
using SQLAlchemy’s query API instead of running a raw SQL statement. If we do, we’ll
prevent the bulk update we saw earlier, but we’ll still have a problem: Harry Potter’s status will be set to a SQL injection statement. That’s not good. Harry Potter is a wizard,
and his status shouldn’t be updated if the external API doesn’t return valid data.
 To sanitize data from the external API, we create our own validation model. Listing
5.7 implements a Pydantic model that validates the external API’s responses. We know
that the character’s status can have only one of three values, so we create an enumeration to validate that. If validation fails, our server will throw a 500 (Internal Server
Error) response, and no record will be updated. We are letting our data models raise
a validation error when the data coming from the external API is invalid, which results
in the 500 (Internal Server Error) status code response from the API. Alternatively,
we could wrap the validation step within a try/except block and return a different
error, such as a 400 (Bad Request) status code. Whichever option you choose, make
sure that the error makes its way to the logs so you can see it and that the API consumer can process and understand the error message. Logging this type of error not
only gives you visibility into the problem, allowing you to trace and debug it, but also
paves the way for early detection of potential attacks or third-party issues, as you’ll
learn in chapter 11.
 
 
 
Listing 5.6
API vulnerable to injection from third-party APIs
The GET /server-a/unsafe-api 
returns the ';-- malicious SQL 
injection payload.
We call the GET /server-a/
unsafe-api and retrieve 
the status payload.
We use the status payload to 
update Harry Potter’s status.
Summary
 
# file: ch05/unsafe_consumption_apis.py
class StatusEnum(str, enum.Enum): 
 wizard = "wizard"
 witch = "witch"
 muggle = "muggle"
class CharacterStatus(BaseModel): 
 status: StatusEnum
@server.get("/server-b/safe-consumption")
def safe_consumption():
 status = requests.get("http://localhost:8000/unsafe-api").json() 
 status_validated = CharacterStatus(status=status) 
 with session_maker() as session:
 session.execute(text(
 f"update character set status = '{status_validated.status}' "
 f"where name = 'Harry Potter'"
 ))
 session.commit()
APIs are pervasive in modern applications, and we all consume APIs to use services we
don’t have the resources to build ourselves, such as emailing and geolocation. All
APIs, including external ones, are prone to vulnerabilities and exploits, so it’s important to put measures in place to protect our applications from third-party API exploits.
The strategies discussed in this section will help you accomplish that task.
 This concludes our journey through the main types of vulnerabilities in APIs. We’ve
seen tons of real-world examples and discussed plenty of practical examples. There’s a
lot to unpack here, so take your time to digest the content, and make sure that you
check out the book’s GitHub repository to run the full examples and understand how
they work. In chapter 6, we’ll dive deeper into the intricacies of API security by analyzing various categories of design vulnerabilities and seeing how to tackle them.
Summary
Unrestricted resource consumption happens when threat actors gain unfettered access to our APIs, enabling them to launch a DoS or brute-force attack.
To prevent it, monitor and track all requests, and throttle or ban consumers
that show unusual or malicious patterns.
SSRF is a threat actor’s ability to trigger malicious requests from our servers. To
prevent it, create allowlists with the URLs, IPs, and domains your users are
allowed to submit to your APIs and denylists to forbid access to sensitive or malicious domains and endpoints.
Security misconfiguration refers to the incorrect configuration of our services
leading to vulnerabilities. Prevent it by automating deployments and
Listing 5.7
Preventing injection from third-party APIs
We define an enumeration 
with acceptable status values.
We define a validation model 
with the status enumeration.
We request data
from the unsafe API.
We validate the returned
data against the
CharacterStatus model.

---

## Sección 74: CHAPTER 5 [Entropy: 0.25]

Top API configuration and management vulnerabilities
configuration management and by running smoke tests to detect common
misconfigurations.
Improper inventory management refers to inadequate or absent management
of our API versions, endpoints, environments, and documentation. To prevent
it, use proper API versioning and deprecation strategies, configure your firewalls to restrict traffic to your documented endpoints, and continuously monitor all traffic to discover undocumented attack surface.
Unsafe consumption of APIs occurs when threat actors disrupt our services by
poisoning data in third-party APIs we consume or when those APIs fail to
behave as expected. To prevent it, validate and sanitize all output from thirdparty APIs.
API security by design
In February 2024, Trello, the popular project management platform, suffered a
major data breach affecting 15 million users. The data leaked contained personal
names, usernames, emails, and other account information. Surprisingly, the threat
actor didn’t need to breach the system to obtain the data. How could this happen?
This chapter covers
Mitigating the risk of predictable resource identifiers
Designing secure pagination patterns
Constraining user input to prevent large payload 
attacks
Designing strict data models to mitigate the risk of 
data corruption attacks
Understanding the risks of exposing server-side 
properties in user input
Designing and enforcing secure user flows through 
the API

---

## Sección 75: CHAPTER 6 [Entropy: 0.265]

API security by design
 Trello had an endpoint that conveniently allowed users to find other users by
email and connect with them. Upon finding an existing user, the API returned the
user’s full profile. In other words, the endpoint revealed excessive user personal information. Besides, the endpoint was unauthenticated and wasn’t properly rate-limited,
which allowed the threat actor to query the API anonymously millions of times without being traced. In response to the breach, Trello required authentication to access
user profiles. This allows Trello to trace every request to a specific user account and
hence detect and flag abnormal user behavior.
 The Trello breach highlights the effect of API design choices on our security posture. By combining lack of authentication with excessive data exposure, Trello created
a highly sensitive business flow that was easy to abuse.
 Trello isn’t an isolated case. Most APIs contain vulnerable designs. Sometimes, vulnerable designs serve a business purpose and are intentional. If we want to allow users
to filter items in a product catalog using random keywords, for example, we won’t be
able to apply any constraints to the search filter, opening our API to attacks like SQL
injection, schema enumeration, and large payloads. In such cases, we handle the
potential threats at run time in the implementation.
 Most API design vulnerabilities, however, aren’t intentional or justifiable. Many
APIs expose sensitive data for no good reason, allowing users to fetch millions of items
in a single request, modify the status of an order or a payment, or game the system
with fake product reviews and the like. Sadly, most of these vulnerabilities cannot be
addressed at run time. The vulnerabilities in the Trello API could be fixed only by
changing the design. That means that to deliver secure APIs, we must focus on the
design. As we learned in chapter 3, we must shift our perspective on API security to
the left and tackle potential issues from the beginning of our API development process. That’s what this chapter is all about.
 In this chapter, you’ll learn to identify unintended design vulnerabilities in your
API designs and address them properly. Over the past few years, I’ve had the opportunity to review hundreds of APIs, and I put together a list of common categories of
design vulnerabilities, including predictable identifiers, unconstrained input, flexible
schemas, exposing server-side properties in user input, sensitive data exposure, and
unsafe user flows. In this chapter, I’ll go through each of these categories in detail.
You’ll see practical examples and learn how threat actors exploit them, and how to fix
them. Let the journey begin!
6.1
What is vulnerable API design?
APIs can be vulnerable or secure by design. What does this mean in practice? To
understand how API design affects our security posture, we must learn to look at the
API from an attacker’s perspective. Threat actors look for ways to trigger undesired or
unexpected behaviors in our system. Sometimes, they do this by breaking through our
authentication and authorization systems, tampering access tokens, or taking over
other user accounts. Most threat detection systems flag many of those attacks, and
many web application firewalls (WAFs) block them successfully.
6.1
What is vulnerable API design?
 In practice, most threat actors try to get around your WAF and your threat detection systems by looking like normal users. According to Salt Security’s State of API
Security 2025, 95% of API attacks are authenticated [1, 2]. Paulo Silva, maintainer of
the Open Worldwide Application Security Project’s (OWASP’s) top 10 for APIs, says
most hackers are careful to stay below your rate-limiting threshold [3]. For all intents
and purposes, hackers look like normal users. They’re looking for design vulnerabilities in your system that they can exploit to their benefit without raising any flags.
 What do design vulnerabilities look like, and how do threat actors exploit them?
Suppose that we have an e-commerce API with a product catalog. As shown in figure
6.1, to browse the catalog, we expose a GET /products endpoint, which returns a list of
products for sale. Because we have millions of products, we won’t send the whole list
in one go, which would put overwhelming pressure on our database and our servers.
Instead, we’ll allow users to request a small chunk of the list at a time, such as 50 items
per request. This is what we call pagination, a fundamental feature in endpoints that
represent collections of resources.
DEFINITION
Vulnerable API design refers to vulnerabilities that an API has by
design. We say “by design” because such vulnerabilities must be tackled at
design time. It includes things like predictable identifiers, improper pagination, and unconstrained user input. Threat actors exploit design vulnerabilities to cause unexpected behaviors in our APIs by sending malicious requests
that look legitimate by design. Some API design vulnerabilities can be mitigated in the implementation, but doing so creates a drift between the implementation and the design, making the API more difficult to test and
understand. To tackle API design vulnerabilities effectively, we must go back
to the beginning of the process and address them at design time.
Figure 6.1
We use pagination to slice a large collection of items into smaller chunks. On an e-commerce website, 
for example, we use pagination to let users retrieve a few products at a time when browsing the catalog.
Page 1
https://example.com/catalog
{
 "products": [
 {"id": 1, ...},
 {"id": 2, ...},
 ...
 {"id": 50, ...}
 ]
}
Page 1
{
 "products": [
 {"id": 101, ...},
 {"id": 102, ...},
 ...
 {"id": 150, ...},
 ]
}
Page 3
{
 "products": [
 {"id": 51, ...},
 {"id": 52, ...},
 ...
 {"id": 100, ...},
 ]
}
Page 2
E-commerce API
GET /products

---

## Sección 76: CHAPTER 6 [Entropy: 0.532]

API security by design
There are different patterns for implementing pagination, such as page-based pagination, offset-based pagination, and cursor-based pagination [4]. The following listing
shows an OpenAPI specification for the GET /products endpoint that uses page-based
pagination. We expose the following parameters to paginate the results:

page—Allows the user to select the page they want to view

perPage—Allows the user to select how many items per page they want to see
# file: ch06/6_1_unsafe_pagination.yaml
paths:
 /products:
 get:
 parameters:
 - name: page
 in: query
 required: false
 schema:
 type: integer
 - name: perPage
 in: query
 required: false
 schema:
 type: integer
This example is a standard, well-defined pagination pattern, but it is also a great example of vulnerable design. Why? Let’s look into the query parameters. From the specification, we know that both page and perPage are integers and are not required.
Presumably, they have reasonable default values, although that’s not documented in
the specification. The expectation is that users will assign sensible values to the parameters, such as by requesting 10 items per page (as in GET /products?perPage=10) or by
requesting page 5 (as in GET /products?page=5).
 Notice, however, that listing 6.1 doesn’t specify minimum or maximum values for
the parameters. As illustrated in figure 6.2, by design, a user could request 100 million
Listing 6.1
Vulnerable pagination
E-commerce API
GET /products?perPage=100000000
GET /products?perPage=0
GET /products?perPage=-100
GET /products?page=-100
Figure 6.2
Threat actors can exploit unconstrained pagination parameters to trigger unexpected behaviors in 
our server or even shut them down. If a threat actor requests 100 million items from our API, the request will 
cause performance problems in our servers.
6.1
What is vulnerable API design?
items in a single request, as in GET /products?perPage=100000000. Our system may be
able to handle one of those requests flawlessly, but what about 100 concurrent
requests like that? At some point, our database will come under pressure and take our
website down, opening the door to denial-of-service (DoS) attacks. What happens
when users request page –1 (GET /products?page=-1), or 0 items per page (GET /products?perPage=0)? Depending on the implementation details, we may get anything
from internal server errors to unexpected items in the list.
 The implementation could handle these problems at run time. It could default to
a lower value when perPage’s value goes above 100, for example, but this method delegates crucial security decisions to the will of developers. As security-conscious as developers are, they’re under immense pressure to deliver their code on time. All this
means that security is easy to overlook if we don’t tackle it by design. To make the pagination pattern in listing 6.1 secure by design, we want to add minimum and maximum values to the query parameters.
# file: ch06/6_1_safe_pagination.yaml
paths:
 /products:
 get:
 parameters:
 - name: page
 in: query
 required: false
 schema:
 type: integer
 minimum: 1
 maximum: 100
 - name: perPage
 in: query
 required: false
 schema:
 type: integer
 minimum: 10
 maximum: 100
Notice that this code includes a maximum value for the page parameter, which means
that users won’t be able to look for products beyond page 100. Does that make sense?
The answer depends on the use case. If you want users to be able to scroll indefinitely,
you shouldn’t include a maximum value. But if you want to prevent them from scraping your whole database of products, setting a maximum number of pages is a good
way to limit scrolling by design.
 The best part about the design in listing 6.2 is that it allows you to use contractbased testing and API fuzzing tools to validate that the implementation abides with
the specification. You’ll learn more about these testing strategies in chapter 12. For
now, watch for unbound pagination parameters, and ensure that they have sensible
constraints.
Listing 6.2
Secure pagination

---

## Sección 77: CHAPTER 6 [Entropy: 0.31]

API security by design
6.2
Predictable identifiers
The pagination example in section 6.1 is a simple illustration of how API design affects
our security posture. Now that we have an idea of how it works, let’s dive into more complex categories. We’ll begin by warming up with an easy one: predictable identifiers.
 Most APIs are resource oriented, meaning they’re designed around resources. As illustrated in figure 6.3, a payments API represents each payment as a resource, an orders
API represents each order as a resource, and so on.
Figure 6.3
Most APIs are designed around resources. A payments API represents each 
payment as a resource, and an orders API represents each order as a resource.
Each resource has an identifier (ID), and we use those ID values to look for and
retrieve the resources from the server. A payment with an ID of 1, for example, can be
represented by a URL like /payments/1. The problem occurs when resource identifiers follow a predictable pattern. As illustrated in figure 6.4, if a user makes a payment
and gets back an ID of 1, then makes a second payment and gets back an ID of 2,
there’s clearly a pattern of incremental integer IDs. The next natural step is to play
with different identifiers in the resource URI path (/payments/{payment_id}, in this
case) to see whether we can get our hands on resources that don’t belong to us and we
shouldn’t be able to access. We call the practice of looking for new resources in a
server by manipulating their identifiers in the resource URI resource enumeration.
Payments API
/payments/1
/payments/2
/payments/3
Payments
resources
/orders/1
/orders/2
/orders/3
Orders resources
Orders API
Payments API
POST /payments
{...}
status code: 201
{"id": 1, "status": "pending"...}
POST /payments
{...}
status code: 201
{"id": 2, "status": "pending"...}
Figure 6.4
When an API uses a 
predictable pattern to identify 
resources, such as incremental 
integer IDs, threat actors will play 
with those values to try to access 
resources that don’t belong to them.
6.3
Unconstrained user input
Incremental integer IDs are a common type of primary keys or record identifiers used
in SQL databases. They’re natively supported, efficient, and easy to work with. Using
incremental IDs in our database isn’t bad. The problem occurs when they are exposed
directly through the API, as in figure 6.4. If that happens, we give threat actors a recipe for scanning for resources on our server. Paired with a weak implementation of
authorization and access controls, sequential IDs can lead to broken object-level
access authorization (BOLA) attacks and data breaches.
 In April 2021, Clubhouse, a popular social media platform, suffered a leak of 1.3
million user records, including personal names, usernames, and Twitter (now X) and
Instagram handles [5]. Clubhouse used incremental integer IDs to identify users, it
lacked rate limiting on its users endpoint, and it didn’t protect the endpoint with userbased access controls. By exploiting these vulnerabilities, a threat actor was able to
scrape millions of records from the API. Clubhouse responded to the news by clarifying that it wasn’t hacked and that the API was used as intended. In other words, the
API was vulnerable by design.
 To deter threat actors from discovering resources on your server, don’t expose predictable IDs in your API. You can do this at the database or the application level. If
your database supports this feature, you can use string-based identifiers, such as globally unique identifiers (GUIDs) or universally unique identifiers (UUIDs, especially
UUIDv4) as your primary key. Identifiers like GUIDs and UUIDs don’t follow a
sequential pattern, mitigating the risk of resource enumeration. If you must use incremental IDs in your database for legacy or other technical reasons, consider using surrogate public IDs. A surrogate public ID is a public-facing identifier, such as a UUID,
that maps internally to your incremental IDs. The idea is to expose the public surrogate ID to your API consumers while internally using the incremental ID for table
joins and other references. Alternatively, you can use a custom encoding method,
such as Sqids (pronounced “squids”; https://sqids.org), that allows you to generate
random unique IDs from numbers. The idea is to take the incremental ID from your
database and transform it to another value that threat actors can’t trace to the original
identifier, mitigating the risk of resource enumeration.
WARNING
Using nonpredictable identifiers doesn’t mean your API is suddenly immune to BOLA and resource enumeration; it simply makes it more
difficult for threat actors to scan your server for resources. There are signals
threat actors can still use to discover resources, such as differential response
latencies, different status codes, and subtle differences in the messaging for
existing and nonexistent resources. You must also have robust access control
checks on every resource endpoint and a sensible configuration of rate-limiting policies.
6.3
Unconstrained user input
Now that we understand the risks associated with predictable identifiers, let’s move on
to something more complex: unconstrained user input. Most API operations require
input from users. When we place an order online, for example, we specify the

---

## Sección 78: CHAPTER 6 [Entropy: 0.505]

API security by design
products we want to buy and how many; when we make a payment, we submit our
credit card details; when we book a ride, we select our destination and the type of
vehicle we want. These are examples of write operations; they create resources on the
server with the data we supply in the form of input, typically in the body of the
request.
 Read operations also accept user input. As illustrated in figure 6.5, when we check
the status of our order on an e-commerce API, we provide the order ID. When we
browse a product catalog, we provide pagination parameters, as we saw in section 6.1.
When we want to obtain information about a certain location, we provide its address
or its latitude and longitude coordinates. Read operations usually take user input in
the form of query and path parameters.
Figure 6.5
Most API operations require input parameters, including read operations. GET /orders/1, for 
example, has a URL path parameter, which is the order ID equal to 1.
The ability to capture user input in our APIs makes our applications come to life. It
allows users to access the business logic behind the API. But it is also the main attack
vector in the API. User input gets to interact with our business and data layers, and if it
isn’t properly constrained or sanitized, it can wreak havoc on our system.
 Unconstrained user input refers to the ability to insert random values in any parameter open to the user, including URL query and path parameters, request bodies, and
request headers. As shown in figure 6.6, many APIs sit behind a web or mobile application. In those cases, APIs often delegate the job of constraining user input to the web
or mobile application, which gives us a false sense of security because nothing prevents threat actors from accessing the API directly and sending malicious content.
GET /order/1
GET /products?perPage=10&page=1
GET /location?lat=37.264882607674245&long=-115.79799011818602
order ID = 1
latitude = 37.264882607674245
perPage = 10
page = 1
longitude = -115.79799011818602
Input parameter
(URL path)
Input parameters
(URL query)
Input parameters (URL query)
6.3
Unconstrained user input
 
Figure 6.6
Many APIs delegate responsibility for constraining user input to the web application. In this example, 
the web application ensures that users can select only 10, 20, or 50 items per page when browsing a product 
catalog.
What does unconstrained input look like? In section 6.1, we saw an illustration of
unconstrained input with pagination parameters. In that case, the lack of bounds in
the page and perPage parameters allowed a threat actor to request millions of items in
a single request to bring the system down and trigger unexpected behaviors. Let’s see
other examples.
 Suppose that we have an application where users can submit book reviews, something along the lines of Goodreads. The application has an API with a POST /books/
{book_id}/reviews endpoint, which allows us to submit reviews for a specific book
with the following schema.
# file: ch06/6_3_unconstrained_input.yaml
paths:
 /books/{book_id}/reviews:
 post:
 [...]
components:
 schemas:
 BookReview:
 type: object
 required:
 - rating
 properties:
 rating:
 type: integer
 review:
 type: string
Listing 6.3
Unconstrained book review schema
Page 1
https://example.com/catalog
Items per page
20
GET /products?perPage=10
E-commerce API

---

## Sección 79: CHAPTER 6 [Entropy: 0.37]

API security by design
The schema has two properties: rating and review. rating is required and is an integer, whereas review is optional and is a string. Both parameters are unconstrained. In
this case, the web application would constrain user input by allowing users to select a
rating between 1 and 5. By design, however, the API isn’t enforcing any constraints, so
a threat actor could send a higher rating directly to the API, as in the following
request:
POST /books/1/reviews
{"rating": 500}
With this request, the threat actor could increase the average rating of a book. Similarly, they could use a negative rating to push down the average rating of other books.
By engaging with the API directly and bypassing the constraints in the web application, a threat actor can abuse the system and manipulate the ratings of any book.
 The BookReview schema is also vulnerable to large payload attacks. Suppose that a
competitor’s book is on the website, and we don’t want readers to be able to access it.
To accomplish that task, we write long reviews. One long review won’t cause much
trouble. As illustrated in figure 6.7, however, a few hundred very long reviews will
make it hard to load those records from the database and serve the book details
request, making our API vulnerable to resource-exhaustion attacks.
Figure 6.7
Unconstrained strings allow users to send large payloads to our server. In this example, 
a threat actor submits long reviews for a book with ID 1. When a user tries to retrieve the book later, 
the server can’t serve the request because it can’t load so many large records at the same time.
Book-review API
POST /books/1/review
{
 "rating": 0,
 "review": "Very large payload..."
}
POST /books/1/review
{
 "rating": 0,
 "review": "Very large payload..."
}
POST /books/1/review
{...}
GET /books/1
6.3
Unconstrained user input
To fix this problem by design, we include constraints in the BookReview schema. As
shown in the following listing, we constrain the property rating to values from 1 to 5
and allow a maximum 2,000 characters for the review property. Now that our API is
secure by design, threat actors can’t abuse our review system anymore.
# file: ch06/6_3_constrained_input.yaml
paths:
 /books/{book_id}/reviews:
 post:
 [...]
components:
 shemas:
 BookReview:
 type: object
 required:
 - rating
 properties:
 rating:
 type: integer
 minimum: 1
 maximum: 5
 review:
 type: string
 maxLength: 2000
It’s clear that request bodies are an important attack vector, but what about query and
path parameters? They are too. We saw an illustration of vulnerable query parameters
in the pagination example in section 6.1, which included unbound integers. Let’s see
an example of unconstrained strings. Suppose that the GET /products endpoint from
listing 6.2 includes two additional parameters: filter and sortBy, as shown in the next
listing. Both parameters are strings without constraints and are nonrequired.
# file: ch06/6_3_unconstrained_sortBy_parameters.yaml
paths:
 /products:
 get:
 parameters:
 - name: page
 in: query
 required: false
 schema:
 type: integer
 - name: perPage
 in: query
 required: false
 schema:
 type: integer
Listing 6.4
Safe book review schema with constraints
Listing 6.5
Insecure string query parameters

---

## Sección 80: CHAPTER 6 [Entropy: 0.665]

API security by design
 - name: filter
 in: query
 required: false
 schema:
 type: string
 - name: sortBy
 in: query
 required: false
 schema:
 type: string
When we use the GET /products endpoint, we expect users to choose sensible values
for the filter and the sortBy parameters, such as filtering by toasters (as in GET
/products?filter=toasters) and sorting by price (as in GET /products?sortBy=price).
But threat actors will use malicious values too, such as SQL injections, as in GET
/products?filter=' OR 1=1--. As shown in figure 6.8, if our database queries aren’t
parameterized, the SQL injection will disable any filters and constraints in our transaction. In some situations, this could lead to BOLA and other vulnerabilities.
Figure 6.8
Unconstrained string parameters allow threat actors to send SQL injection attacks to our 
servers. In this example, a threat actor disables filters and constraints in our query by setting the filter 
query parameter to ' OR 1=1; --.
Another SQL injection example that would work here is
GET /products?filter=' AND 3133=(SELECT 3133 FROM PG_SLEEP(10))--
This SQL injection appears to be more complicated, but it really just tells the database
to wait 10 seconds before returning the data. One request like this won’t pose much of
a problem, but a few thousand concurrent requests like it will eventually use all the
available resources in our database connection pool and make the API unable to serve
any further requests involving the database.
 The unconstrained sortBy parameter is also vulnerable to schema enumeration
attacks. As shown in figure 6.9, we typically sort items by one of the columns in our
database schema. Without constraints on sortBy, threat actors can try different values
to discover hidden columns in our product table. Schema enumeration attacks can
lead to disclosure of sensitive data and configuration in our system.
E-commerce API
GET /products?filter=' OR 1=1;--
SELECT * from products where filter = '' OR 1=1;
6.3
Unconstrained user input
 
Figure 6.9
The sortBy parameter allows us to sort items by properties of the product 
model, such as name, price, and rating. Because sortBy is unconstrained, a threat actor 
tries other values. Sorting by nonexistent fields like asdf throws a server error, but sorting 
by is_exclusive returns successfully, allowing the threat actor to discover hidden 
properties of the model.
How do we mitigate the risks of unconstrained string parameters? As the next listing
shows, in the case of sortBy, a good strategy is using enumerations. We want to allow
users to sort items using a restricted number of values, such as price, review, and name,
and an enumeration is the right solution for this. This solution will prevent threat
actors from using random values by design.
# file: ch06/6_3_constrained_sortBy_parameter.yaml
paths:
 /products:
 get:
 parameters:
 [...]
 - name: sortBy
 in: query
 required: false
 schema:
 type: string
 enum:
 - price
 - review
 - name
What about the filter parameter? In this case, we probably want to allow users to filter by random words, so we can’t easily apply restrictions to the schema. In this situation, the business use case justifies a vulnerable design. We want to handle the
problem at run time by parameterizing all our queries and thereby removing the risk
of SQL injection. Another helpful tool to mitigate the risk of unconstrained parameters is a web application firewall (WAF), which in most cases will fend off requests containing malicious injection attacks.
Listing 6.6
Constraining sortBy with an enumeration
API server
GET /products?sortBy=name
GET /products?sortBy=rating
GET /products?sortBy=price
GET /products?sortBy=asdf
GET /products?sortBy=is_exclusive

---

## Sección 81: CHAPTER 6 [Entropy: 0.52]

API security by design
6.4
Flexible schemas
Now that we understand how unconstrained input makes our APIs vulnerable, let’s
look at a more complex problem. Flexible schemas allow us to compose payloads with
different combinations of properties. This can happen when properties are optional,
as in the review property of the BookReview schema in listing 6.3, and when we allow
the presence of undeclared properties.
6.4.1
Optional properties
Optional properties are nonrequired properties in a schema. We include optional properties to give users flexibility. In the BookReview schema from listing 6.3, we give users
the choice of including a written review of the book, but this isn’t required.
 Another use for optional properties is when we want to represent two or more data
models with the same schema. This usually happens when we have data models with
similar properties and one or two properties specific to each model. Suppose that we
have an online bookstore that sells e-books and printed books. The formats represent
different models, but because they share many properties, such as author and title, we
may decide to represent them with the same schema. As illustrated in figure 6.10, the
risk is data corruption. If someone mistakenly creates a printed book record with
e-book properties, this mistake creates problems in other parts of the system when we
process the data.
 As shown in figure 6.10, the book ends up written in the database with its pages
field set to null. When a user retrieves a list of books, our API may have a feature that
POST /books
{
 "title": "Microservice APIs",
 "author": "Jose Haro Peralta",
 "format": "printed",
 "byte_size": 15120
}
Status code: 201
{...}
GET /books?format=printed&pages_gt=200
for book in db.books():
 book.reading_time = calculate_reading_time(
 pages=book.pages, reader_speed=reader.speed
 )
Book
+ title: "Microservice APIs"
+ author: "Jose Haro Peralta"
+ format: "printed"
+ pages: null
Status code: 500
{...}
Book-catalog API
Figure 6.10
A threat actor sends an invalid representation of a printed book, corrupting the representation of that 
book in the database and making it impossible for other users to retrieve that record.
6.4
Flexible schemas
dynamically estimates the number of hours it takes to read the book given the reader’s
average reading speed and the book’s size, using pages in the case of printed books
and byte_size in the case of e-books. Because the newly created printed book’s record
does not contain a valid value for pages, the endpoint fails when it tries to calculate
reading time. In the hands of a threat actor, this situation is a perfect recipe for wreaking havoc on our application and our business.
 To explain data corruption vulnerabilities, I’ll expand on the printed versus
e-books example. The only difference between e-books and printed books is that one
measures the length of the book in bytes and the other does it in pages. Because all
the other properties of the model are the same, including author name and book
title, we decide to represent both formats with the same schema, as follows.
# file: ch06/6_4_multiple_models_same_schema.yaml
paths:
 /books:
 post:
 [...]
components:
 schemas:
 Book:
 type: object
 required:
 - author
 - title
 - format
 properties:
 title:
 type: string
 author:
 type: string
 format:
 type: string
 enum:
 - print
 - ebook
 pages:
 type: integer
 byte_size:
 type: integer
To distinguish between the two types of books, this listing introduces the format property, which is an enumeration of print and ebook. When authors list their books on
the website, we expect them to use pages for a printed book and byte_size for an
e-book. To list a printed book, we expect a request body like this:
POST /books
'{"title": "Microservice APIs", "author": "Jose Haro Peralta", \
"format": "print", "pages": 440}'
Listing 6.7
Representing multiple data models with the same schema

---

## Sección 82: CHAPTER 6 [Entropy: 0.535]

API security by design
To list an e-book, we expect a request body like this:
POST /books
'{"title": "Microservice APIs", "author": "Jose Haro Peralta", \
"format": "ebook", "byte_size": 15110000}'
As usual, however, nothing prevents threat actors from going directly to the API and
sending bad payloads. The following request creates a printed book record with
byte_size instead of pages:
'{"title": "Microservice APIs", "author": "Jose Haro Peralta", \
"format": "printed", "byte_size": 15110000}'
To prevent data corruption attacks like this one, we represent different data models
with different schemas. If we want to avoid duplication by grouping all the common
properties in a shared model, we use composition. The following listing defines a
BaseBook schema with all the shared properties of printed books and e-books. With
the help of the allOf keyword, we make Ebook and PrintedBook inherit BaseBook’s
schema via composition and add their format-specific properties.
# file: ch06/6_4_composition.yaml
paths:
 /books:
 post:
 [...]
components:
 schemas:
 BaseBook:
 type: object
 required:
 - author
 - title
 properties:
 title:
 type: string
 author:
 type: string
 Ebook:
 allOf:
 - $ref: #/components/schemas/BaseBook
 - type: object
 properties:
 byte_size:
 type: integer
 PrintedBook:
 allOf:
 - $ref: #/components/schemas/BaseBook
 - type: object
Listing 6.8
Using composition to handle shared model properties
6.4
Flexible schemas
 properties:
 pages:
 type: integer
By representing each data model with its own schema, we can apply better validation
rules on request payloads, mitigating the risk of data corruption attacks.
6.4.2
Additional properties
Now that we understand how optional properties pose a risk, let’s look at a more subtle and often misunderstood feature in JSON Schema: additional properties. Additional properties are those that we haven’t declared as part of our schemas. The
following listing includes a schema for placing orders in an e-commerce API. The
schema defines two required properties: product and quantity. Every request sent to
the server must include both properties, as in the following example:
 POST /orders
'{"product": "3598abeb-2f93-4f3f-a14b-103f27c2c040", "quantity": 1}'
# file: ch06/6_4_additional_properties_allowed.yaml
paths:
 /orders:
 post:
 [...]
components:
 schemas:
 PlaceOrder:
 type: object
 required:
 - product
 - quantity
 properties:
 product:
 type: string
 format: UUID
 quantity:
 type: integer
 [...]
As it stands, the PlaceOrder schema allows additional properties in the payload. The
following request is perfectly acceptable:
POST /orders
'{"product": "3598abeb-2f93-4f3f-a14b-103f27c2c040", "quantity": 1, \
"foo": "bar"}'
Allowing additional properties opens the door to many kinds of abuses in our system.
Suppose that the POST /orders endpoint returns a response payload with the shape of
the Order schema in the following listing, which introduces two new properties: id and
status.
Listing 6.9
Flexible schema allowing additional properties

---

## Sección 83: CHAPTER 6 [Entropy: 0.565]

API security by design
 
# file: ch06/6_4_additional_properties_allowed.yaml
paths:
 /orders:
 post:
 [...]
components:
 schemas:
 [...]
 Order:
 type: object
 required:
 - status
 - id
 - product
 - quantity
 properties:
 id:
 type: string
 format: UUID
 status:
 type: string
 enum:
 - placed
 - paid
 - delivered
 - returned
 product:
 type: string
 format: UUID
 quantity:
 type: integer
From the Order schema in listing 6.10, we know that the internal order model has two
properties that were missing from the PlaceOrder schema in listing 6.9: id and status.
Because PlaceOrder doesn’t ban additional properties, a threat actor can use this to
send the following request:
POST /orders
'{"product": "3598abeb-2f93-4f3f-a14b-103f27c2c040", \
"quantity": 1, "status": "paid"}'
As you can see, the flexible model in listing 6.9 allows threat actors to manipulate the
state of their orders, allowing them to bypass payments, obtain refunds for orders they
haven’t paid for, and do much more. Why is PlaceOrder in listing 6.9 vulnerable to this
type of attack, and what can we do about it? To understand this vulnerability, we must
understand the nature of schemas in OpenAPI, the standard we use to describe REST
APIs.
NOTE
The discussion in this section goes into the technical details of JSON
Schema and OpenAPI. If you’re not familiar with how JSON Schema and
Listing 6.10
Response payload for POST /orders
6.4
Flexible schemas
OpenAPI work, see chapter 5 of my book Microservice APIs (Manning, 2022)
for a quick introduction. For an in-depth explanation of how OpenAPI and
JSON Schema work, check out Designing APIs with Swagger and OpenAPI by
Joshua S. Ponelat and Lukas L. Rosenstock (Manning, 2022).
OpenAPI is built on top of JSON Schema, which is a standard for describing data
models. When we describe a data model in OpenAPI, as in listing 6.9, we’re using
JSON Schema syntax. As you see in that listing, JSON Schema allows us to specify the
type of the data model (object type in that case), enumerate its properties, and indicate which properties are required. The catch with JSON Schema is that, by default,
models aren’t restrictive—that is, they allow additional properties. That’s why the definition of PlaceOrder in listing 6.9 allows us to include additional fields in the payload,
such as status.
 To make our schemas strict, we must use the keyword additionalProperties or
unevaluatedProperties, as illustrated in figure 6.11. These two keywords control
whether and how our model accepts additional or unknown fields. To ban additional
fields, we set additionalProperties or unevaluatedProperties to false. Alternatively,
we can use additionalProperties and unevaluatedProperties to allow unknown fields
that follow a certain pattern or constraint. To allow additional fields of the string
type, we use "additionalProperties": {"type": "string"}.
 The difference between additionalProperties and unevaluatedProperties is their
application scope. additionalProperties operates within the model’s local scope,
whereas unevaluatedProperties applies across multiple models. This difference is relevant if our models use composition (listing 6.8). Composition allows us to reuse models and combine their definitions via polymorphism, which is JSON Schema’s way of
implementing inheritance [6]. If we use composition, we can’t use additional-
Properties because it applies within the local scope of the model, so setting it to false
would cause contradictions among all the models. To ban unknown fields using
model composition, we use unevaluatedProperties. For simple models that don’t use
composition, setting additionalProperties to false works fine. As figure 6.11 shows,
when we declare additionalProperties within a model, it bans the presence of any
additional properties within instances of that model.
{
 "author": "Jose Haro Peralta",
 "title": "Microservice APIs"
}
{
 "author": "Jose Haro Peralta",
 "title": "Microservice APIs",
 "rating": 1000
}
Book:
 type: object
 properties:
 author:
 type: string
 title:
 type: string
 additionalProperties: false
Figure 6.11
We use 
additionalProperties in a 
model to ban the presence of 
undeclared properties. In this 
example, the only allowed 
properties are author and 
title. Any additional properties, 
such as rating, make the 
payload invalid.

---

## Sección 84: CHAPTER 6 [Entropy: 0.49]

API security by design
To prevent threat actors from manipulating the state of their orders, we set additional-
Properties to false in the PlaceOrder schema, as follows. With this simple change, our
data models allow only declared properties, such as product and quantity, in this case.
Additional properties in the request payload result in a 422 (Unprocessable Content)
response or a 400 (Bad Request) in some implementations.
# file: ch06/6_4_additional_properties_not_allowed.yaml
paths:
 /orders:
 post:
 [...]
components:
 schemas:
 PlaceOrder:
 type: object
 required:
 - product
 - quantity
 properties:
 product:
 type: string
 format: UUID
 quantity:
 type: integer
 additionalProperties: false
6.5
Exposing server-side properties in user input
All APIs have a concept of server-side or read-only properties. As shown in figure 6.12,
when we make a payment on a website, we get back information that allows us to track
the payment, such as its identifier and status. The payment ID and its status are
Listing 6.11
Banning additional properties with additionalProperties
{
 "currency": "USD",
 "amount": 100
}
status code: 201
{
 "id": "ed8a948c-705b-4fd6-b832-a97881367833",
 "currency": "USD",
 "amount": 100,
 "status": "pending"
}
Payments API
Figure 6.12
To make a payment, we indicate the amount and currency. The response from the 
API includes additional information, such as ID and payment status.
6.5
Exposing server-side properties in user input
examples of server-side properties. The server manages them, and users must not be
allowed to modify them. If we expose those properties in user input, threat actors may
be able to manipulate them. Due to the nature of API designs, this vulnerability is
fairly common when we reuse the same data model for input and output. Let’s see
how it works.
 Every operation in an API has a request and a response; usually, requests and
responses carry data in the form of a payload (except some status codes, such as 204
[No Content], that don’t contain a payload). In figure 6.12, to make a payment, we
send our payment details to the server and get back a full representation of the payment. The request and response payloads are different, but contain many common
properties, and for convenience, we may decide to use the same data model to represent both of them, as in the following listing.
# file: ch06/6_5_same_model_input_output.yaml
paths:
 /payments:
 post:
 [...]
components:
 schemas:
 Payment:
 type: object
 required:
 - currency
 - amount
 properties:
 id:
 type: string
 format: uuid
 amount:
 type: number
 currency:
 type: string
 status:
 type: string
 enum:
 - pending
 - accepted
 - rejected
 - settled
The Payment model here has two required properties: currency and amount. We send
this information to the server to make a payment. The optional properties are id and
status, which are server-side properties. By making server-side properties optional, we
can use the same model to represent input and output.
Listing 6.12
Data model for a payment

---

## Sección 85: CHAPTER 6 [Entropy: 0.34]

API security by design
 
# file: ch06/6_5_same_model_input_output.yaml
paths:
 /payments:
 post:
 requestBody:
 required: true
 content:
 application/json:
 schema:
 $ref: '#/components/schemas/Payment'
 responses:
 '201':
 content:
 application/json:
 schema:
 $ref: '#/components/schemas/Payment
This example uses the same model to represent the POST /payments request payload
and its response. By reusing the model for input and output, we save ourselves the
effort of maintaining two different models. This approach seems convenient, and over
the years, I’ve reviewed many an API that uses this design strategy. But it carries a risk:
we’re exposing server-side properties in user input. The expectation is that users will
interact with the API as intended, without using server-side properties in the request
body. When users make a payment, they’re expected to send requests with the following shape:
POST /payments
'{"amount": 100, "currency": "USD"}'
In many cases, our APIs sit behind web and mobile applications, and as we discussed
earlier, organizations often delegate control of how users engage with the API to those
applications. In our payments example, the web or mobile application would ensure
that users send the right type of payload to the server. But nothing prevents threat
actors from going directly to the API and sending payloads like this:
POST /payments
'{"amount": 100, "currency": "USD", "status": "settled"}'
Because we’re using the same payment model to represent request and response schemas, threat actors get access to sensitive server-side properties such as payment status.
In this situation, it comes down to the implementation details of the server and how
we handle payloads like this one at run time. We may reject such payloads with a 422
(Unprocessable Content) status code, or we may use a data transfer object (DTO) pattern that captures only the expected information from the request payload.
 A better approach is to make the API secure by design by having different models
for input and output. In this case, we want to create a different model to represent
request payloads, as shown in the next listing. This time around, we create a
Listing 6.13
Reusing a schema to represent input and output in a payments API
6.6
Designing safe user flows
MakePayment schema to represent the data required to make a payment through the
POST /payments endpoint. MakePayment doesn’t expose server-side properties, making
the API secure by design. We also make the model strict by setting additionalProperties to false. As we learned in section 6.4.2, this prevents threat actors from setting
additional properties in the payload, making the model even safer.
# file: ch06/6_5_different_models_input_output.yaml
paths:
 /payments:
 post:
 requestBody:
 required: true
 content:
 application/json:
 schema:
 $ref: '#/components/schemas/MakePayment'
 responses:
 '201':
 content:
 application/json:
 schema:
 $ref: '#/components/schemas/Payment
components:
 schemas:
 MakePayment:
 type: object
 required:
 - currency
 - amount
 properties:
 amount:
 type: number
 currency:
 type: string
 additionalProperties: false
 Payment:
 [...]
With everything you’ve learned so far in this chapter, you’re in an excellent position
to start creating secure APIs that mitigate the risk of exploits as much as possible. So
far, we’ve focused on constraining user input at the level of individual operations. But
API operations come together into user flows, and often, the design of user flows
introduce flaws that compromise our security posture. In section 6.6, we’ll discuss how
to design secure user flows through our APIs.
6.6
Designing safe user flows
API operations don’t stand alone; we use them in the context of a user journey or
flow. We use APIs to buy items online, book rides, buy concert tickets, and so on.
These are all examples of user or business flows. According to Imperva’s 2024 State of
Listing 6.14
Data model for a payment

---

## Sección 86: CHAPTER 6 [Entropy: 0.265]

API security by design
API Security Report, the largest share of API attacks (27%) target sensitive business
flows [7]. Sensitive business flows are a growing area of concern in API security. We
are only starting to understand how to protect and monitor such flows, and much
work remains to be done in this field.
 In chapter 4, we learned to protect sensitive business flows by using CAPTCHA
challenges, rate-limiting requests, and other strategies. In this section, we’ll turn our
attention to design. The questions we’ll try to answer are
How do we design business flows that are less likely to be abused?
How do we document, enforce, and monitor such flows?
I’ll answer these questions by proposing a model that uses elements of API design,
authentication, and observability. This model is technology agnostic, and I’ve left
implementation details out of the discussion to make the model applicable to a wide
variety of scenarios. When implementing the measures discussed in this section, evaluate carefully how well they fit your particular needs and the constraints of your infrastructure and technology stack.
 Let’s begin by analyzing how user flow design affects our API security posture by
using the example of an e-commerce application. As illustrated in figure 6.13, buying
a product on an e-commerce site like Amazon typically involves a few steps:
Browse the online catalog for the product we’re looking for.
Check offers from different sellers, comparing product specifications and customer reviews.
Add the products we want to buy to our cart.
Proceed to checkout, apply discount codes if we have any, and make a payment.
Figure 6.13
When a customer buys products from an e-commerce website, the web application guides the 
customer through the desired journey, from browsing the product catalog to checking out.
Every step in this user flow connects to one or multiple API operations. Landing on
the catalog home page, for example, triggers a request to the GET /catalog endpoint,
and adding items to the cart triggers a request to the POST /carts endpoint. A customer using our website will follow all the steps in figure 6.13, and the application’s
user interface (UI) will guide them through that journey. Because the UI controls
how a user interacts with our website, it helps us enforce a certain flow.
GET /catalog
GET /products/51
POST /carts
{...}
POST /carts/2501
{...}
Browse product
catalog.
Check product
details.
Add product
to basket.
Check out and pay.
6.6
Designing safe user flows
 A user who goes directly to the API, however, can skip steps in this flow. As shown
in figure 6.14, if a user already knows the ID of a product, they can go straight to step
3 by sending a request to the POST /carts endpoint. From a security point of view, we
need to decide whether to allow this action.
Figure 6.14
By going directly to the API, a threat actor can jump steps in the user journey and go 
straight to adding items to their cart.
Figure 6.15 shows a threat model for the user flow in figure 6.14. It’s clear that by
allowing users to skip steps in the flow when going directly to the API, we’re opening
our application to abuse. In this case, threat actors can exploit the flow in figure 6.14
to buy out the whole stock of a product and resell it at a higher price using automated
bots. As we learned in chapter 4, this practice is known as scalping, and it results in
unhappy customers.
Figure 6.15
By skipping steps in the user journey, threat actors can use automation to launch scalping 
attacks against our e-commerce site and buy out the whole stock of a product ahead of real customers.
Browse product
catalog.
Check product
details.
Add product
to basket.
Check out and pay.
GET /catalog
GET /products/51
POST /carts
{...}
POST /carts/2501
{...}
POST /carts
{"product_id": 51, ...}
Add product
to basket.
Check out and pay.
POST /carts
{...}
POST /carts/2501
{...}
POST /carts
{"product_id": 51, ...}
POST /carts
{"product_id": 51, ...}
POST /carts
{"product_id": 51, ...}
POST /carts
{"product_id": 51, ...}
POST /carts
{"product_id": 51, ...}

---

## Sección 87: CHAPTER 6 [Entropy: 0.769]

API security by design
Nobody wants unhappy customers, so how do we prevent this type of abuse against the
API? How do we tell a scalper bot from a legitimate customer when a request arrives in
our server? The first step is identifying our objective. In this case, we want to give human
users a fighting chance against the bots. We won’t get rid of the bots completely; let’s be
clear about that. But we can force the bots to behave like humans, and at that point, it
may not be worthwhile for threat actors to run bots against our site anymore.
 A key difference between legitimate customers and bots is the flows they follow.
Customers will follow the flow in figure 6.13 because that flow is enforced by the UI.
Bots, on the other hand, take shortcuts and follow the flow in figure 6.14. Also,
human customers will take a few seconds to move from one step to the next, whereas
bots complete the whole flow in microseconds. The actionable points are
Enforce a specific flow in the API.
Track the latency between steps.
How do we enforce user flows in the API? The first step is formally describing the
desired user flow. To help us describe user flows through our APIs, the OpenAPI
Initiative launched the Arazzo Specification (https://github.com/OAI/Arazzo
-Specification). Arazzo’s mission is to help users understand how to use an API. Many
APIs contain hundreds of endpoints, and it’s not clear what sequence of steps users
need to follow to accomplish certain goals. Arazzo fills this gap.
NOTE
The Arazzo Specification is a new standard developed by the OpenAPI
initiative to help organizations describe the user flows that their APIs support.
You can find examples of documenting user flows in Arazzo’s official GitHub
repository (https://mng.bz/Qwpe). To learn more about Arazzo, check out
the official documentation [8] and Frank Kilcommins’ “The Arazzo Specification” [9]. Kilcommins is Arazzo’s lead developer and API evangelist at
SmartBear.
By helping us describe user flows, Arazzo can help us enforce them. Suppose we want
to ensure that users go through the following steps when interacting with the API:
User lands on product detail page > GET /products/{product_id}.
User adds products to the cart > POST /carts.
User calculates price > POST /carts/{id}/price.
User selects a delivery slot > POST /carts/{id}/delivery-slot.
User pays > POST /carts/{id}/payment.
Listing 6.15 shows how we use Arazzo to document this flow. A flow can consist of
steps from multiple API specifications, and we list those specifications in the source-
Descriptions field. In the workflows field, we list the steps users must perform in
order. Every step has an ID (workflowId) and an operationId. The operationId corresponds to the endpoint’s operation ID in the OpenAPI specification. In each step, we
specify the required input parameters, the successful responses, and (if applicable)
how the response from one operation feeds information to the next. The create-cart
6.6
Designing safe user flows
step, for example, returns a cart_id that we can replace in the input parameter for
the calculate-price operation.
# file: ch06/6_6_payment_flow.yaml
arazzo: 1.0.0
info:
 title: Checkout flow
 version: 1.0.0
sourceDescriptions:
 - name: orders
 url: ./orders.yaml
 type: openapi
workflows:
 - workflowId: checkout
 steps:
 - stepId: product-detail
 operationId: product-detail
 parameters:
 - name: product_id
 in: path
 successCriteria:
 - condition: $statusCode == 200
 - stepId: create-cart
 operationId: create-cart
 parameters:
 - name: product_id
 in: body
 successCriteria:
 - condition: $statusCode == 201
 outputs:
 cart_id: $response.body.id
 - stepId: calculate-price
 operationId: calculate-price
 parameters:
 - name: cart_id
 in: path
 value: $steps.create-cart.outputs.cart_id
 successCriteria:
 - condition: $statusCode == 200
 - stepId: delivery-slot
 operationId: book-delivery-slot
 parameters:
 - name: cart_id
 in: path
 value: $steps.create-cart.outputs.cart_id
 successCriteria:
 - condition: $statusCode == 200
 - stepId: payment
 operationId: make-payment
 parameters:
 - name: cart_id
 in: path
Listing 6.15
Data model for a payment

---

## Sección 88: CHAPTER 6 [Entropy: 0.316]

API security by design
 value: $steps.create-cart.outputs.cart_id
 successCriteria:
 - condition: $statusCode == 201
 outputs:
 payment_id: $response.body.id
 outputs:
 payment_id: $steps.payment.outputs.payment_id
Now that we have a formally described flow, we can enforce it in the API. Because this
business flow is highly sensitive, we’ll require authentication in all the steps. This
approach rules out attacks from unauthenticated bots and makes it easier for us to
track user behavior. Use a tracker, such as a session-based flow tracking cookie, to
monitor user interactions throughout the flow, and ensure that users can have only
one active tracker session at a time. Combine this with detailed logs on user activity
throughout the flow to detect malicious behavior, as explained in chapter 11.
 When we talk about enforcing this flow, we don’t mean that we expect users to go
through all those steps without interruptions or deviations. Legitimate users frequently deviate from the expected flow. As illustrated in figure 6.16, a user may add a
product to the cart, check another page of the website unrelated to checkout flow,
and finally proceed to payment. This flow is perfectly acceptable. In fact, a bit of randomness in the user flow, such as this one, is a good indicator that the requests are not
coming from a bot. Figure 6.16 illustrates how to capture the steps taken by the user
in their journey through our API in a flow tracker. Every time the user hits an API endpoint, we record the step in the flow tracker.
Browse product
catalog.
Check product
details.
Add product
to basket.
GET /catalog
GET /products/51
POST /carts
{...}
Check other
product details.
Check out and pay.
POST /carts/2501
{...}
Check other
product details.
GET /products/54
Check terms
and conditions.
GET /terms-conditions
GET /catalog
GET /products/51
POST /carts
{...}
GET /products/54
GET /terms-conditions
POST /carts/2501
{...}
User flow tracker
GET /products/63
GET /products/63
Figure 6.16
Real user interactions with our API follow the expected flow, but they 
may include some deviation. In this diagram, a customer takes a few steps outside 
the expected flow, such as checking the terms and conditions and additional product 
detail pages. We capture the user journey in a flow tracker.
Summary
We want to enforce flows by answering two questions:
When a user calculates the price, did they add a product to the cart previously?
Did the user check the product page before that?
In other words, from step 2 onward, to go through a step in the flow, the user must
have gone through the preceding step. We also want to track the time it takes the user
to move from one step to the next. Human users are likely to move in seconds,
whereas bots move in milliseconds. Do your own research to determine reasonable
values for your own website, and bear in mind that these values are likely to change
over time. Finally, when the user completes the flow, we reset the tracker.
 Eventually, bots will catch up with expected user behavior, following the right flow
with the expected time latencies between steps. This is not a bad thing, and it doesn’t
mean that you’ve lost the war to the bots. It means that you’ve obliterated the bots and
forced them to behave like humans. It means that your legitimate human users stand
a fighting chance of using your application the way it’s meant to. You can add more
antibot protection measures, such as CAPTCHAs to critical steps of the flow. Because
the flow is authenticated, you know who’s done what, and you can use this information to build a risk profile of every user. In highly sensitive flows, you can combine the
measures described in this section with nonrepudiation methods, such as mutual
Transport Layer Security (mTLS) (chapter 7) and message signing (chapter 10).
 The illustration in figure 6.16 is implementation agnostic and can be used in multiple ways. In chapter 11, you’ll learn tips for implementing an observability solution
tailored to your flow-tracking needs. For now, review the user flow designs of your
APIs, and document the expected interactions using the Arazzo Specification. Make
sure to apply all the constraints and mitigations discussed in this chapter to every endpoint. We’ll use all this information in chapter 12 to ensure that the implementation
is secure and good to go.
Summary
Vulnerable API design refers to vulnerabilities that an API has by design. It
includes predictable identifiers, improper pagination, and unconstrained user
input. Threat actors exploit design vulnerabilities to send malicious requests
that look legitimate. Because they look legitimate, such attacks are difficult to
identify and trace.
Predictable resource identifiers, like autoincrementing integer IDs, give threat
actors a pattern to scan our server for resources. To prevent it, mask the value of
those identifiers or use a different type of identifier in your data source.
Unbound pagination parameters allow threat actors to cause unexpected
behavior in our system and request large amounts of items, putting pressure on
our servers. To prevent it, constrain pagination parameters.
Unconstrained string parameters allow threat actors to execute large-payload,
schema-enumeration and SQL injection attacks. To mitigate this risk, constrain
strings with enumerations, and parameterize database queries.

---

## Sección 89: CHAPTER 6 [Entropy: 0.25]

API security by design
Representing multiple models under the same schema with optional properties
opens the door to data corruption attacks. To prevent them, represent different
data models with different schemas.
Allowing additional properties in request payloads allows threat actors to perform mass-assignment attacks. To prevent them, make schemas strict by setting
additionalProperties or unevaluatedProperties to false.
Using the same schema to represent input and output allows threat actors to
override sensitive properties in our system. To prevent it, define different schemas for input and output.
APIs expose business flows that allow users to buy items online, book rides, and
so on. We say that such flows are vulnerable when threat actors can abuse them
to produce undesired outcomes for our business. To mitigate the risk of businessflow abuse, we enforce the flow through the API and track API interactions.
The Arazzo Specification is a robust standard for describing API flows. It allows
us to describe the steps a user must follow to complete a flow and the relationships among the steps. By documenting our flows with Arazzo, we make it easier
to enforce such flows through the API.
API authorization
and authentication
In August 2024, cybersecurity firm Bitdefender revealed that Solarman, one of the
world’s largest photovoltaic monitoring and management platforms, was vulnerable to account takeover. By gaining access to other user accounts, threat actors
could steal personal data and disrupt the supply of electricity [1, 2]. Solarman
This chapter covers
Understanding the role of authentication and 
authorization in API security
Following best practices for working with JSON 
Web Tokens
Understanding Open Authorization and when to 
use each OAuth flow
Hardening security with sender-constrained 
tokens
Securing user identities with OpenID Connect
Using role-based access controls to define sets 
of permissions

---

## Sección 90: CHAPTER 7 [Entropy: 0.334]

API authorization and authentication
exposes APIs that allow manufacturers of photovoltaic monitoring devices to log their
data. According to Bitdefender’s findings, Solarman’s API failed to validate access
tokens correctly, allowing threat actors to forge tokens and impersonate other users.
 The Solarman story brings up a recurrent theme in the API security space: authentication and authorization are hard. Authentication is the process of verifying user identity, and authorization is the process of validating access to a resource or operation. As
you’ll learn in this chapter, there are different types of access controls, such as userbased and role-based. But before we can authorize user access, we need to know who
the users are, which is where authentication comes into play.
 In this chapter, you’ll deep dive into the standards and protocols most commonly
used in API authentication and authorization and learn to use them correctly to prevent data breaches like Solarman’s. You’ll learn best practices and recommendations
for managing user identities, authenticating users, managing their permissions, and
implementing robust access controls. In chapter 8, you’ll see practical coding examples of everything you’ll learn in this chapter.
 Authentication and authorization are the fundamental tenets of API security. If we
fail to put together a robust process for managing and verifying user identities and for
validating their access to our APIs, threat actors will be able to hijack user accounts
and steal their data. In previous chapters, I spoke about the importance of constraining user input, validating and sanitizing data, parameterizing database queries, and
more. None of those security measures will protect us if we fail to authenticate users
and enforce access controls correctly in the first place.
7.1
Authentication vs. authorization
Authentication and authorization are the first line of defense in an API. They are also
the pillars of our security model because all our identity-based access controls build
on our authentication and authorization processes. As we saw in the Solarman example, a simple mistake in our authorization layer can overturn our entire security
model, so it is crucial that we understand well how authentication and authorization
work and that we implement them correctly. In this section, we begin this effort by
learning the difference between authentication and authorization and analyzing the
roles they play in API security.
 Let’s begin by defining authentication and authorization. Authentication is the process of verifying an identity, and authorization is the process of validating that the identity has access to a certain resource or operation. The use of the word identity in this
definition is intentional. API access can be granted to users and nonhuman identities
alike. Nonhuman identities represent things like applications, services, and devices.
We use nonhuman identities to enable machine-to-machine communication, thirdparty API integrations, and automation tasks that rely on APIs.
DEFINITION
An access token is a special element in an API request that proves
that an identity has access to the API. Access tokens come in various forms
7.1
Authentication vs. authorization
and shapes, from opaque tokens to structured tokens such as JSON Web
Tokens (see section 7.2).
Most APIs implement authentication and authorization with access tokens, but that’s
not the only way. In the real world, many APIs also use API keys, cookies, mutual
Transport Layer Security (mTLS), and Hash-based Message-Authentication Code
(HMAC) authentication. Here’s a quick overview:
Access tokens—Generally short-lived tokens that can be opaque or structured.
API keys—Typically used with nonhuman identities and generally valid for a longer period, such as weeks or months. API keys must expire at some point, and
your users must be allowed to rotate them.
Cookies—Typically used with web applications and can include opaque or structured tokens.
mTLS—Uses both the server’s and the client’s certificates to verify both identities during the TLS handshake. In this case, each party encrypts traffic with its
own certificate to prove its authenticity. This method is commonly used in
enterprise contexts to authenticate nonhuman identities such as services,
accounts, and applications (see section 7.5.1).
HMAC—Uses a shared secret key between client and server along with a hash
function like SHA-256 to produce a digest based on elements of the API
request, such as the URL, payload, and headers. The digest is used to authenticate the request.
A less common but powerful authentication method is the secure remote password (SRP)
protocol, which allows users and clients to authenticate without sending their password
to the authorization server. Instead, a user sends proof of their knowledge of a password
using a hash and a salt. The SRP protocol was created at Stanford University, and you
can learn more about it at http://srp.stanford.edu/project.html. If you’re interested in
using this authentication method, you can use providers like Amazon Web Services’
(AWS) Cognito, which implements SRP [3]. As illustrated in figure 7.1, authentication
involves the exchange of credentials, typically in return for an access token.
 When the user or nonhuman identity gets hold of the access token, it sends the
token to our API to prove that it has access to it. The API checks whether the token is
valid and if the identity has access to the requested resource or operation. That’s
authorization. As illustrated in figure 7.1, the authorization process has two parts:
Verify that the token is valid.
Check whether the user is allowed to access the requested resource.
To validate the token in step 1, we check whether it comes in the right format, has
expired, has a valid signature, and so on. I’ll talk more about token validation in section 7.2. The second step involves validating that the user has access to the API,
belongs to the required user group or role, has the right access scopes, and is authorized to perform the requested operation on a given resource.

---

## Sección 91: CHAPTER 7 [Entropy: 0.346]

API authorization and authentication
 
Figure 7.1
During authentication, users exchange their credentials for an access token. During authorization, the 
API checks whether the access token is valid and the user has access to the requested resources.
Imagine a healthcare application in which patients can request appointments and communicate with their doctors, receptionists can manage the appointments, and doctors
can access patient health records. Patients, receptionists, and doctors represent different user groups or roles with different levels of permissions and access scopes.
 To access a patient’s records, a doctor must log in and obtain an access token.
When the request arrives in the API server, the API must check whether the access
token is valid, whether the user belongs to the doctors’ user group or role, and
whether the doctor is allowed to access the records of that particular patient. Similarly, the API must check whether a user belongs to the patient group or role before it
allows them to request appointments and communicate with their doctors. The API
must also check whether a user belongs to the receptionist group or role before it
allows them to manage patient appointments.
 This type of access validation must be done on every request, and it represents our
first line of defense against threat actors. In the rest of the chapter, we break down the
process of authenticating users, authorizing their requests, and validating their access
in more detail.
7.2
Understanding JSON Web Tokens
The most common type of token used to authorize API requests is the JSON Web
Token (JWT, pronounced “jot”) standard, a URL-safe representation format for JSON
objects. It was proposed in a 2012 Internet Engineering Task Force (IETF) draft [4]
and consolidated in 2015 into Request for Comment (RFC) 7519 [5].
Identity server
POST /login
{"username": ..., "password": ...}
{"access_token: 5d411a20"}
GET /payments
-H 'Authorization: Bearer 5d411a20'
Token validation
User access validation
Has access to the API
Belongs to the right
role/group
 Is authorized to access the
requested resource
API
Authentication
Authorization
7.2
Understanding JSON Web Tokens
7.2.1
JWTs defined
JWTs are JSON objects that contain information about a user. They tell us, for example, what APIs the user has access to, what user group or role they belong to, what
access scopes they have, and what their identifier is. We call the information contained in those JSON objects claims.
 Functionally, we distinguish between two main types of JWTs: ID tokens and access
tokens. We use ID tokens in the context of OpenID Connect (see section 7.6) when
the token’s subject is a human identity. ID tokens contain personal details (aka
claims) about the user, such as their personal name, email address, date of birth, and
so on. Access tokens contain claims about the right of a user or a nonhuman identity
to access an API. This distinction is important. ID tokens carry user-identifying information; they don’t prove their right to access an API, so you must never use them to
validate access to an operation or resource. To validate access to an API, we use access
tokens. Next, let’s see what JWTs look like.
7.2.2
Structure and representation of JWTs
JWTs contain three elements: a header, a payload, and a signature. As illustrated in figure 7.2, a JWT is the result of concatenating the base64url encoding of each element,
using dots as the separator.
DEFINITION
Base64url encoding is a type of base64 encoding that is safe to use
in URLs. Normal Base64 encoding uses characters such as +, /, and =, which
have specific meanings in URLs and filesystems and therefore aren’t URL
safe. Such characters are typically percentage encoded into a URL. The +
character, for example, becomes %2B. This conversion, however, would make
Base64-encoded strings unnecessarily long in URLs. Base64url encoding
solves this problem by replacing the + and / characters with – and _, respectively, and omitting the = character.
Figure 7.2
To produce a JWT, we base64url encode the header, payload, and signature, and we join them with 
dots as separators.
base64urlencode
base64urlencode
base64urlencode
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiO
iJodHRwczovL2F1dGguYXBpdGhyZWF0cy5jb20vIiw
ic3ViIjoiYjg5NmZmM2EiLCJhdWQiOiJodHRwczovL2
FwaXRocmVhdHMuY29tIiwiZXhwIjoxODIzNDA4Mjc5
LCJuYmYiOjE4MjMzMjE4NzksImlhdCI6MTgyMzMxO
DI3OSwianRpIjoiODczMTM3ZjI2ZThkIn0.VabVsrzzR
3BfxOc3ge61cI_w2c6SeMw1Qosr5XvyTGA
{
 "typ": "JWT",
 "alg": "HS256"
}
{
 "iss": "https://auth.apithreats.com/",
 "sub": "b896ff3a",
 "aud": "https://apithreats.com",
 "iat": 1823318279,
 "exp": 1823408279,
 "nbf": 1823321879,
 "jti": "873137f26e8d"
}
Payload (claims)
Signature
Header
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9
VabVsrzzR3BfxOc3ge61cI_w2c6SeMw1Qosr5XvyTGA
eyJpc3MiOiJodHRwczovL2F1dGguYXBpdGhyZWF0cy
5jb20vIiwic3ViIjoiYjg5NmZmM2EiLCJhdWQiOiJodHRw
czovL2FwaXRocmVhdHMuY29tIiwiZXhwIjoxODIzNDA
4Mjc5LCJuYmYiOjE4MjMzMjE4NzksImlhdCI6MTgyMz
MxODI3OSwianRpIjoiODczMTM3ZjI2ZThkIn0
.
.

---

## Sección 92: CHAPTER 7 [Entropy: 0.28]

API authorization and authentication
The JWT header is known as the JSON Object Signing and Encryption (JOSE) header
[6]. The JOSE header contains metadata about the token, such as the algorithm and
the key used to sign it. The most commonly used parameters in the JOSE header are
typ, alg, and kid, as shown in listing 7.1. Let’s see what they mean:

typ—Media type. In this case, it tells us that this token is a JWT.

alg—Type of algorithm used to sign the token. As we’ll see later in this section,
we can choose among various types of algorithms when we sign a JWT.

kid—ID of the key or secret used to sign the token.
As you’ll learn in chapter 8, we validate token signatures by selecting the right algorithm and signing key, and we collect this information from the alg and kid fields in
the JWT header.
{
 "typ": "JWT",
 "alg": "RS256",
 "kid": "080E8CtRFAnnLlgK3dk8Y"
}
The next element in the JWT is the payload. The payload contains claims about the
token’s subject, which can be a user or a nonhuman identity such as a service. In the
case of ID tokens, the payload contains identifying information about the user,
whereas access token payloads contain claims about the right of a user to access an
API. I’ll talk more about ID tokens in section 7.6 and focus on access tokens here.
 An access token payload contains all the necessary claims for a user to prove that
they have access to an API. RFC 7519 [5] defines seven reserved or registered claims:

iss (issuer)—Identifies the authorization server that issued the token.

sub (subject)—Identifies the subject to which the token belongs. The subject can
be a human identity, such as a user, or a nonhuman identity, such as a machineto-machine client. All the claims in the token apply exclusively to this subject.

aud (audience)—Identifies the API to which the token provides access.

exp (expiration)—When the token expires.

nbf (not before)—A timestamp before which the token isn’t valid.

iat (issued at time)—When the token was issued.

jti (JWT ID)—A unique identifier for the token.
Registered claims aren’t mandatory, which means that we are free to issue tokens without them. This set of claims is well understood in the industry, and it is best practice to
include it in our tokens because it improves their interoperability, making them easier
to use in integrations with other systems right out of the box. The JWT ecosystem is
built around RFC 7519 [5], so standard JWT libraries know how to validate tokens
with registered claims. Some popular API products, such as API gateways (see chapter
Listing 7.1
Example JOSE header
7.2
Understanding JSON Web Tokens
9), support JWT authentication and can handle tokens with registered claims too. Following is an example of a JWT payload that uses all the reserved claims.
{
 "iss": "https://auth.apithreats.com/",
 "sub": "b896ff3a",
 "aud": "https://apithreats.com",
 "exp": "1823408279",
 "nbf": "1823321879",
 "iat": "1823318279",
 "jti": "873137f26e8d"
}
In addition to the reserved claims, we can include custom claims in JWTs. Custom
claims allow us to be more specific about the access rights of the user, such as by specifying the user’s role or group, organization, and similar attributes. A common use
case is including the user role in the token for role-based access controls (section 7.7).
 When you’re designing custom claims for your tokens, consider carefully what type
of information you’re leaking through them, and make sure that you don’t include
sensitive user data, such as personal names and emails. The user identifier is already
available under the standard sub claim, and if you need additional information about
the user, you can obtain that data by querying the identity service directly. As we’ll see
in section 7.6, most OpenID providers expose a UserInfo endpoint where we can
query user details.
 What is the risk of including sensitive data in access tokens? As illustrated in figure
7.3, access tokens are included in requests to the API. If a user connects to an API
using an insecure connection on a public network, they may become vulnerable to a
Listing 7.2
Example JWT payload with reserved claims
Public network
access point
Internet
Network packets
Network packets
GET /payments
-H 'Authorization: Bearer 5d411a20'
GET /payments
-H 'Authorization: Bearer 5d411a20'
Figure 7.3
If a user connects to a 
website using an insecure connection on 
a public network, threat actors may be 
able to hijack their access tokens by 
capturing network packets using a packet 
analyzer such as Wireshark.

---

## Sección 93: CHAPTER 7 [Entropy: 0.334]

API authorization and authentication
man-in-the-middle attack or eavesdropping, making their access tokens and the sensitive data contained in them accessible to threat actors. Access tokens can also be
hijacked if our website has misconfigured cross-origin resource sharing (CORS) headers, is vulnerable to cross-site scripting (XSS), and other factors. If the tokens contain
user-sensitive information, such information becomes available to threat actors that
manage to hijack other users’ tokens
 The final element of a JWT is the signature. The process of signing tokens is
described in RFC 7515 [6]. The signature is the result of applying the signing algorithm
over the JWT’s header and payload, so it conveys the integrity and authenticity of the
token (i.e., the token hasn’t been tampered with). We produce the JWT signature by
applying a signing algorithm to the base64url-encoded value of the header and the payload, separated by a dot. The token header and payload in listing 7.3, for example,
results in the following string when we base64url encode and join them with a dot:
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJodHRwczovL2FwaXRocmVhdHMuZX
➥UuYXV0aDAuY29tLyIsInN1YiI6ImI4OTZmZjNhIiwiYXVkIjoiaHR0cHM6Ly9hcGl0aHJlY
➥XRzLmNvbSIsImV4cCI6IjE4MjM0MDgyNzkiLCJuYmYiOiIxODIzMzIxODc5IiwiaWF0Ijoi
➥MTgyMzMxODI3OSIsImp0aSI6Ijg3MzEzN2YyNmU4ZCJ9
This string becomes the input to the signing function, also known as the JWS signing
input. The alg parameter in the listing is set to HS256, which means that the token is
signed with a hashing function (HMAC-SHA256). HMAC uses a secret key to produce
a message authentication code, which we use as the token’s signature. Using password
as the secret key, we obtain the following signature: -WISLJq1jkQw1vY4IVaAKxLAL_
hxoFnT9oLfBpgPvzA. In chapter 8, you’ll see practical examples of producing tokens.
# Header
{
 "typ": "JWT",
 "alg": "HS256"
}
# Payload
{
 "iss": "https://auth.apithreats.com/",
 "sub": "b896ff3a",
 "aud": "https://apithreats.com",
 "exp": "1823408279",
 "nbf": "1823321879",
 "iat": "1823318279",
 "jti": "873137f26e8d"
}
We can use a wide range of algorithms to sign JWTs. The full list of signing algorithms
and how they work is documented in RFC 7518 [7]. The Internet Assigned Numbers
Authority (IANA) also keeps a list of the available choices [8], with recommendations
on which algorithms are required for libraries implementing JOSE.
Listing 7.3
Example JWT payload with reserved claims
7.2
Understanding JSON Web Tokens
Help—I don’t want to expose my API’s JWT claims
As you’ve learned in this section, JWTs are base64url-encoded JSON objects, which
means that anyone who gets their hands on a token can inspect its contents (see

---

## Sección 94: chapter 8). But what if the claims are so sensitive that you don’t want anyone, including [Entropy: 0.25]

their legitimate owners, to be able to inspect them? In that case, you encrypt the token.
RFC 7516,a by M. Jones and J. Hildebrand, describes a standard method for encrypting sensitive content, including access tokens with sensitive claims. In cryptography,
we call the message to be encrypted the plaintext. JWE uses authenticated encryption, which allows us to encrypt a message and protect the integrity of additional
data. Additional authenticated data is data that we don’t want to encrypt but want to
protect from modification by a malicious party. Authenticated encryption produces a
ciphertext (the encrypted plaintext) and an authentication tag. We use the authentication tag to validate the integrity of the ciphertext and the additional data.
JWEs allow us to transmit encrypted data in a structured way that the receiving party
can understand. They contain the following elements:
JOSE protected header—Describes the encryption applied to the plaintext
and, optionally, other properties of the JWE. The algorithms included in the
header must be chosen from the list of algorithms listed in sections 4.1 and
5.1 of RFC 7518 [7]. The JOSE header represents the additional data that we
use in the authenticated encryption process and is integrity protected by the
authentication tag.
Encrypted key—The content encryption key used to encrypt the plaintext.
Initialization vector—A random value used to set the initial state of the
encryption algorithm.
Ciphertext—The result of encrypting the plaintext.
Authentication tag—A value produced by the encryption algorithm to prove the
integrity of the JWE (i.e., to show that neither the ciphertext nor the plaintext
was modified).
The JWE’s JOSE header contains at least two fields:

alg—Identifies the algorithm used to encrypt the cryptographic encryption
key

enc—Identifies the algorithm used to produce the ciphertext and the authentication tag
A JWE JOSE header might look like this:
{"alg":"RSA-OAEP","enc":"A256GCM"}
This header indicates that the encryption key is encrypted using the RSAES-OAEP
(RSA with optimal asymmetric encryption padding) algorithm and that the ciphertext
and the authentication tag were produced using the A256GCM (AES-256 with Galois/
Counter Mode) algorithm.
a Jones, M., and Hildebrand, J. “JSON Web Encryption (JWE).” RFC 7516. https://www.rfc-editor.org/
 rfc/rfc7516.html.

---

## Sección 95: CHAPTER 7 [Entropy: 0.59]

API authorization and authentication
The most widely supported JWT signing algorithms are HS256 and RS256. HS256
stands for HMAC with SHA-256. HMAC is a message authentication code algorithm
that uses a hash function and a secret key. HS256 uses SHA-256 as the hashing algorithm and produces a code (the C in HMAC) that verifies the integrity of the message
(proves that the message is authentic and has not been tampered with). The strength
of the signature is a function of the strength of the secret key and the underlying hash
function. Short secret keys make the signature vulnerable to brute-force attacks.
 We use the output of the HS256 algorithm as the signature for the JWT. HS256 is a
symmetric signing algorithm, which means we use the same secret key to produce the
signature and to validate it. This increases the risk of leakage because the key is available in multiple places and is always necessary for validation. For all those reasons, it’s
better practice to use asymmetric encryption algorithms such as RS256.
 RS256 uses the Rivest–Shamir–Adleman (RSA) key-pair cryptosystem’s signature
scheme to sign tokens using a private key, and uses the corresponding public key to
verify the signature. Specifically, RS256 refers to the signature scheme RSASSA-
PKCS1-v1_5, as defined in RFC 3447 [9], using SHA-256 to hash the message. RS256 is
an asymmetric signing algorithm because it uses different keys for signing and
verification.
(continued)
RFC 7516 describes two methods for JWE serialization (i.e., for putting all the preceding information together): compact and JSON serialization. In compact serialization, we base64url encode every element of the JWE and concatenate them using
dots as separators:
Base64url(JOSE header) || '.' ||
Base64url (encrypted key) || '.' ||
Base64url (initialization vector) || '.' ||
Base64url (ciphertext) || '.' ||
Base64url (authentication tag)
If we use JSON serialization, the whole JWE is represented as a JSON data structure
like the following:
{
 "protected":"<the integrity-protected JOSE header>",
 "encrypted_key":"<the encrypted key>",
 "iv":"<the initialization vector>",
 "ciphertext":"<the ciphertext>",
 "tag":"<the authentication tag>"
}
Then the JSON is base64url encoded. To learn more about JWE, check out Scott
Brady’s “Understanding JSON Web Encryption (JWE).”b
b Brady, Scott (2022, August 17). “Understanding JSON web encryption (JWE).” (https://www
 .scottbrady.io/jose/json-web-encryption)
7.3
Understanding Open Authorization
 Despite its popularity, RS256 has some well-known vulnerabilities. In 2006, Daniel
Bleichenbacher demonstrated that incorrect implementations of RSASSA-PKCS1-
v1_5 were vulnerable to signature forgery attacks, and sadly, many implementations
have such vulnerabilities. For that reason, RFC 8725 [10] recommends avoiding
RS256 and instead using improved versions of the algorithm, such as RSAES-OAEP
(RSA with optimal asymmetric encryption padding) and PS256 (probabilistic signature scheme) algorithms, or the elliptic curve digital signature algorithm (ECDSA).
You can learn more about these algorithms in David Wong’s book Real-World Cryptography [11] and in RFC 7518 [7] and RFC 3447 [9].
7.3
Understanding Open Authorization
Now that we understand what JWTs are and how they work, let’s turn our attention to
the process of authorizing user access to our APIs with Open Authorization (OAuth).
OAuth is a protocol for access delegation; it allows us to share information about ourselves with other applications without sharing our passwords. If we’re filling in our
details on a job portal website and want to import our LinkedIn profile, how does the
job portal access our information? As shown in figure 7.4, one option is to share our
LinkedIn credentials with the job portal to let it access LinkedIn on our behalf and
retrieve our profile. This approach is dangerous, though, because it gives the job portal unfettered access to our LinkedIn account.
Figure 7.4
To give the job portal access to her employment history, Susan shares her LinkedIn 
credentials. This is risky because it gives the job portal full access to Susan’s account on LinkedIn.
OAuth was developed to address this problem. To grant access to a third-party application like a job portal to our data on LinkedIn, we want to ensure that access is
Limited to certain data and operations (read our employment history, for
example)
LinkedIn
Job portal
Susan shares her
LinkedIn credentials
with the job portal.
The job portal logs into LinkedIn
using Susan's credentials.
LinkedIn issues Susan’s
access token.
LinkedIn sends the data.
Susan
The job portal accesses
Susan’s employment history
using her access token.
170

---

## Sección 96: CHAPTER 7 [Entropy: 0.319]

API authorization and authentication
Valid for only a limited period
OAuth uses three concepts to implement such restrictions:
Authorization flow—We use this process to authorize an application to access our
data on another website. There are different flows, depending on the type of
application we are authorizing.
Scopes—When requesting access to our data, third-party applications must specify what data and operations they want to access. We call those access permissions scopes.
Access tokens—These tokens give the third-party application access to our data
on another website. Access tokens are valid for a limited period, and access is
constrained to the scopes requested during the authorization flow.
To put this all together, OAuth uses authorization flows. As illustrated in figure 7.5, an
authorization flow is the process by which a third-party application gains access to our
data on another website. Every authorization flow has four important elements:
Authorization server—The server that manages user identities and issues the
access tokens
Resource server—The server that stores user data and controls access to it
Resource owner—The user who owns data on the resource server
Client—The application that is trying to access user data on the resource server
Figure 7.5
OAuth describes flows through which users (resource owners) can authorize applications 
(clients) to access their data in an API (resource server). Every flow begins with an authorization request, 
followed by user login and consent and then by an access token grant.
Authorization 
server
API 
(resource server)
GET /authorize
 ?client_id=0efdad8b
 &response_type=code
 &audience=https://apithreats.com
Client
Login and consent
Client
{"access_token": "0f94d3dbff46"}
GET /payments
Authorization request
Resource owner
7.4
Understanding OAuth flows
We distinguish between confidential clients and public clients. Confidential clients are
applications that can store credentials securely and therefore can use them to authenticate their requests with the authorization server. Public clients are clients whose
source code is exposed to everybody, such as web and mobile applications. Because
the source code is publicly visible, public clients can’t store credentials securely and
therefore can’t authenticate their requests with the authorization server.
 The OAuth specification describes various authorization flows for scenarios with
different requirements and constraints. We have an authorization flow to authorize
machine-to-machine integrations, such as integrations with third-party APIs; another
one to authorize access from a web or mobile application, and so on. All the flows follow the same structure, however. As illustrated in figure 7.5, an OAuth flow consists of
four steps:
Make an authorization request. This step is the initial request in the authorization
flow, in which the client requests access to an API. Typically, it contains details
such as the client ID and the access scopes required to access the API. The
authorization request prompts the user to log in with the identity provider.
Grant consent. After successful login, the user gives consent for the client application to access their data.
Issue an access token. After the consent grant, the authorization server issues the
access token.
Access resources. When the client has obtained the access token, it can access user
data on the resource server by authorizing every request with the access token.
At the beginning of this section, I mentioned that OAuth was developed to address
the problem of sharing data with third-party applications. How is this relevant in the
context of our own APIs? In most cases, OAuth comes to life through OpenID Connect (OIDC), a popular authentication protocol that we’ll explore in detail in section
7.6. As you’ll learn in that section, the recommended way to manage user identities is
to use a standard OIDC implementation, and to do that, you need to understand how
OAuth flows work. Let’s break down the OAuth flows to understand in detail how they
work and when to use them.
7.4
Understanding OAuth flows
The OAuth specification acknowledges different scenarios in which we need to authorize access to an API. Each scenario imposes its own constraints, and OAuth describes
different flows tailored to each situation. The flows supported by the OAuth specification have changed over time. As of OAuth 2.1, this is the current list of supported
flows:
Authorization code flow
Client credentials flow
Device authorization grant
Refresh token flow

---

## Sección 97: CHAPTER 7 [Entropy: 0.319]

API authorization and authentication
OAuth 2.1 also deprecates two flows from the OAuth 2.0 specification:
Implicit flow
Resource owner password flow
The resource owner password flow involves handing user credentials to the third-party
application. In the example of the job portal accessing our LinkedIn profile, this
means handing our LinkedIn username and password to the job portal, which is
unsafe because it gives the third-party application full control of our LinkedIn
account.
 The implicit flow was introduced in OAuth 2.0 to support authorization for singlepage and mobile applications. The biggest flaw in this flow is that it delivers the access
token through the URL, exposing it to unauthorized parties who can hijack it to
impersonate other users.
7.4.1
Authorization code flow
Let’s dive into the flows currently supported by OAuth 2.1. The authorization code
flow consists of the exchange of an authorization code for an access token. This flow is
optimized for confidential clients, such as web servers, where we can store confidential configuration. As illustrated in figure 7.6, this flow uses redirections. It begins by
redirecting the resource owner to the authorization server and ends by redirecting
them back to the application. To carry out such redirections, the client must be able
to interact with the resource owner’s user agent (aka the browser). Therefore, this
flow works well for web applications.
 To illustrate how the flow works, let’s go back to the example of the job portal that
needs to access our LinkedIn profile. As illustrated in figure 7.6, the job portal (client) initiates the authorization process by producing an authorization URL and redirecting the resource owner to it (the authorization request). The authorization
request URL takes the resource owner to LinkedIn (the authorization server), where
they will prove their identity and grant the job portal access to their data.
 The authorization request URL contains the following query parameters:

client_id—The client’s ID.

redirect_uri—A callback URI where the resource owner will be redirected
after logging in and granting access.

response_type—The authorization flow the client wants to use. For the authorization code flow, the value is code.
A fully formed authorization request URL for the authorization code flow looks like
this:
https://auth.example.com/authorize?response_type=code
➥&client_id=s6BhdRkqt3&redirect_uri=https://example.com
7.4
Understanding OAuth flows
 
Figure 7.6
In the authorization code flow, a confidential client such as a web server uses a client ID, a 
client secret, and an authorization code to obtain an access token.
After the resource owner grants the client access to their data, the authorization
server issues an authorization code and sends the user back to the client application,
using the address indicated in the redirect_uri parameter and injecting the authorization code into the URL. At this point, the client application grabs the authorization
code from the URL and exchanges it for an access token with the authorization server.
 The authorization code flow uses a client ID and a client secret when exchanging
the authorization code for an access token to keep the whole transaction safe. The client secret is highly sensitive and must never be exposed to external users. The client ID
is a unique identifier for the client (the job portal, in our example). When the authorization server issues the authorization code, it binds the code to the client ID from the
authorization URL. When the client exchanges the authorization code for an access
token, it must provide the client secret to prove that the request comes from a legitimate source. It’s best practice to make authorization codes for one-time use only.
Authorization
server
API server
The server redirects the resource owner
to log in with the authorization server.
The server requests the user’s
data.
User logs in and grants the
client access to their data.
The authorization server issues a one-time
authorization code that can be exchanged 
for an access token.
The server exchanges the one-time
authorization code for an access token 
using the client ID and secret.
The authorization server issues an
access token.
Web application
3
5
174

---

## Sección 98: CHAPTER 7 [Entropy: 0.478]

API authorization and authentication
DEFINITION
OAuth cross-site resource forgery (CSRF) attacks are attacks in which a
malicious actor steals a user’s access token by exploiting the authorization
code flow’s redirection feature. The threat actor uses a malicious link that initiates the authorization flow on the user’s behalf. If the user has an active session with the authorization server, the login step is skipped, and the user is
immediately redirected to the redirect URL indicated in the malicious link
with the authorization code, which the threat actor’s server exchanges for an
access token. This type of exploit is possible when authorization servers are
vulnerable to open redirect attacks, which occur when they don’t constrain the
values allowed in the redirect_uri parameter.
For additional security, the authorization server may require including a state parameter in the authorization request URL (the first step). The state parameter is an
opaque, unguessable value that is bound to the client’s authorization request, and it
must be included in every request and response of the flow until the final exchange
for the access token. This parameter protects users from access-token hijacking via
CSRF attacks. A fully formed URL with the state parameter looks like this:
https://auth.example.com/authorize?response_type=code
➥&client_id=s6BhdRkqt3&redirect_uri=https://example.com&state=35ce
OAuth 2.1 requires using the authorization code with an additional security mechanism known as proof of key exchange, which helps prevent the hijacking of authorization
code (see section 7.4.2).
7.4.2
Protecting authorization requests with proof of key exchange
The final step of the authorization code flow is the exchange of the authorization
code for an access token. If a threat actor lays their hands on the authorization code,
using a man-in-the-middle attack, a CSRF attack, or another strategy that allows them
to intercept authorization server responses, nothing prevents them from exchanging
the authorization code for an access token before the legitimate user does. Therefore,
the attacker can impersonate the user and gain access to their data.
 How do we prevent such attacks? In other words, how can we improve the flow so
that the authorization server can distinguish between legitimate and spoofed authorization requests? The answer is proof of key exchange.
 RFC 7636 [12] describes a security mechanism known as proof of key exchange
(PKCE, pronounced “pixi”) that helps prevent authorization code interception
attacks by introducing two new request parameters: a code challenge (code_
challenge) and a code verifier (code_verifier). Figure 7.7 illustrates the steps
involved in the PKCE flow.
 Before initiating the authorization flow, the client application produces a code verifier and a code challenge. The code verifier is a high-entropy random value with a minimum of 43 characters and a maximum of 128. The code verifier must be unique in every
authorization request. The client application hashes the code verifier using SHA-256
hashing (S256) to produce the code challenge and then base64url encodes the output for
safe transmission in the URL. The base64url encoding must not include padding.
7.4
Understanding OAuth flows
 
Figure 7.7
PKCE prevents authorization code interception attacks by requiring the 
client to supply a code verifier to prove ownership of the authorization code.
As shown in figure 7.7, the client redirects the resource owner to the authorization
server, including the code challenge and a callback URL in the authorization request
step. A fully formed PKCE authorization request looks like this:
https://auth.example.com/authorize?response_type=code
➥&client_id=s6BhdRkqt3&redirect_uri=https://example.com
➥&code_challenge=E9Melhoa2OwvFrEMTJguCHaoeK1t8URWbuGJSstw-cM
➥&code_challenge_method=S256
In addition to the query parameters discussed in section 7.4.1, the PKCE authorization request contains

code_challenge—The output of base64url encoding of the code verifier’s
hashed value.

code_challenge_method—The function used to hash the code verifier. The only
value currently supported is S256 for SHA-256 hashing.
When the resource owner proves their identity and grants access to the client application, the authorization server redirects the resource owner back to the client
application using the callback URL, including the authorization code in the URL.
Finally, the client exchanges the authorization code for an access token, including the
Authorization
server
API server
API client
Generate code verifier and code challenge.
Authorization request with code challenge
Authorization code response
Authorization code + code verifier
Access token
Request user’s data.
176

---

## Sección 99: CHAPTER 7 [Entropy: 0.28]

API authorization and authentication
code verifier in the request. The authorization server hashes the code verifier using
the method indicated by the client in the authorization request and compares its
value with the code challenge. If the values are the same, it means that the request is
legitimate and responds to the client with an access token.
7.4.3
Client credentials flow
The client credentials flow is designed for machine-to-machine communication. This
flow is suitable for integrations in which the API consumer is a nonhuman identity. In
such situations, the API client often has constraints, such as an inability to use a
browser to perform the complex series of steps described in the authorization code
flow. Here are some use cases for the client credentials flow:
Automations that require an API call, such as needing to call an API during a
continuous integration process
System integrations with third-party APIs to consume functionality such as sending emails, geolocating an address, and processing payments
Integrations between internal services in distributed architectures, such as
microservices
In all these cases, we need to authenticate every request. If you look at the steps
involved in the authorization code flow, however, they certainly don’t look suitable for
machine-to-machine integrations; we can’t expect the API client to interact with a
browser as a human would. How do we authenticate API clients in these scenarios?
This is where the client credentials flow comes in. As shown in figure 7.8, the client
credentials flow is a much simpler flow that involves the direct exchange of credentials
for an access token.
Figure 7.8
In the client credentials flow, a server-side application directly exchanges 
credentials for an access token. If necessary, the resource owner gives consent upon 
registering the client with the authorization server.
Authorization
server
The server-side application
exchanges a secret with the
authorization server to obtain
an access token.
The authorization server
issues the access token.
Server-side
application
API server
Access the API.
3
7.4
Understanding OAuth flows
As illustrated in figure 7.8, the client credentials flow is different from other flows in
that it doesn’t require a browser and there’s no consent step. If a client acts on behalf
of a resource owner, consent is given upon registering the client application with the
authorization server. Suppose that you want to use a service to automate publishing
posts on LinkedIn so you don’t have to spend so much time on social media and can
focus on your work. To do this, you register an application to publish on your behalf
on LinkedIn with a given schedule. The application must obtain authorization every
time it publishes on LinkedIn, but it won’t be able to request your consent on every
authorization request. To satisfy this constraint, you give consent to the application
when you register it, stating that you allow the application to act on your behalf whenever it interacts with LinkedIn.
 Typically, in service-to-service integrations, no consent is involved. When we register a service client with the authorization server, we define its permissions and boundaries, which ensures that each service doesn’t get access to data and operations that
don’t belong in its domain.
7.4.4
Device authorization flow
Have you ever signed in to Netflix or YouTube from a smart TV? If so, you’ve used the
device authorization flow, which is designed for input-constrained devices such as
smart TVs and for agentless devices. Input-constrained means that it’s difficult or unreasonable to ask the user to type their credentials. It would be very challenging to type a
50-plus-character-strong password using a TV remote controller, for example. Agentless
devices are devices that can’t open a browser to follow the typical OAuth flow, including Internet of Things (IoT) devices and printers.
 In such situations, we use the device authorization flow. As illustrated in figure 7.9,
the client application, such as a smart TV, begins by sending an authorization request
to the authorization server. This authorization request includes the client identifier.
Mobile app
Authorization request
Device code
+ User code
+ Verification URL
Device code
+ User code
+ Verification URL
User code 
+ Verification URL
Start device app.
2
Smart TV
User
Authorization
server
4
Access token
Figure 7.9
The device authorization flow is designed for input-constrained devices such as smart TVs. In this case, 
the resource owner logs in and gives consent through an external application, using a user code and a verification 
URL provided by the device.

---

## Sección 100: CHAPTER 7 [Entropy: 0.25]

API authorization and authentication
The authorization server responds by issuing a device code, an end-user code, and a verification URL. Then the device asks the user to visit the verification URL, where they
sign in and input the end-user code to authorize the device’s request. In the meantime,
the device polls the authorization server using the device code and the client identifier
to find out whether the authorization request is complete. When the user grants access,
the authorization server responds to the device with an access token.
TIP
To learn more about the device authorization flow, check out RFC 8628
[13].
7.4.5
Refresh token flow
The refresh token flow is the process by which clients renew their access. Access
tokens have an expiration date, typically within 1 to 24 hours of issuing them, and
when they expire, clients must renew their access using a refresh token. Refresh
tokens are opaque to the client and typically consist of a random sequence of characters. As shown in figure 7.10, refresh tokens are issued with access tokens, and upon
exchange, the client receives a new access token and a new refresh token.
Figure 7.10
The refresh token flow allows clients to renew their access token without having to ask the 
resource owner to log in and give consent all over again.
A special security consideration in the refresh token flow is how to prevent threat
actors from replaying the refresh token in case it’s leaked. To mitigate this risk, the
OAuth 2.1 specification says that authorization servers may rotate refresh tokens on
every access token request, or they may bind them to the client [14]. With the authorization code flow (e.g., a web application), we typically use refresh token rotation. With
machine-to-machine clients that support client authentication, the OAuth 2.1 specification recommends using sender-constrained tokens with methods such as demonstrating proof of possession and mTLS, which we’ll describe in section 7.5.
Authorization
server
API server
SPA
Authorization request 
Access token + refresh token
Request user’s data.
4
Refresh access token.
4
Access token + refresh token
179
7.5
Sender-constrained tokens
 When we rotate refresh tokens, we make them available for one-time use only.
Refresh tokens should be valid for a limited period. There is no typical length of time
for which refresh tokens are valid. Make sure that they are available for a reasonable
period after access token expiration and tailor their expiration to the security needs
of your application. When a refresh token has expired, the client needs to send a new
authorization request to authenticate the resource owner again to obtain new access
and refresh tokens.
7.5
Sender-constrained tokens
One of the most critical security concerns in web security is how to ensure that an
access credential is sent by the right user. When a user logs in to our website, we issue
an access token for them to access our APIs. But what if the token is leaked and falls in
the hands of a malicious actor? Access tokens carry the user’s permissions to access
their data, so without being able to verify that the legitimate owner of the access token
is accessing our API, we’re putting our users at risk. This is where sender-constrained
tokens come in.
 Sender-constrained tokens are tokens bound to their legitimate resource owner. The
OAuth 2.1 specification describes two methods we can use to bind tokens to a user:
demonstrating proof of possession and mutual TLS [15]. Let’s see how that works.
7.5.1
Using mTLS for certificate-bound tokens
Mutual TLS (mTLS) is an authentication method built on top of the TLS protocol. TLS
is the method modern websites use to secure and encrypt communication between a client (such as a browser) and a server. Web servers use asymmetric encryption with TLS
certificates to secure the connection and prove their identity. As shown in figure 7.11,
Server
Certificate Authority
(CA)
Client requests identification.
Server sends certificate
and public key.
Client sends encrypted
session key.
Acknowledgment with
session key
Data is now encrypted
with session key.
Client checks
whether certificate
can be trusted.
2
5
3
Figure 7.11
TLS 
describes the protocol 
that clients (such as 
browsers) and web 
servers follow to prove 
the server’s identity and 
secure the connection. 
We call this process a 
TLS handshake. When 
the browser connects to 
the server, it downloads 
the server’s public key, 
verifies its authenticity, 
and uses it to encrypt 
the requests.

---

## Sección 101: CHAPTER 7 [Entropy: 0.265]

API authorization and authentication
when our browser connects to a website, it downloads the website’s public certificate
and uses that information to verify the server’s identity during the TLS handshake.
 MTLS also involves authentication by the client. As illustrated in figure 7.12, mTLS
requires the client to prove its identity by sending a public certificate to the server
during the TLS handshake. Depending on the arrangement, this certificate could be
issued by the server or by the client. The client proves ownership of the certificate by
signing a message using the certificate’s private key during the TLS handshake’s
CertificateVerify step, shown in figure 7.12.
Figure 7.12
MTLS requires the client (such as a browser) to provide its own 
certificate to verify its identity.
In the context of OAuth, we use mTLS to bind a token to a specific client certificate.
When establishing a connection with an authorization server, the server captures the
details of the client’s certificate. With this information, the authorization server produces a thumbprint of the client’s public certificate and includes it in the access token
using a confirmation claim (cnf), as illustrated in listing 7.4.
DEFINITION
A certificate thumbprint or fingerprint is a unique identifier for digital certificates that we obtain by calculating the SHA-1 digest of the certificate’s DER representation. DER is a standard binary encoding format for
representing data structures, including certificates. To include the certificate
thumbprint in a JWT, we base64url encode its value.
# Header
{
 "typ":"JWT",
 "alg":"RS256",
Listing 7.4
JWT with certificate-thumbprint confirmation method
Server
ClientHello
ServerHello
Server Certificate
ServerKeyExchange
CertificateRequest
ServerHelloDone
Client Certificate
ClientKeyExchange
CertificateVerify
Finished
Application data can now be
exchanged securely.
7.5
Sender-constrained tokens
 }
.
# Payload
{
 "iss": "https://auth.apithreats.com",
 "sub": " 8bda8694",
 "iat": 1816158609,
 "exp": 1816165809,
 "nbf": 1816158609,
 "cnf":{
 "x5t#S256": "bwcK0esc3ACC3DB2Y5_lESsXE8o9ltc05O89jdN-dg2"
 }
}.
SIGNATURE
The cnf claim was introduced in RFC 7800 as a method for including proof of possession of key information within a JWT. RFC 8705 builds on that specification by introducing specific semantics to prove possession of an X.509 certificate through an
x5t#S256 member within the cnf claim. The x5t#S256 member represents the
base64url-encoded value of the certificate’s thumbprint.
NOTE
MTLS for certificate-bound access tokens is documented in RFC 8705
[16]. RFC 8705 builds on TLS specifications 1.2 and 1.3. TLS 1.2 is documented in RFC 5246 [17] and TLS 1.3 in RFC 8446 [18]. RFC 8705 also
builds on RFC 7800 [19] by using the proof-of-possession semantics of the cnf
claim.
When the client sends a request to the resource server, the server must capture details
of the client’s certificate during the TLS handshake. Then it uses that information to
check whether it matches the certificate’s thumbprint in the access token, thereby verifying that the token belongs to the client.
 Despite its benefits, mTLS for certificate-bound tokens is difficult to implement.
Servers must be able to capture details from the client’s certificate at the protocol
level and make them available at the application level, where we validate access
tokens. Because the TLS handshake happens when a client establishes a connection
with a server, we must capture this information before knowing what type of action the
user wants to perform. An easier alternative for binding client certificates to access
tokens was proposed in a recent RFC, as explained in the next section.
7.5.2
Demonstrating proof of possession
Demonstrating proof of possession (DPoP) is a novel method of binding access tokens to a
sender using a sender-generated cryptographic private key. The sender proves possession of the key and entitlement to the access token with a special header signed with a
cryptographic key generated by the sender. Figure 7.13 illustrates how DPoP works.
NOTE
DPoP is documented in RFC 9449 [20].

---

## Sección 102: CHAPTER 7 [Entropy: 0.454]

API authorization and authentication
 
Figure 7.13
DPoP binds the access token to the public key thumbprint of the 
client’s certificate. The client proves ownership of the certificate by including a 
newly signed DPoP token in every request.
As illustrated in figure 7.13, everything begins with the sender’s choosing a signing
algorithm and generating the corresponding signing-key pair. DPoP uses asymmetrical signature algorithms such as RS256. Then the client sends the authorization
request to the authorization server, including the dpop_jkt parameter with the JSON
Web Key (JWK) SHA-256 thumbprint of the DPoP public key, base64url encoded, as
in this example:
GET /authorize?response_type=code&state=xyz
➥&redirect_uri=https%3A%2F%2Fapithreats.com%2Fdocs
➥&code_challenge_method=S256
➥&dpop_jkt=NzbLsXh8uDCcd-6MNwXF4W_7noWXFZAfHkxZsRGC9Xs
NOTE
A JSON Web Key (JWK) is a JSON data structure for representing cryptographic keys. It includes all the information we need to work with those
keys, such as the key type (kty), the x and y coordinates, and curve type (crv).
The JWK specification is documented in RFC 7517 [21]. The method for calculating the thumbprint of a JWK object using a hashing function such as
SHA-256 is described in RFC 7638 [22].
After the user logs in and gives consent for the client, the authorization server issues
an authorization code bound to the public key’s thumbprint. To exchange the authorization code for an access token, the sender must prove possession of the private key
corresponding to the public key’s thumbprint sent earlier. We do this by creating a
special DPoP JWT, signing it with the private key, and including it in the DPoP request
header. As you see in the following listing, a DPoP JWT contains a header, a payload,
and a signature. The listing represents a DPoP token for a token request on a POST
https://auth.apithreats.com/token endpoint.
Authorization
server
Authorization request including
client’s public key’s thumbprint
Authorization code bound to
client’s public key thumbprint
Token request including DPoP
token signed with the client’s
private key
Server issues access token
bound to the client’s
public key.
Self-issued
certificate
API server
Send request to API server,
including the access token and
the DPoP token.
7.5
Sender-constrained tokens
 
# Header
{
 "typ": "dpop+jwt",
 "alg": "ES256",
 "jwk": {
 "kty": "EC",
 "x": "XspTOVUFOD34O_kY3zISC_B8AGxmF7DIXbbqTkPIeL4",
 "y": "PX-FdUFAt1ZpRsFTozH-IlkXgvHcqjcHbRg83K1nuZo",
 "crv": "P-256"
 }
}
.
# Payload
{
 "jti": "2e3e5c23",
 "htm": "POST",
 "htu": "https://auth.apithreats.com/token",
 "iat": 1816165809,
 "exp": 1816169409,
 "nbf": 1816165809,
 "ath": "fUHyO2r2Z3DZ53EsNrWBb0xWXoaNy59IiKCAqksmQEo"
}
.
SIGNATURE
The DPoP JWT header contains a typ field describing the token as a DPoP token, an
alg field indicating the algorithm used to sign the token, and a jwk object representing the public key. The contents of the jwk object depend on the type of signing algorithm. In this case, it describes a P-256 elliptic curve key with coordinates x and y. The
x and y values are the base64url encoding of the octet representation of the numerical
values. The key thumbprint is obtained by base64url encoding the SHA-256 hashing
of the octet representation of the jwk object.
 The DPoP payload contains a unique token ID (jti), the HTTP method (htm) and
URI (htu) of the request in which this JWT is included, and the time when the JWT
was issued (iat). The listing also includes an example of the ath claim, which represents a hash of the access token. The ath claim wouldn’t be included in the token
request since the token hasn’t been issued yet, but it’s required after that. The sender
signs the token with the private key previously generated. Encoding and signing the
JWT in listing 7.5 produces the following token:
eyJhbGciOiJFUzI1NiIsImp3ayI6eyJjcnYiOiJQLTI1NiIsImt0eSI6IkVDIiwieCI6IlhzcFR
➥PVlVGT0QzNE9fa1kzeklTQ19COEFHeG1GN0RJWGJicVRrUEllTDQiLCJ5IjoiUFgtRmRVRk
➥F0MVpwUnNGVG96SC1JbGtYZ3ZIY3FqY0hiUmc4M0sxbnVabyJ9LCJ0eXAiOiJkcG9wK2p3d
➥CJ9.eyJqdGkiOiIyZTNlNWMyMyIsImh0bSI6IlBPU1QiLCJodHUiOiJodHRwczovL2F1dGg
➥uYXBpdGhyZWF0cy5jb20vdG9rZW4iLCJpYXQiOjE4MTYxNjU4MDksImV4cCI6MTgxNjE2OT
➥QwOSwibmJmIjoxODE2MTY1ODA5LCJhdGgiOiJmVUh5TzJyMlozRFo1M0VzTnJXQmIweFdYb
➥2FOeTU5SWlLQ0Fxa3NtUUVvIn0.e3u8c5Z2f7xsitalslxsLJbD0dOFRnRs6hCT-z1fBj5P
➥AuYQg1FKI6ObCeMY3UpJTCt__HjD8fzWc9NO5-xJ9g
Listing 7.5
Structure of a DPoP JWT

---

## Sección 103: CHAPTER 7 [Entropy: 0.403]

API authorization and authentication
To include the token in a request, we use the DPoP header:
curl https://apithreats.com/ -X POST -H 'DPoP: <DPoP JWT>'
Upon receiving the token request, the authorization server verifies that the DPoP
belongs to the sender by validating its signature against the JWK thumbprint from the
authorization request. If verification is successful, the authorization server issues an
access token and a refresh token bound to the sender’s signing key. To bind an access
token to a DPoP key, RFC 9449 uses the JWT confirmation claim (cnf). For DPoP
tokens, the confirmation method is signature validation using the public key’s thumbprint. Following is an example of an access token bound to a DPoP key using the JWK
object from listing 7.5.
{
 "sub": "079e1799",
 "iss": "https://auth.apithreats.com",
 "nbf": 1562262611,
 "exp": 1562266216,
 "cnf": {
 "jkt":"TXbDsaH7fZoy285WqcnfckCwerY2977lnOPaq5G1mMs"
 }
}
When the sender receives the access token, they can access the resource server. The
sender must include the DPoP request header in every request to prove possession of
the token, and the resource API must validate the DPoP token’s validity using the
thumbprint confirmation method. Following is an example of a request authorized
with the DPoP token and the access token:
curl https://apithreats.com -X POST -H 'DPoP: <DPoP JWT>' \
-H 'Authorization: '<access_token>'
DPoP JWTs are for one-time use, and every new request to the resource server
requires the sender to produce a new DPoP JWT. As we saw in listing 7.5, the DPoP
JWT contains information about the request it’s bound to, including the request URI
and HTTP method. It also contains a unique identifier in the jti field. All this helps
prevent replay of DPoP JWT headers by threat actors if the token is leaked. For a practical demonstration of generating DPoP tokens and using them to authorize requests,
check out the code under ch07/ in the book’s GitHub repository.
7.6
Understanding OpenID Connect
Now that we know how OAuth works and how to bind tokens to their legitimate owners,
let’s dive into the process of authenticating users with OpenID Connect (OIDC), an
authentication protocol that allows users to take their identity from one website to
another. When you log in to a new website using your Gmail or GitHub account, for
example, you’re using OIDC—using your Gmail or GitHub identity to register with and
Listing 7.6
JWT access token bound to a DPoP key
7.6
Understanding OpenID Connect
log in to a new website. OIDC gives identity providers (IdPs) a standard way to expose
and manage their authentication flows. If you want to outsource authentication to identity as a service providers (IDaaS) like Auth0, Okta, Microsoft Entra, AWS Cognito,
Curity, and Authlete, you’ll be using OIDC to integrate with them. Let’s see how it
works.
 OIDC builds on the OAuth 2.0 specification and uses OAuth flows to authenticate
users. The outcome of a successful OIDC flow is an ID token and, optionally, an access
token. Every authentication flow in OIDC includes the following parties:
OpenID Provider (OP) or IdP—The server that manages user identities and
authenticates them, the equivalent of the authorization server in OAuth.
Relying party (RP)—The client application that outsources authentication to an
OP or IdP. RPs or clients must be registered with the IdP to obtain user information. To include Gmail authentication in our website, for example, we must
register a client with Google Identity.
User—The user whose identity the RP is trying to verify, the equivalent of the
resource owner in OAuth.
As illustrated in figure 7.14, OIDC authentication flows include the following steps:
Make an authentication request. The client puts together a URL that redirects the
user to the IdP where they authenticate. The authentication request contains
details such as the client ID and includes openid in its list of scopes.
Grant consent. After successful login, the user gives consent for the client application to access their data.
Issue an ID token and optionally an access token. After user consent, the IdP issues
an ID token that contains information about the user and, if requested, an
access token.
Client uses the access token to authorize requests. When the client application has
obtained the access token, it uses the token to access data on the resource server.
A common use case for IdPs is to manage user identities and authorize their access to
our own APIs. In such cases, we combine OIDC with OAuth to authenticate users and
obtain their access tokens at the same time. This is a common use case when we outsource authentication to IDaaS providers like Auth0, Curity, and AWS Cognito. You’ll
see coding examples for this purpose in chapter 8.
 ID tokens follow the JWT specification [5] and contain a header, a payload, and a
signature, as we saw in section 7.2.1. ID token payloads contain all the registered claims
of RFC 7519 (section 7.2.1) plus claims about the authentication process and the user
identity. The following claims describe the authentication process and are optional:

auth_time—A Coordinated Universal Time (UTC) timestamp representing the
time when the user logged in.

acr—A Uniform Resource Identifier (URI) that identifies the authentication
context class reference used to authenticate the user. Authentication context class
refers to the methods used during authentication and the level of assurance that

---

## Sección 104: CHAPTER 7 [Entropy: 0.295]

API authorization and authentication
clients or relaying parties can place on the strength of the authentication process.
Clients use this information to evaluate if the authentication process is adequate
for the level of sensitivity of the resources being accessed. The level of assurance
is defined following the guidelines from ISO/IEC 29115 [23], and the authentication context class URI is defined following RFC 6711’s guidelines [24].
OpenID’s Provider Authentication Policy Extension (PAPE [25]) specification
provides some examples of ACRs, such as http://schemas.openid.net/pape/
policies/2007/06/phishing-resistant for phishing-resistant authentication.
(Note that this URL is for illustration only and won’t work if you try to open it.)

amr—An array of strings describing the authentication methods employed to
authenticate the user, using the reference values in the Authentication Method
Reference Values specification [26]. The reference value for password-based
authentication, for example, is pwd, and for one-time passwords, it is otp. Check
out the specification for the full list of values.

azp—The authorized party to which the ID token was issued (matches the
client ID).
API
OpenID
provider
Login and consent
The API redirects the client
to the OpenID provider to
initiate the authorization 
request.
The OpenID provider
issues the ID token and the
access token.
ID token
Access token
API
GET /payments
Access token
2
4
Figure 7.14
OIDC allows applications to use OPs to manage their user identities securely. In this case, 
the application redirects the user to the OIDC server to log in and give consent, and it obtains an ID token 
and an access token in return.
7.7
Understanding role-based access controls
In addition to claims about the authentication process, ID tokens include claims
about the user identity, such as name, profile, picture, email, website, and phone_
number. You can check the full list of user identity claims in the OpenID Connect Core
1.0 document [27] and IANA’s registry of JWT standard claims [28]. If the identity
claims in the ID token aren’t sufficient and the client application needs more information about the user, it can query the OP’s UserInfo endpoint, which returns full
details about the user.
 To enhance interoperability, the OpenID specification includes a feature called
discovery [25]. OIDC discovery is a standard data structure that describes the configuration of an OpenID provider. It includes details such as what OIDC claims the provider supports (claims_supported), the UserInfo endpoint (userinfo_endpoint), the
authorization and token endpoints (authorization_endpoint and token_endpoint),
and the signing keys available to validate tokens (jwks_uri). All OPs expose this configuration under a /.well-known/openid-configuration endpoint. For Google
Accounts, for example, it is available at https://accounts.google.com/.well-known/
openid-configuration.
7.7
Understanding role-based access controls
Role-based access controls (RBAC) are authorization checks based on user roles. Roles
represent sets of permissions that define the level of access a user has to an application. Often, user roles correspond to the types of users an application has. A healthcare application, for example, might distinguish among three types of users (such as
patients, receptionists, and doctors) and use the concept of role to represent the permission sets of each user type.
 As explained in chapter 4, each user role may have access to specific operations or
a role-dedicated API. As illustrated in figure 7.15, a healthcare application may have
patient, doctor, and receptionist APIs. The challenge is how to ensure that every user
only gets access to the right operations and APIs based on their role. How can users claim
their association with a specific role, and how can APIs verify such associations reliably?
Patient API
Doctor API
Receptionist API
Patient
Doctor
Receptionist
Healthcare API
Figure 7.15
A common solution for 
RBACs is to create distinct APIs for 
each user group or role, such as a 
doctor API, a patient API, and a 
receptionist API.

---

## Sección 105: CHAPTER 7 [Entropy: 0.265]

API authorization and authentication
A common solution to this problem is to include user roles in the token’s payload as a
custom claim. Most IDaaS providers support this feature. Auth0, for example, supports
it through the permissions custom claim, and Entra supports it through the roles and
groups custom claims. As illustrated in figure 7.16, when a user logs in with the identity
server, the server knows their roles and includes them in the access token’s payload. In
that case, the API server must validate that the user has the expected role when validating access to a certain API or operation. It is important to ensure that each API and
operation checks the user’s role before processing their requests: failing to do so opens
our API to broken function-level authorization (BFLA) breaches.
Figure 7.16
A common implementation for RBAC includes the user role in the JWT through a custom claim—
permissions in this example. The IDaaS provider knows the user role and includes it in the token automatically, 
and the API validates user access by checking the permissions claim.
In addition to user roles, some APIs use the concept of granular access scopes. As illustrated in figure 7.17, we use granular access scopes to indicate which specific operations a user can access. Granular access scopes help us simplify our RBAC model when
every user has a different set of permissions, making it difficult to create discrete user
groups. Access scopes are often also represented in the token’s payload by a custom
claim, making the authorization process explicit and transparent.
 Instead of having a single admin role, for example, we may want to manage the
permissions of our admin users dynamically and give each user access to different
operations. Granular access scopes make it explicit which operations a user can
access, making access validation easier on the server side. As shown in figure 7.17, if a
Patient API
Doctor API
Receptionist API
Healthcare API
{
 "iss": "https://auth.apithreats.com/",
 "sub": "b896f
 "aud": "https://apithreats.com",
 "iat": 1823318279,
 "exp": 1823408279,
 "nbf": 1823321879
 "jti": "873137f26e8d",
 "permissions": ["patient"]
}
f3a",
,
Patient
JWT payload
Authorization
request + login
IDaaS provider issues 
user’s JWT with their
permissions.
User sends requests
to the patient and
doctor APIs
using their token.
The request to the
patient’s API succeeds
because the JWT has
the right permissions.
The request to the
doctor’s API fails because
the JWT does not have
the right permissions.
IDaaS provider
7.7
Understanding role-based access controls
user is trying to perform an operation on the PUT /admin/api/users endpoint, we
must validate whether access to such endpoint is listed in their permissions list.
 Managing RBAC with granular access scopes has three main downsides:
The burden of keeping each user’s list of permissions up to date
The potential disclosure of sensitive configuration details in our security architecture
The potential for user permissions lists to grow very long
The first drawback can result in data breaches if a user loses access to one endpoint
and we fail to update their access scopes list, whereas the second can reveal information that threat actors could use to abuse our system. The third drawback can affect
the size of our access tokens and have performance implications or may even exceed
the maximum size of an HTTP request header allowed in some servers. Large lists of
access scopes are a code smell indicating that we can probably consolidate access
scopes into discrete user groups or roles. As with everything in software design, balance the need for flexibility with the opportunity to simplify your processes by creating discrete groups of aggregated scopes.
 Finally, some applications keep a table of user attributes and determine whether a
user can access certain data or operations based on those attributes. We call this pattern attribute-based access controls (ABAC). As illustrated in figure 7.18, in a project management application, users may have different types of access depending on their job
{
 "iss": "https://auth.apithreats.com/",
 "sub": "b896ff3a",
 "aud": "https://apithreats.com",
 "iat": 1823318279,
 "exp": 1823408279,
 "nbf": 1823321879,
 "jti": "873137f26e8d",
 "permissions": [
 "GET:/admin/api/users",
 "GET:/admin/api/users/{user_id}",
 "GET:/admin/api/appointments"
 ]
}
Patient
Admin API
IDaaS provider
JWT payload
Authorization
request + login
IDaaS provider issues 
 user’s JWT with 
their permissions.
The user tries to access the PUT /admin/api/users/{user_id}
endpoint, but the request is rejected because the endpoint
is not listed in their list of permissions.
PUT /admin/api/users/{user_id}
GET /admin/api/users
GET /admin/api/users/{user_id}
PUT /admin/api/users/{user_id}
GET /admin/api/users/appointments
Figure 7.17
A popular implementation of RBAC defines granular access controls. In this case, the token includes 
the list of endpoints to which the user has access, and the API validates access by checking whether the 
requested endpoint is in the permissions list.

---

## Sección 106: CHAPTER 7 [Entropy: 0.46]

API authorization and authentication
titles, geographical locations, and project affiliations. In this case, we pull the user ID
from the access token (sub claim) and check the user’s attributes against the database
to determine their level of access.
Figure 7.18
When we apply ABAC, the API determines whether a user has access to the requested resource by 
checking their combination of attributes in the database.
ABAC gives us a lot of flexibility. Contrary to RBAC, we don’t represent ABAC in the
access token, which means we don’t have the burden of keeping user permissions in the
authorization server up to date. But this flexibility is also ABAC’s weak point. ABACs can
get fairly complex quickly, and they often build on implicit assumptions, making the
implementation more difficult and testing and validation very challenging.
 Consider the project management application in figure 7.18. Users can access data
about projects at different levels of granularity. The application distinguishes between
global, national, regional, state, county, and local project managers. A project manager with state-level access to California, for example, has access to all projects in that
state. The application further distinguishes between read and write access depending
on the business function. As you can see, access control rules become complex quickly
and often must account for special cases, making the authorization process even more
complicated. The downside of this complexity is that the application becomes difficult
to test and maintain, and it can easily introduce side effects that threat actors can
exploit to obtain unauthorized access. If you choose to use ABACs, make sure to create very explicit and detailed access models that contain no assumptions.
User 1
User 2
ProjectManager
+ id: 1
+ scope: state
+ area: California
+ access: read
ProjectManager
+ id: 2
+ scope: county
+ area: Sacramento
+ access: read
Project
management
API
GET /projects?country=us&state=ca
PUT /projects?country=us&state=ca&projet_id=1
GET /projects?country=us&state=ca&county=sacramento
GET /projects?country=us&state=ca
User 1 has state-level read access to California
projects. Hence, their request for a list of projects in
California succeeds, but when they try to update a
project, the request is rejected.
User 2 has read and write county-level access to
projects in Sacramento. Hence, when they request a
list of projects for Sacramento County, the request
succeeds, but when they request a list of projects in
California, it fails.
Summary
 This concludes our overview of the most common standards in API authentication
and authorization. The topics laid out in this chapter are of utmost importance in API
security and, unfortunately, are not always well understood. If you’re in the process of
building a security framework for your APIs, make sure that you’ve learned and
understood all the material in this chapter so you can make informed decisions about
your security model. If you already have a security model in place, evaluate your
authentication and authorization processes with the help of this chapter to see
whether you can spot any areas with room for improvement. Remember that API security is a process, and we can always do something to improve our posture.
Summary
Authentication and authorization are the pillars of API security. They are our
first line of defense, and all identity-based security checks rely on them, so it’s
important to get them right.
Authentication is the process of verifying a user’s identity, and authorization is
the process of validating their access to an API, endpoint, or resource.
We prove that we have access to an API by including an access token in the
request. An access token is a special string that goes in the Authorization
request header.
The most common type of access token is the JWT, which contains a header, a
payload, and a signature:
– The header contains the token’s metadata, such as the signing algorithm.
– The payload contains information about the token’s subject. We call this
information claims.
– The signature proves that the token is legitimate.
OAuth is a standard for delegating access to user data to an application. We use
OAuth to allow web and mobile applications to access an API on our behalf, for
example.
OAuth describes four flows that we can use to delegate access depending on the
client’s constraints:
– The authorization code flow requires the exchange of an authorization code
for an access token. Confidential clients use a secret during the exchange to
keep the transaction safe.
– The client credentials flow uses credentials to obtain the token directly and
is suitable for scenarios that require programmatic access, such as microservices.
– The device authorization flow is designed for input-constrained devices such
as smart TVs. It requires the user to complete the flow through an external
application.
– The refresh token flow is used to renew access to the API when the access
token has expired.

---

## Sección 107: CHAPTER 7 [Entropy: 0.25]

API authorization and authentication
PKCE is a security improvement for the authorization code flow that prevents
access token hijacking via CSRF attacks by requiring the client to provide a code
verifier to prove ownership of the authorization code.
To prove ownership of a JWT, we use sender-constrained tokens. We can bind
the token to an identity using two methods:
– MTLS for certificate-bound tokens binds the token to their legitimate
owner’s client certificate.
– DPoP requires the client application to include a newly signed DPoP token
in every request.
OIDC is a standard that allows users to take their identity from one application
to another. OIDC allows us to outsource authentication to external IDaaS
provider to enhance the security of our APIs.
RBAC allows us to define sets of permissions for groups of users, making it
easier to validate their access to our APIs.
ABAC allows us to constrain API access based on user attributes, such as the
state of the user.
Implementing API
authentication and
authorization
In February 2023, ethical hacker Eaton Zveare discovered major authentication and
authorization vulnerabilities in Toyota’s Global Supplier Preparation Information
Management System, an application Toyota employees used to manage their supply
chain [1]. Zvere was able to do several things: obtain access tokens without providing
a password, impersonate Toyota employees, search the employee directory, assume
administrator roles, and access highly sensitive data about Toyota’s supply chain.
This chapter covers
Documenting API security with OpenAPI
Issuing and validating JSON Web Tokens
Integrating with an OpenID Connect provider to 
add authentication to our APIs
Validating access tokens issued by an OpenID 
Connect provider
Creating middleware to authorize access to our 
APIs
Implementing role-based access controls

---

## Sección 108: CHAPTER 8 [Entropy: 0.4]

Implementing API authentication and authorization
Fortunately, Zveare is an ethical hacker, and he reported the vulnerabilities instead of
exploiting them. In the hands of threat actors, however, vulnerabilities like this are the
perfect recipe for a major data breach and can put our whole business at risk.
 Authentication and authorization are the cornerstones of our API security posture.
As the Toyota example reveals, if threat actors break through our authentication and
authorization layers, they will be able to forge tokens, bypass access controls, impersonate other users, and gain unauthorized access to sensitive data. At that point,
there’s nothing much we can do to stop threat actors; we’ve been breached. Therefore, it’s of utmost importance to implement a robust authentication and authorization system as the first line of defense for our APIs.
 In chapter 7, you learned about the most widely used standards for API authentication and authorization. In this chapter, we’ll implement those standards following the
recommendations and best practices from chapter 7. As we established in chapter 2,
good security posture management begins with design and planning; that means we
must document what we want to accomplish so that our documentation becomes an
artifact we can use to guide and validate our implementation. Following that principle,
we’ll begin this chapter by learning to document authenticated operations in our API.
 When we design our API, it’s important to decide which operations we want to protect, and how, and document those decisions. We’ll tackle that task in the first section
of this chapter. After that, you’ll learn to issue and validate JSON Web Tokens. Then
you’ll learn to integrate with an OpenID Connect (OIDC) provider to add authentication to your APIs, and to validate the access tokens issued by the OIDC provider.
Finally, you’ll learn to implement robust role-based access controls to restrict access to
sensitive data and operations to authorized groups of users.
8.1
Documenting authenticated endpoints with OpenAPI
The first step in our API authentication and authorization strategy is deciding which
operations we want to protect and how. Imagine a ride-sharing application. Do we want
users to plan a ride and get a quote anonymously, or should they be authenticated? Do
we want to distinguish between types of users, such as drivers and passengers, with
access to different operations? Our API design process must answer those questions by
attending to the business requirements of our application and assessing the tradeoffs of
different choices, their security implications, and ways to manage them.
 When we have decided what to protect and how, we document our decisions. In
this section, you’ll learn to document authentication and authorization using
OpenAPI, the most widely used standard for documenting REST APIs.
 OpenAPI uses security schemes to describe how APIs are protected. A security
scheme defines the process users must follow to authorize their requests, including the
authentication URL, the token type and its placement, and access scopes. To understand how to document security in OpenAPI, let’s break down the structure of an
OpenAPI specification. The examples in this section use OpenAPI version 3, which is
the latest version of OpenAPI.
8.1
Documenting authenticated endpoints with OpenAPI
NOTE
The semantics for security definitions are similar across all versions of
OpenAPI, though slight variations exist. Since version 3.1, for example,
OpenAPI has been fully compatible with JSON Schema semantics, allowing
you to describe richer, more complex data models. The examples in this section use OpenAPI 3.1.1. If you work with OpenAPI 2 and want to learn how to
add security using that version, you’ll find a helpful guide on Swagger’s website
[2]. If you have OpenAPI 2 specifications, I recommend migrating them to
OpenAPI 3, which you can accomplish by using Swagger Converter (https://
converter.swagger.io). OpenAPI 2 is deprecated now, and you’ll find a bigger
community and better tooling support if you migrate to OpenAPI 3.
As illustrated in figure 8.1, an OpenAPI specification contains the following sections:

openapi—The version of OpenAPI that the specification uses, such as 3.1.1.

info—Metadata about the API described in the specification, such as the title
and version.

servers—The base URLs where the API is available, such as the production and
development environments.

paths—The URL paths exposed by the API and the HTTP methods they support, the status codes they return, the content types they use, and so on.

components—A collection of reusable elements that can be referenced throughout the specification. Request and response schemas, for example, are often
documented in this section under components.schemas. Common API
openapi: 3.1.1
info:
 version: 2.0
servers:
 - qa: dev.example.com
 - prod: example.com
schemas:
 Hello:
 type: object
 properties:
 ...
responses:
 404NotFound:
 content:
 application/json:
 ...
securitySchemes:
 JWTBearer:
 type: http
 scheme: Bearer
 bearerFormat: JWT
components:
security:
 - JWTBearer
openapi
info
servers
paths
components
security
paths:
 /hello:
 get:
 security:
 - JWTBearer
 content-type:
 application/json:
 ...
Figure 8.1
We define the security schemes that protect our API in the specification’s 
components section under securitySchemes, and we apply them globally to the API under 
the specification’s security field or per operation using the operation’s security field.

---

## Sección 109: CHAPTER 8 [Entropy: 0.406]

Implementing API authentication and authorization
responses, such as 404 and 422 responses, are also documented in this section
under components.responses. Security schemes fit in this section under
components.securitySchemes. To learn more about the elements of the
components section, check out Swagger’s useful guide to OpenAPI 3 [3].

security—The security schemes that by default apply to the whole API.
As illustrated in figure 8.1, we define security schemes within the components section
of the OpenAPI specification under securitySchemes. A security scheme object
describes how we must authenticate the request, including the type of token and
where we must place it. The exact shape of the security scheme object depends on the
type of security. OpenAPI 3 supports five types of security schemes:

http—Authentication via the Authorization header, as per RFC 7235 [4].
OpenAPI distinguishes two schemes of HTTP authentication: Basic and Bearer.

apiKey—Authentication with API keys.

oauth2—How to obtain an access token, the supported OAuth flows, and the
available scopes.

openIdConnect—The OpenID discovery endpoint.

mutualTLS—Authentication over mutual Transport Layer Security (mTLS),
which requires clients to use the TLS certificate bound to their identity.
Let’s see an example of documenting a security scheme for the http security type. Listing 8.1 defines a security scheme named JWTBearer, which describes how to authenticate requests with JSON Web Tokens (JWTs) as bearer tokens. A bearer token is a token
with the Bearer keyword before the token, in the format Authorization: Bearer
<token>. The security scheme definition in the listing includes the following fields:

description—A short description of the security scheme.

type—The security scheme identified as an HTTP authentication type.

scheme—The security scheme to include in the Authorization header. It must
be one of the values listed in the Internet Assigned Numbers Authority’s
(IANA’s) “HTTP Authentication Scheme Registry” [5].

bearerFormat—The bearer token’s format, which in the listing is JWT.
# file: ch08/openapi.yaml
components:
 securitySchemes:
 JWTBearer: 
 description: Bearer JSON Web Token
 type: http
 scheme: Bearer
 bearerFormat: JWT
TIP
To learn more about documenting other security schemes, check out
OpenAPI’s official documentation, in particular “Describing API Security”
Listing 8.1
OpenAPI JWT Bearer security scheme
We define a JWT bearer 
authentication scheme.
8.2
Issuing JWTs
[6], and section 4.8.27 of the OpenAPI 3.1.1 specification [7], which
describes the requirements for security scheme objects.
When we’ve defined our security schemes, we apply them to the API. We can apply a
security scheme globally using OpenAPI’s top-level security keyword, as shown in figure 8.1, or we can apply them per operation, using the security keyword available for
each operation. Operation-level security overrides the global security scheme.
 The next listing defines an API that applies the JWTBearer security scheme globally.
The JWTBearer security scheme is the same as in listing 8.1 but is collapsed in the following listing. The API exposes two endpoints: GET /hello and GET /protected-hello.
GET /protected-hello is protected by the JWTBearer security scheme because it inherits its security configuration from the specification’s top-level security property. GET
/hello is unprotected because it overrides the specification’s global security configuration with its own, setting it to an empty array and effectively disabling security for
that endpoint.
# file: ch08/openapi.yaml
openapi: 3.1.1
security:
 - JWTBearer: [] 
paths:
 /hello:
 get:
 security: [] 
 ...
 /protected-hello:
 get:
 ...
components:
 securitySchemes:
 JWTBearer:
 ...
Documenting the security schemes and configurations of our API is a fundamental
step that allows us to manage our API security posture, model threats to our API, and
understand our attack vectors. After we’ve documented our security, we must implement it, and that’s the topic of the rest of this chapter.
8.2
Issuing JWTs
JWTs are JSON objects that contain claims about the right of a subject to access our
API. JWT is a well-established standard and the most common type of token used to
validate access to APIs. Using JWTs alone won’t make your API more secure, however.
The key is to have a robust process for issuing and validating JWTs securely and following best practices.
Listing 8.2
Applying a security scheme globally
We apply the JWTBearer security 
scheme to all endpoints through 
the global security field.
We make the endpoint 
unauthenticated by overriding 
the global security scheme.

---

## Sección 110: CHAPTER 8 [Entropy: 0.517]

Implementing API authentication and authorization
 Let’s talk about issuing JWTs first. You can issue JWTs yourself, or you can delegate
the job to an identity as a service (IDaaS) provider. As discussed in chapter 4, identity
systems are difficult to build and secure, and custom implementations are common
sources of security breaches. Hence, most organizations stand to benefit from using a
standard IDaaS provider. If you use an IDaaS provider, the provider will take care of
issuing JWTs securely, and you need to worry only about validating JWTs correctly.
 If using an IDaaS provider is not an option and you need to issue your own tokens,
use a self-hosted IDaaS provider such as Keycloak (https://www.keycloak.org), and if
that’s not possible, use a robust library for issuing tokens. Most software development
stacks have a good ecosystem of libraries that implement the JWT standard, and jwt.io
maintains a catalog of them (https://jwt.io/libraries), including the signing algorithms they support, the latest version of every library, and links to libraries’ code
repositories and documentation.
 For Python, we have three outstanding JWT libraries: PyJWT (https://github.com/
jpadilla/pyjwt), python-jose (https://github.com/mpdavis/python-jose, no connection with yours truly), and JWCrypto (https://github.com/latchset/jwcrypto). PyJWT
is the most popular library, with an easy-to-use interface and support for a wide range
of signing algorithms. I’ll use this library to illustrate the examples in this chapter, but
you can find examples for the other libraries in the code repository for this chapter.
 To generate a JWT, we need a payload. As we learned in chapter 7, JWTs contain
three elements: a header, a payload, and a signature. The header contains metadata
about the token and is generated automatically by PyJWT. The payload contains the
claims about the user, and we must provide those claims to PyJWT. We’ll also need a
signing key, which PyJWT will use to sign the token.
 Let’s begin by putting together our payload, as shown in the next listing. The JWT
payload contains a few standard claims; it identifies the token’s issuer (iss) as https:/
/auth.apithreats.com, provides a user identifier under the sub field, states the audience (aud) for which this token is intended (https://apithreats.com/api), sets the
token’s issue time (iat) to the current time in Coordinated Universal Time (UTC),
and sets its expiration (exp) to an hour. The payload can include additional custom
properties with information about user permissions, roles, and other relevant information. Make sure that you don’t include personally identifiable information (PII)
such as the user’s personal name and email address; doing so poses a risk of PII leak,
as discussed in chapter 7.
# file: ch08/jwt_generator_pyjwt_hs256.py
from datetime import datetime, timezone, timedelta
now = datetime.now(timezone.utc)
payload = {
 "iss": "https://auth.apithreats.com",
 "sub": "23456543",
Listing 8.3
Example JWT payload
8.2
Issuing JWTs
 "aud": "https://apithreats.com/api",
 "iat": now,
 "exp": (now + timedelta(hours=1))
}
Now that we have a payload, let’s feed it to PyJWT to issue a token. The next listing
shows the process. We begin by importing datetime(), timezone, and timedelta()
from the datetime module in Python’s core library, which will help us set the token’s
issued-at and expiration times. We also import the PyJWT library, which we’ll use to
produce the token. In lines 6–12, we define the payload we’re going to feed to
PyJWT’s encode() function to issue the token. Then we invoke PyJWT’s encode(), passing the token’s payload, the desired signing algorithm (algorithm), and the signing
key (key). In this example, we sign the token with HS256, using the secret password as
our hashing key. The secret is hardcoded in the script for illustration purposes; in the
real world, you’d pull it from the environment.
# file: ch08/jwt_generator_pyjwt_hs256.py
from datetime import datetime, timezone, timedelta
import jwt
now = datetime.now(timezone.utc)
payload = {
 "iss": "https://auth.apithreats.com",
 "sub": "23456543",
 "aud": "https://apithreats.com/api",
 "iat": now,
 "exp": (now + timedelta(hours=1))
}
print(jwt.encode(payload=payload, key="password", algorithm="HS256"))
This listing is available in the code repository for this book under ch08/jwt_generator_pyjwt_hs256.py. To run the script, open a terminal, and follow the instructions in
the chapter’s readme file (ch08/README.md) to install the necessary dependencies
and activate the virtual environment. When you execute the following command,
you’ll see the token issued by PyJWT printed on the terminal:
$ python jwt_generator_pyjwt_hs256.py
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJodHRwczovL2F1dGguYXBpdGhyZW
➥F0cy5jb20iLCJzdWIiOiIyMzQ1NjU0MyIsImF1ZCI6Imh0dHBzOi8vYXBpdGhyZWF0cy5jb
➥20vYXBpIiwiaWF0IjoxNzMxNTY4Nzg0LCJleHAiOjE3MzE1NzIzODQuODMxMDE3fQ.i1d4M
➥eudVHhpNG8fyfLamK8v01hhU_BHe7-OO_qDISo
You can paste the token on https://jwt.io to inspect its contents, as shown in figure
8.2. Jwt.io shows you the decoded content of the token’s header and payload and
allows you to verify the signature by pasting the key in the Verify Signature box.
Listing 8.4
Issuing a JWT with PyJWT

---

## Sección 111: CHAPTER 8 [Entropy: 0.31]

Implementing API authentication and authorization
 
Figure 8.2
Jwt.io is an online tool that makes it easy to work with JWTs. When you paste the token in the left 
panel, the decoded header and payload appear in the right panel. You can also verify the token’s signature by 
pasting the secret in the Verify Signature field.
Listing 8.4 uses HS256 to sign the token, which (as we learned in chapter 7) is a type
of symmetric signing algorithm. Symmetric algorithms use the same key to sign the
token and validate its signature; this poses a risk of leaking the signing key because we
need to have it in multiple places. To mitigate that risk, we use an asymmetric signing
algorithm. The most widely supported asymmetric signing algorithm for JWT implementations is RS256. As we saw in chapter 7, RS256 is vulnerable to Bleichenbacher’s
2006 signature forgery attack when
The signing key has a low exponent (below 3).
There are flaws in the implementation of the verification algorithm.
Barring those problems, RS256 is safe to use. But implementation flaws in the validation process are concerning enough that the FAPI specification [8], a set of guidelines
for building highly secure APIs, bans the use of RS256 and recommends using more
robust alternatives such as PS256 and EdDSA (see chapter 10 to learn about FAPI) [9].
PS256 is like RS256 but with probabilistic outcomes; that means that given the same
input, we get different signatures. This substantially mitigates the risk of an attacker
being able to crack the signing key and forge tokens. Here, we’ll see an example of
Paste the token here.
Decoded
token’s header
Decoded
token’s
payload
Paste the token’s
secret here to
verify the signature.
8.2
Issuing JWTs
generating tokens signed with PS256. The book’s GitHub repository contains examples
of EdDSA and RS256 if you want to learn how to generate tokens with such signatures.
 Asymmetric signing algorithms use a private key for signing and a public key for
signature validation. Before we can sign tokens with asymmetric keys, we have to produce our public and private key pair. Because we are going to illustrate the signature
process with PS256, which uses RSA keys, we need to generate an RSA key pair, for
which we can use OpenSSL (https://github.com/openssl/openssl). OpenSSL is a
library that implements the Secure Sockets Layer (SSL) and Transport Layer Security
(TLS) protocols, and, among other things, it allows us to generate RSA keys.
 To install OpenSSL, see the Build and Install section of the readme file in
OpenSSL’s official GitHub repository (https://mng.bz/xZR6), and find instructions
for your operating system. If you’re unable to install OpenSSL or want to do that later,
the GitHub repository for this book includes a sample of private and public keys
(ch08/private_key.pem and ch08/public_key.pem) that you can use for your own testing purposes.
 After you install OpenSSL, you can generate your RSA private and public keys
using OpenSSL’s genpkey command, which is the recommended way to generate signing keys (https://docs.openssl.org/3.2/man1/openssl-genpkey). It looks like this:
openssl genpkey -algorithm RSA -out private_key.pem \
-outpubkey public_key.pem -pkeyopt rsa_keygen_bits:3072
Let’s break down the command to understand what’s going on. We have the following
parameters:

-algorithm—Indicates the algorithm for which we want to generate the key,
which, in this case, is RSA.

-out—Specifies the file where we want to output the private key, which, in this
case, is private_key.pem. This is the key we’ll use to sign tokens.

-outpubkey—Specifies the file where we want to output the public key. This is
the key we’ll use to validate signatures.

-pkeyopt—Allows us to provide additional configuration for our key. In this
case, we configure the size of the key with the rsa_keygen_bits parameter and
set it to 3072 bits. The strength of an RSA key is proportional to its size, and RFC
7518 [10] requires a size of at least 2048 bits.
The previous command produces two files: private_key.pem and public_key.pem,
which are our private and public keys, respectively. Now that we have a key pair to sign
and validate token signatures, let’s see how we feed them to PyJWT. The first step is
loading the private key using Python’s cryptography library, as shown in listing 8.5. We
begin by reading the private_key.pem file’s contents using the Path class from
Python’s pathlib library. pathlib contains handy utilities for working with files,
including reading from and writing to them.
 In the next step, we use the load_pem_private_key() function from cryptography’s
serialization module to load our private key as an object. load_pem_private_key()

---

## Sección 112: CHAPTER 8 [Entropy: 0.604]

Implementing API authentication and authorization
takes two required parameters: data and password. data is the content from our private key file in bytes. In the preceding step, we loaded the file content and assigned it
to a variable named private_key_text; to encode it to bytes, we use the encode()
method available to all Python strings. password is required only if our key is
encrypted, and, in this case, it is not, so we set it to None.
# file: ch08/jwt_generator_pyjwt_ps256.py
from pathlib import Path
from cryptography.hazmat.primitives import serialization
private_key_text = Path( 
 "private_key.pem"
).read_text()
private_key = serialization.load_pem_private_key( 
 data=private_key_text.encode(), password=None
)
Now that our key is loaded as an object, we can pass it to PyJWT to sign our tokens. The
next listing uses the payload we defined in listing 8.3, collapsed with an ellipsis. To produce the token, we use PyJWT’s encode() function, passing the token’s payload to the
payload parameter, passing the private key object to the key parameter, and selecting
the algorithm we want to use to sign the token through the algorithm parameter. In this
case, we sign the token using PS256. If you want to sign with RS256, you can use the
code from the following listing, replacing PS256 with RS256 in the last line.
# file: ch08/jwt_generator_pyjwt_ps256.py
from pathlib import Path
import jwt
from cryptography.hazmat.primitives import serialization
private_key_text = Path("private_key.pem").read_text()
private_key = serialization.load_pem_private_key(
 data=private_key_text.encode(), password=None
)
payload = {...} # same as in listing 8.3
print(
 jwt.encode(payload=payload, key=private_key, algorithm="PS256")
) 
This code is available under ch08/jwt_generator_pyjwt_ps256.py in the code repository for this book. If you run the script, it prints the token to the terminal:
Listing 8.5
Loading a private key with Python’s cryptography library
Listing 8.6
Issuing a JWT with PS256 signature using PyJWT
We load the signing 
key from the file.
We build a signing key 
object using cryptography’s 
load_pem_private_key() 
method.
We sign the token using
PyJWT’s encode() function
and print the output.
8.3
Validating JWTs
$ python jwt_generator_pyjwt_ps256.py
eyJhbGciOiJQUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJodHRwczovL2F1dGguYXBpdGhyZW
➥F0cy5jb20iLCJzdWIiOiIyMzQ1NjU0MyIsImF1ZCI6Imh0dHBzOi8vYXBpdGhyZWF0cy5jb
➥20vYXBpIiwiaWF0IjoxNzMxNjU2NzI1LCJleHAiOjE3MzE2NjAzMjUuNjA1NzQ2fQ.ViiRA
➥7U-0RwkAgAqukBSugkS6rT8uR-AdPhp95YiaNs-wQSPg8H3HPGqExJDIwtWqeZIiMLtYEdl
➥VyDfYHQ4xJYY9LsGqWkXUbKlauBVoaey1SfrAbXK7N8zTzchZJciNjehvxUCjYr10ePzKbd
➥Gwf05hYle03fNQ_uFjF4Ooosr9100lAM-JBwWt95gzNQnS-DMfdYTdS74Y4Ri6wVfsyquzh
➥h4KT_Y86OelSWvRChY_IL16t38XMM_UfnW1T0ApolKSA8aeWQlhUNb0QBPn2CPVg6TR4ca1
➥IYJPSNNfbn0zkcJPHevh2quNuIji4dFp1up_BdATqIGKV9-LTRJeAHfhsHobhPgw5AW60Nm
➥cVHmaUtCc2YMCWWphSKtOA6RAXNyU9Ko8Vx_0GNpoxP4Q1v55YZq5aAIV7k9u0m5oYRnabb
➥PWplX1DAWCgpvVM2GZScdpOfn-4eqfYH8YZ5ULg3pn5qoAYV_dZLyZVpTxefvnaCIxU-9D4
➥1DU84YVxWR
Your token will look different due to the dynamic timestamps in the iat and exp
claims and PS256’s probabilistic nature. You can paste the token on jwt.io to verify that
the content is right, as we did in figure 8.2 earlier. Now that you can sign tokens using
RS256 and PS256, you can check what we mean when we say that RS256 is deterministic and PS256 is probabilistic. First, create a hardcoded payload (without the dynamic
timestamp values) like the following:
payload = {
 "iss": "https://auth.pyjobs.works",
 "sub": "10",
 "aud": "https://pyjobs.works/jobs",
 "iat": 1825977600,
 "exp": 1826064000
}
Replace this payload in the ch08/jwt_generator_pyjwt_ps256.py script, and run it multiple times. You’ll see that it produces a token with a different signature each time. But
if you run the script using the RS256 algorithm, you’ll see that it always produces the
same signature.
8.3
Validating JWTs
Now that we know how to generate JWTs, let’s see how to validate them. When we use
JWTs to authenticate API requests, a big part of our security posture relies on our token
validation process. In other words, JWTs are only as secure as the way we validate them.
Most security breaches involving JWTs happen in the context of token validation. In
December 2020, cybersecurity researcher Ron Chan revealed how Microsoft Outlook
failed to validate token signatures, allowing him to forge tokens and access other users’
emails [11]. In April 2020, Ben Knight, a cybersecurity researcher at Insomnia Security
(now part of CyberCX), revealed that Auth0 became vulnerable to token forgery when
the token’s alg field was set to nonE, with a capital E at the end [12]. These are just two
examples of a long list of security issues involving JWT validation.
 Given the track record of API breaches involving JWTs and the types of companies
involved, including Microsoft and Auth0, you might think that validating JWTs is
inherently difficult. This is not the case. As you’ll see in this section and the rest of this

---

## Sección 113: CHAPTER 8 [Entropy: 0.695]

Implementing API authentication and authorization
chapter, the keys to validating JWTs securely are keeping the process simple and applying a few good security practices.
NOTE
When you choose a JWT library, make sure that it follows best practices
and avoids common flaws in token validation. In 2015, cybersecurity
researcher Tim McLean found critical vulnerabilities in a few open source
JWT implementations that allowed threat actors to set the alg field of the
token’s header to none and therefore bypass signature validation. He also
found libraries vulnerable to algorithm confusion attacks, which allowed
attackers to bypass asymmetric signature validation by changing the token’s
alg field to HS256, making the libraries think that the public key was the signing key [13]. I’m not aware of any major JWT libraries currently vulnerable to
these attacks, but it’s always a good idea to test your library of choice using
McLean’s examples to verify that it’s not vulnerable.
Let’s begin with a simple example of validating a token signed with HS256 to understand how the process works. Run the script from listing 8.4 (also available in the code
repository for this book under ch08/jwt_generator_pyjwt_hs256.py) to generate a
token with an HS256 signature. Copy the token from the terminal and replace it with
the <token> placeholder in listing 8.7. The listing defines a function, validate_
token(), that takes one parameter: the access token. Within the function, we invoke
PyJWT’s decode() function and return its outcome. PyJWT’s decode() validates and
decodes the token. If validation is successful, we get the token’s payload back; if it fails,
PyJWT raises an exception. PyJWT’s decode() takes three required parameters:

jwt—The JWT we want to validate

key—The key we want to use to validate the token’s signature

algorithms—The list of algorithms we can use to validate the token
Also, we specify the allowed values for the token’s audience and issuer (aud and iss
claims in the payload). PyJWT also validates that the token isn’t expired.
# file: ch08/jwt_validator_pyjwt_hs256.py
import jwt
def validate_token(token):
 return jwt.decode( 
 jwt=token,
 key="password", 
 algorithms=["HS256"], 
 audience="https://apithreats.com/api",
 issuer="https://auth.apithreats.com",
 )
token = <token>
print(validate_token(token))
Listing 8.7
Validating tokens with an HS256 signature
We use PyJWT’s 
decode() function to 
validate the token.
We specify the key 
needed to validate 
the signature.
We specify the 
algorithm needed to 
validate the signature.
8.3
Validating JWTs
This code is available in the code repository for this book under ch08/jwt_validator_pyjwt_hs256.py. If you run the script with a valid token, it prints the token’s payload to the terminal. To get a sense of the type of errors PyJWT raises when the token
is invalid, try changing the audience’s value or the list of allowed algorithms in listing
8.7, and run the script again.
 Validating tokens signed with asymmetric algorithms, such as RS256 and PS256, follows the same process as in listing 8.7, but we need to load the public key first. The next
listing shows how. This listing is similar to listing 8.7; the differences are highlighted in
bold. To load the public key, we read the contents from our public_key.pem file and
pass them encoded as bytes to cryptography’s load_pem_public_key() function.
# file: ch08/jwt_validator_pyjwt_ps256.py
from pathlib import Path
import jwt
from cryptography.hazmat.primitives.serialization \
 import load_pem_public_key
public_key = load_pem_public_key( 
 Path("public_key.pem").read_text().encode()
)
def validate_token(token):
 return jwt.decode(
 jwt=token,
 key=public_key, 
 algorithms=["PS256"], 
 audience="https://apithreats.com/api",
 issuer="https://auth.apithreats.com",
 )
token = <token>
print(validate_token(token))
This code is available in the code repository for this book under ch08/jwt_validator_pyjwt_ps256.py. To run the script, generate a PS256 signed token first using the
code from listing 8.6 and paste the token into listing 8.8, replacing the <token> placeholder. If the token is valid, you’ll get the token’s payload back; otherwise, PyJWT
raises an appropriate error.
 That’s all it takes to validate tokens correctly. Let’s sum up the best practices
described in this section to validate tokens securely and avoid common mistakes:
Use a good JWT library with support for all the algorithms you need. In particular,
make sure that the library supports strong signing algorithms like PS256 and
EdDSA. Don’t compromise on this point: if a library doesn’t support the algorithms you need, choose another library. Also, make sure that the library has a
Listing 8.8
Validating tokens with a PS256 signature
We load the public key that 
corresponds to the private 
key used to sign the token.
We pass in the public key 
object as the signature’s 
validation key.
We specify the 
algorithm needed to 
validate the signature.

---

## Sección 114: CHAPTER 8 [Entropy: 0.28]

Implementing API authentication and authorization
large community. A large user base means that many eyes are on the code, that
it’s battled tested, and that any issues will likely be reported and addressed as
soon as they come up.
Make sure that the JWT library you use isn’t vulnerable to algorithm confusion attacks.
Run your own tests, following McLean’s examples, against your JWT library of
choice to verify that it’s free of such vulnerabilities.
If you use RS256, make sure that the library isn’t vulnerable to Bleichenbacher’s 2006
attack. Also, make sure that your RSA signing keys are secure, with a high exponent and a minimum size of 2,048 bits.
Hardcode the allowed algorithm in your token validation function (i.e., the allowed
value in the token header’s alg field). This prevents none attacks against your
tokens and variants of it, such as the nonE vulnerability that was found in Auth0.
Validate all the claims you can, including the token’s issuer and audience. If your JWT
library doesn’t allow you to pass additional claims for validation, as we did with
PyJWT, add your own assertions to your JWT validation function.
If you follow these practices and stick to the validation process outlined in this section,
your JWT-based authentication will be as robust and secure as it can be. Don’t overcomplicate it, keep it simple, and stick to the principles.
 So far, we’ve learned to issue and validate JWTs using our own self-generated signing keys. The process is straightforward: we use the private key to sign the token and
the public key to validate the signature, and we verify all the claims in the token’s payload. But what about situations in which we don’t issue the JWTs ourselves, such as
when we work with an external IDaaS provider? Section 8.4 answers that question.
8.4
Integrating with an OpenID Connect provider
A common way to deliver secure and reliable identity management in our APIs is to
outsource the job to a third-party IDaaS provider like Auth0, Amazon Web Services
(AWS) Cognito, Curity, Authlete, or Microsoft Entra. These services take care of managing the identity of our users securely, issuing robust access tokens in the form of
JWTs and other formats, securely managing and rotating our signing keys, and so on.
If you can’t outsource identity to an IDaaS provider, consider self-hosting a standard
OpenID Connect (OIDC) implementation like Keycloak instead of building your own
solution. In this section, we go through the steps required to set up our system to
securely issue and validate JWTs from an external IDaaS provider.
 I’ll focus the discussion on IDaaS providers that implement OpenID Connect
(OIDC), the most widely used standard for user authentication. I’ll use a specific
example of integration with Auth0; the example is generalizable because all OIDC
providers work in similar ways.
TIP
Check out appendix B for a step-by-step guide to setting up Auth0 if you
want to work through all the examples in this chapter. You’ll need an Auth0
account (free tier) correctly configured to issue your own tokens.
8.4
Integrating with an OpenID Connect provider
The code repository for this book includes a simple API under ch08/api.py. ch08/
api.py is built with Python’s popular FastAPI framework and runs on port 8000. We’ll
add authentication and the ability to issue access tokens to that API using our integration with Auth0. Specifically, we’ll implement the authorization code flow, and appendix B guides you through the process of configuring an authorization code client on
Auth0. We’ll also add the logic necessary to validate access tokens. Check out ch08/
README.md for details on running the API. Throughout this section, I’ll illustrate
some concepts using apithreats.com’s discovery endpoint because it’s also implemented with Auth0 and is publicly available.
 As we learned in chapter 7, systems that implement OIDC publish the information
we need to integrate with them in what we call the discovery endpoint, which is a URL
with the path /.well-known/openid-configuration. Google Identity’s discovery endpoint, for example, is https://accounts.google.com/.well-known/openid-configuration. The discovery endpoint tells us everything we need to know to initiate an
authorization request, obtain access tokens, validate them, and more. If you use Auth0
as your IDaaS provider, your discovery endpoint is usually your tenant’s URI followed
by the discovery endpoint’s path (/.well-known/openid-configuration). apithreats.com’s authentication, for example, is implemented with Auth0, and its discovery endpoint is https://apithreats.eu.auth0.com/.well-known/openid-configuration.
8.4.1
Logging in users and issuing access tokens with an OIDC provider
First, we’ll add to our API the capability to log users in and issue access tokens. Auth0
manages the user login process, so we need to redirect our users to Auth0 to verify
their identity and obtain an access token. This is what we call an authorization request.
In this section, we implement the authorization request with the authorization code
flow using the Auth0 client configured in appendix B. Figure 8.3 illustrates the process we are going to implement to issue access tokens. Take your time to study the figure because it represents the whole flow of requests involved in issuing a token. Let’s
briefly analyze every step in the flow so that we understand what’s going on:
The user visits our server’s GET /login page.
Our server redirects the user to our Auth0 tenant’s authorization request URL.
The user visits our Auth0 tenant’s authorization request URL.
Our Auth0 tenant prompts the user to prove their identity (i.e., to log in).
The user logs in by sending their credentials with a POST request.
Upon successful login, our Auth0 tenant asks the user whether they want to
grant the client application (in this case, the server) access to their data.
The user grants consent for the client application to access their data.
Our Auth0 tenant redirects the user back to the API server, including the
authorization code in the URL.
The user asks the server to exchange the authorization code for an access token.
The server exchanges the authorization code plus the client_id and the
client_secret for an access token.

---

## Sección 115: CHAPTER 8 [Entropy: 0.424]

Implementing API authentication and authorization
Our Auth0 tenant issues the access token, and the server sends it to the user.
Figure 8.3
Flow of requests involved in obtaining an access token. The process begins with 
the user visiting the server’s login page. The API redirects the client to Auth0’s login screen, 
where the user authenticates and grants consent; then the user is redirected back to the API 
with the authorization code, which is finally exchanged for an access token.
User
GET /login
Authorization request: Redirect (status code 307)
https://apithreats.eu.auth0.com/authorize?
response_type=code
&audience= https://apithreats.com
&client_id={client_id}
&redirect_uri=http://localhost:8000/docs
Authorization
request
Login page
POST /login
Consent screen
Grant consent.
Authorization
code response -
redirect back to
API server.
2
4
6
8
Exchange
authorization 
code + client_id 
+ client_secret 
for access token.
Issue access
token.
Auth0
authorization
server
API server
(client)
Exchange
authorization
code for access
token.
10
8.4
Integrating with an OpenID Connect provider
As shown in the figure, when the user visits the GET /login URL in our server, we must
redirect them to our Auth0 tenant’s login screen using the authorization request
URL. Our first task, then, is to figure out how we construct the authorization request
URL. The discovery endpoint’s response includes a field called authorization_
endpoint, which is the URL we must use to initiate the authorization request. For apithreats.com, the authorization endpoint is https://apithreats.eu.auth0.com/authorize. From section 4.1.1 of the OAuth 2.1 specification [14], we know that the
authorization request must include the following parameters:

response_type—The type of response we’ll receive from the authorization
request. The acceptable values are listed in the response_types_supported field
in the discovery endpoint’s response. To obtain an access token, for example,
the value is code, and to obtain an access token plus an ID token, the value is
code id_token.

client_id—The ID of our client application.
If we have multiple APIs configured in our IdP, we also need to specify the audience
(the API we want to access), and if we have multiple redirect URIs configured, we
must specify which one we want to use. The full authorization request URL looks like
this (using apithreats.com’s example):
https://apithreats.eu.auth0.com/authorize?response_type=code
➥&audience=https://apithreats.com&client_id={client_id}
➥&redirect_uri=http://localhost:8000/docs
We parameterize the client_id so that we can run the application with different clients, such as a test client, a development client, and a production client. In this case,
we’re running the application with a test client that allows us to run the whole process
locally, so the redirect_uri points to the localhost. With this information at hand, we
add a login route to our API, as shown in listing 8.9.
 We begin by importing the utilities we need from Python’s os module, FastAPI,
and Starlette. Because we’re parameterizing the client_id, we attempt to pull its value
from an environment variable named AUTH0_CLIENT_ID, and we run an assertion to
check that it’s been set; otherwise, we exit the program immediately. The ellipsis omits
the API implementation for which we’re adding authentication (you can check the
full implementation in file ch08/api.py in the code repository for this book). Finally,
we create a GET /login endpoint that redirects the user to the authorization endpoint
with all the expected parameters set.
NOTE
Starlette is the web framework on top of which FastAPI is built. To
learn more about Starlette and FastAPI, see chapter 2 of José Haro Peralta’s
Microservice APIs.
# file: ch08/api.py
import os
Listing 8.9
Making an authorization request with the authorization code flow

---

## Sección 116: CHAPTER 8 [Entropy: 0.635]

Implementing API authentication and authorization
from fastapi import FastAPI
from starlette.responses import RedirectResponse
client_id = os.getenv("AUTH0_CLIENT_ID") 
assert client_id is not None, "AUTH0_CLIENT_ID environment variable needed"
server = FastAPI()
...
@server.get("/login") 
def login():
 return RedirectResponse( 
 "<authorization_endpoint>"
 "?response_type=code"
 f"&client_id={client_id}"
 "&redirect_uri=http://localhost:8000/docs"
 "&audience=<audience>"
 )
To try the code in this listing, be sure to replace the <authorization_endpoint> placeholder with your own tenant’s authorization endpoint and the <audience> placeholder with your own audience. Then cd into the ch08/ directory, activate the virtual
environment (instructions are in ch08/README.md in the book’s GitHub repository), and run the following command to start the API server:
uvicorn api:server --reload
When the server is up and running, open a browser and visit http://localhost:8000/
login, which takes you to your Auth0 tenant’s login page. You’ll need to create an
account first. After successfully logging in, you’ll be redirected to http://localhost
:8000/docs. If you check the URL, you’ll notice a code parameter in the URL, as
shown in figure 8.4. That parameter is the authorization code, and you’ll need to
exchange it for an access token.
 To exchange the authorization code for an access token, you send a request to the
token endpoint. The token endpoint’s URL is available in the discovery endpoint’s
response under the token_endpoint field. For apithreats.com, the token endpoint is
https://apithreats.eu.auth0.com/oauth/token. The specific semantics of the request
vary according to the provider and the authorization flow. For the authorization code
flow, Auth0 requires the following parameters:

grant_type—The authorization flow. For the authorization code flow, the value
is authorization_code.

client_id—The ID of our client application.

client_secret—Our client application’s secret.

code—The authorization code.

redirect_uri—The same redirect URI we passed in the authorization request.
 
We load the client ID 
from the environment.
We define a 
GET /login endpoint.
We redirect users to 
our authorization 
server’s login page.
8.4
Integrating with an OpenID Connect provider
Figure 8.4
After successful login, Auth0 redirects the user to our site. In the URL, you’ll see a code parameter, 
which contains the authorization code we must exchange for the access token.
We send those parameters over a POST request using the x-www-form-urlencoded
MIME type, as shown in the following listing. Listing 8.10 extends the code from listing 8.9 by adding a new endpoint that allows us to exchange the authorization code
for an access token. The new code is highlighted in bold, and some of the previous
code is omitted with ellipses. We pull the client ID from an environment variable
named AUTH0_CLIENT_SECRET, and as we did earlier, we check with an assertion that it’s
correctly set before proceeding. The new GET /token endpoint requires a URL query
parameter named code, which is the authorization code, and sends it along with the
other required parameters to the authorization server’s token endpoint. Finally, we
return the response from the authorization endpoint.
# file: ch08/api.py
import os
import requests
from fastapi import FastAPI
from starlette.responses import RedirectResponse
client_id = os.getenv("AUTH0_CLIENT_ID")
client_secret = os.getenv("AUTH0_CLIENT_SECRET") 
assert client_id is not None, "AUTH0_CLIENT_ID environment variable needed"
assert (
 client_secret is not None,
 "AUTH0_CLIENT_SECRET environment variable needed"
)
Listing 8.10
Exchanging the authorization code for an access token
http://localhost:8000/docs?code=wj6KN6dem90Z69F9fV0G0_yMppxnggge4ZPVSgoQ7Rcoy
We load the client secret 
from the environment.

---

## Sección 117: CHAPTER 8 [Entropy: 0.575]

Implementing API authentication and authorization
server = FastAPI()
...
@server.get("/token") 
def get_access_token(code: str): 
 payload = ( 
 "grant_type=authorization_code"
 f"&client_id={client_id}"
 f"&client_secret={client_secret}"
 f"&code={code}"
 "&redirect_uri=http://localhost:8000/docs"
 )
 headers = { 
 "content-type": "application/x-www-form-urlencoded"
 }
 response = requests.post( 
 "<token_endpoint>",
 payload, headers=headers
 )
 return response.json() 
To test the new endpoint, replace the <token_endpoint> placeholder with your own
tenant’s token endpoint. Then start the API server and log in again. You’ll be redirected to http://localhost:8000/docs, with the authorization code displayed in the
URL, as we saw in figure 8.3 earlier. Copy the code and send it to the new GET /token
endpoint using the Swagger UI (figure 8.5) to obtain your access token.
 
Figure 8.5
To exchange the authorization code for an access token, copy the code’s value and paste it 
in the Code field of the GET /token endpoint. Then click the Execute button, and you’ll get the API 
response with the access token in it.
We define a 
GET /token endpoint.
We capture the 
authorization code through 
the code query parameter.
We define the payload 
needed to request the 
access token.
The token request’s content 
type is application/x-wwwform-urlencoded.
We send the token request to the 
authorization server over POST.
We return the authorization 
server’s JSON response.
xv
xv
xv
API response with
the access token
8.4
Integrating with an OpenID Connect provider
Now we can issue access tokens for our API. The next step is validating those access
tokens to protect our API from unauthorized requests.
8.4.2
Validating access tokens issued by an OIDC provider
Validating access tokens from an IDaaS provider follows the process we saw in section
8.3 to validate tokens signed with our own signing keys. We need to load the public
key to validate the signature and verify all the claims in the token’s payload. In this
case, of course, we don’t have a public key lying around in our filesystem, so how do
we find it? The discovery endpoint provided by our IDaaS provider contains a JSON
Web Key Sets (JWKS) endpoint under the field jwks_uri. The JWKS endpoint contains the list of public keys available to validate signatures in the tokens issued by the
IDaaS provider. For apithreats.com, the JWKS endpoint is https://apithreats.eu.auth0
.com/.well-known/jwks.json.
DEFINITION
JSON Web Key (JWK) is a standard JSON data structure for representing cryptographic keys. The fields in the JWK object contain properties of
the cryptographic key needed to load and use the key correctly to validate a
signature. The kty field, for example, indicates the type of key, and the kid
field indicates the ID of the key. OIDC providers publish the keys available for
validating token signatures in the JWKS endpoint. To learn more about the
JWK specification, check out RFC 7518 [10].
The JWKS endpoint’s response contains an array of keys. Here’s an example of JWK
from apithreats.com:
{
 "kty": "RSA",
 "use": "sig",
 "n": "1F72TCRTs6TOXp3pN3sczKIw6OlZtuu_IV5nyrv3OpXEwuf_kOxmd-Gk2F1AwfTdUdH
➥MoMa5whwYVTemamUPDcmm_mkSLdKYscGWjsWAJc6BewO2rtecqk_BCWwQ5EVFreAjQVFeq
➥yUHvg8YJX40T_KFsHAhiOzVp5vxSPxdyKQFTErYS8e4Pwf5rigPVk02IkKPYOE9U71fYFi
➥eP9OHVbTM34qTzR3dekc9CPz5P05ZFSSs32ZfOCXtMEhyJB2ky5LHqzjbAmE8ahXdZbo9V
➥U9juk4THKbHa-s1_1El8frRwGm3FANMePZDGNT73h-Q6n_QFEhewv-dMWHdCB8-NQ",
 "e": "AQAB",
 "kid": "080E8CtRFAnnLlgK3dk8Y",
 "x5t": "bGbu8vMg1fEwLf8eJ-pEltvuEKw",
 "x5c": ["MIIDCTCCAfGgAwIBAgIJAqiJX3yiNIe0MA0GCSqGSIb3DQEBCwUAMCIxIDAeBgNVB
➥AMTF2FwaXRocmVhdHMuZXUuYXV0aDAuY29tMB4XDTI0MDMxMzA5MjYxMVoXDTM3MTEyMDA
➥5MjYxMVowIjEgMB4GA1UEAxMXYXBpdGhyZWF0cy5ldS5hdXRoMC5jb20wggEiMA0GCSqGS
➥Ib3DQEBAQUAA4IBDwAwggEKAoIBAQDUXvZMJFOzpM5enek3exzMojDo6Vm2678hXmfKu/c
➥6lcTC5/+Q7GZ34aTYXUDB9N1R0cygxrnCHBhVN6ZqZQ8Nyab+aRIt0pixwZaOxYAlzoF7A
➥7au15yqT8EJbBDkRUWt4CNBUV6rJQe+DxglfjRP8oWwcCGI7NWnm/FI/F3IpAVMSthLx7g
➥/B/muKA9WTTYiQo9g4T1TvV9gWJ4/04dVtMzfipPNHd16Rz0I/Pk/TlkVJKzfZl84Je0wS
➥HIkHaTLkserONsCYTxqFd1luj1VT2O6ThMcpsdr6zX/USXx+tHAabcUA0x49kMY1PveH5D
➥qf9AUSF7C/50xYd0IHz41AgMBAAGjQjBAMA8GA1UdEwEB/wQFMAMBAf8wHQYDVR0OBBYEF
➥PELWkxRblScUr4R+HX0TKM9rM9vMA4GA1UdDwEB/wQEAwIChDANBgkqhkiG9w0BAQsFAAO
➥CAQEADECVWKF7+OtKpJoXpv2CpbnLraoazNMJUJ+Y4CHpIJt/ikL8GT5psRL+zQ5089dMr
➥VDPr4r3vmIq99NhvAnF7KUTGdSNqIQf7uBQffJqxfSNCrf0a6yitgDtCHEXxTNp7E7iesE
➥HNuF26J31s/3iiEY9qjvxtiyPG5sCViLFS8Jt593oiwm5s2e1egaS4LeD75S8+zxoN+MVf
➥AUmq9DF/XHrM4MurTbJ0A64rb/ngGMocFUh3ZvtbZt0ylgrQ6Se3lQWSqkmg2lbBpjWll7
➥bvk3hkM6Tzms+BFBYgRADCRa5Npg7ojqhGc9nnX8EkuGaanmvsauK1i4r8MBAC4fdkQ=="
➥],

---

## Sección 118: CHAPTER 8 [Entropy: 0.592]

Implementing API authentication and authorization
 "alg": "RS256"
}
The exact representation of the keys depends on the type of key and signing algorithm. The preceding JWK represents an RSA signing key. Let’s break it down to
understand what kind of information we have in the JWK:

kty—Stands for the key type and identifies the cryptographic algorithm family
used with the key, such as RSA.

use—Indicates whether the public key is used for encrypting data or verifying
the signature. For encryption, use’s value is enc, and for signature validation, it’s
sig.

n—The RSA key’s modulus, represented as the base64url encoding of the integer in octets.

e—The RSA key’s public exponent, represented as the base64url encoding of
the integer in octets.

kid—Stands for the key ID and represents a unique identifier for the key.

x5t—Stands for the X.509 certificate SHA-1 thumbprint, also known as the certificate fingerprint. A certificate thumbprint is the base64url encoding of the result
of applying a hashing function (in this case, SHA-1) over the X.509 certificate.

x5c—Stands for the X.509 certificate chain and represents the chain of certificates bound to the public key. Each certificate is base64url encoded. The first
element in the array represents the public key we must use to validate the
token’s signature.

alg—Stands for algorithm and identifies the algorithm used to sign the token
with this key.
When you use RSA signing keys, IDaaS providers give you the details on the signing
key’s certificate, which contains the public key. The certificates are represented using
the X.509 standard, a widely used format for representing RSA certificates. To learn
more about the details included in the JWKS endpoint, check out RFC 7517 [15] and
RFC 7518 [10].
 Now let’s look at the contents of the JWT issued by Auth0 to understand how to
use the information from the JWKS endpoint to validate the token. Here are the
header and payload of one such token issued by apithreats.com:
# Token header
{
 "alg": "RS256",
 "typ": "JWT",
 "kid": "080E8CtRFAnnLlgK3dk8Y"
}
# Token payload
{
 "iss": "https://apithreats.eu.auth0.com/",
 "sub": "6faab069",
 "aud": "https://apithreats.com",
8.5
Adding authorization middleware
 "iat": 1732014181,
 "exp": 1732100581,
 "azp": "QDg7IrUH8jJ27ibGDRaEG5qW24dGOeWH"
}
From the header, we know that the ID of the key (kid field) used to sign the token is
080E8CtRFAnnLlgK3dk8Y. We use this information to find the JWK we need to validate the
token’s signature. Depending on the JWT library we’re using, we’ll have different
implementations for handling the JWKS and using them for validation. PyJWT provides
a PyJWKClient class that loads the keys directly from the JWKS endpoint. The next listing gets an instance of that class and assigns it to a variable named jwks_client. PyJWK-
Client exposes various methods for finding the key, one of them named
get_signing_key_from_jwt(), which the following code uses to retrieve the key. Finally,
we invoke PyJWT’s decode() function, passing it the token, the JWK object, the allowed
signing algorithms, the audience, and the issuer we expect in the token’s payload.
# file: ch08/api.py
import os
import jwt
[...]
jwks_endpoint = os.getenv("JWKS_ENDPOINT") 
assert jwks_endpoint is not None, "JWKS_ENDPOINT env variable needed"
jwks_client = jwt.PyJWKClient(jwks_endpoint) 
def validate_token(token, audience): 
 return jwt.decode(
 jwt=token,
 key=jwks_client.get_signing_key_from_jwt(
 token 
 ),
 algorithms=["RS256"], 
 audience=audience,
 issuer="<issuer>",
 )
[...]
Now we are in a position to issue and validate tokens from an IDaaS provider. 
8.5
Adding authorization middleware
The next step is including the validate_token() function in our API to protect our endpoints from unauthorized access. We’ll do that with custom middleware in this section.
Web servers, including APIs, often have tasks that they must perform on every request.
Figure 8.6 illustrates some of those tasks, like configuring headers correctly in every
response, making sure that they include the right cross-origin resource sharing (CORS)
Listing 8.11
Validating a JWT using the JWKS endpoint
We load the JWKS endpoint 
from the environment.
We instantiate a PyJWKClient 
object using the JWKS endpoint.
We define a function to 
validate access tokens given 
the token and audience.
We load the signing key 
from the JWKS endpoint.
We specify the expected 
signing algorithm.

---

## Sección 119: CHAPTER 8 [Entropy: 0.64]

Implementing API authentication and authorization
and Content-Security-Policy configuration. If the web server uses cookies, middleware
ensures that cookies are configured correctly. If the server uses cross-site resource forgery (CSRF) tokens, middleware ensures that they’re injected into every form.
Figure 8.6
Processing a request involves a series of common tasks such as validating the headers, validating 
authentication, parsing and validating the request body, configuring CORS response headers, and so on. Because 
these are common tasks that must be applied to all requests, web servers normally implement them in the 
middleware.
For APIs, a common task is validating request and response bodies, making sure that
their data conforms to the API schemas and data models. It would be cumbersome to
add all these capabilities manually to every endpoint; instead, web servers use middleware to define common tasks that will be applied to every request. One such task is validating user access in every request, which is typically done in authorization middleware. In this section, we’ll add authorization middleware to our API.
NOTE
Should we validate access tokens in our API implementation code or
outsource this functionality to a component such as an API gateway? As you’ll
learn in chapter 9, API gateways can validate access tokens and more, and if
you have one, you should use it for that purpose. Bear in mind, however, that
like any other piece of software, an API gateway can malfunction, so you want
to have a reliable fallback in your code to validate access tokens. Also note
that API gateways may not be able to validate all access tokens, especially if
yours have custom claims. Finally, some of your APIs may not be fronted by
API gateways. In such a case, add authorization middleware to your applications as described in this section.
Every web and API framework has its own way of creating custom middleware. The API
under ch08/api.py in the code repository for this book is implemented with FastAPI,
API server
User
Preparing response
Parse request body.
Validate request body.
Validate headers.
Validate authentication.
Configure CORS
response headers.
Serialize and validate
response data.
Processing request
...
Middleware
POST /orders HTTP/1.1
Host: localhost
Content-Type: application/json
Authorization: Bearer <token>
{payload...}
HTTP request
8.5
Adding authorization middleware
which allows us to add authorization middleware in various ways. One common way is
to create a standard middleware class; another is to use dependency injection. FastAPI’s
dependency injection system ships with utilities that know how to handle bearer tokens;
they also update the OpenAPI specification automatically with the corresponding security schemes. Among other things, that means we’ll be able to keep using the Swagger
UI under the /docs URL to access protected endpoints. For those reasons, we’ll use
dependency injection to create our authorization middleware.
 The following listing shows how to add authorization to the API using dependency
injection. The code builds on listing 8.11, highlighting the new additions in bold and
omitting (with ellipses) the code we explained earlier.
# file: ch08/api.py
import os
from typing import Annotated
import jwt
import requests
from fastapi import FastAPI, HTTPException, Depends
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from jwt import PyJWTError
from starlette.responses import RedirectResponse
[...]
def validate_token(token, audience):
 [...]
security = HTTPBearer() 
def authorize_access(
 creds: Annotated[ 
 HTTPAuthorizationCredentials, Depends(security)
 ]
):
 try: 
 return validate_token(token=creds.credentials, audience=<audience>)
 except PyJWTError as error: 
 raise HTTPException(status_code=401, detail=str(error))
@server.get("/protected-hello")
def protected_hello( 
 user_claims: dict = Depends(authorize_access)
):
 return { 
 "message": f"hello {user_claims['sub']}"
 }
The core of the implementation is the authorize_access() function, which we inject
into every protected endpoint using FastAPI’s Depends() function. Depends() allows us
Listing 8.12
Authorizing requests in FastAPI using dependency injection
We create a JWT bearer 
scheme object with 
FastAPI’s HTTPBearer().
The HTTPAuthorizationCredentials annotation 
requires the JWT in the Authorization header.
We open a try/except block 
to validate the access token.
If the token is invalid,
we respond with a
401 status code.
We protect the endpoint by 
injecting authorize_access() 
as a dependency.
If the token is valid, we 
return a hello message with 
the token’s sub claim.

---

## Sección 120: CHAPTER 8 [Entropy: 0.502]

Implementing API authentication and authorization
to include custom processing steps in each request, such as applying the authorize_
access() function. authorize_access() takes a parameter named creds with a special
type annotation:
Annotated[HTTPAuthorizationCredentials, Depends(HTTPBearer())]
Annotated is a special type annotation in Python that allows us to specify the parameter’s type and some metadata, using the format Annotated[<type>, <metadata>]. In
our case, HTTPAuthorizationCredentials represents the type of creds, and the metadata, Depends(security), is another dependency injection that includes additional
information about the credential’s format and how it should be handled. security is
an instance of the HTTPBearer class, so it’s telling FastAPI that we expect a bearer
token in the Authorization header. Using this metadata, FastAPI knows where to look
for the bearer token (the Authorization header) and how to retrieve the token itself:
by separating the Bearer prefix from the token itself. It uses the token to create an
instance of the HTTPAuthorizationCredentials class and returns it.
 authorize_access() uses the validate_token() function we implemented in listing
8.12 to validate the token and wraps the call within a try/except block to return an
appropriate error response when token validation fails. If the token is valid, we return
the token’s payload.
 We inject authorize_access() on every endpoint we want to protect by declaring it
as a dependency, as shown in the GET /protected-hello endpoint. GET /protectedhello’s router takes one parameter named user_claims, which represents the token’s
payload returned by authorize_access(). This allows us to inspect the user claims to
perform additional access control checks in our controller or our business layer. In
this case, we use the sub field from the token’s payload to return a customized message to the user.
 To try out the code in listing 8.12, run the server by executing the following command from the terminal:
uvicorn api:server --reload
Navigate to the /docs page and click the GET /protected-hello endpoint; you’ll
receive a 403 (Forbidden) status code response with the message Not authenticated.
Technically, the right status code here is a 401 (Unauthorized) since the user lacks credentials. This is a known bug in FastAPI that is being addressed (https://github.com/
fastapi/fastapi/issues/10177). To authenticate your requests, perform the login flow
to obtain an authorization code and exchange it for an access token, following the
steps described in section 8.4.1. Then click the Authorize button in the UI, paste the
access token, and call the GET /protected-hello endpoint, as shown in figure 8.7. If
you followed the steps correctly, this time you’ll obtain a successful response.
 Pause a moment to think about what we’ve achieved so far. We’ve integrated with a
standard OIDC provider, issued access tokens, and added a robust authorization layer
to our API. Everything we’ve done so far adds a great layer of security to our API, but
we can do more. In the remaining sections of this chapter, we’ll authorize access controls based on user roles.
8.6
Implementing role-based access controls
 
Figure 8.7
To authenticate requests in the Swagger UI, open the authorization panel, paste the token, click 
Authorize, close the panel, and execute the request.
8.6
Implementing role-based access controls
Most APIs have a concept of use roles or groups, and as discussed in chapter 7, we can
use this feature to harden the access controls in our API. A ride-sharing application,
for example, might distinguish between drivers and passengers, each with a distinct
set of privileges and access to different endpoints. In this section, you’ll learn to add
such role-based access controls to your APIs.
 User roles must be configured on our IDaaS provider and assigned to each user.
Every IDaaS provider has its own process for creating user roles, so please check out
Click Authorize to open
the authorization form.
Paste the
access token.
Click Authorize.
Click Close.
Execute the request.

---

## Sección 121: CHAPTER 8 [Entropy: 0.25]

Implementing API authentication and authorization
their documentation and follow the right steps. Appendix B contains a guide to creating permission sets and user roles, showing how to assign them to user groups in Auth0.
It also explains how to restrict access to certain APIs from specific clients. Follow the
steps in appendix C if you want to follow along with the examples in this section.

---

## Sección 122: Appendix B creates an admin API, an admin client, and an admin user role. It also [Entropy: 0.59]

configures the Auth0 tenant to provide exclusive access to the admin API from the
admin client. In this section, we add an admin endpoint to the API under ch08/api.py
and restrict its access to users with admin roles.
 The first step is allowing users to log in as admins. To log in as an admin, a user
must have the admin role assigned to them, and they must request access to the
admin API during the login process. To make this happen, we create a new login flow
for admin users, as shown in the next listing. This listing builds on the code we’ve written so far in ch08/api.py, with the previous code omitted with ellipses. Because the
admin login flow uses a different client, we pull the admin client ID from the environment and make sure that the value is set. Then we add the GET /admin/login endpoint, which is similar to the GET /login endpoint from listing 8.9 but has two
important differences: we request access to the admin API through the audience
parameter, and we use the admin client’s ID.
# file: ch08/api.py
[...]
admin_client_id = ( 
 os.getenv("AUTH0_ADMIN_CLIENT_ID")
)
assert (
 admin_client_id is not None,
 "AUTH0_ADMIN_CLIENT_ID env variable needed."
)
@server.get("/admin/login") 
def admin_login():
 return RedirectResponse( 
 "<authorization_endpoint>"
 "?response_type=code"
 f"&client_id={admin_client_id}"
 "&redirect_uri=http://localhost:8000/docs"
 "&audience=<audience>"
 )
To run the code, replace the <authorization_endpoint> placeholder with your
tenant’s authorization endpoint and the <audience> placeholder with your own audience. When the user logs in through the GET /admin/login endpoint, they’re redirected to the /docs page with the authorization code in the URL. To exchange the
authorization code for an access token, we add a new GET /admin/token endpoint that
uses the client_secret from the admin client to perform the exchange, as shown in
Listing 8.13
Adding an admin role–specific login flow
We load the admin client’s 
ID from the environment.
We define a 
GET /admin/login endpoint.
We redirect users to our 
authorization server’s login page.
8.6
Implementing role-based access controls
the next listing. We pull the admin client’s secret from the environment and then
implement the GET /admin/token endpoint using the admin client’s credentials.
# file: ch08/api.py
[...]
admin_client_secret = ( 
 os.getenv("AUTH0_ADMIN_CLIENT_SECRET")
)
assert (
 admin_client_secret is not None,
 "AUTH0_ADMIN_CLIENT_SECRET env variable needed."
)
@server.get("/admin/token") 
def get_admin_access_token(code: str):
 payload = ( 
 "grant_type=authorization_code"
 f"&client_id={admin_client_id}"
 f"&client_secret={admin_client_secret}"
 f"&code={code}"
 "&redirect_uri=http://localhost:8000/docs"
 )
 headers = {"content-type": "application/x-www-form-urlencoded"}
 response = requests.post( 
 "<token_endpoint>",
 payload, headers=headers
 )
 return response.json() 
To run the code, replace the <token_endpoint> placeholder with your tenant’s token
endpoint. The admin login flow is complete. Now we can log in as admins and obtain
admin access tokens. We can also add admin endpoints that are accessible only to
admin users. The following listing adds one such endpoint: GET /admin/hello. To validate admin access, we create a new authorize_admin_access() function with the signature introduced in listing 8.12, which allows FastAPI to process the credentials as a
bearer token in the Authorization header. authorize_admin_access() checks that the
audience in the token is set to the expected value and that the token’s payload contains a permissions array with the admin role in it. If those conditions aren’t met, we
respond to the user with a 401 status code. Finally, we add a GET /admin/hello endpoint with a dependency on the authorize_admin_access() function, which ensures
that only admin users can access it.
# file: ch08/api.py
[...]
Listing 8.14
Exchanging the authorization code for an admin access token
Listing 8.15
Restricting access to admin endpoints to admin users
We load the admin client’s 
secret from the environment.
We define a 
GET /admin/token endpoint.
We prepare the payload needed 
to obtain an admin access token.
We send the token request to the 
authorization server over POST.
We return the authorization 
server’s response.

---

## Sección 123: CHAPTER 8 [Entropy: 0.523]

Implementing API authentication and authorization
def authorize_admin_access( 
 creds: Annotated[HTTPAuthorizationCredentials, Depends(security)]
):
 try:
 claims = validate_token(
 creds.creds, audience="<audience>"
 )
 except PyJWTError as error:
 raise HTTPException(status_code=401, detail=str(error))
 if ( 
 "admin" not in claims.get("permissions", []
 ):
 raise HTTPException(
 status_code=401, detail="This endpoint is only for admins"
 )
 return claims
@server.get("/admin/hello")
def admin_hello( 
 user_claims: dict = Depends(authorize_admin_access)
):
 return {"message": f"hello admin {user_claims['sub']}"}
To test the new additions to the API, replace the <audience> placeholder with your
API’s admin audience. Then set the required environment variables, AUTH0_ADMIN_
CLIENT_ID and AUTH0_ADMIN_CLIENT_SECRET, in your environment, and start the server
with the command uvicorn api:server --reload. Visit the admin login page on
http://localhost:8000/admin/login in your browser and log in; then exchange the
authorization code for an access token using the GET /admin/token endpoint. Authorize your requests, following the steps in figure 8.7, and hit the GET /admin/hello endpoint. If you’ve done everything correctly, you’ll get a successful response from the
API.
 We’ve added robust authentication and authorization to our API, following wellestablished standards and best practices. Follow the steps outlined in this chapter to
authenticate and authorize requests to your APIs, and keep the process lean and simple to prevent common flaws and maintain a strong security posture.
Summary
OpenAPI uses security schemes to describe API authentication and authorization. A security scheme describes how users obtain access tokens and authorize
their requests, including details such as the authorization endpoint, the type of
token and its placement, and the access scopes.
We can apply a security scheme to the whole API using OpenAPI’s global security field, or we can apply it per operation, using the security field available
under the URL path’s HTTP method.
To work with JWTs, we must use robust libraries that support a wide variety of
signing algorithms, including PS256.
We define a function to
validate admin tokens.
We check whether the token 
has admin permissions.
We protect the endpoint with the 
admin authorization function.
Summary
To sign JWTs using an asymmetric algorithm, we need a public and private key
pair, which we can generate using OpenSSL’s genpkey command. We sign the
token with the private key and validate the signature with the public key.
When validating JWTs, check all the token’s claims and constrain the choice of
signing algorithm to prevent attacks that manipulate the token’s alg field.
When we use an OIDC provider, all the information we need to integrate with it
is available under the discovery endpoint at the following URL path: /.wellknown/openid-configuration.
To issue an access token through an OIDC provider, we redirect the user to the
OIDC’s authorization endpoint. After authenticating successfully, the user is
redirected to our site with an authorization code, which we exchange for the
access token.
To validate access tokens issued by an IDaaS provider, we must find the right key
to validate the token’s signature. The list of keys is available under the OIDC’s
JWKS endpoint. We use the token header’s kid field to find the key, and we use
the parameters in the JWK object to load the public key and use it to validate
the token’s signature.
To authorize a request, we check whether the access token is valid. This task
must be performed on every request, and it is best practice to do it in server
middleware.
To restrict access to certain operations to specific groups of users, we use RBAC.
A common implementation includes the user role in the access token’s payload
and checks whether the token contains the right user group in RBAC-protected
operations.
Secure API infrastructure
When we are ready to deploy our APIs, we have to think about how to protect the
infrastructure in which they’re going to operate. In previous chapters, you learned
how to make APIs secure by design, implement robust authentication and authorization systems, and so on. These techniques help prevent application-level attacks.
As you’ll learn in this chapter, other forms of attacks target lower levels of the networking stack, such as port scanning and denial-of-service (DoS) attacks, which can
compromise your security posture. You’ll learn about the vulnerabilities threat
actors exploit to perform such attacks and see how you can harden your servers
and use off-the-shelf solutions to protect your infrastructure.
This chapter covers
Improving API management with API gateways
Configuring secure network topologies
Protecting APIs from attacks against OSI 
layers 3–6
Preventing application-level attacks with web 
application firewalls
9.1
API gateways
 You’ll learn about the effect of your network topology on your security posture.
API infrastructure includes multiple elements, such as web servers, databases, and
queues, and not all of them should be exposed directly to external users or allowed to
receive external traffic. You’ll learn how to create restricted access to your API infrastructure with bastion servers, establish a demilitarized zone for your inbound traffic,
and prevent lateral movement between your servers.
 When it comes to managing and protecting APIs, two technologies help you
improve your security posture with minimal effort: API gateways and web application
firewalls (WAFs). This chapter begins with an in-depth discussion of API gateways,
showing how they help you manage your API inventory, control the attack surface,
improve visibility and monitoring, and apply consistent access controls and secure
configuration to all requests and responses. The chapter closes with an overview of
WAFs, discussing the ways they secure APIs, the types of exploits they protect against,
and their limitations. As you’ll see, the technologies and solutions discussed in this
chapter can significantly improve your API security posture with minimal effort, but
they are not silver bullets. Ultimately, the fate of your security relies on the correct
application of all the practices and techniques discussed in this book.
9.1
API gateways
API gateways are tools that simplify the process of APIs governance. API governance
involves publishing and retiring APIs, exposing their documentation, applying consistent standards to API documentation, enforcing their use policies, controlling access,
monitoring them, and so on. As illustrated in figure 9.1, API gateways perform many
of those functions by sitting between the API client and the API servers. API gateways
are particularly useful when we have multiple APIs because they help us apply the
same standards consistently across all our APIs.
DEFINITION
An API gateway, in the sense used in this chapter, is API management-solution software. The concept, however, originates in a pattern that
exposes a single entry point for multiple backend APIs. To learn more about
the API gateway pattern, see Chris Richardson’s Microservice Patterns [1]. Modern implementations of the API gateway pattern have additional features that
simplify API governance, including authentication and authorization checks,
monitoring, inventory management, schema validation, and rate limiting.
API gateways emerged as a pattern in microservices architecture to address the complexities of accessing multiple types of APIs across different endpoints. Originally, API
gateways served three major goals:

---

## Sección 124: CHAPTER 8 [Entropy: 0.25]

Providing a single entry point for all services
Translating various API styles into a single style
Implementing the backends-for-frontends pattern

---

## Sección 125: CHAPTER 9 [Entropy: 0.28]

Secure API infrastructure
Figure 9.1
API gateways serve as single entry points to multiple backend APIs, helping us provide a 
unified API style, manage our API inventory, apply consistent access controls and security configuration, 
and improve observability.
“Providing a single entry point for all services” means implementing service and API
discovery. Figure 9.2 shows a microservices architecture for an e-commerce site. The
backend consists of multiple APIs, each deployed across various computing choices,
such as serverless, Kubernetes clusters, and dedicated servers. As the figure shows,
without some intermediary layer that brings everything together, API clients must
access every API on their own URIs. This places a big responsibility on the API clients,
which must know where and how to access each API. It also makes it more difficult to
secure our platform because we have multiple entry points with different infrastructure characteristics that we must secure and harden individually. Further, every API is
responsible for implementing its own authentication and authorization controls,
inventory management, and monitoring solutions. API gateways solve this problem by
serving as the entry point to our platform and redirecting every request to the corresponding service.
 The second use for API gateways is to translate protocols and API styles. As illustrated in figure 9.3, the microservices in an e-commerce application may expose different types of APIs, such as REST, GraphQL, gRPC, and asynchronous APIs
(AsyncAPI) using MQTT. In that scenario, it would be cumbersome for API clients to
implement integrations with all those API styles, so an API gateway works as a translation layer and exposes a unified API style, such as REST in figure 9.3.
 
API gateway
API client
Payments API
(REST API)
Orders API
(GrapQL API)
Inventory API
(AsyncAPI)
Authentication and
authorization
Catalog and inventory
management
Logs and monitoring
9.1
API gateways
 
Figure 9.2
Without an API gateway, clients must know where and how to access each API. Every API 
must implement its own access controls, inventory management, and observability solutions.
NOTE
MQTT is a lightweight publish–subscribe messaging protocol for asynchronous communication between machines. It’s a popular protocol for the
Internet of Things (IoT). The Amazon Web Services (AWS) IoT platform, for
example, is built on top of MQTT (https://docs.aws.amazon.com/iot).
MQTT originally stood for Message Queuing Telemetry Transport, but in 2013,
the MQTT technical committee decided that MQTT should be used exclusively and is not an abbreviation anymore [2].
Payments API
(REST)
[server 1]
Orders API
(GraphQL)
[server 2]
Inventory API
(AsyncAPI)
[serverless]
Authentication and
authorization
Authentication and
authorization
Authentication and
authorization
Catalog and inventory
managent
Catalog and inventory
management
Catalog and inventory
management
Logs and monitoring
Logs and monitoring
Logs and monitoring
API client
Payments API
(REST API)
Orders API
(GraphQL API)
Inventory API
(AsyncAPI)
API gateway
Unified REST
interface
API style and
protocol
translation
API style and
protocol
translation
Figure 9.3
An API 
gateway can serve as a 
protocol and API style 
translation layer, 
helping us provide a 
unified API style to our 
consumers. Our 
backend might consist 
of GraphQL, REST, and 
asynchronous APIs, and 
we can expose them all 
as a REST interface 
through an API gateway.

---

## Sección 126: CHAPTER 9 [Entropy: 0.25]

Secure API infrastructure
The third use for API gateways is to implement the backends-for-frontends pattern.
The APIs that backend services expose aren’t necessarily tailored to the needs of API
clients. As shown in figure 9.4, a social media application may have two types of clients: mobile and web applications. Due to the constraints of mobile applications,
including limited storage and network connectivity, we want to minimize the number
of requests we send to the server and the amount of data we retrieve. To accomplish
that goal, we create an API gateway for the mobile application that aggregates data
from multiple backend APIs, saving the mobile application multiple roundtrips to the
server and ensuring that it gets only the data it needs. By filtering out the data that the
client doesn’t need, the API gateway helps us address the problem of excessive data
exposure (discussed in chapter 4).
Figure 9.4
API gateways help us implement the backends-for-frontends 
pattern. The goal is to encapsulate the complexity of our backend APIs 
and expose interfaces that are tailored to the needs of our clients.
Modern API gateways can serve the purposes we’ve discussed so far and more. Most
API gateways nowadays also support the following features:
Managing API inventory
Enforcing access controls
Validating request and response data
Applying security configuration to responses
Rate-limiting requests
Collecting access logs and producing API usage analytics
Managing API inventory means managing our API’s life cycle and surface exposure. As
discussed in chapter 3, two major problems stemming from improper inventory management are shadow and zombie APIs. Zombie APIs are deprecated APIs that should
have been retired but are still exposed. As our APIs evolve, we add features, improve
API gateway
web backend
API gateway
mobile backend
Payments API
(REST API)
Orders API
(GraphQL API)
Inventory API
(AsyncAPI)
9.1
API gateways
capabilities, and enhance security. Often, these changes are backward incompatible, so
we must release new versions of our APIs. As illustrated in figure 9.5, at any point, we
may have various versions of our APIs live at the same time, and it’s important to have
a robust process for retiring old versions. Failing to do so means we end up with deprecated APIs running in production. These APIs are less secure and no longer being
monitored—hence, zombie APIs.
Figure 9.5
API gateways provide an effective solution to API inventory management. By channeling all 
inbound traffic through the API gateway, we take a declarative approach to which APIs and versions we 
expose, and we have up-to-date visibility of our attack surface.
API gateways help mitigate the risk of zombie APIs by giving us visibility of all the API
versions currently exposed and allowing us to retire, disable, or sunset old versions.
Some API gateways also allow you to configure an expiration date and include the
sunset header in our responses automatically, as noted in RFC 8594 [3].
 API gateways also help us manage the risk of shadow APIs. As we saw in chapter 3,
shadow APIs are undocumented APIs or endpoints. As illustrated in figure 9.6, when
developers are free to publish new endpoints and APIs without going through a planning and documentation process, those APIs are often undocumented, untested,
unprotected, and unmonitored, becoming a juicy target for threat actors.
 API gateways help us mitigate the risk of shadow and zombie APIs by serving as the
entry point to our platform. As illustrated in figure 9.6, all incoming traffic is forced
through the API gateway. To publish a new endpoint or a new API, we must register it
with the API gateway. Most API gateway solutions include dashboards where we can
see and monitor all our APIs, gaining instant visibility of our attack surface.
API gateway
Payments API
v3
Payments API
v2
Payments API
v1
[deprecated]
payments/v3
payments/v2
payments/v1

---

## Sección 127: CHAPTER 9 [Entropy: 0.25]

Secure API infrastructure
 
Figure 9.6
API gateways give us control and visibility of the endpoints we expose, helping us tackle shadow 
endpoints, which are undocumented endpoints that are often untested and unprotected.
Moving down the list of features offered by modern API gateways, we have the ability
to enforce access controls. As we saw in chapters 7 and 8, the first lines of defense for
APIs are authentication and authorization. Figure 9.7 illustrates the steps involved in
controlling access to an API, with the first step being to verify that the request is
authenticated correctly. After the authentication check, we verify that the user
belongs to the right user group, has the right permissions and/or scopes, and owns or
otherwise has to access the requested resource. API gateways help with the first step in
the figure: the authentication check. Many API gateways ship with out-of-the-box support for JSON Web Token (JWT) validation, mutual Transport Layer Security (mTLS;
see chapter 7) authentication, and other forms of authentication.
 API gateways support request and response data validation capabilities, a powerful
feature that ensures that our APIs apply our security-by-design constraints. As we saw
in chapter 6, we can address many security vulnerabilities from a design perspective,
but those designs are of no use if we can’t enforce them. API gateways help us do that.
Good API gateways support request and response data validation when they’re fed an
API specification, and can apply our design constraints on request and response bodies, URL parameters, and headers. When this configuration is in place, the API gateway rejects requests that don’t conform to our schemas, and it raises appropriate
errors when our responses are malformed.
 API gateways also help us apply secure configuration in our responses. As we saw in

---

## Sección 128: chapter 5, security misconfigurations are pervasive and major sources of API exploits. [Entropy: 0.265]

As illustrated in figure 9.8, we can configure API gateways to inject secure header configuration automatically into our responses, such as Access-Control-Allow-Origin for
cross-origin resource sharing (CORS), Strict-Transport-Security for HTTP Strict
Transport Security (HSTS), and Content-Security-Policy for content security policy
Payments API
POST /payments
GET /payments
GET /undocumented/all-payments
POST /payments
GET /payments
Documented
POST /payments
GET /payments
GET /undocumented/all-payments
Implemented
Shadow endpoint
API gateway
9.1
API gateways
(CSP). This type of configuration is particularly important if our APIs are consumed
by web applications.
 Finally, modern API gateways feature customizable rate-limiting capabilities that
help us restrain excessive calls from our consumers, as illustrated in figure 9.9. Further, because API gateways serve as entry points to platforms and have access to all
access logs, many of them provide out-of-the-box observability and usage analytics.
API gateway
Request is
authenticated?
User belongs to the
right group or role?
User has access to
the resource?
 Authentication and authorization process
JWT validation
Certificate
validation
Cookie validation
Figure 9.7
API gateways help us apply consistent access controls following industry standards, 
providing out-of-the-box support for JWT validation, mTLS, and other forms of authentication.
API gateway
Payments API
Request
Response
Apply secure
header configuration.
Figure 9.8
API gateways help us consistently apply secure header configuration to our 
responses, ensuring that they contain the right CORS policy, HSTS configuration, CSP, and so on.

---

## Sección 129: CHAPTER 9 [Entropy: 0.385]

Secure API infrastructure
 
Figure 9.9
Many API gateways offer out-of-the-box rate-limiting capabilities, observability, and 
analytics. These capabilities help us manage misbehaving API clients and draw intelligence about our 
API usage patterns.
API gateways are an invaluable component in complex API platforms, and it’s worth
spending the time to research your options and choose the right one for your use
cases. Daniel Bryant, author of Mastering API Architecture [4], views the process of
choosing an API gateway as a type 1 decision, meaning it’s a one-way, irreversible
choice. The reason is that API gateways are sticky products [5]. As you’ve learned in
this chapter, API gateways offer many useful features, and when you put an API gateway in front of your system, your operations become tightly coupled to it, so it’s
important to make a good choice from the start.
NOTE
The concept of type 1 decisions goes back to a letter to shareholders
written in 2015 by Jeff Bezos, founder and CEO of Amazon [6]. In that letter,
Bezos distinguished between type 1 and type 2 decisions. Type 1 (one-way)
decisions, such as choosing a cloud provider or programming language, are
irreversible; after we make the choice, changing it is difficult. Type 2 (twoway) decisions are reversible. These decisions are the type we make on a daily
basis, such as naming a class or a function and choosing a design pattern to
solve a problem.
The best way to choose the right API gateway for your platform is to check out a few
options and test their capabilities. If you use a cloud provider like AWS, Microsoft
Azure, or Google Cloud Platform (GCP), it makes sense to consider its API gateway
offerings because they integrate well with the rest of the provider’s services. AWS
Payments API
(REST API)
Orders API
(GraphQL API)
API gateway
Inventory API
(AsyncAPI)
Log collection
Observability
Analytics
9.2
Secure network topologies
offers Amazon API Gateway [7], Azure offers API Management [8], and GCP offers
Apigee API Management [9]. Also check out vendors such as Kong, Traefik Labs,
Tyk.io, Axway, MuleSoft, Solo.io, KrakenD, Gravitee, Apinto, and Apache APISIX,
which offer industry-leading features and capabilities.
9.2
Secure network topologies
Now that we understand the crucial contribution that API gateways make to our security posture, let’s dive into other aspects of API architecture, beginning with network
topology. APIs run on a network, and the security configuration of that network has a
direct effect on our security posture. As we saw in chapter 3, network misconfiguration is a major source of security breaches, so it’s worthwhile spending the time evaluating the security of our network configuration and seeing what we can do to improve
it. Network security includes everything from secure network topologies to firewall
configuration, distributed denial-of-service (DDoS) protection, and more. The point
of reading this section is not to learn everything there is to know about network security but to understand how network topology affects our API security posture. As an
API architect, you may not implement the security measures discussed in this section
yourself, but you must understand how your network topology affects your threat
models and what to do about it.
 Network topology refers to the structure of a network. As illustrated in figure 9.10, a
common strategy in network security is to partition the network into multiple segments or subnets. Each segment represents a small network with varying degrees of
access. Some segments have access to the internet; others are isolated. Many cloud
Service A
Network bridge
API
gateway
Bastion
server
Private network without
internet access
System network
Service B
Private network without
internet access
Private network with
internet access
Third-party service
DMZ
Figure 9.10
The DMZ is a region of our network that is exposed to the internet. It’s good practice to channel 
inbound traffic through the DMZ and keep all our services in private subnets. The DMZ can include elements such 
as an API gateway and bastion server.

---

## Sección 130: CHAPTER 9 [Entropy: 0.265]

Secure API infrastructure
providers call subnets with internet access public subnets and subnets without internet
access private subnets. Services running within the same network segment can talk to
one another, but to enable communication across segments, we must create a dedicated network bridge. We call the subnet exposed to the internet the demilitarized zone
(DMZ) of our network. We don’t deploy services directly to the DMZ; instead, the
DMZ serves as an internet gateway to our services via an API gateway, reverse proxy,
load balancer, and similar technologies.
DEFINITION
In networking, the DMZ (also known as the perimeter network) is
the segment of our network that is exposed to all traffic on the internet. We
call it the DMZ, in reference to the border between North Korea and South
Korea, because it represents a buffer zone between untrusted and potentially
malicious traffic and our internal network. The DMZ consists of highly hardened components designed to protect our system, such as API gateways, load
balancers, and WAFs.
Network segmentation allows us to divide our network into subnets with characteristics suited to each component in our platform. Databases, for example, are highly sensitive components. A database must be accessible to our services, but there’s no reason
to expose it to the internet. Therefore, as shown in figure 9.10, it makes sense to
deploy a database to private subnets. To enable external access to the database, we typically use a bastion server that tunnels the connection from our local machine to the
database. The bastion server sits on a network with internet access and functions as a
bridge that provides access to the private network where the database lives.
Network segmentation in the cloud
If you’re building in the cloud, you can achieve network segmentation in different
ways. In AWS, for example, you can provision different virtual private clouds (VPCs)
for different types of resources. AWS VPCs are isolated network environments, so by
default, the services deployed to one VPC can’t communicate with those running in
another VPC. But you can enable communication between VPCs through VPC peering
if necessary.
Within the same VPC, you can create public and private subnets. By default, services
deployed to different subnets within the same VPC can talk to one another, but you
can prevent that by restricting inbound traffic through the subnet’s access control list
(ACL). You can apply additional inbound traffic restrictions by configuring AWS security groups. Security groups function like application-level firewalls, allowing you to
restrict or permit traffic by IP address and port.
To learn more about network segmentation in AWS and see how to make your architecture compliant with strict security requirements such as the Payment Card Industry Data Security Standard (PCI DSS), check out the whitepaper “Architecting for PCI
DSS Scoping and Segmentation on AWS.a
a Tanner, Ted, Javid, Abdul, and Bhosale, Padmakar (2019, August). Architecting for PCI DSS scoping
 and segmentation on AWS. https://mng.bz/9yjo.
9.2
Secure network topologies
DEFINITION
A bastion server or bastion host is a specially hardened server that
allows access to our internal networks through the DMZ. Typically, a bastion
server allows only inbound traffic through port 22 for Secure Shell (SSH)
connections for a small allowlist of trusted IPs. Because bastion servers allow
us to jump from one network to another, they are also known as jump boxes.
Some applications distinguish between public and private (or internal) APIs. Internal
APIs tend to handle highly sensitive data and are usually less protected. As discussed
in chapter 3, we should treat internal APIs as though they were public and protect
them as such. As illustrated in figure 9.11, an additional security measure is to deploy
them in a private subnet so that external access to those APIs is disabled by design. If
we need external access to those APIs, we can enable it through a bastion server.
Figure 9.11
A bastion server gives us access to an internal network. We use bastion servers to access internal 
or private APIs and databases. The bastion server sits in the DMZ and is hardened to allow traffic only from certain 
origins.
Public APIs must allow inbound traffic from the internet. As illustrated in figure 9.12,
this is typically accomplished by deploying the APIs to an internal network with a
reverse proxy, such as an API gateway, and forwarding the traffic from the DMZ to the
internal network. This approach has all the benefits of using the API gateway as the
entry point to our platform, including visibility of our attack surface and enforcement
of access controls.
DEFINITION
A reverse proxy is a surrogate server that sits in front of our website,
forwards client requests to our servers, and helps us include an additional
layer of protection. Reverse proxies can be used for multiple purposes,
including SSL termination (encrypting and/or decrypting SSL-encrypted
traffic), blacklisting malicious IPs, and load-balancing requests across multiple backend nodes.
This approach follows the principles of zero-trust architecture (see chapter 3), making our APIs inaccessible by default unless we declare the endpoints through the API
gateway. If one of our services needs to expose a new endpoint, we must declare it
Service A
Network bridge
Bastion
server
Private network without
internet acces
System network
Private network without
internet access
DMZ

---

## Sección 131: CHAPTER 9 [Entropy: 0.265]

Secure API infrastructure
through the API gateway, which means that our attack surface is always visible and up
to date, and all endpoints receive the same security protections configured in the API
gateway. As shown in figure 9.12, under this approach, our services can expose additional endpoints that are available only internally for testing or to support back-office
functionality.
Figure 9.12
Using a combination of API gateway and bastion server, we make sure that our APIs expose only welldocumented, tested, secure endpoints to the internet while keeping internal endpoints or endpoints in development 
accessible only by internal users and developers.
Network segmentation is also useful for isolating services that have more sensitive data
and operations (also known as preventing lateral movement between networks). A
healthcare application might have one service that manages patients’ appointments
and another service that manages their medical records. The medical-records service
is more sensitive than the appointment-management service, so we deploy it within an
isolated network, where we can apply stricter access controls and enhanced monitoring for compliance with healthcare regulations such as HIPPA. Microsegmentation
allows us to descope the appointment-management service from compliance audits
because it is isolated from the medical-records service, and lateral movement isn’t possible between the two. If a threat actor breaks into the appointment-management API
servers, they have no way to access data from the medical-records service because it
runs on a different network.
9.3
Protecting against layers 3–6 attacks
Now that we know how to architect our network to protect our most sensitive components and user data from unauthorized access, let’s look at the types of attacks threat
Network bridge
API
gateway
Bastion
server
Private network
without
internet acces
System network
Payments API
Private network
with
internet access
DMZ
POST /payments
GET /payments
Documented and
enabled through
API gateway
POST /payments
GET /payments
POST /new-payment-method
Implemented
9.3
Protecting against layers 3–6 attacks
actors can carry out at the lowest levels of the networking stack and see how to
mitigate them. Before a malicious actor can send a SQL injection attack to our APIs,
they have to reach our servers, open a connection, maintain it, and send correctly
formed packets of data. All this happens in the Network, Transport, Session, and Presentation layers of the Open Systems Interconnection (OSI) model, also known as layers 3, 4, 5, and 6, respectively. Threat actors have every opportunity to exploit
vulnerabilities in those layers to compromise the security posture of our APIs. In this
section, we’ll discuss exploits against OSI layers 3–6 and see what we can do to mitigate them. The goal is to get acquainted with vulnerabilities in this area that may
affect our API security posture and know what we can do to mitigate those risks.
 The OSI model is an abstraction describing the elements required to enable communication between systems. As illustrated in figure 9.13, the OSI model breaks the
intersystem communication process into seven layers:
Physical—Consists of the physical medium, such as cables, over which communication happens.
Data Link—Delivers data frames between nodes in the local network, using
media access control (MAC) addresses. It detects and corrects transmission
errors. An example of layer-2 protocol is the Ethernet.
Network—Delivers data packets over a network using IP addresses.
Figure 9.13
The OSI model breaks the elements required to enable communication 
between systems into seven layers. Layer 1 describes the physical medium, such as 
switches and cables, and layer 7 describes the application layer, such as APIs. Many 
API attacks target layers 3–6 and demand special security measures.
Layer 1
Physical layer
Layer 2
Data Link layer
Layer 3
Network layer
Packet delivery over IP addresses
Layer 4
Transport layer
Data transmission between two nodes
Layer 5
Session layer
Continuous exchange of data between two nodes
Layer 6
Presentation layer
Translates data packets into data for Application layer
Layer 7
Application layer
Semantic use of the data exchanged over the network
Transmission of raw signals without interpretation
Data delivery over MAC addresses

---

## Sección 132: CHAPTER 9 [Entropy: 0.31]

Secure API infrastructure
Transport—Transmits data between two points in a network. The supported features depend on the implementation and may include acknowledgment, flow
control, and multiplexing. Popular implementations of layer 4 are User Datagram Protocol (UDP) and Transmission Control Protocol (TCP).
Session—Continuously exchanges data between two nodes over a network, providing mechanisms to establish, maintain, and close the connection.
Presentation (also known as Syntax)—Translates the data packets exchanged over
the network into data that applications can consume and encodes application
data in a format suitable for transmission. An example is the serialization and
deserialization of JSON data over the network.
Application—Enables applications to use the semantics of the data exchanged
over the network to communicate. Examples of Application-layer implementations are HTTP, XMPP, FTP, SSH, TLS/SSL, and MQTT.
Protocols such as HTTP and XMPP depend on reliable transmission of data over a
network (layers 3 and 4) for an extended period (layer 5) and on the translation of
such data into messages they can interpret (layer 6). APIs build on layer 7. Throughout the book, we’ve seen strategies for protecting our APIs against attacks such as
scalping, fuzzing, mass assignment, and SQL injection. We call these attacks application-level or layer-7 attacks. In addition to layer 7, layers 3–6 can expose vulnerabilities
that threat actors may exploit to compromise the security posture of our APIs. In this
section, we’ll study examples of those vulnerabilities and learn how to architect our
system to mitigate them.
Denial-of-service attacks
Denial of service (DoS) is one of the most common types of attacks against APIs,
often referred to as distributed denial of service (DDoS). We call these attacks distributed when the attack is launched from a distributed network of nodes or origins.
The goal of a DoS attack is to take down our services, which can be accomplished by
using a handful of well-crafted malicious requests or overwhelming our servers with
millions of concurrent requests. To crash our servers with a handful of requests,
threat actors exploit vulnerabilities in the Application layer. If our application exposes
a GET /products endpoint with no bounds on how many products we can retrieve at
the same time, threat actors can overwhelm our system by requesting millions of
items in each request. (Chapter 6 discusses this type of vulnerability in detail.) 
Alternatively, threat actors can attempt to overwhelm our system by sending millions
of requests in what is known as a volumetric DoS attack. Volumetric DoS attacks can
target the Application layer, for example, by sending millions of HTTP requests, but
more commonly, they target layers 3–6 of the OSI model. Examples of these attacks
include Internet Control Message Protocol (ICMP), synchronization (SYN), and UDP
flood attacks, Domain Name System (DNS) and UDP amplification attacks, and IP
fragmentation attacks.
9.3
Protecting against layers 3–6 attacks
One of the most common types of attacks against layers 3–6 is volumetric DoS, such as
ICMP flood (also known as ping or echo flood). As illustrated in figure 9.14, the idea is
to overwhelm the server with ICMP packets without waiting for replies, thereby consuming the server’s resources and making it unable to respond to legitimate user
requests. ICMP flood is an example of layer-3 attack and can be prevented by disabling ICMP requests.
The evolution of the HTTP protocol sometimes introduces new exploits for DDoS
attacks. HTTP/2 [10], for example, includes several features that improve web performance, but those features can be exploited for malicious purposes. One such exploit
is HTTP/2 rapid reset.
 As illustrated in figure 9.15, HTTP/2 allows clients to serialize their requests in
individual streams via a feature known as HTTP/2 multiplexing. Each stream has an
identifier, and the client can send multiple streams over the same connection. All the
streams can go over the same TCP connection, allowing clients to send multiple concurrent requests over the same socket. Servers allow a maximum number of concurrent streams—typically, 100. To make efficient use of the streams, HTTP/2 allows
clients to close a stream if they deem it no longer necessary. When a user visits a website, for example, the browser serializes into various streams the requests for all the
assets, files, and content it needs to load the page. As the user scrolls down the page,
some of those images and text may fall out of the viewport (out of view) before they’re
To learn more about DDoS attacks, check out Chad Kime’s “Complete Guide to the
Types of DDoS Attacks,”a Eric Chou and Rich Groves’s Distributed Denial of Service
(DDoS),b and Suzanne Aldrich’s “Anatomy of DDoS.”c
a Kime, Chad (2022, December 19). Complete Guide to the Types of DDoS Attacks. eSecurity 
 Planet. https://www.esecurityplanet.com/networks/types-of-ddos-attacks
b Chou, Eric, and Groves, Rich (2018). Distributed Denial of Service (DDoS). O’Reilly. 
c Aldrich, Suzanne (2017). Anatomy of DDoS. Presentation at Builderscon, Tokyo. https://www. 
 slideshare.net/slideshow/anatomy-of-ddos/78561801
API server
User
Figure 9.14
A common 
DoS attack is ping flood. 
The goal of this attack is 
to overwhelm the server 
with an unlimited 
number of ping requests 
until it can no longer 
respond to requests from 
legitimate users.

---

## Sección 133: CHAPTER 9 [Entropy: 0.25]

Secure API infrastructure
loaded, and the client may decide to reset and cancel those streams so that it can open
new ones and fetch new resources.
If used as intended, HTTP/2 reset is a powerful feature that allows clients and servers
to make efficient use of resources. But this feature can also be abused to launch DoS
attacks. To accomplish that, a threat actor configures a client to send the maximum
number of streams allowed by the server and then closes the streams right away, reusing the available streams to send additional requests, followed by corresponding
resets. The exploit works when the server fails to cancel the process triggered by cancelled stream. This process is repeated until server resources are exhausted. By canceling the streams, the client never exceeds the allowed maximum number of
concurrent streams and therefore has the opportunity to flood the server with an
overwhelming number of requests. Although not confirmed, research by Cloudflare
indicates that HTTP/3 may also be vulnerable to rapid-reset exploits [11]. 
Exploiting HTTP/2 rapid reset
In August 2023, HTTP/2 rapid reset led to one of the biggest DDoS attacks in history.
The attack targeted major cloud providers Cloudflare, GCP, and AWS and reached up
to 400 million requests per second. For details on the attack and how vendors dealt
with it, check out the following resources: 
Client
stream 1: GET index.html
stream 1: Response
stream 1: GET styles.css
stream 2: GET script.js
stream 3: GET image.jpg
stream 1: Response
stream 2: Response
stream 3: Reset
Server
Figure 9.15
HTTP/2 uses streams to allow 
clients to serialize multiple requests over a 
single TCP connection. Each stream has an 
identifier, and if the client deems a certain 
request no longer necessary, it can cancel it 
with a reset stream request.
9.3
Protecting against layers 3–6 attacks
Another common exploit against layers 3–6 is TCP/UDP port scanning. Port scanning
alone doesn’t hurt our servers, but the knowledge that threat actors gain from it
allows them to create tailored attacks against the open ports. As shown in figure 9.16,
servers have 65,535 usable port numbers, and many popular services run by default on
specific ports. PostgreSQL, for example, runs by default on port 5432; MySQL, on
port 3306; SSH, on port 22; and Jenkins, on port 8080. By discovering which ports are
open on our servers, threat actors can launch specific attacks tailored to the services
running on those ports. If a threat actor discovers an unauthenticated Jenkins server
running on port 8080, they will gain access to our internal network and sensitive configuration details of our system.
Figure 9.16
Port scanning aims to discover open ports on our server. Threat actors use this information to tailor 
attacks to the services running on each port. In this graphic, a threat actor discovers an unprotected Jenkins server 
running on port 8080 and hijacks it to gain access to our system.
Losio, Renato (2023, November 5). Cloudflare, Google and AWS disclose
HTTP/2 zero-day vulnerability. InfoQ. https://www.infoq.com/news/2023/11/
http2-rapid-reset-vulnerability/)
Snellman, Juho, and Iamartino, Daniele (2023, October 10). How it works:
The novel HTTP/2 ‘rapid reset’ DDoS attack. Google Cloud Blog. https://
cloud.google.com/blog/products/identity-security/how-it-works-the-novel-http2
 -rapid-reset-ddos-attack
Pardue, Lucas, and Desgats, Julien (2023, October 10). HTTP/2 rapid reset:
Deconstructing the record-breaking attack. The Cloudflare Blog. https://
blog.cloudflare.com/technical-breakdown-http2-rapid-reset-ddos-attack/
Rapid reset is one of several exploits available in HTTP/2. To learn about additional
exploits, check out 
Nafeez (2019, August 13). On the recent HTTP/2 DoS attacks. The Cloudflare Blog. https://blog.cloudflare.com/on-the-recent-http-2-dos-attacks/
Port 1
...
Port 22
(SSH)
Port 443
(TLS/SSL)
Port 3306
(MySQL)
Port 5432
(PostgreSQL)
Port 8080
(Jenkins)
Web server
Protected
Protected
Protected
Unprotected
Hijack Jenkins
and access
internal system.

---

## Sección 134: CHAPTER 9 [Entropy: 0.424]

Secure API infrastructure
Most DoS attacks require hitting the server with multiple requests per second. A common mitigation strategy involves tracking the IP where the requests originate and
blocking or blacklisting it. This strategy is effective when the malicious requests come
consistently from the same IP or set of IPs. As illustrated in figure 9.17, to bypass such
protection, threat actors spoof or mask their IPs. IP spoofing is the practice of modifying the IP header in a packet with other IP values, and IP masking hides the origin IP
behind other servers, such VPNs and Tor nodes. These techniques make it look like
the requests are coming from different sources, making it more difficult for the
receiving server to identify the origin of the DDoS attack and block the requests.
How do we ensure that our APIs are adequately protected against layers 3–6 attacks? If
your APIs run on servers that you must manage and configure—such as on-premises
servers, dedicated EC2 instances on AWS, or droplets on DigitalOcean—the first
course of action is hardening those servers by closing unnecessary ports, disabling or
removing support for unnecessary protocols and services, removing or restricting privileged users or groups, creating strict firewall rules, and securing remote-access endpoints. If you are in this situation, you want to hire specialized consultants to audit
your server security configuration.
 Hardening your servers protects them against unauthorized access. How do we go
about protecting our APIs against DDoS, port scanning, and other kinds of malicious
traffic? A good solution is to use products that specialize in this type of protection.
Organizations such as Cloudflare, F5, Fastly, and Akamai offer popular and effective
solutions in this space. Make sure to learn about these products’ features and capabilities and evaluate how well they integrate with your own infrastructure before making
your choice. A special type of product that offers protection against malicious traffic
across all the networking layers of the OSI model, including layer 7, is the WAF. Next,
you’ll learn more about WAFs and how they help secure APIs.
9.4
Fending off malicious traffic with WAFs
Web application firewalls (WAFs) are firewalls that protect websites against
application-level attacks, such as malicious injection and cross-site scripting (XSS)
attacks. Modern WAFs offer more comprehensive security, including protection
Web server
IP address:
1.2.3.4
TCP packet
Source IP: 2.3.4.5
TCP packet
Source IP: 3.4.5.6
TCP packet
Source IP: 4.5.6.7
Figure 9.17
IP masking 
crafts TCP packets with 
origin IPs different from our 
own. This technique helps 
threat actors bypass anti-
DoS protection measures 
that focus on tracking the 
origin IP of the requests.
9.4
Fending off malicious traffic with WAFs
against zero-day vulnerabilities and layers 3–6 attacks. As illustrated in figure 9.18, a
WAF is typically deployed as a reverse proxy in front of our APIs.
Figure 9.18
In this example, a WAF rejects a request from a threat actor that contains a SQL injection attack.
The first generation of WAFs was designed to protect against well-known application
vulnerabilities, such as injection and cross-site scripting (XSS) attacks. They do this by
inspecting the request contents and assessing the probability that they represent a
malicious attack. The following request contains a SQL injection attack:
GET /payments?filter=' or 1=1--
This line represents a GET request against a /payments endpoint that sets the filter
query parameter’s value to a SQL statement. As illustrated in figure 9.19, if the API is
vulnerable to SQL injection, filter’s SQL statement will be executed as part of the
endpoint’s database query.
Figure 9.19
If our API is vulnerable to SQL injection, threat actors can exploit this vulnerability to cause 
unexpected behavior in our system, gain unauthorized access to data, or disrupt our services. In this 
example, a threat actor disables the user_id constraint on the SQL query, gaining access to records 
from other users.
WAF
API server
GET /payments
GET /payments
GET /payments?filter='; drop table users--
GET /payments?filter=' or 1=1--
API server
select * from payments where status = '' or 1=1 -- and user_id = %user_id;
The double hyphen in the SQL injection
statement disables the user_id constraint
on the query, giving the threat actor access
to other users’ records.

---

## Sección 135: CHAPTER 9 [Entropy: 0.34]

Secure API infrastructure
WAFs protect our applications by identifying the SQL injection statement and either
blocking the request or cleaning up the malicious content from the request. If the
WAF cleans up input instead of blocking the request, it can still become vulnerable to
WAF bypass attacks. The following request can trick some WAF implementations into
cleaning the input into an executable SQL statement:
GET /payments?filter='+o//r+1=1--
This request masks the SQL injection statement with + and / symbols to prevent the
WAF from identifying the attack. In this case, the WAF sanitizes the input by replacing
the plus symbols (+) with empty spaces and removing the forward slashes (/), resulting in the executable statement ' or 1=1--.
 Some WAF implementations use matching patterns and rules to identify malicious
content, and others use more sophisticated probabilistic methods. Matching patterns
look for keywords or sequences of keywords that look like database injection statements or malicious scripts. There’s a tradeoff in how strict the pattern-matching rules
are. On one hand, if the list of patterns isn’t comprehensive enough, threat actors will
be able to construct injection statements that bypass the WAF’s analysis engine. On
the other hand, if the list of patterns is too comprehensive and strict, the WAF may
block legitimate requests that happen to look like injection attacks. A blog post
explaining how injection works, for example, will contain examples of SQL injection
and other malicious statements, and this content may look suspicious to a strict WAF.
 A probabilistic WAF analyzes the request’s content and assigns a score to it. The
request GET /payments?filter=' or 1=1--, is likely to receive a high probability score
for SQL injection attack because the injection represents the whole value of the filter parameter. On the other hand, the blog post explaining how injection attacks
work will receive a lower probability score because the injections represent only a
small portion of the input. The WAF’s analysis engine reaches this determination by
looking at the context in which the SQL statement appears.
 Modern WAFs include API-specific support such as schema validation. If we give
the WAF our API specification, it will ensure that the request payloads conform to our
data schemas, and reject those that don’t with a useful error message and status code.
 WAFs offer more exhaustive security coverage that goes beyond application-level
attacks, including protection against layers 3–6 attacks such as those discussed in section 9.3. WAFs also protect against zero-day vulnerabilities.
DEFINITION
Zero-day vulnerabilities are vulnerabilities for which there is no
known fix. We say “zero-day” because an organization has zero days left to fix
the vulnerability since its discovery.
One of the most infamous examples of zero-day vulnerabilities is Heartbleed (https://
heartbleed.com). Disclosed in April 2014, Heartbleed is a vulnerability in the
OpenSSL library that allows threat actors to leak content in memory handled by the
OpenSSL library from the server, such as traffic data between clients and the server.
Summary
This allows threat actors to steal sensitive data such as usernames and passwords and
even get access to the secret key of the X.509 certificate that is used to encrypt traffic.
Heartbleed was disclosed on April 1, 2014, and a fix became available on April 7,
2014. As organizations scrambled to update their systems on time, many became victims of data breaches, including hospitals, Canada’s tax authority, and the United
Kingdom’s parenting social network Mumsnet [12]. As of 2024, it was estimated that
around 60,000 servers around the world were still vulnerable to Heartbleed [13].
 A more recent example of zero-day vulnerability is HTTP/2 rapid reset, discussed
at length in section 9.3. WAFs protect applications from zero-day vulnerabilities by
implementing mitigating countermeasures at run time. Such mitigations are especially effective against layers 3–6 attacks. As we saw earlier in this section, however,
detecting and mitigating application-level attacks such as SQL injection is more challenging. WAFs are wonderful tools as our first line of defense, but they can do only so
much, and we shouldn’t mistake having a WAF for being protected against all kinds of
API vulnerabilities. In fact, overconfidence in WAFs is a major factor that leads organizations to relax their cybersecurity hardening process and therefore expose more vulnerable APIs [14]. 
Summary
API gateway is a pattern from microservices architecture that allows us to provide a single entry point for multiple backend APIs and offer a unified API style
to our consumers.
Modern API gateways help us manage our API inventory, monitor our APIs,
consistently enforce access controls, and apply secure configuration.
Network segmentation is the practice of dividing our network into isolated subnets. Segmentation allows us to tailor each subnet to the security requirements
of each API.
The DMZ is a subnet in our network that is exposed to the internet. It’s good
practice to channel all inbound traffic through the DMZ and keep our services
in private subnets without internet access.
The OSI model breaks the elements required to enable inter-system communication into seven layers. Layer 7 is the Application layer, and the other layers
describe lower-level elements of the networking stack. Many API attacks target
OSI layers 3–6, including DoS and port-scanning attacks.
Preventing layers 3–6 attacks requires hardening servers with strict firewall configuration, closing unnecessary ports, and restricting privileged access. It’s good
practice to use off-the-shelf anti-DoS protection services.
A WAF protects against application-level attacks such as SQL injection and XSS
attacks. Modern WAFs also support data validation for APIs and protect against
zero-day vulnerabilities and layers 3–6 attacks.
Financial-grade APIs
In recent years, we have witnessed a revolution in the financial technology (fintech)
space. We have seen the emergence of organizations such as Plaid, Bud, TrueLayer,
Yapily, Yodlee, Stripe, and GoCardless that provide financial market infrastructure—a critical component of today’s economy that allows businesses to manage
financial transactions easily via APIs. We have seen the emergence of neobanks or
challenger banks, which operate exclusively online. We have seen businesses provide banklike services without having a banking license.
 All this is possible thanks to financial APIs. Organizations that otherwise
wouldn’t be able to process online payments due to strict regulatory requirements
can do so by using payment processors like Stripe and GoCardless. Payment processors build a secure financial infrastructure that connects directly with banks to
manage payments and other financial transactions (refunds, chargebacks, and so
This chapter covers
Open banking for the financial services industry
Delivering highly secure APIs with FAPI
Securing the authorization process
Adding nonrepudiation capabilities to APIs
10.1
What is open banking?
on). The processor exposes an API that is used to set up a payment, and it processes
the operation through its direct integrations with banks.
 On the consumer side, we have seen the emergence of applications such as Moneyhub, SlimPay, Plum, and Emma that allow us to manage multiple bank accounts from
a single place (also known in this case as account aggregators), track our expenses,
plan our savings, make payments, set up investments, and more without logging in to
our bank accounts.

---

## Sección 136: CHAPTER 9 [Entropy: 0.25]

The secret sauce behind this fintech revolution is open banking, also known as
open finance. Traditionally, banks have been closed organizations that directly own the
relationship with their customers. But a major regulatory push, started by the European Union in 2015, forced banks to open their data and capabilities through APIs in
the interest of fostering financial innovation. Brazil, Australia, and Japan have implemented similar requirements, and as of 2025, the United States has a proposal on the
table to follow suit under Section 1033 of the Consumer Act.
 Open banking offers new business opportunities for financial institutions, but it
also brings new risks and security challenges. Systems that were never designed to be
exposed to third parties must now be accessible through APIs, with all the security
concerns that come with that. The risks range from unauthorized access to sensitive
data to account takeover and fraudulent operations. In this case, people’s livelihoods,
homes, and life savings are at stake, so it’s crucial to implement the highest security
standards for financial APIs. The OpenID Foundation (https://openid.net) created a
working group called FAPI to offer guidelines and meet the security requirements of
financial-grade APIs.
 In this chapter, you’ll learn about those security requirements, seeing how they work
and protect against specific threat models. As you will see, these security measures apply
to a wide variety of sectors beyond finance, and applying them correctly makes the
internet more secure. If you work with applications in finance, law, health care, government, defense, and other highly sensitive fields, this chapter is relevant to you, and you
should make an effort to implement the security standards discussed here.
10.1
What is open banking?
Open banking is the practice of securely opening APIs to allow third-party applications
to access customer bank accounts with user consent. Open banking allows developers
to build applications that help customers manage their bank accounts securely from a
single place without logging in to their bank accounts. This ecosystem fosters innovation in the fintech space by allowing developers to build applications in niche areas,
such as personal budgeting, expense tracking, and accounting, without creating the
financial infrastructure required to perform financial transactions.
NOTE
Open banking (lowercase) refers to exposing banking data and capabilities through APIs. It is not to be confused with Open Banking (uppercase), a notfor-profit organization in the United Kingdom that promotes robust standards
and best practices for open banking (https://www.openbanking.org.uk).

---

## Sección 137: CHAPTER 10 [Entropy: 0.25]

Financial-grade APIs
Open banking received a major push from the European Union in 2015, when the
Council for the European Union approved the Revised Payment Services Directive,
known as PSD2. PSD2 went into effect on September 14, 2019, with the goal of
improving the security of online payments and fostering competition and innovation
within the payments industry. To encourage competition, PSD2 requires financial
institutions to share their data and payment capabilities through APIs. Other countries have followed the trail, with many, including the United States, currently working
out open banking mandates within their legislative frameworks [1–3]. 
 Open banking changes the game for fintech developers. As illustrated in figure
10.1, before the advent of financial APIs, fintech applications asked users to share
their login credentials, and used them to log in to their bank accounts and scrape
their data from the bank’s website, a practice known as screen scraping [4]. Screen
scraping is a perfect recipe for a security disaster. User credentials are passed around
and stored in third-party applications, and those applications get unfettered access to
user data and operations.
DEFINITION
Screen scraping means capturing a user’s credentials, using them
to log in to the user’s bank account, and fetching their account details or performing operations on their behalf using web scraping techniques. This practice is highly insecure because it involves handing highly sensitive credentials
to a third-party application and giving it unlimited access to customer data.
Figure 10.1
In screen scraping, bank customers share their account credentials with a third-party application that 
uses those credentials to log in to the bank’s website by impersonating the customer.
Screen scraping is a classic example of an automated web attack in which threat actors
use customer credentials and scrape their private, highly sensitive data. Allowing
screen scraping means that banks have no way to distinguish between legitimate and
malicious scraping and by default allows automated attacks on their websites. For all
those reasons, open banking is a welcome move within the financial industry to
User A
Bank’s servers
Fintech application
Welcome, user A!
Page 1
https://bank.com
Bank account credentials
Fintech
application’s
database
10.3
Understanding FAPI’s attacker model
provide a more secure, robust way to access customer accounts. To provide that level
of security, the OpenID Foundation’s FAPI working group has been working on a
series of technical specifications that detail the specific threat models open banking
APIs should address and how.
10.2
What is FAPI?
FAPI is a working group of the OpenID Foundation dedicated to creating standards
for APIs with high-security requirements. Originally, FAPI was an acronym for financial-grade APIs, and the goal of the working group was to provide implementation
guidelines to meet the security requirements of open banking APIs. FAPI has gone
through two versions. FAPI 1.0 focused on the security requirements of financial APIs.
FAPI 2.0 is broader in scope, applies to other industries (such as healthcare), and has
additional security requirements.
NOTE
FAPI 2.0 supersedes FAPI 1.0, but you may encounter applications that
still operate under the FAPI 1.0 model. If you need to learn how FAPI 1.0
works, check out FAPI 1.0’s baseline profile [5] and the advanced profile [6].
The baseline profile defines a secure profile to protect operations that read
sensitive data from a resource server, such as retrieving an account statement.
The advanced profile introduces nonrepudiation to protect operations that
modify sensitive data on the resource server, such as initiating a payment.
FAPI 2.0 consists of two profiles: the security profile [7] and message signing [8]. The
profiles are designed for interoperability among open banking providers and build on
Open Authorization (OAuth) 2.0 (RFC 6749) [9], OAuth 2.0 best current practices
(RFC 9700) [10], and the OpenID Connect (OIDC) protocol [11]. FAPI makes an
opinionated and constrained use of these standards to procure a more secure way of
authenticating users and authorizing their access to an API.
 FAPI’s security guidelines have been adopted by the United Kingdom’s Open
Banking standards, Brazil’s Open Banking Initiative, Australia’s Consumer Data
Rights Standards, and more. You can check the latest state of FAPI’s work in its Bitbucket repository (https://bitbucket.org/openid/fapi/src/master). In the remainder
of this chapter, we’ll dive straight into FAPI’s profiles, beginning with an analysis of its
attacker model that lays out the security requirements FAPI addresses.
10.3
Understanding FAPI’s attacker model
FAPI 2.0 is designed to protect users and businesses from a specific threat model [12].
The attacker model does not describe specific attacks; instead, it aims to be a high-level
reference for all possible threats that FAPI applications must mitigate. The model breaks
its goals into three categories: authorization, authentication, and session integrity.
 The first goal of FAPI 2.0’s attacker model is secure authorization. As illustrated in
figure 10.2, the idea is to ensure that users can access only resources they are allowed
to access. If I use a payments application to make a payment, for example, I’m the only
user who’s allowed to inspect or modify the details of that payment, and the application

---

## Sección 138: CHAPTER 10 [Entropy: 0.56]

Financial-grade APIs
must successfully implement that access restriction. Because authorization is carried by
access tokens, the objective of the attacker model is to ensure that users can obtain and
use only their own access tokens. In other words, the goal is to prevent threat actors
from laying their hands on other users’ access tokens and using those tokens to access
the users’ data.
 The second goal is secure authorization. As illustrated in figure 10.3, the idea is
that users should not be able to log in under the identity of another user. If I have an
GET /payments/1234
Authorization: Bearer <legitimate_user_token>
Legitimate user
Threat actor
Bank API
GET /payments/1234
Authorization: Bearer <legitimate_user_token>
Figure 10.2
FAPI’s threat model 
accounts for 
situations in which 
threat actors steal 
other users’ access 
tokens. Therefore, 
FAPI applications 
must implement 
mechanisms that 
block the use of 
stolen tokens.
Authorization server
Fintech application
(client)
User/user agent
User logs in with the authorization server.
Authorization server issues the authorization code.
User agent sends the
code to the client.
The fintech application
exchanges the
authorization code for
access and ID tokens.
Authorization server issues
the access and ID tokens.
Resource server
The client forwards the
access and ID token to
the user agent.
User agent uses the access and ID tokens to prove
their identity and access data in the resource server.
Threat actor attempts to forge an ID token with the details
of another user to access their data.
Figure 10.3
FAPI accounts for scenarios in which threat actors attempt to assume the identity of 
another user, so applications must be able to prevent these attacks.
10.4
Securing APIs with FAPI 2.0’s security profile
account in a healthcare application, for example, no other user must be able to log in
to my account. FAPI’s authentication model builds on OIDC, so user identity is carried by ID tokens. Therefore, FAPI must satisfy the secure authentication goal by
ensuring that ID tokens can be bound only to their legitimate owners.
 The third goal is session integrity. The idea is to ensure that all messages exchanged
during the authorization process maintain their integrity, which means threat actors
can’t tamper with messages and inject malicious data. As illustrated in figure 10.4, a
common exploit in OAuth is cross-site request forgery (CSRF) attacks against the
authorization endpoint to steal user credentials. The attack works when a user is
already logged in with their identity provider (IdP). In this scenario, a threat actor
tricks the user into visiting a malicious website, where the threat actor sends an authorization request to the user’s IdP. Because the user is already logged in, the IdP automatically responds with an authorization code, which the malicious actor exchanges
for an access token. As we learned in chapter 7, the traditional way to protect against
such attacks in OAuth is to use a state parameter in the authorization request. FAPI
adds extra security requirements to guarantee the integrity of user sessions.
Figure 10.4
A threat actor tricks a user into visiting a malicious website, which redirects the user to their IdP via 
an authorization request, resulting in the leak of an authorization code that the malicious site exchanges for an 
access token.
10.4
Securing APIs with FAPI 2.0’s security profile
Now that we understand FAPI 2.0’s security goals, let’s see how to achieve them. The
FAPI 2.0 framework is a collection of specifications that describe how our applications
Page 1
https://malicious-site.com
<script>
window.onload = function() {
 window.location.href = authorization_request_url;
};
</script>
/authorize?response_type=code&client_id=s6BhdR&redirect_uri=https://malicious-site.com
User visits a malicious website,
where they are immediately
redirected to their IdP with an
authorization request.
Page 1
https://malicious-site.com
<script>
window.onload = function() {
 const code = URL(document.location.toString()).searchParams.get("code");
 fetch("https://identity-provider.com/oauth/token", 
 {method: "POST", "body": new URLSearchParams({code: code})
 ).then(response => response.json())
};
</script>
Identity provider
Because the user is already
logged in, the IdP responds
with an authorization code
and redirects the user to
the malicious site.
2
Upon redirection, the malicious
site fetches the authorization
code from the URL and
exchanges it right away for an
access token.
252

---

## Sección 139: CHAPTER 10 [Entropy: 0.25]

Financial-grade APIs
must work to achieve a high level of security. The two main documents that describe
FAPI 2.0’s requirements are the security profile [7] and the message-signing profile
[8]. The security profile describes the baseline security requirements for FAPI 2.0
applications, whereas the message-signing profile describes advanced features that
provide a higher level of security for critically sensitive operations and applications. In
this section, we discuss FAPI 2.0’s security profile, which describes a secure process for
issuing access tokens and using them to access sensitive data from a resource server. As
illustrated in figure 10.5, the main agents in the FAPI 2.0 framework are
Client—The application that accesses protected data on behalf of the user
Resource owner—The user who owns data in the resource server
User agent—The browser or mobile application
Authorization server—The server that identifies the user and issues access tokens
Resource server—The server that holds user-sensitive data
Figure 10.5
The main agents involved in FAPI exchanges are the resource owner, user agent, client, 
authorization server, and resource server.
FAPI 2.0 addresses the security concerns described in the attacker model we analyzed
in section 10.3. To that end, it imposes several constraints and requirements that
authorization servers, resource servers, and clients must adhere to.
 As we saw in section 10.3, FAPI 2.0 aims to deliver strong authentication and authorization processes. Threat actors must not be able to access other user accounts, steal
their access tokens, or access their data. To achieve those goals, FAPI 2.0 requires all
OAuth clients to be confidential clients. As illustrated in figure 10.6, confidential
User
Page 1
https://example.com
User agent
Client
Resource server
Authorization server
10.4
Securing APIs with FAPI 2.0’s security profile
clients run on a server, so their code is not exposed; therefore, they can store credentials with which they authenticate their requests to the authorization server. If the client exposes a web application that runs in a browser (the user agent), all interactions
with the authorization server are handled directly by the server. Meanwhile, public clients, by virtue of being public, have their code exposed to the public, so they can’t
store credentials and therefore can’t authenticate their requests with the authorization server. As shown in figure 10.6, a public client runs in a browser (user agent). In
FAPI 2.0, clients must be confidential and must manage interactions with the authorization server to produce authorization request URLs and securely obtain access,
refresh, and ID tokens through a back channel.
Figure 10.6
Public clients run in the user agent, and their code is exposed, so they can’t store credentials to 
authenticate with the authorization server. Confidential clients run on a server, and their code isn’t exposed, so 
they can store credentials with which they authenticate with the authorization server.
Clients can be authenticated by means of mutual Transport Layer Security (mTLS; see

---

## Sección 140: chapter 7), or by signing requests with a signing key issued exclusively for the client. [Entropy: 0.25]

The latter method, known as private_key_jwt, requires the client to issue and sign a
new JSON Web Token (JWT) on every request to prove its authenticity.
DEFINITION
private_key_jwt is a client authentication method that requires
the client to sign a JWT with a private key previously registered with the
authorization server. We typically use this authentication method to obtain
Authorization server
Confidential client
User
Public clients run in
the user agent. Their
source code is visible
to everyone, and their
interactions with the
authorization server
can’t be authenticated.
A confidential client
runs in a server. Its
source code is not
exposed; therefore, it
can store credentials
to authenticate with the
authorization server.
Page 1
https://example.com
Page 1
https://example.com
Public client running in the user agent (browser)
User agent (browser)

---

## Sección 141: CHAPTER 10 [Entropy: 0.529]

Financial-grade APIs
access tokens. The JWT is one-time-use only, and it’s included in the token
request as in the following payload example (with application/x-www-formurlencoded content type): grant_type=authorization_code&code=i1WsRn1uB1
&client_id=s6BhdRkqt3&client_assertion_type=urn:ietf:params:oauth:client
-assertion-type:jwt-bearer&client_assertion=<self-signed-jwt>. For more
details on this authentication method, check out “OpenID Connect Core 1.0
incorporating errata set 2” [11].
A common source of exploits in OAuth authorization requests is the fact that authorization redirect URLs contain the authorization parameters in the URL, such as the
client_id and the redirect_uri. A typical authorization request URL might look like
this:
/authorize?response_type=code&client_id=s6BhdRkqt3&state=xyz
➥&redirect_uri=https%3A%2F%2Fclient%2Eexample%2Ecom%2Fcb
The problem with this approach is that it exposes sensitive parameters through the
URL, which may be visible to threat actors eavesdropping on the network, and those
parameters leak into network logs. Exposing authorization request parameters
through the URL also allows threat actors to forge malicious authorization request
URLs designed to steal user credentials, as illustrated in figure 10.4. To prevent this
type of exploit, FAPI 2.0 requires clients to use a JWT-secured authorization request
(JAR) in combination with the pushed authorization request (PAR) protocol. The
basic idea behind JAR and PAR is that the OAuth client wraps the authorization
request parameters in a JWT, as shown in figure 10.7. The client sends the signed JWT
to the authorization server over an authenticated request in exchange for a unique
URL that allows the user agent to initiate the authorization process securely. Section
10.5 explains the JAR and PAR protocols in detail.
 To further prevent threat actors from crafting malicious authorization requests,
FAPI 2.0 forbids the use of open redirect URLs. Open redirect allows client applications to set the value of the redirect_uri in the authorization URL dynamically.
Instead, FAPI 2.0 requires clients to register their allowed list of redirect URLs, and
authorization servers must verify that the request_uri included in the authorization
request matches one of the preregistered URLs.
 The requirements discussed so far ensure that our applications can authenticate
users and issue access tokens securely. The next step is ensuring that threat actors
can’t use other users’ access tokens even if they happen to get their hands on them.
To this end, FAPI 2.0 requires applications to use sender-constrained tokens. As discussed in chapter 7, sender-constrained tokens contain proof that the token belongs
to its legitimate user, which we achieve by binding the token to the user’s Transport
Layer Security (TLS) certificate (mTLS for certificate-bound tokens) or through a
special JWT signed with a user-exclusive key called a DPoP token.
10.4
Securing APIs with FAPI 2.0’s security profile
Figure 10.7
Using PAR, the client exchanges the authorization request parameters with the 
authorization server for a unique request URI. Then the client uses the request URI to form the 
authorization request URL and redirects the user agent to it.
FAPI 2.0 also discourages the use of refresh token rotation. Because only confidential
clients are allowed, and their interactions with the authorization server must be
authenticated over a secure backchannel, refresh tokens don’t provide additional
benefits, and their use introduces unnecessary complexity and potentially degrades
user experience.
 Finally, FAPI 2.0 places some constraints on the algorithms we can use to sign access
tokens. A common source of vulnerabilities in APIs that use JWTs to authorize access
revolves around the token signature. As we learned in chapters 7 and 8, JWTs indicate
which algorithm was used to produce the signature through the alg field in the token’s
header. JWTs carry the alg field to support cases in which tokens may be signed with different algorithms. When our API supports multiple types of signing algorithms, we use
the alg header to select the right algorithm to validate the token’s signature. As we saw
in chapter 8, threat actors abuse this feature to trick APIs into accepting forged tokens
by exploiting a vulnerability called algorithm confusion. We also learned about factors
/authorize?client_id=s6BhdR&request_uri=39221fa2
Client
Authorization server
User agent
The user agent requests an authorization
request URL from the client.
The client wraps the authorization request
parameters in a JWT and sends them to
the authorization server in exchange for a
request URI.
The authorization server produces a unique
request URI and sends it back to the client.
The client issues an authoriztion
request URL with the provided
request URI and redirects the user
agent to that URL.
The user agent follows the
redirect to complete the
process with the
authorization server.
39221fa2

---

## Sección 142: CHAPTER 10 [Entropy: 0.56]

Financial-grade APIs
that can make the RS256 signing algorithm vulnerable to Bleichenbacher’s 2006 signature forgery attack. To prevent all these problems, FAPI 2.0 allows signing JWTs only
with PS256, ES256, and EdDSA (with the Ed25519 signature scheme) algorithms.
Resource servers must reject tokens signed with any other algorithm. See chapter 8 for
techniques that constrain the allowed signing algorithms when validating JWTs.
10.5
Securing authorization requests
Now that we understand the security requirements of FAPI 2.0’s security profile, let’s
dive into the details of how JAR and PAR work. To access protected data in a resource
server, we must obtain an access token. As we saw in chapter 7 and as shown in figure
10.8, we begin the process of obtaining an access token by making an authorization
request.
Figure 10.8
OAuth flows begin with an authorization request, during which the resource 
owner verifies their identity and consents to allow the client to access their data on the 
resource server. The authorization server responds with an authorization code that the client 
exchanges for an access token.
The authorization request must contain certain parameters, such as response_type,
client_id, and redirect_uri, which are needed to authenticate the user and redirect
them to the application. A typical authorization request might look like this:
https://auth.example.com/authorize?response_type=code
➥&client_id=s6BhdRkqt3&redirect_uri=https://example.com
The problem with this URL is that it includes all the client data in the URL and is not
authenticated. As illustrated in figure 10.9, including sensitive data in the URL is
Authorization
server
API
(resource server)
POST /authorize
 ?client_id=0efdad8b
 &response_type=code
 &audience=https://apithreats.com
Client
Login and consent
Client
{"access_token": "0f94d3dbff46"}
GET /payments
Authorization request
Resource owner
10.5
Securing authorization requests
dangerous because it may become available to threat actors who eavesdrop on the
connection between the user and the authorization server. This vulnerability may
allow threat actors to perform a man-in-the-middle attack and tamper with the authorization request, for example, by overriding the redirect_uri and setting its value to a
malicious site where they may seize control of the authorization code. As we saw in section 10.3, exposing authorization parameters in the URL also allows threat actors to
forge authorization requests for CSRF attacks against the token endpoint. Sensitive
data included in the authorization request may also leak in access logs, becoming visible to anyone who can access the logs. Finally, because the authorization request
doesn’t contain proof of identity, the authorization server doesn’t have the necessary
information to discriminate between legitimate and forged authorization requests.
Figure 10.9
Exposing authorization request parameters in the URL means threat actors can forge authorization 
requests to steal access tokens from other users.
To protect authorization requests from exploits like the one illustrated in figure 10.9,
we use JWT-secured authorization requests (JARs). JARs were introduced in RFC 9101
[13].
 As illustrated in figure 10.10, JAR is a method of protecting authorization requests
from tampering, forgery, hijacking, and other exploits by including sensitive values in
the request in a special JWT known as the request object. The request object is signed
using a private key assigned to the client to prove its identity.
Page 1
https://malicious-site.com
<script>
window.onload = function() {
 window.location.href = authorization_request_url;
};
</script>
/authorize?response_type=code&client_id=s6BhdR&redirect_uri=https://malicious-site.com
User visits a malicious website,
where they are immediately
redirected to their IdP with an
authorization request.
Page 1
https://malicious-site.com
<script>
window.onload = function() {
 const code = URL(document.location.toString()).searchParams.get("code");
 fetch("https://identity-provider.com/oauth/token", 
 {method: "POST", "body": new URLSearchParams({code: code})
 ).then(response => response.json())
};
</script>
Identity provider
Because the user is already
logged in, the IdP responds with
an authorization code and
redirects the user to the
malicious site.
2
Upon redirection, the malicious
site fetches the authorization
code from the URL and
exchanges it right away for an
access token.
258

---

## Sección 143: CHAPTER 10 [Entropy: 0.358]

Financial-grade APIs
 
Figure 10.10
With JAR, the client wraps the authorization request parameters in a signed JWT and uses it to 
produce the authorization request URL. Then it uses that URL to redirect the client to the authorization server.
As shown in listing 10.1, a request object contains all the standard claims of the JWT
specification plus the parameters required in the authorization request, such as
client_id, redirect_uri, and response_type. The token may also contain fields that
are typical of an authorization request, such as scope, and CSRF protection parameters, such as state and nonce. If you need a refresher on the meaning and use of these
authorization parameters, refer to chapter 7.
 {
 "iss": "s6BhdRkqt3",
 "aud": "https://auth.apithreats.com",
 "response_type": "code id_token",
 "client_id": "s6BhdRkqt3",
Listing 10.1
Request object payload for a JWT-secured authorization request
{
 "typ": "JWT",
 "alg": "HS256"
}
Signature
Header
{
 "iss": "s6BhdRkqt3",
 "aud": "https://auth.apithreats.com",
 "response_type": "code id_token",
 "client_id": "s6BhdRkqt3",
 "redirect_uri": "https://client.example.org/cb",
 "scope": "openid",
 "state": "af0ifjsldkj",
 "nonce": "n-0S6_WzA2Mj",
 "max_age": 86400
 }
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3M...
Page 1
https://example.com
Client
Authorization server
/authorize?client_id=s6BhdR&request=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3M...
The user agent requests an
authorization URL from the client.
/authorize?client_id=s6BhdR&request=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3M...
The client wraps the
authorization request
parameters within a
signed JWT.
The user agent follows the redirect to
complete the process with the
authorization server.
Then it redirects the
user agent with a 303
response status code.
Then it uses the signed
JWT to produce the
authorization request URL.
4
Payload (claims)
10.5
Securing authorization requests
 "redirect_uri": "https://apithreats.com",
 "scope": "openid",
 "state": "af0ifjsldkj",
 "nonce": "n-0S6_WzA2Mj",
 "max_age": 86400
}
As you see in the listing, client_id and iss have the same value because the request
object JWT is issued by the client. Also, the aud claim represents the authorization
server because the JWT is intended for the authorization server. The request object is
signed with a private key assigned to the client, which is how we prove that the request
comes from the right client and has not been tampered with, and it is base64url
encoded for safe transmission over HTTP. If the request object contains sensitive
information that you don’t want to expose, you can also encrypt it using JSON Web
Encryption (JWE; see chapter 7).
 When the client produces the signed request object, we send it to the authorization server in the authorization request. We have two ways of passing the request
object to the authorization server: passing by value and passing by reference.
 As illustrated in figure 10.11, passing by value means that the client sends the
request object directly to the authorization server. In this case, we base64url-encode
the request object JWT and include it in the authorization request through a query
parameter named request.
Authorization server
Client
User agent
The user agent asks the client
for an authorization
request URL.
Payload (claims)
Signature
Header
{
 "iss": "s6BhdRkqt3",
 "aud": "https://auth.apithreats.com",
 "response_type": "code id_token",
 ...
 }
/authorize?client_id=s6BhdR&request=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3M...
The client wraps the authorization
request parameters in a JWT and issues
the authorization request URL.
The user agent follows the redirect to
complete the authorization process.
Figure 10.11
When 
we pass the request 
object by value, the 
client produces the 
authorization request 
JWT and inserts its 
value into the 
request’s request 
parameter.

---

## Sección 144: CHAPTER 10 [Entropy: 0.355]

Financial-grade APIs
As illustrated in figure 10.12, passing by reference means that we include an identifier
that references the request object in a query parameter named request_uri in the
authorization request. In this case, the request object is stored in the client server, and
we make it available to the authorization server so it can verify its authenticity when
the user agent sends the authorization request. We make the request object accessible
by creating a Uniform Resource Identifier (URI) accessible through a GET request.
This URI is the request object’s identifier, is short lived (less than a minute), and is
valid for one-time access. When the authorization server receives the authorization
Authorization server
Client
User agent
The user agent asks the client
for an authorization
request URL.
Payload (claims)
Signature
Header
{
 "iss": "s6BhdRkqt3",
 "aud": "https://auth.apithreats.com",
 "response_type": "code id_token",
 ...
 }
/authorize?client_id=s6BhdR&request=https://client.com/oauth/jar?request_uri=ccce5ea9
The client issues the request
object, stores it in its
database, and returns its URI.
The user agent follows the redirect to
complete the authorization process.
ccce5ea9
The authorization server checks the request URI to
verify that the authorization request is legitimate.
Figure 10.12
When we pass the request object by reference, the client stores the request object in its 
database and issues a URI that identifies the object. Then it inserts the URI into the authorization request 
using the request_uri parameter. The request URI is accessible to the authorization server to verify 
that the authorization request is legitimate.
10.5
Securing authorization requests
request with the request object’s reference in the request_uri parameter, it verifies its
legitimacy by accessing its value on the provided URI.
 In addition to the request or request_uri parameter, the authorization request
must include the client_id to identify the client. Following is an example of an authorization request URL using the pass-by-value method, which includes the request
object in the URL:
https://server.example.com/authorize?client_id=s6BhdRkqt3&request=eyJhbGciO
➥iJSUzI1NiIsImtpZCI6ImsyYmRjIn0.ewogICAgImlzcyI6ICJzNkJoZFJrcXQzIiwKICAg
➥ICJhdWQiOiAiaHR0cHM6Ly9zZXJ2ZXIuZXhhbXBsZS5jb20iLAogICAgInJlc3BvbnNlX3R
➥5cGUiOiAiY29kZSBpZF90b2tlbiIsCiAgICAiY2xpZW50X2lkIjogInM2QmhkUmtxdDMiLA
➥ogICAgInJlZGlyZWN0X3VyaSI6ICJodHRwczovL2NsaWVudC5leGFtcGxlLm9yZy9jYiIsC
➥iAgICAic2NvcGUiOiAib3BlbmlkIiwKICAgICJzdGF0ZSI6ICJhZjBpZmpzbGRraiIsCiAg
➥ICAibm9uY2UiOiAibi0wUzZfV3pBMk1qIiwKICAgICJtYXhfYWdlIjogODY0MDAKfQ.Nsxa
➥_18VUElVaPjqW_ToI1yrEJ67BgKb5xsuZRVqzGkfKrOIX7BCx0biSxYGmjK9KJPctH1OC0i
➥QJwXu5YVY-vnW0_PLJb1C2HG-ztVzcnKZC2gE4i0vgQcpkUOCpW3SEYXnyWnKzuKzqSb1wA
➥ZALo5f89B_p6QA6j6JwBSRvdVsDPdulW8lKxGTbH82czCaQ50rLAg3EYLYaCb4ik4I1zGXE
➥4fvim9FIMs8OCMmzwIB5S-ujFfzwFjoyuPEV4hJnoVUmXR_W9typPf846lGwA8h9G9oNTIu
➥X8Ft2jfpnZdFmLg3_wr3Wa5q3a-lfbgF3S9H_8nN3j1i7tLR_5Nz-g
JARs allow us to protect the integrity of our authorization requests by including the
signature element of the JWT in the request object. This ensures that threat actors
can’t tamper with authorization requests by including malicious redirect URIs and
other values. Sending the request object by value, however, means we’re still exposing
its values through the wire. If the signing process applied to the request object isn’t
robust enough, threat actors may be able to break the signing key and forge new
tokens. Meanwhile, passing by reference makes the request object available to threat
actors eavesdropping on the network. To prevent these types of scenarios, RFC 9126
[14] introduces the concept of pushed authorization requests (PARs).
 PARs add an extra layer of security by requiring the client to send or push the
request object to the authorization server in return for a URI. Authorization servers
that support PAR requests are required to include a PAR endpoint to which the client
sends the request object for registration. The PAR endpoint must be documented in
the server metadata or discovery endpoint.
 As illustrated in figure 10.13, in a PAR, the client issues the request object and
pushes it to the authorization server in exchange for a request URI. There are two
variants of this flow:
The client sends the authorization request parameters to the authorization
server’s PAR endpoint in the body of a POST request.
The client produces the signed request object and sends it to the authorization
server’s PAR endpoint in the body of a POST request.
We use a POST request in both cases to include the authorization request parameters in
the request body and prevent their leakage through the URL. The client must include
authentication details when sending the PAR, and the authorization server must
check the client’s credentials before processing the PAR’s payload to ensure that the
authorization server processes only legitimate requests.

---

## Sección 145: CHAPTER 10 [Entropy: 0.316]

Financial-grade APIs
 
Figure 10.13
In a PAR, the client issues the authorization request JWT and pushes it to the authorization server 
in exchange for a request URI, which the client inserts into the authorization request’s request_uri parameter.
If the pushed authorization request is successful, the authorization server responds
with a request object URI, which is for one-time use only and valid for a limited period
(between 5 and 600 seconds). The user agent includes the request object URI in the
authorization request in a parameter named request_uri, as in the case of JARs.
 By combining JARs with PARs, we gain the benefits of client authentication to legitimize our authorization requests, and we mitigate the risk of authorization request
tampering or forgery by removing the parameters from the URL.
10.6
Message signing
Now that we understand how JARs and PARs work, we have all the ingredients necessary to implement FAPI 2.0’s security profiles. The next step in our journey is FAPI
2.0’s message-signing profile, which adds an extra layer of security for critically sensitive APIs.
 Message signing is an advanced profile that builds on FAPI 2.0’s security profile. The
goal of the message-signing profile is to allow APIs to feature nonrepudiation capabilities. Nonrepudiation refers to the ability to prove that a certain user undertook a specific action. This feature is important for applications in finance, healthcare, law, and
other fields in which user actions carry financial or legal risk or applications in which
user actions cannot be reverted easily. In all those cases, we must be able to prove that
the user committed a specific action.
 On an e-commerce site, for example, user Bob may have placed an online order
for a nonrefundable product. After the item is delivered, Bob tries the product and
Authorization server
Client
User agent
The user agent asks the
client for an authorization
request URL.
{
 "iss": "s6BhdRkqt3",
 "aud": "https://auth.apithreats.com",
 "response_type": "code id_token",
 ...
 }
/authorize?client_id=s6BhdR&request_uri=ccce5ea9
The client sends the authorization
request parameters to the authorization
server.
ccce5ea9
The user agent follows the redirect to
complete the authorization process.
The authorization server issues a
unique request URI to identify
this authorization request.
The client produces the authorization
request URL with the request URI and
redirects the user agent.
263
10.6
Message signing
decides that he doesn’t like it. Because the product is nonrefundable, however, he
can’t get his money back, so he raises a claim stating that his account was hijacked,
and the order was placed by a hacker.
 How do we prove that Bob placed the online order? Following the security practices we’ve discussed so far in this book, we can ensure that the process of placing an
order online is secure—free from business flow exploits, command and database
injections, and so on. But we don’t have the tools to prove whether Bob placed the
order. All we know is that an order was placed using Bob’s account. To achieve a
higher level of confidence in the relationship between users and their actions, we
need an additional layer of security, and that’s where message signing comes in.
 Message signing achieves nonrepudiation through signature proofs. The idea is to
prove that the authorization process and the resulting access tokens and their use are
bound to their legitimate user, and we accomplish that by signing every message
involved in this process.
 The first step is proving the authenticity of the authorization request. We achieve
this by using PARs. As we learned in section 10.5, PARs require the client to push the
authorization request parameters to the authorization server in return for a
request_uri. The client’s PAR request is authenticated, and the request_uri is shortlived and one-time use only, mitigating the risk of relay and replay attacks.
 If the authorization request is successful, the authorization server responds with an
authorization code using the JWT-secured authorization response mode protocol
(JARM). With JARM, the authorization server returns the authorization code within a
JWT. The JWT’s signature proves that the response came from the legitimate authorization server. The goal of JARM is to protect the client from attacks wherein a threat
actor intercepts the response from the authorization server and modifies its content
before relaying it back to the user agent. In that scenario, the threat actor may be able
to trick the client into sending the authorization code to a malicious server, allowing
the malicious actor to exchange the code for an access token. You can learn more
about JARM from the specification “JWT Secured Authorization Response Mode for
OAuth 2.0 (JARM)” [15].
 In some cases, resource servers need to obtain additional information about an
access token. The OAuth specification isn’t prescriptive about the type of token that
can be used, and many implementations choose to use opaque tokens. Unlike JWTs,
opaque tokens can’t be inspected, and in such cases, resource servers need a mechanism to prove the token’s authenticity (confirm that it was issued by the right authorization server). The token introspection endpoint serves that need.
 Authorization servers expose a token introspection endpoint to allow resource
servers to obtain additional details about an access token. This functionality is also
useful for JWTs if the JWT has a unique identifier (the jti claim) and the resource
server needs to confirm that the jti is legitimate. FAPI 2.0’s message-signing profile
requires that the token introspection endpoint be authenticated and that the authorization server’s responses include the results of the introspection within a signed JWT.
By requiring credentials, we mitigate the risk that threat actors will forge requests to

---

## Sección 146: CHAPTER 10 [Entropy: 0.295]

Financial-grade APIs
leak token data from our servers, and by signing the responses, resource servers can
rest assured that the token introspection response is legitimate.
DEFINITION
Token introspection is an endpoint in authorization servers that
allows clients to obtain additional information about an access token. The
requirements for token introspection endpoints are outlined in RFC 7662
[16]. RFC 9701 brings a layer of security for introspection endpoints by
requiring them to wrap their responses within a signed JWT [17].
The final requirement of the message-signing profile is that authorization servers sign
ID tokens—tokens that contain identifying information about the user, issued after a
successful authentication process with an OIDC provider. As we saw in chapter 7, ID
tokens have JWT format, including a header, a payload, and a signature. Although IdPs
can issue unsigned ID tokens, it’s best (and common practice) to issue signed ID
tokens. The signature allows client applications to verify the authenticity and integrity
of the token and then trust the identity information contained in the token.
 With these security measures in place, resource servers can rest assured that it is
impossible (or difficult) for a threat actor to hijack the authorization process. In other
words, access and ID tokens can be issued to the right client application only with the
involvement of their legitimate owner. After they’ve been issued, however, access
tokens can be stolen, and threat actors can impersonate users. To prevent that situation, we use any of the sender-constrained techniques discussed in chapter 7, such as
certificate-bound or demonstrating proof of possession (DPoP) tokens. If we use
DPoP tokens, FAPI’s security profile recommends making them short lived or using
the jti (JWT ID) claim to mitigate the risk of token replay.
Summary
FAPI is a highly secure OAuth profile. Although FAPI 1.0 was originally
designed for financial-grade APIs, FAPI 2.0 is useful for all APIs with strong
security requirements.
FAPI 2.0’s attacker model satisfies three goals:
– Secure authorization—Every operation can be performed only by authorized
parties.
– Secure authorization—Threat actors can’t impersonate other users.
– Session integrity—Threat actors can’t tamper with, replay, or otherwise interfere with legitimate user requests.
FAPI supports only confidential clients and requires that interactions between
the client and the authorization server be authenticated.
JARs allow us to send authorization request parameters securely by wrapping
them within a JWT known as the request object. The JWT guarantees the integrity of the authorization request, mitigating the risk of tampering.
PARs add a layer of security to JARs by requiring clients to push the request
object to the authorization server. The PAR must be authenticated to prove that
the request is legitimate.
Summary
JARM requires authorization servers to return the output of a successful authorization request wrapped in a JWT. The JWT’s signature guarantees the integrity
of the payload and therefore mitigates the risk of tampering.
Message signing is a FAPI 2.0 profile that allows APIs to support nonrepudiation. Nonrepudiation is the ability to prove that a certain user undertook a specific action, and it’s crucial for applications in which user actions carry legal or
financial risk.
Message signing achieves nonrepudiation with signature proofs, which guarantee the integrity of the payloads and prove that they have a legitimate source of
origin:
– Signing authorization requests using PAR
– Signing authorization code responses using JARM
– Wrapping the response from the token introspection endpoint within a
signed JWT
– Signing ID tokens
To ensure that access tokens are used only by their legitimate owners, we use
sender-constrained techniques such as certificate-bound or DPoP tokens.
Observability for
API security
You’ve built your shiny new API and released it to the world. Developers are
excited, and tons of new users are signing up to use it and integrate it into their
own applications. Life is good. Within a few days, though, your customers start
complaining. Your API doesn’t always work as expected. Sometimes, the API
returns malformed responses; often, it’s down. Some users are reporting that their
data is suddenly gone or appears to have been accessed and modified without
authorization. How do you get a picture of what is going on, pin down the problems, and identify the root causes?
This chapter covers
Understanding observability and how it protects 
our APIs
Using logs, traces, and metrics for API 
observability and security
Instrumenting APIs to produce logs, traces, and 
metrics
Using observability to detect threats and identify 
malicious actors
11.1
What is API observability?
 The answer to these questions is API observability: the practice of generating, collecting, and continuously analyzing data from our APIs. Without observability, it’s
hard to tell how users engage with our APIs, trace errors, detect malicious activity, discover undocumented attack surface, and identify threats. For that reason, threat
actors can sneak under the radar and attack your APIs without your knowledge. Lack
of observability is a threat actor’s treasure trove.
 The National Institute of Standards and Technology Cybersecurity Framework
(NIST CSF) describes five key cybersecurity functions: identify, protect, detect,
respond, and recover. In previous chapters, we learned how to identify sources of
threats to our APIs and mitigate their risks. In this chapter, we tackle the detect function. It’s good that we built a robust and secure API, but there’s no such thing as a bulletproof security system; threat actors will always find a way through our APIs.
 Good detection mechanisms are crucial for effective response to and recovery
from a threat event, and the key to effective detection is observability. Observability
allows us to understand how our users interact with our APIs and where our APIs
are erroring or failing to behave as expected. Without observability, we don’t know
when, where, and how errors happen; worst of all, we don’t know whether we’re
under attack. In this chapter, we’ll make sure that none of these things happen to our
APIs.
11.1
What is API observability?
When our APIs are running in production, we need to know whether they are operating as expected or are erroring, degrading user experience, or otherwise causing
unwanted outcomes. The traditional answer to identifying issues in production is
monitoring. Monitoring is the practice of capturing data for predefined metrics (such
as requests per second, response latencies, and CPU usage) and creating alerts to be
triggered when the metrics cross a certain threshold.
 Traditional monitoring excels at identifying well-defined problems for which we
can easily create metrics. But what about open-ended problems that have no clear
metric? How do we identify what happened to users who claim their data was accessed
and modified by unauthorized parties? For that type of analysis, we need a more comprehensive approach to application monitoring that captures richer details and puts
them together in a way that makes it easy to run exploratory analyses. That’s where
observability comes in.
 Observability measures the internal states of a system based on its outputs. The
concept borrows from control theory, the goal of which is to develop models that can
drive a system into a desired state based on inputs; the state of the system is determined based on its outputs. As illustrated in figure 11.1, when applied to software, the
goal of observability is to determine the state of our systems based on their outputs or
signals, such as logs.

---

## Sección 147: CHAPTER 11 [Entropy: 0.28]

Observability for API security
 
Figure 11.1
By continuously analyzing our logs, we gain an understanding of the state of our system. In this 
example, we find that one endpoint is encountering an unusual error rate.
We call the outputs produced by software applications telemetry data. The most common type of telemetry data is logs, but it also includes metrics and other types of data
that we’ll discuss in this chapter. Telemetry data allows us to understand the state of
our applications, their health, and the way users interact with them. All this information helps us reduce the mean time to recovery (MTTR), and it is crucial for ensuring
the reliability and proper functioning of our APIs and services.
DEFINITION
MTTR is the time it takes to restore a service after a production
failure such as an unexpected outage. MTTR is one of the key metrics used in
the State of DevOps report by the DevOps Research and Assessment (DORA)
team (the term used in the latest reports is failed deployment recovery time), with
top-performing teams achieving an MTTR of less than an hour [1].
From a security perspective, observability also helps us detect threats and malicious
behavior. In regulated environments, the information gathered through observability
serves as an audit trail, which is crucial for supporting security investigations. In the
following sections, you’ll learn to get your APIs ready for observability and use observability for security.
DEFINITION
Audit trails are chronological records of events of who did what,
where, and when. We use audit trails to support cybersecurity investigations
for accountability and regulatory compliance. This chapter describes how to
produce application-level audit trails, but you should keep detailed logs of
overall system and infrastructure changes too. If you deploy to cloud providers, you can use services such as Amazon Web Services (AWS) CloudTrail to
keep a record of all actions performed on your infrastructure.
11.2
Logs, traces, and metrics
In software, our systems output logs, traces, and metrics. These outputs are known as
signals in OpenTelemetry (OTel), and they are the elements that help us understand
Payments API
Logs
Logs analyzer
GET /payments
GET /payments HTTP/1.1 200 OK
POST /payments HTTP/1.1 201 Created
PUT /payments/10 HTTP/1.1 500 Internal Server Error
PUT /payments/4 HTTP/1.1 500 Internal Server Error
Unusual error rate in PUT
/payments/{payment_id} endpoint
11.2
Logs, traces, and metrics
and diagnose our systems. As Cindy Sridharan, author of Distributed Systems Observability [2], puts it, logs, metrics, and traces are the pillars of observability. Let’s take a
closer look at these elements and understand their uses.
DEFINITION
OTel is a standard observability framework (https://opentelemetry
.io). OTel is open source (https://github.com/open-telemetry), and it’s both
vendor- and tool-agnostic. OTel defines a collection of APIs that observability
tools must implement to be OTel compliant, and it maintains a list of recommended SDKs (https://opentelemetry.io/docs/languages) that we can use to
instrument our applications to generate, collect, and export telemetry data. To
learn more about OTel, check out Daniel Gomez Blanco’s Practical OpenTelemetry [3] and Michael Hausenblas’s Cloud Observability in Action [4]. For a more
practical approach, check out Phil Wilkins’s Logs and Telemetry: Using Fluent Bit,
Kubernetes, Streaming, and More [5], and for a generic approach to software telemetry, read Jamie Riedesel’s Software Telemetry: Reliable Logging and Monitoring [6].
Logs are records of specific events. When something happens in our system, such as
when we receive a request or an error is raised, we issue a log to keep a record of that
event. Logs help us understand what is going on with our system, what endpoints are
being used, what errors are being raised, and so on. As shown in figure 11.2, however,
it’s quite difficult to connect the dots with logs. When an error is raised, for example,
it’s very difficult to correlate that error to a specific request log. To do that, we need
traces.
Figure 11.2
Every step in processing an API request may raise a log for our records. Without something to 
correlate the logs, it’s difficult to connect them all and get the full picture.
Traces are records of the multiple processing steps taken to process a request throughout our system. As such, traces help us connect the dots between multiple logs by correlating the different logs produced during successive stages of a process through the
same trace ID. As illustrated in figure 11.3, when we process an HTTP request, we perform various tasks, such as running database queries, calling other services, and
Orders API
Logs
POST /orders
Payment processed
POST /payments HTTP/1.1 201 Created
Error while persisting record to
the database
Inventory stock updated
Payments API

---

## Sección 148: CHAPTER 11 [Entropy: 0.265]

Observability for API security
carrying out other business logic tasks. Each task can raise its own logs, and traces
allow us to connect those logs so we can reconstruct the sequence of steps that went
into processing each request.
Figure 11.3
Traces help us connect all the logs that were raised within the same context, such as processing an 
HTTP request.
Traces are particularly helpful for understanding distributed systems because they give
us end-to-end visibility of a request’s life cycle across service boundaries. As illustrated
in figure 11.4, in a distributed system, events may go through several processing steps
across different services. When a user requests a quote from a home insurance
website, their details may be processed by a quote service, which calculates the result
Logs
POST /orders
TraceId: b722f69d
Payment processed
TraceId: b722f69d
POST /payments HTTP/1.1 201 Created
TraceId: b722f69d
Inventory stock updated
TraceId: b722f69d
Error while persisting record
to the database
Payments API
Orders API
User service
logs
Risk assessment
service logs
Policy management
service logs
Success
Internal
server error
Success
Status code: 200
Status code: 200
Status code: 500
User service
Risk
assessment
service
Policy
management
service
Insurance quote
service
Insurance quote
service logs
POST /quotes
Status code: 500
{"error": "Unable to
process your request"}
Figure 11.4
In distributed architectures, it can be difficult to find the cause of an error if we have no way to 
correlate logs from different services.
11.2
Logs, traces, and metrics
by collaborating with the user service, the risk assessment service, and the policy management service. During this process, any of the collaborating services may fail, resulting in the inability of our website to produce the insurance quote.
 As illustrated in figure 11.4, when the erroring service fails, it produces an error
log. Taken in isolation, error logs inform us of what went wrong with the failing service, which is valuable information that helps us reproduce the error, debug the service, and fix it. In figure 11.4, the risk assessment service fails with an internal server
error. Upon inspecting the logs, we find that the error was caused by a bad payload
containing a malformed postal code address, causing an error when the service
searched the area for environmental risk. How did the malformed postal code make
its way to the risk assessment service? Without a mechanism to correlate logs from all
services, it’s difficult to answer this question. The best we can do is add a postal code
validator to the risk assessment service and respond with a 422 status when we receive
invalid postal codes, as illustrated in figure 11.5.
Figure 11.5
To avoid internal server errors in the risk assessment service, we strengthen its data validation layer 
and make it return a 422 response when it receives invalid data.
The fix applied to the risk assessment service in figure 11.5 helps prevent future server
errors when it receives malformed postal codes, but it doesn’t address the root cause
of the problem, which is why it got a malformed postal code in the first place. Until we
resolve that problem, users who insert bad postal codes will continue to be unable to
receive insurance policy quotes.
 Service-level logs, like those illustrated in figures 11.4 and 11.5, help us improve
our services individually, but they don’t help us improve our system because they don’t
give us the full context in which the error occurred; therefore, they don’t allow us to
trace the root cause of the error. To find and understand the bigger context of an
User service
logs
Risk assessment
service logs
Policy management
service logs
Success
Malformed
payload
Success
Status code: 200
Status code: 200
Status code: 422
User service
Risk
assessment
service
Policy
management
service
Insurance quote
service
Insurance quote
service logs
POST /quotes
Status code: 500
{"error": "Unable to
process your request"}

---

## Sección 149: CHAPTER 11 [Entropy: 0.25]

Observability for API security
error, we use traces. As shown in figure 11.6, traces are logs with additional information about the context in which they occurred, such as the downstream event that triggered the event for which the log occurred.
Figure 11.6
Adding traces to our logs allows us to correlate them and determine the original input that caused 
an error in an upstream service.
Traces give us the full picture of an error and help us determine its root cause. The
malformed postal code detail that triggered an error in the risk assessment service
could have been caused by a mistake in the UI while capturing user details. Upon
closer inspection, we could determine that the UI failed to make the postal code field
mandatory and instead sent a default dummy value. The dummy value isn’t a valid
postal code, so it caused the risk assessment service to fail. As illustrated in figure 11.6,
by using traces, we can obtain the full chain of events that led to this error and identify
the root cause of the problem.
 Traces foster cross-team collaboration by allowing us to identify the components
involved in an error. When we carry out this exercise, we get to think about the overall
improvements needed in our system to prevent such errors in the future, as opposed
to improving only individual services.
TIP
For an excellent demonstration of how structured telemetry data fosters
cross-team collaboration, check out Matthew Skelton’s “Practical, teamfocused operability techniques for distributed systems,” presented at Dev-
OpsCon Munich 2017 (https://mng.bz/Rw1D).
Finally, metrics are measures of things that happen in our applications; they capture
details on resource use and systems behavior. In figure 11.7, we have different kinds of
metrics, such as low-level operating system (OS) statistics, and higher-level data, such
User service
logs
Risk assessment
service logs
Policy management
service logs
Trace ID: 58bd41bf
Success
Trace ID: 58bd41bf
Malformed payload
Trace ID: 58bd41bf
Success
Status code: 200
Status code: 200
Status code: 422
User service
Risk
assessment
service
Policy
management
service
Insurance
quote
service
Insurance quote
service logs
POST /quotes
{malformed postal code}
Status code: 500
{"error": "Unable to
process your request"}
Trace ID: 58bd41bf
Server error
11.2
Logs, traces, and metrics
as response latency and requests per second. OS metrics tell us about resource usage;
they include CPU and memory usage, disk space, and so on. Those metrics tell us
about the health of our system and whether we need to scale our resources.
Figure 11.7
Low-level performance metrics help us understand the state of our system; 
higher-level API metrics help us understand how users interact with our APIs.
Higher-level metrics, such as the number of requests per second or average response
latency, give us insight into how our users interact with our APIs, and they’re very
helpful in detecting threats to our system. As illustrated in figure 11.8, keeping track
Payments API
GET /payments
CPU usage
70%
Memory usage
80%
Disk usage
50%
Network bandwidth
90%
System metrics
Requests per second
7,000
Error rate
3%
Response time
100ms
Uptime
98%
API metrics
Payments API
User: cc35ff86
GET /payments
Requests per second
7,000
Error rate
3%
Response time
100ms
Uptime
98%
API metrics
Active users
12,000
User API requests
per second
.8
User: 9281c2de
GET /payments
Requests per second
(9281c2de)
Requests per second
(cc35ff86)
2,000
Figure 11.8
By tracking higher-level metrics about API use, we can detect outliers and potential threats. In this 
case, we observe that user cc35ff86 is sending an unusual number of requests, which could indicate that they 
are a malicious actor.

---

## Sección 150: CHAPTER 11 [Entropy: 0.379]

Observability for API security
of these metrics helps us identify outliers, such as users sending unusual amounts of
requests to our APIs or slower-than-usual response times. When we put this information together with logs and traces, we have the right setup to track down and identify
threats to our system and the malicious actors behind them.
11.3
Instrumenting APIs
Now that we know what logs, traces, and metrics are and how to use them, let’s set up
our system to produce them. The critical concept is instrumentation.
 Telemetry is a fundamental feature of software applications. Telemetry informs us
whether our applications are running well or have issues. Producing telemetry data
alone isn’t very useful, however; we also must collect, store, and process that data in a
way that allows us to draw insights from it. The practice of getting applications ready
to produce telemetry and collecting telemetry details is called instrumentation. Instrumentation makes our systems observable and allows us to detect anomalies and
threats. As shown in figure 11.9, if we want to understand how long it takes our application to run certain database queries, we need logs about those queries so we can
analyze them and obtain the relevant metrics. Changing our code to produce those
logs is instrumentation.
Figure 11.9
Collecting logs about the processes that happen inside our applications, such as database queries, 
can be helpful for debugging a problem or researching a cybersecurity incident. Such logs aren’t emitted by default, 
so we must make manual changes to our code to produce them.
Some instrumentation comes right out of the box. Most web frameworks, for example,
produce request and response logs on every request that comes to our server. All we
have to do is capture those logs and store them in a way that makes it easy to draw
insights from them. Some observability frameworks, such as OTel, also support autoinstrumentation. The idea behind autoinstrumentation is to get our applications ready to
Payments API
User 9281c2de
User bb7f651e
User 1ce89e68
GET /payments
GET /payments/10
POST /payments
select * from payments where payment.user_id = '9281c2de'
select * from payments \
 where payment.user_id = '9281c2de' and payment.id = 10
insert into payments \
 (user_id, amount, ...) values ('1ce89e68', 100, ...)
Logs
Execution time: 5ms
Execution time: 1ms
Execution time: 2ms
11.3
Instrumenting APIs
produce useful signals without our making any code changes. We simply install a few
dependencies, run a few commands to wire up our application with OTel, and we’re
ready to start getting signals.
 OTel’s website maintains a list of zero-code instrumentation guides for the most
popular software development languages, including Go, C#, PHP, Python, Java, and
JavaScript (https://opentelemetry.io/docs/zero-code). I’ll illustrate the autoinstrumentation process for Python with a practical example. As in previous chapters, I use
a FastAPI application as an example and the uv dependency management tool to
install the dependencies. Check ch11/README.md in this book’s GitHub repository
(https://github.com/abunuwas/secure-apis) for details on installing Python and uv,
as well as details on the dependencies. First, let’s create a virtual environment for our
project and activate the virtual environment:
uv init otel-fastapi && cd otel-fastapi && source .venv/bin/activate
Now let’s install FastAPI and Uvicorn:
uv add fastapi uvicorn
Create a file named server.py within the project’s folder, and copy the code under
ch11/server.py into that file. The server.py file implements a simple API that we’ll use
to illustrate the logging capabilities of OTel’s autoinstrumentation packages. Next, we
install the essential libraries we need to add zero-code instrumentation to our Python
application:
uv add opentelemetry-distro opentelemetry-exporter-otlp
opentelemetry-distro has all the utilities we need to start producing structured OTel
logs, and opentelemetry-exporter-otlp is a library that allows us to export those logs to
a log collector of choice. The next step is adding the relevant instrumentation libraries for our project packages, such as FastAPI and Uvicorn. We do it with the command
opentelemetry-bootstrap -a install
This command reads our list of dependencies and installs their corresponding instrumentation packages if available. To install the packages, opentelemetry-bootstrap
uses the pip module. If pip is not available in your environment and each package
installation fails with a message along the lines of No module named pip install, run
the following command to make pip available in your virtual environment:
python -m ensurepip
Then run opentelemetry-bootstrap -a install again to install the instrumentation
packages. When you’ve done this, you can run the FastAPI application and start getting structured logs for free. Use the following command to instrument the application and export logs to the console:
opentelemetry-instrument --traces_exporter console \
--metrics_exporter console --logs_exporter console \
uvicorn server:server

---

## Sección 151: CHAPTER 11 [Entropy: 0.355]

Observability for API security
TIP
Uvicorn’s --reload flag, which reloads the application when the code
changes, is useful for local development, but it interferes with the instrumentation libraries’ capability to hook into processes and export their outputs. If
you want to test OTel’s instrumentation on your local server, don’t use Uvicorn’s --reload flag.
The opentelemetry-instrument command instructs the instrumentation to export all
logs, traces, and metrics to the console. If you visit the API’s Swagger page at http://
localhost:8000/docs and call any of the endpoints, such as GET /books, you’ll see
OTel’s structured logs, in JSON format, in your terminal. For every event, you get
three logs that represent three different events:
The beginning of the HTTP response process
The preparation of the response body
Request details
The type of event is described in the attributes field, which in the first event is
{"asgi.event.type": "http.response.start", "http.status_code": 200}; in the second event, {"asgi.event.type": "http.response.body"}; and in the third event, a full
list of details on the request, as shown in the following listing. We call these events
spans; they represent steps in the processing of an HTTP request. All of them are part
of the same process because they share a trace ID, which is available in the
context.trace_id field. The following example of a span log has some lines truncated
with ellipses to shorten the listing.
{
 "name": "GET /books",
 "context": {
 "trace_id": "0x3b0367766ff238a8f6d7bdc8dc4b375b",
 "span_id": "0xe10f1dab2fc28c34",
 "trace_state": "[]"
 },
 "kind": "SpanKind.SERVER",
 "parent_id": null,
 "start_time": "2025-04-14T10:09:38.531298Z",
 "end_time": "2025-04-14T10:09:38.535245Z",
 "status": {
 "status_code": "UNSET"
 },
 "attributes": {
 "http.scheme": "http",
 "http.host": "127.0.0.1:8000",
 "net.host.port": 8000,
 "http.flavor": "1.1",
 "http.target": "/books",
 "http.url": "http://127.0.0.1:8000/books",
 "http.method": "GET",
 "http.server_name": "localhost:8000",
 "http.user_agent": "Mozilla/5.0 [...],
Listing 11.1
Example OTel span log
11.4
Logging custom events
 "net.peer.ip": "127.0.0.1",
 "net.peer.port": 50728,
 "http.route": "/books",
 "http.status_code": 200
 },
 [...]
 "resource": {
 "attributes": {
 [...]
 },
 "schema_url": ""
 }
}
As you can see, the logs produced by OTel’s autoinstrumentation packages contain a
great many details on each request and how it was processed. If your server raises an
exception while processing a request, OTel’s autoinstrumentation also captures that
exception and produces a span log for it with details on the error raised, the error
message, and the stack trace. With the help of the trace ID, you can pull all the associated spans in your logs to reconstruct the series of events that led to that error.
11.4
Logging custom events
Out-of-the-box signals produced by OTel’s zero-code instrumentation libraries, like
those discussed in section 11.3, help us understand the generic behavior of our applications. They give us insights into the number of requests per second, request latencies, most commonly used endpoints, and so on. As illustrated in figure 11.10, these
signals are about things that happen around our application. That information is useful, but sometimes, we want to get a deeper understanding of our application by looking at signals raised in our business layer. We may want to know how long it takes to
run calls against external service dependencies, or to perform certain database queries or data manipulation and transformation tasks. As illustrated in figure 11.10,
those signals come from inside our application, so raising them requires making manual changes in our code. When we produce those logs, we need to capture and store
them in a way that makes it easy to analyze them and draw insights.
Figure 11.10
Autoinstrumentation logs capture only events around the edges of our application, such as HTTP 
request events. To understand what happens inside our application, we must produce custom logs.
Payments API
GET /payments
Logs
Autoinstrumentation
{"asgi.event.type": "http.response.start", "http.status_code": 200}
{"asgi.event.type": "http.response.body"}
Request details
Autoinstrumentation logs

---

## Sección 152: CHAPTER 11 [Entropy: 0.349]

Observability for API security
To output custom logs using OTel’s format, we use a tracer object. Listing 11.2 shows
how to generate a new span for a given trace in the POST /carts controller. In the custom span, we capture details on the user and their order. As the listing shows, we
obtain a tracer object by calling the get_tracer() function from Python’s opentelemetry library. get_tracer() has one required argument, which is the name of the module
or namespace within which we want to produce the traces. We use the tracer’s
start_as_current_span() context manager method, which brings the context about
the trace for the current request. This allows us to produce a span that is correlated
with all other spans for the current request through the trace ID. When we have the
span object, we set the desired attributes within the span using the set_attribute()
method, as shown in lines 13 and 14.
# file: ch12/server.py
[...]
from opentelemetry import trace
[...]
@server.post("/carts", response_model=GetCart)
async def create_cart(
 cart_details: CreateCart,
 user_claims: UserClaims = Depends(authorize_access)
):
 cart = cart_details.dict()
 with tracer.start_as_current_span("cart.create") as span:
 span.set_attribute("user.sub", user_claims.sub)
 span.set_attribute("cart", cart_details.model_dump_json())
 [...]
Enriching our logs with custom event attributes makes them useful and informative
for debugging a problem. The preceding code enriches the log with information
about the user who added items to their cart by using the access token’s sub claim (see

---

## Sección 153: chapter 7 for a refresher on token claims) and the full payload describing the items [Entropy: 0.265]

added to the cart. Information like this increases the cardinality of our logs, which
makes our logs easier to find and more context specific.
DEFINITION
In observability, cardinality refers to the number of unique combinations of attributes in a log event. It’s good practice to aim for high cardinality in our logs, which means that their attributes make them highly unique.
High cardinality makes our logs easier to find and context specific, which is
helpful for debugging and tracing a problem.
To test the code in listing 11.2, run the server using the following command:
opentelemetry-instrument --traces_exporter console \
--metrics_exporter console --logs_exporter console \
uvicorn server:server
Listing 11.2
Producing custom spans
11.4
Logging custom events
Visit the API’s Swagger page under http://localhost:8000/docs, obtain an access
token by sending a request to the POST /login endpoint, and use the token to authorize your requests as per the instructions in the ch11/README.md file of the book’s
repository. Then send a request to the POST /carts endpoint. In the terminal, you’ll
see five logs. Three of those logs represent the spans discussed in section 11.3:
The beginning of the HTTP response process
The preparation of the response body
Request details
In addition to those spans, autoinstrumentation generates a log for POST requests with
the following attribute: {"asgi.event.type": "http.request"}. The fifth log is our
custom span, with the custom attributes we set in listing 11.2: user.sub and cart. The
following code is an example of our custom span.
{
 "name": "cart.create",
 "context": {
 "trace_id": "0x3b32c85069830eabd4cbdc31e2179080",
 "span_id": "0x15d6be9f9da2a8a2",
 "trace_state": "[]"
 },
 "kind": "SpanKind.INTERNAL",
 "parent_id": "0x260357a9703932fb",
 "start_time": "2025-04-15T10:26:24.194111Z",
 "end_time": "2025-04-15T10:26:24.202825Z",
 "status": {
 "status_code": "UNSET"
 },
 "attributes": {
 "user.sub": "joe",
 "cart": "{\"books\":[{\"book_id\":1,\"quantity\":1}]}"
 },
 "events": [],
 "links": [],
 "resource": {
 "attributes": {
 [...]
 },
 "schema_url": ""
 }
}
As you see, the custom span contains a trace ID and a span ID. If you compare both
values with the rest of the spans in the terminal, you’ll see that the span ID is unique,
whereas the trace ID is shared with the four other logs that were raised for this
request. If you produce more spans within the context of a request, all of them will
have the same trace ID. This is incredibly powerful when debugging issues with your
Listing 11.3
Details on a custom span

---

## Sección 154: CHAPTER 11 [Entropy: 0.481]

Observability for API security
APIs and when investigating potential security exploits and abuses. In the remainder
of this chapter, you’ll learn how to do that.
11.5
Detecting input-based attacks
Observability is key to understanding the security posture of our systems, knowing
when we are under attack, and reacting to threats. But what signals are we looking for
from a security standpoint? What do we need to log, how, and when? In the previous
sections, we learned to use instrumentation to produce signals such as logs, traces,
and metrics. Now we need to address what signals to capture from a security point of
view so we can detect and analyze API security threats.
 In this and the following sections, you’ll learn what to look for in your application
logs to detect various kinds of attacks on your APIs. We begin by collecting evidence of
input-based attacks.
 As we learned in section 11.2, events are requests, errors, or any other relevant
incident that happens in our system. From a security perspective, all these events are
useful for detecting unauthorized access to our APIs, malicious input, and abuse of
business logic and flows. If a request contains a malicious SQL or script injection, we
want to keep a record of it. If the request resulted in an unauthorized (401 or 403 status code) or malformed data (400 or 422 status code) response, we want to keep a
record of it. Keep track of response latencies; if a request takes a long time to process,
that may indicate that it included unusual and perhaps malicious input.
 To make our logs useful for threat detection and analysis, we want to capture as
many details as possible for each event. When logging request details, for example, it’s
useful to capture information such as headers, request body, and the full URL. The
following code illustrates a complete request log.
{
 "name": "cart.create",
 "context": {
 "trace_id": "0x06210e62e32c09ae3bd66e3348dc38cf",
 "span_id": "0x53b11bde82bb6908",
 "trace_state": "[]"
 },
 "kind": "SpanKind.INTERNAL",
 "parent_id": "0xcdc3779f2a3d0a1a",
 "start_time": "2025-04-18T13:08:44.579768Z",
 "end_time": "2025-04-18T13:08:44.581234Z",
 "status": {
 "status_code": "UNSET"
 },
 "attributes": {
 "user.sub": "string",
 "request.headers": "{\"host\": \"localhost:8000\",
➥\"connection\": \"keep-alive\", \"content-length\": \"72\",
➥\"sec-ch-ua-platform\": \"\\\"macOS\\\"\", \"authorization\": \"Bearer
Listing 11.4
Logging full request details
11.5
Detecting input-based attacks
➥eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJzdHJpbmcifQ.CFahWaR1IaK
➥MgobCPsc9cMI3PxKuMT7vOyjTEXJ5g7s\", \"user-agent\": \"Mozilla/5.0
➥(Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like
➥Gecko) Chrome/135.0.0.0 Safari/537.36\",
➥\"accept\": \"application/json\", \"sec-ch-ua\": \"\\\"Google
➥Chrome\\\";v=\\\"135\\\", \\\"Not-A.Brand\\\";v=\\\"8\\\",
➥\\\"Chromium\\\";v=\\\"135\\\"\",
➥\"content-type\": \"application/json\", \"sec-ch-ua-mobile\": \"?0\",
➥\"origin\": \"http://localhost:8000\", \"sec-fetch-site\": \"same-
➥origin\", \"sec-fetch-mode\": \"cors\", \"sec-fetch-dest\": \"empty\",
➥\"referer\": \"http://localhost:8000/docs\",
➥\"accept-encoding\": \"gzip, deflate, br, zstd\",
➥\"accept-language\": \"en-US,en-GB;q=0.9,en;q=0.8,es-
➥ES;q=0.7,es;q=0.6,ar-TN;q=0.5,ar;q=0.4,ko-KR;q=0.3,ko;q=0.2\",
➥\"cookie\": \"env=graphiql:disable\"}",
 "http.request_body": "{\"books\":[{\"book_id\":1,\"quantity\":1}]}"
 },
 "events": [],
 "links": [],
 "resource": {
 "attributes": {
 [...]
 },
 "schema_url": ""
 }
}
Capturing full request details in your logs is useful for reproducing the behavior
caused by a threat actor and helpful for debugging and investigating security problems. You simply capture the request details and use them to send the same request to
your API. You can do this with your API running on your localhost, and with the help
of breakpoints, you can analyze how the request goes through and affects your system.
 Capturing the full request details is incredibly helpful for investigating and reproducing security vulnerabilities in your APIs. But if you’ve been in this industry for a
minute, you know that logging everything isn’t always feasible or even desirable.
Request data often contains plenty of sensitive information, especially in sectors such
as healthcare, insurance, and banking. You can’t just store sensitive data in your logs
and assume that it will be fine. Every piece of data you own is a liability for your organization, and if you splash your logs with personally identifiable information (PII) and
other sensitive data, you’ll put your logs in scope of regulatory frameworks. This
means your logs will need strict access controls, backup, and additional processes that
will make them unusable for research and monitoring purposes. Besides, you’ll be setting yourself up for a data breach.
 To avoid leaking sensitive data in your logs, identify which fields in your API schemas are likely to contain sensitive data, and mask those fields or remove them from
the payloads before logging them. In the following listing, we log the details of
requests sent to the POST /orders endpoint. The payload contains credit card information in the credit_card field, so we exclude that field from the logs when we dump
the payload into the span’s attributes.

---

## Sección 155: CHAPTER 11 [Entropy: 0.352]

Observability for API security
 
# file: ch12/server.py
[...]
@server.post(
 "/orders",
 response_model=GetOrder,
 status_code=status.HTTP_201_CREATED
)
async def place_order(
 request: Request,
 order_details: PlaceOrder,
 user_claims: UserClaims = Depends(authorize_access)
):
 with tracer.start_as_current_span("cart.create") as span:
 span.set_attribute("user.sub", user_claims.sub)
 span.set_attribute(
 "request.headers", json.dumps(dict(request.headers))
 )
 span.set_attribute(
 "http.request_body",
 order_details.model_dump_json(exclude=["credit_card"])
 )
 [...]
Masking sensitive fields poses a problem: what if the attack is carried out through one
of those sensitive fields? How do we know whether the request contained an attack?
There’s no fail-safe way to capture this information if we want to keep sensitive data
hidden. Sophisticated threat detection tools capable of identifying malicious injection
attacks, such as web application firewalls (WAFs; see chapter 9), use complex rules
and often use machine learning models to identify these threats. If you get a signal
from your WAF that a request contains a malicious injection, see whether you can configure it to capture the log and annotate it with a field that clarifies whether the
request contains an injection attack.
 A common concern in using logs for security is their effect on performance. Many
architects and technical leaders worry that producing a large amount of logs may
cause a performance hit, making APIs busier and slower. In my experience, this is
especially true when logging to files. If that’s your case, consider using a more modern
logging pattern, such as writing your logs to standard output (stdout). As illustrated
in figure 11.11, the idea is to treat your logs as streams and use a log router like Logplex or Fluentd to collect the logs and send them to a log aggregator, where you can
store and analyze them.
 The logging pattern shown in figure 11.11 works especially well with containerbased deployments, where you can easily run a log collector as an agent in a sidecar
container, but it can be adapted to any kind of architecture and deployment model.
Many threat detection and management vendors, such as Noname and Traceable, use
the agent model to capture application logs and analyze them, and there’s no reason
why you shouldn’t be able to implement the same pattern.
Listing 11.5
Excluding sensitive fields from the logs
11.6
Detecting endpoint abuse attacks
DEFINITION Sidecar is a pattern commonly used in container applications to run
secondary processes with the main application. A sidecar container is a secondary container that runs alongside the primary application container. Sidecar
containers provide supporting functionality such as logging and configuration management. In container orchestration frameworks like Kubernetes, a
sidecar container runs along with the primary application container in the
same pod.
Figure 11.11
A common pattern for log collection and management is to run a log collector agent 
together with the application. In container-based deployments, the agent runs as a sidecar container.
Request logs are helpful for investigating security attacks against our APIs and are particularly useful for detecting attacks such as malicious injections, which are easily identifiable in user input. But logs alone won’t help us identify less obvious attacks that are
executed over numerous requests. In section 11.6, we turn to the requirements for
tackling those kinds of attacks.
11.6
Detecting endpoint abuse attacks
In January 2021, cybersecurity researcher Jan Masters discovered a flaw in the API of
Peloton, a popular exercise-equipment manufacturer. Masters discovered a few endpoints from Peloton’s REST API and a few operations from its GraphQL API that
failed to enforce user credentials and allowed unauthorized access to other users’ personal data. Fortunately, Masters disclosed the vulnerability responsibly, which allowed
Peloton to fix it before it became a known exploit [7].
 Peloton’s security incident poses an interesting question: can we do anything to
detect unauthorized access to our APIs before a security researcher or threat actor discovers the flaw? We certainly can. The first step is understanding how this type of vulnerability could be exploited. In Peloton’s case, the exploit involved two steps:
Finding existing users with the GET /api/user/search/{username} endpoint—This
endpoint allowed a threat actor to find other users by username. The response
included a few personal user details, including user ID.
Pulling full user profiles using the POST /stats/workouts/details endpoint—This
endpoint required a request body containing the user IDs whose stats a threat
Payments API
container
OpenTelemetry
instrumentation
Logs collector agent 
container (sidecar)
Payments API
Monitoring
dashboard
GET /payments

---

## Sección 156: CHAPTER 11 [Entropy: 0.349]

Observability for API security
actor would want to see. Before the vulnerability was fixed, it returned full user
profiles with personal details, including age, location, and gender.
As illustrated in figure 11.12, a threat actor would exploit the vulnerability by calling
the GET /api/user/search/{username} endpoint repeatedly to pull user identifiers;
then feed those user IDs to the POST /stats/workouts/details endpoint to retrieve
personal details.
Figure 11.12
Peloton’s user search endpoint could be exploited to enumerate existing users 
and pull their details. The signature of this type of abuse is the repeated number of calls against 
the same endpoint to scrape the data.
From an endpoint-abuse perspective, the relevant step was the call to the GET /api/
user/search/{username} endpoint, which happened repeatedly to pull a list of existing users. The attack shown in figure 11.12 is called object enumeration. Threat actors
could used the user search endpoint to get a list of existing users. Therefore, the distinct signature of this attack is the number of repeated calls against the same endpoint. Contrary to the types of attacks analyzed in section 11.5, the attack illustrated in
figure 11.12 does not create a clear footprint in the logs and therefore cannot be
detected from a single log event. In this case, we are looking for an interaction pattern
with our endpoints. Let’s see how to go about collecting this information and, more
important, how to make the information actionable.
 Because the signature of the attack in figure 11.12 is the repeated number of calls
against a given endpoint, we want to track endpoint-level request metrics. The following listing shows how to use OTel to capture these metrics.
Peloton API
GET /api/user/search/frodo
GET /api/user/search/legolas
GET /api/user/search/sam
200, {"id": "d858f080", ...}
400, {"error": "Not Found"}
GET /api/user/search/pippin
200, {"id": "3b03416b", ...}
200, {"id": "78a87970", ...}
11.6
Detecting endpoint abuse attacks
 
# file: ch12/server.py
[...]
from opentelemetry.metrics import get_meter
[...]
meter = get_meter("orders_meter")
list_books_counter = meter.create_counter("list_books")
@server.get("/books", response_model=ListBooks)
async def list_books():
 list_books_counter.add(1)
 [...]
Run the server again and send a few requests to the GET /books endpoint. Metrics logs
show up every 60 seconds, so wait a minute to see the custom metric in your terminal.
The next listing shows a sample metrics log. Metrics logs contain default metrics provided by OTel’s autoinstrumentation, such as the number of active requests, response
latency, and response size. In this case, those metrics are scoped under the opentelemetry.instrumentation.fastapi namespace. Our custom metrics appear under the
orders_meter scope, and this example includes list_books, which counts the number
of requests to the GET /books endpoint and has a value of 2.
{
 "resource_metrics": [
 {
 "resource": {
 "attributes": {
 [...]
 },
 "schema_url": ""
 },
 "scope_metrics": [
 {
 "scope": {
 "name": "opentelemetry.instrumentation.fastapi",
 [...]
 },
 }
 {
 "scope": {
 "name": "orders_meter",
 [...]
 },
 "metrics": [
 {
 "name": "list_books",
 "description": "",
 "unit": "",
Listing 11.6
Capturing metrics with OTel instrumentation
Listing 11.7
Example OTel metrics log

---

## Sección 157: CHAPTER 11 [Entropy: 0.373]

Observability for API security
 "data": {
 "data_points": [
 {
 "attributes": {},
 "start_time_unix_nano": 1745240652666090000,
 "time_unix_nano": 1745241786748827000,
 "value": 2,
 "exemplars": []
 }
 ],
 "aggregation_temporality": 2,
 "is_monotonic": true
 }
 }
 ],
 }
 [...]
Capturing endpoint-level call metrics alerts us if there’s an unusual spike in the number of calls against a certain endpoint. Keep track of the average number of requests
per minute, and trigger alerts when requests go above the average. When an alert triggers, don’t take action immediately; first investigate the issue to determine whether
the spike in requests is truly anomalous. If something is off and you are reasonably
concerned, a good measure is to start rate limiting all requests to the endpoint under
attack.
 Tracking the number of requests per second helps us detect unusual activity, but it
still leaves us in the dark about the origin of the offending requests. Therefore, the
countermeasure—rate limiting all requests to the endpoint—is vague and affects the
experience of all users. For a more effective response, we need to know whether a specific threat actor is driving the spike or the requests have a common origin (come from
a particular geolocation, for example). If we have this knowledge, we can take measures
to block certain actors from our website or rate limit requests from a specific region.
 To track the origin of the request, include information about the client in your
logs. Include the client’s IP and the device’s fingerprint, and if the endpoint is authenticated, include the user ID too. The next listing shows how we capture such details
for a protected endpoint such as POST /orders.
# file: ch12/server.py
[...]
meter = get_meter("orders_meter")
list_books_counter = meter.create_counter("list_books")
place_order_counter = meter.create_counter("place_order")
@server.post(
 "/orders", response_model=GetOrder,
Listing 11.8
Capturing metrics with custom details
Summary
 status_code=status.HTTP_201_CREATED,
)
async def place_order(
 request: Request,
 order_details: PlaceOrder,
 user_claims: UserClaims = Depends(authorize_access)
):
 place_order_counter.add(
 1, {
 "sub": user_claims.sub,
 "headers": json.dumps(dict(request.headers))
 }
 )
 [...]
When you start capturing data about the origin of the request, run continuous analysis to identify unusual behavior by certain clients or users. During the analysis, resolve
the geolocation of every IP to capture trends by region. Before you take action, you
need to understand your data, so spend some time analyzing it and calculating a reasonable number of requests per user, IP, device fingerprint, or region for a given endpoint. If a certain user, client, or region goes above a reasonable threshold, take steps
to rate limit them, and if a certain user or client keeps reoffending, you may want to
blacklist them from your website.
 The observability recipes described in this chapter allow you to detect and trace
anomalous behavior in your APIs and suspicious interactions involving your users.
Combined with the measures discussed so far in this book, good observability goes a
long way toward protecting your APIs from many common attacks and mitigating the
risk of a data breach. The final ingredient in our API security journey is testing. We
need to establish that our APIs are secure enough to be released, and chapter 12
shows how to assess them.
Summary
API observability is the practice of collecting and continuously analyzing data
about our APIs. This information is crucial for understanding how users engage
with our APIs and identifying threats.
To enable observability, we collect telemetry data such as logs, traces, and metrics from our APIs:
– Logs are records of specific events. They tell us that a request was sent to our
servers or an error occurred.
– Traces help us put various logs together when they belong in the same context, such as when they represent various steps in the processing of an HTTP
request.
– Metrics capture aggregate system behavior, such as the number of requests
per second and average response times, so they help us identify unusual
trends and patterns.

---

## Sección 158: CHAPTER 11 [Entropy: 0.25]

Observability for API security
OTel is a standard for generating, collecting, and analyzing telemetry data.
OTel provides libraries to autoinstrument our APIs to start producing telemetry
data and enable observability.
Manual instrumentation is the practice of making changes to our code to produce custom telemetry data. It allows us to tailor our logs for security observability and helps us identify threats.
To identify input-based attacks, log all user input, ensuring that you remove all
sensitive data from the logs.
To identify endpoint-abuse attacks, capture metrics on API usage to understand
how users interact with your APIs and to identify outliers.
Testing API security
As we build our APIs, the inevitable question is whether we are making them
secure. If you’ve followed all the best practices described in this book, you’ve threat
modeled your API design choices, considered tradeoffs, accepted some risks, and
produced a sound implementation. The thing is, there’s only so much we can do
using threat-modeling techniques and following best practices. At some point, we
This chapter covers
Creating a testing strategy tailored to our threat 
models
Testing API specifications to discover security-bydesign flaws
Using contract testing and fuzzing to ensure that 
our APIs work as intended
Creating unit tests that help us assess the 
security posture of our APIs
Creating complex tests to identify vulnerabilities 
in our business logic and flows

---

## Sección 159: CHAPTER 12 [Entropy: 0.265]

Testing API security
need some tests that give us a good level of confidence that our APIs are working the
way they’re supposed to and are not vulnerable to exploits.
 The two most common approaches to assessing the security of API implementations are using a penetration testing service and using automated API security testing
tools. Both choices are good and have their own places in a security testing strategy.
 Penetration testing services deliver high-quality results tailored to your APIs, especially when they’re conducted by experts in API security. But such tests are expensive
and slow, take days to complete, and don’t scale because they require human experts
to look at your API and understand how it works. If you can afford it, I recommend
that you run a full penetration test against your APIs once a year or over slightly longer intervals.
 Automated API security testing tools, on the other hand, are fast. The quality of
the results depends on the quality of the tool and the amount of high-quality configuration data you feed into it. Generally, automated security testing tools fail to develop
an understanding of how your API works and are likely to miss business logic flaws,
but they’re helpful for automating simple tests such as malicious injections and configuration checks.
 Whether you use a penetration testing service or an automated testing tool (or
both), you can benefit greatly from developing a custom security testing strategy for
your APIs. You’ve designed, threat modeled, architected, and implemented your APIs,
so you know everything there is to know about them, and that means you’re in a
unique position to design and put together security tests that target specific flaws that
only you know about. In this chapter, we’re going to use this knowledge to design an
API security testing strategy. We’ll see how to put together simple tests that deliver
tons of value for our API security posture.
12.1
Designing an API security testing strategy
We want to put together some tests to assess the security of our API implementation.
Where do we start? If you’ve read all the chapters in this book, you know that many
types of attacks can be performed against your API and many kinds of flaws can be
exploited for various purposes—anything from SQL injection, access-token tampering, algorithm confusion attacks, object enumeration, sensitive data disclosure, mass
assignment, and pagination attacks to more complex strategies such as business-flowbased exploits and abuses. With so many possibilities, what is the right security testing
strategy for our APIs?
 To design a solid security testing strategy for our APIs, we must tap our knowledge
of how the API works. A deep understanding of our API’s design, implementation,
and threat models will help us put together the right security tests. If we know that our
API doesn’t use structured access tokens such as JSON Web Tokens (JWTs) to authenticate requests and instead uses opaque tokens, we can rule out an entire category of
tests, including token tampering and algorithm confusion attacks. The more we use
our knowledge of our APIs, the more focused and valuable our tests become.
12.1
Designing an API security testing strategy
 Let’s put together a structured method for designing our security testing strategy. We
begin with our threat model. Some threats are relatively easy to test; others require complex settings. A broken authentication test, for example, may be as simple as sending a
request without credentials to each of our endpoints, whereas testing sensitive business
flows may require performing a series of complex operations during the test and running an assertion about the specific state of a resource. If we don’t have any security tests
in place, our first goal is to identify the low-hanging fruit: tests that require minimal
setup but deliver high value due to their security implications. When we’ve written the
simplest tests that deliver the greatest value, we can move to more complex ones.
 To illustrate the process of coming up with a testing strategy, let’s work through a
practical example. Suppose that we run an online learning platform. The platform
offers self-paced courses created by independent instructors. The course content is
valuable, and to access it, students must create an account and sign up for the course
they want to take. When a student creates their account, they receive a one-time 80%
discount voucher on any course. Our platform holds sensitive data about students,
such as their interests, progress, commitment, and other factors that allow us to tailor
their learning experience. After various sessions of threat modeling, we’ve identified
three major threats that we want to prevent:
Unauthorized access to course content
Abuse of coupon codes
Unauthorized access to personal data via the admin portal
The first threat is unauthorized access to course content, which can happen when we
fail to enforce credentials. As illustrated in figure 12.1, to address this threat, we must
check whether users are authenticated and have valid credentials. Our website uses
JWTs for authentication, so we must ensure that we are not vulnerable to common
JWT exploits such as tampering and algorithm confusion attacks.
Figure 12.1
Our threat model considers the possibility that unauthenticated users can access 
protected content, so we must write tests to verify that our authentication layer works properly.
API
GET /courses/1/lessons/1
Authorization: Bearer ey...
Unauthenticated
user
GET /courses/1/lessons/3
Status code: 200
{"title": "What are APIs?"...}
Status code: 200
{"title": "What is OAuth?"...}
Authenticated
user

---

## Sección 160: CHAPTER 12 [Entropy: 0.298]

Testing API security
The second threat involves abusing our coupon codes. As stated earlier, every student
gets a one-time 80% discount voucher when they create an account on our website. As
illustrated in figure 12.2, the threat model represents a failure to verify that the student claiming a voucher has legitimate access to it. This exploit means that rogue
users could create tons of new accounts to release new vouchers and use them to pay
for new courses with their main account. We want to create tests that check whether
users can apply vouchers that don’t belong to them. This scenario is a great opportunity to apply the threat detection strategies discussed in chapter 11 to identify such
user behavior in production.
Figure 12.2
Our threat model considers the possibility that users will create rogue accounts 
to use their discount code vouchers, effectively obtaining permanent discounts and 
compromising our business model.
The last threat model describes a privilege escalation attack that allows unauthorized
users to access sensitive student data through the admin portal. As illustrated in figure
12.3, privilege escalation may occur if we fail to validate role-based access controls
(RBACs) correctly. To see whether our API is resilient to these threats, we want to
write some tests that check whether non-admin roles can access admin endpoints and
functionality.
Figure 12.3
Our threat models describe a scenario for privilege escalation in which less 
privileged users, such as students, can access admin endpoints such as GET /admin/
students. We must write tests to ensure that this doesn’t happen.
API
joe@apithreats.com
POST /students/register
{"email": "joe1@apithreats.com"...}
Status code: 201
{"coupon_code": "3ad3ae88"...}
POST /courses/1/register
{"coupon_code": "3ad3ae88"...}
API
Student
GET /admin/students
Status code: 200
{"students": [{"id": 1892a493"...}...]
12.2
Discovering design security flaws in our APIs
12.2
Discovering design security flaws in our APIs
Now that we know how to lay out a security testing strategy for our APIs, let’s get testing, beginning with the most basic type of test: testing the specification. Good security
begins with a solid design. As stated in chapter 3, our API design is a fundamental artifact in our security process because it contains an exact description of our API’s functions, its constraints, and the expected attack surface. It’s best practice to consolidate
our API design into a formal specification because this document can be formally analyzed and used for testing. In this section, you learn to use API specifications for
design security testing. Whether you follow a design-first or code-first approach, the
testing technique described in this section will help you gain visibility of design flaws
in your API and put you on a path toward better security.
 The most popular tool for testing API specifications for security flaws is Spectral
(https://github.com/stoplightio/spectral). Spectral is an API linter—a tool that
checks whether your specifications are written correctly. It’s popular in API governance, and many teams around the world use it to enforce a common set of guidelines
across their API documentation. Spectral’s basic linting capabilities can be enhanced
by plugins, one of which is an Open Worldwide Application Security Project (OWASP)
ruleset that analyzes API specifications for security flaws. This powerful plugin provides tons of useful suggestions for improving our APIs.
 Begin by installing Spectral and the OWASP plugin. Because Spectral is an npm
package, you can install it with both npm and Yarn. You’ll need a Node.js runtime to
run Spectral on your machine. If you don’t have Node.js and npm, you can install
them from the official website (https://nodejs.org/en/download). I highly recommend that you also install nvm, which makes it easy to manage Node.js versions. You
can download nvm from the same website. cd into folder ch12 from the book’s code
repository and run the following command to install Spectral:
npm install @stoplight/spectral
Then install the OWASP plugin with the following command:
npm install @stoplight/spectral-owasp-ruleset@^2.0
Finally, run the following command to create a local configuration ruleset for Spectral
that uses the OWASP plugin:
echo 'extends: ["@stoplight/spectral-owasp-ruleset"]' > .spectral.yaml
You’re ready to run Spectral against the API specification. You can grab the specification from the book’s repository (ch12/openapi.json) or fetch it directly from your
local server by starting it and visiting http://localhost:8000/openapi.json. Please
refer to ch12/README.md in the book’s code repository for further instructions on
setting up your environment to run the local server. To run Spectral against the specification, use the following command:
npx spectral lint openapi.json --ruleset `pwd`/.spectral.yaml

---

## Sección 161: CHAPTER 12 [Entropy: 0.475]

Testing API security
When you run this command against the specification, it raises 160 problems, including 75 errors and 85 warnings—a small set of errors, mostly because the API specification is generated from code, and FastAPI happens to produce excellent specifications.
The specification is not without faults, however, and Spectral is helpfully bringing
them to our attention. Here is a sample of the output that Spectral produces:
9:14 error owasp:api2:2023-write-restricted This write operation is not
➥protected by any security scheme. paths./students/register.post
[...]
714:17 warning owasp:api4:2023-string-restricted Schema of type string
➥should specify a format, pattern, enum, or
➥const.components.schemas.ValidationError.properties.msg
718:18 error owasp:api4:2023-string-limit Schema of type string must
➥specify maxLength, enum, or
➥const. components.schemas.ValidationError.properties.type
718:18 warning owasp:api4:2023-string-restricted Schema of type string
➥should specify a format, pattern, enum, or
➥const. components.schemas.ValidationError.properties.type
✕ 160 problems (75 errors, 85 warnings, 0 infos, 0 hints)
Let’s break down this analysis so we can make sense of it. We can classify Spectral’s
feedback in three categories:
Authentication and access controls
Input constraints
API usability
With regard to authentication and access controls, Spectral reports that some of our
endpoints are not authenticated. The following message, for example, tells us that the
POST /students/register endpoint is unprotected:
9:14 error owasp:api2:2023-write-restricted This write operation is not
➥protected by any security scheme. paths./students/register.post
In most cases, endpoints are not authenticated by design, but a careful review of these
detections may reveal unauthenticated endpoints that should be protected. Spectral
also tries to identify admin endpoints and analyze their security requirements. In our
specification, it correctly identifies the GET /admin/students endpoint as an admin
endpoint through the presence of the admin keyword in the URL path:
294:11 error owasp:api5:2023-admin-security-unique Admin endpoint
➥/admin/students has the same security requirement as a non-admin
➥endpoint. paths./admin/students.get.security[0]
Spectral points out that this endpoint has the same security requirements as nonadmin endpoints. This could be by design, but it’s worthwhile to review such detections and assess their security implications.
 As for input constraints, Spectral raises detections for strings, integers, and arrays.
The detections apply to read-only and input schemas alike. The following message
12.2
Discovering design security flaws in our APIs
says that the email field of the GetStudent schema does not have constraints such as
maximum length, enumeration, and constant values:
545:19 error owasp:api4:2023-string-limit Schema of type string must
➥specify maxLength, enum, or const. 
➥components.schemas.GetStudent.properties.email
GetStudent is a read-only schema that we use to return student details in endpoints
like POST /students/register and GET /admin/students. For read-only schemas such
as GetStudent, lack of constraints is less problematic because we control the way models of this sort are rendered on the server. For input schemas, however, these detections are relevant. The RegisterStudent schema, for example, used in the POST
/students/register endpoint to register a new student, lacks constraints across all its
fields: email, address, first_name, and so on. The following message says that the
last_name field in the RegisterStudent schema is unconstrained:
668:23 error owasp:api4:2023-string-limit Schema of type string must
➥specify maxLength, enum, or const. 
➥components.schemas.RegisterStudent.properties.last_name
As we saw in chapter 6, it’s good practice to constrain every field in our specification
to prevent threat actors from abusing them by sending malicious payloads such as
injection attacks, large payloads, and malicious regular expressions. But it’s not always
possible to constrain a field. In RegisterStudent, for example, it’s not feasible to constrain the values of fields like first_name and last_name. As discussed in chapter 11,
our security-by-design process can go only so far; it must be paired with a strong
observability framework to detect and prevent threats in real time.
 We also have useful detections for integer fields. The following message says that
the first parameter of the GET /courses endpoint doesn’t specify minimum and maximum boundaries:
93:22 error owasp:api4:2023-integer-limit Schema of type integer must
➥specify minimum and maximum. paths./courses.get.parameters[0].schema
If you check the OpenAPI specification for this API, you’ll see that the first parameter
in the parameters list of the GET /courses endpoint is page, which is a pagination
parameter. The same detection applies to the second parameter, which is per_page.
The lack of constraints in these fields may allow threat actors to run pagination attacks
against our API, overwhelming our servers by asking for millions of items in a single
request. It’s important to review these kinds of detections and assess whether you can
impose constraints that protect your services from such abuses.
 If you go through Spectral’s output, you’ll also see detections for unconstrained
arrays. The following message says that the lessons field of the GetCourse schema
doesn’t specify the maximum number of items in the array:
447:21 error owasp:api4:2023-array-limit Schema of type array must specify
➥maxItems. components.schemas.GetCourse.properties.lessons

---

## Sección 162: CHAPTER 12 [Entropy: 0.313]

Testing API security
In this case, the unbounded array belongs in a read-only schema, which is generally
less of a problem. Even in cases like this one, though, it could be worrisome if a course
ends up with a large number of lessons and we return them all in one go; that could
put unnecessary pressure on our server and compromise its performance and even its
availability. A malicious actor could take advantage of this feature to create a course
with many lessons and introduce performance problems into our API. As always, use
your judgment about when and where it makes sense to paginate any collection of
items.
 Spectral also recommends documenting error responses such as 401 (Unauthorized), 403 (Forbidden), and 500 (Internal server error), which are absent from
our specification. Although doing so isn’t strictly necessary from a security perspective, documenting error responses makes our APIs easier for third parties to consume.
 In addition, Spectral recommends documenting rate-limiting headers. As we
learned in chapter 5, rate-limiting headers tell our consumers how often they can hit
our endpoints. These headers are especially important if the API is for external consumers; they enable users to consume our APIs responsibly and tell them when and
why they will be rate limited.
 For a single API specification, 160 is a relatively small number of detections. In my
consulting work helping organizations secure their APIs, I routinely came across specifications that raised hundreds and even thousands of detections. The goal of this
exercise isn’t to address all detections but to use them as a baseline for analysis of
where you stand from a security-by-design perspective, get visibility and raise awareness of the potential security problems that your API may encounter, and decide how
you want to tackle those scenarios.
12.3
Using fuzzing and contract testing
Now that we know how to test and ensure our API design is secure, the next step is to
verify that our implementation conforms to that design. It’s no use to go through the
effort of constraining all input parameters in our API specification if the server does
not implement such constraints. Unfortunately, differences between our implementation and the specification are common. In this section, you’ll learn how to improve
the server implementation by using the API specification as a validation tool.
 One of the most common sources of problems in API security is the difference
between the server implementation and the API specification. As illustrated in figure
12.4, the API specification may say that a certain endpoint exists, but that endpoint
cannot be found in our server. Endpoints that are documented but not implemented
are known as orphan endpoints. The reverse is also true and more problematic: our
server may expose endpoints that are not documented in the specification, also
known as shadow endpoints (see chapter 3). This difference between the API specification and the server implementation is known as API drift.
12.3
Using fuzzing and contract testing
 
Figure 12.4
API drift is the difference between the API specification and the implementation. In this 
example, the specification documents an orphan endpoint, GET /courses/{course_id}/details, 
that is not implemented, so it responds with 404 when users send a request to that endpoint.
API drift affects every element of an API, including endpoints, parameters, and security schemes. As illustrated in figure 12.5, the API specification may say that the endpoint GET /courses supports a query parameter named topic that allows us to filter
courses by topic. But when we try to use that parameter, we may discover that it makes
no difference in the results, meaning the API doesn’t use it; or we get an error
response saying that the parameter isn’t supported.
API
OpenAPI: 3.1.0
paths:
 /students/register:
 post:
 ...
 /courses/{course_id}/details
 get:
 ...
GET /courses/1/details
Status code: 404
{"detail": "Not found"}
API
GET /courses?topic=apis
OpenAPI: 3.1.0
paths:
 /courses
 get:
 parameters:
 - name: topic
 in: query
 required: false
 schema:
 type: string
 ...
Status code: 422
{"detail": "Parameter not supported: topic"}
Figure 12.5
API drift 
also happens with query 
parameters, such as the 
topic parameter in this 
example. The parameter 
is documented in the 
specification but not 
implemented, so the API 
responds with a 422 status 
code when clients use it.

---

## Sección 163: CHAPTER 12 [Entropy: 0.328]

Testing API security
Equally, the API specification may say that the GET /courses endpoint supports pagination parameters named page and per_page, as illustrated in figure 12.6. The
per_page parameter allows us to specify how many items we want to retrieve per page,
and according to the specification, it has no boundaries: we can request as many items
as we want. But when we ask the API to give us 100 items per page, it returns only 25.
There’s a clear drift between the implementation and the specification, with the
implementation enforcing an undocumented maximum limit of items per page.
API drift is a source of frustration for API consumers. If you are a provider of services
(payments, banking, risk assessments, pension management, and so on), and you offer
those services over APIs, your customers rely on your API specifications to understand
how to integrate with your services. If the specifications don’t match the server implementation, the result is poor developer experience (DevEx), unexpected integration
errors, and unhappy customers who are ready to leave your services for a competitor.
 The problem isn’t just DevEx; it’s also security. Undocumented API endpoints and
parameters often go untested and may expose unintended behaviors, and API drift
means that the server may not implement some documented constraints for our input
parameters. The reverse of the example in figure 12.6 happens if the specification
documents a maximum value of 25 for the per_page parameter, but the implementation fails to apply this limit, effectively allowing threat actors to overwhelm our services by requesting millions of items in a single request.
API
GET /courses?per_page=100
OpenAPI: 3.1.0
paths:
 /courses
 get:
 parameters:
 - name: per_page
 in: query
 required: false
 schema:
 type: integer
 ...
Status code: 200
{"courses": [{"id": "2ed0791a"...} ...]
25 items
Figure 12.6
API drift 
also happens when the 
implementation behaves 
differently from the 
specification. In this 
example, the specification 
says the per_page 
parameter has no 
boundaries, but the 
implementation imposes a 
limit of 25 items per page, 
frustrating users who want 
to see more items per page.
12.3
Using fuzzing and contract testing
 To prevent API drift, we test the server implementation against the API specification—a process known as contract testing. The idea is that the API specification represents a contract between the API server and its consumers. We’re making sure that
the API behaves as intended—that it abides by the contract (the specification). Contract testing is especially useful when the API specification is written or modified by
hand, but it also raises important observations when the specification is generated automatically from code. The API specification we use in this chapter is generated automatically from code, and as you’ll see, contract testing will help us catch a few
implementation issues and potential security exploits.
 Various tools are available for contract testing; the most popular are 
Schemathesis—https://github.com/schemathesis/schemathesis
Microcks—https://github.com/microcks/microcks
Dredd—https://github.com/apiaryio/dredd
Restler-fuzzer—https://github.com/microsoft/restler-fuzzer
API-fuzzer—https://github.com/Fuzzapi/API-fuzzer
In this section, we use Schemathesis to illustrate contract testing due to its simplicity,
but I encourage you to check out all the tools, especially Microcks, which also provides
contract testing capabilities for API consumers.
 Schemathesis analyzes the API specification and dynamically creates test cases that
check whether the server implementation conforms to the specification. The
approach Schemathesis uses is known as fuzzing. Fuzzing involves sending malformed
input to the server to evaluate how it reacts. In many cases, APIs crash with errors or
behave in unexpected ways when they’re subjected to a fuzzing test, and this analysis
sheds light on how threat actors could abuse our APIs and what we need to do to prevent abuses.
 Schemathesis is a Python package. You can install it in your virtual environment
with uv by using the following command:
uv add --dev schemathesis
If your project isn’t in Python and/or you don’t use uv, you can install Schemathesis
with pip. Use the following command:
pip install schemathesis
Schemathesis runs against a live server, so before we run our tests, let’s get the server
up and running with the following command:
uvicorn server:server --reload
Also, let’s obtain an access token. Some of the endpoints are authenticated, and Schemathesis won’t be able to raise good detections if it can’t get past our authorization
layer. To obtain an authentication token, visit the API’s Swagger page (http://localhost:8000/docs), use the /students/register endpoint to register a new account, and
then use the /students/login endpoint to obtain a token with the new account. With

---

## Sección 164: CHAPTER 12 [Entropy: 0.515]

Testing API security
a fresh token on hand, we’re ready to run Schemathesis against our API. Keep the API
server running in one terminal, and open another terminal to run Schemathesis with
the following command:
schemathesis run openapi.json --base-url http://localhost:8000 \
--experimental=openapi-3.1 -H 'Authorization: Bearer <token>' \
--checks=all
We use Schemathesis’s run command to run the test, followed by an argument that
represents the path to our OpenAPI specification (openapi.json, in this case) and the
following flags:

--base-url—This flag is the base URL of our server (http://localhost:8000).

--experimental—Because the API specification uses OpenAPI version 3.1, and
that version, at this writing, is in experimental support in Schemathesis, we add
the --experimental flag with the value openapi-3.1.

-H—We use the -H flag to instruct Schemathesis to include certain headers in
the requests during the test. In this case, we use it to authenticate the requests
using the Authorization header, and we set its value to the access token we
obtained earlier along with the Bearer prefix.

--checks=all—This flag instructs Schemathesis to run all validation tests. If we
omit the --checks=all flag, Schemathesis checks only whether the server raises
internal server errors.
You can follow Schemathesis’s progress on the terminal on which you ran the schemathesis command, and you can see the requests it runs against your API on the terminal that runs your API server. As you see, Schemathesis runs hundreds of tests per
endpoint, testing various combinations of malformed payloads, to discover how and
when a server breaks or fails to behave correctly. In the current scan, five of the nine endpoints fail to pass the fuzzing test. Following is Schemathesis’s test-execution summary:
================= Schemathesis test session starts =================
Schema location: file:///secure_apis/ch12/openapi.json
Base URL: http://localhost:8000
Specification version: Open API 3.1.0
Random seed: 63443938763838035015416547015700196325
Workers: 1
Collected API operations: 9
Collected API links: 0
API probing: SUCCESS
Schema analysis: SKIP
POST /students/register F. [ 11%]
POST /students/login . [ 22%]
GET /courses . [ 33%]
GET /courses/{course_id} . [ 44%]
GET /courses/{course_id}/lessons/{lesson_id} . [ 55%]
POST /courses/{course_id}/register F [ 66%]
GET /admin/students F [ 77%]
12.3
Using fuzzing and contract testing
GET /me F [ 88%]
GET /registrations/{registration_id} F [100%]
Here is the test-results summary:
======================== SUMMARY ========================
Performed checks:
 not_a_server_error 504 / 508 passed FAILED
 status_code_conformance 504 / 508 passed FAILED
 content_type_conformance 508 / 508 passed PASSED
 response_headers_conformance 508 / 508 passed PASSED
 response_schema_conformance 506 / 508 passed FAILED
 negative_data_rejection 508 / 508 passed PASSED
 ignored_auth 504 / 508 passed FAILED
As you see, Schemathesis ran 508 tests per endpoint, and some tests failed. When an
endpoint fails, Schemathesis tells us how it failed and how to reproduce the result
with a curl command. Because Schemathesis uses a randomizer strategy to generate
test cases, the results you obtain may look different from mine. In my case, for example, the POST /students/register endpoint failed with the following request:
curl -X POST -H 'Content-Type: application/json' -d '{"address": "",
➥"date_birth": "2000-01-01T00:00:00Z", "email": "", "first_name": "",
➥"last_name": "", "password": "", "phone_number": "\u0000"}'
➥http://localhost:8000/students/register
If you run that request against your local server, you get a 500 server error back. Looking at the stack traces in the server’s terminal, we see the error reproduced in listing
12.1. The important line in the stack trace is the one that says PostgreSQL text fields
cannot contain NUL (0x00) bytes. If you look at the request payload, it’s not clear
which field contains a NUL (0x00) value, but a closer look at the stack trace gives us a
hint. In the last few lines of the trace, where we see the query’s parameter values, we
have the following mapping: 'phone_number': '\x00'. The NUL value is in the phone
number. In the payload, this value is represented as \u0000. Both \u0000 and \x00 are
representations of the NUL character; \u0000 uses JSON Unicode’s escape notation,
whereas \x00 uses hexadecimal escape notation. The test Schemathesis generates successfully disguises a null value as a string, bypassing our data validation layer. This type
of attack is known as null byte injection or null byte poisoning, and in some cases, it can be
exploited to inject malicious code into our server. For more details on null byte injection, check out CWE 158 [1].
[...]
sqlalchemy.exc.DataError: (psycopg.DataError) PostgreSQL text fields cannot
➥contain NUL (0x00) bytes
[SQL: INSERT INTO student (email, password, first_name, last_name,
➥date_birth, phone_number, address, id, created) VALUES
➥(%(email)s::VARCHAR, %(password)s::VARCHAR, %(first_name)s::VARCHAR,
Listing 12.1
Stack trace error from Schemathesis test

---

## Sección 165: CHAPTER 12 [Entropy: 0.484]

Testing API security
➥%(last_name)s::VARCHAR, %(date_birth)s::TIMESTAMP WITHOUT TIME ZONE,
➥%(phone_number)s::VARCHAR, %(address)s::VARCHAR, %(id)s::UUID,
➥%(created)s::TIMESTAMP WITH TIME ZONE)]
[parameters: {'email': '', 'password': '', 'first_name': '', 'last_name':
➥'', 'date_birth': datetime.datetime(2000, 1, 1, 0, 0,
➥tzinfo=TzInfo(UTC)), 'phone_number': '\x00', 'address': '', 'id':
➥UUID('3cfbeb71-b87c-4368-8bd0-7b7cd62ba8ce'), 'created':
➥datetime.datetime(2025, 5, 7, 10, 7, 13, 509445,
➥tzinfo=datetime.timezone.utc)}]
To address the null byte injection attack illustrated in this listing, you can enhance
your data validation models to reject payloads when a field contains the \x00 string. If
you go through the rest of the error reports Schemathesis raised and address them,
you’ll be in a strong position to prevent API abuses that take advantage of flawed data
validation models. To learn more about fuzzing, contract testing, and Schemathesis,
check out chapter 12 of my book Microservice APIs [2].
 Using standard API testing tools like the ones we’ve seen here and in section 12.2
is useful and goes a long way toward hardening our APIs, but these tools only scratch
the surface of API security testing. To uncover deeper issues in our implementation,
we have to roll up our sleeves, create some unit tests that reach the API’s business
layer, and reproduce our threat models. Next, we begin this effort with low-hanging
fruit that yields the greatest value.
12.4
Automating access control tests
Most APIs use authentication to control access to protected resources. A healthcare
API that manages appointments between patients and doctors, for example, requires
patients to create accounts and stores patient data with bindings to the respective
accounts. When a patient tries to access data about their appointments, they must be
authenticated, and we want to make sure that the API returns only data that belongs
to the patient. Furthermore, the API may have a few admin endpoints that only a few
staff members can use to access data on all patients. All these scenarios are examples
of access controls, and we want to make sure that access controls are implemented
correctly to prevent unauthorized access and data leaks.
 Fortunately, these tests are some of the easiest we can write. We’ll begin by writing
unit tests for access control checks, dividing the tests into four major groups:
Broken authentication tests—We check whether the API enforces authentication
credentials correctly, such as whether we can send an unauthenticated request
to an authenticated endpoint. We can also test with malformed, expired, or
tampered access tokens.
Broken object-level authorization (BOLA) tests—We test whether a user can get
unauthorized access to another user’s data. In a healthcare application, we
might check whether patient A can access patient B’s data.
RBAC tests—We test whether users can bypass access constraints associated with
their user role. We can write a privilege escalation test, for example, to see
whether a normal user can access an admin endpoint.
12.4
Automating access control tests
Attribute-based access control tests—Sometimes, access to certain data and functionality requires users to be in a specific state or have certain attributes. A user
might be able to make payments through a payments application only when
their bank account has been verified, and we want to test whether that condition is enforced correctly.
Let’s begin by creating a basic broken authentication test. The API has nine endpoints, five of which are or should be authenticated:

GET /courses/{course_id}/lessons/{lesson_id}

POST /courses/{course_id}/register

GET /admin/students

GET /me

GET /registrations/{registration_id}
The task is to write a broken authentication test for each of these endpoints. For illustration purposes, we’ll create a test for the GET /courses/{course_id}/lessons/
{lesson_id} endpoint, which is our broken authentication example. Create a file
named ch12/tests.py to implement the tests. As illustrated in listing 12.2, we begin by
creating an instance of our test client; then we create a function named test_broken_
authentication() to implement the test. To run the test, we need a course ID and a
lesson ID, which we fetch directly from the database using our session factory object,
session_maker(). When we’ve collected this information, we send an unauthenticated
request to the endpoint. We expect to get a 403 (Forbidden) status code.
# file: ch12/tests.py
from sqlalchemy import select
from starlette_testclient import TestClient
from db_session import session_maker
from models import Course
from server import server
client = TestClient(server) 
def test_broken_authentication():
 with session_maker() as session: 
 course = session.scalar(select(Course)) 
 lessons = course.lessons
 response = client.get(
 f"/courses/{course.id}/lessons/{lessons[0].id}"
 ) 
 assert response.status_code == 403 
Listing 12.2
Running a broken authentication test
We instantiate 
the test client.
We open a SQLAlchemy 
session with the database 
so we can fetch data.
We retrieve the details of a 
course from the database.
We send a request to the 
server using the test client.
We expect the server 
response’s status 
code to be 403.

---

## Sección 166: CHAPTER 12 [Entropy: 0.526]

Testing API security
The right response code in this situation is a 401 (Unauthorized) status code, which
means the request lacks valid authentication credentials, whereas 403 (Forbidden)
means the request has valid authentication credentials but the user isn’t allowed to
access the requested resource or operation. Due to a bug in FastAPI [3], the server
returns a 403 in these situations. There’s an open pull request on GitHub to fix this
issue [4], so by the time you read this book, the framework may be returning the right
status code.
 To run the test in listing 12.2, we’ll use pytest, Python’s most popular unit testing
framework. Run the following command to install pytest as a development
dependency:
uv add --dev pytest
To run the test, execute the following command:
PYTHONPATH=`pwd` pytest tests.py
The PYTHONPATH environment variable tells Python where to import code from, which,
in this case, is the present working directory. We do this to make our imports from
local files in tests.py, such as models and server, work. If you run the command, you’ll
see that it comes back with an assertion error saying that the API didn’t respond with
the expected status code. This is excellent: we’ve discovered a major security hole in
our API with a simple test. This test covers one of the threat models from section 12.1:
unauthorized access to course content.
 We’re starting to take meaningful steps toward improving our security posture.
Can you figure out how to fix the API server to make the test pass? Try to come up
with the solution on your own, and check out the ch12/fixed_server.py file in the
book’s code repository for a full solution to this problem.
 Now that we know how to write broken authentication tests, let’s step up the game
by adding a BOLA test. We’ll run this test against the GET /registrations/{registration_id} endpoint. This endpoint returns the details on a course registration, including the student’s full personal details. Because the endpoint returns such sensitive
data, we want to make sure that threat actors can’t access other users’ course registration details, so let’s write a test for that purpose.
 Listing 12.3 shows how to write a BOLA test for the GET /registrations/{registration_id} endpoint. The code goes in ch12/tests.py, where we previously added the
broken authentication test, so it shows only the new additions.
 We begin by fetching a student record from the database and a registration that
doesn’t belong to that student. We also create an access token for the student and use
it to authenticate our request to the GET /registrations/{registration_id} endpoint. Because we’re requesting data that belongs to another user, we expect the API
to respond with a 403 status code. The 403 (Forbidden) response means that the
request has valid credentials, but the user doesn’t have permission to access the
requested data or operation, so it’s the right response status code in this situation.
12.4
Automating access control tests
 
# file: ch12/tests.py
[...]
from models import Course, CourseRegistration, Student
[...]
client = TestClient(server)
[...]
def test_bola():
 with session_maker() as session:
 student = session.scalar(select(Student))
 registration = session.scalar(
 select(CourseRegistration).where(
 CourseRegistration.student_id != student.id
 )
 )
 token = create_access_token(sub=str(student.id)) 
 response = client.get(
 f"/registrations/{registration.id}",
 headers={ 
 "Authorization": f"Bearer {token}"
 }
 )
 assert response.status_code == 403
To run the test, execute the following command from your terminal:
PYTHONPATH=`pwd` pytest tests.py -k "bola"
The -k flag instructs pytest to run only tests containing the keyword in the string
passed as a value. If you run the test, you’ll see that it fails because the endpoint is not
enforcing user-based access controls correctly. This is great; we saved the day with
another simple test. BOLA is one of the most common and critical vulnerabilities in
APIs, so it pays to write tests for every endpoint that applies user-based access controls.
 The final test we’re going to implement in this section is a privilege escalation test.
Our API has an admin endpoint, which is GET /admin/students, and we want to
ensure that only admin users can access the endpoint. The following listing shows how
the test works. We begin by obtaining an access token for a test user without admin
privileges, and we use that token to send a request to the GET /admin/students endpoint. We expect the endpoint to respond with a 403 (Forbidden) status code because
the access token doesn’t have admin privileges. As in the BOLA scenario, the request
contains valid credentials but the user doesn’t have permission to access the requested
resource or operation, so the 403 status code is the right choice for this situation.
# file: ch12/tests.py
[...]
Listing 12.3
Implementing a BOLA test
Listing 12.4
Testing privilege escalation attacks
We create an access 
token for the student.
We authenticate the 
request with the token.

---

## Sección 167: CHAPTER 12 [Entropy: 0.605]

Testing API security
def test_rbac():
 token = create_access_token(sub="test")
 response = client.get(
 f"/admin/students",
 headers={"Authorization": f"Bearer {token}"}
 )
 assert response.status_code == 403
To run the test, use the following command:
PYTHONPATH=`pwd` pytest tests.py -k "rbac"
If you run the test, you’ll see that it fails because the API doesn’t enforce RBACs correctly and responds with a 200 when a student attempts to access an admin endpoint.
Privilege escalation is one of the most severe types of vulnerabilities in cybersecurity,
and it’s great that we were able to catch this flaw with a simple test like the one in listing 12.4. This test also addresses one of our threat models from section 12.1: unauthorized access to personal data via the admin portal. I encourage you to create similar
tests for your own APIs. As an exercise, figure out how to fix the privilege escalation
vulnerability in the GET /admin/students endpoint. You’ll find the solution in the
GitHub repository for this book if you need help.
 The tests in this section are simple yet powerful because they target critical vulnerabilities in many APIs—the low-hanging fruit that yields the highest return. But our job
isn’t done. The next step is creating tests that involve exploiting complex business flows.
12.5
Testing business flow vulnerabilities
A growing number of API breaches happen when threat actors exploit or abuse vulnerable business flows. As discussed in chapter 4, business flow exploits are difficult to
mitigate with run-time threat detection and protection tools. While SQL injection,
cross-site scripting (XSS), and brute-force attacks bear a clear footprint that most web
application firewalls (WAFs) can identify and block, business flow exploits are elusive
because they are intimately related to the business domain and logic behind the application. Unless you have a clear understanding of how your application works, standard tools are blind to business flow exploits. Therefore, it’s imperative to spend time
threat modeling business flow exploits in our APIs and to write tests that check
whether we are vulnerable to them.
 As discussed in section 12.1, our threat-modeling exercise has identified a business
flow exploit that we want to prevent: abuse of coupon codes. When a student registers
on our website, we issue a one-time 80% discount code that they can use to sign up for
a course. We do this to incentivize students to sign up with our platform and start consuming our content. We also want to ensure that students use only coupon codes to
which they have legitimate access because abusing them will put our business at risk.
Our threat model considers two scenarios:
Students using the same coupon code multiple times
Students using other students’ discount codes
12.5
Testing business flow vulnerabilities
We want to write unit tests to make sure that these outcomes don’t happen. The tests
we’re going to write in this section require more setup and data compared with the
tests we wrote in section 12.4, so we’re going to create a few pytest fixtures to generate such data. The following listing adds two fixtures: new_student_voucher(), which
generates a newly registered student ID and their voucher code, and course_id(),
which generates a course ID. We’ll use both fixtures in our flow tests. As you see,
pytest fixtures are simple Python functions that return the values we need in our
tests, and they’re decorated with pytest’s fixture() decorator.
# file: ch12/tests.py
[...]
import pytest 
[...]
@pytest.fixture 
def new_student_voucher() -> tuple[UUID, str]:
 student_details = {
 "first_name": "John",
 "last_name": "Connor",
 "date_birth": datetime(1985, 2, 28),
 "phone_number": "634-430-6045",
 "address": "19828 Valerio Street, Winnetka, CA",
 "email": "john.connor@apithreats.com",
 "password": "john.connor",
 }
 with session_maker() as session:
 student, voucher = register_new_student(
 student_profile=RegisterStudent(**student_details),
 db_session=session
 ) 
 return student.id, voucher.code 
@pytest.fixture
def course_id() -> UUID:
 with session_maker() as session:
 course = session.scalar(select(Course))
 return course.id 
Now that we have the fixtures, we need to set up the preconditions for our tests. We
begin with the coupon reuse test, which is implemented in the next listing. We use the
fixtures implemented in the previous listing by adding them to the test’s function signature. pytest takes care of calling those fixture functions and fetching their values
for our test. We create an access token for the newly registered student, and we put
together the payload required to register the student for a course using their coupon
code. Then we attempt to register the student twice with the same coupon. For the
first registration, we expect the API to respond with a 201 (Created) status code,
which means that the operation was completed successfully. For the second attempt,
Listing 12.5
Creating fixtures to set up tests with pytest
We import the 
pytest library.
We create a fixture with pytest’s 
fixture() decorator so we can 
feed this data to our tests.
This fixture creates 
a new student record.
The fixture returns 
the student’s ID and 
their voucher code.
This fixture returns 
a course ID.

---

## Sección 168: CHAPTER 12 [Entropy: 0.545]

Testing API security
however, we expect a 409 (Conflict) response. The 409 status code means that the
requested operation cannot be processed because it conflicts with the current state of
the resource. In this case, the 409 response indicates that the coupon code has already
been used and cannot be claimed again.
# file: ch12/tests.py
[...]
def test_coupon_code_reuse( 
 new_student_voucher: tuple[UUID, str], course_id: UUID
):
 student_id, voucher_id = new_student_voucher 
 token = create_access_token( 
 sub=str(student_id)
 )
 registration_payload = {
 "voucher": str(voucher_id), 
 "card_number": "5352 6878 8810 6793",
 "cvv": 369,
 "expiry_date": "01/28",
 }
 first_registration = client.post(
 f"/courses/{course_id}/register", 
 headers={ 
 "Authorization": f"Bearer {token}"
 },
 json=registration_payload,
 )
 second_registration = client.post( 
 f"/courses/{course_id}/register",
 headers={"Authorization": f"Bearer {token}"},
 json=registration_payload,
 )
 assert first_registration.status_code == 201 
 assert second_registration.status_code == 409 
To run the test, use the following command:
PYTHONPATH=`pwd` pytest tests.py -k "coupon_reuse"
If you run the test, you’ll see that it fails because the API returns 201 status codes to
both requests, meaning that it isn’t checking whether a coupon code has already been
used. This result is a major business flow vulnerability in our API, and we need to fix it
lest students exploit it at the cost of our business.
 Can you figure out how to fix this vulnerability? Try to come up with the solution
on your own, and check out the ch12/fixed_server.py file in the book’s code repository for a full solution.
 The second scenario we want to test is when students try to use other students’ coupon codes. Students could exploit such a flaw to register tons of new phantom
Listing 12.6
Testing coupon reuse
We include the names of our 
fixture functions as parameters 
of the test function.
We unpack the tuple 
returned by the 
new_student_voucher() 
fixture.
We use the student ID from the fixture 
function to create an access token.
We use the student’s voucher in 
the course registration payload.
We use the ID returned by the course_id() 
fixture in the course registration request.
We use the student’s token in 
the course registration request.
Second course 
registration request.
The first registration 
request must succeed 
with a 201 status code.
The second registration request 
must fail with a 409 status code.
12.5
Testing business flow vulnerabilities
accounts only to use their coupon codes through their main account. The next listing
shows how to put together a test for this scenario. The test uses the two fixtures from
listing 12.5 to obtain the voucher of a newly registered student and a course ID. We
also fetch from the database a formerly registered student (a student whose ID is different from that of the newly registered student) and issue an access token for them.
Finally, we send a request to the API using the former student’s access token and the
newly registered student’s coupon code. We expect the API to respond with a 403
(Forbidden) status code because we’re using a coupon code that doesn’t belong to us.
# file: ch12/tests.py
def test_coupon_abuse(
 new_student_voucher: tuple[UUID, str], course_id: UUID
):
 new_student_id, new_voucher_id = new_student_voucher
 with session_maker() as session:
 student = session.scalar(
 select(Student).where( 
 Student.id != new_student_id
 )
 )
 token = create_access_token( 
 sub=str(student.id)
 )
 registration_payload = {
 "voucher": str(new_voucher_id), 
 "card_number": "5352 6878 8810 6793",
 "cvv": 369,
 "expiry_date": "01/28",
 } registration = client.post(
 f"/courses/{course_id}/register",
 headers={"Authorization": f"Bearer {token}"},
 json=registration_payload,
 )
 assert registration.status_code == 403
To run the test, use the following command:
PYTHONPATH=`pwd` pytest tests.py -k "coupon_abuse"
If you run the test, you’ll see that it fails because the API isn’t enforcing user-based
access controls on coupon codes. It returns a 201 status code. As is usually the case
with business flow exploits, the flaw in this case involves other types of vulnerabilities,
such as a BOLA exploit on the coupon code itself. Fixing this type of vulnerability is
crucial for the sustainability of our business.
 Can you figure out how to apply the right fix and get the test passing green? Try to
come up with the solution on your own, and check out the ch12/fixed_server.py file
in the book’s code repository for a full solution.
Listing 12.7
Testing business flow attacks
We retrieve an existing 
student from the database.
We create an access token 
for the existing student.
We use the new
student’s voucher code.

---

## Sección 169: CHAPTER 12 [Entropy: 0.25]

Testing API security
 This concludes our journey through automated API security testing. If you follow
the recommendations in this chapter, you’ll be in an excellent position to discover
and prevent tons of vulnerabilities in your APIs. Because these are unit tests, you’ll be
able to run them on every code change to check that your APIs remain secure. Even if
you don’t find proper vulnerabilities, you’ll likely find that your API behaves in unexpected ways when it’s subjected to the test strategies outlined in this chapter. Threat
actors know how to take advantage of odd behaviors, so make sure that you address all
of them.
Summary
To improve the security posture of our APIs, we must lay out a continuous security testing strategy that helps us detect vulnerabilities with every code change.
A good security testing strategy begins with our threat models and helps us prioritize tests that are easier to write and that address the biggest, most widespread vulnerabilities in our codebase.
The first step in assessing the security posture of our APIs is checking for design
vulnerabilities. We do this by running an API linter like Spectral, which analyzes
our API specification for flaws in our endpoints and input parameter definitions.
When we have a solid API design, we ensure that the implementation conforms
to it. We do this by using a contract testing tool like Schemathesis to check how
our API deals with random, malicious, and malformed payloads.
Standard tools like Spectral and Schemathesis don’t test our business layer. For
better coverage, we need unit tests that reach that layer in our applications. A
good starting point is to write access control tests, such as broken authentication, BOLA, privilege escalation, and attribute-based access control bypass.
In addition to targeting our business layer, we want to write tests for our business flows. Our threat models may reveal situations in which users can perform
actions that lead to an exploit, and we want to write unit tests for such scenarios
too. These tests are complex and require more setup but also yield the greatest
benefits.

---

## Sección 170: appendix A [Entropy: 0.265]

API security checklist
A common concern among API developers is whether they’ve done everything they
can to ensure that their APIs are secure. Many developers ask for a checklist that
allows them to determine whether there’s anything else left to do. This appendix
provides such a checklist. As you’ve learned throughout the book and as is clear
from this appendix, security cannot be a last-minute concern in your API development process. If you’re serious about API security, you must build security into your
APIs by shifting your security efforts to the left—that is, to the beginning of the API
development process. That’s why the first sections of this appendix deal with API
design and implementation, followed by authentication and authorization, infrastructure, and observability. The goal is to build security into each of these building
blocks. Every section of the appendix maps to one or more chapters of the book, as
indicated.
A.1
Design
Chapters 2, 3, and 6
Consolidate your API design with an interface description language such
as OpenAPI or Schema Definition Language (SDL).
Test the design for security vulnerabilities (e.g., with Spectral).
Constrain every input schema and parameter.
Threat-model the design.
Describe your expected user flows using a standard format (such as
Arazzo) and threat-model the flows.
A.2
Implementation
Chapters 4, 5, and 12
Use a robust API development framework (FastAPI for Python, Micronaut
for Java, and so on).

---

## Sección 171: APPENDIX A [Entropy: 0.25]

API security checklist
Use secure implementation patterns (data transfer objects, object-relational
mappers, parameterized database queries, and so on).
Validate everything (incoming data, including from third-party integrations,
and outgoing data).
Validate the implementation against the specification using an API fuzzer
(e.g., Schemathesis).
Use an outbound proxy to handle outbound requests securely and handle
failing external dependencies gracefully.
Write unit tests to check whether the API is vulnerable to your threat models.
A.3
Authentication and authorization
Chapters 7, 8, and 10
Use a robust identity as a service provider (IDaaS) like Auth0, Authlete, Curity,
or AWS Cognito. If that’s not possible, self-host an IDaaS like Keycloak.
Use the right Open Authorization (OAuth) flow for your use case.
Use standard JSON Web Tokens (JWTs) with robust signatures, preferably
PS256 or similar. Rotate your signing keys often.
Don’t use ID tokens as access tokens.
Use robust and battle-tested libraries to validate access tokens.
If your API handles highly sensitive data, use sender-constrained tokens.
Require authentication on every endpoint by default. Explicitly mark those
endpoints that don’t require authentication.
Define clear user roles, and apply role-based access controls consistently
across all endpoints.
A.4
Infrastructure

---

## Sección 172: Chapter 9 [Entropy: 0.25]

Use an API gateway as your single entry point for all incoming traffic. Use
the gateway to manage your inventory of APIs and keep your attack surface
under control.
Deploy a web application firewall (WAF) to protect against denial-of-service
and other attacks.
Segment your network where services don’t need to talk to one another to
create clear boundaries between them.
Implement rate-limiting policies that adapt to your user behavior and can
vary according to the sensitivity of every endpoint and flow.
A.5
Observability

---

## Sección 173: Chapter 11 [Entropy: 0.25]

Create logs, traces, and metrics for every relevant event in your system.
A.5
Observability
Track the origin of every request, including session ID, user account, geolocation, IP, and device fingerprint.
Study user behavior to understand how users engage with your APIs, and
adapt your threat detection models and rate-limiting policies accordingly.
Deploy threat detection solutions to identify business flow exploits at run
time.

---

## Sección 174: appendix B [Entropy: 0.25]

Setting up Auth0
for authentication
and authorization
This appendix walks you through the process of setting up and configuring Auth0
to handle authentication and authorization for your APIs. Specifically, you will
Register an API called Orders API.
Register a client that uses the authorization code flow to allow users to log in
and use the API.
Create an admin role for the API.
This setup is necessary if you want to code along with the practical examples in

---

## Sección 175: chapter 8. After reading this appendix, you’ll be ready to configure Auth0 for your [Entropy: 0.25]

own applications and projects. If you want to use complimentary video material, I
have created a series of videos on this topic that you will find useful:
“Setting up Auth0 for API Authentication and Authorization” (https://youtu
.be/PbUcQUQ7K2o)
“Login and Issue API Access Tokens with Auth0 and FastAPI” (https://youtu
.be/ato2S5b27o8)
“Validate JWTs Issued by Auth0 in FastAPI” (https://youtu.be/AtmyC945
_no)
To get started, create an account on Auth0’s website (https://auth0.com). When
you do, you are assigned a tenant by default. You can follow this guide with the
default tenant or create a new tenant. When you create a new tenant, you select the
region where you want to create the tenant, select a unique domain for your

---

## Sección 176: APPENDIX B [Entropy: 0.265]

Setting up Auth0 for authentication and authorization
tenant, and choose the tenant’s environment. The choices of environment are development, staging, and production. For this guide, choose the development environment, which is ideal for performing local development and testing and for getting
familiar with Auth0. An Auth0 production environment has production-grade protection and security requirements, so it won’t let you use localhost URLs in your configuration, and it will prevent you from attempting multiple logins when you’re testing
and trying to solve an error, which will get in the way of your debugging process.
 When you are on your tenant’s page, click Applications in the left sidebar and then
choose APIs from the drop-down menu. You’ll go to the tenant’s APIs page (figure
B.1), where you’ll see an already registered API named Auth0 Management API. This
is the user management API, which comes with all tenants by default; it allows you to
manage your users programmatically.
Figure B.1
On your tenant’s APIs page, you can register APIs for which you want to handle authentication and 
authorization with Auth0.
In the top-right corner, click Create API to register your first API. As illustrated in figure B.2, this action prompts you with a pop-up form to fill in some configuration
details about the API. Here’s how to fill in the form:
Name—A human-friendly name for the API (in this case, Orders API).
Identifier—A machine-friendly identifier for the API. The value can be anything,
but for convenience (and sanity), I recommend that you enter a meaningful
identifier for your API. The value http://dev.apithreats.com/api/orders, for
example, clearly identifies the orders API in the dev environment for apithreats.com.
JSON Web Token (JWT) Profile—RFC 9068 (https://www.rfc-editor.org/rfc/
rfc9068.html) tokens or Auth0 tokens. Both are similar, the main differences

---

## Sección 177: APPENDIX B [Entropy: 0.25]

Setting up Auth0 for authentication and authorization
being that RFC 9068 tokens include the jti (JWT ID) claim and the Auth0
tokens do not, and that Auth0 tokens include the azp (client ID) claim and RFC
9068 tokens do not. For this exercise, select the Auth0 profile, but RFC 9068
tokens will work equally well. You can learn more about the differences between
the two profiles at https://mng.bz/V9oW.
JSON Web Token (JWT) Signing Algorithm—The signing algorithm you want to use
for your JWTs. In the free plan, you can choose HS256 or RS256. As you learned
in chapter 7, asymmetric signing keys are more secure, so choose RS256.
Figure B.2
When you register an API, you are asked to provide a 
human-friendly name and an identifier, as well as select the JWT profile 
and signing algorithm you want to use for your access tokens.
After you’ve configured the API, click the Create button in the pop-up pane, and
you’ll be directed to the API’s configuration page. If you don’t go to that page automatically, you can get there by clicking Applications in the left sidebar, choosing APIs
from the drop-down menu, and selecting the API you just created.

---

## Sección 178: APPENDIX B [Entropy: 0.25]

Setting up Auth0 for authentication and authorization
 On the API’s configuration page, click the Settings tab. As shown in figure B.3, this
tab contains all the sensitive configuration you need to integrate your APIs with
Auth0. Scroll down to the RBAC Settings section, and toggle on the switches titled
Enable RBAC and Add Permissions in the Access Token. This setting allows you to create access permissions for the API and include those permissions in the access token
so you can easily validate them on your server.
Figure B.3
On the API’s Settings tab, configure how you want to allow clients to 
access the API. You can configure how long access tokens are valid for and whether 
the API accepts role-based access controls (RBAC), for example.
After configuring RBAC settings, scroll down to the Access Settings section, and toggle on Allow Offline Access. This setting allows you to request refresh tokens from
Auth0 during the authorization request. If you don’t turn on this feature, Auth0 won’t

---

## Sección 179: APPENDIX B [Entropy: 0.25]

Setting up Auth0 for authentication and authorization
issue refresh tokens for your API. Finally, scroll to the bottom of the page and click the
Save button.
 Now that your API is configured, you can create some permissions. As I mentioned
at the beginning of the appendix, you’re going to create an admin role, so go to the
top of the API configuration page and click the Permissions tab, shown in figure B.4.
You can add as many access scopes as you need for the API. Auth0 suggests adding
granular scopes such as read:orders and create:orders. Such scopes are granular and
provide access to specific operations that can be aggregated and consolidated into a
role later. For this exercise, create a permission named admin and add the description
Admin role. Then click the + Add button to add the permission to the API.
Figure B.4
On the API’s Permissions tab, you can configure access scopes for the API.
Now that you have an API with a permission access scope, you can register a client to
access the API. In the left sidebar, click Applications and choose Applications from the
drop-down menu. This action takes you to your tenant’s applications page, where you

---

## Sección 180: APPENDIX B [Entropy: 0.295]

Setting up Auth0 for authentication and authorization
see two applications: Default App and Orders API (Test Application). Auth0 created
Orders API (Test Application) automatically when you registered your API; it’s a
machine-to-machine client that uses the client credentials flow and allows you to run a
quick test against the API to ensure that it’s working correctly.
 To register a client that allows you to access the API using a web application, click
the + Create Application button in the top-right corner of the Applications screen,
and give the application a meaningful name. Because you are going to use this client
in a web application, a useful name is “Orders web application client.”
 After naming the client, choose the type of application you want to register. As
shown in figure B.5, you have the following choices:
Native—This choice is for mobile applications, TV applications, and so on. This
type of client uses the authorization code flow with PKCE.
Single Page Web Applications—This choice is suitable if you plan to run the authorization flow entirely from the browser. When you choose this option, Auth0
allows you to use the implicit flow and the authorization code flow with PKCE.
As you learned in chapter 7, the implicit flow is no longer recommended by the
latest OAuth specifications, so if you choose this option, make sure to use the
authorization code flow with PKCE.
Figure B.5
When you create a new client application, you must name it and select the type of 
application you want to create.

---

## Sección 181: APPENDIX B [Entropy: 0.28]

Setting up Auth0 for authentication and authorization
Regular Web Applications—This option is suitable for traditional web applications
with content dynamically rendered on the server, but it works for single-page
applications too. The only flow available for this type of application is the
authorization code flow, which we can optionally run with PKCE .
Machine to Machine Applications—This option is for clients that use the client credentials flow.
For this exercise, choose the Regular Web Applications option because you’ll use the
authorization code flow to authorize the client. After selecting the application type,
your client is created, and you are taken to the client’s dashboard. You have the option
to download ready-made boilerplate code to handle authentication in your applications. Chapter 8 walks you through all the steps required to authorize a client, so skip
this step and click the Settings tab (figure B.6).
Figure B.6
On the application’s Settings tab, you have all the information you need to integrate 
your clients with Auth0, including your tenant’s domain and the client’s ID and secret.
The application’s Settings tab contains all the information you need to integrate your
client with Auth0. The Basic Information section contains your tenant’s domain.
Using this domain, you can obtain your tenant’s OpenID Connect (OIDC) discovery

---

## Sección 182: APPENDIX B [Entropy: 0.322]

Setting up Auth0 for authentication and authorization
endpoint, which is available at https://<your-tenant-domain>/.well-known/openidconfiguration. For apithreats.com, which uses Auth0 to handle authentication and
authorization, the OIDC discovery endpoint is https://apithreats.eu.auth0.com/.well
-known/openid-configuration. Using your tenant’s domain, you can also derive the
authorization URL at https://<you-tenant-domain>/authorize.
 The application’s Settings tab also includes the application’s client ID and client
secret. Use these values for the CLIENT_ID and the CLIENT_SECRET parameters in

---

## Sección 183: chapter 8. [Entropy: 0.25]

Scroll down to the Application URIs section, shown in figure B.7. In the Allowed
Callback URLs field, enter the URL to which you want to redirect the user after they
successfully log in with Auth0. This value goes in the request_uri parameter in the
Figure B.7
In the Application URIs section, you configure the allowed callback URLs.

---

## Sección 184: APPENDIX B [Entropy: 0.25]

Setting up Auth0 for authentication and authorization
authorization request URL. To follow along with the examples in chapter 8, enter
http://localhost:8000/docs in this field.
 Next, scroll down to the Refresh Token Rotation section and toggle on Rotation to
configure Auth0 to expire your refresh tokens and issue new ones. If you don’t use
sender-constrained tokens, this option is a good measure to take to prevent token
replay attacks. After making these configurations, click the Save Changes button in
the bottom-right corner of the screen. Your client is ready to use.
 The final step is creating the admin role. Please follow the steps so far to create a
new API and client for admin use. In the left sidebar, click User Management and
choose Roles from the drop-down menu. On the Roles page, click Create Role, which
brings up the pop-up New Role pane shown in figure B.8. Because you’re creating an
admin role, name the role admin, enter the description Admin role, and click Create
to create the role. That action takes you to the role’s configuration page.
Figure B.8
When you create a new role, you are asked to provide the role’s name and 
description.
On the role’s configuration page, select the Permissions tab. This tab allows you to
attach permissions from your APIs to the role. Click Add Permissions, which brings up
the pop-up Add Permissions pane (figure B.9). Choose Orders API from the dropdown menu and then click the admin permission to attach it to the role. Finally, click
the Add Permissions button to persist the configuration.

---

## Sección 185: APPENDIX B [Entropy: 0.25]

Setting up Auth0 for authentication and authorization
Figure B.9
To attach access scopes to a role, add permissions from your previously created APIs.
Now that you have an admin role available, you can assign it to users. First, you need
to register a user. Follow the steps in chapter 8 to handle authentication with Auth0.
When you initiate the authorization request, log in with Auth0. If you don’t have an
account, you’ll be asked to create one. Then you can go back to your tenant’s management dashboard. In the left sidebar, click User Management and choose Users from
the drop-down menu to go to the user management dashboard. Click the user
account you want to promote to admin. This action takes you to a page where you can
see all the details about the user (figure B.10). On this page, you can assign permissions and roles to the user. If you click the Permissions tab, you’ll be able to assign specific access scopes from your APIs. If you click the Roles tab, you’ll be able to assign a
role. After you take any of these actions, the permissions will be inserted into the

---

## Sección 186: APPENDIX B [Entropy: 0.25]

Setting up Auth0 for authentication and authorization
access token in a custom field named permissions. You can also automate the processing of adding roles and permissions to users by using Auth0’s user management API.
Figure B.10
On the Permissions tab of the user management page, you can assign roles and 
permissions to the user.
Now you can set up a tenant in Auth0, register APIs and clients to handle authentication and authorization, and create roles and permissions to handle RBAC. You’re
ready to roll out your own secure API.

---

## Sección 187: appendix C [Entropy: 0.25]

API security RFCs
and learning resources
A great deal of API security is dealing with standards and protocols. Those standards and protocols are described in formal documents called Request for Comments (RFCs), which are published by the Internet Engineering Task Force (IETF).
Throughout this book, we have made references to many RFCs that describe how
Open Authorization works, what JSON Web Tokens look like, what JSON Web Keys
are, and so on. And by this point, you may be wondering, “Damn, where is that RFC
that describes what JSON Web Keys are?” Well, wonder no more. In this appendix,
I’ve put together the most important RFCs that you, as an API security practitioner,
should know about, and I highly encourage you to read through them.
 It goes without saying that you cannot cover everything there is to know about
API security in one book. This book gives you a very solid foundation, but you will
want to go deeper into other topics such as threat modeling and API design. Also,
this book approaches API security from the builder’s perspective, but what about
the hacker’s point of view? Learning how threat actors think and abuse vulnerabilities will help you get better at protecting your own APIs. The second part of this

---

## Sección 188: appendix lists resources that will elevate your understanding of API security to the [Entropy: 0.265]

next level.
C.1
Important RFCs
The development of RFCs relevant for API security is currently overseen by IETF’s
Web Authorization Protocol (OAuth) Working Group. The full list of RFCs is large,
and you can check it out on this website: https://datatracker.ietf.org/wg/oauth/
documents. Following is a list of the most important RFCs grouped in sections.

---

## Sección 189: APPENDIX C [Entropy: 0.265]

API security RFCs and learning resources
C.1.1
JSON Web Tokens (JWT)
RFC 7515—Jones, M., Bradley, J., and Sakimura, N. (2015, May). JSON Web Signature (JWS). https://www.rfc-editor.org/rfc/rfc7515.html
RFC 7516—Jones, M., and Hildebrand, J. (2015, May). JSON Web Encryption
(JWE). https://www.rfc-editor.org/rfc/rfc7516.html
RFC 7519—Jones, M., Bradley, J., and Sakimura, N. (2015, May). JSON Web
Token (JWT). https://datatracker.ietf.org/doc/html/rfc7519
RFC 8725—Sheffer, Y., Hardt, D., and Jones, M. (2020, February). JSON Web
Token Best Current Practices. https://datatracker.ietf.org/doc/html/rfc8725
RFC 7517—Jones, M. (2015, May). JSON Web Key (JWK). https://datatracker
.ietf.org/doc/html/rfc7517
RFC 7518—Jones, M. (2015, May). JSON Web Algorithms (JWA). https://
www.rfc-editor.org/rfc/rfc7518.html
C.1.2
Open Authorization (OAuth)
RFC 5849—Hammer-Lahav, E. (2010, April). The OAuth 1.0 Protocol. https://
datatracker.ietf.org/doc/html/rfc5849
RFC 6749—Hardt, D. (2012, October). The OAuth 2.0 Authorization Framework. https://www.rfc-editor.org/rfc/rfc6749.html
RFC 9700—Lodderstedt, T., et al. (2025, January). Best Current Practice for
OAuth 2.0 Security. https://datatracker.ietf.org/doc/html/rfc9700
draft-ietf-oauth-v2-1—Hardt, D., Parecki, A., and Lodderstedt, T. (2024, November). The OAuth 2.1 Authorization Framework. draft-ietf-oauthv2-1-13. https://
datatracker.ietf.org/doc/draft-ietf-oauth-v2-1
RFC 7636—Sakimura, N., Bradley, J., and Agarwal. N. (2015, September). Proof
Key for Code Exchange by OAuth Public Clients. https://www.rfc-editor.org/
rfc/rfc7636
RFC 8628—Denniss, W., et al. (2019, August). OAuth 2.0 Device Authorization
Grant. https://datatracker.ietf.org/doc/html/rfc8628
RFC 6819—Lodderstetdt, T., McGloin, M., and Hunt, P. (January 2013). OAuth
2.0 Threat Model and Security Considerations. https://datatracker.ietf.org/
doc/html/rfc6819
RFC 8705—Campbell, B., et al. (2020, February). OAuth 2.0 Mutual-TLS Client
Authentication and Certificate-Bound Access Tokens. https://datatracker.ietf
.org/doc/html/rfc8705
RFC 9449—Fett, D., et al. (2023, September). OAuth 2.0 Demonstrating Proof
of Possession (DPoP). https://datatracker.ietf.org/doc/html/rfc9449
RFC 9101—Sakimura, N., Bradley, J., and Jones, M. (2021, September). The
OAuth 2.0 Authorization Framework: JWT-Secured Authorization Request
(JAR). https://www.rfc-editor.org/rfc/rfc9101
C.2
Learning resources
RFC 9126—Lodderstedt, T., et al. (2021, September). OAuth 2.0 Pushed Authorization Requests. https://www.rfc-editor.org/rfc/rfc9126
RFC 7662—Richer, J. (2015, October). OAuth 2.0 token introspection. https://
www.rfc-editor.org/rfc/rfc7662.html
RFC 9701—Lodderstedt, T., and Dzhuvinov, V. (2025, January). JSON Web
Token (JWT) Response for OAuth Token Introspection. https://www.rfc-editor
.org/rfc/rfc9701.html
draft-ietf-oauth-rar—Lodderstedt, T., Richer, J., and Campbell, B. (2023, August).
OAuth 2.0 Rich Authorization Requests. https://datatracker.ietf.org/doc/
html/draft-ietf-oauth-rar
C.1.3
OpenID Connect
Sakimura, N., et al. (2023, December). OpenID Connect Core 1.0. https://
openid.net/specs/openid-connect-core-1_0.html
Lodderstedt, T., Low, S., and Postnikov, D. (2025, May). Grant Management for
OAuth 2.0. https://openid.bitbucket.io/fapi/oauth-v2-grant-management.html
C.1.4
FAPI
Fett, D., Tonge, D., and Heenan, J. (2025, May). FAPI 2.0 Security Profile.
https://openid.bitbucket.io/fapi/fapi-security-profile-2_0.html
Fett, D., Tonge, D., and Heenan, J. (2025, March). FAPI 2.0 Message Signing.
https://openid.bitbucket.io/fapi/fapi-2_0-message-signing.html
Fett, D. (2022, December). FAPI 2.0 Attacker Model. https://openid.net/
specs/fapi-2_0-attacker-model-ID2.html
Hosseiyni, Pedram, Küsters, Ralf, and Würtele, Tim (2024). Formal Security
Analysis of the OpenID FAPI 2.0: Accompanying a Standardization Process. In
2024 IEEE 37th Computer Security Foundations Symposium (CSF) (pp. 589–604).
IEEE. https://doi.ieeecomputersociety.org/10.1109/CSF61375.2024.00002
C.2
Learning resources
APISec University courses. https://www.apisecuniversity.com
Ball, Corey J. (2022). Hacking APIs. No Starch Press.
Domoney, Colin (2024). Defending APIs Against Cyber Attack. Packt.
Farhi, Dolev, and Aleks, Nick (2023). Black Hat GraphQL. No Starch Press.
Haro Peralta, José (2023). Microservice APIs. Manning Publications.
Lauret, Arnaud (2025). The Design of Web APIs, 2nd ed. Manning Publications.
Madden, Neil (2020). API Security in Action. Manning Publications.
Ponelat, Joshua S., and Rosenstock, Lukas L. (2022). Designing APIs with Swagger
and OpenAPI. Manning Publications.
Richardson, Chris (2018). Microservices Patterns. Manning Publications.

---

## Sección 190: APPENDIX C [Entropy: 0.25]

API security RFCs and learning resources
Richer, Justin, and Sando, Antonio (2017). OAuth 2 in Action. Manning Publications.
Riedesel, Jamie (2021). Software Telemetry. Manning Publications.
Shostack, Adam (2014). Threat Modeling: Designing for Security. Wiley.
Siriwardena, Prabath (2019). Advanced API Security in Action. Apress.
Siriwardena, Prabath, and Dias, Nuwan (2020). Microservices Security in Action.
Manning Publications.
Wong, David (2021). Real-World Cryptography. Manning Publications.
references

---

## Sección 191: Chapter 1 [Entropy: 0.265]

[1] Cloudflare (2025). 2024 API security & management report. https://www.cloudflare.com/2024
-api-security-management-report
 [2] Akamai (2019, February 26). Akamai state of the internet security report: Retailers most common credential stuffing attack victim; points to dramatic rise in API traffic as key trend. https://
www.akamai.com/newsroom/press-release/state-of-the-internet-security-retail-attacks-and-api
-traffic
 [3] Salt Security (2023). 2023 Q1 API security trends. https://salt.security/
 [4] Emmons, Tom (2022, May 4). An attack surface workout for web application and API attacks. 
Akamai. https://www.akamai.com/blog/security/attack-surface-workout-web-application-api
-attacks
 [5] Kong (2023, July 27). API infrastructure is mission critical—and increasingly under attack. 
https://konghq.com/blog/enterprise/apis-are-mission-critical
 [6] Postman (2024). 2023 State of the API report. https://www.postman.com/state-of-api/api-first
-strategies
 [7] Peralta, José Haro (2022). Microservice APIs: Using Python, Flask, FastAPI, OpenAPI, and More. Manning Publications.
 [8] Biesack David (2023, February 15). API design first is not API design first. API Design Matters. 
https://apidesignmatters.substack.com/p/api-design-first-is-not-api-design
 [9] Kocot, Daniel (2023, October 16–18). API first . . . no [video]. Presentation at the 2023 Platform 
Summit, Stockholm. https://youtu.be/aJsmK3XRjjY
 [10] SmartBear (2024). State of software quality: API 2023. https://smartbear.com/state-of-software
-quality/api
 [11] Dey, Victor (2022, November 23). Why API security is a fast-growing threat to data-driven enterprises. VentureBeat. https://venturebeat.com/security/why-api-security-is-a-fast-growing-threat
-to-data-driven-enterprises/
 [12] Keary, Tim (2023, January 20). T-Mobile data breach shows API security can’t be ignored. VentureBeat. https://venturebeat.com/security/t-mobile-data-breach-shows-api-security-cant-be
-ignored/
 [13] Ungoed-Thomas, Jon (2023, September 3). An absolute mess: Learner drivers forced to buy tests 
on black market as companies block-book slots. The Guardian. https://www.theguardian.com/
uk-news/2023/sep/03/an-absolute-mess-learner-drivers-forced-to-buy-tests-on-black-market-as
-companies-block-book-slots
REFERENCES
 [14] IBM (2024, July 30). Escalating data breach disruption pushes costs to new highs. https://news 
room.ibm.com/2024-07-30-ibm-report-escalating-data-breach-disruption-pushes-costs-to-new-highs
 [15] Peralta, José Haro, “API Security by Design,” at the Open Security Summit, January 16, 2024. 
https://youtu.be/gJinDI_Ma1Y, especially from minute 28:41.
 [16] 42Crunch (2020, April 30). Issue 81: Vulnerabilities in Microsoft Teams, Auth0, Smart Home Hubs. 
APISecurity.io. https://apisecurity.io/issue-81-vulnerabilities-microsoft-teams-auth0-smart-home
-hubs/
 [17] 42Crunch (2021, January 7). Issue 115: Vulnerabilities in SolarWinds, Ledger, Outlook: New Plugin 
for JetBrains IDEs. https://apisecurity.io/issue-115-vulnerabilities-solarwinds-ledger-outlook-new
-plugin-jetbrains-ides/
 [18] Kauflin, Jeff (2022, February 2). PayPal admits 4.5 million accounts were illegitimate as fintech’s 
fraud problem grows. Forbes. https://www.forbes.com/sites/jeffkauflin/2022/02/02/paypal-admits-
45-million-accounts-were-illegitimate-as-fintechs-fraud-problem-grows/
 [19] CVE Program. CVE Program Mission. https://www.cve.org
 [20] NIST. National Vulnerability Database: Vulnerabilities. https://nvd.nist.gov/vuln
 [21] Akamai. 2022 API security trends report. https://www.akamai.com/
 [22] Surpatanu, Nic (2022, September 7). The connected car is the next attack vector. Forbes. https://
www.forbes.com/sites/tanium/2022/09/07/the-connected-car-is-the-next-attack-vector/
 [23] Whittaker, Zach (2024, May 17). Two Santa Cruz students uncover security bug that let anyone do 
their laundry for free. TechCrunch. https://techcrunch.com/2024/05/17/csc-serviceworks-free
-laundry-million-machines
 [24] Kumari, Pooja and Jain, Ankit Kumar (2023). A comprehensive study of DDoS attacks over IoT network and their countermeasures. Computers & Security, 127, 103096. https://www.sciencedirect 
.com/science/article/abs/pii/S0167404823000068
 [25] Yunusov, Timur (2023, February 28). Synthetic identities: An AppSec point of view [video]. Presentation at OWASP’s London Chapter Meetup. https://youtu.be/vQZayZV_C90
 [26] Doerrfeld, Bill (2023, July 20). Why generative AI is a threat to API security. Security Boulevard. 
https://securityboulevard.com/2023/07/why-generative-ai-is-a-threat-to-api-security/

---

## Sección 192: Chapter 2 [Entropy: 0.25]

[1] Crawley, Kim (2021). 8 Steps to Better Security. Wiley, pp. 89–108.
 [2] Ball, Corey (2023, December 6–8). Earning confidence in your API security. Paper presented at 
APIDays, Paris.
 [3] OWASP. Threat modeling cheat sheet. https://cheatsheetseries.owasp.org/cheatsheets/Threat_ 
Modeling_Cheat_Sheet.html
 [4] Corry, Aino Vonge (2020). Retrospectives Antipatterns. Addison-Wesley.
 [5] Salt Security (2025). State of API security Q1 2025. https://content.salt.security/state-api-report 
.html
 [6] OWASP. Top 10 API security risks. https://owasp.org/API-Security/editions/2023/en/0x11-t10
 [7] Newcomer, Eric (2023, June 12). API security: Is authorization the biggest threat? The NewStack. 
https://thenewstack.io/api-security-is-authorization-the-biggest-threat/
 [8] Peralta, José Haro (2022). Microservice APIs: Using Python, Flask, FastAPI, OpenAPI, and More. Manning Publications.
 [9] Rago, Nick (2022, October 28). Are you haunted by zombie, shadow and ghost APIs? Salt Security 
Blog. https://salt.security/blog/are-you-haunted-by-zombie-shadow-and-ghost-apis
 [10] Radware (2023). The 2022 state of API security. https://radware.com
REFERENCES
 [11] Mitchell, Lorna (2023, September 19). API governance without Tears [slides]. Presentation at API-
Days, London. https://noti.st/lornajane/PiwFuR#sxdiYSF
 [12] Corey Ball (2022). Hacking APIs: Breaking Web Application Programming Interfaces. No Starch Press.
 [13] IBM (2023). Cost of a data breach report 2023. https://ibm.com
 [14] Greene, Andrew (2022, September 23). Optus rejects insider claims of “human error” as possible 
factor in hack affecting millions of Australians. ABC News. https://www.abc.net.au/news/2022-09
-23/optus-rejects-claim-hack-likely-result-of-human-error/101468846
 [15] Team Traceable. The telecom industry: Why APIs are becoming their worst nightmare. Traceable 
Blog. https://www.traceable.ai/blog-post/the-telecom-industry-api-security-worst-nightmare
 [16] Samios, Zoe (November 10, 2022). Optus hack to cost at least $140 million. The Sydney Morning Herald. https://www.smh.com.au/business/companies/optus-puts-aside-140m-to-replace-customers
-hacked-identity-documents-20221110-p5bx4g.html
 [17] Nwaiwu, Ikenna (2023, September 19). From 2.5 weeks to 1 day: Improving API delivery outcome. 
Presentation at APIDays, London. https://youtu.be/4GLD0DTI8DI
 [18] Nwaiwu, Ikenna (2024). Monitoring and analytics: Measuring API product metrics. In Automating 
API Delivery: APIOps with OpenAPI (chapter 11). Manning Publications.

---

## Sección 193: Chapter 3 [Entropy: 0.28]

[1] Binder, A., and Barahona, D. (2021, February 11). API security 101: Establishing and managing a 
secure API program [video]. Webinar hosted by Redspin. https://youtu.be/cMN6yr4nBUo
 [2] Prakash, Anand (2019, September 13). I could have hacked all Uber accounts, but I chose to report 
it instead. HackerNoon. https://hackernoon.com/how-i-could-have-hacked-all-uber-accounts
-rtzl3z72
 [3] Peralta, José Haro (2022). Microservice APIs: Using Python, Flask, FastAPI, OpenAPI, and More. Manning Publications.
 [4] Deming, W. Edwards (2018). Out of the Crisis, The MIT Press.
 [5] Humble, Jez (2019, February 2). DORA’s journey: An exploration. Medium. https://medium.com/
@jezhumble/doras-journey-an-exploration-4c6bfc41e667
 [6] DORA. 2015 state of DevOps report. https://services.google.com/fh/files/misc/state-of-devops
-2015.pdf
 [7] DORA. 2016 state of DevOps report. https://dora.dev/publications/pdf/state-of-devops-2016.pdf
 [8] S&P Global. 2022 API security report. https://salt.security.
 [9] Kindervag, John (2010, November 5). Build security into your network’s DNA: The zero trust network architecture. Forrester Research. https://media.paloaltonetworks.com/documents/Forrester
-Build-Security-Into-Your-Network.pdf
 [10] Kindervag, John (2016, March 23). No more chewy centers: The zero trust model of information 
security. Forrester Research. https://www.forrester.com/report/No-More-Chewy-Centers-The-Zero
-Trust-Model-Of-Information-Security/RES56682
 [11] Rose, S., Mitchell, S., and Connelly, S. (2020, August). Zero trust architecture. NIST Special Publication 800-207. https://nvlpubs.nist.gov/nistpubs/SpecialPublications/NIST.SP.800-207.pdf
 [12] Newcomer, Eric (2023, June 12). API security: Is authorization the biggest threat? The New Stack. 
https://thenewstack.io/api-security-is-authorization-the-biggest-threat/
 [13] Salt Security (2025). State of API security Q1 2025. https://content.salt.security/state-api-report 
.html
 [14] Morag, Aner (2022, February 20). Coinbase fixes vulnerable API that let you sell bitcoin you didn’t 
own. Security Boulevard. https://securityboulevard.com/2022/02/coinbase-fixes-vulnerable-api
-that-let-you-sell-bitcoin-you-didnt-own/
REFERENCES
 [15] OWASP (2023). Unsafe consumption of APIs. API10:2023. https://owasp.org/API-Security/
editions/2023/en/0xaa-unsafe-consumption-of-apis/
 [16] Greene, Andrew (2022, September 23). Optus rejects insider claims of “human error’” as possible 
factor in hack affecting millions of Australians. ABC News. https://www.abc.net.au/news/2022-09
-23/optus-rejects-claim-hack-likely-result-of-human-error/101468846
 [17] Kindervag, John (2019, January 19). You Want Network Segmentation, But You Need Zero Trust. 
Palo Alto Networks Blog. https://www.paloaltonetworks.com/blog/2019/01/you-want-networksegmentation-but-you-need-zero-trust
 [18] Nick, Rago (2022, October 28). Are you haunted by zombie, shadow and ghost APIs? Salt Security 
Blog. https://salt.security/blog/are-you-haunted-by-zombie-shadow-and-ghost-apis
 [19] Paganini, Pierluigi (2020, November 3). Malicious NPM library removed from the repository due to 
backdoor capabilities. Security Affairs. https://securityaffairs.com/110348/malware/npm-library
-backdoor.html
 [20] Frichette, Nick (2020, August 1). Steal EC2 metadata credentials via SSRF. Hacking the Cloud. 
https://hackingthe.cloud/aws/exploitation/ec2-metadata-ssrf/
 [21] Pedro, Bruno (2023, December 8). Five elements of good API documentation. The API Changelog. 
https://apichangelog.substack.com/p/five-elements-of-good-api-documentation
 [22] Lin, Joyce (2021, July 12). The most important API metric is time to first call. TechCrunch. https://
techcrunch.com/2021/07/12/the-most-important-api-metric-is-time-to-first-call
 [23] Smith, K. Internet Engineering Task Force (2023, May 4). api-catalog: A well-known URI to help 
discovery of APIs. https://www.ietf.org/archive/id/draft-smith-api-catalog-00.html
 [24] Maestre, Sidney (2023, October 16–18). You don’t need SDKs—Wait maybe you do? [video]. Presentation at the Platform Summit 2023, Stockholm. https://youtu.be/ezEQ5ewLP4A

---

## Sección 194: Chapter 4 [Entropy: 0.25]

[1] OWASP (2019). OWASP API security top 10 2019. https://owasp.org/API-Security/editions/2019/
en/0x00-header/
 [2] OWASP (2023). OWASP top 10 API security risks—2023. https://owasp.org/API-Security/editions/
2023/en/0x00-header/
 [3] Krebs, Brian (2018, November 21). USPS site exposed data on 60 million users. Krebs on Security. 
https://krebsonsecurity.com/2018/11/usps-site-exposed-data-on-60-million-users/
 [4] Franceschi-Bicchierai, Lorenzo (2024, February 13). Fertility tracker glow fixes bug that exposed 
users’ personal data. https://techcrunch.com/2024/02/13/fertility-tracker-glow-fixes-bugs-that
-exposed-users-personal-data
 [5] Pereira, Teresa (2024, November 19). How can HTTP status codes tip off a hacker? Cyber Security 
News. https://cybersecuritynews.com/how-can-http-status-codes-tip-off-a-hacker/
 [6] Homakov, Egor (2014, February). How I hacked GitHub again [blog post]. https://homakov.blog 
spot.com/2014/02/how-i-hacked-github-again.html
 [7] Chan, Ron (2020, December 18). I hacked Outlook and could’ve read all your EMAILS! [video]. 
https://youtu.be/t54N4x2uIPs
 [8] Jones, M., Bradley, J., and Sakimura, N. (2015, May). JSON Web Token (JWT). RFC 7519. https://
datatracker.ietf.org/doc/html/rfc7519#section-6.1
 [9] Lodderstedt, T., Bradley, J., Labunets, A., and Fett, D. (2025, January). Section 2.5: Client authentication. RFC 9700. In OAuth 2.0 security best current practice. https://www.rfc-editor.org/rfc/
rfc9700.html#section-2.5
 [10] Knight, Ben (2020, April 16). JSON web token validation bypass in Auth0 authentication API. 
CyberCS Blog. https://cybercx.co.nz/blog/json-web-token-validation-bypass-in-auth0-authentica 
tion-api/
REFERENCES
 [11] Homakov, Igor (2012, March 4). Mass assignment vulnerability—how to force dev. define attr_
accessible? Issue #5228. Ruby on Rails. https://github.com/rails/rails/issues/5228
 [12] Homakov, Igor (2012, March 4). Commit b839657. Ruby on Rails. https://github.com/rails/rails/
commit/b83965785db1eec019edf1fc272b1aa393e6dc57
 [13] Homakov, Egor (2012, March 4). Hacking Rails/Rails repo [blog post]. https://homakov.blogspot 
.com/2012/03/how-to.html
 [14] Radancy: Possible to view and takeover other user’s education and courses (2017, March 31). 
HackerOne report 227522. https://hackerone.com/reports/227522 (If you have trouble accessing 
the report, you can check the details at https://vulners.com/hackerone/H1:217558)
 [15] Amundsen, Mike. Amundsen’s maxim. https://www.amundsens-maxim.com
 [16] Twitter (now X) (2022, August 5). An incident impacting some accounts and private information 
on Twitter. https://privacy.x.com/en/blog/2022/an-issue-affecting-some-anonymous-accounts
 [17] Hope, Alicia (2024, February 2). Massive Trello user data leak: Hacker lists 15 million records on a 
dark web hacking forum. CPO Magazine. https://www.cpomagazine.com/cyber-security/massive
-trello-user-data-leak-hacker-lists-15-million-records-on-a-dark-web-hacking-forum/
 [18] Shopify admin authentication bypass using partners.shopify.com (2017, September 22). 
HackerOne report 270981. https://hackerone.com/reports/270981
 [19] Bracken, Becky (2020, November 16). Dating site Bumble leaves swipes unsecured for 100m users. 
ThreatPost. https://threatpost.com/dating-site-bumble-swipes-unsecured-100m-users/161276/
 [20] Netacea (2023, November 16). How are bots changing buyer behavior? https://netacea.com/
research-and-reports/how-are-bot-changing-buyer-behavior/
 [21] Hill, Simon (2023, July 8). How to spot fake reviews on Amazon. Wired. https://www.wired.com/
story/how-to-spot-fake-reviews-amazon/
 [22] Hwang, Renny (2023, July 16). We’re taking legal action to stop fake review scams. Google Blog. 
https://blog.google/outreach-initiatives/public-policy/legal-action-stop-fake-review-scams/

---

## Sección 195: Chapter 5 [Entropy: 0.268]

[1] Kelly, Daniel, Glavin, Frank G., and Barrett, Enda (2021). Denial of wallet: Defining a looming 
threat to serverless computing. Journal of Information Security and Applications, 60, 102843. https://
doi.org/10.1016/j.jisa.2021.102843
 [2] Dorsett, Mark, Mann, Scott, Chowdhury, Jabed, and Mahmood, Abdun (2025, July 14). A comprehensive review of denial of wallet attacks in serverless architectures. SSRN. http://dx.doi.org/
10.2139/ssrn.5350294
 [3] Akamai (2024, March). 2024 DDoS: Here to stay. https://www.fsisac.com/hubfs/Knowledge/
DDoS/FSISAC_DDoS-HereToStay.pdf
 [4] Jain, Samiksha (2024, December 9). API attacks surge 3000%: Why cybersecurity needs to evolve in 
2025. The Cyber Express. https://thecyberexpress.com/api-attacks-surge
 [5] Davis, Wes (2023, October 10). Cloudflare, Google, and Amazon explain what’s behind the largest 
DDoS attacks ever. The Verge. https://www.theverge.com/2023/10/10/23911186/ddos-http2
-vulnerability-blocked-amazon-aws-cloudflare-google-cloud
 [6] Snellman, Juho, and Iamartino, Daniele (2023, October 10). How it works: The novel HTTP/2 
“Rapid Reset” DDoS attack. Google Cloud Blog. https://cloud.google.com/blog/products/ 
identity-security/how-it-works-the-novel-http2-rapid-reset-ddos-attack
 [7] AppSecure (2018, February 9). I figured out a way to hack any of facebook’s 2 billion accounts, and 
they paid me a $15,000 bounty . . . FreeCodeCamp Blog. https://www.freecodecamp.org/news/
responsible-disclosure-how-i-could-have-hacked-all-facebook-accounts-f47c0252ae4d/
REFERENCES
 [8] Franceschi-Bicchierai, Lorenzo (2023, December 4). 23andMe confirms hackers stole ancestry data 
on 6.9 million users. TechCrunch. https://techcrunch.com/2023/12/04/23andme-confirms
-hackers-stole-ancestry-data-on-6-9-million-users/
 [9] Toulas, Bill (2025, February 8). Massive brute force attack uses 2.8 million IPs to target VPN devices. 
Bleeping Computer. https://www.bleepingcomputer.com/news/security/massive-brute-force
-attack-uses-28-million-ips-to-target-vpn-devices/
 [10] Bruteforce password recovery code (2019, November 21). HackerOne report 743545. https://
hackerone.com/reports/743545
 [11] Ability to bruteforce mopub account’s password due to lack of rate limitation protection using {ip 
rotation techniques} (2020, March 16). HackerOne report 819930. https://hackerone.com/
reports/819930
 [12] No rate limit lead to otp brute forcing (2020, December 17). HackerOne report 1060541. https://
hackerone.com/reports/1060541
 [13] Stripe (2024, August 30). What is a velocity check in payments? What businesses should know. 
https://stripe.com/gb/resources/more/what-is-a-velocity-check-in-payments-what-businesses
-should-know
 [14] Gil, Omer, and Greenholts, Asi (2023, September 13). Abusing repository webhooks to access internal CI systems at scale. Palo Alto Networks Blog. https://www.paloaltonetworks.com/blog/
prisma-cloud/repository-webhook-abuse-access-ci-cd-systems-at-scale/
 [15] Frichette, Nick (2020, August 1). Steal EC2 metadata credentials via SSRF. Hacking the Cloud. 
https://hackingthe.cloud/aws/exploitation/ec2-metadata-ssrf/
 [16] Kerbs, Brian (2019, July 30). Capital One data theft impacts 106M people. Krebs on Security.
https://krebsonsecurity.com/2019/07/capital-one-data-theft-impacts-106m-people/comment
-page-3/#comment-493895
 [17] Kerbs, Brian (2019, August 2). What we can learn from the Capital One hack. Krebs on Security. 
https://krebsonsecurity.com/2019/08/what-we-can-learn-from-the-capital-one-hack/
 [18] Johnson, Evan. Preventing the Capital One breach [blog post]. https://ejj.io/blog/capital-one
 [19] Zvere, Eaton (2023, February 6). Hacking into Toyota’s global supplier management network. 
EatonWorks Blog. https://eaton-works.com/2023/02/06/toyota-gspims-hack/
 [20] Dalal, Sanjay, and Wilde, Erik (2023, December 11). The deprecation HTTP header field. IETF 
Internet Draft. https://datatracker.ietf.org/doc/draft-ietf-httpapi-deprecation-header/
 [21] SSRF in exchange leads to ROOT access in all instances (2018, April 22). HackerOne report 
341876. https://hackerone.com/reports/341876
 [22] Traceable. 2023 state of API security. https://www.traceable.ai/2023-state-of-api-security
 [23] Hern, Alex (2020, November 6). Company forced to change name that could be used to hack websites. The Guardian. https://www.theguardian.com/uk-news/2020/nov/06/companies-house
-forces-business-name-change-to-prevent-security-risk
 [24] de Dyck, Philippe (2022, April 11). Defending against XSS with CSP. Auth0 Blog https://
auth0.com/blog/defending-against-xss-with-csp/.

---

## Sección 196: Chapter 6 [Entropy: 0.283]

[1] Mascellino, Alessandro (2025, February 26). 99% of organizations report API-related security 
issues. Infosecurity Magazine. https://www.infosecurity-magazine.com/news/99-organizations-report
-api
 [2] Salt Security. State of API security report 2025. https://content.salt.security/state-api-report.html
 [3] Silva, Paulo, and Yalon, Erez (2024, June 24–28). OWASP API security project [video]. Presentation 
at OWASP Global AppSec, Lisbon. https://www.youtube.com/watch?v=hn4mgTu5izg
REFERENCES
 [4] Zimmermann, Olaf, et al. (2022). Pattern: Pagination. In Patterns for API design. https://
www.microservice-api-patterns.org/patterns/quality/dataTransferParsimony/Pagination.html
 [5] Clubhouse data leak: 1.3 million scraped user records leaked online for free (2025, April 28). 
Cybernews. https://cybernews.com/security/clubhouse-data-leak-1-3-million-user-records-leaked
-for-free-online/
 [6] Dennis, Greg (2023, September 12). Modelling inheritance with JSON Schema. JSON Schema 
Blog. https://json-schema.org/blog/posts/modelling-inheritance
 [7] Muncaster, Phil (2024, February 27). Business logic abuse dominates as API attacks surge. Infosecurity Magazine. https://www.infosecurity-magazine.com/news/business-logic-abuse-api-attacks/
 [8] OpenAI (2025, January 16). The Arazzo specification v1.0.1. https://spec.openapis.org/arazzo/
latest.html
 [9] Kilcommin, Frank (2024, September 18–19). The Arazzo specification [video]. Presentation at 
APIDays, London. https://youtu.be/Lrsl5KV9Fuw

---

## Sección 197: Chapter 7 [Entropy: 0.28]

[1] Melniciuc, Ioan Alexandru, et al. (2024, August 7). 60 hurts per second—How we got access to 
enough solar power to run the United States. BitDefender. https://www.bitdefender.com/en-gb/
blog/labs/60-hurts-per-second-how-we-got-access-to-enough-solar-power-to-run-the-united-states
 [2] Bitdefender (2024). Solarman platform vulnerability. https://blogapp.bitdefender.com/labs/
content/files/2024/08/Bitdefender-PReport-solarman-creat7907.pdf
 [3] Amazon Web Services (2025). Amazon Cognito: Developer’s guide—Authentication flows. https://
docs.aws.amazon.com/cognito/latest/developerguide/amazon-cognito-user-pools-authentication
-flow-methods.html
 [4] Jones, M., Bradley, J., and Sakimura, N. (2012, May 22). JSON Web Token (JWT): draft-ietf-oauthjson-web-token-00. Internet Engineering Task Force draft. https://datatracker.ietf.org/doc/html/
draft-ietf-oauth-json-web-token-00
 [5] Jones, M., Bradley, J., and Sakimura, N. (2015, May). JSON Web Token (JWT). RFC 7519. https://
datatracker.ietf.org/doc/html/rfc7519
 [6] Jones, M., Bradley, J., and Sakimura, N. (2015, May). JSON Web Signature (JWS). RFC 7515. 
https://www.rfc-editor.org/rfc/rfc7515.html
 [7] Jones, Michael B. (2015, May). JSON Web Algorithms (JWA). RFC 7518. https://www.rfc-editor 
.org/rfc/rfc7518.html
 [8] Internet Assigned Numbers Authority (2015, May 23). JSON Web signature and encryption algorithms. In JSON Object Signing and Encryption (JOSE). https://www.iana.org/assignments/jose/
jose.xhtml#web-signature-encryption-algorithms
 [9] Jonsson, J., and Kaliski, B. (2003, February). Public-Key Cryptography Standards (PKCS) #1: RSA 
Cryptography Specifications Version 2.1. RFC 3447. https://www.rfc-editor.org/rfc/rfc3447
 [10] Sheffer, Y., Hardt, D., and Jones, M. (2020, February). JSON Web Token best current practices. RFC 
8725. https://datatracker.ietf.org/doc/html/rfc8725
 [11] Wong, David (2021). Real-World Cryptography. Manning Publications.
 [12] Sakimura, N., Bradley, J., and Agarwal, N. (2015, September). Proof key for code exchange by 
OAuth public clients. RFC 7636. https://www.rfc-editor.org/rfc/rfc7636
 [13] Denniss, W., Bradley, J., Jones, M., and Tschofenig, H. OAuth 2.0 device authorization grant. RFC 
8628. https://datatracker.ietf.org/doc/html/rfc8628
 [14] Hardt, D., Parecki, A., and Lodderstedt, T. (2025, May 28). Section 4.3: Refresh token grant. In The 
OAuth 2.1 Authorization Framework. EITF. https://www.ietf.org/archive/id/draft-ietf-oauth-v2-1
-13.html#name-refresh-token-grant
REFERENCES
 [15] Hardt, D., Parecki, A., and Lodderstedt, T. (2025, May 28). Section 1.4.3: Sender-constrained access 
tokens. In The OAuth 2.1 Authorization Framework. https://www.ietf.org/archive/id/draft-ietf
-oauth-v2-1-13.html#name-sender-constrained-access-t
 [16] Campbell, B., Bradley, J., Sakimura, N., and Lodderstedt, T. OAuth 2.0 mutual-TLS client authentication and certificate-bound access tokens. RFC 8705. https://www.rfc-editor.org/rfc/rfc8705.html
 [17] Dierks, T., and Rescorla, E. (2008, August). The Transport Layer Security (TLS) Protocol Version 
1.2. RFC 5246. https://datatracker.ietf.org/doc/html/rfc5246
 [18] Rescorla, E. (2018, August). Section 1.3: Updates affecting TLS 1.2. In The Transport Layer Security (TLS) Protocol Version 1.3. RFC 8446. https://datatracker.ietf.org/doc/html/rfc8446#section
-1.3
 [19] Jones, M., Bradley, J., and Tschofenig, H. (2016, April). Proof-of-possession key semantics for JSON 
Web Tokens (JWTS). RFC 7800. http://datatracker.ietf.org/doc/html/rfc7800
 [20] Fett, D., et al. (2023, September). OAuth 2.0 demonstrating proof of possession (DPoP). RFC 9449. 
https://datatracker.ietf.org/doc/html/rfc9449
 [21] Jones, M. (2015, May). JSON Web Key (JWK). RFC 7517. https://datatracker.ietf.org/doc/html/
rfc7517
 [22] Jones, M., and Sakimura, N. (2015, September). JSON Web Key (JWK) Thumbprint. RFC 7638. 
https://www.rfc-editor.org/rfc/rfc7638.html
 [23] International Organization for Standardization (2003). ISO/IEC 29115. https://www.iso.org/
standard/45138.html
 [24] Johansson, L. (2012, August). An IANA Registry for level of assurance (LoA) profiles. RFC 6711. 
https://www.rfc-editor.org/rfc/rfc6711.html
 [25] Recordon, D. et al. (2008, December 30). Provider Authentication Policy Extension (PAPE). 
https://openid.net/specs/openid-provider-authentication-policy-extension-1_0.html
 [26] Jones, M., Hunt, P., and Nadalin, A. (2017, June). Authentication method reference values specification. RFC 8176. https://datatracker.ietf.org/doc/rfc8176/
 [27] Sakimura, N., et al. (2023, December 15). OpenID Connect Core 1.0 incorporating errata set 2. 
https://openid.net/specs/openid-connect-core-1_0.html
 [28] IANA (2015, January 23). JSON Web Token (JWT). https://www.iana.org/assignments/jwt/
jwt.xhtml

---

## Sección 198: Chapter 8 [Entropy: 0.265]

[1] Eaton Works. (2023, February 6). Hacking into Toyota’s global supplier management network. 
https://eaton-works.com/2023/02/06/toyota-gspims-hack/
 [2] Swagger. Authentication. https://swagger.io/docs/specification/v2_0/authentication/
authentication/
 [3] Swagger. Components section. https://swagger.io/docs/specification/v3_0/components/
 [4] Fielding, R., and Reschke, J. (2014, June). Hypertext Transfer Protocol (HTTP/1.1): Authentication. RFC 7235. https://datatracker.ietf.org/doc/html/rfc7235
 [5] Internet Assigned Numbers Authority (2014, February 17). HTTP Authentication Scheme Registry. 
https://www.iana.org/assignments/http-authschemes/http-authschemes.xhtml
 [6] OpenAPI Initiative. Describing API security. https://learn.openapis.org/specification/security.html
 [7] OpenAPI Initiative. Section 4.8.27: Security scheme object. In The OpenAPI Specification. https://
spec.openapis.org/oas/latest.html#security-scheme-object-0
 [8] FAPI Working Group. Specifications. OpenID Foundation. https://openid.net/wg/fapi/
specifications
REFERENCES
 [9] Sakimura, N., et al. (2021, March 12). Financial-grade API security profile 1.0—Part 2: Advanced. 
https://openid.net/specs/openid-financial-api-part-2-1_0.html
 [10] Jones, Michael B. (2015, May). JSON Web Algorithms (JWA). RFC 7518. https://www.rfc-editor 
.org/rfc/rfc7518.html
 [11] Chan, Ron (2020, December 18). I hacked Outlook and could’ve read all your EMAILS! [video]. 
https://youtu.be/t54N4x2uIPs
 [12] Knight, Ben (2020, April 16). JSON Web Token validation bypass in Auth0 Authentication API. 
CyberCX Blog. https://cybercx.co.nz/blog/json-web-token-validation-bypass-in-auth0
-authentication-api/
 [13] Chosen Plaintext (2015, March). Critical vulnerabilities in JSON Web Token libraries https://
www.chosenplaintext.ca/2015/03/31/jwt-algorithm-confusion.html
 [14] Hardt, D., Parecki, A., and Lodderstedt, T. (2025, May 28). Section 4.1.1: Authorization request. In 
The OAuth 2.1 Authorization Framework. https://datatracker.ietf.org/doc/html/draft-ietf-oauth
-v2-1-13#section-4.1.1
 [15] Jones, Michael B. (2015, May). Section 4: JSON Web Key [JWK]. RFC 7517. https://datatracker 
.ietf.org/doc/html/rfc7517#section-4

---

## Sección 199: Chapter 9 [Entropy: 0.283]

[1] Richardson, Chris (2025). Microservice patterns, 2nd ed. Manning Publications. https://livebook 
.manning.com/book/microservices-patterns/chapter-8/point-8620-53-297-0.
 [2] OASIS MQTT Technical Committee (2013, April 25). Minutes of the meeting of Thursday, 25th 
April 2013. https://groups.oasis-open.org/higherlogic/ws/public/document?document_id=49028
 [3] Wilde, Eric (2019, May). The Sunset HTTP header field. RFC 8594. https://datatracker.ietf.org/
doc/html/rfc8594
 [4] Bryant, Daniel (2022). Mastering API Architecture. O’Reilly Media.
 [5] O’Reilly Media. APIs: Possibilities and pitfalls. https://learning.oreilly.com/live-events/apis
-possibilities-and-pitfalls/0636920097623/
 [6] Bezos, Jeff (2015). 2014 Letter to shareholders. Amazon.com. https://s2.q4cdn.com/299287126/
files/doc_financials/annual/2015-Letter-to-Shareholders.PDF
 [7] AWS. What is Amazon API Gateway? https://docs.aws.amazon.com/apigateway/latest/developer 
guide/welcome.html
 [8] Microsoft. Azure: API Management documentation. https://learn.microsoft.com/en-us/azure/
api-management/
 [9] Google Cloud. Apigee API management: Manage APIs with unmatched scale, security, and performance. https://cloud.google.com/apigee
 [10] Thompson, M., and Benfield, C. (2022, June). HTTP/2. RFC 9113. https://datatracker.ietf.org/
doc/html/rfc9113
 [11] Cloudflare. The next era of DDoS attacks: HTTP/2 “Rapid Reset” vulnerability represents a shift in 
the threat landscape. https://www.cloudflare.com/the-net/rapid-reset-ddos/
 [12] U.S. hospital hack “exploited Heartbleed flaw” (2014, August 20). BBC News. https://www.bbc 
.com/news/technology-28867113
 [13] Fiscutean, Andrada (2024, May 14). Heartbleed: When is it good to name a vulnerability? Dark-
Reading. https://www.darkreading.com/vulnerabilities-threats/heartbleed-when-is-it-good-to
-name-a-vulnerability
 [14] Overconfidence in API security posture leaves enterprises at high risk (2022, June 21). Security Magazine. https://www.securitymagazine.com/articles/97860-overconfidence-in-api-security-posture
-leaves-enterprises-at-high-risk
REFERENCES

---

## Sección 200: Chapter 10 [Entropy: 0.25]

[1] TrueLayer. Open banking around the world. https://truelayer.com/reports/open-banking-guide/
open-banking-around-the-world/
 [2] Consumer Financial Protection Bureau (2024, October 22). CFPB finalizes personal financial data 
rights rule to boost competition, protect privacy, and give families more choice in financial services. 
https://mng.bz/8X9B
 [3] Wood, Chris (2025, January 14). What does Section 1033 mean for open banking in the U.S.?” Nordic APIs Blog. https://nordicapis.com/what-does-section-1033-mean-for-open-banking-in-the-us/
 [4] PYMNTS (2024, January 3). Journey from screen scraping to open banking more marathon than 
sprint. https://www.pymnts.com/bank-regulation/2024/journey-from-screen-scraping-to-open
-banking-will-be-more-marathon-than-sprint/
 [5] Sakimura, N., et al. (2021, March 12). Financial-grade API security profile 1.0—Part 1: Baseline. 
https://openid.net/specs/openid-financial-api-part-1-1_0.html
 [6] Sakimura, N., et al. (2021, March 12). Financial-grade API security profile 1.0—Part 2: Advanced. 
https://openid.net/specs/openid-financial-api-part-2-1_0.html
 [7] Fett, D., Tonge, D., and Heenan, J. (2025, August 27). FAPI 2.0 security profile. https://openid
.bitbucket.io/fapi/fapi-security-profile-2_0.html
 [8] Tonge, D., Fett, D., and Heenan, J. (2025, March 19). FAPI 2.0 message signing (Draft). https://
openid.bitbucket.io/fapi/fapi-2_0-message-signing.html
 [9] Hardt, D. (2012, October). The OAuth 2.0 authorization framework. RFC 6749. https://www.rfc
-editor.org/info/rfc6749
 [10] Lodderstedt, T., et al. (2025, January). Best current practice for OAuth 2.0 security. RFC 9700. 
https://datatracker.ietf.org/doc/html/rfc9700
 [11] Sakimura, N., et al. (2023, December 15). OpenID Connect Core 1.0 incorporating errata set 2. 
https://openid.net/specs/openid-connect-core-1_0.html
 [12] Fett, D. (2022, December 7). FAPI 2.0 attacker model. https://openid.net/specs/fapi-2_0-attacker
-model-ID2.html
 [13] Sakimura, N., Bradley, J., and Jones, M. (2021, August). The OAuth 2.0 authorization framework: 
JWT-secured authorization request (JAR). RFC 9101. https://www.rfc-editor.org/rfc/rfc9101.html
 [14] Lodderstedt, T., et al. (2021, September). OAuth 2.0 pushed authorization requests. RFC 9126. 
https://www.rfc-editor.org/rfc/rfc9126.html
 [15] Lodderstedt, T., and Campbell, B. (2022, November 9). JWT secured authorization response mode 
for OAuth 2.0 (JARM). https://openid.net/specs/oauth-v2-jarm-final.html
 [16] Richer, T., ed. (2015, October). OAuth 2.0 token introspection. RFC 7662. https://www.rfc-editor 
.org/rfc/rfc7662.html
 [17] Lodderstedt, T., and Dzhuvinov, V. (2025, January). JSON Web Token (JWT) response for OAuth 
token introspection. RFC 9701. https://www.rfc-editor.org/rfc/rfc9701.html

---

## Sección 201: Chapter 11 [Entropy: 0.25]

[1] DORA. DORA research: 2024. https://dora.dev/research/2024
 [2] Sridharan, Cindy (2018). Distributed Systems Observability. O’Reilly Media.
 [3] Blanco, Daniel Gomez (2023). Practical OpenTelemetry. Apress.
 [4] Hausenblas, Michael (2023). Cloud Observability in Action. Manning Publications.
 [5] Wilkins, Phil (2024). Logs and Telemetry: Using Fluent Bit, Kubernetes, Streaming, and More. Manning 
Publications.
REFERENCES
 [6] Riedesel, Jamie (2021). Software Telemetry: Reliable Logging and Monitoring. Manning Publications.
 [7] Masters, Jan (2021, May 5). Tour de Peloton: Exposed user data. Pen Test Partner. https://
www.pentestpartners.com/security-blog/tour-de-peloton-exposed-user-data/

---

## Sección 202: Chapter 12 [Entropy: 0.25]

—Fiodar Sazanavets, Microsoft 
“
If we had more books like 
this, we’d have fewer data 
breaches!”
—Ashley Davis, Meld Gold
 
“
Practical and illustrative!”
—Phil Wilkins
Author of Logging in Action
“
A practical, real-world 
guide for designing, 
building, and maintaining 
 secure APIs.”
—Tannu Jiwnani, Microsoft

---
**Conexiones del Grafo (Obsidian):** [[INDEX]] · [[CANON_CYBERSECURITY_DEVSECOPS_2026]] · [[CYBERSECURITY_MASTER_PROTOCOL]] · [[ANTI_BOT_STEALTH_GUIDE]] · [[CANON_IDENTITY_AND_OAUTH_CYBERSECURITY_AUDIT_2026]] · #cybersecurity
