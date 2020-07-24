import React, { Fragment, useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import CreatePostModal from "./CreatePostModal";
import DeleteModal from "./DeleteModal";
import AuthContext from "./AuthContext";

const AdminDashboard = () => {
  const [latestPosts, changePostData] = useState(null);
  const [countData, changeCounts] = useState(null);
  const [selectedPostType, changeSelectedType] = useState("all");
  const [isCreateModalOpen, changeModalOpen] = useState(false);
  const [isDeleteModalOpen, changeDeleteModalOpen] = useState(false);
  const [currentPost, setCurrentPost] = useState(null);
  const [showDashboard, setDashboardVisible] = useState(false);
  const authCtx = useContext(AuthContext);
  const selectedCategory = {
    all: "All Posts",
    travel: "Travel Posts",
    books: "Books Posts",
    miscl: "Miscl Posts",
  };
  useEffect(() => {
    console.log(sessionStorage.getItem("token"));
    if (sessionStorage.getItem("token")) {
      setDashboardVisible(true);
      getRecentPosts();
    } else {
      setDashboardVisible(false);
    }
  }, [isCreateModalOpen]);

  const getRecentPosts = async () => {
    try {
      const res = await axios.get(
        "/api/posts?limit=25&select=title,postType,postType,createdAt"
      );
      changePostData(res.data.data);

      const countVal = await axios.get("/api/posts/count");
      const { count, travelcount, bookcount, misclcount } = countVal.data;
      // console.log(countVal);
      changeCounts({
        count,
        travelcount,
        bookcount,
        misclcount,
      });
    } catch (error) {
      console.log(error);
    }
  };
  const postTypeSelected = async (postType) => {
    try {
      let res = null;
      if (postType === "all") {
        res = await axios.get(
          "/api/posts?limit=25&select=title,postType,postType,createdAt"
        );
      } else {
        res = await axios.get(
          `/api/posts?postType=${postType}&limit=25&select=title,postType,postType,createdAt`
        );
      }
      changeSelectedType(postType);
      changePostData(res.data.data);
    } catch (err) {
      console.log(err);
    }
  };
  const deletePost = async () => {
    try {
      const res = await axios.delete(`/api/posts/${currentPost._id}`);
      changeDeleteModalOpen(false);
      getRecentPosts();
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeletePost = (post) => {
    setCurrentPost(post);
    changeDeleteModalOpen(true);
  };
  return showDashboard ? (
    <Fragment>
      <section id="actions" className="py-4 mb-4 bg-light">
        <div className="container">
          <div className="row">
            <div className="col-md-3">
              <div
                className="btn btn-primary btn-block"
                // data-toggle="modal"
                // data-target="#addPostModal"
                onClick={() => changeModalOpen(true)}
              >
                <i className="fas fa-plus"></i> Add Post
              </div>
            </div>
            <div className="col-md-3">
              <div
                className="btn btn-success btn-block dropdown-toggle"
                data-toggle="dropdown"
              >
                {selectedCategory[selectedPostType]}
              </div>
              <div className="dropdown-menu">
                <a
                  className="dropdown-item"
                  onClick={() => {
                    postTypeSelected("all");
                  }}
                >
                  <i className="fas fa-globe"></i> All
                </a>
                <a
                  className="dropdown-item"
                  onClick={() => {
                    postTypeSelected("travel");
                  }}
                >
                  <i className="fas fa-road"></i> Travel
                </a>
                <a
                  className="dropdown-item"
                  onClick={() => {
                    postTypeSelected("books");
                  }}
                >
                  <i className="fas fa-book"></i> Books
                </a>
                <a
                  className="dropdown-item"
                  onClick={() => {
                    postTypeSelected("miscl");
                  }}
                >
                  <i className="fab fa-affiliatetheme"></i> Miscl
                </a>
              </div>
            </div>

            <div className="col-md-3">
              <Link to="/admin" className="btn btn-warning btn-block">
                <i className="fas fa-sign-out-alt"></i> Log Out
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section id="posts">
        <div className="container">
          <div className="row">
            <div className="col-md-9">
              <div className="card">
                <div className="card-header">
                  <h4>Latest Posts</h4>
                </div>
                <table className="table table-striped">
                  <thead className="thead-dark">
                    <tr>
                      <th>#</th>
                      <th>Title</th>
                      <th>Category</th>
                      <th>Date</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {latestPosts &&
                      latestPosts.map((post, idx) => (
                        <tr key={post._id}>
                          <td>{idx + 1}</td>
                          <td>{post.title}</td>
                          <td>{post.postType}</td>
                          <td>{moment(post.createdAt).format("DD-MM-YYYY")}</td>
                          <td>
                            <div className="row">
                              <Link
                                to={`/admin/postedit/${post._id}`}
                                className="btn btn-secondary col-md-9"
                              >
                                <i className="fas fa-angle-double-right"></i>{" "}
                                Details
                              </Link>
                              <i
                                className="fas fa-trash col-md-3 icon"
                                // onClick={() => deletePost(post._id)}
                                onClick={() => handleDeletePost(post)}
                              ></i>
                            </div>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card text-center bg-primary text-white mb-3">
                <div className="card-body">
                  <h3>Posts</h3>
                  <h4 className="display-4">
                    <i className="fas fa-pencil-alt"></i>{" "}
                    {(countData && countData.count) || 0}
                  </h4>
                  {/* <a href="posts.html" className="btn btn-outline-light btn-sm">
                    View
                  </a> */}
                </div>
              </div>

              {countData ? (
                <div className="card text-center bg-success text-white mb-3">
                  <div className="card-body">
                    <h3>Categories</h3>
                    <h6 className="display-4">
                      <i className="fas fa-road"></i>{" "}
                      {countData.travelcount || 0}
                    </h6>
                    <h6 className="display-4">
                      <i className="fas fa-book"></i> {countData.bookcount || 0}
                    </h6>
                    <h6 className="display-4">
                      <i className="fab fa-affiliatetheme"></i>{" "}
                      {countData.misclcount || 0}
                    </h6>
                    {/* <a
                    href="categories.html"
                    className="btn btn-outline-light btn-sm"
                  >
                    View
                  </a> */}
                  </div>
                </div>
              ) : null}

              {/* <div className="card text-center bg-warning text-white mb-3">
                <div className="card-body">
                  <h3>Users</h3>
                  <h4 className="display-4">
                    <i className="fas fa-users"></i> 4
                  </h4>
                  <a href="users.html" className="btn btn-outline-light btn-sm">
                    View
                  </a>
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </section>
      <CreatePostModal
        isOpen={isCreateModalOpen}
        closeModal={() => changeModalOpen(false)}
      />
      <DeleteModal
        postTitle={currentPost && currentPost.title}
        isOpen={isDeleteModalOpen}
        closeModal={() => {
          setCurrentPost(null);
          changeDeleteModalOpen(false);
        }}
        onPostDelete={() => deletePost()}
      />
    </Fragment>
  ) : (
    <h2>Please Login!</h2>
  );
};

export default AdminDashboard;
