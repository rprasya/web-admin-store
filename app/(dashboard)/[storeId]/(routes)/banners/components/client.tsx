"use client";

import { Banner } from "@prisma/client";
import { Button } from "@/components/ui/button";
import Heading from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { BannerColumn, columns } from "./column";
import { DataTable } from "@/components/ui/data-table";

interface BannerClientProps {
  data: BannerColumn[]
}

const BannerClient: React.FC<BannerClientProps> = ({
  data
}) => {
  const router = useRouter();
  const params = useParams();

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading title={`Banner (${data.length})`} description="Atur Banner Untuk Toko" />
        <Button onClick={() => router.push(`/${params.storeId}/banners/new`)}>
          <Plus className="h-4 w-4 mr-2" />
          Add New
        </Button>
      </div>
      <Separator />
      <DataTable data={data} columns={columns} searchKey="label" />
    </>
  );
};

export default BannerClient;
