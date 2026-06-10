// app.js — Barroco europeo y monarquía hispánica (SRS)
// 50 preguntas: selección múltiple (3 opciones), respuesta corta y preguntas con imagen.
// Diseñado para práctica espaciada: fallos vuelven antes; aciertos se espacian en intervalos crecientes.

// === DIAGNÓSTICO: útil si se abre en navegador local ===
document.addEventListener("DOMContentLoaded", () => {
  const ind = document.getElementById("js-indicator");
  if (ind) ind.textContent = "JS cargado ✅ · Modo SRS activo";
});
window.addEventListener("error", (e) => {
  const box = document.getElementById("js-error");
  if (box) box.textContent = `ERROR JS: ${e.message}\n${e.filename || ""}\nLínea: ${e.lineno || "?"}`;
});

const $ = (id) => document.getElementById(id);
const STORAGE_KEY = "barroco_austrias_srs_v1";

// =====================
// Imágenes libres / estables (sin SVG)
// =====================
const IMG = {
  parliament: {
    src: "https://commons.wikimedia.org/wiki/Special:FilePath/House%20of%20Commons%20Chamber%201.png?width=1400",
    credit: "Wikimedia Commons (licencia en Commons).",
    link: "https://commons.wikimedia.org/wiki/File:House_of_Commons_Chamber_1.png"
  },
  cromwell: {
    src: "https://commons.wikimedia.org/wiki/Special:FilePath/Oliver%20Cromwell%20by%20Samuel%20Cooper.jpg?width=1000",
    credit: "Wikimedia Commons (dominio público/según ficha).",
    link: "https://commons.wikimedia.org/wiki/File:Oliver_Cromwell_by_Samuel_Cooper.jpg"
  },
  billRights: {
    src: "https://commons.wikimedia.org/wiki/Special:FilePath/English%20Bill%20of%20Rights%20of%201689.jpg?width=1000",
    credit: "Wikimedia Commons (dominio público/según ficha).",
    link: "https://commons.wikimedia.org/wiki/File:English_Bill_of_Rights_of_1689.jpg"
  },
  eastIndia: {
    src: "https://commons.wikimedia.org/wiki/Special:FilePath/East%20India%20House%20by%20Thomas%20Malton%20the%20Younger.jpg?width=1400",
    credit: "Wikimedia Commons (dominio público/según ficha).",
    link: "https://commons.wikimedia.org/wiki/File:East_India_House_by_Thomas_Malton_the_Younger.jpg"
  },
  felipeIII: {
    src: "https://commons.wikimedia.org/wiki/Special:FilePath/Felipe%20III%20de%20Espa%C3%B1a%20by%20Vel%C3%A1zquez.jpg?width=1000",
    credit: "Wikimedia Commons (dominio público/según ficha).",
    link: "https://commons.wikimedia.org/wiki/File:Felipe_III_de_Espa%C3%B1a_by_Vel%C3%A1zquez.jpg"
  },
  felipeIV: {
    src: "https://commons.wikimedia.org/wiki/Special:FilePath/Velazquez%20Felipe%20IV%20in%20Brown%20and%20Silver.jpg?width=1000",
    credit: "Wikimedia Commons (dominio público/según ficha).",
    link: "https://commons.wikimedia.org/wiki/File:Velazquez_Felipe_IV_in_Brown_and_Silver.jpg"
  },
  carlosII: {
    src: "https://commons.wikimedia.org/wiki/Special:FilePath/Carlos%20II%20de%20Espa%C3%B1a%20%28Juan%20Carre%C3%B1o%20de%20Miranda%29.jpg?width=1000",
    credit: "Wikimedia Commons (dominio público/según ficha).",
    link: "https://commons.wikimedia.org/wiki/File:Carlos_II_de_Espa%C3%B1a_(Juan_Carre%C3%B1o_de_Miranda).jpg"
  },
  lerma: {
    src: "https://commons.wikimedia.org/wiki/Special:FilePath/Peter%20Paul%20Rubens%20-%20Equestrian%20Portrait%20of%20the%20Duke%20of%20Lerma%20-%20Google%20Art%20Project.jpg?width=1200",
    credit: "Wikimedia Commons (dominio público/según ficha).",
    link: "https://commons.wikimedia.org/wiki/File:Peter_Paul_Rubens_-_Equestrian_Portrait_of_the_Duke_of_Lerma_-_Google_Art_Project.jpg"
  },
  olivares: {
    src: "https://commons.wikimedia.org/wiki/Special:FilePath/Gaspar%20de%20Guzm%C3%A1n%2C%20Conde-Duque%20de%20Olivares%2C%20by%20Diego%20Vel%C3%A1zquez.jpg?width=1000",
    credit: "Wikimedia Commons (dominio público/según ficha).",
    link: "https://commons.wikimedia.org/wiki/File:Gaspar_de_Guzm%C3%A1n,_Conde-Duque_de_Olivares,_by_Diego_Vel%C3%A1zquez.jpg"
  },
  luisXIV: {
    src: "https://commons.wikimedia.org/wiki/Special:FilePath/Louis%20XIV%20of%20France.jpg?width=1000",
    credit: "Wikimedia Commons (dominio público/según ficha).",
    link: "https://commons.wikimedia.org/wiki/File:Louis_XIV_of_France.jpg"
  },
  versailles: {
    src: "https://commons.wikimedia.org/wiki/Special:FilePath/Chateau%20de%20Versailles%202008%20E.jpg?width=1400",
    credit: "Wikimedia Commons (licencia en Commons).",
    link: "https://commons.wikimedia.org/wiki/File:Chateau_de_Versailles_2008_E.jpg"
  },
  amsterdam: {
    src: "https://commons.wikimedia.org/wiki/Special:FilePath/Amsterdam%20-%20Rijksmuseum%20-%20The%20Golden%20Bend%20in%20the%20Herengracht%2C%20Amsterdam%20by%20Gerrit%20Berckheyde.jpg?width=1400",
    credit: "Wikimedia Commons (dominio público/según ficha).",
    link: "https://commons.wikimedia.org/wiki/File:Amsterdam_-_Rijksmuseum_-_The_Golden_Bend_in_the_Herengracht,_Amsterdam_by_Gerrit_Berckheyde.jpg"
  },
  felipeV: {
    src: "https://commons.wikimedia.org/wiki/Special:FilePath/Felipe%20V%20of%20Spain.jpg?width=1000",
    credit: "Wikimedia Commons (dominio público/según ficha).",
    link: "https://commons.wikimedia.org/wiki/File:Felipe_V_of_Spain.jpg"
  },
  generic: {
    src: "https://commons.wikimedia.org/wiki/Special:FilePath/Europe%20map%201700.jpg?width=1400",
    credit: "Wikimedia Commons (licencia en Commons).",
    link: "https://commons.wikimedia.org/wiki/File:Europe_map_1700.jpg"
  }
};

