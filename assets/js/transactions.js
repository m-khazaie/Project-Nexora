document.addEventListener("DOMContentLoaded", function () {

    const searchInput =
        document.getElementById("transactionSearch");

    const statusFilter =
        document.getElementById("transactionStatusFilter");

    const methodFilter =
        document.getElementById("transactionMethodFilter");

    const resetButton =
        document.getElementById("resetTransactionFilters");

    const tableBody =
        document.getElementById("transactionsTableBody");

    const emptyState =
        document.getElementById("transactionsEmpty");

    const selectAll =
        document.getElementById("selectAllTransactions");

    const exportButton =
        document.getElementById("exportTransactionsBtn");


    /* =========================================
       FILTER TRANSACTIONS
    ========================================= */

    function filterTransactions() {

        const searchValue =
            searchInput.value.trim().toLowerCase();

        const statusValue =
            statusFilter.value;

        const methodValue =
            methodFilter.value;

        const rows =
            tableBody.querySelectorAll("tr");

        let visibleCount = 0;


        rows.forEach(function (row) {

            const searchData =
                row.dataset.search.toLowerCase();

            const transactionStatus =
                row.dataset.status;

            const transactionMethod =
                row.dataset.method;


            const matchesSearch =
                searchData.includes(searchValue);

            const matchesStatus =
                statusValue === "all" ||
                transactionStatus === statusValue;

            const matchesMethod =
                methodValue === "all" ||
                transactionMethod === methodValue;


            if (
                matchesSearch &&
                matchesStatus &&
                matchesMethod
            ) {

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


        updateSelectAll();

    }


    /* =========================================
       SEARCH
    ========================================= */

    searchInput.addEventListener(
        "input",
        filterTransactions
    );


    /* =========================================
       STATUS
    ========================================= */

    statusFilter.addEventListener(
        "change",
        filterTransactions
    );


    /* =========================================
       METHOD
    ========================================= */

    methodFilter.addEventListener(
        "change",
        filterTransactions
    );


    /* =========================================
       RESET
    ========================================= */

    resetButton.addEventListener("click", function () {

        searchInput.value = "";

        statusFilter.value = "all";

        methodFilter.value = "all";

        selectAll.checked = false;

        filterTransactions();

    });


    /* =========================================
       SELECT ALL
    ========================================= */

    selectAll.addEventListener("change", function () {

        const checkboxes =
            tableBody.querySelectorAll(
                ".transaction-checkbox"
            );


        checkboxes.forEach(function (checkbox) {

            const row =
                checkbox.closest("tr");

            if (row.style.display !== "none") {

                checkbox.checked =
                    selectAll.checked;

            }

        });

    });


    /* =========================================
       UPDATE SELECT ALL
    ========================================= */

    function updateSelectAll() {

        const checkboxes =
            Array.from(
                tableBody.querySelectorAll(
                    ".transaction-checkbox"
                )
            );


        const visibleCheckboxes =
            checkboxes.filter(function (checkbox) {

                return (
                    checkbox.closest("tr").style.display !== "none"
                );

            });


        const checkedCheckboxes =
            visibleCheckboxes.filter(function (checkbox) {

                return checkbox.checked;

            });


        selectAll.checked =
            visibleCheckboxes.length > 0 &&
            checkedCheckboxes.length ===
            visibleCheckboxes.length;

    }


    /* =========================================
       INDIVIDUAL CHECKBOX
    ========================================= */

    tableBody.addEventListener("change", function (event) {

        if (
            event.target.classList.contains(
                "transaction-checkbox"
            )
        ) {

            updateSelectAll();

        }

    });


    /* =========================================
       VIEW TRANSACTION
    ========================================= */

    tableBody.addEventListener("click", function (event) {

        const viewButton =
            event.target.closest(".view-transaction");


        if (!viewButton) {
            return;
        }


        const row =
            viewButton.closest("tr");


        const transactionId =
            row.dataset.search.split(" ")[0];


        alert(
            "جزئیات تراکنش: " +
            transactionId
        );

    });


    /* =========================================
       EXPORT
    ========================================= */

    exportButton.addEventListener("click", function () {

        alert(
            "خروجی تراکنش‌ها در مرحله بعدی تکمیل خواهد شد."
        );

    });


    /* =========================================
       PAGINATION
    ========================================= */

    const paginationButtons =
        document.querySelectorAll(
            ".pagination-btn"
        );


    paginationButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            const icon =
                button.querySelector(".material-icons");


            if (icon) {
                return;
            }


            paginationButtons.forEach(
                function (item) {

                    item.classList.remove("active");

                }
            );


            button.classList.add("active");

        });

    });


    /* =========================================
       INITIAL FILTER
    ========================================= */

    filterTransactions();

});