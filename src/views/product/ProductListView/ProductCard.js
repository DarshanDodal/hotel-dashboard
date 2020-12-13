import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Box,
  Card,
  CardContent,
  Divider,
  Grid,
  Typography,
  makeStyles,
  CardMedia,
  Button,
  TextField,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
  IconButton
} from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import FavoriteIcon from '@material-ui/icons/Favorite';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import DeleteIcon from '@material-ui/icons/Delete';
import EditDialog from './EditDialog';
import { MenuDB } from '../../../server/links';
import { useEffect } from 'react';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column'
  },
  statsItem: {
    alignItems: 'center',
    display: 'flex'
  },
  statsIcon: {
    marginRight: theme.spacing(1)
  },
  media: {
    height: 180
  }
}));

const ProductCard = ({ className, dish, ...rest }) => {
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <Card className={clsx(classes.root, className)} {...rest}>
        <CardMedia
          className={classes.media}
          image={dish.image}
          title={dish.name}
        />
        <CardContent>
          <Typography
            align="center"
            color="textSecondary"
            gutterBottom
            variant="h5"
          >
            {dish.category}
          </Typography>
          <Typography
            align="center"
            color="textPrimary"
            gutterBottom
            variant="h5"
          >
            {dish.name}
          </Typography>

          <Typography align="center" color="textPrimary" variant="h6">
            <i>{dish.price} /-</i>
          </Typography>
        </CardContent>
        <Box flexGrow={1} />
        <Divider />
        <Box p={2}>
          <Grid container justify="space-between" spacing={2}>
            <Grid className={classes.statsItem} item>
              <IconButton aria-label="delete" onClick={handleClickOpen}>
                <EditIcon color="action" />
              </IconButton>
            </Grid>
            <Grid className={classes.statsItem} item>
              <FavoriteIcon className={classes.statsIcon} color="secondary" />
              <Typography
                color="textSecondary"
                display="inline"
                variant="body2"
              >
                {'300'} Likes
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </Card>
      <EditDialog handleClose={handleClose} dish={dish} openDialog={open} />
    </>
  );
};

ProductCard.propTypes = {
  className: PropTypes.string,
  product: PropTypes.object.isRequired
};

export default ProductCard;
