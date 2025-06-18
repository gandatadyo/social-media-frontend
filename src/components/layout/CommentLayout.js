"use client";

import { useEffect, useState } from "react";
import { getCookies, setCookie } from '../../utils/helperClient';
import { BASE_URL } from '../../utils/api';
import axios from 'axios';


export default function Comment({ postId }) {
    const [listComment, setListComment] = useState([]);
    const [description, setDescription] = useState('');

    const getComments = async () => {
        try {
            console.log('hit');
            const response = await axios.get(`${BASE_URL}/comments/${postId}`, {
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            if (response.status === 200) {
                setListComment(response.data.data);
            } else {

            }
        } catch (error) {
            if (error.response && error.response.data && error.response.data.message) {
            } else {
            }
        }
    }

    const sendComments = async (description) => {
        console.log('asdf');
        try {
            const response = await axios.post(`${BASE_URL}/create_comment`, {
                token: getCookies().token,
                post_id: postId,
                message: description
            });

            if (response.status === 200) {
                getComments();
            } else {
                console.error('Failed to create post');
            }
        } catch (error) {
            console.log(error);
            console.error('Error creating post:', error);
        }
    }


    useEffect(() => {
        getComments();
    }, []);


    return (
        <div>
            <div>
                {listComment.length === 0 ? (
                    <div style={{ background: '#fff', padding: '1rem', borderRadius: '8px', boxShadow: '0 1px 4px rgba(0,0,0,0.05)' }}>
                        <div>Tidak ada comment.</div>
                    </div>
                ) : (
                    listComment.map((post, idx) => (
                        <div key={post.id || idx} className="bg-gray-50" style={{ padding: '1rem', borderRadius: '8px', boxShadow: '0 1px 4px rgba(0,0,0,0.05)', marginBottom: '1rem', display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                            {/* Profile Image */}
                            <div>
                                {post.user?.profileImageUrl ? (
                                    <img
                                        src={post.user.profileImageUrl}
                                        alt="Profile"
                                        style={{ width: 48, height: 48, borderRadius: '50%', objectFit: 'cover', background: '#eee' }}
                                    />
                                ) : (
                                    <div style={{
                                        width: 48,
                                        height: 48,
                                        borderRadius: '50%',
                                        background: '#c7d2fe',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        fontWeight: 'bold',
                                        fontSize: 20,
                                        color: '#6366f1'
                                    }}>
                                        {post.name ? post.name.charAt(0).toUpperCase() : 'U'}
                                    </div>
                                )}
                            </div>
                            <div style={{ flex: 1 }}>
                                <div style={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>{post.name || 'User'}</div>
                                <div>{post.comment}</div>
                            </div>
                        </div>
                    ))
                )}
            </div>
            <div style={{ marginTop: '1.5rem' }}>
                <textarea className="bg-gray-50 "
                    placeholder="Write a comment..."
                    rows={3}
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                    style={{ width: '100%', resize: 'vertical', padding: '0.5rem' }}
                />
                <button
                    onClick={() => {
                        if (description.trim()) {
                            sendComments(description);
                            setDescription('');
                        }
                    }}
                    style={{ padding: '0.5rem 1.5rem', background: '#6366f1', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                >
                    Post
                </button>
            </div>
        </div>
    );
}