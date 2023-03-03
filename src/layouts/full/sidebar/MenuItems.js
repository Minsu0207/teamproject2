import {
  IconAperture, IconCopy, IconUserSearch, IconAlertCircle, IconBrandReact, IconLayoutDashboard, IconLogin, IconMoodHappy, IconTypography, IconUserPlus
} from '@tabler/icons';

import { uniqueId } from 'lodash';

const Menuitems = [
  {
    navlabel: true,
    subheader: 'Home',
  },

  {
    id: uniqueId(),
    title: 'Home',
    icon: IconLayoutDashboard,
    href: '/home',
  },
  {
    navlabel: true,
    subheader: 'Utilities',
  },
  {
    id: uniqueId(),
    title: '회원관리',
    icon: IconUserSearch,
    href: '/page1',
  },
  {
    id: uniqueId(),
    title: '웹소켓테스트',
    icon: IconAlertCircle,
    href: '/page2',
  },
  {
    id: uniqueId(),
    title: 'Sample Page',
    icon: IconCopy,
    href: '/sample-page',
  },
  {
    id: uniqueId(),
    title: 'Sample Page',
    icon: IconCopy,
    href: '/sample-page1',
  },
  {
    navlabel: true,
    subheader: 'Auth',
  },
  {
    id: uniqueId(),
    title: 'Login',
    icon: IconLogin,
    href: '/auth/login',
  },
  {
    id: uniqueId(),
    title: 'Register',
    icon: IconUserPlus,
    href: '/auth/register',
  },


];

export default Menuitems;
