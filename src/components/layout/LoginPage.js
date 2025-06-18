"use client";

import { useState } from 'react';
import InputText from '../../components/ui/InputText';
import Button from '../../components/ui/Button';
import { BASE_URL } from '../../utils/api'
import axios from 'axios';


export default function HomePage() {
  const [isLogin, setIsLogin] = useState(true);
  const [message, setMessage] = useState('')
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleLogin = async () => {
    try {
      const response = await axios.post(`${BASE_URL}/login`, {
        email: formData.email,
        password: formData.password
      });

      if (response.status == 200) {
        document.cookie = `token=${response.data.token}; path=/;`;
        setMessage(response.data.message);
        window.location.href = '/';
      } else {
        setMessage('Something wrong');
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        setMessage(error.response.data.message);
      } else {
        setMessage('Login gagal. Silakan coba lagi.');
      }
    }
  };

  return (
    <div className={'h-[100vh] bg-indigo-600 '}>
      <div className='flex justify-around items-center h-full'>
        <div>
          <div className='text-white text-[50px] mt-10'>Selamat Datang di Sosial Media</div>
          <div className='text-white text-[30px] mt-2'>Silahkan login untuk melanjutkan</div>
        </div>
        <div>
          <div className='container mx-auto h-full'>

            <div className='flex justify-self-center items-center h-full'>
              <div className='rounded-[30px] shadow-xl p-10 w-[500px] bg-white text-gray-500'>
                <div className='text-[30px] mb-5 text-center'>Login Sosial Media</div>

                {message && (
                  <div className="mb-4 p-3 rounded bg-blue-100 text-blue-700 text-center">
                    {message}
                  </div>
                )}

                <div className='mb-2'>Email</div>
                <div>
                  <InputText
                    label="Email"
                    value={formData.email}
                    className='w-full mb-2'
                    onChange={e => setFormData({ ...formData, email: e.target.value, message: '' })}
                  />
                </div>
                <div className='mb-2'>Password</div>
                <div>
                  <InputText
                    label="Password"
                    type="password"
                    value={formData.password}
                    className='w-full mb-2'
                    onChange={e => setFormData({ ...formData, password: e.target.value, message: '' })}
                  />
                </div>

                <div>
                  <Button className='w-full mt-5 rounded-xl h-[50px]'
                    onClick={() => {
                      handleLogin();
                    }}>
                    Masuk Akun
                  </Button>
                </div>
                <div>
                  <Button className='w-full mt-5 rounded-xl h-[50px]' stypeButton='secondary'
                    onClick={() => {
                      window.location.href = '/register'
                    }}>
                    Buat Akun Baru
                  </Button>
                </div>

              </div>
            </div>
          </div>'

        </div>


      </div>



    </div>
  );
}