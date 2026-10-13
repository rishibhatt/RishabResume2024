/**
 * Word-split heading. The full sentence stays as the accessible name; the split words are
 * decorative and hidden from assistive tech. With no JavaScript the words simply render.
 */
export default function Split({ as: Tag = "h2", text, className = "", lines, style }) {
  const parts = lines || [text];
  return (
    <Tag className={`split ${className}`} aria-label={parts.join(" ")} style={style}>
      {parts.map((line, li) => (
        <span key={li} aria-hidden="true" style={lines ? { display: "block" } : undefined}>
          {line.split(" ").map((w, i, arr) => (
            <span key={i}>
              <span className="w">
                <span className="wi">{w}</span>
              </span>
              {i < arr.length - 1 ? " " : ""}
            </span>
          ))}
        </span>
      ))}
    </Tag>
  );
}
