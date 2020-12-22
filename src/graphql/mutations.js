/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createOrders = /* GraphQL */ `
  mutation CreateOrders(
    $input: CreateOrdersInput!
    $condition: ModelOrdersConditionInput
  ) {
    createOrders(input: $input, condition: $condition) {
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
export const updateOrders = /* GraphQL */ `
  mutation UpdateOrders(
    $input: UpdateOrdersInput!
    $condition: ModelOrdersConditionInput
  ) {
    updateOrders(input: $input, condition: $condition) {
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
export const deleteOrders = /* GraphQL */ `
  mutation DeleteOrders(
    $input: DeleteOrdersInput!
    $condition: ModelOrdersConditionInput
  ) {
    deleteOrders(input: $input, condition: $condition) {
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
export const createHotelRatings = /* GraphQL */ `
  mutation CreateHotelRatings(
    $input: CreateHotelRatingsInput!
    $condition: ModelHotelRatingsConditionInput
  ) {
    createHotelRatings(input: $input, condition: $condition) {
      id
      HotelID
      rating
      userId
      createdAt
      updatedAt
    }
  }
`;
export const updateHotelRatings = /* GraphQL */ `
  mutation UpdateHotelRatings(
    $input: UpdateHotelRatingsInput!
    $condition: ModelHotelRatingsConditionInput
  ) {
    updateHotelRatings(input: $input, condition: $condition) {
      id
      HotelID
      rating
      userId
      createdAt
      updatedAt
    }
  }
`;
export const deleteHotelRatings = /* GraphQL */ `
  mutation DeleteHotelRatings(
    $input: DeleteHotelRatingsInput!
    $condition: ModelHotelRatingsConditionInput
  ) {
    deleteHotelRatings(input: $input, condition: $condition) {
      id
      HotelID
      rating
      userId
      createdAt
      updatedAt
    }
  }
`;
export const createDishRatings = /* GraphQL */ `
  mutation CreateDishRatings(
    $input: CreateDishRatingsInput!
    $condition: ModelDishRatingsConditionInput
  ) {
    createDishRatings(input: $input, condition: $condition) {
      id
      dishId
      rating
      userId
      createdAt
      updatedAt
    }
  }
`;
export const updateDishRatings = /* GraphQL */ `
  mutation UpdateDishRatings(
    $input: UpdateDishRatingsInput!
    $condition: ModelDishRatingsConditionInput
  ) {
    updateDishRatings(input: $input, condition: $condition) {
      id
      dishId
      rating
      userId
      createdAt
      updatedAt
    }
  }
`;
export const deleteDishRatings = /* GraphQL */ `
  mutation DeleteDishRatings(
    $input: DeleteDishRatingsInput!
    $condition: ModelDishRatingsConditionInput
  ) {
    deleteDishRatings(input: $input, condition: $condition) {
      id
      dishId
      rating
      userId
      createdAt
      updatedAt
    }
  }
`;
