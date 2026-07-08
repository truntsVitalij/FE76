import styles from "./tabs.module.css";

function Tabs({current,onChange}) {

    const tabs = [
        "All",
        "Frontend",
        "Backend"
    ]

    return (
        <div className={styles.tabs}>
            {
                tabs.map(tab=>(
                    <button
                        key={tab}
                        onClick={()=>onChange(tab)}
                        className={
                            current===tab
                            ? styles.active
                            : ""
                        }
                    >
                        {tab}
                    </button>
                ))
            }
        </div>
    )
}

export default Tabs;