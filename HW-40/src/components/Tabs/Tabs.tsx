//Tabs (вкладки) — это кнопки, которые позволяют переключаться между разными категориями.
import { Tab } from "../Tab/Tab";

type TabsProps = {
  activeTab: string;
  setActiveTab: (value: string) => void;
};

const tabs = [
  {
    title: "All",
    value: "all",
  },
  {
    title: "Frontend",
    value: "frontend",
  },
  {
    title: "Backend",
    value: "backend",
  },
];

export const Tabs = ({ activeTab, setActiveTab }: TabsProps) => {
  return (
    <>
      {tabs.map((tab) => (
        <Tab
          key={tab.value}
          title={tab.title}
          value={tab.value}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
      ))}
    </>
  );
};
