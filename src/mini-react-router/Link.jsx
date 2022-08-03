import { useNavigate } from './hooks';

const Link = ({ to, children, ...props }) => {
  const navigate = useNavigate();
  const handle = (e) => {
    e.preventDefault();
    navigate(to);
  };

  return (
    <a {...props} href={to} onClick={handle}>
      {children}
    </a>
  );
};

export default Link;
