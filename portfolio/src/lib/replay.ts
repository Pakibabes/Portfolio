export function replayCinematicIntro() {
  if (typeof window === "undefined") return;

  try {
    sessionStorage.removeItem("singularity_breached");
    sessionStorage.removeItem("hero_elements_entered");

    document.documentElement.classList.remove(
      "intro-breached",
      "entrance-nav",
      "entrance-hero",
      "entrance-bottom",
      "hero-elements-entered",
    );

    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
    window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
  } catch {
    // sessionStorage or DOM access unavailable
  }

  // If there's an anchor hash (e.g. #contact), navigate back to the root URL
  if (window.location.hash) {
    window.location.href = window.location.pathname;
  } else {
    window.location.reload();
  }
}
