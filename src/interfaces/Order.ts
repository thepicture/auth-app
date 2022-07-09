export default interface Order {
    orderId: number;
    creationUnixTime: number;
    sumInCents: number;
    countOfProducts: number;
}