document.addEventListener("DOMContentLoaded", function () {

    const searchInput = document.getElementById("productSearch");
    const categoryFilter = document.getElementById("productCategoryFilter");
    const stockFilter = document.getElementById("productStockFilter");
    const resetButton = document.getElementById("resetProductFilters");

    const tableBody = document.getElementById("productsTableBody");
    const emptyState = document.getElementById("productsEmpty");

    const selectAll = document.getElementById("selectAllProducts");

    const addProductBtn = document.getElementById("addProductBtn");
    const exportProductsBtn = document.getElementById("exportProductsBtn");


    /* =========================================
       FILTER PRODUCTS
    ========================================= */

    function filterProducts() {

        const searchValue = searchInput.value.trim().toLowerCase();
        const categoryValue = categoryFilter.value;
        const stockValue = stockFilter.value;

        const rows = tableBody.querySelectorAll("tr");

        let visibleCount = 0;

        rows.forEach(function (row) {

            const productName =
                row.dataset.product.toLowerCase();

            const productCategory =
                row.dataset.category;

            const productStock =
                row.dataset.stock;


            const matchesSearch =
                productName.includes(searchValue);

            const matchesCategory =
                categoryValue === "all" ||
                productCategory === categoryValue;

            const matchesStock =
                stockValue === "all" ||
                productStock === stockValue;


            if (
                matchesSearch &&
                matchesCategory &&
                matchesStock
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

    }


    /* =========================================
       SEARCH
    ========================================= */

    if (searchInput) {

        searchInput.addEventListener(
            "input",
            filterProducts
        );

    }


    /* =========================================
       CATEGORY FILTER
    ========================================= */

    if (categoryFilter) {

        categoryFilter.addEventListener(
            "change",
            filterProducts
        );

    }


    /* =========================================
       STOCK FILTER
    ========================================= */

    if (stockFilter) {

        stockFilter.addEventListener(
            "change",
            filterProducts
        );

    }


    /* =========================================
       RESET FILTERS
    ========================================= */

    if (resetButton) {

        resetButton.addEventListener("click", function () {

            searchInput.value = "";
            categoryFilter.value = "all";
            stockFilter.value = "all";

            filterProducts();

        });

    }


    /* =========================================
       SELECT ALL
    ========================================= */

    if (selectAll) {

        selectAll.addEventListener("change", function () {

            const checkboxes =
                tableBody.querySelectorAll(".product-checkbox");

            checkboxes.forEach(function (checkbox) {

                const row = checkbox.closest("tr");

                if (row.style.display !== "none") {
                    checkbox.checked = selectAll.checked;
                }

            });

        });

    }


    /* =========================================
       INDIVIDUAL CHECKBOXES
    ========================================= */

    tableBody.addEventListener("change", function (event) {

        if (
            event.target.classList.contains("product-checkbox")
        ) {

            const checkboxes =
                tableBody.querySelectorAll(
                    ".product-checkbox"
                );

            const visibleCheckboxes =
                Array.from(checkboxes).filter(function (checkbox) {

                    return checkbox.closest("tr").style.display !== "none";

                });

            const checkedCheckboxes =
                visibleCheckboxes.filter(function (checkbox) {

                    return checkbox.checked;

                });

            selectAll.checked =
                visibleCheckboxes.length > 0 &&
                checkedCheckboxes.length === visibleCheckboxes.length;

        }

    });


    /* =========================================
       ADD PRODUCT
    ========================================= */

    if (addProductBtn) {

        addProductBtn.addEventListener("click", function () {

            alert(
                "فرم افزودن محصول در مرحله بعدی پروژه اضافه خواهد شد."
            );

        });

    }


    /* =========================================
       EXPORT
    ========================================= */

    if (exportProductsBtn) {

        exportProductsBtn.addEventListener("click", function () {

            alert(
                "خروجی محصولات آماده خواهد شد."
            );

        });

    }


    /* =========================================
       VIEW PRODUCT
    ========================================= */

    tableBody.addEventListener("click", function (event) {

        const viewButton =
            event.target.closest(".view-product");

        if (viewButton) {

            const row =
                viewButton.closest("tr");

            const productName =
                row.dataset.product;

            alert(
                "مشاهده محصول: " + productName
            );

        }

    });


    /* =========================================
       EDIT PRODUCT
    ========================================= */

    tableBody.addEventListener("click", function (event) {

        const editButton =
            event.target.closest(".edit-product");

        if (editButton) {

            const row =
                editButton.closest("tr");

            const productName =
                row.dataset.product;

            alert(
                "ویرایش محصول: " + productName
            );

        }

    });


    /* =========================================
       PAGINATION DEMO
    ========================================= */

    const paginationButtons =
        document.querySelectorAll(".pagination-btn");

    paginationButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            if (
                button.querySelector(".material-icons")
            ) {
                return;
            }

            paginationButtons.forEach(function (item) {

                item.classList.remove("active");

            });

            button.classList.add("active");

        });

    });


    /* =========================================
       INITIAL FILTER
    ========================================= */

    filterProducts();

});