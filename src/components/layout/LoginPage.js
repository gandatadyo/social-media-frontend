"use client";

import { useState } from 'react';
import InputText from '../../components/ui/InputText';
import Button from '../../components/ui/Button';
import { BASE_URL } from '../../utils/api'
import axios from 'axios';


export default function HomePage() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    message: ''
  });

  const handleLogin = async () => {
    try {
      const response = await axios.post(`${BASE_URL}/login`, {
        email: formData.email,
        password: formData.password
      });

      if (response.status == 200) {
        document.cookie = `token=${response.data.token}; path=/;`;
        setFormData({...formData, email: '', password: '', message: '' });
        window.location.href = '/';
      } else {
        setFormData({ ...formData, message: 'Something wrong' });
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        setFormData({ ...formData, message: error.response.data.message });
      } else {
        setFormData({ ...formData, message: 'Login gagal. Silakan coba lagi.' });
      }
    }
  };


  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="flex w-[800px] rounded-2xl overflow-hidden shadow-lg">

        {/* Kiri - Daftar */}
        <div className="w-1/2 bg-green-600 text-white p-10 flex flex-col justify-between">
          <div>
            <h1 className="text-4xl font-bold mb-4">Healthy<br />Mate.</h1>
            <p className="text-sm">
              Temukan solusi diet sehat menyenangkan bersama Healthy Mate.
              Daftar untuk eksplorasi lebih lanjut.
            </p>
          </div>
          <button
            onClick={() => {
              window.location.href = '/register'
            }}
            className="bg-orange-400 text-white py-2 mt-8 rounded-md hover:bg-orange-500 transition">
            Daftar
          </button>
        </div>

        {/* Kanan - Login */}
        <div className="w-1/2 bg-yellow-100 p-10">
          <h2 className="text-2xl font-bold mb-6">Login</h2>

          {formData.message && (
            <div className="p-4 mb-4 text-sm text-red-800 border border-red-300 rounded-lg bg-red-50" role="alert">
              <span className="font-medium">Error!</span> {formData.message}
            </div>
          )}

          <div className="mb-4">
            <label className="block text-sm font-semibold mb-1">Username</label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-md px-3 py-2"
              placeholder="Masukkan username"
              value={formData.email}
              onChange={e => setFormData({ ...formData, email: e.target.value, message: '' })}
            />
          </div>
          <div className="mb-6">
            <label className="block text-sm font-semibold mb-1">Password</label>
            <input
              type="password"
              className="w-full border border-gray-300 rounded-md px-3 py-2"
              placeholder="Masukkan password"
              value={formData.password}
              onChange={e => setFormData({ ...formData, password: e.target.value, message: '' })}
            />
          </div>
          <button
            onClick={() => {
              handleLogin();
            }}
            className="bg-orange-400 w-full text-white py-2 rounded-md hover:bg-orange-500 transition">
            Login
          </button>
        </div>

      </div>
    </div>
  );

}