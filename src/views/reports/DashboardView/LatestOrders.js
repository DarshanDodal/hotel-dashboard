import React, { useState, useEffect } from 'react';
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
  Select,
  IconButton
} from '@material-ui/core';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import Amplify, { Auth, API, graphqlOperation } from 'aws-amplify';
import { onCreateOrders, onUpdateOrders } from '../../../graphql/subscriptions';
import { listOrderss } from '../../../graphql/queries';
import { sum } from './Helper/totaler';
import { OrdersAPI } from '../../../server/links';
import SyncIcon from '@material-ui/icons/Sync';

import Pool from '../../auth/cognitoClient';
import { useDispatch, useSelector } from 'react-redux';

// Subscribe to creation of Todo
// const subscription = API.graphql(
//   graphqlOperation(subscriptions.onCreateOrders)
// ).subscribe({
//   next: ({ provider, value }) => console.log({ provider, value })
// });

// API.graphql({
//   query: subscriptions.onCreateOrders,
//   authMode: 'AMAZON_COGNITO_USER_POOLS'
// });

// console.log(subscription);

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
  const [orders, setOrders] = useState([]);
  const [Refresh, setRefresh] = useState(false);

  const [status, setStatus] = React.useState('');

  const dispatch = useDispatch();
  const { refresh } = useSelector(state => {
    return state;
  });

  const handleChange = event => {
    setStatus(event.target.value);
  };

  useEffect(() => {
    Auth.currentUserInfo().then(user => {
      // console.log("Email", e);
      // console.log(user);
      fetch(
        OrdersAPI +
          '/api/get-active-orders-by-hotel' +
          `?hotel=${user.username}&active=true`
      )
        .then(response => response.json())
        .then(data => {
          // if (data.error) {
          //   // setLoading(false);
          // }
          // console.log('ORDERS:', data.data);
          setOrders(data.data);
          // setLoading(false);
        })
        .catch(error => {
          // setLoading(false);
        });
    });
  }, [Refresh]);
  const getOrder = async () => {
    // const list = await API.graphql(graphqlOperation(listOrderss));
    // console.log(list);
    console.log('Get all orders here');
    // .then(result => {
    //   console.log(result);
    // });
    // .subscribe({
    //   next: ({ provider, value }) => console.log({ provider, value })
    // });
  };
  API.graphql(graphqlOperation(onCreateOrders)).subscribe({
    next: ({ provider, value }) => {
      if (value.data.onCreateOrders.HotelId === Pool.getCurrentUser.username) {
        setRefresh(!Refresh);
        dispatch({ type: 'REFRESH', payload: !refresh });
      }
    }
  });
  API.graphql(graphqlOperation(onUpdateOrders)).subscribe({
    next: ({ provider, value }) => {
      if (value.data.onCreateOrders.HotelId === Pool.getCurrentUser.username) {
        setRefresh(!Refresh);
      }
    }
  });

  const deactivateOrder = options => {
    fetch(
      OrdersAPI + '/api/order-deactivate', //URL.OrdersAPI
      {
        method: 'POST',
        body: JSON.stringify({ orders: options }),
        //mode: "cors",
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )
      .then(response => response.json())
      .then(function(response) {
        setRefresh(!Refresh);
        // console.log(JSON.stringify(response));
      })
      .catch(function(err) {
        console.log(err);
      });
  };

  const onSync = () => {
    setRefresh(!Refresh);
  };

  return (
    <Card className={clsx(classes.root, className)} {...rest}>
      <Box style={{ display: 'flex', flexDirection: 'row' }}>
        <CardHeader title="Latest Orders"></CardHeader>
        <Tooltip title="Refresh">
          <IconButton size="large" onClick={onSync} aria-label="delete">
            <SyncIcon size="large" color="primary" />
          </IconButton>
        </Tooltip>
      </Box>

      <Divider />
      <PerfectScrollbar>
        <Box minWidth={800}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Table Number</TableCell>
                <TableCell>Order Id</TableCell>
                <TableCell>Customer</TableCell>
                <TableCell sortDirection="desc">
                  <Tooltip enterDelay={300} title="Sort">
                    <TableSortLabel active direction="desc">
                      Date and Time
                    </TableSortLabel>
                  </Tooltip>
                </TableCell>
                <TableCell>Time</TableCell>
                <TableCell>Dish and Quantity</TableCell>
                {/* <TableCell>Status</TableCell> */}
                <TableCell>Order Total</TableCell>
                <TableCell>Order Status</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {orders.map(order => (
                <TableRow hover key={order.id}>
                  <TableCell>{order.tableNumber}</TableCell>
                  <TableCell>{order.id}</TableCell>
                  <TableCell>{order.visitor}</TableCell>
                  <TableCell>
                    {new Date(parseInt(order.timestamp)).toLocaleDateString()}
                    {/* {moment(neworder.createdAt).format('DD/MM/YYYY')} */}
                  </TableCell>
                  <TableCell>
                    {new Date(parseInt(order.timestamp)).toLocaleTimeString()}
                  </TableCell>
                  <TableCell>
                    {order.dishes.map(dish => {
                      return (
                        <div key={dish.name} className={classes.dishDisp}>
                          <p> {dish.name} -</p>
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
                  <TableCell>{sum(order.dishes)} /-</TableCell>
                  <TableCell>
                    Active
                    <Button
                      value={order.id}
                      onClick={() => {
                        deactivateOrder([order.id]);
                      }}
                    >
                      Deactivate
                    </Button>
                  </TableCell>
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
          onClick={getOrder}
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
