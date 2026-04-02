import { useEffect } from "react";
import templateHtml from "../../template.html?raw";

export default function LegacyTemplate() {
  useEffect(() => {
    // Load legacy scripts after template mount.
    const legacyScript = document.createElement("script");
    legacyScript.src = "/script.js";
    legacyScript.defer = true;

    const ioniconsModule = document.createElement("script");
    ioniconsModule.type = "module";
    ioniconsModule.src =
      "https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.esm.js";

    const ioniconsNoModule = document.createElement("script");
    ioniconsNoModule.setAttribute("nomodule", "");
    ioniconsNoModule.src =
      "https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.js";

    document.body.appendChild(legacyScript);
    document.body.appendChild(ioniconsModule);
    document.body.appendChild(ioniconsNoModule);

    return () => {
      legacyScript.remove();
      ioniconsModule.remove();
      ioniconsNoModule.remove();
    };
  }, []);

  return <div dangerouslySetInnerHTML={{ __html: templateHtml }} />;
}
