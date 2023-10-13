import { useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import {
  ButtonMenuStyles,
  ContainerButtonDropdown,
  DropdownStyles,
  ItemStyle,
} from "./style";
import { Link } from "react-router-dom";

export default function Dropdown({ itemsList, title }) {
  const [showMenu, setShowMenu] = useState(false);
  return (
    <ContainerButtonDropdown>
      <ButtonMenuStyles onClick={() => setShowMenu(!showMenu)}>
        <AiOutlineMenu size={20} color="#ff5757" />
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
