import Init from "./components/init"
import Home from "./components/home/home"
import tracks from "./components/home/content/tracks"

export default[
    {path: '/', component: Init},
    {path: '/home', component: Home, children:[
        {path: 'tracks', component:tracks}
    ]}
]