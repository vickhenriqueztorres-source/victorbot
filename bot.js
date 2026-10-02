/**
 * MOTOR PRINCIPAL DO BOT HUMANIZADO DO TELEGRAM (INFILTRUS / B2 TRADING)
 *
 * Funcionalidades:
 * 1. Conversa humanizada empática e acolhedora (Persona Victor Torrez).
 * 2. Simulação de digitação em tempo real ("typing" + delay natural).
 * 3. Monitoramento do canal de notificações em tempo real.
 * 4. Validação automática de cadastro e depósito da corretora.
 * 5. Emissão instantânea de chave criptográfica ECDSA P-256 e envio do ZIP.
 * 6. Disparo proativo automático assim que o depósito cai no canal.
 * 7. Recuperação inteligente de leads frios via Follow-Up Estratégico.
 * 8. Central de Dúvidas / FAQ interativa com reconhecimento de intenções.
 */

import fs from 'node:fs';
import path from 'node:path';
import http from 'node:http';
import { fileURLToPath } from 'node:url';
import { config } from './config.js';
import { db } from './database.js';
import { TelegramApi } from './telegram-api.js';
import { parseChannelNotification } from './channel-parser.js';
import { issueClientLicense } from './license-service.js';
import { mensagens } from './mensagens.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

if (!config.botToken) {
  console.error('\n❌ ERRO: O TELEGRAM_BOT_TOKEN não foi configurado!');
  console.error('👉 Crie um arquivo .env na pasta bot-telegram com seu token do @BotFather.');
  console.error('Exemplo: TELEGRAM_BOT_TOKEN=123456789:ABCdefGhIjkLmNoPqRsTuVwXyZ\n');
  process.exit(1);
}

// Servidor HTTP leve para health check do Render (evita erro de port scan)
const port = process.env.PORT || 3000;
const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
  res.end('Bot Infiltrus Online e Ativo 🚀');
});
server.listen(port, () => {
  console.log(`[HTTP] Servidor de health check ativo na porta ${port}`);
});

// Auto-ping de keep-alive a cada 8 minutos (evita suspensão/hibernação no plano Free do Render)
const renderExternalUrl = process.env.RENDER_EXTERNAL_URL || 'https://victorbot-xkuh.onrender.com';
setInterval(async () => {
  try {
    const res = await fetch(renderExternalUrl);
    console.log(`[KEEP-ALIVE] Ping periódico em ${renderExternalUrl} -> Status ${res.status}`);
  } catch (err) {
    console.error(`[KEEP-ALIVE] Falha no auto-ping: ${err.message}`);
  }
}, 8 * 60 * 1000);


const api = new TelegramApi(config.botToken);

// Função para simular digitação e pausa humana
async function simulateTyping(chatId, delayMs = config.typingDelayMs) {
  try {
    await api.sendChatAction(chatId, 'typing');
  } catch (err) {
    // Ignora se o chat foi bloqueado
  }
  await new Promise(resolve => setTimeout(resolve, delayMs));
}

// Envia mensagem com digitação humanizada (suporta string ou array de mensagens sequenciais pausadas)
async function sendHumanMessage(chatId, textOrArray, options = {}, delayMs = config.typingDelayMs) {
  try {
    if (Array.isArray(textOrArray)) {
      for (let i = 0; i < textOrArray.length; i++) {
        const isLast = i === textOrArray.length - 1;
        const text = textOrArray[i];
        const delay = i === 0 ? Math.min(delayMs, 1400) : 1800;
        await simulateTyping(chatId, delay);
        await api.sendMessage(chatId, text, isLast ? options : {});
      }
      return true;
    }
    await simulateTyping(chatId, delayMs);
    await api.sendMessage(chatId, textOrArray, options);
    return true;
  } catch (err) {
    console.error(`[AVISO] Falha ao enviar mensagem para chat ${chatId}: ${err.message}`);
    return false;
  }
}

// Função para simular upload de foto com pausa humanizada
async function simulatePhotoUpload(chatId, delayMs = config.typingDelayMs) {
  try {
    await api.sendChatAction(chatId, 'upload_photo');
  } catch (err) {
    // Ignora se o chat foi bloqueado
  }
  await new Promise(resolve => setTimeout(resolve, delayMs));
}

// Envia foto com legenda humanizada e botões inline
async function sendHumanPhoto(chatId, photoPath, captionOrArray, options = {}, delayMs = config.typingDelayMs) {
  try {
    const caption = Array.isArray(captionOrArray) ? captionOrArray.join('\n\n') : captionOrArray;
    if (fs.existsSync(photoPath)) {
      await simulatePhotoUpload(chatId, delayMs);
      await api.sendPhoto(chatId, photoPath, caption, options);
      return true;
    } else {
      // Se a imagem não for encontrada, envia como mensagem de texto normal
      return sendHumanMessage(chatId, captionOrArray, options, delayMs);
    }
  } catch (err) {
    console.error(`[AVISO] Falha ao enviar foto para chat ${chatId}: ${err.message}`);
    // Fallback: se falhar o envio da foto, tenta enviar como texto normal
    return sendHumanMessage(chatId, captionOrArray, options, delayMs);
  }
}


/**
 * Libera o acesso do cliente ao software Infiltrus:
 * - Se plan === 'DEMO VIP': entrega imediata sem atrito para testar na conta demo com saldo fictício.
 * - Se plan === 'VITALICIO VIP' ou 'VITALICIO': entrega credencial real após depósito.
 */
