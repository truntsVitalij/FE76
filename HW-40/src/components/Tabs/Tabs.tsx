//Tabs (вкладки) — это кнопки, которые позволяют переключаться между разными категориями.

type TabsProps = {
    activeTab: string;
    setActiveTab: (value: string) => void;
}

export const Tabs = ({
    activeTab,
    setActiveTab,
}: TabsProps) => {
    return (
        <>
        <button onClick={() => setActiveTab('all')}> All </button>
        <button onClick={() => setActiveTab('frontend')}> Frontend </button>
        <button onClick={() => setActiveTab('backend')}> Backend </button>
        </>
    )
}
