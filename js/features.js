/* Features page — bento cell tilt on pointer (desktop) */
(function () {
  document.addEventListener('DOMContentLoaded', function () {
    var cells = document.querySelectorAll('.bento-cell');
    if (window.matchMedia('(hover: none)').matches) return;
    cells.forEach(function (cell) {
      cell.addEventListener('mousemove', function (e) {
        var r = cell.getBoundingClientRect();
        var x = (e.clientX - r.left) / r.width - 0.5;
        var y = (e.clientY - r.top) / r.height - 0.5;
        cell.style.transform = 'translateY(-6px) perspective(800px) rotateX(' + (-y * 4) + 'deg) rotateY(' + (x * 4) + 'deg)';
      });
      cell.addEventListener('mouseleave', function () {
        cell.style.transform = '';
      });
    });
  });
})();

/*==================================================
        INTERACTIVE PRODUCT DASHBOARD
==================================================*/

document.addEventListener("DOMContentLoaded", () => {

    /*====================================
            KPI COUNTER
    ====================================*/

    const counters = document.querySelectorAll(".counter");

    const animateCounter = (counter) => {

        const target = Number(counter.dataset.target);
        const duration = 1800;

        let start = 0;
        const increment = target / (duration / 16);

        const update = () => {

            start += increment;

            if (start < target) {

                if (target > 1000000) {

                    counter.textContent =
                        "$" + (start / 1000000).toFixed(2) + "M";

                } else {

                    counter.textContent =
                        Math.floor(start).toLocaleString();

                }

                requestAnimationFrame(update);

            } else {

                if (target > 1000000) {

                    counter.textContent =
                        "$" + (target / 1000000).toFixed(2) + "M";

                } else {

                    counter.textContent =
                        target.toLocaleString();

                }

            }

        };

        update();

    };

    const observer = new IntersectionObserver(entries => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                animateCounter(entry.target);

                observer.unobserve(entry.target);

            }

        });

    }, {

        threshold: .5

    });

    counters.forEach(counter => {

        observer.observe(counter);

    });

    /*====================================
            DASHBOARD TILT
    ====================================*/

    const dashboard = document.querySelector(".dashboard-window");

    if (dashboard) {

        dashboard.addEventListener("mousemove", e => {

            const rect = dashboard.getBoundingClientRect();

            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const rotateY =
                ((x / rect.width) - .5) * 8;

            const rotateX =
                ((y / rect.height) - .5) * -8;

            dashboard.style.transform =
                `perspective(1500px)
                 rotateX(${rotateX}deg)
                 rotateY(${rotateY}deg)`;

        });

        dashboard.addEventListener("mouseleave", () => {

            dashboard.style.transform =
                "perspective(1500px) rotateX(0deg) rotateY(0deg)";

        });

    }

    /*====================================
            LIVE ACTIVITY
    ====================================*/

    const activityList =
        document.querySelector(".activity-list");

    const activities = [

        {
            icon: "fa-circle-check",
            text: "Stripe payment synchronized",
            time: "Just now"
        },

        {
            icon: "fa-user-plus",
            text: "New team member joined",
            time: "Just now"
        },

        {
            icon: "fa-chart-line",
            text: "Revenue dashboard updated",
            time: "Just now"
        },

        {
            icon: "fa-brain",
            text: "AI generated forecast",
            time: "Just now"
        },

        {
            icon: "fa-cloud",
            text: "Cloud backup completed",
            time: "Just now"
        },

        {
            icon: "fa-bell",
            text: "Security scan finished",
            time: "Just now"
        }

    ];

    let activityIndex = 0;

    setInterval(() => {

        if (!activityList) return;

        const data = activities[activityIndex];

        const item = document.createElement("div");

        item.className = "activity-item";

        item.innerHTML = `

            <i class="fa-solid ${data.icon}"></i>

            <span>${data.text}</span>

            <small>${data.time}</small>

        `;

        item.style.opacity = "0";
        item.style.transform = "translateY(20px)";

        activityList.prepend(item);

        requestAnimationFrame(() => {

            item.style.transition =
                ".45s ease";

            item.style.opacity = "1";

            item.style.transform =
                "translateY(0)";

        });

        if (activityList.children.length > 5) {

            activityList.removeChild(
                activityList.lastElementChild
            );

        }

        activityIndex++;

        if (activityIndex >= activities.length) {

            activityIndex = 0;

        }

    }, 3500);

    /*====================================
            AI PANEL PULSE
    ====================================*/

    const aiPanel =
        document.querySelector(".ai-panel");

    if (aiPanel) {

        setInterval(() => {

            aiPanel.classList.add("pulse");

            setTimeout(() => {

                aiPanel.classList.remove("pulse");

            }, 900);

        }, 4000);

    }

    /*====================================
            RANDOM KPI FLASH
    ====================================*/

    const cards =
        document.querySelectorAll(".kpi-card");

    setInterval(() => {

        cards.forEach(card => {

            card.classList.remove("active");

        });

        const random =
            Math.floor(Math.random() * cards.length);

        cards[random].classList.add("active");

    }, 2500);

});