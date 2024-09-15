import { FilePhoto } from "../../utils/Firebase/FirebaseOperations"
import IProducts from "../entities/IProducts"
import { AdmResponses, params } from "./IUserAdm_usecases"
import { METHOD_PAYMENT } from "../entities/ITransaction" // Import METHOD_PAYMENT

interface IBuyProduct {
    product_id: string
    client_id: string
    quantity: number
    value: number
    method: METHOD_PAYMENT // Change type to METHOD_PAYMENT
}

interface IProduct_usecases {

    //PRODUCTS
    RegisterNewProduct(data: IProducts): Promise<AdmResponses>
    ListProducts(data: any, params: params): Promise<AdmResponses>
    UpdateNewProduct(data: IProducts, params: params): Promise<AdmResponses>
    DeleteNewProduct(data: any, params: params): Promise<AdmResponses>

    //SHOP
    BuyProduct(data: IBuyProduct): Promise<AdmResponses>

    //FIREBASE
    UploadProductCoverImg(data: any, params: params, File: FilePhoto): Promise<AdmResponses>
    DeleteProductCoverImg(data: any, params: params): Promise<AdmResponses>

}

export { IBuyProduct }
export default IProduct_usecases;