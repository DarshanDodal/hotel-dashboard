/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateOrders = /* GraphQL */ `
  subscription OnCreateOrders {
    onCreateOrders {
      id
      orderId
      HotelID
      orderActive
      dishes {
        dishId
        name
        amount
        quantity
        image
      }
      status {
        cStatus
        timestamp
      }
      tableId
      tableNumber
      timestamp
      visitorId
      visitor
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateOrders = /* GraphQL */ `
  subscription OnUpdateOrders {
    onUpdateOrders {
      id
      orderId
      HotelID
      orderActive
      dishes {
        dishId
        name
        amount
        quantity
        image
      }
      status {
        cStatus
        timestamp
      }
      tableId
      tableNumber
      timestamp
      visitorId
      visitor
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteOrders = /* GraphQL */ `
  subscription OnDeleteOrders {
    onDeleteOrders {
      id
      orderId
      HotelID
      orderActive
      dishes {
        dishId
        name
        amount
        quantity
        image
      }
      status {
        cStatus
        timestamp
      }
      tableId
      tableNumber
      timestamp
      visitorId
      visitor
      createdAt
      updatedAt
    }
  }
`;
export const onCreateHotelRatings = /* GraphQL */ `
  subscription OnCreateHotelRatings {
    onCreateHotelRatings {
      id
      HotelID
      rating
      userId
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateHotelRatings = /* GraphQL */ `
  subscription OnUpdateHotelRatings {
    onUpdateHotelRatings {
      id
      HotelID
      rating
      userId
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteHotelRatings = /* GraphQL */ `
  subscription OnDeleteHotelRatings {
    onDeleteHotelRatings {
      id
      HotelID
      rating
      userId
      createdAt
      updatedAt
    }
  }
`;
export const onCreateDishRatings = /* GraphQL */ `
  subscription OnCreateDishRatings {
    onCreateDishRatings {
      id
      dishId
      rating
      userId
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateDishRatings = /* GraphQL */ `
  subscription OnUpdateDishRatings {
    onUpdateDishRatings {
      id
      dishId
      rating
      userId
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteDishRatings = /* GraphQL */ `
  subscription OnDeleteDishRatings {
    onDeleteDishRatings {
      id
      dishId
      rating
      userId
      createdAt
      updatedAt
    }
  }
`;
