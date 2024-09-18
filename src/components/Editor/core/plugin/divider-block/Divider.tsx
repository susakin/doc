import React from "react";
import styles from "./divider.module.less";
import { useFocused, useSelected } from "slate-react";
import cs from "classnames";
import SelectedMask from "../../components/SelectedMask";

const classNamePrefix = "divider";

const Divider: React.FC = () => {
  const selected = useSelected();
  const focused = useFocused();

  return (
    <div className={cs(styles[`${classNamePrefix}`])}>
      <div className={cs(styles[`${classNamePrefix}-line`])} />
      {focused && selected && <SelectedMask />}
    </div>
  );
};

export default Divider;
