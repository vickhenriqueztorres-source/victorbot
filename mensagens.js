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
  // 5. REGISTRO CONFIRMADO & ENTREGA INMEDIATA (MODELO 2 ETAPAS - DEMO GRATUITA)
  // --------------------------------------------------------------------------
  confirmacaoIdLiberacaoDemo: (nome, brokerId) => [
    `¡Encontré tu registro perfectamente con el ID <code>${brokerId}</code>, ${nome}! 👏🎯`,
    `¡Cumpliendo exactamente lo prometido! Te acabo de desbloquear tu <b>acceso oficial a Infiltrus</b> para que lo pruebes y lo compruebes tú mismo sin pagar un solo centavo 🚀`
  ],

  gerandoChaveDemo: () =>
    `Te estoy generando tu clave de acceso en este mismo instante, dame solo un segundito... 🔑`,

  entregaLicencaDemo: (nome, codigoLicenca, dias = 3, brokerId = '') =>
    `¡ID ${brokerId ? `<code>${brokerId}</code> ` : ''}Vinculado con Éxito! 🎯\n\n` +
    `Aquí tienes tu acceso oficial a Infiltrus:\n\n` +
    `🔑 <b>Tu Clave Demo (${dias * 24}h):</b>\n` +
    `<code>${codigoLicenca}</code>\n` +
    `<i>(Toca la clave de arriba para copiarla al portapapeles)</i>\n\n` +
    `📦 <b>Archivo de la Extensión:</b> (Archivo ZIP adjunto abajo)\n\n` +
    `📌 <b>TU MISIÓN DE HOY (El Reto de los 3 Señales):</b>\n` +
    `No abras operaciones a lo loco. Abre tu Chrome en B2 Trading, fija la extensión y espera únicamente las señales que tengan confirmación del Filtro de Volumen.\n\n` +
    `Haz 2 o 3 operaciones en la cuenta Demo. Cuando veas cómo reacciona el algoritmo en el gráfico de 1 minuto, regresa aquí y dime cuántas ganaste. 🚀\n\n` +
    `👇 <b>Mira el video tutorial de 1 minuto para instalarla:</b>\n` +
    `${config.tutorialVideoUrl || 'https://youtu.be/_-3dLIXNchg?si=St8-h6nT8S_NO3O4'}`,

  desafioDemo: () =>
    `📌 <b>TU MISIÓN DE HOY (El Reto de los 3 Señales):</b>\n\n` +
    `1️⃣ Abre tu Chrome en B2 Trading y fija la extensión.\n` +
    `2️⃣ Espera únicamente las señales con confirmación del Filtro de Volumen.\n` +
    `3️⃣ Haz 2 o 3 operaciones en la cuenta Demo y dime cuántas ganaste. 🎯\n\n` +
    `👇 <b>Mira el video tutorial de 1 minuto para instalarla:</b>\n` +
    `${config.tutorialVideoUrl || 'https://youtu.be/_-3dLIXNchg?si=St8-h6nT8S_NO3O4'}`,

  botoesEntregaDemo: [
    [{ text: '📺 Ver Video de Instalación', url: config.tutorialVideoUrl || 'https://youtu.be/_-3dLIXNchg?si=St8-h6nT8S_NO3O4' }],
    [{ text: '💳 Activar Cuenta Real ($5 USD)', callback_data: 'faq_como_real' }],
    [{ text: '🆘 Necesito Ayuda / Soporte', callback_data: 'menu_dudas' }]
  ],

  // --------------------------------------------------------------------------
  // 6. ID AÚN NO DETECTADO EN EL CANAL (Posible delay de la plataforma)
  // --------------------------------------------------------------------------
  idNaoEncontradoAinda: (nome, brokerId) =>
    `Mmm, todavía no me aparece el ID <code>${brokerId}</code> en mi pantalla... A veces el broker tarda 1 o 2 minutitos en sincronizar y enviar la notificación al sistema.\n\n` +
    `Si recién te registraste, no te preocupes: confírmame por favor si tu ID es exactamente <code>${brokerId}</code> o pásamelo nuevamente por acá 😊`,

  botoesIdNaoEncontrado: [
    [{ text: '🔄 Volver a consultar ahora', callback_data: 'check_deposit_now' }],
    [{ text: '❓ Necesito ayuda con el registro', callback_data: 'menu_dudas' }]
  ],

  // --------------------------------------------------------------------------
  // 7. DISPARO PROACTIVO (Celebración cuando el depósito cae al canal)
  // --------------------------------------------------------------------------
  depositoDetectadoProativo: (nome, valor) =>
    `¡¡FELICITACIONES, ${nome}!! 🎉🚀\n\n` +
    `¡Acaba de confirmarse en el sistema tu depósito de ${valor} en el broker! 👏\n\n` +
    `¡Tu cuenta acaba de ser ascendida oficialmente a <b>STATUS VIP REAL (2 MESES COMPLETOS)</b>! 💎`,

  // --------------------------------------------------------------------------
  // 8. GENERANDO LA CLAVE VIP REAL
  // --------------------------------------------------------------------------
  gerandoChave: () =>
    `¡Excelente! Ya identifiqué la confirmación de tu depósito en la plataforma.\n\nTe estoy actualizando tu clave criptográfica a VIP REAL (2 Meses) en este mismo instante, dame solo un segundito... 💎`,

  // --------------------------------------------------------------------------
  // 9. ENTREGA DE LA LICENCIA VIP OFICIAL (REAL 2 MESES / 60 DÍAS)
  // --------------------------------------------------------------------------
  entregaLicenca: (nome, codigoLicenca, dias = 60, plano = 'VIP REAL (2 MESES)') =>
    `¡Listo, ${nome}! ¡Tu acceso VIP está <b>100% liberado</b>! 🚀\n\n` +
    `🔑 <b>Tu Clave Oficial VIP:</b>\n` +
    `<code>${codigoLicenca}</code>\n` +
    `<i>(Solo toca la clave de arriba para copiarla al portapapeles)</i>\n\n` +
    `⏳ <b>Vigencia:</b> 2 MESES DE ACCESO VIP (${dias} Días)\n` +
    `💎 <b>Plan:</b> ${plano || 'VIP REAL (2 MESES)'} / Motor Cuántico M1 Oficial\n` +
    `✅ <b>Estado:</b> Saldo real habilitado y ganancias 100% retirables a tu banco 📈💰`,

  entregaLicencaVipReal: (nome, codigoLicenca, dias = 60) =>
    `🔑 <b>Tu Nueva Clave VIP Real Activada:</b>\n` +
    `<code>${codigoLicenca}</code>\n` +
    `<i>(Toca la clave para copiarla)</i>\n\n` +
    `💎 <b>Plan:</b> VIP REAL (Operaciones con Dinero Real)\n` +
    `⏳ <b>Vigencia:</b> 2 MESES DE ACCESO VIP (${dias} Días)\n` +
    `✅ <b>Estado:</b> 100% Habilitado para retirar ganancias a tu cuenta bancaria\n\n` +
    `¡Pégala en tu extensión para actualizar tu credencial o sigue operando de una vez! ¡Vamos con todo por esos resultados en saldo real! 🎯📈`,

  // Leyenda adjunta al archivo .zip de la extensión
  legendaZip: () =>
    `📦 <b>Extensión Infiltrus Signals</b> (versión cliente actualizada)\nDescarga este archivo en tu computadora para instalarla en Chrome.`,

  // --------------------------------------------------------------------------
  // 10. GUÍA PASO A PASO DE INSTALACIÓN EN GOOGLE CHROME
  // --------------------------------------------------------------------------
  guiaInstalacao: () =>
    `📖 <b>Cómo instalar la extensión en Google Chrome en 1 minuto:</b>\n\n` +
    `📺 <b>Video Tutorial Paso a Paso:</b>\n` +
    `${config.tutorialVideoUrl || 'https://youtu.be/_-3dLIXNchg?si=St8-h6nT8S_NO3O4'}\n\n` +
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
    [{ text: '🚀 ¿Cómo pasar a Cuenta Real ($5 USD)?', callback_data: 'faq_como_real' }],
    [{ text: '📖 ¿Cómo instalar la extensión en Chrome?', callback_data: 'faq_instalar' }],
    [{ text: '💵 ¿Cuánto es el depósito mínimo?', callback_data: 'faq_minimo' }],
    [{ text: '💳 ¿Qué métodos de pago aceptan?', callback_data: 'faq_metodos' }],
    [{ text: '📱 ¿Funciona en Celular o solo en PC?', callback_data: 'faq_dispositivos' }],
    [{ text: '💎 ¿Por qué es Gratis y Vitalicio?', callback_data: 'faq_vitalicio' }],
    [{ text: '🔒 ¿Cómo retiro mis ganancias?', callback_data: 'faq_retiros' }],
    [{ text: '🆔 ¿Dónde encuentro mi ID?', callback_data: 'faq_donde_id' }],
    [{ text: '⬅️ Volver / Menú principal', callback_data: 'faq_volver' }]
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
    `No te preocupes: en cuanto el sistema reciba el aviso, <b>te activaré el Status VIP Real automáticamente</b> sin que tengas que hacer nada más. 🚀`,

  // 12.8 Duda: Cómo pasar a Cuenta Real
  dudaComoReal: (nome) => [
    `🚀 <b>¿Cómo activar tu Cuenta Real para retirar ganancias al banco?</b>\n\n` +
    `¡Es súper sencillo, ${nome}! En cuanto decidas pasar de probar en Demo a generar dólares reales:\n\n` +
    `1️⃣ Abre el broker y entra a la sección <b>Depósito / Cajero</b>.\n` +
    `2️⃣ Selecciona tu método preferido (Pix, tarjeta de débito/crédito, transferencia bancaria local o cripto/Binance Pay).\n` +
    `3️⃣ Fondea tu cuenta con el monto que prefieras (desde apenas <b>$5 a $10 USD</b> o equivalente en tu moneda local).\n\n` +
    `💡 <b>Recuerda:</b> Todo el saldo es <b>100% tuyo</b> para operar y retirar cuando quieras. A mí no me pagas nada: recibes <b>2 MESES COMPLETOS (60 DÍAS)</b> de acceso VIP oficial para operar y el bot te asciende a <b>VIP REAL</b> de inmediato 🎯`
  ],

  botoesDudaComoReal: [
    [{ text: '💳 Ver métodos de pago', callback_data: 'faq_metodos' }],
    [{ text: '💵 ¿Cuál es el monto mínimo?', callback_data: 'faq_minimo' }],
    [{ text: '🔄 Ya deposité (Verificar)', callback_data: 'check_deposit_now' }],
    [{ text: '⬅️ Ver otras preguntas', callback_data: 'menu_dudas' }]
  ],

  // 12.9 Duda: Instalación en Chrome
  dudaInstalacion: () => [
    `📖 <b>Cómo instalar la extensión en Google Chrome en 1 minuto:</b>\n\n` +
    `📺 <b>Mira el video tutorial paso a paso:</b>\n` +
    `${config.tutorialVideoUrl || 'https://youtu.be/_-3dLIXNchg?si=St8-h6nT8S_NO3O4'}\n\n` +
    `1️⃣ Descarga el archivo <code>inflitrus-signals-cliente.zip</code> enviado en este chat y descomprímelo en tu PC.\n` +
    `2️⃣ En Google Chrome, escribe <code>chrome://extensions/</code> en la barra de direcciones.\n` +
    `3️⃣ Activa el botón <b>Modo de desarrollador</b> (arriba a la derecha).\n` +
    `4️⃣ Haz clic en <b>Cargar descomprimida</b> y selecciona la carpeta que descomprimiste.\n` +
    `5️⃣ Abre el broker, toca el ícono de Infiltrus arriba y pega tu clave oficial.\n\n` +
    `¡Listo! El motor M1 empezará a marcarte las entradas en vivo en tu pantalla ⚡`
  ],

  // Respuestas interativas a botones de seguimiento Demo
  respostaDemoInstalada: (nome) =>
    `¡Excelente, ${nome}! 🎉 Me alegro mucho de que ya la tengas en tu navegador.\n\n` +
    `Ahora ábrete el broker en <b>Cuenta Demo</b> y pruébala en vivo con un par de señales. ¡Vas a ver cómo clava las entradas! Cuéntame qué tal te va 😊🎯`,

  respostaDemoProbada: (nome) => [
    `¡Qué locura, ${nome}! ¡Te dije que la precisión del motor M1 es de otro nivel! 🔥👏`,
    `Ahora que ya lo comprobaste con tus propios ojos, el paso obvio para no dejar dinero sobre la mesa es <b>activar tu Cuenta Real</b> con el mínimo ($5 USD).\n\n` +
    `Así cada señal que ganes será plata real retirable a tu bolsillo 😉 ¿Quieres que te ayude a ver los medios de depósito?`
  ],

  respostaDemoTarde: (nome) =>
    `¡De una, ${nome}! Tómate tu tiempo. Abre la extensión cuando estés frente a la pantalla y ejecuta 2 o 3 operaciones en saldo Demo para agarrarle el ritmo.\n\n` +
    `¡Cualquier duda que te surja me escribes directo por acá! 👍`,

  // Prueba social de la comunidad para Follow-Up Demo 2
  resultadosComunidad: (nome) => [
    `📊 <b>Resultados de la Comunidad Infiltrus en Vivo:</b>\n\n` +
    `Hoy en las sesiones de mercado:\n` +
    `• Sesión M1 EUR/USD: 8 victorias / 1 derrota 🎯\n` +
    `• Sesión M1 GBP/USD: 6 victorias / 0 derrotas 🔥\n` +
    `• Retiros procesados hoy por el broker: <b>+$1,420 USD</b> a miembros VIP 💰\n\n` +
    `Todos empezaron exactamente igual: probando en Demo y luego fondeando sus primeros <b>$5 USD</b> para activar su cuenta real y retirar ganancias.\n\n` +
    `¿Listo para dar el paso a saldo real, ${nome}?`
  ],

  // --------------------------------------------------------------------------
  // 13. MENSAJES DE FOLLOW-UP ESTRATÉGICOS (JORNADA DE ATIVACIÓN EM 2 ETAPAS)
  // --------------------------------------------------------------------------

  // Caso A1: Pidió el link o inició, pero no envió ID (35 minutos de inactividad)
  followUpSemId1: (nome, linkAfiliado = config.brokerAffiliateUrl) => [
    `¿Tuviste algún problema con el enlace de B2 Trading?`,
    `Mira, no te escribo para insistirte. Te escribo porque el algoritmo de Infiltrus acaba de marcar <b>4 entradas consecutivas en verde</b> en la sesión actual. 🎯🔥\n\n` +
    `Crear tu cuenta toma literalmente 45 segundos y no te cuesta nada:\n` +
    `1️⃣ Abre el enlace oficial: <a href="${linkAfiliado}">Registrarme en B2 Trading</a>\n` +
    `2️⃣ Regístrate con tu correo\n` +
    `3️⃣ Envíame aquí tu ID de 6 o 7 dígitos\n\n` +
    `Tu archivo ZIP y tu licencia personalizada ya están generados en el servidor, esperando que vincules tu ID.\n\n` +
    `👇 <b>Toca el botón para registrarte ahora:</b>`
  ],

  botoesFollowUpSemId1: (linkAfiliado) => [
    [{ text: '🔗 Crear Cuenta en B2 Trading', url: linkAfiliado }],
    [{ text: '✅ Ya tengo mi ID', callback_data: 'has_account' }],
    [{ text: '🆘 Necesito Ayuda', callback_data: 'menu_dudas' }]
  ],

  // Caso A2: Pidió el link o inició, sigue sin enviar ID (+4 horas tras F1 - Postura e Filtro de Ejecutores)
  followUpSemId2: (nome, linkAfiliado = config.brokerAffiliateUrl) => [
    `No opero con gente que busca fórmulas mágicas sin mover un dedo.\n\n` +
    `Crear tu cuenta en B2 Trading toma literalmente 45 segundos y $0 pesos. Si ni siquiera tienes la iniciativa de abrir un enlace y copiar 6 números de ID, entonces Infiltrus no te va a servir de nada. Las herramientas automáticas son para los que ejecutan, no para los que miran desde afuera.\n\n` +
    `El archivo ZIP con la extensión y tu clave personalizada están listos en este chat.\n\n` +
    `¿Lo vas a usar para operar la sesión de hoy o descarto tu registro?\n\n` +
    `Regístrate aquí y manda tu ID: <a href="${linkAfiliado}">Registrarme en B2 Trading</a>`
  ],

  botoesFollowUpSemId2: (linkAfiliado = config.brokerAffiliateUrl) => [
    [{ text: '🚀 Registrarme en B2 y Activar', url: linkAfiliado }],
    [{ text: '✍️ Enviar mi ID de 6 dígitos', callback_data: 'has_account' }]
  ],

  // Caso B1: Recibió la extensión Demo (+45 min - Check de Micro-vitória Demo)
  followUpDemoInstalacao: (nome) => [
    `¿Pudiste fijar el ícono de Infiltrus en tu Chrome?\n\n` +
    `Si ya lo hiciste, debes ver las flechas matemáticas y la caja de confirmación sobre el gráfico de B2. 🎯\n\n` +
    `⚠️ <b>IMPORTANTE:</b> No operes en noticias de alto impacto. Espera que el indicador marque <b>"ENTRADA CONFIRMADA"</b>.\n\n` +
    `Si tuviste alguna traba para instalar el ZIP, toca abajo y te ayudo en 1 minuto. 👇`
  ],

  botoesFollowUpDemoInstalacao: [
    [{ text: '✅ Ya la instalé y estoy listo', callback_data: 'demo_instalada' }],
    [{ text: '🛠️ Ayuda con la instalación', callback_data: 'faq_instalar' }]
  ],

  // Caso B2: Demo instalada (+3 horas tras Demo 1 - "El Dinero Fantasma")
  followUpDemoTeste: (nome) => [
    `Pregunta rápida: ¿Cuántas operaciones ganaste hoy en la Demo? 👀\n\n` +
    `Seguramente ya viste crecer ese saldo ficticio. Pero seamos sinceros...\n\n` +
    `Ganar $50 o $100 dólares en una cuenta demo <b>no paga el alquiler, no compra comida ni te da libertad</b>. Es dinero fantasma.\n\n` +
    `El algoritmo ya te demostró de lo que es capaz en tu propia pantalla. La única diferencia entre tú y los que están retirando ganancias todos los días a su cuenta bancaria es que ellos operan en cuenta Real. 💰\n\n` +
    `Con solo <b>$5 USD</b> (lo que cuesta una taza de café) activas tu cuenta real en B2 y te desbloqueo la <b>Licencia VIP de 60 Días Completos</b>.\n\n` +
    `¿Vas a seguir jugando con dinero de mentira o empezamos a operar en serio? 👇`
  ],

  botoesFollowUpDemoTeste: (linkAfiliado = config.brokerAffiliateUrl) => [
    [{ text: '💳 Depositar $5 y Activar VIP 60 Días', url: linkAfiliado }],
    [{ text: '📈 Ver Resultados de la Comunidad', callback_data: 'ver_comunidad' }]
  ],

  // Caso B3: Conversión Natural a Cuenta Real (+12 horas tras Demo 2 - Prova de Saque Carlos)
  followUpDemoConversaoReal: (nome, brokerId, linkAfiliado = config.brokerAffiliateUrl) => [
    `Esto fue lo que hizo Carlos (uno de nuestros miembros) hoy:\n\n` +
    `Inició con un depósito de solo $10 USD esta mañana.\n` +
    `Siguió 4 señales de Infiltrus con gestión 2x1.\n` +
    `Cerró su sesión con <b>$38 USD</b> y acaba de solicitar su retiro a Binance. 💸\n\n` +
    `Los <b>$5 USD</b> de depósito mínimo no son para mí ni para pagar la herramienta (la extensión sigue siendo <b>GRATIS</b>). Es <b>TU capital de trabajo</b>. Sigue estando 100% en tu poder para multiplicarlo y retirarlo cuando quieras.\n\n` +
    `Al hacer tu primer depósito hoy:\n` +
    `✅ Tu licencia se extiende automáticamente a <b>60 Días VIP</b>\n` +
    `✅ Acceso a la configuración de Máxima Asertividad M1\n` +
    `✅ Plantilla de Gestión de Riesgo Blindada\n\n` +
    `Toca abajo, deposita tus $5 USD y el bot actualizará tu clave en el acto: 👇`
  ],

  botoesFollowUpDemoConversaoReal: (linkAfiliado = config.brokerAffiliateUrl) => [
    [{ text: '🚀 Depositar $5 en B2 Trading', url: linkAfiliado }]
  ],

  // Caso B4: Último llamado / Escasez Dura (+24 horas tras Demo 3)
  followUpDemoUltimoLlamado: (nome, brokerId, linkAfiliado = config.brokerAffiliateUrl) => [
    `Tu período de prueba Demo está llegando a su fin. ⏳\n\n` +
    `Las licencias gratuitas de servidor requieren recursos de procesamiento en tiempo real. En pocas horas, tu clave Demo será dada de baja para liberar espacio a nuevos usuarios.\n\n` +
    `Para mantener tu algoritmo activo y recibir la <b>Licencia VIP de 2 Meses (60 Días)</b>, solo necesitas fondear tu cuenta de B2 Trading con el mínimo de <b>$5 USD</b>.\n\n` +
    `No dejes que tu herramienta se desactive:\n` +
    `👉 <a href="${linkAfiliado}"><b>Clic aquí para Fondear tu Cuenta en B2 Trading</b></a>\n\n` +
    `Nos vemos adentro de la Sala VIP. 🚀`
  ],

  botoesFollowUpDemoUltimoLlamado: (linkAfiliado = config.brokerAffiliateUrl) => [
    [{ text: '⚡ Activar VIP Real con $5 USD', url: linkAfiliado }]
  ],

  // Compatibilidad con llamadas legacy
  followUpSemDeposito1: (nome, brokerId) => [
    `¡Hola, ${nome}! ¿Pudiste probar tus señales en Demo o entrar a la sección de depósitos? 😊`,
    `Te recuerdo que no necesitas poner mucho para operar en real: con <b>cualquier valor</b> (desde $5 USD) ya se te desbloquea la membresía de forma <b>VITALICIA</b> o tus <b>2 MESES COMPLETOS (60 DÍAS)</b> en <b>STATUS VIP REAL</b> 🎯`,
    `Además, la acreditación es <i>instantánea</i> por métodos locales (Pix, tarjeta, cripto o transferencia según tu país).\n\n` +
    `¿Tuviste alguna duda o quieres que te ayude a completarlo?`
  ],
  botoesFollowUpSemDeposito1: [
    [{ text: '💳 Ver métodos de pago', callback_data: 'faq_metodos' }],
    [{ text: '💵 ¿Cuál es el monto mínimo?', callback_data: 'faq_minimo' }],
    [{ text: '🔄 Ya deposité (Verificar)', callback_data: 'check_deposit_now' }]
  ],
  followUpSemDeposito2: (nome, brokerId) => [
    `¡Hola de nuevo, ${nome}! Te escribo directo porque tengo tu plaza reservada en el sistema con el ID <code>${brokerId}</code> 🔒`,
    `Apenas fondees tu cuenta con cualquier monto mínimo, tu saldo queda 100% para ti y la herramienta te queda <b>activada por 2 Meses (60 Días) en Modo Real</b> 🚀`,
    `¿Tienes alguna duda o quieres que te ayude a fondear para que arranques hoy mismo?`
  ],
  botoesFollowUpSemDeposito2: [
    [{ text: '💳 ¿Cómo hago el depósito?', callback_data: 'faq_metodos' }],
    [{ text: '🔄 Ya lo hice, verificar', callback_data: 'check_deposit_now' }],
    [{ text: '❓ Tengo una pregunta', callback_data: 'menu_dudas' }]
  ]
};
