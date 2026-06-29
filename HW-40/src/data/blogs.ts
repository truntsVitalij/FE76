// данные для блога

export const blogs = [
    {
        id: 1,
        title: "React",
        category: ["frontend"],
        text: `Routing determines what content or pages to display when a user visits a particular URL. You need to set up a router to map URLs to different parts of your app. 
        You’ll also need to handle nested routes, route parameters, and query parameters.  
        Routers can be configured within your code, or defined based on your component folder and file structures. 
        Routers are a core part of modern applications, and are usually integrated with data fetching (including prefetching data for a whole page for faster loading), 
        code splitting (to minimize client bundle sizes), and page rendering approaches (to decide how each page gets generated).`,
        }, 

        {
        id: 2,
        title: "TypeScript",
        category: ["frontend"],
        text: `Fetching data from a server or other data source is a key part of most applications. 
        Doing this properly requires handling loading states, error states, and caching the fetched data, which can be complex.
        Purpose-built data fetching libraries do the hard work of fetching and caching the data for you, letting you focus on what data your app needs and how to display it.  
        These libraries are typically used directly in your components, 
        but can also be integrated into routing loaders for faster pre-fetching and better performance, and in server rendering as well.`,
        },

         {
        id: 3,
        title: "HTML",
        category: ["frontend", "backend"],
        text: `Code-splitting is the process of breaking your app into smaller bundles that can be loaded on demand. 
        An app’s code size increases with every new feature and additional dependency. 
        Apps can become slow to load because all of the code for the entire app needs to be sent before it can be used. 
        Caching, reducing features/dependencies, and moving some code to run on the server can help mitigate slow loading but are incomplete solutions that can sacrifice functionality if overused.`,
        },

         {
        id: 3,
        title: "Phyton",
        category: ["backend"],
        text: `Your rendering strategies need to integrate with your router so apps built with your framework can choose the rendering strategy on a per-route level. 
        This will enable different rendering strategies without having to rewrite your whole app. For example, 
        the landing page for your app might benefit from being statically generated (SSG), 
        while a page with a content feed might perform best with server-side rendering.
        Using the right rendering strategy for the right routes can decrease the time it takes for the first byte of content to be loaded (Time to First Byte), 
        the first piece of content to render (First Contentful Paint), and the largest visible content of the app to render (Largest Contentful Paint).`,
        },
];