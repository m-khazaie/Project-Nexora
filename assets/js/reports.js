
/* =========================================
   REPORTS PAGE
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================
       CURRENT DATE
    ====================================== */

    const currentDate = document.getElementById("currentDate");

    if (currentDate) {

        const now = new Date();

        currentDate.textContent = new Intl.DateTimeFormat("fa-IR", {
            weekday: "long",
            day: "numeric",
            month: "long"
        }).format(now);

    }


    /* =====================================
       NUMBER ANIMATION
    ====================================== */

    const reportNumbers = document.querySelectorAll(
        ".report-card-content strong[data-value]"
    );

    reportNumbers.forEach((element) => {

        const target = Number(element.dataset.value);

        if (!target) {
            element.textContent = "۰";
            return;
        }

        let current = 0;

        const duration = 900;
        const startTime = performance.now();

        function animate(time) {

            const progress = Math.min(
                (time - startTime) / duration,
                1
            );

            current = Math.floor(target * progress);

            element.textContent = current.toLocaleString("fa-IR");

            if (progress < 1) {
                requestAnimationFrame(animate);
            }

        }

        requestAnimationFrame(animate);

    });


    /* =====================================
       REPORT FILTER
    ====================================== */

    const reportType = document.getElementById("reportType");
    const reportPeriod = document.getElementById("reportPeriod");
    const applyFilter = document.getElementById("applyFilter");

    if (applyFilter) {

        applyFilter.addEventListener("click", () => {

            const type = reportType?.value || "all";
            const period = reportPeriod?.value || "month";

            const typeNames = {
                all: "همه گزارش‌ها",
                sales: "گزارش فروش",
                orders: "گزارش سفارش‌ها",
                customers: "گزارش مشتریان",
                products: "گزارش محصولات"
            };

            const periodNames = {
                week: "هفته جاری",
                month: "ماه جاری",
                quarter: "سه ماه اخیر",
                year: "سال جاری"
            };

            alert(
                `فیلتر گزارش اعمال شد.\n\n` +
                `نوع گزارش: ${typeNames[type]}\n` +
                `بازه زمانی: ${periodNames[period]}`
            );

        });

    }


    /* =====================================
       EXPORT REPORT
    ====================================== */

    const exportReport = document.getElementById("exportReport");

    if (exportReport) {

        exportReport.addEventListener("click", () => {

            alert(
                "گزارش آماده خروجی است.\n\n" +
                "در نسخه بعدی می‌توان خروجی Excel یا PDF را اضافه کرد."
            );

        });

    }


    /* =====================================
       VIEW ALL REPORTS
    ====================================== */

    const viewAllReports = document.getElementById("viewAllReports");

    if (viewAllReports) {

        viewAllReports.addEventListener("click", () => {

            alert(
                "صفحه جزئیات گزارش‌ها در مرحله بعدی قابل توسعه است."
            );

        });

    }


    /* =====================================
       MINI REPORT ACTIONS
    ====================================== */

    const actionButtons = document.querySelectorAll(".icon-action");

    actionButtons.forEach((button) => {

        button.addEventListener("click", () => {

            alert("گزینه‌های بیشتر گزارش در نسخه بعدی اضافه می‌شود.");

        });

    });

});

