/**
 * SERVIÇO DE EMISSÃO CRIPTOGRÁFICA DE LICENÇAS ECDSA P-256
 * Gera chaves oficiais no formato `IFX-<payload>.<assinatura>` que desbloqueiam
 * instantaneamente o terminal do cliente.
 */

const PRIVATE_KEY_JWK = Object.freeze({
  key_ops: ['sign'],
  ext: true,
  kty: 'EC',
  x: '5GwRbpIj6fDE9wFoqzs8gWwc59aysCra8phIQklqkoc',
  y: 'WyzYGO10QITLCm5_zfcyrn3pWBYgqRDZ_VvOokredpE',
  crv: 'P-256',
  d: 'FJgJ917Oj5v6ddeFb85kLo1-O-Vbe1JsW5-2GxyP4SU'
});

const LICENSE_PREFIX = 'IFX-';
let _cachedKeyPromise = null;

function bytesToBase64Url(bytes) {
  let binary = '';
  for (let i = 0; i < bytes.length; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return Buffer.from(binary, 'binary')
    .toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/g, '');
}

async function getPrivateKey() {
  if (!_cachedKeyPromise) {
    _cachedKeyPromise = crypto.subtle.importKey(
      'jwk',
      PRIVATE_KEY_JWK,
      { name: 'ECDSA', namedCurve: 'P-256' },
      false,
      ['sign']
    );
  }
  return _cachedKeyPromise;
}

/**
 * Emite uma licença assinada criptograficamente para o cliente.
 * @param {object} params
 * @param {string} params.holder Nome do cliente ou ID da corretora
 * @param {number} [params.durationDays=30] Duração em dias
 * @param {string} [params.plan="PRO"] Plano atribuído (PRO, VIP, etc.)
 */
export async function issueClientLicense({ holder = 'Cliente VIP', durationDays = 30, plan = 'PRO' } = {}) {
  const nowMs = Date.now();
  const expMs = nowMs + durationDays * 86_400_000;
  const randomSuffix = Math.random().toString(36).substring(2, 7).toUpperCase();
  const licenseId = `LIC-${randomSuffix}`;

  const payloadObj = {
    v: 1,
    id: licenseId,
    sub: String(holder).trim() || 'Cliente VIP',
    plan: String(plan).trim().toUpperCase(),
    iat: Math.floor(nowMs),
    exp: Math.floor(expMs)
  };

  const payloadJson = JSON.stringify(payloadObj);
  const payloadBytes = new TextEncoder().encode(payloadJson);
  const payloadB64 = bytesToBase64Url(payloadBytes);

  const privateKey = await getPrivateKey();
  const signedPartBytes = new TextEncoder().encode(payloadB64);
  const signatureBuffer = await crypto.subtle.sign(
    { name: 'ECDSA', hash: { name: 'SHA-256' } },
    privateKey,
    signedPartBytes
  );

  const sigB64 = bytesToBase64Url(new Uint8Array(signatureBuffer));
  const code = `${LICENSE_PREFIX}${payloadB64}.${sigB64}`;

  return {
    code,
    licenseId,
    holder: payloadObj.sub,
    plan: payloadObj.plan,
    durationDays,
    expiresAtIso: new Date(expMs).toISOString(),
    createdAtIso: new Date(nowMs).toISOString()
  };
}
