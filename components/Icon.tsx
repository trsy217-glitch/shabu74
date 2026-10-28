type IconProps = {
  name: string;
  fill?: boolean;
  className?: string;
  size?: number;
};

/** Material Symbols ligature icon. Decorative by default (aria-hidden). */
export default function Icon({ name, fill = false, className, size }: IconProps) {
  return (
    <span
      className={["icon", fill && "icon--fill", className].filter(Boolean).join(" ")}
      style={size ? { fontSize: size } : undefined}
      aria-hidden="true"
    >
      {name}
    </span>
  );
}
