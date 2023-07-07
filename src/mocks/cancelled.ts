import { OrderStatus, Payment } from "../shared";

export default [
  {
    id: "1",
    address: {
      id: "1",
      name: "Nguyễn Văn A",
      phone: "0123456789",
      street: "123 Đường ABC",
      district: "Quận XYZ",
      city: "TP. HCM",
      ward: "Phường 123",
    },
    approved_date: Date.now(),
    shipped_date: Date.now(),
    status: OrderStatus.Cancelled,
    payment: Payment.Cash,
    products: [
      {
        id: "1",
        name: "Vỏ gối cotton Thắng Lợi chính hãng ( gối nằm - gối ôm ) [ảnh thất 2]",
        price: 100000,
        sale: 0,
        quantity: 1,
        image: "2ba48c4c",
      },
      {
        id: "2",
        name: "Vỏ gối cotton Thắng Lợi chính hãng ( gối nằm - gối ôm ) [ảnh thất 2] 21",
        price: 1000000,
        sale: 2,
        quantity: 2,
        image: "2ba48c4c",
      },
    ],
  },
  {
    id: "2",
    address: {
      id: "1",
      name: "Nguyễn Văn A",
      phone: "0123456789",
      street: "123 Đường ABC",
      district: "Quận XYZ",
      city: "TP. HCM",
      ward: "Phường 123",
    },
    approved_date: Date.now(),
    shipped_date: Date.now(),
    status: OrderStatus.Cancelled,
    payment: Payment.Cash,
    products: [
      {
        id: "1",
        name: "Áo thun nam",
        price: 100000,
        sale: 0,
        quantity: 1,
        image: "2ba48c4c",
      },
      {
        id: "2",
        name: "Áo thun nam 1",
        price: 1000000,
        sale: 2,
        quantity: 2,
        image: "2ba48c4c",
      },
    ],
  },
  {
    id: "3",
    address: {
      id: "1",
      name: "Nguyễn Văn A",
      phone: "0123456789",
      street: "123 Đường ABC",
      district: "Quận XYZ",
      city: "TP. HCM",
      ward: "Phường 123",
    },
    approved_date: Date.now(),
    shipped_date: Date.now(),
    status: OrderStatus.Cancelled,
    payment: Payment.Cash,
    products: [
      {
        id: "1",
        name: "Áo thun nam",
        price: 100000,
        sale: 0,
        quantity: 1,
        image: "2ba48c4c",
      },
      {
        id: "2",
        name: "Áo thun nam 1",
        price: 1000000,
        sale: 2,
        quantity: 2,
        image: "2ba48c4c",
      },
    ],
  },
  {
    id: "4",
    address: {
      id: "1",
      name: "Nguyễn Văn A",
      phone: "0123456789",
      street: "123 Đường ABC",
      district: "Quận XYZ",
      city: "TP. HCM",
      ward: "Phường 123",
    },
    shipped_date: Date.now(),
    approved_date: Date.now(),
    status: OrderStatus.Cancelled,
    payment: Payment.Cash,
    products: [
      {
        id: "1",
        name: "Áo thun nam",
        price: 100000,
        sale: 0,
        quantity: 1,
        image: "2ba48c4c",
      },
      {
        id: "2",
        name: "Áo thun nam 1",
        price: 1000000,
        sale: 2,
        quantity: 2,
        image: "2ba48c4c",
      },
    ],
  },
  {
    id: "5",
    address: {
      id: "1",
      name: "Nguyễn Văn A",
      phone: "0123456789",
      street: "123 Đường ABC",
      district: "Quận XYZ",
      city: "TP. HCM",
      ward: "Phường 123",
    },
    shipped_date: Date.now(),
    approved_date: Date.now(),
    status: OrderStatus.Cancelled,
    payment: Payment.Cash,
    products: [
      {
        id: "1",
        name: "Áo thun nam",
        price: 100000,
        sale: 0,
        quantity: 1,
        image: "2ba48c4c",
      },
      {
        id: "2",
        name: "Áo thun nam 1",
        price: 1000000,
        sale: 2,
        quantity: 2,
        image: "2ba48c4c",
      },
    ],
  },
  {
    id: "6",
    address: {
      id: "1",
      name: "Nguyễn Văn A",
      phone: "0123456789",
      street: "123 Đường ABC",
      district: "Quận XYZ",
      city: "TP. HCM",
      ward: "Phường 123",
    },
    shipped_date: Date.now(),
    approved_date: Date.now(),
    status: OrderStatus.Cancelled,
    payment: Payment.Cash,
    products: [
      {
        id: "1",
        name: "Áo thun nam",
        price: 100000,
        sale: 0,
        quantity: 1,
        image: "2ba48c4c",
      },
      {
        id: "2",
        name: "Áo thun nam 1",
        price: 1000000,
        sale: 2,
        quantity: 2,
        image: "2ba48c4c",
      },
    ],
  },
];
