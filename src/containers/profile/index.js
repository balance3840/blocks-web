import React, { useEffect, useState } from 'react';
import { changePassword, editUser, getUser } from '../../api/users.requests';
import Loader from '../../components/Loader';
import PasswordForm from '../../components/PasswordForm';
import UserForm from '../../components/UserForm';
import { getAuthUser } from '../../utils/misc';

export default function ProfileContainer() {
    const authUser = getAuthUser();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getUser(authUser.id).then(response => {
            setUser(response.data);
            setLoading(false);
        }).catch(() => setLoading(false));
    }, [])

    function handleSubmit(data) {
        editUser(user.id, data).then(() => {
            window.location.reload();
        });
    }

    function handlePasswordSubmit(data) {
        changePassword(data).then(response => {
            window.location.reload();
        });
    }

    function renderLoading() {
        return (
            <Loader />
        )
    }

    function renderContent() {
        return (
            <>
                {user && (
                    <>
                        <UserForm user={user} formTitle={'Editar perfil'} 
                        hideRole={true} onSubmit={handleSubmit} />
                        <PasswordForm onSubmit={handlePasswordSubmit} />
                    </>
                )}
            </>
        )
    }

    return (
        loading ? renderLoading() : renderContent()
    )
}