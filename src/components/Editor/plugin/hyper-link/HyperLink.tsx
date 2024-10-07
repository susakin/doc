import React, { useEffect, useState } from "react";
import styles from "./hyperLink.module.less";
import Popover from "../../components/Tooltip/Popover";
import AnimationWrapper from "../../components/Tooltip/AnimationWrapper";
import LinkMenu, { LinkMenuProps } from "../../components/Link/LinkMenu";
import { useHasSelection } from "../../components/HoverToolbar";
import LinkEditPanel from "../../components/Link/LinkEditPanel";
import { HyperLinkConfig } from ".";
import cs from "classnames";

const classNamePrefix = "hyper-link";

type HyperLinkProps = {
  children?: React.ReactNode;
  readonly?: boolean;
  onOk?: (config: HyperLinkConfig) => void;
} & LinkMenuProps;

const HyperLink: React.FC<HyperLinkProps> = ({
  children,
  readonly,
  config,
  onOk,
  ...rest
}) => {
  const { url } = config || {};
  const [open, setOpen] = useState<boolean>();
  const hasSection = useHasSelection();
  const [editing, setEditing] = useState<boolean>(false);

  useEffect(() => {
    if (hasSection) {
      setOpen(false);
    }
  }, [hasSection]);

  return (
    <Popover
      enabled={!readonly && !hasSection}
      placement={editing ? "bottom-start" : "top"}
      trigger={editing ? "click" : "hover"}
      open={open}
      openDelay={500}
      onOpenChange={(open) => {
        setOpen(open);
        if (open === false) {
          setEditing(false);
        }
      }}
      content={({ side }) => {
        return (
          <AnimationWrapper side={side}>
            {editing ? (
              <LinkEditPanel
                config={config}
                hasText={true}
                onOk={(config) => {
                  setEditing(false);
                  setOpen(false);
                  onOk?.(config);
                }}
              />
            ) : (
              <LinkMenu
                config={config}
                onRemoveLink={() => {
                  setOpen(false);
                  rest.onRemoveLink?.();
                }}
                onEdit={() => {
                  setEditing(true);
                }}
                onSwitchDisplayMode={(key) => {
                  setOpen(false);
                  rest.onSwitchDisplayMode?.(key);
                }}
              />
            )}
          </AnimationWrapper>
        );
      }}
    >
      <a
        rel="noopener noreferrer"
        className={cs(styles[`${classNamePrefix}`], {
          [styles[`${classNamePrefix}-editing`]]: editing,
        })}
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
