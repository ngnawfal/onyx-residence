<?php
/* Nama File: be/lib/ApplicationMapper.php | Fungsi: Mapper DB aplikasi resident Onyx | Author: PPL-UAS */

declare(strict_types=1);

final class ApplicationMapper
{
    public static function toApi(array $row): array
    {
        return [
            'id' => $row['id'] ?? '',
            'name' => $row['name'] ?? '',
            'phone' => $row['phone'] ?? '',
            'email' => $row['email'] ?? '',
            'nik' => $row['nik'] ?? '',
            'address' => $row['address'] ?? '',
            'occupation' => $row['occupation'] ?? '',
            'room' => $row['room'] ?? '',
            'leaseType' => $row['lease_type'] ?? '',
            'duration' => (string) ($row['duration'] ?? '1'),
            'startDate' => $row['start_date'] ?? '',
            'endDate' => $row['end_date'] ?? '',
            'monthlyBudget' => (string) (int) ($row['monthly_budget'] ?? $row['meter_monthly_budget'] ?? 0),
            'deposit' => (string) (int) ($row['deposit'] ?? 0),
            'emergencyContact' => $row['emergency_contact'] ?? '',
            'refundBank' => $row['refund_bank'] ?? '',
            'refundAccount' => $row['refund_account'] ?? '',
            'refundAccountName' => $row['refund_account_name'] ?? '',
            'notes' => $row['notes'] ?? '',
            'applicationStatus' => $row['application_status'] ?? 'Menunggu Review',
            'administrationStatus' => $row['administration_status'] ?? 'Belum Dibayar',
            'created_at' => $row['created_at'] ?? null,
            'updated_at' => $row['updated_at'] ?? null,
        ];
    }

    public static function proofToApi(array $row): array
    {
        return [
            'id' => $row['id'] ?? '',
            'application_id' => $row['application_id'] ?? '',
            'invoice' => $row['invoice'] ?? '',
            'residentName' => $row['resident_name'] ?? '',
            'room' => $row['room'] ?? '',
            'senderBank' => $row['sender_bank'] ?? '',
            'senderName' => $row['sender_name'] ?? '',
            'amount' => (string) (int) ($row['amount'] ?? 0),
            'fileName' => $row['file_name'] ?? '',
            'filePath' => $row['file_path'] ?? '',
            'fileUrl' => $row['file_url'] ?? '',
            'mimeType' => $row['mime_type'] ?? '',
            'fileSize' => (int) ($row['file_size'] ?? 0),
            'status' => $row['status'] ?? 'uploaded',
            'reviewed_at' => $row['reviewed_at'] ?? null,
            'created_at' => $row['created_at'] ?? null,
            'updated_at' => $row['updated_at'] ?? null,
        ];
    }

    public static function utilityToApi(array $row): array
    {
        return [
            'id' => $row['id'] ?? '',
            'application_id' => $row['application_id'] ?? '',
            'residentName' => $row['resident_name'] ?? '',
            'room' => $row['room'] ?? '',
            'month' => $row['meter_month'] ?? $row['month'] ?? '',
            'electricKwh' => (float) ($row['electric_kwh'] ?? 0),
            'waterM3' => (float) ($row['water_m3'] ?? 0),
            'electricRate' => (float) ($row['electric_rate'] ?? 0),
            'waterRate' => (float) ($row['water_rate'] ?? 0),
            'fixedFee' => (float) ($row['fixed_fee'] ?? 0),
            'electricAmount' => (int) ($row['electric_amount'] ?? 0),
            'waterAmount' => (int) ($row['water_amount'] ?? 0),
            'totalAmount' => (int) ($row['total_amount'] ?? 0),
            'status' => $row['status'] ?? 'Pending',
            'created_at' => $row['created_at'] ?? null,
            'updated_at' => $row['updated_at'] ?? null,
        ];
    }
}
