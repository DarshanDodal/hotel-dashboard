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

const data = [
  {
    id: uuid(),
    ref: 'CDD1049',
    amount: 30.5,
    customer: {
      name: 'Ekaterina Tankova'
    },
    createdAt: 1555016400000,
    status: 'pending',
    time: '12:31 AM',
    price: '2344 ',
    dishes: [{ name: 'Paneer Butter Masala', quantity: 2, price: 100 }]
  },
  {
    id: uuid(),
    ref: 'CDD1048',
    amount: 25.1,
    customer: {
      name: 'Cao Yu'
    },
    createdAt: 1555016400000,
    status: 'delivered',
    time: '2:41 PM',
    price: '85865 ',
    dishes: [
      {
        name: 'Paneer Butter Masala da dum panner da vumm aalo',
        quantity: 2,
        price: 100
      },
      { name: 'Palak Paneer', quantity: 2, price: 100 },
      { name: 'Paneer Butter Masala', quantity: 2, price: 100 },
      { name: 'Palak Paneer', quantity: 2, price: 100 },
      { name: 'Paneer Butter Masala', quantity: 2, price: 100 },
      { name: 'Palak Paneer', quantity: 2, price: 100 },
      { name: 'Paneer Butter Masala', quantity: 2, price: 100 },
      { name: 'Palak Paneer', quantity: 2, price: 100 },
      { name: 'Paneer Butter Masala', quantity: 2, price: 100 },
      { name: 'Palak Paneer', quantity: 2, price: 100 },
      { name: 'Paneer Butter Masala', quantity: 2, price: 100 },
      { name: 'Palak Paneer', quantity: 2, price: 100 }
    ]
  },
  {
    id: uuid(),
    ref: 'CDD1047',
    amount: 10.99,
    customer: {
      name: 'Alexa Richardson'
    },
    createdAt: 1554930000000,
    status: 'refunded',
    time: '1:31 CM',
    price: '852 ',
    dishes: [{ name: 'Paneer Butter Masala', quantity: 2, price: 100 }]
  },
  {
    id: uuid(),
    ref: 'CDD1046',
    amount: 96.43,
    customer: {
      name: 'Anje Keizer'
    },
    createdAt: 1554757200000,
    status: 'pending',
    time: '43:23 PM',
    price: '3422 ',
    dishes: [{ name: 'Paneer Butter Masala', quantity: 2, price: 100 }]
  },
  {
    id: uuid(),
    ref: 'CDD1045',
    amount: 32.54,
    customer: {
      name: 'Clarke Gillebert'
    },
    createdAt: 1554670800000,
    status: 'delivered',
    time: '65:23 AM',
    price: '2156 ',
    dishes: [{ name: 'Paneer Butter Masala', quantity: 2, price: 100 }]
  },
  {
    id: uuid(),
    ref: 'CDD1044',
    amount: 16.76,
    customer: {
      name: 'Adam Denisov'
    },
    createdAt: 1554670800000,
    status: 'delivered',
    time: '01:21 AM',
    price: '212 ',
    dishes: [{ name: 'Paneer Butter Masala', quantity: 2, price: 100 }]
  }
];

const useStyles = makeStyles(theme => ({
  root: {},
  actions: {
    justifyContent: 'flex-end'
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

const LatestOrders = ({ className, ...rest }) => {
  const classes = useStyles();
  const [orders] = useState(data);

  const [status, setStatus] = React.useState('');

  const handleChange = event => {
    setStatus(event.target.value);
  };

  return (
    <Card className={clsx(classes.root, className)} {...rest}>
      <CardHeader title="Latest Orders" />
      <Divider />
      <PerfectScrollbar>
        <Box minWidth={800}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Order Id</TableCell>
                <TableCell>Customer</TableCell>
                <TableCell sortDirection="desc">
                  <Tooltip enterDelay={300} title="Sort">
                    <TableSortLabel active direction="desc">
                      Date
                    </TableSortLabel>
                  </Tooltip>
                </TableCell>
                <TableCell>Time</TableCell>
                <TableCell>Dish and Quantity</TableCell>
                {/* <TableCell>Status</TableCell> */}
                <TableCell>Order Total</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {orders.map(order => (
                <TableRow hover key={order.id}>
                  <TableCell>{order.ref}</TableCell>
                  <TableCell>{order.customer.name}</TableCell>
                  <TableCell>
                    {moment(order.createdAt).format('DD/MM/YYYY')}
                  </TableCell>
                  <TableCell>{order.time}</TableCell>
                  <TableCell>
                    {order.dishes.map(dish => {
                      return (
                        <div className={classes.dishDisp}>
                          <p>• {dish.name} -</p>
                          <p>{dish.quantity}</p>
                        </div>
                      );
                    })}
                  </TableCell>
                  {/* <TableCell>
                    <FormControl className={classes.formControl}>
                      <InputLabel id="demo-simple-select-label">
                        Status
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={status}
                        onChange={handleChange}
                      >
                        <MenuItem value={10}>Pending</MenuItem>
                        <MenuItem value={20}>In Process</MenuItem>
                        <MenuItem value={30}>Ready to Searve</MenuItem>
                      </Select>
                    </FormControl>
                  </TableCell> */}
                  <TableCell>{order.price} /-</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <Box display="flex" justifyContent="flex-end" p={2}>
        <Button
          color="primary"
          endIcon={<ArrowRightIcon />}
          size="small"
          variant="text"
        >
          View all
        </Button>
      </Box>
    </Card>
  );
};

LatestOrders.propTypes = {
  className: PropTypes.string
};

export default LatestOrders;
