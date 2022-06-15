const Header = ({count, messages}) => {
    return <div className="header">{messages('taskLeft', { count })}</div>;
  };
  
  export default Header;
  