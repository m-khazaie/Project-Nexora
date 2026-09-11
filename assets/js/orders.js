/* =========================================
   ORDERS PAGE
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    const searchInput = document.getElementById("orderSearch");
    const statusFilter = document.getElementById("orderStatusFilter");
    const resetButton = document.getElementById("resetOrders");

    const tableBody = document.getElementById("ordersTableBody");
    const emptyState = document.getElementById("ordersEmpty");

    const selectAll = document.getElementById("selectAllOrders");

    const newOrderBtn = document.getElementById("newOrderBtn");


    /* =========================================
       FILTER ORDERS
    ========================================= */

    function filterOrders() {

        const searchValue =
            searchInput.value.trim().toLowerCase();

        const selectedStatus =
            statusFilter.value;

        const rows =
            tableBody.querySelectorAll("tr");

        let visibleCount = 0;


        rows.forEach(row => {

            const searchData =
                row.dataset.search.toLowerCase();

            const status =
                row.dataset.status;


            const matchesSearch =
                searchData.includes(searchValue);

            const matchesStatus =
                selectedStatus === "all" ||
                status === selectedStatus;


            if (matchesSearch && matchesStatus) {

                row.style.display = "";
                visibleCount++;

            } else {

                row.style.display = "none";

            }

        });


        if (visibleCount === 0) {

            emptyState.classList.add("show");

        } else {

            emptyState.classList.remove("show");

        }

    }


    /* =========================================
       SEARCH
    ========================================= */

    if (searchInput) {

        searchInput.addEventListener(
            "input",
            filterOrders
        );

    }


    /* =========================================
       STATUS FILTER
    ========================================= */

    if (statusFilter) {

        statusFilter.addEventListener(
            "change",
            filterOrders
        );

    }


    /* =========================================
       RESET
    ========================================= */

    if (resetButton) {

        resetButton.addEventListener("click", () => {

            searchInput.value = "";
            statusFilter.value = "all";

            filterOrders();

        });

    }


    /* =========================================
       SELECT ALL
    ========================================= */

    if (selectAll) {

        selectAll.addEventListener("change", () => {

            const checkboxes =
                tableBody.querySelectorAll(
                    'input[type="checkbox"]'
                );


            checkboxes.forEach(checkbox => {

                const row =
                    checkbox.closest("tr");


                if (
                    row &&
                    row.style.display !== "none"
                ) {

                    checkbox.checked =
                        selectAll.checked;

                }

            });

        });

    }


    /* =========================================
       NEW ORDER
    ========================================= */

    if (newOrderBtn) {

        newOrderBtn.addEventListener("click", () => {

            alert(
                "فرم ثبت سفارش جدید در مرحله تکمیل صفحات اضافه خواهد شد."
            );

        });

    }


    /* =========================================
       ORDER DETAILS
    ========================================= */

    const detailButtons =
        document.querySelectorAll(".table-action");


    detailButtons.forEach(button => {

        button.addEventListener("click", () => {

            const row =
                button.closest("tr");

            const orderNumber =
                row.querySelector("td:nth-child(2)")
                   ?.innerText
                   .trim();

            alert(
                `جزئیات سفارش ${orderNumber} در نسخه بعدی اضافه خواهد شد.`
            );

        });

    });


    /* =========================================
       PAGINATION DEMO
    ========================================= */

    const paginationButtons =
        document.querySelectorAll(
            ".pagination-btn:not(.disabled)"
        );


    paginationButtons.forEach(button => {

        button.addEventListener("click", () => {

            if (
                button.querySelector(".material-icons")
            ) {
                return;
            }


            document
                .querySelectorAll(".pagination-btn")
                .forEach(btn => {

                    btn.classList.remove("active");

                });


            button.classList.add("active");

        });

    });

});