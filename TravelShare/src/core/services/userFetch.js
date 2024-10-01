const PORT = 8000
const API_URL = `http://localhost:${PORT}`


export const registerUser = async (userData) => {
  try {
    const response = await fetch(`${API_URL}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    })

    if (response.status !== 201) {
      throw new Error('Registration failed')
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error('Error during registration:', error)
    throw error // Re-throw the error for further handling
  }
}

export const loginUser = async (credentials) => {
  try {
    const response = await fetch(`${API_URL}/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    })

    if (!response.ok) {
      throw new Error('Login failed')
    }

    const data = await response.json()
    return data // Return the response data (or any relevant info)
  } catch (error) {
    console.error('Error during login:', error)
    throw error // Re-throw the error for further handling
  }
}

export const getUserRoutes = async (userName) => {
  try {
    const response = await fetch(`${API_URL}/routes/${userName}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      throw new Error('Process failure')
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error('Error during conection:', error)
    throw error
  }
}

