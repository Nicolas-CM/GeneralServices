import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from '../../configs/AxiosConfig';

// Definir tipos para las respuestas
interface Request {
    id: string;
    status: string;
    contractorId?: string;
    serviceId?: string;
    companyId?: string;
}

interface CompanyRequestPayload {
    requestId: string;
    contractorId: string;
}

interface FetchRelatedDataResponse {
    contractors: any[];
    services: any[];
    companies: any[];
}

interface RequestsState {
    userId: string | null;
    requests: Request[];
    contractors: any[];
    services: any[];
    companies: any[];
    availableContractors: any[];
    filter: string;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
    showBillingForm: boolean;
    showContractorList: boolean;
    selectedRequestId: string | null;
}

// Thunks para solicitudes relacionadas con la compañía
export const fetchCompanyRequests = createAsyncThunk(
    'requests/fetchCompanyRequests',
    async (username: string) => {
        const response = await axios.get(`requests/company/owner/${username}`);
        return response.data;
    }
);

export const fetchAvailableContractors = createAsyncThunk(
    'requests/fetchAvailableContractors',
    async (username: string) => {
        const response = await axios.get(`/contractors/available/${username}`);
        return response.data;
    }
);

export const acceptRequest = createAsyncThunk(
    'requests/acceptRequest',
    async ({ requestId, contractorId }: { requestId: string, contractorId: string }) => {
        await axios.put(`requests/assign/${requestId}`, {
            contractorId,
            status: 'En Progreso'
        });
        return { requestId, contractorId };
    }
);

export const rejectRequest = createAsyncThunk(
    'requests/rejectRequest',
    async (requestId: string) => {
        await axios.delete(`requests/${requestId}`);
        return requestId;
    }
);

export const cancelCompanyRequest = createAsyncThunk(
    'requests/cancelCompanyRequest',
    async ({ requestId, contractorId }: CompanyRequestPayload) => {
        await axios.put(`requests/company/${requestId}`, { status: 'Cancelada' });
        await axios.put(`contractors/available/${contractorId}`, { available: true });
        return requestId;
    }
);

export const completeRequest = createAsyncThunk(
    'requests/completeRequest',
    async (requestId: string) => {
        await axios.put(`requests/${requestId}`, { status: 'Completada' });
        return requestId;
    }
);

export const fetchUserIdByUsername = createAsyncThunk(
    'requests/fetchUserIdByUsername',
    async (username: string) => {
        const response = await axios.get(`/users/username/${username}`);
        return response.data;
    }
);

export const fetchUserRequests = createAsyncThunk(
    'requests/fetchUserRequests',
    async (userId: string) => {
        const response = await axios.get(`/requests/user/${userId}`);
        return response.data;
    }
);

export const fetchRelatedData = createAsyncThunk(
    'requests/fetchRelatedData',
    async (requests: Request[]) => {
        const contractorIds = [...new Set(requests.map((req) => req.contractorId))];
        const serviceIds = [...new Set(requests.map((req) => req.serviceId))];
        const companyIds = [...new Set(requests.map((req) => req.companyId))];

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
    async (requestId: string) => {
        await axios.put(`/requests/${requestId}`, { status: 'Cancelada' });
        return requestId;
    }
);

// Estado inicial combinado
const initialState: RequestsState = {
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
        resetState: () => {
            return initialState;
        },
        setFilter: (state, action: PayloadAction<string>) => {
            state.filter = action.payload;
        },
        setShowBillingForm: (state, action: PayloadAction<boolean>) => {
            state.showBillingForm = action.payload;
        },
        setShowContractorList: (state, action: PayloadAction<boolean>) => {
            state.showContractorList = action.payload;
        },
        setSelectedRequestId: (state, action: PayloadAction<string | null>) => {
            state.selectedRequestId = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUserIdByUsername.fulfilled, (state, action) => {
                state.userId = action.payload;
                state.status = 'succeeded';
            })
            .addCase(fetchUserIdByUsername.rejected, (state, action) => {
                state.error = action.error.message || 'Error';
                state.status = 'failed';
                state.userId = null;
            })
            .addCase(fetchUserRequests.fulfilled, (state, action) => {
                state.requests = action.payload;
                state.status = 'succeeded';
            })
            .addCase(fetchUserRequests.rejected, (state, action) => {
                state.error = action.error.message || 'Error';
                state.status = 'failed';
                state.requests = [];
            })
            .addCase(fetchRelatedData.fulfilled, (state, action) => {
                state.contractors = action.payload.contractors;
                state.services = action.payload.services;
                state.companies = action.payload.companies;
                state.status = 'succeeded';
            })
            .addCase(fetchRelatedData.rejected, (state, action) => {
                state.error = action.error.message || 'Error';
                state.status = 'failed';
                state.contractors = [];
                state.services = [];
                state.companies = [];
            })
            .addCase(fetchCompanyRequests.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchCompanyRequests.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.requests = action.payload;
            })
            .addCase(fetchCompanyRequests.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || 'Error';
                state.requests = [];
            })
            .addCase(fetchAvailableContractors.fulfilled, (state, action) => {
                state.availableContractors = action.payload;
            })
            .addCase(acceptRequest.fulfilled, (state, action) => {
                const request = state.requests.find(req => req.id === action.payload.requestId);
                if (request) {
                    request.status = 'En Progreso';
                    request.contractorId = action.payload.contractorId;
                }
                state.showContractorList = false;
                state.selectedRequestId = null;
            })
            .addCase(rejectRequest.fulfilled, (state, action) => {
                state.requests = state.requests.filter(req => req.id !== action.payload);
            })
            .addCase(cancelCompanyRequest.fulfilled, (state, action) => {
                const request = state.requests.find(req => req.id === action.payload);
                if (request) {
                    request.status = 'Cancelada';
                }
            })
            .addCase(completeRequest.fulfilled, (state, action) => {
                const request = state.requests.find(req => req.id === action.payload);
                if (request) {
                    request.status = 'Completada';
                }
                state.showBillingForm = false;
            })
            .addCase(cancelRequest.fulfilled, (state, action) => {
                const request = state.requests.find(req => req.id === action.payload);
                if (request) {
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


export type { RequestsState };

export default requestsSlice.reducer;
