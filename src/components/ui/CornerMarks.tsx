export function CornerMarks({
  colorClass = "border-brand-golden-yellow",
  size = 12,
}: {
  colorClass?: string;
  size?: number;
}) {
  const base = `absolute ${colorClass}`;
  const s = `${size}px`;
  return (
    <>
      <span
        className={`${base} left-0 top-0 border-l-2 border-t-2 rounded-tl`}
        style={{ width: s, height: s }}
      />
      <span
        className={`${base} right-0 top-0 border-r-2 border-t-2 rounded-tr`}
        style={{ width: s, height: s }}
      />
      <span
        className={`${base} left-0 bottom-0 border-l-2 border-b-2 rounded-bl`}
        style={{ width: s, height: s }}
      />
      <span
        className={`${base} right-0 bottom-0 border-r-2 border-b-2 rounded-br`}
        style={{ width: s, height: s }}
      />
    </>
  );
}