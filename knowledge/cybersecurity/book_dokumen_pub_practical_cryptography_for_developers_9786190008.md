# 📚 Libro Completo: dokumen.pub practical cryptography for developers 9786190008705

**Alcance:** Fuente bibliográfica completa sobre Web Software Factory, UI/UX, Architecture & Interactive Systems (dokumen.pub practical cryptography for developers 9786190008705 — Technical Author). Aplicable a la Web Software Factory. NO sustituye las reglas inmutables en `CANON_*`.

> **Autor:** Technical Author  
> **Dominio:** Web Software Factory, UI/UX, Architecture & Interactive Systems  
> **Archivo Fuente:** `dokumen.pub_practical-cryptography-for-developers-9786190008705.pdf`  
> **Páginas Originales:** 350 (100% Ingerido, Cero Truncamiento)  
> **Secciones Técnicas Extraídas:** 58 (Entropía Técnica Media: 0.599)  
> **Fecha de Ingesta:** 2026-10-27  

---

## Sección 1: Core Concepts & Foundations [Entropy: 0.601]

Table of Contents
Welcome 1.1
Preface 1.2
Cryptography - Overview 1.3
Hash Functions 1.4
Crypto Hashes and Collisions 1.4.1
Hash Functions: Applications 1.4.2
Secure Hash Algorithms 1.4.3
Hash Functions - Examples 1.4.4
Exercises: Calculate Hashes 1.4.5
Proof-of-Work Hash Functions 1.4.6
MAC and Key Derivation 1.5
HMAC and Key Derivation 1.5.1
HMAC Calculation - Examples 1.5.2
Exercises: Calculate HMAC 1.5.3
KDF: Deriving Key from Password 1.5.4
PBKDF2 1.5.5
Modern Key Derivation Functions 1.5.6
Scrypt 1.5.7
Bcrypt 1.5.8
Linux crypt() 1.5.9
Argon2 1.5.10
Secure Password Storage 1.5.11

Exercises: Password Encryption 1.5.12
Secure Random Generators 1.6
Pseudo-Random Numbers - Examples 1.6.1
Secure Random Generators (CSPRNG) 1.6.2
Exercises: Pseudo-Random Generator 1.6.3
Key Exchange and DHKE 1.7
Diffie–Hellman Key Exchange 1.7.1
DHKE - Examples 1.7.2
Exercises: DHKE Key Exchange 1.7.3
Encryption: Symmetric and Asymmetric 1.8
Symmetric Key Ciphers 1.9
Cipher Block Modes 1.9.1
Popular Symmetric Algorithms 1.9.2
The AES Cipher - Concepts 1.9.3
AES Encrypt / Decrypt - Examples 1.9.4
Ethereum Wallet Encryption 1.9.5
Exercises: AES Encrypt / Decrypt 1.9.6
ChaCha20-Poly1305 1.9.7
Exercises: ChaCha20-Poly1305 1.9.8
Asymmetric Key Ciphers 1.10
The RSA Cryptosystem - Concepts 1.10.1
RSA Encrypt / Decrypt - Examples 1.10.2
Exercises: RSA Encrypt / Decrypt 1.10.3
Elliptic Curve Cryptography (ECC) 1.10.4
ECDH Key Exchange 1.10.5
ECDH Key Exchange - Examples 1.10.6

Exercises: ECDH Key Exchange 1.10.7
ECC Encryption / Decryption 1.10.8
ECIES Hybrid Encryption Scheme 1.10.9
ECIES Encryption - Example 1.10.10
Exercises: ECIES Encrypt / Decrypt 1.10.11
Digital Signatures 1.11
RSA Signatures 1.11.1
RSA: Sign / Verify - Examples 1.11.2
Exercises: RSA Sign and Verify 1.11.3
ECDSA: Elliptic Curve Signatures 1.11.4
ECDSA: Sign / Verify - Examples 1.11.5
Exercises: ECDSA Sign and Verify 1.11.6
EdDSA and Ed25519 1.11.7
EdDSA: Sign / Verify - Examples 1.11.8
Exercises: EdDSA Sign and Verify 1.11.9
Quantum-Safe Cryptography 1.12
Quantum-Safe Signatures - Example 1.12.1
Quantum-Safe Key Exchange - Example 1.12.2
Quantum-Safe Asymmetric Encryption - Example 1.12.3
More Cryptographic Concepts 1.13
Digital Certificates - Example 1.13.1
TLS - Example 1.13.2
One-Time Passwords (OTP) - Example 1.13.3
Crypto Libraries for Developers 1.14
JavaScript Crypto Libraries 1.14.1
Python Crypto Libraries 1.14.2

C# Crypto Libraries 1.14.3
Java Crypto Libraries 1.14.4
Conclusion 1.15

Practical Cryptography for
Developers - Free Book by Svetlin
Nakov
Warning: this book is not finished! I am still working on some
of the chapters. Once it is completed, I will publish it as PDF
and EPUB. Be patient.

A modern practical book about cryptography for developers with
code examples, covering core concepts like: hashes (like SHA-3 and
BLAKE2), MAC codes (like HMAC and GMAC), key derivation
functions (like Scrypt, Argon2), key agreement protocols (like
DHKE, ECDH), symmetric ciphers (like AES and ChaCha20, cipher
block modes, authenticated encryption, AEAD, AES-GCM, ChaCha20-

Poly1305), asymmetric ciphers and public-key cryptosystems
(RSA, ECC, ECIES), elliptic curve cryptography (ECC, secp256k1,
curve25519), digital signatures (ECDSA and EdDSA), secure
random numbers (PRNG, CSRNG) and quantum-safe
cryptography, along with crypto libraries and developer tools, with a
lots of code examples in Python and other languages.
Author: Svetlin Nakov, PhD - http://www.nakov.com
Contributors: Milen Stefanov, Marina Shideroff
ISBN: 978-619-00-0870-5 (9786190008705)
This book is free and open-source, published under the MIT license.
Official Web site: https://cryptobook.nakov.com
Official GitHub repo: https://github.com/nakov/practical-cryptographyfor-developers-book.
Sofia, November 2018
Summary
• Welcome
• Preface
• Cryptography - Overview
• Hash Functions
○ Crypto Hashes and Collisions
○ Hash Functions: Applications
○ Secure Hash Algorithms
○ Hash Functions - Examples
○ Exercises: Calculate Hashes
○ Proof-of-Work Hash Functions
• MAC and Key Derivation
○ HMAC and Key Derivation

○ HMAC Calculation - Examples
○ Exercises: Calculate HMAC
○ KDF: Deriving Key from Password
○ PBKDF2
○ Modern Key Derivation Functions
○ Scrypt
○ Bcrypt
○ Linux crypt()
○ Argon2
○ Secure Password Storage
○ Exercises: Password Encryption
• Secure Random Generators
○ Pseudo-Random Numbers - Examples
○ Secure Random Generators (CSPRNG)
○ Exercises: Pseudo-Random Generator
• Key Exchange and DHKE
○ Diffie–Hellman Key Exchange
○ DHKE - Examples
○ Exercises: DHKE Key Exchange
• Encryption: Symmetric and Asymmetric
• Symmetric Key Ciphers
○ Cipher Block Modes
○ Popular Symmetric Algorithms
○ The AES Cipher - Concepts
○ AES Encrypt / Decrypt - Examples
○ Ethereum Wallet Encryption
○ Exercises: AES Encrypt / Decrypt
○ ChaCha20-Poly1305
○ Exercises: ChaCha20-Poly1305
• Asymmetric Key Ciphers
○ The RSA Cryptosystem - Concepts
○ RSA Encrypt / Decrypt - Examples
○ Exercises: RSA Encrypt / Decrypt

○ Elliptic Curve Cryptography (ECC)
○ ECDH Key Exchange
○ ECDH Key Exchange - Examples
○ Exercises: ECDH Key Exchange
○ ECC Encryption / Decryption
○ ECIES Hybrid Encryption Scheme
○ ECIES Encryption - Example
○ Exercises: ECIES Encrypt / Decrypt
• Digital Signatures
○ RSA Signatures
○ RSA: Sign / Verify - Examples
○ Exercises: RSA Sign and Verify
○ ECDSA: Elliptic Curve Signatures
○ ECDSA: Sign / Verify - Examples
○ Exercises: ECDSA Sign and Verify
○ EdDSA and Ed25519
○ EdDSA: Sign / Verify - Examples
○ Exercises: EdDSA Sign and Verify
• Quantum-Safe Cryptography
○ Quantum-Safe Signatures - Example
○ Quantum-Safe Key Exchange - Example
○ Quantum-Safe Asymmetric Encryption - Example
• More Cryptographic Concepts
○ Digital Certificates - Example
○ TLS - Example
○ One-Time Passwords (OTP) - Example
• Crypto Libraries for Developers
○ JavaScript Crypto Libraries
○ Python Crypto Libraries
○ C# Crypto Libraries
○ Java Crypto Libraries
• Conclusion
Tags: cryptography, free, book, Nakov, Svetlin Nakov, hashes, hash

---

## Sección 2: Core Concepts & Foundations [Entropy: 0.331]

function, SHA-256, SHA3, BLAKE2, RIPEMD, MAC, message
authentication code, HMAC, KDF, key derivation, key derivation
function, PBKDF2, Scrypt, Bcrypt, Argon2, password hashing, random
generator, pseudo-random numbers, CSPRNG, secure random
generator, key exchange, key agreement, Diffie-Hellman, DHKE,
ECDH, symmetric ciphers, asymmetric ciphers, public key
cryptosystems, symmetric cryptography, AES, Rijndael, cipher block
mode, AES-CTR, AES-GCM, ChaCha20-Poly1305, authenticated
encryption, encryption scheme, public key cryptography, RSA, ECC,
elliptic curves, secp256k1, curve25519, EC points, EC domain
parameters, ECDH key agreement, asymmetric encryption scheme,
hybrid encryption, ECIES, digital signature, RSA signature, DSA,
ECDSA, EdDSA, ElGammal signature, Schnorr signature, quantumsafe cryptography, digital certificates, TLS, OAuth, multi-factor
authentication, crypto libraries, Python cryptography, JavaScript
cryptography, C# cryptography, Java cryptography, C++ cryptography,
PHP cryptography.

Preface
You are a software developer? And sometimes you need to use
cryptography in your daily job, like hashes, encryption or digital
signatures? And you think cryptography is complex and full of math
and it is for nerds only? No, this is not true, every developer can learn
how to use cryptographic algorithms. This book will show you how,
with code examples and hands-on coding experience, with less math
and more practice.
It is not required to be а strong mathematician or even not strong
mathematician to understand the cryptographic concepts from the
developer perspective. This book will teach you the basics of applied
cryptography in almost free of math style, following a step-by-step
approach with lots of code examples and practical exercises
(hands-on experience), just like when you learn Web development,
databases or mobile apps. Yes, if you can learn Web development or
RESTful services, you can learn the practical aspect of cryptography
as well. It is just like learning a new API or a new Web development
framework: you learn a combination of concepts + APIs (crypto
algorithms implemented in crypto libraries) + tools + best practices
how to use these APIs and tools.
From this book you will learn how to use cryptographic algorithms
and cryptosystems like hashes, MAC codes and key derivation
functions (KFD), random generators, key exchange protocols,
symmetric ciphers, encryption schemes, asymmetric cryptosystems,
public-key cryptography, elliptic curves, digital signatures and
quantum-safe crypto algorithms, together with modern cryptographic
tools and libraries.
I am happy to publish this free developer-friendly practical

cryptography book. It holds just what developers need to know in
order to use cryptography in their every day work. It does not cover
the internals of the algorithms and how to design symmetric ciphers,
public-key cryptosystems or authentication schemes. It covers the
basic understanding of the core cryptographic concepts and how to
use them from developer's perspective: libraries, tools, code
examples. This is what most developers need to know about
cryptography. This is what this book gives to you for free.
This Book is for Developers!
This book is designed for developers who write code every day, for
software engineers who create software systems, Web applications,
mobile apps and other software. It may be useful also for DevOps
engineers who deal with crypto algorithms and write code to automate
the IT infrastructure, for system administrators, who want to learn
practical cryptography better, for information security engineers,
who need to deal with cryptography every day and to know which
ciphers and crypto algorithms are safe and which are broken, along
with the possible attacks, for experienced QA engineers who perform
security testing and code reviews about security and cryptography,
and for many other IT professionals.
This book is about using crypto algorithms and cryptographic
packages, not about designing ciphers, signature schemes and
cryptosystems. You will learn how cryptosystems work (without too
much math) and how to use them in your daily job. This book is not
100% free of math, but the complexity level is reduced to match the
average developer's level, and complex concepts are explained in
simplified and understandable style. This book is created by
developers for developers, not by university professors or
mathematicians. It is about coding in a smart way, with understanding
the concepts and using the crypto algorithms and crypto libraries

the right way. It is about the modern crypto algorithms and
cryptographic techniques, used today in the software industry (as of
Nov 2018).
We assume that most developers use higher level programming
languages (such as JavaScript, Python, C#, Java and PHP), so most
code examples in the book are given in Python, which can be
translated to other languages with ease.
This Book is Free!
The main book author Dr. Svetlin Nakov donates this book and its
entire content and code examples for free to the developer and IT
community as open-source project, under the MIT license. Why?
Because the main book author and the people behind this project
believe that the knowledge is for everyone and it should be shared
for free, because developers should learn to use cryptography the
right way, because our world needs more secure software, because
sharing knowledge and skills for free is the greatest miracle of the
modern education.
For the same reasons, which drive the people to build Wikipedia and
share knowledge for free, to publish open-source projects in GitHub
and share code for free, to develop open-source software like GNU/
Linux and Firefox and distribute it for free, I write and publish this
open-source cryptography book for developers. I want to share
knowledge and skills, to help the developers to become better
professionals. I personally as a developer, when I learn a new
technology, I search for free resources and code examples in Internet
and I am happy that someone creates and shares them for free. Now it
is time to return back to the society and to the developer community
and this makes me happy.

---

## Sección 3: Core Concepts & Foundations [Entropy: 0.325]

About the Author: Dr. Svetlin Nakov
Dr. Svetlin Nakov (http://www.nakov.com) is a passionate software
engineer, inspirational technical trainer and tech entrepreneur from
Bulgaria, experienced in broad range of languages, software
technologies and platforms. He is co-founder of several highly
successful tech startups and non-profit organizations and is a
technical advisor in several successful blockchain ICO projects.
Svetlin is training, innovation and inspiration manager at SoftUni - the
largest tech education provider in South-Eastern Europe.
Svetlin Nakov has 20+ years of technical background as software
engineer, software project manager, consultant, trainer and
entrepreneur with rich experience with .NET, Java EE, information
systems, databases, cryptography and software security, Web
development, JavaScript, PHP, Python and software engineering. He

is the leading author of 15 books on computer programming,
software technologies, cryptography, C#, Java, JavaScript, Python and
tens of technical and scientific publications. He is a big fan of
knowledge sharing and is proud Wikipedia contributor, free books
author and open-source supporter.
Svetlin has been a speaker at hundreds of conferences, seminars,
meetups, courses and other trainings in the United States, Singapore,
Germany, Egypt, Bulgaria and other locations. He holds a PhD degree
in computer science (for his research on computational linguistics and
machine learning), several medals from the International Informatics
Olympiads (IOI) and the Bulgarian President’s award “John
Atanasoff”. He has been a part-time assistant professor / trainer in
Sofia University, New Bulgarian University, the Technical University of
Sofia, Ngee Ann Polytechnic (Singapore), Kingsland University (USA)
and few others.
Currently Svetlin Nakov together with his partners drive the global
expansion of the largest training center for software engineers in
Bulgaria and the region – the Software University, where he inspires
and teaches hundred of thousands of young people in computer
science, software development, information technologies and digital
skills, and gives them a profession and a job.
The History behind This Book
Svetlin Nakov together with tens of co-authors has created and
published as open-source projects (in the period 2004-2018) tens of
technical books about computer programming and software
technologies (see http://www.introprogramming.info and http://
www.nakov.com/books), most of which in Bulgarian language. In the
last few years Svetlin switches to English and takes global
knowledge sharing initiative for better and accessible tech
education, demonstrated with creating and sharing free tech books,

free tutorials, free tech webinars and seminars, conference talks and
many other activities.
The book author Svetlin Nakov is involved with applied
cryptography from 2005, when he published the book "Java for
Digitally Signing Documents of the Web" (in Bulgarian), following his
master thesis on a similar topic. Later Nakov is involved in his practice
as software engineer, tech trainer and entrepreneur, with
cryptography, software security and blockchain systems, and his
technical expertise grows along with his experience. In 2018 he
decides to write a free book to share his knowledge about
cryptography and crypto algorithms from developer's perspective and
donate this knowledge to the global dev community. The book takes 3
months to be written and gets published in Nov 2018. You can get a
free copy from: https://cryptobook.nakov.com.
The Software University (SoftUni)
The development of this book is supported by the Software
University (SoftUni): the biggest and most respected training center
for software engineering and digital skills in the South-Eastern Europe,
which gives high-quality tech education, practical skills, profession and
job to tens of thousands of young people.
SoftUni teaches software engineers in the Software University

program, creative and design in the SoftUni Creative program, digital
marketing in the SoftUni Digital program, programming and tech skills
for kids in the SoftUni Kids program, runs a high school for digital
skills SoftUni Svetlina and shares knowledge and skills through the
SoftUni Foundation and its SoftUni Free tech educational portal.
Why Yet Another Book on
Cryptography?
Most books about cryptography on the market are written either in too
academic style with a lot of theory and math or are outdated and do
not describe the cryptography used today or are too small, weak in
content and unfinished. Others are better, but are not free and
accessible for everyone.
This book "Practical Cryptography for Developers" tries to
compensate all above mentioned weak sides of the existing
cryptography books on the market: its is free, developer-friendly,
comprehensive, with less math and more code examples.
Academic Cryptography Books
Many high-quality academic cryptography books exist on the market
and some of them are free, but I can't recommend such a book to а
developer. He will be bored and will start hating cryptography after the
first chapter or two. Some examples:
• One of the strongest academic book on cryptography
concepts is "A Graduate Course in Applied Cryptography"
(by Dan Boneh and Victor Shoup). It is excellent free book about
theoretical cryptography, but is not for developers. It is full of
theory, concepts, math and formulas. It does not provide code
examples or recommended libraries for developers. Up to date
(published in 2017).

• The "Crypto 101" is a free book on cryptography, which is
more understandable for developers. It provides more simple
explanation for the core cryptographic concepts, but without
code examples and recommended libraries and tools. Up to date
(published in 2017).
• Тhe "Handbook of Applied Cryptography" (by Alfred J.
Menezes, Paul C. van Oorschot and Scott A. Vanstone) is
excellent for higher degree students, but is too academic for
developers. It is available for free and explains the theory and
the cryptography concepts very well, with lots of high-level math,
but it is definitely not for developers. It does not provide working
code examples and does not refers the most used crypto
libraries in the software industry. Slightly outdated (published in
2001).
• Yet another good academic cryptography book is
"Understanding Cryptography: A Textbook for Students and
Practitioners" (by Christof Paar, Bart Preneel, Jan Pelzl).
Excellent book on cryptography concepts, well organized, with
algorithms in pseudocode, but it is not for developers. It does not
provide code examples and recommended libraries for
developers. Almost up to date (published in 2010), not free.
• Yet another academic book on cryptographical concepts:
"Practical Cryptography" (by Niels Ferguson and Bruce
Schneier, 2003). Provides deep concepts and explanations of
the popular crypto algorithms, along with pseudo-code. Slightly
outdated (published in 2003).
Crypto Libraries and Their Documentation
Some crypto libraries try to provide documentation with crypto
concepts and code examples, but they are typically limited,
sometimes unfinished and not always consistently organized, with a lot

---

## Sección 4: Core Concepts & Foundations [Entropy: 0.508]

of missing points and can serve to help you using certain library, but
are not the best source to learn the cryptographic concepts.
Still, these documentations and manuals are one of the best free
learning resources for developers who want to use crypto
algorithms, especially experienced engineers with previous
knowledge and skills in the area of cryptography. Examples of good
documentation about crypto algorithms, coming with some crypto
libraries:
• Nettle Documentation - contains very good description of the
most popular cryptographic concepts and popular algorithms
(hashes, MAC, symmetric ciphers, signatures) along with
reliable and fast C implementation.
• PyCA / Cryptography Documentation - contains basic
description of many cryptographic primitives (like hashes, MAC
codes, symmetric encryption, authenticated encryption,
asymmetric algorithms, key exchange, KDF and others) along
with code examples in Python, demonstrating how to use the
pyca/cryptography library APIs and its crypto algorithms.
• Libsodium Documentation - combines API documentation with
elements of cryptographic concepts. It is bound to the C
language, used for the Libsodium project. Provides sample code
examples.
• The Crypto++ Wiki - explains in brief some cryptography
concepts along with guidelines how to use the Crypto++ library
and the C++ classes, implementing certain crypto algorithms.
Provides sample code examples.
• Botan - Developer's Manual - a modern C++ crypto-library,
which comes with implementations of many modern crypto
algorithms, along with documentation, which includes brief
description of the underlying cryptographic concepts.

• Libgcrypt Manual - a cryptographic library, written in C as part
of the GnuPG project. Comes with very light introduction to
crypto concepts and a boring API documentation with almost no
sample code.
Practical Cryptography - Existing Books
To be honest, I conducted a comprehensive research of the book
market (in Nov 2018) to find the best developer-friendly cryptography
books. I was deeply disappointed! I almost didn't find any good
practical book about cryptography for programmers, which I could
recommend to a friend-developer (not scientist or university student)
with confidence that this book is really good and is really what
developers need: modern cryptography + simple explained concepts +
code examples. I found very good academic books and a few books
for developers (rich of code examples) with either not great quality or
very focused on certain technology (like a API reference or library
manual). Some of them were also outdated, but still valuable.
Free Cryptography Books for Developers
This is the list of free books about practical cryptography for
developers:
• Practical Cryptography with Go (by Kyle Isom, published
2015) - a mini-book on how to use cryptography with the Go
language, full of code examples. It has free edition (read online)
and paid editions (PDF, EPUB, MOBI). The book is good, but
its scope is limited to describe some concepts very briefly and
demonstrate how to use them with code examples. It covers
modern symmetric ciphers (like AES-GCM and XSalsa20-
Poly1305), key derivation (PBKDF2 and Scrypt), key exchange
and ECDH, digital signatures (ECDSA and Ed25519), and few
other concepts.

• The Laws of Cryptography with Java Code (by Neal Wagner,
published 2003) - academic-style book on cryptography with
working Java examples, implementing certain crypto algorithms
(like the AES cipher and the RSA cryptosystem).
• Cryptography in .NET Succinctly (by Dirk Strauss, 2017) - a
compilation of .NET code examples about using some
cryptographic primitives like AES, hashes and RSA signatures
from C#. Looks more like a API reference than a serious book
explaining when a how to use the mentioned cryptographic
algorithms, the concepts of the underlying cryptosystems and
the specifics of the underlying algorithms.
Non-Free Cryptography Books for Developers
I could list a few developer-friendly books for practical cryptography
with code examples, which have only paid / commercial versions (no
free edition). Most of them are too deeply bound to certain technology
like C, C++, Java or JavaScript and don't explain the concepts well.
Others have different focus. Some are outdated, some are quite new.
This is the list of what I found from my research about developerfriendly crypto books:
• Serious Cryptography: A Practical Introduction to Modern
Encryption (by by Jean-Philippe Aumasson) - a strong book on
cryptography, which combines academic approach with more
practical approach, with some code examples in Python, but not
for all concepts. Recent (published in 2017). Explains the
modern cryptographic concepts and crypto-suits like AES-GCM,
ChaCha20-Poly1305 and quantum-safe cryptography. This is
maybe the best book of what I found.
• Secure Programming Cookbook for C and C++ (by John
Viega, Matt Messier) - provides secure coding guidelines for C+
+ developers, including topics from cryptography (hashes, MAC

codes, symmetric ciphers, RSA and DSA, random numbers),
with code examples (published in 2009, slightly outdated).
• Cryptography for Developers (by Tom Denis) - provides solid
fundamentals in cryptography and crypto algorithms, along with
implementations in C and assembler with lots of code
examples. Written in the middle between an academic style and
a developer style. Covers hashes, HMAC, AES, slightly RSA
and ECC. Slightly outdated (published in 2007).
• Beginning Cryptography with Java (by David Hook) - a
reference for JCA, JCE, JSSE and the Bouncy Castle crypto
library with lots of code examples in Java (published in 2005,
outdated).
• Cryptography for JavaScript Developers: Web
Cryptography API, SJCL (by Anish Nath) - a reference full of
code examples in JS, but does not explain the concepts like
symmetric ciphers, authenticated encryption, etc. (published in
2018).
• Hands-On Cryptography with Python (by Samuel Bowne) -
nice mini book (87 pages, published in 2018) with lots of code
examples in Python, but with very limited scope: hashes, AES
and RSA. No signatures, no elliptic curves, no MAC and key
derivation functions.
• Cryptography in C and C++ (by Michael Welschenbach) -
guidelines how to implement crypto algorithms like AES and
RSA in C / C++. No signatures, no elliptic curves, no MAC and
key derivation functions. Published in 2005 (outdated).
The absence of good free practical book about cryptography and
crypto algorithms for developers with code examples motivates
me even more to share my knowledge and skills in a developerfriendly cryptography book. I am happy to be one of the first authors to

---

## Sección 5: Core Concepts & Foundations [Entropy: 0.572]

publish a high-quality free book on practical cryptography for software
engineers.
What Does this Book Cover?
This book covers the most important modern cryptographic concepts,
crypto algorithms and cryptographic constructions, used in the
software industry, well illustraed and demonstrated with working code
examples:
• Cryptographic hash functions: concepts, SHA-2, SHA-3,
BLAKE2, RIPEMD160, code examples, collisions
• MAC codes: concepts, HMAC, CMAK, UMAC, applications,
MAC-based random generators, code examples
• Key derivation functions (KDF): concepts, from password to
encryption key, PBKDF2, Scrypt, Bcrypt, Linux crypt(), Argon2,
code examples
• Password encryption techniques: from clear text, through
hashing, to modern secure KDFs like Argon2
• Random numbers and secure random generators: concepts,
entropy, secure random numbers, CSPRNG, code examples
• Key exchange techniques: key establishment and key
agreement, Diffie–Hellman Key Exchange (DHKE) and Elliptic
Curve Diffie–Hellman (ECDH) with code examples
• Encryption concepts: symmetric and asymmetric ciphers,
secret keys, symmetric encryption, encryption schemes, publickey cryptosystems, private and public keys, hybrid encryption,
digital signatures
• Modern symmetric key ciphers: concepts, block ciphers and
stream ciphers, cipher block modes (CBC, CTR, GCM), the AES
(Rijndael) cipher, the Salsa20 / ChaCha20 ciphers, with code
examples
• Symmetric encryption constructions: authenticated encryption,

AES-256-GCM, ChaCha20-Poly1307, AES-256-CTR-HMAC,
with code examples
• Asymmetric key ciphers and public-key cryptosystems: the
RSA cryptosystem (RSA key pairs, encryption, decryption), ECC
(elliptic curve cryptography, EC points and multiplication, named
curves), ECDH (elliptic-curve Diffie–Hellman) key exchange,
code examples
• Elliptic curves: widely used named curves like secp256k1,
P-256, P-521, Curve25519, Curve448-Goldilocks, with code
examples
• Integrated encryption schemes: combining public-key
cryptography with symmetric encryption algorithms, the ECIES
hybrid encryption scheme, with code examples
• Digital signature algorithms: concepts, signing messages,
verifying signatures, RSA signatures, ECDSA and EdDSA
• Quantum-safe cryptography: which classical cryptosystems
are quantum-broken and which are quantum-safe, quantum-safe
signatures and quantum-safe key exchange algorithms,
SPHINCS+, NewHope and others, with code examples
• Other cryptographic concepts: digital certificates, TLS
(Transport Layer Security), one-time passwords (OTP), external
authentication and OAuth
• Crypto libraries and packages for developers: cryptography in
JavaScript, C#, Java, Python, C and C++
• A lot of code examples and exercises, following each major
section
Why Python is Used for the Examples?
Python is one of easiest languages, a language, which is readable
and understandable by all developers (even devs who has zero
experience with it). The idea of the code examples is to illustrate the
crypto algorithms, encryption schemes and other cryptography

concepts in action, not to promote certain library, API, language or
technology.
Use the code examples as reference only, as guideline of how your
code might look like, and adopt them to your favorite language and
framework. Don't directly copy and paste the code examples.
Sometimes we use a library, which is more user friendly and easier to
install and use, instead of a faster and more reliable library from
another vendor. Sometimes we use hex-encoded keys, ciphertexts,
signatures and other values, in order to display them easier on the
console, but in practice most apps will use binary encodings for
increased performance and reduced network overhead.
You are free to adopt the code examples to other languages. At the
end of the book we have given examples how to use cryptography in
the most popular programming languages: JavaScript, C#, Java and
Python. We skip giving examples with the lower level languages like C
and C++ because they work better for library writers (to implement
efficiently certain algorithm), not for app developers. C and C++ are
more complex to setup and build, need more effort to manage the
project dependencies and are more prone to errors.
Most application developers (e.g. Web devs, back-end devs, mobile
devs and front-end devs) use higher level languages (like JS,
Python, C#, Java, PHP and Go), but all of them will understand the
Python code from the examples. If the code was given in C, it would
be longer, more complex and less readable.
Python is widely supported everywhere (in Linux, Windows, Mac, on
mobile devices and microcontrollers). All examples can also run online
in a virtual machine in online Python environments such as: Repl.it
and PythonAnywhere.
How to Read This Book?

The recommended way to read this is topic by topic (from the start to
the end). You may skip chapters and sections that you don't like, but
please pass through them, because the content has internal
dependencies.
Play with the code examples: run them, modify them, break them,
explore and experiment with the code and learn by playing.
Try to solve the practical exercises in chapter. Developers learn best
by writing code and this is what I recommend. You are given well
described exercise problems, with clear input and output, covering well
the content after each major section.
Now, start your developer journey into the modern practical
cryptography. Enjoy the book!

Overview of Modern Cryptography
Cryptography has evolved from its first attempts (thousands years
ago), through the first successful cryptographic algorithms for
developers (like the now retired MD5 and DES) to modern crypto
algorithms (like SHA-3, Argon2 and ChaCha20).
Let's first introduce very shortly the basic cryptography concepts,
that developers should know, like cryptographic hash functions
(SHA-256, SHA3, RIPEMD and others), HMAC (hashed message
authentication code), password to key derivation functions (like
Scrypt), the Diffie-Hellman key-exchange protocol, symmetric key
encryption schemes (like the AES cipher with CBC and CTR block
modes) and asymmetric key encryption schemes with public and
private keys (like the RSA cipher and elliptic curves-based
cryptography / ECC, the secp256k1 curve and the Ed25519
cryptosystem), digital signatures and ECDSA, as well as the concept
of entropy and secure random number generation and quantumsafe cryptography.
Encrypt / Decrypt Message - Live Demo
As a simple example, we shall demonstrate message encryption +
decryption using the AES encryption algorithm. Play with this online
tool: https://aesencryption.net.

---

## Sección 6: Core Concepts & Foundations [Entropy: 0.502]

We shall learn later that behind this simple AES encryption, there are
many algorithms and settings hidden inside, like password to keyderivation function and its parameters, block cipher mode, cipher initial
vector, message authentication code and others.
What is Cryptography?
Cryptography is the science of providing security and protection of
information. It is used everywhere in our digital world: when you open
a Web site, send an email or connect to the WiFi network. That's why
developers should have at least basic understanding of
cryptography and how to use crypto algorithms and crypto libraries,
to understand hashing, symmetric and asymmetric ciphers and
encryption schemes, as well as digital signatures and the

cryptosystems and algorithms behind them.
Encryption and Keys
Cryptography deals with storing and transmitting data in a secure
way, such that only those, for whom it is intended, can read and
process it. This may involve encrypting and decrypting data using
symmetric or asymmetric encryption schemes, where one or more
keys are used to transform data from plain to encrypted form and
back.
Symmetric encryption (like AES, Twofish and ChaCha20) uses the
same key to encrypt and decrypt messages, while asymmetric
encryption uses a public-key cryptosystem (like RSA or ECC) and a
key-pair: public key (encryption key) and corresponding private key
(decryption key). Encryption algorithms are often combined in
encryption schemes (like AES-256-CTR-HMAC-SHA-256, ChaCha20-
Poly1305 or ECIES-secp256k1-AES-128-GCM).
Cryptography deals with keys (large secret numbers) and in many
scenarios these keys are derived from numbers, passwords or
passphrases using key derivation algorithms (like PBKDF2 and
Scrypt).
Digital Signatures and Message
Authentication
Cryptography provides means of digital signing of messages which
guarantee message authenticity, integrity and non-repudiation. Most
digital signature algorithms (like DSA, ECDSA and EdDSA) use
asymmetric key pair (private and public key): the message is signed
by the private key and the signature is verified by the corresponding
public key. In the bank systems digital signatures are used to sign

and approve payments. In blockchain signed transactions allow users
to transfer a blockchain asset from one address to another.
Cryptography deals with message authentication algorithms (like
HMAC) and message authentication codes (MAC codes) to prove
message authenticity, integrity and authorship. Authentication is used
side by side with encryption, to ensure secure communication.
Secure Random Numbers
Cryptography uses random numbers and deals with entropy
(unpredictable randomness) and secure generation of random
numbers (e.g. using CSPRNG). Secure random numbers are
unpredictable by nature and developers should care about them,
because broken random generator means compromised or hacked
system or app.
Key Exchange
Cryptography defines key-exchange algorithms (like Diffie-Hellman
key exchange and ECDH) and key establishment schemes, used to
securely establish encryption keys between two parties that intend to
transmit messages securely using encryption. Such algorithms are
performed typically when a new secure connection between two
parties is established, e.g. when you open a modern Web site or
connect to the WiFi network.
Cryptographic Hashes and Password
Hashing
Cryptography provides cryptographic hash functions (like SHA-3
and BLAKE2), which transform messages to message digest (hash of

fixed length), which cannot be reversed back to the original message
and almost uniquely identifies the input. In blockchain systems, for
example, hashes are used to generate blockchain addresses,
transaction ID and in many other algorithms and protocols. In Git
cryptographic hashes are used for generating unique ID for files and
commits.
Password hashing and password to key derivation functions (like
Scrypt and Argon2) protect user passwords and password encrypted
documents and data by securely deriving a hash (or key) from a textbased passwords, injecting random parameters (salt) and using a lot of
iterations and computing resources to make password cracking slow.
Confusion and Diffusion in
Cryptography
In cryptography the hashing, encryption algorithms and random
generators follow the Shannon's principles of confusion and diffusion.
Confusion means that each bit in the output form a cipher should
depend on several parts of the key and input data and thus direct
mapping cannot be established. Diffusion means that changing one
bit in the input should change approximately half of the bits in the
output. These principles are incorporated in most hash functions, MAC
algorithms, random number generators, symmetric and asymmetric
ciphers.
Cryptographic Libraries
Developers should know the modern cryptographic libraries for their
programming language and platform and how to use them. Developing
with cryptography requires understanding of the crypto-concepts.
Copy / pasting code from Internet or following an example from a blog
may lead to insecure design and weak security. Cryptographic libraries

are very useful, but you should understand the concepts first, then
choose appropriate combination of algorithms and adjust carefully their
parameters.

Hashing and Cryptographic Hash
Functions
In computer programming hash functions map text (or other data) to
integer numbers. Usually different inputs maps to different outputs, but
sometimes a collision may happen (different input with the same
output).
Cryptographic hash functions transform text or binary data to fixedlength hash value and are known to be collision-resistant and
irreversible. Example of cryptographic hash function is SHA3-256:
normalSHA3-256("hello") =
"3338be694f50c5f338814986cdf0686453a888b84f424d792af4b9202398f392"
normal
The above SHA3-256 hash calculation can be coded in Python like
this:
normalimport hashlib, binascii
sha3_256hash = hashlib.sha3_256(b'hello').digest()
print("SHA3-256('hello') =", binascii.hexlify(sha3_256hash))
normal
Run the above code example: https://repl.it/@nakov/SHA3-256-helloin-Python.
The same SHA3-256 hash calculation can be coded in JavaScript like
this (after  npm install js-sha3 ):
normalsha3 = require('js-sha3');
let sha3_256hash = sha3.sha3_256('hello').toString();
console.log("SHA3-256('hello') =", sha3_256hash);
normal

---

## Sección 7: Core Concepts & Foundations [Entropy: 0.8]

Run the above code example: https://repl.it/@nakov/SHA3-256-helloin-JS.
Hashing (in Software Engineering)
The process of calculating the value of certain hash function is called
"hashing".
In the above example the text  John Smith  is hashed to the hash value
 02  and  Lisa Smith  is hashed to  01 . The input texts  John Smith 
and  Sandra Dee  both are hashed to  02  and this is called "collision".
Hash functions are irreversible by design, which means that there is
no fast algorithm to restore the input message from its hash value.
In programming hash functions are used in the implementation of the

data structure "hash-table" (associative array) which maps values of
certain input type to values of another type, e.g. map product name
(text) to product price (decimal number).
A naive hash function is just to sum the bytes of the input data / text.
It causes a lot of collisions, e.g.  hello  and  ehllo  will have the same
hash code. Better hash functions may use the Merkle–Damgård
construction scheme, which takes the first byte as state, then
transforms the state (e.g. multiplies it by a prime number like 31),
then adds the next byte to the state, then again transforms the state
and adds the next byte, etc. This significantly reduces the rate of
collisions and produces better distribution.
Cryptographic Hash Functions
In cryptography, hash functions transform input data of arbitrary size
(e.g. a text message) to a result of fixed size (e.g. 256 bits), which is
called hash value (or hash code, message digest, or simply hash).
Hash functions (hashing algorithms) used in computer cryptography
are known as "cryptographic hash functions". Examples of such
functions are SHA-256 and SHA3-256, which transform arbitrary input
to 256-bit output.
Cryptographic Hash Functions - Examples

As an example, we can take the cryptographic hash function  SHA-256 
and calculate the hash value of certain text message  hello :
normalSHA-256("hello") =
"2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824"
normal
The above SHA-256 calculation can be coded in Python like this:
normalimport hashlib, binascii
sha256hash = hashlib.sha256(b'hello').digest()
print("SHA-256('hello') = ", binascii.hexlify(sha256hash))
normal
Run the above code example: https://repl.it/@nakov/SHA-256-hello-in-
Python.
There is no efficient algorithm to find the input message (in the above
example  hello ) from its hash value (in the above example
 2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824 ). It
is well-known that cryptographic hash functions cannot be reversed
back, so they are used widely to encode an input without revealing it
(e.g. encode a private key to a blockchain address without revealing
the key).
As another example, we can take the cryptographic hash function
 SHA3-512  and calculate the hash value of the same text message
 hello :
normalSHA3-512("hello") =
"75d527c368f2efe848ecf6b073a36767800805e9eef2b1857d5f984f036eb6df891d75f7
normal
Cryptographic Hash Functions - Live Demo
Play with most popular cryptographic hash functions online: https://
www.fileformat.info/tool/hash.htm.

Cryptographic hash functions are widely used in cryptography, in
computer programming and in blockchain systems.

Cryptographic Hash Functions and
Collisions
Different input messages are expected to produce different output
hash values (message digest).
Hash Collisions
A collision means the same hash value for two different inputs. For
simple hash functions it is easy to reach a collision. For example,
assume a hash function  h(text)  sums of all character codes in a text.
It will produce the same hash value (collision) for texts holding the
same letters in different order, i.e.  h('abc') == h('cab') == h('bca') .

To avoid collisions, cryptographers have designed collision-resistant
hash functions.
Cryptographic Hash Functions: No
Collisions
Collisions in the cryptographic hash functions are extremely unlikely
to be found, so crypto hashes are considered to almost uniquely
identify their corresponding input. Moreover, it is extremely hard to find
an input message that hashes to given value.
Cryptographic hash functions are one-way hash functions, which are
infeasible to invert. The chance to find a collision (by brute force) for
a strong cryptographic hash function (like SHA-256) is extremely little.
Let's define this in more details:
• Let's have hash value  h = hash(p)  for certain strong
cryptographic hash function  hash .
• It is expected to be extremely hard to find an input  p' , such
that  hash(p') = h .
• For most modern strong cryptographic hash functions there are
no known collisions.
The ideal cryptographic hash function should have the following
properties:
• Deterministic: the same input message should always result in
the same hash value.
• Quick: it should be fast to compute the hash value for any given
message.
• Hard to analyze: a small change to the input message should
totally change the output hash value.
• Irreversible: generating a valid input message from its hash
value should be infeasible. This means that there should be no

significantly better way than brute force (try all possible input
messages).
• No collisions: it should be extremely hard (or practically
impossible) to find two different messages with the same hash.
Modern cryptographic hash functions (like SHA2 and SHA3) match the
above properties and are used widely in cryptography.

Cryptographic Hash Functions:
Applications
Cryptographic hash functions (like SHA-256 and SHA3-256) are
used in many scenarios. Let's review their most common applications.
Document Integrity
Verifying the integrity of files / documents / messages. E.g. a SHA256
checksum may confirm that certain file is original (not modified after
its checksum was calculated).
The above screenshot demonstrates how the SHA256 checksums
ensure the integrity of the OpenSSL files at the official Web site of
OpenSSL.
Storing Passwords
Storing passwords and verification of passwords. Instead of keeping a
plain-text password in the database, developers usually keep
password hashes or more complex values derived from the password
(e.g. Scrypt-derived value).

---

## Sección 8: Core Concepts & Foundations [Entropy: 0.575]

The above example comes from the  /etc/shadow  file in a modern
Linux system. The above passwords are stored as multiple-round
SHA-512 hashes with salt.
Generate Unique ID
Generate an (almost) unique ID of certain document / message.
Cryptographic hash functions almost uniquely identify documents
based on their content. In theory collisions are possible with any
cryptographic hash function, but are very unlikely to happen, so most
systems (like Git) assume that the hash function they use is collistion
free.
Usually a document is hashed and the document ID (hash value) is
used later to prove the existence of the document, or to retrieve the
document from a storage system. Example of hash-based unique IDs
are the commit hashes in Git and GitHub, based on the content of the
commit (e.g.  3c3be25bc1757ca99aba55d4157596a8ea217698 ) and the
Bitcoin addresses (e.g.  1BvBMSEYstWetqTFn5Au4m4GFg7xJaNVN2 ).

In the above example the SHA-1 unique ID identifies a certain commit
in GitHub.
Pseudorandom Number Generation
Pseudorandom generation and key derivation. Hash values can
serve as random numbers. A simple way to generate a random
sequence is like this: start from a random seed (entropy collected
from random events, such like keyboard clicks or mouse moves).
Append "1" and calculate the hash to obtain the first random number,
then append "2" and calculate the hash to obtain the second random
number, etc. We shall give a Python example, implementing the
described idea.
Proof-of-Work Algorithms
Proof-of-work (PoW) algorithms. Most proof-of-work algorithms
calculate a hash value which is bigger than certain value (known as
mining difficulty). To find this hash value, miners calculate billions of
different hashes and take the biggest of them, because hash numbers

are unpredictable. For example, the proof of work problem might be
defined as follows: find a number  p , such that  hash(x + p)  holds 10
zero bits at its beginning.
Cryptographic Hashes are Part of
Modern Programming
Cryptographic hash functions are so widely used, that they are often
implemented as build-in functions in the standard libraries for the
modern programming languages and platforms.

Secure Hash Algorithms
In the past, many cryptographic hash algorithms were proposed
and used by software developers. Some of them was broken (like
MD5 and SHA1), some are still considered secure (like SHA-2, SHA-3
and BLAKE2). Let's review the most widely used cryptographic hash
functions (algorithms).
Secure Hash Functions
Modern cryptographic hash algorithms (like SHA-3 and BLAKE2)
are considered secure enough for most applications.
SHA-2, SHA-256, SHA-512
SHA-2 is a family of strong cryptographic hash functions: SHA-256
(256 bits hash), SHA-384 (384 bits hash), SHA-512 (512 bits hash),
etc. It is based on the cryptographic concept "Merkle–Damgård
construction" and is considered highly secure. SHA-2 is published
as official crypto standard in the United States.
SHA-2 is widely used by developers and in cryptography and is
considered cryptographically strong enough for modern commercial
applications.
SHA-256 is widely used in the Bitcoin blockchain, e.g. for identifying
the transaction hashes and for the proof-of-work mining performed by
the miners.
Examples of SHA2 hashes:
normalSHA-256('hello') =

2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824
SHA-384('hello') =
59e1748777448c69de6b800d7a33bbfb9ff1b463e44354c3553bcdb9c666fa90125a3c79f
SHA-512('hello') =
9b71d224bd62f3785d96d46ad3ea3d73319bfbc2890caadae2dff72519673ca72323c3d99b
normal
More Hash Bits == Higher Collision
Resistance
By design, more bits at the hash output are expected to achieve
stronger security and higher collision resistance (with some
exceptions). As general rule, 128-bit hash functions are weaker than
256-bit hash functions, which are weaker than 512-bit hash functions.
Thus, SHA-512 is stronger than SHA-256, so we can expect that for
SHA-512 it is more unlikely to practically find a collision than for
SHA-256.
SHA-3, SHA3-256, SHA3-512, Keccak-256
SHA-3 (and its variants SHA3-224, SHA3-256, SHA3-384, SHA3-512),
is considered more secure than SHA-2 (SHA-224, SHA-256,
SHA-384, SHA-512) for the same hash length. For example,
SHA3-256 provides more cryptographic strength than SHA-256 for
the same hash length (256 bits).
The SHA-3 family of functions are representatives of the "Keccak"
hashes family, which are based on the cryptographic concept "sponge
construction". Keccak is the winner of the SHA-3 NIST competition.
Unlike SHA-2, the SHA-3 family of cryptographic hash functions are
not vulnerable to the "length extension attack".
SHA-3 is considered highly secure and is published as official
recommended crypto standard in the United States.
The hash function Keccak-256, which is used in the Ethereum

blockchain, is a variant of SHA3-256 with some constants changed in
the code.
The hash functions SHAKE128(msg, length) and SHAKE256(msg,
length) are variants of the SHA3-256 and SHA3-512 algorithms,
where the output message length can vary.
Examples of SHA3 hashes:
normalSHA3-256('hello') =
3338be694f50c5f338814986cdf0686453a888b84f424d792af4b9202398f392
Keccak-256('hello') =
1c8aff950685c2ed4bc3174f3472287b56d9517b9c948127319a09a7a36deac8
SHA3-512('hello') =
75d527c368f2efe848ecf6b073a36767800805e9eef2b1857d5f984f036eb6df891d75f72d
SHAKE-128('hello', 256) =
4a361de3a0e980a55388df742e9b314bd69d918260d9247768d0221df5262380
SHAKE-256('hello', 160) =
1234075ae4a1e77316cf2d8000974581a343b9eb
normal
BLAKE2 / BLAKE2s / BLAKE2b
BLAKE / BLAKE2 / BLAKE2s / BLAKE2b is a family of fast, highly
secure cryptographic hash functions, providing calculation of 160-bit,
224-bit, 256-bit, 384-bit and 512-bit digest sizes, widely used in
modern cryptography. BLAKE is one of the finalists at the SHA-3 NIST
competition.
The BLAKE2 function is an improved version of BLAKE.
BLAKE2s (typically 256-bit) is BLAKE2 implementation, performanceoptimized for 32-bit microprocessors.
BLAKE2b (typically 512-bit) is BLAKE2 implementation, performanceoptimized for 64-bit microprocessors.
The BLAKE2 hash function has similar security strength like SHA-3,
but is less used by developers than SHA2 and SHA3.
Examples of BLAKE hashes:

---

## Sección 9: Core Concepts & Foundations [Entropy: 0.77]

normalBLAKE2s('hello') =
19213bacc58dee6dbde3ceb9a47cbb330b3d86f8cca8997eb00be456f140ca25
BLAKE2b('hello') =
e4cfa39a3d37be31c59609e807970799caa68a19bfaa15135f165085e01d41a65ba1e1b14
normal
RIPEMD-160
RIPEMD-160 is a secure hash function, widely used in cryptography,
e.g. in PGP and Bitcoin.
The 160-bit variant of RIPEMD is widely used in practice, while the
other variations like RIPEMD-128, RIPEMD-256 and RIPEMD-320 are
not popular and have disputable security strengths.
As recommendation, prefer using SHA-2 and SHA-3 instead of
RIPEMD, because they are more stronger than RIPEMD, due to higher
bit length and less chance for collisions.
Examples of RIPEMD hashes:
normalRIPEMD-160('hello') =
108f07b8382412612c048d07d13f814118445acd
RIPEMD-320('hello') =
eb0cf45114c56a8421fbcb33430fa22e0cd607560a88bbe14ce70bdf59bf55b11a3906987
normal
All of the above popular secure hash functions (SHA-2, SHA-3,
BLAKE2, RIPEMD) are not restricted by commercial patents and are
free for public use.
Insecure Hash Functions
Old hash algorithms like MD5, SHA-0 and SHA-1 are considered
insecure and were withdrawn due to cryptographic weaknesses
(collisions found). Don't use MD5, SHA-0 and SHA-1! All these hash
functions are proven to be cryptographically insecure.

You can find in Internet that SHA1 collisions can be practically
generated and this results in algorithms for creating fake digital
signatures, demonstrated by two different signed PDF documents
which hold different content, but have the same hash value and the
same digital signature. See https://shattered.io.
Avoid using of the following hash algorithms, which are considered
insecure or have disputable security: MD2, MD4, MD5, SHA-0,
SHA-1, Panama, HAVAL (disputable security, collisions found for
HAVAL-128), Tiger (disputable, weaknesses found), SipHash (it is not
a cryptographic hash function).
Other Secure Hash Functions
The below functions are popular strong cryptographic hash functions,
alternatives to SHA-2, SHA-3 and BLAKE2:
• Whirlpool is secure cryptographic hash function, which
produces 512-bit hashes.
• SM3 is the crypto hash function, officialy standartized by the
Chinese government. It is similar to SHA-256 (based on the
Merkle–Damgård construction) and produces 256-bit hashes.
• GOST (GOST R 34.11-94) is secure cryptographic hash
function, the Russian national standard, described in RFC 4357.
It produces 256-bit hashes.
The below functions are less popular alternatives to SHA-2, SHA-3
and BLAKE, finalists at the SHA-3 NIST competition:
• Skein is secure cryptographic hash function, capable to derive
128, 160, 224, 256, 384, 512 and 1024-bit hashes.
• Grøstl is secure cryptographic hash function, capable to derive
224, 256, 384 and 512-bit hashes.

• JH is secure cryptographic hash function, capable to derive 224,
256, 384 and 512-bit hashes.
No Collisions for SHA-256, SHA3-256,
BLAKE2s and RIPEMD-160 are Known
As of Oct 2018, no collisions are known for: SHA256, SHA3-256,
Keccak-256, BLAKE2s, RIPEMD160 and few others.
Brute forcing to find hash function collision as general costs: 2128 for
SHA256 / SHA3-256 and 280 for RIPEMD160.
Respectively, on a powerful enough quantum computer, it will cost
less time: 2256/3 and 2160/3 respectively. Still (as of September 2018)
so powerful quantum computers are not known to exist.
Learn more about cryptographic hash functions, their strength and
attack resistance at: https://z.cash/technology/history-of-hashfunction-attacks.html

Hash Functions - Examples in
Python
In this section we shall provide a few examples about calculating
cryptographic hash functions in Python.
Calculating Cryptographic Hash
Functions in Python
We shall use the standard Python library  hashlib . The input data for
hashing should be given as bytes sequence (bytes object), so we
need to encode the input string using some text encoding, e.g.
 utf8 . The produced output data is also a bytes sequence, which can
be printed as hex digits using  binascii.hexlify()  as shown below:
normalimport hashlib, binascii
text = 'hello'
data = text.encode("utf8")
sha256hash = hashlib.sha256(data).digest()
print("SHA-256: ", binascii.hexlify(sha256hash))
sha3_256 = hashlib.sha3_256(data).digest()
print("SHA3-256: ", binascii.hexlify(sha3_256))
blake2s = hashlib.new('blake2s', data).digest()
print("BLAKE2s: ", binascii.hexlify(blake2s))
ripemd160 = hashlib.new('ripemd160', data).digest()
print("RIPEMD-160:", binascii.hexlify(ripemd160))
normal
Run the above code example: https://repl.it/@nakov/Hashes-SHA2-
SHA3-BLAKE2-RIPEMD-in-Python.
The expected output from the above example looks like this:

normalSHA-256: 
b'2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824'
SHA3-256: 
b'3338be694f50c5f338814986cdf0686453a888b84f424d792af4b9202398f392'
BLAKE2s: 
b'19213bacc58dee6dbde3ceb9a47cbb330b3d86f8cca8997eb00be456f140ca25'
RIPEMD-160: b'108f07b8382412612c048d07d13f814118445acd'
normal
Calculating  Keccak-256  hashes (the hash function used in the
Ethereum blockchain) requires non-standard Python functions. In the
below example we use the  pycryptodome  package available from
PyPI: https://pypi.org/project/pycryptodome.
First install "pycryptodome" (https://www.pycryptodome.org)
normalpip install pycryptodome
normal
Now write some Python code to calculate a Keccak-256 hash:
normalfrom Crypto.Hash import keccak
import binascii
keccak256 = keccak.new(data=b'hello', digest_bits=256).digest()
print("Keccak256:", binascii.hexlify(keccak256))
normal
Run the above code example: https://repl.it/@nakov/Keccak256-in-
Python.
The output from the above examples is:
normalKeccak256:
b'1c8aff950685c2ed4bc3174f3472287b56d9517b9c948127319a09a7a36deac8'
normal

Exercises: Calculate Hashes
In this exercise session, you are assigned to write some code to
calculate cryptographic hashes. Write a program to calculate
hashes of given text message: SHA-224, SHA-256, SHA3-224,
SHA3-384, Keccak-384 and Whirlpool. Write your code in
programming language of choice.
Calculate SHA-224 Hash
Input
Output
hello
ea09ae9cc6768c50fcee903ed054556e5bfc8347907f12598aa2
Calculate SHA-256 Hash
Input
Output
hello
2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e7304
Calculate SHA3-224 Hash
Input
Output
hello
b87f88c72702fff1748e58b87e9141a42c0dbedc29a78cb0d4a5c
Calculate SHA3-384 Hash

---

## Sección 10: Core Concepts & Foundations [Entropy: 0.875]

Input
Output
hello
720aea11019ef06440fbf05d87aa24680a2153df3907b23631e7
Calculate Keccak-384 Hash
Input
Output
hello
dcef6fb7908fd52ba26aaba75121526abbf1217f1c0a31024652d
Calculate Whirlpool (512 Bit) Hash
Input
Output
hello
0a25f55d7308eca6b9567a7ed3bd1b46327f0f1ffdc804dd8bb5a
Hints: follow the Python examples, given earlier in this section or
search in Internet.

Proof-of-Work Hash Functions:
ETHash and Equihash
Blockchain proof-of-work mining algorithms use a special class of
hash functions which are computational-intensive and memoryintensive. These hash functions are designed to consume a lot of
computational resources and a lot of memory and to be very hard to be
implemented in a hardware devices (such as FPGA integrated circuits
or ASIC miners). Such hash functions are known as "ASIC-resistant".
Many hash functions are designed for proof-of-work mining algorithms,
e.g. ETHash, Equihash, CryptoNight and Cookoo Cycle. These
hash functions are slow to calculate, and usually use GPU hardware
(rigs of graphics cards like NVIDIA GTX 1080) or powerful CPU
hardware (like Intel Core i7-8700K) and a lot of fast RAM memory (like
DDR4 chips). The goal of these mining algorithms is to minimize the
centralization of mining by stimulating the small miners (home users
and small mining farms) and limit the power of big players in the
mining industry (who can afford to build giant mining facilities and data
centers). A big number of small players means better
decentralization than a small number of big players.
The main weapon in the hands of the big mining corporations is
considered the ASIC miners, so the design of modern cryptocurrencies
and usually includes proof-of-work mining using an ASIC-resistant
hashing algorithm or proof-of-stake consensus protocol.
ETHash
Let's explain in brief the idea behind the ETHash proof-of-work mining

hash function used in the Ethereum blockchain.
• ETHash is the proof-of-work hash function in the Ethereum
blockchain. It is memory-intensive hash-function (requires a lot
of RAM to be calculated fast), so it is believed to be ASICresistant.
How does ETHash work?
• A "seed" is computed for each block (based on the entire chain
until the current block).
• From the seed, a 16 MB pseudorandom cache is computed.
• From the cache, a 1 GB dataset is extracted to be used in
mining.
• Mining involves hashing together random slices of the dataset.
Learn more about ETHash at: https://github.com/ethereum/wiki/wiki/
Ethash, https://github.com/lukovkin/ethash.
Equihash
Let's explain in briefly the idea behind the Equihash proof-of-work
mining hash function used in Zcash, Bitcoin Gold and a few other
blockchains.
• Equihash is the proof-of-work hash function in the Zcash and
Bitcoin Gold blockchains. It is memory-intensive hash-function
(requires a lot of RAM for fast calculation), so it is believed to be
ASIC-resistant.
How does Equihash work?
• Uses BLAKE2b to compute 50 MB hash dataset from the
previous blocks in the blockchain (until the current block).
• Solves the "Generalized Birthday Problem" over the generated
hash dataset (pick 512 different strings from 2097152, such that

the binary XOR of them is zero). The best known solution
(Wagner's algorithm) runs in exponential time, so it requires a lot
of memory-intensive and computing-intensive calculations.
• Double SHA256 the solution to compute the final hash.
Learn more about Equihash at: https://www.cryptolux.org/images/b/
b9/Equihash.pdf, https://github.com/tromp/equihash.
More about ASIC-Resistant Hash
Functions
Lear more about the ASIC-resistant hash functions at: https://
github.com/ifdefelse/ProgPOW.

MAC Codes and Key Derivation
Functions
Message authentication codes (MAC), HMAC (hash-based message
authentication code) and KDF (key derivation functions) play important
role in cryptography. Let's explain when we need MAC, how to
calculate HMAC and how it is related to key derivation functions.
Message Authentication Code (MAC)
Message Authentication Code (MAC) is cryptographic code, calculated
by given key and given message:
normalauth_code = MAC(key, msg)
normal
Typically, it behaves like a hash function: a minor change in the
message or in the key results to totally different MAC value. It should
be practically infeasible to change the key or the message and get the
same MAC value. MAC codes, like hashes, are irreversible: it is
impossible to recover the original message or the key from the MAC
code. MAC algorithms are also known as "keyed hash functions",
because they behave like a hash function with a key.
For example, the MAC code can be calculated by the HMAC-SHA256
algorithm like this:
normalHMAC-SHA256('key', 'some msg') =
32885b49c8a1009e6d66662f8462e7dd5df769a7b725d1d546574e6d5d6e76ad
normal
The above HMAC-SHA256 calculation can be coded in Python like

this:
normalimport hashlib, hmac, binascii
mac = hmac.new(b'key', b'some msg', hashlib.sha256).digest()
print(binascii.hexlify(mac))
normal
Run the above code example: https://repl.it/@nakov/HMAC-SHA256-
in-Python.
The MAC code is digital authenticity code, like a digital signature,
but with pre-shared key. We shall learn more about digital signing and
digital signatures later.
MAC Algorithms
Many algorithms for calculating message authentication codes (MAC)
exist in modern cryptography. The most popular are based on hashing
algorithms, like HMAC (Hash-based MAC, e.g. HMAC-SHA256) and
KMAC (Keccak-based MAC). Others are based on symmetric
ciphers, like CMAC (Cipher-based MAC), GMAC (Galois MAC) and
Poly1305 (Bernstein's one-time authenticator). Other MAC algorithms
include UMAC (based on universal hashing), VMAC (highperformance block cipher-based MAC) and SipHash (simple, fast,
secure MAC).
When We Need MAC Codes?
A sample scenario for using MAC codes is like this:
• Two parties exchange somehow a certain secret MAC key (preshared key).
• We receive a msg + auth_code from somewhere (e.g. from
Internet, from the blockchain, or from email message).

• We want to be sure that the msg is not tampered, which means
that both the key and msg are correct and match the MAC code.
• In case of tampered message, the MAC code will be incorrect.
Authenticated Encryption: Encrypt /
Decrypt Messages using MAC
Another scenario to use MAC codes is for authenticated encryption:
when we encrypt a message and we want to be sure the decryption
password is correct and the decrypted message is the same like the
original message before encryption.
• First, we derive a key from the password. We can use this key
for the MAC calculation algorithm (directly or hashed for better
security).
• Next, we encrypt the message using the derived key and store
the ciphertext in the output.
• Finally, we calculate the MAC code using the derived key and
the original message and we append it to the output.
When we decrypt the encrypted message (ciphertext + MAC), we
proceed as follows:

---

## Sección 11: Core Concepts & Foundations [Entropy: 0.695]

• First, we derive a key from the password, entered by the user. It
might be the correct password or wrong. We shall find out later.
• Next, we decrypt the message using the derived key. It might
be the original message or incorrect message (depends on the
password entered).
• Finally, we calculate a MAC code using the derived key + the
decrypted message.
○ If the calculated MAC code matches the MAC code in the
encrypted message, the password is correct.
○ Otherwise, it will be proven that the decrypted message is
not the original message and this means that the
password is incorrect
Some authenticated encryption algorithms (such as AES-GCM and
ChaCha20-Poly1305) integrate the MAC calculation into the
encryption algorithm and the MAC verification into the decryption
algorithm. We shall learn more about these algorithms later.
The MAC is stored along with the ciphertext and it does not reveal the
password or the original message. Storing the MAC code, visible to
anyone is safe, and after decryption, we know whether the message is
the original one or not (wrong password).
MAC-Based Pseudo-Random
Generator
Another application of MAC codes is for pseudo-random generator
functions. We can start from certain salt (constant number or the
current date and time or some other randomness) and some seed
number (last random number generated, e.g. 0). We can calculate the
next_seed as follows:
normalnext_seed = MAC(salt, seed)
normal

This next pseudo-random number is "randomly changed" after each
calculation of the above formula and we can use it to generate the next
random number in certain range. We shall demonstrated a fully
working example in the "Secure Random Generators" chapter.

HMAC and Key Derivation
Functions (KDF)
Simply calculating  hash_func(key + msg)  to obtain a MAC (message
authentication code) is considered insecure (see the details). It is
recommended to use the HMAC algorithm instead, e.g.  HMAC-SHA256 
or  HMAC-SHA3-512  or other secure MAC algorithm.
What is HMAC?
HMAC = Hash-based Message Authentication Code (MAC code,
calculated using a cryptographic hash function):
normalHMAC(key, msg, hash_func) -> hash
normal
The results MAC code is a message hash mixed with a secret key. It
has the cryptographic properties of hashes: irreversible, collision
resistant, etc.
The  hash_func  can be any cryptographic hash function like  SHA-256 ,
 SHA-512 ,  RIPEMD-160 ,  SHA3-256  or  BLAKE2s .
HMAC is used for message authenticity, message integrity and
sometimes for key derivation.
Key Derivation Functions (KDF)
Key derivation function (KDF) is a function which transforms a
variable-length password to fixed-length key (sequence of bits):

normalfunction(password) -> key
normal
As very simple KDF function, we can use SHA256: just hash the
password. Don't do this, because it is insecure. Simple hashes are
vulnerable to dictionary attacks.
As more complicated KDF function, you can derive a password by
calculating HMAC(salt, msg, SHA256) using some random value
called "salt", which is stored along with the derived key and used later
to derive the same key again from the password.
Using HKDF (HMAC-based key derivation) for key derivation is less
secure than modern KDFs, so experts recommend using stronger key
derivation functions like PBKDF2, Bcrypt, Scrypt and Argon2. We shall
discuss all these KDF functions later.
HMAC Calculation - Example
To get a better idea of HMAC and how it is calculated, try this online
tool: https://www.freeformatter.com/hmac-generator.html

Play with calculating HMAC('sample message', '12345', 'SHA256'):
normalHMAC('sample message', '12345', 'SHA256') =
 
'ee40ca7bc90df844d2f5b5667b27361a2350fad99352d8a6ce061c69e41e5d32'
normal
Try the above example yourself.

HMAC Calculation - Examples in
Python
In Python we can calculate HMAC codes as follows (using the
 hashlib  and  hmac  libraries):
normalimport hashlib, hmac, binascii
def hmac_sha256(key, msg):
 return hmac.new(key, msg, hashlib.sha256).digest()
key = b"12345"
msg = b"sample message"
print(binascii.hexlify(hmac_sha256(key, msg)))
normal
Run the above code example: https://repl.it/@nakov/HMAC-SHA256-
Examples.
The above code will calculate and print the expected HMAC code (like
in our previous example):
normalee40ca7bc90df844d2f5b5667b27361a2350fad99352d8a6ce061c69e41e5d32
normal
Try the code yourself and play with it.

Exercises: Calculate HMAC
Write a program to calculate HMAC-SHA-384 of given text message
by given key. Write your code in programming language of choice.
Input
Output
Message:
hello
Key:
cryptography
83d1c3d3774d8a32b8ea0460330c16d1b2e3e5c0ea86c
Message:
hello
Key: again
4c549a549aa037e0fb651569bf271faa23cfa20e8a9d214
Hints: follow the Python examples, given earlier in this section or
search in Internet.

Key Derivation Functions (KDF):
Deriving a Key from Password
Now let's explain in details how to securely derive a key from a
password and the most popular key derivation functions (KDFs)
used in practice: PBKDF2, Bcrypt, Scrypt and Argon2.
[TODO: explain the Linux crypt: SHA-512 key derivation]
We shall discuss the strong and weak sides of the above mentioned
KDFs and when to use them.
Key Derivation Functions - Concepts
In cryptography we often use passwords instead of binary keys,
because passwords are easier to remember, to write down and can be
shorter.
When a certain algorithm needs a key (e.g. for encryption or for digital
signing) a key derivation function (password -> key) is needed.
We already noted that using  SHA-256(password)  as key-derivation is
insecure! It is vulnerable to many attacks: brute-forcing, dictionary
attacks, rainbow attacks and others, which may reverse the hash in
practice and attacker can obtain the password.
Cryptographic Key Derivation
Functions
PBKDF2, Bcrypt, Scrypt and Argon2 are significantly stronger key
derivation functions and are designed to survive password guessing

(brute force) attacks.
By design secure key derivation functions use salt (random
number, which is different for each key derivation) + many iterations
(to speed-down eventual password guessing process). This is a
process, known as key stretching.
To calculate a secure KDF it takes some CPU time to derive the key
(e.g. 0.2 sec) + some memory (RAM). Thus deriving the key is
"computationally expensive", so password cracking will also be
computationally expensive.
When a modern KDF function is used with appropriate config
parameters, cracking passwords will be slow (e.g. 5-10 attempts per
second, instead of thousands or millions attempts per second).
All of the above mentioned key-derivation algorithms (PBKDF2, Bcrypt,
Scrypt and Argon2) are not patented and royalty-free for public use.
Let's learn more about these modern KDF.

---

## Sección 12: Core Concepts & Foundations [Entropy: 0.83]

PBKDF2: Derive Key from
Password
PBKDF2 is a simple cryptographic key derivation function, which is
resistant to dictionary attacks and rainbow table attacks. It is based on
iteratively deriving HMAC many times with some padding. The
PBKDF2 algorithm is described in the Internet standard RFC 2898
(PKCS #5).
PBKDF2 takes several input parameters and produces the derived
key as output:
normalkey = pbkdf2(password, salt, iterations-count, hashfunction, derived-key-len)
normal
Technically, the input data for PBKDF2 consists of:
•  password  – array of bytes / string, e.g. "p@$Sw0rD~3" (8-10
chars minimal length is recommended)
•  salt  – securely-generated random bytes, e.g.
"df1f2d3f4d77ac66e9c5a6c3d8f921b6" (minimum 64 bits, 128
bits is recommended)
•  iterations-count , e.g. 1024 iterations
•  hash-function  for calculating HMAC, e.g.  SHA256 
•  derived-key-len  for the output, e.g. 32 bytes (256 bits)
The output data is the derived key of requested length (e.g. 256 bits).
PBKDF2 and Number of Iterations
PBKDF2 allows to configure the number of iterations and thus to

configure the time required to derive the key.
• Slower key derivation means high login time / slower
decryption / etc. and higher resistance to password cracking
attacks.
• Faster key derivation means short login time / faster decryption
/ etc. and lower resistance to password cracking attacks.
• PBKDF2 is not resistant to GPU attacks (parallel password
cracking using video cards) and to ASIC attacks (specialized
password cracking hardware). This is the main motivation
behind more modern KDF functions.
PBKDF2 - Example
Try PBKDF2 key derivation online here: https://asecuritysite.com/
encryption/PBKDF2z.
Try to increase the iterations count to see how this affects the speed
of key derivation.

PBKDF2 Calculation in Python -
Example
Now, we shall write some code in Python to derive a key from a
password using the PBKDF2 algorithm.
Firstly, install the Python package  backports.pbkdf2  using the
command:
normalpip install backports.pbkdf2
normal
Now, write the Python code to calculate PBKDF2:
normalimport os, binascii
from backports.pbkdf2 import pbkdf2_hmac
salt = binascii.unhexlify('aaef2d3f4d77ac66e9c5a6c3d8f921d1')
passwd = "p@$Sw0rD~1".encode("utf8")
key = pbkdf2_hmac("sha256", passwd, salt, 50000, 32)
print("Derived key:", binascii.hexlify(key))
normal
Run the above code example: https://repl.it/@nakov/PBKDF2-in-
Python.
The PBKDF2 calculation function takes several input parameters:
hash function for the HMAC, the password (bytes sequence), the
salt (bytes sequence), iterations count and the output key length
(number of bytes for the derived key).
The output from the above code execution is the following:
normalDerived key:
b'52c5efa16e7022859051b1dec28bc65d9696a3005d0f97e506c42843bc3bdbc0'
normal
Try to change the number of iterations and see whether and how the
execution time changes.

When to Use PBKDF2?
Today PBKDF2 is considered old-fashioned and less secure than
modern KDF functions, so it is recommended to use Bcrypt, Scrypt or
Argon2 instead. We shall explain all these KDF functions in details
later in this section.

Modern KDFs: Bcrypt, Scrypt and
Argon2
PBKDF2 has a major weakness: it is not GPU-resistant and not
ASIC-resistant, because it uses relatively small amount of RAM and
can be efficiently implemented on GPU (graphics cards) or ASIC
(specialized hardware).
Modern key-derivation functions (KDF) like Scrypt and Argon2 are
designed to be resistant to dictionary attacks, GPU attacks and
ASIC attacks. These functions derive a key (of fixed length) from a
password (text) and need a lot memory (RAM), which does not allow
fast parallel computations on GPU or ASIC hardware.
Algorithms like Bcrypt, Scrypt and Argon2 are considered more
secure KDF functions. They use salt + many iterations + a lot of CPU
+ a lot of RAM memory and this makes very hard to design a custom
hardware to significantly speed up password cracking.
It takes a lot of CPU time to derive the key (e.g. 0.2 sec) + a lot of
RAM memory (e.g. 1GB). The calculation process is memorydependent, so the memory access is the bottleneck of the
calculations. Faster RAM access will speed-up the calculations.
When a lot of CPU and RAM is used to derive the key from given
password, cracking passwords is slow and inefficient (e.g. 5-10
attempts / second), even when using very good password cracking
hardware and software. The goal of the modern KDF functions is to
make practically infeasible to perform a brute-force attack to reverse
the password from its hash.
Let's discuss in more details Scrypt, Bcrypt and Argon2.

Scrypt Key Derivation
Scrypt (RFC 7914) is a strong cryptographic key-derivation function
(KDF). It is memory-intensive, designed to prevent GPU, ASIC and
FPGA attacks (highly efficient password cracking hardware).
The Scrypt algorithm takes several input parameters and produces
the derived key as output:
normalkey = Scrypt(password, salt, N, r, p, derived-key-len)
normal
Scrypt Parameters
The Scrypt config parameters are:
•  N  – iterations count (affects memory and CPU usage), e.g.
16384 or 2048
•  r  – block size (affects memory and CPU usage), e.g. 8
•  p  – parallelism factor (threads to run in parallel - affects the
memory, CPU usage), usually 1
•  password – the input password (8-10 chars minimal length is
recommended)
•  salt  – securely-generated random bytes (64 bits minimum,
128 bits recommended)
•  derived-key-length  - how many bytes to generate as output,
e.g. 32 bytes (256 bits)
The memory in Scrypt is accessed in strongly dependent order at
each step, so the memory access speed is the algorithm's bottleneck.
The memory required to compute Scrypt key derivation is calculated
as follows:

normalMemory required = 128 * N * r * p bytes
normal
Example: e.g. 128 * N * r * p = 128 * 16384 * 8 * 1 = 16 MB
(or 128 * N * r * p = 128 * 2048 * 8 * 1 = 2 MB)
Choosing parameters depends on how much you want to wait and
what level of security (password cracking resistance) do you want to
achieve:
• Sample parameters for interactive login: N=16384, r=8, p=1
(RAM = 2 MB). For interactive login you most probably do not
want to wait more than a 0.5 seconds, so the computations
should be very slow. Also at the server side, it is usual that many
users can login in the same time, so slow Scrypt computation
will slow down the entire system.
• Sample parameters for file encryption: N=1048576, r=8, p=1
(RAM = 1 GB). When you encrypt your hard drive, you will
unlock the encrypted data in rare cases, usually not more than
2-3 times per day, so you may want to wait for 2-3 seconds to
increase the security.
You can perform tests and choose the Scrypt parameters yourself
during the design and development of your app or system. Always try
to use the fastest possible implementation of Scrypt for your
language and platform, because crackers will definitely use it. Some
implementations (e.g. in Python) may be 100 times slower than the
fastest ones!
In the MyEtherWallet crypto wallet, the default Scrypt parameters are
N=8192, r=8, p=1. These settings are not strong enough for crypto
wallets, but this is how it works. The solution is to use long and
complex password to avoid password cracking attacks.
Scrypt - Example

---

## Sección 13: Core Concepts & Foundations [Entropy: 0.785]

You can play with Scrypt key derivation online here: https://8gwifi.org/
scrypt.jsp.
Scrypt Calculation in Python - Example
Now, we shall write some code in Python to derive a key from a
password using the Scrypt algorithm.
First, install the Python package  scrypt  using the command:
normalpip install scrypt
normal
Note that the  scrypt  package depends on OpenSSL, so first install it
in its default location (e.g. in  C:\OpenSSL-Win64  in Windows), then
install the scrypt Python package.
Now, after the  scrypt  package is successfully installed, write the
Python code to calculate a Scrypt hash:
(Note, we have chosen smaller number for iterations count. We did
that just to increase the following example execution speed. In
common usage, a higher iterations count is recommended, e.g. 16384

- see above.)
normalimport pyscrypt
salt = b'aa1f2d3f4d23ac44e9c5a6c3d8f9ee8c'
passwd = b'p@$Sw0rD~7'
key = pyscrypt.hash(passwd, salt, 2048, 8, 1, 32)
print("Derived key:", key.hex())
normal
Run the above code example: https://repl.it/@nakov/Scrypt-in-Python.
The Scrypt calculation function takes several input parameters: the
password (bytes sequence), the salt (bytes sequence), iterations
count, block size for each iteration, parallelism factor and the output
key length (number of bytes for the derived key).
The output from the above code execution is the following:
normalDerived key:
b'e813a6f6ccc4e9110193bf9efb7c0a489d76655f9e36629dccbeaf2a73bc0c6f'
normal
Try to change the number of iterations or the block size and see how
they affect the execution time. Have in mind that the above Python
implementation is not very fast. You may find fast Scrypt
implementation in Internet.
Storing Algorithm Settings + Salt +
Hash Together
In many applications, frameworks and tools, Scrypt encrypted
passwords are stored together with the algorithm settings and
salt, into a single string (in certain format), consisting of several parts,
separated by  $  character. For example, the password  p@ss~123  can
be stored in the Scrypt standard format like this (several examples are
given, to make the pattern apparent):

normal16384$8$1$kytG1MHY1KU=$afc338d494dc89be40e317788e3cd9166d066709db0e
16384$8$1$5gFGlElztY0=$560f6229356c281a525fad4e2fc4c209bb55c21dec78938133
32768$8$4$VGhlIHF1aWo=$54d657cec8b3aaca675b407e790bccf1dddb0a23665cd5f994
normal
When to Use Scrypt?
When configured properly Scrypt is considered a highly secure KDF
function, so you can use it as general purpose password to key
derivation algorithm, e.g. when encrypting wallets, files or app
passwords.

Bcrypt Key Derivation
Bcrypt is another cryptographic KDF function, older than Scrypt, and
is less resistant to ASIC and GPU attacks. It provides configurable
iterations count, but uses constant memory, so it is easier to build
hardware-accelerated password crackers.
Bcrypt - Example
You can play with Bcrypt here: https://www.dailycred.com/article/
bcrypt-calculator.
Storing Algorithm Settings + Salt +
Hash Together
In many applications, frameworks and tools (e.g. in the database of
WordPress sites), Bcrypt encrypted passwords are stored together
with the algorithm settings and salt, into a single string (in certain

format), consisting of several parts, separated by  $  character. For
example, the password  p@ss~123  can be stored in the Bcrypt
encrypted format like this (several examples are given, to make the
pattern apparent):
normal$2a$07$wHirdrK4OLB0vk9r3fiseeYjQaCZ0bIeKY9qLsNep/
I2nZAXbOb7m
$2a$12$UqBxs0PN/u106Fio1.FnDOhSRJztLz364AwpGemp1jt8OnJYNsr.e
$2a$12$8Ov4lfmZZbv8O5YKrXXCu.mdH9Dq9r72C5GnhVZbGNsIzTr8dSUfm
normal
When to Use Bcrypt?
When configured properly Bcrypt is considered a secure KDF
function and is widely used in practice. It is considered that Scrypt is
more secure than Bcrypt, so modern applications should prefer
Scrypt (or Argon2) instead of Bcrypt. Still, this recommendation is
disputable, but I personally prefer Argon2.

The Linux crypt() KDF Function
from glibc
... ...
[TODO: write a few words about the crypt() function in Linux]
See https://en.wikipedia.org/wiki/Crypt_(C)
... ...

Argon2: Secure, ASIC-Resistant
KDF
Argon2 is modern ASIC-resistant and GPU-resistant secure key
derivation function. It has better password cracking resistance (when
configured correctly) than PBKDF2, Bcrypt and Scrypt (for similar
configuration parameters for CPU and RAM usage).
Variants of Argon2
The Argon2 function has several variants:
• Argon2d – provides strong GPU resistance, but has potential
side-channel attacks (possible in very special situations).
• Argon2i – provides less GPU resistance, but has no sidechannel attacks.
• Argon2id – recommended (combines the Argon2d and
Argon2i).
Config Parameters of Argon2
Argon2 has the following config parameters, which are very similar to
Scrypt:
• password  P : the password (or message) to be hashed
• salt  S : random-generated salt (16 bytes recommended for
password hashing)
• iterations  t : number of iterations to perform
• memorySizeKB  m : amount of memory (in kilobytes) to use
• parallelism  p : degree of parallelism (i.e. number of threads)

• outputKeyLength  T : desired number of returned bytes
Argon2 - Example
You can play with the Argon2 password to key derivation function
online here: http://antelle.net/argon2-browser.
Argon2 Calculation in Python -
Example
Now, we shall write some code in Python to derive a key from a
password using the Argon2 algorithm.
First, install the Python package  argon2_cffi  using the command:
normalpip install argon2_cffi
normal

Now, write the Python code to calculate Argon2:
normalimport argon2, binascii
hash = argon2.hash_password_raw(
 time_cost=16, memory_cost=2**15, parallelism=2, hash_len=32,
 password=b'password', salt=b'some salt',
type=argon2.low_level.Type.ID)
print("Argon2 raw hash:", binascii.hexlify(hash))
argon2Hasher = argon2.PasswordHasher(
 time_cost=16, memory_cost=2**15, parallelism=2, hash_len=32,
salt_len=16)
hash = argon2Hasher.hash("password")
print("Argon2 hash (random salt):", hash)
verifyValid = argon2Hasher.verify(hash, "password")
print("Argon2 verify (correct password):", verifyValid)
try:
 argon2Hasher.verify(hash, "wrong123")
except:
 print("Argon2 verify (incorrect password):", False)
normal
Run the above code example: https://repl.it/@nakov/Argon2-in-Python.
The above code first derives a "raw hash" (256-bit key), which is
argon2-based key derivation, just like with scrypt. It also derives a
"argon2 hash", which holds the algorithm parameters, along with
random salt and derived key. The later is used for password storing
and verification. Finally, the calculated hashes are tested agains a
correct and wrong password.
The Argon2 calculation takes several input configuration settings:
time_cost (number of iterations), memory_cost (memory to use in
KB), parallelism (how many parallel threads to use), hash_len (the
size of the derived key), salt_len (the size of the random generated
salt, typically 128 bits / 16 bytes).
Sample output from the above code execution:
normalArgon2 raw hash:
b'157f21dd3fdf7bafb76d2923ccaffa0b7be7cbae394709474d2bc66ee7b09d3e'
Argon2 hash (random salt):
$argon2id$v=19$m=32768,t=16,p=2$Rfy6J41W9idBU+n/8sZc6Q$i3QYYPtoogIAw78I2qq

---

## Sección 14: Core Concepts & Foundations [Entropy: 0.74]

Argon2 verify (correct password): True
Argon2 verify (incorrect password): False
normal
Note that the argon2 hash in the above output is written in a
standardized format, which holds the Argon2 algorithm config
parameters + the derived key + the random salt. By design, the salt
and the derived key should be different at each code execution.
Try to execute the above code several times to ensure that the
derived key will be the same (because the salt is fixed) and the
derived argon2 hash will be different at each execution (because a
random salt is generated internally by the algorithm).
Try to change the time_cost or the memory_cost settings and see
how they affect the execution time for the key derivation.
Storing Algorithm Settings + Salt +
Hash Together
In many applications, frameworks and tools, Argon2 encrypted
passwords are stored together with the algorithm settings and
salt, into a single string (in certain format, like it was shown above),
consisting of several parts, separated by  $  character. For example,
the password  p@ss~123  can be stored in the Argon2 standard format
like this (several examples are given, to make the pattern apparent):
normal$argon2d$v=19$m=1024,t=16,p=4$c2FsdDEyM3NhbHQxMjM$2dVtFVPCezhvjtyu2P
+QF4F1o
$argon2d$v=19$m=1024,t=16,p=4$YW5vdGhlcnNhbHRhbm90aGVyc2FsdA$KB7Nj7kK21YdG
I3QcArMhl/Q
$argon2i$v=19$m=8192,t=32,p=1$c21hbGxzYWx0$lmO1aPPy3x0CcvrKpFLi1TL/
uSVJ/eO5hPHiWZFaWvY
normal
All the above hashes hold the same password, but with different
algotihm settings and different salt.

When to Use Argon2?
When configured properly Argon2 is considered a highly secure KDF
function, one of the best available in the industry, so you can use it as
general purpose password to key derivation algorithm, e.g. to when
encrypting wallets, documents, files or app passwords. In the general
case Argon2 is recommended over Scrypt, Bcrypt and PBKDF2.

Secure Password Storage and
Password-Based Authentication
In software development we constantly use password-based user
authentication and we need to store user passwords securely in a
way that users can sign-up, authenticate and change their password,
but in the same time attackers cannot decrypt the stored passwords
back to clear text values, even if they manage to get access to the
database holding the user accounts.
If we develop a Web site or Web app, we typically have admin panel,
accessible after login, based on username + password. It is similar
for mobile apps, web services and other password-protected systems:
all they need secure password storage (secure password
management / strongly encrypted password storage).
Developers often store the user passwords for their sites, apps or
other systems in a database, just like any other user data, but most
systems apply some kind of hashing, encryption or password
authentication scheme. There are many ways to implement the
password storage for password-based authentication. The most
popular of them are given in the table below:
Approach
Security
Comments
Clear-text
passwords
Extremely
low
Never do this:
compromised server will
render all passwords
leaked

Simple
password hash
Low
Vulnerable to dictionary
attacks
Salted hashed
passwords
Average
Vulnerable to GPU-based
and ASIC-based password
cracking
Secure KDF
function (like
Argon2)
High
Recommended, use strong
KDF parameters
Let's review these password storage methods and discuss their
level of security, their strong and weak sides.
Clear-Text Passwords - Never Do Anti-
Pattern
The easiest and most highly insecure method for password storage
and password-based authentication is to use clear-text passwords
written directly in the database.
• In this scenario to check the password, developers just
compare the password for checking with the password from the
database.
• Never do this!!! It is anti-pattern for software development. It is
bad for many reasons.
○ Admins will be able to see user's passwords and this is
really bad, because many users use the same password
for several sites / apps, e.g. the same password for
GMail, Facebook and Twitter.
○ Admins should never know user's passwords, but
should be able to change them in case of emergency.
○ If someone hacks the server and gains access to the

database, he will see all user's passwords in plaintext.
• It is very bad practice to keep plaintext passwords in any
information system / app in the world!
○ Just don't do it!
Simple Password Hash - Highly
Insecure
A relatively easy and relatively insecure method for password
storage and password-based authentication is to use simple
password hash like SHA-256(password), written directly in the
database.
• In this scenario to check the password, developers just
compare the hash(password for checking) with the password
hash from the database.
• Avoid this! It is highly insecure method.
○ Why? Because hashes are vulnerable to dictionary
attacks.
○ Crackers who gain access to the database, can use a
dictionary holding the hashes of the most commonly used
10-20 million passwords and most of the passwords will
be decrypted.
○ The dictionary attack process is extremely fast, because
it compares the hashes from the dictionary with the
password hash (trivial string compare).
○ Search in Internet for free dictionaries / wordlists for
dictionary attack.
• Cracked passwords, revealed as plaintext are a true disaster,
because most users use the same password for several sites
/ apps.

Salted Hashed Passwords - Secure, but
Not Enough
More complicated and relatively secure method for password storage
and password-based authentication is to use salted hashed
passwords, written in the database as pair { salt + hash(password +
salt) }. The hash function can be any strong cryptographic hash like
SHA-256.
• The idea is to keep different random salt, along with different
password hash, changed every time, when the password is
written in the database. Thus the same password is encrypted
every time as different ciphertext { salt + hash }.
• To check the password, developers calculate the
hash(password for checking) using the salt from the database
and compare the calculated hash with the hash from the
database.
• This method works well to prevent dictionary attacks, but does
not prevent GPU-based and ASIC-based brute force password
cracking attacks.
• It has also the same security problems like using hash(key +
msg) instead of HMAC(key, msg), e.g. length-extension attack.
• Basically keeping salted hashed passwords is more secure
than the previous methods, but still avoid it.
○ Use more attack-resistant password hashing function
(which is unlikely to be brute-forced) instead of simple
hash, e.g. Argon2 or Scrypt.
Secure KDF-Based Password Hashing -
Recommended
The most complicated and most secure method for secure password
storage and password-based authentication is to use secure KDF-

---

## Sección 15: Core Concepts & Foundations [Entropy: 0.526]

based password hash, written in the database as pair { salt +
KDF(password, salt) }. The key-derivation function (KDF) should be
strong and secure, e.g. Scrypt or Argon2 with carefully selected
parameters.
• The idea is to keep different random salt for each encrypted
password, along with the key derived by a secure KDF-function,
such as Scrypt or Argon2 (with reasonable number of iterations
and RAM consumption settings).
• To check the password, take the salt from the database and
derive a key from the password for checking, using the same
KDF function and KDF parameters like when the password was
stored in the database. Compare the derived key with the key
from the database.
• This method is resistant to most attacks and is considered as
standard in the software industry.
○ It is as secure as the KDF function with the selected KDF
parameters. For example, Argon2 taking 128 MB RAM, 4
threads and 200 ms computing time) may be appropriate
for the average case.
○ Crackers cannot perform brute force attacks, because
the password guessing will be too slow, even on a modern
computer with good CPU and GPU or even using a
specialized ASIC hardware.
Conclusion: use secure KDF functions like Argon2 and Scrypt to
keep encrypted passwords in the database. Never use plain-text
passwords!
Password-Based Authentication
Using a secure password storage is only one of the components of
the process of secure password-based authentication for Web
apps, mobile apps and Internet services. Systems, that use password-

based-authentication are subject of many attacks:
• Password guessing attack: attacker tries to guess / brute-force
the user's password by attempting many logins in parallel.
○ Solved easily by adding increasing login delay (wait time
before the login is available again) after each wrong login
attempt or even temporary account locking. Delays /
locking should be done by IP address + username, to
avoid login problems for the legitimate users.
○ Secure KDF-based password storage delays the
password guessing process, so it is highly recommended.
○ Using a CAPTCHA after a 2-3 unsuccessful login attempts
provides quite good protection.
• Denial of service attack: attacker may attempt to login too
many times to overload the system or can try to lock some user
account with too many invalid login attempts for the same user.
○ The protection from this attack is similar to the previous
attack: use a CAPTCHA and delay the login process for
certain IP address after each login attempt.
• Intercept and replay attack: attacker may intercept the
authentication communication (to sniff the login / password /
auth ticket / other credentials) and use the intercepted
credentials to login later.
○ Most systems solve this problem by using TLS (encrypted
connection) to securely send the authentication
credentials (password / authentication ticket) to the server.
○ Other solutions include challenge-response based
cryptographic authentication scheme, such as the
scheme used in the Kerberos protocol.
• Man-in-the-middle attack: attacker can intercept and modify
the intercepted traffic between the server and the client to trick
the user to reveal its login credentials.

○ This is solved by using a TLS secure connection with
server certificate, which authenticates the server.
○ In some scenarios (e.g. online banking) clients are also
authenticated by a digital certificate or OTP (one-time
password).
• Compromised server attack: if the authentication server and its
database is compromised (hacked) and all its authentication
data is leaked, the attacker should be unable to reveal user's
plaintext passwords.
○ First, it should be clear that if the authentication server is
compromised, in all cases the attackers will get
unauthorised access, because they will be able to
intercept user's legitimate sessions (their login and
communication after successful login) and use them to
impersonate the user.
○ Using a strongly secure password storage mechanism
mitigates the risk for users' passwords to be revealed as
plaintext. Still, attackers who gain access to the
authentication server may inject password interception
backdoor and steal each user's plaintext credentials
(username + password) during the login.
○ The backdoored server attack can be stopped like this:
the client generates a random number r and sends as
authentication HMAC(password, r); the server compares
the HMAC with its stored password. This process may be
combined with client-side Scrypt or Argon2 computation
and securely stored password at the server side (Scrypt or
Argon2 hashed). In this scenario, unless the client
software is not compromised, attackers who gained
access to the authentication server will not obtain user's
passwords in plaintext.
○ In Web applications, if the server is compromised it can
inject JavaScript code to compromise the client itself. In

desktop and mobiles apps, the client is more safe in case
of compromised server.
Conclusions about how to implement a secure password-based
authentication for Web sites, apps and services:
• Use secure password storage, such as Argon2 hash, with
strong enough configuration settings.
• Keep your authentication server as secure as possible. If it is
compromised, the entire system will be compromised.
• Use TLS or other secure communication channel between the
authentication server and the client.

Exercises: Securely Store
Passwords for User Register /
Login
In this exercise you will design a user authentication system for
modern a Web or mobile app, following the industry's best practices.
Implement user register / login / change password functionality,
using the Argon2 secure password hashing with random salt. Keep
the usernames and their corresponding Argon2 hashed passwords
(along with the Argon2 algorithm parameters and the random salt) as
key-value pairs in the form username:argon2hash, in a simple JSON
document. In the real world you may use a database instead of JSON
document, but let's keep the exercise simple.
...
TODO
...
Implement "Register User"
Input: username + password + JSON holding all current accounts.
Output: modified JSON file or "user exists" exception.
...
TODO
...

---

## Sección 16: Core Concepts & Foundations [Entropy: 0.484]

Implement "User Login"
Input: username + password + JSON holding all current accounts.
Output: correct / incorrect login.
...
TODO
...
Implement "Change Password"
Input: username + old password + new password + JSON holding all
current accounts.
Output: modified JSON file or "user exists" exception.
...
TODO
...
Implement "Reset Password"
Input: username + new password + JSON holding all current accounts.
Output: modified JSON file or "user exists" exception.
...
TODO
...

Secure Random Number
Generators, PRNG and CSPRNG
In cryptography the randomness (entropy) plays very important role.
In many algorithms, we need random (i.e. unpredictable) numbers.
If these numbers are not unpredictable, the algorithms will be
compromised.
For example, assume we need a secret key, that will protect our
financial assets. This secret key should be randomly generated in a
way that nobody else should be able to generate or have the same
key. If we generate the key from a secure random generator, the it
will be unpredictable and the system will be secure. Therefore
"secure random" means simply "unpredictable random".
Let's discuss in bigger detail the random numbers in computer
science and their role in cryptography, as well as pseudo-random
numbers generators (PRNG), secure pseudo-random generators
(CSPRNG) and some guidelines about how developers should
generate and use random numbers in their code.
Random Generators
In computer science random numbers usually come from a pseudorandom number generators (PRNG), initialized by some
unpredictable initial randomness (entropy). In cryptography secure
PRNGs are used, known as CSPRNG, which typically combined
entropy with PRNG and other techniques to make the generated
randomness unpredictable.

Pseudo-Random Number Generators
(PRNG)
A pseudorandom number generator (PRNG) is used to stretch a small
amount of initial randomness into a large amount of
pseudorandomness, typically for use in cryptosystems. Note than
PRNGs are not cryptographically secure and are different from
CSPRNGs.
PRNGs are functions that start from some initial entropy (seed) and
calculate the next random number by some calculation which is
unpredictable without knowing the seed. Such calculations are called
pseudo-random functions.
Pseudo-random functions (which are not secure for cryptography)
usually use an internal state. At the start, the state is initialized by an
initial seed. When the next random number is generated, it is
calculated from the internal state (using some computation or formula),
then the internal state of the pseudo-random function is changed
(using some computation or formula). When the next random number
is generated, it is again calculated based on the internal state of the
function and this state is again changed and so on.
This process in its simplest form can be implemented as follows:
normalinit(entropy):
 state = entropy, counter = 0
netNum():
 state = HMAC(state, ++counter)
 return state
normal
Of course, the HMAC function can be changed by some
cryptographic hash function or another mathematical transformation

like the Mersenne Twister (which is not cryptographically secure), but
the main idea stays the same: pseudo-random generators have
internal state, initialized with some initial randomness and over the
time change their internal state and generate pseudo-random
numbers, based on the current state.
Good random number generators should be fast and should generate
statistical randomness (see the Diehard tests), i.e. all numbers
should have the same chance to be generated over the time. This is
not sufficient cryptography, so CSPRNG have higher requirements.
The above idea to generate random pseudo-numbers based on
HMAC(key + counter), with some complications, is known as the
HMAC_DRGB algorithm, described in the security standard NIST
800-90A.
Initial Entropy (Seed)
To be secure, a PRNG (which is statistically random) should start by a
truly random initial seed, which is absolutely unpredictable. If the
seed is predictable, it will generate predictable sequence of random
numbers and the entire random generation process will be insecure.
That's why having unpredictable randomness at the start (secure seed)
is very important.
How to initialize the pseudo-random generator in a secure way? The
answer is simple: collect randomness (entropy).
Entropy
In computer science "entropy" means unpredictable randomness,
and is usually measured in bits. For example, if you move your
computer's mouse, it will generate some hard-to-predict events, like
the start location and the end location of the mouse cursor. If we

assume that the mouse has changed its position in the range of
[0...255] pixels, the entropy collected from this mouse movement
should be about 8 bits (because 2^8 = 255). Another example: if the
user is asked to think of a number in the range [0...1000], this number
will hold about 9-10 bits of entropy (because 2^10 = 1024). To collect
256 bits of entropy (e.g. to securely generate a 256-bit integer), you
will need to take into account a sequence of several such events (like
mouse movements and keyboard interracions from the user).
Collecting Entropy
Entropy can be collected from many hard-to-predict events in the
computer: keyboard clicks, mouse moves, network activity, camera
activity, microphone activity and others, combined with the time at
which they occur. This collection of initial randomness is usually
performed internally by the operating system (OS), which provides
standard API to access it (e.g. reading from the  /dev/random  file in
Linux). In desktop system, laptop or mobile phone entropy is easy to
collect, while on some limited hardware devices (such as simple
microcontrollers) entropy is hard or impossible to be collected.
Application software can collect entropy explicitly, by asking the
user to move the mouse, type something at the keyboard, say
something at the microphone or move in front of the camera for a
while. A great example of this is the bitaddress.org wallet app, which
combines mouse moves with keyboard events to collect entropy:

---

## Sección 17: Core Concepts & Foundations [Entropy: 0.59]

Once enough entropy is collected, it is used to initialize the random
generator.
Insecure Randomness
Insecure / compromised randomness can compromise cryptography. A
good example to learn from is the story of the stolen Bitcoins, due to
broken random generator in Android: https://goo.gl/PFE1kr. That's
why developers should care about randomness, when they use
cryptography and ensure their random generators are secure.
Insecure Randomness - Examples
As example how easy it is to compromise the random number
security in Python (in its old versions), we shall give this code
example:
normalimport random
print(random.randrange(1000000, 9999999))
normal

Run the above code example: https://repl.it/@nakov/Random-in-
Python.
The above code is assumed to generate a random number, but this
number may be predictable. This is because the  random  library in
Python (in its old versions) initializes the random generator seed by
the current time. Thus, if you know the current time at the machine
generating the random number (obviously you know this roughly), you
will be able to predict the random seed and to predict the random
numbers generated.
To better illustrate this, look at this more explicit example which
generates two random 50-digit integers:
normalimport random, time
random.seed(time.time())
r1 = random.randrange(1e49, 1e50-1)
random.seed(time.time())
r2 = random.randrange(1e49, 1e50-1)
print(r1)
print(r2)
normal
Run the above code example: https://repl.it/@nakov/Random-withseed-in-Python.
The above code will print two equal numbers, both depending on the
current time. It is obvious that the same time in the initial seed causes
the same (predictable) pseudo-random numbers to be generated in the
output. This is a sample output of the above code:
normal53285353661739398833155340591358345604323255820576
53285353661739398833155340591358345604323255820576
normal
If you run this code through a debugger or in a slow environment, the
produced numbers may be different, due to time change between the

two random generation executions. Typically the Python interpreter at
the interactive console produces two different numbers. To obtain
the result, similar to the above, first save the code in a script file (e.g.
 insecure-rnd.py ) and then execute the Python script file:
Basically, when the initial random seed is initialized with a predictable
number like the current time, crackers can try all possibilities within
the range of +/- 5 seconds and find the exact initial seed and then
compromise the security.
Randomness and Cryptography
Remember that cryptography cannot work without unpredictable
randomness! If your random generator is compromised, it will
generate predictable numbers and crackers will be able to decrypt your
communication, reveal your private keys, tamper your digital
signatures, etc. As a developer, you should always care how random
numbers are generated in the cryptographic libraries you use.

CSPRNG (Cryptography Secure
Random Number Generators)
By definition CSPRNG (Cryptography Secure Random Number
Generators) are a pseudo-random number generators (PRNG) with
properties that make them suitable for use in cryptography. There
are two major requirements for a PRNG to be a CSPRNG:
• Satisfy the next-bit test: if someone knows all k bits from the
start of the PRNG, he would be unable to predict the bit k+1
using reasonable computing resources.
• Withstand the state compromise extensions: if an attacker
guesses the internal state of the PRNG or it is revealed
somehow, the attacker should be unable to reconstruct all
previous random numbers prior to the revelation.
The entropy in the operating system is usually of limited amount and
waiting for more entropy is slow and unpractical. Most cryptographic
applications use CSPRNG, which "stretch" the available entropy from
the operating system into more bits, required for cryptographic
purposes and comply to the above CSPRNG requirements.
Many design have been proposed to construct CSPRNG algorithms:
• CSPRNG based on secure block ciphers in counter mode, on
stream ciphers or on secure secure hash functions.
• CSPRNG based on number theory, relying on the difficulty of the
integer factorization problem (IFP), the discrete logarithm
problem (DLP) or the elliptic-curve discrete logarithm problem
(ECDLP).
• CSPRNG based on special design for cryptographic secure
randomness, such as Yarrow algorithm and Fortuna, which were
used in MacOS and and FreeBSD.
Most CSPRNG use a combination of entropy from the operating

system and high-quality PRNG generator and they often "reseed",
which means that when new entropy comes from the OS (e.g. from
user input, system interruptions, disk I/O or hardware random
generators), the underlying PRNG changes its internal state based on
the new entropy bits coming. This constant reseeding over the time
makes the CSPRNG really hard to predict and analyse.
Conclusion: Use Secure Random
Generator
Always use cryptographically secure random generator libraries,
like the  java.security.SecureRandom  in Java and the  secrets  library
in Python:
normalimport secrets
print(secrets.randbelow(int(1e50)))
normal
Run the above code example: https://repl.it/@nakov/Secrets-in-
Python.
The above code does not depend on the current time and basically
generates an unpredictable random number, based on the entropy
collected by the operating system.

Generating Pseudo Random
Numbers - Example in Python
To get a better idea how pseudo-random numbers are generated in
computer programming, let's play with at the following Python code,
which generates 5 pseudo-random numbers in the range [10...20]:
normalimport hashlib, time
startSeed = str(time.time()) + '|'
min = 10
max = 20
for i in range(5):
 nextSeed = startSeed + str(i)
 hash = hashlib.sha256(nextSeed.encode('ascii')).digest()
 bigRand = int.from_bytes(hash, 'big')
 rand = min + bigRand % (max - min + 1)
 print(nextSeed, bigRand, '-->', rand)
normal
Run the above code example: https://repl.it/@nakov/Pseudo-randomnumbers-in-Python.
The above code produces time-depended (predictable) pseudorandom sequence:
normal1539884529.7564313|0
8082194918845916782210362071583779087074453346650611426033530683534165404
--> 20
1539884529.7564313|1
7402547979263040138859051695295565699994201813017831785359249637199466872
--> 12
1539884529.7564313|2
8201769757716120398142994679925023698249998825363319654246597457789363307
--> 18
1539884529.7564313|3
1073869970669956292908344653948673592392757121947479102475670908912239493
--> 13
1539884529.7564313|4
8387463024163019831754947050604300110232551830691259486143383854829311393
--> 10
normal

---

## Sección 18: Core Concepts & Foundations [Entropy: 0.605]

The initial pseudo-random seed is taken from the current time. The
first pseudo-random number in the sequence comes from the
SHA-256 hash of the initial seed + the number  0 , the second
pseudo-random number comes from the hash of the initial seed + the
number  1  and so on. To get an output of certain range [min...max]
the 256-bit hash is divided to (max - min + 1) and min is added to it.
The number  i , together with the value  startSeed  hold the internal
state of the random generator, which changes for each next random
number.
The above pseudo-random generator is based on the random
statistical distribution of the SHA-256 function. It is expected that the
chance for each possible number to be generated is equal.
Creating a Secure Random Generator
The above random generator is not secure, because it is not
initialized by an unpredictable source of entropy. Let's fix this.
We shall initialize the initial randomness based on the keyboard
events. The user will be asked to enter something 5 times and the
exact precise times of the moments of the user input, together with the
data entered from the user will be joined as initial randomness
(seed). The collected text entropy can be shortened through SHA-256
hashing (this will reduce it to 256 bits). After the entropy is collected
and the start seed is calculated, the same logic like at the previous
example will be used to generate 5 random numbers in the range
[10...20]. This is a sample Python implementation:
normalimport hashlib, time, binascii
entropy = ''
for i in range(5):
 s = input("Enter something [" + str(i+1) + " of 5]: ")
 entropy = entropy + s + '|' + str(time.time()) + '|'
print("Entropy:", entropy)
startSeed =
str(binascii.hexlify(hashlib.sha256(entropy.encode('ascii')).digest()))

[2:-1]
print("Start seed = SHA-256(entropy) =", startSeed)
min = 10
max = 20
for i in range(5):
 nextSeed = startSeed + '|' + str(i)
 hash = hashlib.sha256(nextSeed.encode('ascii')).digest()
 bigRand = int.from_bytes(hash, 'big')
 rand = min + bigRand % (max - min + 1)
 print(nextSeed, bigRand, '-->', rand)
normal
Run the above code example: https://repl.it/@nakov/secure-randomgenerator-in-Python.
A sample output from the above code may look like this:
normalEnter something [1 of 5]: first
Enter something [2 of 5]: second
Enter something [3 of 5]: random text
Enter something [4 of 5]: dfasfdasfs
Enter something [5 of 5]: last
Entropy: first|1539885709.4494743|second|1539885713.687703|random
text|1539885721.5754962|dfasfdasfs|1539885724.40904|last|
1539885726.1286101|
Start seed = SHA-256(entropy) =
f8a4eaceb16156b1a23f4b6d08e54665ffa4822949b22e01d6de4c5daae965e3
f8a4eaceb16156b1a23f4b6d08e54665ffa4822949b22e01d6de4c5daae965e3|
8448277025956683909793686622900478655494891390588272414863632598719675426
--> 19
f8a4eaceb16156b1a23f4b6d08e54665ffa4822949b22e01d6de4c5daae965e3|
6700145465903016445734242101167203305246616897655522435270983005053832141
--> 14
f8a4eaceb16156b1a23f4b6d08e54665ffa4822949b22e01d6de4c5daae965e3|
1037391815072910725723150342669401078494721227628768471724545486308860827
--> 12
f8a4eaceb16156b1a23f4b6d08e54665ffa4822949b22e01d6de4c5daae965e3|
3011033199204097839903859902789759740091959530467456042709372597822032778
--> 16
f8a4eaceb16156b1a23f4b6d08e54665ffa4822949b22e01d6de4c5daae965e3|
1004660947249247636598436692566733002073839221296768002176644653415356221
--> 16
normal
Note that the collected entropy is very hard to be predicted. The
cracker should guess all the text entered by the user and also guess

the exact time for each of the 5 inputs. If the above is repeated 20
instead of 5 times, it will be even harder to predict (the collected
entropy will be bigger).
Some cryptographical software use similar techniques like in the above
code example when generating keys, password and randomness as
general and now you know why: to collect entropy in an unpredictable
way.

Secure Random Generators
(CSPRNG)
Cryptography secure pseudo-random number generators (CSPRNG)
are random generators, which guarantee that the random numbers
coming from them are absolutely unpredictable. CSPRNG satisfy the
next-bit test and withstand the state compromise extensions and
are typically part of the operating system or come from secure external
source. Depending on the level of security required, CSPRNG can be
implemented as software components or as hardware devices or as
combination of both.
For example, in the credit card printing centers the formal security
regulations require certified hardware random generators to be used
to generate credit card PIN codes, private keys and other data,
designed to remain private.
Modern operating systems (OS) collect entropy (initial seed) from the
environmental noise: keyboard clicks, mouse moves, network
activity, system I/O interruptions, hard disk activity, etc. Sources of
randomness from the environment in Linux, for example, include interkeyboard timings, inter-interrupt timings from some interrupts, and
other events which are both non-deterministic and hard to measure for
an outside observer.
The collected in the OS randomness is usually accessible from
 /dev/random  and  /dev/urandom .
• Reading from the  /dev/random  file (the limited blocking random
generator) returns entropy from the kernel's entropy pool
(collected noise) and blocks when the entropy pool is empty
until additional environmental noise is gathered.

• Reading the  /dev/urandom  file (the unlimited non-blocking
random generator) returns entropy from the kernel's entropy pool
or a pseudo-random data, generated from previously collected
environmental noise, which is also unpredictable, but is based
on secure entropy "stretching" algorithm.
Usually a CSPRNG should start from an unpredictable random seed
from the operating system, from a specialized hardware or from
external source. Random numbers after the seed initialization are
typically produces by a pseudo-random computation, but this does
not compromise the security. Most algorithms often "reseed" the
CSPRNG random generator when a new entropy comes, to make their
work even more unpredictable.
Typically modern OS CSPRNG APIs combine the constantly collected
entropy from the environment with the internal state of their built-in
pseudo-random algorithm with continuous reseeding to guarantee
maximal unpredictability of the generated randomness with high
speed and non-blocking behavior in the same time.
Hardware Random Generators (TRNG)
Hardware random generators, known as true random number
generators (TRNG), typically capture physical processes or
phenomenа, such as the visible spectrum of the light, the thermal
noise from the environment, the atmosphere noise, etc. The
randomness from the physical environment is collected through
specialized sensors, then amplified and processed by the device and
finally transmitted to the computer through USB, PCI Express or other
standard interface.
Modern microprocessors (CPU) provide a built-in hardware random
generator, accessible through a special CPU instruction  RdRand ,
which return a random integer into one of the CPU registers.

---

## Sección 19: Core Concepts & Foundations [Entropy: 0.508]

Most cryptographic applications today do not require a hardware
random generator, because the entropy in the operating system is
secure enough for general cryptographic purposes. Using a TRNG is
needed for systems with higher security requirements, such as
banking and finance applications, certification authorities and high
volume payment processors.
How as a Developer to Access the
CSPRNG?
Typically developers access the cryptographically strong random
number generators (CSPRNG) for their OS from a cryptography
library for their language and platform.
• In Linux and macOS, it is considered that both  /dev/random 
and  /dev/urandom  sources of randomness are secure enough
for most cryptographic purposes and most cryptographic
libraries access them internally.
• In Windows, random numbers for cryptographic purposes can
be securely generated using the  BCryptGenRandom  function from
the Cryptography API: Next Generation (CNG) or higher level
crypto libraries.
• In C# use
 System.Security.Cryptography.RandomNumberGenerator.Create() 
from .NET Framework or .NET Core.
• In Python use  os.urandom()  or the  secrets  library.
• In Java use the  java.security.SecureRandom  system class.
• In JavaScript use  window.crypto.getRandomValues(Uint8Array) 
for client side (in the Web browser) or  crypto.randomBytes()  or
external module like  node-sodium  for server-side (in Node.js).

Never use  Math.random()  or similar insecure RNG functions for
cryptographic purposes!

Exercises: Implement a Pseudo-
Random Generator
Write a code to generate 30 pseudo-random integers in the range
[1...10], starting from certain entropy, taken as input, using HMAC
key derivation.
From the entropy generate a seed (256-bit binary sequence) using
SHA-256:
normalseed = SHA256(entropy)
normal
Generate the n-th random number by the formula:
normal1 + HMAC-SHA256(n, seed) % 10
normal
Print the numbers at the output, separated by space.
Sample input and corresponding output:
Input
Output
hello
8 4 10 5 5 3 5 7 10 6 4 9 2 3 2 8 3 3 10 6 8 10 9
10 1 3 6 4 4 10
random
text
10 5 5 9 7 4 2 9 2 1 10 4 8 9 8 1 8 6 5 7 5 4 3 4
6 6 9 8 1 1
fun
6 5 9 2 2 5 1 6 10 10 10 1 8 10 6 9 2 1 5 10 1 4
8 5 6 3 8 4 2 1

Key Exchange / Key Establishment
Schemes
In cryptography key establishment (key exchange, key negotiation)
is a process or protocol, whereby a shared secret becomes available
to two parties, for subsequent cryptographic use, typically for
encrypted communication. Establishment techniques can be key
agreement or key transport schemes.
• In a key agreement scheme both parties contribute to the
negotiation of the shared secret. Examples of key agreement
schemes are Diffie-Hellman (DHKE) and Elliptic-Curve Diffie-
Hellman (ECDH).
• In a key transport scheme only one of the parties contributes to
the shared secret and the other party obtains the secret from it.
Key transport schemes are typically implemented through
public-key cryptography, e.g. in the RSA key exchange the
client encrypts a random session key by its private key and
sends it to the server, where it is decrypted using the client's
public key.
By design key exchange schemes securely exchange cryptographic
keys between two parties, in a way that noone else can obtain a copy
of the keys. Typically, at the start of an encrypted conversation (e.g.
during the TLS handshake phase), the parties first negotiate about the
encryption keys (the shared secret) to be used during the
conversation. Key exchange schemes are really important topic in
the modern cryptography, because keys are exchanged hundreds of
times by million devices and servers in Internet.
A key negotiation (key establishment) scheme is executed every

time when a laptop connects to the Wi-Fi network or a Web browser
opens a Web site through the  https://  protocol. The key negotiation
can be based on a annonymous key-exchange protocol (like DHKE), a
password or pre-shared key (PSK), a digital certificate or a
combination of many elements together. Some communication
protocols establish a shared secret key once only, while others
constantly change the secret key over the time.
Authenticated Key Exchange (AKE) is the exchange of session key
in a key exchange protocol which also authenticates the identities of
the involved parties (e.g. through a password, public key or digital
certificate). For example, if you connect to a password-protected WiFi
network, an authenticated key agreement protocol is used, in most
cases password-authenticated key agreement (PAKE). If you
connect to a public WiFi network, anonymous key agreement is
conducted.
Key Exchange / Key Agreement
Algorithms
Many cryptographic algorithms exist for key exchange and key
establishment. Some use public-key cryptosystems, others use simple
key-exchange schemes (like the Diffie–Hellman Key Exchange), some
involve server authentication, some involve client authentication, some
use passwords, some use digital certificates or other authentication
mechanisms.
Examples of key exchange schemes are: Diffie–Hellman key
exchange (DHКЕ) and Elliptic-curve Diffie–Hellman (ECDH), RSA-
OAEP and RSA-KEM (RSA key transport), PSK (pre-shared key),
SRP (Secure Remote Password protocol), FHMQV (Fully Hashed
Menezes-Qu-Vanstone), ECMQV (Ellictic-Curve Menezes-Qu-
Vanstone) and CECPQ1 (quantum-safe key agreement).

Let's start from the classical Diffie–Hellman Key Exchange (DHКЕ)
scheme, which was one of the first public key protocols.

Diffie–Hellman Key Exchange
(DHKE)
Diffie–Hellman Key Exchange (DHKE) is a cryptographic method to
securely exchange cryptographic keys (key agreement protocol)
over a public (insecure) channel in a way that overheard
communication does not reveal the keys. The exchanged keys are
used later for encrypted communication (e.g. using a symmetric cipher
like AES).
DHKE was one of the first public-key protocols, which allows two
parties to exchange data securely, so that is someone sniffs the
communication between the parties, the information exchanged can be
revealed.
The Diffie–Hellman (DH) method is anonymous key agreement
scheme: it allows two parties that have no prior knowledge of each
other to jointly establish a shared secret key over an insecure
channel.
Note that the DHKE method is resistant to sniffing attacks (data
interception), but it is vulnerable to man-in-the-middle attacks
(attacker secretly relays and possibly alters the communication
between two parties).
The Diffie–Hellman Key Exchange protocol can be implemented
using discrete logarithms (the classical DHKE algorithm) or using
elliptic-curve cryptography (the ECDH algorithm).
Key Exchange by Mixing Colors

---

## Sección 20: Core Concepts & Foundations [Entropy: 0.77]

The Diffie–Hellman Key Exchange protocol is very similar to the
concept of "key exchanging by mixing colors", which has a good
visual representation, which simplifies its understanding. This is why
we shall first explain how to exchange a secret color by color mixing.
The design of color mixing key exchange scheme assumes that if we
have two liquids of different colors, we can easily mix the colors and
obtain a new color, but the reverse operation is almost impossible: no
way to separate the mixed colors back to their original color
components.
This is the color exchange scenario, step by step:
• Alice and Bob, agree on an arbitrary starting (shared) color
that does not need to be kept secret (e.g. yellow).
• Alice and Bob separately select a secret color that they keep
to themselves (e.g. red and sea green).
• Finally Alice and Bob mix their secret color together with their
mutually shared color. The obtained mixed colors area ready for
public exchange (in our case orange and light sky blue).

The next steps in the color exchanging scenario are as follows:
• Alice and Bob publicly exchange their two mixed colors.
○ We assume that there is no efficient way to extract
(separate) the secret color from the mixed color, so third
parties who know the mixed colors cannot reveal the
secret colors.
• Finally, Alice and Bob mix together the color they received from
the partner with their own secret color.
○ The result is the final color mixture (yellow-brown) which
is identical to the partner's color mixture.

○ It is the securely exchanged shared key.
If a third parties have intercepted the color exchanging process, it
would be computationally difficult for them to determine the secret
colors.
The Diffie-Hellman Key Exchange protocol is based on similar
concept, but uses discrete logarithms and modular

exponentiations instead of color mixing.
The Diffie-Hellman Key Exchange
(DHKE) Protocol
Now, let's explain how the DHKE protocol works.
The Math behind DHKE
DHKE is based on a simple property of modular exponentiations:
(ga)b mod p = (gb)a mod p
where g, a, b and p are positive integers.
If we have A = ga mod p and B = gb mod p, we can calculate gab
mod p, without revealing a or b (which are called secret exponents).
In computing theory, these is no efficient algorithm which can find a
secret exponent. If we have m, g and p from the below equation:
m = gs mod p
there is no efficient (fast) algorithm to find the secret exponent s. This
is known as the Discrete Logartihm Problem (DLP).
Discrete Logarithm Problem (DLP)
The Discrete Logarithm Problem (DLP) in computer science is
defined as follows:
• By given element b and value a = bx find the exponent x (if it
exists)
The exponent x is called discrete logarithm, i.e. x = logb(a). The

elements a and b can be simple integers modulo p (from the group ℤ/
pℤ) or elements of finite cyclic multiplicative group G (modulo p),
where p is typically a prime number.
In cryptography, many algorithms rely on the computational difficulty
of the DLP problem over carefully chosen group, for which no
efficient algorithm exists.
The DHKE Protocol
Now, after we are familiar with the above mathematical properties of
the modular exponentiations, we are ready to explain the DHKE
protocol. This is how it works:
Let's explain each step of this key-exchange process:
• Alice and Bob agree to use two public integers: modulus p and
base g (where p is prime, and g is a primitive root modulo p).
○ For example, let p = 23 and g = 5.
○ The integers g and p are public, typically hard-coded
constants in the source code.
• Alice chooses a secret integer a (e.g. a = 4), then calculates

and sends to Bob the number A = ga mod p.
○ The number A is public. It is sent over the public channel
and its interception cannot reveal the secret exponent a.
○ In our case we have: A = 54 mod 23 = 4.
• Bob chooses a secret integer b (e.g. b = 3), then calculates and
sends to Alice the number B = gb mod p.
○ In our case we have: B = 53 mod 23 = 10
• Alice computes s = Ba mod p
○ In our example: s = 104 mod 23 = 18
• Bob computes s = Ab mod p
○ In our example: s = 43 mod 23 = 18
• Alice and Bob now share a secret number s
○ s = Ab mod p = Ba mod p = (ga)b mod p = (gb)a mod p =
gab mod p = 18
○ The shared secret key s cannot be computed from the
publicly available numbers A and B, because the secret
exponents a and b cannot be efficiently calculated.
In the most common implementation of DHKE (following the RFC
3526) the base is g = 2 and the modulus p is a large prime number
(1536 ... 8192 bits).
Security of the DHKE Protocol
The DHKE protocol is based on the practical difficulty of the Diffie–
Hellman problem, which is a variant of the well known in the computer
science DLP (discrete logarithm problem), for which no efficient
algorithm still exists.
DHKE exchanges a non-secret sequence of integer numbers over
insecure, public (sniffable) channel (such as signal going through a

cable or propagated by waves in the air), but does not reveal the
secretly-exchanged shared private key.
Again, be warned that DHKE protocol in its classical form is
vulnerable to man-in-the-middle attacks, where a hacker can
intercept and modify the messages exchanged between the parties.
Finally, note that the integers g, p, a and p are typically very big
numbers (1024, 2048 or 4096 bits or even bigger) and this makes the
brute-force attacks non-sense.
DHKE - Live Example
As live example, you can play with this online DHKE tool: http://
www.irongeek.com/diffie-hellman.php
ECDH - Elliptic Curves-based Diffie-
Hellman Key Exchange Protocol

The Elliptic-Curve Diffie–Hellman (ECDH) is an anonymous key
agreement protocol that allows two parties, each having an ellipticcurve public–private key pair, to establish a shared secret over an
insecure channel.
ECDH is a variant of the classical DHKE protocol, where the modular
exponentiation calculations are replaced with elliptic-curve
calculations for improved security. We shall explain in details the
elliptic-curve cryptography (ECC) section later.

---

## Sección 21: Core Concepts & Foundations [Entropy: 0.5]

Diffie–Hellman Key Exchange -
Examples in Python
Let's give a simple code example in Python to demonstrate the
classical Diffie–Hellman Key Exchange (DHKE) algorithm.
First, install the Python package  PyDHE :
normalpip install pyDHE
normal
Next, write the code for the DHKE example:
normalimport pyDHE
alice = pyDHE.new()
alicePubKey = alice.getPublicKey()
print("Alice public key:", hex(alicePubKey))
bob = pyDHE.new()
bobPubKey = bob.getPublicKey()
print("Bob public key:", hex(bobPubKey))
print("Now exchange the public keys (e.g. through Internet)")
aliceSharedKey = alice.update(bobPubKey)
print("Alice shared key:", hex(aliceSharedKey))
bobSharedKey = bob.update(alicePubKey)
print("Bob shared key:", hex(bobSharedKey))
print("Equal shared keys:", aliceSharedKey == bobSharedKey)
normal
Run the above code example: https://repl.it/@nakov/Diffie-Hellman-
Key-Exchange-in-Python.
When you run the above code, it will generate and print two 2048-bit
public keys (for Alice and for Bob). Assume that Allice and Bob have
exchanged their public keys (e.g. send them to each other through

Internet). Once Alice has received Bob's public key, she can calculate
the shared secret by combining it to her private key. Respectively,
once Bob has received Alice's public key, he can calculate the
shared secret by combining it to his private key. The sample output
from the above example shows that the shared secret is always the
same number (2048-bit integer):
normalAlice public key:
0xa26c2f1354a8f58abbf78172730595c4de8277962ebe92100793f99ea80f66abe5e75a1
Bob public key:
0x822660dfff1af80c237402263dda9e0e417fa04547a4e36041a35a152df28b0ac66b059d
Now exchange the public keys (e.g. through Internet)
Alice shared key:
0x60d96187ae1db8e8acac7795837a2964e4972ebf666eaecfa09135371a2de5287db18c1a
Bob shared key:
0x60d96187ae1db8e8acac7795837a2964e4972ebf666eaecfa09135371a2de5287db18c1a
Equal shared keys: True
normal
Note that your output will be different due to the randomness during
the key generation process. The above code uses a 2048-bit public
and private keys, as specified in the RFC 3526 (group 14). You can
change the DHKE key size (from 1536-bits to 8192-bits) by specifying
a different RFC 3526 group (e.g. 18 for 8192-bit keys). For example
change these two lines:
normalalice = pyDHE.new(group=18)
bob = pyDHE.new(group=18)
normal
Run the above code example: https://repl.it/@nakov/DHKE-Examplein-Python.
The above changes will switch to 8192-bit keys and will significantly
slow-down the calculations. The output will look like this:
normalAlice public key:
0x86b2c2bda3982af803084b65d982c08f3462046d154c9ee6fb7c8dcdd4a2922b72487c4
Bob public key:
0xbae8a1e6b00ee2df7996323f2d03dd650dcc19e5f2de8c77b4dcd0c611ab50e1bdd41c5d
Now exchange the public keys (e.g. through Internet)
Alice shared key:

0x964d9b37aa16599c0ce2442f887302555e91d4adb3ae42518a573d149bbdbf31d716e10
Bob shared key:
0x964d9b37aa16599c0ce2442f887302555e91d4adb3ae42518a573d149bbdbf31d716e10
Equal shared keys: True
normal
Enjoy to modify and experiment with the above code to learn the
DHKE protocol.

Exercises: DHKE Key Exchange
...
TODO
...

Symmetric and Asymmetric
Encryption - Overview
In cryptography two major types of encryption schemes are widely
used: symmetric encryption (where a single secret key is used to
encrypt and decrypt data) and asymmetric encryption (where a
public key cryptosystem is used and encryption and decryption is done
using a pair of public and corresponding private key). Let's explain
these fundamental crypto-concepts in details.
Symmetric Encryption - Concepts and
Algorithms
Symmetric encryption schemes use the same symmetric key (or
password) to encrypt data and decrypt the encrypted data back to its
original form:

Symmetric encryption usually combines several crypto algorithms into
an symmetric encryption scheme, e.g. AES-256-CTR-HMAC-
SHA256. The encryption scheme (cipher construction) may include:
password to key derivation algorithm (with certain parameters) +
symmetric cipher algorithm (with certain parameters) + cipher block
mode algorithm + message authentication (MAC) algorithm. This
means that the above shown diagram is simplified and does not
fully represent the process.
Secret Keys
The secret key used to cipher (encrypt) and decipher (decrypt) data
is typically of size 128, 192 or 256 bits and is sometimes referred as
"encryption key" or "shared key", because both sending and
receiving parties should know it.
Most applications use a password-to-key-derivation scheme to
extract a secret key from certain password, because users tend to
remember passwords easier than binary data. Additionally, message
authentication is often incorporated along with the encryption to
provide integrity and authenticity (this encryption approach is known
as "authenticated encryption").
How does a private key look like? Let's start from a simple example of
256-bit secret key, encoded as hex string:
normal02c324648931b89e3e8a0fc42c96e8e3be2e42812986573a40d46563bceaf75110
normal
In many systems (e.g. public blockchains, PGP, OpenSSL and others)
secret keys are encoded as base58 or base64 for shorter string
representation.
For example, the above key looks like this in base58:
normalpbPRqYDxnKZfs8j4KKiqYmx6nzipAjTJf1oCD1WKgy99

normal
The same key looks like this in base64:
normalAsMkZIkxuJ4+ig/ELJbo474uQoEphlc6QNRlY7zq91EQ
normal
In decimal system, the above key is the following integer number:
normal3198494843160849806619942137163064159898976001644229127282984593494
normal
Modern Symmetric Encryption Algorithms
Widely used in modern cryptography symmetric encryption
algorithms (ciphers) are: AES (AES-128, AES-192, AES-256),
ChaCha20, Twofish, IDEA, Serpent, Camelia and others. Most of
them are block ciphers (encrypt data by blocks of fixed size, e.g. 128
bits), while others are stream ciphers (encrypt data byte by byte as a
stream). Block ciphers can be turned into stream ciphers by using a
technique called "cipher block mode".
We shall give more details and code examples using the AES and
ChaCha20 algorithms a bit later.
Symmetric Encryption - Online Demo
In order to better understand the idea behind the symmetric
encryption, you can play with some online symmetric encryption
tool to encrypt and decrypt a sample message by sample secret key
(or password). You can play a bit with this site: https://
aesencryption.net.

---

## Sección 22: Core Concepts & Foundations [Entropy: 0.346]

It demonstrates how we can encrypt and decrypt messages, using the
AES cipher (with certain settings, more precisely AES-128-CBC) and
certain password-to-key-derivation function. In the above example if
we encrypt the text "secret msg" by the password "p@ss", we will get
the base64-encoded binary data "jVJwOBmH+qMqHdg22KwMyg=="
as output. After decryption with the same secret key we get back the
original text "secret msg".
Note that the above encrypted text is dependent to many algorithm
parameters and settings, so if you encrypt the same at another "AES
live example" Web site, the result most likely will be different.
Also note that the above mentioned Web site uses bad practices, old
algorithms and weak cipher settings, so don't follow the code examples
there.
Public Key Cryptography - Concepts
Before introducing the asymmetric key encryption schemes and
algorithms, we should first understand the concept of public key
cryptography (asymmetric cryptography).
The public key cryptography uses a different key to encrypt and
decrypt data (or to sign and verify messages). Keys always come as
public + private key pairs. Asymmetric cryptography deals with
encrypting and decrypting messages using a public / private key,
signing messages, verifying signatures and securely exchanging

keys.
Popular public-key cryptosystems (asymmetric crypto algorithms)
like RSA (Rivest–Shamir–Adleman), ECC (elliptic curve cryptography),
Diffie-Hellman, ECDH, ECDSA and EdDSA, are widely used in the
modern cryptography and we shall demonstrate most of them in
practice with code examples.
Public Key Encryption / Decryption
Asymmetric encryption schemes use a pair of cryptographically
related public and private keys to encrypt the data (by the public
key) and decrypt the encrypted data back to its original forms (by the
private key). Data encrypted by a public key is decrypted by the
corresponding private key:
The encrypted data, obtained as result of encryption is called
"ciphertext". The ciphertext is a binary sequence, unreadable by
humans and by design cannot be decrypted without the decryption
key.

Note that the above shown diagram is highly simplified and does
not fully represent the asymmetric encryption / decryption process.
Typically, public-key cryptosystems can encrypt messages of limited
length only and are slower than symmetric ciphers. For encrypting
longer messages (e.g. PDF documents) usually a public-key
encryption scheme (also known as hybrid encryption scheme) is
used, which combines symmetric and asymmetric encryption like
this:
• For the encryption a random symmetric key  sk  is generated,
the message is symmetrically encrypted by  sk , then  sk  is
asymmetrically encrypted using the recipient's public key.
• For decryption, first the  sk  key is asymmetrically decrypted
using the recipient's private key, then the ciphertext is decrypted
symmetrically using  sk .
The above process is known as key encapsulation mechanism
(KEM): encapsulate an asymmetrically-encrypted random (ephemeral)
symmetric key and use symmetric algorithm for the data encryption.
Public key encryption can work also in the opposite scenario: encrypt
data by a private key and decrypt it by the public key. Thus
someone can prove that he is owner of certain private key, while

revealing only its corresponding public key. This approach is used by
some digital signature schemes.
Signatures: Asymmetric Signing / Verification
In the context of digital signatures, a message signed by a private
key (digital signature) is later verified by the corresponding public
key.
Digital signatures will be explained in more details later, but in short:
a message can be signed by certain private key and the obtained
signature can be later verified by the corresponding public key. A
signed message cannot be altered after signing. A message
signature proves that certain message (e.g. blockchain transaction) is
created by the owner of certain public key. Digital signatures provide
message authentication, message integrity and non-repudiation.
Digital signatures are widely used in the finance industry for
authorizing payments. In operating systems OS components and
device drivers are usually digitally signed to avoid injecting insecure
code, trojans or viruses in the OS. In blockchain systems,
transactions are typically signed by the owner of certain blockchain
address (which corresponds to certain public key and has

corresponding private key). So a signed blockchain transaction
holds a proof of authorship: it is guaranteed mathematically that the
signature is created by the holder of certain blockchain address and
the transaction was not modified after the signing. This works perfectly
for the scenario of digital payments and digital signing of documents
and contracts.
Key Pairs
The public key cryptography uses a pair of keys: public key +
private key. These keys are mathematically connected and are used
together as pair.
In some public key cryptosystems (like the Elliptic-Curve Cryptography
- ECC), the public key can be calculated from the private key. In other
cryptosystems (like RSA), the public key and the private key are
generated together but cannot be directly calculated from each other.
Usually, a public / private key pair is randomly generated in a secure
environment (e.g. in a hardware wallet) and the public key is revealed,
while the private key is securely stored in a crypto-wallet and is
protected by a password or by multi-factor authentication.
Example of 256-bit private key and its corresponding 256-bit public
key (based on secp256k1 curve):
normalprivKey:
648fc1fa828c7f185d825c04a5b21af9e473b867eeee1acea4dbab938433e158
pubKey:
02c324648931b89e3e8a0fc42c96e8e3be2e42812986573a40d46563bceaf75110
normal
Private Keys
Message encryption and signing is done by a private key. The
private keys are always kept secret by their owner, just like

passwords. In the server infrastructure, private key usually stay in an
encrypted and protected keystore. In the blockchain systems the
private keys usually stay in specific software or hardware apps or
devices called "crypto wallets", which store securely a set of private
keys.
Example of 256-bit private key:
normal648fc1fa828c7f185d825c04a5b21af9e473b867eeee1acea4dbab938433e158
normal
Public Keys
Message decryption and signature verification is done by the
public key. Public keys are by design public information (not a secret).
It is mathematically infeasible to calculate the private key from its
corresponding public key.
In many systems the public key is encapsulated in a digital
certificate, which binds certain identity (e.g. person or Internet domain
name) to certain public key. In blockchain systems public keys are
usually published as parts of the blockchain transactions to help
identify who has signed each transaction. In systems like PGP and
SSH the public key is downloaded from the server once (after manual
user verification) and is remembered for further use.
Example of 256-bit public key:
normal02c324648931b89e3e8a0fc42c96e8e3be2e42812986573a40d46563bceaf75110
normal
In most blockchain systems the blockchain address is derived from
the public key (by hashing and other transformations), so if you have
someone's public key, you are assumed to have his blockchain
address as well.

---

## Sección 23: Core Concepts & Foundations [Entropy: 0.364]

A certain public key can be connected to certain person or
organization or is used anonymously. You can never know who is the
owner of the private key, corresponding to certain public key, unless
you have additional proof, e.g. a digital certificate.
Popular Public Key Cryptosystems
Public key cryptosystems provide mathematical framework and
algorithms to generate public + private key pairs, to sign, verify,
encrypt and decrypt messages and exchange keys, in a
cryptographically secure way.
Well-known public-key cryptosystems are: RSA, ECC and ElGamal.
Many crypto algorithms are based on the primitives from these
cryptosystems like RSA sign, RSA encrypt / decrypt, ECDH key
exchange and ECDSA and EdDSA signatures.
The RSA Cryptosystem
The RSA public-key cryptosystem is based on the math of modular
exponentiations (numbers raised to a power by modulus) and some
additional assumptions, together with the computational difficulty of the
integer factorization problem. We shall discuss it later in details,
along with examples.
The ECC Cryptosystem
The elliptic-curve cryptography (ECC) public-key cryptosystem is
based on the math of the on the algebraic structure of the elliptic
curves over finite fields and the difficulty of the elliptic curve discrete
logarithm problem (ECDLP). The ECC usually comes together with
the ECDSA algorithm (elliptic-curve digital signature algorithm). We
shall discuss ECC and ECDSA in details, along with examples.

ECC is Recommended in the General Case
ECC uses smaller keys, ciphertexts and signatures than RSA and is
recommended for most applications. It is mathematically proven that a
3072-bit RSA key has similar cryptographic strength to a 256-bit ECC
key. Key generation is in ECC is significantly faster than with RSA.
Due to the above reasons most blockchain networks (like Bitcoin and
Ethereum) use elliptic-curve-based cryptography (ECC) to secure the
transactions.
Note that both RSA and ECC cryptosystems are not quantum-safe,
which means that if someone has enough powerful quantum computer,
he will be able to derive the private key from given public key in just
few seconds.
Asymmetric Encryption in Practice
Asymmetric encryption works for small messages only (limited by
the public / private key length). To encrypt larger messages key
encapsulation mechanisms or other techniques can be used, which
encrypt asymmetrically a random secret key, then use it to
symmetrically encrypt the larger messages. In practice, modern
asymmetric encryption schemes involve using a symmetric
encryption algorithm together with a public-key cryptosystem, key
encapsulation and message authentication.
Popular asymmetric encryption schemes are: RSA-OAEP (based
on RSA and OAEP padding), RSAES-PKCS1-v1_5 (based on RSA
and PKCS#1 v1.5 padding), DLIES (based on discrete logarithms and
symmetric encryption) and ECIES (based on elliptic curve
cryptography and symmetric encryption).
Asymmetric Encryption - Online Demo

In order to better understand the idea behind the asymmetric
encryption, you can play with some online public key encryption tool
to encrypt / decrypt a sample message by sample RSA private / public
key. You can play a bit with this site: http://travistidwell.com/jsencrypt/
demo/.
In the above online demo you can generate RSA public / private key
pairs and encrypt / decrypt text messages. Note that the message
size is limited by the key length, so you can't encrypt long text. You
will get an error if you try. Internally, the above Web site uses the
RSAES-PKCS1-v1_5 public key encryption scheme as specified in
RFC3447.
We shall discuss the RSA and ECC cryptosystems in details in the
next few chapters. Now, it is important to learn that symmetric and
asymmetric cryptosystems work differently and are used in
different scenarios.

Symmetric Key Ciphers - Overview
Symmetric key ciphers (like AES, ChaCha20, RC6, Twofish, CAST
and many others) use the same key (or password) to encrypt and
decrypt data. They are often used in combination with other
algorithms into a symmetric encryption schemes (like ChaCha20-
Poly1305 and AES-128-GCM and AES-256-CTR-HMAC-SHA256),
often with password to key derivation algorithms (like Scrypt and
Argon2). Symmetric key ciphers are quantum-resistant, which
means that powerful quantum computers will not be able to break their
security (when big enough key lengths are used). Symmetric ciphers
can encrypt data coming as blocks of fixed size (block ciphers) or
data coming as a sequence of bytes (stream ciphers). Block ciphers
can be transformed to stream ciphers by certain constructions, known
as "block cipher modes of operation".
Symmetric Encryption / Decryption
Symmetric encryption and decryption uses a secret key or
passphrase (to derive the key from it). The secret key used to encrypt
and decrypt the data is usually 128 bits or 256 bits and is called
"encryption key". Sometimes it is given as hex or base64-encoded
integer number or is derived through a password-to-key derivation
scheme.
When the input data is encrypted, it is transformed to encrypted
ciphertext and when the ciphertext is decrypted, it is transformed back
to the original input data.

Symmetric Encryption Uses a Set of
Algorithms
It is important to know as a concept that symmetric-key encryption
algorithms usually do not work standalone. They work together with
other related crypto algorithms, into a symmetric encryption scheme
/ symmetric encryption construction.
In most encryption schemes an encryption is combined with
password to key derivation algorithm and message authentication
scheme (see authenticated encryption). Typically a symmetric
encryption procedure uses a sequence of steps, involving different
crypto algorithms:
• Password-to-key derivation algorithm (like Scrypt or Argon2):
to allow using a password instead of a key and to make
password cracking hard and slow to be performed.
• Block to stream cipher transformation algorithm (block cipher
mode like CBC or CTR) + message padding algorithm like
PKCS7 (in some modes): to allow encrypting data of arbitrary
size using a block cipher algorithm (like AES).
• Block cipher algorithm (like AES): to securely encrypt data
blocks of fixed length using a secret key.
• Message authentication algorithm (like HMAC): to check

---

## Sección 24: Core Concepts & Foundations [Entropy: 0.4]

whether after decryption the obtained result matches the original
message before the encryption.
Later in this section we shall give more details and examples about
how to configure and use symmetric block ciphers (like AES) along
with the all above described algorithms to securely encrypt and decrypt
messages of arbitrary size.

Block Ciphers, Stream Ciphers,
Block Modes and Padding
In cryptography block ciphers (like AES) are designed to encrypt a
block of data of fixed size (e.g. 128 bits). The size of the input block is
usually the same as the size of the encrypted output block, while the
key length may be different.
Stream ciphers are more flexible: they are designed to encrypt data
of arbitrary size (e.g. a PDF document), that may sometimes come as
a stream (sequence of bytes or frames, e.g. video streaming).
Most of the popular symmetric key encryption algorithms are block
ciphers, but cryptographers have proposed several schemes to
transform a block cipher into a stream cipher and encrypt data of
arbitrary size. These schemes are known as "block cipher modes of
operation" and are applicable for most block ciphers like AES, RC6,
Camellia, Serpent and many others.
When a symmetric cipher is combined with block mode of
operation, the obtained cipher construction is denoted by the names
of the cipher and the block mode and the key size. Examples:
• AES-256-GCM - the AES cipher with a 256-bit encryption key
and GCM block mode
• AES-128-CTR - the AES cipher with a 128-bit encryption key
and CTR block mode
• Serpent-128-CBC - the Serpent cipher with 128-bit encryption
key and CBC block mode
Block Cipher Modes (CBC, CTR, GCM,

...)
The main idea behind the block cipher modes (like CBC, CFB, OFB,
CTR, EAX, CCM and GCM) is to repeatedly apply a cipher's singleblock encryption / decryption to securely encrypt / decrypt amounts of
data larger than a block.
Some block modes (like CBC) require the input to be split into blocks
and the final block to be padded to the block size using a padding
algorithm (e.g. add a special padding character). Other block modes
(like CTR, CFB, OFB, CCM, EAX and GCM) do not require padding
at all, because they perform XOR between portions of the plaintext and
the internal cipher's state at each step.
Basically, encrypting a large input data works like this: the
encryption algorithm state is initialized (using the encryption key + a
random salt), then the first portion of data (e.g. a block or part of block)
is encrypted, then the encryption state is transformed (using the
encryption key and other parameters), then the next portion is
encrypted, then the encryption state is transformed again and the
next portion is then encrypted and so on, until all the input data is
processed. The decryption works in a very similar way.
This is what developers should know about the "block cipher modes
of operation" in order to use them correctly:
• Commonly used secure block modes are CBC (Cipher Block
Chaining), CTR (Counter) and GCM (Galois/Counter Mode),
which require a random (unpredictable) initialization vector
(IV), known also as nonce or salt at the start.
• The "Counter (CTR)" block mode is a good choice in the most
cases because of strong security, arbitrary input data length
(without padding) and parallel processing capabilities. It does not
provide authentication and integrity, just encryption.

• The GCM (Galois/Counter Mode) block mode takes all the
advantages of the CTR mode and adds message
authentication (produces a cryptographical message
authentication tag). GCM is fast and efficient way to implement
authenticated encryption in symmetric ciphers and it is highly
recommended in the general case.
• The CBC mode works in block of fixed size. Thus a padding
algorithm should be used to make the last block the same
length after splitting the input data into blocks. Most applications
use the PKCS7 padding scheme or ANSI X.923. In some
scenarios the CBC block mode might be vulnerable to the
"padding oracle" attack, so its is better to avoid the CBC
mode.
• Well-known insecure block mode is ECB (Electronic
Codebook), which encrypts equal input blocks as equal output
blocks (does not provide cryptographic diffusion). Don't use it! It
may compromise the entire encryption.
• Most block like CBC, CTR and GCM modes supports "random
access" decryption (e.g. seeking at arbitrary time offset in a
video player, playing an encrypted video stream).
CTR (Counter) Block Mode
The diagram below illustrates how portions (blocks) of the plaintext are
encrypted one after another in the CTR block mode of operation using
a block cipher:

For each block in CTR mode a new unpredictable keystream block is
generated based on the initial vector (IV, sometimes called "nonce")
+ the current counter (01, 02, 03, ...) + the secret encryption key
and the input block is merged by XOR with the current keystream
block to produce the output block. In the CTR mode the final portion
of the input data can be shorter then the cipher block size, so padding
is not needed. The input data (before encryption) and the output data
(after encryption) have the same length.
GCM (Galois/Counter) Block Mode
The following diagram explains visually how the GCM block mode
(Galois/Counter Mode) works:

The GCM mode uses a counter, which is increased for each block
and calculated a message authentication tag (MAC code) after each
processed block. The final authentication tag is calculated from the last
block. Like all counter modes, GCM works as a stream cipher, and so
it is essential that a different IV is used at the start for each stream
that is encrypted.
Choosing a Cipher Block Mode
It is recommended to use either CTR (Counter) or GCM (Galois/
Counter) block modes with symmetric ciphers like AES, RC6,
Camellia, Serpent and many others. The others might be helpful in
certain situations, but some of them are less secure, so use them only

if you know well what are you doing.
The CTR and GCM encryption modes have many advantages: they
are secure (no significant flaws are currently known), can encrypt data
of arbitrary length without padding, can encrypt and decrypt the
blocks in parallel (in multi-core CPUs) and provide random
(unordered) access to the encrypted blocks, so they are suitable for
encrypting crypto-wallets, documents and streaming video (where
users can seek by time). GCM provides also message authentication
and is the recommended choice for cipher block mode in the general
case.
Note that the GCM, CTR and other block modes reveal the length of
the original message. The length of the plaintext message is the
same as the ciphertext length. If you want to avoid revealing the
original plaintext length, you can add some random bytes to the
plaintext before the encryption and remove them after decryption (this
will be some kind of padding).
The Initialization Vector (IV)
Use a random and unpredictable IV (nonce) for each encrypted
message. It is a common mistake to encrypt multiple messages with
the same symmetric key and using the same IV. This opens a space
for various crypto attacks for the most block modes. The size of the IV
should be the same as the cipher block size, e.g. 128-bits for AES,
Serpent and Camellia.
For the GCM mode the IV may not be secret and unpredictable, but
should be different for each message.
Authenticated Encryption
In cryptography the concept of "authenticated encryption" (AE)
refers to a scheme to encrypt data and simultaneously calculate an

---

## Sección 25: Core Concepts & Foundations [Entropy: 0.515]

authentication code (authentication tag / MAC), used to provide
message authenticity and integrity. If authenticated encryption
scheme is used, at the moment of decryption it will be known if the
decryption is successful (i.e. whether the decryption key / password
was correct and whether the encrypted data was not tampered).
Authenticated encryption (AE) is related to the similar concept
authenticated encryption with associated data (AEAD), which is a
more secure variant of AE. AEAD binds associated data (AD) to the
ciphertext and to the context where it's supposed to appear, so that
attempts to "cut-and-paste" a valid ciphertext into a different context
can be detected and rejected. AEAD is used in scenarios where
encrypted and unencrypted data is used together (e.g. in encrypted
networking protocols) and ensures that the entire data stream is
authenticated and integrity protected. In other words, AEAD adds
the ability to check the integrity and authenticity of some
Associated Data (AD), also called "Additional Authenticated Data"
(AAD), that is not encrypted.
Some encryption schemes (like ChaCha20-Poly1305 and AES-GCM)
provide integrated authenticated encryption (AEAD), while others
(like AES-CBC and AES-CTR) need authentication to be added
additionally (if you need it).

Popular Symmetric Encryption
Algorithms
Symmetric key encryption algorithms (like AES) are designed by
mathematicians and cryptographers with the idea, that it should be
infeasible to decrypt the ciphertext without having the encryption
key. This is true for the modern secure symmetric encryption
algorithms (like AES and ChaCha20) and may be disputable or false
for others, which are considered insecure symmetric encryption
algorithms (like DES and RC4).
Some popular symmetric encryption algorithms are: AES, ChaCha20,
CAST, Twofish, IDEA, Serpent, RC5, RC6, Camellia and ARIA. All
these algorithms are considered secure (when configured and used
correctly).
AES (Rijndael)
AES (Advanced Encryption Standard, also known as Rijndael) is the
most popular and widely used symmetric encryption algorithm in
the modern IT industry. This is because AES is proven to be highly
secure, fast and well standardised and very well supported on virtually
all platforms. AES is 128-bit block cipher and uses 128, 192 or 256-
bit secret keys. It is usually used in a block mode like AES-CTR or
AES-GCM to process streaming data. In the most block modes AES
require also a random 128-bit initial vector (IV, nonce).
Rijndael was the winner in the AES competition organized by NIST
(1997-2000) and it was announced officially under the name "AES"
(the next official symmetric block cipher after DES). In 2001 AES was

adopted as official recommendation by the US government and no
significant weakness or attack was found since this moment.
The Rijndael (AES) algorithm is free for any use: public or private,
commercial or non-commercial.
Salsa20 / ChaCha20
Salsa20, along with its improved variants ChaCha (ChaCha8,
ChaCha12, ChaCha20) and XSalsa20, are a family of modern, fast,
symmetric stream ciphers, designed by the distinguished
cryptographer Daniel Bernstein. The Salsa20 cipher was one of the
finalists in the eSTREAM contest for designing of new symmetric
stream ciphers (2004-2008) and was widely adopted afterwards,
together with the related BLAKE hash function. Salsa20 and its
variants are royalty-free, not patented.
The Salsa20 cipher takes as input a 128-bit or 256-bit symmetric
secret key + randomly generated 64-bit nonce (initial vector) and a
stream of data of unlimited length and produces as output an
encrypted stream of data with the same length as the input stream.
The Salsa20 cipher is typically used as authenticated encryption
construction: ChaCha20-Poly1305.
Other Popular Symmetric Ciphers
Other modern secure symmetric ciphers, used more rarely than
EAS and ChaCha20, but still popular in the software developer and
information security communities, are the following:
• Serpent - secure symmetric-key block cipher (key size: 128, 192
or 256 bits), public domain, not patented
• Twofish - secure symmetric-key block cipher (key sizes: 128,
192 or 256 bits), royalty-free, not patented

• Camellia - secure symmetric key block cipher (block size: 128
bits; key sizes: 128, 192 and 256 bits), patented, but free for
non-commercial use
• RC5 - secure symmetric-key block cipher (key size: 128 to 2040
bits; block size: 32, 64 or 128 bits; rounds: 1 ... 255), insecure
with short keys (56-bit key successfully brute-forced), was
patented until 2015, now royalty-free
• RC6 - secure symmetric-key block cipher, similar to RC5, but
more complicated (key size: 128 to 2040 bits; block size: 32, 64
or 128 bits; rounds: 1 ... 255), was patented until 2017, now
royalty-free
• IDEA - secure symmetric-key block cipher (key size: 128 bits),
was patented until 2012, now royalty-free
• CAST (CAST-128 / CAST5, CAST-256 / CAST6) - family of
secure symmetric-key block ciphers (key sizes: 40 ... 256 bits),
royalty-free basis for commercial and non-commercial use
• ARIA - secure symmetric-key block cipher, similar to AES (key
size: 128, 192 or 256 bits), official standard in South Korea, free
for public use
• SM4 - secure symmetric-key block cipher, similar to AES (key
size: 128 bits), official standard in China, free for public use
Insecure Symmetric Algorithms
Some other symmetric encryption algorithms were popular in the past,
but are now considered insecure (broken algorithms) or having
disputable security and are not recommended to be used any more:
• DES - 56-bit key size, practically broken, can be brute-forced
• 3DES (Triple DES) - 64-bit cipher, considered broken
• RC2 - 64-bit cipher, considered broken
• RC4 - stream cipher, broken, practical attacks demonstrated
• Blowfish - old 64-bit cipher, broken, practical attacks

demonstrated
• GOST - Russian 64-bit block cipher, disputable security,
considered risky
Symmetric Encryption Schemes /
Constructions
In addition to the above mentioned symmetric key ciphers,
cryptographers have proposed many symmetric encryption
schemes (constructions), like the most popular authenticated
encryption (AEAD) schemes:
• ChaCha20-Poly1305
○ The ChaCha20 stream cipher with integrated Poly1305
authenticator (integrated authenticated AEAD encryption)
○ Requires a 256-bit key and random 96-bit nonce
○ Extremely high performance
○ Implemented by the most modern crypto-libraries
• AES-256-GCM
○ AES-GCM is the AES (Rijndael) block cipher in GCM
block mode (integrated authenticated AEAD encryption),
behaves like a stream cipher
○ Required 256-bit key and random 128-bit nonce (initial
vector)
○ Implemented by the most modern crypto libraries
Most applications today should prefer some of the above encryption
schemes for symmetric encryption, instead of constructing their own
encryption scheme. The above schemes are highly-secure, proven,
well tested and come out-of-the box from the crypto libraries.
Note that ChaCha20-Poly1305 is high-performance cipher (3 times
faster than AES-128-GCM on mobile devices), so it is recommended
to be used instead of AES-GCM.

---

## Sección 26: Core Concepts & Foundations [Entropy: 0.499]

The AES Symmetric-Key Cipher -
Concepts
The Advanced Encryption Standard (AES) cipher, also known as
"Rijndael" is a popular, secure, widely used symmetric key block
cipher algorithm, used officially as recommended encryption
technology standard in the United States. AES operates using block
size of 128 bits and symmetric keys of length 128, 160, 192, 224
and 256 bits.
AES is Secure and Very Popular
Symmetric Encryption Algorithm
The AES symmetric encryption algorithm is considered highly secure
(when configured correctly) and no significant practical attacks are
known for AES in its history.
AES is used internally by the most Internet Web sites today for serving
 https://  content as part of the TLS (Transport Layer Security) and
SSL (Secure Sockets Layer) standards for secure host to host
communication on the Web.
Due to its wide use in the Internet secure communication, modern
CPU hardware implements AES instructions at the microprocessor
level to speed-up the AES encryption and decryption.
AES Algorithm Parameters
The AES algorithm can operate with different key lengths, but the
block size is always 128 bits. For most application 128-bit AES

encryption (AES-128) is enough, but for higher encryption level, it is
recommended to use AES-256 (256-bit key length).
Like any other block ciphers, AES can use one of several modes of
operation (CBC, ECB, CTR, …) to allow encryption of data of arbitrary
length. The recommended mode for the general case and for
encrypting blockchain wallets is "CTR".
Most modes of operation require an initial vector (IV). When using a
counter mode (CTR), i.e. AES-128-CTR (128-bit) or AES-256-CTR
(256-bit) for example, first a non-secret random salt (IV) should be
generated and saved along with the encrypted ciphertext output. The
size of the IV is always the same as the size of the block, i.e. 128 bits
(16 bytes).
The AES encryption, combined with CTR block mode and random IV
causes the encryption algorithm to produce different encrypted
ciphertext each time, when the same input data is encrypted. This
ensures that nobody can construct a dictionary to reverse back the
encrypted ciphertext.
AES encryption in CBC mode uses a padding algorithm (like PKCS7
or ANSI X.923) to help splitting the input data into blocks of fixed
block-size (e.g. 128 bits) before passing the blocks to the AES-CBC
algorithm. Most developers use the CTR mode of operation for AES,
so they don't need padding.
Without using a block mode, the ciphertext, generated by the AES
algorithm is exactly 128 bits (16 bytes), just like the block size. The
input data is also exactly 128 bits.
The ciphertext, generated by the AES-CTR algorithm (AES in CTR
cipher block mode) has the same size like the size of the input data.
No padding is required.
The ciphertext, generated by the AES-CBC algorithm (AES in CBC
ciphertext mode), has size of 128 bits (16 bytes) or multiple of 128

bits. The input data should be padded before encryption and
unpadded after decryption.
The AES algorithm often is used along with a password-to-key
derivation function, e.g.  Scrypt(passwd) -> key  or
 PBKDF2(passwd) -> key .
Integrated Message Authentication
Code (MAC)
The AES algorithm may use MAC (message authentication code) to
check the password validity, e.g.  HMAC(text, key) .
The MAC code is typically integrated (see the concept of integrated
encryption) in the algorithm's output. It is calculated from the input
message, together with the encryption key. From the calculated MAC,
it is impossible to reveal the input message or the key, so the MAC
itself is not a secret. Some block cipher modes (like AES-GCM)
integrate message authentication in the obtained ciphertext as part of
their work, so you don't need to add MAC explicitly.
Typically MAC is calculated and used like this:
• Before the encryption, the MAC is calculated as:
 mac = HMAC-SHA256(input_msg, key) .
• The input data is encrypted and the ciphertext is stored along
with the random salt (IV) and the MAC.
• After decryption, the MAC is calculated again and is compared
with the MAC stored along with the encrypted message.
○ If the MAC is the same, the decryption is successful:
correct ciphertext + decryption key + algorithms settings
(IV, block mode, padding algorithm).
○ If the MAC is different, the decryption is not successful:
incorrect key / password or broken ciphertext, incorrect

MAC or different algorithms settings (IV, block mode,
padding, etc.)
The MAC can be calculated and verified using several approaches to
integrated encryption: Encrypt-then-MAC, Encrypt-and-MAC, MACthen-Encrypt.
The AES Encryption Process
The entire AES encryption process (password-based authenticated
encryption) looks like this:
1. Algorithm parameters are selected (e.g. AES, 128-bit, CTR
mode + Scrypt + Scrypt parameters + MAC algorithm). These
parameters can be hard-coded in the AES algorithm
implementation source code or can be specified as input for the
AES encrypt and decrypt. Always use the same parameters for
encryption and decryption.
2. The encryption key is derived from the encryption password
using a key-derivation function (KDF), e.g. Scrypt (with certain
parameters):
3. The AES encryption scheme takes as input the input msg + the
encryption key. It produces as output the ciphertext + the
randomly generated IV (128-bit salt) + the MAC code:
○ In case of authenticated encryption (e.g. AES-GCM),
the MAC is already calculated automatically during the

AES encryption process.
○ If the encryption scheme is not authenticated encryption
(e.g. AER-CTR), the MAC code is not calculated
automatically by the AES encryption process and should
be calculated additionally. The MAC code can be
calculated from the input msg, using the encryption key
(or some transformation of it) and some MAC function
(like HMAC-SHA-256):
○ The ciphertext is calculated through the AES encryption
algorithm. It first generates a random salt (IV) and uses
it to transform the input msg using the encryption key,
through the AES cipher encryption logic:
4. Finally, the encrypted output is generated. It holds the
ciphertext + IV + MAC. Optionally, it holds also the algorithm
settings.
The AES Decryption Process
The opposite AES decryption process (password-based
authenticated decryption) looks like this:
1. Initialize the same AES algorithm parameters for the
decryption process, exactly like the ones used during the
encryption.
2. Use the decryption key and the IV from the encrypted message
to decrypt the ciphertext using the AES algorithm decryption
logic. The output is the original message (the input msg, which

---

## Sección 27: Core Concepts & Foundations [Entropy: 0.545]

was previously passed through AES encryption):
○ In case of authenticated encryption (like AES-GCM), the
integrated MAC code is verified during the decryption
process.
○ In case of unauthenticated encryption (like AES-CTR),
the MAC code should be calculated and verified
additionally, as it is described in the next few step.
3. Calculate HMAC of the original message (obtained during the
decryption):
4. Compare the encryption MAC (the MAC of the input message,
before the encryption) with the decryption MAC (the MAC of the
original message, recovered by the decryption):
○ If the MAC codes are the same, the decryption was
correct and the original message is obtained.
○ If the MAC codes are different, the decryption was failed
and the original message is not the obtained one. This
may happen due to many reasons, most likely "wrong
password". Other reasons: incorrect ciphertext, incorrect
IV, incorrect algorithm settings, incorrect KDF function or
KDF parameters, etc.
Now it is time to illustrate the above described concepts through

working source code to AES encrypt / decrypt an input msg by given
password.

AES Encryption / Decryption (AES-
CTR, AES-GCM) - Examples in
Python
Let's illustrate the AES encryption and AES decryption concepts
through working source code in Python.
The first example below will illustrate a simple password-based AES
encryption (PBKDF2 + AES-CTR) without message authentication
(unauthenticated encryption). The next example will add message
authentication (using the AES-GCM mode), then will add password to
key derivation (AES-256-GCM + Scrypt).
Simple AES-CTR Example
Let's start with simple AES-256-CTR non-authenticated encryption.
Install Python Libraries  pyaes  and  pbkdf2 
First, install the Python library  pyaes  that implements the AES
symmetric key encryption algorithm:
normalpip install pyaes
normal
Next, install the Python library  pbkdf2  that implements the PBKDF2
password-to-key derivation algorithm:
normalpip install pbkdf2
normal

Now, let's play with a simple AES encrypt / decrypt example.
Password to Key Derivation
First start by key derivation: from password to 256-bit encryption key.
normalimport pyaes, pbkdf2, binascii, os, secrets
# Derive a 256-bit AES encryption key from the password
password = "s3cr3t*c0d3"
passwordSalt = os.urandom(16)
key = pbkdf2.PBKDF2(password, passwordSalt).read(32)
print('AES encryption key:', binascii.hexlify(key))
normal
Run the above code example: https://repl.it/@nakov/AES-CTR-in-
Python.
The above code derives a 256-bit key using the PBKDF2 key
derivation algorithm from the password  s3cr3t*c0d3 . It uses a random
password derivation salt (128-bit). This salt should be stored in the
output, together with the ciphertext, because without it the decryption
key cannot be derived again and the decryption will be impossible.
The output from the above code may look like this:
normalAES encryption key:
b'7625e224dc0f0ec91ad28c1ee67b1eb96d1a5459533c5c950f44aae1e32f2da3'
normal
The derived key consists of 64 hex digits (32 bytes), which represents
a 256-bit integer number. It will be different if you run the above code
several times, because a random salt is used every time. If you use
the same salt, the same key will be derived.
AES Encryption (CTR Block Mode)
Next, generate a random 256-bit initial vector (IV) for the AES CTR
block mode and perform the AES-256-CTR encryption:

normal# Encrypt the plaintext with the given key:
# ciphertext = AES-256-CTR-Encrypt(plaintext, key, iv)
iv = secrets.randbits(256)
plaintext = "Text for encryption"
aes = pyaes.AESModeOfOperationCTR(key, pyaes.Counter(iv))
ciphertext = aes.encrypt(plaintext)
print('Encrypted:', binascii.hexlify(ciphertext))
normal
Run the above code example: https://repl.it/@nakov/AES-encryptionin-Python.
The output from the above code may look like this:
normalEncrypted: b'53022cf12c5959ddf3e733128930dd3d52e3ea'
normal
The ciphertext consists of 38 hex digits (19 bytes, 152 bits). This is
the size of the input data, the message  Text for encryption .
Note that after AES-CTR encryption the initial vector (IV) should be
stored along with the ciphertext, because without it, the decryption will
be impossible. The IV should be randomly generated for each AES
encryption (not hard-coded) for higher security.
Note also that if you encrypt the same plaintext with the same
encryption key several times, the output will be different every time,
due to the randomness in the IV. This is intended behavior and it
increases the security, e.g. resistance to dictionary attacks.
AES Decryption (CTR Block Mode)
Now let's see how to decrypt a ciphertext using the AES-CTR-256
algorithm. The input consists of ciphertext + encryption key + the IV
for the CTR counter. The output is the original plaintext. The code is
pretty simple:
normal# Decrypt the ciphertext with the given key:
# plaintext = AES-256-CTR-Decrypt(ciphertext, key, iv)

aes = pyaes.AESModeOfOperationCTR(key, pyaes.Counter(iv))
decrypted = aes.decrypt(ciphertext)
print('Decrypted:', decrypted)
normal
Run the above code example: https://repl.it/@nakov/AES-decryptionin-Python.
The output of the above should be like this:
normalDecrypted: b'Text for encryption'
normal
Note that the  aes  object should be initialized again, because the
CTR cipher block mode algorithm keeps an internal state that changes
over the time.
Note also that the above code cannot detect wrong key, wrong
ciphertext or wrong IV. If you use an incorrect key to decrypt the
ciphertext, you will get a wrong unreadable text. This is clearly visible
by the code below:
normalkey = os.urandom(32) # random decryption key
aes = pyaes.AESModeOfOperationCTR(key, pyaes.Counter(iv))
print('Wrongly decrypted:', aes.decrypt(ciphertext))
normal
Run the above code example: https://repl.it/@nakov/AES-decryptionwrong-key-in-Python.
The output of the above incorrect decryption attempt might be like this:
normalWrongly decrypted: b'\xe6!
\n\x9a\xa9\x15\x12\xd9\xcb\x9cS\x86\xcc\xe1\x1d\x1a\x8blw'
normal
Now it is your time to play with the above code example. Try to to
encrypt and decrypt different messages, to change the input message,
the key size, to hard-code the IV, the key and other parameters, switch

---

## Sección 28: Core Concepts & Foundations [Entropy: 0.755]

to CBC mode, and see how the results change. Enjoy learning by
playing.
AES-256-GCM Example
Now, let's give a full example how to use the AES-256-GCM
symmetric encryption construction. We shall use a different Python
library for AES, called  pycryptodome , which supports the the AES-256-
GCM construction:
normalpip install pycryptodome
normal
Next, let's play with the below AES-GCM example in Python, which
generates a random encryption key (secret key) and uses it to encrypt
a text message, then decrypts it back to the original plaintext
message:
normalfrom Crypto.Cipher import AES
import binascii, os
def encrypt_AES_GCM(msg, secretKey):
 aesCipher = AES.new(secretKey, AES.MODE_GCM)
 ciphertext, authTag = aesCipher.encrypt_and_digest(msg)
 return (ciphertext, aesCipher.nonce, authTag)
def decrypt_AES_GCM(encryptedMsg, secretKey):
 (ciphertext, nonce, authTag) = encryptedMsg
 aesCipher = AES.new(secretKey, AES.MODE_GCM, nonce)
 plaintext = aesCipher.decrypt_and_verify(ciphertext, authTag)
 return plaintext
secretKey = os.urandom(32) # 256-bit random encryption key
print("Encryption key:", binascii.hexlify(secretKey))
msg = b'Message for AES-256-GCM + Scrypt encryption'
encryptedMsg = encrypt_AES_GCM(msg, secretKey)
print("encryptedMsg", {
 'ciphertext': binascii.hexlify(encryptedMsg[0]),
 'aesIV': binascii.hexlify(encryptedMsg[1]),
 'authTag': binascii.hexlify(encryptedMsg[2])
})
decryptedMsg = decrypt_AES_GCM(encryptedMsg, secretKey)
print("decryptedMsg", decryptedMsg)

normal
Run the above code example: https://repl.it/@nakov/AES-256-GCM-in-
Python.
The AES-GCM encryption takes as input a message + encryption
key and produces as output a set of values: { ciphertext + nonce +
authTag }.
• The ciphertext is the encrypted message.
• The nonce is the randomly generated initial vector (IV) for the
GCM construction.
• The authTag is the message authentication code (MAC)
calculated during the encryption.
The encryption key size generated in the above code is 256 bits (32
bytes) and it configures the AES-GCM cipher as AES-256-GCM. If we
change the key size to 128 bits or 192 bits, we shall use AES-128-
GCM or AES-192-GCM respectively.
The output from the above code looks like this:
normalEncryption key:
b'233f8ce4ac6aa125927ccd98af5750d08c9c61d98a3f5d43cbf096b4caaebe80'
encryptedMsg {'ciphertext':
b'1334cd5d487f7f47924187c94424a2079656838e063e5521e7779e441aa513de268550a
'aesIV': b'2f3849399c60cb04b923bd33265b81c7', 'authTag':
b'af453a410d142bc6f926c0f3bc776390'}
decryptedMsg b'Message for AES-256-GCM + Scrypt encryption'
normal
It is visible that the encryption key above is 256 bits (64 hex digits),
the ciphertext has the same length as the input message (43 bytes),
the IV is 128 bits (32 hex digits) and the authentication tag is 128 bits
(32 hex digits). If we change something before the decryption (e.g. the
ciphertext of the IV), we will get and exception, because the
message integrity will be broken:
normalencryptedMsg = (b'wrong chiphertext', encryptedMsg[1],

encryptedMsg[2])
decryptedMsg = decrypt_AES_GCM(encryptedMsg, secretKey) #
ValueError: MAC check failed
normal
Run the above code example: https://repl.it/@nakov/AES-256-GCMwrong-chiphertext-in-Python.
AES-256-GCM + Scrypt Example
Now let's give a more complex example: AES encryption of text by
text password. We shall use the authenticated encryption
construction AES-256-GCM, combined with Scrypt key derivation:
normalfrom Crypto.Cipher import AES
import scrypt, os, binascii
def encrypt_AES_GCM(msg, password):
 kdfSalt = os.urandom(16)
 secretKey = scrypt.hash(password, kdfSalt, N=16384, r=8, p=1,
buflen=32)
 aesCipher = AES.new(secretKey, AES.MODE_GCM)
 ciphertext, authTag = aesCipher.encrypt_and_digest(msg)
 return (kdfSalt, ciphertext, aesCipher.nonce, authTag)
def decrypt_AES_GCM(encryptedMsg, password):
 (kdfSalt, ciphertext, nonce, authTag) = encryptedMsg
 secretKey = scrypt.hash(password, kdfSalt, N=16384, r=8, p=1,
buflen=32)
 aesCipher = AES.new(secretKey, AES.MODE_GCM, nonce)
 plaintext = aesCipher.decrypt_and_verify(ciphertext, authTag)
 return plaintext
msg = b'Message for AES-256-GCM + Scrypt encryption'
password = b's3kr3tp4ssw0rd'
encryptedMsg = encrypt_AES_GCM(msg, password)
print("encryptedMsg", {
 'kdfSalt': binascii.hexlify(encryptedMsg[0]),
 'ciphertext': binascii.hexlify(encryptedMsg[1]),
 'aesIV': binascii.hexlify(encryptedMsg[2]),
 'authTag': binascii.hexlify(encryptedMsg[3])
})
decryptedMsg = decrypt_AES_GCM(encryptedMsg, password)
print("decryptedMsg", decryptedMsg)
normal
Run the above code example: https://repl.it/@nakov/AES-256-GCM-

with-Scrypt-in-Python.
The above code encrypts using AES-256-GCM given text message by
given text password.
• During the encryption, the Scrypt KDF function is used (with
some fixed parameters) to derive a secret key from the
password. The randomly generated KDF salt for the key
derivation is stored together with the encrypted message and will
be used during the decryption. Then the input message is AESencrypted using the secret key and the output consists of
ciphertext + IV (random nonce) + authTag. The final output
holds these 3 values + the KDF salt.
• During the decryption, the Scrypt key derivation (with the same
parameters) is used to derive the same secret key from the
encryption password, together with the KDF salt (which was
generated randomly during the encryption). Then the ciphertext
is AES-decrypted using the secret key, the IV (nonce) and the
authTag. In case of success, the result is the decrypted original
plaintext. In case of error, the authentication tag will fail to
authenticate the decryption process and an exception will be
thrown.
The output from the above code looks like this:
normalencryptedMsg {'kdfSalt':
b'2dd0b783290747ba62a63fc53591170d', 'ciphertext':
b'223ed888dcd216dcd40c47ff7cdaa7fd7eab65f4f0405350a43c5cad5b6b47b527c709ed
'aesIV': b'7f114d946c77508ed2e6afe652c78f21', 'authTag':
b'e84a14b9542320a0b1473141c989c48f'}
decryptedMsg b'Message for AES-256-GCM + Scrypt encryption'
normal
If you run the same code, the output will be different, due to
randomness (random KDF salt + random AES nonce).

---

## Sección 29: Core Concepts & Foundations [Entropy: 0.809]

Ethereum UTC / JSON Wallet
Encryption (AES + Scrypt + MAC)
To illustrate the application of the AES cipher in action, we shall look
into one real-world example: the standard encrypted wallet file
format for the Ethereum blockchain. We shall see how AES-128-CTR
cipher is combined with Scrypt and MAC to securely implement
authenticated symmetric key encryption by text-based password.
Ethereum UTC / JSON Wallets
In public blockchain networks (like Bitcoin and Ethereum) the private
keys of the blockchain asset holders are stored in special keystores,
called crypto wallets. Typically these crypto-wallets are files on the
local hard disk, encrypted by a password.
In the Ethereum blockchain crypto wallets are internally stored in a
special encrypted format known as "UTC / JSON Wallet (Keystore
File)" or "Web3 Secret Storage Definition". This is the wallet file
format, used in geth and Parity (the leading protocol implementations
for Ethereum), in MyEtherWallet (popular online client-side Ethereum
wallet), in MetaMask (widely used in-browser Ethereum wallet), in the
ethers.js and Nethereum libraries and in many other Ethereumrelated technologies and tools.
The Ethereum UTC / JSON keystores keep the encrypted private
key (or wallet seed words) as JSON text document, specifying the
encrypted data, encryption algorithms and their parameters.
UTC / JSON Keystore - Example

Let's look into a sample UTC / JSON keystore file, which holds a
password-protected 256-bit private key.
normal{
 "version": 3,
 "id": "07a9f767-93c5-4842-9afd-b3b083659f04",
 "address": "aef8cad64d29fcc4ed07629b9e896ebc3160a8d0",
 "Crypto": {
 "ciphertext":
"99d0e66c67941a08690e48222a58843ef2481e110969325db7ff5284cd3d3093",
 "cipherparams": { "iv": "7d7fabf8dee2e77f0d7e3ff3b965fc23" },
 "cipher": "aes-128-ctr",
 "kdf": "scrypt",
 "kdfparams": {
 "dklen": 32,
 "salt":
"85ad073989d461c72358ccaea3551f7ecb8e672503cb05c2ee80cfb6b922f4d4",
 "n": 8192,
 "r": 8,
 "p": 1
 },
 "mac":
"06dcf1cc4bffe1616fafe94a2a7087fd79df444756bb17c93af588c3ab02a913"
 }
}
normal
The above JSON document is a classical example of authenticated
symmetric encryption.
What Is Inside the UTC / JSON File?
Typically a UTC / JSON keystore holds the following data:
• Key-derivation function (KDF) used to transform the textbased wallet encryption password into an AES symmetric key,
used to encrypt the wallet contents. Usually the KDF function is
"scrypt".
○ The KDF parameters - the parameters used in the KDF
function to derive the password (e.g. iterations count, salt,
etc.)
• The ciphertext - the encrypted wallet content (typically holds an
encrypted 256-bit private key).

• Symmetric cipher algorithm + its parameters, e.g. AES-128-
CTR + initial vector (IV).
• MAC - message authentication code used (MAC) to check the
message integrity after it is decrypted (to know whether the
wallet decryption password was correct or not).
○ Ethereum calculates the MAC by calculating keccak-256
hash of the concatenations of the second-leftmost 16
bytes of the derived key together with the full ciphertext.
• Additional metadata: wallet format version, wallet unique id
(uuid) and the blockchain address, controlled by this wallet.
By default the key-derivation function is scrypt and uses weak scrypt
parameters (n=8192 cost factor, r=8 block size, p=1 parallelization),
so it is recommended to use long and complex passwords to avoid
brute-force wallet decryption attacks.
MyEtherWallet: Play with UTC / JSON
Keystore Files
To learn better the file format behind the Ethereum UTC / JSON
keystore files, play with MyEtherWallet.

Follow the steps below to create a new random Ethereum crypto
wallet and view its encrypted JSON content:
• Open the MyEtherWallet web site: https://myetherwallet.com.
• Choose a password and create a new wallet.
• Download the Keystore File (UTC / JSON).
• See what's inside the downloaded file.
• Try to make some changes, try to decrypt it with wrong
password and other changes.
• Enjoy learning by playing.

Exercise: Symmetric Key
Encryption / Decryption (using AES
+ Scrypt + HMAC)
In this exercise we shall encrypt and decrypt a text message using a
symmetric cipher AES-CBC-256, combined with Scrypt password-tokey derivation and HMAC message authentication code. In fact we
shall implement a password-based symmetric authenticated
encryption scheme.
Symmetric Encryption (AES + Scrypt +
HMAC)
Write a program to encrypt a text message using given password.
Use the following steps:
• Derive a 512-bit key from the password using Scrypt
(n=16384, r=16, p=1) with random salt (128 bits).
○ Split the derived key into two 256-bit sub-keys:
encryption key and HMAC key.
• Pad the input message using the PKCS7 algorithm to length,
which is multiple of 16 bytes (128 bits).
• Encrypt the padded message using AES-256-CBC using the
encryption key. The obtained result is the ciphertext. Its length
should be a multiple of 16 bytes (128 bits), which is the block
size in the AES cipher.
○ Use a randomly generated 128-bit initial vector (IV).
• Calculate message authentication code (MAC) using HMAC-

SHA256(hmac_key, ciphertext).
Input: message + password (space separated).
Output: JSON document (see the example below), holding the
following assets:
• The Scrypt randomly-generated salt (in hex format).
• The randomly-generated iv (in hex format), used for the AES
cipher.
• The encrypted message ciphertext (in hex format) from the
AES cipher.
• The message authentication code - mac (in hex format).
Write your code in programming language of choice.
Input
Output
p@sSw0rd~123
SecretMsg
{"salt": "9757a3a22a9937ca0e0f2b5f2a4a11b4", "iv
"2ce8c035d50f7a6ee6509c14fe11725a", "ciphertex
"bb435d8ad048c240b50f0e4a191605d9", "mac":
"02cf870ad1f7453c339dac06edbd648c455f5e8abbf
stupid!pass
longermessage-forencryption
{"salt": "b243f0ac10ef358ff0d37f1e30ef19c2", "iv":
"fdeff97e89705289d99751f079e2a308", "ciphertext
"ea76bc60799c5824627a8c1276b48ab70e24011b6
"mac":
"34085e1a47ae53e154b7466336efee386c2f1ed61a
Note that the above input will be different in your case, bеcause of the
randomly generated salt and iv.
Symmetric Decryption (AES + Scrypt +
HMAC)

---

## Sección 30: Core Concepts & Foundations [Entropy: 0.478]

Write a program to decrypt an encrypted message (coming as input)
using given password.
• Derive a 512-bit key from the password using Scrypt
(n=16384, r=16, p=1) with the salt (from the JSON).
○ Split the derived key into two 256-bit sub-keys:
encryption key and HMAC key.
• Calculate message authentication code (MAC) using HMAC-
SHA256(hmac_key, ciphertext).
○ Compare the MAC with the MAC in the JSON document.
○ Same MAC means "correct password / successful
decryption".
○ Different MAC means "wrong password / incorrect input
data".
• Decrypt the ciphertext from the input using AES-256-CBC
using the encryption key and the IV from the JSON.
• Unpad the decrypted message using the PKCS7 algorithm from
length, which is multiple of 16 bytes (128 bits) to its original
length (usually smaller).
Input: password + JSON (space separated). The JSON is in exactly
the same format, like in the output from the previous exercise (it holds
salt, iv, ciphertext and mac, all as hex numbers)
Output:  Decrypted:  + the original decrypted message or the text
 Decryption failed!  in case or wrong password or other problem.
Write your code in programming language of choice.
Input

p@sSw0rd~123 {"salt": "9757a3a22a9937ca0e0f2b5f2a4a11b4", "iv":
"2ce8c035d50f7a6ee6509c14fe11725a", "ciphertext":
"bb435d8ad048c240b50f0e4a191605d9", "mac":
"02cf870ad1f7453c339dac06edbd648c455f5e8abbf6f2716cbc2d164b6442
wrong!pass {"salt": "9757a3a22a9937ca0e0f2b5f2a4a11b4", "iv":
"2ce8c035d50f7a6ee6509c14fe11725a", "ciphertext":
"bb435d8ad048c240b50f0e4a191605d9", "mac":
"02cf870ad1f7453c339dac06edbd648c455f5e8abbf6f2716cbc2d164b6442

ChaCha20-Poly1305
[TODO]
The AEAD construction ChaCha20-Poly1305 combines the
ChaCha20 stream cipher paired with the Poly1305 authenticator...
Chacha20-Poly1305 - Example in
Python
https://github.com/ph4r05/py-chacha20poly1305
[TODO]

Exercise: Symmetric Key
Encryption / Decryption (ChaCha20-
Poly1305)
[TODO]

Asymmetric Key Ciphers and
Public-Key Cryptography -
Overview
Asymmetric key cryptosystems / public-key cryptosystems (like
RSA, elliptic curve cryptography (ECC), Diffie-Hellman, ElGamal,
McEliece, NTRU and others) use a pair of mathematically linked keys:
public key (encryption key) and private key (decryption key).
The asymmetric key cryptosystems provide key-pair generation
(private + public key), encryption algorithms (asymmetric key ciphers
and encryption schemes like RSA-OAEP and ECIES), digital
signature algorithms (like DSA, ECDSA and EdDSA) and key
exchange algorithms (like DHKE and ECDH).
A message encrypted by the public key is later decrypted by the
private key. A message signed by the private key is later verified by
the public key. The public key is typically shared with everyone,
while the private key is kept secret. Calculating the private key from
its corresponding public key is by design computationally infeasible.
Public-Key Cryptosystems
Well-known public-key cryptosystems are: RSA, ECC, ElGamal,
DHKE, ECDH, DSA, ECDSA, EdDSA, Schnorr signatures. Different
public key cryptosystems may provide one or more of the following
capabilities:
• Key-pair generation: generate random pairs of private key +
corresponding public key.
• Encryption / decryption: encrypt date by public key and

decrypt data by private key (often using a hybrid encryption
scheme).
• Digital signatures (message authentication): sign messages by
private key and verify signatures by public key.
• Key-exchange algorithms: securely exchange cryptographic
key between two parties over insecure channel.
The most important and most used public-key cryptosystems are RSA
and ECC. Elliptic curve cryptography (ECC) is the recommended and
most preferable modern public-key cryptosystem, especially with the
modern highly optimized and secure curves (like Curve25519 and
Curve448), because of smaller keys, shorter signatures and better
performance.
The RSA public-key cryptosystem is based on the mathematical
concept of modular exponentiation (numbers raised to a power by
modulus), along with some mathematical constructions and the
integer factorization problem (which is considered to be
computationally infeasible for large enough keys).
The elliptic-curve cryptography (ECC) cryptosystem is based on
the math of the on the algebraic structure of the elliptic curves over
finite fields and the elliptic curve discrete logarithm problem
(ECDLP), which is considered to be computationally infeasible for
large keys. ECC comes together with the ECDSA algorithm (ellipticcurve digital signature algorithm). ECC uses smaller keys and
signatures than RSA and is prefered in most modern apps. We shall
discuss ECC and ECDSA later in details, along with examples.
Most public-key cryptosystems (like RSA, ECC, DSA, ECDSA and
EdDSA) are quantum-breakable (quantum-unsafe), which means that
(at least on theory) a powerful enough quantum computer will be able
to break their security and compute the private key from given public
key in seconds.

Asymmetric Encryption Schemes
Asymmetric encryption is more complicated than symmetric
encryption, not only because it uses public and private keys, but
because asymmetric encryption can encrypt / decrypt only small
messages, which should be mapped to the underlying math of the
public-key cryptosystem. Some cryptosystems (like ECC) do not
provide directly encryption primitives, so more complex schemes
should be used.
In the RSA system, the input message should be transformed to big
integer (e.g. using OAEP padding), while in ECC the message cannot
be directly encrypted and more complex encryption scheme is used,
based on the elliptic-curve Diffie-Hellman Key Exchange (ECDH). It will
be explained in details later in this chapter. Additionally, asymmetric
ciphers are significantly slower than symmetric ciphers (e.g. the RSA
encryption is 1000 times slower than AES).
To overcome the above limitations and to allow encrypting messages
of any size, modern cryptography uses asymmetric encryption
schemes (also known as public key encryption schemes /
asymmetric encryption constructions / hybrid encryption
schemes), like key encapsulation mechanisms (KEM) and
integrated encrypted schemes, which combine asymmetric
encryption with symmetric key ciphers.
This is how a large document or file can be encrypted by combining
public-key cryptography and symmetric crypto algorithm:

---

## Sección 31: Core Concepts & Foundations [Entropy: 0.34]

In the above diagram the encrypted symmetric key is known as KEM
block (encapsulated key, with public key encryption) and the
encrypted data file is known as DEM block (encapsulated data, with
symmetric encryption). The encrypted message consists of these two
blocks together (encapsulated key + encapsulated data).
This is the corresponding decryption process (decrypt an encrypted
large document using public-key cryptography and symmetric
crypto algorithm):
Examples of such asymmetric encryption schemes are: RSA-OAEP,
RSA-KEM and ECIES-KEM.
Integrated Encryption Schemes
Integrated encryption schemes (IES) are modern public key

encryption schemes, which combine symmetric ciphers, asymmetric
ciphers and key-derivation algorithms to provide secure public-key
based encryption (PKE). In EIS scheme asymmetric algorithms (like
RSA or ECC) are used to encrypt or encapsulate a symmetric key,
used later by symmetric ciphers (like AES or ChaCha20) to encrypt the
input message. Some EIS schemes provide also message
authentication. Examples of EIS schemes are DLIES (Discrete
Logarithm Integrated Encryption Scheme) and ECIES (Elliptic Curve
Integrated Encryption Scheme).
Key Encapsulation Mechanisms (KEMs)
A key encapsulation mechanisms (KEM) are asymmetric
cryptographic techniques used to encrypt and encapsulate a secret
key (called "ephemeral symmetric key"), which is used to encrypt an
input message using a symmetric cryptographic cipher. KEM
encapsulates the ephemeral symmetric encryption key as part of the
encrypted message, by encrypting it with the recipient's public key. In
cryptography this process is known as "key encapsulation".
The output from a KEM-based hybrid encryption scheme consists of
KEM block, holding the encapsulated encrypted symmetric key (or
certain parameters used to derive it), and DEM block (data
encapsulation mechanism), holding the encapsulated symmetricallyencrypted data (cipher parameters + ciphertext + optionally an
authentication tag).
Key encapsulation mechanisms (KEMs) are used in the hybrid
encryption schemes and in the integrated encryption schemes, where
a random element is generated in the underlying public-key
cryptosystem and a symmetric key is derived from this random
element by hashing. This approach simplifies the process of combining
asymmetric and symmetric encryption. Examples of modern key
encapsulation mechanisms are: RSA-KEM, ECIES-KEM and PSEC-

KEM.
Key encapsulation should not be confused with key wrapping.
• Key encapsulation (KEM) refers to public-key encryption of
another key (symmetric or asymmetric). It is used for creating
provably secure hybrid encryption schemes, e.g. to encrypt an
AES secret key by given ECC public key.
• Key wrapping refers to symmetric-key encryption of another
key (which can be either a symmetric key or an asymmetric
key). It is used to encrypt, integrity-protect and transport
cryptographic keys. Key wrapping provides privacy and integrity
protection for specialized data such as cryptographic keys,
without the use of nonces. For details see RFC 3394.
Digital Signatures
In cryptography digital signatures provide message authentication,
integrity and non-repudiation for digital documents. Digital
signatures work in the public-key cryptosystems and use a public /
private key pairs. Message signing is performed by the private key
and message verification is performed by the corresponding public
key.
A message signature mathematically guarantees that certain
message was signed by certain (secret) private key, which
corresponds to certain (non-secret) public key. After a message is
signed, the message and the signature cannot be modified and thus
message authentication and integrity is provided. Anyone, who
knows the public key of the message signer, can verify the
signature. Аfter signing the signature author cannot reject the act of
signing (this is known as non-repudiation).
Digital signatures are widely used today for signing digital contracts,

for authorizing bank payments and signing transactions in the public
blockchain systems for transferring digital assets.
Most public-key cryptosystems like RSA and ECC provide secure
digital signature schemes like DSA, ECDSA and EdDSA. We shall
discuss the digital signatures in greater detail later in this section.
Key Exchange Algorithms
In cryptography key exchange algorithms (key agreement
protocols / key negotiation schemes) allow cryptographic keys to be
exchanged between two parties, allowing the use of a cryptographic
algorithm, in most cases symmetric encryption cipher. For example,
when a laptop connects to the home WiFi router, both parties agree
on a session key, used to symmetrically encrypt the network traffic
between them.
Most key-exchange algorithms are based on public-key cryptography
and the math behind this system: discrete logarithms, elliptic curves or
other.
Anonymous key exchange, like Diffie–Hellman (DHKE and ECDH),
does not provide authentication of the parties, and is thus vulnerable to
man-in-the-middle attacks, but is safe from traffic interception (sniffing)
attacks.
Authenticated key agreement schemes authenticate the identities of
parties involved in the key exchange and thus prevent man-in-themiddle attacks by use of digitally signed keys (e.g. PKI certificate),
password-authenticated key agreement or other method.

The RSA Cryptosystem - Concepts
The RSA cryptosystem is one of the first public-key cryptosystems,
based on the math of the modular exponentiations and the
computational difficulty of the RSA problem and the closely related
integer factorization problem (IFP). The RSA algorithm is named
after the initial letters of its authors (Rivest–Shamir–Adleman) and is
widely used in the early ages of computer cryptography.
Later, when ECC cryptography evolved, the ECC slowly became
dominant in the asymmetric cryptosystems, because of its higher
security and shorter key lengths than RSA.
The RSA algorithm provides:
• Key-pair generation: generate random private key (typically of
size 1024-4096 bits) and corresponding public key.
• Encryption: encrypt a secret message (integer in the range
[0...key_length]) using the public key and decrypt it back using
the secret key.
• Digital signatures: sign messages (using the private key) and
verify message signature (using the public key).
• Key exchange: securely transport a secret key, used for
encrypted communication later.
RSA can work with keys of different keys of length: 1024, 2048, 3072,
4096, 8129, 16384 or even more bits. Key length of 3072-bits and
above are considered secure. Longer keys provide higher security but
consume more computing time, so there is a tradeoff between
security and speed. Very long RSA keys (e.g. 50000 bits or 65536 bits)
may be too slow for practical use, e.g. key generation may take from
several minutes to several hours.

---

## Sección 32: Core Concepts & Foundations [Entropy: 0.71]

RSA Key Generation
Generating an RSA public + private key pair involves the following:
Using some non-trivial math computations from the number theory,
find three very large integers e, d and n, such that:
• (me)d ≡ m (mod n) for all m in the range [0...n)
The integer number n is called "modulus" and it defines the RSA key
length. It is typically very large prime number (e.g. 2048 bits).
The pair {n, e} is the public key. It is designed to be shared with
everyone. The number e is called "public key exponent". It is usually
65537 (0x010001).
The pair {n, d} is the private key. It is designed to be kept in secret. It
is practically infeasible to calculate the private key from the public key
{n, e}. The number d is called "private key exponent" (the secret
exponent).
RSA Public Key - Example
Example of 2048-bit RSA public key (represented as 2048-bit
hexadecimal integer modulus n and 24-bit public exponent e):
normaln =
0xa709e2f84ac0e21eb0caa018cf7f697f774e96f8115fc2359e9cf60b1dd8d4048d974cd
e = 0x010001
normal
The same RSA public key, encoded in the traditional for RSA format
PKCS#8 PEM ASN.1 looks like this:
normal-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEApwni+ErA4h6wyqAYz39p
f3dOlvgRX8I1npz2Cx3Y1ASNl0zfhCK+9r48FisEuRb36iEz8OPk4O7hZIWb2cHg
7wNXwUL09jO0rdSquGyPiJXNM/v04CTZo61r5iZ1cLSnLSw0NU4BOedK2mZaFqJh
FJDeu44TGmz/x+8l50JAgD3XGk/NlTyYgRGwqpu8TFcCT8XoxEYq2QScfxq+2FnG

NFX6bVi1zDSj0yBv90uelsM226zwzdGO0MZnls4AqwfzayTL4zQlI/2CFajnf4no
agjbkR8jdFk4je5kLa58smRKA+ce1cb6UHfPQJD6+lVgSLU2uHmoj2KGmPDHtCDE
twIDAQAB
-----END PUBLIC KEY-----
normal
The above PEM ASN.1-encoded message, holding the RSA public
key, can be decoded here: https://lapo.it/asn1js.
RSA Private Key - Example
Example of 2048-bit RSA private key, corresponding to the above
given public key (represented as hexadecimal 2048-bit integer
modulus n and 2048-bit secret exponent d):
normaln =
0xa709e2f84ac0e21eb0caa018cf7f697f774e96f8115fc2359e9cf60b1dd8d4048d974cd
d =
0x10f22727e552e2c86ba06d7ed6de28326eef76d0128327cd64c5566368fdc1a9f740ad8d
normal
The same RSA private key, encoded in the traditional for RSA format
PKCS#8 PEM ASN.1 looks a bit longer:
normal-----BEGIN RSA PRIVATE KEY-----
MIIEowIBAAKCAQEApwni+ErA4h6wyqAYz39pf3dOlvgRX8I1npz2Cx3Y1ASNl0zf
hCK+9r48FisEuRb36iEz8OPk4O7hZIWb2cHg7wNXwUL09jO0rdSquGyPiJXNM/v0
4CTZo61r5iZ1cLSnLSw0NU4BOedK2mZaFqJhFJDeu44TGmz/x+8l50JAgD3XGk/N
lTyYgRGwqpu8TFcCT8XoxEYq2QScfxq+2FnGNFX6bVi1zDSj0yBv90uelsM226zw
zdGO0MZnls4AqwfzayTL4zQlI/2CFajnf4noagjbkR8jdFk4je5kLa58smRKA+ce
1cb6UHfPQJD6+lVgSLU2uHmoj2KGmPDHtCDEtwIDAQABAoIBABDyJyflUuLIa6Bt
ftbeKDJu73bQEoMnzWTFVmNo/cGp90CtjdIhQZpVUPyMFLM/qfBYufpARHdar1xm
qZmn2k1P24FBwl7lKU6mpUMx0EXyXJpff0eWCsuuIPonq1ZpyA6vI1odCxwiuNdQ
oZHA8MmzVhqqSTSEcQE0OSDYTyQzTTrwX+3g41WRHH24uN479DWQfIVcPX7u3k8U
jfgwtD3TYLQ2kiOawQ5WbxOPtLMPsa8GA8/PDNit9DSaDQuTv4mATnwuJMp2FeUa
9m3M/bcaEgTiEHq77kJZ8srJF/r+OwKbrxPE3eeSPEfuP+wkg5AgOjhLnrdzwVRU
DFGWvOECgYEAyIk7F0S0AGn2aryhw9CihDfimigCxEmtIO5q7mnItCfeQwYPsX72
1fLpJNgfPc9DDfhAZ2hLSsBlAPLUOa0Cuny9PCBWVuxi1WjLVaeZCV2bF11mAgW2
fjLkAXT34IX+HZl60VoetSWq9ibfkJHeCAPnh/yjdB3Vs+2wxNkU8m8CgYEA1Tzm
mjJq7M6f+zMo7DpRwFazGMmrLKFmHiGBY6sEg7EmoeH2CkAQePIGQw/Rk16gWJR6
DtUZ9666sjCH6/79rx2xg+9AB76XTFFzIxOk9cm49cIosDMk4mogSfK0Zg8nVbyW
5nEb//9JCrZ18g4lD3IrT5VJoF4MhfdBUjAS1jkCgYB+RDIpv3+bNx0KLgWpFwgN
Omb667B6SW2ya4x227KdBPFkwD9HYosnQZDdOxvIvmUZObPLqJan1aaDR2Krgi1S
oNJCNpZGmwbMGvTU1Pd+Nys9NfjR0ykKIx7/b9fXzman2ojDovvs0W/pF6bzD3V/
FH5HWKLOrS5u4X3JJGqVDwKBgQCd953FwW/gujld+EpqpdGGMTRAOrXqPC7QR3X5
Beo0PPonlqOUeF07m9/zsjZJfCJBPM0nS8sO54w7ESTAOYhpQBAPcx/2HMUsrnIj
HBxqUOQKe6l0zo6WhJQi8/+cU8GKDEmlsUlS3iWYIA9EICJoTOW08R04BjQ00jS7

1A1AUQKBgHlHrV/6S/4hjvMp+30hX5DpZviUDiwcGOGasmIYXAgwXepJUq0xN6aa
lnT+ykLGSMMY/LABQiNZALZQtwK35KTshnThK6zB4e9p8JUCVrFpssJ2NCrMY3SU
qw87K1W6engeDrmunkJ/PmvSDLYeGiYWmEKQbLQchTxx1IEddXkK
-----END RSA PRIVATE KEY-----
normal
It holds the entire RSA key-pair structure, along with several
additional parameters: 2048-bit modulus n, 24-bit public exponent e,
2048-bit secret exponent d, first factor p, second factor q, and 3 other
integers from the RSA internal data structure:
The above PEM ASN.1-encoded message, holding the RSA private
key data, can be decoded here: https://lapo.it/asn1js.
RSA Cryptography: Encrypt a Message
Encrypting a message using certain RSA public key {n, e} is done
by the following transformation:
• encryptedMsg = (msg)e mod n
The msg here is a number in the range [0...n). Text messages should
be encoded as integers in the range [0...n) before encryption (see
EAOP). For larger texts, hybrid encryption should be used (encrypt a
secret key and use it to symmetrically encrypt the text, see RSA-KEM).
The above operation cannot be reversed: no efficient algorithm exists
to calculate msg from encryptedMsg, e and n (see the RSA problem),
which all are public (non-secret) by design.
RSA Cryptography: Decrypt a Message
Decrypting the encrypted message using the corresponding RSA
private key {n, d} is done by the following transformation:
• decryptedMsg = (encryptedMsg)d mod n

Why this is correct? Recall, that by definition the RSA key-pair has the
following property:
• (me)d ≡ m (mod n) for any m in the range [0...n)
From the encryption transformation we have:
• encryptedMsg = (msg)e mod n
Hence:
• decryptedMsg = (encryptedMsg)d mod n = ((msg)e mod n)d
= ((msg)e)d mod n = (msg) mod n = msg
RSA Encrypt and Decrypt - Example
Let examine one example of RSA encryption and decryption, along
with the calculations, following the above formulas. Assume we have
generated the RSA public-private key pair:
• modulus n = 143
• public exponent e = 7
• private exponent d = 103
• public key = {n, e} = {143, 7}
• private key = {n, d} = {143, 103}
Let's encrypt a secret message msg = 83. Just follow the formula:
• encryptedMsg = msge mod n = 837 mod 143 =
27136050989627 mod 143 = 8
Now, let's decrypt the encrypted message back to its original value:
• decryptedMsg = encryptedMsgd mod n = 8103 mod 143 =
104296241988325687616944419246560161845835181755695936032
mod 143 = 83
The RSA calculations work correctly. This is because the key-pair

---

## Sección 33: Core Concepts & Foundations [Entropy: 0.77]

meets the RSA property:
• (me)d ≡ m (mod n) for all m in the range [0...n)
• (m7)103 ≡ m (mod 143) for all m in the range [0...143)
In the real world, typically the RSA modulus n and the private
exponent d are 3072-bit or 4096-bit integers and the public exponent e
is 65537.
For further reading, look at this excellent explanation about how RSA
works in detail with explainations and examples: http://doctrina.org/
How-RSA-Works-With-Examples.html.
Because RSA encryption is a deterministic (has no random
component) attackers can successfully launch a chosen plaintext
attack against by encrypting likely plaintexts with the public key and
test if they are equal to the ciphertext. This may not be a problem, but
is a weakness, that should be considered when developers choose an
encryption scheme.
Hybrid encryption schemes like RSA-KEM solve this vulnerability and
allow encrypting longer texts.

RSA Encryption / Decryption -
Examples in Python
Now let's demonstrate how the RSA algorithms works by a simple
example in Python. The below code will generate random RSA keypair, will encrypt a short message and will decrypt it back to its
original form, using the RSA-OAEP padding scheme.
First, install the  pycryptodome  package, which is a powerful Python
library of low-level cryptographic primitives (hashes, MAC codes, keyderivation, symmetric and asymmetric ciphers, digital signatures):
normalpip install pycryptodome
normal
RSA Key Generation
Now, let's write the Python code. First, generate the RSA keys (1024-
bit) and print them on the console (as hex numbers and in the PKCS#8
PEM ASN.1 format):
normalfrom Crypto.PublicKey import RSA
from Crypto.Cipher import PKCS1_OAEP
import binascii
keyPair = RSA.generate(3072)
pubKey = keyPair.publickey()
print(f"Public key: (n={hex(pubKey.n)}, e={hex(pubKey.e)})")
pubKeyPEM = pubKey.exportKey()
print(pubKeyPEM.decode('ascii'))
print(f"Private key: (n={hex(pubKey.n)}, d={hex(keyPair.d)})")
privKeyPEM = keyPair.exportKey()
print(privKeyPEM.decode('ascii'))
normal

Run the above code example: https://repl.it/@nakov/RSA-Key-
Generation-in-Python.
We use short key length to keep the sample input short, but in a real
world scenario it is recommended to use 3072-bit or 4096-bit keys.
RSA Encryption
Next, encrypt the message using RSA-OAEP encryption scheme
(RSA with PKCS#1 OAEP padding) with the RSA public key:
normalmsg = b'A message for encryption'
encryptor = PKCS1_OAEP.new(pubKey)
encrypted = encryptor.encrypt(msg)
print("Encrypted:", binascii.hexlify(encrypted))
normal
Run the above code example: https://repl.it/@nakov/RSA-encryptionin-Python.
RSA Decryption
Finally, decrypt the message using
using RSA-OAEP with the RSA private
key:
normaldecryptor = PKCS1_OAEP.new(keyPair)
decrypted = decryptor.decrypt(encrypted)
print('Decrypted:', decrypted)
normal
Run the above code example: https://repl.it/@nakov/RSA-decryptionin-Python.

Sample Output
A sample output of the code execution for the entire example is given
below:
normalPublic key:
(n=0x9a11485bccb9569410a848fb1afdf2a81b17c1fa9f9eb546fd1deb873b49b693a4ed
e=0x10001)
-----BEGIN PUBLIC KEY-----
MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCaEUhbzLlWlBCoSPsa/fKoGxfB
+p+etUb9HeuHO0m2k6Tt8g64NiwIXNWyi6EJ260r0legE/V/dFQC4kWwzC1VPHsr
jbulfr2n+Ez7MrfZwlTwPb0BiOS45AxHtkwb0lcoNLk2/8PamVNlfvi+6AxJwsEp
M8ijSASgDrTIEkjgHwIDAQAB
-----END PUBLIC KEY-----
Private key:
(n=0x9a11485bccb9569410a848fb1afdf2a81b17c1fa9f9eb546fd1deb873b49b693a4ed
d=0x318ab12be3cf0d4a1b7921cead454fcc42ba070462639483394d6fb9529547827e9c8d
-----BEGIN RSA PRIVATE KEY-----
MIICXAIBAAKBgQCaEUhbzLlWlBCoSPsa/fKoGxfB+p+etUb9HeuHO0m2k6Tt8g64
NiwIXNWyi6EJ260r0legE/V/dFQC4kWwzC1VPHsrjbulfr2n+Ez7MrfZwlTwPb0B
iOS45AxHtkwb0lcoNLk2/8PamVNlfvi+6AxJwsEpM8ijSASgDrTIEkjgHwIDAQAB
AoGAMYqxK+PPDUobeSHOrUVPzEK6BwRiY5SDOU1vuVKVR4J+nI0jspSo4B+KEBna
NONQ8jB3QOBqJwvvH+ZG5q0hPjG1KP3V9dA+YzwHxEdV7WIqYp156CLAlevfnMgO
UXtVZt09PlsW7HN5hzN6Dkl/26S1rZevQcHDzdh1QqRjfYECQQDGDUIQXlOiAcGo
d5YqAGpWe0wzJ0UypeqZcqS9MVe9OkjjopCkkYntifdN/1oG7S/1KUMtLoGHqntb
c428zOO/AkEAxyV0cmuJbFdfM0x2XhZ+ge/7putIx76RHDOjBpM6VQXpLEFj54kB
qGLAB7SXr7P4AFrEjfckJOp2YMI5BreboQJAb3EUZHt/WeDdJLutzpKPQ3x7oykM
wfQkbxXYZvD16u96BkT6WO/gCb6hXs05zj32x1/hgfHyRvGCGjKKZdtwpwJBAJ74
y0g7h+wwoxJ0S1k4Y6yeQikxUVwCSBxXLCCnjr0ohsaJPJMrz2L30YtVInFkHOlL
i/Q4AWZmtDDxWkx+bYECQG8e6bGoszuX5xjvhEBslIws9+nMzMuYBR8HvhLo58B5
N8dk3nIsLs3UncKLiiWubMAciU5jUxZoqWpRXXwECKE=
-----END RSA PRIVATE KEY-----
Encrypted:
b'99b331c4e1c8f3fa227aacd57c85f38b7b7461574701b427758ee4f94b1e07d791ab70b
Decrypted: b'A message for encryption'
normal
Notes:
• If you run the above example, your output will be different,
because it generates different random RSA key-pair at each
execution.
• Even if you encrypt the same message several times with the
same public key, you will get different output. This is because
the OAEP padding algorithm injects some randomness with the
padding.
• If you try to encrypt larger messages, you will get and

exception, because the 1024-bit key limits the maximum
message length.
Now play with the above code, modify it and run it to learn how RSA
works in action.

Exercises: Encrypt / Decrypt
Messages using RSA
In this exercise you shall encrypt and decrypt messages using the
RSA public-key cryptosystem.
Encrypt Message with RSA-OAEP
You are given a text message and a RSA public key (in PEM
format). Write a program to encrypt the message, using the RSA-
OAEP encryption scheme (RSA + PKCS#1 OAEP padding).
Input:
• First line: the input message
• Next few lines: the RSA public key (in the PKCS#8 PEM ASN.1
format)
• The public key length can be 512 bits, 1024 bits, 2048 bits, 3072
bits or 4096 bits.
Output:
• The encrypted message, printed as hex string.
Write your code in programming language of choice.
Sample input:
normalSecret message
-----BEGIN PUBLIC KEY-----
MFwwDQYJKoZIhvcNAQEBBQADSwAwSAJBAMYhCcGpfoebriBbFaUMMwH3B5t7udir
ODJehnQTPlWLf9SVfQdx0v9ATJ2Rs5kQjdJ/wZYunMBVq6/FhgPZexsCAwEAAQ==
-----END PUBLIC KEY-----
normal

The above input uses a 512-bit RSA public key and a small plain text
message, that can fit inside the key length (after the OAEP padding).
Sample output (for the above input):
normal218dd78c5e14b4d58efd10575b521db46c0caa5c699134abf18bbeeac170cfe446e
normal
Note: the above output should be different at each execution due to
the randomness injected by the OAEP padding algorithm.
Decrypt a Message with RSA-OAEP
You are given a RSA-OAEP-encrypted ciphertext (as hex string) and a
RSA private key (in PEM format). Write a program to decrypt the
message, using the RSA-OAEP encryption scheme (RSA + PKCS#1
OAEP padding).
Input:
• First line: the ciphertext (the encrypted message), given as hex
string
• Next few lines: the RSA private key (in the PKCS#8 PEM
ASN.1 format)
Output:
• Print the decrypted message as plain text
• Print  Decryption failed!  in case of problem
Write your code in programming language of choice.
Sample input:
normal218dd78c5e14b4d58efd10575b521db46c0caa5c699134abf18bbeeac170cfe446e
-----BEGIN RSA PRIVATE KEY-----
MIIBOgIBAAJBAMYhCcGpfoebriBbFaUMMwH3B5t7udirODJehnQTPlWLf9SVfQdx
0v9ATJ2Rs5kQjdJ/wZYunMBVq6/FhgPZexsCAwEAAQJAbNSzBkTzMswqHq3Juupz
jk3CSP7ye/i5Grnfgx0a7WOGpVrEDQNo0iihEf5pRAfaazEdfJX2Tj+auuv06392

---

## Sección 34: Core Concepts & Foundations [Entropy: 0.608]

kQIhAOeJahRwOt8cYroLZzHHf7LWQglRaTbtKShqmbLdBZMzAiEA2xADyA3xGXcl
txN0DOfSycwFyqkdlfsuyAwKibPteHkCIQDJ1P6UzHR1UwA434HYYejOU3mDN+V4
zOoI4kwTIBohAwIgLrqv09EFiUUdSnxf2RDqqhlXcu+4W/IE/K904AL9uSECICeT
tkAnJHB7k6fvox6ErJV53w06bUF1jGw8yHuaCcHX
-----END RSA PRIVATE KEY-----
normal
The above input uses a 512-bit RSA private key and an encrypted
ciphertext of the same length.
Sample output (for the above input):
normalSecret message
normal
Another sample input (wrong 512-bit private key):
normal218dd78c5e14b4d58efd10575b521db46c0caa5c699134abf18bbeeac170cfe446e
-----BEGIN RSA PRIVATE KEY-----
MIIBOQIBAAJBAJd0kbrC4AxpcqBgWVPpb8IoI/kdQkF1twrfQtoMkHgB71vpY6Sg
68CUA7Ejq/dbAHlvFdXqwEK9vXH3kFpc8pcCAwEAAQJAaFrlXm2Pun2dgWthoTOi
0YCe6LKESF43dMJIab1mfYiltrSpGaoTXLvHR+NaAgqcr9KAH24Mi05ttUBcWRsI
QQIhAOLTSyeDZnq5rqdwBlU8p6USpeImRhWRNcCHA/QLxcaPAiEAqu+O1p1YB3Mp
GKgB9PvZE3TZqmlgtEFmSMYinF3g13kCIF9FjpCXMYkkysZLWG2e32+HaKOXneJb
Lq+iRjfQZg7jAiBcm6D1YRV6I8gWFZ/JzFBVHC95BdJgljYGI2JI+QuBcQIgLJjH
IPctSCUtukz+7fdeOdw/0FINcUGvnQyuEK34UxE=
-----END RSA PRIVATE KEY-----
normal
The corresponding output should be:
normalDecryption failed!
normal
Note that the RSA-OAEP padding algorithm has built-in checksum,
which allows to detect incorrect decryption attempts, but it is not an
authenticated encryption scheme.
* Implement Hybrid Encryption /
Decryption with RSA-KEM

Write a program to encrypt a large message (bigger than the RSA key
length, e.g. a PDF document) using the RSA-KEM hybrid encryption
scheme with AES symmetric encryption (use block mode of choice,
e.g. GCM or CTR).
Hint:
• Check this example first: https://github.com/digitalbazaar/
forge#rsakem.
• Note that in some languages it is hard to find and RSA-KEM
implementation, so you can skip this exercise or use another
hybrid encryption scheme (e.g. RSA + AES + HMAC).
Input:
• The message for encryption
• RSA public key (in PEM format)
Output:
• The encrypted ciphertext (hex string)
• The random IV salt for the AES cipher (hex string)
• The authentication tag / MAC for the encrypted message (hex
string)
• The encapsulated secret key for the AES algorithm (hex string)
Write a program to decrypt given encrypted message, produced by
the previous exercise, using the RSA-KEM hybrid encryption scheme
with AES symmetric encryption (use block mode of choice, e.g. GCM
or CTR).
Input:
• The encrypted ciphertext (hex string)
• The random IV salt for the AES cipher (hex string)
• The authentication tag / MAC for the encrypted message (hex
string)
• The encapsulated secret key for the AES algorithm (hex string)

Output:
• The decrypted original plaintext message
• Print  Decryption failed!  if the message decryption is not
successful (e.g. wrong password)

Elliptic Curve Cryptography (ECC) -
Concepts
The Elliptic Curve Cryptography (ECC) is modern family of publickey cryptosystems, which is based on the algebraic structures of the
elliptic curves over finite fields and on the difficulty of the Elliptic
Curve Discrete Logarithm Problem (ECDLP).
ECC implements all major capabilities of the asymmetric
cryptosystems: encryption, signatures and key exchange.
The ECC cryptography is considered a natural modern successor of
the RSA cryptosystem, because ECC uses smaller keys and
signatures than RSA for the same level of security and provides very
fast key generation, fast key agreement and fast signatures.
ECC Keys
The private keys in the ECC are integers (in the range of the curve's
field size, typically 256-bit integers). Example of 256-bit ECC private
key (hex encoded, 32 bytes, 64 hex digits) is:
 0x51897b64e85c3f714bba707e867914295a1377a7463a9dae8ea6a8b914246319 .
The key generation in the ECC cryptography is as simple as securely
generating a random integer in certain range, so it is extremely fast.
Any number within the range is valid ECC private key.
The public keys in the ECC are EC points - pairs of integer
coordinates {x, y}, laying on the curve. Due to their special properties,
EC points can be compressed to just one coordinate + 1 bit (odd or
even). Thus the compressed public key, corresponding to a 256-bit

ECC private key, is a 257-bit integer. Example of ECC public key
(corresponding to the above private key, encoded in the Ethereum
format, as hex with prefix  02  or  03 ) is:
 0x02f54ba86dc1ccb5bed0224d23f01ed87e4a443c47fc690d7797a13d41d2340e1a .
In this format the public key actually takes 33 bytes (66 hex digits),
which can be optimized to exactly 257 bits.
Curves and Key Length
ECC crypto algorithms can use different underlying elliptic curves.
Different curves provide different level of security (cryptographic
strength), different performance (speed) and different key length, and
also may involve different algorithms.
ECC curves, adopted in the popular cryptographic libraries and
security standards, have name (named curves, e.g.  secp256k1  or
 Curve25519 ), field size (which defines the key length, e.g. 256-bit),
security strength (usually the field size / 2 or less), performance
(operations/sec) and many other parameters.
ECC keys have length, which directly depends on the underlying
curve. In most applications (like OpenSSL, OpenSSH and Bitcoin) the
default key length for the ECC private keys is 256 bits, but depending
on the curve many different ECC key sizes are possible: 192-bit (curve
 secp192r1 ), 233-bit (curve  sect233k1 ), 224-bit (curve  secp224k1 ),
256-bit (curves  secp256k1  and  Curve25519 ), 283-bit (curve
 sect283k1 ), 384-bit (curves  p384  and  secp384r1 ), 409-bit (curve
 sect409r1 ), 414-bit (curve  Curve41417 ), 448-bit (curve
 Curve448-Goldilocks ), 511-bit (curve  M-511 ), 521-bit (curve  P-521 ),
571-bit (curve  sect571k1 ) and many others.
ECC Algorithms

Elliptic-curve cryptography (ECC) provides several groups of
algorithms, based on the math of the elliptic curves over finite fields:
• ECC digital signature algorithms like ECDSA (for classical
curves) and EdDSA (for twisted Edwards curves).
• ECC encryption algorithms and hybrid encryption schemes like
the ECIES integrated encryption scheme and EEECC (ECbased ElGamal).
• ECC key agreement algorithms like ECDH, X25519 and
FHMQV.
All these algorithms use a curve behind (like  secp256k1 ,  curve25519 
or  p521 ) for the calculations and rely of the difficulty of the ECDLP
(elliptic curve discrete logarithm problem). All these algorithms use
public / private key pairs, where the private key is an integer and the
public key is a point on the elliptic curve (EC point). Let's get into
details about the elliptic curves over finite fields.
Elliptic Curves
In mathematics elliptic curves are plane algebraic curves, consisting
of all points {x, y}, described by the equation:
Cryptography uses elliptic curves in a simplified form (Weierstras
form), which is defined as:
• y2 = x3 + ax + b
For example, the NIST curve  secp256k1  (used in Bitcoin) is based on
an elliptic curve in the form:
• y2 = x3 + 7 (the above elliptic curve equation, where a = 0 and b
= 7)
This is a visualization of the above elliptic curve:

---

## Sección 35: Core Concepts & Foundations [Entropy: 0.74]

To learn more about the equations of the elliptic curves and how they
look like, play a bit with this online elliptic curve visualization tool:
https://www.desmos.com/calculator/ialhd71we3.

Elliptic Curves over Finite Fields
The elliptic curve cryptography (ECC) uses elliptic curves over the
finite field ᵓp (where p is prime and p > 3) or ᵓ2m (where the fields
size p = 2m). This means that the field is a square matrix of size p x p
and the points on the curve are limited to integer coordinates within
the field only. All algebraic operations within the field (like point
addition and multiplication) result in another point within the field. The
elliptic curve equation over the finite field ᵓp takes the following
modular form:
• y2 ≡ x3 + ax + b (mod p)
Respectively, the "Bitcoin curve"  secp256k1  takes the form:
• y2 ≡ x3 + 7 (mod p)
Unlike RSA, which uses for its key space the integers in the range
[0...p-1] (the field ℤp), the ECC uses the points {x, y} within the Galois
field ᵓp (where x and y are integers in the range [0...p-1]).
An elliptic curve over the finite field ᵓp consists of:
• a set of integer coordinates {x, y}, such that 0 ≤ x, y < p
• staying on the elliptic curve: y2 ≡ x3 + ax + b (mod p)

Example of elliptic curve over the finite field ᵓ17:
• y2 ≡ x3 + 7 (mod 17)
This elliptic curve over ᵓ17 looks like this:
Note that the elliptic curve over finite field y2 ≡ x3 + 7 (mod 17)
consists of the blue points at the above figure, i.e. in practice the
"elliptic curves" used in cryptography are "sets of points in square
matrix", not classical "curves".
The above curve is "educational". It provides very small key length
(4-5 bits). In the real world developers typically use curves of 256-bits
or more.

Elliptic Curves over Finite Fields: Calculations
It is pretty easy to calculate whether certain point belongs to certain
elliptic curve over a finite field. For example, a point {x, y} belongs to
the curve y2 ≡ x3 + 7 (mod 17) when and only when:
• x3 + 7 - y2 ≡ 0 (mod 17)
The point P {5, 8} belongs to the curve, because
 (5**3 + 7 - 8**2) % 17 == 0 . The point {9, 15} does not belong to
the curve, because  (9**3 + 7 - 15**2) % 17 != 0 . These calculations
are in Python style. The above mentioned elliptic curve and the points
{5, 8} and {9, 15} are visualized below:

Multiplying ECC Point by Integer
Two points over an elliptic curve (EC points) can be added and the
result is another point. This operation is known as EC point addition.
If we add a point G to itself, the result is G + G = 2 * G. If we add G
again to the result, we will obtain 3 * G and so on. This is how EC
point multiplication is defined.
A point G over an elliptic curve over finite field (EC point) can be
multiplied by an integer k and the result is another EC point P on the
same curve and this operation is fast:
• P = k * G
The above operation involves some formulas and transformations, but
for simplicity, we shall skip them. The important thing to know is that
multiplying EC point by integer returns another EC point on the
same curve and this operation is fast. Multiplying an EC point by 0
returns a special EC point called "infinity".
Everyone is free to read more about EC point multiplication in
Wikipedia.
Example: Multiply EC Point by Integer
The formulas for EC multiplication differ for the different forms of
representation of the curve. In this example, we shall use an elliptic
curve in the classical Weierstrass form.
For example let's take the EC point G = {15, 13} on the elliptic curve
over finite field y2 ≡ x3 + 7 (mod 17) and multiply it by k = 6. We shall
obtain an EC point P = {5, 8}:
• P = k * G = 6 * {15, 13} = {5, 8}
The below figure visualizes this example of EC point multiplication:

Order and Cofactor of Elliptic Curve
Аn elliptic curve over a finite field can form a finite cyclic algebraic
group, which consists of all the points on the curve. In a cyclic group,
if two EC points are added or an EC point is multiplied to an integer,
the result is another EC point from the same cyclic group (and on the
same curve). The order of the curve is the total number of all EC
points on the curve. This total number of points includes also the
special point called "point at infinity", which is obtained when a point
is multiplied by 0.
Some curves form a single cyclic group (holding all their EC points),
while others form several non-overlapping cyclic subgroups (each
holding a subset of the curve's EC points). In the second scenario the

points on the curve are split into h cyclic subgroups (partitions), each
of order r (each subgroup holds equal number of points). The order of
entire group is n = h * r (the number of subgroups, multiplied by the
number of points in each subgroup). The number of subgroups h
holding the EC points is called cofactor.
The cofactor is typically expressed by the following formula:
• h = n / r
where
• n is the order of the curve (the number of all its points)
• h is the curve cofactor (the number of non-overlapping
subgroups of points, which together hold all curve points)
• r is the order of the subgroups (the number of points in each
subgroup, including the infinity point for each subgroup)
In other words, the points over an elliptic curve stay in one or several
non-overlapping subsets, called cyclic subgroups. The number of
subgroups is called "cofactor". The total number of points in all
subgroups is called "order" of the curve and is usually denoted by n. If
the curve consists of only one cyclic subgroup, its cofactor h = 1. If
the curve consists of several subgroups, its cofactor > 1.
• Example of elliptic curve having cofactor = 1 is  secp256k1 .
• Example of elliptic curve having cofactor = 8 is  Curve25519 .
• Example of elliptic curve having cofactor = 4 is  Curve448 .
The "Generator" Point in ECC
For the elliptic curves over finite fields, the ECC cryptosystems define

a special pre-defined (constant) EC point called generator point G
(base point), which can generate any other point in its subgroup
over the elliptic curve by multiplying G by some integer in the range
[0...r]. The number r is called "order" of the cyclic subgroup (the total
number of all points in the subgroup).
For curves with cofactor = 1 there is only one subgroup and the
order n of the curve (the total number of different points over the curve,
including the infinity) is equal to the number r.
When G and n are carefully selected, and the cofactor = 1, all
possible EC points on the curve (including the special point infinity)
can be generated from the generator G by multiplying it by integer in
the range [1...n]. This integer n is known as "order of the curve".
It is important to know that the order r of the subgroup, obtained from
certain EC generator point G (which may be different from the order of
the curve) defines the total number of all possible private keys for
this curve: r = n / h (curve order, divided by the curve cofactor).
Cryptographers select carefully the elliptic curve domain parameters
(curve equation, generator point, cofactor, etc.) to ensure that the key
space is large enough for certain cryptographic strength.
To summarize, in the ECC cryptography the EC points, together with
the generator point G form cyclic groups (or cyclic subgroups),
which means that a number r exists (r > 1), such that r * G = 0 * G =
infinity and all points in the subgroup can be obtained by multiplying G
by integer in the range [1...r]. The number r is called order of the
group (or subgroup).

---

## Sección 36: Core Concepts & Foundations [Entropy: 0.725]

Elliptic curve subgroups usually have many generator points, but
cryptographers carefully select one of them, which generates the entire
group (or subgroup) and is suitable for performance optimizations in
the computations. This is the generator known as "G".
It is known that for some curves different generator points generate

subgroups of different order. More precisely, if the group order is n, for
each prime d dividing n, there is a point Q such that d * Q = infinity.
This means that some points used as generators for the same curve
will generate smaller subgroups than others. if the group is small, the
security is weak. This is known as "small-subgroup" attacks. This is
the reason why cryptographers usually choose the subgroup order r
to be a prime number.
For elliptic curves with cofactor h > 1, different base points can
generate different subgroups of EC points on the curve. By choosing
a certain generator point, we choose to operate over a certain
subgroup of points on the curve and most EC point operations and
ECC crypto algorithms will work well. Still in some cases, special
attention should be given, so it is recommended to use only proven
ECC implementations, algorithms and software packages.
Generator Point - Example
At the above example (the EC over finite field y2 ≡ x3 + 7 mod 17), if
we take the point G = {15, 13} as generator, any other point from the
curve can be obtained by multiplying G by some integer in the range
[1...18]. Thus the order of this EC is n = 18 and its cofactor h = 1.
Note that the curve has 17 normal EC points (shown at the above
figures) + one special "point at infinity", all staying in a single
subgroup, and the curve order is 18 (not 17).
Note also, that if we take the point {5, 9} as generator, it will generate
just 3 EC points: {5, 8}, {5, 9} and infinity. Because the curve order is
not prime number, different generators may generate subgroups of
different order. This is a good example why we should not "invent" our
own elliptic curves for cryptographic purposes and we should use
proven curves.
Private Key, Public Key and the Generator

Point in ECC
In the ECC, when we multiply a fixed EC point G (the generator point)
by certain integer k (k can be considered as private key), we obtain
an EC point P (its corresponding public key).
Consequently, in ECC we have:
• Еlliptic curve (EC) over finite field ᵓp
• G == generator point (fixed constant, a base point on the EC)
• k == private key (integer)
• P == public key (point)
It is very fast to calculate P = k * G, using the well-known ECC
multiplication algorithms in time log2(k), e.g. the "double-and-add
algorithm". For 256-bit curves, it will take just a few hundreds simple
EC operations.
It is extremely slow (considered infeasible for large k) to calculate k =
P / G.
This asymmetry (fast multiplication and infeasible slow opposite
operation) is the basis of the security strength behind the ECC
cryptography, also known as the ECDLP problem.
Elliptic-Curve Discrete Logarithm Problem
(ECDLP)
The Elliptic Curve Discrete Logarithm Problem (ECDLP) in
computer science is defined as follows:
• By given elliptic curve over finite field ᵓp and generator point G
on the curve and point P on the curve, find the integer k (if it
exists), such that P = k * G
For carefully chosen (by cryptographers) finite fields and elliptic
curves, the ECDLP problem has no efficient solution.

The multiplication of elliptic curve points in the group ᵓp is similar to
exponentiation of integers in the group ℤp (this is known as
multiplicative notation) and this is how the ECDLP problem is similar
to the DLP problem (discrete logarithm problem).
In the ECC cryptography, many algorithms rely on the computational
difficulty of the ECDLP problem over carefully chosen field ᵓp and
elliptic curve, for which no efficient algorithm exists.
ECC and Curve Security Strength
Because the fastest known algorithm to solve the ECDLP for key of
size k needs k\sqrt{k}
√
k
steps, this means that to achieve a k-bit security strength, at least
2*k-bit curve is needed. Thus 256-bit elliptic curves (where the field
size p is 256-bit number) typically provide nearly 128-bit security
strength.
In fact, the strength is slightly less, because the order of the curve
(n) is typically less than the fields size (p) and because the curve may
have cofactor h > 1 (and subgroup order r = n / h, smaller than n) and
because the number of steps is not exactly k\sqrt{k}
√
k
, but is 0.886∗k0.886 * \sqrt{k}
0.886∗√
k
. A precise security strength estimation for the most popular
standard elliptic curves is given here: http://safecurves.cr.yp.to/
rho.html.

For example, the  secp256k1  (p = 256) curve provides ~ 128-bit
security (127.8 bits to be precise) and the  Curve448  (p = 448)
provides ~ 224-bit security (222.8 bits to be precise).
Multiplication of EC Points - Example in
Python
Now, after all the concepts, let's write some code. We shall use the
Python library  tinyec , which provides ECC primitives, such as cyclic
groups (the  SubGroup  class), elliptic curves over finite fields (the
 Curve  class) and EC points (the  Point  class). First, install the
package  tinyec :
normalpip install tinyec
normal
We shall play with the educational curve from our previous examples
y2 ≡ x3 + 7 (mod 17), with the generator point G = {15, 13}, which has
order of n = 18. We shall name it  p1707 .
normalfrom tinyec.ec import SubGroup, Curve
field = SubGroup(p=17, g=(15, 13), n=18, h=1)
curve = Curve(a=0, b=7, field=field, name='p1707')
print('curve:', curve)
for k in range(0, 25):
 p = k * curve.g
 print(f"{k} * G = ({p.x}, {p.y})")
normal
Run the above code example: https://repl.it/@nakov/EC-points-in-
Python. The above code demonstrates the EC multiplication. It
multiplies the generator point G by 0, 1, 2, ..., 24. The output from the
above program is as follows:
normalcurve: "p1707" => y^2 = x^3 + 0x + 7 (mod 17)
0 * G = (None, None)
1 * G = (15, 13)

2 * G = (2, 10)
3 * G = (8, 3)
4 * G = (12, 1)
5 * G = (6, 6)
6 * G = (5, 8)
7 * G = (10, 15)
8 * G = (1, 12)
9 * G = (3, 0)
10 * G = (1, 5)
11 * G = (10, 2)
12 * G = (5, 9)
13 * G = (6, 11)
14 * G = (12, 16)
15 * G = (8, 14)
16 * G = (2, 7)
17 * G = (15, 4)
18 * G = (None, None)
19 * G = (15, 13)
20 * G = (2, 10)
21 * G = (8, 3)
22 * G = (12, 1)
23 * G = (6, 6)
24 * G = (5, 8)
normal
It is visible that 0 * G = infinity. It is also clearly visible, that the EC
group is cyclic and the order of the EC group is n = 18, because
starting from k = 18, the next points repeat the first ones:
• 18 * G = 0 * G = infinity
• 19 * G = 1 * G = {15, 13}
• 20 * G = 2 * G = {2, 10}
• 21 * G = 3 * G = {8, 3}
• etc.
The EC points, generated by multiplying the generator point G by 2, 3,
4, ..., 17 are shown on the figure below:

---

## Sección 37: Core Concepts & Foundations [Entropy: 0.695]

Let's modify a bit the above example and change the generator point
to be G' = {5, 9}. This will change significantly the output:
normalfrom tinyec.ec import SubGroup, Curve
field = SubGroup(p=17, g=(5, 9), n=18, h=1)
curve = Curve(a=0, b=7, field=field, name='p1707')
print('curve:', curve)
for k in range(0, 25):
 p = k * curve.g
 print(f"{k} * G' = ({p.x}, {p.y})")
normal
Run the above code example: https://repl.it/@nakov/EC-points-bygenerator-point-in-Python. The output shows that the subgroup order
of the new generator point is not 18, but is 3. This is possible, because
18 is not prime. It is clear from the output, that 3 * G' = infinity and

the obtained subgroup order is 3:
normalcurve: "p1707" => y^2 = x^3 + 0x + 7 (mod 17)
0 * G' = (None, None)
1 * G' = (5, 9)
2 * G' = (5, 8)
3 * G' = (None, None)
4 * G' = (5, 9)
5 * G' = (5, 8)
6 * G' = (None, None)
...
normal
The above example again confirms that designing an elliptic curve for
cryptography should be done by cryptographers, not by developers.
Developers should rely on well established crypto-standards and
proven crypto-libraries.
Multiplication of EC Points - Real-World
Example in Python
Now, let's write a real-world example. Instead of using our
educational curve  p1707  (4-5-bit curve, p = 17), we shall use the 192-
bit cryptographic curve  secp192r1  (192-bit, p =
6277101735386680763835789423207666416083908700390324961279).
The below example is similar to the previous:
normalfrom tinyec import registry
curve = registry.get_curve('secp192r1')
print('curve:', curve)
for k in range(0, 10):
 p = k * curve.g
 print(f"{k} * G = ({p.x}, {p.y})")
print("Cofactor =", curve.field.h)
print('Cyclic group order =', curve.field.n)
nG = curve.field.n * curve.g
print(f"n * G = ({nG.x}, {nG.y})")
normal

Run the above code example: https://repl.it/@nakov/EC-points-in-realworld-in-Python. The output is also similar to the previous example:
normalcurve: "secp192r1" => y^2 = x^3 +
6277101735386680763835789423207666416083908700390324961276x +
2455155546008943817740293915197451784769108058161191238065 (mod
6277101735386680763835789423207666416083908700390324961279)
0 * G = (None, None)
1 * G =
(602046282375688656758213480587526111916698976636884684818,
174050332293622031404857552280219410364023488927386650641)
2 * G =
(5369744403678710563432458361254544170966096384586764429448,
5429234379789071039750654906915254128254326554272718558123)
3 * G =
(2915109630280678890720206779706963455590627465886103135194,
2946626711558792003980654088990112021985937607003425539581)
4 * G =
(1305994880430903997305943738697779408316929565234787837114,
3981863977451150342116987835776121688410789618551673306674)
5 * G =
(410283251116784874018993562136566870110676706936762660240,
1206654674899825246688205669651974202006189255452737318561)
6 * G =
(4008504146453526025173196900303594155799995627910231899946,
3263759301305176906990806636587838100022690095020155627760)
7 * G =
(3473339081378406123852871299395262476289672479707038350589,
2152713176906603604200842901176476029776544337891569565621)
8 * G =
(1167950611014894512313033362696697441497340081390841490910,
4002177906111215127148483369584652296488769677804145538752)
9 * G =
(3176317450453705650283775811228493626776489433309636475023,
44601893774669384766793803854980115179612118075017062201)
Cofactor = 1
Cyclic group order =
6277101735386680763835789423176059013767194773182842284081
n * G = (None, None)
normal
The curve  secp192r1  uses a cyclic group of very large order n =
6277101735386680763835789423176059013767194773182842284081
(prime number) with cofactor h = 1, and as we can expect, n * G =
infinity, just like at the previous example with our educational curve.
Now, let's generate a random private key  privKey  (integer in the
range [0...n-1]) and its corresponding public key
 pubKey = privKey * G :

normalfrom tinyec import registry
import secrets
curve = registry.get_curve('secp192r1')
privKey = secrets.randbelow(curve.field.n)
pubKey = privKey * curve.g
print("private key:", privKey)
print("public key:", pubKey)
normal
Run the above code example: https://repl.it/@nakov/EC-points-privatepublic-keys-in-Python. The above code will produce output like this:
normalprivate key:
4225655318977962031264230130242180748818603147467615868902
public key:
(5396030834456770190396776530938374882273836179487834152291,
3422160588166914010077732710830109086004758012634997793937) on
"secp192r1" => y^2 = x^3 +
6277101735386680763835789423207666416083908700390324961276x +
2455155546008943817740293915197451784769108058161191238065 (mod
6277101735386680763835789423207666416083908700390324961279)
normal
Later we shall use such pairs of ECC keys {private key, public key} to
encrypt data, sign messages and verify signatures.
Note that in real projects, 192-bit curves are considered weak, so
256-bit curves are recommended (or more bits), where the keys are
also 256-bits (or respectively more). We use 192-bit curve in the above
example just to make the sample output smaller.
Public Key Compression in the Elliptic Key
Cryptosystems
Elliptic curves over finite fields ᵓp (in the Weierstrass form) have at
most 2 points per y coordinate (odd x and even x). This property
comes from the nature of the elliptic curve equation and is illustrated at
the below graph:

Due to this property, an elliptic curve point (and respectively an ECC
public key) P {x, y} can be compressed as C {x, odd/even). This
means to erase the y coordinate from the point and represent it as 1
bit (odd y or even y).
Compressed EC point is an EC point {x, y} represented in its shorter
form {x, odd / even}. ECC public keys are EC points, so they can
also be compressed in the same way.
To decompress a point, we can calculate its two possible y
coordinates by the formulas:
• y1 = mod_sqrt(x3 + ax + b, p)
• y2 = p - mod_sqrt(x3 + ax + b, p)

Then we take the odd or even from the above coordinates (according
to the additional parity bit in the compressed representation).
The modular square root (mod_sqrt) can be calculated using the
Tonelli–Shanks algorithm.
Let's take an example: at the elliptic curve y2 ≡ x3 + 7 (mod 17) the
point P {10, 15} can be compressed as C {10, odd}. For
decompression, we first calculate the two possible y coordinates for x
= 10 using the above formulas: y1 = 2 and y2 = 15. Then we choose
the odd one: y = 15. The decompressed point is {10, 15}.
Compressing a EC Point / Public Key -
Example in Python
The code below implements public key compression and
decompression in Python. It uses a library called  nummaster  for the
"modular square root" function, which is unavailable in Python. First
install the  nummaster  package:
normalpip install nummaster
normal
Now implement the EC point compression and decompression
functions in Python:
normalfrom nummaster.basic import sqrtmod
def compress_point(point):
 return (point[0], point[1] % 2)
def uncompress_point(compressed_point, p, a, b):
 x, is_odd = compressed_point
 y = sqrtmod(pow(x, 3, p) + a * x + b, p)
 if bool(is_odd) == bool(y & 1):
 return (x, y)
 return (x, p - y)
normal
Finally, compress and decompress the point {10, 15} on the curve y2 ≡

---

## Sección 38: Core Concepts & Foundations [Entropy: 0.695]

x3 + 7 (mod 17), just as an example:
normalp, a, b = 17, 0, 7
point = (10, 15)
print(f"original point = {point}")
compressed_p = compress_point(point)
print(f"compressed = {compressed_p}")
restored_p = uncompress_point(compressed_p, p, a, b)
print(f"uncompressed = {restored_p}")
normal
Run the above code example: https://repl.it/@nakov/EC-pointcompression-decompression-in-Python. The output of the above code
is:
normaloriginal point = (10, 15)
compressed = (10, 1)
uncompressed = (10, 15)
normal
Elliptic Curve Domain Parameters for ECC
ECC elliptic curves are described by a set of elliptic curve domain
parameters, such as the curve equation parameters, the field
parameters and the generator point coordinates. These parameters
are specified in cryptography standards, such as:
• SEC 2: Recommended Elliptic Curve Domain Parameters
• NIST FIPS PUB 186-4 Digital Signature Standard (DSS)
• Brainpool ECC Standard (RFC-5639)
These standards define the parameters for a set of named curves,
such as  secp256k1 ,  P-521  and  brainpoolP512t1 . The elliptic curves
over finite fields, described in these crypto standards are well
researched and analysed by cryptographers and are considered to
have certain security strength, also described in these standards.
Some cryptographers (like Daniel Bernstein) believe that most of the
curves, described in the official crypto-standards are "unsafe" and

define their own crypto-standards, which consider the ECC security
in much broader level.
The Bernstein's SafeCurves standard lists the curves, which are safe
according to a set of ECC security requirements. The standard is
available at https://safecurves.cr.yp.to.
Choosing an Elliptic Curve for ECC
To use ECC all communicating parties should agree on the EC domain
parameters (all the elements defining the elliptic curve). It is highly
recommended to use a named curve from the above standards with
at least 256-bit modulus. Standard curves are well studied by
cryptographers to guarantee their security strength.
Don't use own elliptic curve (with non-standard domain parameters),
unless you are experienced cryptographer and you know very well
what are you doing! Many curves have weaknesses, which make the
ECDLP problem not so difficult and compromise the security. If you are
afraid of backdoored curves, use a standard safe curve from the
SafeCurves list.
Named Curves - Example
In ECC cryptography, elliptic curves over the finite fields are used,
where the modulus p and the order n are very large integers (n is
usually prime number), e.g. 256-bit number. The finite field of the
curve is of square form of size p x p, which is incredibly large, and all
possible EC points on the curve (the order of the curve n) is also a
very big integer, e.g. 256-bit. For example, the domain parameters for
the curve  secp256k1  (the Bitcoin curve) are defined as follows:
• p (modulus) =
 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEFFFFFC2F 
• n (order; size; the count of all possible EC points) =

 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEBAAEDCE6AF48A03BBFD25E8CD0364141 
• a (the constant "a" in y^2 ≡ x^3 + a*x + b (mod p)) =
 0x0000000000000000000000000000000000000000000000000000000000000000 
• b (the constant "b" in y^2 ≡ x^3 + a*x + b (mod p)) =
 0x0000000000000000000000000000000000000000000000000000000000000007 
• g (the curve generator point G {x, y}) =
( 0x79BE667EF9DCBBAC55A06295CE870B07029BFCDB2DCE28D959F2815B16F81798 ,
 0x483ada7726a3c4655da4fbfc0e1108a8fd17b448a68554199c47d08ffb10d4b8 )
• h (cofactor, typically 1) = 01
We already know that a 256-bit curve (which means that p and n are
256-bit numbers) provides 128-bit security strength, which means
that to find the private key from the public key or signature, the best
known non-quantum algorithm will take approximately 2128
operations. The above-defined ECC curve  secp256k1  has 128-bit
strength.
Python Examples with the "secp256k1" Curve
Now let's put in action the above domain parameters for the
 secp256k1  curve. Let's define the EC and calculate the public key for
certain private key:
normalfrom tinyec.ec import SubGroup, Curve
# Domain parameters for the `secp256k1` curve
# (as defined in http://www.secg.org/sec2-v2.pdf)
name = 'secp256k1'
p =
0xfffffffffffffffffffffffffffffffffffffffffffffffffffffffefffffc2f
n =
0xfffffffffffffffffffffffffffffffebaaedce6af48a03bbfd25e8cd0364141
a =
0x0000000000000000000000000000000000000000000000000000000000000000
b =
0x0000000000000000000000000000000000000000000000000000000000000007
g =
(0x79be667ef9dcbbac55a06295ce870b07029bfcdb2dce28d959f2815b16f81798,
 
0x483ada7726a3c4655da4fbfc0e1108a8fd17b448a68554199c47d08ffb10d4b8)
h = 1
curve = Curve(a, b, SubGroup(p, g, n, h), name)
print('curve:', curve)

privKey =
int('0x51897b64e85c3f714bba707e867914295a1377a7463a9dae8ea6a8b914246319',
16)
print('privKey:', hex(privKey)[2:])
pubKey = curve.g * privKey
pubKeyCompressed = '0' + str(2 + pubKey.y % 2) +
str(hex(pubKey.x)[2:])
print('pubKey:', pubKeyCompressed)
normal
Run the above code example: https://repl.it/@nakov/secp256k1-curvein-Python. The above code defines the  secp256k1  curve through its
domain parameters and calculates a public key by given private key.
This is done by multiplying the curve generator G by the private key.
The result is correct, like it is visible from the program output:
normalcurve: "secp256k1" => y^2 = x^3 + 0x + 7 (mod
1157920892373161954235709850086879078532699846656405640394575840079088346
privKey:
51897b64e85c3f714bba707e867914295a1377a7463a9dae8ea6a8b914246319
pubKey:
02f54ba86dc1ccb5bed0224d23f01ed87e4a443c47fc690d7797a13d41d2340e1a
normal
The public key is compressed and encoded in the standard format
(encode the y coordinate as prefix  02  or  03 ).
Edwards Curves
Elliptic curves in the elliptic curve cryptography (ECC) may be
presented in several forms (representations), which are proven to be
birationally equivalent (isomorphic):
• Weierstrass form of elliptic curve:
○ y2 = x3 + ax + b
○ Example Weierstrass curve used in ECC is  secp256k1 ,
which has the form y2 = x3 + 7
• Montgomery form of elliptic curve:

---

## Sección 39: Core Concepts & Foundations [Entropy: 0.695]

○ By2 = x3 + Ax2 + x
○ Example Montgomery curve used in ECC is  Curve25519 ,
which has the form y2 = x3 + 486662x2 + x
• Edwards form of elliptic curve:
○ x2 + y2 = 1 + dx2y2
○ Example Edwards curve used in ECC is  Curve448 , which
has the form x2 + y2 = 1 - 39081x2y2
For performance reasons elliptic curve cryptography (ECC) sometimes
uses Edwards curves, which are elliptic curves in the following form:
• x2 + y2 = 1 + dx2y2
For example, if d = 300, the Edwards curve x2 + y2 = 1 + 300x2y2
looks like this:

Every Edwards curve is birationally equivalent to an elliptic curve in
Weierstrass form (y2 = x3 + ax + b) and thus has the same properties
like the classical elliptic curves.
Edwards curves over a finite prime field ᵓp (where p is large prime
number) provide fast integer to EC point multiplication, which has
similar cryptographic properties like the classical elliptic curves, and
the ECDLP problem has the same computational difficulty, suitable for
cryptographic purposes.
Examples of well-known cryptographic elliptic Edwards curves over
finite prime fields are: Curve1174 (251-bit), Curve25519 (255-bit),
Curve383187 (383-bit), Curve41417 (414-bit), Curve448 (448-bit),
E-521 (521-bit) and others.

Curve25519, X25519 and Ed25519
With carefully selected curve parameters, the Edwards curves over
finite fields can implement ECC cryptosystems capable to provide
ECDH key agreement schemes, digital signatures and hybrid
encryption schemes, with very high performance.
For example, the  Curve25519  is the Edwards curve, defined by the
following elliptic curve equation in Montgomery form:
• y2 = x3 + 486662x2 + x
over the finite prime field ᵓp, where p = 2255 - 19 (the curve is 255-
bit).
In fact, the above equation does not match directly the Edwards curve
equation, but it is proven to be birationally equivalent to the following
twisted Edwards curve (known as edwards25519):
• -x2 + y2 = 1 +
37095705934669439343138083508754565189542113879843219016
The elliptic curve Curve25519 consists of all points {x, y} with integer
coordinates, defined by the modular equation:
• y2 ≡ x3 + 486662x2 + x (mod 2255 - 19)
The above equation has its equivalent in the classical Weierstrass
form for the elliptic curves (y2 = x3 + ax + b), but the above form is
designed especially for speed optimizations.
The Curve25519 is carefully engineered, by a team of cryptographers,
led by Daniel Bernstein, at several levels of design and implementation
to achieve very high speeds without compromising security.
The Curve25519 has order (in its underlying cyclic group) n = 2252 +
0x14def9dea2f79cd65812631a5cf5d3ed and cofactor h = 8 and
provides 125.8-bit security strength (it is sometimes referred as ~

128-bit security). The private keys for the Curve25519 are 251 bits
and are usually encoded as 256-bit integers (32 bytes, 64 hex digits).
The public keys are typically encoded also as 256-bit integers (255-
bit y-coordinate + 1-bit x-coordinate) and this is very convenient for
developers.
Based on the Curve25519 an ECDH function is derived, called
X25519 (used for elliptic-key Diffie–Hellman key agreement schemes)
and fast digital signature scheme is derived, called Ed25519, based
on the the EdDSA algorithm. These schemes are very fast, because
they involve multiplications and other simple operations with small
integers (mostly 32-bit arithmetic), which can be efficiently
implemented in the modern microprocessors (CPUs). Note that
X25519 and Ed25519 use different encodings for the EC points, so
they are not directly compatible and require conversion if you want to
use the same public-private key pairs.
Curve448, X448 and Ed448
The  Curve448  (Curve448-Goldilocks) is an untwisted Edwards
curve, defined by the equation:
• x2 + y2 = 1 - 39081x2y2
over the finite prime field ᵓp, where p = 2448 - 2224 - 1. It has order of
n = 2446 -
0x8335dc163bb124b65129c96fde933d8d723a70aadc873d6d54a7bb0d
and cofactor h = 4. Like any other Edwards curve, the Curve448 has
equivalent in the Weierstrass form (y2 = x3 + ax + b), but the above
Edwards form provides significant optimizations in the EC point
calculations and improved performance.
The Curve448 provides ~ 224-bit security level (more precisely
222.8-bits). The private keys for the Curve448 are 446 bits and are
typically encoded as 448-bit integers (56 bytes, 112 hex digits). The

public keys are also encoded as 448-bit integers.
The Curve448 is suitable for ECDH key agreement (ECDH function,
known as X448) and for fast digital signatures (EdDSA algorithm,
known as Ed448 or edwards448). Note that X448 and Ed448 use
different encodings for the EC points, so they are not directly
compatible and require conversion if you want to use the same publicprivate key pairs.
Curve25519 or Curve448?
Prefer Curve448 to Curve25519 when your application needs a
higher level of security, but have in mind that Curve448 is about 3
times slower than Curve25519 and uses longer key length and
signature length.
Prefer Curve25519 to Curve448 when you need better performance
and smaller keys and signatures.
Learn more about the Curve25519 and Curve448 from the technical
perspective from:
• RFC 7748 - Elliptic Curves for Security - the Internet technical
standard for implementing the X25519 and X448 key exchange
protocols.
• RFC 8032 - Edwards-Curve Digital Signature Algorithm (EdDSA)
- the Internet technical standard for implementing the the
Ed25519 and EdDSA-Ed448 signature schemes.
In the general case, have in mind that Curve25519 is faster than
secp256k1 and the other 256-bit standard NIST curves and is
considered more secure, so it is the recommended choice for ~ 128-bit
security. Similarly, the Curve448 has better performance than the
classical curves with similar key length, so it is the recommended
curve for ~ 224-bit security.

Curve25519 - Example in Python
To demonstrate the elliptic curve Curve25519 in practice, we shall first
install the  pynacl  crypto library for Python:
normalpip install pynacl
normal
The Python binding to the Networking and Cryptography (NaCl) library
(PyNaCl) implements many modern cryptographic algorithms,
including the EC point arithmetic over the Curve25519 and Ed25519
signatures.
Next, generate a random 252-bit private key and its corresponding
public key (EC point) on the Curve25519 (both keys will be encoded
internally as 256-bit integers):
normalfrom nacl.public import PrivateKey
import binascii
privKey = PrivateKey.generate()
pubKey = privKey.public_key
print("privKey:", binascii.hexlify(bytes(privKey)))
print("pubKey: ", binascii.hexlify(bytes(pubKey)))
normal
Run the above code example: https://repl.it/@nakov/Curve25519-in-
Python. The sample output from the above code shows that both the
public and the private (secret) keys on the Curve25519 are encoded
as 256-bit integers (64 hex digits, 32 bytes) and this simplifies the
developers:
normalprivKey:
b'8175f7cd524a59b6efbd447985ce5d97c546b319521ff236203970e50052c641'
pubKey: 
b'cf97a96568fee4ddb232f617fd5b9df2d2e5b90e68ba7f6d5129ea92d7d8f95e'
normal
In fact, different crypto libraries may use different key encodings and

---

## Sección 40: Core Concepts & Foundations [Entropy: 0.665]

typically X25519 ECDH keys are encoded differently than Ed25519
keys (Montgomery curve coordinates vs. twisted Edwards curve
coordinates).

ECDH Key Exchange (Elliptic Curve
Diffie–Hellman Key Exchange)
The ECDH (Elliptic Curve Diffie–Hellman Key Exchange) is
anonymous key agreement scheme, which allows two parties, each
having an elliptic-curve public–private key pair, to establish a shared
secret over an insecure channel. ECDH is very similar to the classical
DHKE (Diffie–Hellman Key Exchange) algorithm, but it uses ECC
point multiplication instead of modular exponentiations. ECDH is
based on the following property of EC points:
• (a * G) * b = (b * G) * a
If we have two secret numbers a and b (two private keys, belonging
to Alice and Bob) and an ECC elliptic curve with generator point G, we
can exchange over an insecure channel the values (a * G) and (b * G)
(the public keys of Alice and Bob) and then we can derive a shared
secret: secret = (a * G) * b = (b * G) * a. Pretty simple. The above
equation takes the following form:
• alicePubKey * bobPrivKey = bobPubKey * alicePrivKey = secret
The ECDH algorithm (Elliptic Curve Diffie–Hellman Key Exchange) is
trivial:
1. Alice generates a random ECC key pair: {alicePrivKey,
alicePubKey = alicePrivKey * G}
2. Bob generates a random ECC key pair: {bobPrivKey,
bobPubKey = bobPrivKey * G}
3. Alice and Bob exchange their public keys through the insecure
channel (e.g. over Internet)
4. Alice calculates sharedKey = bobPubKey * alicePrivKey

5. Bob calculates sharedKey = alicePubKey * bobPrivKey
6. Now both Alice and Bob have the same sharedKey ==
bobPubKey * alicePrivKey == alicePubKey * bobPrivKey
In the next section, we shall implement the ECDH algorithm and
demonstrate it with code example.

ECDH Key Exchange - Examples in
Python
Now let's implement the ECDH algorithm (Elliptic Curve Diffie–Hellman
Key Exchange) in Python.
We shall use the  tinyec  library for ECC in Python:
normalpip install tinyec
normal
Now, let's generate two public-private key pairs, exchange the public
keys and calculate the shared secret:
normalfrom tinyec import registry
import secrets
def compress(pubKey):
 return hex(pubKey.x) + hex(pubKey.y % 2)[2:]
curve = registry.get_curve('brainpoolP256r1')
alicePrivKey = secrets.randbelow(curve.field.n)
alicePubKey = alicePrivKey * curve.g
print("Alice public key:", compress(alicePubKey))
bobPrivKey = secrets.randbelow(curve.field.n)
bobPubKey = bobPrivKey * curve.g
print("Bob public key:", compress(bobPubKey))
print("Now exchange the public keys (e.g. through Internet)")
aliceSharedKey = alicePrivKey * bobPubKey
print("Alice shared key:", compress(aliceSharedKey))
bobSharedKey = bobPrivKey * alicePubKey
print("Bob shared key:", compress(bobSharedKey))
print("Equal shared keys:", aliceSharedKey == bobSharedKey)
normal
Run the above code example: https://repl.it/@nakov/ECDH-Key-

Exchange-in-Python.
The elliptic curve used for the ECDH calculations is 256-bit named
curve  brainpoolP256r1 . The private keys are 256-bit (64 hex digits)
and are generated randomly. The public keys will be 257 bits (65 hex
digits), due to key compression.
The output of the above code looks like this:
normalAlice public key:
0x66c808e6b5be6d6620934bc6ffa2b8b47f9786c002bfb06d53a0c27535641a5d1
Bob public key:
0x7d15195432d1ac7f38aeb054d07d9b2e1faa913b78ad04d5efdd4a1ee8d9a3191
Now exchange the public keys (e.g. through Internet)
Alice shared key:
0x90f5a1cf2ed1dbb0322178df6bb0dd72c541884618b2989a3e5e663198667a621
Bob shared key:
0x90f5a1cf2ed1dbb0322178df6bb0dd72c541884618b2989a3e5e663198667a621
Equal shared keys: True
normal
Due to randomization, if you run the above code, the keys will be
different, but the calculated shared secret for Alice and Bob at the
end will always be the same. The generated shared secret is a 257-
bit integer (compressed EC point for 256-bit curve, encoded as 65 hex
digits).

Exercises: ECDH Key Exchange
...
TODO
...

ECC-Based Encryption / Decryption
In this section we shall explain how to implement elliptic-curve based
public-key encryption / decryption (asymmetric encryption scheme
based on ECC). This is non-trivial and usually involves a design of
hybrid encryption scheme, involving ECC cryptography, ECDH key
exchange and symmetric encryption algorithm.
Assume we have a ECC private-public key pair. We want to encrypt
and decrypt data using these keys. By definition, asymmetric
encryption works as follows: if we encrypt data by a private key, we
will be able to decrypt the ciphertext later by the corresponding public
key:
The above process can be directly applied for the RSA cryptosystem,
but not for the ECC. The elliptic curve cryptography (ECC) does not
directly provide encryption method. Instead, we can design a hybrid
encryption scheme by using the ECDH (Elliptic Curve Diffie–Hellman)
key exchange scheme to derive a shared secret key for symmetric
data encryption and decryption.

This is how most hybrid encryption schemes works (the encryption
process):
This is how most hybrid encryption schemes works (the decryption
process):
Let's get into details how to design and implement an ECC-based
hybrid encryption scheme.
ECC-Based Secret Key Derivation
(using ECDH)
Assume we have a cryptographic elliptic curve over finite field,
along with its generator point G. We can use the following two
functions to calculate a shared a secret key for encryption and

decryption (derived from the ECDH scheme):
• calculateEncryptionKey(pubKey) --> (sharedECCKey,
ciphertextPubKey)
1. Generate ciphertextPrivKey = new random private key.
2. Calculate ciphertextPubKey = ciphertextPrivKey * G.
3. Calculate the ECDH shared secret: sharedECCKey =
pubKey * ciphertextPrivKey.
4. Return both the sharedECCKey + ciphertextPubKey.
Use the sharedECCKey for symmetric encryption. Use
the randomly generated ciphertextPubKey to calculate
the decryption key later.
• calculateDecryptionKey(privKey, ciphertextPubKey) -->
sharedECCKey
1. Calculate the the ECDH shared secret: sharedECCKey =
ciphertextPubKey * privKey.
2. Return the sharedECCKey and use it for the decryption.
The above calculations use the same math, like the ECDH algorithm
(see the previous section). Recall that EC points have the following
property:
• (a * G) * b = (b * G) * a
Now, assume that a = privKey, a * G = pubKey, b = ciphertextPrivKey,
b * G = ciphertextPubKey.
The above equation takes the following form:
• pubKey * ciphertextPrivKey = ciphertextPubKey * privKey =
sharedECCKey
This is what exactly the above two functions calculate, directly
following the ECDH key agreement scheme. In the hybrid encryption
schemes the encapsulated ciphertextPubKey is also known as
"ephemeral key", because it is used temporary, to derive the
symmetric encryption key, using the ECDH key agreement scheme.

---

## Sección 41: Core Concepts & Foundations [Entropy: 0.695]

ECC-Based Secret Key Derivation -
Example in Python
The below Python code uses the  tinyec  library to generate a ECC
private-public key pair for the message recipient (based on the
 brainpoolP256r1  curve) and then derive a secret shared key (for
encryption) and ephemeral ciphertext public key (for ECDH) from the
recipient's public key and later derive the same secret shared key
(for decryption) from the recipient's private key and the generated
earlier ephemeral ciphertext public key:
normalfrom tinyec import registry
import secrets
curve = registry.get_curve('brainpoolP256r1')
def compress_point(point):
 return hex(point.x) + hex(point.y % 2)[2:]
def ecc_calc_encryption_keys(pubKey):
 ciphertextPrivKey = secrets.randbelow(curve.field.n)
 ciphertextPubKey = ciphertextPrivKey * curve.g
 sharedECCKey = pubKey * ciphertextPrivKey
 return (sharedECCKey, ciphertextPubKey)
def ecc_calc_decryption_key(privKey, ciphertextPubKey):
 sharedECCKey = ciphertextPubKey * privKey
 return sharedECCKey
privKey = secrets.randbelow(curve.field.n)
pubKey = privKey * curve.g
print("private key:", hex(privKey))
print("public key:", compress_point(pubKey))
(encryptKey, ciphertextPubKey) = ecc_calc_encryption_keys(pubKey)
print("ciphertext pubKey:", compress_point(ciphertextPubKey))
print("encryption key:", compress_point(encryptKey))
decryptKey = ecc_calc_decryption_key(privKey, ciphertextPubKey)
print("decryption key:", compress_point(decryptKey))
normal
Run the above code example: https://repl.it/@nakov/ECC-basedsecret-key-derivation-in-Python.
The code is pretty simple and demonstrates that we can generate a

pair { secret key + ciphertext public key } from given EC public key
and later we can recover the same secret key from the pair {
ciphertext public key + private key }. The above code produces
output like this:
normalprivate key:
0x2e2921b4cde59cdf01e7a014a322abd530b3015085c31cb6e59502da761d29e9
public key:
0x850d3873cf4ac50ddb54ddbd27f8225fc43bd3f4c2cc0a4f9d1f9ce15fc4eb711
ciphertext pubKey:
0x71586f9999d3ee050005054bc681c1d96c5eb054ca15b080ba245e495627003b0
encryption key:
0x9d13d3f8f9747669432f575731926b5ed99a6883f00146cbd3203ffa7ff8b1ae1
decryption key:
0x9d13d3f8f9747669432f575731926b5ed99a6883f00146cbd3203ffa7ff8b1ae1
normal
It is clear from the above output that the encryption key (derived from
the public key) and the decryption key (derived from the
corresponding private key) are the same. This is due to the above
discussed property of the ECC:
 pubKey * ciphertextPrivKey = ciphertextPubKey * privKey . These keys
will be used for data encryption and decryption in an integrated
encryption scheme. The above output will be different if you run the
code (due to the randomness used to generate  ciphertextPrivKey ,
but the encryption and decryption keys will always be the same (the
ECDH shared secret).
The above demonstrated mechanism for generating a shared
ephemeral secret key, based on a ECC key pair, is an example of
KEM (key encapsulation mechanism), based on the ECC and ECDH.
ECC-Based Hybrid Encryption /
Decryption - Example in Python
Once we have the secret key, we can use it for symmetric data
encryption, using a symmetric encryption scheme like AES-GCM or

ChaCha20-Poly1305. Let's implement a fully-functional asymmetric
ECC encryption and decryption hybrid scheme. It will be based on
the  brainpoolP256r1  curve and the AES-256-GCM authenticated
symmetric cipher.
We shall use the  tinyec  and  pycryptodome  Python libraries
respectively for ECC calculations and for the AES cipher:
normalpip install tinyec
pip install pycryptodome
normal
Let's examine this full ECC + AES hybrid encryption example:
normalfrom tinyec import registry
from Crypto.Cipher import AES
import hashlib, secrets, binascii
def encrypt_AES_GCM(msg, secretKey):
 aesCipher = AES.new(secretKey, AES.MODE_GCM)
 ciphertext, authTag = aesCipher.encrypt_and_digest(msg)
 return (ciphertext, aesCipher.nonce, authTag)
def decrypt_AES_GCM(ciphertext, nonce, authTag, secretKey):
 aesCipher = AES.new(secretKey, AES.MODE_GCM, nonce)
 plaintext = aesCipher.decrypt_and_verify(ciphertext, authTag)
 return plaintext
def ecc_point_to_256_bit_key(point):
 sha = hashlib.sha256(int.to_bytes(point.x, 32, 'big'))
 sha.update(int.to_bytes(point.y, 32, 'big'))
 return sha.digest()
curve = registry.get_curve('brainpoolP256r1')
def encrypt_ECC(msg, pubKey):
 ciphertextPrivKey = secrets.randbelow(curve.field.n)
 sharedECCKey = ciphertextPrivKey * pubKey
 secretKey = ecc_point_to_256_bit_key(sharedECCKey)
 ciphertext, nonce, authTag = encrypt_AES_GCM(msg, secretKey)
 ciphertextPubKey = ciphertextPrivKey * curve.g
 return (ciphertext, nonce, authTag, ciphertextPubKey)
def decrypt_ECC(encryptedMsg, privKey):
 (ciphertext, nonce, authTag, ciphertextPubKey) = encryptedMsg
 sharedECCKey = privKey * ciphertextPubKey
 secretKey = ecc_point_to_256_bit_key(sharedECCKey)
 plaintext = decrypt_AES_GCM(ciphertext, nonce, authTag,
secretKey)
 return plaintext

msg = b'Text to be encrypted by ECC public key and ' \
 b'decrypted by its corresponding ECC private key'
print("original msg:", msg)
privKey = secrets.randbelow(curve.field.n)
pubKey = privKey * curve.g
encryptedMsg = encrypt_ECC(msg, pubKey)
encryptedMsgObj = {
 'ciphertext': binascii.hexlify(encryptedMsg[0]),
 'nonce': binascii.hexlify(encryptedMsg[1]),
 'authTag': binascii.hexlify(encryptedMsg[2]),
 'ciphertextPubKey': hex(encryptedMsg[3].x) +
hex(encryptedMsg[3].y % 2)[2:]
}
print("encrypted msg:", encryptedMsgObj)
decryptedMsg = decrypt_ECC(encryptedMsg, privKey)
print("decrypted msg:", decryptedMsg)
normal
Run the above code example: https://repl.it/@nakov/ECC-basedhybrid-encryption-decryption-in-Python.
The above example starts from generating an ECC public + private
key pair for the message recipient:  pubKey  +  privKey , using the
 tinyec  library. These keys will be used to encrypt the message  msg 
through the hybrid encryption scheme (asymmetric ECC + symmetric
AES) and to decrypt is later back to its original form.
Next, we encrypt  msg  by using the  pubKey  and we obtain as a result
the following set of output: {  ciphertext ,  nonce ,  authTag ,
 ciphertextPubKey  }. The  ciphertext  is obtained by the symmetric
AES-GCM encryption, along with the  nonce  (random AES initialization
vector) and  authTag  (the MAC code of the encrypted text, obtained by
the GCM block mode). Additionally, we obtain a randomly generated
ephemeral public key  ciphertextPubKey , which will be encapsulated in
the encrypted message and will be used to recover the AES symmetric
key during the decryption (using the ECDH key agreement scheme, as
it was show before).
To decrypt the encrypted message, we use the data produced during
the encryption {  ciphertext ,  nonce ,  authTag ,  ciphertextPubKey  },
along with the decryption  privateKey . The result is the decrypted

---

## Sección 42: Core Concepts & Foundations [Entropy: 0.577]

plaintext message. We use authenticated encryption (GCM block
mode), so if the decryption key or some other parameter is incorrect,
the decryption will fail with an exception.
Internally, the  encrypt_ECC(msg, pubKey)  function first generates an
ephemeral ECC key-pair for the ciphertext and calculates the
symmetric encryption shared ECC key
 sharedECCKey = ciphertextPrivKey * pubKey . This key is an EC point,
so it is then transformed to 256-bit AES secret key (integer) though
hashing the point's  x  and  y  coordinates. Finally, the AES-256-GCM
cipher (from  pycryptodome ) encrypts the message by the 256-bit
shared secret key  secretKey  and produces as output  ciphertext  +
 nonce  +  authTag .
The
 decrypt_ECC(encryptedMsg{ciphertext, nonce, authTag, ciphertextPubKey}, pri
function internally first calculates the symmetric encryption shared
ECC key  sharedECCKey = privKey * ciphertextPubKey . It is an EC
point, so it should be first transformed to 256-bit AES secret key
though hashing the point's  x  and  y  coordinates. Then the
AES-256-GCM cipher is used to decrypt the  ciphertext  +  nonce  +
 authTag  by the 256-bit shared secret key  secretKey . The produced
output is the original plaintext message (or an exception in case of
incorrect decryption key or unmatching  authTag ).
The output from the above code looks like this:
normaloriginal msg: b'Text to be encrypted by ECC public key and
decrypted by its corresponding ECC private key'
encrypted msg: {'ciphertext':
b'b5953b3082fcefdbde91dd3c03cf83dde0822c19be6ae906a634db65115295e7cbcd7a1a
'nonce': b'9d55f4b5c87fff773d0457f3b23a953e', 'authTag':
b'5c9d339778925aa4e44f43252a28681d', 'ciphertextPubKey':
'0x21dbc985b625f2a42d0f86fc234b49b55477928bae73dfac73bafd9bed50abe70'}
decrypted msg: b'Text to be encrypted by ECC public key and
decrypted by its corresponding ECC private key'
normal
Enjoy the above example, play with it, try to understand how exactly it

works, try to change the underlying ECC curve, try to change the
symmetric encryption algorithm, try to decrypt the ciphertext with
wrong private key.

ECIES (Elliptic Curve Integrated
Encryption Scheme)
A hybrid encryption scheme similar to the previously demonstrated
code is standardized under the name Elliptic Curve Integrated
Encryption Scheme (ECIES) in many crypto standards like SECG
SEC-1, ISO/IEC 18033-2, IEEE 1363a and ANSI X9.63. ECIES is a
public-key authenticated encryption scheme, which works similarly to
the above code examples, but uses a KDF (key-derivation function) for
deriving separate MAC key and symmetric encryption key from the
ECDH shared secret. It has many variants.
The ECIES standard combines ECC-based asymmetric
cryptography with symmetric ciphers to provide data encryption by
EC private key and decryption by the corresponding EC public key.
The ECIES encryption scheme uses ECC cryptography (public key
cryptosystem) + key-derivation function (KDF) + symmetric
encryption algorithm + MAC algorithm, combined together like it is
shown on the figure below:

The input of the ECIES encryption consists of recipient's public key +
plain text message. The output consists of sender's ephemeral public
key (ciphertext public key) + encrypted message (ciphertext +
symmetric algorithm parameters) + authentication tag (MAC code):
•  ECIES-encrypt(recipientPublicKey, plaintextMessage)  ➔
 { cipherTextPublicKey, encryptedMessage, authTag } 
The ECIES decryption takes the output from the encryption + the
recipient's private key and produces the original plaintext message
or detects a problem (e.g. integrity / authentication error):
•  ECIES-decrypt(cipherTextPublicKey, encryptedMessage, authTag, recipie
➔  plaintextMessage 
The ECIES encryption scheme is a framework, not a concrete
algorithm. It can be implemented by plugging different algorithms, e.g.
the secp256k1 or P-521 elliptic curve for the public-key calculations +
PBKDF2 or Scrypt for KDF function + AES-CTR or AES-GCM or
ChaCha20-Poly1305 for symmetric cipher and authentication tag +

HMAC-SHA512 for MAC algorithm (in case of unauthenticated
encryption).
In the next section we shall demonstrate through a code example how
to use ECIES in practice.

ECIES (Elliptic Curve Integrated
Encryption Scheme) - Example
Now, let's demonstrate how the ECIES encryption scheme works in
practice in Python. We shall use a Python library  eciespy :
normalpip install eciespy
normal
A sample Python code to generate public / private key pair and
encrypt and decrypt a message using ECIES is:
normalfrom ecies.utils import generate_eth_key
from ecies import encrypt, decrypt
import binascii
privKey = generate_eth_key()
privKeyHex = privKey.to_hex()
pubKeyHex = privKey.public_key.to_hex()
print("Encryption public key:", pubKeyHex)
print("Decryption private key:", privKeyHex)
plaintext = b'Some plaintext for encryption'
print("Plaintext:", plaintext)
encrypted = encrypt(pubKeyHex, plaintext)
print("Encrypted:", binascii.hexlify(encrypted))
decrypted = decrypt(privKeyHex, encrypted)
print("Decrypted:", decrypted)
normal
Run the above code example: https://repl.it/@nakov/ECIES-in-Python.
The above code is pretty simple: just generate ECC public + private
key pair using  ecies.utils.generate_eth_key()  and call the
 ecies.encrypt(pubKey, msg)  and  decrypt(privKey, encryptedMsg) 
functions from the  eciespy  library.

The output form the above code looks like this:
normalEncryption public key:
0x0dc8e06c055b45ecf110258ed5c0261ce2019b1bd0f8f226dcd010dade448b8f304a091
Decryption private key:
0x487fd8b53c471e3c38484a0fbe4751ace67a9ed28e60ea6b0b44c445b881f99d
Plaintext: b'Some plaintext for encryption'
Encrypted:
b'045699078bbd101e270572d0d68e87a8f7b6cc377ebeeffb60d2fcac5dc7bdd86a26d7f
Decrypted: b'Some plaintext for encryption'
normal
The Python  eciespy  library internally uses ECC cryptography over the
secp256k1 curve + AES-256-GCM authenticated encryption. Note that
the above encrypted message holds together 4 values:
 {cipherPubKey, AES-nonce, authTag, AES-ciphertext} , packed in binary
form and not directly visible from the above output.

---

## Sección 43: Core Concepts & Foundations [Entropy: 0.445]

Exercises: ECC-Based Asymmetric
Encrypt / Decrypt (ECIES)
Write a program to encrypt / decrypt a message by public / private
key using ECIES (Elliptic Curve Integrated Encryption Scheme). The
encryption will require an EC public key and decryption will require
the corresponding EC private key. Internally, use ECC cryptography
based on a 256-bit elliptic curve by choice (e.g.  brainpoolP256t1 )
and symmetric encryption by choice (e.g. AES-256-CTR + MAC,
AES-128-GCM or ChaCha20-Poly1305), along with key-derivation
function by choice (e.g. PBKDF2).
You are free to choose between writing your own ECIES
implementation, following the SECG-SEC-1 standard or use a
standard ECIES library for your language, e.g.
• Python: https://pypi.org/project/eciespy
• JavaScript: https://github.com/bitchan/eccrypto
• C#: https://github.com/VirgilSecurity/virgil-sdk-crypto-net
• Java: https://github.com/Arryboom/smartbox-ecies-java
• C, C++, PHP, Perl: https://github.com/jedisct1/libsodium
ECIES Encryption
Write a program to encrypt a message using the ECIES hybrid
encryption scheme and a 256-bit ECC public key (2 * 256 bits).
• The input consists of the public key in hex (at the first line,
uncompressed, 128 hex digits) + plaintext message for
encryption (at the second line).
• The output is the hex-encoded encrypted message. It may

hold the ECC ciphertext public key + the ciphertext + MAC code
+ the symmetric key algorithm parameters, but this depends very
much on the underlying algorithms and implementation.
Sample input:
normal552e2b308514b38e4989d71ed263e0af6376f65ba81a94ebb74f6fadc223ee80aa8
Sample text for ECIES encryption.
normal
Sample output:
It will be different for each program execution due to the randomness
in the encryption scheme:
normal0442e2fba3fddba1ba9207f3276e141809782dc72529523aa1fcf35b15c4c22a933
normal
ECIES Decryption
Write a program to decrypt an encrypted message created by the
program from the previous example, using the ECIES hybrid
encryption scheme and a 256-bit ECC private key.
• The input consists of the private key in hex (at the first line, 64
hex digits) + encrypted message for decryption (at the second
line).
• The output is the decrypted plaintext message. In case or
decryption problem (e.g. incorrect decryption key or broken
encrypted message), display
 Error: cannot decrypt the message .
Sample input:
normal27f07d3251dee39ec2c5ff800641f4d839e6f8065033e9a710ea2e519473bdd7
0442e2fba3fddba1ba9207f3276e141809782dc72529523aa1fcf35b15c4c22a9333ddacd
normal

Sample output:
normalSample text for ECIES encryption.
normal
Sample input:
This example holds an incorrect decryption private key:
normal9ab686c269b2c58f0fca699dde09cf24e23353e56bd60095d681b23709cb0dc3
0442e2fba3fddba1ba9207f3276e141809782dc72529523aa1fcf35b15c4c22a9333ddacd
normal
Sample output:
normalError: cannot decrypt the message
normal

Digital Signatures, ECDSA and
EdDSA
Digital signatures are a cryptographic tool to sign messages and
verify message signatures in order to provide proof of authenticity
for digital messages or electronic documents. Digital signatures
provide:
• Message authentication - a proof that certain known sender
(secret key owner) have created and signed the message.
• Мessage integrity - a proof that the message was not altered
after the signing.
• Non-repudiation - the signer cannot deny the signing of the
document after the signature is once created.
Digital signatures are widely used today in the business and in the
financial industry, e.g. for authorizing bank payments (money transfer),
for exchange of signed electronic documents, for signing transactions
in the public blockchain systems (e.g. transfer of coins, tokens or other
digital assets), for signing digital contracts and in many other
scenarios.
Digital signatures cannot identify who is the person, created a certain
signature. This can be solved in combination with a digital certificate,
which binds a public key owner with identity (person, organization, web
site or other). By design digital signatures bind messages to public
keys, not to digital identities.
Sign Messages and Verify Signatures:
How It Works?

Digital signature schemes typically use a public-key cryptosystem
(such as RSA or ECC) and use a public / private key pairs. A
message is signed by a private key and the signature is verified by the
corresponding public key:
Messages are signed by the sender using a private key (signing key).
Typically the input message is hashed and then the signature is
calculated by the signing algorithm. Most signature algorithms perform
some calculation with the message hash + the signing key in a way
that the result cannot be calculated without the signing key. The result
from message signing is the digital signature (one or more integers):
 signMsg(msg, privKey) ᾅ signature 
Message signatures are verified by the corresponding public key
(verification key). Typically the signed message is hashed and some
calculation is performed by the signature algorithm using the message
hash + the public key. The result from signing is a boolean value (valid
or invalid signature):
 verifyMsgSignature(msg, signature, pubKey) ᾅ valid / invalid 
A message signature mathematically guarantees that certain
message was signed by certain (secret) private key, which
corresponds to certain (non-secret) public key. After a message is

signed, the message and the signature cannot be modified and thus
message authentication and integrity is guaranteed. Anyone, who
knows the public key of the message signer, can verify the
signature. Аfter signing the signature author cannot reject the act of
signing (this is known as non-repudiation).
Most signature schemes work like it is shown at the following diagram:
At signing, the input message is hashed (either alone, or together
with the public key and other input parameters), then some
computation (based on elliptic curves, discrete logarithms or other
cryptographic primitive) calculates the digital signature. The
produced signed message consists of the original message + the
calculated signature.
At signature verification, the message for verification is hashed
(either alone or together with the public key) and some computations
are performed between the message hash, the digital signature and
the public key, and finally a comparison decides whether the
signature is valid or not.
Digital signatures are different from MAC (message authentication
codes), because MACs are created and verified by the same secret
key using a symmetric algorithm, while digital signatures are created
by a signing key and are verified by a different verification key,
corresponding to the signing key using an asymmetric algorithm.

---

## Sección 44: Core Concepts & Foundations [Entropy: 0.376]

Both signatures and MAC codes provide message authentication and
integrity.
Digital Signature Schemes and
Algorithms
Most public-key cryptosystems like RSA and ECC provide secure
digital signature schemes (signature algorithms). Examples of well
known digital signature schemes are: DSA, ECDSA, EdDSA, RSA
signatures, ElGamal signatures and Schnorr signatures.
The above mentioned signature schemes are based on the difficulty of
the DLP (discrete logarithm problem) and ECDLP (elliptic-curve
discrete logarithm problem) and are quantum-breakable (powerful
enough quantum computers may calculate the signing key from the
message signature). Quantum-safe signatures (like SPHINCS, BLISS
and XMSS) are not massively used, because of long key length, long
signatures and slower performance, compared to ECDSA and EdDSA.
The most popular digital signature schemes (as of Nov 2018) are: RSA
signatures, ECDSA and EdDSA. Let's give some details about them,
along with some live code examples.
RSA Signatures
The RSA public-key cryptosystem provides a cryptographically secure
digital signature scheme (sign + verify), based on the math of the
modular exponentiations and discrete logarithms and the difficulty of
the integer factorization problem (IFP). The RSA sign / verify
process works as follows:
• The RSA sign algorithm computes a message hash, then
encrypts the hash with the private key exponent to obtain the
signature. The obtained signature is an integer number (the

RSA encrypted message hash).
• The RSA verify algorithm first computes the message hash,
then decrypts the message signature with the public key
exponent and compares the obtained decrypted hash with the
hash of the signed message to ensure the signature is valid.
RSA signatures are deterministic (the same message + same private
key produce the same signature). A non-deterministic variant of RSAsignatures is easy to be designed by padding the input message with
some random bytes before signing.
RSA signatures are widely used in modern cryptography, e.g. for
signing digital certificates to protect Web sites. For example (as of Nov
2018) the Microsoft's official Web site uses  Sha256RSA  for its digital
certificate. Nevertheless, the trend in the last decade is to move from
RSA and DSA to elliptic curve-based signatures (like ECDSA and
EdDSA). Modern cryptographers and developers prefer ECC
signatures for their shorter key length, shorter signature, higher
security (for the same key length) and better performance.
DSA (Digital Signature Algorithm)
The DSA (Digital Signature Algorithm) is a cryptographically secure
standard for digital signatures (signing messages and signature
verification), based on the math of the modular exponentiations and
discrete logarithms and the difficulty of the discrete logarithm problem
(DLP). It is alternative of RSA and is used instead of RSA, because of
patents limitations with RSA (until Sept 2000). DSA is variant of the
ElGamal signature scheme. The DSA sign / verify process works as
follows:
• The DSA signing algorithm computes a message hash, then
generates a random integer k and computes the signature (а
pair of integers {r, s}), where r is computed from k and s is
computed using the message hash + the private key exponent

+ the random number k. Due to randomness, the signature is
non-deterministic.
• The DSA signature verification algorithm involves
computations, based on the message hash + the public key
exponent + the signature {r, s}.
The random value k (generated when the signature is computed)
opens a potential vulnerability: if two different messages are signed
using the same value of k and the same private key, then an attacker
can compute the signer's private key directly (see https://github.com/
tintinweb/ecdsa-private-key-recovery).
A deterministic-DSA variant is defined in RFC 6979, which calculates
the random number k as HMAC from the private key, the message
hash and few other parameters. The deterministic DSA is
considered more secure.
In the modern cryptography, the elliptic-curve-based signatures
(liike ECDSA and EdDSA) are prefered to DSA, because of shorter
key lengths, shorter signature lengths, higher security levels (for the
same key length) and better performance.
ECDSA (Elliptic Curve Digital Signature
Algorithm)
The ECDSA (Elliptic Curve Digital Signature Algorithm) is a
cryptographically secure digital signature scheme, based on the
elliptic-curve cryptography (ECC). ECDSA relies on the math of the
cyclic groups of elliptic curves over finite fields and on the
difficulty of the ECDLP problem (elliptic-curve discrete logarithm
problem).
ECDSA is adaptation of the classical DSA algorithm, which is derived
from the ElGamal signature scheme. More precisely, the ECDSA
algorithm is a variant of the ElGamal signature, with some changes

and optimizations to handle the representation of the group elements
(the points of the elliptic curve). Like any other elliptic curve crypto
algorithm, ECDSA uses an elliptic curve (like the  secp256k1 ), private
key (random integer within the curve key length - for signing
messages) and public key (EC point, calculated from the private key
by multiplying it to the curve generator point - for verifying signatures).
The ECDSA sign / verify process works as follows:
• The ECDSA signing algorithm computes a message hash, then
generates a random integer k and computes the signature (a
pair of integers {r, s}), where r is computed from k and s is
computed using the message hash + the private key + the
random number k. Due to the randomness, the signature is nondeterministic.
• The ECDSA signature verification algorithm involves
computations, based on the message hash + the public key +
the signature {r, s}.
The random value k (generated when the signature is computed)
opens a potential vulnerability: if two different messages are signed
using the same value of k and the same private key, then an attacker
can compute the signer's private key directly (see https://github.com/
tintinweb/ecdsa-private-key-recovery).
A deterministic-ECDSA variant is defined in RFC 6979, which
calculates the random number k as HMAC from the private key + the
message hash + few other parameters. The deterministic ECDSA is
considered more secure.
ECDSA signatures are the most widely used signing algorithm, used
by millions every day (as of Nov 2018). For example, the digital
certificates in Amazon Web sites are signed by the  Sha256ECDSA 
signature scheme.
EdDSA (Edwards-curve Digital Signature

---

## Sección 45: Core Concepts & Foundations [Entropy: 0.484]

Algorithm)
EdDSA (Edwards-curve Digital Signature Algorithm) is a fast digital
signature algorithm, using elliptic curves in Edwards form (like
Ed25519 and Ed448-Goldilocks), a deterministic variant of the
Schnorr's signature scheme, designed by a team of the well-known
cryptographer Daniel Bernstein.
EdDSA is more simple than ECDSA, more secure than ECDSA and
is designed to be faster than ECDSA (for curves with comparables
key length). Like ECDSA, the EdDSA signature scheme relies on the
difficulty of the ECDLP problem (elliptic-curve discrete logarithm
problem) for its security strength.
The EdDSA signature algorithm is works with Edwards elliptic curves
like Curve25519 and Curve448, which are highly optimized for
performance and security. It is shown that Ed25519 signatures are
typically faster than traditional ECDSA signatures over curves with
comparable key length. Still, the performance competition is
disputable. The EdDSA sign / verify process works as follows:
• The EdDSA signing algorithm generates a deterministic (not
random) integer r (computed by hashing the message and the
hash of the private key), then computes the signature {Rs, s},
where Rs is computed from r and s is computed from the hash
of (the message + the public key derived from the private + the
number r) + the private key. The signature is deterministic (the
same message signed by the same key always gives the same
signature).
• The EdDSA signature verification algorithm involves ellipticcurve computations, based on the message (hashed together
with the public key and the EC point Rs from the signature) + the
public key + the number s from the signature {Rs, s}.
By design EdDSA signatures are deterministic (which improves their

security). A non-deterministic variant of EdDSA-signatures is easy to
be designed by padding the input message with some random bytes
before signing.
A short comparison between Ed25519 EdDSA signatures and
secp256k ECDSA signatures is given below:
EdDSA-Ed25519
ECDSAsecp256k1
Performance
(source)
8% faster
8% slower
Private key
length
32 bytes (256 bits
= 251 variable bits
+ 5 predefined)
32 bytes (256 bits)
Public key
length
(compressed)
32 bytes (256 bits
= 255-bit ycoordinate + 1-bit
x coordinate)
33 bytes (257 bits
= 256-bit xcoordinate + 1-bit
y-coordinate)
Signature size
64 bytes (512 bits)
64 bytes (512 bits)
or 65 bytes (513
bits) with the
public key
recovery bit
Public key
recovery
not possible
(signature
verification
involves hasing of
the public key)
possible (with 1
recovery bit added
in the signature)

Security level
(source)
~128 bit (more
precisely 125.8)
~128 bit (more
precisely 127.8)
SafeCurves
security
(source)
11 of 11 tests
passed
7 of 11 tests
passed
Modern developers often use Ed25519 signatures instead of 256-bit
curve ECDSA signatures, because EdDSA-Ed25519 signature
scheme uses keys, which fit in 32 bytes (64 hex digits), signatures fit in
64 bytes (128 hex digits), signing and verification is faster and the
security is considered better.
Public blockchains (like Bitcoin and Ethereum) often use secp2561-
based ECDSA signatures, because the signer's public key (and its
blockchain address) can be easily recovered from the signature
(together with the signed message) by adding just 1 additional bit to
the signature.
In the general case, it is considered that EdDSA signatures are
recommended to ECDSA, but this is highly disputable and depends
on the use case, on the curves involved and many other parameters.
Other Signature Schemes and Algorithms
Most signature algorithms are derived from generic signature schemes
like ElGamal signatures and Schnorr signatures.
• RSA signature is derived from the RSA encryption scheme.
• DSA and ECDSA are derived from ElGamal signature scheme.
• EdDSA is derived from the Schnorr signature scheme.
Other signature schemes include:
• ECGDSA: an elliptic-curve digital signature scheme (based on
the difficulty of the ECDLP problem), a slightly simplified variant

of ECDSA, known as the German version of ECDSA.
• ECKDSA: an elliptic-curve digital signature scheme (based on
the difficulty of the ECDLP problem), a complicated variant of
ECDSA, known as the Korean version of ECDSA. The
ECKDSA signs given message by given EC private key, along
with the signer's digital certificate hash. This add identity to
the digital signature, in addition to message authentication,
integrity and non-repudiation.
• SM2 signature: an elliptic-curve digital signature scheme
(based on the difficulty of the ECDLP problem), known as the
Chinese digital signature algorithm, developed by the
Chinese Academy of Science.
• GOST R 34.10-2001: an elliptic-curve digital signature scheme
(based on the difficulty of the ECDLP problem), known as the
Russian digital signature algorithm, one of the Russian
cryptographic standard algorithms (called GOST algorithms).
After the short review of the most popular digital signature algorithms,
let's get into technical details about the RSA sign, ECDSA and
EdDSA signature algorithms, with code examples.

RSA Signatures: Sign and Verify
The RSA public-key cryptosystem provides a digital signature
scheme (sign + verify), based on the math of the modular
exponentiations and discrete logarithms and the computational
difficulty of the RSA problem (and its related integer factorization
problem). The RSA sign / verify algorithm works as described below.
Key Generation
The RSA algorithm uses keys of size 1024, 2048, 4096, ..., 16384 bits.
RSA supports also longer keys (e.g. 65536 bits), but the performance
is too slow for practical use (some operations may take several
minutes or even hours). For 128-bit security level, a 3072-bit key is
required.
The RSA key-pair consists of:
• public key {n, e}
• private key {n, d}
The numbers n and d are typically big integers (e.g. 3072 bits), while e
is small, typically 65537.
By definition, the RSA key-pairs has the following property:
(me)d≡(md)e≡m(modn)(m^e)^d \equiv (m^d)^e \equiv m \pmod n
(m
e
)
d
≡(m
d
)

---

## Sección 46: Core Concepts & Foundations [Entropy: 0.65]

e
≡m(
mod
n)
for all m in the range [0...n)
RSA Sign
Signing a message msg with the private key exponent d:
1. Calculate the message hash: h = hash(msg)
2. Encrypt h to calculate the signature:
s=hd(modn)s = h^d \pmod n
s=h
d
(
mod
n)
The hash h should be in the range [0...n). The obtained signature s is
an integer in the range [0...n).
RSA Verify Signature
Verifying a signature s for the message msg with the public key
exponent e:
1. Calculate the message hash: h = hash(msg)
2. Decrypt the signature: h′=se(modn)h' = s^e \pmod n
h
′
=s
e
(
mod
n)
3. Compare h with h' to find whether the signature is valid or not

If the signature is correct, then the following will be true:
h′=se(modn)=(hd)e(modn)=hh' = s^e \pmod n = (h^d)^e \pmod n = h
h
′
=s
e
(
mod
n)=(h
d
)
e
(
mod
n)=h
The RSA sign / verify algorithm is pretty simple. Let's implement it
with some code.

RSA: Sign / Verify - Examples in
Python
Let's demonstrate in practice the RSA sign / verify algorithm. We shall
use the  pycryptodome  package in Python to generate RSA keys. After
the keys are generated, we shall compute RSA digital signatures and
verify signatures by a simple modular exponentiation (by encrypting
and decrypting the message hash).
normalpip install pycryptodome
normal
Next, generate a 1024-bit RSA key-pair:
normalfrom Crypto.PublicKey import RSA
keyPair = RSA.generate(bits=1024)
print(f"Public key: (n={hex(keyPair.n)}, e={hex(keyPair.e)})")
print(f"Private key: (n={hex(keyPair.n)}, d={hex(keyPair.d)})")
normal
Run the above code example: https://repl.it/@nakov/RSA-key-in-
Python.
The output from the above code might look like this (it will be different
at each execution due to randomness):
normalPublic key: 
(n=0xf51518d30754430e4b89f828fd4f1a8e8f44dd10e0635c0e93b7c01802729a37e1df
e=0x10001)
Private key:
(n=0xf51518d30754430e4b89f828fd4f1a8e8f44dd10e0635c0e93b7c01802729a37e1df
d=0x165ecc9b4689fc6ceb9c3658977686f8083fc2e5ed75644bb8540766a9a2884d1d82ed
normal
Now, let's sign a message, using the RSA private key {n, d}.

Calculate its hash and raise the hash to the power d modulo n
(encrypt the hash by the private key). We shall use SHA-512 hash. It
will fit in the current RSA key size (1024). In Python we have modular
exponentiation as built in function  pow(x, y, n) :
normal# RSA sign the message
msg = b'A message for signing'
from hashlib import sha512
hash = int.from_bytes(sha512(msg).digest(), byteorder='big')
signature = pow(hash, keyPair.d, keyPair.n)
print("Signature:", hex(signature))
normal
Run the above code example: https://repl.it/@nakov/RSA-sign-in-
Python.
The obtained digital signature is an integer in the range of the RSA key
length [0...n). For the above private key and the above message, the
obtained signature looks like this:
normalSignature:
0x650c9f2e6701e3fe73d3054904a9a4bbdb96733f1c4c743ef573ad6ac14c5a3bf8a4731
normal
The signature is 1024-bit integer (128 bytes, 256 hex digits). This
signature size corresponds to the RSA key size.
Now, let's verify the signature, by decrypting the signature using the
public key (raise the signature to power e modulo n) and comparing
the obtained hash from the signature to the hash of the originally
signed message:
normal# RSA verify signature
msg = b'A message for signing'
hash = int.from_bytes(sha512(msg).digest(), byteorder='big')
hashFromSignature = pow(signature, keyPair.e, keyPair.n)
print("Signature valid:", hash == hashFromSignature)
normal
Run the above code example: https://repl.it/@nakov/RSA-sign-verify-

in-Python.
The output will show  True , because the signature will be valid:
normalSignature valid: True
normal
Now, let's try to tamper the message and verify the signature again:
normal# RSA verify signature (tampered msg)
msg = b'A message for signing (tampered)'
hash = int.from_bytes(sha512(msg).digest(), byteorder='big')
hashFromSignature = pow(signature, keyPair.e, keyPair.n)
print("Signature valid (tampered):", hash == hashFromSignature)
normal
Run the above code example: https://repl.it/@nakov/RSA-verifytampered-message-in-Python.
Now, the signature will be invalid and the output from the above code
will be:
normalSignature valid (tampered): False
normal
Enjoy playing with the above RSA sign / verify examples. Try to
modify the code, e.g. use 4096-bit keys, try to tamper the public key at
the signature verification step or the signature.
The RSA Signature Standard PKCS#1
The simple use of RSA signatures is demonstrated above, but the
industry usually follows the crypto standards. For the RSA
signatures, the most adopted standard is "PKCS#1", which has several
versions (1.5, 2.0, 2.1, 2.2), the latest described in RFC 8017. The
PKCS#1 standard defines the RSA signing algorithm (RSASP1) and
the RSA signature verification algorithm (RSAVP1), which are almost

the same like the implemented in the previous section.
To demonstrate the PKCS#1 RSA digital signatures, we shall use
the following code, based on the  pycryptodome  Python library, which
implements RSA sign / verify, following the PKCS#1 v1.5 specification:
normalfrom Crypto.PublicKey import RSA
from Crypto.Signature.pkcs1_15 import PKCS115_SigScheme
from Crypto.Hash import SHA256
import binascii
# Generate 1024-bit RSA key pair (private + public key)
keyPair = RSA.generate(bits=1024)
# Sign the message using the PKCS#1 v1.5 signature scheme
(RSASP1)
msg = b'A message for signing'
hash = SHA256.new(msg)
signer = PKCS115_SigScheme(keyPair)
signature = signer.sign(hash)
print("Signature:", binascii.hexlify(signature))
# Verify valid PKCS#1 v1.5 signature (RSAVP1)
msg = b'A message for signing'
hash = SHA256.new(msg)
signer = PKCS115_SigScheme(keyPair)
try:
 signer.verify(hash, signature)
 print("Signature is valid.")
except:
 print("Signature is invalid.")
# Verify invalid PKCS#1 v1.5 signature (RSAVP1)
msg = b'A tampered message'
hash = SHA256.new(msg)
signer = PKCS115_SigScheme(keyPair)
try:
 signer.verify(hash, signature)
 print("Signature is valid.")
except:
 print("Signature is invalid.")
normal
Run the above code example: https://repl.it/@nakov/PKCShash1-in-
Python.
The output from the above code demonstrates that the PKCS#1 RSA
signing with 1024-bit RSA private key produces 1024-bit digital
signature and that it is successfully validated afterwards with the

---

## Sección 47: Core Concepts & Foundations [Entropy: 0.358]

corresponding public key. If the message or the signature or the public
key is tampered, the signature fails to validate. The output from the
above example looks like this:
normalSignature:
b'243b9ed6561ab3bddead98508af0ac34b4567b1358011ace24db71ce2bc7f1a2e942b62
Signature is valid.
Signature is invalid.
normal
Note that in real-world applications the RSA key length should be at
least 3072 bits to provide secure enough signatures.

Exercises: RSA Sign / Verify
In this exercise we shall sign messages and verify signatures using
the PKCS#1 v.1.5 RSA signature algorithm with 4096-bit keys,
following the technical specification from RFC 8017, using SHA3-512
for hashing the input message. The RSA-PKCS1 v1.5 digital signature
algorithm can be found as library for the most programming languages.
The RSA private key will be given encoded in PEM format (RFC
7468, see the example). The corresponding RSA public key will also
be given encoded in PEM format. The RSA signature is 4096-bit
integer (1024 hex digits).
Sign a Message with RSA
Write a program to sign given text message with given 4096-bit
private key, using the PKCS#1 v.1.5 RSA signature algorithm with
SHA3-512 hashing for the input message. The input consists of 2 text
lines. The first line holds the input message for signing. The next
few lines holds the private key as hex string. Print the output as
JSON document, holding the input message + the public key of the
signer (as hex string) + the RSA digital signature (as hex string).
Sample input (text message + PEM-encoded RSA private key):
normalMessage for RSA signing
-----BEGIN RSA PRIVATE KEY-----
MIIJJwIBAAKCAgEAoYjbzkMmss6BU/eCBYhs3bFRBVldM9DlaM7WhPZEgmYl7C1O
b0kmEPG2O/GaNoBOnwptHykzvpYS42rr/D8I0LeJ/2dz0uStQv6kQDIDmNRTthW9
spcuBsqW3e1bRyf0JrL8ot1X8M4k0NGU7w508htPzRZXRS2Zonv8G/N35ePDV5Xf
5mrcOPOebconndXHRqfLlyXCxCS5x0qlJGX1d/oe2Xop7VfBP/UhrrmNmstZsBEv
L3f33+a482xuCTvPIQcv62N3laR2wKOJN9CpFOpqjwR8cj9oLjbCRHd5T/+bgc6D
O/XVzr9DAPVaYLZvm8puMhhgckNIjgPOfWsVyI+/G1zuUH5caFMhMaS95M2a1XNI
wJ5sF25PFpsttIrFXC+b0JS325mk5qvzCgnu0DrWT2VPBNjw4rvmhBPnFb/JdXy5
e5ZIpxtGRpvKYcBxDk6yqgt9SC/e81+tqCrFSQ9cG1QCV/BnZw4cd1JHe3/AHot1
YeWjb8YpIFifJ7WxFb0g9GIYJZTh3dC9hrNOfSsIoOL+ZAyNFp43u0FJT7qtC7Ct

xPvJnt/h8ACE07ewgkq3M0OzmT2RNIf0HhySMjwdIhlY8QGGoV3+zDu9nTx63tvv
aBikPwtZuCz76ipWb5Kt6SA80fsN/QOtDflmBwjlT6UvoivgK8C7iIrwQGUCAwEA
AQKCAgAEuDBbD3672jG3DicpLzkMpYNvhTTZmzXxvJsvtC1V6MqUhPPRq9DQvGLl
JP2zfIsxpEss43YeVL+wD6EIkfTmRyTpt6FLYXXjIIDhJyPdB8yudP/0wR9FK1OC
W6yp8bf97IcEvwDfQPHPjcs5mTYqW3xBbM5xEdA7ihyLlj/hxI7VFNWuVrS6hvpM
93o6Xr3l2r2DZIDO5R/uJj/LztBEFVesiBezCXx/TbXOL9NV0I7SkR1uT6WQpUiw
iItOnDkaHDu/Jlr8ppJ/6RYzJLSlBG3Hcw/fEwz7RgLmBe90h0O8Su1/PwNCRgSc
6DBbw3nX6Bo3gzThotIUsKkufgZsW+eGIEeH5SFGFcIsnVU8AP/FZEQ3RMNXrxdx
U67asN7iQICVJujO419aZ/r+GiLnCp5+UIippYVBXf5RaHcZiurQ/SbuvppZskrA
8oDI4ykB2Y3DPxqFjygxSkxhwBNcBv5CNvAwpFTu94NDYCEgz2O3x4VaDvc52RNF
IlX8Hc9kvvpWBYO24i8jV1Unnb5ojEhlJNfAmPn8GMI/d+j5oVBC0QemieWdc1cp
OkiKliiVvbFPVSwZo1NClEPg8K9TLMynE/PqV+0Ud05qeXn4Y08b9sqrF02JiTDH
aEdYtvCM80FPjqXWi4zIDkr9Im4fuX2anzFU3T0od6Ye15OyPwKCAQEAyPQD5rQM
4yR6iUTTV0x00Se5noY2ztUL3JTi0qkm+9kBDPHdGYRIB7sN1RacWgXdqPRC4M0h
+1IWYg6lJj8IsjJjEszpRmSwLUpt2xKuh+beaWPQhg/bx8jGUrTFqNo6FPJ8RT/3
UaeRUEmqyj3vxw+lc7pZjk9GxVMD7uWbMU4GLE20h97oMr5cW4wvzzWoeofKMkyn
sDTORAC8siWZSAYKJEDlziDujiCfhVmU780igWiTODuAg4GXVqsbXC6FIMs6zGod
7D2+AUZGBj4H4o03miTMYsWCPDkPZMtvAbAKnNEp6UB4/j8ofApDUIYWF5fLBZgk
2Ri6x4XM/0TS9wKCAQEAzciWYXKjkQIVEtIXMlYGRE+irrsWL/wPmRBVFX13THqW
7Ul/rYNHSN1JaIeE9KJqgLUD1kQ+x9vHiSgKTVjrL2c/VyZrJbI3OUIAZmQ9Ahpu
qJ709waXs2VnRdZspAp/1rnf5H8u/1zWHTebzvfJEq6Ys9vRam6Jcr1wI1/9u6pJ
lwSOps67YVxAp2kAC6w2HuMlwQYTaphOHiySO+Jx6nk15r4Vgbv5mJvjQetS65AD
gJPhtep+9Sa1HvzUPQ3Gu7sz0uz5vjRJTv4RRgNSEGCLHjJflgBsl1epsBlH7Xrh
rotRox8AxVnbdXOVcONBB7GAAb7Z+bPCmXdSS2sUgwKCAQAyg3Q/l97tcgwDWXOu
rB9pPA0i1iYM0+0JY7uorLCJ+kCTWnDzqxbYKqMNf4OJ9ZOElvIAxE/Ydwf9WiUV
eh7bfGL/JNc2xLSsjdsTiJyquNQLtfWC3ZWnoMaJn7tX+JNFFLc8SRoIQpD6l6oA
8JTHex1h++PrK+5kR7vjX4AlYrGWjWnmBZhkuQlKUfDqq1hQhLXE8xPr7To0SeMk
/OKNAkemWVHrAMg2nei7gos3xF76HKl1Jy/k3ryGIrjb8S2x0qRTIhGngtWySFHt
28XrowfpDXr7ER7tuIIwGhsrV28zgDiC05wWfRXWKFZHdY00HQoBu/73O4ooAXBI
cqp9AoIBAHQHHYNkeAVS/z7VZm7jQjVSEZAjvKbhoInVQ6QSUim1FVRFlM/orVDQ
NIvTnYux6AsaBUfSwvM9YIxdHzHtaO4ZcQVajB99FNYb+M3CxwNgk/RPbB+8f9yO
2GPwOuFjaiFQPIVBkOY7Gh7vM9LGs4DtIPyIfNNd7/HaDlhjz1T49vVHhIdZGR4U
PgAmm/f46asQuEDVhC0eIy2wQ+OwEjr6jQHFO6siqeD6RHDulpprYQ4mU6WWym6/
nHAUbjbehadkLhxHsaklIhCAAI1RYfwJ82bbUDnrk07iBrNcDcpA9u7LbwRifrTH
rY3T1fcIq6oC0wIo8g5w5NBTDvunLLECggEASMBX4MfNUOYNqWoutQKNSAjjTdSy
MpSXD9MHI5uZnTEG2VEGbN74oQmMx1BtANIOhz17XrYy/fCGyRXiwIqtszMYoYDN
J3HXPQFCvUFtsb8f8fOCbnfRyxiA4jRlFYrobjtTB0kBol6ISsT7+YQIean96Ppk
PHdAA+K0/yDvhG8wC1CUwzaBwfayKM2bhGQgVIqM+ZCV/Ji0g1KKiMVXUF0cvgU6
FI+vQvLnxE7zbFOewbZmqqYGen7J7gOpNJyHvkSIia3KpJpc8IzWsrOH+8xOIX06
fi/wuMFXO7Zz9wyzEKuNXiFExo3FNRChSNonWCJj14Q8cuNW4S0J9hhvAg==
-----END RSA PRIVATE KEY-----
normal
Sample output (message + hex-encoded signature + PEM-encoded
RSA public key):
normalMessage for RSA signing
28ce01ec0f8511e92407496b7aa777a8b38fbc27a3656c9862830427bf8a006d59d19ac3b
-----BEGIN PUBLIC KEY-----
MIICIjANBgkqhkiG9w0BAQEFAAOCAg8AMIICCgKCAgEAoYjbzkMmss6BU/eCBYhs
3bFRBVldM9DlaM7WhPZEgmYl7C1Ob0kmEPG2O/GaNoBOnwptHykzvpYS42rr/D8I
0LeJ/2dz0uStQv6kQDIDmNRTthW9spcuBsqW3e1bRyf0JrL8ot1X8M4k0NGU7w50
8htPzRZXRS2Zonv8G/N35ePDV5Xf5mrcOPOebconndXHRqfLlyXCxCS5x0qlJGX1
d/oe2Xop7VfBP/UhrrmNmstZsBEvL3f33+a482xuCTvPIQcv62N3laR2wKOJN9Cp
FOpqjwR8cj9oLjbCRHd5T/+bgc6DO/XVzr9DAPVaYLZvm8puMhhgckNIjgPOfWsV

yI+/G1zuUH5caFMhMaS95M2a1XNIwJ5sF25PFpsttIrFXC+b0JS325mk5qvzCgnu
0DrWT2VPBNjw4rvmhBPnFb/JdXy5e5ZIpxtGRpvKYcBxDk6yqgt9SC/e81+tqCrF
SQ9cG1QCV/BnZw4cd1JHe3/AHot1YeWjb8YpIFifJ7WxFb0g9GIYJZTh3dC9hrNO
fSsIoOL+ZAyNFp43u0FJT7qtC7CtxPvJnt/h8ACE07ewgkq3M0OzmT2RNIf0HhyS
MjwdIhlY8QGGoV3+zDu9nTx63tvvaBikPwtZuCz76ipWb5Kt6SA80fsN/QOtDflm
BwjlT6UvoivgK8C7iIrwQGUCAwEAAQ==
-----END PUBLIC KEY-----
normal
Verify Message Signature with RSA
Write a program to verify RSA signature (calculated by using
PKCS#1 v.1.5 + SHA3-512), created by the previous exercise. The
input comes as signed message (first line) + RSA digital signature
(second line) + 4096-bit RSA public key (all input lines to the end).
Print as output a single word: "valid' or "invalid".
Sample input (correctly signed message):
normalMessage for RSA signing
28ce01ec0f8511e92407496b7aa777a8b38fbc27a3656c9862830427bf8a006d59d19ac3b
-----BEGIN PUBLIC KEY-----
MIICIjANBgkqhkiG9w0BAQEFAAOCAg8AMIICCgKCAgEAoYjbzkMmss6BU/eCBYhs
3bFRBVldM9DlaM7WhPZEgmYl7C1Ob0kmEPG2O/GaNoBOnwptHykzvpYS42rr/D8I
0LeJ/2dz0uStQv6kQDIDmNRTthW9spcuBsqW3e1bRyf0JrL8ot1X8M4k0NGU7w50
8htPzRZXRS2Zonv8G/N35ePDV5Xf5mrcOPOebconndXHRqfLlyXCxCS5x0qlJGX1
d/oe2Xop7VfBP/UhrrmNmstZsBEvL3f33+a482xuCTvPIQcv62N3laR2wKOJN9Cp
FOpqjwR8cj9oLjbCRHd5T/+bgc6DO/XVzr9DAPVaYLZvm8puMhhgckNIjgPOfWsV
yI+/G1zuUH5caFMhMaS95M2a1XNIwJ5sF25PFpsttIrFXC+b0JS325mk5qvzCgnu
0DrWT2VPBNjw4rvmhBPnFb/JdXy5e5ZIpxtGRpvKYcBxDk6yqgt9SC/e81+tqCrF
SQ9cG1QCV/BnZw4cd1JHe3/AHot1YeWjb8YpIFifJ7WxFb0g9GIYJZTh3dC9hrNO
fSsIoOL+ZAyNFp43u0FJT7qtC7CtxPvJnt/h8ACE07ewgkq3M0OzmT2RNIf0HhyS
MjwdIhlY8QGGoV3+zDu9nTx63tvvaBikPwtZuCz76ipWb5Kt6SA80fsN/QOtDflm
BwjlT6UvoivgK8C7iIrwQGUCAwEAAQ==
-----END PUBLIC KEY-----
normal
Sample output:
normalvalid
normal
Sample input (tampered message):

---

## Sección 48: Core Concepts & Foundations [Entropy: 0.68]

normalTampered message
28ce01ec0f8511e92407496b7aa777a8b38fbc27a3656c9862830427bf8a006d59d19ac3b
-----BEGIN PUBLIC KEY-----
MIICIjANBgkqhkiG9w0BAQEFAAOCAg8AMIICCgKCAgEAoYjbzkMmss6BU/eCBYhs
3bFRBVldM9DlaM7WhPZEgmYl7C1Ob0kmEPG2O/GaNoBOnwptHykzvpYS42rr/D8I
0LeJ/2dz0uStQv6kQDIDmNRTthW9spcuBsqW3e1bRyf0JrL8ot1X8M4k0NGU7w50
8htPzRZXRS2Zonv8G/N35ePDV5Xf5mrcOPOebconndXHRqfLlyXCxCS5x0qlJGX1
d/oe2Xop7VfBP/UhrrmNmstZsBEvL3f33+a482xuCTvPIQcv62N3laR2wKOJN9Cp
FOpqjwR8cj9oLjbCRHd5T/+bgc6DO/XVzr9DAPVaYLZvm8puMhhgckNIjgPOfWsV
yI+/G1zuUH5caFMhMaS95M2a1XNIwJ5sF25PFpsttIrFXC+b0JS325mk5qvzCgnu
0DrWT2VPBNjw4rvmhBPnFb/JdXy5e5ZIpxtGRpvKYcBxDk6yqgt9SC/e81+tqCrF
SQ9cG1QCV/BnZw4cd1JHe3/AHot1YeWjb8YpIFifJ7WxFb0g9GIYJZTh3dC9hrNO
fSsIoOL+ZAyNFp43u0FJT7qtC7CtxPvJnt/h8ACE07ewgkq3M0OzmT2RNIf0HhyS
MjwdIhlY8QGGoV3+zDu9nTx63tvvaBikPwtZuCz76ipWb5Kt6SA80fsN/QOtDflm
BwjlT6UvoivgK8C7iIrwQGUCAwEAAQ==
-----END PUBLIC KEY-----
normal
Sample output:
normalinvalid
normal

ECDSA: Elliptic Curve Digital
Signatures
The ECDSA (Elliptic Curve Digital Signature Algorithm) is a
cryptographically secure digital signature scheme, based on the
elliptic-curve cryptography (ECC). ECDSA relies on the math of the
cyclic groups of elliptic curves over finite fields and on the
difficulty of the ECDLP problem (elliptic-curve discrete logarithm
problem). The ECDSA sign / verify algorithm relies on EC point
multiplication and works as described below. ECDSA keys and
signatures are shorter than in RSA for the same security level. A 256-
bit ECDSA signature has the same security strength like 3072-bit RSA
signature.
ECDSA uses cryptographic elliptic curves (EC) over finite fields in the
classical Weierstrass form. These curves are described by their EC
domain parameters, specified by various cryptographic standards
such as SECG: SEC 2 and Brainpool (RFC 5639). Elliptic curves,
used in cryptography, define:
• Generator point G, used for scalar multiplication on the curve
(multiply integer by EC point)
• Order n of the subgroup of EC points, generated by G, which
defines the length of the private keys (e.g. 256 bits)
For example, the 256-bit elliptic curve  secp256k1  has:
• Order n =
115792089237316195423570985008687907852837564279074904382
(prime number)
• Generator point G {x =
550662630222773436695787188951685343262506034537775941755

y =
326705100207588169780830851305070431844712733806592432759
Key Generation
The ECDSA key-pair consists of:
• private key (integer): privKey
• public key (EC point): pubKey = privKey * G
The private key is generated as a random integer in the range
[0...n-1]. The public key pubKey is a point on the elliptic curve,
calculated by the EC point multiplication: pubKey = privKey * G (the
private key, multiplied by the generator point G).
The public key EC point {x, y} can be compressed to just one of the
coordinates + 1 bit (parity). For the  secp256k1  curve, the private key is
256-bit integer (32 bytes) and the compressed public key is 257-bit
integer (~ 33 bytes).
ECDSA Sign
The ECDSA signing algorithm (RFC 6979) takes as input a message
msg + a private key privKey and produces as output a signature,
which consists of pair of integers {r, s}. The ECDSA signing algorithm
is based on the ElGamal signature scheme and works as follows
(with minor simplifications):
1. Calculate the message hash, using a cryptographic hash
function like SHA-256: h = hash(msg)
2. Generate securely a random number k in the range [1..n-1]
○ In case of deterministic-ECDSA, the value k is HMACderived from h + privKey (see RFC 6979)
3. Calculate the random point R = k * G and take its x-coordinate: r

= R.x
4. Calculate the signature proof: s =
k−1∗(h+r∗privKey)(modn)k^{-1} * (h + r * privKey) \pmod n
k
−1
∗(h+r∗privKey)(
mod
n)
○ The modular inverse k−1(modn)k^{-1} \pmod n
k
−1
(
mod
n)
is an integer, such that
k∗k−1≡1(modn)k * k^{-1} \equiv 1 \pmod n
k∗k
−1
≡1(
mod
n)
5. Return the signature {r, s}.
The calculated signature {r, s} is a pair of integers, each in the range
[1...n-1]. It encodes the random point R = k * G, along with a proof s,
confirming that the signer knows the message h and the private key
privKey. The proof s is by idea verifiable using the corresponding
pubKey.
ECDSA signatures are 2 times longer than the signer's private key
for the curve used during the signing process. For example, for 256-bit
elliptic curves (like  secp256k1 ) the ECDSA signature is 512 bits (64
bytes) and for 521-bit curves (like  secp521r1 ) the signature is 1042
bits.

ECDSA Verify Signature
The algorithm to verify a ECDSA signature takes as input the signed
message msg + the signature {r, s} produced from the signing
algorithm + the public key pubKey, corresponding to the signer's
private key. The output is boolean value: valid or invalid signature.
The ECDSA signature verify algorithm works as follows (with minor
simplifications):
1. Calculate the message hash, with the same cryptographic hash
function used during the signing: h = hash(msg)
2. Calculate the modular inverse of the signature proof: s1 =
s−1(modn)s^{-1} \pmod n
s
−1
(
mod
n)
3. Recover the random point used during the signing: R' = (h * s1)
* G + (r * s1) * pubKey
4. Take from R' its x-coordinate: r' = R'.x
5. Calculate the signature validation result by comparing whether
r' == r
The general idea of the signature verification is to recover the point
R' using the public key and check whether it is same point R,
generated randomly during the signing process.
How Does it Work?
The ECDSA signature {r, s} has the following simple explanation:
• The signing signing encodes a random point R (represented by
its x-coordinate only) through elliptic-curve transformations using
the private key privKey and the message hash h into a number

s, which is the proof that the message signer knows the private
key privKey. The signature {r, s} cannot reveal the private key
due to the difficulty of the ECDLP problem.
• The signature verification decodes the proof number s from
the signature back to its original point R, using the public key
pubKey and the message hash h and compares the xcoordinate of the recovered R with the r value from the
signature.
The Math behind the ECDSA Sign /
Verify
Read this section only if you like math. Most developer may skip it.
How does the above sign / verify scheme work? It is not obvious, but
let's play a bit with the equations.
The equation behind the recovering of the point R', calculated during
the signature verification, can be transformed by replacing the
pubKey with privKey * G as follows:
R' = (h * s1) * G + (r * s1) * pubKey =
= (h * s1) * G + (r * s1) * privKey * G =
= (h + r * privKey) * s1 * G
If we take the number s =
k−1∗(h+r∗privKey)(modn)k^{-1} * (h + r * privKey) \pmod n
k
−1
∗(h+r∗privKey)(
mod
n)
, calculated during the signing process, we can calculate s1 =
s−1(modn)s^{-1} \pmod n

---

## Sección 49: Core Concepts & Foundations [Entropy: 0.695]

s
−1
(
mod
n)
like this:
s1 = s−1(modn)s^{-1} \pmod n
s
−1
(
mod
n)
=
=
(k−1∗(h+r∗privKey))−1(modn)(k^{-1} * (h + r * privKey))^{-1} \pmod n
(k
−1
∗(h+r∗privKey))
−1
(
mod
n)
=
= k∗(h+r∗privKey)−1(modn)k * (h + r * privKey)^{-1} \pmod n
k∗(h+r∗privKey)
−1
(
mod
n)
Now, replace s1 in the point R'.
R' = (h + r * privKey) * s1 * G =
=
(h+r∗privKey)∗k∗(h+r∗privKey)−1(modn)(h + r * privKey) * k * (h + r * 
(h+r∗privKey)∗k∗(h+r∗privKey)

−1
(
mod
n)
* G =
= k * G
The final step is to compare the point R' (decoded by the pubKey)
with the point R (encoded by the privKey). The algorithm in fact
compares only the x-coordinates of R' and R: the integers r' and r.
It is expected that r' == r if the signature is valid and r' ≠ r if the
signature or the message or the public key is incorrect.
ECDSA: Public Key Recovery from
Signature
It is important to know that the ECDSA signature scheme allows the
public key to be recovered from the signed message together with
the signature. The recovery process is based on some mathematical
computations (described in the SECG: SEC 1 standard) and returns
0, 1 or 2 possible EC points that are valid public keys, corresponding
to the signature. To avoid this ambiguity, some ECDSA
implementations add one additional bit v to the signature during the
signing process and it takes the form {r, s, v}. From this extended
ECDSA signature {r, s, v} + the signed message, the signer's public
key can be restored with confidence.
The public key recovery from the ECDSA signature is very useful in
bandwidth constrained or storage constrained environments (such as
blockchain systems), when transmission or storage of the public keys
cannot be afforded. For example, the Ethereum blockchain uses
extended signatures {r, s, v} for the signed transactions on the chain to
save storage and bandwidth.
Public key recovery is possible for signatures, based on the ElGamal

signature scheme (such as DSA and ECDSA).

Sign / Verify Messages using
ECDSA - Examples in Python
After we explained in details how the ECDSA signature algorithm
works, now let's demonstrate it in practice with code examples.
In this example, we shall use the  pycoin  Python package, which
implements the ECDSA signature algorithm with the curve
 secp256k1  (used in the Bitcoin cryptography), as well as many other
functionalities related to the Bitcoin blockchain:
normalpip install pycoin
normal
ECDSA Sign / Verify using the
secp256k1 Curve and SHA3-256
First, define the functions for hashing, ECDSA signing and ECDSA
signature verification:
normalfrom pycoin.ecdsa import generator_secp256k1, sign, verify
import hashlib, secrets
def sha3_256Hash(msg):
 hashBytes = hashlib.sha3_256(msg.encode("utf8")).digest()
 return int.from_bytes(hashBytes, byteorder="big")
def signECDSAsecp256k1(msg, privKey):
 msgHash = sha3_256Hash(msg)
 signature = sign(generator_secp256k1, privKey, msgHash)
 return signature
def verifyECDSAsecp256k1(msg, signature, pubKey):
 msgHash = sha3_256Hash(msg)
 valid = verify(generator_secp256k1, pubKey, msgHash,
signature)
 return valid
normal

The hashing function  sha3_256Hash(msg)  computes and returns a
SHA3-256 hash, represented as 256-bit integer number. It will be used
in the sign / verify processes later.
The  signECDSAsecp256k1(msg, privKey)  function takes a text message
and 256-bit secp256k1 private key and calculates the ECDSA
signature {r, s} and returns it as pair of 256-bit integers. The ECDSA
signature, generated by the  pycoin  library by default is deterministic,
as described in RFC 6979.
The  verifyECDSAsecp256k1(msg, signature, pubKey)  function takes a
text message, a ECDSA signature {r, s} and a 2*256-bit ECDSA
public key (uncompressed) and returns whether the signature is valid
or not.
Now let's demonstrate the above defined functions to sign a message
and verify its signature:
normal# ECDSA sign message (using the curve secp256k1 + SHA3-256)
msg = "Message for ECDSA signing"
privKey = secrets.randbelow(generator_secp256k1.order())
signature = signECDSAsecp256k1(msg, privKey)
print("Message:", msg)
print("Private key:", hex(privKey))
print("Signature: r=" + hex(signature[0]) + ", s=" +
hex(signature[1]))
# ECDSA verify signature (using the curve secp256k1 + SHA3-256)
pubKey = (generator_secp256k1 * privKey).pair()
valid = verifyECDSAsecp256k1(msg, signature, pubKey)
print("\nMessage:", msg)
print("Public key: (" + hex(pubKey[0]) + ", " + hex(pubKey[1]) +
")")
print("Signature valid?", valid)
# ECDSA verify tampered signature (using the curve secp256k1 +
SHA3-256)
msg = "Tampered message"
valid = verifyECDSAsecp256k1(msg, signature, pubKey)
print("\nMessage:", msg)
print("Signature (tampered msg) valid?", valid)
normal
Run the above code example: https://repl.it/@nakov/ECDSA-signverify-in-Python.

The output from the above code is like this:
normalMessage: Message for ECDSA signing
Private key:
0x79afbf7147841fca72b45a1978dd7669470ba67abbe5c220062924380c9c364b
Signature:
r=0xb83380f6e1d09411ebf49afd1a95c738686bfb2b0fe2391134f4ae3d6d77b78a,
s=0x6c305afcac930a3ea1721c04d8a1a979016baae011319746323a756fbaee1811
Message: Message for ECDSA signing
Public key:
(0x3804a19f2437f7bba4fcfbc194379e43e514aa98073db3528ccdbdb642e240,
0x6b22d833b9a502b0e10e58aac485aa357bccd1df6ec0fa4d398908c1ac1920bc)
Signature valid? True
Message: Tampered message
Signature (tampered msg) valid? False
normal
As it is visible from the above output, the random generated
secp256k1 private key is 64 hex digits (256 bits). After signing, the
obtained signature {r, s} consists of 2 * 256-bit integers. The public
key, obtained by multiplying the private key by the curve generator
point, consists of 2 * 256 bits (uncompressed). The produced ECDSA
digital signature verifies correctly after signing. If the message is
tampered, the signature fails to verify.
Public Key Recovery from the ECDSA
Signature
As we already know, in ECDSA it is possible to recover the public
key from signature. Let's demonstrate this by adding the following
code at the end of the previous example:
normalfrom pycoin.ecdsa import
possible_public_pairs_for_signature
def recoverPubKeyFromSignature(msg, signature):
 msgHash = sha3_256Hash(msg)
 recoveredPubKeys = possible_public_pairs_for_signature(
 generator_secp256k1, msgHash, signature)
 return recoveredPubKeys

---

## Sección 50: Core Concepts & Foundations [Entropy: 0.5]

msg = "Message for ECDSA signing"
recoveredPubKeys = recoverPubKeyFromSignature(msg, signature)
print("\nMessage:", msg)
print("Signature: r=" + hex(signature[0]) + ", s=" +
hex(signature[1]))
for pk in recoveredPubKeys:
 print("Recovered public key from signature: (" +
 hex(pk[0]) + ", " + hex(pk[1]) + ")")
normal
Run the above code example: https://repl.it/@nakov/ECDSA-publickey-recovery-in-Python.
The above code recovers the all possible EC public keys from the
ECDSA signature + the signed message, using the algorithm,
described in http://www.secg.org/sec1-v2.pdf. Note that multiple EC
public keys (0, 1 or 2) may match the message + signature. The
expected output from the above code (together with the previous code)
looks like this:
normalMessage: Message for ECDSA signing
Private key:
0xc374556584db050001c2c9265b546e66d3dbbe8239d17427c176d834a19638dc
Signature:
r=0xd034c98af3274ad93f3c8ce944bbc17b11b6aa170c5f097ed98687fa0d93347c,
s=0xa2318ceea2002caba38efbba3bf8ef8d43236a6edc33c040734d8eb2ed77f608
Message: Message for ECDSA signing
Public key:
(0x10b5d9028ec828a0f9111e36f046afa5a0c677357351093426bcec10c663db7d,
0x271763c56fcd87b72d59ceaa5b9c3fd2122788fe344751a9bde373f903e5bb20)
Signature valid? True
Message: Tampered message
Signature (tampered msg) valid? False
Message: Message for ECDSA signing
Signature:
r=0xd034c98af3274ad93f3c8ce944bbc17b11b6aa170c5f097ed98687fa0d93347c,
s=0xa2318ceea2002caba38efbba3bf8ef8d43236a6edc33c040734d8eb2ed77f608
Recovered public key from signature:
(0x1353fd26a6cb6110980cfd2bb5eca3b3cc3e08c930ad5991395dd826a250c79,
0xba6825142e230ee1fa2b406f3f9158a47ee49daca8ac47898c5fd92d805a101e)
Recovered public key from signature:
(0x10b5d9028ec828a0f9111e36f046afa5a0c677357351093426bcec10c663db7d,
0x271763c56fcd87b72d59ceaa5b9c3fd2122788fe344751a9bde373f903e5bb20)
normal
It is obvious that the recovered possible public keys are 2: one is

equal to the public key, matching the signer's private key, and the
other is not (it matches the math behind the public key recovery, but is
not the correct one). To avoid this ambiguity, the signature can be
extended to hold {r, s, v}, where v holds the parity of the y coordinate
of the random point R from the ECDSA signing algorithm. This
coordinate is lost, because the ECDSA signature takes just the x
coordinate or R.
Public Key Recovery from Extended
ECDSA Signature
To recover with confidence the public key from ECDSA signature +
message, we need a library that generates extended ECDSA
signatures {r, s, v} and supports internally the public key recovery.
Let's play with the  eth_keys  Python library:
normalpip install eth_keys
normal
The eth_keys is part of the Ethereum project and implements
secp256k1-based ECC cryptography, private and public keys, ECDSA
extended signatures {r, s, v} and Ethereum blockchain addresses. The
following example demonstrates private key generation, message
signing, public key recovery from signature + message and signature
verification:
normalimport eth_keys, os
# Generate the private + public key pair (using the secp256k1
curve)
signerPrivKey = eth_keys.keys.PrivateKey(os.urandom(32))
signerPubKey = signerPrivKey.public_key
print('Private key (64 hex digits):', signerPrivKey)
print('Public key (uncompressed, 128 hex digits):', signerPubKey)
# ECDSA sign message (using the curve secp256k1 + Keccak-256)
msg = b'Message for signing'
signature = signerPrivKey.sign_msg(msg)
print('Message:', msg)

print('Signature: [r = {0}, s = {1}, v = {2}]'.format(
 hex(signature.r), hex(signature.s), hex(signature.v)))
# ECDSA public key recovery from signature + verify signature
# (using the curve secp256k1 + Keccak-256 hash)
msg = b'Message for signing'
recoveredPubKey = signature.recover_public_key_from_msg(msg)
print('Recovered public key (128 hex digits):', recoveredPubKey)
print('Public key correct?', recoveredPubKey == signerPubKey)
valid = signerPubKey.verify_msg(msg, signature)
print("Signature valid?", valid)
normal
Run the above code example: https://repl.it/@nakov/ECDSA-publickey-recovery-extended-in-Python.
The output from the above code looks like this:
normalPrivate key (64 hex digits):
0x68abc765746a33272e47b0a96a0b4184048f70354221e04219fbc223bfe79794
Public key (uncompressed, 128 hex digits):
0x30a6dc572da312587144e7ccda1e9abd901323adebe7091bb4985e1202c2a10bc25f681b
Message: b'Message for signing'
Signature: [r =
0x4cddf146c578d20a31fa6128e5d9afe6ac666e5ef5899f2767cacb56a42703cc,
s =
0x3847036857aa3f077a2e142eee707e5af2653baa99b9d10764a0be3d61595dbb,
v = 0x0]
Recovered public key (128 hex digits):
0x30a6dc572da312587144e7ccda1e9abd901323adebe7091bb4985e1202c2a10bc25f681b
Public key correct? True
Signature valid? True
normal
The public key recovery will always be successful, because there is
no ambiguity with the extended ECDSA signature. The signature
verification will be successful, unless the message, the public key or
the signature is tampered. You are free to play with the above code, to
change it, to tamper the signed message and to see what happens.
Enjoy!

Exercises: Sign / Verify Messages
using ECDSA and the NIST P-521
Curve
In this exercise we shall sign and verify messages using the ECDSA
digital signature algorithm and the NIST P-521 curve. The NIST P-521
elliptic curve, known also as  secp521r1  is 521-bit ECC curve, suitable
for ECDSA digital signatures and ECDH key agreement. It uses 521-
bit private keys (encoded as 65-66 bytes, 130-132 hex digits) and
1042-bit public keys (uncompressed, encoded as 130-131 bytes,
260-261 hex digits). The produced signature is 132 bytes (264 hex
digits).
Sign a Message with ECDSA / P-521
Write a program to sign a message by given private key. The input
consists of 2 text lines: message and private key. The message is
given as text and the private key is given as hex string (130-132 hex
digits). Use the ECDSA deterministic signing (following RFC 6979)
and the curve NIST P-521, which also known as secp521r1. Print the
output as JSON document, holding the input message + the public
key of the signer (as hex string, uncompressed) + the ECDSA digital
signature (as hex string).
Sample input:
normalMessage for ECDSA-NIST-521p signing
00135799f9d1f033af26168780bf2503313acff854c44031321d7a29bba96edb3c1b93b9de
normal
Sample output:

---

## Sección 51: Core Concepts & Foundations [Entropy: 0.545]

normal{
 "msg": "Message for ECDSA-NIST-521p signing",
 
"pubKey":"0078a6bb6732cb3134d2ca3912b2876fe005b20027037512cf972605f58ce59
 
"signature":"00202029ab1a3326fe7d1e9ec36d7fab048e833c6c3cad37e1d5294695d2
}
normal
Verify Message Signature with ECDSA /
P-521
Write a program to validate the ECDSA digital signature, created by
the previous exercise. The input comes as JSON document, holding
the message + the public key (uncompressed, hex string) + the
signature. Use the P-521 elliptic curve ( secp521r1 ). Print as output a
single word: "valid' or "invalid".
Sample input (correctly signed message):
normal{
 "msg": "Message for ECDSA-NIST-521p signing",
 
"pubKey":"0078a6bb6732cb3134d2ca3912b2876fe005b20027037512cf972605f58ce59
 
"signature":"00202029ab1a3326fe7d1e9ec36d7fab048e833c6c3cad37e1d5294695d2
}
normal
Sample output:
normalvalid
normal
Sample input (tampered message):
normal{
 "msg": "Tampered message",
 
"pubKey":"0078a6bb6732cb3134d2ca3912b2876fe005b20027037512cf972605f58ce59
 
"signature":"00202029ab1a3326fe7d1e9ec36d7fab048e833c6c3cad37e1d5294695d2

}
normal
Sample output:
normalinvalid
normal

EdDSA and Ed25519: Elliptic Curve
Digital Signatures
EdDSA (Edwards-curve Digital Signature Algorithm) is a modern and
secure digital signature algorithm based on performance-optimized
elliptic curves, such as the 255-bit curve Curve25519 and the 448-bit
curve Curve448-Goldilocks. The EdDSA signatures use the Edwards
form of the elliptic curves (for performance reasons), respectively
 edwards25519  and  edwards448 . The EdDSA algorithm is based on the
Schnorr signature algorithm and relies on the difficulty of the
ECDLP problem.
The EdDSA signature algorithm and its variants Ed25519 and Ed448
are technically described in the RFC 8032.
EdDSA Key Generation
Ed25519 and Ed448 use small private keys (32 or 57 bytes
respectively), small public keys (32 or 57 bytes) and small
signatures (64 or 114 bytes) with high security level at the same
time (128-bit or 224-bit respectively).
Assume the elliptic curve for the EdDSA algorithm comes with a
generator point G and a subgroup order q for the EC points, generated
from G.
The EdDSA key-pair consists of:
• private key (integer): privKey
• public key (EC point): pubKey = privKey * G
The private key is generated from a random integer, known as seed

(which should have similar bit length, like the curve order). The seed is
first hashed, then the last few bits, corresponding to the curve
cofactor (8 for Ed25519 and 4 for X448) are cleared, then the highest
bit is cleared and the second highest bit is set. These transformations
guarantee that the private key will always belong to the same
subgroup of EC points on the curve and that the private keys will
always have similar bit length (to protect from timing-based sidechannel attacks). For Ed25519 the private key is 32 bytes. For Ed448
the private key is 57 bytes.
The public key pubKey is a point on the elliptic curve, calculated by
the EC point multiplication: pubKey = privKey * G (the private key,
multiplied by the generator point G for the curve). The public key is
encoded as compressed EC point: the y-coordinate, combined with
the lowest bit (the parity) of the x-coordinate. For Ed25519 the public
key is 32 bytes. For Ed448 the public key is 57 bytes.
EdDSA Sign
The EdDSA signing algorithm (RFC 8032) takes as input a text
message msg + the signer's EdDSA private key privKey and
produces as output a pair of integers {R, s}. EdDSA signing works as
follows (with minor simplifications):
 EdDSA_sign(msg, privKey) --> { R, s } 
1. Calculate pubKey = privKey * G
2. Deterministically generate a secret integer r =
hash(hash(privKey) + msg) mod q (this is a bit simplified)
3. Calculate the public key point behind r by multiplying it by the
curve generator: R = r * G
4. Calculate h = hash(R + pubKey + msg) mod q
5. Calculate s = (r + h * privKey) mod q
6. Return the signature { R, s }

The produced digital signature is 64 bytes (32 + 32 bytes) for
Ed25519 and 114 bytes (57 + 57 bytes) for Ed448. It holds a
compressed point R + the integer s (confirming that the signer knows
the msg and the privKey).
EdDSA Verify Signature
The EdDSA signature verification algorithm (RFC 8032) takes as
input a text message msg + the signer's EdDSA public key pubKey +
the EdDSA signature {R, s} and produces as output a boolean value
(valid or invalid signature). EdDSA verification works as follows (with
minor simplifications):
 EdDSA_signature_verify(msg, pubKey, signature { R, s } ) --> valid / invali
1. Calculate h = hash(R + pubKey + msg) mod q
2. Calculate P1 = s * G
3. Calculate P2 = R + h * pubKey
4. Return P1 == P2
How Does it Work?
During the verification the point P1 is calculated as: P1 = s * G.
During the signing s = (r + h * privKey) mod q. Now replace s in the
above equation:
• P1 = s * G = (r + h * privKey) mod q * G = r * G + h * privKey *
G = R + h * pubKey
The above is exactly the other point P2. If these points P1 and P2 are
the same EC point, this proves that the point P1, calculated by the
private key matches the point P2, created by its corresponding public
key.

ECDSA vs EdDSA
If we compare the signing and verification for EdDSA, we shall find that
EdDSA is simpler than ECDSA, easier to understand and to
implement. Both signature algorithms have similar security strength
for curves with similar key lengths. For the most popular curves (liked
 edwards25519  and  edwards448 ) the EdDSA algorithm is slightly
faster than ECDSA, but this highly depends on the curves used and
on the certain implementation. Unlike ECDSA the EdDSA signatures
do not provide a way to recover the signer's public key from the
signature and the message. Generally, it is considered that EdDSA is
recommended for most modern apps.

Sign / Verify Messages using
EdDSA - Examples in Python
After we explained in the previous section how the EdDSA signatures
work, now it is time to demonstrate them with code examples. First, we
shall demonstrated how to use Ed25519 signatures.
Ed25519 Signatures - Example
We shall use the Python library  ed25519 , which is based on the
Bernstein's original optimized highly optimized C implementation of the
Ed25519 signature algorithm (EdDSA over the Curve25519 in
Edwards form):
normalpip install ed25519
normal
Next, generate a private + public key pair for the Ed25519
cryptosystem, sign a sample message, and verify the signature:
normalimport ed25519
privKey, pubKey = ed25519.create_keypair()
print("Private key (32 bytes):",
privKey.to_ascii(encoding='hex'))
print("Public key (32 bytes): ", pubKey.to_ascii(encoding='hex'))
msg = b'Message for Ed25519 signing'
signature = privKey.sign(msg, encoding='hex')
print("Signature (64 bytes):", signature)
try:
 pubKey.verify(signature, msg, encoding='hex')
 print("The signature is valid.")
except:
 print("Invalid signature!")
normal

---

## Sección 52: Core Concepts & Foundations [Entropy: 0.571]

Run the above code example: https://repl.it/@nakov/Ed25519-signverify-in-Python.
The output from the above sample code looks like this:
normalPrivate key (32 bytes):
b'1498b5467a63dffa2dc9d9e069caf075d16fc33fdd4c3b01bfadae6433767d93'
Public key (32 bytes): 
b'b7a3c12dc0c8c748ab07525b701122b88bd78f600c76342d27f25e5f92444cde'
Signature (64 bytes):
b'6dd355667fae4eb43c6e0ab92e870edb2de0a88cae12dbd8591507f584fe4912babff49
The signature is valid.
normal
The Ed25519 key pair is generated randomly: first a 32-byte random
seed is generated, then the private key is derived from the seed, then
the public key is derived from the private key. The hash function for
key generation is SHA-512.
The private key is encoded as 64 hex digits (32 bytes). The public
key is encoded also as 64 hex digits (32 bytes). The EdDSA-Ed25519
signature {R, s} is 32 + 32 bytes (64 bytes, 128 hex digits).
If we try to verify a tampered message, the verification will fail:
normaltry:
 pubKey.verify(signature, "Tampered msg", encoding='hex')
 print("The signature is valid.")
except:
 print("Invalid signature!")
normal
Run the above code example: https://repl.it/@nakov/Ed25519-verifytampered-message-in-Python.
The output from the above sample code is as expected:
normalInvalid signature!
normal

Ed448 Signatures - Example
Now, let's demonstrate how to use the Ed448 signature (EdDSA over
the Curve448-Goldilocks curve in Edwards form).
We shall use the Python elliptic curve library  ECPy , which implements
ECC with Weierstrass curves (like  secp256k1  and  NIST P-256 ),
Montgomery curves (like  Curve25519  and  Curve448 ) and twisted
Edwards curves (like  Ed25519  and  Ed448 ):
normalpip install ecpy
normal
Next, generate a private + public key pair for the Ed448
cryptosystem:
normalfrom ecpy.curves import Curve
from ecpy.keys import ECPrivateKey
from ecpy.eddsa import EDDSA
import secrets, hashlib, binascii
curve = Curve.get_curve('Ed448')
signer = EDDSA(hashlib.shake_256, hash_len=114)
privKey = ECPrivateKey(secrets.randbits(57*8), curve)
pubKey = signer.get_public_key(privKey, hashlib.shake_256,
hash_len=114)
print("Private key (57 bytes):", privKey)
print("Public key (compressed, 57 bytes): ",
 binascii.hexlify(curve.encode_point(pubKey.W)))
print("Public key (point): ", pubKey)
normal
Run the above code example: https://repl.it/@nakov/Ed448-privatepublic-keys-in-Python.
The Ed448 key pair is generated randomly. According to RFC 8032
the Ed448 private key is generated from 57-byte random seed, which
is transformed to 57-byte public key using the SHAKE256(x,
hash_len=114) hash function, along with EC point multiplication and
the special key encoding rules for Ed448.

The output from the above sample code may look like this:
normalPrivate key (57 bytes): ECPrivateKey:
 d:
625d3edeb5cd69b20b0b6387c3522a21d356ac40b408e34fb2f8442e2c91eee3f877afe58
Public key (compressed, 57 bytes): 
b'261d23911e194ed0cb7f9233568e906d6abcf4d60f73451ca807636d8fa6e4ea5ca12f5
Public key (point): ECPublicKey:
 x:
cb5aec366d6b3293354418f8abf67bd5aaf46b49ff9c2154fbc14d9ca22fe93b680954f27
 y:
edcca8f7c4a8d24ece7421cb1ca6860b9a2940d2512fa15ceae4a68f6d6307a81c45730fd
normal
The private key is encoded as 114 hex digits (57 bytes). The public
key is encoded also as 114 hex digits (57 bytes), in compressed form.
In the above example the public key EC point is printed also in
uncompressed format (x and y coordinates). The EdDSA-Ed448
signature {R, s} consists of 57 + 57 bytes (114 bytes, 228 hex digits).
Next, sign a sample message using the private key, and verify the
signature using the public key after that:
normalmsg = b'Message for Ed448 signing'
signature = signer.sign(msg, privKey)
print("Signature (114 bytes):", binascii.hexlify(signature))
valid = signer.verify(msg, signature, pubKey)
print("Valid signature?", valid)
normal
Run the above code example: https://repl.it/@nakov/Ed448-sign-verifyin-Python.
The output from the above code example (for the above Ed448 key
pair) is:
normalSignature (114 bytes):
b'5114674f1ce8a2615f2b15138944e5c58511804d72a96260ce8c587e7220daa90b9e65b
Valid signature? True
normal
The signature is deterministic: the same message with the same

private key produces the same signature.
If we try to verify the same signature with a tampered message, the
verification will fail:
normalvalid = signer.verify(b'Tampered msg', signature, pubKey)
print("Valid signature?", valid)
normal
Run the above code example: https://repl.it/@nakov/Ed448-verifytampered-message-in-Python.
The output from the above sample code is as expected:
normalValid signature? False
normal

Exercises: Sign / Verify Messages
using Ed25519
In this exercise we shall sign and verify messages using the EdDSA
digital signature algorithm and the  edwards25519  curve, following the
technical specification from RFC 8032. The Ed25519 digital signature
algorithm can be found as library for the most programming languages.
The Ed25519 private key is encoded as 64 hex digits (32 bytes). The
corresponding Ed25519 public key is encoded also as 64 hex digits
(32 bytes). The EdDSA-Ed25519 signature {R, s} consists of 32 + 32
bytes (64 bytes, 128 hex digits).
EdDSA-Ed25519: Sign Message
Write a program to sign given text message with given private key.
The input consists of 2 text lines. The first line holds the input
message for signing. The second line holds the private key as hex
string. Print the output as JSON document, holding the input
message + the public key of the signer (as hex string,
uncompressed) + the Ed25519 digital signature (as hex string).
Sample input:
normalMessage for Ed25519 signing
de6d730f36a8607b8bfdaa79b3b1127291f1d50552c2fe05c5254a9719105c4a
normal
Sample output:
normal{
 "msg": "Message for Ed25519 signing",
 

"pubKey":"7721a5832cb70cce1a960cf236d50a0e862555ccad400b5fee0bcf777f7ab47
 
"signature":"6c4adbba332b5db520c0ec95433ea136f70fe2d50e8955a7049d216626a3
}
normal
EdDSA-Ed25519: Verify Signature
Write a program to validate the Ed25519 digital signature, created
by the previous exercise. The input comes as JSON document,
holding the message + the public key (uncompressed, hex string) +
the signature. Print as output a single word: "valid' or "invalid".
Sample input (correctly signed message):
normal{
 "msg": "Message for Ed25519 signing",

---

## Sección 53: Core Concepts & Foundations [Entropy: 0.68]

"pubKey":"7721a5832cb70cce1a960cf236d50a0e862555ccad400b5fee0bcf777f7ab47
 
"signature":"6c4adbba332b5db520c0ec95433ea136f70fe2d50e8955a7049d216626a3
}
normal
Sample output:
normalvalid
normal
Sample input (tampered message):
normal{
 "msg": "Tampered msg",
 
"pubKey":"7721a5832cb70cce1a960cf236d50a0e862555ccad400b5fee0bcf777f7ab47
 
"signature":"6c4adbba332b5db520c0ec95433ea136f70fe2d50e8955a7049d216626a3
}
normal
Sample output:

normalinvalid
normal

Quantum Computers and Quantum-
Safe Cryptography
Quantum computers are ...
• TODO
• TODO
See this page: https://ianix.com/pqcrypto/pqcrypto-deployment.html
• TODO
Quantum computing is a model of computing based on the quantum
physics, which works differently than classical computers and can do
things that classical computers can’t, such
as breaking RSA and ECC efficiently. Quantum computers are not
"faster computers" and they are not all-powerful and cannot do any
computing job faster. Quantum computers are very efficient for certain
problems and quite weak for others.
It is well known in computer science that quantum computers will
break some cryptographic algorithms, especially the public-key
cryptosystems like RSA, ECC and ECDSA that rely on the IFP (integer
factorization problem), the DLP (discrete logarithms problem) and the
ECDLP (elliptic-curve discrete logarithm problem). Quantum
algorithms will not be the end of cryptography, because:
• Only some cryptosystems are quantum-unsafe (like RSA,
DHKE, ECC, ECDSA and ECDH).
• Some cryptosystems are quantum-safe and will be only slightly
affected (like cryptographic hashes, MAC algorithms and
symmetric key ciphers).

Let's discuss this in details.
Quantum-Safe and Quantum-Broken
Crypto Algorithms
Most cryptographic hashes (like SHA2, SHA3, BLAKE2), MAC
algorithms (like HMAC and CMAK), key-derivation functions (bcrypt,
Scrypt, Argon2) are basically quantum-safe (only slightly affected by
quantum computing).
• Use 384-bits or more to be quantum-safe (256-bits should be
enough for long time)
Symmetric ciphers (like AES-256, Twofish-256) are quantum-safe.
• Use 256-bits or more as key length (don't use 128-bit AES)
Most popular public-key cryptosystems (like RSA, DSA, ECDSA,
EdDSA, DHKE, ECDH, ElGamal) are quantum-broken!
• Most digital signature algorithms (like RSA, ECDSA, EdDSA)
are quantum-broken!
• Quantum-safe signature algorithms and public-key
cryptosystems are already developed (e.g. lattice-based or
hash-based signatures), but are not massively used, because of
longer keys and longer signatures than ECC.
See https://en.wikipedia.org/wiki/Post-quantum_cryptography
...
Quantum-Resistant Crypto Algorithms
...
ECC Cryptography and Most Digital
Signatures are Quantum-Broken!

...
A k-bit number can be factored in time of order O(k^3) using a
quantum computer of 5k+1 qubits (using Shor's algorithm).
• See http://www.theory.caltech.edu/~preskill/pubs/preskill-1996-
networks.pdf
256-bit number (e.g. Bitcoin public key) can be factorized using 1281
qubits in 72*256^3 quantum operations.
• ~ 1.2 billion operations == ~ less than 1 second using good
machine
ECDSA, DSA, RSA, ElGamal, DHKE, ECDH cryptosystems are all
quantum-broken
Conclusion: publishing the signed transactions (like Ethereum does) is
not quantum safe -> avoid revealing the ECC public key
Hashes are Quantum Safe
Cryptographic hashes (like SHA2, SHA3, BLAKE2) are considered
quantum-safe:
• On traditional computer, finding a collision for 256-bit hash takes
√2^256 steps (using the birthday attack) -> SHA256 has 2^128
crypto-strength
• Quantum computers might find hash collisions in ∛2^256
operations (see the BHT algorithm), but this is disputed (see
[Bernstein 2009] - http://cr.yp.to/hash/collisioncost-20090823.pdf
• On theory it might take 2^85 quantum operations to find SHA256
/ SHA3-256 collision, but in practice it may cost significantly
more.
Conclusion: SHA256 / SHA3-256 are most probably quantum-safe
• SHA384, SHA512 and SHA3-384, SHA3-512 are quantum-safe

...
Symmetric Ciphers are Quantum Safe
...
Most symmetric ciphers (like AES and ChaCha20) are quantum-safe:
• [Grover's algorithm]([[[[https://en.wikipedia.org/wiki/
Grover's_algorithm](https://en.wikipedia.org/wiki/
Grover's_algorithm)](https://en.wikipedia.org/wiki/
Grover's_algorithm](https://en.wikipedia.org/wiki/
Grover's_algorithm))](https://en.wikipedia.org/wiki/
Grover's_algorithm](https://en.wikipedia.org/wiki/
Grover's_algorithm)](https://en.wikipedia.org/wiki/
Grover's_algorithm](https://en.wikipedia.org/wiki/
Grover's_algorithm)))](https://en.wikipedia.org/wiki/
Grover's_algorithm](https://en.wikipedia.org/wiki/
Grover's_algorithm)](https://en.wikipedia.org/wiki/
Grover's_algorithm](https://en.wikipedia.org/wiki/
Grover's_algorithm))](https://en.wikipedia.org/wiki/
Grover's_algorithm](https://en.wikipedia.org/wiki/
Grover's_algorithm)](https://en.wikipedia.org/wiki/
Grover's_algorithm](https://en.wikipedia.org/wiki/
Grover's_algorithm))))\) finds AES secret key using √ᵄ quantum
operations
• Quantum era will double the key size of the symmetric ciphers,
see http://cr.yp.to/codes/grovercode-20100303.pdf
AES-256 in the post-quantum era is like AES-128 before
• 128-bits or less symmetric ciphers are quantum-attackable
Conclusion: 256-bit symmetric ciphers are generally quantum safe
• AES-256, ChaCha20-256, Twofish-256, Camellia-256 are

considered quantum-safe
Post-Quantum Cryptography
...
Quantum-Safe key agreement: https://en.wikipedia.org/wiki/CECPQ1
https://ianix.com/pqcrypto/pqcrypto-deployment.html
https://pqcrypto.org
Post-quantum signature scheme XMSS:
• https://tools.ietf.org/html/rfc8391
• JS XMSS - https://www.npmjs.com/package/xmss
• Post-quantum key agreement schemes McEliece and NewHope
Post-quantum signatures and key agreements (XMSS, McEliece,
NewHope):
https://github.com/randombit/botan
QC-MDPC and libPQC are quantum-broken: https://
eprint.iacr.org/2016/858.pdf
Hash-Based Public-Key Cryptography
...
Code-Based Public-Key Cryptography
...
Lattice-Based Public-Key Cryptography
...

---

## Sección 54: Core Concepts & Foundations [Entropy: 0.725]

GLYPH signatures (lattice-based Ring-LWE Lattice, Ring-LWE, Ring
Learning with Errors)
• Implementation in Go: https://github.com/AidosKuneen/glyph
BLISS - http://bliss.di.ens.fr
• Implementation in Go: https://github.com/HcashOrg/bliss/blob/
master/demo_test.go
NewHope
• Go implementation: https://github.com/Yawning/newhope
• Python implementation: https://github.com/scottwn/PyNewHope
• Python implementation: https://github.com/anupsv/NewHope-
Key-Exchange
XMSS
• Python implementation: https://github.com/theQRL/QRL/blob/
master/src/qrl/crypto/xmss.py
NTRU: NTRUEncrypt and NTRUSign
• https://en.wikipedia.org/wiki/NTRUEncrypt
Zero-Knowledge Proof-Based
PICNIC - https://github.com/Microsoft/Picnic
Multivariate-Quadratic-Equations Public-Key
Cryptography
Rainbow: https://github.com/bcgit/bc-java/tree/master/core/src/main/
java/org/bouncycastle/pqc/crypto/rainbow
...

Quantum-Resistant Cryptography -
Libraries
The quantum-safe cryptography is still emerging, not mature, and still
not widely supported by the most crypto-libraries and tools like Web
browsers, OpenSSL, OpenSSH, etc. This is a list of well developed
quantum crypto algorithm libraries:
• liboqs (Open Quantum Safe) - https://github.com/openquantum-safe/liboqs
• Bouncy Castle PQC - https://github.com/bcgit/bc-java/tree/
master/core/src/main/java/org/bouncycastle/pqc/crypto
SPHINCS+ Signatures in Python
https://github.com/sphincs/pyspx
https://pypi.org/project/PySPX
NewHope Key Exchange in Python
https://github.com/anupsv/NewHope-Key-Exchange
https://github.com/scottwn/PyNewHope

Quantum-Safe Signatures -
Examples in Python
In this example, we shall demonstrate the SPHINCS+ signature library.
It implements hash-based signatures, which are designed to be
quantum-safe. Note that the SPHINCS+ signatures are still
experimental (as of Nov 2018) and their security is not still
indisputably proven, because they are relatively new and are still not
well analysed by cryptographers.
We shall demonstrate the SPHINCS+ cryptosystem for hash-based
digital signatures, more precisely two of its configurations:
• SPHINCS+-128f – 64-byte private key, 32-byte public key,
~16.9KB signature, instant key generation, fast signing speed <
1 sec, instant verification, 128-bit security level
• SPHINCS+-128s – 64-byte private key, 32-byte public key, ~
8KB signature, instant key generation, slow signing speed ~ few
secs, instant verification, 133-bit security level
To install the official SPHINCS+ signature library PySPX for Python,
use the following command:
normalpip install pyspx
normal
The  pyspx  package may not compile in Windows (using the Visual C+
+ compiler), so Linux is recommended (or a Python virtual machine
like PythonAnywhere or Repl.it).
Let's demonstrate the SPHINCS+ signature with the  shake256_128f 
parameter set (SPHINCS+, using SHAKE256-128 as hash function

and in fast mode), using this Python example:
normalimport pyspx.shake256_128f as sphincs
import os, binascii
# Key generation: private + public key
seed = os.urandom(sphincs.crypto_sign_SEEDBYTES)
public_key, secret_key = sphincs.generate_keypair(seed)
print("Public key:", binascii.hexlify(public_key))
print("Private key:", binascii.hexlify(secret_key))
# Sign message and verify signature
message = b'Message for SPHINCS+ shake256_128f signing'
signature = sphincs.sign(message, secret_key)
valid = sphincs.verify(message, signature, public_key)
print("Message:", message)
print("Signature:", binascii.hexlify(signature))
print("Signature valid?", valid)
# Verify tampered message + signature
message = b'Tampered msg'
valid = sphincs.verify(message, signature, public_key)
print("Tampered message:", message)
print("Tampered signature valid?", valid)
normal
Run the above code example: https://repl.it/@nakov/SPHINCSplussignature-in-Python.
The above code is fast: it runs for portion of the second. The output
from it looks like this:
normalPublic key:
b'73004fe93b401a2ab9e0f3ccebbb9d8fe38b0080033eb80a9ecd8028451bbbcb'
Private key:
b'e2e5f5f4574cc2774ee4b30c21f4067321a619d54dd92e539b6adcf6f932c6c573004fe
Message: b'Message for SPHINCS+ shake256_128f signing'
Signature:
b'fbdb1d37371b7f18fb8b1cb2ae452f2aea3c17b4b5c2cee564ee6617915ba3aa813c1eb
Signature valid? True
Tampered message: b'Tampered msg'
Tampered signature valid? False
normal
It is visible from the above output that for the  shake256_128f 
parameter set the SPHINCS+ public key is small (32 bytes), the
private key is also small (64 bytes), but the signature is big (16976
bytes, ~16.9 KB, partially shown above). This makes SPHINCS+

signatures not an ideal solution for the post-quantum signatures.
Additionally, the signature computation speed is sensibly slower than
RSA and ECDSA.
Let's tweak the SPHINCS+ algorithm parameters to get shorter
signature, using the  shake256_128s  parameter set (SPHINCS+, using
SHAKE256-128 as hash function and in slow mode). This smaller
signature will cost many times more computing time for signing.
Let's change the algorithm parameters like this (in fact the important
change is at the first line only):
normalimport pyspx.shake256_128s as sphincs
import os, binascii
# Key generation: private + public key
seed = os.urandom(sphincs.crypto_sign_SEEDBYTES)
public_key, secret_key = sphincs.generate_keypair(seed)
print("Public key:", binascii.hexlify(public_key))
print("Private key:", binascii.hexlify(secret_key))
# Sign message and verify signature
message = b'Message for SPHINCS+ shake256_128s signing'
signature = sphincs.sign(message, secret_key)
valid = sphincs.verify(message, signature, public_key)
print("Message:", message)
print("Signature:", binascii.hexlify(signature))
print("Signature valid?", valid)
# Verify tampered message + signature
message = b'Tampered msg'
valid = sphincs.verify(message, signature, public_key)
print("Tampered message:", message)
print("Tampered signature valid?", valid)
normal
Run the above code example: https://repl.it/@nakov/SPHINCSplussignature-smaller-size-in-Python.
The produced signature size now is smaller (~ 8KB, partially shown
below), but the time to generate the signature is drastically increased
(signing takes a few seconds, key generation and signature
verification are still fast):
normalPublic key:
b'd2ac35f1a6124b4a45d196b3fa9292b9bb3245f8c0dbdb586ea5879eb22487f0'

---

## Sección 55: Core Concepts & Foundations [Entropy: 0.553]

Private key:
b'8dc8e4cf3dc6fd28cb14a46fa2350dd41acdfb351c49e8caea86ca95ee2184ddd2ac35f
Message: b'Message for SPHINCS+ shake256_128s signing'
Signature:
b'a92bbecfae693e3fdc15fa0f5d9f4a941a7ae98822be6ca0d194db3930e45fe5cb429b2
Signature valid? True
Tampered message: b'Tampered msg'
Tampered signature valid? False
normal
We may conclude that quantum-safe digital signature algorithms like
SPHINCS+ signatures may replace ECDSA and EdDSA in the postquantum computing era, but they still have one big disadvantage:
large signatures. For some applications the signature size may not be
a problem, but for others smaller signatures are critical.

Quantum-Safe Key Exchange -
Examples in Python
In this example we shall demonstrate the how to use the NewHope
key exchange protocol, which is a quantum-safe lattice-based keyexchange algorithm, designed to provide at least 128-bit postquantum security level. The underlying math is based on the Ring-
Learning-with-Errors (Ring-LWE) problem and operates in a ring of
integer polynomials by certain modulo. The key-exchange operates
like this:
1. Alice generates a random private key and corresponding public
message (public key) and sends the message to Bob. The
public message consists of 1024 polynomial coefficients
(integers in the range [0...61443]) + random seed (32 bytes).
2. Bob takes the message from Alice (polynomial + seed) and
calculates from it the shared secret key between Alice and Bob.
Bob also generates internally a private key and uses it to
calculate and sends a public message to Alice. This public
message consists of 2 polynomials, each represented by 1024
integer coefficients.
3. Alice takes the message from Bob (the 2 polynomials) and
calculates from it the shared secret key between Alice and Bob
(using her private key). The calculated shared key consists of
32 bytes (256 bits), perfect for symmetric key encryption.
To illustrate the NewHope key exchange algorithm, we shall use the
 PyNewHope  package from the Python's official PyPI repository (which is
designed for educational purposes and is not certified for production
use):

normalpip install pynewhope
normal
The code to demonstrate the quantum-safe key-exchange "NewHope"
is simple:
normalfrom pynewhope import newhope
# Step 1: Alice generates random keys and her public msg to Bob
alicePrivKey, aliceMsg = newhope.keygen()
print("Alice sends to Bob her public message:", aliceMsg)
# Step 2: Bob receives the msg from Alice and responds to Alice
with a msg
bobSharedKey, bobMsg = newhope.sharedB(aliceMsg)
print("\nBob's sends to Alice his public message:", bobMsg)
print("\nBob's shared key:", bobSharedKey)
# Step 3: Alice receives the msg from Bob and generates her
shared secret
aliceSharedKey = newhope.sharedA(bobMsg, alicePrivKey)
print("\nAlice's shared key:", aliceSharedKey)
if aliceSharedKey == bobSharedKey:
 print("\nSuccessful key exchange! Keys match.")
else:
 print("\nError! Keys do not match.")
normal
Run the above code example: https://repl.it/@nakov/NewHope-keyexchange-in-Python.
Alice generates a private key + public message and sends her public
message to Bob, then Bob calculates his copy of the shared secret
key from Alice's message and generates a public message for Alice,
and finally Alice calculates her copy of the shared secret key from her
private key together with Bob's message.
The output from the above code looks like this (the 1024 polynomial
coefficients are given in abbreviated form):
normalAlice sends to Bob her public message: ([12663, 7323, 8979,
7763, 11139, 5460, 7337, 12182, ..., 8214, 10808, 8987],
b'*[\x98t\xae\xe9\xc5H\xfc\xc2\x9b$
\xd6\xaa[8k\xc1\x8d\xad\x1d\x01\x87i\xed\x03\x06\xe1k2\xa7N')
Bob's sends to Alice his public message: ([2, 1, 1, 2, 0, 1, 1,

1, 1, 3, 3, 2, 1, 1, 3, 0, ..., 0, 0, 3], [7045, 4326, 6186,
8298, 12738, ..., 7730, 10577, 8046])
Bob's shared key: [228, 159, 146, 8, 56, 146, 50, 7, 59, 87, 113,
57, 151, 137, 240, 139, 215, 33, 71, 188, 108, 239, 231, 252,
230, 77, 181, 178, 176, 7, 219, 217]
Alice's shared key: [228, 159, 146, 8, 56, 146, 50, 7, 59, 87,
113, 57, 151, 137, 240, 139, 215, 33, 71, 188, 108, 239, 231,
252, 230, 77, 181, 178, 176, 7, 219, 217]
Successful key exchange! Keys match.
normal
It is visible that the calculated secret shared key is the same 32-byte
sequence for Alice and Bob and thus the key exchange algorithm
works correctly. The above demonstrated HewHope key exchange
algorithm works quite fast and provides a 128 bits of post-quantum
security.

Quantum-Safe Asymmetric
Encryption - Examples in Python
TODO: Explain about the McEliece cryptosystem:
• https://en.wikipedia.org/wiki/McEliece\_cryptosystem
TODO: Demonstrate McEliece asymmetric quantum-safe encryption it
in Python:
• https://github.com/jkrauze/mceliece

More Cryptographic Concepts for
Developers
...
Digital Certificates, the X.509 Standard
and PKI
...
https://cryptography.io/en/latest/x509/
Transport Layer Security (TLS) and
SSL
...
https://en.wikipedia.org/wiki/Transport_Layer_Security
A cipher suite is a set of algorithms that help secure a network
connection that uses Transport Layer Security (TLS) or its nowdeprecated predecessor Secure Socket Layer (SSL). The set of
algorithms that cipher suites usually contain include: a key exchange
algorithm, a symmetric encryption algorithm, and a message
authentication code (MAC) algorithm.
External Authentication and OAuth
...

Two-Factor Authentication and One-
Time Passwords
Multi-Factor authentication adds additional layers of identity
authentication. Usually, those factors should be added to some of the
following categories:
• What I know
• What I have
• What I am
Two-Factor Authentication requires two of those three categories to be
implemented. The most common case of Two-Factor Authentication
is a user password and a device on which will be sent/generate onetime-password. To generate a one-time-password (OTP) the HMACbased One-time Password algorithm is used.
HMAC-based One-time Password (HOTP)
The HOTP algorithm is based on HMAC and provides a symmetric
generation of human-readable passwords, each used for only one
authentication attempt. The key parameter of HTOP is a secret which
has to be exchanged between the parties in advance:
normalHTOP(has_function, secret, value_length) -> htop
htop.generate() -> auth_code
htop.validate(auth_code) -> true/false
normal
The hash_func can be any cryptographic hash function. The secret is
the arbitrary byte string which must be shared between the parties and
kept private. value_length defines the auth_code length.
Counter-based One-Time Password algorithm
(COTP)

---

## Sección 56: Core Concepts & Foundations [Entropy: 0.87]

In the COTP scenario the HTOP function contains an internal counter.
In order for parties to successfully authenticate each other they have to
keep their counters in sync. Each time HOTP is requested to generate
an auth_code the counter increments.
Time-based One-Time Password Algorithm
(TOTP)
Time-based One-Time Password Algorithm (TOTP) is an extension of
COTP, where the counter is the current time, defined as Unix time.
The time-interval is another parameter used for the generation of
TOTP, which defines a period of time of which a given authentication
code will be valid.
normalhtop_counter = (current_time - initial_time) /
time_interval
normal
For TOTP to work correctly both parties need to have synchronized
clocks with minimal verification time-step window (delay based on
user's input, network latency, and clock time deviation).
normalotp = TOTP(hash_function(secret), htop_counter)
normal
Time-based One-Time Password in Practice
A popular use case of Two-Factor Authentication is the Google
Authenticator. A server generates a secret and shares it as a QR
code with the client. The client scan and store the secret in the Google
Authenticator application on a phone. After that, the server and the
phone start to generate the same one-time passwords.
An example of a web-based JavaScript example for using and testing
TOTP:

Infected Cryptosystems and Crypto
Backdoors
https://en.wikipedia.org/wiki/Kleptography
Other Cryptographic Concepts and
Standards
Just to mention, the practical cryptography is endless. This is a list of

crypto concepts, algorithm, protocols and standards that we will not
going to explain in this book, but you can read about them from the
provided links:
• Kerberos - ...
• IPsec - ...
• WiFi cryptography standards - ...
• PGP - ...
• S/MIME - ...
• JSON Web Tokens (JWT)
• Object Identifiers (OID) - https://en.wikipedia.org/wiki/
Object_identifier, e.g. the algorithm "SHA-256" has OID
"2.16.840.1.101.3.4.2.1".
• Cryptography Best Practices: https://gist.github.com/
atoponce/07d8d4c833873be2f68c34f9afc5a78a

X.509 Digital certificates - Examples
in Python
...
Generate X.509 self-signed certificate
Dump certificate data from the Python code
...

TLS (Transport Layer Security) -
Examples in Python
...
Connect to HTTPS server and download resource.
Display the server certificate + the public key.
Display info about the TLS cipher suite.
...

One-Time Passwords (OTP) -
Examples in Python
In this section, we shall provide an example of how to generate and
validate One-Time Passwords (OTP) in Python. The Python library of
our choice is PyOTP, which implement the RFC 4226 and RFC 6238
standards. If you want to use this library you should follow the
requirements in those standards. Installation:
normalpip install pyotp
normal
Server-Side Setup
We need to create a base32 secret which has to be shared between
the authentication server and the client. We will use Google
Authenticator OpenSource OTP model which produce a URI for an
exchange, the secret and additional client-server details. It includes
the shared secret, the client's username, and the issuer's name.
normalimport pyotp
base32secret = pyotp.random_base32()
print('Secret:', base32secret)
totp_uri = pyotp.totp.TOTP(base32secret).provisioning_uri(
 "alice@google.com",
 issuer_name="Secure App")
print(totp_uri)
normal
Run the above code example: https://repl.it/@nakov/OTP-Server-Sidein-Python.

Sample output:
normalSecret: S3K3TPI5MYA2M67V
otpauth://totp/Secure%20App:alice%40google.com?
secret=S3K3TPI5MYA2M67V&issuer=Secure%20App
normal
Client-Side Setup
Once the client stores the secret in a secure way, in a time-interval of
a 30 seconds (by default) a new code will be generated.
normalimport pyotp
import time
base32secret = 'S3K3TPI5MYA2M67V'
print('Secret:', base32secret)
totp = pyotp.TOTP(base32secret)
print('OTP code:', totp.now())
time.sleep(30)
print('OTP code:', totp.now())
normal
Run the above code example: https://repl.it/@nakov/OTP-Client-Sidein-Python.
Sample output:
normalSecret: S3K3TPI5MYA2M67V
OTP code: 339838
OTP code: 284911
normal
Working Example
You can install Google Authenticator from Google Play or App Store
and scan the QR code below:

Example validation check:
normalimport pyotp
base32secret = 'S3K3TPI5MYA2M67V'
print('Secret:', base32secret)
totp = pyotp.TOTP(base32secret)
your_code = '123456'
print(totp.verify('Code Valid:', your_code))
normal
Run the above code example: https://repl.it/@nakov/QR-codescanner-in-Python.
Output:
normalSecret: S3K3TPI5MYA2M67V
Code Valid: True
normal

Cryptographic Libraries for
JavaScript, Python, C# and Java
• Cryptography in JavaScript
○ ECDSA, elliptic.js, js-sha3.js
• Cryptography libraries in Python
○ ECDSA, eth_keys
• C# and .NET cryptography
○ Bouncy Castle .NET, Nethereum
• Java cryptography
○ JCA, Bouncy Castle, Web3j
• C and C++ cryptography
○ Crypto++, OpenSSL bindings, Nettle, libgcrypt
TODO:
• OpenSSL - https://en.wikipedia.org/wiki/OpenSSL
• LibSodium
• Crypto++
• Lingcrypt - https://en.wikipedia.org/wiki/Libgcrypt
• Bouncy Castle
• Nettle - https://git.lysator.liu.se/nettle/nettle
• Botan - https://botan.randombit.net
• Others...
Summary
• JavaScript and Python provide simple cryptography libraries
○ Hashes, ECC, ECDSA, AES, and many more
• Cryptography is C# is heavy

○ Use Bouncy Castle .NET for general crypto
○ Or Nethereum for simplified secp256k1
• Cryptography in Java is heavy
○ JCA and Bouncy Castle are hard to use
○ Web3j is simplifies library for secp256k1
...

JavaScript Crypto Libraries
...
Cryptography in JavaScript
• ECDSA with elliptic.js and js-sha3
ECDSA in JavaScript: Generate / Load
Keys
normalnpm install elliptic
npm install js-sha3
normal
...
normallet elliptic = require('elliptic');
let sha3 = require('js-sha3');
let ec = new elliptic.ec('secp256k1');
// let keyPair = ec.genKeyPair(); // Generate random keys
let keyPair = ec.keyFromPrivate(
"97ddae0f3a25b92268175400149d65d6887b9cefaf28ea2c078e05cdc15a3c0a");
let privKey = keyPair.getPrivate("hex");
let pubKey = keyPair.getPublic();
console.log(`Private key: ${privKey}`);
console.log("Public key :", pubKey.encode("hex").substr(2));
console.log("Public key (compressed):",
 pubKey.encodeCompressed("hex"));
normal
Run the above code example: https://repl.it/@nakov/ECDSA-in-JS.
ECDSA in JavaScript: Sign Message

---

## Sección 57: Core Concepts & Foundations [Entropy: 0.74]

normallet msg = 'Message for signing';
let msgHash = sha3.keccak256(msg);
let signature = 
 ec.sign(msgHash, privKey, "hex", {canonical: true});
console.log(`Msg: ${msg}`);
console.log(`Msg hash: ${msgHash}`);
console.log("Signature:", signature);
normal
Run the above code example: https://repl.it/@nakov/ECDSA-signverify-in-JS.
Complete example: https://gist.github.com/
nakov/1dcbe26988e18f7a4d013b65d8803ffc.
ECDSA in JavaScript: Verify Signature
normallet hexToDecimal = (x) => ec.keyFromPrivate(x, "hex")
 .getPrivate().toString(10);
let pubKeyRecovered = ec.recoverPubKey(
 hexToDecimal(msgHash), signature,
 signature.recoveryParam, "hex");
console.log("Recovered pubKey:",
 pubKeyRecovered.encodeCompressed("hex"));
let validSig = ec.verify(
 msgHash, signature, pubKeyRecovered);
console.log("Signature valid?", validSig);
normal
Run the above code example: https://repl.it/@nakov/ECDSA-signverify-in-JS.
Complete example: https://gist.github.com/
nakov/1dcbe26988e18f7a4d013b65d8803ffc

Python Crypto Libraries
...
Cryptography in Python
• Hashes, ECC and ECDSA, eth_keys Library
ECDSA in Python: Generate / Load
Keys
normalimport eth_keys, eth_utils, binascii, os
# privKey = eth_keys.keys.PrivateKey(os.urandom(32))
privKey = eth_keys.keys.PrivateKey(binascii.unhexlify(
 
'97ddae0f3a25b92268175400149d65d6887b9cefaf28ea2c078e05cdc15a3c0a'))
pubKey = privKey.public_key
pubKeyCompressed = '0' + str(2 + int(pubKey) % 2) + str(pubKey)
[2:66]
address = pubKey.to_checksum_address()
print('Private key (64 hex digits):', privKey)
print('Public key (plain, 128 hex digits):', pubKey)
print('Public key (compressed):', pubKeyCompressed)
print('Signer address:', address)
normal
ECDSA in Python: Sign Message
normalmsg = b'Message for signing'
msgHash = eth_utils.keccak(msg)
signature = privKey.sign_msg(msg)
print('Msg:', msg)
print('Msg hash:', binascii.hexlify(msgHash))
print('Signature: [v = {0}, r = {1}, s = {2}]'.format(

 hex(signature.v), hex(signature.r), hex(signature.s)))
print('Signature (130 hex digits):', signature)
normal
ECDSA in Python: Verify Signature
normalmsg = b'Message for signing'
msgSigner = '0xa44f70834a711F0DF388ab016465f2eEb255dEd0'
signature = eth_keys.keys.Signature(binascii.unhexlify(
 
'6f0156091cbe912f2d5d1215cc3cd81c0963c8839b93af60e0921b61a19c54300c71006dd
signerPubKey = signature.recover_public_key_from_msg(msg)
print('Signer public key (recovered):', signerPubKey)
signerAddress = signerPubKey.to_checksum_address()
print('Signer address:', signerAddress)
print('Signature valid?:', signerAddress == msgSigner)
normal

C# Crypto Libraries
...
Cryptography in C# and .NET
• Bouncy Castle .NET and Nethereum:Hashes, ECC and ECDSA
.NET Cryptography and Bouncy
Castle .NET
• Cryptography in C# and .NET is based on:
○ The build-in libraries: System.Security.Cryptography
○ The Bouncy Castle .NET– a powerful C# cryptography
library
■ http://www.bouncycastle.org/csharp
• Nethereum – a simplified library for Ethereum and secp256k1
○ Nethereum – https://github.com/Nethereum
○ The cryptographic functionality is in Nethereum.Signer
○ Nethereum also includes the Bouncy Castle .NET library
ECDSA in C#: Initialize the
Application
Install the "Nethereum.Signer" package from NuGet
normaldotnet add package Nethereum.Signer
normal

Import the Nethereum Signer namespaces:
normalusing Nethereum.Signer;
using Nethereum.Signer.Crypto;
using Nethereum.Util;
using Nethereum.Hex.HexConvertors.Extensions;
normal
The Bouncy Castle namespaces will also be available, e.g.
normalOrg.BouncyCastle.Math.EC.ECPoint p = …;
normal
ECDSA in C#: Generate / Load Keys
normal// var privKey = EthECKey.GenerateKey(); // Random private
key
var privKey = new EthECKey(
"97ddae0f3a25b92268175400149d65d6887b9cefaf28ea2c078e05cdc15a3c0a");
byte[] pubKeyCompressed = new ECKey(
 privKey.GetPrivateKeyAsBytes(), true).GetPubKey(true);
Console.WriteLine("Private key: {0}",
 privKey.GetPrivateKey().Substring(4));
Console.WriteLine("Public key: {0}",
 privKey.GetPubKey().ToHex().Substring(2));
Console.WriteLine("Public key (compressed): {0}",
 pubKeyCompressed.ToHex());
normal
Complete example:https://gist.github.com/nakov/
f2a579eb9893b29338b11e063d6f80c2
ECDSA in C#: Sign Message
normalstring msg = "Message for signing";
byte[] msgBytes = Encoding.UTF8.GetBytes(msg);
byte[] msgHash = new Sha3Keccack().CalculateHash(msgBytes);
var signature = privKey.SignAndCalculateV(msgHash);
Console.WriteLine("Msg: {0}", msg);
Console.WriteLine("Msg hash: {0}", msgHash.ToHex());
Console.WriteLine("Signature: [v = {0}, r = {1}, s = {2}]",
 signature.V[0] - 27,

 signature.R.ToHex(),
 signature.S.ToHex());
normal
Complete example:https://gist.github.com/nakov/
f2a579eb9893b29338b11e063d6f80c2
ECDSA in C#: Verify Message
normalvar pubKeyRecovered =
 EthECKey.RecoverFromSignature(signature, msgHash);
Console.WriteLine("Recovered pubKey: {0}",
 pubKeyRecovered.GetPubKey().ToHex().Substring(2));
bool validSig = pubKeyRecovered.Verify(msgHash, signature);
Console.WriteLine("Signature valid? {0}", validSig);
normal
Complete example:https://gist.github.com/nakov/
f2a579eb9893b29338b11e063d6f80c2

Java Crypto Libraries
...
Cryptography in Java
• JCA, Bouncy Castle and Web3j:Hashes, ECC and ECDSA
JCA, Bouncy Castle and Web3j
• Cryptography in Java is based on the Java Cryptography
Architecture (JCA)
○ Typical Java style: lot of boilerplate code
• Bouncy Castle is the leading Java cryptography library
○ Docs: https://www.bouncycastle.org/documentation.html
• Web3j – a simplified library for Ethereum and secp256k1
○ Web3j – https://github.com/web3j
○ The cryptographic functionality is in web3j/crypto
ECDSA in Java: Install the Crypto
Libraries
• This Maven dependency will install the following libraries:
○ org.web3j.crypto– Ethereum style secp256k1 EC
cryptography
○ org.bouncycastle– BouncyCastle crypto provider for
Java

normal<dependency>
 <groupId>org.web3j</groupId>
 <artifactId>crypto</artifactId>
 <version>3.3.1</version>
</dependency>
normal
ECDSA in Java: Initialize the
Application
normalimport org.bouncycastle.util.encoders.Hex;
import org.web3j.crypto.*;
import java.math.BigInteger;
normal
ECDSA in Java: Generate / Load
Keys
normal// Generate random private key
// BigInteger privKey = Keys.createEcKeyPair().getPrivateKey(); 
BigInteger privKey = new BigInteger(
"97ddae0f3a25b92268175400149d65d6887b9cefaf28ea2c078e05cdc15a3c0a",
16);
BigInteger pubKey = Sign.publicKeyFromPrivate(privKey);
ECKeyPair keyPair = new ECKeyPair(privKey, pubKey);
System.out.println("Private key: " + privKey.toString(16));
System.out.println("Public key: " + pubKey.toString(16));
System.out.println("Public key (compressed): " +
 compressPubKey(pubKey));
normal
ECDSA in Java: Sign Message
normalString msg = "Message for signing";
byte[] msgHash = Hash.sha3(msg.getBytes());
Sign.SignatureData signature =
 Sign.signMessage(msgHash, keyPair, false);

---

## Sección 58: Core Concepts & Foundations [Entropy: 0.34]

System.out.println("Msg: " + msg);
System.out.println("Msg hash: " + Hex.toHexString(msgHash));
System.out.printf(
 "Signature: [v = %d, r = %s, s = %s]\n",
 signature.getV() - 27,
 Hex.toHexString(signature.getR()),
 Hex.toHexString(signature.getS()));
normal
ECDSA in Java: Verify Signature
normalBigInteger pubKeyRecovered =
 Sign.signedMessageToKey(msg.getBytes(), signature);
System.out.println("Recovered public key: " +
 pubKeyRecovered.toString(16));
boolean validSig = pubKey.equals(pubKeyRecovered);
System.out.println("Signature valid? " + validSig);
normal

Conclusion
...

---
**Conexiones del Grafo (Obsidian):** [[INDEX]] · [[CANON_CYBERSECURITY_DEVSECOPS_2026]] · [[CYBERSECURITY_MASTER_PROTOCOL]] · [[ANTI_BOT_STEALTH_GUIDE]] · [[CANON_IDENTITY_AND_OAUTH_CYBERSECURITY_AUDIT_2026]] · #cybersecurity
