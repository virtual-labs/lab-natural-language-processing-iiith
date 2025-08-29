/**
 * Mobile Detection and Landscape Alert for N-Grams Smoothing Experiment
 * Optimized for desktop experience with landscape mode encouragement on mobile
 */

class MobileDetection {
  constructor() {
    this.isMobile = false;
    this.isTablet = false;
    this.isLandscape = false;
    this.alertElement = null;
    this.init();
  }

  init() {
    this.detectDevice();
    this.createLandscapeAlert();
    this.bindEvents();
    this.checkOrientation();
  }

  detectDevice() {
    const userAgent = navigator.userAgent.toLowerCase();
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;

    // Mobile detection
    this.isMobile =
      /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(
        userAgent
      ) ||
      (screenWidth <= 767 && "ontouchstart" in window);

    // Tablet detection
    this.isTablet =
      (/ipad|android(?!.*mobile)|tablet/i.test(userAgent) &&
        screenWidth >= 768 &&
        screenWidth <= 1024) ||
      (screenWidth >= 768 && screenWidth <= 1024 && "ontouchstart" in window);

    // Enhanced mobile detection for various devices
    if (!this.isMobile && screenWidth <= 767) {
      this.isMobile = true;
    }

    console.log("Device Detection:", {
      isMobile: this.isMobile,
      isTablet: this.isTablet,
      screenWidth: screenWidth,
      screenHeight: screenHeight,
      userAgent: userAgent,
    });
  }

  checkOrientation() {
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;

    // Determine if device is in landscape mode
    this.isLandscape = screenWidth > screenHeight;

    // Show alert for mobile devices in portrait mode
    if (this.isMobile && !this.isLandscape && screenWidth <= 767) {
      this.showLandscapeAlert();
    } else {
      this.hideLandscapeAlert();
    }

    // For tablets, allow both orientations but prefer landscape
    if (this.isTablet && !this.isLandscape && screenWidth <= 900) {
      this.showLandscapeAlert(true); // Show gentler alert for tablets
    }
  }

  createLandscapeAlert() {
    if (this.alertElement) return;

    this.alertElement = document.createElement("div");
    this.alertElement.className = "landscape-alert";
    this.alertElement.innerHTML = `
            <div class="landscape-content">
                <h2>🔄 Please Rotate Your Device</h2>
                <div class="rotate-icon">📱➡️📱</div>
                <p>
                    <strong>N-Grams Smoothing Experiment</strong><br>
                    This interactive simulation is optimized for <strong>landscape mode</strong> 
                    to provide the best learning experience with tables and matrices.
                </p>
                <p>
                    For the optimal experience, please:
                </p>
                <ul style="text-align: left; display: inline-block; margin: 1rem 0;">
                    <li>🔄 Rotate your device to landscape mode</li>
                    <li>💻 Use a desktop or laptop computer</li>
                    <li>📊 Ensure tables are fully visible</li>
                </ul>
                <p style="font-size: 0.9rem; opacity: 0.8; margin-top: 2rem;">
                    This experiment involves complex probability matrices that require adequate screen space.
                </p>
            </div>
        `;

    // Add styles directly to the element
    Object.assign(this.alertElement.style, {
      position: "fixed",
      top: "0",
      left: "0",
      width: "100%",
      height: "100%",
      backgroundColor: "rgba(15, 23, 42, 0.95)",
      color: "white",
      display: "none",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      zIndex: "9999",
      padding: "2rem",
      textAlign: "center",
      fontFamily:
        '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    });

    document.body.appendChild(this.alertElement);
  }

  showLandscapeAlert(isTablet = false) {
    if (!this.alertElement) return;

    // Customize message for tablets vs phones
    if (isTablet) {
      const content = this.alertElement.querySelector(".landscape-content");
      if (content) {
        content.querySelector("h2").textContent =
          "📐 Landscape Mode Recommended";
        content.querySelector("p").innerHTML = `
                    <strong>N-Grams Smoothing Experiment</strong><br>
                    While this will work in portrait mode, <strong>landscape orientation</strong> 
                    provides better visibility for the probability matrices and tables.
                `;
      }
    }

    this.alertElement.style.display = "flex";
    document.body.style.overflow = "hidden";

    // Add animation
    this.alertElement.style.opacity = "0";
    setTimeout(() => {
      this.alertElement.style.transition = "opacity 0.3s ease";
      this.alertElement.style.opacity = "1";
    }, 10);

    // Auto-hide for tablets after showing the recommendation
    if (isTablet) {
      setTimeout(() => {
        this.hideLandscapeAlert();
      }, 3000);
    }
  }

  hideLandscapeAlert() {
    if (!this.alertElement) return;

    this.alertElement.style.transition = "opacity 0.3s ease";
    this.alertElement.style.opacity = "0";

    setTimeout(() => {
      this.alertElement.style.display = "none";
      document.body.style.overflow = "";
    }, 300);
  }

  bindEvents() {
    // Listen for orientation changes
    window.addEventListener("orientationchange", () => {
      setTimeout(() => {
        this.detectDevice();
        this.checkOrientation();
      }, 100);
    });

    // Listen for resize events
    window.addEventListener("resize", () => {
      this.detectDevice();
      this.checkOrientation();
    });

    // Listen for device motion (if supported)
    if (window.DeviceOrientationEvent) {
      window.addEventListener("deviceorientation", () => {
        setTimeout(() => {
          this.checkOrientation();
        }, 100);
      });
    }

    // Touch events to detect mobile interaction
    document.addEventListener(
      "touchstart",
      () => {
        if (!this.isMobile && window.innerWidth <= 767) {
          this.isMobile = true;
          this.checkOrientation();
        }
      },
      { once: true }
    );
  }

  // Public methods for external use
  getDeviceInfo() {
    return {
      isMobile: this.isMobile,
      isTablet: this.isTablet,
      isLandscape: this.isLandscape,
      screenWidth: window.innerWidth,
      screenHeight: window.innerHeight,
      orientation: this.isLandscape ? "landscape" : "portrait",
    };
  }

  isOptimalViewing() {
    return !this.isMobile || (this.isMobile && this.isLandscape);
  }

  forceHideAlert() {
    this.hideLandscapeAlert();
  }

  forceShowAlert() {
    this.showLandscapeAlert();
  }
}

// Auto-initialize when DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  window.mobileDetection = new MobileDetection();
});

// Also initialize immediately if DOM is already loaded
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => {
    window.mobileDetection = new MobileDetection();
  });
} else {
  window.mobileDetection = new MobileDetection();
}

// Export for potential module use
if (typeof module !== "undefined" && module.exports) {
  module.exports = MobileDetection;
}
