const Container = ({ children, className, dataAnimate }) => {
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
