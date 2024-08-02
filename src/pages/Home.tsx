import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { fetchData } from '../store/features/dataSlice';

const Home: React.FC = () => {
  const dispatch = useAppDispatch();
  const data = useAppSelector((state) => state.data.data);
  const status = useAppSelector((state) => state.data.status);
  const error = useAppSelector((state) => state.data.error);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchData());
    }
  }, [dispatch, status]);
  return <div className="p-4">
    Home Page
    {status === 'loading' && <p>Loading...</p>}
      {status === 'succeeded' && <pre>{JSON.stringify(data, null, 2)}</pre>}
      {status === 'failed' && <p>Error: {error}</p>}
    </div>;
};

export default Home;