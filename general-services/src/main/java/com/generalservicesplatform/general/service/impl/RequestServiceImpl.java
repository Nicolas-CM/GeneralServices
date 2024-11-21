package com.generalservicesplatform.general.service.impl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.generalservicesplatform.general.model.Request;
import com.generalservicesplatform.general.repository.RequestRepository;
import com.generalservicesplatform.general.service.interfaces.RequestService;

@Service
public class RequestServiceImpl implements RequestService {
    private final RequestRepository requestRepository;

    @Autowired
    public RequestServiceImpl(RequestRepository requestRepository) {
        this.requestRepository = requestRepository;
    }

    @Override
    public List<Request> findAllRequests() {
        return requestRepository.findAll();
    }

    // En RequestServiceImpl.java
    @Override
    public List<Request> findRequestsByUserId(Long userId) {
        return requestRepository.findByUserId(userId);
    }

    @Override
    public List<Request> findRequestsByContractorId(Long contractorId) {
        return requestRepository.findByContractorId(contractorId);
    }

    @Override
    public List<Request> findRequestsByCompanyId(Long companyId) {
        return requestRepository.findByCompanyId(companyId);
    }

    @Override
    public Optional<Request> findRequestById(Long id) {
        return requestRepository.findById(id);
    }

    @Override
    public Request saveRequest(Request request) {
        if (request == null) {
            throw new IllegalArgumentException("Request cannot be null");
        }
        return requestRepository.save(request);
    }

    @Override
    public void deleteRequestById(Long id) {
        requestRepository.deleteById(id);
    }

    @Override
    public Optional<Request> updateRequest(Long id, Request updatedRequest) {
        return requestRepository.findById(id)
                .map(existingRequest -> {
                    existingRequest.setStatus(updatedRequest.getStatus());
                    // Actualiza otros campos necesarios
                    return requestRepository.save(existingRequest);
                });
    }

    public Optional<Request> assignContractorToRequest(Long id, Request updatedRequest) {
        return requestRepository.findById(id)
                .map(existingRequest -> {
                    existingRequest.setStatus(updatedRequest.getStatus());
                    existingRequest.setContractor(updatedRequest.getContractor());
                    // Actualiza otros campos necesarios
                    return requestRepository.save(existingRequest);
                });
    }

    public List<Request> findRequestsByIds(List<Long> ids) {
        return requestRepository.findByIdIn(ids);
    }
}