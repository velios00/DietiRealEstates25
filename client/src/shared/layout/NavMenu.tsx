const links: string[] = ["compra", "affitta", "agenzie"];

export default function NavMenu(): React.JSX.Element {
  return (
    <nav>
      <ul className="nav-menu">
        {links.map((link) => (
          <li key={link}>{link}</li>
        ))}
      </ul>
    </nav>
  );
}
