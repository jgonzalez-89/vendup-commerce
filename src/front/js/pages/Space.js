import React from "react";

const Space = () => {
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
        </div>
        <div className="row-3">
          <img
            src={""}
            className="card-img-top mx-auto mt-2 "
            alt="usuario"
            style={{ width: "10rem", height: "10rem", objectFit: "cover" }}
          />

          <img
            className="ms-2 img border-2 border border-warning rounded-circle"
            style={{ width: "10rem", height: "10rem", objectFit: "cover" }}
            alt="..."
          />
        </div>
      </div>

      <div className="container">
        <ul>
          <div className="container">
            <div className="row">
              <div className="col-4">
                <p className="text-start fw-bold">Nombre:</p>{" "}
              </div>
              <div className="col mb-3"></div>
            </div>
          </div>
          <div className="container">
            <div className=" row">
              <div className=" col-4">
                <p className="fw-bold text-start">Apellido:</p>{" "}
              </div>
              <div className="col mb-3"></div>
            </div>
          </div>
          <div className="container">
            <div className=" row">
              <div className=" col-4">
                <p className="fw-bold text-start">Correo:</p>{" "}
              </div>
              <div className="col mb-3"></div>
            </div>
          </div>
          <div className="container">
            <div className=" row">
              <div className=" col-4">
                <p className="fw-bold text-start">Ciudad:</p>{" "}
              </div>
              <div className="col mb-3"></div>
            </div>
          </div>
          <div className="container">
            <div className=" row">
              <div className=" col-4">
                <p className="fw-bold text-start">Direccion:</p>{" "}
              </div>
              <div className="col mb-3"></div>
            </div>
          </div>
          <div className="container">
            <div className=" row">
              <div className=" col-4">
                <p className="fw-bold text-start">Codigo Postal:</p>{" "}
              </div>
              <div className="col mb-3"></div>
            </div>
          </div>
          <div className="container">
            <div className=" row">
              <div className=" col-4">
                <p className="fw-bold text-start">Contacto:</p>{" "}
              </div>
              <div className="col mb-3"></div>
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
                      value={""}
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
                      value={""}
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
                      value={""}
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
                      value={""}
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
                      value={""}
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
                    />
                  </div>
                </form>
              </div>
              <div className="modal-footer border-warning">
                <button
                  data-bs-dismiss="modal"
                  type="button"
                  className="btn mail-button"
                  onClick={""}
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