async function deliverAccessToUser(chatId, clientName, brokerId, plan = 'DEMO VIP') {
  const name = clientName || 'Trader';
  const isRealVip = plan === 'VIP REAL (2 MESES)' || plan === 'VITALICIO VIP' || plan === 'VITALICIO' || plan === 'VIP REAL';
  const durationDays = isRealVip ? (config.realLicenseDays || 60) : (config.demoLicenseDays || 3);
  console.log(`[LIBERAÇÃO] Iniciando entrega (${plan} - ${durationDays} dias) para ${name} (ID Corretora: ${brokerId}, Chat: ${chatId})`);

  // Mensagem inicial humanizada simulando processamento criptográfico
  await sendHumanMessage(chatId, isRealVip ? mensagens.gerandoChave() : mensagens.gerandoChaveDemo(), {}, 1800);

  // 1. Gera a licença oficial assinada com a chave privada ECDSA P-256
  const license = await issueClientLicense({
    holder: `${name} (${brokerId})`,
    durationDays,
    plan: plan
  });

  // 2. Salva no banco de dados local
  db.recordLicense({
    brokerId,
    chatId,
    code: license.code,
    holder: license.holder,
    plan: license.plan,
    durationDays: license.durationDays,
    expiresAtIso: license.expiresAtIso
  });

  db.saveUser(chatId, {
    status: isRealVip ? 'VIP_REAL' : 'DEMO_ACTIVE',
    brokerId,
    licenseCode: license.code,
    licensePlan: license.plan,
    activatedAt: new Date().toISOString(),
    demoActivatedAt: isRealVip ? undefined : new Date().toISOString(),
    lastInteractionAt: new Date().toISOString()
  });

  // 3. Envia a chave de acesso formatada em bloco copiável
  await simulateTyping(chatId, 2200);
  const licenseMsg = isRealVip
    ? mensagens.entregaLicenca(name, license.code, license.durationDays, license.plan)
    : mensagens.entregaLicencaDemo(name, license.code, license.durationDays, brokerId);
  try {
    await api.sendMessage(chatId, licenseMsg);
  } catch (err) {
    console.error(`[AVISO] Falha ao enviar mensagem de licença para ${chatId}:`, err.message);
  }

  // 4. Envia o arquivo ZIP da extensão se existir
  if (fs.existsSync(config.extensionZipPath)) {
    await simulateTyping(chatId, 2000);
    try {
      await api.sendDocument(
        chatId,
        config.extensionZipPath,
        mensagens.legendaZip()
      );
    } catch (err) {
      console.error('[ERRO] Falha ao enviar arquivo ZIP pelo Telegram:', err.message);
    }
  }

  // 5. Se for ativação DEMO, envia botões de ação com link do vídeo e suporte
  if (!isRealVip) {
    await simulateTyping(chatId, 1600);
    const keyboard = { inline_keyboard: mensagens.botoesEntregaDemo };
    try {
      await api.sendMessage(chatId, `👇 <b>Acciones Rápidas:</b>\nToca abajo para ver el video tutorial o resolver cualquier duda:`, { reply_markup: keyboard });
    } catch (err) {
      console.error(`[AVISO] Falha ao enviar botões demo para ${chatId}:`, err.message);
    }
  }

  console.log(`[SUCESSO] Acesso (${plan} - ${durationDays} dias) entregue com sucesso para ${name} (ID: ${brokerId})`);
}

/**
 * Realiza o upgrade proativo do usuário para VIP REAL (2 MESES / 60 DIAS) quando o depósito é confirmado
 */
async function upgradeToRealVip(chatId, clientName, brokerId, amount = 'confirmado') {
  const name = clientName || 'Trader';
  const durationDays = config.realLicenseDays || 60;
  console.log(`[UPGRADE VIP] Emitindo credencial VIP Real (${durationDays} dias / 2 Meses) para ${name} (ID: ${brokerId})`);

  // Emite licença com o plano oficial VIP REAL (2 MESES)
  const license = await issueClientLicense({
    holder: `${name} (${brokerId})`,
    durationDays,
    plan: 'VIP REAL (2 MESES)'
  });

  db.recordLicense({
    brokerId,
    chatId,
    code: license.code,
    holder: license.holder,
    plan: license.plan,
    durationDays: license.durationDays,
    expiresAtIso: license.expiresAtIso
  });

  db.saveUser(chatId, {
    status: 'VIP_REAL',
    licenseCode: license.code,
    licensePlan: license.plan,
    upgradedToRealAt: new Date().toISOString(),
    lastInteractionAt: new Date().toISOString()
  });

  await simulateTyping(chatId, 2000);
  const vipMsg = mensagens.entregaLicencaVipReal(name, license.code, durationDays);
  await api.sendMessage(chatId, vipMsg);
  console.log(`[SUCESSO] Upgrade VIP Real entregue para ${name} (ID: ${brokerId})`);
}

/**
 * Trata posts recebidos no canal de notificações
 */
async function handleChannelPost(channelMsg) {
  const text = channelMsg.text || channelMsg.caption || '';
  if (!text) return;

  const parsed = parseChannelNotification(text);
  console.log(`[CANAL] Notificação recebida: Tipo=${parsed.type} | ID=${parsed.brokerId || 'N/A'} | Valor=${parsed.amount || 'N/A'}`);

  const eventRecord = db.recordChannelEvent(parsed);

  // Se for um evento de depósito com ID detectado
  if (parsed.type === 'DEPOSITO' && parsed.brokerId) {
    const user = db.findUserByBrokerId(parsed.brokerId);
    if (user && user.status !== 'VIP_REAL') {
      console.log(`[GATILHO PROATIVO UPGRADE] Usuário encontrado para upgrade VIP Real: Chat ${user.chatId} (${user.firstName})`);

      // Notifica proativamente o usuário comemorando a confirmação do depósito
      await sendHumanMessage(
        user.chatId,
        mensagens.depositoDetectadoProativo(user.firstName || 'amigo(a)', parsed.amount || 'confirmado'),
        {},
        1500
      );

      // Emite credencial VIP Real Vitalícia
      await upgradeToRealVip(user.chatId, user.firstName, parsed.brokerId, parsed.amount);
      eventRecord.isHandled = true;
      db.saveSync();
    }
  }
}

/**
 * Trata mensagens privadas de clientes
 */
