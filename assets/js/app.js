if (window.location.pathname.endsWith("/index.html")) {
  window.history.replaceState(
    {},
    document.title,
    window.location.pathname.replace(/index\.html$/, "")
  );
}

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  const { hash } = new URL(anchor.href);
  if (!hash) return;
  const element = document.querySelector(hash);
  if (!element) return;

  anchor.addEventListener("click", (e) => {
    e.preventDefault();
    element.scrollIntoView({ behavior: "smooth", inline: "start" });
  });
});

function updateAddressText() {
  const span = document.querySelector(".address");
  if (!span) return;
  if (!span.dataset.originalText) {
    span.dataset.originalText = span.textContent;
  }
  span.style.transition = "opacity 200ms ease";
  span.style.opacity = "0";
  setTimeout(() => {
    if (span.classList.contains("contract_copied")) {
      span.textContent = "Copied";
    } else {
      span.textContent = span.dataset.originalText;
    }
    span.style.opacity = "1";
  }, 300);
}

document.querySelectorAll(".buy__ca").forEach((root) => {
  const span = root.querySelector(".address");
  const contract = span?.textContent.trim();
  const copy = root.querySelector(".copy__button");
  if (!contract || !copy) return;

  copy.addEventListener("click", (e) => {
    e.preventDefault();

    window.navigator.clipboard
      .writeText(contract)
      .then(() => {
        span.classList.add("contract_copied");
        updateAddressText();
        setTimeout(() => {
          span.classList.remove("contract_copied");
          updateAddressText();
        }, 2000);
      })
      .catch((err) => {
        console.error(err);
        alert("Error!");
      });
  });
});

document.querySelectorAll(".faq__question").forEach((button) => {
  button.addEventListener("click", () => {
    const faqItem = button.closest(".faq__item");
    const answer = faqItem.querySelector(".faq__answer");
    const arrow = button.querySelector("img");
    answer.classList.toggle("active");
    if (answer.classList.contains("active")) {
      arrow.classList.remove("closed");
      arrow.classList.add("open");
    } else {
      arrow.classList.remove("open");
      arrow.classList.add("closed");
    }
  });
});
