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

  entregaLicencaDemo: (nome, codigoLicenca, dias = 3, plano = 'DEMO VIP') =>
    `¡Listo, ${nome}! Tu herramienta está <b>100% activa</b> 🚀\n\n` +
    `🔑 <b>Tu Clave de Acceso Demo:</b>\n` +
    `<code>${codigoLicenca}</code>\n` +
    `<i>(Toca la clave de arriba para copiarla al portapapeles)</i>\n\n` +
    `💎 <b>Plan:</b> ${plano || 'DEMO VIP'} (Motor Cuántico M1 Habilitado)\n` +
    `⏳ <b>Vigencia:</b> ${dias} DÍAS DE PRUEBA COMPLETA (72 Horas)`,

  desafioDemo: () =>
    `💡 <b>Tu primer paso recomendado (Tienes 72 Horas de Prueba Gratuita):</b>\n\n` +
    `1️⃣ Abre tu broker en <b>Cuenta DEMO</b> (con saldo ficticio de prueba).\n` +
    `2️⃣ Conéctale la extensión y deja que el motor matemático analice el mercado en vivo.\n` +
    `3️⃣ Ejecuta tus primeras <b>2 a 3 señales</b> en M1 sin arriesgar ni un solo centavo de tu propio dinero.\n\n` +
    `¡Tienes <b>3 días completos</b> para comprobar cómo clava las entradas! Avísame por acá en cuanto la tengas lista en pantalla 😊🎯`,

  botoesEntregaDemo: [
    [{ text: '📖 ¿Cómo instalar la extensión?', callback_data: 'faq_instalar' }],
    [{ text: '💳 Activar Cuenta Real ($5 USD)', callback_data: 'faq_como_real' }],
    [{ text: '❓ Tengo una duda / Preguntas', callback_data: 'menu_dudas' }]
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
    `📖 <b>Cómo instalar la extensión en Google Chrome:</b>\n\n` +
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

  // --------------------------------------------------------------------------
  // 13. MENSAJES DE FOLLOW-UP ESTRATÉGICOS (JORNADA DE ATIVACIÓN EM 2 ETAPAS)
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
    `No quiero que te quedes mirando desde afuera mientras los demás están operando en automático. Solo pásame tu <b>ID de la plataforma</b> para activarte tu herramienta y mandarte el archivo de una vez.\n\n` +
    `¿Tienes 2 minutitos para dejarlo listo ahora?`
  ],

  botoesFollowUpSemId2: (linkAfiliado) => [
    [{ text: '🚀 Enviar mi ID ahora', callback_data: 'has_account' }],
    [{ text: '🔗 No me registré todavía', url: linkAfiliado }],
    [{ text: '❓ Tengo una pregunta', callback_data: 'menu_dudas' }]
  ],

  // Caso B1: Recibió la extensión Demo pero no ha interactuado (45-60 min - Check-in Instalación)
  followUpDemoInstalacao: (nome) => [
    `¡Hola, ${nome}! ¿Cómo vas con la instalación de la extensión? 😊`,
    `Quería consultarte rápido si pudiste descomprimir el archivo y cargarlo en Google Chrome sin problema.`,
    `Si te trabaste en algún paso o necesitas una mano, escríbeme por acá que te acompaño personalmente para dejarlo listo en 1 minuto 👍`
  ],

  botoesFollowUpDemoInstalacao: [
    [{ text: '✅ Ya la tengo instalada', callback_data: 'demo_instalada' }],
    [{ text: '❓ Ayuda con la instalación', callback_data: 'faq_instalar' }],
    [{ text: '💳 Activar Cuenta Real ($5 USD)', callback_data: 'faq_como_real' }]
  ],

  // Caso B2: Demo instalada (3-5 horas - Desafío Demo y Validación de Señales)
  followUpDemoTeste: (nome) => [
    `¡Ey, ${nome}! Te paso a contar rápido por acá 📈`,
    `En la sesión de recién el algoritmo volvió a meter <b>3 victorias consecutivas</b> en M1 🎯🔥`,
    `¿Ya pudiste probar un par de señales con el saldo ficticio en tu Cuenta Demo? Cuéntame cómo te fue con el motor M1:`
  ],

  botoesFollowUpDemoTeste: [
    [{ text: '🎯 Ya la probé, ¡es brutal!', callback_data: 'demo_probada' }],
    [{ text: '⏳ La voy a probar hoy', callback_data: 'demo_tarde' }],
    [{ text: '💳 Activar Cuenta Real ($5 USD)', callback_data: 'faq_como_real' }]
  ],

  // Caso B3: Conversión Natural a Cuenta Real / FTD (12-24 horas)
  followUpDemoConversaoReal: (nome, brokerId) => [
    `¡Hola, ${nome}! ¿Cómo estás? 😊`,
    `Ya viste con tus propios ojos cómo analiza el mercado el algoritmo en tu cuenta Demo. Recuerda que tu prueba gratuita de <b>3 días</b> está corriendo ⏳`,
    `El siguiente paso natural es fondear tu cuenta real para empezar a retirar ganancias de verdad. Puedes arrancar con el monto mínimo de tu país (desde apenas <b>$5 USD</b> o el equivalente en Pix/tarjeta local).\n\n` +
    `Apenas hagas tu depósito, mi sistema lo detecta en automático y te asciende de inmediato a <b>STATUS VIP REAL (2 MESES / 60 DÍAS)</b> con soporte prioritario 🚀\n\n` +
    `¿Quieres que te ayude a ver los métodos de pago disponibles para tu país?`
  ],

  botoesFollowUpDemoConversaoReal: [
    [{ text: '💳 Ver métodos de pago', callback_data: 'faq_metodos' }],
    [{ text: '💵 ¿Cuál es el monto mínimo?', callback_data: 'faq_minimo' }],
    [{ text: '🔄 Ya deposité (Verificar)', callback_data: 'check_deposit_now' }]
  ],

  // Caso B4: Último llamado / Reserva VIP (36-48 horas)
  followUpDemoUltimoLlamado: (nome, brokerId) => [
    `¡Hola de nuevo, ${nome}! Te escribo directo porque tu prueba Demo de 3 días para el ID <code>${brokerId}</code> está por concluir 🎯`,
    `Recuerda que con tu primer depósito (desde $5 USD) desbloqueas de inmediato <b>2 MESES COMPLETOS (60 Días)</b> de membresía VIP Real para operar en saldo real y retirar todas tus ganancias.\n\n` +
    `Todo tu saldo queda 100% para ti para operar y retirar cuando quieras. ¡No dejes pasar la oportunidad de multiplicar tu propio capital! 📈\n\n` +
    `Si necesitas cualquier ayuda para fondear tu cuenta, estoy por acá para asistirte.`
  ],

  botoesFollowUpDemoUltimoLlamado: [
    [{ text: '💳 ¿Cómo hago el depósito?', callback_data: 'faq_metodos' }],
    [{ text: '🔄 Ya lo hice, verificar', callback_data: 'check_deposit_now' }],
    [{ text: '❓ Tengo una pregunta', callback_data: 'menu_dudas' }]
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