async function handlePrivateMessage(msg) {
  const chatId = String(msg.chat.id);
  const text = (msg.text || '').trim();
  const firstName = msg.from?.first_name || 'Trader';
  const username = msg.from?.username || '';

  const user = db.getUser(chatId) || db.saveUser(chatId, { firstName, username });
  db.saveUser(chatId, { firstName, username, lastInteractionAt: new Date().toISOString() });

  // 1. COMANDOS DE ADMINISTRADOR
  if (text.startsWith('/')) {
    const parts = text.split(' ');
    const cmd = parts[0].toLowerCase();
    const arg = parts.slice(1).join(' ').trim();

    const isAdmin = config.adminIds.length === 0 || config.adminIds.includes(chatId);

    if (cmd === '/admin' || cmd === '/status') {
      const stats = db.getStats();
      const totalFu = (stats.followUpsSent?.noId_1 || 0) + (stats.followUpsSent?.noId_2 || 0) + (stats.followUpsSent?.demo_1 || 0) + (stats.followUpsSent?.demo_2 || 0) + (stats.followUpsSent?.demo_3 || 0) + (stats.followUpsSent?.demo_4 || 0);

      const report =
        `📊 <b>PAINEL DO ADMINISTRADOR</b>\n\n` +
        `👥 <b>Total de Leads no Bot:</b> ${stats.totalUsers}\n` +
        `⏳ <b>Aguardando Envio de ID:</b> ${stats.withoutId || 0}\n` +
        `🎯 <b>Em Fase de Teste Demo:</b> ${stats.demoUsers || 0}\n` +
        `👑 <b>VIP Real Vitalício (Depositados):</b> ${stats.vipRealUsers || 0}\n` +
        `🔑 <b>Licenças Emitidas:</b> ${stats.activeLicenses}\n` +
        `📢 <b>Eventos do Canal:</b> ${stats.totalEvents} (${stats.depositEvents} depósitos / ${stats.signupEvents} cadastros)\n` +
        `📬 <b>Follow-ups Enviados:</b> ${totalFu}\n` +
        `  • Sem ID 1: ${stats.followUpsSent?.noId_1 || 0} | Sem ID 2: ${stats.followUpsSent?.noId_2 || 0}\n` +
        `  • Demo 1 (Instalação): ${stats.followUpsSent?.demo_1 || 0}\n` +
        `  • Demo 2 (Validação Sinais): ${stats.followUpsSent?.demo_2 || 0}\n` +
        `  • Demo 3 (Ponte Real $15): ${stats.followUpsSent?.demo_3 || 0}\n` +
        `  • Demo 4 (Último Chamado): ${stats.followUpsSent?.demo_4 || 0}\n\n` +
        `<i>Comandos disponíveis:</i>\n` +
        `• <code>/liberar &lt;ID_CORRETORA&gt; [demo|real]</code> - Força liberação manual\n` +
        `• <code>/followup</code> - Pipeline do funil em 2 etapas\n` +
        `• <code>/disparar_followup &lt;CHAT_ID&gt; &lt;1-6&gt;</code> - Dispara follow-up teste\n` +
        `• <code>/simular &lt;TEXTO_DO_CANAL&gt;</code> - Testa notificação do canal`;
      return api.sendMessage(chatId, report);
    }

    if (cmd === '/followup' && isAdmin) {
      const users = Object.values(db.data.users);
      const awaitingId = users.filter(u => !u.brokerId && u.status !== 'VIP_REAL');
      const demoActive = users.filter(u => u.brokerId && (u.status === 'DEMO_ACTIVE' || u.status === 'WAITING_DEPOSIT'));
      const vipReal = users.filter(u => u.status === 'VIP_REAL' || u.status === 'ACTIVE');

      const msg =
        `📋 <b>PIPELINE DO FUNIL EM 2 ETAPAS</b>\n\n` +
        `⏳ <b>Aguardando Envio de ID:</b> ${awaitingId.length} leads\n` +
        `🎯 <b>Em Fase de Teste Demo:</b> ${demoActive.length} leads\n` +
        `👑 <b>VIP Real Vitalício (FTD):</b> ${vipReal.length} clientes\n\n` +
        `<i>Para testar o disparo de mensagens para qualquer chat:</i>\n` +
        `<code>/disparar_followup &lt;CHAT_ID&gt; &lt;1|2|3|4|5|6&gt;</code>\n\n` +
        `1 = Sem ID 1 (Check-in amigável)\n` +
        `2 = Sem ID 2 (Prova social e FOMO)\n` +
        `3 = Demo 1 (Check-in de Instalação no Chrome)\n` +
        `4 = Demo 2 (Desafio & Validação Sinais M1)\n` +
        `5 = Demo 3 (Ponte Real / Depósito $15 USD)\n` +
        `6 = Demo 4 (Último Chamado / Reativação Dura)`;
      return api.sendMessage(chatId, msg);
    }

    if (cmd === '/disparar_followup' && isAdmin) {
      const [targetChat, typeNum] = arg.split(' ');
      const targetUser = db.getUser(targetChat);
      if (!targetUser) {
        return api.sendMessage(chatId, `❌ Usuário com Chat ID <code>${targetChat}</code> não encontrado no banco de dados.`);
      }
      const name = targetUser.firstName || 'Trader';
      const brokerId = targetUser.brokerId || '849302';

      if (typeNum === '1') {
        const text = mensagens.followUpSemId1(name, config.brokerAffiliateUrl);
        await sendHumanPhoto(targetChat, config.proofPhotoPath, text, { reply_markup: { inline_keyboard: mensagens.botoesFollowUpSemId1(config.brokerAffiliateUrl) } });
        return api.sendMessage(chatId, `✅ Follow-up 1 (Sem ID + Foto de 4 Vitórias) disparado para ${name}!`);
      } else if (typeNum === '2') {
        const text = mensagens.followUpSemId2(name, config.brokerAffiliateUrl);
        await sendHumanMessage(targetChat, text, { reply_markup: { inline_keyboard: mensagens.botoesFollowUpSemId2(config.brokerAffiliateUrl) } });
        return api.sendMessage(chatId, `✅ Follow-up 2 (Sem ID - Filtro de Ejecutores) disparado para ${name}!`);
      } else if (typeNum === '3') {
        const text = mensagens.followUpDemoInstalacao(name);
        await sendHumanMessage(targetChat, text, { reply_markup: { inline_keyboard: mensagens.botoesFollowUpDemoInstalacao } });
        return api.sendMessage(chatId, `✅ Follow-up Demo 1 (Micro-Vitória Demo) disparado para ${name}!`);
      } else if (typeNum === '4') {
        const text = mensagens.followUpDemoTeste(name);
        await sendHumanMessage(targetChat, text, { reply_markup: { inline_keyboard: mensagens.botoesFollowUpDemoTeste(config.brokerAffiliateUrl) } });
        return api.sendMessage(chatId, `✅ Follow-up Demo 2 (Dinheiro Fantasma) disparado para ${name}!`);
      } else if (typeNum === '5') {
        const text = mensagens.followUpDemoConversaoReal(name, brokerId, config.brokerAffiliateUrl);
        await sendHumanMessage(targetChat, text, { reply_markup: { inline_keyboard: mensagens.botoesFollowUpDemoConversaoReal(config.brokerAffiliateUrl) } });
        return api.sendMessage(chatId, `✅ Follow-up Demo 3 (Prova de Saque Carlos $15->$38) disparado para ${name}!`);
      } else if (typeNum === '6') {
        const text = mensagens.followUpDemoUltimoLlamado(name, brokerId, config.brokerAffiliateUrl);
        await sendHumanMessage(targetChat, text, { reply_markup: { inline_keyboard: mensagens.botoesFollowUpDemoUltimoLlamado(config.brokerAffiliateUrl) } });
        return api.sendMessage(chatId, `✅ Follow-up Demo 4 (Reativação Dura) disparado para ${name}!`);
      } else {
        return api.sendMessage(chatId, 'Uso correto: <code>/disparar_followup &lt;CHAT_ID&gt; &lt;1|2|3|4|5|6&gt;</code>');
      }
    }

    if (cmd === '/liberar' && isAdmin) {
      if (!arg) {
        return api.sendMessage(chatId, 'Uso: <code>/liberar &lt;ID_DA_CORRETORA&gt; [demo|real]</code>');
      }
      const [targetId, mode] = arg.split(' ');
      const targetUser = db.findUserByBrokerId(targetId) || db.getUser(targetId);
      if (!targetUser) {
        return api.sendMessage(chatId, `❌ Nenhum usuário com o ID ou Chat <code>${targetId}</code> foi encontrado.`);
      }
      const plan = (mode && mode.toLowerCase() === 'demo') ? 'DEMO VIP' : 'VIP REAL (2 MESES)';
      await api.sendMessage(chatId, `⚡ Forçando liberação manual (${plan}) para ${targetUser.firstName} (ID: ${targetId})...`);
      await deliverAccessToUser(targetUser.chatId, targetUser.firstName, targetId, plan);
      return api.sendMessage(chatId, `✅ Liberação (${plan}) concluída com sucesso!`);
    }

    if (cmd === '/simular' && isAdmin) {
      if (!arg) {
        return api.sendMessage(chatId, 'Uso: <code>/simular &lt;mensagem que chega no canal&gt;</code>\nExemplo: <code>/simular Depósito aprovado ID: 123456 Valor: R$ 50,00</code>');
      }
      const parsed = parseChannelNotification(arg);
      await api.sendMessage(
        chatId,
        `🧪 <b>Resultado do Teste de Leitura:</b>\n` +
        `• <b>Tipo:</b> ${parsed.type}\n` +
        `• <b>ID Detectado:</b> ${parsed.brokerId || 'Não detectado'}\n` +
        `• <b>Valor:</b> ${parsed.amount || 'Não detectado'}\n` +
        `• <b>E-mail:</b> ${parsed.email || 'Não detectado'}`
      );
      // Processa o evento simulado como se viesse do canal
      await handleChannelPost({ text: arg });
      return;
    }
  }

  // 2. INÍCIO DA CONVERSA (/start ou Saudações em Espanhol/Português)
  const isGreeting = text === '/start' || /^(hola|buenas|buenos d[ií]as|buenas tardes|buenas noches|qu[eé] tal|saludos|empezar|iniciar|acceso|quiero|link|oi|ol[aá]|opa|come[çc]ar)/i.test(text);

  if (isGreeting || !user.step || user.step === 'GREETING') {
    db.saveUser(chatId, { step: 'AWAITING_REGISTRATION_CHOICE' });
    const welcome = mensagens.boasVindas(firstName);
    const keyboard = {
      inline_keyboard: mensagens.botoesBoasVindas
    };
    return sendHumanMessage(chatId, welcome, { reply_markup: keyboard });
  }

  // 3. FLUXO DE VERIFICAÇÃO DE ID DA CORRETORA (MODELO EM 2 ETAPAS)
  // Tenta extrair o ID numérico digitado pelo cliente (ex: "meu id é 849302" ou "849302")
  const idMatch = text.match(/\b([0-9]{4,12})\b/);
  if (idMatch) {
    const brokerId = idMatch[1];
    db.saveUser(chatId, {
      brokerId,
      step: 'CHECKING_ID'
    });

    await sendHumanMessage(chatId, mensagens.consultandoSistema(brokerId), {}, 1600);

    // Verifica se já temos registro de depósito no banco de dados do canal
    const hasDeposit = db.hasDeposit(brokerId);

    if (hasDeposit) {
      // Cliente já depositou -> Comemora confirmação de depósito e entrega acesso VIP Real imediatamente!
      const depositEvent = db.data.channelEvents.find(e => e.type === 'DEPOSITO' && String(e.brokerId).trim() === brokerId);
      const amountStr = depositEvent?.amount ? ` de ${depositEvent.amount}` : '';
      await sendHumanMessage(
        chatId,
        `¡Encontré tu depósito${amountStr} confirmado perfectamente con el ID <code>${brokerId}</code>, ${firstName}! 👏🎉\n\n` +
        `¡Tu cuenta ya está 100% activa en el broker con Status VIP Real!`,
        {},
        1600
      );
      return deliverAccessToUser(chatId, firstName, brokerId, 'VIP REAL (2 MESES)');
    }

    // Cliente informou o ID -> MODELO DE ATIVAÇÃO EM 2 ETAPAS:
    // Não bloqueia! Confirma registro com entusiasmo e libera IMEDIATAMENTE a ferramenta para teste Demo!
    await sendHumanMessage(chatId, mensagens.confirmacaoIdLiberacaoDemo(firstName, brokerId), {}, 1600);
    return deliverAccessToUser(chatId, firstName, brokerId, 'DEMO VIP');
  }

  // 4. DETECÇÃO INTELIGENTE DE DÚVIDAS E OBJEÇÕES (PALAVRAS-CHAVE)
  const isMinimo = /(m[ií]nimo|minimo|poco|plata inicial|saldo inicial|cu[aá]nto (es|tengo|hay que|se) (el )?m[ií]nimo|con cu[aá]nto empiezo|con cuanto empiezo|cuanto dinero|cu[aá]nto dinero)/i.test(text);
  if (isMinimo) {
    return sendHumanMessage(
      chatId,
      mensagens.dudaMinimo(firstName),
      { reply_markup: { inline_keyboard: mensagens.botoesDudaMinimo } },
      1800
    );
  }

  const isMetodos = /(m[eé]todos? de pago|c[oó]mo (pago|depositar|se deposita|fondear)|como pagar|tarjeta|transferencia|pix|spei|pse|oxxo|binance|usdt|cripto|banco|efectivo)/i.test(text);
  if (isMetodos) {
    return sendHumanMessage(
      chatId,
      mensagens.dudaMetodos(firstName),
      { reply_markup: { inline_keyboard: mensagens.botoesDudaMetodos } },
      1800
    );
  }

  const isVitalicio = /(es gratis|gratuito|cu[aá]nto cuesta|cu[aá]nto vale|cuanto cuesta|cuanto vale|precio|costo|mensualidad|suscripci[oó]n|vitalicio|por qu[eé] es gratis|por que es gratis|cobran)/i.test(text);
  if (isVitalicio) {
    return sendHumanMessage(
      chatId,
      mensagens.dudaVitalicio(firstName),
      { reply_markup: { inline_keyboard: mensagens.botoesDudaVitalicio } },
      1800
    );
  }

  const isDispositivos = /(celular|m[oó]vil|movil|tel[eé]fono|telefono|computador(a)?|laptop|pc|iphone|android|dispositivo|app\b)/i.test(text);
  if (isDispositivos) {
    return sendHumanMessage(
      chatId,
      mensagens.dudaDispositivos(firstName),
      { reply_markup: { inline_keyboard: mensagens.botoesDudaDispositivos } },
      1800
    );
  }

  const isRetiros = /(retir(ar|o|os)|sacar plata|sacar dinero|segur(o|a)|confiable|estafa|fraude|riesgo)/i.test(text);
  if (isRetiros) {
    return sendHumanMessage(
      chatId,
      mensagens.dudaRetiros(firstName),
      { reply_markup: { inline_keyboard: mensagens.botoesDudaRetiros } },
      1800
    );
  }

  const isDondeId = /(d[oó]nde est[aá]|donde esta|d[oó]nde encuentro|donde encuentro|cu[aá]l es mi id|cual es mi id|como veo mi id|c[oó]mo veo mi id)/i.test(text);
  if (isDondeId) {
    return sendHumanMessage(
      chatId,
      mensagens.dudaDondeId(),
      { reply_markup: { inline_keyboard: mensagens.botoesDudaDondeId } },
      1600
    );
  }

  const isDudaGeral = /(duda(s)?|pregunta(s)?|ayuda|faq|no entiendo|explicame|expl[ií]came|consulta)\b/i.test(text);
  if (isDudaGeral) {
    return sendHumanMessage(
      chatId,
      mensagens.menuDudas(firstName),
      { reply_markup: { inline_keyboard: mensagens.botoesMenuDudas } },
      1600
    );
  }

  // 5. RESPOSTA CONVERSACIONAL PADRÃO (SE NÃO DIGITOU UM ID NEM UMA DÚVIDA)
  const defaultReply = mensagens.respostaPadraoSemId(firstName, config.brokerAffiliateUrl);
  return sendHumanMessage(
    chatId,
    defaultReply,
    {
      reply_markup: {
        inline_keyboard: [
          [{ text: '🔗 Registrarme en el Broker', url: config.brokerAffiliateUrl }],
          [{ text: '❓ Tengo una duda / Preguntas', callback_data: 'menu_dudas' }]
        ]
      }
    },
    1800
  );
}

