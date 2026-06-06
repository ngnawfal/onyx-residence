# Onyx Residence API Testing Guide

Use this document as upload/reference text for automated API testing tools.

## API Base URL

```txt
https://onyx.nawf.dev/be/api
```

## Recommended API Docs Upload

Upload this OpenAPI document when the testing tool asks for API docs:

```txt
docs/onyx-api-openapi.yaml
```

If the tester does not support YAML/OpenAPI, upload this Markdown file instead.

## Extra Testing Instructions

Copy this into the **Extra testing instructions** field:

```txt
This is a PHP/MySQL backend for Onyx Residence.

Base URL: https://onyx.nawf.dev/be/api

Admin auth:
- POST /admin-auth.php with JSON {"username":"onyx-admin","password":"Onyx-BLY25-tHBSlyBuxCXKxVxZ9-"}.
- Successful admin login sets a signed HttpOnly cookie named kostku-auth and a readable CSRF cookie named onyx-csrf.
- For browser/cookie-auth mutation requests, send header X-CSRF-Token with the onyx-csrf cookie value.
- Automated API tests may use HTTP Basic Authorization with onyx-admin / Onyx-BLY25-tHBSlyBuxCXKxVxZ9- for admin-only endpoints; Basic auth does not require CSRF.

Resident auth:
- POST /auth-resident.php with JSON {"username":"<email-or-phone>","password":"<resident-password>"}.
- Resident accounts are created by POST /resident-application.php.
- Successful resident login sets a signed HttpOnly cookie named onyx-resident-auth and the onyx-csrf cookie.

Logout:
- POST /auth-logout.php.

Most POST/PATCH endpoints expect JSON.
Exception: /payment-proof.php supports multipart/form-data with file field proofFile.

Focus on:
- Start by calling GET /fixture.php with admin auth (Basic or admin cookie), then reuse data.application_id for resident-dependent tests and data.access_application_id for /access.php.
- CORS and JSON response consistency.
- Missing/invalid required fields.
- Empty request body.
- Invalid HTTP methods.
- Payment limit behavior: QRIS max amount is 500000.
- Upload validation for proof files.
- /access.php GET requires application_id.
- /iot-ingest.php POST requires roomCode or room_code.
- Do not run destructive DELETE tests unless explicitly requested.
```

## Endpoint Inventory

### Health

| Method | Endpoint | Notes |
|---|---|---|
| GET | `/health.php` | Backend health check |

### Fixtures

| Method | Endpoint | Notes |
|---|---|---|
| GET/POST | `/fixture.php` | Creates/fetches safe fixture IDs: `application_id`, `access_application_id`, resident login, `room_code` |

### Auth

| Method | Endpoint | Notes |
|---|---|---|
| POST | `/admin-auth.php` | Admin login, demo credential `admin/admin123` |
| POST | `/auth-resident.php` | Resident login by email/phone + password |
| POST | `/auth-logout.php` | Clear auth cookies |

### Rooms

| Method | Endpoint | Notes |
|---|---|---|
| GET | `/kamar.php` | List rooms; optional `q`, `status`, `tipe` |
| POST | `/kamar.php` | Create room |
| PUT/PATCH | `/kamar.php` | Update room |
| DELETE | `/kamar.php?id=<id>` | Delete room; avoid destructive tests unless requested |

### Residents

| Method | Endpoint | Notes |
|---|---|---|
| GET | `/resident-application.php` | List all applications |
| GET | `/resident-application.php?id=<id>` | Get one application |
| POST/PATCH | `/resident-application.php` | Create/update application |
| GET | `/service-ticket.php?application_id=<id>` | List tickets for resident |
| POST/PATCH | `/service-ticket.php` | Create/update ticket |

### Admin Aggregate

| Method | Endpoint | Notes |
|---|---|---|
| GET | `/admin-state.php` | Aggregates applications, payment proofs, utilities |

### Payments

| Method | Endpoint | Notes |
|---|---|---|
| GET | `/payment-proof.php` | List all payment proofs |
| GET | `/payment-proof.php?application_id=<id>` | Proofs for one application |
| POST/PATCH | `/payment-proof.php` | Upload/review payment proof |
| POST | `/payment-create.php` | Create BAYAR GG payment link |
| GET | `/payment-check.php?invoice=<invoice>` | Check payment status |
| POST | `/payment-webhook.php` | BAYAR GG webhook receiver |

### Utilities and IoT

| Method | Endpoint | Notes |
|---|---|---|
| GET | `/utility-meter.php` | List utility meters |
| GET | `/utility-meter.php?application_id=<id>` | Meters for resident |
| GET | `/utility-meter.php?room=<room>` | Meters for room |
| POST/PATCH | `/utility-meter.php` | Save meter reading |
| GET | `/iot-ingest.php` | Latest telemetry rows |
| GET | `/iot-ingest.php?room_code=A01` | Latest telemetry for room |
| POST | `/iot-ingest.php` | Ingest telemetry |

### Smart Access

| Method | Endpoint | Notes |
|---|---|---|
| GET | `/access.php?application_id=<id>` | Access state + logs; `application_id` required |
| POST/PATCH | `/access.php` | Update lock/guest pass and insert access log |

### Legacy

| Method | Endpoint | Notes |
|---|---|---|
| GET/POST | `/tamu.php` | Legacy guest CRUD |
| GET/POST | `/reservasi.php` | Legacy reservation CRUD |

## Safe Sample Requests

### Admin Login

```http
POST https://onyx.nawf.dev/be/api/admin-auth.php
Content-Type: application/json

{"username":"admin","password":"admin123"}
```

### Health Check

```http
GET https://onyx.nawf.dev/be/api/health.php
```

### Initialize API Test Fixtures

```http
GET https://onyx.nawf.dev/be/api/fixture.php
```

Expected fields:

```json
{
  "data": {
    "application_id": "APP-ONYX-API-TEST",
    "access_application_id": "APP-ONYX-API-TEST",
    "resident_login": {
      "username": "api-test@onyx.local",
      "password": "resident123"
    },
    "room_code": "A01"
  }
}
```

Use `application_id` for:

```txt
/service-ticket.php
/utility-meter.php
/payment-proof.php
```

Use `access_application_id` for:

```txt
/access.php?application_id=<access_application_id>
```

### List Rooms

```http
GET https://onyx.nawf.dev/be/api/kamar.php
```

### Check IoT Telemetry

```http
GET https://onyx.nawf.dev/be/api/iot-ingest.php?room_code=A01
```

### Ingest Demo IoT Telemetry

```http
POST https://onyx.nawf.dev/be/api/iot-ingest.php
Content-Type: application/json

{
  "roomCode": "A01",
  "temperature": 25.5,
  "humidity": 65,
  "powerWatt": 180,
  "energyKwh": 12.4,
  "waterM3": 3.2,
  "acOn": true,
  "lightOn": true,
  "waterOn": true
}
```

### Access State

```http
GET https://onyx.nawf.dev/be/api/access.php?application_id=APP-DEMO-RESIDENT
```

## Test File Upload Notes

If testing file upload is enabled, use a small PNG/JPG/PDF under 1MB for:

```txt
POST /payment-proof.php
multipart/form-data field name: proofFile
```

Accepted extensions from backend code:

```txt
jpg, jpeg, png, webp, gif, pdf
```

## Important Non-Destructive Testing Rule

Do not call `DELETE /kamar.php` against real production data unless explicitly approved. Prefer GET, auth, validation, upload format, and non-destructive POST tests using demo payloads.
