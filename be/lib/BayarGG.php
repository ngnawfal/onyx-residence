<?php
/* Nama File: be/lib/BayarGG.php | Fungsi: Client sederhana BAYAR GG API | Author: PPL-UAS */

declare(strict_types=1);

final class BayarGG
{
    public function __construct(private array $config)
    {
    }

    public function createPayment(array $payload): array
    {
        return $this->request('POST', '/create-payment.php', $payload);
    }

    public function checkPayment(string $invoice): array
    {
        return $this->request('GET', '/check-payment.php?invoice=' . urlencode($invoice));
    }

    private function request(string $method, string $path, array $payload = []): array
    {
        if (($this->config['api_key'] ?? '') === '') {
            return [
                'success' => false,
                'demo' => true,
                'message' => 'BAYAR_GG_API_KEY belum diset. Response demo dikembalikan.',
                'data' => $this->demoPayment($payload),
            ];
        }

        $url = rtrim((string) $this->config['base_url'], '/') . $path;
        $headers = "Content-Type: application/json\r\nX-API-Key: {$this->config['api_key']}";
        $options = [
            'http' => [
                'method' => $method,
                'header' => $headers,
                'ignore_errors' => true,
            ],
        ];

        if ($method === 'POST') {
            $options['http']['content'] = json_encode($payload, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
        }

        $response = file_get_contents($url, false, stream_context_create($options));
        $decoded = $response !== false ? json_decode($response, true) : null;

        if (!is_array($decoded)) {
            return ['success' => false, 'message' => 'Response BAYAR GG tidak valid'];
        }

        return $decoded;
    }

    private function demoPayment(array $payload): array
    {
        $invoice = 'DEMO-' . date('YmdHis') . '-' . random_int(100, 999);
        return [
            'invoice_id' => $invoice,
            'amount' => (int) ($payload['amount'] ?? 0),
            'final_amount' => (int) ($payload['amount'] ?? 0),
            'status' => 'pending',
            'payment_method' => $payload['payment_method'] ?? $this->config['default_method'],
            'payment_method_label' => 'Demo BAYAR GG',
            'payment_url' => 'https://www.bayar.gg/pay?invoice=' . $invoice,
            'expires_at' => date('Y-m-d H:i:s', time() + 1800),
        ];
    }
}
