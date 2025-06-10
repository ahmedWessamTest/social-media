import PostLayout from "../../components/postLayout/postLayout";
import CreatePost from "./CreatePost";
import FriendSuggestions from "../../components/FriendSuggestions";
const Home = () => {
  // const posts = useLoaderData();
  // console.log(posts);
  // console.log(navigation);

  return (
    <>
      <div className="container mx-auto">
        <div className="grid py-7 lg:grid-cols-12 gap-3 ">
          
          <div className="feed  ms-4 col-span-9 space-y-4">
            <CreatePost />
            <PostLayout />
          </div>
          <div className="lg:col-span-3 hidden lg:block">
            <FriendSuggestions />
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
