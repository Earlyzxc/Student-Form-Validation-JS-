document.addEventListener("DOMContentLoaded", function () {

    const course = document.getElementById("course");
    const year = document.getElementById("year");
    const section = document.getElementById("section");
    const contact = document.getElementById("contact");
    const dob = document.getElementById("dob");
    const studentNumber = document.getElementById("studentNumber");
    const email = document.getElementById("email");

    year.disabled = true;
    section.disabled = true;

    const sectionsList = {
        "1st": ["1A", "1B", "1C", "1D"],
        "2nd": ["2A", "2B", "2C", "2D"],
        "3rd": ["3A", "3B", "3C", "3D"],
        "4th": ["4A", "4B", "4C", "4D"]
    };

    course.addEventListener("change", function () {
        if (course.value !== "") {
            year.disabled = false;
        } else {
            year.disabled = true;
            section.disabled = true;
        }

        year.value = "";
        section.value = "";
        section.innerHTML = "<option value=''>Select Section</option>";
    });

    year.addEventListener("change", function () {
        const selectedYear = year.value;

        section.innerHTML = "<option value=''>Select Section</option>";

        if (selectedYear !== "") {
            section.disabled = false;

            const yearSections = sectionsList[selectedYear];

            for (let i = 0; i < yearSections.length; i++) {
                const option = document.createElement("option");
                option.value = yearSections[i];
                option.textContent = yearSections[i];
                section.appendChild(option);
            }
        } else {
            section.disabled = true;
        }
    });

    contact.addEventListener("input", function () {
        let value = contact.value;

        value = value.replace(/[^0-9]/g, "");

        if (value.length > 11) {
            value = value.substring(0, 11);
        }

        contact.value = value;

        const error = document.getElementById("contactError");

        if (value.startsWith("09") && value.length === 11) {
            contact.classList.add("success");
            contact.classList.remove("error");
            error.textContent = "";
        } else {
            contact.classList.add("error");
            contact.classList.remove("success");
            error.textContent = "Contact number must start with 09 and be 11 digits.";
        }
    });

    dob.addEventListener("change", function () {
        const selected = new Date(dob.value);
        const today = new Date();
        today.setHours(0,0,0,0);

        const error = document.getElementById("dobError");

        if (selected > today) {
            dob.classList.add("error");
            dob.classList.remove("success");
            error.textContent = "You cannot be born in the future.";
        } else {
            dob.classList.add("success");
            dob.classList.remove("error");
            error.textContent = "";
        }
    });

    studentNumber.addEventListener("input", function () {
        let value = studentNumber.value;

        value = value.replace(/[^0-9-]/g, "");

        if (value.length > 2 && value[2] !== "-") {
            value = value.substring(0, 2) + "-" + value.substring(2);
        }

        if (value.length > 8) {
            value = value.substring(0, 8);
        }

        studentNumber.value = value;

        const error = document.getElementById("studentNumberError");
        const pattern = /^[0-9]{2}-[0-9]{1,5}$/;

        if (pattern.test(value)) {
            studentNumber.classList.add("success");
            studentNumber.classList.remove("error");
            error.textContent = "";
        } else {
            studentNumber.classList.add("error");
            studentNumber.classList.remove("success");
            error.textContent = "Format must be: 24-12345";
        }
    });

    email.addEventListener("input", function () {
        const value = email.value.trim();
        const error = document.getElementById("emailError");

        const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        if (pattern.test(value)) {
            email.classList.add("success");
            email.classList.remove("error");
            error.textContent = "";
        } else {
            email.classList.add("error");
            email.classList.remove("success");
            error.textContent = "Enter a valid email (example@gmail.com)";
        }
    });
const form = document.getElementById("studentForm");

form.addEventListener("submit", function (event) {
    const allRequired = document.querySelectorAll("input[required], select[required]");
    let hasError = false;

    for (let i = 0; i < allRequired.length; i++) {
        const field = allRequired[i];
        const value = field.value.trim();

        if (value === "") {
            field.classList.add("error");
            field.classList.remove("success");

            const errorBox = document.getElementById(field.id + "Error");
            if (errorBox) {
                errorBox.textContent = "This field is required.";
            }

            hasError = true;
        }

        if (field.classList.contains("error")) {
            hasError = true;
        }
    }

    if (hasError) {
        event.preventDefault();

        const formError = document.getElementById("formError");
        if (formError) {
            formError.textContent = "Please Corect all inputs before submitting.";
        }
    }
});

});
