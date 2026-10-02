/**
 * TESTES AUTOMATIZADOS DO BOT TELEGRAM (PARSER, CRIPTOGRAFIA, BANCO DE DADOS E COPYWRITING)
 */

import test from 'node:test';
import assert from 'node:assert/strict';
import { parseChannelNotification } from './channel-parser.js';
import { issueClientLicense } from './license-service.js';
import { db } from './database.js';
import { mensagens } from './mensagens.js';

test('Channel Parser: Detecta notificação de depósito com ID e valor em Reais', () => {
  const text = '🎉 Depósito aprovado!\nID: 948302\nValor: R$ 50,00\nStatus: Confirmado';
  const parsed = parseChannelNotification(text);

  assert.equal(parsed.type, 'DEPOSITO');
  assert.equal(parsed.brokerId, '948302');
  assert.equal(parsed.amount, '50,00');
});

test('Channel Parser: Detecta notificação de depósito em Dólares ou FTD', () => {
  const text = '⚡ NOVO FTD RECEBIDO!\nTrader: 104928\nAmount: $ 10.00\nData: 2026-09-29';
  const parsed = parseChannelNotification(text);

  assert.equal(parsed.type, 'DEPOSITO');
  assert.equal(parsed.brokerId, '104928');
  assert.equal(parsed.amount, '10.00');
});

test('Channel Parser: Detecta novo cadastro simples com e-mail', () => {
  const text = '👤 Novo cadastro na corretora!\nID da Conta: 554321\nEmail: usuario@gmail.com';
  const parsed = parseChannelNotification(text);

  assert.equal(parsed.type, 'CADASTRO');
  assert.equal(parsed.brokerId, '554321');
  assert.equal(parsed.email, 'usuario@gmail.com');
});

test('Channel Parser: Fallback para ID numérico isolado quando não há prefixo "ID:"', () => {
  const text = 'Depósito de recarga confirmado para a conta 789123 no valor de R$ 100,00';
  const parsed = parseChannelNotification(text);

  assert.equal(parsed.type, 'DEPOSITO');
  assert.equal(parsed.brokerId, '789123');
  assert.equal(parsed.amount, '100,00');
});

test('License Service: Emite código de licença ECDSA P-256 válido com prefixo IFX-', async () => {
  const res = await issueClientLicense({
    holder: 'Lucas Trader (849201)',
    durationDays: 3650,
    plan: 'VITALICIO'
  });

  assert.ok(res.code.startsWith('IFX-'));
  assert.ok(res.code.includes('.'));
  assert.equal(res.durationDays, 3650);
  assert.equal(res.plan, 'VITALICIO');
  assert.equal(res.holder, 'Lucas Trader (849201)');
});

test('Database: Salva usuário, vincula brokerId, acompanha follow-ups e estatísticas', () => {
  const fakeChatId = '999888777';
  const fakeBrokerId = '849302';

  db.saveUser(fakeChatId, {
    firstName: 'Carlos',
    brokerId: fakeBrokerId,
    status: 'WAITING_DEPOSIT',
    followUps: {
      noDeposit_1: new Date().toISOString()
    }
  });

  const found = db.findUserByBrokerId(fakeBrokerId);
  assert.ok(found);
  assert.equal(found.chatId, fakeChatId);
  assert.equal(found.firstName, 'Carlos');
  assert.equal(found.status, 'WAITING_DEPOSIT');
  assert.ok(found.followUps.noDeposit_1);

  const stats = db.getStats();
  assert.ok(stats.totalUsers >= 1);
  assert.ok(stats.followUpsSent.noDeposit_1 >= 1);

  // Limpa o usuário de teste para não poluir o banco real
  delete db.data.users[fakeChatId];
  delete db.data.brokerToChat[fakeBrokerId];
  db.saveSync();
});

test('Copywriting Mensagens: Follow-ups estratégicos estão configurados com tom humanizado', () => {
  // Follow-up Sem ID 1
  const fuSemId1 = mensagens.followUpSemId1('Carlos');
  assert.ok(Array.isArray(fuSemId1));
  assert.ok(fuSemId1.some(m => m.includes('B2 Trading')));
  assert.ok(mensagens.botoesFollowUpSemId1('https://link.com').length >= 2);

  // Follow-up Sem ID 2 (Postura de Filtro de Ejecutores)
  const fuSemId2 = mensagens.followUpSemId2('Carlos', 'https://link.com');
  assert.ok(Array.isArray(fuSemId2));
  assert.ok(fuSemId2.some(m => m.includes('fórmulas mágicas')));
  assert.strictEqual(mensagens.botoesFollowUpSemId2('https://link.com').length, 2);

  // Follow-up Sem Depósito 1 (Status VIP Real 60 dias)
  const fuSemDep1 = mensagens.followUpSemDeposito1('Carlos', '849302');
  assert.ok(Array.isArray(fuSemDep1));
  assert.ok(fuSemDep1.some(m => m.includes('VIP REAL')));

  // Follow-up Sem Depósito 2 (Reserva de plaza VIP)
  const fuSemDep2 = mensagens.followUpSemDeposito2('Carlos', '849302');
  assert.ok(Array.isArray(fuSemDep2));
  assert.ok(fuSemDep2.some(m => m.includes('849302')));
});

