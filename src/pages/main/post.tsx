import { Post as IPost } from "./main";
import { collection, query, where, deleteDoc, doc } from "firebase/firestore";
import { auth, db } from "../../config/firebse";
import { addDoc, getDocs } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect, useState } from "react";

interface Props {
  post: IPost;
}

interface Like {
  likeId: string;
  userId: string;
}

export const Post = (props: Props) => {
  const { post } = props;
  const [user] = useAuthState(auth);

  const [like, setLike] = useState<Like[] | null>(null);

  const likesRef = collection(db, "likes");

  const likesDoc = query(likesRef, where("postId", "==", post.id));

  const getLikes = async () => {
    const data = await getDocs(likesDoc);
    setLike(
      data.docs.map((doc) => ({ userId: doc.data().userId, likeId: doc.id }))
    );
  };

  const addlike = async () => {
    try {
      const newDoc = await addDoc(likesRef, {
        userId: user?.uid,
        postId: post.id,
      });
      if (user) {
        setLike((prev) =>
          prev
            ? [...prev, { userId: user?.uid, likeId: newDoc.id }]
            : [{ userId: user?.uid, likeId: newDoc.id }]
        );
      }
    } catch (err) {
      console.log(err);
    }
  };

  const removelike = async () => {
    try {
      const likeToDeleteQuery = query(
        likesRef,
        where("postId", "==", post.id),
        where("userId", "==", user?.uid)
      );
      const likeToDeleteData = await getDocs(likeToDeleteQuery);
      const likeId = likeToDeleteData.docs[0].id;
      const likeToDelete = doc(db, "likes", likeId);

      await deleteDoc(likeToDelete);
      if (user) {
        setLike(
          (prev) => prev && prev?.filter((like) => like.likeId !== likeId)
        );
      }
    } catch (err) {
      console.log(err);
    }
  };

  const hasUserLiked = like?.find((lik) => lik.userId === user?.uid);

  useEffect(() => {
    getLikes();
  }, []);

  return (
    <div>
      <div className="title">
        <h1>{post.title}</h1>
      </div>
      <div className="body">
        <p> {post.description}</p>
      </div>
      <div className="footer">
        <p>@{post.username}</p>
        <button onClick={hasUserLiked ? removelike : addlike}>
          {hasUserLiked ? <> &#128078;</> : <>&#128077;</>}
        </button>
        {like && <p>Likes :{like?.length}</p>}
      </div>
    </div>
  );
};
