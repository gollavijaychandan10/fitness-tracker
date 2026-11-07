export default function Heading({ tag, title, text }) {
  return <section className="page-heading"><span>{tag}</span><h1>{title}</h1>{text && <p>{text}</p>}</section>;
}
