import type { ReactNode } from 'react';

interface ContainerType {
  children: ReactNode;
  className?: string;
  dataAnimate?: string;
}

const Container = ({ children, className, dataAnimate }: ContainerType) => {
  return (
    <div
      className={className ? `container ${className}` : `container`}
      data-animate={dataAnimate}
    >
      {children}
    </div>
  );
};

export default Container;
