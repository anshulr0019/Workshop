export type IconName =
  | "arrow"
  | "phone"
  | "chat"
  | "pin"
  | "wrench"
  | "check"
  | "car"
  | "brake"
  | "snow"
  | "bolt"
  | "menu"
  | "close"
  | "clock"
  | "shield";
const paths: Record<IconName, React.ReactNode> = {
  arrow: (
    <>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </>
  ),
  phone: <path d="m7 3 3 5-2 2c1.5 3 3 4.5 6 6l2-2 5 3-1 4C11 22 2 13 3 4z" />,
  chat: (
    <path d="M21 11.5a9 9 0 0 1-9 9 10 10 0 0 1-4-.8L3 21l1.3-5a9 9 0 1 1 16.7-4.5ZM8 10h8M8 14h5" />
  ),
  pin: (
    <>
      <path d="M20 10c0 6-8 11-8 11S4 16 4 10a8 8 0 1 1 16 0Z" />
      <circle cx="12" cy="10" r="2.5" />
    </>
  ),
  wrench: (
    <path d="M14 6a6 6 0 0 0-7 7L2.8 17.2a2.8 2.8 0 0 0 4 4L11 17a6 6 0 0 0 7-7l-4 4-4-4 4-4Z" />
  ),
  check: <path d="m5 12 4 4L19 6" />,
  car: (
    <>
      <path d="m5 6-2 7v6h3v-3h12v3h3v-6l-2-7ZM3 12h18M7 6h10M6 14h2M16 14h2" />
    </>
  ),
  brake: (
    <>
      <circle cx="12" cy="12" r="8" />
      <circle cx="12" cy="12" r="3" />
      <path d="M12 4v3m8 5h-3m-5 8v-3m-8-5h3" />
    </>
  ),
  snow: (
    <path d="M12 2v20M3.3 7l17.4 10M3.3 17 20.7 7M9 4l3 3 3-3M9 20l3-3 3 3" />
  ),
  bolt: <path d="m13 2-9 12h7l-1 8 10-13h-7z" />,
  menu: <path d="M4 7h16M4 12h16M4 17h16" />,
  close: <path d="m6 6 12 12M6 18 18 6" />,
  clock: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </>
  ),
  shield: (
    <>
      <path d="m12 3 8 3v6c0 5-8 9-8 9s-8-4-8-9V6z" />
      <path d="m8 12 3 3 5-6" />
    </>
  ),
};
export default function Icon({
  name,
  size = 20,
}: {
  name: IconName;
  size?: number;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {paths[name]}
    </svg>
  );
}
