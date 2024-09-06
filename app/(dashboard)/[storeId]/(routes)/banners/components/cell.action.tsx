"use client";

import toast from "react-hot-toast";
import axios from "axios";

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { BannerColumn } from "./column";
import { Button } from "@/components/ui/button";
import { Copy, Edit, MoreHorizontal, Trash } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { AlertModal } from "@/components/modals/alert-modal";

interface CellActionProps {
  data: BannerColumn;
}

const CellAction: React.FC<CellActionProps> = ({ data }) => {
    const [loading, setLoading] = useState(false)
    const [open, setOpen] = useState(false)
    const router = useRouter();
    const params = useParams();
    
    const onCopy = (id: string) => {
        navigator.clipboard.writeText(id);
        toast.success("Id berhasil di copy")
    }

    const onDelete = async () => {
        try {
          setLoading(true);
          await axios.delete(`/api/${params.storeId}/banners/${data.id}`);
          router.refresh();
          router.push(`/${params.storeId}/banners`);
          toast.success("Banner Berhasil Di Hapus");
        } catch (error) {
          toast.error("Cek Kembali data dan koneksi mu");
        } finally {
          setLoading(false);
          setOpen(false);
        }
    };
    
  return (
    <>
    <AlertModal
    isOpen={open}
    onClose={() => setOpen(false)}
    onConfirm={onDelete}
    loading={loading}
    />
    <DropdownMenu>
        <DropdownMenuTrigger asChild>
            <Button variant="ghost">
                <span className="sr-only">Open Menu</span>
                <MoreHorizontal className="w-4 h-4" />
            </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem onClick={() => onCopy(data.id)}>
                <Copy className="w-4 h-4 mr-2" />
                Copy Id
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => router.push(`/${params.storeId}/banners/${data.id}`)}>
                <Edit className="w-4 h-4 mr-2" />
                Update
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setOpen(true)}>
                <Trash className="w-4 h-4 mr-2" />
                Delete
            </DropdownMenuItem>
        </DropdownMenuContent>
    </DropdownMenu>
    </>
  );
};

export default CellAction;
