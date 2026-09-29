/**
 * CONFIGURAÇÃO DO BOT TELEGRAM INFILTRUS
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Carregador simples de arquivo .env (sem dependências externas)
function loadEnv() {
  const envPath = path.join(__dirname, '.env');
  if (fs.existsSync(envPath)) {
    const content = fs.readFileSync(envPath, 'utf8');
    const lines = content.split('\n');
    for (const rawLine of lines) {
      const line = rawLine.trim();
      if (!line || line.startsWith('#')) continue;
      const eqIdx = line.indexOf('=');
      if (eqIdx > 0) {
        const key = line.substring(0, eqIdx).trim();
        let val = line.substring(eqIdx + 1).trim();
        if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
          val = val.substring(1, val.length - 1);
        }
        if (!process.env[key]) {
          process.env[key] = val;
        }
      } else if (/^\d{8,12}:[A-Za-z0-9_-]{25,}$/.test(line)) {
        if (!process.env.TELEGRAM_BOT_TOKEN) {
          process.env.TELEGRAM_BOT_TOKEN = line;
        }
      }
    }
  }
}

loadEnv();

export const config = {
  // Token gerado no @BotFather do Telegram
  botToken: process.env.TELEGRAM_BOT_TOKEN || '',

  // ID do canal de notificações (ex: -1001234567890 ou @meucanal). Se vazio, aceita qualquer canal onde for admin
  channelId: process.env.NOTIFICATION_CHANNEL_ID || '',

  // Link oficial de afiliado da corretora para cadastro dos novos clientes
  brokerAffiliateUrl: process.env.BROKER_AFFILIATE_URL || 'https://b2trading.com/register?ref=infiltrus',

  // Identidade humanizada do Bot
  personaName: process.env.PERSONA_NAME || 'Victor',
  personaRole: process.env.PERSONA_ROLE || 'Mentor Infiltrus',

  // Tempo de validade padrão da licença liberada (em dias, 3650 = Vitalício)
  licenseDays: Number(process.env.LICENSE_DAYS || 3650),

  // Caminho do pacote da extensão a ser enviado ao cliente
  extensionZipPath: process.env.EXTENSION_ZIP_PATH || (
    fs.existsSync(path.resolve(__dirname, 'assets', 'inflitrus-signals-cliente.zip'))
      ? path.resolve(__dirname, 'assets', 'inflitrus-signals-cliente.zip')
      : path.resolve(__dirname, '..', 'Extensao - b2 - isca digital', 'inflitrus-signals-cliente.zip')
  ),

  // IDs numéricos do Telegram dos administradores que podem rodar comandos /admin e /liberar
  adminIds: (process.env.ADMIN_IDS || '').split(',').map(s => s.trim()).filter(Boolean),

  // Tempo simulado de digitação para parecer 100% humano (ms)
  typingDelayMs: 2000,
};
