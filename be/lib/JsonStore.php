<?php
/* Nama File: be/lib/JsonStore.php | Fungsi: Penyimpanan JSON sederhana untuk aplikasi dan pembayaran | Author: PPL-UAS */

declare(strict_types=1);

final class JsonStore
{
    private string $path;

    public function __construct(string $fileName)
    {
        $dir = __DIR__ . '/../storage';
        if (!is_dir($dir)) {
            mkdir($dir, 0775, true);
        }

        $this->path = $dir . '/' . $fileName;
        if (!file_exists($this->path)) {
            file_put_contents($this->path, json_encode([], JSON_PRETTY_PRINT));
        }
    }

    public function all(): array
    {
        $content = file_get_contents($this->path) ?: '[]';
        $data = json_decode($content, true);
        return is_array($data) ? $data : [];
    }

    public function saveAll(array $rows): void
    {
        file_put_contents($this->path, json_encode(array_values($rows), JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES), LOCK_EX);
    }

    public function upsert(array $row, string $key = 'id'): array
    {
        $rows = $this->all();
        $id = (string) ($row[$key] ?? '');
        if ($id === '') {
            $id = 'ONYX-' . date('YmdHis') . '-' . random_int(100, 999);
            $row[$key] = $id;
        }

        $found = false;
        foreach ($rows as $index => $existing) {
            if ((string) ($existing[$key] ?? '') === $id) {
                $rows[$index] = array_merge($existing, $row, ['updated_at' => date('c')]);
                $found = true;
                break;
            }
        }

        if (!$found) {
            $row['created_at'] = $row['created_at'] ?? date('c');
            $row['updated_at'] = date('c');
            $rows[] = $row;
        }

        $this->saveAll($rows);
        return $row;
    }

    public function find(string $id, string $key = 'id'): ?array
    {
        foreach ($this->all() as $row) {
            if ((string) ($row[$key] ?? '') === $id) {
                return $row;
            }
        }
        return null;
    }
}
