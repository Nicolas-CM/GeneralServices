package com.generalservicesplatform.general.service.interfaces;

import java.util.List;
import java.util.Optional;

import com.generalservicesplatform.general.model.Billing;

public interface BillingService {
    List<Billing> findAllBillings();

    Optional<Billing> findBillingById(Long id);

    Billing saveBilling(Billing billing);

    void deleteBillingById(Long id);

    Optional<Billing> updateBilling(Long id, Billing updatedBilling);
}