import React, { useMemo } from "react";
import Menu, { Item } from "../Menu";
import MenuList from "./MeunList";
import styles from "./index.module.less";
const classNamePrefix = "empty-block-menu";

const EmptyBlockMenu: React.FC = () => {
  const items = useMemo<Item[]>(() => {
    return [
      {
        render() {
          return <div className={styles[`${classNamePrefix}-title`]}>基础</div>;
        },
      },
      {
        render() {
          return <MenuList />;
        },
      },
    ];
  }, []);
  return <Menu items={items} />;
};

export default EmptyBlockMenu;
