package com.generalservicesplatform.general.service.interfaces;

import java.util.List;
import java.util.Optional;

import com.generalservicesplatform.general.model.Request;

public interface RequestService {
    List<Request> findAllRequests();

    Optional<Request> findRequestById(Long id);

    Request saveRequest(Request request);

    void deleteRequestById(Long id);

    Optional<Request> updateRequest(Long id, Request updatedRequest);

    List<Request> findRequestsByUserId(Long userId);

    List<Request> findRequestsByContractorId(Long contractorId);

    List<Request> findRequestsByCompanyId(Long companyId);
}