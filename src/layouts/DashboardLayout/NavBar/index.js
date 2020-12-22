import React, { useEffect, useState } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  Avatar,
  Box,
  Button,
  Divider,
  Drawer,
  Hidden,
  List,
  Typography,
  makeStyles
} from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';
import {
  AlertCircle as AlertCircleIcon,
  BarChart as BarChartIcon,
  Lock as LockIcon,
  Settings as SettingsIcon,
  ShoppingBag as ShoppingBagIcon,
  User as UserIcon,
  UserPlus as UserPlusIcon,
  Users as UsersIcon
} from 'react-feather';
import NavItem from './NavItem';
import { HotelDBAPI } from '../../../server/links';
import Pool from '../../../views/auth/cognitoClient';
import Ratings from './FetchRatings';
import Amplify, { Auth, API, graphqlOperation } from 'aws-amplify';
import { createHotelRatings } from '../../../graphql/mutations';
import { listHotelRatingss } from '../../../graphql/queries';

const user = {
  avatar: '/static/images/avatars/avatar_6.png',
  rating: '3',
  name: 'Katakir Misal'
};

const items = [
  {
    href: '/app/dashboard',
    icon: BarChartIcon,
    title: 'Dashboard'
  },
  {
    href: '/app/customers',
    icon: UsersIcon,
    title: 'Tables'
  },
  {
    href: '/app/products',
    icon: ShoppingBagIcon,
    title: 'Dishes'
  },
  {
    href: '/app/account',
    icon: UserIcon,
    title: 'Account'
  },
  {
    href: '/app/settings',
    icon: SettingsIcon,
    title: 'Settings'
  }
  // {
  //   href: '/login',
  //   icon: LockIcon,
  //   title: 'Login'
  // },
  // {
  //   href: '/register',
  //   icon: UserPlusIcon,
  //   title: 'Register'
  // },
  // {
  //   href: '/404',
  //   icon: AlertCircleIcon,
  //   title: 'Error'
  // }
];

const useStyles = makeStyles(() => ({
  mobileDrawer: {
    width: 256
  },
  desktopDrawer: {
    width: 256,
    top: 64,
    height: 'calc(100% - 64px)'
  },
  avatar: {
    cursor: 'pointer',
    width: 64,
    height: 64
  }
}));

const NavBar = ({ onMobileClose, openMobile }) => {
  const classes = useStyles();
  const location = useLocation();
  const [image, setImage] = useState('');
  const [rating, setRating] = useState(0);
  const [votes, setVotes] = useState(0);
  const [name, setName] = useState('');
  useEffect(() => {
    if (openMobile && onMobileClose) {
      onMobileClose();
    }
    fetch(HotelDBAPI + '/get-one?username=' + Pool.getCurrentUser().username)
      .then(response => response.json())
      .then(data => {
        setImage(data.data.Item.image);
        setName(data.data.Item.hotelName);
        API.graphql(
          graphqlOperation(listHotelRatingss, {
            filter: {
              HotelID: {
                eq: Pool.getCurrentUser().username
              }
            }
          })
        )
          .then(data => {
            const ratingData = data.data.listHotelRatingss.items;
            const length = ratingData.length;
            let sum = 0;
            ratingData.forEach((cv, index) => {
              sum = sum + cv.rating;
            });
            setRating(sum / length);
            setVotes(length);
          })
          .catch(err => {
            console.log(err);
          });
      });
  }, [location.pathname]);

  const content = (
    <Box height="100%" display="flex" flexDirection="column">
      <Box alignItems="center" display="flex" flexDirection="column" p={2}>
        <Avatar
          className={classes.avatar}
          component={RouterLink}
          src={image}
          to="/app/account"
        />
        <Typography className={classes.name} color="textPrimary" variant="h5">
          {name}
        </Typography>
        <Typography color="textSecondary" variant="body2">
          <Rating name="read-only" value={rating} size="small" readOnly />
        </Typography>
        <h6 style={{ color: 'rgba(0, 0, 0,0.5)' }}>
          {votes} {votes > 1 ? 'VOTES' : 'VOTE'}
        </h6>
      </Box>
      <Divider />
      <Box p={2}>
        <List>
          {items.map(item => (
            <NavItem
              href={item.href}
              key={item.title}
              title={item.title}
              icon={item.icon}
            />
          ))}
        </List>
      </Box>
      <Box flexGrow={1} />
    </Box>
  );

  return (
    <>
      <Hidden lgUp>
        <Drawer
          anchor="left"
          classes={{ paper: classes.mobileDrawer }}
          onClose={onMobileClose}
          open={openMobile}
          variant="temporary"
        >
          {content}
        </Drawer>
      </Hidden>
      <Hidden mdDown>
        <Drawer
          anchor="left"
          classes={{ paper: classes.desktopDrawer }}
          open
          variant="persistent"
        >
          {content}
        </Drawer>
      </Hidden>
    </>
  );
};

NavBar.propTypes = {
  onMobileClose: PropTypes.func,
  openMobile: PropTypes.bool
};

NavBar.defaultProps = {
  onMobileClose: () => {},
  openMobile: false
};

export default NavBar;
