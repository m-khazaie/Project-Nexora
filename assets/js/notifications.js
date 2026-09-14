
/* =========================================
   NOTIFICATIONS PAGE
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    const list = document.getElementById("notificationsList");
    const emptyState = document.getElementById("emptyNotifications");

    const unreadCount = document.getElementById("unreadCount");
    const unreadFilterCount = document.getElementById("unreadFilterCount");
    const allCount = document.getElementById("allCount");

    const sidebarBadge = document.getElementById("sidebarBadge");

    const markAllBtn = document.getElementById("markAllBtn");

    const filterButtons =
        document.querySelectorAll(".filter-btn");


    /* =========================================
       GET NOTIFICATIONS
    ========================================= */

    function getNotifications() {
        return document.querySelectorAll(".notification-card");
    }


    /* =========================================
       UPDATE COUNTS
    ========================================= */

    function updateCounts() {

        const notifications = getNotifications();

        const total = notifications.length;

        const unread =
            document.querySelectorAll(
                ".notification-card.unread"
            ).length;

        unreadCount.textContent = unread;
        unreadFilterCount.textContent = unread;
        allCount.textContent = total;

        /* Sidebar badge */

        if (unread > 0) {

            sidebarBadge.textContent = unread;
            sidebarBadge.style.display = "inline-flex";

        } else {

            sidebarBadge.style.display = "none";

        }

        checkEmptyState();
    }


    /* =========================================
       EMPTY STATE
    ========================================= */

    function checkEmptyState() {

        const visibleNotifications =
            Array.from(getNotifications())
                .filter(notification =>
                    !notification.classList.contains("hidden")
                );

        if (visibleNotifications.length === 0) {

            emptyState.classList.add("show");

        } else {

            emptyState.classList.remove("show");

        }
    }


    /* =========================================
       FILTER
    ========================================= */

    function filterNotifications(filter) {

        const notifications = getNotifications();

        notifications.forEach(notification => {

            const type =
                notification.dataset.type;

            const isUnread =
                notification.classList.contains("unread");

            let show = true;


            if (filter === "unread") {

                show = isUnread;

            } else if (
                filter !== "all" &&
                type !== filter
            ) {

                show = false;

            }


            notification.classList.toggle(
                "hidden",
                !show
            );

        });

        checkEmptyState();
    }


    /* =========================================
       FILTER BUTTONS
    ========================================= */

    filterButtons.forEach(button => {

        button.addEventListener("click", () => {

            filterButtons.forEach(btn => {
                btn.classList.remove("active");
            });

            button.classList.add("active");

            const filter =
                button.dataset.filter;

            filterNotifications(filter);

        });

    });


    /* =========================================
       MARK AS READ
    ========================================= */

    function markAsRead(notification) {

        if (!notification.classList.contains("unread")) {
            return;
        }

        notification.classList.remove("unread");

        const status =
            notification.querySelector(
                ".notification-status"
            );

        if (status) {
            status.remove();
        }

        updateCounts();
    }


    /* =========================================
       READ BUTTON
    ========================================= */

    list.addEventListener("click", event => {

        const readButton =
            event.target.closest(".read-btn");

        if (!readButton) {
            return;
        }

        const notification =
            readButton.closest(".notification-card");

        if (!notification) {
            return;
        }

        markAsRead(notification);

    });


    /* =========================================
       DELETE NOTIFICATION
    ========================================= */

    list.addEventListener("click", event => {

        const deleteButton =
            event.target.closest(".delete-btn");

        if (!deleteButton) {
            return;
        }

        const notification =
            deleteButton.closest(".notification-card");

        if (!notification) {
            return;
        }

        notification.classList.add("removing");

        setTimeout(() => {

            notification.remove();

            updateCounts();

        }, 220);

    });


    /* =========================================
       MARK ALL AS READ
    ========================================= */

    markAllBtn.addEventListener("click", () => {

        const unreadNotifications =
            document.querySelectorAll(
                ".notification-card.unread"
            );

        unreadNotifications.forEach(notification => {

            notification.classList.remove("unread");

            const status =
                notification.querySelector(
                    ".notification-status"
                );

            if (status) {
                status.remove();
            }

        });

        updateCounts();

    });


    /* =========================================
       INITIAL UPDATE
    ========================================= */

    updateCounts();

});

