import axios from 'axios'

export default {
    // USER API
    getUsers: function() {
        return axios.get('/api/users/')
    },
    getUser: function(id) {
        return axios.get('/api/users/' + id)
    },
    updateUserPersonalInfo: function(id, userData) {
        return axios.put('/api/users/info/' + id, userData)
    },
    updateUserPreferences: function(id, userData) {
        return axios.put('/api/users/preferences/' + id, userData)
    },
    updateUserPassword: function(id, passwordData) {
        return axios.put('/api/users/updatePassword/' + id, passwordData)
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

    // SCHEDULE API
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
    },

    // MESSAGE BOARD API
    saveMessageBoard: function(userData) {
        return axios.post('/api/messageBoard', userData)
    },
    getMessageBoards: function() {
        return axios.get('/api/messageBoard/')
    },
    getMessageBoard: function(user) {
        return axios.get('/api/messageBoard/' + user)
    },
    deleteMessageBoard: function(user, id) {
        return axios.delete('/api/messageBoard/' + user, id)
    },
        
}