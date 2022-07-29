import { useNavigate } from './hooks';

const Link = ({ to, children }) => {
  const navigate = useNavigate();
  const handle = (e) => {
    e.preventDefault();
    navigate(to);
  };
  return (
    <a href={to} onClick={handle}>
      {children}
    </a>
  );
};

export default Link;
