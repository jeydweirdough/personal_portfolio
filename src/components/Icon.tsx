// One stroke, one weight, for every icon on the site.
const paths = {
  arrow: "M5 12h14M13 6l6 6-6 6",
  download: "M12 4v11M7 10l5 5 5-5M5 20h14",
};

export default function Icon({ name, className = "" }: { name: keyof typeof paths; className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`size-[1.125rem] shrink-0 ${className}`}
    >
      <path d={paths[name]} />
    </svg>
  );
}
