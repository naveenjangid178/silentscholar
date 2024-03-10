import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

export default function Post() {
    const [post, setPost] = useState(null);
    const { slug } = useParams();
    const navigate = useNavigate();

    const userData = useSelector((state) => state.auth.userData);

    const isAuthor = post && userData ? post.userId === userData.$id : false;

    useEffect(() => {
        if (slug) {
            appwriteService.getPost(slug).then((post) => {
                if (post) setPost(post);
                else navigate("/");
            });
        } else navigate("/");
    }, [slug, navigate]);

    const deletePost = () => {
        appwriteService.deletePost(post.$id).then((status) => {
            if (status) {
                appwriteService.deleteFile(post.featuredImage);
                navigate("/");
            }
        });
    };

    return post ? (
        <div className="mt-16 md:ml-40">
            <Container>
                <div className="flex flex-col mb-4 relative bg-transparent shadow-black shadow-lg rounded-xl p-4 pb-1 w-fit m-auto">
                    <img
                        src={appwriteService.getFilePreview(post.featuredImage)}
                        alt={post.title}
                        className="rounded-xl max-h-[45vh] hover:scale-105 duration-500"
                    />

                    {isAuthor && (
                        <div className="flex">
                            <Link to={`/edit-post/${post.$id}`}>
                                <Button bgColor="bg-none">
                                    <img src="/edit.png" className="w-8" alt="" />
                                </Button>
                            </Link>
                            <Button bgColor="bg-none" onClick={deletePost}>
                                    <img src="/delete.png" className="w-8" alt="" />
                            </Button>
                        </div>
                    )}
                </div>
                <div className="w-full mb-6">
                    <h1 className="text-2xl font-bold">{post.title}</h1>
                </div>
                <div className="browser-css">
                    {parse(post.content)}
                </div>
            </Container>
        </div>
    ) : null;
}
