import { LinkedInTag } from "linkedin-insight-tag";

LinkedInTag.init({ partnerId: "12345678", debug: true });

document.getElementById("signup-btn")?.addEventListener("click", () => {
  LinkedInTag.track("signup-001");
});

document.getElementById("buy-btn")?.addEventListener("click", () => {
  LinkedInTag.trackPurchase("purchase-001", {
    value: 99.99,
    currency: "USD",
  });
});

document.getElementById("lead-btn")?.addEventListener("click", () => {
  LinkedInTag.trackLead("lead-001");
});
