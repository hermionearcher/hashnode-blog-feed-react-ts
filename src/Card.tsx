import { useEffect, useState } from 'react';
import './card.css'

const POSTS_QUERY = `
{
  user(username: "blakeyeboah") {
    publication {
      posts(page: 0) {
        _id
        title
        brief
        slug
        coverImage
        dateAdded
      }
    }
  }
}
`;

const Card = () => {
    const [posts, setPosts] = useState<any[] | string[]>([]);

    useEffect(() => {
        fetch('https://api.hashnode.com/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ query: POSTS_QUERY })
        })
            .then(response => response.json())
            .then(data => setPosts(data.data.user.publication.posts))
    }, [])

    return (
        <>
            <div className="row">


                    <div className="band">
                        {
                            posts.map((post) => (
                                <div className="item">
                                    <a href={`https://hermione.hashnode.dev/${post.slug}`} target="_blank" className="card">
                                        <div className="thumb" style={{ backgroundImage: `url("${post.coverImage}")` }}></div>
                                        <article>
                                            <h1>{post.title}</h1>
                                            <span>{post.brief}</span>
                                        </article>
                                    </a>
                                </div>
                            ))
                        }


                </div>
            </div>

        </>
    )
}

export default Card