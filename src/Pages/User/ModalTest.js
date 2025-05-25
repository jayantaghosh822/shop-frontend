import React, { useState } from 'react';
// import { Modal, Button } from 'react-bootstrap';
// import Layout from '../../Layouts/User/Layout';
import { useSelector } from "react-redux";
import useScript from "../../Hooks/jsLoader";
const MyModal = ()=> {
  // const [show, setShow] = useState(false);
  useScript([
     "/assets/js/main.js",
  ]);
  // const handleClose = () => setShow(false);
  // const handleShow = () => setShow(true);
  console.log('modal');
  const authuser = useSelector((state) => state.auth.user);
  return (
    <>
      <div>argha</div>
    </>
  );
}

export default MyModal;
