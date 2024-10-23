//profile call (GET)
export const profileCall = async (token) => {
    try {
        const response = await fetch('http://localhost:8080/api/users/profile', {
            method: 'GET',
            headers: {
                'Authorization': `jwt ${token}`, 
            },
        });
        if (!response.ok) {
            throw new Error('Failed to fetch user data.');
        }

        const data = await response.json();
        return data;

    } catch (error) {
        console.log(`Error fetching user data: ${error.message}`);
    }
};

//profile call (PUT)
export const updateProfileCall = async (token, data) => {
    const response = await fetch('http://localhost:8080/api/users/profile', {
        method: 'PUT',
        headers: {
            'Authorization': `jwt ${token}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        throw new Error('Failed to update user data.');
    }
}

//delete call (delete)
export const deleteAccountCall = async (token) => {
    const response = await fetch('http://localhost:8080/api/users/profile', {
        method: 'DELETE',
        headers: {
            'Authorization': `jwt ${token}`,
        },
    });

    if (!response.ok) {
        throw new Error('Failed to delete account.');
    } 
}

//login call 
export const loginCall = async (username, password) => {
    const response = await fetch('http://localhost:8080/api/users/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password })
    });

    if (!response.ok) {
        throw new Error("Login failed. Please check your credentials.");
    }

    const data = await response.json();
    return data;
};

//register call
export const registerCall = async (username, email, password, confirmPassword, name, dob, location, bio) => {
    const response = await fetch('http://localhost:8080/api/users/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password, confirmPassword, name, dob, location, bio }),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Registration failed. Please try again.');
    }

    const data = await response.json();
    return data;
};