// =====================
// Helpers de corrección
// =====================
function normalizar(str) {
  return String(str)
    .toLowerCase()
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, " ");
}
function esMulti(q) { return q.tipo === "multi" || q.tipo === "img-multi"; }
function esCorta(q) { return q.tipo === "corta" || q.tipo === "img-corta"; }
function coincideCorta(dado, esperados) {
  const d = normalizar(dado);
  return (esperados || []).some(e => normalizar(e) === d);
}
function barajar(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}
function ahora() { return Date.now(); }
function dias(n) { return n * 24 * 60 * 60 * 1000; }

// =====================
// Preguntas: 50 ítems con práctica de recuperación, discriminación y variantes
// =====================
const preguntas = [
  // A. Parlamentarismo inglés
  {id:"ing-1603", tipo:"multi", img:IMG.parliament, es:"En 1603, la Corona inglesa pasó a la dinastía de los…", hint:"Recuperación de dato básico.", opciones:["Estuardo","Borbones","Habsburgo"], correcta:0, explicacion:"En <strong>1603</strong>, Inglaterra pasó a la dinastía de los <strong>Estuardo</strong>."},
  {id:"ing-reyes-abs", tipo:"multi", img:IMG.parliament, es:"Jacobo I y Carlos I intentaron gobernar sin respetar suficientemente al…", hint:"Institución que limita al rey.", opciones:["Parlamento","Ejército turco","Papado"], correcta:0, explicacion:"El conflicto nace porque intentaron gobernar de forma absoluta sin respetar al <strong>Parlamento</strong>."},
  {id:"ing-1640", tipo:"corta", img:IMG.cromwell, es:"Escribe el año de la Revolución inglesa que enfrentó al rey con el Parlamento.", hint:"Solo números.", respuestas:["1640"], explicacion:"La Revolución inglesa comenzó en <strong>1640</strong>."},
  {id:"ing-guerra-civil", tipo:"multi", img:IMG.cromwell, es:"Dos años después de la Revolución de 1640 estalló una…", hint:"Conflicto interno.", opciones:["guerra civil","guerra colonial","cruzada"], correcta:0, explicacion:"En <strong>1642</strong> estalló una <strong>guerra civil</strong> entre partidarios del Parlamento y del monarca."},
  {id:"ing-carlos-ejec", tipo:"multi", img:IMG.cromwell, es:"¿Qué rey inglés fue ejecutado tras la guerra civil?", hint:"No confundir con Carlos II de España.", opciones:["Carlos I","Jacobo II","Luis XIV"], correcta:0, explicacion:"Fue ejecutado <strong>Carlos I</strong>."},
  {id:"ing-cromwell", tipo:"img-corta", img:IMG.cromwell, es:"Observa la imagen. ¿Quién lideró la dictadura inglesa tras la ejecución de Carlos I?", hint:"Apellido, una palabra.", respuestas:["cromwell","oliver cromwell"], explicacion:"La dictadura fue liderada por <strong>Oliver Cromwell</strong>."},
  {id:"ing-restauracion", tipo:"multi", img:IMG.parliament, es:"Tras la muerte de Cromwell, el Parlamento restauró la monarquía, pero Jacobo II pretendió gobernar de forma…", hint:"Idea clave.", opciones:["absoluta","republicana","federal"], correcta:0, explicacion:"Jacobo II intentó gobernar de forma <strong>absoluta</strong>."},
  {id:"ing-1688", tipo:"multi", img:IMG.billRights, es:"¿Qué ocurrió en Inglaterra en 1688?", hint:"Nombre propio del cambio político.", opciones:["Revolución Gloriosa","Pax Hispánica","Unión de Armas"], correcta:0, explicacion:"En <strong>1688</strong> tuvo lugar la <strong>Revolución Gloriosa</strong>."},
  {id:"ing-derechos", tipo:"img-multi", img:IMG.billRights, es:"La Declaración de Derechos inglesa limitaba el poder del rey frente al…", hint:"Base de la monarquía parlamentaria.", opciones:["Parlamento","conde-duque de Olivares","califa"], correcta:0, explicacion:"La Declaración de Derechos limitó el poder real frente al <strong>Parlamento</strong>."},
  {id:"ing-modelo", tipo:"multi", img:IMG.parliament, es:"La Revolución Gloriosa y la Declaración de Derechos sentaron las bases de la…", hint:"Sistema político inglés.", opciones:["monarquía parlamentaria","monarquía absoluta","dictadura militar"], correcta:0, explicacion:"Sentaron las bases de la <strong>monarquía parlamentaria</strong> inglesa."},

  // B. Imperio colonial británico
  {id:"brit-1600", tipo:"multi", img:IMG.eastIndia, es:"¿Qué compañía creó Inglaterra en 1600 para comerciar con Asia?", hint:"Nombre largo: Indias Orientales.", opciones:["Compañía Inglesa de las Indias Orientales","Compañía Holandesa de las Indias Occidentales","Casa de Contratación de Sevilla"], correcta:0, explicacion:"En <strong>1600</strong> se creó la <strong>Compañía Inglesa de las Indias Orientales</strong>."},
  {id:"brit-factorias", tipo:"multi", img:IMG.eastIndia, es:"Madrás, Bombay y Calcuta fueron factorías inglesas en…", hint:"Asia.", opciones:["India","Canadá","Portugal"], correcta:0, explicacion:"Esas factorías se situaban en la <strong>India</strong>."},
  {id:"brit-norte", tipo:"multi", img:IMG.generic, es:"Las colonias inglesas del norte de América estaban habitadas mayoritariamente por…", hint:"Grupo religioso.", opciones:["puritanos","aristócratas esclavistas","moriscos"], correcta:0, explicacion:"Las colonias del norte estaban habitadas sobre todo por <strong>puritanos</strong>."},
  {id:"brit-sur", tipo:"multi", img:IMG.generic, es:"En las colonias del sur de América predominaban plantaciones de…", hint:"Producto agrícola.", opciones:["tabaco","hierro sueco","especias de la India"], correcta:0, explicacion:"En el sur predominaban plantaciones dedicadas al <strong>tabaco</strong>, con mano de obra esclava."},

  // C. Austrias menores: fechas y validos
  {id:"aus-menores", tipo:"multi", img:IMG.felipeIII, es:"Felipe III, Felipe IV y Carlos II reciben el nombre de…", hint:"Concepto para memorizar.", opciones:["Austrias menores","Reyes Católicos","Borbones mayores"], correcta:0, explicacion:"Son los <strong>Austrias menores</strong>, últimos Habsburgo españoles del siglo XVII."},
  {id:"aus-f3-fechas", tipo:"multi", img:IMG.felipeIII, es:"¿Cuáles son las fechas de reinado de Felipe III?", hint:"Primero de los Austrias menores.", opciones:["1598–1621","1621–1665","1665–1700"], correcta:0, explicacion:"<strong>Felipe III</strong> reinó entre <strong>1598 y 1621</strong>."},
  {id:"aus-f4-fechas", tipo:"multi", img:IMG.felipeIV, es:"¿Cuáles son las fechas de reinado de Felipe IV?", hint:"Rey de Olivares.", opciones:["1621–1665","1598–1621","1700–1746"], correcta:0, explicacion:"<strong>Felipe IV</strong> reinó entre <strong>1621 y 1665</strong>."},
  {id:"aus-c2-fechas", tipo:"multi", img:IMG.carlosII, es:"¿Cuáles son las fechas de reinado de Carlos II?", hint:"Último Austria español.", opciones:["1665–1700","1643–1715","1701–1714"], correcta:0, explicacion:"<strong>Carlos II</strong> reinó entre <strong>1665 y 1700</strong>."},
  {id:"aus-orden", tipo:"multi", img:IMG.generic, es:"Orden correcto de los Austrias menores:", hint:"Recupera la secuencia.", opciones:["Felipe III → Felipe IV → Carlos II","Carlos II → Felipe III → Felipe IV","Felipe IV → Carlos II → Felipe III"], correcta:0, explicacion:"La secuencia correcta es <strong>Felipe III → Felipe IV → Carlos II</strong>."},
  {id:"aus-validos-def", tipo:"multi", img:IMG.lerma, es:"Un valido era…", hint:"Definición de comprensión.", opciones:["hombre de confianza del rey que gobernaba en su nombre","parlamentario elegido por sufragio universal","jefe de una colonia inglesa"], correcta:0, explicacion:"El <strong>valido</strong> era el hombre de confianza del rey y asumía las tareas de gobierno."},
  {id:"aus-validos-cese", tipo:"multi", img:IMG.generic, es:"El nombramiento y el cese de un valido dependían de…", hint:"Relación personal con el monarca.", opciones:["el rey","las colonias del norte","los Estados Generales holandeses"], correcta:0, explicacion:"El valido dependía directamente del <strong>rey</strong>."},
  {id:"aus-lerma", tipo:"img-corta", img:IMG.lerma, es:"¿Quién fue el valido de Felipe III?", hint:"Título nobiliario.", respuestas:["duque de lerma","lerma"], explicacion:"El valido de Felipe III fue el <strong>duque de Lerma</strong>."},
  {id:"aus-olivares", tipo:"img-corta", img:IMG.olivares, es:"¿Quién fue el valido de Felipe IV?", hint:"Conde-duque…", respuestas:["conde-duque de olivares","olivares","conde duque de olivares"], explicacion:"El valido de Felipe IV fue el <strong>conde-duque de Olivares</strong>."},
  {id:"aus-pax", tipo:"multi", img:IMG.felipeIII, es:"La política inicial de Felipe III buscó acuerdos de paz y dio lugar a la…", hint:"Expresión latina/histórica.", opciones:["Pax Hispánica","Guerra de Sucesión","Revolución Gloriosa"], correcta:0, explicacion:"Lerma negoció acuerdos de paz, etapa conocida como <strong>Pax Hispánica</strong>."},
  {id:"aus-moriscos-fecha", tipo:"corta", img:IMG.felipeIII, es:"Escribe el año de la expulsión de los moriscos ordenada por Felipe III.", hint:"Solo números.", respuestas:["1609"], explicacion:"La expulsión de los moriscos fue ordenada en <strong>1609</strong>."},
  {id:"aus-moriscos-cons", tipo:"multi", img:IMG.generic, es:"La expulsión de los moriscos tuvo consecuencias especialmente negativas en la…", hint:"Territorio más afectado.", opciones:["Corona de Aragón","Inglaterra","Provincias Unidas"], correcta:0, explicacion:"Fue muy negativa para la <strong>Corona de Aragón</strong>, con despoblación en varias zonas."},
  {id:"aus-olivares-guerras", tipo:"multi", img:IMG.olivares, es:"Con Felipe IV, Olivares reanudó las guerras para intentar restablecer la…", hint:"Objetivo exterior.", opciones:["hegemonía española en Europa","independencia inglesa","colonización holandesa de América"], correcta:0, explicacion:"Olivares buscó restablecer la <strong>hegemonía española en Europa</strong>."},
  {id:"aus-union-armas", tipo:"multi", img:IMG.olivares, es:"La Unión de Armas pretendía que todos los reinos de la monarquía contribuyeran a…", hint:"Ejército y dinero.", opciones:["formar y financiar un ejército permanente","elegir al Parlamento inglés","fundar Quebec"], correcta:0, explicacion:"La <strong>Unión de Armas</strong> exigía participar y financiar un ejército permanente según población y riqueza."},
  {id:"aus-bancarrota", tipo:"multi", img:IMG.olivares, es:"La reforma financiera de Olivares fracasó y la monarquía tuvo que declarar…", hint:"Crisis económica.", opciones:["bancarrota","independencia","monarquía parlamentaria"], correcta:0, explicacion:"Al no reducir gastos, se declaró la <strong>bancarrota</strong>."},
  {id:"aus-1640", tipo:"multi", img:IMG.generic, es:"La crisis de 1640 incluyó rebeliones en Cataluña, Portugal y otros territorios contra las reformas de…", hint:"Valido de Felipe IV.", opciones:["Olivares","Lerma","Cromwell"], correcta:0, explicacion:"La crisis de <strong>1640</strong> fue una reacción contra las reformas de <strong>Olivares</strong>."},
  {id:"aus-cataluna", tipo:"multi", img:IMG.generic, es:"Cataluña se rebeló principalmente contra la…", hint:"Medida militar y fiscal.", opciones:["Unión de Armas","Declaración de Derechos","Compañía de Indias Orientales"], correcta:0, explicacion:"Cataluña se opuso a la <strong>Unión de Armas</strong>."},
  {id:"aus-portugal", tipo:"corta", img:IMG.generic, es:"Escribe el año en que Portugal consiguió la independencia de la monarquía hispánica.", hint:"Solo números.", respuestas:["1668"], explicacion:"Portugal consiguió la independencia en <strong>1668</strong>."},

  // D. Final Austrias y Guerra de Sucesión
  {id:"suc-carlos-desc", tipo:"multi", img:IMG.carlosII, es:"Carlos II murió sin…", hint:"Causa sucesoria.", opciones:["descendientes","ejército","validos"], correcta:0, explicacion:"Carlos II murió sin <strong>descendencia</strong>, lo que abrió el problema sucesorio."},
  {id:"suc-1700", tipo:"multi", img:IMG.carlosII, es:"En 1700, Carlos II nombró sucesor al trono español a…", hint:"Primer Borbón español.", opciones:["Felipe de Borbón","Carlos I de Inglaterra","Luis XIV"], correcta:0, explicacion:"Nombró sucesor a <strong>Felipe de Borbón</strong>, futuro Felipe V."},
  {id:"suc-felipe-v", tipo:"img-corta", img:IMG.felipeV, es:"¿Con qué nombre reinó Felipe de Borbón en España?", hint:"Nombre + número romano.", respuestas:["felipe v","felipe quinto"], explicacion:"Felipe de Borbón reinó como <strong>Felipe V</strong>."},
  {id:"suc-fechas", tipo:"multi", img:IMG.generic, es:"¿Entre qué años se desarrolló la Guerra de Sucesión española?", hint:"Fecha que conviene memorizar como bloque.", opciones:["1701–1714","1640–1648","1598–1621"], correcta:0, explicacion:"La <strong>Guerra de Sucesión española</strong> se desarrolló entre <strong>1701 y 1714</strong>."},
  {id:"suc-causa", tipo:"multi", img:IMG.generic, es:"La Guerra de Sucesión española fue causada sobre todo por…", hint:"Problema dinástico y equilibrio europeo.", opciones:["el desacuerdo sobre quién debía ocupar el trono español","la expulsión de los moriscos","la creación de la Compañía Inglesa de Indias Orientales"], correcta:0, explicacion:"La causa principal fue la disputa por la <strong>sucesión al trono español</strong> tras la muerte de Carlos II."},
  {id:"suc-bandos", tipo:"multi", img:IMG.generic, es:"En términos básicos, la guerra enfrentó a partidarios de Felipe de Borbón con partidarios del archiduque…", hint:"Nombre de Habsburgo/Austria.", opciones:["Carlos de Austria","Oliver Cromwell","Al-Hakam II"], correcta:0, explicacion:"El otro candidato fue el <strong>archiduque Carlos de Austria</strong>."},
  {id:"suc-resultado", tipo:"multi", img:IMG.felipeV, es:"La Guerra de Sucesión terminó con la victoria de…", hint:"Dinastía nueva en España.", opciones:["Felipe de Borbón","el Parlamento inglés","Portugal"], correcta:0, explicacion:"Terminó con la victoria de <strong>Felipe de Borbón</strong>."},
  {id:"suc-dinastia", tipo:"multi", img:IMG.felipeV, es:"Con Felipe V se instauró en España la dinastía…", hint:"Sigue en el texto tras los Austrias.", opciones:["borbónica","Estuardo","nazarí"], correcta:0, explicacion:"Con Felipe V se instauró la dinastía <strong>borbónica</strong>."},

  // E. Absolutismo francés
  {id:"fr-luis-fechas", tipo:"multi", img:IMG.luisXIV, es:"¿Cuáles son las fechas de reinado de Luis XIV?", hint:"Rey Sol.", opciones:["1643–1715","1665–1700","1701–1714"], correcta:0, explicacion:"<strong>Luis XIV</strong> reinó entre <strong>1643 y 1715</strong>."},
  {id:"fr-rey-sol", tipo:"img-corta", img:IMG.luisXIV, es:"¿Qué apodo recibió Luis XIV?", hint:"Dos palabras.", respuestas:["rey sol","el rey sol"], explicacion:"Luis XIV fue conocido como el <strong>Rey Sol</strong>."},
  {id:"fr-absolutismo", tipo:"multi", img:IMG.luisXIV, es:"La monarquía absoluta de Luis XIV consistía en concentrar todos los poderes del Estado en…", hint:"Idea central.", opciones:["el rey","el Parlamento","las colonias"], correcta:0, explicacion:"En la monarquía absoluta, el rey concentra los poderes del <strong>Estado</strong>."},
  {id:"fr-dios", tipo:"multi", img:IMG.luisXIV, es:"Según el absolutismo de Luis XIV, el rey solo respondía de sus actos ante…", hint:"Justificación religiosa del poder.", opciones:["Dios","los Estados Generales","los validos"], correcta:0, explicacion:"Luis XIV consideraba que recibía el poder de <strong>Dios</strong>."},
  {id:"fr-estados", tipo:"multi", img:IMG.versailles, es:"Luis XIV dejó de convocar los…", hint:"Institución representativa francesa.", opciones:["Estados Generales","walíes","puritanos"], correcta:0, explicacion:"Luis XIV dejó de convocar los <strong>Estados Generales</strong>."},
  {id:"fr-versailles", tipo:"img-multi", img:IMG.versailles, es:"Versalles sirvió a Luis XIV para atraer y controlar a la…", hint:"Grupo social privilegiado.", opciones:["nobleza","burguesía holandesa","población morisca"], correcta:0, explicacion:"Luis XIV atrajo a la <strong>nobleza</strong> a Versalles y la hizo depender de sus favores."},
  {id:"fr-centralizacion", tipo:"multi", img:IMG.versailles, es:"Centralizar la administración significaba…", hint:"Comprensión, no solo memoria.", opciones:["reducir poderes locales y unificar leyes e impuestos","entregar el poder a cada provincia","suprimir toda fiscalidad"], correcta:0, explicacion:"Centralizar implica <strong>reducir poderes locales</strong> y unificar leyes, impuestos y funcionarios."},
  {id:"fr-colonial", tipo:"multi", img:IMG.generic, es:"A principios del siglo XVII, los franceses fundaron Quebec y avanzaron desde allí hacia…", hint:"Expansión colonial francesa.", opciones:["el oeste","la India portuguesa","la Corona de Aragón"], correcta:0, explicacion:"Desde <strong>Quebec</strong>, los franceses se extendieron hacia el <strong>oeste</strong>."},

  // F. Provincias Unidas
  {id:"hol-indep-fecha", tipo:"corta", img:IMG.amsterdam, es:"Escribe el año de independencia de las Provincias Unidas respecto a la monarquía hispánica.", hint:"Solo números.", respuestas:["1648"], explicacion:"Las Provincias Unidas obtuvieron su independencia en <strong>1648</strong>."},
  {id:"hol-siete", tipo:"multi", img:IMG.amsterdam, es:"Las Provincias Unidas formaron una república integrada por…", hint:"Número de provincias.", opciones:["siete provincias","tres reinos","trece colonias"], correcta:0, explicacion:"Eran <strong>siete provincias</strong>, cada una con su Parlamento."},
  {id:"hol-comercio", tipo:"multi", img:IMG.amsterdam, es:"Las Provincias Unidas se convirtieron en potencia económica gracias sobre todo al…", hint:"Actividad clave.", opciones:["comercio marítimo","absolutismo real","cultivo de tabaco esclavista"], correcta:0, explicacion:"Su riqueza se basó en el <strong>comercio marítimo</strong>."},
  {id:"hol-intermediarios", tipo:"multi", img:IMG.amsterdam, es:"Los holandeses actuaban como…", hint:"Compraban y revendían productos.", opciones:["intermediarios comerciales","validos del rey","puritanos del norte"], correcta:0, explicacion:"Actuaban como <strong>intermediarios comerciales</strong> entre distintos territorios."},
  {id:"hol-companias", tipo:"multi", img:IMG.amsterdam, es:"Para potenciar el comercio, los holandeses fundaron compañías de Indias Orientales y…", hint:"La otra zona colonial.", opciones:["Occidentales","Balcánicas","Pirenaicas"], correcta:0, explicacion:"Fundaron la Compañía Holandesa de las Indias <strong>Orientales</strong> y la de las Indias <strong>Occidentales</strong>."},
  {id:"hol-burguesia", tipo:"multi", img:IMG.amsterdam, es:"En la república de las Provincias Unidas, los Estados Generales estaban controlados por una poderosa…", hint:"Grupo social enriquecido por comercio.", opciones:["burguesía","nobleza de Versalles","población morisca"], correcta:0, explicacion:"El poder político lo controlaba una <strong>burguesía</strong> enriquecida por el comercio."},
  {id:"hol-declive", tipo:"multi", img:IMG.amsterdam, es:"En la segunda mitad del siglo XVII, los holandeses perdieron poder económico ante los avances comerciales y coloniales…", hint:"Rival del norte de Europa.", opciones:["británicos","nazaríes","portugueses de 1668"], correcta:0, explicacion:"Perdieron poder ante los avances comerciales y coloniales <strong>británicos</strong>."}
];

