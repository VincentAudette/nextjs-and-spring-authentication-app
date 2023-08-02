package com.git619.auth.dto;

import com.git619.auth.utils.PasswordChangeType;

import java.time.ZonedDateTime;

public class PasswordChangeRecordDTO {
    private Long id;
    private PasswordChangeType changeType;

    public PasswordChangeRecordDTO(Long id, PasswordChangeType changeType, ZonedDateTime changeTimestamp) {
        this.id = id;
        this.changeType = changeType;
        this.changeTimestamp = changeTimestamp;
    }

    private ZonedDateTime changeTimestamp;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public PasswordChangeType getChangeType() {
        return changeType;
    }

    public void setChangeType(PasswordChangeType changeType) {
        this.changeType = changeType;
    }

    public ZonedDateTime getChangeTimestamp() {
        return changeTimestamp;
    }

    public void setChangeTimestamp(ZonedDateTime changeTimestamp) {
        this.changeTimestamp = changeTimestamp;
    }
}
