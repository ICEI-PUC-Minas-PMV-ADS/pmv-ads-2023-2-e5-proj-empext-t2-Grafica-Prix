import { useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { ButtonMenuStyles, DropdownStyles } from "./style";

export default function Dropdown ({children,title}){
  const [showMenu,setShowMenu] = useState(false)
  return (
    <>
    <ButtonMenuStyles onClick={()=> setShowMenu(!showMenu)}><AiOutlineMenu size={20} color="#ff5757"/>{title}</ButtonMenuStyles>
    {showMenu && <DropdownStyles>{children}</DropdownStyles>}
    </>
  )
}