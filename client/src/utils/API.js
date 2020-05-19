import axios from 'axios'

export default {
    getConvergePay: function() {
        return axios.get('https://www.convergepay.com/hosted-payments/myip')
    },
    getUsers: function() {
        return axios.get('/api/users/')
    },
    getUser: function(id) {
        return axios.get('/api/users/' + id)
    },
    deleteUser: function(id) {
        return axios.delete('/api/users/' + id)
    },
    saveUser: function(userData) {
        return axios.post('/api/users', userData)
    },
    loginUser: function(userData) {
        return axios.post('/api/users/login', userData)
    },
    createSession: function(sessionData) {
        return axios.post('/api/sessions', sessionData)
    },
    logout: function(sessionData) {
        return axios.delete('/api/sessions', sessionData)
    },
    checkSession: function(id, localSessionID) {
        return axios.get('/api/sessions/' + id, localSessionID)
    },
    getSchedules: function() {
        return axios.get('/api/schedules')
    },
    getSchedule: function(id) {
        return axios.get('/api/schedules/' + id)
    },
    saveSchedule: function(data) {
        return axios.post('/api/schedules', data)
    },
    deleteSchedule: function(id) {
        return axios.delete('/api/schedules/' + id)
    }
        
}