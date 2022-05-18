import axios from 'axios'
import { 
      USER_LOGIN_FAIL,
      USER_LOGIN_REQUEST,
      USER_LOGIN_SUCCESS,
      USER_LOGOUT,
      USER_DETAILS_FAIL,
      USER_DETAILS_REQUEST,
      USER_DETAILS_SUCCESS,
      USER_REGISTER_REQUEST,
      USER_REGISTER_SUCCESS,
      USER_REGISTER_FAIL,
      
} from '../constants/userConstants'


//User & Admin Login
export const login = (email, password) => async (dispatch) => {
    try {
          dispatch({
                type: USER_LOGIN_REQUEST
          })

          const config = {
                headres: {
                      'Content-Type': 'application/json',
                },
          }

          const user = {
                email: email,
                password: password
          }

          console.log(user);

          const { data } = await axios.post('/api/users/login', user, config)

          dispatch({
                type: USER_LOGIN_SUCCESS,
                payload: data
          })

          localStorage.setItem('userInfo', JSON.stringify(data))


    } catch (error) {

          dispatch({
                type: USER_LOGIN_FAIL,
                payload:
                      error.response && error.response.data.message
                            ? error.response.data.message
                            : error.message,
          })

    }
}

export const logout = () => (dispatch) => {
      localStorage.removeItem('userInfo')
      localStorage.removeItem('cartItems')
      localStorage.removeItem('shippingAddress')
      localStorage.removeItem('paymentMethod')
      dispatch({ type: USER_LOGOUT })
  } 
  

export const getUserDetails = (id) => async (dispatch, getState) => {
      try {
            dispatch({
                  type: USER_DETAILS_REQUEST,
            })

            const {
                  userLogin: { userInfo },
            } = getState()

            const config = {
                  headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${userInfo.token}`,
                  },
            }

            const { data } = await axios.get(`/api/users/${id}`, config)

            dispatch({
                  type: USER_DETAILS_SUCCESS,
                  payload: data,
            })
      } catch (error) {
            dispatch({
                  type: USER_DETAILS_FAIL,
                  payload:
                        error.response && error.response.data.message
                              ? error.response.data.message
                              : error.message,
            })
      }
}


export const register = (name, nic, gender, contactNo, email, password, isAdmin) => async (dispatch) => {
      try {
          dispatch({
              type: USER_REGISTER_REQUEST
          })
  
          const config = {
              headers: {
                  'Content-Type': 'application/json'
              }
          }

          const user = {
                name: name,
                email: email,
                nic: nic,
                gender: gender,
                contactNo: contactNo,
                email: email,
                password: password,
                isAdmin: isAdmin
          }


  
          const { data } = await axios.post('http://localhost:6500/api/users/', user,
              config
          )
  
          dispatch({
              type: USER_REGISTER_SUCCESS,
              payload: data,
          })
  
          dispatch({
              type: USER_LOGIN_SUCCESS,
              payload: data,
          })
  
          localStorage.setItem('userInfo', JSON.stringify(data))
      } catch (error) {
          dispatch({
              type: USER_REGISTER_FAIL,
              payload:
                  error.response && error.response.data.message
                      ? error.response.data.message
                      : error.message
          })
      }
  }