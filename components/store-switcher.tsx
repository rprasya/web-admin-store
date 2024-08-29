"use client";

import { useState } from "react";
import { useStoreModal } from "@/hooks/use-store-modal";
import { Store } from "@prisma/client";
import { PopoverTrigger } from "@radix-ui/react-popover";
import { useParams, useRouter } from "next/navigation";
import { Popover } from "./ui/popover";
import { Button } from "./ui/button";
import { Store as StoreIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type PopOverTriggerProps = React.ComponentPropsWithoutRef<
  typeof PopoverTrigger
>;

interface StoreSwitcherProps extends PopOverTriggerProps {
  items: Store[];
}

const StoreSwitcher = ({ className, items = [] }: StoreSwitcherProps) => {
  const storeModal = useStoreModal();
  const params = useParams();
  const router = useRouter();

  const formattedItems = items.map((item) => ({
    label: item.name,
    value: item.id,
  }));

  const currentStore = formattedItems.find(
    (item) => item.value === params.storeId
  );

  const [open, setOpen] = useState(false);

  const onStoreSelect = (store: { value: string; label: string }) => {
    setOpen(false);
    router.push(`/${store.value}`);
  };

  return (
    <div>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            role="combobox"
            aria-expanded={open}
            aria-label="Pilih Toko"
            className={cn("w-[200px] justify-between", className)}
          >
            <StoreIcon className="mr-2 h-4 w-4" />
          </Button>
        </PopoverTrigger>
      </Popover>
    </div>
  );
};

export default StoreSwitcher;
