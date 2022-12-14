export class UnprocessedOrder{
    id: number = -1;
    dishName: string = "";
    orderAddress: string = "";
    comentar: string = "";
    price: number = 0;
    status: string = ""; //waiting, done, inProcess
    lat: number = 0;
    lon: number = 0;
}