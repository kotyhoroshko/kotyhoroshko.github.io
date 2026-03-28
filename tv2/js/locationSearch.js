import { searchLocations } from "./geocoding.js";
import { escapeHtml } from "./utils.js";
import { GPS_BUTTON_HTML } from "./config.js";

/**
 * Ініціалізує пошук локації з dropdown-підказками та GPS-кнопкою.
 * @param {HTMLElement} containerEl - елемент-контейнер (weather card)
 * @param {{getLocation: () => {name: string}, selectLocation: (loc: {lat: number, lon: number, name: string}) => Promise<void>, geolocateUser: () => Promise<void>}} callbacks
 */
export function initLocationSearch(containerEl, { getLocation, selectLocation, geolocateUser }) {
  if (!containerEl) return;

  containerEl.addEventListener("click", (e) => {
    const gpsBtn = e.target.closest(".location__gps-btn");
    if (gpsBtn) {
      e.stopPropagation();
      handleGpsClick(gpsBtn);
      return;
    }

    const locationEl = e.target.closest(".location");
    if (!locationEl || locationEl.querySelector(".location-input")) return;

    openSearchInput(locationEl);
  });

  async function handleGpsClick(btn) {
    const locationEl = btn.closest(".location");
    if (!locationEl) return;

    btn.classList.add("location__gps-btn--loading");
    btn.disabled = true;
    try {
      await geolocateUser();
    } catch (err) {
      console.warn("GPS недоступний:", err.message || err);
      const nameEl = locationEl.querySelector(".location__name");
      if (nameEl) {
        nameEl.textContent = "GPS недоступний";
        setTimeout(() => { nameEl.textContent = getLocation().name; }, 2000);
      }
    } finally {
      btn.classList.remove("location__gps-btn--loading");
      btn.disabled = false;
    }
  }

  function buildLocationHtml(name) {
    return `${GPS_BUTTON_HTML}<span class="location__name">${escapeHtml(name)}</span>`;
  }

  function openSearchInput(locationEl) {
    const input = document.createElement("input");
    input.type = "text";
    input.className = "location-input";
    input.placeholder = "Введіть місто...";

    const dropdown = document.createElement("div");
    dropdown.className = "location-dropdown";

    locationEl.textContent = "";
    locationEl.appendChild(input);
    locationEl.appendChild(dropdown);
    input.focus();

    let debounceTimer = null;
    let results = [];
    let activeIndex = -1;

    function renderDropdown() {
      if (!results.length) {
        dropdown.innerHTML = input.value.trim().length >= 2
          ? `<div class="location-dropdown__empty">Нічого не знайдено</div>`
          : "";
        return;
      }
      dropdown.innerHTML = results.map((r, i) => {
        const detail = [r.admin1, r.country].filter(Boolean).map(escapeHtml).join(", ");
        return `
          <div class="location-dropdown__item ${i === activeIndex ? "location-dropdown__item--active" : ""}" data-index="${i}">
            <span class="location-dropdown__name">${escapeHtml(r.name)}</span>
            ${detail ? `<span class="location-dropdown__detail">${detail}</span>` : ""}
          </div>`;
      }).join("");
    }

    async function fetchSuggestions(query) {
      if (query.length < 2) {
        results = [];
        activeIndex = -1;
        renderDropdown();
        return;
      }
      results = await searchLocations(query);
      activeIndex = -1;
      renderDropdown();
    }

    async function handleSelect(r) {
      input.disabled = true;
      input.value = r.name;
      dropdown.innerHTML = "";
      clearTimeout(debounceTimer);
      await selectLocation({ lat: r.latitude, lon: r.longitude, name: r.name });
    }

    function restoreText() {
      if (locationEl.contains(input)) {
        clearTimeout(debounceTimer);
        locationEl.innerHTML = buildLocationHtml(getLocation().name);
      }
    }

    input.addEventListener("input", () => {
      input.classList.remove("location-input--error");
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => fetchSuggestions(input.value.trim()), 300);
    });

    input.addEventListener("keydown", (e) => {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        if (results.length) {
          activeIndex = (activeIndex + 1) % results.length;
          renderDropdown();
        }
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        if (results.length) {
          activeIndex = activeIndex <= 0 ? results.length - 1 : activeIndex - 1;
          renderDropdown();
        }
      } else if (e.key === "Enter") {
        e.preventDefault();
        if (activeIndex >= 0 && results[activeIndex]) {
          handleSelect(results[activeIndex]);
        } else if (results.length) {
          handleSelect(results[0]);
        } else {
          const query = input.value.trim();
          if (!query) { restoreText(); return; }
          input.disabled = true;
          input.value = "Пошук...";
          searchLocations(query, 1).then((res) => {
            if (res.length) {
              handleSelect(res[0]);
            } else {
              input.disabled = false;
              input.value = query;
              input.focus();
              input.classList.add("location-input--error");
            }
          });
        }
      } else if (e.key === "Escape") {
        restoreText();
      }
    });

    dropdown.addEventListener("mousedown", (e) => {
      e.preventDefault();
      const item = e.target.closest(".location-dropdown__item[data-index]");
      if (!item) return;
      const r = results[parseInt(item.dataset.index, 10)];
      if (r) handleSelect(r);
    });

    input.addEventListener("blur", () => {
      setTimeout(() => {
        if (!input.disabled) restoreText();
      }, 150);
    });
  }
}
