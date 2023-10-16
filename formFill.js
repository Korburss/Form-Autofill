/* Detects existing data and autofills form */
/* Intended for use with https://github.com/Korburss/UTM-Storage */
/* Be sure to add you're intended submission location and form ID */
const form = document.getElementById("form");
const formTarget = "";

/* Detects existing data and autofills form, priority given to localStorage */

for (let i = 0; i < form.elements.length; i++) {
    let field = form.elements[i];
    switch (field.type) {
      case("tel"):
      case("email"):
      case("select-one"):
      case("text"):
        field.value = sessionStorage.getItem(field.name);
        field.value = localStorage.getItem(field.name);
    }
  }

/* Saves non-UTM form data to localStorage on submit */

function saveData(formFill) {
    for (const parts of formFill.entries()) {
        if (!parts[0].includes("utms") && parts[1].length > 0) {
            localStorage.setItem(parts[0], parts[1])
        }
    }
}

function formSubmit() {
    let formFill = new FormData(form);
    saveData(formFill);
    if (form.reportValidity()) {
        fetch(formTarget, {
            method: 'POST',
            mode: 'no-cors',
            data: formFill,
        });
    }
    else {
        form.reportValidity();
    }
}