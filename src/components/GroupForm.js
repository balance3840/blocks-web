import React, { useState, useEffect } from "react";
import { getStages } from "../api/stage.requests";

export default function GroupForm({ onSubmit, group }) {
  const [stages, setStages] = useState([]);
  const [form, setForm] = useState({
    name: group ? group.name : "",
    grade: group ? group.grade : 1,
    level: group ? group.level : 1,
    stage: group ? group.stage_id : null,
    description: group ? group.description : "",
  });

  useEffect(() => {
    if (stages.length === 0) {
      getStages().then((response) => {
        setStages(response.data);
        setForm({ ...form, stage: response.data ? response.data[0].id : null });
      });
    }
  }, [stages]);

  return (
    <div className="row mt-3">
      <div className="col-md-12">
        <div className="card">
          <div className="card-header">
            <div className="row align-items-center">
              <div className="col-8">
                <h3 className="mb-0">Crear grupo</h3>
              </div>
            </div>
          </div>
          <div className="card-body">
            <form>
              <h6 className="heading-small text-muted mb-4">
                Información del grupo
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
                        htmlFor="input-grade"
                      >
                        Grado
                      </label>
                      <input
                        type="number"
                        id="input-grade"
                        name="grade"
                        className="form-control"
                        value={form.grade}
                        onChange={(e) => handleChange(e)}
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  {/* <div className="col-md-6">
                    <div className="form-group">
                      <label
                        className="form-control-label"
                        htmlFor="input-level"
                      >
                        Nivel
                      </label>
                      <input
                        type="number"
                        id="input-level"
                        name="level"
                        className="form-control"
                        value={form.level}
                        onChange={(e) => handleChange(e)}
                      />
                    </div>
                  </div> */}
                  <div className="col-md-6">
                    <div className="form-group">
                      <label
                        className="form-control-label"
                        htmlFor="input-stage"
                      >
                        Fase
                      </label>
                      <select
                        className="form-control"
                        id="input-stage"
                        name="stage"
                        onChange={(e) => handleChange(e)}
                      >
                        {stages.map((stage) => (
                          <option
                            defaultValue={stage.id === form.stage}
                            key={stage.id}
                            value={stage.id}
                          >
                            {stage.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="form-group">
                      <label className="form-control-label">Descripción</label>
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
                    {group ? "Editar" : "Crear"}
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
    const { name, grade, level, stage, description } = form;
    const group = {
      name,
      grade,
      level,
      stage_id: stage,
      description,
    };
    onSubmit(group);
  }
}
