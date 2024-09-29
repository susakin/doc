import React, { useEffect, useRef, useState } from "react";
import styles from "./linkEditPanel.module.less";
import cs from "classnames";
import * as linkify from "linkifyjs";

const classNamePrefix = "link-edit-panel";

type Link = {
  text?: string;
  url?: string;
};

type LinkEditPanelProps = {
  hasText?: boolean;
  onOk?: (params: Link) => void;
} & Link;

const LinkEditPanel: React.FC<LinkEditPanelProps> = ({
  text,
  url,
  hasText = false,
  onOk,
}) => {
  const linkRef = useRef<Link>({});
  const linkInputRef = useRef<HTMLInputElement>(null);
  const [linkButtonDisabled, setLinkeButtonDisabled] = useState<boolean>(false);

  useEffect(() => {
    linkInputRef.current?.focus();
    setLinkeButtonDisabled(linkify.test((url as string) || "", "url") || !url);
  }, []);

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
            linkRef.current.url = url;
            const isValid = linkify.test(url, "url");
            setLinkeButtonDisabled(!isValid);
          }}
        />

        <button
          className={cs(styles[`${classNamePrefix}-item-button`], {
            [styles[`${classNamePrefix}-item-button-disabled`]]:
              linkButtonDisabled,
          })}
          onClick={() => {
            !linkButtonDisabled && onOk?.(linkRef.current);
          }}
        >
          确定
        </button>
      </div>
    </div>
  );
};

export default LinkEditPanel;
