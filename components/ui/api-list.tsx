'use client'

import UseOrigin from "@/hooks/use-origin";
import { useParams } from "next/navigation";
import { ApiAlert } from "./api-alert";

interface ApiListProps {
    namaIndikator: string;
    idIndikator: string;
}

const ApiList: React.FC<ApiListProps> = ({
    namaIndikator,
    idIndikator
}) => {

    const params = useParams();
    const origin = UseOrigin();

    const baseUrl = `${origin}/api/${params.storeId}`

    return (
        <>
            <ApiAlert
            title="GET"
            description={`${baseUrl}/${namaIndikator}`}
            variant="public"
            />
            <ApiAlert
            title="GET"
            description={`${baseUrl}/${namaIndikator}/{${idIndikator}}`}
            variant="public"
            />
            <ApiAlert
            title="POST"
            description={`${baseUrl}/${namaIndikator}`}
            variant="admin"
            />
            <ApiAlert
            title="PATCH"
            description={`${baseUrl}/${namaIndikator}/{${idIndikator}}`}
            variant="admin"
            />
            <ApiAlert
            title="DELETE"
            description={`${baseUrl}/${namaIndikator}/{${idIndikator}}`}
            variant="admin"
            />
        </>
    );
}
 
export default ApiList;