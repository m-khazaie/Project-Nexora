
/* =========================================
   SETTINGS PAGE
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    const tabs =
        document.querySelectorAll(".settings-tab");

    const sections =
        document.querySelectorAll(".settings-section");

    const saveButton =
        document.getElementById("saveSettings");

    const resetButton =
        document.getElementById("resetSettings");

    const saveMessage =
        document.getElementById("saveMessage");


    /* =========================================
       SETTINGS TABS
    ========================================= */

    tabs.forEach(tab => {

        tab.addEventListener("click", () => {

            const target =
                tab.dataset.section;


            /* Remove active */

            tabs.forEach(item => {
                item.classList.remove("active");
            });


            sections.forEach(section => {
                section.classList.remove("active");
            });


            /* Add active */

            tab.classList.add("active");

            const targetSection =
                document.getElementById(target);

            if (targetSection) {
                targetSection.classList.add("active");
            }

        });

    });


    /* =========================================
       SAVE SETTINGS
    ========================================= */

    saveButton.addEventListener("click", () => {

        const settings = {

            storeName:
                document.getElementById("storeName").value,

            storeEmail:
                document.getElementById("storeEmail").value,

            storePhone:
                document.getElementById("storePhone").value,

            currency:
                document.getElementById("currency").value,

            storeAddress:
                document.getElementById("storeAddress").value,


            autoConfirm:
                document.getElementById("autoConfirm").checked,

            allowCancel:
                document.getElementById("allowCancel").checked,

            allowOutOfStock:
                document.getElementById("allowOutOfStock").checked,

            paymentTimeout:
                document.getElementById("paymentTimeout").value,


            newOrderNotification:
                document.getElementById("newOrderNotification").checked,

            paymentNotification:
                document.getElementById("paymentNotification").checked,

            stockNotification:
                document.getElementById("stockNotification").checked,

            systemNotification:
                document.getElementById("systemNotification").checked,


            showStats:
                document.getElementById("showStats").checked,

            showActivity:
                document.getElementById("showActivity").checked,

            itemsPerPage:
                document.getElementById("itemsPerPage").value

        };


        /* Save to LocalStorage */

        localStorage.setItem(
            "dashboardSettings",
            JSON.stringify(settings)
        );


        /* Show success */

        showSaveMessage();

    });


    /* =========================================
       SHOW SAVE MESSAGE
    ========================================= */

    function showSaveMessage() {

        saveMessage.classList.add("show");

        setTimeout(() => {

            saveMessage.classList.remove("show");

        }, 2500);

    }


    /* =========================================
       LOAD SETTINGS
    ========================================= */

    function loadSettings() {

        const saved =
            localStorage.getItem("dashboardSettings");

        if (!saved) {
            return;
        }


        try {

            const settings =
                JSON.parse(saved);


            /* Store */

            if (settings.storeName !== undefined) {
                document.getElementById("storeName").value =
                    settings.storeName;
            }

            if (settings.storeEmail !== undefined) {
                document.getElementById("storeEmail").value =
                    settings.storeEmail;
            }

            if (settings.storePhone !== undefined) {
                document.getElementById("storePhone").value =
                    settings.storePhone;
            }

            if (settings.currency !== undefined) {
                document.getElementById("currency").value =
                    settings.currency;
            }

            if (settings.storeAddress !== undefined) {
                document.getElementById("storeAddress").value =
                    settings.storeAddress;
            }


            /* Orders */

            if (settings.autoConfirm !== undefined) {
                document.getElementById("autoConfirm").checked =
                    settings.autoConfirm;
            }

            if (settings.allowCancel !== undefined) {
                document.getElementById("allowCancel").checked =
                    settings.allowCancel;
            }

            if (settings.allowOutOfStock !== undefined) {
                document.getElementById("allowOutOfStock").checked =
                    settings.allowOutOfStock;
            }

            if (settings.paymentTimeout !== undefined) {
                document.getElementById("paymentTimeout").value =
                    settings.paymentTimeout;
            }


            /* Notifications */

            if (settings.newOrderNotification !== undefined) {
                document.getElementById("newOrderNotification").checked =
                    settings.newOrderNotification;
            }

            if (settings.paymentNotification !== undefined) {
                document.getElementById("paymentNotification").checked =
                    settings.paymentNotification;
            }

            if (settings.stockNotification !== undefined) {
                document.getElementById("stockNotification").checked =
                    settings.stockNotification;
            }

            if (settings.systemNotification !== undefined) {
                document.getElementById("systemNotification").checked =
                    settings.systemNotification;
            }


            /* Display */

            if (settings.showStats !== undefined) {
                document.getElementById("showStats").checked =
                    settings.showStats;
            }

            if (settings.showActivity !== undefined) {
                document.getElementById("showActivity").checked =
                    settings.showActivity;
            }

            if (settings.itemsPerPage !== undefined) {
                document.getElementById("itemsPerPage").value =
                    settings.itemsPerPage;
            }


        } catch (error) {

            console.error(
                "خطا در بارگذاری تنظیمات:",
                error
            );

        }

    }


    /* =========================================
       RESET SETTINGS
    ========================================= */

    resetButton.addEventListener("click", () => {

        const confirmed =
            confirm(
                "آیا مطمئن هستید که می‌خواهید تنظیمات به حالت اولیه بازگردد؟"
            );


        if (!confirmed) {
            return;
        }


        localStorage.removeItem(
            "dashboardSettings"
        );


        location.reload();

    });


    /* =========================================
       INITIAL LOAD
    ========================================= */

    loadSettings();

});

