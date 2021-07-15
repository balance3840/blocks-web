import React, { useState } from 'react';

export default function PasswordForm({ onSubmit }) {

    const [form, setForm] = useState({
        password: '',
        newPassword: '',
        repeatNewPassword: ''
    });

    function handleChange(e) {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    }

    function handleSubmit(e) {
        e.preventDefault();
        const { password, newPassword, repeatNewPassword } = form;
        const data = {
            password,
            newPassword,
            repeatNewPassword
        };
        onSubmit(data);
    }

    return (
        <div className="row mt-3">
            <div className="col-md-12">
                <div className="card">
                    <div className="card-header">
                        <div className="row align-items-center">
                            <div className="col-8">
                                <h3 className="mb-0">Cambiar contraseña</h3>
                            </div>
                        </div>
                    </div>
                    <div className="card-body">
                        <form method="get" onSubmit={(e) => handleSubmit(e)}>
                            <div className="pl-md-4">
                                <div className="row">
                                    <div className="col-md-4">
                                        <div className="form-group">
                                            <label className="form-control-label" htmlFor="input-name">Contraseña actual</label>
                                            <input type="password" required={true} name="password" className="form-control" onChange={(e) => handleChange(e)} value={form.password} />
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="form-group">
                                            <label className="form-control-label" htmlFor="input-name">Nueva contraseña</label>
                                            <input type="password" required={true} name="newPassword" className="form-control" onChange={(e) => handleChange(e)} value={form.newPassword} />
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="form-group">
                                            <label className="form-control-label" htmlFor="input-name">Repetir nueva contraseña</label>
                                            <input type="password" required={true} name="repeatNewPassword" className="form-control" onChange={(e) => handleChange(e)} value={form.repeatNewPassword} />
                                        </div>
                                    </div>
                                </div>
                                <div className="d-flex justify-content-end">
                                    <button type="submit" className="btn btn-primary">Cambiar</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )

}