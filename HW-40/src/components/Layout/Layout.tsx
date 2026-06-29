// Layout - общий шаблон хранится в одном месте, а меняется только содержимое внутри

import type { ReactNode } from "react"; //Чаще всего используется для children, ReactNode описывает всё, что React может отобразить на странице

////<Layout children={<h1>Hello</h1>} />  -компонент получает объект props -из него сразу достаётся children -объект props должен соответствовать типу LayoutProps
type LayoutProps = { 
children: ReactNode;
};

export const Layout = ({children} : LayoutProps) => {  
    return (
        <>
        <header>
            <h1> My Blog </h1>
        </header>

        <main> {children} </main>

        <footer>
            <p> Poland | 2026 </p>
        </footer>
        </>
    );
};