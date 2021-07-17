import passwordGenerator from "generate-password";
import React, { useState, useEffect } from "react";
import { getRoles } from "../api/role.requests";
import { isTeacher } from "../utils/misc";

export default function UserForm({ user, onSubmit, formTitle, hideRole }) {
  const authUser = JSON.parse(localStorage.getItem("user"));
  const [roles, setRoles] = useState([]);
  const [form, setForm] = useState({
    name: user ? user.name : "",
    lastname: user ? user.lastname : "",
    email: user ? user.email : "",
    role_id: user ? user.role_id : 3,
    institute_id: authUser.institute_id || 1,
    password: passwordGenerator.generate({
      length: 14,
      numbers: true,
      symbols: true
    })
  });

  useEffect(() => {
    getRoles().then((response) => {
      setRoles(response.data);
    });
  }, []);

  return (
    <div className="row mt-3">
      <div className="col-md-12">
        <div className="card">
          <div className="card-header">
            <div className="row align-items-center">
              <div className="col-8">
                <h3 className="mb-0">
                  {formTitle ? formTitle : user ? "Editar usuario" : "Crear usuario"}
                </h3>
              </div>
            </div>
          </div>
          <div className="card-body">
            <form>
              <h6 className="heading-small text-muted mb-4">
                Información del usuario
              </h6>
              <div className="pl-md-4">
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label
                        className="form-control-label"
                        htmlFor="input-name"
                      >
                        Nombre
                      </label>
                      <input
                        type="text"
                        name="name"
                        className="form-control"
                        value={form.name}
                        onChange={(e) => handleChange(e)}
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label
                        className="form-control-label"
                        htmlFor="input-name"
                      >
                        Apellido
                      </label>
                      <input
                        type="text"
                        name="lastname"
                        className="form-control"
                        value={form.lastname}
                        onChange={(e) => handleChange(e)}
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label
                        className="form-control-label"
                        htmlFor="input-name"
                      >
                        Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        className="form-control"
                        value={form.email}
                        onChange={(e) => handleChange(e)}
                      />
                    </div>
                  </div>
                  {!hideRole &&
                    <div className="col-md-6">
                      <div className="form-group">
                        <label
                          className="form-control-label"
                          htmlFor="input-stage"
                        >
                          Rol
                        </label>
                        {
                          isTeacher() ? (
                            <select
                              className="form-control"
                              name="role_id"
                              onChange={(e) => handleChange(e)}
                              value={form.role_id}
                            >
                                <option
                                  key={3}
                                  value={3}
                                >
                                  Estudiante
                                </option>
                            </select>
                          ) : (
                            <select
                              className="form-control"
                              name="role_id"
                              onChange={(e) => handleChange(e)}
                              value={form.role_id}
                            >
                              {roles.map((role) => (
                                <option
                                  key={role.id}
                                  value={role.id}
                                >
                                  {role.name}
                                </option>
                              ))}
                            </select>
                          )
                        }
                      </div>
                    </div>}
                </div>
                <div className="d-flex justify-content-end">
                  <button
                    className="btn btn-primary"
                    onClick={(e) => handleSubmit(e)}
                  >
                    {user ? "Editar" : "Crear"}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );

  function handleChange(e) {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    const { name, lastname, email, role_id, institute_id, password } = form;
    let userForm = {
      name,
      lastname,
      email,
      role_id,
      institute_id,
      password
    }
    if (!user) userForm = { ...userForm, email };
    onSubmit(userForm);
  }
}
