import { useEffect } from 'react';
import { useNavigate } from './hooks';

const Navigate = ({ to, replace, state }) => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate(to, { replace, state });
  });

  return null;
};

export default Navigate;
