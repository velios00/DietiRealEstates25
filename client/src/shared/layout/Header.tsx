import Logo from "./Logo";
import NavMenu from "./NavMenu";
import LoginButton from "./LoginButton";
import React from "react";

export default function Header(): React.JSX.Element {
  return (
    <header className="header">
      <Logo />
      <NavMenu />
      <LoginButton />
    </header>
  );
}
