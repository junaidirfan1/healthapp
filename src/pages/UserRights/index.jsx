import Breadcrumbs from '../../components/Breadcrumbs'
import Select from 'react-select'
import useErrorHandlingHook from '../../hooks/useErrorHandlingHook'
import { validationRules } from '../../utils/Validations'
import Modal from 'react-bootstrap/Modal';
import { use, useEffect, useMemo, useState } from 'react';
import InputField from '../../components/InputField';
import { useGetQuery, usePostMutation, usePutMutation } from '../../api/apiSlice';
import { endpoints } from '../../api/config';
import { toast } from 'react-toastify';

function UserRights() {
    const [show, setShow] = useState(false);
    const [checkBoxData, setCheckboxData] = useState([])
    const [checkboxChanged, setCheckboxChanged] = useState(false);

    const validationSchema = {
        type: [validationRules.required("Type")],
    }

    const { apiData, setterForApiData, checkForError, resetStates } = useErrorHandlingHook({
        type: "",
        role: "",
    }, validationSchema)


    const [getAllRoles, { data, }] = usePostMutation({})

    const roles = useMemo(() => {
        if (data?.data?.roles?.length > 0) {
            setterForApiData("type", data?.data?.roles[0]?.roleId)
        }
        return data?.data?.roles?.map((role) => ({
            value: role.roleId,
            label: role.roleName,
            ...role,
        }));

    }, [data])





    const handleCloseRoleModal = () => setShow(false); // Show Modal Function
    const handleAddRole = () => setShow(true); // Close Modal Function

    const [addRole, { data: addRoleData, }] = usePutMutation()

    const handleSubmitRole = () => {
        const isAllowed = checkForError();
        if (!isAllowed) return;
        addRole({
            endpoint: endpoints.roles.AddRoleByAdmin,
            data: {
                roleName: apiData.role,
            }
        }).unwrap().then(() => {
            resetStates();
            getAllRoles({
                endpoint: endpoints.roles.getAllRoles,
                data: { "isAllRecord": true }
            });
        })

    }


    useEffect(() => {
        getAllRoles({
            endpoint: endpoints.roles.getAllRoles,
            data: {
                "isAllRecord": true
            }
        })
    }, [])


    const selectedRoleId = apiData.type

    const { data: rightsData, refetch: refetchRights } = useGetQuery(
        `${endpoints.roles.GetAllRightsBasedOnRole}?roleId=${selectedRoleId}`,
        {
            skip: !selectedRoleId,
            refetchOnMountOrArgChange: true,
            refetchOnFocus: true,
        }

    );

    useEffect(() => {
        if (rightsData?.data?.length > 0) {
            setCheckboxData(rightsData?.data)
        }
    }, [rightsData])

    const handleCheckboxChange = (key, index) => {
        let temp = JSON.parse(JSON.stringify(checkBoxData))
        temp[index][key] = !temp[index][key]
        setCheckboxData(temp)
        setCheckboxChanged(true);
    }
    const [updateRights, { isLoading: updateRightsIsLoading, }] = usePutMutation();


    const handleSaveRights = () => {
        updateRights({
            endpoint: endpoints.roles.UpdateAllRightsBasedOnRoleId,
            data: {
                "roleId": selectedRoleId,
                "rights": checkBoxData.map(item => ({
                    page: item.page,
                    view: item.view,
                    add: item.add,
                    update: item.update,
                    delete: item.delete,
                }))

            }
        }).then((_item) => {
            toast.success(_item?.data.message)
            console.log("Roles Updated", _item)
        })

        setCheckboxChanged(false);

    }

    return (
        <div>
            <div className="company-managment-action-row">
                <Breadcrumbs title={"User Rights"} currentPage={"User Rights"} />

                <div className="managment-action-btns">
                    <button className="action-button">Delete Role</button>
                    <button className="action-button" onClick={handleAddRole}>Add New Role</button>
                </div>
            </div>

            <div className="row roles-header">
                <div className="col-md-3">
                    <div className="login-email-container">
                        <Select
                            options={roles}
                            placeholder="Roles"
                            isSearchable={false}
                            onChange={(e) => { setterForApiData("type", e.value); refetchRights() }}
                            value={roles?.find(option => option.value === apiData.type)}
                            styles={{
                                control: (base) => ({
                                    ...base,
                                    border: "none",
                                    boxShadow: "none",
                                    padding: "0px",
                                    minHeight: "auto",
                                    backgroundColor: "transparent",
                                }),
                                valueContainer: (base) => ({
                                    ...base,
                                    padding: "0px",
                                }),
                                indicatorsContainer: (base) => ({
                                    ...base,
                                    padding: "0px",
                                }),
                                dropdownIndicator: (base) => ({
                                    ...base,
                                    padding: "0px",
                                    transform: "scale(1.5)",
                                }),
                                indicatorSeparator: () => ({
                                    display: "none",
                                }),
                                menu: (base) => ({
                                    ...base,
                                    borderRadius: "8px",
                                    overflow: "hidden",
                                }),
                                input: (base) => ({
                                    ...base,
                                    margin: 0,
                                    padding: 0,
                                }),
                                option: (base, { isFocused, isSelected }) => ({
                                    ...base,
                                    backgroundColor: isSelected
                                        ? "#F7F9FF"
                                        : isFocused
                                            ? "transparent"
                                            : "white",
                                    color: "var(--Jet-Black)",
                                    cursor: "pointer",
                                }),
                            }}
                        />
                    </div>
                </div>
            </div>

            <div className="managment-table table-responsive user-rights-table">
                <table>
                    <thead>
                        <tr>
                            <th>
                                <input type='checkbox' />
                            </th>
                            <th>
                                pages
                            </th>
                            <th>
                                View
                            </th>
                            <th>
                                Add
                            </th>
                            <th>
                                Edit
                            </th>
                            <th>
                                Delete
                            </th>
                        </tr>
                    </thead>

                    {checkBoxData?.length > 0 && checkBoxData?.map((right, index) => (
                        <tbody key={index}>
                            <tr>
                                <td>
                                    <input type='checkbox' />
                                </td>
                                <td>
                                    {right?.page ?? '--'}
                                </td>
                                <td>
                                    <input
                                        onChange={(e) => {
                                            handleCheckboxChange('view', index)

                                        }}

                                        checked={right?.view} type='checkbox' />
                                </td>
                                <td>
                                    <input
                                        onChange={(e) => {
                                            handleCheckboxChange('add', index)

                                        }}
                                        checked={right?.add} type='checkbox' />
                                </td>
                                <td>
                                    <input
                                        onChange={(e) => {
                                            handleCheckboxChange('update', index)

                                        }}
                                        checked={right?.update} type='checkbox' />
                                </td>
                                <td>
                                    <input
                                        onChange={(e) => {
                                            handleCheckboxChange('delete', index)

                                        }}
                                        checked={right?.delete} type='checkbox' />
                                </td>
                            </tr>
                        </tbody>
                    ))}

                </table>

            </div>
            {checkboxChanged && (
                <div className="managment-action-btns roles-save-btn">
                    <button className="action-button loadig-Color" onClick={handleSaveRights} disabled={updateRightsIsLoading ? true : false}>
                        {updateRightsIsLoading ?
                            <div className="spinner-border" role="status"></div>
                            : "Save"
                        }
                    </button>
                </div>
            )}

            <Modal
                show={show}
                onHide={handleCloseRoleModal}
                centered
                className='user-role-modal'
                size="md"
            >
                <Modal.Header closeButton>
                    <Modal.Title>Add User Role</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <InputField
                        heading={"Role"}
                        placeholder={"Select Role"}
                        value={apiData.role}
                        onChange={(e) => setterForApiData("role", e.target.value)}
                        // onChange={(e) => { setterForApiData("role", e.target.value), refetchRights() }}
                        error={apiData.role_password}
                    />

                    <div className='user-role-modal-btn managment-action-btns'>
                        <button variant="secondary" onClick={handleCloseRoleModal} className='action-button'>
                            Close
                        </button>
                        <button variant="primary" onClick={handleSubmitRole} className='action-button'>
                            Submit Role
                        </button>
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    )
}

export default UserRights