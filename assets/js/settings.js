
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

            tabs.forEach(item => {
                item.classList.remove("active");
            });

            sections.forEach(section => {
                section.classList.remove("active");
            });

            tab.classList.add("active");

            const targetSection =
                document.getElementById(target);

            if (targetSection) {

                targetSection.classList.add("active");

            }

        });

    });


    /* =========================================
       THEME OPTIONS
    ========================================= */

    const themeOptions =
        document.querySelectorAll(".theme-option");

    themeOptions.forEach(option => {

        option.addEventListener("click", () => {

            themeOptions.forEach(item => {

                item.classList.remove("active");

            });

            option.classList.add("active");

            const theme =
                option.dataset.themeOption;

            applyTheme(theme);

        });

    });


    /* =========================================
       COLOR OPTIONS
    ========================================= */

    const colorOptions =
        document.querySelectorAll(".color-option");

    colorOptions.forEach(option => {

        option.addEventListener("click", () => {

            colorOptions.forEach(item => {

                item.classList.remove("active");

            });

            option.classList.add("active");

            const color =
                option.dataset.color;

            applyAccent(color);

        });

    });


    /* =========================================
       APPLY THEME
    ========================================= */

    function applyTheme(theme) {

        document.body.dataset.theme =
            theme;

    }


    /* =========================================
       APPLY ACCENT
    ========================================= */

    function applyAccent(color) {

        document.body.dataset.accent =
            color;

    }


    /* =========================================
       SAVE SETTINGS
    ========================================= */

    saveButton.addEventListener("click", () => {

        const activeTheme =
            document.querySelector(
                ".theme-option.active"
            );

        const activeColor =
            document.querySelector(
                ".color-option.active"
            );


        const settings = {

            /* Store */

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


            /* Orders */

            autoConfirm:
                document.getElementById("autoConfirm").checked,

            allowCancel:
                document.getElementById("allowCancel").checked,

            allowOutOfStock:
                document.getElementById("allowOutOfStock").checked,

            paymentTimeout:
                document.getElementById("paymentTimeout").value,


            /* Notifications */

            newOrderNotification:
                document.getElementById(
                    "newOrderNotification"
                ).checked,

            paymentNotification:
                document.getElementById(
                    "paymentNotification"
                ).checked,

            stockNotification:
                document.getElementById(
                    "stockNotification"
                ).checked,

            systemNotification:
                document.getElementById(
                    "systemNotification"
                ).checked,


            /* Display */

            showStats:
                document.getElementById(
                    "showStats"
                ).checked,

            showActivity:
                document.getElementById(
                    "showActivity"
                ).checked,

            itemsPerPage:
                document.getElementById(
                    "itemsPerPage"
                ).value,


            /* Appearance */

            theme:
                activeTheme
                    ? activeTheme.dataset.themeOption
                    : "light",

            accent:
                activeColor
                    ? activeColor.dataset.color
                    : "blue",

            uiDensity:
                document.getElementById(
                    "uiDensity"
                ).value,

            borderRadius:
                document.getElementById(
                    "borderRadius"
                ).value,

            cardShadow:
                document.getElementById(
                    "cardShadow"
                ).value,

            sidebarStyle:
                document.getElementById(
                    "sidebarStyle"
                ).value,

            fontSize:
                document.getElementById(
                    "fontSize"
                ).value,

            uiAnimations:
                document.getElementById(
                    "uiAnimations"
                ).checked

        };


        localStorage.setItem(
            "dashboardSettings",
            JSON.stringify(settings)
        );


        /* Save theme separately */

        localStorage.setItem(
            "dashboardTheme",
            settings.theme
        );

        localStorage.setItem(
            "dashboardAccent",
            settings.accent
        );


        showSaveMessage();

    });


    /* =========================================
       SHOW SAVE MESSAGE
    ========================================= */

    function showSaveMessage() {

        if (!saveMessage) return;

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
            localStorage.getItem(
                "dashboardSettings"
            );

        if (!saved) {

            loadThemeDefaults();

            return;

        }


        try {

            const settings =
                JSON.parse(saved);


            /* Store */

            if (settings.storeName !== undefined) {
                document.getElementById(
                    "storeName"
                ).value = settings.storeName;
            }

            if (settings.storeEmail !== undefined) {
                document.getElementById(
                    "storeEmail"
                ).value = settings.storeEmail;
            }

            if (settings.storePhone !== undefined) {
                document.getElementById(
                    "storePhone"
                ).value = settings.storePhone;
            }

            if (settings.currency !== undefined) {
                document.getElementById(
                    "currency"
                ).value = settings.currency;
            }

            if (settings.storeAddress !== undefined) {
                document.getElementById(
                    "storeAddress"
                ).value = settings.storeAddress;
            }


            /* Orders */

            if (settings.autoConfirm !== undefined) {
                document.getElementById(
                    "autoConfirm"
                ).checked = settings.autoConfirm;
            }

            if (settings.allowCancel !== undefined) {
                document.getElementById(
                    "allowCancel"
                ).checked = settings.allowCancel;
            }

            if (settings.allowOutOfStock !== undefined) {
                document.getElementById(
                    "allowOutOfStock"
                ).checked = settings.allowOutOfStock;
            }

            if (settings.paymentTimeout !== undefined) {
                document.getElementById(
                    "paymentTimeout"
                ).value = settings.paymentTimeout;
            }


            /* Notifications */

            if (settings.newOrderNotification !== undefined) {
                document.getElementById(
                    "newOrderNotification"
                ).checked =
                    settings.newOrderNotification;
            }

            if (settings.paymentNotification !== undefined) {
                document.getElementById(
                    "paymentNotification"
                ).checked =
                    settings.paymentNotification;
            }

            if (settings.stockNotification !== undefined) {
                document.getElementById(
                    "stockNotification"
                ).checked =
                    settings.stockNotification;
            }

            if (settings.systemNotification !== undefined) {
                document.getElementById(
                    "systemNotification"
                ).checked =
                    settings.systemNotification;
            }


            /* Display */

            if (settings.showStats !== undefined) {
                document.getElementById(
                    "showStats"
                ).checked =
                    settings.showStats;
            }

            if (settings.showActivity !== undefined) {
                document.getElementById(
                    "showActivity"
                ).checked =
                    settings.showActivity;
            }

            if (settings.itemsPerPage !== undefined) {
                document.getElementById(
                    "itemsPerPage"
                ).value =
                    settings.itemsPerPage;
            }


            /* Appearance */

            if (settings.theme) {

                applyTheme(
                    settings.theme
                );

                setActiveTheme(
                    settings.theme
                );

            }

            if (settings.accent) {

                applyAccent(
                    settings.accent
                );

                setActiveAccent(
                    settings.accent
                );

            }

            if (settings.uiDensity !== undefined) {
                document.getElementById(
                    "uiDensity"
                ).value =
                    settings.uiDensity;
            }

            if (settings.borderRadius !== undefined) {
                document.getElementById(
                    "borderRadius"
                ).value =
                    settings.borderRadius;
            }

            if (settings.cardShadow !== undefined) {
                document.getElementById(
                    "cardShadow"
                ).value =
                    settings.cardShadow;
            }

            if (settings.sidebarStyle !== undefined) {
                document.getElementById(
                    "sidebarStyle"
                ).value =
                    settings.sidebarStyle;
            }

            if (settings.fontSize !== undefined) {
                document.getElementById(
                    "fontSize"
                ).value =
                    settings.fontSize;
            }

            if (settings.uiAnimations !== undefined) {
                document.getElementById(
                    "uiAnimations"
                ).checked =
                    settings.uiAnimations;
            }


        } catch (error) {

            console.error(
                "خطا در بارگذاری تنظیمات:",
                error
            );

            loadThemeDefaults();

        }

    }


    /* =========================================
       ACTIVE THEME
    ========================================= */

    function setActiveTheme(theme) {

        themeOptions.forEach(option => {

            option.classList.toggle(
                "active",
                option.dataset.themeOption === theme
            );

        });

    }


    /* =========================================
       ACTIVE ACCENT
    ========================================= */

    function setActiveAccent(color) {

        colorOptions.forEach(option => {

            option.classList.toggle(
                "active",
                option.dataset.color === color
            );

        });

    }


    /* =========================================
       DEFAULT THEME
    ========================================= */

    function loadThemeDefaults() {

        const theme =
            localStorage.getItem(
                "dashboardTheme"
            ) || "light";

        const accent =
            localStorage.getItem(
                "dashboardAccent"
            ) || "blue";


        applyTheme(theme);
        applyAccent(accent);

        setActiveTheme(theme);
        setActiveAccent(accent);

    }


    /* =========================================
       RESET
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

        localStorage.removeItem(
            "dashboardTheme"
        );

        localStorage.removeItem(
            "dashboardAccent"
        );


        location.reload();

    });


    /* =========================================
       INITIAL LOAD
    ========================================= */

    loadSettings();

});