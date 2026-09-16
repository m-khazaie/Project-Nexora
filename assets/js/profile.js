/* =========================================
   PROFILE PAGE
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    const imageInput =
        document.getElementById("imageInput");

    const profileImage =
        document.getElementById("profileImage");

    const fullName =
        document.getElementById("fullName");

    const email =
        document.getElementById("email");

    const phone =
        document.getElementById("phone");

    const profileNamePreview =
        document.getElementById("profileNamePreview");

    const saveButton =
        document.getElementById("saveProfile");

    const cancelButton =
        document.getElementById("cancelProfile");

    const message =
        document.getElementById("profileMessage");


    /* =========================================
       LOAD PROFILE
    ========================================= */

    function loadProfile() {

        const savedProfile =
            localStorage.getItem("dashboardProfile");

        if (!savedProfile) {
            return;
        }

        try {

            const profile =
                JSON.parse(savedProfile);


            if (profile.fullName) {

                fullName.value =
                    profile.fullName;

                profileNamePreview.textContent =
                    profile.fullName;

            }


            if (profile.email) {
                email.value = profile.email;
            }


            if (profile.phone) {
                phone.value = profile.phone;
            }


            if (profile.image) {

                profileImage.src =
                    profile.image;

            }

        } catch (error) {

            console.error(
                "خطا در بارگذاری پروفایل:",
                error
            );

        }

    }


    /* =========================================
       PROFILE IMAGE
    ========================================= */

    imageInput.addEventListener(
        "change",
        event => {

            const file =
                event.target.files[0];

            if (!file) {
                return;
            }


            if (!file.type.startsWith("image/")) {

                alert(
                    "لطفاً یک فایل تصویری انتخاب کنید."
                );

                return;

            }


            const reader =
                new FileReader();


            reader.onload = function () {

                profileImage.src =
                    reader.result;

            };


            reader.readAsDataURL(file);

        }
    );


    /* =========================================
       NAME PREVIEW
    ========================================= */

    fullName.addEventListener(
        "input",
        () => {

            const name =
                fullName.value.trim();

            profileNamePreview.textContent =
                name || "مدیر سیستم";

        }
    );


    /* =========================================
       PASSWORD VISIBILITY
    ========================================= */

    const passwordButtons =
        document.querySelectorAll(
            ".password-toggle"
        );


    passwordButtons.forEach(button => {

        button.addEventListener(
            "click",
            () => {

                const targetId =
                    button.dataset.target;

                const input =
                    document.getElementById(
                        targetId
                    );

                const icon =
                    button.querySelector(
                        ".material-icons-round"
                    );


                if (input.type === "password") {

                    input.type = "text";

                    icon.textContent =
                        "visibility_off";

                } else {

                    input.type = "password";

                    icon.textContent =
                        "visibility";

                }

            }
        );

    });


    /* =========================================
       SAVE PROFILE
    ========================================= */

    saveButton.addEventListener(
        "click",
        () => {

            const newPassword =
                document.getElementById(
                    "newPassword"
                ).value;

            const confirmPassword =
                document.getElementById(
                    "confirmPassword"
                ).value;


            /* Password validation */

            if (
                newPassword ||
                confirmPassword
            ) {

                if (newPassword.length < 6) {

                    alert(
                        "رمز عبور جدید باید حداقل ۶ کاراکتر باشد."
                    );

                    return;

                }


                if (
                    newPassword !==
                    confirmPassword
                ) {

                    alert(
                        "رمز عبور جدید و تکرار آن یکسان نیستند."
                    );

                    return;

                }

            }


            const profile = {

                fullName:
                    fullName.value.trim(),

                email:
                    email.value.trim(),

                phone:
                    phone.value.trim(),

                image:
                    profileImage.src

            };


            localStorage.setItem(
                "dashboardProfile",
                JSON.stringify(profile)
            );


            profileNamePreview.textContent =
                profile.fullName ||
                "مدیر سیستم";


            /* Clear password fields */

            document.getElementById(
                "currentPassword"
            ).value = "";

            document.getElementById(
                "newPassword"
            ).value = "";

            document.getElementById(
                "confirmPassword"
            ).value = "";


            showMessage();

        }
    );


    /* =========================================
       SHOW MESSAGE
    ========================================= */

    function showMessage() {

        message.classList.add("show");

        setTimeout(() => {

            message.classList.remove("show");

        }, 2500);

    }


    /* =========================================
       CANCEL
    ========================================= */

    cancelButton.addEventListener(
        "click",
        () => {

            loadProfile();

        }
    );


    /* =========================================
       INITIAL LOAD
    ========================================= */

    loadProfile();

});

