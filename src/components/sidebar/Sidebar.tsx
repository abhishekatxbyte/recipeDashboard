import Navbar from "../Navbar/Navbar";
import style from "./sidebar.module.css";
import './util.css'
import List from "../List/List";
import { useState } from "react";
import { Tab, Tabs } from "react-bootstrap";
import SubCat from "../SubCat/SubCat";
import { useNavigate } from "react-router-dom";
const Sidebar = () => {
  const [key, setKey] = useState('search');

  const navigate: any = useNavigate()
  const navigateToDetail = (key: any) => {
    if (key === "search") {
      navigate(`/detail-recipe`)
    }
    if (key === "cookbook") {
      navigate(`/calendar`)

    }
    setKey(key)
  }
  return (
    <div className={style.sidebar_container}>
      <Navbar />


      <Tabs
        activeKey={key}
        onSelect={(key: any) => navigateToDetail(key)}
        className={style.cat_tabs}
      >
        <Tab className={style.tab} eventKey="search" title="search">
          <div style={{ display: 'flex' }}>

            <SubCat />
          </div>
        </Tab>
        <Tab className={`${style.cooktab} ${style.tab}`} eventKey="cookbook" title="cookbook">
          <List />
        </Tab>

      </Tabs>
    </div>
  );
};

export default Sidebar;