if (preguntas.length !== 50) console.warn("⚠️ El test debería tener 50 preguntas. Tiene:", preguntas.length);

// =====================
// Estado SRS
// =====================
function estadoInicial() {
  const s = {};
  preguntas.forEach(q => s[q.id] = { box: 0, due: 0, aciertos: 0, fallos: 0, last: 0 });
  return s;
}
function cargarSRS() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
    return { ...estadoInicial(), ...saved };
  } catch { return estadoInicial(); }
}
function guardarSRS() { localStorage.setItem(STORAGE_KEY, JSON.stringify(srs)); }
function intervaloPorCaja(box) {
  return [0, dias(1), dias(3), dias(7), dias(14), dias(30)][Math.min(box, 5)];
}
function programar(qid, correcto) {
  const item = srs[qid] || { box: 0, due: 0, aciertos: 0, fallos: 0, last: 0 };
  if (correcto) {
    item.box = Math.min((item.box || 0) + 1, 5);
    item.aciertos = (item.aciertos || 0) + 1;
    item.due = ahora() + intervaloPorCaja(item.box);
  } else {
    item.box = 0;
    item.fallos = (item.fallos || 0) + 1;
    item.due = ahora() + 5 * 60 * 1000; // vuelve pronto: práctica correctiva
  }
  item.last = ahora();
  srs[qid] = item;
  guardarSRS();
}
function vencidas() {
  const t = ahora();
  return preguntas.map((q, idx) => ({ q, idx, st: srs[q.id] || {} })).filter(x => (x.st.due || 0) <= t);
}

