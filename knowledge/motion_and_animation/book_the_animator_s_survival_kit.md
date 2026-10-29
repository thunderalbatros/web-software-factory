---
title: "The Animator's Survival Kit"
author: "Richard Williams"
domain: "60FPS Motion Choreography, Timing, Spacing, Anticipation & Physics Curves"
epistemicTier: "TIER_2_TIMELESS_PRINCIPLES"
---

# 📚 Libro Completo: The Animator's Survival Kit

**Alcance:** Fuente bibliográfica completa (`TIER_2_TIMELESS_PRINCIPLES`) sobre 60FPS Motion Choreography, Timing, Spacing, Anticipation & Physics Curves (The Animator's Survival Kit — Richard Williams). Aplicable a la Web Software Factory. NO sustituye las reglas inmutables en `CANON_*`.

> **Autor:** Richard Williams  
> **Dominio:** 60FPS Motion Choreography, Timing, Spacing, Anticipation & Physics Curves (`TIER_2_TIMELESS_PRINCIPLES`)  
> **Archivo Fuente:** `the-animators-survival-kit-richard-williams.pdf`  
> **Páginas Originales:** 347 (100% Ingerido, Cero Truncamiento)  
> **Secciones Técnicas Extraídas:** 49 (Entropía Técnica Media: 0.29)  
> **Fecha de Ingesta:** 2026-10-28  

## 🎨 Axiomas Visuales Traducidos a Código 2026 (`Axiom -> Formula -> CSS/WebGPU Token`)

| Axioma Estético / Pictórico | Fórmula Matemática / Óptica | Token CSS / WebGPU SOTA 2026 |
| :--- | :--- | :--- |
| **Ley de Área de Itten (OKLCH)** | $\text{Área} > 60\% \implies C \le 0.02$; $\text{CTA} < 3\% \implies C \in [0.14, 0.22]$ | `--surface: oklch(11% 0.012 255); --cta: oklch(65% 0.18 250);` |
| **Rotación Térmica (Gurney/Albers)** | $C_{\text{dark}} > 0$, $H \in [240^\circ, 265^\circ]$ + Luz Cenital Especular | `border-top: 1px solid oklch(100% 0 0 / 0.10);` |
| **Contraste Perceptual APCA** | $L_c \ge 90$ (`Operate`), $L_c \ge 75$ (`Read`), $L_c \ge 60$ (`Persuade`) | `font-variant-numeric: tabular-nums slashed-zero;` |
| **Física PBR & Resortes WWDC** | $r = r_{\text{perceptual}}^2$, $\zeta = 1.0$ (Operate) vs $\zeta = 0.78$ (Persuade) | `cubic-bezier(0.22, 1, 0.36, 1)` / `THREE.AgXToneMapping` |

---

## Sección 1: Core Concepts & Foundations [Entropy: 0.25]

KIT DE SUPERVIVENCIA
DEL ANIMADOR 
MANUAL DE MÉTODOS, PRINCIPIOS Y FÓRMULAS 
PARA ANIMADORES CLÁSICOS, COMPUTADORA, JUEGOS, STOP MOTION O INTERNET
DIRECTOR DE ANIMACIÓN “¿QUIÉN ENGAÑÓ A ROGER RABBIT?”
The Animator´s 
Survival Kit 
a

Quiero que este libro sea el medio para compartir los que desde mi punto de vista son los mejores 
métodos de trabajo, para que la tarea de animar se convierta en algo mejor y más fácil de hacer. 
Existen aquí muchas fórmulas, principios, clichés y mecanismos de ayuda pero la cuestión 
principal que quiero compartir es una manera de pensar en la animación, a fin de liberar la mente 
y hacer el mejor trabajo posible. 
He aprendido de los mejores en el negocio y he tratado de condensarlo todo en un método de 
trabajo sistemático y ordenado. Transformó mi manera de trabajar. Espero que les sea útil.
b

CONTENIDO 
 1. ¿POR QUÉ ESTE LIBRO? 
11. DIBUJANDO EN EL TIEMPO 
23. HORA DE DIBUJAR 
35. TODO ESTÁ EN EL TIEMPO Y EN EL ESPACIO 
41. LECCIÓN 1 
46. AVANZANDO HACIA ATRÁS HASTA 1940 
47. Historia de la Escala y el Intermedio 
48. Extremos y Quiebros 
49. Arcos de Acción 
57. Claves 
61. Tres Formas de Animar 
68. Probando, Probando, Probando 
70. La Hoja de Tiempos 
75. Llega la Claridad...
76. El Mejor Sistema de Numeración 
78. La Gran Batalla de Unos y Doses 
80. La Batalla de los Registros superiores e inferiores 
c

84. MÁS SOBRE ESPACIADO
 88. Errores Clásicos de Interpolación 
 90. Vigila tus Arcos 
 92. Consiguiendo más Movimiento en la Masa 
 96. Los Intermedios alargados 
 99. El Error Más frecuentes en los Principiantes 
 99. El Estilo Abocetado 
101. ¿Cuánto hay que dejarle al Asistente? 
101. Toma el Atajo Largo 
102. CAMINATAS 
106. Obteniendo el Peso 
109. Fijar el Tempo 
111. Posición de Paso o Quiebro 
115. Dos Formas de Planificar una Caminata 
118. El Doble Rebote 
120. Añadiendo Soltura 
128. Profundizando Más en las Caminatas 
135. No hay nada como Probar 
136. El Talón 
136. Acción del Pie 
142. Espaciado normal de la Caminata 
146. Cambio del Peso 
147. La Línea del cinturón 
148. Movimiento de Brazos 
156. Reacción Contraria 
163. La Receta 
167. A Hurtadillas 
173. A Hurtadillas de Puntillas 
176. CARRERAS, BRINCOS Y SALTOS
189. La Fórmula para Correr en 4 dibujos 
192. Correr en 3 Dibujos 
195. Correr en 2 Dibujos 
200. La Fórmula 
201. Correr, Saltar, Brincar, Lanzarse de un Salto 
209. Brincos 
212. Saltos 
213. El Peso en un Salto 
d

217. FLEXIBILIDAD 
218. El Quiebro 
223. Solapamiento Simple
226. Acciones Solapadas
230. Acción Contraria Simple
231. Quebrando Articulaciones para Conseguir Flexibilidad
246. Flexibilidad en el Rostro
249. Solapamiento en el Rostro
251. Lectura Intantánea. Perfiles para la Legibilidad
256. PESO 
262. Presión y Peso 
264. ¿Cuánto Esfuerzo debemos usar? 
269. Bailando 
272. Principios Básicos para Acciones Sincronizadas
273. ANTICIPACIÓN 
282. Anticipaciones de Sorpresa 
283. Anticipaciones Invisibles 
285. TOMAS Y ACENTOS 
295. Un Acento Duro Rebota 
295. Un Acento Suave Continúa 
297. CRONOMETRAJE, TAMBALEOS, ONDA y AZOTE
297. Cronometraje del Tambaleo
299. Fórmula de la Vibración de lado a lado
301. Acción de Azote
301. Acción de Onda
304. DIÁLOGO 
305. Fraseando 
310. Imagen y Sincronización del sonido 
311. Acentos 
314. Actitud 
314. El Secreto 
315. ACTUACIÓN 
320. Cambios de Expresión 
321. Buscando Contrastes 
323. Un punto de Actuación 
324. Lenguaje Corporal 
324. Simetría o Gemelos 
325. ¡Róbalo! 
325. Ojos 
e

327. ACCIÓN ANIMAL
328. Referencia de la Acción en Vivo
330. Patrón de Caminata Animal Básica
333. DIRECCIÓN
334. El Resumen 
334. La Tira Leica (Animática) 
334. Separar los Personajes 
335. El Mejor Pie Delante 
335. Seleccionando Animadores 
335. Haciendo Cambios 
335. “Habla! Habla!”
335. Grabación de Voz
335. Registros de Continuidad
335. Investigación
335. Edición
335. Cree en tu Material
338. LA REVISIÓN
338. El Procedimiento
339. Los Ingredientes
342. Agradecimientos
f

¿Por qué este libro? 
Cuando tenía diez años, conseguí un libro en edición de bolsillo llamado "Cómo hacer Dibujos 
Animados" por Nat Falk, publicado en 1940. Ya hace tiempo que está agotado, pero lo usé como 
una muy útil referencia para la animación estilo Hollywood de los 40 cuando diseñé los personajes 
y dirigí los segmentos de la animación en "¿Quién Engañó a Roger Rabbit?" (Who Framed Roger 
Rabbit?).
Sin embargo, lo más importante para mi fue que el libro era claro y directo; la información básica 
de cómo las películas animadas se hacen, registrada en mi pequeño cerebro de diez años, y luego 
cuando tomé en serio este medio, ésta información básica aún estaba latente por allí. 
Vivía y pintaba en España, cuando empezaron a rondar en mi mente las increíbles posibilidades 
de lo que la animación podía hacer. Planifiqué mi primera película, tomé el dinero que había 
ganado pintando retratos y me fui a Londres. Pase hambre por un tiempo, hasta que finalmente 
conseguí trabajo animando comerciales para televisión y me las arreglé para auto financiarme The
Little Island (La Pequeña Isla) un argumento filosófico de media hora sin palabras, el cual ganó 
varios premios internacionales. 
 La Pequeña Isla, 1958. 
Tres años más tarde, cuando terminé la película, lentamente me di cuenta de lo poco que sabía 
acerca de cómo se articula la animación, es decir, de cómo mover las cosas. Para entrenarme, 
copié la animación que Ken Harris había hecho de una bruja en uno de los Cartoons de Bugs 
Bunny (Broomstick Bunny, 1955, dirigida por Chuck Jones). Hacer esto sólo confirmó que poco 
entendía acerca del movimiento. 
Mientras hacía The Little Island vi un reestreno de Bambi, pero ya que me consideraba a mi 
mismo un revolucionario en el campo de la animación, rechacé la película como convencional. 
Pero cuando finalicé mi película, volví a ver Bambi y casi salgo arrastrándome por el suelo de 
rodillas. "¿Cómo lo hicieron?" ¡Había aprendido lo suficiente para darme cuenta de que en 
realidad, no tenía ni idea! 
 El maestro de animación Ken Harris y el aspirante, 1969. 
Entonces, ¿cómo y dónde adquirir el conocimiento experto? Yo trabajaba en Inglaterra como 
independiente y no quería involucrarme en la máquina de hacer Cartoons de Hollywood. Lo quería 
todo en ambos sentidos. Quería mi libertad artística, pero también quería el conocimiento. 
El libro de Preston Blair "How to Animate Cartoons Film" (Como Hacer Dibujos Animados) estaba 
disponible, pero debido a que me había apartado del estilo "Squashy-Stretchy" (Estirar-Aplastar) 
de los Cartoons de los 40, me fue muy difícil entender los principios que estaba buscando pese a 
ser Preston Blair un gran animador de la era dorada. Es irónico pensar que cuarenta años después 
sería mejor conocido por mi trabajo en ¿Quién engañó a Roger Rabbit? Animado precisamente en 
el mismo estilo que tanta dificultad me dió aprender de Preston. 
Mucho después, pude trabajar con Ken Harris, el primer maestro animador "real" que conocí y 
cuya bruja en "Broomstick Bunny" había analizado. Es sabido que Ken Harris era EL animador 
maestro en Warner Bros. Ciertamente, era el hombre clave del director Chuck Jones. 
En 1967 pude traer a Ken a Inglaterra y mi verdadera educación en expresión y actuación en 
animación comenzó al trabajar con él. Tenía casi cuarenta años con un gran y exitoso estudio en 
Londres. Había estado animando dieciocho años ganando más de cien premios internacionales. 
Después de trabajar con Ken por espacio de siete u ocho años, me dijo: "Oye, Dick, estás 
empezando a dibujar las cosas en el lugar correcto".

---

## Sección 2: Core Concepts & Foundations [Entropy: 0.25]

"Sí, estoy empezando a aprender de ti ¿no es así?", le dije.
 Sí, dijo él pensativamente, "sabes... podrías ser un animador".
Después del shock inicial, me di cuenta de que él tenía razón. Ken Harris era un auténtico 
animador, mientras yo hacia cantidades de dibujitos bonitos en variados estilos, que eran 
funcionales pero no tenían los invisibles ingredientes "mágicos" para hacerlos parecer realmente 
vivos y con actuaciones convincentes. 
Entonces redoblé mis esfuerzos (sobre todo en dominar los "acentos" en cabeza y manos) y al 
año siguiente Ken dijo: "Está bien, eres un animador".
 Un par de años después de aquello, un día me dijo: "Hey Dick, podrías ser un buen animador".
Cuando él tenía 82 años, fui a su Rulot en Ohai, California, y juntos hicimos el Layout de las 
escenas que él luego animaría. A menudo hacia siestas de media hora mientras yo seguía 
trabajando. 
Un día la siesta fue de tres horas y, para cuando despertó, yo casi había animado toda la 
escena. "Lo siento Dick", me dijo, "ya sabes... estoy demasiado viejo". (Una larga pausa) "Ah... 
veo que animaste la escena...".
Sí, le contesté, "No sabía qué más hacer".
"Bonitos dibujos," dijo y luego señaló. "Hey... ¡esto está mal! Has cometido un error".
Desde luego, él estaba en lo correcto. 
"Maldita sea, Ken", contesté, "He trabajado contigo durante trece años y aun no he podido 
dar con "la manera" que tú quieres. Me temo que morirá contigo".
Sí... soltó una risita y me dijo, "Bien, no te preocupes, tú tienes "eso" muy bien 
establecido, a tu manera". Luego, volvió a reirse. 
Ken trabajaba muy rápido y yo siempre lo exprimía al máximo para sacarle más y más planos, e 
incluso hacía que animara aún cuando el taxi estuviera en la puerta esperándolo para llevarlo a 
tomar el avión de regreso a su hogar, en Norteamérica. 
Cuando Ken murió en 1982 a los 83 años, sentí verdadero arrepentimiento al no haber 
sido capaz de poner un lápiz Blackwing en sus manos cuando su ataúd aún estaba abierto. Le 
hubiese encantado. 
Justo cuando empecé a trabajar con Ken, habíamos completado las secuencias de animación para 
el filme épico de Tony Richardson "La Carga de la Brigada Ligera" (The Charge of the Light 
Brigade) y para entonces yo pensaba que era bastante bueno. Cuando Ken vió la película en el 
teatro me dijo: "Por Dios Dick, ¿Cómo pudieron hacer todo ese trabajo?" (Pausa) "Claro que no se 
mueven muy bien...".
Pero aun ahora, no me siento avergonzado de nuestro trabajo en esa película. 
Después de aquello, fuimos a ver el largometraje animado "El Submarino Amarillo" (The Yellow 
Submarine) de The Beatles. Aunque me gustó el estilo de diseño de Heinz Edelman, "los 
movimientos abruptos y marcados de los Start-Stop" (los pare-siga y siga-pare) en la mayor 
parte de la animación, hacía que después de media hora la mayoría de la audiencia prefiriera 
salirse al corredor. Sin importar cuan estilizada, inventiva, convulsiva o espasmódica sea la 
animación, parece ser que sólo será capaz de mantener a la audiencia atenta por espacio de tan 
sólo veinticinco minutos. Mientras que "El Submarino Amarillo" tenía un culto de seguidores 
entusiastas desde las agencias de publicidad hasta las masas universitarias, el público en general 
evitaba la película. Esto aniquiló el mercado de los largometrajes No-Disney por años. 
Mis secuencias animadas de la película épica de Tony Richardson, 
La Carga de la Brigada Ligera, 1968. 
Un alto ejecutivo de la United Artists que distribuía "El Submarino Amarillo," me dijo: "Esto es The 
Beatles en su momento de mayor popularidad, pero aún así la gente se mantiene alejada de la 
animación que no sea Disney". En aquellos tiempos los ejecutivos de películas siempre decían de 
la animación, "si no tienen el nombre de Disney en ellas, nadie irá a verlas". Pero la realidad es 
que no sólo era el nombre de Disney... era la calidad de Disney lo que cautivaba a la audiencia y 
los hacía quedarse en sus asientos por ochenta minutos. 
Casi la misma semana en que Disney presentó su película "El Libro de la Selva" (The Jungle 
Book), fue un éxito inmediato. Tenía mis dudas cuando fui a verla, pensando (ya que aún me 
consideraba un innovador) que aunque pudiera encontrar algo interesante, sería probablemente 
más de lo mismo. 
Así es como empezó, con lobos convencionales adoptando al lindo bebé con el "sello de 
aprobación de buen hogar". Me acuerdo del muchacho Mowgli montado sobre el lomo de una 
pantera negra moviéndose y actuando con "clichés", hasta que se bajó. De repente, todo cambió. 
El dibujo cambió. Las proporciones cambiaron. La acción y las actuaciones cambiaron. La pantera 
ayudó al muchacho a montarse en un árbol y todo se elevó a un grado supremo de 
entretenimiento. La acción, el dibujo, la actuación e incluso los colores, eran exquisitos. Entonces 
apareció la serpiente intentando hipnotizar al muchacho y la audiencia entró en trance. Quedé 
pasmado.
La película continuó a ese nivel, y cuando entró el tigre pesando casi ochocientas libras y no sólo 
era un tigre, sino el actor que hizo su voz (George Sanders), me di cuenta que ni siquiera sabía 
cómo había sido hecha, ni si alguna vez sería capaz de hacer yo mismo algo así. Me fui para mi 
estudio, en estado de shock, y durante toda la noche escribí una larga y agitada carta. 
En aquellas escenas creí haber reconocido la mano del gran genio de Disney Milt Kahl, del cual 
Ken Harris hablaba con delirio. El primer nombre en los créditos de Director de Animación era Milt 
Kahl, así que asumí que el trabajo que me asombrara era suyo. Y resultó que así era, excepto por 
un plano realizado por Ollie Johnston. Johnston y Frank Thomas habían hecho otros trabajos 
maravillosos en la película. 
Entonces le escribí a Milt, diciéndole que pensaba que "El Libro de la Selva" era la cumbre de la 
expresividad en animación y pensaba que sería imposible para cualquiera que no fuera de Disney 
alcanzar ese nivel. 
Resultó que para Milt la carta era la mejor que habían recibido y, aún mejor, que conocía algo de 
mi trabajo y quería conocerme. 
Una ambición irreprimible me hizo cambiar de opinión acerca de que sólo ellos podían lograr tales 
alturas; imaginé y pensé creo que correctamente, que teniendo el talento, la experiencia y la 
persistencia, además de la sabiduría de los expertos. ¿Por que no a de ser todo posible?
Ya no podía soportarlo. Tenía que saber y dominar todos sus aspectos. Con mucha humildad, hice 
visitas anuales a Milt Kahl, Frank Thomas, Ollie Jonhston y Ken Anderson, en Disney. 
Una de las cosas más importantes que Milt dijo fué: "Nuestra animación difiere de la de cualquier 
otro porque es creíble. Las cosas tienen peso, los personajes tienen músculos y les damos la 
ilusión de realidad".
Una "central" de sabiduría animada en animación. 
De izquierda a derecha, Ken Harris, Grim Natwick y Art Babbit, con los estudiantes Richard 
Purdum y yo, en las afueras de mi estudio en el Soho, Londres, 1973. 
Pero, ¿cómo hacerlo creíble? Yo no estaba allí para beber del grifo de Milt, ni para saber qué 
desayunaba Frank Thomas. Yo les disparaba mi cuidadosa lista de preguntas y más tarde escribía 
todo lo que me decían. Estos virtuosos maravillosos se convirtieron en mis amigos y fueron 
increíblemente generosos con su ayuda. Como Milt decía: "si haces preguntas encontrarás lo que 
quieres saber, si eres lo bastante afortunado de preguntárselo a quien lo sepa".
También tuve la fortuna de alistar al legendario y maravilloso Art Babbit, como colaborador y 
profesor. Babbit había creado a Goofy y había animado el baile de los hongos en "Fantasía". Él 
vació su Kit de conocimientos impartiendo varios seminarios mensuales, además de trabajar 
conmigo, en mis estudios de Londres y Hollywood por varios años.

---

## Sección 3: Core Concepts & Foundations [Entropy: 0.25]

En 1973 contraté al aún brillante Grim Natwick, de 83 años, como tutor "en vivo" para mi estudio 
de Londres. Grim se hizo un nombre diseñando a Betty Boop y animando la mayor parte de las 
escenas de Blanca Nieves en "Blanca Nieves y los Siete Enanitos". También trabajé muy de cerca 
con Emery Hawkins, a quien Ken harris veía como al más imaginativo de los animadores. Emery 
era extremadamente creativo y rotaba de estudio en estudio. También tuve la oportunidad de 
trabajar por un corto período de tiempo con Abe Levitow, Gerry Chiniquy y Cliff Nordberg. Dick 
Huemer, uno de los primeros animadores pioneros de Nueva York y luego director clave de 
historias en Disney (Blanca Nieves y los Siete Enanitos, Dumbo, Fantasía y todos los primeros 
largometrajes de Disney) también me dió una imagen muy clara de los primeros días de la 
animación. 
La mayoría de ellos ya se han ido, pero este libro está repleto de su arte y sus conocimientos. 
Hice este garabato de Milt mientras nos
daba una charla en mi estudio. 
Milt está diciendo:"No escuchen a Dick,
es demasiado técnico". 
Milt siempre estaba animándome a que
hiciera mi trabajo más personal y no tan
convencional, como a él le gustaba, pero
yo quería aprender primero. 
Dos genios a la vez sirven de tutores al
autor. Frank Thomas de pie y Milt Kahl
en la mesa, a principios de 1970. 
Caray, Mister Arturo, 
¿si lo hice bien me 
puedo ir a casa? 
"La Leyenda Arturiana" fue un formidable profesor quien comparaba las habilidades 
profesionales de un animador con aquellas de un concertista de piano. 
Art en Acción: Su primer seminario de un mes de duración en mi estudio de Londres 
fue como agua en el desierto para nosotros. 
En las clases maestras de tres días que he estado dando últimamente, algunos profesionales 
experimentados al principio sienten que estamos dándoles material con el que ya están muy 
familiarizados. Luego, a mitad del seminario se profundiza en los temas y en el último día, de 
repente, todo se enlaza y tiene sentido. Algunos, incluso, lo describen como un renacimiento. 
Bien, seguramente lo fue para mi cuando finalmente logré "la cosa". Así que, por favor, léanlo 
todo.
La animación es hacer muchas cosas simples, ¡una a la vez!; muchas cosas realmente simples y 
entrelazadas paso a paso, una por una en un orden sensato. 
El actor de cine Scott Wilson estuvo presente en mi clase maestra de tres días en San Francisco. 
Para mi sorpresa, al final se me acercó y dijo: "Como te habrás dado cuenta Dick, todo lo que 
dijiste ha sido acerca de la actuación". Yo dije, "¿Qué?" y Scott me contestó: "Éstos son 
exactamente el equivalente a los métodos, ejercicios y análisis que nosotros los actores hacemos 
en nuestros talleres de actuación".
Es decir que, actuar es intrínsecamente parte del todo. Y si no puedes dibujar o articular 
un movimiento, ¿cómo vas a hacer la actuación? 
Una vez alguien le preguntó a Milt Kahl: 
"¿Cómo planifica las reacciones que usó en ese personaje?". 
Milt explotó: "¡Ésa es la forma incorrecta de verlo! ¡No lo piense de esa manera! ¡Yo sólo me 
concentro en lograr una actuación, eso es lo que importa! ¡La representación es lo que cuenta, 
terminará en un enredo si piensa en ello de forma técnica!".
Desde luego, él tenía razón. Si un músico conoce sus escalas, se puede concentrar en su 
interpretación y hacer que salgan las ideas inherentes a la música. Pero si tiene que estar 
pensando constantemente en la mecánica de lo que está haciendo, difícilmente podrá tocar. 
Por lo tanto, si conocemos y entendemos todo lo básico, entonces tendremos las herramientas 
para crear. ¡Sólo entonces podremos hacer la interpretación! 
Este libro es un curso de anatomía en animación. Así como un curso de anatomía de dibujo vivo le 
muestra como las cosas se componen y cómo funcionan, este conocimiento lo libera para realizar 
su propia expresión. 
Requiere tiempo. No me encontré con Ken Harris hasta que yo tenía casi 40 años y él 69. Tuve 
que contratar a la mayoría de mis profesores para poder aprender de ellos. 
Contraté a Ken para de estar por debajo de él y ser su asistente, así que a la vez, era su 
director y su asistente. No sé si esto será original, pero finalmente comprendí que para "entender" 
tenía que situarme debajo de quien tuviera el conocimiento para poder atrapar lo que "goteaba" 
de su experiencia. 
He aquí el cuento de un viejo y decrépito maestro Zen luchador. Un joven y brillante luchador, le 
ruega a su viejo maestro que lo lleve consigo y le enseñe los noventa y nueve trucos que sabe. 
El anciano le dice... "mírame, estoy viejo y decrépito y no estoy interesado".
El joven sigue fastidiando al anciano, que le dice: "Mira hijo, ya soy frágil y para cuando te 
enseñe los noventa y nueve trucos, me retarás, (siempre lo hacen) y sinceramente, me harás 
picadillo".
La Carga de la Brigada Ligera, 1968. 
"Por favor, maestro, por favor", le implora el joven. "¡Prometo que nunca lo retaré! Oh... por 
favor, enséñeme los noventa y nueve trucos".
A regañadientes, el anciano le enseñó hasta que el joven aprendió los noventa y nueve trucos. El 
joven se convirtió en un luchador famoso, y un día llevó a su maestro a un cuarto, cerró la puerta 
y lo retó. 
El anciano dijo: "Sabía que harías esto, es por eso que al principio no quería enseñarte". 
"Vamos anciano, aquí sólo estamos tú y yo", dijo el joven; "Veamos de qué estás hecho".
Comenzaron, y de inmediato el anciano lanzó por la ventana al joven. El maltrecho muchacho, 
lamentándose desde la calle allá abajo decía: "¡Tú no me enseñaste ése!".
Ése fue el número cien, le contestó el anciano. 
Este libro son los noventa y nueve trucos... al truco número cien se le llama talento. 
Me convertí en el depositario de los conocimientos abandonados de la animación y le he dado mi 
propia interpretación a todo este material. Aquí, la meta es saber a la perfección la mecánica a fin 
de hacer nuevas cosas. Haga que la mecánica fluya por sus venas para hacerla que sea parte de 
ti, y no tendrás que pensar en ella y podrás concentrarte en hacer una buena actuación. 
Recuerdo una vez haberle dicho a Emery Hawkins (un maravilloso y poco mencionado animador),
"Me temo que tengo el cerebro en las manos".
Emery dijo: "¿Dónde más podría estar? Es el lenguaje del dibujo, no el lenguaje de la lengua".
Así que todo lo que sé de animación y que pueda decirse con palabras, garabatos y dibujos, está 
en este libro. 
Dibujando en el Tiempo 
¿Por qué animar? Todo el mundo sabe lo difícil que es hacer todos esos dibujos y posiciones. 
Entonces... ¿cuál es el gancho? ¿Por qué hacerlo? 
Respuesta: Nuestro trabajo se lleva a cabo en el tiempo. Hemos tomado nuestros dibujos 
estáticos (Stills) y los hemos hecho saltar a otra dimensión. 
Dibujos que andan: Ver una serie de imágenes a las que les hemos dado vida y que empiezan a 
caminar por ahí, ya de por sí es fascinante. 
Dibujos que caminan y hablan: Ver una serie de nuestros dibujos hablando es una experiencia 
sobrecogedora. 
Dibujos que caminan, hablan y piensan: Ver una serie de imágenes que hemos hecho y que 
realmente pasan por un proceso de pensamiento, y que de hecho parecen pensar, es un 
verdadero afrodisíaco. Además de crear algo que es único, que nunca ha sido hecho antes, es de 
una fascinación interminable. 
Siempre hemos tratado de hacer que las imágenes se muevan. La idea de la animación es mucho 
más antigua que las películas o la televisión. He aquí una rápida historia:

---

## Sección 4: Core Concepts & Foundations [Entropy: 0.25]

Durante más de 35.000 años pintamos animales en las paredes de cuevas, algunas veces 
dibujando cuatro pares de extremidades para mostrar el movimiento. 
En el año 1600 A.C., el faraón egipcio Ramses II le construyó un templo a la diosa Isis que tenía 
110 columnas. De manera ingeniosa, cada columna tenía pintada la figura de la diosa en 
posiciones progresivas. Para los jinetes o para quienes iban en las carrozas... ¡Isis parecía 
moverse! 
Los antiguos griegos algunas veces decoraban las vasijas con figuras en posiciones sucesivas de 
acción. Al darle vueltas a la vasija, se creaba la ilusión del movimiento. 
Hasta donde sabemos, el primer intento de proyectar dibujos en una pared, se hizo hacia 1640 
por Athonasius Kircher con su "Linterna Mágica". 
Kircher dibujaba cada figura por separado en pedazos de vidrio, los colocaba en su aparato y los 
proyectaba en la pared. Luego, movía los vidrios desde arriba con cuerdas. Una de éstas, 
mostraba la cabeza de un hombre durmiendo y un ratón. El hombre abría y cerraba la boca y, 
cuando la boca estaba abierta, el ratón corría hacia adentro. 
Aunque la fotografía se descubrió a principios de 1830, la mayoría de los mecanismos para crear 
la ilusión de movimiento utilizaban dibujos, y no fotos. 
En 1824, Peter Mark Roget descubrió (o redescubrió, ya que el concepto era conocido en los 
tiempos clásicos) el principio vital de la "Persistencia de la Visión". Este principio está basado en el 
hecho de que nuestros ojos retienen temporalmente la imagen de cualquier cosa que se haya 
acabado de ver. Si no fuera así, nunca podríamos tener la ilusión de conexión que se realiza en 
una serie de imágenes separadas y ni las películas ni la animación serían posibles. Mucha gente 
no se da cuenta que en realidad las películas no se mueven, y que se trata de una serie de 
imágenes estáticas que parecen moverse cuando son proyectadas en serie. 
El principio de Roget rápidamente le dio vida a varios artificios ópticos: 
El Taumátropo: Un disco de cartón con los extremos atados a un par de cuerdas. Una jaula 
dibujada en un lado y un pájaro en el otro. Cuando los extremos de las cuerdas son jalados, el 
disco gira, las imágenes se mezclan y el pájaro parece como si estuviera en la jaula. 
El Fenaquitoscopio: Dos discos montados sobre un vástago, el disco que está al frente tiene 
ranuras en el borde y el disco en la parte posterior tiene una secuencia de dibujos. Alinee las 
ranuras con los dibujos y mire a través de las aberturas, haga girar los discos y obtendrá la 
ilusión de movimiento. 
El Zootropo (o rueda de la vida): Apareció en Norteamérica en 1867 y se vendió como un juguete. 
Largas tiras de papel con una secuencia de dibujos en ellas, se insertaban dentro de un cilindro 
con ranuras. Se giraba el cilindro, se miraba a través de las ranuras y los dibujos parecían 
moverse. 
Espejos
El Praxinoscopio: Inventado por el francés Emile Reynaud en 1877. El fue el primero en crear 
secuencias cortas de acción dramática dibujando en una tira de 30 pies de longitud de una 
sustancia llamada "Cristaloide". Esto abrió el camino a los tremendos avances que vendrían. 
El Flipper book o Flip book: En 1868 apareció a nivel mundial un novedoso invento llamado el 
"Flipper Book" que hasta ahora se mantiene como el más simple y popular de estos inventos. Es 
simplemente una libreta con dibujos en secuencia. Se sostiene con una mano y con la otra se 
"abanican" o "flipean" las páginas, y los dibujos en ellas parecen moverse. El resultado es 
animación, la ilusión de acción continua. Dibujos en el tiempo. 
Es lo mismo que hacen los chicos en el colegio cuando dibujan en la esquinas de sus libros de 
matemáticas, y después "abanican" las páginas. 
Hoy en día, el animador clásico aún "flipea" o "abanica" sus dibujos de la misma manera que en 
un flipper book antes de probarlos en una cámara de cine o video. Pone sus dibujos en secuencia, 
con los números de menor a mayor en la parte inferior y "flipea" los dibujos desde la parte inferior 
hacia arriba, para ver la acción. 
El animador tiene que ser lo suficientemente bueno haciendo esto para aproximarse al tiempo real 
de pantalla, y para detectar errores y hacer alteraciones a los dibujos. Ahora que tenemos las 
cámaras de video con reproducción instantánea de los dibujos, no todo el mundo aprende a 
"flipear". 
En 1896 el caricaturista de prensa Neoyorquino James Stuart Blackton entrevistó al inventor 
Thomas Edison, quien estaba experimentando con imágenes en movimiento. Blackton hizo 
algunos bocetos de Edison, quien impresionado con la velocidad y habilidad de éste para dibujar, 
le pidió que le hiciera algunos dibujos en serie. Luego, Edison los fotografió; la primera 
combinación de dibujos y fotografía. En 1906 hicieron pública la película animada "Fases 
Humorísticas de Caras Divertidas" (Humorous Phases of Funny Faces). Un hombre fuma un 
cigarro y arroja anillos de humo a la cara de su novia, ella entorna los ojos, un perro salta el aro y 
un malabarista hace su presentación. Blackton utilizó cerca de trescientos "dibujos parpadeantes" 
para hacer la primera película animada, antecesora de los dibujos animados. Esta novedad trajo 
risas y entretenimiento, y fue un éxito instantáneo. 
Un año mas tarde, Emile Cohl hizo y mostró su primer filme animado en el Follies Bergéres de 
París. Las figuras parecían hechas por un niño, líneas blancas sobre fondo negro, pero la historia 
era relativamente sofisticada: El cuento de una chica, el amante celoso y un policía. Él incluso le 
dió inteligencia y movimiento a los postes de luz y las casas, con sus propias emociones y estados 
de ánimo. El trabajo de Cohl llegaría a configurar unos de los más conocidos preceptos de la 
animación:
"No hagas lo que una cámara puede hacer. ¡Haz lo que una cámara no puede hacer!".
Winsor McCay, el brillante creador de la popular tira cómica El Pequeño Nemo en el Reino de los 
Sueños (Little Nemo in Slumberland), fue el primero en tratar de desarrollar la animación como 
una forma de arte. Inspirado por su joven hijo, que llevó algunos Flip Books a casa, hizo más de 
cuatro mil dibujos para la película del "Pequeño Nemo". Fue un gran éxito cuando se presentó en 
el teatro Hammerstein de Nueva York, en 1911. 
Como otro experimento, dibujó una peliculita bastante extraña, "Cómo funciona un mosquito",
que también fue recibido de manera entusiasta. 
Luego, en 1914, McCay dibujó a Gertie el Dinosaurio (Gertie, el Dinosaurio) en la que él mismo 
actuaba delante de la proyección animada, sosteniendo una manzana frente a Gertie e invitándolo 
a comérsela. Gertie bajó su largo cuello y tragó la fruta, asombrando a la audiencia. Esta fue la 
primera animación de "personalidad", es decir, el comienzo de la individualidad en las caricaturas 
animadas. Era tan vivo, tan parecido a la realidad, que la gente se identificó con Gertie. Fue una 
sensación. 
En palabras de McCay: "Me metí de lleno en el negocio, y gasté miles de dólares desarrollando 
esta nueva forma de arte. Requirió un tiempo considerable, paciencia y una cuidadosa 
planificación, para cronomentrar y dibujar cada imagen. Este negocio de hacer películas animadas 
es el trabajo más fascinante que he hecho". 
McCay también hizo la primer animación seria y dramática, El Hundimiento del Lusitania, (The 
Sinking of the Lusitania), en 1918. Una película de propaganda de guerra, que expresaba la 
violencia de tal catástrofe. Fue un gran paso en el realismo y el drama, hasta esa fecha el 
animado más largo. Se necesitaron dos años de trabajo y más de 25.000 dibujos.

---

## Sección 5: Core Concepts & Foundations [Entropy: 0.25]

Ya más adelante, el anciano McCay, quien era respetado por los más jóvenes en el negocio, los 
fustigaba diciendo que la forma de arte que él había desarrollado y les había dado, la convirtieron 
en algo sin valor llevándolo a un crudo negocio de hacer dinero con artistas alquilados. 
Esto define bien la incómoda e interminable relación entre este artista pionero y la industria de la 
animación, trabajando con fórmulas cómodas y predecibles. 
Permanece tranquila la furia de la batalla… 
En los años 20 Félix el gato se volvió tan popular como Charlie Chaplin. Esos cortos animados de 
Félix eran inventivos visualmente, haciendo lo que la cámara no podía. Lo importante es que 
surgió una verdadera personalidad del incómodo silencio y de los dibujos en blanco y negro de 
Félix, conectándose con las audiencias de todo el mundo. 
Las caricaturas animadas de Félix llevaron al surgimiento de Walt Disney y, en 1928, Mickey 
Mouse hizo su aparición en Willie, el Barco a Vapor (Steamboat Willie), el primer dibujo animado 
con sonido sincronizado.
El brillante Ward Kimball, quien animó a Pepito Grillo (Jiminy Cricket) en Pinocho y a los cuervos 
en Dumbo, me dijo una vez: "Ni te imaginas el impacto que tuvo en la audiencia en esa época el 
que estos dibujos de repente hablaran e hicieran ruidos. La gente enloqueció con ellos".
Después de Steamboat Willie, Disney siguió con El Baile de los Esqueletos (Skeleton Dance). Por 
primera vez, la acción estuvo sincronizada con una banda sonora propia. Ésta fue la primera de 
las llamadas Sinfonías Tontas (Silly Simphony). Ub Iwerks fue el jefe de animación en ambas 
películas y mucha de la sofisticada acción del Baile de los Esqueletos, aún hoy se considera 
sobresaliente. 
Disney dio el salto de nuevo en 1932 con Árboles y Flores (Flowers and Trees)
La primera animación totalmente a color. 
Continuó un año después con los Tres Cerditos (Three Little Pigs). Tuvo un gran impacto debido a 
su completo desarrollo de la "personalidad" en la animación de personajes, personalidades 
claramente definidas y separadas actuando tan convincentemente, que la audiencia podía 
identificarse con ellas. Fue otra innovación. 
Sorprende que sólo cuatro años más tarde, Disney lanzó Blancanieves y los Siete Enanitos (Snow 
White and the Seven Dwarfs). El primer largometraje totalmente animado en el mundo, elevando 
los dibujos animados al nivel de arte, manteniendo a la audiencia hechizada por espacio de 83 
minutos. Una verdadera proeza, lograda en tan corto espacio de tiempo. (Se dice que muchos de 
los artistas hacían reservas en los hospitales con anticipación, para recuperarse del esfuerzo que 
fue completar la película). 
El tremendo éxito financiero y de crítica de Blancanieves y los Siete Enanitos se convirtió en la 
base de las producciones subsiguientes, y dió nacimiento a la que se conocería como la "Era 
Dorada" de la animación: Pinocho, Dumbo, Bambi y Fantasía, al igual que las Sinfonías Tontas y 
los cortos animados del Pato Donald y Mickey Mouse.
Otros estudios se situaban alrededor del poderoso Disney: Max Fleisher con dos largometrajes, 
Los Viajes de Gulliver (Gulliver´s Travels) y El Señor Bicho va al Pueblo (Mr. Bug goes to Town) y 
los cortos de Popeye; Los Looney Tunes y las Merrie Melodies de la Warner Bros’, con Bugs
Bunny, el Pato Lucas y Porky; La MGM con Tom y Jerry y Droopy y los cortos del anárquico Tex 
Avery y Walter Lantz con El Pájaro Loco (Woody Woodpecker). Alimentados por el conocimiento y 
la experiencia que emanaba del centro de entrenamiento de Disney, su humor desenfrenado a 
menudo era resultado de la rebelión contra el "Realismo" y la "Credibilidad" de Disney. 
Pero después de la Segunda Guerra Mundial, todo cambió. 
La llegada de la televisión y su voraz apetito por productos de producción rápida demandó trabajo 
más crudo y más simple. La estilización de los cincuenta dió lugar al nacimiento de los estudios 
UPA (United Productions of America) en Hollywood, creadores de Mr. Magoo y Gerald Mc Boing 
Boing. El estilo de la UPA era conocido por ser más sofisticado gráficamente que Disney, y sus 
animaciones eran más limitadas y mucho menos realistas. Para entonces había una especie de 
florecimiento mundial de películas animadas personales y experimentales hechas de muchas 
maneras y en diferentes técnicas, y con contenidos muy distintos del producido en Hollywood. 
Estilísticamente los animadores estaban reinventado la rueda, pero ignoraban el conocimiento 
estructural desarrollado en la "Era Dorada" de Hollywood. 
Este conocimiento, si bien residía en las manos de quienes lo originaron, fue generalmente 
ignorado como un "viejo sombrero", o tal vez fue olvidado por los siguientes treinta años. 
Sin embargo, en estos últimos años el renacimiento de la animación como una forma de 
entretenimiento masivo está provocando un nuevo resurgimiento de los viejos conocimientos. Las 
asombrosas y exitosas innovaciones en animación con computadoras están ayudando a 
transformar la animación y todo su espectro multifacético en una parte importante de la nueva 
corriente del entretenimiento. Además de esto, está la gran explosión de la industria de los juegos 
de ordenador. 
Si la animación "clásica" dibujada es una extensión del dibujo mismo, la animación por 
computadora puede ser vista como una extensión de los titiriteros (puppetry) Marionetas de alta 
tecnología. Ambos comparten el mismo problema de cómo hacer una actuación con movimiento, 
peso, timing y empatía. 
El viejo conocimiento se aplica a cualquier estilo o aproximación al medio, sin importar qué 
avanzada esté la tecnología. La mayoría de los mecanismos y métodos de trabajo en este libro 
fueron desarrollados y perfeccionados en los estudios de animación de Hollywood entre 1930 y 
1940. 
Aquí he conjugado lo que he aprendido de varios estilos y aproximaciones al tema y le he dado 
forma basándome en mi propia experiencia con este medio, con las ilimitadas posibilidades de la 
imaginación. 
Emery Hawkins me dijo: "La única limitación en animación es la persona que la hace. Por lo tanto, 
no existen límites en lo que puedes hacer. Y además, ¿qué te impide hacerlo?".
Meticulosamente, pinté este póster para el festival de cine de Londres en 1981. 
Todos dijeron: "Ah, no sabía que hacías collage".
22

---

## Sección 6: Core Concepts & Foundations [Entropy: 0.265]

HORA DE DIBUJAR
Esta sección es en realidad para animadores clásicos. Pero como no me ha sorprendido comprobar 
que la mayoría de los principales animadores digitales dibujan bastante bien, creo que podría 
resultar interesante para ellos también. 
Ciertamente es una gran ventaja poder expresar las propias ideas, aunque sea con figuritas de 
palos. Para el animador tradicional, esto es crucial. 
Dibujar debiera ser un instinto natural, de modo que el animador pueda concentrarse en las 
acciones y el timing, y así dar vida a la interpretación. 
Al hacer "cartoons" todo el tiempo, es muy fácil caer en fórmulas para dibujar. Durante la 
producción de Who framed Roger Rabbit? encontré lo siguiente, pinchado en una de nuestras 
pizarras:
 Epitafio de un artista desafortunado
 Él encontró
 una fórmula 
 para dibujar conejitos. 
 Esta fórmula
 para dibujar conejitos 
 le funcionó. 
 Tanto es así que al final 
 él no pudo cambiar 
 los malos hábitos 
 que esta fórmula
 para dibujar conejitos 
 le provocó. 
 - Robert Graves- 
El dibujo del natural es el antídoto contra esto. 
Al hacer dibujo con modelo estás completamente solo. Una de las razones principales que hace 
que los animadores (una vez que han llegado a ser animadores) no quieran pasarse la noche y su 
tiempo libre dibujando del natural, es que no se trata de una operación conjunta. 
La animación es por lo general un trabajo de grupo, y se cuenta con el estímulo de una 
interacción constante, ya sea competitiva o cooperativa, con el freno y el empujón, los altibajos, 
las penas y las glorias, todas las tensiones y ansiedades, las recompensas y la excitación de la 
producción en grupo. 
Con el dibujo natural no hay quien admire tus esfuerzos, más bien lo contrario. Siempre 
sorprende descubrir que uno no es tan avanzado o hábil como creyó ser, y ya que se trata de una 
de las cosas más difíciles de hacer y sin otra recompensa que el propio hecho, no sorprende que 
sólo unos pocos lo practiquen o se adhieran a él. 
La mayoría de los animadores están exhaustos al final de un día de trabajo, y tienen familias que 
atender. Además, es necesario hacer mucho dibujo de modelo vivo para llegar a alguna parte, no 
sólo un poco aquí y allá de vez en cuando. 
El hecho es que no hay sustituto para el arduo trabajo de dibujar la figura humana con solidez. 
Hay una recompensa sustancial: la mejora gradual y fundamental de todo nuestro trabajo. 
Winsor McCay dijo una vez: "Si tuviera que empezar de nuevo, lo primero que haría sería estudiar 
exhaustivamente el oficio de dibujar. Aprendería perspectiva, luego la figura humana tanto 
desnuda como vestida, y rodeada de un entorno apropiado". 
Y Milt Kahl expresó: "No creo que sea posible ser un animador de primera línea sin ser un 
dibujante excelente. Tienes que intentarlo por entero, llegar a conocer la figura humana. Si 
conoces la figura (humana) lo bastante bien de modo que te puedas concentrar en la persona 
(particular), en la diferencia, en el por qué esta persona es distinta a los demás. La habilidad de 
dibujar y poder hacerlo desde diversos ángulos y la habilidad, el conocimiento que te permite 
caricaturizar y exagerar en la dirección correcta enfatizando la diferencia entre las cosas, es lo 
que haces todo el tiempo. Cada vez que estés logrando un dibujo potente de lo que sea, tu dibujo 
será potente porque lo que estarás retratando será la particularidad que hace que una cosa se 
distinga de las demás. Hace falta esa base de dibujo de la figura humana para poder profundizar. 
¡Todo animador debiera tener esta base, pero desafortunadamente no la tienen! Nunca se sabe 
"demasiado". 
Si vas a ridiculizar algo, primero tienes que entenderlo tal cual es, eso te da un punto de partida. 
Te da un contraste... sólo puedo decir: "hazlo una, y otra... ¡y otra vez!". 
Art Babbit es aún más directo: "Si no puedes dibujar, olvídalo. 
Eres como un actor sin brazos ni piernas". 
Pero podemos aprender a dibujar. Existe un mito que dice que se nace dibujante o no... ¡falso! 
Obviamente, el talento natural es una gran ayuda, y el deseo es esencial, pero el dibujo se puede 
enseñar y a dibujar se puede aprender. Es mejor haber hecho una tonelada de dibujos en la 
escuela de arte para adquirir una base temprana. Pero nunca es tarde, simplemente... hazlo. 
Aquí van tres consejos sobre dibujo que recibí una vez, y que me quedaron grabados. 
Cuando tenía quince años y soñaba con convertirme en animador, hice un viaje de cinco días y 
sus noches en autobús desde Toronto a Los Angeles, y pasé días yendo y viniendo frente al cerco 
del estudio Disney con la esperanza de poder entrar. Finalmente un publicista amigo de mi madre 
vió mis dibujos y telefoneó al departamento de RRPP del estudio Disney. Así fue que me 
recibieron en el estudio durante dos días; fueron muy amables conmigo y hasta escribieron un 
artículo de prensa sobre mí. 
Fue entonces cuando recibí mi primer consejo importante. Richard Kelsey (diseñador, ilustrador y 
artista de Story del estudio Disney), dijo: "Ante todo, debes aprender a dibujar. El trabajo de 
animación siempre lo puedes encarar más adelante". 
Yo quería desesperadamente convertirme en animador, por eso le mostré mis bocetos de 
personajes de Disney, que estaban más o menos al nivel de los de Roger Rabbit, ya que era un 
bastardito precoz. Dick Kelsey los miró y dijo: "Sí, pero yo quiero decir aprender a dibujar de
verdad".
Richard Kelsey junto al "eager beaver". Estudio Disney, 1948. Mi trabajo comercial, edad 17. 
 
Semanas más tarde, cuando estaba tomando el autobús para volver a casa en Toronto, llamé por 
teléfono a Dick y le pregunté nuevamente, "¿Qué crees que debiera hacer?". 
"¡Aprende a dibujar!", dijo él. 
Algo que en verdad lamento es que cuarenta años más tarde, cuando ya era director de 
animación de Who framed Roger Rabbit?, vi a Dick en la cantina del estudio Disney como al 
pasar, pero estaba tan sumergido en la política de producción que no pude acercarme a él para 
agradecerle... Nunca tuve otra oportunidad. 
Después de mi viaje decidí ir directamente a la escuela de arte, donde recibí mi segundo consejo 
de parte de un gran maestro y soberbio dibujante, Eric Freifield, quien entonces enseñaba en el 
Ontario College of Art. Él se fijó en mis dibujos de figura humana y dijo: "Bien, he aquí a un chico 
listo que nunca ha visto nada". Yo dije: "¿Qué debo hacer?", a lo que él respondió: "Ve a la 
biblioteca y mira a Albrecht Dürer durante dos años". Eso hice... y naturalmente, mi interés en la 
animación se desvaneciera durante años. 
Me pagué mi estudio en la escuela de arte dibujando, como churros, anuncios de comida para 
perros al estilo Disneyniano, como el que se ve en la ilustración de arriba, y al mismo tiempo 
haciendo "realismo social", como ésta litografía de una misa evangélica "Where the healing waters 
flow" ("Donde fluyen las aguas curativas"), ilustración página 27. 
Después de aquello, viví en España algunos años, donde me dediqué a la pintura (ilustraciones 
página 27), hasta que inesperadamente el bicho de la animación volvió a picarme. 
Cuarenta años más tarde, un alto ejecutivo de Who framed Roger Rabbit? no dejaba de referirse a 
mí como "artisticoide" o "pseudoartístico"... ¿cómo pudo saberlo? 
Debió haberlo olido, ya que no había ni rastros de eso en mi animación. 
27

---

## Sección 7: Core Concepts & Foundations [Entropy: 0.25]

El tercer consejo vino muchos años más tarde, a mis cincuenta, cuando ya me sentía bastante 
realizado, y vino de un hombre bastante más joven que yo. Mi talento es primariamente "lineal", 
lo que hace fácil dibujar cartoon. Sin embargo, como los animadores deben cerrar sus formas, 
hay una tendencia a terminar dibujando meros contornos, como figuras de libros para colorear. 
En otras palabras, los animadores no suelen dibujar de adentro hacia afuera, como los escultores. 
La escultura había sido mi punto débil, aunque había hecho mucho dibujo de figura humana y 
tenía una base de anatomía elemental. 
John Watkins, por aquel entonces un joven autodidacta de veintitrés años, brillante dibujante y 
anatomista, dió sus propias clases de dibujo sobre figura humana en Londres (fue uno de los 
principales diseñadores en Tarzán, del estudio Disney). Yo solía contratar a John de tanto en tanto 
para hacer dibujos para presentaciones, y nos llevábamos bien. Durante un tiempo fui a las clases 
de modelo vivo de John cada tarde, y un día John, un honesto sin compasión, señaló uno de mis 
dibujos y dijo: "¡Eh, te perdiste una etapa!". Me sentí como una mariposa pinchada a la pared, 
¡tenía razón! Supe inmediatamente a qué se refería, mi debilidad estaba en la construcción desde 
un punto de vista escultural... era demasiado lineal. 
Años más tarde, cuando me retiré de la parte "industrial" de la animación, re-estudié mi anatomía 
y trabajé mi dibujo desde a dentro hacia afuera. Avancé "hacia atrás" y pude recuperar esa etapa 
perdida. 
Mostré algunos de estos dibujos de figura humana a mi madre, una ilustradora ya retirada, en su 
lecho de enferma poco antes de su muerte. "He estado trabajando y reconstituyéndome, mamá, 
estuve haciendo todos estos dibujos". Ella miró mis dibujos atentamente y luego dijo: "Muy 
bonito, muy bonito... nada nuevo". Consejos desde dentro de la propia familia, de algún modo no 
tienen el mismo impacto que desde afuera. Sin embargo, mi madre había dicho una vez, "Cuando 
vayas a la escuela de arte, vas a encontrar a todo el mundo sentado, practicando su propia 
firma". Dicho y hecho, ahí estaban algunos de ellos, haciendo justamente eso. 
Ella también me dió este consejo: "No trates de desarrollar un estilo... olvida el estilo. 
Concéntrate solamente en el dibujo, y el estilo vendrá solo". 
Por supuesto que hay puntos de vista opuestos a esto, aquello de: "Tienes que aprender a 
dibujar".
El gran Tex Avery, maestro de la posibilidad de hacer lo imposible en animación y lograr que lo 
irreal cobre vida dentro del campo de la animación, (y el primer director de Bugs Bunny y Elmer 
Fudd), dijo: 
"Nunca fuí un gran artista. Me dí cuenta trabajando para Lantz que la mayoría de los tipos que 
trabajaban allí me davan vueltas... pensé, hermano, ¿por qué oponer resistencia? ¡No lo voy a 
lograr nunca! Mejor tomar el otro camino, y me alegro de haberlo hecho. ¡Mi Dios, disfruté con 
eso mucho más de lo que hubiera podido gozar animando escenas toda mi vida!". 
Tex dejó de animar y se convirtió en un gran, original e innovador director. El biógrafo John 
Canemaker dijo: "Mientras Disney durante los años 30 estaba intentando convencer a la audiencia 
de la "realidad" de los personajes en su mundo cinematográfico, creando su "ilusión de vida", Tex 
fue en dirección opuesta, celebrando al cartoon como tal, explorando el potencial del medio para 
el surrealismo". Él nunca dejó que la audiencia olvidara que estaba viendo una película animada. 
Tex estuvo unos veinte años seguidos llevando su forma salvajemente divertida de encarar al 
medio, pero le resultó imposible sostenerse. "Estoy quemado", decía. Su colega, el animador Mike 
Lah dijo: "Ya no le quedaba más espacio, lo había agotado". 
Amo los cartoons de Tex Avery, sus dibujos y su diseño de personajes. Su Droopy es mi 
personaje de cartoon favorito. Una de las cosas más agradables de hacer Who framed Roger 
Rabbit? fue emular al humor de Tex Avery. "Aunque no tan brutal", fueron mis instrucciones. 
Pero, como Milt Kahl dijera: "Hay que tratar de llegar a un todo". 
Estoy convencido que si la base de dibujo de un animador es sólida, entonces tendrá la 
versatilidad necesaria para ir en todas las posibles direcciones al alcance. Podrá dibujar cualquier 
cosa, desde los más difíciles personajes realistas, hasta los más salvajes y chiflados. Y es 
improbable que termine por agotar sus recursos y sentirse "quemado". 
Debido a su gran habilidad para el dibujo, Milt Kahl solía cargar con la animación de "el príncipe" o 
de los personajes más realistas de Disney, quienes por supuesto, son los más difíciles de animar. 
Si alguien criticaba su trabajo, él respondía: "Muy bien, puedes hacerte cargo del príncipe", con lo 
que el crítico prontamente desaparecía. 
Se corrió la voz entre los artistas más cartooneros de que "Milt dibuja maravillosamente, pero 
sólo puede animar cosas realistas y no puede para nada manejar personajes estrafalarios". 
Entonces, y entre largometrajes, Milt animó la mayor parte de Tiger Trouble, un corto de Goofy. 
Todo el mundo cerró el pico, y lo mantuvo bien cerrado. Su trabajo es un clásico de animación 
"completamente loca". 
"Basta con que puedas dibujar cosas graciosas", es un mito en el mundo de la animación que nos 
ha acompañado durante largo tiempo, y que aún parece persistir. Esto se debe a que algunos de 
los primeros animadores carecían de habilidad gráfica sofisticada, aunque a pesar de todo, eran 
muy inventivos y excelentes cuando se trataba de atrapar la esencia del drama y la actuación. 
El mito era que sólo necesitaban con un asistente habilidoso que hiciera los dibujos finales, y todo 
estaría en orden. Pero a mediados de los años treinta, cuando la nueva camada de animadores 
jóvenes con mejor base de dibujo entró a escena y aprendió de los veteranos, pronto el campo 
quedó cubierto de animadores desempleados, aquellos que sólo podían manejar el estilo más 
crudo del cartoon... la nueva camada de buenos dibujantes los dejó sin empleo. Si la presente 
expansión de este medio alguna vez se contrae, ciertamente serán los mejores artistas quienes 
sobrevivan. 
Bill Tytla, famoso por su animación de Stromboli en Pinocho, por su diablo en "Night on Bald 
Mountain", de Fantasía, y por Dumbo con su madre, una vez dijo: "Algunas veces te tocará 
animar cosas con las que no puedes manejarte dulce y recatadamente. Ésas son las veces en las 
que te hará falta saber algo de dibujo. Ya sea que se llame forma, fuerza o vitalidad, deberás 
incluirla en tu trabajo, pues eso será lo que sientas, y dibujar será tu medio para expresarlo". 
31

---

## Sección 8: Core Concepts & Foundations [Entropy: 0.25]

Obviamente todo esto no se ajusta tanto a los animadores digitales, ya que la "estructura" de sus 
personajes está ya planteada dentro de la máquina, lista para ser manipulada. Pero ya que la 
mayoría de los mejores animadores digitales dibujan bastante bien, muchos de ellos desarrollan 
sus poses en pequeños bocetos, y por supuesto, los artistas y diseñadores gráficos, layout y story
dibujan exactamente como sus equivalentes clásicos. 
Tuve una experiencia desconcertante en Canadá, cuando un amigo me pidió que diera una charla 
de una hora para una reunión de animadores digitales, en una enorme escuela secundaria. Tenían 
un costoso equipamiento de computadoras muy impresionante, pero por lo que pude ver en sus 
trabajos, ninguno de ellos parecía tener la menor idea sobre dibujo. Durante mi exposición 
enfaticé la importancia del dibujo, y la seria escasez de buenos dibujantes. 
Un profesor de barba gris y actitud relajada me interrumpió para informarme, "¿A qué se refiere? 
Todos aquí dibujamos muy bien". No sabia que decir. Me faltaban las palabras. 
Al final de la conferencia, les demostré cómo hacer una caminata básica, y como resultado los 
chicos me asediaron a la salida, suplicándome desesperadamente porque les enseñara más. Me 
escapé, pero temo que ésa es la situación general, la falta de cualquier enseñanza y de nadie que 
se encargue de "traspasar el conocimiento". 
Uno no sabe lo que no sabe. 
Uno de los problemas más extendidos hoy día es que, hacia finales de los años 60, el dibujo 
realista pasó a considerarse pasado de moda dentro del mundo del arte, y ya nadie se tomaba el 
trabajo de aprender a hacerlo. 
La Slade School, en Londres, solía ser famosa en el mundo por producir refinados exponentes del 
dibujo británico. Un distinguido pintor inglés que daba clases en la Slade, una vez me preguntó: 
"¿Cómo aprendió usted a hacer animación?". Le respondí que había tenido la suerte de haber 
hecho cantidad de dibujo de figura humana en la escuela de arte, lo que contribuyó a que sin 
darme cuenta, desarrollara un sentido del peso, tan vital en animación. 
Luego agregué: "Pero… ¿para qué le digo esto?. Usted enseña en la Slade School, que es famosa 
por sus clases de modelo vivo, y sus dibujantes". 
"Si los estudiantes quieren hacer eso", respondió, "Entonces deben juntarse y pagar a una modelo 
entre todos, para hacerlo en sus propias casas". Al principio pensé que estaba bromeando... ¡pero 
no! El dibujo con modelo vivo había sido descartado hacía años, ni siquiera figuraba en el 
currículo. 
Tuve un amigo de la infancia que llegó a ser una personalidad en los círculos de la educación 
artística. Solía dirigir conferencias internacionales sobre arte. Hace aproximadamente dieciséis 
años, me invitó a Amsterdam a una conferencia de los decanos de las principales escuelas de 
bellas artes en Estados Unidos. Me conocía lo suficiente como para saber que tiendo a decir cosas 
controvertidas, por eso me invitó como su as en la manga. 
Durante mi exposición lamenté la falta de artistas talentosos y entrenados, y el modo en que ello 
obstaculiza mi propio trabajo en el estudio, ya que no puedo encontrar dibujantes entrenados y 
disciplinados para contratar. Las carpetas de los aspirantes vienen llenas de texturas, collages 
abstractos, garabatos... a menudo hasta fotos de ellos mismos y sus amigos, desnudos. Nada de 
dibujo real. No me dí cuenta cuánto llegaba a afectarme esto, y mientras hablaba estuve al borde 
del llanto. 
Mi diseño para la campaña publicitaria de El Graduado, de Mike Nichols. Una base de dibujo con 
modelo vivo fue invaluable a la hora de dibujar esta simple pierna para el logo de la película. 
No puedo dejar de enfatizar
la importancia del dibujo 
de la figura humana en animación.
Reprendí a los decanos de escuelas de arte, por fallar en su deber de proveer del conocimiento 
necesario a sus estudiantes. Sorprendentemente cuando terminé, los decanos llamaron a una 
reunión de emergencia a la que me invitaron. "Vea, señor Williams", dijeron, "Tiene razón, pero 
tenemos dos problemas... primero, como hace años el dibujo clásico se rechazaba, no tenemos 
docentes que puedan dibujar o enseñar dibujo convencional, porque ellos mismos nunca lo 
aprendieron. Segundo, la mayoría de nuestros estudiantes son ricos, con ellos contamos para 
conseguir fondos, y no quieren aprender a dibujar. Prefieren auto decorarse como obras de arte 
viviente, y eso es exactamente lo que hacen". 
Entonces dije, "Mire, sólo sé que no puedo encontrar gente para contratar o para formar; pero 
por lo demás no sé qué puedan hacer ustedes". 
"Nosotros tampoco", respondieron. 
Últimamente, las cosas han mejorado un tanto. El llamado dibujo clásico parece estar volviendo, 
pero con un sentido fotográfico híper realista, pues los buenos artistas en ese campo son escasos. 
Sombrear no es dibujar, y tampoco es realismo. 
El buen dibujo no consiste en copiar la superficie, tiene que ver con entendimiento y expresión. 
No queremos aprender a dibujar sólo para terminar limitados a demostrar nuestro conocimiento 
de articulaciones y músculos. Queremos conseguir la clase de realidad que una cámara no puede 
obtener. Queremos acentuar y suprimir aspectos del carácter del modelo para hacerlo más vívido. 
Y queremos desarrollar la coordinación para poder conducir nuestro cerebro hasta la punta de 
nuestro lápiz. 
Muchos caricaturistas y animadores dicen que la razón principal que los lleva a hacer cartoons es 
el deseo de alejarse del realismo y el mundo real, para adentrarse en el reino libre de la 
imaginación. Tienen razón al señalar que los animales del cartoon no tienen aspecto de animales 
reales, son diseños, construcciones mentales. Mickey no es un ratón, Sylvester no es un gato... se 
asemejan más a payasos de circo, que animales. Frank Thomas siempre decía: "Si vieras a Lady 
and the Tramp (La Dama y el Vagabundo) caminando por el sendero, no hay forma de 
convencerte de que ésos dos son perros de verdad". 
Pero para hacer que las cosas funcionen, los movimientos tienen que ser creíbles, lo que nos lleva 
de vuelta al realismo y a las acciones reales, que nos devuelven al estudio de la figura humana o 
animal para comprender su estructura y movimiento. Lo que queremos conseguir no es realismo, 
es credibilidad.
Mientras que Tex Avery liberó al animador del acercamiento mas "lineal", para hacer lo imposible, 
sólo lo consiguió porque su animación fue hecha de una mayoría de ex empleados de Disney, 
quienes ya tenían "el conocimiento Disney" de articulación, peso, etc. Así, irónicamente, su 
rebelión, su "ir por el otro camino", tuvo su base en un subyacente conocimiento del realismo. 
Pero... ¡no confundir al dibujo con un mapa! Estamos animando masas, no líneas. Por eso, 
debemos entender cómo la masa funciona en la realidad. Para alejarnos de la realidad, nuestro 
trabajo debe estar basado en la realidad misma. 
Todo está en el tiempo y en el espacio 
Conocí a Grim Natwick (bautizado como Myron Nordvieg) en un sótano de Hollywood, cuando él 
ya tenía alrededor de ochenta años. Grim es el más viejo de los grandes animadores, llegaba ya a 
los cuarenta cuando animó ochenta y tres escenas para Blanca Nieves en la película de Disney 
"Blanca Nieves y los Siete Enanos". Anteriormente, había diseñado a Betty Boop para Max 
Fleischer, trabajo por el que no recibió nada, hecho que lo tuvo furioso hasta el día de su muerte, 
a los cien años. 
Nunca olvidaré la imagen de este gran Noruego-Americano sentado en un dorado atardecer, 
extendiendo sus largos brazos y sus manos de espátula diciendo...

---

## Sección 9: Core Concepts & Foundations [Entropy: 0.25]

..."A-A-A-ANIMACIÓN.... ESTÁ.. T-T-TODO
...EN EL TIEMPO... Y-Y-Y EN.... EL ESPACIO
(PAUSA LARGA).......... 
QUE RA-A-A-R-RO.... QUE HAYAN SIDO
LOS AMERICANOS.... LOS QUE LO
HAYAN DESCIFRADO"....
La pelota que bota lo dice todo. 
El viejo ejemplo de la pelota que rebota es tan frecuentemente utilizado porque muestra muchos 
aspectos distintos de la animación. 
Una pelota rebota a lo largo... 
Y cuando rebota (el "boink") ése es el tiempo, los impactos, dónde golpea la pelota el piso, ése 
es el ritmo de la acción, el ritmo al que las cosas suceden, donde los "acentos", "ritmos" o 
"impactos" se suceden. 
Y éste es el espacio (los intervalos)... 
La pelota se superpone a sí misma en la parte más lenta del arco, pero cuando cae rápido, está 
más espaciada. Ése es el espaciado. El espaciado está en lo cerca o lejos que estén los grupos. 
Esto es todo... es simple, pero es importante. El espaciado es la parte engañosa, el buen espacio 
en animación es una rara comodidad. 
Así que tenemos: 
 
Espacio
Tiempo
Los dos elementos básicos de la animación. 
Para comprobar esto, tome una moneda y fílmela con una cámara de video por etapas. 
Digamos, 20 fotogramas 10 fotog.. 13 fotog.. 10 fotog..
Primero planee el tiempo, cuando usted quiera que la pelota rebote en el piso. Después, mueva la 
moneda a la siguiente posición, tomando una imagen por cada fotograma y observe qué queda 
bien y qué no. Inténtelo con distinto ritmo e intervalos. Usted ya está animando, ya está 
manejando los fundamentos más importantes y ni siquiera ha hecho un solo dibujo... está 
haciendo pura animación, sin dibujos. 
Escondido en este simple ejercicio está el peso de la pelota, si parece ligera o pesada; de qué 
material está hecha... ¿es grande o pequeña, se mueve rápida o lenta? Todo esto surgirá si hace 
algunas pruebas, que llevarán un par de minutos. La importancia del tiempo y el espacio se le 
hará obvia. 
Como usted hizo la animación, un cierto grado de personalidad se mezclará en la acción, si la 
pelota es intencionadamente, lenta, gallarda, errática, precavida... incluso optimista o pesimista. 
Y todo esto, antes de que usted haya siquiera hecho un dibujo. Esto revela lo importantes y 
predominantes que son el tiempo y los intervalos. Aunque las posiciones de la pelota fueran 
dibujadas a detalle por Miguel Ángel o Leonardo da Vinci, el tiempo y el espacio de los dibujos 
predominaría. 
Otro modo interesante para experimentar de inmediato la diferencia entre tiempo y espacio es el 
siguiente: 
Filmemos una moneda, y movámosla a través de la página (o pantalla) en un segundo 
(veinticuatro fotogramas en tiempo de pantalla). Éste es nuestro tiempo.
Dividiremos las posiciones a intervalos regulares... éste es nuestro espacio.
Paro
Detener
Mitad
Ahora, tomemos el mismo tiempo, de nuevo, le cuesta un segundo a la moneda moverse a través 
de la página. Pero cambiaremos los intervalos empezando a alejarnos más lentamente de la 
posición número 1 y acercándonos también más lentamente a la posición número 25. 
Detener
Detener
Mitad
Aceleración desde #1
Desaceleración hasta #25
A la moneda le sigue costando un segundo llegar hasta el otro lado. Tiene el mismo tiempo, pero 
el movimiento cambia debido al espacio. Ambas empiezan juntas, ambas llegan juntas al medio... 
pero la distribución de los intervalos es distinto. 
Por lo tanto, la acción es muy diferente. 
Se podría decir que la animación es el arte del tiempo, pero lo mismo se podría decir acerca de las 
películas filmadas. 
Los maestros más brillantes del tiempo fueron los comediantes del cine mudo, Charlie Chaplin, 
Buster Keaton, Laurel y Hardy. 
Si para un director de cine el tiempo es el hecho más importante, para un animador es solo la 
mitad de la batalla, ya que necesitamos también el espacio. Podemos tener un talento natural 
para el tiempo, pero debemos aprender el espacio de las cosas. 
Otra cosa: La pelota que bota es frecuentemente utilizada para mostrar el "aplastamiento y 
estiramiento" en la animación, es decir, la pelota se alarga al caer, se aplasta en el impacto 
contra el suelo y regresa a su forma original sobre el segmento más lento de su arco. 
Podría aplastarse y estirarse de esta manera si fuera una pelota muy blanda con poco aire, pero 
lo que he comprobado es que se puede obtener un efecto bastante bueno con una moneda rígida 
(siempre y cuando los intervalos sean los correctos) así que esta técnica no siempre es necesaria. 
Ciertamente, una dura pelota de golf no se va a deformar por todos lados. En otras palabras, si 
usa demasiado esta técnica la animación se ve descuidada, como si todo estuviera hecho de 
goma. Las cosas en la vida real no son así, al menos no en su mayoría. Continuaremos con este 
tema más adelante. 
Bote de pelota de golf. 1951
Habiendo establecido esto, vayamos a la lección Número Uno: 
Imágenes de "A Christmas Carol", 1972, de Charles Dickens. Empezábamos a mejorar, cuando 
obtuve mi primer Oscar por este film de media hora, hecho originalmente para la TV. ¡No 
creerían que gran parte de esta película fue dibujada por los animadores de Bugs Bunny! No 
hubiéramos podido hacerla sin el trabajo de Ken Harris, quien se encargó de Scrooge. Ya para 
terminar, Chuck Jones (Productor ejecutivo) nos prestó a Abe Levitow, un gran animador 
desconocido de cualidades majestuosas. También recibimos ayuda de los pupilos de Disney 
George Nicholas y Hal Ambro. Mis propios hombres fuertes fueron Richard Purdum, Sergio 
Simonetty y Roy Naisbitt. 
Lección Uno 
¡DESCONÉCTESE! 
¡Desconéctese, quítese los audífonos! ¡Apague la radio! ¡Apague su CD, quite el casette! Cierre la 
puerta... 
Como muchos artistas, tenía el habito de escuchar música clásica o jazz mientras trabajaba. 
En una de mis primeras visitas a Milt Kahl pregunté inocentemente... 
MILT, ¿USTED NUNCA ESCUCHA MÚSICA 
CLÁSICA MIENTRAS TRABAJA?
42
44

Como venía de un genio, me produjo una gran impresión... después de esto, aprendí a enfrentar 
el silencio y a pensar antes de mover mi lápiz. Mi animación mejoró de inmediato. 
Ha sucedido lo mismo con muchos artistas cuando les transmito esta sabiduría. Recientemente, 
dos animadores infografistas previamente adictos al sonido, se asombraron al darse cuenta que 
sus conectados colegas se burlaban de ellos por no tener cables saliendo de sus oídos... se 
sorprendieron aún más por la asombrosa mejoría de sus trabajos... 
... fin de la lección uno. 
Retrato de un artista luego de la Lección Uno 
"Animación es Concentración" 
AVANZANDO HACIA ATRÁS, HASTA 1940 
Avancemos hacia atrás, para hacernos una idea de dónde se encontraban los animadores durante 
la "Edad de Oro". Después avanzaremos desde allí para poder hacer cosas nuevas. 
Hay que comenzar con lo básico... 
Todo el mundo quiere decorar su casa con piezas interesantes, antes de ocuparse de los cimientos 
y pilares. Todo el mundo quiere llegar de un salto a la parte sofisticada, pulir y dar brillo a los 
viejos cimientos. 
Pero sólo el entendimiento cabal de los conceptos básicos produce auténtica sofisticación. 
Como dijera Art Babbit: 
"El conocimiento necesario para hacer que unos dibujitos cobren vida está en el Disney de la 
primera época. Nadie nos enseñó a articular a estos personajes imaginarios. Tuvimos que 
descubrir la mecánica por nuestros propios medios, y compartirla entre todos. Hay muchos 
estilos, pero la mecánica de la vieja animación Disney aún perdura". 
Ya estaba todo resuelto hacia el año 1940, más o menos cuando se estrenó Pinocho.

---

## Sección 10: Core Concepts & Foundations [Entropy: 0.25]

Era un sistema maravilloso, preciso y simple. 
Primero lo tomaremos parte por parte, luego lo recompondremos. 
HISTORIA DEL GRAFICO DE ANIMACION Y EL INTERCALADO
Sucedió algo muy interesante cuando trabajaba con Grim Natwick. Él era tan viejo, que cada día 
tendía a retroceder a una etapa profesional diferente de su vida: un día llegaba y hacia animación 
circular, de goma (Rubber hose animation*), al estilo de los años 20, al día siguiente pasaría por 
una fase estilo Blancanieves de 1936, haciendo toneladas de dibujos de movimiento fluido, al día 
siguiente el estilo sería más bien de su período Mr. Magoo (UPA, 1950), lleno de acciones físicas y 
poses estáticas. Más tarde limitaría la cantidad de dibujos al máximo, como si hubiese estado 
animando un comercial de TV de los años 60, y al día siguiente volvería al estilo excesivo de 
Fantasía. 
*Animación de "Mangueras de Goma". Hacía referencia al comportamiento de las extremidades, 
que ondulaban sin articulaciones. 
Un día me lo encontré dibujando al viejo estilo, algo así... 
No solamente mostraba así el arco de la acción, sino que de este modo también indicaba 
diferentes intervalos entre sus dibujos. 
De pronto caí en la cuenta de que tal vez ése era el origen de los gráficos que los animadores 
ponen al margen de sus dibujos. 
Ejemplo Mano Cabeza Cola
Entonces le pregunté, "Eh, Grim... estas escalas se fueron alejando gradualmente de los dibujos 
para tomar otra ubicación en la hoja"? 
Una mirada desde cierta lejanía se pintó en su rostro, y respondió: "....sí...." 
Durante los años 20 los animadores hacían la mayor parte del trabajo. Dick Huemer era el 
principal animador de New York, y trabajaba para Max y Dave Fleischer en su serie Mutt & Jeff. 
Dick me contó que un día le dijeron: "Tu trabajo es estupendo Dick, pero no es suficiente en 
cantidad". Entonces Dick les respondió: "Dénme a alguien que haga los dibujos intermedios, y 
haré entre dos y tres veces más trabajo". Ése fue el nacimiento del Intercalador. 
Dick diría más tarde en una entrevista que el Intercalador había sido idea de los Fleischer, y que 
él solamente les siguió la corriente. Pero Dick en realidad me contó que él había ideado al 
Intercalado y el Intercalador, el ayudante o asistente. 
Los dibujos principales, o posiciones extremas, pasaron a llamarse extremos, y los dibujos entre 
los extremos recibieron el nombre de intercalados. 
 EXTREMO INTERCALADOS EXTREMO 
El gráfico muestra los intervalos. 
Pondremos tres intercalaciones con igual espaciado entre los dos extremos. 
El número 3 está justo al medio entre 1 y 5. Luego ubicamos al número 2, justo en el medio entre 
1 y 3, y el número 4 en el medio entre 3 y 5. Así, logramos espaciados idénticos entre los 
intermedios. 
 
INTERCALADOS 
EXTREMO EXTREMO
EXTREMOS Y POSICIONES DE PASE (BREAKDOWNS)
Tomemos como ejemplo la oscilación de un péndulo: los extremos se encuentran donde hay un 
cambio en la dirección, en los puntos en que la acción cambia de dirección. 
EXTREMO EXTREMO 
Debido a que el brazo del péndulo mantiene su longitud al oscilar, la posición intermedia genera 
un arco en la acción. Podemos apreciar cuán importante será para nosotros esa posición media 
entre los dos extremos. 
OBVIAMENTE 
ERRÓNEO
PUES EL BRAZO 
SE HA ENCOGIDO
ARCO (TRAYECTORIA) DE LA ACCIÓN
Es obvia la importancia de esta posición intermedia. Durante los años 30 se solía llamar a esto 
“quiebro” (breakdown) o "posición de paso". 
Agregaremos dos intermedios. 
BREAKDOWN 
O POSICIÓN
 DE PASO
INTERCALACION INTERCALACION
EXTREMO EXTREMO
Algunos animadores subrayan el "Pase" (Breakdown) o posición de paso por ser tan importante 
para la acción. Tengo el hábito de hacer esto porque se trata de una posición crucial que nos 
ayuda a inventar. Haremos un uso intensivo de esta pose media más adelante... 
Si queremos que nuestro péndulo acelere y desacelere, desde y hacia las posiciones extremas, 
precisaremos un par de intermedios más: 
 
Ahora, nuestra escala se verá así....
DESACELERACIÓN 
HACIA EL SEGUNDO 
EXTREMO
ACELERACIÓN
DESDE EL PRIMER 
EXTREMO 
Lo que estamos haciendo es acelerar o desacelerar desde o hacia los extremos (Slow in-Slow 
out). "Acelerar hacia" (Slow in) y "Desacelerar desde" (Slow out) son la terminología clásica para 
definir esto, aunque personalmente prefiero los términos de los animadores digitales de hoy día: 
"Easy in" y "Easy out". 
Para hacer que la acción desacelere aún más hacia cada extremo, agreguemos aún un par más de 
intermedios... 
 
Ahora, nuestra escala se verá así.
Ken Harris siempre llamó a esto "Amortiguación" (Cushioning), lo que es una buena forma de 
escribirlo. El maestro animador Eric Larson, quien se convirtiera en instructor de los más jóvenes 
animadores del estudio Disney, dice que lo que la animación debe tener es cambio de forma. 
EXTREMO 
#1
EXTREMO 
#5
Entonces, cambiemos de una 
mano cerrada a un dedo apuntando.
Aceleramos desde el número 1 como para apuntar o señalar con el dedo en el número 5. 
La escala sería la siguiente: 
ACELERACIÓN
DESDE #1
Alternativamente, si aceleramos bruscamente desde la mano cerrada y desaceleramos o 
amortiguamos hacia el dedo que apunta, la escala se vería así: 
DESACELERACIÓN
HACIA #5
Para lograr una acción más relajada, más lenta, podríamos añadir más intermedios y acelerar 
desde la mano cerrada, incrementando la velocidad hacia el medio, y por último desacelerar hacia 
la mano con el dedo que apunta. 
ACELERANDO
DESDE # 1
DESACELERANDO
O "AMORTIGUANDO"
(CUSHIONING IN) HACIA 
El animador se puede sacar el peso de encima dibujando las dos posiciones extremas y haciendo 
una escala, para que el asistente agregue todas las posiciones intermedias. 
A mí me malcriaron los mejores y más laboriosos animadores de Hollywood, que me enseñaron lo 
que sé, y más tarde me llevé más de una sorpresa trabajando con algunos de los mortales menos 
privilegiados. 
He aquí cómo un animador de Hollywood "del montón" evitaría el trabajo: 
Un personaje entra en escena por la izquierda... y sale por la derecha. 
PANTALLA DE CINEMASCOPE
EXTREMO #1
EXTREMO #96
Caminar de un lado a otro de la pantalla va a llevar cuatro segundos (96 fotogramas). Entonces, 
el animador hace el dibujo número 1 y el dibujo número 96, entregando la escala de arriba al 
asistente para irse a jugar al tenis. Vuelve al día siguiente, y echa la culpa al asistente por el 
terrible resultado. 
Puede parecer exagerado, sin embargo sucede. 
Para continuar, sabemos que los extremos y los quiebros son cruciales para el resultado final, 
pero los intermedios también son muy importantes. 
El geniecillo dentro de la computadora crea intermedios perfectos, pero para gente que dibuja 
conseguir intermedios buenos puede resultar un verdadero problema. 
Grim Natwick enfatizaba constantemente: "los malos intermedios pueden matar hasta la más fina 
de las animaciones". 
En 1934, cuando el novato Milt Kahl (recién ingresado al estudio Disney) conoció por primera vez 
al grandioso Bill Tytla, le comentó que estaba trabajando en el departamento de intercalación. 
Tytla le ladró: "Ah sí...? Y cuántas escenas has arruinado últimamente? 
Como la mayoría de los principiantes, solía hacer todos mis intermedios. Más tarde conseguí mi 
primer empleo "oficial", trabajando para UPA en Londres. Me dieron un asistente sin experiencia, 
quien sin embargo podía dibujar bien. Pero esto fue lo que sucedió: 
Teníamos uno de esos personajes simples de aquellos tiempos, una niña llamada Aurora que era 
el personaje central de un comercial del jugo de naranjas Kia Ora. "¿Dónde está el Kia Ora, 
Aurora?"

---

## Sección 11: Core Concepts & Foundations [Entropy: 0.25]

Ella tenía este aspecto: 
Yo dibujé las poses 1, 3 y 5, mi asistente hizo los intermedios 2 y 4. 
Él tenía ambiciones de diseñador, no le gustaban los ojos ovales así... 
… le gustaban los circulares.
Entonces, los intermedios quedaron así... 
 
El resultado en pantalla, por supuesto,
es el siguiente: 
Bamboleo, bamboleo, bamboleo. 
Como es común en los apurones de producción, se termina por contratar a cualquiera que pase 
por la calle y pueda sostener un lápiz... y esto es lo que sucede: 
Digamos que un actor sostiene una taza de café, animada: 
El intermediador que encontramos en la calle no entiende de perspectiva simple, por eso la boca 
curva de la taza aparece recta en sus intermedios. 
Resultado: "Rumba flamenca"... 
bamboleo, bamboleo, y más bamboleo.
Si el bamboleo ya se da con algo tan simple, tan sólo imaginen sus dimensiones al trabajar con 
dibujos complejos... todas las formas estarán afectadas por el mal de San Vito. En conclusión, el 
trabajo de los asistentes o intercaladores es en realidad controlar los volúmenes. 
Muchos asistentes se preocupan por la calidad de la línea, por igualar la calidad de línea del 
animador. Siempre digo que no hay que preocuparse por la calidad de la línea, sino más bien por 
lograr volúmenes correctos. ¡Mantener la consistencia de formas y volúmenes es igual a control 
del volumen! Al ver en pantalla el dibujo coloreado son las formas lo que vemos, son las formas 
quienes predominan. 
Cuando fuera que estuviéramos bajo presión y cortos de personal competente, descubrimos que 
una relación de tres a dos entre buenos dibujos extremos y malos intermedios nos permitía 
conseguir un resultado aceptable. 
BUENO BUENO BUENO
MALO MALO
Al tener solamente dos dibujos buenos con tres malos en los medio, los malos superaban a los 
buenos y el resultado era malo. 
MALO MALO 
BUENO BUENO
Si el quiebro o posición de paso está mal, entonces todos los intermedios también lo estarán. 
MALO MALO MALO MALO
BREAKDOWN 
INCORRECTO
BUENO BUENO
Al no ser precisos, aquí vemos lo que sucede: el animador proporciona una escala y quiere 
intermedios que se correspondan a ella. Esto es, que estén en la posición correcta. 
Pero digamos que el asistente ubica el Breakdown o posición de paso en el lugar incorrecto... 
EL ASISTENTE UBICA EL DIBUJO 4 AQUÍ...
¡INCORRECTO! 
LUEGO EL INTERMEDIADOR
UBICA EL #3 AQUÍ
MÁS TARDE, ALGUIEN
PONE EL #2 AQUÍ
YA NO 
ESTÁ BIEN
Y en lugar de lograr acciones fluidas como ésta...
... lograremos una especie de desparramo como éste: 
Entonces: el número 4 está mal. 
 el 3 lo empeora. 
 el 2 lo empeora aún más.
EXTREMO EXTREMO INTERMEDIO EXTREMO
... entonces, el animador debería hacer uno de los intermedios por su cuenta.
Algo que un animador nunca debiera hacer, 
es dejar al asistente los "tercios". 
Si nos resulta necesario dividir la escala en tercios... 
De ese modo se deja que el asistente agregue la pose faltante en medio. 
Dejar tercios al asistente es cruel y causa problemas, pero es razonable hacer una escala como 
ésta, que exige un intermedio muy próximo a un extremo. 
HACER UN INTERMEDIO MÁS CERCA DE #3 HACER UN INTERMEDIO MAS CERCA DE #1 
HACER UN INTERMEDIO
MÁS CERCA DE #1
HACER OTRO INTERMEDIO
MÁS CERCA DE #4
CLAVES
Y aquí llegamos a la Gran Enfermedad Circular. Por alguna razón, los animadores aman los 
círculos, nos fascina encerrar a los números de nuestros dibujos en un círculo. Tal vez se deba a 
que, como decía Grim Natwick, "las curvas son hermosas a la vista". O tal vez, sea algo 
creativamente lúdico. 
¡Una vez, trabajé con un animador polaco que marcaba con círculos cada uno de sus dibujos! 
"¡Es animación, hombre! ¡Círculo, círculo, círculo!" 
Habrán notado que hasta ahora no marqué ningún extremo con un círculo. En este método de 
trabajo claro y conciso, desarrollado en los años 40, los extremos no llevan círculos, aunque las 
claves sí. Los dibujos cuyo número está rodeado por un círculo son las "Claves" (Keys). 
Pregunta: ¿Qué es una clave? 
Respuesta: El dibujo que cuenta la historia, el o los dibujos que describen qué sucede en el plano. 
Si un hombre ve o escucha algo que lo hace feliz, necesitaremos tan sólo dos posiciones para 
contar la historia. 
Éstas son las claves, y las encerramos en un círculo. 
Éstos son los primeros dibujos que hacemos. Cómo haremos que el proceso de ir de un dibujo a 
otro sea interesante, es el tema que trata el resto del presente libro. 
Tomemos un ejemplo más complejo... digamos que un hombre camina hacia una pizarra, levanta 
del suelo un trozo de tiza y con ella, escribe algo en la pizarra. 
Si fuese una tira cómica o si quisiéramos mostrar lo que sucede en un Storyboard, precisaríamos 
sólo tres posiciones. Lo mantendremos simple, usando figuras con palotes para no perdernos en 
detalles. Estas tres posiciones pasan a ser nuestras claves, y las encerramos en un círculo. 
Las claves cuentan la historia, todos los demás dibujos que darán vida a la escena son los 
extremos (sin círculo): el pie "contacta", los medios o Breakdowns, y los intermedios. 
4 SEGUNDOS 4 
Si medimos esta acción con un cronómetro, podríamos llegar a ver que al comienzo nuestra 
primera posición clave será el dibujo 1. Digamos que le lleva cuatro segundos caminar hasta la 
tiza y tomar contacto con ella, entonces encerramos al segundo dibujo en un círculo con el 
número 96. Y cuando nuevamente se enderece, se haya desplazado y escriba algo en la pizarra, 
eso podría llevarle otros cuatro segundos. Entonces, nuestra tercera clave podría ser el último 
dibujo en el plano, el 192. El plano completo necesitaría entonces ocho segundos. 
Por supuesto que no necesitamos primero medirlo todo, pero antes de sumergirnos en 
Animadorlandia con todo eso, debemos establecer claramente por medio de nuestras claves qué 
es lo que vamos a hacer, y podemos probar nuestros tres dibujos en cine, video o computador. 
Todavía no nos ocupamos de cómo se mueve el personaje, si es viejo o joven, gordo o flaco, alto 
o bajo, preocupado o feliz, lindo o feo, rico o pobre, precavido o confiado, académico o sin 
educación, rápido o lento, reprimido o desinhibido, cojo o en forma, calmo o desesperado, vago o 
energético, decrépito o temblando de parálisis, ebrio o asustado, si es un villano sin corazón o 
una persona simpática. En otras palabras, toda la actuación más todos sus adornos, ropa, 
expresiones faciales, etc. 
 Clave Clave Clave
MÁS BREAKDOWNS E INTERMEDIOS 
Lo que hemos hecho es mostrar claramente lo que sucede en el plano, antes de comenzar. 
Si hiciéramos un diagrama de la escena, se vería como en la escala de arriba. 
A los animadores importantes se los llama "Animadores Clave" (Key Animators), y se corrió la voz 
de que sólo dibujan las claves, que todo lo que dibujan es una clave y que hay esclavos que 
meten el resto, de acuerdo a las escalitas que les proveen los Key Animators... falso. Un "key 
animator" es simplemente como un ejecutivo, uno importante. Muchos buenos animadores llaman 
"clave" a sus extremos, yo también lo hacia. Pero la vida se torna más clara y simple si uno 
separa las claves de los extremos. En verdad, nunca oí a Ken Harris llamar clave a un dibujo, pero 
si lo escuché decir: "Dibuja primero eso, ése es un dibujo importante". Y realmente, se trataba de 
una clave. 
Trabajé con todos los sistemas, buenos, malos y a medio hornear, y la experiencia me ha 
convencido que es mejor (incluso crucial). separar las claves que cuentan la historia de los 
extremos y de todo el resto (por supuesto, en nuestro ejemplo anterior las tres claves también 
funcionarán como extremos). Separar estos elementos ayuda a no enredarnos y perder el punto 
de la escena, a medida que nos aventuramos entre un horizonte de dibujos y posiciones.

---

## Sección 12: Core Concepts & Foundations [Entropy: 0.5]

Puede haber varias claves en una escena, o quizás tan sólo una o dos, depende de la acción y su 
duración. Se trata de lo que sea necesario poner, para que lo que suceda en la escena sea 
entendible. Se puede pasar un buen tiempo trabajando estas claves. Recuerdo una vez haber 
visitado a Frank Thomas, que en ese momento dibujaba un gato. "Maldición", dijo. "He estado 
trabajando todo el día en este maldito dibujo, tratando de darle la expresión correcta". 
(EL GATO ERA 
ALGO ASÍ)
Me impresionó... ¡todo el santo día, vaya! Era la primera vez que veía a alguien trabajar tanto 
sobre un único dibujo. ¿Cómo lograría terminar el plano? Finalmente caí del cielo: "Por supuesto 
estúpido, es su clave... ¡es lo mas importante del plano, tiene que lograr un buen dibujo!" 
¡Me dió ánimos ver a un grande luchando por conseguir eso! 
3 MODOS DE ANIMAR 
1. El modo natural, llamado HACIA ADELANTE
Se comienza a dibujar y se ve qué sucede, como un niño dibujando en los ángulos de las páginas 
de un cuaderno escolar, agregando los números al final. 
El Director y Animador del estudio Disney, Woolie Reitherman, dijo: 
"Cuando no sabía qué estaba haciendo en una acción, siempre iba hacia adelante. Comenzaba en 
unos, la mitad del tiempo no tenía idea de lo que estaba haciendo. Para mí es divertido, puedo 
encontrar algo en el camino que no encontraría trabajando de otro modo". 
 
VENTAJAS
- SE CONSIGUE UNA FLUIDEZ NATURAL, 
DE ACCIÓN ESPONTANEA. 
- TIENE LA VITALIDAD DE LA 
IMPROVISACIÓN. 
- ES MUY "CREATIVO", UNO VA CON LA 
CORRIENTE TOMANDO TODA LA 
ACCIÓN A MEDIDA QUE VA 
SURGIENDO. 
-A MENUDO, EL INCONSCIENTE ENTRA 
EN JUEGO, COMO A LOS AUTORES QUE 
AFIRMAN QUE SUS PERSONAJES LES 
DICEN QUÉ VA A SUCEDER. 
- PUEDE PRODUCIR SORPRESAS... 
"MAGIA". 
DESVENTAJAS
- LA ACCIÓN SE TORNA ERRÁTICA.
- EL TIEMPO SE DILATA, Y EL PLANO 
SE HACE CADA VEZ MÁS LARGO. 
- LOS PERSONAJES CRECEN Y SE 
ENCOGEN. 
- SE PUEDE TENDER A PERDER DE 
VISTA EL PLANTEAMIENTO DEL 
PLANO, Y NO LLEGAR AL LUGAR 
INDICADO A TIEMPO. 
- EL DIRECTOR NOS ODIA, AL NO 
PODER VER QUÉ SUCEDE EN EL 
PLANO. 
- EL LÍO RESULTA ARDUO DE PASAR 
A LIMPIO, Y DIFÍCIL DE ASISTIR. 
- ES CARO... EL PRODUCTOR NOS 
ODIA. 
- PUEDE SER MALO PARA LOS 
NERVIOS. 
- RIESGO DE LOCURA ARTÍSTICA Y 
ATAQUES DE NERVIOS MIENTRAS 
NOS DEBATIMOS EN EL VACIO. 
- EN ESPECIAL, CUANDO LA FECHA 
DE ENTREGA ES INMINENTE. 
2. La forma planificada, llamada POSE A POSE
Primero decidimos cuáles son los dibujos más importantes, aquellos que cuentan la historia, las 
claves, y los incluimos. Luego, decidimos cuáles serán las posiciones siguientes en importancia 
que deben ser parte de la escena. Estos son los extremos que incluiremos, sumados a cualquier 
otra pose importante. Luego, resolveremos cómo ir de una pose a otra, buscando la mejor 
transición entre dos poses. Éstos son los quiebros (Breakdowns) o posiciones de paso. Entonces, 
podremos componer clínicamente escalas claras de aceleración y desaceleración de una pose a 
otra, y agregar cualquier toque final o indicaciones para el asistente. 
Para ilustrar cuán efectivo es el método pose a pose, el Director de Diseño del estudio Disney, 
Ken Anderson, me contó que cuando hacia dibujos para layout de personajes destinados a 
animadores que trabajaban en Blancanieves y los Siete Enanitos, solía dibujar en cada plano 
muchísimas poses clave para Grumpy. Los dibujos de Ken iban a parar a manos de alguno de los 
animadores de Grumpy. Ken se percató más tarde de que el animador sólo agregaba las escalas 
en los dibujos, los entregaba a sus asistentes y se iba a almorzar, llevándose así todo el crédito 
por aquello que en realidad, era la fina labor de Ken. 
 
VENTAJAS
- CONSEGUIMOS CLARIDAD. 
- EL PUNTO CENTRAL DE LA ESCENA
ES CLARO Y AGRADABLE. 
- LA ESCENA ESTÁ ESTRUCTURADA, 
CALCULADA Y EXISTE LÓGICA. 
- PODEMOS HACER DIBUJOS 
AGRADABLES Y POSICIONES CLARAS. 
- TODO ESTÁ EN ORDEN: SUCEDE LO 
QUE DEBE SUCEDER EN EL MOMENTO 
Y LUGAR JUSTO Y DE ACUERDO AL 
PIETAJE DISPONIBLE. 
- EL DIRECTOR NOS AMA. 
- ES FÁCIL DE ASISTIR. 
- ES UN MODO RÁPIDO DE TRABAJO, 
Y NOS LIBERA PARA RENDIR MÁS. 
- EL PRODUCTOR NOS AMA. 
- NOS MANTENEMOS SALUDABLES Y 
SIN LOS PELOS DE PUNTA. 
- GANAMOS MÁS DINERO, MIENTRAS
NOS CONSIDERAN GENTE 
RESPONSABLE Y NO ARTISTAS LOCOS. 
- LOS PRODUCTORES DEBEN ENTREGAR
A TIEMPO Y EN PRESUPUESTO, POR LO 
QUE AL GENIO NO SE LO RECOMPENSA 
TANTO COMO AL CONFIABLE. HABLO 
POR EXPERIENCIA DESDE AMBOS 
LADOS DE LA CALLE, NO NOS PAGAN 
POR "MAGIA". 
DESVENTAJAS
- PERO, Y SE TRATA DE UN GRAN 
PERO, PERDEMOS LA NOCIÓN DE 
FLUIDEZ EN LA ACCIÓN. 
- LA ACCIÓN PUEDE RESULTAR
ENTRECORTADA, POCO NATURAL. 
- SI CORREGIMOS ESO AGREGANDO 
CANTIDAD DE OVERLAPPING ACTION,
PODEMOS ACABAR LOGRANDO 
EXACTAMENTE LO CONTRARIO, 
TORNANDO LA ACCIÓN GOMOSA Y 
BLANDA, IGUALMENTE ANTINATURAL.
- PUEDE SER DEMASIADO LITERAL, 
UN TANTO FRÍA Y SIN SORPRESAS. 
- ¿DÓNDE ESTÁ LA MAGIA? 
Por consiguiente, es bastante obvio que la mejor forma es... 
3 LA COMBINACIÓN ENTRE EL "HACIA ADELANTE" Y EL "POSE A POSE"
Primero planeamos lo que vamos a hacer en pequeños bocetos (es una buena idea hacer esto 
también en los demás métodos) 
Luego hacemos los dibujos a tamaño normal, aquellos dibujos que cuentan nuestra historia. 
Entonces, agregamos cualquier otro dibujo importante que deba ser parte de nuestra escena, ya 
sean anticipaciones o puntos en que manos o pies entren en contacto con objetos -extremos-. Ya 
tenemos la estructura, del mismo modo que con el método pose a pose. 
Pero ahora, usaremos esas importantes claves y extremos a modo de guía, para cosas y lugares 
hacia los cuales nos movemos. Luego de hacer este esquema general, revíselo haciendo una cosa 
por vez. Trabajaremos hacia adelante sobre estos dibujos guía, improvisando libremente a medida 
que avancemos. 
Haremos varios pases "hacia adelante" sobre diferentes partes, tomando primero lo más 
importante. Tal vez tengamos que cambiar y revisar parte de las claves y extremos al avanzar, 
borrando y reemplazándolas. 
Entonces... hacemos un repaso "hacia adelante", ocupándonos de lo primario. 
Luego, nos ocupamos de lo secundario, trabajando también "hacia adelante". 
Más tarde haremos un repaso "hacia adelante" de los demás elementos, luego otro y así 
sucesivamente. 
Luego, y en último término, agregamos el cabello, rabo, ropaje, o bien las partes que ondean 
acompañando la trayectoria del movimiento en el personaje.

---

## Sección 13: Core Concepts & Foundations [Entropy: 0.31]

VENTAJAS
- TRABAJAR DE ESTE MODO COMBINA 
LA PLANIFICACIÓN ESTRUCTURADA DEL
TRABAJO POSE A POSE CON LA FLUIDEZ
NATURAL DEL ENFOQUE "HACIA 
ADELANTE". 
- ES UN EQUILIBRIO ENTRE 
PLANIFICACIÓN Y ESPONTANEIDAD. 
- ES UN EQUILIBRIO ENTRE SANGRE 
FRÍA Y PASIÓN.
DESVENTAJAS
- NINGUNA QUE ME CONSTE... 
Vamos a retomar a nuestro hombre de la pizarra. 
¿Qué haré primero? 
Respuesta: Las claves, los dibujos que cuentan la historia o las posiciones que deben estar allí
para mostrar lo que está pasando. Pónlo donde se pueda ver.. y leer la acción.
claves
claves
¿Qué es lo siguiente? 
Respuesta: Cualquier otro dibujo que deba estar en la toma. Obviamente, nuestro hombre deberá 
dar unos pasos hasta llegar a la tiza, entonces dibujaremos las posiciones de aquellos pasos en 
que los pies están justo en el suelo. 
Son todavía dibujos sin peso, el talón solo está ligeramente apoyado al igual que los dedos, 
rozando ligeramente la tiza y aún sin cerrarse. 
Si realizamos esta acción, podremos razonar que toma unos cinco pasos llegar a la tiza y 
agacharse hasta el suelo. Me doy cuenta que, de probarlo yo mismo, automáticamente se alza la 
pernera izquierda de mi pantalón para luego apoyar la mano sobre la rodilla, antes que mi otra 
mano toque la tiza. Yo haría un dibujo del punto cuando la mano toca la pierna, justo antes de 
que ascienda el pantalón. 
Éstos serán nuestros extremos. Estamos trabajando lo principal, haciendo bocetos muy básicos, 
aunque probablemente hagamos dibujos bastante más descriptivos para las claves (no lo hice 
aquí, porque trato de mostrarlo en forma simple). 
Extremo 
Extremo Extremo Extremo Extremo
Extremo 
Contacto
Puede 
ver la 
tiza 
aquí
 Clave
Contacto
Contacto
Contacto
Contacto
 Clave
 Clave
Extremo
Seguidamente, podemos realizar la acción nuevamente y tomar nota del timing de los pasos para 
numerar los extremos (Breakdowns), aunque también podemos dejarlo para más tarde. 
Probablemente, yo lo haría en este momento para así visualizarlo y ver como funciona el "tempo" 
a medida que estrechamos los pasos, e ir realizando correcciones. 
¿Qué más? 
Bueno, pues vayamos desmenuzando aún más la acción en nuevas posiciones intermedias o 
Breakdowns. Todavía no lo vamos a hacer bonito, eso llegará más tarde en el libro. Por ahora, tan 
sólo plasmaremos la cabeza y el movimiento del cuerpo a través de los pasos, tal como sería un 
paseo o andar normal. 
Posición de pase 
o Breakdowns
A esta altura, probablemente ya estemos numerando nuestros dibujos y tengamos unos 3 o 4 por 
segundo. Ahora, es el momento de ir visualizando la animación para observar cómo va de tiempo, 
e ir añadiendo las modificaciones necesarias. Y si el Director desea ver nuestro trabajo, que al 
menos aparezca como animado. 
Ahora, seguiremos adelante en nuestro trabajo con la guía de extremos o Breakdowns que hemos 
determinado. Ya sea por entero o una parte, lo tomaremos uno a uno para llevarlo a un desarrollo 
más completo. 
 
Separar la marcha de la cabeza
Separar la marcha de los pies 
Separar la 
marcha en 
la escritura
Separar 
la marcha 
de los 
brazos 
Sea que el personaje hable, masculle o sólo murmure, o bien tambalee la cabeza ligeramente, sea 
lo que sea lo tomaremos como a un nuevo trabajo y lo desarrollaremos. 
Haremos lo mismo con manos y brazos. Tanto si oscilan en torno al cuerpo, como si casi no se 
mueven. Puede que tire de los pantalones a medida que se mueve, retuerza o estire sus dedos 
nerviosamente, o los nudillos. Ya en este punto, tenemos toda la libertad de borrar el brazo 
entero y rehacerlo a la medida de la acción que queremos reflejar, ralentizar el movimiento de la 
cabeza o alzarla antes para mirar a la pizarra. 
Podemos hacer muchas cosas interesantes con las piernas y los pies, pero por ahora sólo 
queremos que se muevan suavemente.... estoy esquivando el problema del peso en esta etapa, 
porque el movimiento ascendente y descendente de la cabeza que tenemos de momento ya es 
adecuado ahora, y al menos la figura no flota por la escena como un fantasma... 
El momento de escribir en la pizarra también lo trataremos aparte. Si tiene cabello largo, corto o 
lleva coleta también lo trabajaremos, así como su ropa, pantalón, etc. 
Muestro todo esto en distintos colores para ser lo más claro posible. En mi propio trabajo utilizo a 
veces esta técnica para separar, luego lo junto todo pasándolo finalmente a negro. Me complació 
descubrir que el gran Bill Tytla a menudo hacía lo mismo. 
Recapitulando: 
Habiendo establecido las claves (Keys), pasamos a los extremos y luego a los puntos de paso 
(Breakdowns). Luego de tener lo principal seguiremos con lo demás, elemento por elemento. 
Primero, lo más importante. 
Luego lo segundo. 
Después, lo tercero. 
Luego... lo cuarto, etc. 
Después se añaden los detalles... ropa, cabello, peso, pecho, coletas, etc. 
El principio general es: 
Se plasma la acción principal, para ir añadiendo lo complementario. Haz una única cosa a la vez 
(conviene ir verificando el efecto a medida que avanzas). Luego, júntalo todo y pule los detalles. 
Deja muy en claro las instrucciones para tus asistentes, o hazlo tú mismo. 
Es algo así: 
Obviamente, puedes trabajar como quieras... no hay reglas, sólo métodos. Puedes ignorar todo 
esto y disponerte a trabajar directamente en cada plano. O bien puedes empezar de una forma, 
para luego cambiar... ¿por qué no? 
Pero... ¿por qué reinventar la rueda? Mucha gente ya está ocupada trabajando en eso una y otra 
vez. Por otro lado... ¿por qué preocuparnos de eso? 
Este método de trabajo fue desarrollado por verdaderos genios, luego de mucho trabajo y 
tropiezos a prueba y error, representando una base maravillosa sobre la que empezar. Después 
de probar todos los métodos posibles, incluido el antisistema, creo que éste es el mejor de lejos. 
Deja que te invada, y te liberará... ¡usa ésta técnica para olvidarte de la técnica! 
Milt Kahl trabajó en esta forma. Casi al final de sus días, una vez le dije... "Ahora que estuve 
trabajando con tu sistema me doy cuenta que, aparte de tu talento, cerebro y habilidad, el 
cincuenta por ciento de tu excelencia en el trabajo proviene de tu método de trabajo: la forma en 
que lo enfocas y la forma en que lo abordas". 
"Bueno...", contestó pensativo, "Es cierto... hey, ¡te has vuelto inteligente!". Milt me decía a 
menudo que para el momento en que había dibujado todo en esta forma, ya había conseguido 
mucho de una bonita animación, incluida la sincronización labial. Luego, finalizaba asignando 
números a los dibujos, añadiendo cuatro cosas más y dibujando pequeñas notas casi clínicas para 
su asistente. Proclamaba que nunca había tenido que animar nada, porque terminada la fase de 
dibujo de todo lo importante, ya estaba animado. El trabajo estaba hecho. 
Les confío mi caso. 
PROBANDO, PROBANDO, PROBANDO 
Siempre utilizo el video para probar mi material en cada etapa, incluyendo los más primitivos, 
verifico el tempo y los movimientos. En los años 70 y 80, Art Babbitt solía volverme loco con eso: 
"¡Dios Santo, estás usando el video como si fuese una muleta!". "Sí", le respondí... "¿Pero no es 
verdad que Disney instituyó las pruebas de lápiz, y eso fue lo que cambió y desarrolló la 
animación? ¿Y no estás tú siempre diciendo que las pruebas son nuestros verdaderos ensayos?". 
Gruñido afirmativo. 
"¿Y cuál es la diferencia entre pedir una prueba al camarógrafo al final de la jornada, cuando está 
deseando irse a su casa, esperar al día siguiente a que el laboratorio envíe el film, y a media 
mañana interrumpir al editor, que estará ocupado seguramente en otras cosas, y finalmente 
visualizar la prueba, cuando hoy día podemos usar el video y prepararlo todo en diez minutos?".

---

## Sección 14: Core Concepts & Foundations [Entropy: 0.536]

Art se dió media vuelta... "No soy un Luddista". (Obreros de las manifestaciones anti-industriales 
del siglo XIX). 
Cuando Ken Harris tenía que animar un personaje andando, lo primero que hacía era esbozar un 
ciclo rápido para probar y pasar los dibujos al negativo, revelarlo y aún húmedo, armar un loop
para pasarlo en la moviola. 
"He hecho centenares de personajes andando", decía Ken, "de todas clases, pero aún quiero 
hacer la prueba del movimiento básico, antes de empezar a construirlo". 
Bill Tytla decía, "Si haces una pieza de animación y la visualizas una y otra vez el tiempo 
suficiente, debieras ser capaz de ver lo que falla en ella". 
Yo, de hecho, opino que el video y el ordenador han salvado a la animación. 
Muy probablemente, el éxito de "¿Quién engañó a Roger Rabbit?" contribuyó substancialmente al 
renacimiento de la animación, y el hecho de tener video fue un avance crucial para nosotros. 
Disponíamos de gente con mucho talento, pero joven e inexperta, y con un puñado de Jefes de 
Animación les decíamos, "Quita ese plano, cambia este otro, y añade alguno más aquí", etc. Esto 
nos permitía seguir mejorando todo a medida que avanzábamos, y dar en el blanco de forma 
colectiva. 
Milt decía que nunca se molestó en mirar sus pruebas. "Demonios, sé lo que voy a ver... ¡lo he 
hecho yo!". Él aguardaba por ver varias de ellas juntas en secuencia, y sólo para apreciar el 
aspecto global. 
Pero ésa era su particular manera... nunca alcancé tal nivel, ni es probable que lo alcance. Yo lo 
pruebo todo a medida que avanzo, y a mí me resulta de ayuda. Estamos construyendo toda una 
gran actuación plano a plano, así que... ¿por qué no ir probando estructura, fundamento y 
decorados a medida que los hacemos? Y ya que éste método nos revela los errores (los errores 
son muy importantes, porque aprendemos de ellos) podemos ir ya aplicando las necesarias 
correcciones y mejoras. 
Evidentemente, a este nivel no tendría problemas en realizar mi trabajo sin hacer pruebas, pero... 
¿Por qué iba a hacerlo? 
El video y el ordenador están ahí, utilicémoslos. 
Un interesante fenómeno que he detectado es que, a medida que un animador se hace mayor, su 
percepción del tiempo se alarga. Se mueve más lento y tiende a animar, en consecuencia, más 
lentamente. Los jóvenes, van que vuelan. Así que el video sirve para corregirnos a los viejos osos, 
y también a los jovencitos cuando lo hacen demasiado rápido. 
Antes de que profundicemos en paseos y en todo el asunto de la articulación, debemos saber que 
existen técnicas de cámara también importantes. 
La hoja de exposición 
En la página siguiente tenemos una "clásica" hoja de exposición llamada "Hoja-X" o "Dope sheet", 
cuya vista alejaría del negocio a cualquier principiante. Cuando era niño y vi por primera vez una 
hoja de éstas, pensé... "¡Oh, no... no quiero ser nunca más ser animador! Haré los diseños, y que 
otra gente haga que se muevan". 
De hecho, es muy sencilla cuando puedes hacer amigos con ella. 
La hoja de exposición es para los animadores una simple y eficiente forma de escribir la acción y 
el diálogo (o tiempos musicales) de una toma, más la información requerida para filmarla. 
Cada línea horizontal representa un fotograma de la película. 
Las columnas 1 a 5 muestran cinco celdas con diferentes niveles de animación (normalmente, 
sólo usaremos una o dos). 
- La columna de ACCIÓN, es 
para describir el timing, el 
tiempo que deseamos 
que ocupe la acción. 
- La columna DIÁLOGO, es 
para la medición de tomas 
sonoras sobre la 
descomposición de 
la música en tiempos. 
- La hoja de exposición clásica, 
está diseñada para plasmar 
cuatro segundos de acción 
(1 segundo = 24 fotogramas). 
- Tiene líneas más gruesas 
para mostrar el metraje, que 
es de seis pies (un metro y 
medio, aproximadamente). 
Muchos animadores numeran 
el metraje a lo largo de la 
página. 
- He apuntado también los 
números de cámara, los 
números de cada fotograma 
en la columna. 
- Algunos animadores 
miden por segundos, 
otros lo hacen en longitud 
(un pie = 2/3 de segundo). 
- Ken Harris pensaba en pies, 
y sacaba punta al lápiz al 
final de cada uno. Yo pienso 
en pies y segundos, pero 
el tiempo me resulta más 
fácil. 
- También es útil pensar 
en medios segundos, que 
son 12 fotogramas del tiempo 
de una persona a pie normal, 
lo cual es bastante fácil. 
- (Animadores por ordenador, 
por favor reconózcanlo aquí, 
cada uno tiene su propio 
sistema de tiempo). 
- Planearemos la acción en la 
columna "ACCIÓN". 
- Ken Harris siempre decía, "¡Vamos,
ya disfrutarán luego con los dibujos, 
así que hagan lo importante 
primero... mídanle los tiempos a 
todo". 
- Solíamos usar un metrónomo o un 
cronómetro para ensayar varias 
veces la escena, y anotábamos esos 
tiempos en la hoja . 
- Tomemos a nuestro hombre 
dirigiéndose a la tiza: 
- Tenemos al hombre a unos cinco 
pasos de tomar la tiza. 
- Cuando ensayamos, vemos que los 
dos primeros pasos son de 
aproximadamente 16 fotogramas 
(2/3 de segundo). 
- Durante el tercer paso ve la tiza, y 
su paso se acelera ligeramente, a 14 
fotogramas. 
- Su cuarto paso es aún más rápido, 
12 fotogramas. 
- En el paso cinco se frena algo, 14 
fotograma, y empieza a inclinarse 
hacia abajo, lo cual se extenderá 
unos 2 pies hasta que llegue a tocar 
la tiza. 
- Lo tengo ahora alzando la pernera 
del pantalón por encima de la rodilla 
mientras desciende, que tomará 8 o 
10 fotogramas. 
- Por supuesto, podemos cambiar 
todo lo dicho a medida que 
trabajamos, pero esta hoja contiene 
los puntos a tener en cuenta en el 
trabajo, y deviene en nuestra guía a 
medida que avancemos. 
- Ahora, podemos apuntar los 
números de los dibujos, tal como lo 
hice aquí. 
- Ocasionalmente, aunque los 
números 1 y 96 son claves y les 
hemos agregado un círculo, no los 
destacaremos en la Hoja de 
exposiciones. 
Las cinco celdas numeradas disponibles en la hoja sirven para tratar elementos o personajes de 
forma separada. 
¿Por qué cinco niveles? ¿Por qué no anotar todo en uno? 
Respuesta: Se puede hacer, pero... ¿qué pasa si quieres cambiar el tiempo de una o dos partes 
de la acción, y dejar las demás igual? Aún así, y por razones de simplicidad, es una buena idea 
tratar de mantenerse sólo a uno o dos niveles. 
Si vamos a utilizar los cinco niveles, empezaremos por la acción principal en el nivel uno. 
Supongamos que un hombre camina desde un lado de la pantalla, y un gato lo hace desde el otro 
extremo. Animaremos a nuestro hombre actor en la columna 1 y al gato en la 2, añadiendo una 
"G" después: 1-G, 2-G, 3-G, etc, para no confundirnos con el hombre. Este, como actor-acción 
principal, no necesita letra para identificarlo. 
Si una mujer pasa por delante de ellos, la pondremos en el nivel 3, añadiendo "M" después de sus 
números. 
Si un camión se para enfrente, usaremos el nivel 4, y añadiremos una "C". 
Y si resulta que además está lloviendo, añadiremos la lluvia en el 5, con una "L" detrás. 
La Hoja de exposición se parecería a algo así: 
 Lluvia Camión Mujer Gato Hombre 
Este sistema, evidentemente, permite al cámara ajustar la escena correctamente (trabajando 
desde lo principal al detalle) y fotografiar un fotograma con todos los niveles ajustados al número 
de diálogo de su cámara. 
Hay un punto importante aquí: 
¿Tú eres miembro de K.I.S.S*? 
*Keep It Simple, Stupid! (Hazlo simple, estúpido!)
¡Usa secuencias numéricas simples! 
La animación es lo bastante complicada como para hacerla aún peor. 
Mis años en Inglaterra me enseñaron que los ingleses aman la complejidad. Un amigo muy 
brillante, que es un matemático de primera fila en Oxford, me llamó y me dijo: "Vamos a ir a 
penetrar tu principado". Le dije... "Quieres decir que vendrás a visitarnos?", "Efectivamente", 
"Wow", le respondí". Usaste nueve sílabas para decir lo que un americano diría en tres... vi-sita!".

---

## Sección 15: Core Concepts & Foundations [Entropy: 0.25]

Seguramente nosotros usábamos pe-ne-trar-nues-tro-prin-ci-pa-do con nuestras Hojas de 
Exposición (Exposure Sheets), hasta que Ken Harris se unió al grupo. 
Éstas se veían algo así: 
OVERLAY
PARABRISAS
DEL AUTOMÓVIL
CRIA 
DE 
YAK
YAK
CORRIENDO
CAMIÓN
Y CEBRA
¿Pueden imaginarse tratar de hacer algún cambio o mejora, cuando resultas abrumado por 
números como éstos? Sería como renumerar la Enciclopedia Británica. 
No sólo nuestros números eran complicados, además nuestras acciones iban desde los 2 
fotogramas hasta 3 fotogramas, luego a 4 fotogramas, se mantenía saltando para volver luego a 
2 fotogramas, etc., dando como resultado un tironeo de arranque y frenado a los movimientos. 
Cuando sólo teníamos un único nivel de acción (digamos un tigre) todos numeraban los dibujos 
T1-1 y T1-2 y T1-3, etc. Un día pregunté: "¿Por qué lo hacemos así?". La respuesta del jefe del 
departamento fue, "Así sabremos que es un tigre". "¡Pero podemos ver que es un tigre! ¿Por qué 
simplemente no los numeramos 1, 2 y 3?". Respuesta: "Eso confundiría al departamento de 
pintura".
¡Y no sólo los ingleses pueden ser complicados! Una vez vi la hoja de trabajo de un animador 
americano que escribió dos libros sobre el tema, y sus números se veían así: 
Todo manchado, 
y borroneado y 
re-escrito...
Llega la claridad...
Y entonces, el primer animador maestro llegó a trabajar 
con nosotros. En su primer día Ken Harris escribió 
claramente números simples a lo largo de la página en 
"doses", así, dos exposiciones por cada dibujo. Ésa fue la 
primera vez que yo había visto a alguien que fuera a 
través de la página en doses. 
Ken usualmente planifica sus acciones en doses: doce 
dibujos por segundo, fotografiando cada dibujo dos veces, 
en vez de trabajar en "unos", una exposición por cada 
dibujo, lo que significa 24 dibujos por segundo... el doble 
de trabajo. 
Ken venía de Warner Brothers, acostumbrados a 
presupuestos apretados; los animadores tenían que 
producir un total de 30 pies (20 segundos) en una 
semana, o eran despedidos. 
Dado que las acciones más normales se ven bien en 
doses, los animadores de Warner trataban de evitar 
poner acciones en unos. 
Cuando él necesitaba ir en unos para acciones rápidas 
(carreras, etc.) las numeraba en unos. 
 Luego, él volvía a doses. 
Ok, Ken... pero, ¿qué haces cuando has 
trabajado todo en doses, pero descubres 
que tienes que agregar algunos más 
para lograr una mayor fluidez? 
Respuesta: “Agregas dibujos "A". 
Genial, entonces ahora todas estas 
cosas del TXL-1 y PP-2 3/4 quedan 
fuera. Ya no somos abrumados por 
toda esa tecnología sin significado. 
Se vuelve simple para trabajar, fácil 
para hacer cambios y mejoras y 
comenzamos a conseguir mejoras. 
¡Pero aún hay un sistema mejor y 
más simple! 
EL MEJOR SISTEMA DE NUMERACIÓN 
Milt Kahl lo llama su sistema, pero sospecho que todos los buenos 
muchachos de Disney lo descubrieron al mismo tiempo, es algo 
lógico. 
Se trata de usar los números de registro de la cámara para los 
dibujos. Marcar a lo largo de la página en doses, pero usando 
números impares. 
Entonces, si necesitamos agilizar algo o acelerar alguna acción, 
sólo agregamos los unos. 
Milt me dijo, "Cada vez que veo mis dibujos con números impares 
en ellos, sé que estoy en doses, y cuando veo números pares, sé 
que estoy en unos". 
Le pregunté... "¿Qué haces cuando quieres hacer un congelado, 
sólo indicas que congelas ese dibujo con una línea? Y cuando sales,
¿comienzas de nuevo con el número del registro?" 
Respuesta: "Sí, regreso al número del registro". 
Esto no sólo lo hace fácil para el fotografiado, además es más 
simple cuando necesitas diferentes niveles de acción. Ahora, 
tenemos horizontalmente los mismos números de registro a 
través de los cuadros del film.
NÚMEROS 
DE REGISTRO 
DE LA CÁMARA
Así vas a lo largo de la página con números impares (en doses) y saltas a unos 
cuando los necesitas. 
Es más simple, y te libera para concentrarte en tu trabajo. 
¡Muchacho... mejoró mi cantidad y calidad! 
Hay un par de cosas más para mencionar antes de que empecemos con la gran 
discusión de unos contra doses. 
Hay una cosa importante que aprendí de Ken Harris. 
Se que puede sonar loco (pero si tienes una serie de dibujos "B"), 
no pongas la "B" delante del número. 
Coloca la "B" detrás del número.
Queremos pensar lo más simple que podamos. Ken dijo, "Mira, tú no me llamas Señor Ken...
coloca la letra detrás del número, así sólo pensarás en los números." Coloca cualquier formalidad,
o lo que sea, detrás. Puede parecer insano, pero te ayuda a trabajar más... inténtalo. Todo lo que
realmente estamos haciendo es pensar una serie de números del 1 al 10. Cualquier cosa para
mantenerlo simple. Nadie podía explicar cómo este hombre viejo y enfermo podía producir tanto
trabajo, y de tan alta calidad. Él mantenía las cosas tan simples como podían ser. 
Dos cosas más:
El único momento en que debes marcar un círculo en la Hoja de
Exposición (X-Sheet) es cuando un ciclo de acción reinicia,
cuando estamos repitiendo el mismo conjunto de dibujos.
Hacemos un círculo en el dibujo (1) para avisar al camarógrafo
que se sale de secuencia con los números normales del registro
de la cámara. 
Luego hacemos un círculo en el dibujo en el número correcto del
registro cuando se regresa a la secuencia normal. 
Mi regla es: la única vez que se pone una letra delante de un
número es cuando tienes un acetato sobrepuesto de algo
enfrente de los personajes. 
Entonces colocas O-1 (para el acetato sobrepuesto) (Overlay-1) o
para un acetato congelado (el pie quieto de alguien, por ejemplo)
y lo llamas H-1 (Held-1) 
 PIE 
CONGELADO
 MESA 
SOBREPUESTA
ACCIÓN
La Gran Batalla de Unos y Doses 
Algunas personas siempre complican la numeración llamándo a los unos y doses, "simples" y 
"dobles". De hecho "simples" es un término de los 40 para los intermedios, cuando el animador 
hacia los dibujos 1, 3 y 5, hacía una tabla uniforme y le decía al asistente "te he dejado los 
simples". 
Simples entre medios. 
Pero... ¿cuándo usar unos y cuándo usar doses? 
La regla es usar doses para acciones normales, y unos para acciones rápidas. Por ejemplo, las 
carreras siempre deben ser en unos, la "actuación" natural en doses. 
Las caminatas funcionan bien en doses, pero se verán mejor en unos. 
Obviamente, la vida es en unos (o a cualquier velocidad que filmemos), pero doses funciona bien 
para la mayoría de las acciones y, por supuesto, representa la mitad de trabajo que si lo 
hiciéramos en unos... ¡y es la mitad de costoso! Trabajar en unos es duplicar el trabajo y sus 
costos a lo largo de toda la línea de producción. 
Aparentemente, a principios de los 30 y a medida que los animadores de Disney se hacían cada 
vez mejores, los costos se disparaban hasta las nubes, y como los doses funcionaban para la 
mayoría de las cosas, ellos intentaron mantenerse en doses cada vez que podían. 
Varios grandes animadores han dicho que los doses son realmente mejores que los unos, que los 
unos dan resultados blandos, acciones rápidas en doses "brillan" y agregando unos disminuye esa 
vitalidad. Bueno... sí, esto es cierto si los unos son sólo tontos intermedios mecánicos. 
Mi experiencia es diferente. He descubierto que si planificas para unos, el resultado es 
generalmente superior que en doses. 
Pienso que doses es la respuesta económica a una pregunta artística. Siendo doses la mitad del 
trabajo, todo el mundo regresa a su casa a tiempo, y... ¿qué caso tiene hacerlo en unos? 
Demonios, yo era propietario de un estudio...

---

## Sección 16: Core Concepts & Foundations [Entropy: 0.25]

Cuando estaba re-aprendiendo todas estas cosas, esperé hasta que mi animación en unos fuera 
entintada y coloreada, entonces la fotografié en unos como estaba planeada y luego quité cada 
dos acetatos y fotografié el resto en doses para ver si "brillaba" y era mejor. 
En todos los casos, excepto uno, en unos funcionaba mejor. La vez que los doses funcionaron 
mejor fue cuando tenía una vieja señora sacando el estetoscopio de un doctor de su bolsillo. Los 
unos producían un movimiento muy suave. 
Funcionaba muy bien, pero entonces quité cada intermedio pintado y los fotografié en doses... 
¡era mejor en doses! No puedo explicar el porqué, era simplemente mejor. 
Así que ellos están parcialmente en lo correcto, creo. Pero yo me convertí en un adicto de usar 
unos cada vez que puedo, unos parece hecho para ser visto y eso es lo pretendemos. 
Art Babbitt acostumbraba molestarme por usar unos. "¡Eso es muy realista, una de las cosas 
sobre la animación es que no es como la vida!". Pero usualmente, yo le agregaba unos al trabajo 
de Art cuando él no estaba mirando, y resultaba mejor... y a él le gustaba más. 
Los animadores por computadora tienen todo en unos (con intermedios perfectos) y eso no 
disminuye lo atractivo de su trabajo, todo lo contrario. Y doses cansa al ojo después de unos 
minutos. Sé que unos es el doble del trabajo, pero el resultado es tres veces mejor. Hay que 
verlo, es fácil de observar. 
Creo que mi co-animador Neil Boyle lo dijo mejor: 
"Dos funciona, pero en Unos vuela". 
Y Ken Harris, que pasó la mayor parte de su vida trabajando en doses, me dijo cuando yo 
agregue unos en su trabajo, "Oh, siempre es mejor en unos". 
Hay una cosa que siempre me enloqueció. Cuando tienes un personaje animado en doses y la 
cámara está paneando con él en unos obtienes un parpadeo nervioso. ¡Entonces, panea con él en 
doses (no es lo ideal), o agrega simples intermedios para que no parpadee! 
Algunos de los grandes tipos hacen esto, es un misterio para mí... ¿por qué no agregan simples 
intermedios para que no parpadee? Quizás sea debido a que un montón de cosas no aparecen en 
las pruebas de lápiz. Es cuando las cosas están coloreadas que podemos ver estos saltos. 
CONCLUSIÓN: 
Es una combinación de doses y unos. No sólo, sino también. 
Acciones normales en doses, que de todos modos es el mayor volumen de nuestro trabajo. 
Acciones rápidas o muy suaves en unos. 
Paneos normales en doses, paneos extensos en unos. 
LA BATALLA DE LOS REGISTROS SUPERIORES E INFERIORES
Entre los animadores clásicos existe un debate sin fin acerca de registrar los dibujos con 
perforaciones superiores o perforaciones inferiores. En la actualidad, el perforado inferior parece 
ser el ganador; la mayoría de la gente parece estar animando con el registro en la parte inferior 
para sostener sus dibujos. 
Frank Thomas dijo "Dejar de usar el perforado superior y trabajar con el inferior ha hecho avanzar 
el arte de la animación porque puedes pasar los dibujos mientras trabajas y ver que está 
pasando, si la criatura está haciendo lo que quieres". Y eso tiene una tremenda influencia. (Todos 
los animadores de Disney trabajan con perforaciones inferiores) 
Alternativamente, Ken Harris trabajó toda su vida con perforaciones superiores y podía flipar sus
dibujos y ver que pasaba, si la criatura estaba haciendo lo que él quería. (Todos los animadores 
de Warner trabajaban con perforaciones superiores). 
MALDITO 
CAMARÓGRAFO 
PEREZOSO
 PLACA 
DE VIDRIO
Algunas veces, Ken enfurecía y explotaba, "¿Sabes quién empezó con todo esto de las 
perforaciones inferiores? ¡Un maldito camarógrafo perezoso que no quería molestarse en subir 
hasta el tope la placa de vidrio presurizada para colocar los acetatos en la parte superior! ¡Él es el 
culpable de haber empezado con las perforaciones inferiores!". 
Es algo así: 
PASANDO...
Si sólo tienes cuatro dedos, puedes 
pasar cuatro hojas a la vez, 
además el dibujo inferior nos da 
cinco imágenes.
VERSUS 
FLIPEAR
Ken solía colocar una bandita 
elástica alrededor de su registro 
para hacer el flipeo mas fácil 
mientras dibujaba, sin tener que 
sacar los dibujos del registro.
Cuando Ken se calmaba, usaba este ejemplo: 
DIGAMOS QUE TE OFREZCO UN CIGARRO DE UNA CAJA. TE GUSTARÍA QUE TE LOS PRESENTE. 
¿DE ESTA MANERA? 
¿O DE ESTA MANERA?
¿Y cuál es la manera más fácil de dibujar? 
 ¿ASÍ? 
 
 
 ¿O ASÍ? 
Agreguen a esto el hecho de que la mayoría de los discos que los animadores usan están hechos 
de metales pesados con registros de paneo insertados con tornillos para ajustarlos y aflojarlos. Es 
bastante incómodo con todas estas cosas sobresaliendo, y nosotros tenemos inconscientemente 
que esquivar los registros mientras dibujamos. 
 OUCH! 
 
 
 OUCH! OUCH! 
El ingeniero que fabricó la mayoría del equipamiento para mi estudio de Inglaterra colocaba los 
registros de paneo diferentes cada vez. Tuve que despedir una vez a un tipo, y su amigo (que era 
bastante talentoso) renunció con él. Para desquitarse conmigo ellos ordenaron un disco especial 
(para la empresa) con tres registros de paneo para diferentes tamaños de campo, superiores e 
inferiores, seis en total! Cuando los montabas en sus tornillos se veían algo así: 
¿COMO PUEDES DIBUJAR EN ALGO ASÍ?
PODRÍAS TERMINAR EN TERAPIA INTENSIVA.
Pero... ¿qué tan a menudo utilizamos los registros de paneo? No demasiado, en mi experiencia. 
Un día, hace quince años atrás encontré al artista de layout y diseñador Roy Naisbitt, trabajando 
sobre una gran pieza de plástico blanco Perspex (Plexiglass), con un registro pegado encima con 
cinta adhesiva. 
¡Qué solución! 
Pegas el registro donde quieras, arriba o abajo. También, guardo al lado del tablero un disco 
pesado de metal con registros de paneo para cuando muy ocasionalmente debo hacer un paneo 
mecánico. 
También te permite pegar un registro de pernos más altos para colocar más dibujos, si trabajas 
con perforaciones superiores. Los registros con pernos cortos están bien para perforaciones 
inferiores, pero los dibujos suelen caerse al suelo. Otra vez, la bandita elástica ayuda. 
Estoy encantado sabiendo que la solución de Roy se ha desparramado a través de la industria, he 
visto a muchos animadores caminando por Hollywood con sus discos de Perspex y sus registros 
pegados con cinta adhesiva bajo sus brazos. 
Funciona muy bien. Yo animé el primer plano inicial de ¿Quién engaño a Roger Rabbit? en el Hotel 
Welsh, con un disco de Perspex en mis rodillas... ¡y el registro arriba! 
Yo trabajo de las dos maneras. De nuevo, no sólo, sino también. Perforaciones superiores es 
bueno para dibujar y perforaciones inferiores para pasar los dibujos... escoge tu opción. 
Obviamente, los animadores por computadora están liberados de todo este sinsentido táctil, pero 
estoy seguro que tendrán alguna otra cosa equivalente contra la que arreglárselas. Jim 
Richardson, quien se inició como dibujante animador y ahora es un animador por computadora, 
me dijo que la primera vez que se cambió al ordenador, sintió que estaba "animando con un 
microondas". 
MÁS SOBRE ESPACIADO (SPACING) 
Alguien dijo alguna vez, que un animador es algo entre artista y mecánico. Aquí hay más tuercas 
y tornillos que en un garaje... pero muy interesantes, y ayuda el conocerlas. 
Ken Harris me mostró esto: 
Supongamos que tenemos un poste telefónico en un rápido movimiento de perspectiva. 
¿Dónde pondríamos la posición intermedia?
La pondrías por aquí, ¿cierto? 
Error... incluso luego de cincuenta años de experiencia, me equivoco. Y al comienzo, todo 
profesional al que se lo he planteado, se equivocó.

---

## Sección 17: Core Concepts & Foundations [Entropy: 0.25]

Ésta es la posición media: 
Traza las líneas de esta forma, y el punto de intersección nos mostrará el sitio, al menos 
técnicamente. Sólo mantenlo en esta fórmula: 
Esto funciona bien en movimientos rápidos. Sin embargo, en la mayoría de los movimientos 
normales es mejor usar un truco: dividir la diferencia, y volver a medio camino en donde lo 
habíamos supuesto en un principio. Complétalo todo en esta forma y tendrás un mejor resultado. 
Suponer
Aquí 
Técnicamente 
Correcto 
Todos sabemos por
experiencia cómo 
funciona esta 
posición media. 
A propósito, el polvo se queda 
en el mismo lugar, no viaja 
con aquello que lo provoca. 
Se levanta, no sale. 
Lo mismo, aplicado 
desde la vista frontal 
de alguien o algo, 
acercándose 
rápidamente 
hacia nosotros. 
Pongamos un 
disco girando 
hacia nosotros.
Posición 
media 
Y hazlo con una misma clase de objeto: 
Toma cuatro posiciones de una pelota, 
girando alrededor de un punto central. 
Ahora, añade la posición 
intermedia y mira qué tan cerca
están de los extremos del arco.
Vista 
desde arriba
(mirando 
hacia abajo)
Vista 
Lateral
Añade las próximas posiciones 
intermedias, y las más lejanas 
casi taparán a las pelotas extremas. 
El punto es que el espaciado entre 
los intercalados, se agrupen 
en los ejes del giro. 
Podemos incrementar la perspectiva, 
pero siempre agrupando 
en los ejes del arco. 
Así, cuando vamos a girar una cabeza se tratará del mismo asunto: 
Art Babbit nos 
muestra esto:
(Separadas 
para verlas 
mejor) 
También tendemos 
a bajar nuestra 
cabeza en el giro. 
Por lo que desplazaremos 
la posición intermedia, 
para hacerlo convincente. 
Si sólo intercaláramos, parecería 
como si los rasgos se deslizaran 
por el rostro, mientras la cabeza 
se mantiene estática. 
A propósito, en el giro de cabeza, Ken Harris me enseñó esto: 
Hazlo tú mismo, o pon a alguien levantando dos dedos. Primero mira uno, relájate, entonces 
vuelve la cabeza hacia el otro dedo. Durante el giro de la cabeza, algo interesante sucede... el 
ojo, interrumpiendo el foco de un lado al otro, parpadeará en la trayectoria (a menos que esté 
aterrado, entonces los ojos permanecerán abiertos). 
Así es que, probablemente, 
parpadeemos durante el giro. 
ERRORES CLÁSICOS DE INTERCALADO 
Un mazo golpea un clavo que 
se dobla, y queremos un 
intercalado justo al medio. 
Nuestro ayudante, que 
está enchufado a un CD, 
telefoneando o lo que sea,
hace exactamente lo que 
se espera y lo pone 
justo al medio. 
"Bueno, yo seguí tu 
gráfica..."
Luego, la misma 
persona enchufada 
sitúa una gota de 
agua entre esas 
dos posiciones... 
Va y va:
Pelota de goma
cayendo... 
... y la pone, 
nuevamente, 
justo al medio.
Obviamente, el 
cambio sólo 
ocurre en el 
contacto. 
Es por 
sentido 
común.
Desde 
luego, 
debería 
ser... 
A menudo, cuando 
encaramos con un 
Breakdown a medio 
camino... 
... conseguimos esto:
"Bueno, lo puse 
justo en medio, tal 
como dijiste"
Esto es ridículo, pero algo 
equivalente sucede con 
intercalados más complejos. 
Cada dibujo es importante, no podemos tener dibujos estúpidos sólo para unir cosas. En un 
sentido allí no hay intercalados, todos los dibujos estarán en pantalla la misma cantidad de 
tiempo.
Ignorando nuestro principio 
del poste telefónico... 
"Pero lo puse bien, 
justo al centro.."
No son líneas... 
¡piensa en masas! 
Cuando se 
golpea una 
dura bola 
de golf... 
En el momento del 
impacto, podemos 
deformarla...
... pero debemos 
volverla a su 
forma, en muy 
pocos fotogramas.
Idealmente, el intercalador debiera entender y ser capaz de completar acciones excéntricas. 
No sólo un 
intercalado 
lineal... 
 Sino 
 algo 
 como 
 esto... 
Y no como esto... ... sino como esto. 
VIGILA TUS ARCOS
La mayoría de las acciones siguen arcos, generalmente una acción es un arco. 
Casi todo el tiempo, la guía de la acción es un arco en forma de ola o en forma de ocho: 
Pero, a veces es un ángulo o línea recta, las líneas rectas dan poder. 
Sin arco
Arco
En una corta 
distancia, 
va recto. 
En distancias 
prolongadas, 
sigue un arco.
¡Qué importante es el arco! Supongamos tener las posiciones 1, 3, 5 y 7... 
Las uniremos como esto... 
 O... ¿cómo esto?
Obtendremos un resultado completamente distinto, así que montemos los dibujos para hojearlos, 
y asegurarnos de que esté el arco o guía de acción. 
 
A menudo, conseguimos esto:
Normalmente, tenemos esto:
Ni una cosa, ni la otra... 
El arco de la acción nos 
da un flujo continuo. 
En este movimiento 
del brazo, la muñeca 
forma el arco y 
arrastra a la mano. 
Desde luego, los huesos
no se encogen o estiran,
mantienen su longitud.
Erróneo,
obviamente. 
Obviamente 
correcto. 

Si no estuviese en el arco o en la guía de la acción, la animación no tendría fluidez. Consigamos la 
fluidez usando arcos, a menos que se requiera un movimiento rectilíneo. 
El tema de éstas páginas parece tan terriblemente simple como esto... "Oh, ya lo sabía". Pero tan 
pronto como entramos en imágenes y acciones sofisticadas, todo tiende a irse al garete. 
Recientemente escuché algo sobre un asistente en Hollywood, un hábil dibujante que estaba 
trabajando en caballos realistas (algo de lo más duro que hay en animación). Él hizo sus dibujos 
bellamente, pero no consiguió mantener las cosas en los arcos correctos. James Baxter, su 
director de animación, sugirió finalmente que tomara un lápiz azul, para trazar sólo la posición de 
los ojos del caballo en forma separada, y observar lo que sucedía en el flujo... ¡Eureka! 
 
 Antes Después
Volvamos a la vieja pelota, botando de nuevo. 
Estas cosas básicas son importantes... la mayoría de los animadores dirían con desdén: "Oh... 
claro, la pelota botando, todo el mundo lo sabe". Pero... ¿lo saben? 
Tomemos una 
pesada bola de 
billar... se acelerará 
al caer, ¿verdad? 
Quiero decir que no 
podrías tener una bola 
de billar desacelerando 
al caer, ¿cierto? 
Pero eso es exactamente 
lo que está publicado en un 
clásico libro de instrucciones 
para animadores. 
De nuevo... ¡todo está en el Timing y en el Espaciado! 
CONSIGUIENDO MÁS MOVIMIENTO DENTRO DE LA MASA
Ahora, podemos empezar a conseguir mayor sofisticación. Vamos a buscar modos de obtener 
movimiento dentro del movimiento, acción dentro de la acción, conseguir más cambio. 
Precisaríamos unos cinco dibujos, incluso espaciando en la cabeza, hasta dar en el
acantilado. Las figuras se sobreponen ligeramente para ayudar al ojo, en unos,
desde luego, porque se trata de una acción rápida... sin intercalar entre el 5 y el 6. 
Para conseguir mayor impacto, más poder en el golpe, añade otro dibujo donde
toca el acantilado, justo en el contacto antes de "plancharse" en el siguiente
fotograma. Esto otorgará un mayor "cambio", más acción dentro de la acción. 
Ahora, para dar aún más impacto, quitamos el dibujo 5 y estiramos el dibujo en
el que tocaba el acantilado... ahora, será nuestro número 5. 
Nuestra acción hace un salto del hueco de un fotograma. No lo veremos, pero
será percibido y dará mas fuerza al golpe. 
Hay algo interesante aquí, que trataremos nuevamente con la pelota botando. 
Ken Harris me mostró cómo exagerar un golpe.
Pongamos a una criatura disparada a través del aire, hasta dar contra un acantilado. 
En 1970, mostré a Ken una edición temprana del libro de animación de Preston Blair, cuando me 
cuestionaba si precisaba esa cantidad de estiramiento y encogimiento de las cosas, puedes 
entender por ahora que no era demasiado lúcido en el estiramiento "pato de goma", aunque 
veinticinco años después, eso era lo que precisaría en "¿Quién engañó a Roger Rabbit?", un 
cartoon acerca de un cartoon. Noté que Ken, aunque era famoso como animador de acción, usaba 
estiramientos y encogimientos muy escasamente...

---

## Sección 18: Core Concepts & Foundations [Entropy: 0.25]

Yo tenía la página abierta en la pelota botante... era algo así, que realmente funcionaba bien. 
Ken dijo... "Sí, desde luego, pero espera un minuto... nunca olvides esto. Podemos hacerlo mucho 
mejor, necesitamos establecer un contacto antes del estrechamiento".
"Pon un contacto justo donde la pelota toca el suelo, y entonces estréchala. Eso le dará más 
vida". Mueve el dibujo precedente un poco, para ajustarlo. 
"¿Y hago lo mismo cuando se despegue de nuevo?". Respuesta... "No en este caso, sólo cuando 
contacte. Consigues así el cambio, luego ciérralo de nuevo". 
El racimo de animación fluye como un relámpago: "¿Sabías que Ken Harris en Londres ha 
corregido la pelota boyante de Pleston Blair?". La siguiente edición de Preston salió así: 
Perfecto.
Esto no se hizo como una falta de respeto a un calificado animador como Preston Blair, quien fue 
el primer animador clásico en hacer que fueran accesibles los conocimientos de la animación. Ken 
sólo mostró un importante recurso, para conseguir más acción en el movimiento. 
Ken continuó mostrando la misma idea, con una rana. 
"Ponla en contacto contra el suelo antes de encogerla. Luego, mantén el contacto de sus pies 
cuando lo abandone, eso dará mayor cambio a la acción". 
Ahora, una figura saltando. 
"Pon al menos un pie que contacte con el suelo antes de encogerse, y mantén al menos una 
pierna aún en contacto, cuando abandone la superficie". 
Esto es útil porque conseguimos más "cambio", mayor contraste, líneas rectas contra líneas 
curvas. Lo hacemos tanto con huesos como con masas. Podemos usar líneas rectas, y aún 
conseguir un resultado flexible. Insistiremos sobre esto más tarde, no necesitamos atascarnos en 
formas gomosas para obtener movimientos suaves. Esto nos libera del deber de usar un estilo 
prescrito porque "está adaptado a la animación", o sea "animable". 
He usado dibujos simples aquí, para que todo fuese claro como el cristal. Sólo quería mostrar la 
estructura, y que no se perdiera en una serie de detalles atractivos. 
LOS INTERCALADOS ALARGADOS
En los años 30 cuando los animadores comenzaron a estudiar las películas de acción real 
fotograma a fotograma, se asustaron por la cantidad de aspectos borrosos (Transparent Blurs) de 
las imágenes en vivo. Para hacer a sus movimientos más convincentes, comenzaron a usar 
intercalaciones "estiradas". Ken los llamaba "Longheaded Inbetweens" (intercalaciones de cabeza 
alargada).
Para una vuelta rápida, en unos, aunque también funciona para dos fotogramas: 
Si alargamos la mano en un 
movimiento rápido, podemos 
crear una superposición 
de imágenes. 
Tomemos estos dibujos de una mano golpeando una puerta. Graba
el intermedio 2 en los unos. Éste es uno de los muy pocos casos
donde puedes grabar la secuencia al revés. Esto trabajará en los
unos (o simplemente con los intermedios en unos y los extremos),
y con 1 y 3, en los dos. 
Cualquiera, o:
A finales de los 30, cuando trazar y pintar los dibujos en acetatos era una labor hecha a mano, 
muchos pintores se volvieron adeptos a la técnica del "Dry brushing" (brocha en seco), con la que 
lograban el borroso efecto de acción en vivo deseado. Los animadores indicaban el desenfoque 
sobre el lápiz del dibujo, y los Dry Brushers mezclarían los colores entre sí para simular la 
transparencia en el desenfoque.
 
Desenfoque
requerido
Después de la huelga de animadores de 1941 y de la Segunda Guerra Mundial, los presupuestos 
se redujeron, así como el uso de pintores expertos de reserva. Pero muchos animadores siguieron 
indicando blurs y se acordó que en los dibujos animados se trazaran con gruesas líneas negras, 
ignorando el hecho de que los artistas de brocha en seco ya hacía mucho que habían 
desaparecido. 
Ahora se ha convertido en un cliché de la animación. 
Una caricatura de una caricatura... 
¡ZIP!
Con los personajes apenas desapareciendo de la pantalla, Ken me dijo: 
"Tenemos a esta bruja volando y riéndose, y ella se esfuma. En lugar de hacer un desenfoque,
nosotros dejamos pequeñas horquillas en donde ella estaba". 
"Aprendimos eso de los animadores de Disney, en un dibujo de peces. Tienen estos pequeños 
peces nadando, cuando de pronto algo los asusta y se van... eso es todo, con apenas algunas 
burbujas que marcaban la trayectoria que tomaron". 
En los primeros días, las líneas de velocidad eran una costumbre heredada de los cómics que 
aparecían en los periódicos: 
Después, fueron utilizadas en animación para ayudar a llevar al ojo. Pero aún se pueden 
encontrar, cuando realmente no las necesitamos. Ni siquiera es necesario que se muestre la 
flecha entrando, no tenemos nada y entonces aparece justo allí... quizá con la parte posterior 
vibrando. 
 
Simplemente, 
muestra el 
resultado: 
N A D A
 
Tampoco necesitamos chispas.
Si la animación tiene energía, 
no hay necesidad de trazar 
esas pequeñas líneas a su 
alrededor, para darle fuerza. 
De cualquier manera, considero que el estiramiento de la imagen, o la imagen alargada 
intermedia (Long-headed inbetween) es muy útil, no sólo para el efecto vigoroso de las 
historietas, sino también para cuando queremos dibujar acciones reales veloces. 
Una vez más, regresamos al propósito original... imitar la transparencia y la escasa definición de 
aquellos amplios movimientos en vivo. Esto es especialmente conveniente con los dibujos de 
bordes suaves, donde los contornos no son tan agudos como en los dibujos de los libros para 
colorear. 
EL ERROR MÁS FRECUENTE EN LOS PRINCIPIANTES
Hacer excesivas acciones en un espacio demasiado corto del tiempo, por ejemplo el brazo y la 
pierna se mueven al correr. El remedio... ir dos veces más lento. Agrega dibujos para bajar la 
velocidad, y quítalos para acelerarlo. 
Ken Harris me contó que cuando Ben Washam estaba empezando en Warner, él se hizo famoso 
en la industria por "El Bostezo en Doce Cuadros de Benny". Ben dibujó e hizo doce elaborados 
dibujos de alguien que pasaba por las diversas posiciones de un bostezo, algo como esto: 
Después, él lo corrió en unos. ¡Zip...!, destellaba a través de medio segundo. 
Posteriormente, lo corrió en dos. ¡Zip...!, se desarrolló en un segundo. 
Más tarde, lo intercaló (ahora, a veinticuatro dibujos) y lo tiró en dos... ¡Zzzz...! La acción se 
desarrolló en dos segundos, casi lo correcto. 
Entonces, Ken le mostró cómo agregar algunos dibujos que servían como amortiguadores al 
principio y al final... ¡Bingo! Ben estaba en camino de convertirse en un buen animador. 
EL ACERCAMIENTO AL "RUFF" (BOCETOS)
Algunos animadores desean ahorrarse mucho trabajo, por lo que dibujan bocetos... Ruff, ni 
siquiera se toman el tiempo para llamarlos Rough... tiene demasiadas letras para perder nuestro 
valioso tiempo. Y así, dejan mucho trabajo para los asistentes. 
Nunca entendí porqué algunas personas en animación están tan desesperadas por ahorrarse 
trabajo. Si lo que quieren es trabajar menos... ¿qué demonios hacen en animación? 
Es demasiado trabajo... 
En los primeros días, en los estudios Disney y cuando la animación era transformada desde su 
crudo inicio hacia una forma sofisticada del arte, solían decir... toma al menos un día para pensar 
qué vas a hacer, luego hazlo. 
Uno de los viejos animadores, escribiendo sobre el tema cuarenta años después, aconseja que 
pasemos días pensando en ello. Leyó sobre Freud, Jung y el inconsciente mental, y describe cómo 
debes rumiar hasta el último minuto, para después estallar en un frenesí de creatividad que fluya. 
Me dijo que en una semana de trabajo, él pasaba lunes, martes, miércoles y jueves pensando en 
ello y planificándolo mentalmente, ya para el viernes lo hacía. El único problema es que entonces 
se necesita unas tres semanas para que alguien más lo entienda.

---

## Sección 19: Core Concepts & Foundations [Entropy: 0.25]

Yo lo conocía bastante bien, y lo hizo sonar tan creativamente atractivo que, pese a que yo 
sintiera que eso era demasiado artístico, pensé que lo mejor sería intentarlo. Me las arreglé para 
rumiar, guisar y adobar mis jugos por un día y medio... después no pude soportarlo más. Estallé 
en un frenesí creativo de un día, dibujando toda la noche como un loco. El resultado fue bastante 
interesante, pero realmente necesité tres semanas después para componerlo todo. Y no creo que 
haya sido mejor que si hubiese trabajado normalmente... tal vez sólo un poco distinto. 
Pienso que Milt Kahl tiene un acercamiento correcto. "Lo hago muy seguido, pienso en ello todo el 
tiempo, y lo hago todo el tiempo". 
Ken Harris trabajaba intensamente desde las 7:30 hasta el medio día, se relajaba a la hora de la 
comida, estaba dando vueltas un rato, se iba a casa a mirar televisión (o a jugar tenis cuando era 
más joven), y pensaba sobre lo que haría al día siguiente. Entonces llegaba temprano, evitaba el 
contacto social y lo hacía. 
Trabajó cuidadosamente y pensó mucho en sus cosas. Dijo que se sorprendió cuando vio algunos 
de los dibujos de Ward Kimball porque eran exactamente iguales a sus dibujos, hechos muy 
cuidadosamente, generalmente algo en cada dibujo de la toma. 
Cuando vi por primera vez el trabajo de Milt sobre su escritorio, me espanté por todo el trabajo 
que había hecho. Sus dibujos estaban realmente terminados. No había Pasado a Limpio, 
solamente Retoque, y completar detalles e intermedios o parte de ellos, al igual que Frank 
Thomas, Ollie Jonson y Art Babbitt. Las dos únicas excepciones eran Cliff Nordberg, un 
maravilloso animador de acción que trabajó conmigo por un tiempo, y Grim Natwick. Cliff 
trabajaba mucho con bocetos, por eso dependía tanto de tener un buen asistente, y eso siempre 
le provocó muchas preocupaciones... y Grim era sincero con él mismo. 
Existe un mito en la animación acerca de que los asistentes siempre deben poder dibujar mejor 
que el animador, aunque nunca conocí a uno que lo hiciera. El mito es que el animador crea la 
acción, y que el Fine Draft Person mejora la vista de todo, uniéndolo. Bien, pues no existen tantos 
Fine Draft People, y si fueran lo bastante buenos como para unir todos los detalles y dibujar bien, 
ellos debieran estar animando... y probablemente lo estén haciendo. Una excepción es el 
Asistente Estilista en los comerciales, donde la imagen de la cosa es la "raison d’ètre"... hay unos 
cuantos excelentes por ahí. 
Los bocetos tienen mucha vitalidad, falta de definición, presión en la línea, etc. Pero cuando se 
pulen y organizan, generalmente te das cuenta de que no había tanto con que comenzar. 
Conforme vayamos avanzando con el libro, nos iremos dando cuenta de cuánto trabajo 
tendremos que hacer para obtener un buen resultado. No importa lo talentoso que seas, los 
mejores siempre son los que trabajan más... Pero engánchate al trabajo, es el resultado único lo 
que estamos persiguiendo. Siempre que hacemos una escena, estamos haciendo algo único... 
algo que nunca nadie ha hecho. Es propiamente un arte. 
¿CUÁNTO HAY QUE DEJARLE AL ASISTENTE? 
Milt Kahl responde: "Hago lo bastante como para tener el suficiente control sobre la escena". 
Ken Harris responde: "Dibujo cualquier cosa que no sea un simple intermedio". 
Milt otra vez: "No le dejo mucho a los asistentes. ¿Cuánto puedo conseguir si le dejo el control de 
la escena? Si es una acción rápida, yo hago todos los dibujos". 
El propósito del asistente es liberar al animador para que pueda hacer más trabajo mientras se 
encarga de asuntos menos importantes, pero en realidad, el o ella no pueden dedicarse a dibujar 
sin pensar. La computadora produce intermedios perfectos, pero obviamente debe estar 
programada para poner en la escena secuencias que le den vida. 
Éste es mi consejo para ahorrar trabajo, mi regla de oro: 
TOMA EL CAMINO LARGO
El camino largo resulta ser el corto. 
Porque: algo normalmente va mal con cualquier idea genial como atajo, y resulta que es un 
camino aún más largo para tratar de arreglar aquello que salió mal. 
He visto que es más rápido simplemente hacer el trabajo, y ciertamente se disfruta más porque 
pisamos sobre tierra firme, sin depender de algún chico listo que probablemente no tenga un 
esquema completo de las cosas. Y nuevamente, si tú no quieres trabajar mucho... ¿qué estás 
haciendo en animación? 
Una de las cosas que más me gustan de la animación es que debes ser específico. Si los dibujos 
están fuera de lugar, está mal, claramente mal, al contrario que en el arte, o el Arte Moderno, 
donde todo en estos días es amorfo y subjetivo. 
Para nosotros es obvio si nuestra animación funciona o no, si las cosas tienen peso o se sacuden 
con fuerza, o flotan bamboleándose alrededor, amorfas. 
No podemos escudarnos en hechos del inconsciente. Claro que podemos disfrazarlo y actuar como 
divas temperamentales, pero no podemos engañar a nadie con el trabajo. Es obvio si es bueno o 
es malo. 
¡Y no hay nada más satisfactorio que conseguir hacerlo bien! 
CAMINATAS
Consejo de Ken Harris: 
"El andar es la primer cosa por aprender. Aprendan caminatas de todas clases, porque el andar es 
casi aquello más difícil de hacer bien". 
PASO ALCANCE
Existe una tendencia 
a la inclinación en 
una caminata. 
Cuanto más lenta 
resulta, mayor será 
su punto de equilibrio.
Y cuanto más rápida, 
quedará más lejos 
de dicho punto. 
NdT: "Catch" es tomar, atrapar o alcanzar. Refiere a que el cuerpo cae justo en el punto de la 
pisada, atajándose de la caída. Lo dejo a criterio de quien corrija. 
Caminar es un proceso de caerse, atrapándose a sí mismo justo a tiempo. Tratamos de evitar 
caer cuando nos movemos hacia adelante. De no apoyar el pie, nos caeríamos de boca al piso. 
Vamos desplazándonos a través de una serie de caídas "controladas". 
Nos inclinamos hacia adelante con la parte superior del cuerpo, y alargamos una pierna hacia 
adelante, justo a tiempo para atraparnos. Paso, atrapa. Paso, atrapa. Paso, atrapa. 
Normalmente, elevamos el pie sobre el piso sólo un mínimo. Por eso, es tan fácil para nosotros 
despegar los dedos de los pies y avanzar. Una pequeña grieta en la vereda podría hacernos 
tropezar. 
Inútil, aunque interesante información científica sobre las caminatas:
¿Sabía usted que ponemos cada día una media de cuatrocientos cincuenta kilogramos
de peso sobre nuestros pies? 
 MEDIANO YENDO ARRIBA ARRIBA BAJANDO 
DE NUEVO
1- MEDIANO: Cada brazo se mueve en coordinación con la pierna opuesta, dando
equilibrio e impulso. 
2- YENDO ABAJO: Cuando descendemos, aceleramos descargando energía, aunque la
gravedad hace parte del trabajo. Los brazos están en su punto de mayor abertura. 
3- YENDO ARRIBA: Estamos a menos de un centímetro de arrancar del piso nuestro dedo
gordo del pie, cada vez que damos un paso. Caminar es conservar la energía
naturalmente, levantando nuestro pie lo menos posible. 
4- ARRIBA: Mientras nos elevamos, vamos más despacio, almacenando energía potencial.
5- MEDIANO: Nuestro pie desliza primero el talón, para lograr un apoyo suave. 
6- BAJANDO DE NUEVO: La pantorrilla produce un caballo de fuerza cada vez que
empujamos hacia delante. El músculo de la pantorrilla produce hasta un caballo de fuerza
(760 Watts). 
 YENDO ABAJO MEDIANO 
No ayuda mucho cuando se te pide animar la caminata de un hombre triste o feliz... ¿o sí? 
Pero... Todas las caminatas son diferentes. 
 No hay dos personas en el mundo que caminen igual.

---

## Sección 20: Core Concepts & Foundations [Entropy: 0.508]

Los actores intentan captar al personaje imaginando cómo él, ella o ello se desplazan. Trata de 
contar toda la historia en una caminata. 
¿Por qué es que reconocemos a nuestro tío Carlos, aunque no lo hemos visto durante diez años, 
caminando, de espaldas, borroso y a lo lejos? Porque el modo de caminar es tan individual y 
distintivo como lo es su rostro, y un pequeño detalle cambiará todo. Hay una masiva cantidad de 
información en el andar, y lo registramos instantáneamente. 
Art Babbitt nos enseñó a observar gente caminando por la calle, desde atrás. 
Síguelo y pregúntate: 
- ¿Son viejos? 
- ¿Jóvenes? 
- ¿Cuál es su posición económica? 
- ¿Su estado de salud? 
- ¿Son estrictos? 
- ¿Permisivos? 
- ¿Deprimidos? 
- ¿Esperanzados? 
- ¿Tristes? 
- ¿Alcohólicos? 
Luego, ve junto a ellos para verlos de frente, y verifícalo. 
Entonces... ¿qué buscamos? 
¿Cómo se me abrieron los ojos? Sucedió así... 
(Desafortunadamente, el ejemplo resulta políticamente incorrecto, pero es muy bueno, así que 
ahí va). 
Estaba estacionado en mi auto, dándole arranque, cuando fuera de mi visión periférica y casi en 
forma inconsciente percibí la cabeza de un hombre detrás de una pared... 
Calle muy
transitada
Cabeza de
un hombre
Mi auto

Se cruzó por mi mente que él era gay... tenía un modo de andar afeminado. Ahora bien, soy 
bastante corto de vista, mis ojos enfocaban la llave de encendido del auto, y era una calle 
transitada por muchos autos y gente... y él estaba casi a cincuenta yardas de distancia. 
Oh... ¿cómo lo supe? Es una locura... ¡todo lo que vi fue su cabeza desenfocada, moviéndose a lo 
largo y por detrás de una pared por una fracción de segundo! 
Empezaba a alejarme con el coche, cuando me detuve. Un momento... se supone que soy bueno 
en esto, se supone que sé de estas cosas... ¡Tengo que saber el por qué! Recordé aquel consejo 
de Art Babbit, volví a estacionar, bajé y corrí una cuadra y media para alcanzar al sujeto. 
Por cierto, era un caminar afeminado el suyo... Entonces, lo entendí... estaba como caminando 
sobre una cuerda tensa, y deslizándose sobre ella. 
Ahora... ¿como pude haber registrado eso, con sólo un vistazo de reojo y desenfocado, a cuarenta 
y cinco metros... sin siquiera ver su cuerpo? En verdad es simple... no había ninguna acción de 
ascenso y descenso en su cabeza. Prueba a caminar imaginariamente sobre una cuerda tensa, y 
tu cabeza se mantendrá a nivel... no hay ascensos ni descensos. 
HABÍA VISTO ESTO EN UN
PASO CONVENCIONAL 
DEL CUERPO 
DESLIZAMIENTO SIN PESO 
SE LEVANTA A LA POSICIÓN
DE PASE 
Desde entonces, siempre observo primero cuánta acción de subir y bajar hay en la cabeza. 
¡Esa cantidad de ascensos y descensos es la clave! 
La mujeres a menudo dan pasos cortos y en línea recta. 
Piernas juntas = El cuerpo asciende y desciende poco. 
En contraste con Mr. Macho:

Las mujeres mayormente caminan con sus piernas muy juntas, protegiendo la entrepierna, 
resultando escasa la acción de ascenso y descenso sobre la cabeza y el cuerpo. El uso de faldas 
también restringe sus movimientos. 
Sin embargo, Mr. Macho, debido a su equipamiento, lleva sus piernas lo bastante abiertas, y hay 
montones de ascensos y descensos sobre la cabeza y el cuerpo en cada una de sus zancadas. 
Tiende a la 
protección...
... y aquí 
viene el tren
expreso. 
PERO Podemos convertir un 
andar muy masculino 
en uno afeminado, 
entrecruzando la acción
en sus pies. 
Obteniendo el Peso 
No obtenemos peso por un ligero movimiento de nivel. 
Cuando trazamos en forma directa una acción de caminar real (el término de fantasía es 
rotoscopiado), no suele funcionar demasiado bien. Obviamente funciona en acción real, pero 
cuando la trazas con exactitud, flota... nadie sabe en verdad por qué. Así es que incrementamos 
los ascensos y descensos (acentuando o exagerándolos) y así funcionará. 
Es la pose de ascenso y descenso de las masas la que transmite sensación de peso. 
Es en la pose de descenso cuando las piernas son dobladas, y en que la masa del cuerpo queda 
por debajo, dando la sensación de peso. 
... especialmente
cuando lo hace 
sobre un punto 
de contacto. 
Donde no lo 
haga, no habrá 
peso.
Contacto
Sentimos el peso
cuando la masa 
del cuerpo
desciende...
Luego, 
toma
el peso...
... y obtendremos
el "cambio".

Antes de empezar a construir e inventar caminatas, esto es lo que sucede en lo que llamamos una 
caminata "normal": 
Primero, haremos
las dos poses 
de contacto. 
Luego intercalaremos
la pose de pase. 
Pose Media o Quiebre
Fase Intermedia 
Después, viene la Pose
de Descenso, donde 
la pierna flexionada 
toma el peso.
Al estar la pierna recta
en la Pose Media,
se elevarán la pelvis, 
el cuerpo y la cabeza 
ligeramente. 
Pose Media
(apenas más alta 
que su punto medio)
contacto
contacto
Baja
En un andar convencional, 
los brazos están siempre 
en oposición a las piernas, 
para dar equilibrio e impulso.
Y sólo para complicarnosla vida,
en un andar normal el balanceo
del brazo derecho da su punto
de mayor amplitud en la pose
de descenso. 
(No en la pose de contacto, 
como hubiéramos preferido). 
Podríamos ignorar el hecho 
mientras continuamos, 
pero también podríamos 
comprender dicha norma, 
antes de empezar a hacer lío...
Luego, ubicamos 
la pose ascendente
(empuje). 
Vamos a extenderlo
y exagerarlo un 
poco más, para 
que sea más claro...
El pie que empuja lleva
la pelvis, el cuerpo y 
la cabeza a su posición 
más alta. 
Luego, la pierna se estira
para ubicarnos en la Pose
de Contacto, para evitar
que nos caigamos 
de boca al piso. 
contacto
sube
baja
pose de 
pase
Sube
contacto
contacto
contacto
Así, en un andar convencional realista... 
El peso se ubica debajo....
Sube
Baja
Justo después del paso. 
Justo después del contacto 
Justo después de la Pose de Pase
mediana
El peso queda arriba...
Aquí está 
de nuevo, 
aunque 
exagerado.
La pierna 
flexiona, 
absorbiendo
la fuerza del
movimiento 
la bajada 
la subida.
la bajada
la subida
contacto
contacto
posición 
de pase
(va bajando)
mediana
Fijar el Tiempo
Lo primero a hacer en una caminata es fijar un ritmo o compás. 
Por lo general, la gente camina en un tiempo de marcha en Doces (Doceavos). 
(Medio segundo por paso, dos pasos por segundo) 
Pero a los perezosos animadores no les gusta hacerlo en Doces porque resulta difícil para dividir. 
Tienes que usar "Tercios", pensar parcialmente en tercios. 
Así
O bien
Contacto
Contacto
Pose 
Media 
Baja
Sube
Contacto
Pose 
Media 
Contacto
Aqui?Aqui?
Aqui?Aqui?
?
?
?
?
Los intermedios serán en tercios.
Oh... ¿dónde ponemos ahora el abajo o el arriba?
Hey, esto se pone difícil... especialmente cuando 
llegamos a los brazos y a la cabeza. 
¿Habrá un modo más fácil? 
Sí hay una manera más fácil: hacerlo caminar en 16’s o en 8’s. 
Mucho más fácil caminar en 16’s (fácil de dividir), lo mismo sucede en 8’s. 
(cada paso = dos tercios de segundo, tres pasos por segundo) 
En
16’s
Contacto
Contacto
Pose 
Media 
Baja
Sube
Eso hace la vida más fácil... 
Acción de ascenso y descenso reducida.
(Ahora son divisiones, ya que sucede en un
tiempo más corto). 
Esta es la razón por la que las caminatas son
generalmente animadas en Octavos. 
Bomp, bomp, bomp… tres pasos por segundo. 
En
8’s
Contacto
Contacto
Pose 
Media 
Baja
Sube
Así que fijamos un compás: 
 4 Fotogramas = Una carrera muy rápida (seis pasos por segundo). 
 6 Fotogramas = Una carrera o caminata muy rápida (cuatro pasos por segundo). 
 8 Fotogramas = Carrera lenta o caminar "cartoon" (tres pasos por segundo). 
12 Fotogramas = Caminata enérgica-natural (dos pasos por segundo).

---

## Sección 21: Core Concepts & Foundations [Entropy: 0.34]

16 Fotogramas = Caminata de paseo-placentera (dos tercios de segundo por paso). 
20 Fotogramas = Persona mayor o cansada (casi un segundo por paso). 
24 Fotogramas = Paso lento (un paso por segundo). 
32 Fotogramas = "Muéstrame el camino... a casa". 
La mejor forma de darle el timing a una caminata (o a cualquier cosa) es actuarlo y tomarse el 
tiempo a uno mismo, con un cronómetro. También, actuarlo con un metrónomo resulta de gran 
ayuda. 
Naturalmente, yo pienso en segundos... "One Mississipi" o "One Little Monkey" o "A Thousand and 
One", etc. 
N. del T. Estas son frases en inglés que tardan un segundo en pronunciarse. 
Ken Harris* pensaba en pies (un pie = 18 fotogramas),
probablemente 
porque 
debía 
producir 
treinta 
pies 
de
animación por semana. Él golpeaba el extremo de su lápiz
exactamente cada dos tercios de segundo, como nosotros lo
actuaríamos. 
Milt Kahl me dijo que en su primer semana en Disney compró
un cronómetro, y fue hacia el centro en el horario del
almuerzo para tomar el tiempo al caminar de la gente
(caminatas normales, gente yendo hacia algún lado). Dijo que
invariablemente estaban en doce exposiciones, como tiempo
de marcha. 
Como consecuencia, solía marcar doce exposiciones como punto de referencia. Cualquier cosa que 
midiera era tanto más o tanto menos que esas doce exposiciones. Decía que solía pensar... 
"Bueno, son casi octavos". Decía que eso le facilitaba la labor en alguna forma. 
Chuck Jones comentaba que los cortos del Correcaminos tenían un tempo musical incorporado. Él 
tomaba el tiempo de toda la película, golpeando cosas en un compás fijo para que tuvieran una 
integridad musical y rítmica ya incorporada. Luego los músicos podían seguir el ritmo, ignorarlo o 
pasar la música por sobre él. 
Chuck me dijo que solían tener hojas de exposición con una línea de color impresa a través de la 
misma cada dieciséis cuadros, y otra marcada cada doce cuadros. Las llamaba "Hojas 16" u 
"Hojas 12". Supongo que las hojas normales serían las "Hojas 8". 
Una vez mencioné a Art Babbitt que me gustaba el timing de los Tom y Jerry. "Oh, sí..." dijo 
despectivamente... "Todo en octavos". 
Esa clase de timing sincronizado en forma ajustada a la música, es raro hoy en día. Lo llaman 
"Mickey Mousing" donde se acentúa todo (es un término actualmente peyorativo, considerado 
melodramático) pero puede ser extremadamente efectivo. 
N del T: Ken Harris, vendedor de autos devenido animador, ingresó a Warner luego de dar prueba 
en Disney, donde no ingresó por su particular modo de animar en base a puntas extremas y un 
gran sentido del timing, contando lo justo con pocos dibujos. 
Al probar las caminatas, es mejor mantener la figura simple. Es rápido de hacer, y fácil para 
corregir o efectuar cambios. 
Al hacer estas caminatas, también es bueno tomar unos pasos a través de la página o pantalla. 
No tratar de hacer un ciclo de caminata en el sitio, con los pies deslizándose hacia atrás, etc. 
Todo eso resulta demasiado técnico, queremos nuestra mente libre para concentrarse en lograr 
una caminata interesante y yendo hacia delante. 
Podremos hacer de la caminata un ciclo más tarde, quizás sólo para los pies y el cuerpo, pero 
luego de tener los brazos y la cabeza actuando por separado. Los ciclos resultan mecánicos y 
lucen como lo que son... ciclos. 
Chuck Jones contaba que su pequeña nieta de tres años preguntaba... "Abuelo, ¿por qué la 
misma ola continúa golpeando en la isla?". 
Incidentalmente, si está usando colores al igual que yo aquí, funciona muy bien cuando se filma. 
A menudo tengo muchos colores al principio, y aún así se percibe la acción con claridad. 
Ahora, vamos a empezar a sacar las cosas de lo normal... 
La posición de Pase o Quiebre
Hay una forma muy sencilla de construir una caminata. Empieza sólo con tres dibujos. 
Primero,
hacemos
las dos 
poses de 
contacto.
Luego, insertamos
la Pose Media. 
La Pose Media 
o Quiebre. 
Estamos haciendo la pose
más elevada: Ascenso. 
(Hemos omitido la pierna
flexionada tomando el peso,
y nuestros contactos como
descenso) 
Cuando unimos a éstos con dibujos que conectan, la caminata aún tendrá la sensación de peso 
por los ascensos y descensos. Podemos hacer un tremendo uso de estos tres simples dibujos. 
Pero miren lo que sucede si descendemos en la pose de pase... 
Logramos una caminata
muy diferente... 
una caminata de cartón.
Ahora, la pose de pase
es el descenso y los
contactos actúan como
ascensos, dando aún
cierta 
sensación 
de
peso. 
Pose Media
El punto crucial es esta Pose Media, y dónde la colocamos... 
Pose Media
Pose 
Media
¿Qué 
tal 
éste? 
¿Aplastar 
como un 
doblez? 
 ¿Cómo 
un riñón? 
Estos Contactos son todos iguales, pero la Pose Media cambia en forma radical la caminata. 
(Obviamente, precisaremos el tiempo
para acomodar movimientos amplios,
como éstos). 
Demorar 
 el pie? 
En un paso lento, podríamos ir tan 
lejos como esto, casi un resbalón.
¿Qué pasaría si los pies se balancearan hacia los lados, en las Poses de Pase? 
¿Y tal vez
enderezar el
cuerpo en las
Poses de Pase?
La Clave
es dónde
queremos
ubicar la Pose
Intermedia.
Las variaciones
son infinitas...
O solo ladear la cabeza y los hombros hacia los costados, en la Pose de Pase.
... sin contar lo
que podemos
hacer con la
cabeza, las
manos, brazos
y pies.
¿Y por qué nos vamos a limitar a una misma forma? 
¿Qué pasaría, si en
vez de elevar el
cuerpo por entero
en la Pose de Pase,
lo estiramos? Le da
Flexibilidad.
Digamos que es
un hombre más
pesado...
Manteniendo el
nivel de la pelvis
constante.
Nivel de la Pelvis
O en oposición,
lo aplastamos...
le da Flexibilidad
al andar.
A mi parecer, creo que Art Babbit pudo haber sido el primero en apartarse del andar normal, o el 
cliché de las caminatas de propias del cartoon. Por supuesto, él fue un gran exponente de la 
caminata "inventada". Se hizo famoso por las caminatas excéntricas que dió a Goofy, y que 
convirtieron a Goofy en una estrella... ¡hasta puso los pies hacia atrás! La hizo parecer 
perfectamente aceptable, y la gente no se daba cuenta de que iban hacia atrás. 
Todo el credo de Art era: "¡Inventar!" Cada regla en animación existe para romperse, si tienes la 
inventiva y curiosidad por ver más allá de lo que existe. En otras palabras, "Comprendan las 
reglas, y después aprendan cómo romperlas". 
Esto abrió toda una Caja de Pandora inventiva. 
Art siempre dijo... "El medio de la animación es muy inusual. Podemos concretar acciones que 
ningún humano podría realizar... ¡y al hacerlo, parecer convincente!" 
Esta excéntrica idea de la Pose de Pase es un artilugio maravillosamente útil. Lo podemos usar en 
cualquier parte, y donde lo pongamos tiene un enorme efecto sobre la acción. ¿Y quién dice que 
no lo podamos poner donde se nos ocurra? Nada nos detiene... 
Para ese tema, podemos seguir quebrando las cosas en lugares inusuales, suponiendo que 
tenemos suficiente tiempo de pantalla para acomodar el movimiento. 
Tomemos
ésta, por 
ejemplo...
Podemos descender
para tomar el peso,
e ir todavía más 
alto en el avance.
Bastante 
extraño... 
¿pero por qué
no probarlo?
Las personas 
se mueven 
raro en el 
mundo real.
Esto sería 
excéntrico... poner 
por debajo lo que 
normalmente iría 
hacia arriba, y 
flexionar la pierna. 
Donde estaba 
la pose 
descendente
ubica un 
intermedio, pero
demorando la 
pierna (para el 
equilibrio). 
Pose Media 
Pose Media 
Pose
Media
Pose Media 
Intermedio
Abajo
Demora
el pie
De todas maneras, regresemos a lo normal...
Dos formas de planificar una caminata
Contacto
Repasando el 
método de 
"Contacto", 
primero 
hacemos las 
Poses de 
Contacto, 
para luego
insertar 
las Poses 
Medias 
(normal)

---

## Sección 22: Core Concepts & Foundations [Entropy: 0.25]

Ascenso
Descenso
Luego,
insertamos 
las Poses de 
Ascenso y 
Descenso.
Contacto

Noté que este Método de Contacto es el que te conduce, te lleva a casa. Es especialmente 
conveniente para acciones naturales, que es lo que generalmente debemos hacer. Descubrí que 
es la mejor manera de hacer la mayor parte de las cosas. 
Milt Kahl trabajaba de esta manera: "En una caminata o cualquier cosa, hago las Poses de 
Contacto primero, donde el pie hace contacto con el suelo, aún sin ningún peso sobre él. Es 
aproximadamente una Pose Media para la cabeza y el cuerpo (ni un ascenso ni un descenso. Yo 
sé donde están los altos y bajos, y luego los quiebro. Otra razón por la que hago esto es porque 
hace a una escena fácil de planificar". 
"Siempre empiezo con ese contacto porque es algo dinámico, que se mueve. ¡Y es mucho mejor 
que empezar con el peso ya en el pie, que sería una pose muy estática!"* 
*Es lo que hace exactamente el segundo sistema. 
Ésta es la forma en que Art Babbit planificaba normalmente una caminata, y tiene algo muy 
astuto... 
Empezar con las dos 
poses descendentes 
(a falta de un término 
más adecuado, lo 
llamaremos Método de 
la Pose Descendente). 
Abajo
Abajo
Abajo
Abajo
Contacto
Ahora, insertemos 
la Pose de Pase, por 
ahora, justo al medio. 
Una de nuestras próximas
Poses Medias serán los 
Contactos... 
Arriba
Ahora, tenemos a ambos 
(ascenso y descenso) 
cubiertos en sólo tres 
dibujos.
Contacto
... aunque es complicado 
obtener buenas Poses de 
Contacto de esta forma.

La inteligencia de esta técnica es que ya nos hemos ocupado del ascenso y descenso en los 
primeros tres dibujos. Por supuesto, podemos ubicar la Pose de Pase arriba, abajo o a los lados, 
en cualquier parte que queramos. Pero tener los descensos ya resueltos nos ayuda a inventar, 
nos otorga una cuadrícula simple sobre la cual complicarse, si queremos hacerlo. 
Sabemos que ya tendrá peso, y así somos libres de improvisar e inventar acciones excéntricas, o 
sucesos que no podrían acontecer en el mundo real. 
De nuevo, no estamos limitados a un método u otro... ¿por qué no tener los dos? No sólo eso, 
sino además... 
Yo recomiendo mucho la Técnica de Contacto para uso general, pero empezar con la Pose de 
Descenso es muy útil para las invenciones no convencionales. 
Desde ahora en adelante, usaremos ambas técnicas. 
Es un poco académico, pero si tomamos ambos métodos... 
Tenemos todas las fases de Ascenso y Descenso en un andar normal. 
Es lo mismo, sólo estamos empezando una fase antes o una fase después. 
Contacto
Contacto
Arriba
Abajo
Pose 
Media
Abajo
Abajo
Pose 
Media
Y juntarlos ajustadamente... 
Método de Contacto
Método de Pose Descendente

El Doble Rebote 
Esta caminata de Doble Rebote exhibe optimismo y energía, la actitud americana del "puedo 
hacerlo". Ellos usaron esta clase de caminata como locos a principios de los años 30, donde 
muchos personajes (como bichos y esas cosas) se movían ejecutando llamativos doble rebote. 
La idea es dos rebotes por paso, así rebotas dos veces. 
Desciendes (o asciendes), en vez de una, dos veces por paso. 
Vamos a establecer un paso de 16 fotogramas (en Unos, porque serán muchos). 
Empezaremos con la pierna flexionada hacia abajo, y separemos las piernas para aportar mayor 
claridad. 
NTd: Eso último no encontré como expresarlo correctamente... 
Pose Media 
Pose Media 
Pose Media
Ubicar la Pose de Pase 
en el medio, pero 
también hacia abajo.
Establecer las próximas dos poses 
ascendentes medias, como puntos altos.
Adicionar el pie 
que da el paso. 
La tabla es así...
Es
así...
Abajo
O..
usemos la 
Técnica de 
Contacto, 
empezando 
por éstos. 
Los contactos y las Poses Medias son los altos, y las
poses medias son los bajos. 
Arriba
Pose de 
Descenso
Arriba
Abajo
Abajo
Abajo
Arriba
Arriba
Pose de 
Descenso

Dibujé este andar de doble rebote combinando ambas técnicas. 
Así, establecí primeramente los puntos de contacto de la pierna extendida, aunque también hice 
los descensos. 
Éste está en 
Unos, tomando 
un paso del 
andar en 
doceavos.
Abajo
Abajo
Contacto
Contacto
Contacto 
Abajo 
Contacto 
Abajo 
Arriba 
Arriba 
Pose 
Descendente
Desafortunadamente, 
estos intermedios 
son tercios... 
Abajo
Abajo
Pose
Descendente
Abajo
Arriba
Arriba
Abajo
Abajo
Contacto
Contacto
Contacto
Contacto

Soltándolo 
Empezaremos con este 
simple cliché de caminata...
nada genial aún. 
Los brazos se mueven 
naturalmente en forma 
opuesta a las piernas, pero 
simplemente estableciendo 
hombros opuestos respecto 
a las piernas, lograremos 
mayor sensación de vida. 
Cuando el 
pie queda 
detrás, la 
articulación 
de la cadera 
lo acompaña. 
Cuando el 
pie va hacia 
delante, la 
articulación 
de la cadera 
lo acompaña.
NdT: Aquí podemos establecer
algo semejante a la discusión 
que llevó a Muybridge a 
involucrarse en una apuesta...
el texto dice "Cuando el pie 
va atrás". Entiendo que se 
refiere a la posición respecto 
al eje del cuerpo, porque el 
pie en un andar normal no 
retrocede... hace contacto, 
para luego flexionar e 
impulsarse hacia delante. 
(Vista frontal, 
separándolo para 
mayor claridad). 
Ahora, inclinemos los 
hombros para dotar de 
vitalidad al movimiento. 
Estamos retomando 
nuestro esquema 
básico, agregando 
algunos elementos 
para armar el sistema... 
Ahora, hagamos algo 
con la cabeza, para hacer
a esta simple fórmula 
de caminata más 
interesante. 
Inclinemos su cabeza: 
En la Pose 
de pase (o 
cambio) las 
caderas y 
los hombros 
están más 
o menos 
derechas. 
La línea 
de la 
cadera 
y el 
hombro 
se oponen
una a 
otra. 
Pose
Media 
Pose
Media 
Cuando el brazo 
se impulsa 
hacia delante, 
el hombro 
lo acompaña. 
Cuando el brazo 
cae hacia atrás, 
el hombro 
lo acompaña. 
¿Y qué sucede así? 
Demoremos la 
inclinación de la 
cabeza en la Pose 
de Cambio. 
Pose Media
Pose Media
Pose Media
Hagamos algo más 
con la cabeza. 
Saquemos la 
cabeza hacia fuera 
en la pose de 
cambio (le da un 
ligero "efecto 
paloma").
Un pequeño detalle
que sea distinto, 
dará un aire 
diferente a la 
fórmula.
Pose Media
O…
La cabeza va 
hacia delante 
en forma 
continua,
hasta el final 
del paso. 
La cabeza se 
inclina a 
medida que 
sale hacia 
fuera.
Vista Trasera
Cada pequeño detalle logra alterar una caminata.
Mover la cabeza hacia arriba o hacia abajo,
inclinarla de lado a lado, moverla de atrás hacia
delante o la combinación de cualquiera de ellos. 
Se puede 
pensar en la
cabeza como
un cubo. 
La cabeza del ególatra. 
Arriba
Pose
Media
Se inclina
hacia 
atrás un 
poco.
Abajo 
Esto se observa mucho 
en políticos, actores y personan 
que imaginan a una cámara 
sobre ellos todo el tiempo. 
Algunos comediantes lo hacen 
cuando obtienen gran respuesta 
del público. 
NdT: Refiere a la reverencia, 
 como reconocimiento 
a quienes lo aplauden. 
En Hollywood, hasta he visto 
al cartero haciendo esto... 
Ir flotando... 
Enamorado de sí mismo "es en 
verdad maravilloso ser 
maravilloso". Funcionará muy bien 
con un ligero ascenso y descenso. 
Suave ascenso
Suave descenso
Cuando niño, siempre
me preguntaba por 
qué los animadores 
dibujaban cabezas 
así, con líneas de 
construcción por 
encima. 
Ahora, conozco 
el porqué... 
están moviendo
masas todo el 
tiempo.

---

## Sección 23: Core Concepts & Foundations [Entropy: 0.265]

Ahora, vamos a hacer cosas en piernas y brazos que parecerán extrañas... 
 Pero…
Un consejo de Ken Harris:
Para las caminatas no hagan ciclos de acción del 
cuerpo y la cabeza en forma circular o en octavos. 
Si lo hacen así, parecerá el caminar de un pájaro 
o una paloma (a menos que quieran lograr eso). 
No hacer 
 
 No hacer
Por seguridad, sostengan 
la masa más derecha 
arriba y abajo. 
 Manteniendo esto en mente, debemos aún ser valientes y probar cosas... 
Construyendo sobre nuestro esquema básico, ya hemos agregado más acción en la cabeza,
hombros, brazos, caderas y pies: 
Ahora, flexionemos 
 el cuerpo en sus 
extremos. 
Hacer 
Pose Media
Manténte firme en 
esta Pose Media

Vamos a "quebrar" la pierna. 
Vamos a doblarla, aún si pueda hacerse o no. 
Por supuesto, sus 
huesos quedan del 
mismo tamaño. 
La única vez que 
cambian es cuando se
acortan al frente, por 
la perspectiva. 
Estamos haciendo 
lo que Art Babbit 
llama "Romper"
la articulación.
Hemos tomado 
un martillo, para 
"romper" la 
articulación, 
 doblándola 
 en un sentido
"equivocado". 
Parece bastante raro, pero si dibujamos una bailarina de ballet por encima, se ve muy bien. 
Vamos a 
tener mucho 
más de esto 
luego... 
... así que podemos 
tomarnos libertades 
increíbles con la 
estructura subyacente
(si así lo queremos) y 
quedará perfectamente 
aceptable, especialmente 
en movimiento! 

¿Por qué estamos haciendo esto? 
Todo lo que estamos haciendo es acentuar el cambio, más vida dentro de la acción. 
Desentumecer las cosas. Dotarlas de más vida. 
*Grim Natwick dijo: 
NT: Animador Noruego que integró el staff de "Blancanieves". Formó parte del staff del estudio de 
los hermanos Fleischer, creando allí a Betty Boop. Se lo consideraba un especialista en la 
animación de personajes femeninos. 
Solíamos apostar diez dólares contra diez centavos a que podías tomar cualquier personaje para 
hacerlo caminar a través del salón, y reírnos de él. 
Solíamos tener alrededor de veinticuatro formas distintas de caminar. Hacíamos ciertos 
movimientos del cuerpo, un cierto movimiento de la cabeza, una cierta forma de caminar, un gran 
paso o el estilo Goofy que desarrolló Art Babbit. 
"Mientras un brazo se mueve naturalmente junto a su pierna opuesta, rompíamos las reglas en 
ocho o diez formas diferentes, para hacerlo caminar en forma más interesante". 
Vamos a tomar ahora nuestro plan básico, y agregarle cosas sobre el esquema de construcción. 
Digamos que tenemos cierto caminar enojado, normalmente haríamos esto: 
Ubicarlo por debajo
en la pose de pase, 
haciendo su espalda
convexa (hacer esto
con el brazo 
quebrándose
en el codo). 
Arriba en la 
Pose Media 
Pero miren lo que sucede cuando hacemos sólo dos cosas: 

Llevemos este andar ofuscado más lejos... 
Esto es lo que Art Babbit hizo toda su vida, hacer que movimientos imposibles lucieran 
convincentes y creíbles. Él solía decir: "Intenten ser poco verdaderos". 
Así no parece sólo un paso que se repite. Cambiamos ligeramente la silueta en el segundo 
contacto (#15) para que las contraposiciones del brazo sean distintas al contacto #1. 
En los puntos de contacto, la pierna retrasada se "quiebra", y el pie rotado hacia atrás. Aquí está 
en medios, cada paso insume catorce cuadros. 
El balanceo del brazo NO se quiebra. El pie gira hacia atrás, antes. El resto del modelo NO se quiebra, es el mismo. 
Extremo 
Pierna 
trasera 
"quebrada"
Contacto 
Contacto 
Contacto
Pie 
rotado
Codo 
"quebrado"
Pose 
Media
Pose
Media
Extremo
 Volver al 
Extremo 
Arco trasero al reverso.
Rompiendo el primer paso aún más: 
Pose
Media
Pierna
retrasada 
"quebrada"
Pie hacia
atrás
Posición del brazo distinta
al contacto anterior. 
- Arco trasero el reverso.
Parte posterior del 
arco nuevamente 
revertida.
El pie hacia atrás, y la 
parte posterior del arco 
se revierte una vez más.
(Sólo un 
intermedio)
Se "quiebra" 
la mano.
Se "quiebra" 
el brazo.
El brazo 
continúa 
"quebrado"
La nalga está en lo más
alto. El arco posterior 
al reverso, la suela del 
zapato se orienta lejos 
nuestro, ambas piernas
se enderezan. 
La nalga cae. Al 
contactar el suelo, el 
cuerpo se "tuerce" en
dirección contraria a 
nosotros. El pie más 
cercano queda detrás.
Ahora el paso contrario: 
Pose Media
 Volver al 
Extremo 

Dicho sea de paso, en una caminata de perfil ayuda tener un pie algo adelantado, y en un ángulo 
ligeramente hacia fuera (estuve manteniendo los elementos muy esquemáticos hasta ahora). 
Hacer que el ascenso suceda primero. 
Sigamos manteniendo las cosas fuera de lo normal... ¿por qué no hacer una
simple reversión del ascenso y descenso de una caminata normal? 
Hacer que el 
ascenso suceda
primero.
Abajo
Arriba
Punto 
Medio
Nivel 
aproximado 
de la Pose 
Media
Extendido:
Volviendo a nuestras tres poses principales. 
Está bien, pero 
es algo común.
Pose Media
Pose Media
Así que 
tratemos de 
hacer girar la 
rodilla hacia 
adentro, en la 
Pose de Pase.
Foot
Flops

Profundizando más en las caminatas
Aquí hay una especie de "pavoneo". 
Flexionemos el cuerpo hacia fuera en los extremos (cabeza, hombros, caderas de lado). 
Ubiquemos la pose media debajo, y balanceemos la pierna hacia adentro, quebrando la pierna de 
apoyo (como un golpe articulado). Esto dará un resultado interesante. 
Ahora, tomemos los mismos extremos y pongamos la pose de pase arriba, enderezando la
pierna de apoyo para levantarlo y balanceando la pierna que pasa hacia adentro, como antes. 
Pero hagamos el próximo quiebre debajo (como resulta lógico) con la pierna en ángulo hacia
fuera, y el otro quiebre impulsado hacia delante (el cuerpo sólo se intermedia, con excepción de
la pierna). 
Pose Media
Break the 
support leg
Da un 
resultado
muy distinto.
Abajo 
Pose 
Media 
Intermedio

Podemos continuar así por siempre, alterando partes y conectando elementos sobre nuestro 
esquema básico de tres dibujos. 
¿Qué tal esto? Mantener los dos extremos del inicio, pero usando la posición de piernas 
flexionadas. La posición de pase la ubicamos por encima. 
Lo que intentamos exponer aquí, es una forma de pensarlo... 
... una cuadricula simple, sobre la cual construiremos caminatas bastante normales, o 
absolutamente excéntricas, y todo lo que se encuentre en medio. 
Pose Media 
Articulación 
quebrada
Tratemos de 
insertar algo 
derecho aquí.
Mucha acción en la pierna de apoyo.
¿Qué tal uno como éste? 
Empecemos que las rodillas, que se golpean (piernas con articulación quebrada). 
Abajo
Pose Media 
Ascendente
Articulación 
quebrada

---

## Sección 24: Core Concepts & Foundations [Entropy: 0.268]

Aquí tenemos cierta clase de andar femenino, sobre la misma figura básica. 
Aún si la acción fuera imposible de realizar (articulaciones quebradas, etc.) es una buena idea 
hacerlo todo para ver si encaja en el tiempo previsto. Descarten toda modestia, y háganlo... 
Cuando consulté a Milt Kahl sobre una maravillosa caminata femenina que había animado, me 
dijo "Cerré la puerta, pero si me hubieras visto haciéndola, me hubieras querido besar". 
Pose Media
Los hombros 
no se oponen 
a las caderas. 
Las variaciones 
son infinitas... 
Ladear hombros y cabeza 
en la Pose Media. 
Imaginemos lo que podemos 
lograr, cuando dejemos de tratar 
al cuerpo como un bloque y 
empecemos a "torcer" elementos.
Probemos éste..
Dibuje la Pose 
de Pase, pero 
modifique
la pierna 
izquierda, así... 
Agregar un dibujo 
#5 como 
intermedio, pero 
hacer al dibujo 
#13 más alto, 
manteniendo 
el pie aplastado 
Abajo
Arriba
Separados 
Obtendríamos 
algo así…
Nuevamente,
todo está en 
el Timing y el
espaciado...
... y las 
variaciones 
son infinitas.
Arriba
Abajo
Mantener el 
pie aplastado 
Demorar 
el pie 
Simplemente, cambiemos la inclinación del cuerpo en la posición de pase
(en Octavos). 
Abajo
Abajo
Abajo
Arriba
Arriba
Pero mantener 
el nivel de la 
cabeza
(Como 1)

No deberíamos temer tomarnos libertades para distorsionar las cosas, especialmente en acciones 
rápidas. (En unos) 
La pelota 
bota fuera 
de los bordes 
de la pantalla. 

Estoy incluyendo a este jugador de Básquet que animé sólo para demostrar qué tan lejos se puede llegar 
(si trabajan bien)
134
Conclusión: 
Podemos tomarnos grandes 
libertades en acciones rápidas, 
incluso con figuras realísticas. 
Es obvio que para acciones 
realmente rápidas tienes que 
hacer cada dibujo.
Un Asistente podría ser de 
ayuda para las sombras en los 
músculos o las bandas, pero no
para mucho más. Milt Kahl 
decía... ¡si es una acción 
rápida, yo hago cada dibujo!

No hay nada como probar 
Existen innumerables posibilidades. 
No estamos copiando la vida, estamos sólo comentándola. Si cometiéramos un error... ¿a quién le 
importa? Sólo es una prueba, haz las correcciones e inténtalo nuevamente. La mitad del tiempo 
chocaremos de frente, pero la otra mitad del tiempo funcionará, y será algo nuevo. 
Aquí rompemos una norma: 
Y no hemos hecho nada con la cabeza o los brazos. Tal vez por el movimiento en sus pies, 
debiéramos anteponer los brazos y la cabeza en forma muy conservadora... tal vez, tal vez no. 
Esto funcionará en Medios, pero quedará mejor con algún agregado por la amplitud del espaciado. 
De vuelta a la normalidad, por un rato... 
El Talón 
El Talón es la parte principal. 
El Pie es secundario, y sigue el curso. 
El Talón lidera el movimiento, un pie real es arrastrado 
de atrás hacia delante, pero el talón lo controla. 
Para Caminatas y Carreras 
Poder
Con desgano,
deja el suelo. 
Demora - Mantener 
 apoyado 
Demora - Mantener 
 apoyado 
Ajuste el talón aplastado contra el piso para dar mayor sensación de peso. 
Mantenga el pie atrás, hasta el último movimiento que le sea posible. 
Las ropas 
siempre
llegan tarde. 
Tira 
Cae 
Tira
Tira
Ahora, llega la 
botamanga... 
... eso le da 
un toque de 
vida adicional.
Acción del Pie 
Repasemos la pierna 
pasante en una 
caminata normal, 
empezando por los 
contactos en forma 
separada (digamos 
que es en Octavos). 
Separar
Éste es el modelo 
de un paso normal,
partiendo de la 
posición de 
contacto eso hace 
el trabajo en la 
mayor parte. 
Mitad de 
Camino 
Pelvis 
Abajo 
(Bajo)
Pose Media 
ligeramente 
arriba
Pelvis 
Arriba
(Alto) 
Mitad de 
Camino 
Pero, empecemos
con #2 debajo... 
... pero con la 
Pose Media 
arriba, nos 
hemos ocupado 
de nuestros 
Ascensos y 
Descensos. 
Pelvis 
Abajo
Medio 
Pose Media 
Medio 
Pelvis 
Arriba
Ahora, no 
tenemos que 
pensar en el 
Ascenso y 
Descenso, 
pudiendo 
concentrarnos 
en hacer cosas 
con los pies... 
Es una posición más bien estática...
Juntémoslos 
a todos 
como 
sería 
dar un 
paso
normal... 
... luego, 
al agregar 
intermedios, 
conseguiremos 
un enfoque 
patético de 
una caminata. 
Ahora, 
empecemos 
exactamente
igual, débil, 
aburrido... 
Pero
alteremos 
los dos 
próximos 
quiebres, 
#3 y #7 
= mayor 
cambio, más
vitalidad 
Demorar la 
punta del pie
al dejar el 
suelo... 
Elevar éste 
pie más alto, 
con un ángulo
distinto. 
Es obvio 
que ahora, 
tenemos 
más vida. 
Agregar intermedios 
(tengan en mente que
el talón dirige y el pie 
sigue), cuidando los 
arcos. 
Demorar el pie...
Ahora, hagámoslo más 
lleno de vida... 
Hagamos el #3 recto, 
empujando hacia atrás…
... y el #7 recto, 
cuando hace contacto 
con el suelo. 
Ahora, tenemos algunos 
cambios... 
Doblado a derecho... 
o Doblar 
o Estirar 
o Doblar 
(Aunque hasta ahora, 
esto no es en verdad 
muy distinto de cómo 
hubiéramos terminado, 
de haber empezado con 
nuestro Método de 
Contacto). 
Tenemos cambio 
y vitalidad. 
La pierna y el pie 
pasan rápido hacia 
el medio, y se juntan 
al principio y al final 
del paso. 
De todas formas, 
agreguemos 
intermedios... 
Excepto mantener la 
planta del pie chata 
en el #2, y hacer el 
pie chato en el #8, 
como está en el #9. 
Ahora, encontraremos un
método en la locura... 
Esto es lo que Art Babbit 
podría hacer. 
Empecemos por las 
mismas tres poses 
básicas... 
Dejemos la Pose de 
Pase como está, pero 
demorando el pie en 
el número 3, y hacer 
el pie en 7 hacia atrás
nuevamente. 
Demora en #2...
Pie Chato en #8...
... pero ubiquemos el pie del #1 
 hacia atrás. 
Demorar el pie Pie hacia atrás 

 
Esto, es exactamente lo que hace la mímica de la acción real en las próximas dos páginas. 
Ahora, insertemos 
#2, #4, #6 y #8. 
El 2 y el 8 también 
son excéntricos... 
Hacer el #8 
derecho... ¡el 
talón hace 
contacto! 
#6 es un intermedio, 
pero el talón 
dirige el arco. 
El #4 es sólo un
intermedio. 
Hacer el #2 
derecho... ¡y 
no mover el pie!
Esta forma de trabajar y de pensar es la base de las cosas que Art hacía en las caminatas de
Goofy, que ejercieron una terrible influencia sobre los animadores. 
Art siempre dijo: "Cuando tenemos la oportunidad de inventar, ciertamente estamos en el
medio correcto para hacerlo. Eso es lo que nos separa de la acción en vivo, que podemos
inventar". 
Normalmente, 
un pie se eleva 
despacio. 
Luego, se mueve 
hacia el medio 
rápidamente.
Y desciende veloz.
¿Por qué no 
revertirlo? 
Hacer que el pie se 
levante rápido
(#1 a #5) 
Pasar por el medio 
normalmente 
(#5 a #11) 
Y bajarlo lentamente 
(#11 a #15)

---

## Sección 25: Core Concepts & Foundations [Entropy: 0.25]

(Su paso de arranque toma 12 cuadros, el siguiente paso insume 16 cuadros). 
Anticipa la caminata (trazada en medios). 
Ahora en unos, ahora 
levanta el pie rápido. 
Elevar
Contacto
Y despacio, pone el pie sobre él...
El 
descenso 

Y si puede hacer todo eso "en vivo"... ¡cuánto más lejos podríamos llegar en la animación! 
Pose de Pase: 
El Ascenso 
Balancea el pie hacia delante: 
El 
Descenso
Fijo no 
Contacta
Pose de Pase hacia arriba 
Elevar 
los pies 
rápidamente 
Contacto
Y pone el peso sobre él... 
 Pose de Pase hacia arriba

Espaciado de andar normal
No hemos mostrado aún totalmente el espaciamiento y amortiguación de un andar normal. He 
aquí una fórmula de espaciado para el paseo "convencional" en doce pasos. (Despliegue aparte). 
Tomamos velocidad 
mediante el contacto 
y disminuimos 
y amortiguamos hacia
dentro de la posición 
de descanso abajo 
#4 de la bajada y 
tomamos velocidad 
mediante la posición 
de paso #7 
y disminuimos 
y amortiguamos hacia
adentro y afuera 
de la posición alta 10.
Contacto
Abajo
Posición de paso
hacia arriba
Completamente
arriba
Contacto
Amortigua
Amortigua
Amortigua
Parece un 
poco raro 
desplegar 
así pero 
funciona 
muy bien 
cuando 
condensa 
como sería. 
Un paseo de ocho
cuadros utiliza 
exactamente los 
mismos dibujos, 
con sólo 
intercalados 
únicos. 
Vuelta a la Invención 
El trasero se 
retuerce hacia 
afuera. 
Empieza con el pie 
un poco como al 
revés.
El pie
rota.
El pie aterriza 
en la dirección
equivocada. 
Empecemos
ahora a 
retroceder 
las cosas. 
Variación sobre
el mismo tipo
de cosas. 
Alcanza el 
suelo de esta 
manera. 
Intercalado 
en mayor 
primer plano.
Terceros
Terceros
Terceros
Despiece
aparte
¿Qué sucede si 
comenzáramos 
con el 
descenso, 
pero ubicándolo
aún más abajo?
O bien: tal vez,
como Groucho,
la Pose de Paso
nunca se
endereza.

Sigamos haciendo el tonto con el cómo va hacia abajo el pie. 
Abajo
Arriba
Abajo
Arriba
La rodilla se 
vuelve del revés
O esto, para el otro pie. 
Arriba
Abajo
Arriba
La rodilla se 
vuelve del revés
Yendo hacia atrás, con los pies al revés. 
El pie de apoyo rota
Ningún ser humano podría hacer esto, pero resulta convincente... 
De nuevo, podemos inventar lo que no tiene lugar en el mundo real. 
Art babbit dijo… "Una buena, bailarina inventa". No es natural para una persona saltar por el aire, 
hacer una tijera* con sus pies y luego aterrizar sobre sus dedos. Podemos hacer cualquier cosa 
que queramos, mientras la hagamos funcionar, hacerla parecer creíble. 
Vamos a hacer andar a una bailarina "sobre el sitio", en doses. 
Pose Media
La
rodilla
dirige
Pose Media
Pose Media
Pose Media
Pose Media
La rodilla hace un círculo,
la pierna la sigue
(*) N. del t: Se refiere a saltar desde una
posición con los pies cruzados en el suelo, al
modo de las bailarinas clasicas.
Desplazamiento del peso 
El peso se desplaza de un pie al otro en una zancada normal. Cada vez que levantamos un pie, 
éste empuja el peso del cuerpo hacia adelante y hacia el lado sobre el otro pie. 
Contacto
Abajo
Pose Media Arriba
Contacto
Pose Media Abajo
Contacto
Arriba
Planta
el pie...
Y lleva el 
peso hacia 
el lado, sobre
ese pie. 
Se endereza, pero 
la pierna que pasa 
por delante estirada
provoca que el peso
caiga sobre su lado.
Planta el
pie. * 
Planta
el pie...
Y lleva el 
peso hacia 
el lado, sobre
ese pie. 
Se endereza, pero 
la pierna que pasa 
por delante estirada
provoca que el peso
caiga sobre su lado.
*NdT: Esto
se repite o
es ilusión 
óptica? 
Contacto Pose Media Contacto Pose Media Contacto 
He aquí una 
exagerada 
fórmula de 
desplazamiento 
de peso. 
(No desplazar 
tanto en la 
carrera)
Peso sobre su 
pierna izquierda 
Peso sobre su 
pierna derecha 

La linea del cinturón 
Inclina la línea del 
cinturón hacia atrás 
y adelante, a favor 
de la pierna que 
esté más baja. 
Normalmente, la línea del cinturón desciende con el pie que está por debajo,
 y asciende con el pie que está por encima.
Normalmente, 
los hombros se 
oponen a la pelvis 
(pero podemos 
hacer lo que nos 
guste). 

Movimientos del brazo 
Mientras el hombro asciende en la Pose Media,
la mano está en la parte más baja del arco. 
Pose Media
La muñeca 
sostiene 
el arco. 
Arco
La mayoría de las 
acciones siguen 
arcos, generalmente
una acción está 
circunscripta 
a un arco. 
Como se balancean para equilibrar el
empuje de la marcha, los brazos 
tienden a estar en un movimiento 
de péndulo, de un lado a otro. 
La mayoría del 
tiempo, la trayectoria 
de la acción es un arco
o bien algo parecido a
la Figura 8, aunque a 
veces sea angular o 
recto. 
Con la pierna, 
el talón sostiene 
el arco. 
Y sólo por complicarnos la vida, deberíamos recordar que normalmente, gobierna en un andar
convencional que el balanceo del brazo está en su máxima amplitud en la pose de descenso, no
en la pose de contacto. 
Pero por 
supuesto, 
no nos 
bloqueemos 
con esto. 
Abajo Pose Media Arriba 
Máxima 
amplitud
Punto de 
balance 
Los movimientos del 
brazo pueden ser 
amplios o prácticamente
inexistentes.
Para obtener más 
flexibilidad, lleva en 
círculo a esta mano 
todo el recorrido. 
Y a esta 
mano, todo 
el recorrido 
hacia atrás. 
Despega los pies de 
la paralela, tuerce 
los pies y tuerce 
las manos. 
En perfil, no. 
No muevas
mucho las 
manos.
O bien 
Quizás, 
sólo de 
aquí a aquí.
Tuerce
Tuerce
¿Qué tal los brazos
arriba? Como aquí,
en una pose de 
paso elevada.
Y hacia abajo, 
en los 
extremos. 
O lo mismo, 
con una pose 
de paso baja.
¿Qué tal tener los brazos 
completamente arriba en 
los extremos, y los brazos 
completamente abajo 
en la posición de paso? 
(la cual también es baja). 
He aquí un andar airoso haciendo sólo eso, y un montón de cosas de las que hemos estado
hablando: línea del cinturón, los hombros se oponen a las caderas, se inclina y se retrasa la
cabeza, se tuercen los pies, invertimos el cuerpo. 

Para obtener un poco de flexibilidad en un balanceo de brazos, debiéramos arrastrar la mano. 
(La muñeca 
sostiene el arco) 
Yendo de esta forma... ... y volviendo atrás.
Esto nos dará un bonito 
aunque pequeño 
solapamiento de las manos,
en cada final del balanceo. 
Podemos conseguir 
algo más de 
flexibilidad en él, 
dejando caer el 
hombro en la pose de 
paso haciendo un arco
más profundo. 
Deja caer el 
hombro en la 
Pose Media. 
Pero, aquí está
el secreto... 
Cuando vayamos hacia 
delante, quebraremos 
(doblándola) la articulación 
del codo, tanto como nos 
parezca correcto o erróneo, 
y tanto como si pudiera 
doblarse de esa manera, 
como si no lo pudiera. 
Cuando volvamos hacia
atrás lo quebraremos
(doblándola) de nuevo,
aunque yendo de esta
manera luce bastante
normal un "quiebre"
o doblez natural.

---

## Sección 26: Core Concepts & Foundations [Entropy: 0.268]

Por lo tanto, para mayor flexibilidad... 
... al forzar la articulación 
podemos obtener mayor gracia y soltura de 
movimiento a partir de líneas rectas, y no 
tendremos que dibujar personajes como si 
fuesen de goma para ser más ágiles. 
Hagámoslo realmente sencillo, ya que nos lo vamos a encontrar muy a menudo. 
Pose Media
Mejor aún, 
solapa las 
manos. 
Pero... ¿no quedará raro? En la pantalla, no. En el intercalado va a permanecer
probablemente, durante cuatro fotogramas, o así, 1/6 de segundo. Demasiado rápido para
"percibirlo", pero lo "sentiremos". Sentiremos el cambio y el aumento de flexibilidad. 
(Yo lo veo 
como "la 
doble X") 
Alguien le preguntó a Fred Astaire cómo podía bailar y
moverse de esa manera, como nadie en la Tierra*, y él
respondió: "Oh, sólo empiezo por poner ambos pies en el
aire". Pero si analizas a Fred Astaire cuadro a cuadro,
verás que está forzando las articulaciones todo el tiempo,
y por todas partes. 
En este sentido, lo llamaban perspicazmente "El Mickey
Mouse humano".

Aquí tenemos la adaptación de un vistoso balanceo de brazo esplendidamente animado forzando 
las articulaciones como loco. 
Contacto 
Contacto 
Abajo 
Abajo
Pose Media
(Como el 
#3) 
 (Como el 
#5)
Abajo 
Pose 
Media 
Desde el lado: 
La mano hace 
una curva al final
del balanceo. 
Forzar las articulaciones (o
como quieras llamarlo) es un
hábito muy arraigado, según
los expertos. 
"Oh... ¡tienes que hacer eso!
Todo el mundo lo sabe". 
Y vuelve atrás.
 (Como 
el #1) 
Pose 
Media 

Ceñirse a los monigotes 
Pienso que una vez que los dibujos resultan siquiera remotamente interesantes, es difícil 
encontrar después algún encanto o estilo propio, y ver con claridad la estructura de sus 
movimientos subyacentes. Incluso, el mero hecho de añadir un globo ocular parece formar a un 
personaje y librar a uno de la búsqueda de su estructura. De la estructura es de lo que estamos 
detrás aquí; la actuación, los dibujos y diseños bonitos pueden venir más tarde. 
Podemos alterar el timing (la medición del tiempo) del balanceo del brazo, digamos para hacer 
que los brazos se balanceen más despacio que los pies... 
Animamos el paseo en 8´s, lo que tomará cuatro pasos (despiece por separado). 
Pose Media
Ahora, añadiremos los brazos, pero poniéndolos en 16´s.
Así, con los pies en 8´s y los brazos en 16´s, el balanceo del brazo será el doble de largo que
el de los pies. 
Los brazos están de acuerdo con los pies en sus extremos, pero en el #17, los brazos se
"emparejan" de forma antinatural con los del mismo lado. 
¡Este tipo de cosas son muy efectivas para utilizarlas en una carrera! 

Tendremos los brazos bombeando hacia afuera el doble de rápido que las piernas, haremos el 
paseo en 16´s y el movimiento de brazos en 8´s. Abarca un paso (se despliega muy separado 
para mayor claridad) y necesitaremos intercalar más dibujos para mostrarlo. 
Esto necesita intercalados únicos: deben ser en unos a causa de la abundancia de acción de los 
brazos en tan corto espacio de tiempo (esto no funcionaría en una carrera, por la misma razón). 
Extremo 
Extremo
Abajo 
Arriba
Pose Media 
Pose de paso 
del brazo. 
Pose extrema 
del brazo. 
Pose de paso 
del brazo. 
Pose extrema 
del brazo. 
Pose extrema
del brazo. 

Acciones Opuestas 
Una acción opuesta exagerada, como cuando camina un hombre gordo. 
La masa del estómago 
se mueve hacia arriba, 
mientras la masa del 
cuerpo se mueve 
hacia abajo. 
La masa del estómago
se mueve hacia 
abajo, mientras 
la masa del 
 cuerpo se 
 mueve 
 hacia 
 arriba. 
El estómago 
sube, mientras
el cuerpo baja.
Regla
Cuando el personaje va hacia arriba, la ropa, el cabello o las pequeñas cosas blandas y suaves
van hacia abajo. 
De nuevo y exagerando, las nalgas, pechos y el cabello se oponen al cuerpo 
en las ascensos y descensos. 
Arriba
Arriba
Abajo
Arriba
Abajo
Abajo
Pero restringe estas acciones, 
dando sólo algo de movimiento.

Como nos acercamos al fin de estos paseos, vamos a echar un vistazo a lo que se hace al final. 
Toma el paseo de una mujer: 
Las nalgas se mueven 
en la dirección del pie 
más adelantado. 
Normalmente, las nalgas 
estarían centradas en la 
Pose Media, pero retrásalas.
(Despiece) 
El movimiento de la 
ropa se opone 
momentáneamente a
las caderas. 
Cuando éstas se 
mueven, la ropa se 
desplaza hacia el 
lado contrario. 
Retraso 
Retraso 
La falda,
despliega
su vuelo 
más
d
Haz el cabello 
luego, a lo 
último. 
En 12´s 
De nuevo, estamos mostrando esto de forma exagerada.
Todo va en función del gusto por la forma más o menos sutil
en que deseemos usar estos trucos... 
Y recordando que las mujeres
tienden a andar sobre una
línea recta, algo así como un
"andar en la cuerda floja".
A mayor 
cruce del 
pie = 
Forma de 
andar más
femenina 
un "andar
en la 
cuerda 
floja".
Forma 
"normal".
Como lo 
hacen las 
"strippers". 
Y las 
bailarinas...
Cruce recto 
extendido de
las modelos 
de moda. 

Aquí tenemos una fórmula para un paseo saltarín o de rebote: en 8´s. 
El encanto de esto es su "estilizada rigidez". Pero, aunque la inventiva está en ello, es complicado 
prolongar este enfoque. Si no forzamos, solapamos y retrasamos las partes, éstas sólo parecerán 
un trozo de papel o cartón recortado, moviéndose cíclicamente. 
El resto son intercalados rectos. 
En los cincuenta, cuando se produjo un desplazamiento desde el "naturalismo", se inventaron
algunas formas de andar encantadoras, especialmente en niños. A menudo hacían esto: el
personaje daría un paso, para entonces aparecer repentinamente en el aire durante unos
cuatro a seis fotogramas, luego volvía de golpe hacia abajo otra vez, para dar otro paso. 
La pose más
alta en el 
contacto. 
Debajo en la 
Pose Media. 
La pose más 
elevada en el 
contacto.
Se mantiene 
debajo.
Yendo hacia 
abajo
Contacto 
Contacto
Pose Media... 
ni arriba, ni abajo. 
Salto
repentino
Pose
Media 
Hacia 
abajo de 
golpe
Contacto 
Contacto 
Salto repentino
Se mantiene 
durante 
4 fotogramas 
2 fotogramas 2 fotogramas 2 fotogramas
Se mantiene 
durante 
4 fotogramas 
2 fotogramas 2 fotogramas
Se mantiene 
durante 
4 fotogramas 
Pose Media
Además, 
luego podrían 
mantenerlo 
andando 
durante dos o 
tres pasos más,
para luego 
hacerlo saltar 
bruscamente 
otra vez, 
al azar.

---

## Sección 27: Core Concepts & Foundations [Entropy: 0.25]

He aquí la forma de andar de un boxeador con el nivel de flotación de la cabeza, el trasero y la 
pelvis moviéndose activamente de arriba hacia abajo, y de un lado a otro como principal 
característica. La acción del trasero nos da el peso. Pero, y sólo para complicar las cosas, hemos 
hecho los extremos con lo que normalmente sería nuestra pose de paso (el "contacto" es ahora la 
pose de paso). De acuerdo a que no hay reglas, podemos construirlo desde cualquier punto. 
Extremo
Extremo
Pose Media
De un 
lado. 
(en 8´s) 
El trasero 
algo más 
alto. 
Al otro lado 
El pie se planta
sobre los 
dedos.
Ahora vamos a hacer otro 
extremo con el trasero en 
su posición más alta. 
Luego hacemos otro extremo aquí, 
con el trasero en su posición más baja 
y los brazos a su máxima amplitud. 
El trasero 
más alto 
El trasero 
más bajo
Ahora que tenemos los ascensos y descensos, lo juntamos todo y obtenemos el resultado
eficiente que queremos. 

Aquí tenemos una ayuda técnica para planificar un paseo en perspectiva (si queremos ser 
técnicos en ello). 
Horizonte
Punto de 
desaparición
Horizonte 
Dibuja dos líneas: una 
a lo largo y por encima 
de los postes; la otra, 
a lo largo de la base. 
Ambas se encuentran en el 
punto de desaparición. 
Luego dibuja entre ellas otra 
línea (azul) por la mitad. 
Ahora, dibuja una línea 
desde lo alto del primer 
poste que vaya a través del 
centro del segundo poste 
hacia la línea de abajo. 
Ahora sabemos dónde poner el tercer poste,
y todos los siguientes. 
Añade nuestra figura haciendo todas las
posiciones de contacto del pie derecho. Luego,
pon las del pie izquierdo. Y después pon las
poses de paso, etc., la rutina habitual.... 
Pose 
Media
Pose 
Media
Derecha
Izq
Der
Der Der D
D
Der 

A través de la construcción de estos paseos, fórmulas, etc, terminamos con el asunto principal... 
nunca dos personajes andan de la misma forma. Lo más que podemos hacer, es generalizar: 
Una mujer flaca y ligera 
anda como ésta. 
Un borracho 
tiene un 
problema para 
mantener el 
equilibrio: la 
cabeza está 
normalmente 
estacionada, 
eso trata de 
convencernos 
de que no está 
borracho. 
Pero nunca 
permanece 
quieta, y 
siempre se 
mueve un 
poco.
Y una mujer
vieja, quizá 
como ésta. 
Un hombre gordo 
se inclina y apoya 
atrás de forma similar, 
deslizándose
delicadamente, 
como un bailarín. 
Si está 
embarazada, 
como ésta, con 
orgullo de 
madre y mucho
cuidado... 
Las piernas 
ligeramente 
separadas. 
A causa de la
grasa en el 
interior de 
sus piernas, 
tiene que 
mantenerlas 
separadas. 
Ella balancea el peso, tanto como él. El peso
tiene que balancear, excepto en el breve instante
en que nos paramos, y entonces cae. 
Forma de andar de los niños: 
La acción del pie es muy exagerada,
estira la pierna más alto que los adultos.
El timing es 
muy errático. 
Las partes del 
cuerpo cobran 
vida por su 
cuenta y 
tienden a 
moverse de 
forma 
independiente,
pues han 
perdido el 
control central.
Una forma de andar enfadado 
siempre lanza el pie rápidamente
a través y abajo* 
N.T: *No se entiende...
Acentuar abajo,
con violencia. 
La forma de andar 
de un marinero le 
hace mecer el cuerpo
entero de un 
lado a otro. 
(Es estupendo 
retrasar la cabeza).
Los bebés están 
constantemente 
fuera de equilibrio.
Los pies se 
extienden 
separados. 
El tiempo es importante en las caminatas Ken
Harris dijo (como lo hizo Milt Kahl) "Las
caminatas en 12 ‘s, y a partir de esto son
mucho más rápidas o mucho más lentas que en
12 ‘s".
De nuevo, no es como lo ven...
¿es como la persona se siente? 
Triste.
Solitario. 
Contento.
Pensativo. 
Borracho. 
Enérgico. 
Viejo. 
Joven. 
Confuso.
Sorprendido.
Optimista. 
Seguro de sí mismo. 
Enérgico. 
Orgulloso. 
Nervioso. 
Enfermo. 
Enfadado.
Débil.
Cohibido. 
Militarista. 
Deprimido.
Alegre. 
Tímido. 
Tomemos un borracho como 
ejemplo, hay muchos estilos 
diferentes... 
El borracho tonto. 
El borracho lascivo. 
El borracho que se da lástima. 
El borracho alegre, distendido. 
El borracho atlético fuera de 
control. 
El borracho exageradamente 
amable y atento. 
El borracho muy solemne. 
El párroco (ví a un párroco 
caminar por un muro). 
El borracho luchador. 
El sentimentalista. 
El borracho por primera vez, 
etc, etc. 
Yendo escaleras arriba, el 
pie golpea plano y el pie 
retrasado se mantiene 
doblado.
Yendo escaleras abajo, 
se aplasta más que en 
un paso normal. 
Tipos de mirada
sexual hacia mí. 
La pelvis se 
empuja 
ligeramente 
hacia adelante, 
y la parte 
superior del 
cuerpo rota 
como un pato 
sobre su cadera,
andando como 
un pato de lado 
a lado, 
balanceando la 
pelvis hacia 
delante.
Para resumir: 
Formas de dar vitalidad a una caminata. 
La receta 
1. Inclinar el cuerpo. 
2. Utilizar las piernas estiradas en los contactos y al dejar las posiciones
(Ir desde lo recto al doblez, o del doblez a lo recto) 
3. Doblar el cuerpo. Inclinar los hombros y las caderas teniendo los
hombros opuestos a las caderas al girar las mismas. 
4. Dejar caer la rodilla hacia adentro o hacia fuera. 
5. Inclinar la línea de la cintura favoreciendo la pierna que está más
abajo.
6. Dejar caer el pie. 
7. Retrasar el pie y el dedo en el suelo, hasta el último instante. 
8. Inclinar y echar hacia atrás la cabeza continuamente. 
9. Retrasar las partes, no hagas todo el trabajo a la vez. 
10. Contrarrestar gordura, nalgas, pechos. Retrasa la ropa, pantalones,
cabello, etc. 
11. Rompe las uniones. 
12. Muchas subidas y bajadas (por el peso) 
13. Usar timing distinto en las piernas, brazos, cabeza, cuerpo, etc. 
14. Doblar el pié, mantenerlo fuera de la paralela. 
15. Si tenemos una pose de acción normal y alteramos una pequeña
parte, obtenemos algo diferente. 

Quiero cerrar las caminatas con un ejemplo de pavoneo "estilo Milt Kahl". 
En su carrera, él animó a muchos súper optimistas, y enérgicas formas de caminar. 
Yo he adaptado y combinado algunas de ellas en una sola composición (usando una figura 
genérica, no un personaje). Es una maqueta para mostrar el proceso de trabajo de un maestro. 
Desde luego, no proporciono otra fórmula, pero ayuda a entender cómo un maestro trabaja y 
piensa. El cómo empieza desde una simple base con los contactos y los carga de profundidad e 
interés, de la forma en que los construye. 
Y éste es todo el material del que hemos hablado. 
Primero, él hace los
contactos (tomaremos
dos pasos en 12 ‘s). 
Extiéndelo hacia 
afuera, queda 
simpático y claro. 
A la derecha y 
hacia afuera, hay 
mucha vitalidad 
en las posiciones 
de contacto. 
Cabeza 
de Perfil.
Cabeza 
ligeramente 
hacia la 
derecha. 
Cabeza 
ligeramente 
hacia la 
izquierda. 
Brazo
retrasado 
bajo.
Hombros
opuestos 
a las 
caderas. 
Los pies giran 
y están fuera 
de la paralela. 
La línea de la 
cintura se dobla 
hacia abajo, con la 
pierna corta.
El cuerpo gira a 
los lados y gira 
hacia atrás. 
Brazo
adelantado 
alto. 
Y vuelve
atrás.

---

## Sección 28: Core Concepts & Foundations [Entropy: 0.286]

Las poses de paso, a continuación. 
(Esto haría ya una gran caminata, sin siquiera añadir más ascensos o descensos) 
Ahora añadiremos en los descensos. Las posiciones de abajo. 
Observa el 
rápido 
balanceo del 
brazo por el 
medio. 
Pose 
Media 
Cabeza 
inclinada 
hacia 
adelante. 
El ángulo 
del hombro
gira y se 
incrementa.
El ángulo del 
hombro se 
incrementa y 
gira. 
El ángulo del 
hombro se 
incrementa 
y gira. 
Pose 
Media
La unión 
rota.
La unión 
rota. 
La mano se 
arrastra.
La mano 
se 
arrastra. 
La mano 
se 
arrastra. 
Retrasar 
el brazo y
arrastrar 
la mano. 
Descenso
Descenso
Retrasar 
el brazo y
arrastrar 
la mano.

Ahora, colocaremos las poses de ascenso. 
El 
ascenso.
Unión 
rota.
El 
ascenso.
Unión 
rota.
 Pie se
balancea 
hacia 
adentro
Añadiremos los intermedios 
(en tres partes). 
Puedes apostar a que van a ser 
intermedios pensados, no 
mecánicos. 
Ejemplo: 
Con los últimos dos intermedios, 
la pierna derecha no está 
exactamente en el medio, 
el resto si lo está. 
Ahora, la situación está envuelta 
de vitalidad y "cambio". 
"Sofisticado uso de las bases". 
Contacto
El 
Ascenso
La planta 
del pie gira
hacia 
afuera, 
lejos de 
nosotros.
Rodilla 
aún 
alta. 
La
rodilla 
en lo 
más 
alto. 

Hurtadillas
Hay tres categorías determinadas de hurtadillas: 
La hurtadilla tradicional.
La hurtadilla hacia atrás.
La hurtadilla de puntillas.
El cuerpo hacia 
atrás tanto como
alcanzan los pies.
Una media de 24 cuadros por versión para
cada paso, la versión rápida de 16 cuadros
por paso, la versión lenta de 32 cuadros
por paso. 
El cuerpo hacia 
delante tanto 
como aguantan
el peso los pies.
Expresa miedo o malicia,
más o menos opuesta a la
hurtadilla hacia delante. 
El cuerpo hacia adelante, 
tanto como los pies llegan
hacia atrás. 
El cuerpo 
los sigue.
Sobre los dedos y 
juguetón, seguros de 
sí mismo. 
10 cuadros, 12,13,14 
cuadros, todos los 
que queramos. 
Realmente rápido en 
3´s o 4´s. 
Vienen 
bajando
los 
dedos. 
Tipo de 
pose 
contenida
La hurtadilla tradicional tiene una construcción muy interesante. 
Los aspectos principales son: 
El cuerpo va de acá para allá. 
El cuerpo va hacia atrás cuando el pie se
levanta, los brazos se usan para balancearse. 
Cuando los pies alcanzan y tocan el suelo, el
cuerpo está todavía atrás y la cabeza se
mantiene atrás, retrasada un poco. 
Después que los pies tocan el suelo el cuerpo
los sigue yendo hacia delante tanto como el pie
aguanta el peso. Continuando el cuerpo irá
hacia atrás (como en A) tanto como el otro 
pie hacia delante. 
Como en una caminata hay 
tres dibujos importantes, 
dos contactos y una 
interesante posición 
de paso. 
Pose Media
Contacto 
Contacto

Ken Harris nos muestra su fórmula para una hurtadilla lenta. 
Tiene 2 pasos = 32 cuadros = 11/3 de segundo por cada paso 
En dos... pero por supuesto, podrá ser incluso mejor añadiendo intermedios a los primeros. 
Pose Media
Contacto 
Contacto 
Cabeza 
atrás. 
Cabeza inclinada
hacia arriba 
ligeramente. 
Los brazos no se 
oponen a las 
piernas, se 
balancean. 
Generalmente, 
es un pequeño 
movimiento en 
brazos y manos. 
Animar los pies
con espacios 
uniformes. 
Cuerpo y 
cabeza 
Pies 
uniformes
Es un buen ejemplo de cómo contrarrestarlo.
Mientras él se mueve a lo largo, la cabeza va hacia delante y las manos hacia atrás. 
Esto es lo básico, se trabajaría mejor intermediando tres posiciones como ésta, y sin añadir
caprichosas partes de acción interior. 
Por supuesto que podemos añadir lo que queramos
dentro, pero esto hace la función con tres dibujos y los
cuadros. 
Podemos usar arcos o directamente intermedios
mecánicos, funcionará bien. 
Si las manos están abiertas, 
parecería asustado. 

Pero por supuesto, podemos retrasar partes. 
Podría permanecer completamente en los dedos todo el tiempo para aumentar la sensación de
cautela. 
La cabeza va hacia atrás, y
mira hacia abajo. 
La cabeza está aún 
yendo hacia atrás, 
en la pose de inicio.
La cabeza 
continúa hacia 
delante. 
Inténtalo en la vista frontal, 
lo que muestra es lo que está
ocurriendo. 
En la vista en tres cuartos nos
encontramos con problemas 
de dibujo, perspectiva, 
volúmenes, etc. 
Por eso, muchos animadores 
lo hacen de perfil. 
¿Qué pasa con
una vista en 
tres cuartos?
(Es una buena 
idea planificarlo 
primero de 
perfil) 

Aquí una adaptación de una hurtadilla de Bill Tytla. 
Hay cuatro dibujos de planificación, y está en 36 fotogramas – 1 ½ segundos por paso. 
Va de una curva a su opuesto, la recta, vuelve a la curva, a su opuesta, etc. 
Pose 
Media 
Divertido, tan pronto como le echamos
un vistazo, de alguna manera crea
personalidad, llega a ser entretenido o
atractivo, centramos nuestra atención
en la "anatomía" de lo que está
pasando. 
Charles Chaplin dice: "La personalidad
transciende sobre todas las cosas".
Apartado de 
la extensión: 
Extremo 
Extremo 
Posición de 
paso
El siguiente
quiebre o 
Posición de 
paso.
(Como en una 
caminata, 
los brazos-alas 
contrarrestan 
verdaderamente 
a los pies 
aquí) 
Estos son los 
números que 
tenía en los 
cuatro dibujos, 
por eso estoy 
adivinando lo 
que había en 
sus cuadros. 
¡Pero mira qué inteligente es 
este hombre, observa sus 
cambios de forma, la cantidad 
de cambios! Esto es lo que en 
verdad hace. 
Como Ken,
los pies podrían 
ser tratados 
uniformemente.

Después de acabar su primer mes de intensivo entrenamiento en mi estudio en Londres, cuatro 
de nosotros nos sentamos toda la noche y animamos una pequeña sátira para uno de sus 
seminarios. 
Hice esta hurtadilla de caballo como un ejercicio de "sobre animación" que quedó algo graciosa, 
muestra lo lejos que podemos llegar asentándonos sobre las bases (en dos) 
 Hurtadilla en 12´s y 14´s
Aquí están los extremos, 
los quiebres y las posiciones 
medias, redondeé los 
extremos para clarificarlo. 

Aquí vemos una hurtadilla más moderada en 24 pasos, un segundo por cada paso. (Ken Harris 
hizo ésta). Es típico de Ken, no es mucho el material pero hace su trabajo perfectamente. 
Y las extensiones aparte: 
Pose Media
Quiebre 
#3 cabeza y 
cuerpo igual 
a #1 
Pose Media 
Más

---

## Sección 29: Core Concepts & Foundations [Entropy: 0.304]

Y más 
Observa el balanceo de los 
pies rápido por el medio, y 
bájalos con pies de plomo. 
El gran movimiento en el medio indica que debería tener intermedios simples y hechos en uno.
Hurtadilla hacia atrás
Aproximadamente el mismo
patrón que la hurtadilla 
hacia delante, pero hacia 
atrás. 
Los brazos se oponen a las 
piernas, como en una 
caminata. 
El cuerpo va hacia 
atrás tanto como el 
pie aguanta el peso.
Entonces, el 
cuerpo va 
hacia delante
otra vez tanto
como el pie 
llega hacia 
atrás. 
El cuerpo va hacia 
delante tanto como el 
cuerpo llega hacia atrás.

La hurtadilla de puntillas 
Es algo entre una caminata, una carrera y una hurtadilla. 
Los pies arriba y abajo 
como émbolos, tienen que 
ser sobre uno. 
Puede ser rápido en 
4´s = seis pasos por 
segundo o en 
6´s,8´s,10´s,12´s,14´s, 
cualquiera, pero es 
más conveniente en 
un ritmo rápido. 
Aquí está el buen 
conocimiento de la fórmula 
para las criaturas de 
piernas cortas(en 4´s). 
No es demasiado 
problema con un bajo
o con una criatura 
de piernas cortas. 
#9 (como 
el #1) 
Pero con una figura de taller 
con piernas largas tenemos el
familiar problema de 
demasiado movimiento en un
corto espacio de tiempo. 
El pie tiende a "parpadear" 
por debajo, con la pierna 
arriba que deja la impresión 
de estar colgando. 
Por eso para arreglar esto 
tomaremos un poco mas de 
tiempo para la acción: 
Podemos girar la pelvis. 
Podemos variar las posiciones
del ciclo. 
Extremo 
Ascenso Intermedio
Extremo 
Ascenso
Pose 
Media 
Extremo 
Ascenso
Pose 
Media 
Intermedio
Contacto
Contacto
Podemos cambiar las 
siluetas ligeramente 
en todas las fases de 
cada paso, subir la 
rodilla, etc. 

Aquí uno que funciona (En 5´s = cinco pasos por segundo) 
El está arriba en el aire en un dibujo. 
Otra versión que funciona (en 6´s = cuatro pasos por segundo) 
Está arriba en el aire en dos dibujos. 
Extensión hacia fuera:
1er
paso
2do
paso
Extremo
Pose Media
Extremo
Pie 
cae 
Extremo
Extremo
(como
#1)
Pose Media 
Pie 
cae 
Extremo 
Descenso
Extremo 
Descenso
Extremo 
Descenso
Extremo 
Descenso
Contacto
Pierna recta
Pierna recta
Pose 
Media
Ascenso
1er
paso
2do
paso
Cabeza
Cabeza

Podemos contrarrestar algo en una hurtadilla rápida (esto es exagerado) 
De todas maneras esto es una idea, que podemos aplicar de manera reducida para una acción 
cartoon.
Pose Media
Contacto
Contacto
Pose Media
El Ascenso
El Descenso 
Retrasar 
barriga
Mantener
un perfil
ligeramente
diferente
 a
Y el paso contrario: 
Contacto
Contacto
El Ascenso
El Descenso 
Retrasar 
barriga
También
un perfil 
ligeramente 
diferente 
de
Volver a
Ambos pasos: 
Pose Media
Extremo
Pose Media
Extremo
Extremo
Volver a

No tiene que ser así, pero ésa sería la característica distintiva entre una carrera y un paseo. 
CARRERAS, BRINCOS Y SALTOS 
 
Siempre en el paseo, un pie se mantiene en tierra. 
Sólo un pie abandona el suelo en un momento. 
En algún momento de una carrera, ninguno de los pies tendrá contacto con el suelo 
en la posición #1, #2, o #3. 
Tomé un paseo
rápido en 6’s si
un pie está en 
el suelo todo el
tiempo, no 
tenemos una 
carrera,
tendremos un 
paseo muy 
rápido (Cuatro
pasos por 
segundo). 
Pero 
simplemente, 
tomé el #6 
para que 
quede en el 
aire, y 
obtendremos 
una carrera. 
Extremo 
Extremo
Baja 
Sube
Pose Media
Altera el pie 
en el #7.

Aquí sucede la misma situación con algo más de vitalidad, más delgado, el ala de los brazos es 
más grande, pero aún permanece con los pies en el suelo, para que un fotograma "normal" corra 
en 6’s (un paso por segundo). 
Podríamos tomar la misma cosa, y bajar la posición en #3 y el derecho al lado del #4. 
Contacto 
Contacto 
Baja
Sube
Pose Media 
Baja
Sube
Pose 
Media 
Aquí es similar a las proporciones de un "dibujo animado". 
Una carrera de dibujo animado en 6’s, pero con los pies en el aire en dos posiciones, más el
violento balanceo del brazo. 
Contacto 
Contacto 
Baja, pero
no mucho
Alto,
pero no 
mucho
Pose 
Media
Intermedio
Intermedio
Los brazos están más 
extendidos. 
Pies más altos

Otra carrera en 6’s. 
Aquí, la versión "real" de lo mismo. 
Noten la acción del brazo reducida, con apenas algún movimiento arriba y abajo del cuerpo, 
aunque ambos pies está en el aire por dos fotogramas. 
Con las carreras podemos hacer todo lo que hemos hecho con las caminatas. 
La cabeza puede subir y bajar, ir de lado a lado, hacia atrás y hacia adelante. 
El cuerpo puede doblar y torcerse en direcciones opuestas, los pies entran y
salen, etc. 
Pero nosotros no podemos hacer tantos cambios, porque no tenemos tantas
posiciones para hacerlo, debido a que la carrera es más rápida (un corredor en
12’s podría correr en 6’s). 
Pie en Casi contacto 
 Avanzando/Empuje
Extremo 
Extremo
Sube
Baja
Pose Media
Reglas en una 
carrera. Cuando 
levantamos el 
cuerpo, el aumento 
de posición de la 
cabeza es de sólo 
media cabeza o un 
tercio de cabeza, 
nunca una cabeza 
entera… eso sería 
mucho. 
Por supuesto, las carreras tienen que ser en
Unos, debido a la cantidad de acción que
existe en un espacio tan corto de tiempo. 
Como en las caminatas, podemos encorvar
el cuerpo, hacia un lado u otro según que
pie este levantado y mantenerlo recto en la
posición de paso. 
La cabeza se mueve ligeramente arriba 
en la posición del paseo
Cóncavo
Convexo
O podemos torcer el cuerpo indirectamente 
en los extremos, para lograr un efecto 
cómico. 
O como en un paseo, lo podemos variar
teniendo el cuerpo bajo en la posición
intermedia, pero todavía podemos tratar a
los pies de la misma manera. 
Y los hombros 
se oponen a 
las caderas. 

Tomemos una carrera de dibujos animados tradicional (extienda separadamente). 
Podría estar en 4’s
o en 8’s en los 
intermedios. 
Para un paseo 
con más vitalidad 
y más acción, 
extienda una 
pierna hasta que 
quede recta. 
Y empuje hacia 
delante, con la 
pierna recta. 
Podemos planear 
una carrera en 
cualquier posición.
Empiece con los 
contactos como 
extremos. 
O empiece abajo, 
en las posiciones 
como extremos. 
O empiece con la 
posición de los 
pies separados,
en áreas como 
los extremos 
(o empiece con un
avance adelante). 
En 4’s 
En 8’s 
Y empuja también 
con la pierna recta
Extremo 
Contacto
Extremo 
Contacto 
Pose
Media 
Sube
Baja
Extremo 
Subiendo 
Extremo 
Bajando
Arriba
Pose Media
Contacto
Extremo
Subiendo
Extremo 
Bajando 
Arriba
Pose Media
Contacto 
En una carrera rápida (digamos, 4's) el dibujo #5 no debe
ser exactamente la misma silueta. Cambie el #1 de algún
modo, haciéndolo más arriba o más bajo. 
En una carrera rápida, las
posiciones deben solaparse,
para ayudar a llevar el ojo. 
(Extensión fuera) 
(Se solapan así)
En una carrera "normal", los brazos (como en una caminata) 
se oponen. 
Podemos 
tener 
algún 
pie
desprendido en una carrera
rápida, pero no en un pase. 
Aquí tenemos un cliché,
(una pierna delante de la otra). 
Pero para variarlo, ¿tenemos las piernas 
precisamente opuestas a la carrera normal.
Dejando 
el cuerpo 
fuera del 
suelo. 
Aquí tenemos cuatro dibujos en una posición, 
corriendo en forma normal. La Pose Media es
empleada abajo, incluyendo los brazos. 
Y en la pose del medio, la cabeza
y el cuerpo más adelante (pero 
no demasiado). 
Abajo 
Pose Media
Arriba
Abajo
De un 
estiramiento 
a la Pose 
Media. 
Puede haber un gran apoyo 
hacia delante.

---

## Sección 30: Core Concepts & Foundations [Entropy: 0.25]

En realidad, 
la figura corre más rápido. 
Él se apoya más adelante, y no tiene 
que estar en equilibrio todo el tiempo. 
 
Obviamente, 
podemos llevar las cosas mucho más allá. 
Aquí es una carrera en 6's, 
(planificada desde la extensión de la posición de los pies). 
Debido a que las piernas son muy largas, necesitan por lo menos seis posiciones para que
funcione, hay que mantener el talón en un arco. El talón guía, los dedos del pie siguen al
talón. 
Pose Media
Arriba
Abajo
Como se acerca este Uno
a un Seis en un dibujo de
una carrera. 
Solo cuerpo 
Abajo 
Solo cuerpo 
Interesante… 
Art Babbitt sentía que el fotograma seis realmente era una mejor carrera que un dibujo de
carrera en cuatro o cinco, y Ken Harris, el máximo exponente de la acción rápida en Warner,
siempre prefirió hacer las carreras en 6’s y 8’s. 
Breakdown
Arriba
Abajo
Breakdown 
Breakdown
Aproximadamente
iguala la pierna recta.
Aproximadamente 
iguala la pierna recta.
Sobre los brazos? ¿Ellos se mueven de un lado a otro, giran violentamente? 
¿Se balancean en el aire con languidez? ¿El balance en qué lado 
está? ¿Apenas se mueven?
Todavía podemos probar un movimiento de brazo
restringido. El brazo se opone a la pierna, pero el
movimiento se restringe. 
En un cliché o una carrera estándar,
los brazos (como en una caminata)
están opuesto a la pierna. 
Señalamos
que tienen 
que girar los
brazos. 
Restringido en la carrera de una mujer. 
Con el brazo doblado en los codos… 
Muy restringido. 
¿Viste 
esto? 
En una carrera muy rápida, 
corremos el riesgo de mover demasiado los brazos. 
Puede ser demasiado rápido y confundirnos. 
La acción de la pierna debe predominar. 

Que tal columpiar los brazos de lado a lado y forzar la perspectiva. 
Ambos pies 
orientados hacia
adelante. 
Y ambos pies 
se orientaron 
alejándose. 
Esta es una carrera enfadada en 8's (tres pasos por segundo) las necesidades de tiempo para
acomodar el brazo salvaje y la acción de la pierna. 
Pose Media 
Pose Media 
Igual
que 
Igual
que
Igual
que

¿Cómo variar cada paso a otra posición para que progrese la carrera la carrera? 
Tenga en cuenta la otra posición al bajar el paso, aunque ambos pies están pegados a tierra. 
Pose Media 
Abajo 
Pose Media
Arriba
Pose Media 
Abajo
Pose Media
Arriba
O cuando hicimos un paseo, tenemos los brazos que se mueven de arriba hacia abajo dos veces,
tan rápido como los pies. 
Nosotros 
hacemos una 
carrera en 8's
ponga los 
extremos del 
brazo en #1 y
en la posición 
#5 y o #9 
(en 4's). 
Contacto
Contacto 
Pose Media
Más alta
Los extremos del 
brazo coincidirán 
con las piernas 
en #9 y #13, 
pero regresarán 
normalmente para 
contraponerse 
las piernas 
en los próximos 
extremos #9 y #17.
El arco del 
movimiento en el 
brazo tendrá que ser
restringido desde 
que está moviéndose
de arriba a abajo 
cada cuatro 
fotogramas (seis 
veces por segundo).
 
Podríamos hacer una
carrera en Doses, y 
ubicar la acción del 
brazo en 6’s (cuatro 
movimientos arriba y
abajo en un 
segundo), sería 
muy eficaz. 
Contacto Pose Media Contacto
Pose Media Contacto

Paradójicamente podríamos hacer una carrera, y hace que los brazos, fueran el doble de lento 
que los pies. 
 
 
También la espalda va de cóncava a convexa, los pies se retuercen y el brazo y la pierna son 
bastante diferentes.
Pose Media del brazo 
Pose Media del brazo
Podríamos 
hacer la 
carrera en 8’s 
y tener los 
brazos que 
giran en 16’s. 
También
podemos 
apoyar el cuerpo 
hacia atrás sin balance, 
como un segmento, y girar 
los brazos para el equilibrio.
Podemos girar 
los brazos 
en un gran 
arco, porque 
tenemos el 
tiempo para 
hacerlo en 
favor del 
timing del 
brazo 
delantero, para
el balance. 
Aquí una carrera de cinco dibujos.
Mostrando cómo podemos variar las siluetas en una carrera rápida. 
De nuevo, para que el ojo no lo lea simplemente como la misma pierna
y un brazo yendo alrededor. 
El brazo 
NO contrapone 
al pie en #17 
Extremo 
Extremo 
Pose Media 
Arriba
Contacto 
Extremo 
Igual a 
Extremo 
Arriba
Contacto
Pie
retorcido
cabeza 
baja 
Pie
retorcido
Culo
bajo 
Pie
retorcido
ninguna de 
las posiciones “simetricas” 
tienen la 
misma 
silueta 
Pie
retorcido
Pie 
retorcido
Culo
bajo 
Pie
retorcido

Aquí una carrera al trote, en 6’s. 
Debido a que esta carrera es ligeramente más lenta que la anterior. Más salvaje en 5’s porque la 
longitud de los pasos largos está muy reducida (ambos pies están en el aire simplemente un 
fotograma). Las siluetas convexas pueden ser más semejantes (todavía es diferente). 
Los pies se tuercen y los brazos se mueven arriba y abajo alrededor de un círculo pequeño. 
La cabeza apenas va de arriba abajo. 
 
Una muchacha joven podría correr en 8’s. Acción reducida, con sólo un dibujo teniéndola en el
aire. 

Tome a un hombre gordo que corra en 6’s. 
 
Allí la partida de arriba a abajo es con mucho peso. Porque él es tan pesado que al bajar la 
posición, inmediatamente sigue la posición arriba. Entonces él tiene que alzarse por encima de los 
próximos cinco fotogramas, para caer de nuevo. Entonces su cabeza se apoya hacia adelante para 
ayudar a empujar arriba. 
Como una motocicleta, se apoyan en el giro (dependiendo de la velocidad). 
Una cosa importante, cuando un corredor ronda una esquina, se apoya hacia el centro. 
En la dirección del giro.
Porque es pesado y apenas 
se despega del piso. 
Los pies pueden 
tomar todas clases 
de libertades, pero 
el ojo seguirá al 
cuerpo. 
Los pies pueden
cruzar, pueden 
patinar o 
deslizarse. 
Llévelo con 
las caderas.

Alguien dijo que la persecución es una invención que es orgánica en las películas. Hay miles de 
persecuciones en los dibujos animados que producen interminables e inventivas variaciones en 
las carreras. 
Las carreras rápidas son más convenientes
para figuras pequeñas que necesitan menos
posiciones para funcionar por menos tiempo
debido a la sobre posición. 
(en 3's en 4's) 
Puede estar en 
4's pero 
generalmente
(en 5's, en 6's, 
en 7's, en8's
Y el más largo necesita más tiempo 
para funcionar, uno o más posiciones 
para ayudar al ojo. 
La fórmula de 4 dibujos para correr
Eficaz para figuras cortas y de pies largos. 
Éste es muy rápido (6 pasos por segundo) no hay bastante tiempo para girar los brazos
violentamente alrededor, lo mejor es estirar los brazos hacia delante. La acción de la pierna
trabaja bajo y detrás del cuerpo (OK para que resbalen los pies). 
Muy pequeño de arriba a abajo en la cabeza y cuerpo. 
Y de nuevo, nosotros debemos variar
las siluetas ligeramente para ayudar 
al ojo a leer ambas piernas. 
Importante conseguir 
un contacto recto de 
la pierna aquí.

---

## Sección 31: Core Concepts & Foundations [Entropy: 0.304]

Los dibujos de las variaciones de 4 carreras. Este uno es planeado del aire, todavía posiciona 
el mismo modelo básico como la fórmula precedente. 
El cuerpo va de convexo a cóncavo. 
Aquí los unos son salvajes, con los
balances del brazo. 
Planeando adelante las posiciones, pero todavía se
basó en la fórmula del modelo. 

Yo hice este ciclo de correr en 4’s, está planeado avanzar de #1 y 5. 
Podría tener que efectuar con un pedazo más arriba y abajo y podría estirar el cuerpo pero la 
acción de la pierna lo lleva. 
Es un ciclo que he vuelto a dibujar el brazo con la cola de la cometa y animaré la perspectiva del 
suelo después. 
A propósito de los ciclos. 
 
Los ciclos largos son grandiosos. Los ciclos cortos obviamente se leen también como ciclos. 
Pero si tomamos varios pasos largos con las variaciones en los extremos y las posiciones de paso, 
etc. Entonces conectamos atrás a #1, deteniendo o retrasando la lectura del ojo, se leen como un 
ciclo. 
Los 3 dibujos de carreras 
= 8 pasos por segundo! Nosotros no podemos hacerlos más rápidos que esto porque: 
Así que necesitamos encontrar 3 piernas que trabajen alrededor. 
 
En la práctica, funciona así. 
Para hacer una rueda o un rayo parecen correr en un 
círculo, necesitamos un mínimo de 3 posiciones de dibujos. 
¿¿¿¿¿¿Dos costumbres lo hace?????
Apenas parpadean. 
Hay innumerables variaciones en esto. 
Básicamente se consigue que los 3
dibujos vayan alrededor.
Por supuesto que funciona mejor con figuras cortas tipo cartoon. 
Pero todavía funcionará con una figura más alta. 

Aquí está la versión estándar para la acción extendida de la pierna en una carrera de 4 dibujos. 
Y para la figura más grande. 
Una variación, pero todavía en el mismo modelo. 
¿Y cuál 
detenemos como
quiebre? 
Tengo 4 dibujos 
para un paso. 
Y tengo 3 dibujo 
para el otro.
No hay realmente una posición de paso aquí, 
era los favoritos en cada extremo. 

Y nosotros podemos ir aún más rápido. 
 
Nosotros podemos usar 3 posiciones para el primer paso largo y sólo dos para el próximo. 
Aquí están las primeras 3 posiciones, con dos posiciones intermedias #2 y #3. 
Abajo 
Extremo
Permite hacer 
este extremo 
superior que #1. 
Extremo 
Contacto 
Contacto 
Entonces tome el extremo #4 y sólo haga uno entre él y el extremo #1. 
(Y hace el
mas alto) 
Extremo 
Extremo
Vuelta 
al
Mas alto 
Esto nos da 
virtualmente 10 pasos
en un segundo. 
 (9 realmente) 
muy rápido. 
Contacto 
Contacto
Nosotros conseguimos: 
Contacto 
Contacto
Contacto
Vuelta 
al 
Y podemos cambiar de un lado al otro el paso más corto o el más largo.
Los 2 dibujos de Carrera 
La carrera más rápida posible: 
(Por lo menos con una película que corra a 24
fotogramas por segundo) = 12 pasos por segundo. 
En los 40’s el director Tex Avery puso los límites,
desafiando la gravedad inventivamente, partidas rápidas
y más rápidas para separar sus segundos en gags y
buscaron ir 2 dibujos de carreras en los que trabajaron. 

Con una 2 dibujos de carreras. 
El problema con la acción de la pierna va flickear y parecerá que son sólo 2 dibujos mostrándose 
más o menos enseguida. 
Una imagen 
doble en la 
pantalla. 
Pero todavía quisieron conseguir la velocidad humanamente imposible. 
 
Una solución es no poner la posición de paso de las piernas en el medio, pero a favor de que las
dos piernas se cierren alternadas… 
Para que el ojo lea los dos dibujos y salte el gran vacío. 
Y el peso, los pies productivos también son juntos bonitos. 
Muy diestro! 
Y es la misma cosa vista de atrás o vista de frente. 

La misma idea trabaja bastante bien en una vista ¾.
Pero para una vista lateral con las piernas más largas es mejor revertir a
una carrera de 3 dibujos. 
 
Pero de frente o de atrás el segundo dispositivo de dibujo trabaja
increíblemente bien. ¡No es posible, pero creíble… 12 pasos en un segundo! 
Así que, la posición de paso real se omite (implícito) por el segundo cierre
que dibuja juntos a cada fin. Y el ojo salta al espacio dónde la posición del
paso sería normal. 
La misma cosa puede ayudar a lo
largo solapando formas contrarias. 
Otra manera de hacer 2 dibujos corriendo es seguir variando las siluetas cuando
avanzamos, entonces el ojo lo lee como una clase de lucha convincente. 
Otra táctica es revolcar los brazos frenéticamente 
alrededor, progresando el cuerpo y la cabeza 
adelante cuando ella va, o al revés desviar el ojo y
tomar la maldición de 2 dibujos flickeándolos 
(parpadeando) en al acción del pie. 
La cabeza podría entrar un círculo firme que usa
un mínimo de un dibujo para hacerlo, y esa
acción del círculo también podría progresar
adelante o atrás. 

A propósito aquí una sugerencia de un modelo para un brazo que se revuelca durante una 
carrera. (Si es una carrera en doses, los brazos se agitarían el doble tan lento como la carrera). 
Nosotros podemos agregar más posiciones Blur (difuminado). 
Encontré que dos fotogramas difuminados pueden usarse en toda clase de acciones, para suavizar 
las cosas. 
Sobre todo cuando la acción es cerrada a la vez, actúa como una suerte de barniz. 
Las uniones 
se rompen.
Las uniones 
se rompen.
Para una última variación en una carrera de dos dibujos. 
La posible carrera más rápida podemos entrar en difuminados. 
Podemos tener simplemente dos dibujos (en unos). 
Pero si es bastante eficaz filmar estos dos fotogramas difumados 
para que los dibujos estén en Doses para dos fotogramas 
cada uno, pero suavizados por el difuminado. Disuelva 
 al dibujo. 
 
 Y disuelva 
 el segundo dibujo en... 
 
El resultado es que cada 
fotograma es un 50/50 
exposición de la imagen 
doble.
 
Fotograma 1 está enfocado 
Fotograma 2 está 50/50% 
Fotograma 3 está enfocado 
Fotograma 4 está 50/50% 
Fotograma 5 está enfocado 
Etc, etc, 
= da un efecto de suavizado blando.

RESUMIENDO LAS CARRERAS: 
1. La carrera siempre es en unos (salvo el segundo fotograma, que disuelve
el dispositivo que es sólo un truco. 
 
2. Podemos hacer todo los paseos excepto reducido, aproximadamente por la
mitad. 
 
 
3. ¿La cabeza está moviéndose de arriba hacia abajo? 
 ¿O está oscilando de lado a lado?

---

## Sección 32: Core Concepts & Foundations [Entropy: 0.25]

4. ¿Las piernas están moviéndose de arriba hacia abajo? 
 ¿O están avanzando ampliamente hacia adelante? 
 
5. ¿Están los brazos a ser confinados? 
 ¿Está el cuerpo de abajo tieso? 
 ¿O se están azotando alrededor, en una extensa acción? 
 
6. Qué hace la línea del cinturón? 
 
7. Debemos gastar más tiempo en el aire? 
 ¿O gastamos más tiempo en la tierra? 
 
8. ¡Debemos ser inventivos, mientras nos atrevemos a realizar cambios! 
 
9. ¿Claro entonces, quién está corriendo? 
 
10. ¿Claro, qué ellos están corriendo? Y con qué propósito… 
Tendrá un efecto dramático en la carrera.
¿Un gordo? 
¿Un viejo? 
¿Una persona delgada? 
¿Un joven? 
¿Un atleta? 
¿Un descoordinado? 
¿Una solterona? 
¿La reina del glamour? 
¿Un policía? 
¿Un gángster? 
¿Un cojo? 
¿Un obispo? 
¿Un empresario? 
¿Un ladrón? 
¿Un niño? 
¿Un ebrio? 
¿Un hippie? 
¿La reina de Inglaterra? 
La Receta

Aquí una extensión (la carrera, salto, salto, y salto) en las próximas seis páginas (todo en Unos). 
Esta vieja señora se parece al trozo de mapa de un camino animado, pero su acción se siente 
correcta con los elementos esenciales todo lo que tenemos que hacer es hablar sobre. 
 
Primero construimos su carrera de arranque, en 4's, empezando con los contactos #1, 5, y 9. 
La salida de la carrera de una persona vieja muy contenida, como un ex-atleta. Su cabeza va
de arriba abajo y alrededor de en un círculo firme (la punta de nariz) 
y su acción de la mano, el extremos #4 y 8 ( pica adelante) 
 como un boxeador. 
 
Habiendo funcionado el cuerpo, cabeza, pierna y acción del brazo, agregamos la coleta
meneando y acción de la barbilla y pechos viejos agitándose como de costumbre, haciendo
una cosa en un momento. 

Ella va más de arriba abajo cuando toma los pasos más grandes. 
Y ella va más bajo cuando ella prepara saltar… 
Dicho sea de paso. 
Una regla simple: 
205
207
Necesitamos cinco dibujos
para sacar una figura 
fuera de la pantalla, 
o meterla en la pantalla, 
o atravesar la pantalla. 
Esta anciana se parece un poco a una
figura 
para 
una 
lección 
de 
caminata
anatómica. Pero ella es una fórmula para
un pato/ratón/conejo/gato. 
Ella es el estándar de la forma de pera de
los años 40 en Hollywood, pero con rodillas
y codos, y con el pelo sobresaliente, etc.
Existe un contraste entre las partes blandas
y duras. 
Aquí hay un patrón de su salto femenino.
Corre y salta con su pie izquierdo y aterriza con el mismo pie izquierdo. 2 cuadros
después su pie derecho aterriza y salta con él y aterriza con el mismo pie derecho.
Inmediatamente apoya el pie izquierdo y salta con él, aterriza con el mismo pie
izquierdo, luego lo mismo con el derecho, etc. 
(Su cuerpo se mantiene girando sobre sí mismo). 
Contacto Contacto 
Contacto
Contacto 
Contacto
Contacto
Contacto
Contacto 
Contacto 
Contacto 

 
SALTOS
Un salto es dos rebotes en un pie.
Hay muchos tipos de saltos pero el básico es: 
Paso-salto, paso-salto, paso-salto, paso-salto, etc. 
Cuando caminamos, nuestro pie patina un poquito. 
Paso 
Salto
Paso
Patinada
Damos un paso y saltamos en un pie.
Luego cambiamos y saltamos con el otro pie. 
Generalmente, nos toma el doble de tiempo en el paso que en el
salto. 
O podemos saltar ampliamente como el salto de la anciana (Saltando en 16´s, en unos).
Bajas en
un pie. 
Y saltas aterrizando
en el mismo pie. 
Luego bajas con 
el otro pie. 
Y saltas aterrizando 
en ese pie. 
Etc..
Muchas cosas pueden pasar dentro de la acción. Movimiento de brazos, cabeza, etc. 
Hay tantas variaciones, diferentes tipos, tantas posibilidades… 
Una niña saltando la cuerda usa un salto doble, con acentos muy definidos. 
Un boxeador saltando la cuerda difícilmente se eleve del piso, 
apenas hay movimiento. 
Hay un doble rebote en cada pie, muy pequeño, muy fluido. 

Digamos que queremos hacer una caminata de pasos delicados
Queremos que la figura de un paso y un salto, 
cambie el pie, paso y salto, cambie pie, 
paso y salto, etc. 
Actuándolo (que lo hice, saltando alrededor 
de la habitación para crear esto) 
¿Qué hacemos primero? 
Respuesta: los Contactos. 
¿Cuáles? Puede haber varios... 
Respuesta: Los importantes. 
Como si fuera una caminata normal, 
hagamos las dos posiciones iniciales 
de contacto. 
Bien, ¿cuál es el tiempo? 
Respuesta: Para acomodar los saltos, 
hagámosla en 24 cuadros (Un segundo 
por cada zancada) 
Bien… y ahora, ¿qué? 
Respuesta: Bueno, tenemos 24 cuadros. 
Pongamos los dos siguientes pasos 
apoyados. Hagámoslo 8 cuadros aparte, 
eso nos dará tres contactos por segundo. 
(Que es casi lo que me dió cuando 
salté por la habitación) 
Olvidemos la acción de los brazos, por ahora. 
Bien, ahora todo lo que tenemos que 
hacer es colocar las posiciones de paso 
entre cada contacto... 
Pero, esperemos un minuto, seamos 
ingeniosos, quebremos la acción sólo 
un poquito. Hagamos que el brazo se 
balancee a su posición más extrema 
en las segundas posiciones de 
contacto #9 y #33. 
Eso convertirá a los contactos #17 y #41 
las posiciones de paso para los brazos. 
Bien, ahora ponemos las posiciones de los 
pasos. Naturalmente, irían un poco hacia 
abajo entre cada contacto. Y eso nos 
da tres bajadas por segundo, ofreciéndonos 
un triple rebote durante cada zancada 
entera… simpático. 
Ahora todo lo que tenemos que hacer es 
colocar intermedios inteligentes amortiguando en 
cada extremo el balanceo de los brazos. 
Esto funciona muy bien en Doses, pero 
podemos pulirlo aún más agregando Unos. 
Hacemos el 
primer paso 
apoyado. 
Contacto 
El pie frontal
toma medio 
paso.
El pie trasero 
toma medio 
paso.
Contacto
Abajo 
Abajo
Brazos en sus extremos 
Brazos
en
posición
de paso 
Ahora hacemos 
el contacto 
del pie contrario. 
Y vuelta
a
Igual
a
Contacto
Contacto
Contacto
El pie frontal 
toma medio 
paso
El pie trasero 
toma medio 
paso
El pie frontal 
toma medio 
paso
Brazos en sus extremos
Brazos
en
posición
de paso 
Contacto
Contacto
Abajo 
Abajo 
Abajo 
Abajo 
Además,
alteramos
el ángulo
de la
cabeza
en el
primer
tercio de
la caminata,
para hacerlo
más flexible.
Contacto

---

## Sección 33: Core Concepts & Foundations [Entropy: 0.5]

Podemos alterar el timing de un salto si tuviéramos esto. Un salto es como una danza rítmica, 
como una danza caminada. 
SALTOS
Él llega, se estira, aterriza y vuelve a correr. 
Existe una anticipación, pero no dura mucho. 
salto 
cambio de pie
salto 
salto 
salto
salto
salto
salto 
salto
salto 
salto 
salto 
salto
salto
salto
salto 
salto
cambio de pie
cambio de pie
cambio de pie
cambio de pie
cambio de pie
Pero para cambiar levemente el ritmo, podría ser:
En un salto largo la persona empieza con una carrera, y mientras corre trabaja
en la anticipación. (Es bueno que la columna se venga manteniendo torcida). 
Algo parecido sucede al saltar un obstáculo. El corredor avanza, pero se
detiene lo bastante cerca como para saltar el obstáculo. Muy parecido a un
caballo en una carrera. 
Anticipa la bajada. 
Adelantando la cabeza,
lo ayuda a pasar de lado.
Se separa para aclarar. 
Corre 
Sale
Se estruja al
aterrizar
Baja para 
subir 
Va hacia arriba
para bajar 

Consigue presionar todo lo que puedas dentro de los cuerpos. 
Existe una vieja máxima de la época dorada de la animación: 
Cuando creas que hayas ido lo bastante lejos… ¡ve el doble de lejos! 
Luego, ellos decían… "Si es demasiado lejos, siempre puedes volver atrás más tarde". 
Bien, jamás ví a nadie que volviera atrás. 
Siendo conflictivo, yo diría… "Bien, siempre puedes incrementarlo más tarde". 
De cualquier modo, ayuda para obtener esa presión sobre los cuerpos. 
Un salto al estilo Cartoon como éste funciona bien, la acción de los brazos es buena, las piernas 
están correctas. 
 Quebrar ayuda a dar más acción dentro del salto. 
EL PESO EN UN SALTO
Para evitar flotar, y dar peso: 
Si una persona salta en el aire, tenemos que 
tener acción dentro de la acción general. 
Conseguir que los brazos avancen. 
O que avancen los pies. 
Dentro del salto general. 
Esto ayuda a que tenga peso, y evite flotar. 
Pero retrasemos una de las piernas.

Tomemos dos saltos desde la posición inicial: 
Ambos tienen el mismo tiempo, un segundo y medio para hacer el salto. 
Es más fácil demostrar esto 
con un personaje en 
proporciones estilo Cartoon. 
Este primer salto es en Doses. 
(Pero por supuesto, se 
pueden agregar Unos 
para "barnizarlo"). 
No hay nada de malo en él, 
funciona bien. 
Me gusta porque no está 
"sobreanimado".
Es simple, claro y sólido. 
Ahora, relajemos un poco 
las cosas. 
Podemos ir un poco más allá 
si planificamos en unos 
y agregamos: 
Más elasticidad. 
Más compresión. 
Retrasamos partes. 
Revertimos más los brazos. 
Agregamos acción secundaria. 
La camisa, y cualquier cosa 
extra. 
El resultado es mucho 
más fluido y suelto. 
Todo es una cuestión 
de gusto. 
Es lo que te gusta y que 
tanto o que tan poco 
utilizas estos recursos 
para obtener tu resultado. 
El #10 se percibe 
pero apenas se ve. 
Se podría 
retrasar 
 un pie. 
De nuevo, el 
#20 se percibe
pero apenas 
se ve. 
(En Doses)

1887 Edward Muybridge "HUMAN AND ANIMAL LOCOMOTION" 
Los libros de Muybridge son un tesoro escondido de información sobre la acción. Nunca hubo algo 
parecido desde entonces. Fotografías de la acción ubicadas en grillas, nos permiten ver donde 
están las subidas y bajadas en las diferentes partes de un cuerpo. 
FLEXIBILIDAD 
Tal como lo veo, existen 2 grandes defectos de animación. 
O tenemos el efecto "King Kong" 
Donde todo se mueve 
En la misma cantidad 
O
Todo es relampagueante 
Por todos lados 
Por lo que 
Queremos tener una imagen estable 
Y aun tener flexibilidad 
Y
Así es como lo conseguimos: 
Los siguientes recursos están garantizados para entrenar, desentumecer y dar la "chispa" y 
vitalidad a nuestra realización mientras mantenemos la figura estable y sólida 
Ya habíamos introducido algunos de esos recursos con Andar y Correr, pero quiero tratarlos cada 
uno por separado y profundizar en ellos. 
 Primero, 
El BREAKDOWN
La gran manera de conseguir flexibilidad es donde vamos a situar 
 El dibujo de breakdown 
 O la posición de transición 
 O la posición media 
 O la posición intermediaria. 
 (o como quieras llamarla) 
Entre dos extremos 
¿A dónde vamos en el medio? ¡Crucial!. Como hemos visto en Caminar, le da al personaje el 
movimiento. Es una posición de transición y donde la pongamos es lo importante. 
Es el secreto de la animación, ¡ya te digo! 
Interrumpe las cosas justo cuando vayan de forma aburridas de A a B. 
Introduce algo mas interesante en la ruta de A a B. 
Emery Hawkins. Un maestro animador del "cambio", me dijo: 
 "Dick, no vayas de A a B, 
 Ve de A a X a B 
 Ve de A a G a B 
 Ve a algún lugar más en el medio". 
Una simple y poderosa herramienta: 
La primera vez que me puse en ello fue trabajando con Ken Harris, cuando cortaba mis dibujos, o 
pedazos de ellos y los colocaba en sitios diferentes. 
Terminé por sentirlo tan fuertemente (el tema del breakdown) que durante años estuve tan 
desvariado y majareta que podría haber escrito todo un libro sobre el asunto. 
Tomemos nuestros
2 extremos de un
hombre que va de
feliz a triste.
Pon en la posición
media lo que iría
según la lógica.
ok, pero pesado.
 EXTREMO BREACKDOWN EXTREMO 
Bien, vamos a
algún lugar más
en medio.
Podemos incluso
Mantener la misma
boca y desechar
el cambio.
O el converso -
adelantando.
El cambio.
Mantengamos
la misma boca
Pero empujándola
hacia arriba.
Mantener la misma
boca pero cayendo.
Tomando la boca
infeliz y subiéndola
Enderezando y
Subiendo.
Enderezando
y bajando?
= más interesante,
más cambio.
= cambio mas rápido,
mas vitalidad.
= infelicidad
más rápida.
= afectaría a las
mejillas y a los ojos.
= distendería la
cara estrechando
las mejillas.
= un cambio
totalmente
diferente
= gulp....
= Oh, oh.....
 EXTREMO BREACKDOWN EXTREMO 
¿Vamos a subir un 
lado?
¿Incrementar la
sonrisa?
¿Reducirla?
Reduzcamos la
Boca Infeliz.
Incluso con solo un
Parpadeo.
Podemos empezar
Estrechando cosas.
Comencemos a ser
Imaginativos.
= piensa sobre ello..
= falsa confianza.
= hmmm....
= lo sabía....
= le da algo de
movilidad..
= Oops..
= ¿algo que he
comido o bebido?
= tu secreto esta
seguro conmigo..
 EXTREMO BREACKDOWN EXTREMO 
Y podemos seguir al
Infinito.......
Simplemente
inclinando
¿Levantando la 
masa?
(va mejor al contrario)
sin fin....
CONCLUSIÓN: 
Hacia donde vayamos en la posición media de transición, tiene un efecto profundo en la acción y 
en el personaje. 
Apunta: 
Haz los extremos (o contactos) y luego los breakdown (o posición de paso). Luego haz los 
breakdown entre los extremos y los break principales. Mantén los breakdown incluso en las 
secciones pequeñas. 
Hace 30 años, cuando tuve mi primer encuentro con esta materia, trabajé brevemente con Abe 
Levitow, el mas reciente protegido de Ken Harris. 
Abe dibujaba estupendamente y me impresionaba tanto su calidad como su productividad. Rápido 
y bueno. Trabajando a tope, Abe producía de 20 a 25 segundos a la semana donde otros apenas 
llegaban a los 5 segundos. Y Abe era el mejor. 
Siempre recordaré lo que me decía Abe un Martes:

---

## Sección 34: Core Concepts & Foundations [Entropy: 0.268]

"Dick, he hecho todos los extremos. 
 
 
Mañana haré todos sus breakdown. 
 
 
El resto de la semana añadiré en los trocitos y piezas". 
De nuevo,
Pongamos una
cabeza que se
mueve solo un
poco hacia
delante.
PERO…
Así que
podemos
hacer esto.
Solo poniendo
el break en
medio resulta
pesado..
O esto.
Este simple traslapo nos da acción dentro de una acción. Mas "cambio", más vida. 
Esta es la idea en
bruto. Podemos 
hacerlo muy 
sutilmente. 
O hacerlo 
descaradamente.
Nos da "mas bang 
a nuestro macho"
Nos da movimiento dentro del movimiento. 
(O)
Separando...
De nuevo
va de
aquí
a aquí. 
Evitando 
el medio...
aburrido...
Ken Harris solía hacer una cosa muy interesante:
Aunque estaba muy seguro de sus habilidades como
animador, Ken tenía menos confianza en su dibujo.
Le gustaba hacer un profuso uso de los Bocetos de
Chuck Jones, su director en La Warner, y luego de
mis dibujos de Director.
A menudo encontraba a Ken haciendo un Trazado
exacto de mi dibujo "A" o "B" y Usándolo en la
posición de pasada (o breakdown)
Pero los situaba en cercanía al dibujo "A". 
Como
este.
Como
este.
O los situaba cerca de "B".
Lejos de ser una limitación, era una ventaja para
Ken. Le daba estabilidad a su trabajo, en vez de 
sobre animar con unos fáciles dibujos saltando por 
todos lados.
Observándolo hacerlo, y viendo los resultados, aprendí gradualmente a entender y a conseguir 
movimientos sutiles que eran aun "entrenamientos". 
TRASLAPO SIMPLE?
Pongamos que
tenemos un hombre
con turbante
y se inclina
hacia delante
Y hemos usado solo 3
posiciones. El resto va 
directamente en medio.
Si inclinamos la cabeza en #9 
en medio, y lo hacemos mas 
cerca de #1. 
Conseguimos esto con 
laccabeza y mira que ocurre 
En la masa del turbante. 
Salta en el medio. 
Esto crea un buen traslado 
de las masas en cada 
simple movimiento. 
Hemos hecho esto en un diseño soso de un personaje simple, sin cambio de expresión, ni siquiera 
un parpadeo, realizando un movimiento muy ordinario. Y aún así, tendrá un montón de vida 
simplemente por culpa del espaciado. 
Por lo que: buscamos formas para situar la posición media del breakdown (o posiciones) donde 
podamos conseguir un traslapo de las masas. 
 
 
 
 
 
 
 
 
 
= movimiento dentro del movimiento. 
4 dibujos en traslapo sobre un ratón made in California. 
La misma cabeza y 
cuerpo hacia delante 
progresivamente
Continua hacia 
delante en la 
misma cantidad 
que se inclina
Empuja atrás 
inclinando solo 
un poco más
Desde luego, esta posición de Breakdown es el tipo de cosa que se puede escapar de las manos. 
Como cualquiera, es el como, cuando y donde lo usamos. 
Cuando asistía a Ken 
Harris yhabía una mano 
situada como esta
Empecé haciéndome el 
listo y sacaba un
Breakdown como este
Ken alucinaba, "Maldición, Dick, solo quería un intercalo seguido aquí! ¡Dame un simple 
intercalado! ¡el tipo solo relaja su mano!. No quiero todos eso relampagueos por todas partes, 
clase de materia". 
(Ken tenía un terrible buen gusto) 
Pero cuando conseguí saber como, cuando y donde usarlo, casi podría decir que he criado con 
dibujos de breakdown. 
A menudo tenía que producir masivas cantidades de imágenes en el último minuto. Llegué a ser 
el "animador telefónico" animado al mismo tiempo que hacía negocios por teléfono. Los clientes 
desvariarían "hemos vuelto a ti a causa de los altos estándar, no nos importa si tu hombre esta 
en el hospital o en Timbutú". 
Normalmente teníamos buenos keys y extremos, y todo lo que teníamos que hacer era unir un 
montón de material de forma interesante. Encontré que casi todo funcionaba. Poniéndolo en algún 
lugar en medio, de forma inteligente. Nunca me falló 
Desde luego que el trabajo no era tan bueno como el que haría si hubiese tenido el tiempo de 
analizar y pensar que demonios estaba haciendo, pero a las 5 de la mañana, con Jet Lag, 
colgando en la bañera del laboratorio y un cliente gruñón telefoneando en 4 horas, te hacía 
correr.
Ahora nos referiremos a un tema diferente pero de nombre similar. 
TRASLAPANDO LA ACCIÓN.
Esto es donde las cosas se mueven por partes. 
Donde todo no ocurre al mismo tiempo. 
Tomemos un buldog made in Hollywood 
volviéndose rápidamente para ver algo. 
Arrastra sus quijadas 
al volverse
La cabeza llega 
a su destino
Pero sus mofletes y 
orejas llegan tarde y 
se siguen más allá. 
Luego vuelven a la 
normalidad (la boca 
podría seguir y las 
orejas temblando) 
La jerga es: las quijadas y orejas "se arrastran" y entonces "siguen adelante". 
Ellos son el resultado de la acción principal, generados por la acción principal. 
Traslapar la acción significa que una parte comienza primero y las demás partes la siguen. 
Tomemos un diseño literalmente soso y aburrido como se hacía para los anuncios de televisión de 
los años 50. 
Esta gris criatura se 
va a volver de cara a 
nosotros
No mucho más 
trabajo ¿verdad?
Podemos contribuir al aburrimiento poniendo un breakdown igualmente gris justo en medio e 
irnos a casa. 
Como Milt Kahl decía: "lo más difícil de hacer en una animación es nada, sabes, esa es una 
afirmación cierta". 
Bien, he aquí como podemos hacer "nada" al menos interesante.... 
Podemos salirnos del desarrollo de este trozo vulgar de animación simplemente rompiendo la 
acción en partes. 
Posición de paso
Los ojos 
probablemente
se moverían 
primero pero 
están marcados
con puntos. 
Así que 
hagamos 
primero un
simple 
movimiento
del pie. 
Retrasemos
la cabeza 
y el resto.
Entonces movamos 
el estómago 
y las caderas 
manteniendo 
aun retrasada la 
cabeza pero con 
un parpadeo. 
Entonces todo
se asienta y 
la cabeza 
llega la 
última. 
O así que la mayoría de las acciones de nuestro cuerpo comienza por las caderas.... 
Posición de paso
Moveremos las caderas
y estómago primero. 
Marcamos 
un paso 
manteniendo
retrasada 
la cabeza. 
El otro pie se desliza 
mientras la cabeza 
esta a medio camino 
y en un lento 
parpadeo. 
Se asienta.
No hemos inclinado su cabeza o cambiado su expresión, pero con solo traslapando partes hemos 
inyectado vida en una situación peatonal. 
Posición de paso
La cabeza se va 
volviendo a la par
que da un ligero 
paso atrás
Peso, pecho
y estómago
continúan
El pie atrasado
se adelanta
deslizándose
hasta asentarse
El otro pie 
va a la par 
que traslada 
el peso
Podemos seguir así para siempre.... 
Posición de paso
El pie se desliza
retrasándose 
la cabeza
Pestañea a
medida que
los brazos
giran y se
retrasa aún
la cabeza
Se asienta 
cuando tuerce
la cabeza
Abrir los bazos a la
vez que giramos el
cuerpo, la cabeza 
se retrasa 
(no se mueve de 
su posición) 
No importa lo muerta que esté la acción, podemos hacerla más interesante trasladando. 
Posición de paso
Ahora movamos
los hombros
Las caderas
siguen a los
hombros dando
un paso
Desliza el otro pie
ligeramente y se
situa
Volvamos la
cabeza primero
y hagamos un
parpadeo
Solo un pequeño detalle que sea diferente, cambia todo: 
Posición de paso
Traslada el peso
a un lado
Traslada el peso
al otro lado
cuando vuelve
la cabeza. El pie
se desliza
Los brazos
se balancean
y parpadea
ASI QUE para incluso la acción o figura mas gris la hagamos más interesante, romperemos el 
cuerpo en secciones, en diferentes entidades y moveremos secciones, una cada vez, 
constantemente traslapando 
La cabeza
Los hombros
El pecho
Los brazos
La pelvis
El regazo
Las piernas
Los pies
E incluso los podemos romper en secciones más pequeñas si queremos. 
CONCLUSIÓN:
La gente se desdobla, una parte comienza primero, generando la energía para que otras partes la 
sigan, con lo que se persiguen. Cuando una figura va de un lugar a otro, una serie de cosas 
ocurren u cada una no lo hace al mismo tiempo. Retenemos una acción. Las cosas no comienzan 
o termina a la par. Varias partes del cuerpo se traslapan unas a otras, es lo que se llama en 
terminología "Overlapping action" (traslapando la acción).

---

## Sección 35: Core Concepts & Foundations [Entropy: 0.268]

SIMPLE Contracción
No hay mucho mas que decir
sobre la contracción. 
Obviamente la hacemos 
naturalmente para 
equilibrarnos. 
Una parte sigue mientras 
otra parte se balancea 
hacia atrás. 
O una parte sube mientras 
que otra equilibra bajando. 
Ahora vamos a tratar unos de los más fascinantes recursos en animación. 
ROTURA DE UNIONES 
PARA DAR FLEXIBILIDAD
E incluso más interesante: 
SUCESIVAS ROTURAS DE UNIONES 
PARA DAR FLEXIBILIDAD.
ie. We keep on doing it to loosen thinks up. 
Es como un bocado. Los animadores pioneros de Disney descubrieron el recurso y todos los tipos 
buenos lo hacían, pero Art Babbit fue el único en ponerle nombre. 
Cuando observé que Milt Kahl lo hacía, lo mencioné y Milt dijo: "Oh, bien, tienes que conseguir 
hacerlo". Pensé que si yo dijera, "Oh, he notado que estas rompiendo las uniones aquí, de forma 
sucesiva en con el objetivo de dar flexibilidad me tiraría fuera de la habitación". 
No es los que se llama, sino ¿qué es? 
De forma simple, es esto: 
Cuando un brazo 
sube esta volviendo
a bajar de nuevo. 
La mano se
mantiene yendo 
PERO 
la junta del codo se
dobla o "rompe" 
volviendo en la 
dirección opuesta,
comenzado el 
camino de regreso.
Romper (breaking) significa doblar la junta sea o no lo que se esta doblando en realidad. 
Y entonces lo vamos a mantener yendo continuamente "sucesivamente" para hacer que las cosas 
se desentumezcan. 
Grim Natwick, el primer animador que realmente dibujó a la mujer, siempre decía, "las curvas son 
bellas de observar". 
En los años 20 el amigo de Grim, el animador Bill Nolan desarrolló la animación "manga de 
goma". Era una novedad y tenía gracia ya que nada tenía huesos y todo fluía sin fin en acciones 
curvadas, montones de variaciones de la figura del 8, rodeando a las figuras haciendo acciones de 
redondeo. 
Pero ahora podemos conseguir curvas con ¡líneas rectas! 
Las roturas sucesivas de uniones nos capacitan para conseguir el efecto de acción en curva 
usando líneas rectas. 
Nos liberamos para siempre de la tiranía de tener que animar figuras de goma. Siempre me figuré 
que "dibujar un paseo o diálogo" debería ser cualquier tipo de figura en cualquier estilo, hecha de 
carne y huesos. Esto abrió la caja de Pandora. ¡Qué herramienta! Podemos tener huesos y rectas 
en nuestras figuras y aún conseguir fluidez y movimiento seguido. 
Pongamos que 
intercalamos
este brazo subiendo
Intercalamos una 
posición recta
Podría ayudar el dibujar 
la mano
va tieso como una tabla.
aún va bastante rígido
Y aflojar la entrada 
y la salida del 
movimiento
(ease in, ease out)
No queremos chapucear el problema gomeando el brazo..
Sino que
romperemos
(doblaremos)
las juntas
comenzando
por el codo
... y rompiendo
de nuevo.
Breakdown 
o posición
de paso
Y rompiendo
de nuevo.....
El codo
llega antes.
Esta mano esta
justamente
por encima
Ahora la
muñeca
llega antes
que la mano.
Mira donde
está esta
mano...
Ahora bajaremos el otro lado, rompiendo sucesivamente las uniones: 
Mira donde 
está esta.
Posición
de paso
Haz esta 
recta pero 
retrasa la 
mano
En este ejemplo todas las dobleces o "roturas" son físicamente posibles. No tenemos ya que 
doblar o romper nada de forma extraña (pero podríamos). 
Hagámoslo de nuevo: el codo lidera y las uniones se rompen sucesivamente. 
Subiendo
(siempre me acuerdo 
de la cerveza mejicana 
“Doble Eqquis”)
y bajando 
de nuevo
Hicimos esto. 
Observa las 
X!
Rompiendo el 
la dirección 
opuesta
Hagamos
un círculo 
siguiendo
al codo.
continuado
Derecho
la unión 
se rompe
Es lo que un lanzador de pelota base hace: 
la X de Nuevo.
(Desde luego este
cuerpo hará enormes
movimientos)
Las uniones se rompen
en dirección opuesta.
(Y este es un 
lanzamiento suave)
Una cosa a recordar de la rotura de uniones sucesivas es: 
¿Dónde empieza la acción? 
¿Qué empieza a moverse primero? 
¿Es el codo? ¿Las caderas? ¿Los hombros? ¿La cabeza? 
En la mayoría de las acciones amplias de un cuerpo, la fuente, el comienzo esta en las caderas. 
Los bailarines dicen: 
"Ve desde las caderas, amor, 
desde las caderas, queridita". 
Pongamos un hombre palmeando una mesa: la acción comienza en las caderas. 
Apoyado anticipando 
su movimiento hacia 
atrás arriba
Apoyado anticipando 
su movimiento hacia 
atrás arriba
Las caderas comienzan 
a moverle y luego el 
codo sigue
El codo se rompe 
hacia atrás para 
que continúe la 
mano hacia arriba. 
El cuerpo comienza 
a bajar
Tenemos un montón de libertad para acentuar y exagerar la rotura de uniones debido a que 
ocurre todo el rato en realidad. 
lidera el
codo
Arrastra
la mano
invierte
la mano
el codo
lidera
Continuemos golpeando la mesa 
Es un buen ejemplo de cómo podemos conseguir la misma flexibilidad que una animación tipo 
goma, rompiendo las uniones siempre que podamos. 
Subiendo, el codo lidera y la mano le sigue 
Posición
de paso
Hombro
Observa
donde esta 
nuestra
posición
intermedia
#6 la mano 
esta cerca 
del #7
el próximo 
Breackdown
Bajando, el codo aún lidera. 
Posición
de paso
y
#11
De nuevo 
observa
donde está 
nuestra
posición
intermedia
Lo último que ocurre es que el 
brazo baja pero los dedos aún 
se retrasan
Observa el tema
viniendo aquí
Y observa 
donde esta 
el próximo 
breakdown
En este, 
el codo 
contacta
con la mesa
también #12
Una vez más, mostrando la idea con simplicidad. 
Ahora el va a golpear su puño sobre la mesa. 
aún sube
el brazo baja mientras 
la mano aun sube
El codo 
lidera la 
subida
la mano aun sube 
y el codo acelera 
hacia abajo
El antebrazo 
golpea , 
probablemente
sin intermedios
(Dos Equis)
BAM
invierte
la mano
O también..
KER
Como en la página
anterior el codo
golpea la mesa.
Primero.
Seguido del antebrazo
y puño = mas
desdoblamiento.
TRUMP
Si todas las juntas no se quiebran al mismo tiempo, 
conseguiremos toda la flexibilidad que necesitemos.
Es como cuando hacemos que un lápiz parezca de goma 
Y es como lo que una bailarina balines, una hindú o una oriental o una bailarina excéntrica de 
vodevil hacen ¡Y Fred Astaire! Ellos solo tienen huesos y articulaciones para trabajar, para dar la 
ilusión de movimientos curvilíneos 
Golpeando un bombo tiene una acción muy similar a golpear la mesa 
la muñeca 
se mantiene 
atrás hasta 
el último 
movimiento
golpe
Este asunto de doblar las articulaciones puede parecer terriblemente complicado al comienzo pero 
rápidamente conseguirás usarlas y hacerlo cada oportunidad que tengas. Llega a ser una segunda 
naturaleza y a ser simple 
En "realismo". 
(golpe)
el codo 
comienza
a bajar 
y la 
muñeca
a subir
el codo 
lidera
Desde luego que los ejecutantes de bombo hacen toda clase de giros y florituras, pero este es el 
patrón base. 
El codo lidera
Podemos ir directamente
del #7 al #8 ó añadir en
el #7 A en el que el brazo
llegaría a la misma
posición que #8 pero
retrasando la mano y el
palillo.
Yendo
Viniendo
Este es el patrón, la idea es que
no se necesita un buen espacio
para dar más variedad..
Resultado: movimiento curvo, desdoblado, hecho a regla. 
El codo 
lidera
La muñeca se 
mantiene atrasada
Sacudida
El
golpe
Un director de orquesta quiebra las juntas sucesivamente como loco. 
El codo se adelanta y la mano 
y la batuta se vuelve.
La muñeca se rompe hacia delante 
y el codo, dedos y batuta regresan.
Extremo
Intermedios
Tomemos una acción muy amplia de un hombre palmoteando un ritmo musical. 
(el arco de la espalda 
se invierte)
Intermedio
BAM
Ocurre con los pies de un perro. 
Y esta es la acción reducida para un director......... 
Entonces todo va hacia 
delantey el codo va 
hacia atrás.

---

## Sección 36: Core Concepts & Foundations [Entropy: 0.286]

La muñeca se retira y los dedos 
y batuta continúan hacia delante 
y el codo inicia su avance.
Mano y muñeca vuelven 
cuando el codo llega.
Parece complicado, pero cuando comienzas a pensar de esta forma, va. 
Es básicamente la misma acción al 
golpear una mesa o el bombo.
(aproximadamente como #1)?
(Amortiguando a #1)?
Hits can 
#15
(as #5)
O un puño golpeando una puerta. 
Hay un montón de pequeñas acciones simples que pueden enriquecerse con un poquito de 
flexibilidad. 
Pongamos, una mano aplaudiendo. 
La muñeca lidera, las puntas son 
arrastradas arriba..
La muñeca lidera, las puntas
se arrastran abajo..
También ayuda desplazar la palma
ligeramente sobre el golpe (en el
contacto, no después del golpe)
Desplaza la mano que esta siendo
golpeada ligeramente.
Si la mano quedase en el 
mismo lugar, perdería
vitalidad..
Lo que sentimos es el 
desplazamiento en el golpe.
De nuevo, podríamos hacer esto: 
Breakdown como antes.
Subiendo
la muñeca rompe 
mientras los dedos se 
mantienen elevando
Quizás NO haya 
intercalos bajando
O podría haber un 
intercalo bajando
O también.
Con un intercalo la muñeca 
podría llegar primero. 
Y entonces desplazar la 
palma sobre el golpe. 

Desde luego, el aplauso debe de ser como
esto. Por lo que lo dibujaremos de esta
forma, obviamente.
En el Flamenco se aplaude de forma distinta. 
Las puntas de los dedos golpean la palma.
Y obviamente, un luchador aplaude de forma diferente 
Desde un borracho a la mujer de un diplomático, o un nene, el principio es el mismo, un número 
de uniones rompiéndose, una detrás de la otra. 
Arrastrando.
El codo lidera 
la subida.
Entonces
desplazamos
el golpe.
Entonces la muñeca 
lidera la bajada.
la mano continua la subida 
mientras el codo baja.
Un violinista
Subiendo, la muñeca lidera.
Bajando, la muñeca 
aún lidera y 
arrastra la mano.
Arrastrando.
Una mano aleteando 
(a la italiana) muy 
rápidamente, en unos.
Incluso en un pequeño tema como este podemos conseguir flexibilidad. 
Para abrir esos dedos un 
intercalo directo en la subida 
podría estar bien
Pero en la bajada 
arrastra el intercalo
Si tuviéramos un 
mejor sensación de 
contacto o presión 
para empezar
=mejor subida 
cuando esta 
presión se 
realizó
Pongamos que martilleamos un clavo. 
tenemos que la mano 
se retrasa con 
respecto a la muñeca
De nuevo podemos llevarlo más lejos. 
Pero la cosa es saberlo para que podamos usarlo cuando queramos (lo que puede ser un 
montón). 
Toma las manos de 
alguien golpeándose 
entre sí
Quizás solo 
queramos
intercalarlas
favoreciendo la 
anticipación
Y estará bien.
Puede que no sea necesario sobre-animarlo con uniones rotas, pero quizás sea bueno. 
Intentémoslo. 
Las muñecas 
lideran el golpe
golpe
Ahora ¿qué tal si lo desmontamos? 
Los codos van antes y entonces 
las muñecas tiran para afuera
Y regresan un poco cuando 
las manos se agitan
O también. Podría ser estupendo tener solo una rotura. 
Así que todo depende del grado. 
Hemos mostrado estos recursos y principios en bruto 
En el estado mas crudo posible para clarificarlos 
Para practicar, para dejar de hacer las cosas rígidas o afectadas. 
Los podemos usar de forma increíblemente sutil o sobre actuado para hacerlo tipo goma o 
sensiblero. 
Pero es sorprendente lo lejos que podemos llegar rompiendo las juntas y hacerlo trabajar 
bellamente. 
FLEXIBILIDAD EN LA CARA
Hay una tendencia a olvidar lo móvil que en acción son nuestras caras realmente. Y siempre 
choca ver cuanta distorsión hay cuando miramos una acción real de actores fotograma a 
fotograma. 
Sin mencionar lo que una distorsión facial puede hacer (a pesar de que los dientes y la mandíbula 
no sean de goma). 
El cráneo, obviamente, siempre se mantiene el mismo, pero ocurre un montón de acción por 
debajo de los pómulos. Nuestros dientes superiores no cambian la posición en la que están 
sujetos a nuestro cráneo. La bisagra inferior, la acción de la mandíbula es primariamente de 
subida y bajada con un ligero movimiento lateral. 
hueso
sólido
Bisagra
se tiende a
olvidar lo
grande que
es nuestra
cavidad
bucal
nuestro
dentista
sabe lo
grande
que es
y que pequeña
puede aparecer.
La mandíbula gira en frente de las orejas. 
Art Babbit a menudo decía, después de animar a la bella reina diabólica en la escena del "el 
espejo mágico de la pared" de "Blancanieves" (un grado de realismo al que nadie se había 
atrevido antes, dejándolo solo para realizarlo), llegó a inhibirse animando primeros planos de los 
7 enanos. Encontró ayuda de otros grandes que osaron comprimir y estirar las caras. 
Siempre decía "ten coraje". 
No tengas miedo de estirar la cara 
y comprimirla
estirar es hacerlo una 
parte integral de la cara
Hay una tendencia en 
hacer una boca simple 
que gire por la cara 
flotando en ella.
Hay una tremenda cantidad de elasticidad en los músculos de nuestra cara. 
Un hombre
fumando en pipa
(quitemos la pipa)
espirando
soplando
Mejillas, cara,
nariz y ojo
afectados
El mascador puede
empujar la nariz
y volver
a "A"
Suben los
labios
apretando
la nariz
Mascando chicle, por ejemplo:
Podríamos ir desde cualquiera de esas posiciones a cualquier otra en cualquier secuencia, 
variándola.
Alrededor Gulp Ah
De nuevo, con aplastar y estirar, intentamos mantener la misma cantidad de carne. SI la quitases 
y la pesaras, debería pesar lo mismo. 
Un tipo grosero. 
GULP
RUMBLE
BURP
De nuevo ¿quién es el que masca? ¿Gordo, pequeño, loco, inhibido? 
Una persona sofisticada mascando versus un vagabundo que no come desde hace 3 semanas. 
Una mujer
de sociedad,
nunca abre
la boca.
versus un
obrero
comiendo.
MULTIPLICANDO LA ACCIÓN EN LA CARA
Es tosco ir de uno. 
...a otro.
La sobre 
exposición
de la acción 
funciona
bajando la 
cara (puede 
ser muy 
rápido)
Cada
cosa
a su 
tiempo
Puede ir en secciones 
He aquí una cosa que a menudo se observa en los buenos actores:
Supongamos alguien asustado
 Primero el ojo, luego la nariz, luego la boca y entonces el pelo. 
O también. Viceversa. Subiendo la cara. 
 Primero la boca, luego la nariz, luego el ojo y luego el pelo.
Comenzando por un guiño.
 Abre el ojo primero, endereza la nariz, cae la mandíbula y abre la boca.
O también..
Comienza con los ojos. Desarróllalos a
medida que la boca avanza y se estrecha
El cambio podría ser
a través de la cara
Pongamos a alguien decepcionado 
Comenzamos 
desde su 
opuesto (esto 
podría ocurrir 
más lentamente) 
Todos conocemos 
"las dos caras".
La doble cara 
donde existe 
contradicción: 
Los ojos primero
Luego la boca.
Mas
Caída
Se invierten
las cejas
La frente se
arruga y la barbilla
se mete para
dentro
Igual a=
Poniéndose
una cara
desafiante
Un lado de la cara nos dice una cosa y el otro los dice otra. 
Me gusta animar cada lado por separado. 
LECTURA INSTANTÁNEA. PERFILES PARA LA LEGIBILIDAD
Esto tenía que ir en algún lugar del libro y creo que va bien aquí.... 
¿Qué es 
esto?
¿O esto?
Pero es
mucho
más claro
lo que es
esto
Si queremos que nuestra audiencia capte la acción con rapidez, muéstrala en perfil. 
BUT
BUT
BUT
NOT
AND
NOT
AND
NOT
Ciertamente no tenemos ningún problema para ver que ocurre aquí. 
Y desde el punto de vista de la flexibilidad, observa como una simple reversión de su espalda da 
una terrorífica flexibilidad. Dibuja en D la espalda tan cóncava como se pueda; mantenlo así en E 
y entonces inviértelo a convexo en F y G. El pelo se retrasa y solamente cae en F. Estupendo. 
Siempre es buena idea tratar de obtener un opuesto claro desde el que vamos a cambiar, sea 
tanto una expresión facial o una forma como esta.

---

## Sección 37: Core Concepts & Foundations [Entropy: 0.301]

Para terminar esta sección y como una forma de repaso. 
Tenemos un examen de flexibilidad. 
Una tarea que Art Babbit nos daba para practicar sucesivas roturas de uniones. 
1. Desde la vista frontal de una mujer balanceándose de lado a lado. 
2. Pon las caderas haciendo la figura del 8. 
3. Pon la cabeza en contradicción con el cuerpo. 
4. Pon las manos funcionando independientemente y rompe las juntas. 
Este es el garabato que hice como propuesta al problema. 
Una especie de problema fuerte y como quiera que yo quería hacerlo de forma realista. 
Bien, ¿qué hacemos primero? (piensa).... Hmmmm.... Eh, desde luego, la CLAVE = dibujo #1. 
¿Cuál es el
próximo?
(piensa)...
obviamente....
el próximo
extremo donde
ella se balancea
al otro lado
Llameémosle #13
porque cuando lo
ensayé me tomó
1/2 segundo
agitarme a un lado
y 1/2 volver
= 1 segundo todo
El que nos cuenta la historia
Hagamos un ciclo para 
que podamos testarlo 
repetidamente para 
apuntar cualquier fallo 
Hey, no es tan 
horroroso después de 
todo. Si ahora 
queremos hacerlo 
más interesante con 
posiciones de paso entre 
los dos extremos... 
primero, balanceándose 
de esta forma. 
Pon la cadera tendiendo 
hacia el #13
Ahora vuelve al
 otro lado. 
Consigue algo de 
confianza ahora... 
hagamos que las 
caderas tiendan 
hacia el #1 y tira 
de las piernas 
como hice 
instintivamente
en mi bosquejo 
original. Ahora 
seamos hábiles.
Ponlo en el otro extremo cerca de #1 
empujándola más allá
cont
Y pon en el otro extremo, cerca de #13 
empujándola más allá 
Ahora parece como si todo funcionase. 
Y podemos darle algo de relax, rompiendo más fuertemente y disfrutando tomando el resto poco 
a poco.... Poniendo en las manos círculos y otras pocas curvas. 
La gráfica 
es simple
Y volviendo
Yendo
Entonces añade en unos. Son solo intercalos 
estúpidos solamente para añadir más suavidad. 
(Así va bien, no necesita más corrección)
256
PESO
La primera pregunta que le formulé a Milt Kahl fue "¿Cómo conseguiste que el tigre del
libro de la selva pesara tanto?".
Me respondió: "Bien, en cada dibujo sabía donde estaba el peso, sabía donde estaba el
peso en cada momento dado en el personaje, sabía donde estaba y de donde venía,
sabía por donde se trasladaba y hacia donde se desplazaría".
Ya hemos visto que en un paseo sentimos el peso en la posición de bajada donde las
piernas se doblan cuando toman el peso, absorbiendo la fuerza del movimiento. Pero
¿qué pasa con otros tipos de pesos? Objetos ligeros, pesados... ¿Cómo representarlos? 
Una forma de representar lo pesado que es un objeto, es mediante la forma de
prepararse para sujetarlo. Para levantar un peso, tenemos que prepararnos antes.
Anticipar el peso. Obviamente, coger un trozo de tiza o un lápiz o una pluma no requiere
preparación. 
Pero una pesada piedra.... 
Podemos sugerir el peso haciéndole 
caminar alrededor, para hacerse una idea.
Sin sentimiento de 
peso, parece una 
roca de corcho.
Mal
¿Cómo va ha hacerlo? Está considerando que
es lo que va a levantar ¿Cuánto pesa? 
Está anticipando lo que va a pesar. 
Observa que 
hace la espina 
dorsal… 
Ciertamente primero separa los
pies y dobla las rodillas. 
Se aproxima al peso tan cerca como sea posible.
Se ajusta para no 
dañarse: no quiere 
provocarse un 
hernia.
El cuerpo retrocede 
a medida que 
incorpora. 
Trata de mantener el 
peso por debajo. Puede 
ajustar los pies 
en pequeños pasos 
de forma errática. 
Invierte el arco 
posterior para 
conseguir un 
asidero.
El 
arco 
se invierte 
(endereza 
la cabeza)
Gran levantada. 
Enderezamiento. 
Las rodillas tiemblan. 
Cae hacia atrás o lo que sea. 
Se estira
el arco. 
Enderezamiento.
Un hombre cargado con un saco de patatas a su espalda se dobla para contrarrestar el peso. El
peso empuja al hombre hacia el suelo, manteniendo las rodillas dobladas y haciendo arrastrar
los pies. Los pies también se despliegan para formar un trípode para mantener el peso sobre
una gran área. 
Pies apartados, 
rodillas siempre 
dobladas. 
Los pies 
no se despegan 
prácticamente
del suelo. 
Una gran diferencia en estas caminatas o corridas (N del T: de correr, claro... no de toros).
Está determinado por el peso que se transporta. Si una persona lleva una pesada roca, bajará
los hombros y estirará los brazos. La cabeza y cuello bajarán. 
(Arrastrando aparte ligeramente) 
El se moverá más 
lentamente y el 
cuerpo se erigirá 
sólo ligeramente en 
la posición de paso, pero
la roca no se levantará 
nada.
De nuevo el pie 
de paso apenas 
se levantará 
del suelo y las 
rodillas estarán 
constantemente 
dobladas por 
el peso. 
El Ritmo (Timming) de los pies 
 será errático... 
 Así: Paso, pausa, paso, paso, pausa, paso, pausa, paso, paso, paso, pausa, etc...
O… podría deslizarse rápidamente y soltarla. 
Una mano recogiendo un pañuelo
de seda del suelo, no presentará
ninguna resistencia. 
Pero una mano recogiendo un ladrillo, 
hemos de considerar que afectará a todo el cuerpo. 
El ángulo de la 
cabeza podría 
oponerse 
al hombro. 
El brazo 
está ayudando
a contrarrestar
el ladrillo de la
mano derecha.
Cogiendo una pluma. 
No tendría ningún efecto sobre el cuerpo. 
Desde luego, una forma de conseguir peso es ser consciente de él. 
El gran animador Hill Titla decía: "El punto no es que meramente restriegues un lápiz, sino que
tienes peso en tus formas: has de hacer lo posible por expresar esa sensación. Para mí es una
lucha y soy consciente de ello todo el tiempo".
Pongamos una mano 
presionando un balón. 
El brazo 
se enderezaría 
solo un poco. 
Pero una mano 
presionando 
sobre una bola 
de bolos. 
Los hombros 
presionarían 
hacia arriba. 
Una mano presionando 
sobre el agua. 
La mano desplazará algo de 
agua, pero solo tendrá un 
pequeño efecto sobre el agua.
Soltemos algunas cosas que caigan a diferentes velocidades a causa de su peso
y de su composición.
Un pañuelo de 
seda recogerá 
algo de aire en
su caída. 
Cae. 
Tiene aire debajo. 
Tiene aire debajo. 
Un pesado 
abrigo cae.
Coge aire pero
cae deprisa. 
No se retrasará
en el aire. 
Quizás 
nunca se 
asiente del
todo.
Se posa. 
Cojamos una taza china. 
Posiblemente la taza se haría añicos con el impacto, 
pero podemos hacer que rebote un poco. 
Tómate libertades con la realidad, pero has que parezca verosímil.
Rebota. 
Rebota. 
Rebota. Rebota. Se asienta.
Pausa. Entonces se quiebra.
Una hoja cayendo se retrasará en el aire. 
La corriente de aire le afectará. 
Su caída tendrá la resistencia del aire. 
Un
salto 
mortal.
El mismo asunto, pero con
un trozo de papel. 
El ritmo debería ser
lento y grácil. 
Su aterrizaje es resistido 
por el agua. Un lento 
deslizarse hasta parar. 
Caída de una roca 
de 50-60 libras 
formarán ondas 
que pueden llegar 
hasta el extremo 
del estanque. 
Una masa cayendo. 
Una bola de barro.
Una cartulina 
soltada desde 
un lado 
bajando
de prisa. 
Quizás se 
doble la 
esquina con 
el golpe y 
entonces caiga
más
lentamente. 
Se esparcirá 
cunado se 
golpee. 
- Va directamente
a esta forma.

---

## Sección 38: Core Concepts & Foundations [Entropy: 0.25]

PRESIÓN Y PESO
Tocando.
Presionando.
Presionando. 
Sin presionar mucho. 
Reforzándola 
más 
fuertemente. 
Reforzando
la pose. 
Aplastando el 
extremo para 
presionar.
Reforzando más 
fuertemente. 
Supón que la superficie es blanda, tela o goma. 
Sin presionar 
mucho.
Doblando los 
dedos para 
presionar. 
De nuevo, cogiendo algo pesado. Todo el cuerpo ayudaría
y la fuente de la acción 
está en la cadera.
Cogiendo un lápiz, la 
fuente de la acción 
estaría en el codo. 
No desde la cadera 
obviamente. 
Una caja muy pesada cayendo. 
Una pelota de golf cayendo.
Cuando se golpea, 
mostramos el 
contacto, pero 
no se aplasta. 
Inmediatamente, rebota 
y rueda hasta pararse. 
Para sentir el impacto, 
la caja se desarma 
en el momento del golpe.
Una bola de acero cayendo.
Un ligero rebote y entonces rueda.
De nuevo no se aplasta. El sonido va
cuando dejado el suelo. (N del T: consultar
la sincronización de sonido en el capítulo,
diálogo)
.. y luego recuperará
su forma original.
Una pelota de tenis se 
aplastará en el impacto…
Presionar es parte del peso. 
Pelota. 
Perfil. 
Tocando
una mesa.
Presionando
una
mesa. 
Si empujamos lo suficiente, 
doblaremos nuestros brazos y 
nuestros pies resbalarán o se 
deslizarán. 
Tocando 
una caja 
pesada. 
Empujando
una caja 
pesada. 
Existe resistencia por parte de la cosa que estamos tratando de mover. 

Esto es lo que decía Milt Kahn; 
¿Cuánto esfuerzo debemos usar? 
1-Para mover algo? 
2-Para cambiar de dirección? 
3-O para pararla? 
Esto indicará cuanto pesa. 
Pararse es parte del peso: 
La espina 
se invierte. 
Lentamente.
Inversión
de la espina. 
Inversión 
de nuevo.
Se desliza.
Llegando al final de un deslizamiento, nos desharemos
del equilibrio.
Entonces nos dirigimos a la
próxima acción como si
viniéramos de una escalera
automática.
Frank Tomas decía: "Tenemos que conseguir 
hacer algo para parar el avance de 
un peso creíble".
Cualquier cosa 
que este en 
movimiento, 
tenderá a seguir
en su dirección;
Brazos, pelo, 
ropa, manos... 
Por lo que 
debemos 
pararlos por 
partes. Cada 
parte, indicando
su propio peso 
individual.
"Parar las cosas de forma convincente es una de las dificultades de la animación".
Cuando vayas a parar, elige un buen sitio. Como parar, que clase de parada, si es una
parada de alerta o es de pereza. "Elegir donde hacerla es una elección importante.
Odio ver un pie siguiendo y aterrizando sin que ocurra nada. 
Creo que cuando toma tierra lo adelantamos y apoyemos el peso en él, 
o balancearlo hacia delante o levantar el otro pie".

Así, cuando ella se para, sus ropas y pelo se retrasan con respecto a la acción principal y desde 
luego, la acción principal con respecto a ella también se para por partes, acabando en diferentes 
tiempos. ¿Existe alguna acción en donde todas las partes del cuerpo se mueven uniformemente? 
(Excepto en robots, e incluso no siempre). 
De nuevo "continuar", es el resultado "de" y es generada por la acción principal. 
Parada. El material sigue… y se asienta.
Una mujer en camisón de seda… El material se expande y aletea violentamente.
Parada. El material continúa flotando… y se asentará 
lentamente.

Pero la única manera en la que realmente mostramos peso es con la acción. 
Pongamos que recogemos un pesado montón de heno con una horca. 
Anticipamos
el clavado. 
Invertimos 
el arco posterior.
Hinca rápido.
Levantada lenta.
Retraso 
de la cabeza. 
El arco 
posterior se 
invierte de 
nuevo.
Tira para arriba 
liberando. 
Anticipa el tirón, 
bajando.
Arco posterior
de nuevo 
invertido. 
Arco posterior
de nuevo 
invertido. 
Ahora soy 
capaz de 
lanzarlo. 

Volvamos a levantar una roca. Con sugerencias de como cambiar cosas de forma interesante. 
Lo considera.
Una mano 
comienza a 
bajar. 
El cuerpo se 
estira, las 
manos no 
vuelven al 
mismo tiempo.
Se dobla abajo, pero
se ayuda retrasando
los brazos en alto, 
pero no juntos. 
La cabeza se 
retrasa algo. Una
mano precede a 
la otra. 
Y aún se 
retrasa algo 
una mano 
agarra. 
El arco de la 
espalda se 
invierte. 
Agarra con la 
otra mano. La 
cabeza baja 
atrasada. 
Los codos tiemblan 
a medida que se 
endereza a lanzarla. 
Se ajusta 
lado a lado. 
Estira los brazos 
y levanta el cuerpo 
y las piernas se 
enderezan 
ligeramente. 
Levanta a 
medida que el 
cuerpo baja y 
vibran las 
rodillas. 
Se vuelven 
cóncavas al 
acercar la roca 
al cuerpo y se 
agitan menos. 
La cabeza se 
endereza hacia 
atrás. 
Pierde el 
equilibrio al 
zozobrar la roca.
Se invierte el 
arco posterior. 
Recupera el 
equilibrio. 

Un hombre con un pesado mazo lo va a lanzar contra un yunque. 
Así tratamos de encontrar todas las posibles variaciones para mostrar visualmente el peso. 
¿Podemos arrastrar partes? 
¿Va rápido y lento? 
¿Usa subir y bajar?
¿Rompe con las juntas? 
¿Invierte el arco del cuerpo? 
¿Cambia el peso? 
Y selecciona lo que necesitamos para situar lo que queremos. 
Y cuando tengamos todo esto en nuestras venas, concéntrate 
en la personalidad de quien lo realiza y en que situación. 
Comienza a mirar donde
va a golpear.
Como la mayoría de las grandes 
acciones, la pelvis inicia la acción.
El peso se 
desplaza.
Atrase el mazo, 
pues
¡Es pesado! 
Se inclina.
El mazo se 
retraza algo.
Los pies se 
giran a una 
mejor posición.
El peso se 
desplaza.
El mazo y los brazos 
podrían ir más atrás 
para que cabeza y 
brazos comiencen a 
bajar hacia delante. 
El sonido (o el acento) va en el 
fotograma después de este. 
Espaciamiento. 
El arco se invierte 
de nuevo. 
Arco posterior de 
nuevo invertido. 
Va el rebote después del 
contacto donde el mazo deja 
el yunque. 

Corriendo e intentar cambiar la dirección de nuestro peso. 
Al doblar una esquina Charlie Chaplin hacia un famoso derrape o bricado. 
El derrapaba alrededor de la esquina en una curva y salía corriendo al doblar. 
Si bloqueamos los pies y solo tenemos la subida y bajada del cuerpo bien, 
entonces podemos poner los pies en cualquier forma. 
En animación, si derrapa durante un segundo. 
Una forma de hacer esto es una serie de dibujos de 2 a 24 (números pares) 
Entonces haz otra serie, ligeramente contrarrestado (offset) desde 3 a 23 (números impares) 
Entonces los entrecruzamos (repasar "vibraciones")
BAILANDO
Sale de la 
animación. 
Corre, 
..y derrapa. 
Los pies se contrarrestan entre 
ellos para hacer el derrapado. 
Para acabar con esta sección sobre peso deberíamos incluir el baile. 
La razón es que la parte esencial del baile no es lo que ocurre en los pies sino lo que ocurre en el
cuerpo. El peso, al subir y bajar el cuerpo. 
Keb Harris y Art Babbit, eran especialistas en animación de baile y ambos decían exactamente lo
mismo:
Es las subidas y bajadas del cuerpo y las manos, lo más importante de una danza. 
Es lo que le pasa al cuerpo con el peso moviéndose arriba y abajo con ritmo.

---

## Sección 39: Core Concepts & Foundations [Entropy: 0.268]

Añadimos pies con un plan similar a las subidas y bajadas del cuerpo. El compás está en doces 
(2s. Esto trabaja bien en doces) 
Ahora acentuamos la subida 
y realmente lanzamos el cuerpo 
arriba y abajo y balanceamos los 
brazos alrededor. 
Este ritmo está sobre los 16s. 
Cada 4° dibujo en un extremo. 
Todo está en unos y sólo necesita 3 
intercalados sencillos más o menos 
directos, entre cada extremo. 
Golpes 
x
compás.
Su
alzamiento 
anticipa el 
compás. 
Subida
anticipa el 
compás. 
Golpes 
x
compás.
Baja a 
contraritmo 
para anticipar 
la subida. 
Golpes 
x
compás.

En baile, normalmente se golpea el compás de la bajada. 
Sentimos el peso cuando el cuerpo baja. 
Golpes 
x
compás.
Sube 
para 
anticipar. 
Inversión
posterior.
Baja fuera 
de compás.
Inversión
posterior. 
Golpes 
x
compás.
Bajo fuera del 
compás, para subir.
Inversión
posterior.
Golpes 
x
compás.
Podemos acentuar cada bajada
o subida del cuerpo. 
En un baile, si conseguimos 
la mayoría de los grandes 
compases correctamente, 
entonces podemos ignorar 
los compases pequeños o 
compases secundarios. 
No pierdas el tiempo en lo 
infinitesimal. Nada más corto 
que solo 4 fotogramas 
se van a captar. 
Haz bien lo principal. 
Realmente bien. Entonces 
apóyalo con acciones 
secundarias. 
(N del T: R. Williams, cuando se refiere a "compases 
grandes", se está refiriendo a la parte fuerte del 
compás. Un compás está formado por partes fuertes, 
semifuertes y débiles; así el compás del Vals es "fuerte",
débil, débil, "fuerte", débil, débil, "fuerte", débil, débil, 
etc. Es la parte "fuerte" la que hemos de captar, 
principalmente para marcar el ritmo) 

Con danzarines, nota la torción en los hombros y como se oponen la torsión de las caderas. 
Como con el diálogo, creo que la mejor forma de animar a nivel con el sonido. Entonces 
manipularlo en edición, hasta que se vea correcta. También aprenderemos cosas como, que las 
reglas de hojeo son lo que son, regla de hojeo. Pruébalas y mira que funciona mejor. 
Quizás sea mejor un fotograma por delante, quizás dos, quizás tres o cuatro, 
quizás mejor a nivel (nunca es mejor, después) 
Las caderas y hombros, tienden
a contraponerse entre ellos 
todo el rato. Los hombros 
bajan, las caderas suben, los 
hombros suben, las caderas 
bajan, gira el cuerpo, la cabeza
en diferente ángulo a los 
hombros.
Sincronizando la acción al ritmo musical. Hay dos reglas de hojeo: (N del T: Se refiere a
pasar las hojas de animación con las manos, para crear el efecto de movimiento)
Regla de hojeo 1
Regla de hojeo 2
Los pies bajan 
hacia dentro. 
Entonces se 
enderezan.
En algunos
pasos, los pies 
apenas tocan 
el suelo. 
Consigue inclinación
en el cuerpo 
para dinámica. 
Al cambiar 
la posición, empieza
con 
las caderas 
como 
transporte 
del peso. 
Haz que la posición del acento visual ocurra 2 fotogramas por delante
del sonido actual, precediendo al sonido en 2 fotogramas. 
Así podemos animar el golpe 2 fotogramas por delante del sonido, o
podemos animar a nivel con el sonido y el avance de la secuencia. En
edición, luego debemos conseguir que parezca correcto (prefiero esto). 
Muchos editores de acción a menudo ponen el golpe visual 1/3 de la
longitud total del compás (con un compás de 12 fotogramas es 4
fotogramas por delante del sonido). 
Pongamos 
un compás de 
12 fotogramas.
Pongamos 
un compás de 
12 fotogramas.

Anticipación
¿Hay alguien que no sepa que es lo que va a hacer este tipo? 
El gran animador Hill Tytla dijo: 
Solamente hay tres cosas en la animación: 
1 Anticipación 
2 Acción 
3 Reacción 
Todo esto implica al resto. 
"Aprende bien estas cosas y animarás bien". 
Charlie Chaplin dijo:
1 Cuenta que es lo que vas a hacer. 
2 Hazlo. 
3 Cuenta que es lo que has hecho. 
El gran mimo francés Marcel Marceau dijo: 
"Usa gran anticipación"
¿Por qué? Porque sirve para comunicar que es lo que va a ocurrir. 
La audiencia ve que es lo que va a pasar. Ven en la anticipación y se anticipan con nosotros. Ellos 
nos siguen. 
¿Por qué? Porque en casi todas las acciones que hagamos hay anticipación. 
Pensamos las cosas antes. Y luego las hacemos. A menos que se trate de una respuesta preprogramada como el desplazamiento de las ruedas de un auto o vestirse. Sabíamos que íbamos a 
hacer primero y luego lo hacemos. Como en el habla sabemos que nuestro cerebro prepara 
primero el sentido de lo que se quiere decir, entonces se ponen en marcha una serie compleja de 
músculos para decirlo. 
Por lo que una ANTICIPACIÓN es la PREPARACIÓN de una acción (que todos reconocemos cuando 
la vemos) La anticipación aparece en casi todas las acciones y desde luego en todas las grandes
acciones. 
Anticipa. 
Acción 
en curso.
Reacción:
Vibra y se asienta.
La anticipación va siempre en la dirección opuesta a la que va la acción principal. 
Anticipa. 
Acción en curso.
Reacción:
Se afloja.
(Desde luego 
buscamos que 
es lo golpeado)
Cada acción se ve reforzada a ser precedida por su opuesto. 
Si la acción es de todo el 
cuerpo, entonces tenemos
la anticipación de una 
tremenda fuerza latente.
Normalmente la anticipación es lenta, menos violenta que la acción. 
Lenta anticipación........zip! = acción rápida.
Las 
caderas 
van
primero.
Empieza con un giro 
lento hacia arriba. 
Entonces prepara 
el cuerpo. 
Entonces lanza.
Nota: una mujer, a 
menos que sea del tipo
atlético, o un niño 
pequeño lanzarán sin 
adelantar la masa del 
cuerpo para ayudarse 
en el lanzamiento. 
Un corredor. Primero retrocede. Sale de frente. 
Preparado. Listo. Ya.
 Conseguimos una acción más potente. 
Toda acción se puede realzar si hay una anticipación antes de la acción. 
Así que: 
Retrasaremos antes de avanzar 
Avanzaremos antes de retroceder 
Bajaremos antes de subir 
Subiremos antes de bajar 
La norma es: "Antes de ir hacia un sitio, primero iremos hacia el otro".

Desde luego, con una animación cómica. 
Ve algo. 
 
Anticipa su salida. 
 Sin dibujo, simplemente desaparece. 
La anticipación sucede con el más pequeño y mínimo de los movimientos. 
Levantándose de una silla, retrocedemos antes de adelantarnos y bajar antes de subir. 
Anticipa retrocediendo 
al respaldar. 
Se dobla 
y baja. 
Sube.
Alguien señala un punto.

---

## Sección 40: Core Concepts & Foundations [Entropy: 0.376]

Ahora la acción más fuerte. 
El cuerpo retrocede un poco, yendo primero en la
dirección contraria, se magnifica el resultado.
Supón algo simple, 
como comenzar un paseo. 
Es artificial 
comenzar un 
paseo con un pie 
más adelantado en
la dirección de la 
marcha. 
La forma más 
obvia de ir a la 
izquierda es 
comenzar con el 
pie izquierdo. 
Hay que comenzar
la marcha con el 
pie más cercano a
la dirección en la 
que se va. 
MAL
Pero puede 
anticipar el paseo 
con el pie derecho
de esta forma. Su 
pie derecho podría
retrasarse como 
anticipación 
O tambien: 
Alternativamente, 
podría anticipar su
paseo, retrasando 
el pie izquierdo 
para liberar el 
derecho con el que
dar el primer 
paso.
Anticipación.
Anticipación. 
Un pliét de ballet es una 
anticipación antes de saltar
en el aire para 
realizar un entrechant = 
agitación de pies. 
(N del T. Obviamente se 
trata de términos 
franceses de Ballet) 
Vamos.
 Bajamos antes de. 
 Subir. 
En
animación 
los pies 
pueden
formar la 
figura de 
un 8. 
Un hombre sobre un trampolín. 
Anticipación.
Comienza con la pierna
más agradable. 
(Invierte el arco trasero)
(Invierte el arco de nuevo)
Otra
anticipación. 

CON PEQUEÑAS ACCIONES. Pongamos una mano escribiendo. 
Está perfectamente 
claro lo que ocurre. 
Pero con solo poner una pequeña anticipación antes de que escriba, 
sentimos a la persona pensar. 
O podemos usar gesticulaciones extravagantes de teatro como anticipación. 
Digamos una mujer presumida colocando su mano sobre la cintura (es la figura de un 8)

Las anticipaciones son gajes del oficio de un mago. 
Hace la figura del B. 
Afloja. 
Vuelve.

Ken Harris me decía que esto es por lo que lo hacían en las viejas películas de vaqueros. 
Ellos cortaban los fotogramas del punto de contacto para solo mostrar el resultado del golpe y 
poner un gran bang ahí. 
Por lo que ponemos el sonido del golpe cuando el puño ha pasado la cara. 
Cuando el personaje se ha desalojado y el brazo sigue el recorrido de nuevo. 
La anticipación es prepararnos para la acción. Transmitimos lo que vamos a hacer. 
El único problema con la anticipación puede ser su desgaste: "ya lo sé, lo ves....ahora va a hacer 
esto....je, que aburrido".
Entonces la idea principal es hacer algo diferente, una sorpresa, que puede ser muy graciosa (o 
chocante). Algo inesperado. 
Si alguien va a 
golpear a otro, 
debería anticipar 
antes de balancearse
hacia delante. 
La anticipación
nos dice que 
va a ocurrir 
exactamente.
En los primeros días de la anticipación, 
el contacto era como golpear un bizcocho.
Este golpe 
normalmente 
se mantenía en 
4 fotogramas. 
Grim Natwich decía: "En Disney aprendí a lanzar un puñetazo de Art Babbitt".
Art decía que nunca mostrara la mano golpeando la mejilla "Muestra la mano después
de que rebase la mejilla y ésta se haya desplazado".
Todavía podemos 
ver el resultado. 
No hay punto
de contacto. 
Dejamos el
contacto y
mostramos la
mano pasando el
punto del golpe
= 10 veces el
impacto.

Podemos decir que la anticipación es la expectación de lo que va a ocurrir. 
La audiencia está a la expectativa de que algo va a pasar antes de lo que pasó en ese momento. 
La sorpresa chiste funciona cuando la audiencia capta la expectación y espera que cierta cosa 
vaya a pasar y entonces ocurre algo completamente diferente. 
 La inhalación en la anticipación. 
 
Acción. 
 
Resultado. 
O tambien: 
Más acción. 
Inhalación = más 
anticipación.
Inhalación = anticipación.
Acción.
Más inhalación 
= más anticipación. 
Acción.
Reacción o 
resultado. 
Más reacción. 
Aún más 
reacción. 

ANTICIPACIÓN SORPRESA
Acción.
Anticipación 
más fuerte. 
Anticipación. 
Esperando. 
Anticipación. 
Resultado. 
Anticipación.
Anticipación.
Acción.
Reacción.
Resultado. 
Anticipación.
Acción.
Reacción. 

ANTICIPACIÓNES INVISIBLES
Una forma de romper (snap) que es algo de lo que muchos animadores hablan siempre es: 
Supongamos un personaje que mira algo ligeramente sorprendido y mira con un poco de 
atención. 
Le ponemos una rápida anticipación. Un dibujo o dos en la dirección contraria a la que queramos
ir. Demasiado rápido para que el ojo humano pueda verla. Dura solamente 1 o 2 fotogramas. Es
invisible pero se nota. Esto le da el snap. 
Un futbolista dijo que un regateo es ir a parar el balón con un florido movimiento circular del pie.
Solo un fotograma. 
La anticipación hará el engaño! Entonces…. muévelo en dirección contraria. 
Desde luego, la floritura es en si mismo la anticipación de atrapar el balón. 

Este recurso le da un empuje extra a una acción mediante la anticipación invisible de cualquier 
acción, pero sólo mediante 1, 2 o 3 fotogramas. 
Un jugador de pelota base, atrapando la pelota, puede anticipar el lanzamiento en sólo 2 
fotogramas. 
Coge
la
pelota.
La anticipación avanza 2 fotogramas. Ahora vuelve a la anticipación normal. 
Conclusión: 
Siempre que sea posible buscaremos una anticipación (o anticipaciones) antes de la acción. 
Hill Tytla dijo: 
Se simple. 
Se directo. 
Se claro. 
Y.. 
Se muy simple. 
Haz una afirmación (situación) 
Y acábala, "simplemente".
Por lo que: 
 1 Anticipamos la acción. 
 2 Hazla. 
 
 
 
 3 Muestra lo que hemos hecho. 
La anticipación, naturalmente, no conduce directamente a los TAKES y ACCENTS. 

TAKES Y ACCENTS
Una "TAKE" es una anticipación de un Accent (Acento) que se concluye: 
Ve algo
sorprendente
Acento
Anticipación
Baja Sube Normaliza
Este es el esquema básico de un "take" de animación cómica. 
Ahora sigue una serie de fórmulas y variaciones de takes sobre las que Hollywood trabajó entre 
los años 30 y 40..... 
Pero mientras estamos en ello podemos reforzar nuestro take básico añadiendo una pequeña 
anticipación de subida de la anticipación de bajada como si el personaje echara un vistazo más 
cercano. 
Mira
baja Sube normaliza
Clava
brevemente
la mirada
anticipación
acento
Una pequeña 
subida de anticipación.
La anticipación baja
Aquí una pequeña fórmula para una subida, bajada de un take directo (dura un pié=2/3 sec) 
(Este es el tipo de Timming de la Disney) 
IGUALMENTE 
#16 es la
posición que
realmente
captamos
Baja en doses Sube en unos Baja en doses
El acento #8 sólo dura 2 fotogramas
y en el #8 ya esta en camino de
bajar al #16
sube en unos baja en doses
baja en 
unos
o
Aquí lo mismo pero con
en Timming típico de los
cortos de la Warner
De nuevo el
Acento se
siente como
si ya estuviera
en ruta hacia
el #14
(14 fotogramas es solo
como ½ sec)
Bajando
por doses
Salto del
7 al 8
Bajando por unos
Lo mismo de perfil
Bajando
por doses
salto del 
7 al 8
bajando por unos
Lo mismo con en cuerpo, pero todo 
en doses. 
(ocupa un pie=2/3 sec)
salto del 
7 al 9
Doses
#7 alterno
Doses
Podemos exagerar cada cosa 
tanto como queramos pero 
éstos son los timmings 
estándar
Aquí uno similar. El esquema es el 
mismo que del ratón, pero todos 
en doses.
De nuevo el acento #9 
se siente como un 
shock eléctrico como 
una transición al #17
doses
salto del 
 7 al 9
Estas son fórmulas sólidas de trabajo, pero podemos comenzar a hacerlas más inventivas. 
Mantén ojos u boca
cerrados hasta
el acento #11
Cojamos una que ocupe
un pie (19 fotogramas)
Subiendo por unos Bajando por doses
Bajando
por doses
Hagamos ahora un tipo de doble
take. Mantendremos el mismo
esquema pero arrastrando la
cabeza de lado a lado y la
mantendremos "aplastada"
en su camino al #11
salta la forma
de la cabeza,
ojos y boca al
#11
bajando en doses por unos... 
y bajando en doses
debe mostrase 
claramente de 
esta manera
haz el 6 que 
favorezca el #5 
como extremo
No nos preocupemos de distorsionar dibujos o imágenes. La acción real tiene fotogramas 
terriblemente distorsionados.

---

## Sección 41: Core Concepts & Foundations [Entropy: 0.316]

Pero debemos recordar cual es el volumen original y no olvidarlo cuando encojamos o estiremos 
ese volumen así como cuando el personaje cambie de tamaño. 
Milt Kahl dijo: "mantengo la misma cantidad de carne en un take". 
Pero podemos apretarla 
por todos lados como un 
loco
No debemos tener miedo de la distorsión en el interior de la acción. Nuestros dibujos e imágenes 
pueden parecer extraños, pero realmente solo vemos las posiciones de inicio y final. Sentimos la 
distorsión internamente, y eso es lo que cuenta. 
Hay una violenta distorsión y apoyada en la acción real y podemos ir más lejos. 
Bajando a una
anticipación
esperarías esto.
La barriga baja
y las piernas se
Doblan.
Antic.
Pero retrasemos el área del estómago
durante 2 fotogramas, ó 3 fotogramas,
ó 4 fotogramas.
La barriga
se mantiene.
En el
acento
subimos y
entonces
la barriga
baja y la
retrasamos
2, 3 o 4
fotogramas.
El estómago baja
obteniendo un
estrechamiento y
compresión interna.
Los pies
pueden
pedalear
La barriga se
mantiene arriba
a medida que
comenzamos
a bajar
Después de que la cabeza
y el cuerpo se asienten, los
brazos pueden moverse a
una posición para tomar las
riendas.
Antic.
La cabeza puede subir y las piernas bajar lo 
que constituye una anticipación de una 
anticipación.
Antic
 de
Antic.
La cabeza 
dirige y lo 
demás le 
sigue
Antic.
Esta es la forma en que Tex Avery realizó sus salvajes y locos takes, extendiéndolos en una serie 
de acciones compuestas, trocitos de retrasos, separados a menudo por 2 fotogramas, una serie 
de acciones = un resultado acumulativo. 
Art Babbitt tenía un gran recurso de embellecimiento mediante las manos al final de un take que 
gran cantidad de animadores utilizaron. 
Después del take, cuando el personaje vuelve a su estado normal (si tenemos tiempo para ello) 
los brazos realizan una agitación elaborada por unos, muy rápida. 
Los brazos realizan 
balanceo alrededor 
de un círculo 
contraponiéndose
uno al otro.
 
Pueden hacer la 
figura del 8 en sus 
contraposición
El brazo izquierdo hace lo mismo que el derecho pero lo inicia más tarde contraponiéndose. 
Y es una 
oportunida
d para 
romper las 
uniones.
Su brazo 
izquierdo
se retrasa 
mientras
que el 
derecho
sube
Otro pequeño refinamiento: su brazo puede golpear el sombrero sacándoselo. Poniéndoselo de 
nuevo 
Tipo Charlot...
Necesitamos un
mínimo de 12
fotogramas para esto.
 
 
otro brazo sube
y saca de golpe
el sombrero por
el otro lado.
O lo coloca de
nuevo.
Sus pies pueden
pedalear en el
Aire.
Variaciones
Interminables.
Es una buena idea buscar un "colapso" extra. 
Digamos que un hombre ve algo extraordinario y grita "¿Queeeeeeeeeeee?" 
Baja para anticipar
Sube para el acento Fin de la posición
Mira
Esto sería un trabajo correcto. Pero busquemos otro "colapso". Otra posición que la refuerce y 
que nos de más "cambio", más vitalidad. 
anticipación
Mira
acento
La
importante
posición
de colapso 
extra
acento
más
alto
Por lo que buscaremos lo que sea necesario para darnos más cambio dentro de la acción. 
Pongámoslo en otro caso. Démosle otro alzamiento al personaje para mirar antes de la bajada de 
anticipación. De nuevo anticipamos la anticipación. 
Sube
Y cambia
la inclinación
para mirar
más de
cerca
Quizás corramos el peligro de sobre-animar (of gilding the lily here), pero siempre merece la pena 
observar si hay otra posición momentánea que nos de la posibilidad de crear más contraste, más 
cambio interno (desde luego no hay nada como intentarlo). 
Demasiada anticipación a veces puede cansar y dar innecesarios takes locos. Solo para 
contradecir toda esta acción frenética, arriba, abajo, alrededor, uno de los takes más fuertes que 
nunca haya visto fue en una película de Basil Rathbone como el Villano. El estaba justo en medio 
de la pantalla cinemascope dando información a un ayudante con el que chocó con él. 
Había mucha acción detrás y alrededor que podía distraer nuestra atención, sin embargo su take 
salta a la vista. Apenas se mueve una distancia y sin embargo ¡lo ves! No hay bajada de 
anticipación y no hay estrechamiento en el acento. Parte de que lo veamos se debe a que la 
cabeza esta congelada en medio de la pantalla (el sagrado centro oval) su cabeza realiza un corto 
y agudo movimiento de subida y luego se amortigua un poco. 
Se
mantiene
oyendo
- La cabeza va al #4 (el acento)
en 3 fotogramas!
- Entonces se amortigua en el #11
en un retenimiento virtual.
El take entonces es de 3 fotogramas
con una amortiguación.
El espaciamiento
Amortiguación
"Se nota"
el acento
Por lo que si definimos un take como un movimiento fuerte para mostrar sorpresa o reacción, lo 
que sucede sin todos nuestros recursos de animación que sin embargo nos son útiles, porque la 
vida no sigue nuestras fórmulas de animación convenidas (estudia cualquier acción real). 
Conseguir acentos correctos fue lo que más problema me dio en la animación. Tenía que
trabajarlos, si era un acento suave en la cabeza o en le cuerpo.
O un acento duro, 
afilado de una mano 
o un dedo, incluso, 
¿Cuánto tiempo 
debía mantener la 
mano ahí fuera para 
que se viera claro?
Trata de señalar 4 veces en 1 segundo
= 4 acentos. Es bastante duro. 4 paradas 
estáticas de 6 fotogramas cada una. 
¿Y como vas de una a otra? De cualquier 
forma descubrí que necesitas al menos 
6 fotogramas para marcar cualquier acento.
 
Tex Avery dijo que eran 5 fotogramas. 
Necesitas un mínimo de 5 fotogramas para 
marcar una suspensión. El caso de Tex es 
que iba tan rápido que supuse que 
funcionaria lo suficiente para marcar una 
pausa en el contexto de toda esa velocidad.
Finalmente caí en la cuenta, como es usual, el secreto es muy simple! Se trata solamente de 
conseguir diferenciar entre un acento duro y uno suave.
Speeding in
Speeding in
Y un acento suave tiende a irse.
Un acento duro retrae, rebota hacia detrás.
Trata de señalar de forma dura
y que tu dedo rebote hacia 
atrás, o sube o baja 
o se agita un poco. 
No quiere quedarse quieto. 
Si señalamos más suavemente 
la mano se amortiguará como 
si se retrasara a pararse. 
Con un acento duro. 
Si golpeamos un yunque con un martillo de acero, obviamente el yunque no se verá afectado por 
el martillo y éste rebotará. 
De nuevo el sonido
está en el rebote
– 1 fotograma después
del contacto.
Con un acento duro:
Si golpeamos un
yunque con un
martillo de acero,
obviamente el
yunque no se verá
afectado por el
martillo y éste
rebotará.
Contacto
durante
1 fotograma
inmediatamente
rebota (y lentamente se mantiene)
Lo mismo con un martillo.
Golpeando un clavo, el acento no esta en el momento en que el martillo contacta con el clavo.
 No incluso aqui tampoco.. en este. 
Un acento suave se mantendrá
el pensamiento en un
director de orquesta
dirigiendo a tiempo
de vals.
Sentimos el
acento por aquí.
y la mano
continúa
sobre el
pasado
sentimiento
de acento.
UN ACENTO DURO REBOTA
Un hombre señala
enfáticamente....
Va Se siente
 el 
Acento
 Se siente
 el 
Acento
Rebota
Mostramos #10
 Sentimos
 el acento en #6
(Aunque a veces una acción dura se interrumpe abruptamente, tan abrupta como pueda).
UN ACENTO SUAVE CONTINUA
De nuevo pensando
en un director de
orquesta...
va Se siente
 el
Acento
Se siente
el acento
.... continua
Sentimos en
acento en #6
Mantenemos la aceleración hasta el acento, pero el movimiento aún continua.
Una patada de karate, después del golpe, rebotará en un duro acento. 
Después de la 
deceleración el 
en sentido 
acento #1
Entonces rebota
y captamos el #9
Pongamos alguien disparando, se desplaza el fusil por el impacto.

---

## Sección 42: Core Concepts & Foundations [Entropy: 0.25]

Oímos el tiro cuando el individuo salta hacia atrás
sin nada entre medias y lentamente vuelve a su 
posición normal. 
En doses
Rebota a la posición
Salta al #3
Impacto
 atrás
 Un acento suave Un acento duro Puede ser duro o suave 
 "Sería feliz de .." "Desde luego" "Hola por aquí Cutie"
 En
doses
Se siente
el acento
Doses
Se siente
el acento
Se siente
el acento
Rebote
(Pero normalmente
losacentos de la 
cabeza están 
arriba. ¡Observa 
el diálogo!) 
EL RITMO, TAMBALEO, ONDEAR Y BATIR
 
Tenemos el arte que puede jugar más libremente con el tiempo. 
No usamos un tiempo normal. Podemos ir tan rápido que resulte de un simpático y una actividad 
frenética como ir tan lento y conseguir belleza y dignidad. 
Hace años un amigo científico me enseñó una película que hizo sobre el mundo de los hombres y 
animales. Nada se mostraba a velocidad normal. Estaba intencionadamente filmado demasiado 
deprisa o demasiado lento. Tenía elefantes corriendo como ratones y viceversa, gente en rituales 
religiosos corriendo alrededor como si jugaran, gente besándose en cámara lenta, etc. Después 
de una hora tu mente se distorsiona, dando una especie de visión de dios, de la vida y la acción. 
Había una secuencia de un vagabundo en un banco del parque colocándose una cerilla en su 
oreja. Se filmó un poco a cámara lenta, 30 o 32 fotogramas/segundo. Conforme el jugaba con la 
cerilla, veías pequeñas ondas de músculos desplegados a través de su cara, cosa que nunca se 
verías a velocidad normal. Extraño, pero no podía apartar la vista. 
Desde entonces, siempre he tratado de evitar el ritmo (timing) normal. Siempre trato de ir un 
poco más rápido y de pronto cortar para ir solo un poco más lento, combinando. Buscar el 
contraste, el cambio. Lo lento contra lo rápido. Manteniéndose de acá para allá. Es difícil de 
detectar, pero provoca una visualización compulsiva. 
Tambalear ritmos
Hay varias maneras de tambalear dibujos de acá para allá, para causar cosas para agitar o vibrar, 
para que las manos tiemblen o ayudar con risa o llantos. 
Hacemos una serie de dibujos de acción normal y lo intercalamos de acá para allá de formas 
diferentes para hacerles estremecer y agitar. 
La forma más simple de vibración temblorosa es: 
Digamos que 
queremos una 
hoja agitada por
el viento.... 
#1 y #9 son los 2 extremos y solo haremos 7 iguales entre ambos. 
Entonces cuando 
expongamos en 
nuestra lámina – X
en vez de la usual.
Nos saltamos 
uno y luego 
volvemos
atrás....
Las vibraciones 
también
trabajan bien 
en doses. 
O saltamos a la 
redonda para 
un efecto más 
violento. 
Entonces cuando 
expongamos en 
nuestra lámina – X
en vez de la usual.
Y no estamos limitados 
por esto. Para variar 
sostén alguno en 2 o 3 
fotogramas y otros 
en uno. 
 Es una exposición 
errática. Depende de lo 
violento que queramos 
que sea. 
Puede 
funcionar 
cualquier
combinación. Es el principio
de la exposición temblorosa
(Staggered Exposure) 
Otra manera: 
Toma un trampolín vibrando, después de que el saltador lo deje. 
Hacemos #1, 9, y 17. 
Desde luego, podemos 
darle más flexibilidad, 
pasando posiciones 
entre los extremos. 
Pero trabaja bien 
de cualquier forma. 
Estas son las vibraciones que la 
mayoría de los animadores usan. 
A falta de un nombre la llamaré 
vibración "arriba y abajo" o 
"atrás adelante".
Con pares en medio. 
Es sorprendente lo que puedes 
repetir cada final #1 a #17 y cuando 
se endentece para terminar.

 Puede usarse para reír o llorar: 
 
 
 O tiritar de frío: 
Hombros 
arriba. 
Debido a que los extremos de la cabeza
están juntos y las rodillas apartadas 
lejos, podemos conseguir una variedad 
de espaciados en la acción. 
Hombros 
abajo. 
Hombros arriba 
y abajo. 
El único problema con este método es que tiende a ser un poco mecánico. 
Podemos romperlo haciendo más interesante al pasar posiciones por dentro. 
Pero el método realmente grande fue desarrollado por Norman Ferguson de Disney. 
Ken Harris me lo mostró y lo tiene desde Shamus Culhane, quien lo cogió de Ferguson. 
A falta de nombre lo llamaré: 
Fórmula de vibración lado a lado 
Digamos que queremos 
tener una cabeza 
tambaleada de lado a lado. 
Hacemos una serie de 
dibujos de 1 a digamos 33. 
Y tenemos un 
tambaleo de lado 
a lado al tener 
2 tiras de acción. 
2 patrones de 
acción intercaladas.
Entonces lo 
intercalamos. 
Entonces, hacemos un 
cuidadoso calco de #1 y #33ª 
subiendo la otra cara. 
Intercalando dos series de dibujos no da toda 
clase de posibilidades para la acción de vibrar. 

Así, básicamente, solo dos series de dibujos hechos separadamente e intercaladas unas con otras, 
dando un sinfín de posibilidades de temblores, estremecimientos, agitaciones. 
Manos con
pálpito.
Ken Harris, animó una escena donde el personaje tenía una vibración de terremoto
subiendo por su cuerpo desde los dedos a sus piernas, a su espalda. 
Usando este sistema quedaría así: 
Serie 
a
Intercalando 
con serie 
1ª a 9ª. 
(Pongamos que 
queremos un brazo 
elevándose triunfal o 
de rabia, vibrando a 
medida que sube) 
(Y desde luego, puede ser más inventiva con posiciones de paso y rompimientos dentro de la
acción) 
Serie A 
Serie B 
ACCION LÁTIGO
ACCION OLA 
Algún tipo de cosas como látigo, pero sin el acento al restallar. 
Ken Harris, usaba este ejemplo: 
Un hombre balanceándose de una cuerda. 
Ligera 
inclinación. 
La mano lleva el látigo
hacia delante. 
La correa se relaja el
próximo fotograma 
tras el restallido. 
Necesitas 1 
fotograma aquí, 
antes del impacto 
para llevar el ojo.
La mano en E está 
subiendo o bajando 
de vuelta. 
Bastantes 
pocos 
fotogramas 
después. 
Restalla solo durante 
un fotograma. 
El sonido va un 
fotograma después. 
(Aunque en realidad la 
cuerda estaría tirante por 
el peso del hombre) 
(Y desde luego se 
amortiguaría en cada 
extremo) 

Aquí tenemos la acción del látigo, aplicada al batir de los ojos de una mujer (exagerado) 
Ayudándonos en los 2 últimos meses de "Christmas Carol", Abe Leviton animó una maravillosa
y pequeña carcajada de Tiny Tim. En la cena, Abe y yo, estábamos fundiéndonos el vino y yo
estaba machacando sobre su trabajo y la gran carcajada que acababa de crear. Abe dijo: 
"Bueno, estoy muy contento de que años atrás, Ken Harris me mostrara el principio del látigo
como patrón para una carcajada" "¿Qué? ¡Enséñamelo, enséñamelo!". El regresó al estudio y
Abe garabateo algo como esto: 
"¿Qué? ¡No lo capto!".
"Vamos, Dick, es el patrón látigo. 
Mira, como esto.... "
"¿Esto es lo que hiciste con Tiny Tim? "
"Si, ya sabes, la acción látigo, como esto... "
La carcajada de Abe en la siguiente página, muestra como pueden usarse esos principios
básicos. Los hombros suben y bajan en la carcajada y puedes comprobar el patrón látigo
funcionando entre líneas en la acción. 
DIÁLOGO 
Imaginemos un hombre guapo hablando con una bella mujer y esto es lo que él dice: 
Parece que esta diciendo "I love you" (te amo) ¿verdad? 
Pues no. Lo que dice es "Elephant juice" (zumo de elefante). 
(Mi hija de 11 años me lo trajo de la escuela). 
Inténtalo. Esto ilustra hasta que punto que no debemos estandarizar las formas de la boca para 
las consonantes y las vocales. Todos somos diferentes. Nuestras bocas son diferentes y la usamos 
diferenciadamente. No hay una manera fija para formar letras y vocales individuales. 
El actor Jim Carrey mueve la boca de forma diferente a como lo hace la Reina de Inglaterra.. 
Desde luego que todas nuestras bocas se abren para pronunciar las vocales A,E,I,O,U (ay, eh, y, 
oh,uuu) y la cerramos para las consonantes B,M,P,F,T,V (bah, mira, pepe, furia, tu, vaca) y la 
lengua esta tras los dientes en N,D,L,T (N del T: en castellano se pueden añadir C,R,Z..) pero un 
montón de posiciones en la vida real son ambivalentes e individuales.

---

## Sección 43: Core Concepts & Foundations [Entropy: 0.304]

Cómo NO hacer sincronización labial.
Tenía una entusiasta maestra en el 6º grado con una boca ancha
repleta de grandes dientes pintada de lápiz de labios rojo brillante.
Cada mañana nos hacia levantar y muy lentamente
(n del t: se trata de frases sin importancia, cuyo valor
es de mero ejercicio de pronunciación. Se dejan en ingles
 ee-nunn-seeayteh:
 “Moo vah bull lipssssss,
 Moo vah bull lipssssss
 Arr thuh vehree behsst lipss
 Too tawk annnd sssing withthth”
Seguido de:
 “Good mohrrnninng too yoo
 Good mohrrnninng too yoo
 Weer oll inn owrr playysezz
 With ssunnnsheynee fayssezz.
 Ohhh, thisss izz thuh wayee
 Too stahrrt ahh neeyoo dayee”
A veces nos hacía sentar y decir “P” (PUH) durante un minuto
y me gustaba escuchar las pequeñas explosiones de aire.
La gente no habla así.
Nosotros mezclamos la forma de una palabra con otra.
Los animadores lo llaman:
FRASEANDO
Como en música, se funde todo en un rápido y complejo pasaje sobresaliendo sólo lo principal, no 
se tiene que ametrallar cada nota de forma igual, las difuminas. 
La cosa es pensar en las palabras, las formas de las palabras y frases y no en letras. 
Nuestras bocas son todas diferentes. 
Presentan los dientes de abajo casi 
todo el rato.
 una
 especie
alarmante.
 Hola Richard,
soy un monstruo
 amigable.
El dentista de Vicent le dijo que
tenía una caja de resonancia
para la voz de gigante que le
otorgaba unas cualidades
terroríficamente ricas para
la escena. Pero lo mejor es
que su cara era tan elástica
que por un segundo o dos
enseñaba los dientes de
arriba....
...Luego
 los de
 abajo.
...luego
ambos.
e inmediatamente
todo en una oración.
Lo mas gracioso que me ha ocurrido en la sincronización labial fue hace tiempo por vía de la voz 
de Vicent Price, porque posee una cara muy móvil en boca, mandíbula y garganta. De lado es 
tal como se espera, pero cuando se pone de frente parecía un pez.
Y debido a que desplegaba su diálogo, tenías el tiempo de articular todos los saltos, las vocales y 
consonantes lentas (como si retrocedieras al grado 6º de educación). Podrías sobreanimarlo y aún 
quedaría natural. Principalmente teníamos que sujetar nuestra acción de la boca a menos que 
estuviéramos gritando o cantando. 
Las consonantes importantes son las que cierran la boca. 
Para captar estas posiciones necesitamos, al menos, dos fotogramas. Con uno no es suficiente. 
(Si no realizamos estas posiciones, las vocales que les siguen se fundirían) 
Para conseguir un diálogo fresco debemos saltar (explotar) dentro de nuestras vocales (no entre 
ellas). Que no se amortigüen. Amortiguarlas después del acento. Golpéala fuerte y entonces 
suavízala. Golpea el acento del diálogo. Esto es: "BANG". 
O podríamos amortiguar un poco en la parte baja del salto (explosión) y tener un pequeño salto 
(o explosión) en el NG. 
Amortigua
Toma la palabra "BAYS BOLL" con dos vocales. Golpea la primera vocal más duramente que la 
segunda. 
Amortigua hacia B amortigua hacia L
De nuevo, si alguien pronuncia una vocal abierta como "HEY" o "WOW" no aflojar la vocal desde 
la W con varios dibujos así: 
= muy sensiblero y blando 
(crítica entre animadores: 
“El/ella esta bien, pero es 
todo un poco blando..”)
I.E.
Pierde las posiciones intermedias. 
 
y no olvides dilatar la
cara, estírala. 
I.E.
Una falta extendida en el diálogo es que la parte inferior de la cara no se estreche y comprima lo 
suficiente lo que lo hace rígido y afectado. 
La CLAVE para la sincronización labial es el conseguir la sensación de PALABRA y no letras 
individuales. La idea es no ser demasiado activo. Consigue la forma de la palabra y comprueba 
que se vea. Selecciona lo que es importante y evita aletear la boca animando cada cosa. 
Los actores de doblaje captan los golpes y brillos en medio de toda la trama. Igualan con la 
primera vocal al comienzo de la frase y el último acento de la misma. Y lo que esta en medio 
funcionará. (o tiende a funcionar) 
Piensa de esta manera: 
No hagas esto.
Has esto:
Usa solo dos posiciones.
Ve de una a la otra.
Toma "HELLO".
Lo mismo.
Ve directo de
uno a otro.
=no abras dos veces.
=no abras dos veces.
reduce a lo simple.
En medio.
Toma la palabra "FORTUNE"
Podemos ser literales al oír nuestra pista de sonido 
"MEMORY" no tiene dos aperturas. Tiene una. 
En este caso se cierra la 
boca en ruta a la “REE” 
No animaremos 
cada simple 
vocal.
No se abre en 
la E y en la O, 
a menos que 
estemos
cantando.
Solo se abre 
en la E.
Recuerda que los dientes superiores están anclados al cráneo y no se animan y la mayor parte de 
la animación de la mandíbula es de bajada y subida, con los labios y la lengua formando los 
sonidos. 
Una regla: Nunca intercale la lengua en el habla. Nuestras lenguas trabajan tan rápido que sólo se 
ven arriba o abajo, nunca en ruta (desde luego se pausa) 
No hay un dicho: si la
lengua no pesa ¿porqué
solo unos poco pueden
sujetarla?
La lengua sube en la L y baja en el siguiente fotograma
La lengua cuelga de la parte de atrás de la mandíbula inferior y no flota en el limbo o esta 
atascada en la garganta. Tampoco la mandíbula y los dientes son de goma. Dale consistencia a 
los dientes. 
Sin embargo existe una terrible y graciosa materia que hace que haya días en los que digamos 
"¡Diablo, es un dibu!", "Dejémosle ser un dibu!" Y tratará los dientes como si fueran de goma y 
saltará de esto. 
(Es valido e incluso 
divertidísimo, pero no 
es de lo que tratamos 
aquí)
A esto a esto a esto
Otra regla: Quedamos en que necesitábamos 2 fotogramas para captar las consonantes 
importantes como M, P, B, F, V o T. Si no, el espectador no la vería. 
Si en el sonido 
captado sólo 
tenemos 
1 fotograma, 
indicadopor el 
sonido M, 
No es suficiente.
Por lo que se 
lo hurtamos
al sonido 
precedente, 
dándonos un 
fotograma extra 
para registrar, 
nunca después.... 
.....Porque
necesitamos 
golpear la vocal Y,
que sigue, 
en la nariz. 
IMAGEN Y SINCRONIZACIÓN DEL SONIDO
Esto nos lleva al espinoso problema de: sincronizamos al mismo nivel la animación o animamos la 
película con un fotograma por delante de la modulación del sonido, o dos fotogramas. ¿O qué? 
Respuesta:
trabajar igualando
el nivel.
Pon nuestros dibujos de M #6 y 7.
Directamente sobre el sonido M.
Pon nuestro dibujo de M #5
un fotograma por delante del sonido M
(Y el dibujo de Y en
#7 un fotograma por
delante del sonido Y,
Y etc...)
O si estamos en doses
y trabajas por ese camino.
Trabaja un fotograma
por delante.
Existe la tosca regla de hojear (la animación) 2 fotogramas por delante del sonido para ver mejor 
la secuencia. Debido a esto surgió una enfermedad por la que algunos editores ejercían la tiranía 
de imponer a los animadores que todo lo animaran 2 fotogramas por delante del sonido para que 
pudieran adelantar el trabajo e irse a casa. 
Falso. No es solo una regla. A veces la sincronización funciona mejor a nivel, a veces es mejor con 
la película avanzando un fotograma por delante o incluso 2 fotogramas (he aquí la enfermedad). E 
incluso a veces va mejor con 3 fotogramas por delante del sonido. 
Si siempre respondes
"2 fotogramas por delante"
te verás en complicadas
situaciones en las que
estas pensando de lado.
¿Porqué?
Conclusión: 
Existe la sincronización real que es a nivel, justo sobre la modulación es 100% perfecto 
lógicamente. Todo dependerá de cómo se vea mejor cuando la ejecutemos. Por la que la 
exponemos directamente en la nariz o un fotograma por delante, si es conveniente. 
Nunca después. 
Entonces podemos visualizar nuestra prueba sincronizada a nivel y entonces avanzarla una, dos o 
tres fotogramas, dependiendo de lo que nos parezca mejor. Aprenderemos cosas de esta manera.

---

## Sección 44: Core Concepts & Foundations [Entropy: 0.268]

Todo depende del carácter y tipo de voz y como hemos hecho el trabajo. 
ACCENTS (ACENTOS)
Los viejos maestros afilaban las acciones físicas y movían la cabeza 3 ó 4 fotogramas por
delante de la modulación y ponían la acción de la boca en el extremo. 
(En una manera de hablar). 
Accent de la cabeza x
Acentuación (accent)
Accent del sonido
x
Accent de la cabeza x
Accent del sonido
x
En unos
En doses
3 fotogramas por delante
4 fotograma por delante
Acentuación (accent)
Ellos llegaban allí (o bajaban) 3 ó 4 fotogramas antes, entonces la boca se abría sobre el sonido. 
Pon simplemente
El recurso daba un
bello resultado,
mucho mejor que
atacarlo todo
enseguida.
Acento
La mayoría del tiempo la acentuación de la cabeza sube. 
1. anticipar abajo. 
2. entonces subir la cabeza para acentuar. 
3. entonces los labios en la vocal. 
 
 
(Normalmente es una vocal sobra la que atacamos) 
Podemos hacerlo a la inversa, pero la mayoría de la veces tiene más fuerza subiendo (pero bajar 
también es estupendo) 
De todas maneras, siempre hay un acento (N del T: por acento debemos entender los puntos más 
fuertes en el ritmo de una frase que se marcarán con movimientos de la cabeza), a menos que se 
trate de una persona completamente aburrida hablando. 
Por ejemplo: 
 "Well, at last you´re home!" (3 vocales subrayadas) = 3 accents. (N del T: traduciendo al 
cristiano: "bien, al fin estas en casa". 
Marca sólo las vocales importantes. Encubre las otras. Nosotros marcamos ciertos acentos cuando 
hablamos y pasamos del resto. 
O
"Well, at last y
ou´re home!"
 (gran acento)
O
"Well, at last you´re home!"
pequeño Gran
acento acento
Marca solo los grandes acentos. Selecciona los que son importantes. 
Detecta si son acentos duros o blandos. 
Acento duro: "No!" , baja (o sube) y rebota hacia atrás. 
Acento blando: "Nooooooo"... baja (o sube) y continua. 
312
Gira
Anticipación hacia 
abajo de la cabeza 
Sube la cabeza 
Los hombros 
 bajan para 
 anticipar 
 el acento 
 Parpadeo:
La cabeza baja
el hombro sube
Acento 
La 
cabeza
sube
El 
hombro
baja 
Aquí pongo un ejemplo de predominio de la acción 
Del cuerpo. Ella dice: "I´ll slip into something cooler" 
(Me pondré algo más fresquito). Nótese el acento en oo. 
Ella lo hace con su hombro. 
Se alza cuando ella se vuelve hacia nosotros, 
se baja para anticipar y sube rápidamente 
para el principal acento en cooler y al mismo 
tiempo la acentuación de su cabeza baja en "co": 
el único acento de la boca también está en "co". 
Hombros arriba, cabeza abajo, boca exagerada. 
Todo para marcar el único acento de la secuencia. 
Estos son los extremos principales: 
claves #1, 37 y 55 cuentan la historia. 
Esto funciona bien, pero sería mejor si los
acentos de la cabeza y hombros fuesen 3 ó 4 
fotogramas por delante de la modulación “oo” 
ACTITUD
Señala la toma de forma clara, primero con la acción del cuerpo. La actitud del cuerpo ha de ser 
el eco de la actitud facial. Es todo uno. La expresión del cuerpo y de la cara es más importante 
que el movimiento. 
Si conseguimos una correcta actitud de cuerpo y cabeza casi podemos seguir sin la boca. 
La acción de la boca ha de ser lo último en lo que trabajemos. 
Ken Harris dijo que aprendió la mayor parte de lo que sabe sobre sincronización cuando tuvo que 
animar un marciano que no tenía boca. Esto le obligaba a marcar los acentos de la cabeza 
correctamente para que fuera convincente. 
Planificando debemos estar seguros que no hemos cargado demasiado. ¿Cuántas poses en esta 
frase? ¿Por este pensamiento? Represéntalo y redúcelo a lo mas simple y mantenlo simple. 
Solo podemos poner una cosa cada vez. Como solo podemos decir una palabra cada vez, solo 
podemos proyectar un gesto cada vez. Toda la pose trabajará en dirección a esa única cosa. 
EL SECRETO
Una noche estaba hablando con Milt Kahl sobre las magníficas formas que conseguía él en sus 
bocas. Me dijo "Estudia las bocas de los cantantes". 
Le pregunté si había en realidad algún secreto en la sincronización vocal. 
Se encendió ¿quieres el secreto? ¡Te contaré el secreto! Conoces a Jin Henson con su marioneta 
de rana. (N del T: La rana Gustavo de Barrio Sésamo). Bien, él es un genio. Él comprendió algo 
que los titiriteros nunca consiguieron antes. El solo se pone un calcetín en la mano y aunque no 
marca nunca el sonido con exactitud, lo hace mucho mejor que muchos animadores con todos sus 
recursos técnicos. Estudia lo que él hace. Esta desarrollando la acción. El va siempre a algún lado 
con la rana cuando habla. 
Lo aprendí de nuevo en "Song of the South" cuando el zorro le decía al conejo: "te voy a asar, 
etc, etc". Duramente movía la boca en todo. Hablaba a través de sus dientes mientras avanzaba 
hacia el conejo. ¡El progresaba hacia el conejo! Yo lo hacía avanzar mientras hablaba y ese es el 
secreto. Ve hacia algún lugar, cualquier lugar, mientras habla. 
Cuando regresé a Inglaterra corría a ver a Ken Harris dando saltos: ¡Tengo el secreto! ¡El secreto 
de la sincronización labial!, ¡Milt Kahl me lo contó! 
Ken me observó burlonamente 
"¡El secreto, balbuceaba yo, el secreto es avanzar la acción mientras habla!" Ken miró al cielo. 
"¿Qué crees que es lo que te he intentado explicarte?" 
Bien, el penique cayó (al fin) y nunca más miré atrás. Eso es. 
N del T: debe tratarse de una expresión coloquial inglesa, algo como "al fin me caí del guindo".
Actuación (Acting) 
Si en los años 30, alguien le preguntase a Louis Armstrong "¿Qué es el swing?", Louis contestaría, 
"si lo tienes que preguntar, es que nunca lo sabrás". 
¡Pero todos sabemos lo que es el Acting! Lo hacemos todo el día. Lo hacemos en diferentes partes 
todo el día. 
¿Actúas de la misma manera con tu mujer/marido/amante, que cuando un policía de tráfico te 
para? ¿O con el director del banco? ¿O con tus niños? ¿Con tu jefe? ¿Con tus compañeros? 
Desempeñamos papeles todo el tiempo, dependiendo de la situación en la que nos encontremos y 
de lo que sabemos. Sacamos a relucir la personalidad apropiada a lo que requiere nuestra 
situación. 
Está: 
La cosa está en tener cuidado y usarlo para expresar cosas, en desarrollar la habilidad de 
proyectarlo en nuestros dibujos o inventar imágenes para conseguir en los personajes que 
pintemos, en la situación en la que se encuentran, sabiendo lo que ellos quieren y porque lo 
quieren. Eso es ACTUAR. 
El autoritario. 
El niño. 
El estudiante. 
El adulto responsable. 
El amante. 
El amigo. 
El payaso. 
El comprensivo. 
El depredador. 
El maníaco de poder... etc.

---

## Sección 45: Core Concepts & Foundations [Entropy: 0.25]

Queremos dejar algo claro a través de un personaje en particular. Una representación clara de 
que es lo que va a pasar con el personaje. 
Haz cada cosa por vez y se claro como el cristal. 
Si empezamos con eso, podremos profundizar en nuestra representación tanto como seamos 
capaces. 
Ciertamente todos conocemos las emociones básicas. 
Todos sabemos de: 
Conociendo estas, solo se trata de cómo las manejan diferentes personas. 
Solo es una cuestión de ensanchar nuestro rango para acomodar más papeles. 
Lo que hacemos de forma natural mediante la observación y la experiencia. 
Y teniendo y desarrollando la habilidad de proyectarla en los personajes con los que trabajamos. 
Milt Kahk siempre decía: "Pienso que sólo hazlo". Si tienes un problema te debes poner a 
resolverlo. Consigue después el entendimiento profundo de lo que eres. Y sabes después lo que 
eres. Sólo mantenlo hasta que lo consigas.
Y "echa bastante rato pensando en la forma en que harás el mejor trabajo de poner la actuación 
en pantalla, poniendo lo que has de poner".
Métete dentro del personaje ¿Qué es lo que quiere hacer? 
E incluso más interesante ¿Por qué lo quiere hacer? 
¿Qué estoy haciendo y por qué lo hago? 
La gente que realmente sabe como actuar dice: "NO ACTÚES, SE".
La estrella de cine Gene Hackman, dijo "YO TRABAJO COMO UN LOCO PARA NUNCA SER COGIDO 
ACTUANDO".
Los buenos actores hacen un montón de estudios para que la realidad que interpreten sea su 
realidad. 
Miedo.
Codicia. 
Hambre.
Frio.
Lujuria.
Vanidad. 
Amor. 
Y la necesidad de dormir. 

El estupendo actor, Ned Beatty dijo "ALGUNOS ACTORES SE HIPNOTIZAN ELLOS MISMOS PARA 
HACER EL PAPEL, PERO HAY UN PEQUEÑO GRUPO DE ACTORES, QUE ACTUALMENTE 
HIPNOTIZAN A LA AUDIENCIA".
ASÍ QUE LA IDEA ES HIPNOTIZAR A LA AUDIENCIA. 
Frank Thomas usa la palabra "CAUTIVAR" "ESTAS TRATANDO DE CAPTAR LA ATENCIÓN DE LA 
AUDIENCIA Y MANTENERLA. Agárrala con algo REAL con lo que puedan identificarse".
CONCLUSIÓN: 
Tratamos de hacerlo tan real, super real, que es una visión compulsiva. 
Experimentamos la emoción y EXAGERAMOS el resultado. 
Siempre he sido acorralado por animadores alrededor del refrigerador, hablando sobre "La 
Actuación" (ACTING). 
Es bien sabido que un montón de artistas puede contar una lucha terrorífica, pero cuando ves sus 
dibujos, es una muerte relatada de lo que realmente les gustaría. Y cuanto más cuando sus 
dibujos se mueven alrededor. Pueden ver la fuerza y debilidad de una persona perfectamente. 
Si fuésemos un frío pez, una persona superficial o una ruina emocional, sería todo por ver... Por lo 
que solo podemos expresarnos lo mejor que podemos con lo que tenemos para ofrecer emocional 
y técnicamente. 
Pero un buen profesional, debería ser capaz de manejar un basto rango de material de actuación, 
cualquiera que sea el estado emocional de su mente. 
Existe la historia sobre un hombre fuertemente deprimido en Alemania que fue a ver un 
psiquiatra. 
El psiquiatra dijo: "Ha perdido su sentido del humor en la vida".
Usted necesita echar una buena carcajada. Vaya al circo. Allí está un gran payaso, Grock, el 
hombre más gracioso que se haya visto.
La respuesta fue "Yo soy Grock".
Frank Tomas, un maestro de la empatía y pathos animados, siempre me criticaba 
(constructivamente) por perder demasiado tiempo en animación circundante espectacular y no lo 
suficiente en ir directamente al centro emocional. 
Parte de la razón era que no me sentía que fuese aún lo suficientemente bueno para él. Por lo que 
trabajamos en el "mundo" de pieza y dejábamos el "Hamlet" para el final. Pero la crítica de Frank 
era válida. 
Animación era la clase de estancamiento cuando empezamos a hacer "Quién engañó a Rogger 
Rabbit" y Frank me mandó a una maravillosa carta de ánimo, incluyendo: "Si consigues esto, 
serás un héroe".
Llevaba la carta de Frank en mi bolsillo durante los 2 años y medio de producción la reelería cada 
vez que las cosas se volvían tormentosas. 
Cuando la película terminó y fue un éxito, Frank no me escribió. 
2 meses después fue la película del año y de Frank nada. 
3 meses después le llamé: 
Bueno, sabía lo que Frank pensaba. En mi defensa tuve que forzar la animación que hice al 
principio de la película. En donde podíamos ver como era el conejo, antes de empezar el tiroteo, 
que era como un cruce de cañón de chicle con fuegos artificiales. 
Pero esto daba una oportunidad real para el pathos que buscaba. 
Hubo una toma de Roger Rabbit, sentado en un cubo de basura en una callejuela trasera gritando 
porque creía que su mujer le era infiel. 
"Hola Frank",
"....Siiii.... "
"Hola Frank, bien, ¡Lo hicimos! ¡Fue un éxito Frank! ¡Un éxito!".
"....Siiii.... "
"Quiero decir, bien, que ¡hicimos lo mejor que pudimos y sucedió!".
¡Un gran suceso, enorme! 
"....Siiii.... "
"Bueno, se, Frank, que podría haber sido mejor, pero realmente
trabajamos muy duro y todo el mundo lo amó!".
"....Siiii.... "
"Bueno, er, hummm, me gustaría que pudieras decir que levantamos un
truco al nivel de una novedad, ¡Pero es un éxito!".
"....Siiii.... "
"Vamos Frank, se que siempre me criticas por no atrapar emocionalmente
a la audiencia, pero tu has conseguido que yo lo haga, cuando el villano
va a matar al conejo bañándolo en el baño de acetona, todos los chavales
de la audiencia gritaban. "¿No lo hagas! ¡No lo hagas!" ... (larga pausa)...
"Me gustaría que ellos les pasara".

Como Grock, quería mostrar una cara diferente de la personalidad del conejo bajo su máscara 
profesional. Quería animarlo yo mismo, pero tenía mucho que hacer. Teníamos un estupendo jefe 
de animadores que estaba a la vez muy solo y sabía que el era el hombre para el trabajo. 
Un alto ejecutivo vino y dijo: "A propósito, Dick, realmente quieres hacer esa escena".
A lo que dije: "Oh no, el es un magnifico animador y un inventivo gracioso, excelente, pero pienso 
que se equivoca en esta escena. El tiene una gran novia, está muy subido y no es la persona para 
ESTE trabajo". "Pero él lo quiere hacer realmente, Dick, me ha estado telefoneando para ello".
"Pero se equivoca, estará bien, pero no consigue darle la intención que deseo. El otro tipo debería 
hacerlo". "Pero él ya lo está terminando... ".
Perdí el argumento. Fue rechazado por votación, estaba mal, pero la película la sentía como un 
éxito y de todas maneras, no podía quemarme (enemistarme). Desde luego el resultado final fue 
tal como todas las otras escenas maniáticas y perdimos el tener otra dimensión del personaje, 
que le hubiera dado un empuje emocionalmente más fuerte de cara a la audiencia. 
Gané algo, perdí algo. 
En una entrevista en 1972, en el festival de cine de Zagreb, Frank Thomas, habló sobre un 
hombre "que nunca tuvo talento para el espectáculo". Era uno de los mejores asistentes que tuve 
jamás. El sabía cada cosa que pudieras enseñar sobre movimiento, moviendo los personajes y de 
pesos, pasos, y equilibrio y de todas esas cosas. Podía dibujarlos de cualquier forma, pero tenía 
un débil sentido del espectáculo y un pobre juicio de que hacer en animación. Su 
animación era siempre plana. Se movía estupendamente, pero a nadie le atraía. 
Milt Kaht siempre decía: "es una cuestión de escoger lo correcto para hacer y poner a funcionar tu 
mente sobre eso y no dejar que otras ideas interfieran. No dejes que tu idea principal se entierre 
o interfiera con cualquier otra cosa más".
CONCLUSION 
Pensamos sobre ello en conjunto. Justo como si fuésemos un actor haciéndolo. 
¿Cuál es el mejor camino para hacerlo mejor? Antes de animar comprendamos por adelantado 
exactamente que vamos a hacer. Sepamos a donde vamos.

---

## Sección 46: Core Concepts & Foundations [Entropy: 0.25]

Planifica y cierra las poses importantes. 
Art Babbitt dijo que el gran Hill Tytla (renombrado por el poder emocional y la pasión de corazón 
en su trabajo) ocupó días trabajando en pequeños esbozos. Lo trabajaba todo en miniatura antes 
de animar (y el resultado final salía tan rápido como a otros animadores). 
Grim Natwick también dijo que Tytla era un planificador muy muy cuidadoso. 
CAMBIO DE EXPRESION 
Yo estaba muy prendido de lo que el maestro/animador de Disney, Eric Larson había dicho en 
"The illusion of Life" de Frank Thomas y Ollie Johnston. 
Dijo que en los primeros cortos de Mickey, descubrieron este principio: 
Si estás mirando un retrato y: 
"El sujeto baja gradualmente sus cejas hasta fruncir el ceño, pausa, entonces 
arquea una ceja y mira de reojo, inmediatamente deberías percibir un cambio de 
uno a otro". ¡Algo muy importante ha ocurrido! 
A través del cambio de expresión se mostró el proceso de pensar. 
Pienso, Ok, abocetemos esto, en la forma más simple y veamos como queda. 
Gradualmente baja las
cejas y frunce. 
Pausa, entonces 
levanta una ceja. 
Mira de 
reojo.
Ole. ¡Está pensando! ¿Entonces me pregunto si hay una manera de potenciarlo?
Bien, subamos las cejas anticipando su bajada.

Esto funciona ¿Podemos potenciarlo aún más? 
¿Por qué no anticipamos la ceja levantada bajándola aún más? 
Baja antes de subir. 
Esto funciona también ¿Podemos hacer algo más? 
Un lento parpadeo durante
el viaje podría ayudar. 
Puede que hayamos sobreanimado y puede que se desgaste,
Pero muestra lo que podemos hacer, buscando posiciones extras. "MÁS CAMBIO,
MÁS EXPLOSIÓN".
BUSCANDO CONTRASTE
Milt Kahl, siempre decía que no cambiase la expresión durante un movimiento amplio.
Usaba este ejemplo: 
Pongamos que tenemos un personaje leyendo un libro. 
Oye un ruido 
que le asusta, 
le aterra y se gira.

En un comienzo hemos necesitado algo para cambiar desde, algo opuesto. 
Algo que es bastante diferente de los que estamos por cambiar. 
La idea es poner el cambio donde puedas verlo, no en pleno movimiento, a menos que la película 
sea algo lenta. Entonces podremos captarlo. De nuevo, la mente es el piloto. 
Pensamos las cosas, antes que el cuerpo lo haga. Siempre hay un segundo de separación entre el 
"TIEMPO DE PENSAR" antes de que el personaje haga la acción. 
Levantamos el libro 
y bajémoslo 
profundamente….
Démosle una expresión complaciente o entretenida.
Entonces tenemos un 
mayor cambio, un 
cambio más fuerte. 
EXPRESION:
La expresión cambia, cuando comienza a girar y sabemos que está asustado. 
Le hemos movido y cambiamos la expresión al final del movimiento, donde podemos verla. 
La expresión 
cambia, cuando 
comienza a girar 
y sabemos que 
está asustado. 
O también, le movemos y cambiamos la expresión al final del movimiento, donde podemos verla.
Cualquier 
camino es 
mucho más 
efectivo. 

UN PUNTO DE ACTUACIÓN 
Un mal actor apuntará 
y al mismo tiempo dirá: 
¡Allí va!
Pero podemos sacarlo del reino del 
chicle, simplemente apuntando 
primero para luego decirlo.
¡Allí va!
Mucho
Mejor. 
O decirlo y luego apuntar. 
Los gestos 
son más 
fuertes de las
palabras. 
Incidentalmente, con 
apuntar, es una buena 
idea empezar con la 
muñeca. 
Y que la mano y los dedos 
la sigan después. 
Y una cosas menor en un 
rápido movimiento si 
vamos de a 
Podríamos insertar un fotograma
antes de en dirección 
errónea. Demasiado rápido 
de ver, pero sentiríamos 
el chasquido. 

LENGUAJE CORPORAL 
El brillante director de arte/diseñador de Disney, Ken Anderson dijo: 
"La pantomima es el arte básico de la animación. 
El lenguaje corporal es la raíz y afortunadamente es universal".
Estuve con Ken en Teheran, justo antes de la revolución y tenía mucho miedo cuando proyectaron 
mi obra ganadora del Oscar "A Christmas Carol" para una audiencia iraní. Habíamos tratado de 
poner tanto lenguaje corporal en la película hasta donde nos permitía la obra literaria de Dickens. 
Desde luego, la audiencia no entendió ni una palabra. Un caricaturista de animación llamado 
Chuck Jones vino después, y nos barrió. 
Así que para nosotros, deberíamos de haber mantenido las palabras al mínimo y hacer todo 
claramente a través de la pantomima. Debemos sentir que tenemos solo el cuerpo para contar la 
historia. Es una gran idea estudiar el cine mudo. Si bien mucha de la actuación es ridícula y 
gastada, es muy clara. 
Casi como un arte perdido. 
Un actor tiene que ser espontáneo hasta cierto grado. Pero para nosotros los animadores, ser 
espontáneo es todo menos eso. Podemos sentarnos y darle un montón de intención. Podemos 
ensayar cosas, probarlas y hacer cambios. 
Tenemos un gran control de nuestro cuerpo y no estamos limitados por los imperativos físicos o 
gravedad, edad, raza o sexo. De nuevo, podemos inventar lo que no existe en la realidad y aún 
hacer que parezca creíble. 
SIMETRÍA O "TWINING" (GEMELIZANDO)
Siento que la simetría ha tenido una mala prensa debido a una mala actuación en la animación. 
La gente dice: "Evita la simetría", donde ambos brazos y manos hacen lo mismo. 
Pero observa a cualquier político, predicador, orador, líder de lo que sea o experto en TV.
Cuando están exponiendo, sus brazos y manos se emparejan simétricamente. 
Aquí un amplio patrón. 
(Entonces se 
rompen)
(Necesitamos equilibrio, 
armonía, abundancia)
Felicidad 
para todos
Y tu decides 
votarme o 
mandarme dinero.
Para que pueda 
repartir gloria. 
Se dará ilustración,
armonía,
abundancia,

Pueden que lo hagan en una versión reducida. 
"Soy abierto, honesto".
Sale de mi 
corazón.... 
Y nunca te 
mentiré. 
En orden de traer
la gloria inclusive.
El futuro es 
para todos. 
Y obsérvate, cuando prometes sobre algo. Lo hacemos naturalmente. Pienso que la simetría es
una expresión de armonía, belleza, equilibrio, orden y autoridad y la gente la utiliza todo el
tiempo (rompiéndola en un punto o lo que sea) y vuelve a esa expresión. 
En conjunto nos tratan de convencer. 
Así que un uso razonable de la simetría es efectivo por que está en todas partes. 
Todo está en como lo usemos. 
RÓBALO 
En una de nuestras maravillosas clases de actuación en TV, Michael Caine impresionó a todos
diciendo: "Si ves algún actor haciendo una pieza que admiras, róbalo".
(Pausa efecto). "Róbalo" (la audiencia se horrorizó) "porque.... ellos lo hicieron".
OJOS 
Sonaba este consejo en los primeros estudios Disney: 
Si estás corto de tiempo, úsalo en los ojos. Los ojos es lo que la gente observa. 
Desde luego es verdad. Los ojos son la parte visible del cerebro. Directamente conectados a él. 
Creo que es porque vemos el "alma" de la persona revelada en los ojos. 
Da miedo. 
Miramos dentro unos en otros. 
Como lo haría un danzarín. 
O inclinar otra parte.
O usar planos de perspectiva.
Nuestros
ojos son muy expresivos y nos comunicamos
fácilmente, solo con ellos. Podemos contar una historia solo con
los ojos. 
Y es más dramático volver los ojos que volver todo el cuerpo. 
He aquí algo que vemos todos los días y no vemos animado
hasta que empecé a comentarlo a los animadores hace 5 años. 
Cuando estamos al teléfono, los ojos 
se mueven a todos lados en forma 
de staccato, reflejando los cambios 
de pensamiento del oyente por reacción. 
Nuestros ojos raramente están quietos. 
Es bueno dilatar la pupila para mostrar su forma. Se siente parte del ojo.
Hay una variedad infinita de parpadeo, pero aquí una fórmula simple. 
Es tosco, pero efectivo, va bien en unos y doses. 
Podemos continuar para siempre hablando sobre actuación, 
(y lo hacemos), pero nuestro trabajo es:

---

## Sección 47: Core Concepts & Foundations [Entropy: 0.25]

Bajo la pupila con el párpado como si fuera pesado, forzándolo a bajar. 
-Exponer el punto de la escena claramente. 
-Entrar dentro del personaje o personajes. 
(Todo el mundo es diferente) 
-Muestra claramente lo que piensan. 

ACCIÓN ANIMAL
 
Los animales de cuatro patas caminan como dos de nosotros juntos, uno ligeramente delante del 
otro, dos juegos de piernas ligeramente desfasadas. 
 
Comparamos todas las cosas como si fueran humanas. Empezamos con la posición de contacto 
(posiblemente poniendo un pie delante). ¿Dónde sube y baja? ¿Dónde lleva el peso? 
¿A que velocidad camina? ¿Características? ¿Diferencias en la figura? 
La pelvis 
sube
El pecho 
baja
El hombro 
derecho mas 
abajo aun
Un paseo 
a cuatro patas 
tiene dos 
extremidades
principales
(exageración)
Sube al 
dar el 
paso
El pecho 
baja en el 
contacto
La cabeza 
baja cuando 
el pecho baja
La pelvis baja
Baja
en el 
contacto
La cabeza sube 
ligeramente
después del pecho. 
Tarda 2 o 4 fr.
El pecho 
sube al 
dar el 
paso
El hombro sube
Pero con dos juegos de piernas trabajando, hay mucha transferencia de peso al andar. 
De donde viene el peso, donde esta y a donde va. 
Si queremos ser "realistas" en nuestra acción vamos a tener que investigar: cómo esta formado el 
animal, su tamaño y tipo, observándolo y observándolo hasta que lo conozcamos. 
 
REFERENCIA DE LA VIDA REAL
Estudia películas y videos y las extraordinarias fotografías de animales de Muybridge donde las 
formas del músculo; alargadas, cortas y cambiantes se despliegan claramente contra las rejas del 
fondo.
 
Un maestro del movimiento animal, Milt Kahl, realizó una completa investigación en los animales 
y cuenta que siempre es igual. Empleó cientos de horas estudiando el comportamiento de varios 
animales, sus paseos y carreras, y lo importante es que el peso esté donde se dibuja. No pensó 
que hubiera una manera fácil de llegar a estas conclusiones: tenemos que pasar por ellas. 
Mil tiene fe absoluta en los libros de Muybridge, los encontró mejores que la película, debido a las 
rejas.
Ken Harris también confia en Muybridge. Sacó una conclusión sencilla, algo así: 
La cabeza gira con
(o contra) el pie 
Que se adelanta. 
La principio de la
cola se mueve con
la pierna trasera.
Y el resto la 
siguecomo si 
fuera un látigo.
La cola desde atrás.
"Todos los animales 
caminan básicamente 
igual, pero tenemos 
ciertas consideraciones 
al dibujarlos" 
La mayoría de los paseos animales son bastante similares, si entendemos el paseo como un 
medio para construir un animal como un caballo, un perro o un gato grande, podemos aplicar el 
mismo conocimiento a otros animales dependiendo de su tamaño, peso, diseño y sincronización 
Pausas de un exitoso aterrizaje. 
Si nos ponemos a andar a cuatro patas sentiremos como caminan. 
Paso de Pose Paso de Pose Paso de Pose Paso de Pose
contacto
contacto
contacto
contacto
Abe Levitow formuló 
una interesante pregunta.
¿Un caballo camina como un avestruz y un hombre?
¿Un avestruz y un hombre caminan como un caballo?
MODELO BÁSICO DE PASEO DE ANIMAL
 
Aplicándolo a la mayoría de los animales, usando un perro de tamaño medio. 
Usaremos esta guía de colores. 
Negro
para el 
contacto
Rojo para 
la pose 
de paso
Azul
cuando
baja
y Azul 
cuando se 
eleva
2 juegos de extremidades. 
Plegándose y Desplegándose
La pelvis 
baja
Pecho y 
hombro
arriba
Cabeza
arriba
Pose de 
paso
Pose de 
paso
contacto
contacto
La pelvis 
baja
Pecho y 
hombro
arriba
Cabeza
arriba
Pose de 
paso
Pose de 
paso
La espina dorsal 
se dobla de lado 
a lado durante 
el paseo. 
 
La pelvis
sube
La cabeza
se inclina al
levantarse
Pecho y
hombro
bajan
Pelvis
abajo
contacto
contacto
Cabeza
arriba
Pecho y
hombro se
desplazan
Pose de
paso
La pelvis
sube
Pecho y
hombro
bajan
Pelvis
abajo
Cabeza
arriba
Pecho y
hombro se
desplazan
Pose de
paso
La cabeza
se inclina al
levantarse
Aquí tienes una caminata cómica inventada para un burro, usando doses, caminando en 16's. 
Mueve la pata delantera y la trasera de forma sincrónica, llevando el mismo paso. 
Los extremos #1 y #17 son iguales y el #9 una posición de paso. 
El cuerpo y la cabeza se levantan ligeramente. Baja en el #5 y sube en el #13. 
Simple, creíble, pero ninguna caminata animal es así. 
baja
pose de paso
sube
extremo
vuelve
al
extremo
baja
pose de paso
sube
extremo
baja
pose de paso
sube
DIRECCIÓN
Creo que sólo hay unas cuantas cosas importantes que saber sobre dirigir. 
Pero tenemos que conocer cuales son. 
La tarea del director es hacer que todo funcione. Tengo 3 reglas: 
 1- Ser simple. 
 
 
 
 
2- Ser claro. 
 
 
 
 
3- Poner todas las cosas donde puedan verse. 
El director es una criatura de dos caras con un pie en 2 campos. La situación lo requiere. 
"El escaparate", la cara externa. "La trastienda", el cuarto de atrás.
"Va a ser fantástico
eso esperamos"
"Haced un buen trabajo
y dibujad más rápido "
 "Es un negocio, maldita sea!" "No es un negocio, es una expresión!"
 (ejecutivo anónimo) Emery Hawkins (animador) 
 
Por supuesto son ambas cosas, pero conocéis la regla de oro? 
 
 
 
 
 
 
 
 
El que tiene el oro hace las reglas.
Estamos siendo contratados para realizar un trabajo y deberíamos hacer aquello para lo que 
hemos sido contratados. Deberíamos seguir las reglas. Si lo que queremos es libertad artística 
entonces proveeremos nuestro propio oro. 
EL INFORME (BRIEF)
Es tan importante! Yo siempre escribo en una hoja de papel cuales son las metas, el objetivo que 
se supone hemos de alcanzar. Por ejemplo, en la película "Quién engaño a roger rabbit": Primero, 
lograr que la mezcla de la acción real con el reino de los dibujos resulte convincente. 
 
Nuestra tarea es disipar los miedos de los ejecutivos e incitar su avaricia mediante el despliegue 
de nuestro talento, resolviendo los problemas de frente. Configurar el equipo o seleccionar lo que 
es bueno y demuestra que funciona. 
LA TIRA LEICA
O animática, o storyboard a color filmado mostrará lo que funciona (y lo que no), la marcha del 
trabajo. Sirve para que la gente conserve el sombrero puesto y se calme. Luego hacemos los 
cambios a la leica, no a la animación. De este modo los animadores pueden acometer su trabajo 
con una cierta paz. 
SEPARAR LOS PERSONAJES
Muestre las diferencias entre ellos. Todo radica en el contraste: tamaños, formas, colores, voces. 
Ponga juntos a los opuestos: grande y pequeño, gordo y flaco, alto y bajo, redondeado y 
cuadrado, viejo y joven, rico y pobre etc. 
A- La articulación Disney. 
B- La tipología de personajes de la Warner. 
C- El humor de Tex Avery (pero no tan brutal) 
Segundo, usar

---

## Sección 48: Core Concepts & Foundations [Entropy: 0.394]

Esto es extremadamente importante! Un ejemplo logrado es el "Rey León" de Disney donde todas 
las criaturas suenan, se ven y actúan bastante diferente las unas de las otras. 
MEJOR UN PASO POR DELANTE
Ponga los mejores animadores al inicio, al final y como pilares repartidos por el medio, como 
actores que conocen la importancia de las entradas y salidas en escena. Ponga a la mejor gente 
en los primeros planos y las escenas largas, a la gente con menos experiencia en tomas de 3 pies 
de distancia y la gente media en el medio. 
SELECCIONANDO ANIMADORES
Todo el mundo tiene su "algo" que hace bien. Nuestro trabajo es seleccionar a la gente por lo que
son capaces de hacer y no por lo que no son capaces de hacer. 
HACIENDO CAMBIOS
A no ser que pidan ayuda, permita al animador alumbrar sin impedimentos. Una vez embarazados 
de una nueva escena no se preocupan de cambios en una escena previa. Somos todos iguales. 
"HABLA, HABLA!"
Mantenga la puerta abierta a las contribuciones de cualquier miembro del equipo. Si los sorprende 
enmudecidos, pídales que hablen!: Quizás tengan la razón sobre alguna cuestión. 
GRABACION DE VOZ
Si consigues al actor adecuado para el trabajo, es la cosa más fácil del mundo. Suelen 
proporcionarte lo que necesitas en la primera toma. Si es así, graba aún una segunda toma por 
seguridad. De hecho suelen conseguírtela en el ensayo, así que indícale al encargado de la 
grabación que lo grabe todo. Solamente si no has dejado claro lo que es requerido puedes acabar 
con 50 tomas. 
REGISTROS, CONTINUIDAD, (raccord)
Es responsabilidad nuestra asegurar que la toma de un animador encaja perfectamente con la 
toma de la siguiente persona. No hay excusa para que un director de animación lo haga mal en 
este sentido mientras podamos dibujar coincidencias perfectas. 
INVESTIGACION
Muy, muy importante. Investiga todas las cosas hasta que accedas a su sustancia interna. 
No lo dejes pasar. 
EDICIÓN
Deberíamos conocer técnicas de edición. Yo estudio a Akira Kurosawa el director japonés que 
considero el mejor editor del mundo tanto como el mejor director. 
CREE EN TU MATERIAL
Otra gran virtud de Kurosawa es que cree en su material. Confía en la audiencia y confía en si 
mismo para contar su historia y permite a la audiencia llegar hasta la película. Así que como 
director debes creer en tu material. 
Es sorprendente lo que puedes obtener de ello. 
Ocurrió algo interesante en "Quién engaño a Roger Rabbit". 
El actor, Bob Hoskins tenía una gran habilidad para concentrarse en un conejo inexistente de 3 
pies de alto. A diferencia de la mayoría de actores que miran a través o más allá del personaje 
invisible, Bob podía detener su mirada justo sobre la línea a 3 pies del suelo donde deberían estar 
los ojos del conejo. 
Un día el animador Simon Wells (ahora director reputado) vino y me dijo, "Tenemos un problema. 
Hoskins está mirando a un conejo de 6 pies de altura. Qué hacemos?" Estaba en lo cierto, Hoskins 
había tenido un momento de lapsus y miraba y le hablaba a un muro a unos 6 pies sobre el 
suelo". 
El conejo se supone 
que estaba aquí abajo.
Pensé "Bien el conejo tiene estos pies enormes. Simplemente estirémoslo subido sobre los dedos 
de sus pies contra el muro". "Sin ningún motivo?" "Que otra cosa podemos hacer? 
El conejo es neurótico, debería funcionar". 
La toma se usó incluso 
en los trailers promocionales 
y nadie volvió a cuestionarla.
Siempre hago primero un boceto pequeño. Los dibujos pequeños, debido a que son dibujos 
"pensantes", parecen mostrar siempre si la idea funciona claramente o no. 
- no sabes lo duro que 
resulta.
- siendo una mujer 
(andar sorprendente, 
andar asesino)
- con mi aspecto.
- tu no sabes lo duro 
que resulta siendo un 
hombre mirando a una 
mujer con tu aspecto.
- no soy mala.
- estoy dibujada así 
(figura entera, hombre 
no)
Y como conclusión: LA REVISION
EL PROCEDIMIENTO 
Para cocinar la sopa:
 ESTRUCTURA de PLANIFICACION:
Testear:
Testear:
Testear:
Mediante la técnica de animación progresiva realice
algunas "pasadas", "rondas" por: 
El objeto principal. 
El objeto secundario. 
El tercer objeto. 
El cuarto objeto. 
Cualquier otra porción, como ropaje, 
 pelos, 
gruesos, 
 colas, etc. 
ESTRUCTURA
DE
PLANIFICACION
Poder
incluso
testear
Testear:
 FLUJO
ESPONTANEO
Y PODEMOS
 SEGUIR
 TESTEANDO
 STORY BOARD (previamente diseñado? o en bruto)
 Lleva a 
 La TIRA LEICA o "ANIMATICA" o STORY BOARD FILMADO
 Lleva a 
 
 DIBUJOS PREPARATORIOS (habitualmente 
 pequeñas viñetas) mostrando la toma con claridad 
 hombre muerde a un perro. 
 
 POSICIONES CLAVE 
 Los dibujos importantes o posiciones 
 que deben figurar obligatoriamente.
 EXTREMOS = cualquier otra posición 
 que deba obligatoriamente figurar, 
 comúnmente "posición de contacto" 
 POSICIONES DE PASO (Quizá solo en bruto)
LOS INGREDIENTES
Y para hacer eso estamos usando:
Buenos dibujos clave para asegurarnos claridad 
Peso = "cambio" y anticipación. 
Para conseguir flexibilidad: 
Estamos usando acciones solapadas (demorando cosas 
y moviéndolas por partes) 
Y estamos usando sucesivas rupturas de las articulaciones. 
Acentuaciones, cabeza, cuerpo, manos, pies 
(aplícate temprano a esa tarea) 
Vibraciones de la pose. 
Compresión y extensión (squash and stretch - estirar y aplastar) 
Caminatas y carreras diferentes = estamos extremando la diferencia 
entre las cosas y las personas. 
Movimientos "inventados" que no pueden ocurrir en el mundo real 
pero que hacemos creíbles. 
Con el diálogo estamos haciendo progresar la acción. 
Estamos usando esas cosas de forma expresa o de modo muy sutil. 
Todo esto constituye la anatomía que nos capacita para lograr 
un resultado, mantenerlo y provocar su visionado compulsivo. 
Y una vez todo ha sido absorbido por el flujo sanguíneo, 
Somos libres de expresarnos! 
 La "actuación", la "interpretación" es el asunto, lo importante.
"Comienza con las cosas que conoces y las cosas desconocidas te serán reveladas" 
Rembrandt, 1606-1669 
AGRADECIMIENTOS
Ahora comprendo porque los autores agradecen profusamente a sus editores! Así que gracias a 
Walter Donohue de Faber and Faber por sugerir la posibilidad de que este fuera un libro útil y por 
su entusiasmo y paciencia mientras me demoraba interminablemente en la tarea de completarlo. 
Y gracias al equipo de producción: Nigel Marsh, Kate Ward y Ron Costley por copiar con mi 
formato poco ortodoxo y mis estrafalarias demandas. Linda Rosenberg de Farrrar, Straus y Giroux 
ha sido una estimulante entusiasta y patrocinadora del libro a lo largo del trayecto. 
También estoy muy agradecido a Roy E. Disney que me ha ayudado en muchos aspectos. 
El estudio Disney ha sido tan generoso y cooperativo conmigo como siempre lo ha sido a lo largo 
de mi relación, con un pie dentro y otro fuera, con ellos. Mi agradecimiento especial a Howard 
Green por su consistente ayuda y ánimos. 
Creo que el libro aún muestra cuanto debo a mis maestros y amigos: Ken Harris, Art Babbitt, Milt 
Kahl, Emery Hawkins y Grim Natwick. Pero quiero agradecer especialmente a Frank Thomas y 
Ollie Johnston por su amabilidad y consejos a lo largo de los años. Ha sido un privilegio tener a 
esos hombres como aliados y amigos. 
Gracias al autor/animador John Canemaker por su atenciones y apoyo a largo plazo. Mi 
colaborador durante 25 años Roy Naisbitt salvó las viejas obras que yo hubiera desechado y por 
ello disponemos de las ilustraciones. Gracias Roy. El animador/director Neil Boyle comenzó siendo 
mi protegido y acabó dándome consejos sobre sonido durante los 3 años y medio que le llevó 
hacerlo. Catharine and Andy Evans de Diamond Press aguantaron más allá de lo exigible mientras 
llevábamos al limite sus copiadoras láser. Gracias a Chris Hill por su ayuda con las imágenes 
digitales de la portada.

---

## Sección 49: Core Concepts & Foundations [Entropy: 0.25]

Quiero dar las gracias a mi hijo, el animador Alex Williams por repetirme constantemente que el 
libro sería de utilidad. Mi antiguo amigo del colegio, el animador Carl Bell ha venido ayudándome 
con la tarea durante años. También mi amigo, el autor Ralph Pred, ha sido extremadamente 
estimulante. 
Mi fotógrafo amigo Frank Hermann tomó las fotografías tempranas. Gracias Frank. Las fotos "del 
viejo" son de Jacob Sutton. Gracias Frank. Gracias al desarrollador Denis Nash por construirme un 
sitio imaginativo para trabajar en el libro. 
Y mi agradecimiento va para las siguientes personas que ayudaron de forma distinta. Chris 
Wedge, Tom Sito, Morten Thorning, Miguel Fuertes, Jane Miller, Nicola Solomom, Sue Perotto, 
Dean Kalman Lennert, Di McCrindle, Lyn Naisbitt, Julie Kahl, Heavenly y Scott Wilson, Phil y 
Heather Sutton, John Ferguson, Ted y Jill Hickford, Marilyn y David Dexter, Ellen Garvie, Mallory 
Pred, Saskia y Rebekah Sutton. 
La portada en la página x aparece por cortesía de Animation Magazine, Roger Rabbit© 
Touchstone Pictures and Amblin Entertainment, Inc. Usado por cortesía de Touchstone Pictures 
and Amblin Entertainment, Inc. La fotografía es de Jacob Sutton; las fotografías en la página 
2,6,8 y 45 son de Frank Hermann; las fotos fijas en la página 4 y 10 de La carga de la brigada 
ligera aparecen por cortesía de MGM; la fotografía de la página 7 se utiliza con permiso de Disney 
Enterprises Inc.; las fotos fijas en las páginas 18 y 19 de Steamboat Willie, La danza de los 
esqueletos, Flores y Arboles, Los 3 cerditos y Blancanieves y los 7 enanitos aparecen por cortesía 
de Disney Enterprises, Inc.; el poster de la página 21 aparece por cortesía del British Film 
Institute; "Epitafio de un infortunado artista poco afortunado" está extraido de Las obras 
completas de Robert Graves, cortesía de Carcanet Press Limited, 1999. El boceto de Bugs Bunny 
de Ken Harris en la página 46 aparece por cortesía de Warner Bros; las fotografías en la página 
328 son de Eadweard Muybridge, cortesía del Kingston Museum and Heritage Service; a portada 
en la página x aparece por cortesía de Animation Magazine, Roger Rabbit© Touchstone Pictures 
and Amblin Entertainment, Inc. 
Se han hecho todos los esfuerzos para contactar o seguir el rastro de los propietarios de todos los 
copyrights. Los editores estarán encantados de corregir en futuras ediciones o reediciones 
cualquier corrección que se les notifique.

---
**Conexiones del Grafo (Obsidian):** [[INDEX]] · [[CANON_EMIL_KOWALSKI_ANIMATIONS_ON_THE_WEB]] · [[CANON_2D_3D_GRAPHICS_SHADERS_AND_AESTHETICS_2026]] · [[CANON_HOLO_SHADERS_3D_PACK_CHOREOGRAPHY_AND_WEBAUDIO_SFX_2026]] · [[CANON_ANIMATION_PRINCIPLES_ILLUSION_OF_LIFE_DISNEY]] · #motion_and_animation
