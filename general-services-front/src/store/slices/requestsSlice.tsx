import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../configs/AxiosConfig';

// Thunks para solicitudes relacionadas con la compañía
export const fetchCompanyRequests = createAsyncThunk(
    'requests/fetchCompanyRequests',
    async (username) => {
        const response = await axios.get(`requests/company/owner/${username}`);
        return response.data;
    }
);

export const fetchAvailableContractors = createAsyncThunk(
    'requests/fetchAvailableContractors',
    async (username) => {
        const response = await axios.get(`/contractors/available/${username}`);
        return response.data;
    }
);

export const acceptRequest = createAsyncThunk(
    'requests/acceptRequest',
    // @ts-expect-error TS(2339): Property 'requestId' does not exist on type 'void'... Remove this comment to see the full error message
    async ({ requestId, contractorId }) => {
        await axios.put(`requests/assign/${requestId}`, {
            contractorId,
            status: 'En Progreso'
        });
        return { requestId, contractorId };
    }
);

export const rejectRequest = createAsyncThunk(
    'requests/rejectRequest',
    async (requestId) => {
        await axios.delete(`requests/${requestId}`);
        return requestId;
    }
);

export const cancelCompanyRequest = createAsyncThunk(
    'requests/cancelCompanyRequest',
    // @ts-expect-error TS(2339): Property 'requestId' does not exist on type 'void'... Remove this comment to see the full error message
    async ({ requestId, contractorId }) => {
        await axios.put(`requests/company/${requestId}`, { status: 'Cancelada' });
        await axios.put(`contractors/available/${contractorId}`, { available: true });
        return requestId;
    }
);

export const completeRequest = createAsyncThunk(
    'requests/completeRequest',
    async (requestId) => {
        await axios.put(`requests/${requestId}`, { status: 'Completada' });
        return requestId;
    }
);

// Thunks adicionales para el usuario
export const fetchUserIdByUsername = createAsyncThunk(
    'requests/fetchUserIdByUsername',
    async (username) => {
        const response = await axios.get(`/users/username/${username}`);
        return response.data;
    }
);

export const fetchUserRequests = createAsyncThunk(
    'requests/fetchUserRequests',
    async (userId) => {
        const response = await axios.get(`/requests/user/${userId}`);
        return response.data;
    }
);

export const fetchRelatedData = createAsyncThunk(
    'requests/fetchRelatedData',
    async (requests) => {
        // @ts-expect-error TS(2339): Property 'map' does not exist on type 'void'.
        const contractorIds = [...new Set(requests.map((req: any) => req.contractorId))];
        // @ts-expect-error TS(2339): Property 'map' does not exist on type 'void'.
        const serviceIds = [...new Set(requests.map((req: any) => req.serviceId))];
        // @ts-expect-error TS(2339): Property 'map' does not exist on type 'void'.
        const companyIds = [...new Set(requests.map((req: any) => req.companyId))];

        const [contractors, services, companies] = await Promise.all([
            contractorIds.length > 0 ? axios.post('/contractors/by-ids', contractorIds) : { data: [] },
            serviceIds.length > 0 ? axios.post('/services/by-ids', serviceIds) : { data: [] },
            companyIds.length > 0 ? axios.post('/companies/by-ids', companyIds) : { data: [] }
        ]);

        return {
            contractors: contractors.data,
            services: services.data,
            companies: companies.data
        };
    }
);

export const cancelRequest = createAsyncThunk(
    'requests/cancelRequest',
    async (requestId) => {
        await axios.put(`/requests/${requestId}`, { status: 'Cancelada' });
        return requestId;
    }
);

// Estado inicial combinado
const initialState = {
    userId: null,
    requests: [],
    contractors: [],
    services: [],
    companies: [],
    availableContractors: [],
    filter: 'All',
    status: 'idle',
    error: null,
    showBillingForm: false,
    showContractorList: false,
    selectedRequestId: null
};

