const Header = ({
  date,
  decrease,
  increase,
}: {
  date: Date;
  decrease: () => void;
  increase: () => void;
}) => {
  return (
    <div className="Header">
      <button onClick={decrease}>{"<"}</button>
      <div>{`${date.getFullYear()}년 ${date.getMonth() + 1}`}월</div>
      <button onClick={increase}>{">"}</button>
    </div>
  );
};

export default Header;
