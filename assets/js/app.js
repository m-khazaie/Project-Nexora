
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

