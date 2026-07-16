const year = document.querySelector("#year");
const menuToggle = document.querySelector(".menu-toggle");
const nav = document.querySelector("#site-nav");
const brandImage = document.querySelector(".brand img");
const brandFallback = document.querySelector(".brand-fallback");

if (year) year.textContent = new Date().getFullYear();

if (brandImage && brandFallback) {
  const showBrandFallback = () => { brandImage.hidden = true; brandFallback.hidden = false; };
  const showBrandImage = () => { brandImage.hidden = false; brandFallback.hidden = true; };
  brandImage.addEventListener("error", showBrandFallback);
  brandImage.addEventListener("load", showBrandImage);
  if (brandImage.complete && brandImage.naturalWidth === 0) showBrandFallback();
  else if (brandImage.complete) showBrandImage();
}

if (menuToggle && nav) {
  menuToggle.addEventListener("click", () => {
    const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute("aria-expanded", String(!isOpen));
    menuToggle.setAttribute("aria-label", isOpen ? "Abrir menú" : "Cerrar menú");
    nav.classList.toggle("is-open", !isOpen);
    document.body.classList.toggle("menu-open", !isOpen);
  });
  nav.addEventListener("click", (event) => {
    if (event.target instanceof HTMLAnchorElement) {
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Abrir menú");
      nav.classList.remove("is-open");
      document.body.classList.remove("menu-open");
    }
  });
}

