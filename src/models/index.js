// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';

const CouponType = {
  "PRICE": "PRICE",
  "ITEM": "ITEM"
};

const BusinessCategory = {
  "RESTAURANT": "RESTAURANT",
  "WELLNESS": "WELLNESS",
  "SERVICE": "SERVICE"
};

const { BoosterPass, User, Coupon, Business, Product, CartProduct, OrderProduct, Order, PaymentIntent } = initSchema(schema);

export {
  BoosterPass,
  User,
  Coupon,
  Business,
  Product,
  CartProduct,
  OrderProduct,
  Order,
  CouponType,
  BusinessCategory,
  PaymentIntent
};