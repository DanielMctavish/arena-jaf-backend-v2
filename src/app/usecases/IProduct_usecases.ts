import { FilePhoto } from "../../utils/Firebase/FirebaseOperations"
import IProducts from "../entities/IProducts"
import { AdmResponses, params } from "./IUserAdm_usecases"

interface IBuyProduct {
    product_id: string
    client_id: string
    quantity: number
    value: number
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