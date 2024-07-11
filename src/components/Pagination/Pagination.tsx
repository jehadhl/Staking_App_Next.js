import React from 'react'
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";



const Pagination = ({
    currentPage,
    totalPages,
    onPageChange,
}: any) => {
    const visiblePages = 10;
    const halfVisible = Math.floor(visiblePages / 2);
    let startPage = Math.max(currentPage - halfVisible, 1);
    let endPage = Math.min(startPage + visiblePages - 1, totalPages);

    if (endPage - startPage + 1 < visiblePages) {
        startPage = Math.max(endPage - visiblePages + 1, 1);
    }

    const pageNumbers = Array.from(
        { length: endPage - startPage + 1 },
        (_, index) => startPage + index
    );

    return (
        <div className="flex justify-end items-center p-4">
            <ul className=" flex justify-center items-center gap-1 md:gap-2 ">
                <li>
                    <button
                        className={`py-2 px-2.5 ${currentPage === 1
                                ? "cursor-default"
                                : "bg-green-500 rounded-[5px]"
                            }`}
                        onClick={() => onPageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                    >
                        {/* <img src={left} alt="arrow-icon" className="w-[6px] h-[10px]" /> */}
                        <MdOutlineKeyboardArrowLeft className='text-white bg-Green w-[30px] h-[30px] p-1 rounded-lg' />
                    </button>
                </li>

                {pageNumbers.map((pageNumber) => (
                    <li
                        key={pageNumber}
                        className={`py-1 px-3 flex justify-center items-center ${currentPage === pageNumber ? "rounded-lg bg-gray-700" : ""
                            } text-[16px] text-white`}
                    >
                        <button
                            className="text-xs md:text-sm"
                            onClick={() => onPageChange(pageNumber)}
                        >
                            {pageNumber}
                        </button>
                    </li>
                ))}

                <li>
                    <button
                        className={`py-2 px-2.5 ${currentPage === totalPages
                                ? "cursor-default"
                                : "bg-green-500 rounded-[5px]"
                            }`}
                        onClick={() => onPageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                    >
                        {/* <img src={right} alt="arrow-icon" className="w-[6px] h-[10px]" /> */}
                    </button>
                </li>
            </ul>
        </div>
    );
};
export default Pagination;