let srs = cargarSRS();
let modoSesion = "mixta";
let orden = [];
let indice = 0;
let respuestasUsuario = new Array(preguntas.length).fill(null);
let historialSesion = [];
let colaRefuerzo = [];

function construirOrden() {
  const due = vencidas().map(x => x.idx);
  const newOnes = preguntas.map((q, idx) => ({ q, idx, st: srs[q.id] || {} })).filter(x => !(x.st.last)).map(x => x.idx);
  const weak = preguntas.map((q, idx) => ({ q, idx, st: srs[q.id] || {} }))
    .filter(x => (x.st.fallos || 0) > 0)
    .sort((a,b) => (b.st.fallos || 0) - (a.st.fallos || 0))
    .map(x => x.idx);

  let base = [];
  if (modoSesion === "vencidas") base = due;
  else if (modoSesion === "fallos") base = weak;
  else base = [...new Set([...due, ...newOnes, ...weak, ...preguntas.map((_,i)=>i)])];

  orden = barajar(base.slice()).slice(0, preguntas.length);
  indice = 0;
  respuestasUsuario = new Array(preguntas.length).fill(null);
  historialSesion = [];
  colaRefuerzo = [];
}

// =====================
// Render
// =====================
function actualizarProgreso() {
  const barra = $("progress-bar");
  const label = $("progress-label");
  if (!barra || !label) return;
  const total = orden.length || preguntas.length;
  const porcentaje = total ? ((indice + 1) / total) * 100 : 0;
  barra.style.width = porcentaje + "%";
  label.textContent = `Pregunta ${Math.min(indice + 1, total)} de ${total} · SRS`;
}
function pintarMeta(q) {
  const st = srs[q.id] || {box:0, aciertos:0, fallos:0};
  return `<div class="hint">Caja SRS: <strong>${st.box || 0}</strong> · Aciertos previos: ${st.aciertos || 0} · Fallos previos: ${st.fallos || 0}</div>`;
}
function renderPregunta() {
  if (!orden.length) construirOrden();
  actualizarProgreso();
  const idxPregunta = orden[indice];
  const q = preguntas[idxPregunta];
  const cont = $("question-container");

  let html = `
    <div class="question-text">
      <span class="q-es">${q.es}</span>
      
    </div>
  `;
  if (q.img) {
    html += `
      <div class="q-image">
        <img src="${q.img.src}" alt="Imagen de apoyo" onerror="this.closest('.q-image').style.display='none';">
        <div class="q-credit">${q.img.credit} · <a href="${q.img.link}" target="_blank" rel="noopener">Fuente/licencia</a></div>
      </div>`;
  }
  if (esMulti(q)) {
    const respGuardada = respuestasUsuario[idxPregunta];
    html += `<div class="options">`;
    q.opciones.forEach((op, iOp) => {
      html += `<label class="option"><input type="radio" name="resp" value="${iOp}" ${respGuardada === iOp ? "checked" : ""}><div class="option-text">${op}</div></label>`;
    });
    html += `</div>`;
  } else if (esCorta(q)) {
    const valor = respuestasUsuario[idxPregunta] ?? "";
    html += `<input id="short-answer" class="short-answer" type="text" value="${valor}" placeholder="Respuesta breve: 1–3 palabras o fecha"><div class="hint">Recupera de memoria antes de mirar apuntes.</div>`;
  }
  html += pintarMeta(q);
  cont.innerHTML = html;

  const prev = $("btn-prev"), next = $("btn-next");
  if (prev) prev.disabled = (indice === 0);
  if (next) next.textContent = (indice === orden.length - 1) ? "Terminar sesión" : "Siguiente ▶";
}

