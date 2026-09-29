/**
 * BANCO DE DADOS ATÔMICO E PERSISTENTE EM JSON
 * Armazena usuários, eventos capturados do canal e licenças emitidas com segurança.
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_DIR = path.join(__dirname, 'data');
const DB_PATH = path.join(DATA_DIR, 'store.json');
const TEMP_DB_PATH = path.join(DATA_DIR, 'store.tmp.json');

const INITIAL_STATE = {
  users: {},            // { [chatId]: { chatId, firstName, username, brokerId, status, licenseCode, createdAt, ... } }
  brokerToChat: {},     // { [brokerId]: chatId }
  channelEvents: [],    // [ { timestamp, rawText, type: 'CADASTRO'|'DEPOSITO'|'OUTRO', brokerId, email, amount, isHandled } ]
  licenses: []          // [ { brokerId, chatId, code, holder, plan, durationDays, expiresAtIso, createdAtIso } ]
};

class Database {
  constructor() {
    this.data = { ...INITIAL_STATE };
    this.init();
  }

  init() {
    try {
      if (!fs.existsSync(DATA_DIR)) {
        fs.mkdirSync(DATA_DIR, { recursive: true });
      }
      if (fs.existsSync(DB_PATH)) {
        const raw = fs.readFileSync(DB_PATH, 'utf8');
        this.data = JSON.parse(raw);
      } else {
        this.saveSync();
      }
    } catch (err) {
      console.error('[DB] Erro ao carregar banco de dados:', err);
      this.data = { ...INITIAL_STATE };
    }
  }

  saveSync() {
    try {
      const json = JSON.stringify(this.data, null, 2);
      fs.writeFileSync(TEMP_DB_PATH, json, 'utf8');
      fs.renameSync(TEMP_DB_PATH, DB_PATH);
    } catch (err) {
      console.error('[DB] Erro ao persistir banco de dados:', err);
    }
  }

  getUser(chatId) {
    return this.data.users[String(chatId)] || null;
  }

  saveUser(chatId, fields = {}) {
    const idStr = String(chatId);
    const existing = this.data.users[idStr] || {
      chatId: idStr,
      status: 'START',
      step: 'GREETING',
      createdAt: new Date().toISOString()
    };

    const updated = {
      ...existing,
      ...fields,
      updatedAt: new Date().toISOString()
    };

    this.data.users[idStr] = updated;

    if (updated.brokerId) {
      const cleanBrokerId = String(updated.brokerId).trim();
      this.data.brokerToChat[cleanBrokerId] = idStr;
    }

    this.saveSync();
    return updated;
  }

  findUserByBrokerId(brokerId) {
    if (!brokerId) return null;
    const cleanId = String(brokerId).trim();
    const chatId = this.data.brokerToChat[cleanId];
    if (chatId && this.data.users[chatId]) {
      return this.data.users[chatId];
    }
    // Fallback: busca por varredura
    for (const user of Object.values(this.data.users)) {
      if (user.brokerId && String(user.brokerId).trim() === cleanId) {
        return user;
      }
    }
    return null;
  }

  recordChannelEvent(event = {}) {
    const record = {
      id: `evt-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      timestamp: new Date().toISOString(),
      rawText: event.rawText || '',
      type: event.type || 'OUTRO', // 'CADASTRO', 'DEPOSITO', 'OUTRO'
      brokerId: event.brokerId ? String(event.brokerId).trim() : null,
      email: event.email || null,
      amount: event.amount || null,
      isHandled: Boolean(event.isHandled)
    };

    this.data.channelEvents.unshift(record);
    // Limita histórico a 500 eventos para não pesar
    if (this.data.channelEvents.length > 500) {
      this.data.channelEvents.length = 500;
    }

    this.saveSync();
    return record;
  }

  hasDeposit(brokerId) {
    if (!brokerId) return false;
    const cleanId = String(brokerId).trim();
    return this.data.channelEvents.some(
      evt => evt.type === 'DEPOSITO' && evt.brokerId && String(evt.brokerId).trim() === cleanId
    );
  }

  hasRegistration(brokerId) {
    if (!brokerId) return false;
    const cleanId = String(brokerId).trim();
    return this.data.channelEvents.some(
      evt => (evt.type === 'CADASTRO' || evt.type === 'DEPOSITO') && evt.brokerId && String(evt.brokerId).trim() === cleanId
    );
  }

  recordLicense(licenseData = {}) {
    const entry = {
      ...licenseData,
      createdAtIso: new Date().toISOString()
    };
    this.data.licenses.push(entry);
    this.saveSync();
    return entry;
  }

  getStats() {
    const totalUsers = Object.keys(this.data.users).length;
    const activeLicenses = this.data.licenses.length;
    const waitingDeposit = Object.values(this.data.users).filter(u => u.status === 'WAITING_DEPOSIT').length;
    const totalEvents = this.data.channelEvents.length;
    const depositEvents = this.data.channelEvents.filter(e => e.type === 'DEPOSITO').length;
    const signupEvents = this.data.channelEvents.filter(e => e.type === 'CADASTRO').length;

    const followUpsSent = Object.values(this.data.users).reduce((acc, u) => {
      if (u.followUps?.noId_1) acc.noId_1++;
      if (u.followUps?.noId_2) acc.noId_2++;
      if (u.followUps?.noDeposit_1) acc.noDeposit_1++;
      if (u.followUps?.noDeposit_2) acc.noDeposit_2++;
      return acc;
    }, { noId_1: 0, noId_2: 0, noDeposit_1: 0, noDeposit_2: 0 });

    return {
      totalUsers,
      activeLicenses,
      waitingDeposit,
      totalEvents,
      depositEvents,
      signupEvents,
      followUpsSent,
      recentEvents: this.data.channelEvents.slice(0, 5)
    };
  }
}

export const db = new Database();
