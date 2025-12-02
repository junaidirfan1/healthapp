import TableView from '../../components/TableView';
import { Link, useNavigate } from 'react-router-dom';
import Breadcrumbs from '../../components/Breadcrumbs';
import { useDeleteMutation, usePostMutation } from '../../api/apiSlice';
import { useEffect } from 'react';
import { endpoints } from '../../api/config';

const tableHead = [
    {
        id: "one",
        label: "Type H/DC",
        searchBox: true,
    },
    {
        id: "two",
        label: "Province",
        searchBox: true,

    },
    {
        id: "three",
        label: "H/DC Name",
        searchBox: true,
    },
    {
        id: "four",
        label: "Phone Number",
    },
    {
        id: "five",
        label: "Address",
        searchBox: true,
    },
    {
        id: "six",
        label: "Latitude",
    },
    {
        id: "seven",
        label: "Longitude",
    },
    {
        id: "eight",
        label: "City",
        searchBox: true,
    },
    {
        id: "nine",
        label: "Status",
    },
]

// const tableData = [
//     {
//         one: 'Discounted Center',
//         two: 'Sindh',
//         three: 'Genesis Diagnostic Center',
//         four: '0241773758',
//         five: 'V3GC+F8, Delhi Mercantile Society, Karachi',
//         six: '24.860966° N',
//         seven: '66.990501° E',
//         eight: 'Karachi',
//         nine: 'Active',
//     },
//     {
//         one: 'Discounted Center',
//         two: 'Sindh',
//         three: 'Genesis Diagnostic Center',
//         four: '0241773758',
//         five: 'V3GC+F8, Delhi Mercantile Society, Karachi',
//         six: '24.860966° N',
//         seven: '66.990501° E',
//         eight: 'Karachi',
//         nine: 'Active',
//     },
//     {
//         one: 'Discounted Center',
//         two: 'Sindh',
//         three: 'Genesis Diagnostic Center',
//         four: '0241773758',
//         five: 'V3GC+F8, Delhi Mercantile Society, Karachi',
//         six: '24.860966° N',
//         seven: '66.990501° E',
//         eight: 'Karachi',
//         nine: 'Active',
//     },
//     {
//         one: 'Discounted Center',
//         two: 'Sindh',
//         three: 'Genesis Diagnostic Center',
//         four: '0241773758',
//         five: 'V3GC+F8, Delhi Mercantile Society, Karachi',
//         six: '24.860966° N',
//         seven: '66.990501° E',
//         eight: 'Karachi',
//         nine: 'Inactive',
//     },
// ]


function HospitalDiscountedCenters() {
    const navigate = useNavigate()

    const [gethospitals, { data: hospitalsData, }] = usePostMutation({})

    useEffect(() => {
        gethospitals({
            endpoint: endpoints.DiscountCenterAndHospital.GetAllDiscountCentersOrHospitals,
            data: {
                "pagination": {
                    "currentPage": 1,
                    "pageSize": 10,
                    "sortOn": "",
                    "sortDirection": "",
                    "searchString": "",
                    "isAllRecord": false
                },
            }
        })
    }, [])

    const tableData = hospitalsData?.data?.dataList?.map((item) => {
        return {
            one: item.discountType,
            two: item.city?.province,
            three: item.name,
            four: item.phoneNumber,
            five: item.address,
            six: item.latitude,
            seven: item.longitude,
            eight: item?.city?.name,
            nine: item.status,
            ...item
        }
    }) || [];

    const [deleteHospital, { }] = useDeleteMutation()

    const handleDeleteHospital = (item) => {
        deleteHospital({
            endpoint: `${endpoints.DiscountCenterAndHospital.DeleteDiscountCenterOrHospital}?Id=${item.id}`
        }).then((res) => {
            gethospitals({
                endpoint: endpoints.DiscountCenterAndHospital.GetAllDiscountCentersOrHospitals,
                data: {
                    "pagination": {
                        "currentPage": 1,
                        "pageSize": 10,
                        "sortOn": "",
                        "sortDirection": "",
                        "searchString": "",
                        "isAllRecord": false
                    },
                }
            })
        })
    }

    const handleUpdateHospital = (item) => {
        navigate("/AddHospital", { state: { item } })
    }

    return (
        <div>
            <div className="company-managment-action-row">
                <Breadcrumbs title={"Hospital & Discounted Centers"} currentPage={"Hospital & Discounted Centers"} />

                <div className="managment-action-btns">
                    <Link to={"/AddHospital"}>
                        <button className="action-button">
                            Add New
                        </button>
                    </Link>
                </div>
            </div>


            <TableView
                tableHead={tableHead}
                tableData={tableData}
                searchRow={true}
                filterRow={true}
                handleDelete={handleDeleteHospital}
                handleEdit={handleUpdateHospital}
                deleteButton={true}
            />
        </div>
    )
}

export default HospitalDiscountedCenters