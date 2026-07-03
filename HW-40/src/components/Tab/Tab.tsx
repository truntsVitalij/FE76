
interface TabProps {
    title: string;
    value: string;
    activeTab: string;
    setActiveTab: (value: string) => void;
}

export const Tab = ({ title, value, activeTab, setActiveTab}: TabProps) => {
    return(
        <button
        onClick={() => setActiveTab(value)}
        disabled={activeTab === value}
        style={{
        fontWeight: activeTab === value ? "bold" : "normal",
      }}
      > {title} </button>
    )
}