function guardarRespuestaActual() {
  const idxPregunta = orden[indice];
  const q = preguntas[idxPregunta];
  if (esMulti(q)) {
    const marcada = document.querySelector("input[name='resp']:checked");
    if (!marcada) return false;
    respuestasUsuario[idxPregunta] = parseInt(marcada.value, 10);
    return true;
  }
  if (esCorta(q)) {
    const input = $("short-answer");
    if (!input) return false;
    const valor = input.value.trim();
    if (!valor) return false;
    respuestasUsuario[idxPregunta] = valor;
    return true;
  }
  return false;
}
function textoRespuestaUsuario(q, resp) {
  if (resp === null || resp === undefined) return "—";
  if (esMulti(q)) return q.opciones[resp] ?? "—";
  return String(resp);
}
function textoCorrecto(q) {
  if (esMulti(q)) return q.opciones[q.correcta];
  return (q.respuestas && q.respuestas[0]) ? q.respuestas[0] : "—";
}
function esCorrecta(q, resp) {
  if (resp === null || resp === undefined) return false;
  if (esMulti(q)) return resp === q.correcta;
  return coincideCorta(resp, q.respuestas);
}

function siguiente() {
  if (!guardarRespuestaActual()) {
    alert("Responde antes de continuar 🙂");
    return;
  }
  const idxPregunta = orden[indice];
  const q = preguntas[idxPregunta];
  const resp = respuestasUsuario[idxPregunta];
  const ok = esCorrecta(q, resp);
  historialSesion.push({ idx: idxPregunta, q, resp, ok });
  programar(q.id, ok);

  if (!ok) {
    // Refuerzo inmediato: la misma idea reaparece al final de la sesión.
    colaRefuerzo.push(idxPregunta);
  }
  indice++;
  if (indice >= orden.length) {
    if (colaRefuerzo.length) {
      orden = [...orden, ...barajar(colaRefuerzo.splice(0))];
      renderPregunta();
    } else {
      mostrarResultados();
    }
  } else {
    renderPregunta();
  }
}
function anterior() {
  if (indice === 0) return;
  indice--;
  renderPregunta();
}

