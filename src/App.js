import React from "react";
import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import Login from "./pages/Login"

function App() {
	return (
		<div className="App">
			<BrowserRouter>
				<Routes>
					<Route path={"/"} element={<Navigate to={"/login"}/>}/>
					<Route path={"/login"} element={<Login />} />
				</Routes>
			</BrowserRouter>
		</div>
	);
}

export default App;
