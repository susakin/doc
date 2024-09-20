import { svgProps } from "@/utils";
import React, { useMemo } from "react";
import {
  IncreaseIndentationOutlined,
  MaybeOutlined,
  ReduceIndentationOutlined,
} from "../Icon";
import { Item } from "../Menu";

export const useIndentation = () => {
  const items = useMemo<Item[]>(() => {
    return [
      {
        icon: <IncreaseIndentationOutlined {...svgProps} />,
        text: "增加缩进",
        tooltip: "无法缩进当前内容块",
        //tooltip: "Tab",
        disabled: true,
        suffix: <MaybeOutlined {...svgProps} />,
      },
      {
        icon: <ReduceIndentationOutlined {...svgProps} />,
        //tooltip: "Shift + Tab",
        text: "减少缩进",
        disabled: true,
      },
    ];
  }, []);

  return items;
};
