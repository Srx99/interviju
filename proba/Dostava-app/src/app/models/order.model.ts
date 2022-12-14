export class Order{
    id: number = 0;
    dishName: string = "";
    amount: number = 0;
    orderAddress: string = "";
    comentar: string = "";
    price: number = 0;
    clientId: number = 1;   
    delivererId: number = 1; 
    status: string = ""; //waiting, done, inProcess
    //time: Date = new Date();
    time: any;
    lat: number = 0;
    lon: number = 0;
}