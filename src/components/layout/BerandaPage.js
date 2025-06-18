"use client";

import { useEffect, useState } from 'react';
import { getCookies, setCookie } from '../../utils/helperClient';
import { BASE_URL } from '../../utils/api';
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
      const response = await axios.get(`${BASE_URL}/posts`, {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
        }
      });

      if (response.status === 200) {
        setListPosts(response.data.data);
      } else {

      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
      } else {
      }
    }
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

  useEffect(() => {
    getPosts();
  }, []);

  // State for modal visibility and selected post
  const [showCommentsModal, setShowCommentsModal] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);

  // Dummy comments data (replace with API call if needed)
  const [comments, setComments] = useState([]);

  // Function to open modal and set selected post
  const handleShowComments = (post) => {
    setSelectedPost(post);
    // TODO: Fetch comments for the post here if needed
    setComments(post.comments || []); // or fetch from API
    setShowCommentsModal(true);
  };

  // Function to close modal
  const handleCloseModal = () => {
    setShowCommentsModal(false);
    setSelectedPost(null);
    setComments([]);
  };

  return (
    <div className='bg-gray-100 h-[100%]'>

      <nav
        className='bg-indigo-600 text-white'
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
        <div className='text-[30px]'>Social Media</div>
        <ul style={{ listStyle: 'none', display: 'flex', gap: '1rem', margin: 0, padding: 0 }}>
          <li>
            <a href="#" onClick={logout} style={{ textDecoration: 'none' }}>
              Keluar
            </a>
          </li>
        </ul>
      </nav>

      <div className='container mx-auto'>
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
              <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer', color: '#6366f1', fontWeight: 500 }}>
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
                style={{ padding: '0.5rem 1.5rem', background: '#6366f1', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
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
                  <div>{post.content}</div>
                  <div style={{ display: 'flex', gap: '1rem', marginTop: '0.75rem' }}>
                    <button
                      style={{
                        background: '#f3f4f6',
                        border: 'none',
                        borderRadius: '4px',
                        padding: '0.25rem 1rem',
                        cursor: 'pointer',
                        color: '#6366f1',
                        fontWeight: 500,
                        display: 'flex',
                        alignItems: 'center'
                      }}
                      onClick={() => alert('Like feature coming soon!')}
                    >
                      <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" style={{ marginRight: 6 }}>
                        <path d="M5 15l7-7 7 7" />
                      </svg>
                      Like
                    </button>
                    <button
                      style={{
                        background: '#f3f4f6',
                        border: 'none',
                        borderRadius: '4px',
                        padding: '0.25rem 1rem',
                        cursor: 'pointer',
                        color: '#6366f1',
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
                  maxWidth: 400,
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
                <h3 style={{ marginBottom: 16 }}>Comments</h3>
                {comments.length === 0 ? (
                  <div style={{ color: '#888' }}>Belum ada komentar.</div>
                ) : (
                  <ul style={{ padding: 0, margin: 0, listStyle: 'none' }}>
                    {comments.map((comment, idx) => (
                      <li key={comment.id || idx} style={{ marginBottom: 12, borderBottom: '1px solid #eee', paddingBottom: 8 }}>
                        <div style={{ fontWeight: 500 }}>{comment.user?.name || 'User'}</div>
                        <div style={{ fontSize: 14 }}>{comment.content}</div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          )}

        </main>
      </div>

    </div>
  );
}