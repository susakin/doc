import React, { useEffect, useRef, useState } from "react";
import styles from "./linkEditPanel.module.less";
import cs from "classnames";
import * as linkify from "linkifyjs";
import { HyperLinkConfig } from "../../plugin/hyper-link";
import { useKeyPress } from "ahooks";
const classNamePrefix = "link-edit-panel";

type Link = Omit<HyperLinkConfig, "displayMode">;

type LinkEditPanelProps = {
  hasText?: boolean;
  onOk?: (params: Link) => void;
  config?: Link;
};

const LinkEditPanel: React.FC<LinkEditPanelProps> = ({
  config,
  hasText = false,
  onOk,
}) => {
  const { url, text } = config || {};
  const linkRef = useRef<Link>({});
  const linkInputRef = useRef<HTMLInputElement>(null);
  const textInputRef = useRef<HTMLInputElement>(null);
  const [linkButtonDisabled, setLinkeButtonDisabled] = useState<boolean>(false);

  useEffect(() => {
    linkInputRef.current?.focus();
    setLinkeButtonDisabled(!linkify.test((url as string) || "", "url") || !url);
    linkRef.current = {
      url,
      text,
    };
  }, [url]);

  function onEnter() {
    !linkButtonDisabled && onOk?.(linkRef.current);
  }

  useKeyPress("enter", onEnter, {
    target: linkInputRef,
  });

  useKeyPress("enter", onEnter, {
    target: textInputRef,
  });

  return (
    <div className={styles[`${classNamePrefix}`]}>
      {hasText && (
        <div className={styles[`${classNamePrefix}-item`]}>
          <div className={styles[`${classNamePrefix}-item-label`]}>文本</div>
          <input
            defaultValue={text}
            className={styles[`${classNamePrefix}-item-input`]}
            spellCheck="false"
            placeholder="输入文本"
            ref={textInputRef}
            onChange={(e) => {
              linkRef.current.text = e.target.value;
            }}
          />
        </div>
      )}
      <div className={styles[`${classNamePrefix}-item`]}>
        {hasText && (
          <div className={styles[`${classNamePrefix}-item-label`]}>链接</div>
        )}
        <input
          className={styles[`${classNamePrefix}-item-input`]}
          spellCheck="false"
          defaultValue={url}
          placeholder="粘贴或输入链接"
          ref={linkInputRef}
          onChange={(e) => {
            const url = e.target.value;
            const isValid = linkify.test(url, "url");
            linkRef.current.url = isValid
              ? linkify.find(url)?.[0]?.href
              : undefined;
            setLinkeButtonDisabled(!isValid);
          }}
        />

        <button
          className={cs(styles[`${classNamePrefix}-item-button`], {
            [styles[`${classNamePrefix}-item-button-disabled`]]:
              linkButtonDisabled,
          })}
          onClick={onEnter}
        >
          确定
        </button>
      </div>
    </div>
  );
};

export default LinkEditPanel;
