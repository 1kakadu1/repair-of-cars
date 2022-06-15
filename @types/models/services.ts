import { Services, Category} from "@prisma/client";

export interface IServicesData extends Services{
    categories?: Category[],
}