/**
 * Trata cliques em botões inline (callbacks)
 */
async function handleCallbackQuery(query) {
  const chatId = String(query.message.chat.id);
  const data = query.data;
  const firstName = query.from?.first_name || 'Trader';

  try {
    await api.answerCallbackQuery(query.id);
  } catch (_) {
    // Ignora silenciosamente se o botão for antigo/expirado
  }

  db.saveUser(chatId, {
    firstName,
    lastInteractionAt: new Date().toISOString()
  });

  if (data === 'need_link') {
    db.saveUser(chatId, { step: 'AWAITING_ID' });
    const linkMsg = mensagens.enviarLinkCadastro(firstName, config.brokerAffiliateUrl);
    const keyboard = { inline_keyboard: mensagens.botoesLinkCadastro };
    return sendHumanMessage(chatId, linkMsg, { reply_markup: keyboard }, 1800);
  }

  if (data === 'has_account') {
    db.saveUser(chatId, { step: 'AWAITING_ID' });
    const idPromptMsg = mensagens.pedirIdCorretora(firstName);
    const keyboard = { inline_keyboard: mensagens.botoesPedirId };
    return sendHumanMessage(chatId, idPromptMsg, { reply_markup: keyboard }, 1600);
  }

  // --- DUDAS / FAQ CALLBACKS ---
  if (data === 'menu_dudas' || data === 'faq_volver') {
    const faqMsg = mensagens.menuDudas(firstName);
    const keyboard = { inline_keyboard: mensagens.botoesMenuDudas };
    return sendHumanMessage(chatId, faqMsg, { reply_markup: keyboard }, 1400);
  }

  if (data === 'faq_minimo') {
    const msg = mensagens.dudaMinimo(firstName);
    const keyboard = { inline_keyboard: mensagens.botoesDudaMinimo };
    return sendHumanMessage(chatId, msg, { reply_markup: keyboard }, 1600);
  }

  if (data === 'faq_metodos') {
    const msg = mensagens.dudaMetodos(firstName);
    const keyboard = { inline_keyboard: mensagens.botoesDudaMetodos };
    return sendHumanMessage(chatId, msg, { reply_markup: keyboard }, 1600);
  }

  if (data === 'faq_vitalicio') {
    const msg = mensagens.dudaVitalicio(firstName);
    const keyboard = { inline_keyboard: mensagens.botoesDudaVitalicio };
    return sendHumanMessage(chatId, msg, { reply_markup: keyboard }, 1600);
  }

  if (data === 'faq_dispositivos') {
    const msg = mensagens.dudaDispositivos(firstName);
    const keyboard = { inline_keyboard: mensagens.botoesDudaDispositivos };
    return sendHumanMessage(chatId, msg, { reply_markup: keyboard }, 1600);
  }

  if (data === 'faq_retiros') {
    const msg = mensagens.dudaRetiros(firstName);
    const keyboard = { inline_keyboard: mensagens.botoesDudaRetiros };
    return sendHumanMessage(chatId, msg, { reply_markup: keyboard }, 1600);
  }

  if (data === 'faq_donde_id') {
    const msg = mensagens.dudaDondeId();
    const keyboard = { inline_keyboard: mensagens.botoesDudaDondeId };
    return sendHumanMessage(chatId, msg, { reply_markup: keyboard }, 1600);
  }

  // Botão "Ya deposité / Consultar sistema"
  if (data === 'check_deposit_now') {
    const user = db.getUser(chatId);
    if (!user || !user.brokerId) {
      const askId = mensagens.pedirIdCorretora(firstName);
      const keyboard = { inline_keyboard: mensagens.botoesPedirId };
      return sendHumanMessage(chatId, askId, { reply_markup: keyboard }, 1600);
    }

    await sendHumanMessage(chatId, mensagens.consultandoSistema(user.brokerId), {}, 1500);

    const hasDeposit = db.hasDeposit(user.brokerId);
    if (hasDeposit) {
      const depositEvent = db.data.channelEvents.find(e => e.type === 'DEPOSITO' && String(e.brokerId).trim() === String(user.brokerId).trim());
      const amount = depositEvent?.amount || 'confirmado';
      await sendHumanMessage(
        chatId,
        mensagens.depositoDetectadoProativo(firstName, amount),
        {},
        1500
      );
      return upgradeToRealVip(chatId, firstName, user.brokerId, amount);
    }

    const pendingMsg = mensagens.depositoAindaNaoConsta(firstName, user.brokerId);
    const keyboard = {
      inline_keyboard: [
        [{ text: '🔄 Volver a consultar', callback_data: 'check_deposit_now' }],
        [{ text: '💳 Ver métodos de pago', callback_data: 'faq_metodos' }],
        [{ text: '❓ Tengo una duda', callback_data: 'menu_dudas' }]
      ]
    };
    return sendHumanMessage(chatId, pendingMsg, { reply_markup: keyboard }, 1800);
  }

  // --- CALLBACKS DO FUNIL EM 2 ETAPAS (DEMO ➔ REAL) ---
  if (data === 'faq_como_real') {
    const msg = mensagens.dudaComoReal(firstName);
    const keyboard = { inline_keyboard: mensagens.botoesDudaComoReal };
    return sendHumanMessage(chatId, msg, { reply_markup: keyboard }, 1600);
  }

  if (data === 'faq_instalar') {
    const msg = mensagens.dudaInstalacion();
    const keyboard = {
      inline_keyboard: [
        [{ text: '✅ Ya la tengo instalada', callback_data: 'demo_instalada' }],
        [{ text: '💳 Activar Cuenta Real ($15 USD)', callback_data: 'faq_como_real' }],
        [{ text: '⬅️ Volver', callback_data: 'menu_dudas' }]
      ]
    };
    return sendHumanMessage(chatId, msg, { reply_markup: keyboard }, 1600);
  }

  if (data === 'demo_instalada') {
    const msg = mensagens.respostaDemoInstalada(firstName);
    const keyboard = {
      inline_keyboard: [
        [{ text: '🎯 Ya la probé en Demo', callback_data: 'demo_probada' }],
        [{ text: '💳 Pasar a Cuenta Real ($15 USD)', callback_data: 'faq_como_real' }]
      ]
    };
    return sendHumanMessage(chatId, msg, { reply_markup: keyboard }, 1600);
  }

  if (data === 'demo_probada') {
    const msg = mensagens.respostaDemoProbada(firstName);
    const keyboard = {
      inline_keyboard: [
        [{ text: '💳 Activar Cuenta Real ($15 USD)', callback_data: 'faq_como_real' }],
        [{ text: '💵 ¿Cuál es el monto mínimo?', callback_data: 'faq_minimo' }],
        [{ text: '🔄 Ya deposité (Verificar)', callback_data: 'check_deposit_now' }]
      ]
    };
    return sendHumanMessage(chatId, msg, { reply_markup: keyboard }, 1600);
  }

  if (data === 'demo_tarde') {
    const msg = mensagens.respostaDemoTarde(firstName);
    const keyboard = {
      inline_keyboard: [
        [{ text: '📖 Ver guía de instalación', callback_data: 'faq_instalar' }],
        [{ text: '❓ Centro de Dudas', callback_data: 'menu_dudas' }]
      ]
    };
    return sendHumanMessage(chatId, msg, { reply_markup: keyboard }, 1600);
  }

  if (data === 'ver_comunidad') {
    const msg = mensagens.resultadosComunidad(firstName);
    const keyboard = {
      inline_keyboard: [
        [{ text: '💳 Depositar $15 y Activar VIP 60 Días', url: config.brokerAffiliateUrl }],
        [{ text: '🔄 Ya deposité (Verificar)', callback_data: 'check_deposit_now' }],
        [{ text: '⬅️ Volver', callback_data: 'faq_volver' }]
      ]
    };
    return sendHumanMessage(chatId, msg, { reply_markup: keyboard }, 1600);
  }
}

