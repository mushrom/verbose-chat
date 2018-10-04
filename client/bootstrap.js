export const jQuery = require("jquery");
export const popper = require("popper.js");
export const bootstrap = require("bootstrap");

export function getCSRFToken() {
    return jQuery("[name=csrfmiddlewaretoken]").val();
}
