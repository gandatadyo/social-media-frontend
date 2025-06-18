"use client";


import { useState } from 'react';
import InputText from '../../components/ui/InputText';
import Button from '../../components/ui/Button';
// import { Open_Sans } from "next/font/google";

// const openSans = Open_Sans({ subsets: ['latin'] })

export default function HomePage() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    passwordConfirm: ''
  });

  return (
    <div className={'h-[100vh] bg-indigo-600 '}>
      <div className='flex justify-around items-center h-full'>
        <div>
          <div className='text-white text-[50px] mt-10'>Selamat Datang di Sosial Media</div>
          <div className='text-white text-[30px] mt-2'>Silahkan daftar untuk bergabung</div>
        </div>
        <div>
          <div className='container mx-auto h-full'>

            <div className='flex justify-self-center items-center h-full'>
              <div className='rounded-[30px] shadow-xl p-10 w-[500px] bg-white text-gray-500'>
                <div className='text-[30px] mb-5 text-center'>Daftar Sosial Media</div>
                <div className='mb-2'>Nama Pengguna</div>
                <div>
                  <InputText
                    label="name"
                    value={formData.name}
                    className='w-full mb-2'
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>
                <div className='mb-2'>Email</div>
                <div>
                  <InputText
                    label="email"
                    value={formData.email}
                    className='w-full mb-2'
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
                <div className='mb-2'>Password</div>
                <div>
                  <InputText
                    label="Password"
                    type="password"
                    value={formData.password}
                    className='w-full mb-2'
                    onChange={e => setFormData({ ...formData, password: e.target.value })}
                  />
                </div>
                <div className='mb-2'>Konfirmasi Password</div>
                <div>
                  <InputText
                    label="Konfirmasi Password"
                    type="password"
                    value={formData.passwordConfirm}
                    className='w-full mb-2'
                    onChange={e => setFormData({ ...formData, passwordConfirm: e.target.value })}
                  />
                </div>

                <div>
                  <Button className='w-full mt-5 rounded-xl h-[50px]'
                    onClick={() => {
                      
                    }}>
                    Daftar Akun
                  </Button>
                </div>
                <div>
                  <Button className='w-full mt-5 rounded-xl h-[50px]' stypeButton='secondary'
                    onClick={() => {
                      window.location.href = '/login'
                    }}>
                    Sudah Punya Akun
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