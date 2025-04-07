import { useState } from 'react';

export default function useShowMenu() {
  const [show, setShow] = useState(true);

  const toggleMenu = () => {
    setShow(!show);
  }

  return { show, toggleMenu }
}