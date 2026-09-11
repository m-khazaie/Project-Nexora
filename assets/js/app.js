
/* =========================================
   Persian Dashboard
   App Controller
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =========================================
       ELEMENTS
    ========================================= */

    const sidebar =
        document.getElementById("sidebar");

    const overlay =
        document.getElementById("sidebarOverlay");

    const mobileMenuBtn =
        document.getElementById("mobileMenuBtn");

    const navItems =
        document.querySelectorAll(".nav-item");

    const mobileNavItems =
        document.querySelectorAll(".mobile-nav-item");


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

        overlay.addEventListener(
            "click",
            closeSidebar
        );

    }



    /* =========================================
       SIDEBAR NAVIGATION
    ========================================= */

    const currentPage =
        window.location.pathname
            .split("/")
            .pop() || "index.html";


    /*
     * تعیین خودکار صفحه فعال
     */

    navItems.forEach(item => {

        const href =
            item.getAttribute("href");

        if (
            href &&
            href !== "#" &&
            href === currentPage
        ) {

            item.classList.add("active");

        }

    });


    /*
     * لینک‌های واقعی نباید preventDefault داشته باشند
     */

    navItems.forEach(item => {

        item.addEventListener("click", event => {

            const href =
                item.getAttribute("href");


            /*
             * اگر لینک واقعی است:
             * اجازه بده مرورگر خودش صفحه را باز کند.
             */

            if (
                href &&
                href !== "#" &&
                !href.startsWith("javascript:")
            ) {

                /*
                 * فقط برای ظاهر Active
                 */

                navItems.forEach(nav => {

                    nav.classList.remove("active");

                });

                item.classList.add("active");


                /*
                 * بستن Sidebar در موبایل
                 */

                if (window.innerWidth <= 760) {

                    closeSidebar();

                }


                return;

            }


            /*
             * لینک‌هایی که هنوز صفحه ندارند
             */

            event.preventDefault();

            navItems.forEach(nav => {

                nav.classList.remove("active");

            });

            item.classList.add("active");

        });

    });



    /* =========================================
       MOBILE NAVIGATION
    ========================================= */

    mobileNavItems.forEach(item => {

        item.addEventListener("click", event => {

            /*
             * دکمه + فقط یک دکمه است
             */

            if (
                item.classList.contains("mobile-add")
            ) {

                event.preventDefault();

                return;

            }


            const href =
                item.getAttribute("href");


            /*
             * اگر لینک واقعی است،
             * اجازه بده مرورگر Navigate کند.
             */

            if (
                href &&
                href !== "#" &&
                !href.startsWith("javascript:")
            ) {

                mobileNavItems.forEach(nav => {

                    nav.classList.remove("active");

                });

                item.classList.add("active");

                return;

            }


            /*
             * لینک بدون صفحه
             */

            event.preventDefault();

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


/* =========================================
   CHART DATA
========================================= */

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



/* =========================================
   CHANGE CHART PERIOD
========================================= */

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



/* =========================================
   SIMPLE NUMBER ANIMATION
========================================= */

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



/* =========================================
   ANIMATE DASHBOARD VALUES
========================================= */

document
    .querySelectorAll(".stat-value")
    .forEach(element => {

        animateNumber(element);

    });

