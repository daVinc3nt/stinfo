import { useState,useRef } from 'react'
import { MenuToggle } from '../Icons'
import { motion, useCycle } from 'framer-motion';
type MenuItemWithSubMenuProps = {
    toggleOpen: () => void;
  };
const MobileMenu = ({ toggle }: { toggle: any }) => {
    const [isOpen, toggleOpen] = useCycle(true, false);
    const containerRef = useRef(null);
    return (
        <motion.nav
        initial={false}
        animate={isOpen ? 'open' : 'closed'}
        className={`w-full z-50 xl:hidden ${
            isOpen ? '' : 'pointer-events-none'
            }`}
        ref={containerRef}
        >
        <MenuToggle toggle1={toggleOpen} toggle2={toggle} />
        </motion.nav>
    )
}

export default MobileMenu
