"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import Dropdown from "./dropdown/Dropdown";
import DropdownToggle from "./dropdown/DropdownToggle";
import DropdownList from "./dropdown/DropdownList";
import DropdownItem from "./dropdown/DropdownItem";
import EditReviewModal from "../modals/EditReviewModal";
import DeleteReviewModal from "../modals/DeleteReviewModal";

export default function ReviewDropdown({ id }: { id: string | undefined }) {
  const [isOpenEditModal, setIsOpenEditModal] = useState(false);
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();

  const openEditModal = () => {
    setIsOpenEditModal(true);
    const params = new URLSearchParams(searchParams);
    params.set("edit", "true");
    router.push(`?${params.toString()}`, { scroll: false });
  };

  const closeEditModal = () => {
    setIsOpenEditModal(false);
  };

  const openDeleteModal = () => {
    setIsOpenDeleteModal(true);
  };

  const closeDeleteModal = () => {
    setIsOpenDeleteModal(false);
  };

  return (
    <div className="relative">
      <Dropdown>
        <DropdownToggle className="cursor-pointer">
          <div className="relative h-[17.33px] w-1">
            <Image src="/images/kebab.svg" alt="케밥 버튼" fill />
          </div>
        </DropdownToggle>
        <DropdownList className="absolute right-0 top-6 z-20 bg-white">
          <DropdownItem onClick={openEditModal}>수정하기</DropdownItem>
          <hr className="w-32 border-t border-gray600" />
          <DropdownItem onClick={openDeleteModal}>삭제하기</DropdownItem>
        </DropdownList>
      </Dropdown>
      {isOpenEditModal && (
        <EditReviewModal id={id} closeEditModal={closeEditModal} />
      )}
      {isOpenDeleteModal && (
        <DeleteReviewModal id={id} closeDeleteModal={closeDeleteModal} />
      )}
    </div>
  );
}