/**
 * Motor autônomo de Follow-Up Estratégico (Funil em 2 Etapas)
 * Executa periodicamente sem travar o bot e recupera leads em todas as fases:
 * - Leads sem ID: estímulo de cadastro e prova social.
 * - Leads com Demo ativa: suporte de instalação, validação de sinais e ponte para Conta Real ($15 USD).
 */
async function checkAndSendFollowUps() {
  try {
    const now = Date.now();
    const MS_IN_MINUTE = 60 * 1000;
    const MS_IN_HOUR = 60 * MS_IN_MINUTE;

    for (const user of Object.values(db.data.users)) {
      try {
        // 1. Clientes com status VIP Real já depositaram, não recebem follow-up
        if (user.status === 'VIP_REAL' || (user.licensePlan === 'VITALICIO VIP' && db.hasDeposit(user.brokerId))) continue;

        const userChatId = user.chatId;
        if (!userChatId) continue;

        if (!user.followUps) {
          user.followUps = {};
        }

        const createdAt = new Date(user.createdAt || now).getTime();
        const lastInteraction = new Date(user.lastInteractionAt || user.updatedAt || user.createdAt || now).getTime();
        const idleTimeMs = now - lastInteraction;

        // CASO A: Lead iniciou mas ainda não enviou o ID
        if (!user.brokerId) {
          // Follow-up A1: Entre 35 min e 24h de inatividade
          if (idleTimeMs >= 35 * MS_IN_MINUTE && idleTimeMs < 24 * MS_IN_HOUR && !user.followUps.noId_1) {
            console.log(`[FOLLOW-UP] Enviando Follow-up 1 (Sem ID + Foto de 4 Vitórias) para ${user.firstName} (Chat: ${userChatId})`);
            user.followUps.noId_1 = new Date().toISOString();
            db.saveUser(userChatId, { followUps: user.followUps });

            const text = mensagens.followUpSemId1(user.firstName || 'amigo', config.brokerAffiliateUrl);
            const keyboard = { inline_keyboard: mensagens.botoesFollowUpSemId1(config.brokerAffiliateUrl) };
            await sendHumanPhoto(userChatId, config.proofPhotoPath, text, { reply_markup: keyboard });
            continue;
          }

          // Follow-up A2: 4h após Follow-up A1 e menos de 48h desde o início (Filtro de Ejecutores)
          if (user.followUps.noId_1 && !user.followUps.noId_2) {
            const timeSinceFu1 = now - new Date(user.followUps.noId_1).getTime();
            if (timeSinceFu1 >= 4 * MS_IN_HOUR && (now - createdAt) < 48 * MS_IN_HOUR) {
              console.log(`[FOLLOW-UP] Enviando Follow-up 2 (Sem ID - Filtro de Ejecutores) para ${user.firstName} (Chat: ${userChatId})`);
              user.followUps.noId_2 = new Date().toISOString();
              db.saveUser(userChatId, { followUps: user.followUps });

              const text = mensagens.followUpSemId2(user.firstName || 'amigo', config.brokerAffiliateUrl);
              const keyboard = { inline_keyboard: mensagens.botoesFollowUpSemId2(config.brokerAffiliateUrl) };
              await sendHumanMessage(userChatId, text, { reply_markup: keyboard });
              continue;
            }
          }
        }

        // CASO B: Lead recebeu a ferramenta (DEMO_ACTIVE) e ainda não realizou o depósito na Conta Real
        if (user.brokerId && (user.status === 'DEMO_ACTIVE' || user.status === 'WAITING_DEPOSIT')) {
          if (db.hasDeposit(user.brokerId)) {
            // Se já tem depósito no canal, realiza o upgrade VIP Real imediatamente
            const depositEvent = db.data.channelEvents.find(e => e.type === 'DEPOSITO' && String(e.brokerId).trim() === String(user.brokerId).trim());
            const amount = depositEvent?.amount || 'confirmado';
            await sendHumanMessage(
              userChatId,
              mensagens.depositoDetectadoProativo(user.firstName || 'amigo(a)', amount),
              {},
              1500
            );
            await upgradeToRealVip(userChatId, user.firstName, user.brokerId, amount);
            continue;
          }

          const demoActiveSince = new Date(user.demoActivatedAt || user.activatedAt || user.waitingDepositSince || user.createdAt || lastInteraction).getTime();
          const demoTimeMs = now - demoActiveSince;

          // Follow-up B1 (Instalação): Entre 45 min e 24h
          if (demoTimeMs >= 45 * MS_IN_MINUTE && demoTimeMs < 24 * MS_IN_HOUR && !user.followUps.demo_1 && !user.followUps.noDeposit_1) {
            console.log(`[FOLLOW-UP] Enviando Follow-up Demo 1 (Instalação) para ${user.firstName} (ID: ${user.brokerId})`);
            user.followUps.demo_1 = new Date().toISOString();
            db.saveUser(userChatId, { followUps: user.followUps });

            const text = mensagens.followUpDemoInstalacao(user.firstName || 'amigo');
            const keyboard = { inline_keyboard: mensagens.botoesFollowUpDemoInstalacao };
            await sendHumanMessage(userChatId, text, { reply_markup: keyboard });
            continue;
          }

          // Follow-up B2 (Validação Sinais Demo): 3h após Follow-up B1
          const lastFu1 = user.followUps.demo_1 || user.followUps.noDeposit_1;
          if (lastFu1 && !user.followUps.demo_2 && !user.followUps.noDeposit_2) {
            const timeSinceFu1 = now - new Date(lastFu1).getTime();
            if (timeSinceFu1 >= 3 * MS_IN_HOUR && (now - createdAt) < 48 * MS_IN_HOUR) {
              console.log(`[FOLLOW-UP] Enviando Follow-up Demo 2 (Validação Sinais) para ${user.firstName} (ID: ${user.brokerId})`);
              user.followUps.demo_2 = new Date().toISOString();
              db.saveUser(userChatId, { followUps: user.followUps });

              const text = mensagens.followUpDemoTeste(user.firstName || 'amigo');
              const keyboard = { inline_keyboard: mensagens.botoesFollowUpDemoTeste(config.brokerAffiliateUrl) };
              await sendHumanMessage(userChatId, text, { reply_markup: keyboard });
              continue;
            }
          }

          // Follow-up B3 (Conversão para Conta Real / $15 USD): 12h após Follow-up B2
          const lastFu2 = user.followUps.demo_2 || user.followUps.noDeposit_2;
          if (lastFu2 && !user.followUps.demo_3) {
            const timeSinceFu2 = now - new Date(lastFu2).getTime();
            if (timeSinceFu2 >= 12 * MS_IN_HOUR && (now - createdAt) < 72 * MS_IN_HOUR) {
              console.log(`[FOLLOW-UP] Enviando Follow-up Demo 3 (Conversão Real FTD) para ${user.firstName} (ID: ${user.brokerId})`);
              user.followUps.demo_3 = new Date().toISOString();
              db.saveUser(userChatId, { followUps: user.followUps });

              const text = mensagens.followUpDemoConversaoReal(user.firstName || 'amigo', user.brokerId, config.brokerAffiliateUrl);
              const keyboard = { inline_keyboard: mensagens.botoesFollowUpDemoConversaoReal(config.brokerAffiliateUrl) };
              await sendHumanMessage(userChatId, text, { reply_markup: keyboard });
              continue;
            }
          }

          // Follow-up B4 (Último Chamado / Bônus VIP): 24h após Follow-up B3
          if (user.followUps.demo_3 && !user.followUps.demo_4) {
            const timeSinceFu3 = now - new Date(user.followUps.demo_3).getTime();
            if (timeSinceFu3 >= 24 * MS_IN_HOUR && (now - createdAt) < 96 * MS_IN_HOUR) {
              console.log(`[FOLLOW-UP] Enviando Follow-up Demo 4 (Último Chamado) para ${user.firstName} (ID: ${user.brokerId})`);
              user.followUps.demo_4 = new Date().toISOString();
              db.saveUser(userChatId, { followUps: user.followUps });

              const text = mensagens.followUpDemoUltimoLlamado(user.firstName || 'amigo', user.brokerId, config.brokerAffiliateUrl);
              const keyboard = { inline_keyboard: mensagens.botoesFollowUpDemoUltimoLlamado(config.brokerAffiliateUrl) };
              await sendHumanMessage(userChatId, text, { reply_markup: keyboard });
              continue;
            }
          }
        }
      } catch (userErr) {
        console.error(`[FOLLOW-UP] Erro no usuário ${user.chatId}: ${userErr.message}`);
      }
    }
  } catch (err) {
    console.error(`[FOLLOW-UP] Erro no ciclo de follow-up: ${err.message}`);
  }
}

