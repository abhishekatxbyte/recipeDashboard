import logo from "./../../assets/logo.png";
import style from "./navbar.module.css";
const Navbar = () => {
  return (
    <div className={style.navbar}>
      <img src={logo} alt="componey_logo" className={style.componey_logo} />
    </div>
  );
};

export default Navbar;
