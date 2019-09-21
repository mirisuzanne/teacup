const erase = document.querySelector("[data-erase]"),
      eraseBtn = document.querySelector("[data-toggle='erase']"),
      toggleErase = () => {
  const e = {
    off: "on",
    on: "off"
  }[erase.getAttribute("data-erase")];
  erase.setAttribute("data-erase", e), eraseBtn.setAttribute("data-active", "on" === e);
};

eraseBtn && eraseBtn.addEventListener("click", () => {
  toggleErase();
});
const resultsDropdown = document.querySelector('[data-navlist="search"]'),
      resultsList = resultsDropdown,
      searchInput = document.querySelector("#search-str"),
      searchBtn = document.querySelector('[data-btn~="search"]');
let searchIdx, searchJson;

const clearResults = e => {
  for (e && resultsDropdown.setAttribute("aria-expanded", !1); resultsList.firstChild;) resultsList.removeChild(resultsList.firstChild);
},
      decodeHtml = e => {
  const t = document.createElement("textarea");
  return t.innerHTML = e, t.value;
},
      find = e => {
  results = searchIdx.search(e), clearResults(!results.length), results.length && resultsDropdown.setAttribute("aria-expanded", !0);

  for (let e in results) {
    e = results[e];
    const t = searchJson.filter(t => t.url === e.ref)[0],
          s = document.createElement("li");
    s.innerHTML = linkTemplate(t).trim(), resultsList.appendChild(s);
  }
},
      linkTemplate = e => `\n  <a href="${e.url}">\n    ${decodeHtml(e.title)}\n  </a>\n`;

searchInput.addEventListener("focus", () => {
  searchJson || fetch("/search.json").then(e => e.json()).then(e => {
    searchJson = e.search, searchIdx = lunr(function () {
      this.ref("url"), this.field("title", {
        boost: 20
      }), this.field("meta"), this.field("events"), this.field("content"), searchJson.forEach(e => {
        this.add(e);
      });
    });
  }).then(() => {
    searchBtn.setAttribute("disabled", "disabled").setAttribute("tabindex", -1);
  });
}), searchInput.addEventListener("input", () => {
  let e = searchInput.value;
  e.length > 1 ? (e = e.includes("~") ? e : `${e}~1`, find(e)) : clearResults(!0);
});

const clearAll = e => {
  "Escape" === e.code && (clearResults(!0), searchInput.value = "", searchInput.focus());
};

searchInput.addEventListener("keyup", e => clearAll(e)), resultsDropdown.addEventListener("keyup", e => clearAll(e));
const root = document.querySelector("html"),
      themeMenu = document.querySelector('[data-ccs="menu"]'),
      modeToggle = document.querySelector('[data-ccs="invert"]'),
      unsetBtn = document.querySelector('[data-ccs="unset"]'),
      selectElements = {
  theme: document.querySelector('[data-ccs="theme-select"] select'),
  hue: document.querySelector('[data-ccs="hue-select"] input'),
  sat: document.querySelector('[data-ccs="saturation-select"] input'),
  light: document.querySelector('[data-ccs="lightness-select"] input'),
  contrast: document.querySelector('[data-ccs="contrast-select"] input')
},
      attrs = {
  theme: "data-ccs-theme"
},
      props = {
  hue: "--ccs-prime--user",
  sat: "--ccs-s--user",
  light: "--ccs-l--user",
  contrast: "--ccs-contrast--user",
  mode: "--ccs-mode--user"
},
      store = {
  theme: "ccsTheme",
  mode: "ccsMode",
  hue: "ccsHue",
  sat: "ccsSat",
  light: "ccsLight",
  contrast: "ccsContrast"
},
      clearColors = () => {
  setValue("theme", selectElements.theme.getAttribute("data-default"), !1), Object.keys(store).forEach(e => localStorage.removeItem(store[e])), Object.keys(props).forEach(e => root.style.removeProperty(props[e])), Object.keys(selectElements).forEach(e => {
    const t = selectElements[e];
    selectElements[e].value = t.getAttribute("data-default");
  }), unsetBtn.setAttribute("hidden", "");
},
      setValue = (e, t, s = !0) => {
  t && (attrs[e] ? root.setAttribute(attrs[e], t) : props[e] && root.style.setProperty(props[e], t), s && store[e] && (localStorage.setItem(store[e], t), unsetBtn.removeAttribute("hidden")));
},
      getMode = () => Number(getComputedStyle(root).getPropertyValue("--ccs-mode").trim()),
      changeMode = () => {
  setValue("mode", -1 * getMode(), !0);
},
      initMenu = () => {
  themeMenu.removeAttribute("hidden");
},
      initValue = e => {
  selectElements[e].setAttribute("data-default", selectElements[e].value);
  const t = localStorage.getItem(store[e]);
  t && (setValue(e, t, !1), selectElements[e].value = t, unsetBtn.removeAttribute("hidden"));
},
      initMode = () => {
  let e = localStorage.getItem(store.mode);
  e && (setValue("mode", e), unsetBtn.removeAttribute("hidden"));
};

document.onload = void themeMenu.removeAttribute("hidden"), document.onload = initMode(), modeToggle.addEventListener("click", () => void setValue("mode", -1 * getMode(), !0)), unsetBtn.addEventListener("click", () => (setValue("theme", selectElements.theme.getAttribute("data-default"), !1), Object.keys(store).forEach(e => localStorage.removeItem(store[e])), Object.keys(props).forEach(e => root.style.removeProperty(props[e])), Object.keys(selectElements).forEach(e => {
  const t = selectElements[e];
  selectElements[e].value = t.getAttribute("data-default");
}), void unsetBtn.setAttribute("hidden", ""))), Object.keys(selectElements).forEach(e => {
  selectElements[e] && (document.onload = initValue(e), selectElements[e].addEventListener("input", () => setValue(e, selectElements[e].value)));
});