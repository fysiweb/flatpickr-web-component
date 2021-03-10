import flatpickr from "flatpickr";
import { German } from "flatpickr/dist/l10n/de.js";

flatpickr.localize(German);

/**
 * @param {Element} element
 * @returns void
 */
const addHead = (element) =>
  document.getElementsByTagName("head")[0].appendChild(element);

/**
 * @param {string} url
 * @returns Element
 */
const stylesheetFrom = (url) => {
  const element = document.createElement("link");
  element.rel = "stylesheet";
  element.type = "text/css";
  element.href = url;
  return element;
};

const flatpickrCss =
  "https://cdn.jsdelivr.net/npm/flatpickr/dist/flatpickr.min.css";

/**
 * @param {string} name
 * @returns string
 */
const flatpickrTheme = (name) =>
  `https://cdn.jsdelivr.net/npm/flatpickr/dist/themes/${name}.css`;

customElements.define(
  "date-time-picker",
  class extends HTMLElement {
    constructor() {
      super();

      const container = document.createElement("div");

      const input = document.createElement("input");
      input.setAttribute("data-input", "");
      input.id = "picker";

      container.appendChild(input);

      this._shadowRoot = this.attachShadow({ mode: "open" });
      this._shadowRoot.appendChild(container);
    }

    connectedCallback() {
      const element = this._shadowRoot.getElementById("picker");
      if (element) {
        addHead(stylesheetFrom(flatpickrCss));
        addHead(
          stylesheetFrom(
            flatpickrTheme(this.getAttribute("theme") || "material_red")
          )
        );

        flatpickr(element, {
          allowInput: this.hasAttribute("allowInput"),
          altFormat: this.getAttribute("altFormat") || "j. F Y H:i",
          altInput: this.hasAttribute("altInput"),
          dateFormat: this.getAttribute("dateFormat") || "d.m.Y H:i",
          enableSeconds: this.hasAttribute("enableSeconds"),
          enableTime: this.hasAttribute("enableTime"),
          /** @type any */
          mode: this.getAttribute("mode") || "single",
          noCalendar: this.hasAttribute("noCalendar"),
          weekNumbers: this.hasAttribute("weekNumbers"),
          /** @type any */
          monthSelectorType:
            this.getAttribute("monthSelectorType") || "dropdown",
          time_24hr: this.hasAttribute("time_24hr"),
          onChange: (selectedDates, dateStr, instance) =>
            this.dispatchEvent(
              new CustomEvent("selectedDates", {
                detail: selectedDates.map((date) => date.getTime()),
              })
            ),
        });
      } else {
        console.error(
          "The #picker container does not exist, but it definitely should."
        );
      }
    }
  }
);
