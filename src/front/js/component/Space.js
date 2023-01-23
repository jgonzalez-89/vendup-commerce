import React, { useState, useContext, useEffect } from "react";
import { Context } from "../store/appContext";
// import { PhotoProfile } from "./photoProfile";
// import imagenUser from "../../img/imagenUser.png";

// import PropTypes from "prop-types";

const Space = () => {
  const { store, actions } = useContext(Context);

  //DATOS A EDITAR DE USUARIO
  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [tlf, setTlf] = useState("");
  const [adress, setAdress] = useState("");
  const [postcode, setPostCode] = useState("");
  const [photoProfile, setPhotoProfile] = useState("");
  const [uploadImages, setUploadImages] = useState("");

  console.log("username " + name);
  console.log(store.consultUser);
  //Funcion
  const handleSubmitEditUser = (e) => {
    actions.editUserProfile(name, lastname, email, city, tlf, adress, postcode);
  };
  useEffect(() => {
    setName(store.consultUser.name);
    setLastname(store.consultUser.lastname);
    setEmail(store.consultUser.email);
    setCity(store.consultUser.city);
    setTlf(store.consultUser.tlf);
    setAdress(store.consultUser.adress);
    setPostCode(store.consultUser.postcode);
    setPhotoProfile(store.consultUser.pictures);
  }, [store.consultUser]);
  // console.log(store.consultUser);

  return (
    <div
      className=" container border border-profile border-warning border-2 rounded-3 "
      style={{ width: "600px", height: "650px", marginTop: "80px" }}
    >
      <div className=" container p-3 d-flex  justify-content-end">
        <div className="container  d-flex " style={{ marginTop: "110px" }}>
          <div className="col-10 mt-4">
            <p className=" ms-4 fw-bold text-decoration-underline">
              Datos del usuario:
            </p>
          </div>
          <div className="col text-end">
            <PhotoProfile />
          </div>
        </div>
        <div className="row-3">
          {store.consultUser.pictures == null ? (
            <img
              src={imagenUser}
              className="card-img-top mx-auto mt-2 "
              alt="usuario"
              style={{ width: "10rem", height: "10rem", objectFit: "cover" }}
            />
          ) : (
            <img
              src={store.consultUser.pictures}
              className="ms-2 img border-2 border border-warning rounded-circle"
              style={{ width: "10rem", height: "10rem", objectFit: "cover" }}
              alt="..."
            />
          )}
        </div>
      </div>

      <div className="container">
        <ul>
          <div className="container">
            <div className="row">
              <div className="col-4">
                <p className="text-start fw-bold">Nombre:</p>{" "}
              </div>
              <div className="col mb-3">
                <p className=" text-start">{store.consultUser.name}</p>
              </div>
            </div>
          </div>
          <div className="container">
            <div className=" row">
              <div className=" col-4">
                <p className="fw-bold text-start">Apellido:</p>{" "}
              </div>
              <div className="col mb-3">
                <p className=" text-start">{store.consultUser.lastname}</p>
              </div>
            </div>
          </div>
          <div className="container">
            <div className=" row">
              <div className=" col-4">
                <p className="fw-bold text-start">Correo:</p>{" "}
              </div>
              <div className="col mb-3">
                <p className=" text-start">{store.consultUser.email}</p>
              </div>
            </div>
          </div>
          <div className="container">
            <div className=" row">
              <div className=" col-4">
                <p className="fw-bold text-start">Ciudad:</p>{" "}
              </div>
              <div className="col mb-3">
                <p className=" text-start">{store.consultUser.city}</p>
              </div>
            </div>
          </div>
          <div className="container">
            <div className=" row">
              <div className=" col-4">
                <p className="fw-bold text-start">Direccion:</p>{" "}
              </div>
              <div className="col mb-3">
                <p className=" text-start">{store.consultUser.adress}</p>
              </div>
            </div>
          </div>
          <div className="container">
            <div className=" row">
              <div className=" col-4">
                <p className="fw-bold text-start">Codigo Postal:</p>{" "}
              </div>
              <div className="col mb-3">
                <p className=" text-start">{store.consultUser.postcode}</p>
              </div>
            </div>
          </div>
          <div className="container">
            <div className=" row">
              <div className=" col-4">
                <p className="fw-bold text-start">Contacto:</p>{" "}
              </div>
              <div className="col mb-3">
                <p className=" text-start">{store.consultUser.tlf_number}</p>
              </div>
            </div>
          </div>
        </ul>
      </div>
      <div className=" container mb-3">
        <button
          type="button"
          id="examplemodal3"
          className="d-grid gap-1 col-4 mx-auto fw-bold mail-button"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal3"
          data-bs-whatever="@mdo"
        >
          Editar datos
        </button>
        {/* MODAL */}
        <div
          className="modal fade"
          id="exampleModal3"
          tabIndex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-scrollable">
            <div className="modal-content modal-content-user  border-2 border-warning">
              <div className="modal-header border-warning">
                <h5 className="modal-title fw-bold" id="exampleModalLabel">
                  Mis datos
                </h5>
                <button
                  type="button"
                  className="btn-close mail-button"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="mb-3">
                    <label
                      htmlFor="recipient-name"
                      className="col-form-label fw-bold"
                    >
                      Nombre:
                    </label>
                    <input
                      type="text"
                      className="form-control form form-control-request "
                      id="recipient-name"
                      value={name ? name : ""}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div className="mb-3">
                    <label
                      htmlFor="recipient-name"
                      className="col-form-label fw-bold"
                    >
                      Apellidos:
                    </label>
                    <input
                      type="text"
                      className="form-control form form-control-request"
                      id="recipient-name"
                      value={lastname ? lastname : ""}
                      onChange={(e) => setLastname(e.target.value)}
                    />
                  </div>
                  <div className="mb-3">
                    <label
                      htmlFor="recipient-name"
                      className="col-form-label fw-bold"
                    >
                      Ciudad:
                    </label>
                    <input
                      type="text"
                      className="form-control form form-control-request"
                      id="recipient-name"
                      value={city ? city : ""}
                      onChange={(e) => setCity(e.target.value)}
                    />
                  </div>
                  <div className="mb-3">
                    <label
                      htmlFor="recipient-name"
                      className="col-form-label fw-bold"
                    >
                      Dirección:
                    </label>
                    <input
                      type="text"
                      className="form-control form form-control-request"
                      id="recipient-name"
                      value={adress ? adress : ""}
                      onChange={(e) => setAdress(e.target.value)}
                    />
                  </div>
                  <div className="mb-3">
                    <label
                      htmlFor="recipient-name"
                      className="col-form-label fw-bold"
                    >
                      Codigo Postal:
                    </label>
                    <input
                      type="text"
                      className="form-control form form-control-request"
                      id="recipient-name"
                      value={postcode ? postcode : ""}
                      onChange={(e) => setPostCode(e.target.value)}
                    />
                  </div>

                  <div className="mb-3">
                    <label
                      htmlFor="recipient-name"
                      className="col-form-label fw-bold"
                    >
                      Numero de contacto:
                    </label>
                    <input
                      type="text"
                      className="form-control form form-control-request"
                      id="recipient-name"
                      value={tlf ? tlf : ""}
                      onChange={(e) => setTlf(e.target.value)}
                    />
                  </div>
                </form>
              </div>
              <div className="modal-footer border-warning">
                <button
                  data-bs-dismiss="modal"
                  type="button"
                  className="btn mail-button"
                  onClick={handleSubmitEditUser}
                >
                  aceptar
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Space;
