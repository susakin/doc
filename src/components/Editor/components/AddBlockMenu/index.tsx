import React, { useMemo } from "react";
import Menu, { Item } from "../Menu";
import styles from "./index.module.less";
import MenuList from "./MeunList";

const classNamePrefix = "add-block-menu";

const AddBlockMenu: React.FC = () => {
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

export default AddBlockMenu;
