// Shadcn Comp
import { toast } from "sonner";

export function HandeResults(s, m) {
  if (s === "warning") {
    return toast.warning(m, {
      duration: 4000,
      style: {
        background: "oklch(87.9% 0.169 91.605)",
        color: "oklch(55.3% 0.195 38.402)",
      },
    });
  } else if (s === false) {
    return toast.error(m, {
      duration: 4000,
      style: {
        background: "oklch(70.4% 0.191 22.216)",
        color: "oklch(50.5% 0.213 27.518)",
      },
    });
  } else if (s === true) {
    return toast.success(m, {
      duration: 4000,
      style: {
        background: "oklch(92.5% 0.084 155.995)",
        color: "oklch(69.6% 0.17 162.48)",
      },
    });
  }
}
