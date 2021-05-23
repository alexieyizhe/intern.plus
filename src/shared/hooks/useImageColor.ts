import { useEffect, useState } from "react";
import { prominent } from "color.js";

import { hexToHSL } from "src/shared/utils/color";

export const useImageColor = (imageSrc?: string) => {
  const [color, setColor] = useState<string | undefined>(undefined);
  useEffect(() => {
    if (imageSrc && imageSrc !== "") {
      prominent(imageSrc, { amount: 1, format: "hex" }).then(
        (color: string) => {
          setColor(hexToHSL(color));
        }
      );
    }
  }, [imageSrc]);

  return color;
};
