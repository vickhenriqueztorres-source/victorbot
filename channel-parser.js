/**
 * PARSER INTELIGENTE DE NOTIFICAÇÕES DO CANAL TELEGRAM
 * Extrai tipo de evento (Cadastro ou Depósito), ID da Corretora, E-mail e Valor.
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

  // Padrão A: "ID: 123456", "ID 123456", "ID #123456", "Conta: 123456", "Trader: 123456", "User: 123456"
  const idPatterRegex = /(?:id|conta|account|trader|user|usu[aá]rio|cliente)\s*[:#=\-]?\s*([0-9]{4,12})/i;
  const matchId = clean.match(idPatterRegex);
  if (matchId && matchId[1]) {
    brokerId = matchId[1].trim();
  }

  // Padrão B: Fallback para números isolados de 5 a 10 dígitos se o padrão com palavra-chave não achou
  if (!brokerId) {
    const standaloneNumberMatch = clean.match(/\b([0-9]{5,10})\b/);
    if (standaloneNumberMatch && standaloneNumberMatch[1]) {
      brokerId = standaloneNumberMatch[1].trim();
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
