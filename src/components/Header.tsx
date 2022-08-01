const Header = ({
  curDate,
  decrease,
  increase,
}: {
  curDate: Date;
  decrease: () => void;
  increase: () => void;
}) => {
  return (
    <div className="Header">
      <button onClick={decrease}>{"<"}</button>
      <div>{`${curDate.getFullYear()}년 ${curDate.getMonth() + 1}`}월</div>
      <button onClick={increase}>{">"}</button>
    </div>
  );
};

export default Header;
