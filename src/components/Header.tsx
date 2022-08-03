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
    <header>
      <button onClick={decrease}>{"<"}</button>
      <div className="header-date">
        {`${curDate.getFullYear()}년 ${curDate.getMonth() + 1}`}월
      </div>
      <button onClick={increase}>{">"}</button>
    </header>
  );
};

export default Header;
