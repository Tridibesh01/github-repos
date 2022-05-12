import axios from "axios";
import { useState, useEffect } from "react";
import Posts from "./components/Posts";
import { Form, Button, Row, Col, Dropdown } from "react-bootstrap";

const App = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [blank, setBlank] = useState(true);
  const [language, setLanguage] = useState("");
  const [name, setName] = useState("");
  const [sortBy, setSortBy] = useState("stars");
  const [order, setOrder] = useState("desc");
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const onSubmit = (e) => {
    e.preventDefault();
    const fetchPosts = async (str) => {
      setLoading(true);
      const { data } = await axios.get(str);
      setPosts(data.items);
      setLoading(false);
    };
    let str = "https://api.github.com/search/repositories?q=";
    if (language || name) {
      setBlank(false);
      if (name) str = str + (name + "in:name");
      if (language)
        str =
          str + (name ? "+" + "language:" + language : "language:" + language);

      str = str + "&per_page=100";
      // console.log(str);
      fetchPosts(str);
    } else {
      setBlank(true);
    }
  };

  const handleSortByChange = (e) => {
    const value = e.target.value;
    setSortBy(value);
    if (value === "stars") {
      function compare_stars(a, b) {
        if (a.stargazers_count < b.stargazers_count) {
          return -1;
        }
        if (a.stargazers_count > b.stargazers_count) {
          return 1;
        }
        return 0;
      }

      posts.sort(compare_stars);
      if (order === "desc") posts.reverse();
      setPosts([...posts]);
      console.log(posts);
    } else {
      function compare_names(a, b) {
        if (a.name.toLowerCase() < b.name.toLowerCase()) {
          return -1;
        }
        if (a.name.toLowerCase() > b.name.toLowerCase()) {
          return 1;
        }
        return 0;
      }

      posts.sort(compare_names);
      if (order === "desc") posts.reverse();
      setPosts([...posts]);
    }
  };

  const handleOrderChange = (e) => {
    const value = e.target.value;
    setOrder(value);
    if (sortBy === "stars") {
      function compare_stars(a, b) {
        if (a.stargazers_count < b.stargazers_count) {
          return -1;
        }
        if (a.stargazers_count > b.stargazers_count) {
          return 1;
        }
        return 0;
      }

      posts.sort(compare_stars);
      if (value === "desc") posts.reverse();
      setPosts([...posts]);
    } else {
      function compare_names(a, b) {
        if (a.name.toLowerCase() < b.name.toLowerCase()) {
          return -1;
        }
        if (a.name.toLowerCase() > b.name.toLowerCase()) {
          return 1;
        }
        return 0;
      }

      posts.sort(compare_names);
      if (value === "desc") posts.reverse();
      setPosts([...posts]);
    }
  };

  const handleCountChange = (e) => {
    console.log(e.target.value);
    setItemsPerPage(e.target.value);
  };

  return (
    <div className="container">
      <div className="page-header">
        <h1>Search</h1>
      </div>

      <Form onSubmit={onSubmit}>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridEmail">
            <Form.Control
              type="text"
              placeholder="Language"
              onChange={(e) => {
                setLanguage(e.target.value);
              }}
            />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridPassword">
            <Form.Control
              type="text"
              placeholder="Name"
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
          </Form.Group>
        </Row>

        <Button
          size="lg"
          style={{ width: "100%" }}
          variant="dark"
          type="submit"
        >
          Submit
        </Button>
      </Form>

      <Form>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridState">
            <Form.Label>Sort by</Form.Label>
            <Form.Select
              value={sortBy}
              onChange={(e) => {
                handleSortByChange(e);
              }}
            >
              <option value="stars">Stars</option>
              <option value="name">Name</option>
            </Form.Select>
          </Form.Group>

          <Form.Group as={Col} controlId="formGridState">
            <Form.Label>Order</Form.Label>
            <Form.Select
              value={order}
              onChange={(e) => {
                handleOrderChange(e);
              }}
            >
              <option value="desc">Descending</option>
              <option value="asc">Ascending</option>
            </Form.Select>
          </Form.Group>

          <Form.Group as={Col} controlId="formGridState">
            <Form.Label>Count per page</Form.Label>
            <Form.Select
              value={itemsPerPage}
              onChange={(e) => {
                handleCountChange(e);
              }}
            >
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={30}>30</option>
              <option value={40}>40</option>
              <option value={50}>50</option>
            </Form.Select>
          </Form.Group>
        </Row>
      </Form>

      <div>
        <h2>List</h2>
      </div>

      <Posts
        posts={posts}
        loading={loading}
        itemsPerPage={itemsPerPage}
        blank={blank}
      />
    </div>
  );
};

export default App;
