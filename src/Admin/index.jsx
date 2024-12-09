import { useEffect, useState, useRef } from "react";
import Header from "../Header";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import SearchBar from "../SearchBar/index.jsx";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ShowImage from "../Show Image/index.jsx";
import GetAllImages from "./GetAllImages/getAllImages.jsx";
import {
  InputElement,
  CenteredContainer,
  ButtonElement,
  FormContainer,
  LabelElement,
} from "../../style.js";

const Admin = () => {
  const [file, setFile] = useState(null);
  const [filePath, setFilePath] = useState("");
  const [serialNumber, setSerialNumber] = useState("");
  const fileInputRef = useRef(null);

  const navigate = useNavigate();
  const jwtToken = Cookies.get("jwt_token");

  useEffect(() => {
    if (!jwtToken) navigate("/login");
  }, [jwtToken]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file || !serialNumber)
      return toast.warn("Please provide both an ID and a file.");

    const formData = new FormData();
    formData.append("file", file);
    formData.append("serialNumber", serialNumber);

    try {
      const res = await fetch("http://localhost:3000/file/upload", {
        method: "POST",
        headers: { Authorization: `Bearer ${jwtToken}` },
        body: formData,
      });
      const result = await res.json();
      if (res.ok) {
        toast.success("File uploaded successfully!");
        fileInputRef.current.value = "";
        setSerialNumber("");
        setFile(null);
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred during file upload.");
    }
  };

  const assignFilePath = (value) => {
    console.log("Assigned File Path:", value);
    setFilePath(value);
  };

  const setAlertMsg = (result, msg) => {
    if (result === "success") {
      toast.success(msg);
    } else {
      toast.error(msg);
    }
  };

  return (
    <>
      <Header />
      <div style={{ display: "flex", flexDirection: "column" }}>
        <CenteredContainer>
          <FormContainer onSubmit={handleSubmit}>
            <LabelElement>CERTIFICATE & PRODUCT SERIAL NUMBER</LabelElement>
            <InputElement
              onChange={(e) => setSerialNumber(e.target.value)}
              placeholder="SERIAL NUMBER"
              value={serialNumber}
            />
            <LabelElement>CERTIFICATE</LabelElement>
            <InputElement
              onChange={(e) => setFile(e.target.files[0])}
              type="file"
              ref={fileInputRef}
            />
            <CenteredContainer>
              <ButtonElement backgroundcolor="#DD0023" type="submit">
                Add
              </ButtonElement>
            </CenteredContainer>
          </FormContainer>
          <ToastContainer
            position="top-center"
            style={{
              top: "50%",
              zIndex: 9999,
            }}
          />
          <SearchBar
            setAlertMsg={setAlertMsg}
            assignFilePath={assignFilePath}
          />
        </CenteredContainer>
        {filePath && (
          <ShowImage filePath={filePath} assignFilePath={assignFilePath} />
        )}
        <GetAllImages setAlertMsg={setAlertMsg} />
      </div>
    </>
  );
};

export default Admin;