/**
 * Loop principal de escuta (Long Polling)
 */
async function startBot() {
  console.log('============================================================');
  console.log(`🤖 BOT INFILTRUS INICIADO COM SUCESSO!`);
  console.log(`👤 Persona Ativa: ${config.personaName} (${config.personaRole})`);
  console.log(`📁 Banco de Dados: bot-telegram/data/store.json`);
  console.log('============================================================\n');

  try {
    const me = await api.getMe();
    console.log(`Conectado ao Telegram como @${me.username} (${me.first_name})`);
  } catch (err) {
    console.error('Falha ao conectar à API do Telegram:', err.message);
    process.exit(1);
  }

  // Inicia o motor autônomo de verificação de follow-ups a cada 2 minutos
  setTimeout(checkAndSendFollowUps, 10 * 1000); // Primeira checagem após 10s
  setInterval(checkAndSendFollowUps, 2 * 60 * 1000); // Repete a cada 2 minutos

  let offset = 0;

  while (true) {
    try {
      const updates = await api.getUpdates(offset, 25);
      for (const update of updates) {
        offset = update.update_id + 1;

        // Post vindo do canal de notificações
        if (update.channel_post) {
          try {
            console.log(`[CANAL] Novo post recebido no canal (ID: ${update.channel_post.chat?.id})`);
            await handleChannelPost(update.channel_post);
          } catch (err) {
            console.error('[ERRO] Falha ao processar post do canal:', err.message);
          }
        }

        // Mensagem privada de usuário
        if (update.message && update.message.chat.type === 'private') {
          try {
            const sender = update.message.from ? `${update.message.from.first_name} (@${update.message.from.username || 'sem_user'})` : 'Usuário';
            console.log(`[MSG] Recebida de ${sender} (Chat: ${update.message.chat.id}): "${update.message.text || '[mídia/ação]'}"`);
            await handlePrivateMessage(update.message);
          } catch (err) {
            console.error('[ERRO] Falha ao processar mensagem privada:', err.message);
          }
        }

        // Clique em botão interativo
        if (update.callback_query) {
          try {
            const sender = update.callback_query.from ? `${update.callback_query.from.first_name} (@${update.callback_query.from.username || 'sem_user'})` : 'Usuário';
            console.log(`[BOTÃO] Clique de ${sender} (Chat: ${update.callback_query.message?.chat?.id}): "${update.callback_query.data}"`);
            await handleCallbackQuery(update.callback_query);
          } catch (err) {
            console.error('[ERRO] Falha ao processar clique em botão:', err.message);
          }
        }
      }
    } catch (err) {
      console.error('[POLLING] Erro na requisição:', err.message);
      // Pausa breve antes de tentar novamente para não sobrecarregar
      await new Promise(r => setTimeout(r, 4000));
    }
  }
}

// Proteção contra falhas inesperadas que poderiam encerrar o processo
process.on('uncaughtException', (err) => {
  console.error('[ERRO NÃO TRATADO]', err.message);
});

process.on('unhandledRejection', (reason) => {
  console.error('[PROMISE NÃO TRATADA]', reason);
});

startBot();
