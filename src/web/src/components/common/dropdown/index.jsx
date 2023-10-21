import { useState } from "react";
import {
  ButtonMenuStyles,
  ContainerButtonDropdown,
  DropdownStyles,
  ItemStyle,
} from "./style";
import { Link } from "react-router-dom";

export default function Dropdown({ itemsList, icon, title }) {
  const [showMenu, setShowMenu] = useState(false);
  return (
    <ContainerButtonDropdown>
      <ButtonMenuStyles onClick={() => setShowMenu(!showMenu)}>
        {icon}
        {title}
      </ButtonMenuStyles>
      <DropdownStyles show={showMenu} onMouseLeave={() => setShowMenu(false)}>
        {itemsList?.map((item) => {
          return (
            <Link key={item.title} to={item.url}>
              <ItemStyle key={item.title} url={item.url} hidden={item.hidden}>
                {item.title}
              </ItemStyle>
            </Link>
          );
        })}
      </DropdownStyles>
    </ContainerButtonDropdown>
  );
}
