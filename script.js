document.addEventListener("DOMContentLoaded", function () {

    const course = document.getElementById("course");
    const year = document.getElementById("year");
    const section = document.getElementById("section");
    const contact = document.getElementById("contact");
    const dob = document.getElementById("dob");

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

        const contactError = document.getElementById("contactError");

        if (value.length === 11 && value.startsWith("09")) {
            contact.classList.remove("error");
            contact.classList.add("success");
            contactError.textContent = "";
        } else {
            contact.classList.remove("success");
            contact.classList.add("error");
            contactError.textContent = "Contact number must start with 09 and be 11 digits.";
        }
    });

    dob.addEventListener("change", function () {
        const birthday = dob.value;
        const birthdayError = document.getElementById("dobError");

        if (birthday === "") {
            return;
        }

        const selectedDate = new Date(birthday);
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        if (selectedDate > today) {
            dob.classList.remove("success");
            dob.classList.add("error");
            birthdayError.textContent = "You cannot be born in the future.";
        } else {
            dob.classList.remove("error");
            dob.classList.add("success");
            birthdayError.textContent = "";
        }
    });

});