test('Copywriting Mensagens: Central de FAQ e objeções responde com clareza em espanhol', () => {
  // Duda Monto Mínimo
  const dudaMin = mensagens.dudaMinimo('Carlos');
  assert.ok(Array.isArray(dudaMin));
  assert.ok(dudaMin.some(m => m.includes('VITALICIO')));

  // Duda Métodos de Pago
  const dudaMet = mensagens.dudaMetodos('Carlos');
  assert.ok(Array.isArray(dudaMet));
  assert.ok(dudaMet.some(m => m.includes('Pix')));

  // Duda Dispositivos (PC e Celular)
  const dudaDisp = mensagens.dudaDispositivos('Carlos');
  assert.ok(Array.isArray(dudaDisp));
  assert.ok(dudaDisp.some(m => m.includes('Kiwi Browser') || m.includes('Chrome')));

  // Duda Retiros
  const dudaRet = mensagens.dudaRetiros('Carlos');
  assert.ok(Array.isArray(dudaRet));
  assert.ok(dudaRet.some(m => m.includes('100% seguro')));
});

test('Funil em 2 Etapas: Mensagens de ativação Demo e Upgrade VIP Real estão perfeitas', () => {
  // 1. Confirmação e Liberação Demo Imediata (Risco Zero)
  const libDemo = mensagens.confirmacaoIdLiberacaoDemo('Carlos', '849302');
  assert.ok(Array.isArray(libDemo));
  assert.ok(libDemo.some(m => m.includes('849302')));
  assert.ok(libDemo.some(m => m.includes('Infiltrus')));

  // 2. Chave Demo com plano DEMO VIP (3 dias / 72h)
  const licDemo = mensagens.entregaLicencaDemo('Carlos', 'IFX-TEST.SIG', 3, '849302');
  assert.ok(licDemo.includes('IFX-TEST.SIG'));
  assert.ok(licDemo.includes('849302'));
  assert.ok(licDemo.includes('72h'));
  assert.ok(licDemo.includes('youtu.be'));

  // 3. Desafio Demo de 2 a 3 sinais
  const desafio = mensagens.desafioDemo();
  assert.ok(desafio.includes('Reto'));
  assert.ok(desafio.includes('Filtro de Volumen'));
  assert.ok(mensagens.botoesEntregaDemo.length >= 2);

  // 4. Upgrade VIP Real (2 meses / 60 dias)
  const upReal = mensagens.entregaLicencaVipReal('Carlos', 'IFX-VIP.SIG', 60);
  assert.ok(upReal.includes('IFX-VIP.SIG'));
  assert.ok(upReal.includes('VIP REAL'));
  assert.ok(upReal.includes('2 MESES DE ACCESO VIP'));

  // 5. Follow-ups do pipeline Demo em 4 etapas (Hardened Persona + $10 USD Mínimo)
  const fuDemo1 = mensagens.followUpDemoInstalacao('Carlos');
  assert.ok(fuDemo1.some(m => m.includes('extensión en tu Chrome')));
  assert.ok(mensagens.botoesFollowUpDemoInstalacao.length >= 2);

  const fuDemo2 = mensagens.followUpDemoTeste('Carlos');
  assert.ok(fuDemo2.some(m => m.includes('monopoly') && m.includes('$10 USD')));
  assert.ok(mensagens.botoesFollowUpDemoTeste().length >= 2);

  const fuDemo3 = mensagens.followUpDemoConversaoReal('Carlos', '849302');
  assert.ok(fuDemo3.some(m => m.includes('$38 USD') && m.includes('$10 USD')));
  assert.ok(mensagens.botoesFollowUpDemoConversaoReal().length >= 1);

  const fuDemo4 = mensagens.followUpDemoUltimoLlamado('Carlos', '849302');
  assert.ok(fuDemo4.some(m => m.includes('disciplina de ejecutar') && m.includes('$10')));
  assert.ok(mensagens.botoesFollowUpDemoUltimoLlamado().length >= 1);

  // 6. Script de Reativação Dura direto
  const fuDura = mensagens.reativacaoDura('Carlos', '849302');
  assert.ok(fuDura.some(m => m.includes('disciplina de ejecutar')));
});

test('Database: Gerenciamento dos estados DEMO_ACTIVE e VIP_REAL', () => {
  const fakeChatId = '888777666';
  const fakeBrokerId = '771122';

  // 1. Cadastra como DEMO_ACTIVE
  db.saveUser(fakeChatId, {
    firstName: 'Elena',
    brokerId: fakeBrokerId,
    status: 'DEMO_ACTIVE',
    licensePlan: 'DEMO VIP',
    followUps: {
      demo_1: new Date().toISOString()
    }
  });

  const demoUser = db.getUser(fakeChatId);
  assert.equal(demoUser.status, 'DEMO_ACTIVE');
  assert.equal(demoUser.licensePlan, 'DEMO VIP');
  assert.ok(demoUser.followUps.demo_1);

  // 2. Faz upgrade para VIP_REAL
  db.saveUser(fakeChatId, {
    status: 'VIP_REAL',
    licensePlan: 'VITALICIO VIP',
    upgradedToRealAt: new Date().toISOString()
  });

  const vipUser = db.getUser(fakeChatId);
  assert.equal(vipUser.status, 'VIP_REAL');
  assert.equal(vipUser.licensePlan, 'VITALICIO VIP');
  assert.ok(vipUser.upgradedToRealAt);

  // Limpa o registro de teste
  delete db.data.users[fakeChatId];
  delete db.data.brokerToChat[fakeBrokerId];
  db.saveSync();
});
