const sampleListings = [
    {
        title: "Cozy Beachfront Cottage",
        description: "Escape to this charming beachfront cottage for a relaxing getaway. Enjoy stunning ocean views and easy access to the beach.",
        image: {
            filename: "beachfront-cottage-malibu",
            url: "https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?ixlib=rb-4.0.3&ixid=...",
        },
        price: 1500,
        location: "Malibu",
        country: "United States",
    },
    {
        title: "Modern Loft in Downtown",
        description: "Stay in the heart of the city in this stylish loft apartment. Perfect for urban explorers!",
        image: {
            filename: "modern-loft-nyc",
            url: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?ixlib=rb-4.0.3&ixid=...",
        },
        price: 1200,
        location: "New York City",
        country: "United States",
    },
    {
        title: "Mountain Retreat",
        description: "Unplug and unwind in this peaceful mountain cabin. Surrounded by nature, it's a perfect place to recharge.",
        image: {
            filename: "mountain-retreat-aspen",
            url: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&ixid=...",
        },
        price: 1000,
        location: "Aspen",
        country: "United States",
    },
    {
        title: "Historic Villa in Tuscany",
        description: "Experience the charm of Tuscany in this beautifully restored villa. Explore the rolling hills and vineyards.",
        image: {
            filename: "historic-villa-tuscany",
            url: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=...",
        },
        price: 2500,
        location: "Florence",
        country: "Italy",
    },
    {
        title: "Secluded Treehouse Getaway",
        description: "Live among the treetops in this unique treehouse retreat. A true nature lover's paradise.",
        image: {
            filename: "treehouse-getaway-portland",
            url: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&ixid=...",
        },
        price: 800,
        location: "Portland",
        country: "United States",
    },
    {
        title: "Beachfront Paradise",
        description: "Step out of your door onto the sandy beach. This beachfront condo offers the ultimate relaxation.",
        image: {
            filename: "beachfront-paradise-cancun",
            url: "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?ixlib=rb-4.0.3&ixid=...",
        },
        price: 2000,
        location: "Cancun",
        country: "Mexico",
    },
    {
        title: "Rustic Cabin by the Lake",
        description: "Spend your days fishing and kayaking on the serene lake. This cozy cabin is perfect for outdoor enthusiasts.",
        image: {
            filename: "rustic-lake-cabin-tahoe",
            url: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?ixlib=rb-4.0.3&ixid=...",
        },
        price: 900,
        location: "Lake Tahoe",
        country: "United States",
    },
    {
        title: "Luxury Penthouse with City Views",
        description: "Indulge in luxury living with panoramic city views from this stunning penthouse apartment.",
        image: {
            filename: "luxury-penthouse-los-angeles",
            url: "https://images.unsplash.com/photo-1622396481328-9b1b78cdd9fd?ixlib=rb-4.0.3&ixid=...",
        },
        price: 3500,
        location: "Los Angeles",
        country: "United States",
    },
    {
        title: "Ski-In/Ski-Out Chalet",
        description: "Hit the slopes right from your doorstep in this ski-in/ski-out chalet in the Swiss Alps.",
        image: {
            filename: "ski-chalet-swiss-alps",
            url: "https://images.unsplash.com/photo-1502784444187-359ac186c5bb?ixlib=rb-4.0.3&ixid=...",
        },
        price: 3000,
        location: "Verbier",
        country: "Switzerland",
    },
    {
        title: "Safari Lodge in the Serengeti",
        description: "Experience the thrill of the wild in a comfortable safari lodge. Witness the Great Migration up close.",
        image: {
            filename: "safari-lodge-serengeti",
            url: "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?ixlib=rb-4.0.3&ixid=...",
        },
        price: 4000,
        location: "Serengeti National Park",
        country: "Tanzania",
    },
    {
        title: "Countryside Farmhouse",
        description: "Relax in the tranquil countryside at this cozy farmhouse. Perfect for families and outdoor lovers.",
        image: {
            filename: "countryside-farmhouse-uk",
            url: "https://images.unsplash.com/photo-1560185127-6ed189bf02ec?ixlib=rb-4.0.3&ixid=...",
        },
        price: 1300,
        location: "Cotswolds",
        country: "United Kingdom",
    },
    {
        title: "Island Bungalow Escape",
        description: "Wake up to ocean breezes in this tropical island bungalow. Just steps from crystal-clear waters.",
        image: {
            filename: "island-bungalow-bali",
            url: "https://images.unsplash.com/photo-1505691723518-34d4982df1a9?ixlib=rb-4.0.3&ixid=...",
        },
        price: 1800,
        location: "Bali",
        country: "Indonesia",
    },
    {
        title: "Charming Alpine Lodge",
        description: "Cozy up in this alpine lodge nestled in the heart of the mountains. A perfect winter retreat.",
        image: {
            filename: "alpine-lodge-austria",
            url: "https://images.unsplash.com/photo-1559563458-527698bf5295?ixlib=rb-4.0.3&ixid=...",
        },
        price: 2200,
        location: "Innsbruck",
        country: "Austria",
    },
    {
        title: "Mediterranean Cliffside Villa",
        description: "Perched on a cliff, this stunning villa offers panoramic views of the Mediterranean Sea.",
        image: {
            filename: "cliffside-villa-santorini",
            url: "https://images.unsplash.com/photo-1502003148287-a82ef80a6abc?ixlib=rb-4.0.3&ixid=...",
        },
        price: 2800,
        location: "Santorini",
        country: "Greece",
    },
    {
        title: "Desert Dome House",
        description: "Stay in a unique dome house in the heart of the desert. Stargazing paradise!",
        image: {
            filename: "desert-dome-house-joshua-tree",
            url: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?ixlib=rb-4.0.3&ixid=...",
        },
        price: 1100,
        location: "Joshua Tree",
        country: "United States",
    },
    {
        title: "Urban Studio Apartment",
        description: "Compact yet chic studio apartment in the city's vibrant downtown core.",
        image: {
            filename: "urban-studio-toronto",
            url: "https://images.unsplash.com/photo-1588854337236-688b8a4c52bb?ixlib=rb-4.0.3&ixid=...",
        },
        price: 950,
        location: "Toronto",
        country: "Canada",
    },
    {
        title: "Lakeside A-Frame Cabin",
        description: "Classic A-frame architecture right by the lake. Cozy up with a fire after a day outdoors.",
        image: {
            filename: "a-frame-cabin-minnesota",
            url: "https://images.unsplash.com/photo-1523413651479-597eb2da0ad6?ixlib=rb-4.0.3&ixid=...",
        },
        price: 1050,
        location: "Duluth",
        country: "United States",
    },
    {
        title: "Colonial Hacienda",
        description: "Historic colonial hacienda with beautiful courtyards and traditional decor.",
        image: {
            filename: "colonial-hacienda-oaxaca",
            url: "https://images.unsplash.com/photo-1581873372793-b1f9dd720e6c?ixlib=rb-4.0.3&ixid=...",
        },
        price: 1900,
        location: "Oaxaca",
        country: "Mexico",
    },
    {
        title: "Jungle Eco Lodge",
        description: "Immerse yourself in nature in this eco-friendly lodge surrounded by lush jungle.",
        image: {
            filename: "jungle-eco-lodge-costa-rica",
            url: "https://images.unsplash.com/photo-1543248939-ff40856f65d4?ixlib=rb-4.0.3&ixid=...",
        },
        price: 1600,
        location: "Monteverde",
        country: "Costa Rica",
    },
    {
        title: "Nordic Minimalist Apartment",
        description: "Bright, airy apartment with minimalist Scandinavian design elements.",
        image: {
            filename: "nordic-apartment-stockholm",
            url: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&ixid=...",
        },
        price: 1400,
        location: "Stockholm",
        country: "Sweden",
    },
];

module.exports = { data: sampleListings };