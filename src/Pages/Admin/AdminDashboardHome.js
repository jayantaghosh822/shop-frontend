import React from 'react';
import { useEffect } from 'react';
import AdminSidebar from "../../Components/Admin/AdminSidebar";
import useScript from "../../Hooks/jsLoader"; 
const AdminDashboardHome = ()=>{
    // useScript([
    //     "/admin-assets/js/soft-ui-dashboard.min.js?v=1.1.0",
    //  ]);
    //  useEffect(() => {
    //     // Dynamically load JS scripts after the component mounts
    //     const loadScripts = () => {
    //       const scriptSources = [

    //         "/admin-assets/js/soft-ui-dashboard.min.js?v=1.1.0",
    //         // "/admin-assets/js/sidebrScroll.js",
    //       ];
    
    //       scriptSources.forEach((src) => {
    //         const script = document.createElement("script");
    //         script.src = src;
    //         script.async = true;
    //         script.onload = () => {
    //           console.log(`${src} loaded successfully.`);
    //         };
    //         script.onerror = () => {
    //           console.error(`Error loading ${src}`);
    //         };
    //         document.body.appendChild(script);
    //       });
    //     };
    
    //     // Call the function to load scripts after component mounts
    //     loadScripts();
    
    //     // Clean up by removing the scripts when the component unmounts
    //     return () => {
    //       const scripts = document.querySelectorAll("script");
    //       scripts.forEach((script) => script.remove());
    //     };
    //   }, []); // Empty dependency array ensures this only runs once after initial render
    return(
       
        <>
        <AdminSidebar />
        <main className="main-content position-relative max-height-vh-100 h-100 border-radius-lg ">
            {/* Navbar */}
            <nav className="navbar navbar-main navbar-expand-lg px-0 mx-4 shadow-none border-radius-xl" id="navbarBlur" navbar-scroll="true">
            <div className="container-fluid py-1 px-3">
                <nav aria-label="breadcrumb">
                <ol className="breadcrumb bg-transparent mb-0 pb-0 pt-1 px-0 me-sm-6 me-5">
                    <li className="breadcrumb-item text-sm"><a className="opacity-5 text-dark" href="javascript:;">Pages</a></li>
                    <li className="breadcrumb-item text-sm text-dark active" aria-current="page">Dashboard</li>
                </ol>
                <h6 className="font-weight-bolder mb-0">Dashboard</h6>
                </nav>
                <div className="collapse navbar-collapse mt-sm-0 mt-2 me-md-0 me-sm-4" id="navbar">
                <div className="ms-md-auto pe-md-3 d-flex align-items-center">
                    <div className="input-group">
                    <span className="input-group-text text-body"><i className="fas fa-search" aria-hidden="true" /></span>
                    <input type="text" className="form-control" placeholder="Type here..." />
                    </div>
                </div>
                <ul className="navbar-nav  justify-content-end">
                    <li className="nav-item d-flex align-items-center">
                    <a className="btn btn-outline-primary btn-sm mb-0 me-3" target="_blank" href="https://www.creative-tim.com/builder?ref=navbar-soft-ui-dashboard">Online Builder</a>
                    </li>
                    <li className="nav-item d-flex align-items-center">
                    <a href="javascript:;" className="nav-link text-body font-weight-bold px-0">
                        <i className="fa fa-user me-sm-1" />
                        <span className="d-sm-inline d-none">Sign In</span>
                    </a>
                    </li>
                    <li className="nav-item d-xl-none ps-3 d-flex align-items-center">
                    <a href="javascript:;" className="nav-link text-body p-0" id="iconNavbarSidenav">
                        <div className="sidenav-toggler-inner">
                        <i className="sidenav-toggler-line" />
                        <i className="sidenav-toggler-line" />
                        <i className="sidenav-toggler-line" />
                        </div>
                    </a>
                    </li>
                    <li className="nav-item px-3 d-flex align-items-center">
                    <a href="javascript:;" className="nav-link text-body p-0">
                        <i className="fa fa-cog fixed-plugin-button-nav cursor-pointer" />
                    </a>
                    </li>
                    <li className="nav-item dropdown pe-2 d-flex align-items-center">
                    <a href="javascript:;" className="nav-link text-body p-0" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
                        <i className="fa fa-bell cursor-pointer" />
                    </a>
                    <ul className="dropdown-menu  dropdown-menu-end  px-2 py-3 me-sm-n4" aria-labelledby="dropdownMenuButton">
                        <li className="mb-2">
                        <a className="dropdown-item border-radius-md" href="javascript:;">
                            <div className="d-flex py-1">
                            <div className="my-auto">
                                <img src="../admin-assets/img/team-2.jpg" className="avatar avatar-sm  me-3 " />
                            </div>
                            <div className="d-flex flex-column justify-content-center">
                                <h6 className="text-sm font-weight-normal mb-1">
                                <span className="font-weight-bold">New message</span> from Laur
                                </h6>
                                <p className="text-xs text-secondary mb-0 ">
                                <i className="fa fa-clock me-1" />
                                13 minutes ago
                                </p>
                            </div>
                            </div>
                        </a>
                        </li>
                        <li className="mb-2">
                        <a className="dropdown-item border-radius-md" href="javascript:;">
                            <div className="d-flex py-1">
                            <div className="my-auto">
                                <img src="../admin-assets/img/small-logos/logo-spotify.svg" className="avatar avatar-sm bg-gradient-dark  me-3 " />
                            </div>
                            <div className="d-flex flex-column justify-content-center">
                                <h6 className="text-sm font-weight-normal mb-1">
                                <span className="font-weight-bold">New album</span> by Travis Scott
                                </h6>
                                <p className="text-xs text-secondary mb-0 ">
                                <i className="fa fa-clock me-1" />
                                1 day
                                </p>
                            </div>
                            </div>
                        </a>
                        </li>
                        <li>
                        <a className="dropdown-item border-radius-md" href="javascript:;">
                            <div className="d-flex py-1">
                            <div className="avatar avatar-sm bg-gradient-secondary  me-3  my-auto">
                                <svg width="12px" height="12px" viewBox="0 0 43 36" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                                <title>credit-card</title>
                                <g stroke="none" strokeWidth={1} fill="none" fillRule="evenodd">
                                    <g transform="translate(-2169.000000, -745.000000)" fill="#FFFFFF" fillRule="nonzero">
                                    <g transform="translate(1716.000000, 291.000000)">
                                        <g transform="translate(453.000000, 454.000000)">
                                        <path className="color-background" d="M43,10.7482083 L43,3.58333333 C43,1.60354167 41.3964583,0 39.4166667,0 L3.58333333,0 C1.60354167,0 0,1.60354167 0,3.58333333 L0,10.7482083 L43,10.7482083 Z" opacity="0.593633743" />
                                        <path className="color-background" d="M0,16.125 L0,32.25 C0,34.2297917 1.60354167,35.8333333 3.58333333,35.8333333 L39.4166667,35.8333333 C41.3964583,35.8333333 43,34.2297917 43,32.25 L43,16.125 L0,16.125 Z M19.7083333,26.875 L7.16666667,26.875 L7.16666667,23.2916667 L19.7083333,23.2916667 L19.7083333,26.875 Z M35.8333333,26.875 L28.6666667,26.875 L28.6666667,23.2916667 L35.8333333,23.2916667 L35.8333333,26.875 Z" />
                                        </g>
                                    </g>
                                    </g>
                                </g>
                                </svg>
                            </div>
                            <div className="d-flex flex-column justify-content-center">
                                <h6 className="text-sm font-weight-normal mb-1">
                                Payment successfully completed
                                </h6>
                                <p className="text-xs text-secondary mb-0 ">
                                <i className="fa fa-clock me-1" />
                                2 days
                                </p>
                            </div>
                            </div>
                        </a>
                        </li>
                    </ul>
                    </li>
                </ul>
                </div>
            </div>
            </nav>
            {/* End Navbar */}
            <div className="container-fluid py-4">
            <div className="row">
                <div className="col-lg-6 col-12">
                <div className="row">
                    <div className="col-lg-6 col-md-6 col-12">
                    <div className="card">
                        <span className="mask bg-primary opacity-10 border-radius-lg" />
                        <div className="card-body p-3 position-relative">
                        <div className="row">
                            <div className="col-8 text-start">
                            <div className="icon icon-shape bg-white shadow text-center border-radius-2xl">
                                <i className="ni ni-circle-08 text-dark text-gradient text-lg opacity-10" aria-hidden="true" />
                            </div>
                            <h5 className="text-white font-weight-bolder mb-0 mt-3">
                                1600
                            </h5>
                            <span className="text-white text-sm">Users Active</span>
                            </div>
                            <div className="col-4">
                            <div className="dropdown text-end mb-6">
                                <a href="javascript:;" className="cursor-pointer" id="dropdownUsers1" data-bs-toggle="dropdown" aria-expanded="false">
                                <i className="fa fa-ellipsis-h text-white" />
                                </a>
                                <ul className="dropdown-menu px-2 py-3" aria-labelledby="dropdownUsers1">
                                <li><a className="dropdown-item border-radius-md" href="javascript:;">Action</a></li>
                                <li><a className="dropdown-item border-radius-md" href="javascript:;">Another action</a></li>
                                <li><a className="dropdown-item border-radius-md" href="javascript:;">Something else here</a></li>
                                </ul>
                            </div>
                            <p className="text-white text-sm text-end font-weight-bolder mt-auto mb-0">+55%</p>
                            </div>
                        </div>
                        </div>
                    </div>
                    </div>
                    <div className="col-lg-6 col-md-6 col-12 mt-4 mt-md-0">
                    <div className="card">
                        <span className="mask bg-dark opacity-10 border-radius-lg" />
                        <div className="card-body p-3 position-relative">
                        <div className="row">
                            <div className="col-8 text-start">
                            <div className="icon icon-shape bg-white shadow text-center border-radius-2xl">
                                <i className="ni ni-active-40 text-dark text-gradient text-lg opacity-10" aria-hidden="true" />
                            </div>
                            <h5 className="text-white font-weight-bolder mb-0 mt-3">
                                357
                            </h5>
                            <span className="text-white text-sm">Click Events</span>
                            </div>
                            <div className="col-4">
                            <div className="dropstart text-end mb-6">
                                <a href="javascript:;" className="cursor-pointer" id="dropdownUsers2" data-bs-toggle="dropdown" aria-expanded="false">
                                <i className="fa fa-ellipsis-h text-white" />
                                </a>
                                <ul className="dropdown-menu px-2 py-3" aria-labelledby="dropdownUsers2">
                                <li><a className="dropdown-item border-radius-md" href="javascript:;">Action</a></li>
                                <li><a className="dropdown-item border-radius-md" href="javascript:;">Another action</a></li>
                                <li><a className="dropdown-item border-radius-md" href="javascript:;">Something else here</a></li>
                                </ul>
                            </div>
                            <p className="text-white text-sm text-end font-weight-bolder mt-auto mb-0">+124%</p>
                            </div>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
                <div className="row mt-4">
                    <div className="col-lg-6 col-md-6 col-12">
                    <div className="card">
                        <span className="mask bg-dark opacity-10 border-radius-lg" />
                        <div className="card-body p-3 position-relative">
                        <div className="row">
                            <div className="col-8 text-start">
                            <div className="icon icon-shape bg-white shadow text-center border-radius-2xl">
                                <i className="ni ni-cart text-dark text-gradient text-lg opacity-10" aria-hidden="true" />
                            </div>
                            <h5 className="text-white font-weight-bolder mb-0 mt-3">
                                2300
                            </h5>
                            <span className="text-white text-sm">Purchases</span>
                            </div>
                            <div className="col-4">
                            <div className="dropdown text-end mb-6">
                                <a href="javascript:;" className="cursor-pointer" id="dropdownUsers3" data-bs-toggle="dropdown" aria-expanded="false">
                                <i className="fa fa-ellipsis-h text-white" />
                                </a>
                                <ul className="dropdown-menu px-2 py-3" aria-labelledby="dropdownUsers3">
                                <li><a className="dropdown-item border-radius-md" href="javascript:;">Action</a></li>
                                <li><a className="dropdown-item border-radius-md" href="javascript:;">Another action</a></li>
                                <li><a className="dropdown-item border-radius-md" href="javascript:;">Something else here</a></li>
                                </ul>
                            </div>
                            <p className="text-white text-sm text-end font-weight-bolder mt-auto mb-0">+15%</p>
                            </div>
                        </div>
                        </div>
                    </div>
                    </div>
                    <div className="col-lg-6 col-md-6 col-12 mt-4 mt-md-0">
                    <div className="card">
                        <span className="mask bg-dark opacity-10 border-radius-lg" />
                        <div className="card-body p-3 position-relative">
                        <div className="row">
                            <div className="col-8 text-start">
                            <div className="icon icon-shape bg-white shadow text-center border-radius-2xl">
                                <i className="ni ni-like-2 text-dark text-gradient text-lg opacity-10" aria-hidden="true" />
                            </div>
                            <h5 className="text-white font-weight-bolder mb-0 mt-3">
                                940
                            </h5>
                            <span className="text-white text-sm">Likes</span>
                            </div>
                            <div className="col-4">
                            <div className="dropstart text-end mb-6">
                                <a href="javascript:;" className="cursor-pointer" id="dropdownUsers4" data-bs-toggle="dropdown" aria-expanded="false">
                                <i className="fa fa-ellipsis-h text-white" />
                                </a>
                                <ul className="dropdown-menu px-2 py-3" aria-labelledby="dropdownUsers4">
                                <li><a className="dropdown-item border-radius-md" href="javascript:;">Action</a></li>
                                <li><a className="dropdown-item border-radius-md" href="javascript:;">Another action</a></li>
                                <li><a className="dropdown-item border-radius-md" href="javascript:;">Something else here</a></li>
                                </ul>
                            </div>
                            <p className="text-white text-sm text-end font-weight-bolder mt-auto mb-0">+90%</p>
                            </div>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
                <div className="col-lg-6 col-12 mt-4 mt-lg-0">
                <div className="card shadow h-100">
                    <div className="card-header pb-0 p-3">
                    <h6 className="mb-0">Reviews</h6>
                    </div>
                    <div className="card-body pb-0 p-3">
                    <ul className="list-group">
                        <li className="list-group-item border-0 d-flex align-items-center px-0 mb-0">
                        <div className="w-100">
                            <div className="d-flex mb-2">
                            <span className="me-2 text-sm font-weight-bold text-dark">Positive Reviews</span>
                            <span className="ms-auto text-sm font-weight-bold">80%</span>
                            </div>
                            <div>
                            <div className="progress progress-md">
                                <div className="progress-bar bg-primary w-80" role="progressbar" aria-valuenow={60} aria-valuemin={0} aria-valuemax={100} />
                            </div>
                            </div>
                        </div>
                        </li>
                        <li className="list-group-item border-0 d-flex align-items-center px-0 mb-2">
                        <div className="w-100">
                            <div className="d-flex mb-2">
                            <span className="me-2 text-sm font-weight-bold text-dark">Neutral Reviews</span>
                            <span className="ms-auto text-sm font-weight-bold">17%</span>
                            </div>
                            <div>
                            <div className="progress progress-md">
                                <div className="progress-bar bg-primary w-10" role="progressbar" aria-valuenow={10} aria-valuemin={0} aria-valuemax={100} />
                            </div>
                            </div>
                        </div>
                        </li>
                        <li className="list-group-item border-0 d-flex align-items-center px-0 mb-2">
                        <div className="w-100">
                            <div className="d-flex mb-2">
                            <span className="me-2 text-sm font-weight-bold text-dark">Negative Reviews</span>
                            <span className="ms-auto text-sm font-weight-bold">3%</span>
                            </div>
                            <div>
                            <div className="progress progress-md">
                                <div className="progress-bar bg-primary w-5" role="progressbar" aria-valuenow={5} aria-valuemin={0} aria-valuemax={100} />
                            </div>
                            </div>
                        </div>
                        </li>
                    </ul>
                    </div>
                    <div className="card-footer pt-0 p-3 d-flex align-items-center">
                    <div className="w-60">
                        <p className="text-sm">
                        More than <b>1,500,000</b> developers used Creative Tim's products and over <b>700,000</b> projects were created.
                        </p>
                    </div>
                    <div className="w-40 text-end">
                        <a className="btn btn-dark mb-0 text-end" href="javascript:;">View all reviews</a>
                    </div>
                    </div>
                </div>
                </div>
            </div>
            <div className="row my-4">
                <div className="col-lg-8 col-md-6 mb-md-0 mb-4">
                <div className="card">
                    <div className="card-header pb-0">
                    <div className="row">
                        <div className="col-lg-6 col-7">
                        <h6>Projects</h6>
                        <p className="text-sm mb-0">
                            <i className="fa fa-check text-info" aria-hidden="true" />
                            <span className="font-weight-bold ms-1">30 done</span> this month
                        </p>
                        </div>
                        <div className="col-lg-6 col-5 my-auto text-end">
                        <div className="dropdown float-lg-end pe-4">
                            <a className="cursor-pointer" id="dropdownTable" data-bs-toggle="dropdown" aria-expanded="false">
                            <i className="fa fa-ellipsis-v text-secondary" />
                            </a>
                            <ul className="dropdown-menu px-2 py-3 ms-sm-n4 ms-n5" aria-labelledby="dropdownTable">
                            <li><a className="dropdown-item border-radius-md" href="javascript:;">Action</a></li>
                            <li><a className="dropdown-item border-radius-md" href="javascript:;">Another action</a></li>
                            <li><a className="dropdown-item border-radius-md" href="javascript:;">Something else here</a></li>
                            </ul>
                        </div>
                        </div>
                    </div>
                    </div>
                    <div className="card-body px-0 pb-2">
                    <div className="table-responsive">
                        <table className="table align-items-center mb-0">
                        <thead>
                            <tr>
                            <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Companies</th>
                            <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">Members</th>
                            <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Budget</th>
                            <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Completion</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                            <td>
                                <div className="d-flex px-2 py-1">
                                <div>
                                    <img src="../admin-assets/img/small-logos/logo-xd.svg" className="avatar avatar-sm me-3" alt="xd" />
                                </div>
                                <div className="d-flex flex-column justify-content-center">
                                    <h6 className="mb-0 text-sm">Soft UI XD Version</h6>
                                </div>
                                </div>
                            </td>
                            <td>
                                <div className="avatar-group mt-2">
                                <a href="javascript:;" className="avatar avatar-xs rounded-circle" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Ryan Tompson">
                                    <img src="../admin-assets/img/team-1.jpg" alt="team1" />
                                </a>
                                <a href="javascript:;" className="avatar avatar-xs rounded-circle" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Romina Hadid">
                                    <img src="../admin-assets/img/team-2.jpg" alt="team2" />
                                </a>
                                <a href="javascript:;" className="avatar avatar-xs rounded-circle" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Alexander Smith">
                                    <img src="../admin-assets/img/team-3.jpg" alt="team3" />
                                </a>
                                <a href="javascript:;" className="avatar avatar-xs rounded-circle" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Jessica Doe">
                                    <img src="../admin-assets/img/team-4.jpg" alt="team4" />
                                </a>
                                </div>
                            </td>
                            <td className="align-middle text-center text-sm">
                                <span className="text-xs font-weight-bold"> $14,000 </span>
                            </td>
                            <td className="align-middle">
                                <div className="progress-wrapper w-75 mx-auto">
                                <div className="progress-info">
                                    <div className="progress-percentage">
                                    <span className="text-xs font-weight-bold">60%</span>
                                    </div>
                                </div>
                                <div className="progress">
                                    <div className="progress-bar bg-gradient-info w-60" role="progressbar" aria-valuenow={60} aria-valuemin={0} aria-valuemax={100} />
                                </div>
                                </div>
                            </td>
                            </tr>
                            <tr>
                            <td>
                                <div className="d-flex px-2 py-1">
                                <div>
                                    <img src="../admin-assets/img/small-logos/logo-atlassian.svg" className="avatar avatar-sm me-3" alt="atlassian" />
                                </div>
                                <div className="d-flex flex-column justify-content-center">
                                    <h6 className="mb-0 text-sm">Add Progress Track</h6>
                                </div>
                                </div>
                            </td>
                            <td>
                                <div className="avatar-group mt-2">
                                <a href="javascript:;" className="avatar avatar-xs rounded-circle" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Romina Hadid">
                                    <img src="../admin-assets/img/team-2.jpg" alt="team5" />
                                </a>
                                <a href="javascript:;" className="avatar avatar-xs rounded-circle" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Jessica Doe">
                                    <img src="../admin-assets/img/team-4.jpg" alt="team6" />
                                </a>
                                </div>
                            </td>
                            <td className="align-middle text-center text-sm">
                                <span className="text-xs font-weight-bold"> $3,000 </span>
                            </td>
                            <td className="align-middle">
                                <div className="progress-wrapper w-75 mx-auto">
                                <div className="progress-info">
                                    <div className="progress-percentage">
                                    <span className="text-xs font-weight-bold">10%</span>
                                    </div>
                                </div>
                                <div className="progress">
                                    <div className="progress-bar bg-gradient-info w-10" role="progressbar" aria-valuenow={10} aria-valuemin={0} aria-valuemax={100} />
                                </div>
                                </div>
                            </td>
                            </tr>
                            <tr>
                            <td>
                                <div className="d-flex px-2 py-1">
                                <div>
                                    <img src="../admin-assets/img/small-logos/logo-slack.svg" className="avatar avatar-sm me-3" alt="team7" />
                                </div>
                                <div className="d-flex flex-column justify-content-center">
                                    <h6 className="mb-0 text-sm">Fix Platform Errors</h6>
                                </div>
                                </div>
                            </td>
                            <td>
                                <div className="avatar-group mt-2">
                                <a href="javascript:;" className="avatar avatar-xs rounded-circle" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Romina Hadid">
                                    <img src="../admin-assets/img/team-3.jpg" alt="team8" />
                                </a>
                                <a href="javascript:;" className="avatar avatar-xs rounded-circle" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Jessica Doe">
                                    <img src="../admin-assets/img/team-1.jpg" alt="team9" />
                                </a>
                                </div>
                            </td>
                            <td className="align-middle text-center text-sm">
                                <span className="text-xs font-weight-bold"> Not set </span>
                            </td>
                            <td className="align-middle">
                                <div className="progress-wrapper w-75 mx-auto">
                                <div className="progress-info">
                                    <div className="progress-percentage">
                                    <span className="text-xs font-weight-bold">100%</span>
                                    </div>
                                </div>
                                <div className="progress">
                                    <div className="progress-bar bg-gradient-success w-100" role="progressbar" aria-valuenow={100} aria-valuemin={0} aria-valuemax={100} />
                                </div>
                                </div>
                            </td>
                            </tr>
                            <tr>
                            <td>
                                <div className="d-flex px-2 py-1">
                                <div>
                                    <img src="../admin-assets/img/small-logos/logo-spotify.svg" className="avatar avatar-sm me-3" alt="spotify" />
                                </div>
                                <div className="d-flex flex-column justify-content-center">
                                    <h6 className="mb-0 text-sm">Launch our Mobile App</h6>
                                </div>
                                </div>
                            </td>
                            <td>
                                <div className="avatar-group mt-2">
                                <a href="javascript:;" className="avatar avatar-xs rounded-circle" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Ryan Tompson">
                                    <img src="../admin-assets/img/team-4.jpg" alt="user1" />
                                </a>
                                <a href="javascript:;" className="avatar avatar-xs rounded-circle" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Romina Hadid">
                                    <img src="../admin-assets/img/team-3.jpg" alt="user2" />
                                </a>
                                <a href="javascript:;" className="avatar avatar-xs rounded-circle" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Alexander Smith">
                                    <img src="../admin-assets/img/team-4.jpg" alt="user3" />
                                </a>
                                <a href="javascript:;" className="avatar avatar-xs rounded-circle" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Jessica Doe">
                                    <img src="../admin-assets/img/team-1.jpg" alt="user4" />
                                </a>
                                </div>
                            </td>
                            <td className="align-middle text-center text-sm">
                                <span className="text-xs font-weight-bold"> $20,500 </span>
                            </td>
                            <td className="align-middle">
                                <div className="progress-wrapper w-75 mx-auto">
                                <div className="progress-info">
                                    <div className="progress-percentage">
                                    <span className="text-xs font-weight-bold">100%</span>
                                    </div>
                                </div>
                                <div className="progress">
                                    <div className="progress-bar bg-gradient-success w-100" role="progressbar" aria-valuenow={100} aria-valuemin={0} aria-valuemax={100} />
                                </div>
                                </div>
                            </td>
                            </tr>
                            <tr>
                            <td>
                                <div className="d-flex px-2 py-1">
                                <div>
                                    <img src="../admin-assets/img/small-logos/logo-jira.svg" className="avatar avatar-sm me-3" alt="jira" />
                                </div>
                                <div className="d-flex flex-column justify-content-center">
                                    <h6 className="mb-0 text-sm">Add the New Pricing Page</h6>
                                </div>
                                </div>
                            </td>
                            <td>
                                <div className="avatar-group mt-2">
                                <a href="javascript:;" className="avatar avatar-xs rounded-circle" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Ryan Tompson">
                                    <img src="../admin-assets/img/team-4.jpg" alt="user5" />
                                </a>
                                </div>
                            </td>
                            <td className="align-middle text-center text-sm">
                                <span className="text-xs font-weight-bold"> $500 </span>
                            </td>
                            <td className="align-middle">
                                <div className="progress-wrapper w-75 mx-auto">
                                <div className="progress-info">
                                    <div className="progress-percentage">
                                    <span className="text-xs font-weight-bold">25%</span>
                                    </div>
                                </div>
                                <div className="progress">
                                    <div className="progress-bar bg-gradient-info w-25" role="progressbar" aria-valuenow={25} aria-valuemin={0} aria-valuemax={25} />
                                </div>
                                </div>
                            </td>
                            </tr>
                            <tr>
                            <td>
                                <div className="d-flex px-2 py-1">
                                <div>
                                    <img src="../admin-assets/img/small-logos/logo-invision.svg" className="avatar avatar-sm me-3" alt="invision" />
                                </div>
                                <div className="d-flex flex-column justify-content-center">
                                    <h6 className="mb-0 text-sm">Redesign New Online Shop</h6>
                                </div>
                                </div>
                            </td>
                            <td>
                                <div className="avatar-group mt-2">
                                <a href="javascript:;" className="avatar avatar-xs rounded-circle" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Ryan Tompson">
                                    <img src="../admin-assets/img/team-1.jpg" alt="user6" />
                                </a>
                                <a href="javascript:;" className="avatar avatar-xs rounded-circle" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Jessica Doe">
                                    <img src="../admin-assets/img/team-4.jpg" alt="user7" />
                                </a>
                                </div>
                            </td>
                            <td className="align-middle text-center text-sm">
                                <span className="text-xs font-weight-bold"> $2,000 </span>
                            </td>
                            <td className="align-middle">
                                <div className="progress-wrapper w-75 mx-auto">
                                <div className="progress-info">
                                    <div className="progress-percentage">
                                    <span className="text-xs font-weight-bold">40%</span>
                                    </div>
                                </div>
                                <div className="progress">
                                    <div className="progress-bar bg-gradient-info w-40" role="progressbar" aria-valuenow={40} aria-valuemin={0} aria-valuemax={40} />
                                </div>
                                </div>
                            </td>
                            </tr>
                        </tbody>
                        </table>
                    </div>
                    </div>
                </div>
                </div>
                <div className="col-lg-4 col-md-6">
                <div className="card h-100">
                    <div className="card-header pb-0">
                    <h6>Orders overview</h6>
                    <p className="text-sm">
                        <i className="fa fa-arrow-up text-success" aria-hidden="true" />
                        <span className="font-weight-bold">24%</span> this month
                    </p>
                    </div>
                    <div className="card-body p-3">
                    <div className="timeline timeline-one-side">
                        <div className="timeline-block mb-3">
                        <span className="timeline-step">
                            <i className="ni ni-bell-55 text-success text-gradient" />
                        </span>
                        <div className="timeline-content">
                            <h6 className="text-dark text-sm font-weight-bold mb-0">$2400, Design changes</h6>
                            <p className="text-secondary font-weight-bold text-xs mt-1 mb-0">22 DEC 7:20 PM</p>
                        </div>
                        </div>
                        <div className="timeline-block mb-3">
                        <span className="timeline-step">
                            <i className="ni ni-html5 text-danger text-gradient" />
                        </span>
                        <div className="timeline-content">
                            <h6 className="text-dark text-sm font-weight-bold mb-0">New order #1832412</h6>
                            <p className="text-secondary font-weight-bold text-xs mt-1 mb-0">21 DEC 11 PM</p>
                        </div>
                        </div>
                        <div className="timeline-block mb-3">
                        <span className="timeline-step">
                            <i className="ni ni-cart text-info text-gradient" />
                        </span>
                        <div className="timeline-content">
                            <h6 className="text-dark text-sm font-weight-bold mb-0">Server payments for April</h6>
                            <p className="text-secondary font-weight-bold text-xs mt-1 mb-0">21 DEC 9:34 PM</p>
                        </div>
                        </div>
                        <div className="timeline-block mb-3">
                        <span className="timeline-step">
                            <i className="ni ni-credit-card text-warning text-gradient" />
                        </span>
                        <div className="timeline-content">
                            <h6 className="text-dark text-sm font-weight-bold mb-0">New card added for order #4395133</h6>
                            <p className="text-secondary font-weight-bold text-xs mt-1 mb-0">20 DEC 2:20 AM</p>
                        </div>
                        </div>
                        <div className="timeline-block mb-3">
                        <span className="timeline-step">
                            <i className="ni ni-key-25 text-primary text-gradient" />
                        </span>
                        <div className="timeline-content">
                            <h6 className="text-dark text-sm font-weight-bold mb-0">Unlock packages for development</h6>
                            <p className="text-secondary font-weight-bold text-xs mt-1 mb-0">18 DEC 4:54 AM</p>
                        </div>
                        </div>
                        <div className="timeline-block">
                        <span className="timeline-step">
                            <i className="ni ni-money-coins text-dark text-gradient" />
                        </span>
                        <div className="timeline-content">
                            <h6 className="text-dark text-sm font-weight-bold mb-0">New order #9583120</h6>
                            <p className="text-secondary font-weight-bold text-xs mt-1 mb-0">17 DEC</p>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
            </div>
            
            <footer class="footer pt-3  ">
                <div class="container-fluid">
                <div class="row align-items-center justify-content-lg-between">
                    <div class="col-lg-6 mb-lg-0 mb-4">
                    <div class="copyright text-center text-sm text-muted text-lg-start">
                        © <script>
                        document.write(new Date().getFullYear())
                        </script>2025,
                        made with <i class="fa fa-heart"></i> by
                        <a href="https://www.creative-tim.com" class="font-weight-bold" target="_blank">Creative Tim</a>
                        for a better web.
                    </div>
                    </div>
                    <div class="col-lg-6">
                    <ul class="nav nav-footer justify-content-center justify-content-lg-end">
                        <li class="nav-item">
                        <a href="https://www.creative-tim.com" class="nav-link text-muted" target="_blank">Creative Tim</a>
                        </li>
                        <li class="nav-item">
                        <a href="https://www.creative-tim.com/presentation" class="nav-link text-muted" target="_blank">About Us</a>
                        </li>
                        <li class="nav-item">
                        <a href="https://www.creative-tim.com/blog" class="nav-link text-muted" target="_blank">Blog</a>
                        </li>
                        <li class="nav-item">
                        <a href="https://www.creative-tim.com/license" class="nav-link pe-0 text-muted" target="_blank">License</a>
                        </li>
                    </ul>
                    </div>
                </div>
                </div>
            </footer>
            </div>
        </main>
        </>
        
    )
}
export default AdminDashboardHome;