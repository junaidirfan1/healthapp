import { useState } from 'react'
import Edit from "../assets/images/edit-pencil.svg";
import ThreeLines from "../assets/images/table-three-dots.svg";
import Eye from "../assets/images/eye.svg";
import "../assets/css/pagination.css";
import ReactPaginate from 'react-paginate';


import search from "../assets/images/header-search.png";
import calender from "../assets/images/calender.png";
import filter from "../assets/images/filter.png";
import deleteIcon from "../assets/images/delete.png";
import download from "../assets/images/download.png";
import DeleteIcon from "../assets/images/table-delete-icon.svg";


function TableView({
    tableHead,
    tableData,
    handleView,
    handleEdit,
    handlemenu,
    filterRow,
    isLoading,
    handleDelete,
    deleteButton,
    totalPages,
    currentPage = 1,
    onPressPage,
}) {
    const [searchData, setSearchData] = useState("");

    const filteredData = tableData?.filter((row) => {
        return Object.values(row)
            .join(" ")
            .toLowerCase()
            .includes(searchData.toLowerCase());
    });

    return (
        <>
            {
                filterRow && (
                    <div className="filter-row">
                        <div className="search-bar-row">
                            <span className="search-bar-span">
                                <img src={search} alt="" />
                                <input type="text" placeholder="Search..."
                                    value={searchData}
                                    onChange={(e) => setSearchData(e.target.value)}
                                />
                            </span>

                            <div className="mobile-menu">
                                <button className="menu-toggle-btn">
                                    <img src="assets/images/filter.png" alt="" />
                                </button>
                                <div className="menu-dropdown">
                                    <button className="date-filter">
                                        <img src={calender} alt="" /></button>
                                    <button className="date-filter"><img src={filter} alt="" /></button>

                                    <button className="date-filter"><img src={deleteIcon} alt="" /></button>

                                    <button className="export-btn"><img src={download} alt="" />Export
                                        CSV</button>
                                </div>
                            </div>
                            <button className="date-filter desktop-only">
                                <img src={calender} alt="" />
                            </button>
                            <button className="date-filter desktop-only">
                                <img src={filter} alt="" />
                            </button>
                            <button className="date-filter desktop-only">
                                <img src={deleteIcon} alt="" />
                            </button>
                        </div>
                        <button className="export-btn desktop-only">
                            <img src={download} alt="" />Export CSV</button>
                    </div>
                )
            }
            <div className="managment-table table-responsive">
                {
                    isLoading ? (<p>Loading Data....</p>) : (
                        <table>
                            <thead>
                                <tr>
                                    <th>
                                        <label className="custom-checkbox">
                                            <input type="checkbox" />
                                            <span className="checkmark"></span>
                                        </label>
                                    </th>

                                    {
                                        tableHead?.map((label) => {
                                            return (
                                                <th key={label.id}>{label.label}</th>
                                            )
                                        })
                                    }

                                    <th className='actions-th'>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {/* {
                                    searchRow && (
                                        <tr>
                                            <td></td>
                                            {tableHead?.map(item => (item?.searchBox ? <td key={item.id}><input type='search' className='tableInput' /></td> : <td key={item.id} />))}
                                            <td></td>
                                        </tr>
                                    )
                                } */}
                                {
                                    filteredData?.map((item, index) => {
                                        return (
                                            <tr key={index}>
                                                <td>
                                                    <label className="custom-checkbox">
                                                        <input type="checkbox" />
                                                        <span className="checkmark"></span>
                                                    </label>
                                                </td>
                                                {tableHead?.map((data) => {
                                                    if (data.label === 'Status') {
                                                        return (
                                                            <td
                                                                className={item[data.id] === "Active" ? "table-status-active" : item[data?.id] === 'Inactive' ? "table-status-Inactive" : item.statusColor}
                                                                key={data.id}
                                                            >
                                                                <span>{item[data.id]}</span>
                                                            </td>
                                                        )
                                                    }

                                                    else {
                                                        return (
                                                            <td key={data.id}>{item[data.id]}</td>
                                                        )
                                                    }
                                                })}
                                                <td className="table-actions">

                                                    <button onClick={() => handleView(item)}>
                                                        <img src={Eye} alt="" />
                                                    </button>

                                                    <button onClick={() => handleEdit(item)}>
                                                        <img src={Edit} alt="" />
                                                    </button>

                                                    {deleteButton ? <button onClick={() => handleDelete(item)}>
                                                        <img src={DeleteIcon} alt="" />
                                                    </button> : <button onClick={() => handlemenu(item)}>
                                                        <img src={ThreeLines} alt="" />
                                                    </button>}
                                                </td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    )
                }
            </div>

            <div className="pagination-row">
                <div className="center premium-pagination">
                    {totalPages > 1 && (
                        <ReactPaginate
                            nextLabel="Next"
                            breakLabel="..."
                            pageRangeDisplayed={2}
                            previousLabel="Back"
                            activeClassName="pagination-active"
                            pageClassName="pagination-item"
                            previousClassName="prev"
                            nextClassName="next"
                            containerClassName="pagination-container"
                            pageLinkClassName="premium-pag"
                            onPageChange={(page) => {
                                onPressPage(page?.selected + 1);
                                window.scrollTo(0, 0);
                            }}
                            pageCount={totalPages}
                            forcePage={currentPage - 1}
                            renderOnZeroPageCount={null}

                        />
                    )}
                </div>
            </div>
        </>
    )
}

export default TableView