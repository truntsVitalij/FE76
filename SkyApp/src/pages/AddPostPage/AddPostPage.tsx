import React, { useState, type FC } from "react";

import { Link, useNavigate } from "react-router-dom";
import { Container } from "../../components/Container";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";

import styles from "./AddPostPage.module.css";

const AddPostPage: FC = () => {
  const navigate = useNavigate();
  const isDark = false; //временно

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [text, setText] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  const handleDelete = () => {
    setTitle("");
    setCategory("");
    setImage("");
    setDescription("");
    setText("");
  };

  return (
    <Container>
      {/* <AuthLayout title="Add post" dark={isDark}> */}
        <form className={styles.form} onSubmit={handleSubmit}>

            <h1> Add Post</h1>
          <Input label="Title" type="text" value={title} onChange={setTitle} />

          <div className={styles.block}>
            <Input
              label="Category"
              type="text"
              value={category}
              onChange={setCategory}
            />

            <Input
              label="Image"
              type="text"
              value={image}
              onChange={setImage}
            />
            <Button type="button" variant="secondary" > Upload new</Button>
          </div>

          <Input
            label="Description"
            type="text"
            value={description}
            onChange={setDescription}
          />
          <Input label="Text" type="text" value={text} onChange={setText} />

<div className={styles.btnContainer}>
          <Button
            className={styles.btnDel}
            variant="secondary2"
            type="button"
            onClick={handleDelete}
          >
            Delete post
          </Button>

          <div className={styles.btnRight}>
            <Button
              className={styles.btnCancel}
              variant="secondary"
              type="button"
              onClick={() => navigate(-1)}
            >
              Cancel
            </Button>
            <Button className={styles.btnCancel} type="submit">
              Add post
            </Button>
            </div>
          </div>
        </form>
      {/* </AuthLayout> */}
    </Container>
  );
};

export default AddPostPage;
