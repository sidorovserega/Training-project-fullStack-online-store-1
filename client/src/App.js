import React, { useContext, useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import AppRouter from "./conponents/AppRouter";
import NavBar from "./conponents/NavBar";
import { observer } from "mobx-react-lite";
import { Context } from ".";
import { check } from "./http/userAPI";
import { Spinner } from "react-bootstrap";

const App = observer(() => {
  const {user} = useContext(Context);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    check()
      .then(data => {
        user.setUser(data);
        user.setIsAuth(true);
      })
      .finally(() => setLoading(false))
  }, []);
  //создаем заглушки при загрузке, чтобы NavBar не перерендеривался
  if (loading) {
    return <Spinner  animation={"grow"}/>
  }

  return (
    <BrowserRouter className="App">
      <NavBar/>
      <AppRouter/>
    </BrowserRouter>
  );
});

export default App;
