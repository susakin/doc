import React, { useMemo } from "react";
import {
  IncreaseIndentationOutlined,
  MaybeOutlined,
  ReduceIndentationOutlined,
} from "../Icon";
import { Item } from "../Menu";
import { useIndent } from "../../plugin/indent/useIndent";
import { svgProps } from "../../utils/getSideAnimateClassName";

export const useIndentation = () => {
  const { indent, commandIndent } = useIndent();

  const items = useMemo<Item[]>(() => {
    return [
      {
        icon: <IncreaseIndentationOutlined {...svgProps} />,
        text: "增加缩进",
        tooltip: indent?.indent ? "当前内容已达最大缩进层级" : "tab",
        disabled: indent?.indent,
        onClick() {
          commandIndent(true);
        },
        suffix: indent?.indent ? <MaybeOutlined {...svgProps} /> : null,
      },
      {
        icon: <ReduceIndentationOutlined {...svgProps} />,
        tooltip: !indent?.indent ? null : "Shift + Tab",
        text: "减少缩进",
        disabled: !indent?.indent,
        onClick() {
          commandIndent(false);
        },
      },
    ];
  }, [indent]);

  return items;
};
