import { Link } from 'react-router-dom';
import { ReactComponent as LogoDark } from 'src/assets/images/logos/dark-logo.svg';
import { ReactComponent as LogoGold } from 'src/assets/images/logos/logogold.svg';
import { styled } from '@mui/material';

const LinkStyled = styled(Link)(() => ({
  height: '82px',
  width: '400px',
  overflow: 'hidden',
  display: 'block',
}));

const Logo = () => {
  return (
    <LinkStyled to="/">
      <LogoGold height={100} />
    </LinkStyled>
  )
};

export default Logo;
