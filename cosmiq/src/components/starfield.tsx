import { useEffect } from "react";

export default function Starfield() {
  useEffect(() => {
    const starfield = document.getElementById("starfield");
    if (!starfield) return;

    const starCount = 150;

    for (let i = 0; i < starCount; i++) {
      const star = document.createElement("div");
      star.className = "star";

      const x = Math.random() * 100;
      const y = Math.random() * 100;

      star.style.left = `${x}%`;
      star.style.top = `${y}%`;

      starfield.appendChild(star);
    }

    return () => {
      starfield.innerHTML = "";
    };
  }, []);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-gradient-to-bl from-accent/10 to-blue-950/20 bg-fixed">
      <div id="starfield" className="w-full h-full relative"></div>
    </div>
  );
}
