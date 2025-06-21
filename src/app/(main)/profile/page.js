import ProfilePage from '../../../components/layout/ProfilePage'
import { BASE_URL } from '../../../utils/api'
import { cookies } from 'next/headers'

export default async function Profile() {

  let dataAcount = null
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;
  if (token) {
    try {
      const res = await fetch(`${BASE_URL}/check_session`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ token: token }),
      });
      if (res.ok) {
        const dataResult = await res.json();
        dataAcount = dataResult.user;
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <ProfilePage dataAcount={dataAcount} />
  );
}
