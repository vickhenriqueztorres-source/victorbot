/**
 * PARSER INTELIGENTE DE NOTIFICAÇÕES E IDENTIFICADORES DO BROKER
 * Extrai tipo de evento (Cadastro ou Depósito), ID da Corretora (numérico ou alfanumérico), E-mail e Valor.
 */

export function parseChannelNotification(text = '') {
  if (typeof text !== 'string' || !text.trim()) {
    return { type: 'OUTRO', brokerId: null, email: null, amount: null, rawText: '' };
  }

  const clean = text.trim();
  const lower = clean.toLowerCase();

  // 1. Identificação do Tipo de Evento
  let type = 'OUTRO';

  // Palavras indicativas de depósito (FTD ou recarga)
  const depositRegex = /(?:dep[oó]sito|deposit|ftd|recarga|pago|aprovad[oa]|confirmad[oa]|creditad[oa]|valor depositado)/i;
  // Palavras indicativas de novo cadastro
  const signupRegex = /(?:cadastr[oa]|registr[oa]|nov[oa]\s+(?:usu[aá]rio|conta|lead|cliente)|signup|registrado)/i;

  if (depositRegex.test(lower)) {
    type = 'DEPOSITO';
  } else if (signupRegex.test(lower)) {
    type = 'CADASTRO';
  }

  // 2. Extração do ID do Usuário / Corretora
  let brokerId = null;

  // Padrão A: "ID: 123456", "ID: tVXaZ5e", "ID 123456", "ID #123456", "Conta: 123456", "Trader: tVXaZ5e", "User: 123456"
  const idPatterRegex = /(?:id|conta|account|trader|user|usu[aá]rio|cliente)\s*[:#=\-]?\s*([a-zA-Z0-9_\-]{4,16})/i;
  const matchId = clean.match(idPatterRegex);
  if (matchId && matchId[1]) {
    brokerId = matchId[1].trim();
  }

  // Padrão B: Fallback para números isolados de 4 a 12 dígitos se o padrão com palavra-chave não achou
  if (!brokerId) {
    const standaloneNumberMatch = clean.match(/\b([0-9]{4,12})\b/);
    if (standaloneNumberMatch && standaloneNumberMatch[1]) {
      brokerId = standaloneNumberMatch[1].trim();
    }
  }

  // Padrão C: Fallback para código alfanumérico misto isolado (ex: tVXaZ5e)
  if (!brokerId) {
    const alphanumericMatch = clean.match(/\b([a-zA-Z0-9]{5,14})\b/);
    if (alphanumericMatch && alphanumericMatch[1]) {
      const candidate = alphanumericMatch[1];
      const hasNum = /[0-9]/.test(candidate);
      const hasLetter = /[a-zA-Z]/.test(candidate);
      const hasMixedCase = /[a-z]/.test(candidate) && /[A-Z]/.test(candidate);
      if ((hasNum && hasLetter) || hasMixedCase) {
        brokerId = candidate.trim();
      }
    }
  }

  // 3. Extração de E-mail (se presente)
  let email = null;
  const emailMatch = clean.match(/\b([A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,})\b/);
  if (emailMatch && emailMatch[1]) {
    email = emailMatch[1].toLowerCase().trim();
  }

  // 4. Extração de Valor de Depósito (se presente)
  let amount = null;
  // Exemplos: R$ 50,00 | $ 10.00 | 50 BRL | 100 USD
  const amountMatch = clean.match(/(?:R\$|\$|USD|BRL)\s*([0-9]+(?:[.,][0-9]{2})?)/i) ||
                      clean.match(/([0-9]+(?:[.,][0-9]{2})?)\s*(?:reais|d[oó]lares|brl|usd)/i);
  if (amountMatch && amountMatch[1]) {
    amount = amountMatch[1].trim();
  }

  return {
    type,
    brokerId,
    email,
    amount,
    rawText: clean
  };
}

/**
 * Extrai de forma inteligente o ID da corretora informado pelo cliente no chat privado,
 * aceitando tanto IDs numéricos (ex: 849302) quanto alfanuméricos (ex: tVXaZ5e).
 */
export function extractBrokerId(text = '', user = {}) {
  if (typeof text !== 'string') return null;
  const clean = text.trim();

  // 1. Ignora comandos de barra (/start, /liberar, etc.)
  if (clean.startsWith('/')) return null;

  // 2. Padrão explícito com prefixo (ex: "mi id es tVXaZ5e", "ID: 849302", "ID: tVXaZ5e", "cuenta 849302", "id tVXaZ5e")
  const prefixMatch = clean.match(/(?:(?:mi\s+)?id|(?:mi\s+)?cuenta|account|trader|usuario|cliente)\s*[:#=\-]?\s*([a-zA-Z0-9_\-]{4,16})/i);
  if (prefixMatch && prefixMatch[1]) {
    const candidate = prefixMatch[1].trim();
    if (!/^(demo|real|vip|b2trading|infiltrus|gratis|link|donde|como|ayuda|menu)$/i.test(candidate)) {
      return candidate;
    }
  }

  // 3. Se o usuário estiver explicitamente no passo de envio de ID (ex: clicou em has_account)
  if (user?.step === 'AWAITING_ID' || user?.step === 'AWAITING_REGISTRATION_CHOICE') {
    const stripped = clean.replace(/^(mi\s+id\s*(es|:)?|id\s*(es|:)?)\s*/i, '').trim();
    if (/^[a-zA-Z0-9_\-]{4,16}$/.test(stripped)) {
      if (!/^(hola|buenas|ayuda|duda|menu|start|gratis|precio|costo|como|donde|quiero|saludos|link|soporte)$/i.test(stripped)) {
        return stripped;
      }
    }
  }

  // 4. Padrão numérico isolado (4 a 12 dígitos, ex: 849302)
  const numericMatch = clean.match(/\b([0-9]{4,12})\b/);
  if (numericMatch && numericMatch[1]) {
    return numericMatch[1];
  }

  // 5. Padrão alfanumérico misto isolado (ex: tVXaZ5e - contém letras e números ou hash base62/58 de 5 a 14 chars)
  const alphanumericMatch = clean.match(/\b([a-zA-Z0-9]{5,14})\b/);
  if (alphanumericMatch && alphanumericMatch[1]) {
    const candidate = alphanumericMatch[1];
    const hasNum = /[0-9]/.test(candidate);
    const hasLetter = /[a-zA-Z]/.test(candidate);
    const hasMixedCase = /[a-z]/.test(candidate) && /[A-Z]/.test(candidate);
    if ((hasNum && hasLetter) || hasMixedCase) {
      if (!/^(b2trading|infiltrus)$/i.test(candidate)) {
        return candidate;
      }
    }
  }

  return null;
}
