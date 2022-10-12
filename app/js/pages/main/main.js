import {CategoriesCard, NewsCard, Server} from "./classes.js";

const server = new Server();

const categoriesBlock = new CategoriesCard({
    index: "1",
    name: 'Категории',
    data: [
        {
            "image": "../images/categories/bike-1.png",
            "background": "../images/categories/background-1.png",
            "title": "OFFROAD SERIES",
            "name": "mountain" 
        },
        {
            "image": "../images/categories/bike-2.png",
            "background": "../images/categories/background-2.png",
            "title": "ROAD SERIES",
            "name": "road" 
        },
        {
            "image": "../images/categories/bike-3.png",
            "background": "../images/categories/background-3.png",
            "title": "STREET SERIES",
            "name": "street"
        }
    ]
});

const noveltiesBlock = new CategoriesCard({
    index: "2",
    name: 'Новинки',
    data: [
        {
            "image": "../images/categories/bike-1.png",
            "background": "../images/categories/background-1.png",
            "title": "OFFROAD SERIES"
        },
        {
            "image": "../images/categories/bike-3.png",
            "background": "../images/categories/background-3.png",
            "title": "STREET SERIES"
        }
    ]
});

server.request("news").then(value => {
    value.forEach((news) => {
        const currentNews = new NewsCard(news);
    })
})

