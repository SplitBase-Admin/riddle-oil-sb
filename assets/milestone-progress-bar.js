
function updateText(str) {
  const wrapper = document.querySelector(".milestone-progress-bar-wrapper");
  const rebuyWrapper =  document.querySelector("#rebuy-cart");
  const rebuyMilestones = rebuyWrapper.querySelectorAll(".rebuy-cart__progress-step");
  const milestones = JSON.parse(wrapper.dataset.milestones);
  // Extract amount (the $ and digits)
  const amountMatch = str.match(/\$\d+(?:\.\d{2})?/);
  const amount = amountMatch ? amountMatch[0] : null;
  const pdpMilestones = wrapper.querySelectorAll(".rebuy-cart__progress-step");
  let message = wrapper.dataset.defaultMessage, successMessage = wrapper.dataset.successMessage, passedMilestone = 0;
  // Extract text after "from"
  const fromMatch = str.match(/from\s+(.*)/);
  const afterFrom = fromMatch ? fromMatch[1] : null;
  rebuyMilestones.forEach((milestone, index) => {
    if(milestone.classList.contains("complete")) {
      pdpMilestones[index].classList.add("complete")
      passedMilestone++;
    } else {
      pdpMilestones[index].classList.remove("complete")
    }
  })
  if(passedMilestone > (milestones.length - 1)) {
    message = successMessage;
  } else {
    message = message.replace("[X]", amount || milestones[0].amount).replace("[reward]", `<strong>${milestones[passedMilestone].label}</strong>`);
  }
  if(passedMilestone == 0 && milestones[0].amount == 0) {
    message = `Add any product and get <strong>${milestones[0].label}</strong>!`
  }
  document.querySelector(".product-single__form .rebuy-cart__progress-bar-prompt").innerHTML = message;
}

document.addEventListener('rebuy:smartcart.ready', (event) => {
  const pdpProgressBar = document.querySelector(".product-single__form .milestone-progress-bar-wrapper"), rebuyMessage = document.querySelector("#rebuy-cart .rebuy-cart__progress-bar-prompt"), rebuyProgress = document.querySelector("#rebuy-cart .rebuy-cart__progress-bar-meter-fill");
  if(rebuyMessage) {
    pdpProgressBar.classList.remove("hidden");
    pdpProgressBar.querySelector(".milestone-progress-bar-wrapper .rebuy-cart__progress-bar-meter-fill").setAttribute("style", rebuyProgress.getAttribute("style"));
    updateText(rebuyMessage.textContent);
    
    const observer = new MutationObserver((mutationsList) => {
      for (const mutation of mutationsList) {
        if (mutation.type === "attributes" && mutation.attributeName === "style") {
          pdpProgressBar.querySelector(".milestone-progress-bar-wrapper .rebuy-cart__progress-bar-meter-fill").setAttribute("style", rebuyProgress.getAttribute("style"));
          updateText(rebuyMessage.textContent);
        }
      }
    });
    observer.observe(document.querySelector("#rebuy-cart .rebuy-cart__progress-bar-meter-fill"), { attributes: true, attributeFilter: ["style"] });
  }
});