"use client"
import { useTheme } from "next-themes"
import { Toaster as Sonner } from "sonner";

const Toaster = ({
  ...props
}) => {
  const { theme = "system" } = useTheme()

  return (
    <Sonner
      theme={theme}
      className="toaster group"
      position="top-right"
      toastOptions={{
        classNames: {
          toast: "rounded-xl border shadow-lg px-4 py-3 flex items-center gap-3 bg-gradient-to-r from-blue-100 to-blue-50 dark:from-zinc-800 dark:to-zinc-900",
          title: "font-semibold text-blue-800 dark:text-blue-100",
          description: "text-sm text-gray-600 dark:text-gray-300",
          actionButton: "bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded-md text-sm",
          cancelButton: "text-gray-500 hover:text-black dark:hover:text-white text-sm",
        },
        unstyled: false,
        icon: true,
        duration: 3000,
      }}
      style={{
        "--normal-bg": "var(--popover)",
        "--normal-text": "var(--popover-foreground)",
        "--normal-border": "var(--border)",
      }}
      {...props}
    />
  );
};

export { Toaster }
