import Login from './Components/Login'
import Home from "./Components/Home";
import Error from "./Components/Error"
import User from "./Components/User";
import Movie from "./Components/Movie";
import Room from "./Components/Room";
import Cine from "./Components/Cine";
import Reservation from "./Components/Reservation";
import Session from "./Components/Session";
import UserNew from "./Components/UserNew";

const routes = [
    {
        path: "/",
        component: Login,
        exact: true
    },
    {
        path:"/home",
        component: Home,
        exact: true
    },
    {
        path:"/user",
        component: User,
        exact: true
    },
    {
        path:"/user-new",
        component: UserNew,
        exact: true
    },
    {
        path:"/movie",
        component: Movie,
        exact: true
    },
    {
        path:"/room",
        component: Room,
        exact: true
    },
    {
        path:"/session",
        component: Session,
        exact: true
    },
    {
        path:"/cine",
        component: Cine,
        exact: true
    },
    {
        path:"/reservation",
        component: Reservation,
        exact: true
    },
    {
        component: Error,
        exact: true
    }
];

export default routes;
