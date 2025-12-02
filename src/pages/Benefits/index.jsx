import TableView from '../../components/TableView'
import { Link, Outlet, useNavigate } from 'react-router-dom';
import Breadcrumbs from '../../components/Breadcrumbs';
import { useDeleteMutation, usePostMutation } from '../../api/apiSlice';
import { useEffect, useState } from 'react';
import { endpoints } from '../../api/config';


const tableHead = [
    {
        id: 1,
        label: "Benefit Type"
    },
    {
        id: 2,
        label: "Benefits",
        searchBox: true,
    },

    {
        id: 3,
        label: "Entitlement Limits"
    },
    {
        id: 4,
        label: "Coverage Eligibility"
    },
    {
        id: 5,
        label: "Description"
    },
]

// const tabledata = [
//     {
//         1: 'Basic Plan',
//         2: 'trfdster',
//         3: 'tredsfxdwas',
//         4: 'yrtdfzsvdcx'
//     }
// ];

// const ClassName = {
//     0: "benefits-Light-Cyan",
//     1: "benefits-Pale-Azure",
//     2: "benefits-Peach-Cream",
// };

// const BenefitsData = tabledata.map((item) => ({
//     1: item[1],
//     2: (
//         <span className="benefits-td">
//             {item[2].map((_item, _index) => (
//                 <span key={_index} className={ClassName[_index % 3]}>
//                     {_item}
//                 </span>
//             ))}
//         </span>
//     ),
// }));


function Benefits() {
    const [page, setPage] = useState(1);
    const navigate = useNavigate()

    const [getBenefits, { data: getBenefitsData }] = usePostMutation()

    useEffect(() => {
        getBenefits({
            endpoint: endpoints.Benefits.GetBenefitListByAdmin,
            data: {
                "currentPage": page,
                "pageSize": 10,
                "isAllRecord": false
            }
        })
    }, [page])

    const tableData = getBenefitsData?.data?.dataList?.map((item) => ({
        1: item?.benefitType?.benefitTypeName,
        2: item?.benefitDetails,
        3: item?.entitlementLimits,
        4: item?.coverageEligibility,
        5: item?.note,
        ...item
    })) || [];

    const [deleteBenefit] = useDeleteMutation()

    const handleDeleteBenefit = (item) => {
        deleteBenefit({
            endpoint: endpoints.Benefits.DeleteBenefitsByAdmin,
            data: [
                {
                    "id": item.id,
                    "status": -1
                }
            ]
        }).then(() => {
            getBenefits({
                endpoint: endpoints.Benefits.GetBenefitListByAdmin,
                data: {
                    "currentPage": page,
                    "pageSize": 10,
                    "isAllRecord": false
                }
            })
        })
    }

    const handleUpdateBenefit = (item) => {
        navigate("/AddBenefits", { state: { item } })
    }

    return (
        <div>
            <div className="company-managment-action-row">
                <Breadcrumbs title={"Benefits"} currentPage={"Benefits"} />

                <div className="managment-action-btns">
                    <button className="action-button">Bulk Upload</button>
                    <Link to={"/AddBenefits"}><button className="action-button">Add New</button></Link>
                </div>
            </div>

            <TableView
                tableHead={tableHead}
                tableData={tableData}
                searchRow={true}
                filterRow={true}
                deleteButton={true}
                handleDelete={handleDeleteBenefit}
                handleEdit={handleUpdateBenefit}

                totalPages={getBenefitsData?.data?.pagination?.totalPages}
                currentPage={getBenefitsData?.data?.pagination?.currentPage}
                onPressPage={(page) => {
                    setPage(page);
                }}
            />

            <Outlet />
        </div>
    )
}

export default Benefits