(function() {
  const SYSTEM = `Ты — умный ИИ-ассистент МФО «ЭКО-Финанс» (Алматы, Казахстан). Отвечай кратко, дружелюбно и по делу. Всегда на русском языке.

О компании: ТОО «МФО ЭКО-Финанс», лицензия АРРФР № 02.21.0006M, с 2017 года. Адрес: г. Алматы, ул. Бекмаханова, 95А. Телефон: +7 702 100 27 57. Email: info@eco-finance.kz. Пн-Пт 9:00-18:00.

КРЕДИТЫ: до 75 млн тенге, от 30% годовых, до 36 месяцев, под залог недвижимости в Алматы, выдача за 1 день, 0% комиссия, ОД в конце срока, досрочное погашение без штрафов, справки о доходах не нужны.

ОБЛИГАЦИИ: 22% годовых, ежеквартально, KASE тикер MFEC, 0 дефолтов, доход не облагается ИПН. 3-й выпуск MFECb2 идёт размещение, ISIN KZ2P00011380. Купить через Jusan.

Если не знаешь — предложи позвонить +7 702 100 27 57.`;

  const WORKER = 'https://small-mouse-33ec.dzhunusov.workers.dev';

  const style = document.createElement('style');
  style.textContent = `
#ef-btn{position:fixed;bottom:24px;right:24px;z-index:9999;width:58px;height:58px;border-radius:50%;background:#1a5c3a;border:none;cursor:pointer;box-shadow:0 4px 20px rgba(26,92,58,.5);display:flex;align-items:center;justify-content:center;transition:transform .2s}
#ef-btn:hover{transform:scale(1.08)}
#ef-btn svg{width:26px;height:26px;fill:white}
#ef-btn .ef-b{position:absolute;top:-4px;right:-4px;width:18px;height:18px;background:#e24b4a;border-radius:50%;color:white;font-size:10px;font-weight:700;display:flex;align-items:center;justify-content:center;font-family:sans-serif}
#ef-win{position:fixed;bottom:92px;right:24px;z-index:9998;width:350px;max-width:calc(100vw - 32px);background:#fff;border-radius:16px;box-shadow:0 8px 40px rgba(0,0,0,.18);display:flex;flex-direction:column;overflow:hidden;transition:opacity .25s,transform .25s;font-family:'Geologica','Segoe UI',sans-serif;max-height:500px}
#ef-win.hide{opacity:0;transform:translateY(12px) scale(.97);pointer-events:none}
.ef-hd{background:#1a5c3a;padding:13px 15px;display:flex;align-items:center;gap:10px;flex-shrink:0}
.ef-av{width:34px;height:34px;border-radius:50%;background:rgba(255,255,255,.2);display:flex;align-items:center;justify-content:center;font-size:17px}
.ef-hn{color:#fff;font-size:14px;font-weight:600}
.ef-hs{color:rgba(255,255,255,.75);font-size:11px}
.ef-xb{background:none;border:none;cursor:pointer;color:rgba(255,255,255,.8);font-size:20px;margin-left:auto}
.ef-ms{flex:1;overflow-y:auto;padding:14px;display:flex;flex-direction:column;gap:9px;min-height:180px}
.ef-m{max-width:83%;padding:9px 13px;border-radius:13px;font-size:14px;line-height:1.5;word-break:break-word}
.ef-m.b{background:#f0f6f2;color:#1a2820;border-bottom-left-radius:3px;align-self:flex-start}
.ef-m.u{background:#1a5c3a;color:#fff;border-bottom-right-radius:3px;align-self:flex-end}
.ef-tp{display:flex;gap:5px;padding:10px 13px;background:#f0f6f2;border-radius:13px;border-bottom-left-radius:3px;align-self:flex-start}
.ef-tp span{width:7px;height:7px;background:#3fa86e;border-radius:50%;animation:efb .9s infinite}
.ef-tp span:nth-child(2){animation-delay:.15s}
.ef-tp span:nth-child(3){animation-delay:.3s}
@keyframes efb{0%,60%,100%{transform:translateY(0)}30%{transform:translateY(-6px)}}
.ef-qk{padding:0 12px 9px;display:flex;flex-wrap:wrap;gap:5px;flex-shrink:0}
.ef-qk button{background:#e8f5ee;color:#1a5c3a;border:1px solid #b8dbc9;border-radius:20px;padding:5px 11px;font-size:12px;cursor:pointer;font-family:inherit;transition:all .2s;white-space:nowrap}
.ef-qk button:hover{background:#1a5c3a;color:#fff}
.ef-ir{padding:9px 11px;border-top:1px solid #e8f5ee;display:flex;gap:7px;align-items:flex-end;flex-shrink:0}
.ef-in{flex:1;border:1px solid #d4e4da;border-radius:10px;padding:9px 11px;font-size:14px;font-family:inherit;resize:none;outline:none;max-height:90px;min-height:38px;color:#1a2820;background:#f7faf8}
.ef-in:focus{border-color:#1a5c3a;background:#fff}
.ef-sb{width:36px;height:36px;border-radius:50%;background:#1a5c3a;border:none;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:background .2s;flex-shrink:0}
.ef-sb:hover{background:#2d7d52}
.ef-sb:disabled{background:#b8dbc9;cursor:default}
.ef-sb svg{width:15px;height:15px;fill:white}`;
  document.head.appendChild(style);

  const btn = document.createElement('button');
  btn.id = 'ef-btn';
  btn.innerHTML = '<svg viewBox="0 0 24 24"><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 10H6v-2h12v2zm0-3H6V7h12v2z"/></svg><div class="ef-b">ИИ</div>';
  document.body.appendChild(btn);

  const win = document.createElement('div');
  win.id = 'ef-win';
  win.classList.add('hide');
  win.innerHTML = `
    <div class="ef-hd">
      <div class="ef-av">🤖</div>
      <div><div class="ef-hn">ИИ-ассистент ЭКО-Финанс</div><div class="ef-hs">● Онлайн — отвечу на любой вопрос</div></div>
      <button class="ef-xb" id="ef-x">✕</button>
    </div>
    <div class="ef-ms" id="ef-ms"><div class="ef-m b">Привет! Помогу разобраться с условиями кредита или облигациями. Спрашивайте! 👋</div></div>
    <div class="ef-qk" id="ef-qk">
      <button>Условия кредита</button>
      <button>Какие документы?</button>
      <button>Как купить облигации?</button>
      <button>Какая ставка?</button>
    </div>
    <div class="ef-ir">
      <textarea class="ef-in" id="ef-in" placeholder="Напишите вопрос..." rows="1"></textarea>
      <button class="ef-sb" id="ef-sb" disabled><svg viewBox="0 0 24 24"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg></button>
    </div>`;
  document.body.appendChild(win);

  let open=false, loading=false;
  const msgs=[], ms=document.getElementById('ef-ms'), inp=document.getElementById('ef-in'), sb=document.getElementById('ef-sb');

  btn.onclick=()=>{ open=!open; win.classList.toggle('hide',!open); if(open) inp.focus(); };
  document.getElementById('ef-x').onclick=()=>{ open=false; win.classList.add('hide'); };
  inp.addEventListener('input',()=>{ sb.disabled=!inp.value.trim()||loading; inp.style.height='auto'; inp.style.height=Math.min(inp.scrollHeight,90)+'px'; });
  inp.addEventListener('keydown',e=>{ if(e.key==='Enter'&&!e.shiftKey){e.preventDefault();if(!sb.disabled)send();} });
  sb.onclick=send;
  document.querySelectorAll('.ef-qk button').forEach(b=>b.onclick=()=>{ inp.value=b.textContent; sb.disabled=false; send(); });

  function addMsg(t,r){ const d=document.createElement('div'); d.className='ef-m '+r; d.textContent=t; ms.appendChild(d); ms.scrollTop=ms.scrollHeight; }
  function typing(s){ if(s){ const t=document.createElement('div'); t.className='ef-tp'; t.id='ef-t'; t.innerHTML='<span></span><span></span><span></span>'; ms.appendChild(t); ms.scrollTop=ms.scrollHeight; } else { const t=document.getElementById('ef-t'); if(t)t.remove(); } }

  async function send(){
    const text=inp.value.trim(); if(!text||loading) return;
    loading=true; sb.disabled=true; inp.value=''; inp.style.height='auto';
    document.getElementById('ef-qk').style.display='none';
    addMsg(text,'u'); msgs.push({role:'user',content:text}); typing(true);
    try{
      const payload = {
        model: 'claude-3-5-haiku-20241022',
        max_tokens: 800,
        system: SYSTEM,
        messages: msgs.slice(-8)
      };
      const r = await fetch(WORKER, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(payload)
      });
      const data = await r.json();
      typing(false);
      const reply = (data.content && data.content[0] && data.content[0].text)
        ? data.content[0].text
        : 'Ошибка. Позвоните: +7 702 100 27 57';
      addMsg(reply,'b');
      msgs.push({role:'assistant',content:reply});
    }catch(e){
      typing(false);
      addMsg('Ошибка соединения. Позвоните: +7 702 100 27 57','b');
    }
    loading=false; sb.disabled=false; inp.focus();
  }
})();
