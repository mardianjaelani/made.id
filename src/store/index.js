import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

export default new Vuex.Store({
  plugins: [createPersistedState()],
  state: {
    user: {
		token: null,
		isLoggedIn: false,
		username: "",
		auth: null,
		name: '',
		detail: null,
		salon_code: '',
		patient_id: '',
		role: ''
	},
	admin: {
		token: null,
		isLoggedIn: false,
		username: "",
		auth: null,
		name: '',
		detail: null,
		salon_code: ''
	},
    isLoading: true,
	display:'none',
    loading: false,
    loading_submit: false,
    snackbar: false,
    error: false,
	text: '',
	drawer: true,
	mini: true,
	hover:false,
	dialog: false,
	dialog2: false,
    success: true,
	overlay:false,
	user_variabels: [],
	isDataTableLoading:false,
	book_date: null,
	patient: null,
	book_date_time: null,
	avatar: ''
  },
  mutations: {
	SET_OVERLAY(state, payload){
		state.overlay = payload
	},
	USER_TOKEN_RESET(state, payload){
		state.user.token = payload.token
		state.user.username = payload.data.user_id
		state.user.isLoggedIn = true
		state.user.auth = payload.data.auth
		state.user.name = payload.data.name
		state.user.salon_code = payload.data.salon_code
	},
	ADMIN_TOKEN_RESET(state, payload){
		console.log(payload);
		state.admin.token = payload.token
		state.admin.username = payload.data.user_id
		state.admin.isLoggedIn = true
		state.admin.auth = payload.data.auth
		state.admin.name = payload.data.name
		state.admin.salon_code = payload.data.salon_code
	},
    USER_TOKEN (state, payload) {
		console.log(payload);
		state.user.token = payload.token
		state.user.username = payload.data.email
		state.user.role = payload.data.role
		state.user.isLoggedIn = true		
	},
    USER_LOGOUT (state, payload) {
		if(payload == true) {
			state.user.token = ""
			state.user.isLoggedIn = false
			state.user.username = ""
			state.user.auth = null
			state.user.name = ""
			state.user.detail = null
		}
	},
	ADMIN_TOKEN (state, payload) {
		state.admin.token = payload.token
		state.admin.username = payload.data.value.user_id
		state.admin.isLoggedIn = true
		state.admin.auth = payload.data.value.auth
		state.admin.name = payload.data.value.name
		state.admin.detail = payload.data.value.detail
		state.admin.salon_code = payload.data.value.salon_code
	},
    ADMIN_LOGOUT (state, payload) {
		if(payload == true) {
			state.admin.token = ""
			state.admin.isLoggedIn = false
			state.admin.username = ""
			state.admin.auth = null
			state.admin.name = ""
			state.admin.detail = null
		}
	},
	SET_DRAWER_ADMIN (state) {
		if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
			state.drawer = !state.drawer
		} else{
			state.drawer = true
			state.mini = !state.mini
		}
	},
	USER_VAR (state, payload) {
		state.user_variabels = payload
	},
	SET_BOOK_DATE(state, payload){
		state.book_date = payload
	},
	SET_BOOK_PATIENT(state, payload){
		state.patient = payload
	},
	SET_BOOK_DATETIME(state, payload){
		state.book_date_time = payload
	},
	getAvatar(state, avatar){
		state.avatar = avatar.profile_img
	},
  },
  actions: {
	setBookDate({ commit }, data){
		commit('SET_BOOK_DATE', data)
	},
	setBookPatient({ commit }, data){
		commit('SET_BOOK_PATIENT', data)
	},
	setOverlay({ commit }, data){
		commit('SET_OVERLAY', data)
	},
	setBookDateTime({ commit }, data){
		commit('SET_BOOK_DATETIME', data)
	},
    loginUser({ commit }, data) {
		return new Promise((resolve, reject) => {
			axios.post(`${process.env.VUE_APP_URL}/api/login`, data)
			.then(res => {
				console.log(res.data.data);
				const data = {
					'data' : res.data.data,
					'token' : res.data.data.access_token
				}
				axios.defaults.headers.common["Authorization"] = res.data.data.access_token
				commit("USER_TOKEN", data);
				resolve(res)
			})
			.catch(err => {
				reject(err)
			})
		})
	},
    logoutUser({ commit }) {
		return new Promise((resolve, reject) => {
			axios.get(`${process.env.VUE_APP_URL}/api/logout`, { 
				headers: { Authorization: `Bearer ${this.getters.isTokenUser}` } 
			})
			.then(res => {
				delete axios.defaults.headers.common['Authorization']
				commit('USER_LOGOUT', true)
				resolve(res)
			})
			.catch(err => {
				reject(err)
			})
		})
	},
	loginAdmin({ commit }, data) {
		return new Promise((resolve, reject) => {
			axios.post(`${process.env.VUE_APP_URL}/api/v1/password_login`, data)
			.then(res => {
				const data = {
					'data' : res.data,
					'token' : res.headers.authorization
				}
				axios.defaults.headers.common["Authorization"] = res.headers.authorization
				commit("ADMIN_TOKEN", data);
				resolve(res)
			})
			.catch(err => {
				reject(err)
			})
		})
	},
	logoutAdmin({ commit }) {
		return new Promise((resolve, reject) => {
			delete axios.defaults.headers.common['Authorization']
			commit('ADMIN_LOGOUT', true)
			resolve('')
		})
	},
	getTokenResetPassword ({ commit }, data) {
		return new Promise((resolve, reject) => {
			if (data.data.auth === 0) {
				commit("USER_TOKEN_RESET", data);
			} else {
				commit("ADMIN_TOKEN_RESET", data);
			}

			resolve(data)
		})
	},
	getHeaderAvatar ({ commit }) {
		return new Promise((resolve, reject) => {
			axios.post(`${process.env.VUE_APP_URL}/api/v1/get_profile_img`, {
                'id': this.getters.patient_id
            }, { 
                headers: { Authorization: `${this.getters.isTokenUser}` } 
            })
            .then(res => {
				commit('getAvatar', res.data.value)
				resolve(res)
            }).catch(err => {
				reject(err)
            })  
			
		})
	},
  },
  getters: {
		isUserLoggedIn: state => !!state.user.token,
		isAdminLoggedIn: state => !!state.admin.token,
		isTokenUser: state => state.user.token,
		patient_id: state => state.user.patient_id,
		isTokenAdmin: state => state.admin.token,
		UsernameUser: state => state.user.username,
		convertToCurrency: state => number => {
			return new Intl.NumberFormat('id-ID').format(number)
		},
		convertToCurrencyUs: state => number => {
			return new Intl.NumberFormat('ja-JP', {maximumFractionDigits:2}).format(number)
		},
  }
});
