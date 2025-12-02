import { useEffect, useState } from 'react'
import TableView from '../../components/TableView';
import Breadcrumbs from '../../components/Breadcrumbs';
import ClaimProcessModal from '../../components/Modals/ClaimProcessModal';
import { usePostMutation } from '../../api/apiSlice';
import { endpoints } from '../../api/config';
import moment from 'moment';


const tableHead = [
    {
        id: "one",
        label: "Claim Number/ID",
        searchBox: true,
    },
    {
        id: "two",
        label: "Claim Submitted",
        searchBox: true,
    },
    {
        id: "three",
        label: "Total Deductions",
        searchBox: true,
    },
    {
        id: "four",
        label: "Deduction Reason"
    },
    {
        id: "five",
        label: "Total Claims Paid",
        searchBox: true,
    },
    {
        id: "six",
        label: "Status",
        searchBox: true,
    },
    {
        id: "seven",
        label: "Claims Submitted Date"
    },
    {
        id: "eight",
        label: "Patient Name",
        searchBox: true,
    },
    {
        id: "nine",
        label: "Coverage Type",
        searchBox: true,
    },

]

function ClaimsUsers() {
    const [showSuccessModal, setShowSuccessModal] = useState(false)
    const [selectedClaim, setSelectedClaim] = useState(null);

    const handleCloseModal = () => {
        setShowSuccessModal(false)
    }

    const handleViewClaims = (claimData) => {
        setSelectedClaim(claimData.one);
        setShowSuccessModal(true)
    }


    const [getClaimsApi, { data, isLoading }] = usePostMutation({})

    console.log("GetAllClaims", data?.data?.claims)

    const tableData = data?.data?.claims?.map((item) => {
        const totalAmount = item.claimTreatments?.reduce(
            (sum, treatment) => sum + Number(treatment.claimAmount || 0),
            0
        );

        const deductedAmount = totalAmount - Number(item?.totalAmountPaid || 0);

        return {
            one: item.claimId,
            two: item.claimSequence,
            three: deductedAmount,
            four: item?.deductionReason ? item?.deductionReason : "------",
            five: item?.totalAmountPaid,
            six: item.status,
            seven: item?.createdOn
                ? moment(item?.createdOn, "YYYY-MM-DD").format("DD/MMM/YYYY")
                : "--",
            eight: item.patientName,
            nine: item.claimType,
        };
    }) || [];

    useEffect(() => {
        getClaimsApi({
            endpoint: endpoints.claims.getClaim,
            data: {
                "pagination": {
                    "currentPage": 1,
                    "pageSize": 10,
                    "searchString": "",
                    "isAllRecord": true,
                    "status": 0
                },
                "statusId": 0
            }
        })
    }, [])



    return (
        <div>
            <div className="company-managment-action-row">
                <Breadcrumbs title={"Claims Users"} currentPage={"Claims Users"} />
            </div>
            {/* <TableView tableHead={tableHead} tableData={tableData} handleView={handleViewClaims} searchRow={true} filterRow={true} /> */}
            <TableView
                tableHead={tableHead}
                tableData={tableData}
                handleView={handleViewClaims}
                searchRow={true}
                filterRow={true}
                isLoading={isLoading}
            />

            <ClaimProcessModal
                show={showSuccessModal}
                close={handleCloseModal}
                selectedClaimId={selectedClaim}
            />

        </div>
    )
}

export default ClaimsUsers