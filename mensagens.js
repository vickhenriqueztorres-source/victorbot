/**
 * ============================================================================
 * 💬 CENTRAL DE MENSAJES Y CONVERSACIÓN DEL BOT (PERSONA VICTOR TORREZ - ESPAÑOL)
 * ============================================================================
 * Edita los textos a continuación para personalizar la interacción con tus clientes.
 * 
 * Formato disponible en Telegram:
 * - <b>texto</b> para negrita
 * - <i>texto</i> para cursiva
 * - <code>código</code> para texto con clic para copiar
 * - \n para salto de línea
 * ============================================================================
 */

import { config } from './config.js';

export const mensagens = {
  // --------------------------------------------------------------------------
  // 1. BIENVENIDA (Enviada en 3 mensajes cortos y pausados para máxima naturalidad)
  // --------------------------------------------------------------------------
  boasVindas: (nome) => [
    // Mensaje 1A: Saludo cálido y directo
    `¡Hola, ${nome}! Qué bueno saludarte por acá 😊\n\n` +
    `Soy <b>${config.personaName}</b>. Bienvenido al equipo oficial de <i>Infiltrus</i>.`,

    // Mensaje 1B: Gancho persuasivo - Fácil, rápido y sin rodeos
    `Mira, empezar es <b>súper fácil y rápido</b>: en menos de <i>2 minutos</i> vas a tener el sistema conectado a tu pantalla para copiar las señales en vivo 🎯\n\n` +
    `<i>(Sin gráficos enredados ni cursos largos... el algoritmo te indica exactamente cuándo entrar)</i>`,

    // Mensaje 1C: Pregunta directa y llamada a la acción
    `Para activarte tu <b>acceso VIP gratuito</b> hoy mismo:\n\n` +
    `¿Ya tienes tu cuenta creada en el broker oficial o <i>todavía necesitas el enlace</i>?`
  ],

  // Botones interactivos debajo del mensaje de bienvenida
  botoesBoasVindas: [
    [{ text: '✅ Ya tengo mi cuenta lista', callback_data: 'has_account' }],
    [{ text: '🔗 Necesito el enlace oficial', callback_data: 'need_link' }],
    [{ text: '❓ Tengo una duda / Preguntas', callback_data: 'menu_dudas' }]
  ],

  // --------------------------------------------------------------------------
  // 2. ENVÍO DEL ENLACE DE REGISTRO (Cuando hace clic en "Necesito el enlace oficial")
  // --------------------------------------------------------------------------
  enviarLinkCadastro: (nome, linkAfiliado) => [
    `¡Excelente, ${nome}! Aquí tienes el enlace oficial con el bono de bienvenida habilitado:\n\n` +
    `👉 <b><a href="${linkAfiliado}">CLIC AQUÍ PARA REGISTRARTE EN EL BROKER</a></b>\n\n` +
    `Te toma menos de 1 minuto:\n` +
    `1️⃣ Entra al enlace y regístrate con tu correo y contraseña.\n` +
    `2️⃣ Una vez adentro, copia tu número de <b>ID</b> (lo encuentras arriba en el menú de tu perfil del broker).\n` +
    `3️⃣ En cuanto lo tengas, envíame tu ID por este chat para rastrear tu cuenta y liberar tu acceso VIP de inmediato. 🚀`,

    `¿Pudiste abrir el enlace sin problema? Si tienes cualquier consulta, avísame por acá 😊`
  ],

  botoesLinkCadastro: [
    [{ text: '✅ Ya me registré, tengo mi ID', callback_data: 'has_account' }],
    [{ text: '❓ Preguntas sobre el broker', callback_data: 'menu_dudas' }]
  ],

  // --------------------------------------------------------------------------
  // 3. SOLICITAR ID DEL BROKER (Cuando hace clic en "Ya tengo cuenta creada")
  // --------------------------------------------------------------------------
  pedirIdCorretora: (nome) =>
    `¡De una, ${nome}! Es súper rápido:\n\n` +
    `Pásame por acá el número de tu <b>ID de la plataforma</b> (lo encuentras arriba en el menú de tu perfil).\n\n` +
    `En cuanto me lo envíes, lo verifico en el sistema para desbloquear tu clave y enviarte la herramienta. 😊`,

  botoesPedirId: [
    [{ text: '🔗 No tengo cuenta, pásame el link', callback_data: 'need_link' }],
    [{ text: '❓ ¿Dónde encuentro mi ID?', callback_data: 'faq_donde_id' }]
  ],

  // --------------------------------------------------------------------------
  // 4. CONSULTANDO EN EL SISTEMA (Justo después de que el cliente envía su ID)
  // --------------------------------------------------------------------------
  consultandoSistema: (brokerId) =>
    `¡Genial! Déjame consultar el ID <code>${brokerId}</code> aquí en mi sistema... 🔎`,

  // --------------------------------------------------------------------------
  // 5. REGISTRO CONFIRMADO, FALTA EL PRIMER DEPÓSITO
  // --------------------------------------------------------------------------
  aguardandoDeposito: (nome, brokerId) => [
    `¡Encontré tu registro perfectamente con el ID <code>${brokerId}</code>, ${nome}! 👏\n\n` +
    `Ahora solo falta el último paso: la <b>activación de tu cuenta</b> mediante tu primer depósito.`,

    `Depositas <b>cualquier valor</b> y el acceso a la herramienta es tuyo <b>VITALICIO</b> 🎯`,

    `Apenas realices el depósito, mi sistema me avisará en automático y te enviaré de inmediato tu <b>clave VIP</b> y el archivo de la extensión 🚀\n\n` +
    `¿Ya estás realizando el depósito o tienes alguna duda de cómo hacerlo? ¡Avísame para ayudarte! 😊`
  ],

  botoesAguardandoDeposito: [
    [{ text: '💳 Ver métodos de pago', callback_data: 'faq_metodos' }, { text: '💵 Monto mínimo', callback_data: 'faq_minimo' }],
    [{ text: '🔄 Ya deposité (Verificar)', callback_data: 'check_deposit_now' }],
    [{ text: '❓ Tengo una duda', callback_data: 'menu_dudas' }]
  ],

  // --------------------------------------------------------------------------
  // 6. ID AÚN NO DETECTADO EN EL CANAL (Posible delay de la plataforma)
  // --------------------------------------------------------------------------
  idNaoEncontradoAinda: (nome, brokerId) =>
    `Mmm, todavía no me aparece el ID <code>${brokerId}</code> en mi pantalla... A veces el broker tarda 1 o 2 minutitos en sincronizar y enviar la notificación al sistema.\n\n` +
    `Si recién te registraste o acabas de depositar, no te preocupes: en cuanto impacte aquí te mandaré mensaje al instante.\n\n` +
    `Confírmame por favor: ¿tu ID es exactamente <code>${brokerId}</code>?`,

  botoesIdNaoEncontrado: [
    [{ text: '🔄 Volver a consultar ahora', callback_data: 'check_deposit_now' }],
    [{ text: '❓ Necesito ayuda con el registro', callback_data: 'menu_dudas' }]
  ],

  // --------------------------------------------------------------------------
  // 7. DISPARO PROACTIVO (El bot contacta al cliente apenas el depósito cae al canal)
  // --------------------------------------------------------------------------
  depositoDetectadoProativo: (nome, valor) =>
    `¡Ey, ${nome}! ¡Acaba de sonar en mi sistema que tu depósito de ${valor} fue <b>confirmado con éxito</b> en el broker! 🚀🎉`,

  // --------------------------------------------------------------------------
  // 8. GENERANDO LA CLAVE VIP
  // --------------------------------------------------------------------------
  gerandoChave: () =>
    `¡Excelente! Ya identifiqué la confirmación de tu depósito en la plataforma.\n\nTe estoy generando tu clave criptográfica VIP en este mismo instante, dame solo un segundito...`,

  // --------------------------------------------------------------------------
  // 9. ENTREGA DE LA LICENCIA VIP OFICIAL
  // --------------------------------------------------------------------------
  entregaLicenca: (nome, codigoLicenca, dias, plano) =>
    `¡Listo, ${nome}! ¡Tu acceso está <b>100% liberado</b>! 🚀\n\n` +
    `🔑 <b>Tu Clave de Acceso Exclusiva:</b>\n` +
    `<code>${codigoLicenca}</code>\n` +
    `<i>(Solo toca la clave de arriba para copiarla al portapapeles)</i>\n\n` +
    `⏳ <b>Vigencia:</b> ACCESO VITALICIO\n` +
    `💎 <b>Plan:</b> VITALICIO / Motor Cuántico M1 Oficial`,

  // Leyenda adjunta al archivo .zip de la extensión
  legendaZip: () =>
    `📦 <b>Extensión Infiltrus Signals</b> (versión cliente actualizada)\nDescarga este archivo en tu computadora para instalarla.`,

  // --------------------------------------------------------------------------
  // 10. GUÍA PASO A PASO DE INSTALACIÓN EN GOOGLE CHROME
  // --------------------------------------------------------------------------
  guiaInstalacao: () =>
    `📖 <b>Cómo instalar la extensión en 3 sencillos pasos en tu computadora:</b>\n\n` +
    `1️⃣ Descarga el archivo <code>inflitrus-signals-cliente.zip</code> enviado arriba y descomprímelo en una carpeta de tu PC.\n` +
    `2️⃣ En tu navegador <b>Google Chrome</b>, abre la pestaña <code>chrome://extensions/</code> y activa la casilla <b>Modo de desarrollador</b> (arriba a la derecha).\n` +
    `3️⃣ Haz clic en el botón <b>Cargar descomprimida</b> y selecciona la carpeta que acabas de descomprimir.\n` +
    `4️⃣ Abre el broker, haz clic en el ícono de Infiltrus arriba y pega tu clave oficial.\n\n` +
    `¡Cualquier duda que tengas con la instalación, me escribes por acá que te acompaño personalmente! ¡Éxitos en tus operaciones y vamos con todo! 🎯📈`,

  // --------------------------------------------------------------------------
  // 11. RESPUESTA PREDETERMINADA SI EL CLIENTE ENVÍA MENSAJE SIN ID
  // --------------------------------------------------------------------------
  respostaPadraoSemId: (nome, linkAfiliado) =>
    `¡Te entiendo perfectamente, ${nome}! 😊\n\n` +
    `Para que pueda localizar tu cuenta en el sistema y entregarte tu clave VIP, envíame por favor tu número de <b>ID del broker</b> (está en la parte superior del menú de tu perfil).\n\n` +
    `Si todavía no creaste tu cuenta, puedes hacerlo en este enlace oficial con bono de bienvenida habilitado:\n` +
    `👉 <a href="${linkAfiliado}">Clic aquí para Crear tu Cuenta en el Broker</a>`,

  // --------------------------------------------------------------------------
  // 12. MENÚ DE PREGUNTAS FRECUENTES Y OBJECIONES (FAQ SISTEMA)
  // --------------------------------------------------------------------------
  menuDudas: (nome) =>
    `¡Claro que sí, ${nome}! Aquí estoy para despejarte cualquier duda que tengas antes de arrancar 😊\n\n` +
    `Toca cualquiera de los botones de abajo o <i>escríbeme directamente tu pregunta</i> aquí en el chat:`,

  botoesMenuDudas: [
    [{ text: '💵 ¿Cuánto es el depósito mínimo?', callback_data: 'faq_minimo' }],
    [{ text: '💳 ¿Qué métodos de pago aceptan?', callback_data: 'faq_metodos' }],
    [{ text: '📱 ¿Funciona en Celular o solo en PC?', callback_data: 'faq_dispositivos' }],
    [{ text: '💎 ¿Por qué es Gratis y Vitalicio?', callback_data: 'faq_vitalicio' }],
    [{ text: '🔒 ¿Cómo retiro mis ganancias?', callback_data: 'faq_retiros' }],
    [{ text: '🆔 ¿Dónde encuentro mi ID?', callback_data: 'faq_donde_id' }],
    [{ text: '⬅️ Volver / Quiero mi clave', callback_data: 'faq_volver' }]
  ],

  // 12.1 Duda: Monto Mínimo
  dudaMinimo: (nome) => [
    `💵 <b>¿Cuánto es el depósito mínimo para empezar?</b>\n\n` +
    `¡Es súper accesible, ${nome}! Puedes arrancar prácticamente con <b>cualquier valor</b> que acepte el broker en tu país (generalmente desde unos <i>5 a 10 dólares</i> o el equivalente en tu moneda local) 🎯`,

    `💡 <b>Lo mejor de todo:</b>\n` +
    `Ese dinero es <b>100% tuyo</b> en tu saldo real para operar y multiplicar con las señales.\n\n` +
    `No me pagas ninguna membresía ni suscripción: el software Infiltrus te queda <b>VITALICIO</b> de regalo 🚀\n\n` +
    `¿Quieres que te pase el enlace para registrarte o ya tienes tu cuenta lista?`
  ],

  botoesDudaMinimo: [
    [{ text: '💳 Ver métodos de pago', callback_data: 'faq_metodos' }],
    [{ text: '🔗 Registrarme ahora', callback_data: 'need_link' }],
    [{ text: '✅ Ya tengo mi ID', callback_data: 'has_account' }],
    [{ text: '⬅️ Ver otras preguntas', callback_data: 'menu_dudas' }]
  ],

  // 12.2 Duda: Métodos de Pago
  dudaMetodos: (nome) => [
    `💳 <b>¿Qué métodos de pago y depósito aceptan?</b>\n\n` +
    `El broker cuenta con pasarelas de pago <b>inmediatas y seguras</b> según tu país de residencia:\n\n` +
    `• <b>Pix</b> <i>(acreditación al segundo, si estás en Brasil)</i>\n` +
    `• <b>Tarjetas de Débito y Crédito</b> <i>(Visa / Mastercard)</i>\n` +
    `• <b>Transferencias bancarias locales</b> <i>(SPEI en México, PSE en Colombia, bancos locales)</i>\n` +
    `• <b>Billeteras electrónicas y Cripto</b> <i>(Binance Pay, USDT TRC20, Bitcoin, etc.)</i>`,

    `Apenas realizas el depósito, el saldo se refleja al instante en tu balance y mi sistema te envía tu <b>clave VIP</b> por este chat automáticamente ⏱️\n\n` +
    `¿Con cuál de estos métodos te queda más cómodo fondear tu cuenta?`
  ],

  botoesDudaMetodos: [
    [{ text: '💵 ¿Cuál es el monto mínimo?', callback_data: 'faq_minimo' }],
    [{ text: '🔗 Ir al broker a depositar', callback_data: 'need_link' }],
    [{ text: '⬅️ Ver otras preguntas', callback_data: 'menu_dudas' }]
  ],

  // 12.3 Duda: Gratis / Vitalicio
  dudaVitalicio: (nome) => [
    `💎 <b>¿Por qué el software es GRATIS y VITALICIO? ¿Dónde está el truco?</b>\n\n` +
    `¡Cero trucos ni letras chicas, ${nome}! Te cuento con total transparencia:\n\n` +
    `Nosotros tenemos una alianza directa con el broker oficial como desarrolladores de software. A mí no me interesa cobrarte suscripciones de $50 o $100 dólares al mes ni venderte cursos teóricos enredados.`,

    `Al registrarte con mi enlace oficial y activar tu cuenta con saldo para tus propias operaciones, el broker nos reconoce la afiliación y a ti te libero la herramienta con <b>ACCESO VITALICIO</b> 🎯\n\n` +
    `👉 <b>Tu dinero no me lo pagas a mí</b>: queda 100% en tu cuenta para que copies las señales y retires tus ganancias cuando quieras.`
  ],

  botoesDudaVitalicio: [
    [{ text: '🚀 ¡Quiero mi acceso VIP ahora!', callback_data: 'need_link' }],
    [{ text: '⬅️ Ver otras preguntas', callback_data: 'menu_dudas' }]
  ],

  // 12.4 Duda: Celular vs PC
  dudaDispositivos: (nome) => [
    `📱 <b>¿Se puede usar en Celular o solo en Computadora / Laptop?</b>\n\n` +
    `💻 <b>En Computadora o Laptop:</b>\n` +
    `Funciona perfecto y de manera nativa en <b>Google Chrome, Brave, Edge u Opera</b>. Es la forma más cómoda porque tienes la máxima velocidad para ejecutar las señales en M1 al instante ⚡`,

    `📱 <b>En Celular (Android):</b>\n` +
    `¡También se puede! Solo necesitas descargar desde la Play Store un navegador compatible con extensiones (como <b>Kiwi Browser</b> o <b>Yandex Browser</b>), cargas la extensión y listo.\n\n` +
    `<i>(En cuanto te entregue tu clave VIP, te paso el archivo y te ayudo a instalarla en el dispositivo que prefieras)</i> 😊`
  ],

  botoesDudaDispositivos: [
    [{ text: '✅ Perfecto, quiero empezar', callback_data: 'need_link' }],
    [{ text: '⬅️ Ver otras preguntas', callback_data: 'menu_dudas' }]
  ],

  // 12.5 Duda: Retiros y Seguridad
  dudaRetiros: (nome) => [
    `🔒 <b>¿Cómo retiro mis ganancias y qué tan seguro es?</b>\n\n` +
    `¡Tu dinero está <b>100% seguro y bajo tu propio control</b>, ${nome}!\n\n` +
    `1️⃣ La plataforma opera bajo estándares internacionales y cuenta con miles de traders activos a diario.\n` +
    `2️⃣ Puedes solicitar el retiro de tus ganancias y de tu capital <b>en cualquier momento</b>, sin trabas ni plazos mínimos de permanencia.\n` +
    `3️⃣ Los pagos se procesan directamente a tu cuenta bancaria, billetera virtual o wallet cripto que tú mismo elijas.`,

    `Tú eres el único dueño de tu saldo. Infiltrus es solo la herramienta inteligente que te marca las mejores entradas para ganar 📈`
  ],

  botoesDudaRetiros: [
    [{ text: '🚀 Ir al broker / Registrarme', callback_data: 'need_link' }],
    [{ text: '⬅️ Ver otras preguntas', callback_data: 'menu_dudas' }]
  ],

  // 12.6 Duda: Dónde encuentro mi ID
  dudaDondeId: () => [
    `🆔 <b>¿Cómo encontrar tu ID del Broker en 10 segundos?</b>\n\n` +
    `1️⃣ Inicia sesión en el broker desde tu computadora o teléfono.\n` +
    `2️⃣ En la esquina superior (donde aparece tu foto o perfil), toca sobre el menú.\n` +
    `3️⃣ Vas a ver un número de entre 5 y 9 dígitos al lado de tu nombre: ese es tu <b>ID</b> 🔢\n\n` +
    `Cópialo y pégalo por acá en el chat para que el sistema te reconozca de una vez.`
  ],

  botoesDudaDondeId: [
    [{ text: '🔗 Abrir el broker para ver mi ID', callback_data: 'need_link' }],
    [{ text: '⬅️ Ver otras dudas', callback_data: 'menu_dudas' }]
  ],

  // 12.7 Cuando hace clic en "Ya deposité (Verificar)" y el canal aún no notificó
  depositoAindaNaoConsta: (nome, brokerId) =>
    `¡Entendido, ${nome}! Consulté en mi sistema y todavía no impactó la confirmación de la plataforma para el ID <code>${brokerId}</code> ⏳\n\n` +
    `A veces las redes bancarias o de pago tardan entre <b>1 y 3 minutos</b> en sincronizar con el broker.\n\n` +
    `No te preocupes: en cuanto el sistema reciba el aviso, <b>te enviaré tu clave VIP y el ZIP aquí mismo en automático</b> sin que tengas que hacer nada más. 🚀`,

  // --------------------------------------------------------------------------
  // 13. MENSAJES DE FOLLOW-UP ESTRATÉGICOS (RECUPERACIÓN DE LEADS)
  // --------------------------------------------------------------------------

  // Caso A1: Pidió el link o inició, pero no envió ID (35-60 minutos de inactividad)
  followUpSemId1: (nome) => [
    `¡Hola, ${nome}! ¿Cómo vas con eso? 😊`,
    `Quería consultarte rápido si pudiste abrir el enlace para crear tu cuenta o si te saltó alguna duda con la plataforma.`,
    `Cualquier cosa avísame por acá que te doy una mano para dejarlo listo en <i>menos de 1 minuto</i> 👍`
  ],

  botoesFollowUpSemId1: (linkAfiliado) => [
    [{ text: '🔗 Abrir enlace de registro', url: linkAfiliado }],
    [{ text: '✅ Ya tengo mi ID listo', callback_data: 'has_account' }],
    [{ text: '❓ Tengo una duda', callback_data: 'menu_dudas' }]
  ],

  // Caso A2: Pidió el link o inició, sigue sin enviar ID (4-8 horas / prueba social)
  followUpSemId2: (nome) => [
    `¡Ey, ${nome}! Te paso a contar rápido por acá 📈`,
    `En la sesión de señales en vivo de recién, el motor M1 volvió a clavar <b>4 operaciones ganadas consecutivas</b> 🎯🔥`,
    `No quiero que te quedes mirando desde afuera mientras los demás están operando en automático. Solo pásame tu <b>ID de la plataforma</b> para activarte tu clave VIP y mandarte el archivo de una vez.\n\n` +
    `¿Tienes 2 minutitos para dejarlo listo ahora?`
  ],

  botoesFollowUpSemId2: (linkAfiliado) => [
    [{ text: '🚀 Enviar mi ID ahora', callback_data: 'has_account' }],
    [{ text: '🔗 No me registré todavía', url: linkAfiliado }],
    [{ text: '❓ Tengo una pregunta', callback_data: 'menu_dudas' }]
  ],

  // Caso B1: Envió ID pero aún no realizó el depósito (45-60 minutos)
  followUpSemDeposito1: (nome, brokerId) => [
    `¡Hola, ${nome}! ¿Pudiste entrar a la sección de depósitos en el broker? 😊`,
    `Te recuerdo que no necesitas poner mucho: con <b>cualquier valor</b> que deposites para tu propio saldo ya se te desbloquea el software de forma <b>VITALICIA</b> 🎯`,
    `Además, la acreditación es <i>instantánea</i> por los métodos locales (Pix, tarjeta, cripto o transferencia según tu país).\n\n` +
    `¿Tuviste alguna complicación al elegir el medio de pago o quieres que te ayude a completarlo?`
  ],

  botoesFollowUpSemDeposito1: [
    [{ text: '💳 Ver métodos de pago', callback_data: 'faq_metodos' }],
    [{ text: '💵 ¿Cuál es el monto mínimo?', callback_data: 'faq_minimo' }],
    [{ text: '🔄 Ya deposité (Verificar)', callback_data: 'check_deposit_now' }]
  ],

  // Caso B2: Envió ID, sigue sin depositar (6-12 horas / reserva de plaza VIP)
  followUpSemDeposito2: (nome, brokerId) => [
    `¡Hola de nuevo, ${nome}! Te escribo directo porque tengo tu clave VIP y tu plaza reservada en el sistema con el ID <code>${brokerId}</code> 🔒`,
    `Como liberamos licencias en cupos limitados para cuidar la precisión del algoritmo en el broker, quería consultarte antes de liberar tu cupo a la lista de espera.\n\n` +
    `Apenas fondees tu cuenta con cualquier monto, tu saldo queda 100% para ti y la herramienta te queda <b>activada de por vida</b> 🚀`,
    `¿Tienes alguna duda o quieres que te ayude a fondear para que arranques hoy mismo?`
  ],

  botoesFollowUpSemDeposito2: [
    [{ text: '💳 ¿Cómo hago el depósito?', callback_data: 'faq_metodos' }],
    [{ text: '🔄 Ya lo hice, verificar', callback_data: 'check_deposit_now' }],
    [{ text: '❓ Tengo una pregunta', callback_data: 'menu_dudas' }]
  ]
};
