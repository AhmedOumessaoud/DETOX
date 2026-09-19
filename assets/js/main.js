const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
const revealObserver = new IntersectionObserver((entries) => { entries.forEach((entry) => { if (entry.isIntersecting) { entry.target.classList.add('visible'); revealObserver.unobserve(entry.target); } }); }, { threshold: .12 });
document.querySelectorAll('.reveal').forEach((element) => revealObserver.observe(element));
const form = document.querySelector('#orderForm');
form?.addEventListener('submit', (event) => {
  event.preventDefault();
  form.classList.add('was-validated');
  if (!form.checkValidity()) {
    form.querySelector(':invalid')?.focus();
    return;
  }

  const button = form.querySelector('button[type="submit"]');
  const previous = button.innerHTML;
  const data = new FormData(form);
  const payment = 'الدفع قبل الاستلام';
  const message = [
    'السلام عليكم، أريد تأكيد طلب باقة AloeCurvy Detox 9 Days.',
    `الاسم: ${data.get('name')}`,
    `الهاتف: ${data.get('phone')}`,
    `العنوان: ${data.get('address')}`,
    `طريقة الدفع: ${payment}`,
  ].join('\n');

  button.disabled = true;
  button.textContent = 'جاري فتح واتساب…';
  setTimeout(() => {
    window.open(`https://wa.me/212771800916?text=${encodeURIComponent(message)}`, '_blank', 'noopener');
    form.classList.add('submitted');
    form.reset();
    form.classList.remove('was-validated');
    button.disabled = false;
    button.innerHTML = previous;
  }, reduceMotion ? 0 : 600);
});
