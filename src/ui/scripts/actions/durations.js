import api from '../utils/api'

export const SET_DURATIONS_TYPE = Symbol()
export const SET_DURATIONS_VALUE = Symbol()
export const SET_DURATIONS_FETCHING = Symbol()
export const SET_DURATIONS_ERROR = Symbol()
export const RESET_DURATIONS = Symbol()

export const setDurationsType = (payload) => ({
	type: SET_DURATIONS_TYPE,
	payload
})

export const setDurationsValue = (domainId, payload) => ({
	type: SET_DURATIONS_VALUE,
	domainId,
	payload
})

export const setDurationsFetching = (domainId, payload) => ({
	type: SET_DURATIONS_FETCHING,
	domainId,
	payload
})

export const setDurationsError = (domainId, payload) => ({
	type: SET_DURATIONS_ERROR,
	domainId,
	payload
})

export const resetDurations = () => ({
	type: RESET_DURATIONS
})

export const fetchDurations = (props, domainId) => async (dispatch) => {

	dispatch(setDurationsFetching(domainId, true))
	dispatch(setDurationsError(domainId))

	try {

		const data = await api(`/domains/${ domainId }/durations?type=${ props.durations.type }`, {
			method: 'get',
			props
		})

		dispatch(setDurationsValue(domainId, data))

	} catch (err) {

		dispatch(setDurationsError(domainId, err))

	} finally {

		dispatch(setDurationsFetching(domainId, false))

	}

}