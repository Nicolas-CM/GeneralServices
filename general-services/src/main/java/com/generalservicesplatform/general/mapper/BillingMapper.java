package com.generalservicesplatform.general.mapper;

import com.generalservicesplatform.general.dto.BillingDto;
import com.generalservicesplatform.general.model.Billing;
import com.generalservicesplatform.general.model.Request;
import com.generalservicesplatform.general.model.User;
import com.generalservicesplatform.general.model.Contractor;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;

import java.util.List;

@Mapper(componentModel = "spring")
public interface BillingMapper {

    @Mapping(target = "requestId", source = "request.id")
    @Mapping(target = "contractorId", source = "contractor.id")
    @Mapping(target = "userId", source = "user.id")
    BillingDto toDto(Billing billing);

    @Mapping(target = "request", source = "requestId", qualifiedByName = "mapRequestIdToRequest")
    @Mapping(target = "contractor", source = "contractorId", qualifiedByName = "mapContractorIdToContractor")
    @Mapping(target = "user", source = "userId", qualifiedByName = "mapUserIdToUser")

    Billing toEntity(BillingDto billingDto);

    List<BillingDto> toDto(List<Billing> billings);

    List<Billing> toEntity(List<BillingDto> billingDtos);

    @Named("mapRequestIdToRequest")
    default Request mapRequestIdToRequest(Long requestId) {
        if (requestId == null) {
            return null;
        }
        Request request = new Request();
        request.setId(requestId);
        return request;
    }

    @Named("mapContractorIdToContractor")
    default Contractor mapContractorIdToContractor(Long contractorId) {
        if (contractorId == null) {
            return null;
        }
        Contractor contractor = new Contractor();
        contractor.setId(contractorId);
        return contractor;
    }

    @Named("mapUserIdToUser")
    default User mapUserIdToUser(Integer userId) {
        if (userId == null) {
            return null;
        }
        User user = new User();
        user.setId(userId);
        return user;
    }

}