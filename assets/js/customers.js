
/* =========================================
   CUSTOMERS PAGE
========================================= */

document.addEventListener("DOMContentLoaded", () => {


    /* =========================================
       ELEMENTS
    ========================================= */

    const searchInput =
        document.getElementById("customerSearch");

    const statusFilter =
        document.getElementById("customerStatusFilter");

    const resetButton =
        document.getElementById("resetCustomerFilter");

    const tableBody =
        document.getElementById("customersTableBody");

    const emptyState =
        document.getElementById("customersEmpty");

    const addCustomerButton =
        document.getElementById("addCustomerBtn");


    if (!tableBody) return;


    const rows =
        Array.from(
            tableBody.querySelectorAll("tr")
        );



    /* =========================================
       FILTER CUSTOMERS
    ========================================= */

    function filterCustomers() {

        const searchValue =
            searchInput
                ? searchInput.value
                    .trim()
                    .toLowerCase()
                : "";


        const statusValue =
            statusFilter
                ? statusFilter.value
                : "all";


        let visibleCount = 0;


        rows.forEach(row => {

            const customerName =
                (
                    row.dataset.customer || ""
                ).toLowerCase();


            const rowText =
                row.textContent.toLowerCase();


            const customerStatus =
                row.dataset.status || "";


            const matchesSearch =
                !searchValue ||
                customerName.includes(searchValue) ||
                rowText.includes(searchValue);


            const matchesStatus =
                statusValue === "all" ||
                customerStatus === statusValue;


            if (
                matchesSearch &&
                matchesStatus
            ) {

                row.style.display = "";

                visibleCount++;

            } else {

                row.style.display = "none";

            }

        });


        /*
         * Empty state
         */

        if (emptyState) {

            if (visibleCount === 0) {

                emptyState.classList.add("show");

            } else {

                emptyState.classList.remove("show");

            }

        }

    }



    /* =========================================
       SEARCH
    ========================================= */

    if (searchInput) {

        searchInput.addEventListener(
            "input",
            filterCustomers
        );

    }



    /* =========================================
       STATUS FILTER
    ========================================= */

    if (statusFilter) {

        statusFilter.addEventListener(
            "change",
            filterCustomers
        );

    }



    /* =========================================
       RESET FILTER
    ========================================= */

    if (resetButton) {

        resetButton.addEventListener(
            "click",
            () => {

                if (searchInput) {

                    searchInput.value = "";

                }


                if (statusFilter) {

                    statusFilter.value = "all";

                }


                filterCustomers();

            }
        );

    }



    /* =========================================
       ADD CUSTOMER
    ========================================= */

    if (addCustomerButton) {

        addCustomerButton.addEventListener(
            "click",
            () => {

                alert(
                    "بخش افزودن مشتری در مرحله بعدی فعال می‌شود."
                );

            }
        );

    }



    /* =========================================
       VIEW CUSTOMER
    ========================================= */

    document
        .querySelectorAll(".view-customer")
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    const row =
                        button.closest("tr");


                    const name =
                        row?.dataset.customer ||
                        "مشتری";


                    alert(
                        `مشاهده جزئیات مشتری: ${name}`
                    );

                }
            );

        });



    /* =========================================
       EDIT CUSTOMER
    ========================================= */

    document
        .querySelectorAll(".edit-customer")
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    const row =
                        button.closest("tr");


                    const name =
                        row?.dataset.customer ||
                        "مشتری";


                    alert(
                        `ویرایش اطلاعات مشتری: ${name}`
                    );

                }
            );

        });



    /* =========================================
       PAGINATION DEMO
    ========================================= */

    document
        .querySelectorAll(".pagination-btn")
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    if (
                        button.disabled ||
                        button.classList.contains("active")
                    ) {

                        return;

                    }


                    document
                        .querySelectorAll(
                            ".pagination-btn"
                        )
                        .forEach(btn => {

                            btn.classList.remove(
                                "active"
                            );

                        });


                    button.classList.add("active");

                }
            );

        });



    /* =========================================
       INITIAL FILTER
    ========================================= */

    filterCustomers();

});

