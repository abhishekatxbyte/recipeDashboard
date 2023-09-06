// import { useEffect } from "react";
import "./App.css";
import Calender from "./components/Calendar/Calender";
import Sidebar from "./components/sidebar/Sidebar";
// import { useAppDispatch, useAppSelector } from "./store/hooks";
// import { getRecipes } from "./store/slice";

function App() {
  // const dispatch = useAppDispatch();
  // const state: any = useAppSelector((state) => state.recipe);
  // useEffect(() => {
  //   dispatch(getRecipes());
  // }, []);
  return (
    <>
      {/* {state.loading === "pending" ? (*/}
        <div style={{ display: "flex" }}> 
          <Sidebar />
          <Calender />
         </div>
     {/* ) : (
        <h1>loading..</h1>
      )} */}
    </>
  );
}

export default App;
