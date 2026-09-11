
/* =========================================
   Persian Dashboard
   App Controller
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    const sidebar = document.getElementById("sidebar");
    const overlay = document.getElementById("sidebarOverlay");
    const mobileMenuBtn = document.getElementById("mobileMenuBtn");



    /* =========================================
       MOBILE SIDEBAR
    ========================================= */

    function openSidebar() {

        if (!sidebar || !overlay) return;

        sidebar.classList.add("open");
        overlay.classList.add("active");

        document.body.style.overflow = "hidden";
    }


    function closeSidebar() {

        if (!sidebar || !overlay) return;

        sidebar.classList.remove("open");
        overlay.classList.remove("active");

        document.body.style.overflow = "";
    }


    if (mobileMenuBtn) {

        mobileMenuBtn.addEventListener("click", () => {

            if (sidebar.classList.contains("open")) {

                closeSidebar();

            } else {

                openSidebar();

            }

        });

    }


    if (overlay) {

        overlay.addEventListener("click", closeSidebar);

    }



    /* =========================================
       SIDEBAR NAVIGATION
    ========================================= */

    const navItems = document.querySelectorAll(".nav-item");

    navItems.forEach(item => {

        item.addEventListener("click", event => {

            event.preventDefault();

            navItems.forEach(nav => {
                nav.classList.remove("active");
            });

            item.classList.add("active");

            /*
             * Close sidebar on mobile
             */
            if (window.innerWidth <= 760) {
                closeSidebar();
            }

        });

    });



    /* =========================================
       MOBILE NAVIGATION
    ========================================= */

    const mobileNavItems =
        document.querySelectorAll(".mobile-nav-item");

    mobileNavItems.forEach(item => {

        item.addEventListener("click", event => {

            event.preventDefault();

            if (item.classList.contains("mobile-add")) {
                return;
            }

            mobileNavItems.forEach(nav => {
                nav.classList.remove("active");
            });

            item.classList.add("active");

        });

    });



    /* =========================================
       ESCAPE KEY
    ========================================= */

    document.addEventListener("keydown", event => {

        if (event.key === "Escape") {

            closeSidebar();

        }

    });



    /* =========================================
       WINDOW RESIZE
    ========================================= */

    window.addEventListener("resize", () => {

        if (window.innerWidth > 760) {

            closeSidebar();

        }

    });

});


/* =========================================
   DASHBOARD
========================================= */

const chartFilters =
    document.querySelectorAll(".chart-filter");

const totalSales =
    document.getElementById("totalSales");


/*
 * Chart data
 */

const chartData = {

    week: {
        sales: "۸۷۶,۵۰۰,۰۰۰ تومان"
    },

    month: {
        sales: "۳,۶۸۵,۲۰۰,۰۰۰ تومان"
    },

    year: {
        sales: "۴۲,۸۷۶,۰۰۰,۰۰۰ تومان"
    }

};


/*
 * Change chart period
 */

chartFilters.forEach(filter => {

    filter.addEventListener("click", () => {

        chartFilters.forEach(item => {
            item.classList.remove("active");
        });

        filter.classList.add("active");

        const period =
            filter.dataset.period;

        if (
            totalSales &&
            chartData[period]
        ) {

            totalSales.textContent =
                chartData[period].sales;

        }

    });

});


/*
 * Simple number animation
 */

function animateNumber(element) {

    if (!element) return;

    const original =
        element.textContent.trim();

    const persianNumbers =
        "۰۱۲۳۴۵۶۷۸۹";

    const englishNumbers =
        "0123456789";

    let numericValue = "";

    for (const character of original) {

        const index =
            persianNumbers.indexOf(character);

        if (index !== -1) {

            numericValue +=
                englishNumbers[index];

        } else if (
            character >= "0" &&
            character <= "9"
        ) {

            numericValue += character;

        }

    }

    const target =
        Number(numericValue);

    if (!target || target <= 0) return;

    const duration = 900;

    const startTime =
        performance.now();

    function update(currentTime) {

        const progress =
            Math.min(
                (currentTime - startTime) / duration,
                1
            );

        const eased =
            1 - Math.pow(1 - progress, 3);

        const current =
            Math.floor(target * eased);

        element.textContent =
            current.toLocaleString("fa-IR");

        if (progress < 1) {

            requestAnimationFrame(update);

        }

    }

    requestAnimationFrame(update);
}


/*
 * Animate dashboard values
 */

document
    .querySelectorAll(".stat-value")
    .forEach(element => {

        animateNumber(element);

    });

