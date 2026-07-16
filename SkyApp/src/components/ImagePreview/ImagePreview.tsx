import { useDispatch, useSelector } from "react-redux"
import type { RootState } from "../../store";
import { posts } from "../../data/Posts";
import { Button } from "../../shared/ui/Button";
import { ClosePreview, NextPreview, PrevPreview } from "../../store/actions/previewAction";
import styles from "./ImagePreview.module.css"

export const ImagePreview = () => {
const dispatch = useDispatch();
// const {isOpen, currentPostId} = useSelector((state: RootState) => state);
const isOpen = useSelector(
  (state: RootState) => state.isOpen
);

const currentPostId = useSelector(
  (state: RootState) => state.currentPostId
);
if(!isOpen) return null;

const post = posts.find (
    p=>p.id === currentPostId
);
if(!post) return null;

return (
    <div className={styles.overlay}>
        <Button className={styles.close} onClick={() => dispatch(ClosePreview())}>X</Button>
        <Button  className={styles.prev} onClick={() => dispatch(PrevPreview())}> ← </Button>

        <img className={styles.image} src={post.image} alt={post.title} />

        <Button className={styles.next} onClick={() => dispatch(NextPreview())}> → </Button>
    </div>
)

}