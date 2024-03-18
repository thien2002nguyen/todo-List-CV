import React, { useCallback, useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import { fetchAllUser } from '../services/UserService';
import ReactPaginate from 'react-paginate';
import { useDispatch, useSelector } from 'react-redux';
import { setUserList } from '../features/users/usersSlice';
import ModalAddNew from './ModalAddNew';
import ModalEditUser from './ModalEditUser';
import ModalDeleteUser from './ModalDeleteUser';
import './scss/TableUser.scss';
import _ from 'lodash';
import { CSVLink } from "react-csv";
import Papa from "papaparse";
import { toast } from 'react-toastify';

function TableUser() {
    const userList = useSelector((state) => state.users.userList);
    const dispatch = useDispatch();
    const [pageTable, setPageTable] = useState(1);
    const [totalPages, setTotalPage] = useState(0);
    const [isShowModalAddNew, setIsShowModalAtNew] = useState(false);
    const [isShowModalEditUser, setIsShowModalEditUser] = useState(false);
    const [isShowModalDeleteUser, setIsShowModalDeleteUser] = useState(false);
    const [dataUserEdit, setDataUserEdit] = useState({});
    const [dataUserDelete, setDataUserDelete] = useState({});
    const [userListSearch, setUserListSearch] = useState({});
    const [dataExport, setDataExport] = useState([]);

    const getUsers = useCallback(async (page) => {
        setPageTable(page);
        const res = await fetchAllUser(page);
        if (res && res.data) {
            dispatch(setUserList(res.data));
            setUserListSearch(res.data);
            setTotalPage(res.total_pages);
        }
    }, [dispatch])

    useEffect(() => {
        getUsers(pageTable);
    }, [pageTable, getUsers])

    const handlePageClick = (event) => {
        getUsers(event.selected + 1);
    };

    const handleClickEdit = (user) => {
        setDataUserEdit(user)
        setIsShowModalEditUser(true);
    }

    const handleClickDelete = (user) => {
        setDataUserDelete(user);
        setIsShowModalDeleteUser(true);
    }

    const handleSort = (sortBy, sortField) => {
        let cloneListUser = _.cloneDeep(userList);
        cloneListUser = _.orderBy(cloneListUser, [sortField], [sortBy]);
        dispatch(setUserList(cloneListUser));
    }

    const handleOnChange = _.debounce((e) => {
        let keyWord = e.target.value;
        if (keyWord) {
            const cloneListUserSearch = _.cloneDeep(userListSearch);
            let cloneListUser = _.cloneDeep(userList);
            cloneListUser = cloneListUserSearch.filter(item => item.email.includes(keyWord));
            dispatch(setUserList(cloneListUser));
        }
        else {
            getUsers(pageTable);
        }
    }, 500)

    const getUsersExport = (e, done) => {
        let userListExport = [];
        if (userList && userList.length > 0) {
            userListExport.push(["id", "email", "first_name", "last_name"]);
            userList.forEach(item => {
                let userCustom = [item.id, item.email, item.first_name, item.last_name];
                userListExport.push(userCustom);
            });
            setDataExport(userListExport);
            done();
        }
    }

    const handleImportCSV = (e) => {
        if (e.target && e.target.files && e.target.files[0]) {
            let file = e.target.files[0];
            if (file.type !== "text/csv") {
                toast.error("Only accept CSV file...");
                return;
            }
            Papa.parse(file, {
                complete: function (results) {
                    const dataCsv = results.data;
                    if (dataCsv.length > 0) {
                        if (dataCsv[0] && dataCsv[0].length === 4) {
                            if (dataCsv[0][0] !== "id" ||
                                dataCsv[0][1] !== "email" ||
                                dataCsv[0][2] !== "first_name" ||
                                dataCsv[0][3] !== "last_name") {
                                toast.error("Wrong fomat header CSV file...");
                            }
                            else {
                                let result = [];
                                dataCsv.forEach((item, index) => {
                                    if (index > 0 && item.length === 4) {
                                        let rowData = {
                                            id: item[0],
                                            email: item[1],
                                            first_name: item[2],
                                            last_name: item[3]
                                        }
                                        result.push(rowData);
                                    }
                                })
                                dispatch(setUserList(result));
                            }
                        }
                        else {
                            toast.error("Wrong fomat CSV file...")
                        }
                    }
                    else {
                        toast.error("Not found data to CSV file...")
                    }
                }
            });
        }
    }

    return (
        <>
            <div className="my-3 d-sm-flex justify-content-between align-items-center">
                <span><b>List Users:</b></span>
                <div className="d-flex gap-2 mt-2 mt-sm-0">
                    <button className="btn btn-danger">
                        <label htmlFor="import-file">
                            <i className="fa fa-file-import"></i>
                            <span className="ms-2">Import</span>
                        </label>
                        <input type="file" id="import-file" hidden
                            onChange={e => handleImportCSV(e)}
                        />
                    </button>
                    <CSVLink
                        filename={"users.csv"}
                        className="btn btn-primary"
                        data={dataExport}
                        asyncOnClick={true}
                        onClick={getUsersExport}
                    >
                        <i className="fa fa-file-arrow-down"></i>
                        <span className="ms-2">Export</span>
                    </CSVLink>
                    <button className="btn btn-success"
                        onClick={() => setIsShowModalAtNew(true)}
                    >
                        <i className="fa-solid fa-circle-plus"></i>
                        <span className="ms-2">Add new</span>
                    </button>
                </div>
            </div>
            <div className="col-12 col-sm-4 my-3">
                <input type="text" className="form-control" placeholder="Search user by email..."
                    onChange={e => handleOnChange(e)}
                />
            </div>
            <div className="customize-table">
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>
                                <div className="sort-header">
                                    <span>ID</span>
                                    <span>
                                        <i className="fa-solid fa-arrow-down-long"
                                            onClick={() => handleSort("desc", "id")}
                                        ></i>
                                        <i className="fa-solid fa-arrow-up-long"
                                            onClick={() => handleSort("asc", "id")}
                                        ></i>
                                    </span>
                                </div>
                            </th>
                            <th>Email</th>
                            <th>
                                <div className="sort-header">
                                    <span>First Name</span>
                                    <span>
                                        <i className="fa-solid fa-arrow-down-long"
                                            onClick={() => handleSort("desc", "first_name")}
                                        ></i>
                                        <i className="fa-solid fa-arrow-up-long"
                                            onClick={() => handleSort("asc", "first_name")}
                                        ></i>
                                    </span>
                                </div>
                            </th>
                            <th>Last Name</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {userList && userList.length > 0 &&
                            userList.map((item, index) => {
                                return (
                                    <tr key={item.id}>
                                        <td>{item.id}</td>
                                        <td>{item.email}</td>
                                        <td>{item.first_name}</td>
                                        <td>{item.last_name}</td>
                                        <td>
                                            <button className="btn btn-warning mx-3"
                                                onClick={() => handleClickEdit(item)}
                                            >Edit</button>
                                            <button className="btn btn-danger"
                                                onClick={() => handleClickDelete(item)}
                                            >Delete</button>
                                        </td>
                                    </tr>
                                )
                            })}
                    </tbody>
                </Table>
            </div>


            <ReactPaginate
                breakLabel="..."
                nextLabel="next >"
                onPageChange={handlePageClick}
                pageRangeDisplayed={5}
                pageCount={totalPages}
                previousLabel="< previous"
                renderOnZeroPageCount={null}
                pageClassName="page-item"
                pageLinkClassName="page-link"
                previousClassName="page-item"
                previousLinkClassName="page-link"
                nextClassName="page-item"
                nextLinkClassName="page-link"
                breakClassName="page-item"
                breakLinkClassName="page-link"
                containerClassName="pagination justify-content-center"
                activeClassName="active"
            />
            <ModalAddNew
                show={isShowModalAddNew}
                handleClose={() => setIsShowModalAtNew(false)}
            />
            <ModalEditUser
                show={isShowModalEditUser}
                handleClose={() => setIsShowModalEditUser(false)}
                dataUserEdit={dataUserEdit}
            />
            <ModalDeleteUser
                show={isShowModalDeleteUser}
                handleClose={() => setIsShowModalDeleteUser(false)}
                dataUserDelete={dataUserDelete}
            />
        </>
    );
}

export default TableUser;