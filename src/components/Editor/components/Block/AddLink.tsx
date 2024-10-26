import React, { useEffect, useState } from "react";
import LinkEditPanel, { Link } from "../Link/LinkEditPanel";
import Popover from "../Tooltip/Popover";

type AddLinkProps = {
  onAddLink: (link: Link) => void;
  referenceElement: HTMLElement;
};

const AddLink: React.FC<AddLinkProps> = ({ referenceElement, onAddLink }) => {
  const [open, setOpen] = useState<boolean>(true);

  useEffect(() => {
    const onClick = () => {
      setOpen(false);
    };
    referenceElement?.addEventListener("click", onClick);

    return () => {
      referenceElement?.removeEventListener("click", onClick);
    };
  }, []);

  return (
    <Popover
      renderToBody
      referenceElement={referenceElement}
      offset={5}
      placement="bottom-start"
      trigger="click"
      open={open}
      content={<LinkEditPanel hasText onOk={onAddLink} />}
    />
  );
};

export default AddLink;
