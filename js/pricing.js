/* Pricing page — billing toggle */
(function () {
  document.addEventListener('DOMContentLoaded', function () {
    var toggle = document.getElementById('billingToggle');
    var amounts = document.querySelectorAll('.plan-price .amount[data-monthly]');
    var labelMonthly = document.getElementById('labelMonthly');
    var labelYearly = document.getElementById('labelYearly');
    var growthCycle = document.getElementById('growthCycle');
    if (!toggle) return;

    function setYearly(yearly) {
      toggle.setAttribute('aria-pressed', yearly ? 'true' : 'false');
      labelMonthly.classList.toggle('active', !yearly);
      labelYearly.classList.toggle('active', yearly);
      if (growthCycle) growthCycle.textContent = yearly ? 'annually' : 'monthly';
      amounts.forEach(function (el) {
        var val = yearly ? el.dataset.yearly : el.dataset.monthly;
        if (val === '0') { el.textContent = '0'; return; }
        // animate
        var start = parseInt(el.textContent.replace(/[^0-9]/g, ''), 10) || 0;
        var end = parseInt(val, 10);
        var t0 = null, dur = 500;
        function step(ts) {
          if (!t0) t0 = ts;
          var p = Math.min((ts - t0) / dur, 1);
          var eased = 1 - Math.pow(1 - p, 3);
          el.textContent = Math.round(start + (end - start) * eased);
          if (p < 1) requestAnimationFrame(step);
        }
        requestAnimationFrame(step);
      });
    }

    toggle.addEventListener('click', function () {
      setYearly(toggle.getAttribute('aria-pressed') !== 'true');
    });
  });
})();


// ==============
/*====================================
        ROI CALCULATOR
====================================*/

const teamSlider = document.getElementById("teamSize");
const teamValue = document.getElementById("teamValue");

const monthlyEvents = document.getElementById("monthlyEvents");
const currentCost = document.getElementById("currentCost");

const savingAmount = document.getElementById("savingAmount");
const timeSaved = document.getElementById("timeSaved");
const roiValue = document.getElementById("roiValue");
const productivity = document.getElementById("productivity");

const calculateBtn = document.querySelector(".calculate-btn");

/*==============================
        UPDATE TEAM SIZE
==============================*/

teamSlider.addEventListener("input", () => {

    teamValue.textContent = teamSlider.value + " Members";

    calculateROI();

});

/*==============================
        OTHER INPUTS
==============================*/

monthlyEvents.addEventListener("change", calculateROI);
currentCost.addEventListener("input", calculateROI);

calculateBtn.addEventListener("click", calculateROI);

/*==============================
        CALCULATE
==============================*/

function calculateROI(){

    const team = Number(teamSlider.value);

    const cost = Number(currentCost.value);

    const eventMultiplier = {

        "1 Million":1,
        "5 Million":1.2,
        "15 Million":1.5,
        "30 Million":1.8,
        "50 Million":2.2,
        "100 Million+":2.8

    };

    const multiplier = eventMultiplier[monthlyEvents.value];

    const savings = Math.round((cost * 1.65) * multiplier);

    const hours = Math.round((team * 3.5) * multiplier);

    const roi = Math.round(((savings / Math.max(cost, 1)) * 100));

    const productivityGain = Math.round(25 + (team / 10));

    animateMoney(savingAmount, savings);

    animateNumber(timeSaved, hours, " hrs");

    animateNumber(roiValue, roi, "%");

    animateNumber(productivity, productivityGain, "%", "+");

}

/*==============================
        MONEY ANIMATION
==============================*/

function animateMoney(element,target){

    let start = 0;

    const duration = 1000;

    const increment = target / (duration/16);

    const timer = setInterval(()=>{

        start += increment;

        if(start>=target){

            start = target;

            clearInterval(timer);

        }

        element.textContent =
        "$" + Math.round(start).toLocaleString();

    },16);

}

/*==============================
        NUMBER ANIMATION
==============================*/

function animateNumber(element,target,suffix="",prefix=""){

    let start = 0;

    const duration = 1000;

    const increment = target / (duration/16);

    const timer = setInterval(()=>{

        start += increment;

        if(start>=target){

            start = target;

            clearInterval(timer);

        }

        element.textContent =
        prefix + Math.round(start) + suffix;

    },16);

}

/*==============================
        INITIAL LOAD
==============================*/

calculateROI();