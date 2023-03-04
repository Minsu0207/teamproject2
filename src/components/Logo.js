import { Link } from 'react-router-dom';
import { ReactComponent as LogoGold } from './logo.svg';
import { styled } from '@mui/material';

const LinkStyled = styled(Link)(() => ({
  height: '82px',
  width: '400px',
  overflow: 'hidden',
  display: 'block',
}));

const Logo = () => {
  return (
    <LinkStyled to="/home">
      <LogoGold height={100} />
    </LinkStyled>
  )
};

export default Logo;
