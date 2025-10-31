"use client";

import CookieConsent from "react-cookie-consent";
import Link from "next/link";

export default function CookieBanner() {
  return (
    <CookieConsent
      location="bottom"
      buttonText="Accepter"
      declineButtonText="Refuser"
      cookieName="visionaireConsentCookie"
      enableDeclineButton
      flipButtons
      style={{
        background: "#1F2937",
        padding: "16px 24px",
        alignItems: "center",
        boxShadow: "0 -2px 10px rgba(0,0,0,0.1)",
      }}
      buttonStyle={{
        background: "#2563EB",
        color: "#FFFFFF",
        fontSize: "14px",
        fontWeight: "500",
        padding: "10px 24px",
        borderRadius: "8px",
        border: "none",
        cursor: "pointer",
      }}
      declineButtonStyle={{
        background: "transparent",
        color: "#D1D5DB",
        fontSize: "14px",
        fontWeight: "500",
        padding: "10px 24px",
        borderRadius: "8px",
        border: "1px solid #4B5563",
        cursor: "pointer",
      }}
      expires={365}
      onAccept={() => {
        // Enable analytics when user accepts
        if (typeof window !== "undefined" && typeof (window as Window & typeof globalThis & { gtag?: (...args: unknown[]) => void }).gtag === "function") {
          (window as Window & typeof globalThis & { gtag: (...args: unknown[]) => void }).gtag("consent", "update", {
            analytics_storage: "granted",
          });
        }
      }}
      onDecline={() => {
        // Disable analytics when user declines
        if (typeof window !== "undefined" && typeof (window as Window & typeof globalThis & { gtag?: (...args: unknown[]) => void }).gtag === "function") {
          (window as Window & typeof globalThis & { gtag: (...args: unknown[]) => void }).gtag("consent", "update", {
            analytics_storage: "denied",
          });
        }
      }}
    >
      <span style={{ color: "#F9FAFB", fontSize: "14px", lineHeight: "1.5" }}>
        🍪 Nous utilisons des cookies pour améliorer votre expérience. En continuant, vous acceptez notre{" "}
        <Link
          href="/legal/cookies"
          style={{ color: "#60A5FA", textDecoration: "underline" }}
          className="hover:text-blue-400"
        >
          politique de cookies
        </Link>.
      </span>
    </CookieConsent>
  );
}
