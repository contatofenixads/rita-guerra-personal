import { useEffect } from "react";

export function AgencyFooter() {
  useEffect(() => {
    if (document.querySelector('script[data-agf="1"]')) return; // evita duplicar
    const s = document.createElement("script");
    s.src = "https://rodape.agenciafenixads.com.br/embed/footer.js";
    s.async = true;
    s.dataset.agf = "1";
    s.setAttribute("data-footer-id", "default");
    s.setAttribute("data-target", "#agencia-footer");
    document.body.appendChild(s);
  }, []);
  return <div id="agencia-footer" />;
}
