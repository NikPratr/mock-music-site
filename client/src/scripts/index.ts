import '../styles/index.css';

const browse = require('./browse');
const carousels = require('./carousels');
const generics = require('./generics');
const home = require('./home');
const Music = require('./Music');
const MusicList = require('./MusicList');
const nav = require('./nav');

//@ts-ignore
const filesContext = require.context('../images', false, /\.js$/);
const components = filesContext.keys().map(filesContext);