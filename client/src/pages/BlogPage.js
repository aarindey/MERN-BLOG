import { useParams } from "react-router-dom";

const BlogPage = () => {
    const {blogId}=useParams;
   

    return (
        <>
          <h1>{blogId}</h1>
          <h1>vbft</h1>
        
        </>
    );
}

export default BlogPage;