function buildExecutiveQuoteEmail({ location, rangeStart, rangeEnd, pickupTime, vehicleType }) {
  const formatter = new Intl.DateTimeFormat("es-GT", { day: "numeric", month: "long", year: "numeric" });
  const subject = "Solicitud de cotización - Movilidad ejecutiva";
  const body = [
    "Hola, deseo cotizar el servicio de movilidad ejecutiva.", "",
    `Localidad de recogida: ${location}`,
    `Fecha de inicio: ${formatter.format(rangeStart)}`,
    `Fecha final: ${formatter.format(rangeEnd)}`,
    `Hora de recogida: ${pickupTime}`,
    `Tipo de vehículo: ${vehicleType}`,
    "", "Quedo pendiente de su cotización. Gracias.",
  ].join("\n");
  return `mailto:info@transportesintegrados.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

const quoteForm = document.querySelector("#executive-quote-form");
const dateRangeField = document.querySelector("#date-range-field");
const dateRangeTrigger = document.querySelector("#date-range-trigger");
const dateRangeValue = document.querySelector("#date-range-value");
const dateRangeCalendar = document.querySelector("#date-range-calendar");
const calendarMonth = document.querySelector("#calendar-month");
const calendarDays = document.querySelector("#calendar-days");
const calendarHelp = document.querySelector("#calendar-help");
const previousMonth = document.querySelector("#previous-month");
const nextMonth = document.querySelector("#next-month");
const clearDates = document.querySelector("#clear-dates");
const confirmDates = document.querySelector("#confirm-dates");
const startDateInput = document.querySelector("#start-date");
const endDateInput = document.querySelector("#end-date");
const dateRangeError = document.querySelector("#date-range-error");

if (quoteForm && dateRangeField && dateRangeTrigger && dateRangeCalendar && calendarMonth && calendarDays) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  let visibleMonth = new Date(today.getFullYear(), today.getMonth(), 1);
  let rangeStart = null;
  let rangeEnd = null;
  const monthFormatter = new Intl.DateTimeFormat("es-GT", { month: "long", year: "numeric" });
  const shortDateFormatter = new Intl.DateTimeFormat("es-GT", { day: "numeric", month: "short" });
  const emailDateFormatter = new Intl.DateTimeFormat("es-GT", { day: "numeric", month: "long", year: "numeric" });
  const dateKey = (date) => `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
  const isSameDay = (firstDate, secondDate) => firstDate && secondDate && dateKey(firstDate) === dateKey(secondDate);

  function updateDateSummary() {
    if (rangeStart && rangeEnd) {
      dateRangeValue.textContent = `${shortDateFormatter.format(rangeStart)} – ${shortDateFormatter.format(rangeEnd)}`;
      startDateInput.value = dateKey(rangeStart); endDateInput.value = dateKey(rangeEnd);
      confirmDates.disabled = false; calendarHelp.textContent = "Rango seleccionado. Confirma para continuar.";
      dateRangeField.classList.remove("is-invalid"); dateRangeError.textContent = ""; return;
    }
    if (rangeStart) {
      dateRangeValue.textContent = `${shortDateFormatter.format(rangeStart)} – Seleccionar final`;
      startDateInput.value = dateKey(rangeStart); endDateInput.value = "";
      confirmDates.disabled = true; calendarHelp.textContent = "Ahora selecciona la fecha final."; return;
    }
    dateRangeValue.textContent = "Seleccionar fechas"; startDateInput.value = ""; endDateInput.value = "";
    confirmDates.disabled = true; calendarHelp.textContent = "Selecciona la fecha de inicio y después la fecha final.";
  }

  function renderCalendar() {
    calendarMonth.textContent = monthFormatter.format(visibleMonth);
    calendarDays.replaceChildren();
    const firstDayOffset = (visibleMonth.getDay() + 6) % 7;
    const daysInMonth = new Date(visibleMonth.getFullYear(), visibleMonth.getMonth() + 1, 0).getDate();
    const totalCalendarDays = Math.ceil((firstDayOffset + daysInMonth) / 7) * 7;
    const gridStart = new Date(visibleMonth); gridStart.setDate(1 - firstDayOffset);
    for (let index = 0; index < totalCalendarDays; index += 1) {
      const day = new Date(gridStart); day.setDate(gridStart.getDate() + index); day.setHours(0, 0, 0, 0);
      const dayButton = document.createElement("button");
      dayButton.className = "calendar-day"; dayButton.type = "button"; dayButton.textContent = day.getDate();
      dayButton.dataset.date = dateKey(day); dayButton.setAttribute("role", "gridcell"); dayButton.setAttribute("aria-label", emailDateFormatter.format(day));
      if (day.getMonth() !== visibleMonth.getMonth()) dayButton.classList.add("is-outside");
      if (day < today) dayButton.disabled = true;
      if (rangeStart && rangeEnd && day > rangeStart && day < rangeEnd) dayButton.classList.add("is-in-range");
      if (isSameDay(day, rangeStart)) { dayButton.classList.add("is-start"); dayButton.setAttribute("aria-selected", "true"); }
      if (isSameDay(day, rangeEnd)) { dayButton.classList.add("is-end"); dayButton.setAttribute("aria-selected", "true"); }
      dayButton.addEventListener("click", () => { if (!rangeStart || rangeEnd) { rangeStart = day; rangeEnd = null; } else if (day < rangeStart) { rangeEnd = rangeStart; rangeStart = day; } else rangeEnd = day; updateDateSummary(); renderCalendar(); });
      calendarDays.append(dayButton);
    }
  }
  function openCalendar() { dateRangeCalendar.hidden = false; dateRangeTrigger.setAttribute("aria-expanded", "true"); renderCalendar(); (calendarDays.querySelector(".is-start:not(:disabled)") || calendarDays.querySelector(".calendar-day:not(:disabled)"))?.focus(); }
  function closeCalendar() { dateRangeCalendar.hidden = true; dateRangeTrigger.setAttribute("aria-expanded", "false"); }
  dateRangeTrigger.addEventListener("click", () => (dateRangeCalendar.hidden ? openCalendar() : closeCalendar()));
  previousMonth.addEventListener("click", () => { const previous = new Date(visibleMonth.getFullYear(), visibleMonth.getMonth() - 1, 1); if (previous >= new Date(today.getFullYear(), today.getMonth(), 1)) { visibleMonth = previous; renderCalendar(); } });
  nextMonth.addEventListener("click", () => { visibleMonth = new Date(visibleMonth.getFullYear(), visibleMonth.getMonth() + 1, 1); renderCalendar(); });
  clearDates.addEventListener("click", () => { rangeStart = null; rangeEnd = null; visibleMonth = new Date(today.getFullYear(), today.getMonth(), 1); updateDateSummary(); renderCalendar(); });
  confirmDates.addEventListener("click", () => { if (rangeStart && rangeEnd) { closeCalendar(); document.querySelector("#pickup-time")?.focus(); } });
  document.addEventListener("click", (event) => { if (!event.composedPath().includes(dateRangeField)) closeCalendar(); });
  document.addEventListener("keydown", (event) => { if (event.key === "Escape" && !dateRangeCalendar.hidden) { closeCalendar(); dateRangeTrigger.focus(); } });
  quoteForm.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!rangeStart || !rangeEnd) { dateRangeField.classList.add("is-invalid"); dateRangeError.textContent = "Selecciona la fecha de inicio y final."; openCalendar(); return; }
    if (!quoteForm.checkValidity()) { quoteForm.reportValidity(); return; }
    window.location.href = buildExecutiveQuoteEmail({ location: document.querySelector("#pickup-location").value, rangeStart, rangeEnd, pickupTime: document.querySelector("#pickup-time").value, vehicleType: document.querySelector("#vehicle-type").value });
  });
  updateDateSummary(); renderCalendar();
}
