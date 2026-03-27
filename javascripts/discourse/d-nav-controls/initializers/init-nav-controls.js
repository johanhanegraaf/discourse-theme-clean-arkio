import { withPluginApi } from "discourse/lib/plugin-api";

export default {
  name: "discourse-navigation-controls",

  initialize() {
    withPluginApi("0.8.13", (api) => {
      const isMobileView = () => {
        return (
          document.body.classList.contains("mobile-view") ||
          document.documentElement.classList.contains("mobile-view") ||
          window.matchMedia?.("(max-width: 767px)")?.matches
        );
      };

      if (!isMobileView()) {
        return;
      }

      const body = document.body;
      let lastScrollTop = 0;
      const hiddenNavClass = "nav-controls-hidden";

      const addClassOnScroll = () => body.classList.add(hiddenNavClass);
      const removeClassOnScroll = () =>
        body.classList.remove(hiddenNavClass);

      window.addEventListener(
        "scroll",
        function () {
          const scrollTop = window.scrollY;
          // Re-check mobile-ness during rendering/scroll to avoid
          // static viewport assumptions and stay correct on resize.
          if (!isMobileView()) {
            return;
          }

          if (
            lastScrollTop < scrollTop &&
            scrollTop > 0 &&
            !body.classList.contains(hiddenNavClass)
          ) {
            addClassOnScroll();
          } else if (
            lastScrollTop > scrollTop &&
            body.classList.contains(hiddenNavClass)
          ) {
            removeClassOnScroll();
          }
          lastScrollTop = scrollTop;
        },
        { passive: true }
      );
    });
  },
};
