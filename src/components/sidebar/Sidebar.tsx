import Navbar from "../Navbar/Navbar";
import style from "./sidebar.module.css";
import List from "../List/List";
const Sidebar = () => {
  return (
    <div className={style.sidebar_container}>
      <Navbar />
      <List />
    </div>
  );
};

export default Sidebar;
