// Container: the one centered page wrapper (max width + side padding).
// Every section and layout block puts its content inside this.
export default function Container({ children, className = '' }) {
  return (
    <div className={`mx-auto w-full max-w-5xl px-4 sm:px-6 lg:px-8 ${className}`}>
      {children}
    </div>
  );
}
