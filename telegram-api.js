/**
 * CLIENTE NATIVO DA API DO TELEGRAM BOT
 * Utiliza o fetch nativo do Node.js (sem dependências externas vulneráveis).
 */

import fs from 'node:fs';
import path from 'node:path';

export class TelegramApi {
  constructor(token) {
    if (!token) {
      throw new Error('[TelegramApi] Token do bot não foi informado.');
    }
    this.token = token.trim();
    this.baseUrl = `https://api.telegram.org/bot${this.token}`;
  }

  async call(method, payload = {}) {
    const url = `${this.baseUrl}/${method}`;
    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (!data.ok) {
        throw new Error(data.description || `Falha na chamada a ${method}`);
      }
      return data.result;
    } catch (err) {
      console.error(`[TelegramApi] Erro ao chamar ${method}:`, err.message);
      throw err;
    }
  }

  async getMe() {
    return this.call('getMe');
  }

  async getUpdates(offset = 0, timeout = 25) {
    return this.call('getUpdates', {
      offset,
      timeout,
      allowed_updates: ['message', 'callback_query', 'channel_post']
    });
  }

  async sendMessage(chatId, text, options = {}) {
    return this.call('sendMessage', {
      chat_id: chatId,
      text,
      parse_mode: options.parse_mode || 'HTML',
      reply_markup: options.reply_markup || undefined,
      disable_web_page_preview: options.disable_web_page_preview ?? false
    });
  }

  async sendChatAction(chatId, action = 'typing') {
    try {
      return await this.call('sendChatAction', {
        chat_id: chatId,
        action
      });
    } catch {
      // Ignora erro de chat action se usuário bloqueou ou conversa expirou
      return null;
    }
  }

  async answerCallbackQuery(callbackQueryId, text = '') {
    return this.call('answerCallbackQuery', {
      callback_query_id: callbackQueryId,
      text: text || undefined
    });
  }

  async sendDocument(chatId, filePath, caption = '', options = {}) {
    if (!fs.existsSync(filePath)) {
      throw new Error(`Arquivo não encontrado para envio: ${filePath}`);
    }

    const url = `${this.baseUrl}/sendDocument`;
    const fileName = path.basename(filePath);
    const fileBuffer = fs.readFileSync(filePath);
    const fileBlob = new Blob([fileBuffer]);

    const formData = new FormData();
    formData.append('chat_id', String(chatId));
    formData.append('document', fileBlob, fileName);
    if (caption) {
      formData.append('caption', caption);
      formData.append('parse_mode', options.parse_mode || 'HTML');
    }
    if (options.reply_markup) {
      formData.append('reply_markup', typeof options.reply_markup === 'string' ? options.reply_markup : JSON.stringify(options.reply_markup));
    }

    try {
      const res = await fetch(url, {
        method: 'POST',
        body: formData
      });
      const data = await res.json();
      if (!data.ok) {
        throw new Error(data.description || 'Falha ao enviar documento');
      }
      return data.result;
    } catch (err) {
      console.error('[TelegramApi] Erro ao enviar documento:', err.message);
      throw err;
    }
  }

  async sendPhoto(chatId, filePath, caption = '', options = {}) {
    if (!fs.existsSync(filePath)) {
      throw new Error(`Arquivo de imagem não encontrado para envio: ${filePath}`);
    }

    const url = `${this.baseUrl}/sendPhoto`;
    const fileName = path.basename(filePath);
    const fileBuffer = fs.readFileSync(filePath);
    const fileBlob = new Blob([fileBuffer]);

    const formData = new FormData();
    formData.append('chat_id', String(chatId));
    formData.append('photo', fileBlob, fileName);
    if (caption) {
      formData.append('caption', caption);
      formData.append('parse_mode', options.parse_mode || 'HTML');
    }
    if (options.reply_markup) {
      formData.append('reply_markup', typeof options.reply_markup === 'string' ? options.reply_markup : JSON.stringify(options.reply_markup));
    }

    try {
      const res = await fetch(url, {
        method: 'POST',
        body: formData
      });
      const data = await res.json();
      if (!data.ok) {
        throw new Error(data.description || 'Falha ao enviar foto');
      }
      return data.result;
    } catch (err) {
      console.error('[TelegramApi] Erro ao enviar foto:', err.message);
      throw err;
    }
  }
}
