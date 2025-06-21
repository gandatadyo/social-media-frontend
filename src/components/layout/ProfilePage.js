"use client";

import { useEffect, useState } from 'react';
import { getCookies, setCookie } from '../../utils/helperClient';
import { BASE_URL } from '../../utils/api';
import CommentLayout from './CommentLayout';
import axios from 'axios';

export default function ProfilePage({ dataAcount }) {
  const [showDropdown, setShowDropdown] = useState(false);

  function logout() {
    const r = confirm('Do you want logout ?')
    if (r) {
      document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      window.location.href = "/login";
    }
  }

  return (
    <div>
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
          <a href="/" style={{ textDecoration: 'none' }}>
            <h1 className="text-xl font-bold">
              <span className="text-green-600">Healthy</span>
              <span className="text-orange-500">Mate</span>
              <span className="text-green-600">Forum</span>
            </h1>
          </a>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', position: 'relative' }}>
          {/* User Info with Dropdown */}
          <div style={{ position: 'relative' }}>
            <div
              style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer' }}
              onClick={() => setShowDropdown(prev => !prev)}
              tabIndex={0}
              onBlur={() => setTimeout(() => setShowDropdown(false), 150)}
            >
              {dataAcount?.profileImageUrl ? (
                <img
                  src={dataAcount.profileImageUrl}
                  alt="Profile"
                  style={{ width: 36, height: 36, borderRadius: '50%', objectFit: 'cover', background: '#eee' }}
                />
              ) : (
                <div style={{
                  width: 36,
                  height: 36,
                  borderRadius: '50%',
                  background: '#bbf7d0',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 'bold',
                  fontSize: 16,
                  color: '#16a34a'
                }}>
                  {dataAcount?.name ? dataAcount.name.charAt(0).toUpperCase() : 'U'}
                </div>
              )}
              <span style={{ fontWeight: 600, color: '#16a34a', fontSize: 16 }}>
                {dataAcount?.name || 'User'}
              </span>
              <svg width="18" height="18" fill="none" stroke="#16a34a" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M6 9l6 6 6-6" />
              </svg>
            </div>
            {showDropdown && (
              <div
                style={{
                  position: 'absolute',
                  top: 44,
                  right: 0,
                  background: '#fff',
                  border: '1px solid #e5e7eb',
                  borderRadius: 8,
                  boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                  minWidth: 140,
                  zIndex: 100
                }}
              >
                <a
                  href="/profile"
                  style={{
                    display: 'block',
                    padding: '0.75rem 1rem',
                    color: '#16a34a',
                    textDecoration: 'none',
                    fontWeight: 500,
                    borderBottom: '1px solid #f3f4f6'
                  }}
                >
                  Profile
                </a>
                <a
                  href="#"
                  onClick={e => { e.preventDefault(); logout(); }}
                  style={{
                    display: 'block',
                    padding: '0.75rem 1rem',
                    color: '#dc2626',
                    textDecoration: 'none',
                    fontWeight: 500
                  }}
                >
                  Logout
                </a>
              </div>
            )}
          </div>
        </div>
      </nav>


      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '80vh',
        backgroundColor: '#e6ffe6'
      }}>
        <div style={{
          background: '#fff',
          borderRadius: '12px',
          padding: '32px 48px',
          boxShadow: '0 4px 16px rgba(0,0,0,0.08)',
          textAlign: 'center',
          border: '2px solid #27ae60'
        }}>
          <h2 style={{ color: '#27ae60', marginBottom: '16px' }}>{dataAcount.username}</h2>
          <p style={{ color: '#145a32', margin: '8px 0' }}>Name: <span style={{ color: '#27ae60' }}>{dataAcount.name}</span></p>
          <p style={{ color: '#145a32', margin: '8px 0' }}>Email: <span style={{ color: '#27ae60' }}>{dataAcount.email}</span></p>
          <button
            style={{
              marginTop: '24px',
              padding: '10px 24px',
              background: '#dc2626',
              color: '#fff',
              border: 'none',
              borderRadius: '6px',
              fontWeight: 600,
              cursor: 'pointer',
              fontSize: '16px'
            }}
            onClick={async () => {
              const confirmDelete = confirm('Are you sure you want to delete your account? This action cannot be undone.');
              if (!confirmDelete) return;
              try {
                await axios.delete(`${BASE_URL}/delete_account`, {
                  headers: {
                    Authorization: `Bearer ${getCookies('token')}`,
                    'Content-Type': 'application/json'
                  },
                  data: {
                    token: getCookies().token,
                  }
                });
                alert('Account deleted successfully.');
                document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
                window.location.href = "/register";
              } catch (err) {
                alert('Failed to delete account.');
              }
            }}
          >
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );
}