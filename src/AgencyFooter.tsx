import { useEffect } from "react";

export function AgencyFooter() {
  useEffect(() => {
    if (document.querySelector('script[data-agf="1"]')) return;
    const s = document.createElement("script");
    s.src = "https://67a2b310-1b5c-4ac0-98bb-a2bfb5978c60.lovableproject.com/embed/footer.js";
    s.async = true;
    s.dataset.agf = "1";
    s.setAttribute("data-footer-id", "default");
    s.setAttribute("data-target", "#agencia-footer");
    document.body.appendChild(s);
  }, []);
  return <div id="agencia-footer" style={{ width: "100%" }} />;
}
