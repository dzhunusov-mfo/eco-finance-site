(function() {
  // ─── SYSTEM PROMPT ───
  const SYSTEM = `Ты — умный ИИ-ассистент МФО «ЭКО-Финанс» (Алматы, Казахстан). Отвечай кратко, дружелюбно и по делу. Всегда на русском языке.

О компании:
- Полное название: ТОО «Микрофинансовая организация «ЭКО-Финанс»»
- Лицензия АРРФР № 02.21.0006M, с 2017 года
- Адрес: г. Алматы, Турксибский р-н, ул. Бекмаханова, 95А
- Телефон/WhatsApp: +7 702 100 27 57
- Telegram: @eco_finance17
- Instagram: @eco_finance_2017
- Email: info@eco-finance.kz
- Режим работы: Пн–Пт 9:00–18:00

КРЕДИТЫ (для ИП и юр. лиц):
- Сумма: до 75 000 000 тенге
- Ставка: от 30% годовых
- Срок: до 36 месяцев
- Залог: жилая и коммерческая недвижимость в г. Алматы
- Выдача: за 1 рабочий день
- 0% комиссия за выдачу и обслуживание
- Погашение основного долга — в конце срока, ежемесячно только проценты
- Досрочное погашение без штрафов
- Справки о доходах не нужны

Документы для ИП:
- Удостоверение личности
- Отчёт независимого оценщика на залог
- Справка о правах на недвижимость
- Правоустанавливающие документы на залог
- Выписка со счёта за 12 мес.
- Справка из налоговой об отсутствии долгов

ОБЛИГАЦИИ (для инвесторов):
- Ставка: 22% годовых (фиксированная)
- Выплаты: ежеквартально
- Торгуются на KASE, тикер MFEC
- 0 дефолтов по купонным выплатам за всё время
- Доход не облагается налогом
- 2-й выпуск (MFECb1): 400 млн тг, погашение тела — август 2026
- 3-й выпуск (MFECb2): до 220 млн тг, ISIN KZ2P00011380, идёт размещение
- Купить через приложение Jusan: Инвестиции → Брокерский счёт → найти «МФО ЭКО-Финанс»

Если не знаешь точного ответа — предложи позвонить: +7 702 100 27 57 или написать в WhatsApp.
Не давай обещаний по одобрению кредитов — это решается индивидуально.`;

  // ─── STYLES ───
  const style = document.createElement('style');
  style.textContent = `
    #ef-chat-btn {
      position: fixed; bottom: 28px; right: 28px; z-index: 9999;
      width: 60px; height: 60px; border-radius: 50%;
      background: #1a5c3a; border: none; cursor: pointer;
      box-shadow: 0 4px 20px rgba(26,92,58,0.45);
      display: flex; align-items: center; justify-content: center;
      transition: transform .2s, box-shadow .2s;
    }
    #ef-chat-btn:hover { transform: scale(1.08); box-shadow: 0 6px 28px rgba(26,92,58,.55); }
    #ef-chat-btn svg { width: 28px; height: 28px; fill: white; }
    #ef-chat-btn .ef-badge {
      position: absolute; top: -4px; right: -4px;
      width: 18px; height: 18px; background: #e24b4a; border-radius: 50%;
      color: white; font-size: 11px; font-weight: 700;
      display: flex; align-items: center; justify-content: center;
      font-family: sans-serif;
    }
    #ef-chat-window {
      position: fixed; bottom: 100px; right: 28px; z-index: 9998;
      width: 360px; max-width: calc(100vw - 40px);
      background: #fff; border-radius: 16px;
      box-shadow: 0 8px 40px rgba(0,0,0,.18);
      display: flex; flex-direction: column;
      overflow: hidden; transition: opacity .25s, transform .25s;
      font-family: 'Geologica', 'Segoe UI', sans-serif;
      max-height: 520px;
    }
    #ef-chat-window.ef-hidden { opacity: 0; transform: translateY(12px) scale(.97); pointer-events: none; }
    .ef-header {
      background: #1a5c3a; padding: 14px 16px;
      display: flex; align-items: center; gap: 10px; flex-shrink: 0;
    }
    .ef-header-avatar {
      width: 36px; height: 36px; border-radius: 50%;
      background: rgba(255,255,255,.2);
      display: flex; align-items: center; justify-content: center;
      font-size: 18px; flex-shrink: 0;
    }
    .ef-header-info { flex: 1; }
    .ef-header-name { color: #fff; font-size: 14px; font-weight: 600; }
    .ef-header-status { color: rgba(255,255,255,.75); font-size: 12px; }
    .ef-header-close {
      background: none; border: none; cursor: pointer;
      color: rgba(255,255,255,.8); font-size: 20px; padding: 0 4px;
      line-height: 1;
    }
    .ef-messages {
      flex: 1; overflow-y: auto; padding: 16px;
      display: flex; flex-direction: column; gap: 10px;
      min-height: 200px;
    }
    .ef-msg {
      max-width: 82%; padding: 10px 14px;
      border-radius: 14px; font-size: 14px; line-height: 1.55;
      word-break: break-word;
    }
    .ef-msg.bot {
      background: #f0f6f2; color: #1a2820;
      border-bottom-left-radius: 4px; align-self: flex-start;
    }
    .ef-msg.user {
      background: #1a5c3a; color: #fff;
      border-bottom-right-radius: 4px; align-self: flex-end;
    }
    .ef-typing {
      display: flex; gap: 5px; padding: 12px 14px;
      background: #f0f6f2; border-radius: 14px; border-bottom-left-radius: 4px;
      align-self: flex-start; width: fit-content;
    }
    .ef-typing span {
      width: 7px; height: 7px; background: #3fa86e;
      border-radius: 50%; animation: ef-bounce .9s infinite;
    }
    .ef-typing span:nth-child(2) { animation-delay: .15s; }
    .ef-typing span:nth-child(3) { animation-delay: .3s; }
    @keyframes ef-bounce {
      0%,60%,100% { transform: translateY(0); }
      30% { transform: translateY(-6px); }
    }
    .ef-input-row {
      padding: 10px 12px; border-top: 1px solid #e8f5ee;
      display: flex; gap: 8px; align-items: flex-end; flex-shrink: 0;
    }
    .ef-input {
      flex: 1; border: 1px solid #d4e4da; border-radius: 10px;
      padding: 10px 12px; font-size: 14px; font-family: inherit;
      resize: none; outline: none; max-height: 90px; min-height: 40px;
      color: #1a2820; background: #f7faf8; line-height: 1.4;
    }
    .ef-input:focus { border-color: #1a5c3a; background: #fff; }
    .ef-send {
      width: 38px; height: 38px; border-radius: 50%; flex-shrink: 0;
      background: #1a5c3a; border: none; cursor: pointer;
      display: flex; align-items: center; justify-content: center;
      transition: background .2s;
    }
    .ef-send:hover { background: #2d7d52; }
    .ef-send:disabled { background: #b8dbc9; cursor: default; }
    .ef-send svg { width: 16px; height: 16px; fill: white; }
    .ef-quick { padding: 0 12px 10px; display: flex; flex-wrap: wrap; gap: 6px; flex-shrink: 0; }
    .ef-quick-btn {
      background: #e8f5ee; color: #1a5c3a; border: 1px solid #b8dbc9;
      border-radius: 20px; padding: 5px 12px; font-size: 12px;
      cursor: pointer; font-family: inherit; transition: all .2s;
      white-space: nowrap;
    }
    .ef-quick-btn:hover { background: #1a5c3a; color: #fff; border-color: #1a5c3a; }
  `;
  document.head.appendChild(style);

  // ─── HTML ───
  const btn = document.createElement('button');
  btn.id = 'ef-chat-btn';
  btn.innerHTML = `
    <svg viewBox="0 0 24 24"><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 10H6v-2h12v2zm0-3H6V7h12v2z"/></svg>
    <div class="ef-badge">ИИ</div>`;
  document.body.appendChild(btn);

  const win = document.createElement('div');
  win.id = 'ef-chat-window';
  win.classList.add('ef-hidden');
  win.innerHTML = `
    <div class="ef-header">
      <div class="ef-header-avatar">🤖</div>
      <div class="ef-header-info">
        <div class="ef-header-name">ИИ-ассистент ЭКО-Финанс</div>
        <div class="ef-header-status">● Онлайн — отвечу на любой вопрос</div>
      </div>
      <button class="ef-header-close" id="ef-close">✕</button>
    </div>
    <div class="ef-messages" id="ef-msgs">
      <div class="ef-msg bot">Привет! Я ИИ-ассистент ЭКО-Финанс. Помогу разобраться с условиями кредитования или инвестициями в облигации. Спрашивайте! 👋</div>
    </div>
    <div class="ef-quick" id="ef-quick">
      <button class="ef-quick-btn">Условия кредита</button>
      <button class="ef-quick-btn">Какие документы нужны?</button>
      <button class="ef-quick-btn">Облигации — как купить?</button>
      <button class="ef-quick-btn">Какая ставка?</button>
    </div>
    <div class="ef-input-row">
      <textarea class="ef-input" id="ef-input" placeholder="Напишите вопрос..." rows="1"></textarea>
      <button class="ef-send" id="ef-send" disabled>
        <svg viewBox="0 0 24 24"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>
      </button>
    </div>`;
  document.body.appendChild(win);

  // ─── LOGIC ───
  let open = false;
  let loading = false;
  const messages = [];

  btn.addEventListener('click', () => {
    open = !open;
    win.classList.toggle('ef-hidden', !open);
    if (open) document.getElementById('ef-input').focus();
  });
  document.getElementById('ef-close').addEventListener('click', () => {
    open = false; win.classList.add('ef-hidden');
  });

  const input = document.getElementById('ef-input');
  const sendBtn = document.getElementById('ef-send');
  const msgsEl = document.getElementById('ef-msgs');

  input.addEventListener('input', () => {
    sendBtn.disabled = !input.value.trim() || loading;
    input.style.height = 'auto';
    input.style.height = Math.min(input.scrollHeight, 90) + 'px';
  });
  input.addEventListener('keydown', e => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); if (!sendBtn.disabled) send(); }
  });
  sendBtn.addEventListener('click', send);

  document.querySelectorAll('.ef-quick-btn').forEach(b => {
    b.addEventListener('click', () => { input.value = b.textContent; sendBtn.disabled = false; send(); });
  });

  function addMsg(text, role) {
    const div = document.createElement('div');
    div.className = 'ef-msg ' + role;
    div.textContent = text;
    msgsEl.appendChild(div);
    msgsEl.scrollTop = msgsEl.scrollHeight;
    return div;
  }

  function showTyping() {
    const t = document.createElement('div');
    t.className = 'ef-typing'; t.id = 'ef-typing';
    t.innerHTML = '<span></span><span></span><span></span>';
    msgsEl.appendChild(t);
    msgsEl.scrollTop = msgsEl.scrollHeight;
  }

  function hideTyping() {
    const t = document.getElementById('ef-typing');
    if (t) t.remove();
  }

  async function send() {
    const text = input.value.trim();
    if (!text || loading) return;
    loading = true;
    sendBtn.disabled = true;
    input.value = '';
    input.style.height = 'auto';
    document.getElementById('ef-quick').style.display = 'none';

    addMsg(text, 'user');
    messages.push({ role: 'user', content: text });
    showTyping();

    try {
      const res = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 1000,
          system: SYSTEM,
          messages: messages.slice(-8)
        })
      });
      const data = await res.json();
      hideTyping();
      const reply = data.content?.[0]?.text || 'Извините, произошла ошибка. Позвоните нам: +7 702 100 27 57';
      addMsg(reply, 'bot');
      messages.push({ role: 'assistant', content: reply });
    } catch (e) {
      hideTyping();
      addMsg('Извините, не могу ответить прямо сейчас. Позвоните нам: +7 702 100 27 57', 'bot');
    }

    loading = false;
    sendBtn.disabled = false;
    input.focus();
  }
})();
