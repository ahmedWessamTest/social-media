import axios from 'axios';



export async function handelRegister(info , navigate) {

  try {
    const { data } = await axios.post( 
      'https://linked-posts.routemisr.com/users/signup',
      info,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );


    navigate('/signin');
    return data;
  } catch (error) {
    console.error('Axios error:', error.response || error.message);
    return error.response?.data || { message: 'Something went wrong' };
  }
}