// Slice combinado
const requestsSlice = createSlice({
    name: 'requests',
    initialState,
    reducers: {
        // Acción para resetear el estado
        resetState: () => {
            return initialState;
        },
        setFilter: (state, action) => {
            state.filter = action.payload;
        },
        setShowBillingForm: (state, action) => {
            state.showBillingForm = action.payload;
        },
        setShowContractorList: (state, action) => {
            state.showContractorList = action.payload;
        },
        setSelectedRequestId: (state, action) => {
            state.selectedRequestId = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            // Fetch UserId by Username
            .addCase(fetchUserIdByUsername.fulfilled, (state, action) => {
                state.userId = action.payload;
                state.status = 'succeeded';
            })
            .addCase(fetchUserIdByUsername.rejected, (state, action) => {
                // @ts-expect-error TS(2322): Type 'string | undefined' is not assignable to typ... Remove this comment to see the full error message
                state.error = action.error.message;
                state.status = 'failed';
                state.userId = null;  // Reset userId on error
            })

            // Fetch User Requests
            .addCase(fetchUserRequests.fulfilled, (state, action) => {
                state.requests = action.payload;
                state.status = 'succeeded';
            })
            .addCase(fetchUserRequests.rejected, (state, action) => {
                // @ts-expect-error TS(2322): Type 'string | undefined' is not assignable to typ... Remove this comment to see the full error message
                state.error = action.error.message;
                state.status = 'failed';
                state.requests = []; // Reset requests on error
            })

            // Fetch Related Data (Contractors, Services, Companies)
            .addCase(fetchRelatedData.fulfilled, (state, action) => {
                state.contractors = action.payload.contractors;
                state.services = action.payload.services;
                state.companies = action.payload.companies;
                state.status = 'succeeded';
            })
            .addCase(fetchRelatedData.rejected, (state, action) => {
                // @ts-expect-error TS(2322): Type 'string | undefined' is not assignable to typ... Remove this comment to see the full error message
                state.error = action.error.message;
                state.status = 'failed';
                state.contractors = []; // Reset contractors
                state.services = [];    // Reset services
                state.companies = [];   // Reset companies
            })

            // Fetch Company Requests
            .addCase(fetchCompanyRequests.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchCompanyRequests.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.requests = action.payload;
            })
            .addCase(fetchCompanyRequests.rejected, (state, action) => {
                state.status = 'failed';
                // @ts-expect-error TS(2322): Type 'string | undefined' is not assignable to typ... Remove this comment to see the full error message
                state.error = action.error.message;
                state.requests = []; // Reset requests on error
            })

            // Fetch Available Contractors
            .addCase(fetchAvailableContractors.fulfilled, (state, action) => {
                state.availableContractors = action.payload;
            })

            // Accept Request
            .addCase(acceptRequest.fulfilled, (state, action) => {
                // @ts-expect-error TS(2339): Property 'id' does not exist on type 'never'.
                const request = state.requests.find(req => req.id === action.payload.requestId);
                if (request) {
                    // @ts-expect-error TS(2339): Property 'status' does not exist on type 'never'.
                    request.status = 'En Progreso';
                    // @ts-expect-error TS(2339): Property 'contractorId' does not exist on type 'ne... Remove this comment to see the full error message
                    request.contractorId = action.payload.contractorId;
                }
                state.showContractorList = false;
                state.selectedRequestId = null;  // Reset selectedRequestId on accept
            })

            // Reject Request
            .addCase(rejectRequest.fulfilled, (state, action) => {
                // @ts-expect-error TS(2339): Property 'id' does not exist on type 'never'.
                state.requests = state.requests.filter(req => req.id !== action.payload);
            })

            // Cancel Company Request
            .addCase(cancelCompanyRequest.fulfilled, (state, action) => {
                // @ts-expect-error TS(2339): Property 'id' does not exist on type 'never'.
                const request = state.requests.find(req => req.id === action.payload);
                if (request) {
                    // @ts-expect-error TS(2339): Property 'status' does not exist on type 'never'.
                    request.status = 'Cancelada';
                }
            })

            // Complete Request
            .addCase(completeRequest.fulfilled, (state, action) => {
                // @ts-expect-error TS(2339): Property 'id' does not exist on type 'never'.
                const request = state.requests.find(req => req.id === action.payload);
                if (request) {
                    // @ts-expect-error TS(2339): Property 'status' does not exist on type 'never'.
                    request.status = 'Completada';
                }
                state.showBillingForm = false;
            })

            // Cancel Request
            .addCase(cancelRequest.fulfilled, (state, action) => {
                // @ts-expect-error TS(2339): Property 'id' does not exist on type 'never'.
                const request = state.requests.find(req => req.id === action.payload);
                if (request) {
                    // @ts-expect-error TS(2339): Property 'status' does not exist on type 'never'.
                    request.status = 'Cancelada';
                }
            });
    }
});

// Acciones exportadas
export const {
    resetState,
    setFilter,
    setShowBillingForm,
    setShowContractorList,
    setSelectedRequestId
} = requestsSlice.actions;

export default requestsSlice.reducer;
