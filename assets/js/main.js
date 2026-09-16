const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
const revealObserver = new IntersectionObserver((entries) => { entries.forEach((entry) => { if (entry.isIntersecting) { entry.target.classList.add('visible'); revealObserver.unobserve(entry.target); } }); }, { threshold: .12 });
document.querySelectorAll('.reveal').forEach((element) => revealObserver.observe(element));
const form = document.querySelector('#orderForm');
form?.addEventListener('submit', (event) => { event.preventDefault(); form.classList.add('was-validated'); if (!form.checkValidity()) { form.querySelector(':invalid')?.focus(); return; } const button = form.querySelector('button[type="submit"]'); const previous = button.innerHTML; button.disabled = true; button.textContent = 'جاري تسجيل الطلب…'; setTimeout(() => { form.classList.add('submitted'); form.reset(); form.classList.remove('was-validated'); button.disabled = false; button.innerHTML = previous; }, reduceMotion ? 0 : 600); });
