import { useState } from 'react';

import { Options } from '../Options/Options';
import { BurgerButton } from '../UI';

import styles from './Header.module.scss';

const Header = () => {
  const [showBurger, setShowBurger] = useState(false);

  const toggleMenu = () => {
    setShowBurger((prev) => !prev);
  };
  const closeMenu = () => {
    setShowBurger(false);
  };

  return (
    <header className={styles.header}>
      <div className={styles.header__wrapper}>
        <h1 className={styles.header__title}>Matches Game</h1>
        <BurgerButton onClick={toggleMenu} />
      </div>
      <Options closeFunc={closeMenu} active={showBurger} />
    </header>
  );
};

export { Header };
