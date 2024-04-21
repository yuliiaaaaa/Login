import React from 'react';
import { useNavigate } from 'react-router-dom';

type Props = {
  text: string;
  className: string;
  nav: string;
  handleClick?: () => void;
};

export const Button: React.FC<Props> = ({
  text,
  className,
  nav,
  handleClick,
}) => {
  const navigate = useNavigate();

  const handleClickInternal = () => {
    if (handleClick) {
      handleClick();
    }
    navigate(nav);
  };

  return (
    <button
      type="button"
      onClick={handleClickInternal}
      className={`button ${className}`}
    >
      {text}
    </button>
  );
};
