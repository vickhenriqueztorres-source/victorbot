# 🤖 Bot de Ativação Automática Telegram - Infiltrus Signals

Bot humanizado para o Telegram que conversa de forma acolhedora, persuasiva e natural com o cliente na persona do **Victor Torrez** (Mentor Infiltrus, em Espanhol nativo), valida cadastro e depósito na corretora através do canal de notificações, possui **motor autônomo de follow-up estratégico**, **central inteligente de dúvidas / FAQ** e **libera automaticamente** a chave criptográfica VIP (Acesso Vitalício) e a extensão.

---

## ⚡ Passo a Passo para Ativar

### 1. Configurar o Token e Parâmetros
O arquivo `.env` já está configurado na pasta `bot-telegram/.env`:
```env
TELEGRAM_BOT_TOKEN=8814151980:AAG2U4LZL13w2cN47yD9sTcMxtNAw8T38aA
BROKER_AFFILIATE_URL=https://b2trading.io/
PERSONA_NAME=Victor Torrez
PERSONA_ROLE=Mentor Infiltrus
```

### 2. Adicionar o Bot ao seu Canal de Notificações
Para o bot ler os avisos de cadastro e depósito que chegam no seu canal:
1. Abra o seu **Canal do Telegram** (onde chegam as notificações da corretora).
2. Vá em **Administradores** > **Adicionar Administrador**.
3. Pesquise pelo username do bot: **`@victorinfiltrustrader_bot`** e adicione como administrador.
4. Permissão necessária: apenas a permissão padrão de ler/enviar mensagens.

---

### 3. Como Iniciar o Bot
Basta dar **dois cliques** no arquivo na raiz do projeto:
👉 **`INICIAR_BOT_TELEGRAM.bat`** (ou `bot-telegram/iniciar-bot.bat`)

O terminal abrirá com a mensagem:
```
============================================================
🤖 BOT INFILTRUS INICIADO COM SUCESSO!
👤 Persona Ativa: Victor Torrez (Mentor Infiltrus)
📁 Banco de Dados: bot-telegram/data/store.json
============================================================
Conectado ao Telegram como @victorinfiltrustrader_bot (Victor Torrez)
```

---

## 💬 Fluxo Humanizado e Persuasivo

1. **Acolhimento em 3 Mensagens Curtas e Pausadas:** O cliente inicia a conversa. Victor cumprimenta pelo primeiro nome, destaca com negrito e itálico estratégicos que é super fácil e rápido (menos de 2 minutos, sem gráficos complicados), e pergunta se ele já tem conta ou precisa do link.
2. **Orientação:** Se ele precisar do link, Victor envia o link oficial com bônus e explica em 3 passos como achar o ID.
3. **Consulta em Tempo Real:** Quando o cliente digita o ID dele (ex: `849201`), o bot simula digitação (`escribiendo...`) e consulta o histórico do canal.
4. **Depósito Confirmado:** O bot gera na hora a licença assinada `IFX-...` (VITALÍCIA), envia o arquivo `inflitrus-signals-cliente.zip` direto no chat e passa o tutorial em 3 passos para Google Chrome e Celular Android.
5. **Aguardando Depósito:** O bot parabeniza pelo cadastro e reforça o argumento de ouro:
   > *"Depositas <b>cualquier valor</b> y el acceso a la herramienta es tuyo <b>VITALICIO</b> 🎯"*
6. **🚀 Disparo Proativo em Tempo Real:** Assim que a mensagem de depósito cair no canal do Telegram, o bot **contata o cliente sozinho no segundo seguinte**:
   > *"¡Ey, Carlos! ¡Acaba de sonar en mi sistema que tu depósito fue confirmado con éxito en el broker! 🚀🎉"*
   E entrega a chave VIP e a extensão instantaneamente!

---

## 🔄 Motor Autônomo de Follow-Up Estratégico

O bot conta com um motor em background que roda a cada 2 minutos e recupera leads frios automaticamente sem parecer robótico nem enviar spam:

### 🟡 Leads que iniciaram mas NÃO enviaram o ID:
- **Follow-up 1 (após 35 a 60 min de inatividade):** Check-in amigável perguntando se conseguiu abrir o link ou se teve alguma dúvida, reforçando que leva menos de 1 minuto.
- **Follow-up 2 (após 4 a 8 horas):** Prova social e FOMO (*"En la sesión en vivo recién el motor M1 clavó 4 señales ganadas consecutivas... pásame tu ID para no quedarte afuera"*).

### 🟢 Leads que enviaram o ID mas NÃO depositaram:
- **Follow-up 1 (após 45 a 60 min de inatividade):** Reforço de que qualquer valor ativa a ferramenta de forma **VITALÍCIA**, explicando os métodos de pagamento rápidos (Pix, cartões, transferência local, cripto).
- **Follow-up 2 (após 6 a 12 horas):** Reserva de vaga VIP e escassez (*"Tengo tu clave reservada con tu ID... quería consultarte antes de liberar tu cupo a la lista de espera"*).

---

## 💡 Central de Dúvidas e Objeções (FAQ)

### 1. Menu Interativo com Botões Inline
Disponível em todas as etapas através do botão **`❓ Tengo una duda / Preguntas`**:
- 💵 **¿Cuánto es el depósito mínimo?** (Explica que qualquer valor a partir de ~$5 ativa o software VITALÍCIO de presente).
- 💳 **¿Qué métodos de pago aceptan?** (Pix imediato, cartões Visa/Mastercard, transferências bancárias locais, cripto/USDT).
- 📱 **¿Funciona en Celular o solo en PC?** (PC nativo no Chrome/Brave/Edge e Celular Android via Kiwi Browser).
- 💎 **¿Por qué es Gratis y Vitalicio?** (Parceria oficial com a corretora, zero mensalidade, o saldo é 100% do trader).
- 🔒 **¿Cómo retiro mis ganancias?** (Retiros livres a qualquer momento para conta bancária ou carteira cripto).
- 🆔 **¿Dónde encuentro mi ID?** (Guia passo a passo de 10 segundos no perfil da corretora).

### 2. Reconhecimento Automático de Palavras-Chave no Chat
Se o cliente digitar qualquer dúvida no texto livre (ex: *"cuanto es lo minimo"*, *"se puede en celular"*, *"como pago con tarjeta"*, *"es gratis de verdad"* ou *"como retiro"*), o Victor responde na hora com a resposta exata e botões para continuar!

---

## 🛠️ Comandos de Administrador (no privado do bot)

- `/admin` ou `/status`: Exibe painel completo de leads, depósitos, licenças ativas e histórico de follow-ups enviados.
- `/followup`: Exibe o pipeline detalhado de leads aguardando envio de ID ou depósito.
- `/disparar_followup <CHAT_ID> <1|2|3|4>`: Permite forçar o disparo de teste de qualquer uma das 4 mensagens de follow-up para um chat específico.
- `/liberar <ID_CORRETORA>`: Força a liberação manual imediata de licença para qualquer cliente.
- `/simular <MENSAGEM_DO_CANAL>`: Permite testar no privado como o bot interpreta notificações do canal.
