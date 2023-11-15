import { TextField, Button, Container } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { addArticle } from "../../../../redux/articlesSlice";
import { useDispatch } from "react-redux";

interface IPostState {
  title: string;
  body: string;
}
function CreateArticle() {
  const dispatch = useDispatch();
  const [post, setPost] = useState<IPostState>({
    title: "",
    body: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    const postValues = { ...post, [name]: value };
    setPost(postValues);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (
      post.title === "" ||
      post.body === "" ||
      post.title.trim() === "" ||
      post.body.trim() === ""
    ) {
      alert("Title or Body is empty.");
      return;
    }

    const { data } = await axios.post(`add`, post);
    dispatch(addArticle(data));
  };

  return (
    <Container
      style={{ paddingLeft: "0", marginLeft: "0" }}
      sx={{ width: "50%" }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          padding: 0,
          margin: 0,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <TextField
          style={{ marginBottom: "20px" }}
          id="standard-basic"
          label="title"
          variant="standard"
          placeholder="title"
          name="title"
          value={post.title}
          onChange={handleChange}
        />

        <TextField
          style={{ marginBottom: "5px" }}
          id="outlined-multilince-static"
          label="body"
          multiline
          rows={4}
          placeholder="Enter content here"
          name="body"
          value={post.body}
          onChange={handleChange}
        />

        <Button
          style={{ marginBottom: "20px", fontWeight: 600 }}
          variant="contained"
          color="primary"
          size="small"
          onClick={handleSubmit}
        >
          Send
        </Button>
      </form>
    </Container>
  );
}

export default CreateArticle;