function resumenSRS() {
  const st = Object.values(srs);
  const aprendidas = st.filter(x => (x.box || 0) >= 3).length;
  const debiles = st.filter(x => (x.fallos || 0) > (x.aciertos || 0)).length;
  const dueCount = vencidas().length;
  return { aprendidas, debiles, dueCount };
}
function mostrarResultados() {
  const test = $("test-card"), result = $("result-card");
  if (test) test.classList.add("hidden");
  if (result) result.classList.remove("hidden");

  const uniqueLast = [];
  const seen = new Set();
  for (let i = historialSesion.length - 1; i >= 0; i--) {
    const h = historialSesion[i];
    if (!seen.has(h.q.id)) { uniqueLast.unshift(h); seen.add(h.q.id); }
  }
  const correctas = uniqueLast.filter(h => h.ok).length;
  const fallos = uniqueLast.filter(h => !h.ok);
  const total = uniqueLast.length;
  const s = resumenSRS();

  let html = `
    <h2>Resultados de la sesión SRS</h2>
    <div class="summary">
      ✅ Aciertos finales: <strong>${correctas}</strong> / ${total}<br>
      ❌ Ideas aún débiles: <strong>${fallos.length}</strong><br>
      🧠 Tarjetas en caja 3 o superior: <strong>${s.aprendidas}</strong> / ${preguntas.length}<br>
      ⏰ Preguntas vencidas ahora: <strong>${s.dueCount}</strong>
    </div>
    <div class="summary" style="margin-top:10px">
      Regla de estudio: si fallas, vuelve pronto; si aciertas, se espaciará más. No releas: intenta <strong>recuperar</strong> la respuesta.
    </div>`;

  if (fallos.length > 0) {
    html += `<div class="summary" style="margin-top:12px"><strong>Fallos corregidos</strong>:</div><ul class="list-fails">`;
    fallos.forEach(({ q, resp }) => {
      html += `<li><span class="qtitle">${q.es}</span><span class="line">Tu respuesta: <strong>${textoRespuestaUsuario(q, resp)}</strong></span><span class="line">Correcta: <strong>${textoCorrecto(q)}</strong></span><span class="line">${q.explicacion ?? ""}</span><span class="pill-mini">Volverá pronto</span></li>`;
    });
    html += `</ul>`;
  }
  html += `<div class="summary" style="margin-top:14px;text-align:center;display:flex;gap:8px;justify-content:center;flex-wrap:wrap">
      <button class="btn btn-primary" onclick="reiniciarSesion('fallos')">🔁 Practicar fallos</button>
      <button class="btn btn-primary" onclick="reiniciarSesion('vencidas')">⏰ Repasar vencidas</button>
      <button class="btn btn-ghost" onclick="reiniciarSesion('mixta')">🧠 Sesión mixta</button>
      <button class="btn btn-ghost" onclick="resetSRS()">Borrar progreso</button>
    </div>`;
  $("result-content").innerHTML = html;
}

function reiniciarSesion(modo) {
  modoSesion = modo || "mixta";
  construirOrden();
  $("result-card").classList.add("hidden");
  $("test-card").classList.remove("hidden");
  renderPregunta();
}
function resetSRS() {
  if (!confirm("¿Borrar todo el progreso SRS guardado en este navegador?")) return;
  localStorage.removeItem(STORAGE_KEY);
  srs = estadoInicial();
  reiniciarSesion("mixta");
}

// =====================
// Init
// =====================
document.addEventListener("DOMContentLoaded", () => {
  const title = document.querySelector("h1");
  if (title) title.textContent = "Test SRS · Barroco europeo y Austrias menores";
  const tagline = document.querySelector(".tagline");
  if (tagline) tagline.textContent = "Recuperación activa · repaso espaciado · memoria a largo plazo";
  const pills = document.querySelectorAll(".pill span:last-child");
  if (pills[0]) pills[0].textContent = "Inglaterra · España · Francia · Provincias Unidas";
  if (pills[1]) pills[1].textContent = "50 preguntas";
  const prev = $("btn-prev"), next = $("btn-next");
  if (prev) prev.addEventListener("click", anterior);
  if (next) next.addEventListener("click", siguiente);
  construirOrden();
  renderPregunta();
});
