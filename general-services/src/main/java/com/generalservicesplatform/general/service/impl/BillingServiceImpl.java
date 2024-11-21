package com.generalservicesplatform.general.service.impl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.generalservicesplatform.general.model.Billing;
import com.generalservicesplatform.general.repository.BillingRepository;
import com.generalservicesplatform.general.service.interfaces.BillingService;

@Service
public class BillingServiceImpl implements BillingService {
    private final BillingRepository billingRepository;

    @Autowired
    public BillingServiceImpl(BillingRepository billingRepository) {
        this.billingRepository = billingRepository;
    }

    @Override
    public List<Billing> findAllBillings() {
        return billingRepository.findAll();
    }

    @Override
    public Optional<Billing> findBillingById(Long id) {
        return billingRepository.findById(id);
    }

    @Override
    public Billing saveBilling(Billing billing) {
        if (billing == null) {
            throw new IllegalArgumentException("Billing cannot be null");
        }
        return billingRepository.save(billing);
    }

    @Override
    public void deleteBillingById(Long id) {
        billingRepository.deleteById(id);
    }

    @Override
    public Optional<Billing> updateBilling(Long id, Billing updatedBilling) {
        return billingRepository.findById(id)
                .map(existingBilling -> {
                    existingBilling.setPaymentDate(updatedBilling.getPaymentDate());
                    existingBilling.setAmount(updatedBilling.getAmount());
                    existingBilling.setContractor(updatedBilling.getContractor());
                    existingBilling.setPaymentMethod(updatedBilling.getPaymentMethod());
                    existingBilling.setRequest(updatedBilling.getRequest());

                    // Actualiza otros campos necesarios
                    return billingRepository.save(existingBilling);
                });
    }

    public List<Billing> findBillingsByIds(List<Long> ids) {
        return billingRepository.findByIdIn(ids);
    }

    public List<Billing> findBillingsByUserId(Long userId) {
        return billingRepository.findByUserId(userId);
    }
}