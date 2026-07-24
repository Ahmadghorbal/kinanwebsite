import { clsx } from "@/lib/clsx";

export function Container({
  children,
  wide = false,
  className,
}: {
  children: React.ReactNode;
  wide?: boolean;
  className?: string;
}) {
  return (
    <div
      className={clsx(
        "mx-auto w-full px-5 sm:px-6",
        wide ? "max-w-[71rem]" : "max-w-[60rem]",
        className,
      )}
    >
      {children}
    </div>
  );
}
