// src/components/ClientInformationForm.tsx
import React, { useEffect, useState } from 'react';
import { fetchSalesforceData } from '../services/salesforceService';

const ClientInformationForm: React.FC = () => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await fetchSalesforceData();
        setData(result);
      } catch (error) {
        setError('Error fetching data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return <pre>{JSON.stringify(data, null, 2)}</pre>;
};

export default ClientInformationForm;
