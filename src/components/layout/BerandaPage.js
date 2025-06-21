"use client";

import { useEffect, useState } from 'react';
import { getCookies, setCookie } from '../../utils/helperClient';
import { BASE_URL } from '../../utils/api';
import CommentLayout from './CommentLayout';
import axios from 'axios';

export default function Beranda() {

  const [listPosts, setListPosts] = useState([]);
  const [description, setDescription] = useState('');

  function logout() {
    const r = confirm('Do you want logout ?')
    if (r) {
      document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      window.location.href = "/login";
    }
  }

  const getPosts = async () => {
    try {
      const response = await axios.post(`${BASE_URL}/posts`, {
        token: getCookies().token
      }, {
        headers: {
          'Content-Type': 'application/json',
        }
      });

      if (response.status === 200) {
        console.log(response);
        setListPosts(response.data.data);
      } else {

      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
      } else {
      }
    }
  }

  function formatTimeAgo(dateString) {
    const date = new Date(dateString);
    const now = new Date();
    const seconds = Math.floor((now - date) / 1000);

    if (seconds < 60) return 'Baru saja';
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes} menit yang lalu`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours} jam yang lalu`;
    const days = Math.floor(hours / 24);
    if (days < 7) return `${days} hari yang lalu`;
    const weeks = Math.floor(days / 7);
    if (weeks < 4) return `${weeks} minggu yang lalu`;
    const months = Math.floor(days / 30);
    if (months < 12) return `${months} bulan yang lalu`;
    const years = Math.floor(days / 365);
    return `${years} tahun yang lalu`;
  }

  const sendPosts = async (description) => {
    try {
      const response = await axios.post(`${BASE_URL}/create_post`, {
        token: getCookies().token,
        description: description
      });

      if (response.status === 200) {
        getPosts();
      } else {
        console.error('Failed to create post');
      }
    } catch (error) {
      console.log(error);
      console.error('Error creating post:', error);
    }
  }

  const deletePosts = async (postId) => {
    try {
      const response = await axios.delete(`${BASE_URL}/delete_post`, {
        data: {
          token: getCookies().token,
          post_id: postId
        }
      });

      if (response.status === 200) {
        getPosts();
      } else {
        console.error('Failed to create post');
      }
    } catch (error) {
      console.log(error);
      console.error('Error creating post:', error);
    }
  }

  const unLikePosts = async (postId) => {
    try {
      const response = await axios.delete(`${BASE_URL}/delete_like`, {
        data: {
          token: getCookies().token,
          post_id: postId
        }
      });

      if (response.status === 200) {
        getPosts();
      } else {
        console.error('Failed to unlike post');
      }
    } catch (error) {
      console.log(error);
      console.error('Error unliking post:', error);
    }
  }

  const likePosts = async (postId) => {
    try {
      const response = await axios.post(`${BASE_URL}/add_like`, {
        token: getCookies().token,
        post_id: postId
      });
      if (response.status === 200) {
        getPosts();
      } else {
        console.error('Failed to like post');
      }
    } catch (error) {
      console.log(error);
      console.error('Error liking post:', error);
    }
  }



  useEffect(() => {
    getPosts();
  }, []);

  // State for modal visibility and selected post
  const [showCommentsModal, setShowCommentsModal] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);

  // Dummy comments data (replace with API call if needed)

  // Function to open modal and set selected post
  const handleShowComments = (post) => {
    setSelectedPost(post);
    setShowCommentsModal(true);
  };

  // Function to close modal
  const handleCloseModal = () => {
    setShowCommentsModal(false);
    setSelectedPost(null);
  };

  return (
    <div className='bg-gray-100 h-[100%]'>

      <nav
        className='bg-white'
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 100,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '1rem'
        }}
      >
        <div className='text-[30px]'>
          <h1 className="text-xl font-bold">
            <span className="text-green-600">Healthy</span>
            <span className="text-orange-500">Mate</span>
            <span className="text-green-600">Forum</span>
          </h1>
        </div>
        {/* Centered search input */}
        <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
          <input
            type="text"
            placeholder="Cari postingan..."
            style={{
              width: 520,
              padding: '0.5rem 1rem',
              borderRadius: 20,
              border: '1px solid #cbd5e1',
              outline: 'none',
              fontSize: 16,
              background: '#f3f4f6',
              color: '#222'
            }}
          // You can add onChange handler here for search functionality
          />
        </div>
        <ul className='text-green-600' style={{ listStyle: 'none', display: 'flex', gap: '1rem', margin: 0, padding: 0 }}>
          <li>
            <a href="#" onClick={logout} style={{ textDecoration: 'none', color: '#16a34a', fontWeight: 600 }}>
              Keluar
            </a>
          </li>
        </ul>
      </nav>

      <div className='container mx-auto' style={{ maxWidth: "900px" }}>
        <div className='flex'>
          <main style={{ flex: 1, padding: '2rem' }}>
            {/* Input for new post */}
            <div style={{ background: '#fff', padding: '2rem', borderRadius: '8px', boxShadow: '0 1px 4px rgba(0,0,0,0.05)', marginBottom: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <textarea
                placeholder="Apa yang sedang kamu pikirkan?"
                value={description}
                onChange={e => setDescription(e.target.value)}
                style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc', resize: 'vertical', minHeight: '48px' }}
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer', color: '#16a34a', fontWeight: 500 }}>
                  <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" style={{ marginRight: 8 }}>
                    <path d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828L18 9.828M7 17a4 4 0 005.656 0l6.586-6.586a4 4 0 00-5.656-5.656L4.929 11.343a6 6 0 108.485 8.485" />
                  </svg>
                  <input type="file" accept="image/*" style={{ display: 'none' }} />
                  Lampirkan Gambar
                </label>
                <button
                  onClick={() => {
                    if (description.trim()) {
                      sendPosts(description);
                      setDescription('');
                    }
                  }}
                  style={{ padding: '0.5rem 1.5rem', background: '#16a34a', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 600 }}
                >
                  Post
                </button>
              </div>
            </div>

            {listPosts.length === 0 ? (
              <div style={{ background: '#fff', padding: '1rem', borderRadius: '8px', boxShadow: '0 1px 4px rgba(0,0,0,0.05)' }}>
                <div>Tidak ada postingan.</div>
              </div>
            ) : (
              listPosts.map((post, idx) => (
                <div key={post.id || idx} style={{ background: '#fff', padding: '1rem', borderRadius: '8px', boxShadow: '0 1px 4px rgba(0,0,0,0.05)', marginBottom: '1rem', display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
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
                        background: '#bbf7d0',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: 'bold',
                        fontSize: 20,
                        color: '#16a34a'
                      }}>
                        {post.name ? post.name.charAt(0).toUpperCase() : 'U'}
                      </div>
                    )}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 'bold', marginBottom: '0.5rem', color: '#16a34a' }}>{post.name || 'User'}</div>
                    <div style={{ fontSize: 13, color: '#888', marginBottom: 4 }}>
                      {formatTimeAgo(post.created_at)}
                    </div>
                    <div>{post.content}</div>
                    <div style={{ display: 'flex', gap: '1rem', marginTop: '0.75rem' }}>
                      <button
                        style={{
                          background: '#f3f4f6',
                          border: 'none',
                          borderRadius: '4px',
                          padding: '0.25rem 1rem',
                          cursor: 'pointer',
                          color: '#16a34a',
                          fontWeight: 500,
                          display: 'flex',
                          alignItems: 'center'
                        }}
                        onClick={() => {
                          if (parseInt(post.is_liked) > 0) {
                            unLikePosts(post.id);
                          } else {
                            likePosts(post.id);
                          }
                        }}
                      >
                        {parseInt(post.is_liked) > 0 ? (
                          // Icon Like (filled heart)
                          <svg width="18" height="18" fill="#16a34a" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" style={{ marginRight: 6 }}>
                            <path d="M12 21C12 21 4 13.36 4 8.5C4 5.42 6.42 3 9.5 3C11.24 3 12.91 3.81 14 5.08C15.09 3.81 16.76 3 18.5 3C21.58 3 24 5.42 24 8.5C24 13.36 16 21 16 21H12Z" />
                          </svg>
                        ) : (
                          // Icon Unlike (outline heart)
                          <svg width="18" height="18" fill="none" stroke="#16a34a" strokeWidth="2" viewBox="0 0 24 24" style={{ marginRight: 6 }}>
                            <path d="M12.1 8.64l-.1.1-.11-.11C10.14 6.6 7.1 7.24 5.5 9.28c-1.6 2.04-1.1 5.12 1.54 7.05L12 21.35l4.96-5.02c2.64-1.93 3.14-5.01 1.54-7.05-1.6-2.04-4.64-2.68-6.4-.64z" />
                          </svg>
                        )}
                        {parseInt(post.is_liked) > 0 ? 'Liked' : 'Like'}
                      </button>
                      <button
                        style={{
                          background: '#f3f4f6',
                          border: 'none',
                          borderRadius: '4px',
                          padding: '0.25rem 1rem',
                          cursor: 'pointer',
                          color: '#16a34a',
                          fontWeight: 500,
                          display: 'flex',
                          alignItems: 'center'
                        }}
                        onClick={() => handleShowComments(post)}
                      >
                        <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" style={{ marginRight: 6 }}>
                          <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
                        </svg>
                        Comment
                      </button>

                      {(post.status_delete == 'true') && (
                        <button
                          style={{
                            background: '#fee2e2',
                            border: 'none',
                            borderRadius: '4px',
                            padding: '0.25rem 1rem',
                            cursor: 'pointer',
                            color: '#dc2626',
                            fontWeight: 500,
                            display: 'flex',
                            alignItems: 'center'
                          }}
                          onClick={async () => {
                            const confirmDelete = window.confirm('Are you sure you want to delete this post?');
                            if (confirmDelete) {
                              deletePosts(post.id);
                            }
                          }}
                        >
                          <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" style={{ marginRight: 6 }}>
                            <path d="M6 19a2 2 0 002 2h8a2 2 0 002-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />
                          </svg>
                          Delete
                        </button>
                      )}

                    </div>
                  </div>
                </div>
              ))
            )}

            {/* Modal for comments */}
            {showCommentsModal && (
              <div
                style={{
                  position: 'fixed',
                  top: 0,
                  left: 0,
                  width: '100vw',
                  height: '100vh',
                  background: 'rgba(0,0,0,0.3)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  zIndex: 1000
                }}
                onClick={handleCloseModal}
              >
                <div
                  style={{
                    background: '#fff',
                    borderRadius: 8,
                    padding: 24,
                    minWidth: 320,
                    maxWidth: 800,
                    width: '100%',
                    boxShadow: '0 2px 16px rgba(0,0,0,0.15)',
                    position: 'relative'
                  }}
                  onClick={e => e.stopPropagation()}
                >
                  <button
                    onClick={handleCloseModal}
                    style={{
                      position: 'absolute',
                      top: 8,
                      right: 8,
                      background: 'transparent',
                      border: 'none',
                      fontSize: 20,
                      cursor: 'pointer'
                    }}
                    aria-label="Close"
                  >
                    &times;
                  </button>
                  <h3 style={{ marginBottom: 16, color: '#16a34a' }}>Comments</h3>

                  <CommentLayout postId={selectedPost.id} />
                </div>
              </div>
            )}

          </main>
          <aside style={{ padding: '2rem 1rem' }}>
            <nav style={{ padding: '2rem 1rem', width: 260, background: '#fff', borderRadius: '8px', boxShadow: '0 1px 4px rgba(0,0,0,0.05)', height: 'fit-content' }}>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <li>
                  <a href="/" style={{ color: '#16a34a', textDecoration: 'none', fontWeight: 500, fontSize: 18 }}>
                    Terbaru
                  </a>
                </li>
                <li>
                  <a href="/profile" style={{ color: '#16a34a', textDecoration: 'none', fontWeight: 500, fontSize: 18 }}>
                    Paling Banyak Disukai
                  </a>
                </li>

              </ul>
            </nav>
          </aside>
        </div>
      </div>
    </div>
  );
}