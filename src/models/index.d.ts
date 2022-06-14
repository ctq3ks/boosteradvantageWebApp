import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";

export enum CouponType {
  PRICE = "PRICE",
  ITEM = "ITEM"
}

export enum BusinessCategory {
  RESTAURANT = "RESTAURANT",
  WELLNESS = "WELLNESS",
  SERVICE = "SERVICE"
}

export declare class PaymentIntent {
  readonly clientSecret: string;
  constructor(init: ModelInit<PaymentIntent>);
}

type BoosterPassMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type UserMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type CouponMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type BusinessMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type ProductMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type CartProductMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type OrderProductMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type OrderMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

export declare class BoosterPass {
  readonly id: string;
  readonly isUsed: boolean;
  readonly userID: string;
  readonly type?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<BoosterPass, BoosterPassMetaData>);
  static copyOf(source: BoosterPass, mutator: (draft: MutableModel<BoosterPass, BoosterPassMetaData>) => MutableModel<BoosterPass, BoosterPassMetaData> | void): BoosterPass;
}

export declare class User {
  readonly id: string;
  readonly email?: string | null;
  readonly phonenumber?: string | null;
  readonly username?: string | null;
  readonly Coupons?: (Coupon | null)[] | null;
  readonly BoosterPass?: (BoosterPass | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<User, UserMetaData>);
  static copyOf(source: User, mutator: (draft: MutableModel<User, UserMetaData>) => MutableModel<User, UserMetaData> | void): User;
}

export declare class Coupon {
  readonly id: string;
  readonly business: Business;
  readonly userID?: string | null;
  readonly couponType: CouponType | keyof typeof CouponType;
  readonly currentPrice?: number | null;
  readonly discountPrice?: number | null;
  readonly itemDescription: string;
  readonly expirationDate?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<Coupon, CouponMetaData>);
  static copyOf(source: Coupon, mutator: (draft: MutableModel<Coupon, CouponMetaData>) => MutableModel<Coupon, CouponMetaData> | void): Coupon;
}

export declare class Business {
  readonly id: string;
  readonly name: string;
  readonly location: string;
  readonly coupons?: (Coupon | null)[] | null;
  readonly category: BusinessCategory | keyof typeof BusinessCategory;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<Business, BusinessMetaData>);
  static copyOf(source: Business, mutator: (draft: MutableModel<Business, BusinessMetaData>) => MutableModel<Business, BusinessMetaData> | void): Business;
}

export declare class Product {
  readonly id: string;
  readonly title: string;
  readonly description?: string | null;
  readonly image?: string | null;
  readonly images?: string[] | null;
  readonly options?: string[] | null;
  readonly price: number;
  readonly oldPrice?: number | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<Product, ProductMetaData>);
  static copyOf(source: Product, mutator: (draft: MutableModel<Product, ProductMetaData>) => MutableModel<Product, ProductMetaData> | void): Product;
}

export declare class CartProduct {
  readonly id: string;
  readonly userSub: string;
  readonly quantity: number;
  readonly option?: string | null;
  readonly productID: string;
  readonly product?: Product | null;
  readonly productTitle?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<CartProduct, CartProductMetaData>);
  static copyOf(source: CartProduct, mutator: (draft: MutableModel<CartProduct, CartProductMetaData>) => MutableModel<CartProduct, CartProductMetaData> | void): CartProduct;
}

export declare class OrderProduct {
  readonly id: string;
  readonly quantity: number;
  readonly option?: string | null;
  readonly productID?: string | null;
  readonly product?: Product | null;
  readonly orderID?: string | null;
  readonly order?: Order | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<OrderProduct, OrderProductMetaData>);
  static copyOf(source: OrderProduct, mutator: (draft: MutableModel<OrderProduct, OrderProductMetaData>) => MutableModel<OrderProduct, OrderProductMetaData> | void): OrderProduct;
}

export declare class Order {
  readonly id: string;
  readonly userSub: string;
  readonly fullName: string;
  readonly phoneNumber?: string | null;
  readonly country?: string | null;
  readonly city?: string | null;
  readonly address?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<Order, OrderMetaData>);
  static copyOf(source: Order, mutator: (draft: MutableModel<Order, OrderMetaData>) => MutableModel<Order, OrderMetaData> | void): Order;
}