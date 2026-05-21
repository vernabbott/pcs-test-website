<?php

declare(strict_types=1);

use PHPMailer\PHPMailer\Exception;
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;

require_once __DIR__ . '/lib/PHPMailer/src/Exception.php';
require_once __DIR__ . '/lib/PHPMailer/src/PHPMailer.php';
require_once __DIR__ . '/lib/PHPMailer/src/SMTP.php';

function pcs_config(): array
{
    static $config;

    if ($config !== null) {
        return $config;
    }

    $configPath = __DIR__ . '/config.php';
    if (!is_file($configPath)) {
        pcs_json_response(500, [
            'error' => 'Server configuration is missing.',
        ]);
    }

    /** @var array<string, mixed> $loaded */
    $loaded = require $configPath;
    $config = $loaded;

    return $config;
}

function pcs_json_response(int $status, array $payload): void
{
    http_response_code($status);
    header('Content-Type: application/json; charset=UTF-8');
    echo json_encode($payload, JSON_UNESCAPED_SLASHES);
    exit;
}

function pcs_allowed_origin(array $config): ?string
{
    $origin = $_SERVER['HTTP_ORIGIN'] ?? '';
    if ($origin === '') {
        return null;
    }

    $allowedOrigins = $config['allowed_origins'] ?? [];
    if (!is_array($allowedOrigins) || !in_array($origin, $allowedOrigins, true)) {
        return null;
    }

    return $origin;
}

function pcs_send_cors_headers(array $config): void
{
    $allowedOrigin = pcs_allowed_origin($config);
    if ($allowedOrigin !== null) {
        header("Access-Control-Allow-Origin: {$allowedOrigin}");
        header('Vary: Origin');
    }
    header('Access-Control-Allow-Methods: POST, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type');
}

function pcs_handle_preflight(array $config): void
{
    pcs_send_cors_headers($config);
    if (($_SERVER['REQUEST_METHOD'] ?? 'GET') === 'OPTIONS') {
        http_response_code(204);
        exit;
    }
}

function pcs_require_post(): void
{
    if (($_SERVER['REQUEST_METHOD'] ?? 'GET') !== 'POST') {
        pcs_json_response(405, [
            'error' => 'Method not allowed.',
        ]);
    }
}

function pcs_request_data(): array
{
    $contentType = $_SERVER['CONTENT_TYPE'] ?? '';
    $body = file_get_contents('php://input');

    if (stripos($contentType, 'application/json') !== false) {
        $decoded = json_decode($body ?: '{}', true);
        if (!is_array($decoded)) {
            pcs_json_response(400, [
                'error' => 'Invalid JSON payload.',
            ]);
        }
        return $decoded;
    }

    return $_POST;
}

function pcs_clean_string(mixed $value, int $maxLength = 1000): string
{
    $string = trim((string) ($value ?? ''));
    $string = str_replace(["\r\n", "\r"], "\n", $string);
    $string = preg_replace("/[ \t]+/", ' ', $string) ?? $string;

    if (function_exists('mb_substr')) {
        return mb_substr($string, 0, $maxLength);
    }

    return substr($string, 0, $maxLength);
}

function pcs_require_fields(array $data, array $fields): void
{
    foreach ($fields as $field) {
        if (pcs_clean_string($data[$field] ?? '') === '') {
            pcs_json_response(422, [
                'error' => "Missing required field: {$field}.",
            ]);
        }
    }
}

function pcs_validate_email(string $email): string
{
    $validated = filter_var($email, FILTER_VALIDATE_EMAIL);
    if ($validated === false) {
        pcs_json_response(422, [
            'error' => 'Please provide a valid email address.',
        ]);
    }

    return $validated;
}

function pcs_honeypot_triggered(array $data): bool
{
    $honeypot = pcs_clean_string($data['website'] ?? '', 255);
    return $honeypot !== '';
}

function pcs_mailer(array $config): PHPMailer
{
    $mailer = new PHPMailer(true);
    $mailer->isSMTP();
    $mailer->Host = (string) $config['smtp']['host'];
    $mailer->Port = (int) $config['smtp']['port'];
    $mailer->SMTPAuth = true;
    $mailer->Username = (string) $config['smtp']['username'];
    $mailer->Password = (string) $config['smtp']['password'];
    $mailer->CharSet = 'UTF-8';
    $mailer->Timeout = 15;
    $mailer->SMTPAutoTLS = true;

    $secure = strtolower((string) ($config['smtp']['secure'] ?? 'tls'));
    if ($secure === 'ssl') {
        $mailer->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
    } else {
        $mailer->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
    }

    if (!empty($config['smtp']['debug']) && defined('SMTP::DEBUG_SERVER')) {
        $mailer->SMTPDebug = SMTP::DEBUG_SERVER;
    }

    $mailer->setFrom(
        (string) $config['smtp']['from_email'],
        (string) $config['smtp']['from_name']
    );

    return $mailer;
}

function pcs_send_email(array $config, string $recipient, string $replyToEmail, string $replyToName, string $subject, string $htmlBody, string $textBody): void
{
    try {
        $mailer = pcs_mailer($config);
        $mailer->addAddress($recipient);
        $mailer->addReplyTo($replyToEmail, $replyToName !== '' ? $replyToName : $replyToEmail);
        $mailer->Subject = $subject;
        $mailer->isHTML(true);
        $mailer->Body = $htmlBody;
        $mailer->AltBody = $textBody;
        $mailer->send();
    } catch (Exception) {
        pcs_json_response(500, [
            'error' => 'We could not send your message right now.',
        ]);
    }
}

function pcs_escape(string $value): string
{
    return htmlspecialchars($value, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
}
