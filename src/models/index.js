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

const { BoosterPass, BusinessAdmin, Business, Coupon, Product, CartProduct, OrderProduct, Order } = initSchema(schema);

export {
  BoosterPass,
  BusinessAdmin,
  Business,
  Coupon,
  Product,
  CartProduct,
  OrderProduct,
  Order,
  CouponType,
  BusinessCategory
};