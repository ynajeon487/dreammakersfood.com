import { useState } from "react";
import { AlertCircle } from "lucide-react";

export default function AutoDismissBanner() {
  const [showBanner] = useState(true);

  if (!showBanner) return null;

  return (
    <div
      className="bg-yellow-50 dark:bg-yellow-900/20 border-b border-yellow-200 dark:border-yellow-800"
      role="status"
      aria-live="polite"
      data-testid="banner-testing-warning"
    >
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center justify-center gap-2">
          <AlertCircle className="h-5 w-5 text-yellow-600 dark:text-yellow-400 flex-shrink-0" />
          <p className="text-sm md:text-base text-yellow-800 dark:text-yellow-200 font-medium">
            Trang web đang trong quá trình thử nghiệm.
          </p>
        </div>
      </div>
    </div>
  );
}
