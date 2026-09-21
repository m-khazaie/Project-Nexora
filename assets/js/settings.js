/* =========================================
   SETTINGS PAGE
   Integrated Version
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

            applyTheme(
                option.dataset.themeOption
            );

        });

    });


    /* =========================================
       ACCENT OPTIONS
    ========================================= */

    const colorOptions =
        document.querySelectorAll(".color-option");

    colorOptions.forEach(option => {

        option.addEventListener("click", () => {

            colorOptions.forEach(item => {
                item.classList.remove("active");
            });

            option.classList.add("active");

            applyAccent(
                option.dataset.color
            );

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

    if (saveButton) {

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
                    document.getElementById(
                        "storeName"
                    ).value,

                storeEmail:
                    document.getElementById(
                        "storeEmail"
                    ).value,

                storePhone:
                    document.getElementById(
                        "storePhone"
                    ).value,

                currency:
                    document.getElementById(
                        "currency"
                    ).value,

                storeAddress:
                    document.getElementById(
                        "storeAddress"
                    ).value,


                /* Orders */

                autoConfirm:
                    document.getElementById(
                        "autoConfirm"
                    ).checked,

                allowCancel:
                    document.getElementById(
                        "allowCancel"
                    ).checked,

                allowOutOfStock:
                    document.getElementById(
                        "allowOutOfStock"
                    ).checked,

                paymentTimeout:
                    document.getElementById(
                        "paymentTimeout"
                    ).value,


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


            /* =====================================
               SAVE MAIN SETTINGS
            ===================================== */

            localStorage.setItem(
                "dashboardSettings",
                JSON.stringify(settings)
            );


            /* =====================================
               SAVE GLOBAL THEME
            ===================================== */

            localStorage.setItem(
                "dashboardTheme",
                settings.theme
            );


            localStorage.setItem(
                "dashboardAccent",
                settings.accent
            );


            /* Apply immediately */

            applyTheme(settings.theme);

            applyAccent(settings.accent);


            showSaveMessage();

        });

    }


    /* =========================================
       SAVE MESSAGE
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

            const savedTheme =
                localStorage.getItem(
                    "dashboardTheme"
                ) || "light";

            const savedAccent =
                localStorage.getItem(
                    "dashboardAccent"
                ) || "blue";


            applyTheme(savedTheme);
            applyAccent(savedAccent);

            return;

        }


        try {

            const settings =
                JSON.parse(saved);


            /* =====================================
               STORE
            ===================================== */

            setValue(
                "storeName",
                settings.storeName
            );

            setValue(
                "storeEmail",
                settings.storeEmail
            );

            setValue(
                "storePhone",
                settings.storePhone
            );

            setValue(
                "currency",
                settings.currency
            );

            setValue(
                "storeAddress",
                settings.storeAddress
            );


            /* =====================================
               ORDERS
            ===================================== */

            setChecked(
                "autoConfirm",
                settings.autoConfirm
            );

            setChecked(
                "allowCancel",
                settings.allowCancel
            );

            setChecked(
                "allowOutOfStock",
                settings.allowOutOfStock
            );

            setValue(
                "paymentTimeout",
                settings.paymentTimeout
            );


            /* =====================================
               NOTIFICATIONS
            ===================================== */

            setChecked(
                "newOrderNotification",
                settings.newOrderNotification
            );

            setChecked(
                "paymentNotification",
                settings.paymentNotification
            );

            setChecked(
                "stockNotification",
                settings.stockNotification
            );

            setChecked(
                "systemNotification",
                settings.systemNotification
            );


            /* =====================================
               DISPLAY
            ===================================== */

            setChecked(
                "showStats",
                settings.showStats
            );

            setChecked(
                "showActivity",
                settings.showActivity
            );

            setValue(
                "itemsPerPage",
                settings.itemsPerPage
            );


            /* =====================================
               APPEARANCE
            ===================================== */

            setValue(
                "uiDensity",
                settings.uiDensity
            );

            setValue(
                "borderRadius",
                settings.borderRadius
            );

            setValue(
                "cardShadow",
                settings.cardShadow
            );

            setValue(
                "sidebarStyle",
                settings.sidebarStyle
            );

            setValue(
                "fontSize",
                settings.fontSize
            );

            setChecked(
                "uiAnimations",
                settings.uiAnimations
            );


            /* =====================================
               THEME
            ===================================== */

            const theme =
                settings.theme || "light";

            const accent =
                settings.accent || "blue";


            themeOptions.forEach(option => {

                option.classList.toggle(
                    "active",
                    option.dataset.themeOption === theme
                );

            });


            colorOptions.forEach(option => {

                option.classList.toggle(
                    "active",
                    option.dataset.color === accent
                );

            });


            applyTheme(theme);
            applyAccent(accent);


        } catch (error) {

            console.error(
                "خطا در بارگذاری تنظیمات:",
                error
            );

        }

    }


    /* =========================================
       SAFE VALUE
    ========================================= */

    function setValue(id, value) {

        const element =
            document.getElementById(id);

        if (
            element &&
            value !== undefined
        ) {

            element.value = value;

        }

    }


    /* =========================================
       SAFE CHECKBOX
    ========================================= */

    function setChecked(id, value) {

        const element =
            document.getElementById(id);

        if (
            element &&
            value !== undefined
        ) {

            element.checked = value;

        }

    }


    /* =========================================
       RESET SETTINGS
    ========================================= */

    if (resetButton) {

        resetButton.addEventListener(
            "click",
            () => {

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

            }
        );

    }


    /* =========================================
       INITIAL LOAD
    ========================================= */

    loadSettings();

});