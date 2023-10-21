import { useState } from "react";
import {
  ButtonStyles,
  ContainerCollapse,
  CollapseStyles,
  ItemStyle,
} from "./styles";
import { Link } from "react-router-dom";
import Text from "../text";
import Divisor from "../divisor";
import { RiArrowDownSFill, RiArrowUpSFill } from "react-icons/ri";

export default function Collpase({ itemsList, icon, title }) {
  const [showMenu, setShowMenu] = useState(false);
  return (
    <ContainerCollapse>
      <ButtonStyles onClick={() => setShowMenu(!showMenu)}>
        {icon}
        <Divisor justifyContent="space-between">
          <Text size="16px">{title}</Text>
          {showMenu ? (
            <RiArrowUpSFill size={20} />
          ) : (
            <RiArrowDownSFill size={20} />
          )}
        </Divisor>
      </ButtonStyles>
      <CollapseStyles show={showMenu}>
        {itemsList?.map((item) => {
          return (
            <Link key={item.title} to={item.url}>
              <ItemStyle key={item.title} url={item.url} hidden={item.hidden}>
                {item.title}
              </ItemStyle>
            </Link>
          );
        })}
      </CollapseStyles>
    </ContainerCollapse>
  );
}
