import { useState } from "react";
import PostCard from "../PostCard/PostCard";
import "./PostList.module.css";

type Post = {
  id: number;
  title: string;
  body: string;
  image: string;
  likes: number;
  comments: number;
  author: string;
  authorAvatar: string;
};

type PostListProps = {
  onPostSelect: (post: Post) => void;
};

const postsData: Post[] = [
  {
    id: 1,
    title:
      "Astronauts prep for new solar arrays on nearly seven-hour spacewalk",
    body: "Two NASA astronauts are preparing to install new solar arrays on the International Space Station during a nearly seven-hour spacewalk.",
    image: "/space1.jpg",
    likes: 124,
    comments: 18,
    author: "NASA",
    authorAvatar: "https://i.pravatar.cc/50?img=1",
  },
  {
    id: 2,
    title:
      "Astronauts prep for new solar arrays on nearly seven-hour spacewalk",
    body: "The spacewalk is scheduled to begin at 8:00 a.m. EDT and will last approximately six and a half hours.",
    image: "/space2.jpg",
    likes: 89,
    comments: 12,
    author: "SpaceX",
    authorAvatar: "https://i.pravatar.cc/50?img=2",
  },
  {
    id: 3,
    title:
      "Astronautes prep for new solar arrays on nearly seven-hour spacewalk",
    body: "French astronaut Thomas Pesquet will lead the installation of the new solar arrays.",
    image: "/space3.jpg",
    likes: 256,
    comments: 34,
    author: "ESA",
    authorAvatar: "https://i.pravatar.cc/50?img=3",
  },
  {
    id: 4,
    title:
      "Astronauts prep for new solar arrays on nearly seven-hour spacewalk",
    body: "The new solar arrays are part of a broader effort to upgrade the International Space Station.",
    image: "/space4.jpg",
    likes: 67,
    comments: 8,
    author: "NASA",
    authorAvatar: "https://i.pravatar.cc/50?img=4",
  },
  {
    id: 5,
    title: "Astronauts prep for new spacewalk",
    body: "Astronauts are preparing for a spacewalk to upgrade the solar power system.",
    image: "/space5.jpg",
    likes: 312,
    comments: 45,
    author: "Roscosmos",
    authorAvatar: "https://i.pravatar.cc/50?img=5",
  },
  {
    id: 6,
    title: "Astronauts prep for new spacewalk",
    body: "The spacewalk is part of ongoing maintenance and upgrade of the ISS.",
    image: "/space6.jpeg",
    likes: 98,
    comments: 15,
    author: "NASA",
    authorAvatar: "https://i.pravatar.cc/50?img=6",
  },
  {
    id: 7,
    title: "Astronauts prep for spacewalk",
    body: "Astronauts are getting ready for a spacewalk outside the International Space Station.",
    image: "/space7.jpg",
    likes: 156,
    comments: 22,
    author: "JAXA",
    authorAvatar: "https://i.pravatar.cc/50?img=7",
  },
  {
    id: 8,
    title: "Astronauts prep for spacewalk",
    body: "Two NASA astronauts will exit the space station on Thursday for a spacewalk.",
    image: "/space8.jpg",
    likes: 201,
    comments: 28,
    author: "NASA",
    authorAvatar: "https://i.pravatar.cc/50?img=8",
  },
  {
    id: 9,
    title: "Astronauts prep for space walk",
    body: "The International Space Station crew is preparing for a spacewalk.",
    image: "/space9.jpg",
    likes: 143,
    comments: 19,
    author: "SpaceX",
    authorAvatar: "https://i.pravatar.cc/50?img=9",
  },
  {
    id: 10,
    title: "Astronauts prep for spacewalk",
    body: "Astronauts will spend approximately seven hours working on the exterior of the ISS.",
    image: "/space10.jpg",
    likes: 78,
    comments: 11,
    author: "NASA",
    authorAvatar: "https://i.pravatar.cc/50?img=10",
  },
];

function PostList({ onPostSelect }: PostListProps) {
  const [posts] = useState<Post[]>(postsData);

  return (
    <div className="post-list">
      <div className="post-list-header">
        <h1>SPACE</h1>
      </div>
      <div className="post-grid">
        {posts.map((post) => (
          <PostCard
            key={post.id}
            post={post}
            onClick={() => onPostSelect(post)}
          />
        ))}
      </div>
    </div>
  );
}

export default PostList;
