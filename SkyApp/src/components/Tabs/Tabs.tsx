import { Button } from "../../shared/ui/Button";
import styles from "./Tabs.module.css"

type Tab = "all" | "favorites" | "popular";

interface TabsProps {
    activeTab: Tab;
    onChange: (tab: Tab) => void;
}

export const Tabs = ({activeTab, onChange}: TabsProps) => {
    return (
        <div className={styles.tab}>

            <Button variant="tab" className={`${styles.tab} ${activeTab === "all" ? styles.active: ""}`}
            onClick={() => onChange("all")}>All</Button>

            <Button variant="tab" className={`${styles.tab} ${activeTab === "favorites" ? styles.active: ""}`}
            onClick={() => onChange("favorites")}>My favorites</Button>

            <Button variant="tab" className={`${styles.tab} ${activeTab === "popular" ? styles.active: ""}`}
            onClick={() => onChange("popular")}>Popular</Button>

        </div>
    );
};