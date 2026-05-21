// shared nav + footer injected into every page
document.addEventListener('DOMContentLoaded', () => {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';

  const navLinks = [
    { href: 'index.html',       label: 'Главная' },
    { href: 'ip.html',          label: 'Для ИП' },
    { href: 'ul.html',          label: 'Для юр. лиц' },
    { href: 'obligatsii.html',  label: 'Облигации' },
    { href: 'dokumenty.html',   label: 'Документы' },
    { href: 'kontakty.html',    label: 'Контакты' },
  ];

  const navHTML = `
  <div class="announce-bar">
    🎯 Размещается 3-й выпуск облигаций — ставка 22% годовых, ежеквартальные выплаты
    <a href="obligatsii.html">Подробнее →</a>
  </div>
  <nav>
    <a class="nav-logo" href="index.html">
      <div class="nav-logo-icon">Э</div>
      <div>
        <div class="nav-logo-text">ЭКО-Финанс</div>
        <div class="nav-logo-sub">МФО · с 2017 года</div>
      </div>
    </a>
    <button class="nav-burger" id="navBurger" aria-label="Меню">☰</button>
    <div class="nav-links" id="navLinks">
      ${navLinks.map(l => `<a href="${l.href}"${l.href===currentPage?' class="active"':''}>${l.label}</a>`).join('')}
      <a href="kontakty.html" class="nav-cta">Подать заявку</a>
    </div>
  </nav>`;

  const footerHTML = `
  <footer>
    <div class="footer-inner">
      <div class="footer-top">
        <div class="footer-brand">
          <h3>ТОО «МФО ЭКО-Финанс»</h3>
          <p>Микрофинансовая организация, работающая с ИП и юрлицами Казахстана с 2017 года.</p>
          <div class="footer-meta">
            <div>Лицензия: 02.21.0006M</div>
            <div>БИН: 170140006253</div>
            <div>Банк: АО «Kaspi Bank»</div>
          </div>
        </div>
        <div class="footer-col">
          <h4>Кредиты</h4>
          <a href="ip.html">Для ИП</a>
          <a href="ul.html">Для юр. лиц</a>
          <a href="ip.html#docs">Список документов</a>
          <a href="ip.html#steps">Этапы получения</a>
        </div>
        <div class="footer-col">
          <h4>Инвесторам</h4>
          <a href="obligatsii.html">Облигации</a>
          <a href="obligatsii.html#how">Как купить на KASE</a>
          <a href="obligatsii.html#schedule">Графики выплат</a>
          <a href="dokumenty.html">Финансовая отчётность</a>
        </div>
        <div class="footer-col footer-contacts">
          <h4>Контакты</h4>
          <a href="tel:+77019522339">+7 701 952 23 39</a>
          <a href="https://wa.me/77019522339" target="_blank">WhatsApp</a>
          <a href="https://t.me/mfoecofinance" target="_blank">Telegram менеджер</a>
          <a href="https://t.me/ecofenance" target="_blank">Telegram канал</a>
          <a href="https://www.instagram.com/eco_finance_mfo/" target="_blank">Instagram</a>
          <div class="footer-address">г. Алматы, Турксибский р-н,<br>ул. Бекмаханова, 95А<br>Пн–Пт: 9:00–18:00</div>
        </div>
      </div>
      <div class="footer-bottom">
        <span>© 2017–2026 ТОО «МФО ЭКО-Финанс». Все права защищены.</span>
        <div class="footer-bottom-links">
          <a href="policy.html">Политика конфиденциальности</a>
          <a href="kontakty.html#complaint">Сообщить о проблеме</a>
        </div>
      </div>
    </div>
  </footer>`;

  // inject
  const announceTarget = document.getElementById('site-header');
  if (announceTarget) announceTarget.innerHTML = navHTML;

  const footerTarget = document.getElementById('site-footer');
  if (footerTarget) footerTarget.innerHTML = footerHTML;

  // burger menu
  const burger = document.getElementById('navBurger');
  const links  = document.getElementById('navLinks');
  if (burger && links) {
    burger.addEventListener('click', () => links.classList.toggle('open'));
  }
});
