/**
 * The ClientPriceCategory contains the price_category object with 
 * dedicated client_price of this price_category object.
 *
 * @summary ClientPriceCategory: provides dedicated price for the specified client.
 * @author Husam Burhan
 *
 * Created at     : 2022-01-20 18:58:45 
 * Last modified  : 2022-01-20 22:22:22
 */

class ClientPriceCategory{
    constructor(price_category, client_id, client_price){
        this.price_category = price_category;
        this.client_id = client_id;
        this.client_price = client_price;
    }
}




