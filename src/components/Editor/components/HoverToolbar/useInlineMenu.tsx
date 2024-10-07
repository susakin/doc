import { useMemo, useState } from "react";
import {
  H1Outlined,
  H2Outlined,
  H3Outlined,
  H4Outlined,
  H5Outlined,
  H6Outlined,
  H7Outlined,
  H8Outlined,
  H9Outlined,
  TextOutlined,
} from "../Icon";
import InlineMenu from "../InlineMenu";
import { svgProps } from "../../utils/getSideAnimateClassName";
import { useTextBlock } from "../../plugin/text-block/useTextBlock";
import { useHeading } from "../../plugin/heading/useHeading";

const headingIconMap: Record<string, React.ReactElement> = {
  h1: <H1Outlined {...svgProps} />,
  h2: <H2Outlined {...svgProps} />,
  h3: <H3Outlined {...svgProps} />,
  h4: <H4Outlined {...svgProps} />,
  h5: <H5Outlined {...svgProps} />,
  h6: <H6Outlined {...svgProps} />,
  h7: <H7Outlined {...svgProps} />,
  h8: <H8Outlined {...svgProps} />,
  h9: <H9Outlined {...svgProps} />,
};

export const useInlineMenu = () => {
  const { textBlock } = useTextBlock();
  const { heading } = useHeading();

  const icon = useMemo(() => {
    if (textBlock?.isActive) {
      return <TextOutlined {...svgProps} />;
    }
    if (heading?.heading) {
      return headingIconMap[heading.heading as any];
    }
  }, [textBlock, heading]);

  return {
    icon,
    submenu: <InlineMenu />,
    devider: true,
    submenuPopoverProps: {
      renderToBody: false,
      hideWhenContentClick: true,
    },
  };
};
