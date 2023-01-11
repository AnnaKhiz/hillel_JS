import './sass/style.sass';
import React from "react";
import ReactDOM from 'react-dom';
import {MainContainer} from "./components/MainContainer.jsx";
import {UserCard} from "./components/UserCard.jsx";

const App = (props) => {
	return (
		<main>
			<h1 className={"header"}>{props.notification}</h1>
			<MainContainer>
				{MainContainer}
				<UserCard/>{UserCard}
			</MainContainer>
		</main>
	);
}

const root = ReactDOM.createRoot(document.getElementById('main'));
root.render(App({notification: 'User list'}));

