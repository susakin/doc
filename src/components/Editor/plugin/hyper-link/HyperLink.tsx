import React from "react";
import styles from "./hyperLink.module.less";
import { HyperLinkConfig } from ".";
import Popover from "../../components/Tooltip/Popover";
import AnimationWrapper from "../../components/Tooltip/AnimationWrapper";
import LinkMenu from "../../components/Link/LinkMenu";

const classNamePrefix = "hyper-link";

type HyperLinkProps = {
  config?: HyperLinkConfig;
  children?: React.ReactNode;
};

const HyperLink: React.FC<HyperLinkProps> = ({ config, children }) => {
  const { url } = config || {};
  return (
    <Popover
      placement="top"
      content={({ side }) => {
        return (
          <AnimationWrapper side={side}>
            <LinkMenu config={config} />
          </AnimationWrapper>
        );
      }}
    >
      <a
        rel="noopener noreferrer"
        className={styles[`${classNamePrefix}`]}
        target="_blank"
        href={url}
        onClick={() => {
          window.open(url);
        }}
      >
        {children}
      </a>
    </Popover>
  );
};

export default HyperLink;
