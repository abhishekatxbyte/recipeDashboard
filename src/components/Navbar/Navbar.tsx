import { useAppSelector } from "../../store/hooks";
import logo from "./../../assets/logo.png";
import style from "./navbar.module.css";
const Navbar = () => {
  const recipes = useAppSelector((state: any) => state.calanderDays.recipes);
  return (
    <div className={style.navbar}>
      <img src={logo} alt="componey_logo" className={style.componey_logo} />
      <p>{recipes.length} / RECIPES</p>
    </div>
  );
};

export default Navbar;
