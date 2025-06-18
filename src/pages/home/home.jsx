import PostLayout from "../../components/postLayout/postLayout";
import CreatePost from "./CreatePost";
import FriendSuggestions from "../../components/FriendSuggestions";
const Home = () => {
  // const posts = useLoaderData();
  // console.log(posts);
  // console.log(navigation);

  return (
    <>
      <div className="grid py-7 lg:grid-cols-12 gap-3 ">
        <div className="feed col-span-8 space-y-4">
          <CreatePost />
          <PostLayout />
        </div>
        <div className="lg:col-span-4 hidden lg:block">
          <FriendSuggestions />
        </div>
      </div>
    </>
  );
};

export default Home;
