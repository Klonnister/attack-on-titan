export const homeLinks = [
    {
        name: 'Characters',
        id: 'characters',
        img: '/characters.gif',
        url: { name: 'characters' },
    },
    {
        name: 'Episodes',
        id: 'episodes',
        img: '/episodes.gif',
        url: '/',
    },
    {
        name: 'Locations',
        id: 'locations',
        img: '/locations.gif',
        url: '/',
    },
    {
        name: 'Titans',
        id: 'titans',
        img: '/titans.gif',
        url: '/',
    },
]

const links = [
    {
        name: 'Home',
        id: 'home',
        url: '/'
    },

    ...homeLinks,
]

export default links