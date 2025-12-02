import TableView from '../../components/TableView';
import { Link } from 'react-router-dom';
import Breadcrumbs from '../../components/Breadcrumbs';




const tableHead = [
    {
        id: 1,
        label: "Type",
        searchBox: true,
    },
    {
        id: 2,
        label: "Benefit Description",
        searchBox: true,
    },
    {
        id: 3,
        label: "Category",
        searchBox: true,
    }
]

const tableData = [
    {
        1: 'Hospital',
        2: 'Maximum Hospitalization (per insured per annum)',
        3: [
            "Plan A 001",
            "Plan B 002",
            "Plan C 003",
            "Plan D",
        ],
    },
]


const ClassName = {
    0: "category-plan-a",
    1: "category-plan-b",
    2: "category-plan-c",
    3: "category-plan-d"
};

const HospitalizationData = tableData.map((item) => ({
    1: item[1],
    2: item[2],
    3: (
        <span className="benefits-td">
            {item[3].map((_item, _index) => (
                <span key={_index} className={ClassName[_index % 4]}>
                    {_item}
                </span>
            ))}
        </span>
    ),
}));

function HospitalizationBenefits() {
    return (
        <div>
            <div className="company-managment-action-row">
                <Breadcrumbs title={"Hospitalization Benefits"} currentPage={"Hospitalization Benefits"} />

                <div className="managment-action-btns">
                    <Link>
                        <button className="action-button">
                            Add New
                        </button>
                    </Link>
                </div>
            </div>

            <TableView tableHead={tableHead} tableData={HospitalizationData} searchRow={true} filterRow={true} />
        </div>
    )
}

export default HospitalizationBenefits