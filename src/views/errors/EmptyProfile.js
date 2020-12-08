import React, { useState } from 'react';
import clsx from 'clsx';
import moment from 'moment';
import { v4 as uuid } from 'uuid';
import PerfectScrollbar from 'react-perfect-scrollbar';
import PropTypes from 'prop-types';
import {
  Box,
  Button,
  Card,
  CardHeader,
  Chip,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
  Tooltip,
  makeStyles,
  InputLabel,
  MenuItem,
  FormControl,
  Select
} from '@material-ui/core';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import getProfile from '../../server/getProfile';

const useStyles = makeStyles(theme => ({
  root: {},
  actions: {
    alignItems: 'center'
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120
  },
  dishDisp: {
    flexDirection: 'row',

    display: 'flex'
  }
}));

const EmptyProfile = ({ className, children }) => {
  const classes = useStyles();
  const [profileEmpty, setProfileEmpty] = useState(false);
  const Profile = () => {
    getProfile().then(profile => {
      if (Object.keys(profile.data).length === 0) {
        setProfileEmpty(true);
      }
    });
    return profileEmpty;
  };
  if (Profile()) {
    return (
      <Card className={clsx(classes.root, className)}>
        <CardHeader
          avatar={<AccountCircleIcon fontSize={'large'} />}
          title="Profile Details"
          subheader="Hotel profile is still empty, please fill it to access the contents on this page."
        />

        <Box display="flex" justifyContent="flex-end" p={2}>
          <Button
            color="primary"
            endIcon={<ArrowRightIcon />}
            size="small"
            variant="text"
          >
            Fill Profile
          </Button>
        </Box>
      </Card>
    );
  }
  return children;
};

export default EmptyProfile;
