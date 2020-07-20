import React, { useState, useEffect } from "react";
import { getStatuses } from "../api/status.requests";

export default function TaskForm({ group, task, onSubmit }) {
  const [statuses, setStatuses] = useState([]);
  const [form, setForm] = useState({
    name: task ? task.name : "",
    title: task ? task.title : "",
    description: task ? task.description : "",
    group_id: task ? task.group_id : group ? group.id : null,
    status_id: null,
  });

  useEffect(() => {
    if (statuses.length === 0) {
      getStatuses().then((response) => {
        setStatuses(response.data);
        setForm({
          ...form,
          status_id: response.data ? response.data[0].id : null,
        });
      });
    }
  }, [statuses]);

  return (
    <div className="row mt-3">
      <div className="col-md-12">
        <div className="card">
          <div className="card-header">
            <div className="row align-items-center">
              <div className="col-8">
                <h3 className="mb-0">
                  {task ? "Editar tarea" : "Crear tarea"}
                </h3>
              </div>
            </div>
          </div>
          <div className="card-body">
            <form>
              <h6 className="heading-small text-muted mb-4">
                Información de la tarea
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
                        id="input-name"
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
                        Titulo
                      </label>
                      <input
                        type="text"
                        id="input-name"
                        name="title"
                        className="form-control"
                        value={form.title}
                        onChange={(e) => handleChange(e)}
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                 {/*  <div className="col-md-6">
                    <div className="form-group">
                      <label
                        className="form-control-label"
                        htmlFor="input-stage"
                      >
                        Estatus
                      </label>
                      <select
                        className="form-control"
                        id="input-stage"
                        name="status_id"
                        onChange={(e) => handleChange(e)}
                      >
                        {statuses.map((status) => (
                          <option
                            defaultValue={status.id === form.status_id}
                            key={status.id}
                            value={status.id}
                          >
                            {status.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div> */}
                  <div className="col-md-12">
                    <div className="form-group">
                      <label className="form-control-label">Enunciado</label>
                      <textarea
                        rows={4}
                        className="form-control"
                        name="description"
                        onChange={(e) => handleChange(e)}
                        defaultValue={form.description}
                      />
                    </div>
                  </div>
                </div>
                <div className="d-flex justify-content-end">
                  <button
                    className="btn btn-primary"
                    onClick={(e) => handleSubmit(e)}
                  >
                    {task ? "Editar" : "Crear"}
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
    const { name, title, description, group_id, status_id } = form;
    const task = {
      name,
      title,
      description,
      group_id,
      status_id,
    };
    onSubmit(task);
  }
}
